import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Reduced motion ─── */

function usePrefersReduced() {
  const [r, setR] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const h = (e: MediaQueryListEvent) => setR(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return r;
}

/* ─── Constellation lines — glowing curved connections ─── */

function ConstellationLines({ positions }: { positions: [number, number, number][] }) {
  const groupRef = useRef<THREE.Group>(null!);

  const curves = useMemo(() => {
    const result: { geo: THREE.BufferGeometry }[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = new THREE.Vector3(...positions[i]);
        const b = new THREE.Vector3(...positions[j]);
        const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
        // Slight curve outward from center
        const center = new THREE.Vector3(0, 0, 0);
        const outDir = mid.clone().sub(center).normalize();
        mid.add(outDir.multiplyScalar(0.3));
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        const pts = curve.getPoints(24);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        result.push({ geo });
      }
    }
    return result;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
      if (mat) mat.opacity = 0.025 + Math.sin(t * 0.4 + i * 0.5) * 0.015;
    });
  });

  return (
    <group ref={groupRef}>
      {curves.map((c, i) => (
        <line key={i} geometry={c.geo}>
          <lineBasicMaterial color="#aabbff" transparent opacity={0.03} depthWrite={false} />
        </line>
      ))}
    </group>
  );
}

/* ─── Discipline label ─── */

function Label({ position, text, offset = [0, -0.9, 0] }: {
  position: [number, number, number];
  text: string;
  offset?: [number, number, number];
}) {
  return (
    <Text
      position={[position[0] + offset[0], position[1] + offset[1], position[2] + offset[2]]}
      fontSize={0.14}
      color="#ffffff"
      anchorX="center"
      anchorY="top"
      letterSpacing={0.12}
      fillOpacity={0.4}
    >
      {text}
    </Text>
  );
}

/* ─── Shared materials ─── */

const BRUSHED_METAL = { color: '#c8c8d0', metalness: 0.92, roughness: 0.18 };
const DARK_METAL = { color: '#2a2a30', metalness: 0.85, roughness: 0.25 };
const GLASS = { color: '#99aacc', metalness: 0.05, roughness: 0.02, transmission: 0.92, transparent: true, opacity: 0.2, ior: 1.5, thickness: 0.3 };

/* ─── AI & Wearables — precision lens assembly ─── */

function LensAssembly({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.12;
  });
  return (
    <Float speed={0.5} floatIntensity={0.3} rotationIntensity={0.1}>
      <group position={position} ref={ref}>
        {/* Outer housing */}
        <mesh>
          <torusGeometry args={[0.65, 0.08, 24, 64]} />
          <meshStandardMaterial {...BRUSHED_METAL} />
        </mesh>
        {/* Inner ring — darker */}
        <mesh>
          <torusGeometry args={[0.48, 0.05, 20, 64]} />
          <meshStandardMaterial {...DARK_METAL} />
        </mesh>
        {/* Lens element */}
        <mesh>
          <torusGeometry args={[0.32, 0.035, 16, 64]} />
          <meshStandardMaterial color="#d8d8e0" metalness={0.95} roughness={0.08} emissive="#ffffff" emissiveIntensity={0.04} />
        </mesh>
        {/* Glass center */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.06, 32]} />
          <meshPhysicalMaterial {...GLASS} color="#667799" ior={2.0} />
        </mesh>
        {/* Center dot — bright */}
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} metalness={0.2} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Product Design — frosted glass tablet with wireframe UI ─── */

function GlassTablet({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.08;
  });

  const wireLines = useMemo(() => {
    const pts: THREE.Vector3[][] = [];
    // Horizontal rules
    for (let i = 0; i < 8; i++) {
      const y = -0.42 + i * 0.12;
      const w = i < 2 ? 0.38 : 0.3 + Math.random() * 0.1;
      pts.push([new THREE.Vector3(-0.38, y, 0.028), new THREE.Vector3(w, y, 0.028)]);
    }
    // Vertical dividers
    pts.push([new THREE.Vector3(-0.1, -0.42, 0.028), new THREE.Vector3(-0.1, 0.42, 0.028)]);
    pts.push([new THREE.Vector3(0.15, -0.1, 0.028), new THREE.Vector3(0.15, 0.42, 0.028)]);
    // Boxes (wireframe rectangles)
    const box = (x: number, y: number, w: number, h: number) => {
      const z = 0.028;
      pts.push([new THREE.Vector3(x, y, z), new THREE.Vector3(x + w, y, z)]);
      pts.push([new THREE.Vector3(x + w, y, z), new THREE.Vector3(x + w, y + h, z)]);
      pts.push([new THREE.Vector3(x + w, y + h, z), new THREE.Vector3(x, y + h, z)]);
      pts.push([new THREE.Vector3(x, y + h, z), new THREE.Vector3(x, y, z)]);
      // Diagonal cross
      pts.push([new THREE.Vector3(x, y, z), new THREE.Vector3(x + w, y + h, z)]);
    };
    box(-0.36, -0.38, 0.24, 0.2);
    box(-0.36, 0.08, 0.24, 0.18);
    box(0.02, -0.38, 0.35, 0.28);
    box(0.02, 0.14, 0.35, 0.2);
    return pts;
  }, []);

  return (
    <Float speed={0.7} floatIntensity={0.4} rotationIntensity={0.15}>
      <group position={position} rotation={[0.08, -0.15, 0.03]} ref={ref}>
        {/* Frosted glass panel */}
        <mesh>
          <boxGeometry args={[0.9, 1.05, 0.04]} />
          <meshPhysicalMaterial
            color="#dde0e8"
            metalness={0.02}
            roughness={0.15}
            transmission={0.75}
            transparent
            opacity={0.3}
            ior={1.45}
            thickness={0.04}
          />
        </mesh>
        {/* Top bar */}
        <mesh position={[0, 0.48, 0.005]}>
          <boxGeometry args={[0.9, 0.07, 0.045]} />
          <meshStandardMaterial {...BRUSHED_METAL} color="#d0d0d8" />
        </mesh>
        {/* Wire etchings */}
        {wireLines.map((pair, i) => {
          const g = new THREE.BufferGeometry().setFromPoints(pair);
          return (
            <line key={i} geometry={g}>
              <lineBasicMaterial color="#ffffff" transparent opacity={0.18} />
            </line>
          );
        })}
      </group>
    </Float>
  );
}

