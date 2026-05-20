import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
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
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/nda-cover.svg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4A90A4' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['UX Design', 'Mobile App', 'Health']}
          title="Health App"
          subtitle="A task planner that treats sleep, food, movement, and energy as scheduling inputs instead of separate wellness dashboards."
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'UI/UX Designer' },
            { label: 'Duration', value: '4 Months' },
          ]}
        />

        <ProjectOverview
          id="cs-overview"
          sections={[
            {
              label: 'The Problem',
              content: 'Task managers help people track commitments, but they rarely notice when the schedule itself is harmful. This concept started from a simple question: what if planning tools could see strain, recovery, and routine as part of the job instead of external self-care data?',
            },
            {
              label: 'My Role',
              content: 'I treated the concept as a product-design exercise in behavioral framing: how health signals appear, when the system should intervene, and how to keep wellness guidance useful without turning the interface into a lecture.',
            },
            {
              label: 'Visible Outcome',
              content: 'The public portion shows the product direction, design principles, and how wellness logic changes the planning experience. The protected section contains the richer screen set and the more detailed interaction system.',
            },
          ]}
        />

        {/* Overview — public */}
        <CsSection id="cs-approach" label="Approach" title="Integrating health signals into everyday planning">
          <CsBody>
            <p>The concept merges task planning with recovery-aware context: sleep, food, physical strain, and time pressure all feed into how the day gets shaped. Instead of showing wellness as a separate report, the system uses those signals to change task timing, suggest adjustments, and surface conflicts before the schedule breaks.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Health Points</span>
            <span className="cs-label-row-val">Time Division, Sleep Regulation, Food Consumption, Physical Tracking</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Challenge</span>
            <span className="cs-label-row-val">Bring wellness into task management without making the product feel preachy, invasive, or overloaded with health data.</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Tools</span>
            <span className="cs-label-row-val">Figma, user flows, research synthesis, behavior framing, workflow design</span>
          </div>
        </CsSection>

        <CsSection id="cs-principles" label="Design Principles" title="Wellness support has to feel calm, not corrective">
          <CsBody>
            <p>The strongest part of the concept is not the dashboarding. It is the way the system intervenes at the right moment. If the calendar becomes unrealistic, the app surfaces conflicts early. If routines start slipping, the app connects that pattern back to daily planning instead of burying it in a separate health view.</p>
            <p>That design direction keeps the product from becoming a wellness checklist. It turns health data into context for better decisions, which is what makes the idea useful.</p>
          </CsBody>
        </CsSection>

        {/* Product photos */}
        <NdaGate slug="healthapp">
            {/* Key screens */}
            <section className="cs-section reveal">
              <div className="wrap">
                <div className="cs-img-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/health-app/photos/home-screen.png" alt="Home screen: Good Morning Steve, daily plan, weekly review, recommendations" loading="eager" /></div>
                  <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/health-app/photos/insights-dashboard.png" alt="Insights dashboard: commute trends, carbon footprint, walking stats" loading="lazy" /></div>
                  <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/health-app/photos/daily-updates.png" alt="Daily updates feed with pet content and evening greeting" loading="lazy" /></div>
                </div>
              </div>
            </section>

            {/* Calendar + topic selection */}
            <section className="cs-section reveal">
              <div className="wrap">
                <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/health-app/photos/calendar-overlap.png" alt="Calendar view with Overlap Spotted modal: smart schedule conflict resolution" loading="lazy" /></div>
                <p className="cs-caption">Smart schedule conflict detection: the app identifies overlapping events and offers to adjust sleep or move commitments</p>
              </div>
            </section>

            <section className="cs-section reveal">
              <div className="wrap">
                <div className="cs-img-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/health-app/photos/choose-topic.png" alt="Choose topic: personalization onboarding" loading="lazy" /></div>
                  <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/health-app/photos/signup-signin.png" alt="Sign up and sign in screens" loading="lazy" /></div>
                  <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/health-app/photos/reminders.png" alt="Reminders and notification settings" loading="lazy" /></div>
                </div>
              </div>
            </section>

            <CsThanks />
        </NdaGate>

        <BottomNav
          sections={[
            { id: 'cs-overview', label: 'Overview' },
            { id: 'cs-approach', label: 'Approach' },
            { id: 'cs-principles', label: 'Principles' },
          ]}
        />

      </main>

      <NextProject slug="ibm" title="IBM Cancer Prognosis" image="/Portfolio.github.io/Assets/Projects/ibm/1.webp" />
      <Footer />
    </>
  )
}
