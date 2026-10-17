import assert from 'node:assert/strict'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { chromium, webkit, expect } from '@playwright/test'
import { parseCaptions } from './caption-source-qa.mjs'
import { withoutDecorativeWebGL } from './visible-layout-qa.mjs'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5236'
const out = process.env.QA_OUTPUT_DIR || '/tmp/portfolio-caption-browser'
mkdirSync(out, {recursive:true})
const results = [], failures = []
const routes = ['/jugalbandi','/enigma','/shuffle','/drowning','/moniac-machine','/motion/vishwa-conclave-motion','/motion/editing-motion-stories','/the-omakase']
const seekChecks = {
  '/Assets/captions/jugalbandi.en.vtt': [[14.6, 'we have Parth.'], [274.2, 'Keep it going for Parth.'], [278, 'That was [unclear].'], [293, 'rainstick'], [297, 'tanpura']],
  '/Assets/captions/theme-release.en.vtt': [[21, '[unclear]'], [41, '[unclear]'], [47, 'Flap your wings'], [60, '[unclear]']],
}
for (const [engine, width, theme] of [[chromium,1440,'light'],[chromium,390,'dark'],[webkit,1440,'dark'],[webkit,390,'light']]) {
  const browser = await engine.launch()
  const context = await browser.newContext({viewport:{width,height:960},hasTouch:width<500,reducedMotion:'reduce',recordVideo:engine===chromium&&width===390?{dir:out}:undefined})
  await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme)
  const page = await context.newPage(), errors=[]
  page.on('pageerror',e=>errors.push(e.message))
  await withoutDecorativeWebGL(page)
  try {
    for (const route of routes) {
      await page.goto(base+route+'/')
      await page.locator('#main-content').waitFor({state:'attached',timeout:20000})
      if(route==='/the-omakase') await page.getByRole('button',{name:'Open the build and exhibition proof',exact:true}).click()
      const videos = page.locator('video[data-caption-status="automatic"]')
      await expect(videos).toHaveCount(route==='/motion/vishwa-conclave-motion'?5:route==='/motion/editing-motion-stories'?4:1,{timeout:15000})
      const count = await videos.count()
      assert.equal(count,route==='/motion/vishwa-conclave-motion'?5:route==='/motion/editing-motion-stories'?4:1,`${route}: automatic status retained for every original film`)
      for(const video of await videos.all()) {
        const track=video.locator('track[kind="captions"]'),src=await track.getAttribute('src')
        assert(src?.startsWith('/Assets/captions/'))
        const expected=parseCaptions(readFileSync('public'+src,'utf8'))
        const response=await page.request.get(base+src)
        assert(response.ok());assert.match(response.headers()['content-type'],/text\/vtt/)
        assert.equal(await response.text(),readFileSync('public'+src,'utf8'),'served captions equal reviewed asset')
        await video.scrollIntoViewIfNeeded()
        await video.evaluate(v=>{v.muted=true;v.preload='metadata';v.textTracks[0].mode='showing';v.load()})
        await expect.poll(()=>video.evaluate(v=>v.readyState>=1),{timeout:15000}).toBe(true)
        await expect.poll(()=>track.evaluate(t=>t.readyState===2),{timeout:10000}).toBe(true)
        const cues=await track.evaluate(t=>Array.from(t.track.cues||[]).map(c=>({start:c.startTime,end:c.endTime,text:c.text})))
        assert.deepEqual(cues.map(c=>c.text),expected.map(c=>c.text),'native browser parses every exact cue')
        assert(cues.every(c=>c.end<=expected.at(-1).end/1000+.0001))
        const seek=async(time,text)=>{
          await video.evaluate((v,time)=>{v.currentTime=time},time)
          await expect.poll(()=>track.evaluate(t=>Array.from(t.track.activeCues||[]).map(c=>c.text).join(' ').replaceAll('\n',' ')),{timeout:10000}).toContain(text)
        }
        for(const [time,text] of seekChecks[src]||[[.5,expected[0].text]]) await seek(time,text)
        const playbackStart = await video.evaluate(v=>v.currentTime)
        await video.evaluate(v=>v.play())
        await expect.poll(()=>video.evaluate(v=>v.currentTime),{timeout:10000}).toBeGreaterThan(playbackStart+.1)
        await video.evaluate(v=>v.pause())
        if(route==='/jugalbandi'){
          await seek(274.2,'Keep it going for Parth.')
          await expect.poll(()=>video.evaluate(v=>!v.seeking && v.readyState>=2),{timeout:10000}).toBe(true)
          await video.screenshot({path:`${out}/jugalbandi-${engine.name()}-${width}-${theme}.png`})
          const download=video.locator('..').getByRole('link',{name:/Download automatic captions/})
          await download.focus();await expect(download).toBeFocused();assert.equal(await download.getAttribute('href'),src)
        }
      }
      if(route==='/motion/vishwa-conclave-motion') {
        const source=page.locator('.vishwa-production-credit')
        await source.getByText('Read automatic captions',{exact:true}).click()
        await expect(source.locator('.campaign-transcript')).toContainText('Flap your wings')
        await expect(source.locator('.campaign-transcript')).toContainText('[unclear]')
        await expect(source.locator('.campaign-transcript')).not.toContainText('Slap your wings')
        await source.locator('.campaign-transcript').screenshot({path:`${out}/campaign-transcript-${engine.name()}-${width}-${theme}.png`})
      }
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no document overflow')
      console.log(`${engine.name()} ${width} ${route}: captions, seeking and muted playback passed`)
      results.push({engine:engine.name(),width,theme,route,tracks:count,status:'pass'})
    }
    assert.deepEqual(errors,[])
  }catch(error){failures.push({engine:engine.name(),width,theme,error:String(error),errors});await page.screenshot({path:`${out}/FAIL-${engine.name()}-${width}.png`}).catch(()=>{})}
  finally{await context.close();await browser.close()}
}
writeFileSync(`${out}/report.json`,JSON.stringify({base,results,failures},null,2))
console.log(JSON.stringify({checks:results.length,failures},null,2));assert.deepEqual(failures,[])
