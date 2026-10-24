import { ease, parcelArm, patrol, phase, walkingFeet, watering, characterTime } from './motion'

// Original procedural illustrations. No artwork or source from Floor796 is used.
export const ROOMS = [
  { name: 'The greenhouse', color: '#5c7d65', note: 'The gardener tends a small forest while the ventilation fan turns.' },
  { name: 'Print night', color: '#9c654d', note: 'Fresh sheets travel through the press. Someone is still mixing the ink.' },
  { name: 'Listening room', color: '#626d98', note: 'A record turns, the sequencer blinks, and the drummer never quite stops.' },
  { name: 'Robot repairs', color: '#b58a43', note: 'A patient arm sorts parcels as the little inspection robot makes its rounds.' },
  { name: 'The observatory', color: '#4b7891', note: 'A telescope sweeps the room. The planets here have their own orbit.' },
  { name: 'Clock department', color: '#98735c', note: 'Three clocks disagree. The watchmaker keeps turning the same gear.' },
  { name: 'Tea break', color: '#8d6d81', note: 'The kettle is on. Two colleagues have forgotten whose turn it is.' },
  { name: 'Kinetic gallery', color: '#587d7d', note: 'A pendulum draws a quiet rhythm beside a slowly turning sculpture.' },
] as const
export const GARDEN = { startX: -48, span: 57, pathY: 31, pot: { x: 42, y: 34 } } as const
export type Camera = { x: number; y: number; zoom: number }
export type Cell = { col: number; row: number }
export function roomType(col: number, row: number) {
  // Curated eight-colour lattice: immediate neighbours never repeat a room.
  const sequence = [0, 3, 6, 2, 7, 1, 5, 4]
  return sequence[((col * 3 + row * 2) % 8 + 8) % 8]
}
export const point = (col: number, row: number) => ({ x: (col - row) * 132, y: (col + row) * 70 })
export function cellAt(x: number, y: number): Cell {
  return { col: Math.round((x / 132 + y / 70) / 2), row: Math.round((y / 70 - x / 132) / 2) }
}
export function visibleCells(width: number, height: number, camera: Camera) {
  const corners = [[0, 0], [width, 0], [0, height], [width, height]].map(([x, y]) => cellAt((x - width / 2) / camera.zoom + camera.x, (y - height / 2) / camera.zoom + camera.y))
  const result: Cell[] = []
  for (let col = Math.min(...corners.map(c => c.col)) - 2; col <= Math.max(...corners.map(c => c.col)) + 2; col++) {
    for (let row = Math.min(...corners.map(c => c.row)) - 2; row <= Math.max(...corners.map(c => c.row)) + 2; row++) {
      const p = point(col, row), x = (p.x - camera.x) * camera.zoom + width / 2, y = (p.y - camera.y) * camera.zoom + height / 2
      if (x > -170 * camera.zoom && x < width + 170 * camera.zoom && y > -100 * camera.zoom && y < height + 160 * camera.zoom) result.push({ col, row })
    }
  }
  return result.sort((a, b) => a.col + a.row - b.col - b.row)
}

