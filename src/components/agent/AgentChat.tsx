import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendMessage, getChips, getGreeting, createChatHistory, getTourSteps, getResponseAction, type ChatHistory, type TourStep } from '../../services/agentAI'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useTTS } from '../../hooks/useTTS'
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'
import FigmaSelect from '../FigmaSelect'

interface Message {
  id: number
  sender: 'agent' | 'user'
  raw: string
  typing?: boolean
}

interface Props {
  open: boolean
  onClose: () => void
  route: string
  initialGreeting: string
  onAgentState: (state: 'thinking' | 'talking' | 'idle') => void
  charRef: React.RefObject<HTMLDivElement | null>
  onStartCall?: () => void
}

/* ── Rich text ───────────────────────────────────────── */

const RICHTEXT_REGEX = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g

function RichText({ text, onNavigate }: { text: string; onNavigate: (path: string) => void }) {
  const parts: ReactNode[] = []
  const regex = new RegExp(RICHTEXT_REGEX.source, RICHTEXT_REGEX.flags)
  let lastIdx = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) parts.push(text.slice(lastIdx, match.index))
    const seg = match[0]
    if (seg.startsWith('**')) {
      parts.push(<strong key={key++} className="font-semibold text-[var(--ink)]">{seg.slice(2, -2)}</strong>)
    } else if (seg.startsWith('[')) {
      const lm = seg.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (lm) {
        const [, label, href] = lm
        parts.push(
          href.startsWith('/') ? (
            <button key={key++} className="inline text-[var(--ink)] underline decoration-[var(--ink-15)] underline-offset-2 hover:decoration-[var(--ink)] cursor-pointer bg-transparent border-none font-inherit p-0" onClick={() => onNavigate(href)} type="button">{label}</button>
          ) : (
            <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="inline text-[var(--ink)] underline decoration-[var(--ink-15)] underline-offset-2 hover:decoration-[var(--ink)]">{label}</a>
          )
        )
      }
    }
    lastIdx = match.index + seg.length
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx))
  return <>{parts}</>
}

/* ── Typewriter ──────────────────────────────────────── */

function TypewriterBubble({ text, onNavigate, onDone }: { text: string; onNavigate: (path: string) => void; onDone: () => void }) {
  const { displayed, isTyping, skip } = useTypewriter({ text, speed: 40 })
  useEffect(() => { if (!isTyping) onDone() }, [isTyping, onDone])
  return (
    <span onClick={isTyping ? skip : undefined} className={isTyping ? 'cursor-pointer' : ''}>
      <RichText text={displayed} onNavigate={onNavigate} />
      {isTyping && <span className="agent-typing-cursor">|</span>}
    </span>
  )
}

/* ── Chat ────────────────────────────────────────────── */

