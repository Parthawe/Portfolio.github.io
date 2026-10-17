import { chromium, webkit, expect } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5205'
const out = process.env.QA_OUTPUT_DIR || '/tmp/portfolio-original-slides-qa'
const publicOnly = process.env.QA_CASE_STUDY_PUBLIC_ONLY === '1'
mkdirSync(out, { recursive: true })
const browser = await (process.env.QA_BROWSER === 'webkit' ? webkit : chromium).launch(), errors = [], results = []
try {
  for (const [width, height, theme] of [[1440,1000,'light'],[1440,1000,'dark'],[390,844,'light'],[320,740,'dark']]) {
    for (const slug of ['mentra', 'transfi-project']) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' })
      await context.addInitScript(theme => { localStorage.setItem('theme', theme); localStorage.setItem('portfolio-analytics-consent-v1', 'denied') }, theme)
      const page = await context.newPage(), requests = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('request', request => { if(request.url().includes('/Assets/case-study-slides/')) requests.push(request.url()) })
      await page.goto(`${base}/${slug}`)
      await expect(page.locator('.project-story__prompt')).toBeVisible()
      if (slug === 'mentra') {
        const proof = page.locator('#cs-design-proof .case-study-slide > img')
        await expect(proof).toHaveCount(1)
        await proof.scrollIntoViewIfNeeded()
        await expect.poll(() => proof.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true)
        assert(requests.length > 0, 'Quick read displays its original design comparison')
        assert(requests.every(url => /\/slide-6-28341(?:-768|-1280)?\.webp$/.test(url)), 'Quick read loads only its single public comparison, not the full deck')
      } else {
        assert.equal(requests.length, 0, 'Protected summary does not load deck imagery')
      }
      await page.locator('.cs-expand-preview-btn').click()
      await expect(page.locator('.case-study-slide')).toHaveCount(slug === 'mentra' ? 10 : 3)
      if (slug === 'mentra') {
        assert.equal(await page.locator('#source-presentation .case-study-slide').count(),0,'complete source reader stays deferred')
        await page.getByText('Inspect all 44 original presentation slides',{exact:true}).click()
        await expect(page.locator('#source-presentation .case-study-slide')).toHaveCount(44)
      }
      if (slug === 'transfi-project') {
        await expect(page.locator('#cs-transfi-research')).toHaveCount(0)
        assert(requests.every(url => /slide-(6-6779|6-9052|6-9184)/.test(url)), 'Locked route requests only public slides')
        if (!publicOnly) {
          await page.getByLabel('Reviewer code', {exact:true}).fill('qa-original-slides')
          await page.getByRole('button', {name:'Unlock',exact:true}).click()
          await expect(page.locator('.case-study-slide')).toHaveCount(31)
        }
      }
      const images = (slug === 'mentra' ? page.locator('#source-presentation') : page).locator('.case-study-slide > img')
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded()
        await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true)
        const ratio = await image.evaluate(img => { const rect=img.getBoundingClientRect(); return rect.width/rect.height })
        assert(Math.abs(ratio - 16/9) < 0.01, 'Source aspect ratio remains intact')
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${slug} ${width} fits`)
      const first = images.first()
      await first.scrollIntoViewIfNeeded(); await first.focus(); await first.press('Enter')
      await expect(page.getByRole('dialog', {name:'Image preview',exact:true})).toBeVisible()
      assert.equal(await page.locator('.lightbox-overlay img').getAttribute('src'), await first.getAttribute('data-original-src'), 'Enlargement uses full source resolution')
      await page.keyboard.press('Escape'); await expect(first).toBeFocused()
      await page.locator('.case-study-slide details').first().locator('summary').click()
      await expect(page.locator('.case-study-slide details').first()).toHaveAttribute('open','')
      await page.screenshot({path:`${out}/${slug}-${width}-${theme}.png`})
      results.push({slug,width,theme,slides:await images.count(),requestedImages:new Set(requests).size})
      await context.close()
    }
  }
  const context=await browser.newContext(), page=await context.newPage()
  await page.goto(`${base}/mentra/#cs-impact`)
  await expect(page.locator('#cs-impact')).toBeVisible()
  await expect(page.locator('#cs-impact')).toContainText('source presentation')
  await page.goto(`${base}/mentra/#cs-bet`)
  await expect(page.locator('#cs-bet')).toBeVisible()
  await context.close()
  const failureContext=await browser.newContext(), failurePage=await failureContext.newPage()
  await failurePage.route('**/slide-0-33*.webp', route => route.abort())
  await failurePage.goto(`${base}/mentra/#cs-context`)
  await failurePage.locator('[data-source-node="0:33"]').scrollIntoViewIfNeeded()
  await expect(failurePage.getByText('This slide couldn’t load.',{exact:true})).toBeVisible()
  await failurePage.unroute('**/slide-0-33*.webp')
  await failurePage.getByRole('button',{name:'Retry image',exact:true}).click()
  await expect.poll(()=>failurePage.locator('[data-source-node="0:33"] > img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true)
  await failureContext.close()
  assert.equal(errors.length,0,JSON.stringify(errors))
  console.log(`Passed: ${publicOnly ? '44 Mentra slides and 3 public TransFi slides; reviewer content remains gated' : 'all 75 original slides and reviewer-code unlocking'}, 8 responsive/theme cases, keyboard preview, transcripts, lazy-loading, deep links and image retry.`)
} finally {
  await browser.close()
  writeFileSync(`${out}/report.json`,JSON.stringify({results,errors},null,2))
}
