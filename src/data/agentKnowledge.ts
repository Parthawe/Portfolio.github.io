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
    connectedTo: ['transfi-project'],
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
  'transfi-project': {
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
    surprisingFact: 'Each country needed different compliance flows, but users never noticed — same feel, different regulations under the hood.',
  },
  'raahi-project': {
    oneLiner: 'Service design that made Pune\'s chaotic public transit system accessible and connected.',
    challenge: 'Pune has buses, metro, auto-rickshaws, and shared cabs, but zero intermodal connectivity. Users can\'t plan multi-mode journeys or pay digitally.',
    outcome: 'End-to-end service design: mobile app, kiosk system, in-vehicle monitors, and a unified color system for 8 transport modes.',
    insight: 'Transit design is a service design problem, not just an app problem. The kiosk, the in-vehicle screen, and the phone all need to speak the same language.',
    process: 'Field research across Pune\'s transit network. Mapped pain points in route complexity, payment friction, and wayfinding. Designed a unified system spanning app, kiosk, and in-vehicle displays with a per-mode color system.',
    whyItMatters: 'Shows how civic design at scale works: the same user journey spans physical and digital touchpoints, and every one has to be simple.',
    duration: '2022',
    team: 'Designer + researcher',
    platforms: 'Mobile app, Kiosk, In-vehicle monitors',
    opinion: 'This is the project that shows Parth can think in service design, not just screens. Every touchpoint connects.',
    connectedTo: ['the-point-cdc'],
    surprisingFact: 'The color system assigned distinct pairs to 8 transport modes, so users could identify their bus or metro line at a glance without reading.',
  },
  'ballah-code': {
    oneLiner: 'What happens when AI isn\'t a sidebar in the IDE, it\'s the foundation.',
    challenge: 'Every IDE bolts AI on as a chat panel. What if AI was woven into every action instead?',
    outcome: 'AI-native IDE with 17 production tools — designed the full product UX.',
    insight: 'Pair programming > autocomplete. Full-project context makes AI actually useful, not just clever.',
    process: 'Joined as product designer alongside creator Isaiah Ballah. Designed the multi-workspace layout, AI tool interactions, streaming feedback patterns, and terminal integration UX.',
    whyItMatters: 'Explores what dev tools look like when AI is primary, not secondary.',
    duration: '2026',
    team: 'Isaiah Ballah (Creator/Founder) + Parth Pawar (Product Designer)',
    platforms: 'Desktop (macOS/Win/Linux)',
    opinion: 'Parth designed the UX for Isaiah Ballah\'s vision — the product solves real workflow problems because it was built by someone who lives in the terminal.',
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
    outcome: 'Exhibited at Maker Faire Coney Island 2024, ITP Winter Show.',
    insight: 'If people have to read a sign, the interaction failed. The interface IS the invitation.',
    process: 'Prototyped 6 interaction models. The one that worked: each person controls half the sound spectrum. They naturally discover harmony.',
    whyItMatters: 'Shows Parth\'s range, from fintech to gallery installations. Same design thinking, different medium.',
    duration: '2024',
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
    outcome: 'Complete brand system for 800+ attendees.',
    insight: 'Conference branding is environmental design. Has to work at 50 feet (stage) and 5 inches (phone) simultaneously.',
    process: 'Started with the theme, not the logo. Let the concept drive every touchpoint, stage, print, digital, merch.',
    whyItMatters: 'Early career project that shows Parth could already think in systems, not just artifacts.',
    duration: '2021',
    team: 'Lead Visual Designer',
    platforms: 'Print, Digital, Environmental',
    opinion: 'For an early project, the systems thinking here is impressive. Every piece connects.',
    connectedTo: ['typeface'],
  },
  'keyboard-project': {
    oneLiner: 'An AI platform that turns text prompts into fabrication-ready custom keyboards.',
    challenge: 'Custom keyboards require CAD expertise, weeks of iteration, and fabrication knowledge. What if anyone could describe a keyboard and have it built?',
    outcome: 'Working platform, 200+ visitors at ITP thesis show. Text to fabrication-ready output.',
    insight: 'Generative design works best when the AI handles mechanical constraints and the human handles aesthetics and feel.',
    process: 'Built the pipeline end-to-end: prompt parsing, key layout generation, case design, fabrication file export. Each keyboard is structurally valid and printable.',
    whyItMatters: 'It is the thesis project, the capstone of ITP. It proves that design and engineering converge when the system is smart enough.',
    duration: '2025',
    team: 'Solo (ITP thesis)',
    platforms: 'Web + physical fabrication',
    opinion: 'This is where the design-engineer identity becomes undeniable. He built the AI, designed the product, and fabricated the output.',
    connectedTo: ['ballah-code', 'jugalbandi'],
    surprisingFact: 'Every generated keyboard is structurally valid and can be 3D printed without modification.',
  },
  'black-hole': {
    oneLiner: 'Five physical models of black hole phenomena, exhibited at the Horological Society of NY.',
    challenge: 'Make the physics of black holes tangible, not as a diagram but as a physical object you can hold.',
    outcome: 'Five models exhibited at the Horological Society of New York.',
    insight: 'Scientific visualization is most powerful when it uses the body, not the screen. Weight, texture, and light teach faster than equations.',
    process: 'Researched 5 black hole phenomena (accretion, lensing, jets, spaghettification, Hawking radiation). Modeled each in Blender, fabricated with 3D printing and mixed media.',
    whyItMatters: 'Shows the fabrication range: from digital to physical, from design to science communication.',
    duration: '2026',
    team: 'Solo',
    platforms: 'Physical (3D printing, mixed media)',
    opinion: 'The venue alone, Horological Society of NY, says something about the quality bar. These aren\'t school projects, they\'re exhibition pieces.',
    connectedTo: ['enigma', 'making-of-time'],
  },
  'the-omakase': {
    oneLiner: '2-player sushi arcade cabinet with custom RGB controllers, exhibited at ITP and WonderVille.',
    challenge: 'Build a fully playable arcade game with custom hardware controllers and exhibit it publicly.',
    outcome: 'Playable cabinet exhibited at ITP Winter Show and WonderVille NYC.',
    insight: 'Physical game design is a different discipline from screen design. The controller IS the interface, not a proxy for it.',
    process: 'Designed the game mechanics, fabricated the cabinet, built custom RGB button controllers from scratch using Arduino. The game runs in browser but the experience is entirely physical.',
    whyItMatters: 'Shows that Parth can design end-to-end: game logic, physical fabrication, electronics, and exhibition design.',
    duration: '2024',
    team: 'Collaborator',
    platforms: 'Physical arcade cabinet, Web (p5.js)',
    opinion: 'WonderVille is a real arcade bar in Brooklyn. Getting exhibited there means the game was genuinely fun, not just a school demo.',
    connectedTo: ['jugalbandi', 'shuffle'],
  },
  typeface: {
    oneLiner: 'Butler\'s Slice, a variable display typeface with geometric slice cuts. 400+ glyphs, 3 weights.',
    challenge: 'Design a typeface that has a distinctive visual identity without sacrificing readability at display sizes.',
    outcome: '400+ glyphs across 3 weights (Light, Regular, Bold). Functional variable font.',
    insight: 'Type design is the purest form of systems design: every glyph follows the same rules but must feel individually balanced.',
    process: 'Defined the slice cut system (45-degree geometric cuts on stems and bowls). Applied it across uppercase, lowercase, numerals, and punctuation. Tested at display and body sizes.',
    whyItMatters: 'Making your own typeface is the equivalent of a musician writing their own instrument. It proves design thinking at the atomic level.',
    duration: '2022',
    team: 'Solo',
    platforms: 'Glyphs, FontForge',
    opinion: 'The portfolio uses this typeface. That level of craft, designing the letters your own portfolio is set in, is rare.',
    connectedTo: ['tedx'],
  },
}

