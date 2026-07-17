import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import ProjectHeader from '../components/case-study/ProjectHeader'
import ProjectOverview from '../components/case-study/ProjectOverview'
import CsSection from '../components/case-study/CsSection'
import CsBody from '../components/case-study/CsBody'
import CsInfoGrid from '../components/case-study/CsInfoGrid'
import CsSteps from '../components/case-study/CsSteps'
import NextProject from '../components/case-study/NextProject'
import BottomNav from '../components/case-study/BottomNav'
import transfiMotion from '../../Assets/Projects/cover/Transfi.gif'
import '../styles/motion.css'

type ProjectKey = 'clawed' | 'mentra' | 'transfi'

type MotionProject = {
  key: ProjectKey
  path: string
  title: string
  cardTitle: string
  descriptor: string
  discipline: string
  year: string
  color: string
  categorySlug: string
  heroImage: string
  heroAlt: string
  intro: string
  truthNote: string
  challenge: string
  move: string
  outcome: string
  roles: string[]
  storyTitle: string
  artTitle: string
  artNote: string
  beats: Array<{ time: string; title: string; body: string }>
  principles: Array<{ label: string; value: string }>
  frames: Array<{ src: string; alt: string; caption: string; fit?: 'cover' | 'contain' }>
  decisions: Array<{ removed: string; kept: string; reason: string }>
  aeBuild: Array<{ layer: string; technique: string; purpose: string }>
  deliveries: Array<{ key: string; value: string }>
  outputs: string[]
}

