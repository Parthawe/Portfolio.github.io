import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageLoader from './PageLoader';
import Lightbox from './Lightbox';
import RouteSeo from './RouteSeo';
import { useCursorFollower } from '../hooks/useCursorFollower';
import { useMagnetic } from '../hooks/useMagnetic';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { useDeferredMount } from '../hooks/useDeferredMount';
import { normalizeCopy } from '../utils/normalizeCopy';
import FigmaChrome from './FigmaChrome';
import FigmaGrid from './FigmaGrid';

const HandTracker = lazy(() => import('./HandTracker'));
const PortfolioAgent = lazy(() => import('./agent/PortfolioAgent'));
const CASE_MEDIA_SELECTOR = '.cs-img img, .cs-img-full img, .proj-hero-img img';

function syncCaseStudyMediaState(img: HTMLImageElement) {
  if (!img.matches(CASE_MEDIA_SELECTOR)) return;

  const wrapper = img.closest('.cs-img, .cs-img-full, .proj-hero-img');
  if (!(wrapper instanceof HTMLElement)) return;

  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;
  if (!width || !height) return;

  const ratio = width / height;
  wrapper.classList.remove('is-portrait', 'is-square', 'is-landscape');

  if (ratio < 0.92) {
    wrapper.classList.add('is-portrait');
    return;
  }

  if (ratio < 1.18) {
    wrapper.classList.add('is-square');
    return;
  }

  wrapper.classList.add('is-landscape');
}

export default function RootLayout() {
  const location = useLocation();
  const ioRef = useRef<IntersectionObserver | null>(null);
  const [visible, setVisible] = useState(false);
  const isStudioRoute = location.pathname === '/studio';
  const isUtilityRoute = location.pathname === '/book' || location.pathname === '/graveyard';
  const enablePortfolioInteractions = !isStudioRoute && !isUtilityRoute;
  const enableAgent = enablePortfolioInteractions;
  const enableHandTracker = !isUtilityRoute;
  const enableFigmaChrome = !isUtilityRoute;
  const handTrackerReady = useDeferredMount(enableHandTracker, { timeout: 2400, delayMs: 600 })

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

  useEffect(() => {
    document.body.classList.toggle('figma-chrome-enabled', enableFigmaChrome);
    return () => {
      document.body.classList.remove('figma-chrome-enabled');
    };
  }, [enableFigmaChrome]);

  // Normalize visible copy so long dashes do not leak into the rendered site.
  useEffect(() => {
    const normalizeTextNodes = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT
          if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT
          return /[—–]/.test(node.nodeValue || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
        },
      })

      const nodes: Text[] = []
      let current = walker.nextNode()
      while (current) {
        nodes.push(current as Text)
        current = walker.nextNode()
      }

      nodes.forEach(node => {
        node.nodeValue = normalizeCopy(node.nodeValue || '')
      })
    }

    const timer = window.setTimeout(normalizeTextNodes, 0)
    return () => window.clearTimeout(timer)
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

    const syncExistingMedia = (root: ParentNode) => {
      root.querySelectorAll<HTMLImageElement>(CASE_MEDIA_SELECTOR).forEach((img) => {
        if (img.complete) syncCaseStudyMediaState(img);
      });
    };

    // Initial scan
    observeNew(document);
    syncExistingMedia(document);

    // Watch for any new elements added to the DOM (batched via microtask)
    let pendingNodes: HTMLElement[] = [];
    let flushScheduled = false;
    const flushPending = () => {
      flushScheduled = false;
      const nodes = pendingNodes;
      pendingNodes = [];
      for (const node of nodes) {
        if (node.classList.contains('reveal') || node.classList.contains('reveal-image')) {
          io.observe(node);
        }
        observeNew(node);
        syncExistingMedia(node);
      }
    };
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) pendingNodes.push(node);
        }
      }
      if (pendingNodes.length && !flushScheduled) {
        flushScheduled = true;
        queueMicrotask(flushPending);
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Auto-hide shimmer on case study images when loaded
    const onImgLoad = (e: Event) => {
      const img = e.target as HTMLImageElement;
      if (img.tagName !== 'IMG') return;
      syncCaseStudyMediaState(img);
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
  useCursorFollower(enablePortfolioInteractions);
  useMagnetic(enablePortfolioInteractions);
  useKeyboardNav(enablePortfolioInteractions);

  return (
    <>
      <RouteSeo />
      <div className="grain" aria-hidden="true"></div>
      <div className="dot-bg" aria-hidden="true"></div>
      {enableFigmaChrome && <FigmaGrid />}
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
      {/* AmbientAudio moved to Nav */}
      {enableFigmaChrome && <FigmaChrome />}
      {enableHandTracker && handTrackerReady && (
        <Suspense fallback={null}>
          <HandTracker />
        </Suspense>
      )}
      {enableAgent && (
        <Suspense fallback={null}>
          <PortfolioAgent />
        </Suspense>
      )}
    </>
  );
}
