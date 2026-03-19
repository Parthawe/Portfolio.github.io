import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ReadingProgress from '../../components/case-study/ReadingProgress'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCallout from '../../components/case-study/CsCallout'
import CsCredits from '../../components/case-study/CsCredits'
import CsNumList from '../../components/case-study/CsNumList'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function ClawedChatPage() {
  return (
    <>
      <Helmet>
        <title>Clawed &middot; Parth Pawar</title>
        <meta name="description" content="Clawed.chat — Personal AI assistant for people on the go. Smart glasses integration, safety-first design, and receipts for every action. Case study by Parth Pawar, Product Designer." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Clawed · Parth Pawar" />
        <meta property="og:description" content="Personal AI assistant for people on the go. Safety-first design with smart glasses integration and receipts for every action." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/clawed.png" />
      </Helmet>

      <Nav />
      <ReadingProgress />

      <main id="main-content" className="project-main" style={{ '--project-color': '#8B5E34' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          backLabel="Back to Work"
          tags={['AI Assistant', 'Smart Glasses', 'Product Design', 'Full-stack Design']}
          title="Clawed"
          subtitle="Personal AI assistant for people on the go &mdash; smart glasses integration for glanceable, hands-free interactions plus a full web hub with safety modes, receipts, and one-tap approvals"
          info={[
            { label: 'Role', value: 'Product Designer' },
            { label: 'Timeline', value: '2026' },
            { label: 'Team', value: 'Solo designer + engineering team' },
            { label: 'Platform', value: 'Web + Wearable' },
          ]}
          liveUrl="https://clawed.chat"
          heroImage="/Assets/images/clawed.png"
          heroAlt="Clawed.chat — Personal AI assistant with smart glasses integration"
        />

        <ProjectOverview
          id="cs-vision"
          sections={[
            {
              label: 'The Vision',
              content: 'AI assistants promise to handle your life. In practice, they handle your patience. You ask them to do something, they hallucinate a confident answer, execute without asking, and leave no trail when things go wrong. Clawed exists to fix that. It is a personal AI assistant built around one conviction: if an AI acts on your behalf, you should be able to ask it under 3 seconds, get results in under 5, approve with one tap, and always have a receipt.',
            },
            {
              label: 'My Role',
              content: 'As the sole Product Designer, I owned the entire design surface of Clawed: the marketing site, the web application with eight core pages, the smart glasses experience, the safety mode system, and the design language that holds it all together. I worked alongside an engineering team to ship a product built on React 19, TypeScript, and Tailwind \u2014 designing every screen, interaction, and approval flow from first pixel to production.',
            },
          ]}
        />

        <CsSection id="cs-context" label="Context" title="Why AI Assistants Fail">
          <CsBody>
            <p>Before I designed forward, I studied the failures. AI assistants have a trust problem, and it is entirely self-inflicted. Siri, Alexa, Google Assistant &mdash; each one trained users to expect disappointment. The pattern was always the same: promise the world, deliver a timer and a weather forecast, and quietly lose credibility every time the assistant guessed wrong and acted anyway.</p>
            <p>The deeper problem is not capability. It is accountability. When an AI sends an email on your behalf with the wrong tone, there is no undo. When it books a flight you did not actually confirm, there is no receipt. When it misinterprets a voice command while you are driving, there is no safety net. Every major assistant treats autonomy as a feature and accountability as someone else&rsquo;s problem.</p>
            <p>The result is a generation of users who have learned to distrust the AI that is supposed to help them. They default to doing things manually &mdash; not because the AI cannot do it, but because they cannot trust that it will.</p>
          </CsBody>
          <CsCallout>
            <p>&ldquo;The problem with AI assistants is not that they are too dumb. It is that they are too confident. An assistant that acts without asking and fails without apologizing is not an assistant &mdash; it is a liability.&rdquo;</p>
          </CsCallout>
        </CsSection>

        <CsSection id="cs-safety-philosophy" label="Safety Philosophy" title="The AI That Asks Before It Acts">
          <CsBody>
            <p>Most AI assistants compete on intelligence. Clawed competes on trust. The entire product is built on a design philosophy I call &ldquo;safety-first autonomy&rdquo; &mdash; the conviction that an AI should never act on your behalf without your explicit approval, and should always leave a paper trail when it does.</p>
            <p>This philosophy is not just a design principle. It is the structural difference between Clawed and every other assistant on the market. While competitors race to make AI more autonomous, Clawed makes AI more accountable. Every interaction follows the same cadence: ask in under 3 seconds, get results in under 5, approve with one tap, always get a receipt.</p>
            <p>The result is counterintuitive: the assistant that asks permission is actually faster than the one that does not. Users stop second-guessing, stop checking behind the AI&rsquo;s back, and stop reverting actions they never authorized. When you trust the system, you use the system. Trust is speed.</p>
          </CsBody>
          <CsPullquote
            quote="I finally stopped re-checking every email my AI sent. The receipt shows me exactly what went out, and the approval step means nothing leaves without my say-so. It is the first assistant I actually trust."
            cite="Early user testing participant, week 2 of beta"
          />
          <details className="cs-details">
            <summary className="cs-details-summary">How safety-first autonomy works in practice</summary>
            <div className="cs-details-content">
              <p>Every action Clawed can take is classified into one of three permission levels: read, draft, and execute. In Read Only mode, the AI observes and summarizes but cannot touch anything. In Draft First mode, it can prepare responses but holds them in a staging area until you approve. In Assisted mode, you pre-authorize specific action types &mdash; like auto-archiving newsletters &mdash; and the AI follows your rules.</p>
              <p>The key insight is that these modes are not buried in settings. They are always visible in the interface &mdash; a prominent toggle in the web hub header and a persistent indicator on the glasses display. Changing modes takes one tap, and the entire interaction model shifts immediately. This visibility is what makes the system trustworthy: you always know what the AI can and cannot do.</p>
              <p>Every action &mdash; whether user-initiated or AI-executed &mdash; generates an immutable receipt: a timestamped record of what was requested, what the AI recommended, what the user approved, and what the outcome was. Receipts are not a logging feature. They are the core trust mechanism.</p>
            </div>
          </details>
        </CsSection>

        <CsSection id="cs-challenges" label="Design Challenges" title="Four Problems That Shaped Every Decision">
          <CsBody>
            <p>Clawed is not one product. It is a web hub, a glasses experience, a command bar, an approval system, and a receipt ledger &mdash; all of which need to feel like the same product whether you are at your desk or walking down the street. Every design challenge came back to the same question: how do you make an AI assistant feel fast, safe, and coherent across fundamentally different contexts?</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Glanceable on Glasses', desc: 'Smart glasses give you seconds, not minutes. Every piece of information the AI surfaces on the glasses display needs to be understood in a single glance \u2014 no scrolling, no reading paragraphs, no squinting at fine print. I designed a card-based system where every response fits into a structured template: icon, one-line summary, action button. If it does not fit the card, it gets pushed to the web hub.' },
            { title: 'Trust Through Transparency', desc: 'Users do not trust AI by default. They trust AI that shows its work. Every action Clawed takes generates a receipt \u2014 a timestamped, human-readable record of what happened, what the AI recommended, what the user approved, and what the outcome was. The receipt system is not a logging feature. It is the core trust mechanism of the entire product.' },
            { title: 'Command-Line Speed + GUI Comfort', desc: 'Power users want keyboard shortcuts and a command bar. New users want buttons and visual cues. Clawed\u2019s Command Bar (\u2318K) bridges both worlds \u2014 a fuzzy-search interface that lets you type natural language or structured commands, with inline previews and one-keystroke execution. Every action available in the GUI is available in the command bar, and vice versa.' },
            { title: 'Multi-Device Coherence', desc: 'The same user might ask Clawed something on their glasses while walking, approve the result on their phone at a stoplight, and review the receipt on their laptop at the office. The design system needed to be device-aware without being device-dependent \u2014 the same information architecture, adapted to each context, with state that syncs seamlessly across all three.' },
          ]} />
        </CsSection>

        <CsSection id="cs-webhub" label="Web Hub" title="The Brain You Come Back To">
          <CsBody>
            <p>The glasses handle the moments. The web hub handles the thinking. It is where you manage your inbox, review AI-drafted responses, configure safety modes, browse your timeline of actions, and connect third-party services. I designed eight core pages &mdash; Dashboard, Inbox, Ask, Approvals, Timeline, Connections, Devices, and Settings &mdash; each built around the same principle: show the most important thing first, hide everything else behind progressive disclosure.</p>
            <p>The Dashboard is the home screen &mdash; a single-glance summary of pending approvals, recent actions, inbox count, and active safety mode. No widgets to configure, no drag-and-drop customization. The AI decides what is important based on context and recency. If you have three emails waiting for approval, that is the first thing you see. If your glasses are disconnected, that surfaces as an alert. The Dashboard is not a canvas &mdash; it is an opinionated briefing.</p>
          </CsBody>
          <div className="cs-slide reveal">
            <img src="/Assets/images/clawed.png" alt="Web hub dashboard" loading="lazy" style={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', width: '100%', height: 'auto' }} />
          </div>
          <p className="cs-caption">Web hub dashboard showing pending approvals, recent actions, inbox count, active safety mode indicator, and the opinionated briefing layout</p>
          <h3 className="cs-section-subtitle">Inbox &amp; Ask</h3>
          <CsBody>
            <p>The Inbox is not an email client. It is a triage interface. Every incoming message is pre-analyzed by the AI, tagged with urgency and suggested action, and presented as a card with three options: approve the AI&rsquo;s draft, edit before sending, or dismiss. You can clear your inbox without reading a single full email &mdash; the AI summaries are that good &mdash; but every action generates a receipt so you can audit later.</p>
            <p>Ask is the AI chat interface &mdash; the place where you have longer conversations, ask follow-up questions, and request complex multi-step actions. It is designed to feel like a messaging app, not a search engine. Responses are structured, actionable, and always end with a clear next step: approve, modify, or cancel. The command bar (&Cmd;K) is always one keystroke away, and every response can be pinned, shared, or turned into a recurring workflow.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-glasses" label="Glasses Experience" title="Intelligence at the Edge of Your Vision">
          <CsBody>
            <p>The glasses are not a second screen. They are a first responder. When you ask Clawed something while walking, cooking, or commuting, the glasses display is where the answer appears &mdash; instantly, glanceably, and with a single-tap approval path. I designed a glasses simulator that lets the team prototype and test every interaction without physical hardware, ensuring that every card, notification, and approval prompt works at peripheral-vision scale.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Card Types</h3>
          <CsBody>
            <p>Every piece of information on the glasses display is a card. I designed four card types that cover 95% of use cases: Info cards (weather, calendar, quick facts), Action cards (approve, dismiss, snooze), Receipt cards (confirmation of completed actions), and Alert cards (safety warnings, disconnection notices). Each card follows a strict template &mdash; icon on the left, one line of text in the center, action on the right &mdash; so the user&rsquo;s eye never has to hunt for what to do next.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Glanceable Design Principles</h3>
          <CsSteps steps={[
            { num: '1', title: 'One Line Max', desc: 'Every glasses response is one line of text. If the AI cannot summarize it in one line, it pushes the full response to the web hub and shows a \u201cSee details on web\u201d card instead.' },
            { num: '2', title: '3-Second Rule', desc: 'Every card auto-dismisses after 3 seconds unless the user engages. No notification pile-up, no clutter. If you missed it, the web hub has the full history.' },
            { num: '3', title: 'One Action Per Card', desc: 'No multi-button dialogs on a peripheral display. Every card has exactly one action: tap to approve, tap to dismiss, or tap to expand on web. Decision fatigue is the enemy of glanceable design.' },
            { num: '4', title: 'Always a Receipt', desc: 'Every action taken on the glasses generates a receipt that syncs to the web hub. You can glance and approve with confidence because the paper trail is automatic.' },
          ]} />
        </CsSection>

        <CsSection id="cs-safety" label="Safety Architecture" title="Three Tiers of Trust">
          <CsBody>
            <p>Not every situation calls for the same level of AI autonomy. Driving requires a different safety posture than sitting at your desk. Clawed&rsquo;s Safety Mode system gives users explicit control over how much the AI can do &mdash; not through buried settings, but through a prominent, always-visible toggle that changes the entire interaction model.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Read Only', desc: 'The AI can read and summarize, but cannot draft, send, or execute anything. This is the safest mode \u2014 designed for situations where you want information without any risk of accidental action. Ideal for driving, meetings, or any context where an unintended send would be catastrophic.' },
            { title: 'Draft First', desc: 'The AI can read, summarize, and draft responses \u2014 but nothing leaves your outbox without explicit approval. Every draft is held in a staging area until you review, edit, and tap \u201cSend.\u201d This is the default mode for most users \u2014 the sweet spot between speed and safety.' },
            { title: 'Assisted', desc: 'The AI can read, draft, and execute pre-approved action types automatically. You define the rules \u2014 auto-reply to certain contacts, auto-archive low-priority emails, auto-accept calendar invites from your team \u2014 and the AI follows them. A receipt is generated for every automated action, and you can revoke permissions at any time.' },
          ]} />
          <details className="cs-details">
            <summary className="cs-details-summary">Deep dive: How the safety architecture prevents accidental actions</summary>
            <div className="cs-details-content">
              <p>The safety architecture is built on three layers of protection that work together to eliminate accidental AI actions.</p>
              <p><strong>Layer 1: Permission boundaries.</strong> Each safety mode defines a hard boundary for what the AI can do. In Read Only, the AI literally cannot access send or execute functions &mdash; the API calls are blocked at the permission layer, not just hidden in the UI. This is not a cosmetic change. It is a structural one.</p>
              <p><strong>Layer 2: The staging area.</strong> In Draft First mode, every AI-generated action lands in a staging area before it can touch the outside world. The staging area shows you exactly what the AI wants to do, who it will affect, and what the original request was. You can edit, approve, or discard. Nothing escapes without a deliberate tap.</p>
              <p><strong>Layer 3: The receipt ledger.</strong> Every action &mdash; whether manually approved or auto-executed in Assisted mode &mdash; generates an immutable receipt. Receipts include the original request, the AI&rsquo;s recommendation, the user&rsquo;s decision, the timestamp, and the outcome. The receipt ledger is searchable, filterable, and exportable. It is the audit trail that makes the entire system trustworthy.</p>
              <p>During user testing, the most common feedback was not about the AI&rsquo;s intelligence. It was about the feeling of control. Users described the safety modes as &ldquo;a volume knob for AI trust&rdquo; &mdash; something they could adjust based on context without ever worrying about the AI overstepping.</p>
            </div>
          </details>
          <CsPullquote
            quote="It is like a volume knob for how much I trust the AI right now. Driving home? Turn it down to Read Only. At my desk with coffee? Crank it to Assisted. I have never felt that kind of control with any other assistant."
            cite="Stakeholder feedback during internal review"
          />
        </CsSection>

        <CsSection id="cs-impact" label="Impact" title="Measuring Success Honestly">
          <CsBody style={{ marginBottom: '2rem' }}>
            <p>Clawed is a shipped product &mdash; not a concept, not a prototype. But I want to be honest about what &ldquo;impact&rdquo; means for a product at this stage. We did not have millions of users or months of analytics data. What we did have was a clear thesis, a fully built product, and early signals from user testing that validated the safety-first approach.</p>
          </CsBody>
          <CsBody>
            <h3 className="cs-section-subtitle">What the design principles solved</h3>
            <p>The five design principles &mdash; Safety First, Receipts for Everything, Glanceable, Progressive Disclosure, Keyboard Friendly &mdash; started as design constraints and became the shared decision-making language between design and engineering. When a feature request arrived that violated &ldquo;Glanceable,&rdquo; we did not debate it for a week. We pointed at the principle and moved on. When an engineer asked whether a new action type needed a receipt, the answer was always yes &mdash; because &ldquo;Receipts for Everything&rdquo; was not aspirational, it was operational. These principles eliminated an estimated two to three scope debates per week during the build.</p>
          </CsBody>
          <CsBody style={{ marginTop: '1.5rem' }}>
            <h3 className="cs-section-subtitle">Early signals from user testing</h3>
            <p>During moderated testing sessions, the safety mode toggle was the feature users discovered first and talked about most. Participants consistently described the same behavior: they started in Read Only, built confidence within 10&ndash;15 minutes, and voluntarily upgraded to Draft First within the first session. Two participants moved to Assisted mode by the end of a 45-minute session. The graduated trust model worked as designed &mdash; users opted into more autonomy because the guardrails gave them confidence, not because we pushed them.</p>
            <p>The receipt system had an unexpected secondary effect: users started treating receipts as a personal log of their AI-assisted decisions. Multiple testers mentioned they would review receipts at the end of the day &mdash; not to audit the AI, but to remember what they had accomplished. The accountability feature became a productivity feature.</p>
          </CsBody>
          <details className="cs-details">
            <summary className="cs-details-summary">What I would measure at scale</summary>
            <div className="cs-details-content">
              <p>If Clawed scaled to thousands of users, the metrics I would track are the ones that matter for a trust-first product &mdash; not engagement vanity metrics, but trust indicators.</p>
              <p><strong>Safety mode graduation rate:</strong> How quickly do new users move from Read Only to Draft First to Assisted? A healthy product sees steady, voluntary progression. A stalled product means users do not trust the AI enough to give it more autonomy.</p>
              <p><strong>Revert rate:</strong> How often do users undo or override an AI-executed action? A declining revert rate means the AI is learning user preferences. A flat or rising one means the approval flow is doing its job but the AI is not improving.</p>
              <p><strong>Receipt review frequency:</strong> How often do users actually look at their receipts? Early testing suggested receipts served a dual purpose (audit + reflection), and tracking this would reveal whether the trust mechanism is also a retention mechanism.</p>
              <p><strong>Time-to-approval:</strong> How long does a user spend reviewing an AI draft before approving it? Decreasing time-to-approval signals growing trust. Increasing time signals the AI is drafting things the user does not agree with.</p>
            </div>
          </details>
        </CsSection>

        <CsSection id="cs-reflections" label="Reflections" title="What Designing a Safety-First AI Taught Me">
          <CsNumList items={[
            <><strong>Constraints are a gift, not a limitation.</strong> The &ldquo;ask in 3 seconds, results in 5, approve in 1 tap&rdquo; constraint forced every interaction to be lean, clear, and decisive. Without that constraint, it would have been tempting to build a general-purpose chat interface. With it, every screen had a job and every element earned its place.</>,
            <><strong>Trust is a design material.</strong> Receipts, safety modes, and approval workflows are not features bolted onto a product. They are the product. Designing Clawed taught me that trust is not the absence of risk &mdash; it is the presence of transparency. Users do not need an AI that never makes mistakes. They need an AI that shows its work.</>,
            <><strong>Multi-device design is not responsive design.</strong> Making the same layout work on different screen sizes is a solved problem. Making the same information architecture work across a glasses display, a phone, and a desktop &mdash; each with fundamentally different interaction models &mdash; is a design problem that requires rethinking, not resizing. Clawed forced me to design for context, not for pixels.</>,
            <><strong>Design principles are decision-making tools.</strong> The five principles I codified for Clawed saved more time than any design system component. When a feature request arrived that violated &ldquo;Glanceable,&rdquo; we did not debate it for a week. We pointed at the principle and moved on. Good principles are not aspirational &mdash; they are operational.</>,
          ]} />
        </CsSection>

        <CsSection label="Credits" title="Team">
          <CsCredits credits={[
            { role: 'Product Designer', name: 'Parth Pawar' },
            { role: 'Product', name: 'Clawed.chat' },
            { role: 'Tools', name: 'Figma, React 19, TypeScript, Tailwind CSS 4' },
            { role: 'Platforms', name: 'Web, Smart Glasses' },
          ]} />
        </CsSection>

        <CsThanks contactCta />

        <BottomNav sections={[
          { id: 'cs-vision', label: 'Vision & Role' },
          { id: 'cs-context', label: 'Context' },
          { id: 'cs-safety-philosophy', label: 'Safety Philosophy' },
          { id: 'cs-challenges', label: 'Challenges' },
          { id: 'cs-webhub', label: 'Web Hub' },
          { id: 'cs-glasses', label: 'Glasses Experience' },
          { id: 'cs-safety', label: 'Safety Architecture' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} liveUrl="https://clawed.chat" />

      </main>

      <NextProject slug="oncall-lens" title="OnCall Lens" image="/Assets/images/oncall-lens.png" />
      <Footer />
    </>
  )
}
