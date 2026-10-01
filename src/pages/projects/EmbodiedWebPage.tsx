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
          subtitle="Browser experiments that use the body as input &mdash; webcam, motion sensors, and spatial audio beyond the mouse"
          info={[
            { label: 'Context', value: 'Experiments on the Embodied Web, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Creative Technologist' },
            { label: 'Tools', value: 'p5.js, ml5.js, Web Audio API, DeviceMotion' },
          ]}
        />

        <CsSection id="cs-concept" label="01 &mdash; Concept" title="The Browser as a Physical Space">
          <CsBody>
            <p className="cs-caption">Course experiment notes. The original running sketches are not included on this page.</p>
            <p>Most websites assume a mouse and keyboard. But modern browsers have access to the camera, microphone, accelerometer, gyroscope, GPS, and haptic motors. What happens when you design web experiences that use the body instead of the cursor?</p>
            <p>This course explored that question through a series of rapid experiments &mdash; each one using a different body-based input to create interactions that feel physical, spatial, and intimate in ways that traditional web design cannot.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-experiments" label="02 &mdash; Experiments" title="Five Body-Based Web Pieces">
          <CsFeatureGrid features={[
            { title: 'Breathing Canvas', desc: 'Microphone input detects breathing rhythm. The canvas expands and contracts in sync, creating a meditative loop. Inhale: colors warm and spread. Exhale: colors cool and contract. After 2 minutes, the accumulated patterns form a unique visual fingerprint of your breathing.' },
            { title: 'Pose Typography', desc: 'Webcam pose detection (ml5.js PoseNet) maps body landmarks to letterforms. Stand with arms up: you become an "A". Arms out: "T". Crouch: "C". The screen fills with the letters your body makes — a live alphabet written in gesture.' },
            { title: 'Tilt Landscape', desc: 'Phone accelerometer drives a procedural landscape. Tilt left: mountains rise on the left. Tilt forward: zoom into the terrain. The landscape is generated from Perlin noise, but your body controls the camera. Designed for mobile — desktop users see a "pick up your phone" prompt.' },
            { title: 'Proximity Choir', desc: 'A multi-device audio experiment using Web Audio and WebSocket messages to coordinate notes. Relative position was a proposed input; network timing alone does not provide reliable physical distance between phones.' },
            { title: 'Shadow Puppet Theatre', desc: 'Webcam silhouette extraction creates a shadow on screen that interacts with falling particles. The design question is whether the feedback makes catching and moving particles understandable without instructions.' },
          ]} />
        </CsSection>

        <CsSection id="cs-reflection" label="03 &mdash; Reflection" title="What the Body Knows">
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
