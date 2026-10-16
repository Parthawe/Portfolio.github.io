import {chromium,expect} from '@playwright/test'
import assert from 'node:assert/strict'
import {writeFileSync,readFileSync,readdirSync} from 'node:fs'
import {gzipSync} from 'node:zlib'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',runs=[]
const browser=await chromium.launch()
try{
 for(let i=0;i<3;i++){
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),requests=[]
  page.on('request',r=>requests.push(r.url()))
  await page.goto(`${base}/experience-preview/jugalbandi`,{waitUntil:'domcontentloaded'});await page.locator('.ja-stage svg').waitFor()
  const readyMs=await page.evaluate(()=>performance.now())
  await page.locator('.ja-stage').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'Pluck selected string',exact:true}).click();await expect(page.locator('.ja-status')).toContainText('completed')
  const mechanisms=[]
  for(const kind of ['harp','flute','rain','hexa']){
   if(kind!=='harp')await page.getByRole('button',{name:kind==='flute'?/Automated flute/:kind==='rain'?/Rainsticks/:/Hexa-18/}).click()
   if(kind==='flute'){await page.getByRole('button',{name:'Send an air pulse',exact:true}).click();await expect(page.locator('.ja-status')).toContainText('finished')}
   if(kind==='rain'){await page.getByRole('button',{name:'Turn the rainstick',exact:true}).click();await expect(page.locator('.ja-status')).toHaveText('Rainstick 1: 65° from upright.')}
   if(kind==='hexa'){await page.getByRole('button',{name:'Trigger sensor 18',exact:true}).click();await expect(page.locator('.ja-status')).toContainText('released')}
   await page.evaluate(()=>{window.__stageMutations=0;window.__observer=new MutationObserver(records=>window.__stageMutations+=records.length);window.__observer.observe(document.querySelector('.ja-stage'),{subtree:true,attributes:true,childList:true})})
   await page.waitForTimeout(1200)
   const idle=await page.evaluate(()=>{window.__observer.disconnect();return {mutations:window.__stageMutations,paths:document.querySelectorAll('.ja-stage path').length,canvas:document.querySelectorAll('.ja canvas').length}})
   assert.equal(idle.mutations,0);assert.equal(idle.canvas,0);mechanisms.push({kind,...idle})
  }
  assert(!requests.some(url=>/RoomScene-|vendor-three|potsdamer_platz|jugalbandi\.mp4/.test(url)),'No Three.js scene, HDR or movie requested for the mechanism')
  runs.push({readyMs,mechanisms});await context.close()
 }
}finally{await browser.close()}
const file=readdirSync('dist/bundle').find(f=>/^JugalbandiAnatomy-.*\.js$/.test(f)),data=readFileSync(`dist/bundle/${file}`)
const result={environment:'Local production preview, headless Chromium, 1440×1000; fresh context per run; no network/CPU throttling. Not a field performance measurement or comparison.',moduleBytes:data.length,gzipBytes:gzipSync(data).length,runs}
writeFileSync('docs/jugalbandi-anatomy-performance.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2))
