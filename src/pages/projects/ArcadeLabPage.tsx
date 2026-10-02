import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from "../../components/case-study/CsExpandPreview"
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
          subtitle="Four physical-controller prototypes that informed The Omakase arcade cabinet."
          info={[
            { label: 'Context', value: 'The New Arcade, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Game Designer & Builder' },
            { label: 'Tools', value: 'Arduino, Unity, 3D Printing, Laser Cutting' },
          ]}
        />

        {/* Overview */}
        <CsExpandPreview>
        <CsSection id="cs-overview" label="Overview" title="Four prototypes over ten weeks">
          <CsBody>
            <p>The New Arcade at NYU ITP is a course about designing games that bring people together physically &mdash; not through screens, but through shared space, custom controllers, and face-to-face competition. Over 10 weeks, I built four rapid prototypes exploring different approaches to social play, each one informing the next, culminating in <a href="/the-omakase" className="project-text-link">The Omakase</a>.</p>
            <p>The constraint that defined every prototype: <strong>no standard controllers</strong>. Every game had to have a custom physical interface &mdash; something you couldn&rsquo;t just plug a gamepad into. This pushed the design process into unfamiliar territory where the interface IS the game.</p>
          </CsBody>
        </CsSection>

        {/* Prototypes */}
        <CsSection id="cs-prototypes" label="01 &mdash; Prototypes" title="The controller shaped each game">
          <CsFeatureGrid features={[
  {
    "title": "Slap Battle · pressure pads",
    "desc": "Two players hit table-mounted pads to move a tug-of-war bar. The prototype explored a direct link between physical effort and the on-screen contest."
  },
  {
    "title": "Tilt Maze · shared control",
    "desc": "Two players each control one tilt axis of a platform to guide a ball through a maze. Progress depends on coordinating their movements."
  },
  {
    "title": "Sound Chef · recipe sequences",
    "desc": "Large ingredient buttons produce success and error sounds as a player follows a recipe. The sequence and audio feedback informed The Omakase."
  },
  {
    "title": "Speed Sushi · timed orders",
    "desc": "Two players match ingredient sequences using six RGB buttons each. The pattern-matching loop developed into The Omakase’s eight-button cabinet."
  }
]} />
        </CsSection>

        {/* Key Insights */}
        <CsSection id="cs-insights" label="02 &mdash; Insights" title="Decisions carried into The Omakase">
          <CsBody>
            <p>The prototypes helped narrow the final game to two players, physical ingredient buttons, color cues, and time pressure. These are design decisions from the build process; the archive does not contain comparative player-study results.</p>
          </CsBody>
          <CsFeatureGrid features={[
  {
    "title": "Make the action physical",
    "desc": "Use a controller that makes the game’s action tangible: slap, tilt, or press an ingredient."
  },
  {
    "title": "Keep the opponent close",
    "desc": "Two adjacent stations make it possible to notice the other player while following an order."
  },
  {
    "title": "Pair sound with visual feedback",
    "desc": "A sound can confirm a button sequence when the player is looking away from the display. Keep visible feedback available too."
  },
  {
    "title": "Make the recipe legible",
    "desc": "Color and ingredient order explain the task. Familiarity with cooking should not be assumed to eliminate the need for instructions."
  }
]} />
        </CsSection>

        {/* Journey */}
        <CsSection id="cs-journey" label="03 &mdash; The Journey" title="From prototypes to the cabinet">
          <CsBody>
            <p>The Omakase combines the two-player contest, ingredient sequences, RGB cues, and timed orders explored in these prototypes. Its cabinet makes those decisions inspectable in a complete physical build.</p>
            <p>See the <a href="/the-omakase" className="project-text-link">cabinet film and browser adaptation</a> for the developed game. Original recordings of the four early prototypes are not included here.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        </CsExpandPreview>

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
