/**
 * Central project registry — single source of truth.
 *
 * To add a new project:
 *  1. Add an entry here
 *  2. Create the page component in src/pages/projects/
 *  3. Done — routes, cards, and listings are auto-generated.
 *
 * To mark a project as NDA:
 *  Set `nda: true`.
 *  Detailed content is excluded from public production builds unless
 *  `VITE_ENABLE_NDA_DETAILS=true` is set for an internal preview build.
 */

export interface Project {
  /** URL slug — becomes the route path */
  slug: string
  /** Display name */
  name: string
  /** Card thumbnail image */
  image: string
  /** Category tag shown on card (uppercase) */
  tag: string
  /** Year or year range */
  year: string
  /** One-line description for card marquee / meta */
  desc: string
  /** Category key for filtering */
  category: ProjectCategory
  /** Lazy import factory for the page component */
  page: () => Promise<{ default: React.ComponentType }>
  /** Mark as NDA / password-protected */
  nda?: boolean
  /** Show in featured grid on homepage */
  featured?: boolean
  /** Featured order (lower = first) */
  featuredOrder?: number
  /** Archive order on homepage (lower = first) */
  archiveOrder?: number
  /** Hide from work page entirely */
  hidden?: boolean
  /** Loading priority */
  loading?: 'eager' | 'lazy'
  /** Quality tier: s=flagship, a=strong, b=good, c=thin, d=filler */
  tier?: 's' | 'a' | 'b' | 'c' | 'd'
}

export type ProjectCategory = 'ux' | 'ai' | 'creative' | 'install' | 'brand' | 'good'

export interface CategoryFilter {
  key: string
  label: string
}

export const CATEGORIES: CategoryFilter[] = [
  { key: 'all', label: 'All' },
  { key: 'ux', label: 'UX Design' },
  { key: 'good', label: 'Design for Good' },
  { key: 'ai', label: 'AI & Wearables' },
  { key: 'creative', label: 'Creative Tech' },
  { key: 'install', label: 'Installations' },
  { key: 'brand', label: 'Brand & Visual' },
]

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  ux: 'UX Design',
  ai: 'AI & Wearables',
  creative: 'Creative Technology',
  install: 'Installations',
  brand: 'Brand & Visual',
  good: 'Design for Good',
}

/* ──────────────────────────────────────────────────────────────────────
   Project Registry
   ────────────────────────────────────────────────────────────────────── */

const IMG = '/Assets/images'

