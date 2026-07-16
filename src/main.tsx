import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './styles/globals.css'
import {
  applyPerformanceModeClass,
  isLowPowerDevice,
  isPerformanceDegraded,
  PERFORMANCE_MODE_EVENT,
  prefersReducedMotion,
  startRuntimePerformanceMonitor,
} from './utils/performance'

applyPerformanceModeClass()

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
  if (prefersReducedMotion()) return false
  if (isLowPowerDevice()) return false
  if (isPerformanceDegraded()) return false
  if (window.innerWidth < 1181) return false
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return false
  return true
}

function startLenis() {
  if (!shouldUseLenis()) return

  import('lenis').then(({ default: Lenis }) => {
    if (!shouldUseLenis()) return

    const lenis = new Lenis({
      duration: 0.58,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: 1.15,
      wheelMultiplier: 0.9,
      overscroll: false,
    })

    const scrollLimit = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    let maxScroll = scrollLimit()
    const updateScrollLimit = () => {
      maxScroll = scrollLimit()
    }
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateScrollLimit) : null
    resizeObserver?.observe(document.documentElement)
    window.addEventListener('resize', updateScrollLimit, { passive: true })

    let frameId = 0
    let stopped = false

    const stop = () => {
      if (stopped) return
      stopped = true
      cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', updateScrollLimit)
      window.removeEventListener(PERFORMANCE_MODE_EVENT, stop)
      lenis.destroy()
      delete (window as unknown as Record<string, unknown>).__lenis
    }

    function raf(time: number) {
      if (stopped) return
      lenis.raf(time)
      if (window.scrollY > maxScroll + 2) {
        lenis.scrollTo(maxScroll, { immediate: true })
      }
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)
    window.addEventListener(PERFORMANCE_MODE_EVENT, stop)

    ;(window as unknown as Record<string, unknown>).__lenis = lenis
  })
}

// Smooth scroll is a desktop enhancement. Native scrolling is faster and cleaner on touch.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    startRuntimePerformanceMonitor()
    const idleWindow = window as IdleCapableWindow
    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleWindow.requestIdleCallback(startLenis, { timeout: 2400 })
    } else {
      window.setTimeout(startLenis, 1200)
    }
  })
})
