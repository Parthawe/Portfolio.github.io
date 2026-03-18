import type { ProjectMeta } from '@/types/project'

export const mentra: ProjectMeta = {
  slug: 'mentra',
  title: 'Mentra',
  subtitle:
    'Designing the UX for the only AI-powered smart glasses with an app store \u2014 from companion app to open-source OS to developer marketplace',
  description:
    'Mentra Glass \u2014 Designing the UX for the only AI-powered smart glasses with an app store. Companion app, MentraOS, and MiniApp Store. Case study by Parth Pawar, Head of UI/UX.',
  ogImage: 'https://www.designwhich.works/Assets/images/mentra.png',
  heroImage: '/Assets/images/mentra.png',
  projectColor: '#1B4D8F',
  tags: ['AI Wearables', 'Head of UI/UX', '0\u21921 Product', 'Smart Glasses'],
  infoItems: [
    { label: 'Role', value: 'Head of UI/UX' },
    { label: 'Timeline', value: '2025\u2013Present' },
    { label: 'Team', value: 'Design lead + cross-functional' },
    { label: 'Platform', value: 'Wearable OS, Mobile, Web' },
  ],
  backLink: { label: '\u2190 Back to Work', href: '/work' },
  nextProject: {
    slug: 'executivelens',
    title: 'ExecutiveLens',
    image: '/Assets/images/executivelens.png',
  },
  bottomNavSections: [
    { id: 'cs-vision', label: 'Vision & Role' },
    { id: 'cs-context', label: 'Context' },
    { id: 'cs-bet', label: 'The Bet' },
    { id: 'cs-challenges', label: 'Challenges' },
    { id: 'cs-companion', label: 'Companion App' },
    { id: 'cs-os', label: 'MentraOS' },
    { id: 'cs-store', label: 'MiniApp Store' },
    { id: 'cs-timeline', label: 'Timeline' },
    { id: 'cs-impact', label: 'Impact' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  categories: ['ux'],
  sections: [
    /* ── Vision & Role (overview) ─────────────────────────────── */
    {
      type: 'overview',
      id: 'cs-vision',
      columns: [
        {
          heading: 'The Vision',
          body: 'Smart glasses have been a graveyard of good intentions. Google Glass, Snap Spectacles, North Focals \u2014 all shipped impressive hardware and then asked users to figure out why they should wear it. Mentra Glass answers that question with an open-source OS and the first miniapp store for smart glasses \u2014 turning a piece of hardware into a platform people put on every morning and never take off.',
        },
        {
          heading: 'My Role',
          body: 'As Head of UI/UX, I own every design surface: companion app, MentraOS on-glasses interface, MiniApp Store, developer experience, and the design system binding it all. I work across hardware constraints, AI interaction patterns, and developer tooling \u2014 translating an ambitious product vision into interfaces that feel obvious the first time you use them.',
        },
      ],
    },

    /* ── Context ──────────────────────────────────────────────── */
    {
      type: 'text',
      id: 'cs-context',
      label: 'Context',
      title: 'A Decade of Expensive Failures',
      body: [
        'Before designing forward, I studied backward. Smart glasses have a decade-long trail of ambitious launches and quiet discontinuations. The pattern never varies: a hardware company ships something technically impressive, bundles a companion app with three features, and waits for the \u201Cecosystem\u201D to magically appear. It never does.',
        'Google Glass had the sensors but no software story. Snap Spectacles had the brand but no utility past fifteen-second clips. North Focals had the elegance but no reason to exist past the first week. Every one treated software as an afterthought and developers as an audience that would show up uninvited.',
        'The lesson: smart glasses without an ecosystem are an expensive accessory with a charging cable.',
      ],
    },
    {
      type: 'callout',
      text: '\u201CThe smartphone won because of the App Store. Smart glasses will too.\u201D',
    },
    {
      type: 'pullquote',
      quote:
        '\u201CEvery smart glasses company before us shipped hardware and hoped software would follow. We designed the software ecosystem first and built the hardware to serve it.\u201D',
      cite: '\u2014 Mentra founding thesis',
    },

    /* ── The Bet ──────────────────────────────────────────────── */
    {
      type: 'text',
      id: 'cs-bet',
      label: 'The Bet',
      title: 'What Android Did for Phones, MentraOS Does for Glasses',
      body: [
        'Mentra\u2019s thesis is simple and radical: smart glasses need an open-source OS and a developer marketplace to become a daily-wear platform. Not a better camera. Not a lighter frame. An ecosystem.',
        'MentraOS is that ecosystem \u2014 open-source, community-driven, designed from the ground up for face-worn computing. The MiniApp Store gives developers a place to publish, users a place to discover, and the platform a reason to grow beyond what any single company could build alone.',
        'The bet: the smart glasses that win will not have the best specs on paper. They will have the best app on your face \u2014 built by someone you have never met, for a problem only you have, found in a store that runs on your glasses.',
      ],
    },

    /* ── Design Challenges ────────────────────────────────────── */
    {
      type: 'features',
      id: 'cs-challenges',
      label: 'Design Challenges',
      title: 'Four Problems Nobody Had Cracked',
      body: [
        'Smart glasses are not \u201Cmobile design but smaller.\u201D The screen is in your peripheral vision, the input is voice and gesture, and the context is the real world. Every assumption from a decade of screen design had to be thrown out.',
      ],
      cards: [
        {
          title: 'The Screen You Never Look At',
          description:
            'The display lives in peripheral vision, not dead center. UI elements must be glanceable, not readable. Hierarchy is about where in the visual field something appears, not font size.',
        },
        {
          title: 'Sixty Seconds or You Lose Them',
          description:
            'New form factor, zero patience. I designed a four-step onboarding that gets users from unboxing to first interaction in under a minute. No tutorials, no walkthrough. Wear them and talk.',
        },
        {
          title: "If They Won't Build, Nothing Else Matters",
          description:
            'An app store is only as good as its apps. I designed the SDK docs, developer portal, and submission flow to make building for glasses feel as natural as building for phones.',
        },
        {
          title: 'A Camera on Your Face Is a Social Contract',
          description:
            'Post-Google-Glass, face-worn cameras carry social baggage. I designed visual indicators, privacy modes, and interaction patterns that build trust with both the wearer and everyone in the room.',
        },
      ],
    },

    /* ── Companion App ────────────────────────────────────────── */
    {
      type: 'text',
      id: 'cs-companion',
      label: 'Companion App',
      title: 'The Control Center in Your Pocket',
      body: [
        'The companion app is not a remote control \u2014 it is the bridge between your phone and your face. It handles everything the glasses should not: deep configuration, miniapp management, firmware updates, AI settings.',
        'Pairing was the first interaction I obsessed over. Bluetooth pairing is traditionally a five-minute frustration. I designed a one-tap flow \u2014 scan the QR code on the glasses case, connection established, personalized home screen \u2014 all in under thirty seconds.',
      ],
    },
    {
      type: 'steps',
      label: 'Companion App',
      title: 'Onboarding Flow',
      steps: [
        {
          num: 1,
          title: 'Slide On',
          description:
            'Unfold the temples and the glasses power on. The accelerometer detects the motion and boots MentraOS in under two seconds.',
        },
        {
          num: 2,
          title: 'Download App',
          description:
            'A card in the display directs you to download the companion app. NFC in the case triggers the download on Android.',
        },
        {
          num: 3,
          title: 'Pair',
          description:
            'Scan the QR code. One tap to confirm. The phone and glasses handshake over Bluetooth LE and the connection is persistent.',
        },
        {
          num: 4,
          title: '\u201CHey Mentra\u201D',
          description:
            'The wake word activates the AI. Directions, translation, song ID, calendar \u2014 the first interaction sets the tone.',
        },
      ],
    },
    {
      type: 'image',
      src: '',
      alt: 'Companion app mockup \u2014 home screen, device pairing flow, and miniapp management interface',
    },
    {
      type: 'text',
      title: 'Companion App \u2014 Ecosystem Management',
      body: [
        'Beyond onboarding, the app is the management layer for the entire ecosystem: browse miniapps, configure per-app notifications, adjust display settings, manage privacy. I built it on a single-tab architecture \u2014 everything is two taps away.',
      ],
    },

    /* ── MentraOS ─────────────────────────────────────────────── */
    {
      type: 'text',
      id: 'cs-os',
      label: 'MentraOS',
      title: 'An OS That Disappears Until You Need It',
      body: [
        'MentraOS is open-source \u2014 a product decision that became the defining design constraint. An open OS means developers will build things I cannot predict, on a display I cannot control, for users I will never meet. The design system had to be opinionated enough to feel cohesive and flexible enough for miniapps that do not exist yet.',
        'The HUD operates on a principle I call \u201Cglance, don\u2019t gaze.\u201D Every piece of information must be understood in under two seconds of peripheral attention.',
      ],
    },
    {
      type: 'image',
      src: '',
      alt: 'MentraOS HUD design \u2014 glanceable interface showing ambient notifications, AI waveform, and contextual cards in peripheral vision',
    },
    {
      type: 'text',
      title: 'Voice-First, Screen-Second',
      body: [
        'Voice is the primary input. The AI handles natural language queries, contextual responses from the camera feed, and proactive suggestions from time and location. Visual feedback is minimal by design: a thin amber waveform that pulses while listening and settles when processing.',
      ],
    },
    {
      type: 'text',
      title: 'Notification Architecture',
      body: [
        'On glasses, every notification competes with reality. I designed three tiers: ambient (subtle color shift at the frame edge), informational (translucent one-line card), and urgent (persistent card with haptic pulse requiring voice dismissal). Users assign tiers per app, and MentraOS learns from behavior.',
      ],
    },
    {
      type: 'image',
      src: '',
      alt: 'Notification architecture diagram \u2014 three-tier system showing ambient, informational, and urgent notification patterns with visual hierarchy',
    },

    /* ── MiniApp Store ────────────────────────────────────────── */
    {
      type: 'text',
      id: 'cs-store',
      label: 'MiniApp Store',
      title: 'The App Store That Lives on Your Face',
      body: [
        'This is what separates Mentra from everything else. Meta Ray-Ban Gen 2 ships at the same $299 price point but is a closed system. Mentra is the opposite: an open marketplace where any developer can ship.',
        'Designing a store for a HUD meant rethinking every convention. No icon grid. No screenshot carousel. The on-glasses store is voice-navigated and context-curated.',
      ],
    },
    {
      type: 'image',
      src: '',
      alt: 'MiniApp Store interface \u2014 voice-navigated store layout with contextual app suggestions, category browsing, and developer submission portal',
    },
    {
      type: 'text',
      title: 'Discoverability Without Browsing',
      body: [
        'The store surfaces miniapps from three signals: what you are doing, where you are, and what you are asking for. The result feels less like a catalog and more like a knowledgeable friend who always knows the right tool.',
      ],
    },
    {
      type: 'text',
      title: 'Developer Experience',
      body: [
        'I designed the portal and SDK docs with the same care as the consumer product. Submission is three steps: upload, metadata, review. The docs follow a \u201Cfirst miniapp in 15 minutes\u201D philosophy.',
      ],
    },
    {
      type: 'pullquote',
      quote:
        '\u201CAn app store on your face sounds absurd until you use it. Then every other pair of smart glasses feels like a flip phone.\u201D',
      cite: '\u2014 Early beta tester feedback',
    },

    /* ── Design Evolution (Timeline) ──────────────────────────── */
    {
      type: 'timeline',
      id: 'cs-timeline',
      label: 'Design Evolution',
      title: 'From Zero to Shipping Product',
      body: [
        'Building the UX for an entirely new product category meant evolving the design as our understanding of face-worn computing deepened. Here is how the product and its design language matured.',
      ],
      items: [
        {
          date: 'Q1 2025',
          heading: 'Foundation & Research',
          description:
            'Competitive audit of every smart glasses product since Google Glass. Established core UX principles: glance-not-gaze, voice-first input, and peripheral-priority information hierarchy. Built the initial design system for MentraOS.',
        },
        {
          date: 'Q2 2025',
          heading: 'Companion App & Onboarding',
          description:
            'Designed and iterated the companion app from wireframes to high-fidelity. Reduced the onboarding flow from twelve steps to four. Validated the one-tap QR pairing pattern with hardware prototypes.',
        },
        {
          date: 'Q3 2025',
          heading: 'MentraOS HUD & Notification System',
          description:
            'Developed the three-tier notification architecture. Iterated the HUD layout through Protopie simulations and on-device testing. Established the amber waveform as the AI\u2019s visual signature.',
        },
        {
          date: 'Q4 2025',
          heading: 'MiniApp Store & Developer Platform',
          description:
            'Shipped the MiniApp Store design with voice-navigated browsing. Built the developer portal, SDK documentation, and submission flow. Designed the review and curation system.',
        },
        {
          date: 'Q1 2026',
          heading: 'Launch & Iteration',
          description:
            'Mentra Glass shipped at $299 with Batch 2 at 88% claimed. Ongoing iteration on the design system based on developer and user feedback. Expanding the notification architecture with AI-driven priority learning.',
        },
      ],
    },

    /* ── Impact ───────────────────────────────────────────────── */
    {
      type: 'text',
      id: 'cs-impact',
      label: 'Impact',
      title: 'Shipping, Not Pitching',
      body: [
        'Mentra Live is not a concept deck. It is shipping at $299, backed by the founders of YouTube, Android, and Pebble \u2014 plus Y Combinator, Amazon, and Toyota Ventures. Press coverage spans Forbes, GamesBeat, Gizmodo, Android Police, and 9to5Google.',
      ],
    },
    {
      type: 'stats',
      label: 'Impact',
      title: 'Key Metrics',
      stats: [
        { label: 'Onboarding Time', value: '< 60s' },
        { label: 'Batch 2 Claimed', value: '88%' },
        { label: 'Onboarding Steps', value: '12 \u2192 4' },
        { label: 'Design Surfaces', value: '5' },
      ],
    },
    {
      type: 'info-grid',
      items: [
        { key: 'Price', value: '$299' },
        { key: 'Weight', value: '43g' },
        { key: 'Battery Life', value: '12+ hrs' },
        { key: 'Camera FOV', value: '119\u00B0' },
        { key: 'Prescription', value: 'Ready' },
        { key: 'OS', value: 'Open Source' },
      ],
    },
    {
      type: 'callout',
      text: '\u201CBacked by the founders of YouTube, Android & Pebble \u2014 plus Y\u00A0Combinator, Amazon & Toyota Ventures.\u201D',
    },

    /* ── Reflections ──────────────────────────────────────────── */
    {
      type: 'numbered-list',
      id: 'cs-reflections',
      label: 'Reflections',
      title: 'What Building for the Face Taught Me',
      items: [
        'World-first design is a different discipline. On a phone, the screen is the world. On glasses, the world is the screen. Every decision starts with: does this help the user engage with reality, or pull them away?',
        'Constraint is the best creative force. A peripheral display, 43 grams, voice-first input \u2014 no hover states, no scroll, no tap targets. What remains is the essence of the information.',
        'Open ecosystems demand opinionated design systems. The more open the platform, the more disciplined the design language must be.',
        'Trust is a design material. Privacy indicators, recording lights, clear permissions \u2014 these are not features. They are the foundation that makes every other feature possible.',
      ],
    },

    /* ── Credits ──────────────────────────────────────────────── */
    {
      type: 'credits',
      credits: [
        { role: 'Head of UI/UX', name: 'Parth Pawar' },
        { role: 'Company', name: 'Mentra Glass' },
        { role: 'Tools', name: 'Figma, Protopie, Blender' },
        { role: 'Platforms', name: 'MentraOS, iOS, Android, Web' },
      ],
    },

    /* ── Thank You ────────────────────────────────────────────── */
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
