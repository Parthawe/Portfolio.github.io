import { useRef, useEffect, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavScroll } from '../hooks/useNavScroll';
import ThemeToggle from './ThemeToggle';
import FigmaSelect from './FigmaSelect';
import AmbientAudio from './AmbientAudio';
import { CONTACT_EMAIL } from '../config/site';
import { setCanvasChromePreference } from '../utils/performance';
import { lockBodyScroll, unlockBodyScroll } from '../utils/bodyScrollLock';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<Element | null>(null);
  const { pathname, search } = useLocation();

  useNavScroll(navRef);

  const isOpenRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [gridOn, setGridOn] = useState(false);
  const [rulersOn, setRulersOn] = useState(true);
  const [interactOn, setInteractOn] = useState(false);

  const closeMenu = useCallback(() => {
    if (!isOpenRef.current) return;
    isOpenRef.current = false;
    setMenuOpen(false);
    overlayRef.current?.classList.remove('open');
    toggleRef.current?.classList.remove('open');
    unlockBodyScroll('nav-menu');
    if (lastFocusedRef.current instanceof HTMLElement) {
      lastFocusedRef.current.focus();
      lastFocusedRef.current = null;
    }
  }, []);

  const toggleMenu = useCallback(() => {
    if (isOpenRef.current) {
      closeMenu();
    } else {
      isOpenRef.current = true;
      setMenuOpen(true);
      lastFocusedRef.current = document.activeElement;
      overlayRef.current?.classList.add('open');
      toggleRef.current?.classList.add('open');
      lockBodyScroll('nav-menu');
      const firstLink = overlayRef.current?.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  }, [closeMenu]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpenRef.current) {
        closeMenu();
        return;
      }
      if (e.key === 'Tab' && isOpenRef.current && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>('a, button');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      unlockBodyScroll('nav-menu');
    };
  }, [closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const navContrastClass = 'nav-on-dark';
    document.body.classList.remove(navContrastClass);

    const darkZones = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-contrast="dark"]'));
    if (!darkZones.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const hasDarkZone = entries.some((entry) => entry.isIntersecting);
        document.body.classList.toggle(navContrastClass, hasDarkZone);
      },
      { rootMargin: '-1px 0px -82% 0px', threshold: 0 }
    );

    darkZones.forEach((zone) => observer.observe(zone));

    return () => {
      observer.disconnect();
      document.body.classList.remove(navContrastClass);
    };
  }, [pathname]);

  useEffect(() => {
    const syncChromeState = () => {
      setGridOn(document.body.classList.contains('figma-grid-on'));
      setRulersOn(!document.body.classList.contains('figma-rulers-off'));
      setInteractOn(document.body.classList.contains('site-tools-open'));
    };

    syncChromeState();

    const observer = new MutationObserver(syncChromeState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onSiteToolsState = (event: Event) => {
      const detail = (event as CustomEvent<{ open?: boolean }>).detail;
      setInteractOn(Boolean(detail?.open));
    };

    window.addEventListener('site-tools:state', onSiteToolsState);
    return () => window.removeEventListener('site-tools:state', onSiteToolsState);
  }, []);

  const toggleGrid = useCallback(() => {
    const enabled = document.body.classList.toggle('figma-grid-on');
    if (enabled) setCanvasChromePreference(true);
    if (!enabled && document.body.classList.contains('figma-rulers-off')) setCanvasChromePreference(false);
  }, []);

  const toggleRulers = useCallback(() => {
    const rulersOff = document.body.classList.toggle('figma-rulers-off');
    setCanvasChromePreference(!rulersOff || document.body.classList.contains('figma-grid-on'));
  }, []);

  const toggleInteractTools = useCallback(() => {
    setCanvasChromePreference(true);
    window.dispatchEvent(new CustomEvent('site-tools:toggle'));
  }, []);

  const preloadInteractTools = useCallback(() => {
    window.dispatchEvent(new CustomEvent('site-tools:preload'));
  }, []);

  const normalizedPathname = pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
  const isHome = normalizedPathname === '/';
  const isAbout = normalizedPathname === '/about';
  const isWriting = normalizedPathname === '/writing' || normalizedPathname.startsWith('/writing/');
  const isWork = normalizedPathname === '/work' || normalizedPathname.startsWith('/work/');
  // Project and category pages also count as "work"
  const isWorkContext = isWork || (!isHome && !isAbout && !isWriting && !['studio', 'book', 'graveyard'].some(r => normalizedPathname === `/${r}`));

  // On the Work page itself, the Work tab expands to show its three views.
  const isWorkPage = normalizedPathname === '/work';
  const requestedWorkView = new URLSearchParams(search).get('view');
  const workView =
    requestedWorkView === 'library' || requestedWorkView === 'index' || requestedWorkView === 'playlist'
      ? 'library'
      : requestedWorkView === 'timeline'
        ? 'timeline'
        : 'editorial';
  const workViewLinks = [
    { key: 'editorial', label: 'Editorial', to: '/work' },
    { key: 'library', label: 'Index', to: '/work?view=library' },
    { key: 'timeline', label: 'Arc', to: '/work?view=timeline' },
  ];

  const handleSkipToContent = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById('main-content');
    if (!main) return;

    event.preventDefault();
    main.tabIndex = -1;
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-to-content" onClick={handleSkipToContent}>Skip to content</a>
      <nav className="nav" id="nav" ref={navRef}>
        <div className="nav-inner">
          {/* Left group, logo + links in a single pill */}
          <div className="nav-left-pill surface-glass figma-hover">
            <Link to="/" className="nav-logo figma-hover" aria-label="Parth Pawar, home">Parth<FigmaSelect /></Link>
            <Link to="/work" className={`pill-link nav-pill-link figma-hover${isWorkContext ? ' active' : ''}`}>Work<FigmaSelect /></Link>
            {isWorkPage && (
              <div className="nav-work-views" aria-label="Work page views">
                {workViewLinks.map((view) => (
                  <Link
                    key={view.key}
                    to={view.to}
                    replace
                    className={`nav-work-view figma-hover${workView === view.key ? ' is-active' : ''}`}
                    aria-current={workView === view.key ? 'page' : undefined}
                  >
                    {view.label}
                  </Link>
                ))}
              </div>
            )}
            <Link to="/about" className={`pill-link nav-pill-link figma-hover${isAbout ? ' active' : ''}`}>About<FigmaSelect /></Link>
            <FigmaSelect />
          </div>

          {/* Right group, theme toggle + CTA */}
          <div className="nav-right">
            <div className="nav-canvas-panel surface-glass surface-glass--subtle" aria-label="Canvas controls">
              <button
                type="button"
                className={`nav-grid-toggle${gridOn ? ' nav-grid-toggle--active' : ''}`}
                aria-label={gridOn ? 'Hide grid overlay' : 'Show grid overlay'}
                aria-pressed={gridOn}
                title={gridOn ? 'Hide grid overlay' : 'Show grid overlay'}
                onClick={toggleGrid}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1.5 4.5H12.5M1.5 9.5H12.5M4.5 1.5V12.5M9.5 1.5V12.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1" />
                </svg>
                <span>Grid</span>
              </button>
              <button
                type="button"
                className={`nav-grid-toggle${rulersOn ? ' nav-grid-toggle--active' : ''}`}
                aria-label={rulersOn ? 'Hide rulers' : 'Show rulers'}
                aria-pressed={rulersOn}
                title={rulersOn ? 'Hide rulers' : 'Show rulers'}
                onClick={toggleRulers}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 1.5V12M2 1.5H12.5M2 4.5H4.5M2 7.5H5.5M2 10.5H4.5M5 1.5V4M8 1.5V5M11 1.5V4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
                <span>Ruler</span>
              </button>
              <button
                type="button"
                className={`nav-grid-toggle nav-interact-toggle${interactOn ? ' nav-grid-toggle--active' : ''}`}
                aria-label={interactOn ? 'Exit Figma mode' : 'Enter Figma mode'}
                aria-pressed={interactOn}
                aria-controls="site-interaction-tools"
                title={interactOn ? 'Exit Figma mode' : 'Enter Figma mode'}
                onPointerEnter={preloadInteractTools}
                onFocus={preloadInteractTools}
                onClick={toggleInteractTools}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M3 3.25H12M3 7.5H12M3 11.75H12" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
                  <circle cx="5.25" cy="3.25" r="1.05" fill="var(--surface, #fff)" stroke="currentColor" strokeWidth="1.05" />
                  <circle cx="9.75" cy="7.5" r="1.05" fill="var(--surface, #fff)" stroke="currentColor" strokeWidth="1.05" />
                  <circle cx="6.75" cy="11.75" r="1.05" fill="var(--surface, #fff)" stroke="currentColor" strokeWidth="1.05" />
                </svg>
                <span>Figma mode</span>
              </button>
            </div>
            <AmbientAudio />
            <span className="nav-theme-wrap figma-hover"><ThemeToggle className="surface-glass surface-glass--subtle" /><FigmaSelect /></span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="nav-cta magnetic figma-hover">Let's Talk<FigmaSelect /></a>
            <ThemeToggle className="nav-mobile-theme surface-glass surface-glass--subtle" />
            <button
              ref={toggleRef}
              className="nav-toggle"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className="mobile-overlay surface-glass surface-glass--strong"
        ref={overlayRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
      >
        <ul className="mobile-nav-links">
          <li><Link to="/work" onClick={closeMenu}>Work</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><a href={`mailto:${CONTACT_EMAIL}`} onClick={closeMenu}>Let's Talk</a></li>
        </ul>
      </div>
    </>
  );
}
