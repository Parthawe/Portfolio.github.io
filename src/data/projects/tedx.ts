import type { ProjectMeta } from '@/types/project'

export const tedx: ProjectMeta = {
  slug: 'tedx',
  title: 'TEDx VIT Pune',
  subtitle:
    'Art directing a 65-person team to design, fabricate, and light a rotating parallax cityscape stage for 800+ attendees',
  description:
    'Art Director for TEDx VIT Pune \u2014 led a team of 65+ people to design, fabricate, and build a parallax cityscape stage for 800+ attendees. From brand identity to structural construction.',
  ogImage: 'https://www.designwhich.works/Assets/images/tedx.png',
  heroImage: '/Assets/Projects/Tedxvitpune/Desktop/5.jpg',
  projectColor: '#E53E3E',
  tags: ['Art Direction', 'Stage Design', 'Brand Identity', 'Fabrication'],
  categories: ['brand'],
  infoItems: [
    { label: 'Role', value: 'Art Director' },
    { label: 'Team', value: '65+ volunteers' },
    { label: 'Timeline', value: 'Sept\u2013Nov 2019' },
    { label: 'Audience', value: '800+ attendees' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'code-for-build',
    title: 'Code for Build',
    image: '/Assets/images/code-for-build.jpg',
  },
  bottomNavSections: [
    { id: 'cs-overview', label: 'Overview' },
    { id: 'cs-brand', label: 'Brand Identity' },
    { id: 'cs-stage', label: 'Stage Design' },
    { id: 'cs-team', label: 'Team' },
    { id: 'cs-process', label: 'Process' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  credits: [{ role: 'Art Director', name: 'Parth Pawar' }],
  sections: [
    // ── Overview ──
    {
      type: 'overview',
      id: 'cs-overview',
      columns: [
        {
          heading: 'The Challenge',
          body: 'TEDxVITPune is one of Pune\u2019s longest-running TEDx events, bringing together speakers, performers, and an audience of 800+ for a single day of ideas worth spreading. For the 2019 edition, the organizing committee wanted something the event had never attempted: a stage that was not just a backdrop, but a spatial experience \u2014 one that transformed throughout the day and reinforced the event\u2019s theme visually. The brief was open-ended and the budget was tight. Everything had to be designed, built, and installed by students within eight weeks.',
        },
        {
          heading: 'My Role',
          body: 'Art Director \u2014 Aesthetic Head of TEDxVITPune. Responsible for brand identity, stage concept, structural design, fabrication oversight, lighting design, and team coordination across 65+ volunteers in design, fabrication, logistics, and on-site assembly.',
        },
      ],
    },

    // ── Brand Identity ──
    {
      type: 'text',
      id: 'cs-brand',
      label: '02 \u2014 Brand Identity',
      title: 'Visual System',
      body: [
        'The visual identity for TEDxVITPune 2019 needed to honor the established TEDx brand guidelines while carving out a distinct personality for this edition. I developed a cohesive system that extended from digital collateral to the physical stage itself.',
      ],
    },
    {
      type: 'info-grid',
      items: [
        {
          key: 'Color Palette',
          value:
            'Built around the signature TEDx red, the palette was extended with deep navy (#080B1E) and warm neutrals. The dark tones gave the brand a cinematic quality that translated directly to stage lighting\u2014every digital design choice was made with the physical space in mind.',
        },
        {
          key: 'Typography',
          value:
            'Bold, geometric type for headlines paired with a clean sans-serif for body text. The typographic hierarchy was designed to work across print banners, projected slides, and stage signage\u2014maintaining legibility at scales from phone screens to 12-foot backdrops.',
        },
        {
          key: 'Collateral',
          value:
            'The system unified social media graphics, event programs, speaker introduction cards, venue signage, attendee badges, and merchandise. Every touchpoint reinforced the same visual language, creating a cohesive brand experience from the moment attendees saw the event online to the moment they walked through the venue doors.',
        },
      ],
    },

    // ── Stage Design ──
    {
      type: 'text',
      id: 'cs-stage',
      label: '03 \u2014 Stage Design',
      title: 'Parallax Cityscape',
      body: [
        'The stage concept was a layered parallax cityscape\u2014multiple planes of building silhouettes at varying depths that created an illusion of spatial depth when lit from behind. As speakers moved across the stage, the relationship between the layers shifted, making the backdrop feel alive rather than static.',
        'The design went through three major iterations. Initial sketches explored abstract geometric forms, but user testing with the organizing committee revealed that a recognizable urban skyline would resonate more strongly with the audience and provide better visual framing for speakers on camera.',
        'The final design featured five distinct depth layers, each cut from different materials to vary opacity and texture. The deepest layer was solid MDF painted matte black; mid-layers were semi-transparent fabric stretched over wooden frames; the foreground layer was detailed laser-cut acrylic. When backlit with programmable LEDs, the layers produced a subtle parallax effect visible from every seat in the auditorium.',
      ],
    },

    // ── Stage Design Gallery ──
    {
      type: 'image',
      src: '/Assets/Projects/Tedxvitpune/Desktop/1.jpg',
      alt: 'TEDxVITPune stage design \u2014 speakers and performers on the parallax cityscape stage',
    },

    // ── Team Leadership ──
    {
      type: 'text',
      id: 'cs-team',
      label: '04 \u2014 Team Leadership',
      title: 'Coordinating 65+ People',
      body: [
        'This was not a project I could build alone. As Art Director, I led a team of 65+ volunteers\u2014most of whom had never worked on a production of this scale. The team was organized into three functional groups: Design (visual identity, signage, digital collateral), Fabrication (structural construction, material sourcing, painting), and Logistics (venue coordination, equipment rental, day-of setup).',
        'I ran weekly all-hands meetings and daily standups with group leads during the final two weeks. The biggest leadership challenge was maintaining design quality across dozens of hands. I created detailed visual guides and templates for every fabrication task\u2014specifying exact paint mixes, cut dimensions, and assembly sequences\u2014so that volunteers with no design training could execute at the standard the event required.',
        'Delegation was essential, but so was knowing when to step in. I personally oversaw every critical juncture: the first structural test of the rotating mechanism, the lighting programming, and the final 48-hour install marathon before the event.',
      ],
    },

    // ── Process ──
    {
      type: 'text',
      id: 'cs-process',
      label: '05 \u2014 Process',
      title: 'Eight Weeks, Concept to Curtain',
      body: [
        'Weeks 1\u20132: Concept & Brand. Developed the parallax cityscape concept and complete brand identity system. Presented three stage directions to the organizing committee; the parallax approach was selected unanimously. Simultaneously recruited and onboarded the full volunteer team.',
        'Weeks 3\u20134: Structural Design. Translated the stage concept into engineering drawings. Worked with local fabricators to source materials and validate structural feasibility. Built a 1:10 scale model to test sightlines and lighting angles from every section of the auditorium.',
        'Weeks 5\u20136: Fabrication. Full-scale construction began. Columns were built from wooden frames and MDF panels. The rotating stage platform was assembled and tested for smooth, silent rotation. Parallax layers were cut and painted. The team worked in shifts across two workshops.',
        'Week 7: Lighting & Integration. Programmable LED strips were wired behind each parallax layer. Lighting scenes were programmed to match the event\u2019s session structure\u2014warm tones for talks, cooler tones for performances, dynamic color shifts for transitions. The rotating mechanism was integrated with the lighting controller for synchronized reveals.',
        'Week 8: Install & Event Day. The entire stage was transported and assembled in the venue over 48 hours. Final lighting calibration, sound checks, and a full technical rehearsal. On event day, I directed all visual elements live\u2014stage rotations, lighting cues, and backdrop changes\u2014ensuring the 800+ attendees experienced a seamless production.',
      ],
    },

    // ── Process Gallery ──
    {
      type: 'image',
      src: '/Assets/Projects/Tedxvitpune/Desktop/4.jpg',
      alt: 'Behind-the-scenes process photos showing stage construction, column fabrication, lighting tests, and assembly',
    },

    // ── Reflections ──
    {
      type: 'text',
      id: 'cs-reflections',
      label: '06 \u2014 Reflections',
      title: 'What Leading This Taught Me',
      body: [
        'TEDxVITPune was the first time I was responsible for both the creative vision and the operational execution of a large-scale production. Two lessons stayed with me.',
        'First, design systems are leadership tools. The visual guides and templates I created were not just about consistency\u2014they were about giving 65 people the confidence to act without waiting for my approval. When the system is clear, people move faster and make better decisions on their own.',
        'Second, the gap between a concept and a built thing is where most projects fail. Ideas are cheap; execution at scale is what matters. Managing material constraints, volunteer fatigue, venue restrictions, and a hard deadline taught me more about design than any studio course. The stage worked because every aesthetic decision was also a structural decision, a budget decision, and a logistics decision. That integration\u2014thinking across domains simultaneously\u2014is what I now consider the core skill of design leadership.',
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
      credits: [{ role: 'Art Director', name: 'Parth Pawar' }],
    },
  ],
}
