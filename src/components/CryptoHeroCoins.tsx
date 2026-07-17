import { motion } from 'framer-motion'
import { siBitcoin, siEthereum, siSolana, type SimpleIcon } from 'simple-icons'

type Coin = {
  name: string
  ticker: string
  icon: SimpleIcon
  color: string
}

const COINS: Coin[] = [
  { name: 'Bitcoin', ticker: 'BTC', icon: siBitcoin, color: '#f7931a' },
  { name: 'Ethereum', ticker: 'ETH', icon: siEthereum, color: '#627eea' },
  { name: 'Solana', ticker: 'SOL', icon: siSolana, color: '#28d9a5' },
]

function CoinMark({ coin }: { coin: Coin }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={coin.name} style={{ color: coin.color }}>
      <path d={coin.icon.path} />
    </svg>
  )
}

export default function CryptoHeroCoins() {
  return (
    <div className="crypto-stage" aria-label="A crypto payment settlement flow designed around clear fees, status, and recovery">
      <motion.span
        className="crypto-stage-coin crypto-stage-coin--btc"
        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -6, y: [0, -5, 0] }}
        transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.6, type: 'spring' }, y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' } }}
        aria-hidden="true"
      >
        <CoinMark coin={COINS[0]} />
      </motion.span>

      <motion.span
        className="crypto-stage-coin crypto-stage-coin--eth"
        initial={{ opacity: 0, scale: 0.7, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 5, y: [0, 5, 0] }}
        transition={{ opacity: { duration: 0.4, delay: 0.1 }, scale: { duration: 0.6, delay: 0.1, type: 'spring' }, y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: -1.4 } }}
        aria-hidden="true"
      >
        <CoinMark coin={COINS[1]} />
      </motion.span>

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
