import * as THREE from 'three';

(function () {
  'use strict';

  var container = document.getElementById('hero-3d');
  if (!container) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ── Renderer ── */
  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  /* ── Scene & Camera ── */
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 5);

  /* ── Simplex noise GLSL ── */
  var noiseGLSL = [
    'vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}',
    'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}',
    'float snoise(vec3 v){',
    '  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);',
    '  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);',
    '  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;',
    '  vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);',
    '  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;',
    '  i=mod289(i);',
    '  vec4 p=permute(permute(permute(',
    '    i.z+vec4(0.0,i1.z,i2.z,1.0))',
    '    +i.y+vec4(0.0,i1.y,i2.y,1.0))',
    '    +i.x+vec4(0.0,i1.x,i2.x,1.0));',
    '  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;',
    '  vec4 j=p-49.0*floor(p*ns.z*ns.z);',
    '  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);',
    '  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;',
    '  vec4 h=1.0-abs(x)-abs(y);',
    '  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);',
    '  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;',
    '  vec4 sh=-step(h,vec4(0.0));',
    '  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;',
    '  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);',
    '  vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);',
    '  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));',
    '  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;',
    '  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);',
    '  m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));',
    '}'
  ].join('\n');

  /* ── Vertex shader ── */
  var vertexShader = [
    noiseGLSL,
    'uniform float uTime;',
    'uniform float uIntro;',
    'varying vec3 vNormal;',
    'varying vec3 vPos;',
    'varying float vDisp;',
    'void main(){',
    '  float n = snoise(position * 1.2 + uTime * 0.15) * 0.25;',
    '  n += snoise(position * 2.4 + uTime * 0.08) * 0.12;',
    '  vec3 np = position + normal * n * uIntro;',
    '  vNormal = normalize(normalMatrix * normal);',
    '  vPos = (modelViewMatrix * vec4(np, 1.0)).xyz;',
    '  vDisp = n;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(np * uIntro, 1.0);',
    '}'
  ].join('\n');

  /* ── Fragment shader — very soft, barely-there pastels ── */
  var fragmentShader = [
    'varying vec3 vNormal;',
    'varying vec3 vPos;',
    'varying float vDisp;',
    'uniform float uTime;',
    'uniform float uIntro;',
    'void main(){',
    '  vec3 softPink = vec3(0.96, 0.82, 0.87);',   // very pale pink
    '  vec3 softBlue = vec3(0.82, 0.88, 0.96);',    // very pale blue
    '  vec3 softLav  = vec3(0.90, 0.85, 0.96);',    // very pale lavender
    '  vec3 warm     = vec3(0.98, 0.94, 0.88);',    // very pale warm
    '',
    '  float t1 = vNormal.x * 0.5 + 0.5;',
    '  float t2 = vNormal.y * 0.5 + 0.5;',
    '  float t3 = sin(vDisp * 2.0 + uTime * 0.1) * 0.5 + 0.5;',
    '',
    '  vec3 col = mix(softPink, softBlue, t1);',
    '  col = mix(col, softLav, t2 * 0.5);',
    '  col = mix(col, warm, t3 * 0.3);',
    '',
    '  vec3 viewDir = normalize(-vPos);',
    '  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.0);',
    '  col = mix(col, vec3(1.0), fresnel * 0.4);',
    '',
    // Very low opacity — just a gentle color wash
    '  float alpha = smoothstep(0.0, 0.5, uIntro) * 0.18;',
    '  alpha *= (1.0 - fresnel * 0.5);',  // fade edges even more
    '  gl_FragColor = vec4(col, alpha);',
    '}'
  ].join('\n');

  var uniforms = {
    uTime: { value: 0 },
    uIntro: { value: 0 }
  };

  var blobMat = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
    transparent: true,
    depthWrite: false
  });

  /* ── Blob ── */
  var blobGeo = new THREE.IcosahedronGeometry(2.0, 48);
  var blob = new THREE.Mesh(blobGeo, blobMat);
  blob.position.set(1.2, -0.3, 0); // offset right, slightly down
  scene.add(blob);

  /* ── Mouse ── */
  var mouseX = 0, mouseY = 0, tMX = 0, tMY = 0;
  if (isFinePointer) {
    window.addEventListener('mousemove', function(e) {
      tMX = (e.clientX / window.innerWidth - 0.5) * 2;
      tMY = (e.clientY / window.innerHeight - 0.5) * 2;
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

  /* ── Animate ── */
  var start = performance.now();

  function animate() {
    requestAnimationFrame(animate);
    var elapsed = (performance.now() - start) / 1000;

    // Slow intro
    var intro = Math.min(1, elapsed / 2.5);
    intro = 1 - Math.pow(1 - intro, 3);
    uniforms.uIntro.value = intro;
    uniforms.uTime.value = elapsed;

    if (!prefersReducedMotion) {
      blob.rotation.y = elapsed * 0.06;
      blob.rotation.x = Math.sin(elapsed * 0.04) * 0.1;
    }

    if (isFinePointer) {
      mouseX += (tMX - mouseX) * 0.02;
      mouseY += (tMY - mouseY) * 0.02;
      blob.rotation.y += mouseX * 0.12;
      blob.rotation.x += mouseY * -0.06;
    }

    renderer.render(scene, camera);
  }

  if (document.readyState === 'complete') {
    animate();
  } else {
    window.addEventListener('load', animate);
  }

  /* ── Scroll fade ── */
  if (!prefersReducedMotion) {
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var hero = document.querySelector('.hero');
          if (!hero) { ticking = false; return; }
          var p = window.scrollY / hero.offsetHeight;
          container.style.opacity = String(Math.max(0, 1 - p * 2.5));
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
})();
