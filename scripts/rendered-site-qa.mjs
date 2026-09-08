import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from '@playwright/test'

const baseUrl = (process.env.QA_BASE_URL || 'http://127.0.0.1:4173').replace(/\/$/, '')
const sitemapPath = process.env.QA_SITEMAP_PATH || 'public/sitemap.xml'
const reportPath = process.env.QA_RENDERED_REPORT_PATH || 'qa-rendered-report.md'
const concurrency = Number(process.env.QA_RENDERED_CONCURRENCY || 2)
const extraRoutes = [
  '/accessibility',
  '/book',
  '/graveyard',
  '/studio',
  '/mentra-website',
  '/design-engineering',
]
const viewports = [
  { name: 'desktop', width: 1207, height: 953 },
  { name: 'mobile', width: 390, height: 844 },
]

const sitemap = readFileSync(sitemapPath, 'utf8')
const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
  const pathname = new URL(match[1]).pathname
  return pathname === '/' ? pathname : pathname.replace(/\/$/, '')
})
const routes = [...new Set([...sitemapRoutes, ...extraRoutes])]

async function inspectRoute(browser, route, viewport) {
  const page = await browser.newPage({ viewport })
  const consoleErrors = []
  const pageErrors = []
  const issues = []
  const warnings = []
  let status = 0

  page.on('console', (message) => {
    if (message.type() !== 'error') return
    const location = message.location().url
    if (location && !location.startsWith(baseUrl)) {
      warnings.push(`Third-party console error: ${new URL(location).hostname}`)
      return
    }
    consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))

  try {
    // Directory entrypoints match GitHub Pages; Vite's slashless SPA fallback
    // otherwise serves the root HTML instead of the generated route document.
    const response = await page.goto(`${baseUrl}${route === '/' ? '/' : `${route}/`}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    })
    status = response?.status() || 0
    const staticHtml = await response?.text() || ''
    const staticCanonical = staticHtml.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1]
    await page.locator('#main-content').waitFor({ state: 'attached', timeout: 20_000 })
    await page.waitForTimeout(500)
    await page.waitForFunction(() => !!document.querySelector('meta[name="robots"]'))

    const result = await page.evaluate(() => {
      const isVisible = (element) => {
        const style = getComputedStyle(element)
        const rect = element.getBoundingClientRect()
        return style.display !== 'none'
          && style.visibility !== 'hidden'
          && Number(style.opacity) > 0
          && rect.width > 0
          && rect.height > 0
      }
      const accessibleName = (element) => (
        element.innerText
        || element.getAttribute('aria-label')
        || element.getAttribute('title')
        || ''
      ).trim()
      const ids = [...document.querySelectorAll('[id]')]
        .map((element) => element.id)
        .filter(Boolean)
      const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))]
      const projectMain = document.querySelector('main.project-main')

      return {
        title: document.title,
        robots: document.querySelector('meta[name="robots"]')?.content || '',
        canonicals: [...document.querySelectorAll('link[rel="canonical"]')].map((link) => link.href),
        hiddenFocus: [...document.querySelectorAll('[aria-hidden="true"] a[href], [aria-hidden="true"] button')]
          .filter((element) => element.tabIndex >= 0 && !element.disabled && getComputedStyle(element).display !== 'none' && element.getClientRects().length).length,
        mainCount: document.querySelectorAll('main').length,
        h1Count: document.querySelectorAll('h1').length,
        overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        duplicateIds,
        missingAlt: [...document.querySelectorAll('img:not([alt])')]
          .map((image) => image.getAttribute('src') || '(empty source)'),
        brokenImages: [...document.images]
          .filter((image) => isVisible(image) && image.complete && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src || '(empty source)'),
        unnamedButtons: [...document.querySelectorAll('button,[role="button"]')]
          .filter(isVisible)
          .filter((element) => !accessibleName(element))
          .map((element) => element.outerHTML.slice(0, 160)),
        projectContract: projectMain ? {
          header: Boolean(document.querySelector('.project-header')),
          visualHero: Boolean(document.querySelector('.proj-visual-hero')),
          brief: Boolean(document.querySelector('.proj-visual-brief')),
        } : null,
        audibleVideosWithoutCaptions: [...document.querySelectorAll('video')]
          .filter((video) => !video.muted && !video.querySelector('track[kind="captions"],track[kind="subtitles"]'))
          .map((video) => video.getAttribute('aria-label') || video.currentSrc || 'Unlabelled video'),
        appError: /this frame stopped rendering|page not found|404/i.test(document.body.innerText || ''),
      }
    })

    if (status >= 400) issues.push(`HTTP ${status}`)
    if (!result.title) issues.push('Document title missing')
    if (/page not found/i.test(result.title)) issues.push('P1: Routable page has a not-found title')
    const utility = ['/studio', '/book', '/graveyard'].includes(route)
    if (!utility && /noindex/.test(result.robots)) issues.push('P1: Public route is noindex')
    if (!utility && !/\bindex\s*,\s*follow\b/.test(result.robots)) issues.push('P1: Public route must explicitly allow index, follow')
    if (utility && !/noindex/.test(result.robots)) issues.push('P1: Utility route lost noindex')
    if (result.canonicals.length !== 1) issues.push(`P1: Expected one canonical, found ${result.canonicals.length}`)
    if (!staticCanonical || result.canonicals[0] !== staticCanonical) issues.push(`P1: Rendered canonical conflicts with static HTML (${staticCanonical || 'missing'})`)
    if (result.hiddenFocus) issues.push(`P1: ${result.hiddenFocus} focusable controls inside aria-hidden`)
    if (result.mainCount !== 1) issues.push(`Expected one main landmark, found ${result.mainCount}`)
    if (result.h1Count < 1) {
      if (route === '/about') warnings.push('No h1 (preserved by explicit page constraint)')
      else issues.push('No h1')
    }
    if (result.overflow > 1) issues.push(`Horizontal overflow: ${result.overflow}px`)
    if (result.duplicateIds.length) issues.push(`Duplicate IDs: ${result.duplicateIds.join(', ')}`)
    if (result.missingAlt.length) issues.push(`Images missing alt: ${result.missingAlt.join(', ')}`)
    if (result.brokenImages.length) issues.push(`Broken images: ${result.brokenImages.join(', ')}`)
    if (result.unnamedButtons.length) issues.push(`Unnamed controls: ${result.unnamedButtons.join(' | ')}`)
    if (result.appError) issues.push('Application error or not-found state rendered')
    if (result.projectContract) {
      const missing = Object.entries(result.projectContract)
        .filter(([, present]) => !present)
        .map(([key]) => key)
      if (missing.length) issues.push(`Project presentation missing: ${missing.join(', ')}`)
    }
    if (result.audibleVideosWithoutCaptions.length) {
      warnings.push(`Unmuted videos need audio/caption review: ${result.audibleVideosWithoutCaptions.join(', ')}`)
    }
  } catch (error) {
    issues.push(error.message)
  } finally {
    if (consoleErrors.length) issues.push(`Console errors: ${consoleErrors.join(' | ')}`)
    if (pageErrors.length) issues.push(`Page errors: ${pageErrors.join(' | ')}`)
    await page.close()
  }

  return { route, viewport: viewport.name, status, issues, warnings }
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex
      nextIndex += 1
      results[index] = await mapper(items[index])
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

const browser = await chromium.launch({ headless: true })
const checks = viewports.flatMap((viewport) => routes.map((route) => ({ route, viewport })))
const results = await mapWithConcurrency(
  checks,
  concurrency,
  ({ route, viewport }) => inspectRoute(browser, route, viewport),
)
await browser.close()

const failures = results.filter((result) => result.issues.length)
const warnings = results.filter((result) => result.warnings.length)
const passed = failures.length === 0
const report = [
  '# Rendered site QA',
  '',
  `- Result: **${passed ? 'PASS' : 'FAIL'}**`,
  `- Base URL: ${baseUrl}`,
  `- Routes: ${routes.length}`,
  `- Viewport checks: ${results.length}`,
  `- Failures: ${failures.length}`,
  `- Warnings: ${warnings.length}`,
  '- Reproduction: open the listed route directly at desktop 1207×953 or mobile 390×844; inspect rendered DOM after load. P1 marks explicit release blockers; other failures require triage. Third-party/caption warnings are not automatically playback failures.',
  '',
]

if (failures.length) {
  report.push('## Failures', '', '| Route | Viewport | Issues |', '| --- | --- | --- |')
  for (const failure of failures) {
    report.push(`| ${failure.route} | ${failure.viewport} | ${failure.issues.join('; ')} |`)
  }
  report.push('')
}

if (warnings.length) {
  report.push('## Warnings', '', '| Route | Viewport | Warnings |', '| --- | --- | --- |')
  for (const warning of warnings) {
    report.push(`| ${warning.route} | ${warning.viewport} | ${warning.warnings.join('; ')} |`)
  }
  report.push('')
}

if (passed) report.push('Every rendered route passed the structural, responsive, media, control, and project-presentation checks.', '')

writeFileSync(reportPath, `${report.join('\n')}\n`)
console.log(report.join('\n'))

if (!passed) process.exitCode = 1