export const projects: Project[] = [
  /* ── Featured (homepage hero grid) ── */
  {
    slug: 'mentra',
    name: 'Mentra',
    image: '/Assets/images/mentra/render-transparent.png',
    tag: 'AI WEARABLES',
    year: '2025–Present',
    desc: 'Designed the OS, companion app, and app store for AI smart glasses shipping at $299',
    category: 'ux',
    page: () => import('../pages/projects/MentraPage'),
    featured: true,
    featuredOrder: 1,
    loading: 'eager',
    tier: 's',
  },
  {
    slug: 'mentra-miniapps',
    name: 'MiniApps in OS',
    image: '/Assets/images/mentra/appstore-hero.png',
    tag: 'PLATFORM DESIGN',
    year: '2025\u201326',
    desc: 'First app store for smart glasses \u2014 voice-first discovery, intent-based browsing, developer SDK',
    category: 'ai',
    page: () => import('../pages/projects/MentraMiniAppsPage'),
    archiveOrder: 2,
    tier: 'a',
  },
  {
    slug: 'transfi-project',
    name: 'TransFi',
    image: `${IMG}/transfi.jpg`,
    tag: 'WEB3 PAYMENTS',
    year: '2023',
    desc: 'Redesigned crypto payment rails across 6 Asian markets, $50M+ monthly volume',
    category: 'ux',
    page: () => import('../pages/projects/TransfiPage'),
    featured: true,
    featuredOrder: 2,
    nda: true,
    loading: 'eager',
    tier: 's',
  },
  {
    slug: 'zentipay',
    name: 'ZentiPay',
    image: `${IMG}/zentipay.png`,
    tag: 'FINTECH',
    year: '2025',
    desc: 'Built a fintech super-app from scratch — 30% higher transaction completion',
    category: 'ux',
    page: () => import('../pages/projects/ZentipayPage'),
    nda: true,
    archiveOrder: 2,
    tier: 'a',
    loading: 'eager',
  },
  {
    slug: 'clawed-chat',
    name: 'Clawed',
    image: '/Assets/Projects/Clawed.chat/claw-3d.png',
    tag: 'AI ASSISTANT',
    year: '2026',
    desc: 'AI assistant with receipts for every action — safety-first on glasses and web',
    category: 'ai',
    page: () => import('../pages/projects/ClawedChatPage'),
    featured: true,
    featuredOrder: 3,
    tier: 's',
  },

  /* ── UX Design ── */
  {
    slug: 'executivelens',
    name: 'ExecutiveLens',
    image: `${IMG}/executivelens.png`,
    tag: 'AI ANALYTICS',
    year: '2025–26',
    desc: 'Saved executives 5.2 hrs/week with AI meeting intelligence — 87% adoption in 2 weeks',
    category: 'ux',
    page: () => import('../pages/projects/ExecutiveLensPage'),
    archiveOrder: 1,
    tier: 'a',
  },
  {
    slug: 'org-dashboard',
    name: 'OrgDashboard',
    image: `${IMG}/org-dashboard.png`,
    tag: 'B2B SAAS',
    year: '2026',
    desc: 'SaaS giving AI agents organizational context — dual-user admin and agent design',
    category: 'ux',
    page: () => import('../pages/projects/OrgDashboardPage'),
    archiveOrder: 21,
    tier: 'b',
  },
  {
    slug: 'cuetv',
    name: 'CueTV',
    image: `${IMG}/cuetv.jpg`,
    tag: 'PRODUCT DESIGN',
    year: '2022',
    desc: 'OTT platform with a retargeting system generating 30K+ ad variations',
    category: 'ux',
    page: () => import('../pages/projects/CueTvPage'),
    nda: true,
    archiveOrder: 9,
    tier: 'c',
  },
  {
    slug: 'healthapp',
    name: 'Health App',
    image: '/Assets/Projects/health-app/photos/home-screen.png',
    tag: 'UX DESIGN',
    year: '2024',
    desc: 'Reimagining Google Tasks with health integration — productivity meets personal well-being',
    category: 'ux',
    page: () => import('../pages/projects/HealthAppPage'),
    nda: true,
    archiveOrder: 23,
    tier: 'c',
  },
  {
    slug: 'ibm',
    name: 'IBM Cancer Prognosis',
    image: '/Assets/Projects/CancerPrognosis/photos/hero-illustration.png',
    tag: 'HEALTHCARE AI',
    year: '2020',
    desc: 'Secure genomic data transfer to identify life expectancy of cancer patients',
    category: 'ux',
    page: () => import('../pages/projects/IbmPage'),
    archiveOrder: 25,
    tier: 'c',
  },

  /* ── AI & Wearables ── */
  {
    slug: 'ballah-code',
    name: 'Ballah Code',
    image: `${IMG}/ballah-code.png`,
    tag: 'AI DEV TOOLS',
    year: '2026',
    desc: 'AI-native IDE treating AI as a senior engineer — designed the UX for 17 production tools',
    category: 'ai',
    page: () => import('../pages/projects/BallahCodePage'),
    archiveOrder: 17,
    tier: 'b',
  },
  {
    slug: 'oncall-lens',
    name: 'OnCall Lens',
    image: `${IMG}/oncall-lens.png`,
    tag: 'AI WEARABLE',
    year: '2026',
    desc: 'Sentry alert → Claude analysis → auto PR fix via smart glasses — built in 24 hours',
    category: 'ai',
    page: () => import('../pages/projects/OnCallLensPage'),
    archiveOrder: 19,
    tier: 'c',
  },
  {
    slug: 'ai-voice',
    name: 'AI Voice',
    image: '/Assets/Projects/ai-voice/photos/voice-dna-builder.png',
    tag: 'CONVERSATIONAL AI',
    year: '2025',
    desc: 'Enterprise voice selection with emotional intelligence — A/B tested with 7 users',
    category: 'ai',
    page: () => import('../pages/projects/AiVoicePage'),
    nda: true,
    archiveOrder: 32,
    tier: 'b',
  },

  /* ── Design for Good ── */
  {
    slug: 'raahi-project',
    name: 'Raahi',
    image: `${IMG}/raahi.jpg`,
    tag: 'CIVIC DESIGN',
    year: '2022',
    desc: 'Service design for Pune public transit — app, kiosk, and in-vehicle systems',
    category: 'good',
    page: () => import('../pages/projects/RaahiPage'),
    archiveOrder: 5,
    tier: 'a',
  },
  {
    slug: 'the-point-cdc',
    name: 'The Point CDC',
    image: '/Assets/Projects/ThePointCDC/photos/homepage-hero.png',
    tag: 'COMMUNITY',
    year: '2024',
    desc: 'Redesigned digital platform for a Bronx community development nonprofit',
    category: 'good',
    page: () => import('../pages/projects/ThePointCdcPage'),
    archiveOrder: 7,
    tier: 'b',
  },
  {
    slug: 'office-of-diversity',
    name: 'Office of Diversity',
    image: '/Assets/Projects/office-of-diversity/photos/responsive-preview.png',
    tag: 'EDUCATION',
    year: '2024',
    desc: 'Interactive IDBEA report for NYU Tisch — WCAG 2.1 AA accessible',
    category: 'good',
    page: () => import('../pages/projects/OfficeOfDiversityPage'),
    archiveOrder: 30,
    tier: 'c',
  },

  /* ── Creative Technology ── */
  {
    slug: 'jugalbandi',
    name: 'Jugalbandi',
    image: '/Assets/Projects/Jugalbandi/Photos/538A3938_nsquare_23.png',
    tag: 'ML + MUSIC',
    year: '2024',
    desc: 'Neural network instrument that duets with human musicians — Maker Faire 2024',
    category: 'creative',
    page: () => import('../pages/projects/JugalbandiPage'),
    featured: true,
    featuredOrder: 4,
    tier: 's',
  },
  {
    slug: 'keyboard-project',
    name: 'BreakGen',
    image: '/Assets/Projects/Keyboard/photos/keyboard-data-hero.png',
    tag: 'ITP THESIS',
    year: '2025',
    desc: 'AI platform that turns text prompts into fabrication-ready custom keyboards — 200+ visitors',
    category: 'creative',
    page: () => import('../pages/projects/KeyboardProjectPage'),
    archiveOrder: 3,
    tier: 'a',
  },
  {
    slug: 'vj-software',
    name: 'VJ Software',
    image: `${IMG}/vj.jpg`,
    tag: 'UX DESIGN',
    year: '2022',
    desc: 'Audio-reactive visual performance tool — 5 competitor analysis, 2 personas',
    category: 'ux',
    page: () => import('../pages/projects/VjSoftwarePage'),
    archiveOrder: 18,
    tier: 'b',
  },
  {
    slug: 'enigma',
    name: 'Enigma',
    image: `${IMG}/enigma.jpg`,
    tag: 'DEEP LEARNING',
    year: '2023',
    desc: '200-neuron light sculpture visualizing a functioning neural network',
    category: 'creative',
    page: () => import('../pages/projects/EnigmaPage'),
    archiveOrder: 10,
    tier: 'a',
  },
  {
    slug: 'shuffle',
    name: 'Shuffle',
    image: `${IMG}/shuffle.jpg`,
    tag: 'INTERACTIVE',
    year: '2024',
    desc: 'Weight-sensor LED grid where players compete through physical strategy',
    category: 'creative',
    page: () => import('../pages/projects/ShufflePage'),
    archiveOrder: 12,
    tier: 'b',
  },
  {
    slug: 'making-of-time',
    name: 'Making of Time',
    image: '/Assets/Projects/making-of-time/photos/blue-dial-hero.png',
    tag: 'PHYSICAL COMPUTING',
    year: '2024',
    desc: 'Sundial → mechanical watch → software clock — building three ways to measure time',
    category: 'creative',
    page: () => import('../pages/projects/MakingOfTimePage'),
    archiveOrder: 13,
    tier: 'b',
  },
  {
    slug: 'sea-of-salt',
    name: 'Why the Sea is Salt',
    image: '/Assets/Projects/sea-of-salt/photos/salt-ground.jpg',
    tag: 'STORYTELLING MACHINE',
    year: '2024',
    desc: 'A salt mill grinds real salt as you advance through a Norse folktale — story as physical material',
    category: 'creative',
    page: () => import('../pages/projects/SeaOfSaltPage'),
    archiveOrder: 22,
    tier: 'b',
  },

  {
    slug: 'flow-fields',
    name: 'Flow Fields',
    image: `${IMG}/flow-fields.svg`,
    tag: 'GENERATIVE ART',
    year: '2024',
    desc: 'Perlin noise flow fields — 2000 particles creating organic, ever-changing patterns',
    category: 'creative',
    page: () => import('../pages/projects/CanvasForCodersPage'),
    archiveOrder: 14,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'embodied-web',
    name: 'Embodied Web',
    image: `${IMG}/embodied-web.svg`,
    tag: 'WEB EXPERIMENTS',
    year: '2023',
    desc: 'Browser experiments using the body as input — webcam, motion sensors, spatial audio',
    category: 'creative',
    page: () => import('../pages/projects/EmbodiedWebPage'),
    archiveOrder: 33,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'feeling-patterns',
    name: 'Feeling Patterns',
    image: `${IMG}/feeling-patterns.svg`,
    tag: 'WEARABLE HAPTICS',
    year: '2023',
    desc: 'Textile interfaces translating emotion into tactile patterns — haptic vests & pressure fabrics',
    category: 'creative',
    page: () => import('../pages/projects/FeelingPatternsPage'),
    archiveOrder: 34,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'performance-by-design',
    name: 'Performance by Design',
    image: `${IMG}/drowning.jpg`,
    tag: 'EXPERIENCE DESIGN',
    year: '2023',
    desc: 'Designing invisible systems for live performance — lighting, spatial audio, audience flow',
    category: 'creative',
    page: () => import('../pages/projects/PerformanceByDesignPage'),
    archiveOrder: 35,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'on-becoming',
    name: 'On Becoming',
    image: `${IMG}/on-becoming.svg`,
    tag: 'WRITING',
    year: '2024',
    desc: 'A reflective design journal on identity, craft, and evolving from designer to design engineer',
    category: 'creative',
    page: () => import('../pages/projects/OnBecomingPage'),
    archiveOrder: 36,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'storytelling',
    name: 'Storytelling',
    image: `${IMG}/storytelling.svg`,
    tag: 'NARRATIVE DESIGN',
    year: '2025',
    desc: 'How structure, pacing, and medium shape the stories products tell',
    category: 'creative',
    page: () => import('../pages/projects/StorytellingPage'),
    archiveOrder: 37,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'dna-speculative',
    name: 'DNA: Speculative Design',
    image: '/Assets/Projects/DNA/photos/boxes-closed.png',
    tag: 'BIOART',
    year: '2024',
    desc: 'Would you take a pill to live forever? Speculative pharmaceutical packaging exploring immortality and mortality',
    category: 'creative',
    page: () => import('../pages/projects/DnaPage'),
    archiveOrder: 38,
    tier: 'c',
  },
  {
    slug: 'comp-media',
    name: 'Computational Media',
    image: `${IMG}/comp-media.svg`,
    tag: 'CREATIVE CODING',
    year: '2023',
    desc: 'Weekly p5.js sketches — generative portraits, data landscapes, interactive typography',
    category: 'creative',
    page: () => import('../pages/projects/IntroCompMediaPage'),
    archiveOrder: 38,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'hypercinema',
    name: 'Hypercinema',
    image: `${IMG}/hypercinema.svg`,
    tag: 'IMMERSIVE MEDIA',
    year: '2023',
    desc: '360° documentary, spatial sound walk, and multi-screen interactive projection',
    category: 'creative',
    page: () => import('../pages/projects/HypercinemaPage'),
    archiveOrder: 39,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'applications',
    name: 'Applications',
    image: `${IMG}/applications.svg`,
    tag: 'FULL-STACK',
    year: '2023',
    desc: 'Shipped two deployed web apps — collaborative storytelling + campus mood mapping',
    category: 'creative',
    page: () => import('../pages/projects/ApplicationsPage'),
    archiveOrder: 40,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'messy-humans',
    name: 'Designing for Messy Humans',
    image: `${IMG}/messy-humans.svg`,
    tag: 'INCLUSIVE DESIGN',
    year: '2023',
    desc: 'Inclusive design research — edge cases, emotional states, and the humans personas miss',
    category: 'good',
    page: () => import('../pages/projects/MessyHumansPage'),
    archiveOrder: 41,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'production-studio',
    name: 'Production Studio',
    image: `${IMG}/black-hole.jpg`,
    tag: 'TEAM LEADERSHIP',
    year: '2024',
    desc: 'Led a 5-person team from concept to ITP Winter Show — scope, stakeholders, shipping',
    category: 'creative',
    page: () => import('../pages/projects/ProductionStudioPage'),
    archiveOrder: 42,
    tier: 'd',
    hidden: true,
  },

  {
    slug: 'arcade-lab',
    name: 'Arcade Lab',
    image: '/Assets/Projects/the-omakase/photos/cabinet-front.png', // shares image with Omakase (it's the ancestor)
    tag: 'GAME PROTOTYPING',
    year: '2023',
    desc: 'Rapid game experiments — physical controllers & party mechanics leading to The Omakase',
    category: 'install',
    page: () => import('../pages/projects/ArcadeLabPage'),
    archiveOrder: 27,
    tier: 'd',
    hidden: true,
  },

  /* ── Installations ── */
  {
    slug: 'black-hole',
    name: 'Black Hole',
    image: `${IMG}/black-hole.jpg`,
    tag: 'SCIENCE + FABRICATION',
    year: '2026',
    desc: 'Five physical models of black hole phenomena — exhibited at Horological Society of NY',
    category: 'install',
    page: () => import('../pages/projects/BlackHolePage'),
    archiveOrder: 2,
    tier: 'a',
  },
  {
    slug: 'uv-light',
    name: 'UV Light',
    image: `${IMG}/uv-light.jpg`,
    tag: 'LIGHT ART',
    year: '2023',
    desc: 'Multi-room blacklight installation with hidden messages and live projection',
    category: 'install',
    page: () => import('../pages/projects/UvLightPage'),
    archiveOrder: 8,
    tier: 'b',
  },
  {
    slug: 'the-omakase',
    name: 'The Omakase',
    image: '/Assets/Projects/the-omakase/photos/cabinet-front.png',
    tag: 'ARCADE GAME',
    year: '2024',
    desc: '2-player sushi arcade cabinet — custom RGB controllers, exhibited at ITP + WonderVille',
    category: 'install',
    page: () => import('../pages/projects/TheOmakasePage'),
    archiveOrder: 20,
    tier: 'a',
  },
  {
    slug: 'revolving-stage',
    name: 'Revolving Stage',
    image: `${IMG}/revolving-stage.jpg`,
    tag: 'FABRICATION',
    year: '2022',
    desc: '15 ft. rotating stage supporting 250+ kgs — engineered for live theatre',
    category: 'install',
    page: () => import('../pages/projects/RevolvingStagePage'),
    archiveOrder: 11,
    tier: 'b',
  },
  {
    slug: 'moniac-machine',
    name: 'Moniac Machine',
    image: '/Assets/Projects/Moniac/photos/hero-cabinet.png',
    tag: 'GAME DESIGN',
    year: '2024',
    desc: 'Board game based on a 1949 hydraulic economic computer — strategy meets education',
    category: 'install',
    page: () => import('../pages/projects/MoniacMachinePage'),
    archiveOrder: 15,
    tier: 'b',
  },
  {
    slug: 'drowning',
    name: 'Drowning',
    image: `${IMG}/drowning.jpg`,
    tag: 'SCENIC DESIGN',
    year: '2024',
    desc: 'Abandoned greenhouse set for NYU theatre — multi-layer lighting for 100+ audience',
    category: 'install',
    page: () => import('../pages/projects/DrowningPage'),
    archiveOrder: 28,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'sculpture',
    name: 'Sculpture',
    image: '/Assets/Projects/Sculpture/1.jpg',
    tag: 'SCULPTURE',
    year: '2020',
    desc: 'Competition sculptures for Firodia Karandak, Pune',
    category: 'install',
    page: () => import('../pages/projects/SculpturePage'),
    archiveOrder: 31,
    tier: 'd',
    hidden: true,
  },

  /* ── Brand & Visual ── */
  {
    slug: 'mentra-brand',
    name: 'Mentra Brand & Packaging',
    image: '/Assets/Projects/mentra-brand/photos/render-both-frames.png',
    tag: 'BRAND & PACKAGING',
    year: '2025–26',
    desc: 'End-to-end brand identity and packaging for AI smart glasses — logo, box, booklet, ads, and 24 social templates',
    category: 'brand',
    page: () => import('../pages/projects/MentraBrandPage'),
    archiveOrder: 4,
    tier: 'a',
  },
  {
    slug: 'tedx',
    name: 'TEDxVITPune',
    image: `${IMG}/tedx.png`,
    tag: 'ART DIRECTION',
    year: '2021',
    desc: 'Art directed a 65-person team to build a parallax cityscape stage for 800+ attendees',
    category: 'brand',
    page: () => import('../pages/projects/TedxPage'),
    archiveOrder: 6,
    tier: 'a',
  },
  {
    slug: 'code-for-build',
    name: 'Code for Build',
    image: `${IMG}/code-for-build.jpg`,
    tag: 'UX DESIGN',
    year: '2021',
    desc: 'Brand system and developer platform for Istanbul open-source startup',
    category: 'ux',
    page: () => import('../pages/projects/CodeForBuildPage'),
    archiveOrder: 24,
    tier: 'c',
  },
  {
    slug: 'typeface',
    name: "Butler's Slice",
    image: `${IMG}/typeface.jpg`,
    tag: 'TYPE DESIGN',
    year: '2022',
    desc: 'Variable display typeface with geometric slice cuts — 400+ glyphs, 3 weights',
    category: 'brand',
    page: () => import('../pages/projects/TypefacePage'),
    archiveOrder: 16,
    tier: 'b',
  },
  {
    slug: 'atps',
    name: 'ArtTown Podcast',
    image: `${IMG}/atps.png`,
    tag: 'MEDIA',
    year: '2021',
    desc: 'Visual identity and motion graphics for an art and design podcast series',
    category: 'brand',
    page: () => import('../pages/projects/AtpsPage'),
    archiveOrder: 26,
    tier: 'd',
    hidden: true,
  },
  {
    slug: 'vishwaconclave',
    name: 'VishwaConclave',
    image: '/Assets/Projects/VishwaConclave/1.jpg',
    tag: 'CREATIVE DIRECTION',
    year: '2021',
    desc: 'Creative direction, branding, and web design for a student conference',
    category: 'brand',
    page: () => import('../pages/projects/VishwaConclavePage'),
    archiveOrder: 29,
    tier: 'd',
    hidden: true,
  },
]

