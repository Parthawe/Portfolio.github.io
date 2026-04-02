export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping' | 'pointing'

interface Props {
  state: AgentState
  onClick: () => void
  speechBubble?: string | null
  chatOpen?: boolean
  facingLeft?: boolean
}

const FULL_BODY = '/Assets/character/hf_20260402_220205_dbb6f39a-e7aa-4fd3-b85e-ac01901e91ec.png'

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
            src={FULL_BODY}
            alt="Folio — Parth's portfolio guide"
            className="agent-character-img"
            draggable={false}
          />

          <div className="agent-img-shadow" />

          {/* Thinking dots */}
          <div className="agent-img-think">
            <span className="agent-img-dot agent-img-dot--1" />
            <span className="agent-img-dot agent-img-dot--2" />
            <span className="agent-img-dot agent-img-dot--3" />
          </div>

          {/* Zzz */}
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
