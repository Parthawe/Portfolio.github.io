import { categories } from './categories'

/* ── Types ─────────────────────────────────────────────── */

interface ProjectDeep {
  oneLiner: string          // 1 sentence hook, the thing that makes you curious
  challenge: string
  outcome: string
  insight: string
  process: string
  whyItMatters: string
  duration: string
  team: string
  platforms: string
  opinion: string           // The agent's personal take / what makes this special
  connectedTo: string[]     // Related project slugs
  surprisingFact?: string   // Something unexpected
}

interface ProjectInfo {
  slug: string
  name: string
  desc: string
  role: string
  category: string
  categorySlug: string
  year: string
  link: string
  deep?: ProjectDeep
}

const projectIndex = new Map<string, ProjectInfo>()
const nameIndex = new Map<string, ProjectInfo>()

/* ── Deep project stories ──────────────────────────────── */

const deepMap: Record<string, ProjectDeep> = {
  mentra: {
    oneLiner: 'The first smart glasses with a real app store. Parth designed the entire platform, OS, app, and ecosystem.',
    challenge: 'A 640×400px display. Users glance for 2 seconds max. Every phone UI convention breaks here, scrolling, tapping, even reading.',
    outcome: '$299 launch, 88% Batch 2 pre-orders claimed, open-source OS.',
    insight: 'Wearable UI is the opposite of phone UI. Design for peripheral vision, not focus. Voice-first, glance-not-gaze.',
    process: 'Tore apart every smart glasses failure from the last decade. Found 12 reasons they failed, most were software. Built the OS around 3 principles: glance-not-gaze, voice-first, peripheral-priority.',
    whyItMatters: 'Proves wearables can be a platform, not just a gadget. The app store changes the economics entirely.',
    duration: 'Q3 2025–Present',
    team: '1 designer, 4 engineers, product + hardware',
    platforms: 'MentraOS, Companion App (iOS/Android), App Store (Web)',
    opinion: 'This is probably the most ambitious project in the portfolio. Designing an entire OS from scratch, not many designers get to do that.',
    connectedTo: ['clawed-chat', 'executivelens', 'oncall-lens'],
    surprisingFact: 'The minimum text size on the glasses is 18px. That constraint shaped every single screen.',
  },
  zentipay: {
    oneLiner: 'A $50M+ fintech app that discovered fee anxiety matters more than transfer speed.',
    challenge: '67% of users abandoned at the fee confirmation step. The problem wasn\'t speed, it was fear of hidden costs.',
    outcome: '30% higher completion, 40% faster perceived time, $50M+ volume.',
    insight: 'Trust beats speed. Showing fees upfront, even when they\'re higher, reduces abandonment more than any speed optimization.',
    process: '15 interviews across 4 countries, competitive audit of 8 platforms, journey mapping that found 7 friction points. A/B tested fee disclosure with 40+ participants.',
    whyItMatters: 'Proved emotional design (addressing fear) beats functional design (making things faster) in money products.',
    duration: '15 weeks, Q2–Q3 2025',
    team: 'Sole designer + product + eng',
    platforms: 'Mobile (iOS/Android), Web dashboard',
    opinion: 'The research process here is textbook. Starting with a human story (migrant worker losing $25/month) and ending with a systemic fix.',
    connectedTo: ['transfi'],
    surprisingFact: 'The "slow confirmation" animation actually made users feel MORE confident. Instant felt sketchy.',
  },
  'clawed-chat': {
    oneLiner: 'An AI assistant where every action has a receipt. Trust by design, not afterthought.',
    challenge: 'People abandon AI tools because they do things without asking. 73% cite "it did something I didn\'t ask for."',
    outcome: 'Shipped. 3-second request → 5-second results → 1-tap approval.',
    insight: '"Receipts", an immutable trail for every AI action. The AI always asks. Trust is earned through progressive autonomy.',
    process: 'Studied why people quit AI tools. Designed a 3-tier trust model: Suggest → Stage → Act. Users unlock autonomy per domain.',
    whyItMatters: 'This trust architecture could apply to any AI product. The industry needs this, AI transparency by design.',
    duration: '10 weeks, Jan–Mar 2026',
    team: 'Sole designer, 3 engineers',
    platforms: 'Web + Mentra smart glasses',
    opinion: 'The "receipt" concept is the kind of idea that seems obvious after you see it. That\'s how you know it\'s good.',
    connectedTo: ['mentra', 'executivelens', 'ballah-code'],
    surprisingFact: 'Clawed runs on Mentra glasses too, you can approve AI actions by voice while walking.',
  },
  executivelens: {
    oneLiner: 'Saves executives 5.2 hrs/week by passively listening to meetings and surfacing decisions.',
    challenge: 'Executives check 6+ tools per hour. The information exists, it\'s scattered across Slack, email, and dashboards.',
    outcome: '5.2 hrs/week saved. 87% adoption in 2 weeks.',
    insight: 'The best tool is invisible. It listens, auto-researches, surfaces decisions. No manual input.',
    process: 'Shadowed 8 executives for a week. Mapped information flows. Found they context-switch constantly. Built a system that\'s passive by default.',
    whyItMatters: 'Shows how AI augments knowledge work without adding another tool to learn.',
    duration: '2026',
    team: 'Product Designer + engineering',
    platforms: 'Smart glasses + Web dashboard',
    opinion: 'The "no UI is the best UI" approach here is bold. Most products add features; this one removes the need for them.',
    connectedTo: ['mentra', 'clawed-chat', 'oncall-lens'],
  },
  transfi: {
    oneLiner: '$50M+ monthly volume in crypto payments across 6 Asian markets.',
    challenge: 'Each market has different regulations, currencies, and user expectations. One-size-fits-all breaks immediately.',
    outcome: '$50M+ monthly, 6 countries.',
    insight: 'Compliance UX is a competitive advantage. Making KYC feel fast, not punishing, directly lifts conversion.',
    process: 'Mapped regulatory requirements per country. Built modular onboarding that adapts per jurisdiction. Same flow, different compliance steps.',
    whyItMatters: 'Proved regulated products can have great UX. Compliance isn\'t the enemy of design, it\'s a design problem.',
    duration: '2022–2023',
    team: 'Lead Product Designer + design team',
    platforms: 'Web, Mobile',
    opinion: 'This was Parth\'s first time leading a design team. The scale, 6 countries, real money, forced real discipline.',
    connectedTo: ['zentipay'],
  },
  raahi: {
    oneLiner: 'Navigation for blind transit riders that turned out to be faster for everyone.',
    challenge: 'Visually impaired people can\'t read station signs or see approaching trains. Existing apps assume sight.',
    outcome: 'Accessible navigation validated with real users.',
    insight: 'Designing for the most constrained user produces better products for everyone. Haptic + audio was faster than visual in noisy stations.',
    process: 'Rode the NYC subway blindfolded. Interviewed 12 visually impaired commuters. Tested haptic prototypes in real stations.',
    whyItMatters: 'Accessibility isn\'t a feature, it\'s a philosophy that produces universally better products.',
    duration: '2024',
    team: 'Designer + researcher',
    platforms: 'Mobile',
    opinion: 'The blindfolded subway ride is the kind of research that changes how you think about design permanently.',
    connectedTo: ['the-point-cdc'],
    surprisingFact: 'Sighted users in noisy stations actually preferred the haptic navigation over looking at their phones.',
  },
  'ballah-code': {
    oneLiner: 'What happens when AI isn\'t a sidebar in the IDE, it\'s the foundation.',
    challenge: 'Every IDE bolts AI on as a chat panel. What if AI was woven into every action instead?',
    outcome: 'AI-native IDE with 17 production tools.',
    insight: 'Pair programming > autocomplete. Full-project context makes AI actually useful, not just clever.',
    process: 'Built it by using it. Every feature came from a real workflow problem, not a spec doc.',
    whyItMatters: 'Explores what dev tools look like when AI is primary, not secondary.',
    duration: '2026',
    team: 'Solo',
    platforms: 'Desktop (macOS/Win/Linux)',
    opinion: 'Parth built this for himself and it shows, it solves real problems, not hypothetical ones.',
    connectedTo: ['clawed-chat', 'oncall-lens'],
  },
  'oncall-lens': {
    oneLiner: 'Sentry alert → Claude analysis → auto-generated PR fix. Built in 24 hours.',
    challenge: 'On-call engineers get paged at 3am, spend 45 min finding the bug, 30 min writing the fix.',
    outcome: 'Automated triage + fix generation. 24-hour build.',
    insight: 'The fastest incident response is the one the engineer doesn\'t do manually.',
    process: 'Built in a hackathon sprint, Sentry webhook → Claude analysis → GitHub PR.',
    whyItMatters: 'Shows how AI can handle mechanical engineering work so humans handle the judgment calls.',
    duration: '2026',
    team: 'Designer + Developer',
    platforms: 'Web (GitHub integration)',
    opinion: 'The speed is the point, 24 hours from idea to working product. That\'s the power of having both design and dev skills.',
    connectedTo: ['clawed-chat', 'ballah-code'],
  },
  jugalbandi: {
    oneLiner: 'Two strangers collaborate through sound and light, without speaking a word.',
    challenge: 'Make an installation where strangers interact naturally without instructions or language.',
    outcome: 'Exhibited at WonderVille NYC, ITP Winter Show.',
    insight: 'If people have to read a sign, the interaction failed. The interface IS the invitation.',
    process: 'Prototyped 6 interaction models. The one that worked: each person controls half the sound spectrum. They naturally discover harmony.',
    whyItMatters: 'Shows Parth\'s range, from fintech to gallery installations. Same design thinking, different medium.',
    duration: '2023',
    team: 'Creator + collaborator',
    platforms: 'Physical (Arduino, sensors, LED)',
    opinion: 'This is where you see that Parth isn\'t just a product designer. He thinks about human interaction at a fundamental level.',
    connectedTo: ['enigma', 'revolving-stage', 'making-of-time'],
    surprisingFact: 'Strangers who collaborated through the installation often started talking afterward. The sound became a shared language.',
  },
  enigma: {
    oneLiner: 'A light sculpture that shows how a neural network "thinks."',
    challenge: 'Make deep learning tangible, not a diagram, a physical experience.',
    outcome: 'Exhibited at NIME and ITP Show.',
    insight: 'AI visualization should show the feeling, not the math. Uncertainty = flickering, confidence = brightness, learning = movement.',
    process: 'Trained a small neural network, mapped its internal states to LED behaviors. Real-time visualization of actual computation.',
    whyItMatters: 'Makes AI understandable through the body, not the mind.',
    duration: '2023',
    team: 'Solo',
    platforms: 'Physical (LED, Arduino, p5.js)',
    opinion: 'Most AI visualization is charts and graphs. This makes you feel what a neural network does. That\'s rare.',
    connectedTo: ['jugalbandi', 'black-hole'],
  },
  tedx: {
    oneLiner: 'Full brand identity for TEDxVITPune, stage to screen.',
    challenge: 'Stand out from hundreds of TEDx events globally with a cohesive visual system.',
    outcome: 'Complete brand system for 1500+ attendees.',
    insight: 'Conference branding is environmental design. Has to work at 50 feet (stage) and 5 inches (phone) simultaneously.',
    process: 'Started with the theme, not the logo. Let the concept drive every touchpoint, stage, print, digital, merch.',
    whyItMatters: 'Early career project that shows Parth could already think in systems, not just artifacts.',
    duration: '2021',
    team: 'Lead Visual Designer',
    platforms: 'Print, Digital, Environmental',
    opinion: 'For an early project, the systems thinking here is impressive. Every piece connects.',
    connectedTo: ['typeface'],
  },
}

