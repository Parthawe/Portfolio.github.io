import { useEffect } from 'react';

const INTERACTIVE = 'a, button, .pcard, input, textarea, select, [role="button"]';
const CTA_SELECTOR = '.cta-v2-btn, .wr-arrow-btn, .hp-hero-link, .magnetic';
const VIEW_SELECTOR = '.pcard, .wr-card-img-hero, .featured-work-card';

// Comet trail — continuous flowing tail, not discrete particles
const TAIL_LENGTH = 20; // number of trail segments
const TAIL_LERP = 0.35; // how fast each segment follows the previous

export function useCursorFollower() {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || isMobile || prefersReduced) return;

    // Clean up
    document.querySelectorAll('.cursor-dot, .cursor-sparkle, .cursor-trail, .cursor-comet').forEach(el => el.remove());

    // Canvas for the comet trail — smooth, anti-aliased, no DOM overhead
    const canvas = document.createElement('canvas');
    canvas.className = 'cursor-comet';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9998;';
    document.body.appendChild(canvas);

    // Comet head dot
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    const ctx = canvas.getContext('2d')!;
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let rafId: number;
    let visible = true;

    // Trail positions — each point lerps toward the one ahead
    const trail: { x: number; y: number }[] = [];
    for (let i = 0; i < TAIL_LENGTH; i++) trail.push({ x: 0, y: 0 });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // State
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
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        canvas.style.opacity = '1';
      }
      setCursorState(resolveState(document.elementFromPoint(mouseX, mouseY)));
    };

    const onMouseLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      canvas.style.opacity = '0';
      setCursorState('default');
    };

    const loop = () => {
      // Head follows cursor
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      // Update trail — each segment chases the one ahead
      trail[0].x += (dotX - trail[0].x) * TAIL_LERP;
      trail[0].y += (dotY - trail[0].y) * TAIL_LERP;
      for (let i = 1; i < TAIL_LENGTH; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * (TAIL_LERP * 0.85);
        trail[i].y += (trail[i - 1].y - trail[i].y) * (TAIL_LERP * 0.85);
      }

      // Check if moving (trail should only show when there's motion)
      const dx = dotX - trail[TAIL_LENGTH - 1].x;
      const dy = dotY - trail[TAIL_LENGTH - 1].y;
      const moving = Math.sqrt(dx * dx + dy * dy) > 1;

      // Draw comet trail on canvas
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

      if (visible && moving) {
        // Draw the flowing tail — gradient from bright head to transparent tail
        for (let i = 0; i < TAIL_LENGTH - 1; i++) {
          const t = i / TAIL_LENGTH; // 0 = near head, 1 = tail end
          const nextT = (i + 1) / TAIL_LENGTH;

          // Width narrows along the tail
          const width = (1 - t) * 4;

          // Color shifts: white/blue at head → purple → pink → transparent at tail
          const alpha = (1 - t) * 0.6;
          // Hue shift: 220 (blue) at head → 280 (purple) → 320 (pink) at tail
          const hue = 220 + t * 100;
          const sat = 80 + t * 20;
          const light = 80 - t * 30;

          ctx.beginPath();
          ctx.moveTo(trail[i].x, trail[i].y);
          ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
          ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
          ctx.lineWidth = width;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Glow around the head
        const grd = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 12);
        grd.addColorStop(0, 'rgba(200, 220, 255, 0.3)');
        grd.addColorStop(0.5, 'rgba(100, 140, 255, 0.1)');
        grd.addColorStop(1, 'rgba(100, 140, 255, 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 12, 0, Math.PI * 2);
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
