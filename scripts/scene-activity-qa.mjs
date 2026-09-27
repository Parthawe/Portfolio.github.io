import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'

// Run against Vite: QA_BASE_URL=http://127.0.0.1:4174 node scripts/scene-activity-qa.mjs
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  const base = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4174'
  await page.goto(base)
  await page.evaluate(async () => {
    const { createSceneActivity } = await import('/src/utils/sceneActivity.ts')
    document.body.replaceChildren()
    const host = document.createElement('div')
    host.style.cssText = 'width:300px;height:300px;background:#ddd'
    document.body.append(host)
    window.samples = []
    window.activity = createSceneActivity(host, delta => window.samples.push({ time: performance.now(), delta }))
    window.sceneHost = host
  })
  await page.waitForTimeout(1200)
  const initial = await page.evaluate(() => window.samples.length)
  assert(initial > 0 && initial <= 31, `Initial frame budget: ${initial}`)
  await page.waitForTimeout(10500)
  const idle = await page.evaluate(() => window.samples.length)
  await page.waitForTimeout(500)
  assert.equal(await page.evaluate(() => window.samples.length), idle)
  await page.evaluate(() => window.sceneHost.dispatchEvent(new Event('pointermove')))
  await page.waitForTimeout(200)
  assert((await page.evaluate(() => window.samples.length)) > idle)
  assert((await page.evaluate(() => window.samples.at(-1).delta)) <= .08)
  await page.evaluate(() => window.sceneHost.style.display = 'none')
  await page.waitForTimeout(150)
  const offscreen = await page.evaluate(() => window.samples.length)
  await page.waitForTimeout(300)
  assert.equal(await page.evaluate(() => window.samples.length), offscreen)
  await page.evaluate(() => window.sceneHost.style.display = 'block')
  await page.waitForTimeout(200)
  assert((await page.evaluate(() => window.samples.length)) > offscreen)
  // Exercise the browser visibility listener without relying on headless tab throttling.
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  const hidden = await page.evaluate(() => window.samples.length)
  await page.waitForTimeout(300)
  assert.equal(await page.evaluate(() => window.samples.length), hidden)
  await page.evaluate(() => {
    delete document.hidden
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForTimeout(150)
  const reduced = await page.evaluate(() => window.samples.length)
  await page.waitForTimeout(300)
  assert.equal(await page.evaluate(() => window.samples.length), reduced)
  await page.evaluate(() => window.sceneHost.dispatchEvent(new Event('keydown')))
  await page.waitForTimeout(150)
  assert.equal(await page.evaluate(() => window.samples.length), reduced + 1)
  await page.evaluate(() => window.activity.dispose())
  const disposed = await page.evaluate(() => window.samples.length)
  await page.evaluate(() => window.sceneHost.dispatchEvent(new Event('pointermove')))
  await page.waitForTimeout(200)
  assert.equal(await page.evaluate(() => window.samples.length), disposed)
  console.log('PASS: frame cap, idle, input wake, bounded resume delta, offscreen, hidden tab, reduced motion, cleanup')
} finally {
  await browser.close()
}
