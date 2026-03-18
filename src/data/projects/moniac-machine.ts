import type { ProjectMeta } from '@/types/project'

export const moniacMachine: ProjectMeta = {
  slug: 'moniac-machine',
  title: 'Moniac Machine',
  subtitle:
    'Economic strategy game inspired by the legendary 1949 Phillips hydraulic computer',
  description:
    'Economic strategy game inspired by the legendary 1949 Phillips hydraulic computer — a creative technology and game design project.',
  ogImage: 'https://www.designwhich.works/Assets/images/moniac-machine.jpg',
  heroImage: '/Assets/images/moniac-machine.jpg',
  projectColor: '#2E7D32',
  tags: ['Creative Technology', 'Game Design'],
  categories: ['install'],
  infoItems: [
    { label: 'Year', value: '2024' },
    { label: 'Role', value: 'Creator' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'drowning',
    title: 'Drowning',
    image: '/Assets/images/drowning.jpg',
  },
  bottomNavSections: [
    { id: 'cs-inspiration', label: 'Inspiration' },
    { id: 'cs-mechanics', label: 'Mechanics' },
    { id: 'cs-result', label: 'Result' },
  ],
  sections: [
    // ── Video ──
    {
      type: 'overview',
      columns: [
        {
          heading: '',
          body: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/996025152" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Moniac Machine"></iframe></div>',
        },
      ],
    },

    // ── Overview ──
    {
      type: 'text',
      label: 'Overview',
      title: 'Master the Economy',
      body: [
        'Dive into the world of Moniac Game, where you master the ebb and flow of a nation\u2019s fortunes. Drawing from the legendary 1949 Phillips Moniac Machine, you juggle fiscal levers and monetary policy while navigating financial crises. Each twist of a tax knob and allocation of government gold could either lift your economy to dizzying heights or plunge it into despair.',
        'The project translates an analog hydraulic computer into a digital interactive game, preserving the original\u2019s core insight: that economic systems are best understood through dynamic, real-time feedback rather than static equations on a page. Players experience cause and effect viscerally \u2014 raise taxes too aggressively and watch consumer spending collapse; slash interest rates and see inflation spiral within seconds.',
        'Designed as both an educational tool and a playful provocation, the Moniac Game invites players to confront the fundamental tension of macroeconomic policy: every lever you pull has unintended consequences, and the system never sits still long enough for a perfect solution. The goal is not to win, but to develop an intuitive feel for how interconnected economic variables truly are.',
      ],
    },

    // ── 01 — Inspiration ──
    {
      type: 'text',
      id: 'cs-inspiration',
      label: '01 \u2014 Inspiration',
      title: 'Inspiration',
      body: [
        'The original MONIAC (Monetary National Income Analogue Computer) was a hydraulic machine built in 1949 by economist Bill Phillips. It used water flowing through pipes to model economic systems. This game translates that physical metaphor into a digital interactive experience.',
        'Phillips, a New Zealand economist at the London School of Economics, built the machine to demonstrate Keynesian economic theory in a way that lectures and textbooks could not. Water represented money flowing through the economy \u2014 taxes drained from one tank, government spending pumped into another, and the water level in the central reservoir represented national income. The machine was surprisingly accurate, and several universities acquired their own units for teaching.',
        'What struck me most about the original MONIAC was its commitment to making the invisible visible. Economic flows are abstract by nature \u2014 money moving between sectors, interest rates rippling through markets, inflation compounding over time. Phillips turned all of that into something you could see, hear, and touch. The game I built carries that same philosophy into a digital context, using real-time visual feedback and tangible controls to make macroeconomic dynamics feel immediate and consequential.',
      ],
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/t/original/i/H1909522268650214435062429319702/1.jpg',
      alt: 'Moniac Machine \u2014 inspiration',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/t/original/i/F1909522268834681875799524835862/2.jpg',
      alt: 'Moniac Machine \u2014 reference',
    },

    // ── 02 — Mechanics ──
    {
      type: 'text',
      id: 'cs-mechanics',
      label: '02 \u2014 Mechanics',
      title: 'Mechanics',
      body: [
        'Players adjust tax rates, government spending, and interest rates through physical sliders and knobs. The economy responds in real-time with visual feedback showing GDP, inflation, and employment flowing through the system.',
        'The game mechanics are built around three primary control levers: a tax rate slider that determines how much revenue the government collects from economic activity, a spending dial that allocates government funds across public services and infrastructure, and an interest rate knob that influences borrowing costs and consumer behavior. Each control feeds into a simulation engine that calculates cascading effects across interconnected economic indicators \u2014 adjusting one variable immediately shifts the equilibrium of all the others.',
        'Random event cards introduce external shocks \u2014 trade wars, natural disasters, technological breakthroughs, and pandemics \u2014 that force players to adapt their strategy under pressure. The visual interface displays economic health through animated flow diagrams reminiscent of the original hydraulic pipes, with color-coded streams representing different sectors of the economy. Players quickly develop an intuitive sense of which levers to pull and when, building the kind of systems-level understanding that traditional economics education often struggles to convey.',
      ],
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/t/original/i/Y1909522268816235131725815284246/3.jpg',
      alt: 'Moniac Machine \u2014 mechanics',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/t/original/i/I1909522268797788387652105732630/4.jpg',
      alt: 'Moniac Machine \u2014 controls',
    },

    // ── 03 — Result ──
    {
      type: 'text',
      id: 'cs-result',
      label: '03 \u2014 Result',
      title: 'Result',
      body: [
        'The game creates an intuitive understanding of macroeconomic feedback loops that textbooks struggle to convey. Playtesters consistently reported that after just a few rounds, they could predict how a change in interest rates would ripple through employment and inflation \u2014 a conceptual leap that often takes weeks to develop in a classroom setting.',
        'The most revealing feedback came from economics students who said the game helped them understand why policy decisions are so difficult in practice. Reading about the tradeoff between inflation and unemployment is one thing; watching your carefully balanced economy collapse because you raised taxes two percentage points too high is another. The emotional stakes of the game, even though fictional, created a memorable learning experience that static diagrams cannot replicate.',
        'The project was exhibited as an interactive installation where visitors could play individually or in teams, competing to maintain the healthiest economy over a fixed number of rounds. The competitive element added urgency and forced faster decision-making, mimicking the time pressure that real policymakers face. Several players returned multiple times, experimenting with different strategies \u2014 a strong signal that the game had succeeded in making economics genuinely engaging.',
      ],
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/t/original/i/F1909522268779341643578396181014/5.jpg',
      alt: 'Moniac Machine \u2014 result',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/t/original/i/X1909522268760894899504686629398/6.jpg',
      alt: 'Moniac Machine \u2014 final',
    },

    // ── Thank You ──
    { type: 'thank-you', title: 'Thank You' },
  ],
}
