import {chromium,expect} from '@playwright/test'
import assert from 'node:assert/strict'
const browser=await chromium.launch()
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce',hasTouch:true})
 for(const [slug,control,start,finish] of [['revolving-stage','Stage rotation',[.50,.70],[.59,.66]],['sea-of-salt','Mill turns',[.57,.40],[.55,.36]]]){
 await page.goto('http://127.0.0.1:5201/experience-preview/'+slug)
 const canvas=page.locator('.physical-world-stage canvas');await expect(canvas).toBeVisible({timeout:30000});await canvas.scrollIntoViewIfNeeded();await page.waitForTimeout(200)
 // Fractions identify the visible deck and mill handle in their default camera views.
 const b=await canvas.boundingBox(),slider=page.getByRole('slider',{name:control,exact:true}),before=await slider.inputValue()
 const client=await page.context().newCDPSession(page)
 await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:b.x+b.width*start[0],y:b.y+b.height*start[1]}]})
 for(let step=1;step<=8;step++)await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:b.x+b.width*(start[0]+(finish[0]-start[0])*step/8),y:b.y+b.height*(start[1]+(finish[1]-start[1])*step/8)}]})
 await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await client.detach()

 const after=await slider.inputValue();console.log(slug,before,'→',after);assert.notEqual(after,before,'direct manipulation changes the corresponding control')
 }
}finally{await browser.close()}
