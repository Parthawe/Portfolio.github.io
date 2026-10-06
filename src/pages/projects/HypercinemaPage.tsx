import RelatedProjectEvidence from '../../components/case-study/RelatedProjectEvidence'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import StudyExplorer from '../../components/case-study/StudyExplorer'
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
          heroImage="/Assets/project-illustrations/hypercinema-viewpoints.webp"
          heroAlt="Illustrative paper triptych with orange circular forms seen across different planes"
          heroCaption="AI-generated illustration of multiple viewpoints. The original films and projection installation are not pictured."
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
          <StudyExplorer project="hypercinema" />
        </CsSection>
        <CsSection id="cs-craft" label="03 &mdash; Craft" title="Guiding attention across space">
          <CsBody>
            <p><strong>Give attention a cue.</strong> When the viewer controls the frame, sound, light, and movement need to make the next point of interest discoverable.</p>
            <p><strong>Make each route coherent.</strong> A viewer may enter late or follow only one perspective. Each path needs enough context to stand on its own.</p>
            <p>Related spatial work with available documentation: <a href="/black-hole" className="project-text-link">Black Hole</a> and <a href="/sea-of-salt" className="project-text-link">Sea of Salt</a>.</p>
          </CsBody>
        </CsSection>
        <RelatedProjectEvidence slug="hypercinema" />
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
