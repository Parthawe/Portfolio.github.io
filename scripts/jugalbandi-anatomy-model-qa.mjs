import assert from 'node:assert/strict'
import { pluckAt, planeRotation, demoFrequency, flutePitchStep } from '../src/components/jugalbandi-anatomy/model.ts'
const P={azimuth:73,elevation:18}
for(const plane of ['xz','yz']) for(const angle of [-70,-32,0,45,70]) {
 const m=plane==='xz'?Math.sin(P.azimuth*Math.PI/180):-Math.cos(P.azimuth*Math.PI/180)
 const n=(plane==='xz'?Math.cos(P.azimuth*Math.PI/180):Math.sin(P.azimuth*Math.PI/180))*Math.sin(P.elevation*Math.PI/180),q=-Math.cos(P.elevation*Math.PI/180)
 const [a,b,c,d,e,f]=planeRotation(angle,[100,80],P,plane).slice(7,-1).split(' ').map(Number)
 assert(Math.abs(a*d-b*c-1)<1e-10,'rotation preserves planar area')
 const r=angle*Math.PI/180,x=12,z=19,sx=100+m*x,sy=80+n*x+q*z
 const xx=x*Math.cos(r)-z*Math.sin(r),zz=x*Math.sin(r)+z*Math.cos(r)
 assert(Math.abs(a*sx+c*sy+e-(100+m*xx))<1e-9)
 assert(Math.abs(b*sx+d*sy+f-(80+n*xx+q*zz))<1e-9)
}
let releaseEdges=0,previous=false
for(let t=0;t<=1.4;t+=.001){const s=pluckAt(t);assert(Number.isFinite(s.angle)&&Number.isFinite(s.deflection));assert(s.angle<=0&&s.angle>=-32);if(s.released&&!previous)releaseEdges++;previous=s.released}
assert.equal(releaseEdges,1);assert.equal(pluckAt(.29).released,false);assert.equal(pluckAt(.3).released,true);assert.equal(pluckAt(1.3).done,true)
for(let i=0;i<11;i++)assert(demoFrequency(i)>0)
console.log('PASS: projected hinge rotations, bounded servo travel, one release per cycle, finite demo tuning.')

assert(flutePitchStep([false,false,false,false,false,false]) > flutePitchStep([true,true,true,true,true,true]))
assert.equal(flutePitchStep([false,true,true,true,true,true]), flutePitchStep([false,false,false,false,false,false]), 'nearest open hole dominates the simplified model')

const {readFileSync}=await import('node:fs')
const art=JSON.parse(readFileSync(new URL('../src/components/jugalbandi-anatomy/art.json',import.meta.url),'utf8'))
assert.equal(art.rain.live.length,8);assert.equal(art.rain.points.length,8)
assert.deepEqual([...new Set(art.rain.mounts.map(m=>m.z))],[248,128])
for(const level of [248,128])assert.equal(new Set(art.rain.mounts.filter(m=>m.z===level).map(m=>`${m.x},${m.y}`)).size,4)
assert.equal(art.hexa.sensorCount,18);assert.equal(art.hexa.points.length,1,'one enclosure target; no invented 18-channel physical map')
const {midiForSensor,HEXA_SENSOR_COUNT}=await import('../src/components/jugalbandi-anatomy/model.ts')
assert.equal(HEXA_SENSOR_COUNT,18)
for(let i=0;i<18;i++){const event=midiForSensor(i);assert.equal(event.sensor,i);assert.equal(event.note,60+i);assert(event.velocity>0&&event.velocity<=127)}
assert.equal(midiForSensor(-1,0).velocity,1);assert.equal(midiForSensor(30,300).note,77);assert.equal(midiForSensor(30,300).velocity,127)
console.log('PASS: eight rainsticks across two cubic bays; 18 bounded MIDI demo inputs.')
