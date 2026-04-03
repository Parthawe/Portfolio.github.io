import { useEffect, useRef, useCallback } from 'react'

/**
 * Makes the character walk back and forth across the bottom of the screen.
 * Returns the current facing direction so the image can be flipped.
 */

interface WalkState {
  walking: boolean
  facingRight: boolean
  paused: boolean
}

const WALK_SPEED = 0.6          // pixels per frame (~36px/sec at 60fps, gentle pace)
const PAUSE_MIN = 3000          // min pause at each end (ms)
const PAUSE_MAX = 6000          // max pause at each end
const NAV_INSET = 0.25          // walk within center 50% of viewport (25% from each edge)

export function useAgentWalk(
  wrapRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
  onWalkStateChange: (walking: boolean, facingRight: boolean) => void,
) {
  const stateRef = useRef<WalkState>({ walking: false, facingRight: true, paused: false })
  const rafRef = useRef(0)
  const pauseTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    if (pauseTimer.current) clearTimeout(pauseTimer.current)
    stateRef.current.walking = false
    stateRef.current.paused = false
    onWalkStateChange(false, stateRef.current.facingRight)
  }, [onWalkStateChange])

  useEffect(() => {
    if (!enabled) { stop(); return }

    const el = wrapRef.current
    if (!el) return

    const startWalk = () => {
      stateRef.current.walking = true
      stateRef.current.paused = false
      onWalkStateChange(true, stateRef.current.facingRight)

      const tick = () => {
        if (!stateRef.current.walking) return

        const rect = el.getBoundingClientRect()
        const vw = window.innerWidth
        const elW = rect.width

        // Walk within the center portion of the viewport (where the nav bar is)
        const leftBound = vw * NAV_INSET
        const rightBound = vw * (1 - NAV_INSET) - elW

        const currentLeft = rect.left
        const dir = stateRef.current.facingRight ? 1 : -1
        const newLeft = currentLeft + WALK_SPEED * dir

        if (newLeft >= rightBound) {
          stateRef.current.walking = false
          stateRef.current.facingRight = false
          onWalkStateChange(false, false)
          pauseAndResume()
          return
        }
        if (newLeft <= leftBound) {
          stateRef.current.walking = false
          stateRef.current.facingRight = true
          onWalkStateChange(false, true)
          pauseAndResume()
          return
        }

        // Apply position
        el.style.left = `${newLeft}px`
        el.style.right = 'auto'
        el.style.transition = 'none'

        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const pauseAndResume = () => {
      stateRef.current.paused = true
      const delay = PAUSE_MIN + Math.random() * (PAUSE_MAX - PAUSE_MIN)
      pauseTimer.current = setTimeout(() => {
        if (!enabled) return
        startWalk()
      }, delay)
    }

    // Initial pause before first walk
    pauseTimer.current = setTimeout(startWalk, 2000)

    return stop
  }, [enabled, wrapRef, onWalkStateChange, stop])

  return {
    stop,
    get isWalking() { return stateRef.current.walking },
    get facingRight() { return stateRef.current.facingRight },
  }
}
