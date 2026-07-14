import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { getProjectNarrative } from '../data/agentKnowledge'
import PointerCursorGlyph from './PointerCursorGlyph'

type ParthStep = {
  selectors: string[]
  note: string
  label: string
  quiet?: boolean
  avoidDenseMedia?: boolean
}

type ResolvedStep = ParthStep & {
  element: HTMLElement
  anchor: HTMLElement
}

const CATEGORY_ROUTES = new Set([
  '/ai',
  '/ux',
  '/ux-design',
  '/ui',
  '/design-engineer',
  '/creative-tech',
  '/installations',
  '/brand',
  '/brand-visual',
  '/healthcare',
  '/fintech',
  '/design-for-good',
  '/crypto',
  '/ai-wearables',
])

const UI_EXCLUSION_SELECTOR = [
  'nav',
  '.nav',
  '.figma-chrome',
  '.site-tools',
  '.lightbox',
  '[role="dialog"]',
  '[data-cursor-exclude]',
].join(',')

const ANCHOR_SELECTOR = [
  '[data-parth-anchor]',
  'h1',
  'h2',
  'h3',
  '.cs-section-title',
  '.work-group-head',
  '.lp-section-label',
  '.pcard',
  '.project-card',
  'a',
].join(',')

const LABEL_AVOID_SELECTOR = [
  'a',
  'button',
  '[role="button"]',
  '[data-parth-anchor]',
  '.pcard',
  '.project-card',
  '.hero-cta',
  '.wr-cta',
  '.lp-hero a',
].join(',')

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const YOU_CURSOR_TIP_OFFSET = { x: 2, y: 4 }

const CATEGORY_CUES: Record<string, Partial<Record<string, string>>> = {
  '/ai': { 'how I see it': 'I keep human judgment in the loop.', 'start here': 'I would start with AI that ships on hardware.' },
  '/ai-wearables': { 'how I see it': 'I design for glances, voice, and real hardware.', 'start here': 'This is the platform story I would open first.' },
  '/ux': { 'how I see it': 'I follow the decisions, not just the screens.', 'start here': 'Start where research changed the product.' },
  '/ux-design': { 'how I see it': 'I follow the decisions, not just the screens.', 'start here': 'Start where research changed the product.' },
  '/ui': { 'how I see it': 'I use the interface to make trust visible.', 'start here': 'This is my most complete product system.' },
  '/design-engineer': { 'how I see it': 'For me, the prototype is part of the argument.', 'start here': 'Start where the design became working behavior.' },
  '/creative-tech': { 'how I see it': 'This is where I bring code, material, and interaction together.', 'start here': 'I would begin with the live interaction.' },
  '/installations': { 'how I see it': 'Here, the room becomes part of the interface.', 'start here': 'Start with the piece people could inhabit.' },
  '/fintech': { 'how I see it': 'I make money movement feel legible and trustworthy.', 'start here': 'I would start with the highest-risk flow.' },
  '/crypto': { 'how I see it': 'I turn complex rails into calmer decisions.', 'start here': 'Start where transaction risk becomes legible.' },
  '/brand': { 'how I see it': 'I build identities that hold together as systems.', 'start here': 'I would start with the broadest visual system.' },
  '/brand-visual': { 'how I see it': 'I build identities that hold together as systems.', 'start here': 'I would start with the broadest visual system.' },
  '/healthcare': { 'how I see it': 'I design for clarity when the stakes are high.', 'start here': 'Start with the decision-support work.' },
  '/design-for-good': { 'how I see it': 'I treat access as part of the system, not an add-on.', 'start here': 'Start where service and interface meet.' },
}

function compactWords(value: string | undefined, fallback: string, limit = 10) {
  if (!value) return fallback
  const firstSentence = (value.match(/^[^.!?]+[.!?]?/)?.[0] ?? value).replace(/[.!?]+$/, '')
  const words = firstSentence.split(/\s+/).filter(Boolean)
  const compact = words.length > limit ? `${words.slice(0, limit).join(' ')}...` : firstSentence
  return compact.charAt(0).toUpperCase() + compact.slice(1)
}

