import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import StageRotation from '../../components/StageRotation'

export default function RevolvingStagePage() {
  return (
    <>
      <Helmet>
        <title>Revolving Stage &middot; Parth Pawar</title>
        <meta name="description" content="Designed and engineered a revolving stage for a theatre play at Firodia Karandak. A 15 ft. rotating platform supporting 250+ kgs, built for scene changes without blackout in a 65+ person production." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Revolving Stage &middot; Parth Pawar" />
        <meta property="og:description" content="Engineered a 15 ft. revolving stage for theatre, supporting 250+ kgs and changing scenes without blackout." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/revolving-stage.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#8A6B4F' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Fabrication', 'Engineering', 'Art Direction']}
          title={'Designing Revolving Stage\nFor Theatre Play'}
          subtitle="Engineering a 15 ft. rotating platform supporting 250+ kgs for scene changes without blackout"
          info={[
            { label: 'Client', value: 'Firodia Karandak' },
            { label: 'Scope of Work', value: 'Design, Production, Engineering' },
            { label: 'Role', value: 'Engineer & Art Director' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2022' },
          ]}
          heroImage="/Portfolio.github.io/Assets/Projects/RevolvingStage/photos/performance-collage.webp"
          heroAlt="Revolving Stage, designing a revolving stage for theatre play with stage photo and 3D render"
        />

        {/* Summary section */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">A theatrical device that rotates the stage for scene changes &mdash; a 15 ft. revolving platform on an 8 ft. base, turning within a 16 ft. stage.</h2>

            <div className="cs-label-row">
              <span className="cs-label-row-key">The Challenges</span>
              <span className="cs-label-row-val">The main challenge was to design an axle that could support and revolve the 15 ft. platform on its 8 ft. base, with almost 250+ kgs bearing on it, while staying stable enough for actors to stand and perform on. Planning and completing this in 3 months, while leading a team of 65+ people, was a challenge of its own.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">My Role</span>
              <span className="cs-label-row-val">As an Art Director, I had to design and engineer the axle and the complete stage with different scenes according to the theatrical play, while administrating and leading 65+ people.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Tools &amp; Techniques</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">Mechanical Engineering</span>
                  <span className="cs-tag-item">Welding</span>
                  <span className="cs-tag-item">Carpentry</span>
                  <span className="cs-tag-item">Drill</span>
                  <span className="cs-tag-item">Concept Development</span>
                  <span className="cs-tag-item">Stage Production</span>
                  <span className="cs-tag-item">Theatre &ndash; Tech</span>
                  <span className="cs-tag-item">Stage Management</span>
                  <span className="cs-tag-item">Scene Types</span>
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* Slide images */}
        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/RevolvingStage/photos/isometric-stage.png" alt="Isometric view showing the revolving stage rotating anticlockwise 135 degrees above the audience seating area" loading="lazy" decoding="async" />
        </div>

        {/* Mechanical Design */}
        {/* Interactive — stage rotation */}
        <CsExpandPreview>
        <CsSection id="cs-rotate" label="Interactive" title="Spin the Stage">
          <CsBody>
            <p>Drag to rotate the 15-foot platform. Four scene zones are painted on the stage &mdash; as it turns, different scenes face the audience. This is how the director used rotation as a narrative tool: one smooth spin = one scene transition, no blackout needed.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <StageRotation />
          </div>
        </CsSection>

        <CsSection id="cs-engineering" label="Engineering" title="Mechanical Design">
          <CsBody>
            <p>The stage assembly consists of four main components: the wooden revolving stage (15 ft. expansion), a central axle, a caster wheel bearing assembly arranged in a circular pattern, and an 8 ft. &times; 8 ft. wooden base. The entire structure is designed for disassembly and transport.</p>
            <p>Each component was engineered to balance structural integrity with practical constraints. The revolving platform needed to support at least 250 kg of static load &mdash; multiple actors, furniture, and set dressing &mdash; while rotating smoothly enough that transitions could happen during live scenes without distracting the audience. The wooden base distributes weight across the venue floor to prevent point loading that could damage the stage surface.</p>
            <p>The modular design was critical because the entire assembly had to be transported to the venue, assembled on-site in a single day, and struck after the final performance. Every joint, bolt, and connection point was designed for tool-free or minimal-tool assembly, and the components were sized to fit through standard doorways and load into a standard truck bed.</p>
          </CsBody>
        </CsSection>

        <figure className="cs-slide reveal" style={{ margin: 0 }}>
          <img src="/Portfolio.github.io/Assets/Projects/RevolvingStage/photos/full-assembly-exploded.png" alt="Exploded isometric view of the full assembly: wooden revolving stage, axle stack, caster wheels arranged in two circles, and wooden base" loading="lazy" decoding="async" />
          <figcaption className="cs-img-caption">The full stack, exploded: platform, axle, twin rings of caster wheels, and the 8 ft. wooden base.</figcaption>
        </figure>

        {/* Axle */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Engineering</p>
            <h2 className="cs-section-title">Axle</h2>
            <CsBody>
              <p>The axle assembly is composed of the following components:</p>
              <ul className="cs-list">
                <li>Steel Plate 1 (1 ft. &times; 1 ft.)</li>
                <li>Shaft</li>
                <li>Thrust Bearing</li>
                <li>Ball Bearing</li>
                <li>Bearing</li>
                <li>Steel Plate 2</li>
              </ul>
            </CsBody>
          </div>
        </section>

        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/RevolvingStage/photos/axle-exploded.png" alt="Exploded view of the axle assembly, steel plates, shaft, thrust bearing, ball bearing, and bearing components" loading="lazy" decoding="async" />
        </div>

        {/* Caster Wheel */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Engineering</p>
            <h2 className="cs-section-title">Caster Wheel &amp; Bearing Assembly</h2>
            <CsBody>
              <p>Wheels hold up the weight of the revolve. While it&rsquo;s desirable if a plain wagon moves quietly, it&rsquo;s even more important for our revolve, because one of this stage equipment unit is that it doesn&rsquo;t draw attention to itself by rumbling and squeaking. So we need wheels that will operate without making noise.</p>
              <p>The caster wheels are arranged in a circular pattern on the 8 ft. base, with a 4 ft. radius, providing even weight distribution and smooth, silent rotation for the entire stage platform.</p>
            </CsBody>
          </div>
        </section>

        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/RevolvingStage/photos/caster-engineering.webp" alt="Caster wheel detail and circular bearing assembly arrangement on the base, 8 ft. diameter layout" loading="lazy" decoding="async" />
        </div>

        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/RevolvingStage/photos/stage-rotation.png" alt="Revolving stage shown at multiple rotation angles, clockwise 45 degrees, angle 0 degrees, anti-clockwise 45 and 90 degrees" loading="lazy" decoding="async" />
        </div>

        {/* Final Stage Design */}
        <section className="cs-section reveal" id="cs-design">
          <div className="wrap">
            <p className="cs-section-label">Design</p>
            <h2 className="cs-display">Final Stage Design</h2>
            <CsFeatureGrid features={[
              { title: 'Cafe 1', desc: 'Cafe 1 is an indoor high end cafe to give a feel of luxury and casual meetups. It was specifically used in Key Script play (2nd and 5th Scene) as the protagonist develop their story.' },
              { title: 'Revolving Stage', desc: 'Revolving Stage was the centre piece of the act, as it performed as multiple stages inside one frame itself. The Building View, Corner Street View & Garden view were showcased using this stage dynamic.' },
              { title: 'Cafe 2', desc: 'Cafe 2 was set as a foreground for Musicians to help give the inclusivity in the act.' },
            ]} />

            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2.5rem', alignItems: 'start' }}>
              <div className="cs-img reveal">
                <img src="/Portfolio.github.io/Assets/Projects/RevolvingStage/photos/stage-vs-render.png" alt="The built shop-front set with two actors on stage next to its 3D design render with the same striped umbrella and shutter" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Built vs. designed: the set as the audience saw it, next to the render it was built from.</figcaption>
              </div>
              <div className="cs-img reveal">
                <img src="/Portfolio.github.io/Assets/Projects/RevolvingStage/Mobile/3.jpg" alt="Renders of the set at each rotation stop: building view, side view after clockwise 90 degrees, and the garden scene revealed at anticlockwise 135 degrees" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">One set, three scenes: each rotation stop turns a different painted face toward the audience, ending on the garden at 135&deg;.</figcaption>
              </div>
            </div>
          </div>
        </section>

        {/* In Action */}
        <CsSection id="cs-result" label="Result" title={'In \u2013 Action'}>
          <CsBody>
            <p>The revolving stage in live performance &mdash; capturing scene transitions, actor interactions, and the dynamic set changes during the theatrical play at Firodia Karandak.</p>
            <p>During the performance, the stage executed over a dozen rotations across seven scene changes, each completed in under fifteen seconds. The backstage crew operated the rotation manually using a concealed push bar, with cue lights coordinated through the stage manager. The silent caster wheels proved essential &mdash; audience members later reported being unaware of the mechanical system beneath the set.</p>
            <p>The strongest moment was a 135-degree rotation during live dialogue. The set changed around the actors without blackout, proving the mechanism could carry theatrical ambition on a college budget.</p>
          </CsBody>
        </CsSection>

        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/RevolvingStage/photos/performance-collage.webp" alt="Photo collage of the revolving stage in action during live theatrical performances at Firodia Karandak" loading="lazy" decoding="async" />
        </div>

        {/* Credits */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Team</p>
            <h2 className="cs-section-title" style={{ fontStyle: 'italic' }}>Credits</h2>
            <CsCredits credits={[
              { role: 'Director', name: 'Apoorva Joglikar' },
              { role: 'Art Director', name: 'Parth Pawar' },
              { role: 'Backstage Head', name: 'Vaishnavi Vaidya' },
              { role: 'Technical Team', name: 'Omkar Mahale, Omkar Sardeshpande, Akshit Mahale, Kedar Deshpande, Saumeen Phanasalkar, Nilay Diwan' },
              { role: 'Lights', name: 'Umang Pathrabe, Adityaraj HonRaopatil' },
            ]} />
          </div>
        </section>

        {/* Reflections */}
        <CsSection id="cs-reflections" label="Reflections" title="What Building a Stage Taught Me About Design">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>The revolving stage was the project that taught me design is not a visual discipline&mdash;it is a systems discipline. Every aesthetic decision was also a structural decision. The parallax effect I wanted required specific material thicknesses. The scene transitions I designed required specific rotation speeds. The lighting I planned required specific electrical loads. If any one system failed, the whole production failed.</p>
            <p>Leading 65+ people taught me that specification is a design skill. Exact dimensions, paint codes, and assembly sequence helped the team execute without constant correction.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-rotate', label: 'Interactive' },
          { id: 'cs-engineering', label: 'Engineering' },
          { id: 'cs-design', label: 'Design' },
          { id: 'cs-result', label: 'Result' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

      <NextProject slug="the-omakase" title="The Omakase" image="/Portfolio.github.io/Assets/images/the-omakase.jpg" />
      <Footer />
    </>
  )
}
