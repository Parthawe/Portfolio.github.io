import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSection from '../../components/case-study/CsSection'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import NdaProcess from '../../components/case-study/NdaProcess'
import BottomNav from '../../components/case-study/BottomNav'

const SYSTEM_VISUAL = '/Assets/Projects/MediMorpho/medimorpho-16x9.svg'
const NYU_LANGONE_LOGO = '/Assets/Projects/MediMorpho/nyu-langone-health.svg'

type ResearchIconType = 'interviews' | 'synthesis' | 'journey' | 'feasibility'

const RESEARCH_PHASES: Array<{
  icon: ResearchIconType
  meta: string
  title: string
  copy: string
}> = [
  {
    icon: 'interviews',
    meta: 'Discover',
    title: 'Listen in context',
    copy: 'Secondary research and 20 interviews surfaced communication, navigation, memory, and trust barriers.',
  },
  {
    icon: 'synthesis',
    meta: 'Define',
    title: 'Make patterns visible',
    copy: 'Affinity mapping connected individual experiences into four themes without exposing participant identities.',
  },
  {
    icon: 'journey',
    meta: 'Develop',
    title: 'Map the encounter',
    copy: 'A before, during, and after journey revealed that translation alone would not solve follow-through.',
  },
  {
    icon: 'feasibility',
    meta: 'Scope',
    title: 'Test what can ship',
    copy: 'Competitive and technical research narrowed the concept to a credible, accountable first release.',
  },
]

const AFFINITY_THEMES = [
  {
    index: '01',
    title: 'Communication barriers',
    copy: 'Translation delay, unfamiliar medical terms, pain descriptions, and cultural nuance can change what a patient is able to express.',
  },
  {
    index: '02',
    title: 'Information management',
    copy: 'Short appointments leave people trying to remember terminology, instructions, and next steps after the conversation ends.',
  },
  {
    index: '03',
    title: 'System navigation',
    copy: 'Coverage, referrals, authorization, check-in, and separated records make the journey hard to understand before care begins.',
  },
  {
    index: '04',
    title: 'Trust in digital tools',
    copy: 'Automation only helps when patients can verify meaning and clinicians remain accountable for medical communication.',
  },
]

const JOURNEY_STAGES = [
  {
    stage: 'Before the visit',
    need: 'Arrive prepared and know what the appointment requires.',
    breakdown: 'Forms, insurance language, referrals, and separated records create uncertainty before check-in.',
    response: 'Capture language preference and visit context early; make preparation tasks plain and visible.',
  },
  {
    stage: 'During the visit',
    need: 'Explain symptoms and understand clinical meaning in limited time.',
    breakdown: 'Jargon, interpreter delays, note-taking, and divided attention interrupt direct communication.',
    response: 'Pair live interpretation with the original transcript, confidence cues, and clinician confirmation.',
  },
  {
    stage: 'After the visit',
    need: 'Remember what happened and act on the next step.',
    breakdown: 'Terms, medication instructions, referrals, and follow-up details are easy to lose or misremember.',
    response: 'Provide one confirmed, plain-language recap that the patient can revisit and share with a caregiver.',
  },
]

const SERVICE_STEPS = [
  { label: 'Patient speaks', detail: 'Natural language and lived context' },
  { label: 'Language identified', detail: 'Locale and confidence made visible' },
  { label: 'Live interpretation', detail: 'Speech, transcript, and translation' },
  { label: 'Clinician confirms', detail: 'Medical meaning stays accountable' },
  { label: 'Shared recap', detail: 'Plain-language next steps to keep' },
]

