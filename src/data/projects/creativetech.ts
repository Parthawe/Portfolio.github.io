import type { ProjectMeta } from '@/types/project'

export const creativetech: ProjectMeta = {
  slug: 'creativetech',
  title: 'Creative Technology',
  subtitle: 'Bridging code, hardware, and art',
  description:
    'Bridging code, hardware, and art \u2014 physical computing installations, generative design, ML-driven instruments, and interactive experiences.',
  ogImage: 'https://www.designwhich.works/Assets/images/mentra.png',
  heroImage: '/Assets/images/keyboard.jpg',
  projectColor: '#1A1A1A',
  tags: [
    'Arduino',
    'Raspberry Pi',
    'p5.js',
    'Processing',
    'TensorFlow',
    '3D Printing',
    'Laser Cutting',
    'CNC',
  ],
  infoItems: [],
  backLink: { label: '\u2190 Work', href: '/work' },
  categories: [],
  sections: [
    // ── Hero stats ───────────────────────────────────────────────
    {
      type: 'stats',
      title: 'Creative Technology',
      body: [
        'Bridging code, hardware, and art \u2014 physical computing installations, generative design, ML-driven instruments, and interactive experiences.',
      ],
      stats: [
        { label: 'Installations built', value: '8' },
        { label: 'Program', value: 'NYU ITP 2024' },
        { label: 'Stack', value: 'Arduino \u00b7 ML \u00b7 Fab' },
      ],
    },

    // ── Featured project ─────────────────────────────────────────
    {
      type: 'features',
      label: 'Featured',
      title: 'BreakGen',
      body: ['Modular keyboard platform with generative design'],
      cards: [
        {
          title: 'BreakGen',
          description:
            'Modular keyboard platform with generative design \u2014 ITP Thesis \u00b7 2024',
        },
      ],
    },

    {
      type: 'image',
      src: '/Assets/images/keyboard.jpg',
      alt: 'BreakGen',
    },

    // ── More Projects ────────────────────────────────────────────
    {
      type: 'image-grid',
      id: 'more-projects',
      columns: 2,
      images: [
        { src: '/Assets/images/jugalbandi.png', alt: 'Jugalbandi' },
        { src: '/Assets/images/enigma.jpg', alt: 'Enigma' },
        { src: '/Assets/images/vj.jpg', alt: 'VJ Software' },
        { src: '/Assets/images/shuffle.jpg', alt: 'Shuffle' },
        { src: '/Assets/images/making-of-time.jpg', alt: 'Making of Time' },
        { src: '/Assets/images/uv-light.jpg', alt: 'UV Light' },
      ],
    },

    {
      type: 'features',
      label: 'More Projects',
      title: 'Projects',
      cards: [
        {
          title: 'Jugalbandi',
          description: 'ML-driven musical instrument \u2014 Creator \u00b7 2024',
        },
        {
          title: 'Enigma',
          description:
            'Light sculpture with deep learning neural network \u2014 Creator \u00b7 2023',
        },
        {
          title: 'VJ Software',
          description: 'Real-time visual performance tool \u2014 Creator \u00b7 2024',
        },
        {
          title: 'Shuffle',
          description: 'Interactive strategy simulation \u2014 Creator \u00b7 2024',
        },
        {
          title: 'Making of Time',
          description:
            'Time exploration through physical computing \u2014 Creator \u00b7 2024',
        },
        {
          title: 'UV Light',
          description: 'Interactive light installation \u2014 Creator \u00b7 2024',
        },
      ],
    },

    // ── Design Approach ──────────────────────────────────────────
    {
      type: 'steps',
      label: 'Design Approach',
      title: 'Design Approach',
      steps: [
        {
          num: 1,
          title: 'Code meets craft',
          description:
            'Every project bridges digital and physical \u2014 PCB to ML to hand-finishing.',
        },
        {
          num: 2,
          title: 'Iterative prototyping',
          description:
            'Fast failures \u2014 build, test, break, rebuild until the interaction feels right.',
        },
        {
          num: 3,
          title: 'Exhibition-ready',
          description:
            'Robust for hundreds of users, intuitive enough to need no instructions.',
        },
      ],
    },

    // ── CTA ──────────────────────────────────────────────────────
    {
      type: 'callout',
      text: 'Looking for a creative technologist? From concept to PCB to exhibition \u2014 I build things that live beyond the screen.',
    },

    // ── Thank you ────────────────────────────────────────────────
    {
      type: 'thank-you',
      title: 'Looking for a creative technologist?',
      body: 'From concept to PCB to exhibition \u2014 I build things that live beyond the screen. parthpawar@nyu.edu',
    },
  ],
}
