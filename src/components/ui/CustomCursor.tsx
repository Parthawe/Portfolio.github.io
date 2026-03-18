import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const visible = useRef(false)

  useEffect(() => {
    // Only on desktop with pointer
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    if (!dot) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible.current) {
        visible.current = true
        dot.style.opacity = '1'
      }
      dot.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
    }

    const onLeave = () => {
      visible.current = false
      dot.style.opacity = '0'
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    // Add cursor-none to html
    document.documentElement.style.cursor = 'none'
    // Also override on interactive elements
    const style = document.createElement('style')
    style.textContent = 'a, button, [role="button"], input, textarea, select { cursor: none !important; }'
    document.head.appendChild(style)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.style.cursor = ''
      style.remove()
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: '#fff',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    />
  )
}
