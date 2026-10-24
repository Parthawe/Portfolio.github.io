import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
const output=process.env.QA_OUTPUT_DIR||'/workspace/portfolio-handoff/review/after-hours'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5230'
await mkdir(output,{recursive:true})
const browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']})
const results=[],errors=[];let page
async function open(width,theme='light',reducedMotion='no-preference',canvasFailure=false){
 const context=await browser.newContext({viewport:{width,height:1000},colorScheme:theme,reducedMotion,hasTouch:width<600})
 await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort())
 page=await context.newPage();page.on('pageerror',e=>errors.push(e.message))
 if(canvasFailure)await page.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='2d'?null:get.call(this,type,...args)}})
 const response=await page.goto(base+'/after-hours',{waitUntil:'domcontentloaded'});assert.equal(response.status(),200)
 await page.getByRole('heading',{name:'After hours.'}).waitFor();return context
}
const frames=()=>page.locator('.ah-world').getAttribute('data-frames').then(Number)
try{
 for(const width of [320,390,768,1440])for(const theme of ['light','dark']){
  const context=await open(width,theme);await page.locator('canvas').scrollIntoViewIfNeeded();await page.waitForFunction(()=>Number(document.querySelector('.ah-world').dataset.frames)>1)
  const start=await frames();await page.waitForTimeout(550);assert((await frames())>start);assert((await frames())-start<23,'frame rate bounded')
  await page.getByRole('button',{name:'Pause animation',exact:true}).click();await page.waitForTimeout(100);const stop=await frames();await page.waitForTimeout(250);assert.equal(await frames(),stop)
  const canvas=page.locator('canvas');await canvas.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(100)
  assert.notEqual(await page.locator('.ah-world').getAttribute('data-camera'),'0,0');assert(await frames()>stop,'paused view redraws on input')
  await page.keyboard.press('Home');await page.waitForTimeout(80);assert.equal(await page.locator('.ah-world').getAttribute('data-camera'),'0,0')
  const z=await page.locator('output').innerText();await page.getByRole('button',{name:'Zoom in',exact:true}).click();assert.notEqual(await page.locator('output').innerText(),z)
  await page.getByRole('button',{name:'Return to start',exact:true}).click()
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
  await canvas.focus();await page.keyboard.press('Shift+Tab');await page.keyboard.press('Tab');assert(await canvas.evaluate(e=>getComputedStyle(e).outlineStyle==='solid'))
  if(width<600)assert(await page.getByRole('button',{name:'Explore by touch',exact:true}).isVisible(),'touch controls remain available after keyboard/mouse interaction')
  await page.screenshot({path:`${output}/world-${width}-${theme}.png`,fullPage:true})
  results.push({width,theme,animation:true,pause:true,keyboardPan:true,home:true,zoom:true,pausedRedraw:true,noOverflow:true,focus:true,metrics:await page.locator('.ah-world').evaluate(e=>({...e.dataset}))})
  await context.close()
 }
 const context=await open(390,'dark','reduce');await page.locator('canvas').scrollIntoViewIfNeeded();await page.waitForTimeout(150)
 assert(await page.getByRole('button',{name:'Play animation',exact:true}).isEnabled());const stop=await frames();await page.waitForTimeout(300);assert.equal(await frames(),stop)
 await page.getByRole('button',{name:'Play animation',exact:true}).click();await page.waitForTimeout(200);assert(await frames()>stop,'explicit play opts into animation under reduced motion')
 await page.getByRole('button',{name:'Pause animation',exact:true}).click();await page.waitForTimeout(80);const optedStop=await frames();await page.waitForTimeout(150);assert.equal(await frames(),optedStop)
 await page.getByRole('button',{name:'Play animation',exact:true}).click()
 await page.setViewportSize({width:320,height:1000});await page.waitForTimeout(100);assert.equal(await page.locator('canvas').evaluate(c=>c.width),await page.evaluate(()=>Math.round(document.querySelector('.ah-world').clientWidth*Math.min(devicePixelRatio,1.5))))
 await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(180);assert(await frames()>stop)
 results.push({reducedMotion:true,explicitPlayOptIn:true,staticResize:true,preferenceChange:true})
 await page.getByRole('button',{name:'Pause animation',exact:true}).click()
 await page.locator('canvas').scrollIntoViewIfNeeded();const bounds=await page.locator('canvas').boundingBox();const x=bounds.x+bounds.width/2,y=bounds.y+bounds.height/2
 await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+70,y+45,{steps:5});await page.mouse.up();await page.waitForTimeout(100)
 assert.notEqual(await page.locator('.ah-world').getAttribute('data-camera'),'0,0')
 await page.getByRole('button',{name:'Explore by touch',exact:true}).click()
 const cdp=await context.newCDPSession(page)
 const before=await page.locator('output').innerText()
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x-35,y},{x:x+35,y}]})
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-65,y},{x:x+65,y}]})
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.notEqual(await page.locator('output').innerText(),before)
 results.push({pointerDrag:true,touchPinch:true})
 await page.getByRole('button',{name:'Play animation',exact:true}).click();await page.waitForTimeout(100)
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{value:true,configurable:true});document.dispatchEvent(new Event('visibilitychange'))});await page.waitForTimeout(80)
 const hidden=await frames();await page.waitForTimeout(200);assert.equal(await frames(),hidden)
 await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'))});await page.waitForTimeout(100);assert(await frames()>hidden)
 await page.locator('summary').click();await page.locator('.ah-footer').scrollIntoViewIfNeeded();await page.waitForTimeout(100);const offscreen=await frames();await page.waitForTimeout(200);assert.equal(await frames(),offscreen)
 results.push({hiddenDocumentSimulation:true,offscreen:true})
 await context.close()
 const fallback=await open(390,'light','reduce',true);await page.getByText('The illustrated floor is unavailable.').waitFor();assert(await page.getByRole('button',{name:'Animation unavailable',exact:true}).isDisabled());assert.equal(await page.locator('.ah-touch-tools').count(),0);await page.locator('summary').click();const workshops=page.locator('.ah-directory button');assert.equal(await workshops.count(),8)
 for(let i=0;i<8;i++){const name=await workshops.nth(i).locator('strong').innerText();await workshops.nth(i).click();assert.equal(await page.locator('.ah-selected h2').innerText(),name)}
 results.push({canvasFailure:true,allEightRoomsAccessible:true});await fallback.close()
 const perf=await open(1440);await page.locator('canvas').scrollIntoViewIfNeeded();await page.waitForTimeout(300)
 const samples=[];for(let i=0;i<20;i++){samples.push(await page.locator('.ah-world').evaluate(e=>Number(e.dataset.drawMs)));await page.waitForTimeout(50)}
 const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name))
 assert(!resources.some(r=>/HeroScene|vendor-three|\.gif|\.mp4|\.glb|\.avif/.test(r)),'world does not load homepage 3D/media assets')
 results.push({drawSamplesMs:samples,maximumSampleMs:Math.max(...samples),noHeroOrMediaDependencies:true});await perf.close()
}catch(e){results.push({failure:e.stack});if(page&&!page.isClosed())await page.screenshot({path:`${output}/failure.png`,fullPage:true});process.exitCode=1}
await browser.close();await writeFile(`${output}/qa.json`,JSON.stringify({results,pageErrors:errors},null,2)+'\n');console.log(JSON.stringify({cases:results.length,pageErrors:errors,last:results.at(-1)}));if(errors.length)process.exitCode=1