/** Stable per-address variation; never samples Math.random during a frame. */
export function cellVariation(col: number, row: number) {
 let n = Math.imul(col, 374761393) ^ Math.imul(row, 668265263)
 n = Math.imul(n ^ n >>> 13, 1274126177)
 return (n ^ n >>> 16) >>> 0
}
type Context = CanvasRenderingContext2D
// Ochre wood, oxidised blue and garden greens. Keep linework coloured, not black.
const INK = '#46554c', CREAM = '#f3e5bd', GOLD = '#caa666', RED = '#b97964', BLUE = '#769897', GREEN = '#7d986b'
const FLOOR = ['#acb99a', '#cfb593', '#a5aaa0', '#b7b6a0', '#99acac', '#c1af91', '#cbb49c', '#adb9a3']
const WALL = ['#d9dec3', '#e7d6b5', '#d6d7c4', '#d7d7bc', '#c6d4cb', '#e1d1b0', '#ead7b9', '#d8ddc6']
function polygon(c: Context, points: number[][], color: string) { c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill() }
function rect(c: Context,x:number,y:number,w:number,h:number,color:string){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,Math.min(1.8,Math.abs(w)/3,Math.abs(h)/3));c.fill()}
function line(c:Context,points:number[][],color:string,width=2){c.strokeStyle=color;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}
function ellipse(c:Context,x:number,y:number,rx:number,ry:number,color:string){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
function box(c:Context,x:number,y:number,w:number,d:number,h:number,color:string,top=CREAM){
 ellipse(c,x+(w-d)/2,y+(w+d)/4+2,(w+d)*.55,Math.max(4,(w+d)*.22),'#46554c17')
 polygon(c,[[x+w,y+w/2],[x+w-d,y+(w+d)/2],[x+w-d,y+(w+d)/2-h],[x+w,y+w/2-h]],color)
 polygon(c,[[x+w-d,y+(w+d)/2],[x-d,y+d/2],[x-d,y+d/2-h],[x+w-d,y+(w+d)/2-h]],color)
 polygon(c,[[x+w-d,y+(w+d)/2],[x-d,y+d/2],[x-d,y+d/2-h],[x+w-d,y+(w+d)/2-h]],'#46554c25')
 polygon(c,[[x,y-h],[x+w,y+w/2-h],[x+w-d,y+(w+d)/2-h],[x-d,y+d/2-h]],top)
 line(c,[[x-d+2,y+d/2-h+1],[x+w-d,y+(w+d)/2-h-1],[x+w-2,y+w/2-h+1]],'#fff5d73d',1)
}
function leaf(c:Context,x:number,y:number,angle:number,length:number,color:string){
 c.save();c.translate(x,y);c.rotate(angle);c.fillStyle=color;c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-length*.6,-length*.3,-length*.4,-length*.9,0,-length);c.bezierCurveTo(length*.5,-length*.7,length*.5,-length*.1,0,0);c.fill();c.restore()
}
function plant(c:Context,x:number,y:number,t:number,height=28){
 ellipse(c,x,y+2,11,4,'#46554c1c');c.fillStyle='#bc896c';c.beginPath();c.moveTo(x-7,y-10);c.lineTo(x-5,y+1);c.quadraticCurveTo(x,y+4,x+5,y+1);c.lineTo(x+7,y-10);c.fill();ellipse(c,x,y-10,7,3,'#d5ad86');ellipse(c,x,y-11,5,2,'#716e51')
 const lean=Math.sin(t*1.3)*2;line(c,[[x,y-10],[x+lean,y-height]],'#738b5d',1.2)
 for(let n=0;n<4;n++){leaf(c,x+lean*n/4,y-12-n*height/5,-.8-n*.08,10+n*1.3,n%2?'#7e9b64':'#9ab37b');leaf(c,x+lean*n/4,y-14-n*height/5,.8,10+n,'#b8c78a')}
}
type Pose='walk'|'work'|'wave'|'drum'|'idle'
type PersonMotion = { facing?: number; distance?: number; carryCan?: boolean; pour?: number; walkBlend?: number }
function wateringCan(c:Context,x:number,y:number,pour:number){
 const angle=pour*.26;c.save();c.translate(x,y);c.rotate(angle)
 c.strokeStyle=BLUE;c.lineWidth=2;c.beginPath();c.ellipse(-1,-4,4,5,0,0,Math.PI*2);c.stroke()
 ellipse(c,7,-1,8,7,BLUE);ellipse(c,7,-7,6,2,'#a9bdb3');ellipse(c,7,-7,4,1,'#6c8c87')
 line(c,[[12,-4],[19,-7],[24,-1]],BLUE,2.5);ellipse(c,24,-1,1.5,1,'#abc3b6');c.restore()
 return { x:x+24*Math.cos(angle)+Math.sin(angle), y:y+24*Math.sin(angle)-Math.cos(angle) }
}
function person(c:Context,x:number,y:number,shirt:string,t:number,pose:Pose='idle',variant=0,motion:PersonMotion={}){
 t=characterTime(t)
 const facing=motion.facing??1,distance=motion.distance??0,gait=walkingFeet(distance),blend=pose==='walk'?(motion.walkBlend??1):0
 const left={x:gait.left.x*blend,y:gait.left.y*blend},right={x:gait.right.x*blend,y:gait.right.y*blend}
 const stride=Math.sin(distance*Math.PI/12)*2.5*blend,bob=Math.sin(distance*Math.PI/12)**2*.7*blend+Math.sin(t*1.8)*.35*(1-blend)
 c.save();c.translate(x,y);c.scale(facing,1)
 ellipse(c,1,1,9,3,'#46554c24')
 // Feet remain in floor coordinates while the chest and head rise over them.
 line(c,[[-3,-12-bob],[-4+left.x,-2+left.y]],'#65756a',4);line(c,[[3,-12-bob],[4+right.x,-2+right.y]],'#65756a',4)
 ellipse(c,-5+left.x,-1+left.y,4,2,'#625b4b');ellipse(c,4+right.x,-1+right.y,4,2,'#625b4b');c.translate(0,-bob)
 c.fillStyle=shirt;c.beginPath();c.moveTo(-4,-27);c.bezierCurveTo(-9,-24,-7,-17,-8,-11);c.quadraticCurveTo(0,-8,8,-11);c.bezierCurveTo(6,-18,8,-24,4,-27);c.fill()
 // Canvas apron and pocket, with different hair and hats rather than square sprites.
 if(variant%3===0){polygon(c,[[-3,-24],[3,-24],[5,-12],[-5,-12]],'#e7d7ad');rect(c,-2,-18,5,3,'#d4bf97')}
 else if(variant%3===1){line(c,[[-4,-26],[-3,-17],[-5,-11]],'#c1bca0',1);line(c,[[4,-26],[3,-17],[5,-11]],'#c1bca0',1);rect(c,-3,-19,6,5,'#b4b3a0');ellipse(c,0,-16,1,1,CREAM)}
 else {line(c,[[0,-25],[0,-11]],'#f2e0ba',1);for(let i=0;i<3;i++)ellipse(c,1,-21+i*4,.55,.55,CREAM)}
 line(c,[[-5,-12],[-3,-14]],'#46554c26',.8)
 const skin=variant%2?'#c99d7b':'#e6bd96',hand=pose==='work'?Math.sin(t*3.1)*5:pose==='drum'?Math.sin(t*7)*9:pose==='wave'?-10+Math.sin(t*3)*3:stride
 const rightHand=motion.carryCan?-4*(motion.pour??0):-hand
 line(c,[[-6,-24],[-9,-19],[-10,-15+hand]],shirt,4);line(c,[[6,-24],[9,-20],[11,-15+rightHand]],shirt,4);ellipse(c,-10,-15+hand,2.3,2.5,skin);ellipse(c,11,-15+rightHand,2.3,2.5,skin)
 const spout=motion.carryCan?wateringCan(c,11,-15+rightHand,motion.pour??0):null
 if(motion.carryCan)ellipse(c,11,-15+rightHand,2.3,2.5,skin)
 ellipse(c,0,-32,6.5,8,skin);ellipse(c,-5.7,-31,1.5,2,skin);ellipse(c,6.2,-31,1.3,1.1,skin);ellipse(c,-1,-37,6.3,4.5,'#635c4c');ellipse(c,-5,-33,2.3,5,'#635c4c');if(phase(t+variant*.7,5.3)<.035)line(c,[[2,-32],[4,-32]],INK,.65);else ellipse(c,3,-32,.7,.9,INK)
 if(variant%3===2){line(c,[[0,-33],[6,-33]],'#786b53',.7);ellipse(c,2.7,-32.2,2.3,1.9,'#f4e6c31f')}
 if(variant%3===0){ellipse(c,-1,-38,10,2.3,'#c6ac75');ellipse(c,-1,-41,6,4,'#cdb47e');line(c,[[-6,-39],[4,-39]],'#8c9470',1.5)}
 if(variant%3===1){ellipse(c,-6,-30,2.5,5,'#635c4c');ellipse(c,5,-30,2,4,'#635c4c')}
 if(variant%3===2)ellipse(c,-6,-37,4,4,'#635c4c')
 line(c,[[1,-28],[3,-28]],'#b98e70',.55)
 c.restore()
 return {
  spout:spout?{x:x+facing*spout.x,y:y-bob+spout.y}:null,
  leftHand:{x:x-facing*10,y:y-bob-15+hand},
  rightHand:{x:x+facing*11,y:y-bob-15+rightHand},
 }
}
function gear(c:Context,x:number,y:number,r:number,t:number){c.save();c.translate(x,y);c.rotate(t);ellipse(c,0,0,r,r,GOLD);ellipse(c,0,0,r-4,r-4,INK);for(let i=0;i<10;i++){c.rotate(Math.PI/5);rect(c,-2,-r-2,4,r*2+4,GOLD)}ellipse(c,0,0,4,4,CREAM);c.restore()}
function paper(c:Context,x:number,y:number,color:string){polygon(c,[[x,y],[x+15,y+7],[x+2,y+14],[x-13,y+7]],CREAM);line(c,[[x-4,y+5],[x+5,y+9]],color,3)}
function steam(c:Context,x:number,y:number,t:number){
 for(let i=0;i<3;i++){const age=(t*.28+i/3)%1;c.save();c.globalAlpha=(1-age)*.45;c.strokeStyle=CREAM;c.lineWidth=1.5+age*2;c.beginPath();c.moveTo(x+Math.sin(t+i)*2,y-age*29);c.bezierCurveTo(x-6,y-age*29-5,x+7,y-age*29-9,x+2,y-age*29-14);c.stroke();c.restore()}
}

