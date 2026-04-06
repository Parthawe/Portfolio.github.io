import { useState, useEffect, useCallback, useRef } from 'react'

interface LightboxState {
  src: string
  alt: string
}

export default function Lightbox() {
  const [state, setState] = useState<LightboxState | null>(null)
  const prevFocusRef = useRef<Element | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setState(null)
    // Restore focus to the element that triggered the lightbox
    if (prevFocusRef.current instanceof HTMLElement) {
      prevFocusRef.current.focus()
      prevFocusRef.current = null
    }
  }, [])

  // Listen for clicks on case study images
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const img = (e.target as Element).closest('.cs-img-full img, .proj-hero-img img') as HTMLImageElement | null
      if (!img) return
      e.preventDefault()
      prevFocusRef.current = document.activeElement
      setState({ src: img.src, alt: img.alt || '' })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Focus trap + keyboard handling
  useEffect(() => {
    if (!state) return

    // Focus the close button when lightbox opens
    requestAnimationFrame(() => closeRef.current?.focus())

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return }

      // Focus trap — keep Tab within the lightbox
      if (e.key === 'Tab' && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>('button, [tabindex]')
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
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
      ref={overlayRef}
      className={`lightbox-overlay${state ? ' active' : ''}`}
      onClick={close}
      role={state ? 'dialog' : undefined}
      aria-modal={state ? true : undefined}
      aria-label={state ? 'Image preview' : undefined}
      aria-hidden={!state}
    >
      <button ref={closeRef} className="lightbox-close" onClick={close} aria-label="Close lightbox">
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
