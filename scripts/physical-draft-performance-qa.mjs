import {chromium} from '@playwright/test'
import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
const out=process.env.QA_OUTPUT_DIR || '/tmp/portfolio-physical-draft-review';mkdirSync(out,{recursive:true})
const base=process.env.QA_DEV_URL || 'http://127.0.0.1:5201',browser=await chromium.launch(),results=[]
try{
 for(const slug of['enigma','jugalbandi','revolving-stage','sea-of-salt','black-hole']){
 const page=await browser.newPage({viewport:{width:1440,height:1000}})
 await page.addInitScript(()=>{
  window.__reviewDraws=0;window.__reviewFirstDraw=0
  for(const prototype of[WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype])for(const name of['drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced']){
   const original=prototype[name];if(!original)continue
   prototype[name]=function(...args){window.__reviewDraws++;window.__reviewFirstDraw ||= performance.now();return original.apply(this,args)}
  }
 })
 await page.goto(`${base}/experience-preview/${slug}`)
 if(slug==='jugalbandi'){
  await page.locator('.ja-stage svg').waitFor();assert.equal(await page.locator('.ja canvas').count(),0)
  const readyMs=await page.evaluate(()=>performance.now());await page.waitForTimeout(800)
  assert.equal(await page.evaluate(()=>window.__reviewDraws),0,'SVG mechanism needs no WebGL draws')
  results.push({slug,readyMs,drawsWhileIdle:0,renderer:'SVG'});await page.close();continue
 }
 await page.locator('.physical-world-stage canvas').waitFor()
 await page.waitForFunction(()=>window.__reviewFirstDraw>0)
 await page.waitForTimeout(8000)
 const before=await page.evaluate(()=>window.__reviewDraws);await page.waitForTimeout(800);const after=await page.evaluate(()=>window.__reviewDraws)
 const firstFrameMs=await page.evaluate(()=>window.__reviewFirstDraw)
 results.push({slug,firstFrameMs,drawsWhileIdle:after-before});assert.equal(after,before,`${slug} makes no idle draw calls`)
 await page.close()
 }
}finally{await browser.close();writeFileSync(`${out}/performance.json`,JSON.stringify(results,null,2))}
console.log(JSON.stringify(results))
