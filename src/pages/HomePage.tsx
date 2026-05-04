import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import FlagshipProjectShowcase from '../components/FlagshipProjectShowcase';
import TextHighlight from '../components/TextHighlight';
import FigmaSelect from '../components/FigmaSelect';
import FigmaFrameLabel from '../components/FigmaFrameLabel';
import { useDeferredMount } from '../hooks/useDeferredMount';
import { useInView } from '../hooks/useInView';
import { allProjectsCurated, featuredProjects, homepageSelectedProjects } from '../data/projects';
import { HOMEPAGE_CONTENT } from '../data/homepageContent';
import { CONTACT_EMAIL, DEFAULT_OG_IMAGE, SITE_URL, RESUME_URL } from '../config/site';

const HeroScene = lazy(() => import('../components/HeroScene'));
const CategoryObject3D = lazy(() => import('../components/CategoryObject3D'));

const IMG = '/Portfolio.github.io/Assets/images';

interface Skill {
  label: string;
  img: string;
}

const skills: Skill[] = [
  { label: 'UX Design', img: `${IMG}/mentra.png` },
  { label: 'Product Design', img: `${IMG}/executivelens.png` },
  { label: 'Fintech', img: `${IMG}/zentipay.png` },
  { label: 'Creative Technology', img: `${IMG}/jugalbandi.webp` },
  { label: 'Physical Computing', img: `${IMG}/enigma.jpg` },
  { label: 'Installations', img: `${IMG}/keyboard.jpg` },
];

const disciplines = [
  { label: 'UX Design', slug: 'ux-design', link: '/ux-design' },
  { label: 'AI & Wearables', slug: 'ai', link: '/ai' },
  { label: 'Creative Tech', slug: 'creative-tech', link: '/creative-tech' },
  { label: 'Installations', slug: 'installations', link: '/installations' },
  { label: 'Brand & Visual', slug: 'brand-visual', link: '/brand-visual' },
  { label: 'Design for Good', slug: 'design-for-good', link: '/design-for-good' },
] as const;

