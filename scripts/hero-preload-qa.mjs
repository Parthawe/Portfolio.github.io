import assert from 'node:assert/strict'
import vm from 'node:vm'
import {readFileSync} from 'node:fs'
import ts from 'typescript'
const code=ts.transpileModule(readFileSync('src/utils/preloadHeroEnvironment.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText
async function check({path='/',degraded=false,reduced=false,webgl=true}={}){
 const links=[];let imports=0
 const api={};vm.runInNewContext(code,{exports:api,window:{location:{pathname:path}},document:{querySelector:()=>links[0]||null,createElement:()=>({dataset:{}}),head:{append:node=>links.push(node)}},require:name=>name.includes('heroAssets')?{HERO_ENVIRONMENT_URL:'/same-lighting.hdr'}:name.includes('useWebGLAvailable')?{canUseWebGL:()=>webgl}:name.includes('performance')?{isPerformanceDegraded:()=>degraded,prefersReducedMotion:()=>reduced}:(imports++,{})})
 api.preloadHeroEnvironmentAsset();api.preloadHeroEnvironmentAsset();await Promise.resolve();await Promise.resolve()
 return {links,imports}
}
const normal=await check();assert.equal(normal.links.length,1);assert.equal(normal.imports,1);assert.equal(normal.links[0].href,'/same-lighting.hdr');assert.equal(normal.links[0].crossOrigin,'anonymous')
for(const flags of [{path:'/work'},{degraded:true},{reduced:true},{webgl:false}]){const result=await check(flags);assert.equal(result.links.length,0);assert.equal(result.imports,0)}
console.log('Hero-only preload reuse, original asset URL, capability, low-power and reduced-motion exclusions passed.')
