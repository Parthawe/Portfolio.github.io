import { useEffect } from 'react';

const INTERACTIVE = 'a, button, .pcard, input, textarea, select, [role="button"]';
const CTA_SELECTOR = '.cta-v2-btn, .wr-arrow-btn, .hp-hero-link, .magnetic';
const VIEW_SELECTOR = '.pcard, .wr-card-img-hero, .featured-work-card';

// Iridescent sparkle colors
const SPARKLE_COLORS = [
  '#E85D26', '#D04080', '#6050C8', '#3080D0', '#30B8A0', '#E0A030',
  '#FF6B9D', '#7B68EE', '#00CED1', '#FFD700',
];

export function useCursorFollower() {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || isMobile || prefersReduced) return;

    // Clean up
    document.querySelectorAll('.cursor-dot, .cursor-trail, .cursor-sparkle').forEach(el => el.remove());

    // Comet head
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let lastSparkleX = 0, lastSparkleY = 0;
    let rafId: number;
    let visible = true;

    // Sparkle pool — reuse DOM elements for performance
    const POOL_SIZE = 30;
    const sparklePool: HTMLDivElement[] = [];
    let poolIdx = 0;

    for (let i = 0; i < POOL_SIZE; i++) {
      const s = document.createElement('div');
      s.className = 'cursor-sparkle';
      s.setAttribute('aria-hidden', 'true');
      s.style.display = 'none';
      document.body.appendChild(s);
      sparklePool.push(s);
    }

    const emitSparkle = (x: number, y: number) => {
      const s = sparklePool[poolIdx % POOL_SIZE];
      poolIdx++;

      const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
      const size = 3 + Math.random() * 4; // 3-7px
      const offsetX = (Math.random() - 0.5) * 12;
      const offsetY = (Math.random() - 0.5) * 12;
      const duration = 600 + Math.random() * 400; // 600-1000ms

      s.style.display = '';
      s.style.left = `${x + offsetX}px`;
      s.style.top = `${y + offsetY}px`;
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.backgroundColor = color;
      s.style.opacity = '0.8';
      s.style.transform = 'scale(1)';
      s.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;

      // Trigger reflow then animate out
      void s.offsetWidth;
      s.style.opacity = '0';
      s.style.transform = `scale(0) translateY(${-8 - Math.random() * 16}px)`;

      setTimeout(() => { s.style.display = 'none'; }, duration);
    };

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
      }
      setCursorState(resolveState(document.elementFromPoint(mouseX, mouseY)));
    };

    const onMouseLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      setCursorState('default');
    };

    const loop = () => {
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      // Emit sparkles when cursor moves enough distance
      const dx = dotX - lastSparkleX;
      const dy = dotY - lastSparkleY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 6 && visible) {
        emitSparkle(dotX, dotY);
        lastSparkleX = dotX;
        lastSparkleY = dotY;
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
      sparklePool.forEach(s => s.remove());
    };
  }, []);
}
