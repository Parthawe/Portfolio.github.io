import { projectImageProps } from '../../utils/projectImage'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsProcessFlow from '../../components/case-study/CsProcessFlow'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
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
          subtitle="An AI assistant for web and smart glasses with approvals, action receipts, and limits on autonomy."
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

          <CsBeforeAfter
            title="The Trust Gap"
            before={{
              label: 'Risks considered',
              items: [
                'Acts autonomously without confirmation',
                'No record of what was done or why',
                'Errors are silent and irreversible',
                'Same permission level for all contexts',
                'Users learn to distrust and stop using',
              ],
            }}
            after={{
              label: 'Design targets',
              items: [
                'Ask before external actions',
                'Immutable receipt for every action taken',
                'Staging area catches mistakes before they ship',
                'Context-aware safety modes (driving vs. desk)',
                'Trust builds gradually, users opt into more autonomy',
              ],
            }}
          />
        </CsSection>

        <CsSection id="cs-research" label="02 &mdash; Research" title="What users needed">
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
            <p>The interaction targets were: <strong>ask in 3 seconds, return in 5, approve in 1 tap, always leave a receipt.</strong> These are design targets, not measured latency results.</p>
          </CsCallout>
        </CsSection>

        <CsSection id="cs-challenges" label="03 &mdash; Design Challenges" title="Four design constraints">
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

        <CsSection id="cs-webhub" label="04 &mdash; Web Hub" title="Deployment and documentation">
          <CsBody><p>The documented setup starts with a hosting choice. The screenshots below show the available deployment paths and their guides.</p></CsBody>
          <CsProcessFlow connected={false} title="Choose where the assistant runs" steps={[
            { label: 'Cloud VM', desc: 'Follow the Cloud VM Deploy guide in the original documentation.' },
            { label: 'Mac companion', desc: 'Run the companion on your Mac using the documented setup path.' },
            { label: 'Self-hosted', desc: 'Use the self-hosted guide when you manage the environment.' },
          ]} />
          <p className="cs-caption">Three alternatives, not sequential deployment steps. Documentation search is marked coming soon in the source capture.</p>
          <div className="cs-img reveal"><img {...projectImageProps("/Assets/Projects/Clawed.chat/docs-page.webp")} data-project-preview src="/Assets/Projects/Clawed.chat/docs-page.webp" alt="Clawed documentation: Build with Clawed, getting started, deployment, smart glasses integration" loading="lazy" /></div>
          <p className="cs-caption">Documentation hub with getting started guides, deployment options, and smart glasses integration</p>

          <div className="cs-img reveal clawed-media--spaced"><img {...projectImageProps("/Assets/Projects/Clawed.chat/deploy-options.webp")} data-project-preview src="/Assets/Projects/Clawed.chat/deploy-options.webp" alt="Deploy your way: Cloud Deploy vs Mac Companion, your hardware or ours" loading="lazy" /></div>
          <p className="cs-caption">Cloud Deploy vs Mac Companion, two deployment paths designed for different trust and control preferences</p>
        </CsSection>

        <CsSection id="cs-glasses" label="05 &mdash; Glasses Experience" title="The glasses experience">
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
            <p>Not every context deserves the same AI autonomy. The interaction proposal defines three safety modes so users can move from reading, to drafting, to assisted action without losing control.</p>
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

        </CsSection>

        {/* Website */}
        <CsSection id="cs-website" label="Live Product" title="clawed.chat">
          <CsBody>
            <p>The marketing site I designed positions Clawed as &ldquo;Your AI agent, live in 30 seconds.&rdquo; Three steps to deploy. Safety-first architecture. Receipts for every action.</p>
          </CsBody>
          <div className="cs-img reveal clawed-slide--spaced">
            <img {...projectImageProps('/Assets/Projects/Clawed.chat/landing-hero.webp')} data-project-preview src="/Assets/Projects/Clawed.chat/landing-hero.webp" alt="Original Clawed landing page introduction showing the product positioning and deployment entry point" loading="lazy" />
          </div>
          <p className="cs-caption"><a className="cs-text-link" href="/Assets/Projects/website-screenshot/screencapture-clawed-chat-2026-03-25-13_35_05.webp" target="_blank" rel="noreferrer">Inspect the complete original site capture</a>. The quoted launch time is a marketing claim in the source.</p>
        </CsSection>

        <CsSection id="cs-impact" label="07 · Evidence" title="What the archive demonstrates">
          <CsBody><p>The original site and documentation show cloud deployment, a Mac companion, and smart-glasses setup. They document the product presentation and onboarding paths.</p><p>The approval modes and receipt flow described here are design proposals. A recorded product task and dated session notes are needed to establish how they performed; no participant counts or completion rates are reported here.</p></CsBody>
        </CsSection>

        <CsSection id="cs-learnings" label="08 &mdash; Key Learnings" title="What I learned">
          <CsFeatureGrid features={[
            { title: 'Constraints compress quality', desc: 'The 3-second ask, 5-second result, 1-tap approval rule made every screen choose one job.' },
            { title: 'Trust is a design material', desc: 'Receipts, safety modes, and approvals are not add-ons. They are how the product earns permission.' },
            { title: 'Multi-device is not responsive design', desc: 'Glasses, phone, and desktop need shared state but different interaction contracts.' },
            { title: 'Principles beat extra components', desc: 'The team moved faster when decisions could be tested against safety, glanceability, and traceability.' },
          ]} />
        </CsSection>

        <CsSection id="cs-whats-next" label="09 &mdash; What&rsquo;s Next" title="Next steps">
          <CsBody>
            <p>Further work would need to verify the proposal against the running product: authorization, recoverability, and handoff between phone, glasses, and desktop.</p>
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
