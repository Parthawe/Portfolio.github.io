import{chromium,webkit,expect}from'@playwright/test'
import assert from'node:assert/strict'
import{writeFileSync,mkdirSync}from'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',out='docs/reviews/chat-usability';mkdirSync(out,{recursive:true});const results=[]
for(const[engine,width]of[[chromium,1440],[webkit,390]]){
 const browser=await engine.launch(),context=await browser.newContext({viewport:{width,height:900},hasTouch:width<600,reducedMotion:'reduce'}),page=await context.newPage(),network=[];let tasks=[]
 page.on('response',response=>{
  if(!response.url().endsWith('/folio-answer')||response.request().method()!=='POST')return
  tasks.push((async()=>{const body=await response.json(),payload=response.request().postDataJSON();network.push({question:payload.message,status:response.status(),model:body.model,answer:body.answer,retry:!!payload.context.responseRequirements,contextChars:JSON.stringify(payload.context).length})})())
 })
 try{
 await page.goto(base+'/');await page.getByRole('button',{name:'Ask Parth about this work',exact:true}).click();const input=page.getByRole('textbox',{name:'Message Ask Parth'})
 for(const question of ['Why is he the best?','What makes him different as a designer?']){
  const count=await page.locator('.portfolio-chat-message--assistant').count();const start=Date.now();await input.fill(question);await page.getByRole('button',{name:'Send',exact:true}).click()
  await expect(page.locator('.portfolio-chat-message--assistant')).toHaveCount(count+1,{timeout:30000})
  await Promise.all(tasks);tasks=[]
  const answer=page.locator('.portfolio-chat-message--assistant').last();const source=await answer.getAttribute('data-source')
  const text=(await answer.locator('p,li').allTextContents()).join('\n')
  assert(!/i only (?:answer|discuss|talk)|only.*questions about parth|cannot answer.*(?:parth|portfolio)/i.test(text),text);assert.match(text,/Mentra|Clawed|Jugalbandi/i)
  await expect(answer.locator('p').first()).toBeInViewport()
  const exchanges=network.filter(x=>x.question===question);assert(exchanges.some(x=>x.status===200&&x.model&&x.model!=='portfolio-knowledge'))
  if(source!=='ai')process.exitCode=1
  results.push({engine:engine.name(),width,question,source,livePassed:source==='ai',displayedAnswer:text,ms:Date.now()-start,exchanges});writeFileSync(`${out}/live-results.json`,JSON.stringify(results,null,2))
 }
 await page.screenshot({path:`${out}/${engine.name()}-${width}-live.png`});console.log(`${engine.name()} ${width}: live answers and any labeled fallback recorded (see live-results.json).`)
 }catch(error){await Promise.all(tasks);writeFileSync(`${out}/live-failure-${engine.name()}.json`,JSON.stringify({error:String(error),network},null,2));throw error}finally{await context.close();await browser.close()}
}
