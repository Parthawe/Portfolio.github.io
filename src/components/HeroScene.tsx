import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Theme detection ─── */

function useThemeMode() {
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.dataset.theme === 'dark'
      : false,
  );
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setDark(document.documentElement.dataset.theme === 'dark');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

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

/* ─── Node config ─── */

interface NodeConfig {
  position: [number, number, number];
  label: string;
  labelOffset: [number, number, number];
  route: string;
}

const NODES: NodeConfig[] = [
  { position: [0, 1.9, 0], label: 'Installations', labelOffset: [0, 0.95, 0], route: '/installations' },
  { position: [2.4, 0.6, -0.2], label: 'Design for Good', labelOffset: [0.1, 0.85, 0], route: '/design-for-good' },
  { position: [0, 0.15, 0.3], label: 'Product Design', labelOffset: [0, -0.85, 0], route: '/ux-design' },
  { position: [-2.4, 0.1, 0.3], label: 'Brand & Visual', labelOffset: [0, -0.5, 0], route: '/brand-visual' },
  { position: [-1.3, -1.6, 0.3], label: 'AI & Wearables', labelOffset: [0, -0.85, 0], route: '/ai' },
  { position: [1.8, -1.4, 0.2], label: 'Creative Technology', labelOffset: [0, -0.85, 0], route: '/creative-tech' },
];

/* ─── Constellation threads, invisible curves that glow as energy passes ─── */

const THREADS_PER_LINK = 18;
const TUBE_SEGMENTS = 64;
const RADIAL_SEGMENTS = 3;
const PRODUCT_DESIGN_IDX = 2;
const GLOW_WIDTH = 0.09;

