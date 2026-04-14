import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import CsThanks from '../../components/case-study/CsThanks'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsCallout from '../../components/case-study/CsCallout'
import CsCredits from '../../components/case-study/CsCredits'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function CodeForBuildPage() {
  return (
    <>
      <Helmet>
        <title>Code for Build &middot; Parth Pawar</title>
        <meta name="description" content="Helping Kids learn Coding through Visual Block building and developing Website. A mobile app that uses 3D castle blocks to gamify coding education for teenagers." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Code for Build &middot; Parth Pawar" />
        <meta property="og:description" content="Helping kids learn coding through visual block building, 3D castle blocks to gamify coding education." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/code-for-build.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#2B6CB0' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="brand-visual"
          backLabel="Back to Work"
          tags={['UX', 'Interaction Design', '3D']}
          title={'Learn Coding\nBy Building Blocks'}
          subtitle="Helping Kids learn Coding through Visual Block building and developing Website."
          info={[
            { label: 'Client', value: 'Self Initiated' },
            { label: 'Scope of Work', value: 'Research, UI/UX, Development' },
            { label: 'Role', value: 'Interaction Designer' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2021' },
          ]}
          heroImage="/Portfolio.github.io/Assets/Projects/CodeforBuild/photos/phone-hero.png"
          heroAlt="Code for Build, Learn Coding By Building Blocks hero with 3D block illustrations and mobile mockups"
        />

        {/* Summary / Challenges / Role / Tools */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-label-row" style={{ borderBottomColor: 'var(--ink-12)' }}>
              <span className="cs-label-row-key">Summary</span>
              <span className="cs-label-row-val">Kids from Istanbul have a curiosity to learn coding and development of websites, but can&rsquo;t access computer. Therefore the solution was to help these demographics learn to code on their mobile using visual elements by associating the Visual elements (Kid&rsquo;s childhood playing block pieces) with Code piece, to building block pieces one on top of the other.</span>
            </div>
            <div className="cs-label-row" style={{ borderBottomColor: 'var(--ink-12)' }}>
              <span className="cs-label-row-key">The Challenges</span>
              <span className="cs-label-row-val">Challenge was to build visual elements which could translate and help kids understand the body, container, images, text, and div-block. Inspired by <a href="https://scratch.mit.edu/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Scratch</a> and <a href="https://developers.google.com/blockly" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Google Blockly</a>&rsquo;s block-based approach, but adapted for web development concepts rather than general programming.</span>
            </div>
            <div className="cs-label-row" style={{ borderBottomColor: 'var(--ink-12)' }}>
              <span className="cs-label-row-key">My Role</span>
              <span className="cs-label-row-val">As I was the Sole Interaction Designer, I experimented with solutions to visualize the content to learn 10 to 16 years old kids to understand coding. The idea revolved around making puzzle block pieces to build a castle of blocks to make coding fun to learn.</span>
            </div>
            <div className="cs-label-row" style={{ borderBottomColor: 'var(--ink-12)', borderBottom: 'none' }}>
              <span className="cs-label-row-key">Tools &amp; Techniques</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">3D Modelling</span>
                  <span className="cs-tag-item">Figma</span>
                  <span className="cs-tag-item">Illustrator</span>
                  <span className="cs-tag-item">Blender</span>
                  <span className="cs-tag-item">Transformation - Access</span>
                  <span className="cs-tag-item">Code Block Building</span>
                  <span className="cs-tag-item">Html</span>
                  <span className="cs-tag-item">CSS</span>
                  <span className="cs-tag-item">Frontend - Development</span>
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="cs-section reveal" id="cs-discover">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <p className="cs-section-label">Discover</p>
            <h2 className="cs-section-title">Problem Statement</h2>
            <CsCallout style={{ textAlign: 'center', borderLeft: 'none', maxWidth: '700px', margin: '2rem auto' }}>
              <p>How can we encourage teenagers to <strong>learn coding</strong> effectively using gamified visualisation?</p>
            </CsCallout>
          </div>
        </section>

        {/* App screens — the actual product */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal">
              <img src="/Portfolio.github.io/Assets/Projects/CodeforBuild/photos/two-phones.png" alt="Code for Build app: code view with 3D block illustration and output preview" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="cs-section reveal">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <p className="cs-section-label">Discover</p>
            <h2 className="cs-section-title">Process</h2>
            <div className="cs-info-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', textAlign: 'center' }}>
              <div className="cs-info-item" style={{ alignItems: 'center' }}>
                <span className="cs-info-key">Discover</span>
                <span className="cs-info-value">User Research</span>
                <span className="cs-info-value">Market Research</span>
              </div>
              <div className="cs-info-item" style={{ alignItems: 'center' }}>
                <span className="cs-info-key">Define</span>
                <span className="cs-info-value">Insights</span>
                <span className="cs-info-value">Goals</span>
                <span className="cs-info-value">Challenges</span>
                <span className="cs-info-value">Features</span>
              </div>
              <div className="cs-info-item" style={{ alignItems: 'center' }}>
                <span className="cs-info-key">Develop</span>
                <span className="cs-info-value">UX</span>
                <span className="cs-info-value">Visuals</span>
              </div>
              <div className="cs-info-item" style={{ alignItems: 'center' }}>
                <span className="cs-info-key">Deliver</span>
                <span className="cs-info-value">Prototyping</span>
                <span className="cs-info-value">Improvements</span>
              </div>
            </div>
          </div>
        </section>

        {/* User Research */}
        <section className="cs-section reveal">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <p className="cs-section-label">Discover</p>
            <h2 className="cs-section-title">User Research</h2>
            <div className="cs-img-full">
              
            </div>
          </div>
        </section>

        {/* Market Research / Competitive Analysis */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label" style={{ textAlign: 'center' }}>Discover</p>
            <h2 className="cs-section-title" style={{ textAlign: 'center' }}>Market Research</h2>
            <h3 className="cs-section-subtitle">Competitive Analysis</h3>

            <div style={{ overflowX: 'auto', margin: '2rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--sans)', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--ink-12)' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', opacity: 0.6 }}>Application Name</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem', fontWeight: 600 }}>Enki</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem', fontWeight: 600 }}>SoloLearn</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem', fontWeight: 600 }}>Mimo</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem', fontWeight: 600 }}>Encode</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem', fontWeight: 600 }}>Codeacademy</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem', fontWeight: 600 }}>Programming Hub</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Coding Languages - HTML, CSS', ['Yes','Yes','Yes','Yes','Yes','Yes']],
                    ['Coding Languages - Javascript', ['No','No','No','No','No','No']],
                    ['Visualization of Code', ['No','No','No','No','No','No']],
                    ['Multiple Layouts', ['Yes','Yes','No','No','Yes','Yes']],
                    ['Illustrated Code', ['No','Yes','No','No','No','No']],
                    ['Coding stem', ['Yes','Yes','Yes','Yes','Yes','Yes']],
                    ['Castle Blocks', ['No','No','Yes','No','No','No']],
                    ['Multi-lingual Support', ['Yes','Yes','No','Yes','No','No']],
                    ['Digital In & Out Board', ['No','No','Yes','No','No','No']],
                    ['3D Modelling', ['No','No','No','No','Yes','No']],
                    ['Digital agreements', ['No','No','Yes','No','No','No']],
                  ].map(([feature, vals], i) => (
                    <tr key={i} style={{ borderBottom: i < 10 ? '1px solid var(--ink-12)' : undefined }}>
                      <td style={{ padding: '0.6rem 1rem' }}>{feature as string}</td>
                      {(vals as string[]).map((v, j) => (
                        <td key={j} style={{ textAlign: 'center', color: v === 'Yes' ? 'var(--ink-70)' : 'var(--ink-40)' }}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Goals */}
        <section className="cs-section reveal" id="cs-define">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <p className="cs-section-label">Define</p>
            <h2 className="cs-section-title">Goals</h2>
          </div>
          <div className="cs-slide reveal">
            <img src="/Portfolio.github.io/Assets/Projects/CodeforBuild/photos/block-castle.png" alt="Goals, castle block illustration, user journey flowchart on blue background" loading="lazy" />
          </div>
        </section>

        {/* Features + UX & Wireframe */}
        <section className="cs-section reveal">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <p className="cs-section-label">Define</p>
            <h2 className="cs-section-title">Features</h2>
            <div className="cs-tags" style={{ justifyContent: 'center', marginBottom: '3rem' }}>
              <span className="cs-tag-item">Coding Languages - HTML, CSS</span>
              <span className="cs-tag-item">Visualization of Code</span>
              <span className="cs-tag-item">Coding Languages - Javascript</span>
              <span className="cs-tag-item">Multiple Layouts</span>
              <span className="cs-tag-item">Illustrated Code</span>
              <span className="cs-tag-item">Coding Stem</span>
              <span className="cs-tag-item">Castle Blocks</span>
              <span className="cs-tag-item">Multi-lingual Support</span>
              <span className="cs-tag-item">Digital In &amp; Out Board</span>
              <span className="cs-tag-item">Digital Agreements</span>
              <span className="cs-tag-item">Multi-lingual Support</span>
            </div>

            <p className="cs-section-label">Develop</p>
            <h2 className="cs-section-title">UX &amp; Wireframe</h2>
          </div>
          <div className="cs-slide reveal">
            <img src="/Portfolio.github.io/Assets/Projects/CodeforBuild/photos/wireframe-blueprint.png" alt="UX wireframes and features overview on blue background" loading="lazy" />
          </div>
        </section>

        {/* Design System */}
        <section className="cs-section reveal" id="cs-develop">
          <div className="wrap">
            <p className="cs-section-label" style={{ textAlign: 'center' }}>Develop</p>
            <h2 className="cs-section-title" style={{ textAlign: 'center' }}>Design System</h2>

            <h3 className="cs-section-subtitle">Colors</h3>
            <CsBody>
              <p>For the app, the colors were removed based on how these colors affect the human psyche. The blue color has a refreshing effect and allows young mind to stay active and coding vibe. The Multi color combination has a pop look which helps with identification.</p>
            </CsBody>

            <h3 className="cs-section-subtitle">Typography</h3>
            <CsBody>
              <p><strong>Inter</strong></p>
            </CsBody>
            <div className="cs-info-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
              <div className="cs-info-item">
                <span className="cs-info-key">Regular</span>
                <span className="cs-info-value">16px</span>
              </div>
              <div className="cs-info-item">
                <span className="cs-info-key">Medium</span>
                <span className="cs-info-value">28px</span>
              </div>
              <div className="cs-info-item">
                <span className="cs-info-key">SemiBold</span>
                <span className="cs-info-value">34px</span>
              </div>
            </div>

            <h3 className="cs-section-subtitle">Block System</h3>
            <CsFeatureGrid features={[
              { title: 'Body Block', desc: 'Use this as the base of your Code' },
              { title: 'Padding', desc: 'Use this block to add Padding between/ all Blocks' },
              { title: 'Image Block', desc: 'Use this block to add Image to your container' },
              { title: 'Icons Block', desc: 'Use this block to add Icons in your container' },
              { title: 'Container / Child', desc: 'Single pieces which join together to form body are called as container' },
              { title: 'Cross Axis Alignment', desc: 'Use this block for If, While, If Else, For Types of Conditions' },
              { title: 'Padding between', desc: 'Space between 2 Containers, Blocks is known as Padding' },
              { title: 'Button', desc: 'Use this block for If, While, If Else, For Types of Conditions' },
              { title: 'Text', desc: 'Add Style to your code using this block' },
            ]} />

            <div className="cs-img-full">
              
            </div>
          </div>
        </section>

        {/* Function & Motivation */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label" style={{ textAlign: 'center' }}>Develop</p>
            <h2 className="cs-section-title" style={{ textAlign: 'center' }}>Function &amp; Motivation</h2>

            <CsBody style={{ marginBottom: '3rem' }}>
              <h3 className="cs-section-subtitle" style={{ fontStyle: 'italic' }}>Code for Build</h3>
              <p>The idea revolved around making puzzle block pieces to build a castle of blocks to make coding fun to learn.</p>
            </CsBody>

            <h3 className="cs-section-subtitle">1. Illustration Code</h3>
            <CsBody style={{ marginBottom: '2rem' }}>
              <p>Illustration depicted in left bottom corner changes according to the part of the code the user choose. Example. Over here we are inside Body &rarr; Container &rarr; Logo &rarr; Netflix.. which showcases the inner parts of the 3D Layout.</p>
            </CsBody>

            <div className="cs-img-full">
              <img src="/Portfolio.github.io/Assets/Projects/CodeforBuild/photos/two-phones.png" alt="Illustration Code, app mockup with 3D block illustrations showing code structure" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Code Learning + Multiple Layouts */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h3 className="cs-section-subtitle">2. Code Learning</h3>
            <div className="cs-two-col">
              <CsBody>
                <p>In the Output Window user will be able to see the Preview of the Frontend Layout &amp; 3D Model representing the same. Its an interactive 3D Block Model to help learn Code by clicking on the 3D Block Model.</p>
              </CsBody>
              
            </div>

            <h3 className="cs-section-subtitle" style={{ marginTop: '4rem' }}>3. Multiple Layouts</h3>
            <div className="cs-two-col cs-two-col--reverse">
              <CsBody>
                <p>Multiple Layouts will help you get a deeper understanding and reflecting on different Coding 3D Models. You can interact with the 3D Layout to change and reflect on Code changes.</p>
              </CsBody>
              
            </div>
          </div>
        </section>

        {/* Final Screens */}
        <section className="cs-section reveal" style={{ paddingBottom: 0 }} id="cs-deliver">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <p className="cs-section-label">Deliver</p>
            <h2 className="cs-section-title">Final Screens</h2>
          </div>
          <div className="cs-slide reveal">
            <img src="/Portfolio.github.io/Assets/Projects/CodeforBuild/photos/all-screens-isometric.png" alt="Final screen showcase, all app screens arranged diagonally on blue background" loading="lazy" />
          </div>
        </section>

        {/* Reflections */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Reflections</p>
            <h2 className="cs-section-title">What I Learned</h2>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>Code for Build started from a real observation: teenagers in Istanbul wanted to learn coding but did not have access to computers. The constraint forced a creative solution&mdash;mapping code concepts to physical building blocks that kids already understood from childhood play. A &lt;div&gt; became a container block. CSS padding became the space between blocks. The metaphor made abstract concepts tangible.</p>
              <p>The hardest design challenge was the 3D visualization. Showing a live 3D model of the code structure alongside the block-building interface meant two competing visual hierarchies on a small mobile screen. The solution was progressive disclosure&mdash;the 3D view starts minimized and expands only when the user taps on a block, revealing how that block fits into the larger structure. This taught me that the best educational interfaces do not show everything at once; they reveal complexity at the pace of the learner.</p>
            </CsBody>
          </div>
        </section>

        {/* Thanks */}
        <section className="cs-section cs-thanks reveal">
          <div className="wrap">
            <h2 className="cs-thanks-title">Thank You</h2>
            <CsCredits credits={[
              { role: 'Interaction Designer', name: 'Parth Pawar' },
            ]} />
          </div>
        </section>

        <BottomNav sections={[
          { id: 'cs-discover', label: 'Discover' },
          { id: 'cs-define', label: 'Define' },
          { id: 'cs-develop', label: 'Develop' },
          { id: 'cs-deliver', label: 'Deliver' },
        ]} />

      <CsThanks />

      </main>

        <NextProject slug="typeface" title="Butler's Slice" image="/Portfolio.github.io/Assets/images/typeface.webp" />
      <Footer />
    </>
  )
}
