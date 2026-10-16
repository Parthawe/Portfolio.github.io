import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
import {chromium,expect} from '@playwright/test'
const base=process.env.QA_DEV_URL||'http://127.0.0.1:5211',out=process.env.QA_OUTPUT_DIR||'/tmp/black-hole-activity-qa';mkdirSync(out,{recursive:true})
const browser=await chromium.launch()
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'})
 await page.goto(`${base}/experience-preview/black-hole`);const canvas=page.locator('.physical-world-stage canvas');await expect(canvas).toHaveAttribute('data-time-trap',/.+/,{timeout:30000});await canvas.scrollIntoViewIfNeeded();await page.waitForTimeout(2400)
 const state=async()=>JSON.parse(await canvas.getAttribute('data-time-trap'))
 let a=await state();await page.waitForTimeout(1000);let b=await state();const activeAdvance=b.reference-a.reference;assert(activeAdvance>.5)
 await canvas.evaluate(el=>el.parentElement.style.transform='translateY(3000px)');await page.waitForTimeout(200);a=await state();await page.waitForTimeout(900);b=await state();assert.equal(a.reference,b.reference,'no offscreen clock work')
 await canvas.evaluate(el=>el.parentElement.style.transform='');await page.waitForTimeout(150);const resumed=await state();assert(resumed.reference-b.reference<.3,'resume excludes offscreen wall time')
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{value:true,configurable:true});document.dispatchEvent(new Event('visibilitychange'))});await page.waitForTimeout(150);a=await state();await page.waitForTimeout(600);b=await state();assert.equal(a.reference,b.reference,'visibility state cancels scene work')
 await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'))});await page.waitForTimeout(150)
 await page.getByRole('button',{name:'Pause study',exact:true}).click();await page.waitForTimeout(2500)
 const count=await canvas.evaluate(async el=>{let n=0;const observer=new MutationObserver(records=>n+=records.length);observer.observe(el,{attributes:true,attributeFilter:['data-time-trap']});await new Promise(resolve=>setTimeout(resolve,800));observer.disconnect();return n});assert.equal(count,0,'paused scene fully idles')
 writeFileSync(`${out}/report.json`,JSON.stringify({activeSecondsPerWallSecond:activeAdvance,offscreenAdvance:0,hiddenAdvance:0,pausedRenderMutations:count},null,2));console.log('Clock activity checks passed')
}finally{await browser.close()}
