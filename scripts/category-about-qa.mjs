import { expect } from '@playwright/test'

export async function checkCategoryAbout(browser, base) {
  const routes = ['ai', 'ux-design', 'design-engineering', 'installations', 'brand-visual', 'fintech', 'design-for-good', 'crypto', 'ai-wearables']
  for (const route of routes) {
    for (const width of [390, 1187]) {
      for (const theme of ['light', 'dark']) {
        // No prior Home visit: shared styling must load with the component.
        const page = await browser.newPage({ viewport: { width, height: 979 }, reducedMotion: 'reduce' })
        await page.addInitScript(value => localStorage.setItem('theme', value), theme)
        await page.goto(`${base}/${route}/`)
        const card = page.locator('#about-card')
        await card.scrollIntoViewIfNeeded()
        await expect(card.locator('.wr-about-body')).toHaveCSS('display', 'grid')
        await expect(card.locator('.wr-about-border')).toHaveCSS('position', 'absolute')
        const headingSize = await card.locator('.wr-about-heading').first().evaluate(element => parseFloat(getComputedStyle(element).fontSize))
        expect(headingSize).toBeGreaterThanOrEqual(width < 769 ? 32 : 48)
        const image = await card.locator('.wr-about-work-preview').boundingBox()
        expect(image.width).toBeLessThanOrEqual(320)
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1)
        await expect(card.getByRole('link', { name: 'read more.' })).toHaveAttribute('href', '/about')
        console.log(`PASS category About card: /${route}/ ${width}px ${theme}`)
        await page.close()
      }
    }
  }
}