for (const cat of categories) {
  const add = (p: { slug: string; name?: string; title?: string; desc?: string; result?: string; role: string; year?: string }) => {
    const name = (p as { name?: string }).name || (p as { title?: string }).title || p.slug
    const desc = (p as { desc?: string }).desc || (p as { result?: string }).result || ''
    projectIndex.set(p.slug, {
      slug: p.slug, name, desc, role: p.role,
      category: `${cat.title} ${cat.titleAccent}`, categorySlug: cat.slug,
      year: p.year || '', link: `/${p.slug}`, deep: deepMap[p.slug],
    })
    nameIndex.set(name.toLowerCase(), projectIndex.get(p.slug)!)
  }
  add({ ...cat.featured, name: cat.featured.title })
  for (const row of cat.moreProjects) for (const p of row) add(p)
}

/* ── Bio ───────────────────────────────────────────────── */

const bio = {
  name: 'Parth Pawar', title: 'Design Engineer', location: 'San Francisco',
  current: 'Head of UI/UX at Mentra, designing the entire platform for AI smart glasses.',
  status: 'Open to product design in AI, dev tools, fintech, 0→1.',
  email: 'parthpawar@nyu.edu',
  education: [
    { school: 'NYU Tisch / ITP', degree: 'MPS Interactive Telecommunications', years: '2022–2024' },
    { school: 'VIT Pune', degree: 'BE Computer Science', years: '2018–2022' },
  ],
  experience: [
    { period: 'Q3 2025–Now', role: 'Head of UI/UX', co: 'Mentra' },
    { period: 'Q2–Q3 2025', role: 'Founding Designer', co: 'ZentiPay' },
    { period: '2022–2023', role: 'Lead Designer', co: 'TransFi' },
    { period: '2024', role: 'Designer', co: 'The Point CDC' },
    { period: '2023–2024', role: 'TA', co: 'NYU Tisch' },
    { period: '2020–2022', role: 'Co-founder', co: 'ArtTown Podcast' },
  ],
  awards: ['Red Burn + ITP Scholarships (2024)', 'Tisch Scholarship (2023)', 'Smart India Hackathon Winner (2021)', 'Exhibited: Maker Faire, WonderVille, NIME'],
  tools: { design: ['Figma', 'Protopie', 'After Effects'], threeD: ['Blender', '3D Printing', 'Laser Cutting'], code: ['React', 'Swift', 'Python', 'TypeScript'], creative: ['p5.js', 'TouchDesigner', 'Arduino'] },
  funFacts: [
    'Builds keyboards he doesn\'t need', '4px border-radius purist',
    'Pour-over > espresso', 'More vinyl than shelf space', 'Made his own typeface',
    'Wrote poems for 100 days straight', 'Sketches every day', 'Hosted 45 podcast episodes',
    'Rode the NYC subway blindfolded for research', 'Built this portfolio in React 19',
  ],
  practices: [
    { name: '100 Days of Poem', handle: '@poem.nyc', why: 'Poetry trains the same muscle as microcopy, saying the most with the least.' },
    { name: '100 Days of Sketch', handle: '@townforartist', why: 'Daily drawing trains the gap between seeing and noticing.' },
    { name: '50 Days of Photoshop', handle: '@designwhich.works', why: 'Pushing tools past their intended use.' },
    { name: 'ArtTown Podcast', handle: '@arttown.store', why: '45 episodes about craft, not careers.' },
  ],
}

