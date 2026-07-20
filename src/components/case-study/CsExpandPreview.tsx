import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getProject } from '../../data/projects'

interface CsExpandPreviewProps {
  expanded?: boolean
  onExpand?: () => void
  children: React.ReactNode
  cta?: string
  ctaLabel?: string
  note?: string
  preview?: React.ReactNode
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
  ctaLabel = 'Reveal full story',
  note = 'The process, decisions, and proof behind the outcome.',
  preview,
}: CsExpandPreviewProps) {
  const { pathname } = useLocation()
  const [internalExpanded, setInternalExpanded] = useState(false)
  const isExpanded = expanded ?? internalExpanded
  const handleExpand = onExpand ?? (() => setInternalExpanded(true))
  const project = getProject(pathname.replace(/^\/+|\/+$/g, ''))
  const editorialPreview = preview ?? (
    <article className="cs-expand-preview-article-copy cs-expand-preview-article-copy--auto">
      <span className="cs-section-label">{project?.tag ?? 'Case study'}</span>
      <h2>{project ? `${project.name}: behind the outcome` : 'The work behind the outcome'}</h2>
      <p>{project?.summaryProblem ?? project?.desc ?? 'A closer look at the problem, decisions, iterations, and evidence behind the final work.'}</p>
      <p>{project?.summaryOutcome ?? note}</p>
    </article>
  )

  if (isExpanded) {
    return <>{children}</>
  }

  return (
    <div className="cs-expand-preview cs-expand-preview--closed cs-expand-preview--article">
      <div className="cs-expand-preview-content">{editorialPreview}</div>
      <div className="cs-expand-preview-veil" aria-hidden="true" />
      <div className="cs-expand-preview-cta">
        <p className="cs-expand-preview-note">{note}</p>
        <button type="button" className="cs-expand-preview-btn figma-hover" aria-expanded="false" onClick={handleExpand}>
          {cta ?? ctaLabel}
          <span className="cs-expand-preview-btn-arrow" aria-hidden="true">↓</span>
        </button>
      </div>
    </div>
  )
}
