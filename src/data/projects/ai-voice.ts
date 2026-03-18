import type { ProjectMeta } from '@/types/project'

export const aiVoice: ProjectMeta = {
  slug: 'ai-voice',
  title: 'AI Voice Interface',
  subtitle: 'Redefining AI Voice Selection For Enterprise',
  description:
    'Redefining AI Voice Selection for Enterprise — emotional intelligence and expressive voice design.',
  ogImage: 'https://www.designwhich.works/Assets/images/ai-voice.png',
  heroImage: '/Assets/Projects/AI VOICE/AI.jpg',
  projectColor: '#4A6FA5',
  tags: ['Product Design', 'AI', 'Voice UX', 'Enterprise'],
  infoItems: [
    { label: 'Client', value: 'Voice AI (NDA)' },
    { label: 'Scope', value: 'Product Design' },
    { label: 'Role', value: 'Product Designer' },
    { label: 'Duration', value: '3 Months' },
    { label: 'Year', value: '2025' },
  ],
  backLink: { label: '\u2190 Back to Work', href: '/work' },
  nextProject: {
    slug: 'ballah-code',
    title: 'Ballah Code',
    image: '/Assets/images/ballah-code.png',
  },
  bottomNavSections: [
    { id: 'cs-research', label: 'Research' },
    { id: 'cs-define', label: 'Define' },
    { id: 'cs-concept-a', label: 'Concept A' },
    { id: 'cs-concept-b', label: 'Concept B' },
    { id: 'cs-voice-dna', label: 'Voice DNA' },
    { id: 'cs-mood', label: 'Mood Matching' },
    { id: 'cs-validate', label: 'Validate' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  categories: ['ai'],
  sections: [
    // ── SLIDE 1 cont. — Overview + Challenges + Role ────────────
    {
      type: 'text',
      title: 'Reimagining how enterprise teams discover and select AI voices.',
      body: [],
    },
    {
      type: 'info-grid',
      items: [
        {
          key: 'Summary',
          value:
            'The reimagined AI voice matching experience helps enterprise teams and creatives select AI voices through intuitive, emotionally intelligent interactions. Instead of static dropdowns, users explore, test, and build voices through personalized, context-aware systems. This approach balances technical power with playful creativity and emotional alignment.',
        },
        {
          key: 'The Challenges',
          value:
            'Bridging the gap between enterprise-grade AI voice tools and intuitive, emotion-driven UX. Replacing dropdown-based selection with expressive, guided exploration. Supporting both fast onboarding and deep customization for varied user needs.',
        },
        {
          key: 'My Role',
          value:
            '<strong>Product Design Strategy:</strong> Leading concept definition for how users engage with AI voice personalities.<br/><strong>Interaction &amp; System Design:</strong> Designing DNA-based and mood-based systems for selecting and shaping voice outputs.',
        },
        {
          key: 'Tools & Techniques',
          value:
            'Figma, AI, User Research & Testing, Emotion-Centric UX Design, Voice Prototyping, User Flows, User Study, Workflow Optimization',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/AI VOICE/1.png',
      alt: 'AI Voice Selection \u2014 project overview slide',
    },

    // ── SLIDE 2 — Research ──────────────────────────────────────
    {
      type: 'text',
      id: 'cs-research',
      label: 'Research',
      title: "The voices are world-class. The discovery experience isn't.",
      body: [
        "AI's voices are human-like, expressive, and built for real-world business applications \u2014 but the way customers discover and choose them doesn't do them justice.",
      ],
    },
    {
      type: 'steps',
      title: 'Design Process',
      steps: [
        { num: 1, title: 'Empathize', description: '' },
        { num: 2, title: 'Define', description: '' },
        { num: 3, title: 'Ideate', description: '' },
        { num: 4, title: 'Prototype', description: '' },
        { num: 5, title: 'Test', description: '' },
      ],
    },
    {
      type: 'callout',
      text: 'Comparative UX analysis across three platforms (Rime, Central, Simple) revealed critical gaps in Entry Point design, First-Time Flow, Voice Discovery UX, Customization & Personality Fit, and Onboarding Support \u2014 confirming the need for a fundamentally new approach to voice selection.',
    },
    {
      type: 'image',
      src: '/Assets/Projects/AI VOICE/2.png',
      alt: 'Comparative UX analysis and market research across voice AI platforms',
    },

    // ── SLIDE 3 — Define: Problem + Journey Map ─────────────────
    {
      type: 'features',
      id: 'cs-define',
      label: 'Define',
      title:
        'How might we help Enterprise Teams select an expressive AI voice that aligns with brand tone?',
      cards: [
        {
          title: 'Unintuitive',
          description:
            "Current voice selection relies on static lists and dropdowns that don't convey personality or tone.",
        },
        {
          title: 'Uncontextualized',
          description:
            'Voices are presented without context for how they sound in real-world use cases or brand scenarios.',
        },
        {
          title: 'Fragmented',
          description:
            'The selection process is scattered across multiple screens and lacks a cohesive flow.',
        },
        {
          title: 'Impersonal',
          description:
            "No emotional connection or personality fit between the user's needs and the voice options.",
        },
        {
          title: 'Rigid',
          description:
            'Minimal customization options and no ability to shape or tweak voices to match brand identity.',
        },
      ],
    },
    {
      type: 'steps',
      title: 'Customer Journey Map',
      body: ['Mapped the Enterprise Manager journey across five phases:'],
      steps: [
        {
          num: 1,
          title: 'Awareness',
          description:
            'Enterprise manager discovers AI voice platform and begins evaluating options for their brand.',
        },
        {
          num: 2,
          title: 'Exploration',
          description:
            'Browses available voices, listens to samples, and tries to match voices to brand requirements.',
        },
        {
          num: 3,
          title: 'Evaluation',
          description:
            'Shortlists voices, tests them in context, and compares options against brand tone guidelines.',
        },
        {
          num: 4,
          title: 'Selection',
          description:
            'Finalizes voice choice, customizes parameters, and confirms the voice for implementation.',
        },
        {
          num: 5,
          title: 'Handoff to Tech',
          description:
            'Exports voice configuration and hands off to engineering team for integration.',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/AI VOICE/3.png',
      alt: 'Problem definition, pain points, and customer journey map',
    },

    // ── SLIDE 4 — Ideate: Voice DNA Builder ─────────────────────
    {
      type: 'text',
      id: 'cs-concept-a',
      label: 'Ideate \u2014 Concept A',
      title: 'Voice DNA Builder',
      body: [
        'Instead of picking a name from a list, users "build" a voice by choosing parameters that form into a helix: Emotion, Accent, Pace, and Texture. The system animates a DNA strand building in real time, and a voice is generated from it.',
      ],
    },
    {
      type: 'features',
      title: 'Layout Architecture',
      cards: [
        {
          title: 'Left Panel',
          description:
            'Navigation and voice persona selection panel for quick access to saved configurations.',
        },
        {
          title: 'Center Stage',
          description:
            'DNA strand visualization with parameter sliders for Emotion, Accent, Pace, and Texture.',
        },
        {
          title: 'Right Panel',
          description:
            'Transcript display and voice preview controls for real-time testing of configurations.',
        },
        {
          title: 'Bottom Right',
          description:
            'Interactive global map for picking regional accents with cultural context.',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/AI VOICE/4.png',
      alt: 'Voice DNA Builder \u2014 sketch and final dark UI mockup',
    },

    // ── SLIDE 5 — Ideate: Mood-Based Voice Matching ─────────────
    {
      type: 'text',
      id: 'cs-concept-b',
      label: 'Ideate \u2014 Concept B',
      title: 'Mood-Based Voice Matching',
      body: [
        'User speaks a sentence, the AI analyzes tone, pacing, and emotion, then suggests three voices that match or balance their energy. The system adapts to the user, not the other way around.',
      ],
    },
    {
      type: 'steps',
      title: 'Three Stages',
      steps: [
        {
          num: 1,
          title: 'User Speaks',
          description:
            'User delivers an initial speech prompt. The silhouette pulses in response to vocal input.',
        },
        {
          num: 2,
          title: 'Voice-Matching Logic',
          description:
            'AI processes emotion, pacing, and tone from the speech to identify matching voice profiles.',
        },
        {
          num: 3,
          title: 'Persona Suggestions',
          description:
            "Dynamic voice personas appear with mood-match summaries, showing how each voice aligns with the user's energy.",
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/AI VOICE/5.png',
      alt: 'Mood-Based Voice Matching \u2014 sketch and final dark UI mockup',
    },

    // ── SLIDE 6 — Voice DNA Builder Details ─────────────────────
    {
      type: 'text',
      id: 'cs-voice-dna',
      label: 'Deep Dive \u2014 Voice DNA Builder',
      title: "Build a voice, don't just pick one.",
      body: [
        'Instead of picking a name, users "build" a voice by choosing parameters into a helix: Emotion, Accent, Pace, Texture. The system animates a DNA strand building in real time, and a voice is generated from it.',
      ],
    },
    {
      type: 'features',
      title: 'Key Features',
      cards: [
        {
          title: 'Current Voice Persona',
          description:
            'Live preview of the active voice persona with visual identity and personality traits.',
        },
        {
          title: 'Transcript Panel',
          description:
            'Real-time transcript display for accessibility and review of voice output.',
        },
        {
          title: 'Search Place',
          description:
            'Quickly search and filter through available voice parameters and presets.',
        },
        {
          title: 'Global Map',
          description:
            'Interactive world map for selecting regional accents with cultural depth.',
        },
        {
          title: 'DNA Parameters',
          description:
            'Multiple configurable parameters that feed into the voice DNA strand.',
        },
        {
          title: 'Parameter Sliders',
          description:
            'Intuitive sliders for fine-tuning each voice characteristic in real time.',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/AI VOICE/6.png',
      alt: 'Voice DNA Builder \u2014 detailed feature breakdown and UI',
    },

    // ── SLIDE 7 — Persona Movements + UX Benefits (DNA Builder) ─
    {
      type: 'text',
      label: 'UX Benefits \u2014 Voice DNA Builder',
      title: 'Creative freedom meets technical power.',
      body: [
        'Two options for persona movements across Listen, Think, and Talk states \u2014 bringing the voice character to life through dynamic visual feedback.',
      ],
    },
    {
      type: 'numbered-list',
      title: 'UX Benefits',
      items: [
        'Intuitive sliders for emotional tone',
        'Interactive map for cultural depth',
        'Dynamic persona summary',
        'Transcript panel for accessibility',
        'Infinite combinations for highly personalized voices',
        'Exploratory flow encourages creative play',
        'Character-driven design',
      ],
    },
    {
      type: 'callout',
      text: 'Dark theme matches the product identity. Accent red used sparingly for emphasis. DNA strand glows in motion. Font and layout are clear, functional, minimal.',
    },
    {
      type: 'image',
      src: '/Assets/Projects/AI VOICE/7.png',
      alt: 'Persona movements and UX benefits for Voice DNA Builder',
    },

    // ── SLIDE 8 — Mood-Based Voice Matching Details ─────────────
    {
      type: 'text',
      id: 'cs-mood',
      label: 'Deep Dive \u2014 Mood-Based Voice Matching',
      title: 'The system adapts to you.',
      body: [
        'User speaks a sentence. AI analyzes tone, pacing, and emotion, then suggests three voices that match or balance their energy. It flips the script: the system adapts to the user, not the other way around. Responsive onboarding based on emotion.',
      ],
    },
    {
      type: 'steps',
      title: 'Three Screens',
      steps: [
        {
          num: 1,
          title: 'Listening Mode',
          description:
            '"Speak your mind" \u2014 a glowing circle pulses as it captures the user\'s voice input.',
        },
        {
          num: 2,
          title: 'Thinking Mode',
          description:
            'A silhouette appears as the AI processes emotion and generates matching voice profiles.',
        },
        {
          num: 3,
          title: 'Talking Mode',
          description:
            'Three voice suggestions appear with a red/orange gradient, alongside transcript details and mood-match summaries.',
        },
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/AI VOICE/8.png',
      alt: 'Mood-Based Voice Matching \u2014 three screens: listening, thinking, talking',
    },

    // ── SLIDE 9 — Persona + UX Benefits (Mood Matching) ─────────
    {
      type: 'text',
      label: 'UX Benefits \u2014 Mood-Based Matching',
      title: 'Voice-first. Emotionally intelligent.',
      body: [
        'Different persona silhouettes to choose from, each representing a distinct voice character and personality.',
      ],
    },
    {
      type: 'numbered-list',
      title: 'UX Benefits',
      items: [
        'Voice-first onboarding \u2014 no clicks, just speak',
        'Emotionally intelligent matching',
        'Simplified discovery with three great matches',
        'Transcript support for accessibility',
        'Personality-focused selection',
        'Exploratory, not fixed \u2014 encourages iteration',
        'Visually guided experience',
      ],
    },
    {
      type: 'callout',
      text: 'Dark background with warm gradient halos. Persona silhouettes are character-driven, giving each voice a visual identity. Accent red used sparingly. Micro-animation stages bring the matching process to life.',
    },
    {
      type: 'image',
      src: '/Assets/Projects/AI VOICE/9.png',
      alt: 'Persona silhouettes and UX benefits for Mood-Based Voice Matching',
    },

    // ── SLIDE 10 — A/B Testing + Reflections ────────────────────
    {
      type: 'text',
      id: 'cs-validate',
      label: 'Validate',
      title: 'A/B Testing: DNA Builder vs. Mood Matching',
      body: [
        'Tested Prototype A (Voice DNA Builder) against Prototype B (Mood-Based Voice Matching) with 7 participants via WhatsApp.',
      ],
    },
    {
      type: 'features',
      title: 'Results',
      cards: [
        {
          title: 'Ease of Onboarding',
          description:
            'Winner: Mood Matching (B) \u2014 5 out of 7 participants preferred its voice-first, low-friction entry.',
        },
        {
          title: 'Personalization & Control',
          description:
            'Winner: DNA Builder (A) \u2014 6 out of 7 participants valued the deep customization options.',
        },
        {
          title: 'Visual Engagement',
          description:
            'Winner: DNA Builder (A) \u2014 5 out of 7 found the DNA strand animation more visually compelling.',
        },
        {
          title: 'Emotional Connection',
          description:
            'Winner: Mood Matching (B) \u2014 4 out of 7 felt stronger emotional resonance with voice-first input.',
        },
        {
          title: 'Clarity of Steps',
          description:
            'Winner: Mood Matching (B) \u2014 4 out of 7 found the three-stage flow easier to follow.',
        },
        {
          title: 'Fun & Playfulness',
          description:
            'Winner: DNA Builder (A) \u2014 6 out of 7 enjoyed the creative, exploratory interactions.',
        },
      ],
    },
    {
      type: 'callout',
      text: 'Overall Winner: Voice DNA Builder (Prototype A) for its customization depth and creative freedom. Recommendation: Use Mood-Based Matching as an emotional onboarding layer, then let users graduate to Voice DNA Builder for full control.',
    },
    {
      type: 'pullquote',
      quote:
        'The DNA Builder made me feel like I was crafting a character, not picking from a dropdown. I actually wanted to keep tweaking it \u2014 that never happens with voice tools.',
      cite: 'A/B Test Participant, Enterprise Product Manager',
    },
    {
      type: 'text',
      title: 'Reflections',
      body: [
        'Working on the AI voice matching platform gave me the opportunity to deeply explore how voice can evolve from a utility into an expressive interface for emotion, identity, and brand storytelling.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/Projects/AI VOICE/10.png',
      alt: 'A/B testing results and reflections',
    },

    // ── Reflections ─────────────────────────────────────────────
    {
      type: 'numbered-list',
      id: 'cs-reflections',
      label: 'Reflections',
      title: 'Designing for a voice-first world',
      items: [
        '<strong>Voice-first design strips away visual scaffolding.</strong> There is no layout to guide the eye, no button to make obvious, no color to signal state. Every decision has to land through sound, timing, and language alone. This project taught me how much we rely on visual crutches in interface design \u2014 and how liberating it can be to design for a purely temporal medium where pacing and tone carry the entire experience.',
        '<strong>The line between helpful AI and intrusive AI is thinner than you think.</strong> An emotionally intelligent system that adapts to your voice is powerful, but it can easily tip into feeling surveillance-like if the user does not feel in control. The more capable the AI, the more deliberate the design needs to be about transparency, consent, and letting people opt out gracefully.',
        '<strong>Two concepts are better than one.</strong> Building both the DNA Builder and the Mood Matcher forced each idea to be sharper. A/B testing revealed that neither concept alone was the answer \u2014 the best experience layers mood-based onboarding into DNA-based customization. Competing prototypes made the final recommendation stronger than any single direction could have been.',
        '<strong>Intelligence without restraint is not good design.</strong> Enterprise teams need to trust the system before they deploy it to their customers. That trust is built through visible controls, transparent matching logic, and the ability to override every suggestion. The most sophisticated AI features in this project were the ones that showed their work.',
      ],
    },

    // ── Thank You ───────────────────────────────────────────────
    {
      type: 'thank-you',
      title: 'Thank You',
    },
    {
      type: 'image',
      src: '/Assets/Projects/AI VOICE/11.png',
      alt: 'Credits and thank you slide',
    },
  ],
}
