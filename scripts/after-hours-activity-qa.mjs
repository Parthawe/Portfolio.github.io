import {chromium} from '@playwright/test'
import assert from 'node:assert/strict'
import{mkdir,writeFile}from'node:fs/promises'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5232',output=process.env.QA_OUTPUT_DIR||'/workspace/portfolio-handoff/review/after-hours-v6'
await mkdir(output,{recursive:true})
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']})
try{
 const page=await browser.newPage();await page.goto(base+'/after-hours')
 const result=await page.evaluate(async()=>{
  const {illustratedActivity}=await import('/src/components/after-hours/activity.ts')
  const stage=document.createElement('div');stage.style.cssText='position:fixed;inset:0;width:100px;height:100px';document.body.append(stage)
  const original={raf:window.requestAnimationFrame,cancel:window.cancelAnimationFrame,io:window.IntersectionObserver,ro:window.ResizeObserver,now:performance.now.bind(performance)}
  let clock=1000,next=0,draws=0,running=false;const queue=new Map(),observers=[]
  window.requestAnimationFrame=fn=>{const id=++next;queue.set(id,fn);return id};window.cancelAnimationFrame=id=>queue.delete(id)
  window.IntersectionObserver=class{constructor(fn){this.fn=fn;observers.push(this)}observe(){}disconnect(){this.closed=true}}
  window.ResizeObserver=class{observe(){}disconnect(){}}
  performance.now=()=>clock
  const pump=()=>{clock+=17;const current=[...queue.values()];queue.clear();current.forEach(fn=>fn(clock))}
  let activity
  try{
   activity=illustratedActivity(stage,()=>draws++,()=>running);pump();const staticDraws=draws
   if(queue.size!==0)throw Error('static view must stop after one draw')
   running=true;activity.wake();pump();pump();const resumed=draws;if(resumed<=staticDraws+1)throw Error('explicit resume must continue')
   // Simulate a callback silently removed by the browser during viewport capture.
   queue.clear();clock+=200;activity.wake();pump();const recovered=draws;if(recovered!==resumed+1)throw Error('stranded RAF must recover on wake')
   // A stale intersection signal must not suspend a canvas that is actually visible.
   observers.forEach(o=>o.fn([{isIntersecting:false}]));pump();const visible=draws;if(visible!==recovered+1)throw Error('actual visible bounds must win over stale observer data')
   stage.style.top='2000px';activity.wake();if(queue.size)throw Error('offscreen canvas must schedule no work')
   const stopped=draws;pump();if(draws!==stopped)throw Error('offscreen draw occurred')
   stage.style.top='0';activity.wake();pump();if(draws!==stopped+1)throw Error('returning canvas must resume without a new observer signal')
   running=false;pump();if(queue.size)throw Error('pause must stop the queue')
   activity.dispose();activity.wake();if(queue.size)throw Error('disposed activity cannot restart')
   return{staticOneFrame:true,explicitResume:true,strandedFrameRecovery:true,staleObserverRecovery:true,offscreenNoWork:true,returnWithoutObserver:true,pauseStops:true,disposeStops:true}
  }finally{activity?.dispose();stage.remove();window.requestAnimationFrame=original.raf;window.cancelAnimationFrame=original.cancel;window.IntersectionObserver=original.io;window.ResizeObserver=original.ro;performance.now=original.now}
 })
 assert(Object.values(result).every(Boolean));await writeFile(`${output}/activity-qa.json`,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result))
}finally{await browser.close()}
