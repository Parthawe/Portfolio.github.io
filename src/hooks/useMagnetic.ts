import { useEffect } from 'react';

const MAGNETIC_STRENGTH = 0.35;
const MAGNETIC_RADIUS = 80;

export function useMagnetic(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isTouchDevice || isMobile) return;

    const elements = new Set<HTMLElement>();
    let rafId: number;

    const scan = () => {
      // Remove stale elements no longer in the DOM
      elements.forEach((el) => {
        if (!el.isConnected) elements.delete(el);
      });
      document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
        if (!elements.has(el)) {
          elements.add(el);
          el.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
      });
    };

    // Quick bounding-box test before expensive per-element rects
    const QUICK_MARGIN = MAGNETIC_RADIUS + 200; // generous viewport margin

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const mx = e.clientX;
        const my = e.clientY;
        elements.forEach((el) => {
          if (!el.isConnected) {
            elements.delete(el);
            return;
          }
          const rect = el.getBoundingClientRect();
          // Skip elements clearly out of range (cheap check before sqrt)
          if (
            mx < rect.left - QUICK_MARGIN || mx > rect.right + QUICK_MARGIN ||
            my < rect.top - QUICK_MARGIN || my > rect.bottom + QUICK_MARGIN
          ) {
            if (el.style.transform) el.style.transform = '';
            return;
          }
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = mx - cx;
          const dy = my - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAGNETIC_RADIUS) {
            const pull = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
            el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
          } else if (el.style.transform) {
            el.style.transform = '';
          }
        });
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      mo.disconnect();
    };
  }, [enabled]);
}
