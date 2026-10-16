import { lazy, Suspense, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import CaseStudySlides from '../../components/case-study/CaseStudySlides'
import { transfiDecisions } from '../../data/transfiPublicDecisions'
import { transfiPublicSlideChapters } from '../../data/caseStudySlides'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const TransfiSlideStory = lazy(() => import('../../components/case-study/TransfiSlideStory'))

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
          subtitle="Merchant onboarding and payment flows for crypto payment infrastructure."
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
          title="Project overview"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />

        <CsExpandPreview
          sectionIds={['cs-public-story', 'cs-process', 'case-study-access-transfi-project']}
          expanded={viewMode === 'full'}
          onExpand={() => handleViewModeChange('full')}
          ctaLabel="Explore the public story"
          note="Product decisions and payment flows. Detailed reviewer material is available by request."
        >
        <CaseStudySlides chapters={transfiPublicSlideChapters} decisions={transfiDecisions} introductions={{
          'cs-public-story': 'A buyer needs to connect the quote, payment, delivery state, and transaction record. Inspect those states in this public source board.',
          'cs-process': 'Compare two specific choices: itemized pricing before purchase, then address entry with saved-wallet reuse.',
        }} />
        <NdaGate slug="transfi-project" unlockedMode="flow">
          <Suspense fallback={<div className="wrap" role="status"><p>Loading the original case study…</p></div>}><TransfiSlideStory /></Suspense>
        </NdaGate>
        </CsExpandPreview>


        <BottomNav
          sections={sections}
          liveUrl="https://www.transfi.com"
          placement="side"
        />

      </main>

      <NextProject slug="clawed-chat" title="Clawed" image="/Assets/mockups/projects/clawed-chat_1x1.webp" />
      <Footer />
    </>
  )
}
