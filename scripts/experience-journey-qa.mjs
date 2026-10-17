import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium, webkit, expect } from '@playwright/test'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5238'
const out = process.env.QA_OUTPUT_DIR || '/tmp/portfolio-experience-journey/navigation'
mkdirSync(out, { recursive: true })
const results = []
for (const [engine, width, height, theme] of [[chromium,1440,1000,'light'],[chromium,390,844,'dark'],[chromium,320,740,'light'],[webkit,390,844,'light']]) {
  const browser = await engine.launch()
  const context = await browser.newContext({ viewport: { width, height }, hasTouch: width < 500, reducedMotion: 'reduce', recordVideo: width === 390 && engine === chromium ? { dir: out } : undefined })
  await context.addInitScript(theme => { try { localStorage.setItem('theme', theme); localStorage.setItem('portfolio-analytics-consent-v1', 'denied') } catch { /* A blocked third-party frame has an opaque origin. */ } }, theme)
  const page = await context.newPage(), errors = []
  page.on('pageerror', error => errors.push(error.message))
  const fits = async () => assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'page fits viewport')
  try {
    // A long, lazily rendered destination must begin at its heading after Next,
    // and browser Back must restore the previous reading position.
    await page.goto(base + '/experience-preview?kind=anatomy&q=jugal')
    await page.locator('.experience-review-card[href="/experience-preview/jugalbandi"]').click()
    await expect(page.locator('.ja-duet-stage figure')).toHaveCount(2)
    const footer = page.getByRole('navigation', { name: 'More project experiences' })
    await footer.getByRole('link', { name: /Next/ }).scrollIntoViewIfNeeded()
    const savedY = await page.evaluate(() => scrollY)
    assert(savedY > height, 'the journey begins near the bottom')
    await footer.getByRole('link', { name: /Next/ }).click()
    await expect(page.locator('.moniac-game')).toHaveAttribute('data-mode', 'study')
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0)
    await expect(page.locator('h1')).toBeFocused()
    await page.getByRole('button', { name: 'Run one model step', exact: true }).click()
    const comparison = page.getByRole('region', { name: 'Model step comparison', exact: true })
    await expect(comparison.locator('tbody tr')).toHaveCount(4)
    if (width === 320) {
      await comparison.focus()
      await comparison.press('ArrowRight')
      await expect.poll(() => comparison.evaluate(element => element.scrollLeft)).toBeGreaterThan(0)
      await comparison.evaluate(element => { element.scrollLeft = element.scrollWidth })
      assert(await comparison.evaluate(element => element.querySelector('tbody tr:last-child td:last-child').getBoundingClientRect().right <= element.getBoundingClientRect().right + 1), 'last comparison column is reachable')
    }
    await page.getByRole('button', { name: 'Start Economy', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Pause game', exact: true })).toBeFocused()
    await expect(page.locator('.moniac-console-header')).toBeInViewport()
    await page.getByRole('button', { name: 'Pause game', exact: true }).click()
    await page.goBack()
    await expect(page.locator('.ja-duet-stage figure')).toHaveCount(2)
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(savedY - 30)
    await page.getByRole('link', { name: 'All experiences', exact: true }).first().click()
    await expect(page).toHaveURL(/kind=anatomy&q=jugal/)
    await expect(page.locator('.experience-review-card')).toHaveCount(1)
    await fits()

    await page.goto(base + '/experience-preview?kind=tools')
    await expect(page.getByRole('button', { name: /^Tools/ })).toHaveAttribute('aria-pressed', 'true')
    const tools = await page.locator('.experience-review-card').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))
    await page.getByRole('button', { name: /^Games/ }).click()
    await expect(page.locator('.experience-review-card[href="/experience-preview/the-omakase"]')).toHaveCount(1)
    const games = await page.locator('.experience-review-card').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))
    assert(games.some(href => href.includes('the-omakase')), 'Omakase remains in Games')
    assert(!tools.some(href => games.includes(href)), 'Tools and Games are distinct')
    await page.getByRole('searchbox').fill('nothing-matches-this-project')
    await expect(page.getByRole('heading', { name: 'No matching experiences' })).toBeVisible()
    await page.getByRole('button', { name: 'Show all experiences' }).click()
    await expect(page.locator('.experience-review-card')).toHaveCount(20)
    await page.screenshot({ path: `${out}/directory-${engine.name()}-${width}.png`, fullPage: true })

    await page.goto(base + '/experience-preview/enigma')
    await expect(page.locator('.enigma-letter-keys button')).toHaveCount(26)
    for (const button of await page.locator('.enigma-letter-keys button').all()) {
      const box = await button.boundingBox()
      assert(box.width >= 44 && box.height >= 44, `letter target ${box.width} × ${box.height}`)
    }
    const toggle = page.locator('.experience-theme-toggle')
    const box = await toggle.boundingBox()
    assert(box.width >= 44 && box.height >= 44)
    await toggle.click()
    await fits()

    await page.goto(base + '/experience-preview/jugalbandi')
    const input = page.getByRole('button', { name: 'Flute touch 1: C4', exact: true })
    await input.scrollIntoViewIfNeeded()
    const target = await input.boundingBox(), response = await page.locator('.ja-duet-stage').boundingBox()
    if (width < 500) {
      assert(response.y >= 0 && response.y + response.height <= height, 'robot remains visible beside the playing controls')
      assert(target.y >= response.y + response.height - 1 && target.y + target.height <= height, 'note input remains visible below robot')
    }
    await input.click()
    await expect(page.locator('.ja-duet p[role=status]')).toContainText('Robotic flute')
    await fits()
    await page.screenshot({ path: `${out}/play-${engine.name()}-${width}.png` })

    // A blocked external prototype still leaves a working local task, and
    // choosing it disposes the external frame instead of leaving it running.
    await page.route('https://www.figma.com/embed**', route => route.abort())
    await page.goto(base + '/experience-preview/healthapp')
    await page.getByRole('button', { name: 'Load Figma task prototype', exact: true }).click()
    await expect(page.locator('iframe')).toHaveCount(1)
    await page.getByRole('button', { name: 'Use the browser study', exact: true }).click()
    await expect(page.locator('iframe')).toHaveCount(0)
    await expect(page.locator('.original-interface-study > summary')).toBeFocused()
    await expect(page.getByLabel('Today’s capacity')).toBeVisible()
    await fits()
    assert.deepEqual(errors, [])
    results.push({ browser: engine.name(), width, height, theme, history: true, directoryReturn: true, filters: true, targetSize: true, mobilePlay: true, externalFallback: true, errors })
    const video = page.video()
    await context.close()
    if (video) await video.saveAs(`${out}/journey-mobile.webm`)
  } finally { await browser.close() }
}
writeFileSync(`${out}/report.json`, JSON.stringify(results, null, 2))
console.log(results)
