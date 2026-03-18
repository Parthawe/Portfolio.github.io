import { useState, useRef, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { projects } from '@/data/projects'
import { FilterNav } from '@/components/work/FilterNav'
import { ProjectCard } from '@/components/work/ProjectCard'

const categoryMeta: { key: string; label: string }[] = [
  { key: 'ux', label: 'UX Design' },
  { key: 'good', label: 'Design for Good' },
  { key: 'ai', label: 'AI & Wearables' },
  { key: 'creative', label: 'Creative Technology' },
  { key: 'install', label: 'Installations' },
  { key: 'brand', label: 'Brand & Visual' },
]

/** Role strings keyed by project slug, shown beneath each card. */
const roles: Record<string, string> = {
  mentra: 'Head of UI/UX \u00b7 2025',
  executivelens: 'Product Designer \u00b7 2025\u201326',
  zentipay: 'Founding Designer \u00b7 2025',
  'transfi-project': 'Lead Designer \u00b7 2022\u201323',
  cuetv: 'Product Designer',
  'org-dashboard': 'Product Designer',
  'raahi-project': 'Designer \u00b7 2023',
  'the-point-cdc': 'Designer \u00b7 2024',
  'office-of-diversity': 'Designer \u00b7 2023\u201324',
  'clawed-chat': 'Product Designer \u00b7 2026',
  'oncall-lens': 'Designer + Developer \u00b7 2026',
  'ai-voice': 'Designer \u00b7 2024',
  'ballah-code': 'Designer \u00b7 2024',
  'keyboard-project': 'ITP Thesis \u00b7 2024',
  jugalbandi: 'Creator \u00b7 2024',
  'vj-software': 'Creator \u00b7 2024',
  shuffle: 'Creator \u00b7 2024',
  enigma: 'Creator \u00b7 2023',
  'making-of-time': 'Creator \u00b7 2024',
  'uv-light': 'Creator \u00b7 2024',
  'revolving-stage': 'Creator \u00b7 2023',
  'the-omakase': 'Creator \u00b7 2024',
  'moniac-machine': 'Creator \u00b7 2024',
  drowning: 'Set Designer \u00b7 2024',
  tedx: 'Art Director \u00b7 2021',
  'code-for-build': 'Designer \u00b7 2021',
  typeface: 'Type Designer',
  atps: 'Creator',
}

function projectsForCategory(key: string) {
  return Object.values(projects).filter((p) => p.categories.includes(key))
}

export function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const gridRef = useRef<HTMLDivElement>(null)

  const handleFilterChange = useCallback((filter: string) => {
    const el = gridRef.current
    if (el) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(8px)'
      setTimeout(() => {
        setActiveFilter(filter)
        requestAnimationFrame(() => {
          el.style.transition = 'opacity 0.35s cubic-bezier(0,0,0.3,1), transform 0.35s cubic-bezier(0,0,0.3,1)'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        })
      }, 150)
    } else {
      setActiveFilter(filter)
    }
  }, [])

  const visibleCategories = categoryMeta.filter(
    ({ key }) => activeFilter === 'all' || activeFilter === key,
  )

  return (
    <>
      <Helmet>
        <title>Work \u00b7 Parth Pawar</title>
        <meta
          name="description"
          content="Selected work by Parth Pawar \u2014 product design, AI wearables, fintech, creative technology."
        />
      </Helmet>

      <div className="mx-auto max-w-[--width-container] px-[--spacing-pad]" style={{ paddingTop: 'calc(var(--spacing-nav-h) + clamp(2rem, 4vw, 4rem))', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        {/* Header */}
        <h1 className="font-serif text-[clamp(3rem,6vw,4.5rem)] font-light tracking-[-0.01em]">Work</h1>
        <p className="mt-3 max-w-[55ch] text-base text-ink-70">Selected projects across product design, AI wearables, fintech, and creative technology.</p>

        {/* Filters */}
        <div className="mt-8">
          <FilterNav activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        </div>

        {/* Category sections */}
        <div ref={gridRef} style={{ marginTop: 'clamp(2rem, 3vw, 3rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 5vw, 4rem)', transition: 'opacity 0.35s cubic-bezier(0,0,0.3,1), transform 0.35s cubic-bezier(0,0,0.3,1)' }}>
          {visibleCategories.map(({ key, label }) => {
            const items = projectsForCategory(key)
            if (items.length === 0) return null

            return (
              <section key={key}>
                <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-40">
                  {label}
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {items.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      slug={project.slug}
                      title={project.title}
                      result={project.subtitle}
                      role={roles[project.slug] ?? ''}
                      image={project.heroImage}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center" style={{ marginTop: 'clamp(3rem, 6vw, 6rem)' }}>
          <p className="font-serif text-lg italic text-ink-40">Available for new projects.</p>
          <a
            href="mailto:parth.pawar@nyu.edu"
            className="mt-4 inline-block font-mono text-sm text-ink underline decoration-ink-15 underline-offset-[3px] transition-colors hover:decoration-ink"
          >
            parth.pawar@nyu.edu
          </a>
        </div>
      </div>
    </>
  )
}
