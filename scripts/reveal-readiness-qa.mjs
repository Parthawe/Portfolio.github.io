import { chromium, expect } from '@playwright/test'
import { waitForReveal } from './visible-layout-qa.mjs'

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } })
  await page.setContent(`<style>
    .reveal { filter: blur(4px); opacity: 0; transition: filter .3s, opacity .3s }
    .reveal.visible { filter: blur(0); opacity: 1 }
  </style><div id="spacer" style="height:1000px"></div><div class="reveal"><div id="target" style="height:80px">Logos</div></div>`)
  await page.evaluate(() => {
    const reveal = document.querySelector('.reveal')
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) reveal.classList.add('visible')
    })
    observer.observe(reveal)
    // Simulate deferred content changing height during the entrance.
    setTimeout(() => { document.querySelector('#spacer').style.height = '1600px' }, 100)
  })
  await waitForReveal(page.locator('#target'))
  console.log('PASS reveal settles after deferred layout shift')
  await page.addStyleTag({ content: '.reveal.visible { filter: blur(2px) !important; transition: none }' })
  await expect(waitForReveal(page.locator('#target'), 750)).rejects.toThrow()
  console.log('PASS permanently blurred reveal still fails')
} finally {
  await browser.close()
}
