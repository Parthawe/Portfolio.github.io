import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import NdaReviewerGallery from '../../components/case-study/NdaReviewerGallery'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const ZENTIPAY_REVIEWER_ASSET = '/Assets/Projects/ZentiPay/reviewer'
const ZENTIPAY_PUBLIC_ASSET = '/Assets/Projects/ZentiPay/public'

const zentipayPublicAsset = (file: string) => `${ZENTIPAY_PUBLIC_ASSET}/${encodeURIComponent(file)}`

const ZENTIPAY_REVIEWER_VISUALS = [
  {
    label: 'Onboarding & verification',
    note: 'Wallet connect, identity verification (bank, passport, and ID checks feeding an "Integrity Score"), and OTP confirmation.',
    images: Array.from({ length: 11 }, (_, i) => ({
      src: `${ZENTIPAY_REVIEWER_ASSET}/dashboard-${i + 1}.webp`,
      alt: `ZentiPay onboarding and verification, screen ${i + 1} of 11.`,
    })),
  },
  {
    label: 'Send crypto',
    note: 'The wallet-to-wallet transfer flow: amount entry, balance and conversion, and the confirmation state.',
    images: [1, 2, 3].map((n) => ({
      src: `${ZENTIPAY_REVIEWER_ASSET}/send-crypto-${n}.webp`,
      alt: `ZentiPay send-crypto flow, step ${n} of 3.`,
    })),
  },
  {
    label: 'Transactions & contacts',
    note: 'The transaction history table and the add-contact flow layered over the main wallet dashboard.',
    images: [
      { src: `${ZENTIPAY_REVIEWER_ASSET}/transaction-history.webp`, alt: 'ZentiPay transaction history table with balances and status.' },
      { src: `${ZENTIPAY_REVIEWER_ASSET}/add-contact-1.webp`, alt: 'ZentiPay add-contact modal over the wallet dashboard.' },
      { src: `${ZENTIPAY_REVIEWER_ASSET}/add-contact-2.webp`, alt: 'ZentiPay add-contact flow, confirmation state.' },
    ],
  },
  {
    label: 'Profile',
    note: 'Account profile: balances, wallet identity, and onboarding progress at a glance.',
    images: [
      { src: `${ZENTIPAY_REVIEWER_ASSET}/profile.webp`, alt: 'ZentiPay account profile screen with balances and onboarding progress.' },
    ],
  },
]

const ZENTIPAY_PUBLIC_VISUALS = [
  {
    src: zentipayPublicAsset('Send Crypto.png'),
    alt: 'ZentiPay transfer screen showing amount entry, live conversion, and balance.',
    label: 'Transfer preview',
  },
  {
    src: zentipayPublicAsset('Dashboard Desktop-6.png'),
    alt: 'ZentiPay Proof of Integrity screen showing identity verification and trust score.',
    label: 'Trust architecture',
  },
  {
    src: zentipayPublicAsset('Transaction History.png'),
    alt: 'ZentiPay transaction history table with balances and status.',
    label: 'Transaction history',
  },
  {
    src: zentipayPublicAsset('Profile.png'),
    alt: 'ZentiPay account profile screen with balances and onboarding progress.',
    label: 'Profile & balances',
  },
]

const ZENTIPAY_PROCESS_VISUALS = [
  {
    src: zentipayPublicAsset('Send Crypto-1.png'),
    alt: 'ZentiPay review step showing send amount, wallet, and final confirmation details.',
    label: 'Review before transfer',
  },
  {
    src: zentipayPublicAsset('Dashboard Desktop-6.png'),
    alt: 'ZentiPay integrity dashboard with verification tasks and trust score.',
    label: 'Trust system',
  },
]

