import type { ProjectMeta } from '@/types/project'

export const uvLight: ProjectMeta = {
  slug: 'uv-light',
  title: 'UV Light Experience',
  subtitle: 'Creating an immersive experience utilizing blacklights, invisible ink, and hidden messages',
  description:
    'Creating an immersive experience utilizing blacklights, invisible ink, and hidden messages, guiding participants through interactive spaces while subtly revealing monitoring, culminating in the revelation of a significant message on portraits.',
  ogImage: 'https://www.designwhich.works/Assets/images/uv-light.jpg',
  heroImage: '/Assets/Projects/UVLight/Desktop/1.jpg',
  projectColor: '#6B46C1',
  tags: ['Installation', 'Experience Design', 'Art'],
  categories: ['install'],
  infoItems: [
    { label: 'Client', value: 'NYU \u2013 ITP' },
    { label: 'Scope of Work', value: 'Experience Design' },
    { label: 'Role', value: 'Artist' },
    { label: 'Duration', value: '2 Weeks' },
    { label: 'Year', value: '2023' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'revolving-stage',
    title: 'Revolving Stage',
    image: '/Assets/images/revolving-stage.jpg',
  },
  bottomNavSections: [
    { id: 'cs-background', label: 'Background' },
    { id: 'cs-exploration', label: 'Exploration' },
    { id: 'cs-making', label: 'Making' },
    { id: 'cs-discovery', label: 'Discovery' },
    { id: 'cs-narrative', label: 'Narrative' },
    { id: 'cs-interaction', label: 'Interaction' },
  ],
  sections: [
    // ── The Concept ──
    {
      type: 'text',
      id: 'cs-background',
      label: 'Background',
      title: 'The Concept',
      body: [
        'Creating an immersive experience using blacklights, invisible ink, UV light, paper, projectors, and hidden messages.',
        'Engaging participants through exploration and discovery within designated spaces.',
        'The concept began with a simple question: what happens when the things you need to see are invisible under normal conditions? UV-reactive materials offered a way to create a layered environment where participants had to actively search for meaning rather than passively receive it. The installation was designed as a journey through multiple rooms, each revealing hidden content only under blacklight.',
        'The thematic anchor was surveillance and visibility \u2014 the tension between being watched and being unaware of it. Participants moved through spaces that appeared ordinary under normal light but transformed under UV illumination, mirroring the way hidden systems of observation operate in everyday life. The experience was designed to provoke reflection on what we choose to reveal, what remains hidden, and who controls the light that makes things visible.',
      ],
    },

    // ── Ideation ──
    {
      type: 'text',
      id: 'cs-exploration',
      label: 'Exploration',
      title: 'Ideation',
      body: [
        'Brainstorming the use of blacklights and invisible ink to create hidden messages and interactive \u201Celevator\u201D spaces.',
        'Aiming for subtle participant monitoring through hidden cameras.',
        'The ideation phase involved extensive material testing \u2014 experimenting with different brands of invisible ink, UV-reactive paints, and fluorescent tapes to determine which materials produced the most vivid and reliable results under blacklight. We tested across several UV wavelength ranges (365nm to 395nm) and discovered that ink visibility varied dramatically depending on the light source, which informed our choice of blacklight fixtures for the final installation.',
        'Early prototypes explored small-scale \u201Celevator\u201D enclosures where a single participant would enter a confined space and discover hidden messages on the walls. We iterated on the spatial design through paper mockups and cardboard prototypes at ITP, testing how different room sizes, lighting angles, and message densities affected the sense of discovery. The hidden camera concept emerged as a way to create an asymmetry of knowledge \u2014 some participants exploring while others observed \u2014 reinforcing the installation\u2019s theme of visible and invisible layers.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/UVLight/Desktop/2.jpg',
      alt: 'Ideation sketches, whiteboard brainstorming, and early process photos',
    },

    // ── Process ──
    {
      type: 'text',
      id: 'cs-making',
      label: 'Making',
      title: 'Process',
      body: [
        'Setting up multiple \u201Celevator\u201D style spaces in rooms with blacklight-covered walls displaying hidden messages.',
        'Allowing participants to explore these areas before directing them to an auditorium with a live feed showing their exploration.',
        'The physical build required transforming two standard ITP classrooms into immersive UV environments. We covered windows and sealed light leaks with blackout fabric, then installed arrays of blacklight LED strips along the ceiling perimeter to ensure even UV coverage across all wall surfaces. Hidden messages were hand-painted onto the walls using invisible ink pens and UV-reactive paint, with content ranging from cryptic phrases to fragments of Van Gogh\u2019s letters.',
        'The auditorium served as the observation room, where a live video feed from cameras in the UV spaces was projected on a large screen. This created a deliberate contrast: participants in the UV rooms experienced discovery and wonder, while those in the auditorium experienced the discomfort of watching others be watched. The technical setup required running long HDMI cables between rooms and calibrating the camera exposure to capture the UV-lit environment accurately, since standard camera settings tend to wash out blacklight scenes.',
      ],
    },

    // ── Research ──
    {
      type: 'text',
      id: 'cs-discovery',
      label: 'Discovery',
      title: 'Research',
      body: [
        'Engaging participants in an immersive journey involving interaction with hidden elements and discovering the \u2018SHOW DON\u2019T TELL\u2019 message displayed on various portraits.',
        'The research phase drew on principles from environmental psychology and immersive theatre design. We studied how installations like Meow Wolf and Punchdrunk\u2019s \u201CSleep No More\u201D guide participants through space without explicit instructions, relying instead on environmental cues, curiosity, and social dynamics. The key finding was that discovery-based experiences work best when the hidden content rewards exploration without punishing those who miss it \u2014 every participant should have a meaningful experience, even if they do not find every hidden message.',
        'We also researched the science of UV fluorescence to understand why certain materials glow under blacklight and others do not. This technical understanding informed our material choices and helped us predict how different surfaces \u2014 paper, fabric, skin, clothing \u2014 would behave in the UV environment. The unexpected fluorescence of everyday items like white t-shirts and teeth became part of the experience, blurring the line between intentional design and accidental discovery.',
      ],
    },

    // ── Unfold of Act ──
    {
      type: 'numbered-list',
      id: 'cs-narrative',
      label: 'Narrative',
      title: 'Unfold of Act',
      items: [
        'Arrival and Grouping \u2014 Participants were organized into groups of four and ushered into the first room.',
        'The UV Revelation \u2014 Initially handed blank paper, attendees discovered hidden drawings under UV light upon entering the room. Each revealed piece contributed to a larger painting.',
        'Projection of \u2018Starry Night\u2019 \u2014 As they worked on their contributions, a projector displayed Van Gogh\u2019s mesmerizing \u2018Starry Night\u2019 video, immersing the space in the artist\u2019s iconic masterpiece.',
        'Completion of the Puzzle Painting \u2014 After completing their individual drawings, participants placed them strategically to form a cohesive puzzle painting resembling Van Gogh\u2019s style.',
        'Transition to the Second Room \u2014 Moving to the next room, attendees found seats furnished with pamphlets containing Van Gogh\u2019s poetry.',
        'Artistic Presentation \u2014 At the center of the room, the performer crafted a small violin out of paper, symbolizing Van Gogh\u2019s passion for art.',
        'Final Act \u2014 Upon finishing the violin, the performer returned to the first room and placed the paper violin at the center of the puzzle painting.',
      ],
    },

    // ── Experience: UV Room Photos ──
    {
      type: 'image-pair',
      images: [
        {
          src: '/Assets/Projects/UVLight/Desktop/3.jpg',
          alt: 'Participants discovering hidden UV drawings and assembling the puzzle painting under blacklight',
        },
        {
          src: '/Assets/Projects/UVLight/Desktop/4.jpg',
          alt: 'Second room with Van Gogh pamphlets, poetry, and seated attendees',
        },
      ],
    },

    // ── Hidden Messages & Portraits ──
    {
      type: 'text',
      id: 'cs-interaction',
      label: 'Interaction',
      title: 'Hidden Messages & Portraits',
      body: [
        'Each participant received a portrait card with seemingly innocent questions \u2014 \u201CHow many cups of coffee have you had since the start of the program?\u201D, \u201CWhat do you enjoy most about your work?\u201D, \u201CHow many hours of sleep do you get daily?\u201D, \u201CWhat do you enjoy about ITP?\u201D, \u201CDraw anything\u201D, and \u201CWhat are your weekend plans?\u201D. Under UV light, the hidden messages and drawings were revealed on these seemingly blank surfaces.',
        'The portrait cards served a dual purpose. On the surface, they were a friendly icebreaker \u2014 casual questions that put participants at ease. But the hidden UV messages on each card, visible only under blacklight, reframed those innocent questions as acts of data collection. The reveal created a moment of surprise and mild discomfort: participants realized they had been willingly sharing personal information, and the hidden layer made them question what else might be recorded without their knowledge.',
        'This interaction mechanic was the conceptual heart of the installation. By making participants complicit in their own observation \u2014 they filled in the cards voluntarily, even enthusiastically \u2014 the piece illustrated how surveillance often operates through consent rather than coercion. The \u201CSHOW DON\u2019T TELL\u201D message, revealed across the assembled portrait cards under UV light, served as both an artistic manifesto and a commentary on the hidden architectures of everyday data collection.',
      ],
    },

    // ── Full-bleed: portrait card ──
    {
      type: 'image',
      src: '/Assets/Projects/UVLight/Desktop/5.jpg',
      alt: 'Portrait cards with hidden UV messages and the blacklight-lit stage floor',
    },

    // ── The Blacklight Stage ──
    {
      type: 'text',
      label: 'Environment',
      title: 'The Blacklight Stage',
      body: [
        'The main stage was transformed into a UV-reactive environment with fluorescent tape markings on the floor, colorful UV dots, and hidden text that only became visible under blacklight. Participants explored the space, discovering hidden elements as they moved through zones of visible and invisible light.',
      ],
    },

    // ── Full-bleed: stage floor + participants ──
    {
      type: 'image',
      src: '/Assets/Projects/UVLight/Desktop/6.jpg',
      alt: 'UV-lit stage with fluorescent floor markings and participants assembling puzzle pieces',
    },

    // ── Participant Interaction ──
    {
      type: 'text',
      label: 'Engagement',
      title: 'Participant Interaction',
      body: [
        'Participants engaged deeply with the installation, examining UV-revealed messages on their cards, viewing hidden drawings through blacklight, and filling out their personal portrait cards with handwritten answers. A live camera feed in the auditorium showed the exploration happening in real-time, adding a subtle layer of monitoring to the experience.',
      ],
    },

    // ── Full-bleed: UV messages + portraits ──
    {
      type: 'image',
      src: '/Assets/Projects/UVLight/Desktop/7.jpg',
      alt: 'Close-ups of UV-revealed messages on cards and participant portraits under blacklight',
    },

    // ── Full-bleed: exploration + live feed ──
    {
      type: 'image',
      src: '/Assets/Projects/UVLight/Desktop/8.jpg',
      alt: 'Participants exploring the UV space, filled-in portrait cards, and live camera feed in the auditorium',
    },

    // ── Credits ──
    {
      type: 'credits',
      credits: [
        { role: 'Artist', name: 'Parth Pawar' },
        { role: 'Artist Collaborators', name: 'Nathan' },
        { role: 'Artist Collaborators', name: 'Lauren' },
        { role: 'Artist Collaborators', name: 'Baiyuian' },
      ],
    },

    // ── Tools and Techniques ──
    {
      type: 'text',
      label: 'Capabilities',
      title: 'Tools and Techniques',
      body: [
        'Fabrication, Research, Interview, Python, Data Visualisation, 3D Printing, Dismantling, Sculptor',
      ],
    },

    // ── My Role ──
    {
      type: 'text',
      label: 'Contribution',
      title: 'My Role',
      body: [
        'My role encompasses conceptualizing and implementing the immersive experience, overseeing the setup of interactive spaces, monitoring systems, and orchestrating participant engagement to reveal the hidden message, ensuring a captivating and impactful journey for all involved.',
      ],
    },

    // ── Reflections ──
    {
      type: 'text',
      label: 'Reflections',
      title: 'What I Learned',
      body: [
        'The UV Light Experience was my first project where the design medium was space itself, not a screen. The key insight was that participatory installations require a careful balance between structure and freedom. Too much direction and participants feel herded; too little and they miss the hidden elements entirely. The solution was environmental cues\u2014UV-reactive tape on the floor subtly guided movement without explicit instructions.',
        'The live camera feed added an unexpected layer. Participants in the auditorium watched others explore the UV rooms, creating a voyeuristic tension that reinforced the installation\u2019s theme of hidden observation. This was not planned\u2014it emerged from the setup. It taught me that the best design moments often come from responding to emergent behavior rather than scripting every interaction.',
      ],
    },

    // ── Thank You ──
    {
      type: 'thank-you',
    },
  ],
}
