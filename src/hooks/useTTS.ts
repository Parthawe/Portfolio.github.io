import { useRef, useCallback, useState, useEffect } from 'react'

/**
 * Text-to-Speech hook.
 * Uses Web Speech API with male voice preference.
 * Strips markdown before speaking.
 */

function cleanForSpeech(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/→/g, '')
    .replace(/↗/g, '')
    .replace(/\n+/g, '. ')
    .replace(/\s+/g, ' ')
    .replace(/\.\s*\./g, '.')
    .trim()
}

// Pick the best MALE English voice
function getBestVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()

  // Male voices preferred, in order of quality
  const maleNames = [
    'Rishi',           // Indian English male (macOS)
    'Aaron',           // US male (macOS)
    'Daniel',          // UK male (macOS)
    'Alex',            // US male (macOS, older but deep)
    'Tom',             // UK male
    'Fred',            // US male
    'Google UK English Male',
    'Google US English',
    'Microsoft David', // Windows male
    'Microsoft Mark',  // Windows male
    'Microsoft Ravi',  // Indian English male (Windows)
  ]

  for (const name of maleNames) {
    const v = voices.find(v => v.name.includes(name))
    if (v) return v
  }

  // Fallback: any English male-sounding voice (avoid known female names)
  const femaleNames = ['Samantha', 'Karen', 'Moira', 'Tessa', 'Victoria', 'Zira', 'Cortana', 'Siri']
  const english = voices.filter(v => v.lang.startsWith('en'))
  const notFemale = english.find(v => !femaleNames.some(f => v.name.includes(f)))
  return notFemale || english[0] || voices[0] || null
}

export function useTTS() {
  const [muted, setMuted] = useState(() => {
    try { return localStorage.getItem('folio-tts-muted') === '1' } catch { return false }
  })
  const [speaking, setSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    try { localStorage.setItem('folio-tts-muted', muted ? '1' : '0') } catch {}
  }, [muted])

  // Load voices (some browsers load async)
  useEffect(() => {
    const load = () => speechSynthesis.getVoices()
    load()
    speechSynthesis.addEventListener?.('voiceschanged', load)
    return () => speechSynthesis.removeEventListener?.('voiceschanged', load)
  }, [])

  const speak = useCallback((text: string) => {
    if (muted || !text || typeof speechSynthesis === 'undefined') return

    speechSynthesis.cancel()

    const clean = cleanForSpeech(text)
    if (!clean) return

    const utterance = new SpeechSynthesisUtterance(clean)
    const voice = getBestVoice()
    if (voice) utterance.voice = voice

    // Young male Indian English vibe: slightly faster, natural pitch
    utterance.rate = 1.1
    utterance.pitch = 0.95
    utterance.volume = 0.9

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
  }, [muted])

  // Speak with a promise that resolves when done
  const speakAsync = useCallback((text: string): Promise<void> => {
    return new Promise(resolve => {
      if (muted || !text || typeof speechSynthesis === 'undefined') {
        // Even if muted, wait a bit so tour pacing works
        setTimeout(resolve, Math.max(1000, text.length * 40))
        return
      }

      speechSynthesis.cancel()
      const clean = cleanForSpeech(text)
      if (!clean) { resolve(); return }

      const utterance = new SpeechSynthesisUtterance(clean)
      const voice = getBestVoice()
      if (voice) utterance.voice = voice
      utterance.rate = 1.1
      utterance.pitch = 0.95
      utterance.volume = 0.9

      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => { setSpeaking(false); resolve() }
      utterance.onerror = () => { setSpeaking(false); resolve() }

      utteranceRef.current = utterance
      speechSynthesis.speak(utterance)
    })
  }, [muted])

  const cancel = useCallback(() => {
    speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      if (!prev) speechSynthesis.cancel()
      return !prev
    })
  }, [])

  return { speak, speakAsync, cancel, muted, speaking, toggleMute }
}
