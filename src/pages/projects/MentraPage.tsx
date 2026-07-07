import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
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
      ]
    : [
        { id: 'cs-summary', label: 'TL;DR' },
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

  useEffect(() => {
    if (typeof window === 'undefined') return
    const targetId = window.location.hash.replace('#', '')
    if (!targetId) return

    if (targetId !== 'cs-summary') {
      setViewMode('full')
    }

    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    }, 250)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Helmet>
        <title>Mentra · Parth Pawar</title>
        <meta name="description" content="Mentra Glass, Designing the OS, companion app, MiniApp Store, and launch website for AI-powered smart glasses. Case study by Parth Pawar, Head of UI/UX." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mentra · Parth Pawar" />
        <meta property="og:description" content="Designing the OS, companion app, MiniApp Store, developer platform, and launch website for Mentra smart glasses." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/mentra.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main project-main--mentra-visual" style={{
        // Mentra brand green (#00B869) drives the whole page: accent, outer
        // gradient family, and hero orbs.
        '--project-color': '#00B869',
        '--case-outer-1': '#071710',
        '--case-outer-2': '#0b3021',
        '--case-outer-3': '#123828',
        '--case-outer-glow-a': 'rgba(0, 184, 105, 0.30)',
        '--case-outer-glow-b': 'rgba(52, 211, 153, 0.20)',
        '--case-hero-orb-b': 'rgba(127, 219, 190, 0.24)',
        '--case-hero-blob-a': 'rgba(74, 213, 160, 0.30)',
        '--case-hero-blob-b': 'rgba(9, 108, 70, 0.34)',
        '--case-hero-blob-c': 'rgba(160, 224, 196, 0.22)',
        '--case-hero-blob-glow': 'rgba(198, 240, 220, 0.28)',
      } as React.CSSProperties}>

      <ProjectHeader
        backLink="/work"
        categorySlug="ai"
        backLabel="Back to Work"
        tags={['AI Wearables', 'Head of UI/UX', '0→1 Product', 'Launch Website']}
        title="Mentra"
        subtitle="Designing the OS, companion app, miniapp store, and launch website that turn AI glasses from a hardware demo into a daily platform"
        info={[
          { label: 'Role', value: 'Head of UI/UX (design team of 1, owning product UX, platform surfaces, and website story)' },
          { label: 'Timeline', value: 'Q3 2025 \u2013 Present (ongoing)' },
          { label: 'Team', value: '1 designer (me) + 4 engineers + product lead + hardware team' },
          { label: 'Platform', value: 'Wearable OS, Mobile, Web' },
        ]}
        liveUrl="https://mentraglass.com"
        heroImage="/Portfolio.github.io/Assets/images/mentra/render-camera-detail.webp"
        heroAlt="Mentra Glass, AI-powered smart glasses with camera detail and Mentra logo"
        heroExperience="visual"
        heroTone="mentra"
        heroEyebrow="Mentra / wearable OS"
        visualSummary="The OS, companion app, and miniapp store that turn smart glasses into a daily platform."
        visualHeroImage="/Portfolio.github.io/Assets/images/mentra/render-transparent.webp"
        visualHeroAlt="Transparent render of Mentra Glass floating over a dark interface field"
        liveLabel="Open Mentra"
        showHeaderSummary={false}
      />

        <ProjectQuickSummary
          slug="mentra"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          fullEntryId="cs-context"
        />

        <CsExpandPreview expanded={viewMode === 'full'} onExpand={() => setViewMode('full')}>
        <CsSection id="cs-context" label="Context" title="A Decade of Expensive Failures">
          <CsBody>
            <p>Before designing forward, I studied backward. Smart glasses have a decade-long trail of ambitious launches and quiet discontinuations. The pattern never varies: a hardware company ships something technically impressive, bundles a companion app with three features, and waits for the &ldquo;ecosystem&rdquo; to magically appear. It never does.</p>
            <p>Google Glass had the sensors but no software story. Snap Spectacles had the brand but no utility past fifteen-second clips. North Focals had the elegance but no reason to exist past the first week. Every one treated software as an afterthought and developers as an audience that would show up uninvited.</p>
            <p>The lesson: smart glasses without an ecosystem are an expensive accessory with a charging cable.</p>
          </CsBody>
          <CsPullquote
            quote="Every smart glasses company before us shipped hardware and hoped software would follow. We designed the software ecosystem first and built the hardware to serve it."
            cite="Mentra founding thesis"
          />
        <CsImage src="/Portfolio.github.io/Assets/images/mentra/glasses-angle.png" alt="Mentra Live smart glasses, three-quarter angle showing camera module and Mentra logo on temple" />
        </CsSection>

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
            <p>This is what separates Mentra from everything else. Meta Ray-Ban Gen 2 is a closed system; Mentra is an open marketplace where any developer can ship, and the on-glasses store is voice-navigated and context-curated rather than an icon grid.</p>
            <p><Link to="/mentra-miniapps">The store has its own case study &rarr;</Link></p>
          </CsBody>
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

        <CsSection id="cs-website" label="Live Product" title="mentraglass.com, The Marketing Site I Designed">
          <CsBody>
            <p>The current marketing site mirrors the product philosophy: show, don&rsquo;t tell. It now leads with field-team deployment, custom AI workflows, open-source SDK control, MiniApps, comparison, support, and hardware specs presented with the clarity buyers and developers both expect.</p>
            <p>The key design move was sequencing. Start with the work the product improves, prove the hardware and platform second, then ask for action only after the visitor has enough concrete evidence to trust the claim.</p>
          </CsBody>
          <CsStatGrid
            style={{ margin: '2rem 0' }}
            stats={[
              { label: 'Current price', value: '$349' },
              { label: 'Core audience', value: 'Field teams' },
              { label: 'Platform layer', value: 'SDK + MiniApps' },
              { label: 'Fulfillment', value: '1-3 days' },
            ]}
          />
          <CsImage src="/Portfolio.github.io/Assets/Projects/website-screenshot/screencapture-mentraglass-2026-03-25-13_33_13.webp" alt="Mentra Glass full marketing website, hero section, product features, app store showcase, specifications, and pricing" />
          <div style={{ marginTop: '2rem' }}>
            <CsFeatureGrid
              features={[
                { title: 'Field work comes first', desc: 'The site leads with hands-free capture and AI assistance during real operational work, not futurist hardware language.' },
                { title: 'Developer control is clearer', desc: 'Open-source SDK, custom AI applications, app distribution, and MiniApp support read as platform reasons to choose Mentra.' },
                { title: 'Buying risk is lower', desc: 'Price, shipping window, return policy, warranty, support, and comparison details answer practical questions earlier.' },
                { title: 'The competitive frame is sharper', desc: 'The comparison against closed consumer smart glasses makes Mentra look like a work platform rather than a lifestyle gadget.' },
              ]}
            />
          </div>
          <div style={{ marginTop: '2rem' }}>
            <CsInfoGrid
              items={[
                { key: 'Hero', value: 'Defines the product around field work, custom AI applications, and deployable smart-glasses utility.' },
                { key: 'Product proof', value: 'Shows the glasses, capture flow, app surfaces, and work contexts instead of leaning on abstract claims.' },
                { key: 'Platform layer', value: 'Explains open-source SDK control, MiniApp distribution, and custom workflows as business value.' },
                { key: 'Specs + support', value: 'Answers buyer questions about price, fulfillment, battery, camera, prescription, returns, warranty, and support.' },
              ]}
            />
          </div>
        </CsSection>

        <CsSection id="cs-impact" label="Impact" title="Shipping, Not Pitching">
          <CsBody style={{ marginBottom: '2rem' }}>
            <p>Mentra Live is not a concept deck. It launched at $299 and is currently $349, backed by the founders of YouTube, Android, and Pebble, plus Y Combinator, Amazon, and Toyota Ventures. Press coverage spans Forbes, GamesBeat, Gizmodo, Android Police, and 9to5Google.</p>
          </CsBody>
          <CsStatGrid
            style={{ marginBottom: '2rem' }}
            stats={[
              { label: 'Onboarding (internal testing)', value: '< 60s' },
              { label: 'Launch price', value: '$299' },
              { label: 'Setup Steps Reduced', value: '12 \u2192 4' },
              { label: 'Design Surfaces Shipped', value: '6' },
            ]}
          />
          <CsCallout style={{ marginTop: '2.5rem' }}>
            <p>&ldquo;Backed by the founders of YouTube, Android &amp; Pebble, plus Y&nbsp;Combinator, Amazon &amp; Toyota Ventures.&rdquo;</p>
          </CsCallout>
        </CsSection>

        <CsSection id="cs-learnings" label="Key Learnings" title="What Building for the Face Taught Me">
          <CsFeatureGrid features={[
            { title: 'World-first design is a different discipline', desc: 'On a phone, the screen is the world. On glasses, the world is the screen. Every decision starts with: does this help the user engage with reality, or pull them away?' },
            { title: 'Constraint is the best creative force', desc: 'A peripheral display, 43 grams, voice-first input, no hover states, no scroll, no tap targets. What remains is the essence of the information.' },
            { title: 'Open ecosystems demand opinionated systems', desc: 'The more open the platform, the more disciplined the design language must be. Permissiveness at the app level requires precision at the system level.' },
            { title: 'Trust has to be glanceable too', desc: 'Privacy indicators, recording lights, clear permissions, these are not features. Like the peripheral HUD itself, they only work if everyone in the room can read them in a glance.' },
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
            { role: 'Platforms', name: 'MentraOS, iOS, Android, Web' },
          ]} />
        </CsSection>

        <CsThanks contactCta style={{ marginTop: '4rem' }} />
        </CsExpandPreview>

        <BottomNav
          sections={sections}
          liveUrl="https://mentraglass.com"
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
