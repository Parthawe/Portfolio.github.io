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

  // ── Route change — walk briefly ──────────────────────
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

  // ── Micro-actions loop — keeps Folio alive ───────────
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
      el.style.left = isHome ? '24px' : ''
      el.style.right = isHome ? '' : 'max(calc(50% - 280px), 80px)'
    }
  }, [location.pathname])

  // ── Drag to reposition ───────────────────────────────
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    let pointerId: number | null = null

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.agent-trigger')) return

      pointerId = e.pointerId
      didDrag.current = false
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)

      const rect = el.getBoundingClientRect()
      dragOffset.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height,
      }
      dragStart.current = { x: e.clientX, y: e.clientY }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (pointerId === null || e.pointerId !== pointerId) return

      // Use total distance from start, not per-frame delta
      const totalDx = Math.abs(e.clientX - dragStart.current.x)
      const totalDy = Math.abs(e.clientY - dragStart.current.y)
      if (!didDrag.current && totalDx < 5 && totalDy < 5) return

      didDrag.current = true
      hasMoved.current = true
      setDragging(true)

      const x = e.clientX - dragOffset.current.x
      const y = e.clientY - dragOffset.current.y

      const maxX = window.innerWidth - 32
      const maxY = window.innerHeight
      const clampedX = Math.max(32, Math.min(x, maxX))
      const clampedY = Math.max(120, Math.min(y, maxY))

      el.style.right = ''
      el.style.left = `${clampedX - 32}px`
      el.style.bottom = `${window.innerHeight - clampedY}px`
      el.style.transition = 'none'
    }

    const onPointerUp = (e: PointerEvent) => {
      if (pointerId === null || e.pointerId !== pointerId) return
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
      pointerId = null
      setDragging(false)

      requestAnimationFrame(() => { el.style.transition = '' })
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
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
    chatActive.current = s === 'thinking' || s === 'talking'
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
