import { projectImageProps } from '../../utils/projectImage'
import CsScreenExplorer from '../../components/case-study/CsScreenExplorer'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary, { type CaseStudyViewMode } from '../../components/case-study/ProjectQuickSummary'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const MINIAPP_ASSETS = {
  notes: '/Assets/Projects/mentra-miniapps/figma/notes.png?v=figma-miniapps-2',
  conversations: '/Assets/Projects/mentra-miniapps/figma/conversations.png?v=figma-miniapps-2',
  transcript: '/Assets/Projects/mentra-miniapps/figma/live-transcript.png?v=figma-miniapps-2',
  meet: '/Assets/Projects/mentra-miniapps/figma/meet-home.png?v=figma-miniapps-2',
  guidance: '/Assets/Projects/mentra-miniapps/figma/guidance.png?v=figma-miniapps-2',
}

const miniAppExamples = [
  {
    title: 'Notes',
    caption: 'Notes separates All, Favorites, Manual, and AI Generated entries. Each item keeps its source conversation or date beside the summary.',
    label: 'Mentra Notes · saved notes',
    src: MINIAPP_ASSETS.notes,
    width: 419,
    height: 909,
    alt: 'Mentra Notes saved notes with category filters, favorites, source conversations, and an add-note button',
  },
  {
    title: 'Conversations',
    caption: 'Conversations groups sessions by date and distinguishes a live session from completed recordings. Duration and participant names help identify an earlier conversation.',
    label: 'Mentra Notes · conversations',
    src: MINIAPP_ASSETS.conversations,
    width: 419,
    height: 909,
    alt: 'Mentra Conversations MiniApp with transcript list',
  },
  {
    title: 'Live Transcript',
    caption: 'The phone transcript separates speakers with names, timestamps, and numbered markers. A live badge, elapsed time, Pause, and Stop keep recording state visible.',
    label: 'Mentra Notes · active recording',
    src: MINIAPP_ASSETS.transcript,
    width: 420,
    height: 911,
    alt: 'Mentra Live Transcript MiniApp showing speech converted to readable text',
  },
  {
    title: 'Mentra Call',
    caption: 'The original screen offers Join Call with a Microsoft Teams link and Start Call for a new meeting. Mentra Live connection status appears directly below those actions.',
    label: 'Calling + presence',
    src: MINIAPP_ASSETS.meet,
    width: 390,
    height: 844,
    alt: 'Mentra Call screen with Microsoft Teams join and start actions and Mentra Live connection status',
  },
  {
    title: 'Guidance',
    caption: 'The destination picker combines search, saved Home and Work locations, Add place, and recent destinations. The supplied screen shows destination selection before a route starts.',
    label: 'Guidance · choose a destination',
    src: MINIAPP_ASSETS.guidance,
    width: 363,
    height: 783,
    alt: 'Guidance destination picker with search, saved places, map controls, and recent destinations',
  },
]

