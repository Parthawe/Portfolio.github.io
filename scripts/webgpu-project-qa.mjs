import assert from 'node:assert/strict'
import {chromium, expect} from '@playwright/test'
const browser=await chromium.launch()
const base=process.env.QA_BASE_URL||'http://127.0.0.1:4175'
try {
 for(const mode of ['default','unsupported','candidate']) {
  const page=await browser.newPage({viewport:{width:1280,height:900},reducedMotion:'reduce'})
  if(mode==='unsupported') await page.addInitScript(()=>Object.defineProperty(navigator,'gpu',{value:undefined}))
  const errors=[],requests=[]
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()))
  await page.goto(`${base}/enigma/world${mode==='default'?'':'?renderer=webgpu'}`)
  const canvas=page.locator('.physical-world-stage canvas')
  await expect(canvas).toBeVisible({timeout:20000})
  const backend=await canvas.getAttribute('data-renderer')
  assert(['webgl','webgl2','webgpu'].includes(backend))
  if(mode==='default') {
   assert.equal(backend,'webgl')
   assert(!requests.some(url=>url.includes('vendor-three-webgpu')), 'Default pages do not fetch WebGPU code')
  }
  if(mode==='unsupported') assert.equal(backend,'webgl')
  await page.getByRole('button', {name:'B',exact:true}).click()
  await expect(page.getByLabel('Type a letter', {exact:true})).toHaveValue('B')
  assert.deepEqual(errors,[])
  console.log(`${mode}: ${backend}; rendered and controls available`)
  await page.close()
 }
} finally {await browser.close()}
