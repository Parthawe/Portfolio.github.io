import type { ProjectMeta } from '@/types/project'

export const typeface: ProjectMeta = {
  slug: 'typeface',
  title: "Butler\u2019s Slice",
  subtitle: 'A free display typeface created by slicing alphabets',
  description:
    "Butler\u2019s Slice is a free variable display typeface created as a customised Butler font by slicing alphabets. Designed for editorial applications with three weights: Ultralight, Regular, and Bold.",
  ogImage: 'https://www.designwhich.works/Assets/images/typeface.jpg',
  heroImage: '/Assets/images/typeface.jpg',
  projectColor: '#744210',
  tags: ['Typography', 'Type Design', 'Art'],
  infoItems: [
    { label: 'Year', value: '2022' },
    { label: 'Role', value: 'Designer of Typeface' },
    { label: 'Duration', value: '1 Month' },
    { label: 'Tools', value: 'Glyphs App, FontForge, Adobe Illustrator' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'atps',
    title: 'ArtTown Podcast',
    image: '/Assets/images/atps.png',
  },
  categories: ['brand'],
  sections: [
    // ── Hero cover ───────────────────────────────────────────────
    {
      type: 'image',
      src: '/Assets/Projects/Typeface/Desktop/1.jpg',
      alt: "Butler's Slice typeface cover with project details on purple gradient",
    },

    // ── The Concept ──────────────────────────────────────────────
    {
      type: 'text',
      title: 'the concept',
      body: [
        "Butler\u2019s Slice \u2014 is a free display font created as a customised Butler font by Slicing alphabets.",
      ],
    },

    // ── The Inspiration ──────────────────────────────────────────
    {
      type: 'text',
      title: 'the inspiration',
      body: [
        "Butler\u2019s Slice was inspired by elements which have been fine cut.",
      ],
    },

    // ── The Character Set ────────────────────────────────────────
    {
      type: 'text',
      title: 'the character set',
      body: [
        "Butler\u2019s Slice consists of 26 letters of Uppercase and 26 letters of a Lowercase, 10 numbers. with 3 weights Ultralight, Regular and Bold.",
      ],
    },

    // ── Types of Slices ──────────────────────────────────────────
    {
      type: 'image',
      src: '/Assets/Projects/Typeface/Desktop/3.jpg',
      alt: 'Character specimens \u2014 Ag in three weights, types of slices: Angle, Vertical, and Linear',
    },

    // ── The Glyphs ───────────────────────────────────────────────
    {
      type: 'text',
      title: 'the glyphs looks',
      body: [
        'Aa Bb Cc Dd Ee Ff Gg Hh\nIi Jj Kk Ll Mm Nn Oo Pp\nQq Rr Ss Tt Uu Vv Ww Xx\nYy Zz',
      ],
    },

    // ── The Weights ──────────────────────────────────────────────
    {
      type: 'image',
      src: '/Assets/Projects/Typeface/Desktop/5.jpg',
      alt: 'The weights \u2014 Bold, Regular, Ultralight with character grid on purple background',
    },

    // ── The Usage ────────────────────────────────────────────────
    {
      type: 'image',
      src: '/Assets/Projects/Typeface/Desktop/6.jpg',
      alt: "Packaging mockups showing Butler's Slice on various products",
    },

    // ── How Butler's Slice Works ─────────────────────────────────
    {
      type: 'text',
      title: "how Butler\u2019s Slice works",
      body: [
        'Have a look on how Butler works in different sizes and purposes',
      ],
    },

    // ── In Headlines ─────────────────────────────────────────────
    {
      type: 'info-grid',
      items: [
        {
          key: 'in headlines',
          value:
            'The typeface is display, so it works great in big and extremely big sizes',
        },
      ],
    },

    // ── Typography quote ─────────────────────────────────────────
    {
      type: 'pullquote',
      quote:
        'Typography is the craft of endowing human language with a durable visual form.',
    },

    // ── In Short Texts ───────────────────────────────────────────
    {
      type: 'info-grid',
      items: [
        {
          key: 'in short texts',
          value:
            "Butler\u2019s Slice is suitable for short sentences and fazes",
        },
      ],
    },

    // ── Bringhurst Quote ─────────────────────────────────────────
    {
      type: 'pullquote',
      quote:
        '\u201CIn a badly designed book, the letters mill and stand like starving horses in a field. In a book designed by rote, they sit like stale bread and mutton on the page. In a well-made book, where designer, compositor and printer have all done their jobs, no matter how many thousands of lines and pages, the letters are alive. They dance in their seats. Sometimes they rise and dance in the margins and aisles.\u201D',
      cite: 'Robert Bringhurst, The Elements of Typographic Style',
    },

    // ── In Long Texts ────────────────────────────────────────────
    {
      type: 'info-grid',
      items: [
        {
          key: 'in long texts',
          value:
            "You can use it however you like. I\u2019m not here to tell you what to do.",
        },
      ],
    },

    // ── The Numbers ──────────────────────────────────────────────
    {
      type: 'text',
      title: 'the numbers',
      body: ['0 1 2 3 4\n5 6 7 8 9'],
    },

    // ── Reflections ──────────────────────────────────────────────
    {
      type: 'text',
      label: 'Reflections',
      title: 'What Designing a Typeface Taught Me',
      body: [
        "Designing Butler\u2019s Slice was an exercise in constraint. Every glyph needed to maintain legibility while incorporating the diagonal slice motif\u2014and the two goals constantly fought each other. Some letters (A, K, X) accepted slices naturally because their geometry already contained angles. Others (O, S, C) required creative reinterpretation to make the slice feel intentional rather than destructive.",
        "The biggest lesson was that type design is systems thinking at the smallest scale. A single glyph means nothing in isolation\u2014it only works when every character in the set shares the same visual logic. Adjusting the slice angle on one letter meant revisiting every other letter to maintain consistency. This is the same challenge I encounter in product design: every component must cohere with the whole system.",
      ],
    },

    // ── Credits ──────────────────────────────────────────────────
    {
      type: 'credits',
      credits: [
        { role: 'Designer of Typeface', name: 'Parth Pawar' },
        { role: 'Project Type', name: 'Self Initiative' },
        { role: 'Tools', name: 'Glyphs App, FontForge, Adobe Illustrator' },
      ],
    },

    // ── Thank You ────────────────────────────────────────────────
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
