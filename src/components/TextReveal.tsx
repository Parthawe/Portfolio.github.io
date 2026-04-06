import { useRef, useState, useCallback, useEffect } from 'react'

/**
 * Spotlight: cursor dot grows into orange circle on enter,
 * follows cursor while inside, shrinks back to dot on leave.
 * Circle always stays centered on the actual cursor position.
 */

interface Props {
  front: string
  behind: string
  className?: string
}

export default function TextReveal({ front, behind, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const [phase, setPhase] = useState<'idle' | 'growing' | 'open' | 'shrinking'>('idle')

  const fullSize = 320 // diameter
  const dotSize = 8    // cursor dot diameter

  // Continuously update circle position to follow cursor (via RAF, no React re-renders)
  const trackCursor = useCallback(() => {
    const el = circleRef.current
    if (!el) return
    el.style.left = `${mouseRef.current.x}px`
    el.style.top = `${mouseRef.current.y}px`

    // Also update text offset
    const rect = containerRef.current?.getBoundingClientRect()
    const textEl = el.querySelector('.spotlight-text') as HTMLElement | null
    if (rect && textEl) {
      const halfFull = fullSize / 2
      textEl.style.left = `${rect.left - (mouseRef.current.x - halfFull)}px`
      textEl.style.top = `${rect.top - (mouseRef.current.y - halfFull)}px`
      textEl.style.width = `${rect.width}px`
      textEl.style.height = `${rect.height}px`
    }
  }, [])

  const handleMove = useCallback((e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(trackCursor)
  }, [trackCursor])

  const handleEnter = useCallback((e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
    setPhase('growing')
    // After grow animation completes, switch to open
    setTimeout(() => setPhase(prev => prev === 'growing' ? 'open' : prev), 500)
  }, [])

  const handleLeave = useCallback(() => {
    setPhase('shrinking')
    // After shrink animation, go idle
    setTimeout(() => setPhase('idle'), 450)
  }, [])

  // Track cursor even during shrink (so it shrinks AT the cursor)
  useEffect(() => {
    if (phase === 'shrinking') {
      const onMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY }
        requestAnimationFrame(trackCursor)
      }
      document.addEventListener('mousemove', onMove, { passive: true })
      return () => document.removeEventListener('mousemove', onMove)
    }
  }, [phase, trackCursor])

  // Hide custom cursor dots
  useEffect(() => {
    if (phase !== 'idle') {
      document.body.classList.add('spotlight-active')
    } else {
      document.body.classList.remove('spotlight-active')
    }
    return () => document.body.classList.remove('spotlight-active')
  }, [phase])

  const isVisible = phase !== 'idle'
  const isOpen = phase === 'open' || phase === 'growing'
  const currentSize = isOpen ? fullSize : dotSize

  return (
    <>
      <div
        ref={containerRef}
        className={`spotlight-reveal ${className}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
      >
        <div className="spotlight-front">
          <span>{front}</span>
        </div>
      </div>

      {isVisible && (
        <div
          ref={circleRef}
          className={`spotlight-overlay${isOpen ? ' spotlight-overlay--open' : ''}`}
          style={{
            left: mouseRef.current.x,
            top: mouseRef.current.y,
            width: currentSize,
            height: currentSize,
          }}
          aria-hidden="true"
        >
          <div
            className="spotlight-text"
            style={{ opacity: 1 }}
          >
            <span>{behind}</span>
          </div>
        </div>
      )}
    </>
  )
}
