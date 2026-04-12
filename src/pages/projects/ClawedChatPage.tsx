import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCallout from '../../components/case-study/CsCallout'
import CsCredits from '../../components/case-study/CsCredits'
import CsCompareTable from '../../components/case-study/CsCompareTable'
import CsFlowDiagram from '../../components/case-study/CsFlowDiagram'
import CsBeforeAfter from '../../components/case-study/CsBeforeAfter'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function ClawedChatPage() {
  return (
    <>
      <Helmet>
        <title>Clawed &middot; Parth Pawar</title>
        <meta name="description" content="Clawed.chat, Personal AI assistant for people on the go. Smart glasses integration, safety-first design, and receipts for every action. Case study by Parth Pawar, Product Designer." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Clawed · Parth Pawar" />
        <meta property="og:description" content="Personal AI assistant for people on the go. Safety-first design with smart glasses integration and receipts for every action." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/clawed.png" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#8B5E34' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['AI Assistant', 'Smart Glasses', 'Product Design', 'Full-stack Design']}
          title="Clawed"
          subtitle="Personal AI assistant for people on the go &mdash; smart glasses integration for glanceable, hands-free interactions plus a full web hub with safety modes, receipts, and one-tap approvals"
          info={[
            { label: 'Role', value: 'Product Designer (sole designer + 3 engineers)' },
            { label: 'Timeline', value: 'Jan \u2013 Mar 2026 (~10 weeks)' },
            { label: 'Status', value: 'Shipped to production, early user testing phase' },
            { label: 'Platform', value: 'Web + Smart Glasses (via Mentra integration)' },
          ]}
          liveUrl="https://clawed.chat"
          heroImage="/Assets/Projects/Clawed.chat/landing-hero.png"
          heroAlt="Clawed.chat landing page: Your AI agent, live in 30 seconds"
        />

        {/* 3D mascot + logo */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/Clawed.chat/claw-3d.png" alt="Clawed 3D mascot, red sculptural claw character" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/Clawed.chat/claw-logo-dark.png" alt="Clawed logo glowing on dark background" loading="lazy" /></div>
            </div>
          </div>
        </section>

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

        <CsSection id="cs-context" label="01 &mdash; Context" title="Why AI Assistants Fail">
          <CsBody>
            <p>Before I designed forward, I studied the failures. AI assistants have a trust problem, and it is entirely self-inflicted. Siri, Alexa, Google Assistant &mdash; each one trained users to expect disappointment. The pattern was always the same: promise the world, deliver a timer and a weather forecast, and quietly lose credibility every time the assistant guessed wrong and acted anyway.</p>
            <p>The deeper problem is not capability. It is accountability. When an AI sends an email on your behalf with the wrong tone, there is no undo. When it books a flight you did not actually confirm, there is no receipt. When it misinterprets a voice command while you are driving, there is no safety net. Every major assistant treats autonomy as a feature and accountability as someone else&rsquo;s problem.</p>
            <p>The result is a generation of users who have learned to distrust the AI that is supposed to help them. They default to doing things manually &mdash; not because the AI cannot do it, but because they cannot trust that it will.</p>
          </CsBody>
          <CsCallout>
            <p>&ldquo;The problem with AI assistants is not that they are too dumb. It is that they are too confident. An assistant that acts without asking and fails without apologizing is not an assistant &mdash; it is a liability.&rdquo;</p>
          </CsCallout>
          <CsBeforeAfter
            title="The Trust Gap"
            before={{
              label: 'Existing Assistants',
              items: [
                'Acts autonomously without confirmation',
                'No record of what was done or why',
                'Errors are silent and irreversible',
                'Same permission level for all contexts',
                'Users learn to distrust and stop using',
              ],
            }}
            after={{
              label: 'Clawed',
              items: [
                'Always asks before acting on your behalf',
                'Immutable receipt for every action taken',
                'Staging area catches mistakes before they ship',
                'Context-aware safety modes (driving vs. desk)',
                'Trust builds gradually, users opt into more autonomy',
              ],
            }}
          />
        </CsSection>

        <CsSection id="cs-research" label="02 &mdash; Research" title="What Users Actually Need from an AI Assistant">
          <CsBody>
            <p>I audited seven AI assistants (Siri, Alexa, Google Assistant, Copilot, Rabbit R1, Humane Pin, ChatGPT) across three dimensions: what they promise, where they fail, and how users work around the failures. The pattern was consistent: users develop &ldquo;trust ceilings&rdquo; &mdash; a maximum level of autonomy they will grant an AI before reverting to manual work.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Trust Ceiling Pattern', desc: 'Users start enthusiastic, hit one bad auto-action (wrong email tone, bad calendar invite), and permanently reduce their usage to only safe queries like weather and timers.' },
            { title: 'Accountability Gap', desc: 'No existing assistant shows what it did, why, or lets you undo it. Users described feeling like they were "handing keys to someone who won\'t tell me where they drove."' },
            { title: 'Context Blindness', desc: 'Every assistant uses the same permission model whether you are at your desk or driving at 60 mph. No contextual safety adjustment exists in any product on the market.' },
            { title: 'Approval Fatigue vs. Trust', desc: 'Users want to approve actions, but only if approval is fast. If confirming takes longer than doing it manually, they skip the assistant entirely.' },
          ]} />
          <CsCallout>
            <p>The core insight: users do not want a smarter AI. They want an AI they can verify. The design principle that emerged: <strong>ask in 3 seconds, results in 5, approve in 1 tap, always leave a receipt.</strong></p>
          </CsCallout>
        </CsSection>

        <CsSection id="cs-challenges" label="03 &mdash; Design Challenges" title="Four Problems That Shaped Every Decision">
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

        <CsSection id="cs-webhub" label="04 &mdash; Web Hub" title="The Brain You Come Back To">
          <CsBody>
            <p>The glasses handle the moments. The web hub handles the thinking. It is where you manage your inbox, review AI-drafted responses, configure safety modes, browse your timeline of actions, and connect third-party services. I designed eight core pages &mdash; Dashboard, Inbox, Ask, Approvals, Timeline, Connections, Devices, and Settings &mdash; each built around the same principle: show the most important thing first, hide everything else behind progressive disclosure.</p>
            <p>The Dashboard is the home screen &mdash; a single-glance summary of pending approvals, recent actions, inbox count, and active safety mode. No widgets to configure, no drag-and-drop customization. The AI decides what is important based on context and recency. If you have three emails waiting for approval, that is the first thing you see. If your glasses are disconnected, that surfaces as an alert. The Dashboard is not a canvas &mdash; it is an opinionated briefing.</p>
          </CsBody>
          <div className="cs-img reveal"><img src="/Assets/Projects/Clawed.chat/docs-page.png" alt="Clawed documentation: Build with Clawed, getting started, deployment, smart glasses integration" loading="lazy" /></div>
          <p className="cs-caption">Documentation hub with getting started guides, deployment options, and smart glasses integration</p>

          <div className="cs-img reveal" style={{ marginTop: '2rem' }}><img src="/Assets/Projects/Clawed.chat/deploy-options.png" alt="Deploy your way: Cloud Deploy vs Mac Companion, your hardware or ours" loading="lazy" /></div>
          <p className="cs-caption">Cloud Deploy vs Mac Companion, two deployment paths designed for different trust and control preferences</p>
          <h3 className="cs-section-subtitle">Inbox &amp; Ask</h3>
          <CsBody>
            <p>The Inbox is not an email client. It is a triage interface. Every incoming message is pre-analyzed by the AI, tagged with urgency and suggested action, and presented as a card with three options: approve the AI&rsquo;s draft, edit before sending, or dismiss. You can clear your inbox without reading a single full email &mdash; the AI summaries are that good &mdash; but every action generates a receipt so you can audit later.</p>
            <p>Ask is the AI chat interface &mdash; the place where you have longer conversations, ask follow-up questions, and request complex multi-step actions. It is designed to feel like a messaging app, not a search engine. Responses are structured, actionable, and always end with a clear next step: approve, modify, or cancel. The command bar (&Cmd;K) is always one keystroke away, and every response can be pinned, shared, or turned into a recurring workflow.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-glasses" label="05 &mdash; Glasses Experience" title="Intelligence at the Edge of Your Vision">
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

        <CsSection id="cs-safety" label="06 &mdash; Safety Architecture" title="Three Tiers of Trust">
          <CsBody>
            <p>Not every situation calls for the same level of AI autonomy. Driving requires a different safety posture than sitting at your desk. Clawed&rsquo;s Safety Mode system gives users explicit control over how much the AI can do &mdash; not through buried settings, but through a prominent, always-visible toggle that changes the entire interaction model.</p>
          </CsBody>
          <CsCompareTable
            title="Safety Mode Comparison"
            columns={['Read Only', 'Draft First', 'Assisted']}
            rows={[
              { feature: 'Read & summarize', values: [true, true, true] },
              { feature: 'Draft responses', values: [false, true, true] },
              { feature: 'Execute actions', values: [false, false, true] },
              { feature: 'Requires approval per action', values: ['N/A', 'Always', 'Pre-approved types only'] },
              { feature: 'Generates receipts', values: [false, true, true] },
              { feature: 'Best context', values: ['Driving, meetings', 'Default, daily use', 'Trusted, repetitive tasks'] },
            ]}
          />
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
          <CsFlowDiagram
            title="Approval Workflow"
            nodes={[
              { label: 'User Request', desc: 'Voice or text input' },
              { label: 'AI Processes', desc: 'Analyzes intent, drafts response' },
              { label: 'Staging Area', desc: 'Draft held for review', accent: true },
              { label: 'One-Tap Approve', desc: 'User confirms or edits' },
              { label: 'Receipt Generated', desc: 'Immutable record created' },
            ]}
          />
          <CsPullquote
            quote="It is like a volume knob for how much I trust the AI right now. Driving home? Turn it down to Read Only. At my desk with coffee? Crank it to Assisted. I have never felt that kind of control with any other assistant."
            cite="Stakeholder feedback during internal review"
          />
        </CsSection>

        {/* Website */}
        <CsSection id="cs-website" label="Live Product" title="clawed.chat">
          <CsBody>
            <p>The marketing site I designed &mdash; positioning Clawed as &ldquo;Your AI agent, live in 20 seconds.&rdquo; Three steps to deploy. Safety-first architecture. Receipts for every action.</p>
          </CsBody>
          <div className="cs-slide reveal" style={{ marginTop: 'var(--space-4)' }}>
            <img src="/Assets/Projects/website-screenshot/screencapture-clawed-chat-2026-03-25-13_35_05.png" alt="clawed.chat marketing website — hero with 3D claw logo, three-step setup, trust architecture, testimonials" loading="lazy" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--ink-06)', width: '100%' }} />
          </div>
        </CsSection>

        <CsSection id="cs-impact" label="07 &mdash; Impact" title="Early Signals &amp; Honest Assessment">
          <CsBody style={{ marginBottom: '2rem' }}>
            <p>Clawed shipped to production in Q1 2026 and is in early user testing. I want to be transparent: we do not have large-scale analytics yet. What follows are qualitative signals from 6 moderated testing sessions (45 minutes each, mix of technical and non-technical participants) and internal team observations from the 10-week build.</p>
          </CsBody>
          <CsBody>
            <h3 className="cs-section-subtitle">Design principles as team alignment tools</h3>
            <p>The five principles &mdash; Safety First, Receipts for Everything, Glanceable, Progressive Disclosure, Keyboard Friendly &mdash; became the shared language between me and the engineering team. When a feature request violated &ldquo;Glanceable,&rdquo; we pointed at the principle instead of debating for a week. When an engineer asked whether a new action type needed a receipt, the answer was always yes. This saved roughly two to three scope debates per week &mdash; a process improvement, not a user-facing metric.</p>
          </CsBody>
          <CsBody style={{ marginTop: '1.5rem' }}>
            <h3 className="cs-section-subtitle">User testing observations (n=6)</h3>
            <p>In moderated sessions, 5 of 6 participants started in Read Only mode and voluntarily upgraded to Draft First within 10&ndash;15 minutes. 2 of 6 reached Assisted mode by session end. The graduated trust model worked as designed &mdash; users opted into more autonomy because the guardrails gave them confidence.</p>
            <p>An unexpected finding: 4 of 6 participants used the receipt timeline as a personal productivity log, reviewing what they had accomplished at the end of the session. The accountability feature doubled as a reflection tool &mdash; something I had not designed for.</p>
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

        <CsSection id="cs-learnings" label="08 &mdash; Key Learnings" title="What Designing a Safety-First AI Taught Me">
          <CsFeatureGrid features={[
            { title: 'Constraints compress quality', desc: 'The "3 seconds to ask, 5 seconds to results, 1 tap to approve" constraint forced every interaction to be lean and decisive. Without it, Clawed would have become another general-purpose chat. With it, every screen had a job.' },
            { title: 'Trust is a design material', desc: 'Receipts, safety modes, and approval workflows are not features bolted on. They are the product. Trust is not the absence of risk, it is the presence of transparency. Users need an AI that shows its work.' },
            { title: 'Multi-device ≠ responsive', desc: 'Resizing layouts for different screens is solved. Making the same information architecture work across glasses, phone, and desktop, each with fundamentally different interaction models, requires rethinking, not resizing.' },
            { title: 'Principles > components', desc: 'The five design principles saved more time than any design system component. When a feature violated "Glanceable," we pointed at the principle and moved on. Good principles are operational, not aspirational.' },
          ]} />
        </CsSection>

        <CsSection id="cs-whats-next" label="09 &mdash; What&rsquo;s Next" title="Where Clawed Goes From Here">
          <CsBody>
            <p>Clawed shipped as a fully functional product, but it is the foundation &mdash; not the ceiling. The next phase focuses on three areas informed by early user testing signals.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Workflow Automation', desc: 'Let users chain multiple actions into repeatable workflows: "Every Monday, summarize my unread emails, draft replies to urgent ones, and archive newsletters." The receipt system already supports multi-step audit trails.' },
            { num: '2', title: 'Team Mode', desc: 'Extend safety modes to shared accounts. A team lead could set permission boundaries for the whole team, e.g., junior members use Draft First, senior members use Assisted, with receipts rolling up to a team dashboard.' },
            { num: '3', title: 'Context-Aware Auto-Switching', desc: 'Use location + calendar signals to automatically adjust safety modes. When your calendar says "Driving," the system switches to Read Only. When you arrive at the office, it reverts to your default. No manual toggle needed.' },
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
          { id: 'cs-research', label: 'Research' },
          { id: 'cs-challenges', label: 'Challenges' },
          { id: 'cs-webhub', label: 'Web Hub & Site' },
          { id: 'cs-glasses', label: 'Glasses' },
          { id: 'cs-safety', label: 'Safety' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-learnings', label: 'Learnings' },
          { id: 'cs-whats-next', label: 'What\u2019s Next' },
        ]} liveUrl="https://clawed.chat" />

      </main>

      <NextProject slug="oncall-lens" title="OnCall Lens" image="/Assets/images/oncall-lens.png" />
      <Footer />
    </>
  )
}
