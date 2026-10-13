import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { chromium, expect } from '@playwright/test'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5199'
const browser = await chromium.launch()
try {
  for (const mode of ['raw-gzip', 'invalid-packed', 'unsupported-decompression', 'blocked-lighting']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
    const requests = [], errors = []
    page.on('request', request => { if (request.url().includes('potsdamer_platz')) requests.push(request.url()) })
    page.on('pageerror', error => errors.push(error.message))
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 })
      Object.defineProperty(navigator, 'deviceMemory', { get: () => 8 })
    })
    if (mode === 'unsupported-decompression') await page.addInitScript(() => { window.DecompressionStream = undefined })
    if (mode === 'raw-gzip') await page.route('**/*.rgbe.gz', route => route.fulfill({ body: readFileSync('public/Assets/hdri/potsdamer_platz_1k.rgbe.gz'), contentType: 'application/octet-stream' }))
    if (mode === 'invalid-packed') await page.route('**/*.rgbe.gz', route => route.fulfill({ body: 'bad data', contentType: 'application/octet-stream' }))
    if (mode === 'blocked-lighting') await page.route('**/Assets/hdri/*', route => route.abort())
    await page.goto(base, { waitUntil: 'domcontentloaded' })
    if (mode === 'blocked-lighting') {
      await expect(page.locator('#hero')).toHaveClass(/wr-hero--no-scene/, { timeout: 25000 })
      await expect(page.locator('#works')).toBeAttached()
    } else {
      await expect(page.locator('#hero')).toHaveClass(/is-scene-ready/, { timeout: 25000 })
      assert.equal(errors.length, 0, errors.join('\n'))
      assert.equal(requests.filter(url => url.endsWith('.hdr')).length, mode === 'raw-gzip' ? 0 : 1)
      assert.equal(requests.filter(url => url.endsWith('.rgbe.gz')).length, mode === 'unsupported-decompression' ? 0 : 1)
    }
    console.log(`PASS: lighting ${mode}`)
    await page.close()
  }
} finally { await browser.close() }
