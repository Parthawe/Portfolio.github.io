import type { ProjectMeta } from '@/types/project'

export const shuffle: ProjectMeta = {
  slug: 'shuffle',
  title: 'Shuffle',
  subtitle: 'Interactive installation proposing a strategy simulation of student life at ITP',
  description:
    'Shuffle \u2014 an interactive installation proposing a strategy simulation of student life at ITP, built with Arduino, addressable LEDs, and custom PCB.',
  ogImage: 'https://www.designwhich.works/Assets/images/shuffle.jpg',
  heroImage: '/Assets/images/shuffle.jpg',
  projectColor: '#4A6FA5',
  tags: ['Creative Technology', 'Physical Computing', 'Installation'],
  categories: ['creative'],
  infoItems: [
    { label: 'Year', value: '2024' },
    { label: 'Role', value: 'Creator' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'enigma',
    title: 'Enigma',
    image: '/Assets/images/enigma.jpg',
  },
  bottomNavSections: [
    { id: 'cs-concept', label: 'Concept' },
    { id: 'cs-process', label: 'Process' },
    { id: 'cs-exhibition', label: 'Exhibition' },
  ],
  sections: [
    // ── Hero placeholder ──
    {
      type: 'image',
      src: '/Assets/images/shuffle.jpg',
      alt: 'Shuffle \u2014 interactive tabletop installation with LED matrix and physical tokens',
    },

    // ── Video embed (represented as callout with iframe URL) ──
    {
      type: 'callout',
      text: 'https://player.vimeo.com/video/897796834?h=853abf08b1&badge=0&autopause=0&player_id=0&app_id=58479',
    },

    // ── Overview ──
    {
      type: 'overview',
      columns: [
        {
          heading: 'A strategy simulation tool',
          body: 'Shuffle is an interactive installation which proposes a contemporary interpretation of students\u2019 lives: a strategy simulation tool inspired by G80, aimed at an equitable distribution of your time as a student on an ITP scale.',
        },
      ],
    },

    // ── 01 \u2014 Concept ──
    {
      type: 'text',
      id: 'cs-concept',
      label: '01 \u2014 Concept',
      title: 'Physical Redistribution of Time',
      body: [
        'The installation invites participants to physically redistribute their time across different aspects of student life at ITP. Each token represents a unit of time, and the LED matrix responds in real-time to placement decisions. The grid is divided into categories that mirror the daily pressures of graduate life\u2014coursework, personal projects, social connection, rest, and professional development\u2014forcing participants to confront trade-offs that are normally invisible.',
        'Inspired by resource-allocation mechanics found in classic strategy games like G80, the concept reframes time management as a tangible, spatial problem rather than an abstract mental exercise. By making these decisions physical\u2014picking up a weighted token, placing it deliberately on a surface\u2014the installation slows down the act of choosing and gives it a sense of consequence that a digital calendar never could.',
        'The piece asks a deceptively simple question: if you had a finite number of tokens representing your semester, where would you place them? The answers participants gave were often surprising, revealing gaps between how they believed they spent their time and how they actually wanted to spend it.',
      ],
    },

    // ── Images 1\u20133 ──
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2160/i/L1909464353160286896185627968022/1.jpg',
      alt: 'Shuffle installation \u2014 overview',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2160/i/Z1909464353307860848775304380950/2.jpg',
      alt: 'Shuffle installation \u2014 detail',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2160/i/B1909464353289414104701594829334/3.jpg',
      alt: 'Shuffle installation \u2014 tokens',
    },

    // ── 02 \u2014 Process ──
    {
      type: 'text',
      id: 'cs-process',
      label: '02 \u2014 Process',
      title: 'Hardware & Fabrication',
      body: [
        'Built with Arduino, addressable LEDs, and a custom PCB, the physical interface uses an array of weight sensors embedded beneath a laser-cut acrylic grid surface to detect token placement. Each cell in the grid sits above its own load cell, and the readings are multiplexed through shift registers to keep wiring manageable. When a token is placed, the corresponding addressable LED beneath the translucent surface illuminates, creating an immediate visual feedback loop.',
        'Fabrication involved several iterative prototyping rounds. The first version used a breadboard circuit that was too fragile for public interaction, so a custom PCB was designed in KiCad and manufactured to ensure reliability during the exhibition. The enclosure was built from birch plywood, CNC-milled to house the electronics cleanly while remaining easy to disassemble for maintenance. Tokens were 3D-printed with embedded magnets to give them a satisfying heft and prevent accidental displacement.',
        'On the software side, the Arduino firmware communicates sensor states over serial to a Processing sketch that manages the LED color mapping and keeps a running tally of each category. The color palette was carefully chosen so that each life-category had a distinct, readable hue even under the warm ambient lighting of the ITP floor.',
      ],
    },

    // ── Info grid (process specs) ──
    {
      type: 'info-grid',
      items: [
        { key: 'Controller', value: 'Arduino' },
        { key: 'Display', value: 'Addressable LEDs' },
        { key: 'Electronics', value: 'Custom PCB' },
        { key: 'Input', value: 'Weight Sensors' },
      ],
    },

    // ── Images 4\u20135 ──
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2160/i/W1909464353270967360627885277718/4.jpg',
      alt: 'Shuffle \u2014 process and electronics',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2160/i/M1909464353252520616554175726102/5.jpg',
      alt: 'Shuffle \u2014 PCB and fabrication',
    },

    // ── 03 \u2014 Exhibition ──
    {
      type: 'text',
      id: 'cs-exhibition',
      label: '03 \u2014 Exhibition',
      title: 'ITP Winter Show 2023',
      body: [
        'Shuffle was exhibited at the ITP Winter Show 2023, a two-day public event that draws thousands of visitors to NYU\u2019s Tisch School of the Arts. The installation was positioned near the entrance of the fourth-floor exhibition space, where foot traffic was highest, and attracted a steady stream of participants throughout both days.',
        'Visitors naturally gravitated toward the glowing grid, often pausing to watch others before trying it themselves. The physical tokens lowered the barrier to engagement\u2014people instinctively wanted to pick them up and place them. What began as a quick interaction frequently turned into extended conversations about priorities, burnout, and the hidden costs of saying yes to everything in a demanding graduate program.',
        'One of the most rewarding outcomes was observing how groups of friends would compare their token distributions side by side, laughing at differences and debating trade-offs. Faculty members also engaged deeply, noting that the installation surfaced tensions around workload that are difficult to articulate in conventional feedback channels. The piece demonstrated that playful, tactile interfaces can open up reflective dialogue in ways that surveys and forms simply cannot.',
      ],
    },

    // ── Images 6\u20137 ──
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2160/i/R1909464353234073872480466174486/6.jpg',
      alt: 'Shuffle \u2014 exhibition at ITP Winter Show',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2160/i/L1909464353215627128406756622870/7.jpg',
      alt: 'Shuffle \u2014 visitors interacting with the installation',
    },

    // ── Thank You ──
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
