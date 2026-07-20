import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaGate from '../../components/NdaGate'
import NextProject from '../../components/case-study/NextProject'

const COVER = '/Assets/Projects/MediMorpho/nyu-langone-building-clear.webp'

const MediMorphoProtectedStory = lazy(() => import('./MediMorphoProtectedStory'))

export default function MediMorphoPage() {
  return (
    <>
      <Helmet>
        <title>NYU Langone Healthcare Case Study · Parth Pawar</title>
        <meta
          name="description"
          content="A NYU Langone healthcare UX research case study examining language, communication, and system-navigation barriers through 20 interviews."
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="NYU Langone Healthcare Case Study · Parth Pawar" />
        <meta
          property="og:description"
          content="A reviewer-gated UX research case study covering the system map, interviews, synthesis, journey mapping, and technical exploration."
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
          heroEyebrow="NYU Langone · Healthcare UX research"
          subtitle="A research-led exploration of how language and cultural barriers intensify an already fragmented healthcare journey."
          heroImage={COVER}
          heroAlt="NYU Langone Health building signage for the healthcare UX research case study."
          showHeaderSummary={false}
          visualHeroMedia={(
            <div className="medimorpho-hero-photo">
              <img
                src={COVER}
                alt="NYU Langone Health building signage for the healthcare UX research case study."
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="medimorpho-hero-photo__wash" aria-hidden="true" />
              <div className="medimorpho-hero-photo__label">
                <span>Healthcare UX research</span>
                <strong>NYU Langone</strong>
                <small>Ecosystem research → interviews → synthesis</small>
              </div>
              <div className="medimorpho-hero-photo__proof" aria-label="Project research proof points">
                <span><b>20</b> interviews</span>
                <span><b>4</b> synthesis themes</span>
              </div>
            </div>
          )}
          info={[
            { label: 'Context', value: 'NYU Langone' },
            { label: 'Role', value: 'UX Research & Service Design' },
            { label: 'Team', value: '5 NYU students' },
            { label: 'Timeline', value: 'Jan–Feb 2024' },
          ]}
        />

        <section className="cs-section medimorpho-access medimorpho-access--overview reveal" id="cs-medimorpho-access">
          <div className="wrap">
            <div className="medimorpho-access__intro medimorpho-access__intro--overview">
              <span>NDA case study</span>
              <h2>The UX work begins after access.</h2>
              <div className="medimorpho-access__summary">
                <p>The detailed case study contains the original research, system map, interview synthesis, journey map, and technical exploration.</p>
                <div className="medimorpho-access__contents" aria-label="Protected case study contents">
                  <span>Problem framing</span>
                  <span>System map</span>
                  <span>20 interviews</span>
                  <span>Affinity synthesis</span>
                  <span>Journey map</span>
                  <span>Technical research</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cs-section medimorpho-access medimorpho-access--gate reveal" aria-label="Case study access">
          <div className="wrap">
            <div className="medimorpho-access__gate">
              <NdaGate slug="medimorpho" compact />
            </div>
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
