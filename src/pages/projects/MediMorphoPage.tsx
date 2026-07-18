import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import NdaGate from '../../components/NdaGate'
import CsSection from '../../components/case-study/CsSection'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const COVER = '/Assets/Projects/MediMorpho/medimorpho-16x9.svg'
const NYU_LANGONE_LOGO = '/Assets/Projects/MediMorpho/nyu-langone-health.svg'

const AFFINITY_THEMES = [
  {
    index: '01',
    title: 'Communication barriers',
    copy: 'Translation delay, unfamiliar medical terms, pain descriptions, and cultural nuance all change what a patient can express in the room.',
  },
  {
    index: '02',
    title: 'Information management',
    copy: 'People need a dependable way to capture what was said, what matters now, and what should happen next after a short appointment.',
  },
  {
    index: '03',
    title: 'Insurance navigation',
    copy: 'Coverage, referrals, authorization, and fragmented records make the care journey harder to follow—even before language enters the system.',
  },
  {
    index: '04',
    title: 'Trust in digital tools',
    copy: 'Translation and automation only help when the patient can verify the meaning and the clinician stays responsible for the encounter.',
  },
]

const SERVICE_STEPS = [
  { label: 'Patient speaks', detail: 'Natural language and lived context' },
  { label: 'Language identified', detail: 'Locale and confidence made visible' },
  { label: 'Live interpretation', detail: 'Speech, transcript, and translation' },
  { label: 'Clinician confirms', detail: 'Medical meaning stays accountable' },
  { label: 'Shared recap', detail: 'Plain-language next steps to keep' },
]

