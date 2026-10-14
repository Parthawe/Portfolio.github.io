import { projectImageProps } from '../../utils/projectImage'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsCallout from '../../components/case-study/CsCallout'
import CsNumList from '../../components/case-study/CsNumList'
import CsThanks from '../../components/case-study/CsThanks'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import MeetingTimeline from '../../components/MeetingTimeline'

export default function ExecutiveLensPage() {
  return (
    <>
      <Helmet>
        <title>ExecutiveLens &middot; Parth Pawar</title>
        <meta name="description" content="ExecutiveLens.ai meeting intelligence for executives: meeting capture, decision tracking, cited summaries, and follow-up workflows." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ExecutiveLens · Parth Pawar" />
        <meta property="og:description" content="Meeting intelligence for executives, from cited summaries to decision tracking and follow-up workflows." />
        <meta property="og:image" content="https://designwhich.works/Assets/images/executivelens.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main project-main--executivelens" style={{ '--project-color': '#9C8E6E' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['AI', 'SaaS', 'Product Design', 'Data Visualization']}
          title="ExecutiveLens"
          subtitle="Meeting intelligence that connects conversations to decisions, owners, and follow-up."
          info={[
            { label: 'Role', value: 'Design lead' },
            { label: 'Timeline', value: '2025\u201326' },
            { label: 'Team', value: 'Product, AI, engineering' },
            { label: 'Platform', value: 'Web + Mobile' },
          ]}
          liveUrl="https://www.executivelens.ai"
          heroImage="/Assets/mockups/projects/executivelens_16x9.webp"
          heroAlt="ExecutiveLens project cover for meeting intelligence and decision tracking"
        />

        <ProjectOverview
          id="cs-vision"
          sections={[
            {
              label: 'The Vision',
              content: 'Executives did not need another transcript. They needed memory: what was decided, who owned it, and what changed because of it.',
            },
            {
              label: 'My Role',
              content: 'I designed live capture, decision extraction, dashboard narrative, and the citation layer that makes AI summaries trustworthy.',
            },
          ]}
        />

        <CsSection id="cs-context" label="Context" title="From meeting notes to follow-up">
          <CsBody>
            <p>Important decisions were scattered across calls, docs, dashboards, and memory. The product needed to connect conversation to consequence: what changed, why it mattered, and who needed to act.</p>
          </CsBody>
          <CsCallout>
            <p>&ldquo;The problem is not that executives lack information. The problem is that the most important information is trapped inside conversations that vanish the moment the meeting ends.&rdquo;</p>
          </CsCallout>
        </CsSection>

        <CsExpandPreview
          cta="Open the full product system"
          note="Meeting replay, decision extraction, dashboard structure, site proof, beta signal, and design reflections."
        >
        <CsSection id="cs-challenges" label="Design Challenges" title="Four gaps in the meeting workflow">
          <CsBody>
            <p>Every screen had to answer fast: what changed, why does it matter, and what needs attention next?</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Live Meeting Capture', desc: 'Transcript, speakers, decisions, and action items surfaced while the meeting is still happening.' },
            { title: 'Trustworthy AI', desc: 'Every summary links back to the exact transcript moment behind it.' },
            { title: 'Narrative Dashboard', desc: 'A briefing feed replaces a wall of charts: what happened, why it matters, what to do.' },
            { title: 'Mobile Prep', desc: 'Glanceable cards brief executives between meetings without shrinking the desktop UI.' },
          ]} />
        </CsSection>

        {/* Interactive — meeting replay */}
        <CsSection id="cs-demo" label="Interactive" title="Explore the meeting demo">
          <CsBody>
            <p>Explore a prepared example of the review flow. Play the sample transcript or show it immediately, then follow each summary citation back to its source.</p>
          </CsBody>
          <div className="project-content-block">
            <MeetingTimeline />
          </div>
        </CsSection>

        <CsSection id="cs-meeting" label="Meeting Assistant" title="Capture decisions during the meeting">
          <CsBody>
            <p>The assistant joins calls, identifies speakers, and separates signal from transcript noise. Decisions, owners, deadlines, and open questions become persistent cards instead of buried notes.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Live Transcription', desc: 'Speaker-aware transcript with decisions pulled out of the stream.' },
            { num: '2', title: 'Decision Detection', desc: 'Key choices become cards with context, timestamp, and people involved.' },
            { num: '3', title: 'Action Items', desc: 'Owners and deadlines are captured while the commitment is still fresh.' },
            { num: '4', title: 'Summary', desc: 'After the meeting, the team gets decisions, actions, open questions, and context.' },
          ]} />
        </CsSection>

        <CsSection id="cs-dashboard" label="Executive Dashboard" title="Decisions and owners in one briefing">
          <CsBody>
            <p>The dashboard is a briefing, not a chart wall. It shows what changed, what needs attention, and which meeting created the shift.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">From Data to Narrative</h3>
          <CsBody>
            <p>A feed-based dashboard made the product easier to scan: one prioritized insight first, supporting evidence below, and a clear action attached.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-website" label="Live Product" title="executivelens.ai, The Product Site">
          <CsBody>
            <p>The site follows the product: clear hierarchy, real screens, and a problem-to-solution narrative without AI buzzword clutter.</p>
          </CsBody>
          <div className="cs-slide reveal">
            <img {...projectImageProps("/Assets/Projects/website-screenshot/screencapture-executivelens-ai-2026-03-25-13_34_30.webp")} data-project-preview src="/Assets/Projects/website-screenshot/screencapture-executivelens-ai-2026-03-25-13_34_30.webp" alt="Original Executive Lens website: glasses and action board, capture workflow, capability cards, integrations, and closing demo action" loading="lazy" decoding="async" />
          </div>
          <p className="cs-caption">Original website capture, March 25, 2026. The page presents the glasses-assisted workflow and product capabilities. Marketing claims in the capture are not independent performance measurements.</p>
        </CsSection>

        <CsSection id="cs-insights" label="Insight Engine" title="Keep evidence beside the summary">
          <CsBody>
            <p>The insight cards connect patterns across meetings and time. Each card explains what changed, why it matters, what to do, and where the evidence came from.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Risk Alerts</h3>
          <CsBody>
            <p>Risk alerts stay intentionally blunt: overdue action, contradictory decision, drifting metric, or sentiment shift. One line first, full context one tap away.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-impact" label="Impact" title="Beta observations and limits">
          <CsBody className="cs-body--space-after">
            <p>The intended workflow is a morning brief: review a decision, check its transcript reference, identify the owner, and follow up. Beta observations are qualitative; this page does not include a dated sample or measured adoption result.</p>
          </CsBody>

        </CsSection>

        <CsSection id="cs-reflections" label="Reflections" title="What Designing for Executives Taught Me">
          <CsNumList items={[
            <><strong>Busy people do not forgive bad hierarchy.</strong> Every screen had to answer the first question in seconds: what changed, why does it matter, and who owns it?</>,
            <><strong>Trust in AI is earned in citations, not confidence scores.</strong> A summary is only useful when the user can inspect the transcript moment behind it.</>,
            <><strong>Data visualization is about answering questions.</strong> Each chart had to make risk, ownership, or change easier to understand, otherwise it was decoration.</>,
            <><strong>The best AI products feel like memory, not magic.</strong> A useful review task is tracing a decision to its source, then finding the person responsible for the next action.</>,
          ]} />
        </CsSection>

        <CsThanks contactCta />
        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-vision', label: 'Vision & Role' },
          { id: 'cs-context', label: 'Context' },
          { id: 'cs-challenges', label: 'Challenges' },
          { id: 'cs-demo', label: 'Interactive' },
          { id: 'cs-meeting', label: 'Meeting Assistant' },
          { id: 'cs-dashboard', label: 'Dashboard' },
          { id: 'cs-website', label: 'Live Site' },
          { id: 'cs-insights', label: 'Insight Engine' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} liveUrl="https://www.executivelens.ai" />

      </main>

      <NextProject slug="ballah-code" title="Ballah Code" image="/Assets/mockups/projects/ballah-code_16x9.webp" />
      <Footer />
    </>
  )
}
