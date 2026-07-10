import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import CsImage from '../../components/case-study/CsImage'

const HEALTH_APP_COVER = '/Portfolio.github.io/Assets/mockups/projects/healthapp_16x9.webp'
const HEALTH_APP_ORIGINAL = '/Portfolio.github.io/Assets/Projects/HealthApp/optimized/cover-original.webp'

const HEALTH_APP_PUBLIC_VISUALS = [
  {
    src: HEALTH_APP_ORIGINAL,
    alt: 'Original Health App project board showing mobile planning screens and the core product concept.',
    label: 'Original product board',
  },
]

const HEALTH_APP_BOARD_IMAGES = [
  {
    src: '/Portfolio.github.io/Assets/Projects/HealthApp/optimized/01-planning.webp',
    alt: 'Health App planning board with task and schedule interface explorations.',
    label: 'Planning model',
  },
  {
    src: '/Portfolio.github.io/Assets/Projects/HealthApp/optimized/02-flow.webp',
    alt: 'Health App flow board showing how wellness context affects scheduling decisions.',
    label: 'Flow logic',
  },
  {
    src: '/Portfolio.github.io/Assets/Projects/HealthApp/optimized/04-insights.webp',
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
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/mockups/projects/healthapp_16x9.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4285F4' } as React.CSSProperties}>

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
                src="/Portfolio.github.io/Assets/Projects/HealthApp/optimized/03-tasks.webp"
                alt="Health App task planning screens and interaction states."
                caption="Task and calendar surfaces"
              />
              <CsImage
                className="cs-img-full--healthapp-board"
                src="/Portfolio.github.io/Assets/Projects/HealthApp/optimized/07-screen-set.webp"
                alt="Health App screen set showing multiple mobile product states."
                caption="Screen set and product states"
              />
              <CsImage
                className="cs-img-full--healthapp-board"
                src="/Portfolio.github.io/Assets/Projects/HealthApp/optimized/09-calendar.webp"
                alt="Health App calendar and schedule planning board."
                caption="Schedule adjustment logic"
              />
            </div>
          </div>
        </section>


        <BottomNav
          sections={[
            { id: 'cs-public-story', label: 'Glimpse' },
            { id: 'cs-process', label: 'Process' },
            { id: 'cs-healthapp-screens', label: 'Screens' },
          ]}
          placement="side"
        />

      </main>

      <NextProject slug="ibm" title="IBM Cancer Prognosis" image="/Portfolio.github.io/Assets/Projects/ibm/1.webp" />
      <Footer />
    </>
  )
}
