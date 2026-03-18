/* ============================================
   3D Hero Scene — Three.js floating objects
   Inspired by wildyriftian's 3D visual style
   ============================================ */

(function () {
  'use strict';

  var container = document.getElementById('hero-3d');
  if (!container || typeof THREE === 'undefined') return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 768px)').matches;

  // ── Scene setup ──
  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.z = isMobile ? 7 : 5.5;

  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // ── Lighting ──
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  var mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
  mainLight.position.set(5, 5, 5);
  scene.add(mainLight);

  var rimLight = new THREE.DirectionalLight(0x6688ff, 0.3);
  rimLight.position.set(-5, 3, -3);
  scene.add(rimLight);

  var warmLight = new THREE.PointLight(0xff8844, 0.4, 10);
  warmLight.position.set(2, -2, 3);
  scene.add(warmLight);

  // ── Theme detection ──
  function getThemeColors() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      wireColor: isDark ? 0xaaaacc : 0x333344,
      solidColor: isDark ? 0x444466 : 0xddddee,
      glassColor: isDark ? 0x6677aa : 0x8899cc,
      particleColor: isDark ? 0x6677aa : 0x999aab
    };
  }

  var colors = getThemeColors();

  // ── Materials ──
  var wireMaterial = new THREE.MeshStandardMaterial({
    color: colors.wireColor,
    wireframe: true,
    transparent: true,
    opacity: 0.6,
    roughness: 0.8
  });

  var solidMaterial = new THREE.MeshStandardMaterial({
    color: colors.solidColor,
    metalness: 0.2,
    roughness: 0.4,
    transparent: true,
    opacity: 0.85
  });

  var glassMaterial = new THREE.MeshPhysicalMaterial({
    color: colors.glassColor,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.8,
    transparent: true,
    opacity: 0.5,
    ior: 1.5,
    thickness: 0.5
  });

  var edgeMaterial = new THREE.LineBasicMaterial({
    color: colors.wireColor,
    transparent: true,
    opacity: 0.3
  });

  // ── Geometries — floating composition ──
  var objects = [];
  var group = new THREE.Group();

  // 1. Large wireframe torus — center
  var torusGeo = new THREE.TorusGeometry(1.2, 0.35, 16, 48);
  var torus = new THREE.Mesh(torusGeo, wireMaterial);
  torus.position.set(0, 0.2, 0);
  torus.userData = { speed: 0.3, axis: 'y', floatAmp: 0.15, floatSpeed: 0.8 };
  group.add(torus);
  objects.push(torus);

  // 2. Solid dodecahedron — left
  var dodecGeo = new THREE.DodecahedronGeometry(0.65, 0);
  var dodec = new THREE.Mesh(dodecGeo, solidMaterial);
  dodec.position.set(-2.0, -0.5, 0.5);
  dodec.userData = { speed: 0.5, axis: 'xy', floatAmp: 0.2, floatSpeed: 1.1 };
  group.add(dodec);
  objects.push(dodec);

  // 3. Glass icosahedron — right
  var icoGeo = new THREE.IcosahedronGeometry(0.55, 0);
  var ico = new THREE.Mesh(icoGeo, glassMaterial);
  ico.position.set(2.2, 0.6, -0.5);
  ico.userData = { speed: 0.4, axis: 'xz', floatAmp: 0.18, floatSpeed: 0.9 };
  group.add(ico);
  objects.push(ico);

  // 4. Small wireframe octahedron — top-right
  var octGeo = new THREE.OctahedronGeometry(0.4, 0);
  var oct = new THREE.Mesh(octGeo, wireMaterial.clone());
  oct.material.opacity = 0.4;
  oct.position.set(1.5, 1.5, -1);
  oct.userData = { speed: 0.6, axis: 'z', floatAmp: 0.25, floatSpeed: 1.3 };
  group.add(oct);
  objects.push(oct);

  // 5. Flat torus knot — bottom-right
  var knotGeo = new THREE.TorusKnotGeometry(0.4, 0.12, 64, 8, 2, 3);
  var knot = new THREE.Mesh(knotGeo, solidMaterial.clone());
  knot.material.opacity = 0.6;
  knot.position.set(1.8, -1.2, 0.8);
  knot.scale.set(0.8, 0.8, 0.8);
  knot.userData = { speed: 0.35, axis: 'xy', floatAmp: 0.15, floatSpeed: 0.7 };
  group.add(knot);
  objects.push(knot);

  // 6. Small sphere — hovering accent
  var sphereGeo = new THREE.SphereGeometry(0.2, 16, 16);
  var sphere = new THREE.Mesh(sphereGeo, glassMaterial.clone());
  sphere.material.opacity = 0.4;
  sphere.position.set(-1.5, 1.2, 1);
  sphere.userData = { speed: 0.7, axis: 'y', floatAmp: 0.3, floatSpeed: 1.5 };
  group.add(sphere);
  objects.push(sphere);

  // 7. Ring — subtle accent
  var ringGeo = new THREE.RingGeometry(0.6, 0.75, 32);
  var ringMat = new THREE.MeshBasicMaterial({
    color: colors.wireColor,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide
  });
  var ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(-0.8, -1.4, -0.5);
  ring.rotation.x = Math.PI / 3;
  ring.userData = { speed: 0.2, axis: 'z', floatAmp: 0.1, floatSpeed: 0.6 };
  group.add(ring);
  objects.push(ring);

  scene.add(group);

  // ── Particles ──
  var particleCount = isMobile ? 40 : 80;
  var particleGeo = new THREE.BufferGeometry();
  var positions = new Float32Array(particleCount * 3);
  var sizes = new Float32Array(particleCount);

  for (var i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    sizes[i] = Math.random() * 2 + 0.5;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  var particleMat = new THREE.PointsMaterial({
    color: colors.particleColor,
    size: 0.02,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true
  });
  var particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ── Mouse tracking ──
  var mouseX = 0, mouseY = 0;
  var targetX = 0, targetY = 0;

  if (!isMobile) {
    document.addEventListener('mousemove', function (e) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  // ── Animation loop ──
  var clock = new THREE.Clock();
  var isVisible = true;
  var rafId = null;

  function animate() {
    if (!isVisible) return;
    rafId = requestAnimationFrame(animate);

    var elapsed = clock.getElapsedTime();

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    // Rotate entire group with mouse
    group.rotation.y = targetX * 0.3;
    group.rotation.x = -targetY * 0.15;

    // Individual object animations
    if (!prefersReduced) {
      for (var i = 0; i < objects.length; i++) {
        var obj = objects[i];
        var d = obj.userData;
        var t = elapsed * d.speed;

        // Rotate
        if (d.axis === 'y' || d.axis === 'xy') obj.rotation.y += 0.005 * d.speed;
        if (d.axis === 'x' || d.axis === 'xy' || d.axis === 'xz') obj.rotation.x += 0.003 * d.speed;
        if (d.axis === 'z' || d.axis === 'xz') obj.rotation.z += 0.004 * d.speed;

        // Float up/down
        obj.position.y += Math.sin(elapsed * d.floatSpeed) * 0.001;
      }
    }

    // Slowly rotate particles
    particles.rotation.y = elapsed * 0.02;
    particles.rotation.x = elapsed * 0.01;

    renderer.render(scene, camera);
  }

  // ── Visibility observer — stop rendering when off-screen ──
  var observer = new IntersectionObserver(function (entries) {
    isVisible = entries[0].isIntersecting;
    if (isVisible && !rafId) {
      rafId = requestAnimationFrame(animate);
    }
  }, { threshold: 0 });
  observer.observe(container);

  // Start
  animate();

  // ── Resize handler ──
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }, 150);
  });

  // ── Theme change listener ──
  var themeObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === 'data-theme') {
        var c = getThemeColors();
        wireMaterial.color.setHex(c.wireColor);
        solidMaterial.color.setHex(c.solidColor);
        glassMaterial.color.setHex(c.glassColor);
        particleMat.color.setHex(c.particleColor);
        edgeMaterial.color.setHex(c.wireColor);
        ringMat.color.setHex(c.wireColor);
      }
    });
  });
  themeObserver.observe(document.documentElement, { attributes: true });

  // ── Scroll opacity fade ──
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    var heroH = container.offsetHeight;
    if (scrolled < heroH) {
      var opacity = 1 - (scrolled / heroH) * 0.8;
      container.style.opacity = Math.max(0.2, opacity);
    }
  }, { passive: true });

})();
