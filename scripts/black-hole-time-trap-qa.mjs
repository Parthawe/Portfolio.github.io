import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
import {chromium,webkit,expect} from '@playwright/test'
const base=process.env.QA_DEV_URL||'http://127.0.0.1:5211',out=process.env.QA_OUTPUT_DIR||'/tmp/black-hole-time-trap-qa'
mkdirSync(out,{recursive:true});const results=[],errors=[]
for(const engine of[chromium,webkit]){
 const browser=await engine.launch()
 try{for(const profile of[{width:1440,height:1000,theme:'dark',reduce:false},{width:390,height:844,theme:'light',reduce:false},{width:390,height:844,theme:'dark',reduce:true}]){
  const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},hasTouch:profile.width===390,reducedMotion:profile.reduce?'reduce':'no-preference',recordVideo:engine===chromium&&profile.width===1440?{dir:out}:undefined})
  await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},profile.theme)
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(`${base}/experience-preview/black-hole`)
  const canvas=page.locator('.physical-world-stage canvas');await expect(canvas).toHaveAttribute('data-time-trap',/.+/,{timeout:30000});await canvas.scrollIntoViewIfNeeded();await page.waitForTimeout(1800)
  const state=async()=>JSON.parse(await canvas.getAttribute('data-time-trap'))
  const mobile=profile.width===390
  const tools=async()=>{if(mobile)await page.getByRole('button',{name:'Project controls',exact:true}).click()}
  const close=async()=>{if(mobile)await page.getByRole('button',{name:'Close project controls'}).click();await canvas.scrollIntoViewIfNeeded();await page.waitForTimeout(100)}
  let a=await state();await page.waitForTimeout(500);let b=await state()
  if(profile.reduce){assert.equal(b.reference,a.reference,'reduced motion stays still');await tools();await page.getByRole('button',{name:'Advance clocks one step'}).click();await close();b=await state();assert.equal(b.reference-a.reference,1);assert(Math.abs(b.adjustable-a.adjustable-b.rate)<.001)}
  else {assert(b.reference>a.reference+.1,'clocks run on entry');assert(Math.abs((b.adjustable-a.adjustable)/(b.reference-a.reference)-b.rate)<.005,'live speed ratio matches distance')}
  await tools();const slider=page.getByRole('slider',{name:'Clock distance',exact:true});if(!profile.reduce)await page.getByRole('button',{name:'Pause study',exact:true}).click();await slider.fill('0');await close()
  a=await state();await tools();await slider.fill('100');await close();b=await state();assert.equal(b.reference,a.reference,'pause holds reference');assert.equal(b.adjustable,a.adjustable,'distance change never jumps hands');assert.equal(b.rate,1)
  // Keyboard fallback for the same physical distance parameter.
  await tools();await slider.focus();await slider.press('Home');await expect(slider).toHaveValue('0');await slider.press('ArrowRight');await expect(slider).toHaveValue('1');await slider.fill('65');await close();await page.waitForTimeout(300)
  // Drag directly on the physical clock; Chromium mobile uses native touch input.
  a=await state();const end={x:a.x+35,y:a.y}
  if(mobile&&engine===chromium){const cdp=await context.newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:a.x,y:a.y,id:1}]});for(let i=1;i<=8;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:a.x+(end.x-a.x)*i/8,y:a.y,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await cdp.detach()}
  else {await page.mouse.move(a.x,a.y);await page.mouse.down();await page.mouse.move(end.x,end.y,{steps:8});await page.mouse.up()}
  await page.waitForTimeout(200);b=await state();assert(Math.abs(b.distance-a.distance)>2,'direct physical clock drag changes distance')
  if(!profile.reduce){
   const measurements=[]
   for(const distance of[0,100]){await tools();await slider.fill(String(distance));await page.getByRole('button',{name:'Play study',exact:true}).click();await close();a=await state();await page.waitForTimeout(650);b=await state();const ref=b.reference-a.reference,relative=(b.adjustable-a.adjustable)/ref;assert(ref>.1);assert(Math.abs(relative-(distance===0?.15:1))<.01);measurements.push({distance,relative});await tools();await page.getByRole('button',{name:'Pause study',exact:true}).click();await close()}
   a=await state();await page.waitForTimeout(300);b=await state();assert.equal(a.reference,b.reference);assert.equal(a.adjustable,b.adjustable)
   results.push({engine:engine.name(),...profile,measurements})
  }else results.push({engine:engine.name(),...profile,manualStep:'pass'})
  await page.getByRole('button',{name:'Reset',exact:true}).click();await canvas.scrollIntoViewIfNeeded();await page.waitForTimeout(150);assert.equal((await state()).distance,65)
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'viewport fit')
  await page.screenshot({path:`${out}/${engine.name()}-${profile.width}-${profile.theme}.png`,fullPage:true})
  const video=page.video();await context.close();if(video)await video.saveAs(`${out}/time-trap-interaction.webm`)
 }}finally{await browser.close()}
}
writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2));assert.deepEqual(errors,[]);console.log(JSON.stringify(results,null,2))
