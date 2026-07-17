import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { siBitcoin, siEthereum, siSolana, type SimpleIcon } from 'simple-icons'

type Coin = {
  name: string
  ticker: string
  icon: SimpleIcon
  color: string
  surface: string
  frequency: number
}

const COINS: Coin[] = [
  { name: 'Bitcoin', ticker: 'BTC', icon: siBitcoin, color: '#ffffff', surface: '#f7931a', frequency: 523.25 },
  { name: 'Ethereum', ticker: 'ETH', icon: siEthereum, color: '#627eea', surface: '#eeecff', frequency: 659.25 },
  { name: 'Solana', ticker: 'SOL', icon: siSolana, color: '#32e4b4', surface: '#111116', frequency: 783.99 },
]

function CoinMark({ coin }: { coin: Coin }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={coin.name} style={{ color: coin.color }}>
      <path d={coin.icon.path} />
    </svg>
  )
}

export default function CryptoHeroCoins() {
  const reduceMotion = useReducedMotion()
  const audioContextRef = useRef<AudioContext | null>(null)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeCoin, setActiveCoin] = useState<string | null>(null)
  const [lastPlayedCoin, setLastPlayedCoin] = useState<string | null>(null)
  const [spinCount, setSpinCount] = useState(0)

  useEffect(() => () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    void audioContextRef.current?.close()
  }, [])

  const playCoinTone = useCallback((coin: Coin) => {
    const AudioContextClass = window.AudioContext
    const context = audioContextRef.current ?? new AudioContextClass()
    audioContextRef.current = context
    void context.resume()

    const now = context.currentTime
    const master = context.createGain()
    master.gain.setValueAtTime(0.0001, now)
    master.gain.exponentialRampToValueAtTime(0.105, now + 0.025)
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.72)
    master.connect(context.destination)

    ;[
      { ratio: 1, type: 'sine' as OscillatorType, level: 0.72, delay: 0 },
      { ratio: 1.5, type: 'triangle' as OscillatorType, level: 0.28, delay: 0.045 },
    ].forEach(({ ratio, type, level, delay }) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.type = type
      oscillator.frequency.setValueAtTime(coin.frequency * ratio, now + delay)
      oscillator.frequency.exponentialRampToValueAtTime(coin.frequency * ratio * 0.985, now + 0.58)
      gain.gain.setValueAtTime(level, now + delay)
      oscillator.connect(gain)
      gain.connect(master)
      oscillator.start(now + delay)
      oscillator.stop(now + 0.72)
    })
  }, [])

  const activateCoin = useCallback((coin: Coin) => {
    playCoinTone(coin)
    setActiveCoin(coin.ticker)
    setLastPlayedCoin(coin.ticker)
    setSpinCount((count) => count + 1)
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    resetTimerRef.current = setTimeout(() => setActiveCoin(null), 900)
  }, [playCoinTone])

  return (
    <div className="crypto-stage" aria-label="Interactive Bitcoin, Ethereum, and Solana coins">
      <div className="crypto-coin-cluster">
        {COINS.map((coin, index) => (
          <motion.button
            className={`crypto-stage-coin crypto-stage-coin--${coin.ticker.toLowerCase()}${activeCoin === coin.ticker ? ' is-ringing' : ''}`}
            style={{ '--coin-surface': coin.surface } as CSSProperties}
            type="button"
            onClick={() => activateCoin(coin)}
            initial={{ opacity: 0, scale: 0.72, y: 12 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: reduceMotion ? 0 : [0, index % 2 === 0 ? -7 : 7, 0],
            }}
            transition={{
              opacity: { duration: 0.42, delay: index * 0.1 },
              scale: { duration: 0.62, delay: index * 0.1, type: 'spring' },
              y: { duration: 5.2 + index * 0.55, repeat: Infinity, ease: 'easeInOut', delay: -index * 1.2 },
            }}
            aria-label={`Spin ${coin.name} coin and play its tone`}
            aria-pressed={activeCoin === coin.ticker}
            key={coin.ticker}
          >
            <span className="crypto-coin-body" key={`${coin.ticker}-${spinCount}`}>
              <span className="crypto-coin-edge" aria-hidden="true" />
              <span className="crypto-coin-face crypto-coin-face--front"><CoinMark coin={coin} /></span>
              <span className="crypto-coin-face crypto-coin-face--back" aria-hidden="true">{coin.ticker}</span>
            </span>
            <span className="crypto-coin-label" aria-hidden="true">{coin.name}</span>
          </motion.button>
        ))}
      </div>

      <p className="crypto-coin-hint"><span aria-hidden="true">↻</span> Tap a coin to hear it</p>
      <span className="sr-only" aria-live="polite">{lastPlayedCoin ? `${lastPlayedCoin} coin tone played` : ''}</span>
    </div>
  )
}
