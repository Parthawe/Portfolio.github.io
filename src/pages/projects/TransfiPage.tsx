import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const TRANSFI_ASSETS = '/Portfolio.github.io/Assets/Projects/Transfi/public'

const TRANSFI_PUBLIC_VISUALS = [
  {
    src: `${TRANSFI_ASSETS}/payment-gateway.png`,
    alt: 'Public TransFi payment gateway preview showing a secure send payment card.',
    label: 'Payment gateway',
  },
  {
    src: `${TRANSFI_ASSETS}/on-ramp-flow.png`,
    alt: 'Public TransFi on-ramp interface preview with banking and stablecoin payment UI.',
    label: 'On-ramp flow',
  },
  {
    src: `${TRANSFI_ASSETS}/buy-crypto-widget.png`,
    alt: 'Public TransFi buy crypto widget with fiat and BTC inputs.',
    label: 'Buy crypto widget',
  },
]

export default function TransfiPage() {
  const sections = [
    { id: 'cs-public-story', label: 'Glimpse' },
    { id: 'cs-process', label: 'Process' },
    { id: 'case-study-access-transfi-project', label: 'Access' },
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
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/nda-cover.svg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{
        // TransFi deep blue (#232D95) drives the accent, outer gradient, and hero blob.
        '--project-color': '#232D95',
        '--case-outer-1': '#080b1f',
        '--case-outer-2': '#111741',
        '--case-outer-3': '#161d4a',
        '--case-outer-glow-a': 'rgba(64, 82, 214, 0.30)',
        '--case-outer-glow-b': 'rgba(35, 45, 149, 0.38)',
        '--case-hero-orb-b': 'rgba(140, 152, 232, 0.24)',
        '--case-hero-blob-a': 'rgba(96, 112, 226, 0.30)',
        '--case-hero-blob-b': 'rgba(24, 32, 112, 0.36)',
        '--case-hero-blob-c': 'rgba(168, 178, 238, 0.22)',
        '--case-hero-blob-glow': 'rgba(214, 220, 248, 0.28)',
      } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="fintech"
          backLabel="Back to Work"
          tags={['Fintech', 'UX', 'Web3', 'Brand']}
          title="TransFi"
          subtitle="Made crypto payment infrastructure easier for merchant teams to understand, onboard, and trust."
          info={[
            { label: 'Company', value: 'TransFi' },
            { label: 'Scope', value: 'Product Design, Brand, Systems' },
            { label: 'Role', value: 'Lead Product Designer' },
            { label: 'Duration', value: '2022\u201323' },
          ]}
          liveUrl="https://www.transfi.com"
          showHeaderSummary={false}
        />

        <NdaPublicStory
          slug="transfi-project"
          headline="Trust made operational."
          lede="The public glimpse shows the shape of the redesign without exposing internal payment flows, market constraints, or implementation detail."
          visuals={TRANSFI_PUBLIC_VISUALS}
        />

        <NdaProcess
          decisions={[
            {
              move: 'Turned an abstract “trust” goal into operational interface behaviour.',
              why: 'Trust is easy to claim and hard to design. I translated it into concrete, testable rules — what the interface shows, when it confirms, and how it handles the moments money is at risk — so it became something the product does, not says.',
            },
            {
              move: 'Prioritised the redesign around real payment-flow risk.',
              why: 'With finite time I focused effort where a confused or wrong action carried the highest cost, rather than spreading polish evenly. The visible shape of the redesign followed the risk map, with patterns that held up across markets so merchant teams saw a consistent experience without the internal complexity.',
            },
          ]}
          shift={{
            before: 'Payment flows where trust was asserted, and users carried the uncertainty.',
            after: 'Flows where interface behaviour makes each step legible, reviewable, and safe by default.',
          }}
        />

        <NdaGate slug="transfi-project" />


        <BottomNav
          sections={sections}
          liveUrl="https://www.transfi.com"
          placement="side"
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
