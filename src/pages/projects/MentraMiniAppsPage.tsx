import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsPullquote from '../../components/case-study/CsPullquote'
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
    label: 'Capture + memory',
    src: MINIAPP_ASSETS.notes,
    width: 419,
    height: 909,
    alt: 'Mentra Notes MiniApp with daily notes and transcription state',
  },
  {
    title: 'Conversations',
    label: 'Live transcript history',
    src: MINIAPP_ASSETS.conversations,
    width: 419,
    height: 909,
    alt: 'Mentra Conversations MiniApp with transcript list',
  },
  {
    title: 'Live Transcript',
    label: 'Real-time overlay',
    src: MINIAPP_ASSETS.transcript,
    width: 420,
    height: 911,
    alt: 'Mentra Live Transcript MiniApp showing speech converted to readable text',
  },
  {
    title: 'Meet',
    label: 'Calling + presence',
    src: MINIAPP_ASSETS.meet,
    width: 390,
    height: 844,
    alt: 'Mentra Meet MiniApp home screen for joining calls',
  },
  {
    title: 'Guidance',
    label: 'Contextual routing',
    src: MINIAPP_ASSETS.guidance,
    width: 363,
    height: 783,
    alt: 'Mentra Guidance MiniApp with route instruction screen',
  },
]

