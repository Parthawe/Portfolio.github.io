import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsThanks from '../../components/case-study/CsThanks'
import NextProject from '../../components/case-study/NextProject'

export default function SculpturePage() {
  return (
    <>
      <Helmet>
        <title>Sculpture &middot; Parth Pawar</title>
        <meta name="description" content="Competition sculptures for Firodia Karandak, Pune. From beginner to winner through tireless practice sessions." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Sculpture · Parth Pawar" />
        <meta property="og:description" content="Competition sculptures for Firodia Karandak, Pune." />
        <meta property="og:image" content="https://parthpawar.com/Assets/Projects/Sculpture/1.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#8B6914' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Sculpture', 'Art', 'Competition']}
          title="Sculpture"
          subtitle="Competition sculptures for Firodia Karandak, Pune"
          info={[
            { label: 'Year', value: '2020' },
            { label: 'Role', value: 'Sculptor' },
          ]}
        />

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-body" style={{ maxWidth: '720px' }}>
              Being an artist and heavily involved in drama and skits, Firodia Karandak &mdash; a renowned inter-college multidisciplinary competition in Pune held every year since 1974 &mdash; attracted me to participate. I was a beginner in sculpture when I started out. Working tirelessly for nights at a stretch with practice sessions, I got to improve my skills and eventually won.
            </p>
          </div>
        </section>

        {/* Image sequence */}
        {Array.from({ length: 5 }, (_, i) => (
          <div className="cs-slide reveal" key={i}>
            <img src={`/Assets/Projects/Sculpture/${i + 1}.jpg`} alt={`Sculpture, slide ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}

        <CsThanks />

      </main>

      <NextProject slug="vishwaconclave" title="VishwaConclave" image="/Assets/Projects/VishwaConclave/1.jpg" />
      <Footer />
    </>
  )
}
