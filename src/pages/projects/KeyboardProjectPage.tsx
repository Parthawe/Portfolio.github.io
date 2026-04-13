import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import CsThanks from '../../components/case-study/CsThanks'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsCallout from '../../components/case-study/CsCallout'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsNumList from '../../components/case-study/CsNumList'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function KeyboardProjectPage() {
  return (
    <>
      <Helmet>
        <title>BreakGen &middot; Parth Pawar</title>
        <meta name="description" content="BreakGen. ITP Thesis at NYU Tisch. A modular keyboard design platform that democratizes hardware creation through AI-generated keycaps, layout tools, and automated PCB generation." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="BreakGen &middot; Parth Pawar" />
        <meta property="og:description" content="Modular keyboard design platform, AI-generated keycaps, layout tools, and automated PCB generation." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/keyboard.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#5C6B3A' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Creative Tech', 'Hardware', 'Machine Learning', 'UX/UI']}
          title="BreakGen"
          subtitle="A modular keyboard design platform that democratizes hardware creation through AI-generated keycaps, intuitive layout tools, and automated PCB generation"
          info={[
            { label: 'Role', value: 'Designer & Developer' },
            { label: 'Context', value: 'ITP Thesis, NYU' },
            { label: 'Timeline', value: '2024\u20132025' },
            { label: 'Stack', value: 'React, Three.js, Meshy AI, KiCad' },
          ]}
          heroImage="/Portfolio.github.io/Assets/Projects/Keyboard/photos/keyboard-data-hero.webp"
          heroAlt="KeyData: keyboard with keys at different heights representing data, alongside 3D printed data sculpture"
        />

        {/* Product photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Keyboard/photos/keys-closeup.webp" alt="Close-up: keyboard keys at varying heights, some lifted on wooden stems" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Keyboard/photos/data-sculpture.png" alt="3D printed data sculpture: keyboard keys as a bar chart" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Process photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Keyboard/photos/keyboard-angle.png" alt="KeyData from an angle showing the data landscape of raised keys" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Keyboard/photos/process-grid.png" alt="3D printing process: prints at various stages" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Keyboard/photos/fabrication-process.png" alt="Fabrication process: deconstructed keyboard, keycaps, layout planning" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display" style={{ maxWidth: '20ch' }}>Breaking things to understand how they work.</h2>

            <div className="cs-label-row">
              <span className="cs-label-row-key">Summary</span>
              <span className="cs-label-row-val">BreakGen is a web-based platform where users design fully custom mechanical keyboards from scratch. They select key feel, generate AI-personalized keycaps, build ergonomic layouts, and receive auto-generated PCBs ready for fabrication. The project bridges the gap between desire and ability in the DIY keyboard community &mdash; making deep customization accessible to people without engineering backgrounds.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">The Challenge</span>
              <span className="cs-label-row-val">Custom keyboards are one of the most vibrant hardware subcultures online, but the technical barriers to creating one from scratch are enormous. PCB design requires EDA software expertise, ergonomic layout planning demands spatial reasoning and engineering knowledge, and firmware configuration assumes programming fluency. Most enthusiasts end up buying pre-made boards or waiting months for group buys they cannot influence &mdash; never getting the keyboard that truly fits their hands, workflow, and aesthetic.</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">My Role</span>
              <span className="cs-label-row-val">Sole designer and developer. Responsible for concept development, UX/UI design, frontend development (React + Three.js), AI pipeline integration (Meshy AI), PCB auto-generation logic (KiCad), physical prototyping (3D printing, laser cutting, CNC), and thesis presentation. ITP Thesis project at NYU&rsquo;s Interactive Telecommunications Program, advised by Luisa Pereira.</span>
            </div>
            <div className="cs-label-row" style={{ borderBottom: 'none' }}>
              <span className="cs-label-row-key">Tools &amp; Techniques</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">React</span>
                  <span className="cs-tag-item">Three.js</span>
                  <span className="cs-tag-item">Spline</span>
                  <span className="cs-tag-item">Meshy AI</span>
                  <span className="cs-tag-item">KiCad</span>
                  <span className="cs-tag-item">3D Printing</span>
                  <span className="cs-tag-item">Laser Cutting</span>
                  <span className="cs-tag-item">CNC Milling</span>
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* 01, Concept */}
        <CsSection id="cs-concept" label="01 &mdash; Concept" title="Breaking Things to Understand Them">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>BreakGen started with something personal: the childhood practice of disassembling toys, electronics, and household objects to understand how they work. That impulse&mdash;to crack open a black box and see the mechanism inside&mdash;is the same one that drives the mechanical keyboard community.</p>
            <p>Custom keyboards are one of the most vibrant hardware subcultures online, but there is a stark gap between aspiration and execution. Thousands of enthusiasts want a keyboard that feels, sounds, and looks exactly right, but the technical barriers&mdash;PCB design, firmware configuration, ergonomic layout planning&mdash;keep most people buying pre-made boards or paying a premium for group buys they cannot influence.</p>
            <p>BreakGen addresses this directly. It is a platform that lets anyone walk through the full keyboard creation process: choosing switch feel, generating personalized keycap designs with AI, arranging an ergonomic layout, and exporting a production-ready PCB&mdash;all without opening KiCad or writing a line of firmware.</p>
          </CsBody>

          <CsCallout style={{ marginTop: '2.5rem' }}>
            <p>The thesis question driving BreakGen: can generative AI and parametric design tools collapse the expertise barrier in hardware creation without sacrificing the depth, quality, or joy of making something with your hands?</p>
          </CsCallout>
        </CsSection>

        {/* 02, Research */}
        <CsSection id="cs-research" label="02 &mdash; Research" title="Understanding the Landscape">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>Before building, I spent weeks embedded in the mechanical keyboard community &mdash; reading build logs on r/MechanicalKeyboards, joining Discord servers, attending ITP open labs with keyboard enthusiasts, and cataloging the tools people actually used (and the points where they gave up).</p>
          </CsBody>

          <h3 className="cs-section-subtitle">Community Pain Points</h3>
          <CsInfoGrid items={[
            { key: 'PCB Design Barrier', value: 'KiCad and EasyEDA are powerful but assume electronics engineering knowledge. Most enthusiasts abandon custom PCB design after encountering schematic editors for the first time.' },
            { key: 'Keycap Customization Gap', value: 'Keycap design is either mass-produced (limited choices) or artisan (expensive, months-long waits). There is no middle ground for personal expression at accessible price points.' },
            { key: 'Fragmented Toolchain', value: 'Building a custom keyboard requires jumping between 5\u20138 different tools: layout editors, CAD software, EDA tools, firmware generators, and fabrication services. Each transition is a drop-off point.' },
          ]} />

          <h3 className="cs-section-subtitle" style={{ marginTop: '2.5rem' }}>User Interviews</h3>
          <CsBody style={{ maxWidth: '720px' }}>
            <p>I conducted interviews with 8 ITP students and keyboard community members ranging from complete beginners to experienced builders. Three recurring themes shaped the platform direction:</p>
          </CsBody>
          <CsNumList items={[
            <><strong>Creative intent without technical fluency:</strong> Most users could articulate exactly what they wanted their keyboard to feel and look like, but could not translate that vision into the technical specifications required by existing tools.</>,
            <><strong>Decision fatigue from options overload:</strong> Cherry MX Red vs. Gateron Yellow vs. Kailh Box White &mdash; the sheer number of switch options paralyzed new users. They wanted guidance, not a catalog.</>,
            <><strong>The &ldquo;last mile&rdquo; problem:</strong> Several experienced builders described getting 80% through a custom build and then stalling at PCB routing or firmware configuration &mdash; the most technical and least creative steps in the process.</>,
          ]} />
        </CsSection>

        {/* 03, Architecture */}
        <CsSection id="cs-architecture" label="03 &mdash; Architecture" title="The Stack">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>BreakGen is built as a single-page React application with a real-time 3D preview powered by Three.js and Spline. The interface guides users through a sequential design flow: select switches, design keycaps, arrange layout, generate PCB. Each step feeds into the next, and the 3D preview updates in real time so users always see the consequence of their decisions.</p>
          </CsBody>

          <CsFeatureGrid features={[
            { title: 'Frontend \u2014 React + Three.js + Spline', desc: 'The interface renders a live 3D model of the keyboard as users make design decisions. Each change\u2014switch type, keycap texture, layout shape\u2014updates the preview in real time. Spline handles stylized 3D scenes for onboarding and presentation, while Three.js powers the precise parametric keyboard model.' },
            { title: 'AI Pipeline \u2014 Meshy AI', desc: 'Users describe their ideal keycap aesthetic in natural language or select from style presets. Meshy AI generates 3D keycap models that match\u2014from minimal geometric patterns to ornate sculptural tops. The generated models are normalized for printability and mapped onto the layout in real time.' },
            { title: 'PCB Auto-Generation \u2014 KiCad Integration', desc: 'Once the layout is finalized, BreakGen auto-generates a precise PCB schematic. The system maps each key position to a switch footprint, routes traces, and exports production-ready Gerber files. Users can send these directly to a PCB fabrication service without touching EDA software.' },
            { title: 'Export Pipeline', desc: 'The platform exports multiple file formats matched to fabrication methods: STL files for 3D-printed keycaps and cases, DXF files for laser-cut plates, and Gerber files for PCB manufacturing. Each export is pre-validated for printability and tolerance requirements.' },
          ]} />

        </CsSection>

        {/* 04, Process */}
        <CsSection id="cs-process" label="04 &mdash; Process" title="From Digital Design to Physical Assembly">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>The design process mirrors the user journey itself. Early prototypes tested whether non-technical users could navigate the full keyboard design pipeline without documentation. Iterative user testing at ITP refined the flow: reducing decision fatigue by sequencing choices logically (feel before aesthetics, aesthetics before layout, layout before electronics) and surfacing real-time feedback at every step.</p>
            <p>The interface treats keyboard design as a creative act, not an engineering task. Visual metaphors replace technical jargon. Instead of &ldquo;Cherry MX Red, linear, 45g actuation,&rdquo; users experience a tactile simulation and choose the one that feels right. The system handles the translation.</p>
          </CsBody>

          <div className="cs-process-flow">
            <span className="cs-process-pill">Switch Selection</span>
            <span className="cs-process-pill">Keycap Generation</span>
            <span className="cs-process-pill">Layout Design</span>
            <span className="cs-process-pill">PCB Generation</span>
            <span className="cs-process-pill">Export &amp; Fabrication</span>
          </div>

          <h3 className="cs-section-subtitle" style={{ marginTop: '2.5rem' }}>Key Design Decisions</h3>
          <CsNumList items={[
            <><strong>Sequential flow over open canvas.</strong> Early prototypes offered a freeform workspace where users could tackle any step in any order. Testing revealed that beginners froze when faced with simultaneous choices. The final design enforces a linear progression: feel, then look, then layout, then electronics. Advanced users can jump between steps, but the default path removes ambiguity.</>,
            <><strong>Tactile previews over spec sheets.</strong> Switch selection was redesigned from a comparison table (actuation force, travel distance, operating force) to an interactive simulation. Users press virtual keys and hear the sound profile. The spec data is still accessible but deprioritized &mdash; feel comes first, numbers second.</>,
            <><strong>Prompt-driven keycap design.</strong> Rather than offering a fixed catalog of keycap styles, the AI pipeline lets users describe what they want in natural language. &ldquo;Brutalist concrete texture,&rdquo; &ldquo;Japanese woodblock wave pattern,&rdquo; &ldquo;smooth matte black with gold flecks&rdquo; &mdash; the system generates options and users refine from there. This made personalization feel limitless without requiring 3D modeling skills.</>,
            <><strong>Automated PCB as an invisible step.</strong> PCB generation is the most technical part of keyboard building, and in BreakGen it is the most automated. Users never see a schematic editor. The system infers the circuit from the layout, routes traces automatically, and validates the design against manufacturing constraints. The user sees a confirmation screen; the complexity is hidden.</>,
          ]} />

        </CsSection>

        {/* 05, Fabrication */}
        <CsSection id="cs-fabrication" label="05 &mdash; Fabrication" title="Making It Real">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>BreakGen is not purely digital. Physical prototyping was central to validating the platform &mdash; every claim the software makes about &ldquo;production-ready&rdquo; exports had to be verified by actually producing keyboards. This cycle of digital design to physical artifact, repeated dozens of times, surfaced constraints that pure software testing would never reveal.</p>
          </CsBody>

          <CsFeatureGrid features={[
            { title: '3D Printing', desc: 'Keycaps and case enclosures were printed in resin and PLA. AI-generated keycap designs were exported as STL files and printed at high resolution to verify that generative aesthetics translated to physical objects with satisfying tactile quality. Early prints revealed that intricate AI-generated textures needed minimum wall thicknesses enforced at the model level.' },
            { title: 'Laser Cutting', desc: 'Keyboard plates\u2014the structural layer between keycaps and PCB\u2014were laser cut from acrylic and aluminum sheets. The platform exports DXF files matched to the user\u2019s layout for direct fabrication. Tolerance testing across three different laser cutters established the kerf compensation values built into the export pipeline.' },
            { title: 'CNC Milling', desc: 'For premium case prototypes, CNC-milled aluminum housings were produced. These tested the platform\u2019s ability to generate production-grade enclosure geometry from the parametric design system. The milling process validated that the software\u2019s auto-generated fillets and mounting points were structurally sound.' },
            { title: 'PCB Manufacturing', desc: 'Auto-generated Gerber files were sent to PCB fabrication services (JLCPCB, PCBWay) to validate that the routing algorithms produced boards that passed DRC checks and functioned correctly. Multiple revision cycles refined the auto-router to handle edge cases in non-standard layouts.' },
          ]} />

          <h3 className="cs-section-subtitle" style={{ marginTop: '2.5rem' }}>Fabrication Challenges</h3>
          <CsBody style={{ maxWidth: '720px' }}>
            <p>The hardest fabrication problem was bridging the gap between what looks good on screen and what works in physical reality. AI-generated keycap designs were often beautiful in the 3D preview but unprintable &mdash; overhangs too steep, details too fine for resin resolution, or surfaces that felt wrong despite looking right. This led to a critical platform feature: a printability validation layer that constrains the AI output to physically viable geometries before the user ever sees a design.</p>
            <p>Laser-cut plates revealed another class of problem. Switch cutout tolerances at plus or minus 0.1mm are the difference between a switch that clips in securely and one that rattles or will not seat at all. The platform now bakes in per-material kerf compensation based on the fabrication method the user selects during export.</p>
          </CsBody>

        </CsSection>

        {/* 06, ML Integration */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">06 &mdash; ML Integration</span>
            <h2 className="cs-section-title">Why Meshy AI, and What It Took</h2>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>Choosing the right generative AI pipeline was one of the most consequential decisions in the project. The keycap generation system needed to produce 3D models (not just images), respond to natural language prompts, and output geometry that could be 3D printed without manual cleanup.</p>
              <p>I evaluated four approaches before settling on Meshy AI:</p>
            </CsBody>

            <CsInfoGrid items={[
              { key: 'Text-to-3D (Meshy AI)', value: 'Selected. Best balance of prompt fidelity, mesh quality, and API reliability. Models required post-processing for printability but the base geometry was consistently usable.' },
              { key: 'Image-to-3D Pipeline', value: 'Tested with Stable Diffusion + NeRF reconstruction. Higher visual quality but fragile pipeline \u2014 too many failure modes for a user-facing product.' },
              { key: 'Parametric Generation', value: 'Custom OpenSCAD scripts with randomized parameters. Reliable and printable, but the aesthetic range was narrow \u2014 everything looked procedural rather than designed.' },
              { key: 'Pre-built Library', value: 'A curated set of artist-designed keycaps. High quality but limited personalization \u2014 contradicted the core thesis of user-driven creation.' },
            ]} />

            <CsBody style={{ maxWidth: '720px', marginTop: '2rem' }}>
              <p>The integration required building a normalization layer between Meshy AI&rsquo;s output and the Three.js preview. Generated meshes varied in polygon count (8K to 200K faces), scale, and orientation. The normalization pipeline decimates high-poly models for real-time preview, enforces a consistent coordinate system, and validates that the mesh is watertight (a requirement for 3D printing). This invisible infrastructure is what makes the &ldquo;type a prompt, see a keycap&rdquo; experience feel instantaneous and reliable.</p>
            </CsBody>
          </div>
        </section>

        {/* 07, Outcome */}
        <CsSection id="cs-outcome" label="07 &mdash; Outcome" title="ITP Thesis Show">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>BreakGen was exhibited at the NYU ITP Thesis Show, where visitors designed their own keyboards live on the platform and handled physical prototypes produced through the pipeline. The exhibition demonstrated the full loop: digital design to physical artifact, completed in minutes rather than weeks.</p>
          </CsBody>

          <CsStatGrid stats={[
            { label: 'Thesis Show Visitors', value: '200+' },
            { label: 'Live Designs Created', value: '50+' },
            { label: 'Physical Prototypes', value: '6' },
            { label: 'Design-to-Export Time', value: '<10 min' },
          ]} />


          <h3 className="cs-section-subtitle" style={{ marginTop: '2.5rem' }}>Exhibition Feedback</h3>
          <CsPullquote
            quote="I've wanted to build a custom keyboard for two years but never got past the PCB step. I just designed one in eight minutes and it actually looks like something I'd use."
            cite="\u2014 Thesis Show visitor, ITP second-year student"
          />

          <CsBody style={{ maxWidth: '720px' }}>
            <p>The most consistent feedback from visitors was surprise at how short the path from intent to artifact had become. People who had never considered building a keyboard found themselves engaged in the design process, while experienced builders appreciated that the platform handled the tedious steps (PCB routing, firmware generation) without limiting creative control over the parts that matter to them (layout, aesthetics, feel).</p>
            <p>Several faculty members noted that the project demonstrated a broader principle &mdash; that generative AI tools are most powerful not when they replace human creativity but when they remove the technical gatekeeping that prevents people from expressing creativity they already have.</p>
          </CsBody>

          <CsCallout style={{ marginTop: '2.5rem' }}>
            <p>The project validates a broader thesis &mdash; that generative AI and parametric design tools can collapse the expertise barrier in hardware creation without sacrificing depth or quality. The keyboard is the proof of concept; the architecture generalizes to any modular hardware system.</p>
          </CsCallout>
        </CsSection>

        {/* 08, Reflections */}
        <CsSection id="cs-reflections" label="08 &mdash; Reflections" title="What I'd Carry Forward">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>BreakGen was the most technically complex project I have built, spanning web development, 3D graphics, machine learning, electronics design, and physical fabrication. Working across all of these domains as a sole practitioner taught me lessons that no single-discipline project could.</p>
          </CsBody>
          <CsNumList items={[
            <><strong>Physical constraints are the best design constraints.</strong> The most important features in BreakGen &mdash; printability validation, kerf compensation, mesh normalization &mdash; were not in the original spec. They emerged from the fabrication process, when digital designs failed to become physical objects. Building software for hardware taught me that real-world constraints are not limitations to work around; they are the information that makes the product actually useful.</>,
            <><strong>AI is a material, not a feature.</strong> Early in the project, I treated AI-generated keycaps as a feature to demo. By the end, I understood generative AI as a material with properties &mdash; it has grain, tolerance, failure modes, and sweet spots, just like wood or resin. Designing with AI means understanding those properties and building guardrails that channel its output toward usable results, not just impressive ones.</>,
            <><strong>Sequencing beats simultaneity for novices.</strong> The biggest UX insight was that constraining the design flow (feel, then aesthetics, then layout, then electronics) dramatically reduced drop-off compared to the open-canvas approach. Experts want freedom; beginners want a path. The best tools provide both by making the path the default and freedom the override.</>,
            <><strong>Thesis work is a forcing function for finishing.</strong> Having a fixed exhibition date and a public audience meant that BreakGen had to work end-to-end, not just in isolated demos. That pressure pushed me to solve integration problems I would have deferred indefinitely in a personal project &mdash; and the result was a system that genuinely works, not a collection of promising prototypes.</>,
          ]} />
        </CsSection>

        {/* Thank You */}
        <section className="cs-section cs-thanks reveal">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">Credits</span>
              <span className="cs-label-row-val"><strong>Designer &amp; Developer</strong> &mdash; Parth Pawar<br />Concept, UX/UI design, frontend development, AI pipeline, PCB generation, physical prototyping</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Advisor</span>
              <span className="cs-label-row-val"><strong>Thesis Advisor</strong> &mdash; Luisa Pereira<br />NYU Interactive Telecommunications Program</span>
            </div>
            <div className="cs-label-row" style={{ borderBottom: 'none' }}>
              <span className="cs-label-row-key">Tools &amp; Methods</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">React</span>
                  <span className="cs-tag-item">Three.js</span>
                  <span className="cs-tag-item">Meshy AI</span>
                  <span className="cs-tag-item">Spline</span>
                  <span className="cs-tag-item">KiCad</span>
                  <span className="cs-tag-item">3D Printing</span>
                  <span className="cs-tag-item">Laser Cutting</span>
                  <span className="cs-tag-item">CNC Milling</span>
                  <span className="cs-tag-item">NYU ITP</span>
                </span>
              </span>
            </div>

            <div className="cs-thanks" style={{ marginTop: '3rem' }}>
              <h2 className="cs-thanks-title">Thank You</h2>
            </div>
          </div>
        </section>

        <BottomNav sections={[
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-research', label: 'Research' },
          { id: 'cs-architecture', label: 'Architecture' },
          { id: 'cs-process', label: 'Process' },
          { id: 'cs-fabrication', label: 'Fabrication' },
          { id: 'cs-outcome', label: 'Outcome' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      <CsThanks />

      </main>

        <NextProject slug="jugalbandi" title="Jugalbandi" image="/Portfolio.github.io/Assets/images/jugalbandi.webp" />
      <Footer />
    </>
  )
}
