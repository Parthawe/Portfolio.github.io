import { verifyRaahiPrivateEntry } from './raahi-private-entry-assertions.mjs'
import {chromium,webkit,expect} from '@playwright/test'
import assert from 'node:assert/strict'
import {mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_DEV_URL||'http://127.0.0.1:5201',out=process.env.QA_OUTPUT_DIR||'/tmp/portfolio-draft-level/fidelity'
mkdirSync(out,{recursive:true})
const slugs=['typeface','atps','enigma','jugalbandi','moniac-machine','revolving-stage','sea-of-salt','black-hole','mentra','mentra-miniapps','clawed-chat','executivelens','org-dashboard','healthapp','vj-software','code-for-build','ballah-code','raahi-project']
const browser=await chromium.launch(),results=[],errors=[],startup=[]
try{
for(const slug of slugs){
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',recordVideo:{dir:`${out}/${slug}`}})
 await context.addInitScript(()=>{if(window.top===window){localStorage.setItem('portfolio-analytics-consent-v1','denied');localStorage.setItem('theme','light')}})
 const page=await context.newPage();page.on('pageerror',e=>errors.push(`${slug}: ${e.message}`))
 await page.route('https://www.figma.com/embed?*',r=>r.fulfill({contentType:'text/html',body:'<p>Frame load test; live Figma not tested</p>'}))
 await page.goto(`${base}/experience-preview/${slug}`)
 await expect(page.getByRole('navigation',{name:'More project experiences'})).toContainText('Continue exploring')
 if(['enigma','jugalbandi','revolving-stage','sea-of-salt','black-hole'].includes(slug))await expect(page.locator('.physical-world-stage canvas')).toBeVisible()
 if(slug==='typeface')await expect(page.locator('[data-glyph-outline]')).toBeVisible();else if(slug==='atps')await expect(page.locator('audio')).toBeVisible();else if(slug==='moniac-machine')await expect(page.getByRole('button',{name:'Start Economy',exact:true})).toBeVisible();else if(!['raahi-project','enigma','jugalbandi','revolving-stage','sea-of-salt','black-hole'].includes(slug))await expect(page.locator('[data-prototype]')).toBeVisible();
 startup.push({slug,...await page.evaluate(()=>({readyMs:Math.round(performance.now()),localEncodedBytes:performance.getEntriesByType('resource').filter(entry=>new URL(entry.name).origin===location.origin).reduce((sum,entry)=>sum+(entry.encodedBodySize||0),0)}))});
 switch(slug){
 case 'typeface':
  await expect(page.locator('[data-glyph-outline]')).toBeVisible();await page.getByLabel('Show measured glyph guides').check();await expect(page.locator('.tw-svg')).toContainText('Baseline');await page.getByLabel('Move attached handles with anchors').uncheck();await page.getByLabel('Move attached handles with anchors').check();break
 case 'atps':
  await page.getByLabel('Playback speed').selectOption('1.5');assert.equal(await page.locator('audio').evaluate(el=>el.playbackRate),1.5);await page.getByRole('button',{name:'Next recording',exact:true}).click();assert.equal(await page.locator('audio').evaluate(el=>el.playbackRate),1.5);await page.getByRole('button',{name:'Previous recording',exact:true}).click();break
 case 'enigma':
  for(const char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'){await page.getByLabel('Type a letter',{exact:true}).fill(char);await expect(page.locator('.world-readout')).toContainText(`Letter ${char}:`)}
  for(const value of['1','2','3','0'])await page.getByLabel('Inspect layer').selectOption(value);await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(page.getByLabel('Type a letter',{exact:true})).toHaveValue('A');break
 case 'jugalbandi':
  await page.getByLabel('Inspect an instrument').selectOption('2');await page.getByLabel('Selected string').selectOption('17');await page.getByRole('checkbox',{name:'Enable synthesized sound'}).check();await page.getByRole('button',{name:'Pluck string',exact:true}).click();await expect(page.getByRole('slider',{name:'String actuation',exact:true})).not.toHaveValue('30');await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(page.getByLabel('Enable synthesized sound')).not.toBeChecked();break
 case 'moniac-machine':
  await page.getByRole('button',{name:/Start/}).first().click();await page.getByRole('button',{name:'Explore rules without shocks'}).click();await page.getByRole('button',{name:'Run one model step'}).click();await expect(page.locator('.moniac-step-results tbody tr')).toHaveCount(4);await page.getByRole('button',{name:'Resume game'}).click();await expect(page.getByRole('button',{name:'Run one model step'})).toHaveCount(0);await expect(page.locator('.moniac-step-results')).toHaveCount(0);await page.getByRole('button',{name:'Pause game'}).click();break
 case 'revolving-stage':
  await page.getByRole('button',{name:'Garden',exact:true}).click();await expect(page.getByRole('img',{name:'Measured stage footprint at 180 degrees'})).toBeVisible();await page.getByRole('button',{name:'Cutaway',exact:true}).click();await expect(page.locator('.world-readout')).toContainText('16 casters');break
 case 'sea-of-salt':
  await page.getByRole('button',{name:'Turn clockwise ¼ turn'}).click();await expect(page.getByRole('slider',{name:'Mill turns'})).toHaveValue('6.25');await page.getByRole('button',{name:'Turn backward ¼ turn'}).click();await expect(page.getByRole('slider',{name:'Mill turns'})).toHaveValue('0');await expect(page.locator('.world-readout')).toContainText('Salt accumulated through 0.3 turns');break
 case 'black-hole':{
  await page.getByLabel('Exhibit',{exact:true}).selectOption('3');const lens=page.getByRole('group',{name:/Lens position/});await expect(lens).toBeVisible();await expect(page.getByRole('group',{name:'Camera view'})).toHaveCount(0);await expect(page.getByRole('img',{name:/Original illustrative gravitational/})).toBeVisible();const canvas=page.locator('.physical-world-stage canvas');await page.waitForTimeout(1800);const initial=await canvas.screenshot();await lens.focus();await lens.press('ArrowRight');await page.waitForTimeout(120);assert(!initial.equals(await canvas.screenshot()),'keyboard changes the lens image after idle');await lens.press('Home');await page.getByLabel('Exhibit',{exact:true}).selectOption('1');await expect(page.getByRole('group',{name:'Camera view'})).toBeVisible();break}
 case 'mentra':
  await page.getByRole('button',{name:'Replay recording from start'}).click();await page.getByRole('button',{name:'Load interactive Figma prototype'}).click();await expect(page.getByRole('button',{name:'Back to recording'})).toBeFocused();await page.getByRole('button',{name:'Back to recording'}).click();break
 case 'mentra-miniapps':
  await page.getByRole('button',{name:'Notes Open app →'}).click();await page.locator('[data-prototype]').getByRole('checkbox').check();await page.getByRole('button',{name:'Launch Notes'}).click();await page.getByLabel('Add a note').fill('Draft review note');await page.getByRole('button',{name:'Save note'}).click();await page.getByRole('button',{name:/Show note .* on glasses/}).last().click();break
 case 'clawed-chat':
  await page.getByLabel('Draft reply').fill('Reviewed receipt');await page.getByRole('button',{name:'Approve draft'}).click();await page.getByRole('button',{name:'Withdraw local approval'}).click();await page.getByLabel('Draft reply').fill('New draft');await page.getByRole('button',{name:'Receipts',exact:true}).click();await expect(page.locator('.prototype-ledger-entry')).toContainText('Reviewed receipt');break
 case 'executivelens':
  await page.getByRole('slider',{name:'Meeting position'}).fill('20');await page.getByRole('button',{name:'Check approval and owner · 15s'}).click();await expect(page.locator('[data-source="true"]')).toContainText('Priya owns');break
 case 'org-dashboard':
  await page.getByLabel('Search knowledge').fill('onboarding');await page.getByRole('button',{name:'Action queue',exact:true}).click();await page.getByRole('button',{name:'Approve change'}).click();await expect(page.locator('[data-prototype]')).toContainText('Human review step added');break
 case 'healthapp':
  await page.getByLabel('Today’s capacity').selectOption('Lighter');await page.getByLabel('Task to move').selectOption('Review the brief');await page.getByRole('button',{name:'Apply proposed plan'}).click();await expect(page.locator('.prototype-task-list')).not.toContainText('Review');await page.getByRole('button',{name:'Undo plan change'}).click();await expect(page.locator('.prototype-task-list')).toContainText('Review');break
 case 'vj-software':
  await page.getByRole('button',{name:/Bay 2, wing/}).click();await page.getByLabel('Sample allocation window').selectOption('closed');await expect(page.getByRole('button',{name:'Review booking'})).toBeDisabled();await page.getByLabel('Sample allocation window').selectOption('open');await page.getByRole('button',{name:'Review booking'}).click();break
 case 'code-for-build':
  await page.getByLabel('Content for heading block 1').fill('Edited heading <safe>');await page.getByRole('button',{name:'Structure',exact:true}).click();await expect(page.locator('[data-prototype]')).toContainText('Edited heading <safe>');await page.getByRole('button',{name:'Code',exact:true}).click();await expect(page.getByLabel('Generated HTML')).toContainText('&lt;safe&gt;');break
 case 'ballah-code':
  await page.getByRole('button',{name:'Signup validation',exact:true}).click();await page.getByRole('button',{name:'Run validation checks',exact:true}).click();await page.getByRole('button',{name:'Prepare validation proposal',exact:true}).click();await page.getByRole('button',{name:'Apply validation proposal',exact:true}).click();await page.getByRole('button',{name:'Run validation checks',exact:true}).click();await expect(page.locator('.prototype-test-results tbody tr').filter({hasText:'Pass'})).toHaveCount(3);break
 case 'raahi-project':
  await verifyRaahiPrivateEntry(page);break
 }
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),slug)
 await page.screenshot({path:`${out}/${slug}/interaction.png`,fullPage:true});const video=page.video();await page.close();await context.close();await video.saveAs(`${out}/${slug}/interaction.webm`);results.push(slug);console.log(slug)
}
for(const [name,engine,width,theme] of [['chromium',browser,320,'light'],['webkit',await webkit.launch(),390,'dark']]){
 const context=await engine.newContext({viewport:{width,height:844},hasTouch:true,reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',e=>errors.push(`${name}: ${e.message}`))
 await page.addInitScript(theme=>{localStorage.setItem('theme',theme);window.__lensDraws=0;const fill=CanvasRenderingContext2D.prototype.fillRect;CanvasRenderingContext2D.prototype.fillRect=function(...args){if(this.canvas.closest('.physical-world-stage'))window.__lensDraws++;return fill.apply(this,args)}},theme)
 await page.goto(`${base}/experience-preview/black-hole`);await expect(page.locator('.physical-world-stage canvas')).toBeVisible();await page.getByRole('button',{name:'Project controls',exact:true}).click();await page.getByRole('dialog',{name:'Project controls'}).getByLabel('Exhibit',{exact:true}).selectOption('3');await page.getByRole('button',{name:'Close project controls'}).click()
 const lens=page.getByRole('group',{name:/Lens position/});await expect(lens).toBeVisible();await lens.scrollIntoViewIfNeeded();await expect(page.locator('.physical-world-hint')).toBeVisible();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${name} lensing fits`)
 await page.waitForTimeout(2200);const idle=await page.evaluate(()=>window.__lensDraws);await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>window.__lensDraws),idle,`${name} lensing idles`);await lens.focus();await lens.press('ArrowLeft');await page.waitForTimeout(150);assert((await page.evaluate(()=>window.__lensDraws))>idle,`${name} keyboard wakes lensing`);await lens.press('Home');const box=await lens.boundingBox();await page.touchscreen.tap(box.x+box.width*.7,box.y+box.height*.4)
 await page.screenshot({path:`${out}/black-hole/mobile-${name}-${theme}.png`,fullPage:true});await context.close();if(engine!==browser)await engine.close();console.log(`${name} mobile lensing: fit, keyboard, idle/wake and touch`)
}

}finally{await browser.close();writeFileSync(`${out}/report.json`,JSON.stringify({results,errors,startup,measurement:'Unthrottled local development. Dependencies may be warm. Cross-origin resource bytes excluded; readiness is visible UI, not GPU first draw.'},null,2))}
assert.equal(errors.length,0,JSON.stringify(errors))
console.log(`Passed ${results.length} source-backed interaction checks with recordings.`)
