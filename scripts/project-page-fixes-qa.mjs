import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4173'
const browser = await chromium.launch({ headless: true, args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] })
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ['camera'], reducedMotion: 'reduce' })
const page = await context.newPage()
const errors = []
page.on('pageerror', error => errors.push(error.message))
async function go(route) {
  await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' })
  await page.locator('main').waitFor()
  await page.waitForTimeout(650)
}
function luminance(rgb) {
  const channels = rgb.match(/[\d.]+/g).slice(0, 3).map(Number).map(n => n / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4)
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722
}
try {
  for (const route of ['/mentra/', '/medimorpho/', '/shuffle/']) {
    await go(route)
    for (const theme of ['light', 'dark']) {
      await page.evaluate(theme => document.documentElement.setAttribute('data-theme', theme), theme)
      const colors = await page.locator('.nav-toggle').evaluate(el => ({ bg: getComputedStyle(el).backgroundColor, ink: getComputedStyle(el.querySelector('span')).backgroundColor, width: el.getBoundingClientRect().width }))
      const a = luminance(colors.bg), b = luminance(colors.ink)
      assert((Math.max(a,b) + .05) / (Math.min(a,b) + .05) >= 3, `${route} ${theme}: menu contrast`)
      assert(colors.width >= 44, 'Menu touch target')
    }
    await page.evaluate(() => document.documentElement.removeAttribute('data-theme'))
    await page.screenshot({ path: `/tmp/fixed-${route.split('/')[1]}-mobile.png` })
  }
  await go('/comp-media/')
  const demo = page.locator('.pixel-painting')
  await demo.scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)
  const canvas = demo.locator('canvas')
  const pixels = () => canvas.evaluate(el => el.toDataURL())
  const before = await pixels()
  await page.getByRole('button', { name: 'Start painting', exact: true }).click()
  await page.waitForTimeout(350)
  assert.notEqual(await pixels(), before, 'Canvas paints after explicit start')
  await page.getByRole('button', { name: 'Pause painting', exact: true }).click()
  const paused = await pixels()
  await page.waitForTimeout(200)
  assert.equal(await pixels(), paused, 'Canvas stays still while paused')
  await page.getByRole('button', { name: 'Clear canvas', exact: true }).click()
  assert(await canvas.evaluate(el => {
    const pixels = el.getContext('2d').getImageData(0, 0, el.width, el.height).data
    return pixels.every((value, index) => value === (index % 4 === 3 ? 255 : 51))
  }), 'Clear canvas removes all painted particles')
  const cleared = await pixels()
  await page.waitForTimeout(150)
  assert.equal(await pixels(), cleared, 'Clearing leaves painting paused')
  await page.evaluate(() => {
    window.qaOriginalGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices)
    navigator.mediaDevices.getUserMedia = () => new Promise(resolve => { window.qaResolveCamera = resolve })
  })
  await page.getByRole('button', { name: 'Use my camera', exact: true }).click()
  await page.getByRole('button', { name: 'Cancel camera request', exact: true }).click()
  await page.evaluate(async () => {
    const delayedStream = await window.qaOriginalGetUserMedia({ video: true })
    window.qaDelayedTrack = delayedStream.getVideoTracks()[0]
    window.qaResolveCamera(delayedStream)
    navigator.mediaDevices.getUserMedia = window.qaOriginalGetUserMedia
  })
  await page.waitForFunction(() => window.qaDelayedTrack.readyState === 'ended')
  assert.equal(await demo.locator('video').evaluate(el => el.srcObject), null, 'Cancelled request never attaches a camera')
  await page.getByRole('button', { name: 'Use my camera', exact: true }).click()
  await page.getByRole('button', { name: 'Stop camera', exact: true }).waitFor()
  await page.evaluate(() => { window.qaCameraTrack = document.querySelector('.pixel-painting video').srcObject.getVideoTracks()[0] })
  await page.getByRole('button', { name: 'Stop camera', exact: true }).click()
  assert.equal(await page.evaluate(() => window.qaCameraTrack.readyState), 'ended', 'Stop camera releases the device')
  await page.screenshot({ path: '/tmp/fixed-comp-media-mobile.png' })
  await page.setViewportSize({ width: 1207, height: 953 })
  await demo.scrollIntoViewIfNeeded()
  await page.screenshot({ path: '/tmp/fixed-comp-media-desktop.png' })

  await go('/comp-media/#cs-mechanism')
  assert(await page.locator('#cs-mechanism').isVisible(), 'Direct section link opens the collapsed story')
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'cs-mechanism', 'Deep link moves keyboard focus to its section')
  await page.evaluate(() => { window.location.hash = 'cs-overview' })
  await page.waitForFunction(() => document.activeElement?.id === 'cs-overview')
  await go('/mentra/#cs-context')
  assert(await page.locator('#cs-context').isVisible(), 'Deep links also open controlled stories')
  await page.locator('#cs-context').scrollIntoViewIfNeeded()
  const chapters = page.locator('.cs-bnav-chapters')
  await chapters.click()
  await page.locator('.cs-bnav-menu-link[href="#cs-bet"]').click()
  assert.equal(new URL(page.url()).hash, '#cs-bet', 'Chapter selection produces a shareable URL')
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'cs-bet', 'Chapter selection moves keyboard focus')
  await go('/typeface/#tf-playground')
  assert(await page.locator('#tf-playground').isVisible(), 'Typeface deep link opens the tools')
  await page.evaluate(() => document.fonts.ready)
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Expanded typeface tools fit the mobile viewport')
  await go('/shuffle/')
  assert.equal(await page.locator('a.next-project').getAttribute('href'), '/the-omakase', 'Next project uses the page’s chosen related project')
  console.log('Passed: menu contrast, painting, camera cleanup, deep links, chapter focus, related project')
  const filmRequests = []
  page.on('request', request => { if (request.url().includes('/Assets/films/')) filmRequests.push(request.url()) })
  await go('/enigma/')
  assert.equal(filmRequests.length, 0, 'Film bytes are deferred until playback')
  assert.equal(await page.locator('iframe[src*="vimeo"]').count(), 0, 'Local film needs no Vimeo connection')
  let player = page.locator('.local-project-film').first()
  assert.equal(await player.getByRole('link', { name: /Watch Enigma on Vimeo/ }).getAttribute('href'), 'https://vimeo.com/895893649/d78737dcdb', 'Unlisted Vimeo hash preserved')
  await page.route('**/Assets/films/enigma.mp4', route => route.abort())
  await player.locator('video').evaluate(el => { el.muted = true; void el.play().catch(() => {}) })
  await player.getByText('This film could not load.', { exact: false }).waitFor()
  await player.getByRole('link', { name: /Watch Enigma on Vimeo/ }).focus()
  assert.equal(await player.getByRole('link', { name: /Watch Enigma on Vimeo/ }).evaluate(el => el === document.activeElement), true, 'Blocked film has keyboard-accessible recovery')
  await player.scrollIntoViewIfNeeded()
  await page.screenshot({ path: '/tmp/fixed-film-blocked.png' })
  await page.unroute('**/Assets/films/enigma.mp4')
  await player.getByRole('button', { name: 'Reload film' }).click()
  await player.locator('video').evaluate(el => { el.muted = true; return Promise.race([el.play(), new Promise((_, reject) => setTimeout(() => reject(new Error('Playback did not start')), 15000))]) })
  await page.waitForFunction(() => document.querySelector('.local-project-film video')?.currentTime > 0.1)
  await player.locator('video').evaluate(el => el.pause())

  for (const route of ['/jugalbandi/', '/shuffle/', '/drowning/', '/making-of-time/', '/moniac-machine/', '/the-omakase/', '/motion/editing-motion-stories/']) {
    await go(route)
    if (route === '/the-omakase/') await page.getByRole('button', { name: 'Open the build and exhibition proof' }).click()
    player = page.locator('.local-project-film').first()
    await player.scrollIntoViewIfNeeded()
    const video = player.locator('video')
    await video.evaluate(el => { el.muted = true; return Promise.race([el.play(), new Promise((_, reject) => setTimeout(() => reject(new Error('Playback did not start')), 15000))]) })
    await page.waitForFunction(() => document.querySelector('.local-project-film video')?.currentTime > 0.1)
    await video.evaluate(el => el.pause())
    assert.equal(await video.locator('track[kind="captions"]').count(), route === '/making-of-time/' ? 0 : 1, `${route} captions`)
    if (route === '/making-of-time/') assert.equal(await player.getByText('Silent film').count(), 1)
    console.log(`Playback passed: ${route}`)
  }
  await go('/motion/vishwa-conclave-motion/')
  assert.equal(await page.locator('video track[kind="captions"]').count(), 5)
  for (const video of await page.locator('video[data-caption-status="automatic"]').all()) {
    await video.scrollIntoViewIfNeeded()
    await video.evaluate(el => { el.textTracks[0].mode = 'hidden' })
    await page.waitForFunction(src => {
      const track = [...document.querySelectorAll('track')].find(el => el.getAttribute('src') === src)
      return track?.readyState === 2 && track.track.cues?.length > 0
    }, await video.locator('track').getAttribute('src'), { timeout: 10000 })
  }
  await go('/motion/mentra-motion-language/')
  assert(await page.locator('video[aria-label="Mentra Live · product introduction"]').evaluate(el => el.muted), 'Silent source does not trigger missing-speech-caption warning')
  assert.deepEqual(errors, [])
  console.log('PASS: mobile menu contrast, painting/pause, camera cleanup, local film playback, blocked-film recovery, Vimeo fallback, caption cues, silent clip.')
} finally {
  await browser.close()
}
