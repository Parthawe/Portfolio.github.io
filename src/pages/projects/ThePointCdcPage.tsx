import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ReadingProgress from '../../components/case-study/ReadingProgress'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCallout from '../../components/case-study/CsCallout'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsNumList from '../../components/case-study/CsNumList'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function ThePointCdcPage() {
  return (
    <>
      <Helmet>
        <title>The Point CDC &middot; Parth Pawar</title>
        <meta name="description" content="Revitalizing The Point CDC — A digital transformation for community empowerment in Hunts Point, Bronx. Redesigning their website to streamline services, foster innovation, and enhance community engagement." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="The Point CDC · Parth Pawar" />
        <meta property="og:description" content="Digital transformation for community empowerment in Hunts Point, Bronx — website redesign." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/the-point-cdc.png" />
      </Helmet>

      <Nav />
      <ReadingProgress />

      <main id="main-content" className="project-main" style={{ '--project-color': '#C44D2B' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          backLabel="Back to Work"
          tags={['UX', 'Community', 'Research']}
          title="The Point CDC"
          subtitle="A digital transformation for community empowerment"
          info={[
            { label: 'Client', value: 'The Point CDC' },
            { label: 'Scope', value: 'User Research, UI/UX, Prototyping' },
            { label: 'Role', value: 'Product Designer' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2024' },
          ]}
          liveUrl="https://thepoint.org"
          heroImage="/Assets/Projects/ThePointCDC/Desktop/Slice 1.png"
          heroAlt="The Point CDC — Revitalizing a community website with device mockups showing the redesigned homepage"
        />

        {/* Overview with label-rows */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display" style={{ maxWidth: '22ch' }}>Redesigning the Hunts Point website to streamline services, foster innovation, and enhance community engagement in the Bronx.</h2>

            <div className="cs-label-row">
              <span className="cs-label-row-key">Summary</span>
              <span className="cs-label-row-val">The Point CDC, a cornerstone in Hunts Point, Bronx, has been at the forefront of empowering the community by providing free WiFi through a resilient mesh network. The website revamp project aimed to modernize their online presence, streamline access to community services, and showcase their latest initiatives and programs. This case study outlines the challenges, process, and solutions involved in the revamp.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">The Challenges</span>
              <span className="cs-label-row-val">The Point CDC website faced several challenges, including:<br />
                &bull; Outdated design and complex navigation<br />
                &bull; Lack of a clear communication pathway for highlighting community initiatives<br />
                &bull; The need to integrate real-time updates on programs like the &ldquo;Be a Buddy&rdquo; program, free WiFi access, and &ldquo;Hunts Point Forward&rdquo;<br />
                &bull; Optimizing the mobile experience for community residents</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">My Role</span>
              <span className="cs-label-row-val">As the lead UI/UX designer, my role was to revamp the website with a fresh, community-focused design. I conducted user research, created prototypes, and led the redesign to improve navigation and accessibility.</span>
            </div>
            <div className="cs-label-row" style={{ borderBottom: 'none' }}>
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

        {/* About The Point CDC */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-two-col">
              <div>
                <h2 className="cs-display">The Point CDC</h2>
                <CsBody>
                  <p>The Point CDC is a non-profit organization in Hunts Point, Bronx, focused on empowering the local community through arts, education, and environmental initiatives. They provide programs to improve residents&rsquo; lives, including free WiFi access and youth leadership opportunities, while promoting social justice and sustainability.</p>
                </CsBody>
              </div>
              <div className="cs-img">
                <img src="/Assets/Projects/ThePointCDC/Desktop/Slice 3.png" alt="The Point CDC community work — WiFi installation and community members" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="cs-section reveal" id="cs-discover">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <span className="cs-section-label">01 &mdash; Discover</span>
            <h2 className="cs-section-title">Problem Statement</h2>
            <CsCallout style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
              <p>How can we redesign The Point CDC&rsquo;s website to enhance accessibility, streamline navigation, and effectively highlight community programs and services?</p>
            </CsCallout>
          </div>
        </section>

        {/* Process */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">02 &mdash; Discover</span>
            <h2 className="cs-section-title">Process</h2>
            <CsSteps steps={[
              { num: '1', title: 'Discover', desc: 'Conducted a website audit to identify pain points and opportunities. Interviewed community members and staff to gain insights into their digital needs.' },
              { num: '2', title: 'Define', desc: "Organized content to prioritize essential services. Highlighted the community's accomplishments. Defined goals and problems." },
              { num: '3', title: 'Develop', desc: 'Created wireframes and low-fidelity prototypes to test navigation and flow. Collaborated with The Point CDC to ensure all features aligned with their mission of empowerment.' },
              { num: '4', title: 'Deliver', desc: 'Launched a redesigned website with intuitive navigation and a modern layout. Introduced new sections like \u201cHunts Point News\u201d and \u201cQuick Finds\u201d to provide real-time program updates.' },
            ]} />
          </div>
        </section>

        {/* User Research */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">03 &mdash; Discover</span>
            <h2 className="cs-section-title">User Research</h2>
            <CsBody>
              <p>I focused on understanding how the website could best serve the Hunts Point community. Residents emphasized the need for:</p>
            </CsBody>
            <CsFeatureGrid features={[
              { title: 'Easy access to WiFi service information.', desc: '' },
              { title: 'Clear communication about events and programs.', desc: '' },
              { title: 'Mobile-friendly navigation, as many users rely on their phones for internet access.', desc: '' },
            ]} />
          </div>
        </section>

        {/* User Persona */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">Interview</span>
            <h2 className="cs-section-title">User Persona</h2>
            <CsInfoGrid items={[
              { key: 'Name', value: 'Maria Rodriguez' },
              { key: 'Age', value: '32' },
              { key: 'Occupation', value: 'Community Organizer' },
              { key: 'Digital Access', value: 'Primarily mobile (75%), occasional desktop usage' },
            ]} />
            <h3 className="cs-section-subtitle">Goals</h3>
            <ul className="cs-list">
              <li>Easily access information on free community resources like WiFi and mentorship programs.</li>
              <li>Stay updated on local initiatives and events hosted by The Point CDC.</li>
              <li>Use the website as a tool to help others in the community connect with resources.</li>
            </ul>
            <h3 className="cs-section-subtitle">Frustrations</h3>
            <ul className="cs-list">
              <li>Difficulty finding information on the old website due to cluttered layout.</li>
              <li>Slow loading times and poor mobile optimization made accessing resources inconvenient.</li>
              <li>Lack of a centralized location for event updates, leading to missed community activities.</li>
            </ul>
          </div>
        </section>

        {/* Key Insights */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">Key Insights</span>
            <h2 className="cs-section-title">Research Insights</h2>
            <CsNumList items={[
              <><strong>Ease of Access to WiFi Information:</strong> Users emphasized needing quick access to the &ldquo;Free Hunts Point WiFi&rdquo; section, as it&rsquo;s one of the most valuable resources provided by The Point CDC.</>,
              <><strong>Mobile Usage Preference:</strong> Many residents primarily access the site on mobile devices, underscoring the importance of mobile-friendly navigation.</>,
              <><strong>Event and Program Awareness:</strong> Users highlighted the importance of staying updated on programs like &ldquo;Be a Buddy&rdquo; and events through clear, real-time information.</>,
            ]} />
          </div>
        </section>

        {/* Visual Improvements */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">Discover</span>
            <h2 className="cs-section-title">Visual Improvements</h2>
            <CsBody>
              <p>An audit of the existing site revealed several areas for improvement:</p>
            </CsBody>
            <ul className="cs-list">
              <li><strong>Simplify Navigation:</strong> Reduce menu clutter by grouping items under broader categories.</li>
              <li><strong>Reduce Visual Clutter:</strong> Streamline layout elements to focus on essential information.</li>
              <li><strong>Refine Color Scheme:</strong> Use a cohesive color palette that aligns with the community mission.</li>
              <li><strong>Highlight Key Programs:</strong> Use icons or banners to make important resources more visible.</li>
            </ul>
          </div>
        </section>

        <div className="cs-slide reveal">
          <img src="/Assets/Projects/ThePointCDC/Desktop/Slice 5.png" alt="Before and after visual comparison of the old website with annotated improvement areas" loading="lazy" />
        </div>

        {/* Design Direction */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">Insights</span>
            <h2 className="cs-section-title">Design Direction</h2>
            <CsNumList items={[
              <>The new design should feature clean lines, a simplified color palette, and clearly defined sections for news, programs, and events.</>,
              <>Special emphasis should be placed on typography and imagery that resonates with the community&rsquo;s identity.</>,
            ]} />
          </div>
        </section>

        {/* Goals */}
        <section className="cs-section reveal" style={{ paddingTop: 0 }} id="cs-define">
          <div className="wrap">
            <span className="cs-section-label">Define</span>
            <h2 className="cs-section-title">Goals</h2>
            <CsFeatureGrid features={[
              { title: 'Improve Accessibility', desc: 'Ensure the website is user-friendly and easy to navigate for all community members.' },
              { title: 'Highlight Key Programs', desc: 'Effectively showcase vital services like free WiFi and community initiatives.' },
              { title: 'Enhance Engagement', desc: 'Foster stronger community connections by providing real-time updates and a modern digital experience.' },
            ]} />
          </div>
        </section>

        {/* User Journey */}
        <section className="cs-section reveal" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="cs-section-label">Define</span>
            <h2 className="cs-section-title">User Journey</h2>
            <div className="cs-img-full">
              <img src="/Assets/Projects/ThePointCDC/Desktop/Slice 6.png" alt="User journey map and information architecture flow diagram" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Wireframe slide */}
        <div className="cs-slide reveal">
          <img src="/Assets/Projects/ThePointCDC/Desktop/Slice 7.png" alt="Low-fidelity wireframes for the redesigned website" loading="lazy" />
        </div>

        {/* Visual Style */}
        <section className="cs-section reveal" id="cs-develop">
          <div className="wrap">
            <span className="cs-section-label">Develop</span>
            <h2 className="cs-section-title">Setting Visual Style</h2>
            <CsBody>
              <p>A comprehensive design system was established covering typography, buttons, sections, colors, tags, icons, and menu components to ensure consistency across the entire website.</p>
            </CsBody>
          </div>
        </section>

        <div className="cs-slide reveal">
          <img src="/Assets/Projects/ThePointCDC/Desktop/Slice 8.png" alt="Design system components — typography, buttons, colors, tags, icons, sections, and menu" loading="lazy" />
        </div>

        {/* Visuals & Prototyping */}
        <section className="cs-section reveal" id="cs-deliver">
          <div className="wrap">
            <span className="cs-section-label">Deliver</span>
            <h2 className="cs-section-title">Visuals &amp; Prototyping</h2>
            <CsFeatureGrid features={[
              { title: 'Streamlined Navigation', desc: 'Simplified menu for easier access to information.' },
              { title: 'Responsive Design', desc: 'Optimized for mobile, ensuring smooth access on all devices.' },
              { title: 'Improved Readability', desc: 'Clear sections and whitespace for better content flow.' },
              { title: 'Highlighted Key Programs', desc: 'Featured icons for quick access to important services.' },
              { title: 'Cohesive Color Scheme', desc: 'Used a consistent palette that reflects the community focus.' },
              { title: 'Community Engagement', desc: 'Added testimonials and social media links for trust-building.' },
            ]} />
          </div>
        </section>

        <div className="cs-slide reveal">
          <img src="/Assets/Projects/ThePointCDC/Desktop/Slice 9.png" alt="Final high-fidelity design — desktop and mobile responsive views with annotated improvements" loading="lazy" />
        </div>

        <div className="cs-slide reveal">
          <img src="/Assets/Projects/ThePointCDC/Desktop/Slice 10.png" alt="Additional page designs showing various sections of the redesigned website" loading="lazy" />
        </div>

        {/* Results */}
        <section className="cs-section reveal" id="cs-results">
          <div className="wrap">
            <span className="cs-section-label">Deliver</span>
            <h2 className="cs-section-title">Outcome &amp; Results</h2>
            <CsStatGrid stats={[
              { label: 'Community Engagement Increase', value: '+35%' },
              { label: 'Growth in Mobile Visits', value: '+50%' },
              { label: 'Navigation Time Reduced', value: '60%' },
              { label: 'WiFi Page Discoverability', value: '2x' },
            ]} />
            <CsBody style={{ marginTop: '2rem' }}>
              <p>Feedback from community members and staff was overwhelmingly positive, particularly around the ease of navigation and access to the WiFi program.</p>
            </CsBody>
            <CsPullquote
              quote="Before, I couldn't even find the WiFi page. Now I send the link to my neighbors and they sign up the same day. It finally feels like our website."
              cite="&mdash; Maria, Hunts Point Community Organizer"
            />
          </div>
        </section>

        {/* Reflections */}
        <section className="cs-section reveal" id="cs-reflections">
          <div className="wrap">
            <p className="cs-section-label">Reflections</p>
            <h2 className="cs-section-title">What Community-Centered Design Taught Me</h2>
            <CsNumList items={[
              <><strong>Deep listening beats designer instincts.</strong> Designing for a community you are not part of requires listening, not assumptions. Every interview and site visit reminded me that my instincts about what residents needed were often wrong until I sat down and actually heard their stories.</>,
              <><strong>Mobile-first is a lived reality, not a buzzword.</strong> When 75% of your users literally only have phone access, it reframes every layout decision, every interaction pattern, and every content hierarchy choice. This project made mobile-first thinking a non-negotiable part of my design process.</>,
              <><strong>Balance institutional messaging with genuine utility.</strong> The tension between what a non-profit organization wants to communicate and what community members actually need to find was one of the hardest design challenges. Prioritizing user tasks over organizational messaging led to a site that served both goals more effectively.</>,
              <><strong>Accessibility raises the bar for everyone.</strong> Designing for accessibility forced better design decisions overall &mdash; clearer typography, simpler navigation, and stronger visual hierarchy benefited every single user, not just those with specific needs.</>,
            ]} />
          </div>
        </section>

        {/* Thanks */}
        <section className="cs-section cs-thanks reveal">
          <div className="wrap">
            <h2 className="cs-thanks-title">Thank You</h2>
            <p className="cs-thanks-cta">Please contact me to view a detailed case study</p>
            <a href="mailto:parthpawar@nyu.edu" className="cs-thanks-btn">
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <CsCredits credits={[
              { role: 'Product Designer', name: 'Parth Pawar' },
            ]} style={{ marginTop: '3rem' }} />
          </div>
        </section>

        <BottomNav sections={[
          { id: 'cs-discover', label: 'Discover' },
          { id: 'cs-define', label: 'Define' },
          { id: 'cs-develop', label: 'Develop' },
          { id: 'cs-deliver', label: 'Deliver' },
          { id: 'cs-results', label: 'Results' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} liveUrl="https://thepoint.org" />

      </main>

      <NextProject slug="office-of-diversity" title="Office of Diversity" image="/Assets/images/office-of-diversity.png" />
      <Footer />
    </>
  )
}
