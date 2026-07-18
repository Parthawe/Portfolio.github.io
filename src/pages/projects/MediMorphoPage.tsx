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

const COVER = '/Assets/Projects/MediMorpho/nyu-langone-building.png'
const SYSTEM_VISUAL = '/Assets/Projects/MediMorpho/medimorpho-16x9.svg'
const NYU_LANGONE_LOGO = '/Assets/Projects/MediMorpho/nyu-langone-health.svg'

type ResearchIconType = 'interviews' | 'synthesis' | 'journey' | 'feasibility'

const RESEARCH_LENSES: Array<{
  icon: ResearchIconType
  meta: string
  title: string
  copy: string
}> = [
  {
    icon: 'interviews',
    meta: '20 conversations',
    title: 'Listen in context',
    copy: 'Patients and healthcare professionals surfaced the moments where language, memory, and trust break down.',
  },
  {
    icon: 'synthesis',
    meta: '4 themes',
    title: 'Make patterns visible',
    copy: 'Affinity mapping connected individual experiences without exposing participant-level notes or identities.',
  },
  {
    icon: 'journey',
    meta: 'Before · during · after',
    title: 'Map the encounter',
    copy: 'Journey mapping expanded the brief from live translation to preparation, confirmation, and follow-through.',
  },
  {
    icon: 'feasibility',
    meta: 'Focused MVP',
    title: 'Test what can ship',
    copy: 'Technical research separated reliable language services from more speculative clinical intelligence.',
  },
]

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

function ResearchIcon({ type }: { type: ResearchIconType }) {
  if (type === 'interviews') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5.5 7.5h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-5.7L8 23.5v-4H5.5a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z" />
        <path d="M22 12.5h4.5a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H25v3l-3.7-3H18" />
        <path d="M7.5 12h9M7.5 15h6" />
      </svg>
    )
  }

  if (type === 'synthesis') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="3" y="4" width="10" height="9" rx="2" />
        <rect x="19" y="4" width="10" height="9" rx="2" />
        <rect x="3" y="19" width="10" height="9" rx="2" />
        <rect x="19" y="19" width="10" height="9" rx="2" />
        <path d="M13 8.5h6M8 13v6M24 13v6M13 23.5h6" />
      </svg>
    )
  }

  if (type === 'journey') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="5" cy="23.5" r="2.5" />
        <circle cx="16" cy="8.5" r="2.5" />
        <circle cx="27" cy="19.5" r="2.5" />
        <path d="M7 22c3.2-1.6 3.4-7.9 7.2-11.2M18.2 10.1c3.2 1.5 3.6 6.5 6.5 8.1" />
        <path d="m22.8 16.2 2 2-2.8.7" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M5 8.5h22v15H5z" />
      <path d="m10 13-3 3 3 3M22 13l3 3-3 3M18.5 11.5l-5 9" />
      <path d="M11 27.5h10" />
    </svg>
  )
}

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

        <section className="cs-section medimorpho-access medimorpho-access--early reveal" id="cs-medimorpho-access">
          <div className="wrap medimorpho-access__layout">
            <div className="medimorpho-access__intro">
              <span>NDA case study</span>
              <h2>Go straight to the full research.</h2>
              <p>Enter the reviewer code or request access. The concise public preview continues below.</p>
            </div>
            <NdaGate slug="medimorpho" compact />
          </div>
        </section>

        <NdaPublicStory
          slug="medimorpho"
          headline="Language should not decide the quality of care."
          lede="This public glimpse keeps participant material private while showing the research logic, service model, and product decisions behind MediMorpho."
          visuals={[
            {
              src: SYSTEM_VISUAL,
              alt: 'MediMorpho public-safe illustration of multilingual patient-clinician communication.',
              label: 'Concept system · public-safe reconstruction',
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

          <div className="medimorpho-research-atlas" aria-label="Research approach">
            {RESEARCH_LENSES.map((lens) => (
              <article className="medimorpho-research-atlas__card" key={lens.icon}>
                <span className="medimorpho-research-atlas__icon"><ResearchIcon type={lens.icon} /></span>
                <p>{lens.meta}</p>
                <h3>{lens.title}</h3>
                <small>{lens.copy}</small>
              </article>
            ))}
          </div>

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

        <BottomNav
          sections={[
            { id: 'cs-medimorpho-access', label: 'Access' },
            { id: 'cs-public-story', label: 'Glimpse' },
            { id: 'cs-medimorpho-research', label: 'Research' },
            { id: 'cs-medimorpho-model', label: 'Model' },
          ]}
          placement="side"
        />
      </main>

      <NextProject slug="healthapp" title="Health App" image="/Assets/mockups/projects/healthapp_16x9.webp" />
      <Footer />
    </>
  )
}
