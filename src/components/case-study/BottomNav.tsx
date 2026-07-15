import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
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
  const isDesktopSideRail = useMediaQuery('(min-width: 1200px)');
  const isPhone = useMediaQuery('(max-width: 680px)');
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isScrolling = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [availableSections, setAvailableSections] = useState(sections);
  const visibleSections = useMemo(() => {
    if (!isPhone) return availableSections.slice(0, 4);

    // On phones the action is more useful than a horizontal section list.
    // Keeping the rail to one clear job prevents controls from being clipped
    // behind the browser edge while the document itself remains scrollable.
    if (modeAction) return [];
    return availableSections.slice(0, liveUrl ? 1 : 2);
  }, [availableSections, isPhone, liveUrl, modeAction]);

  useEffect(() => {
    const updateAvailableSections = () => {
      const mounted = sections.filter((section) => document.getElementById(section.id));
      setAvailableSections(mounted);
    };

    updateAvailableSections();
    const root = document.getElementById('main-content') || document.body;
    const observer = new MutationObserver(updateAvailableSections);
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [sections]);

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
  }, [visibleSections, showNav]);

  // Smooth scroll click handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setExpanded(false);
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

  if (!visibleSections.length && !modeAction && !liveUrl) return null;

  return (
    <nav
      ref={navRef}
      className={`cs-bottom-nav cs-bottom-nav--${placement} surface-glass${expanded ? ' is-expanded' : ''}`}
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
        setExpanded(false);
        hideTimer.current = setTimeout(() => {
          navRef.current?.classList.add('is-idle');
        }, 2500);
      }}
    >
      <button
        type="button"
        className="cs-bnav-trigger"
        aria-label={expanded ? 'Close case controls' : 'Open case controls'}
        aria-expanded={expanded}
        title="Case controls"
        onClick={() => setExpanded((current) => !current)}
      >
        <span aria-hidden="true">&#9776;</span>
      </button>
      <span className="cs-bnav-kicker">Case controls</span>
      {/* Reading progress bar */}
      <div className="cs-bnav-progress" />

      {visibleSections.map((s) => (
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
          onClick={() => {
            setExpanded(false)
            modeAction.onClick()
          }}
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
          onClick={() => setExpanded(false)}
        >
          Live Site
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <FigmaSelect />
        </a>
      )}
    </nav>
  );
}
