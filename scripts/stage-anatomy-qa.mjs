import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium, webkit, expect } from '@playwright/test'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',out='/tmp/stage-anatomy-qa'
mkdirSync(out,{recursive:true});const results=[],errors=[]
for(const [engine,name,width] of [[chromium,'desktop',1440],[chromium,'touch',390],[webkit,'webkit',390]]){
 const browser=await engine.launch()
 try{for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width,height:1000},hasTouch:width===390,isMobile:width===390,recordVideo:name==='desktop'&&theme==='light'?{dir:`${out}/video`}:undefined})
  await context.addInitScript(t=>localStorage.setItem('theme',t),theme)
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message))
  const start=Date.now();await page.goto(`${base}/experience-preview/revolving-stage`);await page.locator('.stage-anatomy svg').waitFor()
  const readyMs=Date.now()-start
  assert.equal(await page.locator('canvas').count(),0)
  assert(!(await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name))).some(s=>s.includes('RoomScene')))
  await page.locator('.stage-anatomy').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${name}-${theme}.png`})
  await page.getByRole('button',{name:'Assemble',exact:true}).click();await expect(page.locator('.stage-anatomy input')).toHaveValue('0')
  await page.locator('.stage-anatomy input').focus();await page.keyboard.press('ArrowRight');await expect(page.locator('.stage-anatomy input')).toHaveValue('1')
  await page.getByRole('button',{name:'Central axle',exact:true}).click();await expect(page.locator('.stage-anatomy__reading')).toContainText('bearings')
  await expect(page.locator('[data-part="axle"]').first()).toHaveAttribute('data-selected','true')
  await page.getByRole('button',{name:'Reset assembly',exact:true}).click();await expect(page.locator('.stage-anatomy input')).toHaveValue('100')
  await page.emulateMedia({reducedMotion:'reduce'});await page.getByRole('button',{name:'Assemble',exact:true}).click();await expect(page.locator('.stage-anatomy output')).toHaveText('Together')
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1))
  await page.getByText('Compare the original construction drawings',{exact:true}).click()
  for(const img of await page.locator('.stage-workshop__sources img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true)}
  if(name==='desktop'){
   await page.getByRole('button',{name:'Explore rotation',exact:true}).click();await page.locator('canvas').waitFor({timeout:30000})
   await page.getByRole('button',{name:'Inside the assembly',exact:true}).click();assert.equal(await page.locator('canvas').count(),0)
  }
  results.push({name,theme,readyMs,controls:'passed',overflow:false})
  const video=page.video();await context.close();if(video)await video.saveAs(`${out}/interaction.webm`)
 }}finally{await browser.close()}
}
assert.deepEqual(errors,[]);writeFileSync(`${out}/results.json`,JSON.stringify({results,errors},null,2));console.log(JSON.stringify(results,null,2))
