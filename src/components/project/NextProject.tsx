import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Props {
  slug: string
  title: string
  image: string
}

export function NextProject({ slug, title, image }: Props) {
  const ref = useScrollReveal<HTMLAnchorElement>()

  return (
    <Link
      ref={ref}
      to={`/${slug}`}
      className="group block border-t border-ink-12 py-16 transition-colors hover:bg-ink-04"
    >
      <div className="mx-auto flex max-w-[--width-container] items-center justify-between gap-8 px-[--spacing-pad]">
        <div>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-40">
            Next Project
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="mt-2 block font-serif text-[clamp(1.8rem,4vw,3rem)] font-light tracking-tight transition-colors duration-300 group-hover:text-ink-70">
            {title}
          </span>
        </div>
        <div className="hidden h-[90px] w-[140px] shrink-0 overflow-hidden rounded-lg sm:block">
          <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      </div>
    </Link>
  )
}
