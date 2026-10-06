import { mkdirSync, readFileSync } from 'node:fs'
import { chromium, expect } from '@playwright/test'
import { revealForMeasurement, waitForReveal } from './visible-layout-qa.mjs'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4175'
const browser = await chromium.launch()
try {
  const source = readFileSync(new URL('../src/data/cardCoverBrightness.ts', import.meta.url), 'utf8')
  const brightness = JSON.parse(source.match(/= (\{[\s\S]*\})/)[1])
  expect(Object.keys(brightness).length).toBeGreaterThan(0)
  const contrastPage = await browser.newPage()
  await contrastPage.goto(`${base}/work/`)
  const mismatches = await contrastPage.evaluate(async brightness => {
    const mismatches = []
    for (const [path, known] of Object.entries(brightness)) {
      const image = new Image()
      image.src = path
      await image.decode()
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 64
      const context = canvas.getContext('2d', { willReadFrequently: true })
      context.drawImage(image, 0, 0, 64, 64)
      const pixels = context.getImageData(0, 0, 64, 64).data
      let total = 0
      for (let i = 0; i < pixels.length; i += 4) total += pixels[i] * .299 + pixels[i + 1] * .587 + pixels[i + 2] * .114
      const actual = total / 4096
      if ((actual > 140) !== (known > 140)) mismatches.push({ path, known, actual })
    }
    return mismatches
  }, brightness)
  expect(mismatches, 'Cached cover luminance must preserve the actual image contrast').toEqual([])
  console.log(`PASS static cover contrast: ${Object.keys(brightness).length} images match measured text treatment`)
  await contrastPage.close()
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
