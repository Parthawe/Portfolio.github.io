import { useRef, useState, useEffect, useCallback } from 'react'

/**
 * Ambient background music — very slow instrumental.
 * Auto-plays on first user interaction (click/scroll), toggleable.
 * Persists mute state in localStorage.
 */

const AUDIO_SRC = '/Assets/audio/ambient.mp3'

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const readyCb = useRef(false)
  const [userMuted, setUserMuted] = useState(() => {
    try { return localStorage.getItem('pp-ambient-muted') === '1' } catch { return false }
  })
  const startedRef = useRef(false)

  const [failed, setFailed] = useState(false)

  // Create audio element
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC)
    audio.loop = true
    audio.volume = 0.08
    audio.preload = 'none'
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => { readyCb.current = true })
    audio.addEventListener('play', () => setPlaying(true))
    audio.addEventListener('pause', () => setPlaying(false))
    audio.addEventListener('error', () => setFailed(true))

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Start on first user interaction (if not muted)
  useEffect(() => {
    if (userMuted || startedRef.current) return

    const start = () => {
      if (startedRef.current || userMuted) return
      startedRef.current = true
      const audio = audioRef.current
      if (!audio) return
      audio.load()
      // Fade in
      audio.volume = 0
      audio.play().then(() => {
        let vol = 0
        const fade = setInterval(() => {
          vol = Math.min(vol + 0.005, 0.08)
          audio.volume = vol
          if (vol >= 0.08) clearInterval(fade)
        }, 50)
      }).catch(() => {
        // Autoplay blocked — try again on next click
        startedRef.current = false
      })
    }

    window.addEventListener('click', start, { once: true })
    window.addEventListener('scroll', start, { once: true, passive: true })
    return () => {
      window.removeEventListener('click', start)
      window.removeEventListener('scroll', start)
    }
  }, [userMuted])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setUserMuted(true)
      try { localStorage.setItem('pp-ambient-muted', '1') } catch {}
    } else {
      if (!startedRef.current) {
        startedRef.current = true
        audio.load()
      }
      audio.volume = 0.08
      audio.play().catch(() => {})
      setUserMuted(false)
      try { localStorage.setItem('pp-ambient-muted', '0') } catch {}
    }
  }, [playing])

  // Don't render if audio file is missing or failed to load
  if (failed) return null

  return (
    <button
      className="ambient-toggle"
      onClick={toggle}
      type="button"
      aria-label={playing ? 'Mute ambient music' : 'Play ambient music'}
      title={playing ? 'Mute music' : 'Play music'}
    >
      {playing ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="3" y="3" width="3" height="10" rx="1" fill="currentColor" />
          <rect x="10" y="3" width="3" height="10" rx="1" fill="currentColor" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M4 3L13 8L4 13V3Z" fill="currentColor" />
        </svg>
      )}
      <span className="ambient-bars" aria-hidden="true">
        <span className={`ambient-bar ${playing ? 'ambient-bar--on' : ''}`} />
        <span className={`ambient-bar ${playing ? 'ambient-bar--on' : ''}`} style={{ animationDelay: '0.2s' }} />
        <span className={`ambient-bar ${playing ? 'ambient-bar--on' : ''}`} style={{ animationDelay: '0.4s' }} />
      </span>
    </button>
  )
}
