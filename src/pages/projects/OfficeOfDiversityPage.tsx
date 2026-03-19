import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ReadingProgress from '../../components/case-study/ReadingProgress'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsImage from '../../components/case-study/CsImage'
import CsNumList from '../../components/case-study/CsNumList'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function OfficeOfDiversityPage() {
  return (
    <>
      <Helmet>
        <title>Office of Diversity &middot; Parth Pawar</title>
        <meta name="description" content="Office of Diversity Report & Data Visualization — an interactive IDBEA report for NYU Tisch School of the Arts, translating complex data into engaging, accessible visuals that foster community engagement." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Office of Diversity · Parth Pawar" />
        <meta property="og:description" content="Interactive IDBEA data visualization report for NYU Tisch — translating data into accessible visuals." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/office-of-diversity.png" />
      </Helmet>

      <Nav />
      <ReadingProgress />

      <main id="main-content" className="project-main" style={{ '--project-color': '#6B2D8B' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          backLabel="Back to Work"
          tags={['UI/UX', 'Data Visualization', 'Research']}
          title="Office of Diversity Report & Data Visualization"
          subtitle="Interactive IDBEA report for NYU Tisch School of the Arts"
          info={[
            { label: 'Client', value: 'Office Of Diversity TSOA' },
            { label: 'Scope', value: 'User Research, UI/UX, Prototyping' },
            { label: 'Role', value: 'Website Publishing Designer' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2024' },
          ]}
          heroImage="/Assets/Projects/Office of Diversity/1.jpg"
          heroAlt="Office of Diversity Report — mobile and laptop mockups of the IDBEA 2024 report"
        />

        <ProjectOverview
          sections={[
            {
              label: 'Summary',
              content: 'This project aimed to create an engaging, accessible, and interactive visualization for the 2024 IDBEA report, showcasing the Tisch School of the Arts\u2019 progress in fostering inclusion, diversity, belonging, equity, and accessibility (IDBEA). Collaborating with Christina Monea from the Office of Diversity, my goal was to translate complex data into user-friendly visuals that reflect Tisch\u2019s values and foster deeper community engagement.',
            },
            {
              label: 'Challenges',
              content: '\u2022 Data Precision \u2014 Visualizing complex data accurately while maintaining clarity and readability.\n\u2022 Interactive Engagement \u2014 Developing dynamic components to encourage users to explore milestones and data points.',
            },
            {
              label: 'My Role',
              content: '\u2022 Data Visualization \u2014 Designing interactive timelines, charts, and graphs.\n\u2022 User Experience \u2014 Ensuring a seamless and engaging user experience with interactive and accessible elements.',
            },
          ]}
        />

        {/* Tools */}
        <section className="cs-section reveal">
          <div className="wrap">
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

        <CsImage src="/Assets/Projects/Office of Diversity/2.jpg" alt="Summary, challenges, role, and tools overview for the IDBEA report project" />

        {/* IDBEA Context */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-two-col">
              <div>
                <h2 className="cs-display" style={{ color: 'var(--project-color)' }}>The IDBEA Report</h2>
                <CsBody>
                  <p>Tisch&rsquo;s Office of Diversity champions Inclusion, Diversity, Belonging, Equity, and Accessibility (IDBEA) across the school. The 2024 report documents a decade of progress &mdash; from early listening sessions and foundational learning to the establishment of a dedicated office and committee structures that ensure lasting institutional change.</p>
                </CsBody>
              </div>
              <div className="cs-img">
                <img src="/Assets/Projects/Office of Diversity/3.jpg" alt="IDBEA report context — Tisch Office of Diversity values and process overview" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Project Goals */}
        <CsSection id="cs-goals" label="Project Goals" title="What we set out to achieve">
          <CsFeatureGrid features={[
            { title: 'Data Precision', desc: 'Visualize complex data accurately while keeping it approachable and easy to understand.' },
            { title: 'Interactivity', desc: 'Build dynamic components that encourage exploration and engagement with milestones.' },
            { title: 'Accessibility', desc: 'Ensure the report meets WCAG standards and is usable by everyone in the community.' },
            { title: 'Collaborative Review', desc: 'Integrate continuous feedback from faculty, students, and staff throughout the process.' },
          ]} />
        </CsSection>

        {/* Design Process */}
        <CsSection id="cs-process" label="Design Process" title="From scope to delivery">
          <CsSteps steps={[
            { num: '01', title: 'Understanding Scope', desc: 'Key metrics, themes & milestones' },
            { num: '02', title: 'Design Concept', desc: 'Interactive timeline & visual direction' },
            { num: '03', title: 'Data Visualization', desc: 'D3.js, Tableau, charts & graphs' },
            { num: '04', title: 'User Engagement', desc: 'Clickable data points & real-time views' },
            { num: '05', title: 'Collaboration', desc: 'Feedback integration with stakeholders' },
            { num: '06', title: 'Accessibility', desc: 'WCAG 2.1 Level AA compliance' },
          ]} />
        </CsSection>

        {/* Process Step 1 */}
        <CsSection label="01 \u2014 Process" title="Understanding The Scope">
          <CsBody>
            <p>The first step involved deep-diving into the report&rsquo;s key metrics, themes, and milestones. Three core focus areas emerged:</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Learning & Engagement', desc: 'Educational programs and community workshops driving awareness across Tisch.' },
            { title: 'Restorative Practices', desc: 'Addressing IDBEA concerns and global events through structured case resolution.' },
            { title: 'Collaborative Efforts', desc: 'School-wide programming that brings together faculty, staff, and students.' },
          ]} />
        </CsSection>

        {/* Process Step 2 */}
        <section className="cs-section reveal" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="cs-section-label">02 &mdash; Process</span>
            <h2 className="cs-section-title">Design Conceptualization</h2>
            <CsBody>
              <p>An interactive timeline was designed to map IDBEA milestones spanning 2014&ndash;2024, alongside dynamic charts and graphs. Early ideation involved sticky notes, whiteboard sessions, and rapid sketching to explore visual directions.</p>
            </CsBody>
          </div>
        </section>

        {/* Process Step 3 */}
        <section className="cs-section reveal" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="cs-section-label">03 &mdash; Process</span>
            <h2 className="cs-section-title">Data Visualization</h2>
            <CsSteps steps={[
              { num: '01', title: 'Tool Selection', desc: 'D3.js and Tableau were chosen for their flexibility in rendering interactive, data-driven visuals.' },
              { num: '02', title: 'Color-Coded Bar Charts', desc: 'Engagement metrics visualized through a consistent color system tied to each IDBEA pillar.' },
              { num: '03', title: 'Dynamic Pie Charts', desc: 'Breakdowns of participation, demographics, and resource allocation rendered as interactive pie charts.' },
              { num: '04', title: 'Interactive Tooltips', desc: 'Hover and click-to-reveal tooltips providing context and detail on every data point.' },
            ]} />
          </div>
        </section>

        <CsImage src="/Assets/Projects/Office of Diversity/4.jpg" alt="Process steps — understanding scope, design conceptualization, and data visualization approach" />

        {/* Process Step 4 */}
        <CsSection label="04 \u2014 Process" title="Interactivity & User Engagement">
          <CsFeatureGrid features={[
            { title: 'Clickable Data Points', desc: 'Each data point expands to reveal detailed information, case studies, and related milestones.' },
            { title: 'Real-Time Progress', desc: 'Users can view Tisch\u2019s IDBEA progress in real-time through animated transitions and live data feeds.' },
          ]} />
        </CsSection>

        {/* Process Step 5 */}
        <section className="cs-section reveal" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="cs-section-label">05 &mdash; Process</span>
            <h2 className="cs-section-title">Collaboration &amp; Feedback Integration</h2>
            <CsBody>
              <p>Over a 3-month process working with Christina Monea, the project involved multiple feedback sessions with faculty, students, and staff. This iterative cycle ensured the final product accurately reflected the community&rsquo;s voice and the office&rsquo;s mission.</p>
            </CsBody>
          </div>
        </section>

        {/* Process Step 6 */}
        <section className="cs-section reveal" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="cs-section-label">06 &mdash; Process</span>
            <h2 className="cs-section-title">Accessibility Compliance</h2>
            <CsFeatureGrid features={[
              { title: 'WCAG 2.1 Level AA', desc: 'Full compliance with established web accessibility guidelines.' },
              { title: 'Screen Reader Support', desc: 'Text alternatives for all visual elements, ensuring screen reader compatibility.' },
              { title: 'High-Contrast Colors', desc: 'Color schemes designed for maximum readability across all visual conditions.' },
              { title: 'Keyboard Navigation', desc: 'Every interactive element fully navigable without a mouse.' },
            ]} />
          </div>
        </section>

        <CsImage src="/Assets/Projects/Office of Diversity/5.jpg" alt="Process steps — interactivity, collaboration sessions, and accessibility compliance" />

        {/* Impact */}
        <CsSection id="cs-impact" label="Impact" title="Outcome">
          <CsStatGrid stats={[
            { label: 'User Interaction', value: '+74%' },
            { label: 'Accessibility', value: 'WCAG 2.1 AA' },
            { label: 'Collaborative Process', value: '3 Months' },
          ]} />
        </CsSection>

        {/* Reflections */}
        <CsSection id="cs-reflections" label="Reflections" title="What this project taught me">
          <CsNumList items={[
            <><strong>Institutional trust is built in the details.</strong> Every color choice, every word, every layout decision carried the weight of NYU Tisch&rsquo;s commitment to its community. Choosing accessible type sizes over flashy ones, letting the data speak clearly rather than over-designing it, and ensuring every stakeholder saw their voice reflected in the final product &mdash; these small decisions compound into credibility.</>,
            <><strong>Designing about inclusion demands honesty, not performance.</strong> It is easy to fall into performative visuals &mdash; bold statements and stock imagery that signal values without embodying them. Working closely with Christina and the Office of Diversity team kept the work honest. The design had to serve the people and the progress it documented, not just look good on a screen.</>,
            <><strong>Data visualization is an act of translation, not decoration.</strong> Complex institutional data needs a designer who can hold two things at once: fidelity to the numbers and empathy for the reader. The charts and timelines in this report were not about making data &ldquo;pretty&rdquo; &mdash; they were about making a decade of progress legible to the community it serves.</>,
            <><strong>Collaborative feedback loops produce better outcomes than isolated design sprints.</strong> The 3-month process of iterating with faculty, students, and staff surfaced blind spots I would never have caught alone. The best design decisions in this project came from conversations, not from my Figma artboard.</>,
          ]} />
        </CsSection>

        <CsImage src="/Assets/Projects/Office of Diversity/6.jpg" alt="Outcome — 74% increase in user interaction, accessibility success, and key learnings" />

        {/* The Report */}
        <CsSection id="cs-report" label="The Report" title="IDBEA 2024 Report">
          <CsBody>
            <p>The final report traces a decade of IDBEA milestones &mdash; from the initial commitment in 2014 through listening sessions, foundational learning, the establishment of the Cabinet, the hiring of an Assistant Dean, and the expansion of the Office of Diversity &mdash; culminating in the formation of the IDBEA Committee in 2023.</p>
          </CsBody>
        </CsSection>

        {/* Timeline */}
        <section className="cs-section reveal" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="cs-section-label">Timeline</span>
            <h2 className="cs-section-title">A Decade of Progress</h2>
            <CsSteps steps={[
              { num: '2014', title: '', desc: 'Commitment to IDBEA' },
              { num: '2015', title: '', desc: 'Listening sessions begin' },
              { num: '2017', title: '', desc: 'Foundational learning' },
              { num: '2018', title: '', desc: 'Cabinet established' },
              { num: '2019', title: '', desc: 'Assistant Dean hired' },
              { num: '2020', title: '', desc: 'Reaffirm commitment' },
              { num: '2022', title: '', desc: 'Office expands' },
              { num: '2023', title: '', desc: 'Committee established' },
            ]} />
          </div>
        </section>

        {/* Team */}
        <section className="cs-section reveal" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="cs-section-label">The Team</span>
            <h2 className="cs-section-title">Meet the Office of Diversity</h2>
            <CsFeatureGrid features={[
              { title: 'Christina Salgado', desc: 'Assistant Dean' },
              { title: 'Monae Freeman', desc: 'Diversity Program Administrator' },
              { title: 'Kevin Hunter', desc: 'Administrative Aide' },
            ]} />
          </div>
        </section>

        <CsImage src="/Assets/Projects/Office of Diversity/7.jpg" alt="IDBEA 2024 Report — timeline, team, and approach overview" />

        {/* Advisement */}
        <CsSection label="Structure" title="Advisement & Feedback Groups">
          <CsFeatureGrid features={[
            { title: 'Cabinet', desc: '' },
            { title: 'Deans and Chairs', desc: '' },
            { title: 'IDBEA Committee', desc: '' },
            { title: 'Coalition', desc: '' },
          ]} />
        </CsSection>

        {/* Focus Areas */}
        <section className="cs-section reveal" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="cs-section-label">Focus Areas</span>
            <h2 className="cs-section-title">Four Pillars of IDBEA Work</h2>
            <CsFeatureGrid features={[
              { title: 'Learning & Engagement', desc: 'Workshops, dialogues, and educational programming across the Tisch community.' },
              { title: 'Resource Development', desc: 'Building tools, guides, and materials to support IDBEA work at every level.' },
              { title: 'Restorative Practices', desc: 'Addressing concerns and conflicts through structured, empathetic case resolution.' },
              { title: 'School-wide Collaborative Programming', desc: 'Cross-departmental initiatives that unite the Tisch community around shared values.' },
            ]} />
          </div>
        </section>

        <CsImage src="/Assets/Projects/Office of Diversity/8.jpg" alt="Report — advisement groups, focus areas, and data visualization charts showing engagement metrics" />

        {/* Data Highlights */}
        <CsSection label="Data Highlights" title="Report Data at a Glance">
          <CsBody>
            <p>The report showcases key program outcomes across restorative practices, student funding, and enrollment. These figures were visualized through color-coded charts and interactive data points in the final design.</p>
          </CsBody>
          <CsStatGrid stats={[
            { label: 'Restorative Cases (IDBEA)', value: '33' },
            { label: 'Restorative Cases (Global Events)', value: '14' },
            { label: 'HEAR US Funding', value: '$62K' },
            { label: 'Student Awardees', value: '11' },
            { label: 'Future Artists Enrolled', value: '178' },
            { label: 'Departments Represented', value: '7' },
          ]} />
          <details className="cs-details">
            <summary className="cs-details-summary">IDBEA report data highlights</summary>
            <div className="cs-details-content">
              <p><strong>Restorative Practice:</strong> The Office addressed 33 cases in response to general IDBEA concerns and 14 cases in response to current global events, using structured, empathetic case resolution to support the Tisch community.</p>
              <p><strong>HEAR US Program:</strong> $62,000 was distributed among 11 student awardees, with 38 students mentored through the program &mdash; providing direct funding and guidance to amplify underrepresented voices in the arts.</p>
              <p><strong>Future Artists:</strong> 178 students enrolled across 7 departments, expanding access and representation in Tisch&rsquo;s creative pipeline through targeted outreach and programming.</p>
            </div>
          </details>
        </CsSection>

        <CsImage src="/Assets/Projects/Office of Diversity/9.jpg" alt="Report — restorative practices stats, HEAR US program, Future Artists enrollment, and the year ahead" />

        <CsThanks contactCta />

        <CsImage src="/Assets/Projects/Office of Diversity/10.jpg" alt="Credits — Parth Pawar, UI/UX Designer" />

        <BottomNav sections={[
          { id: 'cs-goals', label: 'Goals' },
          { id: 'cs-process', label: 'Process' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-reflections', label: 'Reflections' },
          { id: 'cs-report', label: 'The Report' },
        ]} />

      </main>

      <NextProject slug="clawed-chat" title="Clawed" image="/Assets/images/clawed.png" />
      <Footer />
    </>
  )
}
