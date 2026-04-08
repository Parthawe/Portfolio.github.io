export interface CategoryData {
  slug: string
  accentColor: string
  title: string
  titleAccent: string
  description: string
  metaTitle: string
  metaDescription: string
  stats: string[]
  tools: string[]
  featured: {
    slug: string
    title: string
    desc: string
    role: string
    image: string
    bgColor: string
    tag: string
    year: string
  }
  moreProjects: {
    slug: string
    image: string
    alt: string
    name: string
    result: string
    role: string
    tag?: string
    year?: string
    desc?: string
  }[][]
  approach: {
    label: string
    pillars: { num: string; title: string; desc: string }[]
  }
  cta: {
    headline: string
    sub: string
  }
}

export const categories: CategoryData[] = [
  {
    slug: 'ai',
    accentColor: '#f43f5e',
    title: 'AI &',
    titleAccent: 'Machine Learning',
    description:
      'Designing human-centered AI products, from smart glasses with on-device ML to voice interfaces, dev tools, and neural network visualizations.',
    metaTitle: 'AI & Machine Learning · Parth Pawar',
    metaDescription:
      'Designing human-centered AI products, from smart glasses with on-device ML to voice interfaces, dev tools, and neural network visualizations.',
    stats: ['6 AI products shipped', 'NYU ITP 2024', 'On-device to cloud'],
    tools: [
      'Figma',
      'Python',
      'TensorFlow',
      'LLM Prompting',
      'Voice UI',
      'AR/XR',
      'Responsible AI',
    ],
    featured: {
      slug: 'mentra',
      title: 'Mentra',
      desc: "AI smart glasses with the world's first wearable app store",
      role: 'Head of UI/UX · 2026',
      image: '/Assets/images/mentra.png',
      bgColor: '#fef2f2',
      tag: 'AI WEARABLES',
      year: '2026',
    },
    moreProjects: [
      [
        {
          slug: 'clawed-chat',
          image: '/Assets/images/clawed.png',
          alt: 'Clawed',
          name: 'Clawed',
          result: 'AI assistant with receipts for every action, 3-tier trust architecture',
          role: 'Product Designer · 2026',
          tag: 'AI ASSISTANT',
          year: '2026',
          desc: 'AI assistant with receipts for every action, 3-tier trust architecture',
        },
        {
          slug: 'ballah-code',
          image: '/Assets/images/ballah-code.png',
          alt: 'Ballah Code',
          name: 'Ballah Code',
          result: 'AI-native desktop IDE with 17 production tools',
          role: 'Creator · 2026',
          tag: 'AI DEVTOOLS',
          year: '2026',
          desc: 'AI-native desktop IDE with 17 production tools',
        },
      ],
      [
        {
          slug: 'executivelens',
          image: '/Assets/images/executivelens.png',
          alt: 'ExecutiveLens',
          name: 'ExecutiveLens',
          result: 'Saved executives 5.2 hrs/week, 87% adoption in 2 weeks',
          role: 'Product Designer · 2026',
          tag: 'AI ANALYTICS',
          year: '2026',
          desc: 'Saved executives 5.2 hrs/week, 87% adoption in 2 weeks',
        },
        {
          slug: 'oncall-lens',
          image: '/Assets/images/oncall-lens.png',
          alt: 'OnCall Lens',
          name: 'OnCall Lens',
          result: 'Sentry alert → Claude → auto PR fix, built in 24 hours',
          role: 'Designer + Developer · 2026',
          tag: 'DEVTOOLS',
          year: '2026',
          desc: 'Sentry alert → Claude → auto PR fix, built in 24 hours',
        },
      ],
      [
        {
          slug: 'ai-voice',
          image: '/Assets/images/ai-voice.png',
          alt: 'AI Voice Interface',
          name: 'AI Voice Interface',
          result: 'Enterprise voice selection with emotional intelligence, A/B tested',
          role: 'Designer · 2025',
          tag: 'VOICE UI',
          year: '2025',
          desc: 'Enterprise voice selection with emotional intelligence, A/B tested',
        },
        {
          slug: 'enigma',
          image: '/Assets/images/enigma.jpg',
          alt: 'Enigma',
          name: 'Enigma',
          result: 'Light sculpture with deep learning neural network',
          role: 'Creator · 2023',
          tag: 'DEEP LEARNING',
          year: '2023',
          desc: 'Light sculpture with deep learning neural network',
        },
      ],
    ],
    approach: {
      label: 'Design Approach',
      pillars: [
        {
          num: '01',
          title: 'Human-in-the-loop',
          desc: 'AI augments, not replaces. Users stay in control.',
        },
        {
          num: '02',
          title: 'Graceful uncertainty',
          desc: 'AI is probabilistic, design for confidence levels and fallbacks.',
        },
        {
          num: '03',
          title: 'Multimodal thinking',
          desc: 'Voice, vision, gesture, designing across input modalities.',
        },
      ],
    },
    cta: {
      headline: 'Designing with AI?',
      sub: 'From smart glasses to LLM-powered tools, I design AI products people trust.',
    },
  },

  {
    slug: 'ux-design',
    accentColor: '#2563eb',
    title: 'UX',
    titleAccent: 'Design',
    description:
      'Product design spanning fintech, AI, enterprise SaaS, and consumer platforms, turning complex systems into intuitive, user-centered experiences.',
    metaTitle: 'UX Design · Parth Pawar',
    metaDescription:
      'Product design spanning fintech, AI, enterprise SaaS, and consumer platforms, turning complex systems into intuitive, user-centered experiences.',
    stats: ['6 products shipped', '$50M+ volume designed', '5+ years'],
    tools: [
      'Figma',
      'Protopie',
      'Usability Testing',
      'Design Systems',
      'Interaction Design',
      'IA',
    ],
    featured: {
      slug: 'mentra',
      title: 'Mentra',
      desc: "AI smart glasses with the world's first wearable app store",
      role: 'Head of UI/UX · 2026',
      image: '/Assets/images/mentra.png',
      bgColor: '#eff6ff',
      tag: 'AI WEARABLES',
      year: '2026',
    },
    moreProjects: [
      [
        {
          slug: 'transfi-project',
          image: '/Assets/images/transfi.jpg',
          alt: 'TransFi',
          name: 'TransFi',
          result: 'Crypto payments, $50M+ monthly volume',
          role: 'Lead Product Designer · 2022–23',
          tag: 'WEB3 PAYMENTS',
          year: '2023',
          desc: 'Crypto payments, $50M+ monthly volume',
        },
        {
          slug: 'zentipay',
          image: '/Assets/images/zentipay.png',
          alt: 'ZentiPay',
          name: 'ZentiPay',
          result: 'Fintech super app from scratch, 30% higher transaction completion',
          role: 'Founding Product Designer · 2025',
          tag: 'FINTECH',
          year: '2025',
          desc: 'Fintech super app from scratch, 30% higher transaction completion',
        },
      ],
      [
        {
          slug: 'executivelens',
          image: '/Assets/images/executivelens.png',
          alt: 'ExecutiveLens',
          name: 'ExecutiveLens',
          result: 'Saved executives 5.2 hrs/week, 87% adoption in 2 weeks',
          role: 'Product Designer · 2026',
          tag: 'AI ANALYTICS',
          year: '2026',
          desc: 'Saved executives 5.2 hrs/week, 87% adoption in 2 weeks',
        },
        {
          slug: 'cuetv',
          image: '/Assets/images/cuetv.jpg',
          alt: 'CueTV',
          name: 'CueTV',
          result: 'OTT streaming, retargeting system generating 30K+ ad variations',
          role: 'Product Designer',
          tag: 'PRODUCT DESIGN',
          year: '2022',
          desc: 'OTT streaming, retargeting system generating 30K+ ad variations',
        },
      ],
      [
        {
          slug: 'org-dashboard',
          image: '/Assets/images/org-dashboard.png',
          alt: 'OrgDashboard',
          name: 'OrgDashboard',
          result: 'SaaS giving AI agents organizational context, dual-user design',
          role: 'Product Designer · 2026',
          tag: 'B2B SAAS',
          year: '2026',
          desc: 'SaaS giving AI agents organizational context, dual-user design',
        },
      ],
    ],
    approach: {
      label: 'Design Approach',
      pillars: [
        {
          num: '01',
          title: 'Research-driven',
          desc: 'Every choice backed by user interviews and testing.',
        },
        {
          num: '02',
          title: 'Systems over screens',
          desc: 'Scalable design systems for consistency across teams.',
        },
        {
          num: '03',
          title: 'Ship and measure',
          desc: 'A/B tests, metrics, iterating on real data.',
        },
      ],
    },
    cta: {
      headline: 'Need a product designer?',
      sub: 'From 0→1 to scaling, I design products that ship and perform.',
    },
  },

  {
    slug: 'creative-tech',
    accentColor: '#f59e0b',
    title: 'Creative',
    titleAccent: 'Technology',
    description:
      'Experimental projects at the intersection of code, hardware, and design, ML instruments, generative keyboards, interactive simulations.',
    metaTitle: 'Creative Tech · Parth Pawar',
    metaDescription:
      'Experimental projects at the intersection of code, hardware, and design, ML instruments, generative keyboards, interactive simulations.',
    stats: ['7 projects', 'NYU ITP 2024', 'Code · Hardware · Art'],
    tools: [
      'Arduino',
      'p5.js',
      'Processing',
      'ML5.js',
      '3D Printing',
      'Laser Cutting',
    ],
    featured: {
      slug: 'jugalbandi',
      title: 'Jugalbandi',
      desc: 'ML-driven musical instrument exhibited at Maker Faire',
      role: 'Creator · 2024',
      image: '/Assets/images/jugalbandi.png',
      bgColor: '#fffbeb',
      tag: 'ML + MUSIC',
      year: '2024',
    },
    moreProjects: [
      [
        {
          slug: 'keyboard-project',
          image: '/Assets/images/keyboard.jpg',
          alt: 'BreakGen',
          name: 'BreakGen',
          result: 'AI platform for designing custom keyboards \u2014 from prompt to fabrication',
          role: 'ITP Thesis · 2025',
          tag: 'ITP THESIS',
          year: '2025',
          desc: 'AI platform for designing custom keyboards \u2014 from prompt to fabrication',
        },
        {
          slug: 'vj-software',
          image: '/Assets/images/vj.jpg',
          alt: 'VJ Software',
          name: 'VJ Software',
          result: 'Real-time visual performance tool',
          role: 'Creator · 2022',
          tag: 'REAL-TIME VISUALS',
          year: '2022',
          desc: 'Real-time visual performance tool',
        },
      ],
      [
        {
          slug: 'enigma',
          image: '/Assets/images/enigma.jpg',
          alt: 'Enigma',
          name: 'Enigma',
          result: 'Light sculpture with deep learning neural network',
          role: 'Creator · 2023',
          tag: 'DEEP LEARNING',
          year: '2023',
          desc: 'Light sculpture with deep learning neural network',
        },
        {
          slug: 'shuffle',
          image: '/Assets/images/shuffle.jpg',
          alt: 'Shuffle',
          name: 'Shuffle',
          result: 'Interactive strategy simulation installation',
          role: 'Creator · 2024',
          tag: 'INTERACTIVE',
          year: '2024',
          desc: 'Interactive strategy simulation installation',
        },
      ],
      [
        {
          slug: 'making-of-time',
          image: '/Assets/images/making-of-time.jpg',
          alt: 'Making of Time',
          name: 'Making of Time',
          result: 'Time exploration through physical computing',
          role: 'Creator · 2024',
          tag: 'PHYSICAL COMPUTING',
          year: '2024',
          desc: 'Time exploration through physical computing',
        },
        {
          slug: 'sea-of-salt',
          image: '/Assets/images/sea-of-salt.svg',
          alt: 'Sea of Salt',
          name: 'Sea of Salt',
          result: 'Kinetic salt installation reacting to ocean data',
          role: 'Creator · 2024',
          tag: 'INSTALLATION',
          year: '2024',
          desc: 'Kinetic salt installation reacting to real-time ocean data',
        },
      ],
    ],
    approach: {
      label: 'Design Approach',
      pillars: [
        {
          num: '01',
          title: 'Make to think',
          desc: 'Physical prototypes as thinking tools.',
        },
        {
          num: '02',
          title: 'Playful interaction',
          desc: 'Curiosity-first, delightful technology.',
        },
        {
          num: '03',
          title: 'Full-stack creativity',
          desc: 'Concept to PCB to exhibition.',
        },
      ],
    },
    cta: {
      headline: 'Need creative tech?',
      sub: 'From concept to fabrication to exhibition, I make things that live beyond the screen.',
    },
  },

  {
    slug: 'installations',
    accentColor: '#6366f1',
    title: 'Install-',
    titleAccent: 'ations & Fabrication',
    description:
      'Physical installations and experiential design, kinetic stages, light sculptures, arcade games, and theatrical set design.',
    metaTitle: 'Installations · Parth Pawar',
    metaDescription:
      'Physical installations and experiential design, kinetic stages, light sculptures, arcade games, and theatrical set design.',
    stats: ['5 exhibited', 'ITP Winter Show', 'Physical + Digital'],
    tools: [
      'Fabrication',
      'Arduino',
      'LED Systems',
      'Scenic Design',
      'Kinetic Mechanisms',
      'Game Design',
    ],
    featured: {
      slug: 'black-hole',
      title: 'Black Hole',
      desc: 'Physical models of five black hole phenomena, exhibited at Horological Society of New York',
      role: 'Designer & Fabricator · 2026',
      image: '/Assets/images/black-hole.jpg',
      bgColor: '#f0f0f5',
      tag: 'SCIENCE + FABRICATION',
      year: '2026',
    },
    moreProjects: [
      [
        {
          slug: 'uv-light',
          image: '/Assets/images/uv-light.jpg',
          alt: 'UV Light',
          name: 'UV Light',
          result: 'Multi-room blacklight installation with hidden messages and projection',
          role: 'Creator · 2023',
          tag: 'LIGHT ART',
          year: '2023',
          desc: 'Multi-room blacklight installation with hidden messages and projection',
        },
        {
          slug: 'the-omakase',
          image: '/Assets/images/the-omakase.jpg',
          alt: 'The Omakase',
          name: 'The Omakase',
          result: '2-player sushi arcade cabinet, custom RGB controllers, ITP + WonderVille',
          role: 'Creator · 2024',
          tag: 'ARCADE GAME',
          year: '2024',
          desc: '2-player sushi arcade cabinet, custom RGB controllers, ITP + WonderVille',
        },
      ],
      [
        {
          slug: 'revolving-stage',
          image: '/Assets/images/revolving-stage.jpg',
          alt: 'Revolving Stage',
          name: 'Revolving Stage',
          result: '15 ft. rotating stage supporting 250+ kgs, engineered for live theatre',
          role: 'Creator · 2022',
          tag: 'FABRICATION',
          year: '2022',
          desc: '15 ft. rotating stage supporting 250+ kgs, engineered for live theatre',
        },
      ],
      [
        {
          slug: 'moniac-machine',
          image: '/Assets/images/moniac-machine.jpg',
          alt: 'Moniac Machine',
          name: 'Moniac Machine',
          result: 'Economic strategy game',
          role: 'Creator · 2024',
          tag: 'GAME DESIGN',
          year: '2024',
          desc: 'Economic strategy game',
        },
        {
          slug: 'drowning',
          image: '/Assets/images/drowning.jpg',
          alt: 'Drowning',
          name: 'Drowning',
          result: 'Theatrical scenic design',
          role: 'Set Designer · 2024',
          tag: 'SCENIC DESIGN',
          year: '2024',
          desc: 'Theatrical scenic design',
        },
      ],
    ],
    approach: {
      label: 'Design Approach',
      pillars: [
        {
          num: '01',
          title: 'Audience as co-creator',
          desc: 'Installations that respond to presence and input.',
        },
        {
          num: '02',
          title: 'Built to last',
          desc: 'Robust for hundreds of interactions, reliable for days.',
        },
        {
          num: '03',
          title: 'Spatial storytelling',
          desc: 'Light, movement, materiality, immersive narrative.',
        },
      ],
    },
    cta: {
      headline: 'Planning an installation?',
      sub: 'I design and build interactive installations for galleries, events, and public spaces.',
    },
  },

  {
    slug: 'brand-visual',
    accentColor: '#d946ef',
    title: 'Brand',
    titleAccent: '& Visual',
    description:
      'Brand identity, event design, typography, and visual storytelling, from TEDx stages to original typefaces.',
    metaTitle: 'Brand & Visual · Parth Pawar',
    metaDescription:
      'Brand identity, event design, typography, and visual storytelling, from TEDx stages to original typefaces.',
    stats: ['5 brand projects', 'TEDx Art Director', 'Packaging · Typography · Motion'],
    tools: [
      'Illustrator',
      'Photoshop',
      'After Effects',
      'Blender',
      'Typography',
      'Packaging',
      'Motion Graphics',
    ],
    featured: {
      slug: 'tedx',
      title: 'TEDxVITPune',
      desc: 'Brand identity and event design',
      role: 'Art Director · 2021',
      image: '/Assets/images/tedx.png',
      bgColor: '#fdf4ff',
      tag: 'ART DIRECTION',
      year: '2021',
    },
    moreProjects: [
      [
        {
          slug: 'code-for-build',
          image: '/Assets/images/code-for-build.jpg',
          alt: 'Code for Build',
          name: 'Code for Build',
          result: 'Brand and product design for Istanbul startup',
          role: 'Designer · 2021',
          tag: 'BRAND + PRODUCT',
          year: '2021',
          desc: 'Brand and product design for Istanbul startup',
        },
        {
          slug: 'typeface',
          image: '/Assets/images/typeface.jpg',
          alt: "Butler's Slice",
          name: "Butler's Slice",
          result: 'Original variable display typeface',
          role: 'Type Designer',
          tag: 'TYPE DESIGN',
          year: '2022',
          desc: 'Original variable display typeface',
        },
      ],
      [
        {
          slug: 'mentra',
          image: '/Assets/images/mentra.png',
          alt: 'Mentra Glass',
          name: 'Mentra Glass',
          result: 'Packaging, motion design, and visual identity for AI smart glasses',
          role: 'Head of UI/UX · 2025',
          tag: 'BRAND + PACKAGING',
          year: '2025',
          desc: 'Packaging, motion design, and visual identity for AI smart glasses',
        },
        {
          slug: 'atps',
          image: '/Assets/images/atps.png',
          alt: 'ArtTown Podcast',
          name: 'ArtTown Podcast',
          result: '45 episodes interviewing designers from Puma, RCA, Google, and Bollywood',
          role: 'Co-founder & Director · 2020\u201322',
          tag: 'PODCAST',
          year: '2021',
          desc: '45 episodes interviewing designers from Puma, RCA, Google, and Bollywood',
        },
      ],
    ],
    approach: {
      label: 'Design Approach',
      pillars: [
        {
          num: '01',
          title: 'Strategy before style',
          desc: 'Every visual decision serves a strategic purpose.',
        },
        {
          num: '02',
          title: 'Systematic identity',
          desc: 'Logo to type to color to motion, consistent everywhere.',
        },
        {
          num: '03',
          title: 'Craft in details',
          desc: 'Kerning, color precision, grid, the details that matter.',
        },
      ],
    },
    cta: {
      headline: 'Need a brand designer?',
      sub: 'From identity systems to event design, I build brands that scale.',
    },
  },

  {
    slug: 'fintech',
    accentColor: '#0ea5e9',
    title: 'Fintech',
    titleAccent: 'Design',
    description:
      'Designing financial products that simplify complexity, from crypto payment rails and super apps to enterprise analytics dashboards.',
    metaTitle: 'Fintech Design · Parth Pawar',
    metaDescription:
      'Designing financial products that simplify complexity, from crypto payment rails and super apps to enterprise analytics dashboards.',
    stats: ['$50M+ monthly volume', '4 products shipped', '30% higher conversion'],
    tools: [
      'Figma',
      'Data Viz',
      'Payment Rails',
      'KYC/AML',
      'Dashboard Design',
      'B2B SaaS',
    ],
    featured: {
      slug: 'zentipay',
      title: 'ZentiPay',
      desc: 'Fintech super app, 30% higher transaction completion rate',
      role: 'Founding Product Designer · 2025',
      image: '/Assets/images/zentipay.png',
      bgColor: '#e8f4fd',
      tag: 'FINTECH',
      year: '2025',
    },
    moreProjects: [
      [
        {
          slug: 'transfi-project',
          image: '/Assets/images/transfi.jpg',
          alt: 'TransFi',
          name: 'TransFi',
          result: 'Crypto payments, $50M+ monthly volume',
          role: 'Lead Product Designer · 2022–23',
          tag: 'WEB3 PAYMENTS',
          year: '2023',
          desc: 'Crypto payments, $50M+ monthly volume',
        },
        {
          slug: 'executivelens',
          image: '/Assets/images/executivelens.png',
          alt: 'ExecutiveLens',
          name: 'ExecutiveLens',
          result: 'Saved executives 5.2 hrs/week, 87% adoption in 2 weeks',
          role: 'Product Designer · 2026',
          tag: 'AI ANALYTICS',
          year: '2026',
          desc: 'Saved executives 5.2 hrs/week, 87% adoption in 2 weeks',
        },
      ],
      [
        {
          slug: 'org-dashboard',
          image: '/Assets/images/org-dashboard.png',
          alt: 'OrgDashboard',
          name: 'OrgDashboard',
          result: 'SaaS giving AI agents organizational context, dual-user design',
          role: 'Product Designer · 2026',
          tag: 'B2B SAAS',
          year: '2026',
          desc: 'SaaS giving AI agents organizational context, dual-user design',
        },
        {
          slug: 'cuetv',
          image: '/Assets/images/cuetv.jpg',
          alt: 'CueTV',
          name: 'CueTV',
          result: 'OTT platform, 30K+ ad variations system',
          role: 'Product Designer · 2022',
          tag: 'PRODUCT DESIGN',
          year: '2022',
          desc: 'OTT platform, 30K+ ad variations system',
        },
      ],
    ],
    approach: {
      label: 'Design Approach',
      pillars: [
        {
          num: '01',
          title: 'Data-dense, not cluttered',
          desc: 'Financial products need lots of info, the skill is hierarchy, not hiding.',
        },
        {
          num: '02',
          title: 'Error prevention',
          desc: "In payments, undo isn't enough. Confirmation flows, smart defaults, progressive disclosure.",
        },
        {
          num: '03',
          title: 'Speed as a feature',
          desc: 'Every extra step is a drop-off risk. Optimizing flows for speed.',
        },
      ],
    },
    cta: {
      headline: 'Need a fintech designer?',
      sub: 'From crypto rails to executive dashboards, I design financial products that ship.',
    },
  },

  {
    slug: 'design-for-good',
    accentColor: '#10b981',
    title: 'Design',
    titleAccent: 'for Good',
    description:
      'Impact-driven design, accessibility, community development, and equity in education.',
    metaTitle: 'Design for Good · Parth Pawar',
    metaDescription:
      'Impact-driven design, accessibility, community development, and equity in education.',
    stats: ['3 impact projects', 'Community-centered', 'Accessibility-first'],
    tools: [
      'Figma',
      'Co-design',
      'Accessibility Audits',
      'WCAG 2.1',
      'Community Research',
      'Inclusive Design',
    ],
    featured: {
      slug: 'raahi-project',
      title: 'Raahi',
      desc: 'Transit accessibility for underserved commuters',
      role: 'Designer · 2022',
      image: '/Assets/images/raahi.jpg',
      bgColor: '#ecfdf5',
      tag: 'CIVIC DESIGN',
      year: '2022',
    },
    moreProjects: [
      [
        {
          slug: 'the-point-cdc',
          image: '/Assets/images/the-point-cdc.png',
          alt: 'The Point CDC',
          name: 'The Point CDC',
          result: 'Redesigned digital platform for a Bronx community nonprofit',
          role: 'Designer · 2024',
          tag: 'COMMUNITY',
          year: '2024',
          desc: 'Redesigned digital platform for a Bronx community nonprofit',
        },
        {
          slug: 'office-of-diversity',
          image: '/Assets/images/office-of-diversity.png',
          alt: 'Office of Diversity',
          name: 'Office of Diversity',
          result: 'IDBEA report and interactive timeline, WCAG 2.1 AA compliant',
          role: 'Designer · 2023–24',
          tag: 'EDUCATION',
          year: '2024',
          desc: 'IDBEA report and interactive timeline, WCAG 2.1 AA compliant',
        },
      ],
    ],
    approach: {
      label: 'Design Approach',
      pillars: [
        {
          num: '01',
          title: 'Design with, not for',
          desc: 'Co-designing with communities, centering lived experience.',
        },
        {
          num: '02',
          title: 'Accessibility as default',
          desc: 'Every interaction for the widest range of abilities.',
        },
        {
          num: '03',
          title: 'Systemic thinking',
          desc: 'Address root causes, not just symptoms.',
        },
      ],
    },
    cta: {
      headline: 'Building for impact?',
      sub: 'I design products that serve the people who need them most.',
    },
  },

  {
    slug: 'crypto',
    accentColor: '#8b5cf6',
    title: 'Crypto',
    titleAccent: '& Web3',
    description:
      'Building secure, user-friendly interfaces that make DeFi tools, cross-border payments, and blockchain products accessible to everyone.',
    metaTitle: 'Crypto & Web3 Design · Parth Pawar',
    metaDescription:
      'Product design for crypto and Web3, secure, user-friendly interfaces for DeFi, cross-border payments, and blockchain products.',
    stats: ['$50M+ monthly volume', '2 products shipped', '3+ years in Web3'],
    tools: ['Figma', 'Token Design', 'DeFi Protocols', 'Compliance UX', 'Payment Rails'],
    featured: {
      slug: 'zentipay',
      title: 'ZentiPay',
      desc: 'Fintech super app, 30% higher transaction completion',
      role: 'Founding Product Designer · 2025',
      image: '/Assets/images/zentipay.png',
      bgColor: '#f0ecff',
      tag: 'FINTECH',
      year: '2025',
    },
    moreProjects: [
      [
        {
          slug: 'transfi-project',
          image: '/Assets/images/transfi.jpg',
          alt: 'TransFi',
          name: 'TransFi',
          result: 'Crypto payments, $50M+ monthly volume',
          role: 'Lead Product Designer · 2022–23',
          tag: 'WEB3 PAYMENTS',
          year: '2023',
          desc: 'Crypto payments, $50M+ monthly volume',
        },
      ],
    ],
    approach: {
      label: 'Design Approach',
      pillars: [
        { num: '01', title: 'Trust-first interfaces', desc: 'High-stakes financial flows where a single wrong click costs thousands, every interaction prioritizes clarity and confirmation.' },
        { num: '02', title: 'Regulatory awareness', desc: 'KYC/AML flows and compliance screens that satisfy regulators without destroying the user experience.' },
        { num: '03', title: 'Cross-border simplicity', desc: 'Multi-currency, multi-rail payment systems distilled into flows that feel as easy as sending a text.' },
      ],
    },
    cta: {
      headline: 'Building in crypto?',
      sub: "I've shipped products handling $50M+ monthly volume. Let's talk.",
    },
  },

  {
    slug: 'ai-wearables',
    accentColor: '#ec4899',
    title: 'AI &',
    titleAccent: 'Wearables',
    description:
      'Intelligent interfaces for AI-powered products, smart glasses, voice assistants, developer tools, and conversational AI.',
    metaTitle: 'AI & Wearables Design · Parth Pawar',
    metaDescription:
      'Intelligent interfaces for AI-powered products, smart glasses, voice assistants, and conversational AI.',
    stats: ['4 AI/wearable products', 'Smart glasses to voice', 'On-device ML'],
    tools: ['Figma', 'AR Prototyping', 'Voice UI', 'LLM Integration', 'Gesture Design', 'Responsible AI'],
    featured: {
      slug: 'clawed-chat',
      title: 'Clawed',
      desc: 'Safety-first AI assistant for glasses and web',
      role: 'Product Designer · 2026',
      image: '/Assets/images/clawed.png',
      bgColor: '#fdf2f8',
      tag: 'AI ASSISTANT',
      year: '2026',
    },
    moreProjects: [
      [
        {
          slug: 'oncall-lens',
          image: '/Assets/images/oncall-lens.png',
          alt: 'OnCall Lens',
          name: 'OnCall Lens',
          result: 'Sentry alerts to automated PR fixes via smart glasses',
          role: 'Designer + Developer · 2026',
          tag: 'AI WEARABLE',
          year: '2026',
          desc: 'Sentry alerts to automated PR fixes via smart glasses',
        },
        {
          slug: 'ai-voice',
          image: '/Assets/images/ai-voice.png',
          alt: 'AI Voice Interface',
          name: 'AI Voice Interface',
          result: 'Conversational AI and voice-driven interaction',
          role: 'Designer · 2025',
          tag: 'VOICE UI',
          year: '2025',
          desc: 'Conversational AI and voice-driven interaction',
        },
      ],
      [
        {
          slug: 'ballah-code',
          image: '/Assets/images/ballah-code.png',
          alt: 'Ballah Code',
          name: 'Ballah Code',
          result: 'AI-powered dev tools platform',
          role: 'Designer · 2026',
          tag: 'DEV TOOLS',
          year: '2026',
          desc: 'AI-powered dev tools platform',
        },
      ],
    ],
    approach: {
      label: 'Design Approach',
      pillars: [
        { num: '01', title: 'Context-aware', desc: 'Glanceable, ambient, minimal cognitive load, interfaces that know when to appear and when to disappear.' },
        { num: '02', title: 'Safety-first AI', desc: 'Guardrails, transparency, and user control. AI that asks before it acts and always shows its work.' },
        { num: '03', title: 'Beyond the screen', desc: 'Voice, gesture, spatial, interactions that feel natural because they meet users where they already are.' },
      ],
    },
    cta: {
      headline: 'Designing wearable AI?',
      sub: "From HUD overlays to voice interfaces, I design the future of interaction.",
    },
  },
]
