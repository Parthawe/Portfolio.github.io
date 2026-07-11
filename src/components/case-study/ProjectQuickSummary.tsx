import { getProject, isRequestAccessProject } from '../../data/projects'
import FigmaSelect from '../FigmaSelect'

export type CaseStudyViewMode = 'summary' | 'full'

interface ProjectQuickSummaryProps {
  slug: string
  viewMode: CaseStudyViewMode
  onViewModeChange: (mode: CaseStudyViewMode) => void
  fullCaseStudyEnabled?: boolean
  fullEntryId?: string
  variant?: 'card' | 'open'
}

export default function ProjectQuickSummary({
  slug,
  viewMode,
  onViewModeChange,
  fullCaseStudyEnabled = true,
  fullEntryId = 'cs-context',
  variant = 'card',
}: ProjectQuickSummaryProps) {
  const project = getProject(slug)

  if (
    !project ||
    !project.summaryProblem ||
    !project.summaryRole ||
    !project.summaryTeam ||
    !project.summaryTimeline ||
    !project.summaryOutcome
  ) {
    return null
  }

  const isAccessLimited = isRequestAccessProject(project)
  const handleBridgeOpen = () => {
    onViewModeChange('full')
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        document.getElementById(fullEntryId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 180)
    }
  }

  return (
    <section className="cs-quick-summary wrap reveal" id="cs-summary">
      <div className={`cs-quick-summary-shell cs-quick-summary-shell--${variant}${variant === 'card' ? ' surface-glass' : ''}`}>
        <div className="cs-quick-summary-top">
          <div>
            <span className="cs-section-label">TL;DR</span>
            <h2 className="cs-quick-summary-title">Problem, move, impact</h2>
            <p className="cs-quick-summary-copy">
              {isAccessLimited
                ? 'Start with the fast read. Deeper detail is shared directly after access is approved.'
                : 'The shortest read of what was broken, what I owned, and what shipped.'}
            </p>
          </div>

          <div className="cs-quick-summary-toggle" role="tablist" aria-label="Case study view mode">
            <button
              type="button"
              className={`cs-quick-summary-toggle-btn${viewMode === 'summary' ? ' is-active' : ''}`}
              aria-selected={viewMode === 'summary'}
              onClick={() => onViewModeChange('summary')}
            >
              2 min summary
            </button>
            {fullCaseStudyEnabled ? (
              <button
                type="button"
                className={`cs-quick-summary-toggle-btn${viewMode === 'full' ? ' is-active' : ''}`}
                aria-selected={viewMode === 'full'}
                onClick={() => onViewModeChange('full')}
              >
                Full case study
              </button>
            ) : (
              <span className="cs-quick-summary-toggle-note">Detailed internals available on request</span>
            )}
          </div>
        </div>

        <div className="cs-quick-summary-grid">
          <div className="cs-quick-summary-details">
            <article className="cs-quick-summary-card cs-quick-summary-card--problem">
              <span className="cs-quick-summary-label">Problem</span>
              <p>{project.summaryProblem}</p>
            </article>
            <article className="cs-quick-summary-card cs-quick-summary-card--role">
              <span className="cs-quick-summary-label">Role</span>
              <p>{project.summaryRole}</p>
            </article>
            <article className="cs-quick-summary-card cs-quick-summary-card--team">
              <span className="cs-quick-summary-label">Team</span>
              <p>{project.summaryTeam}</p>
            </article>
            <article className="cs-quick-summary-card cs-quick-summary-card--timeline">
              <span className="cs-quick-summary-label">Timeline</span>
              <p>{project.summaryTimeline}</p>
            </article>
            <article className="cs-quick-summary-card cs-quick-summary-card--wide cs-quick-summary-card--outcome">
              <span className="cs-quick-summary-label">Outcome</span>
              <p>{project.summaryOutcome}</p>
            </article>
          </div>

          {project.summaryImage ? (
            <figure className="cs-quick-summary-image">
              <img
                src={project.summaryImage}
                alt={project.summaryImageAlt || `${project.name} summary artifact`}
                loading="eager"
                decoding="async"
              />
            </figure>
          ) : null}
        </div>

        {project.summaryStats?.length ? (
          <div className="cs-quick-summary-stats" aria-label="Key proof points">
            {project.summaryStats.map((stat) => (
              <div key={stat.label} className="cs-quick-summary-stat">
                <span className="cs-quick-summary-stat-value">{stat.value}</span>
                <span className="cs-quick-summary-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        ) : null}

        {project.testimonial ? (
          <blockquote className="cs-quick-summary-quote">
            <p>{project.testimonial.quote}</p>
            <cite>{project.testimonial.cite}</cite>
          </blockquote>
        ) : null}

        {viewMode === 'summary' && fullCaseStudyEnabled && isAccessLimited ? (
          <div className="cs-quick-summary-bridge cs-quick-summary-bridge--request">
            <div className="cs-quick-summary-bridge-copy">
              <span className="cs-quick-summary-bridge-kicker">Protected detail</span>
              <p>
                The public preview keeps the sensitive work out of the static build. Use the access panel below to
                request or unlock the deeper review.
              </p>
            </div>
            <button
              type="button"
              className="cs-quick-summary-link figma-hover"
              onClick={handleBridgeOpen}
            >
              Open access panel
              <FigmaSelect />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
