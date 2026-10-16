import assert from 'node:assert/strict'
import { chromium, webkit, expect } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5222',out=process.env.QA_OUTPUT_DIR||'/tmp/product-decisions-qa'
mkdirSync(out,{recursive:true});const results=[],failures=[]
const profiles=[[chromium,1440,'light'],[chromium,1440,'dark'],[chromium,768,'dark'],[chromium,390,'light'],[chromium,320,'dark'],[webkit,390,'dark']]
for(const [engine,width,theme] of profiles) {
 const browser=await engine.launch(),context=await browser.newContext({viewport:{width,height:960},hasTouch:width<500,reducedMotion:'reduce',recordVideo:width===390&&engine===chromium?{dir:out}:undefined})
 await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
 const page=await context.newPage(),errors=[],requests=[];page.on('pageerror',error=>errors.push(error.message));page.on('request',r=>requests.push(r.url()))
 const overflow=async()=>assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal page overflow')
 const original=async img=>{await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);await img.focus();await img.press('Enter');await expect(page.getByRole('dialog',{name:'Image preview',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(img).toBeFocused()}
 try {
  await page.goto(base+'/mentra');await page.locator('.cs-expand-preview-btn').click()
  await expect(page.locator('.case-study-slide')).toHaveCount(10)
  await expect(page.locator('.screen-decision')).toHaveCount(10)
  assert.equal(await page.locator('#source-presentation .case-study-slide').count(),0,'44-slide archive not mounted until opened')
  const runtime=page.locator('#decision-runtime'),rail=runtime.locator('.case-study-slides__images')
  await runtime.getByRole('button',{name:/^Next /}).click();await expect(runtime.locator('[role=status]')).toHaveText('2 / 3')
  await rail.focus();await page.keyboard.press('ArrowLeft');await expect(runtime.locator('[role=status]')).toHaveText('1 / 3')
  await original(runtime.locator('img').first());await overflow();await page.screenshot({path:`${out}/mentra-${width}-${theme}-${engine.name()}.png`})
  await page.getByText('Inspect all 44 original presentation slides',{exact:true}).click();await expect(page.locator('#source-presentation .case-study-slide')).toHaveCount(44)
  await page.goto(base+'/mentra#cs-os');await expect(page.locator('#source-presentation')).toHaveAttribute('open','');await expect(page.locator('#cs-os .case-study-slide')).toHaveCount(13)
  results.push({slug:'mentra',engine:engine.name(),width,theme,status:'pass'})
  requests.length=0;await page.goto(base+'/transfi-project');await page.locator('.cs-expand-preview-btn').click()
  await expect(page.locator('.case-study-slide')).toHaveCount(3);await expect(page.locator('.screen-decision')).toHaveCount(3)
  assert(requests.filter(url=>url.includes('/Assets/case-study-slides/transfi/')).every(url=>/slide-(6-6779|6-9052|6-9184)/.test(url)),'only public TransFi source slides requested')
  assert.equal(await page.locator('#cs-transfi-research').count(),0)
  await original(page.locator('.case-study-slide > img').first())
  const code=page.getByLabel('Reviewer code',{exact:true});await code.scrollIntoViewIfNeeded();await expect(page.locator('#cs-bottom-nav')).not.toBeVisible();await code.fill('invalid-local-review');await code.blur();await expect(page.locator('#cs-bottom-nav')).not.toBeVisible();await page.getByRole('button',{name:'Unlock',exact:true}).click();await expect(page.locator('.nda-inline-form--code .nda-inline-confirmation')).toBeVisible()
  await page.locator('.nda-request-disclosure > summary').click();await expect(page.getByRole('form',{name:'Request case study access'})).toBeVisible();await overflow();await page.screenshot({path:`${out}/transfi-${width}-${theme}-${engine.name()}.png`})
  results.push({slug:'transfi-project',engine:engine.name(),width,theme,status:'pass'})
  await page.goto(base+'/mentra-miniapps');await page.locator('.cs-expand-preview-btn').click()
  await expect(page.locator('.cs-screen-strip .screen-decision')).toHaveCount(3)
  for(const explorer of await page.locator('.cs-screen-explorer').all()) for(const button of await explorer.locator('.cs-screen-explorer__choices button').all()) {
   await button.focus();await page.keyboard.press('Enter');await expect(button).toHaveAttribute('aria-pressed','true');await expect.poll(()=>explorer.locator('img').evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true)
  }
  const notes=page.locator('.cs-screen-explorer').first();await notes.locator('.cs-screen-explorer__choices button').first().click();await expect(notes.locator('.screen-decision')).toContainText('Which conversation')
  await original(notes.locator('img'));await overflow();await page.screenshot({path:`${out}/miniapps-${width}-${theme}-${engine.name()}.png`})
  await page.goto(base+'/mentra-miniapps#cs-permissions');await expect(page.locator('#cs-developer')).toBeVisible()
  results.push({slug:'mentra-miniapps',engine:engine.name(),width,theme,status:'pass'})
  await page.goto(base+'/executivelens');const sources=page.locator('.cs-screen-explorer');await sources.getByRole('button',{name:/Separate notes from permission/}).click();await expect(sources.locator('.screen-decision')).toContainText('permission boundary');await original(sources.locator('img'))
  await page.locator('.cs-expand-preview-btn').click();await page.getByRole('button',{name:'Show complete meeting',exact:true}).click();await page.getByRole('button',{name:'Check approval and owner · 15s',exact:true}).click();await expect(page.locator('.project-meeting-source-excerpt')).toContainText('Priya')
  await page.getByRole('button',{name:'Reset replay',exact:true}).click();await expect(page.getByRole('slider',{name:'Meeting position',exact:true})).toHaveValue('0');await overflow();await page.screenshot({path:`${out}/executivelens-${width}-${theme}-${engine.name()}.png`})
  assert.equal(await page.locator('main [id]').evaluateAll(nodes=>{const ids=nodes.map(n=>n.id);return ids.length-new Set(ids).size}),0,'no duplicate chapter anchors')
  results.push({slug:'executivelens',engine:engine.name(),width,theme,status:'pass'})
  assert.deepEqual(errors,[])
 } catch(error) {failures.push({engine:engine.name(),width,theme,error:String(error)});await page.screenshot({path:`${out}/FAIL-${width}-${theme}-${engine.name()}.png`}).catch(()=>{})}
 await context.close();await browser.close()
}
writeFileSync(`${out}/report.json`,JSON.stringify({results,failures},null,2));console.log(JSON.stringify({passed:results.length,failures},null,2));assert.deepEqual(failures,[])
