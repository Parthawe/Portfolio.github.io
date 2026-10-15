import assert from 'node:assert/strict'
import {chromium,expect} from '@playwright/test'
import {writeFileSync,mkdirSync} from 'node:fs'
const base=process.env.QA_DEV_URL||'http://127.0.0.1:5211',out=process.env.QA_OUTPUT_DIR||'/tmp/enigma-tablet-edges'
mkdirSync(out,{recursive:true})
const browser=await chromium.launch(),errors=[],results=[]
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}})
 await context.addInitScript(()=>{
  localStorage.setItem('theme','dark');localStorage.setItem('portfolio-analytics-consent-v1','denied')
  window.__draws=0
  for(const key of['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced']){const orig=WebGL2RenderingContext.prototype[key];WebGL2RenderingContext.prototype[key]=function(...args){window.__draws++;return orig.apply(this,args)}}
 })
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.stack))
 const start=Date.now();await page.goto(`${base}/experience-preview/enigma`)
 const canvas=page.locator('.physical-world-stage canvas');await expect(canvas).toHaveAttribute('data-enigma-output','0',{timeout:30000});const firstResponseMs=Date.now()-start
 await page.getByRole('button',{name:'Draw on tablet',exact:true}).click();await page.waitForTimeout(1800);await canvas.scrollIntoViewIfNeeded()
 const corners=JSON.parse(await canvas.getAttribute('data-enigma-tablet')),box=await canvas.boundingBox()
 // Tablet view is normal to the surface; central pointer positions suffice for cancellation checks.
 const at=(u,v)=>({x:box.x+((corners[0][0]*(1-u)+corners[1][0]*u)*(1-v)+(corners[3][0]*(1-u)+corners[2][0]*u)*v)*box.width,y:box.y+((corners[0][1]*(1-u)+corners[1][1]*u)*(1-v)+(corners[3][1]*(1-u)+corners[2][1]*u)*v)*box.height})
 const input=()=>canvas.getAttribute('data-enigma-input')
 const before=await input()
 await canvas.evaluate((el,p)=>{const capture=el.setPointerCapture;el.setPointerCapture=()=>{};const send=(type,id,x,y)=>el.dispatchEvent(new PointerEvent(type,{pointerId:id,pointerType:'touch',button:0,buttons:1,bubbles:true,cancelable:true,clientX:x,clientY:y}));try{send('pointerdown',41,p.x,p.y);send('pointermove',41,p.x+10,p.y+10);send('pointerdown',42,p.x+20,p.y);send('pointermove',42,p.x+30,p.y);send('pointercancel',41,p.x,p.y)}finally{el.setPointerCapture=capture}},at(.5,.5))
 await page.waitForTimeout(100);assert.equal(await input(),before,'cancel restores pre-stroke ink; second pointer ignored');await expect(canvas).toHaveAttribute('data-enigma-strokes','0');results.push('Cancelled touch restores ink; secondary pointer cannot draw')
 const a=at(.3,.3),b=at(.7,.7);await page.mouse.move(a.x,a.y);await page.mouse.down();await page.mouse.move(b.x,b.y,{steps:15});await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.mouse.up();await page.waitForTimeout(100);assert.equal(await input(),before,'blur cancels unfinished stroke');results.push('Window blur safely cancels unfinished stroke')
 // Leaving the tablet breaks the stroke rather than joining across the surface on re-entry.
 const exitStart=at(.2,.2),outside=at(.5,-.3),reentry=at(.8,.8)
 await page.mouse.move(exitStart.x,exitStart.y);await page.mouse.down();await page.mouse.move(outside.x,outside.y);await page.mouse.move(reentry.x,reentry.y);await page.mouse.up();await expect(canvas).toHaveAttribute('data-enigma-strokes','1')
 assert.equal(JSON.parse(await input())[4*8+4],0,'re-entry does not draw a phantom connecting line')
 await page.getByRole('button',{name:'Clear drawing',exact:true}).click();await expect(canvas).toHaveAttribute('data-enigma-strokes','0');await canvas.scrollIntoViewIfNeeded();results.push('Leaving and re-entering the tablet does not bridge the gap')
 // A native stroke lights the grid before pointerup.
 await page.mouse.move(a.x,a.y);await page.mouse.down();const interactionStart=Date.now();await page.mouse.move(b.x,b.y,{steps:15});await expect.poll(input).not.toBe(before);const strokeGestureMs=Date.now()-interactionStart;await page.mouse.up();await expect(canvas).toHaveAttribute('data-enigma-strokes','1');results.push('Input lights update during an active stroke')
 await page.getByRole('button',{name:'Overview',exact:true}).click();await page.waitForTimeout(1800);await canvas.scrollIntoViewIfNeeded();await canvas.screenshot({path:`${out}/overview-ink.png`})
 await page.mouse.move(5,5);await page.waitForTimeout(7000);const idleBefore=await page.evaluate(()=>window.__draws);await page.waitForTimeout(1000);const idleDraws=(await page.evaluate(()=>window.__draws))-idleBefore;assert.equal(idleDraws,0,'idle scene stops rendering')
 await page.getByRole('button',{name:'Input A',exact:true}).focus();await page.keyboard.press('Enter');await expect(canvas).toHaveAttribute('data-enigma-output','0');results.push('Keyboard can label drawn input')
 await page.getByRole('button',{name:'Clear drawing',exact:true}).focus();await page.keyboard.press('Enter');await expect(canvas).toHaveAttribute('data-enigma-strokes','0')
 await page.getByLabel('Type a letter',{exact:true}).fill('A');await expect(canvas).toHaveAttribute('data-enigma-output','0');await expect(page.locator('.world-readout')).toContainText('Letter A:');results.push('Same-letter typed fallback works after drawing')
 await page.getByRole('button',{name:'Overhead',exact:true}).click();await page.waitForTimeout(800);await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(page.getByLabel('Inspect layer')).toHaveValue('0')
 await canvas.evaluate(el=>el.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());await expect(page.getByRole('button',{name:'Reload experience'})).toBeVisible();await page.getByLabel('Type a letter',{exact:true}).fill('Z');await expect(page.locator('.world-readout')).toContainText('Letter Z:');await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(canvas).toHaveAttribute('data-enigma-output','0');results.push('WebGL failure offers reload; typed fallback and reset recover')
 await page.goto(`${base}/experience-preview`);await expect(page.getByRole('heading',{level:1})).toBeVisible();await page.waitForTimeout(2600);const disposedBefore=await page.evaluate(()=>window.__draws);await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>window.__draws),disposedBefore,'no scene rendering after navigation')
 writeFileSync(`${out}/edge-report.json`,JSON.stringify({results,metrics:{firstResponseMs,strokeGestureMs,idleDraws},errors},null,2));assert.deepEqual(errors,[]);console.log(JSON.stringify({results,firstResponseMs,strokeGestureMs,idleDraws},null,2))
 await context.close()
}finally{await browser.close()}
