import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js'
import '../styles/ascii-hero-image.css'

type Props = { src: string; className: string }

/** Local-only study: existing Three.js geometry rendered with its ASCII addon. */
export default function AsciiHeroImage({ src, className }: Props) {
  const host = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const model = new URLSearchParams(window.location.search).get('model') === 'teapot' ? 'teapot' : 'knot'
  useEffect(() => {
    const element = host.current
    if (!element) return
    let frame = 0
    let previous = 0
    let visible = true
    let dirty = true
    let dragging = false
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }) }
    catch { return }
    renderer.setClearColor(0xffffff, 0)
    renderer.setPixelRatio(1)
    const effect = new AsciiEffect(renderer, ' .,:;i1tfLCG08@', { resolution: .29 })
    effect.domElement.className = 'ascii-hero-image__live'
    effect.domElement.setAttribute('aria-hidden', 'true')
    element.appendChild(effect.domElement)
    const sizeEffect = (width: number, height: number) => {
      effect.setSize(width, height)
      const table = effect.domElement.querySelector('table')
      if (table) table.style.letterSpacing = `${-.2 / .29}px`
    }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 20)
    camera.position.set(0, .25, 5.8)
    const geometry = model === 'teapot'
      ? new TeapotGeometry(.64, 12)
      : new THREE.TorusKnotGeometry(.78, .27, 192, 32, 2, 3)
    geometry.center()
    const material = new THREE.MeshStandardMaterial({ color: 0x8b8b8b, roughness: .6, metalness: .15, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.set(.3, -.3, model === 'knot' ? -.3 : 0)
    scene.add(mesh)
    scene.add(new THREE.AmbientLight(0xffffff, .3))
    const key = new THREE.DirectionalLight(0xffffff, 1.8)
    key.position.set(-3, 4, 5)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xffffff, 1)
    rim.position.set(4, -1, -3)
    scene.add(rim)
    const controls = new OrbitControls(camera, effect.domElement)
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = .075
    controls.rotateSpeed = .65
    controls.autoRotateSpeed = .5 // One turn in about two minutes.
    controls.addEventListener('start', () => { dragging = true; element.dataset.dragging = 'true' })
    controls.addEventListener('end', () => { dragging = false; delete element.dataset.dragging })
    controls.addEventListener('change', () => { dirty = true })
    const resize = new ResizeObserver(() => {
      const width = element.clientWidth
      const height = element.clientHeight
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      sizeEffect(width, height)
      dirty = true
    })
    resize.observe(element)
    sizeEffect(element.clientWidth || 320, element.clientHeight || 320)
    const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false })
    observer.observe(element)
    const onKey = (event: KeyboardEvent) => {
      const axis = event.key === 'ArrowLeft' || event.key === 'ArrowRight' ? 'y' : 'x'
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
      event.preventDefault()
      mesh.rotation[axis] += ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -.18 : .18
      dirty = true
    }
    element.addEventListener('keydown', onKey)
    const tick = (time: number) => {
      frame = requestAnimationFrame(tick)
      if (!visible || document.hidden) { previous = time; return }
      if (time - previous < 1000 / 24) return
      const delta = Math.min((time - previous) / 1000, .08)
      previous = time
      controls.autoRotate = !reducedMotion.matches && !pausedRef.current && !dragging
      controls.enableDamping = !pausedRef.current && !reducedMotion.matches
      if (!pausedRef.current && !reducedMotion.matches) controls.update(delta)
      if (!dirty && !controls.autoRotate) return
      effect.render(scene, camera)
      dirty = false
      setReady(true)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      observer.disconnect()
      controls.dispose()
      element.removeEventListener('keydown', onKey)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      effect.domElement.remove()
    }
  }, [model])
  return <span ref={host} className={`${className} ascii-hero-image`} data-ascii-ready={ready} tabIndex={0}
    role="group" aria-label={`Interactive ASCII ${model === 'knot' ? 'torus knot' : 'Utah teapot'}. Drag or use arrow keys to rotate.`}>
    <img src={src} alt="" draggable={false} fetchPriority="high" className="ascii-hero-image__fallback" />
    {ready && <span className="ascii-hero-image__controls">
      <span>Drag to rotate</span>
      <button type="button" onClick={() => { pausedRef.current = !pausedRef.current; setPaused(pausedRef.current) }}
        aria-label={paused ? 'Resume automatic rotation' : 'Pause automatic rotation'}>{paused ? 'Play' : 'Pause'}</button>
    </span>}
  </span>
}
