import { useState, useEffect, useRef, useCallback } from 'react'

interface Props {
  sections: { id: string; label: string }[]
  projectColor?: string
}

export function BottomNav({ sections, projectColor }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const lastScrollY = useRef(0)

  // Track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(s.id)
        },
        { rootMargin: '-20% 0px -60% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  // Show on scroll, hide after idle, hide near top/bottom
  const handleScroll = useCallback(() => {
    const y = window.scrollY
    const docH = document.documentElement.scrollHeight - window.innerHeight
    const nearTop = y < 400
    const nearBottom = y > docH - 200
    const scrollingDown = y > lastScrollY.current

    lastScrollY.current = y

    if (!hasScrolled && y > 300) setHasScrolled(true)

    if (nearTop || nearBottom) {
      setVisible(false)
    } else if (hasScrolled) {
      // Show when scrolling up (user looking for nav)
      if (!scrollingDown) {
        setVisible(true)
      }
      // Auto-hide after 3s of no scroll activity
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setVisible(false), 3000)
    }
  }, [hasScrolled])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [handleScroll])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (sections.length === 0) return null

  const activeIndex = sections.findIndex((s) => s.id === activeId)
  const progress = activeIndex >= 0 ? (activeIndex + 1) / sections.length : 0

  return (
    <nav
      className="fixed bottom-6 left-1/2 z-[90] flex max-w-[calc(100vw-2rem)] items-center gap-1 overflow-x-auto rounded-full border border-ink-06 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-xl scrollbar-hide"
      style={{
        transform: `translateX(-50%) translateY(${visible ? '0' : '20px'})`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
        background: 'var(--bottom-nav-bg, rgba(250,250,248,0.88))',
      }}
    >
      {/* Progress track */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full transition-[width] duration-500 ease-out"
        style={{
          width: `${progress * 100}%`,
          background: projectColor || 'var(--color-ink)',
          opacity: 0.5,
        }}
      />

      {sections.map((s) => {
        const isActive = activeId === s.id
        return (
          <button
            key={s.id}
            onClick={() => handleClick(s.id)}
            className="shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-all duration-200"
            style={{
              background: isActive ? (projectColor || 'var(--color-ink)') : 'transparent',
              color: isActive ? '#fff' : 'var(--color-ink-40)',
            }}
          >
            {s.label}
          </button>
        )
      })}
    </nav>
  )
}
