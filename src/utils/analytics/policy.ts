import { projectRoutes } from '../../data/projectRoutes'

const projects = new Set(projectRoutes.map(project => `/${project.slug}`))
const collections = new Set(['work', 'ai', 'ux-design', 'ux-research', 'design-engineering', 'design-engineer', 'installations', 'brand', 'brand-visual', 'healthcare', 'fintech', 'design-for-good', 'crypto', 'ai-wearables'].map(path => `/${path}`))
const pages = new Set(['/', '/about', '/accessibility', '/playbook', '/book', '/graveyard', '/studio', '/motion', '/perplexity', '/physical-worlds'])

/** Never send unknown paths, query strings, hashes, or submitted values. */
export function publicPage(raw: string) {
  const path = raw.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  if ((path.endsWith('/world') && projects.has(path.slice(0, -6))) || path === '/shuffle/simulation') return { path, type: 'demo' }
  if (projects.has(path)) return { path, type: 'project' }
  if (collections.has(path)) return { path, type: 'collection' }
  if (pages.has(path)) return { path, type: path === '/' ? 'home' : 'page' }
  if (path.startsWith('/motion/')) return { path: '/motion', type: 'page' }
  return { path: '/404', type: 'not_found' }
}

export function safeReferrer(raw: string) {
  try {
    const url = new URL(raw)
    return ['https:', 'http:'].includes(url.protocol) ? url.origin : ''
  } catch { return '' }
}

export function eligibleHost(hostname: string, production: boolean, id: string) {
  return production && ['designwhich.works', 'www.designwhich.works'].includes(hostname) && /^G-[A-Z0-9]+$/.test(id)
}

export const eventNames = ['project_open', 'contact_click', 'resume_click', 'access_request_click', 'live_project_click', 'story_open', 'reading_depth', 'media_play', 'media_complete'] as const
export type AnalyticsEvent = typeof eventNames[number]
