import { useState, useCallback, useEffect, useRef, useMemo, lazy, Suspense } from 'react'
import AgentCharacter from './AgentCharacter'
import FigmaSelect from '../FigmaSelect'
import { useAgentBehavior } from '../../hooks/useAgentBehavior'
import { usePageTracking } from '../../hooks/usePageTracking'
import type { AgentState } from './AgentCharacter'

const AgentChat = lazy(() => import('./AgentChat'))
const PresentationBar = lazy(() => import('./PresentationBar'))

const PLATFORM_TIPS: Record<string, string[]> = {
  '/': [
    'Tour this page.',
    'Open Mentra.',
    'Start with three projects.',
    'Ask for the best research story.',
  ],
  '/work': [
    'Filter the archive.',
    'Show AI work.',
    'Open ZentiPay.',
    'Ask for the strongest three.',
  ],
  '/about': [
    'Tour this page.',
    'Ask about roles that fit.',
    'Open the Mentra story.',
    'Ask how design and code connect.',
  ],
}

function getPlatformTips(route: string) {
  return PLATFORM_TIPS[route] || [
    'Tour this page.',
    'Ask what matters here.',
    'Open the next project.',
    'Ask for the key decision.',
  ]
}

export default function PortfolioAgent() {
  const { state, entered, dockVisible, dragging, didDrag, wrapRef, setAgentState, wake, route } = useAgentBehavior()
  const pageTracking = usePageTracking(route)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatLoaded, setChatLoaded] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [presenting, setPresenting] = useState(false)
  const [tipIdx, setTipIdx] = useState(0)
  const platformRef = useRef<HTMLDivElement>(null)
  const tips = useMemo(() => getPlatformTips(route), [route])

  const showChar = entered && dockVisible

  // Cycle tips
  useEffect(() => {
    if (chatOpen) return
    const id = setInterval(() => setTipIdx(i => (i + 1) % tips.length), 6000)
    return () => clearInterval(id)
  }, [chatOpen, tips])

  useEffect(() => {
    setTipIdx(0)
  }, [route])

  // ── Click: toggle chat ──────────────────────────────
  const handleClick = useCallback(() => {
    if (didDrag.current) return
    if (state === 'sleeping') wake()

    // If minimized, restore (and exit presentation if active)
    if (minimized) {
      setMinimized(false)
      setPresenting(false)
      return
    }

    if (!chatLoaded) setChatLoaded(true)
    setChatOpen(prev => !prev)
  }, [state, chatLoaded, wake, didDrag, minimized])

  // ── Close chat (full close, clears conversation) ───
  const handleClose = useCallback(() => {
    setChatOpen(false)
    setMinimized(false)
    setPresenting(false)
    setAgentState('idle')
  }, [setAgentState])

  // ── Minimize chat (collapse to pill, preserve state) ──
  const handleMinimize = useCallback(() => {
    setMinimized(true)
  }, [])

  // ── Presentation mode ────────────────────────────────
  const handlePresent = useCallback(() => {
    setPresenting(true)
    setMinimized(true)
  }, [])

  const handleExitPresent = useCallback(() => {
    setPresenting(false)
  }, [])

  // ── Chat state bridge ───────────────────────────────
  const handleAgentState = useCallback((s: AgentState) => {
    setAgentState(s)
  }, [setAgentState])

  // Close chat + reset state when dock hides (footer)
  useEffect(() => {
    if (!dockVisible && chatOpen) {
      setChatOpen(false)
      setAgentState('idle')
    }
  }, [dockVisible, chatOpen, setAgentState])

  return (
    <>
    {/* Platform bar — bottom of viewport, character walks on it */}
    <div className={`agent-platform surface-glass ${showChar ? 'agent-platform--in' : 'agent-platform--out'}${minimized ? ' agent-platform--minimized' : ''}`} ref={platformRef}>
      <button
        className="agent-platform-tip figma-hover"
        onClick={handleClick}
        type="button"
        aria-label={minimized ? 'Resume chat' : 'Chat with Folio'}
        aria-haspopup="dialog"
        aria-expanded={chatOpen && !minimized}
      >
        <span className="agent-platform-dot" />
        <span className="agent-platform-text" key={minimized ? 'resume' : `${route}-${tipIdx}`}>
          {minimized ? 'Resume chat' : tips[tipIdx]}
        </span>
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
    </div>

    {chatLoaded && (
      <Suspense fallback={null}>
        <AgentChat
          open={chatOpen && !minimized}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onPresent={handlePresent}
          route={route}
          onAgentState={handleAgentState}
          pageTracking={pageTracking}
        />
      </Suspense>
    )}

    {presenting && (
      <Suspense fallback={null}>
        <PresentationBar route={route} onExit={handleExitPresent} />
      </Suspense>
    )}
    </>
  )
}
