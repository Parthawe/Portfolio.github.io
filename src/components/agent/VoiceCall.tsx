import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTTS } from '../../hooks/useTTS'
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'
import { sendMessage, getTourSteps, getResponseAction, createChatHistory, type ChatHistory } from '../../services/agentAI'

interface TranscriptLine {
  id: number
  speaker: 'folio' | 'you'
  text: string
  time: string
}

interface Props {
  open: boolean
  onClose: () => void
  route: string
  onAgentState: (s: 'thinking' | 'talking' | 'idle') => void
}

function timestamp(): string {
  const d = new Date()
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

export default function VoiceCall({ open, onClose, route, onAgentState }: Props) {
  const navigate = useNavigate()
  const { speakAsync, cancel: cancelSpeech, muted, speaking, toggleMute } = useTTS()
  const [transcript, setTranscript] = useState<TranscriptLine[]>([])
  const [callActive, setCallActive] = useState(false)
  const [listening, setListening] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const idRef = useRef(0)
  const touringRef = useRef(false)
  const historyRef = useRef<ChatHistory>(createChatHistory(route))
  const tourAbort = useRef(false)
  const transcriptEndRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined)
  const continuousListenRef = useRef(false)

  // Keep route in sync
  useEffect(() => { historyRef.current.route = route }, [route])

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript])

  // Timer
  useEffect(() => {
    if (callActive) {
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed(p => p + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [callActive])

  const addLine = useCallback((speaker: 'folio' | 'you', text: string) => {
    setTranscript(prev => [...prev, { id: ++idRef.current, speaker, text, time: timestamp() }])
  }, [])

  // ── Start call ──────────────────────────────────────
  const startCall = useCallback(async () => {
    setCallActive(true)
    setTranscript([])
    onAgentState('talking')

    const greeting = `Hey! I'm Folio, Parth's portfolio guide. I'm going to walk you through this page. Feel free to interrupt me anytime — just tap the mic and ask a question.`
    addLine('folio', greeting)
    await speakAsync(greeting)

    // Auto-start tour
    const steps = getTourSteps(route)
    touringRef.current = true
    tourAbort.current = false

    for (const step of steps) {
      if (tourAbort.current) break

      addLine('folio', step.text)

      if (step.scrollTo) {
        const el = document.querySelector(step.scrollTo) as HTMLElement | null
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el.style.outline = '2px solid rgba(232, 93, 38, 0.4)'
          el.style.outlineOffset = '6px'
          el.style.transition = 'outline 0.4s, outline-offset 0.4s'
          setTimeout(() => { el.style.outline = ''; el.style.outlineOffset = '' }, 4000)
        }
      }

      onAgentState('talking')
      await speakAsync(step.text)
      if (tourAbort.current) break

      await new Promise(r => setTimeout(r, step.delay || 600))
      if (tourAbort.current) break
    }

    touringRef.current = false

    if (!tourAbort.current) {
      const endMsg = "That's the overview! You can ask me anything now — about any project, my process, or just say 'show me Mentra' to explore a project."
      addLine('folio', endMsg)
      onAgentState('talking')
      await speakAsync(endMsg)
      onAgentState('idle')
      // Start listening for voice input
      continuousListenRef.current = true
      startListening()
    }
  }, [route, speakAsync, onAgentState, addLine])

  // ── Voice input handling ────────────────────────────
  const handleVoiceResult = useCallback(async (text: string) => {
    setListening(false)
    addLine('you', text)

    const lower = text.toLowerCase().replace(/[?.!]+$/, '').trim()

    // Tour request
    if (lower.includes('tour') || lower.includes('walk me through') || lower.includes('show me around')) {
      tourAbort.current = false
      touringRef.current = true
      const steps = getTourSteps(route)
      for (const step of steps) {
        if (tourAbort.current) break
        addLine('folio', step.text)
        if (step.scrollTo) {
          const el = document.querySelector(step.scrollTo) as HTMLElement | null
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        onAgentState('talking')
        await speakAsync(step.text)
        if (tourAbort.current) break
        await new Promise(r => setTimeout(r, 500))
        if (tourAbort.current) break
      }
      touringRef.current = false
      onAgentState('idle')
      if (continuousListenRef.current && !tourAbort.current) startListening()
      return
    }

    // "Show me X" → navigate
    if (lower.startsWith('show me ') || lower.startsWith('take me to ')) {
      const action = getResponseAction(text)
      if (action.type === 'navigate' && action.slug) {
        const msg = `Taking you to ${action.slug}. Let me give you a walkthrough there.`
        addLine('folio', msg)
        onAgentState('talking')
        await speakAsync(msg)
        navigate(`/${action.slug}`)
        setTimeout(async () => {
          const steps = getTourSteps(`/${action.slug}`)
          touringRef.current = true
          tourAbort.current = false
          for (const step of steps) {
            if (tourAbort.current) break
            addLine('folio', step.text)
            if (step.scrollTo) {
              const el = document.querySelector(step.scrollTo) as HTMLElement | null
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            onAgentState('talking')
            await speakAsync(step.text)
            if (tourAbort.current) break
            await new Promise(r => setTimeout(r, 500))
            if (tourAbort.current) break
          }
          touringRef.current = false
          onAgentState('idle')
          if (continuousListenRef.current && !tourAbort.current) startListening()
        }, 2000)
        return
      }
    }

    // Regular AI conversation
    onAgentState('thinking')
    try {
      const response = await sendMessage(text, historyRef.current)
      addLine('folio', response)
      onAgentState('talking')
      await speakAsync(response)
      onAgentState('idle')
    } catch {
      addLine('folio', "Sorry, I couldn't process that. Try asking about a project.")
      onAgentState('idle')
    }

    // Keep listening
    if (continuousListenRef.current) startListening()
  }, [route, speakAsync, onAgentState, addLine, navigate])

  const { toggle: toggleMic, listening: micActive, supported: micSupported } = useSpeechRecognition(handleVoiceResult)

  const startListening = useCallback(() => {
    if (micSupported && !micActive) {
      setListening(true)
      toggleMic()
    }
  }, [micSupported, micActive, toggleMic])

  // ── End call ────────────────────────────────────────
  const endCall = useCallback(() => {
    tourAbort.current = true
    continuousListenRef.current = false
    cancelSpeech()
    setCallActive(false)
    touringRef.current = false
    setListening(false)
    onAgentState('idle')
    onClose()
  }, [cancelSpeech, onAgentState, onClose])

  // Format elapsed time
  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`

  if (!open) return null

  return (
    <div className="voice-call">
      {/* Header */}
      <div className="vc-header">
        <div className="vc-header-left">
          <div className={`vc-pulse ${speaking ? 'vc-pulse--active' : ''}`} />
          <div>
            <span className="vc-title">Folio Call</span>
            <span className="vc-timer">{callActive ? timeStr : 'Ready'}</span>
          </div>
        </div>
        <div className="vc-header-right">
          <button onClick={toggleMute} type="button" className="vc-btn" title={muted ? 'Unmute' : 'Mute'}>
            {muted ? '🔇' : '🔊'}
          </button>
          <button onClick={endCall} type="button" className="vc-btn vc-btn--end" title="End call">
            End
          </button>
        </div>
      </div>

      {/* Transcript */}
      <div className="vc-transcript">
        {transcript.map(line => (
          <div key={line.id} className={`vc-line vc-line--${line.speaker}`}>
            <div className="vc-line-head">
              <span className="vc-line-speaker">{line.speaker === 'folio' ? 'Folio' : 'You'}</span>
              <span className="vc-line-time">{line.time}</span>
            </div>
            <p className="vc-line-text">{line.text}</p>
          </div>
        ))}
        {speaking && (
          <div className="vc-speaking-indicator">
            <span /><span /><span />
          </div>
        )}
        {listening && !speaking && (
          <div className="vc-listening">
            <span className="vc-listening-dot" />
            Listening...
          </div>
        )}
        <div ref={transcriptEndRef} />
      </div>

      {/* Bottom controls */}
      <div className="vc-controls">
        {!callActive ? (
          <button onClick={startCall} type="button" className="vc-start">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2L13 8L4 14V2Z" fill="currentColor" /></svg>
            Start Call
          </button>
        ) : (
          <div className="vc-active-controls">
            <button
              onClick={() => { if (micActive) { toggleMic(); setListening(false) } else startListening() }}
              type="button"
              className={`vc-mic ${micActive ? 'vc-mic--on' : ''}`}
              title="Tap to speak"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <rect x="5" y="1" width="6" height="9" rx="3" fill="currentColor" />
                <path d="M3 7v1a5 5 0 0010 0V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
            <span className="vc-hint">{micActive ? 'Listening — speak now' : 'Tap mic to ask a question'}</span>
          </div>
        )}
      </div>
    </div>
  )
}
