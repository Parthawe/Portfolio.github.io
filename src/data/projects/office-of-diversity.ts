import type { ProjectMeta } from '@/types/project'

export const officeOfDiversity: ProjectMeta = {
  slug: 'office-of-diversity',
  title: 'Office of Diversity Report & Data Visualization',
  subtitle: 'Interactive IDBEA report for NYU Tisch School of the Arts',
  description:
    'Office of Diversity Report & Data Visualization \u2014 an interactive IDBEA report for NYU Tisch School of the Arts, translating complex data into engaging, accessible visuals that foster community engagement.',
  ogImage: 'https://www.designwhich.works/Assets/images/office-of-diversity.png',
  heroImage: '/Assets/Projects/Office of Diversity/1.jpg',
  projectColor: '#6B2D8B',
  tags: ['UI/UX', 'Data Visualization', 'Research'],
  infoItems: [
    { label: 'Client', value: 'Office Of Diversity TSOA' },
    { label: 'Scope', value: 'User Research, UI/UX, Prototyping' },
    { label: 'Role', value: 'Website Publishing Designer' },
    { label: 'Duration', value: '3 Months' },
    { label: 'Year', value: '2024' },
  ],
  backLink: { label: '\u2190 Back to Work', href: '/work' },
  nextProject: {
    slug: 'clawed-chat',
    title: 'Clawed',
    image: '/Assets/images/clawed.png',
  },
  bottomNavSections: [
    { id: 'cs-goals', label: 'Goals' },
    { id: 'cs-process', label: 'Process' },
    { id: 'cs-impact', label: 'Impact' },
    { id: 'cs-reflections', label: 'Reflections' },
    { id: 'cs-report', label: 'The Report' },
  ],
  categories: ['good'],
  sections: [
    /* ── SLIDE 2 — SUMMARY / CHALLENGES / ROLE / TOOLS ── */
    {
      type: 'callout',
      text: 'Translating complex data into engaging, accessible visuals that foster deeper community engagement.',
    },
    {
      type: 'info-grid',
      items: [
        {
          key: 'Summary',
          value:
            'This project aimed to create an engaging, accessible, and interactive visualization for the 2024 IDBEA report, showcasing the Tisch School of the Arts\u2019 progress in fostering inclusion, diversity, belonging, equity, and accessibility (IDBEA). Collaborating with Christina Monea from the Office of Diversity, my goal was to translate complex data into user-friendly visuals that reflect Tisch\u2019s values and foster deeper community engagement.',
        },
        {
          key: 'Challenges',
          value:
            '\u2022 Data Precision \u2014 Visualizing complex data accurately while maintaining clarity and readability.\n\u2022 Interactive Engagement \u2014 Developing dynamic components to encourage users to explore milestones and data points.',
        },
        {
          key: 'My Role',
          value:
            '\u2022 Data Visualization \u2014 Designing interactive timelines, charts, and graphs.\n\u2022 User Experience \u2014 Ensuring a seamless and engaging user experience with interactive and accessible elements.',
        },
        {
          key: 'Tools & Techniques',
          value:
            'Figma, User Research, Identity and Website Design, Prototyping, Wireframes, High-Fidelity, Experience Management, Design System',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Office of Diversity/2.jpg',
      alt: 'Summary, challenges, role, and tools overview for the IDBEA report project',
    },

    /* ── SLIDE 3 — IDBEA CONTEXT + PROJECT GOALS + PROCESS ── */
    {
      type: 'text',
      label: 'The IDBEA Report',
      title: 'The IDBEA Report',
      body: [
        'Tisch\u2019s Office of Diversity champions Inclusion, Diversity, Belonging, Equity, and Accessibility (IDBEA) across the school. The 2024 report documents a decade of progress \u2014 from early listening sessions and foundational learning to the establishment of a dedicated office and committee structures that ensure lasting institutional change.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Office of Diversity/3.jpg',
      alt: 'IDBEA report context \u2014 Tisch Office of Diversity values and process overview',
    },
    {
      type: 'features',
      id: 'cs-goals',
      label: 'Project Goals',
      title: 'What we set out to achieve',
      cards: [
        {
          title: 'Data Precision',
          description:
            'Visualize complex data accurately while keeping it approachable and easy to understand.',
        },
        {
          title: 'Interactivity',
          description:
            'Build dynamic components that encourage exploration and engagement with milestones.',
        },
        {
          title: 'Accessibility',
          description:
            'Ensure the report meets WCAG standards and is usable by everyone in the community.',
        },
        {
          title: 'Collaborative Review',
          description:
            'Integrate continuous feedback from faculty, students, and staff throughout the process.',
        },
      ],
    },
    {
      type: 'steps',
      id: 'cs-process',
      label: 'Design Process',
      title: 'From scope to delivery',
      steps: [
        { num: 1, title: 'Understanding Scope', description: 'Key metrics, themes & milestones' },
        { num: 2, title: 'Design Concept', description: 'Interactive timeline & visual direction' },
        { num: 3, title: 'Data Visualization', description: 'D3.js, Tableau, charts & graphs' },
        {
          num: 4,
          title: 'User Engagement',
          description: 'Clickable data points & real-time views',
        },
        { num: 5, title: 'Collaboration', description: 'Feedback integration with stakeholders' },
        { num: 6, title: 'Accessibility', description: 'WCAG 2.1 Level AA compliance' },
      ],
    },

    /* ── SLIDE 4 — PROCESS STEPS 1-3 ── */
    {
      type: 'features',
      label: '01 \u2014 Process',
      title: 'Understanding The Scope',
      body: [
        'The first step involved deep-diving into the report\u2019s key metrics, themes, and milestones. Three core focus areas emerged:',
      ],
      cards: [
        {
          title: 'Learning & Engagement',
          description:
            'Educational programs and community workshops driving awareness across Tisch.',
        },
        {
          title: 'Restorative Practices',
          description:
            'Addressing IDBEA concerns and global events through structured case resolution.',
        },
        {
          title: 'Collaborative Efforts',
          description:
            'School-wide programming that brings together faculty, staff, and students.',
        },
      ],
    },
    {
      type: 'text',
      label: '02 \u2014 Process',
      title: 'Design Conceptualization',
      body: [
        'An interactive timeline was designed to map IDBEA milestones spanning 2014\u20132024, alongside dynamic charts and graphs. Early ideation involved sticky notes, whiteboard sessions, and rapid sketching to explore visual directions.',
      ],
    },
    {
      type: 'steps',
      label: '03 \u2014 Process',
      title: 'Data Visualization',
      steps: [
        {
          num: 1,
          title: 'Tool Selection',
          description:
            'D3.js and Tableau were chosen for their flexibility in rendering interactive, data-driven visuals.',
        },
        {
          num: 2,
          title: 'Color-Coded Bar Charts',
          description:
            'Engagement metrics visualized through a consistent color system tied to each IDBEA pillar.',
        },
        {
          num: 3,
          title: 'Dynamic Pie Charts',
          description:
            'Breakdowns of participation, demographics, and resource allocation rendered as interactive pie charts.',
        },
        {
          num: 4,
          title: 'Interactive Tooltips',
          description:
            'Hover and click-to-reveal tooltips providing context and detail on every data point.',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Office of Diversity/4.jpg',
      alt: 'Process steps \u2014 understanding scope, design conceptualization, and data visualization approach',
    },

    /* ── SLIDE 5 — PROCESS STEPS 4-6 ── */
    {
      type: 'features',
      label: '04 \u2014 Process',
      title: 'Interactivity & User Engagement',
      cards: [
        {
          title: 'Clickable Data Points',
          description:
            'Each data point expands to reveal detailed information, case studies, and related milestones.',
        },
        {
          title: 'Real-Time Progress',
          description:
            'Users can view Tisch\u2019s IDBEA progress in real-time through animated transitions and live data feeds.',
        },
      ],
    },
    {
      type: 'text',
      label: '05 \u2014 Process',
      title: 'Collaboration & Feedback Integration',
      body: [
        'Over a 3-month process working with Christina Monea, the project involved multiple feedback sessions with faculty, students, and staff. This iterative cycle ensured the final product accurately reflected the community\u2019s voice and the office\u2019s mission.',
      ],
    },
    {
      type: 'features',
      label: '06 \u2014 Process',
      title: 'Accessibility Compliance',
      cards: [
        {
          title: 'WCAG 2.1 Level AA',
          description: 'Full compliance with established web accessibility guidelines.',
        },
        {
          title: 'Screen Reader Support',
          description:
            'Text alternatives for all visual elements, ensuring screen reader compatibility.',
        },
        {
          title: 'High-Contrast Colors',
          description:
            'Color schemes designed for maximum readability across all visual conditions.',
        },
        {
          title: 'Keyboard Navigation',
          description: 'Every interactive element fully navigable without a mouse.',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Office of Diversity/5.jpg',
      alt: 'Process steps \u2014 interactivity, collaboration sessions, and accessibility compliance',
    },

    /* ── SLIDE 6 — OUTCOME + KEY LEARNINGS ── */
    {
      type: 'stats',
      id: 'cs-impact',
      label: 'Impact',
      title: 'Outcome',
      stats: [
        { label: 'User Interaction', value: '+74%' },
        { label: 'Accessibility', value: 'WCAG 2.1 AA' },
        { label: 'Collaborative Process', value: '3 Months' },
      ],
    },
    {
      type: 'numbered-list',
      id: 'cs-reflections',
      label: 'Reflections',
      title: 'What this project taught me',
      items: [
        'Institutional trust is built in the details. Every color choice, every word, every layout decision carried the weight of NYU Tisch\u2019s commitment to its community. Choosing accessible type sizes over flashy ones, letting the data speak clearly rather than over-designing it, and ensuring every stakeholder saw their voice reflected in the final product \u2014 these small decisions compound into credibility.',
        'Designing about inclusion demands honesty, not performance. It is easy to fall into performative visuals \u2014 bold statements and stock imagery that signal values without embodying them. Working closely with Christina and the Office of Diversity team kept the work honest. The design had to serve the people and the progress it documented, not just look good on a screen.',
        'Data visualization is an act of translation, not decoration. Complex institutional data needs a designer who can hold two things at once: fidelity to the numbers and empathy for the reader. The charts and timelines in this report were not about making data \u201cpretty\u201d \u2014 they were about making a decade of progress legible to the community it serves.',
        'Collaborative feedback loops produce better outcomes than isolated design sprints. The 3-month process of iterating with faculty, students, and staff surfaced blind spots I would never have caught alone. The best design decisions in this project came from conversations, not from my Figma artboard.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Office of Diversity/6.jpg',
      alt: 'Outcome \u2014 74% increase in user interaction, accessibility success, and key learnings',
    },

    /* ── SLIDE 7 — THE REPORT (IDBEA 2024 Report + Timeline + Team) ── */
    {
      type: 'text',
      id: 'cs-report',
      label: 'The Report',
      title: 'IDBEA 2024 Report',
      body: [
        'The final report traces a decade of IDBEA milestones \u2014 from the initial commitment in 2014 through listening sessions, foundational learning, the establishment of the Cabinet, the hiring of an Assistant Dean, and the expansion of the Office of Diversity \u2014 culminating in the formation of the IDBEA Committee in 2023.',
      ],
    },
    {
      type: 'timeline',
      label: 'Timeline',
      title: 'A Decade of Progress',
      items: [
        { date: '2014', heading: '', description: 'Commitment to IDBEA' },
        { date: '2015', heading: '', description: 'Listening sessions begin' },
        { date: '2017', heading: '', description: 'Foundational learning' },
        { date: '2018', heading: '', description: 'Cabinet established' },
        { date: '2019', heading: '', description: 'Assistant Dean hired' },
        { date: '2020', heading: '', description: 'Reaffirm commitment' },
        { date: '2022', heading: '', description: 'Office expands' },
        { date: '2023', heading: '', description: 'Committee established' },
      ],
    },
    {
      type: 'features',
      label: 'The Team',
      title: 'Meet the Office of Diversity',
      cards: [
        { title: 'Christina Salgado', description: 'Assistant Dean' },
        { title: 'Monae Freeman', description: 'Diversity Program Administrator' },
        { title: 'Kevin Hunter', description: 'Administrative Aide' },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Office of Diversity/7.jpg',
      alt: 'IDBEA 2024 Report \u2014 timeline, team, and approach overview',
    },

    /* ── SLIDE 8 — ADVISEMENT + FOCUS AREAS + DATA VIZ ── */
    {
      type: 'features',
      label: 'Structure',
      title: 'Advisement & Feedback Groups',
      cards: [
        { title: 'Cabinet', description: '' },
        { title: 'Deans and Chairs', description: '' },
        { title: 'IDBEA Committee', description: '' },
        { title: 'Coalition', description: '' },
      ],
    },
    {
      type: 'features',
      label: 'Focus Areas',
      title: 'Four Pillars of IDBEA Work',
      cards: [
        {
          title: 'Learning & Engagement',
          description:
            'Workshops, dialogues, and educational programming across the Tisch community.',
        },
        {
          title: 'Resource Development',
          description:
            'Building tools, guides, and materials to support IDBEA work at every level.',
        },
        {
          title: 'Restorative Practices',
          description:
            'Addressing concerns and conflicts through structured, empathetic case resolution.',
        },
        {
          title: 'School-wide Collaborative Programming',
          description:
            'Cross-departmental initiatives that unite the Tisch community around shared values.',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Office of Diversity/8.jpg',
      alt: 'Report \u2014 advisement groups, focus areas, and data visualization charts showing engagement metrics',
    },

    /* ── SLIDE 9 — DATA HIGHLIGHTS ── */
    {
      type: 'stats',
      label: 'Data Highlights',
      title: 'Report Data at a Glance',
      body: [
        'The report showcases key program outcomes across restorative practices, student funding, and enrollment. These figures were visualized through color-coded charts and interactive data points in the final design.',
      ],
      stats: [
        { label: 'Restorative Cases (IDBEA)', value: '33' },
        { label: 'Restorative Cases (Global Events)', value: '14' },
        { label: 'HEAR US Funding', value: '$62K' },
        { label: 'Student Awardees', value: '11' },
        { label: 'Future Artists Enrolled', value: '178' },
        { label: 'Departments Represented', value: '7' },
      ],
    },
    {
      type: 'text',
      title: 'IDBEA Report Data Highlights',
      body: [
        'Restorative Practice: The Office addressed 33 cases in response to general IDBEA concerns and 14 cases in response to current global events, using structured, empathetic case resolution to support the Tisch community.',
        'HEAR US Program: $62,000 was distributed among 11 student awardees, with 38 students mentored through the program \u2014 providing direct funding and guidance to amplify underrepresented voices in the arts.',
        'Future Artists: 178 students enrolled across 7 departments, expanding access and representation in Tisch\u2019s creative pipeline through targeted outreach and programming.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Office of Diversity/9.jpg',
      alt: 'Report \u2014 restorative practices stats, HEAR US program, Future Artists enrollment, and the year ahead',
    },

    /* ── THANK YOU + CREDITS ── */
    {
      type: 'thank-you',
      title: 'Thank You',
    },
    {
      type: 'image',
      src: '/Assets/Projects/Office of Diversity/10.jpg',
      alt: 'Credits \u2014 Parth Pawar, UI/UX Designer',
    },
  ],
}
