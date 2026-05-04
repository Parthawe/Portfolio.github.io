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
  /** Explicitly include in recruiter-facing selected work */
  selected?: boolean
  /** Selected work order (lower = earlier) */
  selectedOrder?: number
  /** Flagship TL;DR: the problem the project solved */
  summaryProblem?: string
  /** Flagship TL;DR: role summary */
  summaryRole?: string
  /** Flagship TL;DR: team summary */
  summaryTeam?: string
  /** Flagship TL;DR: timeline summary */
  summaryTimeline?: string
  /** Flagship TL;DR: primary outcome */
  summaryOutcome?: string
  /** Flagship TL;DR: key artifact image */
  summaryImage?: string
  /** Key artifact alt text */
  summaryImageAlt?: string
  /** Flagship proof stats shown above the full case study */
  summaryStats?: { label: string; value: string }[]
  /** Optional short testimonial or stakeholder quote */
  testimonial?: { quote: string; cite: string }
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

const IMG = '/Portfolio.github.io/Assets/images'

export const projects: Project[] = [
  /* ── Featured (homepage hero grid) ── */
  {
    slug: 'mentra',
    name: 'Mentra',
    image: '/Portfolio.github.io/Assets/images/mentra/render-transparent.webp',
    tag: 'AI WEARABLES',
    year: '2025–Present',
    desc: 'Designed the OS, companion app, and app store for AI smart glasses shipping at $299',
    category: 'ux',
    page: () => import('../pages/projects/MentraPage'),
    featured: true,
    featuredOrder: 1,
    loading: 'eager',
    tier: 's',
    selected: true,
    selectedOrder: 1,
    summaryProblem: 'Smart glasses kept shipping as clever hardware demos without a software ecosystem people would actually return to.',
    summaryRole: 'Head of UI/UX, owning the OS, companion app, miniapp store, and design system.',
    summaryTeam: '1 designer working cross-functionally with 4 engineers, product, and hardware.',
    summaryTimeline: 'Q3 2025–Present',
    summaryOutcome: 'Launched at $299 with onboarding cut from 12 steps to 4 and Batch 2 pre-orders 88% claimed.',
    summaryImage: '/Portfolio.github.io/Assets/images/mentra/appstore-hero.webp',
    summaryImageAlt: 'Mentra companion app and app store interface on mobile and smart glasses.',
    summaryStats: [
      { label: 'Price at launch', value: '$299' },
      { label: 'Batch 2 claimed', value: '88%' },
      { label: 'Setup steps', value: '12→4' },
      { label: 'Design surfaces shipped', value: '5' },
    ],
    testimonial: {
      quote: 'An app store on your face sounds absurd until you use it.',
      cite: 'Early beta tester',
    },
  },
  {
    slug: 'mentra-miniapps',
    name: 'MiniApps in OS',
    image: '/Portfolio.github.io/Assets/images/mentra/appstore-hero.webp',
    tag: 'PLATFORM DESIGN',
    year: '2025\u201326',
    desc: 'First app store for smart glasses \u2014 voice-first discovery, intent-based browsing, developer SDK',
    category: 'ai',
    page: () => import('../pages/projects/MentraMiniAppsPage'),
    archiveOrder: 2,
    tier: 'a',
    selected: true,
    selectedOrder: 6,
    summaryProblem: 'Smart glasses needed an app ecosystem, but phone-style browse patterns collapse when the screen lives in peripheral vision and input is mostly voice.',
    summaryRole: 'Designed the miniapp store, install flows, permissions model, and developer-facing experience inside the broader MentraOS platform.',
    summaryTeam: 'Sole designer partnering with 4 engineers, product, and the MentraOS open-source ecosystem.',
    summaryTimeline: 'Late 2025 to 2026',
    summaryOutcome: 'Turned Mentra from a single-product device into a platform with voice-first discovery, transparent permissions, and a faster path from SDK to shipped app.',
    summaryImage: '/Portfolio.github.io/Assets/images/mentra/appstore-hero.webp',
    summaryImageAlt: 'Mentra miniapp store and companion app surfaces showing voice-first discovery.',
    summaryStats: [
      { label: 'Display canvas', value: '640×400' },
      { label: 'SDK first app', value: '15 min' },
      { label: 'Primary input', value: 'Voice' },
      { label: 'Browse model', value: 'Intent-led' },
    ],
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
    selected: true,
    selectedOrder: 4,
    summaryProblem: 'Cross-border crypto payments were powerful but opaque, slow to onboard, and hostile to non-crypto-native business users.',
    summaryRole: 'Lead Product Designer across dashboard UX, consumer widget flows, design system, and brand.',
    summaryTeam: 'Sole designer partnering with product, founder, and a 6-engineer team.',
    summaryTimeline: '2022–23',
    summaryOutcome: 'Reduced merchant onboarding from 2 weeks to 3 days while the platform scaled to $50M+ monthly volume.',
    summaryImage: '/Portfolio.github.io/Assets/Projects/Transfi/photos/dashboard-detail.png',
    summaryImageAlt: 'TransFi merchant dashboard showing analytics, payment flows, and operational detail.',
    summaryStats: [
      { label: 'Monthly volume', value: '$50M+' },
      { label: 'Markets served', value: '6' },
      { label: 'Onboarding', value: '2wk→3d' },
      { label: 'Self-service rate', value: '75%' },
    ],
    testimonial: {
      quote: 'You are solving a big problem. And Asia is very attractive for us.',
      cite: 'Top 5 DeFi player',
    },
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
    selected: true,
    selectedOrder: 5,
    summaryProblem: 'Cross-border payment users abandoned when fees moved late, language felt foreign, and the product behaved like crypto software instead of a trusted money tool.',
    summaryRole: 'Founding product designer across research, onboarding, information architecture, transaction flows, and the core design system.',
    summaryTeam: 'Sole designer working with product and engineering across web and mobile.',
    summaryTimeline: 'Q2 to Q3 2025',
    summaryOutcome: 'Increased transaction completion by 30% and reduced perceived transfer time by 40% by making pricing, progress, and trust legible earlier.',
    summaryImage: '/Portfolio.github.io/Assets/images/zentipay.webp',
    summaryImageAlt: 'ZentiPay fintech app interface showing transfer, balance, and payment flows.',
    summaryStats: [
      { label: 'Completion lift', value: '+30%' },
      { label: 'Perceived time', value: '-40%' },
      { label: 'Research countries', value: '5' },
      { label: 'Project span', value: '15 wks' },
    ],
  },
  {
    slug: 'clawed-chat',
    name: 'Clawed',
    image: '/Portfolio.github.io/Assets/Projects/Clawed.chat/claw-3d.png',
    tag: 'AI ASSISTANT',
    year: '2026',
    desc: 'AI assistant with receipts for every action — safety-first on glasses and web',
    category: 'ai',
    page: () => import('../pages/projects/ClawedChatPage'),
    featured: true,
    featuredOrder: 3,
    tier: 's',
    selected: true,
    selectedOrder: 3,
    summaryProblem: 'AI assistants lose trust the moment they act confidently without showing what they did or why.',
    summaryRole: 'Sole Product Designer across web hub, smart-glasses experience, receipts, approvals, and launch site.',
    summaryTeam: '1 designer with 3 engineers shipping across web and Mentra integration.',
    summaryTimeline: 'Jan–Mar 2026',
    summaryOutcome: 'Shipped a trust-first AI assistant built around 3-second asks, 5-second results, and 1-tap approvals.',
    summaryImage: '/Portfolio.github.io/Assets/Projects/Clawed.chat/landing-hero.webp',
    summaryImageAlt: 'Clawed assistant launch visual showing the AI assistant experience.',
    summaryStats: [
      { label: 'Ask time target', value: '<3s' },
      { label: 'Result target', value: '<5s' },
      { label: 'Approval model', value: '1 tap' },
      { label: 'Safety modes', value: '3 tiers' },
    ],
    testimonial: {
      quote: 'It is like a volume knob for how much I trust the AI right now.',
      cite: 'Stakeholder feedback during internal review',
    },
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
    selected: true,
    selectedOrder: 2,
    summaryProblem: 'Executives had no system connecting what was said in meetings to the metrics and decisions that moved because of them.',
    summaryRole: 'Sole product designer across meeting capture, dashboard narrative, mobile briefing, and AI trust patterns.',
    summaryTeam: 'Design lead working with product, AI, and engineering partners.',
    summaryTimeline: '2025 to 2026',
    summaryOutcome: 'Closed beta usage showed 87% adoption within 2 weeks and 5.2 hours saved per executive per week.',
    summaryImage: '/Portfolio.github.io/Assets/images/executivelens.webp',
    summaryImageAlt: 'ExecutiveLens dashboard and meeting intelligence interface.',
    summaryStats: [
      { label: 'Meetings analyzed', value: '12,000+' },
      { label: 'Time saved', value: '5.2 hrs/wk' },
      { label: 'Adoption', value: '87%' },
      { label: 'Decision accuracy', value: '94%' },
    ],
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
    summaryProblem: 'Arts streaming audiences browse differently from mainstream OTT audiences, and the platform also needed a growth system that could scale across fragmented segments.',
    summaryRole: 'Product designer across audience research, browsing flows, platform structure, and ad-creative system thinking.',
    summaryTeam: 'Worked with product and growth stakeholders inside a niche streaming context.',
    summaryTimeline: '2022',
    summaryOutcome: 'Combined product design and retargeting logic into a platform strategy that supported discovery and produced 30K+ ad variations.',
    summaryStats: [
      { label: 'Ad variations', value: '30K+' },
      { label: 'Domain', value: 'Arts OTT' },
      { label: 'Focus', value: 'Discovery + growth' },
      { label: 'Year', value: '2022' },
    ],
  },
  {
    slug: 'healthapp',
    name: 'Health App',
    image: '/Portfolio.github.io/Assets/Projects/health-app/photos/home-screen.png',
    tag: 'UX DESIGN',
    year: '2024',
    desc: 'Reimagining Google Tasks with health integration — productivity meets personal well-being',
    category: 'ux',
    page: () => import('../pages/projects/HealthAppPage'),
    nda: true,
    archiveOrder: 23,
    tier: 'c',
    summaryProblem: 'Task managers optimize output, but they rarely account for whether the schedule itself is harmful to the person following it.',
    summaryRole: 'Product designer exploring how wellness signals could reshape planning, prioritization, and daily task flow.',
    summaryTeam: 'Independent product concept with protected case-study details.',
    summaryTimeline: '2024',
    summaryOutcome: 'Reframed productivity as a health-aware system, using planning mechanics that balanced execution with recovery.',
    summaryStats: [
      { label: 'Core bet', value: 'Health-aware tasks' },
      { label: 'Domain', value: 'Wellness + productivity' },
      { label: 'Format', value: 'Product concept' },
      { label: 'Year', value: '2024' },
    ],
  },
  {
    slug: 'ibm',
    name: 'IBM Cancer Prognosis',
    image: '/Portfolio.github.io/Assets/Projects/CancerPrognosis/photos/hero-illustration.png',
    tag: 'HEALTHCARE AI',
    year: '2020',
    desc: 'Secure genomic data transfer to identify life expectancy of cancer patients',
    category: 'ux',
    page: () => import('../pages/projects/IbmPage'),
    archiveOrder: 25,
    tier: 'c',
    summaryProblem: 'Cancer prognosis systems need genomic signal to be useful, but sharing raw patient data creates a serious privacy risk during computation.',
    summaryRole: 'Researcher and engineer working across encrypted system design, data analysis, and the clinical computation pipeline.',
    summaryTeam: 'Research internship at IBM with healthcare and cryptography guidance.',
    summaryTimeline: '8 months in 2020',
    summaryOutcome: 'Explored a homomorphic-encryption workflow that kept genomic data encrypted while still supporting survival prediction and treatment clustering.',
    summaryStats: [
      { label: 'Internship', value: '8 months' },
      { label: 'Domain', value: 'Healthcare AI' },
      { label: 'Core method', value: 'FHE' },
      { label: 'Output', value: 'Survival curves' },
    ],
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
    summaryProblem: 'On-call engineers still lose time to context switching, even when the alert is obvious and the fix could be mostly mechanical.',
    summaryRole: 'Product designer and developer across glasses UX, incident flow, mini-app interface, and demo orchestration.',
    summaryTeam: 'Built with Team SOGA during Daytona HackSprint at Sentry HQ.',
    summaryTimeline: '24 hours in Jan 2026',
    summaryOutcome: 'Shipped an end-to-end demo where a Sentry alert triggered an AI fix pipeline and surfaced approval on smart glasses.',
    summaryStats: [
      { label: 'Build time', value: '24 hrs' },
      { label: 'Event', value: 'HackSprint' },
      { label: 'Interface', value: 'Smart glasses' },
      { label: 'Output', value: 'PR patch' },
    ],
  },
  {
    slug: 'ai-voice',
    name: 'AI Voice',
    image: '/Portfolio.github.io/Assets/Projects/ai-voice/photos/voice-dna-builder.png',
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
    selected: true,
    selectedOrder: 7,
    summaryProblem: 'Pune public transit broke trust across buses, metro, kiosks, and in-vehicle touchpoints, especially for riders who were not already fluent in the system.',
    summaryRole: 'User researcher and UI designer across service design, brand identity, app flows, kiosk UX, and in-vehicle information surfaces.',
    summaryTeam: 'Collaborated with one fellow designer on a self-initiated civic design project.',
    summaryTimeline: '3 months in 2022',
    summaryOutcome: 'Built a connected transit concept that reduced commuter anxiety by treating the journey as one service instead of disconnected tools.',
    summaryImage: '/Portfolio.github.io/Assets/Projects/Raahi/photos/hero-3d.webp',
    summaryImageAlt: 'Raahi hero concept showing transit app, bus, and connected wayfinding system.',
    summaryStats: [
      { label: 'Modes integrated', value: '4' },
      { label: 'Core touchpoints', value: '3' },
      { label: 'Project span', value: '3 mo' },
      { label: 'Design lanes', value: 'Service + UI' },
    ],
  },
  {
    slug: 'the-point-cdc',
    name: 'The Point CDC',
    image: '/Portfolio.github.io/Assets/Projects/ThePointCDC/photos/homepage-hero.png',
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
    image: '/Portfolio.github.io/Assets/Projects/office-of-diversity/photos/responsive-preview.png',
    tag: 'EDUCATION',
    year: '2024',
    desc: 'Interactive IDBEA report for NYU Tisch — WCAG 2.1 AA accessible',
    category: 'good',
    page: () => import('../pages/projects/OfficeOfDiversityPage'),
    archiveOrder: 30,
    tier: 'c',
    summaryProblem: 'Institutional reports often contain important public information, but their PDF-first format makes the content hard to navigate, compare, and trust.',
    summaryRole: 'Designer translating the IDBEA report into an accessible digital experience with clearer structure and interaction.',
    summaryTeam: 'Worked within an NYU Tisch context with accessibility as a core requirement.',
    summaryTimeline: '2024',
    summaryOutcome: 'Turned a static report into a WCAG-aware interactive experience that made the findings easier to explore and absorb.',
    summaryStats: [
      { label: 'Standard', value: 'WCAG 2.1 AA' },
      { label: 'Format shift', value: 'PDF → web' },
      { label: 'Context', value: 'NYU Tisch' },
      { label: 'Year', value: '2024' },
    ],
  },

  /* ── Creative Technology ── */
  {
    slug: 'jugalbandi',
    name: 'Jugalbandi',
    image: '/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/538A3938_nsquare_23.webp',
    tag: 'ML + MUSIC',
    year: '2024',
    desc: 'Neural network instrument that duets with human musicians — Maker Faire 2024',
    category: 'creative',
    page: () => import('../pages/projects/JugalbandiPage'),
    featured: true,
    featuredOrder: 4,
    tier: 's',
    selected: true,
    selectedOrder: 8,
    summaryProblem: 'Most neural network art stays abstract; I wanted people to hear computation through real acoustic mechanisms.',
    summaryRole: 'Artist, interaction designer, fabricator, and builder of the full installation.',
    summaryTeam: 'Solo project with mentorship support through NYU ITP.',
    summaryTimeline: '5 months in 2024',
    summaryOutcome: 'Exhibited at the ITP Spring Show and Maker Faire Coney Island as a playable human-machine duet.',
    summaryImage: '/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/755.png',
    summaryImageAlt: 'Jugalbandi Hexa-18 instrument showing the acoustic-mechanical neural network layers.',
    summaryStats: [
      { label: 'Build duration', value: '5 months' },
      { label: 'Sound families', value: '3' },
      { label: 'Exhibitions', value: '2' },
      { label: 'Instrument scale', value: '1.2m tall' },
    ],
  },
  {
    slug: 'keyboard-project',
    name: 'BreakGen',
    image: '/Portfolio.github.io/Assets/Projects/Keyboard/photos/keyboard-data-hero.webp',
    tag: 'ITP THESIS',
    year: '2025',
    desc: 'AI platform that turns text prompts into fabrication-ready custom keyboards — 200+ visitors',
    category: 'creative',
    page: () => import('../pages/projects/KeyboardProjectPage'),
    archiveOrder: 3,
    tier: 'a',
    selected: true,
    selectedOrder: 9,
    summaryProblem: 'Designing a custom keyboard from scratch still requires expert tools, firmware knowledge, and fabrication workflows that exclude most makers.',
    summaryRole: 'Sole designer and developer across concept, interface, generative keycap system, PCB automation, and physical prototyping.',
    summaryTeam: 'Individual thesis project with faculty advising and critique support.',
    summaryTimeline: '2024 to 2025 thesis cycle',
    summaryOutcome: 'Created a platform that turns prompts, layouts, and ergonomic choices into fabrication-ready keyboard outputs and drew 200+ visitors at the thesis show.',
    summaryImage: '/Portfolio.github.io/Assets/Projects/Keyboard/photos/keyboard-data-hero.webp',
    summaryImageAlt: 'BreakGen concept hero showing custom keyboard forms and generated hardware outputs.',
    summaryStats: [
      { label: 'Visitors reached', value: '200+' },
      { label: 'Output layers', value: '3' },
      { label: 'Build stack', value: 'React + 3D' },
      { label: 'Fabrication tools', value: '4' },
    ],
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
    summaryProblem: 'Residential parking is a spatial problem disguised as admin work, and existing society apps buried that experience inside generic management dashboards.',
    summaryRole: 'UI/UX designer across research, parking-flow strategy, interactive map concepts, wireframes, and high-fidelity prototypes.',
    summaryTeam: 'Worked with UX lead Akshita Anand for Vilas Javdekar.',
    summaryTimeline: '3 months in 2022',
    summaryOutcome: 'Reframed parking selection around map-first decision making, helping residents understand the society layout before they booked.',
    summaryStats: [
      { label: 'Duration', value: '3 months' },
      { label: 'Core flow', value: 'Parking booking' },
      { label: 'Research inputs', value: '2 personas' },
      { label: 'Client', value: 'VJ' },
    ],
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
    image: '/Portfolio.github.io/Assets/Projects/making-of-time/photos/blue-dial-hero.webp',
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
    image: '/Portfolio.github.io/Assets/Projects/sea-of-salt/photos/salt-ground.webp',
    tag: 'STORYTELLING MACHINE',
    year: '2024',
    desc: 'A salt mill grinds real salt as you advance through a Norse folktale — story as physical material',
    category: 'creative',
    page: () => import('../pages/projects/SeaOfSaltPage'),
    archiveOrder: 22,
    tier: 'b',
    summaryProblem: 'Stories usually stay mental. I wanted a folktale where moving through the narrative would leave a visible physical cost in the room.',
    summaryRole: 'Co-created and fabricated the storytelling machine, interaction logic, salt mechanism, and exhibition behavior.',
    summaryTeam: 'Collaboration with Audrey Oh through Bio Art at NYU ITP.',
    summaryTimeline: '2024',
    summaryOutcome: 'Built a machine that literally grinds salt as the story advances, turning narrative consequence into residue visitors can see and touch.',
    summaryStats: [
      { label: 'Narrative device', value: '1 slider' },
      { label: 'Physical output', value: 'Real salt' },
      { label: 'Core medium', value: 'Story + machine' },
      { label: 'Setting', value: 'Bio Art' },
    ],
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
    summaryProblem: 'My portfolio spanned fintech, physical computing, AI, and installation work, but without a clear throughline it could read as range without conviction.',
    summaryRole: 'Writer and reflective editor, using the essay to define the core question underneath the broader body of work.',
    summaryTeam: 'Independent written piece developed through critique and discussion at NYU ITP.',
    summaryTimeline: '2024',
    summaryOutcome: 'Distilled the portfolio into one consistent thesis: translating invisible systems into experiences people can understand through the body.',
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
    image: '/Portfolio.github.io/Assets/Projects/DNA/photos/boxes-closed.webp',
    tag: 'BIOART',
    year: '2024',
    desc: 'Would you take a pill to live forever? Speculative pharmaceutical packaging exploring immortality and mortality',
    category: 'creative',
    page: () => import('../pages/projects/DnaPage'),
    archiveOrder: 38,
    tier: 'c',
    summaryProblem: 'Speculative design often stays too abstract to provoke a real decision, especially when the subject is as loaded as mortality.',
    summaryRole: 'Created the concept, physical packaging system, booklet narrative, and the full participant choice ritual.',
    summaryTeam: 'Independent speculative design project at NYU ITP.',
    summaryTimeline: '2024',
    summaryOutcome: 'Turned the question of immortality into a believable pharmaceutical choice, making participants hesitate before answering.',
    summaryStats: [
      { label: 'Choice frame', value: '2 paths' },
      { label: 'Medium', value: 'Packaging' },
      { label: 'Core theme', value: 'Mortality' },
      { label: 'Context', value: 'Bioart' },
    ],
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
    image: '/Portfolio.github.io/Assets/Projects/the-omakase/photos/cabinet-front.webp', // shares image with Omakase (it's the ancestor)
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
    selected: true,
    selectedOrder: 10,
    summaryProblem: 'Black hole phenomena are intellectually famous but physically unintuitive, which makes most explanations memorable as trivia instead of understanding.',
    summaryRole: 'Designed and fabricated the full set of physical models, interactives, and exhibition-ready storytelling surfaces.',
    summaryTeam: 'Built with applied mathematics collaboration from Saee Joshi and mentorship from Jeffrey J Feddersen.',
    summaryTimeline: '2026',
    summaryOutcome: 'Turned five astrophysics concepts into tangible experiences for museum exhibition, making time dilation, lensing, and mergers legible through form.',
    summaryImage: '/Portfolio.github.io/Assets/Projects/black-hole-assets/time-trap.jpg',
    summaryImageAlt: 'Black Hole installation showing the time dilation physical model.',
    summaryStats: [
      { label: 'Phenomena modeled', value: '5' },
      { label: 'Interactive pieces', value: '3' },
      { label: 'Exhibition', value: 'HSNY' },
      { label: 'Disciplines', value: 'Science + build' },
    ],
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
    summaryProblem: 'An installation about surveillance and hidden information would fail if it explained itself too early or too literally.',
    summaryRole: 'Designed the spatial concept, participant flow, blacklight environments, and the interaction reveal logic.',
    summaryTeam: 'Collaborative installation at NYU ITP with artist collaborators.',
    summaryTimeline: '2 weeks in 2023',
    summaryOutcome: 'Built a blacklight experience where discovery, observation, and hidden messages made the theme land through participation instead of explanation.',
    summaryStats: [
      { label: 'Build time', value: '2 weeks' },
      { label: 'Primary medium', value: 'UV space' },
      { label: 'Interaction mode', value: 'Discovery' },
      { label: 'Theme', value: 'Observation' },
    ],
  },
  {
    slug: 'the-omakase',
    name: 'The Omakase',
    image: '/Portfolio.github.io/Assets/Projects/the-omakase/photos/cabinet-front.webp',
    tag: 'ARCADE GAME',
    year: '2024',
    desc: '2-player sushi arcade cabinet — custom RGB controllers, exhibited at ITP + WonderVille',
    category: 'install',
    page: () => import('../pages/projects/TheOmakasePage'),
    archiveOrder: 20,
    tier: 'a',
    selected: true,
    selectedOrder: 12,
    summaryProblem: 'Most arcade games treat the cabinet as packaging, when the physical build should shape the ritual, timing, and tension of the game itself.',
    summaryRole: 'Designed the game, cabinet, controllers, visual system, and the full exhibition experience.',
    summaryTeam: 'Solo build developed through iterative prototyping at NYU ITP.',
    summaryTimeline: '2024',
    summaryOutcome: 'Built a two-player sushi arcade cabinet exhibited at ITP and WonderVille, where the hardware and social pacing became the game logic.',
    summaryImage: '/Portfolio.github.io/Assets/Projects/the-omakase/photos/cabinet-front.webp',
    summaryImageAlt: 'The Omakase arcade cabinet photographed from the front.',
    summaryStats: [
      { label: 'Players', value: '2' },
      { label: 'Exhibitions', value: '2' },
      { label: 'Inputs', value: '16 keys' },
      { label: 'Format', value: 'Custom cabinet' },
    ],
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
    image: '/Portfolio.github.io/Assets/Projects/Moniac/photos/hero-cabinet.png',
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
    image: '/Portfolio.github.io/Assets/Projects/Sculpture/1.jpg',
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
    image: '/Portfolio.github.io/Assets/Projects/mentra-brand/photos/render-both-frames.webp',
    tag: 'BRAND & PACKAGING',
    year: '2025–26',
    desc: 'End-to-end brand identity and packaging for AI smart glasses — logo, box, booklet, ads, and 24 social templates',
    category: 'brand',
    page: () => import('../pages/projects/MentraBrandPage'),
    archiveOrder: 4,
    tier: 'a',
    selected: true,
    selectedOrder: 11,
    summaryProblem: 'A new hardware brand has to feel credible before anyone puts the product on, which means packaging, identity, and launch surfaces all have to work as one system.',
    summaryRole: 'Sole designer across logo, packaging, printed matter, render library, social templates, and advertising.',
    summaryTeam: '1 designer working across hardware, product, operations, and manufacturing partners.',
    summaryTimeline: 'Q3 2025 to 2026',
    summaryOutcome: 'Shipped a full brand system into customers’ hands, from retail box and booklet to launch assets and creator-ready templates.',
    summaryImage: '/Portfolio.github.io/Assets/Projects/mentra-brand/photos/render-both-frames.webp',
    summaryImageAlt: 'Mentra brand hero showing both smart-glasses frame variants.',
    summaryStats: [
      { label: 'Packaging iterations', value: '7' },
      { label: 'Booklet rounds', value: '4' },
      { label: 'Social templates', value: '24' },
      { label: 'Render families', value: '3' },
    ],
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
    image: `${IMG}/atps.webp`,
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
    image: '/Portfolio.github.io/Assets/Projects/VishwaConclave/1.jpg',
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
  .filter(p => p.featured)
  .sort((a, b) => (a.featuredOrder ?? a.archiveOrder ?? 99) - (b.featuredOrder ?? b.archiveOrder ?? 99))

/** Explicit recruiter-facing work list */
export const selectedWorkProjects = projects
  .filter(p => p.selected && !p.hidden)
  .sort((a, b) => (a.selectedOrder ?? 99) - (b.selectedOrder ?? 99))

/** Homepage follow-on grid after flagship work */
export const homepageSelectedProjects = selectedWorkProjects
  .filter(p => !p.featured)
  .slice(0, 6)

/** Remaining visible work shown below the fold on /work */
export const archiveWorkProjects = projects
  .filter(p => !p.hidden && !selectedWorkProjects.some(selected => selected.slug === p.slug))
  .sort((a, b) => {
    const tierOrder = { a: 1, b: 2, c: 3, d: 4, s: 0 }
    const aRank = tierOrder[a.tier ?? 'd']
    const bRank = tierOrder[b.tier ?? 'd']
    if (aRank !== bRank) return aRank - bRank
    return (a.archiveOrder ?? 99) - (b.archiveOrder ?? 99)
  })

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

export function filterProjectsByCategory(items: Project[], cat: ProjectCategory): Project[] {
  return items.filter(p => p.category === cat && !p.hidden)
}

/** Get projects by category */
export function projectsByCategory(cat: ProjectCategory): Project[] {
  return projects.filter(p => p.category === cat && !p.hidden)
}

/** Find a single project by slug */
export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
