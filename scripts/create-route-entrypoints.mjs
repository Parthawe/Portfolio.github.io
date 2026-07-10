import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = process.argv[2] ? resolve(process.cwd(), process.argv[2]) : join(root, 'dist')
const indexPath = join(distDir, 'index.html')
const notFoundPath = join(distDir, '404.html')
const sitemapPath = join(root, 'public', 'sitemap.xml')
const siteBase = '/Portfolio.github.io/'

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html is missing. Run this script after vite build.')
}

copyFileSync(indexPath, notFoundPath)

const sitemap = readFileSync(sitemapPath, 'utf8')
const routes = [...sitemap.matchAll(/<loc>https:\/\/parthawe\.github\.io\/Portfolio\.github\.io\/([^<]*)<\/loc>/g)]
  .map((match) => decodeURI(match[1]).replace(/^\/+|\/+$/g, ''))
  .filter(Boolean)

let written = 0
for (const route of routes) {
  if (route.includes('..')) continue
  const routeDir = join(distDir, route)
  mkdirSync(routeDir, { recursive: true })
  copyFileSync(indexPath, join(routeDir, 'index.html'))
  written += 1
}

console.log(`[routes] wrote ${written} static route entrypoints under ${siteBase}`)
