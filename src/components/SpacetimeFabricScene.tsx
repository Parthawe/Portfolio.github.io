import { useState, useRef, useEffect, useMemo, useCallback, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════════════
   Spacetime Fabric — interactive gravitational well
   visualization inspired by the Black Hole "Fabric of
   the Universe" physical model.

   Drag masses on a wireframe grid. Watch spacetime warp.
   ═══════════════════════════════════════════════════════════ */

const GRID_SIZE = 6
const GRID_SEGS = 80
const MAX_MASSES = 3
const MASS_RADIUS = 0.18
const SOFTENING = 0.25

// Shared gravity formula — used by grid, masses, and particle
function computeGravityY(px: number, pz: number, masses: Mass[]): number {
  let y = 0
  for (const mass of masses) {
    const dx = px - mass.x
    const dz = pz - mass.z
    y -= mass.strength / (Math.sqrt(dx * dx + dz * dz) + SOFTENING)
  }
  return y
}

interface Mass {
  id: number
  x: number
  z: number
  strength: number
}

// ── Deformable grid ──

function FabricGrid({ masses }: { masses: Mass[] }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const posAttr = useRef<THREE.BufferAttribute>(null!)
  const origPositions = useRef<Float32Array>(null!)

  useEffect(() => {
    if (!meshRef.current) return
    const geo = meshRef.current.geometry as THREE.PlaneGeometry
    posAttr.current = geo.attributes.position as THREE.BufferAttribute
    origPositions.current = new Float32Array(posAttr.current.array)
  }, [])

  useFrame(() => {
    if (!posAttr.current || !origPositions.current) return
    const pos = posAttr.current
    const orig = origPositions.current

    for (let i = 0; i < pos.count; i++) {
      const ox = orig[i * 3]
      const oz = orig[i * 3 + 2]
      pos.setY(i, computeGravityY(ox, oz, masses))
    }

    pos.needsUpdate = true
    // No computeVertexNormals — wireframe doesn't use normals
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[GRID_SIZE, GRID_SIZE, GRID_SEGS, GRID_SEGS]} />
      <meshStandardMaterial
        color="#3355cc"
        wireframe
        transparent
        opacity={0.5}
        emissive="#3366ff"
        emissiveIntensity={0.25}
      />
    </mesh>
  )
}

// ── Draggable mass sphere ──

function MassSphere({ mass, masses, onDrag, onRemove }: {
  mass: Mass
  masses: Mass[]
  onDrag: (id: number, x: number, z: number) => void
  onRemove: (id: number) => void
}) {
  const ref = useRef<THREE.Mesh>(null!)
  const dragging = useRef(false)
  const { camera, gl } = useThree()
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])
  const rc = useMemo(() => new THREE.Raycaster(), [])
  const pt = useMemo(() => new THREE.Vector2(), [])
  const hit = useMemo(() => new THREE.Vector3(), [])
  const cleanupRef = useRef<(() => void) | null>(null)

  // Mass sits in its own gravitational well
  useFrame((state) => {
    if (!ref.current) return
    const wellY = computeGravityY(mass.x, mass.z, masses)
    const bob = dragging.current ? 0 : Math.sin(state.clock.elapsedTime * 1.5 + mass.id) * 0.04
    ref.current.position.set(mass.x, wellY + MASS_RADIUS + 0.02 + bob, mass.z)
  })

  const onDown = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    dragging.current = true
    gl.domElement.style.cursor = 'grabbing'

    const move = (ev: PointerEvent) => {
      if (!dragging.current) return
      const rect = gl.domElement.getBoundingClientRect()
      pt.set(((ev.clientX - rect.left) / rect.width) * 2 - 1, -((ev.clientY - rect.top) / rect.height) * 2 + 1)
      rc.setFromCamera(pt, camera)
      rc.ray.intersectPlane(plane, hit)
      const half = GRID_SIZE / 2 - 0.3
      const nx = Math.max(-half, Math.min(half, hit.x))
      const nz = Math.max(-half, Math.min(half, hit.z))
      onDrag(mass.id, nx, nz)
    }
    const up = () => {
      dragging.current = false
      gl.domElement.style.cursor = ''
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      cleanupRef.current = null
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    cleanupRef.current = up
  }, [camera, gl, mass.id, onDrag, plane, rc, pt, hit])

  // Cleanup window listeners on unmount
  useEffect(() => {
    return () => { cleanupRef.current?.() }
  }, [])

  return (
    <mesh
      ref={ref}
      position={[mass.x, 0.1, mass.z]}
      onPointerDown={onDown}
      onDoubleClick={(e) => { e.stopPropagation(); onRemove(mass.id) }}
      onPointerOver={() => { gl.domElement.style.cursor = 'grab' }}
      onPointerOut={() => { if (!dragging.current) gl.domElement.style.cursor = '' }}
    >
      <sphereGeometry args={[MASS_RADIUS, 24, 24]} />
      <meshPhysicalMaterial
        color="#0a0a18"
        roughness={0.05}
        metalness={1}
        emissive="#5533bb"
        emissiveIntensity={0.4}
        clearcoat={1}
        clearcoatRoughness={0.02}
      />
    </mesh>
  )
}

