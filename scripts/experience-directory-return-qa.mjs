import {chromium,webkit,expect} from '@playwright/test'
import assert from 'node:assert/strict'
const base=process.env.QA_BASE_URL||'http://127.0.0.1:5211'
for(const engine of [chromium,webkit]){
 const b=await engine.launch(),p=await b.newPage({viewport:{width:390,height:844},hasTouch:true});const errors=[];p.on('pageerror',e=>errors.push(e.message))
 await p.goto(`${base}/experience-preview?kind=objects&q=Jugalbandi`)
 await expect(p.locator('.experience-review-card')).toHaveCount(1);await p.reload();await expect(p.getByRole('searchbox')).toHaveValue('Jugalbandi')
 await p.locator('.experience-review-card').tap();await expect(p.locator('.ja-stage svg')).toBeVisible({timeout:20000})
 await p.getByRole('link',{name:'All drafts',exact:true}).first().click();await expect(p.getByRole('searchbox')).toHaveValue('Jugalbandi');await expect(p.getByRole('button',{name:/Physical objects/})).toHaveAttribute('aria-pressed','true')
 await p.getByRole('button',{name:'Clear filters'}).click();await expect(p.locator('.experience-review-card')).toHaveCount(18)
 await p.getByRole('button',{name:/Interfaces/}).click();await p.getByRole('searchbox').fill('Notes');await expect(p.locator('.experience-review-card')).toHaveCount(1)
 await p.locator('.experience-review-card').click();await p.getByRole('link',{name:/Next ·/}).click();await p.getByRole('link',{name:'All drafts',exact:true}).first().click();await expect(p.getByRole('searchbox')).toHaveValue('Notes');await expect(p.locator('.experience-review-card')).toHaveCount(1)
 await p.getByRole('button',{name:'Clear filters'}).click();await expect(p.locator('.experience-review-related a').filter({hasText:'Case study'})).toHaveCount(18)
 await p.getByRole('link',{name:'How Revolving Stage works',exact:true}).click();await expect(p.locator('.mechanism-story')).toBeVisible({timeout:20000})
 await p.goto(`${base}/experience-preview?kind=unknown&q=`);await expect(p.locator('.experience-review-card')).toHaveCount(18)
 assert.deepEqual(errors,[]);await b.close()
}
console.log('Passed Chromium and WebKit: reload, filtered returns, next-draft context, clear, original links, story links and invalid filters.')
