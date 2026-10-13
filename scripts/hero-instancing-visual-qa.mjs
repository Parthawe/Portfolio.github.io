import { chromium, expect } from '@playwright/test'
import {mkdirSync,writeFileSync}from'node:fs'
import assert from 'node:assert/strict'
const out=process.env.QA_OUTPUT_DIR||'/tmp/portfolio-round3-visual';mkdirSync(out,{recursive:true})
const browser=await chromium.launch();const results=[]
try {for(const theme of ['light','dark']) for(const [name,base] of [['before',process.env.QA_BASELINE_URL||'http://127.0.0.1:5204'],['after',process.env.QA_BASE_URL||'http://127.0.0.1:5199']]) {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[]
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
 await page.addInitScript(theme=>{
  localStorage.setItem('theme',theme);Math.random=()=>.5
  Object.defineProperty(navigator,'hardwareConcurrency',{get:()=>8});Object.defineProperty(navigator,'deviceMemory',{get:()=>8})
  window.__heroDraws=0
  const get=HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.getContext=function(type,options,...rest){return get.call(this,type,/^(webgl2?|experimental-webgl)$/.test(type)?{...options,preserveDrawingBuffer:true}:options,...rest)}
  // Freeze only GPU writes after the first completed hero frame; keep UI scheduling intact.
  for(const proto of[WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype])for(const key of['clear','drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced']){
   const original=proto[key];if(!original)continue
   proto[key]=function(...args){if(this.canvas.closest('#hero')){if(document.querySelector('#hero.is-scene-ready'))return;if(key!=='clear')window.__heroDraws++}return original.apply(this,args)}
  }
 },theme)
 await page.goto(base,{waitUntil:'domcontentloaded'})
 await expect(page.locator('#hero')).toHaveClass(/is-scene-ready/,{timeout:30000})
 await page.waitForTimeout(300)
 const captured=await page.locator('#hero canvas').evaluate(canvas=>({data:canvas.toDataURL(),draws:window.__heroDraws}))
 writeFileSync(`${out}/models-${theme}-${name}.png`,Buffer.from(captured.data.split(',')[1],'base64'))
 assert(captured.draws>0);assert.equal(errors.length,0,errors.join('\n'))
 results.push({theme,name,draws:captured.draws,errors});console.log(JSON.stringify(results.at(-1)));await page.close()
}}finally{await browser.close();writeFileSync(`${out}/report.json`,JSON.stringify(results,null,2))}
