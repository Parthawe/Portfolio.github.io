import { chromium } from '@playwright/test'
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5199'
const out = resolve(process.argv[2] || '/tmp/portfolio-performance-cost')
const runs = Math.max(1, Math.min(5, Math.trunc(Number(process.env.PERF_RUNS) || 3)))
mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
const samples = []
const metricMap = result => Object.fromEntries(result.metrics.map(({ name, value }) => [name, value]))
try {
 for (const profile of [{ name: 'desktop', width: 1440, height: 1000, mobile: false }, { name: 'mobile', width: 390, height: 844, mobile: true }]) {
  for (let run = 1; run <= runs; run++) {
   const context = await browser.newContext({ viewport: profile, isMobile: profile.mobile, hasTouch: profile.mobile })
   const page = await context.newPage()
   const client = await context.newCDPSession(page)
   const errors = [], pending = new Set()
   page.on('pageerror', error => errors.push(error.message))
   page.on('request', request => pending.add(request))
   page.on('requestfinished', request => pending.delete(request))
   page.on('requestfailed', request => pending.delete(request))
   await client.send('Network.enable')
   await client.send('Network.setCacheDisabled', { cacheDisabled: true })
   await client.send('Network.emulateNetworkConditions', { offline: false, latency: 80, downloadThroughput: 625000, uploadThroughput: 125000 })
   await client.send('Emulation.setCPUThrottlingRate', { rate: 4 })
   await client.send('Performance.enable')
   await page.addInitScript(() => {
    localStorage.setItem('theme', 'light')
    window.__cost = { longTasks: [], lcp: null, cls: 0, firstDraw: null, sceneReady: null, gpu: null, draws: 0, events: [] }
    const findHero = new MutationObserver(() => {
     const hero = document.querySelector('#hero')
     if (!hero) return
     findHero.disconnect()
     const ready = new MutationObserver(() => {
      if (!hero.classList.contains('is-scene-ready')) return
      window.__cost.sceneReady ??= performance.now()
      ready.disconnect()
     })
     if (hero.classList.contains('is-scene-ready')) window.__cost.sceneReady = performance.now()
     else ready.observe(hero, { attributes: true, attributeFilter: ['class'] })
    })
    findHero.observe(document, { childList: true, subtree: true })
    for (const type of ['longtask', 'largest-contentful-paint', 'layout-shift', 'event']) {
     if (!PerformanceObserver.supportedEntryTypes.includes(type)) continue
     new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
       if (type === 'longtask') window.__cost.longTasks.push({ start: entry.startTime, duration: entry.duration })
       if (type === 'largest-contentful-paint') window.__cost.lcp = entry.startTime
       if (type === 'layout-shift' && !entry.hadRecentInput) window.__cost.cls += entry.value
       if (type === 'event' && entry.interactionId) window.__cost.events.push(entry.duration)
      }
     }).observe({ type, buffered: true, ...(type === 'event' ? { durationThreshold: 16 } : {}) })
    }
    for (const proto of [WebGLRenderingContext.prototype, WebGL2RenderingContext.prototype]) {
     for (const key of ['drawArrays', 'drawElements', 'drawArraysInstanced', 'drawElementsInstanced']) {
      const original = proto[key]
      if (!original) continue
      proto[key] = function (...args) {
       if (this.canvas.closest('#hero')) {
        if (!window.__cost.gpu) { const debug = this.getExtension('WEBGL_debug_renderer_info'); window.__cost.gpu = { renderer: debug ? this.getParameter(debug.UNMASKED_RENDERER_WEBGL) : 'Not exposed', parallelShaders: Boolean(this.getExtension('KHR_parallel_shader_compile')), bufferWidth: this.drawingBufferWidth, bufferHeight: this.drawingBufferHeight } }
        window.__cost.firstDraw ??= performance.now()
        window.__cost.draws++

       }
       return original.apply(this, args)
      }
     }
    }
   })
   const initial = metricMap(await client.send('Performance.getMetrics'))
   await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 60000 })
   await page.waitForTimeout(12000)
   const final = metricMap(await client.send('Performance.getMetrics'))
   const load = await page.evaluate(() => ({ ...window.__cost, paints: performance.getEntriesByType('paint').map(entry => ({ name: entry.name, time: entry.startTime })), resources: performance.getEntriesByType('resource').map(entry => ({ url: entry.name.replace(location.origin, ''), bytes: entry.encodedBodySize, decodedBytes: entry.decodedBodySize, start: entry.startTime, end: entry.responseEnd, type: entry.initiatorType })), htmlBytes: performance.getEntriesByType('navigation')[0]?.encodedBodySize || 0, hero: document.querySelector('#hero')?.className }))
   const inFlightAtLoadSnapshot = pending.size
   async function phase(name, action) {
    const before = metricMap(await client.send('Performance.getMetrics'))
    const start = await page.evaluate(() => ({ now: performance.now(), draws: window.__cost.draws }))
    if (action) await action()
    await page.waitForTimeout(1200)
    const after = metricMap(await client.send('Performance.getMetrics'))
    const end = await page.evaluate(() => ({ now: performance.now(), draws: window.__cost.draws }))
    return { name, durationMs: end.now - start.now, mainThreadTaskMs: (after.TaskDuration - before.TaskDuration) * 1000, drawCalls: end.draws - start.draws }
   }
   const phases = [await phase('idle')]
   if (!profile.mobile && load.firstDraw !== null) {
    phases.push(await phase('pointer interaction', async () => { for (let i = 0; i < 12; i++) { await page.mouse.move(900 + i * 8, 350 + i * 5); await page.waitForTimeout(40) } }))
   }
   await page.getByRole('button', { name: 'Switch to dark mode', exact: true }).click()
   await page.waitForTimeout(1000)
   const events = await page.evaluate(() => window.__cost.events)
   await page.locator('#works').scrollIntoViewIfNeeded()
   await page.waitForTimeout(700)
   phases.push(await phase('hero offscreen'))
   const sample = { profile: profile.name, run, ...load, errors, inFlightAtLoadSnapshot, encodedSubresourceBytes: load.resources.reduce((sum, resource) => sum + resource.bytes, 0), mainThreadTaskMs: (final.TaskDuration - initial.TaskDuration) * 1000, scriptMs: (final.ScriptDuration - initial.ScriptDuration) * 1000, heapUsedBytes: final.JSHeapUsedSize, maxSampledInteractionMs: events.length ? Math.max(...events) : null, phases }
   samples.push(sample)
   console.log(JSON.stringify({ profile: sample.profile, run, bytes: sample.encodedSubresourceBytes, firstDraw: sample.firstDraw, taskMs: sample.mainThreadTaskMs, errors }))
   await context.close()
  }
 }
} finally { await browser.close() }
const report = { measurementVersion: 2, base, settings: { runs, downloadMbps: 5, latencyMs: 80, cpuSlowdown: 4, loadWindow: '12 seconds after DOMContentLoaded' }, samples }
writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2))
const previous = process.env.PERF_COMPARE_REPORT ? JSON.parse(readFileSync(process.env.PERF_COMPARE_REPORT, 'utf8')) : null
const median = values => { const sorted = values.filter(value => value !== null && Number.isFinite(value)).sort((a, b) => a - b); const mid = Math.floor(sorted.length / 2); return sorted.length ? sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2 : null }
const rows = dataset => ['desktop', 'mobile'].map(profile => {
 const group = dataset.samples.filter(sample => sample.profile === profile)
 return { profile, fcp: median(group.map(sample => sample.paints.find(paint => paint.name === 'first-contentful-paint')?.time)), lcp: median(group.map(sample => sample.lcp)), draw: median(group.map(sample => sample.firstDraw)), ready: median(group.map(sample => sample.sceneReady ?? null)), bytes: median(group.map(sample => sample.encodedSubresourceBytes)), entry: median(group.map(sample => sample.resources.find(resource => /\/index-[^/]+\.js$/.test(resource.url))?.bytes ?? null)), cpu: median(group.map(sample => sample.mainThreadTaskMs)), heap: median(group.map(sample => sample.heapUsedBytes)), cls: median(group.map(sample => sample.cls)), interaction: median(group.map(sample => sample.maxSampledInteractionMs)) }
})
const format = (value, scale = 1, suffix = '') => value === null ? 'n/a' : `${(value / scale).toFixed(2)}${suffix}`
const table = dataset => `<table><thead><tr><th>Profile</th><th>Text paint</th><th>LCP</th><th>First hero GL work</th><th>Scene ready</th><th>Subresources</th><th>App entry</th><th>Main-thread tasks</th><th>JS heap</th><th>CLS</th><th>Sample interaction</th></tr></thead><tbody>${rows(dataset).map(row => `<tr><th>${row.profile}</th><td>${format(row.fcp, 1000, ' s')}</td><td>${format(row.lcp, 1000, ' s')}</td><td>${format(row.draw, 1000, ' s')}</td><td>${format(row.ready, 1000, ' s')}</td><td>${format(row.bytes, 1000000, ' MB')}</td><td>${format(row.entry, 1000, ' kB')}</td><td>${format(row.cpu, 1000, ' task s')}</td><td>${format(row.heap, 1000000, ' MB')}</td><td>${format(row.cls)}</td><td>${format(row.interaction, 1, ' ms')}</td></tr>`).join('')}</tbody></table>`
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
writeFileSync(`${out}/report.html`, `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Portfolio performance cost</title><style>body{margin:32px auto;padding:0 24px;max-width:1200px;font:16px/1.6 system-ui;color:#262926;background:#fafaf8}h1,h2{line-height:1.2}table{border-collapse:collapse;width:100%;font-size:14px}td{white-space:nowrap}th,td{padding:10px;text-align:left;border-bottom:1px solid #d7d9d3}section{overflow:auto;margin:32px 0}code{overflow-wrap:anywhere}input{padding:8px;width:130px}label{display:inline-block;margin:8px 20px 8px 0}</style><h1>Portfolio performance cost</h1><p>Cold-cache Chromium samples: 5 Mbps, 80 ms latency, 4× CPU slowdown. Medians of ${runs} runs per profile. Load window: 12 seconds after DOMContentLoaded. Source: <code>${escape(base)}</code>.</p><p>Tables scroll horizontally on narrow screens. n/a means unavailable or not applicable.</p>${previous ? `<section><h2>Before</h2>${table(previous)}</section>` : ''}<section><h2>${previous ? 'After' : 'Measured baseline'}</h2>${table(report)}</section><p>Task time measures timed main-thread tasks under browser throttling, not physical processor utilization or total GPU time. JS heap excludes textures and driver memory. Draw calls below describe rendering work, including repeated passes and reflection preparation. They are not GPU milliseconds. Sampled theme-toggle latency is a lab interaction, not field INP. These are local samples, not visitor percentiles.</p><p>Measured desktop GL renderer: <code>${escape(samples[0].gpu?.renderer || "Unavailable")}</code>. Drawing buffer: ${samples[0].gpu?.bufferWidth || "?"} × ${samples[0].gpu?.bufferHeight || "?"}. Parallel shader support: ${samples[0].gpu?.parallelShaders ?? "unknown"}.</p><section><h2>Rendering phases</h2><table><tr><th>Profile / run</th><th>Phase</th><th>Duration</th><th>Main-thread cost</th><th>Hero draw calls</th></tr>${samples.flatMap(sample => sample.phases.map(phase => `<tr><th>${sample.profile} / ${sample.run}</th><td>${phase.name}</td><td>${format(phase.durationMs, 1000, ' s')}</td><td>${format(phase.mainThreadTaskMs, 1, ' ms')}</td><td>${phase.drawCalls}</td></tr>`)).join('')}</table></section><section><h2>Largest completed downloads</h2><table><tr><th>Resource</th><th>Encoded bytes</th><th>Decoded bytes</th></tr>${samples[0].resources.toSorted((a,b) => b.bytes-a.bytes).slice(0,12).map(resource=>`<tr><td><code>${escape(resource.url)}</code></td><td>${resource.bytes.toLocaleString()}</td><td>${resource.decodedBytes.toLocaleString()}</td></tr>`).join('')}</table></section><h2>Transfer scenario</h2><p>Use your own rate. This multiplies sampled desktop cold-load subresource bytes by visits and a rate per decimal GB. It excludes HTML, cache reuse, subsequent navigation, video playback, and unfinished requests; it does not predict hosting invoices.</p><label>Cold visits <input id="visits" type="number" min="0" placeholder="Enter visits"></label><label>Rate per GB <input id="rate" type="number" min="0" step="any" placeholder="Your rate"></label><output id="estimate">Enter both values to calculate.</output><script>const bytes=${rows(report)[0].bytes || 0};function update(){const visits=document.getElementById('visits'),rate=document.getElementById('rate');document.getElementById('estimate').textContent=visits.value!==''&&rate.value!==''?(Math.max(0,+visits.value)*bytes/1e9).toFixed(3)+' GB; '+(Math.max(0,+visits.value)*bytes/1e9*Math.max(0,+rate.value)).toFixed(2)+' in your rate currency':'Enter both values to calculate.'}document.querySelectorAll('input').forEach(input=>input.addEventListener('input',update))</script><p>Raw per-run samples, errors, and request timing are in <a href="report.json">report.json</a>. No billing data or production visitor telemetry was collected.</p></html>`)
console.log(`Report: ${out}/report.html`)
if (samples.some(sample => sample.errors.length)) process.exitCode = 1
