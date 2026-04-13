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

// Lazy-load Lenis smooth scroll after first paint
requestAnimationFrame(() => {
  import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration: 0.8,          // faster, more responsive (was 1.2)
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic, natural feel
      touchMultiplier: 1.5,   // less aggressive on trackpad (was 2)
      wheelMultiplier: 1,     // native wheel speed
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    ;(window as unknown as Record<string, unknown>).__lenis = lenis
  })
})
