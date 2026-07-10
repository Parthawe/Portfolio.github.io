import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const HEALTH_APP_PROCESS_VISUALS = [
  {
    src: '/Portfolio.github.io/Assets/mockups/projects/healthapp_16x9.webp',
    alt: 'Health App product mockup showing a planning experience with wellness context.',
    label: 'Health-aware planning',
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
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/nda-cover.svg" />
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
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Product Designer' },
            { label: 'Duration', value: '4 Months' },
          ]}
        />

        <NdaPublicStory
          slug="healthapp"
          headline="Productivity with recovery built in."
          lede="The public glimpse keeps the concept simple: planning should account for the person doing the work, not only the tasks."
        />

        <NdaProcess
          intro="I kept the concept simple: let health signals shape the plan without turning the product into a noisy wellness dashboard."
          visuals={HEALTH_APP_PROCESS_VISUALS}
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

        <NdaGate slug="healthapp" />


        <BottomNav
          sections={[
            { id: 'cs-public-story', label: 'Glimpse' },
            { id: 'cs-process', label: 'Process' },
            { id: 'case-study-access-healthapp', label: 'Access' },
          ]}
          placement="side"
        />

      </main>

      <NextProject slug="ibm" title="IBM Cancer Prognosis" image="/Portfolio.github.io/Assets/Projects/ibm/1.webp" />
      <Footer />
    </>
  )
}
