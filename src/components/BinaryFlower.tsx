import { useEffect, useMemo, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePrefersReduced } from '../hooks/usePrefersReduced'
import { useWebGLAvailable } from '../hooks/useWebGLAvailable'

type BinaryPoint = {
  x: number
  y: number
  z: number
  scale: number
  petal: number
  depth: number
  twist: number
}

function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function makeGlyphTexture(glyph: '0' | '1') {
  const canvas = document.createElement('canvas')
  canvas.width = 96
  canvas.height = 96
  const ctx = canvas.getContext('2d')

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = '700 68px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
    ctx.shadowBlur = 8
    ctx.fillStyle = '#fffaf0'
    ctx.fillText(glyph, 48, 48)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = false
  return texture
}

function createFlowerPoints() {
  const points: BinaryPoint[] = []
  const petalCount = 6

  for (let petal = 0; petal < petalCount; petal++) {
    const petalAngle = (petal / petalCount) * Math.PI * 2 - Math.PI / 2

    for (let row = 0; row < 23; row++) {
      const depth = row / 22
      const petalWidth = Math.sin(depth * Math.PI) * (0.56 + 0.12 * seeded(petal * 19 + row))
      const samples = Math.max(3, Math.round(5 + petalWidth * 13))
      const radius = 0.24 + depth * 2.2
      const curl = Math.sin(depth * Math.PI) * 0.2

      for (let col = 0; col < samples; col++) {
        const u = samples === 1 ? 0 : col / (samples - 1)
        const lateral = (u - 0.5) * petalWidth
        const seed = petal * 997 + row * 37 + col * 11
        const angle = petalAngle + lateral + curl
        const noiseX = (seeded(seed) - 0.5) * 0.045
        const noiseY = (seeded(seed + 4) - 0.5) * 0.045
        const cup = Math.sin(depth * Math.PI) * 0.46 - depth * 0.18

        points.push({
          x: Math.cos(angle) * radius + noiseX,
          y: Math.sin(angle) * radius * 0.74 + noiseY,
          z: cup + (seeded(seed + 9) - 0.5) * 0.14,
          scale: 0.08 + seeded(seed + 13) * 0.035 + (1 - depth) * 0.035,
          petal,
          depth,
          twist: (seeded(seed + 21) - 0.5) * 0.65,
        })
      }
    }
  }

  for (let ring = 0; ring < 5; ring++) {
    const count = 16 + ring * 8
    const radius = 0.08 + ring * 0.08

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const seed = 5000 + ring * 59 + i
      points.push({
        x: Math.cos(angle) * radius + (seeded(seed) - 0.5) * 0.035,
        y: Math.sin(angle) * radius * 0.8 + (seeded(seed + 2) - 0.5) * 0.035,
        z: 0.42 + ring * 0.02,
        scale: 0.09 + seeded(seed + 3) * 0.04,
        petal: ring,
        depth: 0,
        twist: angle,
      })
    }
  }

  return points
}

function BinaryGlyphField({
  glyph,
  points,
  reduced,
}: {
  glyph: '0' | '1'
  points: BinaryPoint[]
  reduced: boolean
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const texture = useMemo(() => makeGlyphTexture(glyph), [glyph])
  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1), [])
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      }),
    [texture],
  )

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
      texture.dispose()
    },
    [geometry, material, texture],
  )

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return

    const color = new THREE.Color()
    points.forEach((point, index) => {
      const warmCenter = point.depth < 0.2
      const hue = warmCenter ? 0.09 + seeded(index) * 0.04 : 0.46 + point.depth * 0.08
      const saturation = warmCenter ? 0.76 : 0.22 + point.depth * 0.18
      const lightness = warmCenter ? 0.56 + seeded(index + 7) * 0.18 : 0.62 + seeded(index + 5) * 0.24
      color.setHSL(hue, saturation, lightness)
      mesh.setColorAt(index, color)
    })

    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [points])

  useFrame(({ clock, pointer }) => {
    const mesh = meshRef.current
    if (!mesh) return

    const time = reduced ? 0.7 : clock.getElapsedTime()
    const pointerBendX = reduced ? 0 : pointer.x * 0.16
    const pointerBendY = reduced ? 0 : pointer.y * 0.1

    points.forEach((point, index) => {
      const breathe = Math.sin(time * 0.9 + point.petal * 0.72 + point.depth * 4.1)
      const unfurl = reduced ? 0 : breathe * 0.13 * (0.24 + point.depth)
      const x = point.x * (1 + unfurl * 0.08)
      const y = point.y * (1 + unfurl * 0.06)
      const z = point.z + unfurl

      dummy.position.set(x, y, z)
      dummy.rotation.set(
        -0.14 + point.depth * 0.32 + pointerBendY,
        point.twist + pointerBendX,
        point.twist * 0.42 + breathe * 0.08,
      )
      dummy.scale.setScalar(point.scale * (1 + Math.max(0, breathe) * 0.16))
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, points.length]} frustumCulled={false} />
  )
}

