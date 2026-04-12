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

        {/* Product photos */}
        {NDA_DETAILS_ENABLED ? (
          <>
            {/* Key screens */}
            <section className="cs-section reveal">
              <div className="wrap">
                <div className="cs-img-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div className="cs-img reveal"><img src="/Assets/Projects/health-app/photos/home-screen.png" alt="Home screen: Good Morning Steve, daily plan, weekly review, recommendations" loading="eager" /></div>
                  <div className="cs-img reveal"><img src="/Assets/Projects/health-app/photos/insights-dashboard.png" alt="Insights dashboard: commute trends, carbon footprint, walking stats" loading="lazy" /></div>
                  <div className="cs-img reveal"><img src="/Assets/Projects/health-app/photos/daily-updates.png" alt="Daily updates feed with pet content and evening greeting" loading="lazy" /></div>
                </div>
              </div>
            </section>

            {/* Calendar + topic selection */}
            <section className="cs-section reveal">
              <div className="wrap">
                <div className="cs-img reveal"><img src="/Assets/Projects/health-app/photos/calendar-overlap.png" alt="Calendar view with Overlap Spotted modal: smart schedule conflict resolution" loading="lazy" /></div>
                <p className="cs-caption">Smart schedule conflict detection: the app identifies overlapping events and offers to adjust sleep or move commitments</p>
              </div>
            </section>

            <section className="cs-section reveal">
              <div className="wrap">
                <div className="cs-img-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div className="cs-img reveal"><img src="/Assets/Projects/health-app/photos/choose-topic.png" alt="Choose topic: personalization onboarding" loading="lazy" /></div>
                  <div className="cs-img reveal"><img src="/Assets/Projects/health-app/photos/signup-signin.png" alt="Sign up and sign in screens" loading="lazy" /></div>
                  <div className="cs-img reveal"><img src="/Assets/Projects/health-app/photos/reminders.png" alt="Reminders and notification settings" loading="lazy" /></div>
                </div>
              </div>
            </section>

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
