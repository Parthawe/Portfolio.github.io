import type { ProjectMeta } from '@/types/project'

export const clawedChat: ProjectMeta = {
  slug: 'clawed-chat',
  title: 'Clawed',
  subtitle: 'Personal AI assistant for people on the go \u2014 smart glasses integration for glanceable, hands-free interactions plus a full web hub with safety modes, receipts, and one-tap approvals',
  description: 'Clawed.chat \u2014 Personal AI assistant for people on the go. Smart glasses integration, safety-first design, and receipts for every action. Case study by Parth Pawar, Product Designer.',
  ogImage: 'https://www.designwhich.works/Assets/images/clawed.png',
  heroImage: '/Assets/images/clawed.png',
  projectColor: '#8B5E34',
  tags: ['AI Assistant', 'Smart Glasses', 'Product Design', 'Full-stack Design'],
  infoItems: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Timeline', value: '2026' },
    { label: 'Team', value: 'Solo designer + engineering team' },
    { label: 'Platform', value: 'Web + Wearable' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: { slug: 'oncall-lens', title: 'OnCall Lens', image: '/Assets/images/oncall-lens.png' },
  categories: ['ai'],
  bottomNavSections: [
    { id: 'cs-vision', label: 'Vision & Role' },
    { id: 'cs-context', label: 'Context' },
    { id: 'cs-safety-philosophy', label: 'Safety Philosophy' },
    { id: 'cs-challenges', label: 'Challenges' },
    { id: 'cs-webhub', label: 'Web Hub' },
    { id: 'cs-glasses', label: 'Glasses Experience' },
    { id: 'cs-safety', label: 'Safety Architecture' },
    { id: 'cs-impact', label: 'Impact' },
    { id: 'cs-reflections', label: 'Reflections' },
  ],
  sections: [
    // ── OVERVIEW — THE VISION + MY ROLE ──────────────────────────
    {
      type: 'overview',
      id: 'cs-vision',
      columns: [
        {
          heading: 'The Vision',
          body: 'AI assistants promise to handle your life. In practice, they handle your patience. You ask them to do something, they hallucinate a confident answer, execute without asking, and leave no trail when things go wrong. Clawed exists to fix that. It is a personal AI assistant built around one conviction: if an AI acts on your behalf, you should be able to ask it under 3 seconds, get results in under 5, approve with one tap, and always have a receipt.',
        },
        {
          heading: 'My Role',
          body: 'As the sole Product Designer, I owned the entire design surface of Clawed: the marketing site, the web application with eight core pages, the smart glasses experience, the safety mode system, and the design language that holds it all together. I worked alongside an engineering team to ship a product built on React 19, TypeScript, and Tailwind \u2014 designing every screen, interaction, and approval flow from first pixel to production.',
        },
      ],
    },

    // ── CONTEXT — WHY AI ASSISTANTS FAIL ─────────────────────────
    {
      type: 'text',
      id: 'cs-context',
      label: 'Context',
      title: 'Why AI Assistants Fail',
      body: [
        'Before I designed forward, I studied the failures. AI assistants have a trust problem, and it is entirely self-inflicted. Siri, Alexa, Google Assistant \u2014 each one trained users to expect disappointment. The pattern was always the same: promise the world, deliver a timer and a weather forecast, and quietly lose credibility every time the assistant guessed wrong and acted anyway.',
        'The deeper problem is not capability. It is accountability. When an AI sends an email on your behalf with the wrong tone, there is no undo. When it books a flight you did not actually confirm, there is no receipt. When it misinterprets a voice command while you are driving, there is no safety net. Every major assistant treats autonomy as a feature and accountability as someone else\u2019s problem.',
        'The result is a generation of users who have learned to distrust the AI that is supposed to help them. They default to doing things manually \u2014 not because the AI cannot do it, but because they cannot trust that it will.',
      ],
    },
    {
      type: 'callout',
      text: '\u201cThe problem with AI assistants is not that they are too dumb. It is that they are too confident. An assistant that acts without asking and fails without apologizing is not an assistant \u2014 it is a liability.\u201d',
    },

    // ── SAFETY PHILOSOPHY — THE UNIQUE ANGLE ─────────────────────
    {
      type: 'text',
      id: 'cs-safety-philosophy',
      label: 'Safety Philosophy',
      title: 'The AI That Asks Before It Acts',
      body: [
        'Most AI assistants compete on intelligence. Clawed competes on trust. The entire product is built on a design philosophy I call \u201csafety-first autonomy\u201d \u2014 the conviction that an AI should never act on your behalf without your explicit approval, and should always leave a paper trail when it does.',
        'This philosophy is not just a design principle. It is the structural difference between Clawed and every other assistant on the market. While competitors race to make AI more autonomous, Clawed makes AI more accountable. Every interaction follows the same cadence: ask in under 3 seconds, get results in under 5, approve with one tap, always get a receipt.',
        'The result is counterintuitive: the assistant that asks permission is actually faster than the one that does not. Users stop second-guessing, stop checking behind the AI\u2019s back, and stop reverting actions they never authorized. When you trust the system, you use the system. Trust is speed.',
      ],
    },
    {
      type: 'pullquote',
      quote: '\u201cI finally stopped re-checking every email my AI sent. The receipt shows me exactly what went out, and the approval step means nothing leaves without my say-so. It is the first assistant I actually trust.\u201d',
      cite: 'Early user testing participant, week 2 of beta',
    },

    // ── DESIGN CHALLENGES — FOUR CARDS ───────────────────────────
    {
      type: 'features',
      id: 'cs-challenges',
      label: 'Design Challenges',
      title: 'Four Problems That Shaped Every Decision',
      body: [
        'Clawed is not one product. It is a web hub, a glasses experience, a command bar, an approval system, and a receipt ledger \u2014 all of which need to feel like the same product whether you are at your desk or walking down the street. Every design challenge came back to the same question: how do you make an AI assistant feel fast, safe, and coherent across fundamentally different contexts?',
      ],
      cards: [
        {
          title: 'Glanceable on Glasses',
          description: 'Smart glasses give you seconds, not minutes. Every piece of information the AI surfaces on the glasses display needs to be understood in a single glance \u2014 no scrolling, no reading paragraphs, no squinting at fine print. I designed a card-based system where every response fits into a structured template: icon, one-line summary, action button. If it does not fit the card, it gets pushed to the web hub.',
        },
        {
          title: 'Trust Through Transparency',
          description: 'Users do not trust AI by default. They trust AI that shows its work. Every action Clawed takes generates a receipt \u2014 a timestamped, human-readable record of what happened, what the AI recommended, what the user approved, and what the outcome was. The receipt system is not a logging feature. It is the core trust mechanism of the entire product.',
        },
        {
          title: 'Command-Line Speed + GUI Comfort',
          description: 'Power users want keyboard shortcuts and a command bar. New users want buttons and visual cues. Clawed\u2019s Command Bar (\u2318K) bridges both worlds \u2014 a fuzzy-search interface that lets you type natural language or structured commands, with inline previews and one-keystroke execution. Every action available in the GUI is available in the command bar, and vice versa.',
        },
        {
          title: 'Multi-Device Coherence',
          description: 'The same user might ask Clawed something on their glasses while walking, approve the result on their phone at a stoplight, and review the receipt on their laptop at the office. The design system needed to be device-aware without being device-dependent \u2014 the same information architecture, adapted to each context, with state that syncs seamlessly across all three.',
        },
      ],
    },

    // ── WEB HUB ──────────────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-webhub',
      label: 'Web Hub',
      title: 'The Brain You Come Back To',
      body: [
        'The glasses handle the moments. The web hub handles the thinking. It is where you manage your inbox, review AI-drafted responses, configure safety modes, browse your timeline of actions, and connect third-party services. I designed eight core pages \u2014 Dashboard, Inbox, Ask, Approvals, Timeline, Connections, Devices, and Settings \u2014 each built around the same principle: show the most important thing first, hide everything else behind progressive disclosure.',
        'The Dashboard is the home screen \u2014 a single-glance summary of pending approvals, recent actions, inbox count, and active safety mode. No widgets to configure, no drag-and-drop customization. The AI decides what is important based on context and recency. If you have three emails waiting for approval, that is the first thing you see. If your glasses are disconnected, that surfaces as an alert. The Dashboard is not a canvas \u2014 it is an opinionated briefing.',
      ],
    },
    {
      type: 'image',
      src: '/Assets/images/clawed.png',
      alt: 'Web hub dashboard showing pending approvals, recent actions, inbox count, active safety mode indicator, and the opinionated briefing layout',
    },
    {
      type: 'text',
      label: 'Web Hub',
      title: 'Inbox & Ask',
      body: [
        'The Inbox is not an email client. It is a triage interface. Every incoming message is pre-analyzed by the AI, tagged with urgency and suggested action, and presented as a card with three options: approve the AI\u2019s draft, edit before sending, or dismiss. You can clear your inbox without reading a single full email \u2014 the AI summaries are that good \u2014 but every action generates a receipt so you can audit later.',
        'Ask is the AI chat interface \u2014 the place where you have longer conversations, ask follow-up questions, and request complex multi-step actions. It is designed to feel like a messaging app, not a search engine. Responses are structured, actionable, and always end with a clear next step: approve, modify, or cancel. The command bar (\u2318K) is always one keystroke away, and every response can be pinned, shared, or turned into a recurring workflow.',
      ],
    },

    // ── GLASSES EXPERIENCE ───────────────────────────────────────
    {
      type: 'text',
      id: 'cs-glasses',
      label: 'Glasses Experience',
      title: 'Intelligence at the Edge of Your Vision',
      body: [
        'The glasses are not a second screen. They are a first responder. When you ask Clawed something while walking, cooking, or commuting, the glasses display is where the answer appears \u2014 instantly, glanceably, and with a single-tap approval path. I designed a glasses simulator that lets the team prototype and test every interaction without physical hardware, ensuring that every card, notification, and approval prompt works at peripheral-vision scale.',
      ],
    },
    {
      type: 'text',
      label: 'Glasses Experience',
      title: 'Card Types',
      body: [
        'Every piece of information on the glasses display is a card. I designed four card types that cover 95% of use cases: Info cards (weather, calendar, quick facts), Action cards (approve, dismiss, snooze), Receipt cards (confirmation of completed actions), and Alert cards (safety warnings, disconnection notices). Each card follows a strict template \u2014 icon on the left, one line of text in the center, action on the right \u2014 so the user\u2019s eye never has to hunt for what to do next.',
      ],
    },
    {
      type: 'steps',
      label: 'Glasses Experience',
      title: 'Glanceable Design Principles',
      steps: [
        {
          num: 1,
          title: 'One Line Max',
          description: 'Every glasses response is one line of text. If the AI cannot summarize it in one line, it pushes the full response to the web hub and shows a \u201cSee details on web\u201d card instead.',
        },
        {
          num: 2,
          title: '3-Second Rule',
          description: 'Every card auto-dismisses after 3 seconds unless the user engages. No notification pile-up, no clutter. If you missed it, the web hub has the full history.',
        },
        {
          num: 3,
          title: 'One Action Per Card',
          description: 'No multi-button dialogs on a peripheral display. Every card has exactly one action: tap to approve, tap to dismiss, or tap to expand on web. Decision fatigue is the enemy of glanceable design.',
        },
        {
          num: 4,
          title: 'Always a Receipt',
          description: 'Every action taken on the glasses generates a receipt that syncs to the web hub. You can glance and approve with confidence because the paper trail is automatic.',
        },
      ],
    },

    // ── SAFETY MODE SYSTEM ───────────────────────────────────────
    {
      type: 'text',
      id: 'cs-safety',
      label: 'Safety Architecture',
      title: 'Three Tiers of Trust',
      body: [
        'Not every situation calls for the same level of AI autonomy. Driving requires a different safety posture than sitting at your desk. Clawed\u2019s Safety Mode system gives users explicit control over how much the AI can do \u2014 not through buried settings, but through a prominent, always-visible toggle that changes the entire interaction model.',
      ],
    },
    {
      type: 'features',
      label: 'Safety Architecture',
      title: 'Safety Modes',
      cards: [
        {
          title: 'Read Only',
          description: 'The AI can read and summarize, but cannot draft, send, or execute anything. This is the safest mode \u2014 designed for situations where you want information without any risk of accidental action. Ideal for driving, meetings, or any context where an unintended send would be catastrophic.',
        },
        {
          title: 'Draft First',
          description: 'The AI can read, summarize, and draft responses \u2014 but nothing leaves your outbox without explicit approval. Every draft is held in a staging area until you review, edit, and tap \u201cSend.\u201d This is the default mode for most users \u2014 the sweet spot between speed and safety.',
        },
        {
          title: 'Assisted',
          description: 'The AI can read, draft, and execute pre-approved action types automatically. You define the rules \u2014 auto-reply to certain contacts, auto-archive low-priority emails, auto-accept calendar invites from your team \u2014 and the AI follows them. A receipt is generated for every automated action, and you can revoke permissions at any time.',
        },
      ],
    },
    {
      type: 'pullquote',
      quote: '\u201cIt is like a volume knob for how much I trust the AI right now. Driving home? Turn it down to Read Only. At my desk with coffee? Crank it to Assisted. I have never felt that kind of control with any other assistant.\u201d',
      cite: 'Stakeholder feedback during internal review',
    },

    // ── IMPACT ───────────────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-impact',
      label: 'Impact',
      title: 'Measuring Success Honestly',
      body: [
        'Clawed is a shipped product \u2014 not a concept, not a prototype. But I want to be honest about what \u201cimpact\u201d means for a product at this stage. We did not have millions of users or months of analytics data. What we did have was a clear thesis, a fully built product, and early signals from user testing that validated the safety-first approach.',
      ],
    },
    {
      type: 'text',
      label: 'Impact',
      title: 'What the design principles solved',
      body: [
        'The five design principles \u2014 Safety First, Receipts for Everything, Glanceable, Progressive Disclosure, Keyboard Friendly \u2014 started as design constraints and became the shared decision-making language between design and engineering. When a feature request arrived that violated \u201cGlanceable,\u201d we did not debate it for a week. We pointed at the principle and moved on. When an engineer asked whether a new action type needed a receipt, the answer was always yes \u2014 because \u201cReceipts for Everything\u201d was not aspirational, it was operational. These principles eliminated an estimated two to three scope debates per week during the build.',
      ],
    },
    {
      type: 'text',
      label: 'Impact',
      title: 'Early signals from user testing',
      body: [
        'During moderated testing sessions, the safety mode toggle was the feature users discovered first and talked about most. Participants consistently described the same behavior: they started in Read Only, built confidence within 10\u201315 minutes, and voluntarily upgraded to Draft First within the first session. Two participants moved to Assisted mode by the end of a 45-minute session. The graduated trust model worked as designed \u2014 users opted into more autonomy because the guardrails gave them confidence, not because we pushed them.',
        'The receipt system had an unexpected secondary effect: users started treating receipts as a personal log of their AI-assisted decisions. Multiple testers mentioned they would review receipts at the end of the day \u2014 not to audit the AI, but to remember what they had accomplished. The accountability feature became a productivity feature.',
      ],
    },

    // ── REFLECTIONS ──────────────────────────────────────────────
    {
      type: 'numbered-list',
      id: 'cs-reflections',
      label: 'Reflections',
      title: 'What Designing a Safety-First AI Taught Me',
      items: [
        '<strong>Constraints are a gift, not a limitation.</strong> The \u201cask in 3 seconds, results in 5, approve in 1 tap\u201d constraint forced every interaction to be lean, clear, and decisive. Without that constraint, it would have been tempting to build a general-purpose chat interface. With it, every screen had a job and every element earned its place.',
        '<strong>Trust is a design material.</strong> Receipts, safety modes, and approval workflows are not features bolted onto a product. They are the product. Designing Clawed taught me that trust is not the absence of risk \u2014 it is the presence of transparency. Users do not need an AI that never makes mistakes. They need an AI that shows its work.',
        '<strong>Multi-device design is not responsive design.</strong> Making the same layout work on different screen sizes is a solved problem. Making the same information architecture work across a glasses display, a phone, and a desktop \u2014 each with fundamentally different interaction models \u2014 is a design problem that requires rethinking, not resizing. Clawed forced me to design for context, not for pixels.',
        '<strong>Design principles are decision-making tools.</strong> The five principles I codified for Clawed saved more time than any design system component. When a feature request arrived that violated \u201cGlanceable,\u201d we did not debate it for a week. We pointed at the principle and moved on. Good principles are not aspirational \u2014 they are operational.',
      ],
    },

    // ── CREDITS ──────────────────────────────────────────────────
    {
      type: 'credits',
      credits: [
        { role: 'Product Designer', name: 'Parth Pawar' },
        { role: 'Product', name: 'Clawed.chat' },
        { role: 'Tools', name: 'Figma, React 19, TypeScript, Tailwind CSS 4' },
        { role: 'Platforms', name: 'Web, Smart Glasses' },
      ],
    },

    // ── THANK YOU ────────────────────────────────────────────────
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