function seededRand(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Custom shader: thread is invisible except where the glow window passes
const threadVertexShader = /* glsl */ `
  attribute float curveProgress;
  varying float vProgress;
  void main() {
    vProgress = curveProgress;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const threadFragmentShader = /* glsl */ `
  uniform float uGlowCenter;
  uniform float uGlowWidth;
  uniform vec3 uColor;
  uniform float uBaseAlpha;
  varying float vProgress;
  void main() {
    float d = abs(vProgress - uGlowCenter);
    d = min(d, 1.0 - d);
    // Premium glass thread: always faintly visible, bright traveling glow
    float glow = smoothstep(uGlowWidth, 0.0, d);
    float core = pow(glow, 3.0);          // tight bright center
    float halo = pow(glow, 0.6) * 0.3;    // wide soft aura
    float combined = core + halo;
    // Nearly white everywhere, pure white at glow center
    vec3 white = vec3(1.0);
    vec3 tint = mix(uColor * 0.5 + 0.5, white, combined * 0.85);
    // Base visibility higher so threads are always faintly seen
    float alpha = combined * 0.7 + uBaseAlpha;
    gl_FragColor = vec4(tint, alpha);
  }
`;

interface ThreadInfo {
  tubeGeo: THREE.TubeGeometry;
  material: THREE.ShaderMaterial;
  speed: number;
  phase: number;
}

function ConstellationLines({ positions, dark }: { positions: [number, number, number][]; dark: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  const threadData = useMemo(() => {
    const result: ThreadInfo[] = [];
    const color = dark ? new THREE.Color('#f0f4ff') : new THREE.Color('#d8e0f0');

    // Build connection pairs, nearest 2 neighbors per node (no full mesh)
    const vecs = positions.map(p => new THREE.Vector3(...p));
    const pairSet = new Set<string>();
    const pairs: [number, number][] = [];

    for (let i = 0; i < positions.length; i++) {
      // Find 2 nearest neighbors for each node (3 for non-PD nodes)
      const maxNeighbors = i === PRODUCT_DESIGN_IDX ? 2 : 3;
      const dists = positions.map((_, j) => ({
        idx: j,
        dist: i === j ? Infinity : vecs[i].distanceTo(vecs[j]),
      })).sort((a, b) => a.dist - b.dist);

      for (let k = 0; k < maxNeighbors && k < dists.length; k++) {
        const j = dists[k].idx;
        const key = Math.min(i, j) + '-' + Math.max(i, j);
        if (!pairSet.has(key)) {
          pairSet.add(key);
          pairs.push([Math.min(i, j), Math.max(i, j)]);
        }
      }
    }

    for (const [i, j] of pairs) {
      const a = new THREE.Vector3(...positions[i]);
      const b = new THREE.Vector3(...positions[j]);
      const pairIdx = i * 10 + j;

      const ab = new THREE.Vector3().subVectors(b, a).normalize();
      const up = Math.abs(ab.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
      const perp1 = new THREE.Vector3().crossVectors(ab, up).normalize();
      const perp2 = new THREE.Vector3().crossVectors(ab, perp1).normalize();

      for (let t = 0; t < THREADS_PER_LINK; t++) {
        const r1 = seededRand(pairIdx * 31 + t * 17);
        const r2 = seededRand(pairIdx * 47 + t * 23);
        const r3 = seededRand(pairIdx * 59 + t * 37);

        const angle = (t / THREADS_PER_LINK) * Math.PI * 2 + r1 * 1.2;
        const bowAmount = 0.15 + r2 * 0.25;

        const mid = new THREE.Vector3().lerpVectors(a, b, 0.35 + r3 * 0.3);
        mid.add(perp1.clone().multiplyScalar(Math.cos(angle) * bowAmount));
        mid.add(perp2.clone().multiplyScalar(Math.sin(angle) * bowAmount));

        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        const tubeGeo = new THREE.TubeGeometry(curve, TUBE_SEGMENTS, 0.0012, RADIAL_SEGMENTS, false);

        // Add curveProgress attribute, 0 at start, 1 at end
        const count = tubeGeo.attributes.position.count;
        const progressArr = new Float32Array(count);
        const vertsPerRing = RADIAL_SEGMENTS + 1;
        for (let v = 0; v < count; v++) {
          const ring = Math.floor(v / vertsPerRing);
          progressArr[v] = ring / TUBE_SEGMENTS;
        }
        tubeGeo.setAttribute('curveProgress', new THREE.BufferAttribute(progressArr, 1));

        const material = new THREE.ShaderMaterial({
          vertexShader: threadVertexShader,
          fragmentShader: threadFragmentShader,
          uniforms: {
            uGlowCenter: { value: 0 },
            uGlowWidth: { value: GLOW_WIDTH },
            uColor: { value: color },
            uBaseAlpha: { value: 0.04 },
          },
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
        });

        result.push({
          tubeGeo,
          material,
          speed: 0.03 + r1 * 0.12 + r3 * 0.06, // wider speed range for organic feel
          phase: r2 * 6.28 + t * 1.2 + pairIdx * 0.7, // more phase spread
        });
      }
    }
    return result;
  }, [positions, dark]);

  // Animate: move the glow window along each thread
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();

    for (let idx = 0; idx < threadData.length; idx++) {
      const thread = threadData[idx];
      // Glow center travels 0→1→0 (ping pong)
      const raw = (time * thread.speed + thread.phase) % 2;
      const center = raw < 1 ? raw : 2 - raw;
      thread.material.uniforms.uGlowCenter.value = center;
    }
  });

  // Disable raycasting so threads never block clicks on objects
  const noRaycast = useCallback(() => null, []);

  return (
    <group ref={groupRef}>
      {threadData.map((td, i) => (
        <mesh key={i} geometry={td.tubeGeo} material={td.material} raycast={noRaycast} />
      ))}
    </group>
  );
}

/* ─── Global navigate ref, set by parent via onNavigate prop ─── */
let _navigate: ((path: string) => void) | null = null;
export function setHeroNavigate(fn: (path: string) => void) { _navigate = fn; }

/* ─── Clickable wrapper, passes hovered state to children via render prop ─── */
/* Also handles drag-to-spin: dragging on an object spins it in that direction */

function ClickableObject({
  route,
  children,
  position,
}: {
  route: string;
  children: (hovered: boolean) => React.ReactNode;
  position: [number, number, number];
}) {
  const [hovered, setHovered] = useState(false);
  const spinGroupRef = useRef<THREE.Group>(null!);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const spinVel = useRef({ x: 0, y: 0 });

  // Apply spin velocity with momentum decay each frame
  useFrame((_, delta) => {
    if (!spinGroupRef.current) return;
    const sv = spinVel.current;
    if (Math.abs(sv.x) > 0.001 || Math.abs(sv.y) > 0.001) {
      spinGroupRef.current.rotation.x += sv.x * delta;
      spinGroupRef.current.rotation.y += sv.y * delta;
      // Momentum decay, slows down naturally
      sv.x *= 0.96;
      sv.y *= 0.96;
    }
  });

  const handlePointerDown = useCallback((e: { stopPropagation: () => void; nativeEvent: PointerEvent }) => {
    e.stopPropagation();
    isDragging.current = true;
    dragMoved.current = false;

    const onMove = (ev: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = ev.movementX;
      const dy = ev.movementY;
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) dragMoved.current = true;
      // Horizontal drag → Y spin, vertical drag → X spin
      spinVel.current.y += dx * 0.4;
      spinVel.current.x += dy * 0.4;
    };

    const onUp = () => {
      isDragging.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, []);

  const handleClick = useCallback(() => {
    // Only navigate if it wasn't a drag
    if (!dragMoved.current && _navigate) {
      _navigate(route);
    }
  }, [route]);

  return (
    <group
      position={position}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = ''; }}
    >
      <group ref={spinGroupRef}>
        {/* Invisible hit area, ensures all objects are draggable */}
        <mesh visible={false}>
          <sphereGeometry args={[0.55, 8, 8]} />
          <meshBasicMaterial />
        </mesh>
        {children(hovered)}
      </group>
    </group>
  );
}

/* ─── Smooth hover lerp hook, intentionally slow for elegance ─── */
function useHoverLerp(hovered: boolean, speed = 3) {
  const t = useRef(0);
  useFrame((_, delta) => {
    const target = hovered ? 1 : 0;
    t.current += (target - t.current) * Math.min(delta * speed, 1);
  });
  return t;
}

/* ─── Lerp helper ─── */
function mix(a: number, b: number, t: number) { return a + (b - a) * t; }

/* ─── Interactive Label, morphs into 3D mini-object on hover ─── */

/* Mini 3D objects for each category, visually distinct from parent */
function MiniInstallation({ dark }: { dark: boolean }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.6;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.3;
  });
  const verts: [number, number, number][] = [[0, 0.08, 0], [0.07, -0.04, 0.04], [-0.07, -0.04, 0.04], [0, -0.04, -0.06]];
  const lineGeos = useMemo(() =>
    [[0,1],[1,2],[2,0],[0,3],[1,3],[2,3]].map(([a, b]) =>
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...verts[a]), new THREE.Vector3(...verts[b])])
    ), []);
  return (
    <group ref={ref}>
      {verts.map((p, i) => (
        <mesh key={i} position={p}>
          <octahedronGeometry args={[0.018, 0]} />
          <meshPhysicalMaterial color={dark ? '#e0e0f0' : '#c0c0d0'} metalness={1} roughness={0.03} clearcoat={1} envMapIntensity={3} />
        </mesh>
      ))}
      {lineGeos.map((geo, i) => (
        // @ts-expect-error, R3F `line` conflicts with SVG line type
        <line key={i} geometry={geo}><lineBasicMaterial color={dark ? '#8899bb' : '#667799'} transparent opacity={0.5} /></line>
      ))}
    </group>
  );
}

function MiniDesignForGood({ dark }: { dark: boolean }) {
  // Knot → unfurled into a smooth spinning ring with orbiting dot
  const ref = useRef<THREE.Group>(null!);
  const dotRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.5;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.4;
    if (dotRef.current) {
      dotRef.current.position.x = Math.cos(t * 1.5) * 0.09;
      dotRef.current.position.y = Math.sin(t * 1.5) * 0.09;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[0.07, 0.012, 16, 32]} />
        <meshPhysicalMaterial color={dark ? '#d0d0e8' : '#b0b0c8'} metalness={1} roughness={0.02} clearcoat={1} envMapIntensity={3} />
      </mesh>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshPhysicalMaterial color="#ffffff" emissive={dark ? '#8899cc' : '#6677aa'} emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function MiniProductDesign({ dark }: { dark: boolean }) {
  // Screens → collapse into a single glowing cursor/pointer arrow
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    ref.current.position.y = Math.sin(t * 0.8) * 0.015;
  });
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.09);
    s.lineTo(0.05, -0.04);
    s.lineTo(0.015, -0.02);
    s.lineTo(0.04, -0.08);
    s.lineTo(0.02, -0.09);
    s.lineTo(-0.005, -0.04);
    s.lineTo(-0.04, -0.06);
    s.closePath();
    return s;
  }, []);
  return (
    <group ref={ref}>
      <mesh>
        <extrudeGeometry args={[shape, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.005, bevelSize: 0.005, bevelSegments: 3 }]} />
        <meshPhysicalMaterial color={dark ? '#e0e0f0' : '#d0d0e0'} metalness={1} roughness={0.03} clearcoat={1} envMapIntensity={3} />
      </mesh>
    </group>
  );
}

function MiniBrandVisual({ dark }: { dark: boolean }) {
  // Bauhaus → three overlapping chrome discs (color wheel abstraction)
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.4;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
  });
  const colors = dark ? ['#c8c8e0', '#a0a0c0', '#888898'] : ['#b0b0c8', '#909098', '#707078'];
  return (
    <group ref={ref}>
      {[0, 2.1, 4.2].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.035, Math.sin(angle) * 0.035, i * 0.008]}>
          <cylinderGeometry args={[0.04, 0.04, 0.006, 24]} />
          <meshPhysicalMaterial color={colors[i]} metalness={1} roughness={0.05} clearcoat={1} envMapIntensity={2.5} />
        </mesh>
      ))}
    </group>
  );
}

function MiniAIWearables({ dark }: { dark: boolean }) {
  // Lens → opens into an iris/eye with dilating pupil
  const ref = useRef<THREE.Group>(null!);
  const pupilRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.3;
    ref.current.rotation.x = Math.cos(t * 0.3) * 0.2;
    if (pupilRef.current) {
      const s = 0.8 + Math.sin(t * 0.7) * 0.3;
      pupilRef.current.scale.set(s, s, 1);
    }
  });
  return (
    <group ref={ref}>
      {/* Iris ring */}
      <mesh>
        <torusGeometry args={[0.06, 0.015, 12, 32]} />
        <meshPhysicalMaterial color={dark ? '#c0c0d0' : '#a0a0b0'} metalness={1} roughness={0.04} clearcoat={1} envMapIntensity={3} />
      </mesh>
      {/* Pupil, glass sphere */}
      <mesh ref={pupilRef}>
        <sphereGeometry args={[0.035, 24, 24]} />
        <meshPhysicalMaterial
          color={dark ? '#4060a0' : '#6080c0'}
          metalness={0} roughness={0} transmission={0.9} transparent opacity={0.3} ior={2} thickness={0.5}
          specularIntensity={1} specularColor="#ffffff"
        />
      </mesh>
      {/* Center highlight */}
      <mesh>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={dark ? 1.5 : 0.8} />
      </mesh>
    </group>
  );
}

function MiniCreativeTech({ dark }: { dark: boolean }) {
  // Geodesic → fractured into spinning triangle shards
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.5;
    ref.current.rotation.x = t * 0.3;
    // Each child shard orbits slightly
    ref.current.children.forEach((child, i) => {
      child.position.x = Math.cos(t * 0.4 + i * 1.2) * (0.04 + i * 0.01);
      child.position.y = Math.sin(t * 0.5 + i * 1.0) * (0.04 + i * 0.008);
      child.position.z = Math.cos(t * 0.3 + i * 0.8) * 0.03;
    });
  });
  return (
    <group ref={ref}>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} rotation={[i * 0.8, i * 1.2, i * 0.5]}>
          <tetrahedronGeometry args={[0.025, 0]} />
          <meshPhysicalMaterial
            color={dark ? '#d0d0f0' : '#b8b8d0'}
            metalness={1} roughness={0.02} clearcoat={1} envMapIntensity={3}
          />
        </mesh>
      ))}
    </group>
  );
}

const MINI_COMPONENTS = [MiniInstallation, MiniDesignForGood, MiniProductDesign, MiniBrandVisual, MiniAIWearables, MiniCreativeTech];

function InteractiveLabel({ position, text, offset, dark, index, route, parentRef }: {
  position: [number, number, number];
  text: string;
  offset: [number, number, number];
  dark: boolean;
  index: number;
  route: string;
  parentRef: React.RefObject<THREE.Group>;
}) {
  const [hovered, setHovered] = useState(false);
  const textRef = useRef<THREE.Mesh>(null!);
  const objectRef = useRef<THREE.Group>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const lerp = useRef(0); // 0 = text, 1 = 3D object

  const handleClick = useCallback(() => {
    if (_navigate) _navigate(route);
  }, [route]);

  useFrame((_, delta) => {
    const target = hovered ? 1 : 0;
    lerp.current += (target - lerp.current) * Math.min(delta * 6, 1);

    // Text: fade out and scale down, force depthTest off so text is never occluded
    if (textRef.current) {
      const textScale = 1 - lerp.current * 0.5;
      textRef.current.scale.set(textScale, textScale, textScale);
      (textRef.current as any).fillOpacity = (dark ? 0.55 : 0.65) * (1 - lerp.current);
      const mat = (textRef.current as any).material;
      if (mat && mat.depthTest !== false) {
        mat.depthTest = false;
        mat.depthWrite = false;
        mat.needsUpdate = true;
      }
    }
    // Object: scale up
    if (objectRef.current) {
      const objScale = lerp.current;
      objectRef.current.scale.set(objScale, objScale, objScale);
    }
    // Counter-rotate Z so labels always stay upright/readable
    if (groupRef.current && parentRef?.current) {
      groupRef.current.rotation.z = -parentRef.current.rotation.z;
    }
  });

  const MiniComponent = MINI_COMPONENTS[index];
  const lx = position[0] + offset[0];
  const ly = position[1] + offset[1];
  const lz = position[2] + offset[2];
  return (
    <group ref={groupRef} position={[lx, ly, lz]}>
      <group
        onClick={handleClick}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = ''; }}
      >
      <Text
        ref={textRef}
        fontSize={0.13}
        color={dark ? '#e8e4df' : '#1a1a1a'}
        anchorX="center"
        anchorY={offset[1] > 0 ? 'bottom' : 'top'}
        letterSpacing={0.12}
        fillOpacity={dark ? 0.45 : 0.5}
        renderOrder={999}
        textAlign="center"
      >
        {text.toUpperCase()}
      </Text>
      {/* Mini 3D object, scales in on hover */}
      <group ref={objectRef} scale={0}>
        <MiniComponent dark={dark} />
      </group>
      </group>
    </group>
  );
}

/* ─── Virtual time that freezes on hover, rotation stops in place, no jump ─── */
function useVirtualTime(ht: React.RefObject<number>) {
  const vt = useRef(0);
  useFrame((_, delta) => {
    vt.current += delta * (1 - ht.current);
  });
  return vt;
}

/* ═══════════════════════════════════════════════════
   INSTALLATIONS, metallic rod truss (KEEP, user likes this)
   ═══════════════════════════════════════════════════ */

function TrussStructure({ dark, hovered }: { dark: boolean; hovered: boolean }) {
  const ref = useRef<THREE.Group>(null!);
  const ht = useHoverLerp(hovered);
  const vt = useVirtualTime(ht);
  const jointRefs = useRef<THREE.Mesh[]>([]);
  const rodRefs = useRef<THREE.Mesh[]>([]);

  const corners = useMemo(() => {
    const s = 0.5;
    return [
      [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
      [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
    ] as [number, number, number][];
  }, []);

  // Pre-compute normalized directions for each corner (avoid allocation in useFrame)
  const cornerDirs = useMemo(() =>
    corners.map(c => new THREE.Vector3(...c).normalize()),
  [corners]);

  const rods = useMemo(() => {
    const result: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const c = corners.map(p => new THREE.Vector3(...p));
    const edges: [number, number][] = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    const diags: [number, number][] = [[0,2],[1,3],[4,6],[5,7],[0,5],[1,4],[2,7],[3,6],[0,7],[1,6],[2,5],[3,4]];
    for (const [a, b] of [...edges, ...diags]) {
      result.push({ start: c[a], end: c[b] });
    }
    return result;
  }, [corners]);

  useFrame(() => {
    if (!ref.current) return;
    const v = vt.current;
    const h = ht.current;
    ref.current.rotation.y = v * 0.06;
    ref.current.rotation.x = Math.sin(v * 0.04) * 0.06;
    ref.current.rotation.z = Math.cos(v * 0.03) * 0.04;
    // Joints expand outward on hover
    jointRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const base = corners[i];
      const dir = cornerDirs[i];
      const expand = h * 0.35;
      mesh.position.set(base[0] + dir.x * expand, base[1] + dir.y * expand, base[2] + dir.z * expand);
      const s = mix(0.035, 0.06, h);
      mesh.scale.setScalar(s / 0.035);
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = mix(0, 0.6, h);
    });
    // Rods fade on hover (they'd break with expanded joints, becoming wireframe ghost)
    rodRefs.current.forEach((mesh) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.opacity = mix(1, 0.15, h);
      mat.transparent = h > 0.01;
    });
  });

  return (
    <Float speed={0.7} floatIntensity={0.5} rotationIntensity={0.15}>
      <group rotation={[0.4, 0.3, 0.15]} ref={ref}>
        {rods.map((rod, i) => {
          const mid = new THREE.Vector3().addVectors(rod.start, rod.end).multiplyScalar(0.5);
          const len = rod.start.distanceTo(rod.end);
          const dir = new THREE.Vector3().subVectors(rod.end, rod.start).normalize();
          const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          const isEdge = i < 12;
          return (
            <mesh key={i} position={mid} quaternion={quat} ref={(el) => { if (el) rodRefs.current[i] = el; }}>
              <cylinderGeometry args={[isEdge ? 0.02 : 0.009, isEdge ? 0.02 : 0.009, len, 6]} />
              <meshPhysicalMaterial
                color={isEdge ? (dark ? '#e0e0e8' : '#c0c0c8') : (dark ? '#a0a0a8' : '#b0b0b8')}
                metalness={0.85}
                roughness={isEdge ? 0.05 : 0.12}
                clearcoat={1}
                clearcoatRoughness={0.03}
                envMapIntensity={dark ? 2.5 : 3}
                reflectivity={1}
                transmission={isEdge ? 0 : 0.3}
                transparent={!isEdge}
                opacity={isEdge ? 1 : 0.7}
              />
            </mesh>
          );
        })}
        {corners.map((p, i) => (
          <mesh key={`j${i}`} position={p} ref={(el) => { if (el) jointRefs.current[i] = el; }}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshPhysicalMaterial
              color={dark ? '#f0f0f8' : '#e0e0e8'}
              metalness={0.6}
              roughness={0.02}
              clearcoat={1}
              clearcoatRoughness={0.01}
              envMapIntensity={dark ? 3 : 3.5}
              reflectivity={1}
              transmission={0.4}
              transparent
              opacity={0.9}
              ior={1.8}
              emissive={dark ? '#8899cc' : '#6677aa'}
              emissiveIntensity={0}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════
   DESIGN FOR GOOD, chrome torus knot with glass shell
   ═══════════════════════════════════════════════════ */

function PetalRose({ dark, hovered }: { dark: boolean; hovered: boolean }) {
  const ref = useRef<THREE.Group>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);
  const knotRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const ht = useHoverLerp(hovered);
  const vt = useVirtualTime(ht);

  useFrame(() => {
    if (!ref.current) return;
    const v = vt.current;
    const h = ht.current;
    ref.current.rotation.y = v * 0.07;
    ref.current.rotation.x = Math.sin(v * 0.03) * 0.05;
    ref.current.rotation.z = Math.cos(v * 0.025) * 0.03;
    if (knotRef.current) {
      knotRef.current.scale.set(mix(1, 1.3, h), mix(1, 0.3, h), mix(1, 1.3, h));
    }
    if (shellRef.current) {
      const s = mix(1, 1.5, h) + Math.sin(v * 0.5) * 0.04;
      shellRef.current.scale.set(s, s, s);
      const mat = shellRef.current.material as THREE.MeshPhysicalMaterial;
      mat.opacity = mix(0.08, 0.25, h);
      mat.ior = mix(1.3, 2.2, h);
    }
    if (coreRef.current) {
      const s = mix(1, 1.8, h);
      coreRef.current.scale.setScalar(s);
      const mat = coreRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = mix(dark ? 0.8 : 0.4, dark ? 1.4 : 1.0, h);
    }
  });

  return (
    <Float speed={0.6} floatIntensity={0.4} rotationIntensity={0.12}>
      <group ref={ref}>
        <mesh ref={knotRef}>
          <torusKnotGeometry args={[0.3, 0.065, 200, 32, 2, 3]} />
          <meshPhysicalMaterial
            color={dark ? '#e0e0f0' : '#c8c8d8'}
            metalness={1} roughness={0.03} clearcoat={1} clearcoatRoughness={0.02}
            envMapIntensity={dark ? 3 : 3.5} reflectivity={1}
          />
        </mesh>
        <mesh ref={shellRef}>
          <sphereGeometry args={[0.48, 64, 64]} />
          <meshPhysicalMaterial
            color={dark ? '#d8e0f0' : '#e0e8f8'}
            metalness={0} roughness={0.02} transmission={0.92} transparent opacity={0.12}
            ior={1.5} thickness={1.2} envMapIntensity={dark ? 2 : 2.5}
            specularIntensity={2} specularColor={dark ? '#ddeeff' : '#bbccee'}
          />
        </mesh>
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshPhysicalMaterial
            color="#ffffff" emissive={dark ? '#8899cc' : '#6677aa'}
            emissiveIntensity={dark ? 0.8 : 0.4} metalness={0.3} roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════
   PRODUCT DESIGN, Morphing chrome sculpture

   Cycles between 3 abstract forms:
   Form 0 (Layers):  Discs stacked horizontally, layered interfaces
   Form 1 (Orrery):  Discs tilted at angles around center, interconnected systems
   Form 2 (Column):  Discs vertical, spread along Y, information architecture

   On hover: layers separate, ring expands, core brightens
   Same visual language as every other object.
   ═══════════════════════════════════════════════════ */

// Multicolor iridescent gradient — deep navy center, rainbow edges
function cubeGradientColor(x: number, z: number, radius: number, _dark: boolean): string {
  const angle = (Math.atan2(z, x) + Math.PI) / (Math.PI * 2)
  const d = Math.min(1, Math.sqrt(x * x + z * z) / radius)
  const coreMix = Math.max(0, 1 - d * 1.8)

  let er: number, eg: number, eb: number
  if (angle < 0.2) {
    const t = angle / 0.2
    er = mix(220, 200, t); eg = mix(40, 60, t); eb = mix(160, 220, t)
  } else if (angle < 0.4) {
    const t = (angle - 0.2) / 0.2
    er = mix(200, 50, t); eg = mix(60, 40, t); eb = mix(220, 230, t)
  } else if (angle < 0.6) {
    const t = (angle - 0.4) / 0.2
    er = mix(50, 30, t); eg = mix(40, 200, t); eb = mix(230, 180, t)
  } else if (angle < 0.8) {
    const t = (angle - 0.6) / 0.2
    er = mix(30, 230, t); eg = mix(200, 140, t); eb = mix(180, 50, t)
  } else {
    const t = (angle - 0.8) / 0.2
    er = mix(230, 220, t); eg = mix(140, 40, t); eb = mix(50, 160, t)
  }

  const r = Math.round(mix(25, er, 1 - coreMix))
  const g = Math.round(mix(25, eg, 1 - coreMix))
  const b = Math.round(mix(180, eb, 1 - coreMix))

  return `rgb(${r},${g},${b})`
}

function MorphingScreens({ dark, hovered }: { dark: boolean; hovered: boolean }) {
  const ref = useRef<THREE.Group>(null!);
  const ht = useHoverLerp(hovered);
  const vt = useVirtualTime(ht);

  const ringRef = useRef<THREE.Mesh>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const crossRef = useRef<THREE.Group>(null!);
  const nodeRefs = useRef<THREE.Mesh[]>([]);
  const pixelRefs = useRef<THREE.Mesh[]>([]);

  // Build cubes that fill 3 disc shapes — each cube has a "solid" position (forming the disc)
  // and a "scattered" position (exploded outward like the flower reference)
  const pixelData = useMemo(() => {
    const cubeSize = 0.04;
    const gap = 0.003;
    const step = cubeSize + gap;
    const data: { solidPos: [number, number, number]; scatterPos: [number, number, number]; color: string; delay: number }[] = [];

    // 3 discs: bottom, middle, top — fill each with cubes in a circular pattern
    const discs = [
      { y: -0.08, radius: 0.28 },
      { y: 0.0,   radius: 0.35 },
      { y: 0.08,  radius: 0.22 },
    ];

    for (const disc of discs) {
      const gridR = Math.ceil(disc.radius / step);
      for (let gx = -gridR; gx <= gridR; gx++) {
        for (let gz = -gridR; gz <= gridR; gz++) {
          const x = gx * step;
          const z = gz * step;
          if (Math.sqrt(x * x + z * z) > disc.radius - cubeSize * 0.5) continue;

          const idx = data.length;
          const angle = Math.atan2(z, x);
          const d = Math.sqrt(x * x + z * z);
          const r1 = seededRand(idx * 17 + 3);
          const r2 = seededRand(idx * 31 + 7);
          const r3 = seededRand(idx * 47 + 11);
          const scatter = 0.4 + r1 * 0.6;

          data.push({
            solidPos: [x, disc.y, z],
            scatterPos: [
              x + Math.cos(angle + r2 * 2) * scatter,
              disc.y + (r3 - 0.5) * 0.8,
              z + Math.sin(angle + r2 * 2) * scatter,
            ],
            color: cubeGradientColor(x, z, disc.radius, dark),
            delay: d / disc.radius,
          });
        }
      }
    }
    return data;
  }, [dark]);

  useFrame(() => {
    if (!ref.current) return;
    const v = vt.current;
    const h = ht.current;
    ref.current.rotation.y = v * 0.06;
    ref.current.rotation.x = Math.sin(v * 0.035) * 0.06;
    ref.current.rotation.z = Math.cos(v * 0.03) * 0.03;

    // Pixel cubes: solid disc → scattered cloud
    pixelRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const pd = pixelData[i];

      // Stagger: center cubes move first, edge cubes follow — ease-out for organic feel
      const raw = Math.min(1, Math.max(0, h * 2.5 - pd.delay * 0.8));
      const eased = 1 - Math.pow(1 - raw, 3); // ease-out cubic

      // Position: lerp solid → scatter
      mesh.position.set(
        mix(pd.solidPos[0], pd.scatterPos[0], eased),
        mix(pd.solidPos[1], pd.scatterPos[1], eased),
        mix(pd.solidPos[2], pd.scatterPos[2], eased),
      );

      // At rest: subtle breathing wave across the disc surface
      if (h < 0.1) {
        const wave = Math.sin(v * 1.5 + pd.solidPos[0] * 8 + pd.solidPos[2] * 8) * 0.008;
        mesh.position.y += wave;
      }

      // Rotation: none at rest, each cube spins uniquely when scattered
      const spinSpeed = seededRand(i * 7) * 0.3 + 0.1;
      mesh.rotation.x = eased * v * spinSpeed;
      mesh.rotation.z = eased * v * spinSpeed * 0.7;

      // Scale: cubes grow slightly when scattering, shrink back when reforming
      const scaleBoost = 1 + eased * 0.3;
      mesh.scale.setScalar(scaleBoost);

      // Iridescent glow when scattered
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = eased * (dark ? 0.6 : 0.35);
    });

    // Ring expands and spins faster on hover
    if (ringRef.current) {
      ringRef.current.rotation.x = 0.8 + v * mix(0.1, 0.25, h);
      ringRef.current.rotation.z = 0.5 + v * mix(0.07, 0.15, h);
      ringRef.current.scale.setScalar(mix(1, 1.5, h));
    }
    // Nodes orbit wider on hover
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const angle = (i / 4) * Math.PI * 2 + 0.4 + v * mix(0.04, 0.1, h);
      const r = mix(0.32, 0.5, h);
      mesh.position.set(Math.cos(angle) * r, Math.sin(v * 0.3 + i) * h * 0.1, Math.sin(angle) * r);
      const s = mix(1, 1.3, h);
      mesh.scale.setScalar(s);
    });
    // Shell breathes
    if (shellRef.current) {
      const breathe = 1 + Math.sin(v * 0.8) * 0.02;
      shellRef.current.scale.setScalar(mix(breathe, 1.4, h));
      const mat = shellRef.current.material as THREE.MeshPhysicalMaterial;
      mat.opacity = mix(0.06, 0.15, h);
    }
    // Core pulses
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshPhysicalMaterial;
      const pulse = 1 + Math.sin(v * 2) * 0.15 * h;
      mat.emissiveIntensity = mix(dark ? 0.8 : 0.4, dark ? 2 : 1.2, h) * pulse;
      coreRef.current.scale.setScalar(mix(1, 1.6, h));
    }
    // Cross spins
    if (crossRef.current) {
      crossRef.current.rotation.y = -v * mix(0.04, 0.12, h);
      crossRef.current.scale.setScalar(mix(1, 1.15, h));
    }
  });

  const iriChrome = { metalness: 1, roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: dark ? 4 : 5, reflectivity: 1, iridescence: 0.8, iridescenceIOR: 1.6 };

  return (
    <Float speed={0.6} floatIntensity={0.4} rotationIntensity={0.12}>
      <group ref={ref}>
        {/* The discs ARE made of cubes — iridescent metallic */}
        {pixelData.map((pd, i) => (
          <mesh
            key={`px${i}`}
            ref={(el) => { if (el) pixelRefs.current[i] = el; }}
            position={pd.solidPos}
          >
            <boxGeometry args={[0.038, 0.015, 0.038]} />
            <meshPhysicalMaterial
              color={pd.color}
              metalness={1}
              roughness={0.05}
              clearcoat={1}
              clearcoatRoughness={0.02}
              envMapIntensity={dark ? 4 : 5}
              reflectivity={1}
              specularIntensity={2}
              specularColor={dark ? '#aa88ff' : '#8866ee'}
              iridescence={1}
              iridescenceIOR={1.8}
              emissive={dark ? '#3344aa' : '#2233aa'}
              emissiveIntensity={0}
            />
          </mesh>
        ))}
        {/* Cross bars — iridescent */}
        <group ref={crossRef}>
          <mesh><cylinderGeometry args={[0.012, 0.012, 0.55, 8]} /><meshPhysicalMaterial color={dark ? '#5060b0' : '#4050a0'} {...iriChrome} /></mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.008, 0.008, 0.4, 8]} /><meshPhysicalMaterial color={dark ? '#4050a0' : '#304090'} {...iriChrome} /></mesh>
        </group>
        {/* Ring — iridescent blue */}
        <mesh ref={ringRef}><torusGeometry args={[0.42, 0.014, 16, 64]} /><meshPhysicalMaterial color={dark ? '#6070c0' : '#5060b0'} {...iriChrome} iridescence={1} /></mesh>
        {/* Glass shell — blue-tinted */}
        <mesh ref={shellRef}>
          <sphereGeometry args={[0.46, 48, 48]} />
          <meshPhysicalMaterial color={dark ? '#4060c0' : '#5070d0'} metalness={0} roughness={0} transmission={0.94} transparent opacity={0.06} ior={1.5} thickness={1.0} envMapIntensity={dark ? 2 : 2.5} specularIntensity={2} specularColor={dark ? '#aabbff' : '#8899ee'} />
        </mesh>
        {/* Core glow — bright blue/purple */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshPhysicalMaterial color="#ffffff" emissive={dark ? '#4466dd' : '#3355cc'} emissiveIntensity={dark ? 0.8 : 0.4} metalness={0.3} roughness={0.1} />
        </mesh>
        {/* Orbiting nodes — iridescent */}
        {[0, 1, 2, 3].map(i => {
          const angle = (i / 4) * Math.PI * 2 + 0.4;
          return (
            <mesh key={`node${i}`} ref={(el) => { if (el) nodeRefs.current[i] = el; }} position={[Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3]}>
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshPhysicalMaterial color={dark ? '#5568cc' : '#4458bb'} {...iriChrome} iridescence={1} emissive={dark ? '#3350aa' : '#2240aa'} emissiveIntensity={0.15} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════
   BRAND & VISUAL, Bauhaus composition: chrome primitives
   ═══════════════════════════════════════════════════ */

function StackedPlates({ dark, hovered }: { dark: boolean; hovered: boolean }) {
  const ref = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const cubeRef = useRef<THREE.Mesh>(null!);
  const discRef = useRef<THREE.Mesh>(null!);
  const slabRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const coneRef = useRef<THREE.Mesh>(null!);
  const ht = useHoverLerp(hovered);
  const vt = useVirtualTime(ht);

  useFrame(() => {
    if (!ref.current) return;
    const v = vt.current;
    const h = ht.current;
    ref.current.rotation.y = v * 0.05;
    ref.current.rotation.x = Math.sin(v * 0.03) * 0.06;
    ref.current.rotation.z = Math.cos(v * 0.035) * 0.04;
    // Ring expands gently
    if (ringRef.current) {
      ringRef.current.rotation.x = v * 0.1;
      ringRef.current.rotation.z = v * 0.12;
      const rs = mix(1, 1.4, h);
      ringRef.current.scale.set(rs, rs, rs);
    }
    // Cube drifts outward
    if (cubeRef.current) {
      cubeRef.current.rotation.x = v * 0.08;
      cubeRef.current.rotation.y = v * 0.1;
      cubeRef.current.position.set(mix(-0.2, -0.35, h), mix(0.22, 0.3, h), mix(-0.08, -0.2, h));
    }
    // Disc tilts and rises
    if (discRef.current) {
      discRef.current.rotation.x = mix(0, 0.5, h);
      discRef.current.position.y = mix(0, 0.15, h);
    }
    // Slab floats away
    if (slabRef.current) {
      slabRef.current.position.set(mix(-0.12, -0.3, h), mix(-0.06, -0.2, h), mix(0.08, 0.25, h));
    }
    // Sphere glows
    if (sphereRef.current) {
      const mat = sphereRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = mix(0, dark ? 1.5 : 1, h);
      sphereRef.current.position.set(mix(0.17, 0.28, h), mix(0.12, 0.25, h), mix(0.06, 0.15, h));
    }
    // Cone rises
    if (coneRef.current) {
      coneRef.current.position.y = mix(0.38, 0.55, h);
    }
  });

  const chrome = {
    metalness: 1,
    roughness: 0.03,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    envMapIntensity: dark ? 2.5 : 3,
    reflectivity: 1,
  };

  const darkChrome = {
    metalness: 0.95,
    roughness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: dark ? 2 : 2.5,
    reflectivity: 1,
  };

  return (
    <Float speed={0.5} floatIntensity={0.35} rotationIntensity={0.12}>
      <group ref={ref}>
        {/* Central chrome cylinder, pillar */}
        <mesh>
          <cylinderGeometry args={[0.055, 0.055, 0.65, 32]} />
          <meshPhysicalMaterial color={dark ? '#d0d0d8' : '#b8b8c0'} {...chrome} />
        </mesh>

        {/* Horizontal disc, dark mirror */}
        <mesh ref={discRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.018, 48]} />
          <meshPhysicalMaterial color={dark ? '#404048' : '#606068'} {...darkChrome} />
        </mesh>

        {/* Orbiting chrome ring */}
        <mesh ref={ringRef} position={[0, 0.05, 0]}>
          <torusGeometry args={[0.38, 0.016, 16, 64]} />
          <meshPhysicalMaterial color={dark ? '#e0e0f0' : '#d0d0e0'} {...chrome} />
        </mesh>

        {/* Glass sphere, sitting on disc */}
        <mesh ref={sphereRef} position={[0.17, 0.12, 0.06]}>
          <sphereGeometry args={[0.1, 48, 48]} />
          <meshPhysicalMaterial
            color={dark ? '#c8d8f0' : '#d0e0ff'}
            metalness={0} roughness={0} transmission={0.97} transparent opacity={0.1}
            ior={2.0} thickness={0.8} envMapIntensity={dark ? 1.5 : 1.8}
            specularIntensity={1.5} specularColor="#ffffff" clearcoat={0.5} clearcoatRoughness={0.02}
            emissive={dark ? '#6688bb' : '#4466aa'} emissiveIntensity={0}
          />
        </mesh>

        {/* Angled chrome slab */}
        <mesh ref={slabRef} position={[-0.12, -0.06, 0.08]} rotation={[0.15, 0.35, 0.55]}>
          <boxGeometry args={[0.24, 0.34, 0.012]} />
          <meshPhysicalMaterial color={dark ? '#555565' : '#808090'} {...darkChrome} />
        </mesh>

        {/* Small tumbling cube */}
        <mesh ref={cubeRef} position={[-0.2, 0.22, -0.08]}>
          <boxGeometry args={[0.075, 0.075, 0.075]} />
          <meshPhysicalMaterial color={dark ? '#e8e8f0' : '#d0d0d8'} {...chrome} />
        </mesh>

        {/* Cone cap */}
        <mesh ref={coneRef} position={[0, 0.38, 0]}>
          <coneGeometry args={[0.04, 0.09, 24]} />
          <meshPhysicalMaterial color={dark ? '#2a2a34' : '#505058'} {...darkChrome} />
        </mesh>
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════
   AI & WEARABLES, camera lens with chrome barrel and glass optics
   ═══════════════════════════════════════════════════ */

function LensAssembly({ dark, hovered }: { dark: boolean; hovered: boolean }) {
  const ref = useRef<THREE.Group>(null!);
  const apertureRef = useRef<THREE.Group>(null!);
  const frontLensRef = useRef<THREE.Mesh>(null!);
  const rearLensRef = useRef<THREE.Mesh>(null!);
  const frontBezelRef = useRef<THREE.Mesh>(null!);
  const rearRingRef = useRef<THREE.Mesh>(null!);
  const centerRef = useRef<THREE.Mesh>(null!);
  const ht = useHoverLerp(hovered);
  const vt = useVirtualTime(ht);

  useFrame(() => {
    if (!ref.current) return;
    const v = vt.current;
    const h = ht.current;
    ref.current.rotation.y = v * 0.05;
    ref.current.rotation.x = Math.sin(v * 0.03) * 0.08;
    ref.current.rotation.z = Math.cos(v * 0.025) * 0.04;
    // Aperture opens on hover
    if (apertureRef.current) {
      const base = 0.9 + Math.sin(v * 0.4) * 0.15;
      const scale = mix(base, 1.8, h);
      apertureRef.current.scale.set(scale, scale, 1);
    }
    // Lens elements separate, exploded view
    if (frontLensRef.current) frontLensRef.current.position.z = mix(0.08, 0.25, h);
    if (rearLensRef.current) rearLensRef.current.position.z = mix(-0.06, -0.25, h);
    if (frontBezelRef.current) frontBezelRef.current.position.z = mix(0.14, 0.35, h);
    if (rearRingRef.current) rearRingRef.current.position.z = mix(-0.14, -0.35, h);
    // Center brightens gently
    if (centerRef.current) {
      const mat = centerRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = mix(dark ? 1 : 0.5, dark ? 1.8 : 1.2, h);
      const s = mix(1, 1.5, h);
      centerRef.current.scale.setScalar(s);
    }
  });

  const chrome = {
    metalness: 1,
    roughness: 0.04,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    envMapIntensity: dark ? 2.5 : 3,
    reflectivity: 1,
  };

  return (
    <Float speed={0.5} floatIntensity={0.3} rotationIntensity={0.1}>
      <group ref={ref}>
        {/* Outer barrel, chrome cylinder */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.46, 0.28, 48, 1, true]} />
          <meshPhysicalMaterial
            color={dark ? '#d0d0d8' : '#b8b8c0'}
            {...chrome}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Front bezel ring */}
        <mesh ref={frontBezelRef} position={[0, 0, 0.14]}>
          <torusGeometry args={[0.48, 0.035, 24, 64]} />
          <meshPhysicalMaterial color={dark ? '#e0e0e8' : '#d0d0d8'} {...chrome} />
        </mesh>

        {/* Rear ring */}
        <mesh ref={rearRingRef} position={[0, 0, -0.14]}>
          <torusGeometry args={[0.44, 0.025, 20, 64]} />
          <meshPhysicalMaterial
            color={dark ? '#3a3a44' : '#606068'} metalness={0.95} roughness={0.1}
            clearcoat={1} clearcoatRoughness={0.08} envMapIntensity={dark ? 2 : 2.5}
          />
        </mesh>

        {/* Front glass element, convex lens */}
        <mesh ref={frontLensRef} position={[0, 0, 0.08]}>
          <sphereGeometry args={[0.32, 48, 48, 0, Math.PI * 2, 0, Math.PI / 3.5]} />
          <meshPhysicalMaterial
            color={dark ? '#80a0d0' : '#90b0e0'} metalness={0} roughness={0}
            transmission={0.96} transparent opacity={0.08} ior={2.2} thickness={1.0}
            envMapIntensity={dark ? 1.5 : 2} specularIntensity={1.5} specularColor={dark ? '#ccddff' : '#aabbdd'}
          />
        </mesh>

        {/* Rear glass, concave */}
        <mesh ref={rearLensRef} position={[0, 0, -0.06]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.24, 32, 32, 0, Math.PI * 2, 0, Math.PI / 4]} />
          <meshPhysicalMaterial
            color={dark ? '#8899cc' : '#99aadd'} metalness={0} roughness={0}
            transmission={0.95} transparent opacity={0.06} ior={1.9} thickness={0.7}
            specularIntensity={1.2} specularColor={dark ? '#bbccee' : '#99aacc'}
          />
        </mesh>

        {/* Aperture blades, chrome */}
        <group ref={apertureRef}>
          {Array.from({ length: 9 }, (_, i) => {
            const angle = (i / 9) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(angle) * 0.18, Math.sin(angle) * 0.18, 0]} rotation={[0, 0, angle + 0.35]}>
                <boxGeometry args={[0.1, 0.025, 0.004]} />
                <meshPhysicalMaterial
                  color={dark ? '#2a2a32' : '#484850'}
                  metalness={0.9}
                  roughness={0.15}
                  clearcoat={0.8}
                  clearcoatRoughness={0.1}
                  envMapIntensity={dark ? 1.5 : 2}
                />
              </mesh>
            );
          })}
        </group>

        {/* Center bright point, sensor indicator */}
        <mesh ref={centerRef} position={[0, 0, 0.01]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshPhysicalMaterial
            color="#ffffff" emissive={dark ? '#aaccff' : '#6688bb'}
            emissiveIntensity={dark ? 1 : 0.5} metalness={0.3} roughness={0.05}
          />
        </mesh>

        {/* Focus ring grooves, detail rings on barrel */}
        {[-0.04, 0.04].map((z, i) => (
          <mesh key={`gr${i}`} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.505, 0.006, 8, 48]} />
            <meshPhysicalMaterial
              color={dark ? '#888890' : '#707078'}
              metalness={0.9}
              roughness={0.2}
              clearcoat={0.5}
              envMapIntensity={dark ? 1.5 : 2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════
   CREATIVE TECHNOLOGY, geodesic wireframe + chrome octahedron core
   ═══════════════════════════════════════════════════ */

function GlassCrystal({ dark, hovered }: { dark: boolean; hovered: boolean }) {
  const ref = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const orbitRef = useRef<THREE.Group>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.LineSegments>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const ht = useHoverLerp(hovered);
  const vt = useVirtualTime(ht);
  // Inner octahedron keeps its own time, it spins gently even on hover
  const innerTime = useRef(0);

  const outerEdges = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(0.55, 1);
    return new THREE.EdgesGeometry(geo);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const v = vt.current;
    const h = ht.current;
    innerTime.current += delta * mix(0.5, 1, h);
    ref.current.rotation.y = v * 0.06;
    ref.current.rotation.x = Math.sin(v * 0.035) * 0.05;
    ref.current.rotation.z = Math.cos(v * 0.03) * 0.04;
    // Inner octahedron: gentle spin, slightly faster on hover
    const it = innerTime.current;
    if (innerRef.current) {
      innerRef.current.rotation.x = -it * 0.08;
      innerRef.current.rotation.y = it * 0.1;
      innerRef.current.rotation.z = Math.cos(it * 0.06) * 0.05;
      const s = mix(1, 1.6, h);
      innerRef.current.scale.setScalar(s);
      const mat = innerRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = mix(0, dark ? 0.8 : 0.5, h);
    }
    // Wireframe expands
    if (wireRef.current) {
      const ws = mix(1, 1.4, h);
      wireRef.current.scale.setScalar(ws);
      const mat = wireRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = mix(dark ? 0.35 : 0.3, dark ? 0.6 : 0.5, h);
    }
    // Glass shell expands
    if (shellRef.current) {
      const ss = mix(1, 1.4, h);
      shellRef.current.scale.setScalar(ss);
    }
    // Orbit particles drift wider gently
    if (orbitRef.current) {
      orbitRef.current.rotation.y = v * 0.1;
      orbitRef.current.rotation.x = Math.sin(v * 0.06) * 0.15;
      const os = mix(1, 1.35, h);
      orbitRef.current.scale.setScalar(os);
    }
    // Core gently brightens
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = mix(dark ? 0.8 : 0.4, dark ? 1.6 : 1.2, h);
      const cs = mix(1, 1.4, h);
      coreRef.current.scale.setScalar(cs);
    }
  });

  return (
    <Float speed={0.8} floatIntensity={0.45} rotationIntensity={0.15}>
      <group ref={ref}>
        {/* Outer wireframe, silver */}
        <lineSegments ref={wireRef} geometry={outerEdges}>
          <lineBasicMaterial color={dark ? '#b8c8e0' : '#8899aa'} transparent opacity={dark ? 0.5 : 0.4} />
        </lineSegments>

        {/* Glass shell, translucent refraction */}
        <mesh ref={shellRef}>
          <icosahedronGeometry args={[0.53, 1]} />
          <meshPhysicalMaterial
            color={dark ? '#c0d0e8' : '#d0ddf0'} metalness={0} roughness={0}
            transmission={0.96} transparent opacity={0.08} ior={1.4} thickness={0.6}
            envMapIntensity={dark ? 1.0 : 1.2} specularIntensity={1.2}
            specularColor={dark ? '#ccddff' : '#aabbdd'}
          />
        </mesh>

        {/* Inner chrome octahedron */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshPhysicalMaterial
            color={dark ? '#d0d0e0' : '#b8b8c8'} metalness={1} roughness={0.02}
            clearcoat={1} clearcoatRoughness={0.02} envMapIntensity={dark ? 3 : 3.5} reflectivity={1}
            emissive={dark ? '#6688bb' : '#4466aa'} emissiveIntensity={0}
          />
        </mesh>

        {/* Core glow */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.06, 24, 24]} />
          <meshPhysicalMaterial
            color="#ffffff" emissive={dark ? '#99bbff' : '#6688bb'}
            emissiveIntensity={dark ? 0.8 : 0.4} metalness={0.2} roughness={0.05} clearcoat={1}
          />
        </mesh>

        {/* Orbiting chrome spheres */}
        <group ref={orbitRef}>
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const r = 0.4;
            return (
              <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle * 0.7) * 0.12, Math.sin(angle) * r]}>
                <sphereGeometry args={[0.025, 16, 16]} />
                <meshPhysicalMaterial
                  color={dark ? '#e0e0f0' : '#d0d0e0'}
                  metalness={1}
                  roughness={0.02}
                  clearcoat={1}
                  clearcoatRoughness={0.02}
                  envMapIntensity={dark ? 3 : 3.5}
                  reflectivity={1}
                />
              </mesh>
            );
          })}
        </group>
      </group>
    </Float>
  );
}

/* ─── Particle dust ─── */

function ParticleDust({ count, reduced, dark }: { count: number; reduced: boolean; dark: boolean }) {
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
      <pointsMaterial
        color={dark ? '#ffffff' : '#333333'}
        size={0.015}
        transparent
        opacity={dark ? 0.25 : 0.18}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Scene Content ─── */

function SceneContent({ reduced, isMobile, dark }: { reduced: boolean; isMobile: boolean; dark: boolean }) {
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

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = target.current;
    const m = mouse.current;
    t.x += (m.x - t.x) * 0.012;
    t.y += (m.y - t.y) * 0.012;
    // Continuous slow orbit, whole constellation rotates around Z axis
    const elapsed = clock.getElapsedTime();
    const orbitZ = elapsed * 0.015; // very slow continuous rotation around Z
    const orbitX = Math.cos(elapsed * 0.03) * 0.02; // subtle drift
    groupRef.current.rotation.y = t.x * 0.1;
    groupRef.current.rotation.x = -t.y * 0.05 + orbitX;
    groupRef.current.rotation.z = orbitZ;
  });

  const positions = NODES.map(n => n.position);

  return (
    <>
      {/* Dramatic lighting for glass reflections + refractions */}
      <ambientLight intensity={dark ? 0.08 : 0.18} />
      {/* Key light — strong, creates primary glass highlights */}
      <directionalLight intensity={dark ? 2.0 : 1.5} position={[5, 8, 6]} color={dark ? '#eef0ff' : '#ffffff'} />
      {/* Fill light — opens up shadows on glass */}
      <directionalLight intensity={dark ? 0.7 : 0.5} position={[-6, 3, -4]} color={dark ? '#99aadd' : '#c0ccdd'} />
      {/* Rim light — glass edge highlights, critical for glass look */}
      <directionalLight intensity={dark ? 1.2 : 0.9} position={[0, -2, -8]} color={dark ? '#bbccee' : '#aabbcc'} />
      {/* Top accent — specular crown on glass */}
      <pointLight intensity={dark ? 1.5 : 0.9} color="#ffffff" distance={20} position={[0, 6, 4]} />
      {/* Bottom bounce */}
      <pointLight intensity={0.4} color={dark ? '#7788bb' : '#99aabb'} distance={15} position={[-3, -4, 3]} />
      {/* Side accent — catches glass transmission */}
      <pointLight intensity={dark ? 0.6 : 0.4} color={dark ? '#aabbee' : '#bbccdd'} distance={12} position={[4, -1, -2]} />

      {/* Environment reflections — city preset gives complex glass reflections */}
      <Environment preset="city" environmentIntensity={dark ? 1.0 : 1.2} />

      <group ref={groupRef} scale={0.7}>
        <ConstellationLines positions={positions} dark={dark} />

        {/* 0: Installations, Truss (top) */}
        <ClickableObject route={NODES[0].route} position={NODES[0].position}>
          {(hovered) => <TrussStructure dark={dark} hovered={hovered} />}
        </ClickableObject>

        {/* 1: Design for Good, Chrome knot (right) */}
        <ClickableObject route={NODES[1].route} position={NODES[1].position}>
          {(hovered) => <PetalRose dark={dark} hovered={hovered} />}
        </ClickableObject>

        {/* 2: Product Design, Morphing screens (center) */}
        <ClickableObject route={NODES[2].route} position={NODES[2].position}>
          {(hovered) => <MorphingScreens dark={dark} hovered={hovered} />}
        </ClickableObject>

        {/* 3: Brand & Visual, Bauhaus (left) */}
        <ClickableObject route={NODES[3].route} position={NODES[3].position}>
          {(hovered) => <StackedPlates dark={dark} hovered={hovered} />}
        </ClickableObject>

        {/* 4: AI & Wearables, Lens (bottom left) */}
        <ClickableObject route={NODES[4].route} position={NODES[4].position}>
          {(hovered) => <LensAssembly dark={dark} hovered={hovered} />}
        </ClickableObject>

        {/* 5: Creative Technology, Geodesic (bottom right) */}
        <ClickableObject route={NODES[5].route} position={NODES[5].position}>
          {(hovered) => <GlassCrystal dark={dark} hovered={hovered} />}
        </ClickableObject>

        {/* Interactive Labels, morph into mini 3D objects on hover */}
        {NODES.map((n, i) => (
          <InteractiveLabel key={i} position={n.position} text={n.label} offset={n.labelOffset} dark={dark} index={i} route={n.route} parentRef={groupRef} />
        ))}
      </group>

      <ParticleDust count={isMobile ? 100 : 280} reduced={reduced} dark={dark} />
    </>
  );
}

/* ─── Main Component ─── */

/* ─── Named exports for reuse on category/project pages ─── */
export { TrussStructure, PetalRose, MorphingScreens, StackedPlates, LensAssembly, GlassCrystal };
export { useHoverLerp, useVirtualTime, mix };

export default function HeroScene({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReduced();
  const dark = useThemeMode();
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  );
  const [visible, setVisible] = useState(true);

  // Sync navigate callback to module-level ref for R3F access
  useEffect(() => {
    if (onNavigate) _navigate = onNavigate;
    return () => { _navigate = null; };
  }, [onNavigate]);

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
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
        camera={{ fov: 40, near: 0.1, far: 100, position: [0, 0.3, 7.5] }}
        style={{ background: 'transparent' }}
      >
        <SceneContent reduced={reduced} isMobile={isMobile} dark={dark} />
      </Canvas>
    </div>
  );
}
