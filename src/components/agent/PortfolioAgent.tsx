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

  // Project-specific comments
  const projectComments: Record<string, string> = {
    'mentra': 'This one is wild. An entire OS on a 640×400 screen.',
    'transfi': '$50M a month. Six countries. Ask me how.',
    'zentipay': 'The fee anxiety insight is the best part.',
    'clawed-chat': 'Every AI action gets a receipt. Smart.',
    'executivelens': '5.2 hours saved per week. No manual input.',
    'raahi': 'He rode the subway blindfolded for this.',
    'jugalbandi': 'Neural network you can hear think. Watch the performance.',
    'enigma': 'A neural network you can feel, not just see.',
    'oncall-lens': 'Built in 24 hours. Sentry to PR.',
    'ballah-code': 'AI isn\'t a sidebar here. It\'s everything.',
    'tedx': '1500 people. One brand system.',
    'revolving-stage': 'Kinetic installation. Handmade.',
    'keyboard-project': 'The keyboard deep dive.',
    'breakgen': 'ITP Thesis. AI-designed keyboards. Watch the presentation.',
    'enigma': '200 LEDs. One neural network. Watch it think.',
    'making-of-time': 'Three clocks, three relationships with time.',
    'uv-light': 'What you can\'t see matters. Blacklight installation.',
    'shuffle': 'Where does your time actually go? This game shows you.',
    'drowning': 'Abandoned greenhouse on a stage. $1800 budget.',
    'moniac-machine': 'Raise taxes. Watch spending collapse. Economics you feel.',
    'the-omakase': 'Two players, no instructions. The game teaches itself.',
    'vj-software': 'Parking as a design problem.',
    'code-for-build': 'Teaching kids to code with building blocks.',
    'typeface': 'Parth made this typeface. It\'s on this site.',
    'atps': 'ArtTown Podcast. 45 episodes about craft.',
    'crypto': 'Web3 exploration.',
  }
  if (projectComments[slug]) return projectComments[slug]

  // Category pages
  const catComments: Record<string, string> = {
    'ai': 'Five AI projects. Each solves trust differently.',
    'ux-design': 'Research-driven. Every decision has data.',
    'fintech': '$50M+ volume. Compliance as design.',
    'creative-tech': 'Code meets craft. NYU ITP vibes.',
    'installations': 'Physical + digital. Gallery-tested.',
    'brand-visual': 'Systems, not just logos.',
    'design-for-good': 'Accessibility isn\'t a feature.',
  }
  if (catComments[slug]) return catComments[slug]

  if (slug && slug !== 'work' && slug !== 'about' && slug !== 'graveyard') return 'I know the story behind this one.'
  if (path === '/about') return 'There\'s more here than the resume shows.'
  if (path === '/work') return 'Scroll through. I\'ll tell you the best ones.'
  if (path === '/') return 'Ask me anything.'
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
  const [side, setSide] = useState<'left' | 'right'>('right')

  useEffect(() => {
    if (!isTyping && typing) onDone()
  }, [isTyping, typing, onDone])

  // Detect which side of screen character is on, position bubble accordingly
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setSide(rect.left < window.innerWidth / 2 ? 'right' : 'left')
  }, [wrapRef, text])

  return (
    <div className={`agent-speech agent-speech--${side}`} onClick={onClick} role="status">
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

  // Walk patrol: only on non-homepage pages (walks on the nav bar)
  const isHome = route === '/'
  const walkEnabled = showChar && !chatOpen && !dragging && !movement.isMoving && !isHome
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
      {/* Character with speech bubble above */}
      <div className="agent-char-wrap">
        {/* Speech bubble, sits above character via CSS */}
        {speechText && !chatOpen && (
          <SpeechBubble
            text={speechText}
            typing={speechTyping}
            onDone={handleSpeechDone}
            onClick={handleBubbleClick}
            wrapRef={wrapRef}
          />
        )}

        <AgentCharacter
          state={chatOpen ? (state === 'idle' ? 'idle' : state) : state}
          onClick={handleClick}
          speechBubble={null}
          chatOpen={chatOpen}
          facingLeft={facingLeft}
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