/* ─── Creative Technology — nested glass star/crystal ─── */

function GlassCrystal({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.1;
    ref.current.rotation.y = t * 0.15;
  });
  return (
    <Float speed={0.8} floatIntensity={0.5} rotationIntensity={0.2}>
      <group position={position} ref={ref}>
        {/* Outer icosahedron — glass */}
        <mesh>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshPhysicalMaterial {...GLASS} color="#aabbdd" opacity={0.15} />
        </mesh>
        {/* Inner icosahedron — smaller, rotated, brighter */}
        <mesh rotation={[0, 0, Math.PI / 5]}>
          <icosahedronGeometry args={[0.35, 0]} />
          <meshPhysicalMaterial {...GLASS} color="#bbccee" opacity={0.2} />
        </mesh>
        {/* Core sphere — metal */}
        <mesh>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial {...BRUSHED_METAL} emissive="#aaccff" emissiveIntensity={0.08} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Design for Good — organic blob / soft sculpture ─── */

function SoftSculpture({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(0.45, 32, 32);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const noise = Math.sin(x * 4) * Math.cos(y * 3) * Math.sin(z * 5) * 0.12;
      const noise2 = Math.sin(x * 7 + 1) * Math.cos(z * 6 + 2) * 0.06;
      pos.setXYZ(i, x + noise + noise2, y + noise * 0.8, z + noise + noise2);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.08;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.12) * 0.1;
  });

  return (
    <Float speed={0.6} floatIntensity={0.4} rotationIntensity={0.1}>
      <mesh position={position} geometry={geo} ref={ref}>
        <meshStandardMaterial
          color="#3a3a42"
          metalness={0.15}
          roughness={0.65}
        />
      </mesh>
    </Float>
  );
}

/* ─── Installations — metallic rod truss structure ─── */

