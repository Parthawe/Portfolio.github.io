import { cn } from '@/lib/cn'

const filters = [
  { label: 'All', value: 'all' },
  { label: 'UX Design', value: 'ux' },
  { label: 'Design for Good', value: 'good' },
  { label: 'AI & Wearables', value: 'ai' },
  { label: 'Creative Tech', value: 'creative' },
  { label: 'Installations', value: 'install' },
  { label: 'Brand & Visual', value: 'brand' },
] as const

interface FilterNavProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function FilterNav({ activeFilter, onFilterChange }: FilterNavProps) {
  return (
    <nav className="sticky top-[--spacing-nav-h] z-50 -mx-[--spacing-pad] bg-bg/90 px-[--spacing-pad] py-3 backdrop-blur-[12px]" style={{ borderBottom: '1px solid var(--color-ink-06)' }}>
      <div className="scrollbar-hide flex gap-2 overflow-x-auto">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            data-filter={value}
            onClick={() => onFilterChange(value)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
              activeFilter === value
                ? 'border-ink bg-ink-06 text-ink'
                : 'border-ink-08 text-ink-40 hover:border-ink-15 hover:bg-ink-04 hover:text-ink',
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}
