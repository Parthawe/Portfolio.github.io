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

const { walkingFeet, watering, characterTime } = await import('../src/components/after-hours/motion')
let stanceChecks=0
for(const length of [10,12])for(let i=-1000;i<=1000;i++){
 const distance=i*.071,a=walkingFeet(distance,length),b=walkingFeet(distance+.00001,length)
 for(const name of ['left','right'] as const){
  assert(Number.isFinite(a[name].x)&&a[name].y<=0&&a[name].y>=-2.50001)
  if(a[name].planted&&b[name].planted){
   assert(Math.abs((distance+a[name].x)-(distance+.00001+b[name].x))<1e-8,'a supporting foot stays on the same floor point during full-stride travel');stanceChecks++
  }
  assert(Math.hypot(a[name].x-b[name].x,a[name].y-b[name].y)<.001,'foot paths join without a position jump')
 }
}
for(let i=-1200;i<=1200;i++){
 const t=i*.01,p=((t%12)+12)%12/12,amount=watering(t)
 assert(amount>=0&&amount<=1)
 if(p<.45||p>.56)assert.equal(amount,0,'water stops outside the watering rest')
 assert(Math.abs(watering(t+.00001)-amount)<.001,'water ramps in and out without a cut')
 assert(characterTime(t)<=t+1e-9&&t-characterTime(t)<1/12+1e-9)
}
for(const duration of [12,14,18])for(const p of [.08,.45,.58,.95,1]){
 const a=patrol((p-.000001)*duration,duration),b=patrol((p+.000001)*duration,duration)
 assert(Math.abs(a.blend-b.blend)<.00001,'walking settles continuously into and out of rests')
}
console.log(`PASS: ${stanceChecks} planted-foot contacts, 4,002 gait samples, 2,401 watering/cadence samples and all gait-rest boundaries.`)

const { GARDEN } = await import('../src/components/after-hours/world')
for(let i=0;i<=1200;i++){
 const route=patrol(i*.01,12),x=GARDEN.startX+route.position*GARDEN.span
 assert(Math.abs(x)+Math.abs(GARDEN.pathY)*124/64<124,'the walking route stays on its room floor')
}
assert(Math.abs(GARDEN.pot.x)+7+(GARDEN.pot.y+4)*124/64<124,'the front pot fits on the room floor')
const { canSpout } = await import('../src/components/after-hours/motion')
const fullPourX=GARDEN.startX+GARDEN.span+11+canSpout(1).x
assert(Math.abs(fullPourX-GARDEN.pot.x)<5,'the spout reaches the target pot, including the pour rotation')
console.log('PASS: 1,201 garden floor positions, target pot footprint and pouring reach.')

const { pickCell } = await import('../src/components/after-hours/world')
for(const zoom of [.55,1.6,2.2,3.6]){
 const camera={x:0,y:0,zoom},width=1440,height=1000
 for(const [x,y] of [[0,0],[0,-120],[40,32]])assert.deepEqual(pickCell(width,height,camera,width/2+x*zoom,height/2+y*zoom),{col:0,row:0},'room wall and floor hit targets agree with the tall illustration')
}
console.log('PASS: 12 illustrated wall/floor hit targets across overview, mobile, opening and close zoom.')
