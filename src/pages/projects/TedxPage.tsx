import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsCredits from '../../components/case-study/CsCredits'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function TedxPage() {
  return (
    <>
      <Helmet>
        <title>TEDx VIT Pune &middot; Parth Pawar</title>
        <meta name="description" content="Art Director for TEDx VIT Pune, led a team of 65+ people to design, fabricate, and build a parallax cityscape stage for 800+ attendees. From brand identity to structural construction." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="TEDx VITPUNE &middot; Parth Pawar" />
        <meta property="og:description" content="Art Director for TEDx VIT Pune, led 65+ people to build a parallax cityscape stage for 800+ attendees." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/tedx.png" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#E53E3E' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="brand-visual"
          backLabel="Back to Work"
          tags={['Art Direction', 'Stage Design', 'Brand Identity', 'Fabrication']}
          title="TEDx VIT Pune"
          subtitle="Art directing a 65-person team to design, fabricate, and light a rotating parallax cityscape stage for 800+ attendees"
          info={[
            { label: 'Role', value: 'Art Director' },
            { label: 'Team', value: '65+ volunteers' },
            { label: 'Timeline', value: 'Sept\u2013Nov 2019' },
            { label: 'Audience', value: '800+ attendees' },
            { label: 'Year', value: '2019' },
          ]}
          heroImage="/Assets/Projects/Tedxvitpune/Desktop/5.jpg"
          heroAlt="Completed TEDxVITPune stage with parallax cityscape"
        />

        {/* Overview */}
        <div className="wrap project-overview reveal" id="cs-overview">
          <div className="proj-overview-grid">
            <div className="proj-overview-body">
              <h2 className="section-label">The Challenge</h2>
              <p className="proj-desc">TEDxVITPune is one of Pune&rsquo;s longest-running TEDx events, bringing together speakers, performers, and an audience of 800+ for a single day of ideas worth spreading. For the 2019 edition, the organizing committee wanted something the event had never attempted: a stage that was not just a backdrop, but a spatial experience &mdash; one that transformed throughout the day and reinforced the event&rsquo;s theme visually. The brief was open-ended and the budget was tight. Everything had to be designed, built, and installed by students within eight weeks.</p>
            </div>
            <div className="proj-overview-body">
              <h2 className="section-label">My Role</h2>
              <p className="proj-desc">Art Director &mdash; Aesthetic Head of TEDxVITPune. Responsible for brand identity, stage concept, structural design, fabrication oversight, lighting design, and team coordination across 65+ volunteers in design, fabrication, logistics, and on-site assembly.</p>
            </div>
          </div>
        </div>

        {/* Brand Identity */}
        <section className="cs-section reveal" id="cs-brand">
          <div className="wrap">
            <p className="cs-section-label">02 &mdash; Brand Identity</p>
            <h2 className="cs-section-title">Visual System</h2>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>The visual identity for TEDxVITPune 2019 needed to honor the established TEDx brand guidelines while carving out a distinct personality for this edition. I developed a cohesive system that extended from digital collateral to the physical stage itself.</p>
            </CsBody>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2rem', marginTop: '2.5rem' }}>
              <div>
                <p className="cs-section-label" style={{ marginBottom: '0.5rem' }}>Color Palette</p>
                <CsBody>
                  <p>Built around the signature TEDx red, the palette was extended with deep navy (#080B1E) and warm neutrals. The dark tones gave the brand a cinematic quality that translated directly to stage lighting&mdash;every digital design choice was made with the physical space in mind.</p>
                </CsBody>
              </div>
              <div>
                <p className="cs-section-label" style={{ marginBottom: '0.5rem' }}>Typography</p>
                <CsBody>
                  <p>Bold, geometric type for headlines paired with a clean sans-serif for body text. The typographic hierarchy was designed to work across print banners, projected slides, and stage signage&mdash;maintaining legibility at scales from phone screens to 12-foot backdrops.</p>
                </CsBody>
              </div>
              <div>
                <p className="cs-section-label" style={{ marginBottom: '0.5rem' }}>Collateral</p>
                <CsBody>
                  <p>The system unified social media graphics, event programs, speaker introduction cards, venue signage, attendee badges, and merchandise. Every touchpoint reinforced the same visual language, creating a cohesive brand experience from the moment attendees saw the event online to the moment they walked through the venue doors.</p>
                </CsBody>
              </div>
            </div>
          </div>
        </section>

        {/* Stage Design */}
        <CsSection id="cs-stage" label="03 &mdash; Stage Design" title="Parallax Cityscape">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>The stage concept was a layered parallax cityscape&mdash;multiple planes of building silhouettes at varying depths that created an illusion of spatial depth when lit from behind. As speakers moved across the stage, the relationship between the layers shifted, making the backdrop feel alive rather than static.</p>
            <p>The design went through three major iterations. Initial sketches explored abstract geometric forms, but user testing with the organizing committee revealed that a recognizable urban skyline would resonate more strongly with the audience and provide better visual framing for speakers on camera.</p>
            <p>The final design featured five distinct depth layers, each cut from different materials to vary opacity and texture. The deepest layer was solid MDF painted matte black; mid-layers were semi-transparent fabric stretched over wooden frames; the foreground layer was detailed laser-cut acrylic. When backlit with programmable LEDs, the layers produced a subtle parallax effect visible from every seat in the auditorium.</p>
          </CsBody>
        </CsSection>

        {/* Stage Design Gallery */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display" style={{ opacity: 0.25, fontSize: 'clamp(3rem,8vw,7rem)', marginBottom: '2rem' }}>Stage Design</h2>
            <figure className="cs-img-full" style={{ background: 'transparent' }}>
              <img src="/Assets/Projects/Tedxvitpune/Desktop/1.jpg" alt="TEDxVITPune stage design, speakers and performers on the parallax cityscape stage" loading="lazy" />
            </figure>
          </div>
        </section>

        {/* Team Leadership */}
        <CsSection id="cs-team" label="04 &mdash; Team Leadership" title="Coordinating 65+ People">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>This was not a project I could build alone. As Art Director, I led a team of 65+ volunteers&mdash;most of whom had never worked on a production of this scale. The team was organized into three functional groups: Design (visual identity, signage, digital collateral), Fabrication (structural construction, material sourcing, painting), and Logistics (venue coordination, equipment rental, day-of setup).</p>
            <p>I ran weekly all-hands meetings and daily standups with group leads during the final two weeks. The biggest leadership challenge was maintaining design quality across dozens of hands. I created detailed visual guides and templates for every fabrication task&mdash;specifying exact paint mixes, cut dimensions, and assembly sequences&mdash;so that volunteers with no design training could execute at the standard the event required.</p>
            <p>Delegation was essential, but so was knowing when to step in. I personally oversaw every critical juncture: the first structural test of the rotating mechanism, the lighting programming, and the final 48-hour install marathon before the event.</p>
          </CsBody>
        </CsSection>

        {/* Process */}
        <CsSection id="cs-process" label="05 &mdash; Process" title="Eight Weeks, Concept to Curtain">
          <CsBody style={{ maxWidth: '720px' }}>
            <p><strong>Weeks 1&ndash;2: Concept &amp; Brand.</strong> Developed the parallax cityscape concept and complete brand identity system. Presented three stage directions to the organizing committee; the parallax approach was selected unanimously. Simultaneously recruited and onboarded the full volunteer team.</p>
            <p><strong>Weeks 3&ndash;4: Structural Design.</strong> Translated the stage concept into engineering drawings. Worked with local fabricators to source materials and validate structural feasibility. Built a 1:10 scale model to test sightlines and lighting angles from every section of the auditorium.</p>
            <p><strong>Weeks 5&ndash;6: Fabrication.</strong> Full-scale construction began. Columns were built from wooden frames and MDF panels. The rotating stage platform was assembled and tested for smooth, silent rotation. Parallax layers were cut and painted. The team worked in shifts across two workshops.</p>
            <p><strong>Week 7: Lighting &amp; Integration.</strong> Programmable LED strips were wired behind each parallax layer. Lighting scenes were programmed to match the event&rsquo;s session structure&mdash;warm tones for talks, cooler tones for performances, dynamic color shifts for transitions. The rotating mechanism was integrated with the lighting controller for synchronized reveals.</p>
            <p><strong>Week 8: Install &amp; Event Day.</strong> The entire stage was transported and assembled in the venue over 48 hours. Final lighting calibration, sound checks, and a full technical rehearsal. On event day, I directed all visual elements live&mdash;stage rotations, lighting cues, and backdrop changes&mdash;ensuring the 800+ attendees experienced a seamless production.</p>
          </CsBody>
        </CsSection>

        {/* Process Gallery */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display" style={{ marginBottom: '2rem' }}>Process</h2>
            <figure className="cs-img-full" style={{ background: 'transparent' }}>
              <img src="/Assets/Projects/Tedxvitpune/Desktop/4.jpg" alt="Behind-the-scenes process photos showing stage construction, column fabrication, lighting tests, and assembly" loading="lazy" />
            </figure>
          </div>
        </section>

        {/* Reflections */}
        <CsSection id="cs-reflections" label="06 &mdash; Reflections" title="What Leading This Taught Me">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>TEDxVITPune was the first time I was responsible for both the creative vision and the operational execution of a large-scale production. Two lessons stayed with me.</p>
            <p>First, design systems are leadership tools. The visual guides and templates I created were not just about consistency&mdash;they were about giving 65 people the confidence to act without waiting for my approval. When the system is clear, people move faster and make better decisions on their own.</p>
            <p>Second, the gap between a concept and a built thing is where most projects fail. Ideas are cheap; execution at scale is what matters. Managing material constraints, volunteer fatigue, venue restrictions, and a hard deadline taught me more about design than any studio course. The stage worked because every aesthetic decision was also a structural decision, a budget decision, and a logistics decision. That integration&mdash;thinking across domains simultaneously&mdash;is what I now consider the core skill of design leadership.</p>
          </CsBody>
        </CsSection>

        {/* Credits & Thanks */}
        <section className="cs-section cs-thanks reveal">
          <div className="wrap">
            <h2 className="cs-thanks-title">Thank You</h2>

            <CsCredits credits={[
              { role: 'Art Director', name: 'Parth Pawar' },
            ]} />

            <div className="cs-tags" style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <span className="cs-tag-item">Art Direction</span>
              <span className="cs-tag-item">Stage Design</span>
              <span className="cs-tag-item">Parallax Concept</span>
              <span className="cs-tag-item">Brand Identity</span>
              <span className="cs-tag-item">Lighting Design</span>
              <span className="cs-tag-item">Fabrication</span>
              <span className="cs-tag-item">Team Leadership</span>
              <span className="cs-tag-item">TEDx</span>
            </div>
          </div>
        </section>

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-brand', label: 'Brand Identity' },
          { id: 'cs-stage', label: 'Stage Design' },
          { id: 'cs-team', label: 'Team' },
          { id: 'cs-process', label: 'Process' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

      <NextProject slug="code-for-build" title="Code for Build" image="/Assets/images/code-for-build.jpg" />
      <Footer />
    </>
  )
}
