import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const TRANSFI_ASSET_BASE = '/Assets/Projects/Transfi'
const transfiPublicAsset = (fileName: string) => (
  `${TRANSFI_ASSET_BASE}/public/${encodeURIComponent(fileName)}`
)

const TRANSFI_PUBLIC_VISUALS = [
  {
    src: transfiPublicAsset('Group 550.png'),
    alt: 'TransFi dashboard and buy-crypto widget shown across laptop and phone mockups.',
    label: 'Dashboard and widget',
  },
]

const TRANSFI_PROCESS_VISUALS = [
  {
    src: transfiPublicAsset('Frame 427318646.png'),
    alt: 'TransFi mobile payment flow screens arranged as a product journey collage.',
    label: 'Payment flow map',
  },
  {
    src: transfiPublicAsset('Customer dashboard Widget.png'),
    alt: 'TransFi customer dashboard widget configuration screen.',
    label: 'Widget setup',
  },
]

const TRANSFI_REVIEWER_SECTIONS = [
  {
    eyebrow: '01 / Merchant surface',
    title: 'Make the dashboard legible before the payment starts.',
    body: 'Reviewer screens show how merchants moved from entry and setup into user, widget, and operational states without losing context.',
    images: [
      {
        label: 'Users dashboard',
        src: transfiPublicAsset('Customer dashboard Users.png'),
        alt: 'TransFi customer dashboard users screen.',
      },
      {
        label: 'User detail',
        src: transfiPublicAsset('Customer dashboard Users-1.png'),
        alt: 'TransFi customer dashboard user detail screen.',
      },
      {
        label: 'Login state',
        src: transfiPublicAsset('Login screen 2.png'),
        alt: 'TransFi login screen.',
      },
    ],
  },
  {
    eyebrow: '02 / Payment journey',
    title: 'Turn crypto payment risk into readable steps.',
    body: 'The flow artifacts map currency choice, wallet/payment method selection, confirmation, order status, and transaction outcomes as a sequence of reviewable moments.',
    images: [
      {
        label: 'Currency choice',
        src: transfiPublicAsset('Group 1000004741.png'),
        alt: 'TransFi 3D visual of currency selection and pay with bitcoin interface.',
      },
      {
        label: 'Dashboard state',
        src: transfiPublicAsset('Frame 427318638.png'),
        alt: 'TransFi product interface frame showing a key dashboard or flow state.',
      },
      {
        label: 'Flow state',
        src: transfiPublicAsset('Frame 427318639.png'),
        alt: 'TransFi product interface frame showing a key flow state.',
      },
      {
        label: 'Payment state',
        src: transfiPublicAsset('Frame 427318643.png'),
        alt: 'TransFi product interface frame showing a key payment state.',
      },
      {
        label: 'Compact state',
        src: transfiPublicAsset('Frame 427318644.png'),
        alt: 'TransFi product interface frame showing a compact product state.',
      },
      {
        label: 'Order summary',
        src: transfiPublicAsset('Order Summary.png'),
        alt: 'TransFi order summary screen showing transaction status and details.',
        tall: true,
      },
    ],
  },
  {
    eyebrow: '03 / System language',
    title: 'Carry the same trust language through brand, UI, and components.',
    body: 'The visual system work made the experience feel like one product across checkout, dashboard, and supporting brand moments.',
    images: [
      {
        label: 'System strip',
        src: transfiPublicAsset('Frame 427318637.png'),
        alt: 'TransFi interface system strip showing product screens and states.',
      },
      {
        label: 'Product detail',
        src: transfiPublicAsset('Group 1000004753.png'),
        alt: 'TransFi interface composition showing a product detail state.',
      },
      {
        label: 'Screen system',
        src: transfiPublicAsset('Group 1000004754.png'),
        alt: 'TransFi interface composition showing product screens and payment states.',
      },
      {
        label: 'Component view',
        src: transfiPublicAsset('Group 1000004755.png'),
        alt: 'TransFi product visual showing a compact product component.',
      },
      {
        label: 'Wide screen',
        src: transfiPublicAsset('Group 2493.png'),
        alt: 'TransFi interface group showing a wide product screen.',
      },
      {
        label: 'Screen detail',
        src: transfiPublicAsset('Group 2494.png'),
        alt: 'TransFi interface group showing a compact screen state.',
      },
      {
        label: 'Small component',
        src: transfiPublicAsset('Group 2495.png'),
        alt: 'TransFi interface group showing a compact component state.',
      },
      {
        label: 'Detail component',
        src: transfiPublicAsset('Group 2496.png'),
        alt: 'TransFi interface group showing a component detail.',
      },
      {
        label: 'Brand visual',
        src: transfiPublicAsset('Group 38938.png'),
        alt: 'TransFi square product or brand visual.',
      },
      {
        label: 'Type scale',
        src: transfiPublicAsset('Type Scale.png'),
        alt: 'TransFi type scale and typography system.',
      },
    ],
  },
]

