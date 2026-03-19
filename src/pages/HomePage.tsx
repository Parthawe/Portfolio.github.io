import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import WrFooter from '../components/WrFooter';
import { getImageBrightness } from '../utils/imageBrightness';

const HeroScene = lazy(() => import('../components/HeroScene'));
import TiltCard from '../components/TiltCard';

interface HomePcard {
  slug: string;
  image: string;
  name: string;
  tag: string;
  year: string;
  desc: string;
}

const featuredProjects: HomePcard[] = [
  { slug: 'mentra', image: `${'/Assets/images'}/mentra.png`, name: 'Mentra', tag: 'AI WEARABLES', year: '2026', desc: "World's first wearable app store for AI smart glasses" },
  { slug: 'executivelens', image: `${'/Assets/images'}/executivelens.png`, name: 'ExecutiveLens', tag: 'AI ANALYTICS', year: '2026', desc: 'Business intelligence platform for C-suite executives' },
  { slug: 'zentipay', image: `${'/Assets/images'}/zentipay.png`, name: 'ZentiPay', tag: 'FINTECH', year: '2025', desc: 'Super app that increased transaction success by 30%' },
  { slug: 'clawed-chat', image: `${'/Assets/images'}/clawed.png`, name: 'Clawed', tag: 'AI ASSISTANT', year: '2026', desc: 'Safety-first AI assistant for smart glasses and web' },
];

const archiveProjects: HomePcard[] = [
  { slug: 'jugalbandi', image: `${'/Assets/images'}/jugalbandi.png`, name: 'Jugalbandi', tag: 'ML + MUSIC', year: '2024', desc: 'ML-driven musical instrument and installation' },
  { slug: 'enigma', image: `${'/Assets/images'}/enigma.jpg`, name: 'Enigma', tag: 'DEEP LEARNING', year: '2023', desc: 'Light sculpture powered by a neural network' },
  { slug: 'making-of-time', image: `${'/Assets/images'}/making-of-time.jpg`, name: 'Making of Time', tag: 'PHYSICAL COMPUTING', year: '2024', desc: 'Exploring temporal perception through physical computing' },
  { slug: 'shuffle', image: `${'/Assets/images'}/shuffle.jpg`, name: 'Shuffle', tag: 'INTERACTIVE', year: '2024', desc: 'Physical strategy simulation installation' },
  { slug: 'the-point-cdc', image: `${'/Assets/images'}/the-point-cdc.png`, name: 'The Point CDC', tag: 'COMMUNITY', year: '2024', desc: 'Digital platform for Bronx community development' },
  { slug: 'revolving-stage', image: `${'/Assets/images'}/revolving-stage.jpg`, name: 'Revolving Stage', tag: 'FABRICATION', year: '2022', desc: 'Kinetic rotating stage — design through fabrication' },
  { slug: 'cuetv', image: `${'/Assets/images'}/cuetv.jpg`, name: 'CueTV', tag: 'PRODUCT DESIGN', year: '2023', desc: 'TV scheduling platform — redesigned content workflow reducing task time by 40%' },
  { slug: 'keyboard-project', image: `${'/Assets/images'}/keyboard.jpg`, name: 'BreakGen', tag: 'ITP THESIS', year: '2025', desc: 'Modular keyboard with generative design' },
  { slug: 'tedx', image: `${'/Assets/images'}/tedx.png`, name: 'TEDxVITPune', tag: 'ART DIRECTION', year: '2021', desc: 'Complete brand identity and event experience design' },
  { slug: 'uv-light', image: `${'/Assets/images'}/uv-light.jpg`, name: 'UV Light', tag: 'LIGHT ART', year: '2024', desc: 'Interactive ultraviolet light installation' },
  { slug: 'moniac-machine', image: `${'/Assets/images'}/moniac-machine.jpg`, name: 'Moniac Machine', tag: 'GAME DESIGN', year: '2024', desc: 'Economic strategy board game with hydraulic mechanics' },
  { slug: 'typeface', image: `${'/Assets/images'}/typeface.jpg`, name: "Butler's Slice", tag: 'TYPE DESIGN', year: '2022', desc: 'Original variable display typeface with geometric cuts' },
];

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const IMG = '/Assets/images';
const LOGOS = '/Assets/images/logos';

interface HeroLayer {
  rz: string;
  tz: string;
  px: number;
  oy: string;
  img: string;
  label: string;
}

