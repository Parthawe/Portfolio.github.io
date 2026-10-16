import assert from 'node:assert/strict'
import { chromium, webkit, expect } from '@playwright/test'
import { mkdirSync, writeFileSync, renameSync } from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211'
const out=process.env.QA_OUTPUT_DIR||'docs/reviews/chat-integration'
mkdirSync(out,{recursive:true})
const results=[]
for(const [engine,width,theme,motion] of [[chromium,1440,'light','no-preference'],[chromium,1440,'dark','reduce'],[chromium,390,'light','reduce'],[chromium,390,'dark','no-preference'],[webkit,390,'light','reduce'],[webkit,390,'dark','no-preference']]){
 const browser=await engine.launch()
 const context=await browser.newContext({viewport:{width,height:900},hasTouch:width<600,reducedMotion:motion,recordVideo:{dir:out,size:{width:Math.min(width,1000),height:900}}})
 await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
 const page=await context.newPage(),video=page.video(),errors=[]
 page.on('pageerror',e=>errors.push(e.message))
 await page.route('**/folio-answer',route=>route.fulfill({status:503,body:'unavailable'}))
 try{
  await page.goto(base+'/about')
  const launch=page.getByRole('button',{name:/^Ask Parth about this work$/})
  await launch.waitFor({state:'visible',timeout:20000})
  width<600?await launch.tap():await launch.click()
  const panel=page.getByRole('complementary',{name:'Ask Parth chat'})
  await expect(panel).toBeVisible()
  assert.equal(await page.locator('#root').evaluate(el=>el.inert),false)
  const field=panel.getByRole('textbox',{name:'Message Ask Parth'})
  await field.fill('Compare Mentra and TransFi')
  await panel.getByRole('button',{name:'Send',exact:true}).click()
  await expect(panel.locator('.portfolio-chat-message--assistant').last()).toContainText('TransFi',{timeout:30000})
  await field.fill('Draft preserved')
  await page.screenshot({path:`${out}/${engine.name()}-${width}-${theme}.png`})
  await page.evaluate(()=>{const d=document.createElement('dialog');d.id='chat-qa-dialog';d.innerHTML='<button autofocus>Close artwork</button>';document.body.append(d);d.showModal()})
  await expect(panel).toBeHidden()
  await page.keyboard.press('Escape')
  await expect(panel).toBeVisible()
  await page.evaluate(()=>document.querySelector('#chat-qa-dialog')?.remove())
  await field.focus()
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
  await expect(launch).toBeFocused()
  width<600?await launch.tap():await launch.click()
  await expect(field).toHaveValue('Draft preserved')
  await panel.getByRole('button',{name:'Back to top ↑',exact:true}).click()
  await expect(panel).toBeVisible()
  const box=await panel.boundingBox()
  assert(box.x>=0&&box.x+box.width<=width+1)
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
  await panel.getByRole('button',{name:'Close panel',exact:true}).click()
  await page.goto(base+'/transfi-project')
  await launch.waitFor({state:'visible',timeout:20000})
  width<600?await launch.tap():await launch.click()
  await expect(field).toHaveValue('Draft preserved')
  assert.deepEqual(errors,[])
  results.push({engine:engine.name(),width,theme,motion,passed:true})
 }finally{await context.close();if(video)renameSync(await video.path(),`${out}/${engine.name()}-${width}-${theme}.webm`);await browser.close()}
}
writeFileSync(`${out}/checks.json`,JSON.stringify(results,null,2))
console.log('PASS: six desktop/mobile profiles; real cursor and touch entry, answers, native-dialog suspension, Escape, focus return, drafts across navigation, no overflow or browser errors.')
