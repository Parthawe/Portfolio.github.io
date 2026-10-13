import assert from 'node:assert/strict'
import { readFileSync, writeFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const source = readFileSync('public/Assets/hdri/potsdamer_platz_1k.hdr')
const match = source.toString('latin1').match(/\n-Y (\d+) \+X (\d+)\n/)
assert(match, 'Radiance scanline dimensions are required')
const height = Number(match[1]), width = Number(match[2]), count = width * height
assert.equal(width, 1024); assert.equal(height, 512)
const planes = new Uint8Array(count * 4)
let position = match.index + match[0].length
for (let y = 0; y < height; y++) {
  assert.deepEqual([...source.subarray(position, position + 4)], [2, 2, width >> 8, width & 255])
  position += 4
  for (let channel = 0; channel < 4; channel++) {
    let x = 0
    while (x < width) {
      const code = source[position++], length = code > 128 ? code - 128 : code
      assert(length > 0 && x + length <= width, 'Invalid scanline run')
      if (code > 128) planes.fill(source[position++], channel * count + y * width + x, channel * count + y * width + x + length)
      else { planes.set(source.subarray(position, position + length), channel * count + y * width + x); position += length }
      x += length
    }
  }
}
assert.equal(position, source.length)
for (let channel = 0; channel < 4; channel++) for (let y = 0; y < height; y++) for (let x = width - 1; x > 0; x--) {
  const i = channel * count + y * width + x
  planes[i] = (planes[i] - planes[i - 1]) & 255
}
const buffer = Buffer.alloc(16 + planes.length)
buffer.write('PHDR0001'); buffer.writeUInt32LE(width, 8); buffer.writeUInt32LE(height, 12); buffer.set(planes, 16)
const compressed = gzipSync(buffer, { level: 9 })
writeFileSync('public/Assets/hdri/potsdamer_platz_1k.rgbe.gz', compressed)
console.log(`Lossless hero lighting: ${source.length} → ${compressed.length} bytes`)
