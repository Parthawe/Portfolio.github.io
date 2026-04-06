import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsThanks from '../../components/case-study/CsThanks'
import NextProject from '../../components/case-study/NextProject'

export default function HealthAppPage() {
  return (
    <NdaGate slug="healthapp" projectName="VJ Parivar">
      <Helmet>
        <title>VJ Parivar &middot; Parth Pawar</title>
        <meta name="description" content="VJ Parivar is a post-purchase services app for VJ Real Estate homeowners. Designing the digital forefront of a real estate company." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="VJ Parivar · Parth Pawar" />
        <meta property="og:description" content="Post-purchase services app for VJ Real Estate homeowners." />
        <meta property="og:image" content="https://parthpawar.com/Assets/Projects/health-app/1.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4A90A4' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['UX Design', 'Mobile App']}
          title="VJ Parivar"
          subtitle="Post-purchase services app for VJ Real Estate homeowners"
          info={[
            { label: 'Year', value: '2020' },
            { label: 'Role', value: 'UX Designer' },
          ]}
        />

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-body" style={{ maxWidth: '720px' }}>
              VJ Parivar is an app for the homeowners of VJ Real Estate and constructions company. It aims to be the face of VJ services to their homeowners after their purchase of a house from VJ. Designing the digital forefront of a real estate company &mdash; to be the face of its post-payment services.
            </p>
          </div>
        </section>

        {/* Image sequence */}
        {Array.from({ length: 11 }, (_, i) => (
          <div className="cs-slide reveal" key={i}>
            <img src={`/Assets/Projects/health-app/${i + 1}.jpg`} alt={`VJ Parivar, slide ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}

        <CsThanks />

      </main>

      <NextProject slug="ibm" title="IBM Cancer Prognosis" image="/Assets/Projects/ibm/1.jpg" />
      <Footer />
    </NdaGate>
  )
}
