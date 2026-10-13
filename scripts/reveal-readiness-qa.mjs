import { chromium, expect } from '@playwright/test'
import { waitForReveal, waitForMotion } from './visible-layout-qa.mjs'

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
  await page.setContent(`<style>
    #viewport { overflow: hidden; height: 40px }
    #track { width: 3000px; height: 40px; animation: slide 24s linear infinite }
    @keyframes slide { to { transform: translateX(-1500px) } }
  </style><div id="spacer" style="height:1000px"></div><div id="viewport"><div id="track">Logos</div></div>`)
  await page.evaluate(() => {
    // Reproduce headless frame starvation without stopping CSS animations.
    window.requestAnimationFrame = callback => setTimeout(() => callback(performance.now()), 2000)
    setTimeout(() => { document.querySelector('#spacer').style.height = '1600px' }, 10)
  })
  await waitForMotion(page.locator('#track'), page.locator('#viewport'))
  expect(await page.evaluate(() => scrollX)).toBe(0)
  console.log('PASS marquee advances despite delayed rAF and layout shift, without horizontal scrolling')
  await page.addStyleTag({ content: '#track { animation-play-state: paused }' })
  await expect.poll(() => page.locator('#track').evaluate(element =>
    element.getAnimations().every(animation => animation.playState === 'paused' && !animation.pending)
  )).toBe(true)
  await expect(waitForMotion(page.locator('#track'), page.locator('#viewport'), 750)).rejects.toThrow()
  console.log('PASS paused marquee still fails')
} finally {
  await browser.close()
}
