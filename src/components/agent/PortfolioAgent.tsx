import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react'
import AgentCharacter from './AgentCharacter'
import FigmaSelect from '../FigmaSelect'
import { useAgentBehavior } from '../../hooks/useAgentBehavior'
import { getGreeting } from '../../services/agentAI'
import type { AgentState } from './AgentCharacter'

const AgentChat = lazy(() => import('./AgentChat'))
const VoiceCall = lazy(() => import('./VoiceCall'))

const PLATFORM_TIPS = [
  'Click me — I know every project here.',
  "I'm Folio. Ask me anything.",
  'Try: "What\'s the best project?"',
  'I can give you a tour. Just ask.',
  'Pick any project. I know the real story.',
]

export default function PortfolioAgent() {
  const { state, entered, dockVisible, dragging, didDrag, wrapRef, setAgentState, wake, route } = useAgentBehavior()
  const [chatOpen, setChatOpen] = useState(false)
  const [chatLoaded, setChatLoaded] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  const [callLoaded, setCallLoaded] = useState(false)
  const [tipIdx, setTipIdx] = useState(0)
  const platformRef = useRef<HTMLDivElement>(null)

  const showChar = entered && dockVisible

  // Cycle tips
  useEffect(() => {
    if (chatOpen || callOpen) return
    const id = setInterval(() => setTipIdx(i => (i + 1) % PLATFORM_TIPS.length), 6000)
    return () => clearInterval(id)
  }, [chatOpen, callOpen])

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

  // Close chat + reset state when dock hides (footer)
  useEffect(() => {
    if (!dockVisible && (chatOpen || callOpen)) {
      setChatOpen(false)
      setCallOpen(false)
      setAgentState('idle')
    }
  }, [dockVisible, chatOpen, callOpen, setAgentState])

  return (
    <>
    {/* Platform bar — bottom of viewport, character walks on it */}
    <div className={`agent-platform ${showChar ? 'agent-platform--in' : 'agent-platform--out'}`} ref={platformRef}>
      <button className="agent-platform-tip figma-hover" onClick={handleClick} type="button" aria-label="Chat with Folio">
        <span className="agent-platform-dot" />
        <span className="agent-platform-text" key={tipIdx}>{PLATFORM_TIPS[tipIdx]}</span>
        <FigmaSelect />
      </button>
    </div>

    <div
      ref={wrapRef}
      className={`agent-root ${showChar ? 'agent-root--in' : 'agent-root--out'} ${dragging ? 'agent-root--dragging' : ''}`}
    >
      <div className="agent-char-wrap">
        <AgentCharacter
          state={state}
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
            onStartCall={() => {
              setChatOpen(false)
              if (!callLoaded) setCallLoaded(true)
              setCallOpen(true)
              document.body.classList.add('voice-call-open')
            }}
          />
        </Suspense>
      )}

      {callLoaded && (
        <Suspense fallback={null}>
          <VoiceCall
            open={callOpen}
            onClose={() => { setCallOpen(false); document.body.classList.remove('voice-call-open'); setAgentState('idle') }}
            route={route}
            onAgentState={handleAgentState}
          />
        </Suspense>
      )}
    </div>
    </>
  )
}