// Furniture and painted surfaces are rendered once per motif, not every animation frame.
function workshopSet(c:Context,type:number){
 switch(type){
 case 0:{box(c,-52,-18,70,21,12,'#68764a','#314f45');
  box(c,68,4,14,20,25,'#b56d45','#d5915b');ellipse(c,38,30,14,6,'#76989724');paper(c,-83,14,GREEN);break}
 case 1:{box(c,-25,-16,62,33,23,RED,'#e5c995');rect(c,-29,-48,61,6,INK);
  for(let i=0;i<4;i++)box(c,59,15-i*3,17,18,4,RED,i%2?CREAM:'#ddb653');
  box(c,-73,-3,18,16,17,BLUE,BLUE);rect(c,-79,-25,7,8,GOLD);rect(c,-68,-21,7,8,RED);
  for(let i=0;i<5;i++){line(c,[[-18+i*9,-13+i*4],[-9+i*9,-9+i*4]],'#9d9b7d',2);rect(c,-22+i*9,-40,3,8,'#adc1b2')}
  rect(c,-10,-49,7,3,RED);break}
 case 2:{polygon(c,[[0,-24],[70,11],[0,47],[-70,11]],'#b88e76');for(let i=0;i<5;i++)line(c,[[-44+i*15,-2-i*2],[-15+i*15,29-i*2]],'#d9a36d',2);
  box(c,-21,-23,48,22,17,BLUE,'#d4b992');
  for(let i=0;i<8;i++){rect(c,-27+i*6,-27+i*.8,4,8,CREAM);if(i%3!==2)rect(c,-25+i*6,-28+i*.8,2.5,5,INK)}
  for(const x of [-74,70])box(c,x,-5,15,17,34,INK,BLUE);
  paper(c,-3,-16,INK);for(let i=0;i<3;i++){ellipse(c,25+i*17,-55+i*8,6,6,INK);ellipse(c,25+i*17,-55+i*8,2,2,i%2?RED:GOLD)}break}
 case 3:{box(c,-45,-9,72,20,17,BLUE,INK);
  for(let i=0;i<4;i++){const x=-80+i*12,y=-20-i*6;line(c,[[x,y],[x,y-14]],GOLD,1.7);ellipse(c,x,y-16,2,3,BLUE);line(c,[[x-2,y-2],[x+2,y-2]],CREAM,1)}break}
 case 4:{ellipse(c,15,3,72,35,'#80948c');
  box(c,63,31,18,16,14,RED,INK);rect(c,61,14,13,8,'#79a5a0');paper(c,57,5,BLUE);
  for(let i=0;i<3;i++)line(c,[[-3+i*6,30+i*3],[-3+i*6,36+i*3]],'#d5c58a',1);break}
 case 5:{box(c,-20,5,45,24,17,RED,'#c49e68');
  for(let i=0;i<3;i++){const x=-55+i*47,y=-44+i*9;ellipse(c,x,y,16,16,INK);ellipse(c,x,y,13,13,CREAM);for(let n=0;n<12;n++)ellipse(c,x+Math.sin(n*Math.PI/6)*10.5,y-Math.cos(n*Math.PI/6)*10.5,n%3===0?1:.45,n%3===0?1:.45,INK)}
  paper(c,-22,-9,BLUE);for(let i=0;i<3;i++){ellipse(c,-27+i*6,-4+i*2,2,2,GOLD);ellipse(c,-27+i*6,-4+i*2,.8,.8,INK)}break}
 case 6:{polygon(c,[[0,-20],[67,14],[0,49],[-67,14]],'#d2b79a');for(let i=0;i<6;i++)line(c,[[-40+i*15,-4-i*1.5],[-13+i*13,30-i*2]],RED,3);
  box(c,-8,0,38,32,18,RED,'#c98759');for(let i=0;i<3;i++){paper(c,-11+i*9,-8+i*3,BLUE);ellipse(c,-1+i*13,-7+i*4,4,3,CREAM);ellipse(c,i*13,-8+i*4,2,1.5,'#947d58');c.strokeStyle=CREAM;c.lineWidth=1;c.beginPath();c.arc(3+i*13,-7+i*4,2,0,Math.PI*2);c.stroke()};
  ellipse(c,42,-4,11,7,INK);ellipse(c,43,-13,9,11,BLUE);ellipse(c,43,-24,6,2.5,CREAM);ellipse(c,43,-27,2,2,GOLD);line(c,[[48,-17],[56,-21],[56,-25]],BLUE,3);c.strokeStyle=GOLD;c.lineWidth=2;c.beginPath();c.arc(39,-24,8,Math.PI,Math.PI*2);c.stroke();break}
 case 7:{ellipse(c,8,13,66,32,'#97aaa0');for(let i=0;i<3;i++){c.strokeStyle='#c6c9a461';c.lineWidth=.7;c.beginPath();c.ellipse(8,13,20+i*18,9+i*8,0,0,Math.PI*2);c.stroke()};
  box(c,22,15,23,23,18,GREEN,CREAM);break}
 }
}

