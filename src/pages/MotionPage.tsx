import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import transfiMotion from '../../Assets/Projects/cover/Transfi.gif'
import '../styles/motion.css'

type ProjectKey = 'clawed' | 'mentra' | 'transfi'

type MotionProject = {
  key: ProjectKey
  path: string
  index: string
  title: string
  shortTitle: string
  descriptor: string
  discipline: string
  year: string
  color: string
  intro: string
  truthNote: string
  challenge: string
  move: string
  outcome: string
  roles: string[]
  beats: Array<{ time: string; title: string; body: string }>
  principles: Array<{ label: string; value: string; note: string }>
  aeBuild: Array<{ layer: string; technique: string; purpose: string }>
  outputs: string[]
}

const projects: MotionProject[] = [
  {
    key: 'clawed',
    path: 'clawed-agent-story',
    index: '01',
    title: 'Clawed: From intent to action',
    shortTitle: 'Clawed',
    descriptor: 'An AI product story that turns an invisible agent workflow into four legible beats.',
    discipline: 'Product motion / GTM story',
    year: '2026',
    color: '#ff4b32',
    intro:
      'Clawed can deploy an AI agent in 30 seconds, but speed alone is not the story. The motion system makes the trust model visible: ask, plan, approve, receive proof.',
    truthNote:
      'A self-directed motion extension of the Clawed product and launch system I designed. The interface, 3D object, positioning, and safety model are from the shipped product work; this motion study was created for this portfolio.',
    challenge:
      'AI agents do important work off-screen. A launch film can easily become either abstract hype or a dense product demo. The story needed to feel fast while keeping user control visible.',
    move:
      'I reduced the workflow to a four-beat verb sequence and gave each beat one spatial job. The claw carries intent forward; interface cards stage decisions; the receipt lands as the final proof.',
    outcome:
      'One narrative grammar can now scale from a six-second social sting to a 30-second product explainer without changing the meaning of the product.',
    roles: ['Concept', 'Storyboard', 'Motion direction', 'Product design', '3D art direction'],
    beats: [
      { time: '00:00', title: 'Ask', body: 'Begin on a human prompt, not an AI spectacle.' },
      { time: '00:03', title: 'Plan', body: 'The claw travels; the system exposes what it understood.' },
      { time: '00:07', title: 'Approve', body: 'Motion slows at the decision point so control is unmistakable.' },
      { time: '00:11', title: 'Receipt', body: 'The action resolves into a durable, auditable record.' },
    ],
    principles: [
      { label: 'Pacing', value: 'Fast → held → resolved', note: 'Energy around the work, calm around consent.' },
      { label: 'Hierarchy', value: 'One verb per beat', note: 'Every frame should read before the next arrives.' },
      { label: 'Depth', value: '2D UI + 3D signal', note: 'The object adds character; the interface keeps the story true.' },
    ],
    aeBuild: [
      { layer: 'CTRL_MASTER', technique: 'Expression controls', purpose: 'One panel drives color, copy, duration, safe areas, and format switches.' },
      { layer: 'VERB_SYSTEM', technique: 'Text animators + Graph Editor', purpose: 'ASK, PLAN, APPROVE, and DONE share one rig while the approval beat receives a longer hold.' },
      { layer: 'CLAW_3D_PASS', technique: '3D compositing + camera', purpose: 'The rendered claw adds character and depth without competing with the product interface.' },
      { layer: 'UI_RECEIPTS', technique: 'Shape layers + track mattes', purpose: 'Request, approval, and receipt cards enter as readable product evidence.' },
    ],
    outputs: ['6s launch sting', '15s social cut', '30s product story', '1:1 / 4:5 / 16:9 masters'],
  },
  {
    key: 'mentra',
    path: 'mentra-motion-language',
    index: '02',
    title: 'Mentra: A brand that becomes the product',
    shortTitle: 'Mentra',
    descriptor: 'A modular motion language connecting the mark, the glasses, and the world around them.',
    discipline: 'Brand motion / Launch system',
    year: '2025–26',
    color: '#00c978',
    intro:
      'Mentra already had a strong visual rule: a folded form that can read as a mark, an object, or a frame in space. Motion turns that rule into a repeatable launch language.',
    truthNote:
      'Built from the shipped Mentra identity, packaging, render library, and logo-animation frames I created as the sole brand designer. This page develops those assets into a documented motion system.',
    challenge:
      'The brand had to travel across hardware launches, developer news, social posts, packaging, and creator content without becoming a different visual idea on every surface.',
    move:
      'The mark never simply fades on. It assembles, folds, and reveals. That behavior mirrors the physical glasses and gives every transition a shared origin, even when the content changes.',
    outcome:
      'A small motion kit gives a fast-moving team recognizable openings, transitions, product reveals, and end cards without asking every asset to be art-directed from zero.',
    roles: ['Brand system', 'Motion principles', 'Storyboard', '3D direction', 'Template logic'],
    beats: [
      { time: '01', title: 'Fragment', body: 'Begin with one green plane: a clue, not a logo.' },
      { time: '02', title: 'Assemble', body: 'Additional planes arrive with shared direction and stagger.' },
      { time: '03', title: 'Transform', body: 'The same geometry becomes the glasses silhouette.' },
      { time: '04', title: 'Reveal', body: 'The product enters only after the visual rule is understood.' },
    ],
    principles: [
      { label: 'Geometry', value: 'Fold, do not dissolve', note: 'Transitions inherit the angles of the identity.' },
      { label: 'Color', value: 'Green earns attention', note: 'Neutral space keeps the product precise and technical.' },
      { label: 'Repeatability', value: '3-beat modules', note: 'Open, explain, sign off: reusable across launch formats.' },
    ],
    aeBuild: [
      { layer: 'MARK_RIG', technique: 'Shape layers + parenting', purpose: 'Every green plane shares the same directional logic, anchor behavior, and fold angle.' },
      { layer: 'OBJECT_REVEAL', technique: 'Pre-comps + track mattes', purpose: 'The mark becomes the glasses through a continuous geometric reveal instead of a decorative dissolve.' },
      { layer: 'PRODUCT_PASS', technique: 'Time remapping + compositing', purpose: 'Render timing can change without rebuilding the surrounding typography and end card.' },
      { layer: 'MOGRT_OUTPUT', technique: 'Essential Graphics', purpose: 'Launch name, date, CTA, product color, and crop can be versioned safely in Premiere.' },
    ],
    outputs: ['Logo ident', 'Product reveal', 'Social opener', 'End-card system', 'Creator templates'],
  },
  {
    key: 'transfi',
    path: 'transfi-identity-motion',
    index: '03',
    title: 'TransFi: Trust at transaction speed',
    shortTitle: 'TransFi',
    descriptor: 'An identity-in-motion study that carries one folded form from brand signal to product proof.',
    discipline: 'Identity motion / Product launch',
    year: '2022',
    color: '#48d8ff',
    intro:
      'Cross-border payments are complex by default. The motion direction uses one clear folded form to orient the viewer, then lets the interface and transaction states carry the evidence.',
    truthNote:
      'The animated TransFi mark and product interface are from my original TransFi design work. This case study reframes those existing artifacts as a concise GTM motion sequence.',
    challenge:
      'Fintech motion often adds velocity without adding understanding. The real need was to connect a memorable identity to dense merchant tooling without making money movement feel careless.',
    move:
      'The mark folds into place first, establishing direction. Product surfaces then enter on the same vector, while numbers and status changes settle instead of bounce.',
    outcome:
      'Brand energy and product credibility live in the same edit: a recognizable opening, a calm interface reveal, and a clean transaction resolution.',
    roles: ['Identity design', 'Motion study', 'Product design', 'Art direction', 'GTM framing'],
    beats: [
      { time: '00:00', title: 'Signal', body: 'The folded mark creates a fast, ownable opening.' },
      { time: '00:02', title: 'Route', body: 'Its direction becomes the path into the product.' },
      { time: '00:05', title: 'Explain', body: 'The dashboard arrives in layers, ordered by decision priority.' },
      { time: '00:09', title: 'Settle', body: 'The transaction state resolves without celebratory noise.' },
    ],
    principles: [
      { label: 'Rhythm', value: 'Directional, not frantic', note: 'Speed is carried by vectors, not constant cutting.' },
      { label: 'Data', value: 'Settle with confidence', note: 'Financial states use restrained easing and clear endpoints.' },
      { label: 'Continuity', value: 'Mark → route → UI', note: 'One movement connects identity and product.' },
    ],
    aeBuild: [
      { layer: 'IDENT_FOLD', technique: 'Vector paths + Graph Editor', purpose: 'The identity assembles with precise speed curves and a firm, non-elastic settle.' },
      { layer: 'ROUTE_LINE', technique: 'Trim Paths + expressions', purpose: 'One directional control connects the mark, transaction path, and interface reveal.' },
      { layer: 'DASHBOARD_UI', technique: 'Pre-comps + null controls', purpose: 'Dense product surfaces reveal by decision priority rather than moving as one flat screenshot.' },
      { layer: 'DELIVERY_SET', technique: 'Responsive comps', purpose: 'Protected title and UI zones survive 16:9, 4:5, 1:1, and 9:16 crops.' },
    ],
    outputs: ['Identity sting', 'Dashboard reveal', 'Transaction explainer', 'Social launch loop'],
  },
]

