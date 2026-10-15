import {chromium,expect} from '@playwright/test'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',out=process.env.QA_OUTPUT_DIR||'docs/reviews/omakase-arcade'
mkdirSync(out,{recursive:true})
const browser=await chromium.launch(),context=await browser.newContext({viewport:{width:1440,height:1100},recordVideo:{dir:out+'/hosted-video',size:{width:1280,height:960}}}),page=await context.newPage()
const responses=[],failures=[],consoleErrors=[];page.on('response',r=>{if(r.url().includes('itch.zone')||r.url().includes('itch.io/embed-upload'))responses.push({url:r.url(),status:r.status()})});page.on('requestfailed',r=>failures.push({url:r.url(),error:r.failure()}));page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});page.on('dialog',async d=>{failures.push({dialog:d.message()});await d.dismiss()})
let state=null,bootMs=null
try{
 await page.goto(base+'/experience-preview/the-omakase');const start=Date.now();await page.getByRole('button',{name:'Start original game'}).click()
 await expect.poll(()=>page.frames().find(f=>f.url().includes('/html/11124779/'))?.url(),{timeout:30000}).toContain('/html/11124779/')
 const game=page.frames().find(f=>f.url().includes('/html/11124779/'))
 await expect.poll(()=>game.evaluate(()=>({loading:document.querySelector('#unity-loading-bar')?.style.display,canvas:!!document.querySelector('#unity-canvas')})),{timeout:60000,intervals:[1000]}).toEqual({loading:'none',canvas:true})
 bootMs=Date.now()-start;await page.waitForTimeout(8000);state=await game.evaluate(()=>({title:document.title,loading:document.querySelector('#unity-loading-bar')?.style.display,warning:document.querySelector('#unity-warning')?.textContent,canvas:!!document.querySelector('canvas')}))
 await page.locator('.om-cabinet').scrollIntoViewIfNeeded();await page.screenshot({path:out+'/hosted-game.png',fullPage:true});await page.getByRole('button',{name:'Focus game',exact:true}).click();await page.screenshot({path:out+'/hosted-game-focused.png',fullPage:false});await game.locator('#unity-canvas').click();await page.keyboard.press('1');await page.waitForTimeout(2000);await page.screenshot({path:out+'/hosted-game-keyboard.png',fullPage:true});await page.waitForTimeout(4500);await page.keyboard.press('1');await page.waitForTimeout(2500);await page.keyboard.press('8');await page.keyboard.press('q');await page.keyboard.press('i');await page.waitForTimeout(1000);await page.screenshot({path:out+'/hosted-game-playing.png',fullPage:true})
 console.log('Original Unity build booted',bootMs,'ms',state)
} finally {
 writeFileSync(out+'/hosted-game.json',JSON.stringify({state,bootMs,responses,failures,consoleErrors},null,2));await context.close();await browser.close()
}
