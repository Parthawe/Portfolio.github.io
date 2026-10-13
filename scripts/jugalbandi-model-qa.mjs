import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import ts from 'typescript'
const require=createRequire(import.meta.url),T=require('three')
const code=ts.transpileModule(readFileSync('src/components/physical-worlds/JugalbandiModel.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
const helperCode=ts.transpileModule(readFileSync('src/components/physical-worlds/batchStaticParts.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
const helper={};new Function('exports','require',helperCode)(helper,require)
const exports={};new Function('exports','require',code)(exports,name=>name==='./batchStaticParts'?helper:require(name))
const root=new T.Group(),pickables=[];let created=0
const mat=color=>new T.MeshStandardMaterial({color})
const mesh=(geometry,material,parent=root,x=0,y=0,z=0)=>{created++;const m=new T.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m}
const cylinder=(r,h,m,p=root,x=0,y=0,z=0,r2=r)=>mesh(new T.CylinderGeometry(r,r2,h,32),m,p,x,y,z)
const rod=(a,b,r=.007,m=silver,p=root)=>{const object=cylinder(r,a.distanceTo(b),m,p);object.position.copy(a).add(b).multiplyScalar(.5);object.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.clone().sub(a).normalize());return object}
const plywood=mat('#f0dbc0'),black=mat('#242621'),silver=mat('#a6aaab'),white=mat('#eceade')
const model=exports.buildJugalbandi({root,mat,mesh,cylinder,rod,plywood,black,silver,white,box:(w,h,d,m,p,x,y,z)=>mesh(new T.BoxGeometry(w,h,d),m,p,x,y,z),pick:(object,control)=>{object.userData.control=control;pickables.push(object)}})
assert.deepEqual(model.instruments.map(g=>g.name),['Hexa-18','Mechanized harp','Automated flute','Rainsticks'])
const rainsticks=[];root.traverse(o=>{if(/^Rainstick \d$/.test(o.name))rainsticks.push(o)})
assert.equal(rainsticks.length,4);assert(rainsticks.every(stick=>stick.parent===model.instruments[3]))
assert.equal(pickables.filter(o=>o.userData.control===2).length,4)
const live=[];root.traverse(o=>{if(o.isMesh)live.push(o)})
assert(live.length<created*.5,'static batching reduces retained meshes')
for(const values of[[0,0,0],[100,100,100],[30,30,30]])for(const time of[0,.1,1,3]){
 model.update(values,time,1/24);root.updateMatrixWorld(true)
 for(const instrument of model.instruments){const bounds=new T.Box3().setFromObject(instrument);assert([...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite));assert(bounds.min.y>=-.02,`${instrument.name}: floor contact`)}
 for(const object of pickables)assert(object.parent,'batched geometry retains pick targets')
}
root.updateMatrixWorld(true)
const panelHit=new T.Raycaster(new T.Vector3(0,.95,4),new T.Vector3(0,0,-1)).intersectObject(model.instruments[0],true)
assert(panelHit.some(hit=>hit.object.material.color.getHexString()==='d8aa34'),'Hexa-18 has solid panel caps, not floating sensors')
console.log(`PASS: four instrument assemblies, four mounted rainsticks, finite bounds, floor contact, moving/pickable parts; ${created} constructed meshes → ${live.length} retained`)
