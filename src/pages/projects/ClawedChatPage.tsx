import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
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
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('summary')
  const sections = viewMode === 'summary'
    ? [
        { id: 'cs-summary', label: 'TL;DR' },
      ]
    : [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'cs-context', label: 'Context' },
        { id: 'cs-research', label: 'Research' },
        { id: 'cs-challenges', label: 'Challenges' },
        { id: 'cs-webhub', label: 'Web Hub & Site' },
        { id: 'cs-glasses', label: 'Glasses' },
        { id: 'cs-safety', label: 'Safety' },
        { id: 'cs-website', label: 'Live Product' },
        { id: 'cs-impact', label: 'Impact' },
        { id: 'cs-learnings', label: 'Learnings' },
        { id: 'cs-whats-next', label: "What's Next" },
      ]

  const handleViewModeChange = (nextMode: 'summary' | 'full') => {
    if (nextMode === viewMode) return
    setViewMode(nextMode)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <title>Clawed &middot; Parth Pawar</title>
        <meta name="description" content="Clawed.chat, Personal AI assistant for people on the go. Smart glasses integration, safety-first design, and receipts for every action. Case study by Parth Pawar, Product Designer." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Clawed · Parth Pawar" />
        <meta property="og:description" content="Personal AI assistant for people on the go. Safety-first design with smart glasses integration and receipts for every action." />
        <meta property="og:image" content="https://designwhich.works/Assets/mockups/projects/clawed-chat_1x1.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main project-main--clawed" style={{
        // Clawed logo reds (sampled from claw-3d.png): accent, outer
        // gradient family, and hero blob all follow the brand.
        '--project-color': '#CE303A',
        '--case-outer-1': '#1a0708',
        '--case-outer-2': '#3a0d12',
        '--case-outer-3': '#38141a',
        '--case-outer-glow-a': 'rgba(206, 48, 58, 0.30)',
        '--case-outer-glow-b': 'rgba(157, 4, 13, 0.34)',
        '--case-hero-orb-b': 'rgba(226, 140, 146, 0.24)',
        '--case-hero-blob-a': 'rgba(226, 96, 104, 0.30)',
        '--case-hero-blob-b': 'rgba(122, 8, 16, 0.34)',
        '--case-hero-blob-c': 'rgba(236, 168, 171, 0.22)',
        '--case-hero-blob-glow': 'rgba(244, 214, 216, 0.28)',
      } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['AI Assistant', 'Smart Glasses', 'Product Design', 'Full-stack Design']}
          title="Clawed"
          subtitle="A trust-first AI assistant for web and smart glasses, built around approvals, receipts, and controlled autonomy"
          info={[
            { label: 'Role', value: 'Product Designer (sole designer + 3 engineers)' },
            { label: 'Timeline', value: 'Jan \u2013 Mar 2026 (~10 weeks)' },
            { label: 'Status', value: 'Live product, early user testing' },
            { label: 'Platform', value: 'Web + Smart Glasses (via Mentra integration)' },
          ]}
          liveUrl="https://clawed.chat"
          heroImage="/Assets/Projects/Clawed.chat/landing-hero.webp"
          heroAlt="Clawed.chat landing page: Your AI agent, live in 30 seconds"
          showHeaderSummary={false}
        />

        <ProjectQuickSummary
          slug="clawed-chat"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />

        <CsExpandPreview expanded={viewMode === 'full'} onExpand={() => setViewMode('full')}>
        <CsSection id="cs-context" label="01 &mdash; Context" title="Why AI Assistants Fail">
          <CsBody>
            <p>Most AI assistants break trust in the same place: they act confidently, then leave no clear trail. If an assistant sends, books, or changes something, the user needs a pause, an edit path, and proof of what happened.</p>
            <p>Clawed started from that accountability gap. The product needed to feel fast enough to use, but constrained enough to trust on web and smart glasses.</p>
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
            <p>I audited Siri, Alexa, Google Assistant, Copilot, Rabbit R1, Humane Pin, and ChatGPT around three questions: what they promise, where they fail, and how people recover when they fail. The pattern was clear: users hit a trust ceiling, then shrink the assistant back to safe tasks.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Trust Ceiling', desc: 'One wrong auto-action is enough for people to stop delegating and keep the assistant in safe-query mode.' },
            { title: 'Accountability Gap', desc: 'Users wanted to see what changed, why it changed, and how to undo it before granting more autonomy.' },
            { title: 'Context Blindness', desc: 'The same permission model does not work at a desk, in a meeting, and while moving.' },
            { title: 'Approval Fatigue', desc: 'Approvals only work when they are faster than doing the task manually.' },
          ]} />
          <CsCallout>
            <p>The core insight: people do not just want a smarter AI. They want an AI they can verify. The operating rule became: <strong>ask in 3 seconds, return in 5, approve in 1 tap, always leave a receipt.</strong></p>
          </CsCallout>
        </CsSection>

        <CsSection id="cs-challenges" label="03 &mdash; Design Challenges" title="Four Problems That Shaped Every Decision">
          <CsBody>
            <p>Clawed spans a web hub, glasses experience, command bar, approvals, and receipts. The design challenge was making all of that feel fast and safe across desk, phone, and walking contexts.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Glanceable on Glasses', desc: 'Every glasses response became a small card: icon, one-line summary, one action. Anything heavier moved to the web hub.' },
            { title: 'Trust Through Transparency', desc: 'Every action creates a timestamped receipt showing the request, recommendation, approval, and result.' },
            { title: 'Command-Line Speed + GUI Comfort', desc: 'The command bar gives power users speed while keeping every action visible in the regular interface.' },
            { title: 'Multi-Device Coherence', desc: 'Glasses, phone, and laptop share the same state model so a user can ask, approve, and audit across surfaces.' },
          ]} />
        </CsSection>

        <CsSection id="cs-webhub" label="04 &mdash; Web Hub" title="The Brain You Come Back To">
          <CsBody>
            <p>The glasses handle the moments. The web hub handles the thinking. I designed eight core pages &mdash; Dashboard, Inbox, Ask, Approvals, Timeline, Connections, Devices, and Settings &mdash; each built around the same principle: show the most important thing first, hide everything else behind progressive disclosure. The command bar (&#8984;K) is always one keystroke away.</p>
            <p>The pattern that runs through all of them is approval and receipts. Every incoming item arrives pre-analyzed as a card with three options &mdash; approve the AI&rsquo;s draft, edit before sending, or dismiss &mdash; and every action, however it was approved, generates a receipt you can audit later.</p>
          </CsBody>
          <div className="cs-img reveal"><img src="/Assets/Projects/Clawed.chat/docs-page.webp" alt="Clawed documentation: Build with Clawed, getting started, deployment, smart glasses integration" loading="lazy" /></div>
          <p className="cs-caption">Documentation hub with getting started guides, deployment options, and smart glasses integration</p>

          <div className="cs-img reveal" style={{ marginTop: '2rem' }}><img src="/Assets/Projects/Clawed.chat/deploy-options.webp" alt="Deploy your way: Cloud Deploy vs Mac Companion, your hardware or ours" loading="lazy" /></div>
          <p className="cs-caption">Cloud Deploy vs Mac Companion, two deployment paths designed for different trust and control preferences</p>
        </CsSection>

        <CsSection id="cs-glasses" label="05 &mdash; Glasses Experience" title="Intelligence at the Edge of Your Vision">
          <CsBody>
            <p>The glasses are not a second screen. They are a first responder: instant answer, one-line summary, one-tap approval. I designed a simulator so the team could test cards at peripheral-vision scale.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Card Types</h3>
          <CsBody>
            <p>I designed four card types: info, action, receipt, and alert. Each follows the same pattern: icon, one-line message, single action. No hunting, no tiny decision tree.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Glanceable Design Principles</h3>
          <CsSteps steps={[
            { num: '1', title: 'One Line Max', desc: 'If the AI cannot summarize it in one line, the full response moves to the web hub.' },
            { num: '2', title: '3-Second Rule', desc: 'Cards auto-dismiss unless the user acts. The web hub keeps the full history.' },
            { num: '3', title: 'One Action Per Card', desc: 'No multi-button dialogs on a peripheral display. One card, one decision.' },
            { num: '4', title: 'Always a Receipt', desc: 'Every glasses action syncs back to the web hub with an audit trail.' },
          ]} />
        </CsSection>

        <CsSection id="cs-safety" label="06 &mdash; Safety Architecture" title="Three Tiers of Trust">
          <CsBody>
            <p>Not every context deserves the same AI autonomy. Clawed uses three safety modes so users can move from reading, to drafting, to assisted action without losing control.</p>
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
            <summary className="cs-details-summary">Safety architecture: How Clawed prevents accidental actions</summary>
            <div className="cs-details-content">
              <p>The safety architecture has three layers.</p>
              <p><strong>Permission boundaries:</strong> each safety mode defines what the AI can and cannot execute.</p>
              <p><strong>Staging area:</strong> draft actions show the request, affected surface, and editable output before anything is sent.</p>
              <p><strong>Receipt ledger:</strong> approved actions generate a searchable record with the original request, recommendation, user decision, timestamp, and outcome.</p>
              <p>Users described this as a volume knob for AI trust: low when moving, higher when seated and focused.</p>
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
            <p>The marketing site I designed &mdash; positioning Clawed as &ldquo;Your AI agent, live in 30 seconds.&rdquo; Three steps to deploy. Safety-first architecture. Receipts for every action.</p>
          </CsBody>
          <div className="cs-slide reveal" style={{ marginTop: 'var(--space-4)' }}>
            <img src="/Assets/Projects/website-screenshot/screencapture-clawed-chat-2026-03-25-13_35_05.webp" alt="clawed.chat marketing website — hero with 3D claw logo, three-step setup, trust architecture, testimonials" loading="lazy" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--ink-06)', width: '100%' }} />
          </div>
        </CsSection>

        <CsSection id="cs-impact" label="07 &mdash; Impact" title="Early Signals &amp; Honest Assessment">
          <CsBody style={{ marginBottom: '2rem' }}>
            <p>Clawed shipped in Q1 2026 and is in early testing. I am keeping the claims precise: these are qualitative signals from 6 moderated sessions plus team observations from the 10-week build.</p>
          </CsBody>
          <CsBody>
            <h3 className="cs-section-subtitle">Design principles as team alignment tools</h3>
            <p>The five principles became the shared language with engineering: Safety First, Receipts for Everything, Glanceable, Progressive Disclosure, Keyboard Friendly. They turned scope debates into quick decisions.</p>
          </CsBody>
          <CsBody style={{ marginTop: '1.5rem' }}>
            <h3 className="cs-section-subtitle">User testing observations (n=6)</h3>
            <p>5 of 6 participants started in Read Only mode and moved to Draft First within 10&ndash;15 minutes. 2 reached Assisted mode by the end. The trust model worked because users could increase autonomy gradually.</p>
            <p>4 of 6 participants also used receipts as a lightweight productivity log, reviewing what they had completed at the end of the session.</p>
          </CsBody>
          <details className="cs-details">
            <summary className="cs-details-summary">What I would measure at scale</summary>
            <div className="cs-details-content">
              <p><strong>Safety mode graduation:</strong> do users voluntarily move from Read Only to Draft First to Assisted?</p>
              <p><strong>Revert rate:</strong> how often do users undo or override an AI action?</p>
              <p><strong>Receipt review:</strong> do receipts become audit only, or also a reflection habit?</p>
              <p><strong>Time-to-approval:</strong> do users approve faster as trust increases?</p>
            </div>
          </details>
        </CsSection>

        <CsSection id="cs-learnings" label="08 &mdash; Key Learnings" title="What Designing a Safety-First AI Taught Me">
          <CsFeatureGrid features={[
            { title: 'Constraints compress quality', desc: 'The 3-second ask, 5-second result, 1-tap approval rule made every screen choose one job.' },
            { title: 'Trust is a design material', desc: 'Receipts, safety modes, and approvals are not add-ons. They are how the product earns permission.' },
            { title: 'Multi-device is not responsive design', desc: 'Glasses, phone, and desktop need shared state but different interaction contracts.' },
            { title: 'Principles beat extra components', desc: 'The team moved faster when decisions could be tested against safety, glanceability, and traceability.' },
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
        </CsExpandPreview>

        <BottomNav
          sections={sections}
          liveUrl="https://clawed.chat"
          modeAction={{
            label: viewMode === 'summary' ? 'Full case study' : '2 min summary',
            onClick: () => handleViewModeChange(viewMode === 'summary' ? 'full' : 'summary'),
          }}
        />

      </main>

      <NextProject slug="raahi-project" title="Raahi" image="/Assets/images/raahi.jpg" />
      <Footer />
    </>
  )
}
