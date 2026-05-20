import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCallout from '../../components/case-study/CsCallout'
import CsCredits from '../../components/case-study/CsCredits'
import CsImage from '../../components/case-study/CsImage'
import CsNumList from '../../components/case-study/CsNumList'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import MeetingTimeline from '../../components/MeetingTimeline'

export default function ExecutiveLensPage() {
  return (
    <>
      <Helmet>
        <title>ExecutiveLens &middot; Parth Pawar</title>
        <meta name="description" content="ExecutiveLens.ai, AI-powered business intelligence for executives. Meeting insights, strategic recommendations, and real-time decision tracking. Case study by Parth Pawar, Product Designer." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ExecutiveLens · Parth Pawar" />
        <meta property="og:description" content="AI-powered business intelligence for executives, from meeting insights to strategic recommendations in real time." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/executivelens.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#0A6847' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['AI', 'SaaS', 'Product Design', 'Data Visualization']}
          title="ExecutiveLens"
          subtitle="Meeting intelligence that turns conversation into tracked decisions, follow-through, and executive signal"
          info={[
            { label: 'Role', value: 'Product Designer' },
            { label: 'Timeline', value: '2025\u201326' },
            { label: 'Team', value: 'Design lead' },
            { label: 'Platform', value: 'Web + Mobile' },
          ]}
          liveUrl="https://www.executivelens.ai"
          heroImage="/Portfolio.github.io/Assets/images/executivelens.webp"
          heroAlt="ExecutiveLens.ai, AI-powered business intelligence for executives"
        />

        <ProjectOverview
          id="cs-vision"
          sections={[
            {
              label: 'The Vision',
              content: 'Executives do not need another transcript tool. They need a system that remembers what was decided, who committed to what, and what changed because of it. ExecutiveLens turns meetings into operational memory instead of a stream of notes no one returns to.',
            },
            {
              label: 'My Role',
              content: 'I designed the product end to end: live meeting capture, decision extraction, dashboard narrative, and the trust layer that makes high-stakes AI summaries usable in leadership contexts. The core job was not showing more information. It was reducing noise without losing accountability.',
            },
          ]}
        />

        <CsSection id="cs-context" label="Context" title="The Executive Information Overload Problem">
          <CsBody>
            <p>The modern executive is drowning. Too many meetings, too many dashboards, too many Slack messages, too many reports that say too little. The average C-suite leader toggles between 35 different tools per day and still feels like they are missing the thread. Decisions get made in a Monday standup and forgotten by Wednesday. Action items live in one person&rsquo;s notebook and die when that notebook closes.</p>
            <p>The information is not missing &mdash; it is scattered. Scattered across Zoom recordings no one rewatches, Google Docs no one revisits, and dashboards that show what happened but never why. Executives do not need more data. They need less noise and more signal.</p>
            <p>Every tool on the market solves one slice of this problem. Otter transcribes. Notion organizes. Tableau visualizes. But no one connects the meeting where a decision was made to the metric that moved because of it. That gap &mdash; the space between conversation and consequence &mdash; is where ExecutiveLens lives.</p>
          </CsBody>
          <CsCallout>
            <p>&ldquo;The problem is not that executives lack information. The problem is that the most important information is trapped inside conversations that vanish the moment the meeting ends.&rdquo;</p>
          </CsCallout>
        </CsSection>

        <CsSection id="cs-bet" label="The Bet" title="What If AI Could Attend Every Meeting and Connect Every Dot?">
          <CsBody>
            <p>ExecutiveLens is built on a single thesis: what if AI could attend every meeting, remember every decision, and connect the dots across your entire organization? Not a passive recorder. Not a dumb transcript. An active intelligence that understands context, tracks commitments, identifies patterns, and surfaces the insights that would take a human analyst weeks to find.</p>
            <p>The bet is that the executive tool that wins will not be the one with the most features or the prettiest charts. It will be the one that makes a leader feel like they have perfect memory, perfect context, and a strategist who never sleeps &mdash; all without adding a single meeting to their calendar.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-challenges" label="Design Challenges" title="Four Problems That Needed Solving">
          <CsBody>
            <p>Designing for executives is designing for the most time-constrained, highest-stakes user imaginable. Every screen must earn its pixels. Every interaction must justify the interruption. There is no room for delight that does not also deliver value.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Real-Time Meeting Transcription UX', desc: 'Live transcription is technically impressive but useless if the interface is a wall of text. The challenge was designing a transcription view that lets users follow the conversation in real time without reading every word \u2014 highlighting decisions, flagging action items, and identifying speakers as they talk, not after the meeting ends.' },
            { title: 'Making AI Summaries Trustworthy', desc: 'Executives will not act on AI-generated insights they do not trust. Every summary needed a clear provenance trail \u2014 tap any insight and see the exact transcript moment it came from. I designed a citation system that makes the AI\u2019s reasoning transparent without cluttering the interface with footnotes.' },
            { title: 'A Dashboard That Tells a Story', desc: 'Most dashboards are graveyards of disconnected charts. The executive dashboard needed to tell a narrative: here is what happened this week, here is why it matters, here is what you should do about it. I designed a feed-based dashboard that prioritizes narrative over numbers and connects meetings to metrics.' },
            { title: 'Mobile-First for Executives on the Move', desc: 'Executives check their phones between meetings, in the back of cars, and at airport gates. The mobile experience could not be a shrunken desktop dashboard. I designed a mobile-native interface with glanceable cards, voice-triggered summaries, and a prep mode that briefs you on your next meeting in 30 seconds flat.' },
          ]} />
        </CsSection>

        {/* Interactive — meeting replay */}
        <CsSection id="cs-demo" label="Interactive" title="Watch AI Process a Meeting">
          <CsBody>
            <p>Press play to watch a simulated Q3 review meeting. The transcript builds in real-time on the left. When the meeting ends, the AI summary appears on the right &mdash; decisions, action items with owners and deadlines, key metrics extracted automatically.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <MeetingTimeline />
          </div>
        </CsSection>

        <CsSection id="cs-meeting" label="Meeting Assistant" title="Your AI Co-Pilot in Every Conversation">
          <CsBody>
            <p>The meeting assistant is the core of ExecutiveLens. It joins calls silently, transcribes in real time, identifies speakers, and does something no human note-taker can do at scale: it understands what matters. Decisions are tagged the moment they are made. Action items are extracted with owners and deadlines. Questions left unanswered are flagged for follow-up.</p>
            <p>The live view is designed around a principle I call &ldquo;structured flow.&rdquo; The transcript scrolls naturally, but decisions and action items break out into persistent cards on the right rail &mdash; always visible, never buried in the stream of conversation. After the meeting, the assistant generates a structured summary: key decisions, action items with owners, open questions, and a one-paragraph narrative of what happened and why it matters.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Live Transcription', desc: 'Real-time speech-to-text with speaker diarization. Each participant gets a color-coded lane, making it easy to follow who said what without reading every word.' },
            { num: '2', title: 'Decision Detection', desc: 'The AI identifies decisions as they happen \u2014 \u201cLet\u2019s go with option B\u201d \u2014 and pins them as structured cards with context, timestamp, and the people involved.' },
            { num: '3', title: 'Action Item Extraction', desc: 'Commitments are captured with owners and deadlines. \u201cSarah, can you get that report by Friday?\u201d becomes a tracked action item assigned to Sarah, due Friday, linked to the meeting context.' },
            { num: '4', title: 'Post-Meeting Summary', desc: 'Within 60 seconds of the meeting ending, every participant receives a structured summary: decisions, action items, open questions, and a narrative overview \u2014 ready to share or archive.' },
          ]} />
        </CsSection>

        <CsSection id="cs-dashboard" label="Executive Dashboard" title="The Command Center That Thinks for You">
          <CsBody>
            <p>The dashboard is not a collection of charts. It is a briefing. Every morning, it answers three questions: What happened yesterday that I need to know about? What is trending in a direction I should care about? What needs my attention right now?</p>
            <p>I designed the dashboard around four pillars: KPI cards that show the numbers that matter with context (not just a number &mdash; a number, a trend, and a why), meeting-to-metric connections that link decisions to outcomes, team health indicators that surface sentiment and engagement patterns, and a timeline view that lets executives trace any metric back to the meeting where the relevant decision was made.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">From Data to Narrative</h3>
          <CsBody>
            <p>The biggest design decision was replacing the traditional grid-of-widgets dashboard with a feed-based narrative. Instead of twelve charts competing for attention, the dashboard presents a prioritized stream: the most important insight first, with supporting data below. Each card in the feed is actionable &mdash; tap to drill down, swipe to dismiss, long-press to share with your team. The AI curates the feed based on your role, your recent meetings, and what has changed since you last looked.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-website" label="Live Product" title="executivelens.ai, The Product Site">
          <CsBody>
            <p>The marketing site follows the same design philosophy as the product: clarity over cleverness. Clean typography, structured information hierarchy, and a narrative that walks executives from problem to solution without buzzword bingo. The hero shows the real product, not mockups.</p>
          </CsBody>
          <CsImage src="/Portfolio.github.io/Assets/Projects/website-screenshot/screencapture-executivelens-ai-2026-03-25-13_34_30.webp" alt="ExecutiveLens.ai full marketing website, hero with product screenshots, capabilities grid, workflow visualization, and integration partners" />
        </CsSection>

        <CsSection id="cs-insights" label="Insight Engine" title="AI That Connects Dots You Did Not Know Existed">
          <CsBody>
            <p>The insight engine is where ExecutiveLens goes from useful to indispensable. It analyzes patterns across meetings, teams, and time &mdash; surfacing connections that no single person could see. A product delay mentioned in Tuesday&rsquo;s engineering standup linked to a customer escalation discussed in Thursday&rsquo;s support review. A hiring bottleneck correlating with a drop in sprint velocity three weeks later.</p>
            <p>I designed the insight cards to follow a consistent structure: what the AI found, why it matters, what you can do about it, and where the evidence comes from. Every recommendation links back to the specific meetings, data points, and trends that generated it. No black boxes. No &ldquo;trust me.&rdquo; Full transparency.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Risk Alerts</h3>
          <CsBody>
            <p>The engine also runs a continuous risk scan. It monitors for action items that are overdue, decisions that contradict previous commitments, metrics moving in the wrong direction without acknowledgment, and sentiment shifts in team conversations. Risk alerts are designed to feel urgent without feeling noisy &mdash; a red border, a clear one-line summary, and a single tap to see the full context. Executives told us in research that they get hundreds of notifications per day. The risk alert needed to be the one they actually read.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-impact" label="Impact" title="The Numbers Behind the Intelligence">
          <CsBody style={{ marginBottom: '2rem' }}>
            <p>ExecutiveLens shipped to a closed beta of 40 executive teams and the results validated the thesis: when you capture the right information and surface it at the right time, leaders make better decisions faster.</p>
          </CsBody>
          <CsStatGrid stats={[
            { label: 'Meetings Analyzed', value: '12,000+' },
            { label: 'Time Saved / Exec / Week', value: '5.2 hrs' },
            { label: 'Decision Tracking Accuracy', value: '94%' },
            { label: 'Action Item Completion', value: '+38%' },
            { label: 'Exec Adoption Rate', value: '87%' },
            { label: 'Summary Accuracy (rated)', value: '4.6/5' },
          ]} />
          <CsPullquote
            quote="Within two weeks, I stopped checking email first. I check ExecutiveLens. It tells me what actually changed, not what someone wants me to read."
            cite="&mdash; VP of Product, Beta participant"
          />
          <CsBody style={{ marginTop: '1.5rem' }}>
            <p>87% of executives in the beta checked their ExecutiveLens dashboard before their morning email within two weeks of onboarding. That is the signal that the product crossed from &ldquo;nice to have&rdquo; to &ldquo;part of the routine.&rdquo;</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-reflections" label="Reflections" title="What Designing for Executives Taught Me">
          <CsNumList items={[
            <><strong>Busy people do not forgive bad hierarchy.</strong> On a consumer app, users will explore, scroll, and discover. Executives give you three seconds. If the most important thing is not the first thing they see, it does not exist. I learned to design every screen as if the user will look at it for five seconds and then leave. That constraint made every screen better.</>,
            <><strong>Trust in AI is earned in citations, not confidence scores.</strong> Executives do not care that the model is 94% confident. They care that they can tap an insight and see the exact moment in the transcript where the evidence lives. Traceability is not a feature &mdash; it is the difference between a tool they use and a tool they abandon.</>,
            <><strong>Data visualization is not about showing data &mdash; it is about answering questions.</strong> Every chart I designed started with a question: &ldquo;What should I worry about?&rdquo; &ldquo;Is this getting better or worse?&rdquo; &ldquo;Who owns this?&rdquo; If the visualization did not answer a specific question in under two seconds, it was decoration, not design.</>,
            <><strong>The best AI products feel like memory, not magic.</strong> The executives who loved ExecutiveLens the most never described it as an AI tool. They said, &ldquo;It remembers things for me.&rdquo; That framing &mdash; AI as augmented memory, not artificial intelligence &mdash; guided every design decision from the meeting assistant to the insight engine.</>,
          ]} />
        </CsSection>

        <CsSection label="Credits" title="Team">
          <CsCredits credits={[
            { role: 'Product Designer', name: 'Parth Pawar' },
            { role: 'Company', name: 'ExecutiveLens.ai' },
            { role: 'Tools', name: 'Figma, D3.js, Protopie' },
            { role: 'Platforms', name: 'Web, iOS, Android' },
          ]} />
        </CsSection>

        <CsThanks contactCta />

        <BottomNav sections={[
          { id: 'cs-vision', label: 'Vision & Role' },
          { id: 'cs-context', label: 'Context' },
          { id: 'cs-bet', label: 'The Bet' },
          { id: 'cs-challenges', label: 'Challenges' },
          { id: 'cs-meeting', label: 'Meeting Assistant' },
          { id: 'cs-dashboard', label: 'Dashboard' },
          { id: 'cs-website', label: 'Live Site' },
          { id: 'cs-insights', label: 'Insight Engine' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} liveUrl="https://www.executivelens.ai" />

      </main>

      <NextProject slug="zentipay" title="ZentiPay" image="/Portfolio.github.io/Assets/images/nda-cover.svg" />
      <Footer />
    </>
  )
}
