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
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/office-of-diversity.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#57068C' } as React.CSSProperties}>
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
          heroImage="/Portfolio.github.io/Assets/Projects/office-of-diversity/photos/responsive-preview.png"
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

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/office-of-diversity/photos/full-report-page.webp" alt="Full IDBEA web report page with visual sections and data blocks" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/office-of-diversity/photos/user-testing.png" alt="User testing session for the IDBEA web report" loading="lazy" /></div>
            </div>
          </div>
        </section>

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
            src="/Portfolio.github.io/Assets/Projects/office-of-diversity/4.webp"
            alt="IDBEA report process and data visualization approach"
            caption="A small proof of the work: turning report sections, timelines, and data into a readable web structure."
          />
        </CsSection>

        <CsThanks contactCta />

        <BottomNav sections={[
          { id: 'cs-glimpse', label: 'Glimpse' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-learning', label: 'Learning' },
        ]} />
      </main>

      <NextProject slug="clawed-chat" title="Clawed" image="/Portfolio.github.io/Assets/images/clawed.webp" />
      <Footer />
    </>
  )
}
