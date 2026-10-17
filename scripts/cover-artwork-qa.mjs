import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium, webkit, expect } from '@playwright/test'
import { withoutDecorativeWebGL } from './visible-layout-qa.mjs'
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5233'
const out = process.env.QA_OUTPUT_DIR || 'docs/reviews/cover-motion'
mkdirSync(out, { recursive: true })
const results = []
for (const [engine, theme] of [[chromium, 'light'], [webkit, 'dark']]) {
  const browser = await engine.launch()
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
    await context.addInitScript(theme => { localStorage.setItem('theme', theme); localStorage.setItem('portfolio-analytics-consent-v1', 'denied') }, theme)
    const page = await context.newPage()
    page.setDefaultNavigationTimeout(120000)
    await withoutDecorativeWebGL(page)
    for (const [view, container] of [['library', '.work-library-preview__frame'], ['timeline', '.work-timeline-feature[href="/raahi-project"]']]) {
      await page.goto(`${base}/work?view=${view}`, { waitUntil: 'domcontentloaded' })
      const frame = page.locator(container)
      if (view === 'library') await page.locator('.work-library-row[href="/raahi-project"]').first().hover()
      await frame.scrollIntoViewIfNeeded()
      if (view === 'library') await frame.hover(); else await frame.focus()
      const artwork = frame.locator('.cover-art')
      await expect(artwork).toHaveAttribute('data-cover-motion', 'playing', { timeout: 15000 })
      const screens = artwork.locator('.cover-motion__screen img')
      await expect(screens).toHaveCount(3)
      assert(await screens.evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0 && getComputedStyle(image).objectFit === 'contain' && getComputedStyle(image).animationName === 'none')), 'complete original screens retain their own sizing')
      if (engine === chromium) await frame.screenshot({ path: `${out}/${view}-screens.png` })
      await frame.press('Escape')
      await expect(artwork).toHaveAttribute('data-cover-motion', 'idle')
    }
    for (const view of ['library', 'timeline']) {
      await page.goto(`${base}/work?view=${view}`, { waitUntil: 'domcontentloaded' })
      const frame = view === 'library' ? page.locator('.work-library-preview__frame') : page.locator('.work-timeline-feature').first()
      await frame.scrollIntoViewIfNeeded()
      if (view === 'library') await frame.hover(); else await frame.focus()
      const artwork = frame.locator('.cover-art')
      await expect(artwork).toHaveAttribute('data-cover-motion', 'playing', { timeout: 15000 })
      const film = artwork.locator('video')
      await expect.poll(() => film.evaluate(video => video.currentTime)).toBeGreaterThan(.05)
      assert(await film.evaluate(video => { const film = video.getBoundingClientRect(), stage = video.parentElement.getBoundingClientRect(); return Math.abs(film.width - stage.width) < 1 && Math.abs(film.height - stage.height) < 1 }), 'film fills its artwork frame')
      await frame.press('Escape')
      await expect(artwork).toHaveAttribute('data-cover-motion', 'idle')
    }
    results.push(`${engine.name()} ${theme}: Index/Arc complete screen sizing, full-frame films, playback and Escape disposal passed`)
  } finally { await browser.close() }
}
writeFileSync(`${out}/artwork-verification.json`, JSON.stringify({ checkedAt: new Date().toISOString(), results, failures: [] }, null, 2))
console.log(results.join('\n'))
