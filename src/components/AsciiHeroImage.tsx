import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
import '../styles/ascii-hero-image.css'

type Props = { src: string; className: string }

/** Private study using the official Three.js animated ASCII effect. */
export default function AsciiHeroImage({ src, className }: Props) {
  const host = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const element = host.current
    if (!element) return
    let disposed = false
    let frame = 0
    let lastFrame = 0
    let elapsed = 0
    let visible = true
    let loaded = false
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }) }
    catch { return }
    renderer.setClearColor(0xffffff, 0)
    renderer.setPixelRatio(1)
    const effect = new AsciiEffect(renderer, ' .,:;i1tfLCG08@', { resolution: .28 })
    effect.domElement.className = 'ascii-hero-image__live'
    effect.domElement.setAttribute('aria-hidden', 'true')
    element.appendChild(effect.domElement)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 10)
    camera.position.z = 3.5
    const pointer = new THREE.Vector2()
    const targetPointer = new THREE.Vector2()
    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      uPointer: { value: pointer },
    }
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z += sin(p.x * 3.0 + uTime * .7) * cos(p.y * 2.5 - uTime * .5) * .045;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform vec2 uPointer;
        void main() {
          vec4 source = texture2D(uTexture, vUv);
          if (source.a < .18) discard;
          float luma = dot(source.rgb, vec3(.2126, .7152, .0722));
          float wave = sin(vUv.x * 8.0 + vUv.y * 5.0 - uTime * 1.2) * .055;
          float light = exp(-length(vUv - (uPointer * .5 + .5)) * 6.0) * .12;
          float tone = clamp(pow(luma, 1.4) * .78 + wave - light, .04, .85);
          gl_FragColor = vec4(vec3(tone), source.a);
        }`,
    })
    const geometry = new THREE.PlaneGeometry(2.35, 2.35, 36, 36)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    const texture = new THREE.TextureLoader().load(src, image => {
      if (disposed) { image.dispose(); return }
      image.colorSpace = THREE.NoColorSpace
      uniforms.uTexture.value = image
      loaded = true
    }, undefined, () => { if (!disposed) setReady(false) })
    const resize = new ResizeObserver(() => {
      const width = element.clientWidth
      const height = element.clientHeight
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      effect.setSize(width, height)
    })
    resize.observe(element)
    effect.setSize(element.clientWidth || 320, element.clientHeight || 320)
    const onPointer = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      targetPointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height * 2 - 1))
    }
    const reset = () => targetPointer.set(0, 0)
    element.addEventListener('pointermove', onPointer)
    element.addEventListener('pointerleave', reset)
    const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false })
    observer.observe(element)
    const tick = (time: number) => {
      frame = requestAnimationFrame(tick)
      if (!visible || document.hidden || !loaded || time - lastFrame < 1000 / 24) return
      elapsed += Math.min((time - lastFrame) / 1000, .06)
      lastFrame = time
      if (!reducedMotion.matches) {
        uniforms.uTime.value = elapsed
        pointer.lerp(targetPointer, .08)
        mesh.rotation.y = Math.sin(elapsed * .4) * .065 + pointer.x * .11
        mesh.rotation.x = Math.cos(elapsed * .35) * .035 - pointer.y * .07
        mesh.position.y = Math.sin(elapsed * .7) * .022
      }
      effect.render(scene, camera)
      setReady(true)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      resize.disconnect()
      observer.disconnect()
      element.removeEventListener('pointermove', onPointer)
      element.removeEventListener('pointerleave', reset)
      texture.dispose()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      effect.domElement.remove()
    }
  }, [src])
  return <span ref={host} className={`${className} ascii-hero-image`} data-ascii-ready={ready} aria-hidden="true">
    <img src={src} alt="" draggable={false} fetchPriority="high" className="ascii-hero-image__fallback" />
  </span>
}
