import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { getProjectNarrative } from '../data/agentKnowledge'
import { createChatHistory, sendMessage } from '../services/agentAI'
import { getCursorThinkingLine } from '../services/parthCursorVoice'
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
  'input',
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
  '/ai': { 'how I see it': 'AI gets interesting when the human still has the last word.', 'start here': 'I would start with the AI work that escaped the chat box.' },
  '/ai-wearables': { 'how I see it': 'A tiny display is a ruthless design critic. I like that.', 'start here': 'This is the platform story I would open first.' },
  '/ux': { 'how I see it': 'Pretty screens are the receipt. The decisions are the work.', 'start here': 'Start where research actually changed the product.' },
  '/ux-design': { 'how I see it': 'Pretty screens are the receipt. The decisions are the work.', 'start here': 'Start where research actually changed the product.' },
  '/ui': { 'how I see it': 'Good UI makes trust visible before anyone has to ask.', 'start here': 'This is my most complete product system.' },
  '/design-engineer': { 'how I see it': 'If I can prototype it, we can argue with evidence.', 'start here': 'Start where the design became working behavior.' },
  '/creative-tech': { 'how I see it': 'This is where code stops being a tool and joins the material.', 'start here': 'I would begin with the interaction you can actually feel.' },
  '/installations': { 'how I see it': 'Here, the room is part of the interface. No viewport required.', 'start here': 'Start with the piece people could inhabit.' },
  '/fintech': { 'how I see it': 'Money is stressful enough. The interface should not add suspense.', 'start here': 'I would start with the highest-risk flow.' },
  '/crypto': { 'how I see it': 'Complex rails are fine. Confusing decisions are not.', 'start here': 'Start where transaction risk becomes legible.' },
  '/brand': { 'how I see it': 'A logo is a moment. I care more about the system after it.', 'start here': 'I would start with the broadest visual system.' },
  '/brand-visual': { 'how I see it': 'A logo is a moment. I care more about the system after it.', 'start here': 'I would start with the broadest visual system.' },
  '/healthcare': { 'how I see it': 'When the stakes rise, clarity stops being cosmetic.', 'start here': 'Start with the decision-support work.' },
  '/design-for-good': { 'how I see it': 'Access is part of the system, not the paragraph at the end.', 'start here': 'Start where service and interface meet.' },
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

  if (step.label === 'what shipped') return `${compactWords(project.deep.outcome, step.note, 9)} That is the headline.`
  if (step.label === 'quick version') return `${project.name}, minus the case-study homework.`
  if (step.label === 'why') return `${compactWords(project.deep.challenge, step.note, 10)} That was the real knot.`
  if (step.label === 'what I chose') return `${compactWords(project.deep.insight, step.note, 10)} That is the bet I would make again.`
  if (step.label === 'what changed') return `${compactWords(project.deep.outcome, step.note, 9)} Proof beats polish.`
  return step.note
}

function conversationPrompts(pathname: string) {
  if (pathname === '/') return ['Where should I start?', 'What should I hire you for?', 'Surprise me']
  if (pathname === '/work') return ['Best three?', 'Strongest research?', 'Show me range']
  if (pathname === '/about') return ['What roles fit?', 'Can you code?', 'What drives the work?']
  if (CATEGORY_ROUTES.has(pathname)) return ['Where should I start?', 'What connects these?', 'Strongest proof?']
  return ['Why this?', 'What did I own?', 'What changed?']
}

