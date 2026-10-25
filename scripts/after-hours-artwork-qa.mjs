import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5232'
const output=process.env.QA_OUTPUT_DIR||'/workspace/portfolio-handoff/review/after-hours-v6'
await mkdir(output,{recursive:true})
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']})
const results=[],errors=[]
try{
 for(const asset of ['workshop-atlas.webp','character-parts.webp']){
  const context=await browser.newContext({viewport:{width:390,height:900},hasTouch:true,reducedMotion:'reduce'})
  let blocked=true;await context.route(`**/${asset}*`,r=>blocked?r.abort():r.continue())
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/after-hours')
  await page.locator('.ah-world[data-artwork="error"]').waitFor();await page.waitForTimeout(120);const retry=page.getByRole('button',{name:'Retry scenery',exact:true});await retry.waitFor()
  const frames=await page.locator('.ah-world').getAttribute('data-frames');await page.waitForTimeout(200);assert.equal(await page.locator('.ah-world').getAttribute('data-frames'),frames,'failed scenery remains static under reduced motion')
  await page.screenshot({path:`${output}/failed-${asset}.png`,fullPage:true})
  blocked=false;await retry.focus();await page.keyboard.press('Enter');await page.locator('.ah-world[data-artwork="ready"]').waitFor();await page.waitForTimeout(100)
  assert.equal(await page.getByRole('button',{name:'Retry scenery',exact:true}).count(),0);assert(await page.locator('canvas').evaluate(c=>document.activeElement===c),'keyboard retry returns focus to the recovered floor');assert(await page.getByRole('button',{name:'Play animation',exact:true}).isEnabled())
  await page.screenshot({path:`${output}/recovered-${asset}.png`,fullPage:true})
  results.push({asset,failureShown:true,retryRecovered:true,staticReducedMotion:true});await context.close()
 }
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/after-hours');await page.locator('.ah-world[data-artwork="ready"]').waitFor()
 await page.locator('canvas').scrollIntoViewIfNeeded();const bounds=await page.locator('canvas').boundingBox();await page.mouse.click(bounds.x+bounds.width/2,bounds.y+bounds.height/2-120*2.2);assert.equal(await page.locator('.ah-coordinate').innerText(),'BAY 0 / 0','a visible tall wall belongs to its illustrated room');
 const requests=await page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>r.name.includes('/Assets/AfterHours/')).map(r=>r.name))
 assert.equal(requests.length,2);assert(requests.every(r=>new URL(r).origin===new URL(base).origin))
 const decoded=await page.evaluate(async()=>Promise.all(['/Assets/AfterHours/workshop-atlas.webp','/Assets/AfterHours/character-parts.webp'].map(async src=>{const i=new Image();i.src=src;await i.decode();return{width:i.naturalWidth,height:i.naturalHeight,pixels:i.naturalWidth*i.naturalHeight}})))
 results.push({twoSharedSameOriginArtRequests:true,decodedImages:decoded});await context.close();assert.equal(errors.length,0)
}finally{await browser.close();await writeFile(`${output}/artwork-qa.json`,JSON.stringify({results,pageErrors:errors},null,2)+'\n')}
console.log(JSON.stringify({cases:results.length,pageErrors:errors,results}))
