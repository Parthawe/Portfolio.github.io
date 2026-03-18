import type { ProjectMeta } from '@/types/project'

export const makingOfTime: ProjectMeta = {
  slug: 'making-of-time',
  title: 'Making of Time',
  subtitle: 'Exploring the essence of time from ancient methods to contemporary technology',
  description:
    'Exploring the essence of time from ancient methods to contemporary technology \u2014 a creative technology and physical computing project.',
  ogImage: 'https://www.designwhich.works/Assets/images/making-of-time.jpg',
  heroImage: '/Assets/images/making-of-time.jpg',
  projectColor: '#8B6914',
  tags: ['Creative Technology', 'Physical Computing'],
  categories: ['creative'],
  infoItems: [
    { label: 'Year', value: '2024' },
    { label: 'Role', value: 'Creator' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'uv-light',
    title: 'UV Light Experience',
    image: '/Assets/images/uv-light.jpg',
  },
  bottomNavSections: [
    { id: 'cs-sundial', label: 'Sundial' },
    { id: 'cs-mechanical', label: 'Mechanical' },
    { id: 'cs-digital', label: 'Digital' },
  ],
  sections: [
    // ── Hero Video ──
    {
      type: 'callout',
      text: 'https://player.vimeo.com/video/1010457989?h=&badge=0&autopause=0&player_id=0&app_id=58479',
    },

    // ── Overview ──
    {
      type: 'overview',
      columns: [
        {
          heading: 'Exploring Time',
          body: 'Exploring the essence of time has been a journey from ancient methods to contemporary technology, each project offering a unique perspective on how time can be represented and understood.\n\nThis series of three explorations traces the evolution of timekeeping from its most elemental form \u2014 shadows cast by the sun \u2014 through the intricate mechanical movements of watchmaking, and finally into the realm of digital and software-driven clocks. Each phase required learning a fundamentally different set of skills and materials, from outdoor observation and basic construction to precision metalwork and code.\n\nThe underlying question driving all three projects was not how to tell time more accurately, but how the medium of timekeeping shapes our relationship with time itself. A sundial demands patience and presence; a mechanical watch rewards attention to craft and rhythm; a digital clock abstracts time into pure information. By building all three, I wanted to experience those different relationships firsthand.',
        },
      ],
    },

    // ── 01 \u2014 Sundial ──
    {
      type: 'text',
      id: 'cs-sundial',
      label: '01 \u2014 Sundial',
      title: 'Sundial',
      body: [
        'Creating a sundial with simple materials to experience firsthand how shadows measure time, a technique as old as civilization itself. The project began with research into gnomon geometry \u2014 understanding how the angle of the shadow-casting element must match the latitude of the location to produce accurate hour lines throughout the day.',
        'I constructed the sundial from wood and brass fittings, calibrating the gnomon angle for New York City\u2019s latitude. The hour lines were hand-etched based on calculations that account for the equation of time, the slight variation between solar time and clock time caused by Earth\u2019s elliptical orbit. Testing the dial outdoors over several weeks revealed how remarkably precise this ancient method can be \u2014 accurate to within a few minutes on clear days.',
        'The most striking takeaway was how a sundial forces you to slow down. You cannot glance at it for a quick reading the way you check a phone. You have to stand, observe the shadow, and interpret its position. Time measured this way feels embodied and spatial rather than numerical, a fundamentally different experience from every other clock I have encountered.',
      ],
    },

    // ── Sundial images ──
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/O2050785415862777034195880706582/1.jpg',
      alt: 'Sundial \u2014 Making of Time',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/D2050785416028797730859266671126/2.jpg',
      alt: 'Sundial detail \u2014 Making of Time',
    },

    // ── 02 \u2014 Mechanical ──
    {
      type: 'text',
      id: 'cs-mechanical',
      label: '02 \u2014 Mechanical',
      title: 'Mechanical',
      body: [
        'Dissecting the inner workings of mechanical watches provided insight into the harmony of gears, springs, and escapements, each component crucial in marking the passage of seconds. I began by taking apart several inexpensive mechanical movements under magnification, cataloging each part and mapping the energy flow from mainspring through the gear train to the balance wheel.',
        'The escapement mechanism was the most fascinating element \u2014 a tiny lever that rocks back and forth, releasing the gear train one tick at a time. Understanding this mechanism required learning about oscillation frequencies, jewel bearings that reduce friction, and the delicate hairspring that determines how fast the balance wheel swings. Each component is machined to tolerances measured in hundredths of a millimeter, and the slightest misalignment stops the entire movement.',
        'Reassembling a working movement from disassembled parts was the most challenging and rewarding part of this phase. It demanded steady hands, extreme patience, and a respect for the centuries of accumulated craft knowledge embedded in watchmaking. The ticking of a mechanical watch, once you understand what produces it, becomes a profoundly satisfying sound \u2014 each tick is a controlled release of stored energy, a tiny heartbeat of engineering precision.',
      ],
    },

    // ── Mechanical images ──
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/A2050785416010350986785557119510/3.jpg',
      alt: 'Mechanical watch \u2014 Making of Time',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/I2050787120876885023096027021846/4.jpg',
      alt: 'Mechanical detail \u2014 Making of Time',
    },

    // ── 03 \u2014 Digital ──
    {
      type: 'text',
      id: 'cs-digital',
      label: '03 \u2014 Digital',
      title: 'Digital',
      body: [
        'Building a classic timepiece with a minimalist white dial and leather strap, then exploring modern software-based timekeepers. This final phase bridged the physical and digital worlds \u2014 starting with the assembly of a quartz-driven analog watch with a clean, modernist face and moving into purely code-based representations of time.',
        'The software explorations included a p5.js sketch that visualized time as an evolving color field, where hue mapped to hours, saturation to minutes, and brightness to seconds. A second experiment used real-time data \u2014 weather, sunrise and sunset times, and moon phase \u2014 to generate a clock face that changed its visual character throughout the day. The goal was to make a clock that communicated the quality of a moment, not just its position on a 24-hour scale.',
        'Comparing all three approaches revealed a clear pattern: the more abstract the timekeeping medium, the more freedom the designer has to redefine what time means. A sundial is bound to the sun. A mechanical watch is bound to physics. A digital clock is bound only by the programmer\u2019s imagination. That freedom is powerful, but it also carries the risk of losing the grounding that physical constraints provide \u2014 the reason a ticking watch feels more real than a pixel changing color.',
      ],
    },

    // ── Digital images ──
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/M2050785415973457498638138016278/5.jpg',
      alt: 'Digital timepiece \u2014 Making of Time',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/J2050785415955010754564428464662/6.jpg',
      alt: 'Digital detail \u2014 Making of Time',
    },

    // ── Thank You ──
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
