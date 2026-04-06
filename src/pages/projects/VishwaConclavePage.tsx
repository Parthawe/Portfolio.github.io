import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsThanks from '../../components/case-study/CsThanks'
import NextProject from '../../components/case-study/NextProject'

const images = [1, 2, 4, 5, 6]

export default function VishwaConclavePage() {
  return (
    <>
      <Helmet>
        <title>VishwaConclave &middot; Parth Pawar</title>
        <meta name="description" content="Creative direction, branding, and web design for VishwaConclave, one of India's first truly multidisciplinary student-centric conferences." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="VishwaConclave · Parth Pawar" />
        <meta property="og:description" content="Creative direction, branding, and web design for a student conference." />
        <meta property="og:image" content="https://parthpawar.com/Assets/Projects/VishwaConclave/1.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#1A3A5C' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="brand-visual"
          backLabel="Back to Work"
          tags={['Brand', 'Creative Direction', 'Web Design']}
          title="VishwaConclave"
          subtitle="Creative direction, branding, and web design for a student conference"
          info={[
            { label: 'Year', value: '2021' },
            { label: 'Role', value: 'Creative Director' },
          ]}
        />

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-body" style={{ maxWidth: '720px' }}>
              VishwaConclave is amongst India&rsquo;s first truly multidisciplinary student-centric conferences organized by the students of Vishwakarma Institute of Technology, Pune. Starting as a Junior Designer in December 2019, my responsibilities expanded over 3 years to Creative Director &mdash; in charge of Marketing, Social Media, Aesthetics, Design, and Website.
            </p>
          </div>
        </section>

        {/* Image sequence */}
        {images.map((num, i) => (
          <div className="cs-slide reveal" key={num}>
            <img src={`/Assets/Projects/VishwaConclave/${num}.jpg`} alt={`VishwaConclave, slide ${num}`} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}

        <CsThanks />

      </main>

      <NextProject slug="healthapp" title="VJ Parivar" image="/Assets/Projects/health-app/1.jpg" />
      <Footer />
    </>
  )
}
