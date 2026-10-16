import {chromium,expect} from '@playwright/test'
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5222',out=process.env.QA_OUTPUT_DIR||'/tmp/portfolio-consistency-review';mkdirSync(out,{recursive:true})
const slugs=[...readFileSync('src/data/projectRoutes.ts','utf8').matchAll(/slug:\s*'([^']+)'/g)].map(m=>m[1]);if(slugs.length!==50)throw Error('Expected the complete 50-project manifest')
const routes=['','work','about','notes',...slugs],results=[],failures=[],b=await chromium.launch()
for(const [width,theme] of [[1440,'light'],[390,'dark']]){
 const context=await b.newContext({viewport:{width,height:960},hasTouch:width<500,reducedMotion:'reduce'});await context.addInitScript(t=>{localStorage.setItem('theme',t);localStorage.setItem('portfolio-analytics-consent-v1','denied')},theme);const p=await context.newPage()
 for(const slug of routes){const errors=[];const listener=e=>errors.push(e.message);p.on('pageerror',listener)
  try{await p.goto(base+'/'+slug);await expect(p.locator('main')).toBeVisible();await expect(p.locator('main')).not.toBeEmpty();const expand=p.locator('.cs-expand-preview-btn');if(await expand.count())await expand.first().click();await p.evaluate(()=>document.fonts.ready)
   const before=await p.evaluate(()=>({overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),duplicateIds:[...document.querySelectorAll('main [id]')].map(n=>n.id).filter((id,i,ids)=>ids.indexOf(id)!==i),main:document.querySelectorAll('main').length,emptyHeading:[...document.querySelectorAll('main h1,main h2')].filter(n=>!n.textContent.trim()).length,repeated:[...document.querySelectorAll('main p')].map(n=>n.textContent.trim()).filter((v,i,a)=>v.length>90&&a.indexOf(v)!==i)}))
   await p.locator('footer').first().scrollIntoViewIfNeeded().catch(()=>{});const bottom=await p.evaluate(()=>({overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),broken:[...document.images].filter(n=>(n.currentSrc||n.getAttribute('src'))&&n.complete&&!n.naturalWidth&&n.getBoundingClientRect().width>0).map(n=>n.getAttribute('src'))}))
   const issues=[];if(before.overflow>1||bottom.overflow>1)issues.push('page overflow');if(before.duplicateIds.length)issues.push('duplicate main anchors');if(before.emptyHeading)issues.push('empty headings');if(before.main!==1)issues.push('main landmark count');if(errors.length)issues.push(...errors);if(bottom.broken.length)issues.push(...bottom.broken.map(s=>'broken image '+s));if(issues.length)failures.push({slug,width,issues});results.push({slug:slug||'home',width,theme,issues,repeatedParagraphs:before.repeated});
  }catch(e){failures.push({slug,width,error:String(e)})}finally{p.off('pageerror',listener)}
 }
 await context.close()
}
await b.close();writeFileSync(out+'/report.json',JSON.stringify({results,failures,scope:'Expanded reading layouts at entry and footer; not a complete functional or source-fidelity review of all 50 projects.'},null,2));console.log(JSON.stringify({routes:routes.length,profiles:2,checked:results.length,failures},null,2));if(failures.length)process.exitCode=1
