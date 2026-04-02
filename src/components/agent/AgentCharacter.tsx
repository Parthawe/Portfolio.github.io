export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping' | 'pointing'

interface Props {
  state: AgentState
  onClick: () => void
  speechBubble?: string | null
  chatOpen?: boolean
  facingLeft?: boolean
}

/*
  "Folio" — full-body illustrated character.
  Lobster Studio / One Sec inspired: no outlines, pure filled shapes,
  overlapping layers for depth, oversized jacket silhouette extends
  beyond body, thick columnar legs, wide flat-bottomed chunky sneakers.
  Asymmetric stance (left foot slightly forward).
  Face: just two dots and a tiny curve. Beanie pulled low.
*/

export default function AgentCharacter({ state, onClick, speechBubble, chatOpen, facingLeft }: Props) {
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
          className={`agent-body-svg ${facingLeft ? 'agent-body-svg--flip' : ''}`}
        >
          {/* ── Ground shadow ── */}
          <ellipse cx="33" cy="116" rx="18" ry="3" className="agent-b-shadow" />

          {/* ── Left leg (slightly forward — asymmetric stance) ── */}
          <g className="agent-leg agent-leg--l">
            {/* Pant — thick columnar, no taper */}
            <path d="M21 80C21 80 20.5 95 20.5 99Q20.5 101 22 101L28 101Q29.5 101 29 99C28.5 95 28 80 28 80Z" className="agent-b-pants" />
            {/* Shoe — wide, chunky, flat bottom */}
            <path d="M18 99L18.5 108Q19 111 22 111L30 111Q33 111 33 108L32 99Z" className="agent-b-shoe" />
            {/* Thick light sole — flat bottom edge */}
            <path d="M17 109L17 112Q17 114 19 114L32 114Q34 114 34 112L34 109Q28 110.5 25 110.5Q21 110.5 17 109Z" className="agent-b-sole" />
          </g>

          {/* ── Right leg ── */}
          <g className="agent-leg agent-leg--r">
            <path d="M35 80C35 80 34.5 95 34.5 99Q34.5 101 36 101L42 101Q43.5 101 43 99C42.5 95 42 80 42 80Z" className="agent-b-pants" />
            <path d="M32 99L31.5 108Q31 111 34 111L42 111Q45 111 45 108L46 99Z" className="agent-b-shoe" />
            <path d="M30 109L30 112Q30 114 32 114L45 114Q47 114 47 112L47 109Q42 110.5 38 110.5Q34 110.5 30 109Z" className="agent-b-sole" />
          </g>

          {/* ── T-shirt visible through open jacket ── */}
          <path d="M28 38Q32 41 36 38L36.5 82L27.5 82Z" className="agent-b-tee" />

          {/* ── Jacket body — oversized, extends beyond body silhouette ── */}
          {/* Back shadow layer (darker, peeks out behind jacket) */}
          <path d="M12 39Q12 35 16 33L27 31Q32 30.5 37 31L48 33Q52 35 52 39L52 78Q52 82 48 83L16 83Q12 82 12 78Z" className="agent-b-jacket-shadow" />

          {/* Left jacket panel */}
          <path d="M10 40Q10 36 14 34L27 32Q28 31.5 28 32L28 80Q28 83 25 84L14 84Q10 83 10 79Z" className="agent-b-jacket" />
          {/* Right jacket panel */}
          <path d="M36 32Q36 31.5 37 32L50 34Q54 36 54 40L54 79Q54 83 50 84L39 84Q36 83 36 80Z" className="agent-b-jacket" />

          {/* Collar — overlapping triangular flaps */}
          <path d="M27 32L22 41L28 40Z" className="agent-b-collar" />
          <path d="M37 32L42 41L36 40Z" className="agent-b-collar" />

          {/* Pocket — single diagonal slash, left side */}
          <path d="M15 55C17 56 22 58 24 59" className="agent-b-pocket-line" />

          {/* ── Left arm — sleeve covers wrist, tiny hand nub ── */}
          <g className="agent-arm agent-arm--l">
            <path d="M5 38Q3 36 5 34L11 33Q13 34 12 39L10 70Q10 73 8 73.5L6 73.5Q4 73 4 70Z" className="agent-b-sleeve" />
            <circle cx="7" cy="75" r="3.5" className="agent-b-hand" />
          </g>

          {/* ── Right arm ── */}
          <g className="agent-arm agent-arm--r">
            <path d="M52 39Q53 34 55 34L59 36Q61 38 59 39L57 70Q57 73 55.5 73.5L53.5 73.5Q52 73 52 70Z" className="agent-b-sleeve" />
            <circle cx="57" cy="75" r="3.5" className="agent-b-hand" />
          </g>

          {/* ── Neck ── */}
          <rect x="30" y="19" width="5" height="14" rx="2.5" className="agent-b-neck" />

          {/* ── Head — slightly tilted oval ── */}
          <ellipse cx="32" cy="14" rx="11" ry="12" className="agent-b-head" />

          {/* ── Beanie — pulled low over forehead ── */}
          <path d="M21 13Q21 2 32 2Q43 2 43 13L43 15Q39 12 32 12Q25 12 21 15Z" className="agent-b-beanie" />
          {/* Thick cuff/brim */}
          <path d="M20 13Q20 10 22.5 11L41.5 11Q44 10 44 13Q40 12 32 12Q24 12 20 13Z" className="agent-b-brim" />
          {/* Nub */}
          <circle cx="32" cy="2.5" r="2.2" className="agent-b-beanie" />

          {/* ── Pencil tucked in beanie ── */}
          <g className="agent-b-pencil-group" transform="rotate(-25, 42, 8)">
            <rect x="41" y="2" width="2.2" height="13" rx="1.1" className="agent-b-pencil" />
            <polygon points="41,15 43.2,15 42.1,17.5" className="agent-b-pencil-tip" />
          </g>

          {/* ── Glasses — round, thin, no outlines just filled circles ── */}
          <circle cx="27" cy="16" r="4.5" className="agent-b-glass" />
          <circle cx="37" cy="16" r="4.5" className="agent-b-glass" />
          <line x1="31.5" y1="16" x2="32.5" y2="16" className="agent-b-bridge" />
          <line x1="22.5" y1="15" x2="21" y2="13.5" className="agent-b-temple" />
          <line x1="41.5" y1="15" x2="43" y2="13.5" className="agent-b-temple" />

          {/* ── Face — ultra minimal: two dots + tiny curve ── */}
          <g className="agent-b-face">
            <g className="agent-b-eyes">
              {/* Dot eyes — not arcs, just filled circles for max simplicity */}
              <circle cx="27" cy="16.5" r="1.5" className="agent-b-eye" />
              <circle cx="37" cy="16.5" r="1.5" className="agent-b-eye" />
            </g>
            {/* Tiny smile — barely there */}
            <path d="M29.5 22Q32 24 34.5 22" className="agent-b-mouth" />
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
