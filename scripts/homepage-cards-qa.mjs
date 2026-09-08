import { expect } from '@playwright/test'

export async function checkHomepageCards(page, width, theme) {
  const grid = page.locator('.wr-feat-grid')
  const cards = grid.locator('a.pcard')
  await expect(cards).toHaveCount(4)
  await cards.first().scrollIntoViewIfNeeded()
  for (const card of await cards.all()) {
    await expect(card).toHaveCSS('display', 'block')
    await expect(card.locator('.pcard-top-row')).toHaveCSS('position', 'absolute')
    await expect(card.locator('.pcard-name')).toHaveCSS('position', 'absolute')
    await expect(card.locator('.pcard-summary-static')).toHaveCSS('animation-name', 'none')
  }
  const dimensions = await grid.evaluate(element => ({
    locks: [...element.querySelectorAll('.pcard-tag-lock')].map(lock => lock.getBoundingClientRect().width),
    tags: [...element.querySelectorAll('.pcard-tag')].map(tag => getComputedStyle(tag).borderRadius),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }))
  expect(dimensions.locks.length).toBeGreaterThan(0)
  for (const size of dimensions.locks) { expect(size).toBeGreaterThan(5); expect(size).toBeLessThan(20) }
  for (const radius of dimensions.tags) expect(parseFloat(radius)).toBeGreaterThan(0)
  expect(dimensions.overflow).toBeLessThanOrEqual(1)
  await expect(cards.first().locator('.pcard-visual')).toHaveClass(/loaded/)
  await expect.poll(() => cards.first().evaluate(element => {
    const reveal = element.closest('.reveal')
    return reveal ? getComputedStyle(reveal).filter : 'none'
  })).toMatch(/^(none|blur\(0px\))$/)
  if (process.env.QA_MARQUEE_SCREENSHOTS) {
    await (width > 600 ? grid : cards.first()).screenshot({ path: `${process.env.QA_MARQUEE_SCREENSHOTS}/homepage-cards-${width}-${theme}.png` })
  }
  console.log(`PASS fresh homepage cards: ${width}px ${theme}, four cards, overlays, compact NDA icons, static summaries`)
}
