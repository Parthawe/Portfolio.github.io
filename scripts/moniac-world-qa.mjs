import{chromium,expect}from'@playwright/test'
import assert from'node:assert/strict'
import{mkdirSync}from'node:fs'
import{PerspectiveCamera,Vector3}from'three'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5199',out='/tmp/portfolio-moniac-qa';mkdirSync(out,{recursive:true})
const browser=await chromium.launch()
try{for(const profile of[{name:'desktop-light',width:1185,height:969,touch:false,theme:'light'},{name:'mobile-dark',width:390,height:844,touch:true,theme:'dark'}]){
 const context=await browser.newContext({viewport:profile,hasTouch:profile.touch,reducedMotion:'reduce'}),page=await context.newPage(),errors=[]
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
 await page.addInitScript(theme=>{localStorage.setItem('theme',theme);window.__draws=0;const original=WebGL2RenderingContext.prototype.drawElements;WebGL2RenderingContext.prototype.drawElements=function(...args){if(this.canvas.closest('.physical-world'))window.__draws++;return original.apply(this,args)}},profile.theme)
 await page.goto(base+'/moniac-machine/world');const canvas=page.locator('.physical-world-stage canvas');await canvas.waitFor();await canvas.scrollIntoViewIfNeeded();await page.waitForTimeout(1200)
 for(const view of['Room','Object','Overhead']){await page.getByRole('button',{name:view,exact:true}).click();await page.waitForTimeout(300);await canvas.screenshot({path:`${out}/${profile.name}-${view}.png`})}
 let r=await canvas.boundingBox();const camera=new PerspectiveCamera(r.width<600?50:40,r.width/r.height,.05,60);camera.position.set(0,1.1+6.9*Math.cos(.01),6.9*Math.sin(.01));camera.lookAt(0,1.1,0);camera.updateMatrixWorld()
 const point=(x,y,z)=>{const p=new Vector3(x,y,z).project(camera);return{x:r.x+(p.x+1)/2*r.width,y:r.y+(1-p.y)/2*r.height}}
 const drag=async start=>{if(profile.touch){const client=await context.newCDPSession(page);await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[start]});await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start.x+45,y:start.y}]});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await client.detach()}else{await page.mouse.move(start.x,start.y);await page.mouse.down();await page.mouse.move(start.x+45,start.y,{steps:8});await page.mouse.up()}}
 for(const [name,x,z]of[['Tax',-.50,-.04],['Consumption',.12,-.04],['Spending',-.22,.25],['Investment',.53,.25],['Imports',.12,.54],['Exports',.53,.78]]){
  const slider=page.getByRole('slider',{name,exact:true}),before=Number(await slider.inputValue());await drag(point(x,.44,z));assert(Number(await slider.inputValue())>before,`${name}: visible wheel responds to dragging`)
 }
 await page.getByRole('slider',{name:'Interest',exact:true}).fill('100')
 await canvas.scrollIntoViewIfNeeded();r=await canvas.boundingBox()
 const start=point(-.53,.305,.78);if(profile.touch)await page.touchscreen.tap(start.x,start.y);else await page.mouse.click(start.x,start.y)
 await expect(page.getByRole('slider',{name:'Interest',exact:true})).toHaveValue('25');await expect(page.getByRole('slider',{name:'Tax',exact:true})).toHaveValue('30')
 for(const name of['Tax','Spending','Interest','Investment','Consumption','Imports','Exports'])await page.getByRole('slider',{name,exact:true}).fill('100')
 await page.getByRole('button',{name:'Object',exact:true}).click();await page.waitForTimeout(300);await canvas.screenshot({path:`${out}/${profile.name}-Policy.png`})
 await page.getByRole('button',{name:'Reset',exact:true}).click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.locator('.physical-world-controls').scrollIntoViewIfNeeded();await page.waitForTimeout(2500);const draws=await page.evaluate(()=>window.__draws);await page.waitForTimeout(700);assert.equal(await page.evaluate(()=>window.__draws),draws,'idle rendering stops')
 assert.equal(errors.length,0,errors.join('\n'));console.log('PASS',profile.name,'six valve drags, physical reset, sliders, views, overflow, idle');await context.close()
}}finally{await browser.close()}
