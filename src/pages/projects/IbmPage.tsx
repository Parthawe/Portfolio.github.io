import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsThanks from '../../components/case-study/CsThanks'
import NextProject from '../../components/case-study/NextProject'

export default function IbmPage() {
  return (
    <>
      <Helmet>
        <title>IBM Cancer Prognosis &middot; Parth Pawar</title>
        <meta name="description" content="Securely transfer genomic data and identify life expectancy of cancer patients. Exploring secure transfer of Personal Health Information using encryption techniques." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="IBM Cancer Prognosis · Parth Pawar" />
        <meta property="og:description" content="Securely transfer genomic data and identify life expectancy of cancer patients." />
        <meta property="og:image" content="https://parthpawar.com/Assets/Projects/ibm/1.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#054ADA' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['UX Design', 'Healthcare', 'Research']}
          title="IBM Cancer Prognosis"
          subtitle="Securely transfer genomic data and identify life expectancy of cancer patients"
          info={[
            { label: 'Year', value: '2020' },
            { label: 'Role', value: 'Research Intern' },
          ]}
        />

        {/* Overview — public */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-body" style={{ maxWidth: '720px' }}>
              The most important clinical process for patients with forms of cancer is the accurate estimation of prognosis and survival duration. Ensuring data privacy in computation while processing genomic data is a critical challenge. This project explored secure transfer of Personal Health Information using encryption techniques.
            </p>
          </div>
        </section>

        {Array.from({ length: 7 }, (_, i) => (
          <div className="cs-slide reveal" key={i}>
            <img src={`/Assets/Projects/ibm/${i + 1}.jpg`} alt={`IBM Cancer Prognosis, slide ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}

        <CsThanks />

      </main>

      <NextProject slug="sculpture" title="Sculpture" image="/Assets/Projects/Sculpture/1.jpg" />
      <Footer />
    </>
  )
}
