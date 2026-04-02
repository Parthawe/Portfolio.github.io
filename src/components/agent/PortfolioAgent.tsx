import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react'
import AgentCharacter from './AgentCharacter'
import { useAgentBehavior } from '../../hooks/useAgentBehavior'
import { useAgentMovement } from '../../hooks/useAgentMovement'
import { useTypewriter } from '../../hooks/useTypewriter'
import { getGreeting, extractTarget, sendMessage, getChips, createChatHistory, type ChatHistory } from '../../services/agentAI'
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

/* ── Typed speech bubble ─────────────────────────────── */

function TypedBubble({ text, onDone }: { text: string; onDone: () => void }) {
  const { displayed, isTyping } = useTypewriter({ text, speed: 50 })

  useEffect(() => {
    if (!isTyping) onDone()
  }, [isTyping, onDone])

  return (
    <>
      {displayed}
      {isTyping && <span className="agent-typing-cursor">|</span>}
    </>
  )
}

export default function PortfolioAgent() {
  const { state, entered, dockVisible, dragging, didDrag, wrapRef, setAgentState, wake, route } = useAgentBehavior()
  const [chatOpen, setChatOpen] = useState(false)
  const [chatLoaded, setChatLoaded] = useState(false)
  const [speechText, setSpeechText] = useState<string | null>(null)
  const [speechTyping, setSpeechTyping] = useState(false)
  const [facingLeft, setFacingLeft] = useState(false)
  const speechTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const shownRoutes = useRef(new Set<string>())
  const historyRef = useRef<ChatHistory>(createChatHistory(route))

  const showChar = entered && dockVisible

  // Movement hook
  const movement = useAgentMovement(wrapRef, useCallback((s: 'walking' | 'pointing' | 'idle') => {
    setAgentState(s as AgentState)
  }, [setAgentState]))

  // Update facing direction from movement
  useEffect(() => {
    setFacingLeft(movement.facingLeft)
  }, [movement.facingLeft])

  // Proactive speech bubble — once per route
  useEffect(() => {
    if (chatOpen || !entered || shownRoutes.current.has(route)) return
    speechTimer.current = setTimeout(() => {
      const comment = getProactiveComment(route)
      if (comment) {
        shownRoutes.current.add(route)
        showSpeech(comment, 4000)
      }
    }, route === '/' ? 4000 : 2500)
    return () => { if (speechTimer.current) clearTimeout(speechTimer.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, chatOpen, entered])

  useEffect(() => { if (chatOpen) setSpeechText(null) }, [chatOpen])

  useEffect(() => {
    if (!dockVisible && chatOpen) setChatOpen(false)
  }, [dockVisible, chatOpen])

  // Show a speech bubble with auto-dismiss
  const showSpeech = useCallback((text: string, duration?: number) => {
    if (speechTimer.current) clearTimeout(speechTimer.current)
    setSpeechText(text)
    setSpeechTyping(true)
    setAgentState('talking')

    const wordCount = text.split(/\s+/).length
    const autoDismiss = duration || Math.max(5000, wordCount * 350)

    speechTimer.current = setTimeout(() => {
      setSpeechText(null)
      setSpeechTyping(false)
    }, autoDismiss)
  }, [setAgentState])

  // Handle speech bubble typing done
  const handleSpeechDone = useCallback(() => {
    setSpeechTyping(false)
    // Only go idle if not pointing at something
    if (state === 'talking') setAgentState('idle')
  }, [state, setAgentState])

  // Handle quick response via speech bubble (when chat is closed)
  const handleBubbleResponse = useCallback(async (question: string) => {
    historyRef.current.route = route
    const response = await sendMessage(question, historyRef.current)

    // Show in speech bubble (truncate if long)
    const firstSentence = response.split(/[.!?]\s/)[0] + '.'
    const isShort = response.length < 140
    const bubbleText = isShort ? response.replace(/\n/g, ' ') : firstSentence.replace(/\n/g, ' ')

    showSpeech(bubbleText)

    // Try to walk to the target mentioned in the response
    const target = extractTarget(response)
    if (target && window.innerWidth > 768) {
      setTimeout(() => movement.walkTo(target), 300)
    }
  }, [route, showSpeech, movement])

  const handleClick = useCallback(() => {
    if (didDrag.current) return

    if (state === 'sleeping') wake()
    setSpeechText(null)

    // If there's no chat loaded yet and on homepage, respond via bubble first
    if (!chatLoaded && route === '/') {
      handleBubbleResponse('Best projects')
      if (!chatLoaded) setChatLoaded(true)
      return
    }

    if (!chatLoaded) setChatLoaded(true)
    setChatOpen(prev => !prev)
  }, [state, chatLoaded, wake, didDrag, route, handleBubbleResponse])

  // Tap speech bubble → open chat
  const handleBubbleClick = useCallback(() => {
    if (!chatLoaded) setChatLoaded(true)
    setChatOpen(true)
    setSpeechText(null)
  }, [chatLoaded])

  const handleClose = useCallback(() => {
    setChatOpen(false)
    setAgentState('idle')
    movement.cancel()
  }, [setAgentState, movement])

  const handleAgentState = useCallback((s: 'thinking' | 'talking' | 'idle') => {
    setAgentState(s as AgentState)
  }, [setAgentState])

  return (
    <div
      ref={wrapRef}
      className={`agent-root ${showChar ? 'agent-root--in' : 'agent-root--out'} ${dragging ? 'agent-root--dragging' : ''}`}
    >
      <AgentCharacter
        state={chatOpen ? (state === 'idle' ? 'idle' : state) : state}
        onClick={handleClick}
        speechBubble={null}
        chatOpen={chatOpen}
        facingLeft={facingLeft}
      />

      {/* Speech bubble — above character, typed word-by-word */}
      {speechText && !chatOpen && (
        <div className="agent-speech" onClick={handleBubbleClick} role="status">
          {speechTyping ? (
            <TypedBubble text={speechText} onDone={handleSpeechDone} />
          ) : (
            speechText
          )}
        </div>
      )}

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
