import { useRef, useCallback, useState, useEffect } from 'react'

/**
 * Text-to-Speech hook using Web Speech API.
 * Strips markdown, picks the best English voice, supports mute toggle.
 */

// Strip markdown: **bold**, [link](url), →, *, etc.
function cleanForSpeech(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')       // **bold** -> bold
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // [text](url) -> text
    .replace(/→/g, '')                         // remove arrows
    .replace(/\n+/g, '. ')                     // newlines to pauses
    .replace(/\s+/g, ' ')                      // collapse whitespace
    .trim()
}

// Pick the best English voice available
function getBestVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()
  // Prefer these voices in order (high quality ones)
  const preferred = ['Samantha', 'Alex', 'Daniel', 'Karen', 'Moira', 'Google US English', 'Google UK English']
  for (const name of preferred) {
    const v = voices.find(v => v.name.includes(name))
    if (v) return v
  }
  // Fallback: any English voice
  return voices.find(v => v.lang.startsWith('en')) || voices[0] || null
}

export function useTTS() {
  const [muted, setMuted] = useState(() => {
    try { return localStorage.getItem('folio-tts-muted') === '1' } catch { return false }
  })
  const [speaking, setSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Save mute preference
  useEffect(() => {
    try { localStorage.setItem('folio-tts-muted', muted ? '1' : '0') } catch {}
  }, [muted])

  // Ensure voices are loaded
  useEffect(() => {
    speechSynthesis.getVoices()
    speechSynthesis.addEventListener?.('voiceschanged', () => speechSynthesis.getVoices())
  }, [])

  const speak = useCallback((text: string) => {
    if (muted || !text || typeof speechSynthesis === 'undefined') return

    // Cancel any current speech
    speechSynthesis.cancel()

    const clean = cleanForSpeech(text)
    if (!clean) return

    const utterance = new SpeechSynthesisUtterance(clean)
    const voice = getBestVoice()
    if (voice) utterance.voice = voice
    utterance.rate = 1.05   // slightly faster than default
    utterance.pitch = 1.0
    utterance.volume = 0.85 // not too loud

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
  }, [muted])

  const cancel = useCallback(() => {
    speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      if (!prev) speechSynthesis.cancel() // muting cancels current speech
      return !prev
    })
  }, [])

  return { speak, cancel, muted, speaking, toggleMute }
}
