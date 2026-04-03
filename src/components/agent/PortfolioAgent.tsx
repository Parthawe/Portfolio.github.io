import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react'
import AgentCharacter from './AgentCharacter'
import { useAgentBehavior } from '../../hooks/useAgentBehavior'
import { useAgentMovement } from '../../hooks/useAgentMovement'
import { useAgentWalk } from '../../hooks/useAgentWalk'
import { useTypewriter } from '../../hooks/useTypewriter'
import { getGreeting, getResponseAction, sendMessage, getChips, createChatHistory, type ChatHistory } from '../../services/agentAI'
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

/* ── Typed speech bubble with viewport-aware positioning ── */

function SpeechBubble({ text, typing, onDone, onClick, wrapRef }: {
  text: string
  typing: boolean
  onDone: () => void
  onClick: () => void
  wrapRef: React.RefObject<HTMLDivElement | null>
}) {
  const { displayed, isTyping } = useTypewriter({ text, speed: 50, enabled: typing })
  const bubbleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isTyping && typing) onDone()
  }, [isTyping, typing, onDone])

  // Position: above the character, clamped to viewport
  useEffect(() => {
    const el = bubbleRef.current
    const wrap = wrapRef.current
    if (!el || !wrap) return

    const reposition = () => {
      const charRect = wrap.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      const pad = 10

      // Let CSS handle max-width, just read the actual size
      const bubbleW = el.offsetWidth

      // Position: above character, horizontally centered on character
      let left = charRect.left + charRect.width / 2 - bubbleW / 2

      // Clamp so bubble stays fully inside viewport
      if (left < pad) left = pad
      if (left + bubbleW > vw - pad) left = vw - bubbleW - pad

      const bottom = vh - charRect.top + 4

      el.style.left = `${left}px`
      el.style.bottom = `${Math.max(10, Math.min(bottom, vh - 60))}px`
    }

    // Run positioning after layout
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(reposition) })
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2) }
  })

  return (
    <div ref={bubbleRef} className="agent-speech" onClick={onClick} role="status">
      {typing ? (
        <>
          {displayed}
          {isTyping && <span className="agent-typing-cursor">|</span>}
        </>
      ) : (
        text
      )}
    </div>
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

  // Movement hook (for walking to targets)
  const movement = useAgentMovement(wrapRef, useCallback((s: 'walking' | 'pointing' | 'idle') => {
    setAgentState(s as AgentState)
  }, [setAgentState]))

  // Patrol walk hook, character walks left-right when idle
  const walkEnabled = showChar && !chatOpen && !dragging && !movement.isMoving
  const walk = useAgentWalk(wrapRef, walkEnabled, useCallback((isWalking: boolean, facingRight: boolean) => {
    if (isWalking) {
      setAgentState('walking')
      setFacingLeft(!facingRight)
    } else {
      setAgentState('idle')
      setFacingLeft(!facingRight)
    }
  }, [setAgentState]))

  // Proactive speech bubble, once per route
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

    // Get the action before the response (what to do after)
    const action = getResponseAction(question)

    const response = await sendMessage(question, historyRef.current)

    // Show in speech bubble, keep it short
    let bubbleText = response.replace(/\n/g, ' ').replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    if (bubbleText.length > 80) bubbleText = bubbleText.slice(0, 77) + '...'

    showSpeech(bubbleText)

    // Execute action after a short delay
    setTimeout(() => {
      if (action.type === 'scroll' && action.element) {
        // Scroll the page to the project card
        action.element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // Briefly highlight it
        action.element.style.outline = '2px solid var(--ink-15)'
        action.element.style.outlineOffset = '4px'
        action.element.style.transition = 'outline-color 0.3s'
        setTimeout(() => {
          if (action.element) {
            action.element.style.outline = ''
            action.element.style.outlineOffset = ''
          }
        }, 2000)
      }
    }, 800)
  }, [route, showSpeech])

  const handleClick = useCallback(() => {
    if (didDrag.current) return

    if (state === 'sleeping') wake()
    walk.stop()
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

      {/* Speech bubble, positioned to stay in viewport */}
      {speechText && !chatOpen && (
        <SpeechBubble
          text={speechText}
          typing={speechTyping}
          onDone={handleSpeechDone}
          onClick={handleBubbleClick}
          wrapRef={wrapRef}
        />
      )}

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
