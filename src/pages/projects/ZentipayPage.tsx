import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import NdaReviewerGallery from '../../components/case-study/NdaReviewerGallery'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const ZENTIPAY_REVIEWER_ASSET = '/Portfolio.github.io/Assets/Projects/ZentiPay/reviewer'

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
  {
    label: 'Marketing site',
    note: 'The public-facing ZentiPay marketing and waitlist landing page.',
    tall: true,
    images: [
      { src: `${ZENTIPAY_REVIEWER_ASSET}/landing-page.webp`, alt: 'ZentiPay marketing landing page, full scroll capture.' },
    ],
  },
]

const ZENTIPAY_PUBLIC_VISUALS = [
  {
    src: `${ZENTIPAY_REVIEWER_ASSET}/send-crypto-1.webp`,
    alt: 'ZentiPay transfer screen showing amount entry, live conversion, and balance.',
    label: 'Transfer preview',
  },
  {
    src: `${ZENTIPAY_REVIEWER_ASSET}/dashboard-6.webp`,
    alt: 'ZentiPay Proof of Integrity screen showing identity verification and trust score.',
    label: 'Trust architecture',
  },
  {
    src: `${ZENTIPAY_REVIEWER_ASSET}/transaction-history.webp`,
    alt: 'ZentiPay transaction history table with balances and status.',
    label: 'Transaction history',
  },
  {
    src: `${ZENTIPAY_REVIEWER_ASSET}/profile.webp`,
    alt: 'ZentiPay account profile screen with balances and onboarding progress.',
    label: 'Profile & balances',
  },
]

export default function ZentipayPage() {
  return (
    <>
      <Helmet>
        <title>ZentiPay &middot; Parth Pawar</title>
        <meta name="description" content="ZentiPay, access-limited public glimpse of a trust-first fintech super app for cross-border transfers." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ZentiPay · Parth Pawar" />
        <meta property="og:description" content="Trust-first fintech super app for cross-border transfer flows." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/Projects/ZentiPay/reviewer/send-crypto-1.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{
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
        />

        <NdaPublicStory
          slug="zentipay"
          headline="Trust before transfer."
          lede="A public-safe look at the trust system: price clarity, progress states, review moments, and reusable fintech components."
          visuals={ZENTIPAY_PUBLIC_VISUALS}
        />

        <NdaProcess
          decisions={[
            {
              move: 'Framed cross-border transfer as a confidence problem before a rate problem.',
              why: 'People abandon remittance flows when they are unsure what will actually arrive. I led the design with price clarity and progress so trust was established before any money moved.',
            },
            {
              move: 'Made every irreversible step legible and reviewable.',
              why: 'In fintech the cost of a wrong tap is real money. I built explicit review moments and status states so the user always knew where their transfer was and what happened next.',
            },
            {
              move: 'Built a reusable component language for a 0→1 super app.',
              why: 'As founding designer I needed the system to scale past the first flows. A consistent set of transaction, status, and confirmation components kept new features trustworthy without redesigning trust each time.',
            },
          ]}
          shift={{
            before: 'A transfer flow where users only learned the real cost and status late, eroding confidence.',
            after: 'A trust-first system that front-loads clarity, progress, and review before money moves.',
          }}
        />

        <NdaGate slug="zentipay">
          <NdaReviewerGallery groups={ZENTIPAY_REVIEWER_VISUALS} />
        </NdaGate>

        <BottomNav sections={[
          { id: 'cs-public-story', label: 'Glimpse' },
          { id: 'cs-process', label: 'Process' },
          { id: 'case-study-access-zentipay', label: 'Access' },
        ]} placement="side" />


      </main>

      <NextProject slug="transfi-project" title="TransFi" image="/Portfolio.github.io/Assets/mockups/projects/transfi-project_16x9.webp" />
      <Footer />
    </>
  )
}
