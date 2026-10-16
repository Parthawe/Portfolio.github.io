import assert from 'node:assert/strict'
import {chromium,webkit,expect} from '@playwright/test'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5222',out=process.env.QA_OUTPUT_DIR||'/tmp/reading-quality-qa'
mkdirSync(out,{recursive:true});const results=[]
for(const [engine,width,theme] of [[chromium,1440,'light'],[chromium,390,'dark'],[chromium,320,'light'],[webkit,390,'dark']]){
 const browser=await engine.launch(),context=await browser.newContext({viewport:{width,height:960},hasTouch:width<500,reducedMotion:'reduce'}),errors=[]
 let page=await context.newPage()
 await context.addInitScript(t=>{localStorage.setItem('theme',t);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme);page.on('pageerror',e=>errors.push(e.message))
 for(const [slug,anchor] of [['glassly','glassly-hardware'],['clawed-chat','cs-webhub']]){
  await page.goto(`${base}/${slug}#${anchor}`);await expect(page.locator('.project-story__content')).toBeVisible()
  await page.getByRole('button',{name:'Quick read',exact:true}).click();await expect(page.locator('.project-story__content')).toBeHidden();await expect(page.getByRole('button',{name:'Quick read',exact:true})).toHaveAttribute('aria-pressed','true')
  if(slug==='clawed-chat')await page.getByRole('link',{name:'Inspect the setup choices',exact:true}).click()
  else await page.getByRole('button',{name:'Full story',exact:true}).click()
  await expect(page.locator('.project-story__content')).toBeVisible();await expect(page.getByRole('button',{name:'Full story',exact:true})).toHaveAttribute('aria-pressed','true')
  await page.locator('#'+anchor).scrollIntoViewIfNeeded();await page.getByRole('button',{name:slug==='glassly'?'Quick overview':'2 min summary',exact:true}).click();await expect(page.locator('.project-story__content')).toBeHidden()
  await page.locator('.cs-expand-preview-btn').click();await expect(page.locator('.project-story__content')).toBeVisible()
  results.push({task:'chapter, quick/full reading and reopen',slug,width,engine:engine.name(),status:'pass'})
 }
 await page.close();page=await context.newPage();page.on('pageerror',e=>errors.push(e.message))
 let block=true;await page.route('**/Clawed.chat/deploy-options.webp',r=>block?r.abort():r.continue())
 await page.goto(`${base}/clawed-chat#cs-webhub`);const explorer=page.locator('#cs-webhub .cs-screen-explorer');await explorer.scrollIntoViewIfNeeded();const retry=explorer.getByRole('button',{name:'Retry image',exact:true});await expect(retry).toBeVisible();await retry.press('Enter');await expect(retry).toBeFocused();block=false;await retry.press('Enter');await expect(explorer.locator('img')).toBeFocused();await explorer.locator('img').press('Enter');await expect(page.getByRole('dialog',{name:'Image preview',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(explorer.locator('img')).toBeFocused();await page.unroute('**/Clawed.chat/deploy-options.webp')
 assert.equal(await explorer.locator('img').getAttribute('loading'),'lazy');results.push({task:'image retry twice, focus recovery and enlargement',slug:'clawed-chat',width,engine:engine.name(),status:'pass'})
 let failedBoard=true;await page.route('**/HealthApp/optimized/01-planning.webp',r=>failedBoard?r.abort():r.continue());await page.goto(`${base}/healthapp#cs-healthapp-archive`);await page.getByText('Inspect the brief and existing Google Tasks references',{exact:true}).click();const reader=page.getByRole('region',{name:'Health App source boards reader',exact:true}),v=reader.locator(':scope > .cs-report-reader__viewport');await v.scrollIntoViewIfNeeded();const boardRetry=reader.locator(':scope > .cs-report-reader__viewport').getByRole('button',{name:'Retry image',exact:true});await expect(boardRetry).toBeVisible();await boardRetry.press('Enter');await expect(boardRetry).toBeFocused();failedBoard=false;await boardRetry.press('Enter');await expect(v.locator('img')).toBeFocused();await page.unroute('**/HealthApp/optimized/01-planning.webp')
 for(const control of await reader.locator(':scope > .evidence-controls button:visible, :scope > .evidence-controls select:visible').all())assert(await control.evaluate(n=>{const r=n.getBoundingClientRect();return r.height>=44&&r.width>=44}),'report touch control at least 44px')
 const zoom=reader.locator(':scope > .evidence-controls').getByRole('button',{name:'Zoom in',exact:true});for(let i=0;i<8;i++)await zoom.click();await expect(zoom).toBeDisabled();await expect(reader.locator(':scope > .evidence-controls output')).toHaveText('300%');await v.focus();await v.press('End');await expect.poll(()=>v.evaluate(n=>n.scrollTop)).toBeGreaterThan(0);await v.press('Home');await expect.poll(()=>v.evaluate(n=>n.scrollTop)).toBeLessThan(1)
 await reader.getByRole('button',{name:'Fullscreen reader',exact:true}).click();const dialog=page.getByRole('dialog',{name:'Health App source boards fullscreen reader',exact:true});await expect(dialog).toBeVisible();await page.getByLabel('Fullscreen report chapter',{exact:true}).selectOption('1');await expect(dialog.locator('output')).toHaveText('100%');await page.keyboard.press('Escape');await expect(reader.getByRole('button',{name:'Fullscreen reader',exact:true})).toBeFocused();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.deepEqual(errors,[])
 await reader.scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/reader-${width}-${theme}-${engine.name()}.png`});results.push({task:'report failure recovery, touch targets, zoom bounds, keyboard scroll, chapter/reset and focus',slug:'healthapp',width,engine:engine.name(),status:'pass'})
 await context.close();await browser.close()
}
writeFileSync(`${out}/report.json`,JSON.stringify({results},null,2));console.log(`Passed ${results.length} reading and recovery checks across Chromium and WebKit.`)
