import {chromium,webkit,expect} from '@playwright/test'
import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211',out=process.env.QA_OUTPUT_DIR||'docs/reviews/omakase-arcade'
mkdirSync(out,{recursive:true})
const results=[]
for(const engine of [chromium,webkit]) for(const mobile of [false,true]) {
 const browser=await engine.launch();const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1100},hasTouch:mobile,reducedMotion:'reduce',recordVideo:{dir:out+'/video',size:{width:960,height:720}}})
 const page=await context.newPage(),errors=[],hostRequests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.url().includes('itch.zone')||r.url().includes('itch.io/embed-upload'))hostRequests.push(r.url())})
 try{
  await page.goto(base+'/experience-preview?kind=tools');await expect(page.getByRole('heading',{name:'The Omakase',exact:true})).toBeVisible();await page.getByRole('button',{name:/^Games/}).click();await expect(page.locator('.experience-review-card')).toHaveCount(2)
  await page.getByRole('searchbox').fill('omakasi');await expect(page.locator('.experience-review-card')).toHaveCount(1);await page.locator('.experience-review-card').click();await expect(page.getByRole('heading',{name:'The Omakase',exact:true})).toBeVisible()
  assert.equal(hostRequests.length,0,'no remote game before start');await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveAttribute('content',/frame-src[^;]*https:\/\/itch\.io\/embed-upload\/11124779/);await expect(page.locator('.om-keys kbd')).toHaveCount(16);assert.equal(await page.locator('iframe').count(),0)
  await page.getByText('How to play & keyboard layout',{exact:true}).click();await expect(page.locator('.om-rules')).toContainText('five-second cooldown');await expect(page.locator('.om-player').first()).toContainText('Q');await expect(page.locator('.om-player').last()).toContainText('I')
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow')
  await page.locator('.om-cabinet').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${engine.name()}-${mobile?'mobile':'desktop'}.png`,fullPage:true})
  // Exercise lifecycle and failure recovery with a controlled unreachable hosted build.
  await page.route('https://itch.io/embed-upload/**',r=>r.abort());await page.getByRole('button',{name:'Start original game'}).click();await expect(page.locator('.om-screen iframe')).toHaveAttribute('src',/11124779/);await page.getByRole('button',{name:'Reload game'}).click();await expect(page.locator('.om-screen iframe')).toHaveCount(1);await page.getByRole('button',{name:'Stop game',exact:true}).click();await expect(page.locator('.om-screen iframe')).toHaveCount(0);await expect(page.getByRole('button',{name:'Start original game'})).toBeFocused()
  await page.getByRole('button',{name:/Switch to .* mode/}).click();await page.screenshot({path:`${out}/${engine.name()}-${mobile?'mobile':'desktop'}-alternate-theme.png`,fullPage:true})
  await page.getByRole('link',{name:'All drafts',exact:true}).first().click();assert(new URL(page.url()).searchParams.get('kind')==='games');await expect(page.getByRole('searchbox')).toHaveValue('omakasi');assert.deepEqual(errors,[])
  results.push({browser:engine.name(),mobile,overflow:false,lazyGame:true,listingAndSearch:'pass',keyboardGuide:'pass',stopAndReload:'pass',themeToggle:'pass',directoryContext:'pass',errors})
 }finally{await context.close();await browser.close()}
}
writeFileSync(out+'/report.json',JSON.stringify(results,null,2));console.log(results)
