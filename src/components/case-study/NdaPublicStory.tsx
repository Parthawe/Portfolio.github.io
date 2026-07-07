import { useState } from 'react'
import { getProject } from '../../data/projects'

interface NdaPublicStoryProps {
  slug: string
  headline: string
  lede?: string
  visuals?: Array<{
    src: string
    alt: string
    label: string
  }>
}

export default function NdaPublicStory({ slug, headline, lede, visuals = [] }: NdaPublicStoryProps) {
  const [selectedVisualIndex, setSelectedVisualIndex] = useState(0)
  const project = getProject(slug)

  if (!project) return null

  const challenge = project.storyline?.challenge || project.summaryProblem || project.desc
  const approach = project.storyline?.approach || project.summaryRole || 'I shaped the product story, flow, and interface direction around the core user risk.'
  const result = project.summaryOutcome || project.storyline?.result || project.desc
  const stats = project.summaryStats?.slice(0, 4) || []
  const selectedVisual = visuals[selectedVisualIndex] || visuals[0]

  return (
    <section className="cs-section cs-nda-story reveal" id="cs-public-story">
      <div className="wrap cs-nda-story-grid">
        <div className="cs-nda-story-head">
          <span className="cs-section-label">Public glimpse</span>
          <h2 className="cs-nda-story-title">{headline}</h2>
          {lede ? <p className="cs-nda-story-lede">{lede}</p> : null}
        </div>

        <div className="cs-nda-story-body">
          {visuals.length ? (
            <div className="cs-nda-image-gallery" aria-label={`${project.name} safe public visual preview`}>
              <figure className="cs-nda-image-card cs-nda-image-card--hero">
                <img src={selectedVisual.src} alt={selectedVisual.alt} loading="eager" decoding="async" />
                <figcaption>{selectedVisual.label}</figcaption>
              </figure>
              <div className="cs-nda-image-rail" aria-label="Choose a public preview image">
                {visuals.map((visual, index) => (
                  <button
                    className="cs-nda-image-thumb"
                    type="button"
                    key={visual.src}
                    aria-pressed={index === selectedVisualIndex}
                    onClick={() => setSelectedVisualIndex(index)}
                  >
                    <img src={visual.src} alt="" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                    <span>{visual.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="cs-nda-visual-board" role="img" aria-label={`${project.name} safe abstract interface preview`}>
              <div className="cs-nda-visual-topline">
                <span>{project.tag || 'Case study'}</span>
                <span>Safe public preview</span>
              </div>

              <div className="cs-nda-visual-stage">
                <div className="cs-nda-phone-shell">
                  <div className="cs-nda-phone-bar">
                    <span />
                    <span />
                  </div>
                  <div className="cs-nda-phone-hero">
                    <small>Primary flow</small>
                    <strong>{project.name}</strong>
                  </div>
                  <div className="cs-nda-progress-card">
                    <span>Signal clarity</span>
                    <i />
                  </div>
                  <div className="cs-nda-line-stack">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="cs-nda-action-row">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="cs-nda-system-stack">
                  <div className="cs-nda-system-card cs-nda-system-card--accent">
                    <span>System state</span>
                    <strong>Before commitment</strong>
                  </div>
                  <div className="cs-nda-mini-grid">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="cs-nda-route-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>

              <div className="cs-nda-shot-strip" aria-hidden="true">
                <span>
                  <i />
                  Entry
                </span>
                <span>
                  <i />
                  Working state
                </span>
                <span>
                  <i />
                  Review moment
                </span>
              </div>
            </div>
          )}

          <div className="cs-nda-story-proof" aria-label={`${project.name} safe public summary`}>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Problem</span>
              <span className="cs-label-row-val">{challenge}</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Move</span>
              <span className="cs-label-row-val">{approach}</span>
            </div>
            <div className="cs-label-row" style={{ borderBottom: 'none' }}>
              <span className="cs-label-row-key">Glimpse</span>
              <span className="cs-label-row-val">{result}</span>
            </div>
          </div>

          {stats.length ? (
            <div className="cs-nda-proof-strip" aria-label={`${project.name} public project facts`}>
              {stats.map((stat) => (
                <div className="cs-nda-proof-pill" key={`${stat.label}-${stat.value}`}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
