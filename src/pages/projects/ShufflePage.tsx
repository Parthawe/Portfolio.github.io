import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsMediaSpotlight from '../../components/case-study/CsMediaSpotlight'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import ShuffleInteractive from '../../components/ShuffleInteractive'

export default function ShufflePage() {
  return (
    <>
      <Helmet>
        <title>Shuffle &middot; Parth Pawar</title>
        <meta name="description" content="Shuffle, an interactive installation proposing a strategy simulation of student life at ITP, built with Arduino and motorised fader potentiometers." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Shuffle · Parth Pawar" />
        <meta property="og:description" content="Interactive installation proposing a strategy simulation of student life at ITP." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/shuffle.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#C99B3F' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Creative Technology', 'Physical Computing', 'Installation']}
          title="Shuffle"
          subtitle="Interactive installation proposing a strategy simulation of student life at ITP"
          info={[
                { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Creator' },
          ]}
        />

        {/* Product photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Shuffle/photos/product-front.jpg" alt="Shuffle: plywood slider board with labeled life-balance sliders" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Shuffle/photos/slider-labels.jpg" alt="Close-up: Class, Finals, Sleep, Food, Social Life, Energy slider labels" loading="lazy" /></div>
            </div>
          </div>
        </section>

        <CsMediaSpotlight
          id="cs-film"
          label="Watch first"
          title="Time as sliders"
          lede="The video shows the physical idea quickly: every choice changes the balance of student life, and the board makes those tradeoffs visible."
          meta={['Vimeo demo', 'Arduino', 'Physical simulator']}
        >
          <iframe
            src="https://player.vimeo.com/video/897796834?h=853abf08b1&badge=0&autopause=0&player_id=0&app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture"
            loading="lazy"
            title="Shuffle"
          />
        </CsMediaSpotlight>

        {/* Interactive demo */}
        <CsSection id="cs-interactive" label="Interactive" title="Redistribute Your Time">
          <CsBody>
            <p>Drag a slider and watch the system rebalance. More class can improve finals, less sleep drains energy, and a heavier job steals time from everything else.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <ShuffleInteractive />
          </div>
        </CsSection>

        {/* Interaction photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Shuffle/photos/hand-sliding.jpg" alt="Hand adjusting the Food slider on the board" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Shuffle/photos/hand-motion.jpg" alt="Motion blur: player rapidly adjusting sliders" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Shuffle/photos/product-angle.jpg" alt="Shuffle board from above showing all 8 labeled sliders and USB cable" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Slider detail */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Shuffle/photos/slider-detail.jpg" alt="Detail: Social Life and Job sliders with plus/minus indicators" loading="lazy" /></div>
          </div>
        </section>

        {/* Concept */}
        <CsSection id="cs-concept" label="01 &mdash; Concept" title="Physical Redistribution of Time">
          <CsBody>
            <p>The board invites you to redistribute your time across the pressures of student life at ITP&mdash;class, finals, sleep, food, social life, energy, job, hobby. Each fader is a share of a finite week. Push one up and the others have to give something back, forcing trade-offs that are normally invisible.</p>
            <p>The idea started as a sketch of a much larger control panel: twelve sliders covering everything from volunteer work to cold weather. Paring that down to eight categories that actually compete for the same hours turned a dashboard into a game.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-5)', display: 'grid', gap: '1.5rem' }}>
            <CsImage
              src="/Portfolio.github.io/Assets/Projects/Shuffle/photos/idea-demonstration.jpg"
              alt="Early mockup of ITP Shuffle: twelve labeled sliders including Classes, Sleep, Food, Job, Social Media, and Finals at different positions"
              caption="The first sketch mapped twelve dimensions of ITP life to slider positions before the build narrowed it to eight."
            />
            <CsImage
              src="/Portfolio.github.io/Assets/Projects/Shuffle/photos/g80-inspiration.jpg"
              alt="G80 by Fragmentin: a wall of white slider panels with green motorized faders, a hand adjusting one labeled Financial speculation"
              caption="The reference point: G80 by Fragmentin (2023), a motorized-fader installation about resource distribution on a planetary scale. Shuffle borrows the mechanic and shrinks the scale to one student's week."
            />
          </div>
        </CsSection>

        {/* Process */}
        <CsSection id="cs-process" label="02 &mdash; Process" title="Hardware &amp; Fabrication">
          <CsBody>
            <p>The magic of the board is that the sliders push back. Each of the eight faders is a motorised potentiometer: the Arduino reads the one you move and drives the motors on the others, so raising Finals physically drags Sleep and Social Life down in front of you. The zero-sum rule is not displayed&mdash;it is enforced by the hardware.</p>
            <p>The enclosure is a laser-cut plywood wedge, built as two angled panels of four faders each, with the slider caps 3D-printed to sit comfortably under a fingertip. Underneath, the motorised faders bolt to the panels on standoffs and route back to an Arduino on a breadboard, with the firmware written in C++.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Controller</span>
            <span className="cs-label-row-val">Arduino (C++)</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Input / Output</span>
            <span className="cs-label-row-val">8 Motorised Potentiometers</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Enclosure</span>
            <span className="cs-label-row-val">Laser-cut Plywood</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Slider Caps</span>
            <span className="cs-label-row-val">3D Printed</span>
          </div>
        </CsSection>

        {/* Under the hood */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal">
                <img src="/Portfolio.github.io/Assets/Projects/Shuffle/photos/underside-motors.jpg" alt="Side view of the plywood wedge with the top panel lifted, exposing eight motorised fader assemblies and wiring on standoffs" loading="lazy" decoding="async" />
              </div>
              <div className="cs-img reveal">
                <img src="/Portfolio.github.io/Assets/Projects/Shuffle/photos/electronics-breadboard.jpg" alt="Inside the enclosure: Arduino and breadboard wired with jumper cables, next to a close-up of a motorised fader mounted under the panel" loading="lazy" decoding="async" />
              </div>
            </div>
            <p className="cs-caption" style={{ marginTop: '0.75rem', color: 'var(--ink-soft, #777)', fontSize: '0.85rem' }}>Under the hood: motorised faders on standoffs, and the Arduino-plus-breadboard brain that redistributes the week.</p>
          </div>
        </section>

        {/* Exhibition */}
        <CsSection id="cs-exhibition" label="03 &mdash; In Play" title="Watching People Negotiate a Week">
          <CsBody>
            <p>On the ITP floor, the board needed no instructions. Sliders are an invitation&mdash;people instinctively reached for them, and the moment the other faders moved on their own, the rules were understood without a word.</p>
            <p>What began as a quick interaction often turned into longer conversations about priorities and burnout. Watching someone hesitate before letting Sleep drop to raise Finals said more about graduate school than any survey could, and friends comparing their slider positions side by side turned the trade-offs into a debate. A playful, tactile interface opened up reflective dialogue that forms and calendars simply cannot.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-film', label: 'Film' },
          { id: 'cs-interactive', label: 'Interactive' },
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-process', label: 'Process' },
          { id: 'cs-exhibition', label: 'In Play' },
        ]} />

      </main>

      <NextProject slug="enigma" title="Enigma" image="/Portfolio.github.io/Assets/images/enigma.jpg" />
      <Footer />
    </>
  )
}
