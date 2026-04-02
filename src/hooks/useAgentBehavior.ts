import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import type { AgentState } from '../components/agent/AgentCharacter'

const IDLE_TIMEOUT = 30_000

export function useAgentBehavior() {
  const location = useLocation()
  const [state, setState] = useState<AgentState>('idle')
  const [entered, setEntered] = useState(false)
  const [dockVisible, setDockVisible] = useState(true)

  const wrapRef = useRef<HTMLDivElement>(null)
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const prevRoute = useRef(location.pathname)

  // Delayed entry — walk in from left
  useEffect(() => {
    const t1 = setTimeout(() => {
      setEntered(true)
      setState('walking')
    }, 1500)
    const t2 = setTimeout(() => setState('idle'), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Route change — walk briefly
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

  // Watch for bottom nav / dock visibility
  useEffect(() => {
    const check = () => {
      const dock = document.querySelector('.work-bottom-nav, .cs-bottom-nav')
      if (dock) {
        const hidden = dock.classList.contains('is-hidden')
        setDockVisible(!hidden)
      } else {
        // No dock on this page — check if footer is near
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
    const body = document.body
    mo.observe(body, { subtree: true, attributes: true, attributeFilter: ['class'] })

    return () => {
      window.removeEventListener('scroll', check)
      mo.disconnect()
    }
  }, [location.pathname])

  // Idle → sleep
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
    if (s === 'idle') resetIdleTimer()
  }, [resetIdleTimer])

  const wake = useCallback(() => {
    setState('idle')
    resetIdleTimer()
  }, [resetIdleTimer])

  return { state, entered, dockVisible, wrapRef, setAgentState, wake, route: location.pathname }
}
