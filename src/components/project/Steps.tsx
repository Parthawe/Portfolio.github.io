import { useStaggerReveal } from '@/hooks/useStaggerReveal'

interface Props {
  steps: { num: number; title: string; description: string }[]
}

export function Steps({ steps }: Props) {
  const ref = useStaggerReveal<HTMLDivElement>({ stagger: 100 })

  return (
    <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]" style={{ margin: '2rem 0' }}>
      {steps.map((step) => (
        <div key={step.num} className="rounded-lg border border-ink-06 bg-surface p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]" style={{ transition: 'transform 0.2s var(--ease-spring), box-shadow 0.2s' }}>
          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink font-mono text-[0.9rem] font-medium text-bg">
            {step.num}
          </span>
          <h4 className="mb-2 font-sans text-base font-semibold">{step.title}</h4>
          <p className="text-sm leading-[1.6] text-ink-70">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
