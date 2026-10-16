import assert from 'node:assert/strict'
import {chromium, expect} from '@playwright/test'
import {mkdirSync, writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5222',out=process.env.QA_OUTPUT_DIR||'/tmp/evidence-pass/practice'
mkdirSync(out,{recursive:true})
const slugs=['embodied-web','feeling-patterns','performance-by-design','storytelling','hypercinema','applications','messy-humans','production-studio','arcade-lab'],results=[]
const browser=await chromium.launch()
try {
 for(const [width,theme] of [[1440,'light'],[768,'dark'],[390,'light']]) {
  const context=await browser.newContext({viewport:{width,height:960},hasTouch:width===390,reducedMotion:'reduce',recordVideo:width===390?{dir:out}:undefined})
  await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
  const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message))
  for(const slug of slugs) {
   await page.goto(`${base}/${slug}`)
   const article=page.locator('main.practice-entry article');await expect(article).toBeVisible()
   await expect(article.getByRole('heading',{level:1})).toHaveCount(1)
   await expect(article.getByRole('heading',{name:'Available material'})).toBeVisible()
   assert.equal(await article.locator('canvas,video,iframe,img').count(),0,'no substituted proof media')
   assert((await article.innerText()).split(/\s+/).length<330,'initial practice entry remains concise')
   const notes=article.locator('details > summary')
   if(await notes.count()) {const id=await article.locator('details').getAttribute('id');await page.goto(`${base}/${slug}#${id}`);await expect(page.locator(`details#${id}`)).toHaveAttribute('open','');await notes.press('Enter');await notes.focus();await page.keyboard.press('Enter');await expect(article.locator('details')).toHaveAttribute('open','');await notes.press('Enter');assert.equal(await article.locator('details[open]').count(),0)}
   const links=await article.locator('.practice-entry__related a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')))
   assert(links.length>0&&links.every(link=>link.startsWith('/')),'documented onward routes')
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'viewport fits')
   if(slug==='feeling-patterns') {await article.getByRole('heading',{level:1}).scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/practice-${width}-${theme}.png`})}
   results.push({slug,width,theme,status:'pass'})
  }
  await page.goto(`${base}/clawed-chat`)
  await page.getByText('About the material',{exact:true}).click()
  await expect(page.getByText('Approval-mode and execution-receipt design proposals.',{exact:true})).toBeVisible()
  assert(!(await page.locator('main').innerText()).includes('six moderated'))
  await page.goto(`${base}/moniac-machine#cs-interactive`)
  await expect(page.locator('#cs-interactive .moniac-game')).toBeVisible({timeout:20000})
  assert.equal(await page.locator('#cs-interactive details.world-original').count(),0,'game not buried in extra disclosure')
  await page.locator('#cs-interactive').getByRole('button',{name:'Explore rules without shocks',exact:true}).click()
  await page.locator('#moniac-active-policy').fill('75')
  await page.getByRole('button',{name:'Run one model step',exact:true}).click()
  await expect(page.locator('.moniac-step-results caption')).toContainText('75.0% compared with its reset value of 35%')
  const row=page.locator('.moniac-step-results tbody tr').first()
  assert(Number(await row.locator('td').nth(3).innerText())<0,'higher tax produces lower GDP than matched reset-control step')
  await page.getByRole('button',{name:'Reset experiment',exact:true}).click()
  await expect(page.locator('#moniac-active-policy')).toHaveValue('35')
  await page.screenshot({path:`${out}/moniac-case-${width}-${theme}.png`})
  assert.deepEqual(errors,[])
  await context.close()
 }
} finally {await browser.close()}
writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(`${results.length} practice route profiles and three Moniac case-study tasks passed.`)
