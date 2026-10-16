import assert from 'node:assert/strict'
import { chromium, expect } from '@playwright/test'
const browser=await chromium.launch()
try {
 for(const width of [1440,1024,768,390]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce',hasTouch:width<1200})
  await page.goto('http://127.0.0.1:4175/about/')
  await expect(page.locator('.portfolio-chat-launcher')).toHaveCount(0)
  const cursor=page.getByRole('button',{name:'Ask Parth about this work',exact:true})
  await cursor.click()
  const panel=page.getByRole('complementary',{name:'Ask Parth chat'})
  await expect(panel).toBeVisible()
  assert.equal(await page.locator('#root').evaluate(e=>e.inert),false)
  assert.equal(await panel.getAttribute('aria-modal'),null)
  const box=await panel.boundingBox()
  if(width>=600) assert(box.width/width<.43)
  else assert(box.height/900<.5)
  await page.getByRole('button',{name:'Next section ↓',exact:true}).click()
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(100)
  await expect(panel).toBeVisible()
  await page.getByRole('textbox',{name:'Message Ask Parth'}).fill('Draft stays here')
  await page.getByRole('button',{name:'Close panel',exact:true}).click()
  await cursor.click()
  await expect(page.getByRole('textbox',{name:'Message Ask Parth'})).toHaveValue('Draft stays here')
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
  await page.close()
 }
 console.log('PASS: cursor-only entry, nonmodal page access, compact sizing at 1440/1024/768/390, scrolling, drafts, no horizontal overflow')
} finally { await browser.close() }
