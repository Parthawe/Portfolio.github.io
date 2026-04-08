export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping' | 'pointing'

interface Props {
  state: AgentState
  onClick: () => void
  chatOpen?: boolean
}

export default function AgentCharacter({ state, onClick, chatOpen }: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={chatOpen ? 'Close chat' : 'Chat with Folio'}
      aria-expanded={chatOpen}
      className={`agent-trigger agent-trigger--${state} ${chatOpen ? 'agent-trigger--open' : ''}`}
    >
      <div className="agent-avatar">
        <svg className="agent-avatar-img" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {/* Head */}
          <circle cx="24" cy="16" r="10" fill="var(--ink)" opacity="0.85" />
          {/* Eyes */}
          <circle cx="21" cy="14.5" r="1.2" fill="var(--bg)" />
          <circle cx="27" cy="14.5" r="1.2" fill="var(--bg)" />
          {/* Body */}
          <path d="M16 26 C16 26, 14 44, 16 52 L20 52 L22 36 L24 52 L26 52 L28 36 L30 52 L32 52 C34 44, 32 26, 32 26 Z" fill="var(--ink)" opacity="0.8" />
          {/* Arms */}
          <path d="M16 28 C12 32, 10 38, 12 40" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M32 28 C36 32, 38 38, 36 40" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
        </svg>
        <div className="agent-avatar-shadow" />
      </div>
    </button>
  )
}
