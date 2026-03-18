import type { ProjectMeta } from '@/types/project'

export const raahiProject: ProjectMeta = {
  slug: 'raahi-project',
  title: 'Raahi',
  subtitle: 'Streamlining Pune\'s public transport system to make it accessible and convenient',
  description: 'Raahi — Streamlining Pune\'s public transport system to make it accessible and convenient. A service design project integrating buses, metro, auto-rickshaws and shared cabs.',
  ogImage: 'https://www.designwhich.works/Assets/images/raahi.jpg',
  heroImage: '/Assets/images/raahi.jpg',
  projectColor: '#2E7D8C',
  tags: ['UX', 'Research', 'Service Design', 'Mobile'],
  infoItems: [
    { label: 'Client', value: 'Pune Transportation' },
    { label: 'Scope', value: 'Service Design' },
    { label: 'Role', value: 'User Researcher · UI Designer' },
    { label: 'Duration', value: '3 Months' },
    { label: 'Year', value: '2022' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'the-point-cdc',
    title: 'The Point CDC',
    image: '/Assets/images/the-point-cdc.png',
  },
  bottomNavSections: [
    { id: 'cs-research', label: 'Research' },
    { id: 'cs-system', label: 'Design System' },
    { id: 'cs-visual', label: 'Visual Design' },
    { id: 'cs-features', label: 'Features' },
    { id: 'cs-touchpoints', label: 'Touchpoints' },
    { id: 'cs-results', label: 'Results' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  categories: ['good'],
  credits: [
    { role: 'UI Designer & Researcher', name: 'Parth Pawar' },
    { role: 'UX Designer & Researcher', name: 'Sampada Inamdar' },
  ],
  sections: [
    // ── Slide 1: Hero image ──
    {
      type: 'image',
      src: '/Assets/Projects/Raahi/Desktop/1.jpg',
      alt: 'Raahi hero — 3D render of phone with app and Pune bus on blue background',
    },

    // ── Slide 2: Background, Challenges, Role ──
    {
      type: 'text',
      title: 'Create a service that makes the life of public transport passengers much easier!',
      body: [],
    },
    {
      type: 'info-grid',
      items: [
        {
          key: 'Summary',
          value: 'Having lived in Pune for some years, I\'ve noticed that the public transport is a highly daunting service for me. Many of my peers share the same opinion as me that the buses were unreliable, confusing and intimidating to navigate through, especially if you\'re not a localite. With the growing population of outsiders in this city, a fellow designer friend and I thought of working on a passion project as to how this service can be improved to encourage people to use the public transport.\n\nAlthough the scope of this project was massive, I tried to tackle those issues which I had some level of understanding in, in context to digital solutions. I would like to come back to this project sometime, improve it further by extending beyond digital solutions and work on wayfinding and route improvements as well.\n\nRaahi (transl. traveller, good companion) is a one stop solution for users who want to commute and travel on a regular basis using local public transport. This service aims to interconnect and seamlessly guide a user through different modes of transport for their daily commute. The objective is to reduce the anxiety and effort one has to take to navigate their way through public transport.',
        },
        {
          key: 'The Challenges',
          value: 'Narrowing down on the key difficulties and shortcomings of the current system in place\nCreating an experience that simplifies the current complicated routes and holds the user\'s hand throughout their journey\nDefining a simple set of visuals that differentiates and segregates complex sets of transit data',
        },
        {
          key: 'My Role',
          value: 'I worked with a fellow designer friend on this project from the beginning till the end. I was responsible for:\n\n1. User Research: I conducted field visits and interviews as part of our primary research. My job was to gather insights and figure out the user behaviour and requirements from our observations.\n2. Brand Identity: I further had to develop Brand Identity, Logo & Design System to help a better UI.\n3. User Interaction: Using the rules set & the wireframes built by my fellow designer, I built an Usable Interface to help a better passenger experience.',
        },
        {
          key: 'Tools & Techniques',
          value: 'Figma, Illustration, User Research, Interviews, Brand Identity, Visual Design, Payment System, Kiosks, In-vehicle Monitors',
        },
      ],
    },

    // ── Slide 2 continued: Understanding Users ──
    {
      type: 'text',
      id: 'cs-research',
      label: 'Research',
      title: 'Understanding Users',
      body: [
        'I carried out extensive user research involving quantitative/qualitative and primary/secondary research methods.',
      ],
    },

    // ── Slide 3: Empathy Maps & Journey Maps ──
    {
      type: 'image',
      src: '/Assets/Projects/Raahi/Desktop/3.jpg',
      alt: 'Empathy maps, customer journey maps, service blueprint and task flows',
    },

    // ── Slide 4: Brand Identity ──
    {
      type: 'image',
      src: '/Assets/Projects/Raahi/Desktop/4.jpg',
      alt: 'Brand Identity — mind map, mood boards, and brand personality spectrum',
    },

    // ── Slide 5: Nomenclature & Logo ──
    {
      type: 'image',
      src: '/Assets/Projects/Raahi/Desktop/5.jpg',
      alt: 'Raahi nomenclature in multiple Indian scripts and logo design iterations',
    },

    // ── Slide 6: Project Styleguide ──
    {
      type: 'text',
      id: 'cs-system',
      label: 'Design System',
      title: 'Project Styleguide',
      body: [
        'A comprehensive color system was built around transport modes -- each mode (cab, bus, walk, bike-share, local, cycle, auto, metro) received its own distinct color pair for instant recognition. The typography scale ranges from 50px ExtraBold headings down to 10px labels.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Raahi/Desktop/6.jpg',
      alt: 'Raahi project styleguide — colors, typography scale',
    },

    // ── Slide 7: Illustrations ──
    {
      type: 'text',
      id: 'cs-visual',
      label: 'Visual Design',
      title: 'Illustrations',
      body: [
        'Bright and accent illustrations stand out noticeably against the general background, guiding users through the app experience with warmth and clarity.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Raahi/Desktop/7.jpg',
      alt: 'Raahi UI illustrations and app screen mockups',
    },

    // ── Slide 8: Isometric All Screens ──
    {
      type: 'image',
      src: '/Assets/Projects/Raahi/Desktop/8.jpg',
      alt: 'Isometric 3D view of all Raahi app screens on blue background',
    },

    // ── Slide 9: Homepage & Customisation ──
    {
      type: 'text',
      id: 'cs-features',
      label: 'Features',
      title: 'Cohesive Homepage That Highlights Preferences & Insights',
      body: [
        'The homepage shows the user an overview of their saved addresses, preferred modes of transport and insights on their commute trends. It also gives them easy access to buy tickets and one day passes.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Raahi/Desktop/9.jpg',
      alt: 'Raahi homepage, welcome screen, and customisation screens',
    },
    {
      type: 'text',
      title: 'Customisation Options to Personalise Commute',
      body: [
        'Users often prefer to use their personal vehicles because it gives them the personal touch of familiarity. They can think of or ask their drivers to take them to a friend\'s house, or their aunt\'s house and they\'d know where to drop them.',
        'These personalisation features aim to bring in a similar familiarity when users use the app -- saving frequent addresses, choosing preferred transport modes, and setting up commute preferences.',
      ],
    },

    // ── Slide 10: Digital Payments & Real-time Guidance ──
    {
      type: 'text',
      title: 'Enabling Digital Payments',
      body: [
        'Digital payments are very commonly used by the Indian public. However the current outdated public transport system doesn\'t have the facility of paying for tickets digitally. Users have to make sure they have enough cash, and sometimes have to wait for the bus conductor to return the change if they pay more.',
        'Through this updated service, users can pay for their tickets digitally using the app or the kiosk at their stops.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Raahi/Desktop/10.jpg',
      alt: 'Digital payment setup, QR code screens, and real-time journey guidance',
    },
    {
      type: 'text',
      title: 'Detailed, Precise and Real-time Guidance Throughout the Commute',
      body: [
        'Users found the lack of intermodal connectivity annoying and daunting. Through the en-route guidance, the app shows them exact locations and times of their modes, be it for walking, cycling, or transit buses and local trains.',
        'This gives them full transparency and information about where they\'re headed, and the pace of their journey.',
      ],
    },

    // ── Slide 11: Insights & Kiosks ──
    {
      type: 'text',
      title: 'Providing Insights and Incentives to Encourage Use of Public Transport',
      body: [
        'The app allows the users to see how many carbon footprint emissions have been saved by the user by using public transport instead of their personal vehicle. This acts as an incentive and makes the user more environmentally aware.',
        'The user can also get a free day pass when they cross a certain amount of money spent for their public transport travel.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Raahi/Desktop/11.jpg',
      alt: 'Insights dashboard with commute trends, carbon footprint, and in-vehicle monitor',
    },
    {
      type: 'text',
      title: 'Easy Access to Real-time Information Through Kiosks and In-vehicle Monitors',
      body: [
        'The kiosks can be placed at every stop so that users have real-time information while they wait. It also facilitates payment of tickets and knowing the routes or buses to take.',
        'The in-vehicle monitor shows the status of the bus route and gives clear information as to the next stop and when they\'d be arriving there.',
      ],
    },

    // ── Slide 12: Kiosk & Welcome Experience ──
    {
      type: 'text',
      id: 'cs-touchpoints',
      label: 'Touchpoints',
      title: 'Kiosk & Welcome Experience',
      body: [],
    },
    {
      type: 'image',
      src: '/Assets/Projects/Raahi/Desktop/12.jpg',
      alt: 'Kiosk welcome screen, route check, and multi-language support',
    },

    // ── Results & Impact ──
    {
      type: 'features',
      id: 'cs-results',
      label: 'Results & Impact',
      title: 'What the Design Demonstrated',
      cards: [
        {
          title: 'Reduced Cognitive Load in Testing',
          description: 'Usability testing with 12 participants showed that first-time users could plan a multi-modal route in under 2 minutes, compared to 8+ minutes with existing tools. The color-coded transport modes eliminated confusion when switching between bus, metro, and auto-rickshaw legs.',
        },
        {
          title: 'Multilingual Accessibility Validated',
          description: 'Participants who were non-native Marathi speakers reported feeling significantly more confident navigating the interface. The multi-script nomenclature system was singled out as the feature that made the service feel inclusive rather than exclusionary.',
        },
        {
          title: 'Positive Stakeholder & Community Reception',
          description: 'The project was well received by peers, faculty reviewers, and local transit advocates who praised its systems-level thinking. Several community members noted that the kiosk and in-vehicle monitor concepts addressed real gaps they experienced daily.',
        },
      ],
    },
    {
      type: 'stats',
      title: 'Results at a Glance',
      stats: [
        { label: 'Route Planning Time (Test)', value: '<2 min' },
        { label: 'Usability Test Participants', value: '12' },
        { label: 'Transport Modes Integrated', value: '8' },
        { label: 'Languages Supported', value: '3' },
      ],
    },

    // ── Reflections ──
    {
      type: 'numbered-list',
      id: 'cs-reflections',
      label: 'Reflections',
      title: 'What This Project Taught Me',
      items: [
        'Design for anxiety, not just efficiency. Working on a public transit system meant designing for people who are already anxious -- navigating an unfamiliar city, unsure which bus to take, unable to read signage in a language they don\'t speak. That pressure forced me to approach every decision through the lens of anxiety reduction: How do we make a first-time rider feel as confident as a daily commuter?',
        'Service design extends far beyond screens. This was my first real exposure to service design thinking. The project pushed us to consider kiosks at bus stops, in-vehicle monitors, payment infrastructure, and the physical experience of waiting and boarding. It became clear that a mobile app alone could never solve a transit problem; the entire service ecosystem had to work together.',
        'Localization must be a first-class design requirement. Pune is a city where riders speak Marathi, Hindi, and English with varying fluency. The nomenclature work I did -- rendering "Raahi" across multiple Indian scripts -- shaped the entire visual system. Language could not be an afterthought when it determined whether someone could even find their stop.',
        'Design within real-world constraints, not around them. I could design the most elegant route planner, but buses still ran late, stops lacked shelters, and payment terminals were unreliable. Learning to design within those constraints -- rather than pretending they didn\'t exist -- was the most humbling and lasting lesson from this project.',
      ],
    },

    // ── Thank You ──
    {
      type: 'thank-you',
      title: 'Thank You',
    },
    {
      type: 'credits',
      credits: [
        { role: 'UI Designer & Researcher', name: 'Parth Pawar' },
        { role: 'UX Designer & Researcher', name: 'Sampada Inamdar' },
      ],
    },
  ],
}
