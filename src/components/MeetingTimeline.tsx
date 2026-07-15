import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════
   Meeting Timeline — ExecutiveLens AI meeting summary.

   Simulates how ExecutiveLens processes a meeting:
   live transcript → AI extraction → structured summary.
   Plays through a sample meeting in accelerated time.
   ═══════════════════════════════════════════════════════════ */

const TRANSCRIPT = [
  { time: 0, speaker: 'Sarah', text: 'Let\'s start with the Q3 metrics. Revenue is up 12% but churn increased.' },
  { time: 3, speaker: 'Mike', text: 'The churn is mostly SMB segment. Enterprise is actually growing 18%.' },
  { time: 6, speaker: 'Sarah', text: 'We need to decide: do we double down on enterprise or fix SMB retention?' },
  { time: 9, speaker: 'Priya', text: 'I think we should launch the retention campaign by end of month.' },
  { time: 12, speaker: 'Mike', text: 'Agreed. Can we commit to having the campaign live by October 15th?' },
  { time: 15, speaker: 'Sarah', text: 'Yes. Priya owns the campaign. Mike, can you pull the SMB cohort data?' },
  { time: 18, speaker: 'Mike', text: 'I\'ll have it by Friday.' },
  { time: 20, speaker: 'Sarah', text: 'Perfect. Let\'s reconvene next Tuesday. Meeting adjourned.' },
]

const AI_SUMMARY = {
  decisions: ['Double down on enterprise growth while fixing SMB retention in parallel'],
  actions: [
    { owner: 'Priya', task: 'Launch SMB retention campaign', deadline: 'Oct 15' },
    { owner: 'Mike', task: 'Pull SMB cohort analysis data', deadline: 'This Friday' },
  ],
  keyMetrics: ['Revenue +12% YoY', 'Enterprise +18%', 'SMB churn increasing'],
  nextMeeting: 'Next Tuesday',
}

export default function MeetingTimeline() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalDuration = 24

  useEffect(() => {
    if (!playing) return
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= totalDuration) {
          setPlaying(false)
          setShowSummary(true)
          return totalDuration
        }
        return p + 0.1
      })
    }, 100)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing])

  const reset = () => { setProgress(0); setShowSummary(false); setPlaying(false) }
  const visibleLines = TRANSCRIPT.filter(l => l.time <= progress)

  return (
    <div style={{
      width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      border: '1px solid var(--ink-06)', background: 'var(--ink-03)',
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 16px', borderBottom: '1px solid var(--ink-04)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 16, color: 'var(--ink-50)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          ExecutiveLens &middot; Meeting Replay
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {!playing && progress === 0 && (
            <button onClick={() => setPlaying(true)} style={{
              padding: '8px 12px', borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(59,130,246,0.2)', background: 'rgba(59,130,246,0.06)',
              color: '#3b82f6', fontFamily: 'var(--mono)', fontSize: 16,
              cursor: 'pointer', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>▶ Play Meeting</button>
          )}
          {(playing || progress > 0) && (
            <button onClick={reset} style={{
              padding: '8px 10px', borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--ink-06)', background: 'var(--ink-03)',
              color: 'var(--ink-60)', fontFamily: 'var(--mono)', fontSize: 16,
              cursor: 'pointer', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>Reset</button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: 'var(--ink-06)' }}>
        <div style={{
          height: '100%', width: `${(progress / totalDuration) * 100}%`,
          background: '#60a5fa', transition: 'width 0.1s linear',
        }} />
      </div>

      <div className="meeting-timeline-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', minHeight: 260 }}>
        {/* Transcript (left) */}
        <div style={{
          minWidth: 0, padding: '16px',
          borderRight: '1px solid var(--ink-04)',
          maxHeight: 280, overflowY: 'auto',
        }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 16, color: 'var(--ink-50)',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
          }}>Live Transcript</div>
          {visibleLines.length === 0 && (
            <div style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-50)', fontStyle: 'italic' }}>
              Press play to start the meeting...
            </div>
          )}
          {visibleLines.map((line, i) => (
            <div key={i} style={{
              marginBottom: 8, opacity: i === visibleLines.length - 1 ? 1 : 0.6,
              animation: i === visibleLines.length - 1 ? 'fadeSlideIn 0.3s ease' : 'none',
            }}>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 600,
                color: line.speaker === 'Sarah' ? '#60a5fa' : line.speaker === 'Mike' ? '#f59e0b' : '#22c55e',
              }}>{line.speaker}</span>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-70)', margin: '4px 0 0', lineHeight: 1.5 }}>
                {line.text}
              </p>
            </div>
          ))}
        </div>

        {/* AI Summary (right) */}
        <div style={{
          minWidth: 0, padding: '16px',
          opacity: showSummary ? 1 : 0.42,
          transition: 'opacity 0.5s',
        }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 16, color: showSummary ? '#3b82f6' : 'var(--ink-40)',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
            transition: 'color 0.3s',
          }}>
            {showSummary ? '✓ AI Summary Generated' : 'AI Summary (after meeting)'}
          </div>

          <div style={{ fontFamily: 'var(--mono)', fontSize: 16, color: 'var(--ink-50)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Decisions</div>
          {AI_SUMMARY.decisions.map((d, i) => (
            <p key={i} style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-70)', margin: '0 0 12px', lineHeight: 1.5 }}>• {d}</p>
          ))}

          <div style={{ fontFamily: 'var(--mono)', fontSize: 16, color: 'var(--ink-50)', marginBottom: 4, marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Action Items</div>
          {AI_SUMMARY.actions.map((a, i) => (
            <div key={i} style={{ marginBottom: 10, fontSize: 16, color: 'var(--ink-70)', fontFamily: 'var(--sans)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ink)' }}>{a.owner}</strong>: {a.task} <span style={{ fontFamily: 'var(--mono)', fontSize: 16, color: 'var(--ink-50)' }}>by {a.deadline}</span>
            </div>
          ))}

          <div style={{ fontFamily: 'var(--mono)', fontSize: 16, color: 'var(--ink-50)', marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Next: {AI_SUMMARY.nextMeeting}</div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .meeting-timeline-body { grid-template-columns: minmax(0, 1fr) !important; }
          .meeting-timeline-body > :first-child {
            border-right: 0 !important;
            border-bottom: 1px solid var(--ink-04);
          }
        }
      `}</style>
    </div>
  )
}
