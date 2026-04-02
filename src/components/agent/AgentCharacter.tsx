export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping'

interface Props {
  state: AgentState
  onClick: () => void
  speechBubble?: string | null
}

/*
  Illustrated character — flat design, layered clothing, warm personality.
  Inspired by modern editorial illustration: rounded shapes, bold colors,
  layered outfit (jacket over tee), sneakers, beanie/cap.
  ~56px wide, proportioned like a real person (slightly stylized).
*/
export default function AgentCharacter({ state, onClick, speechBubble }: Props) {
  return (
    <div className="agent-char-wrap">
      {speechBubble && (
        <div className="agent-bubble" aria-live="polite">
          {speechBubble}
          <svg className="agent-bubble-caret" width="10" height="6" viewBox="0 0 10 6">
            <path d="M0 0L5 6L10 0Z" fill="var(--agent-bubble-bg, var(--surface))" />
          </svg>
        </div>
      )}

      <button
        className={`agent-btn agent-btn--${state}`}
        onClick={onClick}
        aria-label="Chat with portfolio assistant"
        type="button"
      >
        <svg viewBox="0 0 56 88" width="56" height="88" fill="none" className="agent-svg">
          {/* Shadow */}
          <ellipse className="agent-shadow" cx="28" cy="86" rx="14" ry="2.5" />

          {/* ── Left shoe ── */}
          <g className="agent-leg agent-leg--l">
            <path className="agent-shoe" d="M16 74 L16 80 Q16 83 19 83 L24 83 Q26 83 26 81 L26 74 Z" />
            {/* Pant leg */}
            <rect className="agent-pants" x="18" y="58" width="8" height="18" rx="3" />
          </g>

          {/* ── Right shoe ── */}
          <g className="agent-leg agent-leg--r">
            <path className="agent-shoe" d="M30 74 L30 80 Q30 83 33 83 L37 83 Q40 83 40 81 L40 74 Z" />
            <rect className="agent-pants" x="30" y="58" width="8" height="18" rx="3" />
          </g>

          {/* ── T-shirt (visible at collar) ── */}
          <path className="agent-tee" d="M20 38 Q28 42 36 38 L36 44 L20 44 Z" />

          {/* ── Jacket body ── */}
          <path className="agent-jacket"
            d="M14 38 Q14 35 17 34 L23 32 Q28 31 33 32 L39 34 Q42 35 42 38 L42 58 Q42 60 40 60 L16 60 Q14 60 14 58 Z" />

          {/* ── Jacket center line ── */}
          <line className="agent-jacket-seam" x1="28" y1="34" x2="28" y2="59" strokeWidth="1" />

          {/* ── Jacket collar flaps ── */}
          <path className="agent-collar-l" d="M22 32 L19 38 L24 38 Z" />
          <path className="agent-collar-r" d="M34 32 L37 38 L32 38 Z" />

          {/* ── Pocket details ── */}
          <rect className="agent-pocket" x="17" y="44" width="7" height="6" rx="1.5" />
          <rect className="agent-pocket" x="32" y="44" width="7" height="6" rx="1.5" />

          {/* ── Left arm ── */}
          <g className="agent-arm agent-arm--l">
            <rect className="agent-jacket-sleeve" x="6" y="36" width="9" height="18" rx="4" />
            <ellipse className="agent-hand" cx="10.5" cy="56" rx="4" ry="3.5" />
          </g>

          {/* ── Right arm ── */}
          <g className="agent-arm agent-arm--r">
            <rect className="agent-jacket-sleeve" x="41" y="36" width="9" height="18" rx="4" />
            <ellipse className="agent-hand" cx="45.5" cy="56" rx="4" ry="3.5" />
          </g>

          {/* ── Head ── */}
          <ellipse className="agent-head" cx="28" cy="18" rx="14" ry="15" />

          {/* ── Beanie/Cap ── */}
          <path className="agent-beanie"
            d="M14 14 Q14 4 28 4 Q42 4 42 14 L42 16 Q38 12 28 12 Q18 12 14 16 Z" />
          <rect className="agent-beanie-band" x="14" y="13" width="28" height="3" rx="1.5" />
          {/* Beanie pom */}
          <circle className="agent-pom" cx="28" cy="4" r="3" />

          {/* ── Face ── */}
          <g className="agent-face">
            {/* Eyes */}
            <g className="agent-eyes">
              <g className="agent-eye-l">
                <ellipse className="agent-eye-white" cx="22" cy="19" rx="3.5" ry="4" />
                <ellipse className="agent-pupil" cx="23" cy="19" rx="2" ry="2.5" />
                <circle className="agent-glint" cx="24" cy="18" r="0.8" />
              </g>
              <g className="agent-eye-r">
                <ellipse className="agent-eye-white" cx="34" cy="19" rx="3.5" ry="4" />
                <ellipse className="agent-pupil" cx="35" cy="19" rx="2" ry="2.5" />
                <circle className="agent-glint" cx="36" cy="18" r="0.8" />
              </g>
            </g>

            {/* Mouth */}
            <path className="agent-mouth" d="M24 26 Q28 30 32 26" strokeWidth="1.5" strokeLinecap="round" />

            {/* Cheek blush */}
            <ellipse className="agent-blush-l" cx="17" cy="23" rx="3" ry="2" />
            <ellipse className="agent-blush-r" cx="39" cy="23" rx="3" ry="2" />
          </g>

          {/* ── Thinking dots ── */}
          <g className="agent-think-dots">
            <circle cx="46" cy="8" r="2" className="agent-dot agent-dot--1" />
            <circle cx="50" cy="4" r="2.5" className="agent-dot agent-dot--2" />
            <circle cx="54" cy="0" r="3" className="agent-dot agent-dot--3" />
          </g>

          {/* ── Zzz ── */}
          <g className="agent-zzz">
            <text x="44" y="10" className="agent-z agent-z--1">z</text>
            <text x="48" y="5" className="agent-z agent-z--2">z</text>
            <text x="51" y="-1" className="agent-z agent-z--3">Z</text>
          </g>
        </svg>
      </button>
    </div>
  )
}
