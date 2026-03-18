import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mobileNavLinks } from '@/data/navigation'
import { cn } from '@/lib/cn'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleEsc)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleEsc)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-[99] flex items-center justify-center bg-bg/98 backdrop-blur-lg transition-all duration-500 md:hidden',
        open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
      )}
    >
      <ul className="flex flex-col items-center gap-8">
        {mobileNavLinks.map((link, i) => (
          <li
            key={link.href}
            className="transition-all duration-500"
            style={{
              transitionDelay: open ? `${i * 80}ms` : '0ms',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {link.href.startsWith('mailto:') ? (
              <a
                href={link.href}
                className="text-3xl font-light text-ink transition-colors hover:text-ink-40"
                onClick={onClose}
              >
                {link.label}
              </a>
            ) : (
              <Link
                to={link.href}
                className="text-3xl font-light text-ink transition-colors hover:text-ink-40"
                onClick={onClose}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
