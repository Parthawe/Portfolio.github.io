import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaGate from '../../components/NdaGate'
import NextProject from '../../components/case-study/NextProject'

const COVER = '/Assets/Projects/MediMorpho/nyu-langone-building.png'

const MediMorphoProtectedStory = lazy(() => import('./MediMorphoProtectedStory'))

export default function MediMorphoPage() {
  return (
    <>
      <Helmet>
        <title>NYU Langone Healthcare Case Study · Parth Pawar</title>
        <meta
          name="description"
          content="An independent NYU healthcare service concept for clearer patient-clinician communication, shaped by 20 primary-research interviews."
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="NYU Langone Healthcare Case Study · Parth Pawar" />
        <meta
          property="og:description"
          content="A public-safe look at the research and service model behind a multilingual healthcare experience."
        />
        <meta property="og:image" content={`https://designwhich.works${COVER}`} />
      </Helmet>

      <Nav />

      <main
        id="main-content"
        className="project-main project-main--medimorpho"
        style={{ '--project-color': '#57068c' } as React.CSSProperties}
      >
        <ProjectHeader
          backLink="/healthcare"
          backLabel="Back to Healthcare"
          categorySlug="design-for-good"
          tags={['Healthcare UX', 'Service Design', 'Research', 'NDA']}
          title="NYU Langone"
          heroEyebrow="MediMorpho · Independent academic concept"
          subtitle="A multilingual care system designed to preserve meaning, confidence, and patient agency across a healthcare encounter."
          heroImage={COVER}
          heroAlt="NYU Langone Health building signage, the healthcare setting used for the MediMorpho academic concept."
          showHeaderSummary={false}
          visualHeroMedia={(
            <div className="medimorpho-hero-photo">
              <img
                src={COVER}
                alt="NYU Langone Health building signage, the healthcare setting used for the MediMorpho academic concept."
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="medimorpho-hero-photo__wash" aria-hidden="true" />
              <div className="medimorpho-hero-photo__label">
                <span>Independent academic concept</span>
                <strong>MediMorpho</strong>
                <small>Research → service model → multilingual care</small>
              </div>
              <div className="medimorpho-hero-photo__proof" aria-label="Project research proof points">
                <span><b>20</b> interviews</span>
                <span><b>4</b> synthesis themes</span>
              </div>
            </div>
          )}
          info={[
            { label: 'Context', value: 'NYU academic concept' },
            { label: 'Role', value: 'Service Designer' },
            { label: 'Team', value: '5 NYU students' },
            { label: 'Timeline', value: 'Jan–Feb 2024' },
          ]}
        />

        <section className="cs-section medimorpho-access medimorpho-access--early reveal" id="cs-medimorpho-access">
          <div className="wrap medimorpho-access__layout">
            <div className="medimorpho-access__intro">
              <span>NDA case study</span>
              <h2>The UX work begins after access.</h2>
              <p>Enter the reviewer code or request access to review the research, synthesis, journey map, service model, and MVP decisions.</p>
              <div className="medimorpho-access__contents" aria-label="Protected case study contents">
                <span>Problem framing</span>
                <span>20 interviews</span>
                <span>Affinity synthesis</span>
                <span>Journey map</span>
                <span>Service blueprint</span>
                <span>MVP scope</span>
              </div>
            </div>
            <NdaGate slug="medimorpho" compact />
          </div>
        </section>

        <NdaGate slug="medimorpho" hideWhenLocked unlockedMode="flow">
          <Suspense
            fallback={(
              <div className="wrap medimorpho-protected-loading" role="status" aria-live="polite">
                Preparing the case study…
              </div>
            )}
          >
            <MediMorphoProtectedStory />
          </Suspense>
        </NdaGate>
      </main>

      <NextProject slug="healthapp" title="Health App" image="/Assets/mockups/projects/healthapp_16x9.webp" />
      <Footer />
    </>
  )
}
