import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * Keyboard shortcuts for portfolio navigation:
 * - Esc on project pages → back to /work
 * - ? → show shortcut hint (console only for now)
 */
export function useKeyboardNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      // Esc → go back to /work from project pages
      if (e.key === 'Escape' && pathname !== '/' && pathname !== '/work' && pathname !== '/about') {
        e.preventDefault()
        navigate('/work')
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [navigate, pathname])
}
