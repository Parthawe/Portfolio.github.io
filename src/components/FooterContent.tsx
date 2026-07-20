import { useState, useEffect, useRef, type RefObject, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'framer-motion'
import FigmaSelect from './FigmaSelect'
import { CONTACT_EMAIL } from '../config/site'
import { createPortfolioComment, listPortfolioComments, type PortfolioComment } from '../lib/commentStore'
import PointerCursorGlyph from './PointerCursorGlyph'
import PocketArcadeLauncher from './PocketArcadeLauncher'

/** All footer notes share one wall regardless of which page they were left on. */
const GUESTBOOK_ROUTE = '/guestbook'
const NOTE_LIMIT = 240

const footerGroups = [
  {
    title: 'Portfolio',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Work', to: '/work' },
      { label: 'About', to: '/about' },
      { label: 'Playbook', to: '/playbook' },
      { label: 'Accessibility', to: '/accessibility' },
    ],
  },
  {
    title: 'Practices',
    links: [
      { label: 'UX Design', to: '/ux-design' },
      { label: 'AI & Wearables', to: '/ai' },
      { label: 'Creative Tech', to: '/creative-tech' },
      { label: 'Installations', to: '/installations' },
      { label: 'Brand & Visual', to: '/brand-visual' },
    ],
  },
]

/* Figma-style comment pin: circle with one squared corner */
function CommentPinGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2a10 10 0 1 1-10 10V4a2 2 0 0 1 2-2h8z" fill="currentColor" />
    </svg>
  )
}

function clampPercent(v: number) {
  return Math.min(96, Math.max(4, v))
}

