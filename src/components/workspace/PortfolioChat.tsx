import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import PointerCursorGlyph from '../PointerCursorGlyph'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { setCanvasChromePreference } from '../../utils/performance'
import { getChatPageContext, resolveChatScroll } from '../../services/chatPageContext'
import type { ChatHistory } from '../../services/agentAI'
import '../../styles/portfolio-chat.css'

type Message = { role: 'user' | 'assistant'; text: string; failed?: boolean; source?: 'ai' | 'notes'; destination?: { path: string; label: string } }
const SESSION_KEY = 'portfolio-chat-session-v1'
const MODALS = '.lightbox-overlay.active, .compact-sheet-backdrop, .arcade-overlay, .project-image-preview.active, [aria-modal="true"]:not(.portfolio-chat-panel)'
function restore(): { messages: Message[]; draft: string } {
  try {
    const value = JSON.parse(sessionStorage.getItem(SESSION_KEY) || '{}')
    if (value.version === 1 && Array.isArray(value.messages)) return {
      messages: value.messages.filter((m: Message) => m && ['user', 'assistant'].includes(m.role) && typeof m.text === 'string').slice(-100).map((m: Message) => ({ ...m, text: m.text.slice(0, 8000) })),
      draft: typeof value.draft === 'string' ? value.draft.slice(0, 2000) : '',
    }
  } catch { /* A conversation also works without browser storage. */ }
  return { messages: [], draft: '' }
}
function RichText({ text }: { text: string }) {
  const parts = text.replace(/^\[EXPORT\]\n?/, '').split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return <>{parts.map((part, i): ReactNode => {
    if (part.startsWith('**')) return <strong key={i}><RichText text={part.slice(2, -2)} /></strong>
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (match) {
      const [, label, url] = match
      if (url.startsWith('/') && !url.startsWith('//')) return <Link key={i} to={url}>{label}</Link>
      if (/^https?:\/\//.test(url)) return <a key={i} href={url} target="_blank" rel="noreferrer">{label}</a>
      return label
    }
    return part
  })}</>
}
function Answer({ text }: { text: string }) {
  // Render only text, links and simple lists. Never interpret assistant HTML.
  const lines = text.replace(/^\[EXPORT\]\n?/, '').replace(/([^\n])\s*•\s+/g, '$1\n• ').split('\n')
  const blocks: ReactNode[] = []
  let items: string[] = []
  let ordered = false
  const flush = () => {
    if (!items.length) return
    const children = items.map((item, i) => <li key={i}><RichText text={item} /></li>)
    blocks.push(ordered ? <ol key={blocks.length}>{children}</ol> : <ul key={blocks.length}>{children}</ul>)
    items = []
  }
  for (const line of lines) {
    const item = line.match(/^\s*(?:[•*-]|(\d+)[.)])\s+(.+)$/)
    if (item) {
      const nextOrdered = Boolean(item[1])
      if (items.length && ordered !== nextOrdered) flush()
      ordered = nextOrdered; items.push(item[2])
    } else {
      flush()
      if (line.trim()) blocks.push(<p key={blocks.length}><RichText text={line} /></p>)
    }
  }
  flush()
  return <>{blocks}</>
}
function CopyAnswer({ text }: { text: string }) {
  const [status, setStatus] = useState('Copy answer')
  useEffect(() => {
    if (status === 'Copy answer') return
    const timer = setTimeout(() => setStatus('Copy answer'), 2500)
    return () => clearTimeout(timer)
  }, [status])
  return <button type="button" className="portfolio-chat-copy" onClick={async () => {
    try { await navigator.clipboard.writeText(text); setStatus('Copied') }
    catch { setStatus('Couldn’t copy. Select the text.') }
  }} aria-live="polite">{status}</button>
}
function Icon({ close = false }: { close?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={close ? 'M6 6l12 12M18 6L6 18' : 'M4 4h16v13H9l-5 4V4Z'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export default function PortfolioChat() {
  const { pathname } = useLocation()
  const route = pathname.replace(/\/+$/, '') || '/'
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState(restore)
  const [busy, setBusy] = useState(false)
  const [unread, setUnread] = useState(false)
  const [suspended, setSuspended] = useState(false)
  const wide = useMediaQuery('(min-width: 1200px)')
  const animatedCursor = useMediaQuery('(min-width: 769px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  const panel = useRef<HTMLElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)
  const log = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const history = useRef<ChatHistory | null>(null)
  const request = useRef(0)
  const busyRef = useRef(false)
  const pinned = useRef(true)
  const pageName = route === '/' ? 'Home' : route.slice(1).replace(/-/g, ' ').replace(/\b\w/g, s => s.toUpperCase())
  const close = useCallback(() => {
    setOpen(false)
    requestAnimationFrame(() => (previousFocus.current?.isConnected ? previousFocus.current : trigger.current)?.focus({ preventScroll: true }))
  }, [])
  const show = useCallback(() => {
    previousFocus.current = document.activeElement as HTMLElement
    window.dispatchEvent(new Event('site-tools:close'))
    setCanvasChromePreference(false)
    setOpen(true)
  }, [])

  useEffect(() => {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ version: 1, ...session })) } catch { /* Optional storage. */ }
  }, [session])
  useEffect(() => {
    window.addEventListener('portfolio-chat:open', show)
    // The original canvas UI keeps its own controls and layout. Chat steps away.
    const onTools = (event: Event) => { if ((event as CustomEvent).detail?.open) setOpen(false) }
    window.addEventListener('site-tools:state', onTools)
    return () => {
      window.removeEventListener('portfolio-chat:open', show)
      window.removeEventListener('site-tools:state', onTools)
    }
  }, [show])
  useLayoutEffect(() => {
    document.body.classList.toggle('portfolio-chat-open', open)
    document.body.classList.toggle('portfolio-chat-wide', open && wide)
    window.dispatchEvent(new Event('resize'))
    return () => { document.body.classList.remove('portfolio-chat-open', 'portfolio-chat-wide') }
  }, [open, wide])
  useEffect(() => {
    if (!open) return
    const update = () => {
      const active = Array.from(document.querySelectorAll<HTMLElement>(MODALS)).some(el => el.getClientRects().length > 0)
      setSuspended(active)
    }
    const observer = new MutationObserver(update)
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'aria-modal'] })
    update()
    return () => observer.disconnect()
  }, [open])
  useEffect(() => {
    if (!open || suspended) return
    // Do not summon the software keyboard until a visitor taps the composer.
    if (matchMedia('(pointer: fine)').matches) input.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (Array.from(document.querySelectorAll<HTMLElement>(MODALS)).some(el => el.getClientRects().length)) return
      if (e.key === 'Escape') {
        e.preventDefault(); e.stopImmediatePropagation()
        close()
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [open, wide, suspended, close])
  useEffect(() => {
    if (pinned.current && log.current) log.current.scrollTop = log.current.scrollHeight
    else setUnread(true)
  }, [session.messages, busy, open])
  useEffect(() => {
    if (!open || !window.visualViewport) return
    const viewport = window.visualViewport
    const update = () => {
      panel.current?.style.setProperty('--chat-visible-height', `${viewport.height}px`)
      panel.current?.style.setProperty('--chat-keyboard-offset', `${Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)}px`)
    }
    update()
    viewport.addEventListener('resize', update)
    viewport.addEventListener('scroll', update)
    return () => { viewport.removeEventListener('resize', update); viewport.removeEventListener('scroll', update) }
  }, [open])
  useLayoutEffect(() => {
    const field = input.current
    if (!field || !open) return
    field.style.height = 'auto'
    field.style.height = `${Math.min(160, field.scrollHeight)}px`
  }, [session.draft, open])
  const send = async (value: string, retry = false) => {
    const text = value.trim()
    if (!text || busyRef.current) return
    pinned.current = true; setUnread(false)
    input.current?.focus({ preventScroll: true })
    busyRef.current = true; setBusy(true)
    const id = ++request.current
    const snapshot = session.messages
    setSession(s => ({ draft: retry ? s.draft : '', messages: retry ? s.messages.filter(m => !m.failed) : [...s.messages, { role: 'user' as const, text }].slice(-100) }))
    try {
      const ai = await import('../../services/agentAI')
      if (id !== request.current) return
      if (!history.current) {
        history.current = ai.createChatHistory(route)
        for (let i = 0; i < snapshot.length - 1; i++) {
          if (snapshot[i].role === 'user' && snapshot[i + 1].role === 'assistant' && !snapshot[i + 1].failed) history.current.turns.push({ question: snapshot[i].text, answer: snapshot[i + 1].text })
        }
      }
      history.current.route = route; history.current.ctx.route = route
      const action = ai.getResponseAction(text, route)
      const explicitScroll = /^(scroll|show me|take me|go to|jump)/i.test(text)
      const scroll = resolveChatScroll(text) || (explicitScroll && action.type === 'scroll' && action.element?.getClientRects().length ? { element: action.element, label: action.label || 'Section', edge: undefined } : null)
      if (scroll) {
        const answer = `Showing ${scroll.label}.`
        history.current.turns.push({ question: text, answer })
        setSession(s => ({ ...s, messages: [...s.messages, { role: 'assistant', text: answer }] }))

        window.setTimeout(() => {
          if (id !== request.current || (window.location.pathname.replace(/\/+$/, '') || '/') !== route) return
          const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
          if (scroll.element?.isConnected) window.scrollTo({ top: window.scrollY + scroll.element.getBoundingClientRect().top - 100, behavior })
          else if (scroll.edge) window.scrollTo({ top: scroll.edge === 'top' ? 0 : document.documentElement.scrollHeight, behavior })
        }, 120)
        return
      }
      const destination = action.type === 'navigate' || action.slug
        ? { path: action.path || `/${action.slug || ''}`, label: action.label || 'Open project' }
        : undefined
      let source: 'ai' | 'notes' = 'notes'
      const answer = await ai.sendMessage(text, history.current, undefined, { surface: 'panel', pageContext: getChatPageContext(), onSource: value => { source = value } })
      if (id === request.current) setSession(s => ({ ...s, messages: [...s.messages, { role: 'assistant' as const, text: answer, destination, source }].slice(-100) }))
    } catch {
      if (id === request.current) setSession(s => ({ ...s, messages: [...s.messages, { role: 'assistant', text: 'The answer could not be loaded. Your question is saved. Try again.', failed: true }] }))
    } finally { if (id === request.current) { busyRef.current = false; setBusy(false) } }
  }
  const newChat = () => {
    request.current++; history.current = null; busyRef.current = false; setBusy(false)
    setSession({ messages: [], draft: '' }); pinned.current = true; setUnread(false); input.current?.focus()
  }
  const suggestions = route === '/' || route === '/work' ? ['Where should I start?', 'What has Parth shipped?', 'How does Parth approach design?'] : route === '/about' ? ['What is Parth’s experience?', 'How does Parth work with engineers?', 'What kind of roles fit Parth?'] : ['What problem did this project solve?', 'What did Parth own?', 'What was the key decision?']

  return createPortal(<>
    {!open && !animatedCursor && <button ref={trigger} className="portfolio-chat-cursor" onClick={show} aria-label="Ask Parth about this work" aria-expanded={false}><PointerCursorGlyph className="portfolio-chat-cursor-glyph" /><span>parth</span></button>}
    <aside ref={panel} className="portfolio-chat-panel" hidden={!open} inert={suspended} role="complementary" aria-label="Ask Parth chat" data-cursor-exclude>
      <header className="portfolio-chat-header"><div><h2>Ask Parth</h2><p>AI portfolio guide</p></div><button type="button" className="portfolio-chat-new-compact" onClick={newChat}>New chat</button><button type="button" className="portfolio-chat-icon" onClick={close} aria-label="Close panel"><Icon close /></button></header>
      <div className="portfolio-chat-chat">
        <div className="portfolio-chat-context"><span title={`Viewing ${pageName}`}>Viewing {pageName}</span><button onClick={newChat}>New chat</button></div>
        <div className="portfolio-chat-messages" ref={log} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" onScroll={e => { const el = e.currentTarget; pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60; if (pinned.current) setUnread(false) }}>
          {!session.messages.length && <div className="portfolio-chat-welcome"><h3>Ask about the work.</h3><p>Ask about decisions, compare projects, or say “show me the research” to move around this page.</p><div className="portfolio-chat-suggestions">{suggestions.map(q => <button key={q} disabled={busy} onClick={() => void send(q)}>{q}</button>)}</div></div>}
          {session.messages.map((m, i) => <div key={i} className={`portfolio-chat-message portfolio-chat-message--${m.role}`}><span className="sr-only">{m.role === 'user' ? 'You' : 'Ask Parth'}: </span>{m.role === 'assistant' ? <><Answer text={m.text} />{m.source === 'notes' && <p className="portfolio-chat-source">From portfolio notes · live AI unavailable</p>}{!m.failed && <CopyAnswer text={m.text} />}{m.destination && m.destination.path.startsWith('/') && !m.destination.path.startsWith('//') && <Link className="portfolio-chat-destination" to={m.destination.path}>{m.destination.label} ↗</Link>}</> : m.text}{m.failed && <button className="portfolio-chat-retry" onClick={() => void send(session.messages.slice(0, i).reverse().find(x => x.role === 'user')?.text || '', true)}>Retry answer</button>}</div>)}
          {busy && <p role="status" className="portfolio-chat-thinking">Looking through the portfolio…</p>}
        </div>
        {unread && <button className="portfolio-chat-latest" onClick={() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; pinned.current = true; setUnread(false) }}>Jump to latest</button>}
        <div className="portfolio-chat-guidance" aria-label="Page navigation"><button disabled={busy} onClick={() => void send('Next section')}>Next section ↓</button><button disabled={busy} onClick={() => void send('Back to top')}>Back to top ↑</button></div>
        <form className="portfolio-chat-composer" onSubmit={e => { e.preventDefault(); void send(session.draft) }}><textarea ref={input} rows={1} maxLength={2000} value={session.draft} aria-label="Message Ask Parth" aria-describedby="portfolio-chat-input-help" placeholder="Ask about the work…" onChange={e => setSession(s => ({ ...s, draft: e.target.value }))} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void send(session.draft) } }} /><div><span>AI answers. Check the linked projects.</span><button disabled={busy || !session.draft.trim()} type="submit">Send</button></div></form><p className="portfolio-chat-input-help" id="portfolio-chat-input-help">Enter to send · Shift + Enter for a new line</p>
      </div>
    </aside>
  </>, document.body)
}
