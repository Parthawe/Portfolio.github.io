import FigmaSelect from '../FigmaSelect'

interface CsExpandPreviewProps {
  expanded: boolean
  onExpand: () => void
  children: React.ReactNode
  ctaLabel?: string
  note?: string
}

/**
 * Article-style teaser for the full case study. While collapsed, the real
 * content renders clipped behind a progressive blur so readers can see how
 * much more is there; the CTA expands it in place without a scroll jump.
 */
export default function CsExpandPreview({
  expanded,
  onExpand,
  children,
  ctaLabel = 'Read the full case study',
  note = 'The decisions, constraints, and proof behind the outcome.',
}: CsExpandPreviewProps) {
  if (expanded) {
    return <>{children}</>
  }

  return (
    <div className="cs-expand-preview">
      <div className="cs-expand-preview-content" aria-hidden="true" inert>
        {children}
      </div>
      <div className="cs-expand-preview-veil" aria-hidden="true" />
      <div className="cs-expand-preview-cta">
        <span className="cs-expand-preview-kicker">Full case study</span>
        <p className="cs-expand-preview-note">{note}</p>
        <button type="button" className="cs-expand-preview-btn figma-hover" onClick={onExpand}>
          {ctaLabel}
          <FigmaSelect />
        </button>
      </div>
    </div>
  )
}
