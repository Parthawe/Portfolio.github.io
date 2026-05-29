import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function TransfiPage() {
  const sections = [
    { id: 'cs-summary', label: 'TL;DR' },
    { id: 'cs-overview', label: 'Overview' },
  ]

  const handleViewModeChange = (nextMode: 'summary' | 'full') => {
    if (typeof window !== 'undefined') {
      const target = nextMode === 'full'
        ? document.getElementById('case-study-access-transfi-project')
        : null
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>TransFi &middot; Parth Pawar</title>
        <meta name="description" content="TransFi, access-limited public glimpse of a crypto payment infrastructure redesign for multi-market merchant flows." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="TransFi · Parth Pawar" />
        <meta property="og:description" content="Crypto payment infrastructure redesign for multi-market merchant flows." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/nda-cover.svg" />
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
          showHeaderSummary={false}
        />

        <ProjectQuickSummary
          slug="transfi-project"
          viewMode="summary"
          onViewModeChange={handleViewModeChange}
          fullCaseStudyEnabled
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
              <span className="cs-label-row-val">The product was competing in a category where the underlying rails matter less than trust. Enterprise teams needed to evaluate fees, status, and settlement logic quickly, but the existing experience assumed blockchain literacy and buried the business story under technical noise. That slowed onboarding and made the product feel riskier than it needed to be.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">My Role</span>
              <span className="cs-label-row-val">I led product design across research synthesis, information architecture, merchant flows, UI, and the component system while partnering closely on product strategy and sprint priorities.</span>
            </div>
            <div className="cs-label-row" style={{ borderBottom: 'none' }}>
              <span className="cs-label-row-key">Visible Outcome</span>
              <span className="cs-label-row-val">The public layer of this case study shows the product framing, the business problem, and the design direction behind the dashboard and widget redesign. The deeper research inputs, internal constraints, and detailed shipped flows are shared directly after access is approved.</span>
            </div>
          </div>
        </section>

        <NdaGate slug="transfi-project" />


        <BottomNav
          sections={sections}
          liveUrl="https://www.transfi.com"
          modeAction={{
            label: 'Request full case study',
            onClick: () => handleViewModeChange('full'),
          }}
        />

      </main>

      <NextProject slug="cuetv" title="CueTV" image="/Portfolio.github.io/Assets/images/nda-cover.svg" />
      <Footer />
    </>
  )
}