// ── Star particles background ──

function Stars() {
  const count = 200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12 + 3
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8888cc" size={0.03} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// ── Click-to-add handler (on the grid plane) ──

function ClickPlane({ onAdd }: { onAdd: (x: number, z: number) => void }) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.01, 0]}
      onClick={(e) => {
        e.stopPropagation()
        // R3F provides world-space intersection point directly
        const half = GRID_SIZE / 2 - 0.5
        if (Math.abs(e.point.x) < half && Math.abs(e.point.z) < half) {
          onAdd(e.point.x, e.point.z)
        }
      }}
    >
      <planeGeometry args={[GRID_SIZE, GRID_SIZE]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  )
}

// ── Test Particle — rolls along spacetime curvature ──

const TRAIL_MAX = 40

function TestParticle({ masses }: { masses: Mass[] }) {
  const ref = useRef<THREE.Mesh>(null!)
  const vel = useRef({ x: 0, z: 0 })
  const pos = useRef({ x: 0, z: 0 })
  const trailRef = useRef<THREE.Line>(null!)
  const trailCount = useRef(0)
  // Pre-allocate trail buffer (reused every frame — no GC churn)
  const trailBuffer = useMemo(() => new Float32Array(TRAIL_MAX * 3), [])
  const trailPositions = useRef<{ x: number; y: number; z: number }[]>([])
  const absorbed = useRef(false)
  const respawnTimer = useRef(0)

  // Spawn at random edge
  const spawn = useCallback(() => {
    const side = Math.floor(Math.random() * 4)
    const half = GRID_SIZE / 2 - 0.5
    const r = (Math.random() - 0.5) * GRID_SIZE * 0.6
    if (side === 0) { pos.current = { x: -half, z: r }; vel.current = { x: 0.3, z: 0 } }
    else if (side === 1) { pos.current = { x: half, z: r }; vel.current = { x: -0.3, z: 0 } }
    else if (side === 2) { pos.current = { x: r, z: -half }; vel.current = { x: 0, z: 0.3 } }
    else { pos.current = { x: r, z: half }; vel.current = { x: 0, z: -0.3 } }
    trailPositions.current = []
    trailCount.current = 0
    absorbed.current = false
  }, [])

  useEffect(() => { spawn() }, [spawn])

  useFrame((_, rawDt) => {
    if (!ref.current) return
    // Clamp dt to prevent physics explosions on tab switch
    const dt = Math.min(rawDt, 0.05)
    const p = pos.current
    const v = vel.current

    if (absorbed.current) {
      respawnTimer.current -= dt
      if (respawnTimer.current <= 0) spawn()
      ref.current.visible = false
      return
    }
    ref.current.visible = true

    // Gravitational acceleration from masses
    let ax = 0, az = 0
    for (const mass of masses) {
      const dx = mass.x - p.x
      const dz = mass.z - p.z
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist < 0.3) {
        absorbed.current = true
        respawnTimer.current = 1.5
        return
      }
      const force = mass.strength / (dist * dist + 0.4)
      ax += force * dx / (dist + 0.01)
      az += force * dz / (dist + 0.01)
    }

    // Update velocity + frame-rate independent damping
    v.x += ax * dt * 2
    v.z += az * dt * 2
    // damping: 0.995^60 ≈ 0.74 per second → use exp(-0.3 * dt) for frame-rate independence
    const damp = Math.exp(-0.3 * dt * 60)
    v.x *= damp
    v.z *= damp

    // Clamp speed
    const speed = Math.sqrt(v.x * v.x + v.z * v.z)
    if (speed > 2) { v.x *= 2 / speed; v.z *= 2 / speed }

    // Update position
    p.x += v.x * dt
    p.z += v.z * dt

    // Bounce off grid edges
    const half = GRID_SIZE / 2 - 0.2
    if (Math.abs(p.x) > half) { p.x = Math.sign(p.x) * half; v.x *= -0.5 }
    if (Math.abs(p.z) > half) { p.z = Math.sign(p.z) * half; v.z *= -0.5 }

    // Compute Y from gravity field
    const y = computeGravityY(p.x, p.z, masses)
    ref.current.position.set(p.x, y + 0.06, p.z)

    // Trail — push into ring buffer, reuse pre-allocated Float32Array
    const tp = trailPositions.current
    tp.push({ x: p.x, y: y + 0.06, z: p.z })
    if (tp.length > TRAIL_MAX) tp.shift()

    if (trailRef.current) {
      const geo = trailRef.current.geometry
      for (let i = 0; i < tp.length; i++) {
        trailBuffer[i * 3] = tp[i].x
        trailBuffer[i * 3 + 1] = tp[i].y
        trailBuffer[i * 3 + 2] = tp[i].z
      }
      const attr = geo.attributes.position as THREE.BufferAttribute
      attr.needsUpdate = true
      geo.setDrawRange(0, tp.length)
    }
  })

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#00ddff" emissive="#00bbff" emissiveIntensity={1.5} />
      </mesh>
      <line ref={trailRef as React.RefObject<THREE.Line>}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[trailBuffer, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00bbff" transparent opacity={0.3} />
      </line>
    </>
  )
}