export default function ZentipayPage() {
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('summary')
  const sections = viewMode === 'summary'
    ? [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'case-study-access-zentipay', label: 'Access' },
      ]
    : [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'cs-public-story', label: 'Glimpse' },
        { id: 'cs-process', label: 'Process' },
        { id: 'case-study-access-zentipay', label: 'Access' },
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
        document.getElementById('case-study-access-zentipay')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 120)
    }
  }

  return (
    <>
      <Helmet>
        <title>ZentiPay &middot; Parth Pawar</title>
        <meta name="description" content="ZentiPay, access-limited public preview of a trust-first fintech super app for cross-border transfers." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ZentiPay · Parth Pawar" />
        <meta property="og:description" content="Trust-first fintech super app for cross-border transfer flows." />
        <meta property="og:image" content="https://designwhich.works/Assets/Projects/ZentiPay/reviewer/send-crypto-1.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main project-main--zentipay" style={{
        // Black/grey treatment: accent plus the full visual-hero palette.
        '--project-color': '#3F4046',
        '--case-outer-1': '#101012',
        '--case-outer-2': '#1c1c1f',
        '--case-outer-3': '#242427',
        '--case-outer-glow-a': 'rgba(140, 140, 150, 0.22)',
        '--case-outer-glow-b': 'rgba(90, 90, 100, 0.30)',
        '--case-hero-panel-a': 'rgba(246, 246, 245, 0.92)',
        '--case-hero-panel-b': 'rgba(232, 232, 231, 0.88)',
        '--case-hero-panel-c': 'rgba(216, 216, 215, 0.82)',
        '--case-hero-glow': 'rgba(150, 150, 158, 0.30)',
        '--case-hero-grid': 'rgba(40, 40, 44, 0.08)',
        '--case-hero-orb-b': 'rgba(170, 172, 180, 0.26)',
        '--case-hero-soft': 'rgba(255, 255, 255, 0.55)',
        '--case-hero-media-a': 'rgba(255, 255, 255, 0.52)',
        '--case-hero-media-b': 'rgba(150, 152, 158, 0.18)',
        '--case-hero-media-c': 'rgba(110, 112, 118, 0.16)',
        '--case-hero-ink': '#1c1c1f',
        '--case-hero-muted': 'rgba(28, 28, 31, 0.66)',
        '--case-hero-chip-border': 'rgba(28, 28, 31, 0.13)',
        '--case-hero-chip-color': 'rgba(28, 28, 31, 0.62)',
        '--case-hero-blob-a': 'rgba(120, 122, 130, 0.28)',
        '--case-hero-blob-b': 'rgba(60, 60, 66, 0.32)',
        '--case-hero-blob-c': 'rgba(200, 200, 204, 0.22)',
        '--case-hero-blob-glow': 'rgba(235, 235, 238, 0.28)',
      } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="fintech"
          backLabel="Back to Work"
          tags={['Fintech', '0\u21921 Product', 'Design System', 'Cross-cultural UX']}
          title="ZentiPay"
          subtitle="A trust-first remittance product shaped around price clarity, progress, and confidence before money moved."
          info={[
            { label: 'Role', value: 'Founding Product Designer' },
            { label: 'Scope', value: '0\u21921 Product Design' },
            { label: 'Platform', value: 'Web & Mobile' },
            { label: 'Timeline', value: '2025' },
          ]}
          showHeaderSummary={false}
        />

        <ProjectQuickSummary
          slug="zentipay"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          fullEntryId="case-study-access-zentipay"
        />

        {viewMode === 'full' ? (
          <>
            <NdaPublicStory
              slug="zentipay"
              headline="Trust before transfer."
              lede="A focused preview of the trust system: price clarity, progress states, review moments, and reusable fintech components."
              visuals={ZENTIPAY_PUBLIC_VISUALS}
            />

            <NdaProcess
              title="How I approached it"
              intro="I reduced the work to three product moves: clarify the price, make risk reviewable, and reuse the trust language across the system."
              visuals={ZENTIPAY_PROCESS_VISUALS}
              decisions={[
                {
                  move: 'Make the transfer understandable before money moves.',
                  why: 'Show amount, conversion, fees, and destination early.',
                },
                {
                  move: 'Turn risky actions into review moments.',
                  why: 'Give users a clear pause before irreversible steps.',
                },
                {
                  move: 'Create reusable trust patterns.',
                  why: 'Use the same status, confirmation, and proof language across flows.',
                },
              ]}
              shift={{
                before: 'Users learned cost, status, and risk too late in the flow.',
                after: 'The product front-loads price clarity, progress, and review.',
              }}
            />
          </>
        ) : null}

        <NdaGate slug="zentipay">
          <NdaReviewerGallery groups={ZENTIPAY_REVIEWER_VISUALS} />
        </NdaGate>

        <BottomNav
          sections={sections}
          placement="side"
          modeAction={{
            label: 'Request full case study',
            onClick: handleAccessRequest,
          }}
        />


      </main>

      <NextProject slug="executivelens" title="ExecutiveLens" image="/Assets/images/executivelens.webp" />
      <Footer />
    </>
  )
}
