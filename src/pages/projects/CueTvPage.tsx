import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
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
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/nda-cover.svg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#D53F8C' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['UX', 'Brand', 'Product']}
          title="CueTV"
          subtitle="Reframed a niche performing-arts streaming service so discovery, playback, and growth all spoke to the same audience."
          info={[
            { label: 'Client', value: 'Operabase' },
            { label: 'Scope of Work', value: 'User Research, Retargeting Ads System' },
            { label: 'Role', value: 'UI Designer & Research' },
            { label: 'Duration', value: '7 Months' },
                { label: 'Year', value: '2021' },
          ]}
          liveUrl="https://www.cuetv.online"
        />

        {/* Overview */}
        <ProjectOverview
          id="cs-overview"
          sections={[
            {
              label: 'Summary',
              content: 'CueTV is an OTT platform for opera, ballet, symphonies, and classical performance. The product challenge was not just streaming the content. It was helping a very specific audience find, understand, and return to programming that does not behave like mainstream entertainment catalogs.',
            },
            {
              label: 'The Challenges',
              content: 'The team needed the platform and the growth system to work together. Audience segments were fragmented, browsing behavior varied by familiarity with the art form, and retargeting could not be treated as a separate marketing layer with generic OTT assumptions.',
            },
            {
              label: 'My Role',
              content: 'I worked across audience research, platform UX, and retargeting design. That included clarifying the user segments, shaping the browsing and playback experience, and designing the ad-system logic that helped the product reach and re-engage the right viewers.',
            },
            {
              label: 'Visible Outcome',
              content: 'This public layer shows the audience model, platform structure, and service-design thinking behind CueTV. The internal system, campaign mechanics, and supporting process detail are shared directly after access is approved.',
            },
          ]}
        />

        {/* Tools */}
        <section className="cs-section reveal" id="cs-tools">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">Tools &amp; Techniques</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">Figma</span>
                  <span className="cs-tag-item">Illustrator</span>
                  <span className="cs-tag-item">Premiere Pro</span>
                  <span className="cs-tag-item">After Effects</span>
                  <span className="cs-tag-item">Growth analysis</span>
                  <span className="cs-tag-item">Research</span>
                  <span className="cs-tag-item">Heat-Mapping</span>
                  <span className="cs-tag-item">Experience Design</span>
                </span>
              </span>
            </div>
          </div>
        </section>

        <NdaGate slug="cuetv" />

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-tools', label: 'Tools' },
        ]} liveUrl="https://www.cuetv.online" />


      </main>

      <NextProject slug="org-dashboard" title="OrgDashboard" image="/Portfolio.github.io/Assets/images/org-dashboard.webp" />
      <Footer />
    </>
  )
}
