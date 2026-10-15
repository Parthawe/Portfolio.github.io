import assert from 'node:assert/strict'
import {chromium,webkit,expect} from '@playwright/test'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5210',out=process.env.QA_OUTPUT_DIR||'/tmp/jugal-additions'
mkdirSync(out,{recursive:true});const results=[],errors=[]
for(const [engine,width] of [[chromium,1440],[chromium,390],[webkit,390]]){
 const browser=await engine.launch()
 try{for(const theme of ['light','dark']){
 const context=await browser.newContext({viewport:{width,height:1000},hasTouch:width===390,reducedMotion:'reduce',recordVideo:engine===chromium&&width===1440&&theme==='dark'?{dir:out}:undefined})
 await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied');window.__soundStarts=0;window.__bufferStarts=0;const bufferStart=AudioBufferSourceNode.prototype.start;AudioBufferSourceNode.prototype.start=function(...args){window.__bufferStarts++;return bufferStart.apply(this,args)};const start=OscillatorNode.prototype.start;OscillatorNode.prototype.start=function(...args){window.__soundStarts++;return start.apply(this,args)}},theme)
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(`${base}/experience-preview/jugalbandi`);await expect(page.locator('.ja-tabs button')).toHaveCount(4)
 await page.getByRole('button',{name:/Rainsticks/}).click()
 await expect(page.locator('[data-moving^="stick-"]')).toHaveCount(8);await expect(page.locator('#ja-stick option')).toHaveCount(8)
 for(let i=0;i<8;i++){
  await page.locator('#ja-stick').selectOption(String(i));await page.getByRole('button',{name:'Turn the rainstick',exact:true}).click();await expect(page.locator(`[data-moving="stick-${i}"]`)).toHaveAttribute('transform',/matrix/)
  await expect(page.locator('.ja-status')).toContainText(`Rainstick ${i+1}: 65°`)
 }
 if(await page.getByRole('button',{name:'Show whole instrument',exact:true}).count())await page.getByRole('button',{name:'Show whole instrument',exact:true}).click()
 await page.getByRole('button',{name:'Reset',exact:true}).click();assert.equal(await page.locator('[data-moving][transform]').count(),0)
 await page.locator('.ja-workbench').screenshot({path:`${out}/${engine.name()}-${width}-${theme}-rain.png`})
 await page.getByRole('button',{name:/Hexa-18/}).click();await expect(page.getByRole('group',{name:'Hexa-18 sensor inputs'}).getByRole('button')).toHaveCount(18)
 for(let i=0;i<18;i++){await page.getByRole('button',{name:`Trigger sensor ${i+1}`,exact:true}).click();await expect(page.locator('.ja-caption output')).toContainText(`note ${60+i}`);await expect(page.getByRole('button',{name:`Trigger sensor ${i+1}`,exact:true})).toHaveAttribute('aria-pressed','true')}
 assert.equal(await page.evaluate(()=>window.__soundStarts),0,'no automatic audio')
 await page.getByRole('button',{name:'Enable sound',exact:true}).click();await page.getByRole('button',{name:'Trigger sensor 18',exact:true}).click();assert.equal(await page.evaluate(()=>window.__soundStarts),1,'one tone per sensor event')
 await page.getByRole('slider',{name:/Demo velocity/}).fill('24');await page.getByRole('button',{name:'Trigger selected sensor',exact:true}).click();await expect(page.locator('.ja-caption output')).toContainText('velocity 24')
 await page.getByRole('button',{name:'Trigger sensor 1',exact:true}).focus();await page.keyboard.press('Enter');await expect(page.locator('.ja-caption output')).toContainText('note 60')
 await page.getByRole('button',{name:'Inspect selected mechanism',exact:true}).click();await expect(page.locator('.ja-stage svg')).toHaveAttribute('viewBox','250 80 400 490');await page.getByRole('button',{name:'Show whole instrument',exact:true}).click()
 const sections=page.getByRole('group',{name:'Indian instrument sections'});await expect(sections.getByRole('button')).toHaveCount(3)
 for(const [name,voice] of[['Top · Flute','Flute'],['Sides · Tanpura','Tanpura'],['Inside · Tabla','Tabla']]){const tones=await page.evaluate(()=>window.__soundStarts),buffers=await page.evaluate(()=>window.__bufferStarts);await sections.getByRole('button',{name,exact:true}).click();await page.getByRole('button',{name:'Trigger selected sensor',exact:true}).click();await expect(page.locator('.ja-caption output')).toContainText(voice);assert.equal(await page.evaluate(()=>window.__soundStarts),tones+(voice==='Tanpura'?0:1));assert.equal(await page.evaluate(()=>window.__bufferStarts),buffers+(voice==='Tanpura'?1:0))}
 await page.locator('.ja-workbench').screenshot({path:`${out}/${engine.name()}-${width}-${theme}-hexa.png`})
 await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(page.getByRole('slider',{name:/Demo velocity/})).toHaveValue('96');await expect(page.getByRole('button',{name:'Enable sound',exact:true})).toBeVisible();await expect(page.locator('.ja-caption output')).toHaveText('At rest')
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no overflow');assert.equal(await page.locator('.ja canvas').count(),0,'no additional GPU scene')
 if(width===1440){await page.locator('.ja-stage svg').evaluate(el=>el.setAttribute('viewBox','350 230 140 140'));await page.locator('.ja-figure').screenshot({path:`${out}/detail-${theme}-hexa.png`})}
 results.push(`${engine.name()} ${width} ${theme}: eight rainstick mounts; 18 inputs, velocity, reset, keyboard, sound, mobile fit`)
 const video=page.video();await context.close();if(video)await video.saveAs(`${out}/interaction.webm`)
 }}finally{await browser.close()}
}
assert.deepEqual(errors,[]);writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2));console.log(results.join('\n'))
