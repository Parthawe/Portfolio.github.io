import { useState, useEffect, useCallback, useRef } from 'react'

interface LightboxState {
  src: string
  alt: string
}

const LIGHTBOX_TRIGGER_SELECTOR = '.cs-img-full img, .proj-hero-img img'

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

  const openFromImage = useCallback((img: HTMLImageElement) => {
    prevFocusRef.current = document.activeElement
    setState({ src: img.src, alt: img.alt || '' })
  }, [])

  // Listen for clicks on case study images
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return // only left-click opens lightbox
      const img = (e.target as Element).closest(LIGHTBOX_TRIGGER_SELECTOR) as HTMLImageElement | null
      if (!img) return
      e.preventDefault()
      openFromImage(img)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [openFromImage])

  // Make zoomable images keyboard reachable without changing the visual UI
  useEffect(() => {
    const decorate = (root: ParentNode) => {
      root.querySelectorAll<HTMLImageElement>(LIGHTBOX_TRIGGER_SELECTOR).forEach(img => {
        img.tabIndex = 0
        img.setAttribute('role', 'button')
        img.setAttribute('aria-haspopup', 'dialog')
        img.setAttribute('aria-label', img.alt ? `Open image preview: ${img.alt}` : 'Open image preview')
      })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return
      const target = e.target
      if (!(target instanceof HTMLImageElement) || !target.matches(LIGHTBOX_TRIGGER_SELECTOR)) return
      e.preventDefault()
      openFromImage(target)
    }

    decorate(document)
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return
          decorate(node)
        })
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      observer.disconnect()
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openFromImage])

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
      <button ref={closeRef} className="lightbox-close" type="button" onClick={close} aria-label="Close lightbox">
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
