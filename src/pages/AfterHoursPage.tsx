import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { visibleAnimation } from '../utils/visibleActivity'
import { cellAt, createWorldRenderer, point, roomType, ROOMS, type Camera, type Cell } from '../components/after-hours/world'
import '../styles/after-hours.css'

function startingZoom() { return window.innerWidth < 600 ? 1.6 : 1.8 }

export default function AfterHoursPage() {
  const canvas = useRef<HTMLCanvasElement>(null), host = useRef<HTMLDivElement>(null)
  const camera = useRef<Camera>({ x: 0, y: 0, zoom: startingZoom() }), selected = useRef<Cell>({ col: 0, row: 0 })
  const [selection, setSelection] = useState<Cell>({ col: 0, row: 0 }), [zoom, setZoom] = useState(startingZoom)
  const [paused, setPaused] = useState(false), [reduced, setReduced] = useState(false), [unavailable, setUnavailable] = useState(false)
  const [motionOptIn, setMotionOptIn] = useState(false)
  const overrideReduced = useRef(false)
  const [touchExploring, setTouchExploring] = useState(false), touchExploringRef = useRef(false)
  const pausedRef = useRef(false), wake = useRef<() => void>(() => {})
  const room = ROOMS[roomType(selection.col, selection.row)]
  function choose(cell: Cell, travel = false) {
    selected.current = cell; setSelection(cell)
    if (travel) { const p = point(cell.col, cell.row); camera.current.x = p.x; camera.current.y = p.y }
    wake.current()
  }
  function changeZoom(factor: number, anchor?: { x: number; y: number }) {
    const view = camera.current, previous = view.zoom, next = Math.min(3.6, Math.max(.55, previous * factor))
    // Keep the world point under the fingers/cursor fixed during zoom.
    if (anchor) { view.x += anchor.x / previous - anchor.x / next; view.y += anchor.y / previous - anchor.y / next }
    view.zoom = next; setZoom(next); wake.current()
  }
  function home() { camera.current = { x: 0, y: 0, zoom: startingZoom() }; setZoom(startingZoom()); choose({ col: 0, row: 0 }) }
  useEffect(() => {
    const surface = canvas.current, stage = host.current
    if (!surface || !stage) return
    const c = surface.getContext('2d', { alpha: false })
    if (!c) { setUnavailable(true); return }
    const renderer = createWorldRenderer(), media = matchMedia('(prefers-reduced-motion: reduce)')
    let reduce = media.matches, last = -Infinity, sceneTime = 0, previous = 0, dirty = true
    const syncMotion = () => { reduce = media.matches; setReduced(reduce); overrideReduced.current = false; setMotionOptIn(false); dirty = true; wake.current() }; syncMotion()
    const draw = (time: number) => {
      if (!dirty && time - last < 1000 / 30) return
      const started = performance.now(), width = stage.clientWidth, height = stage.clientHeight
      const ratio = Math.min(devicePixelRatio || 1, 1.5)
      if (surface.width !== Math.round(width * ratio) || surface.height !== Math.round(height * ratio)) { surface.width = Math.round(width * ratio); surface.height = Math.round(height * ratio) }
      if (!pausedRef.current && (!reduce || overrideReduced.current)) sceneTime += previous ? Math.min(time - previous, 80) : 0
      previous = time; last = time; dirty = false
      c.setTransform(ratio, 0, 0, ratio, 0, 0); c.imageSmoothingEnabled = true
      const count = renderer.draw(c, width, height, camera.current, sceneTime, selected.current, document.documentElement.dataset.theme === 'dark')
      stage.dataset.frames = String(Number(stage.dataset.frames || 0) + 1); stage.dataset.rooms = String(count); stage.dataset.drawMs = (performance.now() - started).toFixed(2)
      stage.dataset.camera = `${camera.current.x.toFixed(0)},${camera.current.y.toFixed(0)}`
    }
    const animation = visibleAnimation(stage, draw, () => !pausedRef.current && (!reduce || overrideReduced.current))
    wake.current = () => { dirty = true; animation.wake() }
    const theme = new MutationObserver(() => wake.current()); theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const resize = () => wake.current(); window.addEventListener('resize', resize); media.addEventListener('change', syncMotion)
    const pointers = new Map<number, { x: number; y: number }>()
    let start = { x: 0, y: 0 }, moved = false, pinch = 0
    const distance = () => { const values = [...pointers.values()]; return values.length === 2 ? Math.hypot(values[0].x - values[1].x, values[0].y - values[1].y) : 0 }
    const down = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      if (e.pointerType === 'touch' && !touchExploringRef.current) return
      surface.setPointerCapture(e.pointerId); pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); start = { x: e.clientX, y: e.clientY }; moved = false; pinch = distance()
    }
    const move = (e: PointerEvent) => {
      const previousPoint = pointers.get(e.pointerId); if (!previousPoint) return
      const oldMidpoint = pointers.size === 2 ? [...pointers.values()].reduce((p, v) => ({ x: p.x + v.x / 2, y: p.y + v.y / 2 }), { x: 0, y: 0 }) : null
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (Math.hypot(e.clientX - start.x, e.clientY - start.y) > 4) moved = true
      if (pointers.size === 2) {
        const next = distance(), values = [...pointers.values()], bounds = surface.getBoundingClientRect()
        if (pinch && oldMidpoint) {
          changeZoom(next / pinch, { x: oldMidpoint.x - bounds.left - stage.clientWidth / 2, y: oldMidpoint.y - bounds.top - stage.clientHeight / 2 })
          camera.current.x -= ((values[0].x + values[1].x) / 2 - oldMidpoint.x) / camera.current.zoom
          camera.current.y -= ((values[0].y + values[1].y) / 2 - oldMidpoint.y) / camera.current.zoom
        }
        pinch = next; moved = true
      }
      else { camera.current.x -= (e.clientX - previousPoint.x) / camera.current.zoom; camera.current.y -= (e.clientY - previousPoint.y) / camera.current.zoom }
      camera.current.x = Math.max(-1e7, Math.min(1e7, camera.current.x)); camera.current.y = Math.max(-1e7, Math.min(1e7, camera.current.y)); wake.current()
    }
    const up = (e: PointerEvent) => {
      if (!pointers.has(e.pointerId)) return
      const wasPinching = pointers.size > 1; pointers.delete(e.pointerId); pinch = distance()
      if (!moved && !wasPinching && e.type === 'pointerup') {
        const bounds = surface.getBoundingClientRect(), view = camera.current
        choose(cellAt((e.clientX - bounds.left - stage.clientWidth / 2) / view.zoom + view.x, (e.clientY - bounds.top - stage.clientHeight / 2) / view.zoom + view.y))
      }
      moved = true
    }
    const wheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault(); const bounds = surface.getBoundingClientRect()
      changeZoom(Math.exp(-e.deltaY * .003), { x: e.clientX - bounds.left - stage.clientWidth / 2, y: e.clientY - bounds.top - stage.clientHeight / 2 })
    }
    surface.addEventListener('pointerdown', down); surface.addEventListener('pointermove', move); surface.addEventListener('pointerup', up); surface.addEventListener('pointercancel', up); surface.addEventListener('wheel', wheel, { passive: false })
    return () => { animation.dispose(); renderer.dispose(); theme.disconnect(); window.removeEventListener('resize', resize); media.removeEventListener('change', syncMotion); surface.removeEventListener('pointerdown', down); surface.removeEventListener('pointermove', move); surface.removeEventListener('pointerup', up); surface.removeEventListener('pointercancel', up); surface.removeEventListener('wheel', wheel); wake.current = () => {} }
  }, [])
  return <div className="after-hours" data-touch-capable={navigator.maxTouchPoints > 0}>
    <Helmet><title>After Hours · Parth Pawar</title><meta name="robots" content="index, follow" /><meta name="googlebot" content="index, follow" /><meta name="description" content="Explore an endless isometric floor of original animated workshops. A playful generative illustration by Parth Pawar." /><link rel="canonical" href="https://designwhich.works/after-hours" /></Helmet>
    <header className="ah-top"><Link to="/">Parth Pawar</Link><span>A small world, still awake.</span><ThemeToggle /></header>
    <main id="main-content">
      <section className="ah-heading"><div><span className="ah-kicker">An endless illustration / 01</span><h1>After <em>hours.</em></h1></div><p>A press is running. Someone is watering the plants.<br />Every room has a little story in motion.</p></section>
      <div className="ah-toolbar" aria-label="World controls"><div><button disabled={unavailable} onClick={() => { if (reduced && !overrideReduced.current) { overrideReduced.current = true; setMotionOptIn(true); pausedRef.current = false; setPaused(false) } else { pausedRef.current = !pausedRef.current; setPaused(pausedRef.current) } wake.current() }}>{unavailable ? 'Animation unavailable' : paused || (reduced && !motionOptIn) ? 'Play animation' : 'Pause animation'}</button><button disabled={unavailable} onClick={home}>Return to start</button></div><div><button aria-label="Zoom out" onClick={() => changeZoom(1 / 1.2)} disabled={unavailable || zoom <= .55}>−</button><output aria-label="Zoom level">{Math.round(zoom * 100)}%</output><button aria-label="Zoom in" onClick={() => changeZoom(1.2)} disabled={unavailable || zoom >= 3.6}>+</button></div></div>
      {reduced && !motionOptIn && !unavailable && <p className="ah-motion-note" role="status">Reduced motion is on. Choose Play to start the animation.</p>}
      {!unavailable && <div className="ah-touch-tools"><button type="button" aria-pressed={touchExploring} onClick={() => { touchExploringRef.current = !touchExploringRef.current; setTouchExploring(touchExploringRef.current) }}>{touchExploring ? 'Finish exploring' : 'Explore by touch'}</button><p>{touchExploring ? 'Drag or pinch the floor. Finish exploring to scroll here again.' : 'Scroll freely. Choose Explore by touch to drag and pinch the floor.'}</p></div>}
      <div className="ah-world" ref={host} data-touch-exploring={touchExploring}>
        {unavailable ? <div className="ah-fallback" role="status"><h2>The illustrated floor is unavailable.</h2><p>You can still explore every workshop in the directory below.</p></div> : <canvas ref={canvas} tabIndex={0} aria-label="Animated workshop floor. Drag to explore, or use arrow keys. Enter selects the room at the center. Plus and minus zoom; Home resets." aria-describedby="ah-help" onKeyDown={e => {
          const directions: Record<string, [number, number]> = { ArrowLeft: [-70, 0], ArrowRight: [70, 0], ArrowUp: [0, -70], ArrowDown: [0, 70] }
          if (directions[e.key]) { e.preventDefault(); const [x, y] = directions[e.key]; camera.current.x += x / zoom; camera.current.y += y / zoom; wake.current() }
          else if (e.key === '+' || e.key === '=') { e.preventDefault(); changeZoom(1.2) }
          else if (e.key === '-') { e.preventDefault(); changeZoom(1 / 1.2) }
          else if (e.key === 'Home') { e.preventDefault(); home() }
          else if (e.key === 'Enter') { e.preventDefault(); choose(cellAt(camera.current.x, camera.current.y)) }
        }} />}
        <span className="ah-coordinate" aria-hidden="true">BAY {selection.col} / {selection.row}</span>
      </div>
      <div className="ah-caption"><p id="ah-help">Drag to explore · Pinch to zoom · Arrow keys to move · Enter to inspect</p><p>Eight workshop stories. Endless arrangements.</p></div>
      <section className="ah-selected" aria-live="polite" aria-atomic="true"><span className="ah-kicker">Inside this room</span><h2>{room.name}</h2><p>{room.note}</p></section>
      <details className="ah-directory"><summary>Visit a workshop</summary><div>{ROOMS.map((item, i) => {
        // Each type has a deterministic home, so the directory is usable without a canvas.
        let cell: Cell = { col: 0, row: 0 }; outer: for (let row = -8; row <= 8; row++) for (let col = -8; col <= 8; col++) if (roomType(col, row) === i) { cell = { col, row }; break outer }
        return <button key={item.name} onClick={() => choose(cell, true)}><strong>{item.name}</strong><span>{item.note}</span></button>
      })}</div></details>
      <footer className="ah-footer"><p>An original generative illustration, inspired by the joy of exploring <a href="https://floor796.com/" target="_blank" rel="noreferrer">Floor796</a>. All scenes here are newly drawn.</p><Link to="/studio">Back to the studio</Link></footer>
    </main>
  </div>
}
