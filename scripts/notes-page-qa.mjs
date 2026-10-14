import assert from 'node:assert/strict'
import { chromium, expect } from '@playwright/test'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4181'
const browser = await chromium.launch()
const fixtures = [
  { id: 'older', route: '/guestbook', x_percent: 15, y_percent: 85, selector: 'footer-guestbook', author_name: 'QA fixture', author_email: null, body: 'Existing footer note — keep the visitor’s punctuation.', status: 'open', created_at: '2026-10-10T12:00:00Z' },
  { id: 'newer', route: '/guestbook', x_percent: 50, y_percent: 50, selector: 'footer-guestbook', author_name: 'Layout fixture', author_email: null, body: '<script>test</script>\n' + 'Long note text for layout verification. '.repeat(5), status: 'open', created_at: '2026-10-12T12:00:00Z' },
]
let checks = 0
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 960 }, reducedMotion: 'reduce' })
    await context.addInitScript(() => localStorage.setItem('portfolio-analytics-consent-v1', 'denied'))
    const page = await context.newPage()
    let readFails = false
    let postFails = false
    let posts = []
    await page.route('https://notes-qa.supabase.co/rest/v1/portfolio_comments**', async route => {
      const request = route.request()
      const headers = { 'access-control-allow-origin': '*', 'access-control-allow-headers': 'apikey,content-type,prefer', 'access-control-allow-methods': 'GET,POST,OPTIONS' }
      if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers, body: '' })
      if (request.method() === 'POST') {
        posts.push(request.postDataJSON())
        return route.fulfill({ status: postFails ? 503 : 201, headers, body: '' })
      }
      assert.match(request.url(), /route=eq.%2Fguestbook/)
      assert.match(request.url(), /status=eq.open/)
      await route.fulfill({ status: readFails ? 503 : 200, headers, contentType: 'application/json', body: JSON.stringify(fixtures) })
    })
    await page.goto(`${base}/notes`)
    await expect(page.getByRole('heading', { name: 'Notes', exact: true })).toBeVisible()
    await expect(page.locator('.note-card')).toHaveCount(2)
    await expect(page.locator('.note-card').first()).toContainText('Layout fixture')
    await expect(page.locator('.note-body').last()).toHaveText(fixtures[0].body)
    assert.equal(await page.locator('.note-card script').count(), 0)
    const newNote = page.getByRole('button', { name: /New note/ })
    await newNote.click()
    const field = page.getByLabel('Your note', { exact: true })
    await expect(field).toBeFocused()
    await expect(page.getByRole('button', { name: 'Post note', exact: true })).toBeDisabled()
    await field.fill('   ')
    await expect(page.getByRole('button', { name: 'Post note', exact: true })).toBeDisabled()
    await field.fill('Draft survives closing.')
    await field.press('Escape')
    await expect(newNote).toBeFocused()
    await newNote.click()
    await expect(field).toHaveValue('Draft survives closing.')
    if (width === 390 || width === 1440) await page.screenshot({ path: `/tmp/portfolio-notes-populated-${width}.png`, fullPage: true })
    await field.fill('  This is a test note.  ')
    await page.getByLabel('Your name', { exact: false }).fill('  QA visitor  ')
    postFails = true
    await page.getByRole('button', { name: 'Post note', exact: true }).click()
    await expect(page.locator('.notes-error')).toBeVisible()
    await expect(field).toHaveValue('  This is a test note.  ')
    postFails = false
    await page.getByRole('button', { name: 'Post note', exact: true }).click()
    await expect(page.locator('.note-pending')).toBeVisible()
    await expect(page.locator('.notes-notice')).toContainText('after review')
    await expect(newNote).toBeFocused()
    assert.deepEqual(posts.at(-1), { route: '/guestbook', x_percent: 50, y_percent: 50, selector: 'footer-guestbook', author_name: 'QA visitor', author_email: null, body: 'This is a test note.', status: 'pending' })
    await page.reload()
    await expect(page.locator('.note-card')).toHaveCount(2)
    await expect(page.locator('.note-pending')).toHaveCount(0)
    // Theme and open-form checks share the same viewport pass.
    for (const theme of ['light', 'dark']) {
      await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme)
      await newNote.click()
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Overflow at ${width}px in ${theme}`)
      for (const selector of ['.notes-form', '.note-card']) {
        for (const box of await page.locator(selector).all()) {
          const rect = await box.boundingBox()
          assert(rect.x >= 0 && rect.x + rect.width <= width + 1, `${selector} outside ${width}px`)
        }
      }
      await page.getByRole('button', { name: 'Close', exact: true }).click()
    }
    readFails = true
    await page.reload()
    await expect(page.getByText('Notes could not be loaded.')).toBeVisible()
    readFails = false
    await page.getByRole('button', { name: 'Try again', exact: true }).click()
    await expect(page.locator('.note-card')).toHaveCount(2)
    await expect(page.locator('.notes-load-error')).toHaveCount(0)
    await page.goto(`${base}/guestbook`)
    await expect(page).toHaveURL(`${base}/notes`)
    if (width === 390) {
      await page.getByRole('button', { name: 'Open menu', exact: true }).click()
      await expect(page.locator('.mobile-nav-links').getByRole('link', { name: 'Notes', exact: true })).toHaveCount(0)
    }
    await context.close()
    checks += 1
  }
  // Test the actual unconfigured production store without sending a database request.
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 } })
  const page = await context.newPage()
  await page.goto(`${process.env.QA_LOCAL_BASE_URL || 'http://127.0.0.1:4175'}/notes`)
  await expect(page.locator('.note-sample')).toHaveCount(8)
  assert.equal(await page.evaluate(() => localStorage.getItem('portfolio-comments-v1')), null)
  await page.getByRole('button', { name: 'Hide sample notes', exact: true }).click()
  await expect(page.locator('.note-sample')).toHaveCount(0)
  assert.equal(await page.evaluate(() => localStorage.getItem('portfolio-comments-v1')), null)
  await expect(page.locator('.notes-empty')).toBeVisible()
  await page.getByRole('button', { name: /New note/ }).click()
  await page.getByLabel('Your note', { exact: true }).fill('Browser storage test.')
  await page.getByRole('button', { name: 'Post note', exact: true }).click()
  await expect(page.locator('.note-card')).toContainText('Anonymous')
  await page.reload()
  await expect(page.getByRole('article', { name: 'Note from Anonymous', exact: true })).toContainText('Browser storage test.')
  await expect(page.locator('.note-sample')).toHaveCount(8)
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 960 })
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Sample overflow at ${width}px`)
  }
  const publicPage = await context.newPage()
  await publicPage.route('http://notes-public.test/**', async route => {
    const response = await route.fetch({ url: route.request().url().replace('http://notes-public.test', process.env.QA_LOCAL_BASE_URL || 'http://127.0.0.1:4175') })
    await route.fulfill({ response })
  })
  await publicPage.goto('http://notes-public.test/notes')
  await expect(publicPage.locator('.notes-empty')).toBeVisible()
  await expect(publicPage.locator('.note-sample')).toHaveCount(0)
  await expect(publicPage.locator('.notes-preview-tools')).toHaveCount(0)
  await page.goto(`${process.env.QA_LOCAL_BASE_URL || 'http://127.0.0.1:4175'}/about`)
  await expect(page.getByRole('link', { name: /Leave a note/ })).toHaveAttribute('href', '/notes', { timeout: 15000 })
  await expect(page.locator('.ft-canvas-zone')).toHaveCount(0)
  await context.close()
  console.log(`Notes QA passed: ${checks} responsive viewports, both themes, moderation, failure/retry, draft/focus, aliases, browser persistence, footer navigation, sample toggling, and public-host sample isolation.`)
} finally {
  await browser.close()
}
