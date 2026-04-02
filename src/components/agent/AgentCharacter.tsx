export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping'

interface Props {
  state: AgentState
  onClick: () => void
  speechBubble?: string | null
  chatOpen?: boolean
}

/*
  Full-body illustrated character — inspired by One Sec / editorial illustration.
  Flat painterly style: pink skin, dark beanie, oversized green jacket,
  white tee, light pants, dark sneakers. Minimal face (just a curved smile).
  Walks along the bottom of the viewport above the dock/nav bar.
*/

export default function AgentCharacter({ state, onClick, speechBubble, chatOpen }: Props) {
  return (
    <div className="agent-char-wrap">
      {/* Speech bubble */}
      {speechBubble && (
        <div className="agent-speech" aria-live="polite">
          {speechBubble}
        </div>
      )}

      <button
        onClick={onClick}
        type="button"
        aria-label="Chat with portfolio assistant"
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
          <ellipse cx="32" cy="117" rx="16" ry="3" className="agent-b-shadow" />

          {/* ── Left leg ── */}
          <g className="agent-leg agent-leg--l">
            {/* Pant leg */}
            <path d="M22 75L20 100Q20 102 22 102L28 102Q30 102 30 100L30 75Z" className="agent-b-pants" />
            {/* Sock peek */}
            <rect x="20" y="98" width="10" height="4" rx="1" className="agent-b-sock" />
            {/* Shoe */}
            <path d="M18 102L18 110Q18 114 22 114L30 114Q32 114 32 111L32 102L20 102Z" className="agent-b-shoe" />
            {/* Shoe sole */}
            <rect x="17" y="112" width="16" height="3" rx="1.5" className="agent-b-sole" />
          </g>

          {/* ── Right leg ── */}
          <g className="agent-leg agent-leg--r">
            <path d="M34 75L34 100Q34 102 36 102L42 102Q44 102 44 100L42 75Z" className="agent-b-pants" />
            <rect x="34" y="98" width="10" height="4" rx="1" className="agent-b-sock" />
            <path d="M32 102L32 110Q32 114 36 114L44 114Q46 114 46 111L46 102L34 102Z" className="agent-b-shoe" />
            <rect x="31" y="112" width="16" height="3" rx="1.5" className="agent-b-sole" />
          </g>

          {/* ── T-shirt (visible at collar + bottom) ── */}
          <path d="M24 42Q32 46 40 42L40 50L24 50Z" className="agent-b-tee" />
          <rect x="24" y="70" width="16" height="6" rx="2" className="agent-b-tee" />

          {/* ── Jacket body ── */}
          <path
            d="M16 42Q16 38 20 36L26 34Q32 33 38 34L44 36Q48 38 48 42L48 72Q48 75 45 75L19 75Q16 75 16 72Z"
            className="agent-b-jacket"
          />

          {/* ── Jacket center zipper line ── */}
          <line x1="32" y1="38" x2="32" y2="74" className="agent-b-seam" />

          {/* ── Jacket collar flaps ── */}
          <path d="M26 34L22 42L28 42Z" className="agent-b-collar" />
          <path d="M38 34L42 42L36 42Z" className="agent-b-collar" />

          {/* ── Jacket pockets ── */}
          <rect x="19" y="52" width="10" height="8" rx="2" className="agent-b-pocket" />
          <rect x="35" y="52" width="10" height="8" rx="2" className="agent-b-pocket" />
          {/* Pocket flaps */}
          <rect x="19" y="50" width="10" height="3" rx="1" className="agent-b-pocket-flap" />
          <rect x="35" y="50" width="10" height="3" rx="1" className="agent-b-pocket-flap" />

          {/* ── Left arm ── */}
          <g className="agent-arm agent-arm--l">
            <path d="M8 40Q6 38 8 36L14 36Q16 38 16 42L14 62Q14 64 12 64L10 64Q8 64 8 62Z" className="agent-b-sleeve" />
            <ellipse cx="11" cy="66" rx="5" ry="4" className="agent-b-hand" />
          </g>

          {/* ── Right arm ── */}
          <g className="agent-arm agent-arm--r">
            <path d="M48 42Q48 38 50 36L54 36Q56 38 56 40L56 62Q56 64 54 64L52 64Q50 64 50 62Z" className="agent-b-sleeve" />
            <ellipse cx="53" cy="66" rx="5" ry="4" className="agent-b-hand" />
          </g>

          {/* ── Neck ── */}
          <rect x="28" y="22" width="8" height="14" rx="4" className="agent-b-neck" />

          {/* ── Head ── */}
          <ellipse cx="32" cy="18" rx="15" ry="16" className="agent-b-head" />

          {/* ── Beanie ── */}
          <path
            d="M17 16Q17 4 32 4Q47 4 47 16L47 18Q43 14 32 14Q21 14 17 18Z"
            className="agent-b-beanie"
          />
          {/* Beanie brim */}
          <path d="M16 16Q16 13.5 17.5 14L46.5 14Q48 13.5 48 16Q44 14.5 32 14.5Q20 14.5 16 16Z" className="agent-b-brim" />

          {/* ── Face — minimal: just a smile ── */}
          <g className="agent-b-face">
            {/* Eyes — just two happy arcs */}
            <g className="agent-b-eyes">
              <path d="M25 20Q27 17 29 20" className="agent-b-eye" />
              <path d="M35 20Q37 17 39 20" className="agent-b-eye" />
            </g>

            {/* Mouth — content smile */}
            <path d="M27 25Q32 29 37 25" className="agent-b-mouth" />

            {/* Subtle blush */}
            <ellipse cx="22" cy="23" rx="3" ry="1.5" className="agent-b-blush" />
            <ellipse cx="42" cy="23" rx="3" ry="1.5" className="agent-b-blush" />
          </g>

          {/* ── Thinking dots ── */}
          <g className="agent-b-think">
            <circle cx="52" cy="8" r="2" className="agent-b-dot agent-b-dot--1" />
            <circle cx="56" cy="3" r="2.5" className="agent-b-dot agent-b-dot--2" />
            <circle cx="60" cy="-2" r="3" className="agent-b-dot agent-b-dot--3" />
          </g>

          {/* ── Zzz ── */}
          <g className="agent-b-zzz">
            <text x="48" y="10" className="agent-b-z agent-b-z--1">z</text>
            <text x="52" y="4" className="agent-b-z agent-b-z--2">z</text>
            <text x="55" y="-2" className="agent-b-z agent-b-z--3">Z</text>
          </g>
        </svg>
      </button>
    </div>
  )
}
