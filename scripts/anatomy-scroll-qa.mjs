import assert from 'node:assert/strict'
import { mkdirSync,writeFileSync } from 'node:fs'
import {chromium,webkit,expect} from '@playwright/test'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',out='/tmp/anatomy-scroll-qa'
mkdirSync(out,{recursive:true});const results=[],errors=[]
for(const [engine,name,width] of [[chromium,'desktop',1440],[chromium,'touch',390],[webkit,'webkit',390]]){
 const browser=await engine.launch()
 try{for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width,height:1000},hasTouch:width===390,isMobile:width===390,recordVideo:name==='desktop'&&theme==='light'?{dir:`${out}/video`}:undefined})
  await context.addInitScript(t=>{localStorage.setItem('theme',t);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message))
  for(const [slug,hash] of [['revolving-stage','cs-stage-story'],['jugalbandi','cs-harp-story']]){
   await page.goto(`${base}/${slug}`)
   assert.equal(await page.locator('.mechanism-story').count(),0,'collapsed story stays unloaded')
   assert(!(await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name))).some(r=>/\/(StageStory|HarpStory)-/.test(r)),'no diagram chunk before expansion')
   await page.goto(`${base}/${slug}#${hash}`)
   const story=page.locator(`#${hash} .mechanism-story`);await expect(story).toBeVisible({timeout:20000})
   await expect(story).toHaveAttribute('data-following','true')
   const moving=story.locator(slug==='revolving-stage'?'[data-assembly="deck"]':'[data-story-horn="horn-2"]').first()
   const nav=story.locator('nav button')
   if(width===390)await nav.nth(0).tap();else await nav.nth(0).click();const first=await moving.getAttribute('transform')
   await nav.nth(1).focus();await page.keyboard.press('Enter');await expect(story).toHaveAttribute('data-following','false')
   await expect(nav.nth(1)).toHaveAttribute('aria-current','step')
   if(slug==='jugalbandi')assert.notEqual(await moving.getAttribute('transform'),first)
   await story.locator('.mechanism-story__drawing').screenshot({path:`${out}/${slug}-${name}-${theme}-detail.png`})
   await nav.nth(3).click();if(slug==='revolving-stage')assert.notEqual(await moving.getAttribute('transform'),first)
   await page.locator(`#${hash}`).scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${slug}-${name}-${theme}.png`})
   const held=await moving.getAttribute('transform');await story.locator('[data-story-step="2"]').scrollIntoViewIfNeeded();await page.waitForTimeout(100);assert.equal(await moving.getAttribute('transform'),held,'manual mode holds while scrolling')
   await story.getByRole('button',{name:'Follow scrolling',exact:true}).click()
   await story.locator('[data-story-step="3"]').evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top-innerHeight*.3,behavior:'instant'}))
   await expect(nav.nth(3)).toHaveAttribute('aria-current','step')
   await story.locator('[data-story-step="0"]').evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top-innerHeight*.75,behavior:'instant'}))
   await expect(nav.nth(0)).toHaveAttribute('aria-current','step')
   await page.evaluate(()=>{window.__storyMutations=0;window.__storyObserver=new MutationObserver(r=>window.__storyMutations+=r.length);window.__storyObserver.observe(document.querySelector('.mechanism-story svg'),{attributes:true,subtree:true})})
   await page.waitForTimeout(200);await page.evaluate(()=>window.__storyMutations=0);await page.waitForTimeout(450);assert.equal(await page.evaluate(()=>window.__storyMutations),0,'no idle drawing mutations')
   await page.evaluate(()=>window.__storyObserver.disconnect())
   await page.emulateMedia({reducedMotion:'reduce'});await expect(story).toHaveAttribute('data-following','false')
   await expect(story.getByRole('button',{name:'Reduced motion · step controls'})).toBeDisabled()
   await nav.nth(2).click();await expect(nav.nth(2)).toHaveAttribute('aria-current','step')
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow')
   assert.equal(await story.locator('canvas,video,audio').count(),0)
   await page.emulateMedia({reducedMotion:'no-preference'})
   results.push({slug,name,theme,status:'passed'})
  }
  const video=page.video();await context.close();if(video)await video.saveAs(`${out}/interaction.webm`)
 }}finally{await browser.close()}
}
assert.deepEqual(errors,[]);writeFileSync(`${out}/results.json`,JSON.stringify({results,errors},null,2));console.log(`Passed ${results.length} scroll-story profiles.`)
