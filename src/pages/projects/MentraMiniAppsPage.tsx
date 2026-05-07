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
import CsImage from '../../components/case-study/CsImage'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function MentraMiniAppsPage() {
  return (
    <>
      <Helmet>
        <title>Mentra MiniApp Store &middot; Parth Pawar</title>
        <meta name="description" content="Designing the first app ecosystem for smart glasses. Voice-first discovery, captions, translation, notes, Mentra AI, and the platform surfaces that turn hardware into a real product." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mentra MiniApp Store &middot; Parth Pawar" />
        <meta property="og:description" content="The first app ecosystem for smart glasses. Voice-first discovery, developer SDK, and the product patterns behind captions, translation, notes, and Mentra AI." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/mentra/appstore-hero.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#1DB954' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['Product Design', 'AI Wearables', 'Platform Design', 'Developer Experience']}
          title="Mentra MiniApp Store"
          subtitle="Designing the first app ecosystem for smart glasses &mdash; voice-first discovery, intent-based browsing, and the platform patterns that let captions, translation, notes, Mentra AI, and future utilities live on the same pair of glasses"
          info={[
            { label: 'Role', value: 'Head of UI/UX (sole designer)' },
            { label: 'Timeline', value: 'Q4 2025 &ndash; Q1 2026' },
            { label: 'Platform', value: 'MentraOS + Companion App + Web Portal' },
            { label: 'Status', value: 'Shipped with Mentra Glass launch' },
          ]}
          heroImage="/Portfolio.github.io/Assets/images/mentra/appstore-hero.webp"
          heroAlt="Mentra MiniApp Store: companion app showing MentraOS with active apps and smart glasses"
        />

        {/* App store on device */}
        <CsImage src="/Portfolio.github.io/Assets/images/mentra/appstore-device.png" alt="MiniApp Store on the glasses display" />

        <ProjectOverview
          id="cs-vision"
          sections={[
            {
              label: 'The Thesis',
              content: 'The smartphone won because of the App Store. Smart glasses will too. Without a MiniApp ecosystem, Mentra is a pair of glasses that does a few clever demos. With one, it becomes a platform for captions, translation, notes, AI assistance, calling, utilities, and whatever developers build next. The hardware is the foundation. The ecosystem is the reason people come back.',
            },
            {
              label: 'The Problem',
              content: 'You cannot scroll through 500 apps on a see-through display while walking down a street. Users are not going to browse categories, read reviews, or compare screenshots. The store has to be smarter than the user\'s patience, and the apps inside it have to support very different jobs without making the whole system feel inconsistent.',
            },
            {
              label: 'My Role',
              content: 'I designed every surface of the MiniApp ecosystem: the on-glasses store experience, the companion app store, the developer portal, the SDK documentation, the submission flow, the review system, and the permission model. That meant designing both the marketplace and the patterns that let very different MiniApps coexist inside MentraOS without feeling like a random pile of features.',
            },
          ]}
        />

        {/* The Constraint */}
        <CsSection id="cs-constraint" label="01 &mdash; Constraint" title="640&times;400 Pixels. No Scrolling. No Tapping.">
          <CsBody>
            <p>Every app store you have used assumes a screen you can touch, scroll, and stare at. The MiniApp Store has none of those. The display is 640&times;400 pixels, transparent, and viewed peripherally. The user&rsquo;s hands are busy. Their eyes are on the real world. The only reliable input channel is voice.</p>
            <p>This constraint killed every conventional pattern. No icon grids. No screenshot carousels. No star ratings visible at a glance. The store had to work through a completely different interaction model: speak what you need, see one result, decide in 3 seconds.</p>
          </CsBody>
          <CsCallout>
            <p>&ldquo;An app store on your face sounds absurd until you use it. Then every other pair of smart glasses feels like a flip phone.&rdquo; &mdash; Early beta tester</p>
          </CsCallout>
        </CsSection>

        {/* Discovery */}
        <CsSection id="cs-discovery" label="02 &mdash; Discovery" title="Intent-Based, Not Category-Based">
          <CsBody>
            <p>Nobody &ldquo;browses&rdquo; an app store on glasses. They need a specific capability at a specific moment. &ldquo;I need a translator right now.&rdquo; &ldquo;I want to identify this plant.&rdquo; &ldquo;Record what I am seeing.&rdquo;</p>
            <p>The MiniApp Store is organized by intent, not category. The discovery model uses three signals: what you are doing (walking, cooking, working), where you are (GPS context), and what you are asking for (voice query). The result feels less like a catalog and more like a knowledgeable friend who always knows the right tool.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Voice-First Install', desc: '"Hey Mentra, I need a translator." One card preview, one tap or voice confirm, live in 3 seconds. No browsing. No scrolling.' },
            { title: 'Context Curation', desc: 'At a museum? Art identification apps surface. At a restaurant? Menu translators appear. The store adapts to where you are.' },
            { title: 'One-Card Preview', desc: 'Name, rating, one-line description, install button. That is all you see on the glasses. Enough to decide. Nothing more.' },
            { title: 'Deep Browse on Phone', desc: 'Want to compare translators, read reviews, check permissions? The companion app handles deep browsing. Different devices, different jobs.' },
          ]} />
        </CsSection>

        <CsSection id="cs-app-mix" label="03 &mdash; App Mix" title="It Had To Support More Than One Kind of App">
          <CsBody>
            <p>This was never a store for one hero demo. By the time Mentra was taking shape as a real platform, the ecosystem already had to flex across very different jobs: live captions for accessibility, translation for travel, notes for meetings, Mentra AI for open-ended help, and the next wave of communication and utility MiniApps like calling, language helpers, Merge, and dashboard-style tools.</p>
            <p>That breadth changed the design problem. I was not only designing install and discovery. I was designing the product grammar for MiniApps that behave differently: passive overlays, ongoing recorders, conversational tools, quick utilities, and social or collaborative surfaces. If the store treated all of them the same way, the system would feel generic. If it treated each one as a one-off, the platform would collapse under inconsistency.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Captions', desc: 'The instant-value app. Open it and speech becomes text. It forced first-run speed, legibility, and a low-friction path from install to visible payoff.' },
            { title: 'Translation', desc: 'The flagship wow moment. Live multi-language translation proved the glasses could solve a real problem in seconds, not after setup theater.' },
            { title: 'Notes', desc: 'A longer-running utility for meetings and capture. It pushed on recording state, listening feedback, summaries, and the idea that search matters more than folders.' },
            { title: 'Mentra AI', desc: 'The assistant layer. Not just another app, but a system-level capability that raised questions about routing, trust, context, and when the camera should or should not activate.' },
            { title: 'Dash + Wayfinding', desc: 'Glanceable utilities and navigation-style surfaces proved the ecosystem could not be designed only for one-shot demo apps. Some jobs need to stay ambient and persistent.' },
            { title: 'Meet + Merge + LinkLingo', desc: 'The next wave widened the platform thesis beyond accessibility into communication, calling, collaboration, and language support.' },
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

        {/* Translation demo */}
        <CsImage src="/Portfolio.github.io/Assets/images/mentra/appstore-translation.webp" alt="Real-time English to Japanese translation through smart glasses with auto-scroll" />
        <p className="cs-caption">Live translation MiniApp: English to Japanese rendered directly on the glasses display with auto-scroll</p>

        {/* Developer Platform */}
        <CsSection id="cs-developer" label="04 &mdash; Developer Platform" title="First MiniApp in 15 Minutes">
          <CsBody>
            <p>The store is only as good as what developers build for it. I designed the developer experience with the same care as the consumer product, because a bad developer portal means an empty store.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Upload', desc: 'Drag and drop your MiniApp package. The system validates format, size, and compatibility automatically.' },
            { num: '2', title: 'Metadata', desc: 'Name, description, icon, permissions declaration. Every MiniApp must declare what sensors it uses (camera, mic, GPS, display) and why.' },
            { num: '3', title: 'Review', desc: 'Automated checks + human review for quality and safety. Average review time under 24 hours.' },
          ]} />
          <CsBody>
            <p>The SDK documentation follows a &ldquo;first MiniApp in 15 minutes&rdquo; philosophy. The quickstart produces a working app with one command. Advanced features are layered progressively. The docs are designed, not written, with the same typography, spacing, and navigation patterns as the consumer product.</p>
          </CsBody>
        </CsSection>

        {/* Permission Model */}
        <CsSection id="cs-permissions" label="05 &mdash; Permissions" title="Transparency by Design">
          <CsBody>
            <p>Smart glasses with cameras and microphones require a higher bar of trust than any other device. Every MiniApp must declare exactly what sensors it accesses and why. Users see this declaration before install, not buried in settings after.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Sensor Declaration', desc: 'Camera, microphone, GPS, display access, each declared individually with a plain-language explanation of why.' },
            { title: 'Runtime Indicators', desc: 'When a MiniApp uses the camera, a physical LED on the glasses turns on. Hardware-level, cannot be overridden by software.' },
            { title: 'Revocable Permissions', desc: 'Users can revoke any permission at any time from the companion app. The MiniApp degrades gracefully.' },
            { title: 'Privacy Report', desc: 'Weekly summary of what each MiniApp accessed. Modeled after Apple\'s App Privacy Report but adapted for wearable context.' },
          ]} />
          <CsPullquote
            quote="You know exactly what every app can see and do before you install it. That is not a feature, it is a requirement for a camera on your face."
          />
        </CsSection>

        {/* OS screens */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/images/mentra/os-all-apps.png" alt="MentraOS: all installed MiniApps view" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/images/mentra/os-running-apps.png" alt="MentraOS: currently running MiniApps" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/images/mentra/os-home.png" alt="MentraOS: home screen with active app" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <CsSection id="cs-impact" label="06 &mdash; Impact" title="From Gadget to Platform">
          <CsBody>
            <p>Meta Ray-Ban Gen 2 ships at $299 and does what Meta decides it does. Mentra ships at $299 and does what anyone with an idea builds for it. That is the difference between a gadget and a platform.</p>
            <p>The MiniApp Store launched with the Mentra Glass hardware. The developer portal is live. The SDK is open-source. The first third-party MiniApps are in review. The store is what makes the glasses worth putting on every morning, because tomorrow they will do something they could not do today.</p>
          </CsBody>
          <CsCallout>
            <p>88% of Batch 1 owners ordered Batch 2. The store is a significant part of why.</p>
          </CsCallout>
        </CsSection>

        {/* Reflection */}
        <CsSection id="cs-reflection" label="Reflection" title="What Building an App Store for Your Face Taught Me">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>This was the hardest design problem in the Mentra project. Harder than the OS, harder than the companion app. Because the store is where the platform thesis either proves itself or dies. If developers do not build for it, the glasses are a $299 novelty. If users cannot discover what developers build, the ecosystem stalls.</p>
            <p>The key insight: voice-first discovery is not a workaround for a small screen. It is genuinely better than visual browsing for a device you wear while living your life. You do not want to stop what you are doing to shop for apps. You want the right app to appear when you need it. That is what intent-based discovery does, and I think it is the future of app stores on every platform, not just glasses.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

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

      <NextProject slug="mentra" title="Mentra Glass" image="/Portfolio.github.io/Assets/images/mentra/render-transparent.webp" />
      <Footer />
    </>
  )
}
