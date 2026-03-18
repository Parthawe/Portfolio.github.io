import type { ProjectMeta } from '@/types/project'

export const codeForBuild: ProjectMeta = {
  slug: 'code-for-build',
  title: 'Learn Coding By Building Blocks',
  subtitle:
    'Helping Kids learn Coding through Visual Block building and developing Website.',
  description:
    'Helping Kids learn Coding through Visual Block building and developing Website. A mobile app that uses 3D castle blocks to gamify coding education for teenagers.',
  ogImage: 'https://www.designwhich.works/Assets/images/code-for-build.jpg',
  heroImage: '/Assets/Projects/CodeforBuild/Desktop/1.jpg',
  projectColor: '#2B6CB0',
  tags: ['UX', 'Interaction Design', '3D'],
  categories: ['brand'],
  infoItems: [
    { label: 'Client', value: 'Self Initiated' },
    { label: 'Scope of Work', value: 'Research, UI/UX, Development' },
    { label: 'Role', value: 'Interaction Designer' },
    { label: 'Duration', value: '3 Months' },
    { label: 'Year', value: '2021' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'typeface',
    title: "Butler's Slice",
    image: '/Assets/images/typeface.jpg',
  },
  bottomNavSections: [
    { id: 'cs-discover', label: 'Discover' },
    { id: 'cs-define', label: 'Define' },
    { id: 'cs-develop', label: 'Develop' },
    { id: 'cs-deliver', label: 'Deliver' },
  ],
  credits: [{ role: 'Interaction Designer', name: 'Parth Pawar' }],
  sections: [
    // ── Summary / Challenges / Role / Tools ──
    {
      type: 'info-grid',
      items: [
        {
          key: 'Summary',
          value:
            "Kids from Istanbul have a curiosity to learn coding and development of websites, but can't access computer. Therefore the solution was to help these demographics learn to code on their mobile using visual elements by associating the Visual elements (Kid's childhood playing block pieces) with Code piece, to building block pieces one on top of the other.",
        },
        {
          key: 'The Challenges',
          value:
            'Challenge was to build visual elements which could translate and help kids understand the body, container, images, text, and div-block.',
        },
        {
          key: 'My Role',
          value:
            'As I was the Sole Interaction Designer, I experimented with solutions to visualize the content to learn 10 to 16 years old kids to understand coding. The idea revolved around making puzzle block pieces to build a castle of blocks to make coding fun to learn.',
        },
        {
          key: 'Tools & Techniques',
          value:
            '3D Modelling, Figma, Illustrator, Blender, Transformation - Access, Code Block Building, Html, CSS, Frontend - Development',
        },
      ],
    },

    // ── Problem Statement ──
    {
      type: 'callout',
      text: 'How can we encourage teenagers to learn coding effectively using gamified visualisation?',
    },

    // ── Process (info-grid) ──
    {
      type: 'info-grid',
      items: [
        { key: 'Discover', value: 'User Research, Market Research' },
        { key: 'Define', value: 'Insights, Goals, Challenges, Features' },
        { key: 'Develop', value: 'UX, Visuals' },
        { key: 'Deliver', value: 'Prototyping, Improvements' },
      ],
    },

    // ── User Research ──
    {
      type: 'text',
      label: 'Discover',
      title: 'User Research',
      body: [],
    },
    {
      type: 'image',
      src: '/Assets/Projects/CodeforBuild/Desktop/3.jpg',
      alt: 'User Research findings and competitive analysis matrix',
    },

    // ── Market Research / Competitive Analysis ──
    {
      type: 'text',
      label: 'Discover',
      title: 'Market Research',
      body: [
        'Competitive Analysis: Compared six existing coding-education apps \u2014 Enki, SoloLearn, Mimo, Encode, Codeacademy, and Programming Hub \u2014 across eleven feature dimensions. All six supported HTML/CSS and coding stems, but none offered visualization of code, Javascript support, castle blocks, or 3D modelling. This gap validated the opportunity for a visual-block-based coding tool.',
      ],
    },

    // ── Goals ──
    {
      type: 'text',
      id: 'cs-define',
      label: 'Define',
      title: 'Goals',
      body: [],
    },
    {
      type: 'image',
      src: '/Assets/Projects/CodeforBuild/Desktop/4.jpg',
      alt: 'Goals \u2014 castle block illustration, user journey flowchart on blue background',
    },

    // ── Features ──
    {
      type: 'features',
      label: 'Define',
      title: 'Features',
      cards: [
        { title: 'Coding Languages - HTML, CSS', description: '' },
        { title: 'Visualization of Code', description: '' },
        { title: 'Coding Languages - Javascript', description: '' },
        { title: 'Multiple Layouts', description: '' },
        { title: 'Illustrated Code', description: '' },
        { title: 'Coding Stem', description: '' },
        { title: 'Castle Blocks', description: '' },
        { title: 'Multi-lingual Support', description: '' },
        { title: 'Digital In & Out Board', description: '' },
        { title: 'Digital Agreements', description: '' },
        { title: 'Multi-lingual Support', description: '' },
      ],
    },

    // ── UX & Wireframe ──
    {
      type: 'text',
      label: 'Develop',
      title: 'UX & Wireframe',
      body: [],
    },
    {
      type: 'image',
      src: '/Assets/Projects/CodeforBuild/Desktop/5.jpg',
      alt: 'UX wireframes and features overview on blue background',
    },

    // ── Design System ──
    {
      type: 'text',
      id: 'cs-develop',
      label: 'Develop',
      title: 'Design System',
      body: [],
    },
    {
      type: 'text',
      title: 'Colors',
      body: [
        'For the app, the colors were removed based on how these colors affect the human psyche. The blue color has a refreshing effect and allows young mind to stay active and coding vibe. The Multi color combination has a pop look which helps with identification.',
      ],
    },
    {
      type: 'text',
      title: 'Typography',
      body: ['Inter'],
    },
    {
      type: 'info-grid',
      items: [
        { key: 'Regular', value: '16px' },
        { key: 'Medium', value: '28px' },
        { key: 'SemiBold', value: '34px' },
      ],
    },
    {
      type: 'features',
      title: 'Block System',
      cards: [
        {
          title: 'Body Block',
          description: 'Use this as the base of your Code',
        },
        {
          title: 'Padding',
          description: 'Use this block to add Padding between/ all Blocks',
        },
        {
          title: 'Image Block',
          description: 'Use this block to add Image to your container',
        },
        {
          title: 'Icons Block',
          description: 'Use this block to add Icons in your container',
        },
        {
          title: 'Container / Child',
          description:
            'Single pieces which join together to form body are called as container',
        },
        {
          title: 'Cross Axis Alignment',
          description:
            'Use this block for If, While, If Else, For Types of Conditions',
        },
        {
          title: 'Padding between',
          description:
            'Space between 2 Containers, Blocks is known as Padding',
        },
        {
          title: 'Button',
          description:
            'Use this block for If, While, If Else, For Types of Conditions',
        },
        {
          title: 'Text',
          description: 'Add Style to your code using this block',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/CodeforBuild/Desktop/6.jpg',
      alt: 'Design System \u2014 Colors, typography, and 3D block components',
    },

    // ── Function & Motivation ──
    {
      type: 'text',
      label: 'Develop',
      title: 'Function & Motivation',
      body: [
        'The idea revolved around making puzzle block pieces to build a castle of blocks to make coding fun to learn.',
      ],
    },
    {
      type: 'text',
      title: '1. Illustration Code',
      body: [
        'Illustration depicted in left bottom corner changes according to the part of the code the user choose. Example. Over here we are inside Body \u2192 Container \u2192 Logo \u2192 Netflix.. which showcases the inner parts of the 3D Layout.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/CodeforBuild/Desktop/7.jpg',
      alt: 'Illustration Code \u2014 app mockup with 3D block illustrations showing code structure',
    },

    // ── Code Learning ──
    {
      type: 'text',
      title: '2. Code Learning',
      body: [
        'In the Output Window user will be able to see the Preview of the Frontend Layout & 3D Model representing the same. Its an interactive 3D Block Model to help learn Code by clicking on the 3D Block Model.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/CodeforBuild/Desktop/8.jpg',
      alt: 'Code Learning \u2014 output window and 3D block model interaction with multiple phone mockups',
    },

    // ── Multiple Layouts ──
    {
      type: 'text',
      title: '3. Multiple Layouts',
      body: [
        'Multiple Layouts will help you get a deeper understanding and reflecting on different Coding 3D Models. You can interact with the 3D Layout to change and reflect on Code changes.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/CodeforBuild/Desktop/8.jpg',
      alt: 'Multiple Layouts \u2014 different coding 3D models across multiple screens',
    },

    // ── Final Screens ──
    {
      type: 'text',
      id: 'cs-deliver',
      label: 'Deliver',
      title: 'Final Screens',
      body: [],
    },
    {
      type: 'image',
      src: '/Assets/Projects/CodeforBuild/Desktop/9.jpg',
      alt: 'Final screen showcase \u2014 all app screens arranged diagonally on blue background',
    },

    // ── Reflections ──
    {
      type: 'text',
      label: 'Reflections',
      title: 'What I Learned',
      body: [
        'Code for Build started from a real observation: teenagers in Istanbul wanted to learn coding but did not have access to computers. The constraint forced a creative solution\u2014mapping code concepts to physical building blocks that kids already understood from childhood play. A <div> became a container block. CSS padding became the space between blocks. The metaphor made abstract concepts tangible.',
        'The hardest design challenge was the 3D visualization. Showing a live 3D model of the code structure alongside the block-building interface meant two competing visual hierarchies on a small mobile screen. The solution was progressive disclosure\u2014the 3D view starts minimized and expands only when the user taps on a block, revealing how that block fits into the larger structure. This taught me that the best educational interfaces do not show everything at once; they reveal complexity at the pace of the learner.',
      ],
    },

    // ── Thank You ──
    {
      type: 'thank-you',
      title: 'Thank You',
    },

    // ── Credits ──
    {
      type: 'credits',
      credits: [{ role: 'Interaction Designer', name: 'Parth Pawar' }],
    },
  ],
}
