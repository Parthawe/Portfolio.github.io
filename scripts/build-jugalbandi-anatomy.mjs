import * as k from './vendor/anatomy/iso-kit.mjs'
import * as G from './vendor/anatomy/lathe.mjs'
import {writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'
// Units are proportional illustration units, not measured fabrication dimensions.
const scenes={};let P,parts,live,points,count;
function start(bounds,elevation=18,azimuth=73){P=k.fitProjection(bounds,900,650,{pad:65,azimuth,elevation});parts=[];live=[];points=[];count=0}
const at=p=>k.iso(p,P),path=ps=>k.pathOf(ps.map(at));
function put(svg){parts.push(svg);count++;return svg}
function slab(x,y,z,w,d,h,cls=''){return put(k.solidSvg(k.slabOf({x,y,w,d,r:.5},z,h,P,3,.3),{tone:'mid',className:cls}))}
const face=(poly,y,h,cls='')=>put(k.solidSvg(G.prismOf(G.frameOf([0,y,0],[0,1,0],[1,0,0],[0,0,1]),poly,0,h,P),{tone:'hi',className:cls}));
function round(o,axis,r,h,cls=''){return put(k.solidSvg(G.solidOf([[0,r],[h,r]],G.frameAlong(o,axis),P),{tone:'mid',className:cls}))}
function line(ps,cls=''){return put(`<path class="iso-line ja-line ${cls}" d="${path(ps)}"/>`)}
function screw(x,y,z){round([x,y,z],[0,1,0],1.2,.7);line([[x-.7,y+.75,z],[x+.7,y+.75,z]])}
function board(x,y,z){slab(x,y,z,20,3,36,'ja-board');slab(x+6,y+3,z+12,8,1,10);for(let j=0;j<8;j++){slab(x+1,y+3,z+3+j*4,2,1.5,2);slab(x+17,y+3,z+3+j*4,2,1.5,2)}slab(x+7,y+3,z+29,6,3,6)}
function servo(x,y,z,i){slab(x-5,y,z-8,10,8,16,'ja-servo');slab(x-7,y,z-6,14,2,2);slab(x-7,y,z+4,14,2,2);round([x,y+8,z],[0,1,0],2,2);screw(x-6,y+2,z+5);screw(x+6,y+2,z-5);const a=parts.length;face([[x-1.5,z-2],[x+1.5,z-2],[x+1.5,z+13],[x-1.5,z+13]],y+10,1,'ja-horn');const svg=parts.splice(a).join('');live.push({id:`horn-${i}`,svg,pivot:at([x,y+10,z])});points.push(at([x,y+11,z]))}
function finish(name){scenes[name]={width:900,height:650,projection:P,svg:parts.join(''),live,points,parts:count,embedded:false};assert(!/NaN|Infinity/.test(JSON.stringify(scenes[name])))}
// Harp: tall rectangular mounting frame, rounded lyre body, diagonal upper servo rail.
start(k.boxCorners({x:-100,y:-18,w:240,d:66,r:0},0,270));
for(const x of [-93,93])slab(x,-10,0,9,20,260,'ja-timber');slab(-93,-10,251,195,20,9,'ja-timber');slab(-93,-10,0,195,20,9,'ja-timber');
slab(-86,8,15,179,3,230,'ja-backing');
for(const x of [-86,87])slab(x,11,9,6,6,242,'ja-frame');slab(-86,11,9,179,6,6,'ja-frame');slab(-86,11,245,179,6,6,'ja-frame');
for(const x of [-30,30])for(const z of [65,180])round([x,11,z],[0,1,0],2,6);
const body=Array.from({length:72},(_,i)=>{const a=i*Math.PI*2/72;return [48*Math.sign(Math.cos(a))*Math.abs(Math.cos(a))**(2/2.8),127+86*Math.sign(Math.sin(a))*Math.abs(Math.sin(a))**(2/2.8)]});face(body,17,8,'ja-timber');
// The visible central aperture is a recess on the face, not a hole through the backboard.
round([2,25,105],[0,1,0],12,.4,'ja-hole');round([2,25.5,105],[0,1,0],10,.1,'ja-hole');
slab(-40,25,67,80,4,4,'ja-timber');
const strings=[];for(let i=0;i<21;i++){const x=-39+i*3.9;const span=78*Math.pow(1-Math.pow(Math.abs(x)/48,2.8),1/2.8);const z=127+span;const bottom=127-span;assert(Math.pow(Math.abs(x)/48,2.8)+Math.pow(Math.abs(z-127)/86,2.8)<1,'Tuning pins sit on the soundboard');round([x,25,z],[0,1,0],1.3,2);round([x,25,bottom],[0,1,0],.9,2);const ps=[[x,27,bottom+.9],[x,27,z-1.3]];strings.push(ps.map(at));put(`<path data-string="${i}" class="iso-line ja-string" d="${path(ps)}"/>`)}
face([[-98,218],[133,75],[127,71],[-98,211]],31,5,'ja-timber');slab(-98,31,70,231,5,5,'ja-timber');
const mounts=[];for(let i=0;i<6;i++)mounts.push([-39+i*15.5,184-i*9.6]);for(let i=0;i<5;i++)mounts.push([-27+i*14,81]);
// Harness follows the left margin to the two servo rails; endpoints land on cases and board headers.
mounts.forEach(([x,z],i)=>line([[-81,26,117+i*2],[-72+i*.7,30,120+i*2],[-65+i*.7,30,z-10],[x-5,30,z-6]],'ja-harness'));
mounts.forEach(([x,z],i)=>servo(x,27,z,i));for(const z of [118,142])round([-89,10,z],[0,1,0],1.5,8);board(-100,18,113);for(const [x,z] of [[-89,7],[98,7],[-89,253],[98,253],[-94,215],[125,73]])screw(x,(x===-94||x===125)?36:10,z);
finish('harp');scenes.harp.strings=strings;scenes.harp.channels=mounts.map(([x])=>Math.max(0,Math.min(20,Math.round((x+39)/3.9))));
// Flute construction view, as laid out in annotated photo 757.
start(k.boxCorners({x:-170,y:-70,w:365,d:142,r:0},0,75),35);
slab(-170,-70,0,365,142,3);
round([-140,0,27],[1,0,0],7,285,'ja-timber');for(const x of [-137,-115,-76,-55,120,138])round([x,0,27],[1,0,0],7.4,5,'ja-band');
for(let i=0;i<6;i++){const x=-18+i*24;round([x,0,33.8],[0,0,1],3,.3,'ja-hole');const side=i%2===0?-1:1;slab(x-9,side<0?-39:12,3,18,27,5);for(const dx of [-5,5])for(const dy of [0,9])round([x+dx,side<0?-32+dy:18+dy,8],[0,0,1],2,1.5);slab(x-6,side<0?-31:19,9,12,13,13,'ja-servo');const from=parts.length;slab(x-2,side<0?-20:-2,25,4,22,3,'ja-horn');round([x,0,28],[0,0,1],4,2,'ja-pad');live.push({id:`finger-${i}`,svg:parts.splice(from).join(''),pivot:at([x,side<0?-20:20,25])});points.push(at([x,0,34]))}
slab(-156,-63,3,52,28,2,'ja-board');for(const x of [-144,-120]){round([x,-48,5],[0,0,1],8,21);round([x,-48,26],[0,0,1],9,4);round([x,-48,30],[0,0,1],2,6)}
// Air hose in the photographed left-side margin, terminating at pump and blowing inlet.
line([[-144,-48,36],[-158,-48,36],[-164,-20,35],[-160,29,34],[-135,38,32],[-107,20,31],[-107,0,34]],'ja-hose');round([-107,0,34],[0,0,1],3,3);slab(155,-20,3,35,50,2,'ja-board');slab(166,-5,5,12,14,2);for(const x of [157,185])for(let j=0;j<10;j++)slab(x,-16+j*4,5,2,2,2);slab(168,23,5,8,7,4);finish('flute');
// Two cubic bays, with four corner rainsticks per level (owner correction).
// Back and front bays have real depth; moving groups stay in their structural slots.
start(k.boxCorners({x:-110,y:-85,w:220,d:170,r:0},0,290),23,48);
const rainSlots=[],rainParts=[];
const capture=(depth,draw)=>{const from=parts.length;draw();rainParts.push({depth,svg:parts.splice(from).join('')})};
for(const y of [-60,60])for(const x of [-60,60])capture(k.depthOf([x,y,124],P),()=>{
  slab(x-4,y-4,4,8,8,248,'ja-timber');
  for(const z of [8,128,248]){round([x,y+4,z],[0,1,0],1.7,1);screw(x,y+5,z)}
});
for(const z of [8,128,248]){
 for(const y of [-60,60])capture(k.depthOf([0,y,z],P),()=>slab(-56,y-4,z-4,112,8,8,'ja-timber'));
 for(const x of [-60,60])capture(k.depthOf([x,0,z],P),()=>slab(x-4,-56,z-4,8,112,8,'ja-timber'));
}
capture(k.depthOf([20,64,138],P),()=>board(10,64,133));
// Ordering is upper front L/R, upper rear L/R, then lower front and rear.
for(const z of [248,128])for(const y of [60,-60])for(const x of [-60,60]){
 const i=rainSlots.length,xx=x+(x<0?-12:12),yy=y+10;
 rainSlots.push({x:xx,y:yy,z});
 capture(k.depthOf([xx,yy,z],P),()=>{
  slab(x<0?xx-3:x+4,y-3,z-6,11,13,12,'ja-servo');round([xx,y+10,z],[0,1,0],3,5);
  const from=parts.length;round([xx,yy+7,z-29],[0,0,1],4.8,58,'ja-timber');
  for(const zz of [-29,24])round([xx,yy+7,z+zz],[0,0,1],5.2,5,'ja-cap');
  round([xx,yy+7,z-4],[0,0,1],5.5,8,'ja-band');
  const svg=parts.splice(from).join(''),pivot=at([xx,yy+7,z]);
  live.push({id:`stick-${i}`,svg,pivot});points.push(pivot);
  put(`<g data-moving="stick-${i}">${svg}</g>`);
 });
}
parts=rainParts.sort((a,b)=>a.depth-b.depth).map(part=>part.svg);
finish('rain');scenes.rain.embedded=true;scenes.rain.mounts=rainSlots;

// Hexa-18 enclosure: four sloping upper faces, six visible bamboo pipes,
// and an open tapered lower frame. Channel mapping is a separate demo bank:
// individual physical sensor assignments have not been recovered from firmware.
start(k.boxCorners({x:-100,y:-100,w:200,d:200,r:0},0,300),27,45);
const hexaParts=[];
const hexaCapture=(center,draw)=>{const from=parts.length;draw();hexaParts.push({depth:k.depthOf(center,P),svg:parts.splice(from).join('')})};
const beam=(a,b)=>{const length=Math.hypot(...b.map((n,i)=>n-a[i])),axis=b.map((n,i)=>(n-a[i])/length);put(k.solidSvg(G.prismOf(G.frameAlong(a,axis),[[-3,-3],[3,-3],[3,3],[-3,3]],0,length,P),{tone:'mid',className:'ja-timber'}))};
for(const x of [-1,1])for(const y of [-1,1])hexaCapture([x*60,y*60,50],()=>beam([x*35,y*35,3],[x*90,y*90,100]));
for(const z of [3,100])for(const sign of [-1,1]){const r=z===3?35:90;hexaCapture([0,sign*r,z],()=>beam([-r,sign*r,z],[r,sign*r,z]));hexaCapture([sign*r,0,z],()=>beam([sign*r,-r,z],[sign*r,r,z]))}
const slope=Math.hypot(40,100),inset=40/slope,up=100/slope;
for(const side of ['back-y','back-x','front-x','front-y']){
 const alongX=side.endsWith('y'),sign=side.startsWith('back')?-1:1;
 const origin=alongX?[0,sign*90,100]:[sign*90,0,100],normal=alongX?[0,sign*up,inset]:[sign*up,0,inset],u=alongX?[1,0,0]:[0,1,0],v=alongX?[0,-sign*inset,up]:[-sign*inset,0,up];
 const world=(x,h,offset=3.1)=>origin.map((n,i)=>n+u[i]*x+v[i]*h+normal[i]*offset);
 hexaCapture(world(0,54,0),()=>{
  put(k.solidSvg(G.prismOf(G.frameOf(origin,normal,u,v),[[-90,0],[90,0],[50,slope],[-50,slope]],0,3,P),{tone:'hi',className:'ja-hexa-panel'}));
  if(sign>0)for(let row=0;row<4;row++)for(const pair of [-1,1]){
   const center=world(-48+row*29,23+row*17+pair*6);
   round(center,normal,5.8,1.1,'ja-band');round(world(-48+row*29,23+row*17+pair*6,4.25),normal,4.4,.4,'ja-hole');
  }
 });
}
hexaCapture([0,0,203],()=>slab(-50,-50,200,100,100,3,'ja-hexa-panel'));
for(const [i,[x,y,height]] of [[-23,-22,83],[0,-22,45],[23,-22,65],[-23,14,50],[0,14,95],[23,14,30]].entries())hexaCapture([x,y,203+height/2],()=>{
 round([x,y,203],[0,0,1],4.8,height,'ja-timber');round([x,y,203+height],[0,0,1],5.2,1.8,'ja-band');round([x,y,205+height],[0,0,1],3.8,.2,'ja-hole');
});
parts=hexaParts.sort((a,b)=>a.depth-b.depth).map(part=>part.svg);
// The photo shows 16 circular transducers, not a recovered 18-channel layout.
// Keep one enclosure-inspection target instead of inventing sensor positions.
points=[at([0,0,140])];
finish('hexa');scenes.hexa.sensorCount=18;
writeFileSync('src/components/jugalbandi-anatomy/art.json',JSON.stringify(scenes));console.log(Object.entries(scenes).map(([name,s])=>`${name}: ${s.parts} parts`).join('\n'))

// The case-study story needs only the harp, not the entire workshop.
const {embedded:_embedded,...storyHarp}=scenes.harp;
writeFileSync('src/components/anatomy-stories/harp-art.json',JSON.stringify(storyHarp));