// ── Main scene ──

function GravityScene({ masses, onDrag, onRemove, onAdd }: {
  masses: Mass[]
  onDrag: (id: number, x: number, z: number) => void
  onRemove: (id: number) => void
  onAdd: (x: number, z: number) => void
}) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <hemisphereLight args={['#1122aa', '#000000', 0.1]} />
      <pointLight position={[0, 5, 0]} intensity={0.6} color="#6644cc" />
      <directionalLight position={[3, 4, 2]} intensity={0.35} />

      <Stars />

      <group>
        <FabricGrid masses={masses} />
        <ClickPlane onAdd={onAdd} />
        {masses.map(m => (
          <MassSphere key={m.id} mass={m} masses={masses} onDrag={onDrag} onRemove={onRemove} />
        ))}
        <TestParticle masses={masses} />
      </group>
    </>
  )
}

// ═══════════════════════════════════════════════════════════
// Export
// ═══════════════════════════════════════════════════════════

export default function SpacetimeFabricScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [masses, setMasses] = useState<Mass[]>([
    { id: 1, x: 0, z: 0, strength: 1.2 },
  ])
  const nextId = useRef(2)

  const handleDrag = useCallback((id: number, x: number, z: number) => {
    setMasses(prev => prev.map(m => m.id === id ? { ...m, x, z } : m))
  }, [])

  const handleRemove = useCallback((id: number) => {
    setMasses(prev => prev.length > 1 ? prev.filter(m => m.id !== id) : prev)
  }, [])

  const handleAdd = useCallback((x: number, z: number) => {
    setMasses(prev => {
      if (prev.length >= MAX_MASSES) return prev
      const id = nextId.current++
      return [...prev, { id, x, z, strength: 0.8 + Math.random() * 0.6 }]
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%', aspectRatio: '16 / 10',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        border: '1px solid rgba(100,100,200,0.15)',
        boxShadow: '0 8px 40px rgba(30,20,80,0.3), 0 2px 8px rgba(0,0,0,0.2)',
        background: '#050510',
        position: 'relative',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 4.5, 6], fov: 40 }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
        style={{ background: '#050510' }}
        frameloop={inView ? 'always' : 'never'}
      >
        <Suspense fallback={null}>
          <GravityScene
            masses={masses}
            onDrag={handleDrag}
            onRemove={handleRemove}
            onAdd={handleAdd}
          />
        </Suspense>
      </Canvas>

      {/* Hint overlay */}
      <div style={{
        position: 'absolute', bottom: 12, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 8,
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '9px',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgba(150,150,220,0.4)',
          padding: '4px 10px', borderRadius: 'var(--radius-pill)',
          background: 'rgba(100,100,200,0.08)',
        }}>
          Drag mass &middot; Click to add ({masses.length}/{MAX_MASSES}) &middot; Double-click to remove
        </span>
      </div>
    </div>
  )
}
