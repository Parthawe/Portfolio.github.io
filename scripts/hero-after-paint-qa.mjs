import assert from 'node:assert/strict'
import vm from 'node:vm'
import {readFileSync} from 'node:fs'
import ts from 'typescript'
const code=ts.transpileModule(readFileSync('src/hooks/useDeferredMount.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText
function fixture(enabled,options){
 const frames=new Map(),states=[];let effect,id=0,idle
 const api={};vm.runInNewContext(code,{exports:api,require:()=>({useState:()=>[false,v=>states.push(v)],useEffect:fn=>{effect=fn}}),requestAnimationFrame:fn=>{frames.set(++id,fn);return id},cancelAnimationFrame:id=>frames.delete(id),window:{requestIdleCallback:fn=>{idle=fn;return 1},cancelIdleCallback:()=>{idle=undefined}}})
 api.useDeferredMount(enabled,options);const cancel=effect();return {states,frames,cancel,tick:()=>{const [id,fn]=frames.entries().next().value;frames.delete(id);fn()},idle:()=>idle?.()}
}
const paint=fixture(true,{afterPaint:true});assert.deepEqual(paint.states,[]);paint.tick();assert.deepEqual(paint.states,[]);paint.tick();assert.deepEqual(paint.states,[true])
const stopped=fixture(true,{afterPaint:true});stopped.tick();stopped.cancel();assert.equal(stopped.frames.size,0);assert.deepEqual(stopped.states,[])
const disabled=fixture(false,{afterPaint:true});assert.equal(disabled.frames.size,0)
const idle=fixture(true,{});assert.deepEqual(idle.states,[]);idle.idle();assert.deepEqual(idle.states,[true])
console.log('First paint, activation, cancellation, disabled state and existing idle behavior passed.')