const heroLayers: HeroLayer[] = [
  { rz: '-12deg', tz: '0px',    px: 15, oy: '-6px', img: `${IMG}/mentra.png`,        label: 'UX DESIGN' },
  { rz: '-5deg',  tz: '-25px',  px: 25, oy: '-3px', img: `${IMG}/executivelens.png`, label: 'PRODUCT' },
  { rz: '2deg',   tz: '-50px',  px: 35, oy: '0px',  img: `${IMG}/zentipay.png`,      label: 'FINTECH' },
  { rz: '8deg',   tz: '-75px',  px: 45, oy: '3px',  img: `${IMG}/jugalbandi.png`,    label: 'CREATIVE TECH' },
  { rz: '14deg',  tz: '-100px', px: 55, oy: '6px',  img: `${IMG}/enigma.jpg`,        label: 'PHYSICAL' },
];

const marqueeLogos = [
  { src: `${LOGOS}/nyu-tisch.png`,       alt: 'NYU Tisch' },
  { src: `${LOGOS}/transfi-logo.png`,    alt: 'TransFi' },
  { src: `${LOGOS}/ibm-logo.png`,        alt: 'IBM' },
  { src: `${LOGOS}/the-point-logo.png`,  alt: 'The Point CDC', style: { height: '4.4rem' } as React.CSSProperties },
  { src: `${LOGOS}/monsoonfish-logo.png`, alt: 'Monsoonfish' },
];

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: 'forAnyone',        label: 'For Anyone' },
  { id: 'recruiters',       label: 'Hiring Recruiters' },
  { id: 'productDesigners', label: 'Product Managers' },
];

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
    jobTitle: 'Product Designer',
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
  const [activeTab, setActiveTab] = useState<string>('forAnyone');
  const [skillIdx, setSkillIdx] = useState(0);
  const [skillPaused, setSkillPaused] = useState(false);

  const heroSceneRef = useRef<HTMLDivElement>(null);
  const cardGroupRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  /* --- hero 3D parallax with lerp (matching original main.js) --- */
  useEffect(() => {
    const scene = heroSceneRef.current;
    const group = cardGroupRef.current;
    const hero = heroRef.current;
    if (!scene || !group || !hero) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    let mx = 0, my = 0;       // current lerped values
    let tx = 0, ty = 0;       // target values
    let hTime = 0;
    let rafId: number;
    let visible = true;

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = scene.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5..0.5
      ty = (e.clientY - rect.top) / rect.height - 0.5;
    };

    // Scroll: fade cards & hide scroll indicator
    const onScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.6));
      group.style.opacity = String(opacity);
    };

    // IntersectionObserver to pause RAF when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(hero);

    const layers = group.querySelectorAll<HTMLElement>('.wr-hero-layer');

    const loop = () => {
      if (visible && !prefersReduced) {
        hTime += 0.008;

        // Lerp toward target
        mx += (tx - mx) * 0.06;
        my += (ty - my) * 0.06;

        // Add idle sine/cosine drift
        const idleX = isMobile ? Math.sin(hTime) * 0.08 : Math.sin(hTime) * 0.02;
        const idleY = isMobile ? Math.cos(hTime * 0.7) * 0.06 : Math.cos(hTime * 0.7) * 0.015;

        const finalX = mx + idleX;
        const finalY = my + idleY;

        // Rotate the whole card group
        group.style.transform = `rotateY(${finalX * 20}deg) rotateX(${-finalY * 16}deg)`;

        // Per-layer parallax
        layers.forEach((layer) => {
          const px = parseFloat(layer.style.getPropertyValue('--px')) || 0;
          const oy = parseFloat(layer.style.getPropertyValue('--oy')) || 0;
          layer.style.transform = `
            rotateZ(var(--rz))
            translateZ(var(--tz))
            translate(${finalX * px}px, ${finalY * px * 0.6 + oy}px)
          `;
        });
      }
      rafId = requestAnimationFrame(loop);
    };

    scene.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      scene.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  /* --- skill cycling --- */
  useEffect(() => {
    if (skillPaused) return;
    const id = setInterval(() => {
      setSkillIdx(prev => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(id);
  }, [skillPaused]);

  /* --- brightness detection for pcard text color --- */
  const handleImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const card = img.closest('.pcard');
    if (!card) return;
    try {
      const brightness = getImageBrightness(img);
      if (brightness > 140) card.classList.add('pcard--light');
    } catch { /* cross-origin */ }
  }, []);

  const renderPcard = (project: HomePcard, loading: 'eager' | 'lazy' = 'lazy') => (
    <TiltCard intensity={6}>
      <Link className="pcard reveal" to={`/${project.slug}`}>
        <div className="pcard-inner">
          <div className="pcard-top-row">
            <span className="pcard-tag">{project.tag}</span>
            <span className="pcard-year">{project.year}</span>
          </div>
          <div className="pcard-visual">
            <img src={project.image} alt={project.name} loading={loading} onLoad={handleImgLoad} />
          </div>
          <h2 className="pcard-name">{project.name}</h2>
          <div className="pcard-marquee">
            <div className="pcard-marquee-track">
              <span>{project.desc} — {project.desc} — {project.desc} — </span>
              <span>{project.desc} — {project.desc} — {project.desc} — </span>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );

  return (
    <>
      <Helmet>
        <title>Parth Pawar — Product Designer</title>
        <meta name="description" content="Portfolio of Parth Pawar — Product Designer crafting intuitive, user-centered experiences across UX, fintech, creative technology, and physical computing." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Parth Pawar — Product Designer" />
        <meta property="og:description" content="Product Designer specializing in AI wearables, fintech, and interactive systems. Head of UI/UX at Mentra. NYU ITP '24." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/mentra.png" />
        <link rel="canonical" href="https://parthpawar.com" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ═══ DARK HERO ═══ */}
      <section className="wr-hero" id="hero" ref={heroRef}>
        {/* 3D Background */}
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>

        <div className="wr-hero-label wr-hero-label--left">A COLLECTION<br />OF DESIGN<br />WORK</div>

        <div className="wr-hero-scene" id="hero-scene" ref={heroSceneRef}>
          <div className="wr-hero-card-group" id="hero-card-group" ref={cardGroupRef}>
            {heroLayers.map((layer, i) => (
              <div
                className="wr-hero-layer"
                key={i}
                style={{ '--rz': layer.rz, '--tz': layer.tz, '--px': layer.px, '--oy': layer.oy } as React.CSSProperties}
              >
                <img src={layer.img} alt={layer.label} draggable={false} />
                <span className="wr-hero-card-label">{layer.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="wr-hero-label wr-hero-label--right">PARTH<br />PAWAR<br />2026</div>

        <div className="wr-hero-scroll">
          <span>SCROLL TO EXPLORE</span>
          <span className="wr-hero-arrow">&darr;</span>
        </div>
      </section>

      {/* ═══ PILL NAV ═══ */}
      <Nav />

      {/* ═══ MAIN CONTENT ═══ */}
      <main id="main-content">
        <div className="hp">

          {/* Logo marquee */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
          <div className="hp-marquee-label"><i><span>&#x2198; Where my work made a difference</span></i></div>
          <div className="hp-marquee-wrap" aria-hidden="true">
            <div className="hp-marquee-track">
              {marqueeLogos.map((logo, i) => (
                <img key={`a-${i}`} className="hp-marquee-logo" src={logo.src} alt="" style={logo.style} />
              ))}
              {marqueeLogos.map((logo, i) => (
                <img key={`b-${i}`} className="hp-marquee-logo" src={logo.src} alt="" style={logo.style} />
              ))}
            </div>
          </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
          <div
            className="hp-tabs"
            role="tablist"
            aria-label="View portfolio by audience"
            onKeyDown={(e) => {
              const tabIds = tabs.map(t => t.id);
              const idx = tabIds.indexOf(activeTab);
              if (e.key === 'ArrowRight') {
                e.preventDefault();
                const next = tabIds[(idx + 1) % tabIds.length];
                setActiveTab(next);
                document.getElementById(`tab-${next}`)?.focus();
              } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prev = tabIds[(idx - 1 + tabIds.length) % tabIds.length];
                setActiveTab(prev);
                document.getElementById(`tab-${prev}`)?.focus();
              }
            }}
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                className="hp-tab"
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label.split(' ').map((w, i) => <span key={i}>{w}<br /></span>)}</span>
              </button>
            ))}
          </div>

          {/* Tab panels — audience-specific content */}
          <div className="hp-hero">
            {/* For Anyone */}
            <div
              id="panel-forAnyone"
              role="tabpanel"
              aria-labelledby="tab-forAnyone"
              hidden={activeTab !== 'forAnyone'}
            >
              <div className="hp-hero-text">
                <span className="hp-title">Hi, I&rsquo;m Parth, a Product Designer specializing in AI wearables, fintech, and interactive systems &mdash; turning complex technology into interfaces people actually enjoy using.</span>
              </div>
              <div className="hp-hero-stats">
                <div className="hp-stat"><span className="hp-stat-pill">30+ projects</span></div>
                <div className="hp-stat"><span className="hp-stat-pill">6 countries</span></div>
                <div className="hp-stat"><span className="hp-stat-pill">5+ years of experience</span></div>
              </div>
            </div>

            {/* Hiring Recruiters */}
            <div
              id="panel-recruiters"
              role="tabpanel"
              aria-labelledby="tab-recruiters"
              hidden={activeTab !== 'recruiters'}
            >
              <div className="hp-hero-text">
                <span className="hp-title">Head of UI/UX at Mentra, previously founding designer at ZentiPay and lead at TransFi. I ship production-quality interfaces across AI, fintech, and wearable platforms &mdash; backed by 3 NYU scholarships and $50M+ in processed transactions.</span>
              </div>
              <div className="hp-hero-stats">
                <div className="hp-stat"><span className="hp-stat-pill">$50M+ processed</span></div>
                <div className="hp-stat"><span className="hp-stat-pill">30% higher conversions</span></div>
                <div className="hp-stat"><span className="hp-stat-pill">NYU ITP &rsquo;24</span></div>
              </div>
              <div className="hp-hero-links">
                <Link to="/about" className="hp-hero-link">View full experience &rarr;</Link>
                <a href="/Assets/Parth_Pawar_Resume.pdf" target="_blank" rel="noopener" className="hp-hero-link">Download resume &rarr;</a>
              </div>
            </div>

            {/* Product Managers */}
            <div
              id="panel-productDesigners"
              role="tabpanel"
              aria-labelledby="tab-productDesigners"
              hidden={activeTab !== 'productDesigners'}
            >
              <div className="hp-hero-text">
                <span className="hp-title">I work best embedded with engineering and product &mdash; shaping scope, prototyping in code, and shipping incrementally. My case studies walk through real constraints, trade-offs, and the metrics that moved.</span>
              </div>
              <div className="hp-hero-stats">
                <div className="hp-stat"><span className="hp-stat-pill">0&rarr;1 products</span></div>
                <div className="hp-stat"><span className="hp-stat-pill">Cross-platform</span></div>
                <div className="hp-stat"><span className="hp-stat-pill">Design systems</span></div>
              </div>
              <div className="hp-hero-links">
                <Link to="/mentra" className="hp-hero-link">Mentra &mdash; AI wearables case study &rarr;</Link>
                <Link to="/zentipay" className="hp-hero-link">ZentiPay &mdash; fintech 0&rarr;1 case study &rarr;</Link>
              </div>
            </div>
          </div>
          </motion.div>

        </div>
      </main>

      {/* ═══ FEATURED WORK — sticky stacking cards ═══ */}
      <section className="wr-featured" id="works">

        {/* Card 01 — Mentra */}
        <div className="wr-sticky-card" style={{ '--card-bg': 'var(--bg-alt)' } as React.CSSProperties}>
          <svg className="wr-corner-tab" viewBox="0 0 40 40" fill="none"><path d="M 0 40 L 40 40 L 5.788 1.986 C 4.65 0.722 3.029 0 1.328 0 L 0 0 Z" fill="var(--ink)" /></svg>
          <div className="wr-card-inner">
            <div className="wr-card-header">
              <span className="wr-card-num">FEATURED WORK 01</span>
              <Link to="/work" className="wr-arrow-btn">VIEW ALL WORK &rarr;</Link>
            </div>
            <div className="wr-card-layout">
              <div className="wr-card-text">
                <h2 className="wr-card-title">Mentra</h2>
                <div className="wr-card-meta"><span>2025</span><span>AI Wearables &middot; UX</span></div>
                <div className="wr-card-tags">
                  <div className="wr-card-tags-track">
                    <span>UX DESIGN</span><span>AI WEARABLES</span><span>PRODUCT DESIGN</span><span>HUD INTERFACE</span><span>ONBOARDING</span>
                    <span>UX DESIGN</span><span>AI WEARABLES</span><span>PRODUCT DESIGN</span><span>HUD INTERFACE</span><span>ONBOARDING</span>
                  </div>
                </div>
                <p className="wr-card-desc">Head of UI/UX designing the interface for AI-powered smart glasses — from onboarding flows to real-time HUD overlays.</p>
                <Link to="/mentra" className="wr-arrow-btn">VIEW PROJECT &rarr;</Link>
              </div>
              <div className="wr-card-images">
                <Link to="/mentra"><div className="wr-card-img-hero"><img src={`${IMG}/mentra.png`} alt="Mentra" loading="eager" /></div></Link>
              </div>
            </div>
          </div>
        </div>

        {/* Card 02 — ExecutiveLens */}
        <div className="wr-sticky-card" style={{ '--card-bg': '#ffe430' } as React.CSSProperties}>
          <svg className="wr-corner-tab" viewBox="0 0 40 40" fill="none"><path d="M 0 40 L 40 40 L 5.788 1.986 C 4.65 0.722 3.029 0 1.328 0 L 0 0 Z" fill="#212121" /></svg>
          <div className="wr-card-inner">
            <div className="wr-card-header">
              <span className="wr-card-num">FEATURED WORK 02</span>
            </div>
            <div className="wr-card-layout">
              <div className="wr-card-text">
                <h2 className="wr-card-title" style={{ color: '#212121' }}>ExecutiveLens</h2>
                <div className="wr-card-meta" style={{ color: 'rgba(33,33,33,0.5)' }}><span>2025</span><span>Data Platform &middot; UX</span></div>
                <div className="wr-card-tags">
                  <div className="wr-card-tags-track">
                    <span>DATA VISUALIZATION</span><span>DASHBOARDS</span><span>EXECUTIVE METRICS</span><span>UX RESEARCH</span>
                    <span>DATA VISUALIZATION</span><span>DASHBOARDS</span><span>EXECUTIVE METRICS</span><span>UX RESEARCH</span>
                  </div>
                </div>
                <p className="wr-card-desc" style={{ color: 'rgba(33,33,33,0.65)' }}>A data visualization platform turning complex executive metrics into clear, actionable dashboards.</p>
                <Link to="/executivelens" className="wr-arrow-btn" style={{ color: '#212121' }}>VIEW PROJECT &rarr;</Link>
              </div>
              <div className="wr-card-images">
                <Link to="/executivelens"><div className="wr-card-img-hero"><img src={`${IMG}/executivelens.png`} alt="ExecutiveLens" loading="eager" /></div></Link>
              </div>
            </div>
          </div>
        </div>

        {/* Card 03 — ZentiPay */}
        <div className="wr-sticky-card" style={{ '--card-bg': 'var(--bg)' } as React.CSSProperties}>
          <svg className="wr-corner-tab" viewBox="0 0 40 40" fill="none"><path d="M 0 40 L 40 40 L 5.788 1.986 C 4.65 0.722 3.029 0 1.328 0 L 0 0 Z" fill="var(--ink)" /></svg>
          <div className="wr-card-inner">
            <div className="wr-card-header">
              <span className="wr-card-num">FEATURED WORK 03</span>
            </div>
            <div className="wr-card-layout">
              <div className="wr-card-text">
                <h2 className="wr-card-title">ZentiPay</h2>
                <div className="wr-card-meta"><span>2025</span><span>Fintech &middot; UX</span></div>
                <div className="wr-card-tags">
                  <div className="wr-card-tags-track">
                    <span>FINTECH</span><span>CRYPTO</span><span>PAYMENTS</span><span>CROSS-BORDER</span><span>MOBILE</span>
                    <span>FINTECH</span><span>CRYPTO</span><span>PAYMENTS</span><span>CROSS-BORDER</span><span>MOBILE</span>
                  </div>
                </div>
                <p className="wr-card-desc">Crypto-to-fiat payment platform — simplifying cross-border transactions for emerging markets.</p>
                <Link to="/zentipay" className="wr-arrow-btn">VIEW PROJECT &rarr;</Link>
              </div>
              <div className="wr-card-images">
                <Link to="/zentipay"><div className="wr-card-img-hero"><img src={`${IMG}/zentipay.png`} alt="ZentiPay" loading="lazy" /></div></Link>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ═══ ABOUT CARD — cycling skills ═══ */}
      <section className="wr-about-section">
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
                <img src={skills[skillIdx].img} alt="" draggable={false} key={skillIdx} />
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

      {/* ═══ FEATURED PROJECTS — 2×2 grid ═══ */}
      <section className="wr-more">
        <div className="wr-more-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="wr-more-head">
              <span className="wr-label">FEATURED PROJECTS</span>
              <Link to="/work" className="wr-arrow-btn">View All &rarr;</Link>
            </div>
          </motion.div>
          <div className="hp-pcard-grid">
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                {renderPcard(p, 'eager')}
              </motion.div>
            ))}
          </div>

          {/* Archive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="wr-more-head" style={{ marginTop: '4rem' }}>
              <span className="wr-label">ARCHIVE &middot; 2019&ndash;2026</span>
            </div>
          </motion.div>
          <div className="pcard-masonry">
            {archiveProjects.map(p => renderPcard(p))}
          </div>

          {/* Category strip */}
          <div className="wr-cat-strip">
            <Link to="/ux-design">&raquo; UX Design</Link>
            <Link to="/creative-tech">&raquo; Creative Tech</Link>
            <Link to="/installations">&raquo; Installations</Link>
            <Link to="/brand-visual">&raquo; Brand &amp; Visual</Link>
            <Link to="/ai">&raquo; AI &amp; Wearables</Link>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <WrFooter />
    </>
  );
}
