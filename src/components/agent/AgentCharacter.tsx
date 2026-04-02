export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping'

interface Props {
  state: AgentState
  onClick: () => void
  speechBubble?: string | null
  chatOpen?: boolean
}

/*
  "Folio" — full-body illustrated character.
  One Sec app inspired: elongated proportions (small head, long torso),
  oversized sage jacket, chunky white-sole sneakers, minimal face.
  Signature: round glasses + gold pencil tucked in beanie.
*/

export default function AgentCharacter({ state, onClick, speechBubble, chatOpen }: Props) {
  return (
    <div className="agent-char-wrap">
      {speechBubble && (
        <div className="agent-speech" aria-live="polite">
          {speechBubble}
        </div>
      )}

      <button
        onClick={onClick}
        type="button"
        aria-label="Chat with Folio, portfolio guide"
        className={`agent-trigger agent-trigger--${state} ${chatOpen ? 'agent-trigger--open' : ''}`}
      >
        <svg
          viewBox="0 0 64 120"
          width="64"
          height="120"
          fill="none"
          className="agent-body-svg"
        >
          {/* ── Shadow ── */}
          <ellipse cx="32" cy="117" rx="18" ry="2.5" className="agent-b-shadow" />

          {/* ── Left leg ── */}
          <g className="agent-leg agent-leg--l">
            <path d="M23 82C22.5 86 22 92 21.5 98Q21 100 22.5 100L28.5 100Q30 100 29.5 98C29 92 28.5 86 28 82Z" className="agent-b-pants" />
            <rect x="21" y="97" width="9" height="3" rx="1.5" className="agent-b-sock" />
            <path d="M19 100L19.5 108Q20 112 23 112L31 112Q33 112 33 109L32.5 100Z" className="agent-b-shoe" />
            <rect x="18" y="110" width="16" height="4" rx="2" className="agent-b-sole" />
          </g>

          {/* ── Right leg ── */}
          <g className="agent-leg agent-leg--r">
            <path d="M36 82C35.5 86 35 92 34.5 98Q34 100 35.5 100L41.5 100Q43 100 42.5 98C42 92 41.5 86 41 82Z" className="agent-b-pants" />
            <rect x="34" y="97" width="9" height="3" rx="1.5" className="agent-b-sock" />
            <path d="M32 100L31.5 108Q31 112 34 112L42 112Q44 112 44 109L44.5 100Z" className="agent-b-shoe" />
            <rect x="30" y="110" width="16" height="4" rx="2" className="agent-b-sole" />
          </g>

          {/* ── Tee visible through open jacket ── */}
          <path d="M29 40Q32 43 35 40L35 82L29 82Z" className="agent-b-tee" />

          {/* ── Jacket body — oversized, hangs past hips ── */}
          <g className="agent-b-jacket-group">
            {/* Left half */}
            <path
              d="M10 40Q10 36 14 34L26 32Q29 31.5 29 32L29 80Q29 83 26 83L14 83Q10 83 10 79Z"
              className="agent-b-jacket"
            />
            {/* Right half */}
            <path
              d="M35 32Q35 31.5 38 32L50 34Q54 36 54 40L54 79Q54 83 50 83L38 83Q35 83 35 80Z"
              className="agent-b-jacket"
            />

            {/* Collar flaps */}
            <path d="M26 32L21 40L28 40Z" className="agent-b-collar" />
            <path d="M38 32L43 40L36 40Z" className="agent-b-collar" />

            {/* Single slash pocket — left side */}
            <path d="M16 56L24 60" className="agent-b-pocket-line" />

            {/* Jacket hem — curved bottom edge overlay */}
            <path d="M10 79Q20 85 32 83Q44 85 54 79" className="agent-b-hem" />
          </g>

          {/* ── Left arm ── */}
          <g className="agent-arm agent-arm--l">
            <path d="M4 38Q2 36 4 34L10 33Q12 34 12 38L10 70Q10 73 8 73L6 73Q4 73 4 70Z" className="agent-b-sleeve" />
            <circle cx="7" cy="74.5" r="3" className="agent-b-hand" />
          </g>

          {/* ── Right arm ── */}
          <g className="agent-arm agent-arm--r">
            <path d="M52 38Q54 34 56 34L60 36Q62 38 60 38L58 70Q58 73 56 73L54 73Q52 73 52 70Z" className="agent-b-sleeve" />
            <circle cx="57" cy="74.5" r="3" className="agent-b-hand" />
          </g>

          {/* ── Neck ── */}
          <rect x="30" y="18" width="5" height="15" rx="2.5" className="agent-b-neck" />

          {/* ── Head ── */}
          <ellipse cx="32" cy="14" rx="11" ry="12" className="agent-b-head" />

          {/* ── Beanie — flat cap style ── */}
          <path
            d="M21 12Q21 2 32 2Q43 2 43 12L43 14Q40 11 32 11Q24 11 21 14Z"
            className="agent-b-beanie"
          />
          {/* Brim / cuff */}
          <path d="M20 12.5Q20 10.5 22 11L42 11Q44 10.5 44 12.5Q40 11.5 32 11.5Q24 11.5 20 12.5Z" className="agent-b-brim" />
          {/* Nub on top */}
          <circle cx="32" cy="2.5" r="2" className="agent-b-beanie-nub" />

          {/* ── Pencil tucked in beanie (right side) ── */}
          <g className="agent-b-pencil-group" transform="rotate(-25, 42, 8)">
            <rect x="41" y="1" width="2" height="14" rx="1" className="agent-b-pencil" />
            <polygon points="41,15 43,15 42,17.5" className="agent-b-pencil-tip" />
          </g>

          {/* ── Glasses ── */}
          <circle cx="27" cy="15" r="4.5" className="agent-b-glass" />
          <circle cx="37" cy="15" r="4.5" className="agent-b-glass" />
          <line x1="31.5" y1="15" x2="32.5" y2="15" className="agent-b-bridge" />
          {/* Temple arms (side of glasses) */}
          <line x1="22.5" y1="14" x2="21" y2="13" className="agent-b-temple" />
          <line x1="41.5" y1="14" x2="43" y2="13" className="agent-b-temple" />

          {/* ── Face — minimal ── */}
          <g className="agent-b-face">
            <g className="agent-b-eyes">
              <path d="M25.5 15.5Q27 13 28.5 15.5" className="agent-b-eye" />
              <path d="M35.5 15.5Q37 13 38.5 15.5" className="agent-b-eye" />
            </g>
            <path d="M29 21Q32 23.5 35 21" className="agent-b-mouth" />
          </g>

          {/* ── Thinking dots ── */}
          <g className="agent-b-think">
            <circle cx="50" cy="6" r="1.5" className="agent-b-dot agent-b-dot--1" />
            <circle cx="54" cy="2" r="2" className="agent-b-dot agent-b-dot--2" />
            <circle cx="58" cy="-2" r="2.5" className="agent-b-dot agent-b-dot--3" />
          </g>

          {/* ── Zzz ── */}
          <g className="agent-b-zzz">
            <text x="46" y="8" className="agent-b-z agent-b-z--1">z</text>
            <text x="50" y="3" className="agent-b-z agent-b-z--2">z</text>
            <text x="53" y="-2" className="agent-b-z agent-b-z--3">Z</text>
          </g>
        </svg>
      </button>
    </div>
  )
}
