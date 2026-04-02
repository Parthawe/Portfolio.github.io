export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping' | 'pointing'

interface Props {
  state: AgentState
  onClick: () => void
  speechBubble?: string | null
  chatOpen?: boolean
  facingLeft?: boolean
}

/*
  "Folio" — Parth's cartoon avatar.
  Faithful to the reference: warm skin, big white eyes with small pupils,
  thick eyebrows, curly black hair, stubble, oversized black crewneck.
  If public/Assets/folio-character.png exists, uses that instead.
*/

export default function AgentCharacter({ state, onClick, chatOpen, facingLeft }: Props) {
  return (
    <div className="agent-char-wrap">
      <button
        onClick={onClick}
        type="button"
        aria-label="Chat with Folio, portfolio guide"
        className={`agent-trigger agent-trigger--${state} ${chatOpen ? 'agent-trigger--open' : ''}`}
      >
        <div className={`agent-img-wrap ${facingLeft ? 'agent-img--flip' : ''}`}>
          <svg viewBox="0 0 80 120" width="80" height="120" fill="none" className="agent-character-svg">

            {/* ── Shadow ── */}
            <ellipse cx="40" cy="118" rx="20" ry="2.5" fill="rgba(0,0,0,0.06)" />

            {/* ── Black pants ── */}
            <g className="agent-leg agent-leg--l">
              <path d="M28 88 L26 108 Q26 111 29 111 L35 111 Q38 111 37 108 L36 88Z" fill="#1A1A1A" />
              <path d="M24 109 Q24 114 28 114 L37 114 Q40 114 40 111 L39 109 Q34 110 32 110 Q28 110 24 109Z" fill="#E0DCD6" />
            </g>
            <g className="agent-leg agent-leg--r">
              <path d="M42 88 L41 108 Q41 111 44 111 L50 111 Q53 111 52 108 L51 88Z" fill="#1A1A1A" />
              <path d="M39 109 Q39 114 42 114 L52 114 Q55 114 55 111 L54 109 Q49 110 46 110 Q43 110 39 109Z" fill="#E0DCD6" />
            </g>

            {/* ── Oversized black crewneck sweatshirt ── */}
            {/* Shadow behind */}
            <path d="M14 42 Q14 38 18 36 L34 34 Q40 33 46 34 L62 36 Q66 38 66 42 L66 88 Q66 91 62 91 L18 91 Q14 91 14 88Z" fill="#111111" />
            {/* Main body */}
            <path d="M12 44 Q12 39 17 37 L35 34 Q40 33.5 45 34 L63 37 Q68 39 68 44 L68 90 Q68 93 63 93 L17 93 Q12 93 12 90Z" fill="#222222" />
            {/* Neckline */}
            <path d="M32 34 Q36 37 40 37.5 Q44 37 48 34" stroke="#333" strokeWidth="1" fill="none" strokeLinecap="round" />
            {/* Left sleeve seam */}
            <path d="M17 40 Q15 52 13 60" stroke="#2A2A2A" strokeWidth="0.7" fill="none" opacity="0.4" />
            {/* Right sleeve seam */}
            <path d="M63 40 Q65 52 67 60" stroke="#2A2A2A" strokeWidth="0.7" fill="none" opacity="0.4" />

            {/* ── Left arm ── */}
            <g className="agent-arm agent-arm--l">
              <path d="M6 43 Q4 40 6 38 L13 36 Q16 37 15 42 L12 76 Q12 79 10 79 L8 79 Q6 79 6 76Z" fill="#222222" />
              <circle cx="9" cy="80.5" r="4" fill="#D0956E" />
            </g>

            {/* ── Right arm ── */}
            <g className="agent-arm agent-arm--r">
              <path d="M65 42 Q66 37 68 37 L74 39 Q76 41 74 43 L72 76 Q72 79 70 79 L68 79 Q66 79 66 76Z" fill="#222222" />
              <circle cx="71" cy="80.5" r="4" fill="#D0956E" />
            </g>

            {/* ── Neck ── */}
            <rect x="36" y="20" width="8" height="16" rx="4" fill="#D0956E" />

            {/* ── Head ── */}
            <ellipse cx="40" cy="17" rx="16" ry="17" fill="#D8A07A" />

            {/* ── Ears ── */}
            <ellipse cx="24" cy="20" rx="3.5" ry="4.5" fill="#D0956E" />
            <ellipse cx="24.5" cy="20" rx="1.5" ry="2" fill="#C08A65" />
            <ellipse cx="56" cy="20" rx="3.5" ry="4.5" fill="#D0956E" />
            <ellipse cx="55.5" cy="20" rx="1.5" ry="2" fill="#C08A65" />

            {/* ── Stubble / beard area ── */}
            <ellipse cx="40" cy="26" rx="10" ry="7" fill="rgba(60,45,35,0.08)" />
            {/* Fine stubble lines */}
            <g stroke="#8B7060" strokeWidth="0.3" opacity="0.3">
              <line x1="32" y1="24" x2="32" y2="26" />
              <line x1="34" y1="25" x2="34" y2="28" />
              <line x1="36" y1="25" x2="36" y2="29" />
              <line x1="38" y1="26" x2="38" y2="30" />
              <line x1="40" y1="26" x2="40" y2="30" />
              <line x1="42" y1="26" x2="42" y2="30" />
              <line x1="44" y1="25" x2="44" y2="29" />
              <line x1="46" y1="25" x2="46" y2="28" />
              <line x1="48" y1="24" x2="48" y2="26" />
            </g>

            {/* ── Curly black hair ── */}
            <path d="M24 14 C24 3 30 -1 40 -1 C50 -1 56 3 56 14 Q58 10 59 12 Q60 14 57 15 L56 16 Q56 12 52 8 Q48 5 40 5 Q32 5 28 8 Q24 12 24 16 L23 15 Q20 14 21 12 Q22 10 24 14Z" fill="#1A1A1A" />
            {/* Hair tufts — messy curls on top */}
            <path d="M30 1 Q32 -3 35 0" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M36 -0.5 Q38 -4 41 -1" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M42 0 Q44 -3 46 0.5" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M33 0.5 Q35 -2 38 0" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* ── Cheek blush ── */}
            <ellipse cx="27" cy="22" rx="3.5" ry="2" fill="rgba(200,120,90,0.2)" />
            <ellipse cx="53" cy="22" rx="3.5" ry="2" fill="rgba(200,120,90,0.2)" />

            {/* ── Face ── */}
            <g className="agent-b-face">
              {/* ── Eyebrows — thick, expressive ── */}
              <path d="M30 9 Q33 7 36 8.5" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M44 8.5 Q47 7 50 9" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />

              {/* ── Big white eyes ── */}
              <g className="agent-b-eyes">
                <ellipse cx="33" cy="15" rx="5.5" ry="6" fill="white" stroke="#1A1A1A" strokeWidth="0.5" />
                <ellipse cx="47" cy="15" rx="5.5" ry="6" fill="white" stroke="#1A1A1A" strokeWidth="0.5" />
                {/* Pupils — small, toward center */}
                <circle cx="35" cy="15.5" r="2.2" fill="#1A1A1A" />
                <circle cx="45" cy="15.5" r="2.2" fill="#1A1A1A" />
                {/* Glint */}
                <circle cx="36" cy="14.5" r="0.8" fill="white" />
                <circle cx="46" cy="14.5" r="0.8" fill="white" />
              </g>

              {/* ── Nose — small subtle line ── */}
              <path d="M39 19 Q40 21 41.5 19.5" stroke="#C08A65" strokeWidth="0.8" fill="none" strokeLinecap="round" />

              {/* ── Smile — warm, slight smirk ── */}
              <path d="M35 24.5 Q40 27.5 45 24.5" stroke="#4A3028" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>

            {/* ── Thinking dots ── */}
            <g className="agent-img-think">
              <circle cx="62" cy="6" r="2" className="agent-img-dot agent-img-dot--1" />
              <circle cx="66" cy="1" r="2.5" className="agent-img-dot agent-img-dot--2" />
              <circle cx="71" cy="-4" r="3" className="agent-img-dot agent-img-dot--3" />
            </g>

            {/* ── Zzz ── */}
            <g className="agent-img-zzz">
              <text x="58" y="8" className="agent-img-z agent-img-z--1">z</text>
              <text x="62" y="2" className="agent-img-z agent-img-z--2">z</text>
              <text x="66" y="-4" className="agent-img-z agent-img-z--3">Z</text>
            </g>
          </svg>

          {/* Shadow under character */}
          <div className="agent-img-shadow" />
        </div>
      </button>
    </div>
  )
}
