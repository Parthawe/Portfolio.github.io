import type { ProjectMeta } from '@/types/project'

export const theOmakase: ProjectMeta = {
  slug: 'the-omakase',
  title: 'The Omakase',
  subtitle: '2-player party arcade game where sushi chefs compete to serve customers',
  description:
    'The Omakase is a 2-player party arcade game where sushi chefs compete to serve customers — a creative technology and game design project.',
  ogImage: 'https://www.designwhich.works/Assets/images/the-omakase.jpg',
  heroImage: '/Assets/images/the-omakase.jpg',
  projectColor: '#C94C4C',
  tags: ['Creative Technology', 'Game Design'],
  categories: ['install'],
  infoItems: [
    { label: 'Year', value: '2024' },
    { label: 'Role', value: 'Creator' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'moniac-machine',
    title: 'Moniac Machine',
    image: '/Assets/images/moniac-machine.jpg',
  },
  bottomNavSections: [
    { id: 'cs-gameplay', label: 'Gameplay' },
    { id: 'cs-fabrication', label: 'Fabrication' },
    { id: 'cs-exhibition', label: 'Exhibition' },
  ],
  sections: [
    // ── Video ──
    {
      type: 'overview',
      columns: [
        {
          heading: '',
          body: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/996020990?h=&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="The Omakase"></iframe></div>',
        },
      ],
    },

    // ── Overview ──
    {
      type: 'text',
      label: 'Overview',
      title: 'Serve or Be Served',
      body: [
        'The Omakase is a 2-player party arcade game. As two sushi chefs, you compete against each other by serving different customers their feast. The arcade has two sets of controls, each containing 8 buttons that change color throughout gameplay. You need to serve quick and accurate \u2014 though you will get messy.',
        '<a href="https://vill4n3lle.itch.io/the-omakase" target="_blank" rel="noopener">Play at vill4n3lle.itch.io/the-omakase \u2192</a>',
      ],
    },

    // ── 01 — Gameplay ──
    {
      type: 'text',
      id: 'cs-gameplay',
      label: '01 \u2014 Gameplay',
      title: 'Gameplay',
      body: [
        'Two players face off as competing sushi chefs. Each player has 8 color-changing buttons mapped to ingredients. Orders appear on screen and players must match the correct sequence before their opponent.',
      ],
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/B1899182472545304968837588124182/1.jpg',
      alt: 'The Omakase gameplay',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/T1899182472600645201058716779030/3.jpg',
      alt: 'The Omakase gameplay detail',
    },

    // ── 02 — Fabrication ──
    {
      type: 'text',
      id: 'cs-fabrication',
      label: '02 \u2014 Fabrication',
      title: 'Fabrication',
      body: [
        'Custom arcade cabinet built with laser-cut panels, Arduino Mega controllers, and 16 individually addressable RGB buttons. The cabinet design references classic Japanese arcade aesthetics.',
      ],
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/K1899182472619091945132426330646/4.jpg',
      alt: 'The Omakase fabrication',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/O1899182472637538689206135882262/5.jpg',
      alt: 'The Omakase cabinet detail',
    },

    // ── 03 — Exhibition ──
    {
      type: 'text',
      id: 'cs-exhibition',
      label: '03 \u2014 Exhibition',
      title: 'Exhibition',
      body: [
        'Exhibited at ITP Spring Show 2024. Players competed in live tournaments, with the game generating an energetic, competitive atmosphere.',
      ],
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/P1899182472655985433279845433878/6.jpg',
      alt: 'The Omakase at ITP Spring Show',
    },

    // ── Thank You ──
    { type: 'thank-you', title: 'Thank You' },
  ],
}
