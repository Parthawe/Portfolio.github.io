import { projectImageProps } from '../../utils/projectImage'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsImage from '../../components/case-study/CsImage'
import CsCredits from '../../components/case-study/CsCredits'
import CsFlowDiagram from '../../components/case-study/CsFlowDiagram'
import CsCompareTable from '../../components/case-study/CsCompareTable'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import '../../styles/mentra-deck.css'

export default function MentraPage() {
  const location = useLocation()
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('summary')
  const sections = viewMode === 'summary'
    ? [
        { id: 'cs-summary', label: 'Quick read' },
      ]
    : [
        { id: 'cs-summary', label: 'Quick read' },
        { id: 'cs-context', label: 'Challenge' },
        { id: 'cs-bet', label: 'Hypotheses' },
        { id: 'cs-companion', label: 'First use' },
        { id: 'cs-os', label: 'Runtime' },
        { id: 'cs-store', label: 'Ecosystem' },
        { id: 'cs-website', label: 'Launch' },
        { id: 'cs-impact', label: 'Evidence' },
        { id: 'cs-learnings', label: 'Reflection' },
        { id: 'cs-whats-next', label: 'Next' },
      ]

  const handleViewModeChange = (nextMode: 'summary' | 'full') => {
    if (nextMode === viewMode) return
    setViewMode(nextMode)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const targetId = location.hash.replace('#', '')
    if (!targetId) return

    if (targetId !== 'cs-summary' && targetId !== 'project-overview') {
      setViewMode('full')
    }

    return settleAnchor(targetId)
  }, [location.hash])

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
        backLabel="Back to work"
        tags={['AI wearables', 'Head of UI/UX', '0→1 product', 'Launch website']}
        title="Mentra"
        subtitle="Designing the OS, companion app, MiniApp Store, and launch site for AI smart glasses"
        info={[
          { label: 'Role', value: 'Head of UI/UX, design team of 1' },
          { label: 'Timeline', value: 'Q3 2025 \u2013 Present (ongoing)' },
          { label: 'Team', value: '1 designer (me) + 4 engineers + product lead + hardware team' },
          { label: 'Platform', value: 'Wearable OS, mobile, web' },
        ]}
        liveUrl="https://mentraglass.com"
        heroImage="/Assets/images/mentra/render-camera-detail.webp"
        heroAlt="Mentra Glass, AI smart glasses with camera detail and Mentra logo"
        heroExperience="visual"
        heroTone="mentra"
        visualSummary="The product system that makes AI glasses usable after unboxing."
        visualHeroImage="/Assets/mockups/projects/mentra_16x9.webp"
        visualHeroAlt="Mentra generated cover showing the AI glasses product system and companion app"
        liveLabel="Open Mentra"
        showHeaderSummary={false}
      />

        <ProjectQuickSummary
          slug="mentra"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          variant="open"
          label=""
          title="Project overview"
          proofLimit={0}
        />

        <CsExpandPreview
          expanded={viewMode === 'full'}
          onExpand={() => setViewMode('full')}
          cta="Read the full case study"
          previewImage="/Assets/mockups/projects/mentra_16x9.webp"
        >
        <CsSection id="cs-context" title="Make first use and everyday control clear">
          <p className="cs-mentra-problem-copy">
            The design challenge was to shorten setup and make active apps, sensor access, and recovery understandable across the glasses and companion app.
          </p>
        </CsSection>

        <CsSection id="cs-bet" title="Reduce decisions, then make every state legible">
          <CsBody>
            <p>Research pointed to two priorities: reach a useful interaction sooner, and give clear feedback for every action.</p>
          </CsBody>
          <div className="cs-mentra-hypothesis">
            <span>01 / Activation</span>
            <p>Get people to one useful moment before setup fatigue wins.</p>
            <span>02 / Runtime</span>
            <p>Make active apps, sensor access, stopping, and recovery visible in one place.</p>
          </div>
          <CsFlowDiagram
            title="One operating model, four surfaces"
            nodes={[
              { label: 'Companion app', desc: 'Setup, status, permissions, recovery' },
              { label: 'MentraOS', desc: 'Low-attention feedback on the glasses', accent: true },
              { label: 'MiniApps', desc: 'Discover, start, switch, and stop' },
              { label: 'Launch site', desc: 'Explain the platform before purchase' },
            ]}
          />
        </CsSection>

        <CsSection id="cs-companion" title="First use: pair, confirm, and try">
          <CsBody>
            <p>I mapped every path, state, and recovery step, then separated activation from education. The first-run flow kept only what a person needed to pair the glasses and complete one useful interaction.</p>
            <p>Progress stayed visible. Pairing always showed status and success. Optional help moved into a manual so learning could continue without blocking activation.</p>
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
          <CsBody className="cs-body--space-before">
            <p>The revised flow reduced activation friction and made pairing status easier to understand. The measured outcomes appear together in the Evidence chapter so the study context stays attached to the numbers.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-os" title="Runtime: status and control together">
          <CsBody>
            <p>A visual cleanup improved first-week retention, but feedback showed that people still could not tell what was running. The issue was the operating model, not the polish.</p>
            <p>I prototyped ten directions and tested three: a persistent dock, a card switcher, and a bottom drawer. The drawer balanced recognition with low distraction and gave active and background MiniApps one home.</p>
          </CsBody>
          <div className="cs-mentra-media-row mentra-deck-comparison">
            <CsImage src="/Assets/images/mentra/deck/home-before.png" aspectRatio="313 / 712" alt="Earlier AugmentOS home screen with a large device panel and separate active and inactive app lists" caption="Before: device setup and separate app lists dominate the home screen." />
            <CsImage src="/Assets/images/mentra/deck/home-after.png" aspectRatio="342 / 725" alt="Redesigned Mentra home screen with a compact device panel, MiniApp grid, and bottom runtime control" caption="Redesigned: compact device status, a clear app grid, and runtime control at the bottom." />
          </div>
          <h3 className="cs-section-subtitle">Three of the ten explorations</h3>
          <div className="cs-mentra-media-row mentra-deck-explorations" role="region" aria-label="Runtime design explorations" tabIndex={0}>
            <CsImage src="/Assets/images/mentra/deck/active-strip.png" aspectRatio="394 / 852" alt="Early prototype with running MiniApps in a persistent horizontal strip" caption="Active app strip" />
            <CsImage src="/Assets/images/mentra/deck/bottom-drawer.png" aspectRatio="394 / 852" alt="Early bottom-drawer direction showing the MiniApp launcher in its closed state" caption="Bottom drawer, closed state" />
            <CsImage src="/Assets/images/mentra/deck/status-cards.png" aspectRatio="394 / 852" alt="Early status-card direction showing three active apps and a camera recording card" caption="App status cards" />
          </div>
          <h3 className="cs-section-subtitle">Visible when needed, quiet when not</h3>
          <CsBody>
            <p>Starting, switching, stopping, and recovery used the same surface. App state and sensor access stayed close to the action, so people no longer had to remember where control lived.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Notification architecture</h3>
          <CsBody>
            <p>Every notification competes with the real world. I designed three tiers so apps could signal without hijacking attention.</p>
          </CsBody>
          <CsCompareTable
            title="Notification tiers"
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

        </CsSection>

        <CsSection id="cs-store" title="MiniApps: discover, start, switch, and stop">
          <CsBody>
            <p>Once first use and runtime control had a clear model, the same rules could extend to the ecosystem. MiniApps needed transparent permissions, predictable states, and discovery organized around intent rather than a tiny phone-style grid.</p>
            <p><Link to="/mentra-miniapps">The store has its own case study &rarr;</Link></p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Intent-led discovery', desc: 'Start from what the wearer wants to do: captions, translation, notes, capture, or live assistance.' },
            { title: 'Permission clarity', desc: 'Show sensor access before launch and keep it visible while an app is running.' },
            { title: 'Shared runtime rules', desc: 'Every MiniApp inherits the same start, switch, stop, and recovery model.' },
            { title: 'Developer confidence', desc: 'SDK, submission, listing, and launch surfaces explain how a new app fits the system.' },
          ]} />
          <div className="cs-mentra-media-row cs-mentra-media-row--phones">
            <CsImage src="/Assets/images/mentra/appstore-translation.webp" alt="Mentra Live Translation MiniApp listing and configuration flow" />
            <CsImage src="/Assets/images/mentra/deck/miniapps-handheld.png" aspectRatio="808 / 1045" alt="Handheld Mentra companion app showing the MiniApp family and a bottom indicator for three running apps" caption="The MiniApp family shares one launcher and a visible running-app count." />
          </div>
        </CsSection>

        <CsSection id="cs-website" title="Launch: explain the platform">
          <div className="cs-mentra-web-block">
            <figure>
              <img {...projectImageProps("/Assets/images/mentra/site-crops/mentra-site-platform.png")} data-project-preview src="/Assets/images/mentra/site-crops/mentra-site-platform.png" alt="Mentra website sections showing integrations and field capture workflows" loading="lazy" decoding="async" />
              <figcaption>Live site flow: field use, integrations, and product proof.</figcaption>
            </figure>
            <div className="cs-mentra-web-copy">
              <CsBody>
                <p>The site had to explain a new product category before asking someone to buy. I sequenced the story from field use to integrations, SDK control, MiniApps, specifications, support, and checkout.</p>
                <p>That made the website another surface in the operating model: the product promise, permissions, ecosystem, and buying details all used the same language as the app.</p>
              </CsBody>
              <div className="cs-mentra-web-facts" aria-label="Mentra website product story">
                <span><strong>Buying path</strong> Specs + checkout</span>
                <span><strong>Core audience</strong> Field teams</span>
                <span><strong>Platform layer</strong> SDK + MiniApps</span>
                <span><strong>Fulfillment</strong> 1–3 days</span>
              </div>
              <CsFeatureGrid features={[
                { title: 'Lead with work', desc: 'Showed hands-free capture and AI help in real operations before technical detail.' },
                { title: 'Prove the platform', desc: 'Connected SDK, custom apps, MiniApps, and distribution into one product story.' },
                { title: 'Lower buying risk', desc: 'Placed price, shipping, returns, warranty, specifications, and support in the decision path.' },
                { title: 'Keep language consistent', desc: 'Matched the states and concepts people would meet again after unboxing.' },
              ]} />
            </div>
          </div>
        </CsSection>

        <CsSection id="cs-impact" title="Results from product testing">
          <p className="cs-mentra-evidence-context">Directional results from separate product-testing rounds on an evolving product. Each comparison uses the same task definition within its own round; sample sizes and study dates are not included in this public case study.</p>
          <div className="cs-mentra-impact-grid" aria-label="Mentra product testing outcomes">
            <article>
              <p>Reduced time to first value by</p>
              <strong>4m 30s</strong>
              <span>from 9:40 to 5:10.</span>
            </article>
            <article>
              <p>Increased pairing completion by</p>
              <strong>23 pts</strong>
              <span>from 61% to 84%.</span>
            </article>
            <article>
              <p>Increased seven-day return by</p>
              <strong>19 pts</strong>
              <span>from 22% to 41%.</span>
            </article>
          </div>
          <p className="cs-mentra-impact-note">The shared operating model connected activation, status, and recovery across the companion app, MentraOS, MiniApps, and launch website.</p>
        </CsSection>

        <CsSection id="cs-learnings" title="What I learned">
          <CsFeatureGrid features={[
            { title: 'Activation is not education', desc: 'First use should prove one useful moment. Deeper learning can remain available without blocking it.' },
            { title: 'Polish cannot repair a weak model', desc: 'The first visual cleanup helped, but runtime confidence improved only after state and control moved together.' },
            { title: 'Low attention still needs strong feedback', desc: 'A quiet interface works only when status, permission, and recovery are unambiguous.' },
            { title: 'Platforms need shared verbs', desc: 'Start, switch, stop, and recover had to mean the same thing across the app, glasses, and MiniApps.' },
          ]} />
        </CsSection>

        <CsSection id="cs-whats-next" title="Next steps">
          <CsBody>
            <p>The next work is to test the model at larger scale: tune notification intelligence, make the first external-developer experience clearer, and build accessibility patterns before the hardware surface expands.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Notification intelligence', desc: 'Use behavior to tune interruption levels without hiding control.' },
            { num: '2', title: 'Developer onboarding', desc: 'Make submission, review, and store listings easier for first external builders.' },
            { num: '3', title: 'Accessibility foundations', desc: 'Design captioning and audio-description patterns ahead of hardware support.' },
          ]} />
        </CsSection>

        <CsSection title="Team">
          <CsCredits credits={[
            { role: 'Head of UI/UX', name: 'Parth Pawar' },
            { role: 'Company', name: 'Mentra Glass' },
            { role: 'Platforms', name: 'MentraOS, iOS, Android, web' },
          ]} />
        </CsSection>

        <CsThanks contactCta className="cs-thanks--separated" />
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
import { settleAnchor } from '../../utils/settleAnchor'
