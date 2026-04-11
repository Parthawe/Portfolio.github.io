import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function SeaOfSaltPage() {
  return (
    <>
      <Helmet>
        <title>Why the Sea is Salt &middot; Parth Pawar</title>
        <meta name="description" content="Why the Sea is Salt — a physical storytelling machine that grinds real salt as you advance through the Norse folktale of an enchanted quern that could never stop grinding." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Why the Sea is Salt · Parth Pawar" />
        <meta property="og:description" content="A physical storytelling machine — slide the story forward and watch salt grind." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#c2956a' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Installation', 'Physical Computing', 'Storytelling', 'Fabrication']}
          title="Why the Sea is Salt"
          subtitle="A physical storytelling machine that grinds real salt as you advance through a Norse folktale &mdash; the story has physical consequences"
          info={[
            { label: 'Collaborator', value: 'Audrey Oh' },
            { label: 'Context', value: 'Bio Art, NYU ITP' },
            { label: 'Year', value: '2024' },
            { label: 'Tools', value: 'Arduino, Servo Motor, 3D Printing, Laser Cutting' },
          ]}
        />

        {/* Hero photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/sea-of-salt/photos/salt-ground.jpg" alt="Salt mill grinding salt onto the black platform as the story advances" loading="eager" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/sea-of-salt/photos/overview.jpg" alt="Why the Sea is Salt: white cylindrical mill on black platform with story slider" loading="eager" /></div>
            </div>
          </div>
        </section>

        {/* The Folktale */}
        <CsSection id="cs-folktale" label="01 &mdash; The Folktale" title="A Story Told Across Oceans">
          <CsBody>
            <p>&ldquo;Why the Sea is Salt&rdquo; is a Norse folktale collected by Asbj&oslash;rnsen and Moe in the 19th century and later published by Andrew Lang in <em>The Blue Fairy Book</em> (1889). It&rsquo;s classified as Aarne-Thompson-Uther Type 565: The Magic Mill &mdash; one of the most widely distributed folktale types in the world, with variants recorded across Scandinavia, Japan, Greece, Estonia, and Slavic traditions.</p>
            <p>A poor man receives a magical quern (hand-mill) that grinds whatever its owner commands &mdash; gold, food, anything. He becomes wealthy. But a sea captain, consumed by greed, steals the mill and takes it aboard his ship. He commands it to grind salt, thinking he&rsquo;ll never need to make the long voyage to buy it again. The mill obliges. It grinds and grinds. Salt pours out like water.</p>
            <p>The captain doesn&rsquo;t know the words to make it stop.</p>
            <p>The salt piles higher. The ship sinks. And at the bottom of the ocean, the mill grinds still. That, the story says, is why the sea is salt.</p>
          </CsBody>
        </CsSection>

        <CsPullquote quote="There lies the mill at the bottom of the sea, and still, day by day, it grinds on; and that is why the sea is salt." />

        {/* Slider detail */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/sea-of-salt/photos/detail-salt-slider.jpg" alt="Close-up: ground salt scattered across the slider reading 'Why the Sea is Salt'" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/sea-of-salt/photos/slider-closeup.jpg" alt="Story slider: 'Start of the Story' to 'End of the Story'" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* The Installation */}
        <CsSection id="cs-installation" label="02 &mdash; The Installation" title="What Happens When Stories Have Consequences">
          <CsBody>
            <p>The installation is a single object on a black platform: a white cylindrical salt mill with a wooden handle, and a slider labeled &ldquo;Start of the Story&rdquo; on one end and &ldquo;End of the Story&rdquo; on the other.</p>
            <p>Slide the story forward. The mill turns. Real coarse sea salt grinds through the mechanism and scatters across the black surface. The further into the tale you go, the faster the mill grinds. By the climax &mdash; when the captain can&rsquo;t stop the mill &mdash; salt is pouring out. By the end, the platform is covered.</p>
            <p>The question the piece asks is simple: <strong>what if advancing a story had physical consequences?</strong> In a book, you turn a page and nothing changes in the room. Here, every inch of the slider adds salt to the world. The story&rsquo;s tragedy (the mill can&rsquo;t stop) becomes the installation&rsquo;s reality (the salt keeps accumulating). Reading becomes grinding. The folktale becomes material.</p>
          </CsBody>
        </CsSection>

        {/* Mill detail photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/sea-of-salt/photos/mill-front.jpg" alt="White 3D-printed salt mill, wooden dowel handle" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/sea-of-salt/photos/materials.jpg" alt="Materials: sea salt jar, coarse salt bag, mill on platform" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/sea-of-salt/photos/salt-overflow.jpg" alt="Salt overflowing after many story tellings" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <CsSection id="cs-system" label="03 &mdash; How It Works" title="The Machine Behind the Story">
          <CsFeatureGrid features={[
            { title: 'The Mill', desc: 'A 3D-printed white cylinder housing a coarse salt grinding mechanism. The wooden dowel handle connects to a servo motor inside the platform. As the story advances, the motor turns the mill — slow at the beginning, faster at the climax, relentless at the end.' },
            { title: 'The Slider', desc: 'A linear potentiometer on laser-cut acrylic, etched with "Start of the Story" and "End of the Story." The slider position maps to motor speed — the narrative pace is literally in the visitor\'s hands.' },
            { title: 'The Surface', desc: 'Black lacquered MDF chosen so every white grain of salt is visible against it. The dark surface is the stage; the salt is the evidence. Over a day of exhibition, the surface transforms from pristine black to a landscape of white.' },
            { title: 'The Salt', desc: 'Coarse sea salt — irregular crystals that scatter unpredictably when ground. Each visitor\'s interaction leaves salt that the next person encounters. The installation never resets. It accumulates. Like the story itself, it only moves in one direction.' },
          ]} />
        </CsSection>

        {/* Salt accumulation */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/sea-of-salt/photos/salt-pile.jpg" alt="Salt accumulated around the mill base" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/sea-of-salt/photos/salt-spread.jpg" alt="Salt spread across the platform" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Final wide */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Assets/Projects/sea-of-salt/photos/final-wide.jpg" alt="Complete installation: salt scattered across the dark platform" loading="lazy" /></div>
          </div>
        </section>

        {/* Reflection */}
        <CsSection id="cs-reflection" label="04 &mdash; Reflection" title="What the Salt Taught Us">
          <CsBody>
            <p>The most surprising thing: people slid slowly. We expected visitors to rush to see what happened. Instead, they moved the slider inch by inch, watching salt fall, listening to the grinding, touching the crystals on the platform. The physical cost of advancing the narrative made people careful with the story in a way that text never does.</p>
            <p>The folktale works because it explains something real (the ocean is salty) through something magical (an enchanted mill). The installation works for the same reason &mdash; it explains something abstract (narrative has consequences) through something physical (here is the salt your reading produced). Both use the gap between the real and the impossible to create meaning.</p>
            <p>Several visitors asked if they could take salt home. Treating the story&rsquo;s residue as a souvenir meant the line between narrative and material had dissolved. That was the whole point.</p>
            <p>This approach to embodied storytelling connects to two other projects: <a href="/drowning" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Drowning</a>, where the abandoned greenhouse set communicates the play&rsquo;s emotional arc through texture and decay before a word is spoken, and the <a href="/uv-light" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>UV Light Experience</a>, where hidden messages only become visible under blacklight &mdash; the story reveals itself through the act of looking. All three explore the same question: how do you make narrative physical enough that reading and experiencing become the same act?</p>
          </CsBody>
        </CsSection>

        {/* Credits */}
        <CsCredits credits={[
          { role: 'Creator & Fabricator', name: 'Parth Pawar' },
          { role: 'Collaborator', name: 'Audrey Oh' },
          { role: 'Course', name: 'Bio Art, NYU ITP' },
        ]} />

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-folktale', label: 'The Folktale' },
          { id: 'cs-installation', label: 'Installation' },
          { id: 'cs-system', label: 'How It Works' },
          { id: 'cs-reflection', label: 'Reflection' },
        ]} />

      </main>

      <NextProject slug="making-of-time" title="Making of Time" image="/Assets/images/making-of-time.jpg" />
      <Footer />
    </>
  )
}
