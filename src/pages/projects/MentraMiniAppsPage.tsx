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
import CsImage from '../../components/case-study/CsImage'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function MentraMiniAppsPage() {
  return (
    <>
      <Helmet>
        <title>Mentra MiniApp Store &middot; Parth Pawar</title>
        <meta name="description" content="Designing an app ecosystem for smart glasses. Voice-first discovery, captions, translation, notes, Mentra AI, and the platform surfaces that turn hardware into a real product." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mentra MiniApp Store &middot; Parth Pawar" />
        <meta property="og:description" content="An app ecosystem for smart glasses. Voice-first discovery, developer SDK, and the product patterns behind captions, translation, notes, and Mentra AI." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/mockups/projects/mentra-miniapps_16x9.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#A78BFA' } as React.CSSProperties}>

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
          heroImage="/Portfolio.github.io/Assets/mockups/projects/mentra-miniapps_16x9.webp"
          heroAlt="Mentra MiniApp Store 16:9 project cover showing the smart glasses app ecosystem"
        />

        {/* App store on device */}
        <CsImage src="/Portfolio.github.io/Assets/images/mentra/appstore-device.png" alt="MiniApp Store on the glasses display" />

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

        <section className="cs-section reveal" aria-label="Mentra MiniApp examples">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/images/mentra/appstore-translation.webp" alt="Translation MiniApp running on Mentra smart glasses with bilingual text overlay" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/images/mentra/os-notes.png" alt="Mentra Notes MiniApp showing recorded notes and summaries in the OS" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/images/mentra/os-all-apps.png" alt="MentraOS all apps view showing multiple installed MiniApps" loading="lazy" /></div>
            </div>
            <p className="cs-caption">The ecosystem had to make room for immediate overlays like Translation, longer-running utilities like Notes, and a growing installed-app surface that made breadth visible without making the OS feel cluttered.</p>
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
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/images/mentra/os-running-apps.png" alt="MentraOS: currently running MiniApps" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/images/mentra/os-home.png" alt="MentraOS: home screen with active app" loading="lazy" /></div>
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

      <NextProject slug="zentipay" title="ZentiPay" image="/Portfolio.github.io/Assets/mockups/projects/zentipay_16x9.webp" />
      <Footer />
    </>
  )
}
