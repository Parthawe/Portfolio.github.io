import type { ProjectMeta } from '@/types/project'

export const revolvingStage: ProjectMeta = {
  slug: 'revolving-stage',
  title: 'Designing Revolving Stage',
  subtitle: 'For Theatre Play',
  description:
    'Designed and engineered a revolving stage for a theatre play at Firodia Karandak. A 15 ft. rotating platform supporting 250+ kgs, enabling seamless scene transitions for a 65+ person production.',
  ogImage: 'https://www.designwhich.works/Assets/images/revolving-stage.jpg',
  heroImage: '/Assets/Projects/RevolvingStage/Desktop/1.jpg',
  projectColor: '#B7791F',
  tags: [],
  categories: ['install'],
  infoItems: [
    { label: 'Client', value: 'Firodia Karandak' },
    { label: 'Scope of Work', value: 'Design, Production, Engineering' },
    { label: 'Role', value: 'Engineer & Art Director' },
    { label: 'Duration', value: '3 Months' },
    { label: 'Year', value: '2022' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'the-omakase',
    title: 'The Omakase',
    image: '/Assets/images/the-omakase.jpg',
  },
  bottomNavSections: [
    { id: 'cs-engineering', label: 'Engineering' },
    { id: 'cs-design', label: 'Design' },
    { id: 'cs-result', label: 'Result' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  sections: [
    // ── Summary / Headline ──
    {
      type: 'callout',
      text: 'Theatrical device to move 15 ft. to 8 ft. to 16 ft. the stage for scene changes in Theatre Play.',
    },

    // ── Summary, Challenges, Role, Tools info grid ──
    {
      type: 'info-grid',
      items: [
        {
          key: 'Summary',
          value:
            'Revolving stage, theatrical device for scene changes, or shifts, by which three or more settings are constructed on a turntable around a central pivot and revolved before the audience.',
        },
        {
          key: 'The Challenges',
          value:
            'The Main Challenge was to design an Axle to support and revolve and 15ft by 8ft stage base, with almost 250+ kgs baring on it. Also giving stability for actors to stand and perform on it. As the timeline was to plan & complete this in 3 months while leading a team of 65+ people, had its own merits.',
        },
        {
          key: 'My Role',
          value:
            'As an Art Director, I had to design and engineer Axile and the complete stage with different scenes according to the Theatrical Play while administrating and leading 65+ people.',
        },
        {
          key: 'Tools & Techniques',
          value:
            'Mechanical Engineering, Welding, Carpentry, Drill, Concept Development, Stage Production, Theatre \u2013 Tech, Stage Management, Stage Production, Scene Types',
        },
      ],
    },

    // ── Slide 2 image ──
    {
      type: 'image',
      src: '/Assets/Projects/RevolvingStage/Desktop/2.jpg',
      alt: 'Overview slide \u2014 summary, challenges, role, tools and 3D stage rotation diagrams',
    },

    // ── Slide 3: Revolving Stage Concept (isometric) ──
    {
      type: 'image',
      src: '/Assets/Projects/RevolvingStage/Desktop/3.jpg',
      alt: 'Isometric view showing the revolving stage rotating anticlockwise 135 degrees above the audience seating area',
    },

    // ── Mechanical Design ──
    {
      type: 'text',
      id: 'cs-engineering',
      label: 'Engineering',
      title: 'Mechanical Design',
      body: [
        'The stage assembly consists of four main components: the wooden revolving stage (15 ft. expansion), a central axle, a caster wheel bearing assembly arranged in a circular pattern, and an 8 ft. \u00D7 8 ft. wooden base. The entire structure is designed for disassembly and transport.',
        'Each component was engineered to balance structural integrity with practical constraints. The revolving platform needed to support at least 250 kg of static load \u2014 multiple actors, furniture, and set dressing \u2014 while rotating smoothly enough that transitions could happen during live scenes without distracting the audience. The wooden base distributes weight across the venue floor to prevent point loading that could damage the stage surface.',
        'The modular design was critical because the entire assembly had to be transported to the venue, assembled on-site in a single day, and struck after the final performance. Every joint, bolt, and connection point was designed for tool-free or minimal-tool assembly, and the components were sized to fit through standard doorways and load into a standard truck bed.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/RevolvingStage/Desktop/4.jpg',
      alt: 'Exploded isometric view \u2014 wooden revolving stage, axle, caster wheel bearing assembly, and wooden base with dimensions',
    },

    // ── Axle ──
    {
      type: 'text',
      label: 'Engineering',
      title: 'Axle',
      body: [
        'Axle is a device used in theatrical play production to support and move various props and set pieces. It consists of a rod or spindle that is either fixed or rotating, passing through the centre of a wheel or group of wheels. The axle is designed to enable props and set pieces to be lifted, rotated and moved in any direction on stage. It is often used to swiftly and safely move large props and scenery pieces in a controlled manner during a performance.',
        'The axle assembly is composed of the following components: Steel Plate 1 (1 ft. \u00D7 1 ft.), Shaft, Thrust Bearing, Ball Bearing, Bearing, Steel Plate 2.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/RevolvingStage/Desktop/5.jpg',
      alt: 'Exploded view of the axle assembly \u2014 steel plates, shaft, thrust bearing, ball bearing, and bearing components',
    },

    // ── Caster Wheel & Bearing Assembly ──
    {
      type: 'text',
      label: 'Engineering',
      title: 'Caster Wheel & Bearing Assembly',
      body: [
        "Wheels hold up the weight of the revolve. While it's desirable if a plain wagon moves quietly, it's even more important for our revolve, because one of this stage equipment unit is that it doesn't draw attention to itself by rumbling and squeaking. So we need wheels that will operate without making noise.",
        'The caster wheels are arranged in a circular pattern on the 8 ft. base, with a 4 ft. radius, providing even weight distribution and smooth, silent rotation for the entire stage platform.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/RevolvingStage/Desktop/6.jpg',
      alt: 'Caster wheel detail and circular bearing assembly arrangement on the base \u2014 8 ft. diameter layout',
    },

    // ── Revolving Stage physics ──
    {
      type: 'text',
      label: 'Engineering',
      title: 'Revolving Stage',
      body: [
        'For present purposes, a revolve is a circular disk, capable of supporting the same loads as the stage floor, lying in a horizontal plane and turning around a fixed center. You can conceive of a unit that violates any point of this definition; the victim\'s wheel in a knife-throwing act is not horizontal, a lightweight set piece can be revealed with a pie stand or a table mounted on a dowel rod, and so forth. I won\'t take up any of those cases.',
        "The disk has to be fairly stiff, because we don't want set elements built on it to flex when the unit moves. We don't look for perfect rigidity; maybe we could build a 16- or 18-foot circle with no give in it, but even a sound floor sags a little when loaded, so there's no point incurring the vast expense of a perfect revolve to stand on an imperfect deck.",
        'If the disk is more than a handspan across, it has to have support other than at the middle. A big revolve with all its weight concentrated at the center would punch right through the deck, making us no friends in the theater.',
        'The forces on a revolve can be broken down (resolved) into vertical or gravity forces and lateral or thrust forces. Most of the thrusts act when we turn the unit, but lateral forces arise in violent action and even when someone steps on or off. If the revolve is stationary and no one is mounting or dismounting, gravity is the only force that acts on it. It will simplify design and construction if we can use one system to handle thrust and a different system to handle weight.',
        "That won't quite happen, but we'll make the effort. In building theater equipment, most of us think in terms of wood and metal. There's a lot to be said for iron as a load-bearing material; your favorite freight elevator is chock-full of it.",
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/RevolvingStage/Desktop/7.jpg',
      alt: 'Revolving stage shown at multiple rotation angles \u2014 clockwise 45 degrees, angle 0 degrees, anti-clockwise 45 and 90 degrees',
    },

    // ── Final Stage Design ──
    {
      type: 'features',
      id: 'cs-design',
      label: 'Design',
      title: 'Final Stage Design',
      cards: [
        {
          title: 'Cafe 1',
          description:
            'Cafe 1 is an indoor high end cafe to give a feel of luxury and casual meetups. It was specifically used in Key Script play (2nd and 5th Scene) as the protagonist develop their story.',
        },
        {
          title: 'Revolving Stage',
          description:
            'Revolving Stage was the centre piece of the act, as it performed as multiple stages inside one frame itself. The Building View, Corner Street View & Garden view were showcased using this stage dynamic.',
        },
        {
          title: 'Cafe 2',
          description:
            'Cafe 2 was set as a foreground for Musicians to help give the inclusivity in the act.',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/RevolvingStage/Desktop/8.jpg',
      alt: 'Final stage design \u2014 front elevation showing Cafe 1, central revolving stage with umbrella, and Cafe 2',
    },

    // ── In Action ──
    {
      type: 'text',
      id: 'cs-result',
      label: 'Result',
      title: 'In \u2013 Action',
      body: [
        'The revolving stage in live performance \u2014 capturing scene transitions, actor interactions, and the dynamic set changes during the theatrical play at Firodia Karandak.',
        'During the performance, the stage executed over a dozen rotations across seven scene changes, each completed in under fifteen seconds. The backstage crew operated the rotation manually using a concealed push bar, with cue lights coordinated through the stage manager. The silent caster wheels proved essential \u2014 audience members later reported being unaware of the mechanical system beneath the set, perceiving the transitions as seamless and almost magical.',
        'The most dramatic moment came during the climactic scene change, where the stage rotated a full 135 degrees while actors remained on the platform, continuing their dialogue as the environment transformed around them. This technique, borrowed from professional revolving stages used in Broadway and West End productions, was adapted to work within the budget and material constraints of a college-level competition \u2014 demonstrating that theatrical ambition does not require a professional-grade budget, only careful engineering and creative problem-solving.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/RevolvingStage/Desktop/9.jpg',
      alt: 'Photo collage of the revolving stage in action during live theatrical performances at Firodia Karandak',
    },

    // ── Credits ──
    {
      type: 'credits',
      credits: [
        { role: 'Director', name: 'Apoorva Joglikar' },
        { role: 'Art Director', name: 'Parth Pawar' },
        { role: 'Backstage Head', name: 'Vaishnavi Vaidya' },
        {
          role: 'Special Help',
          name: 'Karan, Parth Ghamande, Prathamesh Kulkarni, Amey Shelke',
        },
        {
          role: 'Technical Team',
          name: 'Omkar Mahale, Omkar Sardeshpande, Akshit Mahale, Kedar Deshpande, Saumeen Phanasalkar, Nilay Diwan',
        },
        {
          role: 'Acting Dance & Music Team',
          name: 'Shreya Lunkad, Varun Khalate, Sakshi Kanav, Sahil Taskar, Prathamesh Londhe, Saumya Deshmukh, Ritika Sisodiya',
        },
        {
          role: 'Artist Team',
          name: 'Shalaka Deo, Shrutika Nandurkar, Vaishnavi, Isha Patil',
        },
        {
          role: 'Lights',
          name: 'Umang Pathrabe, Adityaraj HonRaopatil',
        },
        {
          role: 'Backstage Team',
          name: 'Paresh Gokhale, Aryan Shinde, Aryan Karande, Pushkar Nerpagar, Anshuman Gramkar, Savant Bonthe, Soham Phadke, Vinayak Sawandkar, Shalmali Bhalero, Prathamesh Hawale, Shaunak Yevatkar, Saloni Nimgaonkar, Arya Joshi, Eshan Mehendale, Divya Kamalskar, Gaush Mukkawar, Parth Nevase, Karan',
        },
        {
          role: 'Additional Team',
          name: 'Apoorva Joglikar, Gaurav Waghmare, Mrunal Barve, Mandar Saraf, Parth Ghamande, Aditya Puntambekar, Pratik Hubikar, Aditya Dere, Radhika, Ojas Natu, Aditya Raje',
        },
      ],
    },

    // ── Tools & Techniques (bottom section) ──
    {
      type: 'text',
      title: 'Tools and Techniques',
      body: [
        'Mechanical Engineering, Welding, Carpentry, Stage Production, Drill, Concept Development, Stage Management, Theatre \u2013 Tech',
      ],
    },

    // ── Reflections ──
    {
      type: 'text',
      id: 'cs-reflections',
      label: 'Reflections',
      title: 'What Building a Stage Taught Me About Design',
      body: [
        'The revolving stage was the project that taught me design is not a visual discipline\u2014it is a systems discipline. Every aesthetic decision was also a structural decision. The parallax effect I wanted required specific material thicknesses. The scene transitions I designed required specific rotation speeds. The lighting I planned required specific electrical loads. If any one system failed, the whole production failed.',
        'Leading 65+ people also taught me that clarity of specification is the most underrated design skill. When I handed a carpenter a drawing with exact dimensions, paint codes, and assembly sequence, the result matched my intent. When I handed them a sketch and said \u201Cmake it look like this,\u201D the result required three revisions. Design systems work the same way\u2014the more precisely you define the rules, the more reliably other people can execute without you.',
      ],
    },

    // ── Thank You ──
    {
      type: 'thank-you',
    },
  ],
}
