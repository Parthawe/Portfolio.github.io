import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const experience = [
  { date: '2025 — Present', role: 'Head of UI/UX', co: 'Mentra · New York', desc: 'Leading UI/UX for AI-powered smart glasses. Companion app, MentraOS, miniapp store, and developer platform.' },
  { date: '2026', role: 'Product Designer', co: 'Clawed · New York', desc: 'Designed a safety-first AI assistant for smart glasses and web.' },
  { date: '2026', role: 'Designer', co: 'OrgDashboard', desc: 'SaaS platform giving AI agents organizational context.' },
  { date: '2025 — 2026', role: 'Product Designer', co: 'ExecutiveLens.ai', desc: 'AI-powered business intelligence for executives.' },
  { date: '2025', role: 'Founding Product Designer', co: 'ZentiPay · New York', desc: 'Built a fintech super app from 0 to 1. 30% higher transaction success.' },
  { date: '2022 — 2023', role: 'Lead Product Designer', co: 'TransFi · Bangalore', desc: "Led design for Asia's leading crypto payments platform. $50M+ monthly volume." },
  { date: '2024', role: 'Designer', co: 'The Point CDC · New York' },
  { date: '2023 — 2024', role: 'Graduate Teaching Assistant', co: 'NYU Tisch / ITP · 3 semesters' },
  { date: '2020 — 2021', role: 'Research Intern', co: 'IBM · Pune' },
]

const education = [
  { date: '2022 — 2024', role: 'MPS, Interactive Telecommunications Program', co: 'Tisch School of the Arts, NYU' },
  { date: '2018 — 2022', role: 'BE, Computer Science', co: 'Vishwakarma Institute of Technology · Pune' },
]

const recognition = [
  { date: '2024', role: 'Red Burn Scholarship', co: 'NYU' },
  { date: '2024', role: 'Interactive Telecommunications Scholarship', co: 'NYU ITP' },
  { date: '2023', role: 'Tisch Graduate Scholarship', co: 'NYU Tisch' },
  { date: '2021', role: 'Smart India Hackathon — Winner', co: 'Government of India' },
]

const exhibitions = [
  { date: '2024', role: 'Maker Faire Coney Island', co: 'New York' },
  { date: '2024', role: 'WonderVille — New Arcade Game', co: 'Brooklyn' },
  { date: '2024', role: 'NIME — New Interfaces for Musical Expression' },
  { date: '2023 — 2024', role: 'ITP Spring, Winter, and Camp Shows', co: 'NYU ITP' },
]

const tools = ['Figma', 'Protopie', 'Blender', 'After Effects', 'React', 'Swift', 'Python', 'Arduino', 'p5.js', 'TouchDesigner', 'Laser Cutting', '3D Printing']

const interests = ['Mechanical Keyboards', 'Vinyl Records', 'Street Photography', 'Specialty Coffee', 'Board Games', 'Live Music', 'Sci-Fi', 'Cycling']

const stats = [
  { num: '30+', label: 'Projects Shipped' },
  { num: '6', label: 'Countries Designed For' },
  { num: '3', label: 'NYU Scholarships' },
  { num: '$50M+', label: 'Processed via TransFi' },
]

