import type { ProjectMeta } from '@/types/project'

export const zentipay: ProjectMeta = {
  slug: 'zentipay',
  title: 'ZentiPay',
  subtitle: 'Designed the end-to-end fintech super app that increased transaction success by 30% and reduced perceived transfer time by 40%',
  description: 'ZentiPay — Founding Product Designer for an AI-driven fintech super app serving migrant workers and international students. Increased transaction success by 30% and reduced perceived transfer time by 40%.',
  ogImage: 'https://www.designwhich.works/Assets/images/zentipay.png',
  heroImage: '/Assets/images/zentipay.png',
  projectColor: '#1E6B45',
  tags: ['Fintech', '0\u21921 Product', 'AI', 'Cross-cultural UX'],
  infoItems: [
    { label: 'Role', value: 'Founding Product Designer' },
    { label: 'Scope', value: '0\u21921 Product Design' },
    { label: 'Platform', value: 'Web & Mobile' },
    { label: 'Tools', value: 'Figma, Maze, Hotjar' },
    { label: 'Year', value: '2025' },
  ],
  backLink: { label: '\u2190 Back to Work', href: '/work' },
  nextProject: { slug: 'transfi-project', title: 'TransFi', image: '/Assets/images/transfi.jpg' },
  bottomNavSections: [
    { id: 'cs-hook', label: 'The Hook' },
    { id: 'cs-problem', label: 'Problem' },
    { id: 'cs-research', label: 'Research' },
    { id: 'cs-timeline', label: 'Timeline' },
    { id: 'cs-turning-point', label: 'Turning Point' },
    { id: 'cs-decisions', label: 'Design Decisions' },
    { id: 'cs-system', label: 'Design System' },
    { id: 'cs-results', label: 'Results' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  categories: ['ux'],
  sections: [
    // ── THE HOOK — human story ──────────────────────────────────
    {
      type: 'text',
      id: 'cs-hook',
      title: '',
      body: [
        'A construction worker in Dubai sends $400 home to his family in Kerala every month. By the time it arrives, $25 has disappeared \u2014 eaten by exchange rate markups, hidden fees, and intermediary charges he never agreed to. That\u2019s $300 a year. Enough to cover his daughter\u2019s school supplies for an entire term.',
        'He knows he\u2019s being overcharged. He just doesn\u2019t have a better option.',
        'That\u2019s the problem ZentiPay was built to solve. And that\u2019s why I joined as the founding designer \u2014 to build the product from a blank Figma file into something that could earn trust from people who had every reason not to give it.',
      ],
    },

    // ── OVERVIEW ────────────────────────────────────────────────
    {
      type: 'overview',
      columns: [
        {
          heading: 'Overview',
          body: 'ZentiPay is an AI-driven crypto payments platform built for migrant workers and international students \u2014 people who send money home regularly but lose hundreds annually to opaque fees, slow transfers, and interfaces that weren\u2019t designed for them. As the founding product designer, I shaped the product from zero: research, information architecture, interaction design, design system, and usability validation across five countries.',
        },
        {
          heading: 'The Mandate',
          body: 'Build a cross-border payment experience so clear and trustworthy that first-time crypto users complete transfers without hesitation. Every design decision had to earn trust in the first 30 seconds \u2014 because in fintech, a confused user is a lost user, and a lost user is a family that doesn\u2019t get their money.',
        },
      ],
    },

    // ── 01 — PROBLEM ────────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-problem',
      label: '01 \u2014 Problem',
      title: '$700B+ in remittances annually.\nMigrants still pay an average of 6.3% in fees.',
      body: [
        'Cross-border money transfer is a high-anxiety, high-stakes interaction. For migrant workers sending $200\u2013$500 home each month, every dollar lost to hidden fees is a dollar that doesn\u2019t reach their family. Yet the existing landscape \u2014 from legacy services like Western Union to newer fintech players \u2014 still treats this user segment as an afterthought.',
        'The unbanked and underbanked face a compounding problem: confusing interfaces built for tech-literate users, fee structures buried in fine print, and zero feedback about where their money is at any given moment. The result is a population that either overpays or avoids digital transfers entirely.',
      ],
    },
    {
      type: 'callout',
      text: 'The core tension: Users need to trust a digital platform with their earnings \u2014 often their family\u2019s primary income \u2014 but every existing touchpoint erodes that trust through ambiguity, jargon, and hidden costs.',
    },
    {
      type: 'numbered-list',
      title: '',
      items: [
        'Confusing multi-step flows with no progress indicators',
        'Fee estimates that change between confirmation and settlement',
        'No real-time tracking \u2014 users wait days without status updates',
        'Interfaces that assume English fluency and smartphone literacy',
        'Crypto terminology alienating non-technical users',
      ],
    },

    // ── 02 — RESEARCH ───────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-research',
      label: '02 \u2014 Research',
      title: '15+ interviews across 4 countries revealed one pattern: users abandon when they can\u2019t predict costs.',
      body: [
        'I ran a mixed-methods research sprint over three weeks. The goal was not just to understand pain points but to map the emotional arc of a cross-border transfer \u2014 from the moment a user decides to send money to the moment their recipient confirms receipt.',
      ],
    },
    {
      type: 'steps',
      title: '',
      steps: [
        {
          num: 1,
          title: 'User Interviews',
          description: '15+ in-depth interviews with migrant workers and international students across India, Philippines, Nigeria, and Mexico. Conducted in native languages via translators where needed.',
        },
        {
          num: 2,
          title: 'Competitive Audit',
          description: 'Analyzed 8 remittance platforms (Wise, Remitly, WorldRemit, Western Union, Xoom, Sendwave, Chipper Cash, Paysend) across 12 UX dimensions \u2014 from onboarding friction to fee transparency.',
        },
        {
          num: 3,
          title: 'Journey Mapping',
          description: 'Mapped end-to-end transfer journeys revealing 7 distinct friction points. The most critical: fee confirmation, identity verification, and post-transfer anxiety.',
        },
        {
          num: 4,
          title: 'Behavioral Analysis',
          description: 'Session recordings and analytics from beta users identified that 67% of abandoned transfers happened at the fee confirmation step \u2014 users couldn\u2019t predict total costs upfront.',
        },
      ],
    },
    {
      type: 'callout',
      text: 'Key insight: \u201cUsers abandoned transfers at the fee confirmation step 67% of the time because they couldn\u2019t predict total costs upfront.\u201d This single finding shaped the product\u2019s core interaction model: predictive pricing before commitment.',
    },
    {
      type: 'features',
      title: 'Research Themes',
      cards: [
        {
          title: 'Trust Deficit',
          description: '12 of 15 participants mentioned \u201cfear of losing money\u201d as their primary barrier to using new payment apps. Trust is not built through marketing \u2014 it\u2019s built through interface transparency.',
        },
        {
          title: 'Literacy Spectrum',
          description: 'Tech literacy varied dramatically \u2014 from users who could barely navigate a smartphone to students fluent in multiple apps. A single onboarding flow would fail both groups.',
        },
        {
          title: 'Fee Anxiety',
          description: 'Users mentally calculated fees in their home currency, not the sending currency. They needed to see \u201chow much arrives\u201d not \u201chow much you pay.\u201d',
        },
        {
          title: 'Transfer Blindness',
          description: 'Once money was sent, users entered an anxiety loop \u2014 checking the app repeatedly with no status updates. The gap between \u201csent\u201d and \u201creceived\u201d was a black box.',
        },
      ],
    },

    // ── PROJECT TIMELINE ────────────────────────────────────────
    {
      type: 'timeline',
      id: 'cs-timeline',
      label: 'Project Arc',
      title: 'From blank file to five-country validation',
      items: [
        {
          date: 'Weeks 1\u20133',
          heading: 'Discovery & Research',
          description: '15+ interviews across India, Philippines, Nigeria, Mexico. Competitive audit of 8 remittance platforms. Journey mapping identified 7 friction points.',
        },
        {
          date: 'Weeks 4\u20136',
          heading: 'Architecture & Wireframes',
          description: 'Information architecture, adaptive onboarding branching logic, fee estimator interaction model. Low-fidelity prototypes tested with 8 participants.',
        },
        {
          date: 'Weeks 7\u201310',
          heading: 'Design System & High-fidelity',
          description: '120+ component library across web and mobile. Multi-language support, RTL layouts, accessibility audit. Trust architecture framework developed.',
        },
        {
          date: 'Weeks 11\u201314',
          heading: 'Usability Testing & Iteration',
          description: '40+ participants across 5 countries. A/B tests on fee disclosure timing, onboarding track assignments, and trust signal placement. Three major iteration cycles.',
        },
        {
          date: 'Week 15+',
          heading: 'Launch & Post-launch Analytics',
          description: 'Phased rollout with 8-week analytics tracking. Continuous optimization based on session recordings and conversion funnels.',
        },
      ],
    },

    // ── THE TURNING POINT — narrative bridge ────────────────────
    {
      type: 'text',
      id: 'cs-turning-point',
      title: '',
      body: [
        'After three weeks of research across four countries, I had a wall of sticky notes, twelve journey maps, and one uncomfortable truth: the problem wasn\u2019t that existing apps were bad at moving money. They were bad at moving trust.',
        'Every competitor optimized for speed \u2014 fewer screens, faster flows, minimal friction. But our users didn\u2019t want fewer steps. They wanted fewer doubts. That reframe changed everything about how I designed ZentiPay.',
        'I stopped asking \u201chow do we make this faster?\u201d and started asking \u201cwhat is the user afraid of right now?\u201d Every screen became an answer to a specific fear.',
      ],
    },

    // ── 03 — DESIGN DECISIONS ───────────────────────────────────
    {
      type: 'text',
      id: 'cs-decisions',
      label: '03 \u2014 Design Decisions',
      title: 'Three bets that defined the product',
      body: [
        'Every design decision at ZentiPay traced back to one question: does this reduce the user\u2019s anxiety or increase their confidence? The product needed to feel simpler than a bank app while being more transparent than any competitor.',
      ],
    },

    // Decision 1: Adaptive Onboarding
    {
      type: 'text',
      title: '1. Adaptive Onboarding',
      body: [
        'The problem: A construction worker in Dubai and a graduate student in New York have fundamentally different relationships with technology. Forcing both through the same onboarding flow guaranteed at least one would drop off.',
        'The solution: I designed an adaptive onboarding system that assessed tech literacy and country-specific requirements in the first three interactions. Based on signal cues \u2014 tap speed, scroll behavior, language selection \u2014 the flow adjusted its complexity, explanation density, and verification steps.',
        'How it worked: New users saw a minimal country-and-purpose selector. The system then branched into three onboarding tracks: guided (step-by-step with visual cues), standard (clean forms with inline help), and express (minimal friction for power users). Users could switch tracks at any point.',
      ],
    },

    // Decision 2: Predictive Fee Estimator
    {
      type: 'text',
      title: '2. Predictive Fee Estimator',
      body: [
        'The problem: Users abandoned transfers because fees appeared late in the flow \u2014 often higher than expected. The mental model was broken: \u201cI thought I was sending $300, but only $278 arrives?\u201d',
        'The solution: I placed an AI-powered fee estimator on the very first screen of the transfer flow. Before users entered any personal details, they could see the exact amount their recipient would receive, the total fee breakdown (network fee, exchange rate margin, service fee), and a comparison against competitors.',
        'The interaction: As users typed an amount, the estimator updated in real time \u2014 showing both the send amount and receive amount simultaneously. A confidence indicator displayed how likely the quoted rate was to hold for the next 15 minutes, eliminating the \u201cbait and switch\u201d anxiety.',
      ],
    },

    // Decision 3: Trust Architecture
    {
      type: 'text',
      title: '3. Trust Architecture',
      body: [
        'The problem: Displaying all security credentials upfront overwhelms users. But hiding them makes users feel unsafe. Traditional fintech apps solve this by burying compliance badges in footers \u2014 where no one looks.',
        'The solution: I designed a progressive trust disclosure system. Security signals appeared precisely when users needed reassurance, not before. During onboarding: regulatory compliance badges. At the payment step: encryption indicators and bank-grade security language. After transfer: real-time tracking with estimated delivery and receipt confirmation.',
        'The framework: Each screen was scored on an \u201canxiety index\u201d (1\u201310). High-anxiety screens \u2014 entering bank details, confirming large amounts, waiting for delivery \u2014 received proportionally more trust signals. Low-anxiety screens stayed clean.',
      ],
    },
    {
      type: 'callout',
      text: 'Design principle: Trust signals should appear at the moment of doubt, not the moment of marketing. Every security indicator in ZentiPay was placed based on where users actually hesitated \u2014 identified through session recordings and click heatmaps.',
    },

    // ── 04 — DESIGN SYSTEM ──────────────────────────────────────
    {
      type: 'text',
      id: 'cs-system',
      label: '04 \u2014 Design System',
      title: 'Built for scale across languages, platforms, and literacy levels',
      body: [
        'ZentiPay needed to work identically in English, Hindi, Spanish, Tagalog, and Arabic \u2014 including RTL layouts. I built a component library from the ground up that treated internationalization as a first-class requirement, not a retrofit.',
        'The system comprised 120+ components across web and mobile, with built-in states for loading, error, success, and empty. Every component met WCAG AA contrast requirements and supported dynamic text scaling for users with accessibility needs.',
      ],
    },
    {
      type: 'numbered-list',
      title: '',
      items: [
        'Accessibility-first: WCAG AA compliance, screen reader support, RTL layout system',
        'Multi-language: Components designed for text expansion (German is 30% longer than English) and contraction',
        'Motion system: Purposeful animations for transaction feedback \u2014 confirmations, progress states, and error recovery. No decorative motion.',
        'Platform parity: Shared design tokens between web and mobile ensured visual consistency without identical layouts',
        'Intelligent defaults: AI-driven pre-fill for repeat transfers, currency pairs, and recipient details based on user history',
      ],
    },

    // ── 05 — RESULTS ────────────────────────────────────────────
    {
      type: 'stats',
      id: 'cs-results',
      label: '05 \u2014 Results',
      title: 'The numbers that mattered',
      body: [
        'Impact was measured across usability testing with 40+ participants in 5 countries, A/B tests on key flows, and post-launch analytics over the first 8 weeks.',
      ],
      stats: [
        { label: 'Transaction Success', value: '+30%' },
        { label: 'Perceived Transfer Time', value: '-40%' },
        { label: 'Onboarding Drop-off', value: '-65%' },
        { label: 'Usability Score (5 countries)', value: '4.7/5' },
      ],
    },
    {
      type: 'features',
      title: '',
      cards: [
        {
          title: 'Predictive Fee Estimator',
          description: 'The upfront cost transparency directly drove the 30% increase in completed transfers. Users who interacted with the fee estimator were 3.2x more likely to complete their first transaction.',
        },
        {
          title: 'Adaptive Onboarding',
          description: 'The 65% reduction in onboarding drop-off came from eliminating one-size-fits-all flows. The guided track alone retained 78% of low-tech-literacy users who would have churned.',
        },
        {
          title: 'Real-time Tracking',
          description: 'The 40% reduction in perceived transfer time was achieved through live status updates and proactive push notifications \u2014 not by making transfers faster, but by making the wait visible.',
        },
        {
          title: 'Cross-cultural Validation',
          description: 'The 4.7/5 usability score held consistent across all five test countries \u2014 India, Philippines, Nigeria, Mexico, and UAE \u2014 validating the adaptive approach over localized one-offs.',
        },
      ],
    },

    // ── 06 — REFLECTIONS ────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-reflections',
      label: '06 \u2014 Reflections',
      title: 'What I\u2019d carry forward',
      body: [
        'ZentiPay was the project that fundamentally changed how I think about designing financial products. Three lessons will shape everything I build next.',
      ],
    },
    {
      type: 'steps',
      title: '',
      steps: [
        {
          num: 1,
          title: 'Trust Requires Transparency at Every Step',
          description: 'In fintech, trust is not a feature \u2014 it\u2019s the product. Users don\u2019t read security badges. They feel safe when every interaction is predictable, every cost is visible, and every state change is explained. Designing for trust means designing for no surprises.',
        },
        {
          num: 2,
          title: 'Cross-cultural UX Demands Flexibility, Not Templates',
          description: 'Localization is not translation. A user in Lagos and a user in Manila have different mental models for money, different trust thresholds, and different expectations for digital interactions. The only scalable approach is building adaptive systems that flex to context \u2014 not fixed flows that assume uniformity.',
        },
        {
          num: 3,
          title: 'Design for Anxiety, Not Just Efficiency',
          description: 'Most fintech products optimize for speed: fewer clicks, faster flows, minimal screens. But when someone is sending their paycheck to their family 8,000 miles away, speed is not the priority \u2014 confidence is. I learned to measure success not in task completion time, but in hesitation reduction.',
        },
      ],
    },
    {
      type: 'callout',
      text: 'The biggest misconception in fintech design is that users want fewer steps. They don\u2019t. They want fewer doubts. Every screen in ZentiPay was designed to eliminate one specific doubt \u2014 and that reframe made all the difference.',
    },
    {
      type: 'pullquote',
      quote: '\u201cThis is the first time I knew exactly how much my kids would get before I pressed send.\u201d',
      cite: '\u2014 Usability test participant, Manila \u2014 a domestic worker who sends money to her children every two weeks',
    },
    {
      type: 'text',
      title: '',
      body: [
        'That sentence validated every late-night design review, every argument about whether to show fees upfront or bury them. It confirmed that what we built wasn\u2019t just a better payment app. It was a small act of respect for people who deserved to know where their money was going.',
      ],
    },

    // ── CREDITS ─────────────────────────────────────────────────
    {
      type: 'credits',
      credits: [
        { role: 'Founding Product Designer', name: 'Parth Pawar' },
        { role: 'Scope', name: 'End-to-end Product Design, Research, Design System, Usability Testing' },
        { role: 'Platform', name: 'Web & Mobile (iOS, Android)' },
        { role: 'Duration', name: '2025' },
      ],
    },

    // ── THANK YOU ───────────────────────────────────────────────
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
  credits: [
    { role: 'Founding Product Designer', name: 'Parth Pawar' },
    { role: 'Scope', name: 'End-to-end Product Design, Research, Design System, Usability Testing' },
    { role: 'Platform', name: 'Web & Mobile (iOS, Android)' },
    { role: 'Duration', name: '2025' },
  ],
}
