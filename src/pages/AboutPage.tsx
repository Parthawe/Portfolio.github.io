import { Fragment, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  siAnthropic,
  siArduino,
  siAutodesk,
  siBlender,
  siCinema4d,
  siCursor,
  siD3,
  siFigma,
  siFirebase,
  siFramer,
  siGithub,
  siGreensock,
  siJavascript,
  siJira,
  siLinear,
  siLottiefiles,
  siMiro,
  siNodedotjs,
  siNotion,
  siP5dotjs,
  siProcessingfoundation,
  siProtodotio,
  siPython,
  siRaspberrypi,
  siReact,
  siRhinoceros,
  siRive,
  siSupabase,
  siSwift,
  siThreedotjs,
  siTypescript,
  siUnity,
  siUnrealengine,
  siVite,
  siWebflow,
} from 'simple-icons'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FigmaSelect from '../components/FigmaSelect'
import TextReveal from '../components/TextReveal'
import PortalReveal from '../components/PortalReveal'
import BinaryFlower from '../components/BinaryFlower'
import { DEFAULT_OG_IMAGE, SITE_ORIGIN, SITE_URL } from '../config/site'

/* ── Data ── */

type Row = { date?: string; role: string; co?: string; desc?: string; link?: string; section?: string }

const rows: Row[] = [
  { section: 'Work Experience', date: 'Q3 2025 - Present', role: 'Head of UI/UX', co: 'Mentra', link: '/mentra', desc: 'AI wearable OS, companion app, MiniApp Store, and launch systems.' },
  { date: '2025', role: 'Founding Product Designer', co: 'ZentiPay', link: '/zentipay', desc: '0 to 1 fintech product design across research, flows, and MVP UX.' },
  { date: '2024', role: 'Designer', co: 'The Point CDC', link: '/the-point-cdc', desc: 'Civic web redesign for a Hunts Point community organization.' },
  { date: '2023 - 2024', role: 'Web Publishing Designer', co: 'NYU Tisch Office of Diversity', desc: 'Accessible publishing systems and annual report design.' },
  { date: '2022 - 2023', role: 'Lead Product Designer', co: 'TransFi', link: '/transfi-project', desc: 'Cross-border crypto payments, dashboards, widgets, and trust flows.' },
  { date: '2021 - 2022', role: 'UI/UX Designer', co: 'Monsoonfish', desc: 'Mobile and web UX for product studio clients.' },
  { date: '2020 - 2021', role: 'Research Intern', co: 'IBM', link: '/ibm', desc: 'Enterprise UX research and workflow synthesis.' },
  { section: 'Teaching Experience', date: 'Fall 2024', role: 'Graduate Assistant', co: 'NYU', desc: 'Classes: Applications.' },
  { date: 'Fall 2024', role: 'Graduate Assistant', co: 'NYU', desc: 'Classes: Physical Computing.' },
  { date: 'Spring 2024', role: 'Graduate Assistant', co: 'NYU', desc: 'Classes: Interaction as Art Medium.' },
  { date: 'Fall 2023', role: 'Graduate Assistant', co: 'NYU', desc: 'Classes: 100 Days of Making.' },
  { section: 'Education', role: 'MPS, Interactive Telecommunications Program', co: 'NYU Tisch School of the Arts', desc: 'New York.' },
  { role: 'BE, Computer Science Engineering', co: 'Vishwakarma Institute of Technology', desc: 'Pune.' },
]

const recognitionGroups = [
  {
    label: 'Awards',
    items: [
      'Red Burns + ITP Scholarships, 2024',
      'Tisch Scholarship, 2023',
      'Firodia Karandak competition recognition',
    ],
  },
  {
    label: 'Exhibitions',
    items: [
      'ITP Thesis Show',
      'ITP Spring / Winter Shows',
      'Maker Faire Coney Island',
      'WonderVille NYC',
    ],
  },
]

const recognitionRows: Row[] = recognitionGroups.flatMap((group) =>
  group.items.map((item, index) => ({
    section: index === 0 ? group.label : undefined,
    role: item,
    co: group.label,
  })),
)

const offClockImages = [
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/nyu-subway-flowers.webp',
    label: 'NYU flowers',
  },
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/gallery-suit.webp',
    label: 'Gallery days',
  },
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/f1-store.webp',
    label: 'Formula 1',
  },
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/library-shelf.webp',
    label: 'Book stacks',
  },
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/color-gallery.webp',
    label: 'Color studies',
  },
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/monet-wall.webp',
    label: 'Museum looking',
  },
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/polaroid-portrait.webp',
    label: 'Instant photos',
  },
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/painting-view.webp',
    label: 'Painting rooms',
  },
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/nyu-grad.webp',
    label: 'NYU graduation',
  },
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/washington-square.webp',
    label: 'Washington Square',
  },
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/mclaren-jacket.webp',
    label: 'McLaren days',
  },
  {
    src: '/Portfolio.github.io/Assets/images/about/off-clock/yc-founder-visit.webp',
    label: 'Founder visits',
  },
]

