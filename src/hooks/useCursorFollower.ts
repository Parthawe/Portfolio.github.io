import { useEffect } from 'react';

const INTERACTIVE = 'a, button, .pcard, input, textarea, select, [role="button"]';
const CTA_SELECTOR = '.cta-v2-btn, .wr-arrow-btn, .hp-hero-link, .magnetic';
const VIEW_SELECTOR = '.pcard, .wr-card-img-hero, .featured-work-card';

const TAIL_LENGTH = 16;
const NUM_STREAMS = 5; // parallel color streams in the tail
const SPARK_COLORS = ['#fff', '#e0eaff', '#b0c8ff', '#c8a0ff', '#ffa0c8', '#80d0ff', '#ffe0a0', '#a0ffdd'];

// Each stream has its own color, offset, width, and opacity profile
const STREAMS = [
  { hueStart: 210, hueEnd: 240, lightness: 90, saturation: 90, maxWidth: 2.5, alpha: 0.7, offset: 0 },       // bright blue-white core
  { hueStart: 220, hueEnd: 260, lightness: 75, saturation: 85, maxWidth: 4, alpha: 0.45, offset: 3 },         // blue mid
  { hueStart: 250, hueEnd: 300, lightness: 70, saturation: 80, maxWidth: 3.5, alpha: 0.35, offset: -3.5 },    // purple
  { hueStart: 280, hueEnd: 330, lightness: 72, saturation: 70, maxWidth: 2.5, alpha: 0.25, offset: 5.5 },     // pink outer
  { hueStart: 190, hueEnd: 230, lightness: 65, saturation: 60, maxWidth: 2, alpha: 0.2, offset: -5 },         // teal outer
];