export default function MediMorphoPage() {
  return (
    <>
      <Helmet>
        <title>MediMorpho Case Study · Parth Pawar</title>
        <meta
          name="description"
          content="MediMorpho is a multilingual healthcare service concept for clearer patient-clinician communication, shaped by 20 primary-research interviews."
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="MediMorpho Case Study · Parth Pawar" />
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
          title="MediMorpho"
          subtitle="A multilingual care system designed to preserve meaning, confidence, and patient agency across a healthcare encounter."
          heroImage={COVER}
          heroAlt="MediMorpho concept showing patient expression becoming a shared clinical recap."
          info={[
            { label: 'Context', value: 'NYU academic concept' },
            { label: 'Role', value: 'Service Designer' },
            { label: 'Team', value: '5 NYU students' },
            { label: 'Timeline', value: 'Jan–Feb 2024' },
          ]}
        />

        <section className="medimorpho-context-band reveal" aria-label="Project context">
          <div className="wrap medimorpho-context-band__inner">
            <div className="medimorpho-context-band__brand">
              <img src={NYU_LANGONE_LOGO} alt="NYU Langone Health" />
            </div>
            <div className="medimorpho-context-band__copy">
              <span>Healthcare service context</span>
              <p>
                Independent academic concept using NYU Langone as the care setting. MediMorpho is not an official NYU Langone product or commissioned engagement.
              </p>
            </div>
          </div>
        </section>

        <NdaPublicStory
          slug="medimorpho"
          headline="Language should not decide the quality of care."
          lede="This public glimpse keeps participant material private while showing the research logic, service model, and product decisions behind MediMorpho."
          visuals={[
            {
              src: COVER,
              alt: 'MediMorpho public-safe illustration of multilingual patient-clinician communication.',
              label: 'Public-safe service-system illustration',
            },
          ]}
        />

        <CsSection
          id="cs-medimorpho-research"
          label="01 · Research"
          title="Twenty conversations made the system visible."
        >
          <p className="cs-body-lg">
            We spoke with people who navigate care in a non-native language and with healthcare professionals working inside short, information-heavy encounters. Secondary research, journey mapping, and synthesis helped separate a translation problem from the broader service problem around memory, trust, insurance, and follow-through.
          </p>

          <CsStatGrid
            stats={[
              { value: '20', label: 'Primary interviews' },
              { value: '16', label: 'LEP participants' },
              { value: '4', label: 'Healthcare professionals' },
              { value: '4', label: 'Affinity themes' },
            ]}
          />

          <div className="medimorpho-privacy-note" role="note">
            <span>Research privacy</span>
            <p>Raw notes, names, recordings, and participant-level quotes are intentionally excluded from this public case study.</p>
          </div>

          <div className="medimorpho-affinity" aria-label="Four research themes">
            {AFFINITY_THEMES.map((theme) => (
              <article className="medimorpho-affinity__card" key={theme.index}>
                <span>{theme.index}</span>
                <h3>{theme.title}</h3>
                <p>{theme.copy}</p>
              </article>
            ))}
          </div>
        </CsSection>

        <CsSection
          id="cs-medimorpho-model"
          label="02 · Service model"
          title="Translate the encounter, not just the sentence."
        >
          <p className="cs-body-lg">
            The concept joins live interpretation with clinician confirmation and a patient-owned recap. It keeps the automation useful but bounded: the system can carry meaning across language, while clinical responsibility stays with the care team.
          </p>

          <div className="medimorpho-service-flow" role="img" aria-label="MediMorpho service flow from patient expression to shared recap">
            {SERVICE_STEPS.map((step, index) => (
              <div className="medimorpho-service-flow__item" key={step.label}>
                <div className="medimorpho-service-flow__node">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step.label}</strong>
                  <small>{step.detail}</small>
                </div>
                {index < SERVICE_STEPS.length - 1 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
        </CsSection>

        <NdaProcess
          title="Designing for comprehension, not spectacle"
          intro="The work became clearer when every decision answered one question: can the patient understand, verify, and keep what matters?"
          decisions={[
            {
              move: 'Make uncertainty visible.',
              why: 'Language and translation confidence should be reviewable instead of hidden behind a fluent-looking answer.',
            },
            {
              move: 'Keep the clinician in the loop.',
              why: 'MediMorpho supports the conversation; it does not replace medical judgment or consent.',
            },
            {
              move: 'Design beyond the appointment.',
              why: 'A shared recap carries plain-language instructions, terms, and next steps into the moment when the patient must act alone.',
            },
            {
              move: 'Treat culture as context.',
              why: 'A useful interpretation layer preserves intent and nuance rather than performing word-for-word substitution.',
            },
          ]}
          shift={{
            before: 'Meaning was fragmented across speech, jargon, notes, portals, and memory.',
            after: 'Patient and clinician leave the encounter with one confirmed, understandable account.',
          }}
        />

        <CsSection
          id="cs-medimorpho-feasibility"
          label="03 · Feasibility"
          title="A focused MVP before an ambitious platform."
        >
          <p className="cs-body-lg">
            Technical research narrowed the first release to capabilities that already have credible implementation paths. More speculative intelligence stays outside the core until the interpretation experience is reliable, reviewable, and safe.
          </p>
          <CsFeatureGrid
            className="medimorpho-feasibility-grid"
            features={[
              {
                title: 'Language identification',
                desc: 'Recognize the active language and show confidence before the system begins translating.',
              },
              {
                title: 'Real-time transcription',
                desc: 'Create a shared, reviewable record of the conversation without forcing either person to stop speaking naturally.',
              },
              {
                title: 'Real-time translation',
                desc: 'Carry meaning across languages while preserving a visible route back to the original statement.',
              },
              {
                title: 'Confirmed recap',
                desc: 'Turn the encounter into patient-owned next steps only after the care team has checked the clinical meaning.',
              },
            ]}
          />
        </CsSection>

        <section className="cs-section medimorpho-access reveal" id="cs-medimorpho-access">
          <div className="wrap">
            <div className="medimorpho-access__intro">
              <span>04 · NDA access</span>
              <h2>The full research trail stays private.</h2>
              <p>Request access to review the complete boards, interview synthesis, journey map, and concept development.</p>
            </div>
            <NdaGate slug="medimorpho" />
          </div>
        </section>

        <BottomNav
          sections={[
            { id: 'cs-public-story', label: 'Glimpse' },
            { id: 'cs-medimorpho-research', label: 'Research' },
            { id: 'cs-medimorpho-model', label: 'Model' },
            { id: 'cs-medimorpho-access', label: 'Access' },
          ]}
          placement="side"
        />
      </main>

      <NextProject slug="healthapp" title="Health App" image="/Assets/mockups/projects/healthapp_16x9.webp" />
      <Footer />
    </>
  )
}