function ExpSection({ label, items }: { label: string; items: { date: string; role: string; co?: string; desc?: string }[] }) {
  return (
    <div className="exp-section">
      <div className="sec-head">
        <span className="sec-label">{label}</span>
      </div>
      <div className="exp-table">
        {items.map((item, i) => (
          <div key={i} className="exp-row reveal">
            <div className="exp-date">{item.date}</div>
            <div>
              <div className="exp-role">{item.role}</div>
              {item.co && <div className="exp-co">{item.co}</div>}
              {item.desc && <div className="exp-desc">{item.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About · Parth Pawar</title>
        <meta name="description" content="Parth Pawar — Head of UI/UX at Mentra. Product Designer specializing in AI wearables, fintech, and interactive systems. NYU ITP MPS '24." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About · Parth Pawar" />
        <meta property="og:description" content="Head of UI/UX at Mentra. Product Designer specializing in AI wearables, fintech, and interactive systems." />
      </Helmet>

      <Nav />

      <main id="main-content">
        <div className="wrap">

          {/* Hero — large display intro */}
          <header className="about-hero-v2">
            <div className="about-v2-photo-col">
              <img src="/Assets/ParthAboutus.png" alt="Parth Pawar" className="about-photo" loading="eager" />
            </div>
            <div className="about-v2-text-col">
              <p className="about-v2-role hero-anim hero-anim-1">Product Designer · San Francisco</p>
              <h1 className="about-v2-name hero-anim hero-anim-2">Parth Pawar</h1>
              <p className="about-v2-tagline hero-anim hero-anim-3">I design interfaces that disappear &mdash; earning trust so quickly that people stop noticing the software and start doing what they came to do.</p>
            </div>
          </header>

          {/* Stats strip */}
          <motion.div
            className="about-stats"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {stats.map(s => (
              <motion.div
                key={s.label}
                className="about-stat"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.9 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
                }}
              >
                <span className="about-stat-num">{s.num}</span>
                <span className="about-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Currently */}
          <div className="about-now reveal">
            <span className="about-now-label">Currently</span>
            <p className="about-now-text">Leading UI/UX at <Link to="/mentra">Mentra</Link> &mdash; designing the OS, companion app, and app store for AI-powered smart glasses. Also building <Link to="/clawed-chat">Clawed</Link>, a safety-first AI assistant, and <Link to="/ballah-code">Ballah Code</Link>, an AI-native desktop IDE.</p>
          </div>

          {/* Looking For */}
          <div className="about-now reveal" style={{ borderLeftColor: 'var(--ink-15)' }}>
            <span className="about-now-label">Open To</span>
            <p className="about-now-text">Full-time product design roles at the intersection of AI, developer tools, or fintech. Prefer in-person or hybrid in the San Francisco Bay Area, open to remote for the right team. Especially interested in early-stage companies building 0&rarr;1 products.</p>
          </div>

          {/* Bio */}
          <div className="about-bio-section reveal">
            <div className="sec-head">
              <span className="sec-label">Background</span>
            </div>
            <div className="about-bio-content">
              <p>Right now I lead UI/UX at Mentra, where I&rsquo;m designing the OS and app store for AI-powered smart glasses &mdash; a form factor with no established patterns, a peripheral display you never stare at, and voice as the primary input.</p>
              <p>Before that I was the founding designer at ZentiPay (fintech for migrant workers) and led design at TransFi (crypto payments across six Asian markets). I also design AI products at Clawed and ExecutiveLens.</p>
              <p>I studied at NYU&rsquo;s Interactive Telecommunications Program, where I built neural-network music installations, mechanical theatre stages, and VJ software &mdash; the kind of work that taught me to design across hardware, software, and physical space simultaneously. Before that, Computer Science at VIT Pune and an AI research stint at IBM.</p>
            </div>
          </div>

          {/* Tools */}
          <div className="about-tools reveal">
            <div className="sec-head">
              <span className="sec-label">Tools &amp; Stack</span>
            </div>
            <motion.div
              className="about-tools-grid"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-30px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            >
              {tools.map(tool => (
                <motion.span
                  key={tool}
                  className="about-tool"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
                  }}
                >
                  {tool}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <hr className="dashed-line" />
          <ExpSection label="Experience" items={experience} />

          <hr className="dashed-line" />
          <ExpSection label="Education" items={education} />

          <hr className="dashed-line" />
          <ExpSection label="Recognition" items={recognition} />

          <hr className="dashed-line" />
          <ExpSection label="Exhibitions" items={exhibitions} />

          <hr className="dashed-line" />

          {/* Beyond Work */}
          <div className="about-beyond reveal">
            <div className="sec-head">
              <span className="sec-label">Beyond Work</span>
            </div>
            <p className="about-beyond-text">When I&rsquo;m not pushing pixels or writing shaders, you&rsquo;ll find me building mechanical keyboards, digging through vinyl crates, or hunting down the best pour-over in the Mission.</p>
            <div className="about-interests-grid">
              {interests.map(item => (
                <span key={item} className="about-interest">{item}</span>
              ))}
            </div>
          </div>

        </div>

        {/* Contact CTA */}
        <section className="about-cta reveal">
          <div className="wrap about-cta-inner">
            <h2 className="about-cta-headline">Let&rsquo;s work together</h2>
            <p className="about-cta-sub">Always open to interesting projects and conversations.</p>
            <div className="about-cta-links">
              <a href="mailto:parthpawar@nyu.edu" className="about-cta-btn">
                parthpawar@nyu.edu
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/parth-pawar-1501/" target="_blank" rel="noopener" className="about-cta-link">LinkedIn</a>
              <a href="/Assets/Parth_Pawar_Resume.pdf" target="_blank" rel="noopener" className="about-cta-link">Resume</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
