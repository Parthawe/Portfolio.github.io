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
import AmbientAudio from '../components/AmbientAudio';
import FigmaSelect from '../components/FigmaSelect';
import FigmaFrameLabel from '../components/FigmaFrameLabel';
const HeroScene = lazy(() => import('../components/HeroScene'));
const CategoryObject3D = lazy(() => import('../components/CategoryObject3D'));

interface HomePcard {
  slug: string;
  image: string;
  name: string;
  tag: string;
  year: string;
  desc: string;
}

const featuredProjects: HomePcard[] = [
  { slug: 'mentra', image: `${'/Assets/images'}/mentra.png`, name: 'Mentra', tag: 'AI WEARABLES', year: '2026', desc: 'Designed the OS, companion app, and app store for AI smart glasses, shipping at $299' },
  { slug: 'transfi-project', image: `${'/Assets/images'}/transfi.jpg`, name: 'TransFi', tag: 'WEB3 PAYMENTS', year: '2023', desc: 'Redesigned crypto payment rails across 6 Asian markets, $50M+ monthly volume' },
  { slug: 'zentipay', image: `${'/Assets/images'}/zentipay.png`, name: 'ZentiPay', tag: 'FINTECH', year: '2025', desc: 'Built a fintech super app from scratch, 30% higher transaction completion' },
  { slug: 'clawed-chat', image: `${'/Assets/images'}/clawed.png`, name: 'Clawed', tag: 'AI ASSISTANT', year: '2026', desc: 'AI assistant with receipts for every action, safety-first on glasses and web' },
];

const archiveProjects: HomePcard[] = [
  { slug: 'executivelens', image: `${'/Assets/images'}/executivelens.png`, name: 'ExecutiveLens', tag: 'AI ANALYTICS', year: '2026', desc: 'Saved executives 5.2 hrs/week with AI meeting intelligence, 87% adoption in 2 weeks' },
  { slug: 'black-hole', image: `${'/Assets/images'}/black-hole.jpg`, name: 'Black Hole', tag: 'SCIENCE + FABRICATION', year: '2026', desc: 'Five physical models of black hole phenomena, exhibited at Horological Society of NY' },
  { slug: 'keyboard-project', image: `${'/Assets/images'}/keyboard.jpg`, name: 'BreakGen', tag: 'ITP THESIS', year: '2025', desc: 'AI platform that turns text prompts into fabrication-ready custom keyboards, 200+ visitors at ITP Thesis Show' },
  { slug: 'jugalbandi', image: `${'/Assets/images'}/jugalbandi.png`, name: 'Jugalbandi', tag: 'ML + MUSIC', year: '2024', desc: 'Neural network instrument that duets with human musicians, Maker Faire 2024' },
  { slug: 'tedx', image: `${'/Assets/images'}/tedx.png`, name: 'TEDxVITPune', tag: 'ART DIRECTION', year: '2021', desc: 'Art directed a 65-person team to build a parallax cityscape stage for 800+ attendees' },
  { slug: 'the-point-cdc', image: `${'/Assets/images'}/the-point-cdc.png`, name: 'The Point CDC', tag: 'COMMUNITY', year: '2024', desc: 'Redesigned digital platform for a Bronx community development nonprofit' },
  { slug: 'uv-light', image: `${'/Assets/images'}/uv-light.jpg`, name: 'UV Light', tag: 'LIGHT ART', year: '2023', desc: 'Multi-room blacklight installation with hidden messages and live projection' },
  { slug: 'cuetv', image: `${'/Assets/images'}/cuetv.jpg`, name: 'CueTV', tag: 'PRODUCT DESIGN', year: '2022', desc: 'OTT streaming platform, built a retargeting system generating 30K+ ad variations' },
  { slug: 'enigma', image: `${'/Assets/images'}/enigma.jpg`, name: 'Enigma', tag: 'DEEP LEARNING', year: '2023', desc: '200-neuron light sculpture visualizing a functioning neural network' },
  { slug: 'revolving-stage', image: `${'/Assets/images'}/revolving-stage.jpg`, name: 'Revolving Stage', tag: 'FABRICATION', year: '2022', desc: 'Engineered a 15 ft. rotating stage supporting 250+ kgs for live theatre' },
  { slug: 'shuffle', image: `${'/Assets/images'}/shuffle.jpg`, name: 'Shuffle', tag: 'INTERACTIVE', year: '2024', desc: 'Weight-sensor LED grid where players compete through physical strategy' },
  { slug: 'making-of-time', image: `${'/Assets/images'}/making-of-time.jpg`, name: 'Making of Time', tag: 'PHYSICAL COMPUTING', year: '2024', desc: 'Sundial → mechanical watch → software clock, building three ways to measure time' },
  { slug: 'moniac-machine', image: `${'/Assets/images'}/moniac-machine.jpg`, name: 'Moniac Machine', tag: 'GAME DESIGN', year: '2024', desc: 'Board game based on a 1949 hydraulic economic computer, strategy meets education' },
  { slug: 'typeface', image: `${'/Assets/images'}/typeface.jpg`, name: "Butler's Slice", tag: 'TYPE DESIGN', year: '2022', desc: 'Variable display typeface with geometric slice cuts, 400+ glyphs' },
  { slug: 'ballah-code', image: `${'/Assets/images'}/ballah-code.png`, name: 'Ballah Code', tag: 'AI DEV TOOLS', year: '2026', desc: 'AI-native IDE treating AI as a senior engineer, 17 production tools' },
  { slug: 'oncall-lens', image: `${'/Assets/images'}/oncall-lens.png`, name: 'OnCall Lens', tag: 'AI WEARABLE', year: '2026', desc: 'Sentry alert → Claude analysis → auto PR fix via smart glasses, built in 24 hours' },
  { slug: 'sea-of-salt', image: `${'/Assets/images'}/sea-of-salt.jpg`, name: 'Sea of Salt', tag: 'INSTALLATION', year: '2024', desc: 'Kinetic salt installation reacting to real-time ocean data' },
];

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