/* ──────────────────────────────────────────────────────────────────────
   Helper selectors
   ────────────────────────────────────────────────────────────────────── */

/** S-Tier: flagship projects for homepage featured grid */
export const featuredProjects = projects
  .filter(p => p.tier === 's')
  .sort((a, b) => (a.featuredOrder ?? a.archiveOrder ?? 99) - (b.featuredOrder ?? b.archiveOrder ?? 99))

/** A+B Tier: homepage archive (strong + good work) */
export const archiveProjects = projects
  .filter(p => (p.tier === 'a' || p.tier === 'b') && !p.hidden)
  .sort((a, b) => (a.archiveOrder ?? 99) - (b.archiveOrder ?? 99))

/** All projects for the Work page in curated mixed order */
export const allProjectsCurated = (() => {
  // Interleave categories for visual variety
  const byCat: Record<string, Project[]> = {}
  for (const cat of ['ux', 'ai', 'good', 'creative', 'install', 'brand']) {
    byCat[cat] = projects.filter(p => p.category === cat && !p.hidden)
  }
  const order: ProjectCategory[] = ['ux', 'ai', 'ux', 'creative', 'good', 'install', 'ux', 'ai', 'brand', 'ux', 'creative', 'install', 'good', 'ai', 'creative', 'install', 'ux', 'brand', 'install', 'creative', 'good', 'ai', 'ux', 'brand', 'install', 'creative', 'brand', 'creative', 'install', 'ux', 'brand', 'ux', 'install']
  const used = new Set<string>()
  const result: Project[] = []
  for (const cat of order) {
    const next = byCat[cat]?.find(p => !used.has(p.slug))
    if (next) {
      used.add(next.slug)
      result.push(next)
    }
  }
  // Append any remaining
  for (const p of projects) {
    if (!used.has(p.slug) && !p.hidden) {
      used.add(p.slug)
      result.push(p)
    }
  }
  return result
})()

/** Get projects by category */
export function projectsByCategory(cat: ProjectCategory): Project[] {
  return projects.filter(p => p.category === cat && !p.hidden)
}

/** Find a single project by slug */
export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
