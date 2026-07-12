import { useRef, useState, useCallback, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

function useIsTouch() {
  const [touch, setTouch] = useState(() =>
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  )
  useEffect(() => {
    // Re-check on pointer type change (2-in-1 devices, tablets with keyboards)
    const check = (e: PointerEvent) => {
      if (e.pointerType === 'touch') setTouch(true)
      else if (e.pointerType === 'mouse') setTouch(false)
    }
    window.addEventListener('pointerdown', check, { passive: true })
    return () => window.removeEventListener('pointerdown', check)
  }, [])
  return touch
}

// ── Visual keyboard diagram showing both players' controls ──
function KeyboardDiagram() {
  // Darker, more saturated colors that read well on both light and dark backgrounds
  const ingredients = [
    { label: 'Tuna',    color: '#D32F2F' },
    { label: 'Salmon',  color: '#E64A19' },
    { label: 'Tamago',  color: '#F9A825' },
    { label: 'Wasabi',  color: '#2E7D32' },
    { label: 'Shrimp',  color: '#1565C0' },
    { label: 'Octopus', color: '#7B1FA2' },
    { label: 'Rice',    color: '#6D4C41' },
    { label: 'Nori',    color: '#1B5E20' },
  ]
  const p1 = ['Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F']
  const p2 = ['U', 'I', 'O', 'P', 'J', 'K', 'L', ';']

  const KeyCap = ({ letter, ing }: { letter: string; ing: typeof ingredients[0] }) => (
    <div style={{
      width: 52, height: 48, borderRadius: 8,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: `${ing.color}15`, border: `2px solid ${ing.color}`,
      fontFamily: 'var(--mono)', lineHeight: 1, gap: 3,
      position: 'relative',
    }}>
      {/* Key letter */}
      <span style={{ fontSize: '16px', fontWeight: 700, color: ing.color }}>
        {letter}
      </span>
      {/* Ingredient label */}
      <span style={{
        fontSize: '6.5px', fontWeight: 500, letterSpacing: '0.04em',
        textTransform: 'uppercase', color: ing.color, opacity: 0.8,
      }}>
        {ing.label}
      </span>
      {/* Color dot */}
      <div style={{
        position: 'absolute', top: 4, right: 4,
        width: 5, height: 5, borderRadius: '50%',
        background: ing.color,
      }} />
    </div>
  )

  const Player = ({ keys, label }: { keys: string[]; label: string }) => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
    }}>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 600,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        color: 'var(--ink-50)',
      }}>
        {label}
      </span>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 52px)', gap: 5,
        padding: '12px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--ink-03)',
        border: '1px solid var(--ink-06)',
      }}>
        {keys.map((k, i) => (
          <KeyCap key={k} letter={k} ing={ingredients[i]} />
        ))}
      </div>
    </div>
  )

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      gap: 'clamp(20px, 5vw, 48px)',
      flexWrap: 'wrap', padding: 'var(--space-4) 0',
    }}>
      <Player keys={p1} label="Player 1 (Left)" />
      <Player keys={p2} label="Player 2 (Right)" />
    </div>
  )
}

