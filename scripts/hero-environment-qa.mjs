import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'
import vm from 'node:vm'
import ts from 'typescript'
import { DataUtils } from 'three'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'

const source = readFileSync('public/Assets/hdri/potsdamer_platz_1k.hdr')
const original = new RGBELoader().parse(source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength))
const packed = gunzipSync(readFileSync('public/Assets/hdri/potsdamer_platz_1k.rgbe.gz'))
const api = {}
const code = ts.transpileModule(readFileSync('src/utils/decodeHeroEnvironment.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
vm.runInNewContext(code, { exports: api, require: () => ({ DataUtils }), TextDecoder, DataView, Uint8Array, Uint16Array, Map })
const decoded = api.decodeHeroEnvironment(packed.buffer.slice(packed.byteOffset, packed.byteOffset + packed.byteLength))
assert.equal(decoded.width, original.width); assert.equal(decoded.height, original.height)
assert.deepEqual(decoded.data, original.data, 'Every half-float lighting channel is unchanged')
assert.throws(() => api.decodeHeroEnvironment(new ArrayBuffer(16)), /header/)
const truncated = packed.subarray(0, -1)
assert.throws(() => api.decodeHeroEnvironment(truncated.buffer.slice(truncated.byteOffset, truncated.byteOffset + truncated.byteLength)), /dimensions/)
console.log(`PASS: ${decoded.data.length} lighting half-floats match the original HDR exactly; invalid data rejected`)
