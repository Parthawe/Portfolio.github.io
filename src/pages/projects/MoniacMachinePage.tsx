import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsMediaSpotlight from '../../components/case-study/CsMediaSpotlight'
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
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/moniac-machine.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#3D7FA8' } as React.CSSProperties}>

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

        <CsMediaSpotlight
          id="cs-film"
          label="Watch first"
          title="Economy as a cabinet"
          lede="The film shows the important part immediately: policy levers become physical controls, and the economy pushes back in real time."
          meta={['Vimeo demo', 'Arcade cabinet', 'Economic simulator']}
        >
          <iframe
            src="https://player.vimeo.com/video/996025152"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="Moniac Machine"
          />
        </CsMediaSpotlight>

        {/* Interactive simulator */}
        <CsSection id="cs-interactive" label="Interactive" title="Run the Economy">
          <CsBody>
            <p>Adjust tax, spending, interest, investment, consumption, imports, and exports. The goal is simple: keep growth, employment, inflation, and debt in tension for 60 seconds.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Goal</span>
            <span className="cs-label-row-val">Balance growth against stability for 60 seconds</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Controls</span>
            <span className="cs-label-row-val">7 economic levers with random shocks</span>
          </div>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <MoniacSimulator />
          </div>
        </CsSection>

        {/* Hero photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Moniac/photos/hero-cabinet.png" alt="Moniac Machine arcade cabinet with iPad display and valve controllers" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Moniac/photos/annotated-breakdown.png" alt="Annotated breakdown: iPad, arcade wood, valve controllers, Teensy 4.0, wire connections" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Overview</p>
            <h2 className="cs-display">Master the Economy</h2>
            <CsBody>
              <p>Moniac Machine turns macroeconomics into a playable cabinet. Players move policy levers and watch the system react faster than a textbook diagram ever could.</p>
              <p>The goal is not perfect control. It is to feel why every economic decision creates a tradeoff somewhere else.</p>
            </CsBody>
          </div>
        </section>

        {/* Inspiration */}
        <CsSection id="cs-inspiration" label="01 &mdash; Inspiration" title="Inspiration">
          <CsBody>
            <p>The original <a href="https://en.wikipedia.org/wiki/Phillips_Machine" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>MONIAC</a> (Monetary National Income Analogue Computer) was a hydraulic machine built in 1949 by economist <a href="https://en.wikipedia.org/wiki/William_Phillips_(economist)" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Bill Phillips</a>, using coloured water flowing through transparent tanks and pipes to model the workings of the UK national economy. This game carries that commitment to making the invisible visible into a digital interactive experience.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Moniac/photos/screen-closeup.png" alt="iPad screen showing economic flow diagram with tax rates and consumer consumption" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Moniac/photos/original-moniac.png" alt="Original 1949 Phillips MONIAC hydraulic computer" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Mechanics */}
        <CsSection id="cs-mechanics" label="02 &mdash; Mechanics" title="Mechanics">
          <CsBody>
            <p>The game mechanics are built around seven control levers &mdash; tax, government spending, interest, investment, consumption, imports, and exports. The three primary ones: a tax rate slider that determines how much revenue the government collects from economic activity, a spending dial that allocates government funds across public services and infrastructure, and an interest rate knob that influences borrowing costs and consumer behavior. Each control feeds into a simulation engine that calculates cascading effects across interconnected economic indicators &mdash; adjusting one variable immediately shifts the equilibrium of all the others.</p>
            <p>Random event cards introduce external shocks &mdash; trade wars, natural disasters, technological breakthroughs, and pandemics &mdash; that force players to adapt their strategy under pressure. The visual interface displays economic health through animated flow diagrams reminiscent of the original hydraulic pipes, with color-coded streams representing different sectors of the economy. Players quickly develop an intuitive sense of which levers to pull and when, building the kind of systems-level understanding that traditional economics education often struggles to convey.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Moniac/photos/valve-detail.webp" alt="Close-up of 3D-printed valve controllers and wiring inside the cabinet" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Moniac/photos/hand-playing.webp" alt="Player's hand turning valve controllers during gameplay" loading="lazy" /></div>
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
            <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Moniac/photos/gameplay-wide.png" alt="Moniac Machine being played at exhibition, wide shot showing the full arcade setup" loading="lazy" /></div>
          </div>
        </section>

        {/* Thanks */}
        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-film', label: 'Film' },
          { id: 'cs-interactive', label: 'Simulator' },
          { id: 'cs-inspiration', label: 'Inspiration' },
          { id: 'cs-mechanics', label: 'Mechanics' },
          { id: 'cs-result', label: 'Result' },
        ]} />

      </main>

      <NextProject slug="black-hole" title="Black Hole" image="/Portfolio.github.io/Assets/images/black-hole.jpg" />
      <Footer />
    </>
  )
}
