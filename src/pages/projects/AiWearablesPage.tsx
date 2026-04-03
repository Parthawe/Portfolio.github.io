import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export default function AiWearablesPage() {
  return (
    <>
      <Helmet>
        <title>AI &amp; Wearables &middot; Parth Pawar</title>
        <meta name="description" content="Intelligent interfaces for AI-powered products, smart glasses, voice assistants, developer tools, and conversational AI." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="AI & Wearables · Parth Pawar" />
        <meta property="og:description" content="Intelligent interfaces for AI-powered products, smart glasses, voice assistants, and conversational AI." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/oncall-lens.png" />
      </Helmet>

      <Nav />

      <main id="main-content" style={{ '--lp-accent': '#ec4899' } as React.CSSProperties}>
        <div className="wrap">

          <div className="lp-hero reveal">
            <div className="lp-hero-grid">
              <div>
                <h1 className="lp-hero-title">AI &amp;<br /><span className="lp-hero-accent">Wearables</span></h1>
              </div>
              <div className="lp-hero-right">
                <p className="lp-hero-intro">Intelligent interfaces for AI-powered products, smart glasses, voice assistants, developer tools, and conversational AI.</p>
                <div className="lp-stats">
                  <span className="lp-stat">4 AI/wearable products</span>
                  <span className="lp-stat">Smart glasses to voice</span>
                  <span className="lp-stat">On-device ML</span>
                </div>
                <div className="lp-tools">
                  <span className="lp-tool">Figma</span>
                  <span className="lp-tool">AR Prototyping</span>
                  <span className="lp-tool">Voice UI</span>
                  <span className="lp-tool">LLM Integration</span>
                  <span className="lp-tool">Gesture Design</span>
                  <span className="lp-tool">Responsible AI</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="lp-divider" />

          <Link to="/clawed-chat" className="lp-featured reveal" style={{ background: '#fdf2f8' }}>
            <div className="lp-featured-img"><img src="/Assets/images/clawed.png" alt="Clawed" loading="eager" /></div>
            <div className="lp-featured-body">
              <div>
                <h2 className="lp-featured-title">Clawed</h2>
                <p className="lp-featured-desc">Safety-first AI assistant for glasses and web</p>
              </div>
              <span className="lp-featured-role">Product Designer &middot; 2026</span>
            </div>
          </Link>

          <p className="lp-section-label">More Projects</p>
          <section className="work-group">
            <div className="pcard-row">
              <Link className="pcard reveal" to="/oncall-lens">
                <div className="pcard-img"><img src="/Assets/images/oncall-lens.png" alt="OnCall Lens" loading="lazy" /></div>
                <div className="pcard-body">
                  <h2 className="pcard-name">OnCall Lens</h2>
                  <p className="pcard-result">Sentry alerts to automated PR fixes via smart glasses</p>
                  <span className="pcard-role">Designer + Developer &middot; 2026</span>
                </div>
              </Link>
              <Link className="pcard reveal" to="/ai-voice">
                <div className="pcard-img"><img src="/Assets/images/ai-voice.png" alt="AI Voice Interface" loading="lazy" /></div>
                <div className="pcard-body">
                  <h2 className="pcard-name">AI Voice Interface</h2>
                  <p className="pcard-result">Conversational AI and voice-driven interaction</p>
                  <span className="pcard-role">Designer &middot; 2025</span>
                </div>
              </Link>
            </div>
            <div className="pcard-row">
              <Link className="pcard reveal" to="/ballah-code">
                <div className="pcard-img"><img src="/Assets/images/ballah-code.png" alt="Ballah Code" loading="lazy" /></div>
                <div className="pcard-body">
                  <h2 className="pcard-name">Ballah Code</h2>
                  <p className="pcard-result">AI-powered dev tools platform</p>
                  <span className="pcard-role">Designer &middot; 2026</span>
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
                <p className="lp-pillar-title">Context-aware</p>
                <p className="lp-pillar-desc">Glanceable, ambient, minimal cognitive load.</p>
              </div>
              <div>
                <span className="lp-pillar-num">02</span>
                <p className="lp-pillar-title">Safety-first AI</p>
                <p className="lp-pillar-desc">Guardrails, transparency, user control.</p>
              </div>
              <div>
                <span className="lp-pillar-num">03</span>
                <p className="lp-pillar-title">Beyond the screen</p>
                <p className="lp-pillar-desc">Voice, gesture, spatial, interactions that feel natural.</p>
              </div>
            </div>
          </div>

        </div>

        <section className="cta-v2">
          <div className="wrap cta-v2-inner">
            <h2 className="lp-cta-headline">Designing wearable AI?</h2>
            <p className="lp-cta-sub">From HUD overlays to voice interfaces, I design the future of interaction.</p>
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
