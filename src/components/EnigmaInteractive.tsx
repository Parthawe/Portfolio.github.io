import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useInView } from '../hooks/useInView'
import { usePrefersReduced } from '../hooks/usePrefersReduced'

/* ═══════════════════════════════════════════════════════════
   Enigma Interactive — 2D Canvas neural network.

   106 neurons in 4 layers. Press A–Z → activations cascade
   left-to-right. Bright = high activation.
   Always dark background (matches installation's dark room).
   ═══════════════════════════════════════════════════════════ */

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const LAYERS = [
  { name: 'input',   count: 16, x: 0.10 },
  { name: 'hidden1', count: 32, x: 0.37 },
  { name: 'hidden2', count: 32, x: 0.63 },
  { name: 'output',  count: 26, x: 0.90 },
]

// Seeded RNG for deterministic patterns
function rng(seed: number) {
  let s = seed
  return () => { s = (s * 16807) % 2147483647; return s / 2147483647 }
}

// Build node positions (normalized 0–1)
function buildNodes() {
  const nodes: { x: number; y: number; layer: number; idx: number }[] = []
  LAYERS.forEach((layer, li) => {
    for (let i = 0; i < layer.count; i++) {
      const margin = 0.08
      const y = margin + (1 - 2 * margin) * (i / Math.max(layer.count - 1, 1))
      nodes.push({ x: layer.x, y, layer: li, idx: i })
    }
  })
  return nodes
}

// Build sparse connections (2-4 per source)
function buildConnections(nodes: ReturnType<typeof buildNodes>) {
  const conns: { from: number; to: number }[] = []
  const rand = rng(42)
  for (let li = 0; li < LAYERS.length - 1; li++) {
    const sources = nodes.filter(n => n.layer === li)
    const targets = nodes.filter(n => n.layer === li + 1)
    for (const src of sources) {
      const count = 2 + Math.floor(rand() * 3)
      const picked = new Set<number>()
      for (let c = 0; c < count; c++) {
        const ti = Math.floor(rand() * targets.length)
        if (!picked.has(ti)) {
          picked.add(ti)
          conns.push({ from: nodes.indexOf(src), to: nodes.indexOf(targets[ti]) })
        }
      }
    }
  }
  return conns
}

// Pre-generate activation patterns for each letter
function buildActivations(nodes: ReturnType<typeof buildNodes>) {
  const patterns: Record<string, number[]> = {}
  for (let l = 0; l < 26; l++) {
    const rand = rng(l * 1000 + 7)
    patterns[LETTERS[l]] = nodes.map(n => {
      if (n.layer === 0) return 0.1 + rand() * 0.4 + Math.sin((n.idx + l * 3) * 0.8) * 0.25
      if (n.layer === 1 || n.layer === 2) return 0.05 + rand() * 0.5 + Math.sin((n.idx * 7 + l * 13) * 0.3) * 0.2
      // Output: correct letter brightest
      const dist = Math.min(Math.abs(n.idx - l), 26 - Math.abs(n.idx - l))
      if (dist === 0) return 0.95
      if (dist <= 2) return 0.15 + rand() * 0.2
      return 0.02 + rand() * 0.05
    }).map(v => Math.max(0, Math.min(1, v)))
  }
  return patterns
}

