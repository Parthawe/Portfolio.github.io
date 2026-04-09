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
          backLink="/work" categorySlug="creative-tech" backLabel="Back to Work"
          tags={['Immersive Media', '360° Video', 'Spatial Audio', 'Interactive']}
          title="Hypercinema"
          subtitle="Expanding cinema beyond the rectangle &mdash; 360&deg; video, spatial sound, and interactive documentary experiments"
          info={[
            { label: 'Context', value: 'Hypercinema, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Director & Technologist' },
            { label: 'Tools', value: 'Insta360, Reaper, Unity, Depthkit, TouchDesigner' },
          ]}
        />
        <CsSection id="cs-premise" label="01 &mdash; Premise" title="Cinema Without Borders">
          <CsBody>
            <p>Traditional cinema is a rectangle. Fixed frame, fixed duration, fixed sequence. Hypercinema asks: what happens when you remove those constraints? What is a film when the viewer chooses where to look? When sound comes from specific locations in space? When the narrative branches based on where you stand?</p>
            <p>Over one semester, we produced three immersive pieces — each one dismantling a different cinematic convention and rebuilding it for spatial, interactive, or non-linear formats.</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-pieces" label="02 &mdash; Pieces" title="Three Experiments in Expanded Cinema">
          <CsFeatureGrid features={[
            { title: 'Displaced: 360° Documentary', desc: 'A 360° video portrait of three NYU international students navigating homesickness. Shot with Insta360 X3 in their dorm rooms, kitchens, and subway commutes. The viewer is placed inside each person\'s daily life — the intimacy of 360° (you\'re IN the room, not watching through a window) makes the emotional distance of displacement viscerally felt. 8 minutes.' },
            { title: 'Echoes: Spatial Sound Walk', desc: 'An audio walk through Washington Square Park using binaural spatial audio. Listeners wear headphones and follow a route — at each location, layered audio (recorded interviews, ambient sound, historical narration) plays from specific directions in 3D space. Turn left and you hear a 1920s jazz recording panning across your left ear. Turn right: a construction worker describing the park in 2023. Time collapses into space.' },
            { title: 'Branch: Interactive Projection', desc: 'A multi-screen projection installation where three projectors show three simultaneous perspectives of the same event — a dinner party falling apart. Viewers choose which screen to watch. There is no "correct" view — each perspective reveals different information, and the truth of what happened depends entirely on whose eyes you watch through. A meditation on point-of-view as editorial choice.' },
          ]} />
        </CsSection>
        <CsSection id="cs-craft" label="03 &mdash; Craft" title="What Immersive Media Demands">
          <CsBody>
            <p><strong>You can&rsquo;t control attention.</strong> In a rectangle, the director decides what you see through framing. In 360°, the viewer looks wherever they want. You learn to guide attention through sound, light, and movement instead of cuts. This skill transferred directly to installation design — Enigma, Black Hole, and Sea of Salt all use the same principle: create a focal point without a frame.</p>
            <p><strong>Sound is the real medium.</strong> In every immersive format we tested, spatial audio was more powerful than spatial video. People habituate to visual environments quickly but remain sensitive to audio placement indefinitely. A voice coming from behind you will make you turn around every single time, even after 10 minutes. This insight shaped how I think about all sensory design.</p>
            <p><strong>Non-linearity requires more structure, not less.</strong> A branching narrative doesn&rsquo;t mean &ldquo;anything goes.&rdquo; Each path needs its own arc, and the overall experience needs to be satisfying regardless of which path the viewer takes. More freedom for the audience = more work for the designer.</p>
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
