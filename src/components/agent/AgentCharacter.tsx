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
  Uses the actual character illustration PNG instead of SVG paths.
  Animations applied via CSS transforms on the image container.
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
          <img
            src="/Assets/folio-character.png"
            alt="Folio — Parth's portfolio guide"
            className="agent-img"
            width="80"
            height="107"
            draggable={false}
          />
          {/* Shadow underneath */}
          <div className="agent-img-shadow" />

          {/* Thinking dots overlay */}
          <div className="agent-img-think">
            <span className="agent-img-dot agent-img-dot--1" />
            <span className="agent-img-dot agent-img-dot--2" />
            <span className="agent-img-dot agent-img-dot--3" />
          </div>

          {/* Zzz overlay */}
          <div className="agent-img-zzz">
            <span className="agent-img-z agent-img-z--1">z</span>
            <span className="agent-img-z agent-img-z--2">z</span>
            <span className="agent-img-z agent-img-z--3">Z</span>
          </div>
        </div>
      </button>
    </div>
  )
}
