import type { ProjectMeta } from '@/types/project'

export const thePointCdc: ProjectMeta = {
  slug: 'the-point-cdc',
  title: 'The Point CDC',
  subtitle: 'A digital transformation for community empowerment',
  description:
    'Revitalizing The Point CDC \u2014 A digital transformation for community empowerment in Hunts Point, Bronx. Redesigning their website to streamline services, foster innovation, and enhance community engagement.',
  ogImage: 'https://www.designwhich.works/Assets/images/the-point-cdc.png',
  heroImage: '/Assets/images/the-point-cdc.png',
  projectColor: '#C44D2B',
  tags: ['UX', 'Community', 'Research'],
  infoItems: [
    { label: 'Client', value: 'The Point CDC' },
    { label: 'Scope', value: 'User Research, UI/UX, Prototyping' },
    { label: 'Role', value: 'Product Designer' },
    { label: 'Duration', value: '3 Months' },
    { label: 'Year', value: '2024' },
  ],
  backLink: { label: '\u2190 Back to Work', href: '/work' },
  nextProject: {
    slug: 'office-of-diversity',
    title: 'Office of Diversity',
    image: '/Assets/images/office-of-diversity.png',
  },
  bottomNavSections: [
    { id: 'cs-discover', label: 'Discover' },
    { id: 'cs-define', label: 'Define' },
    { id: 'cs-develop', label: 'Develop' },
    { id: 'cs-deliver', label: 'Deliver' },
    { id: 'cs-results', label: 'Results' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  categories: ['good'],
  credits: [{ role: 'Product Designer', name: 'Parth Pawar' }],
  sections: [
    // ── SLIDE 1 — Hero image ──────────────────────────────────
    {
      type: 'image',
      src: '/Assets/Projects/ThePointCDC/Desktop/Slice 1.png',
      alt: 'The Point CDC \u2014 Revitalizing a community website with device mockups showing the redesigned homepage',
    },

    // ── SLIDE 2 — Overview: headline + label-rows ─────────────
    {
      type: 'overview',
      columns: [
        {
          heading: 'Summary',
          body: 'The Point CDC, a cornerstone in Hunts Point, Bronx, has been at the forefront of empowering the community by providing free WiFi through a resilient mesh network. The website revamp project aimed to modernize their online presence, streamline access to community services, and showcase their latest initiatives and programs. This case study outlines the challenges, process, and solutions involved in the revamp.',
        },
        {
          heading: 'The Challenges',
          body: 'The Point CDC website faced several challenges, including:\n\u2022 Outdated design and complex navigation\n\u2022 Lack of a clear communication pathway for highlighting community initiatives\n\u2022 The need to integrate real-time updates on programs like the \u201cBe a Buddy\u201d program, free WiFi access, and \u201cHunts Point Forward\u201d\n\u2022 Optimizing the mobile experience for community residents',
        },
        {
          heading: 'My Role',
          body: 'As the lead UI/UX designer, my role was to revamp the website with a fresh, community-focused design. I conducted user research, created prototypes, and led the redesign to improve navigation and accessibility.',
        },
        {
          heading: 'Tools & Techniques',
          body: 'Figma, User Research, Identity and Website Design, Prototyping, Wireframes, High-Fidelity, Experience Management, Design System',
        },
      ],
    },

    // ── SLIDE 3 — About The Point CDC (two-col text + image) ──
    {
      type: 'text',
      title: 'The Point CDC',
      body: [
        'The Point CDC is a non-profit organization in Hunts Point, Bronx, focused on empowering the local community through arts, education, and environmental initiatives. They provide programs to improve residents\u2019 lives, including free WiFi access and youth leadership opportunities, while promoting social justice and sustainability.',
      ],
    },

    {
      type: 'image',
      src: '/Assets/Projects/ThePointCDC/Desktop/Slice 3.png',
      alt: 'The Point CDC community work \u2014 WiFi installation and community members',
    },

    // ── Problem Statement ─────────────────────────────────────
    {
      type: 'callout',
      text: 'How can we redesign The Point CDC\u2019s website to enhance accessibility, streamline navigation, and effectively highlight community programs and services?',
    },

    // ── SLIDE 4 — Process (steps) ─────────────────────────────
    {
      type: 'steps',
      id: 'cs-discover',
      label: '02 \u2014 Discover',
      title: 'Process',
      steps: [
        {
          num: 1,
          title: 'Discover',
          description:
            'Conducted a website audit to identify pain points and opportunities. Interviewed community members and staff to gain insights into their digital needs.',
        },
        {
          num: 2,
          title: 'Define',
          description:
            'Organized content to prioritize essential services. Highlighted the community\u2019s accomplishments. Defined goals and problems.',
        },
        {
          num: 3,
          title: 'Develop',
          description:
            'Created wireframes and low-fidelity prototypes to test navigation and flow. Collaborated with The Point CDC to ensure all features aligned with their mission of empowerment.',
        },
        {
          num: 4,
          title: 'Deliver',
          description:
            'Launched a redesigned website with intuitive navigation and a modern layout. Introduced new sections like \u201cHunts Point News\u201d and \u201cQuick Finds\u201d to provide real-time program updates.',
        },
      ],
    },

    // ── User Research ─────────────────────────────────────────
    {
      type: 'features',
      label: '03 \u2014 Discover',
      title: 'User Research',
      body: [
        'I focused on understanding how the website could best serve the Hunts Point community. Residents emphasized the need for:',
      ],
      cards: [
        {
          title: 'Easy access to WiFi service information.',
          description: '',
        },
        {
          title: 'Clear communication about events and programs.',
          description: '',
        },
        {
          title: 'Mobile-friendly navigation, as many users rely on their phones for internet access.',
          description: '',
        },
      ],
    },

    // ── SLIDE 5 — User Persona ────────────────────────────────
    {
      type: 'info-grid',
      items: [
        { key: 'Name', value: 'Maria Rodriguez' },
        { key: 'Age', value: '32' },
        { key: 'Occupation', value: 'Community Organizer' },
        {
          key: 'Digital Access',
          value: 'Primarily mobile (75%), occasional desktop usage',
        },
      ],
    },

    {
      type: 'text',
      label: 'Interview',
      title: 'User Persona \u2014 Goals',
      body: [
        '\u2022 Easily access information on free community resources like WiFi and mentorship programs.',
        '\u2022 Stay updated on local initiatives and events hosted by The Point CDC.',
        '\u2022 Use the website as a tool to help others in the community connect with resources.',
      ],
    },

    {
      type: 'text',
      label: 'Interview',
      title: 'User Persona \u2014 Frustrations',
      body: [
        '\u2022 Difficulty finding information on the old website due to cluttered layout.',
        '\u2022 Slow loading times and poor mobile optimization made accessing resources inconvenient.',
        '\u2022 Lack of a centralized location for event updates, leading to missed community activities.',
      ],
    },

    // ── Research Insights (numbered list) ─────────────────────
    {
      type: 'numbered-list',
      label: 'Key Insights',
      title: 'Research Insights',
      items: [
        '<strong>Ease of Access to WiFi Information:</strong> Users emphasized needing quick access to the \u201cFree Hunts Point WiFi\u201d section, as it\u2019s one of the most valuable resources provided by The Point CDC.',
        '<strong>Mobile Usage Preference:</strong> Many residents primarily access the site on mobile devices, underscoring the importance of mobile-friendly navigation.',
        '<strong>Event and Program Awareness:</strong> Users highlighted the importance of staying updated on programs like \u201cBe a Buddy\u201d and events through clear, real-time information.',
      ],
    },

    // ── Visual Improvements ───────────────────────────────────
    {
      type: 'text',
      label: 'Discover',
      title: 'Visual Improvements',
      body: [
        'An audit of the existing site revealed several areas for improvement:',
        '\u2022 <strong>Simplify Navigation:</strong> Reduce menu clutter by grouping items under broader categories.',
        '\u2022 <strong>Reduce Visual Clutter:</strong> Streamline layout elements to focus on essential information.',
        '\u2022 <strong>Refine Color Scheme:</strong> Use a cohesive color palette that aligns with the community mission.',
        '\u2022 <strong>Highlight Key Programs:</strong> Use icons or banners to make important resources more visible.',
      ],
    },

    {
      type: 'image',
      src: '/Assets/Projects/ThePointCDC/Desktop/Slice 5.png',
      alt: 'Before and after visual comparison of the old website with annotated improvement areas',
    },

    // ── SLIDE 6 — Design Direction (numbered list) ────────────
    {
      type: 'numbered-list',
      label: 'Insights',
      title: 'Design Direction',
      items: [
        'The new design should feature clean lines, a simplified color palette, and clearly defined sections for news, programs, and events.',
        'Special emphasis should be placed on typography and imagery that resonates with the community\u2019s identity.',
      ],
    },

    // ── Goals (features) ──────────────────────────────────────
    {
      type: 'features',
      id: 'cs-define',
      label: 'Define',
      title: 'Goals',
      cards: [
        {
          title: 'Improve Accessibility',
          description:
            'Ensure the website is user-friendly and easy to navigate for all community members.',
        },
        {
          title: 'Highlight Key Programs',
          description:
            'Effectively showcase vital services like free WiFi and community initiatives.',
        },
        {
          title: 'Enhance Engagement',
          description:
            'Foster stronger community connections by providing real-time updates and a modern digital experience.',
        },
      ],
    },

    // ── User Journey ──────────────────────────────────────────
    {
      type: 'image',
      src: '/Assets/Projects/ThePointCDC/Desktop/Slice 6.png',
      alt: 'User journey map and information architecture flow diagram',
    },

    // ── SLIDE 7 — Wireframes ──────────────────────────────────
    {
      type: 'image',
      src: '/Assets/Projects/ThePointCDC/Desktop/Slice 7.png',
      alt: 'Low-fidelity wireframes for the redesigned website',
    },

    // ── SLIDE 8 — Setting Visual Style ────────────────────────
    {
      type: 'text',
      id: 'cs-develop',
      label: 'Develop',
      title: 'Setting Visual Style',
      body: [
        'A comprehensive design system was established covering typography, buttons, sections, colors, tags, icons, and menu components to ensure consistency across the entire website.',
      ],
    },

    {
      type: 'image',
      src: '/Assets/Projects/ThePointCDC/Desktop/Slice 8.png',
      alt: 'Design system components \u2014 typography, buttons, colors, tags, icons, sections, and menu',
    },

    // ── SLIDE 9 — Visuals & Prototyping (features) ────────────
    {
      type: 'features',
      id: 'cs-deliver',
      label: 'Deliver',
      title: 'Visuals & Prototyping',
      cards: [
        {
          title: 'Streamlined Navigation',
          description: 'Simplified menu for easier access to information.',
        },
        {
          title: 'Responsive Design',
          description:
            'Optimized for mobile, ensuring smooth access on all devices.',
        },
        {
          title: 'Improved Readability',
          description:
            'Clear sections and whitespace for better content flow.',
        },
        {
          title: 'Highlighted Key Programs',
          description:
            'Featured icons for quick access to important services.',
        },
        {
          title: 'Cohesive Color Scheme',
          description:
            'Used a consistent palette that reflects the community focus.',
        },
        {
          title: 'Community Engagement',
          description:
            'Added testimonials and social media links for trust-building.',
        },
      ],
    },

    {
      type: 'image',
      src: '/Assets/Projects/ThePointCDC/Desktop/Slice 9.png',
      alt: 'Final high-fidelity design \u2014 desktop and mobile responsive views with annotated improvements',
    },

    // ── SLIDE 10 — More pages ─────────────────────────────────
    {
      type: 'image',
      src: '/Assets/Projects/ThePointCDC/Desktop/Slice 10.png',
      alt: 'Additional page designs showing various sections of the redesigned website',
    },

    // ── Outcome & Results (stats) ─────────────────────────────
    {
      type: 'stats',
      id: 'cs-results',
      label: 'Deliver',
      title: 'Outcome & Results',
      body: [
        'Feedback from community members and staff was overwhelmingly positive, particularly around the ease of navigation and access to the WiFi program.',
      ],
      stats: [
        { label: 'Community Engagement Increase', value: '+35%' },
        { label: 'Growth in Mobile Visits', value: '+50%' },
        { label: 'Navigation Time Reduced', value: '60%' },
        { label: 'WiFi Page Discoverability', value: '2x' },
      ],
    },

    // ── Pull quote ────────────────────────────────────────────
    {
      type: 'pullquote',
      quote:
        '\u201cBefore, I couldn\u2019t even find the WiFi page. Now I send the link to my neighbors and they sign up the same day. It finally feels like our website.\u201d',
      cite: '\u2014 Maria, Hunts Point Community Organizer',
    },

    // ── SLIDE 11 — Reflections (numbered list) ────────────────
    {
      type: 'numbered-list',
      id: 'cs-reflections',
      label: 'Reflections',
      title: 'What Community-Centered Design Taught Me',
      items: [
        '<strong>Deep listening beats designer instincts.</strong> Designing for a community you are not part of requires listening, not assumptions. Every interview and site visit reminded me that my instincts about what residents needed were often wrong until I sat down and actually heard their stories.',
        '<strong>Mobile-first is a lived reality, not a buzzword.</strong> When 75% of your users literally only have phone access, it reframes every layout decision, every interaction pattern, and every content hierarchy choice. This project made mobile-first thinking a non-negotiable part of my design process.',
        '<strong>Balance institutional messaging with genuine utility.</strong> The tension between what a non-profit organization wants to communicate and what community members actually need to find was one of the hardest design challenges. Prioritizing user tasks over organizational messaging led to a site that served both goals more effectively.',
        '<strong>Accessibility raises the bar for everyone.</strong> Designing for accessibility forced better design decisions overall \u2014 clearer typography, simpler navigation, and stronger visual hierarchy benefited every single user, not just those with specific needs.',
      ],
    },

    // ── Thank You + Credits ───────────────────────────────────
    {
      type: 'thank-you',
      title: 'Thank You',
    },

    {
      type: 'credits',
      credits: [{ role: 'Product Designer', name: 'Parth Pawar' }],
    },
  ],
}
