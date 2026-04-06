import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import TiltCard from './TiltCard'
import FigmaSelect from './FigmaSelect'
import { getImageBrightness } from '../utils/imageBrightness'

interface ProjectCardProps {
  slug: string
  name: string
  image: string
  tag?: string
  year?: string
  desc?: string
  loading?: 'eager' | 'lazy'
  featured?: boolean
  tilt?: boolean
  tiltIntensity?: number
}

export default function ProjectCard({
  slug, name, image, tag, year, desc,
  loading = 'lazy', featured = false, tilt = true, tiltIntensity = 5,
}: ProjectCardProps) {
  const handleImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const visual = img.closest('.pcard-visual')
    if (visual) visual.classList.add('loaded')
    const card = img.closest('.pcard')
    if (!card) return
    try {
      const brightness = getImageBrightness(img)
      if (brightness > 140) card.classList.add('pcard--light')
    } catch { /* cross-origin or canvas error */ }
  }, [])

  const card = (
    <Link
      className={`pcard figma-hover${featured ? ' pcard--featured' : ''}`}
      to={`/${slug}`}
      aria-label={`View ${name} project`}
    >
      <div className="pcard-inner">
        <div className="pcard-top-row">
          <span className="pcard-tag">{tag || ''}</span>
          <span className="pcard-year">{year || ''}</span>
        </div>
        <div className="pcard-visual">
          <img src={image} alt={name} loading={loading} onLoad={handleImgLoad} />
        </div>
        <h2 className="pcard-name">{name}</h2>
        {desc && (
          <div className="pcard-marquee">
            <div className="pcard-marquee-track">
              <span>{desc}, {desc}, {desc}, </span>
              <span>{desc}, {desc}, {desc}, </span>
            </div>
          </div>
        )}
      </div>
      <FigmaSelect />
    </Link>
  )

  if (!tilt) return card
  return <TiltCard intensity={tiltIntensity}>{card}</TiltCard>
}
