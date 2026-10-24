import { test } from 'node:test'
import assert from 'node:assert/strict'
import { canRetryTemporaryHttp, collectModuleDependencies, navigateWithTemporaryRetry } from './qa-network-policy.mjs'

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

const parent = 'https://example.test/bundle/PlaybookPage.js'
const dependency = 'https://example.test/bundle/useInView.js'
const importError = `TypeError: Failed to fetch dynamically imported module: ${parent}`
const moduleFailure = {
  httpErrors: [{ status: 503, url: dependency }],
  consoleErrors: [
    { text: 'Failed to load resource: the server responded with a status of 503 ()', url: dependency },
    { text: importError, url: 'https://example.test/bundle/vendor-react.js' },
  ],
  pageErrors: [], timedOut: true,
  issues: ['locator.waitFor: Timeout 20000ms exceeded.', 'Console errors: loader failure', `HTTP resources: 503 ${dependency}`],
  moduleDependencies: [{ url: parent, imports: [dependency] }],
}

test('correlates a React loader error with its temporary static dependency failure', () => {
  for (const status of [502, 503, 504]) {
    assert.equal(canRetryTemporaryHttp({ ...moduleFailure, httpErrors: [{ status, url: dependency }] }), true)
  }
})

test('also explains an uncaught loader error or failure of the imported module itself', () => {
  assert.equal(canRetryTemporaryHttp({ ...moduleFailure, pageErrors: [importError.replace('TypeError: ', '')],
    issues: [...moduleFailure.issues, `Page errors: ${importError}`] }), true)
  assert.equal(canRetryTemporaryHttp({ ...moduleFailure, httpErrors: [{ status: 503, url: parent }],
    consoleErrors: [{ text: importError, url: '' }], moduleDependencies: [] }), true)
})

test('requires a proven chain, not just another 503 in the same bundle directory', () => {
  assert.equal(canRetryTemporaryHttp({ ...moduleFailure, moduleDependencies: [] }), false)
  assert.equal(canRetryTemporaryHttp({ ...moduleFailure, moduleDependencies: [{ url: parent, imports: [url] }] }), false)
  assert.equal(canRetryTemporaryHttp({ ...moduleFailure, httpErrors: [{ status: 503, url: 'https://example.test/image.png' }] }), false)
})

test('keeps genuine browser errors and structural failures blocking despite a failed dependency', () => {
  for (const message of ['ReferenceError: missing is not defined', 'SyntaxError: Unexpected token', 'TypeError: Cannot read properties of undefined']) {
    assert.equal(canRetryTemporaryHttp({ ...moduleFailure, pageErrors: [message] }), false)
    assert.equal(canRetryTemporaryHttp({ ...moduleFailure,
      consoleErrors: [...moduleFailure.consoleErrors, { text: message, url: parent }] }), false)
  }
  for (const issue of ['Horizontal overflow: 15px', 'Broken images: image.jpg', 'Application error or not-found state rendered']) {
    assert.equal(canRetryTemporaryHttp({ ...moduleFailure, issues: [...moduleFailure.issues, issue] }), false)
  }
  assert.equal(canRetryTemporaryHttp({ ...moduleFailure, httpErrors: [...moduleFailure.httpErrors, { status: 404, url }] }), false)
})

test('handles transitive dependencies and cycles without trusting cross-origin chains', () => {
  const shared = 'https://example.test/bundle/shared.js'
  const graph = [{ url: parent, imports: [shared] }, { url: shared, imports: [parent, dependency] }]
  assert.equal(canRetryTemporaryHttp({ ...moduleFailure, moduleDependencies: graph }), true)
  assert.equal(canRetryTemporaryHttp({ ...moduleFailure, moduleDependencies: graph.map(m => ({ ...m, imports: m.imports.filter(u => u !== dependency) })) }), false)
  const foreign = 'https://other.test/bundle/shared.js'
  assert.equal(canRetryTemporaryHttp({ ...moduleFailure, moduleDependencies: [
    { url: parent, imports: [foreign] }, { url: foreign, imports: [dependency] },
  ] }), false)
  assert.equal(canRetryTemporaryHttp({ ...moduleFailure,
    moduleDependencies: [{ url: parent, imports: ['not a URL', 'file:///invalid.js'] }] }), false)
})

test('collects static imports and re-exports from observed responses without executing code', async () => {
  const shared = 'https://example.test/bundle/shared.js'
  const responses = new Map([
    [parent, { text: async () => `import './shared.js'; const note = "import './unrelated.js'"; /* import './fake.js' */` }],
    [shared, { text: async () => `export { value } from './useInView.js';` }],
  ])
  const graph = await collectModuleDependencies({ ...moduleFailure, scriptResponses: responses })
  assert.deepEqual(graph, [{ url: parent, imports: [shared] }, { url: shared, imports: [dependency] }])
  assert.equal(canRetryTemporaryHttp({ ...moduleFailure, moduleDependencies: graph }), true)
})

test('fails closed when a response is missing, unreadable, or not valid JavaScript', async () => {
  for (const response of [null, { text: async () => { throw new Error('closed') } }, { text: async () => 'import {' }]) {
    const graph = await collectModuleDependencies({ ...moduleFailure,
      scriptResponses: new Map(response ? [[parent, response]] : []) })
    assert.deepEqual(graph, [])
    assert.equal(canRetryTemporaryHttp({ ...moduleFailure, moduleDependencies: graph }), false)
  }
})
