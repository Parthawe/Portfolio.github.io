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
  mentra: ['mentra', 'mentra glasses', 'smart glasses os'],
  'transfi-project': ['transfi', 'trans fi', 'transfy'],
  zentipay: ['zentipay', 'zenti pay', 'zenti', 'zenith pay'],
  'clawed-chat': ['clawed', 'clawed chat', 'clawd'],
  executivelens: ['executivelens', 'executive lens'],
  'raahi-project': ['raahi', 'pune transit'],
  'ballah-code': ['ballah', 'ballah code'],
  'oncall-lens': ['oncall', 'oncall lens', 'on-call lens'],
  jugalbandi: ['jugalbandi'],
  enigma: ['enigma'],
  tedx: ['tedx', 'tedxvitpune'],
  'keyboard-project': ['breakgen', 'keyboard project'],  // removed bare "keyboard" — too generic
  'ai-voice': ['ai voice', 'voice ai'],
  cuetv: ['cuetv', 'cue tv'],
  'org-dashboard': ['org dashboard', 'organization dashboard'],
  'black-hole': ['black hole', 'black holes'],
  'the-omakase': ['omakase', 'sushi game', 'arcade cabinet'],
  typeface: ['butlers slice', 'butler slice', 'typeface'],
  'making-of-time': ['making of time'],
  'sea-of-salt': ['sea of salt'],
  'uv-light': ['uv light', 'blacklight'],
  'revolving-stage': ['revolving stage', 'rotating stage'],
  'the-point-cdc': ['point cdc', 'the point'],
  'office-of-diversity': ['office of diversity', 'idbea'],
  sculpture: ['sculpture', 'firodia'],
  'code-for-build': ['code for build'],
  'vj-software': ['vj software'],
  shuffle: ['shuffle'],
  drowning: ['drowning'],
  'moniac-machine': ['moniac', 'moniac machine'],
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

  // Exact match first (highest confidence)
  for (const project of projects) {
    const terms = getProjectSearchTerms(project)
    if (terms.some(term => term === q)) return project
  }

  // Containment match — but require the matching term to be 4+ chars to avoid
  // false positives on short words like "it", "the", "art", "a"
  for (const project of projects) {
    const terms = getProjectSearchTerms(project)
    if (terms.some(term => term.length >= 4 && (q.includes(term) || term.includes(q)))) return project
  }

  return undefined
}

function findCategory(query: string): (typeof categories)[number] | undefined {
  const q = normalize(query)
  if (!q) return undefined

  return categories.find(category => {
    const terms = [category.slug, `${category.title} ${category.titleAccent}`, ...(CATEGORY_ALIASES[category.slug] || [])]
      .map(normalize)
    return terms.some(term => term === q || (term.length >= 4 && (q.includes(term) || term.includes(q))))
  })
}

