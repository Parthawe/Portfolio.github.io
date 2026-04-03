import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendMessage, getChips, getGreeting, createChatHistory, type ChatHistory } from '../../services/agentAI'
import { useTypewriter } from '../../hooks/useTypewriter'

interface Message {
  id: number
  content: ReactNode
  sender: 'agent' | 'user'
  raw?: string
  typing?: boolean  // true = typewriter active
}

interface Props {
  open: boolean
  onClose: () => void
  route: string
  initialGreeting: string
  onAgentState: (state: 'thinking' | 'talking' | 'idle') => void
}

/* ── Rich text renderer ──────────────────────────────── */

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
      parts.push(<strong key={key++} className="font-semibold">{seg.slice(2, -2)}</strong>)
    } else if (seg.startsWith('[')) {
      const linkMatch = seg.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (linkMatch) {
        const [, label, href] = linkMatch
        const isInternal = href.startsWith('/')
        parts.push(
          isInternal ? (
            <button key={key++} className="inline underline underline-offset-2 decoration-[var(--ink-30)] hover:decoration-[var(--ink)] transition-colors cursor-pointer bg-transparent border-none font-inherit p-0" onClick={() => onNavigate(href)} type="button">{label}</button>
          ) : (
            <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="inline underline underline-offset-2 decoration-[var(--ink-30)] hover:decoration-[var(--ink)] transition-colors">{label}</a>
          )
        )
      }
    }
    lastIdx = match.index + seg.length
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx))
  return <>{parts}</>
}

/* ── Typewriter message — types word-by-word ──────────── */

function TypewriterMessage({ text, onNavigate, onDone }: { text: string; onNavigate: (path: string) => void; onDone: () => void }) {
  const { displayed, isTyping, skip } = useTypewriter({ text, speed: 40 })

  useEffect(() => {
    if (!isTyping) onDone()
  }, [isTyping, onDone])

  return (
    <span onClick={isTyping ? skip : undefined} className={isTyping ? 'cursor-pointer' : ''}>
      <RichText text={displayed} onNavigate={onNavigate} />
      {isTyping && <span className="agent-typing-cursor">|</span>}
    </span>
  )
}

/* ── Mini Folio avatar for messages ──────────────────── */

function MiniAvatar() {
  return (
    <div className="w-5 h-5 rounded-full bg-[var(--ink-06)] flex-shrink-0 mb-0.5 overflow-hidden">
      <img src="/Assets/Character/hf_20260402_220117_5f47f762-e0b1-4f21-aaca-91672752f2c6.png" alt="" className="w-full h-full object-cover object-top" />
    </div>
  )
}

