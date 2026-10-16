import {chromium,webkit,expect} from '@playwright/test'
import assert from 'node:assert/strict'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211'
for(const engine of [chromium,webkit]){const browser=await engine.launch(),page=await browser.newPage({viewport:{width:1024,height:900},reducedMotion:'reduce'});try{
 await page.goto(base+'/shuffle');await page.getByRole('link',{name:'Redistribute your time',exact:true}).first().click();await expect(page).toHaveURL(/\/shuffle#cs-interactive$/);await expect(page.locator('#cs-interactive')).toBeVisible();await expect(page.locator('#cs-interactive')).toBeInViewport();assert.equal(new URL(page.url()).pathname,'/shuffle')
 await page.goto(base+'/ux-research');const card=page.locator('a[href="/medimorpho"]').first();await card.scrollIntoViewIfNeeded();await card.click();await expect(page.getByRole('link',{name:'Back to UX research',exact:true}).first()).toBeVisible();await page.getByRole('link',{name:'Next Quick Glimpse'}).count().catch(()=>0);const next=page.locator('a.next-project');await next.click();await expect(page.getByRole('link',{name:'Back to UX research',exact:true}).first()).toBeVisible();await page.goBack();await expect(page.getByRole('link',{name:'Back to UX research',exact:true}).first()).toBeVisible();await page.reload();await expect(page.getByRole('link',{name:'Back to work',exact:true}).first()).toBeVisible()
 await page.goto(base+'/ai-wearables');await page.locator('a[href="/mentra"]').first().click();await expect(page.getByRole('link',{name:'Back to AI wearables',exact:true}).first()).toBeVisible()
 console.log(engine.name()+': same-page Shuffle CTA; collection context, next project, history and direct reload passed.')
 }finally{await browser.close()}}
