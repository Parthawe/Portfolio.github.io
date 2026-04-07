import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageLoader from './PageLoader';
import Lightbox from './Lightbox';
import { useCursorFollower } from '../hooks/useCursorFollower';
import { useMagnetic } from '../hooks/useMagnetic';
import { useKeyboardNav } from '../hooks/useKeyboardNav';

const HandTracker = lazy(() => import('./HandTracker'));
const PortfolioAgent = lazy(() => import('./agent/PortfolioAgent'));
import FigmaContextMenu from './FigmaContextMenu';
import FigmaHUD from './FigmaHUD';
import FigmaRuler from './FigmaRuler';
import FigmaZoom from './FigmaZoom';

export default function RootLayout() {
  const location = useLocation();
  const ioRef = useRef<IntersectionObserver | null>(null);
  const [visible, setVisible] = useState(false);

  // Fade-in on mount and route change (CSS-driven, replaces Framer Motion)
  useEffect(() => {
    setVisible(false);
    // Trigger reflow so the opacity:0 is painted before transitioning to 1
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, [location.pathname]);

  // Scroll to top on route change (Lenis-aware)
  useEffect(() => {
    const lenis = (window as unknown as Record<string, { scrollTo: (target: number, options?: { immediate?: boolean }) => void }>).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Persistent scroll-reveal observer, mounted once, never torn down between routes
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;

          if (!prefersReduced) {
            const parent = el.parentElement;
            if (parent) {
              const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
              const idx = siblings.indexOf(el);
              if (idx > 0) el.style.transitionDelay = `${idx * 0.08}s`;
            }
          }

          el.classList.add('visible');
          io.unobserve(el);

          if (!prefersReduced) {
            setTimeout(() => { el.style.transitionDelay = ''; }, 900);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
    );
    ioRef.current = io;

    const observeNew = (root: Element | Document) => {
      root.querySelectorAll('.reveal:not(.visible), .reveal-image:not(.visible)').forEach((el) => {
        io.observe(el);
      });
    };

    // Initial scan
    observeNew(document);

    // Watch for any new elements added to the DOM
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.classList.contains('reveal') || node.classList.contains('reveal-image')) {
              io.observe(node);
            }
            observeNew(node);
          }
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Auto-hide shimmer on case study images when loaded
    const onImgLoad = (e: Event) => {
      const img = e.target as HTMLImageElement;
      if (img.tagName !== 'IMG') return;
      const wrapper = img.closest('.cs-img');
      if (wrapper) wrapper.classList.add('loaded');
    };
    document.addEventListener('load', onImgLoad, true); // capture phase

    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('load', onImgLoad, true);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-scan after route change — unobserve stale elements, observe new ones
  const observedRef = useRef(new Set<Element>());

  useEffect(() => {
    const io = ioRef.current;
    if (!io) return;

    // Unobserve elements no longer in the DOM (stale from prev route)
    observedRef.current.forEach(el => {
      if (!el.isConnected) {
        io.unobserve(el);
        observedRef.current.delete(el);
      }
    });

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible), .reveal-image:not(.visible)').forEach((el) => {
        if (!observedRef.current.has(el)) {
          io.observe(el);
          observedRef.current.add(el);
        }
      });
    }, 350);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Custom cursor + magnetic buttons (desktop only)
  useCursorFollower();
  useMagnetic();
  useKeyboardNav();

  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <div className="dot-bg" aria-hidden="true"></div>
      <PageLoader />
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Outlet />
      </div>
      <Lightbox />
      <FigmaContextMenu />
      <FigmaHUD />
      <FigmaRuler />
      <FigmaZoom />
      <Suspense fallback={null}>
        <HandTracker />
      </Suspense>
      <Suspense fallback={null}>
        <PortfolioAgent />
      </Suspense>
    </>
  );
}
