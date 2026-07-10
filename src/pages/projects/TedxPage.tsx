import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
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
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/tedx.jpg" />
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
          heroImage="/Portfolio.github.io/Assets/Projects/Tedxvitpune/Desktop/5.jpg"
          heroAlt="Completed TEDxVITPune stage with parallax cityscape"
        />

        {/* Overview */}
        <div className="wrap project-overview reveal" id="cs-overview">
          <div className="proj-overview-grid">
            <div className="proj-overview-body">
              <h2 className="section-label">The Challenge</h2>
              <p className="proj-desc">TEDxVITPune needed a stage that felt alive, not a static backdrop. The ask was ambitious: design, build, light, and install a spatial stage system for 800+ attendees in eight weeks, with a student team and a tight budget.</p>
            </div>
            <div className="proj-overview-body">
              <h2 className="section-label">My Role</h2>
              <p className="proj-desc">I led the visual system, stage concept, fabrication direction, lighting design, and on-site assembly across 65+ volunteers.</p>
            </div>
          </div>
        </div>

        {/* Brand Identity */}
        <CsExpandPreview>
        <section className="cs-section reveal" id="cs-brand">
          <div className="wrap">
            <p className="cs-section-label">02 &mdash; Brand Identity</p>
            <h2 className="cs-section-title">Visual System</h2>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>The identity had to follow TEDx rules while giving this edition its own presence. I built one system that carried from digital collateral to the physical stage.</p>
            </CsBody>

            <div className="cs-adaptive-text-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2rem', marginTop: '2.5rem' }}>
              <div>
                <p className="cs-section-label" style={{ marginBottom: '0.5rem' }}>Color Palette</p>
                <CsBody>
                  <p>TEDx red stayed central. Deep navy and warm neutrals gave the event a cinematic tone that translated directly into stage lighting.</p>
                </CsBody>
              </div>
              <div>
                <p className="cs-section-label" style={{ marginBottom: '0.5rem' }}>Typography</p>
                <CsBody>
                  <p>Bold geometric headlines paired with clean body type, built to stay legible from phone screens to 12-foot backdrops.</p>
                </CsBody>
              </div>
            </div>
          </div>
        </section>

        {/* Stage Design */}
        <CsSection id="cs-stage" label="03 &mdash; Stage Design" title="Parallax Cityscape">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>The stage became a layered cityscape: box columns at different heights and depths, lit from behind so the skyline shifted as speakers moved.</p>
            <p>The recognizable skyline won over abstract forms because it read clearly from the back rows, framed speakers on camera, and made the rotating stage feel intentional.</p>
          </CsBody>
        </CsSection>

        {/* Stage Design Gallery */}
        <section className="cs-section reveal">
          <div className="wrap">
            <figure className="cs-img-full" style={{ background: 'transparent' }}>
              <img src="/Portfolio.github.io/Assets/Projects/Tedxvitpune/Desktop/1.jpg" alt="The finished stage in use: a host, a speaker, and a guitarist performing in front of the blue-lit column cityscape and red TEDxVITPune lettering" loading="lazy" decoding="async" />
            </figure>
          </div>
        </section>

        {/* Team Leadership */}
        <CsSection id="cs-team" label="04 &mdash; Team Leadership" title="Coordinating 65+ People">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>I split the 65+ person team into design, fabrication, and logistics groups, then gave each group clear templates, dimensions, paint specs, and assembly guides.</p>
            <p>The system let volunteers move quickly without waiting for approval, while I stayed close to the high-risk moments: structure tests, lighting programming, and the final 48-hour install.</p>
          </CsBody>
        </CsSection>

        {/* Process */}
        <CsSection id="cs-process" label="05 &mdash; Process" title="Eight Weeks, Concept to Curtain">
          <CsBody style={{ maxWidth: '720px' }}>
            <p><strong>Weeks 1&ndash;2:</strong> lock concept, brand direction, and stage language.</p>
            <p><strong>Weeks 3&ndash;4:</strong> translate the stage into drawings, material tests, and a scale model for sightlines.</p>
            <p><strong>Weeks 5&ndash;7:</strong> build column clusters, test rotation, paint finishes, and program lighting scenes.</p>
            <p><strong>Week 8:</strong> transport, assemble, rehearse, and direct the stage visuals live on event day.</p>
          </CsBody>
        </CsSection>

        {/* Process Gallery */}
        <section className="cs-section reveal">
          <div className="wrap">
            <figure className="cs-img-full" style={{ background: 'transparent' }}>
              <img src="/Portfolio.github.io/Assets/Projects/Tedxvitpune/Desktop/4.jpg" alt="Behind the scenes: blue and white columns under construction in a workshop, lighting tests on the assembled skyline, and a volunteer building the red TEDx letters" loading="lazy" decoding="async" />
            </figure>
          </div>
        </section>

        {/* Reflections */}
        <CsSection id="cs-reflections" label="06 &mdash; Reflections" title="What Leading This Taught Me">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>TEDxVITPune taught me that design systems are leadership tools. Clear guides helped 65 people make aligned decisions without slowing the build down.</p>
            <p>The stage worked because every visual choice also had to be structural, affordable, movable, and installable. That is the design lesson I still carry.</p>
          </CsBody>
        </CsSection>

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-brand', label: 'Brand Identity' },
          { id: 'cs-stage', label: 'Stage Design' },
          { id: 'cs-team', label: 'Team' },
          { id: 'cs-process', label: 'Process' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

        <NextProject slug="code-for-build" title="Code for Build" image="/Portfolio.github.io/Assets/images/code-for-build.jpg" />
      <Footer />
    </>
  )
}
