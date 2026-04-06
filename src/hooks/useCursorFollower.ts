import { useEffect } from 'react';

const INTERACTIVE = 'a, button, .pcard, input, textarea, select, [role="button"]';
const CTA_SELECTOR = '.cta-v2-btn, .wr-arrow-btn, .hp-hero-link, .magnetic';
const VIEW_SELECTOR = '.pcard, .wr-card-img-hero, .featured-work-card';

const TAIL_LENGTH = 12; // shorter tail
const SPARK_COLORS = ['#fff', '#c8d8ff', '#a0b8ff', '#d0a0ff', '#ffa0c0', '#80d0ff', '#ffe080'];

export function useCursorFollower() {
  useEffect(() => {
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

    // Spark particles — lightweight data, no DOM
    const sparks: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string }[] = [];

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

    const loop = () => {
      prevDotX = dotX; prevDotY = dotY;
      dotX += (mouseX - dotX) * 0.28;
      dotY += (mouseY - dotY) * 0.28;
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      // Trail
      trail[0].x += (dotX - trail[0].x) * 0.45;
      trail[0].y += (dotY - trail[0].y) * 0.45;
      for (let i = 1; i < TAIL_LENGTH; i++) {
        const ease = 0.35 - (i / TAIL_LENGTH) * 0.15;
        trail[i].x += (trail[i - 1].x - trail[i].x) * ease;
        trail[i].y += (trail[i - 1].y - trail[i].y) * ease;
      }

      // Speed for spark emission
      const speed = Math.sqrt((dotX - prevDotX) ** 2 + (dotY - prevDotY) ** 2);

      // Emit sparks when moving
      frameCount++;
      if (visible && speed > 2 && frameCount % 2 === 0) {
        // Direction of movement
        const angle = Math.atan2(dotY - prevDotY, dotX - prevDotX);
        // Emit 1-3 sparks per frame depending on speed
        const count = Math.min(3, Math.floor(speed / 4));
        for (let s = 0; s < count; s++) {
          const spread = (Math.random() - 0.5) * 2.5;
          const backAngle = angle + Math.PI + spread; // fly backward from movement direction
          const vel = 0.5 + Math.random() * 1.5;
          sparks.push({
            x: dotX + (Math.random() - 0.5) * 6,
            y: dotY + (Math.random() - 0.5) * 6,
            vx: Math.cos(backAngle) * vel,
            vy: Math.sin(backAngle) * vel - 0.3, // slight upward drift
            life: 0,
            maxLife: 20 + Math.random() * 25,
            size: 1 + Math.random() * 2.5,
            color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
          });
        }
      }

      // Update + cull sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.96;
        sp.vy *= 0.96;
        sp.life++;
        if (sp.life > sp.maxLife) sparks.splice(i, 1);
      }
      // Cap sparks
      if (sparks.length > 80) sparks.splice(0, sparks.length - 80);

      // Draw
      ctx.clearRect(0, 0, cw, ch);
      if (!visible || !initialized) { rafId = requestAnimationFrame(loop); return; }

      const moving = speed > 0.5;

      if (moving) {
        // Tail — flowing gradient line
        for (let i = 0; i < TAIL_LENGTH - 1; i++) {
          const t = i / (TAIL_LENGTH - 1);
          const lineWidth = (1 - t) * 4;
          const alpha = (1 - t * t) * 0.55;
          const hue = 220 + t * 100;
          ctx.beginPath();
          ctx.moveTo(trail[i].x, trail[i].y);
          ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
          ctx.strokeStyle = `hsla(${hue}, 80%, ${80 - t * 30}%, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      // Sparks — glittery dots that fly off the tail
      for (const sp of sparks) {
        const t = sp.life / sp.maxLife;
        const alpha = (1 - t) * 0.9;
        const size = sp.size * (1 - t * 0.6);
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        // Tiny glow
        if (size > 1.5) {
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = alpha * 0.15;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Head glow
      if (moving) {
        const g = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 14);
        g.addColorStop(0, 'rgba(220, 235, 255, 0.35)');
        g.addColorStop(0.4, 'rgba(140, 180, 255, 0.15)');
        g.addColorStop(1, 'rgba(140, 180, 255, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 14, 0, Math.PI * 2);
        ctx.fill();
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
  }, []);
}
