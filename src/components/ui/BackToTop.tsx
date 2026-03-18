import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/cn'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-ink-08 bg-bg/80 text-ink-40 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-ink-15 hover:text-ink hover:scale-110 hover:-translate-y-0.5 active:scale-95',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      )}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