export default function MentraMiniAppsPage() {
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
          subtitle="A voice-first app ecosystem for smart glasses: discovery, permissions, install flows, and platform patterns for captions, translation, notes, AI, and utilities"
          info={[
            { label: 'Role', value: 'Head of UI/UX (sole designer)' },
            { label: 'Timeline', value: 'Q4 2025 &ndash; Q1 2026' },
            { label: 'Platform', value: 'MentraOS + Companion App + Web Portal' },
            { label: 'Focus', value: 'Store, permissions, developer handoff' },
          ]}
          heroImage="/Assets/mockups/projects/mentra-miniapps_16x9.webp"
          heroAlt="Mentra MiniApp Store 16:9 project cover showing the smart glasses app ecosystem"
        />

        <section className="cs-section mentra-miniapps-hero-gallery reveal" aria-label="MiniApp system previews">
          <div className="wrap mentra-miniapps-hero-gallery__inner">
            <figure className="mentra-miniapps-hero-gallery__primary">
              <img src={MINIAPP_ASSETS.notes} width="419" height="909" alt="Mentra Notes MiniApp running as part of the smart glasses ecosystem" loading="eager" decoding="async" />
              <figcaption>
                <span>Featured MiniApp</span>
                Notes turns live speech into searchable memory, which made it the clearest example of why the store needed real app depth.
              </figcaption>
            </figure>
          </div>
        </section>

        <ProjectOverview
          id="cs-vision"
          sections={[
            {
              label: 'The Thesis',
              content: 'Without an ecosystem, Mentra is a pair of clever glasses. With MiniApps, it becomes a platform for captions, translation, notes, AI help, calling, and utilities.',
            },
            {
              label: 'The Problem',
              content: 'You cannot browse 500 apps on a see-through display while walking. The store had to be faster than browsing and smarter than categories.',
            },
            {
              label: 'My Role',
              content: 'I designed the on-glasses store, companion app store, developer portal, SDK docs, submission flow, review system, and permission model.',
            },
          ]}
        />

        {/* The Constraint */}
        <CsExpandPreview>
        <CsSection id="cs-constraint" label="01 &mdash; Constraint" title="640&times;400 Pixels. No Scrolling. No Tapping.">
          <CsBody>
            <p>The glasses display is 640&times;400, transparent, and peripheral. Users are moving, their hands are busy, and voice is the reliable input.</p>
            <p>That killed conventional store patterns. No grids, no carousels, no browsing. Speak the need, see one result, decide in seconds.</p>
          </CsBody>
          <CsCallout>
            <p>&ldquo;An app store on your face sounds absurd until you use it. Then every other pair of smart glasses feels like a flip phone.&rdquo; &mdash; Early beta tester</p>
          </CsCallout>
        </CsSection>

        {/* Discovery */}
        <CsSection id="cs-discovery" label="02 &mdash; Discovery" title="Intent-Based, Not Category-Based">
          <CsBody>
            <p>People do not browse apps on glasses. They need a capability in the moment: translate this, record this, identify this.</p>
            <p>The store is organized by intent. Voice query and context surface the right tool without forcing a catalog experience onto a peripheral display.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Voice-First Install', desc: '"Hey Mentra, I need a translator." One preview, one confirmation, no browsing loop.' },
            { title: 'Context Curation', desc: 'The store can prioritize the kind of app that makes sense for the current moment.' },
            { title: 'One-Card Preview', desc: 'Name, one-line description, permission cue, install action. Enough to decide, nothing more.' },
            { title: 'Deep Browse on Phone', desc: 'Comparison, reviews, details, and permissions move to the companion app where attention is available.' },
          ]} />
        </CsSection>

        <CsSection id="cs-app-mix" label="03 &mdash; App Mix" title="It Had To Support More Than One Kind of App">
          <CsBody>
            <p>The store had to support very different jobs: live captions, translation, notes, Mentra AI, calling, language helpers, and ambient utilities.</p>
            <p>The design challenge was giving each app type the right behavior without making the platform feel inconsistent.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Captions', desc: 'The instant-value app. Open it and speech becomes text. It forced first-run speed, legibility, and a low-friction path from install to visible payoff.' },
            { title: 'Translation', desc: 'The flagship utility. Live translation had to feel useful in seconds, not after setup theater.' },
            { title: 'Notes', desc: 'A longer-running utility for meetings and capture. It pushed on recording state, listening feedback, summaries, and the idea that search matters more than folders.' },
            { title: 'Mentra AI', desc: 'The assistant layer. Not just another app, but a system-level capability that raised questions about routing, trust, context, and when the camera should or should not activate.' },
            { title: 'Dash + Wayfinding', desc: 'Ambient utilities proved the ecosystem could not be designed only for one-shot demo apps.' },
            { title: 'Meet + Merge + LinkLingo', desc: 'Communication and language tools widened the platform beyond a single accessibility use case.' },
          ]} />
        </CsSection>

        <section className="cs-section mentra-miniapps-system reveal" aria-label="Mentra MiniApp examples">
          <div className="wrap">
            <div className="mentra-miniapps-system__head">
              <span className="cs-kicker">Figma exports</span>
              <h2>Multiple MiniApps, one OS language.</h2>
              <p>These are the stronger Figma screens from the MiniApps board: each one shows a different job the OS had to support without making the system feel fragmented.</p>
            </div>
            <div className="mentra-miniapps-system__grid">
              {miniAppExamples.map((app) => (
                <figure className="mentra-miniapps-card reveal" key={app.title}>
                  <img src={app.src} width={app.width} height={app.height} alt={app.alt} loading="lazy" decoding="async" />
                  <figcaption>
                    <span>{app.label}</span>
                    <strong>{app.title}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="cs-caption">The ecosystem had to make room for immediate overlays like Live Transcript, longer-running utilities like Notes, communication surfaces like Meet, and contextual utilities like Guidance.</p>
          </div>
        </section>

        {/* Developer Platform */}
        <CsSection id="cs-developer" label="04 &mdash; Developer Platform" title="First MiniApp in 15 Minutes">
          <CsBody>
            <p>The store only works if developers can build for it. The portal had to make the first MiniApp feel fast, clear, and safe to submit.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Upload', desc: 'Drag and drop your MiniApp package. The system validates format, size, and compatibility automatically.' },
            { num: '2', title: 'Metadata', desc: 'Name, description, icon, and a plain-language permissions declaration.' },
            { num: '3', title: 'Review', desc: 'Quality and safety checks before an app reaches the store.' },
          ]} />
          <CsBody>
            <p>The docs follow a &ldquo;first MiniApp in 15 minutes&rdquo; model: one command for a working app, then progressive layers for advanced features.</p>
          </CsBody>
        </CsSection>

        {/* Permission Model */}
        <CsSection id="cs-permissions" label="05 &mdash; Permissions" title="Transparency by Design">
          <CsBody>
            <p>Camera glasses need a higher trust bar. Every MiniApp declares what sensors it uses and why before install.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Sensor Declaration', desc: 'Camera, microphone, GPS, display access, each declared individually with a plain-language explanation of why.' },
            { title: 'Runtime Indicators', desc: 'When a MiniApp uses the camera, a physical LED on the glasses turns on. Hardware-level, cannot be overridden by software.' },
            { title: 'Revocable Permissions', desc: 'Users can revoke any permission at any time from the companion app. The MiniApp degrades gracefully.' },
            { title: 'Privacy Report', desc: 'A readable summary of what each MiniApp accessed, adapted for wearable context.' },
          ]} />
          <CsPullquote
            quote="You know exactly what every app can see and do before you install it. That is not a feature, it is a requirement for a camera on your face."
          />
        </CsSection>

        {/* OS screens */}
        <section className="cs-section mentra-miniapps-os reveal">
          <div className="wrap">
            <div className="mentra-miniapps-os__grid">
              <figure className="mentra-miniapps-os__shot">
                <img src="/Assets/images/mentra/os-running-apps.png" alt="MentraOS currently running MiniApps" loading="lazy" decoding="async" />
                <figcaption>Running apps made the platform legible without forcing a phone-style app switcher.</figcaption>
              </figure>
              <figure className="mentra-miniapps-os__shot">
                <img src="/Assets/images/mentra/os-home.png" alt="MentraOS home screen with active app" loading="lazy" decoding="async" />
                <figcaption>The home surface had to show breadth while still feeling glanceable.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <CsSection id="cs-impact" label="06 &mdash; Impact" title="From Gadget to Platform">
          <CsBody>
            <p>The MiniApp Store makes the platform thesis visible: the glasses are not limited to one company&rsquo;s built-in demos. They can become a home for many small, useful, permission-aware tools.</p>
            <p>The launch story became easier to explain because buyers and developers could see the same argument: captions, translation, notes, and AI are not separate demos. They are an ecosystem.</p>
          </CsBody>
          <CsCallout>
            <p>The store turns smart glasses from hardware proof into software platform.</p>
          </CsCallout>
        </CsSection>

        {/* Reflection */}
        <CsSection id="cs-reflection" label="Reflection" title="What Building an App Store for Your Face Taught Me">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>The store is where the platform thesis proves itself. Developers need a reason to build, and users need a way to find value instantly.</p>
            <p>The key insight: voice-first discovery is not just a workaround for a small screen. For wearable computing, it may be the better app-store model.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-constraint', label: 'Constraint' },
          { id: 'cs-discovery', label: 'Discovery' },
          { id: 'cs-app-mix', label: 'App Mix' },
          { id: 'cs-developer', label: 'Developer' },
          { id: 'cs-permissions', label: 'Permissions' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-reflection', label: 'Reflection' },
        ]} />

      </main>

      <NextProject slug="zentipay" title="ZentiPay" image="/Assets/mockups/projects/zentipay_16x9.webp" />
      <Footer />
    </>
  )
}
