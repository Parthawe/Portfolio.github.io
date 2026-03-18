import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full border border-ink-08 text-ink-40 transition-all duration-300 hover:border-ink-15 hover:bg-ink-04 hover:text-ink hover:rotate-12 active:scale-90',
        className
      )}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" style={{ animation: 'icon-spin 0.5s var(--ease-spring) both' }} key="moon" />
      ) : (
        <Sun className="h-4 w-4" style={{ animation: 'icon-spin 0.5s var(--ease-spring) both' }} key="sun" />
      )}
    </button>
  )
}
