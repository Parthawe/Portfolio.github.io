import assert from 'node:assert/strict'
import {chromium,webkit,expect} from '@playwright/test'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5210',out=process.env.QA_OUTPUT_DIR||'/tmp/moniac-hydraulic-qa'
mkdirSync(out,{recursive:true});const results=[],errors=[]
for(const [engine,width]of[[chromium,1440],[chromium,390],[webkit,390]]){
 const browser=await engine.launch()
 try{for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width,height:1000},hasTouch:width===390,reducedMotion:'reduce',recordVideo:width===1440&&theme==='dark'?{dir:out}:undefined})
  await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(`${base}/experience-preview/moniac-machine`)
  const scene=page.getByRole('group',{name:'MONIAC isometric hydraulic game'})
  await expect(scene.getByRole('slider')).toHaveCount(6);assert.equal(await page.locator('.moniac-policy-bank').count(),0,'no flat bar bank');assert.equal(await page.locator('.moniac-game canvas').count(),0,'no GPU renderer')
  await expect(scene.getByRole('slider').first()).toHaveAttribute('aria-disabled','true')
  await page.getByRole('button',{name:'Start Economy',exact:true}).click()
  for(const label of ['Tax Rate','Gov Spend','Consumer','Invest','Imports','Exports']){
   const wheel=scene.getByRole('slider',{name:`${label} valve`,exact:true});await wheel.scrollIntoViewIfNeeded();const box=await wheel.boundingBox(),x=box.x+box.width/2,y=box.y+box.height/2,before=Number(await wheel.getAttribute('aria-valuenow'))
   if(width===390)assert(box.width>=44&&box.height>=44,'mobile valve target is at least 44 CSS pixels')
   if(width===390&&engine===chromium){const session=await context.newCDPSession(page);await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+35,y:y-10,id:1}]});await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await session.detach()}
   else{await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+35,y-10,{steps:5});await page.mouse.up()}
   assert(Number(await wheel.getAttribute('aria-valuenow'))>before,`${label} direct drag works`)
   await wheel.focus();await wheel.press('Home');await expect(wheel).toHaveAttribute('aria-valuenow','0');await wheel.press('ArrowRight');await expect(wheel).toHaveAttribute('aria-valuenow','1');await wheel.press('End');await expect(wheel).toHaveAttribute('aria-valuenow','100')
  }
  const tax=scene.getByRole('slider',{name:'Tax Rate valve',exact:true});await tax.focus();await tax.press('Home');await expect(page.locator('[data-hydraulic-tank="tax-reservoir"]')).toHaveAttribute('data-level','0');await tax.press('PageUp');await expect(page.locator('[data-hydraulic-tank="tax-reservoir"]')).toHaveAttribute('data-level','10')
  await page.getByRole('button',{name:'Pause game',exact:true}).click();await expect(tax).toHaveAttribute('aria-disabled','true');await tax.focus();await tax.press('ArrowRight');await expect(tax).toHaveAttribute('aria-valuenow','10');await expect(page.locator('#moniac-active-policy')).toBeDisabled()
  await page.getByRole('button',{name:'Resume game',exact:true}).click();await expect(tax).toHaveAttribute('aria-disabled','false')
  await page.getByRole('button',{name:'Explore rules without shocks',exact:true}).click();await page.locator('#moniac-policy').selectOption('interestRate');await expect(page.locator('#moniac-active-policy')).toBeEnabled();await page.locator('#moniac-active-policy').fill('75');await page.getByRole('button',{name:'Run one model step',exact:true}).click();await expect(page.locator('.moniac-step-results tbody tr')).toHaveCount(4)
  await page.getByRole('button',{name:'Reset experiment',exact:true}).click();await expect(page.locator('.moniac-step-results')).toHaveCount(0)
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'viewport fits')
  await page.getByRole('button',{name:'Resume game',exact:true}).click();await page.getByRole('button',{name:'Pause game',exact:true}).click();await page.getByRole('button',{name:'Restart game',exact:true}).click();await expect(tax).toHaveAttribute('aria-valuenow','35')
  await page.getByRole('button',{name:'Pause game',exact:true}).click();await page.locator('.moniac-isometric-screen').screenshot({path:`${out}/${engine.name()}-${width}-${theme}.png`})
  results.push(`${engine.name()} ${width} ${theme}: six direct valve drags, keyboard bounds, linked water, pause/resume, interest inspector, deterministic step, reset and no overflow`)
  const video=page.video();await context.close();if(video)await video.saveAs(`${out}/interaction.webm`)
 }}finally{await browser.close()}
}
assert.deepEqual(errors,[]);writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2));console.log(results.join('\n'))
