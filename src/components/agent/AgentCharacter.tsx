export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping' | 'pointing'

interface Props {
  state: AgentState
  onClick: () => void
  speechBubble?: string | null
  chatOpen?: boolean
  facingLeft?: boolean
}

/*
  "Folio" — Parth's illustrated avatar.
  Curly black hair, warm skin, stubble beard, big expressive white eyes
  with black pupils, oversized black crewneck sweatshirt.
  Cartoon style matching the reference illustration.
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
          <ellipse cx="32" cy="117" rx="18" ry="3" className="agent-b-shadow" />

          {/* ── Left leg ── */}
          <g className="agent-leg agent-leg--l">
            <path d="M22 82C22 82 21 95 21 100Q21 102 23 102L28 102Q30 102 29.5 100C29 95 28 82 28 82Z" className="agent-b-pants" />
            <path d="M19 100L19 108Q19 112 22 112L30 112Q33 112 33 109L32 100Z" className="agent-b-shoe" />
            <path d="M18 110L18 112Q18 114 20 114L32 114Q34 114 34 112L34 110Q29 111 25 111Q21 111 18 110Z" className="agent-b-sole" />
          </g>

          {/* ── Right leg ── */}
          <g className="agent-leg agent-leg--r">
            <path d="M35 82C35 82 34 95 34 100Q34 102 36 102L41 102Q43 102 42.5 100C42 95 41 82 41 82Z" className="agent-b-pants" />
            <path d="M31 100L31 108Q31 112 34 112L42 112Q45 112 45 109L46 100Z" className="agent-b-shoe" />
            <path d="M30 110L30 112Q30 114 32 114L44 114Q46 114 46 112L46 110Q41 111 38 111Q34 111 30 110Z" className="agent-b-sole" />
          </g>

          {/* ── Sweatshirt body — oversized black crewneck ── */}
          {/* Shadow layer behind */}
          <path d="M11 38Q11 34 15 32L27 30Q32 29.5 37 30L49 32Q53 34 53 38L53 80Q53 83 49 84L15 84Q11 83 11 80Z" className="agent-b-sweat-shadow" />

          {/* Main sweatshirt */}
          <path d="M9 40Q9 35 14 33L28 30Q32 29 36 30L50 33Q55 35 55 40L55 82Q55 85 51 85L13 85Q9 85 9 82Z" className="agent-b-sweat" />

          {/* Crew neckline */}
          <path d="M25 30Q28 33 32 33.5Q36 33 39 30" className="agent-b-neckline" />

          {/* Sleeve seam hints */}
          <path d="M14 36Q12 48 11 55" className="agent-b-seam-line" />
          <path d="M50 36Q52 48 53 55" className="agent-b-seam-line" />

          {/* ── Left arm ── */}
          <g className="agent-arm agent-arm--l">
            <path d="M4 39Q2 36 4 34L10 32Q13 33 12 38L10 72Q10 75 8 75L6 75Q4 75 4 72Z" className="agent-b-sleeve" />
            <circle cx="7" cy="76.5" r="3.5" className="agent-b-hand" />
          </g>

          {/* ── Right arm ── */}
          <g className="agent-arm agent-arm--r">
            <path d="M52 38Q54 33 56 33L60 35Q62 37 60 39L58 72Q58 75 56 75L54 75Q52 75 52 72Z" className="agent-b-sleeve" />
            <circle cx="57" cy="76.5" r="3.5" className="agent-b-hand" />
          </g>

          {/* ── Neck ── */}
          <rect x="29" y="18" width="6" height="14" rx="3" className="agent-b-neck" />

          {/* ── Head ── */}
          <ellipse cx="32" cy="14" rx="12" ry="13" className="agent-b-head" />

          {/* ── Ears ── */}
          <ellipse cx="20" cy="16" rx="2.5" ry="3" className="agent-b-ear" />
          <ellipse cx="44" cy="16" rx="2.5" ry="3" className="agent-b-ear" />

          {/* ── Curly black hair — messy, voluminous ── */}
          <path d="M20 11C20 3 24 0 32 0C40 0 44 3 44 11Q45 8 46 9Q47 10 45 12L44 13Q44 11 42 9Q40 6 36 5Q32 4.5 28 5Q24 6 22 9Q20 11 20 13L19 12Q17 10 18 9Q19 8 20 11Z" className="agent-b-hair" />
          {/* Hair tufts on top */}
          <path d="M26 2Q28 -1 30 1" className="agent-b-hair-tuft" />
          <path d="M33 1Q35 -2 37 0.5" className="agent-b-hair-tuft" />
          <path d="M30 0.5Q32 -1.5 34 0.5" className="agent-b-hair-tuft" />

          {/* ── Eyebrows ── */}
          <path d="M24 9.5Q26 8 28.5 9" className="agent-b-brow" />
          <path d="M35.5 9Q38 8 40 9.5" className="agent-b-brow" />

          {/* ── Face ── */}
          <g className="agent-b-face">
            {/* Big white eyes */}
            <g className="agent-b-eyes">
              <ellipse cx="26.5" cy="13" rx="4" ry="4.5" className="agent-b-eye-white" />
              <ellipse cx="37.5" cy="13" rx="4" ry="4.5" className="agent-b-eye-white" />
              {/* Pupils */}
              <circle cx="27.5" cy="13.5" r="2" className="agent-b-pupil" />
              <circle cx="38.5" cy="13.5" r="2" className="agent-b-pupil" />
              {/* Glints */}
              <circle cx="28.5" cy="12.5" r="0.7" className="agent-b-glint" />
              <circle cx="39.5" cy="12.5" r="0.7" className="agent-b-glint" />
            </g>

            {/* Nose — subtle small bump */}
            <path d="M31.5 16.5Q32 18 33 16.5" className="agent-b-nose" />

            {/* Stubble area — subtle texture */}
            <ellipse cx="32" cy="21" rx="7" ry="4.5" className="agent-b-stubble" />

            {/* Smile */}
            <path d="M28 20.5Q32 23 36 20.5" className="agent-b-mouth" />

            {/* Cheek blush */}
            <ellipse cx="22" cy="17" rx="2.5" ry="1.5" className="agent-b-blush" />
            <ellipse cx="42" cy="17" rx="2.5" ry="1.5" className="agent-b-blush" />
          </g>

          {/* ── Thinking dots ── */}
          <g className="agent-b-think">
            <circle cx="50" cy="4" r="1.5" className="agent-b-dot agent-b-dot--1" />
            <circle cx="54" cy="0" r="2" className="agent-b-dot agent-b-dot--2" />
            <circle cx="58" cy="-4" r="2.5" className="agent-b-dot agent-b-dot--3" />
          </g>

          {/* ── Zzz ── */}
          <g className="agent-b-zzz">
            <text x="46" y="6" className="agent-b-z agent-b-z--1">z</text>
            <text x="50" y="1" className="agent-b-z agent-b-z--2">z</text>
            <text x="53" y="-4" className="agent-b-z agent-b-z--3">Z</text>
          </g>
        </svg>
      </button>
    </div>
  )
}