/* ── Helpers ────────────────────────────────────────────── */

function fuzzyFind(query: string): ProjectInfo | undefined {
  const q = query.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()
  if (!q) return undefined
  if (nameIndex.has(q)) return nameIndex.get(q)
  const s = q.replace(/\s+/g, '-')
  if (projectIndex.has(s)) return projectIndex.get(s)
  if (projectIndex.has(q)) return projectIndex.get(q)
  let best: ProjectInfo | undefined, bestScore = 0
  for (const [name, info] of nameIndex) {
    if (name.includes(q) || q.includes(name)) {
      const sc = Math.min(name.length, q.length) / Math.max(name.length, q.length)
      if (sc > bestScore) { bestScore = sc; best = info }
    }
  }
  if (best) return best
  for (const [slug, info] of projectIndex) if (slug.includes(s) || s.includes(slug)) return info
  // Word-level matching, require at least 4 chars to avoid false positives like "it", "the"
  const words = q.split(/\s+/)
  for (const [name, info] of nameIndex) if (words.some(w => w.length > 3 && name.includes(w))) return info
  return undefined
}

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

function getRelated(p: ProjectInfo): ProjectInfo[] {
  return (p.deep?.connectedTo || []).map(s => projectIndex.get(s)).filter((x): x is ProjectInfo => !!x).slice(0, 3)
}

