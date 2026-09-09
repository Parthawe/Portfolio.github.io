import { expect } from '@playwright/test'
import { checkHomepageCards } from './homepage-cards-qa.mjs'

export async function checkMarquees(browser, base, widths = [1187, 390]) {
  for (const width of widths) {
    for (const theme of ['light', 'dark']) {
      // Fresh context: visiting a category first used to hide the missing CSS.
      const page = await browser.newPage({ viewport: { width, height: 979 } })
      await page.addInitScript(theme => localStorage.setItem('theme', theme), theme)
      await page.goto(`${base}/`)
      const strip = page.locator('.cl-marquee')
      await strip.scrollIntoViewIfNeeded()
      await expect.poll(() => strip.evaluate(element => {
        const reveal = element.closest('.reveal')
        return reveal ? parseFloat(getComputedStyle(reveal).filter.match(/blur\(([\d.]+)/)?.[1] || '0') : 0
      })).toBeLessThan(0.5)
      const track = strip.locator('.cl-marquee-track')
      await expect(track).toHaveCSS('display', 'flex')
      await expect(track.locator('img')).toHaveCount(12)
      const geometry = await track.evaluate(element => {
        const images = [...element.querySelectorAll('img')]
        return {
          maxHeight: Math.max(...images.map(image => image.getBoundingClientRect().height)),
          repeatError: Math.abs(images[6].getBoundingClientRect().x - images[0].getBoundingClientRect().x - element.getBoundingClientRect().width / 2),
          iterations: getComputedStyle(element).animationIterationCount,
        }
      })
      expect(geometry.maxHeight).toBeGreaterThan(20)
      expect(geometry.maxHeight).toBeLessThanOrEqual(40)
      expect(geometry.repeatError).toBeLessThan(1)
      expect(geometry.iterations).toBe('infinite')
      const before = await track.evaluate(element => getComputedStyle(element).transform)
      await expect.poll(() => track.evaluate(element => getComputedStyle(element).transform)).not.toBe(before)
      if (process.env.QA_MARQUEE_SCREENSHOTS) await strip.screenshot({ path: `${process.env.QA_MARQUEE_SCREENSHOTS}/marquee-${width}-${theme}.png` })
      console.log(`PASS homepage marquee: ${width}px ${theme}, bounded logos, motion, seamless repeat geometry`)
      await checkHomepageCards(page, width, theme)
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await expect(track).toHaveCSS('animation-name', 'none')
      await expect(track.locator('img:visible')).toHaveCount(6)
      expect(await track.evaluate(element => {
        const box = element.getBoundingClientRect()
        return [...element.querySelectorAll('img')].filter(image => image.getClientRects().length)
          .every(image => {
            const rect = image.getBoundingClientRect()
            return rect.left >= box.left - 1 && rect.right <= box.right + 1
          })
      })).toBe(true)
      console.log(`PASS reduced-motion logos: ${width}px ${theme}, stationary, all six visible`)
      await page.close()
    }
  }
}
