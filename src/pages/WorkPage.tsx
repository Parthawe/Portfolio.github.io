import { useState, useEffect, useRef, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectCardComponent from '../components/ProjectCard'
import FigmaSelect from '../components/FigmaSelect'
import TextReveal from '../components/TextReveal'
import { allProjectsCurated, projectsByCategory, CATEGORIES, CATEGORY_LABELS, type Project, type ProjectCategory } from '../data/projects'
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
            </header>

            {/* ── Spotlight: after header ── */}
            <section className="wr-reveal-section">
              <TextReveal
                front="33 projects across 6 disciplines, from $50M payment rails to 200-neuron light sculptures."
                behind="UX design, AI wearables, creative tech, installations, brand, and design for good. All shipped."
              />
            </section>

            {isAll ? (
              <div className="pcard-masonry">
                {allProjectsCurated.map(renderCard)}
              </div>
            ) : (
              (() => {
                const catProjects = projectsByCategory(activeFilter as ProjectCategory)
                return (
                  <section className="work-group" data-category={activeFilter}>
                    <span className="mono-label work-group-label">{CATEGORY_LABELS[activeFilter as ProjectCategory]}</span>
                    <div className="pcard-masonry">
                      {catProjects.map(renderCard)}
                    </div>
                  </section>
                )
              })()
            )}
          </div>

          {/* ── Spotlight: before CTA ── */}
          <section className="wr-reveal-section">
            <TextReveal
              front="If you scrolled this far, we should probably talk, I'm always up for hard problems and good conversation."
              behind="Full-time product design where the interface is the product. SF preferred. Let's make something together."
            />
          </section>

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

      <nav className={`work-bottom-nav${footerVisible ? ' is-hidden' : ''}`} ref={bottomNavRef} aria-label="Filter projects" role="tablist">
        {filters.map(f => (
          <button
            key={f.key}
            data-work-filter={f.key}
            role="tab"
            aria-selected={activeFilter === f.key}
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
        {activeFilter === 'all' ? 'Showing all projects' : `Showing ${activeFilter} projects`}
      </div>

      <Footer />
    </>
  )
}
