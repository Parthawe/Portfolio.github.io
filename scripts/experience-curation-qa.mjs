import { navigateWithTemporaryRetry } from './qa-network-policy.mjs'
import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync } from 'node:fs'
import { chromium, webkit, expect } from '@playwright/test'
import { readExperienceRegistry } from './project-experience-registry.mjs'
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5202'
const dev = process.env.QA_DEV_URL
const out = process.env.QA_OUTPUT_DIR || '/tmp/portfolio-experience-review'
mkdirSync(out, { recursive: true })
const registry = readExperienceRegistry()
assert(registry.length > 0, 'The audited catalog is populated')
assert.deepEqual(registry.filter(item => item.status === 'approved').map(item => item.slug), ['shuffle'])
const publishedPreviews=process.env.QA_EXPERIENCE_PREVIEWS_ENABLED==='1'
if (existsSync('dist/bundle')) assert.equal(readdirSync('dist/bundle').some(name => name.startsWith('ExperiencePreviewPage')),publishedPreviews,'preview build matches release configuration')
const results = [], errors = []
const browser = await chromium.launch({ headless: true })
try {
  if (!process.env.QA_WORKSHOP_ONLY) {
  const page = await browser.newPage({ reducedMotion: 'reduce' })
  page.on('pageerror', error => errors.push(error.message))
  await page.addInitScript(() => localStorage.setItem('portfolio-analytics-consent-v1', 'denied'))
  for (const item of registry) {
    for (const suffix of ['world', 'prototype']) {
      await navigateWithTemporaryRetry(page, `${base}/${item.slug}/${suffix}`, { waitUntil: 'domcontentloaded' })
      await expect(page).toHaveURL(`${base}${item.status === 'approved' ? item.href : `/${item.slug}`}`)
      if (item.status !== 'approved') {
        await expect(page.locator('#main-content')).toBeVisible()
        assert.equal(await page.locator('.project-room-link').count(), 0, 'unapproved experience is not advertised')
        assert.equal(await page.locator('.physical-world-stage').count(), 0, 'rejected room does not mount')
      }
    }
    results.push({ slug: item.slug, redirects: 'pass' })
    if (results.length % 10 === 0) console.log(`${results.length} project redirects checked`)
  }
  await navigateWithTemporaryRetry(page, `${base}/typeface/workshop`);await expect(page).toHaveURL(`${base}/typeface`)
  await navigateWithTemporaryRetry(page, `${base}/project-experiences`)
  await expect(page.locator('.physical-world-index a')).toHaveCount(1)
  await expect(page.locator('.physical-world-index a')).toHaveAttribute('href', '/shuffle/simulation')
  await navigateWithTemporaryRetry(page, `${base}/experience-preview/typeface`)
  if(publishedPreviews){await expect(page.locator('[data-glyph-outline]')).toBeVisible();await navigateWithTemporaryRetry(page, `${base}/experience-preview`);await expect(page.locator('.experience-review-card')).toHaveCount(18);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content',/noindex/)}else await expect(page.locator('.type-workshop')).toHaveCount(0)
  await navigateWithTemporaryRetry(page, `${base}/shuffle/simulation`)
  await expect(page.locator('.shuffle-stage canvas')).toBeVisible()
  await expect(page.locator('.shuffle-room-nav a')).toHaveCount(1)
  await page.close()
  }
  if (dev) {
  for (const [name, engine, viewport, touch] of [['desktop', browser, { width: 1440, height: 1000 }, false], ['mobile', browser, { width: 390, height: 844 }, true], ['webkit', await webkit.launch(), { width: 390, height: 844 }, true]]) {
    for (const theme of ['light', 'dark']) {
      const context = await engine.newContext({ viewport, hasTouch: touch, reducedMotion: 'reduce', recordVideo: { dir: `${out}/videos`, size: viewport } })
      await context.addInitScript(theme => { localStorage.setItem('theme', theme); localStorage.setItem('portfolio-analytics-consent-v1', 'denied') }, theme)
      const page = await context.newPage()
      page.on('pageerror', error => errors.push(`${name}/${theme}: ${error.message}`))
      await navigateWithTemporaryRetry(page, `${dev}/experience-preview/typeface`)
      await expect(page.locator('[data-glyph-outline]')).toBeVisible()
      const initialMetrics = await page.evaluate(() => ({ readyMs: performance.now(), resourceBytes: performance.getEntriesByType('resource').reduce((sum, r) => sum + r.transferSize, 0), canvases: document.querySelectorAll('canvas').length }))
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'no horizontal page overflow')
      const outline=page.locator('[data-glyph-outline]'),canvas=page.getByRole('group',{name:'Editable B outline',exact:true})
      const first=await outline.getAttribute('d');await canvas.focus();await canvas.press('ArrowRight');assert.notEqual(await outline.getAttribute('d'),first)
      const openInspector=async()=>{if(name!=='desktop')await page.getByRole('button',{name:'Inspector',exact:true}).click();return name==='desktop'?page.locator('.tw-inspector'):page.getByRole('dialog')}
      const closeInspector=async()=>{if(name!=='desktop')await page.getByRole('button',{name:'Close point inspector'}).click()}
      let inspector=await openInspector();await inspector.getByLabel('Selected point X',{exact:true}).fill('160');await inspector.getByRole('button',{name:'Fit outline',exact:true}).click();await closeInspector()
      const edited=await outline.getAttribute('d');await page.getByLabel('Character',{exact:true}).fill('C');await expect(page.locator('[data-glyph-outline]')).toBeVisible();await page.getByLabel('Character',{exact:true}).fill('B');await expect(outline).toHaveAttribute('d',edited)
      await page.getByLabel('Your specimen',{exact:true}).fill('B&B <Slice>')
      const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Export specimen SVG',exact:true}).click();const download=await downloadPromise;const file=`${out}/${name}-${theme}-specimen.svg`;await download.saveAs(file);const document=readFileSync(file,'utf8');assert(document.includes('&amp;')&&document.includes('&lt;'));assert(!document.includes('<text')&&!document.includes('<script'));assert(document.includes('translate(-100 -650)'))
      await page.getByRole('button',{name:'Undo',exact:true}).click();assert.notEqual(await outline.getAttribute('d'),edited);await page.getByRole('button',{name:'Redo',exact:true}).click();await expect(outline).toHaveAttribute('d',edited)
      inspector=await openInspector();await inspector.getByRole('button',{name:'Reset glyph',exact:true}).click();await closeInspector();await expect(outline).toHaveAttribute('d',first)
      const handle=page.getByRole('button',{name:'Anchor point 0',exact:true}),box=await handle.boundingBox()
      if(box){if(touch&&name!=='webkit'){const client=await context.newCDPSession(page),x=box.x+box.width/2,y=box.y+box.height/2;await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+25,y:y+10}]});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await client.detach()}else{await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+25,box.y+box.height/2+10);await page.mouse.up()}assert.notEqual(await outline.getAttribute('d'),first)}
      inspector=await openInspector();await inspector.getByRole('button',{name:'Reset glyph',exact:true}).click();const weights=[];for(const weight of ['Ultralight','Regular','Bold']){await inspector.getByLabel('Font weight').selectOption({label:weight});await expect(outline).toHaveAttribute('data-font',weight);weights.push(await outline.getAttribute('d'))}assert.equal(new Set(weights).size,3);await closeInspector()
      await page.getByLabel('Your specimen',{exact:true}).fill('');await page.getByRole('button',{name:'Specimen',exact:true}).click();await expect(page.getByText('Type something to begin.',{exact:true})).toBeVisible();await page.getByRole('button',{name:'Export specimen SVG',exact:true}).click();await expect(page.getByText('Type a specimen before exporting.',{exact:true})).toBeVisible();await page.getByRole('button',{name:'Glyph',exact:true}).click();await page.getByLabel('Your specimen',{exact:true}).fill('Butler’s Slice')
      await page.screenshot({path:`${out}/${name}-${theme}.png`,fullPage:true})
      const metrics = await page.evaluate(() => ({ resources: performance.getEntriesByType('resource').map(r => ({ name:r.name, size:r.transferSize })), heap: performance.memory?.usedJSHeapSize, canvases: document.querySelectorAll('canvas').length }))
      assert.equal(metrics.canvases, 0, 'SVG workshop needs no WebGL canvas')
      results.push({ name, theme, workshop: 'pass', initialMetrics, metrics })
      const video = page.video()
      await context.close()
      if (video) await video.saveAs(`${out}/${name}-${theme}.webm`)
    }
    if (name === 'webkit') await engine.close()
  }
  const recovery = await browser.newPage()
  await recovery.route('**/*.otf', route => route.abort())
  await recovery.goto(`${dev}/experience-preview/typeface`)
  await expect(recovery.getByRole('alert')).toContainText('could not be loaded')
  await recovery.unroute('**/*.otf')
  await recovery.getByRole('button', { name: 'Retry font', exact: true }).click()
  await expect(recovery.locator('[data-glyph-outline]')).toBeVisible()
  await recovery.close()
  results.push({ fontRecovery: 'pass' })
  const narrow = await browser.newPage({ viewport: { width: 320, height: 740 } })
  await narrow.goto(`${dev}/experience-preview/typeface`)
  await expect(narrow.locator('[data-glyph-outline]')).toBeVisible()
  assert(await narrow.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '320px layout fits')
  await narrow.close()
  results.push({ narrowLayout: 'pass' })
  }
} finally {
  await browser.close()
  writeFileSync(`${out}/report.json`, JSON.stringify({ results, errors }, null, 2))
}
assert.equal(errors.length, 0, JSON.stringify(errors))
console.log(`Passed ${results.length} checks. Evidence: ${out}`)