function FooterCanvas({ meta }: { meta?: React.ReactNode }) {
  const zoneRef = useRef<HTMLDivElement>(null)
  const youRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const smoothPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const [tracking, setTracking] = useState(false)

  // Guestbook pins live directly on the canvas
  const [notes, setNotes] = useState<PortfolioComment[]>([])
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null)
  const [body, setBody] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let alive = true
    listPortfolioComments(GUESTBOOK_ROUTE)
      .then(list => { if (alive) setNotes(list.slice(-12)) })
      .catch(() => { /* canvas stays pin-free when comments are unreachable */ })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    if (draft) inputRef.current?.focus()
  }, [draft])

  useEffect(() => {
    if (!tracking) return
    const tick = () => {
      smoothPos.current.x += (posRef.current.x - smoothPos.current.x) * 0.16
      smoothPos.current.y += (posRef.current.y - smoothPos.current.y) * 0.16
      const el = youRef.current
      if (el) el.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tracking])

  const canTrack = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const openDraftAt = (xPercent: number, yPercent: number) => {
    setDraft({ x: clampPercent(xPercent), y: clampPercent(yPercent) })
    setBody('')
    setError('')
  }

  const closeDraft = () => {
    setDraft(null)
    setBody('')
    setError('')
  }

  const handleZoneClick = (e: React.MouseEvent) => {
    // Only empty canvas starts a note — pins, links, and the open draft handle their own clicks.
    if ((e.target as HTMLElement).closest('.ft-pin, .ft-pin-draft, .ft-scrap-ghost')) return
    const r = zoneRef.current?.getBoundingClientRect()
    if (!r) return
    openDraftAt(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const text = body.trim()
    if (!text || saving || !draft) return
    setSaving(true)
    setError('')
    try {
      const saved = await createPortfolioComment({
        route: GUESTBOOK_ROUTE,
        xPercent: draft.x,
        yPercent: draft.y,
        selector: 'footer-guestbook',
        authorName: 'Visitor',
        authorEmail: null,
        body: text,
      })
      setNotes(current => [...current, saved].slice(-12))
      closeDraft()
    } catch {
      setError('Could not pin this — try again in a bit.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="ft-canvas" aria-label="End of the portfolio frame">
      <div className="ft-canvas-edge">
        <span className="ft-canvas-framelabel" aria-hidden="true">portfolio.fig — end of frame</span>
        <span className="ft-canvas-hint">
          Notes left on the canvas — click anywhere to pin yours.
          <button
            type="button"
            className="ft-canvas-hint-btn"
            data-parth-comment-target
            onClick={() => openDraftAt(50, 46)}
          >
            + leave a note
          </button>
        </span>
        {meta && <span className="ft-canvas-meta">{meta}</span>}
      </div>

      <div
        className={`ft-canvas-zone ${tracking ? 'is-commenting' : ''}`}
        ref={zoneRef}
        onClick={handleZoneClick}
        onMouseEnter={(e) => {
          if (!canTrack()) return
          const r = zoneRef.current!.getBoundingClientRect()
          posRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
          smoothPos.current = { ...posRef.current }
          setTracking(true)
        }}
        onMouseMove={(e) => {
          const r = zoneRef.current?.getBoundingClientRect()
          if (r) posRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
        }}
        onMouseLeave={() => setTracking(false)}
      >
        {/* stray pen path, unclosed */}
        <svg className="ft-scrap-path" viewBox="0 0 220 70" fill="none" aria-hidden="true">
          <path d="M8 58 C 48 8, 96 66, 138 26 S 204 20, 214 44" stroke="currentColor" strokeWidth="1.2" strokeDasharray="none" />
          <circle cx="8" cy="58" r="2.4" fill="currentColor" />
          <circle cx="214" cy="44" r="2.4" fill="var(--select-blue, #4a90e2)" stroke="#fff" strokeWidth="1" />
        </svg>

        {/* a scrawl left on the canvas */}
        <span className="ft-scrap-scrawl" aria-hidden="true">thanks for scrolling all the way. — p.</span>

        {/* ghost of a deleted frame → graveyard */}
        <Link to="/graveyard" className="ft-scrap-ghost figma-hover" onClick={(e) => e.stopPropagation()}>
          <span className="ft-scrap-ghost-name">old-portfolio-v3</span>
          <span className="ft-scrap-ghost-hint">deleted frames live in the graveyard &rarr;</span>
          <FigmaSelect />
        </Link>

        {/* visitor notes pinned to the canvas */}
        {notes.map((note, index) => (
          <button
            key={note.id}
            type="button"
            className={`ft-pin ${note.status === 'pending' ? 'ft-pin--pending' : ''}`}
            style={{ left: `${clampPercent(note.xPercent)}%`, top: `${clampPercent(note.yPercent)}%` }}
            aria-label={`Note from ${note.authorName}: ${note.body}`}
          >
            {index + 1}
            <span className="ft-pin-bubble" role="tooltip">
              <span className="ft-pin-body">{note.body}</span>
              <span className="ft-pin-meta">
                — {note.authorName}
                {note.status === 'pending' && <em>pending review</em>}
              </span>
            </span>
          </button>
        ))}

        {/* draft note: appears exactly where the visitor clicked */}
        {draft && (
          <form
            className="ft-pin-draft"
            style={{ left: `${draft.x}%`, top: `${draft.y}%` }}
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="ft-pin-draft-glyph"><CommentPinGlyph /></span>
            <div className="ft-pin-draft-box">
              <input
                ref={inputRef}
                type="text"
                value={body}
                maxLength={NOTE_LIMIT}
                placeholder="Leave a note…"
                aria-label="Your note"
                onChange={e => setBody(e.target.value)}
                onKeyDown={e => { if (e.key === 'Escape') closeDraft() }}
              />
              <button type="submit" disabled={saving || !body.trim()} aria-label="Pin note">
                {saving ? '…' : '↵'}
              </button>
              <button type="button" onClick={closeDraft} aria-label="Cancel note">✕</button>
            </div>
            {error && <p className="ft-pin-error" role="alert">{error}</p>}
          </form>
        )}

        {/* the visitor's cursor, now in comment mode */}
        <div className={`ft-cursor ft-cursor--you ${tracking && !draft ? 'is-live' : ''}`} ref={youRef} aria-hidden="true">
          <PointerCursorGlyph className="ft-cursor__glyph" size={22} />
          <span className="ft-cursor-tag">leave a note</span>
        </div>

      </div>
    </div>
  )
}

function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    let intervalId: number | null = null
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Los_Angeles',
        }),
      )
    tick()
    const alignToMinute = window.setTimeout(() => {
      tick()
      intervalId = window.setInterval(tick, 60_000)
    }, 1000)
    return () => {
      window.clearTimeout(alignToMinute)
      if (intervalId !== null) window.clearInterval(intervalId)
    }
  }, [])
  return <span className="ft-clock">{time}</span>
}

