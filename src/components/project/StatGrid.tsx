import { useCountUp } from '@/hooks/useCountUp'
import { useStaggerReveal } from '@/hooks/useStaggerReveal'

interface Props {
  stats: { label: string; value: string }[]
  color?: string
}

/** Extract leading number from a stat value like "50k+" → 50, "18000" → 18000 */
function parseStatNumber(val: string): number | null {
  const match = val.match(/^[\d,]+/)
  if (!match) return null
  return parseInt(match[0].replace(/,/g, ''), 10)
}

function StatItem({ label, value, color }: { label: string; value: string; color?: string }) {
  const num = parseStatNumber(value)
  const suffix = num !== null ? value.replace(/^[\d,]+/, '') : ''
  const { value: animated, ref } = useCountUp(num ?? 0, 1400)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="rounded-lg border border-ink-06 border-t-2 bg-surface p-6 shadow-[0_2px_6px_rgba(0,0,0,0.04)]"
      style={{
        borderTopColor: color || 'var(--color-ink)',
        transition: 'transform 0.2s var(--ease-spring), box-shadow 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
    >
      <span className="block font-mono text-[0.68rem] uppercase tracking-[0.06em] text-ink-40" style={{ marginBottom: '0.5rem' }}>{label}</span>
      <span className="block font-serif text-[2.2rem] font-light leading-[1.1] tracking-[-0.01em]">
        {num !== null ? `${animated.toLocaleString()}${suffix}` : value}
      </span>
    </div>
  )
}

export function StatGrid({ stats, color }: Props) {
  const staggerRef = useStaggerReveal<HTMLDivElement>({ stagger: 100 })

  return (
    <div ref={staggerRef} className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
      {stats.map((stat, i) => (
        <StatItem key={i} label={stat.label} value={stat.value} color={color} />
      ))}
    </div>
  )
}
