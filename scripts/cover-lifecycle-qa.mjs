import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium, webkit, expect } from '@playwright/test'
import { withoutDecorativeWebGL, revealForMeasurement } from './visible-layout-qa.mjs'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5236'
const out = process.env.QA_OUTPUT_DIR || '/tmp/index-preview-lifecycle'
mkdirSync(out, { recursive: true })
const results = [], failures = []
const chunkPattern = /CoverPreview[^/]*\.(?:js|tsx)(?:\?.*)?$/
const engines = (process.env.QA_COVER_ENGINE || 'chromium,webkit').split(',')
const cases = process.env.QA_COVER_CASE?.split(',')

for (const engine of [chromium, webkit]) {
  if (!engines.includes(engine.name())) continue
  const browser = await engine.launch()
  async function check(name, width, theme, run, { delayVisibility = 0, reduce = false, failChunk = false } = {}) {
    if (cases && !cases.includes(name)) return
    const context = await browser.newContext({ viewport: { width, height: 1000 }, hasTouch: width < 500, reducedMotion: reduce ? 'reduce' : 'no-preference',
      recordVideo: engine === chromium && name === 'cold-hover-screens' && theme === 'light' ? { dir: out } : undefined })
    const page = await context.newPage(), events = [], media = []
    await context.addInitScript(({ theme, delayVisibility }) => {
      localStorage.setItem('theme', theme)
      localStorage.setItem('portfolio-analytics-consent-v1', 'denied')
      window.__coverObservers = 0
      const IO = window.IntersectionObserver
      window.IntersectionObserver = class extends IO {
        constructor(callback, options) { super((entries, observer) => {
          if (delayVisibility) setTimeout(() => callback(entries, observer), delayVisibility)
          else callback(entries, observer)
        }, options) }
        observe(element) { if (element.matches('.cover-art')) window.__coverObservers++; super.observe(element) }
      }
    }, { theme, delayVisibility })
    await withoutDecorativeWebGL(page)
    await context.tracing.start({ screenshots: true, snapshots: true, sources: true })
    page.on('pageerror', error => events.push({ error: error.stack }))
    page.on('requestfailed', request => events.push({ request: request.url(), failure: request.failure() }))
    page.on('requestfinished', request => {
      if (chunkPattern.test(request.url())) events.push({ chunk: 'finished', url: request.url() })
    })
    page.on('request', request => { if (request.url().includes('/Assets/cover-motion/')) media.push(request.url()) })
    let release
    const gate = new Promise(resolve => { release = resolve })
    await page.route(chunkPattern, async route => {
      events.push({ chunk: 'held' }); await gate
      if (failChunk) { await route.abort('failed'); events.push({ chunk: 'aborted' }) }
      else { await route.continue(); events.push({ chunk: 'released' }) }
    })
    try {
      await run({ page, release, media, events })
      assert.deepEqual(events.filter(event => event.error), [], 'no unhandled renderer errors')
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'no horizontal page overflow')
      results.push({ engine: engine.name(), width, theme, name })
    } catch (error) {
      failures.push({ engine: engine.name(), width, theme, name, error: String(error), events, media,
        inputState: await page.evaluate(() => ({ scrollY, focused: document.activeElement?.outerHTML.slice(0, 400), hovered: [...document.querySelectorAll('.work-library-row:hover, .work-library-preview:hover')].map(element => element.className) })),
        loaderState: await page.evaluate(() => ({ visibility: document.visibilityState, observers: window.__coverObservers,
          resources: performance.getEntriesByType('resource').filter(resource => resource.name.includes('CoverPreview')).map(resource => resource.toJSON()) })),
        state: await page.locator('.cover-art').evaluateAll(elements => elements.map(element => ({ motion: element.getAttribute('data-cover-motion'), hover: element.matches(':hover'), rect: element.getBoundingClientRect().toJSON() }))) })
      await page.screenshot({ path: `${out}/FAIL-${engine.name()}-${width}-${theme}-${name}.png` }).catch(() => {})
      await context.tracing.stop({ path: `${out}/FAIL-${engine.name()}-${width}-${theme}-${name}.zip` })
    } finally {
      release()
      await context.close()
    }
  }
  for (const theme of ['light', 'dark']) {
    for (const kind of ['film', 'screens']) await check(`cold-hover-${kind}`, 1440, theme, async ({ page, release }) => {
      await page.goto(base + '/work?view=library', { waitUntil: 'domcontentloaded' })
      const frame = page.locator('.work-library-preview__frame')
      if (kind === 'screens') await page.locator('.work-library-row[href="/raahi-project"]').first().hover()
      await frame.scrollIntoViewIfNeeded(); await frame.hover()
      assert(await frame.locator('.cover-art').evaluate(element => element.matches(':hover')), 'pointer is already over the unbound artwork')
      assert.equal(await frame.locator('.cover-art').getAttribute('data-cover-motion'), null)
      release()
      const art = frame.locator('.cover-art')
      await expect(art).toHaveAttribute('data-cover-motion', 'playing', { timeout: 8000 })
      if (kind === 'film') await expect.poll(() => art.locator('video').evaluate(video => video.currentTime)).toBeGreaterThan(.05)
      else {
        await expect(art.locator('.cover-motion__screen img')).toHaveCount(3)
        assert(await art.locator('.cover-motion__screen img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0 && getComputedStyle(image).objectFit === 'contain')))
        await expect.poll(() => art.locator('.cover-motion__screen').first().evaluate(element => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.99)
      }
      await expect(art.locator('.cover-motion')).toHaveCSS('opacity', '1')
      await page.screenshot({ path: `${out}/${engine.name()}-${theme}-cold-${kind}.png` })
      // Move out, then back: one finite preview can be replayed normally.
      await page.mouse.move(0, 0); await expect(art).toHaveAttribute('data-cover-motion', 'idle')
      await frame.hover(); await expect(art).toHaveAttribute('data-cover-motion', 'playing')
      await expect(art).toHaveAttribute('data-cover-motion', 'idle', { timeout: 6000 })
      await expect(art.locator('.cover-motion')).toHaveCount(0)
    }, { delayVisibility: 200 })

    await check('left-before-load', 1440, theme, async ({ page, release, media }) => {
      await page.goto(base + '/work?view=library', { waitUntil: 'domcontentloaded' })
      const frame = page.locator('.work-library-preview__frame')
      await frame.scrollIntoViewIfNeeded(); await frame.hover(); await page.mouse.move(0, 0)
      release()
      await expect.poll(() => page.evaluate(() => window.__coverObservers)).toBeGreaterThan(0)
      await page.waitForTimeout(500)
      assert.equal(media.length, 0, 'a departed pointer does not start a preview when the chunk resolves')
      await expect(frame.locator('.cover-motion')).toHaveCount(0)
      await frame.hover(); await expect(frame.locator('.cover-art')).toHaveAttribute('data-cover-motion', 'playing')
    })

    await check('rapid-selection', 1440, theme, async ({ page, release }) => {
      await page.goto(base + '/work?view=library', { waitUntil: 'domcontentloaded' })
      const frame = page.locator('.work-library-preview__frame')
      for (const slug of ['mentra', 'raahi-project', 'transfi-project', 'raahi-project']) await page.locator(`.work-library-row[href="/${slug}"]`).first().hover()
      await frame.scrollIntoViewIfNeeded(); await frame.hover(); release()
      await expect(frame.locator('.cover-art')).toHaveAttribute('data-cover-preview-kind', 'screens')
      await expect(frame.locator('.cover-art')).toHaveAttribute('data-cover-motion', 'playing', { timeout: 8000 })
      assert(await frame.locator('.cover-motion__screen img').evaluateAll(images => images.length === 3 && images.every(image => image.src.includes('/raahi-') && image.complete && image.naturalWidth > 0)))
      assert.equal(await page.locator('[data-cover-motion="playing"]').count(), 1)
      await page.locator('.work-library-row[href="/mentra"]').first().hover(); await frame.hover()
      await expect(frame.locator('.cover-art')).toHaveAttribute('data-cover-motion', 'playing')
      await expect.poll(() => frame.locator('video').evaluate(video => video.currentTime)).toBeGreaterThan(.05)
      await expect(frame.locator('.cover-motion__screen')).toHaveCount(0)
    })

    await check('delayed-chunk', 1440, theme, async ({ page, release, media }) => {
      await page.goto(base + '/work?view=library', { waitUntil: 'domcontentloaded' })
      const frame = page.locator('.work-library-preview__frame'), art = frame.locator('.cover-art')
      for (const slug of ['mentra', 'raahi-project', 'transfi-project', 'raahi-project']) await page.locator(`.work-library-row[href="/${slug}"]`).first().hover()
      await frame.scrollIntoViewIfNeeded(); await frame.hover()
      // Reproduce the original long intercept while keeping the existing
      // eight-second playback deadline after the module is released.
      await page.waitForTimeout(7000)
      await expect(art.locator(':scope > img')).toBeVisible()
      assert.equal(media.length, 0, 'the original cover remains while the optional player is pending')
      release()
      await expect(art).toHaveAttribute('data-cover-motion', 'playing', { timeout: 8000 })
      assert(await art.locator('.cover-motion__screen img').evaluateAll(images => images.length === 3 && images.every(image => image.src.includes('/raahi-') && image.complete && image.naturalWidth > 0)))
      assert.equal(await page.locator('[data-cover-motion="playing"]').count(), 1)
      await page.locator('.work-library-row[href="/mentra"]').first().hover(); await frame.hover()
      await expect.poll(() => art.locator('video').evaluate(video => video.currentTime)).toBeGreaterThan(.05)
      await expect(art.locator('.cover-motion__screen')).toHaveCount(0)
    })

    await check('failed-chunk', 1440, theme, async ({ page, release, media, events }) => {
      await page.goto(base + '/work?view=library', { waitUntil: 'domcontentloaded' })
      const frame = page.locator('.work-library-preview__frame'), art = frame.locator('.cover-art')
      await frame.scrollIntoViewIfNeeded(); await frame.hover(); release()
      await expect.poll(() => events.some(event => event.chunk === 'aborted')).toBe(true)
      await expect.poll(() => events.some(event => event.failure && chunkPattern.test(event.request))).toBe(true)
      const cover = art.locator(':scope > img')
      await expect.poll(() => cover.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true)
      await expect(cover).toHaveCSS('opacity', '1')
      await expect(art.locator('.cover-motion')).toHaveCount(0)
      assert.equal(media.length, 0, 'a failed optional module never requests media')
      await page.locator('.work-library-row[href="/mentra"]').first().click()
      await expect(page).toHaveURL(/\/mentra\/?$/)
      await expect(page.getByRole('heading', { name: 'Mentra', exact: true })).toBeVisible()
    }, { failChunk: true })

    await check('selection-over-scroll', 1440, theme, async ({ page, release }) => {
      release()
      await page.goto(base + '/work?view=library', { waitUntil: 'domcontentloaded' })
      const row = page.locator('.work-library-row[href="/raahi-project"]').first()
      const frame = page.locator('.work-library-preview__frame')
      // Keep the pointer outside both controls when testing scroll selection.
      const moveToGutter = async () => {
        const listBox = await page.locator('.work-library-shelves').boundingBox(), artBox = await frame.boundingBox()
        await page.mouse.move((listBox.x + listBox.width + artBox.x) / 2, 500)
      }
      const scrollContent = async delta => {
        const before = await page.evaluate(() => scrollY)
        // Linux WebKit's wheel transport can leave the viewport stationary.
        // Exercise its real document scroll events directly; Chromium retains
        // native wheel input, alongside the separate native-touch suite.
        if (engine === webkit) await page.evaluate(delta => window.scrollBy({ top: delta, behavior: 'instant' }), delta)
        else await page.mouse.wheel(0, delta)
        await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before)
        await page.waitForTimeout(300)
      }
      await row.hover(); await frame.hover()
      await expect(page.locator('.work-library-preview__caption strong')).toHaveText('Raahi')
      await scrollContent(120)
      await expect(page.locator('.work-library-preview__caption strong')).toHaveText('Raahi')
      // Focus, too, owns the selection while scroll bookkeeping catches up.
      await row.focus(); await moveToGutter(); await scrollContent(160)
      await expect(page.locator('.work-library-preview__caption strong')).toHaveText('Raahi')
      await row.blur(); await moveToGutter()
      const beforeScroll = await page.evaluate(() => scrollY)
      const nextRow = page.locator('.work-library-row[href="/moniac-machine"]').first()
      await nextRow.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
      await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(beforeScroll)
      await expect(page.locator('.work-library-preview__caption strong')).toHaveText('Moniac Machine')
    })

    await check('index-row-escape', 1440, theme, async ({ page, release }) => {
      await page.goto(base + '/work?view=library', { waitUntil: 'domcontentloaded' })
      const row = page.locator('.work-library-row[href="/raahi-project"]').first()
      const art = page.locator('.work-library-preview__frame .cover-art')
      await row.focus(); await page.locator('.work-library-preview__frame').hover(); release()
      await expect(art).toHaveAttribute('data-cover-motion', 'playing', { timeout: 8000 })
      await row.press('Escape')
      // This must beat the 4.4-second natural end, not merely wait for it.
      await expect(art).toHaveAttribute('data-cover-motion', 'idle', { timeout: 750 })
      await expect(art.locator('.cover-motion')).toHaveCount(0)
      await expect(row).toBeFocused()
    })

    await check('stale-screen-load', 1440, theme, async ({ page, release }) => {
      let releaseScreens
      const screensGate = new Promise(resolve => { releaseScreens = resolve })
      await page.route('**/Assets/cover-motion/raahi-*.webp', async route => { await screensGate; await route.continue() })
      try {
        release()
        await page.goto(base + '/work?view=library', { waitUntil: 'domcontentloaded' })
        const frame = page.locator('.work-library-preview__frame')
        await page.locator('.work-library-row[href="/raahi-project"]').first().hover(); await frame.hover()
        await expect(frame.locator('.cover-art')).toHaveAttribute('data-cover-motion', 'loading')
        await page.locator('.work-library-row[href="/mentra"]').first().hover(); await frame.hover()
        await expect(frame.locator('.cover-art')).toHaveAttribute('data-cover-motion', 'playing')
        releaseScreens()
        await expect.poll(() => frame.locator('video').evaluate(video => video.currentTime)).toBeGreaterThan(.05)
        await expect(page.locator('.work-library-preview__caption strong')).toHaveText('Mentra')
        await expect(frame.locator('.cover-motion__screen')).toHaveCount(0)
        assert((await frame.locator('video').getAttribute('src')).endsWith('/mentra.mp4'))
      } finally { releaseScreens() }
    })

    for (const width of [1440, 390]) await check('focus-before-load', width, theme, async ({ page, release }) => {
      await page.goto(base + '/work?view=timeline', { waitUntil: 'domcontentloaded' })
      const card = page.locator('.work-timeline-feature').first()
      await revealForMeasurement(card); await card.focus(); release()
      await expect(card.locator('.cover-art')).toHaveAttribute('data-cover-motion', 'playing', { timeout: 8000 })
      await card.press('Escape'); await expect(card.locator('.cover-art')).toHaveAttribute('data-cover-motion', 'idle')
      await expect(card.locator('video')).toHaveCount(0)
    })

    await check('mobile-index', 390, theme, async ({ page, release, media }) => {
      await page.goto(base + '/work?view=library', { waitUntil: 'domcontentloaded' })
      await expect(page.locator('.work-library-preview')).not.toBeVisible(); release()
      await expect.poll(() => page.evaluate(() => window.__coverObservers)).toBeGreaterThan(0)
      await page.waitForTimeout(300)
      assert.equal(media.length, 0, 'hidden mobile side preview requests no media')
      await page.screenshot({ path: `${out}/${engine.name()}-${theme}-mobile-index.png` })
      const row = page.locator('.work-library-row[href="/mentra"]').first()
      await row.tap(); await expect(page).toHaveURL(/\/mentra\/?$/)
      await expect(page.getByRole('heading', { name: 'Mentra', exact: true })).toBeVisible()
      await page.screenshot({ path: `${out}/${engine.name()}-${theme}-mobile-navigation.png` })
    })

    await check('reduced-motion-cold-hover', 1440, theme, async ({ page, release, media }) => {
      await page.goto(base + '/work?view=library', { waitUntil: 'domcontentloaded' })
      const frame = page.locator('.work-library-preview__frame')
      await frame.scrollIntoViewIfNeeded(); await frame.hover(); release()
      await expect.poll(() => page.evaluate(() => window.__coverObservers)).toBeGreaterThan(0)
      await page.waitForTimeout(300)
      assert.equal(media.length, 0)
      await expect(frame.locator('.cover-motion')).toHaveCount(0)
      await expect(frame.locator('.cover-art > img')).toHaveCSS('opacity', '1')
    }, { reduce: true })
  }
  await browser.close()
}
writeFileSync(`${out}/report.json`, JSON.stringify({ base, results, failures }, null, 2))
console.log(JSON.stringify({ checks: results.length, failures }, null, 2))
assert(results.length + failures.length > 0, 'at least one cover lifecycle case selected')
assert.deepEqual(failures, [])
