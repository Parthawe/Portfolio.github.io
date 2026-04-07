import { memo, useCallback } from 'react'
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
  nda?: boolean
}

export default memo(function ProjectCard({
  slug, name, image, tag, year, desc,
  loading = 'lazy', featured = false, tilt = true, tiltIntensity = 5,
  nda = false,
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

  const handleImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const visual = e.currentTarget.closest('.pcard-visual')
    if (visual) visual.classList.add('loaded') // hide shimmer
    e.currentTarget.style.display = 'none'
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
          <span className="pcard-year">
            {nda && (
              <span className="pcard-nda" title="Password protected">
                <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="8" width="12" height="7" rx="1.5" /><path d="M5 8V5a3 3 0 0 1 6 0v3" /></svg>
                NDA
              </span>
            )}
            {year || ''}
          </span>
        </div>
        <div className="pcard-visual">
          <img src={image} alt={name} loading={loading} onLoad={handleImgLoad} onError={handleImgError} />
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
})
