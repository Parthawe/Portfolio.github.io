import { useState, useCallback, useRef, useEffect } from 'react'
import { useThemeMode } from '../hooks/useThemeMode'
import { usePrefersReduced } from '../hooks/usePrefersReduced'

/* ═══════════════════════════════════════════════════════════
   Shuffle Interactive — interdependent slider system.

   8 sliders with real causal relationships:
   - Some are positively correlated (sleep → energy)
   - Some are inversely correlated (class ↑ → social life ↓)
   - Some are one-way, some bidirectional
   - Drag one slider and watch others respond.

   Mirrors the physical installation's core question:
   "You can't do everything — where do you compromise?"
   ═══════════════════════════════════════════════════════════ */

const KEYS = ['CLASS', 'SLEEP', 'SOCIAL LIFE', 'JOB', 'FINALS', 'FOOD', 'ENERGY', 'HOBBY'] as const
type Key = typeof KEYS[number]
const LEFT: Key[] = ['CLASS', 'SLEEP', 'SOCIAL LIFE', 'JOB']
const RIGHT: Key[] = ['FINALS', 'FOOD', 'ENERGY', 'HOBBY']

const RELATIONS: [Key, Key, number][] = [
  ['CLASS', 'FINALS',      0.35],
  ['CLASS', 'SOCIAL LIFE', -0.25],
  ['CLASS', 'HOBBY',       -0.20],
  ['CLASS', 'SLEEP',       -0.15],
  ['SLEEP', 'ENERGY',       0.55],
  ['SLEEP', 'FINALS',       0.20],
  ['SOCIAL LIFE', 'SLEEP',  -0.20],
  ['SOCIAL LIFE', 'ENERGY', -0.15],
  ['SOCIAL LIFE', 'HOBBY',   0.10],
  ['JOB', 'FOOD',            0.40],
  ['JOB', 'SLEEP',          -0.25],
  ['JOB', 'SOCIAL LIFE',    -0.20],
  ['JOB', 'HOBBY',          -0.20],
  ['JOB', 'CLASS',          -0.15],
  ['FINALS', 'SOCIAL LIFE', -0.30],
  ['FINALS', 'HOBBY',       -0.25],
  ['FINALS', 'SLEEP',       -0.25],
  ['ENERGY', 'HOBBY',        0.30],
  ['ENERGY', 'SOCIAL LIFE',  0.15],
  ['ENERGY', 'FINALS',       0.15],
  ['FOOD', 'ENERGY',         0.25],
  ['FOOD', 'SLEEP',          0.10],
]

// Build adjacency map for quick lookup
const ADJ = new Map<Key, { target: Key; weight: number }[]>()
for (const [src, tgt, w] of RELATIONS) {
  if (!ADJ.has(src)) ADJ.set(src, [])
  ADJ.get(src)!.push({ target: tgt, weight: w })
}

// Realistic starting profile: a stressed student who goes to class
// and works part-time, but is running low on sleep and hobbies.
// Immediately shows the system is interconnected.
const INITIAL: Record<Key, number> = {
  'CLASS':       72,
  'SLEEP':       35,
  'SOCIAL LIFE': 42,
  'JOB':         58,
  'FINALS':      62,
  'FOOD':        38,
  'ENERGY':      28,
  'HOBBY':       22,
}

function initValues(): Record<Key, number> {
  return { ...INITIAL }
}

// Propagate a change through the relationship graph (1 hop, no recursion)
function propagate(
  values: Record<Key, number>,
  changed: Key,
  delta: number,
): Record<Key, number> {
  const next = { ...values }
  const edges = ADJ.get(changed)
  if (!edges) return next

  for (const { target, weight } of edges) {
    const push = delta * weight
    next[target] = Math.max(0, Math.min(100, next[target] + push))
  }
  return next
}

