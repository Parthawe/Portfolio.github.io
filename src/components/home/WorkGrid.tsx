import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface WorkItem {
  title: string
  category: string
  image: string
  slug: string
}

const artWorks: WorkItem[] = [
  { title: 'Jugalbandi', category: 'Interactive Installation', image: '/Assets/images/jugalbandi.png', slug: 'jugalbandi' },
  { title: 'Enigma', category: 'Physical Computing', image: '/Assets/images/enigma.jpg', slug: 'enigma' },
  { title: 'Making of Time', category: 'Data Sculpture', image: '/Assets/images/making-of-time.jpg', slug: 'making-of-time' },
  { title: 'Shuffle', category: 'Generative Art', image: '/Assets/images/shuffle.jpg', slug: 'shuffle' },
]

const archiveWorks: WorkItem[] = [
  { title: 'The Point CDC', category: 'Community · UX', image: '/Assets/images/the-point-cdc.png', slug: 'the-point-cdc' },
  { title: 'Revolving Stage', category: 'Installation', image: '/Assets/images/revolving-stage.jpg', slug: 'revolving-stage' },
  { title: 'CueTV', category: 'Interactive Media', image: '/Assets/images/cuetv.jpg', slug: 'cuetv' },
  { title: 'Drowning', category: 'Video Art', image: '/Assets/images/drowning.jpg', slug: 'drowning' },
  { title: 'Office of Diversity', category: 'Web · UX', image: '/Assets/images/office-of-diversity.png', slug: 'office-of-diversity' },
  { title: 'Moniac Machine', category: 'Physical Computing', image: '/Assets/images/moniac-machine.jpg', slug: 'moniac-machine' },
  { title: 'Code for Build', category: 'Workshop', image: '/Assets/images/code-for-build.jpg', slug: 'code-for-build' },
  { title: 'UV Light', category: 'Installation', image: '/Assets/images/uv-light.jpg', slug: 'uv-light' },
]

function WorkCard({ item }: { item: WorkItem }) {
  const onImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.classList.add('loaded')
  }, [])

  return (
    <Link
      to={`/${item.slug}`}
      className="group block transition-transform duration-300"
      style={{ transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = '' }}
    >
      <div className="overflow-hidden bg-ink-04">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ willChange: 'transform' }}
          loading="lazy"
          onLoad={onImgLoad}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between px-0.5">
        <span className="font-sans text-[15px] font-semibold tracking-tight">{item.title}</span>
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-40">{item.category}</span>
      </div>
    </Link>
  )
}

export function WorkGrid() {
  const artRef = useScrollReveal<HTMLDivElement>()
  const archiveRef = useScrollReveal<HTMLDivElement>()

  return (
    <section
      className="mx-auto max-w-[--width-container] px-[--spacing-pad]"
      style={{ paddingTop: 'clamp(4rem, 8vw, 6rem)', paddingBottom: 'clamp(4rem, 8vw, 6rem)' }}
    >
      {/* Art & Installation */}
      <div ref={artRef}>
        <div className="border-b border-ink-08 pb-3" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-40">
            Art & Installation
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          {artWorks.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      </div>

      {/* Archive */}
      <div ref={archiveRef} style={{ marginTop: 'clamp(4rem, 8vw, 6rem)' }}>
        <div className="flex items-baseline justify-between border-b border-ink-08 pb-3" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-40">
            Archive
          </span>
          <Link to="/work" className="font-sans text-[13px] text-ink-40 transition-colors duration-300 hover:text-ink">
            View all work &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          {archiveWorks.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
