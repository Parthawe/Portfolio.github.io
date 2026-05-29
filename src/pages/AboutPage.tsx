import { Fragment, useEffect, lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FigmaSelect from '../components/FigmaSelect'
import TextReveal from '../components/TextReveal'
import PortalReveal from '../components/PortalReveal'
import { useDeferredMount } from '../hooks/useDeferredMount'
import { useInView } from '../hooks/useInView'
import { getProject } from '../data/projects'
import { CONTACT_EMAIL, DEFAULT_OG_IMAGE, SITE_URL } from '../config/site'

const ToolsCanvas = lazy(() => import('../components/ToolsCanvas'))

/* ── Data ── */

type Row = { date: string; role: string; co?: string; desc?: string; link?: string; section?: string }

const rows: Row[] = [
  { section: 'Experience', date: 'Q3 2025 -', role: 'Head of UI/UX', co: 'Mentra', link: '/mentra', desc: 'Designing the entire OS for AI smart glasses, a screen the size of a postage stamp that has to feel effortless.' },
  { date: 'Q2, Q3 2025', role: 'Founding Product Designer', co: 'ZentiPay', link: '/zentipay', desc: '0 → 1 fintech super app. Trust-first transfer flows.' },
  { date: '2022, 2023', role: 'Lead Product Designer', co: 'TransFi', link: '/transfi-project', desc: 'Crypto payment infrastructure across multi-market merchant flows.' },
  { date: '2024', role: 'Designer', co: 'The Point CDC', link: '/the-point-cdc' },
  { date: '2023, 2024', role: 'Graduate Teaching Assistant', co: 'NYU Tisch / ITP', desc: 'Helped students break things on purpose, honestly, how I learn best too.' },
  { date: '2020, 2022', role: 'Co-founder & Director', co: 'ArtTown Podcast', link: '/atps', desc: '45 episodes across 3 seasons, interviewing designers from Puma, Royal College of Arts, Google, and Bollywood.' },
  { date: '2021, 2022', role: 'Designer', co: 'Monson Fish' },
  { date: '2020, 2021', role: 'Research Intern', co: 'IBM' },
  { section: 'Education', date: '2022, 2024', role: 'MPS, Interactive Telecommunications', co: 'NYU Tisch School of the Arts', desc: 'Where I learned that a designer who can solder is a dangerous thing.' },
  { date: '2018, 2022', role: 'BE, Computer Science', co: 'VIT Pune' },
  { section: 'Recognition', date: '2024', role: 'Red Burn + ITP Scholarships', co: 'NYU' },
  { date: '2023', role: 'Tisch Graduate Scholarship', co: 'NYU Tisch' },
  { section: 'Exhibitions', date: '2024', role: 'Maker Faire, WonderVille, NIME', co: 'New York' },
  { date: '2023, 24', role: 'ITP Shows (Spring, Winter, Camp)', co: 'NYU ITP' },
]

const asides = [
  'Builds keyboards he doesn\u2019t need',
  'Strong opinions on border-radius',
  'Pour-over > espresso (fight me)',
  'Owns more vinyl than shelf space',
  'Error states deserve good copy',
  'Thinks in systems, ships in pixels',
]

const aboutCharacterFrames = Array.from(
  { length: 9 },
  (_, index) => `/Portfolio.github.io/Assets/character/me/${index + 1}.png`,
)

type AboutModeKey = 'rigor' | 'imagination' | 'overlap'
type AboutReasonKey = 'systems' | 'rigor' | 'fluency' | 'zeroToOne'

function projectVisual(slug: string) {
  const project = getProject(slug)
  if (!project) {
    return {
      slug,
      name: slug,
      image: '',
      tag: '',
      year: '',
      desc: '',
    }
  }

  return {
    slug: project.slug,
    name: project.name,
    image: project.summaryImage ?? project.image,
    tag: project.tag,
    year: project.summaryTimeline ?? project.year,
    desc: project.summaryOutcome ?? project.desc,
  }
}

const aboutModes: Array<{
  key: AboutModeKey
  label: string
  title: string
  body: string
  chips: string[]
  bullets: string[]
  projectSlug: string
}> = [
  {
    key: 'rigor',
    label: 'Rigor',
    title: 'Consequence changes the way you design.',
    body: 'Fintech taught me to design for trust, recovery, and operational clarity. When money moves, polish is not enough. Every state has to explain itself.',
    chips: ['Trust states', 'Recovery paths', 'Ops clarity'],
    bullets: [
      'TransFi shaped multi-market crypto payment infrastructure.',
      'ZentiPay sharpened trust in cross-border transfers.',
      'I learned to treat edge cases as the product, not QA leftovers.',
    ],
    projectSlug: 'transfi-project',
  },
  {
    key: 'imagination',
    label: 'Imagination',
    title: 'The ITP work trained me to design without references.',
    body: 'Installations, instruments, stages, and speculative interfaces taught me how to make the first version of a thing when the category does not exist yet.',
    chips: ['New inputs', 'Physical behavior', 'No playbook'],
    bullets: [
      'Built interactive systems that had to be understood in space, not just on screens.',
      'Learned how to prototype behavior before the language for it exists.',
      'Got comfortable making decisions before precedent shows up.',
    ],
    projectSlug: 'enigma',
  },
  {
    key: 'overlap',
    label: 'Hard to replicate',
    title: 'The strongest work happens where rigor and imagination meet.',
    body: 'That overlap is the real point of the portfolio. Mentra needs shipped-product discipline and experimental thinking at the same time, which is why it fits me unusually well.',
    chips: ['Fintech rigor', 'ITP imagination', 'Production quality'],
    bullets: [
      'AI glasses need new interaction patterns but cannot afford fuzzy thinking.',
      'I can move from concept framing to system detail without changing gears.',
      'The work gets stronger when strategy, interface, and implementation quality stay in one loop.',
    ],
    projectSlug: 'mentra',
  },
]

const aboutReasons: Array<{
  key: AboutReasonKey
  title: string
  kicker: string
  detail: string
  bullets: string[]
  projectSlugs: string[]
  note: string
}> = [
  {
    key: 'systems',
    title: 'Systems thinking',
    kicker: 'Whole surface area',
    detail: 'I do not stop at the primary flow. The useful work is usually in the states around it: onboarding, permissions, fallback, empty states, internal tooling, and the glue that keeps the product coherent after launch.',
    bullets: [
      'Mentra spans OS surfaces, a companion app, store, install flows, and design system behavior.',
      'ExecutiveLens turned meeting intelligence into a usable decision surface instead of another dashboard.',
      'ZentiPay needed the transaction itself and the trust layer around it to feel like one product.',
    ],
    projectSlugs: ['mentra', 'executivelens', 'zentipay'],
    note: 'This is the work mode that keeps products feeling complete instead of merely designed.',
  },
  {
    key: 'rigor',
    title: 'Shipped product rigor',
    kicker: 'Trust under pressure',
    detail: 'AI and fintech work punish hand-wavy design. I care about consequence, latency, failure states, and the difference between a concept that demos well and a product that survives real use.',
    bullets: [
      'TransFi turned complex payment rails into clearer merchant onboarding.',
      'ZentiPay focused on legibility, pricing confidence, and completion under pressure.',
      'Mentra treats accessibility and safety as product behavior, not post-launch polish.',
    ],
    projectSlugs: ['transfi-project', 'zentipay', 'mentra'],
    note: 'The bar is not “looks polished.” The bar is “still works when the stakes show up.”',
  },
  {
    key: 'fluency',
    title: 'Design and engineering fluency',
    kicker: 'Closer to the build',
    detail: 'I work comfortably at the boundary between interface design and implementation quality. That means tighter decisions, faster iteration, and fewer handoff fantasies.',
    bullets: [
      'This portfolio itself is part of that proof: interaction systems, routing, performance work, and visual language all sit in one stack.',
      'Mentra MiniApps needed product architecture, not just screens.',
      'The best collaboration I have with engineers happens when I can reason with them in implementation terms.',
    ],
    projectSlugs: ['mentra-miniapps', 'ballah-code', 'clawed-chat'],
    note: 'I care about how the thing behaves in code, not just how it looks in review.',
  },
  {
    key: 'zeroToOne',
    title: '0 to 1 comfort',
    kicker: 'No playbook needed',
    detail: 'My best work happens when the category is still being defined. I like unclear inputs, awkward first versions, and products where the right structure has to be invented before it can be refined.',
    bullets: [
      'NYU ITP projects trained that muscle in public, with physical systems and speculative interfaces.',
      'Mentra needs new patterns because voice, glanceable UI, and peripheral display change the rules.',
      'Clawed, Enigma, and Raahi all started from open questions rather than known templates.',
    ],
    projectSlugs: ['mentra', 'enigma', 'raahi-project'],
    note: 'The absence of precedent is usually where the interesting work starts.',
  },
]

/* ── Component ── */

export default function AboutPage() {
  /* Body class so CSS can target nav + global elements on this page */
  useEffect(() => {
    document.body.classList.add('page-about')
    return () => document.body.classList.remove('page-about')
  }, [])
  const [toolsRef, toolsInView] = useInView(0.05, '260px 0px')
  const mountToolsCanvas = useDeferredMount(toolsInView, { timeout: 1600, delayMs: 200 })
  const [activeMode, setActiveMode] = useState<AboutModeKey>('overlap')
  const [activeReason, setActiveReason] = useState<AboutReasonKey>('systems')
  const activeModeData = aboutModes.find((mode) => mode.key === activeMode) ?? aboutModes[0]
  const activeModeProject = projectVisual(activeModeData.projectSlug)
  const activeReasonData = aboutReasons.find((reason) => reason.key === activeReason) ?? aboutReasons[0]


  return (
    <>
      <Helmet>
        <title>About &middot; Parth Pawar</title>
        <meta name="description" content="Parth Pawar, Design Engineer. Head of UI/UX at Mentra. Making complex systems feel simple. NYU ITP MPS '24." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About &middot; Parth Pawar" />
        <meta property="og:description" content="Design Engineer. Head of UI/UX at Mentra. Making complex systems feel simple." />
        <meta property="og:image" content={`${SITE_URL}${DEFAULT_OG_IMAGE}`} />
        <link rel="canonical" href={`${SITE_URL}/about`} />
      </Helmet>

      <Nav />

      <main id="main-content">

        {/* ── Paper canvas wraps entire page ── */}
        <div className="abt-paper">

          {/* ── Photo ── */}
          <div className="abt-photo-hero">
            <PortalReveal
              images={aboutCharacterFrames}
              alt="Parth Pawar"
              className="abt-portal-img"
            />
          </div>

          <div className="wrap">

            {/* ── Spotlight: after hero ── */}
            <section className="wr-reveal-section">
              <TextReveal
                front="I bounce between two worlds, shipping polished fintech products and building weird, wonderful things at NYU ITP."
                behind="Right now I need both. AI smart glasses have no established design patterns. It's the hardest problem I've ever loved."
              />
            </section>

            {/* ── Now + Open To ── */}
            <section className="abt-operating reveal">
              <div className="sec-head abt-operating-head">
                <span className="sec-label">The operating mix</span>
                <div className="abt-operating-tabs" role="tablist" aria-label="How I work">
                  {aboutModes.map((mode) => (
                    <button
                      key={mode.key}
                      type="button"
                      className={`abt-operating-tab figma-hover${activeMode === mode.key ? ' is-active' : ''}`}
                      onClick={() => setActiveMode(mode.key)}
                      aria-pressed={activeMode === mode.key}
                    >
                      {mode.label}
                      <FigmaSelect />
                    </button>
                  ))}
                </div>
              </div>

              <div className="abt-operating-grid">
                <motion.article
                  key={activeModeData.key}
                  className="abt-operating-card surface-glass surface-glass--subtle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="abt-operating-card-label">{activeModeData.label}</p>
                  <h3>{activeModeData.title}</h3>
                  <p className="abt-operating-card-body">{activeModeData.body}</p>
                  <ul className="abt-operating-points">
                    {activeModeData.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="abt-operating-chips">
                    {activeModeData.chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>
                </motion.article>

                <div className="abt-operating-side">
                  <Link to={`/${activeModeProject.slug}`} className="abt-operating-project figma-hover">
                    <div className="abt-operating-project-media">
                      <img src={activeModeProject.image} alt={activeModeProject.name} loading="lazy" />
                    </div>
                    <div className="abt-operating-project-copy">
                      <span className="abt-operating-project-meta">{activeModeProject.tag} / {activeModeProject.year}</span>
                      <h4>{activeModeProject.name}</h4>
                      <p>{activeModeProject.desc}</p>
                    </div>
                    <FigmaSelect />
                  </Link>

                  <div className="abt-status-stack">
                    <article className="abt-status-card abt-status--active">
                      <span className="abt-status-label">Currently</span>
                      <p className="abt-status-text">Leading UI/UX at <Link to="/mentra">Mentra</Link>, designing the OS, companion app, and app store for AI-powered smart glasses. The kind of problem where &ldquo;move fast and break things&rdquo; means someone walks into a wall.</p>
                    </article>
                    <article className="abt-status-card">
                      <span className="abt-status-label">Open to</span>
                      <p className="abt-status-text">Full-time product design where the problems are hard and the team actually ships. AI, dev tools, fintech, anything where the interface <em>is</em> the product. SF preferred. Drawn to 0&rarr;1.</p>
                    </article>
                    <article className="abt-status-card">
                      <span className="abt-status-label">Hard to replicate</span>
                      <p className="abt-status-text">Fintech rigor plus ITP imagination. One keeps the work accountable. The other keeps it from becoming generic.</p>
                    </article>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ── Content continues inside paper ── */}
          <div className="wrap">

            <section className="abt-proofboard reveal">
              <div className="sec-head abt-proofboard-head">
                <span className="sec-label">Why teams bring me in</span>
                <p className="abt-proofboard-intro">Not one generic superpower. Different projects need different parts of the range.</p>
              </div>
              <div className="abt-proofboard-grid">
                <div className="abt-proofboard-nav" role="tablist" aria-label="Reasons teams hire Parth">
                  {aboutReasons.map((reason) => (
                    <button
                      key={reason.key}
                      type="button"
                      className={`abt-proofboard-trigger figma-hover${activeReason === reason.key ? ' is-active' : ''}`}
                      onClick={() => setActiveReason(reason.key)}
                      aria-pressed={activeReason === reason.key}
                    >
                      <span className="abt-proofboard-trigger-kicker">{reason.kicker}</span>
                      <span className="abt-proofboard-trigger-title">{reason.title}</span>
                      <FigmaSelect />
                    </button>
                  ))}
                </div>

                <motion.article
                  key={activeReasonData.key}
                  className="abt-proofboard-panel surface-glass surface-glass--subtle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="abt-proofboard-panel-kicker">{activeReasonData.kicker}</span>
                  <h3>{activeReasonData.title}</h3>
                  <p className="abt-proofboard-panel-body">{activeReasonData.detail}</p>
                  <ul className="abt-proofboard-points">
                    {activeReasonData.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="abt-proofboard-links">
                    {activeReasonData.projectSlugs.map((slug) => {
                      const project = projectVisual(slug)
                      return (
                        <Link key={slug} to={`/${slug}`} className="abt-proofboard-link figma-hover">
                          {project.name}
                          <FigmaSelect />
                        </Link>
                      )
                    })}
                  </div>
                  <p className="abt-proofboard-note">{activeReasonData.note}</p>
                </motion.article>
              </div>
            </section>

            <section className="abt-short-grid reveal">
              <div className="sec-head">
                <span className="sec-label">The short version</span>
              </div>
              <div className="abt-short-grid-cards">
                <article className="abt-short-card surface-glass surface-glass--subtle">
                  <span className="abt-short-card-label">Fintech</span>
                  <h3>Rigor, because the stakes are real.</h3>
                  <p>Payment flows taught me that design errors are not aesthetic. They can cost money, trust, and time for real people.</p>
                </article>
                <article className="abt-short-card surface-glass surface-glass--subtle">
                  <span className="abt-short-card-label">NYU ITP</span>
                  <h3>Imagination, because precedent runs out.</h3>
                  <p>Stages, installations, and speculative interfaces trained me to invent structure before there is a standard to borrow from.</p>
                </article>
                <article className="abt-short-card surface-glass surface-glass--subtle">
                  <span className="abt-short-card-label">Right now</span>
                  <h3>Mentra needs both at the same time.</h3>
                  <p>AI glasses have a display the size of your thumbnail, voice as the primary input, and almost no accepted patterns. That is why the problem feels worth doing.</p>
                </article>
              </div>
            </section>


            {/* ── Tools — Figma-canvas scattered layout ── */}
            <div ref={toolsRef} style={{ minHeight: mountToolsCanvas ? undefined : 320 }}>
              {mountToolsCanvas ? (
                <Suspense fallback={null}>
                  <ToolsCanvas />
                </Suspense>
              ) : null}
            </div>

            {/* ── Unified experience table ── */}
            <section className="abt-table-wrap reveal">
              <table className="abt-table">
                <tbody>
                  {rows.map((r, i) => (
                    <Fragment key={i}>
                      {r.section && (
                        <tr className="abt-table-section">
                          <td colSpan={3}>
                            <span className="abt-table-section-label">{r.section}</span>
                          </td>
                        </tr>
                      )}
                      <tr className="abt-table-row">
                        <td className="abt-table-date">{r.date}</td>
                        <td className="abt-table-main" data-co={r.co || ''}>
                          <span className="abt-table-role">
                            {r.link ? <Link to={r.link}>{r.role}</Link> : r.role}
                          </span>
                          {r.co && <span className="abt-table-co-inline">{r.co}</span>}
                          {r.desc && <span className="abt-table-desc">{r.desc}</span>}
                        </td>
                        <td className="abt-table-co">{r.co}</td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </section>

            {/* ── Spotlight: after experience ── */}
            <section className="wr-reveal-section">
              <TextReveal
                front="Mentra, ZentiPay, TransFi, NYU, each one taught me something I couldn't learn from a tutorial."
                behind="When your payment flow fails, someone doesn't get paid. When your glasses UI fails, someone walks into a wall."
              />
            </section>


            {/* ── Off the clock ── */}
            <section className="abt-beyond reveal">
              <div className="abt-beyond-inner">
                <div className="abt-beyond-left">
                  <div className="sec-head">
                    <span className="sec-label">Off the clock</span>
                  </div>
                  <p className="abt-beyond-text">When I'm not pushing pixels or writing shaders, you'll find me in the Mission hunting pour-overs, elbow-deep in a keyboard build that was supposed to take &ldquo;one weekend,&rdquo; or flipping through vinyl crates looking for something I've never heard.</p>
                </div>
                <motion.div
                  className="abt-asides"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-30px' }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                >
                  {asides.map((a, i) => (
                    <motion.span
                      key={a}
                      className="abt-aside"
                      variants={{
                        hidden: { opacity: 0, y: 12, rotate: (i % 2 === 0 ? -3 : 3) },
                        show: { opacity: 1, y: 0, rotate: (i % 2 === 0 ? -1.5 : 1.5), transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                      }}
                      whileHover={{ rotate: 0, scale: 1.05, transition: { duration: 0.2 } }}
                    >
                      {a}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ── Creative Practice, daily disciplines ── */}
            <section className="abt-practice reveal">
              <div className="sec-head">
                <span className="sec-label">Creative practice</span>
              </div>
              <p className="abt-practice-intro">Outside of product work, I maintain daily creative disciplines, proof that making things is a habit, not just a job.</p>
              <motion.div
                className="abt-practice-grid"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-30px' }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              >
                <motion.a
                  href="https://www.instagram.com/poem.nyc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="abt-practice-card figma-hover"
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } } }}
                >
                  <span className="abt-practice-num">100</span>
                  <span className="abt-practice-title">Days of Poem</span>
                  <span className="abt-practice-desc">A poem every day for 100 days. Writing as a design tool, compression, rhythm, saying more with less.</span>
                  <span className="abt-practice-handle">@poem.nyc</span><FigmaSelect />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/townforartist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="abt-practice-card figma-hover"
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } } }}
                >
                  <span className="abt-practice-num">100</span>
                  <span className="abt-practice-title">Days of Sketch</span>
                  <span className="abt-practice-desc">Daily sketching practice. Observation, hand-eye coordination, and the discipline of showing up whether the drawing is good or not.</span>
                  <span className="abt-practice-handle">@townforartist</span><FigmaSelect />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/designwhich.works"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="abt-practice-card figma-hover"
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } } }}
                >
                  <span className="abt-practice-num">50</span>
                  <span className="abt-practice-title">Days of Photoshop</span>
                  <span className="abt-practice-desc">Daily visual explorations in Photoshop. Compositing, manipulation, and finding a personal visual language through repetition.</span>
                  <span className="abt-practice-handle">@designwhich.works</span><FigmaSelect />
                </motion.a>
                <motion.a
                  href="https://open.spotify.com/show/15NJs12QEkUFUax80KndG3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="abt-practice-card figma-hover"
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } } }}
                >
                  <span className="abt-practice-num">45</span>
                  <span className="abt-practice-title">Episodes &middot; ArtTown Podcast</span>
                  <span className="abt-practice-desc">Co-founded a podcast interviewing designers from Puma, Royal College of Arts, Google, Asana, and Bollywood. 3 seasons, 45 episodes.</span>
                  <span className="abt-practice-handle">@arttown.store</span><FigmaSelect />
                </motion.a>
              </motion.div>
            </section>

            {/* ── Spotlight: after creative practice ── */}
            <section className="wr-reveal-section">
              <TextReveal
                front="Making things is a daily discipline, 100 days of poems, 100 days of sketches, 50 days of Photoshop."
                behind="Proof that creativity is a habit you build, not a talent you're born with. Show up every day."
              />
            </section>


            {/* ── Graveyard banner ── */}
            <section className="abt-graveyard reveal">
              <Link to="/graveyard" className="abt-graveyard-card">
                <div>
                  <p className="abt-gy-label">Portfolio Archaeology</p>
                  <h3 className="abt-gy-title">The <em>Graveyard</em></h3>
                  <p className="abt-gy-desc">Every portfolio I&rsquo;ve ever built. Some survived. Most didn&rsquo;t. Dig up the remains.</p>
                </div>
                <div className="abt-gy-icon">
                  <div className="abt-gy-tombstone" />
                </div>
                <svg className="abt-gy-arrow" viewBox="0 0 24 24" fill="none"><path d="M5 19L19 5M19 5H9M19 5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </section>

            {/* ── Typography showcase, Butler's Slice ── */}
            <section className="abt-type reveal">
              <div className="abt-type-intro">
                <span className="abt-type-label">Made this typeface</span>
                <div className="abt-type-links">
                  <a href="/Portfolio.github.io/Assets/Projects/Typeface/butlers-slice.zip" download className="abt-type-link figma-hover">
                    <svg viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3 5.5l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Download .zip
                    <FigmaSelect />
                  </a>
                  <Link to="/typeface" className="abt-type-link figma-hover">
                    Case study
                    <svg viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <FigmaSelect />
                  </Link>
                </div>
              </div>

              <div className="abt-type-specimen">
                <p className="abt-type-name">Butler&rsquo;s Slice</p>
              </div>

              <div className="abt-type-weights">
                <div className="abt-type-weight">
                  <p className="abt-type-weight-label">200 &middot; UltraLight</p>
                  <p className="abt-type-weight-sample abt-type-weight--ultra">Hamburgevons</p>
                </div>
                <div className="abt-type-weight">
                  <p className="abt-type-weight-label">400 &middot; Regular</p>
                  <p className="abt-type-weight-sample abt-type-weight--regular">Hamburgevons</p>
                </div>
                <div className="abt-type-weight">
                  <p className="abt-type-weight-label">700 &middot; Bold</p>
                  <p className="abt-type-weight-sample abt-type-weight--bold">Hamburgevons</p>
                </div>
              </div>

              <p className="abt-type-alphabet">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
            </section>

          </div>


          {/* ── CTA ── */}
          <section className="abt-cta reveal">
            <div className="wrap abt-cta-inner">
              <h2 className="abt-cta-headline">Let's make something together</h2>
              <p className="abt-cta-sub">Always up for hard problems and good conversation.</p>
              <div className="abt-cta-links">
                <a href={`mailto:${CONTACT_EMAIL}`} className="abt-cta-email magnetic">
                  {CONTACT_EMAIL}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/parth-pawar-1501/" target="_blank" rel="noopener noreferrer" className="abt-cta-link figma-hover">LinkedIn<FigmaSelect /></a>
                <a href="/Portfolio.github.io/Assets/Application_Resume.pdf" target="_blank" rel="noopener noreferrer" className="abt-cta-link figma-hover">Resume<FigmaSelect /></a>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  )
}
