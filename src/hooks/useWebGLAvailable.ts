import { useState, useEffect } from 'react'

/**
 * Detects whether the browser can create a WebGL context.
 * Result is cached for the page lifetime since GPU capability does not
 * change between renders. SSR-safe (assumes available until mounted).
 */
let cached: boolean | null = null

function detect(): boolean {
  if (cached !== null) return cached
  if (typeof window === 'undefined') return true
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    cached = !!gl
  } catch {
    cached = false
  }
  return cached
}

export function useWebGLAvailable() {
  // Start optimistic so SSR/first paint matches the interactive path,
  // then correct on mount if WebGL is genuinely unavailable.
  const [available, setAvailable] = useState(true)
  useEffect(() => {
    setAvailable(detect())
  }, [])
  return available
}
