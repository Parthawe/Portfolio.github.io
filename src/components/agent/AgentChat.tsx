import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendMessage, getChips, getGreeting, createChatHistory, type ChatHistory } from '../../services/agentAI'
import { useTypewriter } from '../../hooks/useTypewriter'

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
}

/* ── Rich text ───────────────────────────────────────── */

function RichText({ text, onNavigate }: { text: string; onNavigate: (path: string) => void }) {
  const parts: ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
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

/* ── Typewriter bubble ───────────────────────────────── */

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

/* ── Floating chat, no container ─────────────────────── */

export default function AgentChat({ open, onClose, route, initialGreeting, onAgentState, charRef }: Props) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [chips, setChips] = useState<string[]>([])
  const wrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const idCounter = useRef(0)
  const historyRef = useRef<ChatHistory>(createChatHistory(route))
  const initializedRoute = useRef('')
  const questionCount = useRef(0)

  useEffect(() => { historyRef.current.route = route }, [route])

  useEffect(() => {
    if (open && initializedRoute.current !== route) {
      initializedRoute.current = route
      historyRef.current = createChatHistory(route)
      questionCount.current = 0
      const greeting = getGreeting(route)
      setMessages([{ id: ++idCounter.current, sender: 'agent', raw: greeting, typing: true }])
      setChips(getChips(route, 0))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, route])

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 200) }, [open])

  // Keep bubble stack positioned above character
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

      // Horizontal: center on character, clamp to viewport
      let left = r.left + r.width / 2 - elW / 2
      left = Math.max(8, Math.min(left, vw - elW - 8))

      // Vertical: above character, but never off-screen top or overlapping bottom nav
      let bottom = vh - r.top + 4
      // Don't let it go above viewport
      if (vh - bottom < elH + 10) bottom = vh - elH - 10
      // Don't let it go below 80px (above bottom navs)
      bottom = Math.max(80, bottom)

      el.style.left = `${left}px`
      el.style.bottom = `${bottom}px`
    }

    reposition()
    const raf = requestAnimationFrame(reposition)
    window.addEventListener('resize', reposition, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', reposition) }
  }, [open, charRef, messages])

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

  const handleSend = useCallback(async (text: string) => {
    const t = text.trim()
    if (!t || thinking || streaming) return
    setMessages(prev => [...prev, { id: ++idCounter.current, sender: 'user', raw: t }])
    setInput('')
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
      setChips(getChips(route, questionCount.current))
    } catch {
      setMessages(prev => prev.map(m => m.id === sid ? { ...m, raw: 'Something went wrong.', typing: false } : m))
      onAgentState('idle')
    } finally { setStreaming(false) }
  }, [thinking, streaming, onAgentState, route])

  const anyTyping = messages.some(m => m.typing)

  // Only show last 3 messages to keep it clean
  const visible = messages.slice(-3)

  if (!open) return null

  return (
    <div ref={wrapRef} className="agent-floating" aria-label="Chat with Folio">

      {/* Close button */}
      <button onClick={onClose} type="button" className="agent-float-close" aria-label="Close">
        <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>

      {/* Message bubbles, floating freely */}
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

      {/* Chips */}
      {chips.length > 0 && !thinking && !anyTyping && (
        <div className="agent-float-chips">
          {chips.map(c => <button key={c} onClick={() => handleSend(c)} type="button" className="agent-float-chip">{c}</button>)}
        </div>
      )}

      {/* Input */}
      <form onSubmit={e => { e.preventDefault(); handleSend(input) }} className="agent-float-input">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
          autoComplete="off"
          disabled={thinking || streaming}
        />
        <button type="submit" disabled={!input.trim() || thinking || streaming} className="agent-float-send">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2.5 8H13.5M9 3.5L13.5 8L9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </form>
    </div>
  )
}
