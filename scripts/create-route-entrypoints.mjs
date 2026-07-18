import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = process.argv[2] ? resolve(process.cwd(), process.argv[2]) : join(root, 'dist')
const indexPath = join(distDir, 'index.html')
const notFoundPath = join(distDir, '404.html')
const sitemapPath = join(root, 'public', 'sitemap.xml')
const siteBase = '/'

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html is missing. Run this script after vite build.')
}

const indexHtml = readFileSync(indexPath, 'utf8')
const siteOrigin = 'https://designwhich.works'
const defaultDescription = 'Portfolio of Parth Pawar, a Product Designer crafting trusted systems across AI wearables, fintech, civic tools, creative technology, and physical interaction.'
const routeLabels = new Map([
  ['work', 'Work'],
  ['about', 'About'],
  ['accessibility', 'Accessibility'],
  ['ux-design', 'UX Design'],
  ['creative-tech', 'Creative Technology'],
  ['installations', 'Installations'],
  ['brand-visual', 'Brand & Visual'],
  ['design-for-good', 'Design for Good'],
  ['fintech', 'Fintech'],
  ['crypto', 'Crypto & Payments'],
  ['ai-wearables', 'AI & Wearables'],
  ['playbook', 'Design Playbook'],
  ['motion', 'Motion Design'],
  ['motion/vishwa-conclave-motion', 'VishwaConclave — A Campaign System in Motion'],
  ['motion/mentra-motion-language', 'Mentra — Sell the Moment, Then the Hardware'],
  ['motion/transfi-identity-motion', 'TransFi — One Transaction, Made Legible'],
  ['motion/editing-motion-stories', 'Cutting Systems into Stories'],
  ['perplexity', 'Perplexity Creative Studio Motion Study'],
  ['healthapp', 'Health App Concept'],
  ['medimorpho', 'NYU Langone'],
  ['mentra-miniapps', 'Mentra MiniApps'],
  ['transfi-project', 'TransFi'],
  ['clawed-chat', 'Clawed'],
  ['executivelens', 'ExecutiveLens'],
  ['the-point-cdc', 'The Point CDC'],
  ['revolving-stage', 'Revolving Stage'],
  ['uv-light', 'UV Light'],
  ['cuetv', 'CueTV'],
  ['org-dashboard', 'Organization Dashboard'],
  ['raahi-project', 'Raahi'],
  ['ai-voice', 'AI Voice Selection'],
  ['ballah-code', 'Ballah Code'],
  ['office-of-diversity', 'Office of Diversity'],
  ['the-omakase', 'The Omakase'],
  ['atps', 'ATPS'],
  ['code-for-build', 'Code for Build'],
  ['making-of-time', 'Making of Time'],
  ['moniac-machine', 'MONIAC Machine'],
  ['dumb-waiter-set-design', 'The Dumb Waiter'],
  ['vj-software', 'VJ Software'],
  ['sea-of-salt', 'Sea of Salt'],
  ['mentra-brand', 'Mentra Brand'],
  ['dna-speculative', 'DNA Speculative Design'],
])
const routeDescriptions = new Map([
  ['work', 'Selected work by Parth Pawar across AI wearables, fintech, UX design, creative technology, installations, and brand systems.'],
  ['about', 'About Parth Pawar, Product Designer and Head of UI/UX at Mentra.'],
  ['accessibility', 'Accessibility notes and commitments for the portfolio of Parth Pawar.'],
  ['playbook', 'Principles, methods, and practical notes from Parth Pawar on designing trustworthy product systems.'],
  ['motion', 'Motion direction and animation systems by Parth Pawar across campaign, brand, product, and social storytelling.'],
  ['motion/vishwa-conclave-motion', 'Creative direction for VishwaConclave, connecting original theme films, speaker reveals, web, merchandise, and event programming into one campaign rhythm.'],
  ['motion/mentra-motion-language', 'An advertising-motion system for smart glasses that leads with lived moments, proves wearability, and closes on MentraOS using real Mentra campaign assets.'],
  ['motion/transfi-identity-motion', 'A product-motion system following one cross-border payment from currency choice to verified delivery through real TransFi interface states.'],
  ['motion/editing-motion-stories', 'A video-editing case study across Enigma, The Omakase, Making of Time, and Drowning, covering selects, structure, pacing, sound, motion graphics, and delivery.'],
  ['perplexity', 'An independent Creative Studio motion proposal for Perplexity Computer, Deep Research, and Comet—from product research and ideation to a working launch prototype and reusable After Effects system.'],
  ['healthapp', 'A healthcare product design concept by Parth Pawar focused on making complex information easier to understand and act on.'],
  ['medimorpho', 'An independent NYU healthcare service concept shaped by 20 primary-research interviews, designed to make meaning and next steps clearer across a care encounter.'],
  ['ux-design', 'UX design work by Parth Pawar across product systems, flows, interfaces, and service experiences.'],
  ['creative-tech', 'Creative technology work by Parth Pawar spanning code, prototypes, physical computing, and interactive systems.'],
  ['installations', 'Installations and physical interaction work by Parth Pawar.'],
  ['brand-visual', 'Brand and visual design work by Parth Pawar across identity, systems, and communication.'],
  ['design-for-good', 'Civic, education, accessibility, and design-for-good work by Parth Pawar.'],
  ['fintech', 'Fintech product design work by Parth Pawar focused on clarity, trust, and complex flows.'],
  ['crypto', 'Crypto and payments product design work by Parth Pawar.'],
  ['ai-wearables', 'AI and wearable product design work by Parth Pawar across smart glasses, voice, and ambient interfaces.'],
  ['mentra', 'The product system that made AI glasses useful after unboxing, spanning wearable OS, mobile companion app, and launch experience.'],
  ['mentra-miniapps', 'A glance-first MiniApp ecosystem that made apps discoverable and usable on AI smart glasses.'],
  ['transfi-project', 'A product and trust-system redesign that made cross-border crypto payment infrastructure easier for merchant teams to understand and operate.'],
  ['raahi-project', 'A map-first civic mobility concept that made residential parking choices spatial, legible, and easier to trust.'],
  ['executivelens', 'An AI analytics workspace that turns meeting signals into visible, reviewable executive actions.'],
  ['black-hole', 'A physical and interactive exploration of black hole phenomena through time, gravity, and light.'],
  ['dumb-waiter-set-design', 'A John Wick-inspired set design for Harold Pinter\'s The Dumb Waiter, built around confinement, waiting, and rising tension.'],
  ['page-not-found', 'The requested page is not available in the public portfolio.'],
])
const routeSocialPreviews = new Map([
  ['medimorpho', {
    image: '/Assets/Projects/MediMorpho/nyu-langone-building.png',
    alt: 'NYU Langone Health building, the setting for an independent multilingual healthcare concept by Parth Pawar.',
  }],
  ['motion', {
    image: '/Assets/images/og-motion/vishwa.jpg',
    alt: 'VishwaConclave campaign artwork from the motion design portfolio of Parth Pawar.',
  }],
  ['motion/vishwa-conclave-motion', {
    image: '/Assets/images/og-motion/vishwa.jpg',
    alt: 'VishwaConclave campaign artwork showing the EPOCH identity and 2021 event system.',
  }],
  ['motion/mentra-motion-language', {
    image: '/Assets/images/og-motion/mentra.jpg',
    alt: 'Black and transparent Mentra smart glasses presented as a motion-design product study.',
  }],
  ['motion/transfi-identity-motion', {
    image: '/Assets/images/og-motion/transfi.jpg',
    alt: 'TransFi interface and identity frames from a cross-border payment motion study.',
  }],
  ['motion/editing-motion-stories', {
    image: '/Assets/images/og-motion/editing.jpg',
    alt: 'A monochrome Enigma installation frame from the editorial motion case study.',
  }],
])
const canonicalAliases = new Map([
  ['ux', 'ux-design'],
  ['ui', 'ux-design'],
  ['design-engineer', 'creative-tech'],
  ['brand', 'brand-visual'],
  ['healthcare', 'design-for-good'],
])

