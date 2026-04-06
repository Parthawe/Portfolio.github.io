import { useEffect } from 'react';

const INTERACTIVE = 'a, button, .pcard, input, textarea, select, [role="button"]';
const CTA_SELECTOR = '.cta-v2-btn, .wr-arrow-btn, .hp-hero-link, .magnetic';
const VIEW_SELECTOR = '.pcard, .wr-card-img-hero, .featured-work-card';

const TAIL_LENGTH = 24;

export function useCursorFollower() {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || isMobile || prefersReduced) return;

    document.querySelectorAll('.cursor-dot, .cursor-comet').forEach(el => el.remove());

    // Full-viewport canvas for the tail
    const canvas = document.createElement('canvas');
    canvas.className = 'cursor-comet';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    // Head dot
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    const ctx = canvas.getContext('2d')!;
    let mouseX = -100, mouseY = -100;
    let dotX = -100, dotY = -100;
    let rafId: number;
    let visible = false;
    let initialized = false;

    // Trail points
    const trail: { x: number; y: number }[] = [];
    for (let i = 0; i < TAIL_LENGTH; i++) trail.push({ x: -100, y: -100 });

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
        // Snap everything to first mouse position
        initialized = true;
        dotX = mouseX; dotY = mouseY;
        for (const p of trail) { p.x = mouseX; p.y = mouseY; }
      }
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
      }
      setCursorState(resolveState(document.elementFromPoint(mouseX, mouseY)));
    };

    const onMouseLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      setCursorState('default');
    };

    const loop = () => {
      // Head
      dotX += (mouseX - dotX) * 0.28;
      dotY += (mouseY - dotY) * 0.28;
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      // Trail — each segment lerps toward the previous
      trail[0].x += (dotX - trail[0].x) * 0.4;
      trail[0].y += (dotY - trail[0].y) * 0.4;
      for (let i = 1; i < TAIL_LENGTH; i++) {
        const ease = 0.3 - (i / TAIL_LENGTH) * 0.15;
        trail[i].x += (trail[i - 1].x - trail[i].x) * ease;
        trail[i].y += (trail[i - 1].y - trail[i].y) * ease;
      }

      // Draw
      ctx.clearRect(0, 0, cw, ch);

      if (!visible || !initialized) { rafId = requestAnimationFrame(loop); return; }

      // Check motion
      const tdx = dotX - trail[TAIL_LENGTH - 1].x;
      const tdy = dotY - trail[TAIL_LENGTH - 1].y;
      if (Math.abs(tdx) < 0.5 && Math.abs(tdy) < 0.5) { rafId = requestAnimationFrame(loop); return; }

      // Draw comet tail as a series of connected line segments
      for (let i = 0; i < TAIL_LENGTH - 1; i++) {
        const t = i / (TAIL_LENGTH - 1); // 0=head, 1=tail

        const lineWidth = (1 - t) * 6 + 0.5;
        const alpha = (1 - t * t) * 0.7; // quadratic fade — stays bright longer near head

        // Color: white-blue at head → blue → purple → pink at tail
        const hue = 220 + t * 110;
        const sat = 70 + t * 30;
        const light = 85 - t * 35;

        ctx.beginPath();
        ctx.moveTo(trail[i].x, trail[i].y);
        ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
        ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Head glow
      const g = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 18);
      g.addColorStop(0, 'rgba(220, 235, 255, 0.4)');
      g.addColorStop(0.3, 'rgba(140, 180, 255, 0.2)');
      g.addColorStop(1, 'rgba(140, 180, 255, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 18, 0, Math.PI * 2);
      ctx.fill();

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