export default function HomePage() {
  const navigate = useNavigate();
  const [skillIdx, setSkillIdx] = useState(0);
  const [skillPaused, setSkillPaused] = useState(false);
  const [showAllArchiveProjects, setShowAllArchiveProjects] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [disciplinesRef, disciplinesInView] = useInView<HTMLElement>(0.05, '180px 0px');
  const mountHeroScene = useDeferredMount(true, { timeout: 2200, delayMs: 250 });
  const mountDisciplineObjects = useDeferredMount(disciplinesInView, { timeout: 1400, delayMs: 150 });
  const archiveProjects = showAllArchiveProjects
    ? allProjectsCurated.filter(project => !project.featured)
    : homepageSelectedProjects;
  const leadFlagshipProject = featuredProjects[0];
  const supportingFlagshipProjects = featuredProjects.slice(1);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const auroraY = useTransform(heroProgress, [0, 1], ['0%', '-15%']);
  const sceneOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

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
        <meta property="og:image" content={`${SITE_URL}${DEFAULT_OG_IMAGE}`} />
        <link rel="canonical" href={SITE_URL} />
      </Helmet>

      <section className="wr-hero" id="hero" ref={heroRef} style={{ position: 'relative' }}>
        <FigmaFrameLabel name="Hero" />
        <div className="grain-section" aria-hidden="true" />
        <motion.div className="wr-hero-aurora-bottom" style={{ y: auroraY }} />

        <motion.div className="wr-hero-3d" style={{ opacity: sceneOpacity }} aria-hidden="true">
          {mountHeroScene ? (
            <Suspense fallback={null}>
              <HeroScene onNavigate={navigate} />
            </Suspense>
          ) : null}
        </motion.div>

        <div className="wr-hero-copy">
          <p className="wr-hero-eyebrow">Parth Pawar / Design Engineer</p>
          <h1 className="wr-hero-title">Designing product systems people trust.</h1>
          <p className="wr-hero-dek">
            AI wearables, fintech, and experimental interfaces with the rigor to ship.
          </p>
          <div className="wr-hero-actions">
            <a href="#works" className="wr-hero-action">Best 4 Projects</a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="wr-hero-action">Resume</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="wr-hero-action">Contact</a>
          </div>
        </div>

        <div className="wr-hero-caption">
          <div className="wr-hero-caption-main">
            <p className="wr-hero-kicker">Currently shipping at Mentra</p>
            <p className="wr-hero-caption-line">OS, companion app, and miniapp platform for AI smart glasses</p>
          </div>
        </div>

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
      </section>

      <Nav />

      <main id="main-content">
        <div className="abt-paper">
          <section className="wr-featured-v2" id="works" style={{ position: 'relative' }}>
            <FigmaFrameLabel name="Featured Work" />
            <div className="wr-featured-v2-inner">
              <div className="wr-section-head">
                <span className="wr-label">FLAGSHIP WORK</span>
                <TextHighlight as="span" className="wr-section-highlight">Start with the four that best show product judgment, systems thinking, and shipped taste</TextHighlight>
                <Link to="/work" className="wr-arrow-btn figma-hover">View Selected &rarr;<FigmaSelect /></Link>
              </div>

              <div className="wr-feat-list">
                {leadFlagshipProject ? (
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <FlagshipProjectShowcase project={leadFlagshipProject} index={0} variant="lead" />
                  </motion.div>
                ) : null}

                {supportingFlagshipProjects.length ? (
                  <div className="wr-flagship-grid">
                    {supportingFlagshipProjects.map((project, index) => (
                      <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7, delay: 0.08 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <FlagshipProjectShowcase project={project} index={index + 1} variant="card" />
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="wr-proof-band" style={{ position: 'relative' }}>
            <FigmaFrameLabel name="Proof Band" />
            <div className="wrap">
              <div className="wr-proof-shell surface-glass">
                <div className="wr-proof-head">
                  <span className="wr-label">EARLY TRUST SIGNALS</span>
                  <p className="wr-proof-recognition">{HOMEPAGE_CONTENT.proofBand.recognition}</p>
                </div>

                <div className="wr-proof-companies" aria-label="Selected companies and organizations">
                  {HOMEPAGE_CONTENT.proofBand.companies.map((company) => (
                    <span key={company} className="wr-proof-company">{company}</span>
                  ))}
                </div>

                <div className="wr-proof-stats">
                  {HOMEPAGE_CONTENT.proofBand.outcomes.map((outcome) => (
                    <div key={outcome.label} className="wr-proof-stat">
                      <span className="wr-proof-value">{outcome.value}</span>
                      <span className="wr-proof-label">{outcome.label}</span>
                    </div>
                  ))}
                </div>

                <blockquote className="wr-proof-quote">
                  <p>{HOMEPAGE_CONTENT.proofBand.testimonial.quote}</p>
                  <cite>{HOMEPAGE_CONTENT.proofBand.testimonial.cite}</cite>
                </blockquote>
              </div>
            </div>
          </section>

          <section className="wr-disciplines" style={{ position: 'relative' }} ref={disciplinesRef}>
            <FigmaFrameLabel name="Disciplines" />
            <div className="wrap wr-disciplines-grid">
              {disciplines.map((d, i) => (
                <motion.div
                  key={d.slug}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={d.link} className="wr-discipline-item figma-hover">
                    <div className="wr-discipline-obj" aria-hidden="true">
                      {mountDisciplineObjects ? (
                        <Suspense fallback={null}>
                          <CategoryObject3D slug={d.slug} size={80} />
                        </Suspense>
                      ) : null}
                    </div>
                    <span className="wr-discipline-label">{d.label}</span>
                    <FigmaSelect />
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="wr-archive" style={{ position: 'relative' }}>
            <FigmaFrameLabel name="Selected Archive" />
            <div className="wr-archive-inner">
              <div className="wr-section-head">
                <div className="wr-section-title-group">
                  <span className="wr-label">SELECTED ARCHIVE</span>
                  <TextHighlight as="span" className="wr-section-highlight">
                    {showAllArchiveProjects ? 'All visible work, one place' : 'More proof, less noise'}
                  </TextHighlight>
                </div>
                <div className="wr-section-actions">
                  <button
                    type="button"
                    className="wr-arrow-btn wr-arrow-btn--button figma-hover"
                    aria-expanded={showAllArchiveProjects}
                    aria-controls="homepage-project-archive"
                    onClick={() => setShowAllArchiveProjects(current => !current)}
                  >
                    {showAllArchiveProjects ? 'Show Less' : 'See All Projects'}
                    <FigmaSelect />
                  </button>
                  <Link to="/work" className="wr-arrow-btn figma-hover">Browse All &rarr;<FigmaSelect /></Link>
                </div>
              </div>

              <div className="wr-archive-grid" id="homepage-project-archive">
                {archiveProjects.map((p, i) => {
                  const col = i % 3;
                  const row = Math.floor(i / 3);
                  const delay = col * 0.1 + row * 0.06;
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
                  );
                })}
              </div>
            </div>
          </section>

          <section className="wr-latest" style={{ position: 'relative' }}>
            <FigmaFrameLabel name="Latest" />
            <div className="wrap">
              <div className="wr-section-head">
                <span className="wr-label">COME BACK FOR THIS</span>
                <TextHighlight as="span" className="wr-section-highlight">Latest thinking and shipped work</TextHighlight>
                <Link to="/writing" className="wr-arrow-btn figma-hover">Open Writing &rarr;<FigmaSelect /></Link>
              </div>

              <div className="wr-latest-grid">
                <div className="wr-latest-column surface-glass">
                  <div className="wr-latest-column-head">
                    <span className="wr-label">Latest writing</span>
                    <p>Three short essays about AI, trust, and interface design under constraints.</p>
                  </div>
                  <div className="wr-latest-list">
                    {HOMEPAGE_CONTENT.latestThinking.map((item) => (
                      <Link key={item.href} to={item.href} className="wr-latest-item figma-hover">
                        <div className="wr-latest-meta">
                          <span>{item.date}</span>
                          <span>{item.tag}</span>
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.excerpt}</p>
                        <FigmaSelect />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="wr-latest-column surface-glass">
                  <div className="wr-latest-column-head">
                    <span className="wr-label">Latest shipped</span>
                    <p>The latest launches, exhibits, and systems work now live in the portfolio.</p>
                  </div>
                  <div className="wr-latest-list">
                    {HOMEPAGE_CONTENT.latestShipped.map((item) => (
                      <Link key={item.href} to={item.href} className="wr-latest-item figma-hover">
                        <div className="wr-latest-meta">
                          <span>{item.date}</span>
                          <span>{item.tag}</span>
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.excerpt}</p>
                        <FigmaSelect />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="wr-about-section" style={{ position: 'relative' }}>
            <FigmaFrameLabel name="About" />
            <div className="wr-about-card" id="about-card">
              <svg className="wr-about-border" preserveAspectRatio="none">
                <line x1="12" y1="12" x2="12" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" />
                <line x1="100%" y1="12" x2="100%" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" transform="translate(-12,0)" />
                <line x1="12" y1="12" x2="100%" y2="12" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" />
                <line x1="12" y1="100%" x2="100%" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" transform="translate(0,-12)" />
              </svg>
              <div className="wr-about-dot" style={{ top: '11px' }} />
              <div className="wr-about-dot" style={{ top: '28%' }} />
              <div className="wr-about-dot" style={{ top: '50%' }} />
              <div className="wr-about-dot" style={{ top: '72%' }} />
              <div className="wr-about-dot" style={{ bottom: '11px' }} />

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

              <div className="wr-about-body">
                <div className="wr-about-img-col">
                  <div className="wr-about-img-wrap" id="about-img-wrap">
                    <img src={skills[skillIdx].img} alt={`Showcase of ${skills[skillIdx].label}`} loading="lazy" decoding="async" draggable={false} key={skillIdx} />
                  </div>
                </div>
                <div className="wr-about-text">
                  <h2 className="wr-about-heading">Parth Pawar</h2>
                  <h2 className="wr-about-heading">does</h2>

                  <div className="wr-about-cycle">
                    <button type="button" className="wr-about-arrow" onClick={() => { setSkillPaused(true); setSkillIdx(prev => (prev - 1 + skills.length) % skills.length); }} aria-label="Previous skill">&lt;</button>
                    <div className="wr-about-skill-wrap">
                      <span className="wr-about-skill" key={skillIdx}>{skills[skillIdx].label}</span>
                    </div>
                    <button type="button" className="wr-about-arrow" onClick={() => { setSkillPaused(true); setSkillIdx(prev => (prev + 1) % skills.length); }} aria-label="Next skill">&gt;</button>
                    <button type="button" className="wr-about-arrow" onClick={() => setSkillPaused(p => !p)} aria-label={skillPaused ? 'Play' : 'Pause'} aria-pressed={!skillPaused}>{skillPaused ? '>' : '||'}</button>
                  </div>

                  <p className="wr-about-desc">
                    I design interfaces that disappear, earning trust so quickly that people stop noticing the software. Head of UI/UX at Mentra, previously founding designer at ZentiPay and lead at TransFi. NYU ITP &rsquo;24.
                  </p>

                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link to="/about" className="wr-about-readmore">read more.</Link>
                    <Link to="/writing" className="wr-about-readmore">writing.</Link>
                  </div>

                  <span className="wr-about-site" aria-hidden="true">PARTHPAWAR.COM</span>
                </div>
              </div>

              <div className="wr-about-vert" aria-hidden="true">PARTHPAWARWORKS</div>

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
        </div>
      </main>

      <Footer />
    </>
  );
}
