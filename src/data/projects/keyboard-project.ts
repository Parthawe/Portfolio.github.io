import type { ProjectMeta } from '@/types/project'

export const keyboardProject: ProjectMeta = {
  slug: 'keyboard-project',
  title: 'BreakGen',
  subtitle: 'A modular keyboard design platform that democratizes hardware creation through AI-generated keycaps, intuitive layout tools, and automated PCB generation',
  description: 'BreakGen — a modular keyboard design platform that democratizes hardware creation through AI-generated keycaps, intuitive layout tools, and automated PCB generation. ITP Thesis at NYU.',
  ogImage: 'https://www.designwhich.works/Assets/images/keyboard.jpg',
  heroImage: '/Assets/images/keyboard.jpg',
  projectColor: '#5C6B3A',
  tags: ['Creative Tech', 'Hardware', 'Machine Learning', 'UX/UI'],
  infoItems: [
    { label: 'Role', value: 'Designer & Developer' },
    { label: 'Context', value: 'ITP Thesis, NYU' },
    { label: 'Timeline', value: '2024\u20132025' },
    { label: 'Stack', value: 'React, Three.js, Meshy AI, KiCad' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: { slug: 'jugalbandi', title: 'Jugalbandi', image: '/Assets/images/jugalbandi.png' },
  categories: ['creative'],
  bottomNavSections: [
    { id: 'cs-concept', label: 'Concept' },
    { id: 'cs-research', label: 'Research' },
    { id: 'cs-architecture', label: 'Architecture' },
    { id: 'cs-process', label: 'Process' },
    { id: 'cs-fabrication', label: 'Fabrication' },
    { id: 'cs-outcome', label: 'Outcome' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  sections: [
    // ── Overview ──────────────────────────────────────────────────
    {
      type: 'overview',
      columns: [
        {
          heading: 'Summary',
          body: 'BreakGen is a web-based platform where users design fully custom mechanical keyboards from scratch. They select key feel, generate AI-personalized keycaps, build ergonomic layouts, and receive auto-generated PCBs ready for fabrication. The project bridges the gap between desire and ability in the DIY keyboard community \u2014 making deep customization accessible to people without engineering backgrounds.',
        },
        {
          heading: 'The Challenge',
          body: 'Custom keyboards are one of the most vibrant hardware subcultures online, but the technical barriers to creating one from scratch are enormous. PCB design requires EDA software expertise, ergonomic layout planning demands spatial reasoning and engineering knowledge, and firmware configuration assumes programming fluency. Most enthusiasts end up buying pre-made boards or waiting months for group buys they cannot influence \u2014 never getting the keyboard that truly fits their hands, workflow, and aesthetic.',
        },
        {
          heading: 'My Role',
          body: 'Sole designer and developer. Responsible for concept development, UX/UI design, frontend development (React + Three.js), AI pipeline integration (Meshy AI), PCB auto-generation logic (KiCad), physical prototyping (3D printing, laser cutting, CNC), and thesis presentation. ITP Thesis project at NYU\u2019s Interactive Telecommunications Program, advised by Luisa Pereira.',
        },
        {
          heading: 'Tools & Techniques',
          body: 'React, Three.js, Spline, Meshy AI, KiCad, 3D Printing, Laser Cutting, CNC Milling',
        },
      ],
    },

    // ── 01 — Concept ──────────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-concept',
      label: '01 \u2014 Concept',
      title: 'Breaking Things to Understand Them',
      body: [
        'BreakGen started with something personal: the childhood practice of disassembling toys, electronics, and household objects to understand how they work. That impulse\u2014to crack open a black box and see the mechanism inside\u2014is the same one that drives the mechanical keyboard community.',
        'Custom keyboards are one of the most vibrant hardware subcultures online, but there is a stark gap between aspiration and execution. Thousands of enthusiasts want a keyboard that feels, sounds, and looks exactly right, but the technical barriers\u2014PCB design, firmware configuration, ergonomic layout planning\u2014keep most people buying pre-made boards or paying a premium for group buys they cannot influence.',
        'BreakGen addresses this directly. It is a platform that lets anyone walk through the full keyboard creation process: choosing switch feel, generating personalized keycap designs with AI, arranging an ergonomic layout, and exporting a production-ready PCB\u2014all without opening KiCad or writing a line of firmware.',
      ],
    },
    {
      type: 'callout',
      text: 'The thesis question driving BreakGen: can generative AI and parametric design tools collapse the expertise barrier in hardware creation without sacrificing the depth, quality, or joy of making something with your hands?',
    },

    // ── 02 — Research ─────────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-research',
      label: '02 \u2014 Research',
      title: 'Understanding the Landscape',
      body: [
        'Before building, I spent weeks embedded in the mechanical keyboard community \u2014 reading build logs on r/MechanicalKeyboards, joining Discord servers, attending ITP open labs with keyboard enthusiasts, and cataloging the tools people actually used (and the points where they gave up).',
      ],
    },
    {
      type: 'info-grid',
      items: [
        {
          key: 'PCB Design Barrier',
          value: 'KiCad and EasyEDA are powerful but assume electronics engineering knowledge. Most enthusiasts abandon custom PCB design after encountering schematic editors for the first time.',
        },
        {
          key: 'Keycap Customization Gap',
          value: 'Keycap design is either mass-produced (limited choices) or artisan (expensive, months-long waits). There is no middle ground for personal expression at accessible price points.',
        },
        {
          key: 'Fragmented Toolchain',
          value: 'Building a custom keyboard requires jumping between 5\u20138 different tools: layout editors, CAD software, EDA tools, firmware generators, and fabrication services. Each transition is a drop-off point.',
        },
      ],
    },
    {
      type: 'text',
      title: 'User Interviews',
      body: [
        'I conducted interviews with 8 ITP students and keyboard community members ranging from complete beginners to experienced builders. Three recurring themes shaped the platform direction:',
      ],
    },
    {
      type: 'numbered-list',
      title: 'User Interview Themes',
      items: [
        '<strong>Creative intent without technical fluency:</strong> Most users could articulate exactly what they wanted their keyboard to feel and look like, but could not translate that vision into the technical specifications required by existing tools.',
        '<strong>Decision fatigue from options overload:</strong> Cherry MX Red vs. Gateron Yellow vs. Kailh Box White \u2014 the sheer number of switch options paralyzed new users. They wanted guidance, not a catalog.',
        '<strong>The \u201clast mile\u201d problem:</strong> Several experienced builders described getting 80% through a custom build and then stalling at PCB routing or firmware configuration \u2014 the most technical and least creative steps in the process.',
      ],
    },

    // ── 03 — Architecture ─────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-architecture',
      label: '03 \u2014 Architecture',
      title: 'The Stack',
      body: [
        'BreakGen is built as a single-page React application with a real-time 3D preview powered by Three.js and Spline. The interface guides users through a sequential design flow: select switches, design keycaps, arrange layout, generate PCB. Each step feeds into the next, and the 3D preview updates in real time so users always see the consequence of their decisions.',
      ],
    },
    {
      type: 'features',
      title: 'Technical Architecture',
      cards: [
        {
          title: 'Frontend \u2014 React + Three.js + Spline',
          description: 'The interface renders a live 3D model of the keyboard as users make design decisions. Each change\u2014switch type, keycap texture, layout shape\u2014updates the preview in real time. Spline handles stylized 3D scenes for onboarding and presentation, while Three.js powers the precise parametric keyboard model.',
        },
        {
          title: 'AI Pipeline \u2014 Meshy AI',
          description: 'Users describe their ideal keycap aesthetic in natural language or select from style presets. Meshy AI generates 3D keycap models that match\u2014from minimal geometric patterns to ornate sculptural tops. The generated models are normalized for printability and mapped onto the layout in real time.',
        },
        {
          title: 'PCB Auto-Generation \u2014 KiCad Integration',
          description: 'Once the layout is finalized, BreakGen auto-generates a precise PCB schematic. The system maps each key position to a switch footprint, routes traces, and exports production-ready Gerber files. Users can send these directly to a PCB fabrication service without touching EDA software.',
        },
        {
          title: 'Export Pipeline',
          description: 'The platform exports multiple file formats matched to fabrication methods: STL files for 3D-printed keycaps and cases, DXF files for laser-cut plates, and Gerber files for PCB manufacturing. Each export is pre-validated for printability and tolerance requirements.',
        },
      ],
    },
    {
      type: 'image',
      src: '',
      alt: 'System architecture diagram \u2014 data flow from user input through AI generation, parametric modeling, and fabrication export',
    },

    // ── 04 — Process ──────────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-process',
      label: '04 \u2014 Process',
      title: 'From Digital Design to Physical Assembly',
      body: [
        'The design process mirrors the user journey itself. Early prototypes tested whether non-technical users could navigate the full keyboard design pipeline without documentation. Iterative user testing at ITP refined the flow: reducing decision fatigue by sequencing choices logically (feel before aesthetics, aesthetics before layout, layout before electronics) and surfacing real-time feedback at every step.',
        'The interface treats keyboard design as a creative act, not an engineering task. Visual metaphors replace technical jargon. Instead of "Cherry MX Red, linear, 45g actuation," users experience a tactile simulation and choose the one that feels right. The system handles the translation.',
      ],
    },
    {
      type: 'steps',
      title: 'Design Flow',
      steps: [
        { num: 1, title: 'Switch Selection', description: 'Choose the key feel through tactile simulation.' },
        { num: 2, title: 'Keycap Generation', description: 'Generate personalized keycap designs with AI.' },
        { num: 3, title: 'Layout Design', description: 'Arrange an ergonomic key layout.' },
        { num: 4, title: 'PCB Generation', description: 'Auto-generate a production-ready PCB.' },
        { num: 5, title: 'Export & Fabrication', description: 'Export files for manufacturing.' },
      ],
    },
    {
      type: 'numbered-list',
      title: 'Key Design Decisions',
      items: [
        '<strong>Sequential flow over open canvas.</strong> Early prototypes offered a freeform workspace where users could tackle any step in any order. Testing revealed that beginners froze when faced with simultaneous choices. The final design enforces a linear progression: feel, then look, then layout, then electronics. Advanced users can jump between steps, but the default path removes ambiguity.',
        '<strong>Tactile previews over spec sheets.</strong> Switch selection was redesigned from a comparison table (actuation force, travel distance, operating force) to an interactive simulation. Users press virtual keys and hear the sound profile. The spec data is still accessible but deprioritized \u2014 feel comes first, numbers second.',
        '<strong>Prompt-driven keycap design.</strong> Rather than offering a fixed catalog of keycap styles, the AI pipeline lets users describe what they want in natural language. \u201cBrutalist concrete texture,\u201d \u201cJapanese woodblock wave pattern,\u201d \u201csmooth matte black with gold flecks\u201d \u2014 the system generates options and users refine from there. This made personalization feel limitless without requiring 3D modeling skills.',
        '<strong>Automated PCB as an invisible step.</strong> PCB generation is the most technical part of keyboard building, and in BreakGen it is the most automated. Users never see a schematic editor. The system infers the circuit from the layout, routes traces automatically, and validates the design against manufacturing constraints. The user sees a confirmation screen; the complexity is hidden.',
      ],
    },
    {
      type: 'image',
      src: '',
      alt: 'Interface screenshots \u2014 switch selection flow with tactile preview and sound profiles',
    },

    // ── 05 — Fabrication ──────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-fabrication',
      label: '05 \u2014 Fabrication',
      title: 'Making It Real',
      body: [
        'BreakGen is not purely digital. Physical prototyping was central to validating the platform \u2014 every claim the software makes about \u201cproduction-ready\u201d exports had to be verified by actually producing keyboards. This cycle of digital design to physical artifact, repeated dozens of times, surfaced constraints that pure software testing would never reveal.',
      ],
    },
    {
      type: 'features',
      title: 'Fabrication Methods',
      cards: [
        {
          title: '3D Printing',
          description: 'Keycaps and case enclosures were printed in resin and PLA. AI-generated keycap designs were exported as STL files and printed at high resolution to verify that generative aesthetics translated to physical objects with satisfying tactile quality. Early prints revealed that intricate AI-generated textures needed minimum wall thicknesses enforced at the model level.',
        },
        {
          title: 'Laser Cutting',
          description: 'Keyboard plates\u2014the structural layer between keycaps and PCB\u2014were laser cut from acrylic and aluminum sheets. The platform exports DXF files matched to the user\u2019s layout for direct fabrication. Tolerance testing across three different laser cutters established the kerf compensation values built into the export pipeline.',
        },
        {
          title: 'CNC Milling',
          description: 'For premium case prototypes, CNC-milled aluminum housings were produced. These tested the platform\u2019s ability to generate production-grade enclosure geometry from the parametric design system. The milling process validated that the software\u2019s auto-generated fillets and mounting points were structurally sound.',
        },
        {
          title: 'PCB Manufacturing',
          description: 'Auto-generated Gerber files were sent to PCB fabrication services (JLCPCB, PCBWay) to validate that the routing algorithms produced boards that passed DRC checks and functioned correctly. Multiple revision cycles refined the auto-router to handle edge cases in non-standard layouts.',
        },
      ],
    },
    {
      type: 'text',
      title: 'Fabrication Challenges',
      body: [
        'The hardest fabrication problem was bridging the gap between what looks good on screen and what works in physical reality. AI-generated keycap designs were often beautiful in the 3D preview but unprintable \u2014 overhangs too steep, details too fine for resin resolution, or surfaces that felt wrong despite looking right. This led to a critical platform feature: a printability validation layer that constrains the AI output to physically viable geometries before the user ever sees a design.',
        'Laser-cut plates revealed another class of problem. Switch cutout tolerances at plus or minus 0.1mm are the difference between a switch that clips in securely and one that rattles or will not seat at all. The platform now bakes in per-material kerf compensation based on the fabrication method the user selects during export.',
      ],
    },
    {
      type: 'image',
      src: '',
      alt: '3D printed keycap prototypes \u2014 progression from early test prints to final AI-generated designs',
    },
    {
      type: 'image',
      src: '',
      alt: 'Laser cut plate components \u2014 acrylic and aluminum keyboard plates with switch cutouts',
    },
    {
      type: 'image',
      src: '',
      alt: 'Final keyboard assembly \u2014 completed build with AI-generated keycaps, laser-cut plate, and auto-generated PCB',
    },

    // ── 06 — ML Integration ───────────────────────────────────────
    {
      type: 'text',
      label: '06 \u2014 ML Integration',
      title: 'Why Meshy AI, and What It Took',
      body: [
        'Choosing the right generative AI pipeline was one of the most consequential decisions in the project. The keycap generation system needed to produce 3D models (not just images), respond to natural language prompts, and output geometry that could be 3D printed without manual cleanup.',
        'I evaluated four approaches before settling on Meshy AI:',
      ],
    },
    {
      type: 'info-grid',
      items: [
        {
          key: 'Text-to-3D (Meshy AI)',
          value: 'Selected. Best balance of prompt fidelity, mesh quality, and API reliability. Models required post-processing for printability but the base geometry was consistently usable.',
        },
        {
          key: 'Image-to-3D Pipeline',
          value: 'Tested with Stable Diffusion + NeRF reconstruction. Higher visual quality but fragile pipeline \u2014 too many failure modes for a user-facing product.',
        },
        {
          key: 'Parametric Generation',
          value: 'Custom OpenSCAD scripts with randomized parameters. Reliable and printable, but the aesthetic range was narrow \u2014 everything looked procedural rather than designed.',
        },
        {
          key: 'Pre-built Library',
          value: 'A curated set of artist-designed keycaps. High quality but limited personalization \u2014 contradicted the core thesis of user-driven creation.',
        },
      ],
    },
    {
      type: 'text',
      title: 'Mesh Normalization Pipeline',
      body: [
        'The integration required building a normalization layer between Meshy AI\u2019s output and the Three.js preview. Generated meshes varied in polygon count (8K to 200K faces), scale, and orientation. The normalization pipeline decimates high-poly models for real-time preview, enforces a consistent coordinate system, and validates that the mesh is watertight (a requirement for 3D printing). This invisible infrastructure is what makes the \u201ctype a prompt, see a keycap\u201d experience feel instantaneous and reliable.',
      ],
    },

    // ── 07 — Outcome ──────────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-outcome',
      label: '07 \u2014 Outcome',
      title: 'ITP Thesis Show',
      body: [
        'BreakGen was exhibited at the NYU ITP Thesis Show, where visitors designed their own keyboards live on the platform and handled physical prototypes produced through the pipeline. The exhibition demonstrated the full loop: digital design to physical artifact, completed in minutes rather than weeks.',
      ],
    },
    {
      type: 'stats',
      title: 'Exhibition Results',
      stats: [
        { label: 'Thesis Show Visitors', value: '200+' },
        { label: 'Live Designs Created', value: '50+' },
        { label: 'Physical Prototypes', value: '6' },
        { label: 'Design-to-Export Time', value: '<10 min' },
      ],
    },
    {
      type: 'image',
      src: '',
      alt: 'Thesis show installation \u2014 BreakGen live demo station with physical keyboard prototypes on display',
    },
    {
      type: 'pullquote',
      quote: 'I\u2019ve wanted to build a custom keyboard for two years but never got past the PCB step. I just designed one in eight minutes and it actually looks like something I\u2019d use.',
      cite: '\u2014 Thesis Show visitor, ITP second-year student',
    },
    {
      type: 'text',
      title: 'Exhibition Feedback',
      body: [
        'The most consistent feedback from visitors was surprise at how short the path from intent to artifact had become. People who had never considered building a keyboard found themselves engaged in the design process, while experienced builders appreciated that the platform handled the tedious steps (PCB routing, firmware generation) without limiting creative control over the parts that matter to them (layout, aesthetics, feel).',
        'Several faculty members noted that the project demonstrated a broader principle \u2014 that generative AI tools are most powerful not when they replace human creativity but when they remove the technical gatekeeping that prevents people from expressing creativity they already have.',
      ],
    },
    {
      type: 'callout',
      text: 'The project validates a broader thesis \u2014 that generative AI and parametric design tools can collapse the expertise barrier in hardware creation without sacrificing depth or quality. The keyboard is the proof of concept; the architecture generalizes to any modular hardware system.',
    },

    // ── 08 — Reflections ──────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-reflections',
      label: '08 \u2014 Reflections',
      title: 'What I\u2019d Carry Forward',
      body: [
        'BreakGen was the most technically complex project I have built, spanning web development, 3D graphics, machine learning, electronics design, and physical fabrication. Working across all of these domains as a sole practitioner taught me lessons that no single-discipline project could.',
      ],
    },
    {
      type: 'numbered-list',
      title: 'Key Takeaways',
      items: [
        '<strong>Physical constraints are the best design constraints.</strong> The most important features in BreakGen \u2014 printability validation, kerf compensation, mesh normalization \u2014 were not in the original spec. They emerged from the fabrication process, when digital designs failed to become physical objects. Building software for hardware taught me that real-world constraints are not limitations to work around; they are the information that makes the product actually useful.',
        '<strong>AI is a material, not a feature.</strong> Early in the project, I treated AI-generated keycaps as a feature to demo. By the end, I understood generative AI as a material with properties \u2014 it has grain, tolerance, failure modes, and sweet spots, just like wood or resin. Designing with AI means understanding those properties and building guardrails that channel its output toward usable results, not just impressive ones.',
        '<strong>Sequencing beats simultaneity for novices.</strong> The biggest UX insight was that constraining the design flow (feel, then aesthetics, then layout, then electronics) dramatically reduced drop-off compared to the open-canvas approach. Experts want freedom; beginners want a path. The best tools provide both by making the path the default and freedom the override.',
        '<strong>Thesis work is a forcing function for finishing.</strong> Having a fixed exhibition date and a public audience meant that BreakGen had to work end-to-end, not just in isolated demos. That pressure pushed me to solve integration problems I would have deferred indefinitely in a personal project \u2014 and the result was a system that genuinely works, not a collection of promising prototypes.',
      ],
    },

    // ── Credits & Thank You ───────────────────────────────────────
    {
      type: 'credits',
      credits: [
        { role: 'Designer & Developer', name: 'Parth Pawar \u2014 Concept, UX/UI design, frontend development, AI pipeline, PCB generation, physical prototyping' },
        { role: 'Thesis Advisor', name: 'Luisa Pereira \u2014 NYU Interactive Telecommunications Program' },
      ],
    },
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
