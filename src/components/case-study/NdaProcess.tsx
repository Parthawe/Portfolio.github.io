interface Decision {
  /** The design move, stated concretely but without confidential specifics. */
  move: string
  /** Why it mattered — the reasoning a reviewer is really evaluating. */
  why: string
}

interface NdaProcessProps {
  title?: string
  intro?: string
  decisions: Decision[]
  /** Optional described before/after — no real screens, just the shift in words. */
  shift?: { before: string; after: string }
  visuals?: Array<{
    src: string
    alt: string
    label: string
  }>
}

/**
 * Shows design thinking for an NDA project without exposing protected material.
 * A recruiter who cannot unlock the full case study can still evaluate how the
 * problem was framed and what decisions were made — the parts that actually
 * signal hire-ability — while screens, metrics, and client detail stay gated.
 */
export default function NdaProcess({
  title = 'How I approached it',
  intro,
  decisions,
  shift,
  visuals = [],
}: NdaProcessProps) {
  return (
    <section className="cs-section cs-nda-process reveal" id="cs-process">
      <div className="wrap">
        <div className="cs-nda-process-head">
          <h2 className="cs-nda-process-title">{title}</h2>
          <p className="cs-nda-process-intro">
            {intro ||
              'The public process keeps only the framing and core moves: enough to understand the work without turning the page into a report.'}
          </p>
        </div>

        {visuals.length ? (
          <div className="cs-nda-process-visuals" aria-label="Process visuals">
            {visuals.map((visual) => (
              <figure className="cs-nda-process-visual" key={visual.src}>
                <img src={visual.src} alt={visual.alt} loading="lazy" decoding="async" />
                <figcaption>{visual.label}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}

        <ol className="cs-nda-process-list">
          {decisions.map((d, i) => (
            <li className="cs-nda-process-card" key={d.move}>
              <span className="cs-nda-process-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="cs-nda-process-body">
                <h3 className="cs-nda-process-move">{d.move}</h3>
                <p className="cs-nda-process-why">{d.why}</p>
              </div>
            </li>
          ))}
        </ol>

        {shift ? (
          <div className="cs-nda-process-shift" aria-label="What changed, described">
            <div className="cs-nda-process-shift-col">
              <span>Before</span>
              <p>{shift.before}</p>
            </div>
            <div className="cs-nda-process-shift-arrow" aria-hidden="true">
              →
            </div>
            <div className="cs-nda-process-shift-col cs-nda-process-shift-col--after">
              <span>After</span>
              <p>{shift.after}</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
