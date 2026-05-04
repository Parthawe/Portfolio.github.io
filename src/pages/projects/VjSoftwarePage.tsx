import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsCallout from '../../components/case-study/CsCallout'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function VjSoftwarePage() {
  return (
    <>
      <Helmet>
        <title>VJ Parivar &middot; Parth Pawar</title>
        <meta name="description" content="Designing the digital forefront of Vilas Javdekar, a vehicle parking management app for homeowners in VJ residential societies. User research, UI/UX design and prototyping for a seamless parking experience." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="VJ Software &middot; Parth Pawar" />
        <meta property="og:description" content="Vehicle parking management app for VJ residential societies, user research, UI/UX and prototyping." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/vj.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4A5568' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['UX', 'UI', 'Research', 'Prototyping']}
          title="VJ Parivar"
          subtitle="Reframing residential parking as a spatial decision, not a back-office form flow"
          info={[
            { label: 'Client', value: 'Vilas Javdekar' },
            { label: 'Scope', value: 'User Research, UI/UX, Prototyping' },
            { label: 'Role', value: 'UI/UX Designer' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2022' },
          ]}
          heroImage="/Portfolio.github.io/Assets/Projects/vj/photos/all-screens-ui.png"
          heroAlt="VJ Parivar, Vehicle Parking Made Easy hero with app screens"
        />

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display" style={{ maxWidth: '22ch' }}>A parking flow that had to match how residents actually think about space.</h2>

            <div className="cs-label-row">
              <span className="cs-label-row-key">Summary</span>
              <span className="cs-label-row-val">VJ Parivar was designed as the post-purchase app for homeowners in VJ residential societies. My focus was the parking journey, one of those operational problems that sounds administrative until you watch how much anxiety it creates when people cannot understand the layout they are booking into.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Challenge</span>
              <span className="cs-label-row-val">Most society tools treated parking like paperwork. Residents did not. They wanted to understand proximity, access, and layout before committing to a spot, while still handling adjacent tasks like complaints, rentals, and vehicle details.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Role</span>
              <span className="cs-label-row-val">I worked on research, flow strategy, and interface design, helping define a map-first experience that made parking selection feel spatial and legible instead of bureaucratic.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Tools &amp; Techniques</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">Figma</span>
                  <span className="cs-tag-item">User Research</span>
                  <span className="cs-tag-item">Identity and Website Design</span>
                  <span className="cs-tag-item">Prototyping</span>
                  <span className="cs-tag-item">Wireframes</span>
                  <span className="cs-tag-item">High-Fidelity</span>
                  <span className="cs-tag-item">Experience Management</span>
                  <span className="cs-tag-item">Design System</span>
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* Context */}
        <section className="cs-section reveal" id="cs-context">
          <div className="wrap">
            <span className="cs-section-label">Context</span>
            <h2 className="cs-section-title">The Product Context</h2>
            <div className="cs-two-col">
              <div>
                <CsBody>
                  <p>VJ Parivar sat inside a broader resident-services ecosystem. The app was meant to become the digital face of the company after the apartment purchase, covering updates, payments, utilities, and community features, not just sales.</p>
                </CsBody>
                <CsInfoGrid items={[
                  { key: 'Construction Updates', value: 'Real-time progress' },
                  { key: 'Legal & Pay', value: 'Documentation & payments' },
                  { key: 'Services', value: 'Maintenance & utilities' },
                  { key: 'VJ Connect', value: 'Community platform' },
                ]} />
              </div>
              <div>
                <h3 className="cs-section-subtitle">Why Parking Became the Hero Flow</h3>
                <CsBody>
                  <p>Parking stood out because it forced residents to make a decision with real physical consequences. The right spot affects everyday convenience. The wrong one becomes a recurring source of friction. That made it the most design-sensitive post-purchase touchpoint in the system.</p>
                </CsBody>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement + Process */}
        <section className="cs-section reveal" id="cs-discover">
          <div className="wrap">
            <span className="cs-section-label">Discover</span>
            <h2 className="cs-section-title">The Core Problem</h2>
            <CsCallout>
              <p>How might VJ help residents choose and manage parking with confidence, without forcing them through office-style workflows that ignore the layout of the society itself?</p>
            </CsCallout>

            <h3 className="cs-section-subtitle">Process</h3>
            <CsSteps steps={[
              { num: '1', title: 'Discover', desc: 'User Research, Market Research, Current Methods' },
              { num: '2', title: 'Define', desc: 'Insights, Goals, Challenges, Features' },
              { num: '3', title: 'Develop', desc: 'UX, Visuals' },
              { num: '4', title: 'Deliver', desc: 'Prototyping, Improvements' },
            ]} />
          </div>
        </section>

        {/* User Research */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">Discover</span>
            <h2 className="cs-section-title">User Research</h2>
            <CsInfoGrid items={[
              { key: 'Mr. Ashish Patil', value: 'Male, 36 years old, working with BCG. Owner of flat B-block, Apartment #207 in Platinum City society in Bangalore.' },
              { key: 'Mr. Prakash Sharma', value: 'Male, 27 years old, works in IT. Tenant of flat A-block, Apartment #1103 in Essel Tower society in Gurugram.' },
            ]} />

            <div className="cs-two-col" style={{ marginTop: '2rem' }}>
              <div>
                <CsCallout>
                  <p>&ldquo;I faced difficulty while choosing my parking spot.&rdquo;</p>
                </CsCallout>
                <CsBody>
                  <p><strong>Primary goal:</strong> Book a parking spot with enough context to know whether the choice is actually convenient.</p>
                  <p><strong>Secondary goals:</strong> Report misuse, rent out unused space, and handle multiple-vehicle cases without visiting the society office.</p>
                </CsBody>
              </div>
              <div>
                <CsCallout>
                  <p>&ldquo;I would want an option to choose their parking spot other than the owner&rsquo;s.&rdquo;</p>
                </CsCallout>
                <CsBody>
                  <p><strong>Primary goal:</strong> Find a usable option beyond the default owner-assigned slot.</p>
                  <p><strong>Secondary goals:</strong> Resolve parking conflicts and request additional access without getting trapped in manual escalation.</p>
                </CsBody>
              </div>
            </div>

            <h3 className="cs-section-subtitle">Market Research &mdash; Competitive Analysis</h3>
            <CsBody>
              <p>Analyzed competitor apps including MyGate, NoBrokerHood, Swipe On, Varis, Visitor, and Greety across features like visitor management, parking spots, domestic staff management, utility bill payments, communication management, and more.</p>
            </CsBody>
            <div className="cs-img-full"><img src="/Portfolio.github.io/Assets/Projects/vj/Desktop/4.webp" alt="User research personas, quotes, goals, current case analysis and competitive analysis" loading="lazy" /></div>
          </div>
        </section>

        {/* Findings */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">Discover</span>
            <h2 className="cs-section-title">Findings</h2>
            <CsFeatureGrid features={[
              { title: 'NoBrokerHood App', desc: 'Can upload documents later on. Verification from society officials is required. No option to add driver details. Visitor entry approval available and their entry-exit logs. No option to report complain. Option to add vehicle details.' },
              { title: 'MyGate App', desc: 'No documents required. No verification or confirmation. No option to add driver details. Visitor entry & exit logs are available. No option to report complain if some other car is parked in their spot.' },
              { title: 'ItsMyAccount App', desc: 'Gives different options for available parking spots. Owner and Tenant can book for car parking. Contact details of car owners is available. Track changes regarding parking lot history and availability.' },
            ]} />

            <h3 className="cs-section-subtitle">Current Methods</h3>
            <div className="cs-two-col">
              <div>
                <h3 className="cs-section-subtitle">Society Type 1</h3>
                <CsBody>
                  <p>No digitization, no documentation, cash payment. The user visits the society office, officials verify residency, explain parking layout and rates verbally, user selects a spot, pays by cash, and officials make a record in their system.</p>
                </CsBody>
              </div>
              <div>
                <h3 className="cs-section-subtitle">Society Type 2</h3>
                <CsBody>
                  <p>No digitization, documentation required, multiple payment modes. User visits the society office, officials ask for documents to verify residency, ask for RC copy of the vehicle for record, explain parking layout and rates, user selects a spot, and multiple payment modes are available.</p>
                </CsBody>
              </div>
            </div>
            <div className="cs-img-full"><img src="/Portfolio.github.io/Assets/Projects/vj/Desktop/5.webp" alt="Current methods, flow diagrams for Society Type 1 and Society Type 2 parking processes" loading="lazy" /></div>
          </div>
        </section>

        {/* Insights + Goals */}
        <section className="cs-section reveal" id="cs-define">
          <div className="wrap">
            <span className="cs-section-label">Define</span>
            <h2 className="cs-section-title">Insights</h2>
            <CsFeatureGrid features={[
              { title: '', desc: 'Residents think in proximity and movement, not in spot IDs, so the map had to become the primary decision surface.' },
              { title: '', desc: 'Parking is rarely a one-time booking problem. Conflicts, guest access, rentals, and multiple vehicles all sit around the same flow.' },
              { title: '', desc: 'Tenants and owners do not always want the same parking outcome, so the system needed more flexibility than the inherited allocation model.' },
              { title: '', desc: 'Entry and verification could be modernized through RFID or FastTag logic instead of relying on brittle sticker-based processes.' },
              { title: '', desc: 'Rules, pricing, and slot updates needed to be visible early, not discovered after the user had mentally committed to a spot.' },
              { title: '', desc: 'The product needed to connect admin requirements such as document verification with a resident experience that still felt understandable.' },
            ]} />

            <h3 className="cs-section-subtitle">Goals</h3>
            <CsSteps steps={[
              { num: '1', title: 'Make the layout legible', desc: 'Help residents understand the society as a physical environment before they select a slot.' },
              { num: '2', title: 'Reduce booking friction', desc: 'Turn spot selection into a guided decision instead of a confusing office transaction.' },
              { num: '3', title: 'Support real-life edge cases', desc: 'Handle complaints, rentals, and alternate parking needs within the same system.' },
            ]} />
          </div>
        </section>

        {/* User Journey + Features */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">Define</span>
            <h2 className="cs-section-title">User Journey</h2>
            <CsBody>
              <p>Mapped the complete user journey covering first-time users booking a parking spot, adding RFID or FastTag details, editing vehicle details, renting a parking spot, and filing complaints for incorrect vehicle parking. Each flow includes decision points, success states, and error handling.</p>
            </CsBody>
            <div className="cs-img-full"><img src="/Portfolio.github.io/Assets/Projects/vj/Desktop/7.webp" alt="User journey map, full flow diagram for parking spot booking, RFID, complaints" loading="lazy" /></div>

            <h3 className="cs-section-subtitle">Features</h3>
            <div className="cs-tags">
              <span className="cs-tag-item">Visitor Management System</span>
              <span className="cs-tag-item">Book Parking Spot</span>
              <span className="cs-tag-item">Employee Sign In</span>
              <span className="cs-tag-item">Multiple Parking Spot</span>
              <span className="cs-tag-item">Domestic Staff Management</span>
              <span className="cs-tag-item">Maintenance and Utility Bill Payments</span>
              <span className="cs-tag-item">Communication Management</span>
              <span className="cs-tag-item">Evacuation Management</span>
              <span className="cs-tag-item">Complaint Management / Feedback</span>
              <span className="cs-tag-item">Digital In &amp; Out Board</span>
              <span className="cs-tag-item">Multi-lingual Support</span>
              <span className="cs-tag-item">Digital Agreements</span>
              <span className="cs-tag-item">ID Badge Printing / Digital</span>
              <span className="cs-tag-item">Customization of Features</span>
            </div>
          </div>
        </section>

        {/* UX & Wireframe */}
        <section className="cs-section reveal" id="cs-develop">
          <div className="wrap">
            <span className="cs-section-label">Develop</span>
            <h2 className="cs-section-title">UX &amp; Wireframe</h2>
            <CsBody>
              <p>Created low-fidelity wireframes exploring the full parking flow: from the vehicle parking tab, to booking a parking slot, navigation on the society map layout, selecting a parking spot, pricing and payment options, and the final confirmation screen.</p>
            </CsBody>

            <h3 className="cs-section-subtitle">High Fidelity</h3>
            <CsBody>
              <p>Translated wireframes into polished high-fidelity screens featuring the interactive society map, spot selection interface, booking details, payment flow, and confirmation screens.</p>
            </CsBody>
            <div className="cs-img-full"><img src="/Portfolio.github.io/Assets/Projects/vj/Desktop/8.webp" alt="UX wireframes and high fidelity screens for the parking booking flow" loading="lazy" /></div>
          </div>
        </section>

        {/* Visual Style */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">Develop</span>
            <h2 className="cs-section-title">Setting Visual Style</h2>

            <h3 className="cs-section-subtitle">Color Palette</h3>
            <div className="cs-swatch-grid">
              {['#F66300', '#FFA25F', '#E6F6FF', '#FFFFFF', '#000000', '#009DF6', '#3BD378', '#FFFDEC'].map((hex) => (
                <div className="cs-swatch" key={hex}>
                  <div className="cs-swatch-color" style={{ background: hex, borderColor: (hex === '#FFFFFF' || hex === '#FFFDEC') ? 'var(--ink-15)' : undefined }} />
                  <span className="cs-swatch-hex">{hex}</span>
                </div>
              ))}
            </div>

            <h3 className="cs-section-subtitle">Typography</h3>
            <CsInfoGrid items={[
              { key: 'Primary', value: 'Rubik Bold' },
              { key: 'Secondary', value: 'Bebas Neue' },
            ]} />

            <h3 className="cs-section-subtitle">Layout</h3>
            <div className="cs-info-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
              <div className="cs-info-item">
                <span className="cs-info-key">Type 1</span>
                <span className="cs-info-value">Text single-column</span>
              </div>
              <div className="cs-info-item">
                <span className="cs-info-key">Type 2</span>
                <span className="cs-info-value">Text double-column</span>
              </div>
              <div className="cs-info-item">
                <span className="cs-info-key">Type 3</span>
                <span className="cs-info-value">Movie Grid with no margins</span>
              </div>
            </div>

            <div className="cs-img-full"><img src="/Portfolio.github.io/Assets/Projects/vj/Desktop/9.webp" alt="Visual style, color palette, typography, icons, and layout system" loading="lazy" /></div>
          </div>
        </section>

        {/* Visuals & Prototyping */}
        <section className="cs-section reveal" id="cs-deliver">
          <div className="wrap">
            <span className="cs-section-label">Deliver</span>
            <h2 className="cs-section-title">Visuals &amp; Prototyping</h2>

            <h3 className="cs-section-subtitle">Onboarding</h3>
            <CsBody>
              <p>The onboarding flow guides users through selecting their vehicle type (two-wheeler or four-wheeler), viewing the society map layout, and navigating to their wing and floor to explore available parking spots.</p>
            </CsBody>

            <h3 className="cs-section-subtitle">Choosing A Spot</h3>
            <CsBody>
              <p>Users can browse the interactive map, filter by parking type, view available spots with pricing, and walk through the lot with a visual guide before making their selection.</p>
            </CsBody>

            <h3 className="cs-section-subtitle">Payment</h3>
            <CsBody>
              <p>After selecting a spot, users proceed through the booking process, choose a payment method, receive confirmation of their payment, and get a detailed summary of their parking reservation.</p>
            </CsBody>

            <div className="cs-img-full"><img src="/Portfolio.github.io/Assets/Projects/vj/Desktop/10.webp" alt="Final high-fidelity screens, onboarding, spot selection, and payment flows" loading="lazy" /></div>
          </div>
        </section>

        {/* Credits */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">Team</span>
            <h2 className="cs-section-title">Credits</h2>
            <CsCredits credits={[
              { role: 'UX Lead', name: 'Akshita Anand' },
              { role: 'UI/UX Designer', name: 'Parth Pawar' },
            ]} />
          </div>
        </section>

        {/* Reflections */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Reflections</p>
            <h2 className="cs-section-title">What I Learned</h2>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>This project sharpened a lesson that still shows up in my later work: when the user experiences a problem spatially, the product cannot reduce it to form fields and dropdowns. The map became the interface because that was how people were already reasoning about the choice.</p>
              <p>It also showed me that service software often fails by burying the one flow people actually care about. Existing society apps treated parking as a secondary settings page. Making it the hero experience changed the product from administrative software into something genuinely useful.</p>
            </CsBody>
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-context', label: 'Context' },
          { id: 'cs-discover', label: 'Discover' },
          { id: 'cs-define', label: 'Define' },
          { id: 'cs-develop', label: 'Develop' },
          { id: 'cs-deliver', label: 'Deliver' },
        ]} />

      </main>

      <NextProject slug="shuffle" title="Shuffle" image="/Portfolio.github.io/Assets/images/shuffle.jpg" />
      <Footer />
    </>
  )
}