function intelligentNote(pathname: string, step: ParthStep) {
  const categoryCue = CATEGORY_CUES[pathname]?.[step.label]
  if (categoryCue) return categoryCue

  const project = getProjectNarrative(pathname.replace(/^\//, ''))
  if (!project?.deep) return step.note

  if (step.label === 'what shipped') return compactWords(project.deep.outcome, step.note, 9)
  if (step.label === 'quick version') return `${project.name}, in one useful pass.`
  if (step.label === 'why') return compactWords(project.deep.challenge, step.note, 10)
  if (step.label === 'what I chose') return compactWords(project.deep.insight, step.note, 10)
  if (step.label === 'what changed') return compactWords(project.deep.outcome, step.note, 9)
  return step.note
}

function pageSteps(pathname: string): ParthStep[] {
  if (pathname === '/') {
    return [
      { selectors: ['#hero'], label: 'welcome', note: "I'll show you the work I would start with." },
      { selectors: ['.wr-featured-v2 [data-project]:first-of-type', '.wr-featured-v2'], label: 'start here', note: 'If you are short on time, I would start with these.' },
      { selectors: ['.wr-identity'], label: 'about me', note: 'A little about me, then back to the work.' },
      { selectors: ['.wr-disciplines'], label: 'what I do', note: 'I work across products, code, and physical interaction.' },
      { selectors: ['.wr-archive'], label: 'more work', note: 'Some of the smaller experiments live here.' },
      {
        selectors: ['[data-parth-comment-target]', '.ft-canvas-hint-btn'],
        label: 'your turn',
        note: 'Leave me a note before you go.',
      },
    ]
  }

  if (pathname === '/work') {
    return [
      { selectors: ['.work-page-header'], label: 'welcome', note: 'The full library, organized for a quick scan.' },
      { selectors: ['#work-project-results .pcard:first-of-type', '#work-project-results .work-library-row:first-of-type', '#work-project-results .work-timeline-feature'], label: 'start here', note: 'I would open this one first.' },
      { selectors: ['.work-group--archive', '.work-library-shelves', '.work-timeline-main'], label: 'more work', note: 'The supporting work shows the range.', quiet: true },
      { selectors: ['[data-parth-comment-target]', '.ft-canvas-hint-btn', 'footer'], label: 'your turn', note: 'Leave me a note if something stood out.' },
    ]
  }

  if (CATEGORY_ROUTES.has(pathname)) {
    return [
      { selectors: ['.ch--landing', '.lp-hero'], label: 'how I see it', note: 'This is how I think about the practice.' },
      { selectors: ['#lp-work .pcard:first-of-type', '#lp-work .project-card:first-of-type'], label: 'start here', note: 'I would open this project first.' },
      { selectors: ['#lp-work .pcard-masonry', '#lp-work .pcard-grid'], label: 'more work', note: 'There is more in the same lane below.', quiet: true },
      { selectors: ['.lp-impact-strip'], label: 'in the world', note: 'This is where the work met real people.' },
      { selectors: ['.lp-parth-does', '.wr-about-card'], label: 'how it connects', note: 'This practice is one part of how I work.', quiet: true },
      { selectors: ['[data-parth-comment-target]', '.ft-canvas-hint-btn', 'footer'], label: 'your turn', note: 'Leave me a note if this work connects.' },
    ]
  }

  return [
    { selectors: ['.proj-visual-hero', '.proj-hero', '.project-hero', '#main-content > section:first-of-type'], label: 'what shipped', note: 'I like to show the outcome first.' },
    { selectors: ['.cs-expand-preview', '#cs-summary', '.cs-quick-summary-shell'], label: 'quick version', note: 'Short on time? This is the two-minute version.' },
    { selectors: ['#cs-context', '#cs-problem', '#cs-background', '#cs-overview'], label: 'why', note: 'This is the problem I was trying to solve.' },
    { selectors: ['#cs-bet', '#cs-process', '#cs-design', '#cs-concept', '#cs-research', '#cs-challenges', '#cs-discover', '#cs-define', '#cs-develop'], label: 'what I chose', note: 'The important decisions live here.', avoidDenseMedia: true },
    { selectors: ['#cs-impact', '#cs-results', '#cs-result', '#cs-outcome', '#cs-reflections', '#cs-learning'], label: 'what changed', note: 'This is what the work changed.' },
    { selectors: ['.next-project', '.cs-next-project', '[class*="next-project"]'], label: 'next one', note: 'This is a good project to open next.', quiet: true },
    { selectors: ['[data-parth-comment-target]', '.ft-canvas-hint-btn', 'footer'], label: 'your turn', note: 'Tell me what stood out.' },
  ]
}

function queryFirst(selectors: string[]) {
  for (const selector of selectors) {
    const element = document.querySelector<HTMLElement>(selector)
    if (element) return element
  }
  return null
}

function mediaDensity(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const area = Math.max(rect.width * rect.height, 1)
  let mediaArea = 0

  element.querySelectorAll<HTMLElement>('img,picture,video,canvas,figure').forEach(media => {
    const mediaRect = media.getBoundingClientRect()
    mediaArea += Math.max(0, mediaRect.width) * Math.max(0, mediaRect.height)
  })

  return Math.min(mediaArea / area, 1)
}

function resolveSteps(pathname: string): ResolvedStep[] {
  return pageSteps(pathname).flatMap(step => {
    const element = queryFirst(step.selectors)
    if (!element || element.closest(UI_EXCLUSION_SELECTOR)) return []
    if (step.avoidDenseMedia && mediaDensity(element) > 0.58) return []

    const anchor = element.matches(ANCHOR_SELECTOR)
      ? element
      : element.querySelector<HTMLElement>(ANCHOR_SELECTOR) ?? element

    return [{ ...step, element, anchor }]
  })
}

function visibleScore(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const viewportTop = 86
  const viewportBottom = window.innerHeight - 72
  const overlap = Math.max(0, Math.min(rect.bottom, viewportBottom) - Math.max(rect.top, viewportTop))
  const visibleRatio = overlap / Math.max(Math.min(rect.height, viewportBottom - viewportTop), 1)
  const centerDistance = Math.abs(rect.top + rect.height * 0.5 - window.innerHeight * 0.48) / window.innerHeight
  return visibleRatio * 2.25 - centerDistance
}

function cursorCoordinates(x: number, y: number) {
  const xPercent = clamp(Math.round((x / Math.max(window.innerWidth, 1)) * 100), 0, 99)
  const yPercent = clamp(Math.round((y / Math.max(window.innerHeight, 1)) * 100), 0, 99)
  return `${String(xPercent).padStart(2, '0')},${String(yPercent).padStart(2, '0')}`
}

export default function CollaboratorCursor() {
  const { pathname } = useLocation()
  const parthRef = useRef<HTMLDivElement>(null)
  const youRef = useRef<HTMLDivElement>(null)
  const parthCoordinatesRef = useRef<HTMLSpanElement>(null)
  const youCoordinatesRef = useRef<HTMLSpanElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const pointer = useRef({ x: -160, y: -160, seen: false })
  const hoveredLabelTarget = useRef<HTMLElement | null>(null)
  const steps = useRef<ResolvedStep[]>([])
  const activeIndex = useRef(-1)
  const frame = useRef<number | null>(null)
  const settleTimer = useRef<number | null>(null)
  const refreshTimer = useRef<number | null>(null)
  const thinkingTimer = useRef<number | null>(null)
  const typeTimer = useRef<number | null>(null)
  const parkTimer = useRef<number | null>(null)
  const actionTimer = useRef<number | null>(null)
  const parkedRef = useRef(false)

  const advanceToNextSection = () => {
    const parth = parthRef.current
    const available = steps.current
      .map((step, index) => ({ step, index }))
      .filter(({ step }) => document.documentElement.contains(step.element))
    if (!parth || available.length === 0) return

    const next = available.find(({ index }) => index > activeIndex.current) ?? available[0]
    if (actionTimer.current !== null) window.clearTimeout(actionTimer.current)
    parth.classList.add('is-thinking')
    actionTimer.current = window.setTimeout(() => {
      parth.classList.remove('is-thinking')
      parkedRef.current = false
      next.step.element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      actionTimer.current = null
    }, 360)
  }

  useEffect(() => {
    const parth = parthRef.current
    const you = youRef.current
    if (!parth || !you) return

    parkedRef.current = false
    document.body.classList.add('collaborator-cursor-active')

    const setPosition = (element: HTMLElement, x: number, y: number, visible: boolean) => {
      element.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`
      element.classList.toggle('is-visible', visible)
    }

    const setSpeaking = (speaking: boolean) => {
      parth.classList.toggle('is-speaking', speaking)
    }

    const clearTyping = () => {
      parth.classList.remove('is-typing')
      if (typeTimer.current !== null) {
        window.clearTimeout(typeTimer.current)
        typeTimer.current = null
      }
    }

    const clearParkTimer = () => {
      if (parkTimer.current !== null) {
        window.clearTimeout(parkTimer.current)
        parkTimer.current = null
      }
    }

    const clearTarget = () => {
      document.querySelectorAll('.is-parth-target').forEach(element => element.classList.remove('is-parth-target'))
    }

    const parkCursor = () => {
      parkedRef.current = true
      clearParkTimer()
      clearTyping()
      clearTarget()
      setSpeaking(false)
      parth.classList.remove('is-thinking')
      parth.classList.add('is-parked')
      if (noteRef.current) noteRef.current.textContent = ''
      if (labelRef.current) labelRef.current.textContent = 'parth'

      const x = Math.max(18, window.innerWidth - 86)
      const y = clamp(window.innerHeight * 0.62, 124, window.innerHeight - 132)
      parth.dataset.side = 'left'
      parth.dataset.vertical = y > window.innerHeight - 285 ? 'above' : 'below'
      setPosition(parth, x, y, true)
      if (parthCoordinatesRef.current) parthCoordinatesRef.current.textContent = cursorCoordinates(x, y)
    }

    const schedulePark = (delay = 4200) => {
      clearParkTimer()
      parkTimer.current = window.setTimeout(parkCursor, delay)
    }

    const typeNote = (message: string) => {
      const note = noteRef.current
      if (!note || !message) return
      clearTyping()
      note.textContent = ''
      setSpeaking(true)
      parth.classList.add('is-typing')
      let index = 0

      const tick = () => {
        if (!noteRef.current) return
        index += 1
        noteRef.current.textContent = message.slice(0, index)
        if (index < message.length) {
          typeTimer.current = window.setTimeout(tick, 24)
        } else {
          parth.classList.remove('is-typing')
          typeTimer.current = null
          schedulePark()
        }
      }

      typeTimer.current = window.setTimeout(tick, 80)
    }

    const refreshSteps = () => {
      steps.current = resolveSteps(pathname)
      if (!parkedRef.current) activeIndex.current = -1
      paint()
    }

    const chooseStep = () => {
      let bestIndex = -1
      let bestScore = -Infinity

      steps.current.forEach((step, index) => {
        if (!document.documentElement.contains(step.element)) return
        const rect = step.element.getBoundingClientRect()
        if (rect.bottom < 72 || rect.top > window.innerHeight - 40) return
        const score = visibleScore(step.element)
        if (score > bestScore) {
          bestIndex = index
          bestScore = score
        }
      })

      return bestIndex
    }

    const positionParth = (step: ResolvedStep, index: number) => {
      if (parkedRef.current && index === activeIndex.current) return

      parkedRef.current = false
      parth.classList.remove('is-parked')
      const anchorRect = step.anchor.getBoundingClientRect()
      const elementRect = step.element.getBoundingClientRect()
      const viewportInset = 18
      const cursorWidth = Math.max(parth.offsetWidth, 128)
      const rightX = anchorRect.right + 4
      const leftX = anchorRect.left - cursorWidth + 26
      const rightFits = rightX + cursorWidth <= window.innerWidth - viewportInset
      let x = rightFits ? rightX : leftX
      let side = rightFits ? 'right' : 'left'

      if (x < viewportInset) {
        x = elementRect.right - cursorWidth + 26
        side = 'inside'
      }

      x = clamp(x, viewportInset, Math.max(viewportInset, window.innerWidth - cursorWidth - viewportInset))
      const y = clamp(anchorRect.bottom - 10, 96, window.innerHeight - 104)
      setPosition(parth, x, y, true)
      parth.dataset.side = side
      parth.dataset.vertical = y > window.innerHeight - 285 ? 'above' : 'below'
      if (parthCoordinatesRef.current) parthCoordinatesRef.current.textContent = cursorCoordinates(x, y)

      if (index !== activeIndex.current) {
        activeIndex.current = index
        clearTarget()
        step.anchor.classList.add('is-parth-target')
        parth.classList.remove('is-thinking')
        if (labelRef.current) labelRef.current.textContent = 'parth'
        const message = intelligentNote(pathname, step)
        if (noteRef.current) noteRef.current.textContent = ''
        schedule()
        setSpeaking(false)
        clearTyping()
        if (settleTimer.current !== null) window.clearTimeout(settleTimer.current)
        if (thinkingTimer.current !== null) window.clearTimeout(thinkingTimer.current)
        thinkingTimer.current = window.setTimeout(() => {
          schedule()
          if (!step.quiet) typeNote(message)
          else schedulePark(2600)
        }, 160)
      }
    }

    const paint = () => {
      frame.current = null
      const index = chooseStep()
      const step = index >= 0 ? steps.current[index] : null

      if (step) positionParth(step, index)
      else parkCursor()

      const youX = clamp(pointer.current.x - YOU_CURSOR_TIP_OFFSET.x, 0, window.innerWidth - 118)
      const youY = clamp(pointer.current.y - YOU_CURSOR_TIP_OFFSET.y, 0, window.innerHeight - 42)
      const hoveredRect = hoveredLabelTarget.current?.getBoundingClientRect()
      const shouldLiftLabel = Boolean(
        hoveredRect &&
        hoveredRect.width > 0 &&
        hoveredRect.height > 0 &&
        pointer.current.x >= hoveredRect.left - 12 &&
        pointer.current.x <= hoveredRect.right + 12 &&
        pointer.current.y >= hoveredRect.top - 12 &&
        pointer.current.y <= hoveredRect.bottom + 12 &&
        hoveredRect.top > 56,
      )
      you.dataset.labelSide = shouldLiftLabel ? 'above' : 'below'
      setPosition(you, youX, youY, pointer.current.seen)
      if (youCoordinatesRef.current) {
        youCoordinatesRef.current.textContent = cursorCoordinates(pointer.current.x, pointer.current.y)
      }
    }

    function schedule() {
      if (frame.current === null) frame.current = window.requestAnimationFrame(paint)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY, seen: true }
      const hoverElement = document.elementFromPoint(event.clientX, event.clientY)
      hoveredLabelTarget.current = hoverElement instanceof HTMLElement
        ? hoverElement.closest<HTMLElement>(LABEL_AVOID_SELECTOR)
        : null
      schedule()
    }

    const onScroll = () => {
      parkedRef.current = false
      clearParkTimer()
      parth.classList.remove('is-parked')
      setSpeaking(false)
      clearTyping()
      paint()
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current)
      settleTimer.current = window.setTimeout(() => {
        const step = steps.current[activeIndex.current]
        if (step && !step.quiet) typeNote(intelligentNote(pathname, step))
      }, 480)
    }

    const onVisibilityChange = () => {
      parth.classList.toggle('is-page-hidden', document.hidden)
    }

    refreshSteps()
    refreshTimer.current = window.setTimeout(refreshSteps, 900)
    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', refreshSteps)

    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', refreshSteps)
      if (frame.current !== null) window.cancelAnimationFrame(frame.current)
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current)
      if (refreshTimer.current !== null) window.clearTimeout(refreshTimer.current)
      if (thinkingTimer.current !== null) window.clearTimeout(thinkingTimer.current)
      if (actionTimer.current !== null) window.clearTimeout(actionTimer.current)
      clearParkTimer()
      clearTyping()
      clearTarget()
      document.body.classList.remove('collaborator-cursor-active')
    }
  }, [pathname])

  return (
    <div className="reading-cursor-layer">
      <div
        ref={parthRef}
        className="reading-cursor reading-cursor--parth"
        data-side="right"
      >
        <button
          type="button"
          className="reading-cursor__trigger"
          aria-label="Go to the next section with Parth"
          onClick={advanceToNextSection}
        >
          <PointerCursorGlyph className="reading-cursor__glyph" />
          <span className="reading-cursor__identity">
            <span ref={labelRef} className="reading-cursor__tag">parth</span>
            <span ref={parthCoordinatesRef} className="reading-cursor__coordinates">00,00</span>
          </span>
        </button>
        <div ref={noteRef} className="reading-cursor__note" aria-live="polite" />
      </div>
      <div ref={youRef} className="reading-cursor reading-cursor--you" aria-hidden="true">
        <PointerCursorGlyph className="reading-cursor__glyph" />
        <div className="reading-cursor__identity">
          <span className="reading-cursor__tag">you</span>
          <span ref={youCoordinatesRef} className="reading-cursor__coordinates">00,00</span>
        </div>
      </div>
    </div>
  )
}
