import assert from 'node:assert/strict'
import { chromium, webkit } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5211'
const out = process.env.QA_OUTPUT_DIR || '/tmp/website-refinement/verification'
mkdirSync(out, {recursive:true})
const results=[]
for(const [engine,width,theme] of [[chromium,1440,'light'],[chromium,390,'dark'],[webkit,390,'light']]){
 const browser=await engine.launch(),context=await browser.newContext({viewport:{width,height:1000},hasTouch:width===390,reducedMotion:'reduce',recordVideo:{dir:out,size:{width:Math.min(width,1000),height:800}}}),page=await context.newPage(),errors=[]
 page.on('pageerror',error=>errors.push(error.message))
 await page.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
 const visit=async route=>{await page.goto(base+route);await page.locator(route==='/'?'.wr-hero-title':'main h1').first().waitFor();await page.locator('.page-loader').waitFor({state:'hidden'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(500)}
 const expectImage=async locator=>{await locator.evaluate(image=>image.decode())}
 const press=async locator=>width===390?locator.tap():locator.click()
 const snap=async name=>page.screenshot({path:`${out}/${engine.name()}-${width}-${theme}-${name}.png`})
 try{
  await visit('/')
  assert(await page.locator('.wr-hero-still img').evaluate(image=>image.complete&&image.naturalWidth>0),'fallback loaded')
  assert(await page.locator('.wr-hero-still').evaluate(node=>getComputedStyle(node).opacity==='1'),'reduced-motion keeps fallback')
  assert.equal(await page.locator('.wr-hero-3d canvas').count(),0,'no reduced-motion renderer')
  await snap('hero')
  // Experimental footer work is excluded from this release.
  assert.equal(await page.locator('.footer-scene, .footer-crowd').count(),0)
  await visit('/work')
  const header=await page.locator('.work-page-header').evaluate(node=>({title:node.querySelector('h1').getBoundingClientRect().x,cta:node.querySelector('.work-room-link').getBoundingClientRect().x}));assert(width<900||header.cta>header.title+200)
  const install=page.getByRole('button',{name:/^Installations/}).first();await install.click();await page.locator('.work-group--selected').waitFor({state:'detached'})
  assert.equal(await page.locator('.work-group--selected').count(),0,'empty selected heading omitted')
  assert.equal(await page.locator('.pcard-masonry__column').evaluateAll(nodes=>nodes.some(node=>!node.children.length)),false,'no leading blank columns')
  await snap('work-filter')
  for(const route of ['/work?view=library','/work?view=timeline','/mentra','/transfi-project','/clawed-chat','/raahi-project','/zentipay','/executivelens','/office-of-diversity','/jugalbandi','/mentra-miniapps','/vj-software']){
   await visit(route)
   const full=page.getByRole('button',{name:/^(Full story|Public story)$/}).first();if(await full.count())await full.click();else{const reveal=page.locator('.project-story__prompt button').first();if(await reveal.count())await reveal.click()}
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`overflow ${route}`)
   if(!route.startsWith('/work')){
    const alignment=await page.evaluate(()=>{const frame=document.querySelector('.project-header--visual')?.getBoundingClientRect(),nav=document.querySelector('.nav-inner')?.getBoundingClientRect();return frame&&nav?Math.max(Math.abs(frame.left-nav.left),Math.abs(frame.right-nav.right)):0});assert(alignment<=1.5,`nav alignment ${route}: ${alignment}`)
   }
   results.push({engine:engine.name(),width,theme,route,overflow:false})
   if(route==='/transfi-project'||route==='/zentipay'){
    const gate=page.locator('.nda-inline').last();await gate.scrollIntoViewIfNeeded();assert.equal(await gate.locator('.nda-inline-preview').count(),0)
    assert.equal(await gate.getByRole('heading',{name:'Continue reading'}).count(),1)
    await gate.getByRole('button',{name:'Unlock',exact:true}).click();assert(await gate.locator('.nda-inline-confirmation').innerText())
    await gate.locator('summary').click();assert(await gate.getByRole('textbox',{name:'Work email'}).isVisible());await snap(route.slice(1)+'-gate')
   }
   if(route==='/zentipay'){
    const strip=page.locator('.cs-screen-strip').first();await strip.scrollIntoViewIfNeeded();await press(strip.getByRole('button',{name:'Next',exact:true}));await page.waitForTimeout(200);assert(await strip.locator('.cs-screen-strip__rail').evaluate(node=>node.scrollLeft>0));await snap('screens')
   }
   if(route==='/office-of-diversity'){
    const reader=page.locator('.cs-report-reader');await reader.scrollIntoViewIfNeeded();await page.getByLabel('Report chapter',{exact:true}).selectOption('2');assert(await reader.locator('.cs-report-reader__viewport').first().getAttribute('aria-label').then(x=>x.includes('Data')))
    await press(reader.getByRole('button',{name:'Fullscreen reader'}));assert(await reader.locator('dialog').isVisible());await snap('report');await reader.locator('dialog').getByRole('button',{name:'Zoom in'}).click();assert.equal(await reader.locator('dialog output').innerText(),'125%');await reader.locator('dialog img').click();assert.equal(await page.locator('.project-image-preview').count(),0,'report uses its own zoom without nesting the global lightbox');await page.keyboard.press('Escape');await reader.locator('dialog').waitFor({state:'hidden'});assert.equal(await reader.locator('dialog').isVisible(),false)
   }
   if(route==='/jugalbandi'){
    for(const title of ['One pluck, step by step','Air and fingers, one phrase','Eight rainsticks, two stacked cubes','Three gestures start the duet']){
      const study=page.locator('.mechanism-story').filter({has:page.getByRole('heading',{name:title,exact:true})});
      // Deferred drawings mount when their hosts approach the viewport.
      const hosts=page.locator('.project-story__content .wrap').filter({hasText:'Mechanism study loads as you approach.'});
      while(!await study.count()&&await hosts.count()){await hosts.first().scrollIntoViewIfNeeded();await page.waitForTimeout(200)}
      await study.scrollIntoViewIfNeeded();await study.getByRole('button',{name:/^3\./}).click();assert((await study.locator('svg').getAttribute('viewBox')).split(/[ ,]+/).every(value=>Number.isFinite(Number(value))));await snap(title.split(',')[0].replaceAll(' ','-'))
    }
    assert.equal(await page.getByRole('link',{name:'The Abacus'}).count(),0)
   }
   if(route==='/executivelens'){const gallery=page.locator('.cs-screen-explorer');await gallery.scrollIntoViewIfNeeded();await gallery.getByRole('button',{name:/Capabilities and control/}).click();await expectImage(gallery.locator('img'));assert((await gallery.locator('img').getAttribute('src')).includes('capabilities'));await snap('executive-evidence')}
   if(route==='/clawed-chat'){const flow=page.locator('.cs-pflow').first();await flow.scrollIntoViewIfNeeded();await flow.getByRole('button',{name:/Cloud VM/}).click();assert((await flow.locator('.cs-pflow-detail').innerText()).includes('Cloud VM Deploy'))}
   if(route==='/mentra-miniapps'){const source=page.locator('img[src*="store-discovery"]');await source.scrollIntoViewIfNeeded();await source.evaluate(image=>image.decode());assert(await source.evaluate(image=>image.naturalWidth===390));const store=page.locator('.cs-screen-strip').first();if(width===1440)assert.equal(await store.getByRole('button',{name:'Next',exact:true}).count(),0,'no inert carousel controls when all screens fit');await snap('miniapps')}
  }
  assert.equal(errors.length,0,errors.join('\n'))
 }finally{writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2));await context.close();await browser.close()}
}
console.log(`Website refinement: ${results.length} route/profile checks passed.`)
