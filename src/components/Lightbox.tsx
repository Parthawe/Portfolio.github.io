import { useState, useEffect, useCallback } from 'react'

interface LightboxState {
  src: string
  alt: string
}

export default function Lightbox() {
  const [state, setState] = useState<LightboxState | null>(null)

  const close = useCallback(() => setState(null), [])

  // Listen for clicks on case study images
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const img = (e.target as Element).closest('.cs-img-full img, .proj-hero-img img') as HTMLImageElement | null
      if (!img) return
      e.preventDefault()
      setState({ src: img.src, alt: img.alt || '' })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Escape key closes
  useEffect(() => {
    if (!state) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [state, close])

  return (
    <div
      className={`lightbox-overlay${state ? ' active' : ''}`}
      onClick={close}
      aria-hidden={!state}
    >
      <button className="lightbox-close" onClick={close} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {state && (
        <>
          <img
            src={state.src}
            alt={state.alt}
            onClick={(e) => e.stopPropagation()}
          />
          {state.alt && <p className="lightbox-caption">{state.alt}</p>}
        </>
      )}
    </div>
  )
}
