import { useRef, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { normalizeCopy } from '../utils/normalizeCopy'

/**
 * Spotlight text reveal.
 *
 * Frosted moon circle follows cursor (position: fixed, never clipped).
 * Behind text inside the circle is offset so it aligns perfectly
 * with the front text underneath.
 */

interface Props {
  front: string
  behind: string
  className?: string
}

const SIZE = 380

/** The cursor lens is unavailable on touch, small screens, and for
 *  reduced-motion users — those get a tap-to-flip fallback instead. */
function lensDisabled() {
  if (typeof window === 'undefined') return true
  return (
    window.matchMedia('(hover: none), (pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.innerWidth <= 768
  )
}

export default function TextReveal({ front, behind, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const behindRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [flipMode, setFlipMode] = useState(lensDisabled)
  const [flipped, setFlipped] = useState(false)
  const [tapped, setTapped] = useState(false)
  const peekedRef = useRef(false)
  const hoveredRef = useRef(false)
  // Store viewport coords for fixed positioning
  const posRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  const sizeRef = useRef(0)
  const targetRef = useRef(0)
  const rafRef = useRef(0)
  const runningRef = useRef(false)
  const rectRef = useRef<DOMRect | null>(null)

  const tick = useCallback(() => {
    const circle = circleRef.current
    const behindEl = behindRef.current
    const container = containerRef.current
    if (!circle || !behindEl || !container) return

    // Smooth position (viewport coords)
    smoothRef.current.x += (posRef.current.x - smoothRef.current.x) * 0.18
    smoothRef.current.y += (posRef.current.y - smoothRef.current.y) * 0.18

    // Smooth size
    sizeRef.current += (targetRef.current - sizeRef.current) * 0.12
    if (Math.abs(sizeRef.current - targetRef.current) < 0.5) {
      sizeRef.current = targetRef.current
    }

    const s = sizeRef.current
    const vx = smoothRef.current.x // viewport X
    const vy = smoothRef.current.y // viewport Y
    const half = s / 2

    if (s < 2) {
      circle.style.opacity = '0'
      circle.style.transform = `translate(${vx}px, ${vy}px) scale(0)`
    } else {
      circle.style.opacity = '1'
      circle.style.width = `${s}px`
      circle.style.height = `${s}px`
      circle.style.transform = `translate(${vx - half}px, ${vy - half}px)`

      // Behind text offset: align with front text position
      // Use cached rect, updated on resize/enter
      const rect = rectRef.current || container.getBoundingClientRect()
      behindEl.style.left = `${rect.left - (vx - half)}px`
      behindEl.style.top = `${rect.top - (vy - half)}px`
      behindEl.style.width = `${rect.width}px`
      behindEl.style.height = `${rect.height}px`
    }

    const stillMoving = Math.abs(sizeRef.current - targetRef.current) > 0.5
    if (targetRef.current > 0 || stillMoving) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      runningRef.current = false
    }
  }, [])

  const startLoop = useCallback(() => {
    if (runningRef.current) return
    runningRef.current = true
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const handleMove = useCallback((e: React.MouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleEnter = useCallback((e: React.MouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY }
    smoothRef.current = { x: e.clientX, y: e.clientY }
    targetRef.current = SIZE
    rectRef.current = containerRef.current?.getBoundingClientRect() ?? null
    hoveredRef.current = true
    setHovered(true)
    document.body.classList.add('spotlight-active')
    startLoop()
  }, [startLoop])

  const handleLeave = useCallback(() => {
    targetRef.current = 0
    hoveredRef.current = false
    setHovered(false)
    document.body.classList.remove('spotlight-active')
    startLoop()
  }, [startLoop])

  const collapseLens = useCallback(() => {
    if (targetRef.current === 0 && sizeRef.current === 0) return
    targetRef.current = 0
    hoveredRef.current = false
    setHovered(false)
    document.body.classList.remove('spotlight-active')
    startLoop()
  }, [startLoop])

  // Global mouse tracking while hovered + update cached rect on resize
  useEffect(() => {
    if (!hovered) return
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }
    const syncRect = () => {
      rectRef.current = containerRef.current?.getBoundingClientRect() ?? null
    }
    const onScroll = () => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) {
        collapseLens()
        return
      }
      rectRef.current = rect
      const visible = rect.bottom > 0 && rect.top < window.innerHeight
      const pointerInside =
        posRef.current.x >= rect.left &&
        posRef.current.x <= rect.right &&
        posRef.current.y >= rect.top &&
        posRef.current.y <= rect.bottom

      if (!visible || !pointerInside) collapseLens()
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', syncRect, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', syncRect)
      window.removeEventListener('scroll', onScroll)
    }
  }, [collapseLens, hovered])

  useEffect(() => {
    if (flipMode) return
    const onGlobalScroll = () => {
      if (targetRef.current <= 0) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) {
        collapseLens()
        return
      }
      rectRef.current = rect
      const visible = rect.bottom > 0 && rect.top < window.innerHeight
      if (!hoveredRef.current || !visible) collapseLens()
    }
    const onScrollIntent = () => {
      if (targetRef.current > 0) collapseLens()
    }
    window.addEventListener('scroll', onGlobalScroll, { passive: true })
    window.addEventListener('wheel', onScrollIntent, { passive: true })
    window.addEventListener('touchmove', onScrollIntent, { passive: true })
    return () => {
      window.removeEventListener('scroll', onGlobalScroll)
      window.removeEventListener('wheel', onScrollIntent)
      window.removeEventListener('touchmove', onScrollIntent)
    }
  }, [collapseLens, flipMode])

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current)
    document.body.classList.remove('spotlight-active')
  }, [])

  // Track breakpoint/input changes so the fallback follows the lens rules
  useEffect(() => {
    const update = () => setFlipMode(lensDisabled())
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  // One-time desktop peek: bloom the lens at center when first scrolled into
  // view, so visitors learn there is something underneath without being told.
  useEffect(() => {
    if (flipMode) return
    const container = containerRef.current
    if (!container) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || peekedRef.current) return
      peekedRef.current = true
      observer.disconnect()
      const rect = container.getBoundingClientRect()
      rectRef.current = rect
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      posRef.current = { x: cx, y: cy }
      smoothRef.current = { x: cx, y: cy }
      targetRef.current = SIZE * 0.72
      startLoop()
      const timer = setTimeout(() => {
        // Do not cut a real hover short if the visitor beat the timer
        if (!hoveredRef.current) {
          targetRef.current = 0
          startLoop()
        }
      }, 1100)
      return () => clearTimeout(timer)
    }, { threshold: 0.65 })
    observer.observe(container)
    return () => observer.disconnect()
  }, [flipMode, startLoop])

  const handleFlip = useCallback(() => {
    if (!flipMode) return
    setFlipped(f => !f)
    setTapped(true)
  }, [flipMode])

  const safeFront = normalizeCopy(front)
  const safeBehind = normalizeCopy(behind)

  return (
    <>
      <div
        ref={containerRef}
        className={`spotlight-reveal ${flipMode ? 'spotlight-reveal--flip' : ''} ${flipped ? 'is-flipped' : ''} ${className}`}
        onMouseEnter={flipMode ? undefined : handleEnter}
        onMouseLeave={flipMode ? undefined : handleLeave}
        onMouseMove={flipMode ? undefined : handleMove}
        onClick={handleFlip}
        role={flipMode ? 'button' : undefined}
        tabIndex={flipMode ? 0 : undefined}
        onKeyDown={flipMode ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip() } } : undefined}
        aria-pressed={flipMode ? flipped : undefined}
        aria-label={flipMode ? 'Flip to read the second half of this thought' : undefined}
      >
        <div className="spotlight-front" aria-hidden={flipMode ? flipped : undefined}>
          <span>{safeFront}</span>
        </div>
        {flipMode && (
          <div className="spotlight-behind-inline" aria-hidden={!flipped}>
            <span>{safeBehind}</span>
          </div>
        )}
        {flipMode && !tapped && (
          <span className="spotlight-hint" aria-hidden="true">tap</span>
        )}
        {/* The lens layer is aria-hidden; expose the hidden line to screen readers */}
        {!flipMode && <span className="sr-only">{safeBehind}</span>}
      </div>

      {/* Circle portaled to body — escapes all stacking contexts */}
      {!flipMode && createPortal(
        <div ref={circleRef} className="spotlight-circle" aria-hidden="true">
          <div ref={behindRef} className="spotlight-behind">
            <span>{safeBehind}</span>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
