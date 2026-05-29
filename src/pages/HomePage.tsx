import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import TextHighlight from '../components/TextHighlight';
import FigmaSelect from '../components/FigmaSelect';
import FigmaFrameLabel from '../components/FigmaFrameLabel';
import { useDeferredMount } from '../hooks/useDeferredMount';
import { useInView } from '../hooks/useInView';
import { allProjectsCurated, featuredProjects, homepageSelectedProjects } from '../data/projects';
import { HOMEPAGE_CONTENT } from '../data/homepageContent';
import { DEFAULT_OG_IMAGE, SITE_URL } from '../config/site';

const HeroScene = lazy(() => import('../components/HeroScene'));
const CategoryObject3D = lazy(() => import('../components/CategoryObject3D'));

interface Skill {
  label: string;
  objectSlug: string;
}

const skills: Skill[] = [
  { label: 'UX Design', objectSlug: 'ux-design' },
  { label: 'Product Design', objectSlug: 'ux-design' },
  { label: 'Fintech', objectSlug: 'fintech' },
  { label: 'Creative Technology', objectSlug: 'creative-tech' },
  { label: 'Physical Computing', objectSlug: 'installations' },
  { label: 'Installations', objectSlug: 'installations' },
];

const disciplines = [
  { label: 'UX Design', slug: 'ux-design', link: '/ux-design' },
  { label: 'AI & Wearables', slug: 'ai', link: '/ai' },
  { label: 'Creative Tech', slug: 'creative-tech', link: '/creative-tech' },
  { label: 'Installations', slug: 'installations', link: '/installations' },
  { label: 'Brand & Visual', slug: 'brand-visual', link: '/brand-visual' },
  { label: 'Design for Good', slug: 'design-for-good', link: '/design-for-good' },
] as const;

const identityTabs = [
  {
    id: 'who-i-am',
    label: 'Who I am',
    heading: 'Design engineer who turns ambiguous systems into trusted product experiences.',
    script: 'who i am',
  },
  {
    id: 'care-about',
    label: 'What I care about',
    heading: 'I care about the moment complex technology starts feeling calm, legible, and human.',
    script: 'care about',
  },
  {
    id: 'believe-in',
    label: 'What I believe in',
    heading: 'I believe trust is built by interface behavior, not by marketing language.',
    script: 'believe in',
  },
  {
    id: 'can-cook',
    label: 'What I can cook',
    heading: 'I can cook product strategy, UX systems, prototypes, motion, and shipped front-end.',
    script: 'can cook',
  },
  {
    id: 'upto',
    label: "What I'm up to",
    heading: 'Currently designing MentraOS, the companion app, MiniApp Store, and launch surfaces.',
    script: 'up to',
  },
] as const;

