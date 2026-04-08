import { categories } from '../data/categories'
import { PORTFOLIO_SCOPE_REPLY, isPortfolioQuestion } from '../data/portfolioKnowledgeBase'
import { CATEGORY_LABELS, projects, type Project, type ProjectCategory } from '../data/projects'
import {
  createContext,
  getDynamicChips,
  getProjectNarrative,
  getResponse,
  getRouteGreeting,
  type ChatContext,
} from '../data/agentKnowledge'
import { normalizeCopy, normalizeCopyList } from '../utils/normalizeCopy'

export interface ChatHistory {
  route: string
  ctx: ChatContext
}

export interface TourStep {
  text: string
  scrollTo?: string
  delay: number
}

export interface ResponseAction {
  type: 'scroll' | 'navigate' | 'filter' | 'none'
  slug?: string
  label?: string
  image?: string
  element?: HTMLElement | null
  filterKey?: 'all' | ProjectCategory
  selectors?: string[]
  explanation?: string
}

const CATEGORY_ALIASES: Record<string, string[]> = {
  ai: ['ai', 'ai wearables', 'ai and wearables', 'machine learning'],
  'ux-design': ['ux', 'ux design', 'product design'],
  'creative-tech': ['creative tech', 'creative technology', 'creative'],
  installations: ['installations', 'installation', 'physical work'],
  'brand-visual': ['brand', 'brand visual', 'visual design'],
  fintech: ['fintech', 'payments', 'crypto payments', 'web3'],
  crypto: ['crypto', 'web3', 'blockchain'],
  'ai-wearables': ['wearables', 'ai wearables', 'smart glasses'],
  'design-for-good': ['design for good', 'good', 'civic', 'community'],
}

const PROJECT_ALIASES: Record<string, string[]> = {
  mentra: ['mentra', 'smart glasses'],
  'transfi-project': ['transfi', 'trans fi'],
  zentipay: ['zentipay', 'zenti pay'],
  'clawed-chat': ['clawed', 'clawed chat'],
  executivelens: ['executivelens', 'executive lens'],
  'raahi-project': ['raahi'],
  'ballah-code': ['ballah', 'ballah code'],
  'oncall-lens': ['oncall', 'oncall lens'],
  jugalbandi: ['jugalbandi'],
  enigma: ['enigma'],
  tedx: ['tedx', 'tedxvitpune'],
  'keyboard-project': ['breakgen', 'keyboard project', 'keyboard'],
  'ai-voice': ['ai voice', 'voice ai'],
  cuetv: ['cuetv', 'cue tv'],
  'org-dashboard': ['org dashboard', 'organization dashboard'],
}

const STARTER_CHIPS: Record<string, string[]> = {
  '/': ['Tour this page', 'Open Mentra', 'Start with three projects', 'Best research process'],
  '/work': ['Tour this page', 'Show AI work', 'Start with three projects', 'Best research process'],
  '/about': ['Tour this page', 'Role fit', 'Tell me about Mentra', 'Contact'],
}

interface FocusTopic {
  patterns: RegExp[]
  selectors: string[]
  label: string
  explanation: string
}

const WORK_FILTER_ALIASES: Record<'all' | ProjectCategory, string[]> = {
  all: ['all', 'all work', 'all projects', 'everything', 'full archive'],
  ux: ['ux', 'ux design', 'product design', 'ux work'],
  ai: ['ai', 'ai work', 'wearables', 'ai wearables', 'smart glasses'],
  creative: ['creative', 'creative tech', 'creative technology', 'creative work'],
  install: ['installations', 'installation', 'physical work', 'sculpture', 'physical computing'],
  brand: ['brand', 'visual', 'brand visual', 'visual design', 'branding'],
  good: ['design for good', 'good', 'social impact', 'civic', 'community'],
}

const GENERIC_PROJECT_FOCUS: FocusTopic[] = [
  {
    patterns: [/\b(challenge|problem|constraint|background|context)\b/i],
    selectors: ['#cs-problem', '#cs-hook', '#cs-context', '#cs-background', '#cs-bet', '#cs-challenge', '#cs-challenges'],
    label: 'Challenge',
    explanation: 'This section frames the real constraint behind the work. Start here before looking at polished screens.',
  },
  {
    patterns: [/\b(process|approach|research|system|how did|how was|design decisions|solution)\b/i],
    selectors: ['#cs-research', '#cs-process', '#cs-decisions', '#cs-system', '#cs-design', '#cs-product', '#cs-architecture'],
    label: 'Process',
    explanation: 'This is where the thinking becomes visible. The process section is usually where the senior-level decisions show up.',
  },
  {
    patterns: [/\b(results|result|impact|outcome|metrics|numbers|launched|launch)\b/i],
    selectors: ['#cs-results', '#cs-impact', '#cs-learnings', '#cs-reflections'],
    label: 'Impact',
    explanation: 'This section shows whether the work actually moved something, metrics, adoption, or the learning that carried forward.',
  },
  {
    patterns: [/\b(team|role|timeline|duration|who worked|who built)\b/i],
    selectors: ['#cs-vision', '#cs-timeline', '.project-header', '.project-overview'],
    label: 'Role and Timeline',
    explanation: 'This is the best place to read what Parth owned, who else was involved, and how the work unfolded over time.',
  },
]

