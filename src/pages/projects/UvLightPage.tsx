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
        <meta name="description" content="Blacklight installation using invisible ink, hidden messages, and staged room sequencing to make participants search for what was being monitored." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="UV Light Installation &middot; Parth Pawar" />
        <meta property="og:description" content="Blacklight installation with invisible ink, hidden messages, staged rooms, and a surveillance reveal." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/uv-light.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#6B46C1' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Installation', 'Experience Design', 'Art']}
          title="UV Light Experience"
          subtitle="A blacklight installation about hidden information, staged so the audience had to discover the message before they could name it"
          info={[
            { label: 'Client', value: 'NYU \u2013 ITP' },
            { label: 'Scope of Work', value: 'Experience Design' },
            { label: 'Role', value: 'Artist' },
            { label: 'Duration', value: '2 Weeks' },
            { label: 'Year', value: '2023' },
          ]}
          heroImage="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-5.png"
          heroAlt="UV Light blacklight installation with participants searching for hidden messages"
        />

        {/* The Concept */}
        <section className="cs-section reveal" id="cs-background">
          <div className="wrap">
            <p className="cs-section-label">Background</p>
            <h2 className="cs-display">What the Piece Was Really About</h2>
            <CsBody>
              <p>This project started with a simple spatial question: what changes when the information that matters is present, but not visible yet? Blacklight and invisible ink gave me a material way to stage that delay. People had to move, search, and test the room before the meaning of the room revealed itself.</p>
              <p>The deeper theme was surveillance. The installation was built around the tension between what is plainly visible and what is only legible once the right conditions are applied. Under normal light the rooms looked harmless. Under UV they exposed a second layer, making the act of revelation part of the message itself.</p>
              <p>I shaped the concept, spatial sequence, UV logic, and participant interactions, then helped carry the installation through setup and live execution. My main responsibility was making sure the reveal worked as an experience, not just as a collection of props.</p>
            </CsBody>
          </div>
        </section>

        {/* Research */}
        <section className="cs-section reveal" id="cs-discovery">
          <div className="wrap">
            <p className="cs-section-label">Discovery</p>
            <h2 className="cs-display">What the Research Clarified</h2>
            <CsBody>
              <p>The research pushed the project toward participatory theater logic rather than gallery logic. I looked at environments where people are guided through curiosity, social cues, and staged revelation instead of direct instruction. The lesson was clear: discovery-based experiences work when the room keeps rewarding attention, even for participants who miss part of the puzzle.</p>
              <p>I also had to understand the material behavior of UV itself. Fluorescence is not neutral. Different surfaces flare up differently, and that unpredictability became part of the piece. Clothes, paper, skin, tape, and walls all reacted in distinct ways, which meant the environment could feel alive rather than merely decorated.</p>
            </CsBody>
          </div>
        </section>

        {/* Ideation */}
        <section className="cs-section reveal" id="cs-exploration">
          <div className="wrap">
            <p className="cs-section-label">Exploration</p>
            <h2 className="cs-display">Designing for Discovery, Not Explanation</h2>
            <CsBody>
              <p>The early design work focused on one risk: if the installation explained itself too quickly, the idea would collapse into a gimmick. So the exploration phase was less about styling and more about pacing. How much could remain hidden before curiosity turned into confusion? How dense could the clues become before the room felt over-scripted?</p>
              <p>I tested invisible inks, UV-reactive paints, fluorescent tape, and different lighting conditions to understand what could stay subtle and what became immediately obvious. The most useful insight was that discovery worked best when participants felt they were piecing together the logic of the room themselves. That made the later camera-feed layer more unsettling, because it arrived after the audience had already relaxed into play.</p>
            </CsBody>
            <div className="cs-img-full"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/1000051727.webp" alt="Whiteboard brainstorming: room layouts, puzzle concepts, and interaction flow sketches" loading="lazy" /></div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/1000051740.png" alt="Observation whiteboard: show rather than tell, bias, monitoring concepts" loading="lazy" /></div>
              <figure className="cs-img reveal">
                <img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/1000051772.png" alt="Whiteboard close-up of an early four-room concept, murder, stolen data, money heist, with timing math for cycling groups of participants through the rooms" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">An early version was four themed rooms, murder, stolen data, money heist, with the math for how many minutes each group could get before the pacing collapsed.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="cs-section reveal" id="cs-making">
          <div className="wrap">
            <p className="cs-section-label">Making</p>
            <h2 className="cs-display">Building the Reveal Across Rooms</h2>
            <CsBody>
              <p>The installation was staged as a sequence, not a single room. Participants first entered a UV-reactive environment where hidden marks, drawings, and prompts had to be actively uncovered. Only after that exploratory mode was established did they encounter the second layer: observation, framing, and the awareness that their discovery had also been turned into a spectacle.</p>
              <p>Technically, that meant converting ordinary classrooms into controlled UV environments, sealing light leaks, tuning blacklight coverage, and making sure the hidden content revealed at the right level of intensity. The live-feed setup mattered just as much. It shifted the project from visual novelty to a more uncomfortable question about who gets to watch, document, and interpret other people inside an experience.</p>
            </CsBody>
            <div className="cs-img-full"><img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/screenshot-2023-12-21-at-3.51-1.png" alt="The blacklight stage before participants entered: fluorescent tape letters and glowing UV dots scattered across the dark floor, with a banner reading TELL in the foreground" loading="lazy" decoding="async" /></div>
          </div>
        </section>

        {/* Unfold of Act */}
        <section className="cs-section reveal" id="cs-narrative">
          <div className="wrap">
            <p className="cs-section-label">Narrative</p>
            <h2 className="cs-display">How the Reveal Unfolded</h2>
            <CsNumList items={[
              <><strong>Arrival and Grouping</strong> &mdash; Participants were organized into groups of four and ushered into the first room.</>,
              <><strong>The UV Revelation</strong> &mdash; Initially handed blank paper, attendees discovered hidden drawings under UV light upon entering the room. Each revealed piece contributed to a larger painting.</>,
              <><strong>Completion of the Puzzle Painting</strong> &mdash; After completing their individual drawings, participants placed them strategically to form a cohesive puzzle painting.</>,
              <><strong>The Closing Performance</strong> &mdash; The sequence ended with a short Van Gogh-themed performance in the second room, closing with a paper violin placed at the center of the finished puzzle painting.</>,
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
              <p>Each participant received a portrait card with questions that felt casual and disarming: sleep, coffee, work, weekend plans, quick sketches. Nothing on the surface suggested the cards were anything more than a warm-up device.</p>
              <p>Under UV light, the second layer appeared. Hidden messages reframed those prompts as a form of soft data collection, revealing how easily people volunteer personal information when the interaction feels friendly enough. That shift, from participation to mild unease, was the conceptual core of the piece.</p>
              <p>The installation was not arguing that surveillance always looks sinister. It was showing that observation often arrives wrapped in invitation, convenience, and play. The final message, &ldquo;SHOW DON&rsquo;T TELL,&rdquo; became both the artistic method and the critique.</p>
            </CsBody>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'start' }}>
              <figure className="cs-img reveal">
                <img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/screenshot-2023-12-26-at-1.08-1.png" alt="The blank portrait card in daylight: scattered questions about coffee, sleep, work, weekend plans, and a prompt to draw anything" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Stage one: the card as participants received it. Just friendly questions and blank lines.</figcaption>
              </figure>
              <figure className="cs-img reveal">
                <img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-8-1.png" alt="A filled-in portrait card with a green-backdrop polaroid attached and handwritten answers about coffee, meetings, and weekend plans" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Stage two: a completed card, portrait attached, personal details volunteered in handwriting.</figcaption>
              </figure>
              <figure className="cs-img reveal">
                <img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/screenshot-2023-12-26-at-1.10-1.png" alt="The same portrait card under blacklight, where a hidden invisible-ink notation glows next to the printed question" loading="lazy" decoding="async" />
                <figcaption className="cs-img-caption">Stage three: under UV, the invisible-ink annotations appear, and the card reads as a record of observation.</figcaption>
              </figure>
            </div>
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

        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-8.png" alt="The live camera feed of the UV rooms projected across large screens in the darkened auditorium, showing participants being watched in real time" loading="lazy" decoding="async" />
        </div>
        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-7-1.png" alt="Polaroid-style participant portrait cards with green backdrops and printed names, laid out in normal light" loading="lazy" />
        </div>
        <div className="cs-slide reveal">
          <img src="/Portfolio.github.io/Assets/Projects/UVLight/photos/image-3.png" alt="The completed puzzle painting glowing under blacklight on the floor as participants gather around its edges" loading="lazy" />
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

        {/* Reflections */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Reflections</p>
            <h2 className="cs-section-title">What I Learned</h2>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>This project taught me that spatial work needs the same narrative discipline as product design. The participant should know just enough to keep going, but not so much that the answer arrives before the experience does. In this case, UV-reactive cues became the interface.</p>
              <p>It also taught me that some of the strongest moments in live work come from structural tension, not from spectacle. The camera feed mattered because it changed the audience&rsquo;s role. The piece stopped being only about hidden drawings and became about hidden observation.</p>
            </CsBody>
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-background', label: 'Background' },
          { id: 'cs-discovery', label: 'Discovery' },
          { id: 'cs-exploration', label: 'Exploration' },
          { id: 'cs-making', label: 'Making' },
          { id: 'cs-narrative', label: 'Narrative' },
          { id: 'cs-interaction', label: 'Interaction' },
        ]} />

      </main>

      <NextProject slug="revolving-stage" title="Revolving Stage" image="/Portfolio.github.io/Assets/images/revolving-stage.webp" />
      <Footer />
    </>
  )
}
