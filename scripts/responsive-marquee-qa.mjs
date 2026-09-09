import { chromium, expect } from '@playwright/test'
import { checkMarquees } from './marquee-qa.mjs'
import { checkProjectCardMotion } from './homepage-cards-qa.mjs'
import { checkCategoryAbout } from './category-about-qa.mjs'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4175'
const sizes = [[320, 740], [430, 932], [768, 1024], [1024, 768], [844, 390], [1920, 1080]]
const browser = await chromium.launch()
try {
  for (const [width, height] of sizes) {
    for (const route of ['/', '/work/', '/ux-research/', '/mentra/', '/transfi-project/', '/vj-software/']) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' })
      await page.goto(`${base}${route}`)
      await expect(page.locator('main')).toBeVisible({ timeout: 20_000 })
      await page.evaluate(() => document.fonts.ready)
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1)
      if (route === '/' && height < 500) {
        const title = await page.locator('.wr-hero-title').boundingBox()
        expect(title.y).toBeGreaterThan(80)
      }
      if (route === '/work/' && width > 768) {
        const rail = page.locator('.work-bottom-nav')
        await expect(rail).toHaveCSS('transition-duration', '0s')
        const rect = await rail.boundingBox()
        expect(rect.x).toBeGreaterThanOrEqual(0)
        expect(rect.x + rect.width).toBeLessThanOrEqual(width)
        const last = rail.getByRole('button').last()
        await last.click()
        await expect(last).toHaveAttribute('aria-pressed', 'true')
      }
      console.log(`PASS responsive layout: ${route} ${width}x${height}`)
      await page.close()
    }
  }
  await checkMarquees(browser, base, sizes.map(([width]) => width))
  await checkProjectCardMotion(browser, base, sizes.map(([width]) => width))
  await checkCategoryAbout(browser, base)
} finally {
  await browser.close()
}
