import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function ShufflePage() {
  return (
    <>
      <Helmet>
        <title>Shuffle &middot; Parth Pawar</title>
        <meta name="description" content="Shuffle — an interactive installation proposing a strategy simulation of student life at ITP, built with Arduino, addressable LEDs, and custom PCB." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Shuffle · Parth Pawar" />
        <meta property="og:description" content="Interactive installation proposing a strategy simulation of student life at ITP." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/shuffle.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4A6FA5' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Creative Technology', 'Physical Computing', 'Installation']}
          title="Shuffle"
          subtitle="Interactive installation proposing a strategy simulation of student life at ITP"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Creator' },
          ]}
        />

        {/* Hero Image placeholder */}
        <section className="cs-slide reveal">
        </section>

        {/* Video */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-media" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <iframe
                src="https://player.vimeo.com/video/897796834?h=853abf08b1&badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="Shuffle"
              />
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Overview</p>
            <h2 className="cs-display">A strategy simulation tool</h2>
            <CsBody>
              <p>Shuffle is an interactive installation which proposes a contemporary interpretation of students&rsquo; lives: a strategy simulation tool inspired by G80, aimed at an equitable distribution of your time as a student on an ITP scale.</p>
            </CsBody>
          </div>
        </section>

        {/* Concept */}
        <CsSection id="cs-concept" label="01 &mdash; Concept" title="Physical Redistribution of Time">
          <CsBody>
            <p>The installation invites participants to physically redistribute their time across different aspects of student life at ITP. Each token represents a unit of time, and the LED matrix responds in real-time to placement decisions. The grid is divided into categories that mirror the daily pressures of graduate life&mdash;coursework, personal projects, social connection, rest, and professional development&mdash;forcing participants to confront trade-offs that are normally invisible.</p>
            <p>Inspired by resource-allocation mechanics found in classic strategy games like G80, the concept reframes time management as a tangible, spatial problem rather than an abstract mental exercise. By making these decisions physical&mdash;picking up a weighted token, placing it deliberately on a surface&mdash;the installation slows down the act of choosing and gives it a sense of consequence that a digital calendar never could.</p>
            <p>The piece asks a deceptively simple question: if you had a finite number of tokens representing your semester, where would you place them? The answers participants gave were often surprising, revealing gaps between how they believed they spent their time and how they actually wanted to spend it.</p>
          </CsBody>
        </CsSection>

        {/* Images 1-3 */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2160/i/L1909464353160286896185627968022/1.jpg" alt="Shuffle installation — overview" loading="lazy" />
          </div>
        </section>
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2160/i/Z1909464353307860848775304380950/2.jpg" alt="Shuffle installation — detail" loading="lazy" />
          </div>
        </section>
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2160/i/B1909464353289414104701594829334/3.jpg" alt="Shuffle installation — tokens" loading="lazy" />
          </div>
        </section>

        {/* Process */}
        <CsSection id="cs-process" label="02 &mdash; Process" title="Hardware &amp; Fabrication">
          <CsBody>
            <p>Built with Arduino, addressable LEDs, and a custom PCB, the physical interface uses an array of weight sensors embedded beneath a laser-cut acrylic grid surface to detect token placement. Each cell in the grid sits above its own load cell, and the readings are multiplexed through shift registers to keep wiring manageable. When a token is placed, the corresponding addressable LED beneath the translucent surface illuminates, creating an immediate visual feedback loop.</p>
            <p>Fabrication involved several iterative prototyping rounds. The first version used a breadboard circuit that was too fragile for public interaction, so a custom PCB was designed in KiCad and manufactured to ensure reliability during the exhibition. The enclosure was built from birch plywood, CNC-milled to house the electronics cleanly while remaining easy to disassemble for maintenance. Tokens were 3D-printed with embedded magnets to give them a satisfying heft and prevent accidental displacement.</p>
            <p>On the software side, the Arduino firmware communicates sensor states over serial to a Processing sketch that manages the LED color mapping and keeps a running tally of each category. The color palette was carefully chosen so that each life-category had a distinct, readable hue even under the warm ambient lighting of the ITP floor.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Controller</span>
            <span className="cs-label-row-val">Arduino</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Display</span>
            <span className="cs-label-row-val">Addressable LEDs</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Electronics</span>
            <span className="cs-label-row-val">Custom PCB</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Input</span>
            <span className="cs-label-row-val">Weight Sensors</span>
          </div>
        </CsSection>

        {/* Images 4-5 */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2160/i/W1909464353270967360627885277718/4.jpg" alt="Shuffle — process and electronics" loading="lazy" />
          </div>
        </section>
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2160/i/M1909464353252520616554175726102/5.jpg" alt="Shuffle — PCB and fabrication" loading="lazy" />
          </div>
        </section>

        {/* Exhibition */}
        <CsSection id="cs-exhibition" label="03 &mdash; Exhibition" title="ITP Winter Show 2023">
          <CsBody>
            <p>Shuffle was exhibited at the ITP Winter Show 2023, a two-day public event that draws thousands of visitors to NYU&rsquo;s Tisch School of the Arts. The installation was positioned near the entrance of the fourth-floor exhibition space, where foot traffic was highest, and attracted a steady stream of participants throughout both days.</p>
            <p>Visitors naturally gravitated toward the glowing grid, often pausing to watch others before trying it themselves. The physical tokens lowered the barrier to engagement&mdash;people instinctively wanted to pick them up and place them. What began as a quick interaction frequently turned into extended conversations about priorities, burnout, and the hidden costs of saying yes to everything in a demanding graduate program.</p>
            <p>One of the most rewarding outcomes was observing how groups of friends would compare their token distributions side by side, laughing at differences and debating trade-offs. Faculty members also engaged deeply, noting that the installation surfaced tensions around workload that are difficult to articulate in conventional feedback channels. The piece demonstrated that playful, tactile interfaces can open up reflective dialogue in ways that surveys and forms simply cannot.</p>
          </CsBody>
        </CsSection>

        {/* Images 6-7 */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2160/i/R1909464353234073872480466174486/6.jpg" alt="Shuffle — exhibition at ITP Winter Show" loading="lazy" />
          </div>
        </section>
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2160/i/L1909464353215627128406756622870/7.jpg" alt="Shuffle — visitors interacting with the installation" loading="lazy" />
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-process', label: 'Process' },
          { id: 'cs-exhibition', label: 'Exhibition' },
        ]} />

      </main>

      <NextProject slug="enigma" title="Enigma" image="/Assets/images/enigma.jpg" />
      <Footer />
    </>
  )
}