const motionBenchmarks = [
  {
    studio: 'BUCK × Zapier',
    principle: 'Begin with product truth.',
    note: 'A motion library becomes memorable when every visual metaphor explains a real capability, not just a brand mood.',
    href: 'https://buck.co/work/zapier-motion-library',
  },
  {
    studio: 'Pentagram × Intrinsic',
    principle: 'Let the product define the behavior.',
    note: 'Kinematic movement from the robotics platform becomes the identity’s motion rule, connecting expression to function.',
    href: 'https://www.pentagram.com/work/intrinsic',
  },
  {
    studio: 'Studio Dumbar × Instagram',
    principle: 'Use one system across product and marketing.',
    note: 'A flexible motion language can feel expressive in campaigns and still remain balanced inside a product experience.',
    href: 'https://www.linkedin.com/posts/studio-dumbar_finally-after-1-year-in-the-works-we-can-activity-7173255502540197888-h47P',
  },
  {
    studio: 'Variable × Hebbia',
    principle: 'Scale with tools, not a static deck.',
    note: 'Presets, controlled variation, and an approachable motion tool make a dynamic identity usable beyond its original makers.',
    href: 'https://variable.io/hebbia-motion-tool/',
  },
]

function useMotionControl() {
  const [motionOn, setMotionOn] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = (event: MediaQueryListEvent) => setMotionOn(!event.matches)
    preference.addEventListener('change', syncPreference)
    return () => preference.removeEventListener('change', syncPreference)
  }, [])

  return { motionOn, setMotionOn }
}

