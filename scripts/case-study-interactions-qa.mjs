import {chromium, expect} from '@playwright/test'
import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5201',out=process.env.QA_OUTPUT||'/tmp/case-study-interactions';mkdirSync(out,{recursive:true})
const browser=await chromium.launch(),results=[]
for(const width of [1440,390])for(const theme of ['light','dark']){
 const context=await browser.newContext({viewport:{width,height:1000},hasTouch:width===390,reducedMotion:'reduce',recordVideo:{dir:out,size:{width:Math.min(width,1280),height:1000}}})
 await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
 const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message))
 const go=async slug=>{await p.goto(`${base}/${slug}`);await p.locator('main h1').first().waitFor();await p.locator('.page-loader').waitFor({state:'hidden'});const expand=p.locator('.cs-expand-preview-btn');if(await expand.count())await expand.first().click()}
 await go('mentra-miniapps')
 for(const explorer of await p.locator('.cs-screen-explorer').all()){
  for(const button of await explorer.locator('.cs-screen-explorer__choices button').all()){
   await button.focus();await p.keyboard.press('Enter');assert.equal(await button.getAttribute('aria-pressed'),'true')
   const img=explorer.locator('img');await img.evaluate(i=>i.decode());await expect(explorer.locator('[aria-busy]')).toHaveAttribute('aria-busy','false')
   await img.focus();await p.keyboard.press('Enter');await p.getByRole('dialog',{name:'Image preview'}).waitFor();
   assert.equal(await p.locator('.lightbox-overlay img').getAttribute('src'),await img.getAttribute('data-original-src'))
   await p.keyboard.press('Escape');assert(await img.evaluate(i=>document.activeElement===i),'Focus restored after zoom')
  }
 }
 await p.locator('.cs-screen-explorer').first().scrollIntoViewIfNeeded();await p.screenshot({path:`${out}/miniapps-${width}-${theme}.png`})
 await go('drowning');const board=p.locator('.cs-screen-explorer');for(const button of await board.locator('.cs-screen-explorer__choices button').all()){await button.click();await board.locator('img').evaluate(i=>i.decode());assert.equal(await button.getAttribute('aria-pressed'),'true')}
 await go('revolving-stage');const assembly=p.locator('.stage-workshop .stage-anatomy');await assembly.waitFor();await assembly.scrollIntoViewIfNeeded();
 const slider=assembly.locator('input[type=range]');await slider.focus();await p.keyboard.press('Home');assert.equal(await slider.inputValue(),'0');await p.keyboard.press('ArrowRight');assert.equal(await slider.inputValue(),'1');await p.keyboard.press('End');assert.equal(await slider.inputValue(),'100')
 for(const button of await assembly.locator('.stage-anatomy__parts button').all()){await button.click();assert.equal(await button.getAttribute('aria-pressed'),'true')}
 await assembly.getByRole('button',{name:'Reset assembly'}).click();assert.equal(await slider.inputValue(),'100');assert.equal(await assembly.getByRole('button',{name:'Whole assembly'}).getAttribute('aria-pressed'),'true')
 // Snapshot with heading clear of the fixed navigation.
 await assembly.evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+scrollY-130));await p.screenshot({path:`${out}/stage-${width}-${theme}.png`})
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));assert.deepEqual(errors,[])
 results.push({width,theme,checks:['original image selection','keyboard image zoom and focus return','Drowning source boards','assembly keyboard range','part selection','reset','no overflow','no runtime errors']})
 const video=p.video();await context.close();await video.saveAs(`${out}/interaction-${width}-${theme}.webm`)
}
// Recovery: fail source and responsive image variants, then restore the network and retry.
const p=await browser.newPage();await p.route('**/Assets/**',r=>r.request().resourceType()==='image'?r.abort():r.continue());await p.goto(base+'/mentra-miniapps');await p.locator('.page-loader').waitFor({state:'hidden'});await p.locator('.cs-expand-preview-btn').click();const explorer=p.locator('.cs-screen-explorer').first();await explorer.getByRole('button',{name:'Retry image'}).waitFor();await p.unroute('**/Assets/**');await explorer.getByRole('button',{name:'Retry image'}).click();await explorer.locator('img').evaluate(i=>i.decode());assert(await explorer.locator('img').evaluate(i=>i.naturalWidth>0));results.push({recovery:'failed image successfully retried'});await p.close()
writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));await browser.close();console.log('PASS: four device/theme combinations, keyboard controls, source zoom, reset and image recovery')
