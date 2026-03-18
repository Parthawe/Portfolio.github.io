import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function IntroStatement() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section
      ref={ref}
      className="mx-auto max-w-[--width-container] px-[--spacing-pad]"
      style={{ padding: 'clamp(6rem, 12vw, 12rem) var(--spacing-pad)' }}
    >
      <p
        className="font-sans font-light tracking-[-0.02em] text-ink"
        style={{
          fontSize: 'clamp(1.8rem, 3.6vw, 3rem)',
          lineHeight: 1.35,
          maxWidth: '22ch',
        }}
      >
        I design products that people
        <span className="font-serif italic text-ink-70"> forget </span>
        they're using.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-16">
        <p
          className="max-w-[44ch] font-sans font-light text-ink-40"
          style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', lineHeight: 1.75 }}
        >
          Head of UI/UX at Mentra, designing the OS for AI-powered smart glasses.
          Previously founding designer at ZentiPay and lead designer at TransFi.
          NYU ITP graduate.
        </p>
        <Link
          to="/about"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-40 transition-colors duration-300 hover:text-ink whitespace-nowrap"
        >
          About me
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>

      {/* Subtle divider */}
      <div className="mt-16 flex items-center gap-4">
        <span className="h-px flex-1 bg-ink-08" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-15">Selected work</span>
        <span className="h-px flex-1 bg-ink-08" />
      </div>
    </section>
  )
}