export default function ShuffleInteractive() {
  const dark = useThemeMode()
  const reduced = usePrefersReduced()
  const [values, setValues] = useState(initValues)
  const prevVal = useRef<Record<Key, number>>(initValues())
  const flashTimers = useRef<Map<Key, ReturnType<typeof setTimeout>>>(new Map())
  // Counter per key to force re-trigger of flash animation via React key
  const [flashKeys, setFlashKeys] = useState<Record<Key, number>>(
    () => Object.fromEntries(KEYS.map(k => [k, 0])) as Record<Key, number>
  )
  const [flashing, setFlashing] = useState<Set<Key>>(new Set())

  // Animated interpolation toward target values
  const targetValues = useRef<Record<Key, number>>(initValues())
  const animFrame = useRef(0)
  const animating = useRef(false)

  const animateToTarget = useCallback(() => {
    animFrame.current = 0 // mark as consumed before running

    let needsMore = false
    setValues(current => {
      const target = targetValues.current
      const next = { ...current }
      for (const k of KEYS) {
        const diff = target[k] - current[k]
        if (Math.abs(diff) > 0.3) {
          next[k] = current[k] + diff * (reduced ? 1 : 0.18)
          needsMore = true
        } else {
          next[k] = target[k]
        }
      }
      return next
    })

    // Schedule next frame only if there's still work to do
    if (needsMore) {
      animFrame.current = requestAnimationFrame(animateToTarget)
    } else {
      animating.current = false
    }
  }, [reduced])

  useEffect(() => {
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current)
      for (const t of flashTimers.current.values()) clearTimeout(t)
    }
  }, [])

  const handleChange = useCallback((key: Key, newVal: number) => {
    const delta = newVal - prevVal.current[key]
    prevVal.current[key] = newVal

    // Directly set the dragged slider
    targetValues.current[key] = newVal
    setValues(v => ({ ...v, [key]: newVal }))

    // Propagate to connected sliders
    const propagated = propagate(targetValues.current, key, delta)
    targetValues.current = { ...propagated, [key]: newVal }
    prevVal.current = { ...propagated, [key]: newVal }

    // Flash affected sliders (bump key counter to re-trigger animation)
    const edges = ADJ.get(key)
    if (edges && Math.abs(delta) > 1) {
      const affected = new Set(edges.map(e => e.target))
      setFlashing(prev => new Set([...prev, ...affected]))
      setFlashKeys(prev => {
        const next = { ...prev }
        for (const t of affected) next[t] = (prev[t] || 0) + 1
        return next
      })

      for (const t of affected) {
        const existing = flashTimers.current.get(t)
        if (existing) clearTimeout(existing)
        flashTimers.current.set(t, setTimeout(() => {
          setFlashing(prev => {
            const next = new Set(prev)
            next.delete(t)
            return next
          })
        }, 400))
      }
    }

    // Start animation if not already running
    if (!animating.current) {
      animating.current = true
      animFrame.current = requestAnimationFrame(animateToTarget)
    }
  }, [animateToTarget])

  const resetAll = useCallback(() => {
    const fresh = initValues()
    targetValues.current = fresh
    prevVal.current = fresh
    setValues(fresh)
    setFlashing(new Set())
    animating.current = false
    if (animFrame.current) { cancelAnimationFrame(animFrame.current); animFrame.current = 0 }
  }, [])

  const bg = dark
    ? 'linear-gradient(145deg, #3a2d1e, #2a2015)'
    : 'linear-gradient(145deg, #e8dcc8, #d8c8a8)'

  const amber = dark ? '#C49A5C' : '#9B7530'
  const rail = dark ? '#222' : '#1a1a1a'
  const glowColor = '#D4A017'
  const thumbColor = dark ? '#e8e4dc' : '#f0ece5'
  const transitionProp = reduced ? 'none' : 'width 0.15s, opacity 0.15s, box-shadow 0.15s'

  return (
    <div style={{
      width: '100%',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--ink-06)',
      boxShadow: 'var(--shadow-lg)',
      background: bg,
      fontFamily: 'var(--mono)',
    }}>
      {/* Two panels side by side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
      }} className="shuffle-grid-2col">
        <SliderPanel
          labels={LEFT}
          values={values} onChange={handleChange}
          amber={amber} rail={rail} glowColor={glowColor} thumbColor={thumbColor}
          dark={dark} transition={transitionProp}
          side="left"
          flashing={flashing} flashKeys={flashKeys}
        />
        <SliderPanel
          labels={RIGHT}
          values={values} onChange={handleChange}
          amber={amber} rail={rail} glowColor={glowColor} thumbColor={thumbColor}
          dark={dark} transition={transitionProp}
          side="right"
          flashing={flashing} flashKeys={flashKeys}
        />
      </div>

      {/* Summary bar */}
      <div style={{
        padding: '0.75rem 1.25rem',
        borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        background: dark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        gap: '4px', minHeight: '52px', position: 'relative',
      }}>
        {KEYS.map(k => {
          const v = values[k]
          return (
            <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flex: 1, maxWidth: '48px' }}>
              <div style={{
                width: '100%', maxWidth: '20px',
                height: `${8 + v * 0.28}px`,
                background: `linear-gradient(to top, ${glowColor}, ${glowColor}88)`,
                borderRadius: '2px 2px 0 0',
                opacity: 0.3 + v * 0.007,
                transition: transitionProp,
                boxShadow: v > 50 ? `0 0 ${v * 0.12}px ${glowColor}44` : 'none',
              }} />
              <span style={{
                fontSize: '7px', letterSpacing: '0.05em',
                color: dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
                textTransform: 'uppercase', whiteSpace: 'nowrap',
              }}>
                {k.slice(0, 3)}
              </span>
            </div>
          )
        })}

        {/* Reset button */}
        <button
          onClick={resetAll}
          style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            padding: '4px 10px', borderRadius: 'var(--radius-pill)',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            background: 'transparent',
            color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            fontFamily: 'var(--mono)', fontSize: '7px',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>

      {/* CSS for range inputs */}
      <style>{`
        .shuffle-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          background: ${rail};
          border-radius: 2px;
          outline: none;
          cursor: grab;
          position: relative;
          z-index: 1;
        }
        .shuffle-range:active { cursor: grabbing; }
        .shuffle-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 14px;
          background: ${thumbColor};
          border-radius: 3px;
          border: none;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
          cursor: grab;
        }
        .shuffle-range:active::-webkit-slider-thumb { cursor: grabbing; transform: scale(1.1); }
        .shuffle-range::-moz-range-thumb {
          width: 20px;
          height: 14px;
          background: ${thumbColor};
          border-radius: 3px;
          border: none;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
          cursor: grab;
        }
        .shuffle-range::-moz-range-track {
          height: 4px;
          background: ${rail};
          border-radius: 2px;
        }
        .shuffle-range:focus-visible {
          outline: 2px solid ${amber};
          outline-offset: 4px;
          border-radius: 2px;
        }
        .shuffle-flash {
          animation: shuffle-pulse 0.4s ease-out;
        }
        @keyframes shuffle-pulse {
          0% { box-shadow: 0 0 0 0 ${glowColor}55; }
          50% { box-shadow: 0 0 12px 2px ${glowColor}44; }
          100% { box-shadow: 0 0 0 0 ${glowColor}00; }
        }
        @media (max-width: 640px) {
          .shuffle-grid-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// ── Relation indicator (small arrows showing what affects what) ──

function RelationHint({ source, dark }: { source: Key; dark: boolean }) {
  const edges = ADJ.get(source)
  if (!edges || edges.length === 0) return null

  return (
    <div style={{
      display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '3px',
    }}>
      {edges.slice(0, 3).map(({ target, weight }) => (
        <span key={target} style={{
          fontSize: '7px',
          letterSpacing: '0.03em',
          color: dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)',
          display: 'inline-flex', alignItems: 'center', gap: '2px',
        }}>
          {weight > 0 ? '↗' : '↘'} {target.slice(0, 3)}
        </span>
      ))}
    </div>
  )
}

// ── Slider Panel (4 sliders) ──

function SliderPanel({ labels, values, onChange, amber, glowColor, dark, transition, side, flashing, flashKeys }: {
  labels: Key[]
  values: Record<Key, number>
  onChange: (key: Key, val: number) => void
  amber: string; rail: string; glowColor: string; thumbColor: string
  dark: boolean; transition: string; side: 'left' | 'right'
  flashing: Set<Key>; flashKeys: Record<Key, number>
}) {
  return (
    <div style={{
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vw, 1.4rem)',
      borderRight: side === 'left' ? `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` : 'none',
    }}>
      {labels.map(label => {
        const v = values[label]
        const isFlashing = flashing.has(label)
        // Use flashKeys counter as React key to force remount → re-trigger animation
        const flashKey = flashKeys[label] || 0
        return (
          <div key={label}>
            {/* Wrap in a span with changing key to re-trigger CSS animation */}
            <div key={`${label}-${flashKey}`} className={isFlashing ? 'shuffle-flash' : ''}>
              {/* Label */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                marginBottom: '6px',
              }}>
                <span style={{
                  fontSize: 'clamp(8px, 1.4vw, 11px)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: isFlashing ? glowColor : amber,
                  fontWeight: 500,
                  transition: 'color 0.3s',
                }}>
                  {label}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '10px', color: amber, opacity: 0.5 }}>
                  <span>−</span>
                  <span>+</span>
                </div>
              </div>

              {/* Track with glow */}
              <div style={{ position: 'relative' }}>
                {/* LED glow bar */}
                <div style={{
                  position: 'absolute',
                  left: 0, bottom: '-3px',
                  width: `${v}%`,
                  height: '8px',
                  background: glowColor,
                  opacity: 0.15 + v * 0.005,
                  filter: `blur(${4 + v * 0.06}px)`,
                  borderRadius: '4px',
                  transition,
                  pointerEvents: 'none',
                }} />
                {/* Filled portion */}
                <div style={{
                  position: 'absolute',
                  left: 0, top: '50%', transform: 'translateY(-50%)',
                  width: `${v}%`,
                  height: '4px',
                  background: `linear-gradient(90deg, ${glowColor}66, ${glowColor})`,
                  borderRadius: '2px',
                  transition,
                  pointerEvents: 'none',
                  zIndex: 0,
                }} />
                <input
                  type="range"
                  min={0} max={100}
                  value={Math.round(v)}
                  onChange={e => onChange(label, Number(e.target.value))}
                  className="shuffle-range"
                  aria-label={`${label} time allocation`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(v)}
                />
              </div>

              {/* Relation hints */}
              <RelationHint source={label} dark={dark} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
