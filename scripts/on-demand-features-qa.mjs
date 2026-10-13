import assert from 'node:assert/strict'
import { chromium, expect } from '@playwright/test'
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5199'
const browser = await chromium.launch()
const errors = []
try {
 for (const profile of [
  { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  { viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' },
 ]) {
  const page = await browser.newPage(profile)
  const requests = []
  page.on('request', request => requests.push(request.url()))
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(`${base}/work/`, { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: 'Work', exact: true })).toBeVisible()
  await page.waitForTimeout(6000)
  assert(!requests.some(url => /\/CollaboratorCursor-|\/agentAI-|\/vision_bundle/.test(url)), 'mobile and reduced motion skip desktop cursor/chat/vision code')
  await expect(page.getByRole('button', { name: 'Ask Parth about this work', exact: true })).toHaveCount(0)
  await page.close()
 }
 const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
 page.setDefaultTimeout(20000)
 const requests = []
 page.on('request', request => requests.push(request.url()))
 page.on('pageerror', error => errors.push(error.message))
 await page.goto(`${base}/work/`, { waitUntil: 'domcontentloaded' })
 await expect(page.getByRole('button', { name: 'Ask Parth about this work', exact: true })).toBeVisible()
 const hands = page.getByRole('button', { name: 'Enable hand tracking', exact: true })
 await expect(hands).toBeVisible({ timeout: 20000 })
 assert(!requests.some(url => /\/agentAI-|\/vision_bundle/.test(url)), 'feature controls appear without downloading chat or vision')
 await page.getByRole('button', { name: 'Ask Parth about this work', exact: true }).click()
 await expect(page.getByRole('dialog', { name: 'Ask Parth about the portfolio' })).toBeVisible()
 await page.getByRole('textbox', { name: 'Question for Parth' }).fill('Are you human?')
 await page.getByRole('button', { name: 'Send question', exact: true }).click()
 await expect(page.locator('.reading-cursor__reply')).toContainText("Parth's portfolio twin")
 assert(requests.some(url => /\/agentAI-/.test(url)), 'asking loads the chat service')
 await page.getByRole('dialog', { name: 'Ask Parth about the portfolio' }).getByRole('button', { name: 'Close Ask Parth', exact: true }).click()
 // Exercise library loading and existing permission recovery without accessing a camera or downloading remote models.
 await page.route('**/vision_bundle*.js', route => route.fulfill({ contentType: 'text/javascript', body: 'export const FilesetResolver={forVisionTasks:async()=>({})};export const HandLandmarker={createFromOptions:async()=>({detectForVideo:()=>({landmarks:[]})})};' }))
 await page.evaluate(() => { navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Permission denied', 'NotAllowedError') } })
 await hands.click()
 await expect(page.locator('.bt-toolbar-error')).toHaveText('Camera permission denied')
 await expect(hands).toBeEnabled()
 assert(requests.some(url => /\/vision_bundle/.test(url)), 'enabling hands loads the vision module')
 await page.close()
 const stale = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
 stale.on('pageerror', error => errors.push(error.message))
 let release, started
 const loading = new Promise(resolve => { started = resolve })
 const gate = new Promise(resolve => { release = resolve })
 await stale.route('**/agentAI-*.js', async route => { started(); await gate; await route.continue() })
 await stale.goto(`${base}/work/`, { waitUntil: 'domcontentloaded' })
 await stale.getByRole('button', { name: 'Ask Parth about this work', exact: true }).click()
 await stale.getByRole('textbox', { name: 'Question for Parth' }).fill('Are you human?')
 await stale.getByRole('button', { name: 'Send question', exact: true }).click()
 await loading
 await stale.locator('a[href="/about"]').first().click()
 await expect(stale).toHaveURL(/\/about/)
 release()
 await stale.waitForTimeout(800)
 await expect(stale.locator('.reading-cursor__reply')).toHaveCount(0)
 await stale.close()
 assert.equal(errors.length, 0, errors.join('\n'))
 console.log('PASS: mobile/reduced-motion exclusions; desktop chat on demand; hand library on demand and permission recovery; navigation during delayed chat import')
} finally { await browser.close() }
