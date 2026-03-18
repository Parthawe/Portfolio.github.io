import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface FeaturedWork {
  title: string
  year: string
  category: string
  description: string
  image: string
  slug: string
}

const featuredWorks: FeaturedWork[] = [
  {
    title: 'Mentra',
    year: '2024',
    category: 'AI Wearables · UX',
    description:
      'Head of UI/UX designing the interface for AI-powered smart glasses — from onboarding flows to real-time HUD overlays.',
    image: '/Assets/images/mentra.png',
    slug: 'mentra',
  },
  {
    title: 'ExecutiveLens',
    year: '2024',
    category: 'Data Platform · UX',
    description:
      'A data visualization platform turning complex executive metrics into clear, actionable dashboards.',
    image: '/Assets/images/executivelens.png',
    slug: 'executivelens',
  },
  {
    title: 'ZentiPay',
    year: '2023',
    category: 'Fintech · UX',
    description:
      'Crypto-to-fiat payment platform — simplifying cross-border transactions for emerging markets.',
    image: '/Assets/images/zentipay.png',
    slug: 'zentipay',
  },
]

function StickyCard({ work, index }: { work: FeaturedWork; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>()
  const onImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.classList.add('loaded')
  }, [])

  return (
    <div
      ref={ref}
      className="sticky overflow-hidden border border-ink-06 bg-bg-alt shadow-[0_-2px_20px_rgba(0,0,0,0.05)]"
      style={{
        top: `${100 + index * 24}px`,
        zIndex: index + 1,
      }}
    >
      <div style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Text */}
          <div className="flex flex-col justify-center">
            <h2
              className="font-serif font-light tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
            >
              {work.title}
            </h2>
            <div className="mt-3 flex gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-40">
              <span>{work.year}</span>
              <span className="text-ink-15">/</span>
              <span>{work.category}</span>
            </div>

            <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-ink-70">
              {work.description}
            </p>

            <Link
              to={`/${work.slug}`}
              className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-medium text-ink transition-all duration-300 hover:gap-3"
            >
              View project <span className="text-ink-40">&rarr;</span>
            </Link>
          </div>

          {/* Image */}
          <Link
            to={`/${work.slug}`}
            className="group block overflow-hidden"
          >
            <img
              src={work.image}
              alt={work.title}
              className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{ willChange: 'transform' }}
              loading={index === 0 ? 'eager' : 'lazy'}
              onLoad={onImgLoad}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function StickyCards() {
  return (
    <section
      className="relative mx-auto max-w-[--width-container] px-[--spacing-pad]"
      style={{ padding: 'clamp(4rem, 8vw, 6rem) var(--spacing-pad)' }}
    >
      <div className="flex flex-col gap-10">
        {featuredWorks.map((work, i) => (
          <StickyCard key={work.slug} work={work} index={i} />
        ))}
      </div>
    </section>
  )
}
