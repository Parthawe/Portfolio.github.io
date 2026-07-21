import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NextProject from '../../components/case-study/NextProject'
import MediMorphoProtectedStory from './MediMorphoProtectedStory'

const COVER = '/Assets/Projects/MediMorpho/nyu-langone-building-clear.webp'

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
          content="An in-depth UX research case study covering study framing, 20 interviews, synthesis, journey mapping, system decisions, limitations, and next research steps."
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
          tags={['Healthcare UX', 'Service Design', '20 Interviews', 'Public Synthesis']}
          title="NYU Langone"
          heroEyebrow="NYU Langone · Healthcare UX research"
          subtitle="A 20-interview team study traced where meaning breaks before, during, and after care—and reframed translation from a feature into a continuity-of-care problem."
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
            { label: 'Decision at risk', value: 'Where should a multilingual care service intervene?' },
            { label: 'My contribution', value: 'Primary research, synthesis, system framing, concept direction' },
            { label: 'Team', value: '5-person NYU team' },
            { label: 'Phase', value: 'Discovery & definition · Jan–Feb 2024' },
          ]}
        />

        <section className="cs-section medimorpho-public-story reveal" id="cs-medimorpho-public-problem">
          <div className="wrap">
            <div className="medimorpho-public-story__heading">
              <span>01 · The project</span>
              <h2>Language barriers compound at every handoff in care.</h2>
              <p>
                The project examined the healthcare journey as a connected service—not a single translation moment.
                When patients cannot confidently describe symptoms, follow clinical language, or revisit instructions,
                uncertainty carries from one stage into the next.
              </p>
            </div>

            <div className="medimorpho-care-journey" aria-label="Three stages of the healthcare communication journey">
              <article>
                <span>Before care</span>
                <strong>Finding the right entry point</strong>
                <p>Navigation, forms, and language preference shape confidence before a clinical conversation begins.</p>
              </article>
              <article>
                <span>During care</span>
                <strong>Building shared understanding</strong>
                <p>Symptoms, medical terminology, and interpreter handoffs can create gaps between what is said and understood.</p>
              </article>
              <article>
                <span>After care</span>
                <strong>Following through at home</strong>
                <p>Instructions, medication details, and next steps must remain understandable after the appointment ends.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="cs-section medimorpho-public-story medimorpho-public-story--evidence reveal" id="cs-medimorpho-public-direction">
          <div className="wrap">
            <div className="medimorpho-public-story__heading medimorpho-public-story__heading--evidence">
              <span>02 · What the research changed</span>
              <h2>Translation stopped being a feature and became a shared encounter.</h2>
              <p>
                Twenty interviews connected communication, system navigation, and follow-through. The resulting direction
                supports understanding across the visit instead of placing the burden on one translated screen.
              </p>
            </div>

            <dl className="medimorpho-public-stats" aria-label="Public research evidence">
              <div><dt>20</dt><dd>Primary interviews</dd></div>
              <div><dt>16</dt><dd>People with limited English proficiency</dd></div>
              <div><dt>04</dt><dd>Healthcare professionals</dd></div>
              <div><dt>04</dt><dd>Synthesis themes</dd></div>
            </dl>

            <div className="medimorpho-evidence-chain" aria-label="How research evidence became product direction">
              <article>
                <span>Signal</span>
                <h3>Understanding breaks across the whole journey.</h3>
                <p>Language, context, and confidence affect navigation, the clinical conversation, and what happens afterward.</p>
              </article>
              <i aria-hidden="true">→</i>
              <article>
                <span>Synthesis</span>
                <h3>Four themes linked communication to continuity.</h3>
                <p>The team organized evidence around recurring needs rather than treating every breakdown as a separate feature request.</p>
              </article>
              <i aria-hidden="true">→</i>
              <article>
                <span>Direction</span>
                <h3>One model supports the full encounter.</h3>
                <p>Language identification, live understanding, and a shared recap became connected parts of the service concept.</p>
              </article>
            </div>
          </div>
        </section>

        <MediMorphoProtectedStory />
      </main>

      <NextProject slug="raahi-project" title="Raahi" image="/Assets/mockups/projects/raahi-project_16x9.webp" />
      <Footer />
    </>
  )
}
