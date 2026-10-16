import * as k from './vendor/anatomy/iso-kit.mjs'
import {writeFileSync} from 'node:fs'
const P=k.fitProjection(k.boxCorners({x:-100,y:-60,w:200,d:120},-12,110),760,540,{pad:38,azimuth:35,elevation:32})
const S=(plan,z,h,tone='mid')=>k.solidSvg(k.slabOf({...plan,r:.5},z,h,P,3,.3),{tone})
const parts={}
let body=''
for(let y=0;y<5;y++)for(let x=0;x<8;x++)body+=S({x:-96+x*24,y:-60+y*24,w:23,d:23},-8,8,(x+y)%2?'mid':'hi')
parts.body=body
let container=''
for(const plan of [{x:-82,y:-48,w:164,d:5},{x:-82,y:43,w:164,d:5},{x:-82,y:-43,w:5,d:86},{x:77,y:-43,w:5,d:86}])container+=S(plan,1,14)
for(const x of [-78,78])for(const y of [-44,44])container+=k.solidSvg(k.cylinder(x,y,1.8,15,2,P,16),{tone:'hi'})
parts.container=container
parts.padding=S({x:-72,y:-38,w:144,d:76},18,4,'hi')
parts.image=S({x:-65,y:-31,w:58,d:62},24,30,'hi')+S({x:-60,y:-26,w:48,d:52},54,1)
parts.text=Array.from({length:4},(_,i)=>S({x:4,y:-28+i*10,w:i===3?40:61,d:4},24,7,'hi')).join('')
parts.button=S({x:4,y:18,w:61,d:16},24,11,'hi')+S({x:14,y:24,w:41,d:3},35,.6)
writeFileSync('src/components/case-study/code-block-art.json',JSON.stringify(parts))
console.log('Generated six source-informed block assemblies; no runtime geometry generator.')
