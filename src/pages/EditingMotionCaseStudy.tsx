import { Helmet } from 'react-helmet-async'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectHeader from '../components/case-study/ProjectHeader'
import ProjectOverview from '../components/case-study/ProjectOverview'
import CsSection from '../components/case-study/CsSection'
import CsBody from '../components/case-study/CsBody'
import CsInfoGrid from '../components/case-study/CsInfoGrid'
import NextProject from '../components/case-study/NextProject'
import BottomNav from '../components/case-study/BottomNav'
import '../styles/editing-motion.css'

const films = [
  {
    key: 'enigma',
    title: 'Enigma',
    subtitle: 'Make invisible computation visible',
    src: 'https://player.vimeo.com/video/895893649?h=d78737dcdb&title=0&byline=0&portrait=0&dnt=1',
    href: '/enigma',
    note: 'Explanatory edit · gesture → signal → prediction',
    featured: true,
  },
  {
    key: 'omakase',
    title: 'The Omakase',
    subtitle: 'Turn a physical game into immediate competition',
    src: 'https://player.vimeo.com/video/996020990?title=0&byline=0&portrait=0&dnt=1',
    href: '/the-omakase',
    note: 'Kinetic demo · hands → screen → opponent → score',
  },
  {
    key: 'time',
    title: 'Making of Time',
    subtitle: 'Connect three objects through one idea',
    src: 'https://player.vimeo.com/video/1010457989?title=0&byline=0&portrait=0&dnt=1',
    href: '/making-of-time',
    note: 'Process film · shadow → escapement → software',
  },
  {
    key: 'drowning',
    title: 'Drowning',
    subtitle: 'Let the room become the emotional argument',
    src: 'https://player.vimeo.com/video/1026164956?title=0&byline=0&portrait=0&dnt=1',
    href: '/drowning',
    note: 'Atmospheric edit · threshold → texture → body → enclosure',
  },
]

const workflows = [
  ['01', 'Ingest by story function', 'Separate gestures, details, environments, reactions, and proof shots. Shoot day is metadata; editorial purpose is the bin structure.'],
  ['02', 'Build a selects stringout', 'Keep the cleanest action, the clearest consequence, and the most human response. Near-duplicates go before music enters the timeline.'],
  ['03', 'Write the paper edit', 'Reduce the film to one sentence, then arrange four to six beats that make that sentence visible without explanatory padding.'],
  ['04', 'Cut for cause and effect', 'Show the input before the system response, the rule before the payoff, and the spatial context before close detail.'],
  ['05', 'Design sound and graphics', 'Use sound bridges to preserve continuity and motion graphics only where footage cannot communicate state, sequence, or context alone.'],
  ['06', 'Version from one master', 'Lock the narrative spine once, then build shorter, vertical, captioned, and sound-off outputs without changing the core claim.'],
]

const anatomies = [
  {
    key: 'enigma',
    title: 'Enigma',
    image: '/Assets/Projects/Enigma/photos/tablet-input.jpg',
    alt: 'A visitor drawing a letter on the Enigma input tablet',
    thesis: 'Cause before spectacle',
    body: 'The light sculpture is visually rich, but a beauty montage would hide the idea. The edit begins with the hand-drawn input, follows the activation through the physical network, and only then earns the wide hero shot.',
    beats: ['Draw', 'Travel', 'Resolve', 'React'],
  },
  {
    key: 'omakase',
    title: 'The Omakase',
    image: '/Assets/Projects/the-omakase/photos/head-to-head-match.webp',
    alt: 'Two players competing head to head at The Omakase arcade cabinet',
    thesis: 'Action before explanation',
    body: 'The film teaches the game through repeated visual relationships: colored order, matching button, physical press, score change, opponent response. Reaction shots are the punctuation—not decoration.',
    beats: ['Order', 'Press', 'Score', 'Compete'],
  },
  {
    key: 'time',
    title: 'Making of Time',
    image: '/Assets/Projects/making-of-time/photos/blue-dial-hero.webp',
    alt: 'Blue mechanical watch dial photographed for Making of Time',
    thesis: 'Match ideas, not objects',
    body: 'A sundial, watch movement, and software clock do not share a literal shape. The cut connects them through rhythm: shadow advances, an escapement releases, and a color field updates.',
    beats: ['Shadow', 'Tick', 'Measure', 'Transform'],
  },
  {
    key: 'drowning',
    title: 'Drowning',
    image: '/Assets/Projects/Drowning/photos/WhatsApp Image 2024-10-10 at 11.54.18.webp',
    alt: 'The Drowning greenhouse set illuminated during performance',
    thesis: 'Restraint creates pressure',
    body: 'The performance edit holds longer than the product films. Wide frames establish the greenhouse as a room; material details and bodies arrive gradually so enclosure is felt before it is explained.',
    beats: ['Enter', 'Observe', 'Compress', 'Hold'],
  },
]

