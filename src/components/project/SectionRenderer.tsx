import type { ProjectSection } from '@/types/project'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useStaggerReveal } from '@/hooks/useStaggerReveal'
import { CaseStudySection } from './CaseStudySection'
import { FeatureGrid } from './FeatureGrid'
import { StatGrid } from './StatGrid'
import { Timeline } from './Timeline'
import { Steps } from './Steps'
import { PullQuote } from './PullQuote'
import { ImageFull, ImagePair, ImageGrid } from './ImageSection'

/** Wrapper that adds scroll reveal to inline sections */
function RevealWrap({ children, className, id, style }: { children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} id={id} className={className} style={style}>{children}</div>
}

/** Wrapper that staggers direct children */
function StaggerWrap({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useStaggerReveal<HTMLDivElement>({ stagger: 80 })
  return <div ref={ref} className={className} style={style}>{children}</div>
}

interface Props {
  sections: ProjectSection[]
  projectColor?: string
}

export function SectionRenderer({ sections, projectColor }: Props) {
  return (
    <>
      {sections.map((section, i) => {
        switch (section.type) {
          case 'overview':
            return (
              <RevealWrap key={i} id={section.id} className="mx-auto max-w-[1100px] border-t border-ink-12 px-[--spacing-pad]" style={{ padding: '3rem var(--spacing-pad)' }}>
                <StaggerWrap className="grid gap-x-16 gap-y-8 md:grid-cols-2">
                  {section.columns.map((col, j) => (
                    <div key={j}>
                      <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-40">{col.heading}</h2>
                      <p className="text-base leading-[1.7] text-ink-70">{col.body}</p>
                    </div>
                  ))}
                </StaggerWrap>
              </RevealWrap>
            )

          case 'text':
            return (
              <CaseStudySection key={i} id={section.id} label={section.label} title={section.title}>
                <div className="max-w-[--width-narrow]" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {section.body.map((p, j) => (
                    <p key={j} className="text-base leading-[1.75] text-ink-70">{p}</p>
                  ))}
                </div>
              </CaseStudySection>
            )

          case 'features':
            return (
              <CaseStudySection key={i} id={section.id} label={section.label} title={section.title}>
                {section.body && (
                  <div className="mb-4 max-w-[--width-narrow]" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {section.body.map((p, j) => (
                      <p key={j} className="text-base leading-[1.75] text-ink-70">{p}</p>
                    ))}
                  </div>
                )}
                <FeatureGrid cards={section.cards} />
              </CaseStudySection>
            )

          case 'stats':
            return (
              <CaseStudySection key={i} id={section.id} label={section.label} title={section.title}>
                {section.body && (
                  <div className="mb-4 max-w-[--width-narrow]" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {section.body.map((p, j) => (
                      <p key={j} className="text-base leading-[1.75] text-ink-70">{p}</p>
                    ))}
                  </div>
                )}
                <StatGrid stats={section.stats} color={projectColor} />
              </CaseStudySection>
            )

          case 'timeline':
            return (
              <CaseStudySection key={i} id={section.id} label={section.label} title={section.title}>
                {section.body && (
                  <div className="mb-4 max-w-[--width-narrow]" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {section.body.map((p, j) => (
                      <p key={j} className="text-base leading-[1.75] text-ink-70">{p}</p>
                    ))}
                  </div>
                )}
                <Timeline items={section.items} color={projectColor} />
              </CaseStudySection>
            )

          case 'steps':
            return (
              <CaseStudySection key={i} id={section.id} label={section.label} title={section.title}>
                {section.body && (
                  <div className="mb-4 max-w-[--width-narrow]" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {section.body.map((p, j) => (
                      <p key={j} className="text-base leading-[1.75] text-ink-70">{p}</p>
                    ))}
                  </div>
                )}
                <Steps steps={section.steps} />
              </CaseStudySection>
            )

          case 'info-grid':
            return (
              <RevealWrap key={i} id={section.id} className="mx-auto max-w-[1100px] px-[--spacing-pad] py-6">
                <StaggerWrap className="grid gap-y-6 gap-x-12" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                  {section.items.map((item, j) => (
                    <div key={j} className="flex flex-col gap-1">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-40">{item.key}</span>
                      <span className="block text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </StaggerWrap>
              </RevealWrap>
            )

          case 'image':
            return <div key={i} className="mx-auto max-w-[1100px] px-[--spacing-pad]"><ImageFull src={section.src} alt={section.alt} /></div>

          case 'image-pair':
            return <div key={i} className="mx-auto max-w-[1100px] px-[--spacing-pad]"><ImagePair images={section.images} /></div>

          case 'image-grid':
            return <div key={i} className="mx-auto max-w-[1100px] px-[--spacing-pad]"><ImageGrid images={section.images} columns={section.columns} /></div>

          case 'pullquote':
            return (
              <div key={i} className="mx-auto max-w-[1100px] px-[--spacing-pad]">
                <PullQuote quote={section.quote} cite={section.cite} color={projectColor} />
              </div>
            )

          case 'callout':
            return (
              <RevealWrap key={i} className="mx-auto max-w-[1100px] px-[--spacing-pad]">
                <div className="my-8 rounded-r-lg border-l-[3px] bg-bg-alt py-5 pl-7 pr-5" style={{ borderColor: projectColor || 'var(--color-ink-15)' }}>
                  <p className="text-base leading-[1.7] text-ink-70">{section.text}</p>
                </div>
              </RevealWrap>
            )

          case 'numbered-list':
            return (
              <CaseStudySection key={i} id={section.id} label={section.label} title={section.title}>
                <ol className="mt-4 max-w-[--width-narrow] space-y-4 list-none">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-ink-70">
                      <span className="shrink-0 font-mono text-xs text-ink-40">{String(j + 1).padStart(2, '0')}</span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ol>
              </CaseStudySection>
            )

          case 'credits':
            return (
              <CaseStudySection key={i} label="Credits" title="Team">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {section.credits.map((credit, j) => (
                    <div key={j}>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-40">{credit.role}</span>
                      <span className="block text-sm font-medium">{credit.name}</span>
                    </div>
                  ))}
                </div>
              </CaseStudySection>
            )

          case 'thank-you':
            return (
              <RevealWrap key={i} className="py-16 text-center">
                <h2 className="font-serif text-[clamp(3rem,8vw,6rem)] font-light tracking-tight">
                  {section.title || 'Thank You'}
                </h2>
                {section.body && <p className="mt-4 text-ink-40">{section.body}</p>}
              </RevealWrap>
            )

          default:
            return null
        }
      })}
    </>
  )
}
