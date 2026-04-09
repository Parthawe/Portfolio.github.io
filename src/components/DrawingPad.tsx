import { useRef, useCallback, useEffect, useState } from 'react'
import { processDrawing, classifyDrawing, prewarmTemplates } from '../utils/letterRecognizer'

/* ═══════════════════════════════════════════════════════════
   DrawingPad — canvas where users draw letters.

   Mirrors the Enigma installation's tablet input.
   Smooth freehand drawing → auto-classify after brief pause.
   ═══════════════════════════════════════════════════════════ */

interface Props {
  onRecognize: (letter: string, confidence: number) => void
  size?: number
}

export default function DrawingPad({ onRecognize, size = 200 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const classifyTimer = useRef<ReturnType<typeof setTimeout>>()
  const hasStrokes = useRef(false)
  const [lastLetter, setLastLetter] = useState('')
  const [lastConf, setLastConf] = useState(0)

  // Pre-warm letter templates on mount (during idle time)
  useEffect(() => { prewarmTemplates() }, [])

  // Init canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    const ctx = canvas.getContext('2d')!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = Math.max(6, size * 0.04)
    ctx.strokeStyle = '#fff'
  }, [size])

  const getPos = useCallback((e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [])

  const classify = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !hasStrokes.current) return
    const grid = processDrawing(canvas)

    // Check if there's actually ink
    let sum = 0
    for (let i = 0; i < grid.length; i++) sum += grid[i]
    if (sum < 0.01) return

    const { letter, confidence } = classifyDrawing(grid)
    if (letter && confidence > 0.2) {
      setLastLetter(letter)
      setLastConf(confidence)
      onRecognize(letter, confidence)
    }
  }, [onRecognize])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    drawing.current = true
    hasStrokes.current = true
    const pos = getPos(e)
    lastPos.current = pos

    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    }

    // Cancel pending classify — user is still drawing
    clearTimeout(classifyTimer.current)

    // Capture pointer for drag outside canvas
    canvasRef.current?.setPointerCapture(e.pointerId)
  }, [getPos])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drawing.current) return
    const pos = getPos(e)
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    }
    lastPos.current = pos
  }, [getPos])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    drawing.current = false
    // Release pointer capture
    canvasRef.current?.releasePointerCapture(e.pointerId)
    // Classify after brief pause (user might still be drawing multi-stroke letters)
    clearTimeout(classifyTimer.current)
    classifyTimer.current = setTimeout(classify, 600)
  }, [classify])

  const clear = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio, 2)
    const ctx = canvas.getContext('2d')!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, size, size)
    hasStrokes.current = false
    setLastLetter('')
    setLastConf(0)
    clearTimeout(classifyTimer.current)
  }, [size])

  // Cleanup
  useEffect(() => {
    return () => clearTimeout(classifyTimer.current)
  }, [])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
    }}>
      {/* Canvas */}
      <div style={{
        position: 'relative',
        width: size, height: size,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid rgba(100, 100, 180, 0.2)',
        background: '#0a0a0f',
      }}>
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            display: 'block',
            cursor: 'crosshair',
            touchAction: 'none',
          }}
        />

        {/* Placeholder text */}
        {!hasStrokes.current && !lastLetter && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
            color: 'rgba(255,255,255,0.12)',
            fontFamily: 'var(--mono)', fontSize: '9px',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Draw a letter
          </div>
        )}

        {/* Recognized letter overlay */}
        {lastLetter && (
          <div style={{
            position: 'absolute', top: 6, right: 8,
            fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 300,
            color: '#fff', opacity: 0.6 + lastConf * 0.4,
            textShadow: `0 0 8px rgba(100, 200, 255, ${lastConf * 0.5})`,
            lineHeight: 1, pointerEvents: 'none',
          }}>
            {lastLetter}
          </div>
        )}
      </div>

      {/* Clear button */}
      <button
        onClick={clear}
        aria-label="Clear drawing pad"
        style={{
          padding: '4px 12px', borderRadius: 'var(--radius-pill)',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
          color: 'rgba(255,255,255,0.3)',
          fontFamily: 'var(--mono)', fontSize: '7px',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        Clear
      </button>
    </div>
  )
}
