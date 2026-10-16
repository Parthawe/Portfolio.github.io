import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
import {chromium,webkit,expect} from '@playwright/test'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',out='/tmp/stage-anatomy-qa'
mkdirSync(out,{recursive:true});const results=[],errors=[]
for(const [engine,name,width] of [[chromium,'desktop',1440],[chromium,'touch',390],[webkit,'webkit',390]]){
 const browser=await engine.launch()
 try{for(const theme of ['light','dark']){
 const context=await browser.newContext({viewport:{width,height:1000},hasTouch:width===390,isMobile:width===390,reducedMotion:'reduce',recordVideo:name==='desktop'&&theme==='light'?{dir:out}:undefined}),page=await context.newPage()
 await page.addInitScript(t=>localStorage.setItem('theme',t),theme);page.on('pageerror',e=>errors.push(e.message));const start=Date.now();await page.goto(`${base}/experience-preview/revolving-stage`);await expect(page.locator('.stage-anatomy svg')).toBeVisible();const readyMs=Date.now()-start
 const nav=page.getByRole('navigation',{name:'Stage anatomy chapters'});await expect(nav.getByRole('button')).toHaveCount(8)
 await page.getByRole('button',{name:'Assemble',exact:true}).click();await expect(page.getByRole('slider')).toHaveValue('0');await page.getByRole('slider').focus();await page.keyboard.press('ArrowRight');await expect(page.getByRole('slider')).toHaveValue('1')
 for(const [i,label] of ['Base','Casters','Axle','Platform','Rotation','Scenery','Performance','Disassembly'].entries()){
  await nav.getByRole('button',{name:new RegExp(label+'$')}).click();await expect(nav.getByRole('button',{name:new RegExp(label+'$')})).toHaveAttribute('aria-current','step')
  const image=page.locator('.stage-journey-evidence img');await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true)
  if(label==='Casters'){for(const part of ['Mounting plate','Fork','Wheel','Axle ends']){await page.getByRole('button',{name:part,exact:true}).click();await expect(page.locator('.stage-anatomy__reading')).not.toBeEmpty()}}
  if(label==='Axle'){for(const part of ['Steel Plate 2','Bearing housing','Ball Bearing','Thrust bearing','Shaft','Steel Plate 1']){await page.getByRole('button',{name:part,exact:true}).click();await expect(page.getByRole('button',{name:part,exact:true})).toHaveAttribute('aria-pressed','true')}await page.getByRole('button',{name:'Complete axle'}).click();await page.getByRole('slider').fill('0');await expect(page.getByRole('slider')).toHaveValue('0');await page.getByRole('button',{name:'Reset axle'}).click();await expect(page.getByRole('slider')).toHaveValue('100')}
  if(label==='Rotation'){await page.getByRole('slider').fill('90');await expect(page.locator('.stage-detail output')).toContainText('90° anticlockwise');await page.getByRole('button',{name:'Lift platform to inspect supports'}).click();await expect(page.getByRole('button',{name:'Seat platform'})).toHaveAttribute('aria-pressed','true');await page.getByRole('button',{name:'Reset rotation'}).click();await expect(page.getByRole('slider')).toHaveValue('0')}
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.equal(await page.locator('canvas').count(),0)
  await page.locator('.stage-journey-chapter').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${name}-${theme}-${i}-${label}.png`,fullPage:true})
 }
 await page.getByRole('button',{name:'Start again'}).click();await expect(page.locator('.stage-journey-progress [role=status]')).toContainText('1 of 8');await page.getByRole('button',{name:'Next: Casters'}).click();await expect(page.locator('#stage-chapter-title')).toBeFocused();await page.getByRole('button',{name:'Previous chapter'}).click();await expect(page.locator('.stage-journey-progress [role=status]')).toContainText('1 of 8')
 const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name));assert(!resources.some(n=>/RoomScene|vendor-three/.test(n)))
 results.push({name,theme,readyMs,chapters:8,canvasCount:0});const video=page.video();await context.close();if(video)await video.saveAs(`${out}/journey.webm`)
 }}finally{await browser.close()}
}
assert.deepEqual(errors,[]);writeFileSync(`${out}/journey-results.json`,JSON.stringify({results,errors},null,2));console.log('Passed eight chapters in six profiles, component inspection, sliders, reset, source images, keyboard focus and zero WebGL loads.')
