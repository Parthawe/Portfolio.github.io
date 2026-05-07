import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsTimeline from '../../components/case-study/CsTimeline'
import CsSteps from '../../components/case-study/CsSteps'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCallout from '../../components/case-study/CsCallout'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsNumList from '../../components/case-study/CsNumList'
import CsCompareTable from '../../components/case-study/CsCompareTable'
import CsBeforeAfter from '../../components/case-study/CsBeforeAfter'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import { getNdaStorageKey } from '../../data/projects'

export default function TransfiPage() {
  const ndaStorageKey = getNdaStorageKey('transfi-project')
  const [viewMode, setViewMode] = useState<'summary' | 'full'>(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(ndaStorageKey) === '1') {
      return 'full'
    }
    return 'summary'
  })
  const fullCaseStudyEnabled = true
  const sections = viewMode === 'summary'
    ? [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'cs-overview', label: 'Overview' },
      ]
    : [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'cs-overview', label: 'Overview' },
        { id: 'cs-problem', label: 'Problem' },
        { id: 'cs-research', label: 'Research' },
        { id: 'cs-timeline', label: 'Timeline' },
        { id: 'cs-process', label: 'Process' },
        { id: 'cs-product', label: 'Product' },
        { id: 'cs-screens', label: 'Screens' },
        { id: 'cs-gtm', label: 'Go-To-Market' },
        { id: 'cs-results', label: 'Results' },
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
        <title>TransFi &middot; Parth Pawar</title>
        <meta name="description" content="TransFi, Lead Product Designer case study. Designed crypto payment infrastructure serving $50M+ monthly volume across 6 Asian markets, reducing enterprise onboarding from 2 weeks to 3 days." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="TransFi · Parth Pawar" />
        <meta property="og:description" content="Designed crypto payment infrastructure serving $50M+ monthly volume across 6 Asian markets." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/transfi.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#232D95' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="fintech"
          backLabel="Back to Work"
          tags={['Fintech', 'UX', 'Web3', 'Brand']}
          title="TransFi"
          subtitle="Turned complex crypto payment rails into a merchant product teams could onboard, trust, and run across web and mobile."
          info={[
            { label: 'Company', value: 'TransFi' },
            { label: 'Scope', value: 'Product Design, Brand Identity, Design Systems' },
            { label: 'Role', value: 'Lead Product Designer' },
            { label: 'Duration', value: '2022\u201323' },
            { label: 'Location', value: 'Bangalore, India' },
          ]}
          liveUrl="https://www.transfi.com"
          heroImage="/Portfolio.github.io/Assets/Projects/Transfi/photos/dashboard-hero.png"
          heroAlt="TransFi hero, dashboard and buy crypto widget"
          showHeaderSummary={false}
        />

        <ProjectQuickSummary
          slug="transfi-project"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          fullCaseStudyEnabled={fullCaseStudyEnabled}
        />

        {/* Overview section with label-row layout */}
        <section className="cs-section reveal" id="cs-overview">
          <div className="wrap">
            <h2 className="cs-display" style={{ maxWidth: '18ch' }}>Enterprise crypto had the rails. It did not yet have a product operators could trust.</h2>

            <div className="cs-label-row">
              <span className="cs-label-row-key">Summary</span>
              <span className="cs-label-row-val">TransFi sells the infrastructure layer for on-ramp, off-ramp, and cross-border crypto payments. My job was to turn that technically powerful but opaque system into a product merchants could actually understand: a clearer dashboard, a cleaner buy-crypto widget, and a design language that made compliance-heavy flows feel legible instead of risky.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">The Challenge</span>
              <span className="cs-label-row-val">The product was competing in a category where the underlying rails matter less than trust. Enterprise teams needed to evaluate fees, status, and settlement logic quickly, but the existing experience assumed blockchain literacy and buried the business story under technical noise. That slowed onboarding, reduced self-service, and made the product feel riskier than it needed to be.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">My Role</span>
              <span className="cs-label-row-val">I was the sole product designer on a team of eight, working directly with the founder, product lead, and engineers. I owned research synthesis, information architecture, merchant flows, UI, and the component system, while partnering closely on product strategy and sprint priorities.</span>
            </div>
            <div className="cs-label-row" style={{ borderBottom: 'none' }}>
              <span className="cs-label-row-key">Visible Outcome</span>
              <span className="cs-label-row-val">The public layer of this case study shows the product framing, the business problem, and the design direction behind the dashboard and widget redesign. The NDA section goes deeper into research inputs, internal constraints, and the detailed flows that shipped.</span>
            </div>
          </div>
        </section>

        <NdaGate
          slug="transfi-project"
          onUnlock={() => {
            setViewMode('full')
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          {viewMode === 'full' ? (
            <>

        {/* Problem section */}
        <section className="cs-section reveal" id="cs-problem" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="cs-section-label">Problem</span>
            <h2 className="cs-display">Web3 Is Failing To Serve The Broader Asian Market.</h2>

            <div className="cs-quote-grid">
              <div className="cs-quote-card">
                <p>You are solving a big problem. And Asia is very attractive for us</p>
                <p style={{ fontStyle: 'italic', opacity: 0.6, fontSize: '0.85rem' }}>We like local payment methods</p>
                <cite>&mdash; Top 5 DeFi player</cite>
              </div>
              <div className="cs-quote-card">
                <p>For crypto transactions, the acceptance rates are very low unless the companies have a local presence or focus</p>
                <cite>&mdash; Leading wallet player</cite>
              </div>
              <div className="cs-quote-card">
                <p>Our main challenges are in Philippines, Thailand, India, China and UAE</p>
                <cite>&mdash; Leading hardware wallet</cite>
              </div>
            </div>

            <CsInfoGrid items={[
              { key: 'Limited Local Payments', value: 'Popular local payment methods are not covered by many platforms (e.g. GoPay, PayPay, Gcash, DuitNow etc.).' },
              { key: 'Low Conversion Rates', value: "Global providers don't support local ID cards and fraud models which results in increased rejected transactions." },
              { key: 'Poor User Experience', value: 'Current crypto products require technical knowledge and dissuade non-crypto natives from onboarding.' },
            ]} />

            <CsCallout style={{ marginTop: '2.5rem' }}>
              <p>Only early crypto adopters &amp; natives, especially those with access to credit cards offered by US providers, have easy access to Web3. Failed KYC, local currencies not supported, long transaction times, unavailable payment methods, and no local language support all block the broader market.</p>
            </CsCallout>
          </div>
        </section>

        <CsSection id="cs-research" label="Research" title="Understanding The Landscape">
          <CsBody>
            <p>Before designing, I conducted a competitive audit of crypto payment platforms and interviewed enterprise clients to identify friction points in existing solutions.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">Competitive Analysis</h3>
          <CsInfoGrid items={[
            { key: 'MoonPay', value: 'Strong brand and coverage in Western markets, but limited Asian payment methods. Onboarding flow optimized for individual consumers, not enterprise integration.' },
            { key: 'Ramp', value: 'Developer-friendly APIs with good documentation, but the merchant dashboard lacked actionable analytics. No localization for Asian markets.' },
            { key: 'Transak', value: 'Widest fiat currency support, but the widget UX felt dated and the onboarding process for merchants took 2+ weeks with manual KYB steps.' },
          ]} />
          <CsCompareTable
            title="Competitive Feature Matrix"
            columns={['MoonPay', 'Ramp', 'Transak', 'TransFi']}
            rows={[
              { feature: 'Asian market localization', values: [false, false, 'Partial', true] },
              { feature: 'Enterprise onboarding < 1 week', values: [false, true, false, true] },
              { feature: 'Automated KYB', values: [false, false, false, true] },
              { feature: 'Actionable merchant analytics', values: ['Basic', false, 'Basic', true] },
              { feature: 'Sandbox-first developer flow', values: [true, true, false, true] },
              { feature: 'Local payment methods (6+ markets)', values: [false, false, true, true] },
            ]}
          />
          <h3 className="cs-section-subtitle" style={{ marginTop: '2.5rem' }}>Enterprise Client Interviews</h3>
          <CsBody>
            <p>I conducted interviews with 12 enterprise clients (wallet providers, DeFi platforms, and exchanges) across 6 Asian markets. Three recurring themes emerged:</p>
          </CsBody>
          <CsNumList items={[
            <><strong>Onboarding friction:</strong> Merchants described a &ldquo;black box&rdquo; experience &mdash; after signing up, they had no visibility into KYB status, integration progress, or what to do next.</>,
            <><strong>Dashboard overload:</strong> Existing dashboards showed raw transaction logs but didn&rsquo;t surface the metrics merchants actually needed: conversion rates, failure reasons, and settlement timelines.</>,
            <><strong>Localization gaps:</strong> End-users in Indonesia, Vietnam, and the Philippines abandoned flows when they encountered unfamiliar payment methods or English-only interfaces.</>,
          ]} />
        </CsSection>

        {/* Product overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Transfi/photos/all-dashboards.png" alt="TransFi dashboard screens: onboarding, users, analytics, payment integration" loading="lazy" /></div>
            <p className="cs-caption">TransFi&rsquo;s dashboard ecosystem: onboarding, user management, order analytics, and payment widget integration</p>
          </div>
        </section>

        <CsSection id="cs-timeline" label="Timeline" title="Project Arc">
          <CsTimeline items={[
            { date: 'Q1 2022', title: 'Discovery & Audit', desc: 'Joined TransFi as sole product designer. Conducted competitive audit of MoonPay, Ramp, and Transak. Interviewed 12 enterprise clients across 6 Asian markets to map pain points in crypto payment onboarding.' },
            { date: 'Q2 2022', title: 'V2 Widget Redesign', desc: 'Redesigned the consumer-facing buy/sell widget with localized flows for Indonesia, Vietnam, and the Philippines. Introduced familiar e-commerce patterns to replace crypto-native jargon.' },
            { date: 'Q3 2022', title: 'Design System & Brand', desc: "Built the component library and design system from scratch. Established TransFi's visual identity \u2014 typography, color system, and interaction patterns shared across merchant and consumer surfaces." },
            { date: 'Q4 2022', title: 'Merchant Dashboard', desc: 'Shipped the redesigned merchant dashboard with actionable analytics, automated KYB onboarding, and sandbox-first developer integration \u2014 reducing enterprise onboarding from 2 weeks to 3 days.' },
            { date: 'Q1\u2013Q2 2023', title: 'V3 Architecture & Scale', desc: 'Architected V3 of the platform for scale \u2014 expanded localization to 6 markets, introduced self-service documentation, and refined analytics to surface conversion funnels and settlement timelines. Monthly volume exceeded $50M.' },
          ]} />
        </CsSection>

        <CsSection id="cs-process" label="Process" title="Design Process">
          <CsBody>
            <p>I established a structured design process that balanced speed-to-market with research rigor. Each feature went through discovery (client interviews + data review), definition (flows + wireframes), design (high-fidelity + prototype), and validation (usability testing with 3&ndash;5 merchant users before handoff).</p>
          </CsBody>
          <div className="cs-process-flow">
            <span className="cs-process-pill">Research &amp; Strategy</span>
            <span className="cs-process-pill">User Flow</span>
            <span className="cs-process-pill">Wireframing</span>
            <span className="cs-process-pill">Moodboard</span>
            <span className="cs-process-pill">UI/UX Design</span>
            <span className="cs-process-pill">UI Kit</span>
            <span className="cs-process-pill">Branding</span>
          </div>
        </CsSection>

        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/Transfi/photos/mobile-flows.png" alt="Design process workflow and wireframe screens" loading="lazy" />
          <p className="cs-caption">The design process moved from low-fidelity wireframes to high-fidelity prototypes, with each stage validated through merchant usability testing before advancing to the next phase.</p>
        </div>

        <CsSection id="cs-product" label="Product Overview" title="">
          <h2 className="cs-display">Providing A Better User Experience.</h2>
          <CsFeatureGrid features={[
            { title: 'Intuitive Flow', desc: 'Designed with local context in mind across user journey. Currently available in Bahasa and Vietnamese.' },
            { title: 'Crypto-Novice Friendly', desc: 'Simple steps and gentle nudges to ease user flow. Similar to ecommerce shopping experiences.' },
            { title: 'Localized Language', desc: 'Jargon-free descriptions that are comprehensible to non-crypto users with minimal data entry.' },
            { title: 'Functional KYC', desc: 'Using local ID and driver licenses for higher KYC success rates and better experience.' },
          ]} />
        </CsSection>

        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/Transfi/photos/mobile-screens-grid.png" alt="Product overview, widget mockup with feature cards and color palette" loading="lazy" />
          <p className="cs-caption">The redesigned consumer widget prioritized simplicity for crypto-novice users, featuring localized language, familiar e-commerce patterns, and local payment method integration across six Asian markets.</p>
        </div>

        {/* Design system slide */}
        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/Transfi/photos/type-scale.png" alt="Typography scale with DM Sans, button specifications, and card component specs" loading="lazy" />
          <p className="cs-caption">The design system built around DM Sans established consistent typography scales, button states, and card components &mdash; flexible enough to serve both the merchant dashboard and the consumer-facing widget.</p>
        </div>

        <CsSection id="cs-screens" label="Screens" title="">
          <h2 className="cs-display">Buy &amp; Sell Crypto Screen</h2>
          <CsBody>
            <p>The Buy &amp; Sell Crypto screen is a simple and sophisticated interface to help users choose what to pay &amp; buy with a quick summary.</p>
          </CsBody>
          <CsNumList items={[
            <>Select a Crypto and on which chain you want that Crypto to be delivered</>,
            <>Select a Currency depending on your Country you live in or bank account</>,
          ]} />
          <h3 className="cs-section-subtitle">Order Summary Screen</h3>
          <CsBody>
            <p>It helps you track your progress through statuses: Ordered, Payment Successful, Processed, and Delivered. It also helps users understand any difficulties and duration required for the order to be completed, along with the full order details.</p>
          </CsBody>
        </CsSection>

        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/Transfi/photos/buy-crypto-flow.png" alt="Buy crypto, select crypto, select currency, order summary and status screens" loading="lazy" />
          <p className="cs-caption">The buy and sell flow guides users through crypto selection, currency pairing, and order confirmation with real-time status tracking &mdash; designed to feel as straightforward as an e-commerce checkout.</p>
        </div>

        {/* Profile and Trade History */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-section-title">Profile And Trade History</h2>
            <CsBody>
              <p><strong>Menu Screen</strong> helps the user to login &amp; facilitates different options present in the product.</p>
              <p><strong>Trade History Screen</strong> gives an overview about your recent crypto purchases and sells.</p>
              <p><strong>Profile</strong> includes bank account details &amp; wallet addresses which have been previously saved.</p>
            </CsBody>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Transfi/photos/mobile-flows.png" alt="Mobile payment flows: currency selection, wallet address, payment methods, order summary, processing" loading="lazy" /></div>
            <p className="cs-caption">Complete mobile payment flow: from currency selection through wallet address entry, payment method choice, order summary, and processing confirmation</p>
          </div>
        </section>

        <CsBeforeAfter
          title="Merchant Onboarding Transformation"
          before={{
            label: 'Before (2+ weeks)',
            items: [
              'Manual KYB via email attachments',
              'No visibility into review status',
              'Back-and-forth with support for API keys',
              'Documentation scattered across PDFs',
            ],
          }}
          after={{
            label: 'After (3 days)',
            items: [
              'Automated KYB with real-time document upload',
              'Progress dashboard with clear status indicators',
              'Instant sandbox access, API keys on signup',
              'Interactive docs with in-dashboard guidance',
            ],
          }}
        />

        <CsSection id="cs-gtm" label="Go-To-Market Strategy" title="">
          <h2 className="cs-display">Businesses Can Implement The TransFi Widget Easily In 3 Steps.</h2>
          <CsSteps steps={[
            { num: '1', title: 'Straight To Sandbox', desc: 'Developers get instant access to the sandbox with just their email ID, and can play around with the widget easily.' },
            { num: '2', title: 'Easy Onboarding', desc: 'Onboarding takes place in the sandbox through automated KYB and services agreement.' },
            { num: '3', title: 'Go Live', desc: 'Once onboarded API keys are given to go live. The dashboard provides high-quality analytics on user metrics.' },
          ]} />
        </CsSection>

        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/Transfi/photos/dashboard-detail.png" alt="TransFi dashboard analytics and developer widget integration" loading="lazy" />
          <p className="cs-caption">The merchant dashboard and developer integration flow &mdash; from instant sandbox access to live deployment in three steps, with analytics that surface conversion rates, failure reasons, and settlement timelines.</p>
        </div>

        <CsSection id="cs-results" label="Results" title="">
          <h2 className="cs-display">Measurable Impact Across The Platform.</h2>
          <CsBody>
            <p>The redesigned platform launched in phases across 2022&ndash;2023. Metrics below reflect the state when I departed in early 2023. The platform has continued to grow under the team I helped build.</p>
          </CsBody>
          <CsStatGrid stats={[
            { label: 'Merchant Onboarding (was 2wk manual)', value: '3 days' },
            { label: 'Monthly Volume (by Q1 2023)', value: '$50M+' },
            { label: 'Self-Service Rate (from ~30% baseline)', value: '75%' },
            { label: 'Markets Localized', value: '6' },
          ]} />
          <CsPullquote
            quote="TransFi's redesigned dashboard changed how we operate. We went from filing support tickets for every integration question to going live independently in under a week. The sandbox-first approach and clear analytics made it feel like a product built for our workflow, not one we had to adapt to."
            cite="&mdash; Head of Integrations, Top-5 Southeast Asian Wallet Provider"
          />
          <CsFeatureGrid features={[
            { title: 'Faster Onboarding', desc: 'Reduced enterprise client onboarding time through guided setup flows, automated KYB, and clear progress indicators that eliminated back-and-forth with support.' },
            { title: 'Proactive Analytics', desc: 'Monthly transaction volume processed through the redesigned merchant dashboard, with analytics that helped merchants identify and resolve payment failures proactively.' },
            { title: 'Self-Service Documentation', desc: 'Improvement in merchant self-service rate after redesigning documentation, API reference pages, and in-dashboard guidance patterns \u2014 reducing dependency on support tickets.' },
            { title: 'Market Localization', desc: 'Localized the consumer widget for Asian markets including Indonesia, Vietnam, Philippines, Thailand, India, and UAE \u2014 with local payment methods and language support.' },
          ]} />
          <CsCallout style={{ marginTop: '2.5rem' }}>
            <p>Beyond metrics, the redesign shifted TransFi&rsquo;s positioning from a developer-first tool to a product that enterprise clients could evaluate, integrate, and go live with independently &mdash; a critical differentiator against competitors in the Asian crypto payments space.</p>
          </CsCallout>
        </CsSection>

        <CsSection id="cs-learnings" label="Key Learnings" title="What I Carried Forward">
          <CsFeatureGrid features={[
            { title: 'Ownership vs. isolation', desc: 'As the sole designer, I shaped every pixel but had no one to challenge assumptions in real time. I compensated by pulling engineers into design critiques early and scheduling regular check-ins with enterprise clients as external sounding boards.' },
            { title: 'One system, two audiences', desc: 'Merchants evaluate design through business outcomes (ROI, funnels, settlements). Consumers need effortless checkout. Building a component library for both taught me that a good design system encodes the right defaults for each context, not consistency for its own sake.' },
            { title: 'Localization \u2260 translation', desc: 'Supporting GoPay, GCash, and local bank transfers required rethinking payment hierarchies, adjusting information density for expensive mobile data markets, and designing KYC around national ID formats Western platforms never accounted for.' },
          ]} />
        </CsSection>

        <CsSection id="cs-whats-next" label="What&rsquo;s Next" title="Where TransFi Is Heading">
          <CsBody>
            <p>TransFi continues to operate and scale across Asian markets. I left the team in early 2023 after establishing the design system and product foundations. The platform now processes $50M+ monthly. Here is what the roadmap looked like when I departed.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Off-Ramp Expansion', desc: 'Extending the widget to support crypto-to-fiat off-ramp flows \u2014 letting merchants pay out to local bank accounts and mobile wallets in markets where traditional banking is fragmented.' },
            { num: '2', title: 'Embedded Analytics for Merchants', desc: 'Moving from a reporting dashboard to an intelligence layer: automated alerts for conversion drops, cohort analysis by geography, and predictive fee optimization based on transfer patterns.' },
            { num: '3', title: 'Compliance Automation', desc: 'Expanding the automated KYB system to handle regulatory changes across jurisdictions without manual intervention \u2014 reducing the compliance burden that is the biggest barrier to scaling in new markets.' },
          ]} />
        </CsSection>

        {/* Credits */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">Credits</span>
              <span className="cs-label-row-val"><strong>Lead Product Designer</strong> &mdash; Parth Pawar<br />Product strategy, UX research, interaction design, visual design, design system, brand identity</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Tools</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">Figma</span>
                  <span className="cs-tag-item">Jira</span>
                  <span className="cs-tag-item">Notion</span>
                  <span className="cs-tag-item">Maze (usability testing)</span>
                  <span className="cs-tag-item">Amplitude (analytics)</span>
                </span>
              </span>
            </div>
            <div className="cs-label-row" style={{ borderBottom: 'none' }}>
              <span className="cs-label-row-key">Domains</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">Crypto On/Off-Ramp</span>
                  <span className="cs-tag-item">Cross-Border Payments</span>
                  <span className="cs-tag-item">Enterprise SaaS</span>
                  <span className="cs-tag-item">Localization</span>
                  <span className="cs-tag-item">KYC/KYB Compliance</span>
                  <span className="cs-tag-item">API Developer Experience</span>
                </span>
              </span>
            </div>

            <CsThanks contactCta style={{ marginTop: '3rem' }} />
          </div>
        </section>

            </>
          ) : null}
        </NdaGate>

        <BottomNav
          sections={sections}
          liveUrl="https://www.transfi.com"
          modeAction={{
            label: viewMode === 'summary' ? 'Full case study' : '2 min summary',
            onClick: () => handleViewModeChange(viewMode === 'summary' ? 'full' : 'summary'),
          }}
        />

      </main>

      <NextProject slug="cuetv" title="CueTV" image="/Portfolio.github.io/Assets/images/cuetv.jpg" />
      <Footer />
    </>
  )
}
