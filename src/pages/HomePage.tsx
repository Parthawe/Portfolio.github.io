import { useState, useEffect, lazy, Suspense, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav'
import ClientsMarquee from '../components/ClientsMarquee';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import TextHighlight from '../components/TextHighlight';
import FigmaSelect from '../components/FigmaSelect';
import FigmaFrameLabel from '../components/FigmaFrameLabel';
import { useDeferredMount } from '../hooks/useDeferredMount';
import { useInView } from '../hooks/useInView';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { featuredProjects, homepageSelectedProjects } from '../data/projects';
import { DEFAULT_OG_IMAGE, SITE_ORIGIN, SITE_URL } from '../config/site';
import { isLowPowerDevice } from '../utils/performance';


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

function distributeArchiveProjects<T>(items: T[], columnCount: number) {
  const columns = Array.from({ length: Math.max(1, columnCount) }, () => [] as T[]);
  items.forEach((item, index) => {
    columns[index % columns.length].push(item);
  });
  return columns;
}

const identityTabs = [
  {
    id: 'who-i-am',
    label: 'Who I am',
    heading: 'Product designer who turns ambiguous systems into trusted product experiences.',
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
    heading: 'Currently designing wearable interfaces, companion apps, store flows, and launch surfaces.',
    script: 'up to',
  },
] as const;

export default function HomePage() {
  const navigate = useNavigate();
  const [skillIdx, setSkillIdx] = useState(0);
  const [skillPaused, setSkillPaused] = useState(false);
  const [identityTab, setIdentityTab] = useState<(typeof identityTabs)[number]['id']>('who-i-am');
  const [heroWebOpen, setHeroWebOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [disciplinesRef, disciplinesInView] = useInView<HTMLElement>(0.05, '180px 0px');
  const [aboutRef, aboutInView] = useInView<HTMLElement>(0.08, '160px 0px');
  const coarsePointer = useMediaQuery('(hover: none), (pointer: coarse)');
  const archiveSingleColumn = useMediaQuery('(max-width: 360px)');
  const archiveTwoColumn = useMediaQuery('(max-width: 1100px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const lowPowerDevice = isLowPowerDevice();
  const allowDecorative3D = !prefersReducedMotion;
  const mountHeroScene = useDeferredMount(allowDecorative3D, {
    timeout: coarsePointer ? 5200 : lowPowerDevice ? 4600 : 3600,
    delayMs: coarsePointer ? 2400 : lowPowerDevice ? 2200 : 1800,
  });
  const mountDisciplineObjects = useDeferredMount(allowDecorative3D && disciplinesInView, { timeout: lowPowerDevice ? 2200 : 1400, delayMs: lowPowerDevice ? 360 : 150 });
  const mountAboutObject = useDeferredMount(allowDecorative3D && aboutInView, { timeout: lowPowerDevice ? 2400 : 1600, delayMs: lowPowerDevice ? 360 : 120 });
  const archiveProjects = homepageSelectedProjects;
  const archiveColumnCount = archiveSingleColumn ? 1 : archiveTwoColumn ? 2 : 3;
  const archiveColumns = useMemo(
    () => distributeArchiveProjects(archiveProjects, archiveColumnCount),
    [archiveProjects, archiveColumnCount]
  );
  const activeIdentity = identityTabs.find(tab => tab.id === identityTab) ?? identityTabs[0];
  const flagshipColumns = [
    featuredProjects.filter((_, index) => index === 0 || index === 2),
    featuredProjects.filter((_, index) => index === 1 || index === 3),
  ];
  const getFlagshipCoverShape = (slug: string): 'portrait' | 'square' =>
    slug === 'mentra' || slug === 'jugalbandi' ? 'portrait' : 'square';

  useEffect(() => {
    if (skillPaused) return;
    const id = setInterval(() => {
      setSkillIdx(prev => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(id);
  }, [skillPaused]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || prefersReducedMotion) return;

    let rafId = 0;
    const update = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      hero.style.setProperty('--wr-hero-aurora-y', `${progress * -15}%`);
      hero.style.setProperty('--wr-hero-scene-opacity', `${Math.max(0, 1 - progress * 1.25)}`);
      rafId = 0;
    };
    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <Helmet>
        <title>Parth Pawar, Portfolio</title>
        <meta name="description" content="Portfolio of Parth Pawar, crafting trusted product experiences across AI wearables, fintech, civic systems, creative technology, and physical computing." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Parth Pawar, Portfolio" />
        <meta property="og:description" content="Product systems, AI wearable interfaces, fintech flows, civic systems, and physical interaction work by Parth Pawar." />
        <meta property="og:image" content={`${SITE_ORIGIN}${DEFAULT_OG_IMAGE}`} />
        <link rel="canonical" href={SITE_URL} />
      </Helmet>

      <section
        className={`wr-hero${mountHeroScene ? ' is-scene-ready' : ''}${heroWebOpen ? ' wr-hero--web-open' : ''}`}
        id="hero"
        ref={heroRef}
        style={{ position: 'relative' }}
      >
        <FigmaFrameLabel name="Hero" />
        <div className="grain-section" aria-hidden="true" />
        <div className="wr-hero-aurora-bottom" aria-hidden="true" />
        <div className="wr-hero-web-scrim" aria-hidden="true" />

        <div className="wr-hero-3d">
          {mountHeroScene ? (
            <Suspense fallback={null}>
              <HeroScene onNavigate={navigate} onExpandedChange={setHeroWebOpen} />
            </Suspense>
          ) : null}
        </div>

        <div className="wr-hero-copy">
          <h1 className="wr-hero-title wr-hero-stage wr-hero-stage--title">Designing product systems people trust.</h1>
          <p className="wr-hero-dek wr-hero-stage wr-hero-stage--dek">
            Head of UI/UX at Mentra, building AI wearable interfaces, fintech flows, civic systems, and physical interaction work.
          </p>
        </div>

      </section>

      <Nav />

      <main id="main-content">
        <div className="abt-paper">
          <section className="wr-featured-v2" id="works" style={{ position: 'relative' }}>
            <FigmaFrameLabel name="Featured Work" />
            <div className="wr-featured-v2-inner">
              <div className="reveal">
                <ClientsMarquee />
              </div>

              <div className="wr-section-head">
                <span className="wr-label">FLAGSHIP WORK</span>
                <TextHighlight as="span" className="wr-section-highlight">Start with these four.</TextHighlight>
                <Link to="/work" className="wr-arrow-btn figma-hover">View all work &rarr;<FigmaSelect /></Link>
              </div>

              <div className="wr-feat-grid">
                {flagshipColumns.map((column, columnIndex) => (
                  <div className="wr-feat-column" key={`flagship-column-${columnIndex}`}>
                    {column.map((project) => {
                      const index = featuredProjects.findIndex(item => item.slug === project.slug);
                      const featuredInfo = [
                        project.desc,
                        project.summaryRole?.replace(/\.$/, ''),
                        ...(project.summaryStats?.slice(0, 2).map(stat => `${stat.label} ${stat.value}`) ?? []),
                      ]
                        .filter(Boolean)
                        .join(' / ');
                      const hoverMedia = ['mentra', 'jugalbandi'].includes(project.slug) ? undefined : project.hoverMedia;

                      return (
                        <div
                          key={project.slug}
                          className="wr-motion-item reveal"
                          data-project={project.slug}
                          style={{ transitionDelay: `${index * 0.06}s` }}
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
                            featured
                            coverShape={getFlagshipCoverShape(project.slug)}
                            nda={project.nda}
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

            </div>
          </section>

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

              <div
                key={activeIdentity.id}
                id="wr-identity-panel"
                className="wr-identity-panel wr-identity-panel--enter"
                role="tabpanel"
                aria-labelledby={`identity-tab-${activeIdentity.id}`}
              >
                <h2 className="wr-identity-title" id="wr-identity-title">
                  {activeIdentity.heading}
                </h2>
                <p className="wr-identity-script" aria-hidden="true">{activeIdentity.script}</p>
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
                    I design interfaces that disappear, earning trust so quickly that people stop noticing the software. Head of UI/UX at Mentra, previously founding designer at ZentiPay and lead at TransFi.
                  </p>

                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link to="/about" className="wr-about-readmore">read more.</Link>
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

          <section className="wr-disciplines" id="disciplines" style={{ position: 'relative' }} ref={disciplinesRef}>
            <FigmaFrameLabel name="Disciplines" />
            <div className="wrap wr-disciplines-grid">
              {disciplines.map((d, i) => (
                <div
                  key={d.slug}
                  className="wr-motion-item wr-motion-item--discipline reveal"
                  style={{ transitionDelay: `${i * 0.05}s` }}
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
                </div>
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
                    More proof, less noise
                  </TextHighlight>
                </div>
                <div className="wr-section-actions">
                  <Link to="/work" className="wr-arrow-btn figma-hover">Browse All &rarr;<FigmaSelect /></Link>
                </div>
              </div>

              <div className="wr-archive-grid" id="homepage-project-archive">
                {archiveColumns.map((column, columnIndex) => (
                  <div className="wr-archive-column" key={`home-archive-column-${columnIndex}`}>
                    {column.map((p, rowIndex) => {
                      const originalIndex = rowIndex * archiveColumnCount + columnIndex;
                      const delay = columnIndex * 0.1 + rowIndex * 0.06;
                      return (
                        <div
                          key={p.slug}
                          className="wr-motion-item reveal"
                          style={{ transitionDelay: `${delay}s` }}
                          data-archive-index={originalIndex}
                        >
                          <ProjectCard slug={p.slug} name={p.name} image={p.image} tag={p.tag} year={p.year} desc={p.desc} nda={p.nda} />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="wr-archive-reveal">
                <Link to="/work" className="wr-arrow-btn figma-hover wr-archive-reveal__button">
                  Open full archive &rarr;
                  <FigmaSelect />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
