import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5232'
const output=process.env.QA_OUTPUT_DIR||'/workspace/portfolio-handoff/review/after-hours-v6'
const after=process.env.QA_AFTER_RECORDING||`${output}/realtime-animation.webm`
const prefix=process.env.QA_PLAYBACK_PREFIX||'normal-playback'
const before=process.env.QA_BEFORE_RECORDING||'/workspace/portfolio-handoff/review/after-hours-v5/realtime-animation.webm'
await mkdir(output,{recursive:true})
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']})
const samples=[]
try{
 const page=await browser.newPage({viewport:{width:1460,height:590}})
 await page.route(base+'/__before.webm',r=>r.fulfill({path:before,contentType:'video/webm'}))
 await page.route(base+'/__after.webm',r=>r.fulfill({path:after,contentType:'video/webm'}))
 await page.setContent(`<style>body{margin:0;padding:10px;background:#e8e4d8;color:#243b35;font:14px system-ui}main{display:grid;grid-template-columns:1fr 1fr;gap:10px}p{margin:0 0 8px}video{display:block;width:100%;aspect-ratio:1.44;object-fit:contain;background:#202c2b}</style><main><section><p>Before · preserved b205007 preview · 1×</p><video muted playsinline src="${base}/__before.webm"></video></section><section><p>After · illustrated candidate · 1×</p><video muted playsinline src="${base}/__after.webm"></video></section></main>`)
 await page.waitForFunction(()=>[...document.querySelectorAll('video')].every(v=>v.readyState>=2&&Number.isFinite(v.duration)))
 await page.locator('video').evaluateAll(videos=>Promise.all(videos.map(v=>{v.playbackRate=1;return v.play()})))
 const start=Date.now()
 for(let i=1;i<=5;i++){
  await page.waitForTimeout(3000)
  const state=await page.locator('video').evaluateAll(vs=>vs.map(v=>({currentTime:v.currentTime,duration:v.duration,playbackRate:v.playbackRate,paused:v.paused,quality:v.getVideoPlaybackQuality().toJSON?.()||{totalVideoFrames:v.getVideoPlaybackQuality().totalVideoFrames,droppedVideoFrames:v.getVideoPlaybackQuality().droppedVideoFrames}})))
  const wallSeconds=(Date.now()-start)/1000
  for(const v of state){assert.equal(v.playbackRate,1);assert.equal(v.paused,false);assert(Math.abs(v.currentTime-wallSeconds)<.8,'recording advances at normal wall-clock playback speed')}
  const file=`${output}/${prefix}-${String(i*3).padStart(2,'0')}.png`;await page.screenshot({path:file});samples.push({wallSeconds,videos:state,file})
 }
 await page.close()
}finally{await browser.close();await writeFile(`${output}/${prefix}-review.json`,JSON.stringify({method:'Two unaltered recordings played continuously at playbackRate=1, sampled sequentially against elapsed wall time; no frame seeking or sped-up screenshots.',before,after,samples},null,2)+'\n')}
console.log(`Reviewed ${samples.length} sequential 1× playback samples from both recordings.`)
