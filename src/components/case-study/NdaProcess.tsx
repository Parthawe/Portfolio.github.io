interface Decision {
  /** The design move, stated concretely but without confidential specifics. */
  move: string
  /** Why it mattered — the reasoning a reviewer is really evaluating. */
  why: string
}

interface NdaProcessProps {
  intro?: string
  decisions: Decision[]
  /** Optional described before/after — no real screens, just the shift in words. */
  shift?: { before: string; after: string }
}

/**
 * Shows design thinking for an NDA project without exposing protected material.
 * A recruiter who cannot unlock the full case study can still evaluate how the
 * problem was framed and what decisions were made — the parts that actually
 * signal hire-ability — while screens, metrics, and client detail stay gated.
 */
export default function NdaProcess({ intro, decisions, shift }: NdaProcessProps) {
  return (
    <section className="cs-section cs-nda-process reveal" id="cs-process">
      <div className="wrap">
        <div className="cs-nda-process-head">
          <span className="cs-section-label">How I approached it</span>
          <p className="cs-nda-process-intro">
            {intro ||
              'The confidential screens stay behind the gate — but the thinking behind them does not have to. Here is how the problem was framed and the decisions that shaped the work.'}
          </p>
        </div>

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
