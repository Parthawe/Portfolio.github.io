import { useEffect, useState } from 'react'

interface ReviewerImage {
  src: string
  alt: string
}

interface ReviewerGroup {
  label: string
  note: string
  images: ReviewerImage[]
  /** Tall full-page captures (e.g. a scrolling marketing site) skip the cropped grid aspect. */
  tall?: boolean
}

interface NdaReviewerGalleryProps {
  groups: ReviewerGroup[]
}

function ReviewerImageSet({ group }: { group: ReviewerGroup }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasSlides = group.images.length > 1
  const activeImage = group.images[activeIndex] ?? group.images[0]

  useEffect(() => {
    if (!hasSlides) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % group.images.length)
    }, 3600)
    return () => window.clearInterval(interval)
  }, [group.images.length, hasSlides])

  if (!activeImage) return null

  if (group.tall) {
    return (
      <figure className="cs-img-full cs-nda-reviewer-shot cs-nda-reviewer-shot--landing">
        <div className="cs-nda-reviewer-landing-crop">
          <img src={activeImage.src} alt={activeImage.alt} loading="lazy" decoding="async" />
        </div>
      </figure>
    )
  }

  if (!hasSlides) {
    return (
      <figure className="cs-img-full cs-nda-reviewer-shot">
        <img src={activeImage.src} alt={activeImage.alt} loading="lazy" decoding="async" />
      </figure>
    )
  }

  return (
    <div className="cs-nda-reviewer-carousel" aria-roledescription="carousel">
      <figure className="cs-img-full cs-nda-reviewer-shot cs-nda-reviewer-shot--active">
        <img key={activeImage.src} src={activeImage.src} alt={activeImage.alt} loading="lazy" decoding="async" />
      </figure>

      <div className="cs-nda-reviewer-thumbs" aria-label={`${group.label} screens`}>
        {group.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`cs-nda-reviewer-thumb${index === activeIndex ? ' is-active' : ''}`}
            aria-label={`Show ${group.label} screen ${index + 1}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <img src={image.src} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * Real screens shown once reviewer access is granted. Renders as children of
 * <NdaGate> — see ACCESS_MODEL.md: the gate is a UX nudge, not a lock, so
 * only content already cleared for recoverability belongs here.
 */
export default function NdaReviewerGallery({ groups }: NdaReviewerGalleryProps) {
  return (
    <div className="cs-nda-reviewer-gallery">
      {groups.map((group) => (
        <section className="cs-nda-reviewer-group" key={group.label}>
          <header className="cs-nda-reviewer-group-head">
            <span className="cs-nda-reviewer-group-label">{group.label}</span>
            <p className="cs-nda-reviewer-group-note">{group.note}</p>
          </header>
          <div className={`cs-nda-reviewer-grid${group.tall ? ' cs-nda-reviewer-grid--tall' : ''}`}>
            <ReviewerImageSet group={group} />
          </div>
        </section>
      ))}
    </div>
  )
}