function MotionControl({ motionOn, onToggle }: { motionOn: boolean; onToggle: () => void }) {
  return (
    <button
      className="motion-control"
      type="button"
      onClick={onToggle}
      aria-pressed={!motionOn}
      aria-label={motionOn ? 'Pause motion on this page' : 'Play motion on this page'}
    >
      <span className="motion-control__icon" aria-hidden="true">
        {motionOn ? <><i /><i /></> : <b />}
      </span>
      <span>{motionOn ? 'Pause motion' : 'Play motion'}</span>
    </button>
  )
}

function ClawedReel({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`motion-reel motion-reel--clawed${compact ? ' is-compact' : ''}`} role="img" aria-label="Animated Clawed product story moving through ask, plan, approve, and receipt">
      <div className="motion-reel__grid" aria-hidden="true" />
      <div className="clawed-reel__verbs" aria-hidden="true">
        <span>ASK.</span><span>PLAN.</span><span>APPROVE.</span><span>DONE.</span>
      </div>
      <img className="clawed-reel__object" src="/Assets/Projects/Clawed.chat/claw-3d.png" alt="" />
      <div className="clawed-reel__card clawed-reel__card--request" aria-hidden="true">
        <small>INCOMING</small><strong>Prepare launch brief</strong><em>Understood</em>
      </div>
      <div className="clawed-reel__card clawed-reel__card--receipt" aria-hidden="true">
        <small>RECEIPT 024</small><strong>Brief ready</strong><em>Approved by you</em>
      </div>
      <div className="motion-reel__timecode" aria-hidden="true">00:00:12:00</div>
    </div>
  )
}

