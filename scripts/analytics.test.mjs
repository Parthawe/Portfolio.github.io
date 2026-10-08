import test from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import { build } from 'esbuild'

const result = await build({
  entryPoints: ['src/utils/analytics/index.ts'], bundle: true, write: false,
  format: 'iife', globalName: 'analytics',
  define: { 'import.meta.env': JSON.stringify({ PROD: true, VITE_GA4_MEASUREMENT_ID: 'G-TEST123', VITE_GA4_READY: '1' }) },
  plugins: [{ name: 'route-manifest-only', setup(builder) {
    // Avoid bundling lazy page components in this unit test.
    builder.onResolve({ filter: /pages\/projects\// }, args => ({ path: args.path, external: true }))
  } }],
})
const source = result.outputFiles[0].text
function harness({ host = 'designwhich.works', consent, exclude = false } = {}) {
  const storage = new Map(consent ? [['portfolio-analytics-consent-v1', consent]] : [])
  if (exclude) storage.set('portfolio-analytics-exclude', '1')
  const scripts = []
  const location = { hostname: host, pathname: '/', reload() {} }
  const window = {}
  const context = vm.createContext({ window, location, URL, navigator: { webdriver: false },
    localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    document: { referrer: 'https://example.com/private?email=secret', cookie: '',
      createElement: () => ({}), head: { appendChild: script => scripts.push(script) } },
  })
  vm.runInContext(source, context)
  return { api: context.analytics, scripts, location, window, events: () => (window.dataLayer || []).map(args => Array.from(args)) }
}

test('no Google script or events before consent, on localhost, or for owner exclusion', () => {
  for (const options of [{}, { consent: 'denied' }, { host: 'localhost', consent: 'granted' }, { consent: 'granted', exclude: true }]) {
    const h = harness(options)
    h.api.trackPage('/')
    h.api.trackEvent('contact_click')
    assert.equal(h.scripts.length, 0)
    assert.equal(h.events().length, 0)
  }
})
test('one pageview per transition; return visits count; interaction dedup resets on navigation', () => {
  const h = harness({ consent: 'granted' })
  h.api.trackPage('/')
  h.api.trackPage('/')
  h.api.trackEvent('contact_click')
  h.api.trackEvent('contact_click')
  h.location.pathname = '/mentra'
  h.api.trackPage('/mentra')
  h.location.pathname = '/'
  h.api.trackPage('/')
  h.api.trackEvent('contact_click')
  assert.equal(h.events().filter(e => e[1] === 'page_view').length, 3)
  assert.equal(h.events().filter(e => e[1] === 'contact_click').length, 2)
  assert.equal(h.scripts.length, 1)
})
test('redacts referrer details and unknown paths; rejects unknown events', () => {
  const h = harness({ consent: 'granted' })
  h.api.trackPage('/private/person@example.com?code=secret')
  h.api.trackEvent('entered_reviewer_code')
  const events = JSON.stringify(h.events())
  assert.ok(events.includes('/404'))
  assert.ok(!events.includes('secret'))
  assert.ok(!events.includes('person@'))
  assert.ok(!events.includes('entered_reviewer_code'))
})
test('withdrawal immediately blocks custom events and sets Google disable flag', () => {
  const h = harness({ consent: 'granted' })
  h.api.trackPage('/')
  h.api.setAnalyticsConsent('denied')
  const count = h.events().length
  h.api.trackEvent('contact_click')
  h.api.trackPage('/about')
  assert.equal(h.events().length, count)
  assert.equal(h.window['ga-disable-G-TEST123'], true)
})

 test('diagnostics, visible time and sections retain only bounded public fields', () => {
  const h = harness({ consent: 'granted' })
  h.api.trackPage('/')
  h.api.trackSection('cs-process')
  h.api.trackSection('cs-process')
  h.api.trackSection('person@example.com')
  h.api.trackVisibleTime('/private/person@example.com', 2200)
  h.api.trackVisibleTime('/', NaN)
  h.api.trackDiagnostic('client_error', { error_code: 'script_error', message: 'secret' })
  h.api.trackDiagnostic('client_error', { error_code: 'script_error' })
  h.api.trackDiagnostic('web_vital', { metric_name: 'LCP', value: 1250, metric_id: 'v1-test', page_path: '/mentra?code=secret' })
  h.api.trackDiagnostic('web_vital', { metric_name: 'LCP', value: NaN })
  const events = h.events()
  assert.equal(events.filter(e => e[1] === 'story_section_view').length, 1)
  assert.equal(events.filter(e => e[1] === 'client_error').length, 1)
  assert.equal(events.filter(e => e[1] === 'web_vital').length, 1)
  assert.equal(events.find(e => e[1] === 'visible_time')[2].visible_seconds, 2)
  assert.ok(!JSON.stringify(events).includes('secret'))
  assert.ok(!JSON.stringify(events).includes('person@'))
})
