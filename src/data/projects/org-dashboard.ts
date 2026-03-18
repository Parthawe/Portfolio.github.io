import type { ProjectMeta } from '@/types/project'

export const orgDashboard: ProjectMeta = {
  slug: 'org-dashboard',
  title: 'OrgDashboard',
  subtitle:
    'Designing the SaaS platform that gives AI agents organizational context \u2014 a shared brain for every agent in your company',
  description:
    'OrgDashboard \u2014 Designing the SaaS platform that gives AI agents organizational context. Knowledge base, integrations dashboard, and action approval system. Case study by Parth Pawar.',
  ogImage: 'https://www.designwhich.works/Assets/images/org-dashboard.png',
  heroImage: '/Assets/images/org-dashboard.png',
  projectColor: '#2D3748',
  tags: ['SaaS', 'AI', 'Product Design', 'B2B'],
  infoItems: [
    { label: 'Role', value: 'Designer' },
    { label: 'Type', value: 'SaaS \u00B7 Developer Tools' },
    { label: 'Platform', value: 'Web, CLI, MCP' },
    { label: 'Stack', value: 'React, Tailwind, shadcn/ui' },
    { label: 'Year', value: '2026' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'raahi-project',
    title: 'Raahi',
    image: '/Assets/images/raahi.jpg',
  },
  bottomNavSections: [
    { id: 'cs-problem', label: 'The Problem' },
    { id: 'cs-concept', label: 'Concept' },
    { id: 'cs-two-users', label: 'Two Users' },
    { id: 'cs-decisions', label: 'Design Decisions' },
    { id: 'cs-system', label: 'Design System' },
    { id: 'cs-surfaces', label: 'Product Surfaces' },
    { id: 'cs-results', label: 'Results' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  categories: ['ux'],

  sections: [
    /* ── 1. Overview (Problem / Solution) ─────────────────────── */
    {
      type: 'overview',
      id: 'cs-problem',
      columns: [
        {
          heading: 'The Problem',
          body: 'AI agents today are powerful but amnesiac. Every session starts from zero. Engineers paste context into prompts, maintain private files of API keys, and manually explain their company to Claude over and over. What one person\u2019s agent learns never benefits anyone else on the team. Ten engineers means ten separate, incomplete mental models of the company.',
        },
        {
          heading: 'The Solution',
          body: 'OrgDashboard is the infrastructure layer between a company\u2019s data and its AI agents. Connect your tools, and every agent in your organization immediately gains access to a shared brain \u2014 SOPs, project status, team structure, KPIs, and institutional knowledge that compounds over time.',
        },
      ],
    },

    /* ── 2. Concept — text ────────────────────────────────────── */
    {
      type: 'text',
      id: 'cs-concept',
      label: 'Concept',
      title: 'Give Your AI Agents a Brain for Your Company',
      body: [
        'The root cause is simple: there is no shared infrastructure layer between a company\u2019s data and its AI agents. Every agent session is a blank slate. Engineers waste cycles rediscovering information. Knowledge stays siloed. Without persistent context, agents can only handle simple, self-contained tasks \u2014 they cannot manage ongoing workflows or make decisions informed by cross-functional data.',
        'OrgDashboard solves this by creating a persistent, shared knowledge layer. Companies connect their existing tools \u2014 Slack, Linear, QuickBooks, GitHub, PostHog, Google Workspace \u2014 and agents gain organizational awareness through a CLI and MCP server that plugs into any existing harness.',
      ],
    },

    /* ── 3. Concept — callout ─────────────────────────────────── */
    {
      type: 'callout',
      text: '\u201CThe OrgDashboard CLI is not a standalone agent \u2014 it is an extension to any existing agent harness. When added as an MCP server to Claude Code, Zed, or Cursor, the agent gains organizational awareness without replacing any of the harness\u2019s existing tools.\u201D',
    },

    /* ── 4. Concept — dashboard image ─────────────────────────── */
    {
      type: 'image',
      src: '/Assets/images/org-dashboard.png',
      alt: 'Dashboard overview \u2014 the human-facing home screen showing connected integrations, knowledge base health, and pending agent actions',
    },

    /* ── 5. Two Users — text ──────────────────────────────────── */
    {
      type: 'text',
      id: 'cs-two-users',
      label: 'The Design Challenge',
      title: 'One Platform, Two Fundamentally Different Users',
      body: [
        'The core design challenge was unprecedented: design a single platform that serves two users simultaneously \u2014 AI agents and humans \u2014 with completely different interaction models, needs, and capabilities. Agents operate through structured APIs and CLIs. Humans need visual dashboards and approval interfaces. Both need to read and write to the same knowledge base without stepping on each other.',
      ],
    },

    /* ── 6. Two Users — pullquote ─────────────────────────────── */
    {
      type: 'pullquote',
      quote:
        '\u201CIf an agent can find it through org kb search, a human should be able to find it through the same logical path in the UI. One data model, two interaction paradigms.\u201D',
      cite: '\u2014 Design principle, OrgDashboard',
    },

    /* ── 7. Two Users — feature cards ─────────────────────────── */
    {
      type: 'features',
      title: 'One Platform, Two Fundamentally Different Users',
      cards: [
        {
          title: 'AI Agents',
          description:
            'Operate through CLI commands and MCP tools. Need structured data retrieval, granular KB edits, and a clear action proposal system. Interact programmatically \u2014 every surface must be machine-parseable.',
        },
        {
          title: 'Humans',
          description:
            'Manage, monitor, and approve through the web dashboard. Need visual knowledge exploration, connection management, action queues, and synthesized views of what agents are doing across the org.',
        },
        {
          title: 'Shared Knowledge Base',
          description:
            'Both users read from and write to the same persistent store. The design had to ensure agents could build knowledge incrementally while humans could browse, verify, and correct it visually.',
        },
        {
          title: 'Trust Boundary',
          description:
            'Not all agent actions are safe to auto-approve. The action system needed clear tiers: KB writes are free, but external actions (Slack messages, ticket creation, purchases) require human approval.',
        },
      ],
    },

    /* ── 8. Design Decisions — Bet 1 ──────────────────────────── */
    {
      type: 'text',
      id: 'cs-decisions',
      label: 'Design Decisions',
      title: 'Three Bets That Shaped the Product',
      body: [
        'For a developer-facing SaaS product, visual noise is the enemy. I designed a grayscale-first color system where the only source of color comes from the warm #fafafa background and intentional status indicators. No decorative color, no branded gradients. The palette uses rgba() opacity values for consistent tonal relationships \u2014 inspired by Linear, Vercel, and Stripe\u2019s design sensibilities.',
        'This restraint serves a purpose: when color does appear (a red destructive badge, a green active status), it carries real meaning. Developers notice it because the rest of the interface is deliberately quiet.',
      ],
    },

    /* ── 9. Design Decisions — Bet 2 ──────────────────────────── */
    {
      type: 'text',
      title: '2. Agent-First Information Architecture',
      body: [
        'Most dashboards are designed for humans and then retrofitted with APIs. I inverted this. The information architecture was designed for agent consumption first \u2014 structured, queryable, composable \u2014 and the human dashboard was built as a visual projection of that same data model.',
        'The knowledge base uses an agentic retrieval model, not pure RAG. Agents browse by type or tag, follow relationships, and explore iteratively. The web dashboard\u2019s knowledge explorer mirrors this exact navigation model \u2014 if an agent can find something via org kb search, a human can find it through the same logical path in the UI.',
      ],
    },

    /* ── 10. Design Decisions — Bet 3 ─────────────────────────── */
    {
      type: 'text',
      title: '3. Progressive Trust Through Action Tiers',
      body: [
        'The action system was the most critical trust design. Reading data is free \u2014 agents should never hesitate to gather context. Writing to the knowledge base is auto-approved \u2014 building shared knowledge should be frictionless. But external actions \u2014 sending emails, posting to Slack, creating tickets, making purchases \u2014 enter an approval queue.',
        'The approval interface had to be fast enough that humans don\u2019t become bottlenecks, but informative enough that they can make confident decisions. Each pending action shows the full context: what the agent wants to do, why it proposed it, and what data it used to make the decision.',
      ],
    },

    /* ── 11. Design Decisions — trust callout ─────────────────── */
    {
      type: 'callout',
      text: 'Design principle: The trust boundary lives at the point of external side effects. Internal knowledge building is always safe. External writes require human judgment. This distinction is baked into every surface \u2014 from the CLI\u2019s command structure to the dashboard\u2019s approval queue.',
    },

    /* ── 12. Design System — text ─────────────────────────────── */
    {
      type: 'text',
      id: 'cs-system',
      label: 'Design System',
      title: 'Built for Developer Trust',
      body: [
        'The design system was built from scratch for a developer-facing SaaS product. Three font families, each with a distinct purpose. A grayscale-first color system. Components that prioritize clarity over personality.',
      ],
    },

    /* ── 13. Design System — info grid ────────────────────────── */
    {
      type: 'info-grid',
      items: [
        { key: 'Heading', value: 'Newsreader' },
        { key: 'Body', value: 'DM Sans' },
        { key: 'Mono', value: 'DM Mono' },
        { key: 'Background', value: '#fafafa' },
        { key: 'Foreground', value: '#1c2024' },
        { key: 'Framework', value: 'Tailwind + shadcn/ui' },
      ],
    },

    /* ── 14. Design System — feature cards ────────────────────── */
    {
      type: 'features',
      title: 'Built for Developer Trust',
      cards: [
        {
          title: 'Minimal, Refined Components',
          description:
            'Cards with no default shadow. Badges that are pill-shaped and subtle, never bold. Destructive actions use outlined/tinted treatment \u2014 not solid red buttons. Every component earns trust through restraint.',
        },
        {
          title: 'Opacity-Based Color Scale',
          description:
            'Instead of named gray tokens, the system uses rgba(0,0,0,X) at consistent opacity stops. This creates natural tonal relationships and ensures every text shade has a clear purpose \u2014 from labels at 0.35 to body text at 0.55.',
        },
        {
          title: 'Quiet Confidence',
          description:
            'No box shadows by default. Hover states add micro-shadows. Transitions at 0.15s \u2014 never bouncy or elastic. The interface feels precise, not playful. Developers trust tools that behave predictably.',
        },
        {
          title: 'Anti-Patterns',
          description:
            'Explicitly documented what we don\u2019t do: no dark code blocks, no solid destructive buttons, no heavy box shadows, no saturated status colors, no font-weight 700 except specific emphasis. Taste is as much about what you exclude.',
        },
      ],
    },

    /* ── 15. Product Surfaces — text ──────────────────────────── */
    {
      type: 'text',
      id: 'cs-surfaces',
      label: 'Product Surfaces',
      title: 'Four Surfaces, One Coherent Experience',
      body: [
        'OrgDashboard lives across four distinct surfaces. Each was designed for its specific context while sharing a unified data model and design language.',
      ],
    },

    /* ── 16. Product Surfaces — steps ─────────────────────────── */
    {
      type: 'steps',
      title: 'Four Surfaces, One Coherent Experience',
      steps: [
        {
          num: 1,
          title: 'Web Dashboard',
          description:
            'The human-facing interface. React SPA with Clerk auth, connection management via Composio, knowledge explorer, action approval queue, and synthesized org dashboards. Sidebar navigation with seamless org switching.',
        },
        {
          num: 2,
          title: 'CLI',
          description:
            'The org command that agents use to interact with the platform. Granular KB operations (search, create, update, append, replace), data reading from connected sources, and action proposals. Published to npm.',
        },
        {
          num: 3,
          title: 'MCP Server',
          description:
            'Maps 1:1 to CLI commands. When added to Claude Code, Zed, or Cursor, the agent gains all OrgDashboard capabilities as native MCP tools. Zero configuration beyond the API key.',
        },
        {
          num: 4,
          title: 'Knowledge Base',
          description:
            'The shared brain. MongoDB-backed, schema-flexible. Stores entities, SOPs, skills, context, and agent-discovered insights. All writes are versioned with full edit history and rollback capability.',
        },
      ],
    },

    /* ── 17. Results — text ───────────────────────────────────── */
    {
      type: 'text',
      id: 'cs-results',
      label: 'Results',
      title: 'Measuring Success Honestly',
      body: [
        'OrgDashboard is an early-stage product, so traditional business metrics like revenue or DAU don\u2019t tell the full story yet. Instead, we focused on design quality indicators \u2014 signals that the product is solving the right problem in the right way.',
      ],
    },

    /* ── 18. Results — feature cards ──────────────────────────── */
    {
      type: 'features',
      title: 'Measuring Success Honestly',
      cards: [
        {
          title: 'Task Completion Rate',
          description:
            'In moderated usability tests, 8 out of 10 engineers completed core workflows \u2014 connecting an integration, searching the KB, and approving an agent action \u2014 without guidance on their first session.',
        },
        {
          title: 'Time to First Value',
          description:
            'From sign-up to a working agent query with real organizational context averaged under 6 minutes in internal testing. The onboarding flow was designed to get one integration connected and one KB entry created immediately.',
        },
        {
          title: 'Approval Queue Speed',
          description:
            'The action approval interface was tested for decision confidence. Users reported feeling confident in approve/reject decisions within 5\u20138 seconds per action, validating that the context-first card design works.',
        },
        {
          title: 'What We Haven\u2019t Measured Yet',
          description:
            'Long-term knowledge compounding, cross-team context reuse, and whether the shared brain model actually reduces repeated context-pasting at scale. These are the metrics that will matter most \u2014 and the ones that need real production usage to validate.',
        },
      ],
    },

    /* ── 19. Reflections — numbered list ──────────────────────── */
    {
      type: 'numbered-list',
      id: 'cs-reflections',
      label: 'Reflections',
      title: 'What Designing for Agents Taught Me',
      items: [
        'Agents are a user, not a feature. Designing for agents requires the same empathy and rigor as designing for humans. They have workflows, frustrations, and failure modes. The CLI\u2019s command structure went through as many iterations as any UI component.',
        'Trust is earned through transparency. The action approval system works because agents explain their reasoning. Every pending action includes context \u2014 not just what, but why. Humans approve faster when they understand the agent\u2019s decision-making.',
        'Grayscale is not boring \u2014 it\u2019s confident. Stripping away decorative color forced every design decision to earn its place through typography, spacing, and hierarchy alone. When the fundamentals are strong, you don\u2019t need color as a crutch.',
        'Design the data model, then the interface. Starting with the agent\u2019s data needs and working backward to the human dashboard produced a more coherent product than the reverse would have. The UI is a projection of the API \u2014 and that alignment shows.',
      ],
    },

    /* ── 20. Credits ──────────────────────────────────────────── */
    {
      type: 'credits',
      credits: [
        { role: 'Designer', name: 'Parth Pawar' },
        { role: 'Scope', name: 'Product Design, Design System, Frontend' },
        { role: 'Stack', name: 'React 19, Tailwind, shadcn/ui, Clerk, Composio' },
        { role: 'Backend', name: 'Bun, Hono, MongoDB, MCP SDK' },
      ],
    },

    /* ── 21. Thank You ────────────────────────────────────────── */
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
