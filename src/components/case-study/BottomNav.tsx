import { useEffect, useRef, useCallback } from 'react';
import { useReadingProgress } from '../../hooks/useReadingProgress';

interface BottomNavProps {
  sections: { id: string; label: string }[];
  liveUrl?: string;
}

export default function BottomNav({ sections, liveUrl }: BottomNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const progress = useReadingProgress();
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const isScrolling = useRef(false);

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
              links.forEach((l) => l.classList.remove('active'));
              const match = pairs.find((p) => p.section === entry.target);
              if (match) match.link.classList.add('active');
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

    // --- Auto-hide on scroll pause ---
    window.addEventListener('scroll', showNav, { passive: true });
    // Initial idle state after mount
    hideTimer.current = setTimeout(() => nav.classList.add('is-idle'), 3000);

    return () => {
      sectionObserver?.disconnect();
      footerObserver?.disconnect();
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
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="cs-bottom-nav"
      id="cs-bottom-nav"
      aria-label="Case study sections"
      onMouseEnter={() => {
        clearTimeout(hideTimer.current);
        navRef.current?.classList.remove('is-idle');
      }}
      onMouseLeave={() => {
        hideTimer.current = setTimeout(() => {
          navRef.current?.classList.add('is-idle');
        }, 2500);
      }}
    >
      {/* Reading progress bar */}
      <div className="cs-bnav-progress" style={{ width: `${progress}%` }} />

      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="cs-bnav-link"
          onClick={(e) => handleClick(e, s.id)}
        >
          {s.label}
        </a>
      ))}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cs-bnav-link cs-bnav-live"
        >
          Live Site
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      )}
    </nav>
  );
}
