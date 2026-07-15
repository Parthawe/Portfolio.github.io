import { useState, useCallback, useRef, useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════
   MONIAC Simulator — hydraulic economic game.

   Clean dashboard layout. 7 levers control the economy.
   Water-level tanks show each variable. Meters show health.
   Random events. 60-second rounds. Graded A–F.
   ═══════════════════════════════════════════════════════════ */

interface Controls {
  taxRate: number
  govSpending: number
  interestRate: number
  investmentRate: number
  consumerSpending: number
  imports: number
  exports: number
}
interface Econ { gdp: number; inflation: number; employment: number; debt: number }

const INIT_C: Controls = { taxRate: 35, govSpending: 45, interestRate: 30, investmentRate: 50, consumerSpending: 60, imports: 40, exports: 45 }
const INIT_E: Econ = { gdp: 55, inflation: 25, employment: 60, debt: 30 }

const EVENTS = [
  { name: 'Trade War', icon: '⚔️', fx: 'Exports crash, costs spike', apply: (e: Econ): Econ => ({ ...e, gdp: e.gdp - 8, inflation: e.inflation + 6 }) },
  { name: 'Tech Boom', icon: '🚀', fx: 'GDP surges, jobs grow', apply: (e: Econ): Econ => ({ ...e, gdp: e.gdp + 10, employment: e.employment + 7 }) },
  { name: 'Pandemic', icon: '🦠', fx: 'Jobs & GDP collapse', apply: (e: Econ): Econ => ({ ...e, employment: e.employment - 15, gdp: e.gdp - 12 }) },
  { name: 'Oil Crisis', icon: '🛢️', fx: 'Inflation spikes', apply: (e: Econ): Econ => ({ ...e, inflation: e.inflation + 12, gdp: e.gdp - 6 }) },
  { name: 'Housing Bubble', icon: '🏠', fx: 'Debt balloons', apply: (e: Econ): Econ => ({ ...e, debt: e.debt + 14, gdp: e.gdp + 5 }) },
  { name: 'Consumer Boom', icon: '🛒', fx: 'Spending lifts all', apply: (e: Econ): Econ => ({ ...e, employment: e.employment + 5, gdp: e.gdp + 6 }) },
]

function cl(v: number) { return Math.max(0, Math.min(100, v)) }

function simulate(e: Econ, c: Controls): Econ {
  const t = (c.taxRate - 40) * 0.08, s = (c.govSpending - 40) * 0.06
  const i = (c.interestRate - 35) * 0.05, inv = (c.investmentRate - 45) * 0.04
  const con = (c.consumerSpending - 50) * 0.05, tr = (c.exports - c.imports) * 0.03
  return {
    gdp: cl(e.gdp - t + s - i + inv + con + tr + (50 - e.gdp) * 0.01 + (Math.random() - 0.5) * 1.5),
    inflation: cl(e.inflation + s * 0.7 - i * 0.5 - t * 0.3 + con * 0.4 + (20 - e.inflation) * 0.02 + (Math.random() - 0.5)),
    employment: cl(e.employment + (e.gdp - 50) * 0.03 - i * 0.2 + inv * 0.3 + (55 - e.employment) * 0.01 + (Math.random() - 0.5)),
    debt: cl(e.debt + s * 0.5 - t * 0.4 - (e.gdp > 55 ? 0.5 : -0.5) + (35 - e.debt) * 0.01 + (Math.random() - 0.5) * 0.5),
  }
}

function grade(e: Econ) {
  const s = e.gdp * 0.3 + (100 - e.inflation) * 0.25 + e.employment * 0.3 + (100 - e.debt) * 0.15
  if (s > 70) return { l: 'A', c: '#22c55e', m: 'Thriving economy! Phillips would be proud.' }
  if (s > 55) return { l: 'B', c: '#84cc16', m: 'Stable growth — room for improvement.' }
  if (s > 40) return { l: 'C', c: '#eab308', m: 'The economy is struggling.' }
  if (s > 25) return { l: 'D', c: '#f97316', m: 'Citizens are getting anxious.' }
  return { l: 'F', c: '#ef4444', m: 'You failed the city!' }
}

// ── Water tank visual ──
function Tank({ value, label, color, onChange, running }: {
  value: number; label: string; color: string; onChange: (v: number) => void; running: boolean
}) {
  const fillPct = Math.round(value)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: '1 1 0', minWidth: 92 }}>
      {/* Tank container */}
      <div style={{
        width: '100%', maxWidth: 84, height: 96,
        borderRadius: 6, position: 'relative', overflow: 'hidden',
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${color}25`,
      }}>
        {/* Water fill */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: `${fillPct}%`,
          background: `linear-gradient(180deg, ${color}40, ${color}18)`,
          borderTop: `1px solid ${color}50`,
          transition: 'height 0.5s ease',
        }} />
        {/* Water level lines */}
        {[25, 50, 75].map(line => (
          <div key={line} style={{
            position: 'absolute', bottom: `${line}%`, left: 0, right: 0,
            height: 1, background: 'rgba(255,255,255,0.03)',
          }} />
        ))}
        {/* Value */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 700,
          color, fontVariantNumeric: 'tabular-nums',
          textShadow: `0 0 12px ${color}30`,
        }}>
          {fillPct}
        </div>
      </div>
      {/* Slider */}
      <input type="range" min={0} max={100} value={fillPct}
        onChange={e => onChange(Number(e.target.value))}
        disabled={!running}
        aria-label={`${label}: ${fillPct}%`}
        style={{
          width: '100%', maxWidth: 84, height: 4, appearance: 'none', WebkitAppearance: 'none',
          background: `linear-gradient(90deg, ${color} ${fillPct}%, rgba(255,255,255,0.04) ${fillPct}%)`,
          borderRadius: 2, outline: 'none',
          cursor: running ? 'pointer' : 'default', opacity: running ? 1 : 0.3,
        }}
        className="moniac-slider"
      />
      {/* Label */}
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 500,
        color: 'rgba(255,255,255,0.72)', textTransform: 'uppercase',
        letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.2,
      }}>{label}</span>
    </div>
  )
}

// ── Health meter ──
function Meter({ label, value, color, warn }: {
  label: string; value: number; color: string; warn: 'high' | 'low'
}) {
  const bad = (warn === 'high' && value > 70) || (warn === 'low' && value < 30)
  const displayColor = bad ? '#ef4444' : color
  return (
    <div style={{ flex: 1, minWidth: 130 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginBottom: 3,
        fontFamily: 'var(--mono)', fontSize: 16, letterSpacing: '0.02em', textTransform: 'uppercase',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.72)' }}>{label}</span>
        <span style={{ color: displayColor, fontWeight: 700 }}>{Math.round(value)}%</span>
      </div>
      <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 3, width: `${value}%`,
          background: bad ? 'linear-gradient(90deg, #ef4444, #dc2626)' : color,
          transition: 'width 0.4s ease, background 0.3s',
          boxShadow: bad ? '0 0 8px rgba(239,68,68,0.3)' : 'none',
        }} />
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════

export default function MoniacSimulator() {
  const [c, setC] = useState<Controls>(INIT_C)
  const [e, setE] = useState<Econ>(INIT_E)
  const [running, setRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)
  const [event, setEvent] = useState<typeof EVENTS[0] | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const simRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const evRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const start = useCallback(() => {
    setC(INIT_C); setE(INIT_E); setTimeLeft(60)
    setGameOver(false); setEvent(null); setRunning(true)
  }, [])

  const upd = useCallback((k: keyof Controls, v: number) => {
    if (running) setC(p => ({ ...p, [k]: v }))
  }, [running])

  // Timer
  useEffect(() => {
    if (!running) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { setRunning(false); setGameOver(true); return 0 }; return t - 1 })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [running])

  // Simulation
  useEffect(() => {
    if (!running) return
    simRef.current = setInterval(() => setE(p => simulate(p, c)), 1000)
    return () => clearInterval(simRef.current)
  }, [running, c])

  // Random events
  useEffect(() => {
    if (!running) return
    const sched = () => {
      evRef.current = setTimeout(() => {
        const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)]
        setEvent(ev)
        setE(p => ({ gdp: cl(ev.apply(p).gdp), inflation: cl(ev.apply(p).inflation), employment: cl(ev.apply(p).employment), debt: cl(ev.apply(p).debt) }))
        setTimeout(() => setEvent(null), 3500)
        sched()
      }, 10000 + Math.random() * 8000)
    }; sched()
    return () => clearTimeout(evRef.current)
  }, [running])

  useEffect(() => () => { clearInterval(timerRef.current); clearInterval(simRef.current); clearTimeout(evRef.current) }, [])

  const res = gameOver ? grade(e) : null
  const timerColor = timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#eab308' : '#3b82f6'

  return (
    <div style={{
      width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.04)',
      background: 'linear-gradient(170deg, #0c0e18 0%, #080a14 100%)',
      fontFamily: 'var(--mono)',
    }}>
      {/* ── Header ── */}
      <div style={{
        padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div>
          <div style={{ fontSize: 16, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.76)', marginBottom: 4 }}>
            MONIAC Economic Simulator
          </div>
          {running && (
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)' }}>
              Balance the economy for 60 seconds
            </div>
          )}
        </div>
        {running ? (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 16, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Time</div>
            <div style={{
              fontSize: 28, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: timerColor,
              lineHeight: 1, textShadow: timeLeft <= 10 ? '0 0 20px rgba(239,68,68,0.3)' : 'none',
            }}>
              {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
          </div>
        ) : !gameOver ? (
          <button onClick={start} style={{
            padding: '10px 24px', borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(59,130,246,0.25)', background: 'rgba(59,130,246,0.08)',
            color: '#8bc1ff', fontSize: 16, fontWeight: 600, letterSpacing: '0.03em',
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--mono)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={ev => { (ev.target as HTMLElement).style.background = 'rgba(59,130,246,0.15)' }}
          onMouseLeave={ev => { (ev.target as HTMLElement).style.background = 'rgba(59,130,246,0.08)' }}
          >
            Start Economy
          </button>
        ) : null}
      </div>

      {/* ── Event banner ── */}
      {event && (
        <div style={{
          padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(234,179,8,0.04)', borderBottom: '1px solid rgba(234,179,8,0.08)',
          animation: 'moniac-enter 0.3s ease',
        }}>
          <span style={{ fontSize: 18 }}>{event.icon}</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#f4cc48' }}>{event.name}</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', marginTop: 2 }}>{event.fx}</div>
          </div>
        </div>
      )}

      {/* ── Economy health ── */}
      <div style={{ padding: '14px 20px', display: 'flex', gap: 14, flexWrap: 'wrap', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <Meter label="GDP" value={e.gdp} color="#3b82f6" warn="low" />
        <Meter label="Employment" value={e.employment} color="#22c55e" warn="low" />
        <Meter label="Inflation" value={e.inflation} color="#f59e0b" warn="high" />
        <Meter label="Debt" value={e.debt} color="#ef4444" warn="high" />
      </div>

      {/* ── Control tanks ── */}
      <div style={{
        padding: '16px 16px 20px',
        display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap',
      }}>
        <Tank value={c.taxRate} label="Tax Rate" color="#3b82f6" onChange={v => upd('taxRate', v)} running={running} />
        <Tank value={c.govSpending} label="Gov Spend" color="#22c55e" onChange={v => upd('govSpending', v)} running={running} />
        <Tank value={c.interestRate} label="Interest" color="#a855f7" onChange={v => upd('interestRate', v)} running={running} />
        <Tank value={c.investmentRate} label="Invest" color="#06b6d4" onChange={v => upd('investmentRate', v)} running={running} />
        <Tank value={c.consumerSpending} label="Consumer" color="#f59e0b" onChange={v => upd('consumerSpending', v)} running={running} />
        <Tank value={c.imports} label="Imports" color="#ef4444" onChange={v => upd('imports', v)} running={running} />
        <Tank value={c.exports} label="Exports" color="#84cc16" onChange={v => upd('exports', v)} running={running} />
      </div>

      {/* ── Game over ── */}
      {gameOver && res && (
        <div style={{
          padding: '28px 20px', textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(0,0,0,0.2)',
        }}>
          <div style={{
            fontSize: 56, fontWeight: 800, color: res.c, lineHeight: 1,
            textShadow: `0 0 30px ${res.c}30`,
          }}>{res.l}</div>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.76)', maxWidth: '34ch', margin: '10px auto 20px', lineHeight: 1.5 }}>
            {res.m}
          </p>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20,
            fontSize: 16, color: 'rgba(255,255,255,0.72)', flexWrap: 'wrap',
          }}>
            <span>GDP <strong style={{ color: '#3b82f6' }}>{Math.round(e.gdp)}%</strong></span>
            <span>Jobs <strong style={{ color: '#22c55e' }}>{Math.round(e.employment)}%</strong></span>
            <span>Infl <strong style={{ color: '#f59e0b' }}>{Math.round(e.inflation)}%</strong></span>
            <span>Debt <strong style={{ color: '#ef4444' }}>{Math.round(e.debt)}%</strong></span>
          </div>
          <button onClick={start} style={{
            padding: '10px 24px', borderRadius: 'var(--radius-pill)',
            border: `1px solid ${res.c}40`, background: `${res.c}10`,
            color: res.c, fontSize: 16, fontWeight: 600, letterSpacing: '0.03em',
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--mono)',
          }}>
            Play Again
          </button>
        </div>
      )}

      {/* ── Idle ── */}
      {!running && !gameOver && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.76)', lineHeight: 1.6, maxWidth: '48ch', margin: '0 auto' }}>
            Inspired by the 1949 Phillips Hydraulic Computer. Adjust 7 economic levers — each tank shows your setting as a water level. Keep GDP &amp; employment high, inflation &amp; debt low. Random events will test your strategy.
          </p>
        </div>
      )}

      <style>{`
        .moniac-slider::-webkit-slider-thumb {
          -webkit-appearance: none; width: 10px; height: 10px;
          background: #fff; border-radius: 50%; border: none; cursor: pointer;
          box-shadow: 0 0 6px rgba(255,255,255,0.15);
        }
        .moniac-slider::-moz-range-thumb {
          width: 10px; height: 10px; background: #fff; border-radius: 50%;
          border: none; cursor: pointer;
        }
        @keyframes moniac-enter {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
