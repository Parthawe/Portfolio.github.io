import type { ProjectMeta } from '@/types/project'

export const vjSoftware: ProjectMeta = {
  slug: 'vj-software',
  title: 'VJ Parivar',
  subtitle: 'Vehicle Parking Made Easy',
  description:
    'Designing the digital forefront of Vilas Javdekar — a vehicle parking management app for homeowners in VJ residential societies. User research, UI/UX design and prototyping for a seamless parking experience.',
  ogImage: 'https://www.designwhich.works/Assets/images/vj.jpg',
  heroImage: '/Assets/images/vj.jpg',
  projectColor: '#4A5568',
  tags: ['UX', 'UI', 'Research', 'Prototyping'],
  infoItems: [
    { label: 'Client', value: 'Vilas Javdekar' },
    { label: 'Scope', value: 'User Research, UI/UX, Prototyping' },
    { label: 'Role', value: 'UI/UX Designer' },
    { label: 'Duration', value: '3 Months' },
    { label: 'Year', value: '2022' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'shuffle',
    title: 'Shuffle',
    image: '/Assets/images/shuffle.jpg',
  },
  bottomNavSections: [
    { id: 'cs-context', label: 'Context' },
    { id: 'cs-discover', label: 'Discover' },
    { id: 'cs-define', label: 'Define' },
    { id: 'cs-develop', label: 'Develop' },
    { id: 'cs-deliver', label: 'Deliver' },
  ],
  categories: ['creative'],
  credits: [
    { role: 'UX Lead', name: 'Akshita Anand' },
    { role: 'UI/UX Designer', name: 'Parth Pawar' },
  ],
  sections: [
    /* ── SLIDE 1 — Hero image ── */
    {
      type: 'image',
      src: '/Assets/Projects/vj/Desktop/1.jpg',
      alt: 'VJ Parivar — Vehicle Parking Made Easy hero with app screens',
    },

    /* ── SLIDE 2 — Overview ── */
    {
      type: 'text',
      title:
        'Designing the digital forefront of a real estate company; to be the face of its post-payment services.',
      body: [],
    },
    {
      type: 'overview',
      columns: [
        {
          heading: 'Summary',
          body: 'Designing the digital forefront of a real estate company; to be the face of its post-payment services. VJ Parivar is an app for the homeowners of VJ Real Estate and constructions company. It aims to be the face of VJ services to their homeowners after their purchase of a house from VJ.',
        },
        {
          heading: 'The Challenges',
          body: 'My challenge was to help homeowners understand the need for the layout of the society and make it an easy process for selecting the car parking spot. Also help owners to tackle the secondary needs of the user. Like Complain / Renting Space.',
        },
        {
          heading: 'My Role',
          body: 'My role as UI/UX Designer was to first research the current methods and propose a new system for helping homeowners to select a proper Parking spot by giving a good visual experience and help them understand the layout.',
        },
      ],
    },
    {
      type: 'features',
      title: 'Tools & Techniques',
      cards: [
        { title: 'Figma', description: '' },
        { title: 'User Research', description: '' },
        { title: 'Identity and Website Design', description: '' },
        { title: 'Prototyping', description: '' },
        { title: 'Wireframes', description: '' },
        { title: 'High-Fidelity', description: '' },
        { title: 'Experience Management', description: '' },
        { title: 'Design System', description: '' },
      ],
    },

    /* ── SLIDE 3 — Context + Problem Statement + Process ── */
    {
      type: 'text',
      id: 'cs-context',
      label: 'Context',
      title: 'Vilas Javdekar & VJ First',
      body: [
        'Special tie-ups with neighborhood destinations. This includes sports facilities, educational institutions and healthcare destinations. VJ homeowners get priority treatment.',
      ],
    },
    {
      type: 'info-grid',
      items: [
        { key: 'Construction Updates', value: 'Real-time progress' },
        { key: 'Legal & Pay', value: 'Documentation & payments' },
        { key: 'Services', value: 'Maintenance & utilities' },
        { key: 'VJ Connect', value: 'Community platform' },
      ],
    },
    {
      type: 'text',
      title: 'VJ - First Vehicle Parking',
      body: [
        'VJ Vehicle Parking is an elegant solution to help VJ users to Book their Parking Slots and avail services around the Vehicle and society regulations.',
      ],
    },
    {
      type: 'callout',
      text: 'How can VJ provide a seamless parking experience for their residents?',
    },
    {
      type: 'steps',
      id: 'cs-discover',
      label: 'Discover',
      title: 'Process',
      steps: [
        {
          num: 1,
          title: 'Discover',
          description: 'User Research, Market Research, Current Methods',
        },
        {
          num: 2,
          title: 'Define',
          description: 'Insights, Goals, Challenges, Features',
        },
        { num: 3, title: 'Develop', description: 'UX, Visuals' },
        {
          num: 4,
          title: 'Deliver',
          description: 'Prototyping, Improvements',
        },
      ],
    },

    /* ── SLIDE 4 — User Research + Market Research ── */
    {
      type: 'text',
      label: 'Discover',
      title: 'User Research',
      body: [],
    },
    {
      type: 'info-grid',
      items: [
        {
          key: 'Mr. Ashish Patil',
          value:
            'Male, 36 years old, working with BCG. Owner of flat B-block, Apartment #207 in Platinum City society in Bangalore.',
        },
        {
          key: 'Mr. Prakash Sharma',
          value:
            'Male, 27 years old, works in IT. Tenant of flat A-block, Apartment #1103 in Essel Tower society in Gurugram.',
        },
      ],
    },
    {
      type: 'pullquote',
      quote: 'I faced difficulty while choosing my parking spot.',
    },
    {
      type: 'text',
      title: 'User Goals — Mr. Ashish Patil',
      body: [
        'Primary Goal: To book a parking spot for their vehicle in the society.',
        'Secondary Goal: To complain for incorrect car parking. Rent his parking space for extra income. Apply for multiple parking (if applicable).',
      ],
    },
    {
      type: 'pullquote',
      quote:
        "I would want an option to choose their parking spot other than the owner's.",
    },
    {
      type: 'text',
      title: 'User Goals — Mr. Prakash Sharma',
      body: [
        "Primary Goal: To choose a different parking slot other than the available owner's parking.",
        'Secondary Goal: To complain for incorrect car parking. Apply for multiple parking (if applicable).',
      ],
    },
    {
      type: 'text',
      title: 'Market Research — Competitive Analysis',
      body: [
        'Analyzed competitor apps including MyGate, NoBrokerHood, Swipe On, Varis, Visitor, and Greety across features like visitor management, parking spots, domestic staff management, utility bill payments, communication management, and more.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/vj/Desktop/4.jpg',
      alt: 'User research personas, quotes, goals, current case analysis and competitive analysis',
    },

    /* ── SLIDE 5 — Findings + Current Methods ── */
    {
      type: 'features',
      label: 'Discover',
      title: 'Findings',
      cards: [
        {
          title: 'NoBrokerHood App',
          description:
            'Can upload documents later on. Verification from society officials is required. No option to add driver details. Visitor entry approval available and their entry-exit logs. No option to report complain. Option to add vehicle details.',
        },
        {
          title: 'MyGate App',
          description:
            'No documents required. No verification or confirmation. No option to add driver details. Visitor entry & exit logs are available. No option to report complain if some other car is parked in their spot.',
        },
        {
          title: 'ItsMyAccount App',
          description:
            'Gives different options for available parking spots. Owner and Tenant can book for car parking. Contact details of car owners is available. Track changes regarding parking lot history and availability.',
        },
      ],
    },
    {
      type: 'text',
      title: 'Current Methods — Society Type 1',
      body: [
        'No digitization, no documentation, cash payment. The user visits the society office, officials verify residency, explain parking layout and rates verbally, user selects a spot, pays by cash, and officials make a record in their system.',
      ],
    },
    {
      type: 'text',
      title: 'Current Methods — Society Type 2',
      body: [
        'No digitization, documentation required, multiple payment modes. User visits the society office, officials ask for documents to verify residency, ask for RC copy of the vehicle for record, explain parking layout and rates, user selects a spot, and multiple payment modes are available.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/vj/Desktop/5.jpg',
      alt: 'Current methods — flow diagrams for Society Type 1 and Society Type 2 parking processes',
    },

    /* ── SLIDE 6 — Insights + Goals ── */
    {
      type: 'features',
      id: 'cs-define',
      label: 'Define',
      title: 'Insights',
      cards: [
        {
          title: '',
          description:
            'People are interested in renting their parking space when its not in use.',
        },
        {
          title: '',
          description:
            "Tenants would want an option to choose their parking spot other than the owner's.",
        },
        {
          title: '',
          description:
            'An interactive society\'s layout can be used to help users book their parking spot.',
        },
        {
          title: '',
          description:
            'Stickers can be removed and RFIDs or FastTag can be leveraged for easy entry and exit in the society.',
        },
        {
          title: '',
          description:
            'Provide car parking norms of the society and any updates in fare or slots should be communicated.',
        },
        {
          title: '',
          description:
            'Car document verification is required and an option to get the car owners details is desired.',
        },
        {
          title: '',
          description:
            'People would want to inform the officials about their guest and can manage with any open parking space for them.',
        },
      ],
    },
    {
      type: 'steps',
      title: 'Goals',
      steps: [
        {
          num: 1,
          title: 'Understand Layout',
          description:
            'Help the house owner to understand need the layout of the society.',
        },
        {
          num: 2,
          title: 'Easy Selection',
          description: 'Easy process for selecting the car parking spot.',
        },
        {
          num: 3,
          title: 'Secondary Needs',
          description:
            'Help to tackle secondary needs of the user. Like Complain / Renting Space.',
        },
      ],
    },

    /* ── SLIDE 7 — User Journey + Features ── */
    {
      type: 'text',
      label: 'Define',
      title: 'User Journey',
      body: [
        'Mapped the complete user journey covering first-time users booking a parking spot, adding RFID or FastTag details, editing vehicle details, renting a parking spot, and filing complaints for incorrect vehicle parking. Each flow includes decision points, success states, and error handling.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/vj/Desktop/7.jpg',
      alt: 'User journey map — full flow diagram for parking spot booking, RFID, complaints',
    },
    {
      type: 'features',
      title: 'Features',
      cards: [
        { title: 'Visitor Management System', description: '' },
        { title: 'Book Parking Spot', description: '' },
        { title: 'Employee Sign In', description: '' },
        { title: 'Multiple Parking Spot', description: '' },
        { title: 'Domestic Staff Management', description: '' },
        { title: 'Maintenance and Utility Bill Payments', description: '' },
        { title: 'Communication Management', description: '' },
        { title: 'Evacuation Management', description: '' },
        { title: 'Complaint Management / Feedback', description: '' },
        { title: 'Digital In & Out Board', description: '' },
        { title: 'Multi-lingual Support', description: '' },
        { title: 'Digital Agreements', description: '' },
        { title: 'ID Badge Printing / Digital', description: '' },
        { title: 'Customization of Features', description: '' },
      ],
    },

    /* ── SLIDE 8 — UX & Wireframe + High Fidelity ── */
    {
      type: 'text',
      id: 'cs-develop',
      label: 'Develop',
      title: 'UX & Wireframe',
      body: [
        'Created low-fidelity wireframes exploring the full parking flow: from the vehicle parking tab, to booking a parking slot, navigation on the society map layout, selecting a parking spot, pricing and payment options, and the final confirmation screen.',
      ],
    },
    {
      type: 'text',
      title: 'High Fidelity',
      body: [
        'Translated wireframes into polished high-fidelity screens featuring the interactive society map, spot selection interface, booking details, payment flow, and confirmation screens.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/vj/Desktop/8.jpg',
      alt: 'UX wireframes and high fidelity screens for the parking booking flow',
    },

    /* ── SLIDE 9 — Visual Style ── */
    {
      type: 'text',
      label: 'Develop',
      title: 'Setting Visual Style',
      body: [],
    },
    {
      type: 'info-grid',
      items: [
        { key: 'Color — Primary', value: '#F66300' },
        { key: 'Color — Secondary', value: '#FFA25F' },
        { key: 'Color — Light Blue', value: '#E6F6FF' },
        { key: 'Color — White', value: '#FFFFFF' },
        { key: 'Color — Black', value: '#000000' },
        { key: 'Color — Blue', value: '#009DF6' },
        { key: 'Color — Green', value: '#3BD378' },
        { key: 'Color — Cream', value: '#FFFDEC' },
      ],
    },
    {
      type: 'info-grid',
      items: [
        { key: 'Primary Typography', value: 'Rubik Bold' },
        { key: 'Secondary Typography', value: 'Bebas Neue' },
      ],
    },
    {
      type: 'info-grid',
      items: [
        { key: 'Layout Type 1', value: 'Text single-column' },
        { key: 'Layout Type 2', value: 'Text double-column' },
        { key: 'Layout Type 3', value: 'Movie Grid with no margins' },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/vj/Desktop/9.jpg',
      alt: 'Visual style — color palette, typography, icons, and layout system',
    },

    /* ── SLIDE 10 — Visuals & Prototyping ── */
    {
      type: 'text',
      id: 'cs-deliver',
      label: 'Deliver',
      title: 'Visuals & Prototyping',
      body: [],
    },
    {
      type: 'text',
      title: 'Onboarding',
      body: [
        'The onboarding flow guides users through selecting their vehicle type (two-wheeler or four-wheeler), viewing the society map layout, and navigating to their wing and floor to explore available parking spots.',
      ],
    },
    {
      type: 'text',
      title: 'Choosing A Spot',
      body: [
        'Users can browse the interactive map, filter by parking type, view available spots with pricing, and walk through the lot with a visual guide before making their selection.',
      ],
    },
    {
      type: 'text',
      title: 'Payment',
      body: [
        'After selecting a spot, users proceed through the booking process, choose a payment method, receive confirmation of their payment, and get a detailed summary of their parking reservation.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/vj/Desktop/10.jpg',
      alt: 'Final high-fidelity screens — onboarding, spot selection, and payment flows',
    },

    /* ── SLIDE 11 — Credits ── */
    {
      type: 'credits',
      credits: [
        { role: 'UX Lead', name: 'Akshita Anand' },
        { role: 'UI/UX Designer', name: 'Parth Pawar' },
      ],
    },

    /* ── Reflections ── */
    {
      type: 'text',
      label: 'Reflections',
      title: 'What I Learned',
      body: [
        'VJ Parivar was a lesson in designing for real-world constraints that no competitive analysis can prepare you for. The biggest insight came from user research: residents did not think about parking as a digital problem. They thought about it as a spatial problem\u2014"I want the spot closest to the elevator." The interactive society map became the core of the experience because it matched the user\u2019s mental model: a physical space, not a list of options.',
        'The competitive analysis revealed that existing apps (MyGate, NoBrokerHood) treated parking as a secondary feature buried in a larger society management platform. By making parking the hero flow\u2014visual map first, details second\u2014we created a more focused experience. This taught me that sometimes the best design strategy is to do one thing well rather than many things adequately.',
      ],
    },

    /* ── Thank You ── */
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
