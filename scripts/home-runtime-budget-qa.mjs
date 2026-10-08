import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
const code=ts.transpileModule(readFileSync(new URL('../src/utils/performance.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText
function harness(){
 let now=0,raf,notify;const classes=new Set()
 class Observer {static supportedEntryTypes=['longtask'];constructor(callback){notify=entries=>callback({getEntries:()=>entries})}observe(){}disconnect(){}}
 const sandbox={exports:{},performance:{now:()=>now},PerformanceObserver:Observer,requestAnimationFrame:callback=>{raf=callback;return 1},cancelAnimationFrame:()=>{raf=undefined},document:{visibilityState:'visible',dataset:{},documentElement:{dataset:{},classList:{contains:name=>classes.has(name),add:(...names)=>names.forEach(n=>classes.add(n)),toggle:(name,on)=>on?classes.add(name):classes.delete(name)}}},window:{sessionStorage:{setItem(){}},dispatchEvent(){}},CustomEvent:class {}}
 vm.runInNewContext(code,sandbox)
 return {api:sandbox.exports,classes,time:value=>{now=value},tick:value=>{now=value;const callback=raf;raf=undefined;callback?.(now)},long:(startTime,duration)=>notify([{startTime,duration}])}
}
const active=harness();active.api.startRuntimePerformanceMonitor();const finish=active.api.beginSceneStartup()
active.time(2000);active.long(1000,1800);active.tick(6500)
assert(!active.classes.has('is-runtime-performance-degraded'),'one-time startup work does not disable the hero')
finish();active.long(1000,1800);active.tick(7000)
assert(!active.classes.has('is-runtime-performance-degraded'),'late delivery of startup tasks remains excluded')
active.time(7200);active.long(7100,1800);active.tick(11500)
assert(active.classes.has('is-runtime-performance-degraded'),'genuine runtime freezes still activate the existing fallback')
const bounded=harness();bounded.api.startRuntimePerformanceMonitor();bounded.api.beginSceneStartup(1000);bounded.time(3000);bounded.long(2500,1800);bounded.tick(7000)
assert(bounded.classes.has('is-runtime-performance-degraded'),'a stalled startup cannot suppress the monitor indefinitely')
const settled=harness();settled.api.startRuntimePerformanceMonitor();const settle=settled.api.beginSceneStartup()
settled.time(2000);settle(2200);settled.time(3000);settled.long(2800,1800);settled.tick(4100)
assert(!settled.classes.has('is-runtime-performance-degraded'),'the first-frame settling window remains protected')
settled.time(4500);settled.long(3000,1800);settled.tick(4600)
assert(!settled.classes.has('is-runtime-performance-degraded'),'buffered settling tasks remain excluded')
settled.time(4700);settled.long(4600,1800);settled.tick(9100)
assert(settled.classes.has('is-runtime-performance-degraded'),'monitoring resumes after settling')
const capped=harness();capped.api.startRuntimePerformanceMonitor();const cap=capped.api.beginSceneStartup(1000)
capped.time(800);cap(2200);capped.time(3000);capped.long(2500,1800);capped.tick(7000)
assert(capped.classes.has('is-runtime-performance-degraded'),'settling cannot extend the startup deadline')
console.log('Startup, delayed tasks, settling, sustained runtime pressure, and deadline bounds passed.')
