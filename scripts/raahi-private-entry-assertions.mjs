import { expect } from '@playwright/test'
export async function verifyRaahiPrivateEntry(page) {
  await expect(page.locator('[data-raahi-private-entry]')).toBeVisible()
  for (const [name, route] of [['Open private prototype ↗','home'],['Open station kiosk ↗','kiosk'],['Open bus display ↗','vehicle']]) {
    const link=page.getByRole('link',{name,exact:true})
    await expect(link).toHaveAttribute('href',`https://raahi-interactive-20261023.pawar-d-parth.chatgpt.site/#/${route}`)
    await expect(link).toHaveAttribute('target','_blank')
    await expect(link).toHaveAttribute('rel',/noopener/)
  }
  await expect(page.locator('iframe')).toHaveCount(0)
  await expect(page.locator('[data-prototype]')).toHaveCount(0)
  await expect(page.getByText(/Sign in with the ChatGPT account that owns/)).toBeVisible()
  await expect(page.getByRole('link',{name:'Case study',exact:true})).toHaveAttribute('href','/raahi-project')
  await expect.poll(()=>page.locator('.raahi-experience-intro img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true)
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true)
}
