import{chromium,expect}from'@playwright/test';import{PerspectiveCamera,Vector3}from'three';import{writeFileSync}from'node:fs';import assert from'node:assert/strict'
const results=[],browser=await chromium.launch()
try{for(const[width,height]of[[1440,1000],[1440,768],[1049,962]])for(const[version,base,offset]of[['before','http://127.0.0.1:5225',-1],['after','http://127.0.0.1:5211',-.6]]){
 const page=await browser.newPage({viewport:{width,height}})
 await page.addInitScript(()=>{Object.defineProperty(navigator,'hardwareConcurrency',{get:()=>8});Object.defineProperty(navigator,'deviceMemory',{get:()=>8});Math.random=()=>.5;localStorage.setItem('portfolio-analytics-consent-v1','denied')})
 await page.goto(base);await expect(page.locator('#hero')).toHaveClass(/is-scene-ready/,{timeout:45000})
 const rect=await page.locator('#hero canvas').boundingBox(),trigger=await page.locator('.hero-web-trigger').boundingBox();assert(rect&&trigger)
 const aspect=rect.width/rect.height,scale=Math.max(.5,Math.min(.76,rect.width/760)),shift=Math.max(-.24,Math.min(.16,(.82-aspect)*-.55))
 const camera=new PerspectiveCamera(40,aspect,.1,100);camera.position.set(0,.3,7.5);camera.lookAt(0,0,0);camera.position.y=.18;camera.position.z=7.65+Math.max(0,Math.min(2.7,(.92-aspect)*4.8));camera.updateMatrixWorld();camera.updateProjectionMatrix()
 const project=(x,y,z)=>{const v=new Vector3(x*scale+shift,y*scale,z*scale).project(camera);return{x:rect.x+(v.x+1)/2*rect.width,y:rect.y+(1-v.y)/2*rect.height}}
 const node=project(-.08,-1.66,.3),labelBottom=project(-.16,-1.66+offset-.42,.42)
 await page.mouse.move(node.x,node.y);await page.waitForTimeout(600)
 await page.screenshot({path:`docs/reviews/chat-usability/hero-${width}-${height}-${version}.png`})
 const result={version,width,height,canvas:rect,triggerTop:trigger.y,projectedLabelBottom:labelBottom.y,conservativeGap:trigger.y-labelBottom.y,degraded:await page.locator('html').evaluate(el=>el.classList.contains('is-low-power-device'))};results.push(result)
 if(version==='after')assert(result.conservativeGap>=24,JSON.stringify(result))
 await page.close()
}}finally{await browser.close();writeFileSync('docs/reviews/chat-usability/hero-spacing.json',JSON.stringify(results,null,2))}
console.log('Three desktop viewports: conservative projected hover-label bounds clear the CTA by at least 24px. Screenshots saved for visual comparison.')
