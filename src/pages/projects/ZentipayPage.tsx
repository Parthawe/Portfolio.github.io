import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import CsScreenStrip from '../../components/case-study/CsScreenStrip'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import '../../components/case-study/service-decisions.css'
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
 {src:zentipayPublicAsset('Send Crypto.png'),label:'Prepare the transfer',alt:'Original send screen with recipient, token, conversion, balance and invoice option',decision:{question:'What belongs beside Send?',choice:'Keep the recipient, token amount, conversion and balance together.',evidence:'The invoice option sits immediately above the Send action.',limit:'This is a design screen, not a working transfer. It does not demonstrate a separate review step or final network fees.'}},
 {src:zentipayPublicAsset('Send Crypto-1.png'),label:'Keep a durable receipt',alt:'Original completed-transfer invoice with recipient, date, transaction ID and fee breakdown',decision:{question:'What can someone inspect after a transfer?',choice:'Keep confirmation and a downloadable invoice together.',evidence:'The completed state includes recipient details, transaction ID, subtotal, fees and net total.',limit:'Values are source mockup content. Formatting and amount inconsistencies remain in the original and need validation before implementation.'}},
]
const ZENTIPAY_ACCOUNT_VISUALS = [
 {src:zentipayPublicAsset('Dashboard Desktop-6.png'),label:'Return to account activity',alt:'Original account overview with balances, quick transfer and recent transactions',decision:{question:'Where should someone resume their account tasks?',choice:'Place totals, recent activity and quick transfer on the same overview.',evidence:'Balance, incoming and outgoing totals sit above recent transactions; saved recipients appear in Quick Transfer.'}},
 {src:zentipayPublicAsset('Transaction History.png'),label:'Find a transaction record',alt:'Original transaction history with date range, status filter, export and invoices',decision:{question:'How can someone narrow down a past payment?',choice:'Provide date, category and status filters alongside export actions.',evidence:'Inspect the date range, All/Savings/Income/Expenses tabs, Status filter and invoice download.'}},
 {src:zentipayPublicAsset('Profile.png'),label:'Account profile',alt:'Original profile showing wallet identity, balances and onboarding progress'},
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
        { id: 'cs-public-story', label: 'Transfer' },
        { id: 'cs-process', label: 'Account' },
        { id: 'case-study-access-zentipay', label: 'Access' },
      ]

  const handleViewModeChange = (nextMode: 'summary' | 'full') => {
    if (nextMode === viewMode) return
    setViewMode(nextMode)
  }

  return (
    <>
      <Helmet>
        <title>ZentiPay &middot; Parth Pawar</title>
        <meta name="description" content="ZentiPay, access-limited public preview of a trust-first fintech super app for cross-border transfers." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ZentiPay · Parth Pawar" />
        <meta property="og:description" content="Trust-first fintech super app for cross-border transfer flows." />
        <meta property="og:image" content="https://designwhich.works/Assets/mockups/projects/zentipay_16x9.webp" />
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
          heroImage="/Assets/mockups/projects/zentipay_16x9.webp"
          heroAlt="ZentiPay trust-first remittance product shown on a desktop display."
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
          proofPlacement="top"
        />

        <CsExpandPreview
          sectionIds={['cs-public-story', 'cs-process', 'case-study-access-zentipay']}
          expanded={viewMode === 'full'}
          onExpand={() => handleViewModeChange('full')}
          ctaLabel="Explore the public story"
          note="Inspect original transfer and account screens. Detailed reviewer material remains access-controlled."
        >
        {viewMode === 'full' ? (
          <>
            <CsSection id="cs-public-story" label="Transfer" title="Keep transfer details and the receipt connected">
              <CsBody><p>The public screens show a wallet-to-wallet send flow and its completed invoice. Read them as design evidence; no money moves in this case study.</p></CsBody>
              <CsScreenStrip label="Prepare and confirm a transfer" screens={ZENTIPAY_PUBLIC_VISUALS} />
            </CsSection>
            <CsSection id="cs-process" label="Account" title="Make the next task easy to find">
              <CsScreenStrip label="Account and transaction records" screens={ZENTIPAY_ACCOUNT_VISUALS} />
              <CsBody><p>The next evaluation should check recipient and amount review, transaction lookup, and recovery when a transfer fails. The public record does not establish completion rates or whether these screens reduced risk.</p></CsBody>
            </CsSection>
          </>
        ) : null}

        <NdaGate slug="zentipay">
          <NdaReviewerGallery groups={ZENTIPAY_REVIEWER_VISUALS} layout="strip" />
        </NdaGate>
        </CsExpandPreview>

        <BottomNav
          sections={sections}
          placement="side"
        />


      </main>

      <NextProject slug="executivelens" title="ExecutiveLens" image="/Assets/images/executivelens.webp" />
      <Footer />
    </>
  )
}