const PROJECT_SPECIFIC_FOCUS: Record<string, FocusTopic[]> = {
  mentra: [
    {
      patterns: [/\b(app store|miniapp|store|developer|sdk|ecosystem)\b/i],
      selectors: ['#cs-store'],
      label: 'MiniApp Store',
      explanation: 'This is the app store and ecosystem layer. It is the section that turns Mentra from a device into a platform.',
    },
    {
      patterns: [/\b(os|operating system|hud|notification|notifications|voice first)\b/i],
      selectors: ['#cs-os'],
      label: 'MentraOS',
      explanation: 'This is the MentraOS section. It covers the glance-first HUD, the voice-first model, and the notification system designed for the real world.',
    },
    {
      patterns: [/\b(companion app|pairing|onboarding|phone app)\b/i],
      selectors: ['#cs-companion'],
      label: 'Companion App',
      explanation: 'This section shows how the phone app carries the heavy setup and configuration work so the glasses stay lightweight and glanceable.',
    },
  ],
  zentipay: [
    {
      patterns: [/\b(fee|fees|fee anxiety|estimator|transparency|pricing)\b/i],
      selectors: ['#cs-research', '#cs-decisions', '#cs-results'],
      label: 'Fee Transparency',
      explanation: 'This is the fee-transparency thread. It shows how the research insight about trust turned into the core product decision.',
    },
    {
      patterns: [/\b(onboarding|adaptive onboarding|signup|kyc)\b/i],
      selectors: ['#cs-decisions', '#cs-system'],
      label: 'Onboarding System',
      explanation: 'This section covers the onboarding redesign and the system work that made the product adapt across countries and user needs.',
    },
  ],
  'transfi-project': [
    {
      patterns: [/\b(compliance|kyc|jurisdiction|regulation|regulated|markets)\b/i],
      selectors: ['#cs-research', '#cs-process', '#cs-product'],
      label: 'Compliance and Product Flow',
      explanation: 'This is the compliance and product-flow layer. It shows how a regulated crypto product was made usable without flattening market differences.',
    },
    {
      patterns: [/\b(onboarding|merchant onboarding|enterprise onboarding|go to market|gtm)\b/i],
      selectors: ['#cs-screens', '#cs-gtm', '#cs-results'],
      label: 'Onboarding and Go To Market',
      explanation: 'This section shows how the enterprise onboarding flow and the go to market work were treated as one conversion problem.',
    },
  ],
  'clawed-chat': [
    {
      patterns: [/\b(receipt|receipts|ledger|audit trail|accountability)\b/i],
      selectors: ['#cs-safety'],
      label: 'Receipt Ledger',
      explanation: 'This is the safety architecture section. It explains why receipts are the trust mechanism, not just a logging feature.',
    },
    {
      patterns: [/\b(trust|safety|approval|approve|autonomy|assisted|draft first|read only)\b/i],
      selectors: ['#cs-safety', '#cs-context'],
      label: 'Safety Modes',
      explanation: 'This section shows the three-tier trust model. The product is built around progressive autonomy rather than blind execution.',
    },
    {
      patterns: [/\b(glasses|glasses experience|web hub|dashboard|inbox)\b/i],
      selectors: ['#cs-webhub', '#cs-glasses'],
      label: 'Web Hub and Glasses',
      explanation: 'These sections show how the same assistant shifts between a full web hub and a glanceable glasses interface without feeling like two products.',
    },
  ],
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s/-]/g, ' ').replace(/\s+/g, ' ').trim()
}

function getProjectSearchTerms(project: Project): string[] {
  const aliasTerms = PROJECT_ALIASES[project.slug] || []
  return [
    project.slug,
    project.name,
    project.tag,
    ...aliasTerms,
  ].map(normalize)
}

function findProject(query: string): Project | undefined {
  const q = normalize(query)
  if (!q) return undefined

  for (const project of projects) {
    const terms = getProjectSearchTerms(project)
    if (terms.some(term => term === q || q.includes(term) || term.includes(q))) return project
  }

  return undefined
}

