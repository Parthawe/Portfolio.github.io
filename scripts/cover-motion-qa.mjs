import assert from 'node:assert/strict'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { chromium, webkit, expect } from '@playwright/test'
import { withoutDecorativeWebGL } from './visible-layout-qa.mjs'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5232'
const out = process.env.QA_OUTPUT_DIR || '/tmp/cover-motion-qa'
mkdirSync(out, { recursive: true })
const results = [], failures = []
const catalog = JSON.parse(readFileSync('docs/reviews/cover-motion/catalog.json'))
const eligible = catalog.filter(item => item.preview)
const profiles = [[chromium, 1440, 'light'], [chromium, 1440, 'dark'], [chromium, 390, 'light'], [webkit, 390, 'dark']]
const cardFor = (page, slug) => page.locator(`.pcard[href="/${slug}"]`)

for (const [engine, width, theme] of profiles) {
  const browser = await engine.launch()
  const context = await browser.newContext({ viewport: { width, height: 1000 }, hasTouch: width < 500,
    recordVideo: engine === chromium && width === 390 ? { dir: out } : undefined })
  await context.addInitScript(theme => { localStorage.setItem('theme', theme); localStorage.setItem('portfolio-analytics-consent-v1', 'denied') }, theme)
  const page = await context.newPage(), errors = [], requests = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('request', request => { if (request.url().includes('/Assets/cover-motion/')) requests.push(request.url()) })
  await withoutDecorativeWebGL(page)
  const open = async slug => {
    const card = cardFor(page, slug)
    await card.scrollIntoViewIfNeeded()
    await page.mouse.move(0, 0); await card.blur()
    await card.focus()
    await expect(card).toHaveAttribute('data-cover-motion', 'playing', { timeout: 8000 })
    assert.equal(await page.locator('[data-cover-motion="playing"]').count(), 1, 'one active preview')
    return card
  }
  try {
    await page.goto(base + '/'); await page.locator('#hero').waitFor(); await page.waitForTimeout(1000)
    assert.equal(requests.length, 0, 'no cover-media request in the initial homepage viewport')
    await page.goto(base + '/work'); await page.locator('h1').waitFor(); await page.waitForTimeout(350)
    assert.equal(requests.length, 0, 'initial Work loading keeps the poster; previews start with browsing')
    const film = await open('mentra'), video = film.locator('video')
    await expect.poll(() => video.evaluate(el => el.currentTime)).toBeGreaterThan(.1)
    assert.equal(await video.evaluate(el => el.muted && !el.loop), true)
    await film.screenshot({ path: `${out}/${engine.name()}-${width}-${theme}-film.png` })
    await expect(film).toHaveAttribute('data-cover-motion', 'idle', { timeout: 5000 })
    await expect(film.locator('video')).toHaveCount(0)
    await expect(film.locator('.pcard-visual > img').first()).toHaveCSS('opacity', '1')

    const screens = await open('raahi-project')
    assert.equal(await screens.locator('.cover-motion__screen img').count(), 3)
    assert(await screens.locator('.cover-motion__screen img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0)))
    await screens.screenshot({ path: `${out}/${engine.name()}-${width}-${theme}-screens.png` })
    await screens.press('Escape'); await expect(screens).toHaveAttribute('data-cover-motion', 'idle')
    // Repeated intent replays a bounded preview rather than leaving a broken player.
    await page.mouse.move(0, 0); await screens.blur(); await screens.focus()
    await expect(screens).toHaveAttribute('data-cover-motion', 'playing')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(screens).toHaveAttribute('data-cover-motion', 'idle')
    await expect(page.locator('.cover-motion')).toHaveCount(0)
    await page.emulateMedia({ reducedMotion: 'no-preference' })

    const next = await open('transfi-project')
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')) })
    await expect(next).toHaveAttribute('data-cover-motion', 'idle')
    assert.equal(await page.locator('.cover-motion').count(), 0, 'hidden tab releases all optional media')
    await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')) })
    await page.mouse.move(0, 0); await next.blur(); await next.focus()
    await expect(next).toHaveAttribute('data-cover-motion', 'playing')
    await page.locator('.footer').scrollIntoViewIfNeeded()
    await expect(next).toHaveAttribute('data-cover-motion', 'idle')
    assert.equal(await next.locator('video').count(), 0, 'offscreen decoder released')

    const type = await open('typeface')
    assert.deepEqual(await page.evaluate(() => [...document.fonts].filter(font => font.family.includes('Cover Slice') && font.status === 'loaded').map(font => font.weight).sort()), ['200', '400', '700'])
    await type.screenshot({ path: `${out}/${engine.name()}-${width}-${theme}-type.png` })
    await type.press('Escape')
    const shuffle = cardFor(page, 'shuffle')
    await shuffle.scrollIntoViewIfNeeded(); await shuffle.focus()
    assert.equal(await shuffle.getAttribute('data-cover-preview-kind'), null)
    assert.equal(await shuffle.locator('.cover-motion').count(), 0, 'approved Shuffle remains still')

    {
      for (const item of eligible) {
        const card = await open(item.slug)
        if (item.preview.kind === 'film') await expect.poll(() => card.locator('video').evaluate(el => el.currentTime)).toBeGreaterThan(.05)
        else if (item.preview.kind === 'screens') assert(await card.locator('.cover-motion__screen img').evaluateAll(images => images.length === 3 && images.every(image => image.complete && image.naturalWidth > 0)))
        await card.screenshot({ path: `${out}/${engine.name()}-${width}-${theme}-${item.slug}.png` })
        await card.press('Escape')
      }
      results.push(`${engine.name()} ${width} ${theme}: all ${eligible.length} registered covers load their real media or supplied typeface`)
    }
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'no page overflow')
    await page.goto(base + '/work?view=library')
    const library = page.locator('.work-library-preview__frame')
    if (width > 900) {
      await library.scrollIntoViewIfNeeded(); await library.hover()
      await expect(library.locator('.cover-art')).toHaveAttribute('data-cover-motion', 'playing', { timeout: 8000 })
      await page.locator('.work-library-row[href="/raahi-project"]').first().hover()
      await expect(library.locator('.cover-art')).toHaveAttribute('data-cover-preview-kind', 'screens')
      await expect(library.locator('.cover-motion__screen img')).toHaveCount(3)
      assert(await library.locator('.cover-motion__screen img').evaluateAll(images => images.every(image => getComputedStyle(image).objectFit === 'contain' && getComputedStyle(image).animationName === 'none')), 'large Index screens preserve the full image')
    } else await expect(library).not.toBeVisible()
    await page.goto(base + '/work?view=timeline')
    const arc = page.locator('.work-timeline-feature').first()
    await arc.scrollIntoViewIfNeeded(); await arc.focus()
    await expect(arc.locator('.cover-art')).toHaveAttribute('data-cover-motion', 'playing', { timeout: 8000 })
    await arc.press('Escape')
    const arcFlow = page.locator('.work-timeline-feature[href="/raahi-project"]')
    await arcFlow.scrollIntoViewIfNeeded(); await arcFlow.focus()
    await expect(arcFlow.locator('.cover-art')).toHaveAttribute('data-cover-motion', 'playing')
    assert(await arcFlow.locator('.cover-motion__screen img').evaluateAll(images => images.every(image => getComputedStyle(image).objectFit === 'contain')), 'Arc screens preserve the full image')
    await arcFlow.press('Escape')
    await page.goto(base + '/work')
    const destination = await open('mentra')
    if (width < 500) await destination.tap(); else await destination.press('Enter')
    await expect(page).toHaveURL(/\/mentra\/?$/)
    await expect(page.getByRole('heading', { name: 'Mentra', exact: true })).toBeVisible()
    assert.deepEqual(errors, [])
    results.push(`${engine.name()} ${width} ${theme}: film playback/end, screen sequence, replay, Escape, reduced motion, hidden/offscreen cleanup, original fonts, all Work views, direct navigation`)
  } catch (error) {
    failures.push({ engine: engine.name(), width, theme, error: String(error), policy: await page.locator('html').getAttribute('class') })
    await page.screenshot({ path: `${out}/FAIL-${engine.name()}-${width}-${theme}.png` }).catch(() => {})
  }
  await context.close(); await browser.close()
}

const browser = await chromium.launch()
try {
  for (const policy of ['reduce', 'save-data', 'low-memory', 'emergency', 'media-failure', 'chunk-failure']) {
    const context = await browser.newContext({ reducedMotion: policy === 'reduce' ? 'reduce' : 'no-preference' })
    const page = await context.newPage(), requests = []
    if (policy === 'save-data') await context.addInitScript(() => Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: true, effectiveType: '4g' } }))
    if (policy === 'low-memory') await context.addInitScript(() => Object.defineProperty(navigator, 'deviceMemory', { configurable: true, value: 2 }))
    if (policy === 'media-failure') await page.route('**/Assets/cover-motion/**', route => route.fulfill({ status: 404 }))
    if (policy === 'chunk-failure') await page.route(/CoverPreview[^/]*\.(tsx|js)(\?.*)?$/, route => route.abort())
    page.on('request', request => { if (request.url().includes('/Assets/cover-motion/')) requests.push(request.url()) })
    await page.goto(base + '/work' + (policy === 'emergency' ? '?perf=emergency' : '')); const card = cardFor(page, 'mentra'); await card.scrollIntoViewIfNeeded(); await card.focus()
    if (policy === 'media-failure') { await expect.poll(() => requests.length).toBeGreaterThan(0); await expect(card).toHaveAttribute('data-cover-motion', 'idle') }
    else if (policy !== 'chunk-failure') { await page.waitForTimeout(350); assert.equal(requests.length, 0, `${policy} skips optional cover assets`) }
    await expect(card.locator('video')).toHaveCount(0)
    await expect(card.locator('.pcard-visual > img').first()).toHaveCSS('opacity', '1')
    await card.press('Enter'); await expect(page.getByRole('heading', { name: 'Mentra', exact: true })).toBeVisible()
    results.push(`${policy}: original poster and project navigation remain usable`)
    await context.close()
  }
} catch (error) { failures.push({ policy: true, error: String(error) }) }
finally { await browser.close() }
writeFileSync(`${out}/report.json`, JSON.stringify({ results, failures }, null, 2))
console.log(JSON.stringify({ results, failures }, null, 2))
assert.deepEqual(failures, [])
