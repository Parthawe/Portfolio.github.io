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
import CsSteps from '../../components/case-study/CsSteps'
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
        { id: 'cs-summary', label: 'Quick read' },
      ]
    : [
        { id: 'cs-summary', label: 'Quick read' },
        { id: 'cs-context', label: 'Problem' },
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
          title="Why Mentra had to become a system"
          proofLimit={0}
        />

        <CsExpandPreview
          expanded={viewMode === 'full'}
          onExpand={() => setViewMode('full')}
          cta="Reveal the Mentra product story"
          note="Continue into the research, tested decisions, launch work, and shipped evidence."
          preview={(
            <article className="cs-expand-preview-article-copy cs-expand-preview-article-copy--auto cs-mentra-preview-copy">
              <h2>A wearable becomes useful when every surface agrees.</h2>
              <p>Mentra connected glasses, a phone app, MiniApps, permissions, and recovery. The problem was not adding more UI. It was giving every surface one legible operating model.</p>
            </article>
          )}
        >
        <CsSection id="cs-context" title="Problem">
          <p className="cs-mentra-problem-copy">
            After unboxing, people spent 9 minutes 40 seconds reaching first value. Even those who completed setup could not tell what was running, which sensors were active, or how to regain control. The hardware worked; the product system did not yet make confidence last.
          </p>
        </CsSection>

        <CsSection id="cs-bet" title="Reduce decisions, then make every state legible">
          <CsBody>
            <p>Research narrowed the work to two hypotheses. If people reached one useful interaction with fewer steps, more would complete onboarding and return. If every tap produced immediate, clear feedback, they would move with more confidence.</p>
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

        <CsSection id="cs-companion" title="Prove value before setup fatigue wins">
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

        <CsSection id="cs-os" title="Put state and control in one predictable place">
          <CsBody>
            <p>A visual cleanup improved first-week retention, but feedback showed that people still could not tell what was running. The issue was the operating model, not the polish.</p>
            <p>I prototyped ten directions and tested three: a persistent dock, a card switcher, and a bottom drawer. The drawer balanced recognition with low distraction and gave active and background MiniApps one home.</p>
          </CsBody>
          <div className="cs-mentra-media-row cs-mentra-media-row--phones">
            <CsImage src="/Assets/images/mentra/os-home.png" alt="MentraOS home screen, glasses status widget, app grid with Flash, Notes, Streamer, Camera, and running apps indicator" />
            <CsImage src="/Assets/images/mentra/os-all-apps.png" alt="MentraOS all apps drawer, searchable app grid with Gallery, Appstore, Settings, Recorder, and Mentra AI" />
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
          <div className="cs-mentra-media-row cs-mentra-media-row--phones">
            <CsImage src="/Assets/images/mentra/os-notes.png" alt="Mentra Notes app, note editor with formatting toolbar, AI summarization button, and quick actions" />
            <CsImage src="/Assets/images/mentra/os-running-apps.png" alt="MentraOS running apps view, multitasking interface showing stacked app cards with Teleprompter active" />
          </div>
        </CsSection>

        <CsSection id="cs-store" title="Make the device worth returning to, and worth building for">
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
            <CsImage src="/Assets/Projects/mentra-miniapps/figma/meet-home.png" alt="Mentra MiniApp interface for a live meeting assistant" />
          </div>
        </CsSection>

        <CsSection id="cs-website" title="Sell the platform, not the gadget">
          <div className="cs-mentra-web-block">
            <figure>
              <img src="/Assets/images/mentra/site-crops/mentra-site-platform.png" alt="Mentra website sections showing integrations and field capture workflows" loading="lazy" decoding="async" />
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

        <CsSection id="cs-impact" title="What difference did we make?">
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
          <p className="cs-mentra-impact-note">The meaningful shift was not one isolated screen. A shared operating model improved activation, made state and recovery easier to understand, and carried the same language across the companion app, MentraOS, MiniApps, developer story, and launch website.</p>
        </CsSection>

        <CsSection id="cs-learnings" title="What building for the face changed">
          <CsFeatureGrid features={[
            { title: 'Activation is not education', desc: 'First use should prove one useful moment. Deeper learning can remain available without blocking it.' },
            { title: 'Polish cannot repair a weak model', desc: 'The first visual cleanup helped, but runtime confidence improved only after state and control moved together.' },
            { title: 'Low attention still needs strong feedback', desc: 'A quiet interface works only when status, permission, and recovery are unambiguous.' },
            { title: 'Platforms need shared verbs', desc: 'Start, switch, stop, and recover had to mean the same thing across the app, glasses, and MiniApps.' },
          ]} />
        </CsSection>

        <CsSection id="cs-whats-next" title="The system is shipping. The learning continues.">
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