function MentraReel({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`motion-reel motion-reel--mentra${compact ? ' is-compact' : ''}`} role="img" aria-label="Animated Mentra brand system transforming between mark, glasses, and product">
      <div className="mentra-reel__word" aria-hidden="true"><span>MARK</span><span>OBJECT</span><span>WORLD</span></div>
      <div className="mentra-reel__frames" aria-hidden="true">
        <img src="/Assets/Projects/mentra-brand/photos/logo-animation-5.png" alt="" />
        <img src="/Assets/Projects/mentra-brand/photos/logo-animation-1.png" alt="" />
        <img src="/Assets/Projects/mentra-brand/photos/logo-animation-3.png" alt="" />
      </div>
      <img className="mentra-reel__product" src="/Assets/Projects/mentra-brand/photos/render-transparent-full.webp" alt="" />
      <div className="motion-reel__timecode" aria-hidden="true">M / 03 BEATS</div>
    </div>
  )
}

function TransfiReel({ motionOn, compact = false }: { motionOn: boolean; compact?: boolean }) {
  return (
    <div className={`motion-reel motion-reel--transfi${compact ? ' is-compact' : ''}`} role="img" aria-label="TransFi animated identity connecting a folded mark to product dashboards">
      <div className="transfi-reel__glow" aria-hidden="true" />
      <div className="transfi-reel__mark" aria-hidden="true">
        <img
          src={motionOn ? transfiMotion : '/Assets/mockups/projects/transfi-project_16x9.webp'}
          alt=""
        />
      </div>
      <img className="transfi-reel__ui" src="/Assets/Projects/Transfi/public/Customer dashboard Users.png" alt="" aria-hidden="true" />
      <div className="transfi-reel__route" aria-hidden="true"><i /><i /><i /></div>
      <div className="motion-reel__timecode" aria-hidden="true">TRUST / IN MOTION</div>
    </div>
  )
}

function ProjectReel({ project, motionOn, compact = false }: { project: MotionProject; motionOn: boolean; compact?: boolean }) {
  if (project.key === 'clawed') return <ClawedReel compact={compact} />
  if (project.key === 'mentra') return <MentraReel compact={compact} />
  return <TransfiReel motionOn={motionOn} compact={compact} />
}

function MotionWordmark() {
  return (
    <div className="motion-wordmark" aria-hidden="true">
      <span>M</span><span>O</span><span>T</span><span>I</span><span>O</span><span>N</span>
    </div>
  )
}

