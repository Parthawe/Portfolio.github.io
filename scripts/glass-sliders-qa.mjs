import assert from 'node:assert/strict'
import {chromium,webkit,expect} from '@playwright/test'
import {mkdirSync,readdirSync,readFileSync,writeFileSync} from 'node:fs'
import ts from 'typescript'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5199',out='/tmp/portfolio-glass-sliders-qa';mkdirSync(out,{recursive:true})
// Prevent any project silently falling back to an unstyled native range.
function inspect(dir){for(const entry of readdirSync(dir,{withFileTypes:true})){const p=dir+'/'+entry.name;if(entry.isDirectory())inspect(p);else if(p.endsWith('.tsx')&&!p.endsWith('/PortfolioSlider.tsx')){const ast=ts.createSourceFile(p,readFileSync(p,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);function visit(n){if((ts.isJsxSelfClosingElement(n)||ts.isJsxOpeningElement(n))&&n.tagName.getText(ast)==='input'){for(const a of n.attributes.properties)if(ts.isJsxAttribute(a)&&a.name.getText(ast)==='type'&&a.initializer&&a.initializer.getText(ast).includes('range'))assert.fail(`${p}: raw range bypasses the shared slider`)}ts.forEachChild(n,visit)}visit(ast)}}}inspect('src')
const routes=['/moniac-machine/world','/jugalbandi/world','/sea-of-salt/world','/revolving-stage/world','/black-hole/world','/uv-light/world','/shuffle','/typeface','/comp-media','/drowning','/black-hole','/moniac-machine','/sea-of-salt','/code-for-build/prototype','/studio']
const results=[]
for(const profile of[{name:'chromium-desktop-light',engine:chromium,width:1185,height:969,theme:'light'},{name:'chromium-mobile-dark',engine:chromium,width:390,height:844,theme:'dark'},{name:'webkit-mobile-light',engine:webkit,width:390,height:844,theme:'light'}]){
 if(process.env.QA_SLIDER_PROFILE&&!profile.name.includes(process.env.QA_SLIDER_PROFILE))continue
 const browser=await profile.engine.launch()
 try{const context=await browser.newContext({viewport:profile,reducedMotion:'reduce',hasTouch:profile.width<600}),page=await context.newPage(),errors=[]
 await page.addInitScript(theme=>{if(window.top===window)localStorage.setItem('theme',theme)},profile.theme)
 page.on('pageerror',e=>errors.push(e.message))
 for(const route of routes){
  // Studio intentionally uses a different mobile fallback with no zoom slider.
  if(route==='/studio'&&profile.width<600)continue
  await page.goto(base+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(600)
  const expand=page.locator('.cs-expand-preview-btn');if(await expand.count())await expand.first().click()
  const original=page.locator('.world-original > summary');if(await original.count()){await original.click();await page.locator('.world-original input[type="range"]').first().waitFor()}
  const shuffle=page.locator('.shuffle-controls > summary');if(await shuffle.count())await shuffle.click()
  const sliders=page.locator('input[type="range"]');await expect(sliders.first()).toBeAttached()
  let visible=0
  for(const slider of await sliders.all()){
   await expect(slider).toHaveClass(/portfolio-slider/)
   if(!await slider.isVisible())continue;visible++
   const state=await slider.evaluate(el=>({height:el.getBoundingClientRect().height,progress:getComputedStyle(el).getPropertyValue('--slider-progress').trim(),min:Number(el.min),max:Number(el.max),value:Number(el.value)}))
   assert(state.height>=44,`${route}: touch target`);assert(Math.abs(parseFloat(state.progress)-(state.value-state.min)/(state.max-state.min)*100)<1,`${route}: fill matches value`)
   if(await slider.isDisabled())continue
   await slider.scrollIntoViewIfNeeded();await slider.focus();await page.keyboard.press('Home');await expect(slider).toHaveValue(String(state.min))
   await page.keyboard.press('ArrowRight');assert(Number(await slider.inputValue())>state.min,`${route}: keyboard increments`)
   await page.keyboard.press('End');await expect(slider).toHaveValue(String(state.max))
  }
  assert(visible>0,`${route}: controls rendered`);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route}: no overflow`)
  if(['/moniac-machine/world','/code-for-build/prototype','/typeface','/studio'].includes(route)){
   const first=sliders.first();await first.scrollIntoViewIfNeeded();await first.fill(String(Math.round(Number(await first.getAttribute('min'))+(Number(await first.getAttribute('max'))-Number(await first.getAttribute('min')))*.5)));await page.waitForTimeout(200)
   const parent=route==='/moniac-machine/world'?page.locator('.physical-world-controls'):first.locator('..');await parent.screenshot({path:`${out}/${profile.name}-${route.split('/')[1]}.png`})
   if(route==='/moniac-machine/world'){
    const r=await first.boundingBox(),start={x:r.x+r.width/2,y:r.y+r.height/2},before=Number(await first.inputValue())
    if(profile.name==='chromium-mobile-dark'){
      const client=await context.newCDPSession(page);await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[start]});await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start.x+50,y:start.y}]});await page.waitForTimeout(180);await parent.screenshot({path:`${out}/${profile.name}-pressed.png`});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await client.detach()
    }else{await page.mouse.move(start.x,start.y);await page.mouse.down();await page.mouse.move(start.x+50,start.y,{steps:8});await page.waitForTimeout(180);await parent.screenshot({path:`${out}/${profile.name}-pressed.png`});await page.mouse.up()}
    assert(Number(await first.inputValue())>before,'glass thumb retains native drag behavior')
    if(profile.name==='chromium-desktop-light'){await page.emulateMedia({forcedColors:'active'});assert.equal(await first.evaluate(el=>getComputedStyle(el).appearance),'auto');await page.emulateMedia({forcedColors:'none'})}
   }

  }
  results.push({profile:profile.name,route,visible});console.log('PASS',profile.name,route,visible)
 }
 assert.deepEqual(errors,[]);await context.close()
 }finally{await browser.close()}
}
writeFileSync(out+`/report${process.env.QA_SLIDER_PROFILE?'-'+process.env.QA_SLIDER_PROFILE:''}.json`,JSON.stringify(results,null,2))
