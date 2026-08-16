import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function ArcadeLabPage() {
  return (
    <>
      <Helmet>
        <title>Arcade Lab &middot; Parth Pawar</title>
        <meta name="description" content="Rapid game prototyping experiments from The New Arcade at NYU ITP — physical controllers, party game mechanics, and the journey to The Omakase." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Arcade Lab · Parth Pawar" />
        <meta property="og:description" content="Game prototyping experiments from The New Arcade, NYU ITP." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#FF2D78' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Game Design', 'Physical Computing', 'Rapid Prototyping']}
          title="Arcade Lab"
          subtitle="Rapid game prototyping experiments &mdash; physical controllers, party mechanics, and the research that led to The Omakase"
          info={[
            { label: 'Context', value: 'The New Arcade, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Game Designer & Builder' },
            { label: 'Tools', value: 'Arduino, Unity, 3D Printing, Laser Cutting' },
          ]}
        />

        {/* Overview */}
        <CsSection id="cs-overview" label="Overview" title="10 Weeks, 4 Prototypes, 1 Final Game">
          <CsBody>
            <p>The New Arcade at NYU ITP is a course about designing games that bring people together physically &mdash; not through screens, but through shared space, custom controllers, and face-to-face competition. Over 10 weeks, I built four rapid prototypes exploring different approaches to social play, each one informing the next, culminating in <a href="/the-omakase" className="project-text-link">The Omakase</a>.</p>
            <p>The constraint that defined every prototype: <strong>no standard controllers</strong>. Every game had to have a custom physical interface &mdash; something you couldn&rsquo;t just plug a gamepad into. This pushed the design process into unfamiliar territory where the interface IS the game.</p>
          </CsBody>
        </CsSection>

        {/* Prototypes */}
        <CsSection id="cs-prototypes" label="01 &mdash; Prototypes" title="Four Experiments">
          <CsFeatureGrid features={[
            {
              title: 'Prototype 1: Slap Battle',
              desc: 'Two pressure-sensitive pads mounted on a table. Players slap their pad as fast as possible — each hit moves a tug-of-war bar on screen. Simple, loud, immediately understood. Insight: the physicality of hitting something creates emotional investment that button pressing never does.',
            },
            {
              title: 'Prototype 2: Tilt Maze',
              desc: 'A physical platform with an accelerometer. Two players each control one axis of tilt, trying to guide a ball through a maze on screen. Forces cooperation — you literally can\'t win alone. Insight: shared control creates more laughter than competition.',
            },
            {
              title: 'Prototype 3: Sound Chef',
              desc: 'Players press ingredients (big arcade buttons) to match a recipe displayed on screen. Each button plays a sound — the correct sequence creates a "cooking" melody, wrong ones make error sounds. Insight: audio feedback is instantly readable, and cooking metaphors are universally understood. This became the direct ancestor of The Omakase.',
            },
            {
              title: 'Prototype 4: Speed Sushi (pre-Omakase)',
              desc: 'Two-player competitive cooking game with 6 RGB buttons per player. Match sushi orders by pressing the right ingredient sequence. The button colors change to show which ingredient they represent. This prototype proved the core loop — pattern matching under time pressure with physical buttons — and became the foundation for The Omakase\'s final 8-button, laser-cut cabinet design.',
            },
          ]} />
        </CsSection>

        {/* Key Insights */}
        <CsSection id="cs-insights" label="02 &mdash; Insights" title="What Rapid Prototyping Taught Me">
          <CsBody>
            <p>Building four games in ten weeks — each with custom hardware — teaches you to separate the essential from the decorative. Every prototype was ugly. None of them had proper enclosures or polished graphics. But every one of them answered a design question within the first 30 seconds of playtesting.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'The body is the best controller', desc: 'Slapping, tilting, and pressing large buttons creates engagement that screen-based games can\'t match. The physical effort makes winning feel earned and losing feel dramatic.' },
            { title: 'Two players is the sweet spot', desc: 'Solo arcade games are meditative. Three+ player games have coordination overhead. Two players create direct rivalry, shared eye contact, and spontaneous trash-talking — the ideal social dynamic.' },
            { title: 'Audio > Visual for feedback', desc: 'Players look at each other, not the screen. Sound effects communicate success/failure instantly without requiring visual attention. This shaped The Omakase\'s entire feedback system.' },
            { title: 'Cooking metaphors work universally', desc: 'Recipe sequences travel across cultures. "Press the ingredients in order" needs zero explanation. This insight eliminated the need for a tutorial in The Omakase.' },
          ]} />
        </CsSection>

        {/* Journey */}
        <CsSection id="cs-journey" label="03 &mdash; The Journey" title="From Lab to Cabinet">
          <CsBody>
            <p>The Arcade Lab experiments established every key decision in The Omakase: two-player competition (from Slap Battle), physical buttons (from all four), cooking metaphor (from Sound Chef), RGB color-coding (from Speed Sushi), and time pressure (from all four). The final cabinet was the synthesis of everything that worked across ten weeks of rapid iteration.</p>
            <p>The most important thing the lab taught: <strong>start with the controller</strong>. Don&rsquo;t design a game then figure out how to control it. Design the physical interaction first, then build the game around what feels good in your hands. The Omakase&rsquo;s 8-button sushi station wasn&rsquo;t an afterthought &mdash; it was the first thing that existed, and the game grew around it.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-prototypes', label: 'Prototypes' },
          { id: 'cs-insights', label: 'Insights' },
          { id: 'cs-journey', label: 'Journey' },
        ]} />

      </main>

      <NextProject slug="the-omakase" title="The Omakase" image="/Assets/images/the-omakase.jpg" />
      <Footer />
    </>
  )
}
