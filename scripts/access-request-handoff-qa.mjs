import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium, webkit, expect } from '@playwright/test'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5238'
const out = process.env.QA_OUTPUT_DIR || '/tmp/portfolio-source-services/access'
mkdirSync(out, { recursive: true })
const results = []

// Verify draft preparation, not email delivery. No email is sent by this suite.
for (const [engine, width, theme] of [[chromium,1440,'light'],[chromium,320,'dark'],[webkit,1440,'dark'],[webkit,390,'light']]) {
  const browser = await engine.launch()
  const context = await browser.newContext({ viewport:{width,height:960},hasTouch:width<500,reducedMotion:'reduce' })
  await context.addInitScript(theme => {
    localStorage.setItem('theme', theme)
    localStorage.setItem('portfolio-analytics-consent-v1', 'denied')
    window.qaClipboard = { denied:true, text:'', deferred:false, resolve:null }
    Object.defineProperty(navigator, 'clipboard', { configurable:true, value:{ writeText:async text => {
      if (window.qaClipboard.denied) throw new DOMException('Permission denied', 'NotAllowedError')
      if (window.qaClipboard.deferred) await new Promise(resolve => { window.qaClipboard.resolve = resolve })
      window.qaClipboard.text = text
    } } })
  }, theme)
  const page = await context.newPage(), errors=[]
  page.on('pageerror', error => errors.push(error.message))
  try {
    for (const slug of ['transfi-project','zentipay']) {
      await page.goto(`${base}/${slug}`)
      await page.getByRole('button',{name:'Public story',exact:true}).click()
      const gate = page.locator('.nda-inline').last()
      await gate.locator('summary').click()
      const form = gate.getByRole('form',{name:'Request case study access'})
      const email = form.getByRole('textbox',{name:'Work email'})
      const contextInput = form.getByRole('textbox',{name:'What are you reviewing?'})
      await form.getByRole('button',{name:'Copy request',exact:true}).click()
      assert.equal(await form.locator('[role=status]').count(),0,'Invalid email cannot prepare a request')
      await email.fill('qa+handoff@example.com')
      const text = 'QA draft only. A&B + 20% / café\nSecond line? #review'
      await contextInput.fill(text)
      await form.getByRole('button',{name:'Copy request',exact:true}).click()
      const manual = form.getByRole('textbox',{name:'Request to copy'})
      await expect(manual).toBeVisible()
      const draft = await manual.inputValue()
      assert(draft.startsWith('To: parthpawar@nyu.edu\nSubject: Access request: '))
      assert(draft.includes('Email: qa+handoff@example.com'))
      assert(draft.endsWith(text),'Special characters and line breaks survive')
      await manual.focus()
      assert.equal(await manual.evaluate(el=>el.selectionEnd-el.selectionStart),draft.length)
      await page.screenshot({path:`${out}/${engine.name()}-${width}-${slug}-manual.png`})
      await page.evaluate(()=>{window.qaClipboard.denied=false})
      await form.getByRole('button',{name:'Copy request',exact:true}).click()
      await expect(form.getByRole('status')).toHaveText('Request copied. Paste it into an email and send it to Parth.')
      assert.equal(await page.evaluate(()=>window.qaClipboard.text),draft)
      await expect(manual).toHaveCount(0)
      await form.getByRole('button',{name:'Open email draft',exact:true}).click({noWaitAfter:true})
      await expect(form.getByRole('status')).toContainText('Nothing has been sent by this website.')
      await contextInput.fill('Revised QA draft; do not send.')
      await expect(form.locator('[role=status]')).toHaveCount(0)
      await page.evaluate(()=>{window.qaClipboard.deferred=true;window.qaClipboard.resolve=null})
      await form.getByRole('button',{name:'Copy request',exact:true}).click()
      await expect.poll(()=>page.evaluate(()=>typeof window.qaClipboard.resolve)).toBe('function')
      await contextInput.fill('Edited while clipboard permission was pending.')
      await page.evaluate(()=>{window.qaClipboard.resolve();window.qaClipboard.deferred=false})
      await expect.poll(()=>page.evaluate(()=>window.qaClipboard.text)).toContain('Revised QA draft; do not send.')
      await expect(form.locator('[role=status]')).toHaveCount(0)
      await form.getByRole('button',{name:'Open email draft',exact:true}).click({noWaitAfter:true})
      await expect(form.getByRole('status')).toContainText('Nothing has been sent by this website.')
      await expect(email).toHaveValue('qa+handoff@example.com')
      assert.equal(await page.locator('.nda-unlocked-section').count(),0,'Preparing a draft does not unlock private content')
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1))
      await page.screenshot({path:`${out}/${engine.name()}-${width}-${slug}-draft.png`})
      results.push({engine:engine.name(),width,theme,slug,clipboardSuccess:true,clipboardDeniedFallback:true,staleClipboardIgnored:true,draftOnly:true,passed:true})
    }
    assert.deepEqual(errors,[])
  } finally { await context.close(); await browser.close() }
}
writeFileSync(`${out}/report.json`,JSON.stringify({base,results},null,2))
console.log(`PASS: ${results.length} access-request profiles; validation, copy success/denial, retained draft, no false delivery claim, protected boundaries and overflow.`)