const SCOPE = [
  {
    label: 'MVP',
    title: 'Interpret and confirm',
    copy: 'Language identification, live transcription, translation, visible confidence, and a clinician-approved recap.',
  },
  {
    label: 'Later',
    title: 'Connect the journey',
    copy: 'Preparation prompts, caregiver sharing, portal handoffs, and clearer referral or coverage guidance.',
  },
  {
    label: 'Outside the product',
    title: 'Do not automate judgment',
    copy: 'Diagnosis, treatment recommendations, consent, and autonomous clinical decision-making remain with the care team.',
  },
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

export default function MediMorphoProtectedStory() {
  return (
    <div className="medimorpho-protected-story">
      <section className="cs-section medimorpho-protected-intro reveal" id="cs-medimorpho-overview">
        <div className="wrap">
          <div className="medimorpho-protected-context" aria-label="Project context">
            <div className="medimorpho-protected-context__brand">
              <img src={NYU_LANGONE_LOGO} alt="NYU Langone Health" />
            </div>
            <div>
              <span>Healthcare service context</span>
              <p>Independent academic concept using NYU Langone as the care setting. MediMorpho is not an official NYU Langone product or commissioned engagement.</p>
            </div>
          </div>
          <div className="medimorpho-protected-intro__flag">
            <span aria-hidden="true" />
            Reviewer access granted
          </div>
          <div className="medimorpho-protected-intro__grid">
            <div>
              <p className="medimorpho-protected-intro__eyebrow">UX case study · Research to service concept</p>
              <h2>Language should not decide the quality of care.</h2>
              <p className="cs-body-lg">
                MediMorpho explores how a multilingual care companion could help patients with limited English proficiency prepare, communicate, verify meaning, and follow through—without replacing the clinician or pretending that translation alone fixes a fragmented system.
              </p>
            </div>
            <figure className="medimorpho-protected-intro__visual">
              <img src={SYSTEM_VISUAL} alt="MediMorpho multilingual patient-clinician service concept." loading="eager" decoding="async" />
              <figcaption>Concept system · synthesized from research boards</figcaption>
            </figure>
          </div>

          <dl className="medimorpho-project-brief" aria-label="Project brief">
            <div><dt>Problem</dt><dd>Meaning breaks across language, medical jargon, short visits, and fragmented follow-up.</dd></div>
            <div><dt>Research</dt><dd>20 interviews, secondary research, competitive review, affinity mapping, and journey mapping.</dd></div>
            <div><dt>My role</dt><dd>Service design, UX research synthesis, system framing, and concept direction within a five-person NYU team.</dd></div>
            <div><dt>Outcome</dt><dd>A bounded service model connecting live interpretation, clinician confirmation, and a patient-owned recap.</dd></div>
          </dl>
        </div>
      </section>

      <CsSection
        id="cs-medimorpho-framing"
        label="01 · Frame"
        title="The brief became a human communication problem."
      >
        <div className="medimorpho-hmw">
          <span>How might we</span>
          <blockquote>
            Uplift the healthcare journey for patients with limited English proficiency in New York City, while addressing language barriers and cultural nuance?
          </blockquote>
        </div>

        <div className="medimorpho-framing-grid" aria-label="Problem framing">
          <article>
            <span>01</span>
            <h3>Short encounters</h3>
            <p>Appointments compress explanation, listening, documentation, and decision-making into a narrow window.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Divided attention</h3>
            <p>Documentation and screens can reduce eye contact at the exact moment trust needs to form.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Fragmented systems</h3>
            <p>Records, referrals, insurance, and check-in create separate hurdles that language can intensify.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Memory after care</h3>
            <p>Patients leave with unfamiliar terms and instructions that still need to be understood and acted on.</p>
          </article>
        </div>
      </CsSection>

      <CsSection
        id="cs-medimorpho-research"
        label="02 · Research"
        title="Twenty conversations made the system visible."
      >
        <p className="cs-body-lg">
          The research combined first-hand accounts with a wider review of healthcare fragmentation, interpreter access, digital health tools, and technical feasibility. The goal was to identify where support could improve comprehension without introducing a new source of risk.
        </p>

        <div className="medimorpho-research-atlas" aria-label="Research process">
          {RESEARCH_PHASES.map((phase) => (
            <article className="medimorpho-research-atlas__card" key={phase.icon}>
              <span className="medimorpho-research-atlas__icon"><ResearchIcon type={phase.icon} /></span>
              <p>{phase.meta}</p>
              <h3>{phase.title}</h3>
              <small>{phase.copy}</small>
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
          <p>Raw notes, names, recordings, and participant-level quotes remain excluded. This case study uses only aggregated patterns and reconstructed artifacts.</p>
        </div>

        <div className="medimorpho-affinity" aria-label="Affinity-map themes">
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
        id="cs-medimorpho-journey"
        label="03 · Synthesis"
        title="The opportunity spans the whole encounter."
      >
        <p className="cs-body-lg">
          Journey mapping shifted the concept away from a translation utility. The decisive moments begin before anyone speaks and continue after the appointment, when the patient has to remember, explain, and act.
        </p>

        <div className="medimorpho-journey" role="table" aria-label="Patient journey and design response">
          <div className="medimorpho-journey__head" role="row">
            <span role="columnheader">Stage</span>
            <span role="columnheader">Patient need</span>
            <span role="columnheader">Breakdown</span>
            <span role="columnheader">Design response</span>
          </div>
          {JOURNEY_STAGES.map((item, index) => (
            <div className="medimorpho-journey__row" role="row" key={item.stage}>
              <div role="cell"><small>0{index + 1}</small><strong>{item.stage}</strong></div>
              <p role="cell">{item.need}</p>
              <p role="cell">{item.breakdown}</p>
              <p role="cell">{item.response}</p>
            </div>
          ))}
        </div>
      </CsSection>

      <CsSection
        id="cs-medimorpho-model"
        label="04 · Service model"
        title="Translate the encounter, not just the sentence."
      >
        <p className="cs-body-lg">
          The concept joins live interpretation with clinician confirmation and a patient-owned recap. Automation carries meaning across language, while clinical responsibility remains with the care team.
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
        title="Design principles for accountable assistance"
        intro="Every decision returns to one question: can the patient understand, verify, and keep what matters?"
        decisions={[
          {
            move: 'Make uncertainty visible.',
            why: 'Language and translation confidence should be reviewable instead of hidden behind a fluent-looking answer.',
          },
          {
            move: 'Keep the clinician in the loop.',
            why: 'MediMorpho supports the conversation; it does not replace medical judgment, consent, or responsibility.',
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
        label="05 · Feasibility"
        title="A focused MVP before an ambitious platform."
      >
        <p className="cs-body-lg">
          Technical research examined language identification, speech-to-text, real-time translation, recommendation systems, and integration constraints. The first release stays with capabilities that support communication rather than automate clinical judgment.
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
              desc: 'Create a shared, reviewable record without forcing either person to stop speaking naturally.',
            },
            {
              title: 'Real-time translation',
              desc: 'Carry meaning across languages while preserving a visible route back to the original statement.',
            },
            {
              title: 'Confirmed recap',
              desc: 'Turn the encounter into patient-owned next steps only after the care team checks the clinical meaning.',
            },
          ]}
        />

        <div className="medimorpho-scope" aria-label="Product scope">
          {SCOPE.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </CsSection>

      <CsSection
        id="cs-medimorpho-outcome"
        label="06 · Outcome"
        title="The result is a clearer product boundary."
      >
        <div className="medimorpho-outcome-grid">
          <p className="cs-body-lg">
            The concept moved from “AI for fragmented healthcare” to a specific service promise: help people preserve meaning across a multilingual care encounter, with confirmation at the point where an error could matter.
          </p>
          <div>
            <span>What the work established</span>
            <ul>
              <li>A research-backed problem definition centered on LEP patients.</li>
              <li>A three-stage journey spanning preparation, conversation, and follow-through.</li>
              <li>A service blueprint that assigns accountability to people and technology.</li>
              <li>An MVP boundary that can be tested without claiming clinical intelligence.</li>
            </ul>
          </div>
        </div>
      </CsSection>

      <BottomNav
        sections={[
          { id: 'cs-medimorpho-overview', label: 'Overview' },
          { id: 'cs-medimorpho-research', label: 'Research' },
          { id: 'cs-medimorpho-journey', label: 'Journey' },
          { id: 'cs-medimorpho-model', label: 'Model' },
          { id: 'cs-medimorpho-feasibility', label: 'MVP' },
        ]}
        placement="side"
      />
    </div>
  )
}
