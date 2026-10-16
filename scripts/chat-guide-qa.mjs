import assert from 'node:assert/strict'
import { chromium, expect } from '@playwright/test'
const browser = await chromium.launch()
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4175'
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'})
    const errors=[]
    page.on('pageerror',e=>errors.push(e.message))
    let payload
    await page.route('**/folio-answer', async route => { payload=route.request().postDataJSON(); await route.fulfill({status:503,body:'unavailable'}) })
    await page.goto(`${base}/about/`)
    await page.getByRole('button',{name:'Ask Parth about this work',exact:true}).click()
    await page.locator('.portfolio-chat-browse summary').click()
    await page.getByRole('button',{name:'Next section ↓',exact:true}).click()
    await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBeGreaterThan(100)
    await expect(page.locator('.portfolio-chat-panel')).toBeVisible()
    await expect(page.locator('.portfolio-chat-message--assistant').last()).toContainText('Showing')
    await page.getByRole('button',{name:'Back to top ↑',exact:true}).click()
    await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0)
    const input=page.getByRole('textbox',{name:'Message Ask Parth'})
    await input.fill('Compare Mentra and TransFi')
    await page.getByRole('button',{name:'Send',exact:true}).click()
    await expect(page.locator('.portfolio-chat-message--assistant').last()).toContainText('Outcome:')
    assert(payload.context.currentPage.sections.length > 0)
    assert(payload.context.recentConversation.length >= 2)
    await expect(page.locator('.portfolio-chat-message--assistant').last()).toContainText('TransFi')
    await page.getByRole('button',{name:'Close panel',exact:true}).click()
    if(width===1440) {
      await page.getByRole('button',{name:'Show Easter egg tools',exact:true}).click()
      await page.getByRole('button',{name:'Enter Figma mode',exact:true}).click()
      await expect(page.locator('.site-tools')).toBeVisible()
      await page.evaluate(()=>window.dispatchEvent(new Event('portfolio-chat:open')))
      await expect(page.locator('.portfolio-chat-panel')).toBeVisible()
      await expect(page.locator('.site-tools')).toBeHidden()
      await expect.poll(()=>page.evaluate(()=>document.body.classList.contains('figma-grid-on'))).toBe(false)
      await expect.poll(()=>page.evaluate(()=>document.body.classList.contains('figma-rulers-off'))).toBe(true)
    }
    await page.goto(`${base}/transfi-project/`)
    await page.getByRole('button',{name:'Ask Parth about this work',exact:true}).click()
    await page.getByRole('textbox',{name:'Message Ask Parth'}).fill('Compare Mentra and TransFi')
    await page.getByRole('button',{name:'Send',exact:true}).click()
    await expect.poll(()=>payload?.route).toBe('/transfi-project')
    assert.deepEqual(payload.context.currentPage.sections, [], 'Protected project DOM stays out of AI payloads')
    assert.deepEqual(errors,[])
    await page.close()
  }
  console.log('PASS: page scrolling, mobile dismissal, grounded comparison fallback, page/history context, Figma shutdown')
} finally { await browser.close() }
