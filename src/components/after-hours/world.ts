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

type Context = CanvasRenderingContext2D
const INK = '#27343c', CREAM = '#eee1bd', GOLD = '#d5a548', RED = '#be594c', BLUE = '#517a9b', GREEN = '#518a74'
const FLOOR = ['#89aa97', '#bda17a', '#55647c', '#a8a596', '#586b83', '#a28362', '#bd8a79', '#91a6a7']
const WALL = ['#b4c9ad', '#c7a27d', '#b5a8a5', '#c4ba8d', '#94acb6', '#bba785', '#d4b9a1', '#bcc2af']
function polygon(c: Context, points: number[][], color: string) { c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill() }
function rect(c: Context,x:number,y:number,w:number,h:number,color:string){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)}
function line(c:Context,points:number[][],color:string,width=2){c.strokeStyle=color;c.lineWidth=width;c.lineJoin='miter';c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}
function ellipse(c:Context,x:number,y:number,rx:number,ry:number,color:string){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
function box(c:Context,x:number,y:number,w:number,d:number,h:number,color:string,top=CREAM){
 polygon(c,[[x+w,y+w/2],[x+w-d,y+(w+d)/2],[x+w-d,y+(w+d)/2-h],[x+w,y+w/2-h]],color)
 polygon(c,[[x+w-d,y+(w+d)/2],[x-d,y+d/2],[x-d,y+d/2-h],[x+w-d,y+(w+d)/2-h]],INK)
 polygon(c,[[x,y-h],[x+w,y+w/2-h],[x+w-d,y+(w+d)/2-h],[x-d,y+d/2-h]],top)
}
function label(c:Context,text:string,x:number,y:number,color=INK,size=7){c.font=`bold ${size}px monospace`;c.textAlign='center';c.fillStyle=color;c.fillText(text,x,y)}
function plant(c:Context,x:number,y:number,t:number,height=28){
 box(c,x,y,9,9,8,'#9c5946','#c9825e');const lean=Math.sin(t*2)*3
 line(c,[[x,y-9],[x+lean,y-height]],'#355e4e',2)
 for(let n=0;n<3;n++){ellipse(c,x-5+lean,y-14-n*6,7,3,n%2?'#4b7754':'#6b994f');ellipse(c,x+5+lean,y-18-n*6,7,3,'#a0bd66')}
}
type Pose='walk'|'work'|'wave'|'drum'|'idle'
function person(c:Context,x:number,y:number,shirt:string,t:number,pose:Pose='idle',variant=0){
 c.save();c.translate(Math.round(x),Math.round(y));const stride=pose==='walk'?Math.sin(t*9)*4:0,bob=pose==='walk'?Math.abs(Math.sin(t*9))*2:0
 ellipse(c,0,1,8,3,'#26333d35');c.translate(0,-bob)
 line(c,[[-3,-12],[-4-stride,-2]],INK,4);line(c,[[3,-12],[4+stride,-2]],INK,4);rect(c,-7-stride,-3,6,3,INK);rect(c,2+stride,-3,6,3,INK)
 rect(c,-6,-25,12,15,shirt);rect(c,-5,-13,10,3,'#26333d60');rect(c,0,-25,2,13,CREAM)
 const skin=variant%2?'#b87d5d':'#e0b185',hand=pose==='work'?Math.sin(t*5)*7:pose==='drum'?Math.sin(t*9)*12:pose==='wave'?-12+Math.sin(t*7)*4:stride
 line(c,[[-7,-23],[-10,-15+hand]],shirt,4);line(c,[[7,-23],[11,-15-hand]],shirt,4);rect(c,-12,-17+hand,4,4,skin);rect(c,9,-17-hand,4,4,skin)
 rect(c,-5,-36,10,11,skin);rect(c,-6,-38,12,4,INK);rect(c,-6,-35,3,7,INK);rect(c,2,-32,2,2,INK)
 if(variant%3===0){rect(c,-7,-40,14,3,shirt);rect(c,-4,-43,9,4,shirt)}
 if(variant%3===1){rect(c,-7,-33,3,8,INK);rect(c,4,-33,3,8,INK);line(c,[[-6,-35],[0,-39],[5,-35]],INK,2)}
 c.restore()
}
function gear(c:Context,x:number,y:number,r:number,t:number){c.save();c.translate(x,y);c.rotate(t);ellipse(c,0,0,r,r,GOLD);ellipse(c,0,0,r-4,r-4,INK);for(let i=0;i<10;i++){c.rotate(Math.PI/5);rect(c,-2,-r-2,4,r*2+4,GOLD)}ellipse(c,0,0,4,4,CREAM);c.restore()}
function paper(c:Context,x:number,y:number,color:string){polygon(c,[[x,y],[x+15,y+7],[x+2,y+14],[x-13,y+7]],CREAM);line(c,[[x-4,y+5],[x+5,y+9]],color,3)}
function steam(c:Context,x:number,y:number,t:number){for(let i=0;i<4;i++){const a=(t*13+i*8)%32;rect(c,x+Math.sin(a/5+i)*4,y-a,2+(i%2),4,'#f8e5bd99')}}

// Each room has a different set and a staged action. Animation time is explicit,
// allowing visual frame comparisons rather than merely counting canvas redraws.
function scene(c:Context,type:number,t:number,variant:number){
 const beat=Math.floor(t*9)%2,cycle=(t%8)/8
 switch(type){
 case 0:{
  box(c,-52,-18,70,21,12,'#68764a','#314f45');for(let i=0;i<5;i++)plant(c,-64+i*21,-1+(i%2)*8,t+i,25)
  box(c,68,4,14,20,25,'#b56d45','#d5915b');plant(c,66,-4,t,44)
  ellipse(c,21,-63,15,15,INK);c.save();c.translate(21,-63);c.rotate(t*2);for(let i=0;i<4;i++){ellipse(c,0,8,4,9,CREAM);c.rotate(Math.PI/2)}c.restore()
  const x=cycle<.45?-48+cycle/.45*85:cycle>.75?37-(cycle-.75)/.25*85:37
  person(c,x,31,GREEN,t,cycle>.45&&cycle<.75?'work':'walk',0)
  if(cycle>.45&&cycle<.75){box(c,x+16,10,10,7,8,BLUE,BLUE);line(c,[[x+24,7],[x+31,15]],BLUE,3);for(let i=0;i<6;i++)rect(c,x+28+i%3*3,14+((t*30+i*3)%18),2,3,'#80c0d4')}
  label(c,'NIGHT NURSERY',-35,-52,CREAM,8);break
 }
 case 1:{
  box(c,-25,-16,62,33,23,RED,'#e5c995');rect(c,-29,-48,61,6,INK);rect(c,-26,-43+beat*9,55,8,BLUE)
  for(let i=0;i<3;i++){const x=-35+((t*28+i*24)%84);paper(c,x,3+(x+35)*.24,i%2?RED:BLUE)}
  for(let i=0;i<4;i++)box(c,59,15-i*3,17,18,4,RED,i%2?CREAM:'#ddb653')
  box(c,-73,-3,18,16,17,BLUE,BLUE);rect(c,-79,-25,7,8,GOLD);rect(c,-68,-21,7,8,RED)
  person(c,-57,30,BLUE,t,'work',1);line(c,[[-46,8],[-37,-9+beat*11]],GOLD,3);person(c,35,42,RED,t,'work',2)
  label(c,'ONE MORE EDITION',3,-62,CREAM,8);break
 }
 case 2:{
  polygon(c,[[0,-24],[70,11],[0,47],[-70,11]],'#b45f58');for(let i=0;i<5;i++)line(c,[[-44+i*15,-2-i*2],[-15+i*15,29-i*2]],'#d9a36d',2)
  box(c,-21,-23,48,22,17,BLUE,'#d4b992');for(let i=0;i<8;i++){rect(c,-27+i*6,-27+i*.8,4,8,CREAM);rect(c,-28+i*6,-36,3,3,(Math.floor(t*6)+i)%4===0?GOLD:INK)}
  for(const x of [-74,70]){box(c,x,-5,15,17,34,INK,BLUE);ellipse(c,x-1,0,7+beat,7+beat,BLUE);ellipse(c,x-1,-17,4,4,CREAM)}
  ellipse(c,48,13,17,10,INK);ellipse(c,48,13,5,3,RED);line(c,[[48,13],[48+Math.cos(t*4)*14,13+Math.sin(t*4)*8]],CREAM,2)
  person(c,-12,16,GOLD,t,'work',1);person(c,-48,37,RED,t,'drum',2);ellipse(c,-39,22,14,8,CREAM);line(c,[[-58,7-beat*14],[-38,18]],GOLD,2)
  person(c,42+Math.sin(t*3)*9,40-Math.abs(Math.sin(t*6))*6,GREEN,t,'wave',0);break
 }
 case 3:{
  box(c,-45,-9,72,20,17,BLUE,INK);for(let i=0;i<12;i++){const x=-56+((t*32+i*8)%96);line(c,[[x,-2+(x+56)*.2],[x+7,2+(x+56)*.2]],'#8b9b98',2)}
  for(let i=0;i<3;i++){const x=-52+((t*26+i*29)%83);box(c,x,1+(x+52)*.22,11,10,12,GOLD,'#e3c878');rect(c,x+2,-8+(x+52)*.22,5,3,RED)}
  const a=Math.sin(t*1.8),handX=35+a*30,handY=-22-Math.cos(t*1.8)*20
  box(c,43,15,17,18,14,RED,RED);line(c,[[43,2],[65,-43],[handX,handY]],INK,10);line(c,[[43,2],[65,-43],[handX,handY]],GOLD,6);ellipse(c,65,-43,6,6,RED)
  line(c,[[handX-5,handY+2],[handX-8,handY+11],[handX,handY+15],[handX+8,handY+11],[handX+5,handY+2]],INK,3)
  if(a>-.45)box(c,handX,handY+21,10,9,10,RED,GOLD)
  const robotX=-59+((t*24)%118);box(c,robotX,39,16,13,13,BLUE,CREAM);rect(c,robotX-4,23,12,6,INK);rect(c,robotX-2,25,3,2,GOLD);rect(c,robotX+4,25,3,2,GOLD);ellipse(c,robotX-5,42,4,4,INK);ellipse(c,robotX+8,46,4,4,INK)
  label(c,'SORT / REPEAT',-33,-49,INK,8);break
 }
 case 4:{
  ellipse(c,15,3,72,35,'#324658');for(let i=0;i<14;i++){const a=i*2.4,r=22+(i%4)*11;rect(c,15+Math.cos(a)*r,3+Math.sin(a)*r*.46,2+(i%3===beat?1:0),2,CREAM)}
  line(c,[[-21,-6],[-50,29]],GOLD,4);line(c,[[-21,-6],[12,28]],GOLD,4)
  c.save();c.translate(-21,-34);c.rotate(-.7+Math.sin(t/2)*.35);rect(c,-34,-9,68,18,BLUE);rect(c,22,-12,14,24,CREAM);rect(c,-31,-6,15,12,INK);c.restore()
  const a=t*.8;ellipse(c,52+Math.cos(a)*28,8+Math.sin(a)*13,9,9,GOLD);line(c,[[35,-30],[57,-30],[72,-17]],CREAM,1)
  person(c,-65+Math.sin(t/2)*12,18,BLUE,t,'walk',1);box(c,63,31,18,16,14,RED,INK);rect(c,61,14,13,8,'#79a5a0');break
 }
 case 5:{
  for(let i=0;i<3;i++){const x=-55+i*47,y=-44+i*9;ellipse(c,x,y,16,16,INK);ellipse(c,x,y,13,13,CREAM);for(let n=0;n<4;n++)rect(c,x-1+Math.sin(n*Math.PI/2)*10,y-1-Math.cos(n*Math.PI/2)*10,2,2,INK);line(c,[[x,y],[x+Math.sin(t*(i+1))*10,y-Math.cos(t*(i+1))*10]],RED,2);line(c,[[x,y],[x+Math.cos(t*.3)*7,y+Math.sin(t*.3)*7]],INK,2)}
  box(c,-20,5,45,24,17,RED,'#c49e68');gear(c,12,-6,13,t*1.7);gear(c,-11,-12,9,-t*2.4)
  line(c,[[-63,-24],[-63+Math.sin(t*2.6)*17,7]],GOLD,2);ellipse(c,-63+Math.sin(t*2.6)*17,7,9,9,GOLD)
  person(c,-41,34,BLUE,t,'work',2);rect(c,41,10,24,3,CREAM);person(c,57,39,GREEN,t,'wave',0);break
 }
 case 6:{
  polygon(c,[[0,-20],[67,14],[0,49],[-67,14]],'#d2b79a');for(let i=0;i<6;i++)line(c,[[-40+i*15,-4-i*1.5],[-13+i*13,30-i*2]],RED,3)
  box(c,-8,0,38,32,18,RED,'#c98759');for(let i=0;i<3;i++){paper(c,-11+i*9,-8+i*3,BLUE);ellipse(c,-1+i*13,-7+i*4,4,3,CREAM)}
  ellipse(c,42,-4,11,7,INK);box(c,42,-2,12,10,15,BLUE,BLUE);line(c,[[48,-17],[51,-24],[42,-26],[37,-22]],GOLD,3);steam(c,43,-22,t)
  person(c,-49,11,GREEN,t,'work',0);person(c,34,40,BLUE,t,'work',1)
  const cat=-64+((t*18)%119);ellipse(c,cat,43,10,5,INK);polygon(c,[[cat+6,39],[cat+5,29],[cat+12,35],[cat+17,30],[cat+17,41]],INK);line(c,[[cat-8,42],[cat-14,35-Math.sin(t*5)*5]],INK,3)
  plant(c,74,7,t,30);break
 }
 case 7:{
  ellipse(c,8,13,66,32,'#647f86');for(let i=0;i<3;i++)ellipse(c,8,13,20+i*18,9+i*8,'#647f86')
  box(c,22,15,23,23,18,GREEN,CREAM);c.save();c.translate(22,-26);c.rotate(t*.9);for(let i=0;i<4;i++){c.rotate(Math.PI/2);rect(c,-4,-35,8,70,i%2?GOLD:RED)}c.restore()
  line(c,[[-75,22],[-47,-62],[-17,25]],INK,4);const sway=Math.sin(t*2)*25;line(c,[[-47,-62],[-47+sway,0]],GOLD,3);ellipse(c,-47+sway,0,11,11,RED)
  for(let i=0;i<3;i++){const x=37+i*15,y=-43+i*5;line(c,[[x,-72+i*7],[x+Math.sin(t*2+i)*10,y]],INK,1);ellipse(c,x+Math.sin(t*2+i)*10,y,5,5,i%2?GOLD:BLUE)}
  person(c,51+Math.sin(t/2)*12,39,BLUE,t,'walk',2);break
 }
 }
 // Accessories and posture vary across repeated workshops without random jitter.
 if(variant===1) {box(c,-87,2,13,13,9,RED,CREAM);rect(c,-91,-9,12,3,BLUE)}
}

export function createWorldRenderer(){
 const plates=new Map<string,HTMLCanvasElement>()
 function backplate(type:number,dark:boolean){
  const key=`${type}-${dark}`,cached=plates.get(key);if(cached)return cached
  const plate=document.createElement('canvas');plate.width=272;plate.height=232;const c=plate.getContext('2d');if(!c)return null;c.translate(136,146)
  polygon(c,[[0,-64],[124,0],[0,64],[-124,0]],FLOOR[type])
  if([1,5,6].includes(type))for(let i=0;i<9;i++){const y=i*14-55;line(c,[[-110+Math.abs(i-4)*17,y*.55],[30+i*8,y*.55+45]],'#493c3928',1)}
  else if(type===3){for(let i=0;i<6;i++)polygon(c,[[55+i*7,-18+i*3.5],[61+i*7,-15+i*3.5],[46+i*7,-6+i*3.5],[40+i*7,-9+i*3.5]],i%2?INK:GOLD)}
  else if(type===0)for(let i=0;i<4;i++)line(c,[[-85+i*32,-15-i*4],[-37+i*32,38-i*4]],'#4b776a',1)
  polygon(c,[[-124,0],[0,-64],[0,-84],[-124,-20]],dark?'#6b7878':WALL[type])
  polygon(c,[[0,-64],[124,0],[124,-20],[0,-84]],dark?'#89938b':WALL[type])
  line(c,[[-124,-20],[0,-84],[124,-20]],INK,2);line(c,[[-124,0],[0,64],[124,0]],INK,2)
  // Different wall silhouettes: shelving, cables, prints and framed diagrams.
  if(type===0||type===6){for(let i=0;i<4;i++){const x=14+i*21,y=-66+i*10;polygon(c,[[x,y],[x+16,y+8],[x+16,y-5],[x,y-13]],'#e6cd91');line(c,[[x+8,y+4],[x+8,y-9]],INK,1)}}
  if(type===1||type===5){for(let i=0;i<4;i++){const x=-101+i*17,y=-18-i*9;rect(c,x,y-16,12,17,i%2?RED:CREAM);rect(c,x+2,y-13,8,2,INK);rect(c,x+2,y-8,6,2,BLUE)}}
  if(type===2){line(c,[[-110,-19],[-72,-66],[31,-56],[95,-10]],INK,2);for(let i=0;i<9;i++)ellipse(c,-100+i*22,-32-Math.sin(i/8*Math.PI)*29,2.5,2.5,i%2?GOLD:RED)}
  if(type===3){for(let i=0;i<4;i++)box(c,-98+i*14,-12-i*6,10,8,11,BLUE,i%2?GOLD:CREAM)}
  if(type===4){for(let i=0;i<16;i++){const x=-102+i*12,y=-26-Math.sin(i/15*Math.PI)*43;rect(c,x,y,2,2,CREAM)}line(c,[[-101,-22],[-68,-48],[-30,-62],[13,-59],[54,-37],[87,-12]],GOLD,1)}
  if(type===7){for(let i=0;i<3;i++){const x=-95+i*24,y=-20-i*12;rect(c,x,y-18,18,22,CREAM);ellipse(c,x+9,y-8,6,6,i%2?GOLD:RED)}}
  plates.set(key,plate);return plate
 }
 return{
  draw(c:Context,width:number,height:number,camera:Camera,time:number,selected:Cell,dark:boolean){
   rect(c,0,0,width,height,dark?'#263536':'#d9d4c1');const cells=visibleCells(width,height,camera)
   for(const {col,row}of cells){const type=roomType(col,row),p=point(col,row);c.save();c.translate(width/2+(p.x-camera.x)*camera.zoom,height/2+(p.y-camera.y)*camera.zoom);c.scale(camera.zoom,camera.zoom)
    const plate=backplate(type,dark);if(plate)c.drawImage(plate,-136,-146)
    scene(c,type,Math.floor(time/90)*.09+(((col*17+row*31)%53+53)%53),Math.abs(col+row*3)%3)
    if(selected.col===col&&selected.row===row)line(c,[[0,-65],[125,0],[0,65],[-125,0],[0,-65]],dark?'#f4dc98':'#254d61',2)
    c.restore()
   }
   return cells.length
  },dispose(){plates.clear()},
 }
}
