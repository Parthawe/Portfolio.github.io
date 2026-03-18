import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>(
  options: { threshold?: number; rootMargin?: string; delay?: number } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    const delay = options.delay ?? 0
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = `opacity 0.6s cubic-bezier(0,0,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0,0,0.3,1) ${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      },
      { threshold: options.threshold ?? 0.1, rootMargin: options.rootMargin ?? '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin, options.delay])

  return ref
}
