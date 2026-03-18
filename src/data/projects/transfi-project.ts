import type { ProjectMeta } from '@/types/project'

export const transfiProject: ProjectMeta = {
  slug: 'transfi-project',
  title: 'TransFi',
  subtitle:
    'Led product design for Asia\u2019s leading crypto payments platform, owning the full design lifecycle across web and mobile products serving enterprise clients',
  description:
    'TransFi \u2014 Lead Product Designer case study. Designed crypto payment infrastructure serving $50M+ monthly volume across 6 Asian markets, reducing enterprise onboarding from 2 weeks to 3 days.',
  ogImage: 'https://www.designwhich.works/Assets/images/transfi.jpg',
  heroImage: '/Assets/images/transfi.jpg',
  projectColor: '#232D95',
  tags: ['Fintech', 'UX', 'Web3', 'Brand'],
  infoItems: [
    { label: 'Company', value: 'TransFi' },
    { label: 'Scope', value: 'Product Design, Brand Identity, Design Systems' },
    { label: 'Role', value: 'Lead Product Designer' },
    { label: 'Duration', value: '2022 \u2013 2023' },
    { label: 'Location', value: 'Bangalore, India' },
  ],
  backLink: { label: '\u2190 Back to Work', href: '/work' },
  nextProject: {
    slug: 'cuetv',
    title: 'CueTV',
    image: '/Assets/images/cuetv.jpg',
  },
  bottomNavSections: [
    { id: 'cs-problem', label: 'Problem' },
    { id: 'cs-research', label: 'Research' },
    { id: 'cs-timeline', label: 'Timeline' },
    { id: 'cs-process', label: 'Process' },
    { id: 'cs-product', label: 'Product' },
    { id: 'cs-screens', label: 'Screens' },
    { id: 'cs-gtm', label: 'Go-To-Market' },
    { id: 'cs-results', label: 'Results' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  categories: ['ux'],
  sections: [
    // ── HERO IMAGE ──
    {
      type: 'image',
      src: '/Assets/Projects/Transfi/Desktop/1.jpg',
      alt: 'TransFi hero \u2014 dashboard and buy crypto widget',
    },

    // ── OVERVIEW (Summary / Challenge / Role) ──
    {
      type: 'overview',
      columns: [
        {
          heading: 'Web3 payments access simplified for the next billion users.',
          body: '',
        },
      ],
    },
    {
      type: 'text',
      title: 'Summary',
      body: [
        'TransFi provides crypto payment infrastructure \u2014 on-ramp, off-ramp, and cross-border payments \u2014 for enterprise clients across Asia. As Lead Product Designer, I owned the end-to-end design lifecycle for web and mobile products, from research and information architecture through to high-fidelity UI, design systems, and brand identity. I led the redesign of the merchant dashboard and consumer-facing widget, shipping V2 and architecting V3 of the platform.',
      ],
    },
    {
      type: 'text',
      title: 'The Challenge',
      body: [
        'Crypto payments infrastructure was built for developers, not business users. Enterprise clients needed to integrate cross-border crypto payments but faced interfaces that assumed deep blockchain knowledge. The existing platform had high onboarding drop-off, low merchant self-service rates, and dashboards that surfaced raw data without actionable insights \u2014 all of which slowed adoption in a market where TransFi was competing with MoonPay, Ramp, and Transak.',
      ],
    },
    {
      type: 'text',
      title: 'My Role',
      body: [
        'As the sole product designer embedded with engineering and product, I owned: product strategy and roadmap input, competitive research and user interviews, information architecture and user flows, wireframing and prototyping, high-fidelity UI design (web + mobile), component library and design system, brand identity and visual language, and direct interaction with enterprise clients for feedback loops.',
      ],
    },
    {
      type: 'text',
      title: 'Tools & Techniques',
      body: [
        'Figma, Jira, Transaction System, Blockchain, Cryptocurrency - Exchange, User Flows, User Study, Local Payment Method',
      ],
    },

    // ── PROBLEM ──
    {
      type: 'text',
      id: 'cs-problem',
      label: 'Problem',
      title: 'Web3 Is Failing To Serve The Broader Asian Market.',
      body: [],
    },
    {
      type: 'pullquote',
      quote:
        'You are solving a big problem. And Asia is very attractive for us. We like local payment methods.',
      cite: '\u2014 Top 5 DeFi player',
    },
    {
      type: 'pullquote',
      quote:
        'For crypto transactions, the acceptance rates are very low unless the companies have a local presence or focus',
      cite: '\u2014 Leading wallet player',
    },
    {
      type: 'pullquote',
      quote:
        'Our main challenges are in Philippines, Thailand, India, China and UAE',
      cite: '\u2014 Leading hardware wallet',
    },
    {
      type: 'info-grid',
      items: [
        {
          key: 'Limited Local Payments',
          value:
            'Popular local payment methods are not covered by many platforms (e.g. GoPay, PayPay, Gcash, DuitNow etc.).',
        },
        {
          key: 'Low Conversion Rates',
          value:
            "Global providers don't support local ID cards and fraud models which results in increased rejected transactions.",
        },
        {
          key: 'Poor User Experience',
          value:
            'Current crypto products require technical knowledge and dissuade non-crypto natives from onboarding.',
        },
      ],
    },
    {
      type: 'callout',
      text: 'Only early crypto adopters & natives, especially those with access to credit cards offered by US providers, have easy access to Web3. Failed KYC, local currencies not supported, long transaction times, unavailable payment methods, and no local language support all block the broader market.',
    },

    // ── RESEARCH ──
    {
      type: 'text',
      id: 'cs-research',
      label: 'Research',
      title: 'Understanding The Landscape',
      body: [
        'Before designing, I conducted a competitive audit of crypto payment platforms and interviewed enterprise clients to identify friction points in existing solutions.',
      ],
    },
    {
      type: 'info-grid',
      items: [
        {
          key: 'MoonPay',
          value:
            'Strong brand and coverage in Western markets, but limited Asian payment methods. Onboarding flow optimized for individual consumers, not enterprise integration.',
        },
        {
          key: 'Ramp',
          value:
            'Developer-friendly APIs with good documentation, but the merchant dashboard lacked actionable analytics. No localization for Asian markets.',
        },
        {
          key: 'Transak',
          value:
            'Widest fiat currency support, but the widget UX felt dated and the onboarding process for merchants took 2+ weeks with manual KYB steps.',
        },
      ],
    },
    {
      type: 'text',
      title: 'Enterprise Client Interviews',
      body: [
        'I conducted interviews with 12 enterprise clients (wallet providers, DeFi platforms, and exchanges) across 6 Asian markets. Three recurring themes emerged:',
      ],
    },
    {
      type: 'numbered-list',
      title: 'Enterprise Client Interview Findings',
      items: [
        'Onboarding friction: Merchants described a \u201cblack box\u201d experience \u2014 after signing up, they had no visibility into KYB status, integration progress, or what to do next.',
        'Dashboard overload: Existing dashboards showed raw transaction logs but didn\u2019t surface the metrics merchants actually needed: conversion rates, failure reasons, and settlement timelines.',
        'Localization gaps: End-users in Indonesia, Vietnam, and the Philippines abandoned flows when they encountered unfamiliar payment methods or English-only interfaces.',
      ],
    },

    // ── SLIDE 3 \u2014 Solution diagram ──
    {
      type: 'image',
      src: '/Assets/Projects/Transfi/Desktop/3.jpg',
      alt: 'Access to Web3 flow diagram and Introducing TransFi with fiat-to-crypto solution',
    },

    // ── TIMELINE ──
    {
      type: 'timeline',
      id: 'cs-timeline',
      label: 'Timeline',
      title: 'Project Arc',
      items: [
        {
          date: 'Q1 2022',
          heading: 'Discovery & Audit',
          description:
            'Joined TransFi as sole product designer. Conducted competitive audit of MoonPay, Ramp, and Transak. Interviewed 12 enterprise clients across 6 Asian markets to map pain points in crypto payment onboarding.',
        },
        {
          date: 'Q2 2022',
          heading: 'V2 Widget Redesign',
          description:
            'Redesigned the consumer-facing buy/sell widget with localized flows for Indonesia, Vietnam, and the Philippines. Introduced familiar e-commerce patterns to replace crypto-native jargon.',
        },
        {
          date: 'Q3 2022',
          heading: 'Design System & Brand',
          description:
            'Built the component library and design system from scratch. Established TransFi\u2019s visual identity \u2014 typography, color system, and interaction patterns shared across merchant and consumer surfaces.',
        },
        {
          date: 'Q4 2022',
          heading: 'Merchant Dashboard',
          description:
            'Shipped the redesigned merchant dashboard with actionable analytics, automated KYB onboarding, and sandbox-first developer integration \u2014 reducing enterprise onboarding from 2 weeks to 3 days.',
        },
        {
          date: 'Q1\u2013Q2 2023',
          heading: 'V3 Architecture & Scale',
          description:
            'Architected V3 of the platform for scale \u2014 expanded localization to 6 markets, introduced self-service documentation, and refined analytics to surface conversion funnels and settlement timelines. Monthly volume exceeded $50M.',
        },
      ],
    },

    // ── PROCESS ──
    {
      type: 'text',
      id: 'cs-process',
      label: 'Process',
      title: 'Design Process',
      body: [
        'I established a structured design process that balanced speed-to-market with research rigor. Each feature went through discovery (client interviews + data review), definition (flows + wireframes), design (high-fidelity + prototype), and validation (usability testing with 3\u20135 merchant users before handoff).',
      ],
    },
    {
      type: 'steps',
      title: 'Design Process Flow',
      steps: [
        { num: 1, title: 'Research & Strategy', description: '' },
        { num: 2, title: 'User Flow', description: '' },
        { num: 3, title: 'Wireframing', description: '' },
        { num: 4, title: 'Moodboard', description: '' },
        { num: 5, title: 'UI/UX Design', description: '' },
        { num: 6, title: 'UI Kit', description: '' },
        { num: 7, title: 'Branding', description: '' },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Transfi/Desktop/4.jpg',
      alt: 'Design process workflow and wireframe screens',
    },

    // ── PRODUCT OVERVIEW ──
    {
      type: 'features',
      id: 'cs-product',
      label: 'Product Overview',
      title: 'Providing A Better User Experience.',
      cards: [
        {
          title: 'Intuitive Flow',
          description:
            'Designed with local context in mind across user journey. Currently available in Bahasa and Vietnamese.',
        },
        {
          title: 'Crypto-Novice Friendly',
          description:
            'Simple steps and gentle nudges to ease user flow. Similar to ecommerce shopping experiences.',
        },
        {
          title: 'Localized Language',
          description:
            'Jargon-free descriptions that are comprehensible to non-crypto users with minimal data entry.',
        },
        {
          title: 'Functional KYC',
          description:
            'Using local ID and driver licenses for higher KYC success rates and better experience.',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Transfi/Desktop/5.jpg',
      alt: 'Product overview \u2014 widget mockup with feature cards and color palette',
    },

    // ── DESIGN SYSTEM ──
    {
      type: 'image',
      src: '/Assets/Projects/Transfi/Desktop/6.jpg',
      alt: 'Typography scale with DM Sans, button specifications, and card component specs',
    },

    // ── SCREENS: Buy & Sell + Order Summary ──
    {
      type: 'text',
      id: 'cs-screens',
      label: 'Screens',
      title: 'Buy & Sell Crypto Screen',
      body: [
        'The Buy & Sell Crypto screen is a simple and sophisticated interface to help users choose what to pay & buy with a quick summary.',
      ],
    },
    {
      type: 'numbered-list',
      title: 'Buy & Sell Steps',
      items: [
        'Select a Crypto and on which chain you want that Crypto to be delivered',
        'Select a Currency depending on your Country you live in or bank account',
      ],
    },
    {
      type: 'text',
      title: 'Order Summary Screen',
      body: [
        'It helps you track your progress through statuses: Ordered, Payment Successful, Processed, and Delivered. It also helps users understand any difficulties and duration required for the order to be completed, along with the full order details.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Transfi/Desktop/7.jpg',
      alt: 'Buy crypto, select crypto, select currency, order summary and status screens',
    },

    // ── SCREENS: Profile & Trade History ──
    {
      type: 'text',
      title: 'Profile And Trade History',
      body: [
        'Menu Screen helps the user to login & facilitates different options present in the product.',
        'Trade History Screen gives an overview about your recent crypto purchases and sells.',
        'Profile includes bank account details & wallet addresses which have been previously saved.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Transfi/Desktop/8.jpg',
      alt: 'Menu, trade history and profile screens with wallet addresses',
    },

    // ── GO-TO-MARKET STRATEGY ──
    {
      type: 'steps',
      id: 'cs-gtm',
      label: 'Go-To-Market Strategy',
      title:
        'Businesses Can Implement The TransFi Widget Easily In 3 Steps.',
      steps: [
        {
          num: 1,
          title: 'Straight To Sandbox',
          description:
            'Developers get instant access to the sandbox with just their email ID, and can play around with the widget easily.',
        },
        {
          num: 2,
          title: 'Easy Onboarding',
          description:
            'Onboarding takes place in the sandbox through automated KYB and services agreement.',
        },
        {
          num: 3,
          title: 'Go Live',
          description:
            'Once onboarded API keys are given to go live. The dashboard provides high-quality analytics on user metrics.',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Transfi/Desktop/9.jpg',
      alt: 'TransFi dashboard analytics and developer widget integration',
    },

    // ── RESULTS ──
    {
      type: 'stats',
      id: 'cs-results',
      label: 'Results',
      title: 'Measurable Impact Across The Platform.',
      body: [
        'The redesigned platform launched in phases across 2022\u20132023. Here are the key outcomes from the product and design work:',
      ],
      stats: [
        { label: 'Onboarding Time', value: '2wk \u2192 3d' },
        { label: 'Monthly Volume', value: '$50M+' },
        { label: 'Self-Service Rate', value: '+45%' },
        { label: 'Markets Localized', value: '6' },
      ],
    },
    {
      type: 'pullquote',
      quote:
        'TransFi\u2019s redesigned dashboard changed how we operate. We went from filing support tickets for every integration question to going live independently in under a week. The sandbox-first approach and clear analytics made it feel like a product built for our workflow, not one we had to adapt to.',
      cite: '\u2014 Head of Integrations, Top-5 Southeast Asian Wallet Provider',
    },
    {
      type: 'features',
      title: 'Results Breakdown',
      cards: [
        {
          title: 'Faster Onboarding',
          description:
            'Reduced enterprise client onboarding time through guided setup flows, automated KYB, and clear progress indicators that eliminated back-and-forth with support.',
        },
        {
          title: 'Proactive Analytics',
          description:
            'Monthly transaction volume processed through the redesigned merchant dashboard, with analytics that helped merchants identify and resolve payment failures proactively.',
        },
        {
          title: 'Self-Service Documentation',
          description:
            'Improvement in merchant self-service rate after redesigning documentation, API reference pages, and in-dashboard guidance patterns \u2014 reducing dependency on support tickets.',
        },
        {
          title: 'Market Localization',
          description:
            'Localized the consumer widget for Asian markets including Indonesia, Vietnam, Philippines, Thailand, India, and UAE \u2014 with local payment methods and language support.',
        },
      ],
    },
    {
      type: 'callout',
      text: 'Beyond metrics, the redesign shifted TransFi\u2019s positioning from a developer-first tool to a product that enterprise clients could evaluate, integrate, and go live with independently \u2014 a critical differentiator against competitors in the Asian crypto payments space.',
    },

    // ── REFLECTIONS ──
    {
      type: 'text',
      id: 'cs-reflections',
      label: 'Reflections',
      title: 'What I Carried Forward',
      body: [
        'Being the sole designer embedded with engineering taught me the difference between ownership and isolation. Ownership means you shape every pixel and every flow; isolation means there is no one to challenge your assumptions in real time. I learned to compensate by pulling engineers into design critiques early, treating product managers as co-designers, and scheduling regular check-ins with enterprise clients so that external perspective replaced the internal sounding board I did not have.',
        'The hardest design problem at TransFi was serving two audiences simultaneously with one design system. Enterprise merchants needed dashboards that surfaced ROI, conversion funnels, and settlement timelines \u2014 they evaluate design through the lens of business outcomes, not delight. Their end consumers, meanwhile, needed a checkout widget that felt as effortless as any e-commerce purchase. Building a component library flexible enough to serve both taught me that a good design system is not about consistency for its own sake; it is about encoding the right defaults for each context while sharing a common visual language.',
        'Localizing the widget for Indonesia, Vietnam, and the Philippines revealed that localization and cultural adaptation are not the same thing. Translation gets you language; cultural adaptation gets you trust. Supporting GoPay, GCash, and local bank transfers was not a feature checkbox \u2014 it required rethinking payment selection hierarchies, adjusting information density for markets where mobile data is expensive, and designing KYC flows around national ID formats that Western platforms had never accounted for. That work changed how I think about \u201cinternational\u201d design: it starts with local context, not global patterns adapted after the fact.',
      ],
    },

    // ── CREDITS ──
    {
      type: 'credits',
      credits: [
        {
          role: 'Lead Product Designer',
          name: 'Parth Pawar \u2014 Product strategy, UX research, interaction design, visual design, design system, brand identity',
        },
      ],
    },
    {
      type: 'text',
      title: 'Tools',
      body: [
        'Figma, Jira, Notion, Maze (usability testing), Amplitude (analytics)',
      ],
    },
    {
      type: 'text',
      title: 'Domains',
      body: [
        'Crypto On/Off-Ramp, Cross-Border Payments, Enterprise SaaS, Localization, KYC/KYB Compliance, API Developer Experience',
      ],
    },

    // ── THANK YOU ──
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
