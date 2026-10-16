import assert from 'node:assert/strict'
import {chromium,webkit,expect} from '@playwright/test'
import{mkdirSync,writeFileSync,renameSync}from'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',out=process.env.QA_OUTPUT_DIR||'docs/reviews/chat-usability'
mkdirSync(out,{recursive:true});const results=[]
for(const[engine,width,theme]of[[chromium,1440,'light'],[chromium,1024,'dark'],[webkit,390,'light'],[webkit,390,'dark'],[chromium,320,'light']]){
 const browser=await engine.launch(),context=await browser.newContext({viewport:{width,height:900},hasTouch:width<600,reducedMotion:'reduce',recordVideo:{dir:out,size:{width:Math.min(width,1000),height:900}}})
 await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
 const page=await context.newPage(),video=page.video(),errors=[];let requests=0
 page.on('pageerror',e=>errors.push(e.message));await page.route('**/folio-answer',r=>{requests++;return r.fulfill({status:503,body:'unavailable'})})
 try{
  await page.goto(base+'/about');await page.getByRole('button',{name:'Ask Parth about this work',exact:true}).click()
  await expect(page.getByRole('heading',{name:'Ask about the work.',exact:true})).toBeInViewport()
  const panel=page.locator('.portfolio-chat-panel'),layout=panel.getByRole('button',{name:'Layout',exact:true}),input=panel.getByRole('textbox',{name:'Message Ask Parth'})
  await layout.click();await panel.getByRole('button',{name:'Larger chat text'}).click();await expect(panel).toHaveCSS('font-size','16px')
  if(width>=600){
   const initial=await panel.boundingBox();await panel.getByRole('button',{name:'Make chat wider'}).click();assert((await panel.boundingBox()).width>initial.width)
   await panel.getByRole('button',{name:'Dock right',exact:true}).click();let right=await panel.boundingBox();assert(right.x>width/2)
   await layout.click();await panel.getByRole('button',{name:'Float',exact:true}).click();await expect(panel).toHaveAttribute('data-dock','floating')
   const before=await panel.boundingBox(),h=await panel.locator('h2').boundingBox()
   await page.mouse.move(h.x+8,h.y+8);await page.mouse.down();await page.mouse.move(h.x+108,h.y+70,{steps:6});await page.mouse.up()
   const moved=await panel.boundingBox();assert(moved.x>before.x+50)
   const resize=panel.getByRole('button',{name:'Resize chat using drag or arrow keys'});await resize.focus();await page.keyboard.press('ArrowRight');assert((await panel.boundingBox()).width>moved.width)
   const header=panel.locator('.portfolio-chat-header');await header.focus();await page.keyboard.press('ArrowLeft');assert((await panel.boundingBox()).x<moved.x)
   await page.screenshot({path:`${out}/${engine.name()}-${width}-${theme}-floating.png`})
   await page.reload();await page.getByRole('button',{name:'Ask Parth about this work',exact:true}).click();await expect(panel).toHaveAttribute('data-dock','floating');await expect(panel).toHaveCSS('font-size','16px')
   await layout.click();await panel.getByRole('button',{name:'Reset layout',exact:true}).click();await expect(panel).toHaveAttribute('data-dock','left')
  }else{
   const initial=await panel.boundingBox();await panel.getByRole('button',{name:'Make chat taller'}).tap();assert((await panel.boundingBox()).height>initial.height)
   await layout.tap();const resize=await panel.getByRole('button',{name:'Resize chat using drag or arrow keys'}).boundingBox()
   await page.touchscreen.tap(resize.x+resize.width/2,resize.y+resize.height/2)
   const grip=panel.getByRole('button',{name:'Resize chat using drag or arrow keys'});await grip.focus();const before=await panel.boundingBox();await page.keyboard.press('ArrowUp');assert((await panel.boundingBox()).height>before.height)
   await page.screenshot({path:`${out}/${engine.name()}-${width}-${theme}-expanded.png`})
   await page.setViewportSize({width,height:430});await expect(input).toBeVisible();const compact=await panel.boundingBox();assert(compact.y>=0&&compact.y+compact.height<=431)
   await page.setViewportSize({width,height:900});await layout.click();await panel.getByRole('button',{name:'Reset layout',exact:true}).click()
  }
  await input.fill('Can you scroll down a bit?');await panel.getByRole('button',{name:'Send',exact:true}).click();await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(100);assert.equal(requests,0)
  await input.fill('Please scroll back to the top');await panel.getByRole('button',{name:'Send',exact:true}).click();await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0)
  const options=await panel.locator('#portfolio-chat-section option').count();assert(options>2)
  await panel.locator('.portfolio-chat-browse summary').click();await panel.locator('#portfolio-chat-section').selectOption('1');await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(0)
  await input.fill('Could you open Jugalbandi?');await panel.getByRole('button',{name:'Send',exact:true}).click();await expect(page).toHaveURL(/\/jugalbandi$/);await expect(panel).toBeVisible()
  await page.goto(base+'/');await page.getByRole('button',{name:'Ask Parth about this work',exact:true}).click();await input.fill('Why is he the best?');await panel.getByRole('button',{name:'Send',exact:true}).click();const answer=panel.locator('.portfolio-chat-message--assistant').last();await expect(answer).toContainText('Mentra');await expect(answer.locator('p').first()).toBeInViewport();assert(!/i only answer|only.*parth/i.test(await answer.innerText()))
  await page.screenshot({path:`${out}/${engine.name()}-${width}-${theme}-answer.png`})
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false)
  assert.deepEqual(errors,[]);results.push({engine:engine.name(),width,theme,passed:true});writeFileSync(`${out}/controls-results.json`,JSON.stringify(results,null,2));console.log(`${engine.name()} ${width} ${theme}: layout, input, navigation and fallback passed.`)
 }finally{await context.close();if(video)renameSync(await video.path(),`${out}/${engine.name()}-${width}-${theme}.webm`);await browser.close()}
}
