import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const beforeURL=process.env.QA_BASELINE_URL||'http://127.0.0.1:5204';
const afterURL=process.env.QA_BASE_URL||'http://127.0.0.1:5205';
const browser=await chromium.launch({headless:false});const results=[];
try {
 for(let run=0;run<4;run++) for(const variant of run%2?['after','before']:['before','after']){
  const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await page.addInitScript(()=>{
   localStorage.setItem('theme','dark');window.__bench={ready:null,buffers:0,logs:0,draws:0};
   new MutationObserver(()=>{if(window.__bench.ready===null&&document.querySelector('#hero.is-scene-ready'))window.__bench.ready=performance.now()}).observe(document,{attributes:true,childList:true,subtree:true});
   for(const [method,key] of [['createBuffer','buffers'],['getProgramInfoLog','logs'],['getShaderInfoLog','logs'],['drawElements','draws'],['drawArrays','draws'],['drawElementsInstanced','draws'],['drawArraysInstanced','draws']]){
    const original=WebGL2RenderingContext.prototype[method];WebGL2RenderingContext.prototype[method]=function(...args){if(this.canvas.closest('#hero'))window.__bench[key]++;return original.apply(this,args)};
   }
  });
  await page.goto(variant==='before'?beforeURL:afterURL,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.__bench.ready!==null,null,{timeout:30000});
  const startup=await page.evaluate(()=>({...window.__bench}));
  await page.waitForTimeout(2600);
  const beforeTheme=await page.evaluate(()=>({...window.__bench}));
  await page.getByRole('button',{name:'Switch to light mode'}).click();await page.waitForTimeout(1800);
  const afterTheme=await page.evaluate(()=>({...window.__bench,hero:document.querySelector('#hero')?.className}));
  const metrics=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));
  const startMetrics=await metrics();const startDraws=await page.evaluate(()=>window.__bench.draws);
  await page.locator('#hero canvas').evaluate(async canvas=>{
   const rect=canvas.getBoundingClientRect();const start=performance.now();
   await new Promise(resolve=>{const step=()=>{
    const t=performance.now()-start;
    canvas.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,clientX:rect.x+rect.width*.5+Math.sin(t/500)*30,clientY:rect.y+rect.height*.9,pointerId:1,pointerType:'mouse'}));
    if(t<3000)requestAnimationFrame(step);else resolve();
   };requestAnimationFrame(step);});
  });
  const endMetrics=await metrics();const activeDraws=await page.evaluate(()=>window.__bench.draws)-startDraws;
  const interaction={mainThreadTaskMs:(endMetrics.TaskDuration-startMetrics.TaskDuration)*1000,scriptMs:(endMetrics.ScriptDuration-startMetrics.ScriptDuration)*1000,draws:activeDraws};
  const result={run,variant,interaction,readyMs:startup.ready,shaderLogReads:startup.logs,startupBuffers:startup.buffers,themeNewBuffers:afterTheme.buffers-beforeTheme.buffers,hero:await page.locator("#hero").getAttribute("class"),errors};
  results.push(result);console.log(JSON.stringify(result));await context.close();
  writeFileSync(process.env.QA_OUTPUT_FILE||'/tmp/hero-webgl-comparison.json',JSON.stringify({browser:browser.version(),results},null,2));
 }
}finally{await browser.close();}

if(results.some(r=>r.errors.length || r.hero.includes("wr-hero--no-scene")))process.exitCode=1;
