import { useStaggerReveal } from '@/hooks/useStaggerReveal'

interface Props {
  cards: { title: string; description: string }[]
}

export function FeatureGrid({ cards }: Props) {
  const ref = useStaggerReveal<HTMLDivElement>({ stagger: 70 })

  return (
    <div ref={ref} className="grid grid-cols-2" style={{ gap: '1.5rem', margin: '2rem 0' }}>
      {cards.map((card, i) => (
        <div
          key={i}
          className="rounded-lg border border-ink-06 bg-surface shadow-[0_2px_6px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.03)]"
          style={{
            padding: '1.75rem',
            transition: 'transform 0.2s var(--ease-spring), box-shadow 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = 'var(--color-ink-12)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '' }}
        >
          <h3 className="font-serif text-lg" style={{ marginBottom: '0.5rem' }}>{card.title}</h3>
          <p className="text-sm leading-[1.6] text-ink-70">{card.description}</p>
        </div>
      ))}
    </div>
  )
}