function GameEmbed() {
  const IS_TOUCH = useIsTouch()
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [iframeReady, setIframeReady] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen()
    else el.requestFullscreen()
  }, [])

  // itch.io blocks iframes from their main page URL (X-Frame-Options).
  // Use the direct HTML embed endpoint with the upload ID instead.
  const GAME_URL = 'https://html-classic.itch.zone/html/5754166/index.html'

  return (
    <CsSection id="cs-play" label="Play" title="Try The Omakase">
      <CsBody>
        <p>Two players, one keyboard, 90 seconds. Race to serve sushi orders faster than your opponent. Each button maps to an ingredient &mdash; press the right sequence to complete orders.</p>
      </CsBody>

      {/* Game container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative', width: '100%', aspectRatio: '16 / 9',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          background: '#1a1a2e',
          border: '1px solid var(--ink-06)',
          boxShadow: 'var(--shadow-lg)',
          marginTop: 'var(--space-5)',
        }}
      >
        {IS_TOUCH ? (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 'var(--space-4)', padding: 'var(--space-6)', textAlign: 'center',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 100%)',
          }}>
            <span style={{ fontSize: '2.5rem' }}>🍣</span>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 300, color: '#fff', lineHeight: 1.3, maxWidth: '24ch' }}>
              The Omakase needs a keyboard for 2-player action
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.5)', maxWidth: '32ch', lineHeight: 1.6 }}>
              Visit on desktop to play, or try it directly on itch.io
            </p>
            <a href="https://vill4n3lle.itch.io/the-omakase" target="_blank" rel="noopener noreferrer" className="pill-link" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', marginTop: 'var(--space-2)', textDecoration: 'none' }}>
              Play on itch.io &rarr;
            </a>
          </div>
        ) : !loaded ? (
          <button
            onClick={() => setLoaded(true)}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 50%, #8B5E3C 150%)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)',
              transition: 'filter 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.15)' }}
            onMouseLeave={e => { e.currentTarget.style.filter = '' }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="8,5 20,12 8,19" /></svg>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-2xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
              Click to load game
            </span>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.35)', marginTop: '-0.25rem' }}>
              Built with Unity &middot; 2-player local multiplayer
            </span>
          </button>
        ) : (
          <>
            {/* Loading spinner while Unity boots */}
            {!iframeReady && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 12, background: '#1a1a2e',
              }}>
                <div style={{
                  width: 32, height: 32, border: '2px solid rgba(255,255,255,0.1)',
                  borderTopColor: 'rgba(255,255,255,0.5)', borderRadius: '50%',
                  animation: 'omakase-spin 0.8s linear infinite',
                }} />
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                }}>
                  Loading Unity game&hellip;
                </span>
              </div>
            )}
            <iframe
              src={GAME_URL}
              allowFullScreen
              allow="autoplay; fullscreen"
              onLoad={() => setIframeReady(true)}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              title="Play The Omakase"
            />
            <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2, display: 'flex', gap: 4 }}>
              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                style={{
                  width: 28, height: 28, borderRadius: 'var(--radius)',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {isFullscreen
                    ? <path d="M4 1v3H1M12 1v3h3M4 15v-3H1M12 15v-3h3" />
                    : <path d="M1 5V1h4M15 5V1h-4M1 11v4h4M15 11v4h-4" />}
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Visual keyboard layout */}
      {!IS_TOUCH && (
        <div style={{ marginTop: 'var(--space-6)' }}>
          <h3 className="cs-section-subtitle" style={{ marginBottom: 'var(--space-3)' }}>Controls</h3>
          <KeyboardDiagram />
        </div>
      )}

      {/* How to play — detailed guide below the game */}
      <div style={{ marginTop: 'var(--space-6)' }}>
        <h3 className="cs-section-subtitle" style={{ marginBottom: 'var(--space-4)' }}>How to Play</h3>

        <div className="cs-label-row">
          <span className="cs-label-row-key">Combos</span>
          <span className="cs-label-row-val">Complete orders without mistakes to earn combo multipliers for bonus points</span>
        </div>
        <div className="cs-label-row">
          <span className="cs-label-row-key">Mistakes</span>
          <span className="cs-label-row-val">Wrong ingredient = red flash + brief cooldown penalty. Don&rsquo;t mash!</span>
        </div>
        <div className="cs-label-row">
          <span className="cs-label-row-key">Tip</span>
          <span className="cs-label-row-val">Watch the button colors &mdash; each glows in its ingredient&rsquo;s color. Salmon = pink, wasabi = green, etc.</span>
        </div>
      </div>

      {!IS_TOUCH && (
        <p style={{
          fontFamily: 'var(--mono)', fontSize: 'var(--text-2xs)',
          color: 'var(--ink-30)', letterSpacing: '0.06em',
          textAlign: 'center', marginTop: 'var(--space-4)',
        }}>
          Game not loading? <a href="https://vill4n3lle.itch.io/the-omakase" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-50)', textDecoration: 'underline' }}>Play directly on itch.io</a>
        </p>
      )}

      <style>{`
        @keyframes omakase-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 480px) {
          .omakase-divider { display: none; }
        }
      `}</style>
    </CsSection>
  )
}

