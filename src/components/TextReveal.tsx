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

export default function TextReveal({ front, behind, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const behindRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
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
    setHovered(true)
    document.body.classList.add('spotlight-active')
    startLoop()
  }, [startLoop])

  const handleLeave = useCallback(() => {
    targetRef.current = 0
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
    const onResize = () => {
      rectRef.current = containerRef.current?.getBoundingClientRect() ?? null
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [hovered])

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current)
    document.body.classList.remove('spotlight-active')
  }, [])

  const safeFront = normalizeCopy(front)
  const safeBehind = normalizeCopy(behind)

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
          <span>{safeFront}</span>
        </div>
      </div>

      {/* Circle portaled to body — escapes all stacking contexts */}
      {createPortal(
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
