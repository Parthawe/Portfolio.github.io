import { useRef, useState, useEffect, useCallback } from 'react'
import { useBackToTop } from '../hooks/useBackToTop'
// @ts-ignore, no type declarations available
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

/* ── Landmark indices ── */
const THUMB_TIP = 4
const INDEX_TIP = 8
const INDEX_MCP = 5
const MIDDLE_TIP = 12
const MIDDLE_MCP = 9
const RING_TIP = 16
const RING_MCP = 13
const PINKY_TIP = 20
const PINKY_MCP = 17

/* ── Gesture types ── */
type Gesture = 'none' | 'point' | 'pinch' | 'fist' | 'palm'

/* ── Tuning ── */
const SMOOTH = 0.3             // cursor lerp factor (lower = smoother but laggier)
const PINCH_THRESHOLD = 0.055  // normalised distance for pinch
const CLICK_MAX_MS = 300       // max pinch duration to count as "tap" vs "drag"
const CLICK_MAX_MOVE = 0.03    // max cursor movement during pinch to count as tap
const SCROLL_MULTIPLIER = 22   // pixels per normalised-unit of hand movement in fist
const DEAD_ZONE = 0.12         // ignore this much of the camera edges for cursor mapping

/* ── Helpers ── */
function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}
function fingerCurled(tip: { x: number; y: number }, mcp: { x: number; y: number }) {
  return tip.y > mcp.y - 0.02 // tip is below (or near) knuckle
}
function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin)
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function detectGesture(lm: { x: number; y: number; z: number }[]): Gesture {
  const pinchDist = dist(lm[THUMB_TIP], lm[INDEX_TIP])
  if (pinchDist < PINCH_THRESHOLD) return 'pinch'

  const indexCurled = fingerCurled(lm[INDEX_TIP], lm[INDEX_MCP])
  const middleCurled = fingerCurled(lm[MIDDLE_TIP], lm[MIDDLE_MCP])
  const ringCurled = fingerCurled(lm[RING_TIP], lm[RING_MCP])
  const pinkyCurled = fingerCurled(lm[PINKY_TIP], lm[PINKY_MCP])

  if (indexCurled && middleCurled && ringCurled && pinkyCurled) return 'fist'
  if (!indexCurled && !middleCurled && !ringCurled && !pinkyCurled) return 'palm'
  if (!indexCurled && middleCurled && ringCurled && pinkyCurled) return 'point'

  return 'point' // default to point for anything ambiguous
}

