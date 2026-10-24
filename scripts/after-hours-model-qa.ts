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
for (let col = -8; col <= 8; col++) for (let row = -8; row <= 8; row++) {
  for (const [dx, dy] of [[1,0],[0,1],[1,1],[1,-1]]) assert.notEqual(roomType(col,row),roomType(col+dx,row+dy), 'neighbouring rooms have different authored sets')
}
for (const zoom of [.55, 1.05, 2.2, 3.6]) for (const width of [320, 768, 1728]) {
  const cells = visibleCells(width, 820, { x: 0, y: 0, zoom })
  assert(cells.length > 0 && cells.length < 350)
  assert.equal(new Set(cells.map(c => `${c.col},${c.row}`)).size, cells.length)
  assert(cells.every((c, i) => !i || c.col + c.row >= cells[i - 1].col + cells[i - 1].row))
  const distant = visibleCells(width, 820, { x: 1e7, y: -1e7, zoom })
  assert(distant.length > 0 && distant.length < 400, 'culling stays bounded far from the origin'); checked++
}
console.log(`PASS ${checked} coordinate/culling cases; all 8 workshop types reachable.`)

// Continuous loops must not teleport at zero, the endpoint pauses, or arm stages.
const { patrol, parcelArm } = await import('../src/components/after-hours/motion')
const { cellVariation } = await import('../src/components/after-hours/world')
for (const duration of [12,14,18]) {
 for (let i=-1000;i<=1000;i++) {
  const time=i*duration/1000,a=patrol(time,duration),b=patrol(time+.0001,duration)
  assert(a.position>=0&&a.position<=1)
  assert(Math.abs(a.position-b.position)<.0001,'patrol position stays continuous through turns and loop boundary')
  assert([1,-1].includes(a.facing))
 }
}
for(let i=-1000;i<=1000;i++){
 const time=i/100,a=parcelArm(time),b=parcelArm(time+.00001)
 assert(Number.isFinite(a.x)&&Number.isFinite(a.y))
 assert(Math.hypot(a.x-b.x,a.y-b.y)<.01,'arm stays continuous at pickup, release and loop boundary')
}
const variants=new Set<number>()
for(let col=-20;col<=20;col++)for(let row=-20;row<=20;row++){
 const v=cellVariation(col,row);assert.equal(v,cellVariation(col,row));assert(v>=0&&v<=0xffffffff);variants.add(v%12)
}
assert.equal(variants.size,12,'addresses use all orientation/accessory combinations')
console.log('PASS: 6,003 patrol samples, 2,001 arm samples and 1,681 stable address variations; no motion-boundary jumps.')
