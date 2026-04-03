import { useEffect } from 'react';

const INTERACTIVE = 'a, button, .pcard, input, textarea, select, [role="button"]';
const CTA_SELECTOR = '.cta-v2-btn, .wr-arrow-btn, .hp-hero-link, .magnetic';
const VIEW_SELECTOR = '.pcard, .wr-card-img-hero, .featured-work-card';

export function useCursorFollower() {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || isMobile || prefersReduced) return;

    // Prevent duplicate cursor elements from StrictMode double-mount
    document.querySelectorAll('.cursor-dot, .cursor-ring').forEach(el => el.remove());

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;
    let visible = true;

    // State machine, single source of truth, prevents flicker
    let cursorState: 'default' | 'view' | 'cta' | 'hover' = 'default';

    const resolveState = (el: Element | null): 'default' | 'view' | 'cta' | 'hover' => {
      if (!el) return 'default';
      if (el.closest(VIEW_SELECTOR)) return 'view';
      if (el.closest(CTA_SELECTOR)) return 'cta';
      if (el.closest(INTERACTIVE)) return 'hover';
      return 'default';
    };

    const setCursorState = (state: 'default' | 'view' | 'cta' | 'hover') => {
      if (state === cursorState) return;
      if (cursorState !== 'default') {
        dot.classList.remove(cursorState);
        ring.classList.remove(cursorState);
      }
      if (state !== 'default') {
        dot.classList.add(state);
        ring.classList.add(state);
      }
      cursorState = state;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      setCursorState(resolveState(document.elementFromPoint(mouseX, mouseY)));
    };

    const onMouseLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      setCursorState('default');
    };

    const loop = () => {
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      ringX += (mouseX - ringX) * 0.08;
      ringY += (mouseY - ringY) * 0.08;
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      rafId = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      dot.remove();
      ring.remove();
    };
  }, []);
}
