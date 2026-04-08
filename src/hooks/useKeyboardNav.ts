import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { projects } from '../data/projects'

/**
 * Keyboard shortcuts for portfolio navigation:
 * - Esc on project pages → back to /work
 * - ? → show shortcut hint (console only for now)
 */
const PROJECT_PATHS = new Set(projects.map(project => `/${project.slug}`))

export function useKeyboardNav(enabled = true) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!enabled) return

    const handler = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      const overlayOpen =
        !!document.querySelector('.lightbox-overlay.active') ||
        !!document.querySelector('.mobile-overlay.open') ||
        !!document.querySelector('.agent-floating')

      // Esc → go back to /work from project pages
      if (e.key === 'Escape' && PROJECT_PATHS.has(pathname) && !overlayOpen) {
        e.preventDefault()
        navigate('/work')
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [enabled, navigate, pathname])
}
