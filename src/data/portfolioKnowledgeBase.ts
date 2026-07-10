import { categories } from './categories'
import { visibleProjects as projects } from './projects'

export const PORTFOLIO_SCOPE_REPLY =
  "I only answer questions about Parth Pawar, the projects, and the pages on this portfolio. Ask about a case study, a role fit, a tool, or ask me to show you a section."

const PAGE_TERMS = [
  'home',
  'homepage',
  'landing page',
  'hero',
  'work',
  'projects',
  'case study',
  'case studies',
  'index view',
  'arc view',
  'editorial view',
  'timeline view',
  'about',
  'portfolio',
  'website',
  'site',
  'section',
  'tour',
  'shortlist',
  'contact',
  'hire',
  'resume',
  'experience',
  'tools',
  'skills',
  'role fit',
]

const PROFILE_TERMS = [
  'parth',
  'parth pawar',
  'design engineer',
  'mentra',
  'zentipay',
  'transfi',
  'nyu',
  'itp',
  'san francisco',
  'head of ui ux',
  'head of ui/ux',
]

const FOLLOW_UP_PATTERNS = [
  /^(why|how|what|who|when|where|which|and|more|deeper|continue|next|result|outcome|impact|team|process|challenge|insight)\b/i,
  /^(tell me more|go deeper|keep going|what else)\b/i,
]

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9/&+\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const projectTerms = projects.flatMap(project => [
  project.slug,
  project.name,
  project.tag,
])

const categoryTerms = categories.flatMap(category => [
  category.slug,
  category.title,
  category.titleAccent,
  `${category.title} ${category.titleAccent}`,
])

const KNOWLEDGE_TERMS = Array.from(
  new Set(
    [...PAGE_TERMS, ...PROFILE_TERMS, ...projectTerms, ...categoryTerms]
      .map(normalize)
      .filter(term => term.length > 2)
  )
)

export function isPortfolioQuestion(
  message: string,
  options?: { route?: string; lastProject?: string }
): boolean {
  const query = normalize(message)
  if (!query) return true

  if ((options?.lastProject || (options?.route && options.route !== '/')) && FOLLOW_UP_PATTERNS.some(pattern => pattern.test(message))) {
    return true
  }

  if (PAGE_TERMS.some(term => query.includes(normalize(term)))) return true
  if (PROFILE_TERMS.some(term => query.includes(normalize(term)))) return true

  // Require 4+ char overlap to prevent false positives on short words
  return KNOWLEDGE_TERMS.some(term => query === term || (term.length >= 4 && query.includes(term)) || (query.length >= 4 && term.includes(query)))
}
