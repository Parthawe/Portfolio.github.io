import { useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavScroll } from '../hooks/useNavScroll';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<Element | null>(null);
  const { pathname } = useLocation();

  useNavScroll(navRef);

  const isOpenRef = useRef(false);

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

  const isAbout = pathname === '/about';
  const isHome = pathname === '/';
  const isWork = !isHome && !isAbout;

  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <nav className="nav" id="nav" ref={navRef}>
        <div className="nav-inner">
          {/* Left group, logo + links in a single pill */}
          <div className="nav-left-pill">
            <Link to="/" className="nav-logo">PP</Link>
            <Link to="/work" className={`pill-link nav-pill-link${isWork ? ' active' : ''}`}>Work</Link>
            <Link to="/about" className={`pill-link nav-pill-link${isAbout ? ' active' : ''}`}>About</Link>
          </div>

          {/* Right group, theme toggle + CTA */}
          <div className="nav-right">
            <ThemeToggle />
            <a href="mailto:parthpawar@nyu.edu" className="nav-cta">Let's Talk</a>
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
          <li><a href="mailto:parthpawar@nyu.edu" onClick={closeMenu}>Let's Talk</a></li>
        </ul>
      </div>
    </>
  );
}
