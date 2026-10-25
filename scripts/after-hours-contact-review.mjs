import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5232'
const output=process.env.QA_OUTPUT_DIR||'/workspace/portfolio-handoff/review/after-hours-v5'
await mkdir(output,{recursive:true})
const browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']})
const errors=[],frames=[]
try{
 const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'})
 await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort())
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/after-hours');await page.locator('canvas').waitFor()
 await page.evaluate(async()=>{
  const {createWorldRenderer,point}=await import('/src/components/after-hours/world.ts')
  const canvas=document.createElement('canvas');canvas.width=1280;canvas.height=900;canvas.style.cssText='display:block;width:1280px;height:900px'
  document.body.replaceChildren(canvas);document.body.style.margin='0';const renderer=createWorldRenderer();await renderer.ready
  window.__drawContactFrame=({cell,time,dark})=>{const p=point(cell.col,cell.row);renderer.draw(canvas.getContext('2d'),1280,900,{x:p.x,y:p.y+12,zoom:3.3},time,cell,dark)}
  window.__disposeContactReview=()=>renderer.dispose()
 })
 for(const dark of [false,true])for(const frame of [
  {name:'walking',time:2800,cell:{col:0,row:0}},
  {name:'watering',time:6200,cell:{col:0,row:0}},
  {name:'turning',time:7150,cell:{col:0,row:0}},
  {name:'drumming',time:6200,cell:{col:1,row:0}},
 ]){
  await page.evaluate(frame=>window.__drawContactFrame(frame),{...frame,dark})
  const path=`${output}/contact-${frame.name}-${dark?'dark':'light'}.png`
  await page.locator('canvas').screenshot({path});frames.push({...frame,theme:dark?'dark':'light',path})
 }
 await page.evaluate(()=>window.__disposeContactReview());await context.close()
 if(errors.length)throw new Error(errors.join('\n'))
}finally{await browser.close();await writeFile(`${output}/contact-review.json`,JSON.stringify({frames,pageErrors:errors,scope:'Deterministic close-up keyframes for human visual review; not an artistic-quality assertion.'},null,2)+'\n')}
console.log(`Saved ${frames.length} contact-review keyframes; ${errors.length} page errors.`)
