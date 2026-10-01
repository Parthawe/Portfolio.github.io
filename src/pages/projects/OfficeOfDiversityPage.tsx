import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function OfficeOfDiversityPage() {
  return (
    <>
      <Helmet>
        <title>Office of Diversity &middot; Parth Pawar</title>
        <meta name="description" content="A compact glimpse of the NYU Tisch Office of Diversity IDBEA report, translating institutional content into an accessible web report." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Office of Diversity · Parth Pawar" />
        <meta property="og:description" content="Interactive IDBEA report for NYU Tisch, focused on accessible structure, data clarity, and responsive publishing." />
        <meta property="og:image" content="https://designwhich.works/Assets/mockups/projects/office-of-diversity_16x9.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main project-main--office-diversity" style={{ '--project-color': '#57068C' } as React.CSSProperties}>
        <ProjectHeader
          backLink="/work"
          categorySlug="design-for-good"
          backLabel="Back to Work"
          tags={['UI/UX', 'Data Visualization', 'Accessibility']}
          title="Office of Diversity Report"
          subtitle="A compact report-publishing project for NYU Tisch's IDBEA work"
          info={[
            { label: 'Client', value: 'Office of Diversity, TSOA' },
            { label: 'Role', value: 'Website Publishing Designer' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2024' },
          ]}
          heroImage="/Assets/Projects/office-of-diversity/photos/responsive-preview.png"
          heroAlt="Tisch IDBEA report shown across desktop and mobile responsive views"
        />

        <CsSection id="cs-glimpse" label="Approach" title="From a dense report to a navigable website">
          <CsBody>
            <p>I changed the reading order from dense institutional material to four entry points: context, milestones, data, and accessibility. The planning boards below show how those groups were formed; the report screens show the resulting hierarchy on the page.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="ofd-process-stack" data-project-preview>
              <figure className="ofd-wide-shot">
                <img data-project-preview src="/Assets/Projects/office-of-diversity/photos/research-wall.webp" alt="Whiteboard and sticky-note research wall used to organize report themes and content priorities" loading="lazy" decoding="async" />
                <figcaption>First pass: sort the institutional material into themes, page groups, and reader questions.</figcaption>
              </figure>
              <figure className="ofd-wide-shot">
                <img data-project-preview src="/Assets/Projects/office-of-diversity/photos/scope-timeline.png" alt="Scope timeline showing understanding scope, design concept, data visualization, engagement, collaboration, and accessibility compliance" loading="lazy" decoding="async" />
                <figcaption>Scope map: translate themes into milestones, data moments, collaboration loops, and accessibility checks.</figcaption>
              </figure>
              <div className="ofd-workshop-grid">
                <figure>
                  <img data-project-preview src="/Assets/Projects/office-of-diversity/photos/community-workshop-1.png" alt="Community workshop table with participants browsing printed report material" loading="lazy" decoding="async" />
                </figure>
                <figure>
                  <img data-project-preview src="/Assets/Projects/office-of-diversity/photos/community-workshop-2.png" alt="Community member holding printed Office of Diversity report material during a workshop" loading="lazy" decoding="async" />
                </figure>
                <figure>
                  <img data-project-preview src="/Assets/Projects/office-of-diversity/photos/community-workshop-3.png" alt="Participants reviewing printed report materials during an Office of Diversity workshop" loading="lazy" decoding="async" />
                </figure>
              </div>
              <p className="cs-caption">The report had to work both as a web artifact and as something people could discuss in a room.</p>
            </div>
          </div>
        </section>

        <CsSection id="cs-report" label="Report" title="The report, section by section">
          <CsBody>
            <p>The report moves from context to milestones, data, and accessibility. Open each image to inspect the layout at full size.</p>
          </CsBody>
          <div className="ofd-report-slices" data-project-preview>
            <figure>
              <img data-project-preview src="/Assets/Projects/office-of-diversity/photos/report-slices/report-intro.png" alt="Top section of the IDBEA web report with title, introductory content, and opening report structure" loading="lazy" decoding="async" />
              <figcaption>01 / Opening structure</figcaption>
            </figure>
            <figure>
              <img data-project-preview src="/Assets/Projects/office-of-diversity/photos/report-slices/report-timeline.png" alt="Middle section of the IDBEA web report showing timeline and milestone content" loading="lazy" decoding="async" />
              <figcaption>02 / Timeline and milestones</figcaption>
            </figure>
            <figure>
              <img data-project-preview src="/Assets/Projects/office-of-diversity/photos/report-slices/report-data.png" alt="Middle section of the IDBEA web report showing data visualization and progress sections" loading="lazy" decoding="async" />
              <figcaption>03 / Data and visual summaries</figcaption>
            </figure>
            <figure>
              <img data-project-preview src="/Assets/Projects/office-of-diversity/photos/report-slices/report-access.png" alt="Lower section of the IDBEA web report showing accessibility, collaboration, and closing content" loading="lazy" decoding="async" />
              <figcaption>04 / Accessibility and closing content</figcaption>
            </figure>
          </div>
        </CsSection>

        <CsSection id="cs-impact" label="Impact" title="What improved">
          <CsFeatureGrid features={[
            { title: 'Readable structure', desc: 'The report moved from one dense artifact into clear sections that could be scanned and revisited.' },
            { title: 'Accessible presentation', desc: 'The web version prioritized responsive layouts, readable text, alt text, and accessible chart context.' },
            { title: 'Community-facing clarity', desc: 'The final shape helped institutional progress read as a public record rather than an internal document.' },
          ]} />
        </CsSection>

        <CsSection id="cs-learning" label="Learning" title="What I learned">
          <CsBody>
            <p>I learned to make institutional data easier to navigate without losing its context. Readers should be able to understand the report without someone explaining it beside them.</p>
          </CsBody>
          <CsImage
            src="/Assets/Projects/office-of-diversity/4.webp"
            alt="IDBEA report process and data visualization approach"
            caption="A small proof of the work: turning report sections, timelines, and data into a readable web structure."
          />
        </CsSection>

        <CsThanks contactCta />

        <BottomNav sections={[
          { id: 'cs-glimpse', label: 'Glimpse' },
          { id: 'cs-report', label: 'Report' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-learning', label: 'Learning' },
        ]} />
      </main>

      <NextProject slug="jugalbandi" title="Jugalbandi" image="/Assets/mockups/projects/jugalbandi_16x9.webp" />
      <Footer />
    </>
  )
}
