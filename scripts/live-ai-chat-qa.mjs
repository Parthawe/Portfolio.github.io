import assert from 'node:assert/strict'
import {chromium,webkit,expect} from '@playwright/test'
import {mkdirSync,writeFileSync,renameSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211'
const out=process.env.QA_OUTPUT_DIR||'docs/reviews/live-ai-chat'
mkdirSync(out,{recursive:true})
const results=[]
for(const [engine,width,theme,path,questions] of [
 [chromium,1440,'light','/work',['Compare Mentra and TransFi. Which one focuses on AI wearables?','For the wearables project, what did Parth own?']],
 [webkit,390,'dark','/jugalbandi',['How did you build Jugalbandi?','Which robotic instrument answers the tabla input?']]
]){
 const browser=await engine.launch(),context=await browser.newContext({viewport:{width,height:900},hasTouch:width<600,reducedMotion:'reduce',recordVideo:{dir:out,size:{width:Math.min(width,1000),height:900}}})
 await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
 const page=await context.newPage(),video=page.video(),errors=[],exchanges=[]
 page.on('pageerror',e=>errors.push(e.message))
 try{
  await page.goto(base+path)
  const launch=page.getByRole('button',{name:'Ask Parth about this work',exact:true})
  width<600?await launch.tap():await launch.click()
  const panel=page.locator('.portfolio-chat-panel'),input=panel.getByRole('textbox',{name:'Message Ask Parth'})
  for(const [index,question] of questions.entries()){
   await input.fill(question)
   const responsePromise=page.waitForResponse(r=>r.url().endsWith('/functions/v1/folio-answer')&&r.request().method()==='POST',{timeout:30000})
   const started=Date.now()
   width<600?await panel.getByRole('button',{name:'Send',exact:true}).tap():await input.press('Enter')
   await expect(panel.getByRole('status')).toBeVisible()
   const response=await responsePromise,payload=response.request().postDataJSON(),body=await response.json(),elapsedMs=Date.now()-started
   assert.equal(response.status(),200,JSON.stringify(body))
   assert.equal(response.headers()['access-control-allow-origin'],new URL(base).origin)
   assert(body.answer?.trim(),'Nonempty real answer')
   assert(body.model&&body.model!=='portfolio-knowledge','Real model, not server knowledge fallback')
   assert.equal(new URL(response.url()).host,'yqbpsfzbroublrlvhzen.supabase.co')
   await expect(panel.locator('.portfolio-chat-message--assistant')).toHaveCount(index+1,{timeout:5000})
   const answer=panel.locator('.portfolio-chat-message--assistant').last()
   await expect(answer).toHaveAttribute('data-source','ai')
   await expect(answer.locator('.portfolio-chat-source')).toHaveCount(0)
   if(index>0)assert(payload.context.recentConversation.some(turn=>turn.question===questions[0]),'Prior live turn included')
   if(width===390&&index===1)assert.match(body.answer,/rainstick/i)
   if(width===1440&&index===0){assert.match(body.answer,/Mentra/i);assert.match(body.answer,/TransFi/i)}
   assert.equal(payload.route,path)
   exchanges.push({question,answer:body.answer,model:body.model,status:response.status(),allowedOrigin:response.headers()['access-control-allow-origin'],elapsedMs,priorTurns:payload.context.recentConversation.length})
  }
  await input.fill('Saved unsent question')
  await page.screenshot({path:`${out}/${engine.name()}-${width}-${theme}.png`})
  width<600?await panel.getByRole('button',{name:'Close panel'}).tap():await panel.getByRole('button',{name:'Close panel'}).click()
  width<600?await launch.tap():await launch.click()
  await expect(input).toHaveValue('Saved unsent question')
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
  assert.deepEqual(errors,[])
  results.push({engine:engine.name(),width,theme,route:path,exchanges,passed:true})
  writeFileSync(`${out}/live-results.json`,JSON.stringify(results,null,2))
  console.log(`${engine.name()} ${width}: two real model answers, follow-up context and draft passed.`)
 }finally{await context.close();if(video)renameSync(await video.path(),`${out}/${engine.name()}-${width}-${theme}.webm`);await browser.close()}
}