/* ── Gesture tutorial content ── */
const GESTURES = [
  {
    name: 'Move',
    desc: 'Point index finger to move cursor',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <path d="M16 28V14a2 2 0 1 1 4 0v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 16v-4a2 2 0 1 1 4 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <path d="M12 28v-8a2 2 0 1 1 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <path d="M18 35a8 8 0 0 1-8-8v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <circle cx="18" cy="10" r="1.5" fill="currentColor" opacity="0.6" />
        <path d="M18 6v-2M14 8l-1.5-1.5M22 8l1.5-1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: 'Tap',
    desc: 'Pinch thumb + index quickly to click',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <path d="M14 22V16a2 2 0 1 1 4 0v-2a2 2 0 1 1 4 0v-2a2 2 0 1 1 4 0v12a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="30" r="2" fill="currentColor" opacity="0.3" />
        <path d="M17 30h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: 'Scroll',
    desc: 'Make a fist and move up or down',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <rect x="13" y="14" width="14" height="16" rx="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 18v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 6l-3 3h6l-3-3z" fill="currentColor" opacity="0.4" />
        <path d="M20 34l-3-3h6l-3 3z" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: 'Drag',
    desc: 'Pinch and hold, then move hand',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <path d="M14 22V16a2 2 0 1 1 4 0v-2a2 2 0 1 1 4 0v-2a2 2 0 1 1 4 0v12a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 20l3-3M28 20l3 3M28 20h-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
]

export default function HandTracker() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const handLandmarkerRef = useRef<HandLandmarker | null>(null)
  const rafRef = useRef<number>(0)
  const streamRef = useRef<MediaStream | null>(null)

  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detected, setDetected] = useState(false)
  const [gesture, setGesture] = useState<Gesture>('none')
  const [tutorialStep, setTutorialStep] = useState(-1) // -1 = hidden
  const [hasSeenTutorial, setHasSeenTutorial] = useState(() => {
    try { return localStorage.getItem('ht-tutorial-seen') === '1' } catch { return false }
  })

  // Hide default custom cursor when hand tracking is active
  useEffect(() => {
    const dots = document.querySelectorAll('.cursor-dot, .cursor-ring')
    dots.forEach((el) => {
      ;(el as HTMLElement).style.display = active ? 'none' : ''
    })
    // Also toggle body cursor
    document.body.style.cursor = active && detected ? 'none' : ''
    return () => { document.body.style.cursor = '' }
  }, [active, detected])

  // Refs for gesture state machine
  const pos = useRef({ x: 0.5, y: 0.5 })
  const gestureRef = useRef<Gesture>('none')
  const pinchStartTime = useRef(0)
  const pinchStartPos = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const fistScrollAnchor = useRef<number | null>(null)

  // ── Initialise MediaPipe ──
  const init = useCallback(async () => {
    if (handLandmarkerRef.current) return handLandmarkerRef.current
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.33/wasm'
    )

    // Try GPU first, fall back to CPU if WebGPU unavailable
    let hl: HandLandmarker
    try {
      hl = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 1,
        minHandDetectionConfidence: 0.6,
        minHandPresenceConfidence: 0.6,
        minTrackingConfidence: 0.5,
      })
    } catch {
      // GPU delegate failed, retry with CPU
      console.warn('HandTracker: GPU delegate unavailable, falling back to CPU')
      hl = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task',
          delegate: 'CPU',
        },
        runningMode: 'VIDEO',
        numHands: 1,
        minHandDetectionConfidence: 0.6,
        minHandPresenceConfidence: 0.6,
        minTrackingConfidence: 0.5,
      })
    }

    handLandmarkerRef.current = hl
    return hl
  }, [])

  // ── Start camera + detection loop ──
  const start = useCallback(async () => {
    setLoading(true)
    try {
      const hl = await init()
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
      })
      streamRef.current = stream

      const video = videoRef.current!
      video.srcObject = stream
      await video.play()

      // Show inline tutorial on first use
      if (!hasSeenTutorial) {
        setTutorialStep(0)
        setHasSeenTutorial(true)
        try { localStorage.setItem('ht-tutorial-seen', '1') } catch {}
      }

      const detect = () => {
        if (!video.videoWidth) {
          rafRef.current = requestAnimationFrame(detect)
          return
        }

        const result = hl.detectForVideo(video, performance.now())
        const hasHand = result.landmarks && result.landmarks.length > 0
        setDetected(hasHand)

        if (hasHand) {
          const lm = result.landmarks[0]
          const now = performance.now()

          // ── Cursor position from index finger tip ──
          // Map with dead zone so you don't need to reach camera edges
          const rawX = 1 - lm[INDEX_TIP].x // mirror
          const rawY = lm[INDEX_TIP].y
          const mappedX = clamp(mapRange(rawX, DEAD_ZONE, 1 - DEAD_ZONE, 0, 1), 0, 1)
          const mappedY = clamp(mapRange(rawY, DEAD_ZONE, 1 - DEAD_ZONE, 0, 1), 0, 1)

          pos.current.x += (mappedX - pos.current.x) * SMOOTH
          pos.current.y += (mappedY - pos.current.y) * SMOOTH

          const cx = pos.current.x * window.innerWidth
          const cy = pos.current.y * window.innerHeight

          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${cx}px, ${cy}px)`
          }

          // Dispatch mousemove so hover styles work on elements under hand cursor
          const hoveredEl = document.elementFromPoint(cx, cy)
          if (hoveredEl) {
            hoveredEl.dispatchEvent(new MouseEvent('mouseover', {
              bubbles: true, clientX: cx, clientY: cy
            }))
          }

          // ── Gesture detection ──
          const g = detectGesture(lm)
          const prevGesture = gestureRef.current

          // Update visual state (throttled to avoid re-renders every frame)
          if (g !== prevGesture) {
            setGesture(g)
          }
          gestureRef.current = g

          // ── PINCH logic (tap vs drag) ──
          if (g === 'pinch') {
            if (prevGesture !== 'pinch') {
              // Pinch just started
              pinchStartTime.current = now
              pinchStartPos.current = { x: pos.current.x, y: pos.current.y }
              isDragging.current = false

              // Dispatch mousedown for drag
              const el = document.elementFromPoint(cx, cy)
              if (el) {
                el.dispatchEvent(new MouseEvent('mousedown', {
                  bubbles: true, clientX: cx, clientY: cy
                }))
              }
            } else {
              // Pinch held, check if moved enough to be a drag
              const moveD = dist(pos.current, pinchStartPos.current)
              if (!isDragging.current && moveD > CLICK_MAX_MOVE) {
                isDragging.current = true
                if (cursorRef.current) cursorRef.current.classList.add('hand-cursor--drag')
              }
              if (isDragging.current) {
                // Dispatch mousemove for drag
                document.dispatchEvent(new MouseEvent('mousemove', {
                  bubbles: true, clientX: cx, clientY: cy
                }))
              }
            }
          } else if (prevGesture === 'pinch') {
            // Pinch just released
            const duration = now - pinchStartTime.current
            const moveD = dist(pos.current, pinchStartPos.current)

            if (isDragging.current) {
              // End drag
              document.dispatchEvent(new MouseEvent('mouseup', {
                bubbles: true, clientX: cx, clientY: cy
              }))
              isDragging.current = false
              if (cursorRef.current) cursorRef.current.classList.remove('hand-cursor--drag')
            } else if (duration < CLICK_MAX_MS && moveD < CLICK_MAX_MOVE) {
              // Quick pinch = tap/click
              const el = document.elementFromPoint(cx, cy)
              if (el instanceof HTMLElement) {
                el.click()
                // Also dispatch mouseup
                el.dispatchEvent(new MouseEvent('mouseup', {
                  bubbles: true, clientX: cx, clientY: cy
                }))
              }
              // Visual pulse
              if (cursorRef.current) {
                cursorRef.current.classList.add('hand-cursor--click')
                setTimeout(() => cursorRef.current?.classList.remove('hand-cursor--click'), 350)
              }
            } else {
              // Long pinch but didn't move, release mouseup
              document.dispatchEvent(new MouseEvent('mouseup', {
                bubbles: true, clientX: cx, clientY: cy
              }))
            }
          }

          // ── FIST logic (continuous scroll) ──
          if (g === 'fist') {
            if (fistScrollAnchor.current === null) {
              fistScrollAnchor.current = rawY
            } else {
              const delta = rawY - fistScrollAnchor.current
              if (Math.abs(delta) > 0.008) {
                const scrollAmt = delta * SCROLL_MULTIPLIER * 60
                // Use Lenis if available, else native
                const lenis = (window as unknown as Record<string, { scrollTo: (target: number, opts?: Record<string, unknown>) => void }>).__lenis
                if (lenis) {
                  lenis.scrollTo(window.scrollY + scrollAmt, { immediate: true })
                } else {
                  window.scrollBy({ top: scrollAmt })
                }
                // Slowly re-anchor to avoid runaway scroll
                fistScrollAnchor.current += delta * 0.15
              }
            }
          } else {
            fistScrollAnchor.current = null
          }

          // ── Draw skeleton on mini canvas ──
          drawLandmarks(lm, g)
        } else {
          if (gestureRef.current !== 'none') {
            setGesture('none')
            gestureRef.current = 'none'
          }
        }

        rafRef.current = requestAnimationFrame(detect)
      }

      rafRef.current = requestAnimationFrame(detect)
      setLoading(false)
      setActive(true)
    } catch (err) {
      console.error('HandTracker:', err)
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes('Permission') || msg.includes('NotAllowed')) {
        setError('Camera permission denied')
      } else if (msg.includes('NotFound') || msg.includes('DevicesNotFound')) {
        setError('No camera found')
      } else {
        setError('Could not start hand tracking')
      }
      setLoading(false)
      setTimeout(() => setError(null), 4000)
    }
  }, [init, hasSeenTutorial])

  // ── Draw skeleton ──
  const drawLandmarks = (
    lm: { x: number; y: number; z: number }[],
    g: Gesture
  ) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    const connections = [
      [0,1],[1,2],[2,3],[3,4],
      [0,5],[5,6],[6,7],[7,8],
      [0,9],[9,10],[10,11],[11,12],
      [0,13],[13,14],[14,15],[15,16],
      [0,17],[17,18],[18,19],[19,20],
      [5,9],[9,13],[13,17],
    ]

    // Color based on gesture
    const accentColor =
      g === 'pinch' ? '#ffd43b' :
      g === 'fist' ? '#74c0fc' :
      g === 'palm' ? '#b2f2bb' :
      '#ff6b6b'

    ctx.strokeStyle = 'rgba(255,255,255,0.35)'
    ctx.lineWidth = 1
    for (const [a, b] of connections) {
      ctx.beginPath()
      ctx.moveTo((1 - lm[a].x) * w, lm[a].y * h)
      ctx.lineTo((1 - lm[b].x) * w, lm[b].y * h)
      ctx.stroke()
    }

    for (let i = 0; i < lm.length; i++) {
      const x = (1 - lm[i].x) * w
      const y = lm[i].y * h
      const isKey = i === INDEX_TIP || i === THUMB_TIP
      ctx.beginPath()
      ctx.arc(x, y, isKey ? 4 : 1.5, 0, Math.PI * 2)
      ctx.fillStyle = isKey ? accentColor : 'rgba(255,255,255,0.5)'
      ctx.fill()
    }

    // Gesture label
    if (g !== 'none') {
      ctx.font = '600 9px system-ui'
      ctx.fillStyle = accentColor
      ctx.textAlign = 'right'
      ctx.fillText(g.toUpperCase(), w - 6, 12)
    }
  }

  // ── Stop ──
  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
    setActive(false)
    setDetected(false)
    setGesture('none')
    isDragging.current = false
    fistScrollAnchor.current = null
  }, [])

  // Cleanup
  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current)
    streamRef.current?.getTracks().forEach((t) => t.stop())
  }, [])

  // Desktop only
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)')
    setIsDesktop(mq.matches)
    const h = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  // Back to top
  const { visible: showBackToTop, scrollToTop } = useBackToTop()

  if (!isDesktop) return null

  // Cursor icon based on gesture
  const cursorIcon = (() => {
    switch (gesture) {
      case 'pinch':
        return ( // pinch / grabbing
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            <path d="M8 18v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )
      case 'fist':
        return ( // fist / scroll
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="7" y="7" width="10" height="12" rx="5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            <path d="M12 10v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 3l-2 2h4l-2-2z" fill="currentColor" opacity="0.5" />
            <path d="M12 21l-2-2h4l-2 2z" fill="currentColor" opacity="0.5" />
          </svg>
        )
      default: // point
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M10 19V8a2 2 0 1 1 4 0v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.5" />
          </svg>
        )
    }
  })()

  return (
    <>
      {/* ── Hand cursor ── */}
      {active && (
        <div
          ref={cursorRef}
          className={`hand-cursor ${detected ? 'hand-cursor--visible' : ''} hand-cursor--${gesture}`}
          aria-hidden="true"
        >
          {cursorIcon}
          {/* Ripple ring on click */}
          <span className="hand-cursor-ring" />
        </div>
      )}

      {/* Hidden video for detection */}
      <video ref={videoRef} playsInline muted style={{ display: 'none' }} />

      {/* ── Camera preview + inline step guide ── */}
      {active && (
        <div className="ht-preview-float">
          {/* Inline step card, sits left of camera */}
          {tutorialStep >= 0 && tutorialStep < GESTURES.length && (
            <div className="ht-step-card">
              <div className="ht-step-top">
                <span className="ht-step-label">Step {tutorialStep + 1}/{GESTURES.length}</span>
                <button
                  className="ht-step-close"
                  onClick={() => setTutorialStep(-1)}
                  aria-label="Close guide"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              </div>
              <div className="ht-step-icon">{GESTURES[tutorialStep].icon}</div>
              <div className="ht-step-name">{GESTURES[tutorialStep].name}</div>
              <div className="ht-step-desc">{GESTURES[tutorialStep].desc}</div>
              <div className="ht-step-nav">
                {tutorialStep > 0 && (
                  <button className="ht-step-btn" onClick={() => setTutorialStep(s => s - 1)}>Back</button>
                )}
                <button
                  className="ht-step-btn ht-step-btn--primary"
                  onClick={() => {
                    if (tutorialStep < GESTURES.length - 1) setTutorialStep(s => s + 1)
                    else setTutorialStep(-1)
                  }}
                >
                  {tutorialStep < GESTURES.length - 1 ? 'Next' : 'Got it'}
                </button>
              </div>
            </div>
          )}

          {/* Camera preview */}
          <div className="hand-tracker-preview">
            <video
              ref={(el) => {
                if (el && streamRef.current) {
                  el.srcObject = streamRef.current
                  el.play().catch(() => {})
                }
              }}
              playsInline muted
              className="hand-tracker-video"
            />
            <canvas ref={canvasRef} width={160} height={120} className="hand-tracker-canvas" />
            <div className={`hand-tracker-status ${detected ? 'hand-tracker-status--detected' : ''}`}>
              <span className="hand-tracker-dot" />
              {detected ? gesture === 'none' ? 'Tracking' : gesture : 'Show hand'}
            </div>
            {/* Show guide button, only when tutorial is dismissed */}
            {tutorialStep < 0 && (
              <button
                className="hand-tracker-help"
                onClick={() => setTutorialStep(0)}
                aria-label="Show gesture guide"
                title="Gesture guide"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M6.5 12.5V9a1.5 1.5 0 0 1 3 0v-2a1.5 1.5 0 0 1 3 0V6a1.5 1.5 0 0 1 3 0v1a1.5 1.5 0 0 1 3 0v6.5a5.5 5.5 0 0 1-5.5 5.5h-1A5.5 5.5 0 0 1 6.5 13.5v-1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Unified bottom-right toolbar ── */}
      <div className="bt-toolbar">
        {/* Back to top */}
        <button
          className={`bt-toolbar-btn bt-toolbar-btn--top ${showBackToTop ? 'bt-toolbar-btn--visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 14V4M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Divider, only shows when back-to-top is visible */}
        <span className={`bt-toolbar-divider ${showBackToTop ? 'bt-toolbar-divider--visible' : ''}`} />

        {/* Hand tracker toggle */}
        <button
          className={`bt-toolbar-btn bt-toolbar-btn--hand ${active ? 'bt-toolbar-btn--active' : ''} ${loading ? 'bt-toolbar-btn--loading' : ''}`}
          onClick={active ? stop : start}
          disabled={loading}
          aria-label={active ? 'Disable hand tracking' : 'Enable hand tracking'}
          title={active ? 'Stop hand tracking' : 'Control with your hand'}
        >
          {loading ? (
            <svg className="hand-tracker-spinner" width="16" height="16" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="40 20" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.5 12.5V9a1.5 1.5 0 0 1 3 0v-2a1.5 1.5 0 0 1 3 0V6a1.5 1.5 0 0 1 3 0v1a1.5 1.5 0 0 1 3 0v6.5a5.5 5.5 0 0 1-5.5 5.5h-1A5.5 5.5 0 0 1 6.5 13.5v-1Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className="bt-toolbar-label">{active ? 'Stop' : 'Use your hands'}</span>
        </button>

        {/* Error toast */}
        {error && (
          <span className="bt-toolbar-error">{error}</span>
        )}
      </div>
    </>
  )
}
