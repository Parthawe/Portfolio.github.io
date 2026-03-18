import type { ProjectMeta } from '@/types/project'

export const oncallLens: ProjectMeta = {
  slug: 'oncall-lens',
  title: 'OnCall Lens',
  subtitle:
    'Transforming Sentry alerts into automated PR patches via smart glasses \u2014 so on-call engineers can fix production bugs without opening a laptop',
  description:
    'OnCall Lens \u2014 Transforming Sentry alerts into automated PR patches via smart glasses. Built at Daytona HackSprint SF, Jan 2026 at Sentry HQ. Case study by Parth Pawar.',
  ogImage: 'https://www.designwhich.works/Assets/images/oncall-lens.png',
  heroImage: '/Assets/images/oncall-lens.png',
  projectColor: '#2D3748',
  tags: ['AI', 'Developer Tools', 'Hackathon', 'Smart Glasses'],
  infoItems: [
    { label: 'Role', value: 'Designer + Developer' },
    { label: 'Timeline', value: 'Jan 2026' },
    { label: 'Team', value: 'Hackathon team' },
    { label: 'Platform', value: 'Glasses + Web' },
  ],
  backLink: { label: '\u2190 Back to Work', href: '/work' },
  nextProject: {
    slug: 'ai-voice',
    title: 'AI Voice Interface',
    image: '/Assets/images/ai-voice.png',
  },
  categories: ['ai'],
  bottomNavSections: [
    { id: 'cs-vision', label: 'Vision & Role' },
    { id: 'cs-context', label: 'Context' },
    { id: 'cs-bet', label: 'The Bet' },
    { id: 'cs-challenges', label: 'Challenges' },
    { id: 'cs-glasses', label: 'Glasses UX' },
    { id: 'cs-pipeline', label: 'Fix Pipeline' },
    { id: 'cs-miniapp', label: 'Mini-App' },
    { id: 'cs-impact', label: 'Impact' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  credits: [
    { role: 'Product Designer + Developer', name: 'Parth Pawar' },
    { role: 'Event', name: 'Daytona HackSprint #4, SF' },
    {
      role: 'Stack',
      name: 'Bun, TypeScript, Fastify, MongoDB, Claude, Daytona, CodeRabbit',
    },
    { role: 'Platform', name: 'Mentra Smart Glasses, Web' },
  ],
  sections: [
    // ── OVERVIEW — THE VISION + MY ROLE ──────────────────────────
    {
      type: 'overview',
      id: 'cs-vision',
      columns: [
        {
          heading: 'The Vision',
          body: 'On-call engineering is a brutal reality of modern software. An alert fires at 3am, you fumble for your laptop, spend twenty minutes finding the right repo, and another forty minutes understanding a stack trace someone else wrote. OnCall Lens eliminates that entire sequence. Sentry detects the error, your smart glasses show the alert, you tap \u201cFix,\u201d and a Claude-powered agent spins up a Daytona workspace, writes a patch, gets it reviewed by CodeRabbit, and opens a PR \u2014 all before you finish your coffee.',
        },
        {
          heading: 'My Role',
          body: 'As Product Designer and Developer, I designed the glasses notification UX, the incident response flow, and the Mentra mini-app interface that runs on the glasses. I also helped build the frontend that ties the smart glasses server to the backend orchestrator. In a 24-hour hackathon, the line between designer and developer does not exist \u2014 you design in code and ship in real time.',
        },
      ],
    },

    // ── CONTEXT — ON-CALL IS BROKEN ──────────────────────────────
    {
      type: 'text',
      id: 'cs-context',
      label: 'Context',
      title: 'On-Call Is Broken',
      body: [
        'Every engineer who has carried a pager knows the feeling. The alert arrives at the worst possible time. You are asleep, at dinner, on a train. You open your laptop, SSH into a production box or pull up a dashboard, and begin the slow process of reconstructing what happened. Context switching from life to incident response takes minutes. Understanding the error takes longer. Writing a fix \u2014 if you even have the right codebase cloned \u2014 takes longer still.',
        'The tools have improved. Sentry surfaces rich stack traces, PagerDuty routes alerts intelligently, Slack threads keep context. But the fundamental loop has not changed: a human gets woken up, opens a computer, reads a wall of text, and manually writes a patch. The human is the bottleneck at every step.',
      ],
    },

    {
      type: 'callout',
      text: '\u201cThe best incident response is the one where the engineer never has to open a laptop. The second best is the one where the laptop is already open and the fix is already written.\u201d',
    },

    // ── THE BET — AI FIRST RESPONDER ─────────────────────────────
    {
      type: 'text',
      id: 'cs-bet',
      label: 'The Bet',
      title: 'What If the First Responder Was an AI Agent?',
      body: [
        'The thesis behind OnCall Lens is a simple inversion: instead of paging a human to debug and fix, page an AI agent to debug and fix \u2014 and page the human only to approve. The engineer becomes the decision-maker, not the debugger. They glance at their glasses, see a one-line summary of the error and the proposed fix, and tap \u201cApprove\u201d or \u201cReject.\u201d That is the entire interaction.',
        'This is not about replacing engineers. It is about respecting their time and sleep. The AI agent does the mechanical work \u2014 reading stack traces, finding the relevant code, writing a patch, running tests. The human does what humans are best at: deciding whether this fix is correct and whether it should ship.',
        'Smart glasses are the perfect interface for this. You do not need a laptop to approve a PR. You need three seconds of attention and a single tap.',
      ],
    },

    // ── DESIGN CHALLENGES — FOUR CARDS ───────────────────────────
    {
      type: 'features',
      id: 'cs-challenges',
      label: 'Design Challenges',
      title: 'Four Constraints, Twenty-Four Hours',
      body: [
        'Building OnCall Lens at a hackathon meant every design decision had to be made fast and right. There was no time for user research, no room for iteration cycles, and no luxury of polishing what did not work. These were the four constraints that shaped every choice.',
      ],
      cards: [
        {
          title: '3-Second Notification',
          description:
            'A Sentry alert on glasses needs to be understood in three seconds or less. No scrolling, no detail views, no multi-step flows. I had to compress a stack trace, an error severity, and a service name into a single glanceable card that an engineer could triage without removing their glasses or reaching for a phone.',
        },
        {
          title: 'Human-in-the-Loop Trust',
          description:
            'An AI agent writing code and opening PRs on production repos is a trust problem. Engineers will not approve a fix they do not understand. The challenge was designing a review surface on a glasses display that conveys enough information to make an informed decision without overwhelming a 3am brain.',
        },
        {
          title: 'Transparent AI Debugging',
          description:
            'When Claude analyzes a stack trace and proposes a fix, the reasoning needs to be visible. Black-box AI fixes are a non-starter for production code. I designed a step-by-step progress view that shows the agent\u2019s reasoning chain \u2014 what it found, what it changed, and why \u2014 in a format that works on both glasses and the web dashboard.',
        },
        {
          title: '24-Hour Time Pressure',
          description:
            'A hackathon demands ruthless prioritization. Every design asset, every interaction, every screen had to be scoped to what could be built and demoed in a single day. I designed the entire UX in Figma in the first three hours and then switched to code for the remaining twenty-one. No handoff. No spec documents. Just build.',
        },
      ],
    },

    // ── GLASSES NOTIFICATION UX ──────────────────────────────────
    {
      type: 'steps',
      id: 'cs-glasses',
      label: 'Glasses UX',
      title: 'Alert, Glance, Tap, Fixed',
      body: [
        'The glasses notification flow is the heart of OnCall Lens. It is the interface between a production incident and a human decision. Every detail was designed to minimize cognitive load at the moment when cognitive load is highest \u2014 3am, half asleep, adrenaline spiking from a page.',
      ],
      steps: [
        {
          num: 1,
          title: 'Sentry Alert',
          description:
            'Sentry detects a new error or a spike in an existing one. The webhook fires to the OnCall Lens backend, which parses severity, service name, and a one-line error summary.',
        },
        {
          num: 2,
          title: 'Glasses Card',
          description:
            'A notification card appears on the on-call engineer\u2019s smart glasses: service name, error type, severity badge, and a single action button. Red for critical, amber for warning. The card auto-dismisses in ten seconds if not engaged.',
        },
        {
          num: 3,
          title: 'Tap to Fix',
          description:
            'The engineer taps the \u201cFix\u201d button on the glasses frame. This triggers the backend orchestrator to spin up a Daytona workspace, clone the repo, and dispatch the Claude agent to analyze the error and write a patch.',
        },
        {
          num: 4,
          title: 'PR Ready',
          description:
            'Minutes later, a second card appears on the glasses: \u201cFix ready for review.\u201d The engineer taps to see a diff summary, the CodeRabbit review score, and two buttons \u2014 Approve or Reject. One tap to merge. Done.',
        },
      ],
    },

    // ── (post-steps body text) ───────────────────────────────────
    {
      type: 'text',
      id: undefined,
      label: undefined,
      title: '',
      body: [
        'The entire flow \u2014 from Sentry alert to merged PR \u2014 can complete without the engineer ever leaving bed. The glasses handle triage and approval. The AI handles everything else.',
      ],
    },

    // ── FIX PIPELINE ─────────────────────────────────────────────
    {
      type: 'steps',
      id: 'cs-pipeline',
      label: 'Fix Pipeline',
      title: 'From Stack Trace to Pull Request',
      body: [
        'Behind the simple tap on the glasses is a multi-stage pipeline that orchestrates AI analysis, code generation, and automated review. Each stage is designed to be observable \u2014 the engineer can check progress on the glasses mini-app or the web dashboard at any time.',
      ],
      steps: [
        {
          num: 1,
          title: 'Daytona Workspace',
          description:
            'A fresh Daytona workspace spins up in seconds with the correct repo, branch, and environment. No local setup, no stale dependencies. The workspace is ephemeral \u2014 it exists only for this fix and is destroyed after the PR is opened.',
        },
        {
          num: 2,
          title: 'Claude Analysis',
          description:
            'Claude (Anthropic) with tool use reads the Sentry error payload, navigates the codebase, identifies the root cause, and writes a patch. The agent uses structured tool calls to read files, search code, and run tests \u2014 not a single monolithic prompt.',
        },
        {
          num: 3,
          title: 'CodeRabbit Review',
          description:
            'The proposed patch is automatically submitted for CodeRabbit review. The review checks for correctness, style conformance, and potential regressions. If issues are found, Claude refines the patch \u2014 a human-in-the-loop cycle between two AI systems, with the human as the final approver.',
        },
        {
          num: 4,
          title: 'PR Opened',
          description:
            'Once the patch passes review, a pull request is opened on GitHub with a clear description: what broke, why it broke, what the fix does, and the CodeRabbit review summary. The on-call engineer gets the final notification on their glasses to approve or reject.',
        },
      ],
    },

    // ── MINI-APP INTERFACE ───────────────────────────────────────
    {
      type: 'text',
      id: 'cs-miniapp',
      label: 'Mini-App',
      title: 'The Mentra Mini-App for Incident Response',
      body: [
        'OnCall Lens runs as a Mentra mini-app on the smart glasses \u2014 a lightweight interface built specifically for the glasses display. The mini-app has three views, each designed around the principle that on-call engineers should never need to read more than two lines of text at a glance.',
        'The <strong>Incident Feed</strong> shows active Sentry alerts ranked by severity, with color-coded badges and one-tap actions. The <strong>Fix Status</strong> view displays the current pipeline stage \u2014 workspace spinning up, agent analyzing, review in progress, PR ready \u2014 as a simple progress bar with a one-line status label. The <strong>Approval View</strong> shows the diff summary, review score, and two large tap targets: green for approve, red for reject.',
        'Building this as a Mentra mini-app meant leveraging the MentraOS design system \u2014 the same notification patterns, typography scale, and interaction primitives I designed at Mentra. The OnCall Lens mini-app feels native to the glasses because it is native to the OS.',
      ],
    },

    // ── IMPACT ───────────────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-impact',
      label: 'Impact',
      title: 'Built in 24 Hours at Sentry HQ',
      body: [
        'OnCall Lens was built from scratch at the Daytona HackSprint #4 in San Francisco, January 24, 2026, hosted at Sentry\u2019s headquarters. In twenty-four hours, we went from a whiteboard sketch to a working end-to-end demo: a real Sentry alert triggering a real Claude agent in a real Daytona workspace, producing a real PR reviewed by CodeRabbit, all controlled from smart glasses.',
      ],
    },

    {
      type: 'info-grid',
      id: undefined,
      items: [
        { key: 'Build Time', value: '24 hours' },
        { key: 'Event', value: 'Daytona HackSprint #4' },
        { key: 'Location', value: 'Sentry HQ, SF' },
        { key: 'Backend', value: 'Bun + Fastify' },
        { key: 'AI Agent', value: 'Claude (Anthropic)' },
        { key: 'Demo', value: 'End-to-end working' },
      ],
    },

    {
      type: 'text',
      id: undefined,
      label: undefined,
      title: '',
      body: [
        'The tech stack \u2014 Bun, TypeScript, Fastify, MongoDB, Claude with tool use, Daytona workspaces, CodeRabbit, and GitHub \u2014 was chosen for speed and reliability. Every component had to work on the first try. In a hackathon, you do not get a second deploy.',
      ],
    },

    // ── REFLECTIONS ──────────────────────────────────────────────
    {
      type: 'numbered-list',
      id: 'cs-reflections',
      label: 'Reflections',
      title: 'What Designing for Urgency Taught Me',
      items: [
        '<strong>Urgency compresses design to its essentials.</strong> When the user is an engineer woken up at 3am, every extra word, every unnecessary screen, every ambiguous icon is a failure. Designing for on-call stripped my work down to the absolute minimum viable information: what broke, how bad, what do you want to do about it. That discipline carries into everything I design now.',
        '<strong>Hackathons reward conviction over consensus.</strong> In twenty-four hours, there is no time for design reviews, stakeholder alignment, or A/B tests. You make a decision, commit to it, and build. The OnCall Lens UX was designed in three hours and coded in twenty-one. Some of the best design work happens when you remove the option to second-guess.',
        '<strong>AI agents need transparent reasoning, not just correct outputs.</strong> Engineers will not trust a black-box fix on a production system. The step-by-step pipeline view \u2014 showing what Claude found, what it changed, and why \u2014 was not a nice-to-have. It was the feature that made the entire product usable. Trust is built through visibility.',
        '<strong>Smart glasses are the right interface for interrupt-driven work.</strong> On-call is inherently an interrupt. You are doing something else, and then you are not. A laptop requires context-switching to an entirely different device and mental mode. Glasses let you stay in your current context and handle the interrupt with a glance and a tap. The form factor matches the task.',
      ],
    },

    // ── CREDITS ──────────────────────────────────────────────────
    {
      type: 'credits',
      id: undefined,
      credits: [
        { role: 'Product Designer + Developer', name: 'Parth Pawar' },
        { role: 'Event', name: 'Daytona HackSprint #4, SF' },
        {
          role: 'Stack',
          name: 'Bun, TypeScript, Fastify, MongoDB, Claude, Daytona, CodeRabbit',
        },
        { role: 'Platform', name: 'Mentra Smart Glasses, Web' },
      ],
    },

    // ── THANK YOU ────────────────────────────────────────────────
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
