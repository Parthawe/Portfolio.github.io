import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5231'
const output=process.env.QA_OUTPUT_DIR||'/workspace/portfolio-handoff/review/after-hours-v2'
await mkdir(`${output}/realtime-frames`,{recursive:true})
const browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']})
const result={};
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'})
 await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort())
 const page=await context.newPage();await page.goto(base+'/after-hours');await page.locator('canvas').scrollIntoViewIfNeeded();await page.waitForTimeout(200)
 // Compare real raster output, rather than accepting a rising redraw counter.
 const sample=()=>page.locator('canvas').evaluate(c=>{
  const data=c.getContext('2d').getImageData(0,0,c.width,c.height).data,previous=window.__afterHoursPreviousPixels
  let changed=0;if(previous&&previous.length===data.length)for(let i=0;i<data.length;i+=4)if(Math.abs(previous[i]-data[i])+Math.abs(previous[i+1]-data[i+1])+Math.abs(previous[i+2]-data[i+2])>30)changed++
  window.__afterHoursPreviousPixels=data;return changed
 })
 await sample();await page.waitForTimeout(500);result.liveChangedPixels=await sample();assert(result.liveChangedPixels>1000,'Playback must change visible pixels')
 await page.getByRole('button',{name:'Pause animation',exact:true}).click();await page.waitForTimeout(120);await sample();await page.waitForTimeout(300);result.pausedChangedPixels=await sample();assert.equal(result.pausedChangedPixels,0)
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(120);await sample();await page.waitForTimeout(250);assert.equal(await sample(),0)
 await page.getByRole('button',{name:'Play animation',exact:true}).click();await page.waitForTimeout(100);await sample();await page.waitForTimeout(500);result.reducedMotionOptInChangedPixels=await sample();assert(result.reducedMotionOptInChangedPixels>1000)
 await page.getByRole('button',{name:'Pause animation',exact:true}).click();await page.emulateMedia({reducedMotion:'no-preference'})
 const motion=await page.evaluate(async()=>{
  const {createWorldRenderer}=await import('/src/components/after-hours/world.ts')
  const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=650;const c=canvas.getContext('2d'),renderer=createWorldRenderer()
  renderer.draw(c,1000,650,{x:0,y:0,zoom:1.3},1000,{col:0,row:0},false);const a=c.getImageData(0,0,1000,650).data
  renderer.draw(c,1000,650,{x:0,y:0,zoom:1.3},1800,{col:0,row:0},false);const b=c.getImageData(0,0,1000,650).data
  let changed=0;for(let i=0;i<a.length;i+=4)if(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2])>30)changed++
  renderer.draw(c,1000,650,{x:0,y:0,zoom:1.3},1800,{col:0,row:0},false);const repeat=c.getImageData(0,0,1000,650).data
  let unstable=0;for(let i=0;i<b.length;i++)if(b[i]!==repeat[i])unstable++
  renderer.dispose();return{changedPixels:changed,totalPixels:650000,ratio:changed/650000,unstableBytesAtSameTime:unstable}
 });assert(motion.changedPixels>1000);assert.equal(motion.unstableBytesAtSameTime,0);result.deterministicFrameComparison=motion
 await page.getByRole('button',{name:'Return to start',exact:true}).click();await page.getByRole('button',{name:'Play animation',exact:true}).click();await page.locator('canvas').scrollIntoViewIfNeeded()
 await page.screenshot({path:`${output}/playing-desktop.png`,fullPage:true})
 const cdp=await context.newCDPSession(page),frames=[],writes=[]
 cdp.on('Page.screencastFrame',event=>{
  void cdp.send('Page.screencastFrameAck',{sessionId:event.sessionId})
  if(frames.length>=240)return
  const file=`${output}/realtime-frames/frame-${String(frames.length).padStart(4,'0')}.jpg`
  frames.push({file,time:event.metadata.timestamp??Date.now()/1000});writes.push(writeFile(file,Buffer.from(event.data,'base64')))
 })
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:82,maxWidth:1440,maxHeight:1000,everyNthFrame:2})
 await page.waitForTimeout(6500);await page.getByRole('button',{name:'Zoom in',exact:true}).click();await page.waitForTimeout(2500)
 await cdp.send('Page.stopScreencast');await Promise.all(writes);assert(frames.length>20)
 let concat='';for(let i=0;i<frames.length;i++){const duration=i+1<frames.length?Math.max(.001,frames[i+1].time-frames[i].time):1/30;concat+=`file '${frames[i].file}'\nduration ${duration.toFixed(6)}\n`}
 concat+=`file '${frames.at(-1).file}'\n`;await writeFile(`${output}/realtime-frames/frames.concat`,concat)
 result.recording={frames:frames.length,durationSeconds:frames.at(-1).time-frames[0].time,method:'Chrome screencast frames with recorded timestamps; variable frame timing retained'}
 await cdp.detach();await context.close()
}finally{await browser.close()}
await writeFile(`${output}/motion-qa.json`,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result))
