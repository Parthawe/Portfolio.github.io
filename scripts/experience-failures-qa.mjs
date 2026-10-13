import assert from 'node:assert/strict'
import {mkdirSync} from 'node:fs'
mkdirSync('/tmp/portfolio-experience-recovery-qa',{recursive:true})
import {chromium,expect} from '@playwright/test'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5199', browser=await chromium.launch()
try{
 const context=await browser.newContext({viewport:{width:1185,height:969},reducedMotion:'no-preference'})
 const page=await context.newPage()
 await page.route('**/Assets/hdri/*',r=>r.abort())
 await page.goto(base,{waitUntil:'domcontentloaded'})
 await expect(page.getByRole('heading',{name:'Designing product systems people trust.',exact:true})).toBeVisible()
 await expect(page.getByRole('button',{name:'Reload scene',exact:true})).toBeVisible({timeout:25000})
 await expect(page.locator('.hero-scene-status')).toContainText('could not load')
 await page.locator('#hero').screenshot({path:'/tmp/portfolio-experience-recovery-qa/hero-failure.png'})
 await page.locator('#nav').getByRole('link',{name:'Work',exact:true}).click();await expect(page).toHaveURL(base+'/work')
 await expect(page.getByRole('heading',{name:'Work',exact:true})).toBeVisible()
 await context.close()
 const failed=await browser.newContext({viewport:{width:375,height:812},reducedMotion:'reduce'})
 const world=await failed.newPage();await world.route('**/RoomScene-*.js',r=>r.abort())
 await world.goto(base+'/moniac-machine/world',{waitUntil:'domcontentloaded'})
 await expect(world.getByRole('heading',{name:'Moniac Machine',exact:true})).toBeVisible({timeout:15000})
 await expect(world.getByRole('button',{name:'Reload experience',exact:true})).toBeVisible({timeout:15000})
 await expect(world.getByRole('link',{name:'View the project photographs',exact:true})).toBeVisible()
 await world.locator('.physical-world-loading').screenshot({path:'/tmp/portfolio-experience-recovery-qa/world-failure.png'})
 assert(await world.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1))
 await failed.close()
 console.log('Hero lighting and world import failures stay isolated; navigation and recovery remain usable.')
}finally{await browser.close()}
