import assert from 'node:assert/strict'
import { chromium, expect } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
const base=process.env.QA_BASE_URL || 'http://127.0.0.1:5199'
const baseline=process.env.QA_BASELINE_URL
const out='/tmp/portfolio-home-loading-qa';mkdirSync(out,{recursive:true})
const browser=await chromium.launch();const errors=[],results=[]
function capableDevice() {
 Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, get: () => 8 })
 Object.defineProperty(navigator, 'deviceMemory', { configurable: true, get: () => 8 })
}
try {
 for(const width of [1440,390]) for(const theme of ['light','dark']) {
  const context=await browser.newContext({viewport:{width,height:width===390?844:1000},reducedMotion:'reduce',isMobile:width===390,hasTouch:width===390})
  await context.addInitScript(theme=>{if(window.top===window)localStorage.setItem('theme',theme)},theme)
  const page=await context.newPage();page.setDefaultTimeout(15000);page.on('pageerror',e=>errors.push(e.message))
  for(const [name,url] of (baseline ? [['before',baseline],['after',base]] : [['after',base]])) {
   await page.goto(url,{waitUntil:'domcontentloaded'});await page.locator('#hero').waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1800)
   await expect(page.locator('#hero')).toHaveClass(/wr-hero--no-scene/)
   await page.locator('#hero').screenshot({path:`${out}/${width}-${theme}-${name}.png`})
   if(name==='after') {
    assert.equal(await page.locator('#hero canvas').count(),0)
    const archive=page.locator('#homepage-project-archive .pcard').first();assert.equal(await archive.locator('img').first().getAttribute('src'),null,'far-off images remain unloaded')
    await archive.scrollIntoViewIfNeeded();await expect(archive.locator('img').first()).toHaveAttribute('src',/Assets/)
    await expect.poll(()=>archive.locator('img').first().evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true)
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow')
   }
  }
  results.push(`${width} ${theme}: static hero screenshots and deferred images`);console.log(results.at(-1));await context.close()
 }
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const requests=[];page.on('request',r=>requests.push(r.url()));page.on('pageerror',e=>errors.push(e.message))
 await page.addInitScript(capableDevice)
 await page.addInitScript(()=>{window.__draws=0;for(const proto of [WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype])for(const key of ['drawElements','drawArrays']){const orig=proto[key];proto[key]=function(...args){if(this.canvas.closest('#hero'))window.__draws++;return orig.apply(this,args)}}})
 await page.goto(base,{waitUntil:'domcontentloaded'});await expect(page.locator('#hero')).toHaveClass(/is-scene-ready/,{timeout:20000})
 assert(await page.evaluate(()=>window.__draws>0),'ready follows an actual rendered frame')
 assert.equal(requests.filter(url=>url.endsWith('/potsdamer_platz_1k.hdr')).length,1,'preloaded reflection map is reused, not fetched twice')
 await page.waitForTimeout(3000);assert.equal(await page.locator('.wr-hero--no-scene').count(),0,'healthy startup retains the 3D hero');const start=await page.evaluate(()=>window.__draws);await page.waitForTimeout(600);assert.equal(await page.evaluate(()=>window.__draws),start,'hero stops drawing while idle')
 await page.getByRole('button',{name:'Explore the skills and projects web',exact:true}).click();await expect(page.getByRole('button',{name:'Close the web and return to the hero',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Explore the skills and projects web',exact:true})).toBeVisible()
 await page.locator('#works').scrollIntoViewIfNeeded();await page.waitForTimeout(700);const offscreen=await page.evaluate(()=>window.__draws);await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>window.__draws),offscreen,'offscreen scene remains paused')
 results.push('Desktop 3D: first frame, single HDR request, idle pause, expansion, Escape, offscreen pause');await page.close()
 const fallback=await browser.newPage();const unavailableRequests=[];fallback.on('request',r=>unavailableRequests.push(r.url()));await fallback.addInitScript(capableDevice);await fallback.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;return get.call(this,type,...args)}})
 await fallback.goto(base,{waitUntil:'domcontentloaded'});await expect(fallback.locator('#hero')).toHaveClass(/wr-hero--no-scene/);await fallback.waitForTimeout(1000);assert(!unavailableRequests.some(url=>url.includes('potsdamer_platz')||url.includes('/HeroScene-')),'no heavy hero download when WebGL is unavailable');await fallback.close();results.push('Unavailable WebGL keeps the original fallback without 3D downloads')
 const constrained=await browser.newPage({viewport:{width:1440,height:1000}});const constrainedRequests=[]
 constrained.on('request',r=>constrainedRequests.push(r.url()));constrained.on('pageerror',e=>errors.push(e.message))
 await constrained.addInitScript(()=>{Object.defineProperty(navigator,'hardwareConcurrency',{get:()=>2});Object.defineProperty(navigator,'deviceMemory',{get:()=>2})})
 await constrained.goto(base,{waitUntil:'domcontentloaded'});await expect(constrained.locator('#hero')).toHaveClass(/wr-hero--no-scene/);await constrained.waitForTimeout(1000)
 assert(!constrainedRequests.some(url=>url.includes('potsdamer_platz')||url.includes('/HeroScene-')),'low-power hardware skips heavy hero downloads');await constrained.close();results.push('Low-power desktop keeps the original fallback without 3D downloads')
} finally {await browser.close();writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2))}
assert.equal(errors.length,0)
console.log(results.join('\n'))
