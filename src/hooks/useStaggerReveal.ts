import { useEffect, useRef } from 'react'

/**
 * Observes a container and staggers the reveal of its direct children.
 * Each child fades in + slides up with an incremental delay.
 */
export function useStaggerReveal<T extends HTMLElement>(
  options: { stagger?: number; threshold?: number } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const stagger = options.stagger ?? 80
    const children = Array.from(container.children) as HTMLElement[]

    children.forEach((child) => {
      child.style.opacity = '0'
      child.style.transform = 'translateY(16px)'
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            child.style.transition = `opacity 0.5s cubic-bezier(0,0,0.3,1) ${i * stagger}ms, transform 0.5s cubic-bezier(0,0,0.3,1) ${i * stagger}ms`
            child.style.opacity = '1'
            child.style.transform = 'translateY(0)'
          })
          observer.unobserve(container)
        }
      },
      { threshold: options.threshold ?? 0.1, rootMargin: '0px 0px -30px 0px' }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [options.stagger, options.threshold])

  return ref
}
