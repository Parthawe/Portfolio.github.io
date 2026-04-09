import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import MoniacSimulator from '../../components/MoniacSimulator'

export default function MoniacMachinePage() {
  return (
    <>
      <Helmet>
        <title>Moniac Machine &middot; Parth Pawar</title>
        <meta name="description" content="Economic strategy game inspired by the legendary 1949 Phillips hydraulic computer, a creative technology and game design project." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Moniac Machine &middot; Parth Pawar" />
        <meta property="og:description" content="Economic strategy game inspired by the legendary 1949 Phillips hydraulic computer." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/moniac-machine.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#2E7D32' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Creative Technology', 'Game Design']}
          title="Moniac Machine"
          subtitle="Economic strategy game inspired by the legendary 1949 Phillips hydraulic computer"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Creator' },
          ]}
        />

        {/* Hero photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/Moniac/photos/hero-cabinet.png" alt="Moniac Machine arcade cabinet with iPad display and valve controllers" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/Moniac/photos/annotated-breakdown.png" alt="Annotated breakdown: iPad, arcade wood, valve controllers, Teensy 4.0, wire connections" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Video */}
        <section className="cs-slide reveal">
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/996025152"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="Moniac Machine"
            />
          </div>
        </section>

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Overview</p>
            <h2 className="cs-display">Master the Economy</h2>
            <CsBody>
              <p>Dive into the world of Moniac Game, where you master the ebb and flow of a nation&rsquo;s fortunes. Drawing from the legendary 1949 Phillips Moniac Machine, you juggle fiscal levers and monetary policy while navigating financial crises. Each twist of a tax knob and allocation of government gold could either lift your economy to dizzying heights or plunge it into despair.</p>
              <p>The project translates an analog hydraulic computer into a digital interactive game, preserving the original&rsquo;s core insight: that economic systems are best understood through dynamic, real-time feedback rather than static equations on a page. Players experience cause and effect viscerally &mdash; raise taxes too aggressively and watch consumer spending collapse; slash interest rates and see inflation spiral within seconds.</p>
              <p>Designed as both an educational tool and a playful provocation, the Moniac Game invites players to confront the fundamental tension of macroeconomic policy: every lever you pull has unintended consequences, and the system never sits still long enough for a perfect solution. The goal is not to win, but to develop an intuitive feel for how interconnected economic variables truly are.</p>
            </CsBody>
          </div>
        </section>

        {/* Interactive simulator */}
        <CsSection id="cs-interactive" label="Interactive" title="Run the Economy">
          <CsBody>
            <p>Step into the role of an economic policymaker. Adjust 7 levers &mdash; tax rates, government spending, interest rates, investment, consumer spending, imports, and exports &mdash; and watch how the economy responds in real-time. Keep GDP and employment high while controlling inflation and debt. Random events will force you to adapt. You have 60 seconds.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Goal</span>
            <span className="cs-label-row-val">Maintain a healthy economy for 60 seconds &mdash; balance growth against stability</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Controls</span>
            <span className="cs-label-row-val">7 knobs: Tax Rate, Gov Spending, Interest, Investment, Consumer, Imports, Exports</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Events</span>
            <span className="cs-label-row-val">Random economic shocks (trade wars, pandemics, booms) test your strategy</span>
          </div>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <MoniacSimulator />
          </div>
        </CsSection>

        {/* Inspiration */}
        <CsSection id="cs-inspiration" label="01 &mdash; Inspiration" title="Inspiration">
          <CsBody>
            <p>The original MONIAC (Monetary National Income Analogue Computer) was a hydraulic machine built in 1949 by economist Bill Phillips. It used water flowing through pipes to model economic systems. This game translates that physical metaphor into a digital interactive experience.</p>
            <p>Phillips, a New Zealand economist at the London School of Economics, built the machine to demonstrate Keynesian economic theory in a way that lectures and textbooks could not. Water represented money flowing through the economy &mdash; taxes drained from one tank, government spending pumped into another, and the water level in the central reservoir represented national income. The machine was surprisingly accurate, and several universities acquired their own units for teaching.</p>
            <p>What struck me most about the original MONIAC was its commitment to making the invisible visible. Economic flows are abstract by nature &mdash; money moving between sectors, interest rates rippling through markets, inflation compounding over time. Phillips turned all of that into something you could see, hear, and touch. The game I built carries that same philosophy into a digital context, using real-time visual feedback and tangible controls to make macroeconomic dynamics feel immediate and consequential.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/Moniac/photos/screen-closeup.png" alt="iPad screen showing economic flow diagram with tax rates and consumer consumption" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/Moniac/photos/original-moniac.png" alt="Original 1949 Phillips MONIAC hydraulic computer" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Mechanics */}
        <CsSection id="cs-mechanics" label="02 &mdash; Mechanics" title="Mechanics">
          <CsBody>
            <p>Players adjust tax rates, government spending, and interest rates through physical sliders and knobs. The economy responds in real-time with visual feedback showing GDP, inflation, and employment flowing through the system.</p>
            <p>The game mechanics are built around three primary control levers: a tax rate slider that determines how much revenue the government collects from economic activity, a spending dial that allocates government funds across public services and infrastructure, and an interest rate knob that influences borrowing costs and consumer behavior. Each control feeds into a simulation engine that calculates cascading effects across interconnected economic indicators &mdash; adjusting one variable immediately shifts the equilibrium of all the others.</p>
            <p>Random event cards introduce external shocks &mdash; trade wars, natural disasters, technological breakthroughs, and pandemics &mdash; that force players to adapt their strategy under pressure. The visual interface displays economic health through animated flow diagrams reminiscent of the original hydraulic pipes, with color-coded streams representing different sectors of the economy. Players quickly develop an intuitive sense of which levers to pull and when, building the kind of systems-level understanding that traditional economics education often struggles to convey.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/Moniac/photos/valve-detail.png" alt="Close-up of 3D-printed valve controllers and wiring inside the cabinet" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/Moniac/photos/hand-playing.png" alt="Player's hand turning valve controllers during gameplay" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Result */}
        <CsSection id="cs-result" label="03 &mdash; Result" title="Result">
          <CsBody>
            <p>The game creates an intuitive understanding of macroeconomic feedback loops that textbooks struggle to convey. Playtesters consistently reported that after just a few rounds, they could predict how a change in interest rates would ripple through employment and inflation &mdash; a conceptual leap that often takes weeks to develop in a classroom setting.</p>
            <p>The most revealing feedback came from economics students who said the game helped them understand why policy decisions are so difficult in practice. Reading about the tradeoff between inflation and unemployment is one thing; watching your carefully balanced economy collapse because you raised taxes two percentage points too high is another. The emotional stakes of the game, even though fictional, created a memorable learning experience that static diagrams cannot replicate.</p>
            <p>The project was exhibited as an interactive installation where visitors could play individually or in teams, competing to maintain the healthiest economy over a fixed number of rounds. The competitive element added urgency and forced faster decision-making, mimicking the time pressure that real policymakers face. Several players returned multiple times, experimenting with different strategies &mdash; a strong signal that the game had succeeded in making economics genuinely engaging.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Assets/Projects/Moniac/photos/gameplay-wide.png" alt="Moniac Machine being played at exhibition, wide shot showing the full arcade setup" loading="lazy" /></div>
          </div>
        </section>

        {/* Thanks */}
        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-interactive', label: 'Simulator' },
          { id: 'cs-inspiration', label: 'Inspiration' },
          { id: 'cs-mechanics', label: 'Mechanics' },
          { id: 'cs-result', label: 'Result' },
        ]} />

      </main>

      <NextProject slug="drowning" title="Drowning" image="/Assets/images/drowning.jpg" />
      <Footer />
    </>
  )
}
