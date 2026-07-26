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
        { id: 'cs-impact', label: 'Impact' },
        { id: 'cs-learnings', label: 'Learnings' },
        { id: 'cs-whats-next', label: "What's Next" },
        { id: 'cs-website', label: 'Live Site' },
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
        <meta name="description" content="Mentra Glass, designing the OS, companion app, MiniApp Store, and launch website for AI smart glasses. Case study by Parth Pawar, Head of UI/UX." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mentra · Parth Pawar" />
        <meta property="og:description" content="Designing the OS, companion app, MiniApp Store, developer platform, and launch website for Mentra smart glasses." />
        <meta property="og:image" content="https://designwhich.works/Assets/images/mentra.webp" />
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
        subtitle="Designing the OS, companion app, MiniApp Store, and launch site for AI smart glasses"
        info={[
          { label: 'Role', value: 'Head of UI/UX, design team of 1' },
          { label: 'Timeline', value: 'Q3 2025 \u2013 Present (ongoing)' },
          { label: 'Team', value: '1 designer (me) + 4 engineers + product lead + hardware team' },
          { label: 'Platform', value: 'Wearable OS, Mobile, Web' },
        ]}
        liveUrl="https://mentraglass.com"
        heroImage="/Assets/images/mentra/render-camera-detail.webp"
        heroAlt="Mentra Glass, AI smart glasses with camera detail and Mentra logo"
        heroExperience="visual"
        heroTone="mentra"
        heroEyebrow="Mentra / wearable OS"
        visualSummary="The product system that makes AI glasses usable after unboxing."
        visualHeroImage="/Assets/mockups/projects/mentra_16x9.webp"
        visualHeroAlt="Mentra generated cover showing the AI glasses product system and companion app"
        liveLabel="Open Mentra"
      />

        <ProjectQuickSummary
          slug="mentra"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />

        <CsExpandPreview expanded={viewMode === 'full'} onExpand={() => setViewMode('full')}>
        <CsSection id="cs-context" label="Context" title="The Problem Was Software, Not Glass">
          <CsBody>
            <p>Most smart glasses proved the hardware could work. Few proved why people should keep wearing them.</p>
            <p>I mapped the failure pattern across Google Glass, Spectacles, and Focals: weak setup, unclear daily utility, no developer loop, and privacy trust handled too late.</p>
            <p>Mentra needed to feel like a platform on day one, not a gadget waiting for software.</p>
          </CsBody>
          <CsPullquote
            quote="The product had to answer one question fast: what can these glasses do for me today?"
            cite="Mentra founding thesis"
          />
        <CsImage src="/Assets/images/mentra/glasses-angle.png" alt="Mentra Live smart glasses, three-quarter angle showing camera module and Mentra logo on temple" />
        </CsSection>

        <CsSection id="cs-bet" label="The Bet" title="Make the Glasses Feel Like a Platform">
          <CsBody>
            <p>Mentra&rsquo;s bet: open OS, real apps, simple setup, and a website that makes the platform easy to trust.</p>
            <p>I designed across the whole surface: companion app, on-glasses patterns, MiniApp Store, developer story, launch site, and privacy cues.</p>
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

        <CsSection id="cs-challenges" label="Design Challenges" title="The Design Constraints">
          <CsBody>
            <p>Glasses are not a smaller phone. The user is moving, looking elsewhere, and sharing space with other people.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Peripheral Display', desc: 'UI must be understood in a glance, without asking the user to stare.' },
            { title: 'Zero-Patience Setup', desc: 'I reduced onboarding from 12 steps to 4, aiming for first interaction in under a minute.' },
            { title: 'Developer Gravity', desc: 'The store, docs, and submission flow had to make glasses feel worth building for.' },
            { title: 'Visible Trust', desc: 'Camera, permissions, and privacy states needed to be legible to the wearer and the room.' },
          ]} />
        </CsSection>

        <CsSection id="cs-companion" label="Companion App" title="Setup Without the Usual Bluetooth Pain">
          <CsBody>
            <p>The companion app handles what the glasses should not: pairing, settings, firmware, MiniApps, AI preferences, and privacy controls.</p>
            <p>I focused the first-run flow on one job: scan, pair, wear, speak.</p>
          </CsBody>
          <CsSteps steps={[
            { num: 1, title: 'Wear', desc: 'Open the temples and the device wakes.' },
            { num: 2, title: 'Scan', desc: 'Use the QR code on the case to start pairing.' },
            { num: 3, title: 'Confirm', desc: 'One tap connects phone and glasses.' },
            { num: 4, title: 'Ask', desc: 'The first voice interaction proves the value.' },
          ]} />
          <div className="cs-mentra-media-row cs-mentra-media-row--phones">
            <CsImage src="/Assets/images/mentra/appstore-hero.webp" alt="MentraOS companion app, home screen with glasses status, background apps, and active captions" />
            <CsImage src="/Assets/images/mentra/appstore-device.png" alt="Companion app device settings, Even Realities G1 connection, brightness controls, battery status" />
          </div>
          <CsBody style={{ marginTop: '2rem' }}>
            <p>After setup, the app becomes the control layer: MiniApps, display, notifications, AI settings, and privacy in two taps.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-os" label="MentraOS" title="Glance, Don&rsquo;t Gaze">
          <CsBody>
            <p>MentraOS had to support apps I could not predict, on a display people should barely look at.</p>
            <p>The design principle became simple: every state must be understood in under two seconds of peripheral attention.</p>
          </CsBody>
          <div className="cs-mentra-media-row cs-mentra-media-row--phones">
            <CsImage src="/Assets/images/mentra/os-home.png" alt="MentraOS home screen, glasses status widget, app grid with Flash, Notes, Streamer, Camera, and running apps indicator" />
            <CsImage src="/Assets/images/mentra/os-all-apps.png" alt="MentraOS all apps drawer, searchable app grid with Gallery, Appstore, Settings, Recorder, and Mentra AI" />
          </div>
          <h3 className="cs-section-subtitle">Voice-First, Screen-Second</h3>
          <CsBody>
            <p>Voice carries the intent. The display only confirms state, progress, and response. That kept the HUD quiet.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Notification Architecture</h3>
          <CsBody>
            <p>Every notification competes with the real world. I designed three tiers so apps could signal without hijacking attention.</p>
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
          <div className="cs-mentra-media-row cs-mentra-media-row--phones">
            <CsImage src="/Assets/images/mentra/os-notes.png" alt="Mentra Notes app, note editor with formatting toolbar, AI summarization button, and quick actions" />
            <CsImage src="/Assets/images/mentra/os-running-apps.png" alt="MentraOS running apps view, multitasking interface showing stacked app cards with Teleprompter active" />
          </div>
        </CsSection>

        <CsSection id="cs-store" label="MiniApp Store" title="Apps Without Phone-Style Browsing">
          <CsBody>
            <p>The MiniApp Store makes Mentra an ecosystem, not a closed device.</p>
            <p>Discovery is voice-led and intent-led because nobody wants to browse a tiny app grid in their peripheral vision.</p>
            <p><Link to="/mentra-miniapps">The store has its own case study &rarr;</Link></p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-timeline" label="Design Evolution" title="From Blank Category to Shipping System">
          <CsBody>
            <p>The design moved from category research to shipped surfaces across hardware, app, OS, store, and web.</p>
          </CsBody>
          <CsTimeline items={[
            { date: 'Q3 2025', title: 'Research + System Principles', desc: 'Audited the category and set the core rules: glance-not-gaze, voice-first, peripheral-priority.' },
            { date: 'Q3\u2013Q4 2025', title: 'Companion App + Onboarding', desc: 'Designed the app and reduced setup from 12 steps to 4.' },
            { date: 'Q4 2025', title: 'OS Patterns', desc: 'Designed HUD states, notification tiers, and the AI listening signature.' },
            { date: 'Q4 2025\u2013Q1 2026', title: 'MiniApp Store + Developer Flow', desc: 'Designed discovery, permissions, store listings, and submission surfaces.' },
            { date: 'Q1 2026', title: 'Launch + Iteration', desc: 'Shipped launch surfaces and kept iterating from user and developer feedback.' },
          ]} />
        </CsSection>

        <CsSection id="cs-impact" label="Impact" title="Shipping, Not Pitching">
          <CsBody style={{ marginBottom: '2rem' }}>
            <p>Mentra is live, priced, backed, covered, and shipping. My work turned the product from hardware promise into a usable platform story.</p>
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
            { title: 'Reality is the canvas', desc: 'On glasses, design should support the world, not replace it.' },
            { title: 'Less UI is more trust', desc: 'The best state is often a small confirmation, not another screen.' },
            { title: 'Open systems need rules', desc: 'A developer ecosystem only works when the system language stays disciplined.' },
            { title: 'Privacy must be visible', desc: 'Trust cues have to work for the wearer and everyone nearby.' },
          ]} />
        </CsSection>

        <CsSection id="cs-whats-next" label="What&rsquo;s Next" title="Roadmap">
          <CsBody>
            <p>Next is depth: smarter notifications, stronger developer onboarding, and accessibility patterns that make the glasses useful in real life.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Notification Intelligence', desc: 'Use behavior to tune interruption levels without hiding control.' },
            { num: '2', title: 'Developer Onboarding', desc: 'Make submission, review, and store listings easier for first external builders.' },
            { num: '3', title: 'Accessibility Foundations', desc: 'Design captioning and audio-description patterns ahead of hardware support.' },
          ]} />
        </CsSection>

        <CsSection id="cs-website" label="Live Product" title="The Website Had to Sell the Platform">
          <div className="cs-mentra-web-block">
            <figure>
              <img src="/Assets/images/mentra/site-crops/mentra-site-platform.png" alt="Mentra website sections showing integrations and field capture workflows" loading="lazy" decoding="async" />
              <figcaption>Live site flow: field use, integrations, and product proof.</figcaption>
            </figure>
            <div className="cs-mentra-web-copy">
              <CsBody>
                <p>The site had to move Mentra out of &ldquo;cool gadget&rdquo; territory and into a work platform with clear use cases, specs, and developer surfaces.</p>
                <p>I sequenced the story around field use, custom AI workflows, open-source SDK control, MiniApps, specs, support, and buying confidence.</p>
              </CsBody>
              <div className="cs-mentra-web-facts" aria-label="Mentra website product story">
                <span><strong>Buying path</strong> Specs + checkout</span>
                <span><strong>Core audience</strong> Field teams</span>
                <span><strong>Platform layer</strong> SDK + MiniApps</span>
                <span><strong>Fulfillment</strong> 1-3 days</span>
              </div>
              <CsFeatureGrid
                features={[
                  { title: 'Field work first', desc: 'Led with hands-free capture and AI help during real operations.' },
                  { title: 'Platform proof', desc: 'Explained SDK, custom apps, MiniApps, and distribution as reasons to choose Mentra.' },
                  { title: 'Lower buying risk', desc: 'Moved price, shipping, returns, warranty, specs, and support into the decision path.' },
                  { title: 'Sharper positioning', desc: 'Framed Mentra against closed consumer glasses as an open work platform.' },
                ]}
              />
            </div>
          </div>
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

      <NextProject slug="transfi-project" title="TransFi" image="/Assets/mockups/projects/transfi-project_16x9.webp" />
      <Footer />
    </>
  )
}
