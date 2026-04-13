import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function SculpturePage() {
  return (
    <>
      <Helmet>
        <title>Sculpture &middot; Parth Pawar</title>
        <meta name="description" content="Competition sculptures for Firodia Karandak, Pune — a renowned inter-college multidisciplinary competition held since 1974. From complete beginner to winner through tireless practice." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Sculpture · Parth Pawar" />
        <meta property="og:description" content="Competition sculptures for Firodia Karandak, Pune. From beginner to winner." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/Projects/Sculpture/1.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#8B6914' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Sculpture', 'Art', 'Competition']}
          title="Sculpture"
          subtitle="From complete beginner to competition winner &mdash; figurative sculpture for Firodia Karandak, Pune"
          info={[
            { label: 'Duration', value: 'Dec 2019 – March 2022' },
            { label: 'Role', value: 'Sculptor' },
            { label: 'Competition', value: 'Firodia Karandak' },
          ]}
        />

        {/* Hero */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/Sculpture/1.webp" alt="Figurative sculpture — dramatic low-key lighting on plaster figure" loading="eager" />
          </div>
        </section>

        {/* Context */}
        <CsSection id="cs-context" label="Context" title="Firodia Karandak">
          <CsBody>
            <p>Firodia Karandak is a renowned inter-college multidisciplinary competition in Pune, held every year since 1974. The subjects span playwriting, theater direction, acting, dance, music, and sculpture. But it is the one-act plays that make the competition stand out &mdash; a crucible where hundreds of college teams compete across creative disciplines.</p>
            <p>Being an artist and heavily involved in drama and skits, the competition attracted me to participate in its sculpture category. I was a complete beginner when I started out. Working tirelessly for nights at a stretch with practice sessions, I got to improve my skills and eventually won.</p>
          </CsBody>
        </CsSection>

        {/* Research */}
        <CsSection id="cs-research" label="01 &mdash; Research" title="Moodboard &amp; Anatomical Study">
          <CsBody>
            <p>The preparation began with intensive anatomical study. I built a moodboard drawing from classical sculpture references, medical imaging, and contemporary figurative art &mdash; focusing on musculature, tension, and the way light falls across the human form. The color palette was deliberately restrained: grays, deep reds, and the natural tones of plaster and clay.</p>
            <p>Understanding proportions and how the body distributes weight was critical. The final piece needed to communicate both physical strength and emotional vulnerability &mdash; a figure that feels alive under dramatic lighting, not just anatomically correct.</p>
          </CsBody>
        </CsSection>

        {/* Moodboard image */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/Sculpture/3.webp" alt="Moodboard — anatomical references, classical sculpture studies, medical imaging, and color palette" loading="lazy" />
          </div>
        </section>

        {/* Process */}
        <CsSection id="cs-process" label="02 &mdash; Process" title="Failed Ideas &amp; Fabrication">
          <CsBody>
            <p>The process involved multiple failed attempts before arriving at the final form. Early iterations explored different poses and compositions, but several ideas were abandoned when they didn&rsquo;t hold up structurally or failed to convey the intended narrative.</p>
            <p>The fabrication followed a traditional sculpture pipeline: welding a metal armature skeleton to define the pose and load-bearing structure, then gradually building up layers of plaster and clay over the frame. The armature had to support the figure&rsquo;s weight while allowing enough flexibility to adjust proportions during the sculpting process. Each session was a negotiation between the material&rsquo;s limitations and the intended form.</p>
          </CsBody>
        </CsSection>

        {/* Process images */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/Sculpture/4.webp" alt="Failed ideas and process — early attempts, metal armature construction, and building up the form" loading="lazy" />
          </div>
        </section>

        {/* Final */}
        <CsSection id="cs-final" label="03 &mdash; Final" title="The Finished Piece">
          <CsBody>
            <p>The final sculpture is a life-size human figure &mdash; a muscular male torso with arms cradling what appears to be a mask or skull, head tilted upward. The piece was designed to be experienced under dramatic, low-key lighting that emphasizes the surface texture and the tension between strength and contemplation.</p>
            <p>What made this project meaningful was the journey from complete inexperience to a competition-winning piece. The nights of practice, the failed prototypes, and the material constraints all compressed into a few months of intense, physical creative work &mdash; a different kind of design process from anything digital, where every decision is permanent and undo doesn&rsquo;t exist.</p>
          </CsBody>
        </CsSection>

        {/* Final sculpture images */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/Sculpture/5.webp" alt="Final sculpture — life-size plaster figure under dramatic lighting, studio and competition display" loading="lazy" />
          </div>
        </section>

        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/Sculpture/2.jpg" alt="Sculpture documentation — project summary, competition context, and role description" loading="lazy" />
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-context', label: 'Context' },
          { id: 'cs-research', label: 'Research' },
          { id: 'cs-process', label: 'Process' },
          { id: 'cs-final', label: 'Final' },
        ]} />

      </main>

      <NextProject slug="vishwaconclave" title="VishwaConclave" image="/Portfolio.github.io/Assets/Projects/VishwaConclave/1.webp" />
      <Footer />
    </>
  )
}
