import {chromium,webkit,expect} from '@playwright/test'
import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',out='/tmp/experience-directory-qa';mkdirSync(out,{recursive:true});const results=[],errors=[]
for(const [engine,name,width] of [[chromium,'desktop',1440],[chromium,'mobile',390],[webkit,'webkit',390]]){
const browser=await engine.launch();try{for(const theme of ['light','dark']){
 const p=await browser.newPage({viewport:{width,height:1000},hasTouch:width===390,isMobile:width===390});await p.addInitScript(t=>localStorage.setItem('theme',t),theme);p.on('pageerror',e=>errors.push(e.message));await p.goto(`${base}/experience-preview`)
 const cards=p.locator('.experience-review-card');await expect(cards).toHaveCount(18)
 for(const img of await cards.locator('img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true)}
 assert.equal(new Set(await cards.evaluateAll(a=>a.map(x=>x.getAttribute('href')))).size,18)
 await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:`${out}/${name}-${theme}.png`})
 await p.getByRole('button',{name:/3D objects/}).click();await expect(cards).toHaveCount(3)
 await p.getByRole('button',{name:/Anatomy/}).click();await expect(cards).toHaveCount(2)
 await p.getByRole('button',{name:/Interfaces/}).click();await expect(cards).toHaveCount(10)
 await p.getByRole('button',{name:/Listen/}).click();await expect(cards).toHaveCount(1)
 await p.getByRole('button',{name:/All experiences/}).click();await expect(cards).toHaveCount(18);await p.getByRole('searchbox').fill('take apart');await expect(cards).toHaveCount(1)
 await p.getByRole('searchbox').fill('no-such-project');await expect(p.getByRole('heading',{name:'No matching experiences'})).toBeVisible()
 await p.getByRole('button',{name:'Show all experiences'}).click();await expect(cards).toHaveCount(18)
 await p.getByRole('searchbox').fill('Butler');await cards.first().focus();await p.keyboard.press('Enter');await expect(p).toHaveURL(/experience-preview\/typeface/);await expect(p.locator('[data-glyph-outline]')).toBeVisible({timeout:20000})
 await p.goBack();await expect(p.getByRole('heading',{name:'Try the work.'})).toBeVisible();assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1))
 results.push({name,theme,status:'passed'});await p.close()
}}finally{await browser.close()}}
const b=await chromium.launch(),p=await b.newPage();await p.route('**/Assets/**',r=>r.abort());await p.goto(`${base}/experience-preview`);await expect(p.locator('.experience-review-card').first()).toContainText('Project preview unavailable');await expect(p.locator('.experience-review-card').first()).toContainText('Shape a letter');await b.close()
assert.deepEqual(errors,[]);writeFileSync(`${out}/results.json`,JSON.stringify({results,errors},null,2));console.log('Passed six directory profiles and missing-image recovery.')
