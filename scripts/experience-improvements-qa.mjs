import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
import {chromium,expect} from '@playwright/test'
import {readExperienceRegistry} from './project-experience-registry.mjs'
const base=process.env.QA_DEV_URL||'http://127.0.0.1:5201',out=process.env.QA_OUTPUT_DIR||'/tmp/portfolio-improvements/edges'
mkdirSync(out,{recursive:true})
const browser=await chromium.launch(),results=[],errors=[]
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',recordVideo:{dir:out}})
 await context.addInitScript(()=>{if(window.top===window)localStorage.setItem('portfolio-analytics-consent-v1','denied')})
 const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message))
 await page.goto(`${base}/experience-preview/healthapp`)
 const app=page.locator('[data-prototype]'),capacity=page.getByLabel('Today’s capacity')
 await capacity.selectOption('Lighter');await page.getByRole('button',{name:'Apply proposed plan'}).click();await expect(app.locator('.prototype-task-list li')).toHaveCount(4)
 await app.getByRole('checkbox').first().check();await capacity.selectOption('Full');await expect(app.locator('.prototype-task-list li')).toHaveCount(4);await expect(app.getByRole('checkbox').first()).toBeChecked()
 await page.getByRole('button',{name:'Apply proposed plan'}).click();await expect(app.locator('.prototype-task-list li')).toHaveCount(5);await page.getByRole('button',{name:'Undo plan change'}).click();await expect(app.locator('.prototype-task-list li')).toHaveCount(4)
 results.push('Health proposal does not alter the committed plan; approval/undo preserves checks')
 await page.goto(`${base}/experience-preview/ballah-code`)
 const source=page.getByLabel('Component source')
 await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByText('The form submitted. The button defaulted to submit.',{exact:true})).toBeVisible()
 await page.getByRole('button',{name:'Propose explicit button type'}).click();await source.focus();await source.press('End');await source.press('x');await expect(source).toBeFocused();await expect(page.getByRole('button',{name:'Apply proposed change'})).toHaveCount(0)
 await page.getByRole('button',{name:'Reset workspace'}).click();await page.getByRole('button',{name:'Propose explicit button type'}).click();await page.getByRole('button',{name:'Apply proposed change'}).click();await expect(source).toHaveValue(/type="button"/)
 await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByText('Continue clicked without submitting the form.',{exact:true})).toBeVisible()
 await page.getByRole('button',{name:'Undo applied change'}).click();await expect(source).not.toHaveValue(/type="button"/)
 await source.fill('export function Greeting(){return <><span aria-label="Other">Other</span><h1>Hello</h1></>}');const before=await source.inputValue();await page.getByRole('button',{name:'Propose explicit button type'}).click();await expect(source).toHaveValue(before);await expect(page.getByRole('button',{name:'Apply proposed change'})).toHaveCount(0)
 await page.getByRole('button',{name:'Reset workspace'}).click();await page.getByRole('button',{name:'Propose explicit button type'}).click();await page.getByRole('button',{name:'Apply proposed change'}).click();await source.fill(`${await source.inputValue()}\n// retained manual edit`);await expect(page.getByRole('button',{name:'Undo applied change'})).toHaveCount(0)
 results.push('Ballah real form consequence, reviewed patch, honest no-op, editing focus and undo safety')
 await page.goto(`${base}/experience-preview/clawed-chat`);await page.getByRole('button',{name:'Approve draft'}).click();await expect(page.getByRole('heading',{name:'Action receipts'})).toBeFocused();await expect(page.getByRole('status')).toContainText('Approval recorded');await page.getByRole('button',{name:'Withdraw local approval'}).click();await expect(page.getByLabel('Draft reply')).toBeEnabled()
 await page.goto(`${base}/experience-preview/mentra-miniapps`);await page.getByRole('button',{name:'Notes Open app →'}).click();await expect(page.getByRole('heading',{name:'Notes',exact:true})).toBeFocused();await page.getByRole('button',{name:'Back to apps'}).click();await page.getByRole('button',{name:'Guidance Inspect design →'}).click();await expect(page.locator('[data-prototype]')).toContainText('does not implement its device behavior')
 results.push('Clawed/MiniApps focus, persistent completion and honest archive behavior')
 await page.goto(`${base}/experience-preview/code-for-build`);await page.getByRole('slider',{name:'Padding',exact:true}).press('ArrowRight');await page.getByRole('button',{name:'Move block 2 up'}).click();await page.getByRole('button',{name:'Code',exact:true}).click();const generated=await page.getByLabel('Generated HTML').textContent();assert(generated.indexOf('<p>')<generated.indexOf('<h1>'));await page.getByRole('button',{name:'Undo block change'}).click();assert((await page.getByLabel('Generated HTML').textContent()).indexOf('<h1>')<(await page.getByLabel('Generated HTML').textContent()).indexOf('<p>'))
 results.push('Builder named range, keyboard operation and reversible block order')
 await page.setViewportSize({width:390,height:844});await page.goto(`${base}/experience-preview/typeface`);await expect(page.locator('[data-glyph-outline]')).toBeVisible();await page.getByRole('button',{name:'Inspector',exact:true}).click();const close=page.getByRole('button',{name:'Close point inspector'}),summary=page.getByRole('dialog').locator('summary')
 await close.press('Shift+Tab');await expect(summary).toBeFocused();await summary.press('Tab');await expect(close).toBeFocused();const weight=page.getByRole('dialog').getByLabel('Font weight');await weight.focus();await weight.selectOption({label:'Bold'});await expect(weight).toBeFocused();await expect(page.locator('[data-glyph-outline]')).toHaveAttribute('data-font','Bold');await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Inspector',exact:true})).toBeFocused()
 results.push('Mobile inspector trap, stable select focus and Escape restoration')
 await page.goto(`${base}/experience-preview/enigma`);await expect(page.locator('canvas')).toBeVisible();await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(page.locator('.world-readout')).toContainText('not a learned prediction');const buttons=page.getByRole('group',{name:'Camera view'}).getByRole('button'),positions=await buttons.evaluateAll(items=>items.map(item=>item.getBoundingClientRect().top));assert(Math.max(...positions)-Math.min(...positions)<2,'camera controls stay in one row')
 await page.goto(`${base}/experience-preview/jugalbandi`);await expect(page.locator('.ja-stage svg')).toBeVisible();await page.getByRole('button',{name:'Reset',exact:true}).click();await page.getByLabel('Servo position',{exact:true}).selectOption('2');await page.getByRole('button',{name:'Pluck selected string',exact:true}).click();await expect(page.locator('.ja-status')).toContainText('Servo 3 completed')
 results.push('Jugalbandi SVG mechanism resets and operates the selected servo')
 await page.close();await context.close()
 // Complement the task captures with the other desktop/mobile theme combinations.
 for(const profile of[{width:1440,height:1000,theme:'dark'},{width:390,height:844,theme:'light'}]){
  const context=await browser.newContext({viewport:profile,reducedMotion:'reduce'});await context.addInitScript(theme=>{if(window.top===window)localStorage.setItem('theme',theme)},profile.theme);const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message))
  for(const item of readExperienceRegistry().filter(item=>item.status==='draft')){await page.goto(`${base}/experience-preview/${item.slug}`);await expect(page.getByRole('heading',{level:1})).toBeVisible();if(['enigma','sea-of-salt','revolving-stage','black-hole'].includes(item.slug))await expect(page.locator('canvas')).toBeVisible();if(item.slug==='jugalbandi')await expect(page.locator('.ja-stage svg')).toBeVisible();if(item.slug==='typeface')await expect(page.locator('[data-glyph-outline]')).toBeVisible();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),item.slug);await page.screenshot({path:`${out}/${item.slug}-${profile.width}-${profile.theme}.png`,fullPage:true})}
  results.push(`18 drafts fit ${profile.width}px ${profile.theme}`);await context.close()
 }
 const recovery=await browser.newPage();await recovery.route('**/RoomScene.tsx*',route=>route.abort());await recovery.goto(`${base}/experience-preview/enigma`);await expect(recovery.getByRole('button',{name:'Reload experience'})).toBeVisible();assert.equal(await recovery.getByRole('button',{name:'Try again'}).count(),0);await recovery.unroute('**/RoomScene.tsx*');await recovery.getByRole('button',{name:'Reload experience'}).click();await expect(recovery.locator('canvas')).toBeVisible();await recovery.close();results.push('Failed module offers honest reload and recovers after network restoration')
}finally{await browser.close();writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2))}
assert.equal(errors.length,0,JSON.stringify(errors));console.log(JSON.stringify(results,null,2))
