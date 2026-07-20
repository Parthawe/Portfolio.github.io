import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const CUETV_PUBLIC_PREVIEW = '/Assets/mockups/projects/cuetv_16x9.webp'
const CUETV_REFRESH = '/Assets/Projects/CueTV/refresh'

const CUETV_PUBLIC_VISUALS = [
  {
    src: `${CUETV_REFRESH}/mobile-discovery.png`,
    alt: 'CueTV mobile discovery flow for browsing specialist performing-arts programming.',
    label: 'Mobile discovery',
    variant: 'tall',
  },
  {
    src: `${CUETV_REFRESH}/platforms.png`,
    alt: 'CueTV platform system shown across television, laptop, tablet, and phone.',
    label: 'Cross-platform playback',
    variant: 'wide',
  },
  {
    src: `${CUETV_REFRESH}/poster-cascade.png`,
    alt: 'Layered CueTV programming posters demonstrating catalogue art direction.',
    label: 'Catalogue system',
    variant: 'poster',
  },
  {
    src: `${CUETV_REFRESH}/gifting-banner.png`,
    alt: 'CueTV gifting campaign banner designed as a return and acquisition moment.',
    label: 'Gifting campaign',
    variant: 'banner',
  },
  {
    src: `${CUETV_REFRESH}/audience-map.png`,
    alt: 'CueTV audience map connecting specialist viewer needs with discovery paths.',
    label: 'Audience map',
    variant: 'board',
  },
  {
    src: `${CUETV_REFRESH}/funnel-stages.png`,
    alt: 'CueTV audience funnel from awareness through return viewing.',
    label: 'Return-visit funnel',
    variant: 'strip',
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
        <meta property="og:image" content={`https://designwhich.works${CUETV_PUBLIC_PREVIEW}`} />
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
          heroImage={`${CUETV_REFRESH}/hero-devices.png`}
          heroAlt="CueTV streaming platform shown across TV, laptop, tablet, phone, and remote."
        />

        <NdaPublicStory
          slug="cuetv"
          headline="Streaming for a specific audience."
          lede="The product story is simple: discovery and growth had to work together for a niche cultural catalogue."
          visuals={[
            {
              src: `${CUETV_REFRESH}/campaign-collage.png`,
              alt: 'CueTV campaign collage showing distinct audience and catalogue moments.',
              label: 'Audience and campaign system',
            },
            {
              src: `${CUETV_REFRESH}/awareness-flow.png`,
              alt: 'CueTV awareness flow connecting audience signals to discovery and return visits.',
              label: 'Awareness to return flow',
            },
          ]}
        />

        <CsExpandPreview
          cta="Open the catalogue system"
          note="Visual system, process moves, audience logic, funnel stages, and growth architecture."
        >
        <section className="cs-section cuetv-refresh reveal" aria-labelledby="cuetv-refresh-title">
          <div className="wrap">
            <div className="cuetv-refresh-head">
              <span className="cs-section-label">Visual system</span>
              <h2 id="cuetv-refresh-title" className="cs-section-title">Opera, ballet, classical, everywhere.</h2>
            </div>
            <div className="cuetv-refresh-grid">
              {CUETV_PUBLIC_VISUALS.map((visual) => (
                <figure className={`cuetv-refresh-card cuetv-refresh-card--${visual.variant}`} key={visual.src}>
                  <img src={visual.src} alt={visual.alt} loading="lazy" decoding="async" />
                  <figcaption>{visual.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <NdaProcess
          intro="I focused the product around three things the audience needed quickly: find the right performance, settle into playback, and have a reason to return."
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
        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-public-story', label: 'Glimpse' },
          { id: 'cs-process', label: 'Process' },
          { id: 'case-study-access-cuetv', label: 'Access' },
        ]} liveUrl="https://www.cuetv.online" placement="side" />


      </main>

      <NextProject slug="executivelens" title="ExecutiveLens" image="/Assets/images/executivelens.webp" />
      <Footer />
    </>
  )
}
