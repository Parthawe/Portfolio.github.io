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
      'Designing human-centered AI products — from smart glasses with on-device ML to voice interfaces, dev tools, and neural network visualizations.',
    metaTitle: 'AI & Machine Learning · Parth Pawar',
    metaDescription:
      'Designing human-centered AI products — from smart glasses with on-device ML to voice interfaces, dev tools, and neural network visualizations.',
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
          result: 'Safety-first AI assistant for glasses and web',
          role: 'Product Designer · 2026',
          tag: 'AI ASSISTANT',
          year: '2026',
          desc: 'Safety-first AI assistant for glasses and web',
        },
        {
          slug: 'oncall-lens',
          image: '/Assets/images/oncall-lens.png',
          alt: 'OnCall Lens',
          name: 'OnCall Lens',
          result: 'Sentry alerts to automated PR fixes via smart glasses',
          role: 'Designer + Developer · 2026',
          tag: 'DEVTOOLS',
          year: '2026',
          desc: 'Sentry alerts to automated PR fixes via smart glasses',
        },
      ],
      [
        {
          slug: 'executivelens',
          image: '/Assets/images/executivelens.png',
          alt: 'ExecutiveLens',
          name: 'ExecutiveLens',
          result: 'AI-powered business intelligence for executives',
          role: 'Product Designer · 2025–26',
          tag: 'AI ANALYTICS',
          year: '2026',
          desc: 'AI-powered business intelligence for executives',
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
          desc: 'AI is probabilistic — design for confidence levels and fallbacks.',
        },
        {
          num: '03',
          title: 'Multimodal thinking',
          desc: 'Voice, vision, gesture — designing across input modalities.',
        },
      ],
    },
    cta: {
      headline: 'Designing with AI?',
      sub: 'From smart glasses to LLM-powered tools — I design AI products people trust.',
    },
  },

  {
    slug: 'ux-design',
    accentColor: '#2563eb',
    title: 'UX',
    titleAccent: 'Design',
    description:
      'Product design spanning fintech, AI, enterprise SaaS, and consumer platforms — turning complex systems into intuitive, user-centered experiences.',
    metaTitle: 'UX Design · Parth Pawar',
    metaDescription:
      'Product design spanning fintech, AI, enterprise SaaS, and consumer platforms — turning complex systems into intuitive, user-centered experiences.',
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
          slug: 'executivelens',
          image: '/Assets/images/executivelens.png',
          alt: 'ExecutiveLens',
          name: 'ExecutiveLens',
          result: 'AI-powered business intelligence for executives',
          role: 'Product Designer · 2025–26',
          tag: 'AI ANALYTICS',
          year: '2026',
          desc: 'AI-powered business intelligence for executives',
        },
        {
          slug: 'zentipay',
          image: '/Assets/images/zentipay.png',
          alt: 'ZentiPay',
          name: 'ZentiPay',
          result: 'Fintech super app — 30% higher transaction success',
          role: 'Founding Designer · 2025',
          tag: 'FINTECH',
          year: '2025',
          desc: 'Fintech super app — 30% higher transaction success',
        },
      ],
      [
        {
          slug: 'transfi-project',
          image: '/Assets/images/transfi.jpg',
          alt: 'TransFi',
          name: 'TransFi',
          result: 'Crypto payments — $50M+ monthly volume',
          role: 'Lead Designer · 2022–23',
          tag: 'WEB3 PAYMENTS',
          year: '2023',
          desc: 'Crypto payments — $50M+ monthly volume',
        },
        {
          slug: 'cuetv',
          image: '/Assets/images/cuetv.jpg',
          alt: 'CueTV',
          name: 'CueTV',
          result: 'UX, brand, and product design',
          role: 'Product Designer',
          tag: 'PRODUCT DESIGN',
          year: '2023',
          desc: 'UX, brand, and product design',
        },
      ],
      [
        {
          slug: 'org-dashboard',
          image: '/Assets/images/org-dashboard.png',
          alt: 'OrgDashboard',
          name: 'OrgDashboard',
          result: 'AI-powered SaaS analytics for B2B',
          role: 'Product Designer · 2026',
          tag: 'B2B SAAS',
          year: '2026',
          desc: 'AI-powered SaaS analytics for B2B',
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
      sub: 'From 0→1 to scaling — I design products that ship and perform.',
    },
  },

  {
    slug: 'creative-tech',
    accentColor: '#f59e0b',
    title: 'Creative',
    titleAccent: 'Tech',
    description:
      'Experimental projects at the intersection of code, hardware, and design — ML instruments, generative keyboards, interactive simulations.',
    metaTitle: 'Creative Tech · Parth Pawar',
    metaDescription:
      'Experimental projects at the intersection of code, hardware, and design — ML instruments, generative keyboards, interactive simulations.',
    stats: ['6 projects', 'NYU ITP 2024', 'Code · Hardware · Art'],
    tools: [
      'Arduino',
      'p5.js',
      'Processing',
      'ML5.js',
      '3D Printing',
      'Laser Cutting',
    ],
    featured: {
      slug: 'keyboard-project',
      title: 'BreakGen',
      desc: 'Modular keyboard with generative design',
      role: 'ITP Thesis · 2025',
      image: '/Assets/images/keyboard.jpg',
      bgColor: '#fffbeb',
      tag: 'ITP THESIS',
      year: '2025',
    },
    moreProjects: [
      [
        {
          slug: 'jugalbandi',
          image: '/Assets/images/jugalbandi.png',
          alt: 'Jugalbandi',
          name: 'Jugalbandi',
          result: 'ML-driven musical instrument and installation',
          role: 'Creator · 2024',
          tag: 'ML + MUSIC',
          year: '2024',
          desc: 'ML-driven musical instrument and installation',
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
      sub: 'From concept to fabrication to exhibition — I make things that live beyond the screen.',
    },
  },

  {
    slug: 'installations',
    accentColor: '#6366f1',
    title: 'Install-',
    titleAccent: 'ations',
    description:
      'Physical installations and experiential design — kinetic stages, light sculptures, arcade games, and theatrical set design.',
    metaTitle: 'Installations · Parth Pawar',
    metaDescription:
      'Physical installations and experiential design — kinetic stages, light sculptures, arcade games, and theatrical set design.',
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
      slug: 'uv-light',
      title: 'UV Light',
      desc: 'Interactive light installation',
      role: 'Creator · 2024',
      image: '/Assets/images/uv-light.jpg',
      bgColor: '#eef2ff',
      tag: 'LIGHT ART',
      year: '2024',
    },
    moreProjects: [
      [
        {
          slug: 'revolving-stage',
          image: '/Assets/images/revolving-stage.jpg',
          alt: 'Revolving Stage',
          name: 'Revolving Stage',
          result: 'Kinetic stage design and fabrication',
          role: 'Creator · 2022',
          tag: 'FABRICATION',
          year: '2022',
          desc: 'Kinetic stage design and fabrication',
        },
        {
          slug: 'the-omakase',
          image: '/Assets/images/the-omakase.jpg',
          alt: 'The Omakase',
          name: 'The Omakase',
          result: '2-player party arcade game',
          role: 'Creator · 2024',
          tag: 'ARCADE GAME',
          year: '2024',
          desc: '2-player party arcade game',
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
          desc: 'Light, movement, materiality — immersive narrative.',
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
      'Brand identity, event design, typography, and visual storytelling — from TEDx stages to original typefaces.',
    metaTitle: 'Brand & Visual · Parth Pawar',
    metaDescription:
      'Brand identity, event design, typography, and visual storytelling — from TEDx stages to original typefaces.',
    stats: ['4 brand projects', 'TEDx Art Director', 'Typography · Identity'],
    tools: [
      'Illustrator',
      'Photoshop',
      'After Effects',
      'Typography',
      'Print Design',
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
          slug: 'atps',
          image: '/Assets/images/atps.png',
          alt: 'ArtTown Podcast',
          name: 'ArtTown Podcast',
          result: 'Podcast series on art and design',
          role: 'Creator',
          tag: 'MEDIA',
          year: '2021',
          desc: 'Podcast series on art and design',
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
          desc: 'Logo to type to color to motion — consistent everywhere.',
        },
        {
          num: '03',
          title: 'Craft in details',
          desc: 'Kerning, color precision, grid — the details that matter.',
        },
      ],
    },
    cta: {
      headline: 'Need a brand designer?',
      sub: 'From identity systems to event design — I build brands that scale.',
    },
  },

  {
    slug: 'fintech',
    accentColor: '#0ea5e9',
    title: 'Fintech',
    titleAccent: 'Design',
    description:
      'Designing financial products that simplify complexity — from crypto payment rails and super apps to enterprise analytics dashboards.',
    metaTitle: 'Fintech Design · Parth Pawar',
    metaDescription:
      'Designing financial products that simplify complexity — from crypto payment rails and super apps to enterprise analytics dashboards.',
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
      desc: 'Fintech super app — 30% higher transaction success rate',
      role: 'Founding Designer · 2025',
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
          result: 'Crypto payments — $50M+ monthly volume',
          role: 'Lead Designer · 2022–23',
          tag: 'WEB3 PAYMENTS',
          year: '2023',
          desc: 'Crypto payments — $50M+ monthly volume',
        },
        {
          slug: 'executivelens',
          image: '/Assets/images/executivelens.png',
          alt: 'ExecutiveLens',
          name: 'ExecutiveLens',
          result: 'AI-powered business intelligence for executives',
          role: 'Product Designer · 2025–26',
          tag: 'AI ANALYTICS',
          year: '2026',
          desc: 'AI-powered business intelligence for executives',
        },
      ],
      [
        {
          slug: 'org-dashboard',
          image: '/Assets/images/org-dashboard.png',
          alt: 'OrgDashboard',
          name: 'OrgDashboard',
          result: 'AI-powered SaaS analytics for B2B',
          role: 'Product Designer · 2026',
          tag: 'B2B SAAS',
          year: '2026',
          desc: 'AI-powered SaaS analytics for B2B',
        },
      ],
    ],
    approach: {
      label: 'Design Approach',
      pillars: [
        {
          num: '01',
          title: 'Data-dense, not cluttered',
          desc: 'Financial products need lots of info — the skill is hierarchy, not hiding.',
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
      sub: 'From crypto rails to executive dashboards — I design financial products that ship.',
    },
  },

  {
    slug: 'design-for-good',
    accentColor: '#10b981',
    title: 'Design',
    titleAccent: 'for Good',
    description:
      'Impact-driven design — accessibility, community development, and equity in education.',
    metaTitle: 'Design for Good · Parth Pawar',
    metaDescription:
      'Impact-driven design — accessibility, community development, and equity in education.',
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
      role: 'Designer · 2023',
      image: '/Assets/images/raahi.jpg',
      bgColor: '#ecfdf5',
      tag: 'CIVIC DESIGN',
      year: '2023',
    },
    moreProjects: [
      [
        {
          slug: 'the-point-cdc',
          image: '/Assets/images/the-point-cdc.png',
          alt: 'The Point CDC',
          name: 'The Point CDC',
          result: 'Community development platform for the Bronx',
          role: 'Designer · 2024',
          tag: 'COMMUNITY',
          year: '2024',
          desc: 'Community development platform for the Bronx',
        },
        {
          slug: 'office-of-diversity',
          image: '/Assets/images/office-of-diversity.png',
          alt: 'Office of Diversity',
          name: 'Office of Diversity',
          result: 'Web presence for NYU Tisch',
          role: 'Designer · 2023–24',
          tag: 'EDUCATION',
          year: '2024',
          desc: 'Web presence for NYU Tisch',
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
]
