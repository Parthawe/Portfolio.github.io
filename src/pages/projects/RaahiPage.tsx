import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsNumList from '../../components/case-study/CsNumList'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function RaahiPage() {
  return (
    <>
      <Helmet>
        <title>Raahi &middot; Parth Pawar</title>
        <meta name="description" content="Raahi, Streamlining Pune's public transport system to make it accessible and convenient. A service design project integrating buses, metro, auto-rickshaws and shared cabs." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Raahi · Parth Pawar" />
        <meta property="og:description" content="Streamlining Pune's public transport, integrating buses, metro, auto-rickshaws and shared cabs." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/raahi.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#3C5DDB' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="design-for-good"
          backLabel="Back to Work"
          tags={['UX', 'Research', 'Service Design', 'Mobile']}
          title="Raahi"
          subtitle="A service system for Pune transit across app, kiosk, and in-vehicle guidance"
          info={[
            { label: 'Client', value: 'Pune Transportation' },
            { label: 'Scope', value: 'Service Design' },
            { label: 'Role', value: 'User Researcher \u00b7 UI Designer' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2022' },
          ]}
        />

        {/* Hero slide */}
        <div className="cs-slide reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/hero-3d.webp" alt="Raahi hero, 3D render of phone with app and Pune bus on blue background" loading="lazy" decoding="async" /></div>

        {/* Summary section with label-rows */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">Summary</span>
              <span className="cs-label-row-val">Raahi began with a clear problem: Pune public transport was fragmented, intimidating, and especially hostile to riders who were not already fluent in the system. Instead of treating buses, kiosks, and in-vehicle displays as separate products, we treated the commute as one service. The concept connects route planning, ticketing, live guidance, and physical touchpoints so the rider spends less effort decoding the system and more effort getting where they need to go.</span>
            </div>

            <div className="cs-label-row">
              <span className="cs-label-row-key">My Role</span>
              <span className="cs-label-row-val">I worked with one fellow designer from research through final concept. My lane covered field research, service insights, brand identity, and the interface layer that translated those findings into a usable transit experience.</span>
            </div>

          </div>
        </section>

        {/* App screens */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/app-home.webp" alt="Raahi home screen — Hey Parth greeting, transport modes, recent trips, carbon footprint" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/route-details.png" alt="Route details — multimodal journey with color-coded segments, timings, and price" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/kiosk-home.png" alt="In-vehicle monitor — next stop Mundhwa Gaon at 13:45 on bus route 149a, with upcoming stops and arrival times" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        {/* Research */}
        <section className="cs-section reveal" id="cs-research">
          <div className="wrap">
            <span className="cs-section-label">Research</span>
            <h2 className="cs-display">Understanding Users</h2>
            <CsBody>
              <p>I carried out extensive user research involving quantitative/qualitative and primary/secondary research methods. We mapped what riders actually needed from the service -- and what was going unfulfilled -- before defining a single feature.</p>
            </CsBody>
            <div className="cs-tags">
              <span className="cs-tag-item">Data Analysis</span>
              <span className="cs-tag-item">Quantitative</span>
              <span className="cs-tag-item">Qualitative</span>
              <span className="cs-tag-item">Problems</span>
            </div>
            <CsImage
              src="/Portfolio.github.io/Assets/Projects/Raahi/photos/research-journey-maps.webp"
              alt="Boards of empathy maps and customer journey maps for rider archetypes like mode mixers, convenience switchers, and captive riders, leading into service blueprint and task flow diagrams"
              caption="Empathy maps and journey maps for rider archetypes, feeding into the service blueprint and task flows my partner mapped -- the document I translated into screens."
            />
          </div>
        </section>

        {/* Image slides */}
        
        <div className="cs-slide reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/brand-moodboard.webp" alt="Brand mood boards exploring approachable, casual and friendly, navigator, and spontaneous personality directions, annotated with Hindi words for traveller" loading="lazy" decoding="async" /></div>
        

        {/* Design System */}
        <section className="cs-section reveal" id="cs-system">
          <div className="wrap">
            <span className="cs-section-label">Design System</span>
            <h2 className="cs-section-title">Project Styleguide</h2>
            <CsBody>
              <p>A comprehensive color system was built around transport modes -- each mode (cab, bus, walk, bike-share, local, cycle, auto, metro) received its own distinct color pair for instant recognition. The typography scale ranges from 50px ExtraBold headings down to 10px labels.</p>
            </CsBody>
            <CsImage
              src="/Portfolio.github.io/Assets/Projects/Raahi/photos/styleguide.webp"
              alt="Raahi project styleguide sheet — brand blue and orange, neutral grays, distinct color pairs for each of the eight transport modes, accent states, and the full typography scale"
              caption="The styleguide itself: one color pair per transport mode, so a rider can tell a bus leg from a metro leg at a glance."
            />
          </div>
        </section>

        {/* Visual Design */}
        <section className="cs-section reveal" id="cs-visual">
          <div className="wrap">
            <span className="cs-section-label">Visual Design</span>
            <h2 className="cs-section-title">Nomenclature &amp; Logo</h2>
            <CsBody>
              <p>&ldquo;Raahi&rdquo; means traveller -- a good companion on the road -- and Pune&rsquo;s riders read in more than one script. So the wordmark was tested across Devanagari, Bengali, Gujarati, Kannada, Telugu, Tamil, Malayalam, and Urdu before anything else was designed.</p>
              <p>The logo grew out of pencil sketches reducing the system to its parts: a dot for a person, a connection for places. Those dot-and-link forms became the identity&rsquo;s pattern language across the app and kiosks.</p>
            </CsBody>
            <CsImage
              src="/Portfolio.github.io/Assets/Projects/Raahi/photos/nomenclature-logo.webp"
              alt="Raahi wordmark rendered in multiple Indian scripts, above pencil sketches deriving the logo from bus, train, and metro shapes and from dots (people) joined by connections (places), with Devanagari lettering studies"
              caption="Nomenclature studies across scripts, and the sketchbook route from dot-plus-connection to the final mark."
            />
          </div>
        </section>

        <div className="cs-slide reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/all-screens.webp" alt="Isometric 3D view of all Raahi app screens on blue background" loading="lazy" decoding="async" /></div>

        {/* Features */}
        <section className="cs-section reveal" id="cs-features">
          <div className="wrap">
            <span className="cs-section-label">Features</span>
            <h2 className="cs-display">Cohesive Homepage That Highlights Preferences &amp; Insights</h2>
            <CsBody style={{ marginBottom: '2rem' }}>
              <p>The homepage shows the user an overview of their saved addresses, preferred modes of transport and insights on their commute trends. It also gives them easy access to buy tickets and one day passes.</p>
            </CsBody>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Customisation Options to Personalise Commute</h2>
            <CsBody>
              <p>Users often prefer to use their personal vehicles because it gives them the personal touch of familiarity. They can think of or ask their drivers to take them to a friend&rsquo;s house, or their aunt&rsquo;s house and they&rsquo;d know where to drop them.</p>
              <p>These personalisation features aim to bring in a similar familiarity when users use the app -- saving frequent addresses, choosing preferred transport modes, and setting up commute preferences.</p>
            </CsBody>
            <CsImage
              src="/Portfolio.github.io/Assets/Projects/Raahi/photos/customisation-screens.webp"
              alt="Onboarding screens for saving frequent addresses like home and work, and choosing preferred transport modes from cab, bus, walk, bike-share, local, cycle, auto, share-auto, and metro"
              caption="Onboarding asks for the places and modes you actually use, so the app starts out feeling familiar."
            />
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Digital Payments, Insights &amp; Incentives</h2>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
              <div className="cs-img reveal">
                <img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/bus-qr-ticket.png" alt="QR code ticket for a trip — ₹20 fare, with an option to save it to the gallery for scanning on boarding" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Tickets are paid for digitally in the app or at the kiosk &mdash; no cash, no waiting for the conductor&rsquo;s change.</figcaption>
              </div>
              <div className="cs-img reveal">
                <img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/insights.png" alt="Insights dashboard — distance travelled and trips completed this month, commute trends, carbon footprint reduction by mode, and frequently visited places" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Insights show carbon emissions saved, and a free day pass past a spending threshold rewards riders for choosing public transport.</figcaption>
              </div>
            </div>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Detailed, Precise and Real-time Guidance Throughout the Commute</h2>
            <CsBody>
              <p>Users found the lack of intermodal connectivity annoying and daunting. Through the en-route guidance, the app shows them exact locations and times of their modes, be it for walking, cycling, or transit buses and local trains.</p>
              <p>This gives them full transparency and information about where they&rsquo;re headed, and the pace of their journey.</p>
            </CsBody>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Easy Access to Real-time Information Through Kiosks and In-vehicle Monitors</h2>
            <CsBody>
              <p>The kiosks can be placed at every stop so that users have real-time information while they wait. It also facilitates payment of tickets and knowing the routes or buses to take.</p>
              <p>The in-vehicle monitor shows the status of the bus route and gives clear information as to the next stop and when they&rsquo;d be arriving there.</p>
            </CsBody>
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
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/kiosk-welcome.webp" alt="Kiosk welcome screen — View Timetable, Check Route, Buy Ticket, and Get A Day Pass options with a language toggle for English, Hindi, and Marathi" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/kiosk-buy-ticket.webp" alt="Kiosk buy-ticket screen — destination and route selection for bus 149a with the fare and a map alongside" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="cs-section reveal" id="cs-results">
          <div className="wrap">
            <span className="cs-section-label">Results &amp; Impact</span>
            <h2 className="cs-section-title">What the Design Aims For</h2>
            <CsFeatureGrid features={[
              { title: 'Designed to Reduce Cognitive Load', desc: 'The planning flow was designed so a first-time rider can plan a multi-modal route in under two minutes. Color-coded transport modes remove the confusion of switching between bus, metro, and auto-rickshaw legs.' },
              { title: 'Multilingual by Design', desc: 'The multi-script nomenclature system and the three-language kiosk were designed so that riders who are not fluent Marathi speakers can navigate the service with confidence, making it feel inclusive rather than exclusionary.' },
            ]} />
            <CsStatGrid style={{ marginTop: '2.5rem' }} stats={[
              { label: 'Planning Flow Target', value: '<2 min' },
              { label: 'Transport Modes Integrated', value: '8' },
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

        <NextProject slug="the-point-cdc" title="The Point CDC" image="/Portfolio.github.io/Assets/images/the-point-cdc.webp" />
      <Footer />
    </>
  )
}
