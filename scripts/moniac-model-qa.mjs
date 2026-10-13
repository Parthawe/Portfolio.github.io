import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import ts from 'typescript'
const require=createRequire(import.meta.url),T=require('three')
const code=ts.transpileModule(readFileSync('src/components/physical-worlds/MoniacModel.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
const helperCode=ts.transpileModule(readFileSync('src/components/physical-worlds/batchStaticParts.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
const helper={};new Function('exports','require',helperCode)(helper,require)
const exports={};new Function('exports','require',code)(exports,name=>name==='./batchStaticParts'?helper:require(name))
const root=new T.Group(),pickables=[];let created=0
const mat=color=>new T.MeshStandardMaterial({color})
const mesh=(geometry,material,parent=root,x=0,y=0,z=0)=>{created++;const m=new T.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m}
const cylinder=(r,h,m,p=root,x=0,y=0,z=0,r2=r)=>mesh(new T.CylinderGeometry(r,r2,h,32),m,p,x,y,z)
const rod=(a,b,r=.007,m=silver,p=root)=>{const object=cylinder(r,a.distanceTo(b),m,p);object.position.copy(a).add(b).multiplyScalar(.5);object.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.clone().sub(a).normalize());return object}
const plywood=mat('#f0dbc0'),black=mat('#242621'),silver=mat('#a6aaab'),white=mat('#eceade')
const model=exports.buildMoniac({root,mat,mesh,cylinder,rod,plywood,black,silver,white,box:(w,h,d,m,p,x,y,z)=>mesh(new T.BoxGeometry(w,h,d),m,p,x,y,z),pick:(object,control)=>{object.userData.control=control;pickables.push(object)}})
assert.equal(model.valves.length,6,'six wheels documented in the cabinet photos')
assert.deepEqual(model.locations.map(p=>p[2]).sort((a,b)=>a-b),[0,1,3,4,5,6],'interest remains a separate browser setting')
for(const value of[0,50,100]){
 model.update(Array(7).fill(value));root.updateMatrixWorld(true)
 const bounds=new T.Box3().setFromObject(root);assert([...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite));assert(bounds.min.y>=0)
 for(const target of model.targets){const center=target.getWorldPosition(new T.Vector3());assert(new T.Raycaster(center.clone().add(new T.Vector3(0,1,0)),new T.Vector3(0,-1,0)).intersectObject(target).length,'valve openings remain touchable')}
}
console.log('PASS: six photographed wheels, policy mappings, pick targets, finite geometry, floor contact')
