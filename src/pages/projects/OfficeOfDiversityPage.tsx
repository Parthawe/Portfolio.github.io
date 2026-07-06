import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
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
        <meta name="description" content="Office of Diversity Report & Data Visualization, an interactive IDBEA report for NYU Tisch School of the Arts, translating complex data into engaging, accessible visuals that foster community engagement." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Office of Diversity · Parth Pawar" />
        <meta property="og:description" content="Interactive IDBEA data visualization report for NYU Tisch, translating data into accessible visuals." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/office-of-diversity.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#57068C' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="design-for-good"
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
          heroImage="/Portfolio.github.io/Assets/Projects/office-of-diversity/photos/responsive-preview.png"
          heroAlt="Tisch IDBEA 2024 Report: desktop and mobile responsive views"
        />

        {/* Product photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/office-of-diversity/photos/full-report-page.webp" alt="Full IDBEA report page: data visualizations, timelines, statistics, and milestones" loading="lazy" /></div>
          </div>
        </section>

        {/* Research + testing */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/office-of-diversity/photos/research-wall.webp" alt="Research: sticky note wall with timeline mapping and information architecture" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/office-of-diversity/photos/user-testing.png" alt="User testing session with participants reviewing the report" loading="lazy" /></div>
            </div>
          </div>
        </section>

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

        <CsImage src="/Portfolio.github.io/Assets/Projects/office-of-diversity/2.jpg" alt="Summary, challenges, role, and tools overview for the IDBEA report project" />

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
                <img src="/Portfolio.github.io/Assets/Projects/office-of-diversity/3.webp" alt="IDBEA report context, Tisch Office of Diversity values and process overview" loading="lazy" />
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

        <CsImage src="/Portfolio.github.io/Assets/Projects/office-of-diversity/4.webp" alt="Process steps, understanding scope, design conceptualization, and data visualization approach" />

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

        <CsImage src="/Portfolio.github.io/Assets/Projects/office-of-diversity/5.webp" alt="Process steps, interactivity, collaboration sessions, and accessibility compliance" />

        {/* Impact */}
        <CsSection id="cs-impact" label="Impact" title="Outcome">
          <CsStatGrid stats={[
            { label: 'Accessibility', value: 'Built to WCAG 2.1 AA' },
          ]} />
        </CsSection>

        {/* Reflections */}
        <CsSection id="cs-reflections" label="Reflections" title="What this project taught me">
          <CsNumList items={[
            <><strong>Institutional trust is built in the details.</strong> Every color choice, every word, every layout decision carried the weight of NYU Tisch&rsquo;s commitment to its community. Choosing accessible type sizes over flashy ones, letting the data speak clearly rather than over-designing it, and ensuring every stakeholder saw their voice reflected in the final product &mdash; these small decisions compound into credibility.</>,
            <><strong>Data visualization is an act of translation, not decoration.</strong> Complex institutional data needs a designer who can hold two things at once: fidelity to the numbers and empathy for the reader. The charts and timelines in this report were not about making data &ldquo;pretty&rdquo; &mdash; they were about making a decade of progress legible to the community it serves.</>,
          ]} />
        </CsSection>

        <CsThanks contactCta />

        <BottomNav sections={[
          { id: 'cs-goals', label: 'Goals' },
          { id: 'cs-process', label: 'Process' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

      <NextProject slug="clawed-chat" title="Clawed" image="/Portfolio.github.io/Assets/images/clawed.webp" />
      <Footer />
    </>
  )
}
