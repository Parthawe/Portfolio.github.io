import { useRef, useEffect, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavScroll } from '../hooks/useNavScroll';
import ThemeToggle from './ThemeToggle';
import AmbientAudio from './AmbientAudio';
import FigmaSelect from './FigmaSelect';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<Element | null>(null);
  const { pathname } = useLocation();

  useNavScroll(navRef);

  const isOpenRef = useRef(false);
  const [gridOn, setGridOn] = useState(false);
  const [rulersOn, setRulersOn] = useState(true);

  const closeMenu = useCallback(() => {
    if (!isOpenRef.current) return;
    isOpenRef.current = false;
    overlayRef.current?.classList.remove('open');
    toggleRef.current?.classList.remove('open');
    document.body.style.overflow = '';
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
      lastFocusedRef.current = document.activeElement;
      overlayRef.current?.classList.add('open');
      toggleRef.current?.classList.add('open');
      document.body.style.overflow = 'hidden';
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
      document.body.style.overflow = '';
    };
  }, [closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const syncChromeState = () => {
      setGridOn(document.body.classList.contains('figma-grid-on'));
      setRulersOn(!document.body.classList.contains('figma-rulers-off'));
    };

    syncChromeState();

    const observer = new MutationObserver(syncChromeState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleGrid = useCallback(() => {
    document.body.classList.toggle('figma-grid-on');
  }, []);

  const toggleRulers = useCallback(() => {
    document.body.classList.toggle('figma-rulers-off');
  }, []);

  const isAbout = pathname === '/about';
  const isHome = pathname === '/';
  const isWork = !isHome && !isAbout;

  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <nav className="nav" id="nav" ref={navRef}>
        <div className="nav-inner">
          {/* Left group, logo + links in a single pill */}
          <div className="nav-left-pill figma-hover">
            <Link to="/" className="nav-logo figma-hover">PP<FigmaSelect /></Link>
            <Link to="/work" className={`pill-link nav-pill-link figma-hover${isWork ? ' active' : ''}`}>Work<FigmaSelect /></Link>
            <Link to="/about" className={`pill-link nav-pill-link figma-hover${isAbout ? ' active' : ''}`}>About<FigmaSelect /></Link>
            <FigmaSelect />
          </div>

          {/* Right group, theme toggle + CTA */}
          <div className="nav-right">
            <button
              type="button"
              className={`nav-grid-toggle figma-hover${gridOn ? ' nav-grid-toggle--active' : ''}`}
              aria-label={gridOn ? 'Hide grid overlay' : 'Show grid overlay'}
              title={gridOn ? 'Hide grid overlay' : 'Show grid overlay'}
              onClick={toggleGrid}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1.5 4.5H12.5M1.5 9.5H12.5M4.5 1.5V12.5M9.5 1.5V12.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              <FigmaSelect />
            </button>
            <button
              type="button"
              className={`nav-grid-toggle figma-hover${rulersOn ? ' nav-grid-toggle--active' : ''}`}
              aria-label={rulersOn ? 'Hide rulers' : 'Show rulers'}
              title={rulersOn ? 'Hide rulers' : 'Show rulers'}
              onClick={toggleRulers}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 1.5V12M2 1.5H12.5M2 4.5H4.5M2 7.5H5.5M2 10.5H4.5M5 1.5V4M8 1.5V5M11 1.5V4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <FigmaSelect />
            </button>
            <AmbientAudio />
            <span className="figma-hover" style={{ display: 'flex' }}><ThemeToggle /><FigmaSelect /></span>
            <a href="mailto:parthpawar@nyu.edu" className="nav-cta magnetic figma-hover">Let's Talk<FigmaSelect /></a>
            <button
              ref={toggleRef}
              className="nav-toggle"
              aria-label="Menu"
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className="mobile-overlay" ref={overlayRef}>
        <ul className="mobile-nav-links">
          <li><Link to="/work" onClick={closeMenu}>Work</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/writing" onClick={closeMenu}>Writing</Link></li>
          <li><a href="mailto:parthpawar@nyu.edu" onClick={closeMenu}>Let's Talk</a></li>
        </ul>
      </div>
    </>
  );
}
