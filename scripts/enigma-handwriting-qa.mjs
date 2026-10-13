import {chromium,expect} from '@playwright/test'
import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs'
import ts from 'typescript'
import {handwriting} from './enigma-handwriting-fixtures.mjs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5199'
const output='/tmp/portfolio-enigma-handwriting-qa';mkdirSync(output,{recursive:true})
const recognizer=ts.transpileModule(readFileSync('src/utils/letterRecognizer.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
const browser=await chromium.launch();const results=[];const errors=[]
try {
 const unit=await browser.newPage({reducedMotion:'reduce'});await unit.goto(base)
 const samples=await unit.evaluate(({code,fixtures})=>{
  const exports={};new Function('exports',code)(exports)
  const rows=[]
  for(const [expected,paths]of Object.entries(fixtures))for(const variant of[{x:20,y:20,sx:1.4,sy:1.4,width:5},{x:70,y:35,sx:.7,sy:1.1,width:4},{x:18,y:65,sx:1.3,sy:.85,width:6}]){
   const canvas=document.createElement('canvas');canvas.width=canvas.height=200
   const ctx=canvas.getContext('2d');ctx.translate(variant.x,variant.y);ctx.scale(variant.sx,variant.sy);ctx.lineWidth=variant.width;ctx.lineCap=ctx.lineJoin='round';ctx.strokeStyle='white';paths.forEach(path=>ctx.stroke(new Path2D(path)))
   const match=exports.classifyDrawing(exports.processDrawing(canvas));rows.push({expected,...variant,...match})
  }
  const blank=exports.classifyDrawing(new Float32Array(784));if(blank.letter||blank.confidence)throw new Error('blank accepted')
  return rows
 },{code:recognizer,fixtures:handwriting})
 writeFileSync(output+'/recognition.json',JSON.stringify(samples,null,2))
 const wrong=samples.filter(s=>s.letter!==s.expected);console.log('Recognition mismatches:',JSON.stringify(wrong.map(s=>({expected:s.expected,letter:s.letter,confidence:s.confidence,candidates:s.candidates}))))
 assert(samples.every(s=>s.candidates.some(c=>c.letter===s.expected)),'all fixtures have correct letter among suggestions')
 assert(samples.filter(s=>s.letter===s.expected).length>=samples.length*.9,'at least 90% fixture top matches')
 assert(wrong.every(s=>s.confidence<=.2),'incorrect fixture guesses require confirmation')
 await unit.close()
 for(const profile of[{name:'desktop-light',width:1185,height:969,touch:false,theme:'light'},{name:'mobile-dark',width:375,height:812,touch:true,theme:'dark'}]){
  const context=await browser.newContext({viewport:profile,hasTouch:profile.touch,reducedMotion:'reduce'});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(theme=>localStorage.setItem('theme',theme),profile.theme)
  await page.goto(base+'/enigma/world');const pad=page.getByLabel('Draw a capital letter');const letter=page.getByLabel('Letter',{exact:true});await pad.scrollIntoViewIfNeeded()
  const client=profile.touch?await context.newCDPSession(page):null
  const stroke=async path=>{
   const points=await pad.evaluate((canvas,path)=>{const r=canvas.getBoundingClientRect();const svg=document.createElementNS('http://www.w3.org/2000/svg','path');svg.setAttribute('d',path);const length=svg.getTotalLength();return Array.from({length:41},(_,i)=>{const p=svg.getPointAtLength(length*i/40);return{x:r.x+r.width*(.1+p.x*.008),y:r.y+r.height*(.1+p.y*.008)}})},path)
   if(client){await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[points[0]]});for(const p of points.slice(1))await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[p]});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})}
   else{await page.mouse.move(points[0].x,points[0].y);await page.mouse.down();for(const p of points.slice(1))await page.mouse.move(p.x,p.y);await page.mouse.up()}
  }
  for(const expected of['A','H','I','O','R','U','V','W','X','Z']){
   await page.getByRole('button',{name:'Clear drawing pad'}).click();for(const path of handwriting[expected])await stroke(path)
   await page.getByRole('button',{name:'Recognize',exact:true}).click()
   await expect(page.getByRole('button',{name:`Use ${expected}`,exact:true})).toBeVisible()
   await page.getByRole('button',{name:`Use ${expected}`,exact:true}).click();await expect(letter).toHaveValue(String(expected.charCodeAt(0)-65));results.push(profile.name+': '+expected)
  }
  await page.getByRole('button',{name:'Clear drawing pad'}).click()
  for(const path of handwriting.H)await stroke(path)
  await expect(letter).toHaveValue('7') // Automatic recognition after the final stroke.
  await expect(page.getByRole('button',{name:'Use H',exact:true})).toHaveAttribute('aria-pressed','true')
  await page.locator('.enigma-letter-input').screenshot({path:output+'/'+profile.name+'-drawn.png'})
  // Corrections, canvas scaling, clear races, reset and pointer cancellation.
  const matches=page.getByRole('group',{name:'Letter matches'});const correction=matches.getByRole('button').nth(1);const corrected=(await correction.textContent()).trim();await correction.click();await expect(letter).toHaveValue(String(corrected.charCodeAt(0)-65))
  await page.getByRole('button',{name:'Clear drawing pad'}).click();await stroke(handwriting.A[0]);await page.getByRole('button',{name:'Clear drawing pad'}).click();await page.waitForTimeout(1200);await expect(matches).toHaveCount(0)
  await pad.evaluate(canvas=>canvas.style.width='120px');for(const path of handwriting.H)await stroke(path);await page.getByRole('button',{name:'Recognize',exact:true}).click();await expect(page.getByRole('button',{name:'Use H',exact:true})).toBeVisible()
  await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(letter).toHaveValue('0');await expect(matches).toHaveCount(0)
  const box=await pad.boundingBox()
  if(client){await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x+20,y:box.y+20}]});await client.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]})}
  else{await page.mouse.move(box.x+20,box.y+20);await page.mouse.down();await pad.dispatchEvent('pointercancel',{pointerId:1});await page.mouse.up()}
  await page.waitForTimeout(1200);await expect(matches).toHaveCount(0);await expect(letter).toHaveValue('0')
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.locator('.enigma-letter-input').screenshot({path:output+'/'+profile.name+'.png'});await context.close()
 }
 assert.equal(errors.length,0,JSON.stringify(errors));console.log(`PASS: ${samples.length} recognition variants; ${results.length} mouse/touch letters; corrections, CSS scaling, clear and reset`)
}finally{await browser.close()}
