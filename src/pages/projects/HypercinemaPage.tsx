import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function HypercinemaPage() {
  return (
    <>
      <Helmet>
        <title>Hypercinema &middot; Parth Pawar</title>
        <meta name="description" content="Immersive media experiments — 360° video, spatial sound design, interactive documentary, and the expansion of cinema beyond the rectangle." />
      </Helmet>
      <Nav />
      <main id="main-content" className="project-main" style={{ '--project-color': '#6366f1' } as React.CSSProperties}>
        <ProjectHeader
          showHeaderSummary={false}
          backLink="/work" categorySlug="creative-tech" backLabel="Back to Work"
          tags={['Immersive Media', '360° Video', 'Spatial Audio', 'Interactive']}
          title="Hypercinema"
          subtitle="Three course studies in viewer-directed film, spatial sound, and multi-screen projection."
          info={[
            { label: 'Context', value: 'Hypercinema, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Director & Technologist' },
            { label: 'Tools', value: 'Insta360, Reaper, Unity, Depthkit, TouchDesigner' },
          ]}
        />
        <CsSection id="cs-premise" label="01 &mdash; Premise" title="Letting the viewer choose where to look">
          <CsBody>
            <p>These three course studies changed who controls the frame. One lets the viewer look around a scene, one uses directional sound along a route, and one divides an event across simultaneous projections.</p>
            <p>Original playable film and sound recordings are not included in this archive.</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-pieces" label="02 &mdash; Pieces" title="Three film and sound studies">
          <CsFeatureGrid features={[
  {
    "title": "Displaced · 360° documentary",
    "desc": "An eight-minute portrait of three NYU international students, filmed in dorm rooms, kitchens, and commutes. The viewer chooses where to look within each scene."
  },
  {
    "title": "Echoes · spatial sound walk",
    "desc": "A Washington Square Park route combines interviews, ambient recordings, and historical narration in binaural audio. Direction becomes a cue for where to direct attention."
  },
  {
    "title": "Branch · interactive projection",
    "desc": "Three screens show different perspectives of a dinner party. Choosing a screen changes which information a viewer receives about the same event."
  }
]} />
        </CsSection>
        <CsSection id="cs-craft" label="03 &mdash; Craft" title="Guiding attention across space">
          <CsBody>
            <p><strong>Give attention a cue.</strong> When the viewer controls the frame, sound, light, and movement need to make the next point of interest discoverable.</p>
            <p><strong>Make each route coherent.</strong> A viewer may enter late or follow only one perspective. Each path needs enough context to stand on its own.</p>
            <p>Related spatial work with available documentation: <a href="/black-hole" className="project-text-link">Black Hole</a> and <a href="/sea-of-salt" className="project-text-link">Sea of Salt</a>.</p>
          </CsBody>
        </CsSection>
        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-premise', label: 'Premise' },
          { id: 'cs-pieces', label: 'Pieces' },
          { id: 'cs-craft', label: 'Craft' },
        ]} />
      </main>
      <NextProject slug="uv-light" title="UV Light" image="/Assets/images/uv-light.jpg" />
      <Footer />
    </>
  )
}
