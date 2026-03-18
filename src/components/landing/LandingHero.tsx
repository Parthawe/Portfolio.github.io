import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Props {
  titleBreak: string
  titleAccent: string
  accentColor: string
  description: string
  stats: string[]
  tools: string[]
}

export function LandingHero({ titleBreak, titleAccent, accentColor, description, stats, tools }: Props) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="mx-auto max-w-[--width-container] px-[--spacing-pad]" style={{ paddingTop: 'calc(var(--spacing-nav-h) + clamp(2.5rem, 5vw, 5rem))', marginBottom: 'clamp(2rem, 3.5vw, 3.5rem)' }}>
      <div className="grid items-end max-md:grid-cols-1" style={{ gridTemplateColumns: '1fr 1fr', gap: 'clamp(1.5rem, 3vw, 3rem)' }}>
        <div>
          <h1 className="font-serif font-light tracking-[-0.025em]" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: '1.02' }}>
            {titleBreak}
            <br />
            <span className="italic" style={{ color: accentColor }}>{titleAccent}</span>
          </h1>
        </div>
        <div>
          <p className="text-ink-70" style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)', lineHeight: '1.65', maxWidth: '520px', marginBottom: '2rem' }}>
            {description}
          </p>
          <div className="flex flex-wrap" style={{ gap: '0.5rem', marginBottom: '1.5rem' }}>
            {stats.map((stat, i) => (
              <span
                key={stat}
                className="inline-flex items-center rounded-full font-mono font-medium transition-colors"
                style={{
                  padding: '0.5rem 1.25rem',
                  border: '1px solid var(--color-ink-15)',
                  fontSize: '12px',
                  letterSpacing: '0.02em',
                  color: i === 0 ? '#fff' : 'var(--color-ink)',
                  background: i === 0 ? accentColor : 'transparent',
                  borderColor: i === 0 ? accentColor : 'var(--color-ink-15)',
                }}
              >
                {stat}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
            {tools.map((tool) => (
              <span
                key={tool}
                className="inline-block rounded-full bg-ink-06 font-mono uppercase text-ink-40 transition-colors hover:bg-ink-12 hover:text-ink-70"
                style={{ padding: '0.4rem 0.9rem', fontSize: '11px', letterSpacing: '0.03em' }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
