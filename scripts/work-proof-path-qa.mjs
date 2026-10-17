import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium, webkit, expect } from '@playwright/test'
import { withoutDecorativeWebGL } from './visible-layout-qa.mjs'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5236'
const out = process.env.QA_OUTPUT_DIR || '/tmp/work-proof-path-qa'
mkdirSync(out, { recursive: true })
const results = [], failures = []
const profiles = [[chromium,1440,'light'], [chromium,1440,'dark'], [chromium,768,'dark'], [chromium,390,'light'], [chromium,320,'dark'], [webkit,1440,'light'], [webkit,390,'dark']]

for (const [engine, width, theme] of profiles) {
  const browser = await engine.launch()
  const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width < 500, reducedMotion: 'reduce',
    recordVideo: engine === chromium && width === 390 ? { dir: out } : undefined })
  await context.addInitScript(theme => {
    localStorage.setItem('theme', theme)
    localStorage.setItem('portfolio-analytics-consent-v1', 'denied')
  }, theme)
  const page = await context.newPage(), errors = [], requests = []
  let mobileArc
  page.on('pageerror', error => errors.push(error.message))
  page.on('request', request => { if (request.url().includes('/Assets/case-study-slides/mentra/')) requests.push(request.url()) })
  await withoutDecorativeWebGL(page)
  const overflow = async () => assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'no page overflow')
  try {
    const origin = '/work?view=timeline&filter=ai'
    await page.goto(base + origin)
    await page.locator('.work-timeline-feature').first().waitFor()
    await expect(page.locator('.page-loader')).toHaveCount(0)
    await page.evaluate(() => document.fonts.ready)
    const hrefs = await page.locator('.work-timeline-feature, .work-timeline-support-row').evaluateAll(links => links.map(link => link.getAttribute('href')))
    assert.equal(hrefs.length, new Set(hrefs).size, 'Arc contains each project exactly once')
    await expect(page.locator('#work-timeline-2024 a[href="/jugalbandi"]')).toHaveCount(1)
    for (const year of await page.locator('.work-timeline-year').all()) {
      const count = await year.locator('.work-timeline-feature, .work-timeline-support-row').count()
      await expect(year.locator('.work-timeline-year__count')).toHaveText(`${count} project${count === 1 ? '' : 's'}`)
    }
    if (width <= 900) {
      const rail = await page.locator('.work-timeline-rail').boundingBox()
      const firstProject = await page.locator('.work-timeline-feature').first().boundingBox()
      mobileArc = { periodHeight: rail.height, firstProjectTop: firstProject.y }
      assert(rail.height < 100, 'mobile periods occupy one compact row')
      assert(firstProject.y < 900, 'first project starts in the opening viewport')
      await page.screenshot({ path: `${out}/arc-opening-${engine.name()}-${width}-${theme}.png` })
      const lastPeriod = page.getByRole('toolbar', { name: 'Jump to period' }).getByRole('button').last()
      await lastPeriod.focus()
      assert(await lastPeriod.evaluate(button => { const r = button.getBoundingClientRect(), parent = button.parentElement.getBoundingClientRect(); return r.left >= parent.left - 1 && r.right <= parent.right + 1 }), 'keyboard focus reveals offscreen period')
      await lastPeriod.press('Enter')
      await expect(lastPeriod).toHaveAttribute('aria-pressed', 'true')
      if (width < 500) {
        const firstPeriod = page.getByRole('toolbar', { name: 'Jump to period' }).getByRole('button').first()
        await firstPeriod.tap()
        await expect(firstPeriod).toHaveAttribute('aria-pressed', 'true')
      }
      await page.evaluate(() => scrollTo(0, 0))
    }
    await overflow()
    await page.screenshot({ path: `${out}/arc-${engine.name()}-${width}-${theme}.png` })

    await page.locator('.work-timeline-feature[href="/mentra"]').click()
    const back = page.getByRole('link', { name: 'Back to work', exact: true }).first()
    await expect(back).toHaveAttribute('href', origin)
    await page.getByRole('link', { name: 'Overview', exact: true }).click()
    await expect(page).toHaveURL(/#project-overview$/)
    await expect(back).toHaveAttribute('href', origin)
    const proof = page.locator('#cs-design-proof')
    await expect(proof.getByRole('heading', { name: 'Give apps the home screen' })).toBeVisible()
    const image = proof.locator('.case-study-slide > img')
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true)
    assert(requests.every(url => /\/slide-6-28341(?:-768|-1280)?\.webp$/.test(url)), 'summary requests only the original quick proof')
    await expect(proof).toContainText('Evaluation dates and cohort sizes are not included')
    assert.equal(await page.locator('#source-presentation').count(), 0, 'full archive stays unmounted in quick read')
    await image.focus(); await image.press('Enter')
    await expect(page.getByRole('dialog', { name: 'Image preview', exact: true })).toBeVisible()
    await page.keyboard.press('Escape'); await expect(image).toBeFocused()
    await proof.screenshot({ path: `${out}/mentra-proof-${engine.name()}-${width}-${theme}.png` })
    await page.locator('.cs-expand-preview-btn').click()
    await expect(page.locator('.case-study-slide')).toHaveCount(10)
    await expect(page.locator('#cs-design-proof')).toHaveCount(0)
    await expect(back).toHaveAttribute('href', origin)
    await page.getByRole('link', { name: 'Overview', exact: true }).click()
    await expect(back).toHaveAttribute('href', origin)
    await back.click(); await expect(page).toHaveURL(base + origin)

    await page.goto(base + '/work?view=library')
    const row = page.locator('.work-library-row').first()
    await expect(row.locator('.work-library-row__detail')).toBeVisible()
    await expect(page.locator('.page-loader')).toHaveCount(0)
    if (width <= 900) {
      const positions = await row.evaluate(row => {
        const rect = selector => row.querySelector(selector).getBoundingClientRect()
        return { title: rect('.work-library-row__project').bottom, detail: rect('.work-library-row__detail').top, year: rect('.work-library-row__year').top, detailBottom: rect('.work-library-row__detail').bottom }
      })
      assert(positions.detail >= positions.title && positions.year >= positions.detailBottom, 'mobile descriptions sit between project identity and date')
    }
    await overflow(); await page.screenshot({ path: `${out}/index-${engine.name()}-${width}-${theme}.png` })
    await row.click()
    await expect(back).toHaveAttribute('href', '/work?view=library')
    await page.getByRole('link', { name: 'Overview', exact: true }).click()
    await expect(back).toHaveAttribute('href', '/work?view=library')
    await back.click(); await expect(page).toHaveURL(base + '/work?view=library')
    await page.goBack(); await expect(back).toHaveAttribute('href', '/work?view=library')
    await page.reload(); await expect(back).toHaveAttribute('href', '/work')
    await page.goto(base + '/mentra#cs-design-proof')
    await expect(page.locator('#cs-design-proof')).toBeVisible()
    await expect(page.locator('.case-study-slide')).toHaveCount(1)
    assert.equal(await page.locator('[id]').evaluateAll(nodes => { const ids = nodes.map(node => node.id); return ids.length - new Set(ids).size }), 0, 'no duplicated chapter anchors')
    await overflow(); assert.deepEqual(errors, [])
    results.push({ engine: engine.name(), width, theme, status: 'pass', mobileArc })
  } catch (error) {
    failures.push({ engine: engine.name(), width, theme, error: String(error), errors })
    await page.screenshot({ path: `${out}/FAIL-${engine.name()}-${width}-${theme}.png` }).catch(() => {})
  } finally { await context.close(); await browser.close() }
}
writeFileSync(`${out}/report.json`, JSON.stringify({ base, results, failures }, null, 2))
console.log(JSON.stringify({ checks: results.length, failures }, null, 2))
assert.deepEqual(failures, [])
