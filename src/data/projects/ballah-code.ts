import type { ProjectMeta } from '@/types/project'

export const ballahCode: ProjectMeta = {
  slug: 'ballah-code',
  title: 'Ballah Code',
  subtitle: 'AI-native desktop IDE where the AI works as a senior engineer \u2014 not a chatbot',
  description:
    'Ballah Code \u2014 AI-native desktop IDE where the AI works as a senior engineer, not a chatbot. Case study by Parth Pawar, Creator & Designer.',
  ogImage: 'https://www.designwhich.works/Assets/images/ballah-code.png',
  heroImage: '/Assets/images/ballah-code.png',
  projectColor: '#E04832',
  tags: ['Dev Tools', 'AI'],
  infoItems: [
    { label: 'Role', value: 'Creator & Designer' },
    { label: 'Timeline', value: '2026' },
    { label: 'Type', value: 'Dev Tools \u00b7 AI' },
    { label: 'Team', value: 'Solo / Founder' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'keyboard-project',
    title: 'BreakGen',
    image: '/Assets/images/keyboard.jpg',
  },
  bottomNavSections: [
    { id: 'cs-overview', label: 'Overview' },
    { id: 'cs-problem', label: 'The Problem' },
    { id: 'cs-decisions', label: 'Design Decisions' },
    { id: 'cs-architecture', label: 'Architecture' },
    { id: 'cs-features', label: 'Key Features' },
    { id: 'cs-results', label: 'Results & Status' },
  ],
  categories: ['ai'],
  sections: [
    // ── 01 — Overview ──────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-overview',
      label: '01 \u2014 Overview',
      title: 'A Development Environment That Treats AI as a Senior Engineer',
      body: [
        'Ballah Code is a native desktop development environment that treats AI as a trusted senior engineer architect \u2014 not a disposable chatbot. The AI plans, writes specifications, delegates to workers, reviews output, and maintains decision records. Core philosophy: context is sacred, documents are first-class, and your time is spent on decisions, not management.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/images/ballah-code.png',
      alt: 'Desktop app interface',
    },

    // ── 02 — The Problem ───────────────────────────────────────
    {
      type: 'text',
      id: 'cs-problem',
      label: '02 \u2014 The Problem',
      title: 'Context Is Disposable and AI Is Replaceable',
      body: [
        'Existing AI coding tools treat context as disposable and AI as replaceable. Every conversation starts from zero. There\u2019s no persistent memory of why decisions were made, no living documents that evolve with the codebase, and no structured delegation between architect-level thinking and implementation-level execution.',
      ],
    },
    {
      type: 'pullquote',
      quote:
        '\u201CEvery conversation starts from zero. There is no persistent memory of why decisions were made, no living documents that evolve with the codebase.\u201D',
    },

    // ── 03 — Design Decisions ──────────────────────────────────
    {
      type: 'text',
      id: 'cs-decisions',
      label: '03 \u2014 Design Decisions',
      title: 'Two-Process Architecture, One Seamless Experience',
      body: [
        'The interface is built around a two-process architecture: a Bun backend handling AI calls, file system operations, and tool execution, connected to a React frontend in a native WebKit webview via typed RPC. The UI centers on a multi-workspace, multi-chat layout \u2014 file explorer with git awareness on the left, chat tabs in the center, and an integrated terminal at the bottom. Every interaction is designed to keep the developer in flow state while giving the AI full context.',
      ],
    },

    // ── 04 — Technical Architecture ────────────────────────────
    {
      type: 'text',
      id: 'cs-architecture',
      label: '04 \u2014 Technical Architecture',
      title: 'Native Performance, Minimal Footprint',
      body: [
        'Built with Electrobun for tiny ~14MB bundles and native performance. Features 17 production-ready AI tools (read, write, search, execute, diagnose, screenshot), a custom agentic loop using direct Anthropic Messages API streaming (not framework abstractions), prompt caching for long contexts, and workspace multiplexing for parallel workstreams. The standalone @ballah/agent package can run in CLI, desktop, or any frontend.',
      ],
    },
    {
      type: 'stats',
      id: 'cs-architecture-stats',
      title: 'Technical Architecture',
      stats: [
        { label: 'Bundle Size', value: '~14MB' },
        { label: 'AI Tools', value: '17' },
        { label: 'Runtime', value: 'Bun' },
        { label: 'Framework', value: 'Electrobun' },
      ],
    },

    // ── 05 — Key Features ──────────────────────────────────────
    {
      type: 'features',
      id: 'cs-features',
      label: '05 \u2014 Key Features',
      title: 'Built for Real Engineering Workflows',
      cards: [
        {
          title: 'Multi-Workspace, Multi-Chat',
          description:
            'Persistent history across workspaces and chat sessions. Switch between projects without losing context or conversation state.',
        },
        {
          title: '17 AI Tools',
          description:
            'Production-ready tools for code interaction \u2014 read, write, search, execute, diagnose. The AI operates on your codebase with the same access a senior engineer would have.',
        },
        {
          title: 'Custom Streaming Agent Loop',
          description:
            'Direct Anthropic Messages API streaming with per-step token logging. No framework abstractions between you and the model.',
        },
        {
          title: 'Typed RPC Bridge',
          description:
            'Type-safe communication between the Bun backend and the React webview. Full end-to-end type safety from AI response to UI render.',
        },
        {
          title: 'Integrated Terminal',
          description:
            'PTY session management with full terminal emulation. The AI can execute commands, and you can see everything it does in real time.',
        },
        {
          title: 'Cost Tracking & Model Flexibility',
          description:
            'Real-time progress indicators and cost tracking per conversation. Switch between Claude, Gemini, and OpenAI on a per-chat basis.',
        },
      ],
    },

    // ── 06 — Results & Status ──────────────────────────────────
    {
      type: 'text',
      id: 'cs-results',
      label: '06 \u2014 Results & Status',
      title: 'Functional Core, Ambitious Roadmap',
      body: [
        'Core desktop app is functional with all 17 tools operational, streaming AI agent loop, terminal integration, and settings persistence. The project includes an evaluation harness benchmarking against SWE-PolyBench. Living documents, architect/worker delegation, and decision ledger are in the roadmap.',
      ],
    },
    {
      type: 'features',
      id: 'cs-results-features',
      title: 'Results & Status',
      cards: [
        {
          title: 'Shipped',
          description:
            '17 AI tools, streaming agent loop, multi-workspace UI, terminal integration, settings persistence, evaluation harness.',
        },
        {
          title: 'On the Roadmap',
          description:
            'Living documents, architect/worker delegation, decision ledger, and expanded benchmark coverage.',
        },
      ],
    },

    // ── Credits ────────────────────────────────────────────────
    {
      type: 'credits',
      credits: [
        { role: 'Creator & Designer', name: 'Parth Pawar' },
        { role: 'Project', name: 'Ballah Code' },
        {
          role: 'Tools',
          name: 'Electrobun, Bun, React, TypeScript, Anthropic Claude, Tailwind CSS',
        },
        { role: 'Platform', name: 'Desktop (macOS)' },
      ],
    },

    // ── Thank You ──────────────────────────────────────────────
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
