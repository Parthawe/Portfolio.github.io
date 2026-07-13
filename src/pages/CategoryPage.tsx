import { lazy, Suspense } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { categories } from '../data/categories'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import ClientsMarquee from '../components/ClientsMarquee'
import FigmaFrameLabel from '../components/FigmaFrameLabel'
import FigmaSelect from '../components/FigmaSelect'
import ParthDoesSection from '../components/ParthDoesSection'
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

const CATEGORY_ALIASES: Record<string, string> = {
  brand: 'brand-visual',
  'design-engineer': 'creative-tech',
  healthcare: 'design-for-good',
  ui: 'ux-design',
  ux: 'ux-design',
}

// Keep category chrome aligned with the Figma panel selection color.
const CATEGORY_PAGE_ACCENT = 'var(--select-blue)'

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

const CATEGORY_ANNOTATION_LINKS = [
  { label: 'UX Design', slug: 'ux-design', link: '/ux-design' },
  { label: 'AI & Wearables', slug: 'ai-wearables', link: '/ai-wearables' },
  { label: 'Creative Tech', slug: 'creative-tech', link: '/creative-tech' },
  { label: 'Installations', slug: 'installations', link: '/installations' },
  { label: 'Brand & Visual', slug: 'brand-visual', link: '/brand-visual' },
  { label: 'Design for Good', slug: 'design-for-good', link: '/design-for-good' },
] as const

function addVisibleProject(list: Project[], seen: Set<string>, project?: Project) {
  if (!project || isHiddenProject(project) || seen.has(project.slug)) return
  seen.add(project.slug)
  list.push(project)
}

export default function CategoryPage() {
  const { pathname } = useLocation()
  const rawSlug = pathname.split('/').filter(Boolean).pop() ?? ''
  const slug = CATEGORY_ALIASES[rawSlug] ?? rawSlug
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
  return (
    <div className="category-page" style={{ '--lp-accent': CATEGORY_PAGE_ACCENT } as React.CSSProperties}>
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
              routeSlug={rawSlug}
              accentColor={CATEGORY_PAGE_ACCENT}
              title={category.title}
              titleAccent={category.titleAccent}
              description={category.description}
              stats={category.stats}
              tools={category.tools}
              has3D={has3D}
              projectCount={projectCount}
            />
          </Suspense>

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

          {/* Impact proof: later in the page, after the work has context. */}
          <Reveal>
            <section className="lp-impact-strip" aria-label="Where my work made a difference">
              <ClientsMarquee />
            </section>
          </Reveal>

          <Reveal>
            <ParthDoesSection />
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
