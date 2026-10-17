import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium, webkit, expect } from '@playwright/test'
import { withoutDecorativeWebGL } from './visible-layout-qa.mjs'
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5234'
const out = process.env.QA_OUTPUT_DIR || '/tmp'
mkdirSync(out, { recursive: true })
const results=[]
for (const engine of [chromium, webkit]) {
  const browser=await engine.launch()
  try {
    const context=await browser.newContext({viewport:{width:390,height:900},hasTouch:true})
    await context.addInitScript(()=>{
      localStorage.setItem('portfolio-analytics-consent-v1','denied')
      const IO=window.IntersectionObserver
      window.IntersectionObserver=class extends IO {
        constructor(callback,options){super((entries,observer)=>setTimeout(()=>callback(entries,observer),200),options)}
      }
    })
    const page=await context.newPage()
    await withoutDecorativeWebGL(page)
    await page.goto(base+'/work')
    for(const slug of ['mentra-miniapps','mentra','typeface']) {
      const card=page.locator(`.pcard[href="/${slug}"]`)
      await card.scrollIntoViewIfNeeded(); await card.focus()
      await expect(card).toHaveAttribute('data-cover-motion','playing',{timeout:8000})
      assert.equal(await page.locator('[data-cover-motion="playing"]').count(),1)
      await card.press('Escape')
      await expect(card).toHaveAttribute('data-cover-motion','idle')
    }
    results.push(`${engine.name()} mobile: focus before a delayed visibility callback starts screens, film and typography; Escape releases the single player`)
    await context.close()
    if(engine===chromium){
      const touch=await browser.newContext({viewport:{width:390,height:900},hasTouch:true,isMobile:true})
      const page=await touch.newPage(); await withoutDecorativeWebGL(page)
      await page.goto(base+'/work'); await page.locator('h1').waitFor()
      const card=page.locator('.pcard[href="/mentra"]')
      // Initial cards have no motion status until the optional module binds.
      await expect.poll(() => page.evaluate(() => performance.getEntriesByType('resource').some(entry => /CoverPreview-.*\.js/.test(entry.name)))).toBe(true)
      await page.waitForTimeout(250)
      const cdp=await touch.newCDPSession(page)
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:200,y:680}]})
      for(const y of [660,640,620,600]) {
        await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:200,y}]})
        await page.waitForTimeout(50)
      }
      await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
      await expect(card).toHaveAttribute('data-cover-motion','playing',{timeout:8000})
      assert(await page.evaluate(()=>scrollY>0),'touch gesture scrolls the page')
      await card.tap(); await expect(page).toHaveURL(/\/mentra\/?$/)
      results.push('Chromium touch input: native swipe scrolls and starts a visible preview; one tap opens the project')
      await touch.close()
    }
  }finally{await browser.close()}
}
writeFileSync(`${out}/cover-entry-qa.json`,JSON.stringify({results,failures:[]},null,2))
console.log(results.join('\n'))
