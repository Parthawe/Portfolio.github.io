import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsMediaSpotlight from '../../components/case-study/CsMediaSpotlight'
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
        <meta name="description" content="A physical-computing study of time through a sundial, mechanical watch, and software clock." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Making of Time &middot; Parth Pawar" />
        <meta property="og:description" content="Three timekeeping systems built across shadow, mechanics, and code." />
        <meta property="og:image" content="https://www.designwhich.works/Assets/Projects/making-of-time/photos/blue-dial-hero.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#5C7EA8' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Creative Technology', 'Physical Computing']}
          title="Making of Time"
          subtitle="A study of time through shadow, mechanical rhythm, and software"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Designer + builder' },
          ]}
        />

        <CsMediaSpotlight
          id="cs-film"
          label="Watch first"
          title="Three clocks, one moment"
          lede="The film sets up the sequence: sundial, mechanical watch, and software clock as three different ways to feel time."
          meta={['Vimeo film', 'Physical computing', 'Watchmaking']}
        >
          <iframe
            src="https://player.vimeo.com/video/1010457989?h=&badge=0&autopause=0&player_id=0&app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="Making of Time"
          />
        </CsMediaSpotlight>

        {/* Hero photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/making-of-time/photos/blue-dial-hero.webp" alt="Custom mechanical watch: octagonal bezel, blue guilloche dial, steel bracelet" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/making-of-time/photos/white-watch.webp" alt="Minimalist sundial-inspired watch: white face, leather strap" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Interactive, early proof */}
        <CsSection id="cs-interactive" label="Interactive" title="Three Ways to Read This Moment">
          <CsBody>
            <p>The same moment, measured three ways: shadow, escapement, and color field. The point is not accuracy, it is how each medium changes attention.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <ClockTrio />
          </div>
        </CsSection>

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Overview</p>
            <h2 className="cs-display">Exploring Time</h2>
            <CsBody>
              <p>Three clocks, three relationships with time: a sundial makes time spatial, a mechanical watch makes it rhythmic, and software turns it into pure information.</p>
              <p>The project was less about accuracy and more about attention: how the medium changes the way time feels.</p>
            </CsBody>
          </div>
        </section>

        {/* Sundial */}
        <CsExpandPreview>
        <CsSection id="cs-sundial" label="01 &mdash; Sundial" title="Sundial">
          <CsBody>
            <p>The sundial started with gnomon geometry: the shadow-casting angle had to match New York City&rsquo;s latitude for the hour lines to work.</p>
            <p>Built from wood and brass, it made time slow and spatial. You stand with it, read the shadow, and feel the day moving instead of checking a number.</p>
          </CsBody>
          <figure className="cs-img reveal" style={{ maxWidth: '560px', margin: '2.5rem auto 0' }}>
            <img src="/Assets/Projects/making-of-time/photos/white-watch.webp" alt="Sundial-inspired white watch with a raised gnomon on the dial" loading="lazy" decoding="async" />
            <figcaption className="cs-img-caption">The sundial idea carried onto the wrist: the white watch&rsquo;s dial reads by a raised gnomon instead of hands.</figcaption>
          </figure>
        </CsSection>

        
        

        {/* Tools + components */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Assets/Projects/making-of-time/photos/tools-layout.webp" alt="Watchmaking tools: calipers, tweezers, pliers, screwdrivers, locking pliers, and a mechanical watch" loading="lazy" /></div>
          </div>
        </section>

        {/* Mechanical */}
        <CsSection id="cs-mechanical" label="02 &mdash; Mechanical" title="Mechanical">
          <CsBody>
            <p>I took apart mechanical movements under magnification, mapping energy from mainspring to gear train to balance wheel.</p>
            <p>The escapement became the heart of the project: one tiny lever releasing stored energy one tick at a time. Reassembly taught patience, precision, and respect for craft.</p>
          </CsBody>
        </CsSection>

        
        

        {/* Watch detail photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/making-of-time/photos/blue-dial-angle.png" alt="Mechanical watch: blue guilloche dial, octagonal bezel, steel bracelet from side angle" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/making-of-time/photos/blue-dial-top.png" alt="Mechanical watch from above: blue dial with applied hour markers" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Digital */}
        <CsSection id="cs-digital" label="03 &mdash; Digital" title="Digital">
          <CsBody>
            <p>The digital phase turned time into a designed field: hue for hours, saturation for minutes, brightness for seconds.</p>
            <p>Software gave the most freedom, but also the least grounding. That contrast led directly into <a href="/black-hole" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Black Hole</a>, where the question shifted from measuring time to bending it.</p>
          </CsBody>
        </CsSection>

        
        

        {/* Components photo */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Assets/Projects/making-of-time/photos/watch-components.png" alt="Watch assembly: movement, dial, hands, and bracelet components" loading="lazy" /></div>
          </div>
        </section>

        {/* Thanks */}
        <CsThanks />

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-film', label: 'Film' },
          { id: 'cs-interactive', label: 'Live clocks' },
          { id: 'cs-sundial', label: 'Sundial' },
          { id: 'cs-mechanical', label: 'Mechanical' },
          { id: 'cs-digital', label: 'Digital' },
        ]} />

      </main>

      <NextProject slug="black-hole" title="Black Hole" image="/Assets/images/black-hole.jpg" />
      <Footer />
    </>
  )
}
