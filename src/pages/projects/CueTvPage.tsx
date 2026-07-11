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
    src: '/Portfolio.github.io/Assets/Projects/CueTV/refresh/platforms.png',
    alt: 'CueTV across TV, web, tablet, and phone platforms for opera, ballet, and classical streaming.',
    label: 'Multi-platform product surface',
  },
]

const CUETV_REFRESH_PATH = '/Portfolio.github.io/Assets/Projects/CueTV/refresh'

const CUETV_PUBLIC_VISUALS = [
  {
    src: `${CUETV_REFRESH_PATH}/categories.png`,
    alt: 'CueTV content categories for opera, ballet, symphonies, and classical performances.',
    label: 'Catalogue categories',
    variant: 'category',
  },
  {
    src: `${CUETV_REFRESH_PATH}/campaign-collage.png`,
    alt: 'CueTV campaign collage with opera, ballet, classical, and drama promotional posters.',
    label: 'Growth campaign language',
    variant: 'wide',
  },
  {
    src: `${CUETV_REFRESH_PATH}/poster-cascade.png`,
    alt: 'Tall cascade of CueTV performance posters.',
    label: 'Catalogue depth',
    variant: 'poster',
  },
  {
    src: `${CUETV_REFRESH_PATH}/gifting-banner.png`,
    alt: 'CueTV gifting page banner with performing arts production photography.',
    label: 'Gifting page art direction',
    variant: 'banner',
  },
  {
    src: `${CUETV_REFRESH_PATH}/mobile-discovery.png`,
    alt: 'CueTV mobile app search, live streams, premieres, offline watching, composers, and companies discovery screens.',
    label: 'Mobile discovery system',
    variant: 'tall',
  },
]

const CUETV_REVIEWER_VISUALS = [
  {
    src: `${CUETV_REFRESH_PATH}/audience-map.png`,
    alt: 'Audience map for CueTV inner circle, devotees and enthusiasts, students, and educators.',
    label: 'Audience segmentation',
    variant: 'board',
  },
  {
    src: `${CUETV_REFRESH_PATH}/use-cases.png`,
    alt: 'Identified CueTV use cases grouped by payment, category, genre, content, duplicates, and title recognition.',
    label: 'Use-case architecture',
    variant: 'board',
  },
  {
    src: `${CUETV_REFRESH_PATH}/awareness-flow.png`,
    alt: 'CueTV awareness campaign and organic traffic flow map.',
    label: 'Awareness flow',
    variant: 'board',
  },
  {
    src: `${CUETV_REFRESH_PATH}/ad-methods.png`,
    alt: 'CueTV advertising methods map covering Google Ads, Facebook Ads, and other networks.',
    label: 'Ad channel system',
    variant: 'board',
  },
  {
    src: `${CUETV_REFRESH_PATH}/funnel-stages.png`,
    alt: 'CueTV funnel stages from awareness to discovery, validation, targeting, and signup.',
    label: 'Growth loop stages',
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
          heroImage={`${CUETV_REFRESH_PATH}/hero-devices.png`}
          heroAlt="CueTV streaming platform shown across TV, laptop, tablet, phone, and remote."
        />

        <NdaPublicStory
          slug="cuetv"
          headline="Streaming for a specific audience."
          lede="The product story is simple: discovery and growth had to work together for a niche cultural catalogue."
          visuals={[
            {
              src: `${CUETV_REFRESH_PATH}/hero-devices.png`,
              alt: 'CueTV multi-device hero showing a performing arts streaming experience across TV, laptop, tablet, and phone.',
              label: 'CueTV across screen sizes',
            },
          ]}
        />

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

        <NdaGate slug="cuetv">
          <div className="cuetv-reviewer-visuals" aria-labelledby="cuetv-reviewer-visuals-title">
            <div className="cuetv-refresh-head">
              <span className="cs-section-label">Reviewer material</span>
              <h2 id="cuetv-reviewer-visuals-title" className="cs-section-title">Research, funnel, and growth system.</h2>
            </div>
            <div className="cuetv-refresh-grid cuetv-refresh-grid--reviewer">
              {CUETV_REVIEWER_VISUALS.map((visual) => (
                <figure className={`cuetv-refresh-card cuetv-refresh-card--${visual.variant}`} key={visual.src}>
                  <img src={visual.src} alt={visual.alt} loading="lazy" decoding="async" />
                  <figcaption>{visual.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </NdaGate>

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
