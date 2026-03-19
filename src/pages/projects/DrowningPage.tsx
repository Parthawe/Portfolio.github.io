import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ReadingProgress from '../../components/case-study/ReadingProgress'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function DrowningPage() {
  return (
    <>
      <Helmet>
        <title>Drowning &middot; Parth Pawar</title>
        <meta name="description" content="Scenic design for stage production inspired by abandoned greenhouse aesthetics — a set design and creative technology project." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Drowning · Parth Pawar" />
        <meta property="og:description" content="Scenic design for stage production inspired by abandoned greenhouse aesthetics." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/drowning.jpg" />
      </Helmet>

      <Nav />
      <ReadingProgress />

      <main id="main-content" className="project-main" style={{ '--project-color': '#5D7B6F' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          backLabel="Back to Work"
          tags={['Set Design', 'Creative Technology']}
          title="Drowning"
          subtitle="Scenic design for stage production inspired by abandoned greenhouse aesthetics"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Set Designer' },
          ]}
        />

        {/* Video */}
        <section className="cs-slide reveal">
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1026164956"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="Drowning"
            />
          </div>
        </section>

        {/* Overview */}
        <CsSection label="Overview" title="Abandoned Greenhouse">
          <CsBody>
            <p>The scenic design for Drowning draws deeply from the haunting beauty of an abandoned greenhouse. Layers of cracked glass and rusted metal frame an atmosphere both fragile and resilient, symbolizing themes of entrapment and decay. Overgrown plants spill from corners and crawl along walls, reclaiming space with quiet but unstoppable force.</p>
            <p>The production required a set that could embody contradictions: a space that felt both sheltering and suffocating, alive and deteriorating, beautiful and unsettling. The abandoned greenhouse metaphor provided all of these tensions naturally. Glass panels suggest transparency and openness, but when cracked and fogged they become barriers. Plants suggest growth and vitality, but when overgrown they suggest neglect and loss of control.</p>
            <p>Every material choice served the emotional arc of the play. The set was not a backdrop but an active participant in the storytelling, shifting in character as the lighting changed and the narrative progressed. Audiences described feeling the environment closing in around them as the play moved toward its climax &mdash; an effect achieved through careful coordination between set structure, lighting states, and the director&rsquo;s blocking.</p>
          </CsBody>
        </CsSection>

        {/* Concept */}
        <section className="cs-section reveal" id="cs-concept">
          <div className="wrap">
            <p className="cs-section-label">01 &mdash; Concept</p>
            <h3 className="cs-section-title">Concept</h3>
            <CsBody>
              <p>The set&rsquo;s textures and muted colors create a visually rich but melancholic environment, echoing the isolation and vulnerability of the characters, suspended in a world forgotten yet teeming with echoes of life.</p>
              <p>The conceptual foundation began with extensive visual research into abandoned greenhouses, botanical ruins, and post-industrial spaces reclaimed by nature. Mood boards drew from photographers like Andrew Moore and Yves Marchand, whose work documents the beauty of structural decay. The color palette &mdash; muted greens, oxidized copper tones, dusty whites, and amber &mdash; was extracted directly from these references and carried through every material on stage.</p>
              <p>The concept also explored how physical textures communicate emotional states. Rough, corroded surfaces evoke anxiety and discomfort, while soft, organic forms like trailing vines and moss suggest vulnerability and tenderness. By layering these contrasting textures within the same visual frame, the set created an environment where audiences could feel the emotional complexity of the play before a single word was spoken.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/N2050663334867775366614256779798/1.jpg" alt="Drowning — concept" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/Q2050663335033796063277642744342/2.jpg" alt="Drowning — concept detail" loading="lazy" />
          </div>
        </section>

        {/* Design */}
        <section className="cs-section reveal" id="cs-design">
          <div className="wrap">
            <p className="cs-section-label">02 &mdash; Design</p>
            <h3 className="cs-section-title">Design</h3>
            <CsBody>
              <p>Layers of translucent and opaque materials create depth on stage. Practical lighting filters through cracked glass panels, casting fractured shadows. Live plants integrated into the set evolve subtly over the run of the production.</p>
              <p>The set construction used a combination of reclaimed window frames, acrylic panels treated with frosting spray and deliberate crack patterns, and a steel-pipe framework that suggested industrial architecture in various stages of collapse. Hanging vines and trailing ivy were woven through the framework, with a mix of real and artificial plants chosen for their silhouette qualities under stage lighting. The real plants added an element of unpredictability &mdash; they grew and shifted slightly across the production run, making the set feel genuinely alive.</p>
              <p>Depth was achieved through three distinct visual planes: a foreground of scattered debris and low vegetation, a midground of glass panels and structural columns where most of the action took place, and a background scrim that could be lit from behind to suggest an expansive, fog-filled exterior. This layering allowed the lighting designer to isolate actors in intimate pools of light while maintaining the sense of a larger, enveloping environment &mdash; a greenhouse that extended beyond the visible edges of the stage.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/W2050663335015349319203933192726/3.jpg" alt="Drowning — design" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/F2050663334996902575130223641110/4.jpg" alt="Drowning — design detail" loading="lazy" />
          </div>
        </section>

        {/* Production */}
        <section className="cs-section reveal" id="cs-production">
          <div className="wrap">
            <p className="cs-section-label">03 &mdash; Production</p>
            <h3 className="cs-section-title">Production</h3>
            <CsBody>
              <p>Collaboration with director and lighting designer to create atmospheric shifts through the play. The greenhouse structure allowed for dynamic lighting states, from harsh daylight to intimate twilight.</p>
              <p>The production process involved close coordination between three disciplines: set design, lighting design, and direction. Weekly design meetings ensured that every structural element on stage served both a visual and a practical purpose. Glass panels were positioned to catch specific lighting angles, creating projected shadow patterns that shifted as the light cues progressed. Practical light sources embedded in the set &mdash; a flickering fluorescent tube, a warm amber bulb behind frosted glass &mdash; added texture that overhead fixtures alone could not achieve.</p>
              <p>The most technically challenging aspect was ensuring the set was safe for actors to navigate in low-light conditions. Every surface was tested for stability, sharp edges were padded or filed, and glow tape was discretely placed at foot level to guide movement during blackouts. The greenhouse framework included hidden handholds that actors could use during physically demanding scenes. This invisible infrastructure &mdash; the safety engineering behind the aesthetic &mdash; was as important as the visual design itself, and taught me that responsible set design means anticipating every way a performer might interact with the space, not just the ways you intend.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/J2050663334978455831056514089494/5.jpg" alt="Drowning — production" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/N2050663334960009086982804537878/6.jpg" alt="Drowning — production detail" loading="lazy" />
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-design', label: 'Design' },
          { id: 'cs-production', label: 'Production' },
        ]} />

      </main>

      <NextProject slug="tedx" title="TEDx VIT Pune" image="/Assets/images/tedx.png" />
      <Footer />
    </>
  )
}