function contextualQuestion(pathname: string, question: string) {
  const project = getProjectNarrative(pathname.replace(/^\//, ''))
  if (!project) return question

  const normalized = question.toLowerCase().replace(/[?.!]+$/, '').trim()
  if (normalized === 'why this') return `What was the challenge in ${project.name}, and why did it matter?`
  if (normalized === 'what did i own') return `What did Parth own on ${project.name}?`
  if (normalized === 'what changed') return `What was the outcome of ${project.name}?`
  return `On the current ${project.name} project page, ${question}`
}

function pageSteps(pathname: string): ParthStep[] {
  if (pathname === '/') {
    return [
      { selectors: ['#hero'], label: 'welcome', note: 'You made it. I have opinions about where to start.' },
      { selectors: ['.wr-featured-v2 [data-project]:first-of-type', '.wr-featured-v2'], label: 'start here', note: 'Short on time? These are the projects I would defend first.' },
      { selectors: ['.wr-identity'], label: 'about me', note: 'Context behind the pixels. I promise to keep it brief.' },
      { selectors: ['.wr-disciplines'], label: 'what I do', note: 'Products, code, and physical interaction. I dislike staying in one lane.' },
      { selectors: ['.wr-archive'], label: 'more work', note: 'The smaller experiments are where I let the edges get weird.' },
      {
        selectors: ['[data-parth-comment-target]', '.ft-canvas-hint-btn'],
        label: 'your turn',
        note: 'Leave me a note before you go.',
      },
    ]
  }

  if (pathname === '/work') {
    return [
      { selectors: ['.work-page-header'], label: 'welcome', note: 'The whole shelf. I would still only make you open three.' },
      { selectors: ['#work-project-results .pcard:first-of-type', '#work-project-results .work-library-row:first-of-type', '#work-project-results .work-timeline-feature'], label: 'start here', note: 'I would open this first. It makes the clearest argument.' },
      { selectors: ['.work-group--archive', '.work-library-shelves', '.work-timeline-main'], label: 'more work', note: 'Range matters, but not at the cost of a point of view.', quiet: true },
      { selectors: ['[data-parth-comment-target]', '.ft-canvas-hint-btn', 'footer'], label: 'your turn', note: 'Leave me a note if something stood out.' },
    ]
  }

  if (pathname === '/about') {
    return [
      { selectors: ['.abt-photo-hero'], label: 'hello', note: 'I design products, then keep making when nobody asked.' },
      { selectors: ['.abt-table-wrap'], label: 'the path', note: 'The path looks messy. The throughline is not.' },
      { selectors: ['.abt-recognition'], label: 'proof', note: 'Nice signals. I care more about what survived contact with users.' },
      { selectors: ['.abt-vibe'], label: 'code + design', note: 'Code lets me argue with working behavior, not slides.' },
      { selectors: ['.abt-beyond'], label: 'off the clock', note: 'Apparently I do not know how to stop making things.' },
      { selectors: ['[data-parth-comment-target]', '.ft-canvas-hint-btn', 'footer'], label: 'your turn', note: 'Leave me a note before you go.' },
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
    { selectors: ['.proj-visual-hero', '.proj-hero', '.project-hero', '#main-content > section:first-of-type'], label: 'what shipped', note: 'Outcome first. Process has to earn your attention.' },
    { selectors: ['.cs-expand-preview', '#cs-summary', '.cs-quick-summary-shell'], label: 'quick version', note: 'No homework. Here is the useful version.' },
    { selectors: ['#cs-context', '#cs-problem', '#cs-background', '#cs-overview'], label: 'why', note: 'This was the tension I could not leave alone.' },
    { selectors: ['#cs-bet', '#cs-process', '#cs-design', '#cs-concept', '#cs-research', '#cs-challenges', '#cs-discover', '#cs-define', '#cs-develop'], label: 'what I chose', note: 'Here is the bet, including the uncomfortable tradeoff.', avoidDenseMedia: true },
    { selectors: ['#cs-impact', '#cs-results', '#cs-result', '#cs-outcome', '#cs-reflections', '#cs-learning'], label: 'what changed', note: 'If nothing changed, the case study is decoration.' },
    { selectors: ['.next-project', '.cs-next-project', '[class*="next-project"]'], label: 'next one', note: 'I would pair this with the project below.', quiet: true },
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
  const { pathname, search } = useLocation()
  const normalizedPathname = pathname === '/' ? pathname : pathname.replace(/\/+$/, '')
  const routeKey = `${normalizedPathname}${search}`
  const [conversationOpen, setConversationOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [reply, setReply] = useState('')
  const [asking, setAsking] = useState(false)
  const [thinkingLine, setThinkingLine] = useState('Let me think.')
  const layerRef = useRef<HTMLDivElement>(null)
  const parthRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const youRef = useRef<HTMLDivElement>(null)
  const parthCoordinatesRef = useRef<HTMLSpanElement>(null)
  const youCoordinatesRef = useRef<HTMLSpanElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)
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
  const typingStep = useRef<number | null>(null)
  const parkedRef = useRef(false)
  const spokenSteps = useRef(new Set<number>())
  const ambientCountRef = useRef(0)
  const lastAmbientAtRef = useRef(0)
  const conversationOpenRef = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const historyRef = useRef(createChatHistory(normalizedPathname))
  const requestIdRef = useRef(0)

  const setConversation = (open: boolean) => {
    const parth = parthRef.current
    if (parth) {
      parth.classList.remove('is-nearby')
      if (open) {
        const rect = parth.getBoundingClientRect()
        parth.dataset.side = rect.left + rect.width / 2 > window.innerWidth / 2 ? 'left' : 'right'
        parth.dataset.vertical = rect.top > window.innerHeight * 0.58 ? 'above' : 'below'
      }
    }
    conversationOpenRef.current = open
    setConversationOpen(open)
    if (open) {
      window.requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  const askParth = async (message: string) => {
    const trimmed = message.trim()
    if (!trimmed || asking) return

    setQuestion('')
    setReply('')
    setAsking(true)
    setThinkingLine(getCursorThinkingLine(trimmed, normalizedPathname))
    historyRef.current.route = normalizedPathname
    const requestId = ++requestIdRef.current

    try {
      const answer = await sendMessage(
        contextualQuestion(normalizedPathname, trimmed),
        historyRef.current,
        undefined,
        { surface: 'cursor' },
      )
      if (requestId === requestIdRef.current) setReply(answer)
    } catch {
      if (requestId === requestIdRef.current) {
        setReply('I dropped the thread. Try that once more?')
      }
    } finally {
      if (requestId === requestIdRef.current) setAsking(false)
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void askParth(question)
  }

  useEffect(() => {
    historyRef.current = createChatHistory(normalizedPathname)
    requestIdRef.current += 1
    conversationOpenRef.current = false
    setConversationOpen(false)
    setQuestion('')
    setReply('')
    setAsking(false)
    ambientCountRef.current = 0
    lastAmbientAtRef.current = 0
  }, [routeKey])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && conversationOpenRef.current) {
        setConversation(false)
        window.requestAnimationFrame(() => triggerRef.current?.focus())
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const advanceToNextSection = () => {
    const parth = parthRef.current
    const available = steps.current
      .map((step, index) => ({ step, index }))
      .filter(({ step }) => document.documentElement.contains(step.element))
    if (!parth || available.length === 0) return

    setConversation(false)

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

    steps.current = []
    activeIndex.current = -1
    spokenSteps.current.clear()
    if (statusRef.current) statusRef.current.textContent = ''
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
      typingStep.current = null
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
      if (conversationOpenRef.current) return
      parkedRef.current = true
      clearParkTimer()
      clearTyping()
      clearTarget()
      setSpeaking(false)
      parth.classList.remove('is-thinking')
      parth.classList.add('is-parked')
      if (noteRef.current) noteRef.current.textContent = ''
      if (labelRef.current) labelRef.current.textContent = 'parth'

      const x = Math.max(24, window.innerWidth - 116)
      const y = clamp(window.innerHeight * 0.62, 124, window.innerHeight - 132)
      parth.dataset.side = 'left'
      parth.dataset.vertical = y > window.innerHeight - 285 ? 'above' : 'below'
      setPosition(parth, x, y, true)
      if (parthCoordinatesRef.current) parthCoordinatesRef.current.textContent = cursorCoordinates(x, y)
    }

    const updateProximity = (x: number, y: number) => {
      const trigger = triggerRef.current
      if (!trigger || conversationOpenRef.current || !parth.classList.contains('is-visible')) {
        parth.classList.remove('is-nearby')
        return
      }

      const rect = trigger.getBoundingClientRect()
      const distanceX = Math.max(rect.left - x, 0, x - rect.right)
      const distanceY = Math.max(rect.top - y, 0, y - rect.bottom)
      parth.classList.toggle('is-nearby', Math.hypot(distanceX, distanceY) <= 96)
    }

    const schedulePark = (delay = 4200) => {
      clearParkTimer()
      parkTimer.current = window.setTimeout(parkCursor, delay)
    }

    const typeNote = (message: string, stepIndex: number) => {
      const note = noteRef.current
      if (!note || !message || conversationOpenRef.current) return
      const now = Date.now()
      if (
        ambientCountRef.current >= 3
        || (lastAmbientAtRef.current > 0 && now - lastAmbientAtRef.current < 9_000)
      ) {
        schedulePark(1800)
        return
      }
      clearTyping()
      note.textContent = ''
      if (statusRef.current) statusRef.current.textContent = message
      setSpeaking(true)
      parth.classList.add('is-typing')
      typingStep.current = stepIndex
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
          typingStep.current = null
          spokenSteps.current.add(stepIndex)
          ambientCountRef.current += 1
          lastAmbientAtRef.current = Date.now()
          schedulePark()
        }
      }

      typeTimer.current = window.setTimeout(tick, 80)
    }

    const refreshSteps = () => {
      const suppressed = Boolean(document.querySelector('#main-content.not-found'))
      if (layerRef.current) layerRef.current.hidden = suppressed
      document.body.classList.toggle('collaborator-cursor-active', !suppressed)
      if (suppressed) {
        steps.current = []
        activeIndex.current = -1
        return
      }

      const hadSteps = steps.current.length > 0
      steps.current = resolveSteps(normalizedPathname)
      if (!hadSteps && steps.current.length > 0) {
        activeIndex.current = -1
        parkedRef.current = false
        parth.classList.remove('is-parked')
      } else if (activeIndex.current >= steps.current.length) {
        activeIndex.current = -1
      }
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
        const message = intelligentNote(normalizedPathname, step)
        if (noteRef.current) noteRef.current.textContent = ''
        schedule()
        setSpeaking(false)
        clearTyping()
        if (settleTimer.current !== null) window.clearTimeout(settleTimer.current)
        if (thinkingTimer.current !== null) window.clearTimeout(thinkingTimer.current)
        const ambientDelay = ambientCountRef.current === 0 ? 700 : 320
        thinkingTimer.current = window.setTimeout(() => {
          thinkingTimer.current = null
          schedule()
          if (!step.quiet && !spokenSteps.current.has(index)) typeNote(message, index)
          else schedulePark(2600)
        }, ambientDelay)
      }
    }

    const paint = () => {
      frame.current = null
      if (!conversationOpenRef.current) {
        const index = chooseStep()
        const step = index >= 0 ? steps.current[index] : null

        if (step) positionParth(step, index)
        else parkCursor()
      }

      const youX = clamp(pointer.current.x - YOU_CURSOR_TIP_OFFSET.x, 0, window.innerWidth - 118)
      const youY = clamp(pointer.current.y - YOU_CURSOR_TIP_OFFSET.y, 0, window.innerHeight - 42)
      const hoveredRect = hoveredLabelTarget.current?.getBoundingClientRect()
      const shouldLiftLabel = parth.classList.contains('is-nearby') || Boolean(
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
      updateProximity(event.clientX, event.clientY)
      const hoverElement = document.elementFromPoint(event.clientX, event.clientY)
      hoveredLabelTarget.current = hoverElement instanceof HTMLElement
        ? hoverElement.closest<HTMLElement>(LABEL_AVOID_SELECTOR)
        : null
      schedule()
    }

    const onScroll = () => {
      if (conversationOpenRef.current) {
        schedule()
        return
      }
      parkedRef.current = false
      clearParkTimer()
      if (thinkingTimer.current !== null) {
        window.clearTimeout(thinkingTimer.current)
        thinkingTimer.current = null
      }
      parth.classList.remove('is-parked')
      paint()
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current)
      settleTimer.current = window.setTimeout(() => {
        settleTimer.current = null
        const index = activeIndex.current
        const step = steps.current[index]
        if (step && !step.quiet && !spokenSteps.current.has(index) && typingStep.current !== index) {
          typeNote(intelligentNote(normalizedPathname, step), index)
        } else if (!step || step.quiet || spokenSteps.current.has(index)) {
          schedulePark(1800)
        }
      }, 480)
    }

    const onVisibilityChange = () => {
      parth.classList.toggle('is-page-hidden', document.hidden)
    }

    const routeObserver = new MutationObserver(() => {
      if (steps.current.length === 0) refreshSteps()
    })
    routeObserver.observe(document.body, { childList: true, subtree: true })

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
      routeObserver.disconnect()
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
  }, [routeKey])

  return (
    <div ref={layerRef} className={`reading-cursor-layer${conversationOpen ? ' is-conversing' : ''}`}>
      <div
        ref={parthRef}
        className={`reading-cursor reading-cursor--parth${conversationOpen ? ' is-conversing' : ''}`}
        data-side="right"
      >
        <button
          ref={triggerRef}
          type="button"
          className="reading-cursor__trigger"
          aria-label={conversationOpen ? 'Close Ask Parth' : 'Ask Parth about this work'}
          aria-expanded={conversationOpen}
          onClick={() => setConversation(!conversationOpen)}
        >
          <PointerCursorGlyph className="reading-cursor__glyph" />
          <span className="reading-cursor__identity">
            <span ref={labelRef} className="reading-cursor__tag">parth</span>
            <span ref={parthCoordinatesRef} className="reading-cursor__coordinates">00,00</span>
          </span>
        </button>
        <div className="reading-cursor__invite" aria-hidden="true">
          Click to ask. I have opinions.
        </div>
        <div ref={noteRef} className="reading-cursor__note" aria-hidden="true" />
        <span ref={statusRef} className="sr-only" role="status" aria-live="polite" aria-atomic="true" />
        {conversationOpen && (
          <div className="reading-cursor__conversation" role="dialog" aria-label="Ask Parth about the portfolio">
            <div className="reading-cursor__conversation-head">
              <span>Ask me about this work</span>
              <div className="reading-cursor__conversation-actions">
                <button type="button" onClick={advanceToNextSection} aria-label="Go to the next section" title="Next section">&#8595;</button>
                <button type="button" onClick={() => setConversation(false)} aria-label="Close Ask Parth" title="Close">&#215;</button>
              </div>
            </div>
            {(asking || reply) && (
              <div className={`reading-cursor__reply${asking ? ' is-thinking' : ''}`} role="status" aria-live="polite">
                {asking ? thinkingLine : reply}
              </div>
            )}
            {!asking && !reply && (
              <div className="reading-cursor__prompts" aria-label="Suggested questions">
                {conversationPrompts(normalizedPathname).map(prompt => (
                  <button key={prompt} type="button" onClick={() => { void askParth(prompt) }}>{prompt}</button>
                ))}
              </div>
            )}
            <form className="reading-cursor__form" onSubmit={onSubmit}>
              <input
                ref={inputRef}
                value={question}
                onChange={event => setQuestion(event.target.value)}
                maxLength={500}
                placeholder={reply ? 'Ask a follow-up' : 'Ask one good question'}
                aria-label="Question for Parth"
                disabled={asking}
              />
              <button type="submit" disabled={asking || !question.trim()} aria-label="Send question">Send</button>
            </form>
          </div>
        )}
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
