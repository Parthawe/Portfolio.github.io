import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendMessage, getChips, getGreeting, createChatHistory, type ChatHistory } from '../../services/agentAI'

interface Message {
  id: number
  content: ReactNode
  sender: 'agent' | 'user'
  raw?: string
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
            <button
              key={key++}
              className="inline underline underline-offset-2 decoration-[var(--ink-30)] hover:decoration-[var(--ink)] transition-colors cursor-pointer bg-transparent border-none font-inherit p-0"
              onClick={() => onNavigate(href)}
              type="button"
            >
              {label}
            </button>
          ) : (
            <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="inline underline underline-offset-2 decoration-[var(--ink-30)] hover:decoration-[var(--ink)] transition-colors">
              {label}
            </a>
          )
        )
      }
    }

    lastIdx = match.index + seg.length
  }

  if (lastIdx < text.length) parts.push(text.slice(lastIdx))
  return <>{parts}</>
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
        content: <RichText text={greeting} onNavigate={handleNav} />,
        sender: 'agent',
        raw: greeting,
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
      setMessages(prev => [...prev, { id: streamMsgId, content: '', sender: 'agent', raw: '' }])
      setThinking(false)
      setStreaming(true)
      onAgentState('talking')

      const finalText = await sendMessage(trimmed, historyRef.current, (partialText) => {
        setMessages(prev => prev.map(m =>
          m.id === streamMsgId
            ? { ...m, content: <RichText text={partialText} onNavigate={handleNav} />, raw: partialText }
            : m
        ))
      })

      setMessages(prev => prev.map(m =>
        m.id === streamMsgId
          ? { ...m, content: <RichText text={finalText} onNavigate={handleNav} />, raw: finalText }
          : m
      ))
      setChips(getChips(route, questionCount.current))
    } catch {
      setMessages(prev => prev.map(m =>
        m.id === streamMsgId
          ? { ...m, content: 'Something went wrong. Try again.', raw: 'Something went wrong. Try again.' }
          : m
      ))
    } finally {
      setStreaming(false)
      onAgentState('idle')
    }
  }, [thinking, streaming, onAgentState, handleNav, route])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

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
          {/* Mini Folio avatar — beanie + glasses + eyes */}
          <div className="w-7 h-7 rounded-full bg-[var(--ink-04)] flex items-center justify-center flex-shrink-0 overflow-hidden">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <ellipse cx="14" cy="16" rx="9" ry="10" fill="var(--ag-skin, #E8BBA8)" />
              <path d="M5 14Q5 5 14 5Q23 5 23 14L23 15.5Q20 13 14 13Q8 13 5 15.5Z" fill="var(--ag-hair, #2D2824)" />
              <path d="M4.5 14Q4.5 12 6 12.5L22 12.5Q23.5 12 23.5 14Q20.5 13 14 13Q7.5 13 4.5 14Z" fill="var(--ag-hair, #2D2824)" opacity="0.85" />
              <circle cx="11" cy="17" r="3.5" fill="rgba(44,40,36,0.1)" stroke="rgba(44,40,36,0.22)" strokeWidth="0.8" />
              <circle cx="19" cy="17" r="3.5" fill="rgba(44,40,36,0.1)" stroke="rgba(44,40,36,0.22)" strokeWidth="0.8" />
              <line x1="14.5" y1="17" x2="15.5" y2="17" stroke="rgba(44,40,36,0.22)" strokeWidth="0.8" />
              <path d="M10 17.5Q11 15.5 12 17.5" stroke="var(--ag-eye, #2D2824)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <path d="M18 17.5Q19 15.5 20 17.5" stroke="var(--ag-eye, #2D2824)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
            </svg>
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
            {msg.sender === 'agent' && (
              <div className="w-5 h-5 rounded-full bg-[var(--ink-06)] flex items-center justify-center flex-shrink-0 mb-0.5">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <ellipse cx="8" cy="10" rx="5.5" ry="5" fill="var(--ag-skin, #E8BBA8)" />
                  <path d="M3 8.5Q3 3 8 3Q13 3 13 8.5L13 9.5Q11 8 8 8Q5 8 3 9.5Z" fill="var(--ag-hair, #2D2824)" />
                  <path d="M6 10Q7 8.5 8 10" stroke="var(--ag-eye, #2D2824)" strokeWidth="1" strokeLinecap="round" fill="none" />
                  <path d="M9.5 10Q10.5 8.5 11.5 10" stroke="var(--ag-eye, #2D2824)" strokeWidth="1" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            )}
            <div className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed font-[var(--sans)] whitespace-pre-line break-words ${
              msg.sender === 'agent'
                ? 'bg-[var(--ink-04)] text-[var(--ink)] rounded-2xl rounded-bl-md'
                : 'bg-[var(--ink)] text-[var(--bg)] rounded-2xl rounded-br-md'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Thinking indicator */}
        {thinking && (
          <div className="flex gap-2 items-end">
            <div className="w-5 h-5 rounded-full bg-[var(--ink-06)] flex items-center justify-center flex-shrink-0 mb-0.5">
              <svg width="10" height="10" viewBox="0 0 18 18" fill="none">
                <path d="M9 1L9.87 5.36a2 2 0 0 0 1.77 1.77L16 8l-4.36.87a2 2 0 0 0-1.77 1.77L9 15l-.87-4.36a2 2 0 0 0-1.77-1.77L2 8l4.36-.87a2 2 0 0 0 1.77-1.77L9 1Z" fill="var(--ink-40)" />
              </svg>
            </div>
            <div className="flex gap-1 px-3.5 py-3 bg-[var(--ink-04)] rounded-2xl rounded-bl-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-30)] animate-[chatdot_1.2s_ease-in-out_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-30)] animate-[chatdot_1.2s_ease-in-out_infinite_0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-30)] animate-[chatdot_1.2s_ease-in-out_infinite_0.3s]" />
            </div>
          </div>
        )}
      </div>

      {/* Chips */}
      {chips.length > 0 && !thinking && !streaming && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-2 animate-[chips-in_0.2s_ease]">
          {chips.map(chip => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              type="button"
              className="px-3 py-1.5 rounded-full border border-[var(--ink-08)] bg-transparent text-[11px] font-medium text-[var(--ink-50)] font-[var(--sans)] cursor-pointer transition-all hover:border-[var(--ink-15)] hover:text-[var(--ink)] hover:bg-[var(--ink-04)] whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-2.5 border-t border-[var(--ink-06)]">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask about any project..."
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label="Type your question"
          autoComplete="off"
          disabled={thinking || streaming}
          className="flex-1 bg-transparent border-none text-[13px] text-[var(--ink)] font-[var(--sans)] outline-none placeholder:text-[var(--ink-30)] disabled:opacity-40 py-1"
        />
        <button
          type="submit"
          disabled={!input.trim() || thinking || streaming}
          aria-label="Send message"
          className="w-8 h-8 rounded-xl bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center flex-shrink-0 cursor-pointer transition-all hover:scale-105 disabled:opacity-20 disabled:cursor-default border-none"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 13L13 8L3 3V6.5L9 8L3 9.5V13Z" fill="currentColor" />
          </svg>
        </button>
      </form>
    </div>
  )
}
