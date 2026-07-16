import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsNumList from '../../components/case-study/CsNumList'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const RAAHI_ASSET_BASE = '/Assets/Projects/Raahi/photos'
const raahiAsset = (fileName: string) => (
  `${RAAHI_ASSET_BASE}/${encodeURIComponent(fileName)}`
)

export default function RaahiPage() {
  return (
    <>
      <Helmet>
        <title>Raahi &middot; Parth Pawar</title>
        <meta name="description" content="Raahi, Streamlining Pune's public transport system to make it accessible and convenient. A service design project integrating buses, metro, auto-rickshaws and shared cabs." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Raahi · Parth Pawar" />
        <meta property="og:description" content="Streamlining Pune's public transport, integrating buses, metro, auto-rickshaws and shared cabs." />
        <meta property="og:image" content="https://designwhich.works/Assets/images/raahi.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main project-main--raahi" style={{ '--project-color': '#3C5DDB' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="design-for-good"
          backLabel="Back to Work"
          tags={['UX', 'Research', 'Service Design', 'Mobile']}
          title="Raahi"
          subtitle="A service system for Pune transit across app, kiosk, and in-vehicle guidance"
          info={[
            { label: 'Domain', value: 'Pune Public Transit' },
            { label: 'Scope', value: 'App, kiosk, in-vehicle guidance' },
            { label: 'Role', value: 'Research + UI design' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2022' },
          ]}
        />

        {/* Hero slide */}
        <div className="cs-slide reveal"><img src={raahiAsset('Frame 427318652.png')} alt="Raahi overview render showing the app, bus, and service touchpoints on a blue transit map" loading="lazy" decoding="async" /></div>

        {/* Summary section with label-rows */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">Summary</span>
              <span className="cs-label-row-val">Pune transit felt fragmented across routes, stops, tickets, and vehicle information. Raahi treats the commute as one service, connecting route planning, ticketing, live guidance, kiosks, and in-vehicle displays so riders spend less effort decoding the system.</span>
            </div>

            <div className="cs-label-row">
              <span className="cs-label-row-key">My Role</span>
              <span className="cs-label-row-val">I worked with one fellow designer from research through final concept, focusing on field research, service insights, brand identity, and UI systems.</span>
            </div>

          </div>
        </section>

        <CsExpandPreview>
        {/* Research */}
        <section className="cs-section reveal" id="cs-research">
          <div className="wrap">
            <span className="cs-section-label">Research</span>
            <h2 className="cs-display">Understanding Users</h2>
            <CsBody>
              <p>We mapped the commute before designing features: what riders needed, where information broke, and which touchpoints had to work together for the service to feel reliable.</p>
            </CsBody>
            <div className="cs-tags">
              <span className="cs-tag-item">Data Analysis</span>
              <span className="cs-tag-item">Quantitative</span>
              <span className="cs-tag-item">Qualitative</span>
              <span className="cs-tag-item">Problems</span>
            </div>
            <div className="raahi-research-grid">
              <div className="cs-img reveal">
                <img src={raahiAsset('Mind Map.png')} alt="Raahi research mind map connecting public transport pain points, rider needs, and service opportunities" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Early mind map to frame the public-transport problem space.</figcaption>
              </div>
              <div className="cs-img reveal">
                <img src={raahiAsset('Spectrum.png')} alt="Research spectrum mapping different rider attitudes and commute behaviours" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Rider spectrum used to separate convenience, confidence, and dependency needs.</figcaption>
              </div>
              <div className="cs-img reveal">
                <img src={raahiAsset('service blueprints.png')} alt="Service blueprint diagram mapping app, kiosk, vehicle, and rider touchpoints across the commute" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Blueprint view of the commute as one connected service.</figcaption>
              </div>
            </div>
            <CsImage
              className="raahi-research-board"
              src={raahiAsset('Group 2531.png')}
              alt="Boards of empathy maps and customer journey maps for rider archetypes like mode mixers, convenience switchers, and captive riders, leading into service blueprint and task flow diagrams"
              caption="Empathy maps and journey maps for rider archetypes, feeding into the service blueprint and task flows my partner mapped -- the document I translated into screens."
            />
            <div className="raahi-ia-stack">
              <div className="cs-img reveal">
                <img src={raahiAsset('information architecture.png')} alt="Information architecture diagram for the Raahi mobile app" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Mobile information architecture before screen design.</figcaption>
              </div>
              <div className="cs-img reveal raahi-ia-kiosk">
                <img src={raahiAsset('information architecture_kiosk.png')} alt="Information architecture diagram for the Raahi kiosk experience" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Kiosk information architecture for stop-level use.</figcaption>
              </div>
            </div>
          </div>
        </section>

        {/* Image slides */}
        
        <div className="cs-slide reveal"><img src={raahiAsset('brand personality.png')} alt="Brand mood board exploring approachable, casual, navigator, and spontaneous personality directions" loading="lazy" decoding="async" /></div>
        <div className="cs-slide reveal"><img src={raahiAsset('brand personality-1.png')} alt="Condensed Raahi brand personality board showing the chosen approachable navigation direction" loading="lazy" decoding="async" /></div>
        

        {/* Design System */}
        <section className="cs-section reveal" id="cs-system">
          <div className="wrap">
            <span className="cs-section-label">Design System</span>
            <h2 className="cs-section-title">Project Styleguide</h2>
            <CsBody>
              <p>The color system maps directly to transport modes: cab, bus, walk, bike-share, local, cycle, auto, and metro. Each mode gets a distinct pair so route changes are readable at a glance.</p>
            </CsBody>
            <CsImage
              src={raahiAsset('Frame 2547-1.png')}
              alt="Raahi extended styleguide strip showing transport-mode colors and typography rules"
              caption="A tighter system strip for transport-mode colors, typography, and repeatable UI language."
            />
          </div>
        </section>

        {/* Visual Design */}
        <section className="cs-section reveal" id="cs-visual">
          <div className="wrap">
            <span className="cs-section-label">Visual Design</span>
            <h2 className="cs-section-title">Nomenclature &amp; Logo</h2>
            <CsBody>
              <p>&ldquo;Raahi&rdquo; means traveller: a companion on the road. Because riders read across languages and scripts, the wordmark was tested before the UI system was locked.</p>
              <p>The mark reduces the service to a person and a connection. That dot-and-line logic became the identity language across app and kiosk surfaces.</p>
            </CsBody>
            <CsImage
              src={raahiAsset('Nomenclature.png')}
              alt="Raahi wordmark rendered in multiple Indian scripts, above pencil sketches deriving the logo from bus, train, and metro shapes and from dots (people) joined by connections (places), with Devanagari lettering studies"
              caption="Nomenclature studies across scripts, and the sketchbook route from dot-plus-connection to the final mark."
            />
            <div className="cs-img-pair">
              <div className="cs-img reveal">
                <img src={raahiAsset('WhatsApp Image 2022-09-19 at 10.54.png')} alt="Raahi pencil sketches exploring transit shapes and dot-connection logo forms" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Transit-shape and dot-connection sketches behind the mark.</figcaption>
              </div>
              <div className="cs-img reveal">
                <img src={raahiAsset('WhatsApp Image 2022-09-20 at 18.28.png')} alt="Raahi pencil sketches studying Devanagari wordmark forms" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Wordmark studies before the identity became digital.</figcaption>
              </div>
            </div>
          </div>
        </section>

        <div className="cs-slide reveal"><img src={raahiAsset('Frame 427318657.png')} alt="Raahi system overview showing app screens and transit touchpoints arranged as one service journey" loading="lazy" decoding="async" /></div>

        {/* Features */}
        <section className="cs-section reveal" id="cs-features">
          <div className="wrap">
            <span className="cs-section-label">Features</span>
            <h2 className="cs-display">A Home Screen Built Around Familiar Routes</h2>
            <CsBody style={{ marginBottom: '2rem' }}>
              <p>The homepage centers saved addresses, preferred modes, commute insights, tickets, and day passes so repeat riders do not rebuild the same trip every time.</p>
            </CsBody>
            <div className="raahi-phone-row raahi-phone-row--trio">
              <div className="cs-img reveal"><img src={raahiAsset('homepage.png')} alt="Raahi home screen showing saved addresses, transport modes, and recent commute context" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src={raahiAsset('added addresses.png')} alt="Raahi saved-address flow showing home and work locations" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src={raahiAsset('added addresses-1.png')} alt="Raahi address confirmation screen for a saved commute location" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Personalisation Without Extra Work</h2>
            <CsBody>
              <p>Public transit loses people when every trip feels like a fresh puzzle. Saved places, preferred modes, and commute preferences make the app feel closer to how riders already talk about getting around.</p>
            </CsBody>
            <CsImage
              className="raahi-wide-flow"
              src={raahiAsset('frequent addresses.png')}
              alt="Onboarding screens for saving frequent addresses like home and work, and choosing preferred transport modes from cab, bus, walk, bike-share, local, cycle, auto, share-auto, and metro"
              caption="Onboarding asks for the places and modes you actually use, so the app starts out feeling familiar."
            />
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Digital Payments, Insights &amp; Incentives</h2>
            <div className="raahi-phone-row raahi-phone-row--pair">
              <div className="cs-img reveal">
                <img src={raahiAsset('insights-1.png')} alt="Insights screen showing frequently visited places on a commute map" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">The service remembers real rider patterns, not just abstract route data.</figcaption>
              </div>
              <div className="cs-img reveal">
                <img src={raahiAsset('insights.png')} alt="Insights dashboard — commute trends, carbon footprint reduction by mode, and frequently visited places" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Insights show carbon emissions saved, and a free day pass past a spending threshold rewards riders for choosing public transport.</figcaption>
              </div>
            </div>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Live Guidance Across the Commute</h2>
            <CsBody>
              <p>The route flow shows what to take, where to change, how long each leg takes, and what is happening next, so the rider can trust the journey while it is unfolding.</p>
            </CsBody>
            <div className="raahi-phone-row raahi-phone-row--trio">
              <div className="cs-img reveal"><img src={raahiAsset('route list.png')} alt="Route list comparing commute options and public transit modes" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src={raahiAsset('route details.png')} alt="Detailed route screen showing multimodal commute steps and transit timing" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src={raahiAsset('bus in transit.png')} alt="Bus in-transit screen showing live journey guidance" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Kiosk and In-Vehicle Guidance</h2>
            <CsBody>
              <p>Kiosks bring route, ticket, and timetable support to the stop. In-vehicle displays keep riders oriented once they are already moving.</p>
            </CsBody>
            <div className="raahi-touchpoint-pair">
              <div className="cs-img reveal">
                <img src={raahiAsset('Frame 427318655.png')} alt="Raahi public transit touchpoint mockup showing physical and digital service surfaces" loading="lazy" decoding="async" />
              </div>
              <div className="cs-img reveal">
                <img src={raahiAsset('Frame 427318656.png')} alt="Raahi service touchpoint mockup for transit guidance and rider information" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* Touchpoints */}
        <section className="cs-section reveal" id="cs-touchpoints">
          <div className="wrap">
            <span className="cs-section-label">Touchpoints</span>
            <h2 className="cs-section-title">Kiosk &amp; Welcome Experience</h2>
            <CsBody style={{ marginBottom: '2rem' }}>
              <p>The kiosk greets riders in English, Hindi, or Marathi and offers four simple paths: view the timetable, check a route, buy a ticket, or get a day pass. No app, no account -- the same service, standing at the stop.</p>
            </CsBody>
            <CsImage
              src={raahiAsset('Frame 2547.png')}
              alt="Raahi kiosk screens for buying tickets, choosing a language, and checking routes, paired with the transport-mode color system"
              caption="The kiosk applies one color pair per transport mode, keeping route changes readable across ticketing, maps, and welcome states."
            />
            <div className="raahi-kiosk-row">
              <div className="cs-img reveal"><img src={raahiAsset('welcome.png')} alt="Kiosk welcome screen with key transit actions and language choices" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src={raahiAsset('kiosk home.png')} alt="Kiosk ticket and route screen with transit options and map context" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="cs-section reveal" id="cs-results">
          <div className="wrap">
            <span className="cs-section-label">Results &amp; Impact</span>
            <h2 className="cs-section-title">What the Design Aims For</h2>
            <CsFeatureGrid features={[
              { title: 'Lower cognitive load', desc: 'Route planning, ticketing, and live guidance sit in one flow instead of scattered decisions.' },
              { title: 'Multilingual by design', desc: 'The naming, script study, and three-language kiosk make language part of the service design, not a late translation layer.' },
            ]} />
            <CsStatGrid style={{ marginTop: '2.5rem' }} stats={[
              { label: 'Planning Flow Target', value: '<2 min' },
              { label: 'Transport Modes Represented', value: '8' },
              { label: 'Languages Supported', value: '3' },
            ]} />
          </div>
        </section>

        {/* Reflections */}
        <CsSection id="cs-reflections" label="Reflections" title="What This Project Taught Me">
          <CsNumList items={[
            <><strong>Service design extends far beyond screens.</strong> This was my first real exposure to service design thinking. The project pushed us to consider kiosks at bus stops, in-vehicle monitors, payment infrastructure, and the physical experience of waiting and boarding. It became clear that a mobile app alone could never solve a transit problem; the entire service ecosystem had to work together.</>,
            <><strong>Localization must be a first-class design requirement.</strong> Pune is a city where riders speak Marathi, Hindi, and English with varying fluency. The nomenclature work I did -- rendering &ldquo;Raahi&rdquo; across multiple Indian scripts -- shaped the entire visual system. Language could not be an afterthought when it determined whether someone could even find their stop.</>,
          ]} />
        </CsSection>

        {/* Thanks + Credits */}
        <section className="cs-section cs-thanks reveal">
          <div className="wrap">
            <h2 className="cs-thanks-title">Thank You</h2>
            <CsCredits credits={[
              { role: 'UI Designer & Researcher', name: 'Parth Pawar' },
              { role: 'UX Designer & Researcher', name: 'Sampada Inamdar' },
            ]} style={{ marginTop: '3rem' }} />
          </div>
        </section>

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-research', label: 'Research' },
          { id: 'cs-system', label: 'Design System' },
          { id: 'cs-visual', label: 'Visual Design' },
          { id: 'cs-features', label: 'Features' },
          { id: 'cs-touchpoints', label: 'Touchpoints' },
          { id: 'cs-results', label: 'Results' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

        <NextProject slug="mentra-miniapps" title="MiniApps in OS" image="/Assets/images/mentra/appstore-hero.webp" />
      <Footer />
    </>
  )
}
