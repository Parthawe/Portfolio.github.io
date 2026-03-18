import type { ProjectMeta } from '@/types/project'

export const cuetv: ProjectMeta = {
  slug: 'cuetv',
  title: 'CueTV',
  subtitle: 'Making OTT platform a little more accessible, with a service system',
  description:
    'CueTV is an OTT platform for opera, ballet, symphonies, and classical music. Designed the discovery, playback, and retargeting ads system with MonsoonFish.',
  ogImage: 'https://www.designwhich.works/Assets/images/cuetv.jpg',
  heroImage: '/Assets/images/cuetv.jpg',
  projectColor: '#D53F8C',
  tags: ['UX', 'Brand', 'Product'],
  infoItems: [
    { label: 'Client', value: 'Operabase' },
    { label: 'Scope of Work', value: 'User Research, Retargeting Ads System' },
    { label: 'Role', value: 'UI Designer & Research' },
    { label: 'Duration', value: '7 Months' },
    { label: 'Year', value: '2022' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'org-dashboard',
    title: 'OrgDashboard',
    image: '/Assets/images/org-dashboard.png',
  },
  categories: ['ux'],
  sections: [
    // ── Slide 1 — Hero image ──
    {
      type: 'image',
      src: '/Assets/Projects/CueTV/Desktop/1.jpg',
      alt: 'CueTV hero \u2014 Making OTT Platform a little more accessible, with a service system. Multi-device mockups showing opera streaming on TV, laptop, tablet, and phone.',
    },

    // ── Slide 2 — Overview ──
    {
      type: 'overview',
      id: 'overview',
      columns: [
        {
          heading: 'Summary',
          body: 'CueTV is an OTT platform for connoisseurs and professionals for opera, ballet, symphonies, and classical music. Developed in collaboration with MonsoonFish, the platform provides a seamless streaming experience across all devices \u2014 computers, tablets, smartphones, and smart TVs \u2014 bringing world-class performing arts to audiences globally.',
        },
        {
          heading: 'The Challenges',
          body: 'The main challenge was to figure out the target audience and tailor the OTT Platform and the Retargeting Ads for the User Audience.',
        },
        {
          heading: 'My Role',
          body: 'As a UI Designer & Research, my role was to get to identify the audience and Create Awareness by helping them engage by using Google, Facebook Ads & giving a smooth experience on the OTT Platform for easy movement from Home to the Opera show they want to watch. Also watch across all screens in HD: computers, tablets, smartphones, and smart TVs.',
        },
        {
          heading: 'Tools & Techniques',
          body: 'Figma, Illustrator, Premiere Pro, After Effects, Maze, Google Ads Analyser, Research, Heat-Mapping, Experience Design',
        },
      ],
    },

    // ── About CueTV — genres ──
    {
      type: 'text',
      id: 'about-cuetv',
      title: 'About CueTV',
      body: [
        'Live Streaming, And Video On Demand Platform For',
      ],
    },
    {
      type: 'features',
      title: 'Genres',
      cards: [
        { title: 'Opera', description: '' },
        { title: 'Ballet', description: '' },
        { title: 'Symphonies', description: '' },
        { title: 'Classical', description: '' },
      ],
    },
    {
      type: 'text',
      title: 'About CueTV',
      body: [
        'Cue TV App Is Built For <strong>Connoisseurs And Professionals.</strong> The Fastest-Growing Playlist With Personalized Recommendations & Collections Of <strong>National Premiers, World Premieres, Concerts, Recitals,</strong> And More.',
      ],
    },

    // ── Slide 2 full-bleed image ──
    {
      type: 'image',
      src: '/Assets/Projects/CueTV/Desktop/2.jpg',
      alt: 'About CueTV \u2014 overview, challenges, role, tools, and genre categories: Opera, Ballet, Symphonies, Classical',
    },

    // ── Slide 3 — Problem Statement ──
    {
      type: 'steps',
      id: 'problem-statement',
      label: 'Research',
      title: 'Problem Statement',
      body: ['How To'],
      steps: [
        {
          num: 1,
          title: 'Identify Audience',
          description:
            'Understand who the connoisseurs and professionals are across opera, ballet, classical, and symphonies.',
        },
        {
          num: 2,
          title: 'Create Awareness',
          description: 'Reach them through the right channels and messaging.',
        },
        {
          num: 3,
          title: 'Engage User',
          description:
            'Provide a smooth platform experience that keeps them watching and subscribing.',
        },
      ],
    },
    {
      type: 'text',
      title: 'Identified Use Cases',
      body: [
        'We mapped content along multiple dimensions to understand the full scope of the platform:',
        '<strong>By payment:</strong> Free titles, pay-per-view, subscription',
        '<strong>By categories:</strong> Video on demand, livestreams, premieres, master class, entire festivals, competitions',
        '<strong>By genres:</strong> Opera, ballet, classical, drama, documentary',
        '<strong>By content within:</strong> Single title, multiple segments, stand-alone performances, multiple days/events, multiple languages',
        '<strong>By duplicates:</strong> Same title with different companies, same title with same company but different year',
        '<strong>By recognition of title:</strong> Award winners, blockbusters, new or CueTV-featured, highly recognized artists/companies, regular',
      ],
    },

    // ── Slide 3 full-bleed image ──
    {
      type: 'image',
      src: '/Assets/Projects/CueTV/Desktop/3.jpg',
      alt: 'Problem statement \u2014 How to identify audience, create awareness, engage user. Identified use cases mapped by payment, categories, genres, content, duplicates, and recognition.',
    },

    // ── Slide 4 — Process Ahead ──
    {
      type: 'steps',
      id: 'process',
      label: 'Process',
      title: 'Process Ahead',
      body: [
        'We structured the design process into three interconnected stages:',
      ],
      steps: [
        {
          num: 1,
          title: 'Understand Interaction',
          description:
            'Understanding how a user would want to interact with it',
        },
        {
          num: 2,
          title: 'Build the System',
          description:
            'Building a system around it aka, how it will be displayed',
        },
        {
          num: 3,
          title: 'Design Visuals',
          description:
            'Designing visuals for all required cases & turning them into a template',
        },
      ],
    },

    // ── Slide 4 full-bleed image ──
    {
      type: 'image',
      src: '/Assets/Projects/CueTV/Desktop/4.jpg',
      alt: 'Process ahead \u2014 multi-device platform design for Amazon Fire TV, Apple TV, Roku, Xbox, Android TV, Tizen, iPhone, iPad, and Web',
    },

    // ── Slide 5 — Focusing on Awareness ──
    {
      type: 'features',
      id: 'awareness',
      label: 'Strategy',
      title: 'Focusing on Awareness',
      cards: [
        {
          title: 'Experiment 1',
          description:
            'Aim: to understand if collaborating with magazines helps us with awareness.',
        },
        {
          title: 'Experiment 2',
          description:
            'Aim: to confirm the set 3 user segment, and see how they react to free trial campaign.',
        },
        {
          title: 'Experiment 3',
          description:
            'Aim: to experiment where do the users land after targeting ads and evaluate the response.',
        },
      ],
    },
    {
      type: 'text',
      title: 'Plan of Action',
      body: [
        'Awareness \u2192 Discovery \u2192 Validation \u2192 Targeting \u2192 Yay! We got a Sign Up',
        'The plan followed a four-step loop: Awareness \u2192 Discovery \u2192 Validation \u2192 Targeting, ultimately leading to sign-ups.',
      ],
    },

    // ── Slide 5 full-bleed image ──
    {
      type: 'image',
      src: '/Assets/Projects/CueTV/Desktop/5.jpg',
      alt: 'Awareness strategy \u2014 experiments, plan of action flow (Awareness, Discovery, Validation, Targeting), campaign details, and organic traffic flow',
    },

    // ── Slide 6 — Customer Segments ──
    {
      type: 'features',
      id: 'customer-segments',
      label: 'Research',
      title: 'Customer Segments',
      body: [
        'We identified three distinct customer segments, each with different motivations, pain points, and channels to reach them:',
      ],
      cards: [
        {
          title: 'Set 1 \u2014 Casual Enthusiasts',
          description:
            'Always been able to afford conventional theatre. Inspired by the experience, socially enriched taste. Values favourites, shows at their fingertips across all screens. Reached through luxury travel, tourism, news, and exclusive printed magazines.',
        },
        {
          title: 'Set 2 \u2014 Dedicated Patrons',
          description:
            'Civically engaged to classical art, up to date on conventional theatres. Inspired by appreciation of art and the finer details. Values range of collections and new shows. Reached through art & music newsletters and forums.',
        },
        {
          title: 'Set 3 \u2014 Students & Learners',
          description:
            'Learning, studying the musicality of art. Inspired by the study of art itself. Values accessibility, free trials, and the vast library. Reached through social media, educational institutions, and instrument apps.',
        },
        {
          title: 'Types of Ads',
          description:
            'Google Ads (responsive, image, video, app promotion), Facebook Ads (carousel, image, instant experience, video, collection), and other networks including Criteo, Skim Links, Out Brain, and AppNexus.',
        },
      ],
    },

    // ── Slide 6 full-bleed image ──
    {
      type: 'image',
      src: '/Assets/Projects/CueTV/Desktop/6.jpg',
      alt: 'Customer segments detailed breakdown \u2014 3 sets with motivations, pain points, reach strategies. Types of ads: Google Ads, Facebook Ads, and other networks.',
    },

    // ── Slide 7 — 30,000+ Ads & Engagement Results ──
    {
      type: 'stats',
      id: 'output',
      label: 'Output',
      title: '30,000+ Different Ads',
      body: [
        'We produced over 30,000 different ad creatives tailored to each customer segment and platform, covering shows like Romeo and Juliet, Hercules, Carmen, Der Zwerg, Cinderella, Macbeth, Fortunio, Agrippina, Jake Arditti, and many more.',
      ],
      stats: [
        { label: 'Different Ads', value: '30,000+' },
      ],
    },
    {
      type: 'text',
      title: 'Engagement Results',
      body: [
        'The before-and-after comparison showed a significant uplift in both trialist views and subscriber views after deploying the targeted ad campaigns, with a marked spike in engagement visible from August to September 2021.',
      ],
    },

    // ── Slide 7 full-bleed image ──
    {
      type: 'image',
      src: '/Assets/Projects/CueTV/Desktop/7.jpg',
      alt: '30,000+ different ad creatives collage and engagement results chart \u2014 before and after comparison showing trialist views and subscriber views growth',
    },

    // ── Slide 8 — Platform Optimization ──
    {
      type: 'features',
      id: 'platform-optimization',
      label: 'Product Design',
      title: 'Platform Optimization',
      body: [
        'Beyond the ad system, we optimized the CueTV platform experience itself across all touchpoints.',
      ],
      cards: [
        {
          title: 'Watch Live Streams And Premieres',
          description:
            'The explore tab surfaces recorded streams, live performances, summer festivals, and premieres from opera houses worldwide \u2014 including titles like Siberia, Nerone, La Traviata, and Moise et Pharaon.',
        },
        {
          title: 'Find Musical Works',
          description:
            'A powerful search experience lets users find specific works like Macbeth with preview clips, full performances, and related works like Lady Macbeth of Mtensk.',
        },
      ],
    },

    // ── Slide 8 full-bleed image ──
    {
      type: 'image',
      src: '/Assets/Projects/CueTV/Desktop/8.jpg',
      alt: 'Platform optimization \u2014 CueTV mobile app showing explore screen with Siberia opera, and search for Macbeth with results. Watch Live Streams and Find Musical Works.',
    },

    // ── Slide 9 — More Platform Features ──
    {
      type: 'features',
      id: 'platform-features',
      title: 'More Platform Features',
      cards: [
        {
          title: 'Find Composers',
          description:
            'Search by composer name like Mozart to discover their full catalogue of available performances and recordings.',
        },
        {
          title: 'Find Companies & Festivals',
          description:
            'Search by opera house or festival \u2014 such as the Royal Opera House \u2014 to browse collections including Giselle, The Winter\'s Tale, Madama Butterfly, The Nutcracker, The Sleeping Beauty, and Alice\'s Adventures in Wonderland.',
        },
        {
          title: 'Save And Watch Offline',
          description:
            'Users can download performances to watch offline, making the platform accessible even without an internet connection.',
        },
      ],
    },

    // ── Slide 9 full-bleed image ──
    {
      type: 'image',
      src: '/Assets/Projects/CueTV/Desktop/9.jpg',
      alt: 'Platform features continued \u2014 find composers (Mozart), find companies and festivals (Royal Opera House), save and watch offline',
    },

    // ── Slide 10 — Credits ──
    {
      type: 'credits',
      id: 'credits',
      credits: [
        { role: 'UX Lead', name: 'Pranav Gupta' },
        { role: 'Designer', name: 'Parth Pawar' },
      ],
    },
    {
      type: 'text',
      label: 'Team',
      title: 'Tools and Techniques',
      body: [
        'Figma, Illustrator, Premiere Pro, After Effects, Maze, Google Ads Analyser, Research, Heat-Mapping, Experience Design',
      ],
    },

    // ── Slide 10 full-bleed image ──
    {
      type: 'image',
      src: '/Assets/Projects/CueTV/Desktop/10.jpg',
      alt: 'Credits \u2014 performance stills from opera, ballet, and classical productions. Thanks for Watching! Typeface: Butler\'s Slice. Done with MonsoonFish.',
    },

    // ── Reflections ──
    {
      type: 'text',
      id: 'reflections',
      label: 'Reflections',
      title: 'What I Learned',
      body: [
        'CueTV was my first experience designing for a niche audience at scale. The natural instinct was to make the platform feel like Netflix or Spotify\u2014familiar, broad, optimized for casual browsing. But our users were connoisseurs, not casual viewers. They knew exactly what they wanted (a specific production of Carmen by a specific company) and needed tools to find it precisely, not algorithms to surface it serendipitously.',
        'The ad system taught me that targeting is a design problem, not just a marketing problem. When you produce 30,000+ ad variations, the creative decisions\u2014which image, which copy, which CTA\u2014become a design system unto themselves. I built templates and rules so that every variation maintained brand coherence while speaking to its specific audience segment. This systematic approach to creative production is a skill I have carried into every project since.',
        '<em>Done with MonsoonFish.</em>',
      ],
    },

    // ── Thank You ──
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
