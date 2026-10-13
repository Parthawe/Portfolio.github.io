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
import CsCallout from '../../components/case-study/CsCallout'
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
    caption: 'Long-running capture needs a clear transcription state. The featured Notes screen above shows this part of the system.',
    label: 'Capture + memory',
    src: MINIAPP_ASSETS.notes,
    width: 419,
    height: 909,
    alt: 'Mentra Notes MiniApp with daily notes and transcription state',
  },
  {
    title: 'Conversations',
    caption: 'Conversation history gives captured speech a place to be found again.',
    label: 'Live transcript history',
    src: MINIAPP_ASSETS.conversations,
    width: 419,
    height: 909,
    alt: 'Mentra Conversations MiniApp with transcript list',
  },
  {
    title: 'Live Transcript',
    caption: 'Immediate speech-to-text prioritizes the current words over browsing history.',
    label: 'Real-time overlay',
    src: MINIAPP_ASSETS.transcript,
    width: 420,
    height: 911,
    alt: 'Mentra Live Transcript MiniApp showing speech converted to readable text',
  },
  {
    title: 'Meet',
    caption: 'A dedicated entry point makes joining a call a distinct task.',
    label: 'Calling + presence',
    src: MINIAPP_ASSETS.meet,
    width: 390,
    height: 844,
    alt: 'Mentra Meet MiniApp home screen for joining calls',
  },
  {
    title: 'Guidance',
    caption: 'A route instruction needs to remain readable during another activity.',
    label: 'Contextual routing',
    src: MINIAPP_ASSETS.guidance,
    width: 363,
    height: 783,
    alt: 'Mentra Guidance MiniApp with route instruction screen',
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
                Notes turns live speech into searchable memory, which made it the clearest example of why the store needed real app depth.
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
        <CsSection id="cs-constraint" label="01 &mdash; Constraint" title="Designing for a 640&times;400 display">
          <CsBody>
            <p>The glasses display is 640&times;400, transparent, and peripheral. Users are moving, their hands are busy, and voice is the reliable input.</p>
            <p>The on-glasses proposal limits each choice to one preview. Detailed browsing moves to the companion phone app, where users can stop and compare.</p>
          </CsBody>
          <CsCallout>
            <p>&ldquo;An app store on your face sounds absurd until you use it. Then every other pair of smart glasses feels like a flip phone.&rdquo; &mdash; Early beta tester</p>
          </CsCallout>
        </CsSection>

        {/* Discovery */}
        <CsSection id="cs-discovery" label="02 &mdash; Discovery" title="Discover apps by intent">
          <CsBody>
            <p>The starting point is a task: translate this, record this, or identify this.</p>
            <p>The proposed path is: speak a need, inspect one app preview, review its permission cue, and confirm installation. Detailed comparison belongs in the phone companion. This study focuses on discovery and permissions; the parent Mentra study covers onboarding and runtime control.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'State the need', desc: 'A spoken request starts discovery without opening a catalogue.' },
            { num: '2', title: 'Inspect one preview', desc: 'Show the app name, a short purpose, and the capability it needs.' },
            { num: '3', title: 'Review access', desc: 'Make sensor access part of the installation decision.' },
            { num: '4', title: 'Confirm or compare', desc: 'Install from the preview, or use the phone for a more detailed comparison.' },
          ]} />
        </CsSection>

        <CsSection id="cs-app-mix" label="03 &mdash; App Mix" title="Support different kinds of apps">
          <CsBody>
            <p>The store had to support very different jobs: live captions, translation, notes, Mentra AI, calling, language helpers, and ambient utilities.</p>
            <p>The design challenge was giving each app type the right behavior without making the platform feel inconsistent.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section mentra-miniapps-system reveal" aria-label="Mentra MiniApp examples">
          <div className="wrap">
            <div className="mentra-miniapps-system__head">
              <span className="cs-kicker">Figma exports</span>
              <h2>Multiple MiniApps, one OS language.</h2>
              <p>Original Figma exports show how capture, conversation history, calling, and guidance fit within the same app system. Choose a screen to inspect its details and the design concern behind it.</p>
            </div>
            <CsScreenExplorer screens={miniAppExamples.filter(app => app.title !== 'Notes')} />
            <p className="cs-caption">The ecosystem had to make room for immediate overlays like Live Transcript, longer-running utilities like Notes, communication surfaces like Meet, and contextual utilities like Guidance.</p>
          </div>
        </section>

        {/* Developer Platform */}
        <CsSection id="cs-developer" label="04 &mdash; Developer Platform" title="A short path to the first MiniApp">
          <CsBody>
            <p>The store only works if developers can build for it. The portal had to make the first MiniApp feel fast, clear, and safe to submit.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Upload', desc: 'Drag and drop your MiniApp package. The system validates format, size, and compatibility automatically.' },
            { num: '2', title: 'Metadata', desc: 'Name, description, icon, and a plain-language permissions declaration.' },
            { num: '3', title: 'Review', desc: 'Quality and safety checks before an app reaches the store.' },
          ]} />
          <CsBody>
            <p>The documentation uses a 15-minute first-app target, followed by progressive layers for advanced features. That is an onboarding goal, not a measured completion-time result.</p>
          </CsBody>
        </CsSection>

        {/* Permission Model */}
        <CsSection id="cs-permissions" label="05 &mdash; Permissions" title="Make sensor access inspectable">
          <CsBody>
            <p>Camera glasses need a higher trust bar. Every MiniApp declares what sensors it uses and why before install.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Sensor Declaration', desc: 'Camera, microphone, GPS, display access, each declared individually with a plain-language explanation of why.' },
            { title: 'Runtime Indicators', desc: 'The permission design calls for a visible camera-use indicator so active capture can be recognized.' },
            { title: 'Revocable Permissions', desc: 'The companion app provides a place to revoke access. Each app needs a defined state when a required permission is unavailable.' },
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
          <CsBody><p>The work connects discovery, installation, sensor permissions, developer submission, and several app types. The screens document that design scope; they do not establish adoption or retention results.</p></CsBody>
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
