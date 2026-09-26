import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createAsciiModel, modelNames } from './asciiCategoryModels'
import '../styles/ascii-hero-image.css'

type Props = { src?: string; className: string; model?: string; motionEnabled?: boolean }

/** Local-only study: existing Three.js geometry rendered with its ASCII addon. */
export default function AsciiHeroImage({ src, className, model: defaultModel = 'knot', motionEnabled = true }: Props) {
  const host = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)
  const pausedRef = useRef(false)
  const requestedModel = new URLSearchParams(window.location.search).get('model')
  const model = requestedModel && modelNames[requestedModel] ? requestedModel : defaultModel
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
    const effect = new AsciiEffect(renderer, ' .,:;i1tfLCG08@', { resolution: .29, color: true })
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
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: .45, metalness: .12, side: THREE.DoubleSide })
    const mesh = createAsciiModel(model, material)
    const palettes: Record<string, string[]> = {
      cube: ['#244bdb', '#7132d6', '#ed4678'],
      orbit: ['#175ade', '#00a7a5', '#b34ae3'],
      glasses: ['#2759e0', '#9443df', '#e24694'],
      coin: ['#9c3bc9', '#ed7540', '#c89216'],
      coins: ['#126bc0', '#16a690', '#b89126'],
      rings: ['#dc366e', '#8a38d4', '#295bdd'],
      lens: ['#166cbd', '#089d91', '#6c56d7'],
      cross: ['#047f85', '#1ba675', '#3779d1'],
      arch: ['#d35b31', '#c83b7c', '#6551ce'],
      reel: ['#d44774', '#b53fc5', '#405ce1'],
      teapot: ['#168b82', '#548f36', '#c9862b'],
      knot: ['#2752d9', '#9441d2', '#e3478c'],
    }
    const palette = (palettes[model] || palettes.knot).map(value => new THREE.Color(value))
    // Color lives on the surface, so the glyph colors turn with the geometry.
    mesh.updateMatrixWorld(true)
    const point = new THREE.Vector3()
    mesh.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return
      const positions = object.geometry.getAttribute('position')
      const colors = new Float32Array(positions.count * 3)
      for (let index = 0; index < positions.count; index++) {
        point.fromBufferAttribute(positions, index).applyMatrix4(object.matrixWorld)
        const t = THREE.MathUtils.clamp((point.x + point.y * .65 + point.z * .35 + 1.7) / 3.4, 0, 1) * 2
        const stop = Math.min(1, Math.floor(t))
        const color = palette[stop].clone().lerp(palette[stop + 1], t - stop)
        color.toArray(colors, index * 3)
      }
      object.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    })
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
      if (event.code === 'Space') {
        event.preventDefault()
        pausedRef.current = !pausedRef.current
        return
      }
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
      controls.autoRotate = motionEnabled && !reducedMotion.matches && !pausedRef.current && !dragging
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
      mesh.traverse(object => { if (object instanceof THREE.Mesh) object.geometry.dispose() })
      material.dispose()
      renderer.dispose()
      effect.domElement.remove()
    }
  }, [model, motionEnabled])
  return <span ref={host} className={`${className} ascii-hero-image`} data-ascii-ready={ready} tabIndex={0}
    role="group" aria-label={`Interactive ASCII ${modelNames[model]}. Drag or use arrow keys to rotate. Press Space to pause or resume.`}>
    {src ? <img src={src} alt="" draggable={false} fetchPriority="high" className="ascii-hero-image__fallback" /> : !ready && <span className="ascii-hero-image__unavailable">3D {modelNames[model]}</span>}

  </span>
}
