import * as THREE from 'three';

(function () {
  'use strict';

  const container = document.getElementById('hero-3d');
  if (!container) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  /* ── Scene & Camera ── */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 4.5);

  /* ── Simplex 3D noise (GLSL) ── */
  const noiseGLSL = `
    vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
  `;

  /* ── Shader Material ── */
  const vertexShader = `
    ${noiseGLSL}

    uniform float uTime;
    uniform float uNoiseScale;
    uniform float uNoiseAmp;
    uniform float uIntro;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;

    void main() {
      float scale = uIntro;
      float n = snoise(position * uNoiseScale + uTime * 0.3) * uNoiseAmp;
      n += snoise(position * uNoiseScale * 2.0 + uTime * 0.15) * uNoiseAmp * 0.4;
      vec3 newPos = position + normal * n * scale;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(newPos, 1.0)).xyz;
      vDisplacement = n;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos * scale, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform float uIntro;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;

    void main() {
      // Gradient based on normal direction — pink to blue to purple
      vec3 pink = vec3(0.91, 0.26, 0.58);    // #e84393
      vec3 blue = vec3(0.29, 0.56, 0.91);    // #4a8fe7
      vec3 purple = vec3(0.55, 0.24, 0.78);  // #8c3ec8
      vec3 peach = vec3(1.0, 0.85, 0.65);    // warm accent

      // Mix colors based on normal and displacement
      float t1 = vNormal.x * 0.5 + 0.5;
      float t2 = vNormal.y * 0.5 + 0.5;
      float t3 = sin(vDisplacement * 3.0 + uTime * 0.2) * 0.5 + 0.5;

      vec3 col = mix(pink, blue, t1);
      col = mix(col, purple, t2 * 0.6);
      col = mix(col, peach, t3 * 0.25);

      // Fresnel rim lighting
      vec3 viewDir = normalize(-vPosition);
      float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);
      col += vec3(1.0, 0.95, 0.98) * fresnel * 0.6;

      // Subtle specular highlight
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.5));
      float spec = pow(max(dot(reflect(-lightDir, vNormal), viewDir), 0.0), 16.0);
      col += vec3(1.0) * spec * 0.3;

      float alpha = smoothstep(0.0, 0.3, uIntro) * (0.85 + fresnel * 0.15);
      gl_FragColor = vec4(col, alpha);
    }
  `;

  const uniforms = {
    uTime: { value: 0 },
    uNoiseScale: { value: 1.5 },
    uNoiseAmp: { value: 0.35 },
    uIntro: { value: 0 }
  };

  const blobMat = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
    transparent: true,
    side: THREE.FrontSide,
    depthWrite: false
  });

  /* ── Blob geometry ── */
  const blobGeo = new THREE.IcosahedronGeometry(1.5, 64);
  const blob = new THREE.Mesh(blobGeo, blobMat);
  blob.position.set(0.5, 0, 0);
  scene.add(blob);

  /* ── Soft glow sphere behind ── */
  const glowMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uIntro;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position * uIntro, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vec3 viewDir = normalize(-vPosition);
        float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 1.8);
        vec3 pink = vec3(0.91, 0.26, 0.58);
        vec3 blue = vec3(0.29, 0.56, 0.91);
        vec3 col = mix(pink, blue, vNormal.x * 0.5 + 0.5);
        gl_FragColor = vec4(col, fresnel * 0.12);
      }
    `,
    uniforms: { uIntro: uniforms.uIntro },
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false
  });
  const glow = new THREE.Mesh(new THREE.IcosahedronGeometry(2.2, 32), glowMat);
  glow.position.copy(blob.position);
  scene.add(glow);

  /* ── Small accent spheres ── */
  const accents = [];
  const accentData = [
    { pos: [2.4, 1.3, -1.0], size: 0.12, color: 0xe84393, speed: 1.2, phase: 0 },
    { pos: [-1.8, 1.6, -0.5], size: 0.08, color: 0x4a8fe7, speed: 0.9, phase: 1.5 },
    { pos: [1.9, -1.5, 0.3], size: 0.10, color: 0x8c3ec8, speed: 1.0, phase: 3.0 },
    { pos: [-2.2, -0.8, -0.8], size: 0.06, color: 0xffeaa7, speed: 1.4, phase: 4.2 },
    { pos: [0.8, 2.0, -1.2], size: 0.07, color: 0x74b9ff, speed: 0.8, phase: 2.1 },
  ];

  accentData.forEach(function(d) {
    const geo = new THREE.SphereGeometry(d.size, 16, 16);
    const mat = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(d.pos[0], d.pos[1], d.pos[2]);
    scene.add(mesh);
    accents.push({ mesh: mesh, base: mesh.position.clone(), speed: d.speed, phase: d.phase });
  });

  /* ── Mouse tracking ── */
  let mouseX = 0, mouseY = 0;
  let targetMX = 0, targetMY = 0;

  if (isFinePointer) {
    window.addEventListener('mousemove', function(e) {
      targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  /* ── Resize ── */
  function onResize() {
    var w = container.clientWidth;
    var h = container.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  /* ── Animation ── */
  var startTime = performance.now();
  var introDuration = 2.0;

  function animate() {
    requestAnimationFrame(animate);

    var now = performance.now();
    var elapsed = (now - startTime) / 1000;

    // Intro
    var intro = Math.min(1, elapsed / introDuration);
    intro = 1 - Math.pow(1 - intro, 4); // ease out quart
    uniforms.uIntro.value = intro;
    uniforms.uTime.value = elapsed;

    // Accent dots fade in
    accents.forEach(function(a) {
      a.mesh.material.opacity = Math.min(0.6, intro);
      if (!prefersReducedMotion) {
        var t = elapsed * a.speed + a.phase;
        a.mesh.position.y = a.base.y + Math.sin(t) * 0.15;
        a.mesh.position.x = a.base.x + Math.cos(t * 0.6) * 0.08;
      }
    });

    // Blob auto-rotation
    if (!prefersReducedMotion) {
      blob.rotation.y = elapsed * 0.12;
      blob.rotation.x = Math.sin(elapsed * 0.08) * 0.15;
      glow.rotation.y = elapsed * 0.08;
    }

    // Mouse influence
    if (isFinePointer) {
      mouseX += (targetMX - mouseX) * 0.03;
      mouseY += (targetMY - mouseY) * 0.03;
      blob.rotation.y += mouseX * 0.3;
      blob.rotation.x += mouseY * -0.15;
      // Subtle camera offset
      camera.position.x = mouseX * 0.2;
      camera.position.y = mouseY * 0.1;
      camera.lookAt(blob.position);
    }

    renderer.render(scene, camera);
  }

  // Start
  if (document.readyState === 'complete') {
    animate();
  } else {
    window.addEventListener('load', animate);
  }

  /* ── Scroll fade ── */
  if (!prefersReducedMotion) {
    var scrollTicking = false;
    window.addEventListener('scroll', function() {
      if (!scrollTicking) {
        requestAnimationFrame(function() {
          var hero = document.querySelector('.hero');
          if (!hero) { scrollTicking = false; return; }
          var heroH = hero.offsetHeight;
          var sy = window.scrollY;
          if (sy > heroH) { scrollTicking = false; return; }
          var p = sy / heroH;
          container.style.opacity = String(Math.max(0, 1 - p * 2));
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }
})();
