import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react'
import AgentCharacter from './AgentCharacter'
import { useAgentBehavior } from '../../hooks/useAgentBehavior'
import { getGreeting } from '../../services/agentAI'
import type { AgentState } from './AgentCharacter'

const AgentChat = lazy(() => import('./AgentChat'))

function getProactiveComment(path: string): string | null {
  const slug = path.replace(/^\//, '')
  if (slug && slug !== 'work' && slug !== 'about' && slug !== 'graveyard') return 'Ask me about this project'
  if (path === '/about') return 'Want to know more?'
  if (path === '/work') return 'Which one interests you?'
  if (path === '/') return 'Ask me anything'
  return null
}

export default function PortfolioAgent() {
  const { state, entered, wrapRef, setAgentState, wake, route } = useAgentBehavior()
  const [chatOpen, setChatOpen] = useState(false)
  const [chatLoaded, setChatLoaded] = useState(false)
  const [speechBubble, setSpeechBubble] = useState<string | null>(null)
  const speechTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const shownRoutes = useRef(new Set<string>())

  useEffect(() => {
    if (chatOpen || !entered || shownRoutes.current.has(route)) return
    speechTimer.current = setTimeout(() => {
      const comment = getProactiveComment(route)
      if (comment) {
        shownRoutes.current.add(route)
        setSpeechBubble(comment)
        setTimeout(() => setSpeechBubble(null), 3500)
      }
    }, route === '/' ? 4000 : 2500)
    return () => { if (speechTimer.current) clearTimeout(speechTimer.current) }
  }, [route, chatOpen, entered])

  useEffect(() => { if (chatOpen) setSpeechBubble(null) }, [chatOpen])

  const handleClick = useCallback(() => {
    if (state === 'sleeping') wake()
    setSpeechBubble(null)
    if (!chatLoaded) setChatLoaded(true)
    setChatOpen(prev => !prev)
  }, [state, chatLoaded, wake])

  const handleClose = useCallback(() => {
    setChatOpen(false)
    setAgentState('idle')
  }, [setAgentState])

  const handleAgentState = useCallback((s: 'thinking' | 'talking' | 'idle') => {
    setAgentState(s as AgentState)
  }, [setAgentState])

  return (
    <div
      ref={wrapRef}
      className={`agent-root ${entered ? 'agent-root--in' : 'agent-root--out'}`}
    >
      <AgentCharacter
        state={chatOpen ? (state === 'idle' ? 'idle' : state) : state}
        onClick={handleClick}
        speechBubble={chatOpen ? null : speechBubble}
        chatOpen={chatOpen}
      />

      {chatLoaded && (
        <Suspense fallback={null}>
          <AgentChat
            open={chatOpen}
            onClose={handleClose}
            route={route}
            initialGreeting={getGreeting(route)}
            onAgentState={handleAgentState}
          />
        </Suspense>
      )}
    </div>
  )
}
