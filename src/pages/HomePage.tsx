import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import AnimatedCounter from '../components/AnimatedCounter';
import TextReveal from '../components/TextReveal';
import TextHighlight from '../components/TextHighlight';
import FigmaSelect from '../components/FigmaSelect';
import FigmaFrameLabel from '../components/FigmaFrameLabel';
import { featuredProjects, archiveProjects } from '../data/projects';
const HeroScene = lazy(() => import('../components/HeroScene'));
const CategoryObject3D = lazy(() => import('../components/CategoryObject3D'));

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const IMG = '/Assets/images';

interface Skill {
  label: string;
  img: string;
}

const skills: Skill[] = [
  { label: 'UX Design',            img: `${IMG}/mentra.png` },
  { label: 'Product Design',       img: `${IMG}/executivelens.png` },
  { label: 'Fintech',              img: `${IMG}/zentipay.png` },
  { label: 'Creative Technology',   img: `${IMG}/jugalbandi.png` },
  { label: 'Physical Computing',   img: `${IMG}/enigma.jpg` },
  { label: 'Installations',        img: `${IMG}/keyboard.jpg` },
];

export default function HomePage() {
  /* --- state --- */
  const navigate = useNavigate();
  const [skillIdx, setSkillIdx] = useState(0);
  const [skillPaused, setSkillPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  /* --- hero scroll parallax (Lenis-safe: uses target ref) --- */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const auroraY = useTransform(heroProgress, [0, 1], ['0%', '-15%']);
  const sceneScale = useTransform(heroProgress, [0, 1], [1, 0.92]);
  const sceneOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  /* --- skill cycling --- */
  useEffect(() => {
    if (skillPaused) return;
    const id = setInterval(() => {
      setSkillIdx(prev => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(id);
  }, [skillPaused]);

  return (
    <>
      <Helmet>
        <title>Parth Pawar, Design Engineer</title>
        <meta name="description" content="Portfolio of Parth Pawar, Design Engineer crafting intuitive, user-centered experiences across UX, fintech, creative technology, and physical computing." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Parth Pawar, Design Engineer" />
        <meta property="og:description" content="Design Engineer specializing in AI wearables, fintech, and interactive systems. Head of UI/UX at Mentra. NYU ITP '24." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/mentra.png" />
        <link rel="canonical" href="https://parthpawar.com" />
      </Helmet>

      {/* ═══ DARK HERO, 3D centerpiece ═══ */}
      <section className="wr-hero" id="hero" ref={heroRef} style={{position:"relative"}}><FigmaFrameLabel name="Hero" />
        {/* Grain overlay for hero warmth */}
        <div className="grain-section" aria-hidden="true" />

        {/* Aurora gradient bottom blob — parallax layer */}
        <motion.div className="wr-hero-aurora-bottom" style={{ y: auroraY }} />

        {/* 3D Scene — parallax scale + fade on scroll */}
        <motion.div className="wr-hero-3d" style={{ scale: sceneScale, opacity: sceneOpacity }}>
          <Suspense fallback={null}>
            <HeroScene onNavigate={navigate} />
          </Suspense>
        </motion.div>

        <h1 className="sr-only">Parth Pawar designs product systems for AI wearables, fintech, and creative technology.</h1>

        <div className="wr-hero-caption">
          <div className="wr-hero-caption-main">
            <p className="wr-hero-kicker">Parth Pawar / Design Engineer</p>
            <p className="wr-hero-caption-line">AI wearables, fintech, and creative technology</p>
          </div>
        </div>

        {/* Flanking labels — word-by-word staggered reveal */}
        <span className="wr-hero-left hero-reveal hero-reveal-1">
          {'A PORTFOLIO OF DESIGN WORK'.split(' ').map((word, i) => (
            <span key={i} className="hero-word" style={{ animationDelay: `${0.6 + i * 0.08}s` }}>{word} </span>
          ))}
        </span>
        <span className="wr-hero-right hero-reveal hero-reveal-2">
          {'PARTH PAWAR 2026'.split(' ').map((word, i) => (
            <span key={i} className="hero-word" style={{ animationDelay: `${0.8 + i * 0.08}s` }}>{word} </span>
          ))}
        </span>

        {/* Bottom bar removed — cleaner hero */}
      </section>

      {/* ═══ PILL NAV ═══ */}
      <Nav />

      <main id="main-content">
        {/* ── Paper canvas wraps everything below hero ── */}
        <div className="abt-paper">

        {/* ═══ DISCIPLINE INDEX — 3D objects with category names ═══ */}
        <section className="wr-disciplines" style={{position:"relative"}}><FigmaFrameLabel name="Disciplines" />
          <div className="wrap wr-disciplines-grid">
            {[
              { label: 'UX Design', slug: 'ux-design', link: '/ux-design' },
              { label: 'AI & Wearables', slug: 'ai', link: '/ai' },
              { label: 'Creative Tech', slug: 'creative-tech', link: '/creative-tech' },
              { label: 'Installations', slug: 'installations', link: '/installations' },
              { label: 'Brand & Visual', slug: 'brand-visual', link: '/brand-visual' },
              { label: 'Design for Good', slug: 'design-for-good', link: '/design-for-good' },
            ].map((d, i) => (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={d.link} className="wr-discipline-item figma-hover">
                  <div className="wr-discipline-obj" aria-hidden="true">
                    <Suspense fallback={null}>
                      <CategoryObject3D slug={d.slug} size={80} />
                    </Suspense>
                  </div>
                  <span className="wr-discipline-label">{d.label}</span>
                  <FigmaSelect />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ KEYWORD MARQUEE, visual energy strip ═══ */}
        <div className="wr-keyword-strip" aria-hidden="true">
          <div className="wr-keyword-track">
            <span>UX DESIGN</span><span>·</span>
            <span>AI WEARABLES</span><span>·</span>
            <span>FINTECH</span><span>·</span>
            <span>CREATIVE TECHNOLOGY</span><span>·</span>
            <span>PRODUCT DESIGN</span><span>·</span>
            <span>PHYSICAL COMPUTING</span><span>·</span>
            <span>UX DESIGN</span><span>·</span>
            <span>AI WEARABLES</span><span>·</span>
            <span>FINTECH</span><span>·</span>
            <span>CREATIVE TECHNOLOGY</span><span>·</span>
            <span>PRODUCT DESIGN</span><span>·</span>
            <span>PHYSICAL COMPUTING</span><span>·</span>
          </div>
        </div>

        {/* ═══ SPOTLIGHT REVEAL ═══ */}
        <section className="wr-reveal-section">
            <TextReveal
              front="I design systems that disappear, the kind where people stop noticing the software."
              behind="Head of UI/UX at Mentra, building an OS for AI glasses that fits on a postage stamp."
            />
        </section>

        {/* ═══ FEATURED PROJECTS, editorial full-width rows ═══ */}
        <section className="wr-featured-v2" id="works" style={{position:"relative"}}><FigmaFrameLabel name="Featured Work" />
          <div className="wr-featured-v2-inner">
            <div className="wr-section-head">
              <span className="wr-label">FLAGSHIP WORK</span>
              <TextHighlight as="span" className="wr-section-highlight">The strongest four</TextHighlight>
              <Link to="/work" className="wr-arrow-btn figma-hover">View All &rarr;<FigmaSelect /></Link>
            </div>

            <div className="wr-feat-grid">
              {featuredProjects.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard slug={p.slug} name={p.name} image={p.image} tag={p.tag} year={p.year} desc={p.desc} loading={i < 2 ? 'eager' : 'lazy'} nda={p.nda} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SPOTLIGHT REVEAL ═══ */}
        <section className="wr-reveal-section">
            <TextReveal
              front="Every pixel has a reason, 33 projects across 6 core disciplines, $50M+ in payment volume, 3 countries, one obsession."
              behind="Fintech rigor meets ITP imagination. I ship polished products and build weird wonderful things."
            />
        </section>

        {/* ═══ COUNTERS ═══ */}
        <motion.section
          className="wr-counters"
          style={{position:"relative"}}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <FigmaFrameLabel name="Stats" />
          <div className="wr-counters-inner">
            {[
              { value: 33, suffix: '+', label: 'Projects shipped' },
              { value: 6, suffix: '', label: 'Core disciplines' },
              { value: 50, suffix: 'M+', label: '$ Volume designed' },
              { value: 3, suffix: '', label: 'Countries' },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                className="wr-counter-item"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnimatedCounter value={c.value} suffix={c.suffix} />
                <span className="wr-counter-label">{c.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ ARCHIVE, image card grid ═══ */}
        <section className="wr-archive" style={{position:"relative"}}><FigmaFrameLabel name="Archive" />
          <div className="wr-archive-inner">
            <div className="wr-section-head">
              <span className="wr-label">SELECTED WORK</span>
              <Link to="/work" className="wr-arrow-btn figma-hover">View All &rarr;<FigmaSelect /></Link>
            </div>

            <div className="wr-archive-grid">
              {archiveProjects.map((p, i) => {
                // Waterfall cascade: column-based stagger (3 cols)
                const col = i % 3
                const row = Math.floor(i / 3)
                const delay = col * 0.1 + row * 0.06
                return (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard slug={p.slug} name={p.name} image={p.image} tag={p.tag} year={p.year} desc={p.desc} nda={p.nda} />
                </motion.div>
              )})}
            </div>
          </div>
        </section>

        {/* ═══ ABOUT CARD, cycling skills ═══ */}
        <section className="wr-about-section" style={{position:"relative"}}><FigmaFrameLabel name="About" />
          <div className="wr-about-card" id="about-card">
            {/* Dashed border SVG */}
            <svg className="wr-about-border" preserveAspectRatio="none">
              <line x1="12" y1="12" x2="12" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" />
              <line x1="100%" y1="12" x2="100%" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" transform="translate(-12,0)" />
              <line x1="12" y1="12" x2="100%" y2="12" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" />
              <line x1="12" y1="100%" x2="100%" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" transform="translate(0,-12)" />
            </svg>
            {/* Circle cutouts */}
            <div className="wr-about-dot" style={{ top: '11px' }} />
            <div className="wr-about-dot" style={{ top: '28%' }} />
            <div className="wr-about-dot" style={{ top: '50%' }} />
            <div className="wr-about-dot" style={{ top: '72%' }} />
            <div className="wr-about-dot" style={{ bottom: '11px' }} />

            {/* Top bar */}
            <div className="wr-about-top">
              <div className="wr-about-top-left">
                <span className="wr-about-num">{String(skillIdx + 1).padStart(2, '0')}</span>
                <span className="wr-about-skill-label">{skills[skillIdx].label.toUpperCase()}</span>
              </div>
              <div className="wr-about-top-right">
                <span className="wr-about-dot-sq" />
                <span className="wr-label">ABOUT</span>
                <span className="wr-about-dot-sq" />
              </div>
            </div>

            {/* Main content */}
            <div className="wr-about-body">
              <div className="wr-about-img-col">
                <div className="wr-about-img-wrap" id="about-img-wrap">
                  <img src={skills[skillIdx].img} alt={`Showcase of ${skills[skillIdx].label}`} draggable={false} key={skillIdx} />
                </div>
              </div>
              <div className="wr-about-text">
                <h2 className="wr-about-heading">Parth Pawar</h2>
                <h2 className="wr-about-heading">does</h2>

                {/* Cycling skill */}
                <div className="wr-about-cycle">
                  <button className="wr-about-arrow" onClick={() => { setSkillPaused(true); setSkillIdx(prev => (prev - 1 + skills.length) % skills.length); }} aria-label="Previous skill">&lt;</button>
                  <div className="wr-about-skill-wrap">
                    <span className="wr-about-skill" key={skillIdx}>{skills[skillIdx].label}</span>
                  </div>
                  <button className="wr-about-arrow" onClick={() => { setSkillPaused(true); setSkillIdx(prev => (prev + 1) % skills.length); }} aria-label="Next skill">&gt;</button>
                  <button className="wr-about-arrow" onClick={() => setSkillPaused(p => !p)} aria-label={skillPaused ? 'Play' : 'Pause'}>{skillPaused ? '▶' : '❚❚'}</button>
                </div>

                <p className="wr-about-desc">
                  I design interfaces that disappear, earning trust so quickly that people stop noticing the software. Head of UI/UX at Mentra, previously founding designer at ZentiPay and lead at TransFi. NYU ITP &rsquo;24.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <Link to="/about" className="wr-about-readmore">read more.</Link>
                  <Link to="/writing" className="wr-about-readmore">writing.</Link>
                </div>

                <span className="wr-about-site">PARTHPAWAR.COM</span>
              </div>
            </div>

            {/* Vertical text */}
            <div className="wr-about-vert" aria-hidden="true">PARTHPAWARWORKS</div>

            {/* Bottom strip */}
            <div className="wr-about-bottom">
              <div className="wr-about-bottom-left">
                <span className="wr-about-dot-circle" />
                <span className="wr-about-num">{String(skillIdx + 1).padStart(2, '0')} / {String(skills.length).padStart(2, '0')}</span>
              </div>
              <div className="wr-about-bottom-right">
                <span className="wr-about-dot-sq" />
                <span className="wr-about-meta-label">CURRENTLY BASED IN</span>
                <span className="wr-about-meta-val">SAN FRANCISCO, CA</span>
                <span className="wr-about-meta-coord">37.7749&deg; N, 122.4194&deg; W</span>
              </div>
            </div>
          </div>
        </section>

                {/* ═══ SPOTLIGHT REVEAL ═══ */}
        <section className="wr-reveal-section">
            <TextReveal
              front="If you scrolled this far, we should probably talk, I make coffee, you bring the hard problem."
              behind="Full-time, contract, or just a conversation. Always up for people who ship."
            />
        </section>

        </div>{/* end .abt-paper */}
      </main>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </>
  );
}
