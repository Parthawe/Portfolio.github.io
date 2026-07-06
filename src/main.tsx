import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)

type IdleCapableWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: { timeout: number }) => number
}

function shouldUseLenis() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return false
  return true
}

function startLenis() {
  if (!shouldUseLenis()) return

  import('lenis').then(({ default: Lenis }) => {
    if (!shouldUseLenis()) return

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    ;(window as unknown as Record<string, unknown>).__lenis = lenis
  })
}

// Smooth scroll is a desktop enhancement. Native scrolling is faster and cleaner on touch.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const idleWindow = window as IdleCapableWindow
    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleWindow.requestIdleCallback(startLenis, { timeout: 2400 })
    } else {
      window.setTimeout(startLenis, 1200)
    }
  })
})
