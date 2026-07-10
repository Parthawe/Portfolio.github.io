import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const CUETV_PROCESS_VISUALS = [
  {
    src: '/Portfolio.github.io/Assets/mockups/projects/cuetv_16x9.webp',
    alt: 'CueTV product mockup for a performing-arts streaming experience.',
    label: 'Streaming product surface',
  },
]

export default function CueTvPage() {
  return (
    <>
      <Helmet>
        <title>CueTV &middot; Parth Pawar</title>
        <meta name="description" content="CueTV is an OTT platform for opera, ballet, symphonies, and classical music. Designed the discovery, playback, and retargeting ads system with MonsoonFish." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="CueTV · Parth Pawar" />
        <meta property="og:description" content="OTT platform for opera, ballet, symphonies, designed discovery, playback, and retargeting ads." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/nda-cover.svg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#C8102E' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['UX', 'Brand', 'Product']}
          title="CueTV"
          subtitle="Reframed a niche performing-arts streaming product around discovery, playback, and return visits."
          info={[
            { label: 'Client', value: 'Operabase' },
            { label: 'Scope', value: 'Research, UX, Growth System' },
            { label: 'Role', value: 'Product Designer' },
            { label: 'Duration', value: '7 Months' },
            { label: 'Year', value: '2021' },
          ]}
          liveUrl="https://www.cuetv.online"
        />

        <NdaPublicStory
          slug="cuetv"
          headline="Streaming for a specific audience."
          lede="The product story is simple: discovery and growth had to work together for a niche cultural catalogue."
        />

        <NdaProcess
          intro="I focused the product around three things the audience needed quickly: find the right performance, settle into playback, and have a reason to return."
          visuals={CUETV_PROCESS_VISUALS}
          decisions={[
            {
              move: 'Make a niche catalogue feel curated.',
              why: 'Organize discovery around context, not just quantity.',
            },
            {
              move: 'Respect long-form viewing.',
              why: 'Prioritize uninterrupted playback, acts, and resume behavior.',
            },
            {
              move: 'Design the reason to come back.',
              why: 'Tie growth loops to new programs and cultural moments.',
            },
          ]}
          shift={{
            before: 'A specialist catalogue behaving like a generic streaming grid.',
            after: 'A discovery and return system tuned to classical-arts viewing.',
          }}
        />

        <NdaGate slug="cuetv" />

        <BottomNav sections={[
          { id: 'cs-public-story', label: 'Glimpse' },
          { id: 'cs-process', label: 'Process' },
          { id: 'case-study-access-cuetv', label: 'Access' },
        ]} liveUrl="https://www.cuetv.online" placement="side" />


      </main>

      <NextProject slug="executivelens" title="ExecutiveLens" image="/Portfolio.github.io/Assets/images/executivelens.webp" />
      <Footer />
    </>
  )
}
