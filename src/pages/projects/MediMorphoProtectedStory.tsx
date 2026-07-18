import BottomNav from '../../components/case-study/BottomNav'
import CsSection from '../../components/case-study/CsSection'
import CsStatGrid from '../../components/case-study/CsStatGrid'

const ASSET_ROOT = '/Assets/Projects/MediMorpho/research'
const REPORT_PDF = `${ASSET_ROOT}/nyu-langone-research.pdf`
const COVER_ILLUSTRATION = `${ASSET_ROOT}/cover-illustration.webp`
const SYSTEM_MAP = `${ASSET_ROOT}/system-map.webp`
const COMPETITIVE_ANALYSIS = `${ASSET_ROOT}/competitive-analysis.webp`
const AFFINITY_MAP = `${ASSET_ROOT}/affinity-map.webp`
const JOURNEY_MAP = `${ASSET_ROOT}/journey-map.webp`
const NYU_LANGONE_LOGO = '/Assets/Projects/MediMorpho/nyu-langone-health.svg'

const CONTEXT_STATS = [
  {
    value: '36.3%',
    label: 'NYC population identified as foreign-born',
    source: 'https://www.census.gov/quickfacts/fact/table/newyorkcitynewyork/PST045223',
  },
  {
    value: '≈50%',
    label: 'Medical information remembered incorrectly',
    source: "https://www.researchgate.net/publication/10780382_Patients'_memory_of_medical_information",
  },
  {
    value: '13%',
    label: 'Hospitals reported as meeting national CLAS standards',
    source: 'https://journalofethics.ama-assn.org/article/how-should-clinicians-respond-language-barriers-exacerbate-health-inequity/2021-02',
  },
  {
    value: '19–100m',
    label: 'Interpreter wait range cited in the report',
    source: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5496646/',
  },
]

const SECONDARY_AREAS = [
  {
    index: '01',
    title: 'The U.S. healthcare ecosystem',
    copy: 'Map the stakeholders, procedures, and systemic fragmentation surrounding a visit.',
  },
  {
    index: '02',
    title: 'LEP patient barriers',
    copy: 'Study language, cultural, economic, eligibility, and system-familiarity barriers together.',
  },
  {
    index: '03',
    title: 'Emerging AI capabilities',
    copy: 'Understand where language technology could support care and where it could create new risk.',
  },
  {
    index: '04',
    title: 'Positioning and viability',
    copy: 'Compare healthcare and AI products to reveal patterns, gaps, and integration expectations.',
  },
]

const COMPETITIVE_LENSES = [
  'Patient-centric experience',
  'Clinical impact',
  'Technical performance and legal compliance',
  'Healthcare-system integration',
  'Innovation and scalability',
]

const QUESTION_CATEGORIES = [
  'Overall healthcare visit experience',
  'Communication challenges',
  'Note-taking',
  'Insurance knowledge and understanding',
  'Product-idea feedback',
]

const TAKEAWAYS = [
  {
    index: '01',
    title: 'Communication and cultural barriers',
    copy: 'Language barriers create delays and misunderstandings. Participants still preferred direct communication even when translation tools were available.',
  },
  {
    index: '02',
    title: 'Interest in a digital medical assistant',
    copy: 'Participants saw value in translation, note-taking, and patient education when those tools improved communication and treatment efficiency.',
  },
  {
    index: '03',
    title: 'Instructions are hard to retain',
    copy: 'People used digital and handwritten notes, then often researched unfamiliar terms again after the visit.',
  },
  {
    index: '04',
    title: 'The healthcare system is unfamiliar',
    copy: 'Participants relied on care providers for insurance information and prioritized treatment over navigating insurance complexity.',
  },
]