const editTracks = [
  { label: 'V3 · TYPE / STATE', clips: ['OPEN', '', 'CONTEXT', '', 'END CARD'] },
  { label: 'V2 · INSERTS', clips: ['', 'DETAIL', 'UI / ACTION', 'REACTION', ''] },
  { label: 'V1 · STORY', clips: ['PROMISE', 'INPUT', 'SYSTEM', 'PAYOFF', 'RESOLVE'] },
  { label: 'A2 · SOUND DESIGN', clips: ['ROOM', 'GESTURE', 'MECHANISM', 'IMPACT', 'TAIL'] },
  { label: 'A1 · SYNC / MUSIC', clips: ['SYNC', 'BED', 'BED', 'BED', 'MIX'] },
]

function SelectedFilms() {
  return (
    <div className="editing-film-grid">
      {films.map((film) => (
        <figure className={`editing-film${film.featured ? ' is-featured' : ''}`} key={film.key}>
          <div className="editing-film__player">
            <iframe
              src={film.src}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title={`${film.title} project film`}
            />
          </div>
          <figcaption>
            <div><span>{film.title}</span><strong>{film.subtitle}</strong></div>
            <small>{film.note}</small>
            <a href={film.href}>Open full project ↗</a>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function EditorialWorkflow() {
  return (
    <div className="editing-workflow">
      {workflows.map(([num, title, body]) => (
        <article key={num}><span>{num}</span><h3>{title}</h3><p>{body}</p></article>
      ))}
    </div>
  )
}

function EditAnatomies() {
  return (
    <div className="editing-anatomy-grid">
      {anatomies.map((item) => (
        <article className={`editing-anatomy editing-anatomy--${item.key}`} key={item.key}>
          <div className="editing-anatomy__image"><img src={item.image} alt={item.alt} loading="lazy" /></div>
          <div className="editing-anatomy__copy">
            <small>{item.title}</small><h3>{item.thesis}</h3><p>{item.body}</p>
            <div className="editing-anatomy__beats" aria-label={`${item.title} edit beats`}>
              {item.beats.map((beat, index) => <span key={beat}>{beat}{index < item.beats.length - 1 && <i aria-hidden="true">→</i>}</span>)}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

function EditorialTimeline() {
  return (
    <div className="editing-timeline" aria-label="Documented Premiere Pro master sequence">
      <header><span>SELECTED_FILMS_MASTER_v12</span><time>00:00:28:12</time></header>
      <div className="editing-timeline__ruler"><span>00:00</span><span>00:06</span><span>00:12</span><span>00:18</span><span>00:24</span><span>00:30</span></div>
      <div className="editing-timeline__playhead" aria-hidden="true" />
      {editTracks.map((track) => (
        <div className="editing-track" key={track.label}>
          <strong>{track.label}</strong>
          <div>{track.clips.map((clip, index) => <i className={clip ? '' : 'is-empty'} key={`${track.label}-${index}`}>{clip && <span>{clip}</span>}</i>)}</div>
        </div>
      ))}
    </div>
  )
}

function ProductionMaps() {
  const premiereRows = [
    ['01_INGEST', 'Camera originals · phone footage · screen records', 'Source'],
    ['02_SELECTS_ACTION', 'Gestures · controls · reactions · proof', 'Stringout'],
    ['03_SELECTS_DETAIL', 'Materials · interfaces · mechanisms · light', 'Stringout'],
    ['10_STORY_MASTER', 'Promise · input · system · payoff · resolve', 'Sequence'],
    ['20_AUDIO', 'Sync · room tone · effects · music · mix', 'Sequence'],
    ['90_DELIVERY', 'Master · captions · vertical · cutdowns', 'Versions'],
  ]
  const afterEffectsRows = [
    ['00_GFX_MASTER', 'Title-safe guides · global type controls', 'Master'],
    ['01_STATE_LABELS', 'Input · process · output · outcome', 'Pre-comp'],
    ['02_SCREEN_COMPOSITES', 'Track · mask · replace · grade match', 'Pre-comp'],
    ['03_CLEANUP', 'Stabilize · remove distractions · isolate light', 'Pre-comp'],
    ['90_MOGRT_EXPORT', 'Editable title and end-card controls', 'Template'],
  ]

  const stack = (title: string, note: string, rows: string[][], color: string) => (
    <div className="editing-production-stack">
      <header><span>{title}</span><small>{note}</small></header>
      {rows.map(([name, contents, kind], index) => (
        <div className="editing-production-stack__row" key={name}>
          <i style={{ '--track-color': index === 0 ? color : index === rows.length - 1 ? '#8f8f98' : '#64646e' } as React.CSSProperties} />
          <code>{name}</code><span>{contents}</span><small>{kind}</small>
        </div>
      ))}
    </div>
  )

  return <div className="editing-production-grid">{stack('Premiere Pro project map', 'Editorial master', premiereRows, '#9999ff')}{stack('After Effects project map', 'Graphics and finish', afterEffectsRows, '#6fd6ff')}</div>
}

export default function EditingMotionCaseStudy() {
  return (
    <>
      <Helmet>
        <title>Cutting Systems into Stories · Motion Design · Parth Pawar</title>
        <meta name="description" content="A video-editing case study across Enigma, The Omakase, Making of Time, and Drowning—covering selects, story structure, pacing, sound, motion graphics, and delivery." />
        <meta property="og:title" content="Cutting Systems into Stories · Parth Pawar" />
        <meta property="og:description" content="How four project films were shaped through editorial structure, pacing, sound, and motion graphics." />
        <meta property="og:image" content="https://designwhich.works/Assets/mockups/projects/enigma_16x9.webp" />
        <link rel="canonical" href="https://designwhich.works/motion/editing-motion-stories" />
      </Helmet>
      <Nav />
      <main id="main-content" className="project-main motion-project-main editing-motion-main">
        <ProjectHeader
          backLink="/motion"
          backLabel="Back to Motion"
          categorySlug="creative-tech"
          tags={['Video editing', 'Editorial direction', 'Motion graphics']}
          title="Cutting Systems into Stories"
          subtitle="How Enigma, The Omakase, Making of Time, and Drowning became films—not documentation dumps"
          info={[
            { label: 'Role', value: 'Editor · Director · Motion designer' },
            { label: 'Years', value: '2023–25' },
            { label: 'Tools', value: 'Premiere Pro · After Effects · Audition · Media Encoder' },
            { label: 'Scope', value: 'Selects · story edit · sound · graphics · finish · delivery' },
          ]}
          heroExperience="visual"
          heroEyebrow="Selected editorial practice"
          visualHeadline="A good project film reveals the idea before it asks for attention."
          visualHeroImage="/Assets/mockups/projects/enigma_16x9.webp"
          visualHeroAlt="Enigma neural-network sculpture illuminated in a dark exhibition space"
          heroTone="motion"
          showHeaderSummary={false}
        />

        <ProjectOverview sections={[
          { label: 'The challenge', content: 'Interactive objects, installations, and performances are difficult to understand through a beauty reel alone. Each film needed to explain what changes, why it matters, and how it feels—without slowing into a tutorial.' },
          { label: 'Editorial direction', content: 'Find the decisive cause-and-effect loop in each project, build the edit around that loop, then let pacing, sound, inserts, and graphics protect comprehension.' },
          { label: 'The system', content: 'One repeatable workflow moves from labeled footage and a paper edit into a Premiere master, focused After Effects comps, an intentional mix, and reusable delivery versions.' },
        ]} />

        <CsSection id="editing-brief" label="01 — Editorial brief" title="Do not summarize the whole project. Find the one transformation the viewer must understand.">
          <CsBody>
            <p>Every project contains too much material: build footage, screens, interactions, details, exhibition coverage, and final hero shots. The editorial job is subtraction. Each film receives one sentence, one visual transformation, and a shot hierarchy that earns the payoff.</p>
          </CsBody>
          <div className="editing-brief-grid">
            {[
              ['Subject', 'Interactive systems, physical objects, installation, and performance'],
              ['Audience', 'A viewer meeting the work for the first time—often on a small screen'],
              ['Editorial job', 'Make input, behavior, and consequence readable before adding atmosphere'],
              ['Delivery reality', 'Portfolio master, sound-off playback, embeds, social crops, and captions'],
            ].map(([label, value], index) => <article key={label}><span>0{index + 1}</span><small>{label}</small><p>{value}</p></article>)}
          </div>
          <div className="editing-thesis"><small>Working rule</small><strong>If a cut does not clarify cause, increase feeling, or preserve rhythm, it leaves the sequence.</strong></div>
        </CsSection>

        <CsSection id="selected-films" label="02 — Selected films" title="Four subjects. Four editorial rhythms. One commitment to clarity.">
          <CsBody><p>The films are presented in full before the breakdown. Enigma and Omakase lead because they show the range most relevant to product storytelling: one makes a hidden system legible; the other makes physical interaction feel immediate.</p></CsBody>
          <SelectedFilms />
        </CsSection>

        <CsSection id="editing-process" label="03 — Editing process" title="From footage to a sentence, then from a sentence to a sequence.">
          <CsBody><p>The process begins before the timeline looks impressive. Footage is organized by what it communicates, near-duplicates are removed, and the story is tested without titles or music. Polish arrives after causality works.</p></CsBody>
          <EditorialWorkflow />
        </CsSection>

        <CsSection id="edit-anatomy" label="04 — Edit anatomy" title="The cut rule changes with the subject.">
          <CsBody><p>Fast is not a style. Enigma needs the latency of a system response, Omakase needs competitive pressure, Making of Time needs associative rhythm, and Drowning needs duration. The edit earns its pace from the idea.</p></CsBody>
          <EditAnatomies />
        </CsSection>

        <CsSection id="premiere-map" label="05 — Premiere Pro sequence" title="The timeline is arranged by narrative responsibility, not visual novelty.">
          <CsBody><p>The story track stays continuous. Inserts explain action without replacing spatial context; titles name only what footage cannot; sound begins before and ends after cuts to prevent the sequence from feeling like disconnected clips.</p></CsBody>
          <EditorialTimeline />
          <div className="editing-cut-notes">
            {[
              ['J-cuts', 'Introduce mechanism, room, or crowd sound before the matching image so transitions feel motivated.'],
              ['L-cuts', 'Let reactions, mechanical tails, and atmosphere continue after the picture changes to preserve consequence.'],
              ['Insert discipline', 'Use detail shots to explain a gesture or state—not to hide a weak story transition.'],
              ['Proof holds', 'Hold on prediction, score, mechanism, or final spatial state long enough for the viewer to verify it.'],
            ].map(([title, body]) => <article key={title}><strong>{title}</strong><p>{body}</p></article>)}
          </div>
        </CsSection>

        <CsSection id="post-production" label="06 — Post-production system" title="Premiere owns the story. After Effects solves the shots that need intervention.">
          <CsBody><p>Keeping responsibilities separate prevents endless round-tripping. Premiere holds selects, structure, sync, pacing, and the mix. After Effects receives only tracked screens, cleanup shots, state labels, title modules, and the end card.</p></CsBody>
          <ProductionMaps />
          <div className="editing-tool-grid">
            <article><span>Pr</span><div><strong>Editorial spine</strong><p>Ingest, selects, paper-edit assembly, pacing, multicam and sync, captions, audio layout, and version sequences.</p></div></article>
            <article><span>Ae</span><div><strong>Motion and composites</strong><p>Screen replacements, tracked labels, stabilization, cleanup, light isolation, title behavior, and reusable end cards.</p></div></article>
            <article><span>Au</span><div><strong>Audio repair and mix</strong><p>Noise reduction, dialogue cleanup, mechanism emphasis, room-tone continuity, EQ, and loudness-aware masters.</p></div></article>
          </div>
        </CsSection>

        <CsSection id="delivery" label="07 — Sound, color & delivery" title="Finish for the way the film will actually be watched.">
          <CsBody><p>The master is not the final deliverable; it is the source of a family. Captions, safe zones, smaller-screen legibility, audio normalization, thumbnail frames, and platform compression are planned before export rather than repaired afterward.</p></CsBody>
          <CsInfoGrid items={[
            { key: 'Sound', value: 'Sync cleanup · room tone · designed actions · music edit · loudness pass' },
            { key: 'Color', value: 'Shot matching · exposure continuity · selective saturation · display-safe contrast' },
            { key: 'Graphics', value: 'Opening promise · state label · minimal annotation · stable end card' },
            { key: 'Masters', value: '16:9 portfolio · captioned · sound-off · 4:5 · 9:16 · short cutdown' },
          ]} />
          <ul className="motion-output-list">
            {['Narrative portfolio films', 'Project demo cutdowns', 'Captioned and sound-off versions', 'Responsive social masters'].map((output) => <li key={output}>{output}<span aria-hidden="true">↗</span></li>)}
          </ul>
        </CsSection>

        <CsSection id="authorship" label="08 — Scope & authorship" title="The edit is mine; the projects remain collaborative where collaboration exists.">
          <CsBody>
            <p>This case study documents my editorial reasoning, assembly, motion-graphics, sound, and delivery practice across project films built from my work. It does not imply that every camera angle, performance, fabrication task, or collaborator contribution was solo. The full project pages linked above preserve the broader project context and credits.</p>
          </CsBody>
        </CsSection>

        <NextProject slug="motion/vishwa-conclave-motion" title="VishwaConclave: An event identity in motion" image="/Assets/mockups/projects/vishwaconclave_16x9.webp" />
        <BottomNav sections={[
          { id: 'editing-brief', label: 'Brief' },
          { id: 'selected-films', label: 'Films' },
          { id: 'editing-process', label: 'Process' },
          { id: 'edit-anatomy', label: 'Anatomy' },
          { id: 'premiere-map', label: 'Timeline' },
          { id: 'post-production', label: 'Post' },
          { id: 'delivery', label: 'Delivery' },
        ]} />
      </main>
      <Footer />
    </>
  )
}
