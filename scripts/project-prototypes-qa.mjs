import assert from 'node:assert/strict'
import { chromium, expect } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5197'
const out = '/tmp/portfolio-prototypes-qa'
mkdirSync(out, {recursive:true})
const browser = await chromium.launch()
const results=[], errors=[]
const slugs=['mentra','mentra-miniapps','clawed-chat','executivelens','org-dashboard','healthapp','ballah-code','vj-software','code-for-build','raahi-project']
try {
for(const profile of [{name:'desktop',width:1185,height:969,theme:'light'},{name:'mobile',width:375,height:812,theme:'dark'}]) {
const context=await browser.newContext({viewport:profile,reducedMotion:'reduce'})
await context.addInitScript(theme=>{if(window.top===window)localStorage.setItem('theme',theme)},profile.theme)
const page=await context.newPage()
// Verify host CSP and frame rendering without depending on Figma authentication or uptime.
await page.route('https://www.figma.com/embed?*',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><p>Figma embed test</p>'}))
page.on('pageerror',e=>errors.push(e.message))
for(const slug of slugs) {
 await page.goto(`${base}/${slug}/prototype`,{waitUntil:'domcontentloaded'})
 const app=page.locator('[data-prototype]')
 await expect(app).toHaveAttribute('data-prototype-theme',profile.theme)
 assert.equal(await app.locator('canvas').count(),0)
 const button=name=>app.getByRole('button',{name,exact:true})
 if(slug==='mentra') { assert.equal(await app.locator('video').count(),1); await button('Load interactive Figma prototype').click(); await expect(app.locator('iframe')).toHaveAttribute('src',/figma.com\/embed/);await expect(page.frameLocator('iframe[title="Original Mentra onboarding Figma prototype"]').getByText('Figma embed test',{exact:true})).toBeVisible(); }
 if(slug==='mentra-miniapps') {await button('Notes Open app →').click(); await expect(button('Launch Notes')).toBeDisabled(); await app.getByRole('checkbox').check(); await button('Launch Notes').click();await app.getByLabel('Add a note').fill('Prototype test note');await button('Save note').click();await expect(app.locator('li')).toHaveText('Prototype test note')}
 if(slug==='clawed-chat') {await app.getByLabel('Draft reply').fill('Edited sample reply');await button('Approve draft').click();await expect(app.locator('dd').nth(2)).toHaveText('Edited sample reply');await expect(app).toContainText('No message sent.')}
 if(slug==='executivelens') {await button('Show complete meeting').click();await button('Check approval and owner · 15s').click();await expect(app.locator('[data-source="true"]')).toContainText('Priya owns')}
 if(slug==='org-dashboard') {await app.getByLabel('Search knowledge').fill('nonexistent');await expect(app).toContainText('No matching records');await button('Action queue').click();await button('Approve change').click();await expect(app).toContainText('Approved in the demo')}
 if(slug==='healthapp') {await app.getByLabel('Today’s capacity').selectOption('Lighter');await button('Apply proposed plan').click();await expect(app.locator('.prototype-task-list li')).toHaveCount(4);await app.getByRole('checkbox').first().check();await expect(app).toContainText('1 tasks checked')}
 if(slug==='ballah-code') {await button('Propose accessible label').click();await button('Apply proposed change').click();await expect(app.getByLabel('Component source')).toHaveValue(/aria-label="Greeting"/)}
 if(slug==='vj-software') {await expect(button('Review booking')).toBeDisabled();await button('02').click();await button('Review booking').click();await button('Confirm sample booking').click();await expect(app).toContainText('No real space was booked')}
 if(slug==='code-for-build') {await expect(page.frameLocator('iframe[title="Your generated page"]').getByRole('heading',{name:'Your first page',exact:true})).toBeVisible();await button('Add button').click();await button('Code').click();await expect(app.getByLabel('Generated HTML')).toContainText('<button>Continue</button>');await button('Output').click();await expect(page.frameLocator('iframe[title="Your generated page"]').getByRole('button',{name:'Continue',exact:true})).toBeVisible()}
 if(slug==='raahi-project') {await app.getByLabel('Destination').selectOption('Work');await button('Plan sample journey').click();await button('Complete this leg').click();await expect(app.getByRole('status')).toContainText('Leg 2 of 3');await button('Complete this leg').click();await expect(app.getByRole('status')).toContainText('Leg 3 of 3');await button('Finish journey').click();await expect(app).toContainText('completed the sample journey')}
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${slug} overflow`)
 await page.screenshot({path:`${out}/${profile.name}-${slug}.png`,fullPage:true})
 await page.getByRole('button',{name:'Restart prototype',exact:true}).click()
 await page.getByRole('button',{name:/Switch to .* mode/}).click()
 await expect(app).toHaveAttribute('data-prototype-theme',profile.theme==='dark'?'light':'dark')
 await page.getByRole('button',{name:/Switch to .* mode/}).click()
 await page.goto(`${base}/${slug}/world`,{waitUntil:'domcontentloaded'})
 await expect(page).toHaveURL(`${base}/${slug}/prototype`)
 results.push(`${profile.name} ${slug}`); console.log(results.at(-1))
}
for (const [slug, target] of [['transfi-project','transfi-project#case-study-access-transfi-project'],['zentipay','zentipay#case-study-access-zentipay'],['cuetv','cuetv#case-study-access-cuetv'],['ai-voice','ai-voice#case-study-access-ai-voice'],['medimorpho','medimorpho'],['ibm','ibm'],['office-of-diversity','office-of-diversity#cs-report'],['the-point-cdc','the-point-cdc']]) {
 await page.goto(`${base}/${slug}/world`,{waitUntil:'domcontentloaded'})
 await expect(page).toHaveURL(`${base}/${target}`)
 if(target.includes('case-study-access')) await expect(page.locator(`[id="${target.split('#')[1]}"]`)).toBeVisible()
}
await page.goto(`${base}/missing-project/prototype`,{waitUntil:'domcontentloaded'})
await expect(page).toHaveURL(`${base}/404`)
await context.close()
}
} finally {await browser.close();writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2))}
assert.equal(errors.length,0)
console.log(`Passed ${results.length} prototype flows, both themes, legacy redirects and responsive layouts.`)
