import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const sitemapPath = join(distDir, 'sitemap.xml')

assert.ok(existsSync(sitemapPath), 'dist/sitemap.xml is missing; run the production build first')
const sitemap = readFileSync(sitemapPath, 'utf8')
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(match => new URL(match[1]).pathname.replace(/^\/+|\/+$/g, ''))
  .filter(Boolean)

assert.ok(routes.length > 0, 'built sitemap has no routes')

for (const route of routes) {
  const entrypoint = join(distDir, route, 'index.html')
  assert.ok(existsSync(entrypoint), `missing static entrypoint for /${route}`)

  const html = readFileSync(entrypoint, 'utf8')
  assert.match(html, /<link rel="canonical" href="https:\/\/designwhich\.works\/[^"]+"\s*\/>/)
  assert.doesNotMatch(html, /<link rel="canonical" href="[^"]+\/"\s*\/>/)
  assert.doesNotMatch(html, /<meta name="robots" content="noindex, nofollow"\s*\/>/)
}

console.log(`Static route contract passed for ${routes.length} sitemap routes`)
