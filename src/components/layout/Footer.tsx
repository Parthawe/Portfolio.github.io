import { site } from '@/data/site'

export function Footer() {
  return (
    <footer className="bg-footer-dark text-white">
      <div
        className="mx-auto max-w-[--width-container] px-[--spacing-pad]"
        style={{ paddingTop: 'clamp(4rem, 8vw, 6rem)', paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}
      >
        {/* CTA */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/30">
            Available for new projects
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block font-serif font-light text-white/85 transition-colors duration-300 hover:text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
          >
            {site.email}
          </a>
        </div>

        {/* Links + copyright */}
        <div className="flex flex-col gap-6 border-t border-white/8 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-6">
            {[
              { label: 'LinkedIn', href: site.linkedin },
              { label: 'Instagram', href: site.instagram },
              { label: 'Email', href: `mailto:${site.email}` },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener'}
                className="font-mono text-xs uppercase tracking-wide text-white/30 transition-colors duration-300 hover:text-white/70"
              >
                {link.label}
              </a>
            ))}
          </div>

          <span className="font-mono text-xs uppercase tracking-wide text-white/20">
            {site.copyright}
          </span>
        </div>
      </div>
    </footer>
  )
}
