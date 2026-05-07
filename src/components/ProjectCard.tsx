import { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import TiltCard from './TiltCard'
import FigmaSelect from './FigmaSelect'
import { getImageBrightness } from '../utils/imageBrightness'
import { normalizeCopy } from '../utils/normalizeCopy'
import { projects } from '../data/projects'

interface ProjectCardProps {
  slug: string
  name: string
  image: string
  hoverMediaSrc?: string
  hoverMediaKind?: 'image' | 'video'
  hoverMediaAlt?: string
  tag?: string
  year?: string
  desc?: string
  marqueeText?: string
  loading?: 'eager' | 'lazy'
  featured?: boolean
  tilt?: boolean
  tiltIntensity?: number
  nda?: boolean
}

export default memo(function ProjectCard({
  slug, name, image, hoverMediaSrc, hoverMediaKind = 'image',
  tag, year, desc, marqueeText,
  loading = 'lazy', featured = false, tilt = true, tiltIntensity = 5,
  nda = false,
}: ProjectCardProps) {
  const project = projects.find(p => p.slug === slug)
  const resolvedImage = project?.cardMockup || image
  const resolvedAlt = project?.cardMockupAlt || name
  const safeTag = tag ? normalizeCopy(tag) : ''
  const safeYear = year ? normalizeCopy(year) : ''
  const safeDesc = desc ? normalizeCopy(desc) : ''
  const safeMarqueeText = marqueeText ? normalizeCopy(marqueeText) : safeDesc

  const handleImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const visual = img.closest('.pcard-visual')
    if (visual) visual.classList.add('loaded')
    const card = img.closest('.pcard')
    if (!card) return
    try {
      const brightness = getImageBrightness(img)
      if (brightness > 140) card.classList.add('pcard--light')
    } catch {
      // Expected for cross-origin images or tainted canvases — not actionable
    }
  }, [])

  const handleImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const visual = e.currentTarget.closest('.pcard-visual')
    if (visual) visual.classList.add('loaded') // hide shimmer
    const currentSrc = e.currentTarget.getAttribute('src') || ''
    if (currentSrc !== image) {
      e.currentTarget.setAttribute('src', image)
      return
    }
    e.currentTarget.style.display = 'none'
  }, [image])

  // Prefetch the page chunk on hover so navigation is instant
  const handlePrefetch = useCallback(() => {
    if (project?.page) project.page() // triggers the dynamic import
  }, [project])

  const card = (
    <Link
      className={`pcard figma-hover${featured ? ' pcard--featured' : ''}${hoverMediaSrc ? ' pcard--has-hover-media' : ''}`}
      to={`/${slug}`}
      aria-label={`View ${name} project`}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
    >
      <div className="pcard-inner">
        <div className="pcard-top-row">
          <span className="pcard-tag">{safeTag}</span>
          <span className="pcard-year">
            {nda && (
              <span className="pcard-nda" title="Password protected">
                <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="8" width="12" height="7" rx="1.5" /><path d="M5 8V5a3 3 0 0 1 6 0v3" /></svg>
                NDA
              </span>
            )}
            {safeYear}
          </span>
        </div>
        <div className="pcard-visual">
          <img
            src={resolvedImage}
            alt={resolvedAlt}
            loading={loading}
            decoding="async"
            fetchPriority={loading === 'eager' ? 'high' : 'auto'}
            onLoad={handleImgLoad}
            onError={handleImgError}
          />
          {hoverMediaSrc ? (
            hoverMediaKind === 'video' ? (
              <video
                className="pcard-hover-media"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                aria-hidden="true"
              >
                <source src={hoverMediaSrc} />
              </video>
            ) : (
              <img
                className="pcard-hover-media"
                src={hoverMediaSrc}
                alt=""
                loading={loading}
                decoding="async"
                aria-hidden="true"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            )
          ) : null}
        </div>
        <h2 className="pcard-name">{name}</h2>
        {safeMarqueeText && (
          <div className="pcard-marquee">
            <div className="pcard-marquee-track">
              <span>{safeMarqueeText}, {safeMarqueeText}, {safeMarqueeText}, </span>
              <span>{safeMarqueeText}, {safeMarqueeText}, {safeMarqueeText}, </span>
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
