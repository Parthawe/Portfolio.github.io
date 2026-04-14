import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsBody from '../../components/case-study/CsBody'
import CsNumList from '../../components/case-study/CsNumList'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function UvLightPage() {
  return (
    <>
      <Helmet>
        <title>UV Light Experience &middot; Parth Pawar</title>
        <meta name="description" content="Creating an immersive experience utilizing blacklights, invisible ink, and hidden messages, guiding participants through interactive spaces while subtly revealing monitoring, culminating in the revelation of a significant message on portraits." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="UV Light Installation &middot; Parth Pawar" />
        <meta property="og:description" content="Immersive experience with blacklights, invisible ink, and hidden messages in interactive spaces." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/uv-light.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#6B46C1' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Installation', 'Experience Design', 'Art']}
          title="UV Light Experience"
          subtitle="Creating an immersive experience utilizing blacklights, invisible ink, and hidden messages"
          info={[
            { label: 'Client', value: 'NYU \u2013 ITP' },
            { label: 'Scope of Work', value: 'Experience Design' },
            { label: 'Role', value: 'Artist' },
            { label: 'Duration', value: '2 Weeks' },
            { label: 'Year', value: '2023' },
          ]}
          heroImage="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-5.png"
          heroAlt="UV Light Experience, immersive blacklight installation with participants"
        />

        {/* The Concept */}
        <section className="cs-section reveal" id="cs-background">
          <div className="wrap">
            <p className="cs-section-label">Background</p>
            <h2 className="cs-display">The Concept</h2>
            <CsBody>
              <ul className="cs-list">
                <li>Creating an immersive experience using blacklights, invisible ink, UV light, paper, projectors, and hidden messages.</li>
                <li>Engaging participants through exploration and discovery within designated spaces.</li>
              </ul>
              <p>The concept began with a simple question: what happens when the things you need to see are invisible under normal conditions? UV-reactive materials offered a way to create a layered environment where participants had to actively search for meaning rather than passively receive it. The installation was designed as a journey through multiple rooms, each revealing hidden content only under blacklight.</p>
              <p>The thematic anchor was surveillance and visibility &mdash; the tension between being watched and being unaware of it. Participants moved through spaces that appeared ordinary under normal light but transformed under UV illumination, mirroring the way hidden systems of observation operate in everyday life. The experience was designed to provoke reflection on what we choose to reveal, what remains hidden, and who controls the light that makes things visible.</p>
            </CsBody>
          </div>
        </section>

        {/* Ideation */}
        <section className="cs-section reveal" id="cs-exploration">
          <div className="wrap">
            <p className="cs-section-label">Exploration</p>
            <h2 className="cs-display">Ideation</h2>
            <CsBody>
              <ul className="cs-list">
                <li>Brainstorming the use of blacklights and invisible ink to create hidden messages and interactive &ldquo;elevator&rdquo; spaces.</li>
                <li>Aiming for subtle participant monitoring through hidden cameras.</li>
              </ul>
              <p>The ideation phase involved extensive material testing &mdash; experimenting with different brands of invisible ink, UV-reactive paints, and fluorescent tapes to determine which materials produced the most vivid and reliable results under blacklight. We tested across several UV wavelength ranges (365nm to 395nm) and discovered that ink visibility varied dramatically depending on the light source, which informed our choice of blacklight fixtures for the final installation.</p>
              <p>Early prototypes explored small-scale &ldquo;elevator&rdquo; enclosures where a single participant would enter a confined space and discover hidden messages on the walls. We iterated on the spatial design through paper mockups and cardboard prototypes at ITP, testing how different room sizes, lighting angles, and message densities affected the sense of discovery. The hidden camera concept emerged as a way to create an asymmetry of knowledge &mdash; some participants exploring while others observed &mdash; reinforcing the installation&rsquo;s theme of visible and invisible layers.</p>
            </CsBody>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/1000051727.png" alt="Whiteboard brainstorming: room layouts, puzzle concepts, and interaction flow sketches" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/1000051740.png" alt="Observation whiteboard: show rather than tell, bias, monitoring concepts" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="cs-section reveal" id="cs-making">
          <div className="wrap">
            <p className="cs-section-label">Making</p>
            <h2 className="cs-display">Process</h2>
            <CsBody>
              <ul className="cs-list">
                <li>Setting up multiple &ldquo;elevator&rdquo; style spaces in rooms with blacklight-covered walls displaying hidden messages.</li>
                <li>Allowing participants to explore these areas before directing them to an auditorium with a live feed showing their exploration.</li>
              </ul>
              <p>The physical build required transforming two standard ITP classrooms into immersive UV environments. We covered windows and sealed light leaks with blackout fabric, then installed arrays of blacklight LED strips along the ceiling perimeter to ensure even UV coverage across all wall surfaces. Hidden messages were hand-painted onto the walls using invisible ink pens and UV-reactive paint, with content ranging from cryptic phrases to fragments of Van Gogh&rsquo;s letters.</p>
              <p>The auditorium served as the observation room, where a live video feed from cameras in the UV spaces was projected on a large screen. This created a deliberate contrast: participants in the UV rooms experienced discovery and wonder, while those in the auditorium experienced the discomfort of watching others be watched. The technical setup required running long HDMI cables between rooms and calibrating the camera exposure to capture the UV-lit environment accurately, since standard camera settings tend to wash out blacklight scenes.</p>
            </CsBody>
          </div>
        </section>

        {/* Research */}
        <section className="cs-section reveal" id="cs-discovery">
          <div className="wrap">
            <p className="cs-section-label">Discovery</p>
            <h2 className="cs-display">Research</h2>
            <CsBody>
              <p>Engaging participants in an immersive journey involving interaction with hidden elements and discovering the &lsquo;SHOW DON&rsquo;T TELL&rsquo; message displayed on various portraits.</p>
              <p>The research phase drew on principles from environmental psychology and immersive theatre design. We studied how installations like <a href="https://meowwolf.com/visit/santa-fe" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Meow Wolf</a> (whose 20,000 sq ft <em>House of Eternal Return</em> in Santa Fe creates non-linear narrative through 70+ immersive rooms) and <a href="https://www.punchdrunk.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Punchdrunk</a>&rsquo;s <em>Sleep No More</em> guide participants through space without explicit instructions, relying instead on environmental cues, curiosity, and social dynamics. The key finding was that discovery-based experiences work best when the hidden content rewards exploration without punishing those who miss it &mdash; every participant should have a meaningful experience, even if they do not find every hidden message.</p>
              <p>We also researched the science of UV fluorescence to understand why certain materials glow under blacklight and others do not. This technical understanding informed our material choices and helped us predict how different surfaces &mdash; paper, fabric, skin, clothing &mdash; would behave in the UV environment. The unexpected fluorescence of everyday items like white t-shirts and teeth became part of the experience, blurring the line between intentional design and accidental discovery.</p>
            </CsBody>
          </div>
        </section>

        {/* Unfold of Act */}
        <section className="cs-section reveal" id="cs-narrative">
          <div className="wrap">
            <p className="cs-section-label">Narrative</p>
            <h2 className="cs-display">Unfold of Act</h2>
            <CsNumList items={[
              <><strong>Arrival and Grouping</strong> &mdash; Participants were organized into groups of four and ushered into the first room.</>,
              <><strong>The UV Revelation</strong> &mdash; Initially handed blank paper, attendees discovered hidden drawings under UV light upon entering the room. Each revealed piece contributed to a larger painting.</>,
              <><strong>Projection of &lsquo;Starry Night&rsquo;</strong> &mdash; As they worked on their contributions, a projector displayed Van Gogh&rsquo;s mesmerizing &lsquo;Starry Night&rsquo; video, immersing the space in the artist&rsquo;s iconic masterpiece.</>,
              <><strong>Completion of the Puzzle Painting</strong> &mdash; After completing their individual drawings, participants placed them strategically to form a cohesive puzzle painting resembling Van Gogh&rsquo;s style.</>,
              <><strong>Transition to the Second Room</strong> &mdash; Moving to the next room, attendees found seats furnished with pamphlets containing Van Gogh&rsquo;s poetry.</>,
              <><strong>Artistic Presentation</strong> &mdash; At the center of the room, the performer crafted a small violin out of paper, symbolizing Van Gogh&rsquo;s passion for art.</>,
              <><strong>Final Act</strong> &mdash; Upon finishing the violin, the performer returned to the first room and placed the paper violin at the center of the puzzle painting.</>,
            ]} />
          </div>
        </section>

        {/* Van Gogh inspiration */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-4.png" alt="Van Gogh Almond Blossom pamphlet held during the experience setup" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/letter---1.png" alt="Van Gogh letter pamphlet: Paint the Soul" loading="lazy" /></div>
            </div>
            <p className="cs-caption">Van Gogh's Almond Blossom and letters served as the thematic anchor, connecting art, observation, and hidden meaning</p>
          </div>
        </section>

        {/* UV room experience */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Documentation</p>
            <h2 className="cs-section-title">The Experience</h2>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-1.png" alt="UV-lit room: participants discovering hidden projections under blacklight" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-2.png" alt="Participant discovering hidden UV drawings on the floor" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Hidden Messages & Portraits */}
        <section className="cs-section reveal" id="cs-interaction">
          <div className="wrap">
            <p className="cs-section-label">Interaction</p>
            <h2 className="cs-section-title">Hidden Messages &amp; Portraits</h2>
            <CsBody>
              <p>Each participant received a portrait card with seemingly innocent questions &mdash; &ldquo;How many cups of coffee have you had since the start of the program?&rdquo;, &ldquo;What do you enjoy most about your work?&rdquo;, &ldquo;How many hours of sleep do you get daily?&rdquo;, &ldquo;What do you enjoy about ITP?&rdquo;, &ldquo;Draw anything&rdquo;, and &ldquo;What are your weekend plans?&rdquo;. Under UV light, the hidden messages and drawings were revealed on these seemingly blank surfaces.</p>
              <p>The portrait cards served a dual purpose. On the surface, they were a friendly icebreaker &mdash; casual questions that put participants at ease. But the hidden UV messages on each card, visible only under blacklight, reframed those innocent questions as acts of data collection. The reveal created a moment of surprise and mild discomfort: participants realized they had been willingly sharing personal information, and the hidden layer made them question what else might be recorded without their knowledge.</p>
              <p>This interaction mechanic was the conceptual heart of the installation. By making participants complicit in their own observation &mdash; they filled in the cards voluntarily, even enthusiastically &mdash; the piece illustrated how surveillance often operates through consent rather than coercion. The &ldquo;SHOW DON&rsquo;T TELL&rdquo; message, revealed across the assembled portrait cards under UV light, served as both an artistic manifesto and a commentary on the hidden architectures of everyday data collection.</p>
            </CsBody>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-6.png" alt="Participants sitting around glowing UV puzzle on the floor" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-7.png" alt="Close-up: glowing UV element in participant's hand" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-5.png" alt="UV-lit room with Starry Night projection and participants" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* The Blacklight Stage */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Environment</p>
            <h2 className="cs-section-title">The Blacklight Stage</h2>
            <CsBody>
              <p>The main stage was transformed into a UV-reactive environment with fluorescent tape markings on the floor, colorful UV dots, and hidden text that only became visible under blacklight. Participants explored the space, discovering hidden elements as they moved through zones of visible and invisible light.</p>
            </CsBody>
          </div>
        </section>

        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-8.png" alt="UV-lit stage with fluorescent floor markings and participants assembling puzzle pieces" loading="lazy" />
        </div>

        {/* Participant Interaction */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Engagement</p>
            <h2 className="cs-section-title">Participant Interaction</h2>
            <CsBody>
              <p>Participants engaged deeply with the installation, examining UV-revealed messages on their cards, viewing hidden drawings through blacklight, and filling out their personal portrait cards with handwritten answers. A live camera feed in the auditorium showed the exploration happening in real-time, adding a subtle layer of monitoring to the experience.</p>
            </CsBody>
          </div>
        </section>

        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-7-1.png" alt="Close-ups of UV-revealed messages on cards and participant portraits under blacklight" loading="lazy" />
        </div>
        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-3.png" alt="Participants exploring the UV space, filled-in portrait cards, and live camera feed in the auditorium" loading="lazy" />
        </div>

        {/* Credits */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Team</p>
            <h2 className="cs-display">Credits</h2>
            <CsCredits credits={[
              { role: 'Artist', name: 'Parth Pawar' },
              { role: 'Artist Collaborators', name: 'Nathan, Lauren, Baiyuian' },
            ]} />
          </div>
        </section>

        {/* Tools & Techniques */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Capabilities</p>
            <h2 className="cs-display">Tools and Techniques</h2>
            <div className="cs-tags">
              <span className="cs-tag-item">Fabrication</span>
              <span className="cs-tag-item">Research</span>
              <span className="cs-tag-item">Interview</span>
              <span className="cs-tag-item">Python</span>
              <span className="cs-tag-item">Data Visualisation</span>
              <span className="cs-tag-item">3D Printing</span>
              <span className="cs-tag-item">Dismantling</span>
              <span className="cs-tag-item">Sculptor</span>
            </div>
          </div>
        </section>

        {/* My Role */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Contribution</p>
            <h2 className="cs-display">My Role</h2>
            <CsBody>
              <p>My role encompasses conceptualizing and implementing the immersive experience, overseeing the setup of interactive spaces, monitoring systems, and orchestrating participant engagement to reveal the hidden message, ensuring a captivating and impactful journey for all involved.</p>
            </CsBody>
          </div>
        </section>

        {/* Reflections */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Reflections</p>
            <h2 className="cs-section-title">What I Learned</h2>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>The UV Light Experience was my first project where the design medium was space itself, not a screen. The key insight was that participatory installations require a careful balance between structure and freedom. Too much direction and participants feel herded; too little and they miss the hidden elements entirely. The solution was environmental cues&mdash;UV-reactive tape on the floor subtly guided movement without explicit instructions.</p>
              <p>The live camera feed added an unexpected layer. Participants in the auditorium watched others explore the UV rooms, creating a voyeuristic tension that reinforced the installation&rsquo;s theme of hidden observation. This was not planned&mdash;it emerged from the setup. It taught me that the best design moments often come from responding to emergent behavior rather than scripting every interaction.</p>
            </CsBody>
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-background', label: 'Background' },
          { id: 'cs-exploration', label: 'Exploration' },
          { id: 'cs-making', label: 'Making' },
          { id: 'cs-discovery', label: 'Discovery' },
          { id: 'cs-narrative', label: 'Narrative' },
          { id: 'cs-interaction', label: 'Interaction' },
        ]} />

      </main>

      <NextProject slug="revolving-stage" title="Revolving Stage" image="/Portfolio.github.io/Assets/images/revolving-stage.webp" />
      <Footer />
    </>
  )
}
