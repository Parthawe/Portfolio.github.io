import { lazy, Suspense } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { categories } from '../data/categories'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import FigmaSelect from '../components/FigmaSelect'
import TextReveal from '../components/TextReveal'

const CategoryObject3D = lazy(() => import('../components/CategoryObject3D'))

const CATEGORIES_WITH_3D = new Set(['installations', 'design-for-good', 'ux-design', 'brand-visual', 'ai', 'creative-tech', 'fintech', 'crypto', 'ai-wearables'])

const categoryReveals: Record<string, { front: string; behind: string; label: string }> = {
  'ux-design': { front: 'The interface is the product, when it works, nobody notices the software.', behind: 'Mentra, TransFi, ZentiPay. $50M+ in payment volume. Interfaces that earned trust.', label: 'UX Design' },
  'ai': { front: 'AI that augments, not replaces, the best tools disappear into your workflow.', behind: 'From Clawed to OnCall Lens. AI as a collaborator, not a replacement.', label: 'AI & Wearables' },
  'creative-tech': { front: 'Code is just another material, like wood or clay, but it compiles.', behind: 'Neural network instruments, AI keyboards, audio-reactive visuals. Making the intangible tangible.', label: 'Creative Tech' },
  'installations': { front: 'If people have to read a sign, the installation already failed. The space should teach.', behind: 'Black holes you can hold, blacklight rooms with hidden messages, a 15-foot rotating stage. Built and exhibited.', label: 'Installations' },
  'brand-visual': { front: 'Every brand tells a story, typography is the tone of voice.', behind: 'TEDx art direction, custom typefaces, podcast identities. Visual systems that communicate.', label: 'Brand & Visual' },
  'design-for-good': { front: 'Design should serve everyone, not just the ones who can afford it.', behind: 'Community platforms, civic transit, accessibility reports. Design as a public good.', label: 'Design for Good' },
}

export default function CategoryPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const has3D = CATEGORIES_WITH_3D.has(slug)
  const category = categories.find((c) => c.slug === slug)


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

              {/* 3D Object, only on the 6 real categories */}
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

          {/* All projects, featured first (full-width), then rest in masonry */}
          {(() => {
            const feat = category.featured
            const allMore = category.moreProjects.flat()
            return (
              <>
                {/* Featured, full-width pcard */}
                <Reveal>
                  <ProjectCard slug={feat.slug} name={feat.title} image={feat.image} tag={feat.tag} year={feat.year} desc={feat.desc} loading="eager" featured tiltIntensity={4} />
                </Reveal>

                {/* More Projects, masonry */}
                {allMore.length > 0 && (
                  <>
                    <p className="lp-section-label">More Projects</p>
                    <div className="pcard-masonry">
                      {allMore.map((project) => (
                        <Reveal key={project.slug}>
                          <ProjectCard slug={project.slug} name={project.name} image={project.image} tag={project.tag} year={project.year} desc={project.desc || project.result} tilt={false} />
                        </Reveal>
                      ))}
                    </div>
                  </>
                )}
              </>
            )
          })()}

          {/* Spotlight reveal — category-specific */}
          {categoryReveals[slug] && (
            <section className="wr-reveal-section">
              <TextReveal
                front={categoryReveals[slug].front}
                behind={categoryReveals[slug].behind}
              />
            </section>
          )}

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
            <a href="mailto:parthpawar@nyu.edu" className="cta-v2-btn magnetic figma-hover">
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
              <FigmaSelect />
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
