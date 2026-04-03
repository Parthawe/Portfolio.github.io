import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendMessage, getChips, getGreeting, createChatHistory, type ChatHistory } from '../../services/agentAI'
import { useTypewriter } from '../../hooks/useTypewriter'

interface Message {
  id: number
  content: ReactNode
  sender: 'agent' | 'user'
  raw?: string
  typing?: boolean
}

interface Props {
  open: boolean
  onClose: () => void
  route: string
  initialGreeting: string
  onAgentState: (state: 'thinking' | 'talking' | 'idle') => void
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
            <button key={key++} className="inline text-[var(--ink)] underline decoration-[var(--ink-15)] underline-offset-2 hover:decoration-[var(--ink)] transition-colors cursor-pointer bg-transparent border-none font-inherit p-0" onClick={() => onNavigate(href)} type="button">{label}</button>
          ) : (
            <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="inline text-[var(--ink)] underline decoration-[var(--ink-15)] underline-offset-2 hover:decoration-[var(--ink)] transition-colors">{label}</a>
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

function TypewriterMessage({ text, onNavigate, onDone }: { text: string; onNavigate: (path: string) => void; onDone: () => void }) {
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

export default function AgentChat({ open, onClose, route, initialGreeting, onAgentState }: Props) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [chips, setChips] = useState<string[]>([])
  const messagesRef = useRef<HTMLDivElement>(null)
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
      setMessages([{ id: ++idCounter.current, content: greeting, sender: 'agent', raw: greeting, typing: true }])
      setChips(getChips(route, 0))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, route])

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 150) }, [open])

  useEffect(() => {
    const el = messagesRef.current
    if (el) requestAnimationFrame(() => { el.scrollTop = el.scrollHeight })
  }, [messages, thinking, streaming])

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
    setMessages(prev => [...prev, { id: ++idCounter.current, content: t, sender: 'user' }])
    setInput('')
    setThinking(true)
    onAgentState('thinking')
    questionCount.current++
    const sid = ++idCounter.current
    try {
      setMessages(prev => [...prev, { id: sid, content: '', sender: 'agent', raw: '', typing: true }])
      setThinking(false)
      setStreaming(true)
      onAgentState('talking')
      const final = await sendMessage(t, historyRef.current, (pt) => {
        setMessages(prev => prev.map(m => m.id === sid ? { ...m, raw: pt, typing: true } : m))
      })
      setMessages(prev => prev.map(m => m.id === sid ? { ...m, raw: final, typing: true } : m))
      setChips(getChips(route, questionCount.current))
    } catch {
      setMessages(prev => prev.map(m => m.id === sid ? { ...m, content: 'Something went wrong.', raw: '', typing: false } : m))
      onAgentState('idle')
    } finally { setStreaming(false) }
  }, [thinking, streaming, onAgentState, route])

  const anyTyping = messages.some(m => m.typing)

  return (
    <div className={`agent-chat ${open ? 'agent-chat--open' : ''}`} role="dialog" aria-label="Chat with Folio" aria-hidden={!open}>
      {/* Header */}
      <div className="agent-chat-header">
        <div className="agent-chat-header-left">
          <div className="agent-chat-avatar">
            <img src="/Assets/Character/folio-half.png" alt="" />
          </div>
          <div>
            <span className="agent-chat-name">Folio</span>
            <span className="agent-chat-status"><span className="agent-chat-online" />Portfolio guide</span>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close" type="button" className="agent-chat-close-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="agent-chat-body" aria-live="polite">
        {messages.map(msg => (
          <div key={msg.id} className={`agent-msg-row ${msg.sender === 'user' ? 'agent-msg-row--user' : ''}`}>
            <div className={`agent-msg ${msg.sender === 'user' ? 'agent-msg--user' : 'agent-msg--agent'}`}>
              {msg.sender === 'agent' && msg.raw && msg.typing ? (
                <TypewriterMessage text={msg.raw} onNavigate={handleNav} onDone={() => markDone(msg.id)} />
              ) : msg.sender === 'agent' && msg.raw ? (
                <RichText text={msg.raw} onNavigate={handleNav} />
              ) : msg.content}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="agent-msg-row">
            <div className="agent-msg agent-msg--agent agent-msg--dots"><span /><span /><span /></div>
          </div>
        )}
      </div>

      {/* Chips */}
      {chips.length > 0 && !thinking && !anyTyping && (
        <div className="agent-chips">
          {chips.map(c => <button key={c} onClick={() => handleSend(c)} type="button" className="agent-chip">{c}</button>)}
        </div>
      )}

      {/* Input */}
      <form onSubmit={e => { e.preventDefault(); handleSend(input) }} className="agent-chat-input-area">
        <input ref={inputRef} type="text" placeholder="Ask me anything..." value={input} onChange={e => setInput(e.target.value)} autoComplete="off" disabled={thinking || streaming} className="agent-chat-input" />
        <button type="submit" disabled={!input.trim() || thinking || streaming} className="agent-chat-send">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.5 8H13.5M9 3.5L13.5 8L9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </form>
    </div>
  )
}