const projects: MotionProject[] = [
  {
    key: 'clawed',
    path: 'clawed-agent-story',
    title: 'Clawed Motion System',
    cardTitle: 'Clawed: From intent to action',
    descriptor: 'A product-motion study that turns an invisible AI-agent workflow into a clear sequence of ask, plan, approve, and receive proof.',
    discipline: 'Product motion / GTM story',
    year: '2026',
    color: '#ff5a45',
    categorySlug: 'ai',
    heroImage: '/Assets/Projects/Clawed.chat/landing-hero.webp',
    heroAlt: 'Clawed product launch page showing the AI-agent positioning and product interface',
    intro: 'Making an AI agent feel fast while keeping human control visible.',
    truthNote: 'The product interface, 3D claw, positioning, and approval model come from the shipped Clawed work. The motion direction and production plan are a self-directed portfolio extension built from those real product decisions.',
    challenge: 'Most of the agent’s work happens off-screen. A launch story could become abstract hype or a dense screen recording, neither of which explains where the user remains in control.',
    move: 'Reduce the product to four verbs and give each one a spatial job. The claw carries intent forward, interface cards expose decisions, and the edit deliberately slows at approval.',
    outcome: 'The same narrative can support a short social signal, a feature explanation, or a longer product story without changing the trust model.',
    roles: ['Concept', 'Storyboard', 'Motion direction', 'Product design', '3D art direction'],
    storyTitle: 'Ask. Plan. Approve. Receive proof.',
    artTitle: 'One red signal moving through a precise product system',
    artNote: 'The motion direction uses the existing interface and 3D object as the source material. Large verbs establish the narrative; product states provide the evidence.',
    beats: [
      { time: '00:00', title: 'Ask', body: 'Start with the human prompt so the viewer understands where intent originates.' },
      { time: '00:03', title: 'Plan', body: 'Move through the task plan while the interface reveals what the system understood.' },
      { time: '00:07', title: 'Approve', body: 'Hold on the decision instead of treating consent as a passing transition.' },
      { time: '00:11', title: 'Proof', body: 'Resolve on a durable receipt that shows what happened and who approved it.' },
    ],
    principles: [
      { label: 'Pacing', value: 'Fast around the task; calm around consent' },
      { label: 'Hierarchy', value: 'One product verb per beat' },
      { label: 'Depth', value: '3D character for continuity; UI for truth' },
      { label: 'Sound', value: 'Pulse, approval click, receipt settle' },
    ],
    frames: [
      { src: '/Assets/Projects/Clawed.chat/landing-hero.webp', alt: 'Clawed launch page and primary product promise', caption: '01 — Product promise', fit: 'cover' },
      { src: '/Assets/Projects/Clawed.chat/claw-3d.png', alt: 'Red three-dimensional Clawed object', caption: '02 — Continuity object', fit: 'contain' },
      { src: '/Assets/Projects/Clawed.chat/deploy-options.webp', alt: 'Clawed deployment options interface', caption: '03 — Product control', fit: 'cover' },
    ],
    decisions: [
      { removed: 'Ambient AI glow', kept: 'Readable product states', reason: 'The workflow should be understood, not inferred from atmosphere.' },
      { removed: 'Constant speed', kept: 'A deliberate approval hold', reason: 'Pacing makes the user-control model visible.' },
      { removed: 'Celebration at completion', kept: 'A durable receipt', reason: 'Accountability is a stronger payoff than confetti.' },
    ],
    aeBuild: [
      { layer: 'CTRL_MASTER', technique: 'Expression controls', purpose: 'Color, copy, beat duration, and format-safe areas live in one control layer.' },
      { layer: 'VERB_SYSTEM', technique: 'Text animators + Graph Editor', purpose: 'The four verbs share one rig while approval receives its own longer timing.' },
      { layer: 'CLAW + UI', technique: 'Pre-comps, track mattes, 3D camera', purpose: 'The object carries continuity while interface cards stay readable and editable.' },
      { layer: 'DELIVERY_SET', technique: 'Responsive compositions', purpose: 'The master adapts to horizontal, feed, and vertical output without rebuilding.' },
    ],
    deliveries: [
      { key: '06 seconds', value: 'Ask → approve → proof' },
      { key: '15 seconds', value: 'Prompt → plan → consent → receipt' },
      { key: '30 seconds', value: 'Problem → workflow → safety → result' },
      { key: 'Formats', value: '16:9 / 4:5 / 1:1 / 9:16' },
    ],
    outputs: ['Launch opener', 'Product story', 'Approval beat', 'Social cutdowns'],
  },
  {
    key: 'mentra',
    path: 'mentra-motion-language',
    title: 'Mentra Motion Language',
    cardTitle: 'Mentra: A brand that becomes the product',
    descriptor: 'A modular motion language connecting the shipped identity, the physical glasses, and the world around them.',
    discipline: 'Brand motion / Launch system',
    year: '2025–26',
    color: '#00b869',
    categorySlug: 'brand-visual',
    heroImage: '/Assets/Projects/mentra-brand/photos/render-both-frames.webp',
    heroAlt: 'Black and transparent Mentra smart glasses product renders',
    intro: 'Turning the identity’s folded geometry into reusable product behavior.',
    truthNote: 'The identity, packaging, render library, logo-animation frames, and launch assets are from my shipped Mentra work. This case study organizes those real assets into a documented motion language for launches and social output.',
    challenge: 'Mentra communicates with customers, developers, and creators across hardware launches, MiniApp news, packaging, and social content. The motion needed to remain recognizable without forcing every asset into the same composition.',
    move: 'Use the mark’s actual construction as the transition rule. Planes fold, align, and reveal; they do not dissolve. The behavior connects the graphic identity to the physical glasses.',
    outcome: 'A small set of repeatable openings, transformations, and end cards can keep a fast-moving launch pipeline visually coherent.',
    roles: ['Brand system', 'Motion principles', 'Storyboard', '3D direction', 'Template logic'],
    storyTitle: 'The mark becomes the object; the object opens a world.',
    artTitle: 'Folded planes connect identity, hardware, and experience',
    artNote: 'The source material is the shipped Mentra identity and product render system. Motion follows the same angles, neutral space, and controlled use of green.',
    beats: [
      { time: '01', title: 'Fragment', body: 'Begin with one plane so the behavior is introduced before the full mark.' },
      { time: '02', title: 'Assemble', body: 'Additional planes arrive with a shared direction and restrained stagger.' },
      { time: '03', title: 'Transform', body: 'The geometry aligns with the physical glasses silhouette.' },
      { time: '04', title: 'Reveal', body: 'The product enters only after the construction rule is understood.' },
    ],
    principles: [
      { label: 'Geometry', value: 'Fold and align; never dissolve' },
      { label: 'Color', value: 'Green works as a timed signal' },
      { label: 'Rhythm', value: 'Decisive arrival with no elastic overshoot' },
      { label: 'Scale', value: 'Open, reveal, and sign-off modules' },
    ],
    frames: [
      { src: '/Assets/Projects/mentra-brand/photos/logo-animation-3.png', alt: 'Mentra logo-animation frame made from folded green planes', caption: '01 — Identity behavior', fit: 'contain' },
      { src: '/Assets/Projects/mentra-brand/photos/render-both-frames.webp', alt: 'Mentra black and transparent smart glasses renders', caption: '02 — Physical object', fit: 'contain' },
      { src: '/Assets/Projects/mentra-brand/photos/ad-stream.webp', alt: 'Mentra Stream Your World campaign application', caption: '03 — Campaign world', fit: 'cover' },
    ],
    decisions: [
      { removed: 'Opacity dissolves', kept: 'Geometric folds', reason: 'The transition inherits the identity’s construction instead of adding unrelated motion.' },
      { removed: 'Green on every surface', kept: 'Green as a signal', reason: 'Restraint gives the brand color a clear job.' },
      { removed: 'A unique film per launch', kept: 'Reusable motion modules', reason: 'A growing team needs repeatable behavior and protected brand zones.' },
    ],
    aeBuild: [
      { layer: 'SOURCE_VECTORS', technique: 'Illustrator preparation', purpose: 'Clean, named planes preserve the mark geometry before animation begins.' },
      { layer: 'MARK_RIG', technique: 'Shape layers + parenting', purpose: 'Shared anchors and timing controls keep every fold consistent.' },
      { layer: 'PRODUCT_REVEAL', technique: 'Track mattes + render compositing', purpose: 'The mark becomes the glasses through one continuous geometric bridge.' },
      { layer: 'MOGRT_OUTPUT', technique: 'Essential Graphics', purpose: 'Launch name, date, CTA, product color, and crop remain safely editable.' },
    ],
    deliveries: [
      { key: '03 seconds', value: 'Logo ident / end card' },
      { key: '06 seconds', value: 'Mark → product reveal' },
      { key: '15 seconds', value: 'Launch story / creator template' },
      { key: 'Formats', value: '16:9 / 4:5 / 1:1 / 9:16' },
    ],
    outputs: ['Logo ident', 'Product reveal', 'Social opener', 'End-card template'],
  },
  {
    key: 'transfi',
    path: 'transfi-identity-motion',
    title: 'TransFi Identity in Motion',
    cardTitle: 'TransFi: Trust at transaction speed',
    descriptor: 'An identity-motion study connecting one directional mark to merchant-product states and a confirmed transaction.',
    discipline: 'Identity motion / Product launch',
    year: '2022',
    color: '#48d8ff',
    categorySlug: 'fintech',
    heroImage: '/Assets/mockups/projects/transfi-project_16x9.webp',
    heroAlt: 'TransFi identity, merchant dashboard, and customer checkout presentation',
    intro: 'Using direction for momentum and restraint for financial confidence.',
    truthNote: 'The animated mark and merchant interface come from my original TransFi design work. This page reframes those existing artifacts as a concise motion study; confidential campaign performance and internal production files are not claimed.',
    challenge: 'Fintech motion often adds speed without adding understanding. The edit needed to connect a recognizable identity to dense merchant tooling while keeping amounts and transaction states calm and legible.',
    move: 'Let the folded mark establish one left-to-right route, then use that same vector to reveal product layers. Values decelerate into place instead of bouncing or spinning.',
    outcome: 'Brand energy and product credibility can share the same edit: a clear opening signal, an ordered dashboard reveal, and an unmistakable settled state.',
    roles: ['Identity design', 'Motion study', 'Product design', 'Art direction', 'GTM framing'],
    storyTitle: 'Signal. Route. Explain. Settle.',
    artTitle: 'One continuous route from brand signal to product proof',
    artNote: 'The folded identity provides direction, while real merchant interfaces carry the evidence. Cyan is reserved for the route and state confirmation.',
    beats: [
      { time: '00:00', title: 'Signal', body: 'The folded mark creates a fast, recognizable opening.' },
      { time: '00:02', title: 'Route', body: 'Its direction becomes the path into the merchant product.' },
      { time: '00:05', title: 'Explain', body: 'Dashboard layers enter in the order a merchant needs them.' },
      { time: '00:09', title: 'Settle', body: 'The transaction resolves with a firm hold and no celebratory noise.' },
    ],
    principles: [
      { label: 'Direction', value: 'One continuous left-to-right route' },
      { label: 'Data', value: 'Firm deceleration and clear endpoints' },
      { label: 'Hierarchy', value: 'Status and amount before decoration' },
      { label: 'Sound', value: 'Transfer, verify, low confirmation tone' },
    ],
    frames: [
      { src: '/Assets/mockups/projects/transfi-project_16x9.webp', alt: 'TransFi identity and product presentation', caption: '01 — Brand signal', fit: 'cover' },
      { src: '/Assets/Projects/Transfi/public/Customer dashboard Users.png', alt: 'TransFi customer dashboard users interface', caption: '02 — Operational context', fit: 'cover' },
      { src: '/Assets/Projects/Transfi/public/Order Summary.png', alt: 'TransFi order summary with transaction status', caption: '03 — Product proof', fit: 'contain' },
    ],
    decisions: [
      { removed: 'Fast dashboard montage', kept: 'One continuous route', reason: 'Continuity makes a complex payment journey easier to follow.' },
      { removed: 'Elastic amount animation', kept: 'Firm deceleration and hold', reason: 'Financial values should feel resolved, not playful or uncertain.' },
      { removed: 'Technology spectacle', kept: 'Merchant-facing product proof', reason: 'Trust comes from readable states and confirmation.' },
    ],
    aeBuild: [
      { layer: 'IDENT_FOLD', technique: 'Vector paths + Graph Editor', purpose: 'The mark assembles with a precise curve and a non-elastic settle.' },
      { layer: 'ROUTE_LINE', technique: 'Trim Paths + expressions', purpose: 'One directional control connects the identity, route, and interface reveal.' },
      { layer: 'DASHBOARD_UI', technique: 'Pre-comps + null controls', purpose: 'Dense product surfaces reveal by decision priority instead of moving as one screenshot.' },
      { layer: 'DELIVERY_SET', technique: 'Responsive compositions', purpose: 'Protected UI and title zones survive horizontal, square, and vertical crops.' },
    ],
    deliveries: [
      { key: '06 seconds', value: 'Identity signal / social bumper' },
      { key: '15 seconds', value: 'Route → dashboard → confirmation' },
      { key: '30 seconds', value: 'Transaction explainer' },
      { key: 'Formats', value: '16:9 / 4:5 / 1:1 / 9:16' },
    ],
    outputs: ['Identity sting', 'Dashboard reveal', 'Transaction story', 'Social loop'],
  },
]

