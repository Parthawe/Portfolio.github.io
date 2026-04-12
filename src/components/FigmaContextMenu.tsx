import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface MenuItem {
  label: string
  shortcut?: string
  action?: () => void
  divider?: boolean
}

export default function FigmaContextMenu() {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleContext = useCallback((e: MouseEvent) => {
    e.preventDefault()
    const x = Math.min(e.clientX, window.innerWidth - 240)
    const y = Math.min(e.clientY, window.innerHeight - 400)
    setPos({ x, y })
    setOpen(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    document.addEventListener('contextmenu', handleContext)
    document.addEventListener('click', close)
    document.addEventListener('scroll', close, { capture: true, passive: true })
    return () => {
      document.removeEventListener('contextmenu', handleContext)
      document.removeEventListener('click', close)
      document.removeEventListener('scroll', close, { capture: true } as EventListenerOptions)
    }
  }, [handleContext, close])

  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, close])

  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).catch(() => {})
    close()
  }, [close])

  const viewSource = useCallback(() => {
    window.open('https://github.com/parthawe/Portfolio.github.io', '_blank')
    close()
  }, [close])

  const go = useCallback((path: string) => {
    navigate(path)
    close()
  }, [navigate, close])

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.dataset.theme
    document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark')
    try { localStorage.setItem('theme', current === 'dark' ? 'light' : 'dark') } catch {}
    close()
  }, [close])

  const items: MenuItem[] = [
    { label: 'Copy Link', shortcut: '\u2318C', action: copyUrl },
    { label: 'View Source', shortcut: '\u2318U', action: viewSource },
    { label: 'divider', divider: true },
    { label: 'Home', shortcut: '\u23181', action: () => go('/') },
    { label: 'Work', shortcut: '\u23182', action: () => go('/work') },
    { label: 'About', shortcut: '\u23183', action: () => go('/about') },
    { label: 'Writing', shortcut: '\u23184', action: () => go('/writing') },
    { label: 'divider', divider: true },
    { label: 'Zoom In', shortcut: '\u2318+', action: () => { document.dispatchEvent(new KeyboardEvent('keydown', { key: '=', metaKey: true })); close() } },
    { label: 'Zoom Out', shortcut: '\u2318\u2212', action: () => { document.dispatchEvent(new KeyboardEvent('keydown', { key: '-', metaKey: true })); close() } },
    { label: 'Zoom to 100%', shortcut: '\u23180', action: () => { document.dispatchEvent(new KeyboardEvent('keydown', { key: '0', metaKey: true })); close() } },
    { label: 'divider', divider: true },
    { label: 'Toggle Theme', shortcut: '\u2318D', action: toggleTheme },
    { label: 'React 19 + Three.js + Tailwind v4', shortcut: '' },
  ]

  if (!open) return null

  return (
    <div
      ref={menuRef}
      className="figma-ctx"
      style={{ left: pos.x, top: pos.y }}
      role="menu"
    >
      {items.map((item, i) =>
        item.divider ? (
          <div key={i} className="figma-ctx-divider" />
        ) : (
          <button
            key={i}
            className="figma-ctx-item"
            onClick={item.action}
            role="menuitem"
            disabled={!item.action}
          >
            <span>{item.label}</span>
            {item.shortcut && <span className="figma-ctx-shortcut">{item.shortcut}</span>}
          </button>
        )
      )}
    </div>
  )
}
