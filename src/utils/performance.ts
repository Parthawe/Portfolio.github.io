type NavigatorWithPerformanceHints = Navigator & {
  deviceMemory?: number
  connection?: {
    saveData?: boolean
  }
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isLowPowerDevice() {
  if (typeof window === 'undefined') return false

  const nav = navigator as NavigatorWithPerformanceHints
  const memory = nav.deviceMemory
  const cores = nav.hardwareConcurrency
  const touchOrTablet = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 1180px)').matches
  const limitedMemory = typeof memory === 'number' && memory <= 4
  const midMemoryLaptop = typeof memory === 'number' && memory <= 8 && typeof cores === 'number' && cores <= 8
  const midCoreLaptop = typeof cores === 'number' && cores <= 8

  return Boolean(
    prefersReducedMotion() ||
    nav.connection?.saveData ||
    touchOrTablet ||
    limitedMemory ||
    midMemoryLaptop ||
    midCoreLaptop,
  )
}

export function applyPerformanceModeClass() {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('is-low-power-device', isLowPowerDevice())
}

export const CANVAS_CHROME_PREF_KEY = 'portfolio-canvas-chrome'

export function prefersCanvasChrome() {
  if (typeof window === 'undefined') return false

  try {
    return window.localStorage.getItem(CANVAS_CHROME_PREF_KEY) === 'on'
  } catch {
    return false
  }
}

export function setCanvasChromePreference(enabled: boolean) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(CANVAS_CHROME_PREF_KEY, enabled ? 'on' : 'off')
  } catch {
    // Storage can be unavailable in private contexts; the body classes still work.
  }

  window.dispatchEvent(new CustomEvent('portfolio:canvas-chrome-preference', { detail: { enabled } }))
}
