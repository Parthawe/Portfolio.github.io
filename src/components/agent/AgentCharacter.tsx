export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping' | 'pointing'

interface Props {
  state: AgentState
  onClick: () => void
  chatOpen?: boolean
}

const CHARACTER = '/Assets/Character/folio-standing.png'

export default function AgentCharacter({ state, onClick, chatOpen }: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Chat with Folio"
      className={`agent-trigger agent-trigger--${state} ${chatOpen ? 'agent-trigger--open' : ''}`}
    >
      <div className="agent-avatar">
        <img src={CHARACTER} alt="Folio" className="agent-avatar-img" draggable={false} />
        <div className="agent-avatar-shadow" />
      </div>
    </button>
  )
}
