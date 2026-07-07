import { useState, useEffect, useRef, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectCardComponent from '../components/ProjectCard'
import FigmaSelect from '../components/FigmaSelect'
import {
  featuredProjects,
  selectedWorkProjects,
  archiveWorkProjects,
  filterProjectsByCategory,
  CATEGORIES,
  CATEGORY_LABELS,
  getProjectAccessLabel,
  type Project,
  type ProjectCategory,
} from '../data/projects'
import { CONTACT_EMAIL } from '../config/site'

const filters = CATEGORIES
const WORK_FILTER_EVENT = 'folio:set-work-filter'

interface WorkFilterEventDetail {
  filterKey: 'all' | ProjectCategory
}

const LIBRARY_SECTION_COPY: Record<ProjectCategory, string> = {
  ux: 'Product systems, flows, and interfaces built to ship clearly at scale.',
  ai: 'Voice, wearables, and interface layers where software changes how hardware feels.',
  creative: 'Interactive systems and technical experiments that turn prototypes into experiences.',
  install: 'Spatial work, responsive environments, and physical storytelling in public space.',
  brand: 'Identity, campaigns, and visual systems shaped for recall, not just decoration.',
  good: 'Civic, educational, and community work where design has to earn trust quickly.',
}

const TIMELINE_PRESENT_KEY = 'present'
const TIMELINE_EARLIER_KEY = 'earlier'
const TIER_RANK: Record<NonNullable<Project['tier']>, number> = {
  s: 5,
  a: 4,
  b: 3,
  c: 2,
  d: 1,
}

type WorkViewMode = 'editorial' | 'playlist' | 'library' | 'timeline'

const WORK_VIEW_LABELS: Record<WorkViewMode, string> = {
  editorial: 'Editorial',
  playlist: 'Playlist',
  library: 'Index',
  timeline: 'Arc',
}

function countLabel(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? '' : 's'}`
}

function getTimelineGroup(project: Project) {
  const source = `${project.summaryTimeline || ''} ${project.year}`.trim()
  if (/present/i.test(source)) {
    return { key: TIMELINE_PRESENT_KEY, label: 'Present', sortValue: Number.MAX_SAFE_INTEGER }
  }

  const years = Array.from(source.matchAll(/\d{4}/g)).map(match => Number(match[0]))
  if (years.length) {
    const latest = Math.max(...years)
    return { key: String(latest), label: String(latest), sortValue: latest }
  }

  return { key: TIMELINE_EARLIER_KEY, label: 'Earlier', sortValue: 0 }
}

function getTimelineLeadScore(project: Project) {
  return (
    (project.featured ? 100 : 0) +
    (project.selected ? 50 : 0) +
    (project.summaryImage ? 10 : 0) +
    (project.summaryStats?.length || 0) +
    (project.tier ? TIER_RANK[project.tier] : 0)
  )
}

function getAccessLabel(project: Project) {
  return getProjectAccessLabel(project)
}

function getTimelineSectionSummary(projects: Project[], leadProject: Project) {
  const categoryCounts = new Map<ProjectCategory, number>()
  projects.forEach(project => {
    categoryCounts.set(project.category, (categoryCounts.get(project.category) || 0) + 1)
  })

  const topCategories = [...categoryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([category]) => CATEGORY_LABELS[category])

  if (!topCategories.length) return `Anchored by ${leadProject.name}.`
  if (topCategories.length === 1) return `Anchored by ${leadProject.name}, ${topCategories[0]} in focus.`
  return `Anchored by ${leadProject.name}, ${topCategories.join(' + ')} in focus.`
}

export default function WorkPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState('all')
  const [footerVisible, setFooterVisible] = useState(false)
  const [playlistPreviewSlug, setPlaylistPreviewSlug] = useState<string | null>(null)
  const [libraryPreviewSlug, setLibraryPreviewSlug] = useState<string | null>(null)
  const bottomNavRef = useRef<HTMLElement>(null)
  const currentViewParam = searchParams.get('view')
  const viewMode: WorkViewMode =
    currentViewParam === 'playlist'
      ? 'playlist'
      : currentViewParam === 'library'
        ? 'library'
        : currentViewParam === 'timeline'
          ? 'timeline'
        : 'editorial'
  const [activeLibraryShelf, setActiveLibraryShelf] = useState('start-here')
  const [activeTimelineYear, setActiveTimelineYear] = useState(TIMELINE_PRESENT_KEY)

  useEffect(() => {
    document.body.classList.add('page-work')
    return () => document.body.classList.remove('page-work')
  }, [])

  useEffect(() => {
    document.body.classList.toggle('page-work-playlist', viewMode === 'playlist')
    return () => document.body.classList.remove('page-work-playlist')
  }, [viewMode])

  useEffect(() => {
    document.body.classList.toggle('page-work-library', viewMode === 'library')
    return () => document.body.classList.remove('page-work-library')
  }, [viewMode])

  useEffect(() => {
    document.body.classList.toggle('page-work-timeline', viewMode === 'timeline')
    return () => document.body.classList.remove('page-work-timeline')
  }, [viewMode])

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
  const editorialSelectedProjects = isAll
    ? selectedWorkProjects
    : filterProjectsByCategory(selectedWorkProjects, activeFilter as ProjectCategory)
  const selectedProjects = isAll
    ? selectedWorkProjects.filter(project => !project.featured)
    : filterProjectsByCategory(
        selectedWorkProjects.filter(project => !project.featured),
        activeFilter as ProjectCategory,
      )
  const archiveProjects = isAll
    ? archiveWorkProjects
    : filterProjectsByCategory(archiveWorkProjects, activeFilter as ProjectCategory)
  const playlistProjects = [...flagshipProjects, ...selectedProjects, ...archiveProjects]
  const allPlaylistProjects = [
    ...featuredProjects,
    ...selectedWorkProjects.filter(project => !project.featured),
    ...archiveWorkProjects,
  ]
  const timelineSections = allPlaylistProjects
    .map((project, index) => ({
      project,
      index,
      timeline: getTimelineGroup(project),
    }))
    .sort((a, b) => b.timeline.sortValue - a.timeline.sortValue || a.index - b.index)
    .reduce<Array<{ key: string; label: string; projects: Project[] }>>((groups, entry) => {
      const existing = groups.find(group => group.key === entry.timeline.key)
      if (existing) {
        existing.projects.push(entry.project)
        return groups
      }

      groups.push({
        key: entry.timeline.key,
        label: entry.timeline.label,
        projects: [entry.project],
      })
      return groups
    }, [])
    .map(section => {
      const orderedProjects = [...section.projects].sort((a, b) => getTimelineLeadScore(b) - getTimelineLeadScore(a))
      return {
        ...section,
        leadProject: orderedProjects[0],
        projects: orderedProjects,
        supportingProjects: orderedProjects.slice(1),
        summary: getTimelineSectionSummary(orderedProjects, orderedProjects[0]),
      }
    })
  const librarySections = [
    {
      key: 'start-here',
      label: 'Start Here',
      description: 'The four projects that explain the portfolio fastest: shipped systems, platform thinking, and range.',
      projects: featuredProjects,
    },
    ...CATEGORIES
      .filter(filter => filter.key !== 'all')
      .map(filter => {
        const category = filter.key as ProjectCategory
        return {
          key: category,
          label: filter.label,
          description: LIBRARY_SECTION_COPY[category],
          projects: filterProjectsByCategory(allPlaylistProjects, category),
        }
      })
      .filter(section => section.projects.length),
  ]
  const activeLibrarySection =
    librarySections.find(section => section.key === activeLibraryShelf) ?? librarySections[0] ?? null
  const libraryPreviewProject =
    allPlaylistProjects.find(project => project.slug === libraryPreviewSlug)
    ?? activeLibrarySection?.projects[0]
    ?? librarySections[0]?.projects[0]
    ?? null
  const libraryPreviewMedia = libraryPreviewProject?.previewMedia?.library
  const libraryPreviewImage = libraryPreviewMedia?.src || libraryPreviewProject?.summaryImage || libraryPreviewProject?.image || ''
  const libraryPreviewAlt = libraryPreviewMedia?.alt || libraryPreviewProject?.summaryImageAlt || libraryPreviewProject?.name || ''
  const playlistPreviewProject =
    playlistProjects.find(project => project.slug === playlistPreviewSlug) ?? playlistProjects[0] ?? null
  const playlistPreviewMedia = playlistPreviewProject?.previewMedia?.playlist
  const playlistPreviewImage = playlistPreviewMedia?.src || playlistPreviewProject?.image || ''
  const playlistPreviewAlt = playlistPreviewMedia?.alt || playlistPreviewProject?.name || ''
  const playlistPreviewBody = playlistPreviewProject
    ? playlistPreviewProject.summaryProblem || playlistPreviewProject.desc
    : ''

  const renderCard = useCallback((project: Project) => (
    <ProjectCardComponent key={project.slug} slug={project.slug} name={project.name} image={project.image} tag={project.tag} year={project.year} desc={project.desc} loading={project.loading} nda={project.nda} />
  ), [])

  const setViewMode = useCallback((nextView: WorkViewMode) => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextView === 'playlist' || nextView === 'library' || nextView === 'timeline') {
      nextParams.set('view', nextView)
    } else {
      nextParams.delete('view')
    }
    setSearchParams(nextParams, { replace: true })
  }, [searchParams, setSearchParams])

  const handleFilterChange = useCallback((filterKey: 'all' | ProjectCategory) => {
    setActiveFilter(filterKey)
    if (viewMode === 'editorial') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [viewMode])

  const renderFilterButtons = () => filters.map(f => (
    <button
      key={f.key}
      type="button"
      data-work-filter={f.key}
      aria-pressed={activeFilter === f.key}
      aria-controls="work-project-results"
      className={`pill-link work-bnav-link figma-hover${activeFilter === f.key ? ' active' : ''}`}
      onClick={() => handleFilterChange(f.key as 'all' | ProjectCategory)}
    >
      {f.label}
      <FigmaSelect />
    </button>
  ))

  useEffect(() => {
    if (!playlistProjects.length) {
      setPlaylistPreviewSlug(null)
      return
    }

    if (!playlistPreviewSlug || !playlistProjects.some(project => project.slug === playlistPreviewSlug)) {
      setPlaylistPreviewSlug(playlistProjects[0].slug)
    }
  }, [playlistPreviewSlug, playlistProjects])

  const getFilterCount = useCallback((filterKey: 'all' | ProjectCategory) => {
    if (filterKey === 'all') return allPlaylistProjects.length
    return filterProjectsByCategory(allPlaylistProjects, filterKey).length
  }, [allPlaylistProjects])

  const handleLibraryJump = useCallback((shelfKey: string) => {
    setActiveLibraryShelf(shelfKey)
    const target = document.getElementById(`work-library-${shelfKey}`)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    if (viewMode !== 'library') return

    if (!activeLibrarySection?.projects.length) {
      setLibraryPreviewSlug(null)
      return
    }

    const hasCurrentPreview = activeLibrarySection.projects.some(project => project.slug === libraryPreviewSlug)
    if (!libraryPreviewSlug || !hasCurrentPreview) {
      setLibraryPreviewSlug(activeLibrarySection.projects[0].slug)
    }
  }, [activeLibrarySection, libraryPreviewSlug, viewMode])

  useEffect(() => {
    if (viewMode !== 'library') return

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-library-shelf]'))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        const shelfKey = visible?.target.getAttribute('data-library-shelf')
        if (shelfKey) {
          setActiveLibraryShelf(shelfKey)
        }
      },
      {
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0.15, 0.3, 0.5],
      }
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [viewMode, librarySections.length])

  const handleTimelineJump = useCallback((yearKey: string) => {
    setActiveTimelineYear(yearKey)
    const target = document.getElementById(`work-timeline-${yearKey}`)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    if (viewMode !== 'timeline') return

    if (!timelineSections.length) {
      setActiveTimelineYear(TIMELINE_PRESENT_KEY)
      return
    }

    if (!timelineSections.some(section => section.key === activeTimelineYear)) {
      setActiveTimelineYear(timelineSections[0].key)
    }
  }, [activeTimelineYear, timelineSections, viewMode])

  useEffect(() => {
    if (viewMode !== 'timeline') return

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-timeline-year]'))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        const yearKey = visible?.target.getAttribute('data-timeline-year')
        if (yearKey) {
          setActiveTimelineYear(yearKey)
        }
      },
      {
        rootMargin: '-20% 0px -58% 0px',
        threshold: [0.15, 0.3, 0.5],
      }
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [timelineSections.length, viewMode])

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
              <div className="work-page-intro">
                <h1 className="work-page-title">Work</h1>
                <p className="work-page-intro-copy">
                  Selected product, systems, and interaction work for product design and design engineering roles.
                </p>
                <div className="work-view-switch surface-glass surface-glass--subtle" role="toolbar" aria-label="Choose Work page view">
                  {(Object.keys(WORK_VIEW_LABELS) as WorkViewMode[]).map(mode => (
                    <button
                      key={mode}
                      type="button"
                      className={`work-view-switch__button figma-hover${viewMode === mode ? ' is-active surface-glass--active' : ''}`}
                      aria-pressed={viewMode === mode}
                      onClick={() => setViewMode(mode)}
                    >
                      {WORK_VIEW_LABELS[mode]}
                    </button>
                  ))}
                </div>
                {viewMode === 'editorial' ? (
                  <nav className="work-filter-inline surface-glass" aria-label="Filter projects inline" role="toolbar">
                    {renderFilterButtons()}
                  </nav>
                ) : null}
              </div>
            </header>

            {viewMode === 'editorial' ? (
              <>
                <section className="work-group work-group--selected" id="work-project-results" aria-label={isAll ? 'Selected projects' : `${CATEGORY_LABELS[activeFilter as ProjectCategory]} selected projects`}>
                  <div className="work-group-head">
                    <span className="mono-label work-group-label">Selected Work</span>
                  </div>

                  {editorialSelectedProjects.length ? (
                    <div className="pcard-masonry">
                      {editorialSelectedProjects.map(renderCard)}
                    </div>
                  ) : null}
                </section>

                {archiveProjects.length ? (
                  <section className="work-group work-group--archive" aria-label={isAll ? 'Archive projects' : `${CATEGORY_LABELS[activeFilter as ProjectCategory]} archive projects`}>
                    <div className="work-group-head">
                      <span className="mono-label work-group-label">Archive</span>
                    </div>
                    <div className="pcard-masonry">
                      {archiveProjects.map(renderCard)}
                    </div>
                  </section>
                ) : null}
              </>
            ) : viewMode === 'playlist' ? (
              <section
                className="work-playlist-shell"
                id="work-project-results"
                aria-label={isAll ? 'All work playlist' : `${CATEGORY_LABELS[activeFilter as ProjectCategory]} playlist`}
              >
                <aside className="work-playlist-sidebar">
                  <div className="work-playlist-sidebar__head">
                    <span className="mono-label work-group-label">Playlists</span>
                    <p className="work-group-copy">
                      Switch collections on the left, preview one project at a time, then open the full case study from the queue.
                    </p>
                  </div>
                  <div className="work-playlist-sidebar__list" role="listbox" aria-label="Work playlists">
                    {filters.map((filter) => (
                      <button
                        key={filter.key}
                        type="button"
                        role="option"
                        aria-selected={activeFilter === filter.key}
                        className={`work-playlist-sidebar__item figma-hover${activeFilter === filter.key ? ' is-active' : ''}`}
                        onClick={() => handleFilterChange(filter.key as 'all' | ProjectCategory)}
                      >
                        <span className="work-playlist-sidebar__item-label">{filter.label}</span>
                        <span className="work-playlist-sidebar__item-meta">{countLabel(getFilterCount(filter.key as 'all' | ProjectCategory), 'project')}</span>
                        <FigmaSelect />
                      </button>
                    ))}
                  </div>
                  <div className="work-playlist-sidebar__footer">
                    <span>{flagshipProjects.length} flagship</span>
                    <span>{selectedProjects.length} selected</span>
                    <span>{archiveProjects.length} archive</span>
                  </div>
                </aside>

                <div className="work-playlist-main">
                  <div className="work-playlist-player" aria-live="polite">
                    {playlistPreviewProject ? (
                      <article
                        key={playlistPreviewProject.slug}
                        className={`work-playlist-stage work-playlist-stage--${playlistPreviewProject.slug}`}
                      >
                        <div className="work-playlist-stage__media">
                          <img
                            key={playlistPreviewImage}
                            src={playlistPreviewImage}
                            alt={playlistPreviewAlt}
                            loading="eager"
                            decoding="async"
                          />
                        </div>
                        <div className="work-playlist-stage__copy">
                          <div className="work-playlist-stage__eyebrow">
                            <span>Now previewing</span>
                            <span>{isAll ? 'All work' : CATEGORY_LABELS[activeFilter as ProjectCategory]}</span>
                            <span>{countLabel(playlistProjects.length, 'project')} queued</span>
                          </div>
                          <h2 className="work-playlist-stage__title">{playlistPreviewProject.name}</h2>
                          <p className="work-playlist-stage__body">
                            {playlistPreviewBody}
                          </p>
                          <div className="work-playlist-stage__chips">
                            {[
                              playlistPreviewProject.tag,
                              playlistPreviewProject.summaryTimeline || playlistPreviewProject.year,
                              CATEGORY_LABELS[playlistPreviewProject.category],
                              getAccessLabel(playlistPreviewProject),
                            ]
                              .filter((chip): chip is string => Boolean(chip))
                              // "AI Wearables" (tag) vs "AI & Wearables" (category) read as one chip
                              .filter((chip, index, chips) =>
                                chips.findIndex(other =>
                                  other.toLowerCase().replace(/[^a-z0-9]/g, '') === chip.toLowerCase().replace(/[^a-z0-9]/g, ''),
                                ) === index)
                              .map(chip => <span key={chip}>{chip}</span>)}
                          </div>
                          <div className="work-playlist-stage__actions">
                            <Link to={`/${playlistPreviewProject.slug}`} className="work-playlist-stage__cta figma-hover">
                              Open case study
                              <FigmaSelect />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ) : null}
                  </div>

                  <section className="work-playlist-queue" aria-label="Project queue">
                    <div className="work-playlist-queue__head">
                      <span className="mono-label work-group-label">Queue</span>
                      <p className="work-group-copy">
                        Hover any row to update the preview. Open a row to jump into the case study.
                      </p>
                    </div>
                    <div className="work-playlist-queue__table" role="list">
                      <div className="work-playlist-queue__columns" aria-hidden="true">
                        <span>#</span>
                        <span>Project</span>
                        <span>Role / Outcome</span>
                        <span>When</span>
                        <span></span>
                      </div>
                      {playlistProjects.map((project, index) => (
                        <Link
                          key={project.slug}
                          to={`/${project.slug}`}
                          className={`work-playlist-row${playlistPreviewProject?.slug === project.slug ? ' is-active' : ''}`}
                          onMouseEnter={() => setPlaylistPreviewSlug(project.slug)}
                          onFocus={() => setPlaylistPreviewSlug(project.slug)}
                        >
                          <span className="work-playlist-row__index">{String(index + 1).padStart(2, '0')}</span>
                          <div className="work-playlist-row__project">
                            <span className="work-playlist-row__name">{project.name}</span>
                            <span className="work-playlist-row__meta">
                              {project.tag}
                              {getAccessLabel(project) ? ` / ${getAccessLabel(project)}` : ''}
                            </span>
                          </div>
                          <span className="work-playlist-row__detail">
                            {project.summaryOutcome || project.summaryRole || project.desc}
                          </span>
                          <span className="work-playlist-row__year">{project.summaryTimeline || project.year}</span>
                          <span className="work-playlist-row__cta">Open ↗</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                </div>
              </section>
            ) : viewMode === 'library' ? (
              <section className="work-library-shell" id="work-project-results" aria-label="Work library">
                <div className="work-library-shell__head">
                  <div className="work-library-shell__copy">
                    <span className="mono-label work-group-label">Library</span>
                    <p className="work-group-copy">
                      Browse the portfolio like a collection: flagship work first, then shelves by discipline. Each shelf keeps one lead project in view and the rest close by.
                    </p>
                  </div>
                  <div className="work-library-nav surface-glass surface-glass--subtle" role="toolbar" aria-label="Jump to library shelf">
                    {librarySections.map(section => (
                      <button
                        key={section.key}
                        type="button"
                        aria-pressed={activeLibraryShelf === section.key}
                        className={`work-library-nav__item figma-hover${activeLibraryShelf === section.key ? ' is-active surface-glass--active' : ''}`}
                        onClick={() => handleLibraryJump(section.key)}
                      >
                        <span>{section.label}</span>
                        <small>{section.projects.length}</small>
                        <FigmaSelect />
                      </button>
                    ))}
                  </div>
                </div>

                {libraryPreviewProject ? (
                  <aside className="work-library-preview surface-glass surface-glass--subtle" aria-hidden="true">
                    <div className="work-library-preview__frame">
                      <img src={libraryPreviewImage} alt={libraryPreviewAlt} loading="eager" decoding="async" />
                    </div>
                  </aside>
                ) : null}

                <div className="work-library-shelves">
                  {librarySections.map((section, sectionIndex) => {
                    return (
                      <section
                        key={section.key}
                        id={`work-library-${section.key}`}
                        className="work-library-shelf"
                        data-library-shelf={section.key}
                        aria-labelledby={`work-library-title-${section.key}`}
                      >
                        <header className="work-library-shelf__head">
                          <div>
                            <span className="mono-label work-group-label">Shelf {String(sectionIndex + 1).padStart(2, '0')}</span>
                            <h2 id={`work-library-title-${section.key}`} className="work-library-shelf__title">{section.label}</h2>
                            <p className="work-library-shelf__body-copy">{section.description}</p>
                          </div>
                          <span className="work-library-shelf__count">{countLabel(section.projects.length, 'project')}</span>
                        </header>

                        <div className="work-library-list">
                          {section.projects.map((project, projectIndex) => (
                            <Link
                              key={project.slug}
                              to={`/${project.slug}`}
                              className="work-library-row figma-hover"
                              onMouseEnter={() => setLibraryPreviewSlug(project.slug)}
                              onFocus={() => setLibraryPreviewSlug(project.slug)}
                            >
                              <span className="work-library-row__index">{String(projectIndex + 1).padStart(2, '0')}</span>
                              <div className="work-library-row__thumb">
                                <img src={project.image} alt={project.name} loading={section.key === 'start-here' && projectIndex < 2 ? 'eager' : 'lazy'} decoding="async" />
                              </div>
                              <div className="work-library-row__project">
                                <span className="work-library-row__name">{project.name}</span>
                                <span className="work-library-row__meta">
                                  {project.tag}
                                  {getAccessLabel(project) ? ` / ${getAccessLabel(project)}` : ''}
                                </span>
                              </div>
                              <span className="work-library-row__detail">
                                {project.summaryOutcome || project.summaryRole || project.desc}
                              </span>
                              <span className="work-library-row__year">{project.summaryTimeline || project.year}</span>
                              <FigmaSelect />
                            </Link>
                          ))}
                        </div>
                      </section>
                    )
                  })}
                </div>
              </section>
            ) : (
              <section className="work-timeline-shell" id="work-project-results" aria-label="Work arc">
                <aside className="work-timeline-rail surface-glass surface-glass--subtle">
                  <div className="work-timeline-rail__head">
                    <span className="mono-label work-group-label">Arc</span>
                    <p className="work-group-copy">
                      Read the portfolio as progression: one anchor project per period, then the supporting work around it.
                    </p>
                  </div>
                  <div className="work-timeline-rail__list" role="toolbar" aria-label="Jump to period">
                    {timelineSections.map(section => (
                      <button
                        key={section.key}
                        type="button"
                        aria-pressed={activeTimelineYear === section.key}
                        className={`work-timeline-rail__item figma-hover${activeTimelineYear === section.key ? ' is-active surface-glass--active' : ''}`}
                        onClick={() => handleTimelineJump(section.key)}
                      >
                        <span>{section.label}</span>
                        <small>{section.projects.length}</small>
                        <FigmaSelect />
                      </button>
                    ))}
                  </div>
                </aside>

                <div className="work-timeline-main">
                  {timelineSections.map(section => (
                    <section
                      key={section.key}
                      id={`work-timeline-${section.key}`}
                      className="work-timeline-year"
                      data-timeline-year={section.key}
                      aria-labelledby={`work-timeline-label-${section.key}`}
                    >
                      <header className="work-timeline-year__head">
                        <div>
                          <span className="mono-label work-group-label">Period</span>
                          <h2 id={`work-timeline-label-${section.key}`} className="work-timeline-year__label">
                            {section.label}
                          </h2>
                          <p className="work-timeline-year__summary">{section.summary}</p>
                        </div>
                        <span className="work-timeline-year__count">{countLabel(section.projects.length, 'project')}</span>
                      </header>

                      <div className="work-timeline-year__list">
                        <Link
                          to={`/${section.leadProject.slug}`}
                          className="work-timeline-feature figma-hover"
                        >
                          <div className="work-timeline-feature__media">
                            <img
                              src={section.leadProject.summaryImage || section.leadProject.image}
                              alt={section.leadProject.summaryImageAlt || section.leadProject.name}
                              loading={section.key === timelineSections[0]?.key ? 'eager' : 'lazy'}
                              decoding="async"
                            />
                          </div>
                          <div className="work-timeline-feature__body">
                            <div className="work-timeline-feature__eyebrow">
                              <span>Anchor project</span>
                              <span>{section.leadProject.tag}</span>
                              {getAccessLabel(section.leadProject) ? <span>{getAccessLabel(section.leadProject)}</span> : null}
                            </div>
                            <h3 className="work-timeline-feature__title">{section.leadProject.name}</h3>
                            <p className="work-timeline-feature__detail">
                              {section.leadProject.summaryProblem || section.leadProject.summaryOutcome || section.leadProject.desc}
                            </p>
                            <div className="work-timeline-feature__meta">
                              <span>{section.leadProject.summaryTimeline || section.leadProject.year}</span>
                              <span>{section.leadProject.featured ? 'Flagship work' : section.leadProject.selected ? 'Selected work' : 'Archive work'}</span>
                              {section.leadProject.summaryStats?.[0] ? (
                                <span>
                                  {section.leadProject.summaryStats[0].value} {section.leadProject.summaryStats[0].label}
                                </span>
                              ) : null}
                            </div>
                            <span className="work-timeline-feature__cta">Open case study ↗</span>
                          </div>
                          <FigmaSelect />
                        </Link>

                        {section.supportingProjects.length ? (
                          <div className="work-timeline-support">
                            <div className="work-timeline-support__head">
                              <span className="mono-label">Also in {section.label}</span>
                              <span className="work-timeline-support__count">{countLabel(section.supportingProjects.length, 'more project')}</span>
                            </div>
                            <div className="work-timeline-support__list">
                              {section.supportingProjects.map((project, projectIndex) => (
                                <Link
                                  key={project.slug}
                                  to={`/${project.slug}`}
                                  className="work-timeline-support-row figma-hover"
                                >
                                  <span className="work-timeline-support-row__index">{String(projectIndex + 2).padStart(2, '0')}</span>
                                  <div className="work-timeline-support-row__thumb">
                                    <img
                                      src={project.summaryImage || project.image}
                                      alt={project.summaryImageAlt || project.name}
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  </div>
                                  <div className="work-timeline-support-row__body">
                                    <div className="work-timeline-support-row__eyebrow">
                                      <span>{project.tag}</span>
                                      {getAccessLabel(project) ? <span>{getAccessLabel(project)}</span> : null}
                                    </div>
                                    <h3 className="work-timeline-support-row__name">{project.name}</h3>
                                  </div>
                                  <p className="work-timeline-support-row__detail">
                                    {project.summaryOutcome || project.summaryRole || project.desc}
                                  </p>
                                  <span className="work-timeline-support-row__when">{project.summaryTimeline || project.year}</span>
                                  <FigmaSelect />
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            )}
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

      {viewMode === 'editorial' ? (
        <nav className={`work-bottom-nav surface-glass${footerVisible ? ' is-hidden' : ''}`} ref={bottomNavRef} aria-label="Filter projects" role="toolbar">
          {renderFilterButtons()}
        </nav>
      ) : null}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {viewMode === 'library'
          ? `Showing the ${librarySections.find(section => section.key === activeLibraryShelf)?.label || 'current'} library shelf`
          : viewMode === 'timeline'
            ? `Showing the ${timelineSections.find(section => section.key === activeTimelineYear)?.label || 'current'} arc section`
          : activeFilter === 'all'
            ? 'Showing selected and archive projects'
            : `Showing ${CATEGORY_LABELS[activeFilter as ProjectCategory]} projects`}
      </div>

      <Footer />
    </>
  )
}
