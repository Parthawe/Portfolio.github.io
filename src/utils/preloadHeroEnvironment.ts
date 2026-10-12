import { HERO_ENVIRONMENT_URL } from '../data/heroAssets'
import { canUseWebGL } from '../hooks/useWebGLAvailable'
import { isPerformanceDegraded, prefersReducedMotion } from './performance'

/** Start the unchanged lighting download early after the initial paint. */
export function preloadHeroEnvironmentAsset() {
  if (typeof document === 'undefined' || window.location.pathname !== '/' ||
      isPerformanceDegraded() || prefersReducedMotion() || !canUseWebGL()) return null
  const existing = document.querySelector<HTMLLinkElement>('link[data-hero-environment]')
  if (existing) return existing
  const link = document.createElement('link')
  link.dataset.heroEnvironment = ''
  link.rel = 'preload'
  link.as = 'fetch'
  link.href = HERO_ENVIRONMENT_URL
  link.crossOrigin = 'anonymous'
  link.fetchPriority = 'high'
  document.head.append(link)
  // Warm the existing module graph, without constructing a renderer. The page
  // owns user-facing recovery if an optional preload fails.
  void import('../components/HeroScene').catch(() => {})
  return link
}
