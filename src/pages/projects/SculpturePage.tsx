import PhysicalWorld from '../../components/physical-worlds/PhysicalWorld'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function SculpturePage() {
  return (
    <>
      <Helmet>
        <title>Sculpture &middot; Parth Pawar</title>
        <meta name="description" content="A compact glimpse of competition sculpture work for Firodia Karandak, from beginner practice to a winning figurative piece." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Sculpture · Parth Pawar" />
        <meta property="og:description" content="Competition sculpture work for Firodia Karandak: practice, fabrication, result, and learning." />
        <meta property="og:image" content="https://designwhich.works/Assets/Projects/Sculpture/1.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#3A3A3E' } as React.CSSProperties}>
        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Sculpture', 'Art', 'Competition']}
          heroImage="/Assets/Projects/Sculpture/1.jpg"
          heroAlt="Finished figurative sculpture under low-key lighting"
          showHeaderSummary={false}
          title="Sculpture"
          subtitle="Figurative sculpture for Firodia Karandak, from anatomy studies and armatures to a finished piece."
          info={[
            { label: 'Context', value: 'Firodia Karandak' },
            { label: 'Role', value: 'Sculptor' },
            { label: 'Duration', value: 'Dec 2019 - Mar 2022' },
          ]}
        />


        <CsSection id="cs-world" label="Interactive room" title="View the sculpture studies"><PhysicalWorld project="sculpture" /></CsSection>

        <CsSection id="cs-glimpse" label="Glimpse" title="Learning form through making">
          <CsBody>
            <p>I entered the sculpture category at Firodia Karandak with little formal experience. Anatomy studies, welded armatures, and repeated corrections led to a finished figurative piece.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Problem</span>
            <span className="cs-label-row-val">I had to learn form, proportion, structure, and material handling fast enough to compete.</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Method</span>
            <span className="cs-label-row-val">Anatomy studies, moodboards, welded armature experiments, plaster/clay build-up, and repeated correction by hand.</span>
          </div>
          <div className="cs-label-row project-label-row--open">
            <span className="cs-label-row-key">Result</span>
            <span className="cs-label-row-val">A finished figurative sculpture that won in the competition context and became a useful proof of physical making discipline.</span>
          </div>
        </CsSection>
        <section id="cs-sculpture-process" className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid project-image-grid--two">
              <CsImage src="/Assets/Projects/Sculpture/3.jpg" alt="Moodboard with anatomical and classical sculpture references" caption="Anatomy and classical references informed the figure’s proportions and pose." />
              <CsImage src="/Assets/Projects/Sculpture/4.jpg" alt="Sculpture process board showing early attempts and armature construction" caption="Early forms and armature construction show the support beneath the surface." />
            </div>
          </div>
        </section>

        <CsSection id="cs-impact" label="Impact" title="Structure before surface detail">
          <CsFeatureGrid features={[
            { title: 'Physical patience', desc: 'The project forced slower decisions because material work does not have an easy undo button.' },
            { title: 'Structural thinking', desc: 'The sculpture only worked once the armature, weight, posture, and surface detail supported the same pose.' },
            { title: 'Transferable confidence', desc: 'It gave me proof that I could enter an unfamiliar medium, practice intensely, and reach a public standard.' },
          ]} />
        </CsSection>

        <CsSection id="cs-learning" label="Learning" title="The finished figure">
          <CsBody>
            <p>The biggest lesson was that craft exposes unclear thinking immediately. If the pose is wrong, the material tells you. If the structure is weak, the form fails. That made this project useful beyond sculpture: it trained me to respect constraints early, prototype with my hands, and keep working through the awkward middle instead of polishing a weak idea.</p>
          </CsBody>
          <CsImage
            src="/Assets/Projects/Sculpture/5.jpg"
            alt="Final figurative sculpture shown under dramatic lighting"
            caption="Finished figure: compare the posture and surface with the earlier armature and studies."
          />
        </CsSection>

        <CsThanks />


        <BottomNav sections={[
          { id: 'cs-world', label: 'Room' },
          { id: 'cs-glimpse', label: 'Glimpse' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-learning', label: 'Learning' },
        ]} />
      </main>

      <NextProject slug="vishwaconclave" title="VishwaConclave" image="/Assets/Projects/VishwaConclave/1.jpg" />
      <Footer showArcadeIntro={false} />
    </>
  )
}
