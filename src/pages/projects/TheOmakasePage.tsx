import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function TheOmakasePage() {
  return (
    <>
      <Helmet>
        <title>The Omakase &middot; Parth Pawar</title>
        <meta name="description" content="The Omakase is a 2-player party arcade game where sushi chefs compete to serve customers — a creative technology and game design project." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="The Omakase · Parth Pawar" />
        <meta property="og:description" content="2-player party arcade game where sushi chefs compete to serve customers." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/the-omakase.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#C94C4C' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          backLabel="Back to Work"
          tags={['Creative Technology', 'Game Design']}
          title="The Omakase"
          subtitle="2-player party arcade game where sushi chefs compete to serve customers"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Creator' },
          ]}
        />

        {/* Video */}
        <section className="cs-slide reveal">
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/996020990?h=&badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
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
            <p>The Omakase is a 2-player party arcade game. As two sushi chefs, you compete against each other by serving different customers their feast. The arcade has two sets of controls, each containing 8 buttons that change color throughout gameplay. You need to serve quick and accurate &mdash; though you will get messy.</p>
            <p><a href="https://vill4n3lle.itch.io/the-omakase" target="_blank" rel="noopener">Play at vill4n3lle.itch.io/the-omakase &rarr;</a></p>
          </CsBody>
        </CsSection>

        {/* Gameplay */}
        <section className="cs-section reveal" id="cs-gameplay">
          <div className="wrap">
            <p className="cs-section-label">01 &mdash; Gameplay</p>
            <h3 className="cs-section-title">Gameplay</h3>
            <CsBody>
              <p>Two players face off as competing sushi chefs. Each player has 8 color-changing buttons mapped to ingredients. Orders appear on screen and players must match the correct sequence before their opponent.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2000/i/B1899182472545304968837588124182/1.jpg" alt="The Omakase gameplay" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2000/i/T1899182472600645201058716779030/3.jpg" alt="The Omakase gameplay detail" loading="lazy" />
          </div>
        </section>

        {/* Fabrication */}
        <section className="cs-section reveal" id="cs-fabrication">
          <div className="wrap">
            <p className="cs-section-label">02 &mdash; Fabrication</p>
            <h3 className="cs-section-title">Fabrication</h3>
            <CsBody>
              <p>Custom arcade cabinet built with laser-cut panels, Arduino Mega controllers, and 16 individually addressable RGB buttons. The cabinet design references classic Japanese arcade aesthetics.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2000/i/K1899182472619091945132426330646/4.jpg" alt="The Omakase fabrication" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2000/i/O1899182472637538689206135882262/5.jpg" alt="The Omakase cabinet detail" loading="lazy" />
          </div>
        </section>

        {/* Exhibition */}
        <section className="cs-section reveal" id="cs-exhibition">
          <div className="wrap">
            <p className="cs-section-label">03 &mdash; Exhibition</p>
            <h3 className="cs-section-title">Exhibition</h3>
            <CsBody>
              <p>Exhibited at ITP Spring Show 2024. Players competed in live tournaments, with the game generating an energetic, competitive atmosphere.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2000/i/P1899182472655985433279845433878/6.jpg" alt="The Omakase at ITP Spring Show" loading="lazy" />
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-gameplay', label: 'Gameplay' },
          { id: 'cs-fabrication', label: 'Fabrication' },
          { id: 'cs-exhibition', label: 'Exhibition' },
        ]} />

      </main>

      <NextProject slug="moniac-machine" title="Moniac Machine" image="/Assets/images/moniac-machine.jpg" />
      <Footer />
    </>
  )
}
