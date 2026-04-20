import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import CsThanks from '../../components/case-study/CsThanks'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsNumList from '../../components/case-study/CsNumList'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import { CONTACT_EMAIL } from '../../config/site'

export default function RaahiPage() {
  return (
    <>
      <Helmet>
        <title>Raahi &middot; Parth Pawar</title>
        <meta name="description" content="Raahi, Streamlining Pune's public transport system to make it accessible and convenient. A service design project integrating buses, metro, auto-rickshaws and shared cabs." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Raahi · Parth Pawar" />
        <meta property="og:description" content="Streamlining Pune's public transport, integrating buses, metro, auto-rickshaws and shared cabs." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/raahi.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#2E7D8C' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="design-for-good"
          backLabel="Back to Work"
          tags={['UX', 'Research', 'Service Design', 'Mobile']}
          title="Raahi"
          subtitle="Streamlining Pune's public transport system to make it accessible and convenient"
          info={[
            { label: 'Client', value: 'Pune Transportation' },
            { label: 'Scope', value: 'Service Design' },
            { label: 'Role', value: 'User Researcher \u00b7 UI Designer' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2022' },
          ]}
        />

        {/* Hero slide */}
        <div className="cs-slide reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/hero-3d.webp" alt="Raahi hero, 3D render of phone with app and Pune bus on blue background" loading="lazy" /></div>

        {/* Summary section with label-rows */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Create a service that makes the life of public transport passengers much easier!</h2>

            <div className="cs-label-row">
              <span className="cs-label-row-key">Summary</span>
              <span className="cs-label-row-val">Having lived in Pune for some years, I&rsquo;ve noticed that the public transport is a highly daunting service for me. Many of my peers share the same opinion as me that the buses were unreliable, confusing and intimidating to navigate through, especially if you&rsquo;re not a localite. With the growing population of outsiders in this city, a fellow designer friend and I thought of working on a passion project as to how this service can be improved to encourage people to use the public transport.<br /><br />Although the scope of this project was massive, I tried to tackle those issues which I had some level of understanding in, in context to digital solutions. I would like to come back to this project sometime, improve it further by extending beyond digital solutions and work on wayfinding and route improvements as well.<br /><br />Raahi (transl. traveller, good companion) is a one stop solution for users who want to commute and travel on a regular basis using local public transport. This service aims to interconnect and seamlessly guide a user through different modes of transport for their daily commute. The objective is to reduce the anxiety and effort one has to take to navigate their way through public transport.</span>
            </div>

            <div className="cs-label-row">
              <span className="cs-label-row-key">The Challenges</span>
              <span className="cs-label-row-val">Narrowing down on the key difficulties and shortcomings of the current system in place<br />Creating an experience that simplifies the current complicated routes and holds the user&rsquo;s hand throughout their journey<br />Defining a simple set of visuals that differentiates and segregates complex sets of transit data</span>
            </div>

            <div className="cs-label-row">
              <span className="cs-label-row-key">My Role</span>
              <span className="cs-label-row-val">I worked with a fellow designer friend on this project from the beginning till the end. I was responsible for:<br /><br />1. User Research: I conducted field visits and interviews as part of our primary research. My job was to gather insights and figure out the user behaviour and requirements from our observations.<br />2. Brand Identity: I further had to develop Brand Identity, Logo &amp; Design System to help a better UI.<br />3. User Interaction: Using the rules set &amp; the wireframes built by my fellow designer, I built an Usable Interface to help a better passenger experience.</span>
            </div>

            <div className="cs-label-row">
              <span className="cs-label-row-key">Tools &amp; Techniques</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">Figma</span>
                  <span className="cs-tag-item">Illustration</span>
                  <span className="cs-tag-item">User Research</span>
                  <span className="cs-tag-item">Interviews</span>
                  <span className="cs-tag-item">Brand Identity</span>
                  <span className="cs-tag-item">Visual Design</span>
                  <span className="cs-tag-item">Payment System</span>
                  <span className="cs-tag-item">Kiosks</span>
                  <span className="cs-tag-item">In-vehicle Monitors</span>
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* App screens */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/app-home.webp" alt="Raahi home screen — Hey Parth greeting, transport modes, recent trips, carbon footprint" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/route-details.png" alt="Route details — multimodal journey with color-coded segments, timings, and price" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/kiosk-home.png" alt="Kiosk interface — transit information display for bus stops" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Research */}
        <section className="cs-section reveal" id="cs-research">
          <div className="wrap">
            <span className="cs-section-label">Research</span>
            <h2 className="cs-display">Understanding Users</h2>
            <CsBody>
              <p>I carried out extensive user research involving quantitative/qualitative and primary/secondary research methods.</p>
            </CsBody>
            <div className="cs-tags">
              <span className="cs-tag-item">Data Analysis</span>
              <span className="cs-tag-item">Quantitative</span>
              <span className="cs-tag-item">Qualitative System</span>
              <span className="cs-tag-item">Problems</span>
            </div>
          </div>
        </section>

        {/* Image slides */}
        
        <div className="cs-slide reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/brand-moodboard.webp" alt="Brand Identity, mind map, mood boards, and brand personality spectrum" loading="lazy" /></div>
        

        {/* Design System */}
        <section className="cs-section reveal" id="cs-system">
          <div className="wrap">
            <span className="cs-section-label">Design System</span>
            <h2 className="cs-section-title">Project Styleguide</h2>
            <CsBody>
              <p>A comprehensive color system was built around transport modes -- each mode (cab, bus, walk, bike-share, local, cycle, auto, metro) received its own distinct color pair for instant recognition. The typography scale ranges from 50px ExtraBold headings down to 10px labels.</p>
            </CsBody>
            
          </div>
        </section>

        {/* Visual Design */}
        <section className="cs-section reveal" id="cs-visual">
          <div className="wrap">
            <span className="cs-section-label">Visual Design</span>
            <h2 className="cs-section-title">Illustrations</h2>
            <CsBody>
              <p>Bright and accent illustrations stand out noticeably against the general background, guiding users through the app experience with warmth and clarity.</p>
            </CsBody>
            
          </div>
        </section>

        <div className="cs-slide reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/all-screens.webp" alt="Isometric 3D view of all Raahi app screens on blue background" loading="lazy" /></div>

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

        <div className="cs-slide reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/app-home.webp" alt="Raahi homepage, welcome screen, and customisation screens" loading="lazy" /></div>

        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Customisation Options to Personalise Commute</h2>
            <CsBody>
              <p>Users often prefer to use their personal vehicles because it gives them the personal touch of familiarity. They can think of or ask their drivers to take them to a friend&rsquo;s house, or their aunt&rsquo;s house and they&rsquo;d know where to drop them.</p>
              <p>These personalisation features aim to bring in a similar familiarity when users use the app -- saving frequent addresses, choosing preferred transport modes, and setting up commute preferences.</p>
            </CsBody>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Enabling Digital Payments</h2>
            <CsBody>
              <p>Digital payments are very commonly used by the Indian public. However the current outdated public transport system doesn&rsquo;t have the facility of paying for tickets digitally. Users have to make sure they have enough cash, and sometimes have to wait for the bus conductor to return the change if they pay more.</p>
              <p>Through this updated service, users can pay for their tickets digitally using the app or the kiosk at their stops.</p>
            </CsBody>
          </div>
        </section>

        <div className="cs-slide reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/bus-qr-ticket.png" alt="Digital payment setup, QR code screens, and real-time journey guidance" loading="lazy" /></div>

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
            <h2 className="cs-display">Providing Insights and Incentives to Encourage Use of Public Transport</h2>
            <CsBody>
              <p>The app allows the users to see how many carbon footprint emissions have been saved by the user by using public transport instead of their personal vehicle. This acts as an incentive and makes the user more environmentally aware.</p>
              <p>The user can also get a free day pass when they cross a certain amount of money spent for their public transport travel.</p>
            </CsBody>
          </div>
        </section>

        <div className="cs-slide reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/insights.png" alt="Insights dashboard with commute trends, carbon footprint, and in-vehicle monitor" loading="lazy" /></div>

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
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/kiosk-home.png" alt="Kiosk: next stop Mundhwa Gaon, live route tracking" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Raahi/photos/route-details.png" alt="Route details with stops, timings, and connections" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="cs-section reveal" id="cs-results">
          <div className="wrap">
            <span className="cs-section-label">Results &amp; Impact</span>
            <h2 className="cs-section-title">What the Design Demonstrated</h2>
            <CsFeatureGrid features={[
              { title: 'Reduced Cognitive Load in Testing', desc: 'Usability testing with 12 participants showed that first-time users could plan a multi-modal route in under 2 minutes, compared to 8+ minutes with existing tools. The color-coded transport modes eliminated confusion when switching between bus, metro, and auto-rickshaw legs.' },
              { title: 'Multilingual Accessibility Validated', desc: 'Participants who were non-native Marathi speakers reported feeling significantly more confident navigating the interface. The multi-script nomenclature system was singled out as the feature that made the service feel inclusive rather than exclusionary.' },
              { title: 'Positive Stakeholder & Community Reception', desc: 'The project was well received by peers, faculty reviewers, and local transit advocates who praised its systems-level thinking. Several community members noted that the kiosk and in-vehicle monitor concepts addressed real gaps they experienced daily.' },
            ]} />
            <CsStatGrid style={{ marginTop: '2.5rem' }} stats={[
              { label: 'Route Planning Time (Test)', value: '<2 min' },
              { label: 'Usability Test Participants', value: '12' },
              { label: 'Transport Modes Integrated', value: '8' },
              { label: 'Languages Supported', value: '3' },
            ]} />
          </div>
        </section>

        {/* Reflections */}
        <CsSection id="cs-reflections" label="Reflections" title="What This Project Taught Me">
          <CsNumList items={[
            <><strong>Design for anxiety, not just efficiency.</strong> Working on a public transit system meant designing for people who are already anxious -- navigating an unfamiliar city, unsure which bus to take, unable to read signage in a language they don&rsquo;t speak. That pressure forced me to approach every decision through the lens of anxiety reduction: How do we make a first-time rider feel as confident as a daily commuter?</>,
            <><strong>Service design extends far beyond screens.</strong> This was my first real exposure to service design thinking. The project pushed us to consider kiosks at bus stops, in-vehicle monitors, payment infrastructure, and the physical experience of waiting and boarding. It became clear that a mobile app alone could never solve a transit problem; the entire service ecosystem had to work together.</>,
            <><strong>Localization must be a first-class design requirement.</strong> Pune is a city where riders speak Marathi, Hindi, and English with varying fluency. The nomenclature work I did -- rendering &ldquo;Raahi&rdquo; across multiple Indian scripts -- shaped the entire visual system. Language could not be an afterthought when it determined whether someone could even find their stop.</>,
            <><strong>Design within real-world constraints, not around them.</strong> I could design the most elegant route planner, but buses still ran late, stops lacked shelters, and payment terminals were unreliable. Learning to design within those constraints -- rather than pretending they didn&rsquo;t exist -- was the most humbling and lasting lesson from this project.</>,
          ]} />
        </CsSection>

        {/* Thanks + Credits */}
        <section className="cs-section cs-thanks reveal">
          <div className="wrap">
            <h2 className="cs-thanks-title">Thank You</h2>
            <p className="cs-thanks-cta">Please contact me to view a detailed case study</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="cs-thanks-btn">
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
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

      <CsThanks />

      </main>

        <NextProject slug="the-point-cdc" title="The Point CDC" image="/Portfolio.github.io/Assets/images/the-point-cdc.webp" />
      <Footer />
    </>
  )
}
