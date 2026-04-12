#!/usr/bin/env node

/**
 * Validates project registry integrity.
 * Run: node scripts/validate-registry.mjs
 */

import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const src = readFileSync(resolve(root, 'src/data/projects.ts'), 'utf-8')

// Extract project objects using regex (good enough for validation without TS compilation)
const validCategories = ['ux', 'ai', 'creative', 'install', 'brand', 'good']
const validTiers = ['s', 'a', 'b', 'c', 'd']

let errors = 0
let warnings = 0

// Extract slugs
const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1])
const categories = [...src.matchAll(/category:\s*'([^']+)'/g)].map(m => m[1])
const tiers = [...src.matchAll(/tier:\s*'([^']+)'/g)].map(m => m[1])
const images = [...src.matchAll(/image:\s*[`']([^`']+)[`']/g)].map(m => m[1])

// 1. Check unique slugs
const slugSet = new Set()
for (const slug of slugs) {
  if (slugSet.has(slug)) {
    console.error(`❌ Duplicate slug: "${slug}"`)
    errors++
  }
  slugSet.add(slug)
}

// 2. Check valid categories
for (const cat of categories) {
  if (!validCategories.includes(cat)) {
    console.error(`❌ Invalid category: "${cat}" (valid: ${validCategories.join(', ')})`)
    errors++
  }
}

// 3. Check valid tiers
for (const tier of tiers) {
  if (!validTiers.includes(tier)) {
    console.error(`❌ Invalid tier: "${tier}" (valid: ${validTiers.join(', ')})`)
    errors++
  }
}

// 4. Check featured projects have featuredOrder
const featuredMatches = [...src.matchAll(/slug:\s*'([^']+)'[\s\S]*?featured:\s*true/g)]
for (const m of featuredMatches) {
  const slug = m[1]
  // Find the block for this slug and check for featuredOrder
  const blockRegex = new RegExp(`slug:\\s*'${slug}'[\\s\\S]*?(?=slug:|$)`)
  const block = src.match(blockRegex)?.[0] || ''
  if (!block.includes('featuredOrder')) {
    console.error(`❌ Featured project "${slug}" missing featuredOrder`)
    errors++
  }
}

// 5. Check S-tier projects are featured
const sTierBlocks = [...src.matchAll(/slug:\s*'([^']+)'[\s\S]*?tier:\s*'s'/g)]
for (const m of sTierBlocks) {
  const slug = m[1]
  const blockRegex = new RegExp(`slug:\\s*'${slug}'[\\s\\S]*?(?=slug:|$)`)
  const block = src.match(blockRegex)?.[0] || ''
  if (!block.includes('featured: true')) {
    console.warn(`⚠️  S-tier project "${slug}" not marked as featured`)
    warnings++
  }
}

// 6. Check image file references exist
const resolvedImages = images.map(img => {
  // Resolve ${IMG} prefix
  return img.replace(/\$\{IMG\}/, '/Assets/images')
})

for (const img of resolvedImages) {
  // Skip template literal expressions we can't resolve statically
  if (img.includes('${') || img.includes('`')) continue
  const absPath = resolve(root, img.startsWith('/') ? img.slice(1) : img)
  if (!existsSync(absPath)) {
    console.warn(`⚠️  Image not found: ${img}`)
    warnings++
  }
}

// 7. Check page import paths reference existing files
const pageImports = [...src.matchAll(/import\(['"]([^'"]+)['"]\)/g)].map(m => m[1])
for (const imp of pageImports) {
  const absPath = resolve(root, 'src/data', imp + '.tsx')
  if (!existsSync(absPath)) {
    console.error(`❌ Page import not found: ${imp}.tsx`)
    errors++
  }
}

// Summary
console.log('')
console.log(`📊 Registry: ${slugs.length} projects, ${new Set(categories).size} categories, ${tiers.length} tiers assigned`)
console.log(`   Featured: ${featuredMatches.length} | S-tier: ${sTierBlocks.length}`)
console.log(`   Hidden: ${(src.match(/hidden:\s*true/g) || []).length}`)
console.log('')
if (errors === 0 && warnings === 0) {
  console.log('✅ All checks passed.')
} else {
  if (errors > 0) console.log(`❌ ${errors} error(s)`)
  if (warnings > 0) console.log(`⚠️  ${warnings} warning(s)`)
}

process.exit(errors > 0 ? 1 : 0)