export default function MentraMiniAppsPage() {
  const location = useLocation()
  const [viewMode, setViewMode] = useState<CaseStudyViewMode>('summary')
  const sections = viewMode === 'summary'
    ? [
        { id: 'cs-summary', label: 'Quick read' },
        { id: 'cs-vision', label: 'Overview' },
      ]
    : [
        { id: 'cs-summary', label: 'Quick read' },
        { id: 'cs-vision', label: 'Overview' },
        { id: 'cs-constraint', label: 'Constraint' },
        { id: 'cs-discovery', label: 'Discovery' },
        { id: 'cs-app-mix', label: 'App Mix' },
        { id: 'cs-developer', label: 'Developer' },
        { id: 'cs-permissions', label: 'Permissions' },
        { id: 'cs-impact', label: 'Impact' },
        { id: 'cs-reflection', label: 'Reflection' },
      ]

  const handleViewModeChange = (nextMode: CaseStudyViewMode) => {
    if (nextMode === viewMode) return
    setViewMode(nextMode)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const targetId = location.hash.replace('#', '')
    if (!targetId) return

    if (!['cs-summary', 'cs-vision'].includes(targetId)) {
      setViewMode('full')
    }

    return settleAnchor(targetId)
  }, [location.hash])

  return (
    <>
      <Helmet>
        <title>Mentra MiniApp Store &middot; Parth Pawar</title>
        <meta name="description" content="Designing an app ecosystem for smart glasses. Voice-first discovery, captions, translation, notes, Mentra AI, and the platform surfaces that turn hardware into a real product." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mentra MiniApp Store &middot; Parth Pawar" />
        <meta property="og:description" content="An app ecosystem for smart glasses. Voice-first discovery, developer SDK, and the product patterns behind captions, translation, notes, and Mentra AI." />
        <meta property="og:image" content="https://designwhich.works/Assets/mockups/projects/mentra-miniapps_16x9.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main project-main--mentra-miniapps" style={{ '--project-color': '#A78BFA' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['Product Design', 'AI Wearables', 'Platform Design', 'Developer Experience']}
          title="Mentra MiniApp Store"
          subtitle="App discovery, installation, and permissions for a voice-first smart-glasses platform."
          info={[
            { label: 'Role', value: 'Head of UI/UX (sole designer)' },
            { label: 'Timeline', value: 'Q4 2025 - Q1 2026' },
            { label: 'Platform', value: 'MentraOS + Companion App + Web Portal' },
            { label: 'Focus', value: 'Store, permissions, developer handoff' },
          ]}
          showHeaderSummary={false}
          heroImage="/Assets/mockups/projects/mentra-miniapps_16x9.webp"
          heroAlt="Mentra MiniApp Store 16:9 project cover showing the smart glasses app ecosystem"
        />

        <ProjectQuickSummary
          slug="mentra-miniapps"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          variant="open"
          label=""
          title="Project overview"
          proofLimit={0}
        />

        <section className="cs-section mentra-miniapps-hero-gallery reveal" aria-label="MiniApp system previews">
          <div className="wrap mentra-miniapps-hero-gallery__inner">
            <figure className="mentra-miniapps-hero-gallery__primary">
              <img data-project-preview src={MINIAPP_ASSETS.notes} width="419" height="909" alt="Mentra Notes MiniApp running as part of the smart glasses ecosystem" loading="eager" decoding="async" />
              <figcaption>
                <span>Featured MiniApp</span>
                The Notes screen keeps saved summaries, their source conversations, and manual entries in one list. The expanded story follows the related conversation and recording screens.
              </figcaption>
            </figure>
          </div>
        </section>

        <CsSection id="cs-vision" label="Two surfaces" title="A quick choice on glasses; detail on the phone">
          <CsBody><p>The glasses need a short path from a spoken request to one app preview. The companion phone app has room for comparison, permissions, and longer histories. I designed the store and developer surfaces around that division of attention.</p></CsBody>
        </CsSection>

        {/* The Constraint */}
        <CsExpandPreview
          expanded={viewMode === 'full'}
          onExpand={() => setViewMode('full')}
          cta="Reveal the MiniApp platform story"
          note="Continue into the constraints, discovery model, developer system, and permissions work."
        >
        <CsSection id="cs-constraint" label="01 &mdash; Constraint" title="Separate phone tasks from glasses output">
          <CsBody>
            <p>The original exports below are phone interfaces. They provide room to browse saved notes, inspect a transcript, join a call, and choose a destination.</p>
            <p>The companion design puts longer reading and setup on the phone. These screens document that part of the experience; they do not show the optical appearance or readability of a glasses display.</p>
          </CsBody>

        </CsSection>

        {/* Discovery */}
        <CsSection id="cs-discovery" label="02 · Mentra Notes" title="From a conversation to a saved note">
          <CsBody><p>Conversations, Live Transcript, and Notes belong to the same app. The conversation list identifies a session; the transcript exposes its speakers and recording controls; the notes list keeps summaries linked to their source.</p><p>Select each original screen to inspect the transition. The sample conversations are part of the supplied design.</p></CsBody>
        </CsSection>
        <section className="cs-section mentra-miniapps-system reveal" aria-label="Original Mentra Notes screens">
          <div className="wrap"><CsScreenExplorer screens={[miniAppExamples[1], miniAppExamples[2], miniAppExamples[0]]} label="Choose a Mentra Notes view" /></div>
        </section>

        <CsSection id="cs-app-mix" label="03 · Other MiniApps" title="Different tasks need different starting points">
          <CsBody><p>Mentra Call starts with joining or creating a Teams meeting and checking the connected glasses. Guidance starts with selecting a destination. Each screen gives its primary task more space than shared platform controls.</p></CsBody>
        </CsSection>
        <section className="cs-section mentra-miniapps-system reveal" aria-label="Original Call and Guidance screens">
          <div className="wrap"><CsScreenExplorer screens={miniAppExamples.slice(3)} label="Choose Call or Guidance" /></div>
        </section>

        {/* Developer Platform */}
        <CsSection id="cs-developer" label="04 &mdash; Developer Platform" title="A short path to the first MiniApp">
          <CsBody>
            <p>The store only works if developers can build for it. The portal had to make the first MiniApp feel fast, clear, and safe to submit.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Submit', desc: 'Proposed submission step: provide the app and check compatibility before review.' },
            { num: '2', title: 'Metadata', desc: 'Name, description, icon, and a plain-language permissions declaration.' },
            { num: '3', title: 'Review', desc: 'Quality and safety checks before an app reaches the store.' },
          ]} />
          <CsBody>
            <p>This submission sequence describes the platform proposal. The exported screens on this page document the user-facing MiniApps; a developer-portal recording is needed to demonstrate submission behavior.</p>
          </CsBody>
        </CsSection>

        {/* Permission Model */}
        <CsSection id="cs-permissions" label="05 &mdash; Permissions" title="Make sensor access inspectable">
          <CsBody>
            <p>Camera glasses need a higher trust bar. The permission proposal asks each MiniApp to declare the sensors it needs before installation.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Sensor Declaration', desc: 'Camera, microphone, GPS, display access, each declared individually with a plain-language explanation of why.' },
            { title: 'Runtime Indicators', desc: 'The permission design calls for a visible camera-use indicator so active capture can be recognized.' },
            { title: 'Revocable Permissions', desc: 'The proposed companion controls provide a place to revoke access. Each app needs a defined state when a required permission is unavailable.' },
            { title: 'Privacy Report', desc: 'A readable summary of what each MiniApp accessed, adapted for wearable context.' },
          ]} />
        </CsSection>

        {/* OS screens */}
        <section className="cs-section mentra-miniapps-os reveal">
          <div className="wrap">
            <div className="mentra-miniapps-os__grid">
              <figure className="mentra-miniapps-os__shot">
                <img {...projectImageProps("/Assets/images/mentra/os-running-apps.png")} data-project-preview src="/Assets/images/mentra/os-running-apps.png" alt="MentraOS currently running MiniApps" loading="lazy" decoding="async" />
                <figcaption>Running apps made the platform legible without forcing a phone-style app switcher.</figcaption>
              </figure>
              <figure className="mentra-miniapps-os__shot">
                <img {...projectImageProps("/Assets/images/mentra/os-home.png")} data-project-preview src="/Assets/images/mentra/os-home.png" alt="MentraOS home screen with active app" loading="lazy" decoding="async" />
                <figcaption>The home surface had to show breadth while still feeling glanceable.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <CsSection id="cs-impact" label="06 &mdash; Scope" title="What the system covers">
          <CsBody><p>Five original exports document three views within Mentra Notes, the Mentra Call entry screen, and the Guidance destination picker. Discovery, submission, and permission handling are described as design proposals. These assets do not establish adoption, retention, or task-completion results.</p></CsBody>
        </CsSection>
        <CsSection id="cs-reflection" label="Next questions" title="Test the transitions between apps">
          <CsBody><p>The next evaluation should follow a first installation through permission approval, active use, and revocation. Can someone tell which app is listening, recover from a denied permission, and return to the task without reaching for the phone?</p><p>Those transitions are the test of whether the shared patterns work beyond an individual screen.</p></CsBody>
        </CsSection>

        <CsThanks />

        </CsExpandPreview>

        <BottomNav sections={sections} />

      </main>

      <NextProject slug="zentipay" title="ZentiPay" image="/Assets/mockups/projects/zentipay_16x9.webp" />
      <Footer />
    </>
  )
}
import { settleAnchor } from '../../utils/settleAnchor'
