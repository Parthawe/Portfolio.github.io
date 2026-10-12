import assert from 'node:assert/strict'
import {chromium,expect} from '@playwright/test'
const browser=await chromium.launch()
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}})
 await page.addInitScript(()=>{Object.defineProperty(navigator,'hardwareConcurrency',{get:()=>8});Object.defineProperty(navigator,'deviceMemory',{get:()=>8})})
 await page.route('**/Assets/hdri/*.hdr',()=>{})
 await page.goto(process.env.QA_BASE_URL||'http://127.0.0.1:5199',{waitUntil:'domcontentloaded'})
 const image=page.locator('#works .pcard img').first()
 await expect(image).toBeAttached()
 assert.equal(await image.getAttribute('src'),null,'offscreen speculation waits for the hero')
 await page.locator('#works').evaluate(el=>el.scrollIntoView({behavior:'instant'}))
 await expect(image).toHaveAttribute('src',/Assets/)
 await expect.poll(()=>image.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true)
 assert(!(await page.locator('#hero').getAttribute('class')).includes('is-scene-ready'),'scroll releases image prefetch without waiting for 3D')
 console.log('Early scrolling loads project media while hero lighting is still pending.')
}finally{await browser.close()}