export default function AgentChat({ open, onClose, route, initialGreeting: _greeting, onAgentState, charRef, onStartCall }: Props) {
  const navigate = useNavigate()
  const { speak, speakAsync, cancel: cancelSpeech, muted, speaking, toggleMute } = useTTS()
  const sendRef = useRef<(text: string) => void>(() => {})
  const { toggle: toggleMic, listening: micListening, supported: micSupported } = useSpeechRecognition(
    useCallback((transcript: string) => { sendRef.current(transcript) }, [])
  )
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [touring, setTouring] = useState(false)
  const [chips, setChips] = useState<string[]>([])
  const wrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const idCounter = useRef(0)
  const historyRef = useRef<ChatHistory>(createChatHistory(route))
  const initializedRoute = useRef('')
  const questionCount = useRef(0)
  const tourAbort = useRef(false)

  useEffect(() => {
    if (open && initializedRoute.current !== route) {
      initializedRoute.current = route
      historyRef.current = createChatHistory(route)
      historyRef.current.route = route
      questionCount.current = 0
      const greeting = getGreeting(route)
      setMessages([{ id: ++idCounter.current, sender: 'agent', raw: greeting, typing: true }])
      // Add tour and call chips as first options
      const baseChips = getChips(route, 0)
      setChips(['Start a call', 'Take me on a tour', ...baseChips.slice(0, 2)])
    }
  }, [open, route])

  // Cancel TTS and reset state when chat closes
  useEffect(() => {
    if (!open) {
      cancelSpeech()
      if (touring) { tourAbort.current = true; setTouring(false) }
      onAgentState('idle')
    } else {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open, cancelSpeech, onAgentState, touring])

  // Position floating chat above character — reposition ref for message-triggered updates
  const repositionRef = useRef<() => void>(() => {})

  // Set up resize listener ONCE when chat opens (not per message)
  useEffect(() => {
    const el = wrapRef.current
    const char = charRef.current
    if (!el || !char || !open) return

    const reposition = () => {
      const r = char.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      const elW = el.offsetWidth
      const elH = el.offsetHeight

      let left = r.left + r.width / 2 - elW / 2
      left = Math.max(8, Math.min(left, vw - elW - 8))

      let bottom = vh - r.top + 8
      if (vh - bottom < elH + 10) bottom = vh - elH - 10
      bottom = Math.max(80, bottom)

      el.style.left = `${left}px`
      el.style.bottom = `${bottom}px`
    }

    repositionRef.current = reposition
    reposition()
    window.addEventListener('resize', reposition, { passive: true })
    return () => { window.removeEventListener('resize', reposition) }
  }, [open, charRef])

  // Re-run position when messages change (but don't add new listeners)
  useEffect(() => {
    requestAnimationFrame(() => repositionRef.current())
  }, [messages])

  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  const handleNav = useCallback((p: string) => { navigate(p); onClose() }, [navigate, onClose])

  const markDone = useCallback((id: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, typing: false } : m))
    onAgentState('idle')
  }, [onAgentState])

  // ── Tour runner ──────────────────────────────────────
  const runTour = useCallback(async (steps: TourStep[]) => {
    setTouring(true)
    tourAbort.current = false
    onAgentState('talking')

    for (const step of steps) {
      if (tourAbort.current) break

      // Add message
      const sid = ++idCounter.current
      setMessages(prev => [...prev, { id: sid, sender: 'agent', raw: step.text, typing: true }])

      // Scroll to target if specified
      if (step.scrollTo) {
        const el = document.querySelector(step.scrollTo) as HTMLElement | null
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          // Brief highlight
          el.style.outline = '2px solid var(--st-accent, #E85D26)'
          el.style.outlineOffset = '4px'
          el.style.transition = 'outline 0.3s, outline-offset 0.3s'
          setTimeout(() => { el.style.outline = ''; el.style.outlineOffset = '' }, 3000)
        }
      }

      // Speak and wait for completion
      await speakAsync(step.text)

      // Small pause between steps
      if (!tourAbort.current) {
        await new Promise(r => setTimeout(r, step.delay || 800))
      }
    }

    setTouring(false)
    onAgentState('idle')

    if (!tourAbort.current) {
      const endMsg = "That's the full walkthrough. Ask me anything, or pick a project to explore next."
      const eid = ++idCounter.current
      setMessages(prev => [...prev, { id: eid, sender: 'agent', raw: endMsg, typing: true }])
      speak(endMsg)
      // Context-aware chips after tour — no more "Take me on a tour"
      const slug = route.replace(/^\//, '')
      if (slug && slug !== '' && slug !== 'work' && slug !== 'about') {
        setChips(['Key insight', 'What was the challenge?', 'Show me Mentra', 'Show me ZentiPay'])
      } else {
        setChips(['Show me Mentra', 'Show me TransFi', 'Show me Jugalbandi', 'Hire Parth'])
      }
    }
  }, [onAgentState, speakAsync, speak])

  const stopTour = useCallback(() => {
    tourAbort.current = true
    cancelSpeech()
    setTouring(false)
    onAgentState('idle')
    const sid = ++idCounter.current
    setMessages(prev => [...prev, { id: sid, sender: 'agent', raw: "Tour stopped. Feel free to ask me anything!", typing: true }])
  }, [cancelSpeech, onAgentState])

  // ── Send handler (with voice + tour + navigation) ───
  const handleSend = useCallback(async (text: string) => {
    const t = text.trim()
    if (!t || thinking || streaming) return

    // Stop tour if running
    if (touring) { stopTour(); return }

    setMessages(prev => [...prev, { id: ++idCounter.current, sender: 'user', raw: t }])
    setInput('')

    const lower = t.toLowerCase().replace(/[?.!]+$/, '').trim()

    // Check for voice call request
    if (lower === 'start a call' || lower === 'start call' || lower === 'call' || lower === 'voice call' || lower === 'talk to me') {
      if (onStartCall) { onStartCall(); return }
    }

    // Check for tour request
    if (lower === 'take me on a tour' || lower === 'give me a tour' || lower === 'tour' || lower === 'show me around') {
      const steps = getTourSteps(route)
      runTour(steps)
      return
    }

    // Check for "show me X" → navigate to project
    if (lower.startsWith('show me ') || lower.startsWith('take me to ')) {
      const action = getResponseAction(t)
      if (action.type === 'navigate' && action.slug) {
        const sid = ++idCounter.current
        const msg = `Taking you to ${action.slug}. I'll give you a tour there too.`
        setMessages(prev => [...prev, { id: sid, sender: 'agent', raw: msg, typing: true }])
        speak(msg)
        // Navigate after a beat
        setTimeout(() => {
          navigate(`/${action.slug}`)
          // Start tour on the new page after it loads
          setTimeout(() => {
            const projectSteps = getTourSteps(`/${action.slug}`)
            runTour(projectSteps)
          }, 1500)
        }, 1500)
        return
      }
      if (action.type === 'scroll' && action.element) {
        action.element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    // Regular message flow
    setThinking(true)
    onAgentState('thinking')
    questionCount.current++
    const sid = ++idCounter.current
    try {
      setMessages(prev => [...prev, { id: sid, sender: 'agent', raw: '', typing: true }])
      setThinking(false)
      setStreaming(true)
      onAgentState('talking')
      const final = await sendMessage(t, historyRef.current, (pt) => {
        setMessages(prev => prev.map(m => m.id === sid ? { ...m, raw: pt, typing: true } : m))
      })
      setMessages(prev => prev.map(m => m.id === sid ? { ...m, raw: final, typing: true } : m))
      setChips(getChips(route, questionCount.current, t))

      // Speak the response
      speak(final)
    } catch {
      setMessages(prev => prev.map(m => m.id === sid ? { ...m, raw: 'Something went wrong.', typing: false } : m))
      onAgentState('idle')
    } finally { setStreaming(false) }
  }, [thinking, streaming, touring, onAgentState, route, runTour, stopTour, speak, navigate])

  // Keep sendRef in sync for voice input callback
  sendRef.current = handleSend

  const anyTyping = messages.some(m => m.typing)
  const visible = messages.slice(-3)

  if (!open) return null

  return (
    <div ref={wrapRef} className="agent-floating" aria-label="Chat with Folio">
      <div className="agent-float-toolbar">
        {/* Mute/unmute voice */}
        <button onClick={toggleMute} type="button" className="agent-float-mute figma-hover" aria-label={muted ? 'Unmute voice' : 'Mute voice'} title={muted ? 'Unmute voice' : 'Mute voice'}>
          {muted ? (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 6v4h3l4 4V2L5 6H2z" fill="currentColor" /><line x1="12" y1="5" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" /><line x1="16" y1="5" x2="12" y2="9" stroke="currentColor" strokeWidth="1.5" /></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 6v4h3l4 4V2L5 6H2z" fill="currentColor" /><path d="M12 4.5c1.3 1.2 1.3 5.8 0 7M14 2.5c2.5 2.5 2.5 8.5 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" /></svg>
          )}
          <FigmaSelect />
        </button>
        {speaking && <span className="agent-float-speaking" />}
        {/* Stop tour */}
        {touring && (
          <button onClick={stopTour} type="button" className="agent-float-stop" title="Stop tour">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" rx="1.5" fill="currentColor" /></svg>
          </button>
        )}
        {/* Close */}
        <button onClick={touring ? stopTour : onClose} type="button" className="agent-float-close figma-hover" aria-label="Close">
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <FigmaSelect />
        </button>
      </div>

      <div className="agent-float-msgs">
        {visible.map(msg => (
          <div key={msg.id} className={`agent-float-bubble ${msg.sender === 'user' ? 'agent-float-bubble--user' : 'agent-float-bubble--agent'}`}>
            {msg.sender === 'agent' && msg.typing ? (
              <TypewriterBubble text={msg.raw} onNavigate={handleNav} onDone={() => markDone(msg.id)} />
            ) : (
              <RichText text={msg.raw} onNavigate={handleNav} />
            )}
          </div>
        ))}
        {thinking && (
          <div className="agent-float-bubble agent-float-bubble--agent agent-float-dots">
            <span /><span /><span />
          </div>
        )}
      </div>

      {chips.length > 0 && !thinking && !anyTyping && (
        <div className="agent-float-chips">
          {chips.map(c => <button key={c} onClick={() => handleSend(c)} type="button" className="agent-float-chip figma-hover">{c}<FigmaSelect /></button>)}
        </div>
      )}

      <form onSubmit={e => { e.preventDefault(); handleSend(input) }} className="agent-float-input">
        {micSupported && (
          <button type="button" onClick={toggleMic} className={`agent-float-mic ${micListening ? 'agent-float-mic--on' : ''}`} aria-label={micListening ? 'Stop listening' : 'Speak'} title="Voice input">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="1" width="6" height="9" rx="3" fill={micListening ? '#e55' : 'currentColor'} />
              <path d="M3 7v1a5 5 0 0010 0V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <input ref={inputRef} type="text" placeholder={micListening ? 'Listening...' : 'Ask me anything...'} value={input} onChange={e => setInput(e.target.value)} autoComplete="off" disabled={thinking || streaming || micListening} />
        <button type="submit" disabled={!input.trim() || thinking || streaming} className="agent-float-send figma-hover">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2.5 8H13.5M9 3.5L13.5 8L9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <FigmaSelect />
        </button>
      </form>
    </div>
  )
}
