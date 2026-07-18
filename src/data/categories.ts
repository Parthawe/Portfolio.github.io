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
  includedHiddenProjects?: string[]
  excludedProjects?: string[]
  archiveSection?: {
    label: string
    projects: string[]
  }
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
    titleAccent: 'Wearables',
    description:
      'Designing human-centered AI products, from smart glasses and wearable app stores to voice interfaces, dev tools, healthcare AI, and executive intelligence.',
    metaTitle: 'AI & Wearables · Parth Pawar',
    metaDescription:
      'Designing human-centered AI products, from smart glasses and wearable app stores to voice interfaces, dev tools, healthcare AI, and executive intelligence.',
    stats: ['8 AI products shipped', 'Smart glasses to cloud', 'Trust-first AI'],
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
      image: '/Assets/images/mentra.webp',
      bgColor: '#fef2f2',
      tag: 'AI WEARABLES',
      year: '2026',
    },
    moreProjects: [
      [
        {
          slug: 'mentra-miniapps',
          image: '/Assets/images/mentra/appstore-hero.webp',
          alt: 'Mentra MiniApps',
          name: 'Mentra MiniApps',
          result: 'Voice-first miniapp ecosystem for smart glasses',
          role: 'Platform Designer · 2025–26',
          tag: 'PLATFORM DESIGN',
          year: '2025–26',
          desc: 'Voice-first miniapp ecosystem for smart glasses',
        },
        {
          slug: 'clawed-chat',
          image: '/Assets/images/clawed.webp',
          alt: 'Clawed',
          name: 'Clawed',
          result: 'AI assistant with receipts for every action, 3-tier trust architecture',
          role: 'Product Designer · 2026',
          tag: 'AI ASSISTANT',
          year: '2026',
          desc: 'AI assistant with receipts for every action, 3-tier trust architecture',
        },
      ],
      [
        {
          slug: 'executivelens',
          image: '/Assets/images/executivelens.webp',
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
          image: '/Assets/images/oncall-lens.webp',
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
          slug: 'ballah-code',
          image: '/Assets/images/ballah-code.webp',
          alt: 'Ballah Code',
          name: 'Ballah Code',
          result: 'AI-native desktop IDE with 17 production tools',
          role: 'Creator · 2026',
          tag: 'AI DEVTOOLS',
          year: '2026',
          desc: 'AI-native desktop IDE with 17 production tools',
        },
        {
          slug: 'ai-voice',
          image: '/Assets/images/nda-cover.svg',
          alt: 'AI Voice Interface',
          name: 'AI Voice Interface',
          result: 'Enterprise voice selection with emotional intelligence, A/B tested',
          role: 'Designer · 2025',
          tag: 'VOICE UI',
          year: '2025',
          desc: 'Enterprise voice selection with emotional intelligence, A/B tested',
        },
      ],
      [
        {
          slug: 'ibm',
          image: '/Assets/Projects/CancerPrognosis/photos/hero-illustration.png',
          alt: 'IBM Cancer Prognosis',
          name: 'IBM Cancer Prognosis',
          result: 'Encrypted genomic workflows for cancer prognosis',
          role: 'Research Intern · 2020',
          tag: 'HEALTHCARE AI',
          year: '2020',
          desc: 'Encrypted genomic workflows for cancer prognosis',
        },
      ],
    ],
    excludedProjects: ['ai-voice', 'ibm'],
    archiveSection: {
      label: 'UI/UX Archive Projects',
      projects: ['raahi-project', 'transfi-project', 'ballah-code'],
    },
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
      'Product design across fintech, AI, enterprise SaaS, and consumer platforms, with flows that make risk, status, and next steps clear.',
    metaTitle: 'UX Design · Parth Pawar',
    metaDescription:
      'Product design across fintech, AI, enterprise SaaS, and consumer platforms, with flows that make risk, status, and next steps clear.',
    stats: ['6 products shipped', 'high-stakes payment systems', '5+ years'],
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
      desc: 'AI wearable OS, companion app, MiniApp Store, and launch site',
      role: 'Head of UI/UX · 2025–present',
      image: '/Assets/images/nda-cover.svg',
      bgColor: '#eff6ff',
      tag: 'AI WEARABLES',
      year: '2025–present',
    },
    moreProjects: [
      [
        {
          slug: 'transfi-project',
          image: '/Assets/images/nda-cover.svg',
          alt: 'TransFi',
          name: 'TransFi',
          result: 'Crypto payment infrastructure preview',
          role: 'Lead Product Designer · 2022–23',
          tag: 'WEB3 PAYMENTS',
          year: '2023',
          desc: 'Crypto payment infrastructure preview',
        },
        {
          slug: 'raahi-project',
          image: '/Assets/images/nda-cover.svg',
          alt: 'Raahi',
          name: 'Raahi',
          result: 'Accessible civic navigation for Pune public transit',
          role: 'Product Designer · 2024',
          tag: 'CIVIC UX',
          year: '2024',
          desc: 'Accessible civic navigation for Pune public transit',
        },
        {
          slug: 'zentipay',
          image: '/Assets/images/nda-cover.svg',
          alt: 'ZentiPay',
          name: 'ZentiPay',
          result: 'Trust-first fintech super app and cross-border transfer flows',
          role: 'Founding Product Designer · 2025',
          tag: 'FINTECH',
          year: '2025',
          desc: 'Trust-first fintech super app and cross-border transfer flows',
        },
      ],
      [
        {
          slug: 'cuetv',
          image: '/Assets/images/nda-cover.svg',
          alt: 'CueTV',
          name: 'CueTV',
          result: 'OTT streaming and retargeting-system strategy',
          role: 'Product Designer · 2022',
          tag: 'PRODUCT DESIGN',
          year: '2022',
          desc: 'OTT streaming and retargeting-system strategy',
        },
      ],
      [
        {
          slug: 'healthapp',
          image: '/Assets/images/nda-cover.svg',
          alt: 'Health App',
          name: 'Health App',
          result: 'Health-aware planning around sleep, food, movement, and energy',
          role: 'Product Designer · 2024',
          tag: 'UX DESIGN',
          year: '2024',
          desc: 'Health-aware planning around sleep, food, movement, and energy',
        },
        {
          slug: 'code-for-build',
          image: '/Assets/images/code-for-build.jpg',
          alt: 'Code for Build',
          name: 'Code for Build',
          result: 'Mobile-first coding education concept using 3D building blocks',
          role: 'Designer · 2021',
          tag: 'UX DESIGN',
          year: '2021',
          desc: 'Mobile-first coding education concept using 3D building blocks',
        },
      ],
      [
        {
          slug: 'vj-software',
          image: '/Assets/images/vj.jpg',
          alt: 'VJ Software',
          name: 'VJ Software',
          result: 'Audio-reactive visual performance tool',
          role: 'UX Designer · 2022',
          tag: 'UX DESIGN',
          year: '2022',
          desc: 'Audio-reactive visual performance tool',
        },
      ],
    ],
    archiveSection: {
      label: 'Research Projects',
      projects: ['cuetv', 'code-for-build', 'ibm'],
    },
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
          desc: 'Component systems that keep patterns consistent across teams.',
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
      image: '/Assets/images/jugalbandi.webp',
      bgColor: '#fffbeb',
      tag: 'ML + MUSIC',
      year: '2024',
    },
    moreProjects: [
      [
        {
          slug: 'breakgen',
          image: '/Assets/Projects/Keyboard/photos/breakgen-launch-live.png',
          alt: 'BreakGen',
          name: 'BreakGen',
          result: 'AI platform for designing custom keyboards \u2014 from prompt to fabrication',
          role: 'ITP Thesis · 2025',
          tag: 'ITP THESIS',
          year: '2025',
          desc: 'AI platform for designing custom keyboards \u2014 from prompt to fabrication',
        },
        {
          slug: 'keyboard-project',
          image: '/Assets/Projects/Keyboard/photos/keyboard-data-hero.webp',
          alt: 'Keyboard Project',
          name: 'Keyboard Project',
          result: 'Physical keyboard study turning key height into a tactile data object',
          role: 'Designer & Fabricator · 2024',
          tag: 'DATA OBJECT',
          year: '2024',
          desc: 'Physical keyboard study turning key height into a tactile data object',
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
    excludedProjects: ['vj-software'],
    archiveSection: {
      label: 'UI/UX Archive Projects',
      projects: ['raahi-project', 'transfi-project', 'ballah-code'],
    },
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
          desc: 'Curiosity-first technology with clear feedback loops.',
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
    title: 'Installations',
    titleAccent: '& Fabrication',
    description:
      'Things you can walk through, sit inside, or play with. Kinetic stages, light sculptures, arcade cabinets, and theatrical sets, designed and physically built.',
    metaTitle: 'Installations · Parth Pawar',
    metaDescription:
      'Physical installations and experiential design by Parth Pawar. Light sculptures, arcade games, kinetic stages, and theatrical scenic design.',
    stats: ['7 built & exhibited', 'Horological Society of NY', 'WonderVille NYC', 'ITP Shows'],
    tools: [
      '3D Printing',
      'Laser Cutting',
      'Arduino',
      'LED Systems',
      'Scenic Design',
      'Woodworking',
    ],
    featured: {
      slug: 'enigma',
      title: 'Enigma',
      desc: 'A 200-neuron light sculpture that turns an active neural network into a physical, visible system.',
      role: 'Creative Technologist · 2023',
      image: '/Assets/mockups/projects/enigma_16x9.webp',
      bgColor: '#111827',
      tag: 'DEEP LEARNING',
      year: '2023',
    },
    moreProjects: [
      [
        {
          slug: 'uv-light',
          image: '/Assets/images/uv-light.jpg',
          alt: 'UV Light',
          name: 'UV Light',
          result: 'Multi-room blacklight installation with hidden messages revealed under UV, plus live projection mapping',
          role: 'Creator · 2023',
          tag: 'LIGHT ART',
          year: '2023',
          desc: 'Multi-room blacklight installation with hidden messages revealed under UV, plus live projection mapping',
        },
        {
          slug: 'the-omakase',
          image: '/Assets/images/the-omakase.jpg',
          alt: 'The Omakase',
          name: 'The Omakase',
          result: '2-player sushi arcade cabinet with custom RGB button controllers, exhibited at ITP Winter Show and WonderVille NYC',
          role: 'Creator · 2024',
          tag: 'ARCADE GAME',
          year: '2024',
          desc: '2-player sushi arcade cabinet with custom RGB button controllers, exhibited at ITP Winter Show and WonderVille NYC',
        },
      ],
      [
        {
          slug: 'revolving-stage',
          image: '/Assets/images/revolving-stage.webp',
          alt: 'Revolving Stage',
          name: 'Revolving Stage',
          result: '15 ft. diameter rotating stage supporting 250+ kgs of live performers, engineered for a university theatre production',
          role: 'Creator · 2022',
          tag: 'FABRICATION',
          year: '2022',
          desc: '15 ft. diameter rotating stage supporting 250+ kgs of live performers, engineered for a university theatre production',
        },
        {
          slug: 'sculpture',
          image: '/Assets/Projects/Sculpture/1.jpg',
          alt: 'Sculpture',
          name: 'Sculpture',
          result: 'Competition sculpture glimpse from beginner practice to finished piece',
          role: 'Sculptor · 2020',
          tag: 'SCULPTURE',
          year: '2020',
          desc: 'Competition sculpture glimpse from beginner practice to finished piece',
        },
      ],
      [
        {
          slug: 'moniac-machine',
          image: '/Assets/images/moniac-machine.jpg',
          alt: 'Moniac Machine',
          name: 'Moniac Machine',
          result: 'Board game based on a 1949 hydraulic economic computer, where players manage an economy through physical resource allocation',
          role: 'Game Designer · 2024',
          tag: 'GAME DESIGN',
          year: '2024',
          desc: 'Board game based on a 1949 hydraulic economic computer, where players manage an economy through physical resource allocation',
        },
        {
          slug: 'drowning',
          image: '/Assets/images/drowning.jpg',
          alt: 'Drowning',
          name: 'Drowning',
          result: 'Abandoned greenhouse scenic design for NYU theatre, multi-layer lighting for 100+ audience',
          role: 'Set Designer · 2024',
          tag: 'SCENIC DESIGN',
          year: '2024',
          desc: 'Abandoned greenhouse scenic design for NYU theatre, multi-layer lighting for 100+ audience',
        },
      ],
    ],
    archiveSection: {
      label: 'Stage Design',
      projects: ['dumb-waiter-set-design', 'drowning', 'revolving-stage'],
    },
    approach: {
      label: 'Design Approach',
      pillars: [
        {
          num: '01',
          title: 'The body teaches faster than the screen',
          desc: 'Weight, texture, light, and scale communicate things a pixel never can. Every installation is designed to be understood through physical presence, not reading.',
        },
        {
          num: '02',
          title: 'Built for hundreds of hands',
          desc: 'Public installations get touched, bumped, and played with by hundreds of people. Every mechanism is engineered to survive the real world, not just a demo.',
        },
        {
          num: '03',
          title: 'Space as interface',
          desc: 'The room IS the product. Lighting, sightlines, acoustics, and material choice shape behavior before anyone reads a label.',
        },
      ],
    },
    cta: {
      headline: 'Building something physical?',
      sub: 'I design and fabricate interactive installations for galleries, events, and public spaces. From concept to wiring to exhibition.',
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
    stats: ['Type design · Packaging · Art direction', 'Typography · Identity · Motion', 'Event systems · Editorial'],
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
      slug: 'mentra-brand',
      title: 'Mentra Brand & Packaging',
      desc: 'Brand identity, packaging, booklet, renders, and launch assets for AI smart glasses',
      role: 'Sole Designer · 2025–26',
      image: '/Assets/Projects/mentra-brand/photos/render-both-frames.webp',
      bgColor: '#fdf4ff',
      tag: 'BRAND & PACKAGING',
      year: '2025–26',
    },
    moreProjects: [
      [
        {
          slug: 'typeface',
          image: '/Assets/images/typeface.webp',
          alt: "Butler's Slice",
          name: "Butler's Slice",
          result: 'Original display typeface with a sliced geometric voice',
          role: 'Type Designer · 2022',
          tag: 'TYPE DESIGN',
          year: '2022',
          desc: 'Original display typeface with a sliced geometric voice',
        },
      ],
      [
        {
          slug: 'office-of-diversity',
          image: '/Assets/images/office-of-diversity.webp',
          alt: 'Office of Diversity',
          name: 'Office of Diversity',
          result: 'Accessible web report structure and visual system for NYU Tisch IDBEA content',
          role: 'Designer · 2024',
          tag: 'EDITORIAL SYSTEM',
          year: '2024',
          desc: 'Accessible web report structure and visual system for NYU Tisch IDBEA content',
        },
        {
          slug: 'sea-of-salt',
          image: '/Assets/images/sea-of-salt.svg',
          alt: 'Why the Sea is Salt',
          name: 'Why the Sea is Salt',
          result: 'Narrative object, visual system, and kinetic installation language',
          role: 'Designer · 2024',
          tag: 'NARRATIVE DESIGN',
          year: '2024',
          desc: 'Narrative object, visual system, and kinetic installation language',
        },
      ],
    ],
    archiveSection: {
      label: 'UI/UX Archive Projects',
      projects: ['raahi-project', 'transfi-project', 'ballah-code'],
    },
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
    stats: ['Payment infrastructure', '4 products shipped', 'Trust-first flows'],
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
      desc: 'Fintech super app, trust-first transfer flows',
      role: 'Founding Product Designer · 2025',
      image: '/Assets/images/nda-cover.svg',
      bgColor: '#e8f4fd',
      tag: 'FINTECH',
      year: '2025',
    },
    moreProjects: [
      [
        {
          slug: 'transfi-project',
          image: '/Assets/images/nda-cover.svg',
          alt: 'TransFi',
          name: 'TransFi',
          result: 'Crypto payment infrastructure preview',
          role: 'Lead Product Designer · 2022–23',
          tag: 'WEB3 PAYMENTS',
          year: '2023',
          desc: 'Crypto payment infrastructure preview',
        },
      ],
    ],
    archiveSection: {
      label: 'UI/UX Archive Projects',
      projects: ['mentra', 'vj-software', 'cuetv'],
    },
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
      sub: 'From crypto rails to trust-first transfer flows, I design financial products that ship.',
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
    stats: ['4 healthcare & impact systems', 'Community-centered', 'Accessibility-first'],
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
          slug: 'ibm',
          image: '/Assets/mockups/projects/ibm_16x9.webp',
          alt: 'IBM Cancer Prognosis',
          name: 'IBM Cancer Prognosis',
          result: 'Encrypted genomic workflows for cancer prognosis without exposing raw patient data',
          role: 'Research Intern · 2020',
          tag: 'HEALTHCARE AI',
          year: '2020',
          desc: 'Encrypted genomic workflows for cancer prognosis without exposing raw patient data',
        },
        {
          slug: 'healthapp',
          image: '/Assets/mockups/projects/healthapp_16x9.webp',
          alt: 'Health App',
          name: 'Health App',
          result: 'Health-aware planning shaped by sleep, movement, nutrition, and energy',
          role: 'Product Designer · 2024',
          tag: 'DIGITAL HEALTH',
          year: '2024',
          desc: 'A calmer daily planner that adapts work to the person doing it',
        },
        {
          slug: 'medimorpho',
          image: '/Assets/Projects/MediMorpho/medimorpho-16x9.svg',
          alt: 'MediMorpho multilingual healthcare interpretation concept',
          name: 'MediMorpho',
          result: 'A multilingual care model shaped by 20 primary-research interviews',
          role: 'Service Designer · 2024',
          tag: 'HEALTHCARE UX',
          year: '2024',
          desc: 'Language identification, live interpretation, and a shared clinical recap for clearer care',
        },
        {
          slug: 'the-point-cdc',
          image: '/Assets/images/the-point-cdc.webp',
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
          image: '/Assets/images/office-of-diversity.webp',
          alt: 'Office of Diversity',
          name: 'Office of Diversity',
          result: 'Accessible web report structure for NYU Tisch IDBEA content',
          role: 'Designer · 2023–24',
          tag: 'EDUCATION',
          year: '2024',
          desc: 'Accessible web report structure for NYU Tisch IDBEA content',
        },
      ],
    ],
    includedHiddenProjects: ['healthapp'],
    archiveSection: {
      label: 'UI/UX Archive Projects',
      projects: ['the-point-cdc', 'office-of-diversity', 'code-for-build'],
    },
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
      'Designing secure interfaces for DeFi tools, cross-border payments, and blockchain products, with fees, status, and recovery visible.',
    metaTitle: 'Crypto & Web3 Design · Parth Pawar',
    metaDescription:
      'Product design for crypto and Web3: payment rails, compliance flows, and blockchain products with clear status and recovery.',
    stats: ['Payment infrastructure', '2 products shipped', '3+ years in Web3'],
    tools: ['Figma', 'Token Design', 'DeFi Protocols', 'Compliance UX', 'Payment Rails'],
    featured: {
      slug: 'transfi-project',
      title: 'TransFi',
      desc: 'Crypto payment infrastructure preview',
      role: 'Lead Product Designer · 2022–23',
      image: '/Assets/images/nda-cover.svg',
      bgColor: '#f0ecff',
      tag: 'WEB3 PAYMENTS',
      year: '2023',
    },
    moreProjects: [
      [
        {
          slug: 'zentipay',
          image: '/Assets/images/nda-cover.svg',
          alt: 'ZentiPay',
          name: 'ZentiPay',
          result: 'Fintech super app, trust-first transfer flows',
          role: 'Founding Product Designer · 2025',
          tag: 'FINTECH',
          year: '2025',
          desc: 'Fintech super app, trust-first transfer flows',
        },
      ],
    ],
    archiveSection: {
      label: 'UI/UX',
      projects: ['mentra', 'raahi-project', 'clawed-chat'],
    },
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
      sub: "I've shipped products handling Payment infrastructure. Let's talk.",
    },
  },

  {
    slug: 'ai-wearables',
    accentColor: '#ec4899',
    title: 'AI &',
    titleAccent: 'Wearables',
    description:
      'Interfaces for smart glasses, voice assistants, developer tools, and conversational AI.',
    metaTitle: 'AI & Wearables Design · Parth Pawar',
    metaDescription:
      'Interfaces for smart glasses, voice assistants, developer tools, and conversational AI.',
    stats: ['7 AI/wearable projects', 'Smart glasses to voice', 'On-device to cloud'],
    tools: ['Figma', 'AR Prototyping', 'Voice UI', 'LLM Integration', 'Gesture Design', 'Responsible AI'],
    featured: {
      slug: 'mentra',
      title: 'Mentra',
      desc: 'AI smart glasses OS, companion app, store, and launch website',
      role: 'Head of UI/UX · 2025–Present',
      image: '/Assets/images/mentra.webp',
      bgColor: '#fdf2f8',
      tag: 'AI WEARABLES',
      year: '2025–Present',
    },
    moreProjects: [
      [
        {
          slug: 'mentra-miniapps',
          image: '/Assets/images/mentra/appstore-hero.webp',
          alt: 'Mentra MiniApps',
          name: 'Mentra MiniApps',
          result: 'Voice-first miniapp ecosystem for smart glasses',
          role: 'Platform Designer · 2025–26',
          tag: 'PLATFORM DESIGN',
          year: '2025–26',
          desc: 'Voice-first miniapp ecosystem for smart glasses',
        },
        {
          slug: 'clawed-chat',
          image: '/Assets/images/clawed.webp',
          alt: 'Clawed',
          name: 'Clawed',
          result: 'Safety-first AI assistant for glasses and web',
          role: 'Product Designer · 2026',
          tag: 'AI ASSISTANT',
          year: '2026',
          desc: 'Safety-first AI assistant for glasses and web',
        },
      ],
      [
        {
          slug: 'executivelens',
          image: '/Assets/images/executivelens.webp',
          alt: 'ExecutiveLens',
          name: 'ExecutiveLens',
          result: 'AI meeting intelligence for executives',
          role: 'Product Designer · 2025–26',
          tag: 'AI ANALYTICS',
          year: '2025–26',
          desc: 'AI meeting intelligence for executives',
        },
        {
          slug: 'oncall-lens',
          image: '/Assets/images/oncall-lens.webp',
          alt: 'OnCall Lens',
          name: 'OnCall Lens',
          result: 'Sentry alerts to automated PR fixes via smart glasses',
          role: 'Designer + Developer · 2026',
          tag: 'AI WEARABLE',
          year: '2026',
          desc: 'Sentry alerts to automated PR fixes via smart glasses',
        },
      ],
    ],
    excludedProjects: ['ai-voice', 'ibm'],
    archiveSection: {
      label: 'UI/UX Archive Projects',
      projects: ['raahi-project', 'transfi-project', 'ballah-code'],
    },
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
