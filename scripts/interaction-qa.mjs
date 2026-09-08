import { chromium, expect } from '@playwright/test'
import { checkMarquees } from './marquee-qa.mjs'
import { checkProjectCardMotion } from './homepage-cards-qa.mjs'
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4175'
const browser = await chromium.launch()
try {
  await checkMarquees(browser, base)
  await checkProjectCardMotion(browser, base)
  for (const { mobile, reducedMotion } of [false, true].flatMap(mobile => ['reduce', 'no-preference'].map(reducedMotion => ({ mobile, reducedMotion })))) {
    const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 900 }, reducedMotion })
    await page.goto(`${base}/work/`)
    await expect(page.getByRole('heading', { name: 'Work', exact: true })).toBeVisible()
    if (mobile) {
      await page.getByRole('button', { name: 'Open menu', exact: true }).click()
      await expect(page.getByRole('dialog', { name: 'Site navigation' })).toBeVisible()
      await page.getByRole('button', { name: 'Close menu', exact: true }).click()
      await expect(page.locator('#mobile-navigation')).toHaveCount(0)
    } else {
      await page.getByRole('button', { name: 'UX Research', exact: true }).click()
      await expect(page.getByRole('button', { name: 'UX Research', exact: true })).toHaveAttribute('aria-pressed', 'true')
      await page.getByRole('button', { name: 'All', exact: true }).click()
    }
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden')
    // Let the compositor commit the closed overlay before sending wheel input.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    await page.mouse.move(mobile ? 190 : 700, 400)
    await page.mouse.wheel(0, 500)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(450)
    await page.mouse.wheel(0, 500)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(900)
    await page.evaluate(() => window.scrollTo({ top: 350, behavior: 'instant' }))
    const before = await page.evaluate(() => window.scrollY)
    await page.locator('a.pcard[href="/mentra"]').click()
    await expect(page.locator('.proj-visual-hero h1')).toContainText('Mentra')
    await page.goBack()
    await expect(page.getByRole('heading', { name: 'Work', exact: true })).toBeVisible()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before - 100)
    await page.goto(`${base}/mentra/`)
    await page.getByRole('button', { name: 'Reveal the Mentra product story', exact: true }).click()
    await expect(page.locator('#cs-context')).toBeAttached()
    const preview = page.getByRole('button', { name: /Open image preview:/ }).first()
    await preview.click()
    await expect(page.getByRole('button', { name: 'Close lightbox', exact: true })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('.lightbox-overlay')).toHaveCount(0)
    await page.goto(`${base}/mentra/#cs-impact`)
    await expect(page.locator('#cs-impact')).toBeAttached()
    await expect.poll(() => page.locator('#cs-impact').evaluate(e => Math.abs(e.getBoundingClientRect().top))).toBeLessThan(160)
    await page.goto(`${base}/studio/`)
    await expect(page.locator('main#main-content')).toBeVisible()
    if (mobile) await expect(page.getByRole('link', { name: /Browse work instead/ })).toBeVisible()
    else await expect(page.getByRole('button', { name: 'Selection (V)', exact: true })).toBeVisible()
    console.log(`PASS ${mobile ? 'mobile' : 'desktop'} / ${reducedMotion}: wheel, navigation, history, story, lightbox, anchor, Studio`)
    await page.close()
  }
  const touchPage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  await touchPage.goto(`${base}/work/`)
  await touchPage.getByRole('button', { name: 'Open menu', exact: true }).click()
  await touchPage.getByRole('button', { name: 'Close menu', exact: true }).click()
  await expect(touchPage.locator('#mobile-navigation')).toHaveCount(0)
  await expect(touchPage.locator('.page-loader')).toHaveCount(0)
  await expect.poll(() => touchPage.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden')
  await touchPage.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  const session = await touchPage.context().newCDPSession(touchPage)
  for (let gesture = 1; gesture <= 3; gesture++) {
    // Use an explicit touch sequence across platforms instead of relying on
    // the browser's high-level synthetic scroll gesture generator.
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 190, y: 650 }] })
    for (let step = 1; step <= 20; step++) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 190, y: 650 - step * 20 }] })
      await touchPage.waitForTimeout(16)
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await expect.poll(() => touchPage.evaluate(() => window.scrollY)).toBeGreaterThan(gesture * 350)
  }
  console.log('PASS Chromium touch emulation: three successive swipes after menu closure')
  await touchPage.close()
} finally { await browser.close() }
