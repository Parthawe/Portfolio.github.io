import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const browser=await chromium.launch({headless:false});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const cdp=await page.context().newCDPSession(page);
 await cdp.send('Profiler.enable'); await cdp.send('Profiler.start');
 await page.addInitScript(()=>{
  localStorage.setItem('theme','dark');window.__draws=0;
  for(const key of ['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced']){
   const orig=WebGL2RenderingContext.prototype[key];
   WebGL2RenderingContext.prototype[key]=function(...args){if(this.canvas.closest('#hero'))window.__draws++;return orig.apply(this,args);};
  }
 });
 await page.goto(process.env.QA_BASE_URL||'http://127.0.0.1:5202');
 await page.waitForFunction(()=>document.querySelector('#hero.is-scene-ready'));
 const ready=await page.evaluate(()=>performance.now());
 const {profile}=await cdp.send('Profiler.stop');
 const times=new Map();profile.samples.forEach((id,i)=>times.set(id,(times.get(id)||0)+profile.timeDeltas[i]));
 const hot=profile.nodes.map(n=>({...n.callFrame,ms:(times.get(n.id)||0)/1000})).sort((a,b)=>b.ms-a.ms).slice(0,25);
 const drawStart=await page.evaluate(()=>window.__draws);await page.waitForTimeout(1000);
 const draws=await page.evaluate(()=>window.__draws)-drawStart;
 console.log(JSON.stringify({ready,draws,hot},null,2));
 writeFileSync(process.env.QA_OUTPUT_FILE||'/tmp/hero-webgl-profile.json',JSON.stringify({ready,draws,hot,profile}));
}finally{await browser.close();}
