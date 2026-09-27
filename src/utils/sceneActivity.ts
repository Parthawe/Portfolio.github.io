/** A scene owns no animation callbacks once idle, offscreen, or in a hidden tab. */
export function createSceneActivity(element: HTMLElement, render: (delta: number) => void) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  let visible = false
  let disposed = false
  let timeout = 0
  let frame = 0
  let previous = 0
  let activeUntil = 0
  let interactiveUntil = 0
  let pending = true

  const cancel = () => {
    clearTimeout(timeout)
    cancelAnimationFrame(frame)
    timeout = frame = 0
    previous = 0
  }
  const schedule = () => {
    if (disposed || !visible || document.hidden || timeout || frame) return
    if (!pending && (motion.matches || performance.now() >= activeUntil)) { previous = 0; return }
    const interval = performance.now() < interactiveUntil ? 1000 / 60 : 1000 / 24
    timeout = window.setTimeout(() => {
      timeout = 0
      frame = requestAnimationFrame(tick)
    }, Math.max(0, interval - (performance.now() - previous)))
  }
  const tick = (now: number) => {
    frame = 0
    if (disposed || !visible || document.hidden) { cancel(); return }
    const delta = previous ? Math.min((now - previous) / 1000, .08) : 1 / 60
    previous = now
    pending = false
    // Ease motion to rest during the final second; paused wall time never advances it.
    const remaining = Math.max(0, Math.min(1, (activeUntil - now) / 1000))
    const easing = remaining * remaining * (3 - 2 * remaining)
    render(delta * (motion.matches ? 1 : easing))
    schedule()
  }
  const wake = () => {
    activeUntil = performance.now() + 10_000
    pending = true
    schedule()
  }
  const interact = () => { interactiveUntil = performance.now() + 250; wake() }
  const visibility = () => { if (document.hidden) cancel(); else wake() }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) wake(); else cancel()
  })
  observer.observe(element)
  const events = ['pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup', 'focusin', 'keydown', 'wheel'] as const
  events.forEach(event => element.addEventListener(event, interact, { passive: true }))
  document.addEventListener('visibilitychange', visibility)
  motion.addEventListener('change', wake)
  return {
    wake,
    dispose() {
      disposed = true
      cancel()
      observer.disconnect()
      events.forEach(event => element.removeEventListener(event, interact))
      document.removeEventListener('visibilitychange', visibility)
      motion.removeEventListener('change', wake)
    },
  }
}
