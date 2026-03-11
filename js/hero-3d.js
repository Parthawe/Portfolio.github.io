import * as THREE from 'three';

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const container = document.getElementById('hero-3d');
  if (!container) return;

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  /* ── Scene & Camera ── */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 8);

  /* ── Lighting ── */
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xe84393, 1.4); // pink
  dirLight1.position.set(3, 4, 5);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x4a8fe7, 1.0); // blue
  dirLight2.position.set(-4, -2, 3);
  scene.add(dirLight2);

  const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight3.position.set(0, 5, -3);
  scene.add(dirLight3);

  // Subtle point light for extra warmth
  const pointLight = new THREE.PointLight(0xffeaa7, 0.6, 20);
  pointLight.position.set(2, -3, 4);
  scene.add(pointLight);

  /* ── Materials ── */
  function glassMat(color, roughness, metalness) {
    return new THREE.MeshPhysicalMaterial({
      color: color,
      roughness: roughness,
      metalness: metalness,
      transmission: 0.85,
      thickness: 1.5,
      ior: 1.5,
      transparent: true,
      opacity: 0.9,
      envMapIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide
    });
  }

  function solidMat(color, roughness, metalness) {
    return new THREE.MeshPhysicalMaterial({
      color: color,
      roughness: roughness,
      metalness: metalness,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2
    });
  }

  /* ── Objects ── */
  const objects = [];

  // 1. Large torus knot — hero centerpiece
  const torusKnotGeo = new THREE.TorusKnotGeometry(1.0, 0.35, 128, 32, 2, 3);
  const torusKnot = new THREE.Mesh(torusKnotGeo, glassMat(0xe84393, 0.05, 0.1));
  torusKnot.position.set(0.3, 0.2, 0);
  torusKnot.scale.setScalar(0.9);
  scene.add(torusKnot);
  objects.push({
    mesh: torusKnot,
    basePos: torusKnot.position.clone(),
    floatSpeed: 0.8,
    floatAmp: 0.3,
    rotSpeed: { x: 0.003, y: 0.005, z: 0.001 },
    phase: 0
  });

  // 2. Icosahedron — top right
  const icoGeo = new THREE.IcosahedronGeometry(0.7, 0);
  const ico = new THREE.Mesh(icoGeo, glassMat(0x4a8fe7, 0.08, 0.15));
  ico.position.set(1.8, 1.5, -1);
  scene.add(ico);
  objects.push({
    mesh: ico,
    basePos: ico.position.clone(),
    floatSpeed: 1.1,
    floatAmp: 0.25,
    rotSpeed: { x: 0.006, y: 0.004, z: 0.002 },
    phase: 1.2
  });

  // 3. Dodecahedron — bottom left
  const dodGeo = new THREE.DodecahedronGeometry(0.55, 0);
  const dod = new THREE.Mesh(dodGeo, solidMat(0xffeaa7, 0.3, 0.6));
  dod.position.set(-1.6, -1.2, -0.5);
  scene.add(dod);
  objects.push({
    mesh: dod,
    basePos: dod.position.clone(),
    floatSpeed: 0.9,
    floatAmp: 0.2,
    rotSpeed: { x: 0.004, y: 0.007, z: 0.003 },
    phase: 2.4
  });

  // 4. Sphere — small accent top left
  const sphereGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const sphere = new THREE.Mesh(sphereGeo, glassMat(0xdfe6e9, 0.02, 0.0));
  sphere.position.set(-2.0, 1.8, 0.5);
  scene.add(sphere);
  objects.push({
    mesh: sphere,
    basePos: sphere.position.clone(),
    floatSpeed: 1.3,
    floatAmp: 0.18,
    rotSpeed: { x: 0.002, y: 0.003, z: 0.005 },
    phase: 3.6
  });

  // 5. Octahedron — small, far back, adds depth
  const octGeo = new THREE.OctahedronGeometry(0.4, 0);
  const oct = new THREE.Mesh(octGeo, solidMat(0xe84393, 0.2, 0.5));
  oct.position.set(2.2, -1.0, -2);
  oct.scale.setScalar(0.8);
  scene.add(oct);
  objects.push({
    mesh: oct,
    basePos: oct.position.clone(),
    floatSpeed: 0.7,
    floatAmp: 0.22,
    rotSpeed: { x: 0.005, y: 0.002, z: 0.006 },
    phase: 4.8
  });

  // 6. Torus — ring accent
  const torusGeo = new THREE.TorusGeometry(0.5, 0.15, 24, 48);
  const torus = new THREE.Mesh(torusGeo, glassMat(0x74b9ff, 0.06, 0.12));
  torus.position.set(-0.8, -0.3, 1);
  torus.rotation.x = Math.PI * 0.35;
  torus.rotation.z = Math.PI * 0.15;
  scene.add(torus);
  objects.push({
    mesh: torus,
    basePos: torus.position.clone(),
    floatSpeed: 1.0,
    floatAmp: 0.15,
    rotSpeed: { x: 0.004, y: 0.006, z: 0.002 },
    phase: 0.7
  });

  /* ── Environment map (simple procedural) ── */
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  // Gradient background for reflections
  const envGeo = new THREE.SphereGeometry(10, 32, 32);
  const envMat = new THREE.MeshBasicMaterial({
    color: 0xf0f0f0,
    side: THREE.BackSide
  });
  envScene.add(new THREE.Mesh(envGeo, envMat));
  // Add colored lights to env scene
  envScene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const envDirLight = new THREE.DirectionalLight(0xe84393, 0.4);
  envDirLight.position.set(3, 4, 5);
  envScene.add(envDirLight);
  const envDirLight2 = new THREE.DirectionalLight(0x4a8fe7, 0.3);
  envDirLight2.position.set(-4, -2, 3);
  envScene.add(envDirLight2);
  const envRT = pmremGenerator.fromScene(envScene, 0.04);
  scene.environment = envRT.texture;
  pmremGenerator.dispose();

  /* ── Mouse tracking ── */
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (isFinePointer) {
    document.addEventListener('mousemove', function (e) {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  /* ── Intro animation ── */
  let introProgress = 0;
  const introDuration = 1.5; // seconds
  const startTime = performance.now();

  // Hide objects initially
  objects.forEach(function (obj) {
    obj.mesh.scale.setScalar(0);
    obj.mesh.material.opacity = 0;
  });

  /* ── Resize ── */
  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  /* ── Animation Loop ── */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // Smooth mouse
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    // Intro animation
    if (introProgress < 1) {
      const elapsedIntro = (performance.now() - startTime) / 1000;
      introProgress = Math.min(1, elapsedIntro / introDuration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - introProgress, 3);

      objects.forEach(function (obj, i) {
        const stagger = Math.min(1, Math.max(0, (introProgress - i * 0.08) / 0.6));
        const staggerEase = 1 - Math.pow(1 - stagger, 3);
        const targetScale = obj.mesh === torusKnot ? 0.9 : (obj.mesh === oct ? 0.8 : 1);
        obj.mesh.scale.setScalar(staggerEase * targetScale);
        obj.mesh.material.opacity = Math.min(0.9, staggerEase);
      });
    }

    // Float + rotate each object
    if (!prefersReducedMotion) {
      objects.forEach(function (obj) {
        const t = elapsed * obj.floatSpeed + obj.phase;
        obj.mesh.position.y = obj.basePos.y + Math.sin(t) * obj.floatAmp;
        obj.mesh.position.x = obj.basePos.x + Math.cos(t * 0.7) * obj.floatAmp * 0.3;

        obj.mesh.rotation.x += obj.rotSpeed.x;
        obj.mesh.rotation.y += obj.rotSpeed.y;
        obj.mesh.rotation.z += obj.rotSpeed.z;
      });
    }

    // Mouse-driven scene rotation
    if (isFinePointer) {
      scene.rotation.y = mouseX * 0.15;
      scene.rotation.x = mouseY * -0.08;
    }

    renderer.render(scene, camera);
  }

  // Start after page load for smooth intro
  if (document.readyState === 'complete') {
    animate();
  } else {
    window.addEventListener('load', animate);
  }

  /* ── Scroll-based fade out ── */
  if (!prefersReducedMotion) {
    let scrollTicking = false;
    window.addEventListener('scroll', function () {
      if (!scrollTicking) {
        requestAnimationFrame(function () {
          const hero = document.querySelector('.hero');
          if (!hero) { scrollTicking = false; return; }
          const heroH = hero.offsetHeight;
          const scrollY = window.scrollY;
          if (scrollY > heroH) { scrollTicking = false; return; }

          const progress = scrollY / heroH;
          container.style.opacity = String(Math.max(0, 1 - progress * 1.8));
          container.style.transform = 'translateY(' + (scrollY * 0.1) + 'px) scale(' + (1 - progress * 0.05) + ')';
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }
})();
