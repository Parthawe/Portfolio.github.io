import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

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
          lede="The public glimpse focuses on the product story: discovery and growth had to work together for a niche cultural catalogue."
        />

        <NdaProcess
          decisions={[
            {
              move: 'Treated a niche catalogue as a discovery problem, not a size problem.',
              why: 'A small library of opera, ballet, and symphony content fails if it is browsed like a mass-market service. I organised discovery around occasion, mood, and cultural context so depth read as curation rather than scarcity.',
            },
            {
              move: 'Designed playback for long-form, seated attention.',
              why: 'Performances are watched differently from episodic TV. The player prioritised uninterrupted viewing, act structure, and resume behaviour over autoplay churn, matching how this audience actually watches.',
            },
            {
              move: 'Made return visits a designed moment, not an ad afterthought.',
              why: 'Retention for a cultural catalogue depends on bringing people back for the next programme. I connected the retargeting system to genuine reasons to return so growth reinforced the product instead of fighting it.',
            },
          ]}
          shift={{
            before: 'A specialist catalogue presented like a generic streaming grid, where depth looked like a short list.',
            after: 'A discovery and return system tuned to how classical-arts audiences choose and re-engage.',
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