/* ── Section detection ─────────────────────────────────── */

export type VisibleSection = 'hero' | 'work' | 'about' | 'skills' | 'experience' | 'practices' | 'cta' | 'credits' | 'overview' | 'process' | 'features' | 'unknown'

export function detectSection(): VisibleSection {
  const mid = window.innerHeight * 0.4
  const checks: [string, VisibleSection][] = [
    ['.hero, .hp-hero, .hero-3d-wrap', 'hero'],
    ['.cs-credits, .abt-cta', 'cta'],
    ['.cs-process, .cs-steps, .cs-flow', 'process'],
    ['.cs-feature-grid, .cs-info-grid', 'features'],
    ['.cs-overview, .project-overview', 'overview'],
    ['.abt-practice-grid', 'practices'],
    ['.abt-timeline, .abt-exp', 'experience'],
    ['.abt-tools, .abt-skills', 'skills'],
    ['.wr-grid, .work-grid, .wr-archive', 'work'],
    ['.abt-hero, .abt-intro', 'about'],
  ]
  for (const [sel, sec] of checks) {
    const el = document.querySelector(sel)
    if (el) { const r = el.getBoundingClientRect(); if (r.top < mid && r.bottom > 0) return sec }
  }
  return 'unknown'
}

/* ── Route greeting (short, curious) ───────────────────── */

