import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Theme detection ─── */

function useThemeColors() {
  const get = () => {
    const isDark =
      typeof document !== 'undefined' &&
      document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      primary: isDark ? '#ffe430' : '#ffe430',
      wire: isDark ? '#888899' : '#444455',
      glass: isDark ? '#6677bb' : '#8899dd',
      particle: isDark ? '#ffe430' : '#ffe430',
      accent: isDark ? '#ff6644' : '#ff5533',
      bg: isDark ? '#111110' : '#000000',
    };
  };
  const [colors, setColors] = useState(get);
  useEffect(() => {
    const obs = new MutationObserver((muts) => {
      for (const m of muts) if (m.attributeName === 'data-theme') setColors(get());
    });
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);
  return colors;
}

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

/* ─── Floating Geometric ─── */

function GeoObject({
  geometry,
  material,
  position,
  scale = 1,
  floatSpeed = 1,
  floatIntensity = 1,
  rotationIntensity = 0.4,
}: {
  geometry: React.ReactNode;
  material: React.ReactNode;
  position: [number, number, number];
  scale?: number;
  floatSpeed?: number;
  floatIntensity?: number;
  rotationIntensity?: number;
}) {
  return (
    <Float
      speed={floatSpeed}
      floatIntensity={floatIntensity}
      rotationIntensity={rotationIntensity}
    >
      <mesh position={position} scale={scale}>
        {geometry}
        {material}
      </mesh>
    </Float>
  );
}

/* ─── Particle Field ─── */

function ParticleField({ count, color, reduced }: { count: number; color: string; reduced: boolean }) {
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
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.015;
    ref.current.rotation.x = Math.sin(t * 0.01) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.025}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Grid Lines (subtle) ─── */

function GridLines({ color }: { color: string }) {
  const ref = useRef<THREE.LineSegments>(null!);

  const geo = useMemo(() => {
    const points: number[] = [];
    const spacing = 1.5;
    const count = 8;
    const half = (count * spacing) / 2;

    for (let i = 0; i <= count; i++) {
      const pos = i * spacing - half;
      // Horizontal
      points.push(-half, pos, -3, half, pos, -3);
      // Vertical
      points.push(pos, -half, -3, pos, half, -3);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.05) * 0.02;
  });

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={0.06} />
    </lineSegments>
  );
}

/* ─── Scene Content ─── */

function SceneContent({ colors, reduced, isMobile }: {
  colors: ReturnType<typeof useThemeColors>;
  reduced: boolean;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = isMobile ? 8 : 6;
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
    t.x += (m.x - t.x) * 0.03;
    t.y += (m.y - t.y) * 0.03;
    groupRef.current.rotation.y = t.x * 0.25;
    groupRef.current.rotation.x = -t.y * 0.12;
  });

  const pCount = isMobile ? 60 : 150;

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight intensity={0.7} position={[5, 5, 5]} />
      <directionalLight intensity={0.2} color="#6688ff" position={[-5, 3, -3]} />
      <pointLight intensity={0.6} color={colors.primary} distance={12} position={[3, -2, 4]} />
      <pointLight intensity={0.3} color={colors.accent} distance={10} position={[-3, 2, 3]} />

      <group ref={groupRef}>
        {/* Large wireframe torus — center hero piece */}
        <GeoObject
          position={[0, 0.3, 0]}
          scale={1.2}
          floatSpeed={0.8}
          floatIntensity={0.5}
          rotationIntensity={0.3}
          geometry={<torusGeometry args={[1.4, 0.08, 16, 80]} />}
          material={
            <meshStandardMaterial
              color={colors.primary}
              emissive={colors.primary}
              emissiveIntensity={0.3}
              metalness={0.6}
              roughness={0.3}
              transparent
              opacity={0.85}
            />
          }
        />

        {/* Wireframe icosahedron — left */}
        <GeoObject
          position={[-2.5, -0.8, 0.5]}
          scale={0.7}
          floatSpeed={1.2}
          floatIntensity={0.8}
          rotationIntensity={0.5}
          geometry={<icosahedronGeometry args={[0.8, 0]} />}
          material={
            <meshStandardMaterial
              color={colors.wire}
              wireframe
              transparent
              opacity={0.5}
            />
          }
        />

        {/* Glass sphere — right accent */}
        <GeoObject
          position={[2.8, 0.8, -0.5]}
          scale={0.6}
          floatSpeed={0.6}
          floatIntensity={1.0}
          rotationIntensity={0.2}
          geometry={<sphereGeometry args={[0.6, 32, 32]} />}
          material={
            <meshPhysicalMaterial
              color={colors.glass}
              metalness={0.1}
              roughness={0.05}
              transmission={0.85}
              transparent
              opacity={0.4}
              ior={1.5}
              thickness={0.5}
            />
          }
        />

        {/* Octahedron — upper right */}
        <GeoObject
          position={[1.8, 2.0, -1.5]}
          scale={0.5}
          floatSpeed={1.5}
          floatIntensity={1.2}
          rotationIntensity={0.6}
          geometry={<octahedronGeometry args={[0.5, 0]} />}
          material={
            <meshStandardMaterial
              color={colors.primary}
              emissive={colors.primary}
              emissiveIntensity={0.15}
              wireframe
              transparent
              opacity={0.6}
            />
          }
        />

        {/* Torus knot — lower left */}
        <GeoObject
          position={[-1.8, -1.8, 1]}
          scale={0.5}
          floatSpeed={0.7}
          floatIntensity={0.6}
          rotationIntensity={0.4}
          geometry={<torusKnotGeometry args={[0.5, 0.15, 64, 8, 2, 3]} />}
          material={
            <meshStandardMaterial
              color={colors.wire}
              metalness={0.3}
              roughness={0.4}
              transparent
              opacity={0.5}
            />
          }
        />

        {/* Small accent sphere — top left */}
        <GeoObject
          position={[-1.2, 1.8, 1.5]}
          scale={0.3}
          floatSpeed={2.0}
          floatIntensity={1.5}
          rotationIntensity={0.1}
          geometry={<sphereGeometry args={[0.3, 16, 16]} />}
          material={
            <meshStandardMaterial
              color={colors.accent}
              emissive={colors.accent}
              emissiveIntensity={0.4}
              metalness={0.5}
              roughness={0.2}
            />
          }
        />

        {/* Ring — large subtle accent */}
        <GeoObject
          position={[0.5, -1.0, -2]}
          scale={1.0}
          floatSpeed={0.4}
          floatIntensity={0.3}
          rotationIntensity={0.2}
          geometry={<torusGeometry args={[1.8, 0.03, 8, 64]} />}
          material={
            <meshBasicMaterial
              color={colors.wire}
              transparent
              opacity={0.12}
            />
          }
        />
      </group>

      {/* Background grid */}
      <GridLines color={colors.primary} />

      {/* Particles */}
      <ParticleField count={pCount} color={colors.particle} reduced={reduced} />
    </>
  );
}

/* ─── Main Component ─── */

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = useThemeColors();
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

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const ratio = window.scrollY / el.offsetHeight;
    if (ratio < 1) el.style.opacity = String(Math.max(0.1, 1 - ratio * 0.7));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div ref={containerRef} className="hero-3d-canvas">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 6] }}
        style={{ background: 'transparent' }}
      >
        <SceneContent colors={colors} reduced={reduced} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