// Each room has a different set and a staged action. Animation time is explicit,
// allowing visual frame comparisons rather than merely counting canvas redraws.
function scene(c:Context,type:number,t:number,variant:number){
 const beat=(1-Math.cos(t*6))*.5
 switch(type){
 case 0:{
  for(let i=0;i<5;i++)plant(c,-64+i*21,-1+(i%2)*8,t+i,25)
  plant(c,66,-4,t,44)
  ellipse(c,21,-63,15,15,INK);c.save();c.translate(21,-63);c.rotate(t*2);for(let i=0;i<4;i++){ellipse(c,0,8,4,9,CREAM);c.rotate(Math.PI/2)}c.restore()
  const route=patrol(t,12),x=GARDEN.startX+route.position*GARDEN.span
  const pour=watering(t),distance=(route.facing>0?route.position:2-route.position)*GARDEN.span,flow=ease((pour-.25)/.5)
  const {spout}=person(c,x,GARDEN.pathY,GREEN,t,route.walking?'walk':'idle',variant*3,{facing:route.facing,distance,carryCan:true,pour,walkBlend:route.blend})
  // Keep the receiving pot on the floor, and the stream legible above its leaves.
  plant(c,GARDEN.pot.x,GARDEN.pot.y,t,18)
  if(spout&&flow>.001){
   c.save();c.globalAlpha=flow*.7;c.strokeStyle='#6f9da5';c.lineWidth=1;c.beginPath();c.moveTo(spout.x,spout.y);c.quadraticCurveTo(spout.x+1,spout.y+4,GARDEN.pot.x+1,GARDEN.pot.y-10);c.stroke();c.restore()
   for(let i=0;i<6;i++){const age=phase(t*2+i/6,1);c.save();c.globalAlpha=flow*(1-age*.7);ellipse(c,spout.x+(i%3-1)*1.2,spout.y+age*8,.55,1.05,'#a4cad0');c.restore()}
  }
  break
 }
 case 1:{
  rect(c,-26,-43+ease((1-Math.cos(t*2.2))*.5)*9,55,8,BLUE)
  ellipse(c,-43,-29,9,9,INK);ellipse(c,-43,-29,7,7,BLUE);for(let i=0;i<3;i++){const a=t*2.2+i*Math.PI*2/3;line(c,[[-43,-29],[-43+Math.cos(a)*6,-29+Math.sin(a)*6]],CREAM,1.3)}ellipse(c,-43,-29,2,2,GOLD)
  for(let i=0;i<3;i++){const x=-35+((t*28+i*24)%84);paper(c,x,3+(x+35)*.24,i%2?RED:BLUE)}

  person(c,-57,30,BLUE,t,'work',1);line(c,[[-46,8],[-37,-9+beat*11]],GOLD,3);person(c,35,42,RED,t,'work',2)
  break
 }
 case 2:{

  for(let i=0;i<8;i++){rect(c,-28+i*6,-36,3,3,(Math.floor(t*6)+i)%4===0?GOLD:INK)}
  for(const x of [-74,70]){ellipse(c,x-1,0,7+beat,7+beat,BLUE);ellipse(c,x-1,-17,4,4,CREAM)}
  ellipse(c,48,13,17,10,INK);ellipse(c,48,13,5,3,RED);line(c,[[48,13],[48+Math.cos(t*4)*14,13+Math.sin(t*4)*8]],CREAM,2)
  person(c,-12,16,GOLD,t,'work',1);const drummer=person(c,-40,24,RED,t,'drum',2);ellipse(c,-34,16,14,8,RED);ellipse(c,-34,14,14,7,CREAM)
  line(c,[[drummer.leftHand.x,drummer.leftHand.y],[drummer.leftHand.x+15,drummer.leftHand.y-4]],GOLD,1.5)
  line(c,[[drummer.rightHand.x,drummer.rightHand.y],[drummer.rightHand.x-11,drummer.rightHand.y-4]],GOLD,1.5)
  person(c,42+Math.sin(t*3)*9,40-Math.abs(Math.sin(t*6))*6,GREEN,t,'wave',0);break
 }
 case 3:{
  for(let i=0;i<12;i++){const x=-56+((t*32+i*8)%96);line(c,[[x,-2+(x+56)*.2],[x+7,2+(x+56)*.2]],'#8b9b98',2)}
  for(let i=0;i<2;i++){const x=-52+((t*15+i*24)%48);box(c,x,1+(x+52)*.22,11,10,12,GOLD,'#e3c878');rect(c,x+2,-8+(x+52)*.22,5,3,RED)}
  const arm=parcelArm(t),handX=arm.x,handY=arm.y
  box(c,43,15,17,18,14,RED,RED);line(c,[[43,2],[65,-43],[handX,handY]],INK,10);line(c,[[43,2],[65,-43],[handX,handY]],GOLD,6);ellipse(c,65,-43,6,6,RED);ellipse(c,handX,handY,3,3,RED)
  const grip=arm.carrying?5:8;line(c,[[handX-4,handY+2],[handX-grip,handY+10],[handX-4,handY+13]],INK,2);line(c,[[handX+4,handY+2],[handX+grip,handY+10],[handX+4,handY+13]],INK,2)
  if(arm.carrying)box(c,handX,handY+18,10,9,10,RED,GOLD)
  if(arm.pickup)box(c,8,17,10,9,10,RED,GOLD)
  if(arm.delivered)box(c,61,23,10,9,10,RED,GOLD)
  const route=patrol(t+2,14),robotX=-59+route.position*118
  c.save();c.translate(robotX,39);c.scale(route.facing,1);box(c,0,0,16,13,13,BLUE,CREAM);rect(c,-4,-16,12,6,INK);rect(c,-2,-14,3,2,GOLD);rect(c,4,-14,3,2,GOLD);ellipse(c,-5,3,4,4,INK);ellipse(c,8,7,4,4,INK);line(c,[[4,-17],[4,-23]],BLUE,1);ellipse(c,4,-24,2,2,RED);c.restore()
  break
 }
 case 4:{
  for(let i=0;i<14;i++){const a=i*2.4,r=22+(i%4)*11;rect(c,15+Math.cos(a)*r,3+Math.sin(a)*r*.46,2+(i%3===Math.floor(beat*3)?1:0),2,CREAM)}
  line(c,[[-21,-6],[-50,29]],GOLD,4);line(c,[[-21,-6],[12,28]],GOLD,4)
  c.save();c.translate(-21,-34);c.rotate(-.7+Math.sin(t/2)*.35);rect(c,-34,-9,68,18,BLUE);rect(c,22,-12,14,24,CREAM);rect(c,-31,-6,15,12,INK);c.restore()
  const a=t*.8;ellipse(c,52+Math.cos(a)*28,8+Math.sin(a)*13,9,9,GOLD);line(c,[[35,-30],[57,-30],[72,-17]],CREAM,1)
  person(c,-65+Math.sin(t/2)*12,18,BLUE,t,'idle',1);break
 }
 case 5:{
  for(let i=0;i<3;i++){const x=-55+i*47,y=-44+i*9;line(c,[[x,y],[x+Math.sin(t*(i+1))*10,y-Math.cos(t*(i+1))*10]],RED,2);line(c,[[x,y],[x+Math.cos(t*.3)*7,y+Math.sin(t*.3)*7]],INK,2)}
  gear(c,12,-6,13,t*1.7);gear(c,-11,-12,9,-t*2.4)
  line(c,[[-63,-24],[-63+Math.sin(t*2.6)*17,7]],GOLD,2);ellipse(c,-63+Math.sin(t*2.6)*17,7,9,9,GOLD)
  person(c,-41,34,BLUE,t,'work',2);rect(c,41,10,24,3,CREAM);person(c,57,39,GREEN,t,'wave',0);break
 }
 case 6:{

  steam(c,43,-22,t)
  person(c,-49,11,GREEN,t,'work',0);person(c,34,40,BLUE,t,'work',1)
  const route=patrol(t,18),cat=-64+route.position*119
  c.save();c.translate(cat,43);c.scale(route.facing,1);ellipse(c,0,1,14,3,'#46554c18');ellipse(c,0,-3,10,5,'#796b54');ellipse(c,8,-8,5.5,5.5,'#796b54');polygon(c,[[5,-11],[5,-17],[9,-13],[12,-17],[13,-10]],'#796b54');line(c,[[7,-8],[8,-8]],CREAM,.8)
  const distance=(route.facing>0?route.position:2-route.position)*119,gait=walkingFeet(distance,10)
  for(let i=0;i<4;i++){const foot=i%2?gait.left:gait.right,step=foot.x*route.blend,lift=foot.y*route.blend;line(c,[[-6+i*4,-2],[-6+i*4+step,3+lift]],'#796b54',2)}
  c.strokeStyle='#796b54';c.lineWidth=2;c.beginPath();c.moveTo(-8,-3);c.bezierCurveTo(-18,-7,-15,-13+Math.sin(t*2)*2,-20,-11);c.stroke();c.restore()
  plant(c,74,7,t,30);break
 }
 case 7:{

  c.save();c.translate(22,-26);c.rotate(t*.9);for(let i=0;i<4;i++){c.rotate(Math.PI/2);rect(c,-4,-35,8,70,i%2?GOLD:RED)}c.restore()
  line(c,[[-75,22],[-47,-62],[-17,25]],INK,4);const sway=Math.sin(t*2)*25;line(c,[[-47,-62],[-47+sway,0]],GOLD,3);ellipse(c,-47+sway,0,11,11,RED)
  for(let i=0;i<3;i++){const x=37+i*15,y=-43+i*5;line(c,[[x,-72+i*7],[x+Math.sin(t*2+i)*10,y]],INK,1);ellipse(c,x+Math.sin(t*2+i)*10,y,5,5,i%2?GOLD:BLUE)}
  person(c,51+Math.sin(t/2)*6,39,BLUE,t,'idle',2);break
 }
 }
 // Useful clutter belongs to the workshop rather than repeating a generic crate.
 if(variant===1){
  if(type===0||type===6)plant(c,-83,16,t*.7,21)
  else if(type===1||type===5){for(let i=0;i<4;i++)box(c,-86,10-i*2,12,10,2,RED,i%2?CREAM:BLUE)}
  else{box(c,-85,12,12,10,8,BLUE,CREAM);paper(c,-85,5,RED)}
 }
 if(variant===2){
  ellipse(c,72,33,9,4,'#46554c17');box(c,72,30,13,12,8,GREEN,CREAM);rect(c,72,20,2,6,RED)
 }
}

