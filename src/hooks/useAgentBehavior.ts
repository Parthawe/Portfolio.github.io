import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import type { AgentState } from '../components/agent/AgentCharacter'

const IDLE_TIMEOUT = 30_000

export function useAgentBehavior() {
  const location = useLocation()
  const [state, setState] = useState<AgentState>('idle')
  const [entered, setEntered] = useState(false)

  const wrapRef = useRef<HTMLDivElement>(null)
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const prevRoute = useRef(location.pathname)

  // Delayed entry
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 2000)
    return () => clearTimeout(t)
  }, [])

  // Route change — brief wave
  useEffect(() => {
    if (prevRoute.current === location.pathname) return
    prevRoute.current = location.pathname
    setState('waving')
    const t = setTimeout(() => setState('idle'), 1200)
    return () => clearTimeout(t)
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

  return { state, entered, wrapRef, setAgentState, wake, route: location.pathname }
}
