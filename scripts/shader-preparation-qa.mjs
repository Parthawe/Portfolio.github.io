import assert from 'node:assert/strict'
import vm from 'node:vm'
import {readFileSync}from'node:fs'
import ts from'typescript'
import {createRequire} from 'node:module'
import * as THREE from 'three'
const source=ts.transpileModule(readFileSync('src/utils/prepareSceneShaders.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
function harness({supported=true,lost=false,throws=false}={}){
 let now=0,timer,ready=0,compiled=0,reads=0,complete=false,measures=0
 const exports={};vm.runInNewContext(source,{exports,require:createRequire(import.meta.url),performance:{now:()=>now,measure:()=>measures++},window:{setTimeout:fn=>{timer=fn;return 1},clearTimeout:()=>{timer=undefined}}})
 const context={getExtension:()=>supported?{COMPLETION_STATUS_KHR:123}:null,isContextLost:()=>lost,getProgramParameter:()=>{reads++;return complete}}
 const scene=new THREE.Scene();scene.add(new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshPhysicalMaterial()))
 const target={};let currentTarget=target
 const renderer={getContext:()=>context,getRenderTarget:()=>currentTarget,getActiveCubeFace:()=>0,getActiveMipmapLevel:()=>0,setRenderTarget:value=>{currentTarget=value},compile:()=>{compiled++;if(throws)throw Error('fixture')},info:{programs:[{program:{}},{program:{}}]}}
 const cancel=exports.prepareSceneShaders(renderer,scene,new THREE.PerspectiveCamera(),()=>ready++)
 assert.equal(currentTarget,target,'render target is restored after preparation')
 return {get ready(){return ready},get compiled(){return compiled},get reads(){return reads},get measures(){return measures},cancel,tick:value=>{now=value;const cb=timer;timer=undefined;cb?.()},complete:()=>{complete=true}}
}
const async=harness();assert.equal(async.compiled,2);assert.equal(async.ready,0);async.tick(16);assert.equal(async.ready,0);async.complete();async.tick(32);assert.equal(async.ready,1);assert.equal(async.measures,1);async.tick(48);assert.equal(async.ready,1)
const cancelled=harness();const reads=cancelled.reads;cancelled.cancel();cancelled.tick(100);assert.equal(cancelled.ready,0);assert.equal(cancelled.reads,reads,'unmount never polls disposed programs')
const bounded=harness();bounded.tick(8000);assert.equal(bounded.ready,1,'preparation has a bounded fallback')
const unsupported=harness({supported:false});assert.equal(unsupported.compiled,0);assert.equal(unsupported.ready,1);assert.equal(unsupported.measures,0)
assert.equal(harness({lost:true}).ready,1);assert.equal(harness({throws:true}).ready,1)
console.log('PASS: asynchronous completion, unsupported path, deadline, context loss, compile failure, cancellation and single readiness callback')
