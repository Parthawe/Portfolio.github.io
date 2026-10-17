import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium, webkit, expect } from '@playwright/test'
import { withoutDecorativeWebGL } from './visible-layout-qa.mjs'
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5234'
const out = process.env.QA_OUTPUT_DIR || '/tmp/cover-startup-qa'
mkdirSync(out, { recursive: true })
const samples = [], failures = []
const cases = [
  ...[1440, 390].flatMap(width => ['light', 'dark'].map(theme => ({ engine: chromium, width, theme }))),
  ...[1440, 390].map(width => ({ engine: webkit, width, theme: 'dark' })),
  { engine: chromium, width: 1440, theme: 'light', delay: 500 },
  { engine: chromium, width: 390, theme: 'dark', delay: 500 },
  { engine: chromium, width: 1440, theme: 'light', rulers: true },
]
for (const config of cases) {
  const { engine, width, theme, delay = 0, rulers = false } = config
  const browser = await engine.launch()
  try {
    for (const route of ['/', '/work/']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, hasTouch: width < 500, reducedMotion: rulers ? 'no-preference' : 'reduce' })
      const page = await context.newPage()
      await withoutDecorativeWebGL(page)
      await page.addInitScript(({ theme, rulers }) => {
        localStorage.setItem('theme', theme)
        localStorage.setItem('portfolio-canvas-chrome', rulers ? 'on' : 'off')
        localStorage.setItem('portfolio-analytics-consent-v1', 'denied')
        window.__startup = { shifts: [], frames: [] }
        if (PerformanceObserver.supportedEntryTypes?.includes('layout-shift')) {
          new PerformanceObserver(list => list.getEntries().filter(entry => !entry.hadRecentInput).forEach(entry => {
            window.__startup.shifts.push({ value: entry.value, time: entry.startTime, sources: entry.sources?.map(source => ({ className: source.node?.className, previousRect: source.previousRect, currentRect: source.currentRect })) })
          })).observe({ type: 'layout-shift', buffered: true })
        }
        let started
        const sample = () => {
          const heading = document.querySelector('h1'), nav = document.querySelector('.nav')
          if (heading && nav) {
            started ??= performance.now()
            const wrap = document.querySelector('.wrap')
            window.__startup.frames.push({ body: document.body.className, bodyTop: getComputedStyle(document.body).paddingTop, bodyLeft: getComputedStyle(document.body).paddingLeft, navTop: getComputedStyle(nav).paddingTop, navLeft: getComputedStyle(nav).paddingLeft, wrapX: wrap?.getBoundingClientRect().x, wrapWidth: wrap?.getBoundingClientRect().width })
          }
          if (!started || performance.now() - started < 500) requestAnimationFrame(sample)
        }
        requestAnimationFrame(sample)
      }, { theme, rulers })
      if (delay) await page.route(/\/bundle\/.*\.css$/, async request => { await new Promise(resolve => setTimeout(resolve, delay)); await request.continue() })
      if (engine === chromium) { const cdp = await context.newCDPSession(page); await cdp.send('Network.enable'); await cdp.send('Network.setCacheDisabled', { cacheDisabled: true }) }
      await page.goto(base + route)
      await page.locator('h1').waitFor(); await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(1500)
      const result = await page.evaluate(() => ({ ...window.__startup, mediaRequests: performance.getEntriesByType('resource').filter(entry => entry.name.includes('/Assets/cover-motion/')).map(entry => entry.name), overflow: document.documentElement.scrollWidth > innerWidth + 1 }))
      const cls = result.shifts.reduce((total, entry) => total + entry.value, 0)
      samples.push({ engine: engine.name(), width, theme, delay, rulers, route, cls, ...result })
      try {
        assert(result.frames.length, 'record the first painted route frame')
        const first = result.frames[0], last = result.frames.at(-1)
        assert.equal(first.navTop, last.navTop, 'navigation block inset stays stable from its first frame')
        assert.equal(first.navLeft, last.navLeft, 'navigation inline inset stays stable from its first frame')
        assert.equal(first.wrapX, last.wrapX, 'page starts in its final frame')
        assert.equal(first.wrapWidth, last.wrapWidth, 'page starts at its final width')
        assert.equal(first.bodyTop, last.bodyTop, 'saved rulers do not animate initial page padding')
        assert.equal(first.bodyLeft, last.bodyLeft, 'saved rulers do not animate initial page padding')
        assert(first.body.includes('figma-rulers-off') === !rulers, 'saved ruler preference is present before paint')
        if (route === '/work/') assert(first.body.includes('page-work'), 'Work frame is applied before paint')
        assert(cls < .001, `startup CLS ${cls} exceeds the subpixel/font tolerance`)
        assert.equal(result.mediaRequests.length, 0, 'no cover media on initial load')
        assert.equal(result.overflow, false, 'no page overflow')
        if (!delay && !rulers && engine === chromium) await page.screenshot({ path: `${out}/${width}-${theme}-${route === '/' ? 'home' : 'work'}.png` })
      } catch (error) { failures.push({ engine: engine.name(), width, theme, delay, rulers, route, error: String(error) }) }
      await context.close()
    }
  } finally { await browser.close() }
}
writeFileSync(`${out}/report.json`, JSON.stringify({ conditions: 'Fresh desktop/mobile contexts; Home and Work, both themes, delayed styles, saved ruler preference, reduced motion. Decorative WebGL disabled to isolate startup geometry. Chromium records CLS; WebKit verifies first-frame geometry.', base, samples, failures }, null, 2))
console.log(JSON.stringify({ samples: samples.length, maxCLS: Math.max(...samples.map(sample => sample.cls)), failures }, null, 2))
assert.deepEqual(failures, [])