const aboutCharacterFrames = Array.from(
  { length: 9 },
  (_, index) => `/Portfolio.github.io/Assets/character/me/${index + 1}.webp`,
)

const softwareStack = [
  'Figma', 'FigJam', 'Framer', 'Webflow', 'Spline', 'Rive', 'Lottie', 'ProtoPie',
  'Principle', 'After Effects', 'Premiere Pro', 'Photoshop', 'Illustrator', 'InDesign',
  'Lightroom', 'Blender', 'Cinema 4D', 'Fusion 360', 'Rhino', 'KeyShot', 'TouchDesigner',
  'p5.js', 'Processing', 'Arduino', 'Raspberry Pi', 'Unity', 'Unreal', 'React',
  'TypeScript', 'JavaScript', 'Vite', 'Three.js', 'GSAP', 'Node', 'Python', 'Swift',
  'D3.js', 'Tableau', 'Supabase', 'Firebase', 'Notion', 'Linear', 'Jira', 'GitHub',
  'Cursor', 'Claude Code', 'ChatGPT', 'Midjourney', 'Runway', 'Whimsical', 'Miro',
]

const softwareRows = [
  softwareStack.filter((_, index) => index % 3 === 0),
  softwareStack.filter((_, index) => index % 3 === 1),
  softwareStack.filter((_, index) => index % 3 === 2),
]

type SimpleBrandIcon = {
  title: string
  hex: string
  path: string
}

const softwareIcons: Record<string, SimpleBrandIcon> = {
  Figma: siFigma,
  Framer: siFramer,
  Webflow: siWebflow,
  Rive: siRive,
  Lottie: siLottiefiles,
  ProtoPie: siProtodotio,
  Blender: siBlender,
  'Cinema 4D': siCinema4d,
  'Fusion 360': siAutodesk,
  Rhino: siRhinoceros,
  'p5.js': siP5dotjs,
  Processing: siProcessingfoundation,
  Arduino: siArduino,
  'Raspberry Pi': siRaspberrypi,
  Unity: siUnity,
  Unreal: siUnrealengine,
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Vite: siVite,
  'Three.js': siThreedotjs,
  GSAP: siGreensock,
  Node: siNodedotjs,
  Python: siPython,
  Swift: siSwift,
  'D3.js': siD3,
  Supabase: siSupabase,
  Firebase: siFirebase,
  Notion: siNotion,
  Linear: siLinear,
  Jira: siJira,
  GitHub: siGithub,
  Cursor: siCursor,
  'Claude Code': siAnthropic,
  Miro: siMiro,
}

const adobeAppIcons: Record<string, { label: string; bg: string; fg: string }> = {
  'After Effects': { label: 'Ae', bg: '#00005b', fg: '#9999ff' },
  'Premiere Pro': { label: 'Pr', bg: '#00005b', fg: '#9999ff' },
  Photoshop: { label: 'Ps', bg: '#001e36', fg: '#31a8ff' },
  Illustrator: { label: 'Ai', bg: '#330000', fg: '#ff9a00' },
  InDesign: { label: 'Id', bg: '#49021f', fg: '#ff3366' },
  Lightroom: { label: 'Lr', bg: '#001e36', fg: '#31a8ff' },
}

function SoftwareLogo({ tool }: { tool: string }) {
  const icon = softwareIcons[tool]
  const adobeIcon = adobeAppIcons[tool]

  if (icon) {
    return (
      <span
        className="abt-vibe-software-logo abt-vibe-software-logo--svg"
        style={{ color: `#${icon.hex}` }}
        aria-hidden="true"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" role="img" focusable="false">
          <path fill="currentColor" d={icon.path} />
        </svg>
      </span>
    )
  }

  if (adobeIcon) {
    return (
      <span
        className="abt-vibe-software-logo abt-vibe-software-logo--adobe"
        style={{ '--logo-bg': adobeIcon.bg, '--logo-fg': adobeIcon.fg } as CSSProperties}
        aria-hidden="true"
      >
        {adobeIcon.label}
      </span>
    )
  }

  return null
}

function SoftwareChip({ tool }: { tool: string }) {
  const hasLogo = Boolean(softwareIcons[tool] || adobeAppIcons[tool])

  return (
    <span className={`abt-vibe-software-chip${hasLogo ? ' has-actual-logo' : ''}`}>
      <SoftwareLogo tool={tool} />
      <span>{tool}</span>
    </span>
  )
}

/* ── Component ── */

