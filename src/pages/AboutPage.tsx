import { Fragment, useEffect, lazy, Suspense } from 'react'
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
import { CONTACT_EMAIL, DEFAULT_OG_IMAGE, SITE_ORIGIN, SITE_URL } from '../config/site'

const ToolsCanvas = lazy(() => import('../components/ToolsCanvas'))

/* ── Data ── */

type Row = { date: string; role: string; co?: string; desc?: string; link?: string; section?: string }

const rows: Row[] = [
  { section: 'Experience', date: 'Q3 2025 -', role: 'Head of UI/UX', co: 'Mentra', link: '/mentra', desc: 'Designing the entire OS for AI smart glasses, a screen the size of a postage stamp that has to feel effortless.' },
  { date: 'Q2, Q3 2025', role: 'Founding Product Designer', co: 'ZentiPay', link: '/zentipay', desc: '0 → 1 fintech super app. Trust-first transfer flows.' },
  { date: '2022, 2023', role: 'Lead Product Designer', co: 'TransFi', link: '/transfi-project', desc: 'Crypto payment infrastructure across multi-market merchant flows.' },
  { date: '2024', role: 'Designer', co: 'The Point CDC', link: '/the-point-cdc' },
  { date: '2023, 2024', role: 'Graduate Teaching Assistant', co: 'NYU Tisch / ITP', desc: 'Helped students break things on purpose, honestly, how I learn best too.' },
  { date: '2020, 2022', role: 'Co-founder & Director', co: 'ArtTown Podcast', desc: '45 episodes across 3 seasons, interviewing designers from Puma, Royal College of Arts, Google, and Bollywood.' },
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
  (_, index) => `/Portfolio.github.io/Assets/character/me/${index + 1}.webp`,
)

/* ── Component ── */

export default function AboutPage() {
  /* Body class so CSS can target nav + global elements on this page */
  useEffect(() => {
    document.body.classList.add('page-about')
    return () => document.body.classList.remove('page-about')
  }, [])
  const [toolsRef, toolsInView] = useInView(0.05, '260px 0px')
  const mountToolsCanvas = useDeferredMount(toolsInView, { timeout: 1600, delayMs: 200 })

  return (
    <>
      <Helmet>
        <title>About &middot; Parth Pawar</title>
        <meta name="description" content="Parth Pawar, Design Engineer. Head of UI/UX at Mentra. Making complex systems feel simple. NYU ITP MPS '24." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About &middot; Parth Pawar" />
        <meta property="og:description" content="Design Engineer. Head of UI/UX at Mentra. Making complex systems feel simple." />
        <meta property="og:image" content={`${SITE_ORIGIN}${DEFAULT_OG_IMAGE}`} />
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