export function useCursorFollower(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || isMobile || prefersReduced) return;

    document.querySelectorAll('.cursor-dot, .cursor-comet').forEach(el => el.remove());

    const canvas = document.createElement('canvas');
    canvas.className = 'cursor-comet';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    const ctx = canvas.getContext('2d')!;
    let mouseX = -100, mouseY = -100;
    let dotX = -100, dotY = -100;
    let prevDotX = -100, prevDotY = -100;
    let rafId: number;
    let visible = false;
    let initialized = false;

    const trail: { x: number; y: number }[] = [];
    for (let i = 0; i < TAIL_LENGTH; i++) trail.push({ x: -100, y: -100 });

    const sparks: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string; twinkle: number }[] = [];

    let cw = 0, ch = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = cw + 'px';
      canvas.style.height = ch + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let cursorState: 'default' | 'view' | 'cta' | 'hover' = 'default';
    const resolveState = (el: Element | null): typeof cursorState => {
      if (!el) return 'default';
      if (el.closest(VIEW_SELECTOR)) return 'view';
      if (el.closest(CTA_SELECTOR)) return 'cta';
      if (el.closest(INTERACTIVE)) return 'hover';
      return 'default';
    };
    const setCursorState = (state: typeof cursorState) => {
      if (state === cursorState) return;
      if (cursorState !== 'default') dot.classList.remove(cursorState);
      if (state !== 'default') dot.classList.add(state);
      cursorState = state;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!initialized) {
        initialized = true;
        dotX = mouseX; dotY = mouseY;
        prevDotX = mouseX; prevDotY = mouseY;
        for (const p of trail) { p.x = mouseX; p.y = mouseY; }
      }
      if (!visible) { visible = true; dot.style.opacity = '1'; }
      setCursorState(resolveState(document.elementFromPoint(mouseX, mouseY)));
    };

    const onMouseLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      setCursorState('default');
    };

    let frameCount = 0;
    let tailOpacity = 0; // smooth fade for tail visibility

    const loop = () => {
      prevDotX = dotX; prevDotY = dotY;
      dotX += (mouseX - dotX) * 0.28;
      dotY += (mouseY - dotY) * 0.28;
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      // Trail — main spine
      trail[0].x += (dotX - trail[0].x) * 0.5;
      trail[0].y += (dotY - trail[0].y) * 0.5;
      for (let i = 1; i < TAIL_LENGTH; i++) {
        const ease = 0.38 - (i / TAIL_LENGTH) * 0.18;
        trail[i].x += (trail[i - 1].x - trail[i].x) * ease;
        trail[i].y += (trail[i - 1].y - trail[i].y) * ease;
      }

      const speed = Math.sqrt((dotX - prevDotX) ** 2 + (dotY - prevDotY) ** 2);

      // Smooth tail opacity — ramp up when moving, fade out gently when stopped
      const targetOpacity = speed > 0.5 ? 1 : 0;
      const fadeSpeed = targetOpacity > tailOpacity ? 0.15 : 0.03; // fast in, slow out
      tailOpacity += (targetOpacity - tailOpacity) * fadeSpeed;

      // Emit sparks — more sparkly, scattered wider
      frameCount++;
      if (visible && speed > 1.5 && frameCount % 2 === 0) {
        const angle = Math.atan2(dotY - prevDotY, dotX - prevDotX);
        const count = Math.min(4, Math.floor(speed / 3));
        for (let s = 0; s < count; s++) {
          const spread = (Math.random() - 0.5) * 3;
          const backAngle = angle + Math.PI + spread;
          const vel = 0.4 + Math.random() * 2;
          // Some sparks emit from along the tail, not just the head
          const tailIdx = Math.floor(Math.random() * Math.min(6, TAIL_LENGTH));
          const emitX = tailIdx === 0 ? dotX : trail[tailIdx].x;
          const emitY = tailIdx === 0 ? dotY : trail[tailIdx].y;
          sparks.push({
            x: emitX + (Math.random() - 0.5) * 10,
            y: emitY + (Math.random() - 0.5) * 10,
            vx: Math.cos(backAngle) * vel + (Math.random() - 0.5) * 0.5,
            vy: Math.sin(backAngle) * vel - 0.2 - Math.random() * 0.3,
            life: 0,
            maxLife: 18 + Math.random() * 30,
            size: 0.8 + Math.random() * 2.5,
            color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
            twinkle: Math.random() * Math.PI * 2, // phase offset for twinkling
          });
        }
      }

      // Update + cull sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.97;
        sp.vy *= 0.97;
        sp.life++;
        if (sp.life > sp.maxLife) sparks.splice(i, 1);
      }
      if (sparks.length > 120) sparks.splice(0, sparks.length - 120);

      // ── Draw ──
      ctx.clearRect(0, 0, cw, ch);
      if (!visible || !initialized) { rafId = requestAnimationFrame(loop); return; }

      if (tailOpacity > 0.005) {
        // Compute perpendicular direction at each trail point for stream offsets
        const perps: { nx: number; ny: number }[] = [];
        for (let i = 0; i < TAIL_LENGTH; i++) {
          let dx: number, dy: number;
          if (i === 0) {
            dx = dotX - trail[0].x; dy = dotY - trail[0].y;
          } else {
            dx = trail[i - 1].x - trail[i].x; dy = trail[i - 1].y - trail[i].y;
          }
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          perps.push({ nx: -dy / len, ny: dx / len });
        }

        // Draw each stream as a separate flowing line
        for (let s = 0; s < NUM_STREAMS; s++) {
          const stream = STREAMS[s];
          ctx.beginPath();
          for (let i = 0; i < TAIL_LENGTH - 1; i++) {
            const t = i / (TAIL_LENGTH - 1);
            // Offset perpendicular to trail direction, tapering toward tip
            const offset = stream.offset * (1 - t * 0.7);
            const x1 = trail[i].x + perps[i].nx * offset;
            const y1 = trail[i].y + perps[i].ny * offset;
            const x2 = trail[i + 1].x + perps[i + 1].nx * offset * (1 - 1 / (TAIL_LENGTH - 1));
            const y2 = trail[i + 1].y + perps[i + 1].ny * offset * (1 - 1 / (TAIL_LENGTH - 1));

            const lineWidth = stream.maxWidth * (1 - t * 0.8);
            const alpha = stream.alpha * (1 - t * t);
            const hue = stream.hueStart + t * (stream.hueEnd - stream.hueStart);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `hsla(${hue}, ${stream.saturation}%, ${stream.lightness - t * 25}%, ${alpha * tailOpacity})`;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.stroke();
          }
        }

        // Soft glow line behind the core — wide, very low alpha
        ctx.beginPath();
        for (let i = 0; i < TAIL_LENGTH; i++) {
          if (i === 0) ctx.moveTo(trail[i].x, trail[i].y);
          else ctx.lineTo(trail[i].x, trail[i].y);
        }
        ctx.strokeStyle = `rgba(140, 180, 255, ${0.08 * tailOpacity})`;
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Sparks — twinkling glitter scattered around the tail
      for (const sp of sparks) {
        const t = sp.life / sp.maxLife;
        // Twinkle: oscillate opacity for star-like effect
        const twinkle = 0.6 + 0.4 * Math.sin(sp.twinkle + sp.life * 0.4);
        const alpha = (1 - t) * 0.85 * twinkle;
        const size = sp.size * (1 - t * 0.5);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = sp.color;

        // Draw as 4-point star for larger sparks, circle for small
        if (size > 1.2) {
          // Star shape
          const r = size;
          const ri = r * 0.35; // inner radius
          ctx.beginPath();
          for (let p = 0; p < 4; p++) {
            const a = (p * Math.PI) / 2 - Math.PI / 4;
            ctx.lineTo(sp.x + Math.cos(a) * r, sp.y + Math.sin(a) * r);
            const a2 = a + Math.PI / 4;
            ctx.lineTo(sp.x + Math.cos(a2) * ri, sp.y + Math.sin(a2) * ri);
          }
          ctx.closePath();
          ctx.fill();

          // Glow halo
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = alpha * 0.12;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Head glow — intense bright bloom, fades with tail
      if (tailOpacity > 0.005) {
        ctx.globalAlpha = tailOpacity;
        // Outer soft bloom
        const g2 = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 28);
        g2.addColorStop(0, 'rgba(200, 220, 255, 0.5)');
        g2.addColorStop(0.2, 'rgba(160, 195, 255, 0.25)');
        g2.addColorStop(0.5, 'rgba(130, 170, 255, 0.08)');
        g2.addColorStop(1, 'rgba(130, 170, 255, 0)');
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 28, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright white core
        const g1 = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 8);
        g1.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        g1.addColorStop(0.5, 'rgba(220, 235, 255, 0.5)');
        g1.addColorStop(1, 'rgba(180, 210, 255, 0)');
        ctx.fillStyle = g1;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      rafId = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
      dot.remove();
      canvas.remove();
    };
  }, [enabled]);
}
