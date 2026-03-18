import type { ProjectMeta } from '@/types/project'

export const executivelens: ProjectMeta = {
  slug: 'executivelens',
  title: 'ExecutiveLens',
  subtitle: 'AI-powered business intelligence for executives \u2014 from meeting insights to strategic recommendations in real time',
  description: 'ExecutiveLens.ai \u2014 AI-powered business intelligence for executives. Meeting insights, strategic recommendations, and real-time decision tracking. Case study by Parth Pawar, Product Designer.',
  ogImage: 'https://www.designwhich.works/Assets/images/executivelens.png',
  heroImage: '/Assets/images/executivelens.png',
  projectColor: '#0A6847',
  tags: ['AI', 'SaaS', 'Product Design', 'Data Visualization'],
  infoItems: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Timeline', value: '2025\u201326' },
    { label: 'Team', value: 'Design lead' },
    { label: 'Platform', value: 'Web + Mobile' },
  ],
  backLink: { label: '\u2190 Back to Work', href: '/work' },
  nextProject: { slug: 'zentipay', title: 'ZentiPay', image: '/Assets/images/zentipay.png' },
  categories: ['ux'],
  bottomNavSections: [
    { id: 'cs-vision', label: 'Vision & Role' },
    { id: 'cs-context', label: 'Context' },
    { id: 'cs-bet', label: 'The Bet' },
    { id: 'cs-challenges', label: 'Challenges' },
    { id: 'cs-meeting', label: 'Meeting Assistant' },
    { id: 'cs-dashboard', label: 'Dashboard' },
    { id: 'cs-insights', label: 'Insight Engine' },
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
          body: 'Executives spend 23 hours per week in meetings but retain only 10% of the decisions made. The rest dissolves into half-remembered conversations, buried Slack threads, and action items no one wrote down. ExecutiveLens.ai exists to fix that. It captures everything \u2014 every decision, every commitment, every insight \u2014 and surfaces what matters, when it matters, in a format built for leaders who do not have time to dig.',
        },
        {
          heading: 'My Role',
          body: 'As the sole product designer, I owned the end-to-end experience: from the real-time meeting assistant that captures decisions as they happen, to the executive dashboard that turns raw meeting data into strategic clarity. I designed the interaction patterns, the data visualization system, the mobile experience, and the trust framework that makes executives comfortable letting an AI into their most sensitive conversations.',
        },
      ],
    },

    // ── CONTEXT — THE EXECUTIVE INFORMATION OVERLOAD ─────────────
    {
      type: 'text',
      id: 'cs-context',
      label: 'Context',
      title: 'The Executive Information Overload Problem',
      body: [
        'The modern executive is drowning. Too many meetings, too many dashboards, too many Slack messages, too many reports that say too little. The average C-suite leader toggles between 35 different tools per day and still feels like they are missing the thread. Decisions get made in a Monday standup and forgotten by Wednesday. Action items live in one person\u2019s notebook and die when that notebook closes.',
        'The information is not missing \u2014 it is scattered. Scattered across Zoom recordings no one rewatches, Google Docs no one revisits, and dashboards that show what happened but never why. Executives do not need more data. They need less noise and more signal.',
        'Every tool on the market solves one slice of this problem. Otter transcribes. Notion organizes. Tableau visualizes. But no one connects the meeting where a decision was made to the metric that moved because of it. That gap \u2014 the space between conversation and consequence \u2014 is where ExecutiveLens lives.',
      ],
    },

    {
      type: 'callout',
      text: '\u201cThe problem is not that executives lack information. The problem is that the most important information is trapped inside conversations that vanish the moment the meeting ends.\u201d',
    },

    // ── THE BET — EXECUTIVELENS THESIS ───────────────────────────
    {
      type: 'text',
      id: 'cs-bet',
      label: 'The Bet',
      title: 'What If AI Could Attend Every Meeting and Connect Every Dot?',
      body: [
        'ExecutiveLens is built on a single thesis: what if AI could attend every meeting, remember every decision, and connect the dots across your entire organization? Not a passive recorder. Not a dumb transcript. An active intelligence that understands context, tracks commitments, identifies patterns, and surfaces the insights that would take a human analyst weeks to find.',
        'The bet is that the executive tool that wins will not be the one with the most features or the prettiest charts. It will be the one that makes a leader feel like they have perfect memory, perfect context, and a strategist who never sleeps \u2014 all without adding a single meeting to their calendar.',
      ],
    },

    // ── DESIGN CHALLENGES — FOUR CARDS ──────────────────────────
    {
      type: 'features',
      id: 'cs-challenges',
      label: 'Design Challenges',
      title: 'Four Problems That Needed Solving',
      body: [
        'Designing for executives is designing for the most time-constrained, highest-stakes user imaginable. Every screen must earn its pixels. Every interaction must justify the interruption. There is no room for delight that does not also deliver value.',
      ],
      cards: [
        {
          title: 'Real-Time Meeting Transcription UX',
          description: 'Live transcription is technically impressive but useless if the interface is a wall of text. The challenge was designing a transcription view that lets users follow the conversation in real time without reading every word \u2014 highlighting decisions, flagging action items, and identifying speakers as they talk, not after the meeting ends.',
        },
        {
          title: 'Making AI Summaries Trustworthy',
          description: 'Executives will not act on AI-generated insights they do not trust. Every summary needed a clear provenance trail \u2014 tap any insight and see the exact transcript moment it came from. I designed a citation system that makes the AI\u2019s reasoning transparent without cluttering the interface with footnotes.',
        },
        {
          title: 'A Dashboard That Tells a Story',
          description: 'Most dashboards are graveyards of disconnected charts. The executive dashboard needed to tell a narrative: here is what happened this week, here is why it matters, here is what you should do about it. I designed a feed-based dashboard that prioritizes narrative over numbers and connects meetings to metrics.',
        },
        {
          title: 'Mobile-First for Executives on the Move',
          description: 'Executives check their phones between meetings, in the back of cars, and at airport gates. The mobile experience could not be a shrunken desktop dashboard. I designed a mobile-native interface with glanceable cards, voice-triggered summaries, and a prep mode that briefs you on your next meeting in 30 seconds flat.',
        },
      ],
    },

    // ── MEETING ASSISTANT ────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-meeting',
      label: 'Meeting Assistant',
      title: 'Your AI Co-Pilot in Every Conversation',
      body: [
        'The meeting assistant is the core of ExecutiveLens. It joins calls silently, transcribes in real time, identifies speakers, and does something no human note-taker can do at scale: it understands what matters. Decisions are tagged the moment they are made. Action items are extracted with owners and deadlines. Questions left unanswered are flagged for follow-up.',
        'The live view is designed around a principle I call \u201cstructured flow.\u201d The transcript scrolls naturally, but decisions and action items break out into persistent cards on the right rail \u2014 always visible, never buried in the stream of conversation. After the meeting, the assistant generates a structured summary: key decisions, action items with owners, open questions, and a one-paragraph narrative of what happened and why it matters.',
      ],
    },

    {
      type: 'steps',
      label: 'Meeting Assistant',
      title: 'How the Meeting Assistant Works',
      steps: [
        {
          num: 1,
          title: 'Live Transcription',
          description: 'Real-time speech-to-text with speaker diarization. Each participant gets a color-coded lane, making it easy to follow who said what without reading every word.',
        },
        {
          num: 2,
          title: 'Decision Detection',
          description: 'The AI identifies decisions as they happen \u2014 \u201cLet\u2019s go with option B\u201d \u2014 and pins them as structured cards with context, timestamp, and the people involved.',
        },
        {
          num: 3,
          title: 'Action Item Extraction',
          description: 'Commitments are captured with owners and deadlines. \u201cSarah, can you get that report by Friday?\u201d becomes a tracked action item assigned to Sarah, due Friday, linked to the meeting context.',
        },
        {
          num: 4,
          title: 'Post-Meeting Summary',
          description: 'Within 60 seconds of the meeting ending, every participant receives a structured summary: decisions, action items, open questions, and a narrative overview \u2014 ready to share or archive.',
        },
      ],
    },

    {
      type: 'image',
      src: '/Assets/Projects/executivelens/meeting-assistant.png',
      alt: 'Meeting assistant live view \u2014 transcript with decision cards on the right rail',
    },

    // ── EXECUTIVE DASHBOARD ──────────────────────────────────────
    {
      type: 'text',
      id: 'cs-dashboard',
      label: 'Executive Dashboard',
      title: 'The Command Center That Thinks for You',
      body: [
        'The dashboard is not a collection of charts. It is a briefing. Every morning, it answers three questions: What happened yesterday that I need to know about? What is trending in a direction I should care about? What needs my attention right now?',
        'I designed the dashboard around four pillars: KPI cards that show the numbers that matter with context (not just a number \u2014 a number, a trend, and a why), meeting-to-metric connections that link decisions to outcomes, team health indicators that surface sentiment and engagement patterns, and a timeline view that lets executives trace any metric back to the meeting where the relevant decision was made.',
      ],
    },

    {
      type: 'text',
      title: 'From Data to Narrative',
      body: [
        'The biggest design decision was replacing the traditional grid-of-widgets dashboard with a feed-based narrative. Instead of twelve charts competing for attention, the dashboard presents a prioritized stream: the most important insight first, with supporting data below. Each card in the feed is actionable \u2014 tap to drill down, swipe to dismiss, long-press to share with your team. The AI curates the feed based on your role, your recent meetings, and what has changed since you last looked.',
      ],
    },

    {
      type: 'image',
      src: '/Assets/Projects/executivelens/dashboard.png',
      alt: 'Executive dashboard \u2014 feed-based narrative with KPI cards and meeting-to-metric connections',
    },

    // ── INSIGHT ENGINE ───────────────────────────────────────────
    {
      type: 'text',
      id: 'cs-insights',
      label: 'Insight Engine',
      title: 'AI That Connects Dots You Did Not Know Existed',
      body: [
        'The insight engine is where ExecutiveLens goes from useful to indispensable. It analyzes patterns across meetings, teams, and time \u2014 surfacing connections that no single person could see. A product delay mentioned in Tuesday\u2019s engineering standup linked to a customer escalation discussed in Thursday\u2019s support review. A hiring bottleneck correlating with a drop in sprint velocity three weeks later.',
        'I designed the insight cards to follow a consistent structure: what the AI found, why it matters, what you can do about it, and where the evidence comes from. Every recommendation links back to the specific meetings, data points, and trends that generated it. No black boxes. No \u201ctrust me.\u201d Full transparency.',
      ],
    },

    {
      type: 'text',
      title: 'Risk Alerts',
      body: [
        'The engine also runs a continuous risk scan. It monitors for action items that are overdue, decisions that contradict previous commitments, metrics moving in the wrong direction without acknowledgment, and sentiment shifts in team conversations. Risk alerts are designed to feel urgent without feeling noisy \u2014 a red border, a clear one-line summary, and a single tap to see the full context. Executives told us in research that they get hundreds of notifications per day. The risk alert needed to be the one they actually read.',
      ],
    },

    {
      type: 'image',
      src: '/Assets/Projects/executivelens/insight-engine.png',
      alt: 'Insight engine \u2014 AI-generated cards with citation trails linking back to meeting transcripts',
    },

    // ── MOBILE VIEW ──────────────────────────────────────────────
    {
      type: 'image',
      src: '/Assets/Projects/executivelens/mobile.png',
      alt: 'Mobile experience \u2014 glanceable cards, voice-triggered summaries, 30-second meeting prep',
    },

    // ── IMPACT — METRICS ─────────────────────────────────────────
    {
      type: 'stats',
      id: 'cs-impact',
      label: 'Impact',
      title: 'The Numbers Behind the Intelligence',
      body: [
        'ExecutiveLens shipped to a closed beta of 40 executive teams and the results validated the thesis: when you capture the right information and surface it at the right time, leaders make better decisions faster.',
      ],
      stats: [
        { label: 'Meetings Analyzed', value: '12,000+' },
        { label: 'Time Saved / Exec / Week', value: '5.2 hrs' },
        { label: 'Decision Tracking Accuracy', value: '94%' },
        { label: 'Action Item Completion', value: '+38%' },
        { label: 'Exec Adoption Rate', value: '87%' },
        { label: 'Summary Accuracy (rated)', value: '4.6/5' },
      ],
    },

    {
      type: 'pullquote',
      quote: '\u201cWithin two weeks, I stopped checking email first. I check ExecutiveLens. It tells me what actually changed, not what someone wants me to read.\u201d',
      cite: '\u2014 VP of Product, Beta participant',
    },

    {
      type: 'text',
      title: 'Adoption Signal',
      body: [
        '87% of executives in the beta checked their ExecutiveLens dashboard before their morning email within two weeks of onboarding. That is the signal that the product crossed from \u201cnice to have\u201d to \u201cpart of the routine.\u201d',
      ],
    },

    // ── REFLECTIONS ──────────────────────────────────────────────
    {
      type: 'numbered-list',
      id: 'cs-reflections',
      label: 'Reflections',
      title: 'What Designing for Executives Taught Me',
      items: [
        '<strong>Busy people do not forgive bad hierarchy.</strong> On a consumer app, users will explore, scroll, and discover. Executives give you three seconds. If the most important thing is not the first thing they see, it does not exist. I learned to design every screen as if the user will look at it for five seconds and then leave. That constraint made every screen better.',
        '<strong>Trust in AI is earned in citations, not confidence scores.</strong> Executives do not care that the model is 94% confident. They care that they can tap an insight and see the exact moment in the transcript where the evidence lives. Traceability is not a feature \u2014 it is the difference between a tool they use and a tool they abandon.',
        '<strong>Data visualization is not about showing data \u2014 it is about answering questions.</strong> Every chart I designed started with a question: \u201cWhat should I worry about?\u201d \u201cIs this getting better or worse?\u201d \u201cWho owns this?\u201d If the visualization did not answer a specific question in under two seconds, it was decoration, not design.',
        '<strong>The best AI products feel like memory, not magic.</strong> The executives who loved ExecutiveLens the most never described it as an AI tool. They said, \u201cIt remembers things for me.\u201d That framing \u2014 AI as augmented memory, not artificial intelligence \u2014 guided every design decision from the meeting assistant to the insight engine.',
      ],
    },

    // ── CREDITS ──────────────────────────────────────────────────
    {
      type: 'credits',
      credits: [
        { role: 'Product Designer', name: 'Parth Pawar' },
        { role: 'Company', name: 'ExecutiveLens.ai' },
        { role: 'Tools', name: 'Figma, D3.js, Protopie' },
        { role: 'Platforms', name: 'Web, iOS, Android' },
      ],
    },

    // ── THANK YOU ────────────────────────────────────────────────
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