for (const cat of categories) {
  const add = (p: { slug: string; name?: string; title?: string; desc?: string; result?: string; role: string; year?: string }) => {
    const name = p.name || p.title || p.slug
    const desc = p.desc || p.result || ''
    const info: ProjectInfo = {
      slug: p.slug, name, desc, role: p.role,
      category: `${cat.title} ${cat.titleAccent}`, categorySlug: cat.slug,
      year: p.year || '', link: `/${p.slug}`, deep: deepMap[p.slug],
    }
    projectIndex.set(p.slug, info)
    nameIndex.set(name.toLowerCase(), info)
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
    { period: '2021–2022', role: 'Designer', co: 'Monson Fish' },
    { period: '2020–2022', role: 'Co-founder', co: 'ArtTown Podcast' },
  ],
  awards: ['Red Burn + ITP Scholarships (2024)', 'Tisch Scholarship (2023)', 'Exhibited: Maker Faire, WonderVille, NIME'],
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

function pick<T>(arr: T[]): T {
  if (arr.length === 0) throw new Error('pick() called on empty array')
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRelated(p: ProjectInfo): ProjectInfo[] {
  return (p.deep?.connectedTo || []).map(s => projectIndex.get(s)).filter((x): x is ProjectInfo => !!x).slice(0, 3)
}

/* ── Section detection ─────────────────────────────────── */

export type VisibleSection = 'hero' | 'work' | 'about' | 'skills' | 'experience' | 'practices' | 'cta' | 'credits' | 'overview' | 'process' | 'features' | 'unknown'

export function detectSection(): VisibleSection {
  if (typeof window === 'undefined') return 'unknown'
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
    "Hey, I'm Folio. I know every project here. Tell me what you're looking for and I'll point you to the right ones, or say 'tour' and I'll walk the whole page.",
    "Welcome. I can shortlist the three strongest projects for what you care about, walk you through a case study, or just answer anything. What's useful?",
    "Pick a project, ask for a hiring shortlist, or say 'tour' and I'll guide you through. I have opinions about all of this.",
  ])
  if (path === '/work') return pick([
    "Full archive, 34 projects. I can filter by discipline, recommend a shortlist, or walk you through the categories. What are you looking for?",
    "This is everything. Six disciplines, from fintech to light sculptures. Say 'tour' and I'll explain each one, or just tell me what you care about.",
  ])
  if (path === '/about') {
    if (section === 'skills') return "Those tools? They're not decorative. Ask me how any of them gets used in a real shipped project."
    if (section === 'experience') return "Want the real story behind any of these roles? The Mentra and ZentiPay ones are the most interesting."
    if (section === 'practices') return "100 days of poems, 100 days of sketches, 45 podcast episodes. These explain where the consistency comes from. Ask me about any of them."
    return pick([
      "This is the person behind the work. I can tell you about the roles, the tools, the practices, or just what makes Parth different. What's useful?",
      "Resume, tools, daily practices, it's all here. Say 'tour' and I'll walk it, or ask me anything specific.",
    ])
  }

  if (path === '/writing' || path.startsWith('/writing/')) return "These are Parth's articles. Each one comes from a real project decision. Ask me about any of them, or ask for the best one."

  const cat = categories.find(c => path === `/${c.slug}`)
  if (cat) return `${cat.title} ${cat.titleAccent}. I know every project here, ask about any of them or say 'tour' for the guided version.`

  const slug = path.replace(/^\//, '')
  const p = projectIndex.get(slug)
  if (p?.deep) return `${p.deep.oneLiner} Say 'tour' and I'll walk the case study, or ask about the challenge, process, or why it matters.`
  if (p) return `**${p.name}**, ${p.desc}. Ask me anything or say 'tour' for the walkthrough.`

  return "Hey, ask me about any project."
}

/* ── Dynamic chips ─────────────────────────────────────── */

export function getDynamicChips(path: string, qCount: number, lastSlug?: string, ctx?: ChatContext): string[] {
  const section = detectSection()
  const slug = path.replace(/^\//, '')
  const p = projectIndex.get(slug) || (lastSlug ? projectIndex.get(lastSlug) : undefined)
  const persona = ctx?.persona || 'unknown'
  const scrollDepth = ctx?.scrollDepth || 0
  const timeOnPage = ctx?.timeOnPage || 0
  const visited = ctx?.visitHistory || []

  // Deep in conversation + on a project
  if (qCount > 4 && p) {
    const chips = ['Why it matters', 'Related work', 'Surprising fact']
    chips.push(persona === 'recruiter' || persona === 'hm' ? 'Role fit' : 'Hire Parth')
    if (timeOnPage > 120) chips.push('Export summary')
    return chips.slice(0, 4)
  }

  // Deep in conversation, no project
  if (qCount > 4) {
    const chips = ['Best project', 'Something unexpected']
    if (visited.length > 3) {
      const last2 = visited.filter(v => v !== '/' && v !== '/work' && v !== '/about').slice(-2)
      if (last2.length === 2) {
        const a = projectIndex.get(last2[0].replace(/^\//, ''))
        const b = projectIndex.get(last2[1].replace(/^\//, ''))
        if (a && b) chips.push(`Compare ${a.name} and ${b.name}`)
      }
    }
    chips.push('Contact')
    return chips.slice(0, 4)
  }

  // On a project page with deep story
  if (p?.deep) {
    if (scrollDepth > 80) return ['Key insight', 'Related work', 'Why it matters', 'Export summary']
    if (section === 'overview') return ['The real challenge', 'Key insight', 'How it was built', 'Team']
    if (section === 'process') return ['Why this approach?', 'What surprised you?', 'Outcome', 'Related']
    if (section === 'cta') return ['Similar work', 'Best project overall', 'Hire Parth', 'Surprising fact']
    return ['The challenge', 'Key insight', 'Your take on it', 'Related work']
  }
  if (p) return [`More on ${p.name}`, 'Similar projects', 'Best work', 'Contact']

  const cat = categories.find(c => path === `/${c.slug}`)
  if (cat) return [`Best ${cat.title} project`, 'Design approach', 'All categories', 'Contact']

  if (path === '/') {
    if (persona === 'recruiter' || persona === 'hm') return ['Hiring shortlist', 'Role fit', 'Best research process', 'Most ambitious project']
    return ['Hiring shortlist', 'Most ambitious project', 'Best research process', 'Creative range']
  }
  if (path === '/work') return ['Start with three projects', 'AI work', 'Best research process', 'Creative range']
  if (path === '/about') {
    if (section === 'skills') return ['How he uses Figma', 'Code + design?', 'Favorite tool', 'Physical work']
    if (section === 'experience') return ['Best role?', 'Mentra story', 'ZentiPay story', 'Teaching at NYU']
    if (section === 'practices') return ['Why poetry?', 'The podcast', 'Sketching habit', 'Fun facts']
    if (persona === 'recruiter' || persona === 'hm') return ['Role fit', 'Can he code too?', 'Mentra story', 'Contact']
    return ['What kind of roles fit him?', 'Can he code too?', 'Daily practices', 'Contact']
  }
  return ['Best projects', 'About Parth', 'Hidden gem', 'Hire Parth']
}

/* ── Context ───────────────────────────────────────────── */

export type Persona = 'recruiter' | 'hm' | 'peer' | 'founder' | 'student' | 'unknown'

export interface ChatContext {
  route: string
  lastProject?: string
  mentionedProjects: string[]
  questionCount: number
  lastTopic?: string
  // Phase 1: behavioral signals
  scrollDepth: number
  timeOnPage: number
  visitHistory: string[]
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  persona: Persona
}

export function createContext(route: string): ChatContext {
  return {
    route,
    mentionedProjects: [],
    questionCount: 0,
    scrollDepth: 0,
    timeOnPage: 0,
    visitHistory: [],
    persona: 'unknown',
  }
}

export function getProjectNarrative(slug: string) {
  const project = projectIndex.get(slug)
  if (!project) return undefined

  return {
    name: project.name,
    link: project.link,
    deep: project.deep,
  }
}

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
  // Where to start / hiring shortlist — persona-aware
  { patterns: [/(?:hiring shortlist|recruiter|hiring manager|where should i start|what should i start with|start with three|shortlist)/i],
    handler: (_, ctx) => {
      const visited = new Set(ctx.visitHistory.map(v => v.replace(/^\//, '')))
      const unseen = (slug: string) => !visited.has(slug)

      if (ctx.persona === 'founder') {
        return "For a founder evaluating 0→1 ownership:\n\n• **[Mentra](/mentra)**, full platform from scratch, OS + app + app store.\n• **[Clawed](/clawed-chat)**, AI trust architecture designed and shipped.\n• **[ZentiPay](/zentipay)**, founding designer, research to shipped product."
      }
      if (ctx.persona === 'peer') {
        const picks = [
          unseen('jugalbandi') ? '• **[Jugalbandi](/jugalbandi)**, neural network that duets with humans, Maker Faire.' : '• **[Enigma](/enigma)**, 200-neuron light sculpture at NIME.',
          unseen('keyboard-project') ? '• **[BreakGen](/keyboard-project)**, AI platform that fabricates custom keyboards.' : '• **[Making of Time](/making-of-time)**, sundial to software clock.',
          '• **[Mentra](/mentra)**, the systems ambition piece, full OS design.',
        ]
        return "For creative range:\n\n" + picks.join('\n')
      }
      // Default / recruiter / hm
      const picks = [
        unseen('mentra') ? '• **[Mentra](/mentra)** for systems ambition, full OS, companion app, and app store.' : '• **[ExecutiveLens](/executivelens)** for AI meeting intelligence, 87% adoption.',
        unseen('zentipay') ? '• **[ZentiPay](/zentipay)** for research rigor and trust-driven fintech thinking.' : '• **[TransFi](/transfi-project)** for scale, $50M+ monthly, 6 countries.',
        unseen('jugalbandi') ? '• **[Jugalbandi](/jugalbandi)** for creative range beyond product UI.' : '• **[Clawed](/clawed-chat)** for AI trust architecture.',
      ]
      return "Start with these three:\n\n" + picks.join('\n')
    }
  },

  // Best research process
  { patterns: [/(?:best research|research process|research rigor|strongest research)/i],
    handler: () => "If you care about research depth, start with **[ZentiPay](/zentipay)**. The fee-anxiety insight is sharp and commercially real.\n\nThen look at **[Raahi](/raahi-project)** for embodied field research and accessibility thinking."
  },

  // Creative range
  { patterns: [/(?:creative range|experimental|unexpected|show me something different|range)/i],
    handler: () => "For range: **[Jugalbandi](/jugalbandi)**, **[Enigma](/enigma)**, and **[BreakGen](/keyboard-project)**.\n\nThat trio makes the point fast: product systems, physical computing, and fabrication all live in the same practice."
  },

  // Most ambitious
  { patterns: [/(?:most ambitious|biggest swing|highest ambition|largest scope)/i],
    handler: () => "**[Mentra](/mentra)**. Designing an OS for smart glasses, plus the companion app and app store, is the biggest systems problem in the portfolio."
  },

  // Role fit — evidence-based with honest gaps
  { patterns: [/(?:what kind of roles|where would he fit|what should i hire him for|best fit|role fit|design systems role|senior product|staff designer|0.to.1|design engineer role)/i],
    handler: (match) => {
      const q = (match.input || '').toLowerCase()

      if (/design system/i.test(q)) {
        return "**Design systems fit:** Strong. ZentiPay had a 140-component Figma system. Mentra required a cross-platform design language (glasses + phone + web). Butler's Slice (400+ glyphs) shows systematic precision.\n\n**Gap:** He hasn't worked on a design system as a standalone product, his systems work is always embedded in product design."
      }
      if (/0.to.1|founding|early.stage|startup/i.test(q)) {
        return "**0→1 fit:** Very strong. ZentiPay (founding designer, built from scratch), Mentra (first-ever smart glasses app store), Clawed (AI trust model from zero).\n\nThe pattern: he doesn't wait for specs, he defines the product shape."
      }
      if (/staff|principal|lead/i.test(q)) {
        return "**Senior/Staff fit:** Led design at TransFi (6 markets, design team). Head of UI/UX at Mentra (full platform ownership). The portfolio shows IC depth AND the ability to set direction for a team.\n\n**Gap:** Hasn't managed a design team larger than 3."
      }

      return "Best fit: design engineer or senior product designer in AI, wearables, developer tools, fintech, or 0→1 teams.\n\nEvidence: systems thinking (Mentra OS), research rigor (ZentiPay), technical depth (React, Arduino, Swift). The throughline is closing the gap between concept and shipped product.\n\n**Gap:** Less experience in enterprise B2B SaaS at scale."
    }
  },

  // Design + code
  { patterns: [/(?:can he code|does he code|code too|design and build|build too|engineering depth)/i],
    handler: () => "Yes. React, TypeScript, Python, Swift, Arduino, and physical prototyping are all part of the practice.\n\nThe useful distinction is that Parth doesn't just hand off polished files, he can prototype the product logic, interaction edge cases, and physical behavior too."
  },

  // Greeting
  { patterns: [/^(hi|hello|hey|sup|yo|howdy|hiya|what'?s up|heya|good\s)/i],
    handler: (_, ctx) => {
      if (ctx.questionCount > 0) return "What else?"
      const p = cp(ctx)
      if (p?.deep) return `${p.deep.oneLiner}\n\nWant the challenge or the insight?`
      return "Ask where to start, open a project, or tell me what you want to understand."
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
  { patterns: [/(?:related|similar|like this|connected|see also|more like)/i],
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

  // Compare — synthesis, not just side-by-side
  { patterns: [/(?:compare|difference|vs|versus)/i],
    handler: (match, ctx) => {
      const t = (match.input || '').toLowerCase()
      const found: ProjectInfo[] = []
      for (const [, info] of projectIndex) { if (t.includes(info.name.toLowerCase()) && !found.includes(info)) found.push(info); if (found.length >= 2) break }

      // If no projects named, suggest comparing last two visited
      if (found.length < 2) {
        const projectSlugs = ctx.visitHistory
          .map(v => v.replace(/^\//, ''))
          .filter(s => projectIndex.has(s))
        const unique = [...new Set(projectSlugs)].slice(-2)
        for (const s of unique) { const p = projectIndex.get(s); if (p && !found.includes(p)) found.push(p) }
      }

      if (found.length >= 2) {
        const a = found[0], b = found[1]
        let r = `**${a.name}**, ${a.deep?.oneLiner || a.desc}\n\n**${b.name}**, ${b.deep?.oneLiner || b.desc}`

        if (a.deep && b.deep) {
          // Find cross-threads
          const sharedConnections = (a.deep.connectedTo || []).filter(s => (b.deep?.connectedTo || []).includes(s))
          const sameCategory = a.categorySlug === b.categorySlug

          if (sameCategory) {
            r += `\n\nBoth are **${a.category}** work but test different muscles. ${a.name} approaches it through ${a.deep.insight.split('.')[0].toLowerCase()}, while ${b.name} approaches it through ${b.deep.insight.split('.')[0].toLowerCase()}.`
          } else if (sharedConnections.length > 0) {
            const shared = projectIndex.get(sharedConnections[0])
            r += `\n\nDifferent domains, shared thread. Both connect to **${shared?.name || sharedConnections[0]}**. The throughline is systems thinking applied to different scales.`
          } else {
            r += `\n\nThis pair shows the range. ${a.name} is ${a.category}, ${b.name} is ${b.category}. Same designer, same rigor, completely different problem spaces.`
          }
        }
        return r
      }
      return "Name two projects and I'll compare them. Or ask to compare the last two you visited."
    }
  },

  // Best / favorite — persona-aware
  { patterns: [/(?:best|favorite|top|flagship|proudest|must.see|recommend)/i],
    handler: (_, ctx) => {
      const cat = categories.find(c => ctx.route.replace(/^\//, '') === c.slug)
      if (cat) { const f = cat.featured; return `**${f.title}**, ${f.desc}\n\n→ [/${f.slug}](/${f.slug})` }

      if (ctx.persona === 'founder') return "If I had to pick three for a founder:\n\n• **[Mentra](/mentra)**, full platform ownership from zero\n• **[Clawed](/clawed-chat)**, AI trust architecture, shipped\n• **[ZentiPay](/zentipay)**, founding designer, research to product\n\nWhich one?"
      if (ctx.persona === 'peer') return "If I had to pick three for creative range:\n\n• **[Jugalbandi](/jugalbandi)**, neural network that duets with humans\n• **[Enigma](/enigma)**, 200-neuron light sculpture\n• **[Mentra](/mentra)**, systems ambition at platform scale\n\nWhich one?"

      return "If I had to pick three:\n\n• **[Mentra](/mentra)**, most ambitious\n• **[ZentiPay](/zentipay)**, best research process\n• **[Jugalbandi](/jugalbandi)**, strongest creative range\n\nWhich one?"
    }
  },

  // Underrated / hidden gem — editorial picks
  { patterns: [/(?:underrated|hidden gem|overlooked|sleeper|what.*miss|editorial|most people skip)/i],
    handler: () => "**[Raahi](/raahi-project)** is the one most people skip. It's filed under civic design, but the service design thinking, spanning app, kiosk, and in-vehicle screens across 8 transport modes, is the most systems-complete project outside the flagship work.\n\nAlso: **[Enigma](/enigma)**. Most AI visualization is charts. This makes you *feel* what a neural network does."
  },

  // Single best project
  { patterns: [/(?:if you had to pick one|one project|single project|best single|just one)/i],
    handler: (_, ctx) => {
      if (ctx.persona === 'founder') return "**[Mentra](/mentra)**. Designing an entire OS, companion app, and app store for a device that doesn't have established design patterns. That's the hardest systems problem here."
      if (ctx.persona === 'peer') return "**[Jugalbandi](/jugalbandi)**. Two strangers collaborate through sound without speaking. If the interaction needs instructions, it failed. That's a design philosophy, not just a project."
      return "**[Mentra](/mentra)**. Full platform from scratch, $299 launch, 88% pre-orders. It proves systems thinking, research depth, and shipping under real hardware constraints."
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

  // Export summary
  { patterns: [/(?:send.*summary|export summary|share.*summary|clipboard|copy.*summary|email.*summary|mailto|summary for)/i],
    handler: (_, ctx) => {
      const discussed = [...new Set(ctx.mentionedProjects)].map(s => projectIndex.get(s)).filter((p): p is ProjectInfo => !!p)
      const visited = [...new Set(ctx.visitHistory.map(v => v.replace(/^\//, '')).filter(s => projectIndex.has(s)))].map(s => projectIndex.get(s)!).filter((p): p is ProjectInfo => !!p)
      const all = [...new Set([...discussed, ...visited])]
      const names = all.length ? all.map(p => p.name).join(', ') : 'Mentra, ZentiPay, Jugalbandi'
      const insights = all.filter(p => p.deep).slice(0, 3).map(p => `• ${p.name}: ${p.deep!.insight.split('.')[0]}.`).join('\n')

      return `[EXPORT]\n**Parth Pawar, Portfolio Summary**\n\n**Projects reviewed:** ${names}\n\n${insights ? `**Key insights:**\n${insights}\n\n` : ''}**Themes:** Systems thinking, research rigor, design-engineering fluency\n**Contact:** ${bio.email}\n**Portfolio:** https://parthpawar.com`
    }
  },

  // Current
  { patterns: [/(?:currently|right now|doing now|working on|current|latest)/i],
    handler: () => `${bio.current}\n\n${bio.status}` },

  // Tools — redirect to project if one is mentioned
  { patterns: [/(?:tools?|skills?|tech|what.*use|figma|react|python|swift|arduino|blender)/i],
    handler: (match, ctx) => {
      const q = (match.input || '').toLowerCase()
      // If the query mentions a specific project, give project-scoped answer
      const mentioned = fuzzyFind(q)
      if (mentioned && mentioned.slug !== ctx.lastProject) {
        ctx.lastProject = mentioned.slug; ctx.mentionedProjects.push(mentioned.slug)
        if (mentioned.deep) return `**${mentioned.name}:** ${mentioned.deep.process}\n\n→ [Read more](${mentioned.link})`
        return `**${mentioned.name}**, ${mentioned.desc}\n\n→ [View](${mentioned.link})`
      }
      // Specific tool queries
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

  // Writing / articles / blog
  { patterns: [/(?:writing|articles?|blog|posts?|essays?|read.*thoughts|published)/i],
    handler: () => "Parth writes about the thinking behind the work. 13 articles so far. Highlights:\n\n• **[Designing for Glance, Not Gaze](/writing/designing-for-glance)**, what works on a 640px display\n• **[Trust Beats Speed](/writing/trust-beats-speed)**, the ZentiPay fee-anxiety story\n• **[The Figma File Is Not the Product](/writing/the-figma-file-is-not-the-product)**, why he codes what he designs\n• **[Strong Opinions on Border-Radius](/writing/four-pixel-border-radius)**, 4px and why\n\n→ [All writing](/writing)"
  },

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

  // Portfolio itself
  { patterns: [/(?:how.*(?:built|made|build).*(?:portfolio|site|website)|portfolio.*(?:stack|tech)|what.*(?:portfolio|site).*(?:built|made))/i],
    handler: () => "This portfolio is React 19 + TypeScript + Tailwind v4 + Vite, deployed on GitHub Pages. The 3D scenes use Three.js. The agent you're talking to is a local rules engine, no API calls, instant responses. Even the ambient sound is procedurally generated with Web Audio API."
  },

  // Location
  { patterns: [/(?:where.*(?:based|located|live)|location|city|remote|sf|san francisco|new york|india)/i],
    handler: () => `San Francisco. Open to SF-based roles, hybrid, or remote for the right team.\n\n${bio.status}`
  },

  // Availability
  { patterns: [/(?:when.*start|availab|notice period|timeline.*hire|start date|ready to)/i],
    handler: () => `Currently at Mentra. Open to conversations about what's next.\n\nBest way: **${bio.email}**`
  },

  // Design philosophy
  { patterns: [/(?:design philosophy|approach to design|design thinking|how.*think.*design|principles)/i],
    handler: () => "Three principles run through the work:\n\n• **Constraint-driven**, the tighter the constraint, the sharper the solution (640px glasses display, $25/month migrant worker fees)\n• **Systems over screens**, design the system first, the screens follow\n• **Ship to learn**, the prototype teaches you what the spec couldn't"
  },

  // Thanks/bye
  { patterns: [/(?:thanks|thank|thx|cheers)/i], handler: () => pick(["Sure thing.", "Anytime."]) },
  { patterns: [/(?:bye|goodbye|see ya|later|peace)/i], handler: () => `Later! **${bio.email}** if you want to connect.` },
]

const fallbacks = [
  "Ask about a specific project like Mentra, ZentiPay, or Clawed. That is where the useful detail is.",
  "Ask where to start, ask for a shortlist, or open a project and I will keep it concrete.",
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
        // After answering, naturally suggest a connection — contextual phrasing
        let finalText = text
        const p = cp(ctx)
        if (p?.deep && ctx.questionCount > 1 && ctx.lastTopic && Math.random() > 0.4) {
          const rel = getRelated(p).filter(r => !ctx.mentionedProjects.includes(r.slug) && !ctx.visitHistory.includes(`/${r.slug}`))
          if (rel.length) {
            const r = rel[0]
            const phrases: Record<string, string> = {
              challenge: `If the constraint interests you, **[${r.name}](${r.link})** had a similar problem in a different domain.`,
              process: `The process connects to **[${r.name}](${r.link})**, similar systems thinking, different medium.`,
              insight: `That insight carries into **[${r.name}](${r.link})** too.`,
              whyItMatters: `For more on why this matters: **[${r.name}](${r.link})** builds on the same idea.`,
              outcome: `Related outcome story: **[${r.name}](${r.link})**.`,
            }
            finalText += '\n\n' + (phrases[ctx.lastTopic] || `By the way, **[${r.name}](${r.link})** connects to this.`)
          }
        }
        return { text: finalText, chips: getDynamicChips(ctx.route, ctx.questionCount, ctx.lastProject, ctx) }
      }
    }
  }

  const p = fuzzyFind(t)
  if (p) {
    ctx.lastProject = p.slug; ctx.mentionedProjects.push(p.slug)
    const text = p.deep ? p.deep.oneLiner + `\n\n→ [Case study](${p.link})` : `**${p.name}**, ${p.desc}\n\n→ [View](${p.link})`
    return { text, chips: getDynamicChips(ctx.route, ctx.questionCount, p.slug, ctx) }
  }

  return { text: pick(fallbacks), chips: getDynamicChips(ctx.route, ctx.questionCount, undefined, ctx) }
}
