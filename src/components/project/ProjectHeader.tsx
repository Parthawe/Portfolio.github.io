import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { ProjectMeta } from '@/types/project'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useStaggerReveal } from '@/hooks/useStaggerReveal'

export function ProjectHeader({ project }: { project: ProjectMeta }) {
  const ref = useScrollReveal<HTMLDivElement>()
  const tagsRef = useStaggerReveal<HTMLDivElement>({ stagger: 60 })

  const onImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.classList.add('loaded')
  }, [])

  return (
    <div ref={ref} className="mx-auto max-w-[1100px] px-[--spacing-pad]" style={{ paddingTop: 'calc(var(--spacing-nav-h) + clamp(1.5rem, 3vw, 2rem))' }}>
      {/* Back link */}
      <div className="mb-6">
        <Link to={project.backLink.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-40 transition-colors hover:text-ink">
          {project.backLink.label}
        </Link>
      </div>

      {/* Meta */}
      <div className="mb-8 max-w-[720px]">
        <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.01em]">
          {project.title}
        </h1>

        <p className="mt-4 max-w-[60ch] text-lg leading-[1.65] text-ink-70">
          {project.subtitle}
        </p>

        {project.infoItems.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-x-12 gap-y-3">
            {project.infoItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-[0.2rem]">
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-40">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div ref={tagsRef} className="hidden">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-ink-08 bg-ink-04 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-ink-40">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Hero image */}
      <div className="mb-12 overflow-hidden rounded-[12px] border border-ink-06 bg-bg-alt shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]" style={{ marginBottom: '3rem' }}>
        <img src={project.heroImage} alt={project.title} loading="eager" onLoad={onImgLoad} className="w-full max-h-[75vh] object-cover" />
      </div>
    </div>
  )
}