/* ------------------------------------------------------------------ */
/*  JSON-LD                                                            */
/* ------------------------------------------------------------------ */

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Parth Pawar',
    jobTitle: 'Design Engineer',
    url: 'https://parthpawar.com',
    sameAs: [
      'https://www.linkedin.com/in/parth-pawar-1501/',
      'https://www.instagram.com/designwhich.works',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'New York University, Tisch School of the Arts',
    },
    knowsAbout: ['UX Design', 'Product Design', 'Fintech', 'Creative Technology', 'Physical Computing'],
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

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
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
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
            ].map(d => (
              <Link key={d.slug} to={d.link} className="wr-discipline-item figma-hover">
                <div className="wr-discipline-obj" aria-hidden="true">
                  <Suspense fallback={null}>
                    <CategoryObject3D slug={d.slug} size={80} />
                  </Suspense>
                </div>
                <span className="wr-discipline-label">{d.label}</span>
                <FigmaSelect />
              </Link>
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

        {/* ═══ MASK REVEAL — cheeky text behind headline ═══ */}
        <section className="wr-reveal-section">
          <div className="wrap">
            <TextReveal
              front="I design systems that disappear."
              behind="(and occasionally keyboards I don't need)"
            />
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
                  I design interfaces that disappear &mdash; earning trust so quickly that people stop noticing the software. Head of UI/UX at Mentra, previously founding designer at ZentiPay and lead at TransFi. NYU ITP &rsquo;24.
                </p>

                <Link to="/about" className="wr-about-readmore">read more.</Link>

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

        {/* ═══ FEATURED PROJECTS, editorial full-width rows ═══ */}
        <section className="wr-featured-v2" id="works" style={{position:"relative"}}><FigmaFrameLabel name="Featured Work" />
          <div className="wr-featured-v2-inner">
            <div className="wr-section-head">
              <span className="wr-label">FEATURED PROJECTS</span>
              <TextHighlight as="span" className="wr-section-highlight">Work that shipped</TextHighlight>
              <Link to="/work" className="wr-arrow-btn figma-hover">View All &rarr;<FigmaSelect /></Link>
            </div>

            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/${p.slug}`} className={`wr-feat-row figma-hover ${i % 2 === 1 ? 'wr-feat-row--reverse' : ''}`}>
                  <div className="wr-feat-img">
                    <img src={p.image} alt={p.name} loading={i < 2 ? 'eager' : 'lazy'} />
                  </div>
                  <div className="wr-feat-info">
                    <span className="wr-feat-idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="wr-feat-tag">{p.tag}</span>
                    <h2 className="wr-feat-name">{p.name}</h2>
                    <p className="wr-feat-desc">{p.desc}</p>
                    <div className="wr-feat-meta">
                      <span>{p.year}</span>
                      <span className="wr-arrow-btn figma-hover">VIEW PROJECT &rarr;<FigmaSelect /></span>
                    </div>
                  </div>
                  <FigmaSelect />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ SPOTLIGHT REVEAL ═══ */}
        <section className="wr-reveal-section">
          <div className="wrap">
            <TextReveal
              front="Every pixel has a reason."
              behind="(except the ones I put there at 2am)"
            />
          </div>
        </section>

        {/* ═══ COUNTERS ═══ */}
        <section className="wr-counters" style={{position:"relative"}}><FigmaFrameLabel name="Stats" />
          <div className="wr-counters-inner">
            <div className="wr-counter-item">
              <AnimatedCounter value={33} suffix="+" />
              <span className="wr-counter-label">Projects shipped</span>
            </div>
            <div className="wr-counter-item">
              <AnimatedCounter value={6} />
              <span className="wr-counter-label">Disciplines</span>
            </div>
            <div className="wr-counter-item">
              <AnimatedCounter value={50} suffix="M+" />
              <span className="wr-counter-label">$ Volume designed</span>
            </div>
            <div className="wr-counter-item">
              <AnimatedCounter value={3} />
              <span className="wr-counter-label">Countries</span>
            </div>
          </div>
        </section>

        {/* ═══ ARCHIVE, image card grid ═══ */}
        <section className="wr-archive" style={{position:"relative"}}><FigmaFrameLabel name="Archive" />
          <div className="wr-archive-inner">
            <div className="wr-section-head">
              <span className="wr-label">ARCHIVE &middot; 2021&ndash;2026</span>
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
                  <ProjectCard slug={p.slug} name={p.name} image={p.image} tag={p.tag} year={p.year} desc={p.desc} />
                </motion.div>
              )})}
            </div>
          </div>
        </section>

        {/* ═══ SPOTLIGHT REVEAL ═══ */}
        <section className="wr-reveal-section">
          <div className="wrap">
            <TextReveal
              front="Move fast and break things."
              behind="(means someone walks into a wall)"
            />
          </div>
        </section>

        </div>{/* end .abt-paper */}
      </main>

      {/* ═══ FOOTER ═══ */}
      <Footer />


      {/* ═══ Ambient music toggle ═══ */}
      <AmbientAudio />
    </>
  );
}
