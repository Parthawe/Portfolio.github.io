import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsBody from '../../components/case-study/CsBody'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function ZentipayPage() {
  return (
    <>
      <Helmet>
        <title>ZentiPay &middot; Parth Pawar</title>
        <meta name="description" content="ZentiPay, access-limited public glimpse of a trust-first fintech super app for cross-border transfers." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ZentiPay · Parth Pawar" />
        <meta property="og:description" content="Trust-first fintech super app for cross-border transfer flows." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/nda-cover.svg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#1E6B45' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="fintech"
          backLabel="Back to Work"
          tags={['Fintech', '0\u21921 Product', 'AI', 'Cross-cultural UX']}
          title="ZentiPay"
          subtitle="Built a trust-first remittance product from zero, making cross-border transfers feel legible before money moved."
          info={[
            { label: 'Role', value: 'Founding Product Designer (sole designer, working with product + eng)' },
            { label: 'Scope', value: '0\u21921 Product Design' },
            { label: 'Platform', value: 'Web & Mobile' },
            { label: 'Tools', value: 'Figma, research synthesis, prototyping' },
            { label: 'Timeline', value: '2025' },
          ]}
        />

        {/* The Hook */}
        <section className="cs-section reveal" id="cs-hook">
          <div className="wrap">
            <CsBody style={{ maxWidth: '720px' }}>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>Cross-border transfers break trust when the real cost appears too late. Users may understand that fees exist, but they still need the product to explain what changed, why it changed, and what arrives on the other side before they commit.</p>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>That moment of uncertainty became the design problem. The product had to reduce doubt before optimizing speed.</p>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>That is why the public glimpse focuses on trust architecture: pricing clarity, transfer confidence, and the visible states that make an unfamiliar money product feel safer.</p>
            </CsBody>
          </div>
        </section>

        <ProjectOverview
          sections={[
            {
              label: 'Overview',
              content: 'ZentiPay is a remittance product for migrant workers and international students who send money home often enough to notice every hidden fee. I joined as the founding product designer and owned the experience end to end: research, architecture, onboarding, transaction flows, and the trust signals that had to make an unfamiliar financial product feel safe on first use.',
            },
            {
              label: 'The Mandate',
              content: 'Build a cross-border transfer experience clear enough for first-time crypto users and credible enough for people sending essential income home. The design bar was not delight. It was reducing doubt in the exact moments where users typically abandon.',
            },
            {
              label: 'Visible Outcome',
              content: 'The public case study covers the research framing, the central product bets, and the trust architecture that shaped the experience. The deeper internal flows, detailed validations, and implementation depth are shared directly after access is approved.',
            },
          ]}
        />

        <NdaGate slug="zentipay" />

        <BottomNav sections={[
          { id: 'cs-hook', label: 'The Hook' },
          { id: 'cs-overview', label: 'Overview' },
        ]} />


      </main>

      <NextProject slug="transfi-project" title="TransFi" image="/Portfolio.github.io/Assets/images/nda-cover.svg" />
      <Footer />
    </>
  )
}
