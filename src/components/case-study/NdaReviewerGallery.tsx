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
            {group.images.map((image) => (
              <figure className={`cs-img-full cs-nda-reviewer-shot${group.tall ? ' cs-nda-reviewer-shot--tall' : ''}`} key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