export default function EnigmaInteractive() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [containerRef, inView] = useInView(0.05)
  const reduced = usePrefersReduced()
  const [activeLetter, setActiveLetter] = useState('')
  const [isAuto, setIsAuto] = useState(true)
  const autoTimer = useRef<ReturnType<typeof setTimeout>>()
  const idleTimer = useRef<ReturnType<typeof setTimeout>>()
  const cascadeTimers = useRef<ReturnType<typeof setTimeout>[]>([])
  const currentAct = useRef<Float32Array | null>(null)
  const targetAct = useRef<Float32Array | null>(null)
  const rafId = useRef(0)
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const nodes = useMemo(() => buildNodes(), [])
  const connections = useMemo(() => buildConnections(nodes), [nodes])
  const patterns = useMemo(() => buildActivations(nodes), [nodes])

  // Init activation arrays
  useEffect(() => {
    currentAct.current = new Float32Array(nodes.length).fill(0.03)
    targetAct.current = new Float32Array(nodes.length).fill(0.03)
  }, [nodes])

  // Trigger a letter
  const triggerLetter = useCallback((letter: string) => {
    const pat = patterns[letter]
    if (!pat || !targetAct.current) return
    setActiveLetter(letter)

    // Clear previous cascade timers
    for (const t of cascadeTimers.current) clearTimeout(t)
    cascadeTimers.current = []

    if (reduced) {
      // No cascade, instant
      for (let i = 0; i < pat.length; i++) targetAct.current[i] = pat[i]
    } else {
      // Cascade layer by layer
      LAYERS.forEach((layer, li) => {
        const start = LAYERS.slice(0, li).reduce((s, l) => s + l.count, 0)
        const end = start + layer.count
        const timer = setTimeout(() => {
          if (!targetAct.current) return
          for (let i = start; i < end; i++) targetAct.current[i] = pat[i]
        }, li * 150)
        cascadeTimers.current.push(timer)
      })
    }
  }, [patterns, reduced])

  // Auto-demo
  useEffect(() => {
    if (!isAuto || !inView) return
    let idx = 0
    const cycle = () => {
      triggerLetter(LETTERS[idx % 26])
      idx++
      autoTimer.current = setTimeout(cycle, 1800)
    }
    autoTimer.current = setTimeout(cycle, 600)
    return () => clearTimeout(autoTimer.current)
  }, [isAuto, inView, triggerLetter])

  // Keyboard input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const ch = e.key.toUpperCase()
      if (ch >= 'A' && ch <= 'Z' && ch.length === 1) {
        setIsAuto(false)
        clearTimeout(autoTimer.current)
        triggerLetter(ch)
        clearTimeout(idleTimer.current)
        idleTimer.current = setTimeout(() => setIsAuto(true), 6000)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(idleTimer.current)
      for (const t of cascadeTimers.current) clearTimeout(t)
    }
  }, [triggerLetter])

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !inView) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = rect.width
      const h = rect.height
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      if (!currentAct.current || !targetAct.current) {
        rafId.current = requestAnimationFrame(draw)
        return
      }

      // Interpolate activations
      const cur = currentAct.current
      const tgt = targetAct.current
      const speed = reduced ? 1 : 0.12
      for (let i = 0; i < cur.length; i++) {
        cur[i] += (tgt[i] - cur[i]) * speed
      }

      // Draw connections (behind nodes)
      ctx.lineWidth = 0.5
      for (const c of connections) {
        const f = nodes[c.from]
        const t = nodes[c.to]
        const a = cur[c.from] * cur[c.to]
        ctx.strokeStyle = `rgba(120, 120, 180, ${0.03 + a * 0.35})`
        ctx.beginPath()
        ctx.moveTo(f.x * w, f.y * h)
        ctx.lineTo(t.x * w, t.y * h)
        ctx.stroke()
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const a = cur[i]
        const r = n.layer === 3 ? 5 : (n.layer === 0 ? 4.5 : 4)
        const px = n.x * w
        const py = n.y * h

        ctx.save()
        // Glow
        if (a > 0.1) {
          ctx.shadowBlur = a * 18
          ctx.shadowColor = `rgba(255, 255, 255, ${a * 0.7})`
        }
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.06 + a * 0.9})`
        ctx.fill()
        ctx.restore()

        // Output labels
        if (n.layer === 3) {
          ctx.font = '9px monospace'
          ctx.textAlign = 'center'
          ctx.fillStyle = a > 0.5 ? `rgba(255, 255, 255, ${0.5 + a * 0.5})` : 'rgba(255, 255, 255, 0.3)'
          ctx.fillText(LETTERS[n.idx], px, py + r + 12)
        }
      }

      // Layer labels
      ctx.font = '8px monospace'
      ctx.textAlign = 'center'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
      const labelY = h - 12
      ctx.fillText('INPUT', LAYERS[0].x * w, labelY)
      ctx.fillText('HIDDEN', LAYERS[1].x * w, labelY)
      ctx.fillText('HIDDEN', LAYERS[2].x * w, labelY)
      ctx.fillText('OUTPUT', LAYERS[3].x * w, labelY)

      rafId.current = requestAnimationFrame(draw)
    }

    rafId.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId.current)
  }, [inView, nodes, connections, reduced])

  // Mobile input handler
  const handleMobileInput = useCallback(() => {
    hiddenInputRef.current?.focus()
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase()
    if (val.length > 0) {
      const ch = val[val.length - 1]
      if (ch >= 'A' && ch <= 'Z') {
        setIsAuto(false)
        clearTimeout(autoTimer.current)
        triggerLetter(ch)
        clearTimeout(idleTimer.current)
        idleTimer.current = setTimeout(() => setIsAuto(true), 6000)
      }
    }
    e.target.value = ''
  }, [triggerLetter])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Canvas container */}
      <div style={{
        width: '100%', aspectRatio: '16 / 9',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        border: '1px solid rgba(100, 100, 180, 0.12)',
        boxShadow: '0 8px 40px rgba(10, 10, 30, 0.4)',
        background: '#0a0a0f',
        position: 'relative',
      }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

        {/* Current letter display */}
        {activeLetter && (
          <div style={{
            position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 300, color: '#fff', opacity: 0.8,
            textShadow: '0 0 20px rgba(255,255,255,0.3)',
          }}>
            {activeLetter}
          </div>
        )}

        {/* Status overlay */}
        <div style={{
          position: 'absolute', top: 12, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', pointerEvents: 'none',
        }}>
          {isAuto && (
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '8px',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              padding: '3px 8px', borderRadius: 'var(--radius-pill)',
              background: 'rgba(255,255,255,0.04)',
            }}>
              Auto-playing &middot; Press any letter
            </span>
          )}
        </div>

        {/* Mobile: tap-to-type button */}
        <button
          onClick={handleMobileInput}
          style={{
            position: 'absolute', bottom: 12, right: 12,
            padding: '6px 12px', borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--mono)', fontSize: '8px',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: 'pointer', display: 'none',
          }}
          className="enigma-mobile-btn"
        >
          Tap to type
        </button>
        <input
          ref={hiddenInputRef}
          type="text"
          inputMode="text"
          onChange={handleInputChange}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
          aria-label="Type a letter to trigger the neural network"
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .enigma-mobile-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
