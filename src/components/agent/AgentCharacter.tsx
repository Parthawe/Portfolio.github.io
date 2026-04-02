export type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'waving' | 'sleeping'

interface Props {
  state: AgentState
  onClick: () => void
  speechBubble?: string | null
  chatOpen?: boolean
}

export default function AgentCharacter({ state, onClick, speechBubble, chatOpen }: Props) {
  const isActive = state === 'thinking' || state === 'talking'

  return (
    <div className="relative flex-shrink-0">
      {/* Speech bubble */}
      {speechBubble && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--ink-08)] shadow-sm font-[var(--sans)] text-[11px] font-medium text-[var(--ink-70)] whitespace-nowrap animate-[bubble-in_0.3s_var(--ease-spring)] pointer-events-none">
          {speechBubble}
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={onClick}
        type="button"
        aria-label="Chat with portfolio assistant"
        className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-[var(--ink-08)] bg-[var(--surface)] shadow-[var(--shadow-md)] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-lg)] hover:border-[var(--ink-15)] focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
      >
        {/* Pulse ring when active */}
        {isActive && (
          <span className="absolute inset-0 rounded-full border-2 border-[var(--ink-15)] animate-ping opacity-40" />
        )}

        {/* Icon — morphs between states */}
        <div className={`transition-transform duration-300 ${chatOpen ? 'rotate-0' : ''} ${state === 'sleeping' ? 'opacity-40' : 'opacity-100'}`}>
          {chatOpen ? (
            /* X close icon */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--ink-70)]">
              <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            /* Chat sparkle icon */
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[var(--ink-70)] group-hover:text-[var(--ink)] transition-colors">
              <path d="M9 1L9.87 5.36a2 2 0 0 0 1.77 1.77L16 8l-4.36.87a2 2 0 0 0-1.77 1.77L9 15l-.87-4.36a2 2 0 0 0-1.77-1.77L2 8l4.36-.87a2 2 0 0 0 1.77-1.77L9 1Z" fill="currentColor" />
              <path d="M14 12l.5 1.5L16 14l-1.5.5L14 16l-.5-1.5L12 14l1.5-.5L14 12Z" fill="currentColor" opacity="0.5" />
            </svg>
          )}
        </div>

        {/* Online indicator dot */}
        {!chatOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[var(--surface)]" />
        )}
      </button>
    </div>
  )
}
