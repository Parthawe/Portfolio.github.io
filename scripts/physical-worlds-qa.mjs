import assert from 'node:assert/strict'
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { chromium } from '@playwright/test'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5197'
const slugs = [...readFileSync(new URL('../src/data/projectRoutes.ts', import.meta.url), 'utf8').matchAll(/slug: '([^']+)'/g)].map(match => match[1])
const out = process.env.QA_OUTPUT_DIR || '/tmp/portfolio-physical-worlds-qa'
mkdirSync(out, { recursive: true })
const browser = await chromium.launch({ headless: true })
const errors = [], results = []
try {
  for (const profile of [{ name: 'desktop', width: 1185, height: 969, theme: 'light' }, { name: 'mobile', width: 375, height: 812, theme: 'dark' }]) {
    const context = await browser.newContext({ viewport: { width: profile.width, height: profile.height }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    page.setDefaultTimeout(15000)
    page.setDefaultNavigationTimeout(30000)
    page.on('pageerror', error => errors.push({ profile: profile.name, url: page.url(), error: error.message }))
    await page.addInitScript(theme => { localStorage.setItem('theme', theme) }, profile.theme)
    for (const slug of slugs) {
      try {
        const route = slug === 'shuffle' ? '/shuffle/simulation' : `/${slug}/world`
        await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' })
        await page.locator('canvas').waitFor()
        await page.waitForTimeout(200)
        assert.equal(await page.getByText('3D is unavailable.', { exact: false }).count(), 0, 'scene should render')
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'room has no horizontal overflow')
        if (slug !== 'shuffle') {
          const range = page.locator('input[type="range"]').first()
          const initial = await range.count() ? await range.inputValue() : await page.locator('select').first().inputValue()
          if (await range.count()) { await range.focus(); await range.press('End'); assert.equal(await range.inputValue(), await range.getAttribute('max'), 'keyboard changes the control') }
          else await page.locator('select').first().selectOption({ index: 1 })
          await page.getByRole('button', { name: 'Reset', exact: true }).click()
          assert.equal(await range.count() ? await range.inputValue() : await page.locator('select').first().inputValue(), initial, 'reset restores the original control value')
          await page.getByRole('button', { name: 'Overhead', exact: true }).click()
        } else await page.getByRole('button', { name: 'Room', exact: true }).click()
        if (['mentra','the-omakase','making-of-time','drowning','dumb-waiter-set-design','enigma','shuffle'].includes(slug)) await page.screenshot({ path: `${out}/${profile.name}-${slug}.png` })
        results.push({ profile: profile.name, slug, room: 'pass' })
        if (results.length % 10 === 0) console.log(`${profile.name}: ${results.length} checks complete`)
      } catch (error) { results.push({ profile: profile.name, slug, room: 'fail', error: error.message }) }
    }
    for (const slug of slugs) {
      try {
        await page.goto(`${base}/${slug}`, { waitUntil: 'domcontentloaded' })
        await page.locator('.project-room-link a').waitFor()
        assert.equal(await page.locator('.app-error').count(), 0, 'case study renders')
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'case study has no horizontal overflow')
        const href = await page.locator('.project-room-link a').first().getAttribute('href')
        assert.equal(href, slug === 'shuffle' ? '/shuffle/simulation' : `/${slug}/world`, 'case links to its own room')
        results.push({ profile: profile.name, slug, caseStudy: 'pass' })
      } catch (error) { results.push({ profile: profile.name, slug, caseStudy: 'fail', error: error.message }) }
    }
    await page.goto(`${base}/physical-worlds`, { waitUntil: 'domcontentloaded' })
    await page.locator('.physical-world-index a').first().waitFor()
    assert.equal(await page.locator('.physical-world-index a').count(), slugs.length, 'every public project has a room entry')
    await page.goto(`${base}/work`, { waitUntil: 'domcontentloaded' })
    await page.getByRole('link', { name: 'Explore the project rooms' }).waitFor()
    await context.close()
    console.log(`${profile.name}: checked ${slugs.length} rooms and ${slugs.length} case studies`)
  }
  const recovery = await browser.newPage()
  await recovery.addInitScript(() => {
    window.__denyRoomWebGL = true
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function(type, ...args) {
      if (window.__denyRoomWebGL && (type === 'webgl' || type === 'webgl2')) return null
      return original.call(this, type, ...args)
    }
  })
  await recovery.goto(`${base}/mentra/world`, { waitUntil: 'domcontentloaded' })
  await recovery.getByRole('link', { name: 'View the project photographs' }).waitFor()
  assert(await recovery.getByRole('button', { name: 'Object', exact: true }).isDisabled(), 'failed scene disables camera controls')
  assert.equal(await recovery.locator('.physical-world-hint').count(), 0, 'failed scene hides drag instructions')
  await recovery.evaluate(() => { window.__denyRoomWebGL = false })
  await recovery.getByRole('button', { name: 'Reset', exact: true }).click()
  await recovery.locator('canvas').waitFor()
  assert.equal(await recovery.getByText('3D is unavailable.', { exact: false }).count(), 0, 'reset retries rendering')
  await recovery.close()
  results.push({ rendererRecovery: 'pass' })
} finally {
  await browser.close()
  writeFileSync(`${out}/report.json`, JSON.stringify({ results, errors }, null, 2))
}
const failures = results.filter(result => result.room === 'fail' || result.caseStudy === 'fail')
console.log(JSON.stringify({ checked: results.length, failures, errors, report: `${out}/report.json` }, null, 2))
assert.equal(failures.length + errors.length, 0, 'portfolio regression checks pass')
