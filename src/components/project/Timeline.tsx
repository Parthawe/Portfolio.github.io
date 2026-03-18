interface Props {
  items: { date: string; heading: string; description: string }[]
  color?: string
}

export function Timeline({ items, color }: Props) {
  return (
    <div className="relative mt-6 pl-8">
      <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-ink-12" />
      {items.map((item, i) => (
        <div key={i} className="relative pb-8 last:pb-0">
          <div
            className="absolute -left-8 top-1 h-2.5 w-2.5 rounded-full border-2 border-bg"
            style={{
              background: color || 'var(--color-ink)',
              boxShadow: `0 0 0 2px ${color || 'var(--color-ink)'}`,
            }}
          />
          <span className="block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-40">
            {item.date}
          </span>
          <h4 className="mt-1 font-sans text-base font-semibold">{item.heading}</h4>
          <p className="mt-1 text-sm leading-relaxed text-ink-70">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
