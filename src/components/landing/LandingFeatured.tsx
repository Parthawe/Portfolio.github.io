import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Props {
  slug: string
  title: string
  description: string
  role: string
  image: string
  bgColor: string
}

export function LandingFeatured({ slug, title, description, role, image }: Props) {
  const ref = useScrollReveal<HTMLAnchorElement>()

  return (
    <Link
      ref={ref}
      to={`/${slug}`}
      className="group mx-auto block max-w-[--width-container] overflow-hidden rounded-[12px] border border-ink-06 bg-bg-alt px-[--spacing-pad]"
      style={{
        marginBottom: 'clamp(2rem, 3.5vw, 3.5rem)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.4s var(--ease-spring), transform 0.4s var(--ease-spring), border-color 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'var(--color-ink-12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'
        e.currentTarget.style.transform = ''
        e.currentTarget.style.borderColor = ''
      }}
    >
      {/* Image with overlay */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '21/9' }}>
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-600"
          style={{ transition: 'transform 0.6s var(--ease-spring)' }}
          loading="eager"
        />
        <div
          className="absolute inset-0 flex items-center justify-center font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'rgba(0,0,0,0.35)' }}
        >
          VIEW PROJECT &rarr;
        </div>
      </div>

      {/* Body */}
      <div className="flex items-end justify-between" style={{ padding: 'clamp(1rem, 1.75vw, 1.75rem) clamp(1rem, 2vw, 2rem)', gap: 'clamp(1rem, 2vw, 2rem)' }}>
        <div>
          <h2 className="font-serif font-light" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '0.35rem' }}>
            {title}
          </h2>
          <p className="text-ink-70" style={{ fontSize: '15px', lineHeight: '1.5' }}>
            {description}
          </p>
        </div>
        <span className="shrink-0 whitespace-nowrap font-mono uppercase text-ink-40" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
          {role}
        </span>
      </div>
    </Link>
  )
}
