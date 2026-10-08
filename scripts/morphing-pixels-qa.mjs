import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
import * as THREE from 'three'
const source=readFileSync('src/components/HeroScene.tsx','utf8')
const tree=ts.createSourceFile('HeroScene.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX)
const functions=['seededRand','mix','cubeGradientColor'].map(name=>tree.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text===name).getText(tree)).join('\n')
const pixelsSource=source.match(/const pixelData = useMemo\(\(\) => \{[\s\S]*?\}, \[dark\]\);/)[0]
const pixelsCode=ts.transpileModule(functions+'\n'+pixelsSource+'\nresult=pixelData',{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText
const helperExports={}
vm.runInNewContext(ts.transpileModule(readFileSync('src/utils/morphingPixelInstances.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText,{exports:helperExports})
let comparisons=0
for(const dark of [false,true]) {
 const scope={dark,useMemo:fn=>fn(),result:null};vm.runInNewContext(pixelsCode,scope)
 const pixels=scope.result
 const geometry=new THREE.BoxGeometry(.038,.015,.038)
 geometry.setAttribute('instanceEmissive',new THREE.InstancedBufferAttribute(new Float32Array(pixels.length),1))
 const mesh=new THREE.InstancedMesh(geometry,new THREE.MeshPhysicalMaterial(),pixels.length)
 const scratch=new THREE.Object3D(),actual=new THREE.Matrix4(),original=new THREE.Object3D()
 for(const hover of [0,.05,.3,.7,1])for(const time of [0,.01666667,3,27]) {
  helperExports.updateMorphingPixels(mesh,pixels,hover,time,dark,scratch)
  pixels.forEach((pd,i)=>{
   const raw=Math.min(1,Math.max(0,hover*2.5-pd.delay*.8));const eased=1-Math.pow(1-raw,3)
   original.position.set(...pd.solidPos.map((value,axis)=>value+(pd.scatterPos[axis]-value)*eased))
   if(hover<.1)original.position.y+=Math.sin(time*1.5+pd.solidPos[0]*8+pd.solidPos[2]*8)*.008
   const x=Math.sin(i*7*127.1+i*7*311.7)*43758.5453;const spin=(x-Math.floor(x))*.3+.1
   original.rotation.set(eased*time*spin,0,eased*time*spin*.7);original.scale.setScalar(1+eased*.3);original.updateMatrix()
   mesh.getMatrixAt(i,actual)
   actual.elements.forEach((value,j)=>assert(Math.abs(value-original.matrix.elements[j])<1e-6,'original cube transforms preserved'))
   assert(Math.abs(geometry.getAttribute('instanceEmissive').getX(i)-eased*(dark?.6:.35))<1e-7,'original per-cube glow preserved')
   comparisons++
  })
 }
 geometry.dispose();mesh.material.dispose();mesh.dispose()
 console.log(`${dark?'dark':'light'}: ${pixels.length} cubes, one shared geometry/material`)
}
const shader={vertexShader:THREE.ShaderLib.physical.vertexShader,fragmentShader:THREE.ShaderLib.physical.fragmentShader}
helperExports.addInstanceEmissive(shader)
assert(shader.vertexShader.includes('vInstanceEmissive = instanceEmissive;'))
assert(shader.fragmentShader.includes('emissive * vInstanceEmissive;'))
console.log(`PASS: ${comparisons} original transform/glow comparisons; physical shader injection`)