function MotionBenchmark() {
  return (
    <section className="motion-benchmark motion-shell reveal" aria-labelledby="motion-benchmark-title">
      <div className="motion-benchmark__heading">
        <p className="motion-section-label">Benchmark study / 04 references</p>
        <div>
          <h2 id="motion-benchmark-title">What the best motion work proves.</h2>
          <p>I studied motion systems made for product launches, technology brands, and high-output teams. Four patterns became the bar for these case studies.</p>
        </div>
      </div>
      <div className="motion-benchmark__grid">
        {motionBenchmarks.map((reference, index) => (
          <a key={reference.studio} href={reference.href} target="_blank" rel="noreferrer">
            <span>0{index + 1}</span>
            <small>{reference.studio}</small>
            <h3>{reference.principle}</h3>
            <p>{reference.note}</p>
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </div>
      <p className="motion-benchmark__takeaway"><span>Applied here</span> Product truth shapes the movement. Each project has one recognizable behavior, a documented system, an editable production structure, and a family of social outputs.</p>
    </section>
  )
}

function AfterEffectsProduction() {
  const aeSkills = [
    ['Animate', 'Keyframes, text animators, path animation, and the Graph Editor turn styleframes into controlled timing and spacing.'],
    ['Composite', 'Pre-comps, masks, track mattes, blend modes, cameras, lights, and render passes bring 2D and 3D into one visual hierarchy.'],
    ['Automate', 'Expressions connect repeated properties so one control can update color, delay, count, copy behavior, or format logic across a system.'],
    ['Template', 'Essential Graphics exposes only the controls an editor needs, packaging approved motion as a reusable .mogrt for Premiere.'],
  ]

  return (
    <section className="motion-ae reveal" data-nav-contrast="dark" aria-labelledby="motion-ae-title">
      <div className="motion-shell">
        <div className="motion-ae__heading">
          <p className="motion-section-label">Adobe After Effects / Production spine</p>
          <div>
            <h2 id="motion-ae-title">A polished film is only half the deliverable.</h2>
            <p>After Effects is where I turn approved styleframes into timed, composited, versionable systems. The goal is not a mysterious hero file. It is a clean master comp that another editor can understand, update, and ship.</p>
          </div>
        </div>

        <div className="motion-ae__interface" role="img" aria-label="Diagram of an organized Adobe After Effects project with asset folders, a composition viewer, controller layer, animation layers, and social delivery timeline">
          <div className="motion-ae__appbar">
            <span className="motion-ae__appicon">Ae</span>
            <span>GTM_MASTER_v07.aep</span>
            <span>32 bpc / Rec.709</span>
          </div>
          <div className="motion-ae__bins" aria-hidden="true">
            <strong>PROJECT</strong>
            <span>01_ASSETS</span>
            <span>02_STYLEFRAMES</span>
            <span>03_PRECOMPS</span>
            <span className="is-active">04_MASTER_COMPS</span>
            <span>05_DELIVERABLES</span>
          </div>
          <div className="motion-ae__viewer" aria-hidden="true">
            <small>GTM_MASTER_15S / ACTIVE CAMERA</small>
            <div className="motion-ae__viewer-copy"><span>MAKE</span><span>IT</span><span>CLEAR.</span></div>
            <i className="motion-ae__viewer-safe" />
          </div>
          <div className="motion-ae__timeline" aria-hidden="true">
            <div className="motion-ae__ruler"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span></div>
            {[
              ['CTRL_MASTER', '100%'],
              ['TYPE_SYSTEM', '78%'],
              ['PRODUCT_UI', '62%'],
              ['3D_RENDER_PASS', '48%'],
              ['SOUND_MARKERS', '88%'],
            ].map(([label, width], index) => (
              <div className="motion-ae__track" key={label}>
                <span>{label}</span><i style={{ '--ae-track-width': width, '--ae-track-delay': `${index * 0.6}s` } as React.CSSProperties} />
              </div>
            ))}
            <b className="motion-ae__playhead" />
          </div>
        </div>

        <div className="motion-ae__skills">
          {aeSkills.map(([title, body], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>
          ))}
        </div>

        <div className="motion-ae__delivery">
          <div>
            <p className="motion-section-label">One master / Four social frames</p>
            <h3>Compose for the crop before the crop happens.</h3>
          </div>
          <div className="motion-ae__formats" aria-label="Social motion delivery formats">
            <div className="is-wide"><i /><strong>16:9</strong><span>Launch / web</span></div>
            <div className="is-portrait"><i /><strong>9:16</strong><span>Stories / reels</span></div>
            <div className="is-feed"><i /><strong>4:5</strong><span>Feed / social</span></div>
            <div className="is-square"><i /><strong>1:1</strong><span>Flexible cut</span></div>
          </div>
        </div>

        <div className="motion-ae__pipeline" aria-label="Adobe motion production pipeline">
          <div><span>01</span><strong>Figma + Illustrator + Photoshop</strong><small>Styleframes, vectors, source art</small></div>
          <b aria-hidden="true">→</b>
          <div><span>02</span><strong>After Effects</strong><small>Animation, compositing, motion templates</small></div>
          <b aria-hidden="true">→</b>
          <div><span>03</span><strong>Premiere Pro</strong><small>Edit, sound, captions, review</small></div>
          <b aria-hidden="true">→</b>
          <div><span>04</span><strong>Media Encoder</strong><small>Masters, platform exports, QC</small></div>
        </div>

        <div className="motion-ae__references">
          <span>Technical references</span>
          <a href="https://helpx.adobe.com/after-effects/using/animation-basics.html" target="_blank" rel="noreferrer">Keyframes, expressions &amp; Graph Editor ↗</a>
          <a href="https://helpx.adobe.com/after-effects/using/creating-motion-graphics-templates.html" target="_blank" rel="noreferrer">Essential Graphics &amp; .mogrt templates ↗</a>
        </div>
      </div>
    </section>
  )
}

function AfterEffectsBuild({ project }: { project: MotionProject }) {
  return (
    <section className="motion-ae-build reveal" data-nav-contrast="dark">
      <div className="motion-shell">
        <div className="motion-ae-build__heading">
          <p className="motion-section-label">After Effects / Build map</p>
          <div>
            <h2>How the master comp stays fast, precise, and editable.</h2>
            <p>The animation is organized around named systems instead of one-off layers. That makes timing changes, feedback, format versions, and handoff much less fragile.</p>
          </div>
        </div>
        <div className="motion-ae-build__grid">
          {project.aeBuild.map((item, index) => (
            <article key={item.layer}>
              <span>0{index + 1}</span>
              <small>{item.layer}</small>
              <h3>{item.technique}</h3>
              <p>{item.purpose}</p>
            </article>
          ))}
        </div>
        <div className="motion-ae-build__handoff">
          <span>Handoff package</span>
          <p>Collected .aep · linked fonts and footage · expression-safe controls · render notes · approved masters · social cutdowns</p>
        </div>
      </div>
    </section>
  )
}

function MotionLanding({ motionOn, setMotionOn }: { motionOn: boolean; setMotionOn: (value: boolean) => void }) {
  return (
    <div className={`motion-page${motionOn ? '' : ' motion-is-paused'}`}>
      <Helmet>
        <title>Motion Design · Parth Pawar</title>
        <meta name="description" content="Selected motion design work by Parth Pawar across AI product storytelling, brand systems, launch narratives, and identity motion." />
        <meta property="og:title" content="Motion Design · Parth Pawar" />
        <meta property="og:description" content="Three motion case studies across AI product storytelling, brand systems, and identity motion." />
        <link rel="canonical" href="https://designwhich.works/motion" />
      </Helmet>
      <Nav />
      <MotionControl motionOn={motionOn} onToggle={() => setMotionOn(!motionOn)} />

      <main id="main-content">
        <section className="motion-hero" data-nav-contrast="dark">
          <div className="motion-shell motion-hero__inner">
            <div className="motion-kicker">
              <span>Parth Pawar / Motion Direction</span>
              <span>Selected work / 2022–26</span>
            </div>
            <MotionWordmark />
            <div className="motion-hero__bottom">
              <h1>Ideas should move with purpose.</h1>
              <p>
                Motion systems for AI products, launch stories, and brands that need to explain something complex without losing the feeling.
              </p>
              <a className="motion-text-link" href="#selected-motion">View three case studies <span aria-hidden="true">↘</span></a>
            </div>
          </div>
          <div className="motion-hero__ticker" aria-hidden="true">
            <div>
              <span>CONCEPT</span><i /> <span>STORYBOARD</span><i /> <span>AFTER EFFECTS</span><i /> <span>2D + 3D</span><i /> <span>PRODUCT TRUTH</span><i /> <span>SOCIAL CUTDOWNS</span><i />
              <span>CONCEPT</span><i /> <span>STORYBOARD</span><i /> <span>AFTER EFFECTS</span><i /> <span>2D + 3D</span><i /> <span>PRODUCT TRUTH</span><i /> <span>SOCIAL CUTDOWNS</span><i />
            </div>
          </div>
        </section>

        <section className="motion-intro motion-shell reveal">
          <p className="motion-section-label">What I bring</p>
          <div className="motion-intro__grid">
            <h2>Clarity first.<br />Character second.<br /><em>System underneath.</em></h2>
            <div>
              <p>
                I work from the product truth outward: find the one idea the audience must understand, build the visual rhythm around it, then turn the result into templates a team can keep using.
              </p>
              <div className="motion-capability-list">
                <span>Concept → final delivery</span>
                <span>Product + brand motion</span>
                <span>After Effects / 2D + 3D</span>
                <span>Reusable motion systems</span>
              </div>
            </div>
          </div>
        </section>

        <section id="selected-motion" className="motion-projects motion-shell">
          <div className="motion-projects__header reveal">
            <p className="motion-section-label">Selected motion / 03</p>
            <p>Each study is isolated to this motion portfolio.</p>
          </div>
          <div className="motion-project-list">
            {projects.map((project) => (
              <Link
                key={project.key}
                className={`motion-project-card motion-project-card--${project.key} reveal`}
                to={`/motion/${project.path}`}
                style={{ '--motion-project-color': project.color } as React.CSSProperties}
              >
                <div className="motion-project-card__meta">
                  <span>{project.index}</span>
                  <span>{project.discipline}</span>
                  <span>{project.year}</span>
                </div>
                <ProjectReel project={project} motionOn={motionOn} compact />
                <div className="motion-project-card__copy">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.descriptor}</p>
                  </div>
                  <span className="motion-project-card__arrow" aria-hidden="true">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <MotionBenchmark />

        <section className="motion-system reveal" data-nav-contrast="dark">
          <div className="motion-shell">
            <div className="motion-system__heading">
              <p className="motion-section-label">The operating system</p>
              <h2>Built to launch once.<br />Designed to scale after.</h2>
            </div>
            <div className="motion-system__steps">
              {[
                ['01', 'Find the sentence', 'One audience, one idea, one sentence that the motion must make clearer.'],
                ['02', 'Build the beats', 'Styleframes become a timed storyboard before polish starts.'],
                ['03', 'Animate the hierarchy', 'Timing, spacing, composition, and rhythm direct attention.'],
                ['04', 'Design the family', 'The master becomes cutdowns, crops, templates, and reusable rules.'],
              ].map(([num, title, body]) => (
                <article key={num}>
                  <span>{num}</span><h3>{title}</h3><p>{body}</p>
                </article>
              ))}
            </div>
            <div className="motion-edit-ladder">
              <div><strong>06s</strong><span>Signal</span><p>Stop the scroll. Land one idea.</p></div>
              <div><strong>15s</strong><span>Explain</span><p>Show the product move and the payoff.</p></div>
              <div><strong>30s</strong><span>Story</span><p>Build context, tension, choice, and resolution.</p></div>
            </div>
          </div>
        </section>

        <AfterEffectsProduction />

        <section className="motion-contact motion-shell reveal">
          <p className="motion-section-label">Available for the next story</p>
          <h2>Make the complex<br /><em>feel obvious.</em></h2>
          <a href="mailto:pp2863@nyu.edu">pp2863@nyu.edu <span aria-hidden="true">↗</span></a>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function MotionCaseStudy({ project, motionOn, setMotionOn }: { project: MotionProject; motionOn: boolean; setMotionOn: (value: boolean) => void }) {
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <div
      className={`motion-page motion-case motion-case--${project.key}${motionOn ? '' : ' motion-is-paused'}`}
      style={{ '--motion-project-color': project.color } as React.CSSProperties}
    >
      <Helmet>
        <title>{project.title} · Motion Design · Parth Pawar</title>
        <meta name="description" content={project.descriptor} />
        <meta property="og:title" content={`${project.title} · Motion Design`} />
        <meta property="og:description" content={project.descriptor} />
        <link rel="canonical" href={`https://designwhich.works/motion/${project.path}`} />
      </Helmet>
      <Nav />
      <MotionControl motionOn={motionOn} onToggle={() => setMotionOn(!motionOn)} />

      <main id="main-content">
        <section className="motion-case-hero" data-nav-contrast="dark">
          <div className="motion-shell">
            <div className="motion-case-hero__nav">
              <Link to="/motion">← Motion index</Link>
              <span>{project.index} / 03</span>
            </div>
            <div className="motion-case-hero__copy">
              <p>{project.discipline} / {project.year}</p>
              <h1>{project.title}</h1>
              <div>
                <p>{project.intro}</p>
                <span className="motion-case-hero__roles">{project.roles.join(' · ')}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="motion-case-reel motion-shell">
          <ProjectReel project={project} motionOn={motionOn} />
          <div className="motion-case-reel__caption">
            <span>Motion study / loop</span>
            <span>{motionOn ? 'Playing' : 'Paused'}</span>
          </div>
        </section>

        <section className="motion-case-context motion-shell reveal">
          <p className="motion-section-label">Context / What is real</p>
          <p>{project.truthNote}</p>
        </section>

        <section className="motion-case-story motion-shell reveal">
          <div className="motion-case-story__lead">
            <p className="motion-section-label">The motion decision</p>
            <h2>Motion is not the layer after design. It is how the story decides what matters.</h2>
          </div>
          <div className="motion-case-story__rows">
            <article><span>Challenge</span><p>{project.challenge}</p></article>
            <article><span>Motion move</span><p>{project.move}</p></article>
            <article><span>System result</span><p>{project.outcome}</p></article>
          </div>
        </section>

        {project.key === 'clawed' && (
          <section className="motion-media-pair motion-shell reveal">
            <figure>
              <img src="/Assets/Projects/Clawed.chat/landing-hero.webp" alt="Clawed launch page introducing an AI agent live in 30 seconds" loading="lazy" />
              <figcaption>Launch surface / Keep the promise immediate.</figcaption>
            </figure>
            <figure>
              <img src="/Assets/Projects/Clawed.chat/deploy-options.webp" alt="Clawed product interface comparing cloud deployment and local Mac companion options" loading="lazy" />
              <figcaption>Product truth / Slow down where the user chooses.</figcaption>
            </figure>
          </section>
        )}

        {project.key === 'mentra' && (
          <section className="motion-media-grid motion-shell reveal">
            <figure className="motion-media-grid__wide">
              <img src="/Assets/Projects/mentra-brand/photos/render-both-frames.webp" alt="Two Mentra smart-glasses frames from the brand render library" loading="lazy" />
              <figcaption>Object / The reveal ends on the product, not the effect.</figcaption>
            </figure>
            <figure>
              <img src="/Assets/Projects/mentra-brand/photos/logo-3d-iridescent.webp" alt="Iridescent 3D Mentra logo" loading="lazy" />
              <figcaption>Material variation.</figcaption>
            </figure>
            <figure>
              <img src="/Assets/Projects/mentra-brand/photos/ad-stream.webp" alt="Mentra social campaign artwork" loading="lazy" />
              <figcaption>Campaign application.</figcaption>
            </figure>
          </section>
        )}

        {project.key === 'transfi' && (
          <section className="motion-media-pair motion-shell reveal">
            <figure>
              <img src="/Assets/mockups/projects/transfi-project_16x9.webp" alt="TransFi brand mark with merchant dashboard and customer checkout" loading="lazy" />
              <figcaption>Brand to product / One visual route.</figcaption>
            </figure>
            <figure>
              <img src="/Assets/Projects/Transfi/public/Order Summary.png" alt="TransFi order summary interface" loading="lazy" />
              <figcaption>Resolution / Financial states settle cleanly.</figcaption>
            </figure>
          </section>
        )}

        <section className="motion-storyboard reveal" data-nav-contrast="dark">
          <div className="motion-shell">
            <div className="motion-storyboard__heading">
              <p className="motion-section-label">Storyboard / Four beats</p>
              <h2>A complete thought before a complete animation.</h2>
            </div>
            <div className="motion-storyboard__grid">
              {project.beats.map((beat, index) => (
                <article key={beat.title}>
                  <div className="motion-storyboard__frame">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <i /><i /><i />
                  </div>
                  <span>{beat.time}</span>
                  <h3>{beat.title}</h3>
                  <p>{beat.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="motion-principles motion-shell reveal">
          <div className="motion-principles__heading">
            <p className="motion-section-label">Motion principles</p>
            <h2>Rules make the work faster without making it generic.</h2>
          </div>
          <div className="motion-principles__grid">
            {project.principles.map((principle, index) => (
              <article key={principle.label}>
                <span>0{index + 1}</span>
                <p>{principle.label}</p>
                <h3>{principle.value}</h3>
                <small>{principle.note}</small>
              </article>
            ))}
          </div>
        </section>

        <AfterEffectsBuild project={project} />

        <section className="motion-outputs motion-shell reveal">
          <p className="motion-section-label">Designed as a family</p>
          <div>
            <h2>Master once.<br />Version with intent.</h2>
            <ul>{project.outputs.map((output) => <li key={output}>{output}<span aria-hidden="true">↗</span></li>)}</ul>
          </div>
        </section>

        <Link className="motion-next" to={`/motion/${nextProject.path}`} data-nav-contrast="dark">
          <div className="motion-shell">
            <p>Next case / {nextProject.index}</p>
            <h2>{nextProject.shortTitle}</h2>
            <span>{nextProject.descriptor} <b aria-hidden="true">↗</b></span>
          </div>
        </Link>
      </main>
      <Footer />
    </div>
  )
}

export default function MotionPage() {
  const { pathname } = useLocation()
  const { motionOn, setMotionOn } = useMotionControl()
  const childPath = pathname.replace(/^\/motion\/?/, '').replace(/\/$/, '')
  const project = useMemo(() => projects.find((item) => item.path === childPath), [childPath])

  if (!childPath) return <MotionLanding motionOn={motionOn} setMotionOn={setMotionOn} />
  if (!project) return <Navigate to="/motion" replace />
  return <MotionCaseStudy project={project} motionOn={motionOn} setMotionOn={setMotionOn} />
}
