export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping'

interface Props {
  state: AgentState
  onClick: () => void
  speechBubble?: string | null
  chatOpen?: boolean
}

/*
  Warm geometric character — head-only design.
  Soft squircle face in warm cream, dot eyes, tiny smile arc.
  Single accent: small round glasses. No outlines — filled shapes only.
  Designed to read perfectly at 48px and match the portfolio's
  editorial aesthetic (warm neutrals, DM Sans, frosted glass).
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

      {/* Character button */}
      <button
        onClick={onClick}
        type="button"
        aria-label="Chat with portfolio assistant"
        className={`agent-trigger agent-trigger--${state} ${chatOpen ? 'agent-trigger--open' : ''}`}
      >
        <svg
          viewBox="0 0 48 48"
          width="48"
          height="48"
          fill="none"
          className="agent-face-svg"
        >
          {/* Soft shadow underneath */}
          <ellipse cx="24" cy="45" rx="14" ry="2" className="agent-f-shadow" />

          {/* Hair / top of head — gives personality */}
          <path
            d="M12 22C12 13 17 8 24 8C31 8 36 13 36 22"
            className="agent-f-hair"
          />
          {/* Small tuft / side part */}
          <path
            d="M18 10C20 7 23 6.5 24 8"
            className="agent-f-hair-tuft"
          />

          {/* Face — warm soft squircle */}
          <rect
            x="10" y="14" width="28" height="26" rx="12"
            className="agent-f-face"
          />

          {/* Glasses — thin round frames, the signature detail */}
          <circle cx="19" cy="26" r="5" className="agent-f-glass" />
          <circle cx="29" cy="26" r="5" className="agent-f-glass" />
          {/* Bridge */}
          <path d="M24 26C23 24.5 25 24.5 24 26" className="agent-f-bridge" />
          <line x1="24" y1="25.5" x2="24" y2="26.5" className="agent-f-bridge-line" />

          {/* Eyes — simple dots inside glasses */}
          <g className="agent-f-eyes">
            <circle cx="19" cy="26.5" r="2" className="agent-f-eye" />
            <circle cx="29" cy="26.5" r="2" className="agent-f-eye" />
            {/* Tiny glints */}
            <circle cx="20" cy="25.5" r="0.6" className="agent-f-glint" />
            <circle cx="30" cy="25.5" r="0.6" className="agent-f-glint" />
          </g>

          {/* Mouth — tiny subtle arc */}
          <path d="M21 33Q24 35.5 27 33" className="agent-f-mouth" />

          {/* Blush — very subtle warmth */}
          <ellipse cx="14" cy="30" rx="2.5" ry="1.5" className="agent-f-blush" />
          <ellipse cx="34" cy="30" rx="2.5" ry="1.5" className="agent-f-blush" />

          {/* Thinking dots — only visible in thinking state */}
          <g className="agent-f-think">
            <circle cx="38" cy="16" r="1.5" className="agent-f-dot agent-f-dot--1" />
            <circle cx="41" cy="12" r="2" className="agent-f-dot agent-f-dot--2" />
            <circle cx="44" cy="8" r="2.5" className="agent-f-dot agent-f-dot--3" />
          </g>

          {/* Zzz — only visible in sleeping state */}
          <g className="agent-f-zzz">
            <text x="36" y="16" className="agent-f-z agent-f-z--1">z</text>
            <text x="39" y="11" className="agent-f-z agent-f-z--2">z</text>
            <text x="42" y="6" className="agent-f-z agent-f-z--3">Z</text>
          </g>
        </svg>

        {/* Online dot */}
        {!chatOpen && (
          <span className="agent-online-dot" />
        )}
      </button>
    </div>
  )
}
