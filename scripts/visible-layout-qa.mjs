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

/** Keep the reveal in view while deferred layout and its entrance settle.
 * Sampling computed filter alone can observe a suspended offscreen transition. */
export async function waitForReveal(locator, timeout = 15_000) {
  await expect.poll(async () => {
    await locator.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
    return locator.evaluate(async element => {
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      const reveal = element.closest('.reveal') || element
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(reveal)
      return {
        visible: element.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true })
          && rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.bottom <= innerHeight,
        settled: !reveal.getAnimations().some(animation => animation.playState === 'running' || animation.pending),
        clear: parseFloat(style.filter.match(/blur\(([\d.]+)/)?.[1] || '0') < 0.5
          && Number(style.opacity) >= 0.99,
      }
    })
  }, { timeout, message: 'Reveal must be in view, finished, opaque, and unblurred' }).toEqual({ visible: true, settled: true, clear: true })
}
