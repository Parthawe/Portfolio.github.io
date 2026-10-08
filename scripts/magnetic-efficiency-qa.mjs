import assert from 'node:assert/strict'
import vm from 'node:vm'
import {readFileSync} from 'node:fs'
import ts from 'typescript'
let cleanup,notify,frame,queries=0,disconnected=false
const handlers=new Map(),order=[]
class Element {
 constructor(name,magnetic=true,children=[]){this.name=name;this.magnetic=magnetic;this.children=children;this.isConnected=true;const state={transition:'',transform:''};this.style=new Proxy(state,{set:(target,key,value)=>{order.push(`write:${name}`);target[key]=value;return true}})}
 matches(){return this.magnetic}
 querySelectorAll(){return this.children.filter(node=>node.magnetic)}
 getBoundingClientRect(){order.push(`read:${this.name}`);return {left:0,top:0,width:100,height:40,right:100,bottom:40}}
}
const a=new Element('a'),b=new Element('b')
const sandbox={exports:{},require:()=>({useEffect:fn=>{cleanup=fn()}}),HTMLElement:Element,navigator:{maxTouchPoints:0},window:{matchMedia:()=>({matches:false})},document:{body:{},querySelectorAll:()=>{queries++;return[a,b]},addEventListener:(name,fn)=>handlers.set(name,fn),removeEventListener:name=>handlers.delete(name)},requestAnimationFrame:fn=>{frame=fn;return 1},cancelAnimationFrame:()=>{frame=undefined},MutationObserver:class{constructor(fn){notify=fn}observe(){}disconnect(){disconnected=true}}}
vm.runInNewContext(ts.transpileModule(readFileSync('src/hooks/useMagnetic.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,sandbox)
sandbox.exports.useMagnetic(true);assert.equal(queries,1)
for(let i=0;i<100;i++)notify([{addedNodes:[{nodeType:3}],removedNodes:[{nodeType:3}]}])
assert.equal(queries,1,'typing never rescans the whole document')
const added=new Element('new');const container=new Element('panel',false,[added]);notify([{addedNodes:[container],removedNodes:[]}])
order.length=0;handlers.get('mousemove')({clientX:70,clientY:20});frame()
assert(Math.abs(Number(added.style.transform.match(/translate\(([^p]+)/)[1])-5.25)<1e-10,'new route controls retain magnetic movement')
assert(order.indexOf('read:new')<order.indexOf('write:a'),'all geometry reads precede transform writes')
b.isConnected=false;notify([{addedNodes:[],removedNodes:[b]}]);order.length=0;handlers.get('mousemove')({clientX:70,clientY:20});frame();assert(!order.includes('read:b'),'detached controls stop receiving work')
cleanup();assert(disconnected);assert(!handlers.has('mousemove'));assert.equal(frame,undefined)
console.log('PASS: text updates avoid global scans; inserted/removed controls; read/write batching; cleanup')
