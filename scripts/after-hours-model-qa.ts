import assert from 'node:assert/strict'
import { cellAt, point, roomType, visibleCells } from '../src/components/after-hours/world'

let checked = 0
for (const col of [-10000, -17, -1, 0, 1, 127, 10000]) for (const row of [-10000, -9, 0, 7, 10000]) {
  const p = point(col, row), inverse = cellAt(p.x, p.y)
  assert.equal(inverse.col, col); assert.equal(inverse.row, row)
  assert.equal(roomType(col, row), roomType(col, row))
  assert(roomType(col, row) >= 0 && roomType(col, row) < 8); checked++
}
const kinds = new Set<number>()
for (let col = -8; col <= 8; col++) for (let row = -8; row <= 8; row++) kinds.add(roomType(col, row))
assert.equal(kinds.size, 8)
for (const zoom of [.55, 1.05, 2.2]) for (const width of [320, 768, 1728]) {
  const cells = visibleCells(width, 820, { x: 0, y: 0, zoom })
  assert(cells.length > 0 && cells.length < 350)
  assert.equal(new Set(cells.map(c => `${c.col},${c.row}`)).size, cells.length)
  assert(cells.every((c, i) => !i || c.col + c.row >= cells[i - 1].col + cells[i - 1].row))
  const distant = visibleCells(width, 820, { x: 1e7, y: -1e7, zoom })
  assert(distant.length > 0 && distant.length < 400, 'culling stays bounded far from the origin'); checked++
}
console.log(`PASS ${checked} coordinate/culling cases; all 8 workshop types reachable.`)
