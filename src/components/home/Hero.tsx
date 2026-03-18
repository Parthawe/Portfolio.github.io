import { useEffect, useRef } from 'react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !containerRef.current) return

    const els = containerRef.current.querySelectorAll<HTMLElement>('[data-reveal]')
    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(32px)'
      setTimeout(() => {
        el.style.transition = 'opacity 1s cubic-bezier(0,0,0.3,1), transform 1s cubic-bezier(0,0,0.3,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 300 + i * 200)
    })
  }, [])

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-hero-dark">
      <div
        ref={containerRef}
        className="relative z-10 px-[--spacing-pad] pb-[clamp(3rem,8vw,5rem)]"
      >
        {/* Name — massive editorial type */}
        <h1
          data-reveal
          className="font-sans font-black uppercase tracking-[-0.04em] text-white"
          style={{
            fontSize: 'clamp(3.2rem, 12vw, 10rem)',
            lineHeight: 0.9,
          }}
        >
          Parth
          <br />
          Pawar
        </h1>

        {/* Tagline row */}
        <div
          data-reveal
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <p
            className="max-w-[38ch] font-sans text-white/50 font-light"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', lineHeight: 1.6 }}
          >
            Product Designer crafting interfaces for AI&nbsp;wearables,
            fintech platforms, and interactive systems.
          </p>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
              Based in San Francisco
            </span>
            <span className="hidden h-px w-12 bg-white/15 sm:block" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 sm:block">
              Available for projects
            </span>
          </div>
        </div>
      </div>

      {/* Subtle bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
