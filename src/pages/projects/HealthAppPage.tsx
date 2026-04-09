import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import { NDA_DETAILS_ENABLED } from '../../config/nda'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import NextProject from '../../components/case-study/NextProject'

export default function HealthAppPage() {
  return (
    <>
      <Helmet>
        <title>Health App &middot; Parth Pawar</title>
        <meta name="description" content="Reimagining Google Tasks with health integration — balancing productivity with personal well-being through time division, sleep regulation, food tracking, and physical activity." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Health App · Parth Pawar" />
        <meta property="og:description" content="Reimagining Google Tasks with health and wellness integration." />
        <meta property="og:image" content="https://parthpawar.com/Assets/Projects/health-app/1.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4A90A4' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['UX Design', 'Mobile App', 'Health']}
          title="Health App"
          subtitle="Reimagining Google Tasks with health integration &mdash; balancing productivity with personal well-being"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'UI/UX Designer' },
            { label: 'Duration', value: '4 Months' },
          ]}
        />

        {/* Overview — public */}
        <CsSection id="cs-overview" label="Overview" title="Integrating Health &amp; Productivity">
          <CsBody>
            <p>The reimagined Google Tasks app integrates health and well-being elements into task management, helping users balance productivity with personal health. The solution merges daily tasks with health insights, personalized recommendations, and wellness tracking to reduce stress and enhance overall quality of life.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Health Points</span>
            <span className="cs-label-row-val">Time Division, Sleep Regulation, Food Consumption, Physical Tracking</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Challenge</span>
            <span className="cs-label-row-val">Simplify the integration of wellness goals without overwhelming users &mdash; bridging the gap between task management and health priorities</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Tools</span>
            <span className="cs-label-row-val">Figma, Jira, User Research &amp; Testing, Health Integration Analytics, User Flows, Workflow Optimization</span>
          </div>
        </CsSection>

        {/* Protected content */}
        {NDA_DETAILS_ENABLED ? (
          <>
            {Array.from({ length: 11 }, (_, i) => (
              <div className="cs-slide reveal" key={i}>
                <img src={`/Assets/Projects/health-app/${i + 1}.jpg`} alt={`Health App, design slide ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
              </div>
            ))}

            <CsThanks />
          </>
        ) : (
          <NdaGate slug="healthapp" projectName="Health App" />
        )}

      </main>

      <NextProject slug="ibm" title="IBM Cancer Prognosis" image="/Assets/Projects/ibm/1.jpg" />
      <Footer />
    </>
  )
}
