import {expect} from '@playwright/test'
const expectedPrivateUrls = {
  "transfi-project": "https://transfi-ui-20261101.pawar-d-parth.chatgpt.site",
  "zentipay": "https://zentipay-ui-20261101.pawar-d-parth.chatgpt.site",
  "code-for-build": "https://code-for-build-ui-20261101.pawar-d-parth.chatgpt.site",
  "vj-software": "https://vj-parking-ui-20261101.pawar-d-parth.chatgpt.site",
  "medimorpho": "https://nyu-communication-ui-20261101.pawar-d-parth.chatgpt.site"
}
export const privateProjectSlugs=['transfi-project','zentipay','code-for-build','vj-software','medimorpho']
export async function verifyPrivateProjectEntry(page,slug){
 expect(new Set(Object.values(expectedPrivateUrls).map(url=>new URL(url).origin)).size).toBe(5)
 await expect(page.locator(`[data-private-project-entry="${slug}"]`)).toBeVisible()
 const link=page.getByRole('link',{name:'Open private prototype ↗',exact:true})
 await expect(link).toHaveAttribute('href',expectedPrivateUrls[slug])
 await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener/)
 await expect(page.locator('iframe')).toHaveCount(0);await expect(page.locator('[data-prototype]')).toHaveCount(0)
 await expect(page.getByRole('link',{name:'Case study',exact:true})).toHaveAttribute('href',`/${slug}`)
 await expect.poll(()=>page.locator('.raahi-experience-intro img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true)
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true)
 await page.getByRole('link',{name:'Case study',exact:true}).click()
 await expect(page.locator('#cs-working-prototype')).toBeVisible()
 await page.locator('.private-study-details > summary').click()
 const region=page.locator('.private-study-table')
 await expect.poll(()=>region.evaluate(el=>el.clientWidth<=innerWidth+1)).toBe(true)
 await expect(page.locator('.private-study-details a[download]')).toHaveCount(2)
 if(await region.evaluate(el=>el.scrollWidth>el.clientWidth)){await region.press('ArrowRight');await expect.poll(()=>region.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0)}
}
