import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
import {chromium,webkit,expect} from '@playwright/test'
const base=process.env.QA_DEV_URL||'http://127.0.0.1:5211',out=process.env.QA_OUTPUT_DIR||'/tmp/enigma-tablet-qa'
mkdirSync(out,{recursive:true})
const results=[],errors=[]
// Projective mapping from the tablet's four displayed corners, not viewport guesses.
function project(corners,u,v){
 const [p0,p1,p2,p3]=corners,dx1=p1[0]-p2[0],dx2=p3[0]-p2[0],dx3=p0[0]-p1[0]+p2[0]-p3[0],dy1=p1[1]-p2[1],dy2=p3[1]-p2[1],dy3=p0[1]-p1[1]+p2[1]-p3[1],det=dx1*dy2-dx2*dy1,g=(dx3*dy2-dx2*dy3)/det,h=(dx1*dy3-dx3*dy1)/det
 return [((p1[0]-p0[0]+g*p1[0])*u+(p3[0]-p0[0]+h*p3[0])*v+p0[0])/(g*u+h*v+1),((p1[1]-p0[1]+g*p1[1])*u+(p3[1]-p0[1]+h*p3[1])*v+p0[1])/(g*u+h*v+1)]
}
for(const engine of [chromium,webkit]){
 const browser=await engine.launch()
 try{for(const profile of [{width:1440,height:1000,theme:'dark',touch:false},{width:390,height:844,theme:'light',touch:true}]){
  const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},hasTouch:profile.touch,reducedMotion:'reduce',recordVideo:{dir:out}})
  await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},profile.theme)
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message))
  await page.goto(`${base}/experience-preview/enigma`)
  const canvas=page.locator('.physical-world-stage canvas')
  await expect(canvas).toHaveAttribute('data-enigma-output','0',{timeout:30000})
  await page.getByRole('button',{name:'Draw on tablet',exact:true}).click()
  await expect(canvas).toHaveAttribute('data-enigma-output','')
  await page.waitForTimeout(300);await canvas.scrollIntoViewIfNeeded()
  const points=async path=>{await expect(canvas).toHaveAttribute('data-enigma-camera','ready');const expected=await page.getByLabel('Inspect layer',{exact:true}).inputValue();await expect(canvas).toHaveAttribute('data-enigma-view',expected);const corners=JSON.parse(await canvas.getAttribute('data-enigma-tablet')),box=await canvas.boundingBox();return path.map(([u,v])=>{const [x,y]=project(corners,u,v);return {x:box.x+x*box.width,y:box.y+y*box.height}})}
  const stroke=async path=>{
   const positions=await points(path)
   if(profile.touch&&engine===chromium){const cdp=await context.newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...positions[0],id:1}]});for(const position of positions.slice(1))await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...position,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await cdp.detach()}
   else if(profile.touch){await canvas.evaluate((el,positions)=>{const dispatch=(type,p)=>el.dispatchEvent(new PointerEvent(type,{pointerId:81,pointerType:'touch',isPrimary:true,bubbles:true,cancelable:true,button:0,buttons:type==='pointerup'?0:1,clientX:p.x,clientY:p.y})); // WebKit automation cannot dispatch a native drag touch; suppress capture only for this synthetic pointer.
    const capture=el.setPointerCapture;el.setPointerCapture=()=>{};try{dispatch('pointerdown',positions[0]);positions.slice(1).forEach(p=>dispatch('pointermove',p));dispatch('pointerup',positions.at(-1))}finally{el.setPointerCapture=capture}},positions)}
   else {await page.mouse.move(positions[0].x,positions[0].y);await page.mouse.down();for(const p of positions.slice(1))await page.mouse.move(p.x,p.y,{steps:5});await page.mouse.up()}
  }
  const input=async()=>JSON.parse(await canvas.getAttribute('data-enigma-input'))
  assert((await input()).every(n=>n===0),'draw view starts blank')
  await stroke([[.2,.8],[.5,.15],[.8,.8]])
  await expect(canvas).toHaveAttribute('data-enigma-strokes','1')
  const first=await input();assert(first.some(n=>n>0),'ink activates input lights');assert(first.some(n=>n===0),'ink preserves unlit cells')
  await stroke([[.3,.6],[.7,.6]])
  await expect(canvas).toHaveAttribute('data-enigma-strokes','2')
  const second=await input();assert.notDeepEqual(second,first,'second stroke changes light grid')
  await page.getByRole('button',{name:'Input A',exact:true}).click();await expect(canvas).toHaveAttribute('data-enigma-output','0');assert.deepEqual(await input(),second,'labelling preserves real ink')
  await canvas.scrollIntoViewIfNeeded();await stroke([[.15,.9],[.85,.9]])
  await expect(canvas).toHaveAttribute('data-enigma-output','')
  await page.getByRole('button',{name:'Clear drawing',exact:true}).click();await expect(canvas).toHaveAttribute('data-enigma-strokes','0');assert((await input()).every(n=>n===0),'clear turns off every input light')
  // Drawing in the original oblique view uses the same UV mapping.
  await page.getByRole('button',{name:'Overview',exact:true}).click();await page.waitForTimeout(250);await canvas.scrollIntoViewIfNeeded();await stroke([[.25,.25],[.75,.75]])
  await expect(canvas).toHaveAttribute('data-enigma-strokes','1');assert((await input()).some(n=>n>0))
  await page.getByRole('button',{name:'Draw on tablet',exact:true}).click();await page.waitForTimeout(250)
  await page.getByLabel('Type a letter',{exact:true}).fill('z');await expect(canvas).toHaveAttribute('data-enigma-output','25')
  await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(canvas).toHaveAttribute('data-enigma-output','0');await expect(page.getByLabel('Type a letter',{exact:true})).toHaveValue('A')
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow')
  const colors=await page.locator('.physical-world').evaluate(el=>['--world-bg','--world-ink','--world-muted','--world-rule','--world-selected','--world-accent'].map(name=>getComputedStyle(el).getPropertyValue(name).trim()))
  assert(colors.every(color=>/^#([0-9a-f])\1\1$|^#([0-9a-f]{2})\2\2$/i.test(color)),`neutral UI: ${colors}`)
  await page.getByRole('button',{name:'Draw on tablet',exact:true}).click();await page.waitForTimeout(200);await canvas.scrollIntoViewIfNeeded();await stroke([[.2,.8],[.5,.15],[.8,.8]]);await stroke([[.3,.6],[.7,.6]])
  await page.screenshot({path:`${out}/${engine.name()}-${profile.width}-${profile.theme}.png`,fullPage:true})
  results.push({engine:engine.name(),...profile,checks:'drawing, multiple strokes, live lights, explicit label, relabel after edit, clear, oblique coordinates, typed fallback, reset, monochrome, viewport'})
  const video=page.video();await context.close();await video.saveAs(`${out}/${engine.name()}-${profile.width}-${profile.theme}.webm`)
 }}finally{await browser.close()}
}
assert.deepEqual(errors,[])
writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2));console.log(JSON.stringify(results,null,2))
