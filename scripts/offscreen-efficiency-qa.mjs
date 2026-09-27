import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
// Run against the Vite dev server; isolated fixtures mount the real components.
const base = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4174';
const browser=await chromium.launch();
async function counters(page){return page.evaluate(()=>window.drawCounts)}
async function delta(page,ms=350){const a=await counters(page);await page.waitForTimeout(ms);return (await counters(page))-a}
async function setup(page){await page.addInitScript(()=>{window.drawCounts=0;for(const [proto,methods] of [[CanvasRenderingContext2D.prototype,['clearRect','fillRect','drawImage']],[WebGL2RenderingContext.prototype,['clear']]])for(const name of methods){const orig=proto[name];proto[name]=function(...args){if(this.canvas.isConnected)window.drawCounts++;return orig.apply(this,args)}}})}
try{
for(const [component,exportName,props] of [['ClockTrio','default',{}],['SaltSimulation','default',{}],['StageRotation','default',{}],['GenerativeCanvas','default',{}],['EnigmaInteractive','default',{}],['BlackHoleInteractives','TimeDilation',{}],['BlackHoleInteractives','GravLensing',{}],['BlackHoleInteractives','BinaryMerger',{}],['CategoryObject3D','default',{slug:'installations',size:200}],['PocketArcade','default',{embedded:true}]]){
 const page=await browser.newPage({viewport:{width:1187,height:958}});await setup(page);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/__efficiency-fixture',route=>route.fulfill({contentType:'text/html',body:`<style>body{margin:0}#host{margin-top:1200px;width:700px;min-height:500px}footer{height:2000px}</style><div id="host"></div><footer></footer><script type="module">import React from '/node_modules/.vite/deps/react.js';import ReactDOM from '/node_modules/.vite/deps/react-dom_client.js';import RefreshRuntime from '/@react-refresh';RefreshRuntime.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;const Module=await import('/src/components/${component}.tsx');ReactDOM.createRoot(document.querySelector('#host')).render(React.createElement(Module.${exportName},${JSON.stringify(props)}));</script>`}));
 await page.goto(`${base}/__efficiency-fixture`);await page.locator('canvas').first().waitFor({state:'attached'});await page.waitForTimeout(300);assert.equal(await delta(page),0,component+' offscreen');
 await page.locator('#host').scrollIntoViewIfNeeded();await page.waitForTimeout(component==='CategoryObject3D'?3000:500);const active=await delta(page);
 if(component==='PocketArcade'){assert.equal(active,0,'arcade static menu');await page.getByRole('button',{name:'START',exact:true}).click();assert((await delta(page))>0,'arcade game starts');}else assert(active>0,component+' visible draw');
 await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(300);assert.equal(await delta(page),0,component+' stops again');
 await page.locator('#host').scrollIntoViewIfNeeded();await page.waitForTimeout(300);assert((await delta(page))>0,component+' resumes');
 assert.equal(errors.length,0,errors.join('\n'));console.log('PASS',component,exportName,': offscreen stop / active render / resume');await page.close();
}
}finally{await browser.close()}
