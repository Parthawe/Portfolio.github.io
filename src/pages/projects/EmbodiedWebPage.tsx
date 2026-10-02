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

export default function EmbodiedWebPage() {
  return (
    <>
      <Helmet>
        <title>Embodied Web &middot; Parth Pawar</title>
        <meta name="description" content="Web experiments that use the body as input — webcam pose detection, device motion, and spatial audio to create browser experiences beyond the mouse." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#e07c4a' } as React.CSSProperties}>

        <ProjectHeader
          showHeaderSummary={false}
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Creative Coding', 'Web Experiments', 'Body as Input']}
          title="Embodied Web"
          subtitle="Course experiments mapping breath, gesture, and phone movement to browser interactions."
          info={[
            { label: 'Context', value: 'Experiments on the Embodied Web, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Creative Technologist' },
            { label: 'Tools', value: 'p5.js, ml5.js, Web Audio API, DeviceMotion' },
          ]}
        />

        <CsSection id="cs-concept" label="01 &mdash; Concept" title="Body input in the browser">
          <CsBody>
            <p>These course studies mapped physical input to a visible or audible response. The recurring question was whether a person could understand that response through the action itself.</p>
            <p>The descriptions below are experiment notes. Original running sketches are not included in this archive.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-experiments" label="02 &mdash; Experiments" title="Five input experiments">
          <CsFeatureGrid features={[
  {
    "title": "Breathing canvas",
    "desc": "Microphone input drives an expanding and contracting canvas. The study connects the rhythm of breathing to the pace of the image."
  },
  {
    "title": "Pose typography",
    "desc": "Webcam body landmarks map to letterforms: raised arms suggest an A, outstretched arms a T. The design question is how clearly a pose produces a recognizable letter."
  },
  {
    "title": "Tilt landscape",
    "desc": "Phone motion controls a procedural landscape. Tilt maps to terrain and camera movement, making feedback and calibration central to the interaction."
  },
  {
    "title": "Proximity choir",
    "desc": "Web Audio and WebSocket messages coordinate sound across devices. Relative physical position remained a proposed input; network timing does not reliably measure distance."
  },
  {
    "title": "Shadow puppet theatre",
    "desc": "A webcam silhouette interacts with falling particles. The feedback needs to explain how to catch and move them."
  }
]} />
        </CsSection>

        <CsSection id="cs-reflection" label="03 &mdash; Reflection" title="Feedback, calibration, and access">
          <CsBody>
            <p>The biggest insight: body-based interfaces can reduce explanation when they start from familiar actions. Breathing, tilting, waving, and standing already have meaning before the screen responds. The design work is in making the response predictable enough that the body understands the loop.</p>
            <p>Body input introduces calibration, precision, privacy, and access constraints. A finished version needs clear permission states and an alternative for anyone who cannot or does not want to use a camera, microphone, or movement input.</p>
          </CsBody>
        </CsSection>

        <CsThanks />


        <BottomNav sections={[
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-experiments', label: 'Experiments' },
          { id: 'cs-reflection', label: 'Reflection' },
        ]} />

      </main>

      <NextProject slug="flow-fields" title="Flow Fields" image="/Assets/images/flow-fields.svg" />
      <Footer />
    </>
  )
}