const TECH_EXPLORATIONS = [
  {
    group: 'Communication layer',
    title: 'Language identification',
    copy: 'Automatically identify the language of speech or text before translation begins.',
    tools: ['fastText LID', 'lingua', 'cld3', 'tika'],
    use: 'Determine a patient’s language or language preference.',
  },
  {
    group: 'Communication layer',
    title: 'Real-time transcription',
    copy: 'Convert spoken language into written text while the encounter is happening.',
    tools: ['DeepSpeech', 'Kaldi', 'PocketSphinx', 'Vosk', 'wav2vec 2.0'],
    use: 'Support reviewable conversations between patients and providers.',
  },
  {
    group: 'Communication layer',
    title: 'Real-time translation',
    copy: 'Translate spoken text between languages with low delay.',
    tools: ['fairseq', 'Argos Translate', 'Marian', 'Bergamot'],
    use: 'Facilitate communication between patients and clinicians.',
  },
  {
    group: 'Broader exploration',
    title: 'Large language models',
    copy: 'Process medical language and large bodies of text-based information.',
    tools: ['BioBERT', 'UMLS-BERT', 'ClinicalBERT', 'BlueBERT'],
    use: 'The report explored symptom interpretation and urgency guidance as future possibilities—not validated features.',
  },
  {
    group: 'Broader exploration',
    title: 'Recommendation systems',
    copy: 'Use health history and current conditions to surface personalized information.',
    tools: ['LightFM', 'Surprise', 'TensorFlow Recommenders'],
    use: 'Explore personalized patient education and learning content.',
  },
  {
    group: 'Broader exploration',
    title: 'Time-series forecasting',
    copy: 'Use historical patterns to estimate future events or measurements.',
    tools: ['Prophet', 'PyTorch Forecasting', 'GluonTS', 'statsmodels'],
    use: 'Explore cost prediction and chronic-condition monitoring.',
  },
]

