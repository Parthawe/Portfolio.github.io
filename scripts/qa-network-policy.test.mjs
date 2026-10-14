import { test } from 'node:test'
import assert from 'node:assert/strict'
import { canRetryTemporaryHttp, navigateWithTemporaryRetry } from './qa-network-policy.mjs'

const url = 'https://example.test/bundle/page.js'
const sample = {
  httpErrors: [{ status: 503, url }],
  consoleErrors: [{ text: 'Failed to load resource: the server responded with a status of 503 ()', url }],
  pageErrors: [], issues: ['Console errors: Failed to load resource', `HTTP resources: 503 ${url}`], timedOut: false,
}
test('permits one isolated attempt for confirmed temporary server failures', () => {
  assert.equal(canRetryTemporaryHttp(sample), true)
})
test('does not retry 404s or a mixture of temporary and permanent HTTP errors', () => {
  assert.equal(canRetryTemporaryHttp({ ...sample, httpErrors: [...sample.httpErrors, { status: 404, url: url + '?missing' }] }), false)
})
test('does not hide runtime, layout, or image defects', () => {
  assert.equal(canRetryTemporaryHttp({ ...sample, pageErrors: ['TypeError'] }), false)
  for (const issue of ['Horizontal overflow: 15px', 'Broken images: image.jpg', 'P1: Public route is noindex']) {
    assert.equal(canRetryTemporaryHttp({ ...sample, issues: [...sample.issues, issue] }), false)
  }
})
test('requires the browser error to match the observed failed request', () => {
  assert.equal(canRetryTemporaryHttp({ ...sample, consoleErrors: [{ text: 'Failed to load resource:', url: '' }] }), false)
  assert.equal(canRetryTemporaryHttp({ ...sample, consoleErrors: [{ text: 'Unexpected application error', url }] }), false)
  assert.equal(canRetryTemporaryHttp({ ...sample, httpErrors: [] }), false)
})

test('retries a temporary document once and returns the final response', async () => {
  let visits = 0, waits = 0
  const page = { goto: async () => { const status = ++visits === 1 ? 503 : 200; return {status: () => status} }, waitForTimeout: async () => { waits++ } }
  const response = await navigateWithTemporaryRetry(page, url)
  assert.equal(response.status(), 200)
  assert.equal(waits, 1)
})
test('does not retry a permanent document failure or a thrown navigation error', async () => {
  let visits = 0
  const response = await navigateWithTemporaryRetry({goto: async () => {visits++; return {status: () => 404} }}, url)
  assert.equal(response.status(),404); assert.equal(visits,1)
  await assert.rejects(navigateWithTemporaryRetry({goto: async () => { throw new Error('navigation failure') }}, url), /navigation failure/)
})
