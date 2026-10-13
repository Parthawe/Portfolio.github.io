import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import ts from 'typescript'
const require=createRequire(import.meta.url),T=require('three')
const code=ts.transpileModule(readFileSync('src/components/physical-worlds/RevolvingStageModel.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
const helperCode=ts.transpileModule(readFileSync('src/components/physical-worlds/batchStaticParts.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
const helper={};new Function('exports','require',helperCode)(helper,require)
const exports={};new Function('exports','require',code)(exports,name=>name==='./batchStaticParts'?helper:require(name))
const root=new T.Group(),pickables=[];let created=0
const mat=color=>new T.MeshStandardMaterial({color})
const mesh=(geometry,material,parent=root,x=0,y=0,z=0)=>{created++;const m=new T.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m}
const cylinder=(r,h,m,p=root,x=0,y=0,z=0,r2=r)=>mesh(new T.CylinderGeometry(r,r2,h,32),m,p,x,y,z)
const rod=(a,b,r=.007,m=silver,p=root)=>{const object=cylinder(r,a.distanceTo(b),m,p);object.position.copy(a).add(b).multiplyScalar(.5);object.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.clone().sub(a).normalize());return object}
const plywood=mat('#f0dbc0'),black=mat('#242621'),silver=mat('#a6aaab'),white=mat('#eceade')
const model=exports.buildRevolvingStage({root,mat,mesh,cylinder,plywood,black,silver,white,box:(w,h,d,m,p,x,y,z)=>mesh(new T.BoxGeometry(w,h,d),m,p,x,y,z),pick:(object,control)=>{object.userData.control=control;pickables.push(object)}})
// Source drawing: a rectangular 15 × 8 ft deck, a square 8 × 8 ft base,
// and two rings of eight casters. These dimensions catch the former circular model.
assert.equal(model.deck.geometry.parameters.width/model.deck.geometry.parameters.depth,15/8)
assert.equal(model.base.geometry.parameters.width,model.base.geometry.parameters.depth)
assert.equal(model.casters.length,16)
assert(model.casters.every(c=>c.parent===root),'casters stay on the stationary base')
assert.equal(pickables.length,1)
for(const angle of[0,45,90,180,225,360])for(const reveal of[0,16,50,100]){
 model.update([angle,reveal]);root.updateMatrixWorld(true)
 const bounds=new T.Box3().setFromObject(root);assert([...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite));assert(bounds.min.y>=0)
 assert.equal(model.base.rotation.y,0);assert.equal(model.scenery.parent,model.assembly)
 assert.equal(model.scenery.visible,reveal<15)
 assert.equal(model.assembly.rotation.y,-angle*Math.PI/180)
}
model.update([0,0]);root.updateMatrixWorld(true)
assert(new T.Raycaster(new T.Vector3(2,4,1),new T.Vector3(0,-1,0)).intersectObject(model.deck).length,'solid deck is pickable from above')
console.log('PASS: drawing proportions, stationary two-ring caster base, attached scenic assembly, finite rotation/cutaway geometry, deck picking')
