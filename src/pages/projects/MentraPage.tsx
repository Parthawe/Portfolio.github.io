import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ReadingProgress from '../../components/case-study/ReadingProgress'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
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
import CsNumList from '../../components/case-study/CsNumList'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function MentraPage() {
  return (
    <>
      <Helmet>
        <title>Mentra · Parth Pawar</title>
        <meta name="description" content="Mentra Glass — Designing the UX for the only AI-powered smart glasses with an app store. Companion app, MentraOS, and MiniApp Store. Case study by Parth Pawar, Head of UI/UX." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mentra · Parth Pawar" />
        <meta property="og:description" content="Designing the UX for the only AI-powered smart glasses with an app store. MentraOS, companion app, and developer platform." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/mentra.png" />
      </Helmet>

      <Nav />
      <ReadingProgress />

      <main id="main-content" className="project-main" style={{ '--project-color': '#1B4D8F' } as React.CSSProperties}>

      <ProjectHeader
        backLink="/work"
        backLabel="Back to Work"
        tags={['AI Wearables', 'Head of UI/UX', '0→1 Product', 'Smart Glasses']}
        title="Mentra"
        subtitle="Designing the UX for the only AI-powered smart glasses with an app store — from companion app to open-source OS to developer marketplace"
        info={[
          { label: 'Role', value: 'Head of UI/UX' },
          { label: 'Timeline', value: '2025–Present' },
          { label: 'Team', value: 'Design lead + cross-functional' },
          { label: 'Platform', value: 'Wearable OS, Mobile, Web' },
        ]}
        liveUrl="https://www.mentra.glass"
        heroImage="/Assets/images/mentra.png"
        heroAlt="Mentra Glass — AI-powered smart glasses with open-source OS"
      />

        <ProjectOverview
          id="cs-vision"
          sections={[
            {
              label: 'The Vision',
              content: 'Smart glasses have been a graveyard of good intentions. Google Glass, Snap Spectacles, North Focals — all shipped impressive hardware and then asked users to figure out why they should wear it. Mentra Glass answers that question with an open-source OS and the first miniapp store for smart glasses — turning a piece of hardware into a platform people put on every morning and never take off.',
            },
            {
              label: 'My Role',
              content: 'As Head of UI/UX, I own every design surface: companion app, MentraOS on-glasses interface, MiniApp Store, developer experience, and the design system binding it all. I work across hardware constraints, AI interaction patterns, and developer tooling — translating an ambitious product vision into interfaces that feel obvious the first time you use them.',
            },
          ]}
        />

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
            cite="— Mentra founding thesis"
          />
        </CsSection>

        <CsSection id="cs-bet" label="The Bet" title="What Android Did for Phones, MentraOS Does for Glasses">
          <CsBody>
            <p>Mentra&rsquo;s thesis is simple and radical: smart glasses need an open-source OS and a developer marketplace to become a daily-wear platform. Not a better camera. Not a lighter frame. An ecosystem.</p>
            <p>MentraOS is that ecosystem — open-source, community-driven, designed from the ground up for face-worn computing. The MiniApp Store gives developers a place to publish, users a place to discover, and the platform a reason to grow beyond what any single company could build alone.</p>
            <p>The bet: the smart glasses that win will not have the best specs on paper. They will have the best app on your face — built by someone you have never met, for a problem only you have, found in a store that runs on your glasses.</p>
          </CsBody>
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
        </CsSection>

        <CsSection id="cs-companion" label="Companion App" title="The Control Center in Your Pocket">
          <CsBody>
            <p>The companion app is not a remote control — it is the bridge between your phone and your face. It handles everything the glasses should not: deep configuration, miniapp management, firmware updates, AI settings.</p>
            <p>Pairing was the first interaction I obsessed over. Bluetooth pairing is traditionally a five-minute frustration. I designed a one-tap flow — scan the QR code on the glasses case, connection established, personalized home screen — all in under thirty seconds.</p>
          </CsBody>
          <CsSteps steps={[
            { num: 1, title: 'Slide On', desc: 'Unfold the temples and the glasses power on. The accelerometer detects the motion and boots MentraOS in under two seconds.' },
            { num: 2, title: 'Download App', desc: 'A card in the display directs you to download the companion app. NFC in the case triggers the download on Android.' },
            { num: 3, title: 'Pair', desc: 'Scan the QR code. One tap to confirm. The phone and glasses handshake over Bluetooth LE and the connection is persistent.' },
            { num: 4, title: '"Hey Mentra"', desc: 'The wake word activates the AI. Directions, translation, song ID, calendar — the first interaction sets the tone.' },
          ]} />
          <CsImage placeholder="Companion app mockup — home screen, device pairing flow, and miniapp management interface" />
          <CsBody style={{ marginTop: '2rem' }}>
            <p>Beyond onboarding, the app is the management layer for the entire ecosystem: browse miniapps, configure per-app notifications, adjust display settings, manage privacy. I built it on a single-tab architecture — everything is two taps away.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-os" label="MentraOS" title="An OS That Disappears Until You Need It">
          <CsBody>
            <p>MentraOS is open-source — a product decision that became the defining design constraint. An open OS means developers will build things I cannot predict, on a display I cannot control, for users I will never meet. The design system had to be opinionated enough to feel cohesive and flexible enough for miniapps that do not exist yet.</p>
            <p>The HUD operates on a principle I call &ldquo;glance, don&rsquo;t gaze.&rdquo; Every piece of information must be understood in under two seconds of peripheral attention.</p>
          </CsBody>
          <CsImage placeholder="MentraOS HUD design — glanceable interface showing ambient notifications, AI waveform, and contextual cards in peripheral vision" />
          <h3 className="cs-section-subtitle">Voice-First, Screen-Second</h3>
          <CsBody>
            <p>Voice is the primary input. The AI handles natural language queries, contextual responses from the camera feed, and proactive suggestions from time and location. Visual feedback is minimal by design: a thin amber waveform that pulses while listening and settles when processing.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Notification Architecture</h3>
          <CsBody>
            <p>On glasses, every notification competes with reality. I designed three tiers: ambient (subtle color shift at the frame edge), informational (translucent one-line card), and urgent (persistent card with haptic pulse requiring voice dismissal). Users assign tiers per app, and MentraOS learns from behavior.</p>
          </CsBody>
          <CsImage placeholder="Notification architecture diagram — three-tier system showing ambient, informational, and urgent notification patterns with visual hierarchy" />
        </CsSection>

        <CsSection id="cs-store" label="MiniApp Store" title="The App Store That Lives on Your Face">
          <CsBody>
            <p>This is what separates Mentra from everything else. Meta Ray-Ban Gen 2 ships at the same $299 price point but is a closed system. Mentra is the opposite: an open marketplace where any developer can ship.</p>
            <p>Designing a store for a HUD meant rethinking every convention. No icon grid. No screenshot carousel. The on-glasses store is voice-navigated and context-curated.</p>
          </CsBody>
          <CsImage placeholder="MiniApp Store interface — voice-navigated store layout with contextual app suggestions, category browsing, and developer submission portal" />
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
            cite="— Early beta tester feedback"
          />
        </CsSection>

        <CsSection id="cs-timeline" label="Design Evolution" title="From Zero to Shipping Product">
          <CsBody>
            <p>Building the UX for an entirely new product category meant evolving the design as our understanding of face-worn computing deepened. Here is how the product and its design language matured.</p>
          </CsBody>
          <CsTimeline items={[
            { date: 'Q1 2025', title: 'Foundation & Research', desc: 'Competitive audit of every smart glasses product since Google Glass. Established core UX principles: glance-not-gaze, voice-first input, and peripheral-priority information hierarchy. Built the initial design system for MentraOS.' },
            { date: 'Q2 2025', title: 'Companion App & Onboarding', desc: 'Designed and iterated the companion app from wireframes to high-fidelity. Reduced the onboarding flow from twelve steps to four. Validated the one-tap QR pairing pattern with hardware prototypes.' },
            { date: 'Q3 2025', title: 'MentraOS HUD & Notification System', desc: 'Developed the three-tier notification architecture. Iterated the HUD layout through Protopie simulations and on-device testing. Established the amber waveform as the AI\'s visual signature.' },
            { date: 'Q4 2025', title: 'MiniApp Store & Developer Platform', desc: 'Shipped the MiniApp Store design with voice-navigated browsing. Built the developer portal, SDK documentation, and submission flow. Designed the review and curation system.' },
            { date: 'Q1 2026', title: 'Launch & Iteration', desc: 'Mentra Glass shipped at $299 with Batch 2 at 88% claimed. Ongoing iteration on the design system based on developer and user feedback. Expanding the notification architecture with AI-driven priority learning.' },
          ]} />
        </CsSection>

        <CsSection id="cs-impact" label="Impact" title="Shipping, Not Pitching">
          <CsBody style={{ marginBottom: '2rem' }}>
            <p>Mentra Live is not a concept deck. It is shipping at $299, backed by the founders of YouTube, Android, and Pebble — plus Y Combinator, Amazon, and Toyota Ventures. Press coverage spans Forbes, GamesBeat, Gizmodo, Android Police, and 9to5Google.</p>
          </CsBody>
          <CsStatGrid
            style={{ marginBottom: '2rem' }}
            stats={[
              { label: 'Onboarding Time', value: '< 60s' },
              { label: 'Batch 2 Claimed', value: '88%' },
              { label: 'Onboarding Steps', value: '12 → 4' },
              { label: 'Design Surfaces', value: '5' },
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
            <p>&ldquo;Backed by the founders of YouTube, Android &amp; Pebble — plus Y&nbsp;Combinator, Amazon &amp; Toyota Ventures.&rdquo;</p>
          </CsCallout>
        </CsSection>

        <CsSection id="cs-reflections" label="Reflections" title="What Building for the Face Taught Me">
          <CsNumList items={[
            <><strong>World-first design is a different discipline.</strong> On a phone, the screen is the world. On glasses, the world is the screen. Every decision starts with: does this help the user engage with reality, or pull them away?</>,
            <><strong>Constraint is the best creative force.</strong> A peripheral display, 43 grams, voice-first input — no hover states, no scroll, no tap targets. What remains is the essence of the information.</>,
            <><strong>Open ecosystems demand opinionated design systems.</strong> The more open the platform, the more disciplined the design language must be.</>,
            <><strong>Trust is a design material.</strong> Privacy indicators, recording lights, clear permissions — these are not features. They are the foundation that makes every other feature possible.</>,
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

        <BottomNav sections={[
          { id: 'cs-vision', label: 'Vision & Role' },
          { id: 'cs-context', label: 'Context' },
          { id: 'cs-bet', label: 'The Bet' },
          { id: 'cs-challenges', label: 'Challenges' },
          { id: 'cs-companion', label: 'Companion App' },
          { id: 'cs-os', label: 'MentraOS' },
          { id: 'cs-store', label: 'MiniApp Store' },
          { id: 'cs-timeline', label: 'Timeline' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} liveUrl="https://www.mentra.glass" />

      </main>

      <NextProject slug="executivelens" title="ExecutiveLens" image="/Assets/images/executivelens.png" />
      <Footer />
    </>
  )
}
