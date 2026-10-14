import * as k from './vendor/anatomy/iso-kit.mjs'
import * as G from './vendor/anatomy/lathe.mjs'
import {writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'
// Units are proportional illustration units, not measured fabrication dimensions.
const scenes={};let P,parts,live,points,count;
function start(bounds,elevation=18){P=k.fitProjection(bounds,900,650,{pad:65,azimuth:73,elevation});parts=[];live=[];points=[];count=0}
const at=p=>k.iso(p,P),path=ps=>k.pathOf(ps.map(at));
function put(svg){parts.push(svg);count++;return svg}
function slab(x,y,z,w,d,h,cls=''){return put(k.solidSvg(k.slabOf({x,y,w,d,r:.5},z,h,P,3,.3),{tone:'mid',className:cls}))}
const face=(poly,y,h,cls='')=>put(k.solidSvg(G.prismOf(G.frameOf([0,y,0],[0,1,0],[1,0,0],[0,0,1]),poly,0,h,P),{tone:'hi',className:cls}));
function round(o,axis,r,h,cls=''){return put(k.solidSvg(G.solidOf([[0,r],[h,r]],G.frameAlong(o,axis),P),{tone:'mid',className:cls}))}
function line(ps,cls=''){return put(`<path class="iso-line ja-line ${cls}" d="${path(ps)}"/>`)}
function screw(x,y,z){round([x,y,z],[0,1,0],1.2,.7);line([[x-.7,y+.75,z],[x+.7,y+.75,z]])}
function board(x,y,z){slab(x,y,z,20,3,36,'ja-board');slab(x+6,y+3,z+12,8,1,10);for(let j=0;j<8;j++){slab(x+1,y+3,z+3+j*4,2,1.5,2);slab(x+17,y+3,z+3+j*4,2,1.5,2)}slab(x+7,y+3,z+29,6,3,6)}
function servo(x,y,z,i){slab(x-5,y,z-8,10,8,16,'ja-servo');slab(x-7,y,z-6,14,2,2);slab(x-7,y,z+4,14,2,2);round([x,y+8,z],[0,1,0],2,2);screw(x-6,y+2,z+5);screw(x+6,y+2,z-5);const a=parts.length;face([[x-1.5,z-2],[x+1.5,z-2],[x+1.5,z+13],[x-1.5,z+13]],y+10,1,'ja-horn');const svg=parts.splice(a).join('');live.push({id:`horn-${i}`,svg,pivot:at([x,y+10,z])});points.push(at([x,y+11,z]))}
function finish(name){scenes[name]={width:900,height:650,projection:P,svg:parts.join(''),live,points,parts:count};assert(!/NaN|Infinity/.test(JSON.stringify(scenes[name])))}
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
// Rainstick rack: four corner pivots; all tubes move about their own mount.
start(k.boxCorners({x:-90,y:-12,w:180,d:32,r:0},0,290),18);
for(const x of [-56,56])slab(x,-5,0,9,15,259,'ja-timber');for(const z of [0,19,113,250])slab(-56,-5,z,121,15,8,'ja-timber');board(20,10,120);
for(const [i,[x,z]] of [[-64,245],[72,245],[-64,119],[72,119]].entries()){slab(x-5,0,z-7,10,12,14,'ja-servo');round([x,12,z],[0,1,0],3,4);const from=parts.length;round([x,17,z-33],[0,0,1],5,66,'ja-timber');for(const zz of [-33,27])round([x,17,z+zz],[0,0,1],5.6,6,'ja-cap');round([x,17,z-4],[0,0,1],5.8,8,'ja-band');live.push({id:`stick-${i}`,svg:parts.splice(from).join(''),pivot:at([x,17,z])});points.push(at([x,17,z]));screw(x,16,z)}
finish('rain');
writeFileSync('src/components/jugalbandi-anatomy/art.json',JSON.stringify(scenes));console.log(Object.entries(scenes).map(([name,s])=>`${name}: ${s.parts} parts`).join('\n'))

// The case-study story needs only the harp, not all three instruments.
writeFileSync('src/components/anatomy-stories/harp-art.json',JSON.stringify(scenes.harp));
