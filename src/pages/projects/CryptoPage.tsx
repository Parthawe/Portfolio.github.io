import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export default function CryptoPage() {
  return (
    <>
      <Helmet>
        <title>Crypto &amp; Web3 &middot; Parth Pawar</title>
        <meta name="description" content="Product design for crypto and Web3 — secure, user-friendly interfaces for DeFi, cross-border payments, and blockchain products." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Crypto & Web3 · Parth Pawar" />
        <meta property="og:description" content="Product design for crypto and Web3 — secure, user-friendly interfaces for DeFi and blockchain." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/zentipay.png" />
      </Helmet>

      <Nav />

      <main id="main-content" style={{ '--lp-accent': '#8b5cf6' } as React.CSSProperties}>
        <div className="wrap">

          <div className="lp-hero reveal">
            <div className="lp-hero-grid">
              <div>
                <h1 className="lp-hero-title">Crypto<br /><span className="lp-hero-accent">&amp; Web3</span></h1>
              </div>
              <div className="lp-hero-right">
                <p className="lp-hero-intro">Building secure, user-friendly interfaces that make DeFi tools, cross-border payments, and blockchain products accessible to everyone.</p>
                <div className="lp-stats">
                  <span className="lp-stat">$50M+ monthly volume</span>
                  <span className="lp-stat">2 products shipped</span>
                  <span className="lp-stat">3+ years in Web3</span>
                </div>
                <div className="lp-tools">
                  <span className="lp-tool">Figma</span>
                  <span className="lp-tool">Token Design</span>
                  <span className="lp-tool">DeFi Protocols</span>
                  <span className="lp-tool">Compliance UX</span>
                  <span className="lp-tool">Payment Rails</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="lp-divider" />

          <Link to="/zentipay" className="lp-featured reveal" style={{ background: '#f0ecff' }}>
            <div className="lp-featured-img"><img src="/Assets/images/zentipay.png" alt="ZentiPay" loading="eager" /></div>
            <div className="lp-featured-body">
              <div>
                <h2 className="lp-featured-title">ZentiPay</h2>
                <p className="lp-featured-desc">Fintech super app &mdash; 30% higher transaction completion</p>
              </div>
              <span className="lp-featured-role">Founding Designer &middot; 2025</span>
            </div>
          </Link>

          <p className="lp-section-label">More Projects</p>
          <section className="work-group">
            <div className="pcard-row">
              <Link className="pcard reveal" to="/transfi">
                <div className="pcard-img"><img src="/Assets/images/transfi.jpg" alt="TransFi" loading="lazy" /></div>
                <div className="pcard-body">
                  <h2 className="pcard-name">TransFi</h2>
                  <p className="pcard-result">Crypto payments &mdash; $50M+ monthly volume</p>
                  <span className="pcard-role">Lead Designer &middot; 2022&ndash;23</span>
                </div>
              </Link>
              <div className="pcard pcard--empty"></div>
            </div>
          </section>

          <div className="lp-approach reveal">
            <p className="lp-approach-label">Design Approach</p>
            <div className="lp-pillars">
              <div>
                <span className="lp-pillar-num">01</span>
                <p className="lp-pillar-title">Trust-first interfaces</p>
                <p className="lp-pillar-desc">High-stakes financial flows where a single wrong click costs thousands &mdash; every interaction prioritizes clarity and confirmation.</p>
              </div>
              <div>
                <span className="lp-pillar-num">02</span>
                <p className="lp-pillar-title">Regulatory awareness</p>
                <p className="lp-pillar-desc">KYC/AML flows and compliance screens that satisfy regulators without destroying the user experience.</p>
              </div>
              <div>
                <span className="lp-pillar-num">03</span>
                <p className="lp-pillar-title">Cross-border simplicity</p>
                <p className="lp-pillar-desc">Multi-currency, multi-rail payment systems distilled into flows that feel as easy as sending a text.</p>
              </div>
            </div>
          </div>

        </div>

        <section className="cta-v2">
          <div className="wrap cta-v2-inner">
            <h2 className="lp-cta-headline">Building in crypto?</h2>
            <p className="lp-cta-sub">I&rsquo;ve shipped products handling $50M+ monthly volume. Let&rsquo;s talk.</p>
            <a href="mailto:parthpawar@nyu.edu" className="cta-v2-btn magnetic">
              parthpawar@nyu.edu
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
