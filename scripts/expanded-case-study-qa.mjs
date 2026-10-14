import { chromium } from '@playwright/test'
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs'
import assert from 'node:assert/strict'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5201'
const out=process.env.QA_OUTPUT||'/tmp/expanded-case-study-qa';mkdirSync(out,{recursive:true})
const routes=process.env.QA_ROUTES?.split(',') || [...readFileSync('src/data/projectRoutes.ts','utf8').matchAll(/slug: '([^']+)'/g)].map(m=>m[1])
const browser=await chromium.launch(),results=[]
for(const profile of [{name:'desktop-light',width:1440,height:1000,theme:'light'},{name:'mobile-dark',width:390,height:844,theme:'dark'}]){
 for(const slug of routes){
  const page=await browser.newPage({viewport:profile,reducedMotion:'reduce',hasTouch:profile.width<500}),issues=[],http=[]
  page.on('pageerror',e=>issues.push(e.message));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)http.push({url:r.url(),status:r.status()})})
  await page.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},profile.theme)
  const start=Date.now()
  try{
   await page.goto(`${base}/${slug}/`,{waitUntil:'domcontentloaded'});await page.locator('main h1').first().waitFor();await page.locator('.page-loader').waitFor({state:'hidden',timeout:20000})
   const expand=page.locator('.cs-expand-preview-btn');if(await expand.count())await expand.first().click()
   // Reach all images, including content whose loading is deferred until expansion.
   await page.locator('main img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'))
   await page.locator('main img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode().catch(()=>{}))))
   const broken=await page.locator('main img').evaluateAll(imgs=>imgs.filter(i=>!i.naturalWidth).map(i=>i.currentSrc||i.src))
   assert.equal(broken.length,0,`Broken images: ${broken.join(', ')}`)
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Horizontal overflow')
   const story=page.locator('.project-story__content');if(await story.count())await story.first().scrollIntoViewIfNeeded()
   await page.screenshot({path:`${out}/${slug}-${profile.name}.png`})
   const ids=await page.locator('[id]').evaluateAll(els=>els.map(e=>e.id));const duplicates=ids.filter((id,i)=>ids.indexOf(id)!==i);assert.equal(duplicates.length,0,`Duplicate IDs: ${duplicates}`)
   const links=await page.locator('#cs-bottom-nav a[href^="#"]').evaluateAll(els=>els.map(e=>e.getAttribute('href').slice(1)))
   for(const id of links)assert(await page.locator(`[id="${id}"]`).count(),`Missing chapter ${id}`)
  }catch(e){issues.push(e.message)}
  results.push({slug,profile:profile.name,elapsedMs:Date.now()-start,issues,http});console.log(slug,profile.name,issues.length?'FAIL '+issues.join(' | '):'pass');await page.close()
 }
}
writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));await browser.close();assert(results.every(r=>!r.issues.length&&!r.http.length),'See results.json for failing routes')
