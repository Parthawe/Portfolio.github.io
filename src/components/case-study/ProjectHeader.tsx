import { lazy, Suspense, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import FigmaSelect from '../FigmaSelect'
import { useDeferredMount } from '../../hooks/useDeferredMount'
import { PROJECT_STORYLINES } from '../../data/projectStorylines'
import { getProject } from '../../data/projects'

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
}: ProjectHeaderProps) {
  const location = useLocation()
  const heroRef = useRef<HTMLDivElement>(null)
  const canShowOrnament =
    Boolean(categorySlug) &&
    (typeof window === 'undefined' ? false : window.matchMedia('(min-width: 769px)').matches)
  const showCategoryOrnament = useDeferredMount(canShowOrnament, { timeout: 1500, delayMs: 180 })
  const currentSlug = location.pathname.split('/').filter(Boolean).pop() ?? ''
  const project = getProject(currentSlug)
  const story = PROJECT_STORYLINES[currentSlug]
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

  return (
    <div className="wrap project-header">
      <div className="proj-back">
        <Link to={backLink} className="back-link figma-hover">
          &larr; {backLabel}
          <FigmaSelect />
        </Link>
      </div>
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
        {story && (
          <div className="proj-story hero-anim hero-anim-3" aria-label="Project story arc">
            <div className="proj-story-grid">
              <article className="proj-story-card surface-glass">
                <span className="proj-story-kicker">Challenge</span>
                <p className="proj-story-copy">{story.challenge}</p>
              </article>
              <article className="proj-story-card surface-glass">
                <span className="proj-story-kicker">Approach</span>
                <p className="proj-story-copy">{story.approach}</p>
              </article>
              <article className="proj-story-card surface-glass">
                <span className="proj-story-kicker">Result</span>
                <p className="proj-story-copy">{story.result}</p>
              </article>
            </div>
          </div>
        )}
        <div className={`proj-info-row hero-anim ${story ? 'hero-anim-4' : 'hero-anim-3'}`}>
          {info.map((item) => (
            <div key={item.label} className="proj-info-item">
              <span className="proj-info-label">{item.label}</span>
              <span className="proj-info-val">{item.value}</span>
            </div>
          ))}
        </div>
        {headerSummary ? (
          <section className={`proj-header-summary hero-anim ${story ? 'hero-anim-5' : 'hero-anim-4'}`} aria-label="Fast read summary">
            <div className="proj-header-summary-head">
              <div>
                <span className="proj-header-summary-kicker">Fast read</span>
                <h2 className="proj-header-summary-title">Why this project matters</h2>
              </div>
              {headerSummaryMeta ? (
                <p className="proj-header-summary-meta">{headerSummaryMeta}</p>
              ) : null}
            </div>
            <div className="proj-header-summary-grid">
              <article className="proj-header-summary-card surface-glass surface-glass--subtle">
                <span className="proj-header-summary-label">Problem</span>
                <p className="proj-header-summary-copy">{headerSummary.problem}</p>
              </article>
              <article className="proj-header-summary-card surface-glass surface-glass--subtle">
                <span className="proj-header-summary-label">Role</span>
                <p className="proj-header-summary-copy">{headerSummary.role}</p>
              </article>
              <article className="proj-header-summary-card surface-glass surface-glass--subtle">
                <span className="proj-header-summary-label">Outcome</span>
                <p className="proj-header-summary-copy">{headerSummary.outcome}</p>
              </article>
            </div>
            {headerSummary.stats.length ? (
              <div className="proj-header-summary-stats" aria-label="Project proof points">
                {headerSummary.stats.map((stat) => (
                  <div key={stat.label} className="proj-header-summary-stat">
                    <span className="proj-header-summary-stat-value">{stat.value}</span>
                    <span className="proj-header-summary-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`proj-live-link hero-anim ${headerSummary ? (story ? 'hero-anim-6' : 'hero-anim-5') : story ? 'hero-anim-5' : 'hero-anim-4'} figma-hover`}
          >
            Visit Live Site
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <FigmaSelect />
          </a>
        )}
      </div>
      {heroImage && (
        <div className="proj-hero-img hero-anim hero-anim-4" ref={heroRef}>
          <motion.img
            src={heroImage}
            alt={heroAlt || `${title} project preview`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{ y: heroY, scale: heroScale }}
          />
        </div>
      )}
    </div>
  )
}
