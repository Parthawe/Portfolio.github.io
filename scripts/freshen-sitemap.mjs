// Stamp the built sitemap, never the tracked public source, so ordinary builds
// do not leave date-only changes in the worktree.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sitemapPath = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : join(root, 'dist', 'sitemap.xml')

const today = new Date().toISOString().slice(0, 10)
const xml = readFileSync(sitemapPath, 'utf8')
const updated = xml.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`)

if (updated !== xml) {
  writeFileSync(sitemapPath, updated)
  console.log(`[sitemap] lastmod stamped ${today}`)
}
