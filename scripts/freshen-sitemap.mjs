// Stamps every <lastmod> in public/sitemap.xml with the build date so the
// sitemap never goes stale. Runs as part of `bun run build`.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sitemapPath = join(root, 'public', 'sitemap.xml')

const today = new Date().toISOString().slice(0, 10)
const xml = readFileSync(sitemapPath, 'utf8')
const updated = xml.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`)

if (updated !== xml) {
  writeFileSync(sitemapPath, updated)
  console.log(`[sitemap] lastmod stamped ${today}`)
}
