/* ============================================
   Keychain Hero — Interactive 3D keychains
   Three.js + cannon-es rigid body physics
   Drag, toss, and watch them swing
   ============================================ */
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

const TAGS = [
  { text: 'UX',            color: '#ffe430' },
  { text: 'Product',       color: '#f0ece6' },
  { text: 'AI',            color: '#ffe430' },
  { text: 'Art',           color: '#888' },
  { text: 'Wearables',     color: '#f0ece6' },
  { text: 'Creative Tech', color: '#888' },
  { text: 'Fintech',       color: '#ffe430' },
  { text: 'Interactive',   color: '#f0ece6' },
];

/* --- roundRect polyfill --- */
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (typeof r === 'number') r = [r, r, r, r];
    const [tl, tr, br, bl] = r;
    this.moveTo(x + tl, y);
    this.lineTo(x + w - tr, y);
    this.quadraticCurveTo(x + w, y, x + w, y + tr);
    this.lineTo(x + w, y + h - br);
    this.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    this.lineTo(x + bl, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - bl);
    this.lineTo(x, y + tl);
    this.quadraticCurveTo(x, y, x + tl, y);
    this.closePath();
    return this;
  };
}

/* --- Canvas texture for tag face --- */
function createTagTexture(text, color) {
  const dpr = Math.min(window.devicePixelRatio, 2);
  const w = 320 * dpr;
  const h = 140 * dpr;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const s = dpr;

  ctx.clearRect(0, 0, w, h);

  // Rounded rect background
  const pad = 6 * s;
  const rad = 22 * s;
  ctx.beginPath();
  ctx.roundRect(pad, pad, w - pad * 2, h - pad * 2, rad);

  ctx.fillStyle = color;
  ctx.fill();

  // Glossy highlight
  const grd = ctx.createLinearGradient(0, pad, 0, h * 0.5);
  grd.addColorStop(0, 'rgba(255,255,255,0.25)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grd;
  ctx.fill();

  // Subtle inner shadow
  const grd2 = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
  grd2.addColorStop(0, 'rgba(255,255,255,0.08)');
  grd2.addColorStop(1, 'rgba(0,0,0,0.12)');
  ctx.fillStyle = grd2;
  ctx.fill();

  // Border
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2 * s;
  ctx.stroke();

  // Keyhole at top
  ctx.beginPath();
  ctx.arc(w / 2, 24 * s, 7 * s, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 2.5 * s;
  ctx.stroke();

  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = `800 ${28 * s}px Inter, system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 6 * s;
  ctx.fillText(text, w / 2, h / 2 + 10 * s);

  return canvas;
}

/* --- Rounded rect shape for extrusion --- */
function roundedRectShape(w, h, r) {
  const shape = new THREE.Shape();
  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);
  return shape;
}

class KeychainHero {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.tagData = [];
    this.mouse = new THREE.Vector2(9999, 9999);
    this.raycaster = new THREE.Raycaster();
    this.isDragging = false;
    this.draggedTag = null;
    this.dragConstraint = null;
    this.jointBody = null;
    this.clock = new THREE.Clock();

    this.init();
    this.initPhysics();
    this.createRing();
    this.createTags();
    this.addEvents();
    this.animate();
  }

  /* ---- Renderer + Scene + Lights ---- */
  init() {
    this.scene = new THREE.Scene();

    const w = this.container.clientWidth;
    const h = this.container.clientHeight;

    this.camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100);
    this.camera.position.set(0, 1.0, 14);

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // Lighting
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(5, 8, 6);
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0xffeedd, 0.3);
    fill.position.set(-4, 2, -3);
    this.scene.add(fill);

    const rim = new THREE.PointLight(0xffe430, 0.35, 25);
    rim.position.set(0, -4, 6);
    this.scene.add(rim);
  }

  /* ---- cannon-es Physics World ---- */
  initPhysics() {
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -12, 0),
    });
    this.world.solver.iterations = 15;
    this.world.solver.tolerance = 0.0001;

    // Contact material — slight bounce, low friction
    const defaultMat = new CANNON.Material('default');
    this.world.defaultContactMaterial = new CANNON.ContactMaterial(
      defaultMat, defaultMat,
      { friction: 0.2, restitution: 0.25 }
    );
    this.world.defaultMaterial = defaultMat;

    // Invisible body that follows the mouse for dragging
    this.jointBody = new CANNON.Body({ mass: 0 });
    this.jointBody.collisionFilterGroup = 0;
    this.jointBody.collisionFilterMask = 0;
    this.world.addBody(this.jointBody);
  }

  /* ---- Metallic Ring ---- */
  createRing() {
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc8c8c8,
      metalness: 0.95,
      roughness: 0.06,
    });

    // Main ring
    const ringGeo = new THREE.TorusGeometry(2.2, 0.065, 24, 128);
    this.ring = new THREE.Mesh(ringGeo, ringMat);
    this.ring.position.y = 3.6;
    this.ring.rotation.x = Math.PI * 0.5;
    this.scene.add(this.ring);

    // Clasp
    const claspGeo = new THREE.TorusGeometry(0.32, 0.05, 16, 32);
    const clasp = new THREE.Mesh(claspGeo, ringMat);
    clasp.position.set(0, 5.8, 0);
    clasp.rotation.x = Math.PI * 0.5;
    this.scene.add(clasp);
  }

  /* ---- Create Tags with Physics Bodies ---- */
  createTags() {
    const ringRadius = 2.2;
    const ringY = 3.6;
    const chainLen = 1.8;

    TAGS.forEach((tag, i) => {
      // Canvas texture
      const canvas = createTagTexture(tag.text, tag.color);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      // Tag dimensions
      const aspect = canvas.width / canvas.height;
      const tagH = 0.7;
      const tagW = tagH * aspect;
      const tagD = 0.08;

      // 3D mesh
      const shape = roundedRectShape(tagW / 2, tagH / 2, 0.1);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: tagD,
        bevelEnabled: true,
        bevelThickness: 0.018,
        bevelSize: 0.018,
        bevelSegments: 3,
      });
      geo.translate(0, 0, -tagD / 2);

      const frontMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.28,
        metalness: 0.05,
        transparent: true,
      });
      const sideMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(tag.color),
        roughness: 0.22,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(geo, [frontMat, sideMat]);
      this.scene.add(mesh);

      // Attachment point on ring (spread along bottom arc)
      const spread = ((i - (TAGS.length - 1) / 2) / (TAGS.length - 1)) * Math.PI * 0.95;
      const anchorX = Math.sin(spread) * ringRadius;
      const anchorY = ringY;

      // Physics body
      const body = new CANNON.Body({
        mass: 1.2,
        position: new CANNON.Vec3(
          anchorX + (Math.random() - 0.5) * 0.3,
          anchorY - chainLen - tagH * 0.5,
          (Math.random() - 0.5) * 0.5
        ),
        shape: new CANNON.Box(new CANNON.Vec3(tagW / 2, tagH / 2, tagD / 2 + 0.02)),
        linearDamping: 0.35,
        angularDamping: 0.55,
      });
      // Give each tag a small initial nudge for a natural start
      body.velocity.set(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 2
      );
      this.world.addBody(body);

      // Anchor (static body fixed at ring)
      const anchor = new CANNON.Body({ mass: 0 });
      anchor.position.set(anchorX, anchorY, 0);
      anchor.collisionFilterGroup = 0;
      anchor.collisionFilterMask = 0;
      this.world.addBody(anchor);

      // Distance constraint = chain
      const constraint = new CANNON.DistanceConstraint(
        anchor, body, chainLen, 1e4
      );
      this.world.addConstraint(constraint);

      // Chain visual line
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xb0b0b0,
        transparent: true,
        opacity: 0.55,
      });
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const chainLine = new THREE.Line(lineGeo, lineMat);
      this.scene.add(chainLine);

      this.tagData.push({
        mesh,
        body,
        anchor,
        chainLine,
        anchorX,
        anchorY,
        tagW,
        tagH,
      });
    });
  }

  /* ---- Mouse / Touch Events ---- */
  addEvents() {
    const canvas = this.renderer.domElement;

    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // --- Mouse ---
    canvas.addEventListener('mousemove', (e) => {
      getMousePos(e);
      if (this.isDragging) this.moveDragTarget();
    });

    canvas.addEventListener('mousedown', (e) => {
      getMousePos(e);
      this.tryGrab();
    });

    canvas.addEventListener('mouseup', () => this.releaseDrag());
    canvas.addEventListener('mouseleave', () => this.releaseDrag());

    // --- Touch ---
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      getMousePos(t);
      this.tryGrab();
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      getMousePos(t);
      if (this.isDragging) this.moveDragTarget();
    }, { passive: false });

    canvas.addEventListener('touchend', () => this.releaseDrag());

    // --- Resize + Scroll ---
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('scroll', () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      this.container.style.opacity = String(1 - progress * 1.3);
    }, { passive: true });
  }

  /* ---- Drag Logic ---- */
  tryGrab() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.tagData.map(t => t.mesh);
    const hits = this.raycaster.intersectObjects(meshes, true);

    if (hits.length > 0) {
      const hitObj = hits[0].object;
      const idx = this.tagData.findIndex(t => t.mesh === hitObj);
      if (idx < 0) return;

      this.isDragging = true;
      this.draggedTag = this.tagData[idx];

      // Position joint body at hit point
      const p = hits[0].point;
      this.jointBody.position.set(p.x, p.y, p.z);

      // Create point-to-point constraint between tag body and joint
      const localPivot = new CANNON.Vec3(0, 0, 0);
      this.dragConstraint = new CANNON.PointToPointConstraint(
        this.draggedTag.body, localPivot,
        this.jointBody, new CANNON.Vec3(0, 0, 0),
        8 // force magnitude
      );
      this.world.addConstraint(this.dragConstraint);
    }
  }

  moveDragTarget() {
    if (!this.draggedTag || !this.dragConstraint) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Project mouse ray onto a plane at the tag's z-depth
    const tagZ = this.draggedTag.body.position.z;
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -tagZ);
    const target = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(plane, target);

    if (target) {
      this.jointBody.position.set(target.x, target.y, target.z);
    }
  }

  releaseDrag() {
    if (this.dragConstraint) {
      this.world.removeConstraint(this.dragConstraint);
      this.dragConstraint = null;
    }
    this.isDragging = false;
    this.draggedTag = null;
  }

  /* ---- Resize ---- */
  resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w === 0 || h === 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  /* ---- Animation Loop ---- */
  animate() {
    requestAnimationFrame(() => this.animate());

    const dt = Math.min(this.clock.getDelta(), 1 / 30);
    const t = this.clock.elapsedTime;

    // Step physics
    this.world.step(1 / 60, dt, 3);

    // Sync meshes with physics bodies
    this.tagData.forEach(tag => {
      tag.mesh.position.copy(tag.body.position);
      tag.mesh.quaternion.copy(tag.body.quaternion);

      // Update chain line
      const pos = tag.chainLine.geometry.attributes.position;
      pos.setXYZ(0, tag.anchorX, tag.anchorY, 0);
      pos.setXYZ(1, tag.body.position.x, tag.body.position.y + tag.tagH * 0.35, tag.body.position.z);
      pos.needsUpdate = true;
    });

    // Subtle ambient breeze — small force on all tags
    if (!this.isDragging) {
      const breezeX = Math.sin(t * 0.4) * 0.15;
      const breezeZ = Math.cos(t * 0.35) * 0.08;
      this.tagData.forEach(tag => {
        tag.body.applyForce(new CANNON.Vec3(breezeX, 0, breezeZ));
      });
    }

    // Subtle ring sway
    if (this.ring) {
      this.ring.rotation.z = Math.sin(t * 0.25) * 0.012;
    }

    // Camera breathing
    this.camera.position.y = 1.0 + Math.sin(t * 0.3) * 0.08;

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
  }
}

// Init
const el = document.getElementById('hero-keychain');
if (el) new KeychainHero('hero-keychain');