const titleCase = (route) => route
  .split('/')
  .at(-1)
  .split('-')
  .map((word) => word.length <= 2 ? word.toUpperCase() : `${word[0].toUpperCase()}${word.slice(1)}`)
  .join(' ')

const replaceMeta = (html, attribute, key, value) => {
  const escaped = value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/>`)
  return html.replace(pattern, `<meta ${attribute}="${key}" content="${escaped}" />`)
}

function withRouteMeta(html, route, { noindex = false } = {}) {
  const canonicalRoute = canonicalAliases.get(route) || route
  const label = routeLabels.get(canonicalRoute) || titleCase(canonicalRoute)
  const title = `${label} · Parth Pawar`
  const description = routeDescriptions.get(canonicalRoute) || `${label}, a product design case study by Parth Pawar.`
  const url = canonicalRoute ? `${siteOrigin}/${canonicalRoute}` : `${siteOrigin}/`
  let output = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
  output = replaceMeta(output, 'name', 'description', description)
  output = replaceMeta(output, 'property', 'og:title', title)
  output = replaceMeta(output, 'property', 'og:description', description)
  output = replaceMeta(output, 'property', 'og:url', url)
  output = replaceMeta(output, 'name', 'twitter:title', title)
  output = replaceMeta(output, 'name', 'twitter:description', description)
  const socialPreview = routeSocialPreviews.get(canonicalRoute)
  if (socialPreview) {
    const imageUrl = `${siteOrigin}${socialPreview.image}`
    output = replaceMeta(output, 'property', 'og:image', imageUrl)
    output = replaceMeta(output, 'property', 'og:image:alt', socialPreview.alt)
    output = replaceMeta(output, 'name', 'twitter:image', imageUrl)
    output = replaceMeta(output, 'name', 'twitter:image:alt', socialPreview.alt)
  }
  if (noindex) {
    output = output.replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>')
  }
  return output
}

writeFileSync(
  notFoundPath,
  withRouteMeta(indexHtml, 'page-not-found', { noindex: true })
    .replace(/<title>[^<]*<\/title>/, '<title>Page not found · Parth Pawar</title>'),
)

const sitemap = readFileSync(sitemapPath, 'utf8')
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => {
    try {
      return new URL(match[1]).pathname.replace(/^\/+|\/+$/g, '')
    } catch {
      return ''
    }
  })
  .filter(Boolean)

let written = 0
for (const route of routes) {
  if (route.includes('..')) continue
  const routeDir = join(distDir, route)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), withRouteMeta(indexHtml, route))
  written += 1
}

// Keep retired case-study URLs loadable so the client-side route can redirect them.
for (const route of ['motion/clawed-agent-story']) {
  const routeDir = join(distDir, route)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), withRouteMeta(indexHtml, 'motion/vishwa-conclave-motion', { noindex: true }))
  written += 1
}

console.log(`[routes] wrote ${written} static route entrypoints under ${siteBase}`)
