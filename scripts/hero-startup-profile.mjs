import {chromium} from '@playwright/test'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5199',out=process.env.QA_OUTPUT_DIR||'/tmp/portfolio-hero-startup', runs=Number(process.env.PERF_RUNS||3)
mkdirSync(out,{recursive:true});const browser=await chromium.launch();const samples=[]
try{for(let run=0;run<runs;run++)for(const [variant,url] of (process.env.QA_COMPARE_URL ? [['before',process.env.QA_COMPARE_URL],['after',base]] : [['sample',base]])){
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),client=await context.newCDPSession(page)
 await client.send('Network.enable');await client.send('Network.setCacheDisabled',{cacheDisabled:true});await client.send('Network.emulateNetworkConditions',{offline:false,latency:80,downloadThroughput:625000,uploadThroughput:125000});await client.send('Emulation.setCPUThrottlingRate',{rate:4})
 const errors=[];page.on('pageerror',e=>errors.push(e.message))
 await page.addInitScript(()=>{
  if(window.top!==window)return;localStorage.setItem('theme','light');window.__heroStartup={events:[],ready:null}
  const record=(name,detail)=>window.__heroStartup.events.push({name,time:performance.now(),detail})
  const original=HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.getContext=function(type,...args){const result=original.call(this,type,...args);if(this.closest('#hero')&&type==='webgl2')record('context');return result}
  for(const proto of[WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype])for(const name of['createProgram','linkProgram','drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced']){
   const fn=proto[name];if(!fn)continue;proto[name]=function(...args){if(this.canvas.closest('#hero'))record(name);return fn.apply(this,args)}
  }
  new MutationObserver(()=>{if(document.querySelector('#hero.is-scene-ready')&&!window.__heroStartup.ready)window.__heroStartup.ready=performance.now()}).observe(document,{attributes:true,childList:true,subtree:true})
 })
 await page.goto(url,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.__heroStartup?.ready,{timeout:30000}).catch(async error=>{console.log('startup failure',await page.evaluate(()=>({hero:document.querySelector('#hero')?.className,root:document.documentElement.className,text:document.querySelector('.hero-scene-status')?.textContent,reason:sessionStorage.getItem('portfolio-performance-mode')})));throw error});await page.waitForTimeout(100)
 const data=await page.evaluate(()=>({...window.__heroStartup,paints:performance.getEntriesByType('paint').map(e=>({name:e.name,time:e.startTime})),measures:performance.getEntriesByType('measure').map(e=>({name:e.name,start:e.startTime,duration:e.duration})),resources:performance.getEntriesByType('resource').map(e=>({url:e.name.replace(location.origin,''),start:e.startTime,end:e.responseEnd,bytes:e.encodedBodySize}))}))
 samples.push({variant,run,...data,errors});console.log(JSON.stringify({variant,run,ready:data.ready,context:data.events.find(e=>e.name==='context')?.time,firstDraw:data.events.find(e=>e.name.startsWith('draw'))?.time,programs:data.events.filter(e=>e.name==='createProgram').length,measures:data.measures,errors}));await context.close()
}}finally{await browser.close();writeFileSync(out+'/report.json',JSON.stringify(samples,null,2))}
if(samples.some(s=>s.errors.length))process.exitCode=1
