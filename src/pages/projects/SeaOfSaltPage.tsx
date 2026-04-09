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

export default function SeaOfSaltPage() {
  return (
    <>
      <Helmet>
        <title>Sea of Salt &middot; Parth Pawar</title>
        <meta name="description" content="Sea of Salt, a kinetic installation where salt landscapes shift in response to real-time ocean data, visualizing the invisible connection between land and sea." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Sea of Salt &middot; Parth Pawar" />
        <meta property="og:description" content="Kinetic salt installation reacting to real-time ocean data." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#c2956a' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/creative-tech"
          categorySlug="creative-tech"
          backLabel="Creative Technology"
          tags={['Installation', 'Physical Computing', 'Data Visualization', 'Fabrication']}
          title="Sea of Salt"
          subtitle="A kinetic installation where salt landscapes shift in response to real-time ocean data &mdash; visualizing the invisible connection between land and sea"
          info={[
            { label: 'Role', value: 'Creator & Designer' },
            { label: 'Context', value: 'Bio Art, NYU ITP' },
            { label: 'Year', value: '2024' },
            { label: 'Tools', value: 'Arduino, Servo Motors, NOAA API, Laser Cutting' },
          ]}
          heroImage="/Assets/images/sea-of-salt.svg"
          heroAlt="Sea of Salt installation, kinetic salt landscape responding to ocean data"
        />

        <CsSection id="cs-concept" label="01 &mdash; Concept" title="Making the Ocean Visible on Land">
          <CsBody>
            <p>The ocean shapes coastlines, weather systems, and entire economies &mdash; but its data is invisible to most people. Wave heights, tidal patterns, and sea surface temperatures exist as numbers in a NOAA database. Sea of Salt translates that data into a physical medium: a tray of salt that shifts, ripples, and reshapes itself in real time based on live ocean readings.</p>
            <p>The installation invites visitors to watch a landscape being sculpted by forces happening thousands of miles away. The salt is both the medium and the metaphor &mdash; coastlines are made of salt, shaped by the same water whose data now reshapes this miniature terrain.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-system" label="02 &mdash; System" title="How It Works">
          <CsFeatureGrid features={[
            { title: 'Data Source', desc: 'Real-time ocean data from NOAA buoy stations: wave height, wave period, sea surface temperature, and wind speed. Data refreshes every 30 minutes.' },
            { title: 'Translation Layer', desc: 'An Arduino processes the data stream and maps ocean parameters to physical motion: wave height controls amplitude, wave period controls speed, temperature shifts the pattern complexity.' },
            { title: 'Kinetic Surface', desc: 'A grid of servo-actuated pins beneath the salt tray creates peaks and valleys. The salt redistributes naturally with each movement, creating evolving topographies that never repeat.' },
            { title: 'Fabrication', desc: 'Laser-cut acrylic frame, 3D-printed servo mounts, custom PCB for motor control. The enclosure is designed to make the mechanism visible through a transparent base.' },
          ]} />
        </CsSection>

        <CsSection id="cs-experience" label="03 &mdash; Experience" title="What Visitors See">
          <CsBody>
            <p>The installation runs continuously. Visitors encounter a tray of white salt that appears to breathe &mdash; slow, rhythmic undulations when the ocean is calm, more aggressive shifts during storms. A small display shows the current data source: which buoy, which ocean, what the numbers mean. But the salt tells the story better than any dashboard could.</p>
            <p>The most common reaction: people stand and watch for 5&ndash;10 minutes, mesmerized by the slow pace. In a world of screens, watching a physical material respond to invisible data creates a kind of attention that digital visualization cannot.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-learnings" label="04 &mdash; Key Learnings" title="What This Project Taught Me">
          <CsFeatureGrid features={[
            { title: 'Physicality demands patience', desc: 'Digital prototypes iterate in minutes. Physical installations iterate in days. Every servo misalignment, every salt grain that doesn\u2019t flow right, every cable that\u2019s 2cm too short teaches a different kind of design discipline.' },
            { title: 'Data has texture', desc: 'Turning numbers into physical movement revealed patterns I never saw in charts. Storm data feels violent in salt. Calm data feels meditative. The medium adds meaning the data alone doesn\u2019t carry.' },
            { title: 'Simplicity in presentation', desc: 'Early versions had too much explanation. The final version: a tray of salt, a small label, and the motion. Visitors understood intuitively. The best data visualization is the one that needs no legend.' },
          ]} />
        </CsSection>

        <CsThanks contactCta />

        <BottomNav sections={[
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-system', label: 'System' },
          { id: 'cs-experience', label: 'Experience' },
          { id: 'cs-learnings', label: 'Learnings' },
        ]} />

      </main>

      <NextProject slug="making-of-time" title="Making of Time" image="/Assets/images/making-of-time.jpg" />
      <Footer />
    </>
  )
}
