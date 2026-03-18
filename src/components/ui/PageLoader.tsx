import { useEffect, useState } from 'react'

export function PageLoader() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fading'), 500)
    const t2 = setTimeout(() => setPhase('gone'), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'gone') return null

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-bg transition-opacity duration-500"
      style={{ opacity: phase === 'fading' ? 0 : 1 }}
    >
      <div className="relative flex items-center justify-center">
        {/* Spinning ring */}
        <div
          className="absolute h-12 w-12 rounded-full border-2 border-ink-08 border-t-ink"
          style={{ animation: 'spin-slow 0.8s linear infinite' }}
        />
        <span className="font-sans text-sm font-bold tracking-tight text-ink">
          PP
        </span>
      </div>
    </div>
  )
}
