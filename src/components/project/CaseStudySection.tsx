import type { ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Props {
  id?: string
  label?: string
  title?: string
  children: ReactNode
}

export function CaseStudySection({ id, label, title, children }: Props) {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id={id} className="border-t border-ink-12" style={{ padding: 'clamp(3rem, 5vw, 5rem) 0' }}>
      <div className="mx-auto max-w-[1100px] px-[--spacing-pad]">
        {label && (
          <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-40" style={{ marginBottom: '0.5rem' }}>
            {label}
          </span>
        )}
        {title && (
          <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-light leading-[1.15] tracking-[-0.01em]" style={{ marginBottom: '1.5rem' }}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  )
}
