import { useRef, useEffect, useState, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════
   Generative Canvas — live flow field + particle system.

   Perlin-noise flow field drives thousands of particles.
   Mouse/touch creates attraction wells. Click to change
   color palette. Particles leave trails that fade slowly.

   From Canvas for Coders — NYU ITP Fall 2024.
   ═══════════════════════════════════════════════════════════ */

// Simple Perlin noise (2D)
const PERM = new Uint8Array(512)
const GRAD = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]]
;(() => {
  const p = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [p[i], p[j]] = [p[j], p[i]] }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255]
})()

function noise2d(x: number, y: number): number {
  const xi = Math.floor(x) & 255, yi = Math.floor(y) & 255
  const xf = x - Math.floor(x), yf = y - Math.floor(y)
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf)
  const dot = (g: number[], fx: number, fy: number) => g[0] * fx + g[1] * fy
  const aa = PERM[PERM[xi] + yi], ab = PERM[PERM[xi] + yi + 1]
  const ba = PERM[PERM[xi + 1] + yi], bb = PERM[PERM[xi + 1] + yi + 1]
  const x1 = dot(GRAD[aa & 7], xf, yf) * (1 - u) + dot(GRAD[ba & 7], xf - 1, yf) * u
  const x2 = dot(GRAD[ab & 7], xf, yf - 1) * (1 - u) + dot(GRAD[bb & 7], xf - 1, yf - 1) * u
  return x1 * (1 - v) + x2 * v
}

const PALETTES = [
  { name: 'Ocean', bg: '#020810', colors: ['#0077b6', '#00b4d8', '#48cae4', '#90e0ef', '#caf0f8'] },
  { name: 'Ember', bg: '#0a0604', colors: ['#e63946', '#f4845f', '#f7b267', '#f8d06b', '#ffd6a5'] },
  { name: 'Forest', bg: '#040a04', colors: ['#2d6a4f', '#40916c', '#52b788', '#74c69d', '#b7e4c7'] },
  { name: 'Neon', bg: '#050008', colors: ['#7400b8', '#6930c3', '#5390d9', '#48bfe3', '#72efdd'] },
  { name: 'Mono', bg: '#000000', colors: ['#ffffff', '#e0e0e0', '#b0b0b0', '#808080', '#505050'] },
]

const PARTICLE_COUNT = 2000
const TRAIL_ALPHA = 0.012 // lower = longer trails

interface Particle {
  x: number; y: number
  vx: number; vy: number
  color: string
  life: number
  maxLife: number
}

export default function GenerativeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [paletteIdx, setPaletteIdx] = useState(0)
  const [particleCount, setParticleCount] = useState(PARTICLE_COUNT)
  const mouseRef = useRef({ x: -1, y: -1, active: false })
  const rafRef = useRef(0)
  const timeRef = useRef(0)
  const particlesRef = useRef<Particle[]>([])

  const palette = PALETTES[paletteIdx]

  const nextPalette = useCallback(() => {
    setPaletteIdx(i => (i + 1) % PALETTES.length)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    // Init particles
    const initParticles = (w: number, h: number) => {
      const colors = PALETTES[paletteIdx].colors
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0, vy: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 300,
        maxLife: 200 + Math.random() * 200,
      }))
    }

    let w = 0, h = 0

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = canvas.parentElement!.getBoundingClientRect()
      const newW = rect.width, newH = rect.height
      if (newW < 10 || newH < 10) { rafRef.current = requestAnimationFrame(draw); return }

      if (canvas.width !== newW * dpr || canvas.height !== newH * dpr) {
        canvas.width = newW * dpr; canvas.height = newH * dpr
        canvas.style.width = `${newW}px`; canvas.style.height = `${newH}px`
        w = newW; h = newH
        initParticles(w, h)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Fade trails
      ctx.fillStyle = `${palette.bg}${Math.round(TRAIL_ALPHA * 255).toString(16).padStart(2, '0')}`
      ctx.fillRect(0, 0, w, h)

      timeRef.current += 0.003
      const t = timeRef.current
      const mouse = mouseRef.current
      const noiseScale = 0.003
      const particles = particlesRef.current

      for (const p of particles) {
        // Flow field angle from noise
        const angle = noise2d(p.x * noiseScale + t, p.y * noiseScale + t * 0.5) * Math.PI * 4
        const speed = 0.8

        p.vx += Math.cos(angle) * speed * 0.1
        p.vy += Math.sin(angle) * speed * 0.1

        // Mouse attraction
        if (mouse.active && mouse.x > 0) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200 && dist > 5) {
            const force = 2 / (dist * 0.1 + 1)
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        // Damping
        p.vx *= 0.96
        p.vy *= 0.96

        // Speed limit
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 3) { p.vx *= 3 / spd; p.vy *= 3 / spd }

        p.x += p.vx
        p.y += p.vy
        p.life++

        // Wrap edges
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        // Reset old particles
        if (p.life > p.maxLife) {
          p.x = Math.random() * w
          p.y = Math.random() * h
          p.vx = 0; p.vy = 0
          p.life = 0
          p.color = palette.colors[Math.floor(Math.random() * palette.colors.length)]
        }

        // Draw
        const alpha = Math.min(1, p.life / 20) * Math.min(1, (p.maxLife - p.life) / 30)
        const size = 0.5 + spd * 0.4
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha * 0.7
        ctx.fill()
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paletteIdx, particleCount, palette])

  const handlePointer = useCallback((e: React.PointerEvent) => {
    const rect = canvasRef.current?.parentElement?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          width: '100%', aspectRatio: '16 / 10',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.04)',
          cursor: 'crosshair', touchAction: 'none',
        }}
        onPointerMove={handlePointer}
        onPointerDown={handlePointer}
        onPointerLeave={() => { mouseRef.current.active = false }}
      >
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 8, padding: '10px 0', flexWrap: 'wrap',
      }}>
        {/* Palette switcher */}
        {PALETTES.map((p, i) => (
          <button key={p.name} onClick={() => setPaletteIdx(i)} style={{
            padding: '4px 10px', borderRadius: 'var(--radius-pill)',
            border: `1px solid ${i === paletteIdx ? p.colors[0] + '60' : 'rgba(255,255,255,0.06)'}`,
            background: i === paletteIdx ? p.colors[0] + '15' : 'rgba(255,255,255,0.02)',
            color: i === paletteIdx ? p.colors[0] : 'rgba(255,255,255,0.2)',
            fontFamily: 'var(--mono)', fontSize: '7px',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}>
            {p.name}
          </button>
        ))}

        <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.06)', margin: '0 4px' }} />

        {/* Particle density */}
        <span style={{ fontFamily: 'var(--mono)', fontSize: '7px', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>Density</span>
        <input type="range" min={500} max={5000} step={500} value={particleCount}
          onChange={e => setParticleCount(Number(e.target.value))}
          style={{ width: 80, accentColor: palette.colors[0] }}
        />
      </div>
    </div>
  )
}
