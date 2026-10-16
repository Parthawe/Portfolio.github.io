// Source-derived detail views for the Revolving Stage Anatomy journey.
// Dimensions other than the documented footprints are illustrative.
import * as k from './vendor/anatomy/iso-kit.mjs'
import * as G from './vendor/anatomy/lathe.mjs'
import * as A from './vendor/anatomy/audit.mjs'
import {writeFileSync} from 'node:fs'
const P=k.fitProjection(k.boxCorners({x:-32,y:-32,w:64,d:64},0,210),700,700,{pad:45,azimuth:42,elevation:28})
const R=A.recorder(P),lifts={'plate-2':0,housing:20,ball:65,thrust:105,shaft:150,'plate-1':200}
function put(id,name,shape,paths){R.put({piece:id,name,move:[0,0,lifts[id]],svg:k.solidSvg(paths,{tone:'mid'}),shapes:[R.solid(shape)]})}
function plate(id,z){const plan={x:-30,y:-30,w:60,d:60,r:0};put(id,id,A.slab(plan,z,4,{name:id,ground:id==='plate-2'}),k.slabOf(plan,z,4,P,8,0))}
function ring(id,z,h,ri,ro){
 // Separate annular sectors let the shaft pass behind the front wall and
 // in front of the rear wall. A single ring cannot have one painter key.
 for(let i=0;i<32;i++){
  const a=i*Math.PI/16,b=(i+1)*Math.PI/16
  const arc=(r,reverse=false)=>Array.from({length:5},(_,j)=>{const t=reverse?b-(b-a)*j/4:a+(b-a)*j/4;return[r*Math.cos(t),r*Math.sin(t)]})
  const outer=arc(ro),inner=arc(ri,true),poly=[...outer,...inner],name=id+' sector '+i
  const paths=k.extrude(poly,z,h,P)
  // Suppress the artificial radial seams between adjacent sectors.
  paths.outline=k.pathOf(outer.map(([x,y])=>k.iso([x,y,z+h],P)))+k.pathOf(inner.map(([x,y])=>k.iso([x,y,z+h],P)));paths.crease=''
  put(id,name,A.extruded(poly,z,h,{name}),paths)
 }
}

plate('plate-2',0)
const HF=G.frameAlong([0,0,4],[0,0,1]);put('housing','housing floor',A.solid(HF,[[0,22],[4,22]],{name:'housing floor'}),G.solidOf([[0,22],[4,22]],HF,P))
ring('housing',8,26,16,22);ring('ball',8,6,10,16);ring('thrust',14,6,10,16)
for(const [name,z,h,r] of [['shaft stem',8,26,10],['shaft shoulder',34,4,16]]){const F=G.frameAlong([0,0,z],[0,0,1]);put('shaft',name,A.solid(F,[[0,r],[h,r]],{name}),G.solidOf([[0,r],[h,r]],F,P))};plate('plate-1',38)
const states=Array.from({length:11},(_,i)=>i/10);A.settle(R,P,{states});A.auditOrExit(R,P,{frames:states,apart:true})
const groups=R.items.sort((a,b)=>a.key-b.key).map(item=>({id:item.piece,name:item.name,lift:lifts[item.piece],svg:item.svg}))
// Use the same camera as the existing overview so the original support stack stays fixed.
const OP=k.fitProjection(k.boxCorners({x:-225,y:-120,w:450,d:240,r:0},0,300),1000,750,{pad:55,azimuth:42,elevation:28})
const poses=Array.from({length:46},(_,i)=>-90+i*5).map(angle=>{const a=angle*Math.PI/180,ring=[[-225,-120],[225,-120],[225,120],[-225,120]].map(([x,y])=>[x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)]);const plate=[[-15,-15],[15,-15],[15,15],[-15,15]].map(([x,y])=>[x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)]);return{angle,plate:k.solidSvg(k.extrude(plate,25,1,OP),{tone:'mid'}),svg:k.solidSvg(k.extrude(ring,26,5,OP),{tone:'hi'})}})
const bounds=poses.flatMap(({angle})=>{const a=angle*Math.PI/180;return[-225,225].flatMap(x=>[-120,120].flatMap(y=>[0,31].map(z=>k.iso([x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a),z],OP))))})
const left=Math.min(...bounds.map(p=>p[0]))-20,right=Math.max(...bounds.map(p=>p[0]))+20,top=Math.min(...bounds.map(p=>p[1]))-120,bottom=Math.max(...bounds.map(p=>p[1]))+20
const rotationViewBox=[left,top,right-left,bottom-top].join(' ')
if(!process.exitCode)writeFileSync('src/components/case-study/anatomy/stage-details.json',JSON.stringify({width:700,height:700,rise:k.screenRise(1,P),groups,poses,rotationViewBox}))
