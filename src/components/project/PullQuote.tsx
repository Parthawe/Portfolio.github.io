interface Props {
  quote: string
  cite?: string
  color?: string
}

export function PullQuote({ quote, cite, color }: Props) {
  return (
    <blockquote className="relative border-l-[3px]" style={{ margin: '3rem 0', padding: '2rem 0 2rem 2rem', borderColor: color || 'var(--color-ink)' }}>
      <p className="max-w-[60ch] font-serif text-[clamp(1.3rem,2.5vw,1.6rem)] leading-[1.5]" style={{ marginBottom: '0.75rem' }}>
        {quote}
      </p>
      {cite && (
        <cite className="block font-mono text-xs tracking-[0.06em] text-ink-40 not-italic">
          {cite}
        </cite>
      )}
    </blockquote>
  )
}
