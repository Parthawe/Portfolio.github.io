import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import type { AgentState } from '../components/agent/AgentCharacter'

const IDLE_TIMEOUT = 30_000
const MICRO_MIN = 10_000
const MICRO_MAX = 20_000

export function useAgentBehavior() {
  const location = useLocation()
  const [state, setState] = useState<AgentState>('idle')
  const [entered, setEntered] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const microTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const prevRoute = useRef(location.pathname)

  // ── Entry ────────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setEntered(true), 2000)
    const t2 = setTimeout(() => {
      setState('waving')
      setTimeout(() => setState('idle'), 1400)
    }, 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // ── Route change → wave ──────────────────────────────
  useEffect(() => {
    if (prevRoute.current === location.pathname) return
    prevRoute.current = location.pathname
    setState('walking')
    const t = setTimeout(() => {
      setState('waving')
      setTimeout(() => setState('idle'), 1200)
    }, 400)
    return () => clearTimeout(t)
  }, [location.pathname])

  // ── Idle → sleep ─────────────────────────────────────
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

  // ── Scroll-linked Y (direct DOM, no re-renders) ─────
  useEffect(() => {
    let raf = 0
    let currentY = 200
    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const pct = docH > 0 ? window.scrollY / docH : 0
      const minY = 140
      const maxY = window.innerHeight - 120
      const target = minY + pct * (maxY - minY)
      currentY += (target - currentY) * 0.06
      if (wrapRef.current) {
        wrapRef.current.style.top = `${currentY}px`
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ── Micro-animations ─────────────────────────────────
  useEffect(() => {
    const next = () => {
      const delay = MICRO_MIN + Math.random() * (MICRO_MAX - MICRO_MIN)
      microTimer.current = setTimeout(() => {
        setState(prev => {
          if (prev !== 'idle') return prev
          setTimeout(() => setState('idle'), 600)
          return 'waving'
        })
        next()
      }, delay)
    }
    next()
    return () => { if (microTimer.current) clearTimeout(microTimer.current) }
  }, [])

  const setAgentState = useCallback((s: AgentState) => {
    setState(s)
    if (s === 'idle') resetIdleTimer()
  }, [resetIdleTimer])

  const wake = useCallback(() => {
    setState('idle')
    resetIdleTimer()
  }, [resetIdleTimer])

  return { state, entered, wrapRef, setAgentState, wake, route: location.pathname }
}
