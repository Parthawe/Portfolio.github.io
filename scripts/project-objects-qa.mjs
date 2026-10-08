import assert from 'node:assert/strict'
import { mkdirSync } from 'node:fs'
import { chromium, expect } from '@playwright/test'
import { PerspectiveCamera, Vector3 } from 'three'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5199'
const output = process.env.QA_OUTPUT_DIR || '/tmp/portfolio-project-objects-qa'
mkdirSync(output, { recursive: true })
const browser = await chromium.launch()
const errors = []

async function drag(page, context, points, touch) {
  if (touch) {
    const client = await context.newCDPSession(page)
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [points[0]] })
    for (const point of points.slice(1)) await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [point] })
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await client.detach()
  } else {
    await page.mouse.move(points[0].x, points[0].y)
    await page.mouse.down()
    for (const point of points.slice(1)) await page.mouse.move(point.x, point.y)
    await page.mouse.up()
  }
}

try {
  for (const profile of [
    { name: 'desktop', width: 1185, height: 969, theme: 'light', touch: false },
    { name: 'mobile', width: 375, height: 812, theme: 'dark', touch: true },
  ]) {
    const context = await browser.newContext({ viewport: { width: profile.width, height: profile.height }, hasTouch: profile.touch, reducedMotion: 'reduce' })
    const page = await context.newPage()
    page.on('pageerror', error => errors.push(error.message))
    await page.addInitScript(theme => localStorage.setItem('theme', theme), profile.theme)
    for (const slug of ['enigma', 'jugalbandi', 'sea-of-salt', 'moniac-machine', 'black-hole']) {
      await page.goto(`${base}/${slug}/world`, { waitUntil: 'domcontentloaded' })
      await page.locator('.physical-world-stage canvas').waitFor()
      await expect(page.locator('[data-world-theme]')).toHaveAttribute('data-world-theme', profile.theme)
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${slug}: no overflow`)
      if (slug === 'enigma') {
        const letter = page.getByLabel('Letter', { exact: true })
        await page.getByRole('textbox', { name: 'Type a letter' }).fill('c')
        await expect(letter).toHaveValue('2')
        await page.getByRole('group', { name: 'Alphabet', exact: true }).getByRole('button', { name: 'B', exact: true }).click()
        await expect(letter).toHaveValue('1')
        const pad = page.getByLabel('Draw a capital letter')
        await pad.scrollIntoViewIfNeeded()
        const r = await pad.boundingBox()
        const vertices = [[30, 35], [145, 35], [35, 145], [145, 145]]
        const points = [{ x: r.x + 30, y: r.y + 35 }]
        for (let segment = 1; segment < vertices.length; segment++) {
          const [ax, ay] = vertices[segment - 1], [bx, by] = vertices[segment]
          for (let step = 1; step <= 20; step++) points.push({ x: r.x + ax + (bx - ax) * step / 20, y: r.y + ay + (by - ay) * step / 20 })
        }
        await drag(page, context, points, profile.touch)
        await expect(letter).toHaveValue('25')
        await page.getByRole('button', { name: 'Reset', exact: true }).click()
        await expect(letter).toHaveValue('0')
      }
      if (slug === 'sea-of-salt' || slug === 'moniac-machine') {
        await page.getByRole('button', { name: 'Overhead', exact: true }).click()
        const canvas = page.locator('.physical-world-stage canvas')
        await canvas.scrollIntoViewIfNeeded()
        await page.waitForTimeout(300)
        const r = await canvas.boundingBox()
        // Project the documented handle/valve position in the overhead fixture.
        const camera = new PerspectiveCamera(r.width < 600 ? 50 : 40, r.width / r.height, .05, 60)
        camera.position.set(0, 1.1 + 6.9 * Math.cos(.01), 6.9 * Math.sin(.01))
        camera.lookAt(0, 1.1, 0); camera.updateMatrixWorld()
        const point = (x, y, z) => {
          const projected = new Vector3(x, y, z).project(camera)
          return { x: r.x + (projected.x + 1) / 2 * r.width, y: r.y + (1 - projected.y) / 2 * r.height }
        }
        if (slug === 'sea-of-salt') {
          const points = [point(.28, 1.47, -.25)]
          for (let i = 1; i <= 40; i++) {
            const angle = -i / 40 * Math.PI * 1.7
            points.push(point(.28 * Math.cos(angle), 1.33, -.25 + .28 * Math.sin(angle)))
          }
          await drag(page, context, points, profile.touch)
          assert(Number(await page.getByRole('slider', { name: 'Story progress' }).inputValue()) > 15, 'turning the mill changes progress')
        } else {
          const start = point(-.5, 1.14, -.17)
          await drag(page, context, [start, { x: start.x + 80, y: start.y }], profile.touch)
          assert(Number(await page.getByRole('slider', { name: 'Tax', exact: true }).inputValue()) > 30, 'turning a valve changes its value')
        }
        await page.getByRole('button', { name: 'Room', exact: true }).click()
      }
      if (slug === 'black-hole') {
        for (const exhibit of ['Time trap', 'Spacetime fabric', 'Binary motion']) {
          await page.getByLabel('Exhibit', { exact: true }).selectOption({ label: exhibit })
          await page.getByRole('slider', { name: 'Distance / separation' }).fill('100')
          await page.locator('.physical-world-stage').screenshot({ path: `${output}/${profile.name}-black-${exhibit.replaceAll(' ', '-')}.png` })
        }
      }
      await page.locator('.physical-world').screenshot({ path: `${output}/${profile.name}-${slug}.png` })
      console.log(`${profile.name}: ${slug} passed`)
    }
    await context.close()
  }
  assert.equal(errors.length, 0, JSON.stringify(errors))
} finally {
  await browser.close()
}
