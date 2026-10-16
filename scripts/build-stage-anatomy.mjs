// Anatomy by Ryan (MIT), vendored under scripts/vendor/anatomy.
// Source: RevolvingStage/photos/full-assembly-exploded.png. Footprints 15×8 ft / 8×8 ft.
// Component thicknesses are illustrative. This is an assembly drawing, not a load simulation.
import * as k from './vendor/anatomy/iso-kit.mjs'
import * as G from './vendor/anatomy/lathe.mjs'
import * as A from './vendor/anatomy/audit.mjs'
import {writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'
const deck={x:-225,y:-120,w:450,d:240,r:0},base={x:-120,y:-120,w:240,d:240,r:0}
const P=k.fitProjection(k.boxCorners(deck,0,300),1000,750,{pad:55,azimuth:42,elevation:28})
const lifts={base:0,casters:35,axle:100,deck:260}
const R=A.recorder(P)
const put=(piece,shape,paths)=>R.put({piece,name:shape.name,move:[0,0,lifts[piece]],svg:k.solidSvg(paths,{tone:'mid'}),shapes:[R.solid(shape)]})
function slab(piece,name,plan,z,h){put(piece,A.slab(plan,z,h,{name,ground:piece==='base'}),k.slabOf(plan,z,h,P,8,0))}
function turned(piece,name,F,profile){put(piece,A.solid(F,profile,{name}),G.solidOf(profile,F,P))}
slab('base','fixed base',base,0,8)
for(const [r,n] of [[104,8],[64,6]])for(let i=0;i<n;i++){
 const a=i*2*Math.PI/n,x=Math.cos(a)*r,y=Math.sin(a)*r,axis=[Math.cos(a),Math.sin(a),0],tangent=[-axis[1],axis[0],0],name=`caster ${r}-${i}`
 slab('casters',name+' mount',{x:x-10,y:y-10,w:20,d:20,r:0},8,1.5)
 const F=G.frameAlong([x,y,18],axis)
 turned('casters',name+' wheel',F,[[-3,8],[3,8]])
 // Forks meet the wheel's side faces. External axle caps meet the outer fork faces.
 for(const side of [-1,1]){
  const ring=[[3*side,-2],[5*side,-2],[5*side,2],[3*side,2]].map(([u,v])=>[x+axis[0]*u+tangent[0]*v,y+axis[1]*u+tangent[1]*v])
  if(side<0)ring.reverse()
  put('casters',A.extruded(ring,9.5,10.5,{name:name+' fork '+side}),k.extrude(ring,9.5,10.5,P))
  turned('casters',name+' cap '+side,F,side<0?[[-6,2],[-5,2]]:[[5,2],[6,2]])
 }
}
slab('axle','lower axle plate',{x:-15,y:-15,w:30,d:30,r:0},8,2)
for(const [name,r,z,h] of [['bearing housing',12,10,8],['bearing collar',10,18,2],['shaft',7,20,5]])turned('axle',name,G.frameAlong([0,0,z],[0,0,1]),[[0,r],[h,r]])
slab('axle','upper axle plate',{x:-15,y:-15,w:30,d:30,r:0},25,1)
slab('deck','revolving platform',deck,26,5)
const states=Array.from({length:11},(_,i)=>i/10)
A.settle(R,P,{states})
A.auditOrExit(R,P,{frames:states,apart:true})
const groups=R.items.sort((a,b)=>a.key-b.key).map(item=>({id:item.piece,name:item.name,lift:lifts[item.piece],svg:item.svg}))
for(const g of groups)assert(!/NaN|Infinity/.test(g.svg))
if(!process.exitCode)writeFileSync('src/components/case-study/anatomy/stage-art.json',JSON.stringify({width:1000,height:750,rise:k.screenRise(1,P),groups}))
console.log(`Stage Anatomy: ${R.solids.length} source-based assembly parts; 15:8 deck footprint.`)