export default function TheOmakasePage() {
  return (
    <>
      <Helmet>
        <title>The Omakase &middot; Parth Pawar</title>
        <meta name="description" content="A two-player sushi arcade cabinet where custom hardware, RGB controls, and social pacing make the game." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="The Omakase · Parth Pawar" />
        <meta property="og:description" content="A playable arcade cabinet built around fast onboarding, competition, and custom RGB controls." />
        <meta property="og:image" content="https://designwhich.works/Assets/mockups/projects/the-omakase_16x9.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#8B5E3C' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Creative Technology', 'Game Design']}
          title="The Omakase"
          subtitle="A two-player sushi arcade cabinet where the hardware, pacing, and social pressure are the game"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Game designer + fabricator' },
          ]}
        />

        {/* Video */}
        <section className="cs-slide reveal" id="cs-film">
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/996020990?h=&badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0" loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="The Omakase"
            />
          </div>
        </section>

        {/* Play the game */}
        <GameEmbed />

        <CsExpandPreview
          cta="Open the build and exhibition proof"
          note="Cabinet photos, gameplay details, fabrication notes, exhibition proof, and reflections."
        >
        {/* Hero photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/cabinet-front.webp" alt="The Omakase arcade cabinet: plywood body, monitor, RGB button controllers" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/cabinet-workshop.webp" alt="The Omakase cabinet in the ITP workshop during build" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        {/* Gameplay photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1.25fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/rgb-buttons-hands.webp" alt="Close-up: two players' hands on glowing RGB arcade buttons" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/game-screen-sushi.webp" alt="Game screen showing sushi conveyor belt and RGB-matched ingredients" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal" style={{ gridColumn: '1 / -1' }}><img src="/Assets/Projects/the-omakase/photos/rgb-buttons-dark.webp" alt="RGB buttons glowing in the dark, colorful arcade atmosphere" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        {/* Players and exhibition */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/two-players.webp" alt="Two players competing at the arcade cabinet at exhibition" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/team-photo.webp" alt="Team photo in front of The Omakase cabinet at exhibition" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        {/* Gameplay */}
        <section className="cs-section reveal" id="cs-gameplay">
          <div className="wrap">
            <p className="cs-section-label">01 &mdash; Gameplay</p>
            <h3 className="cs-section-title">Gameplay</h3>
            <CsBody>
              <p>The cabinet had to teach the game without a tutorial. Each player gets eight color-changing ingredient buttons, and the screen uses the same colors so the mapping is learned by looking and pressing.</p>
              <p>The best design move was making it competitive. Two players stand shoulder to shoulder, race through 90-second sushi orders, and create a small crowd just by playing.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <figure className="cs-img reveal" style={{ margin: 0 }}>
              <img src="/Assets/Projects/the-omakase/photos/chef-select-screen.webp" alt="Chef select screen — Chef Shiro versus Chef Kuro, each player's sushi likes, and a color-coded button legend for dropping sushi and changing belt direction" loading="lazy" decoding="async" />
              <figcaption className="cs-img-caption">The whole rulebook fits on one screen: pick your chef, match button colors to customers, go.</figcaption>
            </figure>
          </div>
          <div className="wrap">
            <figure className="cs-img reveal" style={{ margin: 0 }}>
              <img src="/Assets/Projects/the-omakase/photos/play-dark-buttons-screen.webp" alt="Over a player's shoulder in the dark: the sushi conveyor belt on screen above two clusters of glowing RGB buttons under their hands" loading="lazy" decoding="async" />
              <figcaption className="cs-img-caption">The mapping in action — customers on screen glow in the same colors as the buttons under your fingers.</figcaption>
            </figure>
          </div>
        </section>

        {/* Fabrication */}
        <section className="cs-section reveal" id="cs-fabrication">
          <div className="wrap">
            <p className="cs-section-label">02 &mdash; Fabrication</p>
            <h3 className="cs-section-title">Fabrication</h3>
            <CsBody>
              <p>Built from laser-cut birch plywood, the cabinet breaks down into flat panels for transport. The sloped control deck borrows from Japanese candy cab layouts, but is tuned for two people playing side by side.</p>
              <p>An Arduino Mega drives 16 RGB arcade buttons. The button light is the interface: ingredient color, wrong-input flash, and order-complete celebration all happen under the player&rsquo;s fingers.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/plywood-shell-drilled.webp" alt="Bare varnished plywood shell of the cabinet with two clusters of eight drilled button holes, before any hardware went in" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/marquee-sign-detail.webp" alt="Close-up of the marquee: THE OMAKASE. in a pixel typeface on birch plywood" loading="lazy" decoding="async" /></div>
            </div>
            <p className="cs-img-caption" style={{ marginTop: '0.75rem' }}>Left: the shell after drilling — 8 button holes per player, no hardware yet. Right: the pixel-type marquee that ties the cabinet to the game&rsquo;s art.</p>
          </div>
        </section>

        {/* Exhibition */}
        <section className="cs-section reveal" id="cs-exhibition">
          <div className="wrap">
            <p className="cs-section-label">03 &mdash; Exhibition</p>
            <h3 className="cs-section-title">Exhibition</h3>
            <CsBody>
              <p>At the ITP Spring Show 2024, 200+ people played and a line formed around the cabinet. The format worked because every match was also a performance for the people waiting.</p>
              <p>It later held up at Wonderville Brooklyn, where the louder bar context pushed the same core loop harder: fast onboarding, visible competition, instant rematches.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <figure className="cs-img reveal" style={{ margin: 0 }}>
              <img src="/Assets/Projects/the-omakase/photos/head-to-head-match.webp" alt="Two players seen from behind, mid-match at the cabinet — scores of $115 and $50 on the shared screen, buttons glowing under their hands" loading="lazy" decoding="async" />
              <figcaption className="cs-img-caption">Mid-match: $115 to $50 with time left — exactly the momentum swings the 90-second rounds were tuned for.</figcaption>
            </figure>
          </div>
        </section>

        {/* Reflections */}
        <section className="cs-section reveal" id="cs-reflections">
          <div className="wrap">
            <p className="cs-section-label">04 &mdash; Reflections</p>
            <h3 className="cs-section-title">Reflections</h3>
            <CsBody>
              <p><strong>Physical feedback changes everything.</strong> The RGB buttons cut onboarding from explanation to instinct. People understood the game because the controls lit up with meaning.</p>
              <p><strong>Design for spectators too.</strong> The cabinet made waiting part of the experience: people watched hands, scores, mistakes, and celebrations before stepping up.</p>
              <p><strong>Constraints made it sharper.</strong> 90-second rounds, eight buttons per player, and a transportable cabinet forced the game to stay simple, learnable, and public-ready.</p>
            </CsBody>
          </div>
        </section>

        <CsThanks />

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-film', label: 'Film' },
          { id: 'cs-play', label: 'Play' },
          { id: 'cs-gameplay', label: 'Gameplay' },
          { id: 'cs-fabrication', label: 'Fabrication' },
          { id: 'cs-exhibition', label: 'Exhibition' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

      <NextProject slug="ibm" title="IBM Cancer Prognosis" image="/Assets/Projects/ibm/1.webp" />
      <Footer />
    </>
  )
}
