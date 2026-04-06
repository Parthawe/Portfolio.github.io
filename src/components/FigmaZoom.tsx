import { useState, useEffect, useCallback } from 'react'

/**
 * Figma-style zoom: Cmd+/- to zoom page, badge shows percentage.
 * Click badge to reset to 100%. Applies CSS transform to body.
 */

const STEPS = [50, 67, 75, 80, 90, 100, 110, 125, 150, 200]

export default function FigmaZoom() {
  const [zoom, setZoom] = useState(100)

  const applyZoom = useCallback((level: number) => {
    document.documentElement.style.setProperty('--page-zoom', String(level / 100))
    const wrapper = document.getElementById('root')
    if (wrapper) {
      if (level === 100) {
        wrapper.style.transform = ''
        wrapper.style.transformOrigin = ''
        wrapper.style.width = ''
        wrapper.style.minHeight = ''
        document.body.style.overflow = ''
      } else {
        const scale = level / 100
        wrapper.style.transform = `scale(${scale})`
        wrapper.style.transformOrigin = 'top center'
        wrapper.style.width = `${100 / scale}%`
        // Prevent white space below by adjusting the wrapper's visual height
        wrapper.style.minHeight = `${100 / scale}vh`
        // Let the body scroll naturally
        document.body.style.overflow = ''
      }
    }
  }, [])

  const zoomIn = useCallback(() => {
    setZoom(prev => {
      const next = STEPS.find(s => s > prev) || prev
      applyZoom(next)
      return next
    })
  }, [applyZoom])

  const zoomOut = useCallback(() => {
    setZoom(prev => {
      const next = [...STEPS].reverse().find(s => s < prev) || prev
      applyZoom(next)
      return next
    })
  }, [applyZoom])

  const zoomReset = useCallback(() => {
    setZoom(100)
    applyZoom(100)
  }, [applyZoom])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return
      if (e.key === '=' || e.key === '+') { e.preventDefault(); zoomIn() }
      if (e.key === '-') { e.preventDefault(); zoomOut() }
      if (e.key === '0') { e.preventDefault(); zoomReset() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomIn, zoomOut, zoomReset])

  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)
  )
  if (isMobile) return null

  return null // zoom controlled via keyboard only (⌘+, ⌘-, ⌘0)
}