function useMotionPreference() {
  const [motionOn, setMotionOn] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = (event: MediaQueryListEvent) => setMotionOn(!event.matches)
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])

  return motionOn
}

function ClawedReel() {
  return (
    <div className="motion-preview motion-preview--clawed" role="img" aria-label="Clawed motion preview showing ask, plan, approve, and proof">
      <div className="motion-preview__grid" aria-hidden="true" />
      <div className="motion-clawed__verbs" aria-hidden="true"><span>ASK</span><span>PLAN</span><span>APPROVE</span><span>PROOF</span></div>
      <img className="motion-clawed__object" src="/Assets/Projects/Clawed.chat/claw-3d.png" alt="" />
      <div className="motion-clawed__card motion-clawed__card--request" aria-hidden="true"><small>REQUEST</small><strong>Prepare launch brief</strong></div>
      <div className="motion-clawed__card motion-clawed__card--receipt" aria-hidden="true"><small>RECEIPT 024</small><strong>Brief ready</strong><em>Approved by you</em></div>
    </div>
  )
}

function MentraReel() {
  return (
    <div className="motion-preview motion-preview--mentra" role="img" aria-label="Mentra motion preview showing folded identity planes becoming the smart glasses">
      <div className="motion-mentra__words" aria-hidden="true"><span>MARK</span><span>OBJECT</span><span>WORLD</span></div>
      <div className="motion-mentra__frames" aria-hidden="true">
        <img src="/Assets/Projects/mentra-brand/photos/logo-animation-5.png" alt="" />
        <img src="/Assets/Projects/mentra-brand/photos/logo-animation-1.png" alt="" />
        <img src="/Assets/Projects/mentra-brand/photos/logo-animation-3.png" alt="" />
      </div>
      <img className="motion-mentra__product" src="/Assets/Projects/mentra-brand/photos/render-transparent-full.webp" alt="" />
    </div>
  )
}

