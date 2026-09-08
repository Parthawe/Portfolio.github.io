import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './styles/globals.css'
import {
  applyPerformanceModeClass,
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

// Wheel and touch stay native; explicit navigation owns smooth scrolling.
requestAnimationFrame(() => requestAnimationFrame(startRuntimePerformanceMonitor))
