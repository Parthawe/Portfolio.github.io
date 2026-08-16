import { readFileSync, writeFileSync } from 'node:fs'

const sitemapPath = process.env.QA_SITEMAP_PATH || 'public/sitemap.xml'
const reportPath = process.env.QA_REPORT_PATH || 'qa-report.md'
const concurrency = Number(process.env.QA_CONCURRENCY || 8)
const sitemap = readFileSync(sitemapPath, 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])

if (!urls.length) {
  throw new Error(`No URLs found in ${sitemapPath}`)
}

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function fetchWithRetry(url, attempts = 3) {
  let lastError

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20_000)

    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'designwhich-weekly-qa/1.0' },
        redirect: 'follow',
        signal: controller.signal,
      })
      clearTimeout(timeout)
      if (response.status >= 500 && attempt < attempts) {
        await sleep(attempt * 750)
        continue
      }
      return response
    } catch (error) {
      clearTimeout(timeout)
      lastError = error
      if (attempt < attempts) await sleep(attempt * 750)
    }
  }

  throw lastError
}

async function checkPage(url) {
  try {
    const response = await fetchWithRetry(url)
    const html = await response.text()
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || ''
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"\s*\/>/i)?.[1] || ''
    const issues = []

    if (!response.ok) issues.push(`HTTP ${response.status}`)
    if (!/<!doctype html>/i.test(html)) issues.push('HTML shell missing')
    if (!title) issues.push('Title missing')
    if (/page not found|404/i.test(title)) issues.push(`Unexpected title: ${title}`)
    if (!canonical) issues.push('Canonical URL missing')

    const assets = [...html.matchAll(/(?:src|href)="(\/bundle\/[^"]+)"/g)]
      .map((match) => new URL(match[1], url).href)

    return { url, status: response.status, title, canonical, assets, issues }
  } catch (error) {
    return { url, status: 0, title: '', canonical: '', assets: [], issues: [error.message] }
  }
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

const startedAt = new Date()
const pages = await mapWithConcurrency(urls, concurrency, checkPage)
const assetUrls = [...new Set(pages.flatMap((page) => page.assets))]
const assets = await mapWithConcurrency(assetUrls, concurrency, async (url) => {
  try {
    const response = await fetchWithRetry(url)
    return { url, status: response.status, ok: response.ok }
  } catch (error) {
    return { url, status: 0, ok: false, error: error.message }
  }
})

const pageFailures = pages.filter((page) => page.issues.length)
const assetFailures = assets.filter((asset) => !asset.ok)
const passed = pageFailures.length === 0 && assetFailures.length === 0
const report = [
  '# Weekly production QA',
  '',
  `- Result: **${passed ? 'PASS' : 'FAIL'}**`,
  `- Checked: ${startedAt.toISOString()}`,
  `- Public routes: ${pages.length}`,
  `- Bundle assets: ${assets.length}`,
  `- Route failures: ${pageFailures.length}`,
  `- Asset failures: ${assetFailures.length}`,
  '',
]

if (pageFailures.length) {
  report.push('## Route failures', '', '| URL | Status | Issues |', '| --- | ---: | --- |')
  for (const page of pageFailures) {
    report.push(`| ${page.url} | ${page.status || 'error'} | ${page.issues.join('; ')} |`)
  }
  report.push('')
}

if (assetFailures.length) {
  report.push('## Asset failures', '', '| URL | Status |', '| --- | ---: |')
  for (const asset of assetFailures) {
    report.push(`| ${asset.url} | ${asset.status || asset.error || 'error'} |`)
  }
  report.push('')
}

if (passed) {
  report.push('All sitemap routes returned valid HTML with titles and canonical URLs. All referenced production bundle assets responded successfully.', '')
}

writeFileSync(reportPath, `${report.join('\n')}\n`)
console.log(report.join('\n'))

if (!passed) process.exitCode = 1
