import { useRef, useState, useCallback, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
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
        <p>Two players, one keyboard, 90 seconds. Race to serve sushi orders faster than your opponent. Each button maps to an ingredient &mdash; press the right sequence to complete orders and earn combo multipliers.</p>
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
              background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 50%, #C94C4C 150%)',
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
          <span className="cs-label-row-key">Goal</span>
          <span className="cs-label-row-val">Complete more sushi orders than your opponent in 90 seconds</span>
        </div>
        <div className="cs-label-row">
          <span className="cs-label-row-key">Player 1</span>
          <span className="cs-label-row-val">Left-side keys (Q, W, E, R, A, S, D, F) &mdash; each maps to an ingredient</span>
        </div>
        <div className="cs-label-row">
          <span className="cs-label-row-key">Player 2</span>
          <span className="cs-label-row-val">Right-side keys (U, I, O, P, J, K, L, ;) &mdash; each maps to an ingredient</span>
        </div>
        <div className="cs-label-row">
          <span className="cs-label-row-key">Gameplay</span>
          <span className="cs-label-row-val">Orders appear on screen. Press the matching ingredient buttons in the correct sequence.</span>
        </div>
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
        <meta name="description" content="The Omakase is a 2-player party arcade game where sushi chefs compete to serve customers, a creative technology and game design project." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="The Omakase · Parth Pawar" />
        <meta property="og:description" content="2-player party arcade game where sushi chefs compete to serve customers." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/the-omakase.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#C94C4C' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Creative Technology', 'Game Design']}
          title="The Omakase"
          subtitle="2-player party arcade game where sushi chefs compete to serve customers"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Creator' },
          ]}
        />

        {/* Hero photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/cabinet-front.webp" alt="The Omakase arcade cabinet: plywood body, monitor, RGB button controllers" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/cabinet-workshop.webp" alt="The Omakase cabinet in the ITP workshop during build" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Video */}
        <section className="cs-slide reveal">
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

        {/* Overview */}
        <CsSection label="Overview" title="Serve or Be Served">
          <CsBody>
            <p>The Omakase is a 2-player competitive arcade game where two sushi chefs race to serve customers their feast before their opponent does. Built from scratch as a custom arcade cabinet, the game combines physical computing, game design, and fabrication into a single cohesive experience. Each player commands a set of 8 RGB LED buttons that shift color throughout gameplay, requiring fast pattern recognition, sharp reflexes, and a willingness to get a little messy under pressure.</p>
            <p>The project was conceived as a thesis exploration into how physical arcade games can create spontaneous social moments between strangers. It was exhibited at the ITP Spring Show 2024 at NYU and later shown at Wonderville Brooklyn, an indie arcade bar in Bushwick.</p>
            <p><a href="https://vill4n3lle.itch.io/the-omakase" target="_blank" rel="noopener noreferrer">Play at vill4n3lle.itch.io/the-omakase &rarr;</a></p>
          </CsBody>
        </CsSection>

        {/* Gameplay photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/rgb-buttons-hands.png" alt="Close-up: two players' hands on glowing RGB arcade buttons" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/game-screen-sushi.png" alt="Game screen showing sushi conveyor belt and RGB-matched ingredients" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/rgb-buttons-dark.png" alt="RGB buttons glowing in the dark, colorful arcade atmosphere" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Players and exhibition */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/two-players.webp" alt="Two players competing at the arcade cabinet at exhibition" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/the-omakase/photos/team-photo.webp" alt="Team photo in front of The Omakase cabinet at exhibition" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Play the game */}
        <GameEmbed />

        {/* Challenge */}
        <section className="cs-section reveal" id="cs-challenge">
          <div className="wrap">
            <p className="cs-section-label">00 &mdash; Challenge</p>
            <h3 className="cs-section-title">The Design Challenge</h3>
            <CsBody>
              <p>The core challenge was deceptively simple: design a physical arcade game that two complete strangers can walk up to, understand immediately, and play competitively in under three minutes. That constraint shaped every decision that followed.</p>
              <p>Most arcade games at exhibitions fail one of two ways. They are either too complex for a first-time player to pick up without instruction, or too shallow to hold attention past the first thirty seconds. The Omakase needed to land in the narrow space between those extremes &mdash; instantly readable rules, but enough depth that the second round feels different from the first. The game also had to work in an exhibition context where noise levels are high, attention spans are short, and there is always a line of people waiting for their turn.</p>
              <p>A secondary challenge was designing for physicality. Unlike screen-based games, the cabinet itself had to communicate how to play. Button layout, color feedback, and the spatial relationship between the two players all had to do instructional work that a tutorial screen would normally handle. The game needed to teach itself.</p>
            </CsBody>
          </div>
        </section>

        {/* Gameplay */}
        <section className="cs-section reveal" id="cs-gameplay">
          <div className="wrap">
            <p className="cs-section-label">01 &mdash; Gameplay</p>
            <h3 className="cs-section-title">Gameplay</h3>
            <CsBody>
              <p>Two players face off as competing sushi chefs, standing side by side at the cabinet. Each player has 8 color-changing buttons mapped to different sushi ingredients &mdash; salmon, tuna, shrimp, tamago, and so on. Customer orders appear on the shared screen, and players race to press the correct ingredient sequence before their opponent completes theirs.</p>
              <p>The sushi theme was chosen deliberately. Sushi is universally recognizable, its ingredients are visually distinct, and the concept of an omakase &mdash; a chef&rsquo;s choice tasting menu &mdash; gave the game a natural narrative arc. Each round is a &ldquo;course,&rdquo; and the escalating difficulty mirrors the progression of a real omakase meal from simple nigiri to elaborate rolls. The theme also made color-coding intuitive: players could map salmon-pink to salmon and wasabi-green to wasabi without any text labels.</p>
              <p>Competitive mode was chosen over cooperative after early playtesting revealed that side-by-side competition created far more energy and social interaction than cooperative play did. When two strangers cooperate, they tend to be polite and reserved. When they compete, they laugh, trash-talk, and lean into the experience. That energy was essential for an exhibition setting where the game needed to draw a crowd.</p>
              <p>Scoring rewarded both speed and accuracy. Each correct ingredient in a sequence earned base points, but completing a full order without mistakes triggered a combo multiplier. Pressing a wrong ingredient broke the combo and added a brief cooldown penalty, discouraging random button-mashing. This created a risk-reward dynamic: rushing was faster but sloppier, while deliberate play was safer but left you vulnerable to a faster opponent. Rounds lasted 90 seconds, long enough for momentum swings but short enough to keep the queue moving.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="/Assets/Projects/the-omakase/photos/cabinet-front.webp" alt="The Omakase gameplay" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="/Assets/Projects/the-omakase/photos/rgb-buttons-hands.png" alt="The Omakase gameplay detail" loading="lazy" />
          </div>
        </section>

        {/* Fabrication */}
        <section className="cs-section reveal" id="cs-fabrication">
          <div className="wrap">
            <p className="cs-section-label">02 &mdash; Fabrication</p>
            <h3 className="cs-section-title">Fabrication</h3>
            <CsBody>
              <p>The custom arcade cabinet was built with laser-cut birch plywood panels, an Arduino Mega 2560, and 16 individually addressable RGB LED arcade buttons &mdash; 8 per player. The cabinet design references classic Japanese candy cab aesthetics with a sloped control panel and a shared upright screen, adapted for a two-player head-to-head layout.</p>
              <p>Laser cutting was chosen over CNC routing or 3D printing for several practical reasons. The plywood panels needed to be large, flat, and precisely interlocking. Laser cutting gave clean finger joints that slotted together without fasteners, making the cabinet easy to assemble and disassemble for transport between exhibition venues. The entire cabinet breaks down into flat panels that fit in the back of a sedan &mdash; a critical requirement when you are hauling an arcade machine across Brooklyn on the subway and then in a rideshare.</p>
              <p>The Arduino Mega was selected over an Uno or a Raspberry Pi because the project needed a large number of digital I/O pins. Each RGB button requires four connections &mdash; one for the button input and three for the red, green, and blue LED channels. With 16 buttons, that is 64 pins for the LEDs alone, plus 16 for button inputs. The Mega&rsquo;s 54 digital I/O pins and 16 analog pins handled this comfortably. A multiplexer could have reduced the pin count on a smaller board, but direct wiring kept the latency imperceptible and the code straightforward, which mattered for a game where milliseconds of input lag would feel unfair.</p>
              <p>The RGB LED buttons were the most critical design element for player feedback. Each button glows in the color of its assigned ingredient during active play, making the mapping between screen and controls immediate and physical. When a player presses the wrong button, all their buttons flash red briefly. When they complete an order, the buttons cascade through a celebratory color animation. This meant players could stay focused on the physical controls rather than constantly glancing at the screen &mdash; the cabinet itself communicated game state through light.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="/Assets/Projects/the-omakase/photos/game-screen-sushi.png" alt="The Omakase fabrication" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="/Assets/Projects/the-omakase/photos/rgb-buttons-dark.png" alt="The Omakase cabinet detail" loading="lazy" />
          </div>
        </section>

        {/* Exhibition */}
        <section className="cs-section reveal" id="cs-exhibition">
          <div className="wrap">
            <p className="cs-section-label">03 &mdash; Exhibition</p>
            <h3 className="cs-section-title">Exhibition</h3>
            <CsBody>
              <p>The Omakase debuted at the ITP Spring Show 2024 at NYU&rsquo;s Tisch School of the Arts, a two-day public exhibition that draws over 5,000 visitors. Over the course of the show, more than 200 people played the game, with a consistent line forming throughout both days. The cabinet became one of the busiest installations on the floor, partly because the competitive format naturally created spectators &mdash; people would stop to watch a match, then get in line for the next one.</p>
              <p>The reaction was overwhelmingly positive and, more importantly, exactly the kind of social energy the project was designed to generate. Strangers cheered each other on, rematch requests were constant, and several players came back multiple times across both days. One of the most gratifying observations was that players who had never met would leave the cabinet talking to each other &mdash; the shared competitive experience broke the social barrier that usually exists between strangers at a crowded exhibition.</p>
              <p>The game was later shown at Wonderville Brooklyn, an indie arcade bar in Bushwick that hosts experimental and independent arcade games. Playing in a bar context versus an academic exhibition was a very different experience. The energy was louder, the competition more intense, and the social dynamics shifted &mdash; players were more willing to trash-talk and celebrate dramatically. The game held up well in both contexts, which validated the core design decisions around simplicity and immediacy.</p>
              <p>If I were to revisit the project, I would make two changes. First, I would add a simple high-score leaderboard displayed on the cabinet between matches. During the show, players kept asking what the highest score was, and not having that visible meant losing a layer of motivation and social competition. Second, I would redesign the wiring harness inside the cabinet. It worked, but servicing a loose connection mid-show required partially disassembling the control panel, which cost about twenty minutes of downtime on day one.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="/Assets/Projects/the-omakase/photos/team-photo.webp" alt="The Omakase at ITP Spring Show" loading="lazy" />
          </div>
        </section>

        {/* Reflections */}
        <section className="cs-section reveal" id="cs-reflections">
          <div className="wrap">
            <p className="cs-section-label">04 &mdash; Reflections</p>
            <h3 className="cs-section-title">Reflections</h3>
            <CsBody>
              <p><strong>Physical feedback changes everything.</strong> The single biggest lesson from this project was how much the RGB LED buttons transformed the play experience. Early prototypes used keyboard input on a laptop, and players constantly lost track of which key mapped to which ingredient. The moment the buttons lit up in their ingredient colors, onboarding time dropped from about 60 seconds of explanation to near-zero. People walked up and started playing. The physicality of the controls &mdash; the satisfying click of an arcade button, the color flashing under your fingers &mdash; created a feedback loop that no screen-only interface could match.</p>
              <p><strong>Design for the line, not just the player.</strong> In an exhibition context, the experience of waiting matters almost as much as the experience of playing. The side-by-side competitive layout meant spectators could see both players&rsquo; hands and the screen simultaneously, turning every match into a performance. This was not planned &mdash; it was a fortunate consequence of the cabinet&rsquo;s form factor &mdash; but it taught me to think about the entire social context of a physical game, not just the two people holding the controls.</p>
              <p><strong>Constraints are generative.</strong> The 90-second round timer, the 8-button limit per player, the requirement to be transportable &mdash; every constraint that felt limiting during design ended up producing a tighter, more focused experience. Without the transport constraint, the cabinet would have been larger and more impressive-looking but impossible to exhibit anywhere outside ITP. Without the button limit, the game would have been more complex but harder to learn. The project reinforced that creative technology work benefits enormously from self-imposed constraints, especially when the goal is public-facing work that needs to be accessible to everyone.</p>
            </CsBody>
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-play', label: 'Play' },
          { id: 'cs-challenge', label: 'Challenge' },
          { id: 'cs-gameplay', label: 'Gameplay' },
          { id: 'cs-fabrication', label: 'Fabrication' },
          { id: 'cs-exhibition', label: 'Exhibition' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

      <NextProject slug="moniac-machine" title="Moniac Machine" image="/Assets/images/moniac-machine.jpg" />
      <Footer />
    </>
  )
}
