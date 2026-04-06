import { useEffect } from 'react';

const INTERACTIVE = 'a, button, .pcard, input, textarea, select, [role="button"]';
const CTA_SELECTOR = '.cta-v2-btn, .wr-arrow-btn, .hp-hero-link, .magnetic';
const VIEW_SELECTOR = '.pcard, .wr-card-img-hero, .featured-work-card';

// Iridescent comet trail colors (from the Product Design cube palette)
const TRAIL_COLORS = [
  '#E85D26', '#D04080', '#6050C8', '#3080D0', '#30B8A0', '#E0A030',
];

const TRAIL_COUNT = 12; // number of trail particles
const TRAIL_SPACING = 3; // frames between trail updates

export function useCursorFollower() {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || isMobile || prefersReduced) return;

    // Clean up any existing cursor elements
    document.querySelectorAll('.cursor-dot, .cursor-ring, .cursor-trail').forEach(el => el.remove());

    // Create the main dot (comet head)
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    // Create trail particles
    const trails: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const t = document.createElement('div');
      t.className = 'cursor-trail';
      t.setAttribute('aria-hidden', 'true');
      t.style.backgroundColor = TRAIL_COLORS[i % TRAIL_COLORS.length];
      // Size decreases along trail, opacity fades
      const scale = 1 - (i / TRAIL_COUNT) * 0.8;
      const opacity = 0.6 - (i / TRAIL_COUNT) * 0.55;
      t.style.width = `${6 * scale}px`;
      t.style.height = `${6 * scale}px`;
      t.style.opacity = String(opacity);
      document.body.appendChild(t);
      trails.push(t);
    }

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let rafId: number;
    let visible = true;
    let frameCount = 0;

    // Trail position history
    const history: { x: number; y: number }[] = [];
    for (let i = 0; i < TRAIL_COUNT * TRAIL_SPACING; i++) {
      history.push({ x: 0, y: 0 });
    }

    // State
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
        trails.forEach(t => t.style.display = '');
      }
      setCursorState(resolveState(document.elementFromPoint(mouseX, mouseY)));
    };

    const onMouseLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      trails.forEach(t => t.style.display = 'none');
      setCursorState('default');
    };

    const loop = () => {
      // Smooth follow for comet head
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      // Record position history
      frameCount++;
      history.unshift({ x: dotX, y: dotY });
      history.pop();

      // Update trail particles — each one follows a delayed position
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const histIdx = (i + 1) * TRAIL_SPACING;
        const pos = history[Math.min(histIdx, history.length - 1)];
        trails[i].style.transform = `translate(${pos.x}px, ${pos.y}px)`;
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
      dot.remove();
      trails.forEach(t => t.remove());
    };
  }, []);
}
