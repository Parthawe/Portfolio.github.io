import { useEffect, useRef } from 'react'

const TEXT_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,[data-cursor-text]'
const EXCLUDED_SELECTOR = [
  'header',
  'nav',
  'footer',
  '.nav',
  '.figma-chrome',
  '.site-tools',
  '.pcard',
  '.project-card',
  '.proj-hero',
  '.proj-visual-hero',
  '.proj-visual-stage',
  '.cs-img',
  '.cs-img-full',
  'figure',
  'img',
  'picture',
  'video',
  'canvas',
  'svg',
  '[data-cursor-exclude]',
].join(',')
const SECTION_SELECTOR = 'section,article,.cs-section-content,.wr-reveal-section,.abt-beyond'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

function CursorGlyph() {
  return (
    <svg className="reading-cursor__glyph" viewBox="0 0 20 26" aria-hidden="true">
      <path
        d="M3 2.5 16.5 15l-7.1 1.3 4 6.8-3.7 1.8-4-6.8L3 23.5V2.5Z"
        fill="currentColor"
        stroke="var(--reading-cursor-stroke)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CollaboratorCursor() {
  const parthRef = useRef<HTMLDivElement>(null)
  const youRef = useRef<HTMLDivElement>(null)
  const lastText = useRef<HTMLElement | null>(null)
  const pointer = useRef({ x: -160, y: -160, seen: false })
  const frame = useRef<number | null>(null)

  useEffect(() => {
    const setPosition = (element: HTMLDivElement | null, x: number, y: number, visible: boolean) => {
      if (!element) return
      element.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`
      element.classList.toggle('is-visible', visible)
    }

    const isReadable = (element: HTMLElement | null) =>
      Boolean(element && element.textContent?.trim() && !element.closest(EXCLUDED_SELECTOR))

    const nearestText = () => {
      let closest: HTMLElement | null = null
      let score = Number.POSITIVE_INFINITY

      document.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach(candidate => {
        if (!isReadable(candidate)) return
        const rect = candidate.getBoundingClientRect()
        if (rect.bottom < 92 || rect.top > window.innerHeight - 72) return
        const candidateScore = Math.abs(rect.top + rect.height * 0.5 - window.innerHeight * 0.46)
        if (candidateScore < score) {
          closest = candidate
          score = candidateScore
        }
      })

      return closest
    }

    const paint = () => {
      frame.current = null
      const target = lastText.current && isReadable(lastText.current) ? lastText.current : nearestText()

      if (target && parthRef.current) {
        const section = target.closest(SECTION_SELECTOR) as HTMLElement | null
        const targetRect = target.getBoundingClientRect()
        const sectionRect = section?.getBoundingClientRect() ?? targetRect
        const visibleTop = Math.max(88, sectionRect.top)
        const visibleBottom = Math.min(window.innerHeight - 60, sectionRect.bottom)
        const progress = clamp(
          (window.innerHeight * 0.5 - sectionRect.top) / Math.max(sectionRect.height, 1),
          0,
          1,
        )
        const y = visibleTop + Math.max(0, visibleBottom - visibleTop) * progress
        const rightX = targetRect.right + 16
        const x = rightX <= window.innerWidth - 110 ? rightX : Math.max(24, targetRect.left - 112)
        setPosition(parthRef.current, x, y, true)
      } else {
        setPosition(parthRef.current, -160, -160, false)
      }

      const youX = clamp(pointer.current.x + 13, 12, window.innerWidth - 76)
      const youY = clamp(pointer.current.y + 14, 12, window.innerHeight - 40)
      setPosition(youRef.current, youX, youY, pointer.current.seen)
    }

    const schedule = () => {
      if (frame.current === null) frame.current = window.requestAnimationFrame(paint)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY, seen: true }
      const element = document.elementFromPoint(event.clientX, event.clientY)
      const text = element instanceof HTMLElement
        ? (element.closest(TEXT_SELECTOR) as HTMLElement | null)
        : null
      if (isReadable(text)) lastText.current = text
      schedule()
    }

    const onScroll = () => {
      // Resolve the current text target at most once per animation frame.
      lastText.current = null
      schedule()
    }

    onScroll()
    document.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame.current !== null) window.cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <div className="reading-cursor-layer" aria-hidden="true">
      <div ref={parthRef} className="reading-cursor reading-cursor--parth">
        <CursorGlyph />
        <span>parth</span>
      </div>
      <div ref={youRef} className="reading-cursor reading-cursor--you">
        <CursorGlyph />
        <span>you</span>
      </div>
    </div>
  )
}
