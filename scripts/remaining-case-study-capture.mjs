import {chromium} from '@playwright/test'
import {mkdirSync,writeFileSync} from 'node:fs'
const out=process.env.QA_OUTPUT_DIR||'/tmp/remaining-case-studies/comparisons';mkdirSync(out,{recursive:true})
const targets={'the-omakase':'.om-cabinet','ibm':'#cs-glimpse','shuffle':'#cs-exhibition','enigma':'.cs-media-spotlight','cuetv':'.nda-inline','the-point-cdc':'.proj-visual-hero__media','ai-voice':'#cs-ai-voice-journey','medimorpho':'main h1','mentra-brand':'#cs-packaging','black-hole':'#cs-time-trap','making-of-time':'#cs-mechanical','code-for-build':'#cs-glimpse','sea-of-salt':'#cs-try','dumb-waiter-set-design':'main h1','drowning':'main h1','revolving-stage':'.cs-credits','tedx':'main h1','typeface':'.tf-specimen-section','sculpture':'#cs-sculpture-process','vishwaconclave':'#cs-events','glassly':'#glassly-demo'}
const browser=await chromium.launch(),records=[]
for(const [label,base] of [['before',process.env.QA_COMPARE_URL],['after',process.env.QA_BASE_URL||'http://127.0.0.1:5211']].filter(([label])=>!process.env.QA_CAPTURE_LABELS||process.env.QA_CAPTURE_LABELS.split(',').includes(label))){
 if(!base)throw new Error('Set QA_COMPARE_URL to the retained before-build preview, or use QA_CAPTURE_LABELS=after.')
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),page=await context.newPage();await page.addInitScript(()=>{localStorage.setItem('theme','light');localStorage.setItem('portfolio-analytics-consent-v1','denied')})
 for(const [slug,selector] of Object.entries(targets).filter(([slug])=>!process.env.QA_SLUGS||process.env.QA_SLUGS.split(',').includes(slug))){
  await page.goto(`${base}/${slug}`);await page.locator('main h1').first().waitFor();await page.locator('.page-loader').waitFor({state:'hidden'});const expand=page.locator('.cs-expand-preview-btn').first();if(await expand.isVisible())await expand.click();const target=page.locator(selector).first();if(await target.count())await target.scrollIntoViewIfNeeded();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(400);await page.screenshot({path:`${out}/${slug}-${label}.png`});records.push({slug,label,target:selector})
 }
 await context.close()
}
await browser.close();writeFileSync(`${out}/captures.json`,JSON.stringify(records,null,2))
