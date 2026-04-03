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

const WALK_SPEED = 0.8          // pixels per frame (~48px/sec at 60fps)
const PAUSE_MIN = 3000          // min pause at each end (ms)
const PAUSE_MAX = 7000          // max pause at each end
const MARGIN = 20               // don't walk off-screen

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

        // Get current left position
        const currentLeft = rect.left

        // Move in the current direction
        const dir = stateRef.current.facingRight ? 1 : -1
        const newLeft = currentLeft + WALK_SPEED * dir

        // Check bounds
        if (newLeft >= vw - elW - MARGIN) {
          // Hit right edge, stop and pause
          stateRef.current.walking = false
          stateRef.current.facingRight = false
          onWalkStateChange(false, false)
          pauseAndResume()
          return
        }
        if (newLeft <= MARGIN) {
          // Hit left edge, stop and pause
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
