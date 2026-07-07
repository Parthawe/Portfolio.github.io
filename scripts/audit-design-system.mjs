import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const ROOTS = ['src/pages', 'src/components', 'src/styles']
const PROJECT_PAGES_DIR = 'src/pages/projects'
const INLINE_STYLE_WARN_THRESHOLD = 12
const CSS_LINE_WARN_THRESHOLD = 1000

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await walk(path))
      continue
    }
    if (/\.(tsx|ts|css)$/.test(entry.name)) files.push(path)
  }

  return files
}

async function readText(path) {
  return readFile(path, 'utf8')
}

function count(text, pattern) {
  return (text.match(pattern) || []).length
}

function formatRows(rows, columns) {
  if (!rows.length) return '  none'
  const widths = columns.map((column) => Math.max(column.length, ...rows.map((row) => String(row[column] ?? '').length)))
  const header = columns.map((column, index) => String(column).padEnd(widths[index])).join('  ')
  const divider = widths.map((width) => '-'.repeat(width)).join('  ')
  const body = rows.map((row) => columns.map((column, index) => String(row[column] ?? '').padEnd(widths[index])).join('  ')).join('\n')
  return `${header}\n${divider}\n${body}`
}

const allFiles = (await Promise.all(ROOTS.map(walk))).flat()
const projectPages = (await readdir(PROJECT_PAGES_DIR))
  .filter((file) => file.endsWith('.tsx'))
  .map((file) => join(PROJECT_PAGES_DIR, file))

const fileStats = []
for (const file of allFiles) {
  const text = await readText(file)
  fileStats.push({
    file,
    lines: text.split('\n').length,
    inlineStyles: count(text, /style=\{/g),
    hexColors: count(text, /#[0-9a-fA-F]{3,8}\b/g),
    rgbaColors: count(text, /rgba?\(/g),
    important: count(text, /!important/g),
    fontDeclarations: count(text, /fontFamily|font-family/g),
  })
}

const shellIssues = []
const duplicateThanks = []
const inlineHotspots = []

for (const file of projectPages) {
  const text = await readText(file)
  const shell = {
    projectHeader: /<ProjectHeader\b/.test(text),
    bottomNav: /<BottomNav\b/.test(text),
    nextProject: /<NextProject\b/.test(text),
    footer: /<Footer\b/.test(text),
  }
  const missing = Object.entries(shell)
    .filter(([, present]) => !present)
    .map(([name]) => name)

  if (missing.length) {
    shellIssues.push({ file, missing: missing.join(', ') })
  }

  if (text.includes('cs-thanks-title') && text.includes('<CsThanks')) {
    duplicateThanks.push({ file, issue: 'custom cs-thanks plus CsThanks' })
  }

  const inlineStyles = count(text, /style=\{/g)
  if (inlineStyles > INLINE_STYLE_WARN_THRESHOLD) {
    inlineHotspots.push({ file, inlineStyles })
  }
}

const largeCss = fileStats
  .filter((stat) => stat.file.endsWith('.css') && stat.lines > CSS_LINE_WARN_THRESHOLD)
  .sort((a, b) => b.lines - a.lines)
  .map(({ file, lines }) => ({ file, lines }))

const rawColorHotspots = fileStats
  .filter((stat) => stat.hexColors > 15 || stat.rgbaColors > 25)
  .sort((a, b) => (b.hexColors + b.rgbaColors) - (a.hexColors + a.rgbaColors))
  .slice(0, 12)
  .map(({ file, hexColors, rgbaColors }) => ({ file, hexColors, rgbaColors }))

const importantHotspots = fileStats
  .filter((stat) => stat.important > 0)
  .sort((a, b) => b.important - a.important)
  .map(({ file, important }) => ({ file, important }))

const fontHotspots = fileStats
  .filter((stat) => stat.fontDeclarations > 10)
  .sort((a, b) => b.fontDeclarations - a.fontDeclarations)
  .slice(0, 12)
  .map(({ file, fontDeclarations }) => ({ file, fontDeclarations }))

const errors = shellIssues.length + duplicateThanks.length

console.log('\nDesign System Audit')
console.log('===================')

console.log('\nProject shell issues')
console.log(formatRows(shellIssues, ['file', 'missing']))

console.log('\nDuplicate thanks sections')
console.log(formatRows(duplicateThanks, ['file', 'issue']))

console.log(`\nInline style hotspots (> ${INLINE_STYLE_WARN_THRESHOLD})`)
console.log(formatRows(inlineHotspots.sort((a, b) => b.inlineStyles - a.inlineStyles), ['file', 'inlineStyles']))

console.log(`\nLarge CSS islands (> ${CSS_LINE_WARN_THRESHOLD} lines)`)
console.log(formatRows(largeCss, ['file', 'lines']))

console.log('\nRaw color hotspots')
console.log(formatRows(rawColorHotspots, ['file', 'hexColors', 'rgbaColors']))

console.log('\nFont declaration hotspots')
console.log(formatRows(fontHotspots, ['file', 'fontDeclarations']))

console.log('\n!important usage')
console.log(formatRows(importantHotspots, ['file', 'important']))

if (errors) {
  console.error(`\nDesign system audit failed with ${errors} blocking issue(s).`)
  process.exitCode = 1
} else {
  console.log('\nDesign system audit passed blocking checks. Warnings above are refactor targets.')
}

