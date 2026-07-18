import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import CsImage from '../../components/case-study/CsImage'
import CsSection from '../../components/case-study/CsSection'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'

const HEALTH_APP_COVER = '/Assets/mockups/projects/healthapp_16x9.webp'
const HEALTH_APP_ORIGINAL = '/Assets/Projects/HealthApp/optimized/cover-original.webp'

const HEALTH_APP_PUBLIC_VISUALS = [
  {
    src: HEALTH_APP_ORIGINAL,
    alt: 'Original Health App project board showing mobile planning screens and the core product concept.',
    label: 'Original product board',
  },
]

const HEALTH_APP_BOARD_IMAGES = [
  {
    src: '/Assets/Projects/HealthApp/optimized/01-planning.webp',
    alt: 'Health App planning board with task and schedule interface explorations.',
    label: 'Planning model',
  },
  {
    src: '/Assets/Projects/HealthApp/optimized/02-flow.webp',
    alt: 'Health App flow board showing how wellness context affects scheduling decisions.',
    label: 'Flow logic',
  },
  {
    src: '/Assets/Projects/HealthApp/optimized/04-insights.webp',
    alt: 'Health App insight board connecting health signals to daily planning.',
    label: 'Health signals',
  },
]

export default function HealthAppPage() {
  return (
    <>
      <Helmet>
        <title>Health App &middot; Parth Pawar</title>
        <meta name="description" content="A health-aware task planner — balancing productivity with personal well-being through time division, sleep regulation, food tracking, and physical activity." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Health App · Parth Pawar" />
        <meta property="og:description" content="A health-aware task planner with wellness integration." />
        <meta property="og:image" content="https://designwhich.works/Assets/mockups/projects/healthapp_16x9.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main project-main--healthapp" style={{ '--project-color': '#4285F4' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['UX Design', 'Mobile App', 'Health']}
          title="Health App"
          subtitle="A planning concept where health signals shape the schedule instead of living in a separate wellness dashboard."
          heroImage={HEALTH_APP_COVER}
          heroAlt="Health App 16:9 cover showing the planning concept and interface direction."
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Product Designer' },
            { label: 'Duration', value: '4 Months' },
          ]}
        />

        <NdaPublicStory
          slug="healthapp"
          headline="Productivity with recovery built in."
          lede="The concept stays simple: planning should account for the person doing the work, not only the tasks."
          visuals={HEALTH_APP_PUBLIC_VISUALS}
        />

        <CsSection
          id="cs-healthapp-model"
          label="01 · Product model"
          title="The schedule adapts before the person burns out."
        >
          <p className="cs-body-lg">
            Most wellness apps report what already happened, while task managers keep asking for more. Health App connects the two: lightweight signals change the load, order, and timing of the day before the plan becomes unrealistic.
          </p>
          <CsFeatureGrid
            className="cs-healthapp-signal-grid"
            features={[
              {
                title: 'Sleep sets capacity',
                desc: 'A low-recovery night reduces the day\'s cognitive load instead of treating every morning as identical.',
              },
              {
                title: 'Energy shapes sequence',
                desc: 'High-focus work lands in stronger windows; routine work moves into lower-energy periods.',
              },
              {
                title: 'Care becomes calendar',
                desc: 'Food, movement, and recovery receive protected time rather than competing with the task list.',
              },
              {
                title: 'Adjustments stay legible',
                desc: 'The interface explains why a plan changed, keeping the user in control of every recommendation.',
              },
            ]}
          />
        </CsSection>

        <CsExpandPreview
          expanded
          cta="Open the planning boards"
          note="Process moves, original boards, task surfaces, screen set, and calendar logic."
        >
        <NdaProcess
          intro="I kept the concept simple: let health signals shape the plan without turning the product into a noisy wellness dashboard."
          decisions={[
            {
              move: 'Put health signals inside planning.',
              why: 'Let sleep, food, movement, and energy affect the schedule.',
            },
            {
              move: 'Plan around real capacity.',
              why: 'Make the day feel possible instead of optimized past the user.',
            },
            {
              move: 'Keep the daily surface calm.',
              why: 'Hide the data machinery and show one clear plan.',
            },
          ]}
          shift={{
            before: 'Health data and task planning lived in separate places.',
            after: 'The daily plan adapts to the person doing the work.',
          }}
        />

        <section className="cs-section reveal" id="cs-healthapp-screens">
          <div className="wrap">
            <div className="cs-nda-process-head">
              <h2 className="cs-nda-process-title">Original boards</h2>
              <p className="cs-nda-process-intro">
                The strongest parts of the older case page are the boards themselves. I kept them large so the flow, planning logic, and calendar decisions are readable.
              </p>
            </div>
            <div className="cs-healthapp-board-list">
              {HEALTH_APP_BOARD_IMAGES.map((visual) => (
                <CsImage
                  key={visual.src}
                  className="cs-img-full--healthapp-board"
                  src={visual.src}
                  alt={visual.alt}
                  caption={visual.label}
                />
              ))}
              <CsImage
                className="cs-img-full--healthapp-board"
                src="/Assets/Projects/HealthApp/optimized/03-tasks.webp"
                alt="Health App task planning screens and interaction states."
                caption="Task and calendar surfaces"
              />
              <CsImage
                className="cs-img-full--healthapp-board"
                src="/Assets/Projects/HealthApp/optimized/07-screen-set.webp"
                alt="Health App screen set showing multiple mobile product states."
                caption="Screen set and product states"
              />
              <CsImage
                className="cs-img-full--healthapp-board"
                src="/Assets/Projects/HealthApp/optimized/09-calendar.webp"
                alt="Health App calendar and schedule planning board."
                caption="Schedule adjustment logic"
              />
            </div>
          </div>
        </section>
        </CsExpandPreview>


        <BottomNav
          sections={[
            { id: 'cs-public-story', label: 'Glimpse' },
            { id: 'cs-healthapp-model', label: 'Model' },
            { id: 'cs-process', label: 'Process' },
            { id: 'cs-healthapp-screens', label: 'Screens' },
          ]}
          placement="side"
        />

      </main>

      <NextProject slug="ibm" title="IBM Cancer Prognosis" image="/Assets/Projects/ibm/1.webp" />
      <Footer />
    </>
  )
}
