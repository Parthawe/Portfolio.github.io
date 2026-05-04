import { useState, useEffect, useRef, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectCardComponent from '../components/ProjectCard'
import FlagshipProjectShowcase from '../components/FlagshipProjectShowcase'
import FigmaSelect from '../components/FigmaSelect'
import {
  featuredProjects,
  selectedWorkProjects,
  archiveWorkProjects,
  filterProjectsByCategory,
  CATEGORIES,
  CATEGORY_LABELS,
  type Project,
  type ProjectCategory,
} from '../data/projects'
import { CONTACT_EMAIL } from '../config/site'

const filters = CATEGORIES
const WORK_FILTER_EVENT = 'folio:set-work-filter'

interface WorkFilterEventDetail {
  filterKey: 'all' | ProjectCategory
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [footerVisible, setFooterVisible] = useState(false)
  const bottomNavRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.body.classList.add('page-work')
    return () => document.body.classList.remove('page-work')
  }, [])

  useEffect(() => {
    const footer = document.querySelector('.footer')
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleFilter = (event: Event) => {
      const customEvent = event as CustomEvent<WorkFilterEventDetail>
      const filterKey = customEvent.detail?.filterKey
      if (!filterKey) return

      setActiveFilter(filterKey)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener(WORK_FILTER_EVENT, handleFilter as EventListener)
    return () => window.removeEventListener(WORK_FILTER_EVENT, handleFilter as EventListener)
  }, [])

  const isAll = activeFilter === 'all'
  const flagshipProjects = isAll
    ? featuredProjects
    : filterProjectsByCategory(featuredProjects, activeFilter as ProjectCategory)
  const leadFlagshipProject = flagshipProjects[0]
  const supportingFlagshipProjects = flagshipProjects.slice(1)
  const selectedProjects = isAll
    ? selectedWorkProjects.filter(project => !project.featured)
    : filterProjectsByCategory(
        selectedWorkProjects.filter(project => !project.featured),
        activeFilter as ProjectCategory,
      )
  const archiveProjects = isAll
    ? archiveWorkProjects
    : filterProjectsByCategory(archiveWorkProjects, activeFilter as ProjectCategory)

  const renderCard = useCallback((project: Project) => (
    <ProjectCardComponent key={project.slug} slug={project.slug} name={project.name} image={project.image} tag={project.tag} year={project.year} desc={project.desc} loading={project.loading} nda={project.nda} />
  ), [])

  return (
    <>
      <Helmet>
        <title>Work · Parth Pawar</title>
        <meta name="description" content="Selected work by Parth Pawar, product design, AI wearables, fintech, creative technology, installations." />
      </Helmet>

      <Nav />

      <main id="main-content">
        <div className="abt-paper">

          <div className="wrap">
            <header className="work-page-header">
              <h1 className="work-page-title">Work</h1>
              <div className="work-page-intro">
                <p className="work-page-intro-copy">
                  Flagship product work first, experimental and archive work second. Built for people
                  hiring for product design, design engineering, and 0 to 1 systems work.
                </p>
                <div className="work-page-intro-meta">
                  <span>{selectedWorkProjects.length} selected projects</span>
                  <span>{archiveWorkProjects.length} archive projects</span>
                </div>
              </div>
            </header>

            <section className="work-group work-group--selected" id="work-project-results" aria-label={isAll ? 'Selected projects' : `${CATEGORY_LABELS[activeFilter as ProjectCategory]} selected projects`}>
              <div className="work-group-head">
                <span className="mono-label work-group-label">Selected Work</span>
                <p className="work-group-copy">
                  The strongest portfolio projects for recruiters and hiring managers: shipped product,
                  systems thinking, and a small number of flagship bets.
                </p>
              </div>

              {flagshipProjects.length ? (
                <div className="work-flagships-list">
                  {leadFlagshipProject ? (
                    <FlagshipProjectShowcase
                      project={leadFlagshipProject}
                      index={0}
                      variant="lead"
                    />
                  ) : null}

                  {supportingFlagshipProjects.length ? (
                    <div className="wr-flagship-grid">
                      {supportingFlagshipProjects.map((project, index) => (
                        <FlagshipProjectShowcase
                          key={project.slug}
                          project={project}
                          index={index + 1}
                          variant="card"
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {selectedProjects.length ? (
                <section className="work-group work-group--selected-grid" aria-label={isAll ? 'More selected projects' : `${CATEGORY_LABELS[activeFilter as ProjectCategory]} more selected projects`}>
                  <div className="work-group-head">
                    <span className="mono-label work-group-label">More Selected</span>
                    <p className="work-group-copy">
                      Strong supporting work across product, systems, and adjacent disciplines.
                    </p>
                  </div>
                  <div className="pcard-masonry">
                    {selectedProjects.map(renderCard)}
                  </div>
                </section>
              ) : null}
            </section>

            {archiveProjects.length ? (
              <section className="work-group work-group--archive" aria-label={isAll ? 'Archive projects' : `${CATEGORY_LABELS[activeFilter as ProjectCategory]} archive projects`}>
                <div className="work-group-head">
                  <span className="mono-label work-group-label">Archive</span>
                  <p className="work-group-copy">
                    Additional work across installations, branding, civic systems, and experiments.
                    Important context, deliberately secondary.
                  </p>
                </div>
                <div className="pcard-masonry">
                  {archiveProjects.map(renderCard)}
                </div>
              </section>
            ) : null}
          </div>

          <section className="cta-v2">
            <div className="wrap cta-v2-inner">
              <h2 className="cta-v2-headline">Let's work together</h2>
              <a href={`mailto:${CONTACT_EMAIL}`} className="cta-v2-btn magnetic figma-hover">
                {CONTACT_EMAIL}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <FigmaSelect />
              </a>
            </div>
          </section>
        </div>
      </main>

      <nav className={`work-bottom-nav surface-glass${footerVisible ? ' is-hidden' : ''}`} ref={bottomNavRef} aria-label="Filter projects" role="toolbar">
        {filters.map(f => (
          <button
            key={f.key}
            type="button"
            data-work-filter={f.key}
            aria-pressed={activeFilter === f.key}
            aria-controls="work-project-results"
            className={`pill-link work-bnav-link figma-hover${activeFilter === f.key ? ' active' : ''}`}
            onClick={() => {
              setActiveFilter(f.key)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            {f.label}
            <FigmaSelect />
          </button>
        ))}
      </nav>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {activeFilter === 'all'
          ? 'Showing selected and archive projects'
          : `Showing ${CATEGORY_LABELS[activeFilter as ProjectCategory]} projects`}
      </div>

      <Footer />
    </>
  )
}