/* The visitor's own time next to mine — a small "I reply across time zones" gesture. */
function VisitorClock() {
  const [label, setLabel] = useState('')
  useEffect(() => {
    try {
      const now = new Date()
      const sfHour = Number(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', hour12: false }))
      const localHour = now.getHours()
      if (sfHour === localHour) return // same zone — nothing interesting to say
      const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      setLabel(`${time} where you are`)
    } catch {
      // Clock stays SF-only when the environment can't resolve zones.
    }
  }, [])
  if (!label) return null
  return <span className="ft-clock-you">{label}</span>
}

export default function FooterContent({ footerRef }: { footerRef: RefObject<HTMLElement | null> }) {
  const [copied, setCopied] = useState(false)
  const email = CONTACT_EMAIL
  const firstRevealRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(firstRevealRef, { once: true, amount: 0.1 })
  const [skipAnim, setSkipAnim] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInView) setSkipAnim(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [isInView])

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  })

  const ctaY = useTransform(scrollYProgress, [0, 0.5], [40, 0])
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const infoY = useTransform(scrollYProgress, [0.1, 0.55], [24, 0])
  const infoOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0, 1])

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const a = (y: MotionValue<number>, opacity: MotionValue<number>) =>
    skipAnim ? { y: 0, opacity: 1 } : { y, opacity }

  return (
    <div className="wrap ft-compact">
      {/* Band 1 — one composition: the ask on the left, the map on the right */}
      <motion.div className="ft-top" style={a(ctaY, ctaOpacity)} ref={firstRevealRef}>
        <div className="ft-top-cta">
          <span className="ft-paper-label">Available for product, systems, and interaction work</span>
          <h2 className="ft-headline-sm">
            Let's work <em>together</em>
          </h2>
          <div className="ft-contact-row">
            <a className="ft-email figma-hover" href={`mailto:${email}`}>{email}<FigmaSelect /></a>
            <button className="ft-copy-btn magnetic figma-hover" onClick={handleCopy} aria-label="Copy email">
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7.5L5.5 11L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="sr-only" role="status">Email copied</span>
                </>
              ) : 'Copy email'}
              <FigmaSelect />
            </button>
          </div>
          <div className="ft-access-row" aria-label="Quick requests">
            <a href={`mailto:${email}?subject=Portfolio%20case%20study%20access`} className="ft-access-link figma-hover">Request case study<FigmaSelect /></a>
            <span className="ft-access-dot" aria-hidden="true" />
            <a href={`mailto:${email}?subject=Resume%20request`} className="ft-access-link figma-hover">Resume<FigmaSelect /></a>
            <span className="ft-access-dot" aria-hidden="true" />
            <a href={`mailto:${email}?subject=Project%20availability`} className="ft-access-link figma-hover">Availability<FigmaSelect /></a>
          </div>
        </div>

        <motion.div className="ft-top-links" style={a(infoY, infoOpacity)} aria-label="Footer navigation">
          {footerGroups.map(group => (
            <nav className="ft-link-group" aria-label={group.title} key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(link => (
                <Link key={link.label} to={link.to} className="ft-info-link figma-hover">
                  {link.label}
                  <FigmaSelect />
                </Link>
              ))}
            </nav>
          ))}
          <div className="ft-link-group ft-arcade-shelf">
            <h3>Play</h3>
            <PocketArcadeLauncher />
          </div>
        </motion.div>
      </motion.div>

      {/* Band 2 — the canvas runs out; location + time live on the frame edge */}
      <FooterCanvas
        meta={
          <>
            <span>San Francisco, CA</span>
            <span><LiveClock /> PT</span>
            <VisitorClock />
          </>
        }
      />
    </div>
  )
}
