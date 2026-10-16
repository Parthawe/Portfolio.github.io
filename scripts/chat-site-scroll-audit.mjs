import{chromium,webkit,expect}from'@playwright/test'
import{readFileSync,mkdirSync,writeFileSync}from'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',out=process.env.QA_OUTPUT_DIR||'docs/reviews/chat-usability/site'
const catalog=JSON.parse(readFileSync('/tmp/chat-public-site-catalog.json','utf8'))
const routes=[...new Set(['/', '/work','/about','/notes','/playbook','/accessibility','/experience-preview','/graveyard','/healthcare','/brand','/design-engineer',...catalog.collections,...catalog.projects,...catalog.drafts,'/typeface/workshop'])]
mkdirSync(out,{recursive:true});const results=[]
for(const[engine,width]of[[chromium,1440],[webkit,390]]){
 const browser=await engine.launch(),context=await browser.newContext({viewport:{width,height:900},hasTouch:width<600,reducedMotion:'reduce'})
 await context.addInitScript(()=>{localStorage.setItem('portfolio-analytics-consent-v1','denied')})
 const page=await context.newPage();let errors=[]
 page.on('pageerror',e=>errors.push(e.message));await page.route('**/folio-answer',r=>r.fulfill({status:503,body:'unavailable'}))
 try{
 for(const route of routes){
  errors=[];await page.goto(base+route);await page.locator('main').first().waitFor({timeout:20000});await page.waitForTimeout(120)
  let steps=0,overflow=false
  while(steps<65){
   const state=await page.evaluate(()=>({y:scrollY,max:document.documentElement.scrollHeight-innerHeight,overflow:document.documentElement.scrollWidth>innerWidth+2}))
   overflow ||=state.overflow
   if(state.y>=state.max-2)break
   await page.evaluate(()=>window.scrollBy(0,innerHeight*.8));await page.waitForTimeout(25);steps++
  }
  const maximum=await page.evaluate(()=>document.documentElement.scrollHeight-innerHeight)
  const reachedBottom=await page.evaluate(()=>scrollY>=document.documentElement.scrollHeight-innerHeight-3)
  const eligible=route!=='/graveyard'
  let sectionCount=0,chatOverflow=false,scrollControl=false
  if(eligible){
   const launcher=page.getByRole('button',{name:'Ask Parth about this work',exact:true});await launcher.click()
   const panel=page.locator('.portfolio-chat-panel');await expect(panel).toBeVisible();await expect(panel).toHaveCount(1)
   sectionCount=await panel.locator('#portfolio-chat-section option').count()-1
   await panel.getByRole('button',{name:'Back to top ↑',exact:true}).click();await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);scrollControl=true
   chatOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2)
   await panel.getByRole('button',{name:'Close panel'}).click()
  }
  if(['/', '/work','/mentra','/transfi-project','/jugalbandi','/enigma','/moniac-machine','/experience-preview/jugalbandi','/experience-preview/enigma','/experience-preview/moniac-machine'].includes(route))await page.screenshot({path:`${out}/${engine.name()}-${width}-${route.replaceAll('/','_')||'home'}.png`})
  results.push({engine:engine.name(),width,route,scrollSteps:steps,pageHeight:maximum+900,reachedBottom,overflow,chatOverflow,sectionCount,scrollControl,errors:[...errors]})
  writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2))
  if(overflow||chatOverflow||!reachedBottom||errors.length)console.log('FINDING',JSON.stringify(results.slice(-1)[0]))
 }
 await page.goto(base+'/shuffle/simulation');await page.locator('main').waitFor();await expect(page.locator('.portfolio-chat-panel')).toHaveCount(0)
 console.log(`${engine.name()} ${width}: ${routes.length} routes walked; approved standalone Shuffle kept unchanged.`)
 }finally{await context.close();await browser.close()}
}
const findings=results.filter(row=>row.overflow||row.chatOverflow||!row.reachedBottom||row.errors.length)
writeFileSync(`${out}/summary.json`,JSON.stringify({routes:routes.length,profiles:results.length,findings},null,2))
console.log(`${results.length} page/profile checks, ${findings.length} findings. Details: ${out}/summary.json`)
if(findings.length)process.exitCode=1
