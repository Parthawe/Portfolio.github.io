import { mkdirSync } from 'node:fs'
import { chromium, expect } from '@playwright/test'
import { revealForMeasurement, waitForReveal } from './visible-layout-qa.mjs'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4175'
const browser = await chromium.launch()
try {
  for (const width of [390, 1024, 1440]) {
    for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width, height: 979 } })
      await page.addInitScript(theme => localStorage.setItem('theme', theme), theme)
      await page.goto(`${base}/work/`)
      const cards = page.locator('.work-group--selected .pcard')
      const first = cards.first()
      await expect(first).toHaveClass(/is-in-viewport/)
      await waitForReveal(first)
      const priority = await page.locator('.page-work .pcard-visual > img[fetchpriority="high"]').evaluateAll(images => images.map(image => ({
        top: image.getBoundingClientRect().top, loading: image.loading,
      })))
      expect(priority.length).toBeGreaterThan(0)
      expect(priority.every(image => image.top < page.viewportSize().height && image.loading === 'eager')).toBe(true)
      const last = cards.last()
      await expect(last.locator('.pcard-visual > img')).toHaveAttribute('loading', 'lazy')
      const allCards = page.locator('.page-work .pcard')
      const offscreenIndex = await allCards.evaluateAll(elements => elements.findIndex(element => element.getBoundingClientRect().top > innerHeight + 300))
      expect(offscreenIndex).toBeGreaterThanOrEqual(0)
      expect(await allCards.nth(offscreenIndex).evaluate(element => element.getAnimations().some(animation => animation.animationName === 'workCardIn' && animation.playState === 'running'))).toBe(false)
      await revealForMeasurement(last)
      await waitForReveal(last)
      await expect(last.locator('.pcard-visual > img')).toHaveCSS('opacity', '1')
      expect(await last.locator('.pcard-visual > img').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true)
      await last.hover()
      await expect.poll(() => last.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m42)).toBeLessThan(0)
      await page.mouse.move(0, 0)
      if (process.env.QA_WORK_SCREENSHOTS) {
        mkdirSync(process.env.QA_WORK_SCREENSHOTS, { recursive: true })
        await first.scrollIntoViewIfNeeded()
        await page.screenshot({ path: `${process.env.QA_WORK_SCREENSHOTS}/work-${width}-${theme}.png` })
      }
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await expect(first).toHaveCSS('animation-name', 'none')
      await expect(last).toHaveCSS('animation-name', 'none')
      console.log(`PASS Work loading: ${width}px ${theme}, visible priority, deferred entrance/media, hover, reduced motion`)
      await page.close()
    }
  }
} finally {
  await browser.close()
}
