import { lazy, Suspense } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { categories } from '../data/categories'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import ClientsMarquee from '../components/ClientsMarquee'
import PlaybookSection from '../components/PlaybookSection'
import FigmaFrameLabel from '../components/FigmaFrameLabel'
import FigmaSelect from '../components/FigmaSelect'
import {
  getProject,
  isHiddenProject,
  projectsByCategory,
  type Project,
  type ProjectCategory,
} from '../data/projects'

const CategoryHero = lazy(() => import('../components/CategoryHero'))
const CategoryObject3D = lazy(() => import('../components/CategoryObject3D'))

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
  'ux-design': ['mentra', 'mentra-miniapps', 'executivelens', 'raahi-project'],
  'creative-tech': ['vj-software', 'black-hole', 'moniac-machine'],
  installations: ['jugalbandi', 'enigma', 'sea-of-salt'],
  'brand-visual': ['mentra-brand', 'office-of-diversity', 'sea-of-salt'],
  fintech: ['moniac-machine', 'executivelens'],
  crypto: ['moniac-machine'],
  'design-for-good': ['healthapp', 'raahi-project', 'code-for-build'],
}

/* Each category page carries one editorial "energy strip":
   - Impact/client-driven domains show the "Where my work made a difference"
     logo marquee.
   - Craft/philosophy-driven domains show the rolling Playbook-points strip. */
const CLIENT_STRIP_CATEGORIES = new Set(['ux-design', 'installations', 'design-for-good', 'fintech'])
const PLAYBOOK_STRIP_CATEGORIES = new Set(['ai', 'ai-wearables', 'creative-tech', 'brand-visual', 'crypto'])

const CATEGORY_ANNOTATION_LINKS = [
  { label: 'UX Design', slug: 'ux-design', link: '/ux-design' },
  { label: 'AI & Wearables', slug: 'ai-wearables', link: '/ai-wearables' },
  { label: 'Creative Tech', slug: 'creative-tech', link: '/creative-tech' },
  { label: 'Installations', slug: 'installations', link: '/installations' },
  { label: 'Brand & Visual', slug: 'brand-visual', link: '/brand-visual' },
  { label: 'Design for Good', slug: 'design-for-good', link: '/design-for-good' },
] as const

const CATEGORY_ANNOTATION_ORDER = [
  'ux-design',
  'ai-wearables',
  'creative-tech',
  'fintech',
  'crypto',
  'installations',
  'brand-visual',
  'design-for-good',
  'ai',
] as const

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
  const showClientStrip = CLIENT_STRIP_CATEGORIES.has(slug)
  const showPlaybookStrip = PLAYBOOK_STRIP_CATEGORIES.has(slug)
  const categoryIndex = Math.max(0, CATEGORY_ANNOTATION_ORDER.indexOf(slug as (typeof CATEGORY_ANNOTATION_ORDER)[number]))
  const categoryNum = String(categoryIndex + 1).padStart(2, '0')
  const categoryObjectSlug = slug === 'ai' ? 'ai-wearables' : slug

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

          {/* Editorial energy strip — same placement on every category page */}
          {showClientStrip && (
            <Reveal>
              <ClientsMarquee />
            </Reveal>
          )}
          {showPlaybookStrip && (
            <Reveal>
              <PlaybookSection />
            </Reveal>
          )}

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

          {/* Category annotation */}
          <Reveal>
            <section className="lp-parth-does" style={{ position: 'relative' }}>
              <FigmaFrameLabel name="What Parth does" />
              <div className="lp-parth-card">
                <svg className="wr-about-border" preserveAspectRatio="none" aria-hidden="true">
                  <line x1="12" y1="12" x2="12" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" />
                  <line x1="100%" y1="12" x2="100%" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" transform="translate(-12,0)" />
                  <line x1="12" y1="12" x2="100%" y2="12" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" />
                  <line x1="12" y1="100%" x2="100%" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" transform="translate(0,-12)" />
                </svg>
                <div className="wr-about-dot" style={{ top: '11px' }} />
                <div className="wr-about-dot" style={{ top: '30%' }} />
                <div className="wr-about-dot" style={{ top: '53%' }} />
                <div className="wr-about-dot" style={{ bottom: '11px' }} />

                <div className="wr-about-top">
                  <div className="wr-about-top-left">
                    <span className="wr-about-num">{categoryNum}</span>
                    <span className="wr-about-skill-label">{category.title.toUpperCase()} {category.titleAccent.toUpperCase()}</span>
                  </div>
                  <div className="wr-about-top-right">
                    <span className="wr-about-dot-sq" />
                    <span className="wr-label">ABOUT</span>
                    <span className="wr-about-dot-sq" />
                  </div>
                </div>

                <div className="lp-parth-body">
                  <div className="lp-parth-object" aria-hidden="true">
                    <span>{category.title} {category.titleAccent}</span>
                    <span>Object study</span>
                    <Suspense fallback={null}>
                      <CategoryObject3D
                        slug={categoryObjectSlug}
                        size={230}
                        className="lp-parth-object-canvas"
                      />
                    </Suspense>
                  </div>

                  <div className="lp-parth-copy">
                    <h2 className="wr-about-heading">Parth Pawar</h2>
                    <h2 className="wr-about-heading">does</h2>
                    <div className="wr-about-cycle">
                      <span className="wr-about-arrow" aria-hidden="true">&lt;</span>
                      <span className="wr-about-skill">{category.title} {category.titleAccent}</span>
                      <span className="wr-about-arrow" aria-hidden="true">&gt;</span>
                      <span className="wr-about-arrow" aria-hidden="true">||</span>
                    </div>
                    <p className="wr-about-desc">
                      I design interfaces that disappear, earning trust so quickly that people stop noticing the software. Head of UI/UX at Mentra, previously founding designer at ZentiPay and lead at TransFi.
                    </p>
                    <Link to="/about" className="wr-about-readmore">read more.</Link>
                  </div>
                </div>

                <div className="wr-about-vert" aria-hidden="true">PARTHPAWARWORKS</div>

                <div className="wr-about-bottom">
                  <div className="wr-about-bottom-left">
                    <span className="wr-about-dot-circle" />
                    <span className="wr-about-num">{categoryNum} / {String(CATEGORY_ANNOTATION_ORDER.length).padStart(2, '0')}</span>
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
          </Reveal>

          <Reveal>
            <section className="lp-category-disciplines" style={{ position: 'relative' }}>
              <FigmaFrameLabel name="Disciplines" />
              <div className="lp-category-disciplines-grid">
                {CATEGORY_ANNOTATION_LINKS.map((item, index) => (
                  <Link
                    key={item.slug}
                    to={item.link}
                    className={`lp-category-discipline figma-hover${item.slug === slug || (slug === 'ai' && item.slug === 'ai-wearables') ? ' is-active' : ''}`}
                    style={{ transitionDelay: `${index * 0.04}s` }}
                  >
                    <span className="lp-category-discipline-object" aria-hidden="true">
                      <Suspense fallback={null}>
                        <CategoryObject3D slug={item.slug} size={76} />
                      </Suspense>
                    </span>
                    <span className="lp-category-discipline-label">{item.label}</span>
                    <FigmaSelect />
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

      </div>

      <Footer />
    </div>
  )
}
