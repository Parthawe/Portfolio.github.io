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
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index))
    }
    const seg = match[0]

    if (seg.startsWith('**')) {
      parts.push(<strong key={key++}>{seg.slice(2, -2)}</strong>)
    } else if (seg.startsWith('[')) {
      const linkMatch = seg.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (linkMatch) {
        const [, label, href] = linkMatch
        const isInternal = href.startsWith('/')
        parts.push(
          isInternal ? (
            <button
              key={key++}
              className="agent-msg-link"
              onClick={() => onNavigate(href)}
              type="button"
            >
              {label}
            </button>
          ) : (
            <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="agent-msg-link">
              {label}
            </a>
          )
        )
      }
    }

    lastIdx = match.index + seg.length
  }

  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx))
  }

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

  // Keep route synced
  useEffect(() => {
    historyRef.current.route = route
  }, [route])

  // Initialize on open
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

  // Scroll to bottom
  useEffect(() => {
    const el = messagesRef.current
    if (el) requestAnimationFrame(() => { el.scrollTop = el.scrollHeight })
  }, [messages, thinking, streaming])

  // Escape to close
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

    // Add user message
    setMessages(prev => [...prev, {
      id: ++idCounter.current,
      content: trimmed,
      sender: 'user',
    }])
    setInput('')
    setThinking(true)
    onAgentState('thinking')
    questionCount.current++

    const streamMsgId = ++idCounter.current

    try {
      // Add placeholder for streaming response
      setMessages(prev => [...prev, {
        id: streamMsgId,
        content: '',
        sender: 'agent',
        raw: '',
      }])

      setThinking(false)
      setStreaming(true)
      onAgentState('talking')

      const finalText = await sendMessage(trimmed, historyRef.current, (partialText) => {
        // Update the streaming message in real-time
        setMessages(prev => prev.map(m =>
          m.id === streamMsgId
            ? { ...m, content: <RichText text={partialText} onNavigate={handleNav} />, raw: partialText }
            : m
        ))
      })

      // Final update with complete text
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
      aria-label="Chat with portfolio assistant"
      aria-hidden={!open}
    >
      {/* Header */}
      <div className="agent-chat-header">
        <div className="agent-chat-header-left">
          <div className="agent-chat-avatar">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <circle cx="12" cy="12" r="10" fill="var(--ink)" />
              <circle cx="9" cy="10" r="1.5" fill="var(--bg)" />
              <circle cx="15" cy="10" r="1.5" fill="var(--bg)" />
              <path d="M9 15 Q12 18 15 15" stroke="var(--bg)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <div>
            <span className="agent-chat-title">Portfolio Guide</span>
            <span className="agent-chat-status">
              <span className="agent-chat-dot" />
              Online
            </span>
          </div>
        </div>
        <button className="agent-chat-close" onClick={onClose} aria-label="Close chat" type="button">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="agent-chat-messages" ref={messagesRef} aria-live="polite" aria-atomic="false">
        {messages.map(msg => (
          <div key={msg.id} className={`agent-msg-row agent-msg-row--${msg.sender}`}>
            {msg.sender === 'agent' && (
              <div className="agent-msg-avatar">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
                  <circle cx="10" cy="10" r="8" fill="var(--ink)" />
                  <circle cx="7.5" cy="8.5" r="1" fill="var(--bg)" />
                  <circle cx="12.5" cy="8.5" r="1" fill="var(--bg)" />
                  <path d="M7.5 12.5 Q10 15 12.5 12.5" stroke="var(--bg)" strokeWidth="1" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            )}
            <div className={`agent-msg agent-msg--${msg.sender}`}>
              {typeof msg.content === 'string' ? msg.content : msg.content}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="agent-msg-row agent-msg-row--agent">
            <div className="agent-msg-avatar">
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
                <circle cx="10" cy="10" r="8" fill="var(--ink)" />
                <circle cx="7.5" cy="8.5" r="1" fill="var(--bg)" />
                <circle cx="12.5" cy="8.5" r="1" fill="var(--bg)" />
              </svg>
            </div>
            <div className="agent-msg agent-msg--agent agent-msg--thinking">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      {/* Dynamic chips */}
      {chips.length > 0 && !thinking && !streaming && (
        <div className="agent-chips">
          {chips.map(chip => (
            <button key={chip} className="agent-chip" onClick={() => handleSend(chip)} type="button">
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form className="agent-chat-input-wrap" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="agent-chat-input"
          type="text"
          placeholder="Ask about any project..."
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label="Type your question"
          autoComplete="off"
          disabled={thinking || streaming}
        />
        <button
          className="agent-chat-send"
          type="submit"
          disabled={!input.trim() || thinking || streaming}
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 14L14 8L2 2V6.5L10 8L2 9.5V14Z" fill="currentColor" />
          </svg>
        </button>
      </form>
    </div>
  )
}
