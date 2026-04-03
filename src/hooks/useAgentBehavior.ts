import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import type { AgentState } from '../components/agent/AgentCharacter'

const IDLE_TIMEOUT = 45_000
const MICRO_MIN = 4_000
const MICRO_MAX = 10_000

// Random micro-actions to keep Folio alive
const MICRO_ACTIONS: { state: AgentState; duration: number }[] = [
  { state: 'waving', duration: 1200 },
  { state: 'walking', duration: 1800 },
  { state: 'thinking', duration: 2500 },
  { state: 'talking', duration: 1500 },
  { state: 'walking', duration: 1200 },
  { state: 'waving', duration: 800 },
]

function randomDelay() {
  return MICRO_MIN + Math.random() * (MICRO_MAX - MICRO_MIN)
}

export function useAgentBehavior() {
  const location = useLocation()
  const [state, setState] = useState<AgentState>('idle')
  const [entered, setEntered] = useState(false)
  const [dockVisible, setDockVisible] = useState(true)
  const [dragging, setDragging] = useState(false)

  const wrapRef = useRef<HTMLDivElement>(null)
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const microTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const prevRoute = useRef(location.pathname)
  const microIndex = useRef(0)
  const chatActive = useRef(false)

  // Drag state refs
  const dragOffset = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const hasMoved = useRef(false)        // user has repositioned (persists across interactions)
  const didDrag = useRef(false)          // this specific pointer session was a drag (reset on pointerup)

  // ── Delayed entry ────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => {
      setEntered(true)
      setState('walking')
    }, 1500)
    const t2 = setTimeout(() => setState('idle'), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // ── Route change, walk briefly ──────────────────────
  useEffect(() => {
    if (prevRoute.current === location.pathname) return
    prevRoute.current = location.pathname
    setState('walking')
    const t = setTimeout(() => {
      setState('waving')
      setTimeout(() => setState('idle'), 1000)
    }, 600)
    return () => clearTimeout(t)
  }, [location.pathname])

  // ── Micro-actions loop, keeps Folio alive ───────────
  useEffect(() => {
    const scheduleNext = () => {
      microTimer.current = setTimeout(() => {
        // Don't interrupt chat states or sleeping
        setState(prev => {
          if (prev !== 'idle' || chatActive.current) {
            scheduleNext()
            return prev
          }

          const action = MICRO_ACTIONS[microIndex.current % MICRO_ACTIONS.length]
          microIndex.current++

          // Return to idle after the micro-action
          setTimeout(() => {
            setState(current => {
              // Only return to idle if we're still in the micro-action state
              if (current === action.state) return 'idle'
              return current
            })
            scheduleNext()
          }, action.duration)

          return action.state
        })
      }, randomDelay())
    }

    scheduleNext()
    return () => { if (microTimer.current) clearTimeout(microTimer.current) }
  }, [])

  // ── Default position based on route ──────────────────
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    if (!hasMoved.current) {
      const isHome = location.pathname === '/'
      if (isHome) {
        el.style.left = '24px'
        el.style.right = 'auto'
      } else {
        el.style.left = ''
        el.style.right = ''
      }
    }
  }, [location.pathname])

  // ── Drag to reposition (long-press to activate) ──────
  // Normal click/tap = toggle chat. Hold 300ms+ then drag = reposition.
  // This prevents interference with scrolling and normal page interaction.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    let pointerId: number | null = null
    let longPressTimer: ReturnType<typeof setTimeout> | null = null
    let dragReady = false
    let startElLeft = 0
    let startElBottom = 0

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.agent-trigger')) return

      pointerId = e.pointerId
      didDrag.current = false
      dragReady = false
      dragStart.current = { x: e.clientX, y: e.clientY }

      const rect = el.getBoundingClientRect()
      startElLeft = rect.left
      startElBottom = window.innerHeight - rect.bottom

      // Start long-press timer, 300ms hold activates drag mode
      longPressTimer = setTimeout(() => {
        dragReady = true
        setDragging(true)
        el.style.transition = 'none'
      }, 300)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (pointerId === null || e.pointerId !== pointerId) return

      const totalDx = e.clientX - dragStart.current.x
      const totalDy = e.clientY - dragStart.current.y

      // If user moves before long-press fires, cancel drag activation
      if (!dragReady && (Math.abs(totalDx) > 5 || Math.abs(totalDy) > 5)) {
        if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null }
        pointerId = null
        return
      }

      if (!dragReady) return

      didDrag.current = true
      hasMoved.current = true

      const newLeft = startElLeft + totalDx
      const newBottom = startElBottom - totalDy

      const clampedLeft = Math.max(0, Math.min(newLeft, window.innerWidth - 64))
      const clampedBottom = Math.max(0, Math.min(newBottom, window.innerHeight - 120))

      el.style.right = 'auto'
      el.style.left = `${clampedLeft}px`
      el.style.bottom = `${clampedBottom}px`
    }

    const onPointerUp = () => {
      if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null }
      pointerId = null
      dragReady = false
      setDragging(false)
      requestAnimationFrame(() => { el.style.transition = '' })
    }

    el.addEventListener('pointerdown', onPointerDown, { passive: true })
    el.addEventListener('pointermove', onPointerMove, { passive: true })
    el.addEventListener('pointerup', onPointerUp, { passive: true })
    el.addEventListener('pointercancel', onPointerUp, { passive: true })

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
      if (longPressTimer) clearTimeout(longPressTimer)
    }
  }, [])

  // ── Watch for bottom nav / dock visibility ───────────
  useEffect(() => {
    const check = () => {
      const dock = document.querySelector('.work-bottom-nav, .cs-bottom-nav')
      if (dock) {
        const hidden = dock.classList.contains('is-hidden')
        setDockVisible(!hidden)
      } else {
        const footer = document.querySelector('.footer')
        if (footer) {
          const rect = footer.getBoundingClientRect()
          setDockVisible(rect.top > window.innerHeight - 100)
        } else {
          setDockVisible(true)
        }
      }
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    const mo = new MutationObserver(check)
    mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] })

    return () => {
      window.removeEventListener('scroll', check)
      mo.disconnect()
    }
  }, [location.pathname])

  // ── Idle → sleep (longer timeout now: 45s) ───────────
  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      setState(prev => prev === 'idle' ? 'sleeping' : prev)
    }, IDLE_TIMEOUT)
  }, [])

  useEffect(() => {
    const wake = () => {
      setState(prev => prev === 'sleeping' ? 'idle' : prev)
      resetIdleTimer()
    }
    window.addEventListener('mousemove', wake, { passive: true })
    window.addEventListener('scroll', wake, { passive: true })
    resetIdleTimer()
    return () => {
      window.removeEventListener('mousemove', wake)
      window.removeEventListener('scroll', wake)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [resetIdleTimer])

  const setAgentState = useCallback((s: AgentState) => {
    setState(s)
    chatActive.current = s === 'thinking' || s === 'talking' || s === 'pointing'
    if (s === 'idle') {
      chatActive.current = false
      resetIdleTimer()
    }
  }, [resetIdleTimer])

  const wake = useCallback(() => {
    setState('idle')
    resetIdleTimer()
  }, [resetIdleTimer])

  return { state, entered, dockVisible, dragging, didDrag, wrapRef, setAgentState, wake, route: location.pathname }
}
