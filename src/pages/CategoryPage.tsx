import { useCallback, lazy, Suspense } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { categories } from '../data/categories'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import TiltCard from '../components/TiltCard'
import { Reveal } from '../components/Reveal'
import { getImageBrightness } from '../utils/imageBrightness'

const CategoryObject3D = lazy(() => import('../components/CategoryObject3D'))

const CATEGORIES_WITH_3D = new Set(['installations', 'design-for-good', 'ux-design', 'brand-visual', 'ai', 'creative-tech'])

export default function CategoryPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const has3D = CATEGORIES_WITH_3D.has(slug)
  const category = categories.find((c) => c.slug === slug)

  const handleImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const card = img.closest('.pcard')
    if (!card) return
    try {
      const brightness = getImageBrightness(img)
      if (brightness > 140) {
        card.classList.add('pcard--light')
      }
    } catch {
      // cross-origin or canvas error
    }
  }, [])

  if (!category) {
    return (
      <>
        <Nav />
        <div className="wrap" style={{ paddingTop: '8rem', minHeight: '60vh' }}>
          <h1>Category not found</h1>
          <p>
            <Link to="/work">Back to Work</Link>
          </p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <div style={{ '--lp-accent': category.accentColor } as React.CSSProperties}>
      <Helmet>
        <title>{category.metaTitle}</title>
        <meta name="description" content={category.metaDescription} />
        <meta property="og:title" content={category.metaTitle} />
        <meta property="og:description" content={category.metaDescription} />
      </Helmet>
      <Nav />

      <div id="main-content">
        <div className="wrap">
          {/* Hero */}
          <div className="lp-hero">
            <div className={`lp-hero-grid${has3D ? ' lp-hero-grid--3col' : ''}`}>
              <div className="lp-hero-text">
                <motion.h1
                  className="lp-hero-title"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                  {category.title}
                  <br />
                  <motion.span
                    className="lp-hero-accent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {category.titleAccent}
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="lp-hero-intro"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {category.description}
                </motion.p>
                <motion.div
                  className="lp-stats"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
                >
                  {category.stats.map((stat) => (
                    <motion.span
                      key={stat}
                      className="lp-stat"
                      variants={{
                        hidden: { opacity: 0, scale: 0.85 },
                        show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
                      }}
                    >
                      {stat}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div
                  className="lp-tools"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.6 } } }}
                >
                  {category.tools.map((tool) => (
                    <motion.span
                      key={tool}
                      className="lp-tool"
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                      }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* 3D Object — only on the 6 real categories */}
              {has3D && (
                <motion.div
                  className="lp-hero-3d"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Suspense fallback={null}>
                    <CategoryObject3D slug={slug} size={280} />
                  </Suspense>
                </motion.div>
              )}
            </div>
          </div>

          <hr className="lp-divider" />

          {/* All projects — featured first (full-width), then rest in masonry */}
          {(() => {
            const feat = category.featured
            const allMore = category.moreProjects.flat()
            return (
              <>
                {/* Featured — full-width pcard */}
                <Reveal>
                  <TiltCard intensity={4}>
                  <Link
                    className="pcard pcard--featured"
                    to={`/${feat.slug}`}
                  >
                    <div className="pcard-inner">
                      <div className="pcard-top-row">
                        <span className="pcard-tag">{feat.tag || ''}</span>
                        <span className="pcard-year">{feat.year || ''}</span>
                      </div>
                      <div className="pcard-visual">
                        <img
                          src={feat.image}
                          alt={feat.title}
                          loading="eager"
                          onLoad={handleImgLoad}
                        />
                      </div>
                      <h2 className="pcard-name">{feat.title}</h2>
                      <div className="pcard-marquee">
                        <div className="pcard-marquee-track">
                          <span>{feat.desc} — {feat.desc} — {feat.desc} — </span>
                          <span>{feat.desc} — {feat.desc} — {feat.desc} — </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  </TiltCard>
                </Reveal>

                {/* More Projects — masonry */}
                {allMore.length > 0 && (
                  <>
                    <p className="lp-section-label">More Projects</p>
                    <div className="pcard-masonry">
                      {allMore.map((project) => (
                        <Reveal key={project.slug}>
                          <Link
                            className="pcard"
                            to={`/${project.slug}`}
                          >
                            <div className="pcard-inner">
                              <div className="pcard-top-row">
                                <span className="pcard-tag">{project.tag || ''}</span>
                                <span className="pcard-year">{project.year || ''}</span>
                              </div>
                              <div className="pcard-visual">
                                <img
                                  src={project.image}
                                  alt={project.alt}
                                  loading="lazy"
                                  onLoad={handleImgLoad}
                                />
                              </div>
                              <h2 className="pcard-name">{project.name}</h2>
                              <div className="pcard-marquee">
                                <div className="pcard-marquee-track">
                                  <span>{project.desc || project.result} — {project.desc || project.result} — {project.desc || project.result} — </span>
                                  <span>{project.desc || project.result} — {project.desc || project.result} — {project.desc || project.result} — </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </Reveal>
                      ))}
                    </div>
                  </>
                )}
              </>
            )
          })()}

          {/* Approach */}
          <Reveal>
            <div className="lp-approach">
              <p className="lp-approach-label">{category.approach.label}</p>
              <motion.div
                className="lp-pillars"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              >
                {category.approach.pillars.map((pillar) => (
                  <motion.div
                    key={pillar.num}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
                    }}
                  >
                    <span className="lp-pillar-num">{pillar.num}</span>
                    <p className="lp-pillar-title">{pillar.title}</p>
                    <p className="lp-pillar-desc">{pillar.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <section className="cta-v2">
          <div className="wrap cta-v2-inner">
            <h2 className="lp-cta-headline">{category.cta.headline}</h2>
            <p className="lp-cta-sub">{category.cta.sub}</p>
            <a href="mailto:parthpawar@nyu.edu" className="cta-v2-btn magnetic">
              parthpawar@nyu.edu
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M2 12L12 2M12 2H5M12 2V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
