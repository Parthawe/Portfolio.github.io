import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Figma-style rulers: top (horizontal) + left (vertical).
 * Left ruler has numbers rotated 90° to match the reference.
 * No background — transparent overlay.
 */

const RULER_SIZE = 22 // px thickness of ruler strip
const MAJOR = 100     // major tick every 100px
const MINOR = 10      // minor tick every 10px

export default function FigmaRuler() {
  const leftRef = useRef<HTMLCanvasElement>(null)
  const topRef = useRef<HTMLCanvasElement>(null)

  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)
  )

  const draw = useCallback(() => {
    const isDark = document.documentElement.dataset.theme === 'dark'
    const tick = isDark ? 'rgba(237,237,236,0.18)' : 'rgba(26,26,26,0.15)'
    const label = isDark ? 'rgba(237,237,236,0.35)' : 'rgba(26,26,26,0.3)'
    const dpr = window.devicePixelRatio || 1
    const sy = window.scrollY
    const vw = window.innerWidth
    const vh = window.innerHeight

    // ── Top ruler (horizontal) ──
    const top = topRef.current
    if (top) {
      const ctx = top.getContext('2d')
      if (ctx) {
        top.width = vw * dpr
        top.height = RULER_SIZE * dpr
        top.style.width = `${vw}px`
        top.style.height = `${RULER_SIZE}px`
        ctx.scale(dpr, dpr)
        ctx.clearRect(0, 0, vw, RULER_SIZE)

        ctx.font = '9px JetBrains Mono, monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'

        for (let px = 0; px <= vw; px += MINOR) {
          if (px % MAJOR === 0) {
            // Major tick + label
            ctx.fillStyle = tick
            ctx.fillRect(px, RULER_SIZE - 8, 1, 8)
            ctx.fillStyle = label
            ctx.fillText(String(px), px, 3)
          } else if (px % 50 === 0) {
            ctx.fillStyle = tick
            ctx.fillRect(px, RULER_SIZE - 5, 0.5, 5)
          } else {
            ctx.fillStyle = tick
            ctx.fillRect(px, RULER_SIZE - 3, 0.5, 3)
          }
        }
      }
    }

    // ── Left ruler (vertical, numbers rotated 90°) ──
    const left = leftRef.current
    if (left) {
      const ctx = left.getContext('2d')
      if (ctx) {
        left.width = RULER_SIZE * dpr
        left.height = vh * dpr
        left.style.width = `${RULER_SIZE}px`
        left.style.height = `${vh}px`
        ctx.scale(dpr, dpr)
        ctx.clearRect(0, 0, RULER_SIZE, vh)

        ctx.font = '9px JetBrains Mono, monospace'

        const startPx = Math.floor(sy / MINOR) * MINOR

        for (let px = startPx; px <= startPx + vh + MINOR; px += MINOR) {
          const y = px - sy

          if (px % MAJOR === 0) {
            // Major tick
            ctx.fillStyle = tick
            ctx.fillRect(RULER_SIZE - 8, y, 8, 1)

            // Rotated label — save, rotate, draw, restore
            ctx.save()
            ctx.translate(RULER_SIZE / 2 - 2, y)
            ctx.rotate(-Math.PI / 2)
            ctx.fillStyle = label
            ctx.textAlign = 'left'
            ctx.textBaseline = 'middle'
            ctx.fillText(String(px), 4, 0)
            ctx.restore()
          } else if (px % 50 === 0) {
            ctx.fillStyle = tick
            ctx.fillRect(RULER_SIZE - 5, y, 5, 0.5)
          } else {
            ctx.fillStyle = tick
            ctx.fillRect(RULER_SIZE - 3, y, 3, 0.5)
          }
        }
      }
    }
  }, [])

  useEffect(() => {
    if (isMobile) return
    draw()
    const onScroll = () => draw()
    const onResize = () => draw()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    const obs = new MutationObserver(draw)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      obs.disconnect()
    }
  }, [isMobile, draw])

  if (isMobile) return null

  return (
    <>
      <canvas ref={topRef} className="figma-ruler-top" aria-hidden="true" />
      <canvas ref={leftRef} className="figma-ruler" aria-hidden="true" />
    </>
  )
}