function TransfiReviewerStory() {
  return (
    <div className="transfi-reviewer-story">
      {TRANSFI_REVIEWER_SECTIONS.map((section) => (
        <section className="transfi-reviewer-section" key={section.eyebrow}>
          <div className="transfi-reviewer-copy">
            <span>{section.eyebrow}</span>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </div>
          <div className="transfi-reviewer-sequence">
            {section.images.map((image) => (
              <figure
                className={`transfi-reviewer-shot${image.tall ? ' transfi-reviewer-shot--tall' : ''}`}
                key={image.src}
              >
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                <figcaption>{image.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default function TransfiPage() {
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('summary')
  const sections = viewMode === 'summary'
    ? [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'case-study-access-transfi-project', label: 'Access' },
      ]
    : [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'cs-public-story', label: 'Glimpse' },
        { id: 'cs-process', label: 'Process' },
        { id: 'case-study-access-transfi-project', label: 'Access' },
      ]

  const handleViewModeChange = (nextMode: 'summary' | 'full') => {
    if (nextMode === viewMode) return
    setViewMode(nextMode)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleAccessRequest = () => {
    setViewMode('full')
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        document.getElementById('case-study-access-transfi-project')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 120)
    }
  }

  return (
    <>
      <Helmet>
        <title>TransFi &middot; Parth Pawar</title>
        <meta name="description" content="TransFi, access-limited public preview of a crypto payment infrastructure redesign for multi-market merchant flows." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="TransFi · Parth Pawar" />
        <meta property="og:description" content="Crypto payment infrastructure redesign for multi-market merchant flows." />
        <meta property="og:image" content="https://designwhich.works/Assets/mockups/projects/transfi-project_16x9.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main project-main--transfi" style={{
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

        <ProjectQuickSummary
          slug="transfi-project"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          fullEntryId="case-study-access-transfi-project"
        />

        {viewMode === 'full' ? (
          <>
            <NdaPublicStory
              slug="transfi-project"
              headline="Trust made operational."
              lede="A public preview of the redesign shape: dashboards, widgets, and merchant-facing flows without exposing confidential constraints."
              visuals={TRANSFI_PUBLIC_VISUALS}
            />

            <NdaProcess
              title="How I approached it"
              intro="Two moves shaped the redesign: make trust visible in the interface, then focus the work around the highest-risk payment moments."
              visuals={TRANSFI_PROCESS_VISUALS}
              decisions={[
                {
                  move: 'Turn trust into interface behavior.',
                  why: 'Show status, confirm risk, and make money moments reviewable.',
                },
                {
                  move: 'Design around payment-flow risk.',
                  why: 'Prioritize confusing steps first, then reuse patterns across markets.',
                },
              ]}
              shift={{
                before: 'Payment flows where trust was asserted, and users carried the uncertainty.',
                after: 'Flows where interface behavior makes each step legible, reviewable, and safe by default.',
              }}
            />
          </>
        ) : null}

        <NdaGate slug="transfi-project">
          <TransfiReviewerStory />
        </NdaGate>


        <BottomNav
          sections={sections}
          liveUrl="https://www.transfi.com"
          placement="side"
          modeAction={{
            label: 'Request full case study',
            onClick: handleAccessRequest,
          }}
        />

      </main>

      <NextProject slug="clawed-chat" title="Clawed" image="/Assets/mockups/projects/clawed-chat_1x1.webp" />
      <Footer />
    </>
  )
}
