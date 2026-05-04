import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import ClockTrio from '../../components/ClockTrio'

export default function MakingOfTimePage() {
  return (
    <>
      <Helmet>
        <title>Making of Time &middot; Parth Pawar</title>
        <meta name="description" content="Exploring the essence of time from ancient methods to contemporary technology, a creative technology and physical computing project." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Making of Time &middot; Parth Pawar" />
        <meta property="og:description" content="Exploring the essence of time from ancient methods to contemporary technology." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/making-of-time.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#8B6914' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Creative Technology', 'Physical Computing']}
          title="Making of Time"
          subtitle="Exploring the essence of time from ancient methods to contemporary technology"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Creator' },
          ]}
        />

        {/* Hero photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/making-of-time/photos/blue-dial-hero.webp" alt="Custom mechanical watch: octagonal bezel, blue guilloche dial, steel bracelet" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/making-of-time/photos/white-watch.webp" alt="Minimalist sundial-inspired watch: white face, leather strap" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Hero Video */}
        <section className="cs-slide reveal">
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1010457989?h=&badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0" loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="Making of Time"
            />
          </div>
        </section>

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Overview</p>
            <h2 className="cs-display">Exploring Time</h2>
            <CsBody>
              <p>Exploring the essence of time has been a journey from ancient methods to contemporary technology, each project offering a unique perspective on how time can be represented and understood.</p>
              <p>This series of three explorations traces the evolution of timekeeping from its most elemental form &mdash; shadows cast by the sun &mdash; through the intricate mechanical movements of watchmaking, and finally into the realm of digital and software-driven clocks. Each phase required learning a fundamentally different set of skills and materials, from outdoor observation and basic construction to precision metalwork and code.</p>
              <p>The project draws from a deep lineage. In 1761, <a href="https://www.rmg.co.uk/stories/time/harrisons-clocks-longitude-problem" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>John Harrison</a> solved the longitude problem with his H4 marine chronometer &mdash; proving that precise timekeeping could save lives at sea. <a href="https://en.wikipedia.org/wiki/Abraham-Louis_Breguet" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Abraham-Louis Breguet</a> invented the tourbillon, the perpetual calendar, and the first wristwatch. These figures weren&rsquo;t just engineers &mdash; they were designers who understood that how you measure time changes how you experience it.</p>
              <p>The underlying question driving all three projects was not how to tell time more accurately, but how the medium of timekeeping shapes our relationship with time itself. A sundial demands patience and presence; a mechanical watch rewards attention to craft and rhythm; a digital clock abstracts time into pure information. By building all three, I wanted to experience those different relationships firsthand.</p>
            </CsBody>
          </div>
        </section>

        {/* Interactive — three clocks running in real time */}
        <CsSection id="cs-interactive" label="Interactive" title="Three Ways to Read This Moment">
          <CsBody>
            <p>The same moment, measured three ways. A sundial shadow, a mechanical escapement, and an abstract color field &mdash; all showing your current time right now. Watch how each medium changes your relationship with the same information.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <ClockTrio />
          </div>
        </CsSection>

        {/* Sundial */}
        <CsSection id="cs-sundial" label="01 &mdash; Sundial" title="Sundial">
          <CsBody>
            <p>Creating a sundial with simple materials to experience firsthand how shadows measure time, a technique as old as civilization itself. The project began with research into gnomon geometry &mdash; understanding how the angle of the shadow-casting element must match the latitude of the location to produce accurate hour lines throughout the day.</p>
            <p>I constructed the sundial from wood and brass fittings, calibrating the gnomon angle for New York City&rsquo;s latitude. The hour lines were hand-etched based on calculations that account for the <a href="https://en.wikipedia.org/wiki/Equation_of_time" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>equation of time</a> &mdash; the slight variation between solar time and clock time caused by Earth&rsquo;s elliptical orbit and axial tilt. Testing the dial outdoors over several weeks revealed how remarkably precise this ancient method can be &mdash; accurate to within a few minutes on clear days.</p>
            <p>The most striking takeaway was how a sundial forces you to slow down. You cannot glance at it for a quick reading the way you check a phone. You have to stand, observe the shadow, and interpret its position. Time measured this way feels embodied and spatial rather than numerical, a fundamentally different experience from every other clock I have encountered.</p>
          </CsBody>
        </CsSection>

        
        

        {/* Tools + components */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/making-of-time/photos/tools-layout.webp" alt="Watchmaking tools: calipers, tweezers, pliers, screwdrivers, locking pliers, and a mechanical watch" loading="lazy" /></div>
          </div>
        </section>

        {/* Mechanical */}
        <CsSection id="cs-mechanical" label="02 &mdash; Mechanical" title="Mechanical">
          <CsBody>
            <p>Dissecting the inner workings of mechanical watches provided insight into the harmony of gears, springs, and escapements, each component crucial in marking the passage of seconds. I began by taking apart several inexpensive mechanical movements under magnification, cataloging each part and mapping the energy flow from mainspring through the gear train to the balance wheel.</p>
            <p>The escapement mechanism was the most fascinating element &mdash; a tiny lever that rocks back and forth, releasing the gear train one tick at a time. Understanding this mechanism required learning about oscillation frequencies, jewel bearings that reduce friction, and the delicate hairspring that determines how fast the balance wheel swings. Each component is machined to tolerances measured in hundredths of a millimeter, and the slightest misalignment stops the entire movement.</p>
            <p>Reassembling a working movement from disassembled parts was the most challenging and rewarding part of this phase. It demanded steady hands, extreme patience, and a respect for the centuries of accumulated craft knowledge embedded in watchmaking. The ticking of a mechanical watch, once you understand what produces it, becomes a profoundly satisfying sound &mdash; each tick is a controlled release of stored energy, a tiny heartbeat of engineering precision.</p>
          </CsBody>
        </CsSection>

        
        

        {/* Watch detail photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/making-of-time/photos/blue-dial-angle.png" alt="Mechanical watch: blue guilloche dial, octagonal bezel, steel bracelet from side angle" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/making-of-time/photos/blue-dial-top.png" alt="Mechanical watch from above: blue dial with applied hour markers" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Digital */}
        <CsSection id="cs-digital" label="03 &mdash; Digital" title="Digital">
          <CsBody>
            <p>Building a classic timepiece with a minimalist white dial and leather strap, then exploring modern software-based timekeepers. This final phase bridged the physical and digital worlds &mdash; starting with the assembly of a quartz-driven analog watch with a clean, modernist face and moving into purely code-based representations of time.</p>
            <p>The software explorations included a p5.js sketch that visualized time as an evolving color field, where hue mapped to hours, saturation to minutes, and brightness to seconds. A second experiment used real-time data &mdash; weather, sunrise and sunset times, and moon phase &mdash; to generate a clock face that changed its visual character throughout the day. The goal was to make a clock that communicated the quality of a moment, not just its position on a 24-hour scale.</p>
            <p>Comparing all three approaches revealed a clear pattern: the more abstract the timekeeping medium, the more freedom the designer has to redefine what time means. A sundial is bound to the sun. A mechanical watch is bound to physics. A digital clock is bound only by the programmer&rsquo;s imagination. That freedom is powerful, but it also carries the risk of losing the grounding that physical constraints provide &mdash; the reason a ticking watch feels more real than a pixel changing color.</p>
            <p>This exploration of time continued in <a href="/black-hole" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Black Hole</a>, where the question shifted from &ldquo;how do we measure time?&rdquo; to &ldquo;what happens when time itself breaks?&rdquo; The Black Hole project builds five physical models of gravitational phenomena &mdash; including a time dilation model where clocks literally slow down near the event horizon. It&rsquo;s the natural next step: once you&rsquo;ve built three ways to measure time, you build a model that destroys the concept entirely.</p>
          </CsBody>
        </CsSection>

        
        

        {/* Components photo */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/making-of-time/photos/watch-components.png" alt="Watch assembly: movement, dial, hands, and bracelet components" loading="lazy" /></div>
          </div>
        </section>

        {/* Thanks */}
        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-sundial', label: 'Sundial' },
          { id: 'cs-mechanical', label: 'Mechanical' },
          { id: 'cs-digital', label: 'Digital' },
        ]} />

      </main>

      <NextProject slug="uv-light" title="UV Light Experience" image="/Portfolio.github.io/Assets/images/uv-light.jpg" />
      <Footer />
    </>
  )
}
