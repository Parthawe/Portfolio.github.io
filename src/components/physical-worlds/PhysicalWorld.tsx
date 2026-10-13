import { lazy, Suspense, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useThemeMode } from '../../hooks/useThemeMode'
import { usePrefersReduced } from '../../hooks/usePrefersReduced'
import { worlds, type WorldKey } from './catalog'
import './worlds.css'
const RoomScene = lazy(() => import('./RoomScene'))

export default function PhysicalWorld({ project }: { project: WorldKey }) {
  const spec = worlds[project]
  const [values, setValues] = useState<number[]>([...spec.initial])
  const [camera, setCamera] = useState(0)
  const [revision, setRevision] = useState(0)
  const [resetVersion, setResetVersion] = useState(0)
  const [failed, setFailed] = useState(false)
  const [sound, setSound] = useState(false)
  const audio = useRef<AudioContext | null>(null)
  useEffect(() => () => { void audio.current?.close() }, [])
  const dark = useThemeMode(), reduced = usePrefersReduced()
  const change = (index: number, value: number) => setValues(old => old.map((item, i) => i === index ? value : item))
  const play = (index: number) => {
    change(index, (values[index] + 25) % 101)
    if (!sound) return
    audio.current ??= new AudioContext()
    const ctx = audio.current
    void ctx.resume()
    const oscillator = ctx.createOscillator(), gain = ctx.createGain()
    oscillator.type = index === 0 ? 'triangle' : index === 1 ? 'sine' : 'sawtooth'
    oscillator.frequency.setValueAtTime([220, 330, 110][index] * (1 + values[index] / 200), ctx.currentTime)
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(.07, ctx.currentTime + .02)
    gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .8)
    oscillator.connect(gain); gain.connect(ctx.destination); oscillator.start(); oscillator.stop(ctx.currentTime + .85)
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
  }
  return <div className="physical-world" data-world-theme={dark ? 'dark' : 'light'}>
    <header><p>{spec.setting}</p><div role="group" aria-label="Camera view">{['Room', 'Object', 'Overhead'].map((label, i) => <button key={label} disabled={failed} aria-pressed={camera === i} onClick={() => { setCamera(i); setRevision(n => n + 1) }}>{label}</button>)}<button onClick={() => { setFailed(false); setValues([...spec.initial]); setResetVersion(n => n + 1); setCamera(0); setRevision(n => n + 1) }}>Reset</button></div></header>
    <div className="physical-world-stage">
      {failed ? <div className="physical-world-loading" role="status">3D is unavailable. <Link to={`/${project}`}>View the project photographs</Link>.</div> : <Suspense fallback={<div className="physical-world-loading" role="status">Loading the room…</div>}><RoomScene project={project} values={values} dark={dark} reduced={reduced} cameraView={camera} revision={revision} resetVersion={resetVersion} onChange={change} onFail={() => setFailed(true)} /></Suspense>}
      {!failed && <p className="physical-world-hint">Drag to look around. Scroll or pinch to move closer.</p>}
    </div>
    <div className="physical-world-controls">
      {spec.controls.map((label, i) => <label key={label}><span>{label}<output>{label === 'Letter' ? String.fromCharCode(65 + values[i]) : label === 'Exhibit' ? ['Time trap', 'Spacetime fabric', 'Binary motion'][values[i]] : label === 'Study' ? ['Finished figure', 'Process study', 'Anatomy study'][values[i]] : label === 'Hour' ? `${(values[i] * 12 / 100).toFixed(1)} h` : `${Math.round(values[i])}${label === 'Stage rotation' ? '°' : '%'}`}</output></span>
      {['Letter', 'Exhibit', 'Study'].includes(label) ? <select aria-label={label} value={values[i]} onChange={event => change(i, Number(event.target.value))}>{(label === 'Letter' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') : label === 'Exhibit' ? ['Time trap', 'Spacetime fabric', 'Binary motion'] : ['Finished figure', 'Process study', 'Anatomy study']).map((text, index) => <option key={text} value={index}>{text}</option>)}</select> : <input type="range" aria-label={label} min="0" max={label === 'Stage rotation' ? 360 : 100} value={values[i]} onChange={event => change(i, Number(event.target.value))} />}</label>)}
      {project === 'jugalbandi' && <div className="physical-world-sound"><label><input type="checkbox" checked={sound} onChange={event => setSound(event.target.checked)} /> Enable synthesized sound</label>{['Pluck', 'Blow', 'Tilt'].map((label, i) => <button key={label} onClick={() => play(i)}>{label}</button>)}</div>}
    </div>
    <footer><p>{spec.note}</p><Link to={`/${project}/world`}>Open the room</Link></footer>
  </div>
}
