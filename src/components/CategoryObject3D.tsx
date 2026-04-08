import { useState, useRef, useCallback, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  TrussStructure,
  PetalRose,
  MorphingScreens,
  StackedPlates,
  LensAssembly,
  GlassCrystal,
} from './HeroScene';

const CATEGORY_OBJECTS: Record<string, React.FC<{ dark: boolean; hovered: boolean }>> = {
  installations: TrussStructure,
  'design-for-good': PetalRose,
  'ux-design': MorphingScreens,
  fintech: MorphingScreens,
  crypto: MorphingScreens,
  'brand-visual': StackedPlates,
  ai: LensAssembly,
  'ai-wearables': LensAssembly,
  'creative-tech': GlassCrystal,
};

interface Props {
  slug: string;
  dark?: boolean;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

function CursorTracker({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onLeave = () => { mouse.current.x = 0; mouse.current.y = 0; };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    return () => {
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [gl, mouse]);
  return null;
}

function SceneInner({ slug, dark, mouse }: { slug: string; dark: boolean; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);
  const spinVel = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const smoothMouse = useRef({ x: 0, y: 0 });

  const Component = CATEGORY_OBJECTS[slug];
  if (!Component) return null;

  // Slow continuous orbit + cursor-reactive tilt + drag momentum
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smooth cursor follow (lerp toward mouse position)
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05;

    // Continuous gentle rotation
    const baseY = delta * 0.15;
    groupRef.current.rotation.y += baseY;

    // Cursor-reactive tilt (subtle, max ±0.25 radians)
    const targetTiltX = smoothMouse.current.y * 0.25;
    const targetTiltZ = -smoothMouse.current.x * 0.12;
    groupRef.current.rotation.x += (targetTiltX + Math.sin(groupRef.current.rotation.y * 0.3) * 0.1 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.z += (targetTiltZ - groupRef.current.rotation.z) * 0.04;

    // Apply drag momentum
    const sv = spinVel.current;
    if (Math.abs(sv.x) > 0.001 || Math.abs(sv.y) > 0.001) {
      groupRef.current.rotation.x += sv.x * delta;
      groupRef.current.rotation.y += sv.y * delta;
      sv.x *= 0.95;
      sv.y *= 0.95;
    }
  });

  const handlePointerDown = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    isDragging.current = true;

    const onMove = (ev: PointerEvent) => {
      if (!isDragging.current) return;
      spinVel.current.y += ev.movementX * 0.3;
      spinVel.current.x += ev.movementY * 0.3;
    };

    const onUp = () => {
      isDragging.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, []);

  return (
    <Float speed={0.8} floatIntensity={0.4} rotationIntensity={0.1}>
      <group
        ref={groupRef}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'grab'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = ''; }}
        onPointerDown={handlePointerDown}
      >
        {/* Invisible hit area for easier drag */}
        <mesh visible={false}>
          <sphereGeometry args={[1.2, 8, 8]} />
          <meshBasicMaterial />
        </mesh>
        <Component dark={dark} hovered={hovered} />
      </group>
    </Float>
  );
}

export default function CategoryObject3D({ slug, dark = false, size = 200, className, style }: Props) {
  const mouseRef = useRef({ x: 0, y: 0 });

  if (!CATEGORY_OBJECTS[slug]) return null;

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        pointerEvents: 'auto',
        ...style,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={dark ? 0.1 : 0.2} />
        <directionalLight position={[5, 8, 6]} intensity={dark ? 1.2 : 1} color={dark ? '#e8e8ff' : '#ffffff'} />
        <directionalLight position={[-6, 3, -4]} intensity={dark ? 0.4 : 0.35} color={dark ? '#8899cc' : '#bbc8dd'} />
        <pointLight intensity={dark ? 0.6 : 0.4} color="#ffffff" distance={15} position={[0, 4, 3]} />
        <CursorTracker mouse={mouseRef} />
        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={dark ? 0.6 : 0.8} />
          <SceneInner slug={slug} dark={dark} mouse={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export { CATEGORY_OBJECTS };
