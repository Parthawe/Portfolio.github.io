import { motion } from 'framer-motion'
import { siBitcoin, siEthereum, siSolana, type SimpleIcon } from 'simple-icons'

type Coin = {
  name: string
  ticker: string
  icon?: SimpleIcon
  className: string
}

const COINS: Coin[] = [
  { name: 'Bitcoin', ticker: 'BTC', icon: siBitcoin, className: 'crypto-coin--btc' },
  { name: 'Ethereum', ticker: 'ETH', icon: siEthereum, className: 'crypto-coin--eth' },
  { name: 'USD Coin', ticker: 'USDC', className: 'crypto-coin--usdc' },
  { name: 'Solana', ticker: 'SOL', icon: siSolana, className: 'crypto-coin--sol' },
]

function CoinMark({ coin }: { coin: Coin }) {
  if (!coin.icon) {
    return <span className="crypto-coin-dollar">$</span>
  }

  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={coin.name}>
      <path d={coin.icon.path} />
    </svg>
  )
}

export default function CryptoHeroCoins() {
  return (
    <div className="crypto-orbit" aria-label="Bitcoin, Ethereum, USDC, and Solana tokens moving across payment rails">
      <div className="crypto-orbit-grid" aria-hidden="true" />
      <div className="crypto-orbit-ring crypto-orbit-ring--outer" aria-hidden="true" />
      <div className="crypto-orbit-ring crypto-orbit-ring--inner" aria-hidden="true" />
      <div className="crypto-orbit-core" aria-hidden="true">
        <span>TRUST</span>
        <strong>BY DESIGN</strong>
      </div>

      {COINS.map((coin, index) => (
        <motion.div
          className={`crypto-coin ${coin.className}`}
          key={coin.ticker}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
          transition={{
            opacity: { duration: 0.45, delay: 0.18 + index * 0.08 },
            scale: { duration: 0.55, delay: 0.18 + index * 0.08, type: 'spring' },
            y: { duration: 4.2 + index * 0.55, repeat: Infinity, ease: 'easeInOut', delay: index * -0.7 },
          }}
        >
          <span className="crypto-coin-face">
            <CoinMark coin={coin} />
          </span>
          <span className="crypto-coin-ticker">{coin.ticker}</span>
        </motion.div>
      ))}

      <span className="crypto-orbit-status crypto-orbit-status--top" aria-hidden="true">QUOTE LOCKED</span>
      <span className="crypto-orbit-status crypto-orbit-status--bottom" aria-hidden="true">RECEIPT VERIFIED</span>
    </div>
  )
}
