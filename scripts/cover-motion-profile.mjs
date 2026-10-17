import assert from 'node:assert/strict'
import { writeFileSync } from 'node:fs'
import { chromium } from '@playwright/test'
import { withoutDecorativeWebGL } from './visible-layout-qa.mjs'

const baseline = process.env.QA_COMPARE_URL || 'http://127.0.0.1:5230'
const candidate = process.env.QA_BASE_URL || 'http://127.0.0.1:5233'
const samples = [], browser = await chromium.launch()
try {
  for (let pair = 0; pair < 3; pair++) for (const route of ['/', '/work/']) {
    for (const [name, base] of (pair % 2 ? [['candidate', candidate], ['baseline', baseline]] : [['baseline', baseline], ['candidate', candidate]])) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
      const page = await context.newPage()
      await withoutDecorativeWebGL(page)
      await page.addInitScript(() => {
        localStorage.setItem('portfolio-analytics-consent-v1', 'denied')
        window.__coverCLS = 0
        window.__coverShifts = []
        new PerformanceObserver(list => list.getEntries().forEach(entry => {
          if (!entry.hadRecentInput) {
            window.__coverCLS += entry.value
            window.__coverShifts.push({ value: entry.value, sources: entry.sources?.map(source => ({
              element: source.node?.tagName, id: source.node?.id, className: source.node?.className,
              previousRect: source.previousRect, currentRect: source.currentRect,
            })) })
          }
        })).observe({ type: 'layout-shift', buffered: true })
      })
      const cdp = await context.newCDPSession(page)
      await cdp.send('Network.enable'); await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
      await page.goto(base + route, { waitUntil: 'domcontentloaded' })
      await page.locator('h1').waitFor(); await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(1500)
      const metrics = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource')
        return {
          fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
          domContentLoaded: performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,
          transferredBytes: resources.reduce((sum, resource) => sum + resource.transferSize, 0),
          cls: window.__coverCLS,
          layoutShifts: window.__coverShifts,
          coverRequests: resources.filter(resource => resource.name.includes('/Assets/cover-motion/')).map(resource => resource.name),
          optionalModuleBytes: resources.filter(resource => /CoverPreview-/.test(resource.name)).reduce((sum, resource) => sum + resource.transferSize, 0),
        }
      })
      assert.equal(metrics.coverRequests.length, 0, 'initial loading does not fetch cover footage or screen derivatives')
      samples.push({ pair: pair + 1, name, route, ...metrics })
      await context.close()
    }
  }
} finally { await browser.close() }
const median = values => values.sort((a, b) => a - b)[1]
const summary = ['/', '/work/'].map(route => ({ route, ...Object.fromEntries(['baseline', 'candidate'].map(name => {
  const rows = samples.filter(row => row.route === route && row.name === name)
  return [name, { fcp: median(rows.map(row => row.fcp)), transferredBytes: median(rows.map(row => row.transferredBytes)), cls: Math.max(...rows.map(row => row.cls)) }]
})) }))
const report = { checkedAt: new Date().toISOString(), conditions: 'Three alternating pairs; fresh 1440×1000 browser contexts, HTTP cache disabled, unthrottled local previews. WebGL deliberately unavailable on both builds to isolate cover/initial-paint costs. Not a 3D-startup or field benchmark.', baseline, candidate, summary, samples }
writeFileSync(process.env.QA_PROFILE_PATH || '/tmp/cover-motion-profile.json', JSON.stringify(report, null, 2))
console.log(JSON.stringify(summary, null, 2))
