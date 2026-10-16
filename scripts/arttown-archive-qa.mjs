import {chromium,expect} from '@playwright/test'
import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
const dir=process.env.QA_OUTPUT_DIR || '/tmp/portfolio-arttown-review';mkdirSync(dir,{recursive:true})
const base=process.env.QA_DEV_URL || 'http://127.0.0.1:5201'
const browser=await chromium.launch();const results=[],errors=[]
try{
 for(const theme of['light','dark']){
 const context=await browser.newContext({viewport:{width:theme==='light'?1440:390,height:1000},recordVideo:{dir}})
 await context.addInitScript(theme=>localStorage.setItem('theme',theme),theme)
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(`${base}/experience-preview/atps`)
 await expect(page.locator('.arttown-results button')).toHaveCount(12)
 const audio=page.locator('audio');await expect(audio).toHaveAttribute('preload','none')
 await audio.focus();await audio.press('Space');await expect.poll(()=>audio.evaluate(a=>a.readyState),{timeout:30000}).toBeGreaterThan(0)
 await expect.poll(()=>audio.evaluate(a=>a.paused)).toBe(false)
 await audio.evaluate(a=>{a.currentTime=20});await expect.poll(()=>audio.evaluate(a=>a.currentTime),{timeout:15000}).toBeGreaterThanOrEqual(19)
 await page.getByLabel('Find a guest or topic').fill('Bill Wei');await expect(page.locator('.arttown-results button')).toHaveCount(1)
 await page.locator('.arttown-results button').click();await expect(audio).toHaveAttribute('src',/42594267/)
 await expect.poll(()=>audio.evaluate(a=>a.paused)).toBe(true)
 await page.getByLabel('Find a guest or topic').fill('zzzzmissing');await expect(page.getByText('No conversations match that search.',{exact:false})).toBeVisible()
 await page.getByRole('button',{name:'Clear search',exact:true}).click()
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'archive fits viewport')
 await page.screenshot({path:`${dir}/${theme}.png`,fullPage:false});const video=page.video();await context.close();if(video)await video.saveAs(`${dir}/${theme}.webm`)
 results.push({theme,metadata:true,playback:true,seeking:true,search:true,switchStopsAudio:true})
 }
}finally{await browser.close();writeFileSync(`${dir}/report.json`,JSON.stringify({results,errors},null,2))}
assert.equal(errors.length,0,JSON.stringify(errors));console.log(JSON.stringify(results))