export default function AboutPage() {
  /* Body class so CSS can target nav + global elements on this page */
  useEffect(() => {
    document.body.classList.add('page-about')
    return () => document.body.classList.remove('page-about')
  }, [])

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
              fit="contain"
            />
          </div>

          <div className="wrap">

            {/* ── Spotlight: after hero ── */}
            <section className="wr-reveal-section">
              <TextReveal
                front="I design product systems for AI wearables, fintech, civic tools, and physical interfaces."
                behind="Right now, I need both rigor and invention. AI smart glasses have no established patterns, which is exactly why I love the work."
              />
            </section>

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
                <tr className={`abt-table-row${!r.date ? ' abt-table-row--no-date' : ''}`}>
                  {r.date && <td className="abt-table-date">{r.date}</td>}
                  <td className="abt-table-main" data-co={r.co || ''} colSpan={r.date ? undefined : 2}>
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

        <section className="abt-recognition reveal" aria-labelledby="abt-recognition-title">
          <div className="abt-recognition-head">
            <span className="sec-label">Awards / Recognition</span>
            <h2 id="abt-recognition-title">Proof beyond the job title</h2>
          </div>
              <table className="abt-table abt-recognition-table">
                <tbody>
                  {recognitionRows.map((r, i) => (
                    <Fragment key={`${r.co}-${r.role}-${i}`}>
                      {r.section && (
                        <tr className="abt-table-section">
                          <td colSpan={3}>
                            <span className="abt-table-section-label">{r.section}</span>
                          </td>
                        </tr>
                      )}
                      <tr className="abt-table-row">
                        <td className="abt-table-date">{r.section || ''}</td>
                        <td className="abt-table-main">
                          <span className="abt-table-role">{r.role}</span>
                        </td>
                        <td className="abt-table-co">{r.co}</td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </section>

            {/* ── Vibe coding / software stack ── */}
            <section className="abt-vibe reveal" aria-labelledby="abt-vibe-title">
              <div className="abt-vibe-head">
                <span className="sec-label">Design engineering</span>
                <h2 id="abt-vibe-title">Code with design</h2>
                <p>I do not stop at the mockup. I build prototypes, wire interactions, and use code to prove the system works.</p>
              </div>

              <div className="abt-vibe-stage" aria-label="Generative design engineering object">
                <div className="abt-vibe-window">
                  <BinaryFlower />
                </div>

              </div>

              <div className="abt-vibe-software" aria-label="Software stack">
                {softwareRows.map((row, rowIndex) => (
                  <div
                    className={`abt-vibe-software-row${rowIndex === 1 ? ' is-reverse' : ''}`}
                    key={`software-row-${rowIndex}`}
                  >
                    <div className="abt-vibe-software-track">
                      {row.map((tool, index) => (
                        <SoftwareChip tool={tool} key={`${tool}-${rowIndex}-${index}`} />
                      ))}
                    </div>
                    <div className="abt-vibe-software-track" aria-hidden="true">
                      {row.map((tool, index) => (
                        <SoftwareChip tool={tool} key={`${tool}-${rowIndex}-duplicate-${index}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Spotlight: after experience ── */}
            <section className="wr-reveal-section">
              <TextReveal
                front="Mentra, ZentiPay, TransFi, NYU, each one taught me something I couldn't learn from a tutorial."
                behind="When your payment flow fails, someone doesn't get paid. When your glasses UI fails, someone walks into a wall."
              />
            </section>


            {/* ── Off the clock ── */}
            <section className="abt-beyond reveal" aria-labelledby="abt-beyond-title">
              <div className="abt-beyond-inner">
                <div className="abt-beyond-copy">
                  <span className="sec-label">Off the clock</span>
                  <h2 id="abt-beyond-title" className="abt-beyond-title"><em>What</em> I enjoy</h2>
                  <p className="abt-beyond-text">When I am not designing, I am usually building something just because I love it: a side project, a sketch, a painting, a small sculpture, or a meal that turns into a whole evening. I also like getting outside for treks and hikes whenever the city starts feeling too flat.</p>
                </div>
                <motion.div
                  className="abt-image-asides"
                  tabIndex={0}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-30px' }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                  aria-label="Off the clock image reel"
                >
                  <div className="abt-image-asides-track">
                    {[...offClockImages, ...offClockImages].map((item, i) => (
                      <motion.figure
                        key={`${item.label}-${i}`}
                        className="abt-image-aside"
                        aria-hidden={i >= offClockImages.length ? 'true' : undefined}
                        variants={{
                          hidden: { opacity: 0, y: 14, rotate: (i % 2 === 0 ? -3 : 3) },
                          show: { opacity: 1, y: 0, rotate: (i % 2 === 0 ? -1.5 : 1.5), transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                        }}
                      >
                        <img src={item.src} alt="" loading="lazy" decoding="async" />
                      </motion.figure>
                    ))}
                  </div>
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
        </div>
      </main>

      <Footer />
    </>
  )
}
