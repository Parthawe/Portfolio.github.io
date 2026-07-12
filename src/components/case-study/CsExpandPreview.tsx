import { useState } from 'react'
import FigmaSelect from '../FigmaSelect'

interface CsExpandPreviewProps {
  expanded?: boolean
  onExpand?: () => void
  children: React.ReactNode
  cta?: string
  ctaLabel?: string
  note?: string
}

/**
 * Article-style gateway for the full case study. Collapsed pages stay skim-first
 * and avoid loading the deep-dive media until the reader asks for it.
 */
export default function CsExpandPreview({
  expanded,
  onExpand,
  children,
  cta,
  ctaLabel = 'Read the full case study',
  note = 'The decisions, constraints, and proof behind the outcome.',
}: CsExpandPreviewProps) {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const isExpanded = expanded ?? internalExpanded
  const handleExpand = onExpand ?? (() => setInternalExpanded(true))

  if (isExpanded) {
    return <>{children}</>
  }

  return (
    <div className="cs-expand-preview cs-expand-preview--closed">
      <div className="cs-expand-preview-cta">
        <span className="cs-expand-preview-kicker">Full case study</span>
        <p className="cs-expand-preview-note">{note}</p>
        <button type="button" className="cs-expand-preview-btn figma-hover" onClick={handleExpand}>
          {cta ?? ctaLabel}
          <FigmaSelect />
        </button>
      </div>
    </div>
  )
}
