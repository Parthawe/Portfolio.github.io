import {chromium,webkit,expect} from '@playwright/test'
import {mkdirSync,writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',out='docs/reviews/experience-navigation';mkdirSync(out,{recursive:true});const results=[]
for(const engine of [chromium,webkit])for(const width of[1440,390]){
 const browser=await engine.launch(),page=await browser.newPage({viewport:{width,height:1000},hasTouch:width===390,reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message))
 try{
  await page.goto(base+'/work');await page.locator('.work-room-link').click();await expect(page).toHaveURL(base+'/experience-preview');await expect(page.getByRole('heading',{level:1,name:'Project experiences',exact:true})).toBeVisible();await expect(page.locator('#nav')).toHaveCount(1);await expect(page.locator('footer.footer')).toHaveCount(1);await expect(page.locator('.experience-review-card')).toHaveCount(20);await expect(page.locator('.experience-review-card[href="/shuffle/simulation"]')).toHaveCount(1);await expect(page.locator('.experience-review-card[href="/experience-preview/the-omakase"]')).toHaveCount(1)
  for(const theme of['light','dark']){
   const target=page.getByRole('button',{name:`Switch to ${theme} mode`,exact:true});if(await target.count())await target.click();await page.evaluate(()=>scrollTo(0,0));assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:`${out}/${engine.name()}-${width}-${theme}.png`})
  }
  if(width===390){await page.getByRole('button',{name:'Open menu',exact:true}).click();await expect(page.getByRole('button',{name:'Close menu',exact:true})).toHaveAttribute('aria-expanded','true');await page.getByRole('button',{name:'Close site navigation',exact:true}).click()}
  await page.locator('.experience-review-collections').getByRole('link',{name:'Work',exact:true}).click();await expect(page).toHaveURL(base+'/work');await page.locator('.work-room-link').click();await expect(page.getByRole('heading',{level:1,name:'Project experiences',exact:true})).toBeVisible()
  for(const alias of['/project-experiences?kind=games','/physical-worlds?kind=games']){await page.goto(base+alias);await expect(page).toHaveURL(base+'/experience-preview?kind=games');await expect(page.locator('.experience-review-card')).toHaveCount(2)}
  assert.deepEqual(errors,[]);results.push({browser:engine.name(),width,workRoundTrip:true,sharedNav:true,sharedFooter:true,themes:true,aliases:true,approvedAndDraftLinks:true,errors})
 }finally{await browser.close()}
}
writeFileSync(out+'/report.json',JSON.stringify(results,null,2));console.log(results)
