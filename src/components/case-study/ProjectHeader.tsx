import { lazy, Suspense, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import FigmaSelect from '../FigmaSelect'
import { useDeferredMount } from '../../hooks/useDeferredMount'
import { getProject } from '../../data/projects'
import { isLowPowerDevice } from '../../utils/performance'

const CategoryObject3D = lazy(() => import('../CategoryObject3D'))

interface ProjectHeaderProps {
  backLink: string
  backLabel: string
  tags: string[]
  title: string
  subtitle: string
  info: { label: string; value: string }[]
  heroImage?: string
  heroAlt?: string
  liveUrl?: string
  categorySlug?: string
  showHeaderSummary?: boolean
  heroExperience?: 'visual'
  heroTone?: string
  heroEyebrow?: string
  visualHeadline?: string
  visualSummary?: string
  visualHeroImage?: string
  visualHeroAlt?: string
  liveLabel?: string
}

const TIMELINE_LABELS = ['timeline', 'duration', 'year']
const ROLE_LABELS = ['role', 'my role', 'creator', 'artist', 'host', 'director']
const CONTEXT_LABELS = ['team', 'collaborator', 'company', 'client', 'organization', 'context', 'platform']

function findInfoValue(
  info: ProjectHeaderProps['info'],
  labels: string[],
) {
  const match = info.find((item) => labels.includes(item.label.trim().toLowerCase()))
  return match?.value
}

function slugClass(value?: string) {
  return value ? value.replace(/[^a-z0-9-]/gi, '-').toLowerCase() : ''
}

export default function ProjectHeader({
  backLink,
  backLabel,
  tags,
  title,
  subtitle,
  info,
  heroImage,
  heroAlt,
  liveUrl,
  categorySlug,
  showHeaderSummary = true,
  heroExperience,
  heroTone,
  heroEyebrow,
  visualHeadline,
  visualSummary,
  visualHeroImage,
  visualHeroAlt,
  liveLabel = 'Visit Live Site',
}: ProjectHeaderProps) {
  const location = useLocation()
  const heroRef = useRef<HTMLDivElement>(null)
  const reduceMotion = Boolean(useReducedMotion()) || isLowPowerDevice()
  const canShowOrnament =
    Boolean(categorySlug) &&
    (typeof window === 'undefined' ? false : window.matchMedia('(min-width: 769px)').matches)
  const showCategoryOrnament = useDeferredMount(canShowOrnament, { timeout: 1500, delayMs: 180 })
  const currentSlug = location.pathname.split('/').filter(Boolean).pop() ?? ''
  const project = getProject(currentSlug)
  const story = project?.storyline
  const resolvedHeroImage =
    heroImage ||
    project?.access?.publicPreviewImage ||
    project?.cover16x9 ||   // wide cover suits the 16:9 hero better than the 4:5 card
    project?.summaryImage ||
    project?.cardMockup ||
    project?.cardMockupSource ||
    project?.image
  const resolvedHeroAlt =
    heroAlt ||
    project?.access?.publicPreviewAlt ||
    project?.summaryImageAlt ||
    project?.cardMockupAlt ||
    `${title} project preview`
  const resolvedVisualHeroImage = visualHeroImage || resolvedHeroImage
  const resolvedVisualHeroAlt = visualHeroAlt || resolvedHeroAlt
  const derivedSummary = showHeaderSummary
    ? {
        problem: project?.summaryProblem ?? story?.challenge ?? null,
        role: project?.summaryRole ?? findInfoValue(info, ROLE_LABELS) ?? null,
        outcome: project?.summaryOutcome ?? story?.result ?? null,
        timeline: project?.summaryTimeline ?? findInfoValue(info, TIMELINE_LABELS) ?? null,
        context: project?.summaryTeam ?? findInfoValue(info, CONTEXT_LABELS) ?? null,
        stats: project?.summaryStats ?? [],
      }
    : null
  const headerSummary =
    derivedSummary?.problem && derivedSummary.role && derivedSummary.outcome
      ? derivedSummary
      : null
  const headerSummaryMeta = [headerSummary?.timeline, headerSummary?.context].filter(Boolean).join(' · ')
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.02])
  const heroMotionStyle = reduceMotion ? undefined : { y: heroY, scale: heroScale }
  const proofStats = (headerSummary?.stats ?? []).slice(0, 4)
  // One editorial narrative instead of two boxed grids: the fast-read summary
  // wins when present; the storyline arc is the fallback. Never both — they
  // repeat each other.
  const narrativeRows = headerSummary
    ? [
        { label: 'Problem', copy: headerSummary.problem },
        { label: 'Role', copy: headerSummary.role },
        { label: 'Outcome', copy: headerSummary.outcome },
      ]
    : story
      ? [
          { label: 'Challenge', copy: story.challenge },
          { label: 'Approach', copy: story.approach },
          { label: 'Result', copy: story.result },
        ]
      : []
  const renderStoryAndSummary = (baseAnimIndex: number) =>
    narrativeRows.length ? (
      <section className={`proj-fastread hero-anim hero-anim-${baseAnimIndex}`} aria-label="Fast read summary">
        <header className="proj-fastread-head">
          <div>
            <span className="proj-fastread-kicker">Fast read</span>
            <h2 className="proj-fastread-title">Why this project matters</h2>
          </div>
          {headerSummaryMeta ? <p className="proj-fastread-meta">{headerSummaryMeta}</p> : null}
        </header>

        <dl className="proj-fastread-list">
          {narrativeRows.map((row) => (
            <div className="proj-fastread-row" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.copy}</dd>
            </div>
          ))}
        </dl>

        {proofStats.length ? (
          <div className="proj-fastread-stats" aria-label="Project proof points">
            {proofStats.map((stat) => (
              <div key={stat.label} className="proj-fastread-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    ) : null

  if (heroExperience !== undefined || resolvedVisualHeroImage) {
    const visualKicker = heroEyebrow || title
    const visualTitle = visualSummary || visualHeadline || subtitle
    const visualClasses = [
      'wrap',
      'project-header',
      'project-header--visual',
      heroTone ? `project-header--${slugClass(heroTone)}` : '',
      project?.category ? `project-header--cat-${project.category}` : '',
      currentSlug ? `project-header--project-${slugClass(currentSlug)}` : '',
    ].filter(Boolean).join(' ')

    return (
      <div className={visualClasses}>
        <section className="proj-visual-hero hero-anim hero-anim-1" aria-label={`${title} project introduction`}>
          <div className="proj-visual-hero__copy">
            <span className="proj-visual-kicker">{visualKicker}</span>
            <h1 className="proj-visual-title">{visualTitle}</h1>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-visual-live figma-hover"
              >
                {liveLabel}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <FigmaSelect />
              </a>
            )}
          </div>

          <div className="proj-visual-stage">
            <div className="proj-visual-hero__chrome" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            {resolvedVisualHeroImage && (
              <div className="proj-visual-hero__media" ref={heroRef}>
                <motion.img
                  src={resolvedVisualHeroImage}
                  alt={resolvedVisualHeroAlt}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  style={heroMotionStyle}
                />
              </div>
            )}
          </div>
        </section>

        <div className="proj-info-row proj-info-row--visual hero-anim hero-anim-2">
          {info.map((item) => (
            <div key={item.label} className="proj-info-item">
              <span className="proj-info-label">{item.label}</span>
              <span className="proj-info-val">{item.value}</span>
            </div>
          ))}
        </div>

        {renderStoryAndSummary(3)}
      </div>
    )
  }

  return (
    <div className="wrap project-header">
      <div className="proj-back">
        <Link to={backLink} className="back-link figma-hover">
          &larr; {backLabel}
          <FigmaSelect />
        </Link>
      </div>
      <section className={`proj-hero-system ${resolvedHeroImage ? 'proj-hero-system--media' : 'proj-hero-system--text'}`} aria-label={`${title} project introduction`}>
        <div className="proj-meta">
          {categorySlug && (
            <div className="proj-3d-ornament">
              {showCategoryOrnament ? (
                <Suspense fallback={null}>
                  <CategoryObject3D slug={categorySlug} size={typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 140} />
                </Suspense>
              ) : null}
            </div>
          )}
          <div className="proj-tags">
            {tags.map((tag) => (
              <span key={tag} className="proj-tag">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="proj-title hero-anim hero-anim-1">{title}</h1>
          <p className="proj-subtitle hero-anim hero-anim-2">{subtitle}</p>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-live-link hero-anim hero-anim-4 figma-hover"
            >
              {liveLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <FigmaSelect />
            </a>
          )}
        </div>

        {resolvedHeroImage && (
          <div className="proj-hero-panel hero-anim hero-anim-3">
            <div className="proj-hero-img" ref={heroRef}>
              <motion.img
                src={resolvedHeroImage}
                alt={resolvedHeroAlt}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                style={heroMotionStyle}
              />
            </div>
            <div className="proj-hero-caption">
              <span>{project?.access?.mode === 'request' ? 'Safe public preview' : 'Project visual'}</span>
              <strong>{title}</strong>
            </div>
            {proofStats.length ? (
              <div className="proj-hero-stats" aria-label={`${title} proof points`}>
                {proofStats.map((stat) => (
                  <div key={stat.label} className="proj-hero-stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}

        <div className="proj-info-row hero-anim hero-anim-3">
          {info.map((item) => (
            <div key={item.label} className="proj-info-item">
              <span className="proj-info-label">{item.label}</span>
              <span className="proj-info-val">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {renderStoryAndSummary(4)}
    </div>
  )
}
