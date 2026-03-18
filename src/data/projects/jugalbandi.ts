import type { ProjectMeta } from '@/types/project'

export const jugalbandi: ProjectMeta = {
  slug: 'jugalbandi',
  title: 'Jugalbandi',
  subtitle:
    'A duet between traditional analog instruments and modern digital MIDI \u2014 where neural networks become playable music',
  description:
    'Jugalbandi showcases a unique blend of traditional analog mechanical instruments and modern digital MIDI instruments \u2014 a physical computing art installation created at NYU ITP.',
  ogImage: 'https://www.designwhich.works/Assets/images/jugalbandi.png',
  heroImage: '/Assets/images/jugalbandi.png',
  projectColor: '#8B4513',
  tags: ['Physical Computing', 'Music', 'Art Installation'],
  infoItems: [
    { label: 'Year', value: '2024' },
    { label: 'Role', value: 'Artist' },
    { label: 'Context', value: 'NYU \u2013 ITP' },
    { label: 'Duration', value: '5 Months' },
  ],
  backLink: { label: '\u2190 Back to Work', href: '/work' },
  nextProject: {
    slug: 'vj-software',
    title: 'VJ Software',
    image: '/Assets/images/vj.jpg',
  },
  bottomNavSections: [
    { id: 'cs-background', label: 'Background' },
    { id: 'cs-research', label: 'Research' },
    { id: 'cs-instrument', label: 'The Instrument' },
    { id: 'cs-process', label: 'Process' },
    { id: 'cs-reflection', label: 'Reflection' },
  ],
  categories: ['creative'],
  sections: [
    // ── Hero Image ──
    {
      type: 'image',
      src: '/Assets/images/jugalbandi.png',
      alt: 'Jugalbandi \u2014 performer playing the Hexa-18 instrument on a dark stage with mechanized instruments',
    },

    // ── Overview ──
    {
      type: 'overview',
      columns: [
        {
          heading: 'A duet in Hindi',
          body: 'Jugalbandi (meaning \u201ca duet\u201d in Hindi) showcases a unique blend of traditional analog mechanical instruments and modern digital MIDI instruments. The project is a physical computing art installation that materialises the inner workings of neural networks into tangible, playable musical instruments.\n\nIn Indian classical music, a jugalbandi is a performance where two lead musicians engage in a dialogue, trading phrases, responding to each other\u2019s improvisations, and building toward a shared climax. This installation reimagines that tradition: one \u201cmusician\u201d is a human performer, and the other is a neural network expressed through mechanized acoustic instruments. The conversation between them unfolds in real time, with the network\u2019s outputs driving physical sound-making devices that respond to the performer\u2019s gestures.\n\nExhibited at the ITP Spring Show and Maker Faire Coney Island in 2024, Jugalbandi invited audiences to witness computation as something audible and embodied rather than abstract and screen-bound. The installation occupied a darkened stage where visitors could watch servos pluck strings, solenoids drive air through pipes, and vibration motors pulse against resonant surfaces \u2014 all choreographed by a live neural network.',
        },
      ],
    },

    // ── 01 \u2014 Background ──
    {
      type: 'text',
      id: 'cs-background',
      label: '01 \u2014 Background',
      title: 'The Concept',
      body: [
        'The genesis of this project drew inspiration from the \u2018Abacus\u2019 project undertaken at panGenerator Studio. While the Abacus focused on recognizing digits, Jugalbandi operates on a similar concept but transforms neural network processes into acoustic and electronic sound. The core question driving the work was: what if you could hear a machine think?',
        'The installation is a 1:1 interactive physical representation of a real, functioning deep learning network, manifested through musical instruments rather than visual displays. Each hidden layer of the network corresponds to a different instrument or actuator group, so as data propagates through the model, you hear it move \u2014 from the airy tones of the flute layer, through the plucked melodies of the harp, to the percussive textures of the rainsticks. The final output layer produces a MIDI note on the Hexa-18 controller, completing the chain from raw input to musical expression.',
        'The concept also draws deeply from the Indian classical tradition of raga-based improvisation, where a performer follows a set of ascending and descending note patterns but is free to embellish and interpret within those constraints. Similarly, the neural network operates within its trained weights, yet produces outputs that feel spontaneous and alive when expressed through mechanical instruments whose physical tolerances introduce subtle variations in timing, pitch, and dynamics.',
      ],
    },
    {
      type: 'info-grid',
      items: [
        {
          key: 'Inspiration',
          value: 'panGenerator Studio \u2014 \u201cThe Abacus\u201d',
        },
        {
          key: 'Approach',
          value:
            'Translate neural network layers into tangible, playable acoustic and electronic mechanisms',
        },
      ],
    },

    // ── 02 \u2014 Research ──
    {
      type: 'text',
      id: 'cs-research',
      label: '02 \u2014 Research',
      title: 'Materialise Neural Networks',
      body: [
        'Deep learning networks are a type of artificial neural network (ANN) with multiple layers of processing units. Each layer learns to perform a specific task, and the layers work together to learn complex patterns in data. Jugalbandi maps these layers to physical sound-making mechanisms \u2014 each layer of the network controls a different instrument or actuator.',
        'The research phase involved two parallel tracks. On the technical side, I studied convolutional neural network architectures and trained custom models using ML5.js and TensorFlow, experimenting with how intermediate layer activations could be extracted in real time and converted to MIDI signals. On the cultural side, I researched Indian classical music structures \u2014 particularly the concepts of tala (rhythmic cycles), raga (melodic frameworks), and jugalbandi itself as a performance format \u2014 to find meaningful ways to map computational processes onto musical traditions that already have a language for structured improvisation.',
        'A key insight from the research was that neural network activations are not random noise; they have structure, clustering, and dynamics that shift as data moves through the model. By assigning specific ragas to different activation ranges and tying rhythmic density to confidence scores, the output became musically coherent rather than chaotic. The mapping was not purely algorithmic \u2014 it required hundreds of hours of listening, tuning, and compositional judgment to find assignments that sounded intentional.',
      ],
    },
    {
      type: 'callout',
      text: 'Original artform inspired by panGenerator Studio \u2014 called \u201cThe Abacus,\u201d which uses digits as the final output. Jugalbandi replaces digits with musical notes.',
    },
    {
      type: 'info-grid',
      items: [
        { key: 'Reference Year', value: '2021' },
        {
          key: 'Credits',
          value:
            'Krzysztof Cybulski, Krzysztof Goli\u0144ski, Jakub Ko\u017Aniewski, Wojciech Stokowiec',
        },
        {
          key: 'Reference',
          value: 'pangenerator.com/projects/the-abacus/',
        },
      ],
    },

    // ── 03 \u2014 The Instrument ──
    {
      type: 'text',
      id: 'cs-instrument',
      label: '03 \u2014 The Instrument',
      title: 'Hexa-18',
      body: [
        'Hexa-18 is a custom-built hexagonal instrument that combines three distinct sound-making mechanisms into a single sculptural form \u2014 wind, string, and percussion. Each face of the polyhedron serves a different acoustic or electronic function, and the geometry itself became a design constraint that shaped the instrument\u2019s voice.',
        'The name references its eighteen active faces across three hexagonal tiers, each tier dedicated to one of the three sound families. The form factor was chosen both for structural rigidity \u2014 hexagons tessellate efficiently and distribute mechanical stress \u2014 and for its visual resonance with the node-and-edge diagrams commonly used to illustrate neural networks. When all three tiers are active simultaneously, the instrument produces a layered, polyphonic texture that shifts as the neural network\u2019s internal state evolves.',
        'Building the Hexa-18 required extensive prototyping in laser-cut acrylic and plywood, with multiple iterations to solve acoustic coupling problems. Early versions suffered from unwanted resonance between the percussion and string tiers, which was addressed by introducing damping layers of neoprene foam between each hexagonal platform. The final instrument stands roughly 1.2 meters tall and weighs approximately 15 kilograms, designed to be both visually striking under stage lighting and structurally stable enough to withstand the vibrations of a full performance.',
      ],
    },
    {
      type: 'features',
      label: '03 \u2014 The Instrument',
      title: 'Hexa-18',
      cards: [
        {
          title: 'Wind',
          description:
            'Air-driven pipes of varying heights produce different tonal frequencies, controlled by solenoid valves.',
        },
        {
          title: 'String',
          description:
            'Servo-actuated plucking mechanisms produce melodic sequences through algorithmically composed patterns.',
        },
        {
          title: 'Percussion',
          description:
            'Speaker cones and vibration motors embedded in hexagonal faces create rhythmic, percussive textures.',
        },
        {
          title: 'Sculpture',
          description:
            'The hexagonal form is both a visual art piece and a functional instrument \u2014 each face serves a purpose.',
        },
      ],
    },

    // ── 04 \u2014 Components: Mechanized Harp ──
    {
      type: 'text',
      label: '04 \u2014 Components',
      title: 'Mechanized Harp',
      body: [
        'The mechanized harp is built inside a wooden frame and uses servo motors to pluck individual strings automatically. An Arduino Mega controls the timing and sequencing of each pluck, allowing for algorithmically composed melodies that respond to the neural network\u2019s hidden layer activations in real time.',
        'Each string is tuned to a note within the selected raga, so regardless of which combination the network triggers, the output remains harmonically consistent. The servo arms are fitted with flexible nylon picks that approximate the timbre of a finger pluck, and the tension of each string was calibrated by hand to ensure consistent volume across the register. Getting the servos to release cleanly without damping the string prematurely was one of the most time-consuming mechanical challenges of the entire build.',
        'In performance, the harp functions as the melodic voice of the network\u2019s middle layers \u2014 a kind of singing commentary on the data flowing through the system. Its tone is warm and organic, providing a counterpoint to the sharper electronic sounds of the MIDI output layer and grounding the installation in something recognizably acoustic and human.',
      ],
    },
    {
      type: 'info-grid',
      items: [
        { key: 'Controller', value: 'Mega Arduino' },
        { key: 'Actuators', value: 'Servo Motors' },
        { key: 'Materials', value: 'Wire Mesh, Harp, Wood Frame' },
      ],
    },

    // ── 05 \u2014 Component: Automated Flute ──
    {
      type: 'text',
      label: '05 \u2014 Component',
      title: 'Automated Flute',
      body: [
        'The automated flute uses an air pump to push air through the blowing hole, while servo motors actuated by Lego mechanisms open and close the finger holes to produce different notes. The entire assembly is controlled by a Mega Arduino that receives pitch commands from the neural network\u2019s early convolutional layers.',
        'Achieving a clean, playable tone from an automated flute proved to be the project\u2019s most demanding engineering challenge. The angle of airflow across the blowing hole had to be precise to within a few degrees; even small shifts caused the note to drop out entirely or jump to an overtone. A custom 3D-printed nozzle was designed to direct air at the correct embouchure angle, and a PWM-controlled pump allowed dynamic control of air pressure so that the instrument could play both soft and loud passages.',
        'The Lego-based finger mechanisms were chosen for rapid prototyping and easy adjustment. Each finger assembly uses a small servo arm pressing a silicone pad over the tone hole, creating an airtight seal. The use of Lego allowed quick iteration on lever ratios and mounting positions without the lead time of custom fabrication, and the playful materiality of the Lego bricks added an unexpected visual charm to the instrument that audiences responded to warmly.',
      ],
    },
    {
      type: 'info-grid',
      items: [
        { key: 'Air Source', value: 'Air Pump' },
        { key: 'Actuators', value: 'Servo Motors' },
        { key: 'Controller', value: 'Mega Arduino' },
        { key: 'Structure', value: 'Legos, Clamp, Blowing Hole' },
      ],
    },

    // ── 06 \u2014 Component: Rainsticks ──
    {
      type: 'text',
      label: '06 \u2014 Component',
      title: 'Rainsticks',
      body: [
        'The rainstick module is mounted on a wooden structure and uses servo motors to tilt and rotate cardboard rainsticks, producing cascading percussive sounds. A dedicated circuit board coordinates the timing of each tilt to layer rhythmic patterns that mirror the activation density of the network\u2019s pooling layers.',
        'Rainsticks were chosen for their inherently stochastic sound \u2014 the beads tumbling through internal pins produce a texture that is never exactly the same twice, much like the probabilistic nature of neural network inference. By varying the tilt angle and speed, the installation controls the density and duration of the cascading sound, from a sparse trickle to a dense, enveloping wash. This made the rainsticks an ideal physical analogue for the pooling layers, which compress and summarize information.',
        'The wooden mounting frame was designed to hold four rainsticks at different angles, each driven by its own servo. The cardboard tubes were filled with a mixture of rice grains and small glass beads to produce a richer frequency spectrum than either material alone. Tuning the fill amount and pin density inside each stick was an iterative, hands-on process that blended craft with computation \u2014 a fitting metaphor for the project as a whole.',
      ],
    },
    {
      type: 'info-grid',
      items: [
        { key: 'Actuators', value: 'Servo Motors' },
        { key: 'Structure', value: 'Wooden Frame' },
        { key: 'Sound Source', value: 'Rainsticks' },
        { key: 'Electronics', value: 'Circuit Board' },
      ],
    },

    // ── 07 \u2014 Process: Tools and Techniques ──
    {
      type: 'steps',
      id: 'cs-process',
      label: '07 \u2014 Process',
      title: 'Tools and Techniques',
      body: [
        'Neural Networks',
        'Machine Learning (ML5.JS)',
        'Fabrication',
        'Data Analysis',
        'Dataset',
        'Critical Thinking',
        'Physical Computing',
        'Electronics',
      ],
      steps: [
        {
          num: 1,
          title: 'Research & Data',
          description:
            'Studied neural network architectures and built custom training datasets for musical pattern recognition.',
        },
        {
          num: 2,
          title: 'Prototyping',
          description:
            'Designed and fabricated mechanical instrument prototypes using Arduino, servos, and found materials.',
        },
        {
          num: 3,
          title: 'Integration',
          description:
            'Connected ML models to physical actuators, mapping network outputs to musical notes and rhythms.',
        },
        {
          num: 4,
          title: 'Performance',
          description:
            'Staged a live performance where the artist and machine played together as a duet \u2014 Jugalbandi.',
        },
      ],
    },

    // ── 08 \u2014 Reflection ──
    {
      type: 'text',
      id: 'cs-reflection',
      label: '08 \u2014 Reflection',
      title: 'What Building Jugalbandi Taught Me',
      body: [
        'Jugalbandi was the project where I learned that the hardest part of interdisciplinary work is not the technology\u2014it is the translation layer between domains. Making a neural network \u201cplay music\u201d sounds straightforward until you realize that the network\u2019s output (a probability distribution across 10 digits) has no inherent musical meaning. The design challenge was not building the instrument; it was defining the mapping between abstract computation and physical sound in a way that felt musically coherent rather than arbitrary.',
        'The mechanical instruments themselves taught me about material constraints. The automated flute, for instance, required precise air pressure to produce clean tones\u2014too little and the note was breathy, too much and it overblew into a harmonic. Servo motors introduced timing latency that made fast passages impossible. These physical limitations forced compositional choices: slow, contemplative pieces that worked within the mechanism\u2019s capabilities rather than fighting them.',
        'Exhibiting at ITP Spring Show and Maker Faire Coney Island showed me that people engage differently with computational art when it has a physical presence. Visitors who would scroll past a screen-based neural network visualization spent 10+ minutes with Jugalbandi because they could hear the computation, see the mechanisms move, and feel the vibrations. Embodiment changes comprehension.',
      ],
    },

    // ── 09 \u2014 Credits ──
    {
      type: 'credits',
      credits: [
        { role: 'Artist', name: 'Parth' },
        { role: 'Mentor', name: 'David Rios' },
        { role: 'Mentor', name: 'Phil Caridi' },
        { role: 'Shot & InFrame', name: 'Virendra Pawar' },
      ],
    },
    {
      type: 'credits',
      credits: [
        { role: 'Studio', name: 'panGenerator' },
        { role: 'Team', name: 'Krzysztof Cybulski' },
        { role: 'Team', name: 'Krzysztof Goli\u0144ski' },
        { role: 'Team', name: 'Jakub Ko\u017Aniewski' },
        { role: 'Team', name: 'Wojciech Stokowiec' },
      ],
    },

    // ── Thank You ──
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