function roomLamp(c:Context,type:number,dark:boolean){
 const x=type%2?-82:81,y=type%2?-4:-2
 // The pool of light is tied to a physical desk lamp, with no extra animation loop.
 if(dark){ellipse(c,x-6,y+6,27,13,'#f4d79621');ellipse(c,x-5,y+4,17,8,'#f4d79614')}
 ellipse(c,x,y,8,3,'#827e60');line(c,[[x,y-2],[x,y-29],[x-7,y-33]],'#9c956d',1.6)
 c.fillStyle=dark?'#f3d793':'#bdad82';c.beginPath();c.moveTo(x-10,y-36);c.quadraticCurveTo(x-3,y-40,x+2,y-30);c.lineTo(x-14,y-30);c.closePath();c.fill();ellipse(c,x-6,y-30,7,2,dark?'#f6e6b8':'#e4d0a5')
}

export function createWorldRenderer(){
 const plates=new Map<number,HTMLCanvasElement>()
 const overviews=new Map<number,{canvas:HTMLCanvasElement;stamp:string}>()
 // Static pigment, grain and scenery are cached once, never regenerated each frame.
 function backplate(type:number){
  const cached=plates.get(type);if(cached)return cached
  const plate=document.createElement('canvas');plate.width=544;plate.height=464;const c=plate.getContext('2d');if(!c)return null;c.scale(2,2);c.translate(136,146)
  ellipse(c,2,9,126,62,'#53675015')
  c.beginPath();c.moveTo(0,-64);c.bezierCurveTo(25,-53,107,-17,122,-2);c.quadraticCurveTo(130,3,119,9);c.lineTo(8,65);c.quadraticCurveTo(0,69,-9,63);c.lineTo(-119,8);c.quadraticCurveTo(-129,2,-120,-4);c.closePath();c.fillStyle=FLOOR[type];c.fill()
  c.save();c.clip();let seed=type*173+41
  const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
  for(let i=0;i<380;i++){const x=rand()*260-130,y=rand()*140-70;line(c,[[x,y],[x+rand()*11+2,y+rand()*3]],i%2?'#fff4d51c':'#66795212',.4+rand()*1.8)}
  if([1,5,6].includes(type))for(let i=0;i<10;i++)line(c,[[-130+i*22,-65],[i*22,65]],'#8578581c',.8)
  c.restore()
  // Low plaster walls, warm timber caps and small arched windows.
  polygon(c,[[-122,0],[0,-63],[0,-91],[-122,-28]],WALL[type]);polygon(c,[[0,-63],[122,0],[122,-28],[0,-91]],WALL[type]);polygon(c,[[0,-63],[122,0],[122,-28],[0,-91]],'#869c7b12')
  line(c,[[-122,-28],[0,-91],[122,-28]],'#bcac89',3);line(c,[[-122,-26],[0,-89],[122,-26]],'#f7edcd',1)
  for(const side of [-1,1]){
   c.save();c.translate(side*60,-47);c.transform(1,side*.51,0,1,0,0)
   if(type===0){
    // Greenhouse windows have narrow painted muntins and an overgrown sill.
    rect(c,-25,-27,50,27,'#baccc2');for(let n=0;n<5;n++)line(c,[[-23+n*12,-27],[-23+n*12,0]],'#f0e7c6',1.8);line(c,[[-25,-13],[25,-13]],'#f0e7c6',1.8);line(c,[[-27,1],[27,1]],'#a3aa7b',3)
   }else if(type===4){
    rect(c,-23,-25,46,25,'#829b98');for(let n=0;n<10;n++)ellipse(c,-20+n*4,-6-(n*7%16),.6,.6,CREAM);line(c,[[-16,-13],[-6,-20],[4,-10],[17,-17]],'#e0d5aa',.7)
   }else if(type===5){
    for(let n=0;n<3;n++){rect(c,-24+n*17,-18,13,16,'#b9ab87');for(let j=0;j<3;j++)rect(c,-22+n*17+j*3,-17,2,13,j%2?BLUE:CREAM)}line(c,[[-27,1],[26,1]],'#ad9b74',3)
   }else{
    c.fillStyle='#b6c7bb';c.beginPath();c.roundRect(-12,-29,24,29,[12,12,1,1]);c.fill();line(c,[[0,-28],[0,-2]],'#ece0bc',1.7);line(c,[[-11,-12],[11,-12]],'#ece0bc',1.7);line(c,[[-15,1],[15,1]],'#bdab85',3)
    if(type===6){for(let n=0;n<5;n++){rect(c,-16+n*7,-31,7,8,n%2?'#bc8c72':'#f2dfb6');ellipse(c,-12.5+n*7,-23,3.5,2,n%2?'#bc8c72':'#f2dfb6')}}
   }
   c.restore()
  }
  // Tiny dry-brush marks follow the wall planes, not a screen-space filter.
  for(let i=0;i<140;i++){const side=i%2?1:-1,x=(rand()*118)*side,y=Math.abs(x)*.51-90+rand()*23;line(c,[[x,y],[x+side*(2+rand()*5),y+rand()*2]],i%3?'#fff5d225':'#a6aa7b18',.6)}
  // Painted shrubs soften room joins; small ochre flowers keep a limited palette.
  for(let i=0;i<9;i++){const x=-114+i*12,y=-10-i*5.7;ellipse(c,x,y,10+rand()*5,5+rand()*3,i%3===0?'#9aac7b':i%2?'#7f9871':'#b0bd87');for(let j=0;j<5;j++)leaf(c,x+j*3-6,y+2,rand()*2.5-1.25,7+rand()*7,j%2?'#bdc88d88':'#708c6155');if(i%4===0)ellipse(c,x+3,y-2,1.8,1.8,'#ead9a0')}
  for(let i=0;i<5;i++){const x=29+i*19,y=-65+i*10;line(c,[[x,y],[x+2,y+11]],'#829b6b',1);leaf(c,x+2,y+7,-.9,8,'#98ad7c');leaf(c,x+2,y+10,.7,7,'#b2bf86')}
  if(type===1||type===7){for(let i=0;i<3;i++){const x=14+i*26,y=-63+i*13;c.save();c.translate(x,y);c.transform(1,.51,0,1,0,0);rect(c,-1,-13,13,16,'#f2e3bc');line(c,[[2,-9],[9,-9]],i%2?RED:BLUE,2);line(c,[[2,-5],[8,-5]],'#a99e79',1);c.restore()}}
  workshopSet(c,type)
  plates.set(type,plate);return plate
 }
 function room(c:Context,type:number,time:number,variant:number,dark:boolean){
  const plate=backplate(type);if(plate)c.drawImage(plate,-136,-146,272,232)
  scene(c,type,time,variant)
  if(dark){c.save();c.beginPath();c.moveTo(-124,-28);c.lineTo(0,-92);c.lineTo(124,-28);c.lineTo(124,0);c.lineTo(0,66);c.lineTo(-124,0);c.closePath();c.clip();c.fillStyle='#25434b40';c.fillRect(-130,-100,260,175);c.restore()}
  roomLamp(c,type,dark)
 }
 function overview(type:number,time:number,dark:boolean){
  let cached=overviews.get(type)
  if(!cached){const canvas=document.createElement('canvas');canvas.width=272;canvas.height=232;cached={canvas,stamp:''};overviews.set(type,cached)}
  const stamp=`${Math.floor(time/100)}-${dark}`
  if(cached.stamp!==stamp){
   const c=cached.canvas.getContext('2d');if(!c)return null
   c.clearRect(0,0,272,232);c.save();c.translate(136,146);room(c,type,Math.floor(time/100)*.1+type*4.37,type%3,dark);c.restore();cached.stamp=stamp
  }
  return cached.canvas
 }
 return{
  draw(c:Context,width:number,height:number,camera:Camera,time:number,selected:Cell,dark:boolean){
   rect(c,0,0,width,height,dark?'#394c45':'#c5cbb1');const cells=visibleCells(width,height,camera)
   for(const {col,row}of cells){const type=roomType(col,row),p=point(col,row);c.save();c.translate(width/2+(p.x-camera.x)*camera.zoom,height/2+(p.y-camera.y)*camera.zoom);c.scale(camera.zoom,camera.zoom)
    const variation=cellVariation(col,row),localTime=time/1000+(variation%530)/10
    c.save();if(variation%4===1||variation%4===2)c.scale(-1,1)
    if(camera.zoom<.85){const distant=overview(type,time,dark);if(distant)c.drawImage(distant,-136,-146)}
    else room(c,type,localTime,variation%3,dark)
    c.restore()
    if(selected.col===col&&selected.row===row){
     line(c,[[-8,55],[0,59],[8,55]],dark?'#f4dc98':'#fff2ce',2)
     ellipse(c,0,58,2,1,'#7c8c65')
    }
    c.restore()
   }
   return cells.length
  },dispose(){plates.clear();overviews.clear()},
 }
}