function ArtifactFigure({
  src,
  alt,
  label,
  className = '',
}: {
  src: string
  alt: string
  label: string
  className?: string
}) {
  return (
    <figure className={`medimorpho-artifact ${className}`.trim()}>
      <a href={src} target="_blank" rel="noreferrer" aria-label={`Open ${label} at full size`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </a>
      <figcaption>
        <span>Original research artifact</span>
        <strong>{label}</strong>
        <small>Open full size ↗</small>
      </figcaption>
    </figure>
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
              <span>Healthcare research context</span>
              <p>Independent academic research using NYU Langone as the care setting. This is not an official NYU Langone product or commissioned engagement.</p>
            </div>
          </div>

          <div className="medimorpho-protected-intro__flag">
            <span aria-hidden="true" />
            Reviewer access granted
          </div>

          <div className="medimorpho-protected-intro__grid medimorpho-protected-intro__grid--report">
            <div>
              <p className="medimorpho-protected-intro__eyebrow">UX research case study · January–February 2024</p>
              <h2>Making healthcare easier to understand across language.</h2>
              <p className="cs-body-lg">
                The supplied five-page report documents the discovery and definition phase: ecosystem research, 20 interviews, affinity synthesis, a journey map, competitive analysis, and technical exploration.
              </p>
              <a className="medimorpho-report-link" href={REPORT_PDF} target="_blank" rel="noreferrer">
                Open original research report <span aria-hidden="true">↗</span>
              </a>
            </div>
            <figure className="medimorpho-source-visual">
              <img src={COVER_ILLUSTRATION} alt="Illustration from the supplied NYU Langone research report showing a patient speaking with a clinician." loading="eager" decoding="async" />
              <figcaption>Source artwork from the supplied research report</figcaption>
            </figure>
          </div>

          <dl className="medimorpho-project-brief" aria-label="Project brief">
            <div><dt>Challenge</dt><dd>Understand how language and cultural barriers intensify an already fragmented care journey.</dd></div>
            <div><dt>Phase</dt><dd>Discovery and definition—not a shipped product or validated final solution.</dd></div>
            <div><dt>Methods</dt><dd>Secondary research, competitive review, 20 interviews, affinity mapping, journey mapping, and technical research.</dd></div>
            <div><dt>Output</dt><dd>A focused problem statement, system map, research insights, and directions for a second research round.</dd></div>
          </dl>
        </div>
      </section>

      <CsSection
        id="cs-medimorpho-problem"
        label="01 · Problem framing"
        title="Fragmentation becomes harder when meaning is already at risk."
      >
        <div className="medimorpho-hmw">
          <span>How might we</span>
          <blockquote>
            Uplift the healthcare journey for patients with limited English proficiency in New York City, addressing language barriers and cultural nuances to ensure equitable access to healthcare services?
          </blockquote>
        </div>

        <div className="medimorpho-problem-statement">
          <span>Problem statement</span>
          <p>Navigating the fragmented U.S. healthcare system is challenging for patients with limited English proficiency.</p>
        </div>

        <div className="medimorpho-evidence-stats" aria-label="Secondary research context signals">
          {CONTEXT_STATS.map((stat) => (
            <article key={stat.value}>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
              <a href={stat.source} target="_blank" rel="noreferrer">Report source ↗</a>
            </article>
          ))}
        </div>

        <p className="medimorpho-source-note">These figures are context signals reproduced from the supplied 2024 report and its linked sources—not outcomes from the project.</p>

        <div className="medimorpho-system-grid">
          <div>
            <span className="medimorpho-section-kicker">The system around one visit</span>
            <h3>Communication sits inside a network of records, insurance, portals, pharmacies, and people.</h3>
            <ul>
              <li>Interpreter access can introduce additional waiting.</li>
              <li>Clinicians balance patient time with documentation and administration.</li>
              <li>Patients may have to reconstruct history across separated records.</li>
              <li>Notes and follow-up information may also need to reach caregivers.</li>
            </ul>
          </div>
          <ArtifactFigure
            src={SYSTEM_MAP}
            alt="System map from the supplied report connecting patients, clinicians, interpreters, records, insurance, pharmacies, and healthcare facilities."
            label="Healthcare system map"
            className="medimorpho-artifact--system"
          />
        </div>
      </CsSection>

      <CsSection
        id="cs-medimorpho-process"
        label="02 · Research process"
        title="Research narrowed many problems into one focused question."
      >
        <p className="cs-body-lg">
          The report places secondary, primary, and technical research inside the discovery phase, then uses synthesis to move toward a focused problem. Ideation and further validation were explicitly documented as next steps.
        </p>

        <div className="medimorpho-process-track" aria-label="Research process from the supplied report">
          <article data-state="complete"><span>01</span><small>Initiate</small><strong>Frame the broad challenge</strong></article>
          <article data-state="complete"><span>02</span><small>Discovery</small><strong>Secondary · primary · technical research</strong></article>
          <article data-state="complete"><span>03</span><small>Define</small><strong>Synthesize into a focused problem</strong></article>
          <article data-state="next"><span>04</span><small>Next</small><strong>Ideate possible service directions</strong></article>
          <article data-state="later"><span>05</span><small>Later</small><strong>Broaden and validate the research</strong></article>
        </div>
      </CsSection>

      <CsSection
        id="cs-medimorpho-secondary"
        label="03 · Secondary research"
        title="The team studied the ecosystem before proposing technology."
      >
        <p className="cs-body-lg">
          Reports, research papers, and existing products were used to understand structural healthcare challenges and to avoid treating language as an isolated interface problem.
        </p>

        <div className="medimorpho-secondary-grid">
          {SECONDARY_AREAS.map((area) => (
            <article key={area.index}>
              <span>{area.index}</span>
              <h3>{area.title}</h3>
              <p>{area.copy}</p>
            </article>
          ))}
        </div>

        <div className="medimorpho-competitive-block">
          <div>
            <span className="medimorpho-section-kicker">Competitive analysis</span>
            <h3>Products were compared through five service and feasibility lenses.</h3>
            <div className="medimorpho-competitive-lenses">
              {COMPETITIVE_LENSES.map((lens) => <span key={lens}>{lens}</span>)}
            </div>
          </div>
          <ArtifactFigure
            src={COMPETITIVE_ANALYSIS}
            alt="Competitive analysis tables from the supplied research report comparing healthcare and AI products."
            label="Competitive-analysis matrix"
          />
        </div>
      </CsSection>

      <CsSection
        id="cs-medimorpho-primary"
        label="04 · Primary research"
        title="Twenty interviews connected communication to navigation."
      >
        <p className="cs-body-lg">
          The objective was to identify communication and navigation challenges faced by non-native speakers and by healthcare professionals working with patients who have limited English proficiency.
        </p>

        <CsStatGrid
          stats={[
            { value: '20', label: 'Total interviews' },
            { value: '16', label: 'Non-native speakers with U.S. care experience' },
            { value: '4', label: 'Healthcare professionals treating LEP patients' },
            { value: '5', label: 'Interview-question categories' },
          ]}
        />

        <div className="medimorpho-research-methods">
          <div>
            <span className="medimorpho-section-kicker">Interview objective</span>
            <p>Understand where communication and system navigation break down during the process of seeing a healthcare provider.</p>
          </div>
          <div>
            <span className="medimorpho-section-kicker">Question categories</span>
            <ul>{QUESTION_CATEGORIES.map((category) => <li key={category}>{category}</li>)}</ul>
          </div>
        </div>

        <div className="medimorpho-artifact-grid">
          <ArtifactFigure
            src={AFFINITY_MAP}
            alt="Affinity map from the supplied report grouping interview notes into communication, note-taking, insurance, and digital-health themes."
            label="Affinity map"
          />
          <ArtifactFigure
            src={JOURNEY_MAP}
            alt="Journey map from the supplied report following an LEP patient through appointments, in-person care, pharmacy, and post-visit care."
            label="Patient journey map"
          />
        </div>

        <div className="medimorpho-takeaway-head">
          <span>Four synthesized takeaways</span>
          <p>Aggregated themes only; participant identities and raw interview notes remain private.</p>
        </div>
        <div className="medimorpho-affinity" aria-label="Primary research takeaways">
          {TAKEAWAYS.map((theme) => (
            <article className="medimorpho-affinity__card" key={theme.index}>
              <span>{theme.index}</span>
              <h3>{theme.title}</h3>
              <p>{theme.copy}</p>
            </article>
          ))}
        </div>
      </CsSection>

      <CsSection
        id="cs-medimorpho-technical"
        label="05 · Technical research"
        title="Feasibility was explored before a product direction was chosen."
      >
        <p className="cs-body-lg">
          The report surveys six technical areas and representative tools. This is an opportunity scan—not evidence that a production system, clinical feature, or validated architecture was built.
        </p>

        <div className="medimorpho-tech-grid">
          {TECH_EXPLORATIONS.map((item, index) => (
            <article key={item.title}>
              <div className="medimorpho-tech-grid__head">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <small>{item.group}</small>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <div className="medimorpho-tech-grid__tools">
                {item.tools.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
              <div className="medimorpho-tech-grid__use"><span>Potential use</span><p>{item.use}</p></div>
            </article>
          ))}
        </div>
      </CsSection>

      <CsSection
        id="cs-medimorpho-next"
        label="06 · Research boundary"
        title="The honest outcome was a sharper next research round."
      >
        <div className="medimorpho-next-step">
          <div>
            <span>Documented next step</span>
            <h3>Move from research into ideation, then broaden validation.</h3>
          </div>
          <div>
            <p>The report proposes ideating possible solutions and conducting a second round of quantitative and qualitative research.</p>
            <p>That next round would include a broader demographic of LEP patients who have experienced New York’s fragmented healthcare services.</p>
          </div>
        </div>

        <div className="medimorpho-boundary-note" role="note">
          <span>Case-study boundary</span>
          <p>The supplied report does not document a final interface, prototype test, launch, or measured product outcome. This page therefore ends at research synthesis and technical exploration instead of inventing a later-stage result.</p>
        </div>

        <a className="medimorpho-report-link medimorpho-report-link--light" href={REPORT_PDF} target="_blank" rel="noreferrer">
          Review the complete five-page source report <span aria-hidden="true">↗</span>
        </a>
      </CsSection>

      <BottomNav
        sections={[
          { id: 'cs-medimorpho-overview', label: 'Overview' },
          { id: 'cs-medimorpho-problem', label: 'Problem' },
          { id: 'cs-medimorpho-process', label: 'Process' },
          { id: 'cs-medimorpho-primary', label: 'Interviews' },
          { id: 'cs-medimorpho-technical', label: 'Technical' },
          { id: 'cs-medimorpho-next', label: 'Next' },
        ]}
        placement="side"
      />
    </div>
  )
}
