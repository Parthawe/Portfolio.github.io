import { useEffect, useId, useRef, useState } from 'react'

interface CsExpandPreviewProps {
  expanded?: boolean
  onExpand?: () => void
  children: React.ReactNode
  cta?: string
  ctaLabel?: string
  note?: string
  preview?: React.ReactNode
}

/** Keep the summary short; mount the full story when the reader opens it. */
export default function CsExpandPreview({
  expanded,
  onExpand,
  children,
  cta,
  ctaLabel = 'Read the full story',
  note = 'Explore the process, decisions, and details.',
  preview,
}: CsExpandPreviewProps) {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const isExpanded = expanded ?? internalExpanded
  const contentId = useId()
  const content = useRef<HTMLDivElement>(null)
  const requested = useRef(false)

  useEffect(() => {
    if (isExpanded && requested.current) {
      content.current?.focus({ preventScroll: true })
      content.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
      requested.current = false
    }
  }, [isExpanded])

  return (
    <div className="project-story">
      {!isExpanded && <div className="cs-expand-preview project-story__prompt">
        <div className="project-story__copy">
          {preview ?? <h2>Explore the project</h2>}
          <p>{note}</p>
        </div>
        <button type="button" className="cs-expand-preview-btn" aria-expanded={false} aria-controls={contentId} onClick={() => {
          requested.current = true
          if (onExpand) onExpand()
          else setInternalExpanded(true)
        }}>
          {cta ?? ctaLabel}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 14 7 7 7-7M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>}
      <div id={contentId} ref={content} tabIndex={-1} hidden={!isExpanded} className="project-story__content">
        {isExpanded ? children : null}
      </div>
    </div>
  )
}
