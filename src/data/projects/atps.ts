import type { ProjectMeta } from '@/types/project'

export const atps: ProjectMeta = {
  slug: 'atps',
  title: 'ArtTown Podcast Series',
  subtitle:
    'Unravelling hidden talents and inspiring young minds through conversations with art and design professionals worldwide',
  description:
    'ArtTown Podcast Series (ATPS) \u2014 a weekly podcast hosted by Parth Pawar, featuring 40+ conversations with art and design professionals worldwide. 50k+ views and 18,000 hours of playtime.',
  ogImage: 'https://www.designwhich.works/Assets/images/atps.png',
  heroImage: '/Assets/images/atps.png',
  projectColor: '#319795',
  tags: ['Podcast', 'Content', 'Art & Design'],
  infoItems: [
    { label: 'Year', value: '2020 \u2013 Present' },
    { label: 'Role', value: 'Podcast Host' },
    { label: 'Platforms', value: 'Spotify, Apple Podcast, Google Podcast' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'mentra',
    title: 'Mentra',
    image: '/Assets/images/mentra.png',
  },
  categories: ['brand'],
  sections: [
    // ── Hero image ───────────────────────────────────────────────
    {
      type: 'image',
      src: '/Assets/Projects/ATPS/Desktop/1.jpg',
      alt: 'ArtTown Podcast Series hero \u2014 microphone with a grid of episode artwork and 50k+ listeners',
    },

    // ── Distribution ─────────────────────────────────────────────
    {
      type: 'text',
      label: 'Distribution',
      title: 'Listen from the best podcast platform',
      body: [
        'Google Podcast, Podcast Addict, Spotify, Apple Podcast, Pocket Casts',
      ],
    },

    // ── Summary / Interest / Achievement ─────────────────────────
    {
      type: 'info-grid',
      items: [
        {
          key: 'Summary',
          value:
            "As an enthusiast of the performing arts and design, I was honored to host a podcast that would provide insights into this creative world. ATPS\u2019s vision is to unravel the artist\u2019s hidden talents, and stories that can truly inspire people and promote intellectual discussions on art in order to widen people\u2019s perspectives. We had a weekly release that promised a fun, entertaining, and worth-a-while listening experience.",
        },
        {
          key: 'Interest',
          value:
            'I started the Podcast series with the vision of helping young people understand and learn about multiple career opportunities in the Art and Design world by interviewing Industry experts all over the world.',
        },
        {
          key: 'Achievement',
          value:
            'We successfully hosted 40+ talks with 50k+ views & 18000 hours of playtime and inspired many young minds to pursue Art & Design field.',
        },
      ],
    },

    // ── Impact Stats ─────────────────────────────────────────────
    {
      type: 'stats',
      label: 'Impact',
      title: 'Impact',
      stats: [
        { label: 'Views', value: '50k+' },
        { label: 'Guests', value: '40+' },
        { label: 'Hours', value: '18000' },
      ],
    },

    // ── Plan of Action ───────────────────────────────────────────
    {
      type: 'steps',
      title: 'Plan of action?',
      steps: [
        { num: 1, title: 'Problem', description: 'Educating Young Minds' },
        { num: 2, title: 'Discover', description: 'Art & Design Domain' },
        {
          num: 3,
          title: 'Define',
          description: 'Contact experts from domain',
        },
        {
          num: 4,
          title: 'Develop',
          description: 'Connection & Preparation before shoot',
        },
        {
          num: 5,
          title: 'Deliver',
          description: 'Podcast shoot & Post Editing',
        },
        { num: 6, title: 'Solution', description: 'Informative Podcast' },
      ],
    },

    // ── Guest Connections ────────────────────────────────────────
    {
      type: 'text',
      title: 'Guest Connections',
      body: [
        'Over 40 episodes, we connected with a diverse range of guests including product designers, architects, art directors, brand developers, glass sculptors, tattoo artists, art conservators, and more from around the world.',
      ],
    },

    // ── How It Works ─────────────────────────────────────────────
    {
      type: 'steps',
      label: 'Listener Experience',
      title: 'How It Works',
      steps: [
        {
          num: 1,
          title: 'Reveal',
          description: 'Discover a new guest and episode topic',
        },
        {
          num: 2,
          title: 'Play',
          description: 'Stream the episode on your preferred platform',
        },
        {
          num: 3,
          title: 'Enjoy',
          description: 'Gain insights from industry experts',
        },
        {
          num: 4,
          title: 'Repeat',
          description: 'Come back every Friday for a new episode',
        },
      ],
    },

    // ── Podcast Every Friday callout ─────────────────────────────
    {
      type: 'callout',
      text: 'Podcast Every Friday \u2014 What you gain: Art | When does it air: Friday | Any charges: Free',
    },

    // ── Full episode grid ────────────────────────────────────────
    {
      type: 'image',
      src: '/Assets/Projects/ATPS/Desktop/5.jpg',
      alt: 'Full episode grid of the ArtTown Podcast Series with guest thumbnails and descriptions',
    },

    // ── Notable Guests ───────────────────────────────────────────
    {
      type: 'numbered-list',
      label: 'Episodes',
      title: 'Notable Guests',
      items: [
        'Srishti Bajaj \u2014 Product Designer',
        'Narendra Rahurikar \u2014 Art Director, Managing Director at Crime Art',
        'Romain Girard \u2014 Senior Head of Innovation at Puma Global',
        'Indranit & Nita Kembhavi \u2014 Architects',
        'Peter Bremers \u2014 Glass Sculptor',
        'Allan Gois \u2014 Tattoo Artist',
        'Priya Kapoor \u2014 Art Conservator',
        'Phillip J. Clayton \u2014 Brand Development and Marketing',
        'Latoya Flowers \u2014 Media Producer, Projection Mapping Artist',
        'Paul Sandip \u2014 Innovator of 700+ Products',
        'Rohit Lalwani \u2014 Startups & Design',
        'Gopi Kukade \u2014 Advertising Veteran',
        'Shekhar Badve \u2014 Creative Leader, Head of Product Evolution & Branding',
        'Bijay Biswal \u2014 Indian Artist',
        'Aarzoo Khurana \u2014 Featured Guest',
      ],
    },

    // ── Reflections ──────────────────────────────────────────────
    {
      type: 'text',
      label: 'Reflections',
      title: 'What Hosting 40+ Conversations Taught Me',
      body: [
        "Running ATPS for three years taught me that the best interviews happen when you stop performing expertise and start genuinely listening. Early episodes were over-prepared\u2014I would script every question and stick rigidly to my list. The conversations felt stilted. The turning point was an episode with a glass sculptor who went on a tangent about how material failure teaches you more than success. I followed the tangent instead of redirecting, and it became one of our most-listened episodes.",
        "The design skill I developed was editorial thinking\u2014knowing what to cut, what to keep, and how to structure a 60-minute conversation into a compelling 30-minute episode. This is the same skill I now use in product design: understanding that what you leave out defines the experience as much as what you include.",
        'ATPS also gave me a network I could not have built any other way. Several professional collaborations\u2014including introductions that led to real projects\u2014started as podcast conversations.',
      ],
    },

    // ── Thank You ────────────────────────────────────────────────
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