function findCategory(query: string): (typeof categories)[number] | undefined {
  const q = normalize(query)
  if (!q) return undefined

  return categories.find(category => {
    const terms = [category.slug, `${category.title} ${category.titleAccent}`, ...(CATEGORY_ALIASES[category.slug] || [])]
      .map(normalize)
    return terms.some(term => term === q || q.includes(term) || term.includes(q))
  })
}

function findWorkFilter(query: string): { key: 'all' | ProjectCategory; label: string } | undefined {
  const q = normalize(query)
  if (!q) return undefined

  for (const [key, aliases] of Object.entries(WORK_FILTER_ALIASES) as Array<['all' | ProjectCategory, string[]]>) {
    if (!aliases.some(alias => {
      const term = normalize(alias)
      return term === q || q.includes(term) || term.includes(q)
    })) continue

    return {
      key,
      label: key === 'all' ? 'All Projects' : CATEGORY_LABELS[key],
    }
  }

  return undefined
}

function getCardElement(slug: string): HTMLElement | null {
  const link = document.querySelector(`a[href="/${slug}"]`) as HTMLElement | null
  return (link?.closest('.pcard') as HTMLElement | null) || link
}

function getSectionElement(selectors: string[]): HTMLElement | null {
  for (const selector of selectors) {
    const el = document.querySelector(selector) as HTMLElement | null
    if (el) return el
  }
  return null
}

function getExplainedSectionAction(label: string, selectors: string[], explanation: string): ResponseAction {
  const element = getSectionElement(selectors)
  return { type: 'scroll', label, element, selectors, explanation }
}

function syncRoute(history: ChatHistory) {
  if (history.ctx.route !== history.route) {
    history.ctx.route = history.route
  }
}

function getProjectFocus(project: Project, query: string): FocusTopic | undefined {
  const q = normalize(query)
  const specific = (PROJECT_SPECIFIC_FOCUS[project.slug] || []).find(topic =>
    topic.patterns.some(pattern => pattern.test(q))
  )

  if (specific) return specific

  return GENERIC_PROJECT_FOCUS.find(topic => topic.patterns.some(pattern => pattern.test(q)))
}

export function createChatHistory(route: string): ChatHistory {
  return { route, ctx: createContext(route) }
}

export async function sendMessage(
  userMessage: string,
  history: ChatHistory,
  onChunk?: (text: string) => void,
): Promise<string> {
  syncRoute(history)
  if (!isPortfolioQuestion(userMessage, { route: history.route, lastProject: history.ctx.lastProject })) {
    const scoped = normalizeCopy(PORTFOLIO_SCOPE_REPLY)
    onChunk?.(scoped)
    return scoped
  }
  const { text } = getResponse(userMessage, history.ctx)
  await new Promise(resolve => setTimeout(resolve, 0))
  const normalized = normalizeCopy(text)
  onChunk?.(normalized)
  return normalized
}

