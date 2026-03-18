import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ReadingProgress({ color = 'var(--color-ink)' }: { color?: string }) {
  const progress = useScrollProgress()

  return (
    <div
      className="fixed left-0 top-[--spacing-nav-h] z-[201] h-0.5 pointer-events-none transition-[width] duration-75 ease-linear"
      style={{ width: `${progress * 100}%`, background: color }}
    />
  )
}
