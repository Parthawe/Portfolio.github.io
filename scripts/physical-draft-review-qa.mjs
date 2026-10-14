import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium, expect } from '@playwright/test'
const base=process.env.QA_DEV_URL || 'http://127.0.0.1:5201',out=process.env.QA_OUTPUT_DIR || '/tmp/portfolio-physical-draft-review'
mkdirSync(out,{recursive:true})
const browser=await chromium.launch(),results=[],errors=[]
try {
 for(const width of[1440,390])for(const theme of['light','dark']){
  const context=await browser.newContext({viewport:{width,height:width===390?844:1000},hasTouch:width===390,reducedMotion:'reduce',recordVideo:width===1440&&theme==='light'?{dir:out}:undefined})
  await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message))
  for(const slug of['enigma','jugalbandi','revolving-stage','sea-of-salt','black-hole']){
   await page.goto(`${base}/experience-preview/${slug}`)
   await expect(page.locator('.physical-world-stage canvas')).toBeVisible({timeout:30000})
   await expect(page.locator('.physical-world').first()).toHaveAttribute('data-world-theme',theme)
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'draft fits viewport')
   if(width===390&&slug!=='enigma')await page.getByRole('button',{name:'Project controls',exact:true}).click()
   const slider=page.getByRole('slider').first(),select=page.getByRole('combobox').first()
   if(await slider.count()){await slider.fill('75');await expect(slider).toHaveValue('75')}
   if(slug==='enigma'){
    await page.getByLabel('Type a letter',{exact:true}).fill('z')
    await expect(page.getByLabel('Type a letter',{exact:true})).toHaveValue('Z')
    assert.equal(await page.locator('.enigma-input-row canvas').count(),0,'unvalidated drawing is withheld')
   }
   if(slug==='jugalbandi'){
    if(width===390)await page.getByRole('button',{name:'Close project controls'}).click();await page.getByRole('combobox',{name:'Inspect an instrument'}).selectOption('2');if(width===390)await page.getByRole('button',{name:'Project controls',exact:true}).click()
    await page.getByRole('checkbox',{name:'Enable synthesized sound'}).check()
    await page.getByRole('button',{name:'Pluck string',exact:true}).click()
    await expect(page.getByRole('slider',{name:'String actuation',exact:true})).not.toHaveValue('75')
   }
   if(slug==='revolving-stage'){
    if(width===390)await page.getByRole('button',{name:'Close project controls'}).click();await page.getByRole('button',{name:'Garden',exact:true}).click();if(width===390)await page.getByRole('button',{name:'Project controls',exact:true}).click()
    await expect(page.getByRole('slider',{name:'Stage rotation',exact:true})).toHaveValue('180')
    await page.getByRole('button',{name:'Cutaway',exact:true}).click()
   }
   if(slug==='sea-of-salt')await expect(page.locator('.world-story strong')).toHaveText('The command breaks loose')
   if(slug==='black-hole'){
    for(const value of['0','1','2']){await select.selectOption(value);await page.waitForTimeout(100);await page.locator('.physical-world-stage').screenshot({path:`${out}/black-hole-${value}-${width}-${theme}.png`})}
   }
   if(width===390&&slug!=='enigma')await page.getByRole('button',{name:'Close project controls'}).click()
   await page.getByRole('button',{name:'Overhead',exact:true}).click()
   await page.getByRole('button',{name:'Reset',exact:true}).click()
   if(slug==='enigma')await expect(page.getByLabel('Type a letter',{exact:true})).toHaveValue('A')
   await page.waitForTimeout(150)
   await page.screenshot({path:`${out}/${slug}-${width}-${theme}.png`,fullPage:true})
   results.push({slug,width,theme,status:'pass'})
  }
  await page.goto(`${base}/experience-preview/moniac-machine`)
  await page.getByRole('button',{name:'Start Economy',exact:true}).click()
  const tax=page.getByRole('slider',{name:/^Tax Rate:/})
  await tax.fill('80');await expect(tax).toHaveValue('80')
  await page.getByRole('button',{name:'Pause game',exact:true}).click()
  await expect(tax).toBeDisabled()
  await page.getByRole('button',{name:'Resume game',exact:true}).click()
  await expect(tax).toBeEnabled()
  await page.screenshot({path:`${out}/moniac-machine-${width}-${theme}.png`,fullPage:true})
  results.push({slug:'moniac-machine',width,theme,status:'pass'})
  const video=page.video();await context.close();if(video)await video.saveAs(`${out}/physical-drafts.webm`)
 }
} finally {await browser.close();writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2))}
assert.equal(errors.length,0,JSON.stringify(errors));console.log(`Passed ${results.length} draft checks. Evidence: ${out}`)
