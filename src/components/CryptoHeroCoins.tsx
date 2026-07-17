import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { siBitcoin, siEthereum, siSolana, type SimpleIcon } from 'simple-icons'

type Coin = {
  name: string
  ticker: string
  icon: SimpleIcon
  color: string
  frequency: number
}

const COINS: Coin[] = [
  { name: 'Bitcoin', ticker: 'BTC', icon: siBitcoin, color: '#f7931a', frequency: 523.25 },
  { name: 'Ethereum', ticker: 'ETH', icon: siEthereum, color: '#627eea', frequency: 659.25 },
  { name: 'Solana', ticker: 'SOL', icon: siSolana, color: '#28d9a5', frequency: 783.99 },
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
    <div className={`crypto-stage${activeCoin ? ' is-sonic' : ''}`} aria-label="A crypto payment settlement flow designed around clear fees, status, and recovery">
      <motion.button
        className={`crypto-stage-coin crypto-stage-coin--btc${activeCoin === 'BTC' ? ' is-ringing' : ''}`}
        type="button"
        onClick={() => activateCoin(COINS[0])}
        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -6, y: reduceMotion ? 0 : [0, -5, 0] }}
        transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.6, type: 'spring' }, y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' } }}
        aria-label="Spin Bitcoin coin and play its tone"
        aria-pressed={activeCoin === 'BTC'}
      >
        <span className="crypto-coin-body" key={`btc-${spinCount}`}>
          <span className="crypto-coin-face crypto-coin-face--front"><CoinMark coin={COINS[0]} /></span>
          <span className="crypto-coin-rim" aria-hidden="true" />
          <span className="crypto-coin-face crypto-coin-face--back" aria-hidden="true">BTC</span>
        </span>
      </motion.button>

      <motion.button
        className={`crypto-stage-coin crypto-stage-coin--eth${activeCoin === 'ETH' ? ' is-ringing' : ''}`}
        type="button"
        onClick={() => activateCoin(COINS[1])}
        initial={{ opacity: 0, scale: 0.7, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 5, y: reduceMotion ? 0 : [0, 5, 0] }}
        transition={{ opacity: { duration: 0.4, delay: 0.1 }, scale: { duration: 0.6, delay: 0.1, type: 'spring' }, y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: -1.4 } }}
        aria-label="Spin Ethereum coin and play its tone"
        aria-pressed={activeCoin === 'ETH'}
      >
        <span className="crypto-coin-body" key={`eth-${spinCount}`}>
          <span className="crypto-coin-face crypto-coin-face--front"><CoinMark coin={COINS[1]} /></span>
          <span className="crypto-coin-rim" aria-hidden="true" />
          <span className="crypto-coin-face crypto-coin-face--back" aria-hidden="true">ETH</span>
        </span>
      </motion.button>

      <span className="crypto-coin-hint" aria-hidden="true"><i /> Tap a coin · sound on</span>
      <span className="sr-only" aria-live="polite">{lastPlayedCoin ? `${lastPlayedCoin} coin tone played` : ''}</span>

      <div className="crypto-console">
        <header className="crypto-console-bar">
          <span><i aria-hidden="true" /> Settlement design</span>
          <span>03:27 UTC</span>
        </header>

        <div className="crypto-console-body">
          <div className="crypto-token-list" aria-label="Supported networks">
            {COINS.map((coin, index) => (
              <motion.div
                className={index === 1 ? 'is-active' : undefined}
                key={coin.ticker}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, delay: 0.18 + index * 0.08 }}
              >
                <CoinMark coin={coin} />
                <span>{coin.ticker}</span>
              </motion.div>
            ))}
          </div>

          <motion.article
            className="crypto-transfer-card"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.52, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="crypto-transfer-heading">
              <span>Cross-border transfer</span>
              <i>Quote locked · 00:42</i>
            </div>
            <div className="crypto-transfer-amount">
              <span>You send</span>
              <strong>1,250.00 <small>USDC</small></strong>
              <em>≈ $1,250.00 USD</em>
            </div>
            <dl className="crypto-transfer-details">
              <div><dt>Route</dt><dd>USDC → USD</dd></div>
              <div><dt>Network</dt><dd>Ethereum</dd></div>
              <div><dt>Fee</dt><dd>$6.42</dd></div>
              <div><dt>Arrival</dt><dd>&lt; 2 min</dd></div>
            </dl>
            <div className="crypto-review-state">
              <span><i aria-hidden="true" /> KYC verified</span>
              <strong>Ready to review →</strong>
            </div>
          </motion.article>

          <div className="crypto-proof-rail" aria-label="Transaction states">
            <span><i aria-hidden="true" /> Intent</span>
            <span className="is-current"><i aria-hidden="true" /> Review</span>
            <span><i aria-hidden="true" /> Receipt</span>
          </div>
        </div>

        <footer className="crypto-console-footer">
          <span>Clarity before commitment</span>
          <span className="crypto-console-verified"><i aria-hidden="true" /> Receipt verified · 0x71F…9AD</span>
        </footer>
      </div>
    </div>
  )
}
