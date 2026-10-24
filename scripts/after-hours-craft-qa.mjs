import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5232'
const output=process.env.QA_OUTPUT_DIR||'/workspace/portfolio-handoff/review/after-hours-v4'
await mkdir(output,{recursive:true})
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']})
const results=[],errors=[]
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'})
 await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort())
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/after-hours')
 await page.locator('canvas').scrollIntoViewIfNeeded()
 const bounds=await page.locator('canvas').boundingBox(),x=bounds.x+bounds.width*.7,y=bounds.y+bounds.height*.4
 await page.mouse.move(x,y);await page.keyboard.down('Control');await page.mouse.wheel(0,-100);await page.keyboard.up('Control');await page.waitForTimeout(100)
 const camera=(await page.locator('.ah-world').getAttribute('data-camera')).split(',').map(Number),next=Math.min(3.6,1.8*Math.exp(.3))
 const expected=[bounds.width*.2/1.8-bounds.width*.2/next,-bounds.height*.1/1.8+bounds.height*.1/next]
 assert(camera.every((n,i)=>Math.abs(n-expected[i])<1.1),'wheel zoom preserves the cursor world point')
 for(let i=0;i<7&&await page.getByRole('button',{name:'Zoom in',exact:true}).isEnabled();i++)await page.getByRole('button',{name:'Zoom in',exact:true}).click()
 assert.equal(await page.locator('output').innerText(),'360%')
 results.push({anchoredWheelZoom:true,closeViewZoom:'360%',camera,expected})
 await page.screenshot({path:`${output}/closeup-light.png`,fullPage:true})
 await page.getByRole('button',{name:'Return to start',exact:true}).click()
 await page.evaluate(()=>document.documentElement.dataset.theme='dark');await page.waitForTimeout(100)
 await page.screenshot({path:`${output}/desktop-dark.png`,fullPage:true})
 for(const theme of ['light','dark']){
  await page.evaluate(theme=>{document.documentElement.dataset.theme=theme;document.body.style.zoom='2'},theme);await page.waitForTimeout(100)
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'200% CSS zoom reflows without horizontal page overflow')
  await page.screenshot({path:`${output}/reflow-200-${theme}.png`,fullPage:true})
 }
 results.push({reflow200PercentCssZoom:true});await page.evaluate(()=>document.body.style.zoom='')
 await page.getByRole('button',{name:'Return to start',exact:true}).click()
 for(let i=0;i<12&&await page.getByRole('button',{name:'Zoom out',exact:true}).isEnabled();i++)await page.getByRole('button',{name:'Zoom out',exact:true}).click()
 await page.getByRole('button',{name:'Play animation',exact:true}).click();await page.locator('canvas').scrollIntoViewIfNeeded();await page.waitForTimeout(200)
 const runtimeStart=await page.locator('.ah-world').evaluate(e=>({frames:Number(e.dataset.frames),time:performance.now()})),runtimeSamples=[]
 for(let i=0;i<40;i++){runtimeSamples.push(await page.locator('.ah-world').evaluate(e=>Number(e.dataset.drawMs)));await page.waitForTimeout(50)}
 const runtimeEnd=await page.locator('.ah-world').evaluate(e=>({frames:Number(e.dataset.frames),time:performance.now()}))
 assert(runtimeEnd.frames>runtimeStart.frames+10,'the wide overview continues rendering in real animation frames')
 results.push({wideViewRuntime:{zoom:await page.locator('output').innerText(),durationMs:runtimeEnd.time-runtimeStart.time,frames:runtimeEnd.frames-runtimeStart.frames,drawSamplesMs:runtimeSamples}})
 await page.getByRole('button',{name:'Pause animation',exact:true}).click()
 await page.screenshot({path:`${output}/wide-overview-dark.png`,fullPage:true})
 const render=await page.evaluate(async()=>{
  const {createWorldRenderer,ROOMS}=await import('/src/components/after-hours/world.ts')
  const original=document.createElement.bind(document);let count=0
  document.createElement=function(name,...args){if(name==='canvas')count++;return original(name,...args)}
  try{
   const renderer=createWorldRenderer(),canvas=original('canvas');canvas.width=1200;canvas.height=800;const c=canvas.getContext('2d')
   renderer.draw(c,1200,800,{x:0,y:0,zoom:1},1000,{col:0,row:0},false);const first=count
   renderer.draw(c,1200,800,{x:0,y:0,zoom:1},1000,{col:0,row:0},true);const afterTheme=count
   const samples=[];for(let i=0;i<12;i++){const start=performance.now();renderer.draw(c,1200,800,{x:0,y:0,zoom:.55},1000+i*100,{col:0,row:0},false);samples.push(performance.now()-start)}
   renderer.draw(c,1200,800,{x:0,y:0,zoom:.55},1000,{col:0,row:0},true);const frame=c.getImageData(0,0,1200,800).data
   renderer.draw(c,1200,800,{x:0,y:0,zoom:.55},1800,{col:0,row:0},true);const later=c.getImageData(0,0,1200,800).data
   let overviewChangedPixels=0;for(let i=0;i<frame.length;i+=4)if(Math.abs(frame[i]-later[i])+Math.abs(frame[i+1]-later[i+1])+Math.abs(frame[i+2]-later[i+2])>30)overviewChangedPixels++
   const total=count;renderer.dispose()
   const atlas=original('div');atlas.style.cssText='display:grid;grid-template-columns:repeat(4,360px);gap:12px;padding:20px;background:#ebe8da;color:#34483c;font:14px serif'
   for(const dark of [false,true])for(let type=0;type<8;type++){
    let cell;outer:for(let col=-4;col<=4;col++)for(let row=-4;row<=4;row++){const {roomType}=await import('/src/components/after-hours/world.ts');if(roomType(col,row)===type){cell={col,row};break outer}}
    const {point}=await import('/src/components/after-hours/world.ts'),p=point(cell.col,cell.row),tile=original('div'),caption=original('p'),image=original('canvas');image.width=720;image.height=480;image.style.cssText='width:360px;height:240px;display:block';const ctx=image.getContext('2d');ctx.scale(2,2)
    const r=createWorldRenderer();r.draw(ctx,360,240,{...p,zoom:1.25},3400,cell,dark);r.dispose();caption.textContent=`${ROOMS[type].name} / ${dark?'night':'day'}`;tile.append(image,caption);atlas.append(tile)
   }
   document.body.replaceChildren(atlas);document.body.style.margin='0'
   return {cachedPlates:first,afterTheme,totalAfterZoom:total,lowZoomDrawSamplesMs:samples,overviewChangedPixels}
  }finally{document.createElement=original}
 })
 assert.equal(render.cachedPlates,8);assert.equal(render.afterTheme,8);assert.equal(render.totalAfterZoom,16);assert(render.overviewChangedPixels>1000,'the overview still visibly animates after a theme change')
 await page.setViewportSize({width:1520,height:1200});await page.screenshot({path:`${output}/all-workshops.png`,fullPage:true});results.push({sharedStaticCache:true,...render})
 await context.close()
 const mobile=await browser.newContext({viewport:{width:390,height:900},hasTouch:true,isMobile:true,reducedMotion:'reduce'})
 const touch=await mobile.newPage();touch.on('pageerror',e=>errors.push(e.message));await touch.goto(base+'/after-hours');await touch.locator('canvas').scrollIntoViewIfNeeded()
 const cdp=await mobile.newCDPSession(touch)
 async function drag(){
  const b=await touch.locator('canvas').boundingBox(),tx=b.x+b.width/2,ty=Math.max(180,Math.min(650,b.y+b.height*.65))
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:tx,y:ty}]})
  for(let i=1;i<=8;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:tx,y:ty-i*16}]});await touch.waitForTimeout(25)}
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await touch.waitForTimeout(250)
 }
 let start=await touch.evaluate(()=>scrollY);await drag();const after=await touch.evaluate(()=>scrollY)
 assert(after>start+30,'page scrolls when swiping the canvas before touch exploration')
 assert.equal(await touch.locator('.ah-world').getAttribute('data-camera'),'0,0')
 await touch.getByRole('button',{name:'Explore by touch',exact:true}).click();await touch.locator('canvas').scrollIntoViewIfNeeded();await touch.waitForTimeout(100)
 start=await touch.evaluate(()=>scrollY);await drag();assert.equal(await touch.evaluate(()=>scrollY),start);assert.notEqual(await touch.locator('.ah-world').getAttribute('data-camera'),'0,0')
 await touch.getByRole('button',{name:'Finish exploring',exact:true}).click();await touch.locator('canvas').scrollIntoViewIfNeeded();await touch.waitForTimeout(100)
 start=await touch.evaluate(()=>scrollY);await drag();assert(await touch.evaluate(()=>scrollY)>start+30,'page scrolling returns after finishing exploration')
 results.push({realTouchScrollBefore:true,touchExplorePansWithoutPageScroll:true,realTouchScrollAfter:true})
 await mobile.close()
 assert.equal(errors.length,0)
}finally{await browser.close();await writeFile(`${output}/craft-qa.json`,JSON.stringify({results,pageErrors:errors},null,2)+'\n')}
console.log(JSON.stringify({cases:results.length,pageErrors:errors,results}))
