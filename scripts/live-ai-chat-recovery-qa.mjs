import assert from 'node:assert/strict'
import {chromium,webkit,expect} from '@playwright/test'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',out=process.env.QA_OUTPUT_DIR||'docs/reviews/live-ai-chat'
mkdirSync(out,{recursive:true})
const results=[]
for(const [engine,width] of [[chromium,1440],[webkit,390]]){
 const browser=await engine.launch(),context=await browser.newContext({viewport:{width,height:900},hasTouch:width<600,reducedMotion:'reduce'})
 const page=await context.newPage(),errors=[],payloads=[]
 page.on('pageerror',e=>errors.push(e.message))
 let mode='success'
 await page.route('**/folio-answer',async route=>{
  if(route.request().method()!=='POST'){await route.fulfill({status:204});return}
  payloads.push(route.request().postDataJSON())
  if(mode==='timeout')return
  if(mode==='abort'){await route.abort('internetdisconnected');return}
  if(mode==='slow')await new Promise(resolve=>setTimeout(resolve,900))
  const body=mode==='malformed'?'{broken':mode==='empty'?JSON.stringify({answer:'   '}):mode==='null'?'null':JSON.stringify({answer:mode==='knowledge'?'Portfolio knowledge answer.':'**Mocked live answer** for recovery verification with *emphasis* and `sample`.',model:mode==='knowledge'?'portfolio-knowledge':'mock-model'})
  await route.fulfill({status:mode==='503'?503:mode==='429'?429:200,contentType:'application/json',body})
 })
 try{
  await page.goto(base+'/about')
  await page.getByRole('button',{name:'Ask Parth about this work',exact:true}).click()
  const panel=page.locator('.portfolio-chat-panel'),input=panel.getByRole('textbox',{name:'Message Ask Parth'}),send=panel.getByRole('button',{name:'Send',exact:true})
  await expect(panel.getByRole('log')).toHaveAttribute('aria-relevant','additions text')
  const reset=async()=>{await panel.getByRole('button',{name:'New chat',exact:true}).click();await expect(panel.locator('.portfolio-chat-message')).toHaveCount(0)}
  for(const scenario of ['503','429','malformed','empty','null','knowledge','abort',...(width===1440?['timeout']:[])]){
   await reset();mode=scenario
   await input.fill('What is Parth’s design process?');await send.click()
   await expect(panel.locator('.portfolio-chat-message--assistant')).toHaveAttribute('data-source','notes',{timeout:30000})
   await expect(panel.locator('.portfolio-chat-source')).toBeVisible()
   await expect(input).toBeEnabled()
   await input.fill('An unsent draft')
   mode='success'
   await panel.getByRole('button',{name:'Try live AI again'}).click()
   await expect(panel.locator('.portfolio-chat-message--assistant')).toHaveAttribute('data-source','ai')
   await expect(panel.locator('.portfolio-chat-message--assistant')).toContainText('Mocked live answer')
   await expect(panel.locator('.portfolio-chat-message--assistant em')).toHaveText('emphasis')
   await expect(panel.locator('.portfolio-chat-message--assistant code')).toHaveText('sample')
   await expect(panel.locator('.portfolio-chat-message--user')).toHaveCount(1)
   await expect(panel.locator('.portfolio-chat-message--assistant')).toHaveCount(1)
   await expect(panel.locator('.portfolio-chat-source')).toHaveCount(0)
   await expect(input).toHaveValue('An unsent draft')
   results.push({engine:engine.name(),width,scenario,retry:'replaced answer without duplicate question',passed:true})
  }
  await reset();mode='success'
  await input.fill('a'.repeat(801));assert.equal((await input.inputValue()).length,800)
  assert.equal(await input.getAttribute('maxlength'),'800')
  await send.click();await expect(panel.locator('.portfolio-chat-message--assistant')).toHaveAttribute('data-source','ai')
  assert.equal(payloads.slice(-1)[0].message.length,800)
  results.push({engine:engine.name(),width,scenario:'800-character contract',passed:true})
  await reset();mode='slow';await input.fill('What is Parth’s process?');await send.click()
  await expect(panel.getByRole('status')).toBeVisible();await panel.getByRole('button',{name:'New chat',exact:true}).click()
  await page.waitForTimeout(1200);await expect(panel.locator('.portfolio-chat-message')).toHaveCount(0)
  results.push({engine:engine.name(),width,scenario:'New chat ignores late answer',passed:true})
  mode='503';await page.goto(base+'/transfi-project');await page.locator('main h1').waitFor()
  await page.evaluate(()=>{const section=document.createElement('section');section.innerHTML='<h2>Private fixture</h2><p>PRIVATE_CHAT_QA_SENTINEL</p>';document.querySelector('main').append(section)})
  await page.getByRole('button',{name:'Ask Parth about this work',exact:true}).click();await input.fill('What was the challenge?');await send.click()
  await expect(panel.locator('.portfolio-chat-message--assistant')).toHaveAttribute('data-source','notes')
  const restricted=payloads.slice(-1)[0]
  assert.deepEqual(restricted.context.currentPage.sections,[])
  assert(!JSON.stringify(restricted).includes('PRIVATE_CHAT_QA_SENTINEL'))
  assert.equal(restricted.route,'/transfi-project')
  results.push({engine:engine.name(),width,scenario:'Protected page DOM excluded',passed:true})
  await page.goto(base+'/mentra');await page.locator('main h1').waitFor()
  await page.getByRole('button',{name:'Ask Parth about this work',exact:true}).click()
  mode='success';await input.fill('Tell me about Mentra');await send.click()
  await expect(panel.locator('.portfolio-chat-message--assistant').last()).toHaveAttribute('data-source','ai')
  await panel.getByRole('button',{name:'Try live AI again'}).click()
  await expect(panel.locator('.portfolio-chat-message--assistant').first()).toHaveAttribute('data-source','ai')
  assert.notEqual(payloads.slice(-1)[0].context.visitor.lastProject,'mentra','Retry clears a later project focus')
  assert.equal(payloads.slice(-1)[0].route,'/transfi-project','Retry retains original project context')
  assert.equal(payloads.slice(-1)[0].context.currentPage,undefined,'Other page DOM is not attached to a retry')
  await expect(panel.locator('.portfolio-chat-message--user')).toHaveCount(2)
  results.push({engine:engine.name(),width,scenario:'Retry after navigation retains original project',passed:true})
  assert.deepEqual(errors,[])
 }finally{await context.close();await browser.close()}
 // A failed JS-module import cannot be retried reliably without a document reload.
 const coldBrowser=await engine.launch(),coldContext=await coldBrowser.newContext({viewport:{width,height:900},hasTouch:width<600,reducedMotion:'reduce'}),cold=await coldContext.newPage()
 try{
  await cold.route('**/agentAI-*.js',r=>r.abort())
  await cold.route('**/folio-answer',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({answer:'Mocked recovered answer.',model:'mock-model'})}))
  await cold.goto(base+'/about');const launch=cold.getByRole('button',{name:'Ask Parth about this work',exact:true});await launch.click()
  const input=cold.getByRole('textbox',{name:'Message Ask Parth'})
  await input.fill('What is Parth’s process?');await cold.getByRole('button',{name:'Send',exact:true}).click()
  await expect(cold.getByRole('button',{name:'Reload chat',exact:true})).toBeVisible()
  await cold.unroute('**/agentAI-*.js')
  await Promise.all([cold.waitForEvent('load'),cold.getByRole('button',{name:'Reload chat',exact:true}).click()])
  await launch.click();await cold.getByRole('button',{name:'Retry answer',exact:true}).click()
  await expect(cold.locator('.portfolio-chat-message--assistant')).toContainText('Mocked recovered answer')
  await expect(cold.locator('.portfolio-chat-message--user')).toHaveCount(1)
  results.push({engine:engine.name(),width,scenario:'Cold chat chunk reload and saved-question retry',passed:true})
 }finally{await coldContext.close();await coldBrowser.close()}
 writeFileSync(`${out}/recovery-results.json`,JSON.stringify(results,null,2))
 console.log(`${engine.name()} ${width}: failure, retry, length limit, pending reset, protected context and chunk recovery passed.`)
}
console.log(`PASS: ${results.length} recovery and boundary checks. All endpoint responses in this suite were mocked.`)
