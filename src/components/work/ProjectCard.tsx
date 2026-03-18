import { useCallback } from 'react'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
  slug: string
  title: string
  result: string
  role: string
  image: string
}

export function ProjectCard({ slug, title, result, role, image }: ProjectCardProps) {
  const onImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.classList.add('loaded')
  }, [])

  return (
    <Link
      to={`/${slug}`}
      className="group block transition-transform duration-400 hover:-translate-y-1.5"
      style={{ transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-bg-alt">
        <img
          src={image}
          alt={title}
          loading="lazy"
          onLoad={onImgLoad}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="pt-3.5 px-0.5">
        <h2 className="font-display text-[15px] font-semibold tracking-tight text-ink">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-[1.5] text-ink-40">{result}</p>
        <span className="mt-1.5 inline-block font-mono text-[11px] uppercase tracking-wide text-ink-40">
          {role}
        </span>
      </div>
    </Link>
  )
}
