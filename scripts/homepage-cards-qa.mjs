import { expect } from '@playwright/test'

export async function checkProjectCardMotion(browser, base, widths = [1187, 390]) {
  for (const width of widths) {
    for (const route of ['/', '/work/', '/ux-research/']) {
      const page = await browser.newPage({ viewport: { width, height: 979 }, reducedMotion: 'no-preference' })
      await page.goto(`${base}${route}`)
      const card = page.locator('a.pcard').first()
      await card.scrollIntoViewIfNeeded()
      await page.mouse.move(0, 0)
      const track = card.locator('.pcard-marquee-track')
      await expect.poll(() => track.evaluate(element =>
        element.firstElementChild.offsetWidth / parseFloat(getComputedStyle(element).animationDuration)
      )).toBeCloseTo(route === '/' ? 10 : 20, 1)
      await expect(track).toHaveCSS('animation-iteration-count', 'infinite')
      await expect(track).toHaveCSS('animation-play-state', 'running')
      const before = await track.evaluate(element => getComputedStyle(element).transform)
      await expect.poll(() => track.evaluate(element => getComputedStyle(element).transform)).not.toBe(before)
      const geometry = await track.evaluate(element => {
        const spans = element.querySelectorAll('span')
        return Math.abs(spans[1].getBoundingClientRect().x - spans[0].getBoundingClientRect().x - element.getBoundingClientRect().width / 2)
      })
      expect(geometry).toBeLessThan(1)
      await card.hover()
      await expect(track).toHaveCSS('animation-play-state', 'paused')
      await page.mouse.move(0, 0)
      await card.focus()
      await expect(track).toHaveCSS('animation-play-state', 'paused')
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await expect(track).toHaveCSS('animation-name', 'none')
      console.log(`PASS card text loop: ${route} ${width}px, ${route === '/' ? 10 : 20}px/s seamless motion, hover/focus pause, reduced-motion support`)
      await page.close()
    }
  }
}

export async function checkHomepageCards(page, width, theme) {
  const grid = page.locator('.wr-feat-grid')
  const cards = grid.locator('a.pcard')
  await expect(cards).toHaveCount(4)
  await cards.first().scrollIntoViewIfNeeded()
  for (const card of await cards.all()) {
    await expect(card).toHaveCSS('display', 'block')
    await expect(card.locator('.pcard-top-row')).toHaveCSS('position', 'absolute')
    await expect(card.locator('.pcard-name')).toHaveCSS('position', 'absolute')
    await expect(card.locator('.pcard-marquee-track')).toHaveCSS('animation-name', 'pcard-scroll')
    await expect(card.locator('.pcard-marquee')).toHaveCSS('position', 'absolute')
    await expect(card.locator('.pcard-marquee-track > span')).toHaveCount(2)
    await expect.poll(() => card.locator('.pcard-marquee-track').evaluate(element =>
      element.firstElementChild.offsetWidth / parseFloat(getComputedStyle(element).animationDuration)
    )).toBeCloseTo(10, 1)
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
        return reveal ? parseFloat(getComputedStyle(reveal).filter.match(/blur\(([\d.]+)/)?.[1] || '0') : 0
      })).toBeLessThan(0.5)
  if (process.env.QA_MARQUEE_SCREENSHOTS) {
    await (width > 600 ? grid : cards.first()).screenshot({ path: `${process.env.QA_MARQUEE_SCREENSHOTS}/homepage-cards-${width}-${theme}.png` })
  }
  console.log(`PASS fresh homepage cards: ${width}px ${theme}, four cards, overlays, compact NDA icons, scrolling summaries`)
}
