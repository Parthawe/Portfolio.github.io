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

const validCategories = ['ux', 'research', 'ai', 'creative', 'install', 'brand', 'good']
const validTiers = ['s', 'a', 'b', 'c', 'd']
// Clawed remains S-tier proof but is intentionally omitted from the homepage
// feature set while that surface stays frozen.
const featuredExceptions = new Set(['clawed-chat'])

let errors = 0
let warnings = 0

// Parse project blocks more reliably by splitting on slug declarations
const projectBlocks = src.split(/(?=slug:\s*')/).filter(b => b.includes("slug: '"))

const slugs = []
const allCategories = []

for (const block of projectBlocks) {
  const slug = block.match(/slug:\s*'([^']+)'/)?.[1]
  if (!slug) continue
  slugs.push(slug)

  const category = block.match(/category:\s*'([^']+)'/)?.[1]
  if (category) allCategories.push(category)

  const tier = block.match(/tier:\s*'([^']+)'/)?.[1]
  const isFeatured = /featured:\s*true/.test(block)
  const hasFeaturedOrder = /featuredOrder:/.test(block)
  const isHidden = /hidden:\s*true/.test(block)

  // Validate category
  if (category && !validCategories.includes(category)) {
    console.error(`❌ "${slug}" has invalid category: "${category}"`)
    errors++
  }

  // Validate tier
  if (tier && !validTiers.includes(tier)) {
    console.error(`❌ "${slug}" has invalid tier: "${tier}"`)
    errors++
  }

  // Featured must have order
  if (isFeatured && !hasFeaturedOrder) {
    console.error(`❌ "${slug}" is featured but missing featuredOrder`)
    errors++
  }

  // S-tier should be featured
  if (tier === 's' && !isFeatured && !featuredExceptions.has(slug)) {
    console.warn(`⚠️  "${slug}" is S-tier but not featured`)
    warnings++
  }

  // Check image reference
  const imageMatch = block.match(/image:\s*[`']([^`']+)[`']/)
  if (imageMatch) {
    let imgPath = imageMatch[1]
    // Resolve ${IMG} template literal
    if (imgPath.includes('${IMG}')) {
      imgPath = imgPath.replace('${IMG}', '/Assets/images')
    }
    if (!imgPath.includes('${')) {
      const publicPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath
      const absPath = resolve(root, 'public', publicPath)
      if (!existsSync(absPath)) {
        // Only warn for non-hidden projects — hidden ones may have assets not in working tree
        if (!isHidden) {
          console.warn(`⚠️  "${slug}" image not found: ${imgPath}`)
          warnings++
        }
      }
    }
  }

  // Check page import
  const pageImport = block.match(/import\(['"]([^'"]+)['"]\)/)
  if (pageImport) {
    const absPath = resolve(root, 'src/data', pageImport[1] + '.tsx')
    if (!existsSync(absPath)) {
      console.error(`❌ "${slug}" page import not found: ${pageImport[1]}.tsx`)
      errors++
    }
  }
}

// Check unique slugs
const slugSet = new Set()
for (const slug of slugs) {
  if (slugSet.has(slug)) {
    console.error(`❌ Duplicate slug: "${slug}"`)
    errors++
  }
  slugSet.add(slug)
}

// Count stats
const visibleCount = projectBlocks.filter(b => !/hidden:\s*true/.test(b) && b.includes("slug: '")).length
const hiddenCount = projectBlocks.filter(b => /hidden:\s*true/.test(b)).length
const featuredCount = projectBlocks.filter(b => /featured:\s*true/.test(b)).length
const sTierCount = projectBlocks.filter(b => /tier:\s*'s'/.test(b)).length

console.log('')
console.log(`📊 Registry: ${slugs.length} total | ${visibleCount} visible | ${hiddenCount} hidden`)
console.log(`   Featured: ${featuredCount} | S-tier: ${sTierCount} | Categories: ${new Set(allCategories).size}`)
console.log('')
if (errors === 0 && warnings === 0) {
  console.log('✅ All checks passed.')
} else {
  if (errors > 0) console.log(`❌ ${errors} error(s)`)
  if (warnings > 0) console.log(`⚠️  ${warnings} warning(s)`)
}

process.exit(errors > 0 ? 1 : 0)
