import { site } from '@/data/site'

export function FooterHome() {
  return (
    <footer className="bg-footer-dark text-white">
      <div
        className="mx-auto max-w-[--width-container] px-[--spacing-pad]"
        style={{ paddingTop: 'clamp(5rem, 10vw, 8rem)', paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}
      >
        {/* CTA */}
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

        {/* Social links */}
        <div className="mt-12 flex flex-wrap gap-4">
          {[
            { label: 'Email', href: `mailto:${site.email}` },
            { label: 'LinkedIn', href: site.linkedin },
            { label: 'Instagram', href: site.instagram },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={social.href.startsWith('mailto:') ? undefined : 'noopener'}
              className="rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-white/35 transition-all duration-300 hover:border-white/25 hover:text-white/80"
            >
              {social.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-16 flex flex-col gap-3 border-t border-white/6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/20">
            &copy; 2022&mdash;&rsquo;26 Parth Pawar
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/20">
            San Francisco, CA
          </span>
        </div>
      </div>
    </footer>
  )
}
