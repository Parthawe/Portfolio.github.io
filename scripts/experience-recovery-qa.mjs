import assert from 'node:assert/strict'
import { chromium, webkit, expect } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5199', out='/tmp/portfolio-experience-recovery-qa'
mkdirSync(out,{recursive:true})
const results=[], errors=[]
for(const [engine,mobile] of [[chromium,false],[chromium,true],[webkit,true]]) {
 const browser=await engine.launch()
 try {
  const context=await browser.newContext({viewport:mobile?{width:375,height:812}:{width:1185,height:969},hasTouch:mobile,reducedMotion:'reduce'})
  await context.addInitScript(()=>{if(window.top===window)try{localStorage.setItem('theme','dark')}catch{}})
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message))
  await page.goto(base+'/work?filter=ux',{waitUntil:'domcontentloaded'})
  await expect(page.locator('[data-work-filter="ux"]').first()).toHaveAttribute('aria-pressed','true')
  await page.reload();await expect(page.locator('[data-work-filter="ux"]').first()).toHaveAttribute('aria-pressed','true')
  {await page.getByRole('link',{name:'Index',exact:true}).click();assert(new URL(page.url()).searchParams.get('filter')==='ux');assert(new URL(page.url()).searchParams.get('view')==='library');await page.getByRole('link',{name:'Editorial',exact:true}).click()}
  await page.locator('[data-work-filter="all"]:visible').first().click();assert(!new URL(page.url()).searchParams.has('filter'))
  await page.goBack();await expect(page.locator('[data-work-filter="ux"]').first()).toHaveAttribute('aria-pressed','true')
  await page.screenshot({path:`${out}/${engine.name()}-${mobile?'mobile':'desktop'}-work.png`})
  if(mobile){
   const trigger=page.getByRole('button',{name:'Open menu',exact:true});await trigger.click()
   const handle=page.locator('.compact-sheet-grab'), r=await handle.boundingBox()
   await page.mouse.move(r.x+r.width/2,r.y+r.height/2);await page.mouse.down();await page.mouse.move(r.x+r.width/2,r.y+r.height/2+90,{steps:6});await page.mouse.up()
   await expect(page.getByRole('dialog')).toHaveCount(0);await expect(trigger).toBeFocused();assert(!(await page.locator('#root').evaluate(el=>el.inert)))
  }
  await page.route('https://www.figma.com/embed?*',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><p>Access required</p>'}))
  await page.goto(base+'/mentra/prototype',{waitUntil:'domcontentloaded'})
  await page.getByRole('button',{name:'Load interactive Figma prototype'}).click()
  await expect(page.frameLocator('iframe').getByText('Access required')).toBeVisible()
  await page.getByRole('button',{name:'Back to recording'}).click();await expect(page.locator('video')).toBeVisible();await expect(page.locator('iframe')).toHaveCount(0)
  await page.goto(base+'/moniac-machine/world',{waitUntil:'domcontentloaded'})
  const world=page.locator('.physical-world');await expect(world.locator('canvas')).toBeVisible({timeout:30000})
  const slider=world.getByRole('slider',{name:'Tax',exact:true});await slider.fill('70');await world.getByRole('button',{name:'Object',exact:true}).click()
  await world.getByRole('button',{name:'Reset',exact:true}).click();await expect(slider).toHaveValue('30');if(!mobile){await page.waitForTimeout(4200);await expect(world.locator('[role="status"].sr-only')).toHaveText('Settings reset')}await world.getByRole('button',{name:'Undo reset'}).click()
  await expect(slider).toHaveValue('70');await expect(world.getByRole('button',{name:'Object',exact:true})).toHaveAttribute('aria-pressed','true');await expect(world.getByRole('button',{name:'Reset',exact:true})).toBeFocused()
  await world.getByRole('button',{name:'Reset',exact:true}).click();await slider.fill('50');await expect(world.getByRole('button',{name:'Undo reset'})).toHaveCount(0)
  await world.getByRole('button',{name:'Reset',exact:true}).click()
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1))
  await world.locator('header').screenshot({path:`${out}/${engine.name()}-${mobile?'mobile':'desktop'}-reset.png`})
  results.push(`${engine.name()} ${mobile?'mobile':'desktop'}`);console.log(results.at(-1));await context.close()
 }finally{await browser.close()}
}
writeFileSync(out+'/report.json',JSON.stringify({results,errors},null,2));assert.equal(errors.length,0,errors.join('\n'));console.log('Recovery, filter history, sheet swipe, reset undo and responsive checks passed.')