export function getChips(route: string, questionCount: number, lastQuestion?: string, ctx?: ChatContext): string[] {
  if (questionCount === 0 || !lastQuestion) {
    if (STARTER_CHIPS[route]) return normalizeCopyList(STARTER_CHIPS[route])

    const slug = route.replace(/^\//, '')
    if (slug && slug !== 'work' && slug !== 'about') {
      return normalizeCopyList(['What was the challenge?', 'Key insight', 'Why it matters', 'Related work'])
    }
  }

  const matchedProject = lastQuestion ? findProject(lastQuestion)?.slug : undefined
  return normalizeCopyList(getDynamicChips(route, questionCount, matchedProject, ctx).slice(0, 4))
}

export function getResponseAction(question: string, route = ''): ResponseAction {
  const q = normalize(question)
  if (!q) return { type: 'none' }

  const workFilter = findWorkFilter(q)
  if (
    workFilter &&
    (
      route === '/work' ||
      /(filter|show|only|just|all|work|projects|archive|browse)/.test(q)
    )
  ) {
    return {
      type: 'filter',
      filterKey: workFilter.key,
      label: workFilter.label,
    }
  }

  const project = findProject(q)
  if (project) {
    const focus = getProjectFocus(project, q)
    if (focus) {
      const path = `/${project.slug}`
      const element = route === path ? getSectionElement(focus.selectors) : null
      return {
        type: route === path ? 'scroll' : 'navigate',
        slug: project.slug,
        label: `${project.name} · ${focus.label}`,
        image: project.image,
        element,
        selectors: focus.selectors,
        explanation: focus.explanation,
      }
    }

    const element = getCardElement(project.slug)
    return {
      type: element ? 'scroll' : 'navigate',
      slug: project.slug,
      label: project.name,
      image: project.image,
      element,
    }
  }

  const category = findCategory(q)
  if (category) {
    return {
      type: 'navigate',
      slug: category.slug,
      label: `${category.title} ${category.titleAccent}`,
      image: category.featured.image,
    }
  }

  if (route === '/') {
    if (/(hero|top|opening)/.test(q)) return getExplainedSectionAction('Hero', ['#hero'], 'This is the opening frame. The object carries the first impression and the caption rail keeps the context light.')
    if (/(featured|featured work|best work|start here|shortlist|start with three)/.test(q)) {
      return getExplainedSectionAction('Featured work', ['.wr-featured-v2', '#works'], 'This is the flagship work layer. It should prove systems depth, research, and range before the archive appears.')
    }
    if (/(disciplines|categories|domains)/.test(q)) return getExplainedSectionAction('Disciplines', ['.wr-disciplines'], 'This row broadens the practice quickly. It shows the spread without forcing the homepage to become a directory.')
    if (/(about|bio)/.test(q)) return getExplainedSectionAction('About', ['#about-card', '.wr-about-card'], 'This is the compressed about layer. It gives enough context to humanize the work without slowing down the homepage.')
    if (/(archive|more work|older projects)/.test(q)) return getExplainedSectionAction('Archive', ['.wr-archive'], 'This is the depth layer. It matters after the flagship work has already made the case.')
    if (/(stats|numbers|metrics)/.test(q)) return getExplainedSectionAction('Stats', ['.wr-counters'], 'These metrics act as supporting evidence, not the primary story.')
  }

  if (route === '/work') {
    if (/(filters|categories|filter bar|pills)/.test(q)) return getExplainedSectionAction('Filters', ['.work-bottom-nav'], 'This rail is the fastest way to reshape the archive. It is the control surface for the whole page.')
    if (/(grid|archive|projects|cards)/.test(q)) return getExplainedSectionAction('Project grid', ['.pcard-masonry'], 'This is the full archive view. It works best after you decide whether you want flagship work, domain depth, or range.')
    if (/(intro|header|top)/.test(q)) return getExplainedSectionAction('Work intro', ['.work-page-header'], 'The header frames the page as an archive, not a landing page.')
  }

  if (route === '/about') {
    if (/(hero|bio|intro)/.test(q)) return getExplainedSectionAction('About intro', ['.abt-hero', '.abt-collage'], 'This is the personal framing layer. It sets the tone before the resume details start.')
    if (/(experience|timeline|resume|roles)/.test(q)) return getExplainedSectionAction('Experience', ['.abt-status-row', '.abt-exp', '.abt-timeline'], 'This is the experience layer. It is the fastest way to understand role fit and trajectory.')
    if (/(tools|skills|stack)/.test(q)) return getExplainedSectionAction('Tools', ['.abt-tools', '.abt-skills'], 'This section shows the working range, design systems, code, and fabrication all sitting inside the same practice.')
    if (/(practice|habits|daily)/.test(q)) return getExplainedSectionAction('Practices', ['.abt-practice-grid', '.abt-practice'], 'This is the daily-practice layer. It explains where the consistency in the work actually comes from.')
    if (/(contact|cta|hire)/.test(q)) return getExplainedSectionAction('Contact', ['.abt-cta', '.cta-v2'], 'This is the close. The page keeps the ask direct and simple.')
  }

  if (route && route !== '/' && route !== '/work' && route !== '/about') {
    if (/(challenge|problem|context|background)/.test(q)) return getExplainedSectionAction('Challenge', ['#cs-problem', '#cs-hook', '#cs-context', '#cs-background', '#cs-bet', '#cs-challenge', '#cs-challenges'], 'This is the framing section. It is where the project proves the problem was worth solving in the first place.')
    if (/(process|approach|research|system|solution)/.test(q)) return getExplainedSectionAction('Process', ['#cs-process', '#cs-research', '#cs-solution', '#cs-system', '#cs-decisions', '#cs-design'], 'This is the process section. It is usually the most useful place to judge the work.')
    if (/(result|impact|outcome|reflection|credits|next)/.test(q)) return getExplainedSectionAction('Results', ['#cs-results', '#cs-impact', '#cs-learnings', '.cs-thanks', '.cs-credits', '#cs-bottom-nav'], 'This section shows the payoff, the outcomes, and what carried forward after the project shipped.')
  }

  if (q.includes('about')) return { type: 'navigate', slug: 'about', label: 'About' }
  if (q.includes('work') || q.includes('projects')) return { type: 'navigate', slug: 'work', label: 'Work' }
  if (q.includes('home')) return { type: 'navigate', slug: '', label: 'Home' }

  return { type: 'none' }
}

export function getGreeting(route: string): string {
  return normalizeCopy(getRouteGreeting(route))
}

const STATIC_TOURS: Record<string, TourStep[]> = {
  '/': [
    { text: 'Start with the first four projects. They should prove systems thinking, research depth, and range before anyone reaches the archive.', scrollTo: '.hp-pcard-grid, .wr-sticky-card, .wr-card', delay: 0 },
    { text: 'The discipline row broadens the picture, but it should still feel curated rather than encyclopedic.', scrollTo: '.wr-disciplines', delay: 220 },
    { text: 'The archive is there for depth. Use it after the flagship work has already done its job.', scrollTo: '.wr-more, .wr-archive, .wr-grid-2', delay: 220 },
    { text: 'If you want the efficient read, ask for the strongest three or the best research story.', scrollTo: '#about-card, .wr-about-card', delay: 0 },
  ],
  '/work': [
    { text: 'This is the full archive. It works best when you decide whether you want flagship work, domain depth, or range.', scrollTo: '.work-page-header', delay: 0 },
    { text: 'Use the filter rail to narrow the archive fast. If you are evaluating senior product thinking, start with Mentra, ZentiPay, and TransFi.', scrollTo: '.work-bottom-nav', delay: 220 },
    { text: 'If you want range instead, look at Jugalbandi, Enigma, and BreakGen. That set shows the practice is wider than product UI.', scrollTo: '.pcard-masonry', delay: 0 },
  ],
  '/about': [
    { text: 'This page is the resume plus the working personality behind the portfolio.', scrollTo: '.abt-hero, .abt-collage', delay: 0 },
    { text: 'The important thread is design plus engineering fluency, not just surface polish.', scrollTo: '.abt-status-row, .abt-status-card', delay: 220 },
    { text: 'The daily practices matter because they explain how the taste and consistency are maintained over time.', scrollTo: '.abt-practice-grid, .abt-practice', delay: 220 },
  ],
}

function getProjectTour(route: string): TourStep[] {
  const slug = route.replace(/^\//, '')
  const project = findProject(slug)
  const label = project?.name || slug.replace(/-/g, ' ')
  const narrative = getProjectNarrative(slug)
  const sectionIds = Array.from(document.querySelectorAll<HTMLElement>('.cs-section[id]')).map(section => section.id)

  const pickSection = (pattern: RegExp, fallbacks: string[]) => {
    const matchingId = sectionIds.find(id => pattern.test(id))
    return matchingId ? `#${matchingId}` : fallbacks.join(', ')
  }

  return [
    {
      text: narrative?.deep?.oneLiner || `This is **${label}**. I’ll keep it tight and stay on the decisions that matter.`,
      scrollTo: '.project-header, .cs-header, main',
      delay: 250,
    },
    {
      text: narrative?.deep?.challenge
        ? `Start with the real constraint: ${narrative.deep.challenge}`
        : 'Start with the framing and the actual product constraint, not the polished screens.',
      scrollTo: pickSection(/hook|problem|challenge|context|background|bet/, ['.cs-section:nth-of-type(2)']),
      delay: 250,
    },
    {
      text: narrative?.deep?.process
        ? `Then look at the system decisions: ${narrative.deep.process}`
        : 'Then read the system and process decisions. That is usually where the senior-level thinking shows up.',
      scrollTo: pickSection(/process|approach|solution|design|system|research/, ['.cs-section:nth-of-type(3)']),
      delay: 250,
    },
    {
      text: narrative?.deep?.whyItMatters
        ? `Finish on the payoff: ${narrative.deep.whyItMatters}`
        : 'Finish on outcomes, reflections, or the next project connection. That is where the case study proves whether it has a point of view.',
      scrollTo: pickSection(/result|impact|reflection|learn|next|credits/, ['.cs-thanks', '.cs-credits', '.cs-bottom-nav']),
      delay: 0,
    },
  ]
}

export function getTourSteps(route: string): TourStep[] {
  if (STATIC_TOURS[route]) {
    return STATIC_TOURS[route].map(step => ({ ...step, text: normalizeCopy(step.text) }))
  }

  const slug = route.replace(/^\//, '')
  if (slug) {
    return getProjectTour(slug).map(step => ({ ...step, text: normalizeCopy(step.text) }))
  }

  return [{ text: 'Let me show you the structure.', delay: 0 }]
}
