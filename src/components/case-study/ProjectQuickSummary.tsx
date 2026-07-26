import { getProject, isRequestAccessProject } from '../../data/projects'

export type CaseStudyViewMode = 'summary' | 'full'

interface ProjectQuickSummaryProps {
  slug: string
  viewMode: CaseStudyViewMode
  onViewModeChange: (mode: CaseStudyViewMode) => void
  fullCaseStudyEnabled?: boolean
  variant?: 'card' | 'open'
}

export default function ProjectQuickSummary({
  slug,
  viewMode,
  onViewModeChange,
  fullCaseStudyEnabled = true,
  variant = 'card',
}: ProjectQuickSummaryProps) {
  const project = getProject(slug)

  if (
    !project ||
    !(project.storyline?.challenge || project.summaryProblem)
  ) {
    return null
  }

  const isAccessLimited = isRequestAccessProject(project)
  const challenge = project.storyline?.challenge || project.summaryProblem
  const approach = project.storyline?.approach
  // The recruiter-facing header owns proof. Keep legacy stats only for
  // unscoped/archive projects so expandable stories never repeat or weaken the
  // two verified proof points above the hero.
  const proofStats = project.pageIntro ? [] : (project.summaryStats ?? []).slice(0, 3)

  return (
    <section className="cs-quick-summary wrap reveal" id="cs-summary">
      <div className={`cs-quick-summary-shell cs-quick-summary-shell--${variant}${variant === 'card' ? ' surface-glass' : ''}`}>
        <div className="cs-quick-summary-top">
          <div>
            <span className="cs-section-label">Quick read</span>
            <h2 className="cs-quick-summary-title">Challenge and approach</h2>
          </div>

          <div className="cs-quick-summary-toggle" role="tablist" aria-label="Case study view mode">
            <button
              type="button"
              className={`cs-quick-summary-toggle-btn${viewMode === 'summary' ? ' is-active' : ''}`}
              aria-selected={viewMode === 'summary'}
              onClick={() => onViewModeChange('summary')}
            >
              Quick read
            </button>
            {fullCaseStudyEnabled ? (
              <button
                type="button"
                className={`cs-quick-summary-toggle-btn${viewMode === 'full' ? ' is-active' : ''}`}
                aria-selected={viewMode === 'full'}
                onClick={() => onViewModeChange('full')}
              >
                {isAccessLimited ? 'Public story' : 'Full story'}
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
              <p>{challenge}</p>
            </article>
            {approach ? (
              <article className="cs-quick-summary-card cs-quick-summary-card--wide cs-quick-summary-card--move">
                <span className="cs-quick-summary-label">Approach</span>
                <p>{approach}</p>
              </article>
            ) : null}
          </div>

          {project.summaryImage ? (
            <figure className="cs-quick-summary-image">
              <img
                src={project.summaryImage}
                alt={project.summaryImageAlt || `${project.name} summary artifact`}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ) : null}
        </div>

        {proofStats.length ? (
          <div className="cs-quick-summary-stats" aria-label="Key proof points">
            {proofStats.map((stat) => (
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

      </div>
    </section>
  )
}
