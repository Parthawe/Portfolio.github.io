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

  const [positioned, setPositioned] = useState(false)

  // Reposition on every render
  useEffect(() => {
    const el = bubbleRef.current
    const wrap = wrapRef.current
    if (!el || !wrap) return

    const reposition = () => {
      const charRect = wrap.getBoundingClientRect()
      const vw = window.innerWidth
      const pad = 20

      // Force a max width so it never exceeds viewport
      const maxW = Math.min(280, vw - pad * 2)
      el.style.maxWidth = `${maxW}px`

      // Read width AFTER setting max-width
      const bubbleW = el.offsetWidth

      // Anchor: character center X
      let left = charRect.left + charRect.width / 2 - bubbleW / 2

      // Clamp: keep fully inside viewport
      left = Math.max(pad, Math.min(left, vw - bubbleW - pad))

      // Bottom: just above the character
      const bottom = window.innerHeight - charRect.top + 8

      el.style.left = `${left}px`
      el.style.bottom = `${Math.max(40, bottom)}px`
      setPositioned(true)
    }

    // Double RAF to ensure layout is settled
    requestAnimationFrame(() => requestAnimationFrame(reposition))
  }) // no deps — runs every render

  return (
    <div ref={bubbleRef} className="agent-speech" onClick={onClick} role="status" style={{ visibility: positioned ? 'visible' : 'hidden' }}>
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

    // Show in speech bubble — keep it short
    let bubbleText = response.split(/[.!?]\s/)[0].replace(/\n/g, ' ').replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    if (bubbleText.length > 100) bubbleText = bubbleText.slice(0, 97) + '...'
    if (!bubbleText.endsWith('.') && !bubbleText.endsWith('...')) bubbleText += '.'

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

      {/* Speech bubble — positioned to stay in viewport */}
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
