import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsTimeline from '../../components/case-study/CsTimeline'
import CsSteps from '../../components/case-study/CsSteps'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCallout from '../../components/case-study/CsCallout'
import CsImage from '../../components/case-study/CsImage'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsProcessFlow from '../../components/case-study/CsProcessFlow'
import CsFlowDiagram from '../../components/case-study/CsFlowDiagram'
import CsCompareTable from '../../components/case-study/CsCompareTable'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function MentraPage() {
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('summary')
  const sections = viewMode === 'summary'
    ? [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'cs-vision', label: 'Vision & Role' },
      ]
    : [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'cs-vision', label: 'Vision & Role' },
        { id: 'cs-context', label: 'Context' },
        { id: 'cs-bet', label: 'The Bet' },
        { id: 'cs-challenges', label: 'Challenges' },
        { id: 'cs-companion', label: 'Companion App' },
        { id: 'cs-os', label: 'MentraOS' },
        { id: 'cs-store', label: 'MiniApp Store' },
        { id: 'cs-timeline', label: 'Timeline' },
        { id: 'cs-website', label: 'Live Site' },
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
        <title>Mentra · Parth Pawar</title>
        <meta name="description" content="Mentra Glass, Designing the UX for the only AI-powered smart glasses with an app store. Companion app, MentraOS, and MiniApp Store. Case study by Parth Pawar, Head of UI/UX." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mentra · Parth Pawar" />
        <meta property="og:description" content="Designing the UX for the only AI-powered smart glasses with an app store. MentraOS, companion app, and developer platform." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/mentra.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#1B4D8F' } as React.CSSProperties}>

      <ProjectHeader
        backLink="/work"
        categorySlug="ai"
        backLabel="Back to Work"
        tags={['AI Wearables', 'Head of UI/UX', '0→1 Product', 'Smart Glasses']}
        title="Mentra"
        subtitle="Designing the UX for the only AI-powered smart glasses with an app store, from companion app to open-source OS to developer marketplace"
        info={[
          { label: 'Role', value: 'Head of UI/UX (design team of 1, cross-functional with eng + product)' },
          { label: 'Timeline', value: 'Q3 2025 \u2013 Present (ongoing)' },
          { label: 'Team', value: '1 designer (me) + 4 engineers + product lead + hardware team' },
          { label: 'Platform', value: 'Wearable OS, Mobile, Web' },
        ]}
        liveUrl="https://www.mentra.glass"
        heroImage="/Portfolio.github.io/Assets/images/mentra/render-camera-detail.webp"
        heroAlt="Mentra Glass, AI-powered smart glasses with camera detail and Mentra logo"
        showHeaderSummary={false}
      />

        <ProjectQuickSummary
          slug="mentra"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />

        <ProjectOverview
          id="cs-vision"
          sections={[
            {
              label: 'The Vision',
              content: 'Smart glasses have been a graveyard of good intentions. Google Glass, Snap Spectacles, North Focals, all shipped impressive hardware and then asked users to figure out why they should wear it. Mentra Glass answers that question with an open-source OS and the first miniapp store for smart glasses, turning a piece of hardware into a platform people put on every morning and never take off.',
            },
            {
              label: 'My Role',
              content: 'As the sole designer on a cross-functional team, I own every design surface: companion app, MentraOS on-glasses interface, MiniApp Store, and the design system. Product decisions happen collaboratively with the product lead and hardware team, I translate those decisions into interfaces, flows, and interaction patterns. Engineering implements and often pushes back, which makes the work better.',
            },
          ]}
        />

        {viewMode === 'full' ? (
        <>
        <CsSection id="cs-context" label="Context" title="A Decade of Expensive Failures">
          <CsBody>
            <p>Before designing forward, I studied backward. Smart glasses have a decade-long trail of ambitious launches and quiet discontinuations. The pattern never varies: a hardware company ships something technically impressive, bundles a companion app with three features, and waits for the &ldquo;ecosystem&rdquo; to magically appear. It never does.</p>
            <p>Google Glass had the sensors but no software story. Snap Spectacles had the brand but no utility past fifteen-second clips. North Focals had the elegance but no reason to exist past the first week. Every one treated software as an afterthought and developers as an audience that would show up uninvited.</p>
            <p>The lesson: smart glasses without an ecosystem are an expensive accessory with a charging cable.</p>
          </CsBody>
          <CsCallout>
            <p>&ldquo;The smartphone won because of the App Store. Smart glasses will too.&rdquo;</p>
          </CsCallout>
          <CsPullquote
            quote="Every smart glasses company before us shipped hardware and hoped software would follow. We designed the software ecosystem first and built the hardware to serve it."
            cite="Mentra founding thesis"
          />
        <CsImage src="/Portfolio.github.io/Assets/images/mentra/glasses-angle.png" alt="Mentra Live smart glasses, three-quarter angle showing camera module and Mentra logo on temple" />
        </CsSection>

        <CsProcessFlow
          title="Design Process"
          steps={[
            { label: 'Research', desc: 'Audited every smart glasses product since Google Glass, hardware, software, and go-to-market. Identified the missing layer: an open software ecosystem.' },
            { label: 'Define', desc: 'Established three core UX principles: glance-not-gaze, voice-first input, and peripheral-priority information hierarchy. These guided every decision.' },
            { label: 'Design', desc: 'Built the companion app, MentraOS HUD, and MiniApp Store in parallel. Used Protopie for on-device simulations and Figma for the design system.' },
            { label: 'Prototype', desc: 'Tested on real glasses hardware with tethered phones. Validated the one-tap QR pairing, three-tier notifications, and voice-navigated store.' },
            { label: 'Ship', desc: 'Launched at $299 with an open-source OS and a functioning app store, a first for smart glasses. Batch 2 pre-orders at 88% claimed.' },
          ]}
        />

        <CsSection id="cs-bet" label="The Bet" title="What Android Did for Phones, MentraOS Does for Glasses">
          <CsBody>
            <p>Mentra&rsquo;s thesis is simple and radical: smart glasses need an open-source OS and a developer marketplace to become a daily-wear platform. Not a better camera. Not a lighter frame. An ecosystem.</p>
            <p>MentraOS is that ecosystem, open-source, community-driven, designed from the ground up for face-worn computing. The MiniApp Store gives developers a place to publish, users a place to discover, and the platform a reason to grow beyond what any single company could build alone.</p>
            <p>The bet: the smart glasses that win will not have the best specs on paper. They will have the best app on your face, built by someone you have never met, for a problem only you have, found in a store that runs on your glasses.</p>
          </CsBody>
          <CsFlowDiagram
            title="The Mentra Ecosystem"
            nodes={[
              { label: 'Companion App', desc: 'Configuration, management, pairing' },
              { label: 'MentraOS', desc: 'On-glasses open-source OS', accent: true },
              { label: 'MiniApp Store', desc: 'Discover & install apps' },
              { label: 'Developer SDK', desc: 'Build for glasses like phones' },
            ]}
          />
        </CsSection>

        <CsSection id="cs-challenges" label="Design Challenges" title="Four Problems Nobody Had Cracked">
          <CsBody>
            <p>Smart glasses are not &ldquo;mobile design but smaller.&rdquo; The screen is in your peripheral vision, the input is voice and gesture, and the context is the real world. Every assumption from a decade of screen design had to be thrown out.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'The Screen You Never Look At', desc: 'The display lives in peripheral vision, not dead center. UI elements must be glanceable, not readable. Hierarchy is about where in the visual field something appears, not font size.' },
            { title: 'Sixty Seconds or You Lose Them', desc: 'New form factor, zero patience. I designed a four-step onboarding that gets users from unboxing to first interaction in under a minute. No tutorials, no walkthrough. Wear them and talk.' },
            { title: "If They Won't Build, Nothing Else Matters", desc: "An app store is only as good as its apps. I designed the SDK docs, developer portal, and submission flow to make building for glasses feel as natural as building for phones." },
            { title: 'A Camera on Your Face Is a Social Contract', desc: 'Post-Google-Glass, face-worn cameras carry social baggage. I designed visual indicators, privacy modes, and interaction patterns that build trust with both the wearer and everyone in the room.' },
          ]} />
          <CsImage src="/Portfolio.github.io/Assets/images/mentra/render-temple-detail.webp" alt="Mentra Live temple detail, close-up of hinge mechanism, USB-C port, and Mentra logo" />
        </CsSection>

        <CsSection id="cs-companion" label="Companion App" title="The Control Center in Your Pocket">
          <CsBody>
            <p>The companion app is not a remote control, it is the bridge between your phone and your face. It handles everything the glasses should not: deep configuration, miniapp management, firmware updates, AI settings.</p>
            <p>Pairing was the first interaction I obsessed over. Bluetooth pairing is traditionally a five-minute frustration. I designed a one-tap flow, scan the QR code on the glasses case, connection established, personalized home screen, all in under thirty seconds.</p>
          </CsBody>
          <CsSteps steps={[
            { num: 1, title: 'Slide On', desc: 'Unfold the temples and the glasses power on. The accelerometer detects the motion and boots MentraOS in under two seconds.' },
            { num: 2, title: 'Download App', desc: 'A card in the display directs you to download the companion app. NFC in the case triggers the download on Android.' },
            { num: 3, title: 'Pair', desc: 'Scan the QR code. One tap to confirm. The phone and glasses handshake over Bluetooth LE and the connection is persistent.' },
            { num: 4, title: '"Hey Mentra"', desc: 'The wake word activates the AI. Directions, translation, song ID, calendar, the first interaction sets the tone.' },
          ]} />
          <CsImage src="/Portfolio.github.io/Assets/images/mentra/appstore-hero.webp" alt="MentraOS companion app, home screen with glasses status, background apps, and active captions" />
          <CsImage src="/Portfolio.github.io/Assets/images/mentra/appstore-device.png" alt="Companion app device settings, Even Realities G1 connection, brightness controls, battery status" />
          <CsBody style={{ marginTop: '2rem' }}>
            <p>Beyond onboarding, the app is the management layer for the entire ecosystem: browse miniapps, configure per-app notifications, adjust display settings, manage privacy. I built it on a single-tab architecture, everything is two taps away.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-os" label="MentraOS" title="An OS That Disappears Until You Need It">
          <CsBody>
            <p>MentraOS is open-source, a product decision that became the defining design constraint. An open OS means developers will build things I cannot predict, on a display I cannot control, for users I will never meet. The design system had to be opinionated enough to feel cohesive and flexible enough for miniapps that do not exist yet.</p>
            <p>The HUD operates on a principle I call &ldquo;glance, don&rsquo;t gaze.&rdquo; Every piece of information must be understood in under two seconds of peripheral attention.</p>
          </CsBody>
          <CsImage src="/Portfolio.github.io/Assets/images/mentra/os-home.png" alt="MentraOS home screen, glasses status widget, app grid with Flash, Notes, Streamer, Camera, and running apps indicator" />
          <CsImage src="/Portfolio.github.io/Assets/images/mentra/os-all-apps.png" alt="MentraOS all apps drawer, searchable app grid with Gallery, Appstore, Settings, Recorder, and Mentra AI" />
          <h3 className="cs-section-subtitle">Voice-First, Screen-Second</h3>
          <CsBody>
            <p>Voice is the primary input. The AI handles natural language queries, contextual responses from the camera feed, and proactive suggestions from time and location. Visual feedback is minimal by design: a thin amber waveform that pulses while listening and settles when processing.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Notification Architecture</h3>
          <CsBody>
            <p>On glasses, every notification competes with reality. I designed three tiers: ambient (subtle color shift at the frame edge), informational (translucent one-line card), and urgent (persistent card with haptic pulse requiring voice dismissal). Users assign tiers per app, and MentraOS learns from behavior.</p>
          </CsBody>
          <CsCompareTable
            title="Notification Tiers"
            columns={['Ambient', 'Informational', 'Urgent']}
            rows={[
              { feature: 'Visual treatment', values: ['Subtle color shift at frame edge', 'Translucent one-line card', 'Persistent card overlay'] },
              { feature: 'Haptic feedback', values: [false, false, true] },
              { feature: 'Requires dismissal', values: [false, false, true] },
              { feature: 'Auto-dismiss time', values: ['2s', '4s', 'Manual only'] },
              { feature: 'Example', values: ['Step count update', 'New message preview', 'Low battery, emergency'] },
              { feature: 'User can reassign', values: [true, true, true] },
            ]}
          />
          <CsImage src="/Portfolio.github.io/Assets/images/mentra/os-notes.png" alt="Mentra Notes app, note editor with formatting toolbar, AI summarization button, and quick actions" />
          <CsImage src="/Portfolio.github.io/Assets/images/mentra/os-running-apps.png" alt="MentraOS running apps view, multitasking interface showing stacked app cards with Teleprompter active" />
        </CsSection>

        {/* Product gallery */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/images/mentra/photo-front.webp" alt="Mentra smart glasses from front — transparent display, minimal frame" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/images/mentra/photo-angle.webp" alt="Mentra smart glasses angled view showing temple arm and hinge" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/images/mentra/photo-folded.webp" alt="Mentra smart glasses folded, compact form factor" loading="lazy" /></div>
            </div>
          </div>
        </section>

        <CsSection id="cs-store" label="MiniApp Store" title="The App Store That Lives on Your Face">
          <CsBody>
            <p>This is what separates Mentra from everything else. Meta Ray-Ban Gen 2 ships at the same $299 price point but is a closed system. Mentra is the opposite: an open marketplace where any developer can ship.</p>
            <p>Designing a store for a HUD meant rethinking every convention. No icon grid. No screenshot carousel. The on-glasses store is voice-navigated and context-curated.</p>
          </CsBody>
          <CsImage src="/Portfolio.github.io/Assets/images/mentra/appstore-translation.webp" alt="MentraOS Translation app, real-time English to Japanese translation through smart glasses with auto-scroll" />
          <h3 className="cs-section-subtitle">Discoverability Without Browsing</h3>
          <CsBody>
            <p>The store surfaces miniapps from three signals: what you are doing, where you are, and what you are asking for. The result feels less like a catalog and more like a knowledgeable friend who always knows the right tool.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Developer Experience</h3>
          <CsBody>
            <p>I designed the portal and SDK docs with the same care as the consumer product. Submission is three steps: upload, metadata, review. The docs follow a &ldquo;first miniapp in 15 minutes&rdquo; philosophy.</p>
          </CsBody>
          <CsPullquote
            quote="An app store on your face sounds absurd until you use it. Then every other pair of smart glasses feels like a flip phone."
            cite="Early beta tester feedback"
          />
        </CsSection>

        <CsSection id="cs-timeline" label="Design Evolution" title="From Zero to Shipping Product">
          <CsBody>
            <p>Building the UX for an entirely new product category meant evolving the design as our understanding of face-worn computing deepened. Here is how the product and its design language matured.</p>
          </CsBody>
          <CsTimeline items={[
            { date: 'Q3 2025', title: 'Foundation & Research', desc: 'Competitive audit of every smart glasses product since Google Glass. Established core UX principles: glance-not-gaze, voice-first input, and peripheral-priority information hierarchy. Built the initial design system for MentraOS.' },
            { date: 'Q3\u2013Q4 2025', title: 'Companion App & Onboarding', desc: 'Designed and iterated the companion app from wireframes to high-fidelity. Reduced the onboarding flow from twelve steps to four. Validated the one-tap QR pairing pattern with hardware prototypes.' },
            { date: 'Q4 2025', title: 'MentraOS HUD & Notification System', desc: 'Developed the three-tier notification architecture. Iterated the HUD layout through Protopie simulations and on-device testing. Established the amber waveform as the AI\'s visual signature.' },
            { date: 'Q4 2025\u2013Q1 2026', title: 'MiniApp Store & Developer Platform', desc: 'Shipped the MiniApp Store design with voice-navigated browsing. Built the developer portal, SDK documentation, and submission flow. Designed the review and curation system.' },
            { date: 'Q1 2026', title: 'Launch & Iteration', desc: 'Mentra Glass shipped at $299 with Batch 2 at 88% pre-orders claimed. Ongoing iteration on the design system based on developer and user feedback.' },
          ]} />
        </CsSection>

        <CsImage src="/Portfolio.github.io/Assets/images/mentra/render-transparent.webp" alt="Mentra Live transparent frame render, showing internal components, camera module, and circuit board" />
        <CsImage src="/Portfolio.github.io/Assets/images/mentra/photo-front.webp" alt="Mentra Live smart glasses, real product photo showing lens display and black frame" />

        <CsSection id="cs-website" label="Live Product" title="mentraglass.com, The Marketing Site I Designed">
          <CsBody>
            <p>The marketing site mirrors the product philosophy: show, don&rsquo;t tell. Open-source positioning, developer-friendly messaging, and hardware specs presented with the clarity executives and developers both expect. Every section reinforces the core thesis &mdash; the only smart glasses with an app store.</p>
          </CsBody>
          <CsImage src="/Portfolio.github.io/Assets/Projects/website-screenshot/screencapture-mentraglass-2026-03-25-13_33_13.webp" alt="Mentra Glass full marketing website, hero section, product features, app store showcase, specifications, and pricing" />
        </CsSection>

        <CsSection id="cs-impact" label="Impact" title="Shipping, Not Pitching">
          <CsBody style={{ marginBottom: '2rem' }}>
            <p>Mentra Live is not a concept deck. It is shipping at $299, backed by the founders of YouTube, Android, and Pebble, plus Y Combinator, Amazon, and Toyota Ventures. Press coverage spans Forbes, GamesBeat, Gizmodo, Android Police, and 9to5Google.</p>
          </CsBody>
          <CsStatGrid
            style={{ marginBottom: '2rem' }}
            stats={[
              { label: 'Onboarding (internal testing)', value: '< 60s' },
              { label: 'Batch 2 Pre-orders Claimed', value: '88%' },
              { label: 'Setup Steps Reduced', value: '12 \u2192 4' },
              { label: 'Design Surfaces Shipped', value: '5' },
            ]}
          />
          <CsInfoGrid items={[
            { key: 'Price', value: '$299' },
            { key: 'Weight', value: '43g' },
            { key: 'Battery Life', value: '12+ hrs' },
            { key: 'Camera FOV', value: '119°' },
            { key: 'Prescription', value: 'Ready' },
            { key: 'OS', value: 'Open Source' },
          ]} />
          <CsCallout style={{ marginTop: '2.5rem' }}>
            <p>&ldquo;Backed by the founders of YouTube, Android &amp; Pebble, plus Y&nbsp;Combinator, Amazon &amp; Toyota Ventures.&rdquo;</p>
          </CsCallout>
        </CsSection>

        <CsSection id="cs-learnings" label="Key Learnings" title="What Building for the Face Taught Me">
          <CsFeatureGrid features={[
            { title: 'World-first design is a different discipline', desc: 'On a phone, the screen is the world. On glasses, the world is the screen. Every decision starts with: does this help the user engage with reality, or pull them away?' },
            { title: 'Constraint is the best creative force', desc: 'A peripheral display, 43 grams, voice-first input, no hover states, no scroll, no tap targets. What remains is the essence of the information.' },
            { title: 'Open ecosystems demand opinionated systems', desc: 'The more open the platform, the more disciplined the design language must be. Permissiveness at the app level requires precision at the system level.' },
            { title: 'Trust is a design material', desc: 'Privacy indicators, recording lights, clear permissions, these are not features. They are the foundation that makes every other feature possible on your face.' },
          ]} />
        </CsSection>

        <CsSection id="cs-whats-next" label="What&rsquo;s Next" title="The Road Ahead for Mentra">
          <CsBody>
            <p>Mentra is shipping and iterating. The v1 platform is live with first-party apps, and the immediate roadmap focuses on depth rather than breadth &mdash; making what exists work better before expanding the surface area.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Notification Intelligence', desc: 'V1 notifications use manual user-assigned tiers. The next iteration adds behavioral learning: if a user consistently dismisses a certain app\u2019s informational notifications, the OS should auto-downgrade them to ambient. This requires careful UX for overrides and transparency.' },
            { num: '2', title: 'Third-Party Developer Onboarding', desc: 'The SDK and docs exist but have only been tested with the internal team. The next design challenge: make the submission flow, review process, and store listing experience good enough that independent developers choose to build for glasses when the audience is still small.' },
            { num: '3', title: 'Accessibility Foundations', desc: 'Real-time captioning and audio descriptions are on the roadmap but require partnership with the hardware team on microphone and speaker capabilities. My role: design the interaction patterns now so they are ready when the hardware supports them.' },
          ]} />
        </CsSection>

        <CsSection label="Credits" title="Team">
          <CsCredits credits={[
            { role: 'Head of UI/UX', name: 'Parth Pawar' },
            { role: 'Company', name: 'Mentra Glass' },
            { role: 'Tools', name: 'Figma, Protopie, Blender' },
            { role: 'Platforms', name: 'MentraOS, iOS, Android, Web' },
          ]} />
        </CsSection>

        <CsThanks contactCta style={{ marginTop: '4rem' }} />
        </>
        ) : null}

        <BottomNav
          sections={sections}
          liveUrl="https://www.mentra.glass"
          modeAction={{
            label: viewMode === 'summary' ? 'Full case study' : '2 min summary',
            onClick: () => handleViewModeChange(viewMode === 'summary' ? 'full' : 'summary'),
          }}
        />

      </main>

      <NextProject slug="executivelens" title="ExecutiveLens" image="/Portfolio.github.io/Assets/images/executivelens.webp" />
      <Footer />
    </>
  )
}
