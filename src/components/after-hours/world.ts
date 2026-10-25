import { sprite } from './sprites'
import { SPRITES, CAN_RIG, DRUM_RIG } from './sprite-frames'
import { artworkImage, characterImage, artworkState, loadArtwork, retryArtwork, subscribeArtwork, type ArtworkState } from './artwork'
import { ease, parcelArm, patrol, phase, walkingFeet, watering, characterTime, canSpout } from './motion'

// Original procedural illustrations. No artwork or source from Floor796 is used.
export const ROOMS = [
  { name: 'The greenhouse', color: '#5c7d65', note: 'A gardener carries a can through the greenhouse and waters a young plant.' },
  { name: 'Print night', color: '#9c654d', note: 'A fresh sheet feeds across the press while the printer works beside it.' },
  { name: 'Listening room', color: '#626d98', note: 'A drummer keeps a slow rhythm among the records and old speakers.' },
  { name: 'Robot repairs', color: '#b58a43', note: 'A patient arm sorts parcels as the little inspection robot makes its rounds.' },
  { name: 'The observatory', color: '#4b7891', note: 'An astronomer studies a chart while a brass orrery traces its orbit.' },
  { name: 'Clock department', color: '#98735c', note: 'The watchmaker works among parts drawers and a turning escapement.' },
  { name: 'Tea break', color: '#8d6d81', note: 'Steam rises from a cup while the cat pads around the kitchen.' },
  { name: 'The sculptor’s studio', color: '#587d7d', note: 'An artist works beside a small clay vessel on a turning wheel.' },
] as const
export const GARDEN = { startX: -48, span: 57, pathY: 31, pot: { x: 42, y: 34 } } as const
export const GRID = { x: 180, y: 115 } as const
export type Camera = { x: number; y: number; zoom: number }
export type Cell = { col: number; row: number }
export function roomType(col: number, row: number) {
  // Curated eight-colour lattice: immediate neighbours never repeat a room.
  const sequence = [0, 3, 6, 2, 7, 1, 5, 4]
  return sequence[((col * 3 + row * 2) % 8 + 8) % 8]
}
export const point = (col: number, row: number) => ({ x: (col - row) * GRID.x, y: (col + row) * GRID.y })
export function cellAt(x: number, y: number): Cell {
  return { col: Math.round((x / GRID.x + y / GRID.y) / 2), row: Math.round((y / GRID.y - x / GRID.x) / 2) }
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

/** Tall illustrated walls own clicks as well as their floor; painter order resolves overlap. */
export function pickCell(width:number,height:number,camera:Camera,px:number,py:number):Cell {
 const x=(px-width/2)/camera.zoom+camera.x,y=(py-height/2)/camera.zoom+camera.y
 const cells=visibleCells(width,height,camera)
 for(let i=cells.length-1;i>=0;i--){const cell=cells[i],p=point(cell.col,cell.row),u=Math.abs(x-p.x),v=y-p.y
  if(u<=128&&v>=-153+u*.61&&v<=67-u*.52)return cell
 }
 return cellAt(x,y)
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
function line(c:Context,points:number[][],color:string|CanvasGradient,width=2){c.strokeStyle=color;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}
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
 if(characterImage()){const f=SPRITES.plant,h=30,w=h*f[2]/f[3];ellipse(c,x,y+2,9,3,'#302a2326');sprite(c,'plant',x-w/2,y-h,w,h);return}
 ellipse(c,x,y+2,11,4,'#46554c1c');c.fillStyle='#bc896c';c.beginPath();c.moveTo(x-7,y-10);c.lineTo(x-5,y+1);c.quadraticCurveTo(x,y+4,x+5,y+1);c.lineTo(x+7,y-10);c.fill();ellipse(c,x,y-10,7,3,'#d5ad86');ellipse(c,x,y-11,5,2,'#716e51')
 const lean=Math.sin(t*1.3)*2;line(c,[[x,y-10],[x+lean,y-height]],'#738b5d',1.2)
 for(let n=0;n<4;n++){leaf(c,x+lean*n/4,y-12-n*height/5,-.8-n*.08,10+n*1.3,n%2?'#7e9b64':'#9ab37b');leaf(c,x+lean*n/4,y-14-n*height/5,.8,10+n,'#b8c78a')}
}
type Pose='walk'|'work'|'wave'|'drum'|'idle'
type PersonMotion = { facing?: number; distance?: number; carryCan?: boolean; pour?: number; walkBlend?: number }
function wateringCan(c:Context,x:number,y:number,pour:number){
 const angle=pour*.26;c.save();c.translate(x,y);c.rotate(angle)
 if(characterImage()){
  const f=SPRITES.can,scale=CAN_RIG.width/f[2]
  sprite(c,'can',-(CAN_RIG.grip[0]-f[0])*scale,-(CAN_RIG.grip[1]-f[1])*scale,f[2]*scale,f[3]*scale);c.restore()
  const tip=canSpout(pour);return{x:x+tip.x,y:y+tip.y}
 }
 c.strokeStyle=BLUE;c.lineWidth=2;c.beginPath();c.ellipse(-1,-4,4,5,0,0,Math.PI*2);c.stroke()
 ellipse(c,7,-1,8,7,BLUE);ellipse(c,7,-7,6,2,'#a9bdb3');ellipse(c,7,-7,4,1,'#6c8c87')
 line(c,[[12,-4],[19,-7],[24,-1]],BLUE,2.5);ellipse(c,24,-1,1.5,1,'#abc3b6');c.restore()
 return { x:x+24*Math.cos(angle)+Math.sin(angle), y:y+24*Math.sin(angle)-Math.cos(angle) }
}
function trouserLeg(c:Context,points:number[][],front:boolean){
 const x=points[1][0],shade=c.createLinearGradient(x-3,0,x+3,0)
 shade.addColorStop(0,front?'#414d49':'#37433f');shade.addColorStop(.42,front?'#78817a':'#626f69');shade.addColorStop(1,front?'#58645e':'#46564f')
 line(c,points,'#303c3640',6);line(c,points,shade,5)
 line(c,[[x-2,points[1][1]+1],[x+1,points[1][1]+2]],'#31413750',.6)
}
function shoe(c:Context,x:number,y:number){
 c.save();c.translate(x,y);const shade=c.createLinearGradient(0,-3,0,3);shade.addColorStop(0,'#6a5744');shade.addColorStop(1,'#392f27');c.fillStyle=shade
 c.beginPath();c.moveTo(-3,-3);c.quadraticCurveTo(1,-4,2,-1);c.quadraticCurveTo(6,-1,7,1);c.quadraticCurveTo(7,3,1,3);c.lineTo(-3,2);c.closePath();c.fill();line(c,[[-2,2],[5,2.5]],'#b09a7055',.6);c.restore()
}
function person(c:Context,x:number,y:number,shirt:string,t:number,pose:Pose='idle',variant=0,motion:PersonMotion={}){
 t=characterTime(t)
 const facing=motion.facing??1,distance=motion.distance??0,blend=pose==='walk'?(motion.walkBlend??1):0
 const gait=walkingFeet(distance),left={x:gait.left.x*blend,y:gait.left.y*blend},right={x:gait.right.x*blend,y:gait.right.y*blend}
 const stride=Math.sin(distance*Math.PI/12)*2.5*blend,bob=Math.sin(distance*Math.PI/12)**2*.7*blend+Math.sin(t*1.8)*.3*(1-blend)
 const painted=!!characterImage(),skin=variant%3===1?'#a16c4a':variant%3===2?'#c99b76':'#c18b61',hair=variant%2?'#403e35':'#4d4438'
 const cloth=painted?(shirt===GREEN?'#6c7353':shirt===RED?'#a36348':shirt===BLUE?'#60757b':'#b79550'):shirt
 const hand=pose==='work'?Math.sin(t*3.1)*4:pose==='drum'?Math.sin(t*7)*9:pose==='wave'?-13+Math.sin(t*3)*3:stride
 const bodyLift=6,wristY=pose==='drum'?-21:motion.carryCan?-27:-23,rightHand=motion.carryCan?-4*(motion.pour??0):-hand
 c.save();c.translate(x,y);c.scale(facing,1)
 polygon(c,[[-6,0],[5,-1],[20,6],[11,8]],'#2834291a');ellipse(c,1,1,8,2.4,'#2834292b')
 trouserLeg(c,[[-4,-28-bob],[-5+left.x*.45,-15+left.y*.3],[-5+left.x,-2+left.y]],false)
 trouserLeg(c,[[4,-28-bob],[5+right.x*.45,-15+right.y*.3],[5+right.x,-2+right.y]],true)
 shoe(c,-5+left.x,-2+left.y);shoe(c,5+right.x,-2+right.y);c.translate(0,-bob-bodyLift)
 rect(c,-2,-45,4,6,skin)
 c.fillStyle=cloth;c.beginPath();c.moveTo(-4,-42);c.quadraticCurveTo(-9,-41,-10,-36);c.lineTo(-7,-21);c.quadraticCurveTo(0,-19,8,-21);c.lineTo(9,-36);c.quadraticCurveTo(8,-41,4,-42);c.closePath();c.fill()
 polygon(c,[[-8,-36],[-4,-34],[-3,-21],[-7,-21]],'#263d3720')
 if(!painted&&variant%3===0){polygon(c,[[-3,-39],[3,-39],[6,-22],[-6,-22]],'#d9c797');rect(c,-2,-29,6,4,'#b7a580');line(c,[[-3,-41],[-2,-36]],CREAM,1)}
 else if(!painted&&variant%3===1){line(c,[[-5,-41],[-3,-25]],'#c3b68e',1.3);line(c,[[5,-41],[3,-25]],'#c3b68e',1.3);rect(c,-4,-31,8,6,'#a9aa91')}
 else if(!painted){line(c,[[0,-40],[0,-22]],'#e1d2a7',.8);for(let i=0;i<4;i++)ellipse(c,1,-36+i*4,.5,.5,CREAM)}
 if(painted){
  const key=shirt===GREEN?'torso0':shirt===RED?'torso1':shirt===BLUE?'torso2':'torso3';sprite(c,key,-12,-44,24,25)
  // The painted sleeve ends are the elbow anchors. Forearms must draw above the torso.
  for(const [cx,wx,wy] of [[-10,-12,wristY+hand],[10,11,wristY+rightHand]]){
   line(c,[[cx,-25],[wx,wy]],'#704c383d',3.8);line(c,[[cx,-25],[wx,wy]],skin,3);line(c,[[cx-.6,-25],[wx-.6,wy]],'#edd1ab55',.6)
  }
 }else{
  line(c,[[-8,-39],[-12,-32],[-12,wristY+hand]],cloth,4);line(c,[[8,-39],[12,-33],[11,wristY+rightHand]],cloth,4)
  line(c,[[-12,wristY+hand-3],[-12,wristY+hand]],'#d8c89e',3);line(c,[[11,wristY+rightHand-3],[11,wristY+rightHand]],'#d8c89e',3)
 }
 ellipse(c,-12,wristY+hand,2,2.5,skin);ellipse(c,11,wristY+rightHand,2,2.5,skin)
 const spout=motion.carryCan?wateringCan(c,11,wristY+rightHand,motion.pour??0):null
 if(motion.carryCan)ellipse(c,11,wristY+rightHand,2,2.5,skin)
 if(painted){
  const key=(shirt===RED&&pose==='work'?'head3':variant%3===0?'head0':variant%3===1?'head1':'head2'),f=SPRITES[key],h=23,w=h*f[2]/f[3]
  c.save();c.translate(0,-42);if(pose==='work')c.rotate(.07);else if(motion.pour)c.rotate(motion.pour*.05);sprite(c,key,-w/2,-h,w,h);c.restore()
 }else{
 ellipse(c,0,-49.5,5.5,7.5,skin);ellipse(c,-3,-49,2.5,6,'#604a3322');ellipse(c,-5,-49,1.5,2,skin);ellipse(c,5.2,-48.5,1.25,1.1,skin)
 c.fillStyle=hair;c.beginPath();c.moveTo(-5,-47);c.bezierCurveTo(-8,-52,-6,-58,0,-58);c.bezierCurveTo(5,-59,7,-54,5,-52);c.quadraticCurveTo(1,-51,-2,-54);c.lineTo(-3,-47);c.closePath();c.fill()
 if(phase(t+variant*.7,5.3)<.035)line(c,[[2,-49],[4,-49]],INK,.6);else ellipse(c,3,-49,.65,.85,INK)
 line(c,[[2,-44],[4,-44]],'#8e6951',.6)
 if(variant%3===0){ellipse(c,-.5,-56,9,1.9,'#baa16f');ellipse(c,-.5,-59,5.5,3.6,'#c2aa79');line(c,[[-5,-57],[4,-57]],'#76836a',1.3)}
 if(variant%3===1){ellipse(c,-5,-47,2,5,hair);ellipse(c,-5,-54,3,3,hair)}
 if(variant%3===2){ellipse(c,-5,-55,3,3,hair);line(c,[[0,-50],[6,-50]],'#5e5847',.7);ellipse(c,3,-49.2,2.2,1.8,'#efe4c41c')}
 }
 c.restore()
 return{spout:spout?{x:x+facing*spout.x,y:y-bob-bodyLift+spout.y}:null,leftHand:{x:x-facing*12,y:y-bob-bodyLift+wristY+hand},rightHand:{x:x+facing*11,y:y-bob-bodyLift+wristY+rightHand}}
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
  person(c,-12,16,GOLD,t,'work',1);const drummer=person(c,-40,24,RED,t,'drum',2);ellipse(c,-34,4,14,8,RED);ellipse(c,-34,2,14,7,CREAM)
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

// Live cel animation sits over the illustrated sets. Keep foreground actions clear.
function paintedScene(c:Context,type:number,t:number,variant:number){
 switch(type){
 case 0:{
  const route=patrol(t,12),x=GARDEN.startX+route.position*GARDEN.span,pour=watering(t),flow=ease((pour-.25)/.5),distance=(route.facing>0?route.position:2-route.position)*GARDEN.span
  const {spout}=person(c,x,GARDEN.pathY,GREEN,t,route.walking?'walk':'idle',variant*3,{facing:route.facing,distance,carryCan:true,pour,walkBlend:route.blend})
  plant(c,GARDEN.pot.x,GARDEN.pot.y,t,18)
  if(spout&&flow>.001){c.save();c.globalAlpha=flow*.8;c.strokeStyle='#6f9da5';c.lineWidth=1;c.beginPath();c.moveTo(spout.x,spout.y);c.quadraticCurveTo(spout.x+1,spout.y+7,GARDEN.pot.x+1,GARDEN.pot.y-10);c.stroke();for(let i=0;i<5;i++){const age=phase(t*2+i/5,1);ellipse(c,spout.x+(i%3-1),spout.y+age*(GARDEN.pot.y-10-spout.y),.55,1.1,'#b4d4d7')}c.restore()}
  break
 }
 case 1:{
  const actor=person(c,-35,20,BLUE,t,'work',1,{facing:-1})
  const progress=phase(t,4);c.save();c.globalAlpha=Math.min(1,progress*10,(1-progress)*10);paper(c,-77+progress*39,-16+progress*8,RED);c.restore()
  line(c,[[actor.rightHand.x,actor.rightHand.y],[-50,-11]],'#aa8b5c',1);break
 }
 case 2:{
  const actor=person(c,-25,33,RED,t,'drum',2)
  if(characterImage()){const f=SPRITES.drum,scale=DRUM_RIG.height/f[3];sprite(c,'drum',-19-(DRUM_RIG.face[0]-f[0])*scale,11-(DRUM_RIG.face[1]-f[1])*scale,f[2]*scale,f[3]*scale)}else{ellipse(c,-19,13,14,8,'#9f6552');ellipse(c,-19,11,14,7,'#e6d8ae')}
  line(c,[[actor.leftHand.x,actor.leftHand.y],[actor.leftHand.x+15,actor.leftHand.y-4]],GOLD,1.5);line(c,[[actor.rightHand.x,actor.rightHand.y],[actor.rightHand.x-11,actor.rightHand.y-4]],GOLD,1.5)
  break
 }
 case 3:{
  const arm=parcelArm(t),hx=arm.x,hy=arm.y
  ellipse(c,43,24,17,7,'#34443a20');box(c,43,15,16,17,12,'#9e6f4e','#bc9b62');line(c,[[43,3],[65,-43],[hx,hy]],'#504e3e',9);line(c,[[43,3],[65,-43],[hx,hy]],'#b49356',6);line(c,[[44,3],[66,-43],[hx+1,hy]],'#d0b779',1);ellipse(c,65,-43,5,5,'#7c6850')
  line(c,[[hx-4,hy+2],[hx-7,hy+10],[hx-3,hy+13]],INK,2);line(c,[[hx+4,hy+2],[hx+7,hy+10],[hx+3,hy+13]],INK,2)
  if(arm.carrying)box(c,hx,hy+18,10,9,10,RED,GOLD)
  if(arm.pickup)box(c,8,17,10,9,10,RED,GOLD)
  if(arm.delivered)box(c,61,23,10,9,10,RED,GOLD)
  break
 }
 case 4:{
  const actor=person(c,-33,26,BLUE,t,'idle',1)
  polygon(c,[[actor.leftHand.x-1,actor.leftHand.y],[actor.rightHand.x+1,actor.rightHand.y],[actor.rightHand.x+1,actor.rightHand.y+8],[actor.leftHand.x-1,actor.leftHand.y+8]],'#dfcda4');line(c,[[-33,actor.leftHand.y],[-33,actor.leftHand.y+8]],'#b09b76',.8)
  ellipse(c,43,24,15,6,'#3f534426');line(c,[[43,22],[43,-3]],'#a88749',2);ellipse(c,43,-3,20,8,'#788d7b');c.strokeStyle=GOLD;c.lineWidth=1;c.beginPath();c.ellipse(43,-3,20,8,0,0,Math.PI*2);c.stroke();ellipse(c,43+Math.cos(t*.8)*20,-3+Math.sin(t*.8)*8,3.5,3.5,GOLD);break
 }
 case 5:{
  person(c,-24,24,BLUE,t,'work',2);gear(c,12,-5,7,t*1.3);gear(c,24,-2,5,-t*1.8);break
 }
 case 6:{
  const actor=person(c,-38,33,GREEN,t,'idle',0),hand=actor.rightHand
  ellipse(c,hand.x,hand.y+1,4,2,'#3048391a');rect(c,hand.x-3,hand.y-5,6,7,'#c1b89b');ellipse(c,hand.x,hand.y-5,3,1.5,'#927b58');steam(c,hand.x,hand.y-7,t)
  const route=patrol(t,18),x=-23+route.position*46,distance=(route.facing>0?route.position:2-route.position)*46,gait=walkingFeet(distance,10)
  c.save();c.translate(x,42);c.scale(route.facing,1);ellipse(c,1,2,12,3,'#3c4d3820');if(characterImage()){const f=SPRITES.cat,w=25,h=w*f[3]/f[2];sprite(c,'cat',-13,-h+1,w,h)}else{ellipse(c,0,-3,10,5,'#74604a');ellipse(c,8,-8,5,5,'#74604a');polygon(c,[[5,-11],[5,-16],[9,-13],[12,-16],[13,-10]],'#74604a')};for(let i=0;i<4;i++){const foot=i%2?gait.left:gait.right;line(c,[[-6+i*4,-2],[-6+i*4+foot.x*route.blend,3+foot.y*route.blend]],'#74604a',2)}if(!characterImage())line(c,[[-8,-3],[-15,-8],[-18,-7+Math.sin(t*2)*2]],'#74604a',2);c.restore();break
 }
 case 7:{
  const artist=person(c,-27,31,RED,t,'work',2)
  ellipse(c,-4,22,17,7,'#4f50362b');ellipse(c,-4,18,14,6,'#8c7956');ellipse(c,-4,15,14,5,'#b49b73')
  const clay=c.createLinearGradient(-14,0,8,0);clay.addColorStop(0,'#7d4f38');clay.addColorStop(.4,'#cb9c72');clay.addColorStop(.65,'#dbad80');clay.addColorStop(1,'#976348');c.fillStyle=clay;c.beginPath();c.moveTo(-10,12);c.bezierCurveTo(-16,-1,-10,-8,-6,-10);c.lineTo(-6,-15);c.quadraticCurveTo(-4,-17,-2,-15);c.lineTo(-2,-10);c.bezierCurveTo(4,-8,8,-1,2,12);c.closePath();c.fill();ellipse(c,-4,-15,2.8,1,'#735845');line(c,[[-4+Math.sin(t*1.5)*5,-6],[-5+Math.sin(t*1.5)*5,7]],'#dbaf8155',1);line(c,[[artist.rightHand.x,artist.rightHand.y],[-10,3]],'#796244',1);break
 }
 }
}
function walkway(c:Context){
 for(const direction of [-1,1]){
  const a={x:direction*64,y:32},b={x:direction*116,y:83},nx=7,ny=-direction*7
  polygon(c,[[a.x+nx,a.y+ny+3],[b.x+nx,b.y+ny+3],[b.x-nx,b.y-ny+3],[a.x-nx,a.y-ny+3]],'#5e675528')
  polygon(c,[[a.x+nx,a.y+ny],[b.x+nx,b.y+ny],[b.x-nx,b.y-ny],[a.x-nx,a.y-ny]],'#a3997f')
  for(let i=1;i<6;i++){const f=i/6,x=a.x+(b.x-a.x)*f,y=a.y+(b.y-a.y)*f;line(c,[[x-nx,y-ny],[x+nx,y+ny]],'#6c715a70',.7)}
 }
}

function roomLamp(c:Context,type:number,dark:boolean){
 const x=type%2?-82:81,y=type%2?-4:-2
 // The pool of light is tied to a physical desk lamp, with no extra animation loop.
 if(dark){ellipse(c,x-6,y+6,27,13,'#f4d79621');ellipse(c,x-5,y+4,17,8,'#f4d79614')}
 ellipse(c,x,y,8,3,'#827e60');line(c,[[x,y-2],[x,y-29],[x-7,y-33]],'#9c956d',1.6)
 c.fillStyle=dark?'#f3d793':'#bdad82';c.beginPath();c.moveTo(x-10,y-36);c.quadraticCurveTo(x-3,y-40,x+2,y-30);c.lineTo(x-14,y-30);c.closePath();c.fill();ellipse(c,x-6,y-30,7,2,dark?'#f6e6b8':'#e4d0a5')
}

export function createWorldRenderer(wake:()=>void=()=>{},onArtwork?:(state:ArtworkState)=>void){
 const plates=new Map<number,HTMLCanvasElement>()
 const overviews=new Map<number,{canvas:HTMLCanvasElement;stamp:string}>()
 const unsubscribe=subscribeArtwork(state=>{plates.clear();overviews.clear();onArtwork?.(state);wake()})
 const ready=loadArtwork()
 // Static pigment, grain and scenery are cached once, never regenerated each frame.
 function backplate(type:number){
  const cached=plates.get(type);if(cached)return cached
  const plate=document.createElement('canvas');plate.width=544;plate.height=560;const c=plate.getContext('2d');if(!c)return null;c.scale(2,2);c.translate(136,200)
  const atlas=artworkImage()
  if(atlas){
   const w=atlas.naturalWidth/4,h=atlas.naturalHeight/2
   c.drawImage(atlas,(type%4)*w,Math.floor(type/4)*h,w,h,-128,-153,256,220)
   plates.set(type,plate);return plate
  }
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
  const plate=backplate(type);if(plate)c.drawImage(plate,-136,-200,272,280)
  if(artworkImage())paintedScene(c,type,time,variant);else scene(c,type,time,variant)
  if(dark){c.save();c.beginPath();c.moveTo(-128,-65);c.lineTo(0,-154);c.lineTo(128,-65);c.lineTo(128,0);c.lineTo(0,68);c.lineTo(-128,0);c.closePath();c.clip();c.fillStyle='#25434b40';c.fillRect(-130,-158,260,235);c.restore()}
  if(!artworkImage())roomLamp(c,type,dark)
 }
 function overview(type:number,time:number,dark:boolean){
  let cached=overviews.get(type)
  if(!cached){const canvas=document.createElement('canvas');canvas.width=272;canvas.height=280;cached={canvas,stamp:''};overviews.set(type,cached)}
  const stamp=`${Math.floor(time/100)}-${dark}`
  if(cached.stamp!==stamp){
   const c=cached.canvas.getContext('2d');if(!c)return null
   c.clearRect(0,0,272,280);c.save();c.translate(136,200);room(c,type,Math.floor(time/100)*.1+type*4.37,type%3,dark);c.restore();cached.stamp=stamp
  }
  return cached.canvas
 }
 return{ready,retryArtwork,get artworkState(){return artworkState()},
  draw(c:Context,width:number,height:number,camera:Camera,time:number,selected:Cell,dark:boolean){
   rect(c,0,0,width,height,dark?'#29383a':'#c7c2ae');const cells=visibleCells(width,height,camera)
   for(const {col,row}of cells){const p=point(col,row);c.save();c.translate(width/2+(p.x-camera.x)*camera.zoom,height/2+(p.y-camera.y)*camera.zoom);c.scale(camera.zoom,camera.zoom);walkway(c);c.restore()}
   for(const {col,row}of cells){const type=roomType(col,row),p=point(col,row);c.save();c.translate(width/2+(p.x-camera.x)*camera.zoom,height/2+(p.y-camera.y)*camera.zoom);c.scale(camera.zoom,camera.zoom)
    const variation=cellVariation(col,row),localTime=time/1000+(variation%530)/10
    c.save();if(variation%4===1||variation%4===2)c.scale(-1,1)
    if(camera.zoom<.85){const distant=overview(type,time,dark);if(distant)c.drawImage(distant,-136,-200)}
    else room(c,type,localTime,variation%3,dark)
    c.restore()
    if(selected.col===col&&selected.row===row){
     line(c,[[-8,55],[0,59],[8,55]],dark?'#f4dc98':'#fff2ce',2)
     ellipse(c,0,58,2,1,'#7c8c65')
    }
    c.restore()
   }
   return cells.length
  },dispose(){unsubscribe();plates.clear();overviews.clear()},
 }
}
