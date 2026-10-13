import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const code = readFileSync('public/hero-lighting-preload.js', 'utf8')
function run({ width = 1440, coarse = false, reduced = false, memory = 8, cores = 8, saveData = false, path = '/', search = '', saved = null, webgl = true, decompression = true } = {}) {
  const links = [], window = {}
  const media = query => ({ matches: query.includes('reduce') ? reduced : query.includes('768') ? width <= 768 : coarse })
  vm.runInNewContext(code, {
    window, navigator: { deviceMemory: memory, hardwareConcurrency: cores, connection: { saveData } },
    location: { pathname: path, search }, URLSearchParams, matchMedia: media, innerWidth: width,
    sessionStorage: { getItem: () => saved }, DecompressionStream: decompression ? function () {} : undefined,
    document: { documentElement: { classList: { contains: () => false } }, querySelector: () => links[0],
      createElement: tag => tag === 'canvas' ? { getContext: () => webgl ? { getExtension: () => ({ loseContext() {} }) } : null } : { dataset: {} },
      head: { append: link => links.push(link) } },
  })
  return { links, window }
}
assert.equal(run().links.length, 1)
assert.equal(run().links[0].href, '/Assets/hdri/potsdamer_platz_1k.rgbe.gz')
assert.equal(run({ decompression: false }).links[0].href, '/Assets/hdri/potsdamer_platz_1k.hdr')
for (const flags of [{ width: 390 }, { width: 1180, coarse: true }, { reduced: true }, { memory: 2 }, { cores: 2 }, { memory: 4, cores: 4 }, { saveData: true }, { path: '/work' }, { search: '?p=/work' }, { search: '?perf=emergency' }, { saved: 'forced' }, { webgl: false }]) assert.equal(run(flags).links.length, 0, JSON.stringify(flags))
assert.equal(run({ saved: 'runtime' }).links.length, 1, 'Temporary runtime fallback is cleared on reload')
assert.equal(run({ width: 1280, coarse: true }).links.length, 1, 'Large touch desktops retain the existing device policy')
assert.equal(run().window.__portfolioWebGLAvailable, true)
console.log('PASS: early lighting guards, original-asset compatibility and shared WebGL probe')
