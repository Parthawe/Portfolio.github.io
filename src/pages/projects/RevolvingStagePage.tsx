import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
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
        <meta name="description" content="Designed and engineered a revolving stage for a theatre play at Firodia Karandak. A 15 ft. rotating platform supporting 250+ kgs, enabling seamless scene transitions for a 65+ person production." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Revolving Stage &middot; Parth Pawar" />
        <meta property="og:description" content="Engineered a 15 ft. revolving stage for theatre, supporting 250+ kgs with seamless scene transitions." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/revolving-stage.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#B7791F' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Fabrication', 'Engineering', 'Art Direction']}
          title={'Designing Revolving Stage\nFor Theatre Play'}
          subtitle="Engineering a 15 ft. rotating platform supporting 250+ kgs for seamless scene transitions"
          info={[
            { label: 'Client', value: 'Firodia Karandak' },
            { label: 'Scope of Work', value: 'Design, Production, Engineering' },
            { label: 'Role', value: 'Engineer & Art Director' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2022' },
          ]}
          heroImage="/Assets/Projects/RevolvingStage/photos/performance-collage.png"
          heroAlt="Revolving Stage, designing a revolving stage for theatre play with stage photo and 3D render"
        />

        {/* Summary section */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">Theatrical device to move 15 ft. to 8 ft. to 16 ft. the stage for scene changes in Theatre Play.</h2>

            <div className="cs-label-row">
              <span className="cs-label-row-key">Summary</span>
              <span className="cs-label-row-val">Revolving stage, theatrical device for scene changes, or shifts, by which three or more settings are constructed on a turntable around a central pivot and revolved before the audience.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">The Challenges</span>
              <span className="cs-label-row-val">The Main Challenge was to design an Axle to support and revolve and 15ft by 8ft stage base, with almost 250+ kgs baring on it. Also giving stability for actors to stand and perform on it. As the timeline was to plan &amp; complete this in 3 months while leading a team of 65+ people, had its own merits.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">My Role</span>
              <span className="cs-label-row-val">As an Art Director, I had to design and engineer Axile and the complete stage with different scenes according to the Theatrical Play while administrating and leading 65+ people.</span>
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
                  <span className="cs-tag-item">Stage Production</span>
                  <span className="cs-tag-item">Scene Types</span>
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* Slide images */}
        <div className="cs-slide reveal">
          <img src="/Assets/Projects/RevolvingStage/photos/isometric-stage.png" alt="Isometric view showing the revolving stage rotating anticlockwise 135 degrees above the audience seating area" loading="lazy" />
        </div>

        {/* Mechanical Design */}
        {/* Interactive — stage rotation */}
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

        <div className="cs-slide reveal">
          <img src="/Assets/Projects/RevolvingStage/photos/stage-vs-render.png" alt="Exploded isometric view, wooden revolving stage, axle, caster wheel bearing assembly, and wooden base with dimensions" loading="lazy" />
        </div>

        {/* Axle */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Engineering</p>
            <h2 className="cs-section-title">Axle</h2>
            <CsBody>
              <p>Axle is a device used in theatrical play production to support and move various props and set pieces. It consists of a rod or spindle that is either fixed or rotating, passing through the centre of a wheel or group of wheels. The axle is designed to enable props and set pieces to be lifted, rotated and moved in any direction on stage. It is often used to swiftly and safely move large props and scenery pieces in a controlled manner during a performance.</p>
            </CsBody>
            <CsBody style={{ marginTop: '1.5rem' }}>
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
          <img src="/Assets/Projects/RevolvingStage/photos/axle-exploded.png" alt="Exploded view of the axle assembly, steel plates, shaft, thrust bearing, ball bearing, and bearing components" loading="lazy" />
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
          <img src="/Assets/Projects/RevolvingStage/photos/caster-engineering.webp" alt="Caster wheel detail and circular bearing assembly arrangement on the base, 8 ft. diameter layout" loading="lazy" />
        </div>

        {/* Revolving Stage Physics */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Engineering</p>
            <h2 className="cs-display">Revolving Stage</h2>
            <CsBody>
              <p>For present purposes, a revolve is a circular disk, capable of supporting the same loads as the stage floor, lying in a horizontal plane and turning around a fixed center. You can conceive of a unit that violates any point of this definition; the victim&rsquo;s wheel in a knife-throwing act is not horizontal, a lightweight set piece can be revealed with a pie stand or a table mounted on a dowel rod, and so forth. I won&rsquo;t take up any of those cases.</p>
              <p>The disk has to be fairly stiff, because we don&rsquo;t want set elements built on it to flex when the unit moves. We don&rsquo;t look for perfect rigidity; maybe we could build a 16- or 18-foot circle with no give in it, but even a sound floor sags a little when loaded, so there&rsquo;s no point incurring the vast expense of a perfect revolve to stand on an imperfect deck.</p>
              <p>If the disk is more than a handspan across, it has to have support other than at the middle. A big revolve with all its weight concentrated at the center would punch right through the deck, making us no friends in the theater.</p>
              <p>The forces on a revolve can be broken down (resolved) into vertical or gravity forces and lateral or thrust forces. Most of the thrusts act when we turn the unit, but lateral forces arise in violent action and even when someone steps on or off. If the revolve is stationary and no one is mounting or dismounting, gravity is the only force that acts on it. It will simplify design and construction if we can use one system to handle thrust and a different system to handle weight.</p>
              <p>That won&rsquo;t quite happen, but we&rsquo;ll make the effort. In building theater equipment, most of us think in terms of wood and metal. There&rsquo;s a lot to be said for iron as a load-bearing material; your favorite freight elevator is chock-full of it.</p>
            </CsBody>
          </div>
        </section>

        <div className="cs-slide reveal">
          <img src="/Assets/Projects/RevolvingStage/photos/stage-rotation.png" alt="Revolving stage shown at multiple rotation angles, clockwise 45 degrees, angle 0 degrees, anti-clockwise 45 and 90 degrees" loading="lazy" />
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
          </div>
        </section>

        {/* In Action */}
        <CsSection id="cs-result" label="Result" title={'In \u2013 Action'}>
          <CsBody>
            <p>The revolving stage in live performance &mdash; capturing scene transitions, actor interactions, and the dynamic set changes during the theatrical play at Firodia Karandak.</p>
            <p>During the performance, the stage executed over a dozen rotations across seven scene changes, each completed in under fifteen seconds. The backstage crew operated the rotation manually using a concealed push bar, with cue lights coordinated through the stage manager. The silent caster wheels proved essential &mdash; audience members later reported being unaware of the mechanical system beneath the set, perceiving the transitions as seamless and almost magical.</p>
            <p>The most dramatic moment came during the climactic scene change, where the stage rotated a full 135 degrees while actors remained on the platform, continuing their dialogue as the environment transformed around them. This technique, borrowed from professional revolving stages used in Broadway and West End productions, was adapted to work within the budget and material constraints of a college-level competition &mdash; demonstrating that theatrical ambition does not require a professional-grade budget, only careful engineering and creative problem-solving.</p>
          </CsBody>
        </CsSection>

        <div className="cs-slide reveal">
          <img src="/Assets/Projects/RevolvingStage/photos/performance-collage.png" alt="Photo collage of the revolving stage in action during live theatrical performances at Firodia Karandak" loading="lazy" />
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
              { role: 'Special Help', name: 'Karan, Parth Ghamande, Prathamesh Kulkarni, Amey Shelke' },
              { role: 'Technical Team', name: 'Omkar Mahale, Omkar Sardeshpande, Akshit Mahale, Kedar Deshpande, Saumeen Phanasalkar, Nilay Diwan' },
              { role: 'Acting Dance & Music Team', name: 'Shreya Lunkad, Varun Khalate, Sakshi Kanav, Sahil Taskar, Prathamesh Londhe, Saumya Deshmukh, Ritika Sisodiya' },
              { role: 'Artist Team', name: 'Shalaka Deo, Shrutika Nandurkar, Vaishnavi, Isha Patil' },
              { role: 'Lights', name: 'Umang Pathrabe, Adityaraj HonRaopatil' },
              { role: 'Backstage Team', name: 'Paresh Gokhale, Aryan Shinde, Aryan Karande, Pushkar Nerpagar, Anshuman Gramkar, Savant Bonthe, Soham Phadke, Vinayak Sawandkar, Shalmali Bhalero, Prathamesh Hawale, Shaunak Yevatkar, Saloni Nimgaonkar, Arya Joshi, Eshan Mehendale, Divya Kamalskar, Gaush Mukkawar, Parth Nevase, Karan' },
              { role: 'Additional Team', name: 'Apoorva Joglikar, Gaurav Waghmare, Mrunal Barve, Mandar Saraf, Parth Ghamande, Aditya Puntambekar, Pratik Hubikar, Aditya Dere, Radhika, Ojas Natu, Aditya Raje' },
            ]} />
          </div>
        </section>

        {/* Tools & Techniques */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">Tools and Techniques</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">Mechanical Engineering</span>
                  <span className="cs-tag-item">Welding</span>
                  <span className="cs-tag-item">Carpentry</span>
                  <span className="cs-tag-item">Stage Production</span>
                  <span className="cs-tag-item">Drill</span>
                  <span className="cs-tag-item">Concept Development</span>
                  <span className="cs-tag-item">Stage Management</span>
                  <span className="cs-tag-item">Theatre &ndash; Tech</span>
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* Reflections */}
        <CsSection id="cs-reflections" label="Reflections" title="What Building a Stage Taught Me About Design">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>The revolving stage was the project that taught me design is not a visual discipline&mdash;it is a systems discipline. Every aesthetic decision was also a structural decision. The parallax effect I wanted required specific material thicknesses. The scene transitions I designed required specific rotation speeds. The lighting I planned required specific electrical loads. If any one system failed, the whole production failed.</p>
            <p>Leading 65+ people also taught me that clarity of specification is the most underrated design skill. When I handed a carpenter a drawing with exact dimensions, paint codes, and assembly sequence, the result matched my intent. When I handed them a sketch and said &ldquo;make it look like this,&rdquo; the result required three revisions. Design systems work the same way&mdash;the more precisely you define the rules, the more reliably other people can execute without you.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-engineering', label: 'Engineering' },
          { id: 'cs-design', label: 'Design' },
          { id: 'cs-result', label: 'Result' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

      <NextProject slug="the-omakase" title="The Omakase" image="/Assets/images/the-omakase.jpg" />
      <Footer />
    </>
  )
}
