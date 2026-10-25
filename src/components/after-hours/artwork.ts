// Shared route-only illustrations. Runtime samples measured frames from one atlas.
export type ArtworkState = 'loading' | 'ready' | 'error'
export const ARTWORK_URL = '/Assets/AfterHours/workshop-atlas.webp'
export const CHARACTER_URL = '/Assets/AfterHours/character-parts.webp'
let image: HTMLImageElement | null = null
let characters: HTMLImageElement | null = null
let state: ArtworkState = 'loading'
let pending: Promise<void> | null = null
let attempt = 0
const listeners = new Set<(state: ArtworkState) => void>()
const notify = () => listeners.forEach(listener => listener(state))
export const artworkImage = () => state === 'ready' ? image : null
export const characterImage = () => state === 'ready' ? characters : null
export const artworkState = () => state
export function subscribeArtwork(listener: (state: ArtworkState) => void) {
  listeners.add(listener); listener(state)
  return () => { listeners.delete(listener) }
}
export function loadArtwork(): Promise<void> {
  if (pending) return pending
  state = 'loading'; notify()
  pending = (async () => {
    const load = (url: string) => new Promise<HTMLImageElement | null>(resolve => {
      const next = new Image(); let finished = false
      const finish = (success: boolean) => {
        if (finished) return
        finished = true; clearTimeout(timeout); next.onload = null; next.onerror = null
        resolve(success && next.naturalWidth > 0 ? next : null)
      }
      const timeout = window.setTimeout(() => finish(false), 10000)
      next.onload = () => finish(true); next.onerror = () => finish(false)
      next.src = attempt ? `${url}?retry=${attempt}` : url
    })
    const [backdrop, actors] = await Promise.all([load(ARTWORK_URL), load(CHARACTER_URL)])
    image = backdrop; characters = actors
    state = backdrop && actors ? 'ready' : 'error'; notify()
  })()
  return pending
}
export function retryArtwork() {
  if (pending && state === 'loading') return pending
  attempt++; pending = null; image = null; characters = null
  return loadArtwork()
}
