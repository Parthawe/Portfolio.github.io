import { useState, useEffect } from 'react'
import PixelLoaderVisual from './PixelLoaderVisual'

export default function PageLoader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const startedAt = performance.now()
    const minDuration = 1250
    let releaseTimer: ReturnType<typeof setTimeout> | undefined

    const onLoad = () => {
      const elapsed = performance.now() - startedAt
      releaseTimer = setTimeout(() => setLoaded(true), Math.max(0, minDuration - elapsed))
    }

    if (document.readyState === 'complete') {
      const timer = setTimeout(onLoad, 0)
      return () => {
        clearTimeout(timer)
        clearTimeout(releaseTimer)
      }
    }

    // Wait for window load, but cap at 3s to avoid indefinite loader
    const maxTimer = setTimeout(onLoad, 3000)
    window.addEventListener('load', onLoad)

    return () => {
      clearTimeout(maxTimer)
      clearTimeout(releaseTimer)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <div className={`page-loader${loaded ? ' loaded' : ''}`} aria-hidden="true">
      <PixelLoaderVisual />
    </div>
  )
}