/* ── Main chat component ─────────────────────────────── */

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
      setMessages([{
        id: ++idCounter.current,
        content: greeting,
        sender: 'agent',
        raw: greeting,
        typing: true,
      }])
      setChips(getChips(route, 0))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, route])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  useEffect(() => {
    const el = messagesRef.current
    if (el) requestAnimationFrame(() => { el.scrollTop = el.scrollHeight })
  }, [messages, thinking, streaming])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const handleNav = useCallback((path: string) => {
    navigate(path)
    onClose()
  }, [navigate, onClose])

  const markTypingDone = useCallback((msgId: number) => {
    setMessages(prev => prev.map(m =>
      m.id === msgId ? { ...m, typing: false } : m
    ))
    onAgentState('idle')
  }, [onAgentState])

  const handleSend = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || thinking || streaming) return

    setMessages(prev => [...prev, { id: ++idCounter.current, content: trimmed, sender: 'user' }])
    setInput('')
    setThinking(true)
    onAgentState('thinking')
    questionCount.current++

    const streamMsgId = ++idCounter.current

    try {
      // Add placeholder
      setMessages(prev => [...prev, { id: streamMsgId, content: '', sender: 'agent', raw: '', typing: true }])
      setThinking(false)
      setStreaming(true)
      onAgentState('talking')

      const finalText = await sendMessage(trimmed, historyRef.current, (partialText) => {
        setMessages(prev => prev.map(m =>
          m.id === streamMsgId ? { ...m, raw: partialText, typing: true } : m
        ))
      })

      // Set final text — typewriter will handle reveal
      setMessages(prev => prev.map(m =>
        m.id === streamMsgId ? { ...m, raw: finalText, typing: true } : m
      ))
      setChips(getChips(route, questionCount.current))
    } catch {
      setMessages(prev => prev.map(m =>
        m.id === streamMsgId ? { ...m, content: 'Something went wrong. Try again.', raw: '', typing: false } : m
      ))
      onAgentState('idle')
    } finally {
      setStreaming(false)
    }
  }, [thinking, streaming, onAgentState, route])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  // Check if any message is currently typing
  const anyTyping = messages.some(m => m.typing)

  return (
    <div
      className={`agent-chat ${open ? 'agent-chat--open' : ''}`}
      role="dialog"
      aria-label="Chat with Folio, portfolio guide"
      aria-hidden={!open}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--ink-06)]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[var(--ink-04)] flex-shrink-0 overflow-hidden">
            <img src="/Assets/Character/hf_20260402_220117_5f47f762-e0b1-4f21-aaca-91672752f2c6.png" alt="Folio" className="w-full h-full object-cover object-top" />
          </div>
          <div>
            <span className="block text-[13px] font-semibold text-[var(--ink)] leading-none font-[var(--sans)]">Folio</span>
            <span className="flex items-center gap-1 mt-0.5 text-[10px] text-[var(--ink-40)] font-[var(--sans)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Parth's portfolio guide
            </span>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close chat" type="button" className="w-7 h-7 flex items-center justify-center rounded-lg text-[var(--ink-30)] hover:text-[var(--ink)] hover:bg-[var(--ink-04)] transition-all cursor-pointer border-none bg-transparent">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-0 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--ink-06) transparent' }} aria-live="polite" aria-atomic="false">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 items-end ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'agent' && <MiniAvatar />}
            <div className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed font-[var(--sans)] whitespace-pre-line break-words ${
              msg.sender === 'agent'
                ? 'bg-[var(--ink-04)] text-[var(--ink)] rounded-2xl rounded-bl-md'
                : 'bg-[var(--ink)] text-[var(--bg)] rounded-2xl rounded-br-md'
            }`}>
              {msg.sender === 'agent' && msg.raw && msg.typing ? (
                <TypewriterMessage
                  text={msg.raw}
                  onNavigate={handleNav}
                  onDone={() => markTypingDone(msg.id)}
                />
              ) : msg.sender === 'agent' && msg.raw ? (
                <RichText text={msg.raw} onNavigate={handleNav} />
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex gap-2 items-end">
            <MiniAvatar />
            <div className="flex gap-1 px-3.5 py-3 bg-[var(--ink-04)] rounded-2xl rounded-bl-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-30)] animate-[chatdot_1.2s_ease-in-out_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-30)] animate-[chatdot_1.2s_ease-in-out_infinite_0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-30)] animate-[chatdot_1.2s_ease-in-out_infinite_0.3s]" />
            </div>
          </div>
        )}
      </div>

      {/* Chips */}
      {chips.length > 0 && !thinking && !anyTyping && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-2 animate-[chips-in_0.2s_ease]">
          {chips.map(chip => (
            <button key={chip} onClick={() => handleSend(chip)} type="button" className="px-3 py-1.5 rounded-full border border-[var(--ink-08)] bg-transparent text-[11px] font-medium text-[var(--ink-50)] font-[var(--sans)] cursor-pointer transition-all hover:border-[var(--ink-15)] hover:text-[var(--ink)] hover:bg-[var(--ink-04)] whitespace-nowrap">
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-2.5 border-t border-[var(--ink-06)]">
        <input ref={inputRef} type="text" placeholder="Ask about any project..." value={input} onChange={e => setInput(e.target.value)} aria-label="Type your question" autoComplete="off" disabled={thinking || streaming} className="flex-1 bg-transparent border-none text-[13px] text-[var(--ink)] font-[var(--sans)] outline-none placeholder:text-[var(--ink-30)] disabled:opacity-40 py-1" />
        <button type="submit" disabled={!input.trim() || thinking || streaming} aria-label="Send message" className="w-8 h-8 rounded-xl bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center flex-shrink-0 cursor-pointer transition-all hover:scale-105 disabled:opacity-20 disabled:cursor-default border-none">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 8L3 3V6.5L9 8L3 9.5V13Z" fill="currentColor" /></svg>
        </button>
      </form>
    </div>
  )
}
