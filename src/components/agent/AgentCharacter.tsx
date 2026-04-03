export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping' | 'pointing'

interface Props {
  state: AgentState
  onClick: () => void
  speechBubble?: string | null
  chatOpen?: boolean
  facingLeft?: boolean
}

/*
  Puppet character: body parts layered and animated independently.
  Each part has a CSS transform-origin at its joint pivot point.
  Walking = alternating leg swings + opposing arm swings + body bob.
*/

const P = '/Assets/Character/puppet-'

export default function AgentCharacter({ state, onClick, chatOpen, facingLeft }: Props) {
  return (
    <div className="agent-char-wrap">
      <button
        onClick={onClick}
        type="button"
        aria-label="Chat with Folio, portfolio guide"
        className={`agent-trigger agent-trigger--${state} ${chatOpen ? 'agent-trigger--open' : ''}`}
      >
        <div className={`puppet ${facingLeft ? 'puppet--flip' : ''}`}>
          {/* Shadow */}
          <div className="puppet-shadow" />

          {/* Back arm (behind torso) */}
          <img src={`${P}left-arm.png`} alt="" className="puppet-part puppet-arm puppet-arm--back" draggable={false} />

          {/* Back leg */}
          <img src={`${P}left-leg.png`} alt="" className="puppet-part puppet-leg puppet-leg--back" draggable={false} />

          {/* Torso */}
          <img src={`${P}torso.png`} alt="" className="puppet-part puppet-torso" draggable={false} />

          {/* Front leg */}
          <img src={`${P}right-leg.png`} alt="" className="puppet-part puppet-leg puppet-leg--front" draggable={false} />

          {/* Front arm (in front of torso) */}
          <img src={`${P}right-arm.png`} alt="" className="puppet-part puppet-arm puppet-arm--front" draggable={false} />

          {/* Head (topmost layer) */}
          <img src={`${P}head.png`} alt="Folio" className="puppet-part puppet-head" draggable={false} />

          {/* Thinking dots */}
          <div className="puppet-think">
            <span className="puppet-dot puppet-dot--1" />
            <span className="puppet-dot puppet-dot--2" />
            <span className="puppet-dot puppet-dot--3" />
          </div>

          {/* Zzz */}
          <div className="puppet-zzz">
            <span className="puppet-z puppet-z--1">z</span>
            <span className="puppet-z puppet-z--2">z</span>
            <span className="puppet-z puppet-z--3">Z</span>
          </div>
        </div>
      </button>
    </div>
  )
}
