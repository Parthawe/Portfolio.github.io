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
        <meta property="og:image" content="https://parthpawar.com/Assets/images/vj.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4A5568' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['UX', 'UI', 'Research', 'Prototyping']}
          title="VJ Parivar"
          subtitle="Vehicle Parking Made Easy"
          info={[
            { label: 'Client', value: 'Vilas Javdekar' },
            { label: 'Scope', value: 'User Research, UI/UX, Prototyping' },
            { label: 'Role', value: 'UI/UX Designer' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2022' },
          ]}
          heroImage="/Assets/Projects/vj/Desktop/1.jpg"
          heroAlt="VJ Parivar, Vehicle Parking Made Easy hero with app screens"
        />

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display" style={{ maxWidth: '22ch' }}>Designing the digital forefront of a real estate company; to be the face of its post-payment services.</h2>

            <div className="cs-label-row">
              <span className="cs-label-row-key">Summary</span>
              <span className="cs-label-row-val">Designing the digital forefront of a real estate company; to be the face of its post-payment services. VJ Parivar is an app for the homeowners of VJ Real Estate and constructions company. It aims to be the face of VJ services to their homeowners after their purchase of a house from VJ.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">The Challenges</span>
              <span className="cs-label-row-val">My challenge was to help homeowners understand the need for the layout of the society and make it an easy process for selecting the car parking spot. Also help owners to tackle the secondary needs of the user. Like Complain / Renting Space.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">My Role</span>
              <span className="cs-label-row-val">My role as UI/UX Designer was to first research the current methods and propose a new system for helping homeowners to select a proper Parking spot by giving a good visual experience and help them understand the layout.</span>
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
            <h2 className="cs-section-title">Vilas Javdekar &amp; VJ First</h2>
            <div className="cs-two-col">
              <div>
                <CsBody>
                  <p>Special tie-ups with neighborhood destinations. This includes sports facilities, educational institutions and healthcare destinations. VJ homeowners get priority treatment.</p>
                </CsBody>
                <CsInfoGrid items={[
                  { key: 'Construction Updates', value: 'Real-time progress' },
                  { key: 'Legal & Pay', value: 'Documentation & payments' },
                  { key: 'Services', value: 'Maintenance & utilities' },
                  { key: 'VJ Connect', value: 'Community platform' },
                ]} />
              </div>
              <div>
                <h3 className="cs-section-subtitle">VJ - First Vehicle Parking</h3>
                <CsBody>
                  <p>VJ Vehicle Parking is an elegant solution to help VJ users to Book their Parking Slots and avail services around the Vehicle and society regulations.</p>
                </CsBody>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement + Process */}
        <section className="cs-section reveal" id="cs-discover">
          <div className="wrap">
            <span className="cs-section-label">Discover</span>
            <h2 className="cs-section-title">Problem Statement</h2>
            <CsCallout>
              <p>How can VJ provide a <strong>seamless parking experience</strong> for their residents?</p>
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
                  <p><strong>Primary Goal:</strong> To book a parking spot for their vehicle in the society.</p>
                  <p><strong>Secondary Goal:</strong> To complain for incorrect car parking. Rent his parking space for extra income. Apply for multiple parking (if applicable).</p>
                </CsBody>
              </div>
              <div>
                <CsCallout>
                  <p>&ldquo;I would want an option to choose their parking spot other than the owner&rsquo;s.&rdquo;</p>
                </CsCallout>
                <CsBody>
                  <p><strong>Primary Goal:</strong> To choose a different parking slot other than the available owner&rsquo;s parking.</p>
                  <p><strong>Secondary Goal:</strong> To complain for incorrect car parking. Apply for multiple parking (if applicable).</p>
                </CsBody>
              </div>
            </div>

            <h3 className="cs-section-subtitle">Market Research &mdash; Competitive Analysis</h3>
            <CsBody>
              <p>Analyzed competitor apps including MyGate, NoBrokerHood, Swipe On, Varis, Visitor, and Greety across features like visitor management, parking spots, domestic staff management, utility bill payments, communication management, and more.</p>
            </CsBody>
            <div className="cs-img-full"><img src="/Assets/Projects/vj/Desktop/4.jpg" alt="User research personas, quotes, goals, current case analysis and competitive analysis" loading="lazy" /></div>
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
            <div className="cs-img-full"><img src="/Assets/Projects/vj/Desktop/5.jpg" alt="Current methods, flow diagrams for Society Type 1 and Society Type 2 parking processes" loading="lazy" /></div>
          </div>
        </section>

        {/* Insights + Goals */}
        <section className="cs-section reveal" id="cs-define">
          <div className="wrap">
            <span className="cs-section-label">Define</span>
            <h2 className="cs-section-title">Insights</h2>
            <CsFeatureGrid features={[
              { title: '', desc: 'People are interested in renting their parking space when its not in use.' },
              { title: '', desc: 'Tenants would want an option to choose their parking spot other than the owner\'s.' },
              { title: '', desc: 'An interactive society\'s layout can be used to help users book their parking spot.' },
              { title: '', desc: 'Stickers can be removed and RFIDs or FastTag can be leveraged for easy entry and exit in the society.' },
              { title: '', desc: 'Provide car parking norms of the society and any updates in fare or slots should be communicated.' },
              { title: '', desc: 'Car document verification is required and an option to get the car owners details is desired.' },
              { title: '', desc: 'People would want to inform the officials about their guest and can manage with any open parking space for them.' },
            ]} />

            <h3 className="cs-section-subtitle">Goals</h3>
            <CsSteps steps={[
              { num: '1', title: 'Understand Layout', desc: 'Help the house owner to understand need the layout of the society.' },
              { num: '2', title: 'Easy Selection', desc: 'Easy process for selecting the car parking spot.' },
              { num: '3', title: 'Secondary Needs', desc: 'Help to tackle secondary needs of the user. Like Complain / Renting Space.' },
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
            <div className="cs-img-full"><img src="/Assets/Projects/vj/Desktop/7.jpg" alt="User journey map, full flow diagram for parking spot booking, RFID, complaints" loading="lazy" /></div>

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
            <div className="cs-img-full"><img src="/Assets/Projects/vj/Desktop/8.jpg" alt="UX wireframes and high fidelity screens for the parking booking flow" loading="lazy" /></div>
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

            <div className="cs-img-full"><img src="/Assets/Projects/vj/Desktop/9.jpg" alt="Visual style, color palette, typography, icons, and layout system" loading="lazy" /></div>
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

            <div className="cs-img-full"><img src="/Assets/Projects/vj/Desktop/10.jpg" alt="Final high-fidelity screens, onboarding, spot selection, and payment flows" loading="lazy" /></div>
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
              <p>VJ Parivar was a lesson in designing for real-world constraints that no competitive analysis can prepare you for. The biggest insight came from user research: residents did not think about parking as a digital problem. They thought about it as a spatial problem&mdash;&ldquo;I want the spot closest to the elevator.&rdquo; The interactive society map became the core of the experience because it matched the user&rsquo;s mental model: a physical space, not a list of options.</p>
              <p>The competitive analysis revealed that existing apps (MyGate, NoBrokerHood) treated parking as a secondary feature buried in a larger society management platform. By making parking the hero flow&mdash;visual map first, details second&mdash;we created a more focused experience. This taught me that sometimes the best design strategy is to do one thing well rather than many things adequately.</p>
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

      <NextProject slug="shuffle" title="Shuffle" image="/Assets/images/shuffle.jpg" />
      <Footer />
    </>
  )
}
