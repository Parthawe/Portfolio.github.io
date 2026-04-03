export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping' | 'pointing'

interface Props {
  state: AgentState
  onClick: () => void
  speechBubble?: string | null
  chatOpen?: boolean
  facingLeft?: boolean
}

// Different poses for different states
const POSES = {
  standing: '/Assets/Character/folio-standing.png',
  walking:  '/Assets/Character/folio-walking.png',
  sitting:  '/Assets/Character/folio-sitting.png',
  half:     '/Assets/Character/folio-half.png',
}

function getPose(state: AgentState): string {
  switch (state) {
    case 'walking':  return POSES.walking
    case 'sleeping': return POSES.sitting
    default:         return POSES.standing
  }
}

export default function AgentCharacter({ state, onClick, chatOpen, facingLeft }: Props) {
  const pose = getPose(state)

  return (
    <div className="agent-char-wrap">
      <button
        onClick={onClick}
        type="button"
        aria-label="Chat with Folio, portfolio guide"
        className={`agent-trigger agent-trigger--${state} ${chatOpen ? 'agent-trigger--open' : ''}`}
      >
        <div className={`agent-img-wrap ${facingLeft ? 'agent-img--flip' : ''}`}>
          {/* Preload all poses */}
          <link rel="preload" as="image" href={POSES.standing} />
          <link rel="preload" as="image" href={POSES.walking} />
          <link rel="preload" as="image" href={POSES.sitting} />

          <img
            src={pose}
            alt="Folio"
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
