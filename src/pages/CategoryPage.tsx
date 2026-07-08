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
import { CONTACT_EMAIL } from '../config/site'
import {
  getProject,
  isHiddenProject,
  projectsByCategory,
  type Project,
  type ProjectCategory,
} from '../data/projects'

const CategoryHero = lazy(() => import('../components/CategoryHero'))

const CATEGORIES_WITH_3D = new Set(['installations', 'design-for-good', 'ux-design', 'brand-visual', 'ai', 'creative-tech', 'fintech', 'crypto', 'ai-wearables'])

const CATEGORY_REGISTRY_KEY: Partial<Record<string, ProjectCategory>> = {
  ai: 'ai',
  'ai-wearables': 'ai',
  'ux-design': 'ux',
  'creative-tech': 'creative',
  installations: 'install',
  'brand-visual': 'brand',
  'design-for-good': 'good',
}

/* Curated cross-listing so no landing page runs thin — projects can live in
   several categories when the work genuinely fits (hidden ones are filtered
   out downstream either way). */
const EXTRA_CATEGORY_PROJECTS: Partial<Record<string, string[]>> = {
  'ux-design': ['mentra', 'mentra-miniapps', 'executivelens', 'oncall-lens', 'raahi-project'],
  'creative-tech': ['vj-software', 'black-hole', 'moniac-machine'],
  installations: ['jugalbandi', 'enigma', 'sea-of-salt'],
  'brand-visual': ['mentra-brand', 'office-of-diversity', 'sea-of-salt', 'jugalbandi'],
  fintech: ['moniac-machine', 'executivelens'],
  crypto: ['moniac-machine'],
  'design-for-good': ['healthapp', 'oncall-lens', 'code-for-build'],
}

function addVisibleProject(list: Project[], seen: Set<string>, project?: Project) {
  if (!project || isHiddenProject(project) || seen.has(project.slug)) return
  seen.add(project.slug)
  list.push(project)
}

export default function CategoryPage() {
  const { pathname } = useLocation()
  const slug = pathname.split('/').filter(Boolean).pop() ?? ''
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

  const seenProjectSlugs = new Set<string>()
  const visibleCategoryProjects: Project[] = []

  addVisibleProject(visibleCategoryProjects, seenProjectSlugs, getProject(category.featured.slug))
  category.moreProjects.flat().forEach((project) => {
    addVisibleProject(visibleCategoryProjects, seenProjectSlugs, getProject(project.slug))
  })
  const registryCategory = CATEGORY_REGISTRY_KEY[slug]
  if (registryCategory) {
    projectsByCategory(registryCategory).forEach((project) => {
      addVisibleProject(visibleCategoryProjects, seenProjectSlugs, project)
    })
  }
  EXTRA_CATEGORY_PROJECTS[slug]?.forEach((projectSlug) => {
    addVisibleProject(visibleCategoryProjects, seenProjectSlugs, getProject(projectSlug))
  })

  const featuredProject = visibleCategoryProjects[0] ?? null
  const visibleMoreProjects = featuredProject
    ? visibleCategoryProjects.filter((project) => project.slug !== featuredProject.slug)
    : visibleCategoryProjects
  const projectCount = (featuredProject ? 1 : 0) + visibleMoreProjects.length
  const approachVisualProjects = visibleCategoryProjects.slice(0, 3)

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
          {/* Editorial hero — all categories */}
          <Suspense fallback={null}>
            <CategoryHero
              slug={slug}
              accentColor={category.accentColor}
              title={category.title}
              titleAccent={category.titleAccent}
              description={category.description}
              stats={category.stats}
              tools={category.tools}
              has3D={has3D}
              projectCount={projectCount}
            />
          </Suspense>

          <hr className="lp-divider" />

          {/* All projects, flagship first (full-width), then rest in masonry */}
          <div id="lp-work">
            {featuredProject ? (
              <>
                <p className="lp-section-label">Flagship</p>
                <Reveal>
                  <ProjectCard
                    slug={featuredProject.slug}
                    name={featuredProject.name}
                    image={featuredProject.image}
                    tag={featuredProject.tag}
                    year={featuredProject.year}
                    desc={featuredProject.desc}
                    loading="eager"
                    featured
                    nda={featuredProject.nda}
                  />
                </Reveal>
              </>
            ) : null}

            {visibleMoreProjects.length > 0 && (
              <>
                <p className="lp-section-label">Contemporary work</p>
                <div className="pcard-masonry">
                  {visibleMoreProjects.map((project) => (
                    <Reveal key={project.slug}>
                      <ProjectCard
                        slug={project.slug}
                        name={project.name}
                        image={project.image}
                        tag={project.tag}
                        year={project.year}
                        desc={project.desc}
                        tilt={false}
                        nda={project.nda}
                      />
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Approach */}
          <Reveal>
            <div className="lp-approach">
              <div className="lp-approach-stage">
                <motion.div
                  className="lp-approach-visual"
                  aria-label={`${category.approach.label} visual stack`}
                  initial={{ opacity: 0, y: 24, rotate: -1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="lp-approach-folder" aria-hidden="true">
                    <div className="lp-approach-folder-tab">{category.title} {category.titleAccent}</div>
                    <div className="lp-approach-folder-body">
                      {approachVisualProjects.map((project, index) => (
                        <figure
                          key={project.slug}
                          className={`lp-approach-card lp-approach-card--${index + 1}`}
                        >
                          <img src={project.image} alt="" loading="lazy" />
                          <figcaption>{project.name}</figcaption>
                        </figure>
                      ))}
                      <div className="lp-approach-plaque">
                        <span>{category.approach.label}</span>
                        <strong>{category.tools.slice(0, 3).join(' / ')}</strong>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="lp-approach-copy">
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
              </div>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <section className="cta-v2">
          <div className="wrap cta-v2-inner">
            <h2 className="lp-cta-headline">{category.cta.headline}</h2>
            <p className="lp-cta-sub">{category.cta.sub}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="cta-v2-btn magnetic figma-hover">
              {CONTACT_EMAIL}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
