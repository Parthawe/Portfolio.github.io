import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
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
        <meta property="og:image" content="https://www.designwhich.works/Assets/mockups/projects/office-of-diversity_16x9.webp" />
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

        <CsSection id="cs-glimpse" label="Glimpse" title="A Report That Needed To Be Read, Not Just Posted">
          <CsBody>
            <p>The work here was practical: take the 2024 IDBEA report for NYU Tisch's Office of Diversity and shape it into a web experience people could scan, navigate, and return to. This page does not need a long process story; the value was in clean publishing, clear structure, responsive presentation, and accessible handling of institutional content.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Problem</span>
            <span className="cs-label-row-val">A dense institutional report needed to become easier to read across desktop and mobile without flattening the data.</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Method</span>
            <span className="cs-label-row-val">Break the content into structured sections, timelines, visual summaries, and responsive pages that supported scanning.</span>
          </div>
          <div className="cs-label-row" style={{ borderBottom: 'none' }}>
            <span className="cs-label-row-key">Result</span>
            <span className="cs-label-row-val">An accessible web report that made IDBEA milestones and progress easier for the Tisch community to explore.</span>
          </div>
        </CsSection>

        <CsExpandPreview
          ctaLabel="Open the report proof"
          note="Workshop artifacts, report slices, impact points, and learning notes."
        >

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="ofd-process-stack">
              <figure className="ofd-wide-shot">
                <img src="/Assets/Projects/office-of-diversity/photos/research-wall.webp" alt="Whiteboard and sticky-note research wall used to organize report themes and content priorities" loading="lazy" decoding="async" />
                <figcaption>First pass: sort the institutional material into themes, page groups, and reader questions.</figcaption>
              </figure>
              <figure className="ofd-wide-shot">
                <img src="/Assets/Projects/office-of-diversity/photos/scope-timeline.png" alt="Scope timeline showing understanding scope, design concept, data visualization, engagement, collaboration, and accessibility compliance" loading="lazy" decoding="async" />
                <figcaption>Scope map: translate themes into milestones, data moments, collaboration loops, and accessibility checks.</figcaption>
              </figure>
              <div className="ofd-workshop-grid">
                <figure>
                  <img src="/Assets/Projects/office-of-diversity/photos/community-workshop-1.png" alt="Community workshop table with participants browsing printed report material" loading="lazy" decoding="async" />
                </figure>
                <figure>
                  <img src="/Assets/Projects/office-of-diversity/photos/community-workshop-2.png" alt="Community member holding printed Office of Diversity report material during a workshop" loading="lazy" decoding="async" />
                </figure>
                <figure>
                  <img src="/Assets/Projects/office-of-diversity/photos/community-workshop-3.png" alt="Participants reviewing printed report materials during an Office of Diversity workshop" loading="lazy" decoding="async" />
                </figure>
              </div>
              <p className="cs-caption">The report had to work both as a web artifact and as something people could discuss in a room.</p>
            </div>
          </div>
        </section>

        <CsSection id="cs-report" label="Report" title="The Web Report, Shown In Readable Sections">
          <CsBody>
            <p>Instead of shrinking the full page into one unreadable strip, the report is shown here as a sequence. Each slice keeps the top-to-bottom flow while making the actual hierarchy, timeline, data blocks, and accessibility structure legible.</p>
          </CsBody>
          <div className="ofd-report-slices">
            <figure>
              <img src="/Assets/Projects/office-of-diversity/photos/report-slices/report-intro.png" alt="Top section of the IDBEA web report with title, introductory content, and opening report structure" loading="lazy" decoding="async" />
              <figcaption>01 / Opening structure</figcaption>
            </figure>
            <figure>
              <img src="/Assets/Projects/office-of-diversity/photos/report-slices/report-timeline.png" alt="Middle section of the IDBEA web report showing timeline and milestone content" loading="lazy" decoding="async" />
              <figcaption>02 / Timeline and milestones</figcaption>
            </figure>
            <figure>
              <img src="/Assets/Projects/office-of-diversity/photos/report-slices/report-data.png" alt="Middle section of the IDBEA web report showing data visualization and progress sections" loading="lazy" decoding="async" />
              <figcaption>03 / Data and visual summaries</figcaption>
            </figure>
            <figure>
              <img src="/Assets/Projects/office-of-diversity/photos/report-slices/report-access.png" alt="Lower section of the IDBEA web report showing accessibility, collaboration, and closing content" loading="lazy" decoding="async" />
              <figcaption>04 / Accessibility and closing content</figcaption>
            </figure>
          </div>
        </CsSection>

        <CsSection id="cs-impact" label="Impact" title="What The Work Improved">
          <CsFeatureGrid features={[
            { title: 'Readable structure', desc: 'The report moved from one dense artifact into clear sections that could be scanned and revisited.' },
            { title: 'Accessible presentation', desc: 'The web version prioritized responsive layouts, readable text, alt text, and accessible chart context.' },
            { title: 'Community-facing clarity', desc: 'The final shape helped institutional progress read as a public record rather than an internal document.' },
          ]} />
        </CsSection>

        <CsSection id="cs-learning" label="Learning" title="What I Learned">
          <CsBody>
            <p>This project taught me that data visualization is not decoration. For institutional work, clarity is the design. The main responsibility was to preserve trust: make the information navigable, avoid over-styling sensitive content, and let the reader understand progress without needing someone to explain the report beside them.</p>
          </CsBody>
          <CsImage
            src="/Assets/Projects/office-of-diversity/4.webp"
            alt="IDBEA report process and data visualization approach"
            caption="A small proof of the work: turning report sections, timelines, and data into a readable web structure."
          />
        </CsSection>

        <CsThanks contactCta />
        </CsExpandPreview>

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