function TrussStructure({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.06;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.05;
  });

  const rods = useMemo(() => {
    const result: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const s = 0.5;
    const corners: THREE.Vector3[] = [
      new THREE.Vector3(-s, -s, -s), new THREE.Vector3(s, -s, -s),
      new THREE.Vector3(s, s, -s), new THREE.Vector3(-s, s, -s),
      new THREE.Vector3(-s, -s, s), new THREE.Vector3(s, -s, s),
      new THREE.Vector3(s, s, s), new THREE.Vector3(-s, s, s),
    ];
    // All cube edges
    const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    // Face diagonals for truss effect
    const diags = [[0,2],[1,3],[4,6],[5,7],[0,5],[1,4],[2,7],[3,6],[0,7],[1,6],[2,5],[3,4]];
    for (const [a, b] of [...edges, ...diags]) {
      result.push({ start: corners[a], end: corners[b] });
    }
    return result;
  }, []);

  return (
    <Float speed={0.7} floatIntensity={0.5} rotationIntensity={0.15}>
      <group position={position} rotation={[0.4, 0.3, 0.15]} ref={ref}>
        {rods.map((rod, i) => {
          const mid = new THREE.Vector3().addVectors(rod.start, rod.end).multiplyScalar(0.5);
          const len = rod.start.distanceTo(rod.end);
          const dir = new THREE.Vector3().subVectors(rod.end, rod.start).normalize();
          const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          const isEdge = i < 12;
          return (
            <mesh key={i} position={mid} quaternion={quat}>
              <cylinderGeometry args={[isEdge ? 0.018 : 0.008, isEdge ? 0.018 : 0.008, len, 6]} />
              <meshStandardMaterial
                color={isEdge ? '#c0c0c8' : '#888890'}
                metalness={0.9}
                roughness={isEdge ? 0.15 : 0.3}
              />
            </mesh>
          );
        })}
        {/* Joint spheres */}
        {[[-0.5,-0.5,-0.5],[0.5,-0.5,-0.5],[0.5,0.5,-0.5],[-0.5,0.5,-0.5],
          [-0.5,-0.5,0.5],[0.5,-0.5,0.5],[0.5,0.5,0.5],[-0.5,0.5,0.5]].map((p, i) => (
          <mesh key={`j${i}`} position={p as [number, number, number]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial color="#d0d0d8" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/* ─── Brand & Visual — stacked offset plates ─── */

function StackedPlates({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.1;
  });
  return (
    <Float speed={0.4} floatIntensity={0.3} rotationIntensity={0.12}>
      <group position={position} rotation={[0.35, -0.2, 0.08]} ref={ref}>
        {Array.from({ length: 5 }, (_, i) => (
          <mesh key={i} position={[i * 0.02, -i * 0.065, -i * 0.01]} rotation={[0, i * 0.04, 0]}>
            <boxGeometry args={[0.7, 0.03, 0.52]} />
            <meshStandardMaterial
              color={i === 0 ? '#555560' : i < 2 ? '#404048' : '#2e2e34'}
              metalness={i === 0 ? 0.8 : 0.6}
              roughness={i === 0 ? 0.2 : 0.4}
            />
          </mesh>
        ))}
        {/* Top embossed detail */}
        <mesh position={[-0.15, 0.02, 0]}>
          <boxGeometry args={[0.25, 0.008, 0.15]} />
          <meshStandardMaterial {...BRUSHED_METAL} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Particle dust ─── */

function ParticleDust({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.006;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.012} transparent opacity={0.2} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ─── Scene Content ─── */

const NODE_POSITIONS: [number, number, number][] = [
  [0, 1.8, 0],        // AI & Wearables — top center
  [-2.3, 0.3, 0.4],   // Product Design — left
  [2.3, 0.5, -0.2],   // Creative Technology — right
  [-1.5, -1.6, 0.4],  // Design for Good — bottom left
  [1.8, -1.3, 0.3],   // Installations — bottom right
  [0, -0.6, -0.3],    // Brand & Visual — center
];

function SceneContent({ reduced, isMobile }: { reduced: boolean; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = isMobile ? 9.5 : 7.5;
    camera.position.y = 0.3;
  }, [isMobile, camera]);

  useEffect(() => {
    if (isMobile) return;
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener('mousemove', h, { passive: true });
    return () => document.removeEventListener('mousemove', h);
  }, [isMobile]);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = target.current;
    const m = mouse.current;
    t.x += (m.x - t.x) * 0.02;
    t.y += (m.y - t.y) * 0.02;
    groupRef.current.rotation.y = t.x * 0.15;
    groupRef.current.rotation.x = -t.y * 0.08;
  });

  return (
    <>
      {/* Studio lighting — key, fill, rim, bounce */}
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.8} position={[4, 6, 5]} color="#f0f0ff" castShadow={false} />
      <directionalLight intensity={0.3} position={[-5, 2, -3]} color="#8899cc" />
      <pointLight intensity={0.6} color="#ffffff" distance={18} position={[0, 1, 6]} />
      <pointLight intensity={0.25} color="#6677aa" distance={14} position={[-4, -3, 3]} />
      <pointLight intensity={0.15} color="#aabbee" distance={12} position={[5, -2, -1]} />

      {/* Environment for realistic reflections */}
      <Environment preset="city" environmentIntensity={0.15} />

      <group ref={groupRef}>
        {/* Constellation connections */}
        <ConstellationLines positions={NODE_POSITIONS} />

        {/* 6 discipline objects */}
        <LensAssembly position={NODE_POSITIONS[0]} />
        <GlassTablet position={NODE_POSITIONS[1]} />
        <GlassCrystal position={NODE_POSITIONS[2]} />
        <SoftSculpture position={NODE_POSITIONS[3]} />
        <TrussStructure position={NODE_POSITIONS[4]} />
        <StackedPlates position={NODE_POSITIONS[5]} />

        {/* Labels */}
        <Label position={NODE_POSITIONS[0]} text="AI & Wearables" />
        <Label position={NODE_POSITIONS[1]} text="Product Design" offset={[0, -0.7, 0]} />
        <Label position={NODE_POSITIONS[2]} text="Creative Technology" />
        <Label position={NODE_POSITIONS[3]} text="Design for Good" offset={[0, -0.7, 0]} />
        <Label position={NODE_POSITIONS[4]} text="Installations" />
        <Label position={NODE_POSITIONS[5]} text="Brand & Visual" offset={[0, -0.45, 0]} />
      </group>

      {/* Particles */}
      <ParticleDust count={isMobile ? 50 : 140} reduced={reduced} />
    </>
  );
}

/* ─── Main Component ─── */

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReduced();
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="hero-3d-canvas">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ fov: 40, near: 0.1, far: 100, position: [0, 0.3, 7.5] }}
        style={{ background: 'transparent' }}
      >
        <SceneContent reduced={reduced} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
