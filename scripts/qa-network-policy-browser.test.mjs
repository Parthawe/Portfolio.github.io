import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

async function inspectFixture(mode) {
  const directory = await mkdtemp(join(tmpdir(), 'portfolio-network-qa-'))
  const requests = new Map()
  const server = createServer((request, response) => {
    const url = new URL(request.url, 'http://fixture.test')
    const width = url.searchParams.get('width')
    response.setHeader('Cache-Control', 'no-store')
    if (url.pathname === '/bundle/useInView.js') {
      const count = (requests.get(width) || 0) + 1
      requests.set(width, count)
      const failing = width === '390' && (mode !== 'recovered-layout' && mode !== 'transient' || count === 1)
      response.writeHead(failing ? mode === 'permanent' ? 404 : 503 : 200, { 'Content-Type': 'application/javascript' })
      response.end(failing ? 'Unavailable' : 'export const loaded = true;')
      return
    }
    if (url.pathname === '/bundle/PlaybookPage.js') {
      response.writeHead(200, { 'Content-Type': 'application/javascript' })
      response.end(`import { loaded } from './useInView.js?width=${width}';
        if (!document.querySelector('main')) document.body.insertAdjacentHTML('beforeend', '<main id="main-content"><h1>Playbook</h1></main>');
        document.querySelector('main').dataset.loaded = String(loaded);
        ${mode === 'recovered-layout' && width === '390' ? "document.body.style.width = '900px';" : ''}`)
      return
    }
    const canonical = `http://127.0.0.1:${server.address().port}/playbook/`
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(`<!doctype html><html><head><title>Playbook fixture</title>
      <meta name="robots" content="index, follow"><link rel="canonical" href="${canonical}">
      <style>body{margin:0} main{max-width:100%}</style></head><body>
      <main id="main-content"><h1>Playbook</h1></main>
      <script>
        if(innerWidth===390) {
          ${mode === 'transient' ? "document.querySelector('main').remove();" : ''}
          ${mode === 'runtime' ? "setTimeout(()=>{throw new ReferenceError('unrelated application bug')},0);" : ''}
          ${mode === 'layout' ? "document.body.style.width='900px';" : ''}
        }
        import('/bundle/PlaybookPage.js?width='+innerWidth).catch(error=>console.error(error));
      </script></body></html>`)
  })
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
    const base = `http://127.0.0.1:${server.address().port}`
    const sitemap = join(directory, 'sitemap.xml'), report = join(directory, 'report.md')
    await writeFile(sitemap, `<urlset><url><loc>${base}/playbook</loc></url></urlset>`)
    const result = await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, ['scripts/rendered-site-qa.mjs'], {
        cwd: root,
        env: { ...process.env, QA_BASE_URL: base, QA_SITEMAP_PATH: sitemap, QA_RENDERED_ROUTES: '/playbook', QA_RENDERED_REPORT_PATH: report },
        stdio: ['ignore', 'pipe', 'pipe'],
      })
      let output = ''
      child.stdout.on('data', value => { output += value })
      child.stderr.on('data', value => { output += value })
      child.on('error', reject)
      child.on('close', code => resolve({ code, output }))
    })
    return { ...result, report: await readFile(report, 'utf8'), mobileRequests: requests.get('390'), desktopRequests: requests.get('1207') }
  } finally {
    server.closeAllConnections()
    await new Promise(resolve => server.close(resolve))
    await rm(directory, { recursive: true, force: true })
  }
}

test('a temporary static dependency failure recovers on one fresh isolated route check', { timeout: 60_000 }, async () => {
  // Model the production failure: a 200 parent module, a 503 dependency,
  // React-style caught import error, and no main landmark until recovery.
  const result = await inspectFixture('transient')
  assert.equal(result.code, 0, result.output)
  assert.match(result.report, /isolated retry passed/)
  assert.match(result.report, /Initial issues:.*Timeout 20000ms/s)
  assert.equal(result.mobileRequests, 2)
  assert.equal(result.desktopRequests, 1)
})

test('a persistent dependency failure still fails after exactly one retry', async () => {
  const result = await inspectFixture('persistent')
  assert.equal(result.code, 1, result.output)
  assert.match(result.report, /isolated retry also failed/)
  assert.equal(result.mobileRequests, 2)
})

test('a permanent dependency failure is not retried', async () => {
  const result = await inspectFixture('permanent')
  assert.equal(result.code, 1, result.output)
  assert.match(result.report, /404/)
  assert.doesNotMatch(result.report, /isolated retry/)
  assert.equal(result.mobileRequests, 1)
})

test('an unrelated runtime error alongside a 503 remains a blocker', async () => {
  const result = await inspectFixture('runtime')
  assert.equal(result.code, 1, result.output)
  assert.match(result.report, /unrelated application bug/)
  assert.doesNotMatch(result.report, /isolated retry/)
  assert.equal(result.mobileRequests, 1)
})

test('a layout defect alongside a 503 remains a blocker', async () => {
  const result = await inspectFixture('layout')
  assert.equal(result.code, 1, result.output)
  assert.match(result.report, /Horizontal overflow/)
  assert.doesNotMatch(result.report, /isolated retry/)
  assert.equal(result.mobileRequests, 1)
})

test('the isolated retry reruns structural checks rather than accepting a successful download', async () => {
  const result = await inspectFixture('recovered-layout')
  assert.equal(result.code, 1, result.output)
  assert.match(result.report, /Horizontal overflow/)
  assert.match(result.report, /isolated retry also failed/)
  assert.equal(result.mobileRequests, 2)
})
