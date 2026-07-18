/**
 * Central project registry — single source of truth.
 *
 * To add a new project:
 *  1. Add an entry here
 *  2. Create the page component in src/pages/projects/
 *  3. Done — routes, cards, and listings are auto-generated.
 *
 * To mark a project as access-limited:
 *  Set `nda: true` and `access.mode: 'request'`.
 *  Public cards and pages should show only the safe glimpse. Private material does not ship in this static build.
 * To remove a project from public discovery:
 *  Set `hidden: true` and point `page` to NotFoundPage.
 *  Keep this reserved for intentionally hidden work, not thin projects.
 *  Thin-but-presentable projects should route to a small glimpse page.
 */

export interface Project {
  /** URL slug — becomes the route path */
  slug: string
  /** Display name */
  name: string
  /** Card thumbnail image */
  image: string
  /** Generated text-free cover used on portrait card/listing surfaces (4:5) */
  cardMockup?: string
  /** Square 1:1 cover for square card slots */
  cardMockupSquare?: string
  /** Wide 16:9 cover for featured cards + case-study hero */
  cover16x9?: string
  /** Alt text for the generated cover */
  cardMockupAlt?: string
  /** Optional explicit source image for generated card mockups */
  cardMockupSource?: string
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
  /** Mark as access-limited/private */
  nda?: boolean
  /** Public/private access behavior for portfolio surfaces */
  access?: {
    mode: 'public' | 'request' | 'hidden'
    publicLabel?: string
    publicPreviewImage?: string
    publicPreviewAlt?: string
  }
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
  /** Homepage hover media */
  hoverMedia?: { src: string; kind?: 'image' | 'video'; alt?: string }
  /** Alternate preview media for work-page modes */
  previewMedia?: {
    playlist?: { src: string; alt: string }
    library?: { src: string; alt: string }
  }
  /** Shared project story arc used by headers, agent, and summaries */
  storyline?: {
    challenge: string
    approach: string
    result: string
  }
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
const NDA_COVER = `${IMG}/nda-cover.svg`
export const NDA_PROJECT_SLUGS = [
  'transfi-project',
  'zentipay',
  'cuetv',
  'ai-voice',
] as const

const defaultCardMockup = (slug: string) => `/Assets/mockups/projects/${slug}.webp`

export const projects: Project[] = [
  /* ── Featured (homepage hero grid) ── */
  {
    slug: 'mentra',
    name: 'Mentra',
    image: '/Assets/images/mentra/render-transparent.webp',
    tag: 'AI WEARABLES',
    year: '2025–Present',
    desc: 'Designed the OS, companion app, MiniApp Store, and launch site for AI smart glasses',
    category: 'ai',
    page: () => import('../pages/projects/MentraPage'),
    featured: true,
    featuredOrder: 1,
    loading: 'eager',
    tier: 's',
    selected: true,
    selectedOrder: 1,
    summaryProblem: 'Smart glasses had hardware momentum, but no trusted software pattern for setup, daily use, apps, or buying.',
    summaryRole: 'Head of UI/UX, owning the OS, companion app, MiniApp Store, design system, and launch website.',
    summaryTeam: '1 designer working cross-functionally with 4 engineers, product, and hardware.',
    summaryTimeline: 'Q3 2025–Present',
    summaryOutcome: 'Shipped the core platform story: 4-step onboarding, app ecosystem, privacy cues, and a launch site buyers could understand.',
    summaryImage: '/Assets/images/mentra/appstore-hero.webp',
    summaryImageAlt: 'Mentra companion app and app store interface on mobile and smart glasses.',
    cardMockupSource: `${IMG}/mentra/photo-angle.webp`,
    summaryStats: [
      { label: 'Price at launch', value: '$299' },
      { label: 'Batch 2 claimed', value: '88%' },
      { label: 'Setup steps', value: '12→4' },
      { label: 'Design surfaces shipped', value: '6' },
    ],
    testimonial: {
      quote: 'An app store on your face sounds absurd until you use it.',
      cite: 'Early beta tester',
    },
    hoverMedia: {
      src: '/Assets/images/mentra/appstore-hero.webp',
      alt: 'Mentra app store and smart-glasses UI preview.',
    },
    previewMedia: {
      playlist: {
        src: '/Assets/images/mentra/glasses-angle.png',
        alt: 'Angled perspective render of Mentra smart glasses.',
      },
      library: {
        src: '/Assets/images/mentra/appstore-hero.webp',
        alt: 'Mentra app store and smart-glasses UI preview.',
      },
    },
    storyline: {
      challenge: 'AI glasses usually feel like disconnected demos unless the OS, companion app, app layer, and public launch story behave like one product.',
      approach: 'I designed the operating system, companion app, app distribution layer, and launch website together so voice, glanceable UI, developer workflows, and buyer proof reinforced the same mental model.',
      result: 'The story links hardware, software, distribution, and go-to-market instead of treating the wearable UI as the whole product.',
    },
  },
  {
    slug: 'mentra-miniapps',
    name: 'MiniApps in OS',
    image: '/Assets/images/mentra/appstore-hero.webp',
    tag: 'PLATFORM DESIGN',
    year: '2025\u201326',
    desc: 'Voice-first miniapp ecosystem for smart glasses spanning captions, translation, notes, AI, and utility apps',
    category: 'ai',
    page: () => import('../pages/projects/MentraMiniAppsPage'),
    archiveOrder: 2,
    tier: 'a',
    summaryProblem: 'Smart glasses needed a real app layer, but phone-style browse patterns collapse when the screen lives in peripheral vision and the apps range from captions and translation to notes, AI, and utilities.',
    summaryRole: 'Designed the miniapp store, install flows, permissions model, and the platform patterns that let very different MiniApps coexist inside MentraOS.',
    summaryTeam: 'Sole designer partnering with 4 engineers, product, and the MentraOS open-source developer community.',
    summaryTimeline: 'Late 2025 to 2026',
    summaryOutcome: 'Turned Mentra from a single-device demo into a platform with voice-first discovery, transparent permissions, and a first wave of usable apps.',
    summaryImage: '/Assets/images/mentra/appstore-hero.webp',
    summaryImageAlt: 'Mentra miniapp store and companion app surfaces showing voice-first discovery.',
    cardMockupSource: `${IMG}/mentra/os-all-apps.png`,
    summaryStats: [
      { label: 'Display canvas', value: '640×400' },
      { label: 'SDK first app', value: '15 min' },
      { label: 'Primary input', value: 'Voice' },
      { label: 'First-wave apps', value: 'Captions→AI' },
    ],
    previewMedia: {
      playlist: {
        src: '/Assets/images/mentra/glasses-angle.png',
        alt: 'Angled perspective render of Mentra smart glasses representing the MiniApps platform.',
      },
      library: {
        src: '/Assets/images/mentra/appstore-hero.webp',
        alt: 'Mentra miniapp store and companion app surfaces showing voice-first discovery.',
      },
    },
    storyline: {
      challenge: 'A wearable app store cannot rely on phone-era browse patterns because attention is shorter and input is constrained.',
      approach: 'I framed discovery around voice, intent, and lightweight developer primitives so mini-apps felt native to glasses instead of copied from mobile.',
      result: 'This turns hardware into an ecosystem and shows product strategy, interaction design, and platform thinking in one system.',
    },
  },
  {
    slug: 'transfi-project',
    name: 'TransFi',
    image: '/Assets/mockups/projects/transfi-project_4x5.webp',
    cardMockupSource: '/Assets/mockups/projects/transfi-project_4x5.webp',
    cardMockupAlt: 'TransFi project cover artwork.',
    tag: 'WEB3 PAYMENTS',
    year: '2023',
    desc: 'Public preview of a multi-market crypto payment infrastructure redesign',
    category: 'ux',
    page: () => import('../pages/projects/TransfiPage'),
    nda: true,
    access: {
      mode: 'request',
      publicLabel: 'Quick glimpse',
      publicPreviewImage: '/Assets/Projects/Transfi/public/Group%20550.png',
      publicPreviewAlt: 'TransFi dashboard and buy-crypto widget shown across laptop and phone mockups.',
    },
    featured: true,
    featuredOrder: 2,
    loading: 'eager',
    tier: 's',
    selected: true,
    selectedOrder: 4,
    summaryProblem: 'Cross-border crypto payments were powerful but opaque, slow to onboard, and hostile to non-crypto-native business users.',
    summaryRole: 'Lead Product Designer across dashboard UX, consumer widget flows, design system, and brand.',
    summaryTeam: 'Lead designer partnering with product, founder, and engineering.',
    summaryTimeline: '2022–23',
    summaryOutcome: 'Simplified merchant onboarding and made the payment infrastructure easier to evaluate, trust, and operate.',
    summaryImage: '/Assets/Projects/Transfi/public/Group%20550.png',
    summaryImageAlt: 'TransFi dashboard and buy-crypto widget shown across laptop and phone mockups.',
    summaryStats: [
      { label: 'Domain', value: 'Payments' },
      { label: 'Scope', value: 'Dashboard + widget' },
      { label: 'Focus', value: 'Trust + onboarding' },
      { label: 'Access', value: 'By request' },
    ],
    testimonial: {
      quote: 'Enterprise buyers needed local rails, clearer onboarding, and payment methods that matched Asian market behavior.',
      cite: 'Public synthesis',
    },
    hoverMedia: {
      src: '/Assets/mockups/projects/transfi-project_16x9.webp',
      kind: 'image',
      alt: 'TransFi project cover artwork.',
    },
    storyline: {
      challenge: 'Cross-border crypto payments were operationally powerful but cognitively heavy, with different market expectations and constraints.',
      approach: 'I simplified the flows around trust, clarity, and speed, then aligned the product language across partner, merchant, and user touchpoints.',
      result: 'The case study ties design decisions to transaction confidence, rollout constraints, and payment-system trust.',
    },
  },
  {
    slug: 'zentipay',
    name: 'ZentiPay',
    image: '/Assets/Projects/ZentiPay/reviewer/send-crypto-1.webp',
    tag: 'FINTECH',
    year: '2025',
    desc: 'Built a trust-first fintech super-app from scratch',
    category: 'ux',
    page: () => import('../pages/projects/ZentipayPage'),
    nda: true,
    access: {
      mode: 'request',
      publicLabel: 'Quick glimpse',
      publicPreviewImage: '/Assets/Projects/ZentiPay/reviewer/send-crypto-1.webp',
      publicPreviewAlt: 'ZentiPay transfer screen showing amount entry, live conversion, and balance.',
    },
    archiveOrder: 2,
    tier: 'a',
    loading: 'eager',
    selected: true,
    selectedOrder: 5,
    summaryProblem: 'Cross-border payment users abandoned when fees moved late, language felt foreign, and the product behaved like crypto software instead of a trusted money tool.',
    summaryRole: 'Founding product designer across research, onboarding, information architecture, transaction flows, and the core design system.',
    summaryTeam: 'Sole designer working with product and engineering across web and mobile.',
    summaryTimeline: '2025',
    summaryOutcome: 'Improved user confidence by making pricing, progress, and trust legible earlier in the transfer flow.',
    summaryImage: '/Assets/Projects/ZentiPay/reviewer/send-crypto-1.webp',
    summaryImageAlt: 'ZentiPay transfer screen showing amount entry, live conversion, and balance.',
    summaryStats: [
      { label: 'Domain', value: 'Fintech' },
      { label: 'Team', value: 'Solo designer' },
      { label: 'Focus', value: 'Trust architecture' },
      { label: 'Access', value: 'By request' },
    ],
    storyline: {
      challenge: 'Users hesitated when fees, status, and next steps appeared too late.',
      approach: 'I brought price, progress, recovery, and review states into one trust system.',
      result: 'The flow made cost, progress, and confidence visible before money moved.',
    },
  },
  {
    slug: 'clawed-chat',
    name: 'Clawed',
    image: '/Assets/mockups/projects/clawed-chat_1x1.webp',
    cardMockup: '/Assets/mockups/projects/clawed-chat_1x1.webp',
    cardMockupSquare: '/Assets/mockups/projects/clawed-chat_1x1.webp',
    cardMockupSource: '/Assets/mockups/projects/clawed-chat_1x1.webp',
    cardMockupAlt: 'Clawed AI assistant square cover.',
    tag: 'AI ASSISTANT',
    year: '2026',
    desc: 'AI assistant with receipts for every action — safety-first on glasses and web',
    category: 'ai',
    page: () => import('../pages/projects/ClawedChatPage'),
    featured: false,
    tier: 's',
    selected: true,
    selectedOrder: 3,
    summaryProblem: 'AI assistants lose trust the moment they act confidently without showing what they did or why.',
    summaryRole: 'Sole Product Designer across web hub, smart-glasses experience, receipts, approvals, and launch site.',
    summaryTeam: '1 designer with 3 engineers shipping across web and Mentra integration.',
    summaryTimeline: 'Jan–Mar 2026',
    summaryOutcome: 'Shipped a trust-first AI assistant built around 3-second asks, 5-second results, and 1-tap approvals.',
    summaryImage: '/Assets/Projects/Clawed.chat/landing-hero.webp',
    summaryImageAlt: 'Clawed assistant launch visual showing the AI assistant experience.',
    summaryStats: [
      { label: 'Ask time target', value: '<3s' },
      { label: 'Result target', value: '<5s' },
      { label: 'Approval model', value: '1 tap' },
      { label: 'Safety modes', value: '3 tiers' },
    ],
    hoverMedia: {
      src: '/Assets/Projects/Clawed.chat/landing-hero.webp',
      alt: 'Clawed AI assistant launch visual.',
    },
    storyline: {
      challenge: 'Most AI assistants look capable until the user asks what the system actually did or whether it can be trusted.',
      approach: 'I designed the assistant around receipts, action traceability, and controlled delegation so every step stayed legible.',
      result: 'The project signals judgment around safety, transparency, and applied AI, which is what serious AI product work now demands.',
    },
  },

  /* ── UX Design ── */
  {
    slug: 'executivelens',
    name: 'ExecutiveLens',
    image: `${IMG}/executivelens.webp`,
    tag: 'AI ANALYTICS',
    year: '2025–26',
    desc: 'AI meeting intelligence for executives — every meeting captured, decisions tracked, briefs delivered',
    category: 'ai',
    page: () => import('../pages/projects/ExecutiveLensPage'),
    archiveOrder: 1,
    tier: 'a',
    selected: true,
    selectedOrder: 2,
    summaryProblem: 'Executives had no system connecting what was said in meetings to the metrics and decisions that moved because of them.',
    summaryRole: 'Sole product designer across meeting capture, dashboard narrative, mobile briefing, and AI trust patterns.',
    summaryTeam: 'Design lead working with product, AI, and engineering partners.',
    summaryTimeline: '2025 to 2026',
    summaryOutcome: 'Closed beta teams used the dashboard as a morning brief for decisions, owners, and follow-through.',
    summaryImage: '/Assets/images/executivelens.webp',
    summaryImageAlt: 'ExecutiveLens dashboard and meeting intelligence interface.',
    summaryStats: [
      { label: 'Beta signal', value: 'Morning brief' },
      { label: 'Platform', value: 'Web + mobile' },
      { label: 'Core layer', value: 'Meeting AI' },
      { label: 'Trust pattern', value: 'Citations' },
    ],
    storyline: {
      challenge: 'Executives were drowning in meetings, but summary tools often stop at note-taking and miss the decision layer.',
      approach: 'I focused the product on synthesis, follow-through, and adoption so the AI felt like a working layer for leadership rather than another dashboard.',
      result: 'The project shows I can translate AI capability into concrete time savings and operational behavior change.',
    },
  },
  {
    slug: 'org-dashboard',
    name: 'OrgDashboard',
    image: `${IMG}/org-dashboard.webp`,
    tag: 'B2B SAAS',
    year: '2026',
    desc: 'Dual-surface admin system giving AI agents organizational context without confusing human operators',
    category: 'ux',
    page: () => import('../pages/projects/OrgDashboardPage'),
    archiveOrder: 21,
    tier: 'b',
    summaryProblem: 'AI agents had no shared organizational memory, so every session needed repeated context and every team member rebuilt the same company knowledge.',
    summaryRole: 'Designed the product model, dashboard surfaces, approval flow, and agent-facing knowledge structure.',
    summaryTeam: 'Independent SaaS/product systems case study.',
    summaryTimeline: '2026',
    summaryOutcome: 'Defined a two-surface system where humans manage trust and agents consume structured company context.',
    summaryStats: [
      { label: 'Domain', value: 'B2B SaaS' },
      { label: 'Users', value: 'Humans + agents' },
      { label: 'Surface', value: 'Dashboard + CLI' },
      { label: 'Focus', value: 'Context' },
    ],
    storyline: {
      challenge: 'Agents become less useful when company knowledge lives in scattered tools and one-off prompts.',
      approach: 'I designed a shared knowledge layer with human approval, connected sources, and agent-readable operations.',
      result: 'The project shows how AI infrastructure can be made governable and legible for both operators and agents.',
    },
  },
  {
    slug: 'cuetv',
    name: 'CueTV',
    image: '/Assets/mockups/projects/cuetv_16x9.webp',
    tag: 'PRODUCT DESIGN',
    year: '2021',
    desc: 'Designed a niche arts OTT platform and retargeting system for opera, ballet, and classical audiences',
    category: 'ux',
    page: () => import('../pages/projects/CueTvPage'),
    nda: true,
    access: {
      mode: 'request',
      publicLabel: 'Quick glimpse',
      publicPreviewImage: '/Assets/mockups/projects/cuetv_16x9.webp',
      publicPreviewAlt: 'CueTV streaming platform across TV, laptop, tablet, and phone.',
    },
    archiveOrder: 9,
    tier: 'c',
    summaryProblem: 'Arts streaming audiences browse differently from mainstream OTT audiences, and the platform also needed a growth system that could scale across fragmented segments.',
    summaryRole: 'Product designer across audience research, browsing flows, platform structure, and ad-creative system thinking.',
    summaryTeam: 'Worked with product and growth stakeholders inside a niche streaming context.',
    summaryTimeline: '2021',
    summaryOutcome: 'Combined product design and retargeting logic into a platform strategy that supported discovery and re-engagement.',
    summaryStats: [
      { label: 'System', value: 'Retargeting' },
      { label: 'Domain', value: 'Arts OTT' },
      { label: 'Focus', value: 'Discovery + growth' },
      { label: 'Year', value: '2021' },
    ],
    storyline: {
      challenge: 'A niche arts streaming product could not borrow generic OTT patterns because expert viewers search differently and growth had to reach fragmented audiences.',
      approach: 'I paired audience research with a repeatable ad and discovery system, then tightened the platform experience around precise browsing and playback.',
      result: 'The project shows research, growth thinking, and product design working as one service system.',
    },
  },
  {
    slug: 'healthapp',
    name: 'Health App',
    image: '/Assets/mockups/projects/healthapp_16x9.webp',
    tag: 'DIGITAL HEALTH',
    year: '2024',
    desc: 'A calmer daily planner that adapts work to sleep, movement, nutrition, and energy',
    category: 'ux',
    page: () => import('../pages/projects/HealthAppPage'),
    archiveOrder: 23,
    tier: 'c',
    summaryProblem: 'Task managers optimize output, but they rarely account for whether the schedule itself is harmful to the person following it.',
    summaryRole: 'Product designer exploring how wellness signals could reshape planning, prioritization, and daily task flow.',
    summaryTeam: 'Independent product concept spanning product strategy, interaction design, and visual prototyping.',
    summaryTimeline: '2024',
    summaryOutcome: 'Reframed productivity as a health-aware system, using planning mechanics that balanced execution with recovery.',
    summaryStats: [
      { label: 'Core bet', value: 'Health-aware tasks' },
      { label: 'Domain', value: 'Wellness + productivity' },
      { label: 'Format', value: 'Product concept' },
      { label: 'Year', value: '2024' },
    ],
    storyline: {
      challenge: 'Productivity tools optimize output, but they rarely intervene when the schedule itself is unhealthy.',
      approach: 'I reframed planning as a wellness-aware system, where time, recovery, and behavior patterns influence the task flow itself.',
      result: 'The page frames the concept as a product hypothesis, with health-aware planning rules instead of only new screens.',
    },
  },
  {
    slug: 'ibm',
    name: 'IBM Cancer Prognosis',
    image: '/Assets/mockups/projects/ibm_16x9.webp',
    cardMockupSource: '/Assets/mockups/projects/ibm_16x9.webp',
    tag: 'HEALTHCARE AI',
    year: '2020',
    desc: 'Explored encrypted genomic workflows for cancer prognosis without exposing raw patient data',
    category: 'ai',
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
    storyline: {
      challenge: 'Healthcare AI needs rich genomic data, but patient privacy makes ordinary machine-learning pipelines hard to trust.',
      approach: 'I explored encrypted computation as the method, keeping genomic data protected while still supporting survival analysis and treatment clustering.',
      result: 'The project shows technical research judgment: privacy was treated as the core product constraint, not a compliance note added later.',
    },
  },

  /* ── AI & Wearables ── */
  {
    slug: 'ballah-code',
    name: 'Ballah Code',
    image: `${IMG}/ballah-code.webp`,
    tag: 'AI DEV TOOLS',
    year: '2026',
    desc: 'Designed an AI-native IDE with visible tools, terminal context, and a senior-engineer interaction model',
    category: 'ai',
    page: () => import('../pages/projects/BallahCodePage'),
    archiveOrder: 17,
    tier: 'b',
    summaryProblem: 'AI coding tools often feel either too magical or too shallow, leaving developers unsure what the system changed and why.',
    summaryRole: 'Designed the IDE model, tool surfaces, interaction patterns, and product framing for an AI-native development environment.',
    summaryTeam: 'Independent product design and prototyping project.',
    summaryTimeline: '2026',
    summaryOutcome: 'Framed the editor around visible tools, senior-engineer review habits, and clearer handoffs between AI suggestions and developer control.',
    summaryStats: [
      { label: 'AI tools', value: '17' },
      { label: 'Surface', value: 'Desktop IDE' },
      { label: 'Core input', value: 'Chat + terminal' },
      { label: 'Focus', value: 'Context' },
    ],
    storyline: {
      challenge: 'Developers need AI help, but they still need traceability, control, and a workspace that respects how engineering decisions are made.',
      approach: 'I structured the experience around explicit tools, inspectable actions, and reviewable states instead of a single opaque chat box.',
      result: 'The project explains how visible AI tools, review states, and developer control can coexist inside an IDE.',
    },
  },
  {
    slug: 'oncall-lens',
    name: 'OnCall Lens',
    image: `${IMG}/oncall-lens.webp`,
    cardMockupSource: `${IMG}/oncall-lens/hero.webp`,
    tag: 'AI WEARABLE',
    year: '2026',
    desc: 'Smart-glasses incident flow that turns Sentry alerts into AI triage and auto-generated PR fixes',
    category: 'ai',
    page: () => import('../pages/NotFoundPage'),
    archiveOrder: 19,
    tier: 'c',
    hidden: true,
    summaryProblem: 'On-call engineers still lose time to context switching, even when the alert is obvious and the fix could be mostly mechanical.',
    summaryRole: 'Product designer and developer across glasses UX, incident flow, mini-app interface, and demo orchestration.',
    summaryTeam: 'Built with Team SOGA during Daytona HackSprint at Sentry HQ.',
    summaryTimeline: '24 hours in Jan 2026',
    summaryOutcome: 'Shipped a working demo where a Sentry alert triggered an AI fix pipeline and surfaced approval on smart glasses.',
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
    image: '/Assets/mockups/projects/ai-voice_16x9.webp',
    cardMockupSource: '/Assets/mockups/projects/ai-voice_16x9.webp',
    cardMockupAlt: 'Voice Matching enterprise interface showing three suggested voice personas.',
    tag: 'CONVERSATIONAL AI',
    year: '2025',
    desc: 'Redesigned enterprise AI voice selection around tone, context, and emotional fit',
    category: 'ai',
    page: () => import('../pages/projects/AiVoicePage'),
    nda: true,
    access: {
      mode: 'request',
      publicLabel: 'Quick glimpse',
      publicPreviewImage: '/Assets/mockups/projects/ai-voice_16x9.webp',
      publicPreviewAlt: 'Voice Matching enterprise interface cover for AI voice selection work.',
    },
    archiveOrder: 32,
    tier: 'b',
    summaryProblem: 'Enterprise AI voice tools can make voice choice feel cosmetic, even when tone, context, and emotional fit shape user trust.',
    summaryRole: 'Product designer structuring voice selection, scenario evaluation, and reviewer confidence for an access-limited enterprise tool.',
    summaryTeam: 'Access-limited enterprise AI voice project.',
    summaryTimeline: '2025',
    summaryOutcome: 'Reframed voice selection as a product decision grounded in use case, emotional tone, and testing context.',
    summaryStats: [
      { label: 'Domain', value: 'Enterprise AI' },
      { label: 'Primary lens', value: 'Tone fit' },
      { label: 'Access', value: 'By request' },
      { label: 'Year', value: '2025' },
    ],
    storyline: {
      challenge: 'Enterprise voice tooling often reduces voice choice to a superficial brand setting instead of a functional design decision.',
      approach: 'I structured selection around emotional fit, scenario testing, and confidence in how a voice behaves across real customer moments.',
      result: 'The work shows sensitivity to conversation design, evaluation criteria, and the productization of an emerging AI capability.',
    },
  },

  /* ── Design for Good ── */
  {
    slug: 'raahi-project',
    name: 'Raahi',
    image: '/Assets/images/raahi.jpg',
    cardMockup: '/Assets/images/raahi.jpg',
    cardMockupAlt: 'Raahi cover: sculptural hands holding a phone with the Raahi journey planner over a dark city map',
    tag: 'CIVIC DESIGN',
    year: '2022',
    desc: 'Service design for Pune public transit — app, kiosk, and in-vehicle systems',
    category: 'good',
    page: () => import('../pages/projects/RaahiPage'),
    featured: true,
    featuredOrder: 3,
    archiveOrder: 5,
    tier: 'a',
    selected: true,
    selectedOrder: 7,
    summaryProblem: 'Pune public transit broke trust across buses, metro, kiosks, and in-vehicle touchpoints, especially for riders who were not already fluent in the system.',
    summaryRole: 'User researcher and UI designer across service design, brand identity, app flows, kiosk UX, and in-vehicle information surfaces.',
    summaryTeam: 'Collaborated with one fellow designer on a self-initiated civic design project.',
    summaryTimeline: '3 months in 2022',
    summaryOutcome: 'Built a connected transit concept that reduced commuter anxiety by treating the journey as one service instead of disconnected tools.',
    summaryImage: '/Assets/Projects/Raahi/photos/raahi-hero.webp',
    summaryImageAlt: 'Raahi hero concept showing transit app, bus, and connected wayfinding system.',
    summaryStats: [
      { label: 'Modes represented', value: '8' },
      { label: 'Core touchpoints', value: '3' },
      { label: 'Project span', value: '3 mo' },
      { label: 'Design lanes', value: 'Service + UI' },
    ],
    storyline: {
      challenge: 'Public transit systems fail when information breaks across kiosks, vehicles, and mobile touchpoints instead of acting like one journey.',
      approach: 'I designed the service as a connected system, aligning the app, in-vehicle guidance, and physical interfaces around the rider’s mental model.',
      result: 'The case study shows service design range and the ability to unify digital and environmental touchpoints.',
    },
  },
  {
    slug: 'the-point-cdc',
    name: 'The Point CDC',
    image: '/Assets/mockups/projects/the-point-cdc_16x9.webp',
    cardMockupSource: '/Assets/mockups/projects/the-point-cdc_16x9.webp',
    tag: 'COMMUNITY',
    year: '2025',
    desc: 'Rebuilt a Bronx nonprofit platform to make community programs, spaces, and services easier to navigate',
    category: 'good',
    page: () => import('../pages/projects/ThePointCdcPage'),
    archiveOrder: 7,
    tier: 'b',
    summaryProblem: 'The nonprofit had many programs, services, and community resources, but the website made residents work too hard to understand what was available.',
    summaryRole: 'UX designer across information architecture, community program navigation, responsive page structure, and accessibility-minded content hierarchy.',
    summaryTeam: 'Community-focused web redesign project for The Point CDC.',
    summaryTimeline: '2025',
    summaryOutcome: 'Rebuilt the experience around clearer service discovery, mobile-first navigation, and a calmer path from need to program detail.',
    summaryStats: [
      { label: 'Context', value: 'Bronx nonprofit' },
      { label: 'Primary users', value: 'Mobile residents' },
      { label: 'Core need', value: 'Programs + WiFi' },
      { label: 'Method', value: 'IA + research' },
    ],
    storyline: {
      challenge: 'Community websites fail when people cannot quickly find the service, space, or program that matches their immediate need.',
      approach: 'I reorganized the site around resident intent, simplified the navigation, and treated accessibility as part of the core information design.',
      result: 'The case study shows practical civic UX: clearer structure, better wayfinding, and a website that serves real community use instead of internal categories.',
    },
  },
  {
    slug: 'office-of-diversity',
    name: 'Office of Diversity',
    image: '/Assets/Projects/office-of-diversity/photos/responsive-preview.png',
    cardMockupSource: '/Assets/Projects/office-of-diversity/photos/research-wall.webp',
    tag: 'EDUCATION',
    year: '2024',
    desc: 'Compact report-publishing work for NYU Tisch’s IDBEA content',
    category: 'good',
    page: () => import('../pages/projects/OfficeOfDiversityPage'),
    archiveOrder: 30,
    tier: 'c',
    summaryProblem: 'A dense institutional report needed to become easier to scan, navigate, and revisit across desktop and mobile.',
    summaryRole: 'Website publishing designer translating report content into a clearer accessible web structure.',
    summaryTeam: 'Worked within an NYU Tisch context with accessibility as a core requirement.',
    summaryTimeline: '3 months in 2024',
    summaryOutcome: 'Created a compact web report structure that made IDBEA milestones and progress easier for the Tisch community to read.',
    summaryStats: [
      { label: 'Standard', value: 'WCAG 2.1 AA' },
      { label: 'Format shift', value: 'Report to web' },
      { label: 'Context', value: 'NYU Tisch' },
      { label: 'Year', value: '2024' },
    ],
    storyline: {
      challenge: 'A dense institutional report needed a clearer public reading experience.',
      approach: 'I structured the content into responsive sections, visual summaries, and accessible reading patterns.',
      result: 'The project is useful as a compact glimpse of accessible report publishing, not a long product case study.',
    },
  },

  /* ── Creative Technology ── */
  {
    slug: 'jugalbandi',
    name: 'Jugalbandi',
    image: '/Assets/mockups/projects/jugalbandi_16x9.webp',
    cardMockupSource: '/Assets/mockups/projects/jugalbandi_16x9.webp',
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
    summaryRole: 'Interaction designer and fabricator across concept, behavior, electronics, and installation.',
    summaryTeam: 'Solo project with mentorship support through NYU ITP.',
    summaryTimeline: '5 months in 2024',
    summaryOutcome: 'Exhibited at the ITP Spring Show and Maker Faire Coney Island as a playable human-machine duet.',
    summaryImage: '/Assets/Projects/Jugalbandi/Photos/755.png',
    summaryImageAlt: 'Jugalbandi Hexa-18 instrument showing the acoustic-mechanical neural network layers.',
    summaryStats: [
      { label: 'Build duration', value: '5 months' },
      { label: 'Sound families', value: '3' },
      { label: 'Exhibitions', value: '2' },
      { label: 'Instrument scale', value: '1.2m tall' },
    ],
    hoverMedia: {
      src: '/Assets/Projects/Jugalbandi/Photos/755.png',
      alt: 'Jugalbandi installation performance view.',
    },
    storyline: {
      challenge: 'AI music collaborations often feel like novelty unless the machine responds with enough nuance to sustain a real duet.',
      approach: 'I built the instrument around human improvisation, giving the neural system a performable role instead of a decorative one.',
      result: 'The case study demonstrates interaction design beyond screens, where behavior, timing, and embodiment carry the experience.',
    },
  },
  {
    slug: 'keyboard-project',
    name: 'Keyboard Project',
    image: '/Assets/Projects/Keyboard/photos/keyboard-data-hero.webp',
    cardMockupSource: '/Assets/Projects/Keyboard/photos/keyboard-angle.png',
    tag: 'DATA OBJECT',
    year: '2024',
    desc: 'Physical keyboard study turning key height, fabrication, and touch into a data sculpture',
    category: 'creative',
    page: () => import('../pages/NotFoundPage'),
    archiveOrder: 12,
    tier: 'b',
    hidden: true,
    summaryProblem: 'Keyboard interfaces are usually treated as flat input devices, even though every key carries rhythm, hierarchy, and touch.',
    summaryRole: 'Designed and fabricated the physical study, including key-height mapping, 3D-printed forms, and visual documentation.',
    summaryTeam: 'Individual physical-computing and fabrication study at NYU ITP.',
    summaryTimeline: '2024',
    summaryOutcome: 'Built a tactile keyboard object and companion data sculpture that made input feel spatial and inspectable.',
    summaryImage: '/Assets/Projects/Keyboard/photos/keyboard-data-hero.webp',
    summaryImageAlt: 'Keyboard with keys lifted to different heights beside a 3D printed data sculpture.',
    summaryStats: [
      { label: 'Medium', value: 'Keyboard' },
      { label: 'Output', value: 'Data sculpture' },
      { label: 'Fabrication', value: '3D print' },
      { label: 'Focus', value: 'Touch + height' },
    ],
    storyline: {
      challenge: 'A keyboard is normally invisible once it works, but its physical structure can carry information in ways a flat screen cannot.',
      approach: 'I treated key height and fabrication as the interface, turning rows of keys into a spatial data surface people could read with their eyes and hands.',
      result: 'The project separates the tactile keyboard artifact from BreakGen, the later AI fabrication platform it helped inform.',
    },
  },
  {
    slug: 'breakgen',
    name: 'BreakGen',
    image: '/Assets/Projects/Keyboard/photos/breakgen-launch-live.png',
    cardMockup: '/Assets/Projects/Keyboard/photos/breakgen-demo-live.png',
    cardMockupAlt: 'BreakGen interactive demo showing a workspace, preview chamber, controls, and artifact-backed state.',
    tag: 'ITP THESIS',
    year: '2025',
    desc: 'AI platform that turns text prompts into fabrication-ready custom keyboards, from layout to PCB',
    category: 'creative',
    page: () => import('../pages/NotFoundPage'),
    archiveOrder: 3,
    tier: 'a',
    hidden: true,
    selected: true,
    selectedOrder: 9,
    summaryProblem: 'Designing a custom keyboard from scratch still requires expert tools, firmware knowledge, and fabrication workflows that exclude most makers.',
    summaryRole: 'Sole designer and developer across concept, interface, AI keycap generation, PCB automation, and physical prototyping.',
    summaryTeam: 'Individual thesis project with faculty advising and critique support.',
    summaryTimeline: '2024 to 2025 thesis cycle',
    summaryOutcome: 'Created a platform that turns prompts, layouts, and ergonomic choices into fabrication-ready keyboard outputs and drew 200+ visitors at the thesis show.',
    summaryImage: '/Assets/Projects/Keyboard/photos/breakgen-launch-live.png',
    summaryImageAlt: 'BreakGen launch page showing the AI keyboard fabrication product story.',
    summaryStats: [
      { label: 'Visitors reached', value: '200+' },
      { label: 'Live designs', value: '50+' },
      { label: 'Physical prototypes', value: '6' },
      { label: 'Export target', value: 'PCB + STL' },
    ],
    previewMedia: {
      playlist: {
        src: '/Assets/Projects/Keyboard/photos/breakgen-demo-live.png',
        alt: 'BreakGen interactive demo workspace.',
      },
      library: {
        src: '/Assets/Projects/Keyboard/photos/breakgen-launch-live.png',
        alt: 'BreakGen public launch page.',
      },
    },
    storyline: {
      challenge: 'Custom keyboard creation is split across expert-only tools, which keeps most people outside the making process.',
      approach: 'I collapsed layout, AI keycap generation, and fabrication prep into one guided flow so intent could move directly toward a buildable object.',
      result: 'BreakGen is the thesis-scale design-engineering platform; the earlier keyboard object remains a separate tactile study.',
    },
  },
  {
    slug: 'vj-software',
    name: 'VJ Parivar',
    image: `${IMG}/vj.jpg`,
    tag: 'UX DESIGN',
    year: '2022',
    desc: 'Reframed residential parking as a spatial decision instead of a back-office booking flow',
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
    storyline: {
      challenge: 'Residents were making parking decisions without enough spatial context, which made a high-stakes housing task feel like paperwork.',
      approach: 'I moved the flow toward maps, layout awareness, and clearer comparison so residents could understand the physical choice before booking.',
      result: 'The project shows how a narrow admin flow can become better UX when the real decision model is made visible.',
    },
  },
  {
    slug: 'enigma',
    name: 'Enigma',
    image: '/Assets/mockups/projects/enigma_16x9.webp',
    cardMockupSource: '/Assets/mockups/projects/enigma_16x9.webp',
    tag: 'DEEP LEARNING',
    year: '2023',
    desc: '200-neuron light sculpture visualizing a functioning neural network',
    category: 'creative',
    page: () => import('../pages/projects/EnigmaPage'),
    archiveOrder: 10,
    tier: 'a',
    summaryProblem: 'Neural networks are usually explained through diagrams or code, which makes their behavior feel distant from the body.',
    summaryRole: 'Creative technologist designing the sculpture, light behavior, interaction logic, and exhibition story.',
    summaryTeam: 'Independent creative technology project at NYU ITP.',
    summaryTimeline: '2023',
    summaryOutcome: 'Built a 200-neuron light sculpture that made network activity spatial, visible, and easier to discuss in person.',
    summaryStats: [
      { label: 'Neurons modeled', value: '200' },
      { label: 'Medium', value: 'Light sculpture' },
      { label: 'Core topic', value: 'Deep learning' },
      { label: 'Context', value: 'NYU ITP' },
    ],
    storyline: {
      challenge: 'A functioning neural network is hard to understand when it only exists as math, diagrams, or software output.',
      approach: 'I translated the model into a physical light system where activation, connection, and response could be seen across a sculptural object.',
      result: 'The project makes machine learning tangible and gives the portfolio a strong bridge between AI systems and embodied experience.',
    },
  },
  {
    slug: 'shuffle',
    name: 'Shuffle',
    image: '/Assets/mockups/projects/shuffle_16x9.webp',
    cardMockupSource: '/Assets/mockups/projects/shuffle_16x9.webp',
    tag: 'INTERACTIVE',
    year: '2023',
    desc: 'Motorised-slider board where balancing student life becomes a zero-sum game',
    category: 'creative',
    page: () => import('../pages/projects/ShufflePage'),
    archiveOrder: 12,
    tier: 'b',
    summaryProblem: 'Student-life balance is usually discussed as advice, but the trade-offs are physical, constrained, and zero-sum.',
    summaryRole: 'Interaction designer and fabricator creating the motorized slider board, system logic, and exhibition interaction.',
    summaryTeam: 'Independent physical-computing project at NYU ITP.',
    summaryTimeline: '2023',
    summaryOutcome: 'Built an embodied system where changing one priority physically affected the others, making the invisible trade-off legible.',
    summaryStats: [
      { label: 'Medium', value: 'Motor sliders' },
      { label: 'Interaction', value: 'Zero-sum' },
      { label: 'Core theme', value: 'Balance' },
      { label: 'Context', value: 'Physical computing' },
    ],
    storyline: {
      challenge: 'Time trade-offs in graduate school are invisible until something breaks.',
      approach: 'I built a board of motorised faders where pushing one part of your life up physically drags the others down.',
      result: 'It positions the project as embodied systems design, where the interface enforces the trade-off instead of displaying it.',
    },
  },
  {
    slug: 'making-of-time',
    name: 'Making of Time',
    image: '/Assets/Projects/making-of-time/photos/blue-dial-hero.webp',
    tag: 'PHYSICAL COMPUTING',
    year: '2024',
    desc: 'Built three timekeeping systems, from sundial to mechanical watch to software clock',
    category: 'creative',
    page: () => import('../pages/projects/MakingOfTimePage'),
    archiveOrder: 13,
    tier: 'b',
    summaryProblem: 'Timekeeping is treated as a solved interface, but its meaning changes when it is built through shadow, mechanics, and software.',
    summaryRole: 'Designer and builder creating three connected timekeeping artifacts across physical computing, fabrication, and interface design.',
    summaryTeam: 'Independent fabrication and interaction study at NYU ITP.',
    summaryTimeline: '2024',
    summaryOutcome: 'Built a sundial, mechanical watch study, and software clock to compare how materials change the way time is perceived.',
    summaryStats: [
      { label: 'Artifacts', value: '3' },
      { label: 'Media', value: 'Sun + gear + code' },
      { label: 'Focus', value: 'Perception' },
      { label: 'Context', value: 'NYU ITP' },
    ],
    storyline: {
      challenge: 'Clock interfaces often hide the systems that make time visible, which makes time feel abstract and automatic.',
      approach: 'I rebuilt time through three mediums so shadow, mechanism, and code could each expose a different relationship to measurement.',
      result: 'The project shows process range and turns a familiar object into a study of material, precision, and perception.',
    },
  },
  {
    slug: 'sea-of-salt',
    name: 'Why the Sea is Salt',
    image: '/Assets/Projects/sea-of-salt/photos/salt-ground.webp',
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
    storyline: {
      challenge: 'Folktales are often consumed passively, which makes their material richness disappear.',
      approach: 'I made the act of reading physical by linking the Norse story to grinding real salt as the narrative unfolds.',
      result: 'This is strong interaction storytelling because the medium carries the metaphor, not just the text.',
    },
  },

  {
    slug: 'flow-fields',
    name: 'Flow Fields',
    image: `${IMG}/flow-fields.svg`,
    tag: 'GENERATIVE ART',
    year: '2024',
    desc: 'Perlin noise flow fields — 2000 particles creating organic, ever-changing patterns',
    category: 'creative',
    page: () => import('../pages/projects/FlowFieldsPage'),
    archiveOrder: 14,
    tier: 'd',
    summaryProblem: 'A vector field is invisible until something moves through it, which makes the underlying system hard to read.',
    summaryRole: 'Creative coder tuning the particle system, motion behavior, and visual constraints.',
    summaryTeam: 'Independent generative-art study.',
    summaryTimeline: '2024',
    summaryOutcome: 'Built a compact sketch where particle trails reveal the hidden motion structure without extra explanation.',
    storyline: {
      challenge: 'Make an abstract generative system feel legible instead of decorative.',
      approach: 'Used Perlin noise, particle density, trail opacity, and reset timing to expose the field through motion.',
      result: 'A small but useful study in turning invisible rules into visible behavior.',
    },
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
    summaryProblem: 'Most web interfaces assume a cursor, even though modern browsers can sense cameras, motion, audio, and physical context.',
    summaryRole: 'Creative technologist prototyping body-based browser interactions.',
    summaryTeam: 'NYU ITP experimental coursework.',
    summaryTimeline: '2023',
    summaryOutcome: 'Explored a set of browser sketches where breathing, pose, tilt, proximity, and shadow became inputs.',
    storyline: {
      challenge: 'Move web interaction beyond point-and-click without making the experience hard to understand.',
      approach: 'Built small experiments around familiar body actions so the input model felt immediately readable.',
      result: 'The work fed later thinking about embodied interaction, wearable UX, and interfaces that respect physical context.',
    },
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
    summaryProblem: 'Screen-based communication carries words and images, but it leaves out pressure, rhythm, and touch.',
    summaryRole: 'Designer and fabricator exploring haptic wearable patterns.',
    summaryTeam: 'NYU ITP wearable-tech coursework.',
    summaryTimeline: '2023',
    summaryOutcome: 'Built tactile prototypes that translated emotion and intent into vibration, pressure, and textile interaction.',
    storyline: {
      challenge: 'Design a communication vocabulary for the body without relying on a screen.',
      approach: 'Tested sleeves, vests, and pressure pads to learn which tactile patterns people could distinguish and remember.',
      result: 'The project sharpened how I think about subtle notification systems for wearable interfaces.',
    },
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
    summaryProblem: 'Live experiences depend on invisible systems of timing, light, sound, and audience flow that only become obvious when they fail.',
    summaryRole: 'Experience designer studying performance systems and spatial cues.',
    summaryTeam: 'NYU ITP performance-design coursework.',
    summaryTimeline: '2023',
    summaryOutcome: 'Mapped performance lessons into interaction principles around pacing, attention, and embodied memory.',
    storyline: {
      challenge: 'Use non-screen design tools to guide attention in a room where every moment happens only once.',
      approach: 'Studied lighting cues, spatial choreography, audience movement, and reactive stage behavior as interface materials.',
      result: 'The project connects live-performance craft to digital product pacing and feedback design.',
    },
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
    summaryProblem: 'A project can have good parts and still feel flat if the reader cannot follow the tension, choice, and consequence.',
    summaryRole: 'Narrative designer translating storytelling frameworks into product and case-study structure.',
    summaryTeam: 'Independent reflection through NYU ITP storytelling work.',
    summaryTimeline: '2025',
    summaryOutcome: 'Turned storytelling into a repeatable lens for structuring portfolio work around problem, method, and result.',
    storyline: {
      challenge: 'Make narrative useful for design work without turning every project into marketing copy.',
      approach: 'Studied pacing, sequence, tension, and framing, then applied those patterns to case-study structure.',
      result: 'The page explains the editorial method behind the portfolio: show why a decision mattered, not just what was made.',
    },
  },
  {
    slug: 'dna-speculative',
    name: 'DNA: Speculative Design',
    image: '/Assets/Projects/DNA/photos/boxes-closed.webp',
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
    storyline: {
      challenge: 'A question as large as immortality can become too abstract unless people are forced into a concrete choice.',
      approach: 'I designed the speculative pharmaceutical packaging, booklet, and decision ritual so the concept felt plausible enough to unsettle participants.',
      result: 'The project works because the artifact carries the argument: people do not just read about mortality, they have to choose a version of it.',
    },
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
    summaryProblem: 'Static design tools could not teach the behavior of systems that change, react, and generate variation over time.',
    summaryRole: 'Creative coder building weekly p5.js sketches.',
    summaryTeam: 'NYU ITP computational-media coursework.',
    summaryTimeline: '2023',
    summaryOutcome: 'Built a foundation in code-driven interaction that later supported generative art, simulations, and portfolio prototypes.',
    storyline: {
      challenge: 'Learn to think with rules, loops, randomness, and input instead of fixed visual compositions.',
      approach: 'Used weekly sketches to turn programming concepts into visible, interactive experiments.',
      result: 'The project marks the shift from designing static screens to designing responsive systems.',
    },
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
    summaryProblem: 'Immersive media can overwhelm people when every screen, speaker, or viewpoint competes for attention.',
    summaryRole: 'Designer experimenting with spatial narrative, 360 video, and multi-screen projection.',
    summaryTeam: 'NYU ITP immersive-media coursework.',
    summaryTimeline: '2023',
    summaryOutcome: 'Explored how sequencing, sound, and spatial framing can guide viewers through nonlinear media.',
    storyline: {
      challenge: 'Create immersive experiences that feel navigable instead of simply expanded.',
      approach: 'Worked with 360 footage, spatial sound, and projection layouts as narrative architecture.',
      result: 'The project shaped later installation work where space, attention, and pacing carry the story.',
    },
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
    summaryProblem: 'Design ideas stay abstract until real users, data, deployment constraints, and failure modes touch them.',
    summaryRole: 'Designer and developer building small deployed web applications.',
    summaryTeam: 'NYU ITP applications coursework.',
    summaryTimeline: '2023',
    summaryOutcome: 'Shipped functional app prototypes and learned how implementation changes product decisions.',
    storyline: {
      challenge: 'Move from polished concepts to usable software with real constraints.',
      approach: 'Designed, built, and deployed small applications, then adjusted the UX around live behavior and edge cases.',
      result: 'The work strengthened the link between design intent, code reality, and product usefulness.',
    },
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
    summaryProblem: 'Personas and happy paths often erase the emotional, situational, and accessibility needs that shape real product use.',
    summaryRole: 'Researcher and designer exploring inclusive edge cases.',
    summaryTeam: 'Independent inclusive-design study.',
    summaryTimeline: '2023',
    summaryOutcome: 'Built a compact framework for considering stress states, constraints, and lived context during design decisions.',
    storyline: {
      challenge: 'Design for people as they are, not as clean diagrams or ideal users.',
      approach: 'Studied edge cases, emotional states, and access needs as primary inputs rather than exceptions.',
      result: 'The project keeps inclusive design present across later UX work without overstating a small study.',
    },
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
    summaryProblem: 'A large public installation can fail from scope, timing, and team coordination even when the concept is strong.',
    summaryRole: 'Team lead coordinating concept, build scope, critique, and show-readiness.',
    summaryTeam: 'Five-person NYU ITP production studio team.',
    summaryTimeline: '2024',
    summaryOutcome: 'Helped move a team project from early concept into a showable installation under public-exhibition constraints.',
    storyline: {
      challenge: 'Turn an ambitious collaborative installation into something stable enough for a public show.',
      approach: 'Used tighter scope, clearer roles, and production checkpoints to keep the build moving.',
      result: 'The project is included as evidence of team leadership and shipping discipline, not as a solo case study.',
    },
  },

  {
    slug: 'arcade-lab',
    name: 'Arcade Lab',
    image: '/Assets/Projects/the-omakase/photos/cabinet-front.webp', // shares image with Omakase (it's the ancestor)
    tag: 'GAME PROTOTYPING',
    year: '2023',
    desc: 'Rapid game experiments — physical controllers & party mechanics leading to The Omakase',
    category: 'install',
    page: () => import('../pages/projects/ArcadeLabPage'),
    archiveOrder: 27,
    tier: 'd',
    summaryProblem: 'Physical game ideas can be charming in prototype form but break down quickly when rules, controls, and social dynamics are unclear.',
    summaryRole: 'Game prototyper exploring physical controllers and party mechanics.',
    summaryTeam: 'NYU ITP arcade/game prototyping work.',
    summaryTimeline: '2023',
    summaryOutcome: 'Tested controller and game-loop ideas that later informed The Omakase cabinet.',
    storyline: {
      challenge: 'Find which physical game mechanics were actually readable and replayable.',
      approach: 'Built quick prototypes, tested the control feel, and kept the strongest social mechanics.',
      result: 'The page works as a glimpse into process behind the more complete Omakase project.',
    },
  },

  /* ── Installations ── */
  {
    slug: 'black-hole',
    name: 'Black Hole',
    image: `${IMG}/black-hole.jpg`,
    tag: 'SCIENCE + FABRICATION',
    year: '2025',
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
    summaryTimeline: '2025',
    summaryOutcome: 'Turned five astrophysics concepts into tangible experiences for museum exhibition, making time dilation, lensing, and mergers legible through form.',
    summaryImage: '/Assets/Projects/black-hole-assets/time-trap.jpg',
    summaryImageAlt: 'Black Hole installation showing the time dilation physical model.',
    summaryStats: [
      { label: 'Phenomena modeled', value: '5' },
      { label: 'Interactive pieces', value: '3' },
      { label: 'Exhibition', value: 'HSNY' },
      { label: 'Disciplines', value: 'Science + build' },
    ],
    storyline: {
      challenge: 'Astrophysics concepts like lensing and time dilation are powerful, but they remain abstract for most audiences.',
      approach: 'I built five physical models that let people encounter black hole behavior through form, mechanism, and observation.',
      result: 'The project demonstrates that I can make complex science legible through fabrication and exhibition design.',
    },
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
    storyline: {
      challenge: 'A project about hidden information needed visitors to discover the theme physically rather than be told what it meant.',
      approach: 'I used blacklight, spatial sequencing, and reveal mechanics to make participants move through layers of visibility and observation.',
      result: 'The installation turned surveillance and discovery into a room-scale interaction, giving the concept a clear experiential hook.',
    },
  },
  {
    slug: 'the-omakase',
    name: 'The Omakase',
    image: '/Assets/mockups/projects/the-omakase_16x9.webp',
    cardMockupSource: '/Assets/mockups/projects/the-omakase_16x9.webp',
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
    summaryImage: '/Assets/Projects/the-omakase/photos/cabinet-front.webp',
    summaryImageAlt: 'The Omakase arcade cabinet photographed from the front.',
    summaryStats: [
      { label: 'Players', value: '2' },
      { label: 'Exhibitions', value: '2' },
      { label: 'Inputs', value: '16 keys' },
      { label: 'Format', value: 'Custom cabinet' },
    ],
    storyline: {
      challenge: 'Most indie arcade games treat the cabinet as a container, not as part of the game logic.',
      approach: 'I designed the controllers, feedback, and pacing together so the physical build shaped the competitive sushi ritual.',
      result: 'The project proves I can choreograph interaction across software, hardware, and social play.',
    },
  },
  {
    slug: 'revolving-stage',
    name: 'Revolving Stage',
    image: `${IMG}/revolving-stage.webp`,
    tag: 'FABRICATION',
    year: '2022',
    desc: 'Engineered a 15-foot rotating theatre stage built to carry performers and scenery safely',
    category: 'install',
    page: () => import('../pages/projects/RevolvingStagePage'),
    archiveOrder: 11,
    tier: 'b',
    summaryProblem: 'The production needed one stage device that could shift scenes quickly in full view of the audience without sacrificing actor safety or structural stability.',
    summaryRole: 'Designed and engineered the rotating platform, axle system, and stage behavior for live performance.',
    summaryTeam: 'Theatre fabrication project built with production collaborators.',
    summaryTimeline: '2022',
    summaryOutcome: 'Built a 15 ft. revolving stage capable of supporting 250+ kgs while changing scenes during live theatre without blackout.',
    summaryImage: '/Assets/Projects/RevolvingStage/photos/isometric-stage.png',
    summaryImageAlt: 'Isometric revolving stage rendering showing the rotating platform and staged scene.',
    summaryStats: [
      { label: 'Platform diameter', value: '15 ft' },
      { label: 'Load target', value: '250+ kg' },
      { label: 'Build window', value: '3 mo' },
      { label: 'Format', value: 'Live theatre' },
    ],
    storyline: {
      challenge: 'The show needed fast scenic transitions, but the mechanism had to be safe, stable, and reliable under live performance pressure.',
      approach: 'I engineered the rotating platform around load, axle behavior, performer movement, and stage timing instead of treating it as a decorative set piece.',
      result: 'The project demonstrates practical fabrication judgment: a large moving object worked as both stage infrastructure and storytelling tool.',
    },
  },
  {
    slug: 'moniac-machine',
    name: 'Moniac Machine',
    image: '/Assets/Projects/Moniac/photos/hero-cabinet.png',
    cardMockupSource: '/Assets/Projects/Moniac/photos/original-moniac.png',
    tag: 'GAME DESIGN',
    year: '2024',
    desc: 'Turned a 1949 hydraulic economic computer into a playable strategy game about systems',
    category: 'install',
    page: () => import('../pages/projects/MoniacMachinePage'),
    archiveOrder: 15,
    tier: 'b',
    summaryProblem: 'Economic systems are hard to feel because they are usually explained through abstract flows, charts, and policy language.',
    summaryRole: 'Game designer and interaction designer translating the MONIAC computer into playable mechanics and a physical-digital learning experience.',
    summaryTeam: 'Independent game and systems design project at NYU ITP.',
    summaryTimeline: '2024',
    summaryOutcome: 'Turned a historical hydraulic computer into a strategy game where players could experiment with cause, effect, and system feedback.',
    summaryStats: [
      { label: 'Policy levers', value: '7' },
      { label: 'Round length', value: '60s' },
      { label: 'Source system', value: '1949 MONIAC' },
      { label: 'Medium', value: 'Game' },
    ],
    storyline: {
      challenge: 'The original MONIAC made economics visible with water, but contemporary audiences needed a playable way into the system.',
      approach: 'I converted the machine logic into game rules, feedback loops, and cabinet-like interaction so players could test decisions rather than read a diagram.',
      result: 'The project reframes economic education as systems play, making feedback and trade-offs easier to understand.',
    },
  },
  {
    slug: 'dumb-waiter-set-design',
    name: "Set Design for Pinter's The Dumb Waiter",
    image: '/Assets/Projects/dumb-waiter/photos/card-4x5.jpg',
    cardMockup: '/Assets/Projects/dumb-waiter/photos/card-4x5.jpg',
    cardMockupSquare: '/Assets/Projects/dumb-waiter/photos/card-1x1.jpg',
    cover16x9: '/Assets/Projects/dumb-waiter/photos/cover-16x9.jpg',
    cardMockupSource: '/Assets/Projects/dumb-waiter/photos/ben-gus-wall.jpg',
    cardMockupAlt: "Scenic model for Pinter's The Dumb Waiter showing two hitmen in a dark basement room.",
    tag: 'SCENIC DESIGN',
    year: '2024',
    desc: 'John Wick-inspired basement set model for Pinter\'s one-act play about two hitmen waiting for orders',
    category: 'install',
    page: () => import('../pages/projects/DumbWaiterPage'),
    archiveOrder: 26,
    tier: 'b',
    summaryProblem: 'The play depends on waiting, invisible authority, and small talk turning dangerous, so the room had to feel ordinary and threatening at once.',
    summaryRole: 'Set designer building the scenic concept, spatial model, prop system, and visual tone.',
    summaryTeam: 'Independent theatre set design model based on Harold Pinter\'s one-act play.',
    summaryTimeline: '2024',
    summaryOutcome: 'Built a cinematic basement model where the dumb waiter, weapons wall, beds, and thresholds make the unseen system feel present.',
    summaryImage: '/Assets/Projects/dumb-waiter/photos/ben-gus-wall.jpg',
    summaryImageAlt: 'Close scenic model view of Ben and Gus inside the Dumb Waiter basement room.',
    summaryStats: [
      { label: 'Format', value: 'Scale model' },
      { label: 'Rooms implied', value: '3' },
      { label: 'Core tension', value: 'Waiting' },
      { label: 'Visual tone', value: 'Noir action' },
    ],
    storyline: {
      challenge: 'Pinter keeps the real power offstage, so the design needed to make an invisible command structure feel physically present.',
      approach: 'I used a John Wick-influenced basement language: black walls, warm wood, weapon displays, tight doorways, and a dumb waiter as the room\'s control point.',
      result: 'The set turns a waiting room into a pressure chamber where every object points back to hierarchy, obedience, and the final threat.',
    },
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
    summaryProblem: 'A theatre set needed to create atmosphere while staying safe, navigable, and reliable during performance.',
    summaryRole: 'Scenic designer working across structure, materials, lighting, and performer safety.',
    summaryTeam: 'NYU theatre production context.',
    summaryTimeline: '2024',
    summaryOutcome: 'Built an abandoned-greenhouse environment that balanced visual mood with backstage practicality.',
    storyline: {
      challenge: 'Make a low-light scenic environment expressive without making it unsafe or fragile.',
      approach: 'Designed layered materials, lighting, and hidden safety affordances around performer movement.',
      result: 'The project shows spatial design judgment under live-performance constraints.',
    },
  },
  {
    slug: 'sculpture',
    name: 'Sculpture',
    image: '/Assets/Projects/Sculpture/1.jpg',
    tag: 'SCULPTURE',
    year: '2020',
    desc: 'Competition sculpture glimpse from beginner practice to finished piece',
    category: 'install',
    page: () => import('../pages/projects/SculpturePage'),
    archiveOrder: 31,
    tier: 'd',
    summaryProblem: 'I needed to learn figurative sculpture quickly enough to compete with a finished physical piece.',
    summaryRole: 'Sculptor working across anatomy study, armature building, plaster/clay form, and final finish.',
    summaryTeam: 'Firodia Karandak competition sculpture work in Pune.',
    summaryTimeline: 'Dec 2019 to Mar 2022',
    summaryOutcome: 'Finished a competition sculpture that shows early hands-on range, material patience, and physical making discipline.',
    summaryStats: [
      { label: 'Context', value: 'Firodia' },
      { label: 'Medium', value: 'Sculpture' },
      { label: 'Focus', value: 'Anatomy + form' },
      { label: 'Role', value: 'Sculptor' },
    ],
    storyline: {
      challenge: 'Starting with little sculpture experience meant the project had to be learned through repeated material practice.',
      approach: 'I studied anatomy, built armatures, tested failed forms, and refined the final figure through hands-on correction.',
      result: 'This stays as a compact archive glimpse: useful proof of making ability, not a lead case study.',
    },
  },

  /* ── Brand & Visual ── */
  {
    slug: 'mentra-brand',
    name: 'Mentra Brand & Packaging',
    image: '/Assets/Projects/mentra-brand/photos/render-both-frames.webp',
    cardMockupSource: '/Assets/Projects/mentra-brand/photos/product-flat.webp',
    tag: 'BRAND & PACKAGING',
    year: '2025–26',
    desc: 'Brand identity and packaging for AI smart glasses: logo, box, booklet, ads, and 24 social templates',
    category: 'brand',
    page: () => import('../pages/projects/MentraBrandPage'),
    archiveOrder: 4,
    tier: 'a',
    selected: true,
    selectedOrder: 11,
    summaryProblem: 'A new hardware brand has to earn trust before anyone puts the product on, which means packaging, identity, and launch surfaces all have to work as one system.',
    summaryRole: 'Sole designer across logo, packaging, printed matter, render library, social templates, and advertising.',
    summaryTeam: '1 designer working across hardware, product, operations, and manufacturing partners.',
    summaryTimeline: 'Q3 2025 to 2026',
    summaryOutcome: 'Shipped a full brand system into customers’ hands, from retail box and booklet to launch assets and creator-ready templates.',
    summaryImage: '/Assets/Projects/mentra-brand/photos/render-both-frames.webp',
    summaryImageAlt: 'Mentra brand hero showing both smart-glasses frame variants.',
    summaryStats: [
      { label: 'Packaging iterations', value: '7' },
      { label: 'Booklet rounds', value: '4' },
      { label: 'Social templates', value: '24' },
      { label: 'Render families', value: '3' },
    ],
    storyline: {
      challenge: 'New hardware brands need to earn trust before the product is even in someone’s hand.',
      approach: 'I designed the identity, packaging, printed matter, and launch assets as one coherent system around clarity, confidence, and restraint.',
      result: 'It shows I can carry a product story from industrial object to shelf experience to launch surface.',
    },
  },
  {
    slug: 'tedx',
    name: 'TEDxVITPune',
    image: '/Assets/images/tedx.jpg',
    cardMockup: '/Assets/images/tedx.jpg',
    cardMockupAlt: 'TEDxVITPune stage: red TEDx letters and box-column skyline set with the red circular stage',
    tag: 'ART DIRECTION',
    year: '2021',
    desc: 'Sole stage designer on an 8-person team building a parallax cityscape stage for 800-plus attendees',
    category: 'brand',
    page: () => import('../pages/projects/TedxPage'),
    archiveOrder: 6,
    tier: 'a',
    summaryProblem: 'A large student conference needed a stage identity that could feel iconic in the room, photograph well, and stay buildable for a small stage team.',
    summaryRole: 'Art director and sole stage designer leading the visual concept, stage direction, production coordination, and execution.',
    summaryTeam: '8-person stage team for TEDxVITPune.',
    summaryTimeline: '2021',
    summaryOutcome: 'Delivered a parallax cityscape stage for 800-plus attendees, turning the event identity into a strong spatial experience.',
    summaryStats: [
      { label: 'Audience', value: '800+' },
      { label: 'Stage team', value: '8' },
      { label: 'Build span', value: '8 weeks' },
      { label: 'Role', value: 'Art director' },
    ],
    storyline: {
      challenge: 'The event needed a stage that could carry the TEDx identity at audience scale while still being buildable by a student team.',
      approach: 'I designed the stage system around layered cityscape forms, clear production guides, and a composition that worked both live and on camera.',
      result: 'The project shows leadership at scale: concept, team coordination, and physical execution all had to land together.',
    },
  },
  {
    slug: 'code-for-build',
    name: 'Code for Build',
    image: `${IMG}/code-for-build.jpg`,
    tag: 'UX DESIGN',
    year: '2021',
    desc: 'Mobile-first coding education concept using 3D building blocks',
    category: 'ux',
    page: () => import('../pages/projects/CodeForBuildPage'),
    archiveOrder: 24,
    tier: 'c',
    summaryProblem: 'A phone-only beginner learner needed a more visual way to understand HTML and CSS layout structure.',
    summaryRole: 'Interaction designer exploring lesson flow, block metaphors, mobile UI, and 3D visual explanation.',
    summaryTeam: 'Self-initiated education concept.',
    summaryTimeline: '2021',
    summaryOutcome: 'Created a mobile prototype concept where containers, padding, images, text, and buttons became stackable 3D blocks.',
    summaryStats: [
      { label: 'Audience', value: 'Teen learners' },
      { label: 'Method', value: '3D blocks' },
      { label: 'Scope', value: 'UX + brand' },
      { label: 'Duration', value: '3 mo' },
    ],
    storyline: {
      challenge: 'Coding lessons can feel abstract when the learner only has a phone and no desktop development environment.',
      approach: 'I mapped web-layout concepts to 3D blocks and paired each lesson with a preview of the resulting page structure.',
      result: 'The project is useful archive evidence of educational interaction thinking, best shown as a short glimpse.',
    },
  },
  {
    slug: 'typeface',
    name: "Butler's Slice",
    image: `${IMG}/typeface.webp`,
    tag: 'TYPE DESIGN',
    year: '2022',
    desc: 'Variable display typeface with geometric slice cuts — 400+ glyphs, 3 weights',
    category: 'brand',
    page: () => import('../pages/projects/TypefacePage'),
    archiveOrder: 16,
    tier: 'b',
    summaryProblem: 'The typeface needed a distinctive display personality without becoming too decorative to use across a full glyph system.',
    summaryRole: 'Type designer developing the display concept, geometric slice logic, glyph set, spacing, and weight exploration.',
    summaryTeam: 'Independent type design project.',
    summaryTimeline: '2022',
    summaryOutcome: 'Built a 400-plus glyph variable display typeface with three weights and a consistent sliced geometric voice.',
    summaryStats: [
      { label: 'Glyphs', value: '400+' },
      { label: 'Weights', value: '3' },
      { label: 'Use case', value: 'Display' },
      { label: 'Tooling', value: 'Web specimen' },
    ],
    storyline: {
      challenge: 'Display type often gets attention through one-off letters, but a usable typeface needs the idea to survive across the full system.',
      approach: 'I developed a repeatable slice grammar, expanded it across hundreds of glyphs, and tested weight variation for consistency.',
      result: 'The project shows visual-system discipline at a small scale: one formal rule carried through a complete type artifact.',
    },
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
    summaryProblem: 'A podcast about art and design needed an identity that felt credible, flexible, and easy to reproduce across episodes.',
    summaryRole: 'Visual designer for identity, motion, and episode graphics.',
    summaryTeam: 'ArtTown podcast student media context.',
    summaryTimeline: '2021',
    summaryOutcome: 'Created a flexible visual system for an interview-led arts podcast.',
    storyline: {
      challenge: 'Give a recurring media series a recognizable system without overcomplicating production.',
      approach: 'Built reusable identity and motion patterns that could support weekly episode assets.',
      result: 'The project is a small brand-system glimpse from an earlier stage of practice.',
    },
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
    summaryProblem: 'A student conference needed a visual identity and web presence that could hold many speakers, sessions, and promotional moments.',
    summaryRole: 'Creative direction, branding, and web design.',
    summaryTeam: 'Student conference organizing team.',
    summaryTimeline: '2021',
    summaryOutcome: 'Delivered a conference identity and digital presence across event communications.',
    storyline: {
      challenge: 'Create a coherent public face for a multi-speaker student event.',
      approach: 'Aligned branding, visual direction, and web materials so the conference felt like one system.',
      result: 'The project stays as an early branding example with a concise story, not a long case study.',
    },
  },
]

for (const project of projects) {
  const publicPreview = project.access?.publicPreviewImage
  if (project.access?.mode === 'request' || project.nda) {
    project.cardMockup = publicPreview || project.cardMockup || project.cardMockupSource || project.image || NDA_COVER
    project.cardMockupAlt = project.access?.publicPreviewAlt || project.cardMockupAlt || `${project.name} public preview cover`
  } else {
    project.cardMockup ??= defaultCardMockup(project.slug)
    // Fold the tag into the fallback so screen readers get real context
    // instead of a generic "project mockup" on every card.
    project.cardMockupAlt ??= project.tag
      ? `${project.name} — ${project.tag} project cover`
      : `${project.name} project cover`
  }
}

// Freshly authored cover sets. 16:9 is reserved for featured/highlight panels,
// 4:5 drives portrait Work cards, and 1:1 drives square Work cards so card
// content is not squeezed into the wrong crop.
const MOCKUPS = '/Assets/mockups/projects'
const NEW_COVER_SLUGS = new Set([
  // First batch
  'ai-voice', 'atps', 'breakgen', 'dna-speculative', 'drowning', 'healthapp',
  'making-of-time', 'moniac-machine', 'sculpture', 'the-point-cdc', 'zentipay',
  'ballah-code', 'black-hole', 'clawed-chat', 'executivelens', 'mentra',
  'mentra-miniapps', 'sea-of-salt', 'tedx', 'vishwaconclave',
  'keyboard-project', 'oncall-lens',
  // Second batch (incl. the flagship TransFi + Jugalbandi)
  'code-for-build', 'cuetv', 'enigma', 'ibm', 'jugalbandi', 'office-of-diversity',
  'raahi-project', 'revolving-stage', 'shuffle', 'the-omakase', 'transfi-project',
  'typeface', 'uv-light', 'vj-software', 'mentra-brand',
])
const SQUARE_COVER_SLUGS = new Set([
  'ai-voice', 'atps', 'breakgen', 'code-for-build', 'cuetv', 'dna-speculative',
  'drowning', 'enigma', 'healthapp', 'ibm', 'jugalbandi', 'keyboard-project',
  'making-of-time', 'moniac-machine', 'office-of-diversity', 'raahi-project',
  'revolving-stage', 'sculpture', 'shuffle', 'the-omakase', 'the-point-cdc',
  'transfi-project', 'typeface', 'uv-light', 'vj-software', 'zentipay',
  'ballah-code', 'black-hole', 'clawed-chat', 'executivelens', 'mentra',
  'mentra-brand', 'mentra-miniapps', 'oncall-lens', 'sea-of-salt', 'tedx',
  'vishwaconclave',
])
for (const project of projects) {
  if (NEW_COVER_SLUGS.has(project.slug)) {
    project.cardMockup = `${MOCKUPS}/${project.slug}_4x5.webp`
    project.cover16x9 = `${MOCKUPS}/${project.slug}_16x9.webp`
  }
  if (SQUARE_COVER_SLUGS.has(project.slug)) {
    project.cardMockupSquare = `${MOCKUPS}/${project.slug}_1x1.webp`
  }
}

const clawedSquareCover = `${MOCKUPS}/clawed-chat_1x1.webp`
const clawedProject = projects.find(project => project.slug === 'clawed-chat')
if (clawedProject) {
  clawedProject.image = clawedSquareCover
  clawedProject.cardMockup = clawedSquareCover
  clawedProject.cardMockupSquare = clawedSquareCover
  clawedProject.cover16x9 = clawedSquareCover
  clawedProject.cardMockupSource = clawedSquareCover
}

/* ──────────────────────────────────────────────────────────────────────
   Helper selectors
   ────────────────────────────────────────────────────────────────────── */

const WORK_PRIORITY_SLUGS = [
  'mentra',
  'transfi-project',
  'clawed-chat',
  'raahi-project',
  'zentipay',
  'executivelens',
  'mentra-miniapps',
  'ballah-code',
  'vj-software',
  'office-of-diversity',
  'jugalbandi',
  'enigma',
  'shuffle',
  'the-omakase',
  'ibm',
  'the-point-cdc',
  'ai-voice',
  'cuetv',
  'code-for-build',
  'making-of-time',
  'black-hole',
  'mentra-brand',
  'revolving-stage',
  'moniac-machine',
  'dumb-waiter-set-design',
  'sea-of-salt',
  'drowning',
  'sculpture',
  'tedx',
  'typeface',
  'vishwaconclave',
] as const

const WORK_HIDDEN_SLUGS = new Set<string>([
  'uv-light',
  'atps',
  'dna-speculative',
  'comp-media',
  'hypercinema',
  'applications',
  'healthapp',
  'messy-humans',
  'production-studio',
  'arcade-lab',
  'flow-fields',
  'embodied-web',
  'feeling-patterns',
  'performance-by-design',
  'on-becoming',
  'storytelling',
  'org-dashboard',
])

const WORK_SELECTED_COUNT = 6
const HOMEPAGE_SELECTED_ARCHIVE_COUNT = 8
const WORK_PRIORITY = new Map<string, number>(WORK_PRIORITY_SLUGS.map((slug, index) => [slug, index]))
const WORK_SELECTED_SLUGS = new Set<string>(WORK_PRIORITY_SLUGS.slice(0, WORK_SELECTED_COUNT))

const getWorkPriority = (project: Project) => WORK_PRIORITY.get(project.slug) ?? Number.MAX_SAFE_INTEGER

const sortByWorkPriority = (a: Project, b: Project) => {
  const priorityDiff = getWorkPriority(a) - getWorkPriority(b)
  if (priorityDiff !== 0) return priorityDiff
  return (a.archiveOrder ?? 99) - (b.archiveOrder ?? 99)
}

const isPubliclyVisibleProject = (project: Project) =>
  !project.hidden &&
  project.access?.mode !== 'hidden' &&
  WORK_PRIORITY.has(project.slug) &&
  !WORK_HIDDEN_SLUGS.has(project.slug)

export const visibleProjects = projects
  .filter(isPubliclyVisibleProject)
  .sort(sortByWorkPriority)

/** S-Tier: flagship projects for homepage featured grid */
export const featuredProjects = visibleProjects
  .filter(p => p.featured)
  .sort(sortByWorkPriority)

/** Explicit recruiter-facing work list */
export const selectedWorkProjects = visibleProjects
  .filter(p => WORK_SELECTED_SLUGS.has(p.slug))
  .sort(sortByWorkPriority)

/** Homepage follow-on grid after flagship work */
export const homepageSelectedProjects = visibleProjects
  .filter(p => !p.featured)
  .slice(0, HOMEPAGE_SELECTED_ARCHIVE_COUNT)

/** Remaining visible work shown below the fold on /work */
export const archiveWorkProjects = visibleProjects
  .filter(p => !selectedWorkProjects.some(selected => selected.slug === p.slug))
  .sort(sortByWorkPriority)

/** All projects for the Work page in curated mixed order */
export const allProjectsCurated = (() => {
  return visibleProjects
})()

export function filterProjectsByCategory(items: Project[], cat: ProjectCategory): Project[] {
  return items.filter(p => p.category === cat && isPubliclyVisibleProject(p))
}

/** Get projects by category */
export function projectsByCategory(cat: ProjectCategory): Project[] {
  return visibleProjects.filter(p => p.category === cat)
}

/** Find a single project by slug */
export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function isRequestAccessProject(project?: Project): boolean {
  return Boolean(project && (project.access?.mode === 'request' || project.nda))
}

export function getProjectAccessLabel(project?: Project): string {
  if (!isRequestAccessProject(project)) return ''
  return `NDA / ${project?.access?.publicLabel || 'Quick glimpse'}`
}

export function isHiddenProject(project?: Project): boolean {
  return Boolean(project && !isPubliclyVisibleProject(project))
}
