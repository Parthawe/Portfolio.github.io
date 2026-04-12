import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'pp-ambient-muted'
const TARGET_GAIN = 0.014

interface AmbientRig {
  ctx: AudioContext
  master: GainNode
  osc1: OscillatorNode
  osc2: OscillatorNode
  osc3: OscillatorNode
  noise: AudioBufferSourceNode
  lfo1: OscillatorNode
  lfo2: OscillatorNode
}

/** Very soft brown noise — distant rain / air */
function createNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const seconds = 5
  const length = ctx.sampleRate * seconds
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let prev = 0
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1
    prev = (prev + 0.01 * white) / 1.01
    data[i] = prev * 0.4
  }
  return buffer
}

function buildRig(): AmbientRig {
  const ctx = new AudioContext()

  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  // Everything passes through a very dark filter — like hearing through a wall
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 280
  lp.Q.value = 0.2
  lp.connect(master)

  // ── Three pure sines: C3, E3, G3 (major triad — warm, resolved, calm) ──
  const notes = [
    { freq: 130.81, gain: 0.12, detune: -2 },  // C3
    { freq: 164.81, gain: 0.08, detune: 3 },    // E3
    { freq: 196.0,  gain: 0.07, detune: -1 },   // G3
  ]

  const oscs: OscillatorNode[] = []
  const gains: GainNode[] = []

  for (const n of notes) {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = n.freq
    osc.detune.value = n.detune
    const g = ctx.createGain()
    g.gain.value = n.gain
    osc.connect(g)
    g.connect(lp)
    osc.start()
    oscs.push(osc)
    gains.push(g)
  }

  // ── Noise: barely-there texture ──
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx)
  noise.loop = true
  const noiseLp = ctx.createBiquadFilter()
  noiseLp.type = 'lowpass'
  noiseLp.frequency.value = 200
  noiseLp.Q.value = 0.1
  const noiseGain = ctx.createGain()
  noiseGain.gain.value = 0.018
  noise.connect(noiseLp)
  noiseLp.connect(noiseGain)
  noiseGain.connect(master)
  noise.start()

  // ── LFO 1: slow volume breathing on the chord (60s cycle) ──
  const lfo1 = ctx.createOscillator()
  lfo1.type = 'sine'
  lfo1.frequency.value = 1 / 60
  const lfo1Gain = ctx.createGain()
  lfo1Gain.gain.value = 0.02
  lfo1.connect(lfo1Gain)
  for (const g of gains) lfo1Gain.connect(g.gain)
  lfo1.start()

  // ── LFO 2: glacial filter sweep (90s cycle) ──
  const lfo2 = ctx.createOscillator()
  lfo2.type = 'sine'
  lfo2.frequency.value = 1 / 90
  const lfo2Gain = ctx.createGain()
  lfo2Gain.gain.value = 40
  lfo2.connect(lfo2Gain)
  lfo2Gain.connect(lp.frequency)
  lfo2.start()

  return {
    ctx, master,
    osc1: oscs[0], osc2: oscs[1], osc3: oscs[2],
    noise, lfo1, lfo2,
  }
}

function fade(g: GainNode, target: number, dur: number) {
  const t = g.context.currentTime
  g.gain.cancelScheduledValues(t)
  g.gain.setValueAtTime(g.gain.value, t)
  g.gain.linearRampToValueAtTime(target, t + dur)
}

export default function AmbientAudio() {
  const rigRef = useRef<AmbientRig | null>(null)
  const timerRef = useRef<number | null>(null)
  const startedRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1' } catch { return false }
  })

  const ensureRig = useCallback(() => {
    if (!rigRef.current) rigRef.current = buildRig()
    return rigRef.current
  }, [])

  const resume = useCallback(async () => {
    const rig = ensureRig()
    if (timerRef.current) { window.clearTimeout(timerRef.current); timerRef.current = null }
    await rig.ctx.resume()
    fade(rig.master, TARGET_GAIN, 4) // 4s fade in
    setPlaying(true)
  }, [ensureRig])

  const pause = useCallback(async () => {
    const rig = rigRef.current
    if (!rig) return
    fade(rig.master, 0, 2.5)
    setPlaying(false)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => { void rig.ctx.suspend(); timerRef.current = null }, 2800)
  }, [])

  const firstGesture = useCallback(() => {
    if (muted) return
    startedRef.current = true
    void resume()
  }, [muted, resume])

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, muted ? '1' : '0') } catch {} }, [muted])

  useEffect(() => {
    if (muted) return
    // Explicit opt-in only — no scroll trigger (scroll feels surprising)
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart']
    const opts: AddEventListenerOptions = { passive: true, once: true }
    const trigger = () => firstGesture()
    for (const e of events) window.addEventListener(e, trigger, opts)
    return () => { for (const e of events) window.removeEventListener(e, trigger) }
  }, [muted, firstGesture])

  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === 'hidden') void pause()
      else if (!muted && startedRef.current && rigRef.current) void resume()
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [muted, pause, resume])

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    const rig = rigRef.current
    if (!rig) return
    rig.osc1.stop(); rig.osc2.stop(); rig.osc3.stop()
    rig.noise.stop(); rig.lfo1.stop(); rig.lfo2.stop()
    void rig.ctx.close()
    rigRef.current = null
  }, [])

  const toggle = useCallback(() => {
    if (playing) { setMuted(true); void pause(); return }
    startedRef.current = true; setMuted(false); void resume()
  }, [pause, playing, resume])

  return (
    <button
      className={`ambient-toggle figma-hover${playing ? ' is-active' : ''}`}
      onClick={toggle}
      type="button"
      aria-label={playing ? 'Pause ambient sound' : 'Play ambient sound'}
      title={playing ? 'Pause ambient sound' : 'Play ambient sound'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {playing ? (
          <>
            <path d="M2 12 C4 8, 6 8, 8 12 S12 16, 14 12 S18 8, 20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none">
              <animate attributeName="d" dur="3s" repeatCount="indefinite" values="
                M2 12 C4 8, 6 8, 8 12 S12 16, 14 12 S18 8, 20 12;
                M2 12 C4 15, 6 15, 8 12 S12 9, 14 12 S18 15, 20 12;
                M2 12 C4 8, 6 8, 8 12 S12 16, 14 12 S18 8, 20 12
              " />
            </path>
            <path d="M2 12 C4 10, 6 10, 8 12 S12 14, 14 12 S18 10, 20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35">
              <animate attributeName="d" dur="4s" repeatCount="indefinite" values="
                M2 12 C4 14, 6 14, 8 12 S12 10, 14 12 S18 14, 20 12;
                M2 12 C4 9, 6 9, 8 12 S12 15, 14 12 S18 9, 20 12;
                M2 12 C4 14, 6 14, 8 12 S12 10, 14 12 S18 14, 20 12
              " />
            </path>
          </>
        ) : (
          <path d="M2 12 L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        )}
      </svg>
    </button>
  )
}