function BinaryFlowerScene({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const points = useMemo(() => createFlowerPoints(), [])
  const zeros = useMemo(() => points.filter((_, index) => index % 3 === 0), [points])
  const ones = useMemo(() => points.filter((_, index) => index % 3 !== 0), [points])

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current
    if (!group) return

    const time = reduced ? 0.9 : clock.getElapsedTime()
    group.rotation.x = -0.15 + (reduced ? 0 : pointer.y * 0.08)
    group.rotation.y = Math.sin(time * 0.28) * 0.2 + (reduced ? 0 : pointer.x * 0.18)
    group.rotation.z = Math.sin(time * 0.2) * 0.04
  })

  return (
    <group ref={groupRef} scale={1.08}>
      <BinaryGlyphField glyph="0" points={zeros} reduced={reduced} />
      <BinaryGlyphField glyph="1" points={ones} reduced={reduced} />
    </group>
  )
}

function BinaryFlowerFallback() {
  return (
    <div className="abt-binary-flower-fallback" aria-hidden="true">
      {Array.from({ length: 84 }, (_, index) => (
        <span key={index}>{index % 3 === 0 ? '0' : '1'}</span>
      ))}
    </div>
  )
}

function BinaryFlowerDom() {
  const points = useMemo(() => createFlowerPoints().filter((_, index) => index % 2 === 0), [])

  return (
    <div className="abt-binary-flower-dom" aria-hidden="true">
      {points.map((point, index) => {
        const left = 50 + point.x * 15.8
        const top = 52 - point.y * 20
        const warmCenter = point.depth < 0.2
        const color = warmCenter
          ? `hsl(${34 + seeded(index) * 16} 92% ${62 + seeded(index + 4) * 18}%)`
          : `hsl(${168 + point.depth * 38} ${26 + point.depth * 26}% ${62 + seeded(index + 2) * 22}%)`
        const style = {
          left: `${left}%`,
          top: `${top}%`,
          color,
          '--binary-z': `${point.z.toFixed(3)}`,
          '--binary-scale': `${(0.78 + point.scale * 4.1).toFixed(3)}`,
          '--binary-rotate': `${(point.twist * 32).toFixed(2)}deg`,
          '--binary-delay': `${(-index * 0.036).toFixed(3)}s`,
        } as CSSProperties

        return (
          <span className="abt-binary-flower-glyph" style={style} key={`${point.petal}-${index}`}>
            {index % 3 === 0 ? '0' : '1'}
          </span>
        )
      })}
    </div>
  )
}

export default function BinaryFlower() {
  const reduced = usePrefersReduced()
  const webGLAvailable = useWebGLAvailable()

  return (
    <div className="abt-binary-flower" aria-label="Generative binary flower object">
      {webGLAvailable ? (
        <Canvas
          className="abt-binary-flower-canvas"
          camera={{ position: [0, 0, 5.15], fov: 43 }}
          dpr={[1, 1.75]}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#080808']} />
          <BinaryFlowerScene reduced={reduced} />
        </Canvas>
      ) : (
        <BinaryFlowerFallback />
      )}
      <BinaryFlowerDom />
    </div>
  )
}
