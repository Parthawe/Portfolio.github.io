import {chromium,webkit,expect} from '@playwright/test'
import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5202',out=process.env.QA_OUTPUT_DIR||'/tmp/portfolio-glassly-qa'
mkdirSync(out,{recursive:true})
const browser=await (process.env.QA_BROWSER === 'webkit' ? webkit : chromium).launch(),errors=[],results=[]
try{
 for(const [width,height,theme] of [[1440,1000,'light'],[1440,1000,'dark'],[390,844,'light'],[320,740,'dark']]){
  const context=await browser.newContext({viewport:{width,height},hasTouch:width<500,reducedMotion:'reduce'}),page=await context.newPage()
  await page.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
  page.on('pageerror',error=>errors.push(error.message))
  const demoRequests=[];page.on('request',request=>{if(request.url().includes('/Glassly/demo/'))demoRequests.push(request.url())})
  await page.goto(`${base}/glassly`)
  await expect(page.getByRole('heading',{name:'Glassly',exact:true})).toBeVisible()
  await expect(page.locator('.glassly-case-section')).toHaveCount(0);assert.equal(demoRequests.length,0)
  await page.getByRole('button',{name:'Read the full case study',exact:true}).click()
  await expect(page.locator('#glassly-product')).toBeVisible();assert.equal(demoRequests.length,0,'Demo is on request')
  for(const image of await page.locator('.glassly-case-section .cs-img-full img').all()){
   await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true)
   assert(await image.evaluate(img=>{const box=img.getBoundingClientRect();return Math.abs(box.width/box.height-img.naturalWidth/img.naturalHeight)<.01}),'Image remains uncropped')
  }
  await page.getByRole('button',{name:'Load original demo',exact:true}).click()
  await expect(page.getByRole('button',{name:'Close demo',exact:true})).toBeVisible()
  const frame=page.frameLocator('iframe[title="Original Glassly phone and glasses demo"]')
  for(const scene of ['home','captions','navigation','notifications','assist','terminal']){
   const control=frame.getByRole('button',{name:`Show ${scene} demo`,exact:true});if(width<500)await control.tap();else await control.click()
   await expect(frame.locator('#demo')).toHaveAttribute('data-scene',scene)
   await expect(frame.locator('#demo')).toHaveAttribute('data-playing','false')
  }
  await frame.getByRole('button',{name:'Show captions demo',exact:true}).click()
  await frame.getByRole('button',{name:'Expand glasses mirror',exact:true}).click()
  await expect(frame.getByRole('dialog')).toBeVisible()
  await frame.getByRole('button',{name:'Close glasses mirror',exact:true}).press('Escape')
  await expect(frame.getByRole('dialog')).not.toBeVisible()
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Case study fits')
  assert(await page.locator('iframe').evaluate(el=>el.contentDocument.documentElement.scrollWidth<=el.clientWidth+1),'Original demo fits')
  await page.locator('iframe').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/demo-${width}-${theme}.png`})
  await page.getByRole('button',{name:'Close demo',exact:true}).click();await expect(page.locator('iframe')).toHaveCount(0)
  await expect(page.getByRole('button',{name:'Load original demo',exact:true})).toBeFocused()
  await page.locator('#glassly-brand').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/brand-${width}-${theme}.png`})
  for(const route of ['ai','ai-wearables']){await page.goto(`${base}/${route}`);await expect(page.locator('a[href="/glassly"]').first()).toBeVisible()}
  await page.goto(`${base}/work`);const links=page.locator('.work-projects a[href="/glassly"], a.project-card[href="/glassly"]');await expect(page.locator('a[href="/glassly"]').first()).toBeVisible()
  results.push({width,theme,scenes:6});await context.close()
 }
 const context=await browser.newContext(),page=await context.newPage()
 await page.route('**/Glassly/demo/assets/*.js',route=>route.abort());await page.goto(`${base}/glassly/#glassly-demo`)
 await page.getByRole('button',{name:'Load original demo',exact:true}).click();await expect(page.getByRole('button',{name:'Retry original demo',exact:true})).toBeVisible({timeout:20000})
 await page.unroute('**/Glassly/demo/assets/*.js');await page.getByRole('button',{name:'Retry original demo',exact:true}).click();await expect(page.getByRole('button',{name:'Close demo',exact:true})).toBeVisible()
 for(const suffix of ['world','prototype']){await page.goto(`${base}/glassly/${suffix}`);await expect(page).toHaveURL(`${base}/glassly`)}
 await context.close();assert.equal(errors.length,0,JSON.stringify(errors));console.log('Passed Glassly: original imagery, six demo scenes, mirror/Escape, unload/retry, themes, mobile/touch, wearables discovery and legacy redirects.')
}finally{await browser.close();writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2))}