function findWorkFilter(query: string): { key: 'all' | ProjectCategory; label: string } | undefined {
  const q = normalize(query)
  if (!q) return undefined

  for (const [key, aliases] of Object.entries(WORK_FILTER_ALIASES) as Array<['all' | ProjectCategory, string[]]>) {
    if (!aliases.some(alias => {
      const term = normalize(alias)
      return term === q || (term.length >= 4 && q.includes(term))
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

  // Check for project match FIRST — if a specific project is named, don't filter
  const project = findProject(q)

  // Work filter only fires if no specific project was found
  if (!project) {
    const workFilter = findWorkFilter(q)
    if (
      workFilter &&
      (
        route === '/work' ||
        /\b(filter|show|only|just|all|archive|browse)\b/.test(q)
      )
    ) {
      return {
        type: 'filter',
        filterKey: workFilter.key,
        label: workFilter.label,
      }
    }
  }
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
    if (/\b(hero|top|opening)\b/.test(q)) return getExplainedSectionAction('Hero', ['#hero'], 'This is the opening frame. The object carries the first impression and the caption rail keeps the context light.')
    if (/\b(featured|featured work|best work|start here|shortlist|start with three)\b/.test(q)) {
      return getExplainedSectionAction('Featured work', ['.wr-featured-v2', '#works'], 'This is the flagship work layer. It should prove systems depth, research, and range before the archive appears.')
    }
    if (/\b(disciplines|categories|domains)\b/.test(q)) return getExplainedSectionAction('Disciplines', ['.wr-disciplines'], 'This row broadens the practice quickly. It shows the spread without forcing the homepage to become a directory.')
    if (/\b(about|bio)\b/.test(q)) return getExplainedSectionAction('About', ['#about-card', '.wr-about-card'], 'This is the compressed about layer. It gives enough context to humanize the work without slowing down the homepage.')
    if (/\b(archive|more work|older projects)\b/.test(q)) return getExplainedSectionAction('Archive', ['.wr-archive'], 'This is the depth layer. It matters after the flagship work has already made the case.')
    if (/\b(stats|numbers|metrics)\b/.test(q)) return getExplainedSectionAction('Stats', ['.wr-counters'], 'These metrics act as supporting evidence, not the primary story.')
  }

  if (route === '/work') {
    if (/\b(filters|categories|filter bar|pills)\b/.test(q)) return getExplainedSectionAction('Filters', ['.work-bottom-nav'], 'This rail is the fastest way to reshape the archive. It is the control surface for the whole page.')
    if (/\b(grid|archive|cards)\b/.test(q)) return getExplainedSectionAction('Project grid', ['.pcard-masonry'], 'This is the full archive view. It works best after you decide whether you want flagship work, domain depth, or range.')
    if (/\b(intro|header)\b/.test(q) && !/\b(project|case)\b/.test(q)) return getExplainedSectionAction('Work intro', ['.work-page-header'], 'The header frames the page as an archive, not a landing page.')
  }

  if (route === '/about') {
    if (/\b(hero|bio|intro)\b/.test(q) && !/\b(project|case)\b/.test(q)) return getExplainedSectionAction('About intro', ['.abt-photo-hero', '.abt-paper'], 'This is the personal framing layer. It sets the tone before the resume details start.')
    if (/\b(experience|timeline|resume|roles)\b/.test(q)) return getExplainedSectionAction('Experience', ['.abt-status-row', '.abt-exp', '.abt-timeline'], 'This is the experience layer. It is the fastest way to understand role fit and trajectory.')
    if (/\b(tools|skills|stack)\b/.test(q)) return getExplainedSectionAction('Tools', ['.abt-tools', '.abt-skills'], 'This section shows the working range, design systems, code, and fabrication all sitting inside the same practice.')
    if (/\b(practice|habits|daily)\b/.test(q)) return getExplainedSectionAction('Practices', ['.abt-practice-grid', '.abt-practice'], 'This is the daily-practice layer. It explains where the consistency in the work actually comes from.')
    if (/\b(contact|cta|hire)\b/.test(q)) return getExplainedSectionAction('Contact', ['.abt-cta', '.cta-v2'], 'This is the close. The page keeps the ask direct and simple.')
  }

  if (route && route !== '/' && route !== '/work' && route !== '/about') {
    if (/\b(challenge|problem|context|background)\b/.test(q)) return getExplainedSectionAction('Challenge', ['#cs-problem', '#cs-hook', '#cs-context', '#cs-background', '#cs-bet', '#cs-challenge', '#cs-challenges'], 'This is the framing section. It is where the project proves the problem was worth solving in the first place.')
    if (/\b(process|approach|research|system|solution)\b/.test(q)) return getExplainedSectionAction('Process', ['#cs-process', '#cs-research', '#cs-solution', '#cs-system', '#cs-decisions', '#cs-design'], 'This is the process section. It is usually the most useful place to judge the work.')
    if (/\b(result|impact|outcome|reflection|credits)\b/.test(q)) return getExplainedSectionAction('Results', ['#cs-results', '#cs-impact', '#cs-learnings', '.cs-thanks', '.cs-credits', '#cs-bottom-nav'], 'This section shows the payoff, the outcomes, and what carried forward after the project shipped.')
  }

  if (/\babout\b/.test(q) && !/\babout (the|this|that|a|an)\b/.test(q)) return { type: 'navigate', slug: 'about', label: 'About' }
  if (/\b(work page|all work|show work)\b/.test(q)) return { type: 'navigate', slug: 'work', label: 'Work' }
  if (/\b(home|homepage|go home)\b/.test(q)) return { type: 'navigate', slug: '', label: 'Home' }

  return { type: 'none' }
}

export function getGreeting(route: string): string {
  return normalizeCopy(getRouteGreeting(route))
}

const STATIC_TOURS: Record<string, TourStep[]> = {
  '/': [
    { text: 'Welcome. I\'ll walk you through Parth\'s work the way he\'d present it himself. These four up top are the headliners, they\'re here because each one proves something different. Mentra is the ambition play, ZentiPay is the research story, and Jugalbandi is the "wait, he does that too?" moment.', scrollTo: '.wr-featured-v2, #works', delay: 300 },
    { text: 'Six disciplines. That\'s not a flex, it\'s the actual range. UX design and fintech pay the bills, but the creative tech and installations? That\'s where you see the thinking that makes the product work different. Parth builds physical things, not just pixels.', scrollTo: '.wr-disciplines', delay: 300 },
    { text: 'The archive goes deeper. If you liked a flagship project, there are 30 more stories here. My suggestion: don\'t scroll linearly. Ask me for a shortlist based on what you care about and I\'ll pull the right three.', scrollTo: '.wr-archive', delay: 300 },
    { text: 'Quick snapshot of who Parth is. Head of UI/UX at Mentra, NYU ITP grad, San Francisco. If the work speaks to you, the contact is right there. Or just ask me anything, I know every project here.', scrollTo: '#about-card, .wr-about-card', delay: 0 },
  ],
  '/work': [
    { text: 'Alright, full archive. 34 projects across six disciplines. Let me orient you so you don\'t have to scroll blindly.', scrollTo: '.work-page-header', delay: 300 },
    { text: 'See the filter bar at the bottom? That\'s your steering wheel. **UX Design** is the core, that\'s where the Mentra, ZentiPay, TransFi caliber work lives. **AI & Wearables** is the frontier stuff, smart glasses, AI trust models. If you\'re a recruiter evaluating product thinking, start there.', scrollTo: '.work-bottom-nav', delay: 400 },
    { text: '**Creative Technology** is the ITP side, neural networks that make music, custom keyboards generated by AI. **Installations** is physical fabrication, arcade cabinets, light sculptures, rotating stages. These two categories are what separate Parth from a typical product designer.', scrollTo: '.work-bottom-nav', delay: 400 },
    { text: '**Brand & Visual** has the typography and art direction work, including a full typeface he designed. **Design for Good** is civic design, public transit, community nonprofits. Every category has a different flavor but the same rigor underneath.', scrollTo: '.work-bottom-nav', delay: 300 },
    { text: 'My recommendation? If you have 5 minutes, open **Mentra** for systems ambition, **ZentiPay** for research depth, and **Jugalbandi** for something you won\'t expect. That trio tells the whole story. Or ask me for a custom shortlist based on what you\'re hiring for.', scrollTo: '.pcard-masonry', delay: 0 },
  ],
  '/about': [
    { text: 'This is Parth. Design engineer, Head of UI/UX at Mentra, building the OS for AI smart glasses in San Francisco. NYU ITP grad. The photo changes if you hover over it, by the way.', scrollTo: '.abt-photo-hero, .abt-paper', delay: 300 },
    { text: 'Here\'s the thing that matters: he\'s at Mentra right now designing an entire operating system for a 640-pixel-wide display. Before that, founding designer at ZentiPay, lead at TransFi. The trajectory is 0-to-1 product work at increasing scale.', scrollTo: '.abt-status-row, .abt-status-card', delay: 350 },
    { text: 'The tools section is worth a look. It\'s not just Figma, it\'s React, Python, Arduino, Blender, laser cutters. He designs it, codes it, and sometimes physically builds it. That range is why the installations and creative tech projects exist alongside the fintech work.', scrollTo: '.abt-tools, .abt-skills', delay: 350 },
    { text: 'The daily practices at the bottom explain the consistency. 100 days of poems, 100 days of sketches, 45 podcast episodes. It\'s not hustle content, it\'s a designer who actually does the reps. If you want to talk, his email is here. Or ask me anything else.', scrollTo: '.abt-practice-grid, .abt-practice', delay: 0 },
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

  const deep = narrative?.deep

  // Project-specific opinionated tours
  if (deep) {
    const connected = (deep.connectedTo || []).slice(0, 2)
    const connectedNames = connected.map(s => {
      const p = projects.find(pr => pr.slug === s)
      return p ? `**[${p.name}](/${p.slug})**` : ''
    }).filter(Boolean)

    return [
      {
        text: `Let me walk you through **${label}**. ${deep.oneLiner} I'll point out what actually matters and skip the filler.`,
        scrollTo: '.project-header, .cs-header, main',
        delay: 300,
      },
      {
        text: `Okay, pay attention here. ${deep.challenge} This is the real constraint, not the brief. Everything that follows was shaped by this problem.`,
        scrollTo: pickSection(/hook|problem|challenge|context|background|bet/, ['.cs-section:nth-of-type(2)']),
        delay: 350,
      },
      {
        text: `This is where the senior thinking shows up. ${deep.process} Most case studies show you the output. This section shows you *why* those decisions were made.`,
        scrollTo: pickSection(/process|approach|solution|design|system|research|decisions/, ['.cs-section:nth-of-type(3)']),
        delay: 350,
      },
      {
        text: deep.surprisingFact
          ? `Here's something most people miss: ${deep.surprisingFact}`
          : `The key insight here: ${deep.insight}`,
        scrollTo: pickSection(/result|impact|system|store|companion|os|decisions/, ['.cs-section:nth-of-type(4)']),
        delay: 300,
      },
      {
        text: `${deep.whyItMatters}${connectedNames.length ? ` If this resonated, look at ${connectedNames.join(' and ')} next, similar thread.` : ' Ask me about the challenge, the insight, or what makes this one special.'}`,
        scrollTo: pickSection(/result|impact|reflection|learn|next|credits/, ['.cs-thanks', '.cs-credits', '.cs-bottom-nav']),
        delay: 0,
      },
    ]
  }

  // Fallback for projects without deep stories
  return [
    {
      text: `This is **${label}**. I don't have the deep story loaded for this one, but let me walk the sections. The structure will tell you a lot.`,
      scrollTo: '.project-header, .cs-header, main',
      delay: 300,
    },
    {
      text: 'Start with the framing. What was the actual problem? Skip the hero image, look for the constraint that made this project hard.',
      scrollTo: pickSection(/hook|problem|challenge|context|background|bet/, ['.cs-section:nth-of-type(2)']),
      delay: 300,
    },
    {
      text: 'Now the decisions. This is where you see whether the thinking is surface-level or structural. Look for the "why" behind each choice.',
      scrollTo: pickSection(/process|approach|solution|design|system|research/, ['.cs-section:nth-of-type(3)']),
      delay: 300,
    },
    {
      text: 'Did it land? Check the outcomes. If there are numbers, great. If there are reflections, even better. That is where you see if the designer learned something.',
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
