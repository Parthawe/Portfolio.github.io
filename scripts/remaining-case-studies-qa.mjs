import { chromium, webkit, expect } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211'
const out=process.env.QA_OUTPUT_DIR||'/tmp/remaining-case-studies/qa'
mkdirSync(out,{recursive:true})
const allSlugs=['the-omakase','ibm','shuffle','enigma','cuetv','the-point-cdc','ai-voice','medimorpho','mentra-brand','black-hole','making-of-time','code-for-build','sea-of-salt','dumb-waiter-set-design','drowning','revolving-stage','tedx','typeface','sculpture','vishwaconclave','glassly']
const slugs=process.env.QA_SLUGS?process.env.QA_SLUGS.split(','):allSlugs
const results=[],failures=[]
const profiles=[[chromium,1440,'light'],[chromium,390,'dark'],[webkit,390,'light'],[chromium,1440,'dark']]
for(const [engine,width,theme] of profiles){
 const browser=await engine.launch(),context=await browser.newContext({viewport:{width,height:1000},hasTouch:width<500,reducedMotion:'reduce',recordVideo:{dir:out,size:{width:Math.min(width,1000),height:800}}}),page=await context.newPage()
 await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
 const errors=[];page.on('pageerror',e=>errors.push(e.message))
 for(const slug of slugs){
  try{
   errors.length=0;await page.goto(`${base}/${slug}`);await page.locator('main h1').first().waitFor();await page.locator('.page-loader').waitFor({state:'hidden'});await page.evaluate(()=>document.fonts.ready)
   const expand=page.locator('.cs-expand-preview-btn').first();if(await expand.isVisible())await expand.click()
   await page.waitForTimeout(350)
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),`${slug}: no page overflow`)
   const broken=await page.locator('main img').evaluateAll(images=>images.filter(img=>img.complete&&img.naturalWidth===0&&getComputedStyle(img).display!=='none').map(img=>img.getAttribute('src')))
   assert.deepEqual(broken,[],`${slug}: source images`)
   const back=page.locator('main a').filter({hasText:/^Back to work$/i}).first();assert(await back.count(),`${slug}: direct visit returns to Work`)
   if(['cuetv','medimorpho'].includes(slug)){assert.equal(await page.locator('input[type=password]').count(),0);assert.equal(await page.locator('main a[href*="research/"]').count(),0);await page.locator('.nda-request-disclosure > summary').click();await expect(page.getByRole('form',{name:'Request case study access'})).toBeVisible()}
   if(slug==='the-omakase'){
    await page.locator('.om-arcade').scrollIntoViewIfNeeded();const circles=await page.locator('.om-keys kbd').evaluateAll(nodes=>nodes.map(node=>{const r=node.getBoundingClientRect();return Math.abs(r.width-r.height)}));assert(circles.length===16&&circles.every(n=>n<1),'16 circular controls');assert.equal(await page.locator('.om-screen iframe').count(),0)
   }
   if(slug==='typeface'){
    const input=page.getByRole('textbox',{name:'Specimen text'});await input.fill('A slice of typography 0123456789');await expect(page.locator('.tf-specimen-word')).toHaveText('A slice of typography 0123456789');await expect(page.locator('.tf-font-status')).toContainText('original font loaded');for(const name of ['Ultralight','Bold','Regular']){await page.locator('.tf-specimen-toolbar').getByRole('button',{name,exact:true}).click();await expect(page.locator('.tf-font-status')).toContainText(name)}
   }
   if(slug==='code-for-build'){
    await page.locator('main > section.wrap').first().scrollIntoViewIfNeeded();const lesson=page.getByRole('region',{name:'Building blocks lesson'});await lesson.scrollIntoViewIfNeeded();await lesson.getByRole('button',{name:'Container · on'}).click();await expect(lesson.locator('.code-block-preview')).toContainText('Add the container');await lesson.getByRole('button',{name:'Reset blocks'}).click();await lesson.getByRole('button',{name:'Try the action',exact:true}).click();await expect(lesson.getByRole('status')).toContainText('activated');assert.equal(await lesson.locator('svg [data-block]').count(),6);assert(await lesson.locator('svg').evaluate(svg=>{const box=svg.getBBox(),view=svg.viewBox.baseVal;return box.x>=view.x&&box.y>=view.y&&box.x+box.width<=view.x+view.width&&box.y+box.height<=view.y+view.height}),'block geometry fits its viewBox');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'loaded lesson fits the page')
   }
   if(slug==='vishwaconclave'){
    const reader=page.getByRole('region',{name:'VishwaConclave edition archive reader'});await reader.scrollIntoViewIfNeeded();await reader.getByRole('combobox',{name:'Report chapter',exact:true}).selectOption('2');await expect(reader.getByRole('link',{name:'Open selected original board'})).toHaveAttribute('href',/5.webp$/);await reader.getByRole('button',{name:'Fullscreen reader'}).click();await expect(page.getByRole('dialog',{name:'VishwaConclave edition archive fullscreen reader'})).toBeVisible();await page.keyboard.press('Escape')
   }
   if(slug==='revolving-stage'){
    await expect(page.getByText('Apoorva Joglikar',{exact:true})).toBeVisible();const credit=page.getByText('Apoorva Joglikar',{exact:true});await credit.scrollIntoViewIfNeeded();assert.equal(await credit.evaluate(n=>getComputedStyle(n.closest('.cs-credit-item')).opacity),'1')
   }
   const target=page.locator(slug==='the-omakase'?'.om-arcade':slug==='typeface'?'.tf-specimen-section':slug==='vishwaconclave'?'.cs-report-reader':slug==='code-for-build'?'.code-block-study':'main h1').first();await target.scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${engine.name()}-${width}-${theme}-${slug}.png`})
   assert.deepEqual(errors,[],`${slug}: browser errors`);results.push({engine:engine.name(),width,theme,slug,passed:true})
  }catch(error){failures.push({engine:engine.name(),width,theme,slug,error:String(error)});await page.screenshot({path:`${out}/FAIL-${engine.name()}-${width}-${slug}.png`}).catch(()=>{})}
 }
 await context.close();await browser.close()
}
writeFileSync(`${out}/routes.json`,JSON.stringify({results,failures},null,2));console.log(JSON.stringify({passed:results.length,failures},null,2));assert.equal(failures.length,0)
