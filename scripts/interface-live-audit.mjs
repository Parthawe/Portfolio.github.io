import {chromium} from '@playwright/test'
import {mkdirSync,writeFileSync} from 'node:fs'
const out='docs/reviews/interface-sources';mkdirSync(out,{recursive:true});const browser=await chromium.launch(),results=[]
for(const [slug,url] of [['mentra','https://mentraglass.com'],['mentra-miniapps','https://apps.mentraglass.com'],['clawed-chat','https://clawed.chat'],['executivelens','https://www.executivelens.ai']]){
 const page=await browser.newPage({viewport:{width:1440,height:1000}});try{const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:20000});await page.waitForTimeout(2500);results.push({slug,url:page.url(),status:response?.status(),title:await page.title(),text:(await page.locator('body').innerText()).slice(0,5000),links:await page.locator('a').evaluateAll(a=>a.map(x=>({text:x.textContent?.trim().slice(0,70),href:x.href})).filter(x=>x.text))});await page.screenshot({path:`${out}/${slug}-live.png`})}catch(e){results.push({slug,url,error:e.message})}finally{await page.close()}
}
await browser.close();writeFileSync(out+'/live-audit.json',JSON.stringify(results,null,2));console.log(results.map(({text,links,...rest})=>rest))
