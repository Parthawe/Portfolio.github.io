#!/usr/bin/env node
/**
 * Asset budget check — run after `bun run build`.
 * Fails if dist exceeds the budget or any single asset is too large.
 */
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const DIST_BUDGET_MB = 900       // total dist budget
const SINGLE_ASSET_MB = 20       // max size for any single file
const WARN_ASSET_MB = 5          // warn above this

let totalBytes = 0
const violations = []
const warnings = []

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) { walk(full); continue }
    const size = statSync(full).size
    totalBytes += size
    const mb = size / 1024 / 1024
    if (mb > SINGLE_ASSET_MB) violations.push({ file: full, mb: mb.toFixed(1) })
    else if (mb > WARN_ASSET_MB) warnings.push({ file: full, mb: mb.toFixed(1) })
  }
}

const distDir = join(process.cwd(), 'dist')
try { walk(distDir) } catch { console.error('Run `bun run build` first.'); process.exit(1) }

const totalMB = (totalBytes / 1024 / 1024).toFixed(1)
console.log(`\n📦 dist size: ${totalMB} MB (budget: ${DIST_BUDGET_MB} MB)\n`)

if (warnings.length) {
  console.log(`⚠️  ${warnings.length} file(s) over ${WARN_ASSET_MB} MB:`)
  warnings.forEach(w => console.log(`   ${w.mb} MB  ${w.file.replace(distDir + '/', '')}`))
  console.log()
}

if (violations.length) {
  console.log(`🚨 ${violations.length} file(s) over ${SINGLE_ASSET_MB} MB:`)
  violations.forEach(v => console.log(`   ${v.mb} MB  ${v.file.replace(distDir + '/', '')}`))
  console.log()
}

if (totalBytes / 1024 / 1024 > DIST_BUDGET_MB) {
  console.error(`❌ OVER BUDGET: ${totalMB} MB > ${DIST_BUDGET_MB} MB`)
  process.exit(1)
}

if (violations.length) {
  console.error(`❌ ${violations.length} file(s) exceed ${SINGLE_ASSET_MB} MB individual limit`)
  process.exit(1)
}

console.log('✅ Asset budget passed\n')
