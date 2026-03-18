import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '@/data/navigation'
import { site } from '@/data/site'
import { ThemeToggle } from '../ui/ThemeToggle'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/cn'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[200] mix-blend-difference pointer-events-none">
        <div
          className="mx-auto flex items-center justify-between px-[--spacing-pad] pointer-events-auto"
          style={{ height: '72px' }}
        >
          {/* Brand */}
          <Link
            to="/"
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-white transition-opacity duration-300 hover:opacity-60"
          >
            {site.name}
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative font-mono text-[11px] uppercase tracking-[0.12em] text-white transition-opacity duration-300',
                  pathname === link.href ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-white" />
                )}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-white opacity-60 transition-opacity duration-300 hover:opacity-100"
            >
              Contact
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
            >
              <span className={cn('h-px w-5 bg-white transition-all duration-300', mobileOpen && 'translate-y-[4px] rotate-45')} />
              <span className={cn('h-px w-5 bg-white transition-all duration-300', mobileOpen && '-translate-y-[4px] -rotate-45')} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
