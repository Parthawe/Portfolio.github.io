import { useRef, useEffect, useState, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════
   Salt Simulation — digital version of the salt mill.

   Slider advances the "story" and particles (salt grains)
   accumulate on a dark surface. Mirrors the physical
   installation where a salt mill grinds as you read.
   ═══════════════════════════════════════════════════════════ */

interface Grain {
  x: number; y: number; vx: number; vy: number
  size: number; settled: boolean; alpha: number
}

export default function SaltSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [storyPos, setStoryPos] = useState(0)
  const grainsRef = useRef<Grain[]>([])
  const lastPosRef = useRef(0)
  const rafRef = useRef(0)

  const spawnGrains = useCallback((count: number, w: number, h: number) => {
    const cx = w / 2
    const spawnY = h * 0.25
    for (let i = 0; i < count; i++) {
      grainsRef.current.push({
        x: cx + (Math.random() - 0.5) * 30,
        y: spawnY + Math.random() * 10,
        vx: (Math.random() - 0.5) * 2,
        vy: 0.5 + Math.random() * 1.5,
        size: 1.5 + Math.random() * 2.5,
        settled: false,
        alpha: 0.6 + Math.random() * 0.4,
      })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const parent = canvas.parentElement
      if (!parent) { rafRef.current = requestAnimationFrame(draw); return }
      const rect = parent.getBoundingClientRect()
      const w = rect.width, h = rect.height
      if (w < 10 || h < 10) { rafRef.current = requestAnimationFrame(draw); return }
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr; canvas.height = h * dpr
        canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Dark surface
      ctx.fillStyle = '#0a0a0e'
      ctx.fillRect(0, 0, w, h)

      // Mill (white cylinder at top)
      const millX = w / 2, millY = h * 0.18
      const millR = Math.min(w * 0.06, 30)

      // Mill body
      ctx.beginPath()
      ctx.ellipse(millX, millY + millR * 0.8, millR, millR * 0.3, 0, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(200, 195, 185, 0.15)'
      ctx.fill()
      ctx.fillStyle = 'rgba(230, 225, 215, 0.3)'
      ctx.fillRect(millX - millR, millY - millR, millR * 2, millR * 1.8)
      ctx.beginPath()
      ctx.ellipse(millX, millY - millR, millR, millR * 0.3, 0, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(240, 235, 225, 0.35)'
      ctx.fill()

      // Handle
      ctx.fillStyle = 'rgba(160, 130, 90, 0.3)'
      ctx.fillRect(millX - 2, millY - millR - 15, 4, 15)

      // Spawn grains based on slider movement
      const delta = storyPos - lastPosRef.current
      if (delta > 0) {
        const count = Math.ceil(delta * 8)
        spawnGrains(count, w, h)
      }
      lastPosRef.current = storyPos

      // Update and draw grains
      const grains = grainsRef.current
      const groundY = h * 0.85

      for (const g of grains) {
        if (!g.settled) {
          g.vy += 0.15 // gravity
          g.vx *= 0.98
          g.x += g.vx
          g.y += g.vy

          // Check if settled
          if (g.y >= groundY - g.size) {
            // Check pile — settle on top of other grains
            let settleY = groundY
            for (const other of grains) {
              if (other.settled && Math.abs(other.x - g.x) < g.size + other.size) {
                settleY = Math.min(settleY, other.y - g.size)
              }
            }
            g.y = settleY
            g.vy = 0; g.vx = 0
            g.settled = true
          }
        }

        // Draw grain
        ctx.beginPath()
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240, 235, 225, ${g.alpha * (g.settled ? 0.7 : 0.9)})`
        ctx.fill()
      }

      // "Why the Sea is Salt" label
      ctx.font = `${Math.max(8, w * 0.015)}px monospace`
      ctx.textAlign = 'center'
      ctx.fillStyle = 'rgba(255,255,255,0.06)'
      ctx.fillText('Why the Sea is Salt', w / 2, h - 10)

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [storyPos, spawnGrains])

  const reset = useCallback(() => {
    grainsRef.current = []
    setStoryPos(0)
    lastPosRef.current = 0
  }, [])

  return (
    <div className="cs-interactive-contained" style={{ position: 'relative' }}>
      <div style={{
        width: '100%', aspectRatio: '16 / 9',
        maxHeight: 'min(34rem, 68vh)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.04)',
        contain: 'layout paint size',
      }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>

      {/* Story slider */}
      <div style={{
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
        justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '7px', color: 'var(--ink-20)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
          Start of the story
        </span>
        <input
          type="range" min={0} max={100} value={storyPos}
          onChange={e => setStoryPos(Number(e.target.value))}
          aria-label="Story progress"
          style={{ width: 'clamp(120px, 30vw, 200px)', accentColor: '#c2956a' }}
        />
        <span style={{ fontFamily: 'var(--mono)', fontSize: '7px', color: 'var(--ink-20)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
          End of the story
        </span>
        <button onClick={reset} style={{
          padding: '3px 8px', borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--ink-06)', background: 'var(--ink-03)',
          color: 'var(--ink-20)', fontFamily: 'var(--mono)', fontSize: '6px',
          letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
        }}>Reset</button>
      </div>
    </div>
  )
}
