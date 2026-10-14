import assert from 'node:assert/strict'
import { mkdirSync,writeFileSync } from 'node:fs'
import {chromium,webkit,expect} from '@playwright/test'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5210',out=process.env.QA_OUTPUT_DIR||'/tmp/jugalbandi-anatomy-qa'
mkdirSync(out,{recursive:true});const results=[],errors=[]
for(const [engine,name,width] of [[chromium,'desktop',1440],[chromium,'touch',390],[webkit,'webkit',390]]) {
 const browser=await engine.launch()
 try {for(const theme of ['light','dark']){
 const context=await browser.newContext({viewport:{width,height:1000},hasTouch:width===390,isMobile:width===390,recordVideo:name==='desktop'&&theme==='light'?{dir:`${out}/video`,size:{width:1440,height:1000}}:undefined})
 await context.addInitScript(theme=>localStorage.setItem('theme',theme),theme)
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message))
 await page.addInitScript(()=>{window.__soundStarts=0;for(const proto of [AudioBufferSourceNode.prototype,OscillatorNode.prototype]){const original=proto.start;proto.start=function(...args){window.__soundStarts++;return original.apply(this,args)}}})
 await page.goto(`${base}/experience-preview/jugalbandi`);await page.locator('.ja').waitFor();await page.evaluate(()=>document.fonts.ready)
 await page.locator('.ja-workbench').scrollIntoViewIfNeeded();await expect(page.locator('.ja-stage svg')).toBeVisible()
 assert.equal(await page.locator('.ja canvas').count(),0)
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1))
 await page.getByRole('button',{name:'Enable sound',exact:true}).click();await expect(page.getByRole('button',{name:'Sound on',exact:true})).toHaveAttribute('aria-pressed','true')
 await page.getByRole('button',{name:'Pluck selected string',exact:true}).click();await expect(page.locator('.ja-status')).toContainText('completed one pluck')
 assert.equal(await page.evaluate(()=>window.__soundStarts),1,'one sound per release')
 if(width===390){await page.getByRole('button',{name:'Pluck servo 3',exact:true}).tap();await expect(page.locator('.ja-status')).toContainText('Servo 3 completed')}
 const soundCount=await page.evaluate(()=>window.__soundStarts)
 await page.locator('.ja-workbench').screenshot({path:`${out}/${name}-${theme}-harp.png`})
 await page.getByRole('button',{name:/Automated flute/,exact:false}).click();await page.locator('.ja-workbench').scrollIntoViewIfNeeded()
 const finger=page.locator('[data-moving="finger-0"]'),before=await finger.getAttribute('transform');await page.getByRole('button',{name:'Hole 1',exact:true}).click();assert.notEqual(await finger.getAttribute('transform'),before)
 assert.equal(await page.evaluate(()=>window.__soundStarts),soundCount,'fingering without air is silent')
 await page.getByRole('button',{name:'Enable sound',exact:true}).click();await page.getByRole('button',{name:'Send an air pulse',exact:true}).click();await expect(page.locator('.ja-status')).toContainText('finished')
 assert.equal(await page.evaluate(()=>window.__soundStarts),soundCount+1)
 await page.locator('.ja-workbench').screenshot({path:`${out}/${name}-${theme}-flute.png`})
 await page.getByRole('button',{name:/Rainsticks/,exact:false}).click();await page.getByRole('button',{name:'Turn the rainstick',exact:true}).click();await expect(page.locator('.ja-stage')).toHaveAttribute('data-running','false');await expect(page.locator('[data-moving="stick-0"]')).toHaveAttribute('transform',/matrix/)
 await page.locator('.ja-workbench').screenshot({path:`${out}/${name}-${theme}-rain.png`})
 await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(page.locator('#ja-tilt')).toHaveValue('0');assert.equal(await page.locator('[data-moving][transform]').count(),0)
 await page.emulateMedia({reducedMotion:'reduce'});await page.getByRole('button',{name:/Mechanized harp/,exact:false}).click();await page.getByRole('button',{name:'Pluck servo 3',exact:true}).focus();await page.keyboard.press('Enter');await expect(page.locator('.ja-status')).toContainText('Servo 3 completed');await expect(page.locator('.ja-stage')).toHaveAttribute('data-running','false')
 await page.emulateMedia({reducedMotion:'no-preference'});await page.getByRole('button',{name:'Pluck selected string',exact:true}).click();await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));await expect(page.locator('.ja-stage')).toHaveAttribute('data-running','false')
 await page.locator('.ja-film summary').click();const video=page.locator('.ja-film video');await video.evaluate(v=>v.load());await expect.poll(()=>video.evaluate(v=>Number.isFinite(v.duration)&&v.duration>300)).toBe(true)
 await video.evaluate(v=>v.currentTime=180);await expect.poll(()=>video.evaluate(v=>v.readyState>=2)).toBe(true);await video.evaluate(v=>v.play());await page.locator('.ja-film summary').click();await expect.poll(()=>video.evaluate(v=>v.paused)).toBe(true)
 results.push(`${name} ${theme}: controls, audio causality, reset, keyboard, reduced motion, offscreen stop, original film, no overflow`)
 if(name==='desktop'){await page.locator('.ja-film summary').click();await page.getByRole('button',{name:'Inspect selected mechanism',exact:true}).click();await page.locator('.ja-figure').screenshot({path:`${out}/${name}-${theme}-closeup.png`})}
 const recording=page.video();await context.close();if(recording)await recording.saveAs(`${out}/interaction.webm`)
 }} finally{await browser.close()}
}
assert.deepEqual(errors,[]);writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2));console.log(results.join('\n'))
