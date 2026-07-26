import type { ProjectPageIntro } from '../../data/projects'

interface ProjectFastReadProps {
  intro: ProjectPageIntro
  projectTitle: string
  variant?: 'standard' | 'visual'
  className?: string
}

const STAGE_LABELS: Record<ProjectPageIntro['stage'], string> = {
  shipped: 'Shipped product',
  beta: 'Closed beta',
  delivered: 'Delivered work',
  research: 'Research study',
  prototype: 'Working prototype',
  concept: 'Product concept',
  exhibited: 'Exhibited work',
  built: 'Built work',
}

export default function ProjectFastRead({
  intro,
  projectTitle,
  variant = 'standard',
  className = '',
}: ProjectFastReadProps) {
  const classes = [
    'project-fast-read',
    `project-fast-read--${variant}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <section className={classes} aria-label={`${projectTitle} at a glance`}>
      <header className="project-fast-read__head">
        <span className="project-fast-read__stage">{STAGE_LABELS[intro.stage]}</span>
        <p className="project-fast-read__what">{intro.what}</p>
      </header>

      <dl className="project-fast-read__story">
        <div className="project-fast-read__row">
          <dt>I owned</dt>
          <dd>{intro.ownership}</dd>
        </div>
        <div className="project-fast-read__row">
          <dt>Result</dt>
          <dd>{intro.result}</dd>
        </div>
      </dl>

      <dl className="project-fast-read__proofs" aria-label="Project proof points">
        {intro.proofs.map((proof) => (
          <div className="project-fast-read__proof" key={`${proof.label}-${proof.value}`}>
            <dt>
              {proof.kind === 'target' ? (
                <span className="project-fast-read__target">Target</span>
              ) : null}
              {proof.label}
            </dt>
            <dd>{proof.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
