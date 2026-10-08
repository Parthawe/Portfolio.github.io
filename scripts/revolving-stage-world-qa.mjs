import {chromium,expect} from '@playwright/test'
import assert from 'node:assert/strict'
import{mkdirSync}from'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5199',out='/tmp/portfolio-revolving-stage-qa';mkdirSync(out,{recursive:true})
const browser=await chromium.launch()
try{for(const profile of[{name:'desktop-light',width:1185,height:969,touch:false,theme:'light'},{name:'mobile-dark',width:390,height:844,touch:true,theme:'dark'}]){
 const context=await browser.newContext({viewport:profile,hasTouch:profile.touch,reducedMotion:'reduce'}),page=await context.newPage(),errors=[]
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
 await page.addInitScript(theme=>{localStorage.setItem('theme',theme);window.__draws=0;const original=WebGL2RenderingContext.prototype.drawElements;WebGL2RenderingContext.prototype.drawElements=function(...args){if(this.canvas.closest('.physical-world'))window.__draws++;return original.apply(this,args)}},profile.theme)
 await page.goto(base+'/revolving-stage/world');const canvas=page.locator('.physical-world-stage canvas');await canvas.waitFor();await canvas.scrollIntoViewIfNeeded();await page.waitForTimeout(1200)
 for(const [scene,angle]of[['Building','0'],['Corner','90'],['Garden','180']]){
  await page.getByRole('group',{name:'Stage scenes'}).getByRole('button',{name:scene,exact:true}).click();await expect(page.getByRole('slider',{name:'Stage rotation',exact:true})).toHaveValue(angle);await page.waitForTimeout(300);await canvas.screenshot({path:`${out}/${profile.name}-${scene}.png`})
 }
 await page.getByRole('slider',{name:'Show mechanism',exact:true}).fill('100');await page.getByRole('button',{name:'Overhead',exact:true}).click();await page.waitForTimeout(300);await canvas.screenshot({path:`${out}/${profile.name}-Mechanism.png`})
 await page.getByRole('button',{name:'Reset',exact:true}).click();await page.waitForTimeout(350)
 // Drag across a visible piece of the rectangular deck, using normalized coordinates.
 let dragged=false;const r=await canvas.boundingBox()
 for(const fy of[.73,.68,.64,.60])for(const fx of[.5,.6,.4]){
  if(dragged)break
  const start={x:r.x+r.width*fx,y:r.y+r.height*fy}
  if(profile.touch){const client=await context.newCDPSession(page);await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[start]});await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start.x+45,y:start.y}]});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await client.detach()}
  else{await page.mouse.move(start.x,start.y);await page.mouse.down();await page.mouse.move(start.x+45,start.y,{steps:8});await page.mouse.up()}
  dragged=Number(await page.getByRole('slider',{name:'Stage rotation',exact:true}).inputValue())>0
 }
 assert(dragged,'deck responds to pointer rotation')
 await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(page.getByRole('slider',{name:'Stage rotation',exact:true})).toHaveValue('0');await expect(page.getByRole('slider',{name:'Show mechanism',exact:true})).toHaveValue('0')
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.locator('.physical-world-controls').scrollIntoViewIfNeeded();await page.waitForTimeout(2500);const draws=await page.evaluate(()=>window.__draws);await page.waitForTimeout(700);assert.equal(await page.evaluate(()=>window.__draws),draws,'idle rendering stops')
 assert.equal(errors.length,0,errors.join('\n'));console.log('PASS',profile.name,{dragged,errors});await context.close()
}}finally{await browser.close()}
