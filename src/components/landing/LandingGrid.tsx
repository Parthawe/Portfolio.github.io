import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface ProjectItem {
  slug: string
  title: string
  result: string
  role: string
  image: string
}

interface ApproachItem {
  num: string
  title: string
  description: string
}

export function LandingProjectGrid({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="mx-auto max-w-[--width-container] px-[--spacing-pad] py-8">
      <p className="mb-6 font-mono uppercase tracking-[0.12em] text-ink-40" style={{ fontSize: '11px' }}>More Projects</p>
      <div className="grid sm:grid-cols-2" style={{ gap: '1.5rem' }}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ slug, title, result, role, image }: ProjectItem) {
  const ref = useScrollReveal<HTMLAnchorElement>()

  return (
    <Link
      ref={ref}
      to={`/${slug}`}
      className="group block"
      style={{ transition: 'transform 0.3s var(--ease-spring)' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = '' }}
    >
      <div className="overflow-hidden rounded-[10px] border border-ink-06 bg-bg-alt shadow-[0_2px_8px_rgba(0,0,0,0.04)]" style={{ marginBottom: '0.85rem', transition: 'box-shadow 0.3s var(--ease-spring), border-color 0.3s' }}>
        <div style={{ aspectRatio: '4/3' }}>
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            style={{ transition: 'transform 0.4s var(--ease-spring)' }}
            loading="lazy"
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseOut={(e) => { e.currentTarget.style.transform = '' }}
          />
        </div>
      </div>
      <div className="flex items-baseline justify-between" style={{ padding: '0 0.25rem' }}>
        <div>
          <h3 className="font-sans font-semibold" style={{ fontSize: '0.85rem' }}>{title}</h3>
          <p className="text-ink-70" style={{ fontSize: '0.85rem', marginTop: '0.15rem' }}>{result}</p>
        </div>
        <span className="shrink-0 font-mono uppercase text-ink-40" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>{role}</span>
      </div>
    </Link>
  )
}

export function LandingApproach({ items, accentColor }: { items: ApproachItem[]; accentColor: string }) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="mx-auto max-w-[--width-container] px-[--spacing-pad]" style={{ margin: 'clamp(2rem, 4vw, 4rem) auto clamp(1.5rem, 3vw, 3rem)', paddingTop: 'clamp(1.5rem, 3vw, 3rem)', borderTop: '1px solid var(--color-ink-12)' }}>
      <p className="font-mono uppercase tracking-[0.12em] text-ink-40" style={{ fontSize: '11px', marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>Design Approach</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: '1.5rem' }}>
        {items.map((item) => (
          <div
            key={item.num}
            className="rounded-[10px] border border-ink-06 bg-ink-04"
            style={{
              padding: '2rem',
              borderLeft: `3px solid ${accentColor}`,
              transition: 'background 0.25s, border-color 0.25s, transform 0.3s var(--ease-spring)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-ink-06)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.transform = '' }}
          >
            <span className="mb-4 block font-mono font-medium" style={{ fontSize: '11px', letterSpacing: '0.08em', color: accentColor }}>{item.num}</span>
            <h3 className="font-sans font-semibold" style={{ fontSize: '1.1rem', marginBottom: '0.6rem' }}>{item.title}</h3>
            <p className="text-ink-70" style={{ fontSize: '14px', lineHeight: '1.65' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LandingCta({ headline, subtitle }: { headline: string; subtitle: string }) {
  return (
    <section className="text-center" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
      <div className="mx-auto max-w-[--width-container] px-[--spacing-pad]">
        <h2 className="font-serif font-light" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', marginBottom: '0.75rem' }}>
          {headline}
        </h2>
        <p className="mx-auto text-ink-40" style={{ fontSize: '16px', lineHeight: '1.6', maxWidth: '480px', marginBottom: '2rem' }}>
          {subtitle}
        </p>
        <a
          href="mailto:parthpawar@nyu.edu"
          className="inline-flex items-center gap-2 rounded-full border border-ink-15 font-mono uppercase transition-colors hover:bg-ink hover:text-bg"
          style={{ padding: '0.75rem 1.5rem', fontSize: '12px', letterSpacing: '0.06em' }}
        >
          parthpawar@nyu.edu
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  )
}