export function getRouteGreeting(path: string): string {
  const section = detectSection()

  if (path === '/') return pick([
    "Hey, pick any project and I'll tell you the real story.",
    "Welcome! I know the backstory on every project. What catches your eye?",
  ])
  if (path === '/work') return "Everything Parth has shipped. Ask about any one."
  if (path === '/about') {
    if (section === 'skills') return "Those tools? Ask me how any of them gets used in a real project."
    if (section === 'experience') return "Want to know what actually happened at any of those roles?"
    if (section === 'practices') return "100 days of poems, 100 days of sketches. Ask me why."
    return "Ask me something the about page doesn't tell you."
  }

  const cat = categories.find(c => path === `/${c.slug}`)
  if (cat) return `${cat.title} ${cat.titleAccent}, ask about any project here.`

  const slug = path.replace(/^\//, '')
  const p = projectIndex.get(slug)
  if (p?.deep) return p.deep.oneLiner
  if (p) return `**${p.name}**, ${p.desc}. Ask me anything.`

  return "Hey, ask me about any project."
}

/* ── Dynamic chips ─────────────────────────────────────── */

export function getDynamicChips(path: string, qCount: number, lastSlug?: string): string[] {
  const section = detectSection()
  const slug = path.replace(/^\//, '')
  const p = projectIndex.get(slug) || (lastSlug ? projectIndex.get(lastSlug) : undefined)

  if (qCount > 4 && p) return ['Why it matters', 'Related work', 'Surprising fact', 'Hire Parth']
  if (qCount > 4) return ['Best project', 'Something unexpected', 'Daily practices', 'Contact']

  if (p?.deep) {
    if (section === 'overview') return ['The real challenge', 'Key insight', 'How it was built', 'Team']
    if (section === 'process') return ['Why this approach?', 'What surprised you?', 'Outcome', 'Related']
    if (section === 'cta') return ['Similar work', 'Best project overall', 'Hire Parth', 'Surprising fact']
    return ['The challenge', 'Key insight', 'Your take on it', 'Related work']
  }
  if (p) return [`More on ${p.name}`, 'Similar projects', 'Best work', 'Contact']

  const cat = categories.find(c => path === `/${c.slug}`)
  if (cat) return [`Best ${cat.title} project`, 'Design approach', 'All categories', 'Contact']

  if (path === '/about') {
    if (section === 'skills') return ['How he uses Figma', 'Code + design?', 'Favorite tool', 'Physical work']
    if (section === 'experience') return ['Best role?', 'Mentra story', 'ZentiPay story', 'Teaching at NYU']
    if (section === 'practices') return ['Why poetry?', 'The podcast', 'Sketching habit', 'Fun facts']
    return ['Fun facts', 'Practices', 'Philosophy', 'Hire Parth']
  }
  if (path === '/work') return ['Best project', 'AI work', 'Installations', 'Latest']
  return ['Best projects', 'About Parth', 'Philosophy', 'Hire Parth']
}

/* ── Context ───────────────────────────────────────────── */

export interface ChatContext { route: string; lastProject?: string; mentionedProjects: string[]; questionCount: number; lastTopic?: string }
export function createContext(route: string): ChatContext { return { route, mentionedProjects: [], questionCount: 0 } }

/* ── Response engine ───────────────────────────────────── */
// KEY PRINCIPLES:
// 1. Short first, 2-3 lines, then offer to go deeper
// 2. Have opinions, the agent has a point of view
// 3. Connect dots, after one project, mention related ones naturally
// 4. Progressive disclosure, don't dump everything at once
// 5. Tease, build curiosity, don't satisfy it immediately

interface Rule { patterns: RegExp[]; handler: (m: RegExpMatchArray, c: ChatContext) => string }

function cp(ctx: ChatContext): ProjectInfo | undefined {
  if (ctx.lastProject) return projectIndex.get(ctx.lastProject)
  const s = ctx.route.replace(/^\//, '')
  return projectIndex.get(s)
}

const rules: Rule[] = [
  // Greeting
  { patterns: [/^(hi|hello|hey|sup|yo|howdy|hiya|what'?s up|heya|good\s)/i],
    handler: (_, ctx) => {
      if (ctx.questionCount > 0) return "What else?"
      const p = cp(ctx)
      if (p?.deep) return `${p.deep.oneLiner}\n\nWant the challenge or the insight?`
      return "Hey, I know the real story behind every project. What are you curious about?"
    }
  },

  // "Your take" / opinion
  { patterns: [/(?:your take|opinion|think about|what makes.*special|honest|stand out|unique)/i],
    handler: (_, ctx) => {
      const p = cp(ctx)
      if (p?.deep?.opinion) return p.deep.opinion
      return "The thing that makes Parth different: he designs AND builds. Figma → React → Arduino. That range changes how you solve problems."
    }
  },

  // Why it matters
  { patterns: [/(?:why.*matter|why.*care|significance|so what|why.*important|why.*interesting)/i],
    handler: (_, ctx) => {
      const p = cp(ctx)
      if (p?.deep) { ctx.lastTopic = 'whyItMatters'; return p.deep.whyItMatters }
      return "Ask about a specific project, the 'why it matters' is where it gets interesting."
    }
  },

  // Surprising fact
  { patterns: [/(?:surpris|unexpected|didn.t know|secret|hidden|curious fact)/i],
    handler: (_, ctx) => {
      const p = cp(ctx)
      if (p?.deep?.surprisingFact) return p.deep.surprisingFact
      const allFacts = [...projectIndex.values()].filter(x => x.deep?.surprisingFact).map(x => `**${x.name}:** ${x.deep!.surprisingFact}`)
      if (allFacts.length) return pick(allFacts)
      const facts = new Set<string>(); while (facts.size < 2) facts.add(pick(bio.funFacts))
      return [...facts].map(f => `• ${f}`).join('\n')
    }
  },

  // Process
  { patterns: [/(?:process|how.*(?:build|make|create|approach|design|start)|methodology|workflow)/i],
    handler: (_, ctx) => {
      const p = cp(ctx)
      if (p?.deep) { ctx.lastTopic = 'process'; return `**How ${p.name} was built:**\n\n${p.deep.process}` }
      const cat = categories.find(c => ctx.route.replace(/^\//, '') === c.slug)
      if (cat) return cat.approach.pillars.map(x => `**${x.title}**, ${x.desc}`).join('\n\n')
      return "Parth's process: constraint-driven design, systems over screens, ship to learn. Ask about a specific project for the real details."
    }
  },

  // Challenge
  { patterns: [/(?:challenge|hardest|difficult|struggle|problem|pain|obstacle)/i],
    handler: (_, ctx) => {
      const p = cp(ctx)
      if (p?.deep) { ctx.lastTopic = 'challenge'; return p.deep.challenge }
      return "Which project? The challenges are where it gets interesting.\n\nMentra → tiny screen. ZentiPay → fee anxiety. Clawed → AI trust."
    }
  },

  // Outcome
  { patterns: [/(?:outcome|result|impact|numbers|metrics|data|success|ship|launch)/i],
    handler: (_, ctx) => {
      const p = cp(ctx)
      if (p?.deep) { ctx.lastTopic = 'outcome'; return p.deep.outcome }
      return "Mentra: 88% pre-orders. ZentiPay: 30% higher completion. TransFi: $50M+/month. Ask about any one."
    }
  },

  // Key insight
  { patterns: [/(?:key insight|learned|takeaway|lesson|realize|discover|aha)/i],
    handler: (_, ctx) => {
      const p = cp(ctx)
      if (p?.deep) {
        ctx.lastTopic = 'insight'
        // After sharing insight, tease the connection
        const related = getRelated(p)
        let r = `"${p.deep.insight}"`
        if (related.length) r += `\n\nInteresting connection: **${related[0].name}** builds on a similar idea.`
        return r
      }
      return "Each flagship project has its own:\n\n• **Mentra:** Glance > gaze\n• **ZentiPay:** Trust > speed\n• **Clawed:** Ask > act\n\nWhich one?"
    }
  },

  // Related / similar
  { patterns: [/(?:related|similar|like this|connected|see also|more like|recommend)/i],
    handler: (_, ctx) => {
      const p = cp(ctx)
      if (p) {
        const rel = getRelated(p)
        if (rel.length) return `**Connected to ${p.name}:**\n\n` + rel.map(r => `• [${r.name}](${r.link}), ${r.deep?.oneLiner || r.desc}`).join('\n')
        return `${p.name} is in **${p.category}**. → [/${p.categorySlug}](/${p.categorySlug})`
      }
      return "Tell me which project, and I'll show you the connections."
    }
  },

  // Team / timeline
  { patterns: [/(?:team|timeline|how long|duration|who|collaborat|size)/i],
    handler: (_, ctx) => {
      const p = cp(ctx)
      if (p?.deep) return `**${p.name}:** ${p.deep.duration}\n${p.deep.team}\n${p.deep.platforms}`
      if (p) return `**${p.name}**, ${p.role} (${p.year})`
      return "Which project?"
    }
  },

  // Compare
  { patterns: [/(?:compare|difference|vs|versus)/i],
    handler: (match) => {
      const t = (match.input || '').toLowerCase()
      const found: ProjectInfo[] = []
      for (const [, info] of projectIndex) { if (t.includes(info.name.toLowerCase()) && !found.includes(info)) found.push(info); if (found.length >= 2) break }
      if (found.length >= 2) {
        const a = found[0], b = found[1]
        let r = `**${a.name}**, ${a.deep?.oneLiner || a.desc}\n\n**${b.name}**, ${b.deep?.oneLiner || b.desc}`
        if (a.deep && b.deep) r += `\n\nBoth show systems thinking, different domains, same rigor.`
        return r
      }
      return "Name two projects and I'll compare them."
    }
  },

  // Best / favorite
  { patterns: [/(?:best|favorite|top|flagship|proudest|must.see|recommend)/i],
    handler: (_, ctx) => {
      const cat = categories.find(c => ctx.route.replace(/^\//, '') === c.slug)
      if (cat) { const f = cat.featured; return `**${f.title}**, ${f.desc}\n\n→ [/${f.slug}](/${f.slug})` }
      return "If I had to pick three:\n\n• **Mentra**, most ambitious (full OS)\n• **ZentiPay**, best research process\n• **Jugalbandi**, most unexpected\n\nWhich one?"
    }
  },

  // Project query
  { patterns: [/(?:tell me about|what is|what's|describe|explain)\s+(.+)/i, /(?:know about|info on|details on|more about)\s+(.+)/i],
    handler: (match, ctx) => {
      const fullInput = (match.input || '').replace(/[?.!,]+$/, '').trim()
      const captured = match[1].replace(/[?.!,]+$/, '').trim()
      // If captured part is a pronoun like "it"/"this"/"that", try the full input first
      const isProperCapture = captured.length > 3 && !/^(it|this|that|them|those|these)$/i.test(captured)
      const q = isProperCapture ? captured : fullInput
      const p = fuzzyFind(q) || (!isProperCapture ? cp(ctx) : undefined)
      if (p) {
        ctx.lastProject = p.slug; ctx.mentionedProjects.push(p.slug)
        if (p.deep) return `${p.deep.oneLiner}\n\n→ [Read the case study](${p.link})`
        return `**${p.name}**, ${p.desc}. ${p.role} · ${p.year}\n\n→ [View](${p.link})`
      }
      if (/parth|yourself|you|him|who/i.test(q)) return `**${bio.name}**, ${bio.title}, ${bio.location}.\n\nCurrently: ${bio.current}`
      return `Don't know "${q}", try Mentra, ZentiPay, Clawed, or a category like "AI" or "installations".`
    }
  },

  // Current
  { patterns: [/(?:currently|right now|doing now|working on|current|latest)/i],
    handler: () => `${bio.current}\n\n${bio.status}` },

  // Tools
  { patterns: [/(?:tools?|skills?|tech|what.*use|figma|react|python|swift|arduino|blender)/i],
    handler: (match) => {
      const q = (match.input || '').toLowerCase()
      if (q.includes('figma')) return "Primary tool. He's built 140+ component systems (ZentiPay alone had 140 components). Design systems, prototyping, handoff."
      if (q.includes('react')) return "React + TypeScript for production UI. This portfolio is React 19 + Vite + Tailwind v4. He codes what he designs."
      if (q.includes('python')) return "Python for AI/ML, TensorFlow, data analysis. Used in Enigma (neural network sculpture) and AI voice projects."
      if (q.includes('arduino')) return "Physical computing, sensors, LEDs, actuators. Powers Jugalbandi, Enigma, and many ITP installations."
      if (q.includes('blender')) return "3D modeling and rendering. Used for product visualization and the Mentra hardware renders."
      return `**Design:** ${bio.tools.design.join(', ')}\n**3D/Fab:** ${bio.tools.threeD.join(', ')}\n**Code:** ${bio.tools.code.join(', ')}\n**Creative:** ${bio.tools.creative.join(', ')}\n\nFigma to terminal to soldering iron.`
    }
  },

  // Experience
  { patterns: [/(?:experience|career|jobs?|worked|resume|background|history)/i],
    handler: () => bio.experience.map(e => `**${e.role}** · ${e.co} (${e.period})`).join('\n') },

  // Education
  { patterns: [/(?:education|school|degree|nyu|itp|university|college|tisch)/i],
    handler: () => bio.education.map(e => `**${e.degree}** · ${e.school} (${e.years})`).join('\n\n') },

  // Awards
  { patterns: [/(?:awards?|recognition|achievement|scholarship|hackathon)/i],
    handler: () => bio.awards.map(a => `• ${a}`).join('\n') },

  // Contact
  { patterns: [/(?:contact|email|hire|reach|available|open to|work with)/i],
    handler: () => `**${bio.email}**\n\n${bio.status}` },

  // Fun facts
  { patterns: [/(?:fun fact|random|quirk|personal|about him|hobbies)/i],
    handler: () => { const f = new Set<string>(); while (f.size < 3) f.add(pick(bio.funFacts)); return [...f].map(x => `• ${x}`).join('\n') }
  },

  // Practices
  { patterns: [/(?:poem|sketch|photoshop|podcast|arttown|daily|practice|100 days|why poetry)/i],
    handler: (match) => {
      const q = (match.input || '').toLowerCase()
      if (q.includes('poem') || q.includes('poetry') || q.includes('why poem')) return `**${bio.practices[0].name}** (${bio.practices[0].handle})\n\n${bio.practices[0].why}`
      if (q.includes('sketch') || q.includes('draw')) return `**${bio.practices[1].name}** (${bio.practices[1].handle})\n\n${bio.practices[1].why}`
      if (q.includes('podcast') || q.includes('arttown')) return `**${bio.practices[3].name}** (${bio.practices[3].handle})\n\n${bio.practices[3].why}`
      return bio.practices.map(p => `**${p.name}** (${p.handle}), ${p.why}`).join('\n\n')
    }
  },

  // Typeface
  { patterns: [/(?:typeface|font|butler|typography)/i],
    handler: () => "**Butler's Slice**, display typeface Parth designed. 3 weights. → [about page](/about)" },

  // Categories
  { patterns: [/(?:categor|types? of|what kind|areas?|domains?|specializ)/i],
    handler: () => categories.slice(0, 6).map(c => `• [${c.title} ${c.titleAccent}](/${c.slug})`).join('\n') },

  // AI
  { patterns: [/\bai\b|artificial intelligence|machine learning|smart glass|wearable/i],
    handler: () => "**AI work:** Mentra (smart glasses OS), Clawed (AI trust), ExecutiveLens (meeting AI), OnCall Lens (auto bug fix), Ballah Code (AI IDE). → [/ai](/ai)" },

  // Fintech
  { patterns: [/(?:fintech|finance|payment|money|bank|crypto|web3)/i],
    handler: () => "**Fintech:** ZentiPay ($50M+ trust-first), TransFi (crypto, 6 markets). Core insight: compliance UX is a moat. → [/fintech](/fintech)" },

  // Installations
  { patterns: [/(?:install|physical|sculpture|gallery|fabricat|maker)/i],
    handler: () => "**Physical:** Jugalbandi (sound at WonderVille), Enigma (neural network sculpture), Making of Time (kinetic). Arduino, sensors, LEDs. → [/installations](/installations)" },

  // Navigation
  { patterns: [/(?:go to|navigate|show|take me|where.*(?:find|see))\s+(.+)/i],
    handler: (match) => {
      const t = match[1].toLowerCase().replace(/[?.!]+$/, '').trim()
      const routes: Record<string, string> = { about: '/about', work: '/work', home: '/', projects: '/work' }
      if (routes[t]) return `→ [${routes[t]}](${routes[t]})`
      const cat = categories.find(c => c.slug.includes(t) || `${c.title} ${c.titleAccent}`.toLowerCase().includes(t))
      if (cat) return `→ [/${cat.slug}](/${cat.slug})`
      const p = fuzzyFind(t)
      if (p) return `→ [${p.link}](${p.link})`
      return `→ [/work](/work)`
    }
  },

  // This page
  { patterns: [/(?:this page|where am i|what page|what.*looking)/i],
    handler: (_, ctx) => {
      const p = cp(ctx)
      if (p?.deep) return `**${p.name}**, ${p.deep.oneLiner}`
      if (p) return `**${p.name}**, ${p.desc}`
      if (ctx.route === '/') return "Home page."
      if (ctx.route === '/work') return "Full project archive."
      if (ctx.route === '/about') return "About Parth."
      const cat = categories.find(c => ctx.route === `/${c.slug}`)
      if (cat) return `**${cat.title} ${cat.titleAccent}** category.`
      return `${ctx.route}`
    }
  },

  // Count
  { patterns: [/(?:how many|number|count|total)\s*(?:project|work|case)/i],
    handler: () => `${projectIndex.size} projects, ${categories.length} categories.` },

  // Thanks/bye
  { patterns: [/(?:thanks|thank|thx|cheers)/i], handler: () => pick(["Sure thing.", "Anytime."]) },
  { patterns: [/(?:bye|goodbye|see ya|later|peace)/i], handler: () => `Later! **${bio.email}** if you want to connect.` },
]

const fallbacks = [
  "Try asking about a specific project, Mentra, ZentiPay, Clawed. That's where the interesting stories are.",
  "I know the backstory on every project here. Ask about one, or try 'best projects' or 'something surprising'.",
]

export function getResponse(message: string, ctx: ChatContext): { text: string; chips?: string[] } {
  const t = message.trim()
  if (!t) return { text: "Ask me anything." }
  ctx.questionCount++

  for (const rule of rules) {
    for (const pat of rule.patterns) {
      const m = t.match(pat)
      if (m) {
        const text = rule.handler(m, ctx)
        // After answering, naturally suggest the next step
        let finalText = text
        const p = cp(ctx)
        if (p?.deep && ctx.questionCount > 1 && ctx.lastTopic && Math.random() > 0.5) {
          const rel = getRelated(p)
          if (rel.length && !ctx.mentionedProjects.includes(rel[0].slug)) {
            finalText += `\n\nBy the way, **${rel[0].name}** connects to this.`
          }
        }
        return { text: finalText, chips: getDynamicChips(ctx.route, ctx.questionCount, ctx.lastProject) }
      }
    }
  }

  const p = fuzzyFind(t)
  if (p) {
    ctx.lastProject = p.slug; ctx.mentionedProjects.push(p.slug)
    const text = p.deep ? p.deep.oneLiner + `\n\n→ [Case study](${p.link})` : `**${p.name}**, ${p.desc}\n\n→ [View](${p.link})`
    return { text, chips: getDynamicChips(ctx.route, ctx.questionCount, p.slug) }
  }

  return { text: pick(fallbacks), chips: getDynamicChips(ctx.route, ctx.questionCount) }
}
