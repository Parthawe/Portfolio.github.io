import assert from 'node:assert/strict'
import vm from 'node:vm'
import ts from 'typescript'
import {readFileSync} from 'node:fs'
const source=ts.transpileModule(readFileSync('src/utils/sceneActivity.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
let now=0,id=0,intersection,draws=0
const timers=new Map(),frames=new Map(),events=new Map(),docEvents=new Map()
const doc={hidden:false,addEventListener:(k,v)=>docEvents.set(k,v),removeEventListener:k=>docEvents.delete(k)}
const motion={matches:false,addEventListener(){},removeEventListener(){}}
const element={addEventListener:(k,v)=>events.set(k,v),removeEventListener:k=>events.delete(k)}
const exports={}
const clear=key=>timers.delete(key)
vm.runInNewContext(source,{exports,performance:{now:()=>now},matchMedia:()=>motion,document:doc,window:{setTimeout:fn=>{timers.set(++id,fn);return id}},clearTimeout:clear,requestAnimationFrame:fn=>{frames.set(++id,fn);return id},cancelAnimationFrame:key=>frames.delete(key),IntersectionObserver:class{constructor(fn){intersection=fn}observe(){}disconnect(){}}})
const activity=exports.createSceneActivity(element,()=>draws++,{introMs:100,idleMs:100,fps:24,interactionFps:60})
assert.equal(timers.size+frames.size,0)
intersection([{isIntersecting:true}]);assert.equal(timers.size,1)
events.get('pointermove')();assert.equal(timers.size,0);assert.equal(frames.size,1,'direct manipulation schedules rAF without timer')
function frame(time){now=time;const batch=[...frames.values()];frames.clear();batch.forEach(fn=>fn(now))}
frame(16);assert.equal(draws,1);assert.equal(frames.size,1)
frame(24);assert.equal(draws,1,'120Hz refresh does not exceed configured 60fps')
frame(33);assert.equal(draws,2)
frame(300);assert.equal(timers.size+frames.size,0,'idle stops callbacks')
events.get('pointermove')();intersection([{isIntersecting:false}]);assert.equal(timers.size+frames.size,0,'offscreen stops callbacks')
intersection([{isIntersecting:true}]);doc.hidden=true;docEvents.get('visibilitychange')();assert.equal(timers.size+frames.size,0,'hidden tab stops callbacks')
doc.hidden=false;motion.matches=true;intersection([{isIntersecting:true}]);events.get('keydown')();frame(316);assert.equal(timers.size+frames.size,0,'reduced motion draws once')
activity.dispose();assert.equal(events.size,0);assert.equal(docEvents.size,0)
console.log('PASS: interaction rAF, idle/offscreen/hidden stop, reduced motion, cleanup')
