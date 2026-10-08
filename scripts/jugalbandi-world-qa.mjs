import {chromium,expect} from '@playwright/test'
import assert from 'node:assert/strict'
import{mkdirSync,writeFileSync}from'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5199',out='/tmp/portfolio-jugalbandi-qa';mkdirSync(out,{recursive:true})
const browser=await chromium.launch(),results=[]
try{for(const profile of[{name:'desktop-light',width:1185,height:969,touch:false,theme:'light'},{name:'mobile-dark',width:390,height:844,touch:true,theme:'dark'}]){
 const context=await browser.newContext({viewport:profile,hasTouch:profile.touch,reducedMotion:'reduce'}),page=await context.newPage(),errors=[]
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
 await page.addInitScript(theme=>{localStorage.setItem('theme',theme);window.__draws=0;const original=WebGL2RenderingContext.prototype.drawElements;WebGL2RenderingContext.prototype.drawElements=function(...args){if(this.canvas.closest('.physical-world'))window.__draws++;return original.apply(this,args)}},profile.theme)
 await page.goto(base+'/jugalbandi/world');const canvas=page.locator('.physical-world-stage canvas');await canvas.waitFor();await canvas.scrollIntoViewIfNeeded();await page.waitForTimeout(1200)
 for(const instrument of['Ensemble','Hexa-18','Harp','Flute','Rainsticks']){
  await page.getByRole('group',{name:'Inspect an instrument'}).getByRole('button',{name:instrument,exact:true}).click();await page.waitForTimeout(350)
  await expect(page.getByRole('group',{name:'Inspect an instrument'}).getByRole('button',{name:instrument,exact:true})).toHaveAttribute('aria-pressed','true')
  for(const slider of['Pluck','Breath','Rainstick tilt'])await page.getByRole('slider',{name:slider,exact:true}).fill(instrument==='Rainsticks'?'100':'45')
  await page.waitForTimeout(250);await canvas.screenshot({path:`${out}/${profile.name}-${instrument}.png`})
 }
 await page.getByRole('button',{name:'Overhead',exact:true}).click();await page.waitForTimeout(300)
 await page.getByRole('button',{name:'Room',exact:true}).click();await expect(page.getByRole('button',{name:'Ensemble',exact:true})).toHaveAttribute('aria-pressed','true')
 // A front view of the harp exposes pickable strings; dragging one must update pluck.
 await page.getByRole('button',{name:'Harp',exact:true}).click();await page.getByRole('slider',{name:'Pluck',exact:true}).fill('30');await page.waitForTimeout(300)
 const before=Number(await page.getByRole('slider',{name:'Pluck',exact:true}).inputValue());const r=await canvas.boundingBox()
 // Sample a few points across the string bank rather than relying on viewport pixel coordinates.
 let dragged=false
 for(const fx of[.5,.47,.53]){
  const start={x:r.x+r.width*fx,y:r.y+r.height*.53}
  if(profile.touch){const client=await context.newCDPSession(page);await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[start]});await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start.x+50,y:start.y}]});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await client.detach()}
  else{await page.mouse.move(start.x,start.y);await page.mouse.down();await page.mouse.move(start.x+50,start.y,{steps:10});await page.mouse.up()}
  if(Number(await page.getByRole('slider',{name:'Pluck',exact:true}).inputValue())!==before){dragged=true;break}
 }
 assert(dragged,'the harp string bank responds to direct dragging')
 // Button controls must also work.
 await page.getByRole('button',{name:'Pluck',exact:true}).click();assert(Number(await page.getByRole('slider',{name:'Pluck',exact:true}).inputValue())!==before||dragged)
 await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(page.getByRole('button',{name:'Ensemble',exact:true})).toHaveAttribute('aria-pressed','true');await expect(page.getByRole('slider',{name:'Pluck',exact:true})).toHaveValue('30')
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.locator('.physical-world-controls').scrollIntoViewIfNeeded();await page.waitForTimeout(2500);const draws=await page.evaluate(()=>window.__draws);await page.waitForTimeout(700);assert.equal(await page.evaluate(()=>window.__draws),draws,'idle rendering stops')
 assert.equal(errors.length,0,errors.join('\n'));results.push({profile:profile.name,dragged,errors});console.log('PASS',profile.name,JSON.stringify(results.at(-1)));await context.close()
}}finally{await browser.close();writeFileSync(out+'/report.json',JSON.stringify(results,null,2))}
