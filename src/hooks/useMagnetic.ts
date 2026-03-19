import { useEffect } from 'react';

const MAGNETIC_STRENGTH = 0.35;
const MAGNETIC_RADIUS = 80;

export function useMagnetic() {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isTouchDevice || isMobile) return;

    const elements = new Set<HTMLElement>();
    let rafId: number;

    const scan = () => {
      document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
        if (!elements.has(el)) {
          elements.add(el);
          el.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAGNETIC_RADIUS) {
            const pull = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
            el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
          } else {
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
  }, []);
}
