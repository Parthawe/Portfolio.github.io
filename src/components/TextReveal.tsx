import { useRef, useState, useCallback, useEffect } from 'react'

/**
 * Spotlight: cursor dot grows smoothly into orange circle.
 * Circle is ALWAYS mounted (not conditional) — CSS handles show/hide via opacity.
 * This ensures the size transition from 8px → 320px is always visible.
 */

interface Props {
  front: string
  behind: string
  className?: string
}

export default function TextReveal({ front, behind, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -200, y: -200 })
  const [hovered, setHovered] = useState(false)
  const fullSize = 320

  // Track cursor position on the circle element directly (no React re-renders)
  const updateCircle = useCallback(() => {
    const el = circleRef.current
    if (!el) return
    el.style.left = `${mouseRef.current.x}px`
    el.style.top = `${mouseRef.current.y}px`

    // Update text offset
    const rect = containerRef.current?.getBoundingClientRect()
    const textEl = el.querySelector('.spotlight-text') as HTMLElement | null
    if (rect && textEl) {
      const half = fullSize / 2
      textEl.style.left = `${rect.left - (mouseRef.current.x - half)}px`
      textEl.style.top = `${rect.top - (mouseRef.current.y - half)}px`
      textEl.style.width = `${rect.width}px`
      textEl.style.height = `${rect.height}px`
    }
  }, [])

  const handleMove = useCallback((e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
    requestAnimationFrame(updateCircle)
  }, [updateCircle])

  const handleEnter = useCallback((e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
    updateCircle()
    // Force the circle to start at dot size BEFORE adding the open class
    const el = circleRef.current
    if (el) {
      el.style.width = '8px'
      el.style.height = '8px'
      el.style.opacity = '1'
      // Force reflow so the browser registers the 8px size
      void el.offsetWidth
      // NOW grow to full size — CSS transition animates it
      el.style.width = `${fullSize}px`
      el.style.height = `${fullSize}px`
    }
    setHovered(true)
  }, [updateCircle])

  const handleLeave = useCallback(() => {
    const el = circleRef.current
    if (el) {
      // Shrink back to dot
      el.style.width = '8px'
      el.style.height = '8px'
      // After shrink animation, hide
      setTimeout(() => {
        if (!circleRef.current) return
        circleRef.current.style.opacity = '0'
      }, 400)
    }
    setHovered(false)
  }, [])

  // Track cursor during leave too
  useEffect(() => {
    if (!hovered) return
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      requestAnimationFrame(updateCircle)
    }
    // Use document-level listener so it tracks even as mouse leaves the container
    document.addEventListener('mousemove', onMove, { passive: true })
    return () => document.removeEventListener('mousemove', onMove)
  }, [hovered, updateCircle])

  // Hide comet cursor while hovering
  useEffect(() => {
    if (hovered) {
      document.body.classList.add('spotlight-active')
    } else {
      document.body.classList.remove('spotlight-active')
    }
    return () => document.body.classList.remove('spotlight-active')
  }, [hovered])

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

      {/* Always mounted — opacity controls visibility, CSS transition handles size */}
      <div
        ref={circleRef}
        className="spotlight-overlay"
        style={{ opacity: 0, width: 8, height: 8 }}
        aria-hidden="true"
      >
        <div className="spotlight-text" style={{ opacity: 1 }}>
          <span>{behind}</span>
        </div>
      </div>
    </>
  )
}