export default function HomePage() {
  const navigate = useNavigate();
  const [skillIdx, setSkillIdx] = useState(0);
  const [skillPaused, setSkillPaused] = useState(false);
  const [showAllArchiveProjects, setShowAllArchiveProjects] = useState(false);
  const [identityTab, setIdentityTab] = useState<(typeof identityTabs)[number]['id']>('who-i-am');
  const heroRef = useRef<HTMLElement>(null);
  const [disciplinesRef, disciplinesInView] = useInView<HTMLElement>(0.05, '180px 0px');
  const [aboutRef, aboutInView] = useInView<HTMLElement>(0.08, '160px 0px');
  const mountHeroScene = useDeferredMount(true, { timeout: 2200, delayMs: 250 });
  const mountDisciplineObjects = useDeferredMount(disciplinesInView, { timeout: 1400, delayMs: 150 });
  const mountAboutObject = useDeferredMount(aboutInView, { timeout: 1600, delayMs: 120 });
  const archiveProjectSlugs = new Set(homepageSelectedProjects.map(project => project.slug));
  const appendedArchiveProjects = allProjectsCurated.filter(
    project => !project.featured && !archiveProjectSlugs.has(project.slug),
  );
  const fullArchiveProjects = [...homepageSelectedProjects, ...appendedArchiveProjects];
  const archiveProjects = showAllArchiveProjects ? fullArchiveProjects : homepageSelectedProjects;
  const fullArchiveCount = fullArchiveProjects.length;
  const activeIdentity = identityTabs.find(tab => tab.id === identityTab) ?? identityTabs[0];

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
          <h1 className="wr-hero-title">Designing product systems people trust.</h1>
        </div>

      </section>

      <Nav />

      <main id="main-content">
        <div className="abt-paper">
          <section className="wr-identity" aria-labelledby="wr-identity-title" style={{ position: 'relative' }}>
            <FigmaFrameLabel name="Identity" />
            <div className="wr-identity-inner">
              <div className="wr-identity-tabs" role="tablist" aria-label="Identity prompts">
                {identityTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    id={`identity-tab-${tab.id}`}
                    className={`wr-identity-tab${activeIdentity.id === tab.id ? ' is-active' : ''}`}
                    role="tab"
                    aria-selected={activeIdentity.id === tab.id}
                    aria-controls="wr-identity-panel"
                    onClick={() => setIdentityTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeIdentity.id}
                id="wr-identity-panel"
                className="wr-identity-panel"
                role="tabpanel"
                aria-labelledby={`identity-tab-${activeIdentity.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="wr-identity-title" id="wr-identity-title">
                  {activeIdentity.heading}
                </h2>
                <p className="wr-identity-script" aria-hidden="true">{activeIdentity.script}</p>
              </motion.div>

              <a className="wr-identity-scroll figma-hover" href="#works" aria-label="Scroll to featured work">
                <span className="wr-identity-scroll-icon" aria-hidden="true">↕</span>
                <span>scroll to see work</span>
                <FigmaSelect />
              </a>
            </div>
          </section>

          <section className="wr-featured-v2" id="works" style={{ position: 'relative' }}>
            <FigmaFrameLabel name="Featured Work" />
            <div className="wr-featured-v2-inner">
              <div className="wr-section-head">
                <span className="wr-label">FLAGSHIP WORK</span>
                <TextHighlight as="span" className="wr-section-highlight">Start with these four.</TextHighlight>
                <Link to="/work" className="wr-arrow-btn figma-hover">View all work &rarr;<FigmaSelect /></Link>
              </div>

              <div className="wr-feat-grid">
                {featuredProjects.map((project, index) => {
                  const featuredInfo = [
                    project.desc,
                    project.summaryRole?.replace(/\.$/, ''),
                    ...(project.summaryStats?.slice(0, 2).map(stat => `${stat.label} ${stat.value}`) ?? []),
                  ]
                    .filter(Boolean)
                    .join(' / ');
                  const hoverMedia = project.hoverMedia;

                  return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProjectCard
                      slug={project.slug}
                      name={project.name}
                      image={project.image}
                      hoverMediaSrc={hoverMedia?.src}
                      hoverMediaKind={hoverMedia?.kind}
                      hoverMediaAlt={hoverMedia?.alt}
                      tag={project.tag}
                      year={project.year}
                      marqueeText={featuredInfo}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      nda={project.nda}
                    />
                  </motion.div>
                  );
                })}
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

              <div className="wr-archive-reveal">
                <button
                  type="button"
                  className="wr-arrow-btn wr-arrow-btn--button figma-hover wr-archive-reveal__button"
                  aria-expanded={showAllArchiveProjects}
                  aria-controls="homepage-project-archive"
                  onClick={() => setShowAllArchiveProjects(current => !current)}
                >
                  {showAllArchiveProjects ? 'Collapse archive' : `Reveal all ${fullArchiveCount} projects`}
                  <FigmaSelect />
                </button>
                <p className="wr-archive-reveal__note">
                  {showAllArchiveProjects ? 'Everything is expanded here now.' : 'Open the full archive right here without leaving the page.'}
                </p>
              </div>
            </div>
          </section>

          <section className="wr-about-section" style={{ position: 'relative' }} ref={aboutRef}>
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
                  <div className="wr-about-object-wrap" id="about-img-wrap" aria-hidden="true">
                    <div className="wr-about-object-stage">
                      <div className="wr-about-object-label">
                        <span>{skills[skillIdx].label}</span>
                        <span>Object study</span>
                      </div>
                      <div className="wr-about-object-shell" key={skills[skillIdx].label}>
                        {mountAboutObject ? (
                          <Suspense fallback={null}>
                            <CategoryObject3D
                              slug={skills[skillIdx].objectSlug}
                              size={250}
                              className="wr-about-object-canvas"
                            />
                          </Suspense>
                        ) : null}
                      </div>
                    </div>
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
