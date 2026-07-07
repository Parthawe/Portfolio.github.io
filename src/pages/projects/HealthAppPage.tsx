import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

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
          decisions={[
            {
              move: 'Moved health signals into the planner instead of a separate dashboard.',
              why: 'Wellness data usually lives where it changes nothing. I treated sleep, food, movement, and energy as inputs to the schedule itself, so recovery influenced what the day asked of you rather than sitting in a tab no one opens.',
            },
            {
              move: 'Designed for honest capacity, not maximum output.',
              why: 'A planner that ignores the person burns them out. I shaped the day around realistic capacity on a given day, which makes the plan more trustworthy and more likely to be followed.',
            },
            {
              move: 'Kept the daily surface calm despite many signals feeding it.',
              why: 'Several data streams can easily produce a noisy, guilt-inducing interface. I hid the machinery and surfaced a simple, legible plan so complexity stayed in the system, not on the screen.',
            },
          ]}
          shift={{
            before: 'Health metrics in one app, the to-do list in another, and no connection between them.',
            after: 'A single plan where how you are feeling quietly reshapes what you take on.',
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