function TransfiReel({ motionOn }: { motionOn: boolean }) {
  return (
    <div className="motion-preview motion-preview--transfi" role="img" aria-label="TransFi motion preview connecting the identity to the merchant dashboard">
      <div className="motion-transfi__mark" aria-hidden="true">
        <img src={motionOn ? transfiMotion : '/Assets/mockups/projects/transfi-project_16x9.webp'} alt="" />
      </div>
      <img className="motion-transfi__ui" src="/Assets/Projects/Transfi/public/Customer dashboard Users.png" alt="" aria-hidden="true" />
      <div className="motion-transfi__route" aria-hidden="true"><i /><i /><i /></div>
    </div>
  )
}

function ProjectReel({ project, motionOn }: { project: MotionProject; motionOn: boolean }) {
  if (project.key === 'clawed') return <ClawedReel />
  if (project.key === 'mentra') return <MentraReel />
  return <TransfiReel motionOn={motionOn} />
}

function MotionLanding() {
  return (
    <div className="motion-index-page category-page">
      <Helmet>
        <title>Motion Design · Parth Pawar</title>
        <meta name="description" content="Motion direction and animation systems for AI products, hardware launches, identity, and social GTM storytelling." />
        <meta property="og:title" content="Motion Design · Parth Pawar" />
        <meta property="og:description" content="Three motion case studies grounded in real product and brand work." />
        <link rel="canonical" href="https://designwhich.works/motion" />
      </Helmet>
      <Nav />
      <main id="main-content">
        <div className="wrap">
          <section className="motion-index-hero">
            <p className="motion-index-hero__eyebrow"><i aria-hidden="true" /> Motion design</p>
            <div className="motion-index-hero__copy">
              <span>Motion<br />Direction</span>
              <h1>Motion systems that make complex products easier to understand.</h1>
            </div>
            <div className="motion-index-hero__bottom">
              <a href="#lp-work" className="motion-index-hero__link figma-hover">See work <span aria-hidden="true">↓</span></a>
              <dl>
                <div><dt>03</dt><dd>Case studies</dd></div>
                <div><dt>2D + 3D</dt><dd>Motion craft</dd></div>
                <div><dt>AE</dt><dd>Production system</dd></div>
              </dl>
            </div>
          </section>

          <section id="lp-work" className="motion-index-work">
            <p className="lp-section-label">Flagship motion study</p>
            <Reveal>
              <ProjectCard
                slug={`motion/${projects[0].path}`}
                name={projects[0].cardTitle}
                image={projects[0].heroImage}
                tag={projects[0].discipline}
                year={projects[0].year}
                desc={projects[0].descriptor}
                featured
                loading="eager"
              />
            </Reveal>

            <p className="lp-section-label motion-index-work__secondary-label">Selected motion systems</p>
            <div className="motion-index-card-grid">
              {projects.slice(1).map((project) => (
                <Reveal key={project.key}>
                  <ProjectCard
                    slug={`motion/${project.path}`}
                    name={project.cardTitle}
                    image={project.heroImage}
                    hoverMediaSrc={project.key === 'transfi' ? transfiMotion : undefined}
                    hoverMediaKind="image"
                    tag={project.discipline}
                    year={project.year}
                    desc={project.descriptor}
                    coverShape="square"
                  />
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal>
            <section className="motion-index-method" aria-labelledby="motion-method-title">
              <p className="lp-section-label">How the work is built</p>
              <div className="motion-index-method__heading">
                <h2 id="motion-method-title">From product truth to a reusable motion system.</h2>
                <p>The goal is not one dramatic reel. It is a clear story, a controlled After Effects build, and a family of outputs the team can continue using.</p>
              </div>
              <div className="motion-index-method__grid">
                {[
                  ['01', 'Find the sentence', 'Define the audience, communication job, and one idea the edit must make clearer.'],
                  ['02', 'Build the beats', 'Order real product and brand artifacts into a readable storyboard before polishing movement.'],
                  ['03', 'Animate hierarchy', 'Use timing, spacing, composition, and sound to direct attention—not to decorate every frame.'],
                  ['04', 'Design the family', 'Structure the master for crops, cutdowns, captions, templates, and future versioning.'],
                ].map(([num, title, body]) => (
                  <article key={num}><span>{num}</span><h3>{title}</h3><p>{body}</p></article>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function DecisionList({ decisions }: { decisions: MotionProject['decisions'] }) {
  return (
    <div className="motion-decision-list">
      {decisions.map((decision, index) => (
        <article key={decision.kept}>
          <span>0{index + 1}</span>
          <div><small>Removed</small><p>{decision.removed}</p></div>
          <b aria-hidden="true">→</b>
          <div><small>Kept</small><h3>{decision.kept}</h3><p>{decision.reason}</p></div>
        </article>
      ))}
    </div>
  )
}

function MotionCaseStudy({ project, motionOn }: { project: MotionProject; motionOn: boolean }) {
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length]
  const style = { '--project-color': project.color } as CSSProperties

  return (
    <>
      <Helmet>
        <title>{project.title} · Motion Design · Parth Pawar</title>
        <meta name="description" content={project.descriptor} />
        <meta property="og:title" content={`${project.title} · Motion Design`} />
        <meta property="og:description" content={project.descriptor} />
        <meta property="og:image" content={`https://designwhich.works${project.heroImage}`} />
        <link rel="canonical" href={`https://designwhich.works/motion/${project.path}`} />
      </Helmet>
      <Nav />
      <main id="main-content" className={`project-main motion-project-main motion-project-main--${project.key}`} style={style}>
        <ProjectHeader
          backLink="/motion"
          backLabel="Back to Motion"
          categorySlug={project.categorySlug}
          tags={[project.discipline, ...project.roles.slice(0, 2)]}
          title={project.title}
          subtitle={project.descriptor}
          info={[
            { label: 'Role', value: project.roles.join(' · ') },
            { label: 'Year', value: project.year },
            { label: 'Scope', value: project.outputs.join(' · ') },
            { label: 'Status', value: project.key === 'mentra' ? 'Built from shipping brand assets' : 'Portfolio motion study' },
          ]}
          heroExperience="visual"
          heroEyebrow="Selected motion study"
          visualHeadline={project.intro}
          visualHeroImage={project.heroImage}
          visualHeroAlt={project.heroAlt}
          heroTone="motion"
          showHeaderSummary={false}
        />

        <ProjectOverview sections={[
          { label: 'The challenge', content: project.challenge },
          { label: 'Motion direction', content: project.move },
          { label: 'System outcome', content: project.outcome },
        ]} />

        <CsSection id="motion-story" label="01 — Storyboard" title={project.storyTitle}>
          <CsBody><p>{project.move}</p></CsBody>
          <div className="motion-case-preview">
            <ProjectReel project={project} motionOn={motionOn} />
            <p><span>Motion preview</span><span>Reduced-motion preference respected</span></p>
          </div>
          <CsSteps steps={project.beats.map((beat) => ({ num: beat.time, title: beat.title, desc: beat.body }))} />
        </CsSection>

        <CsSection id="art-direction" label="02 — Art direction" title={project.artTitle}>
          <CsBody><p>{project.artNote}</p></CsBody>
          <div className="motion-frame-grid">
            {project.frames.map((frame) => (
              <figure className={frame.fit === 'contain' ? 'is-contain' : ''} key={frame.src}>
                <div><img src={frame.src} alt={frame.alt} loading="lazy" /></div>
                <figcaption>{frame.caption}</figcaption>
              </figure>
            ))}
          </div>
          <CsInfoGrid items={project.principles.map((principle) => ({ key: principle.label, value: principle.value }))} />
        </CsSection>

        <CsSection id="motion-decisions" label="03 — Motion decisions" title="Specific choices, tied to the product">
          <CsBody><p>The process is shown through the decisions that changed the sequence—not reconstructed sketches or invented approval history.</p></CsBody>
          <DecisionList decisions={project.decisions} />
        </CsSection>

        <CsSection id="after-effects" label="04 — After Effects build plan" title="An editable master, not a mysterious hero file">
          <CsBody>
            <p>The approved direction maps into named controls, reusable pre-comps, deliberate easing, and responsive delivery compositions. This production plan is explicit about how the study would be carried into After Effects without presenting a hypothetical project file as a shipped artifact.</p>
          </CsBody>
          <div className="motion-ae-callout">
            <span>Ae</span>
            <div><strong>Production spine</strong><p>Illustrator and Figma source art → After Effects animation and compositing → Premiere edit and captions → Media Encoder masters and social versions.</p></div>
          </div>
          <CsSteps steps={project.aeBuild.map((item, index) => ({ num: `0${index + 1}`, title: `${item.layer} · ${item.technique}`, desc: item.purpose }))} />
          <CsInfoGrid items={project.deliveries} />
        </CsSection>

        <CsSection id="scope" label="05 — Scope & authorship" title="Clear about what is shipped and what is studied">
          <CsBody><p>{project.truthNote}</p></CsBody>
          <ul className="motion-output-list">
            {project.outputs.map((output) => <li key={output}>{output}<span aria-hidden="true">↗</span></li>)}
          </ul>
        </CsSection>

        <NextProject
          slug={`motion/${nextProject.path}`}
          title={nextProject.cardTitle}
          image={nextProject.heroImage}
        />
        <BottomNav sections={[
          { id: 'motion-story', label: 'Storyboard' },
          { id: 'art-direction', label: 'Art direction' },
          { id: 'motion-decisions', label: 'Decisions' },
          { id: 'after-effects', label: 'After Effects' },
        ]} />
      </main>
      <Footer />
    </>
  )
}

export default function MotionPage() {
  const { pathname } = useLocation()
  const motionOn = useMotionPreference()
  const childPath = pathname.replace(/^\/motion\/?/, '').replace(/\/$/, '')
  const project = useMemo(() => projects.find((item) => item.path === childPath), [childPath])

  if (!childPath) return <MotionLanding />
  if (!project) return <Navigate to="/motion" replace />
  return <MotionCaseStudy project={project} motionOn={motionOn} />
}
