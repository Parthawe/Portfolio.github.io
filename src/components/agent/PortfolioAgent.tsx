import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react'
import AgentCharacter from './AgentCharacter'
import { useAgentBehavior } from '../../hooks/useAgentBehavior'
import { getGreeting } from '../../services/agentAI'
import type { AgentState } from './AgentCharacter'

const AgentChat = lazy(() => import('./AgentChat'))

export default function PortfolioAgent() {
  const { state, entered, dockVisible, dragging, didDrag, wrapRef, setAgentState, wake, route } = useAgentBehavior()
  const [chatOpen, setChatOpen] = useState(false)
  const [chatLoaded, setChatLoaded] = useState(false)

  const showChar = entered && dockVisible

  // ── Click: toggle chat ──────────────────────────────
  const handleClick = useCallback(() => {
    if (didDrag.current) return
    if (state === 'sleeping') wake()

    if (!chatLoaded) setChatLoaded(true)
    setChatOpen(prev => !prev)
  }, [state, chatLoaded, wake, didDrag])

  // ── Close chat ──────────────────────────────────────
  const handleClose = useCallback(() => {
    setChatOpen(false)
    setAgentState('idle')
  }, [setAgentState])

  // ── Chat state bridge ───────────────────────────────
  const handleAgentState = useCallback((s: 'thinking' | 'talking' | 'idle') => {
    setAgentState(s as AgentState)
  }, [setAgentState])

  // Close chat when dock hides (footer)
  useEffect(() => {
    if (!dockVisible && chatOpen) setChatOpen(false)
  }, [dockVisible, chatOpen])

  return (
    <div
      ref={wrapRef}
      className={`agent-root ${showChar ? 'agent-root--in' : 'agent-root--out'} ${dragging ? 'agent-root--dragging' : ''}`}
    >
      <div className="agent-char-wrap">
        <AgentCharacter
          state={chatOpen ? (state === 'idle' ? 'idle' : state) : state}
          onClick={handleClick}
          chatOpen={chatOpen}
        />
      </div>

      {chatLoaded && (
        <Suspense fallback={null}>
          <AgentChat
            open={chatOpen}
            onClose={handleClose}
            route={route}
            initialGreeting={getGreeting(route)}
            onAgentState={handleAgentState}
            charRef={wrapRef}
          />
        </Suspense>
      )}
    </div>
  )
}
