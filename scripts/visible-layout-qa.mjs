import { expect } from '@playwright/test'

/** Measure only rendered content. Auto-contained sections can shift the scroll
 * position when their estimated height is replaced with their actual height. */
export async function revealForMeasurement(locator) {
  await locator.page().evaluate(() => document.fonts.ready)
  await expect(async () => {
    await locator.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await expect(locator).toBeInViewport()
    await expect.poll(() => locator.evaluate(element => {
      const rect = element.getBoundingClientRect()
      return element.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true })
        && rect.width > 0 && rect.height > 0
        && rect.top < innerHeight && rect.bottom > 0
    })).toBe(true)
  }).toPass({ timeout: 15_000 })
}
