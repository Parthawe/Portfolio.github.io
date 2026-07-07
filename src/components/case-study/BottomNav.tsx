import { useEffect, useRef, useCallback } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReadingProgress } from '../../hooks/useReadingProgress';
import FigmaSelect from '../FigmaSelect';

interface BottomNavProps {
  sections: { id: string; label: string }[];
  liveUrl?: string;
  modeAction?: { label: string; onClick: () => void };
  placement?: 'bottom' | 'side';
}

export default function BottomNav({ sections, liveUrl, modeAction, placement = 'side' }: BottomNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const progress = useReadingProgress();
  const isDesktopSideRail = useMediaQuery('(min-width: 1024px)');
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isScrolling = useRef(false);

  useEffect(() => {
    const sideRailClass = 'case-side-nav';
    document.body.classList.toggle(sideRailClass, placement === 'side');
    return () => document.body.classList.remove(sideRailClass);
  }, [placement]);

  const showNav = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    nav.classList.remove('is-idle');
    isScrolling.current = true;
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      isScrolling.current = false;
      nav.classList.add('is-idle');
    }, 2500);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    nav.classList.add('is-before-hero');

    // --- Active section tracking ---
    const links = nav.querySelectorAll<HTMLAnchorElement>('.cs-bnav-link:not(.cs-bnav-live)');
    const pairs: { link: HTMLAnchorElement; section: HTMLElement }[] = [];

    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const id = href.replace('#', '');
      const section = document.getElementById(id);
      if (section) pairs.push({ link, section });
    });

    let sectionObserver: IntersectionObserver | undefined;
    if (pairs.length) {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              links.forEach((l) => {
                l.classList.remove('active');
                l.removeAttribute('aria-current');
              });
              const match = pairs.find((p) => p.section === entry.target);
              if (match) {
                match.link.classList.add('active');
                match.link.setAttribute('aria-current', 'true');
              }
            }
          });
        },
        { rootMargin: '-25% 0px -65% 0px' }
      );
      pairs.forEach((p) => sectionObserver!.observe(p.section));
    }

    // --- Hide when footer is visible ---
    let footerObserver: IntersectionObserver | undefined;
    const footer = document.querySelector('.footer');
    if (footer) {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            nav.classList.add('is-hidden');
          } else {
            nav.classList.remove('is-hidden');
          }
        },
        { threshold: 0.1 }
      );
      footerObserver.observe(footer);
    }

    // --- Keep case controls out of the opening hero ---
    let updateHeroGuard: (() => void) | undefined;
    const hero = document.querySelector('.proj-visual-hero') || document.querySelector('.project-header');
    if (hero) {
      updateHeroGuard = () => {
        const rect = hero.getBoundingClientRect();
        const releaseLine = 0;
        nav.classList.toggle('is-before-hero', rect.bottom > releaseLine);
      };
      updateHeroGuard();
      window.addEventListener('scroll', updateHeroGuard, { passive: true });
      window.addEventListener('resize', updateHeroGuard);
    } else {
      nav.classList.remove('is-before-hero');
    }

    // --- Auto-hide on scroll pause ---
    window.addEventListener('scroll', showNav, { passive: true });
    // Initial idle state after mount
    hideTimer.current = setTimeout(() => nav.classList.add('is-idle'), 3000);

    return () => {
      sectionObserver?.disconnect();
      footerObserver?.disconnect();
      if (updateHeroGuard) {
        window.removeEventListener('scroll', updateHeroGuard);
        window.removeEventListener('resize', updateHeroGuard);
      }
      window.removeEventListener('scroll', showNav);
      clearTimeout(hideTimer.current);
    };
  }, [sections, showNav]);

  // Smooth scroll click handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 56;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 24;
    const lenis = (window as unknown as Record<string, { scrollTo?: (target: number, options?: { duration?: number }) => void }>).__lenis
    if (lenis?.scrollTo) {
      lenis.scrollTo(top, { duration: 1 })
      return
    }
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`cs-bottom-nav cs-bottom-nav--${placement} surface-glass`}
      id="cs-bottom-nav"
      aria-label="Case study sections"
      aria-orientation={placement === 'side' && isDesktopSideRail ? 'vertical' : 'horizontal'}
      style={{ '--cs-bnav-progress': `${progress}%` } as React.CSSProperties}
      onMouseEnter={() => {
        clearTimeout(hideTimer.current);
        navRef.current?.classList.remove('is-idle');
      }}
      onMouseLeave={() => {
        hideTimer.current = setTimeout(() => {
          navRef.current?.classList.add('is-idle');
        }, 2500);
      }}
      onFocus={() => {
        clearTimeout(hideTimer.current);
        navRef.current?.classList.remove('is-idle');
      }}
      onBlur={(e) => {
        if (navRef.current?.contains(e.relatedTarget as Node)) return;
        hideTimer.current = setTimeout(() => {
          navRef.current?.classList.add('is-idle');
        }, 2500);
      }}
    >
      <span className="cs-bnav-kicker">Case controls</span>
      {/* Reading progress bar */}
      <div className="cs-bnav-progress" />

      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="cs-bnav-link figma-hover"
          onClick={(e) => handleClick(e, s.id)}
        >
          {s.label}
          <FigmaSelect />
        </a>
      ))}
      {modeAction && (
        <button
          type="button"
          className="cs-bnav-link cs-bnav-action figma-hover"
          onClick={modeAction.onClick}
        >
          {modeAction.label}
          <FigmaSelect />
        </button>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cs-bnav-link cs-bnav-live figma-hover"
        >
          Live Site
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <FigmaSelect />
        </a>
      )}
    </nav>
  );
}
