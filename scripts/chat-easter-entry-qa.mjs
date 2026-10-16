import assert from 'node:assert/strict'
import { chromium, expect } from '@playwright/test'
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5211'
const browser = await chromium.launch()
try {
  for (const width of [1440, 1024]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    await page.addInitScript(() => localStorage.setItem('portfolio-chat-layout-v1', JSON.stringify({ dock: 'floating', width: 340, height: 620, x: 50, y: 100, textSize: 15 })))
    await page.goto(base + '/about', { waitUntil: 'domcontentloaded' })
    await page.getByRole('button', { name: 'Show Easter egg tools', exact: true }).click()
    await page.getByRole('button', { name: 'Open Ask Parth AI assistant', exact: true }).click()
    const panel = page.getByRole('complementary', { name: 'Ask Parth chat' })
    await expect(panel).toBeVisible()
    await expect(panel).toHaveAttribute('data-dock', 'left')
    const box = await panel.boundingBox()
    assert.equal(box.x, 0)
    assert.equal(box.y, 0)
    assert.equal(box.height, 900)
    await expect(page.locator('#nav-easter-tools')).toHaveCount(0)
    assert.equal(await page.locator('#site-zoom-stage').evaluate(el => Math.round(el.getBoundingClientRect().x)), width >= 1200 ? Math.round(box.width) : 0)
    await page.getByRole('textbox', { name: 'Message Ask Parth' }).fill('Keep my question')
    await page.getByRole('button', { name: 'Close panel', exact: true }).click()
    await page.getByRole('button', { name: 'Show Easter egg tools', exact: true }).click()
    await page.getByRole('button', { name: 'Open Ask Parth AI assistant', exact: true }).click()
    await expect(page.getByRole('textbox', { name: 'Message Ask Parth' })).toHaveValue('Keep my question')
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
    console.log(`${width}px: Easter AI opens full-height left panel, closes menu, keeps draft and leaves page alongside.`)
    await page.close()
  }
} finally { await browser.close() }
