import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsBody from '../../components/case-study/CsBody'
import CsCallout from '../../components/case-study/CsCallout'
import CsImage from '../../components/case-study/CsImage'
import CsThanks from '../../components/case-study/CsThanks'
import NextProject from '../../components/case-study/NextProject'

export default function AtpsPage() {
  return (
    <>
      <Helmet>
        <title>ATPS &middot; Parth Pawar</title>
        <meta name="description" content="ArtTown Podcast Series (ATPS), a weekly podcast hosted by Parth Pawar, featuring 40+ conversations with art and design professionals worldwide. 50k+ views and 18,000 hours of playtime." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ATPS · Parth Pawar" />
        <meta property="og:description" content="ArtTown Podcast Series, 40+ conversations with art and design professionals. 50k+ views." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/atps.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#319795' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="brand-visual"
          backLabel="Back to Work"
          tags={['Podcast', 'Content', 'Art & Design']}
          title="ArtTown Podcast Series"
          subtitle="Unravelling hidden talents and inspiring young minds through conversations with art and design professionals worldwide"
          info={[
            { label: 'Year', value: '2020 \u2013 Present' },
            { label: 'Role', value: 'Podcast Host' },
            { label: 'Platforms', value: 'Spotify, Apple Podcast, Google Podcast' },
          ]}
        />

        {/* Hero image */}
        <CsImage src="/Assets/Projects/ATPS/Desktop/1.webp" alt="ArtTown Podcast Series hero, microphone with a grid of episode artwork and 50k+ listeners" />

        {/* Distribution */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Distribution</p>
            <h2 className="cs-display">Listen from the best podcast platform</h2>
            <div className="cs-tags" style={{ marginBottom: '2rem' }}>
              <span className="cs-tag-item">Google Podcast</span>
              <span className="cs-tag-item">Podcast Addict</span>
              <span className="cs-tag-item">Spotify</span>
              <span className="cs-tag-item">Apple Podcast</span>
              <span className="cs-tag-item">Pocket Casts</span>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <h2 className="cs-display" style={{ margin: 0 }}>ArtTown Podcast Series</h2>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: '1.1rem', color: 'var(--ink-70)' }}>Podcast Host</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '1rem', color: 'var(--ink-40)' }}>March 2020 &ndash; Present</div>
              </div>
            </div>
            <ProjectOverview
              sections={[
                {
                  label: 'Summary',
                  content: "As an enthusiast of the performing arts and design, I was honored to host a podcast that would provide insights into this creative world. ATPS's vision is to unravel the artist's hidden talents, and stories that can truly inspire people and promote intellectual discussions on art in order to widen people's perspectives. We had a weekly release that promised a fun, entertaining, and worth-a-while listening experience.",
                },
                {
                  label: 'Interest',
                  content: 'I started the Podcast series with the vision of helping young people understand and learn about multiple career opportunities in the Art and Design world by interviewing Industry experts all over the world.',
                },
                {
                  label: 'Achievement',
                  content: 'We successfully hosted 40+ talks with 50k+ views & 18000 hours of playtime and inspired many young minds to pursue Art & Design field.',
                },
              ]}
            />
          </div>
        </section>

        {/* Stats */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Impact</p>
            <div className="cs-info-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', textAlign: 'center', margin: '2rem 0 0' }}>
              <div className="cs-info-item" style={{ alignItems: 'center' }}>
                <span className="cs-info-value" style={{ fontFamily: 'var(--display)', fontSize: 'clamp(3rem,7vw,5rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>50k+</span>
                <span className="cs-info-key" style={{ fontSize: '1.1rem', textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--sans)' }}>Views</span>
              </div>
              <div className="cs-info-item" style={{ alignItems: 'center' }}>
                <span className="cs-info-value" style={{ fontFamily: 'var(--display)', fontSize: 'clamp(3rem,7vw,5rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>40+</span>
                <span className="cs-info-key" style={{ fontSize: '1.1rem', textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--sans)' }}>Guests</span>
              </div>
              <div className="cs-info-item" style={{ alignItems: 'center' }}>
                <span className="cs-info-value" style={{ fontFamily: 'var(--display)', fontSize: 'clamp(3rem,7vw,5rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>18000</span>
                <span className="cs-info-key" style={{ fontSize: '1.1rem', textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--sans)' }}>Hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Plan of Action */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display" style={{ textAlign: 'center' }}>Plan of action?</h2>
            <div className="cs-steps" style={{ gridTemplateColumns: 'repeat(6,1fr)', marginTop: '3rem' }}>
              <div className="cs-step">
                <div className="cs-step-title">Problem</div>
                <div className="cs-step-desc">Educating Young Minds</div>
              </div>
              <div className="cs-step">
                <div className="cs-step-num">&#9670;</div>
                <div className="cs-step-title">Discover</div>
                <div className="cs-step-desc">Art &amp; Design Domain</div>
              </div>
              <div className="cs-step">
                <div className="cs-step-title">Define</div>
                <div className="cs-step-desc">Contact experts from domain</div>
              </div>
              <div className="cs-step">
                <div className="cs-step-num">&#9670;</div>
                <div className="cs-step-title">Develop</div>
                <div className="cs-step-desc">Connection &amp; Preparation before shoot</div>
              </div>
              <div className="cs-step">
                <div className="cs-step-title">Deliver</div>
                <div className="cs-step-desc">Podcast shoot &amp; Post Editing</div>
              </div>
              <div className="cs-step">
                <div className="cs-step-title">Solution</div>
                <div className="cs-step-desc">Informative Podcast</div>
              </div>
            </div>
          </div>
        </section>

        {/* Guest Connections */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display" style={{ textAlign: 'center' }}>Guest Connections</h2>
            <CsBody style={{ maxWidth: '100%', textAlign: 'center', margin: '0 auto 2rem' }}>
              <p>Over 40 episodes, we connected with a diverse range of guests including product designers, architects, art directors, brand developers, glass sculptors, tattoo artists, art conservators, and more from around the world.</p>
            </CsBody>
          </div>
        </section>

        {/* How It Works */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label" style={{ textAlign: 'center' }}>Listener Experience</p>
            <h2 className="cs-section-title" style={{ textAlign: 'center' }}>How It Works</h2>
            <div className="cs-steps" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
              <div className="cs-step" style={{ textAlign: 'center' }}>
                <div className="cs-step-num">01</div>
                <div className="cs-step-title">Reveal</div>
                <div className="cs-step-desc">Discover a new guest and episode topic</div>
              </div>
              <div className="cs-step" style={{ textAlign: 'center' }}>
                <div className="cs-step-num">02</div>
                <div className="cs-step-title">Play</div>
                <div className="cs-step-desc">Stream the episode on your preferred platform</div>
              </div>
              <div className="cs-step" style={{ textAlign: 'center' }}>
                <div className="cs-step-num">03</div>
                <div className="cs-step-title">Enjoy</div>
                <div className="cs-step-desc">Gain insights from industry experts</div>
              </div>
              <div className="cs-step" style={{ textAlign: 'center' }}>
                <div className="cs-step-num">04</div>
                <div className="cs-step-title">Repeat</div>
                <div className="cs-step-desc">Come back every Friday for a new episode</div>
              </div>
            </div>
            <CsCallout style={{ textAlign: 'center', marginTop: '3rem', borderLeft: 'none', borderRadius: '12px', background: 'var(--bg-alt)' }}>
              <p><strong>Podcast Every Friday</strong></p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--ink-40)', marginBottom: '0.3rem' }}>WHAT YOU GAIN?</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.5rem,3vw,2rem)' }}>Art</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--ink-40)', marginBottom: '0.3rem' }}>WHEN DOES IT AIR?</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.5rem,3vw,2rem)' }}>Friday</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--ink-40)', marginBottom: '0.3rem' }}>ANY CHARGES?</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.5rem,3vw,2rem)' }}>Free</div>
                </div>
              </div>
            </CsCallout>
          </div>
        </section>

        {/* Episode grid */}
        <CsImage src="/Assets/Projects/ATPS/Desktop/5.webp" alt="Full episode grid of the ArtTown Podcast Series with guest thumbnails and descriptions" />

        {/* Notable Guests */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Episodes</p>
            <h2 className="cs-section-title">Notable Guests</h2>
            <CsBody style={{ marginBottom: '1.5rem' }}>
              <p>The series featured conversations spanning a wide breadth of creative disciplines:</p>
            </CsBody>
            <ul className="cs-list">
              <li>Srishti Bajaj &mdash; Product Designer</li>
              <li>Narendra Rahurikar &mdash; Art Director, Managing Director at Crime Art</li>
              <li>Romain Girard &mdash; Senior Head of Innovation at Puma Global</li>
              <li>Indranit &amp; Nita Kembhavi &mdash; Architects</li>
              <li>Peter Bremers &mdash; Glass Sculptor</li>
              <li>Allan Gois &mdash; Tattoo Artist</li>
              <li>Priya Kapoor &mdash; Art Conservator</li>
              <li>Phillip J. Clayton &mdash; Brand Development and Marketing</li>
              <li>Latoya Flowers &mdash; Media Producer, Projection Mapping Artist</li>
              <li>Paul Sandip &mdash; Innovator of 700+ Products</li>
              <li>Rohit Lalwani &mdash; Startups &amp; Design</li>
              <li>Gopi Kukade &mdash; Advertising Veteran</li>
              <li>Shekhar Badve &mdash; Creative Leader, Head of Product Evolution &amp; Branding</li>
              <li>Bijay Biswal &mdash; Indian Artist</li>
              <li>Aarzoo Khurana &mdash; Featured Guest</li>
            </ul>
          </div>
        </section>

        {/* Reflections */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Reflections</p>
            <h2 className="cs-section-title">What Hosting 40+ Conversations Taught Me</h2>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>Running ATPS for three years taught me that the best interviews happen when you stop performing expertise and start genuinely listening. Early episodes were over-prepared&mdash;I would script every question and stick rigidly to my list. The conversations felt stilted. The turning point was an episode with a glass sculptor who went on a tangent about how material failure teaches you more than success. I followed the tangent instead of redirecting, and it became one of our most-listened episodes.</p>
              <p>The design skill I developed was editorial thinking&mdash;knowing what to cut, what to keep, and how to structure a 60-minute conversation into a compelling 30-minute episode. This is the same skill I now use in product design: understanding that what you leave out defines the experience as much as what you include.</p>
              <p>ATPS also gave me a network I could not have built any other way. Several professional collaborations&mdash;including introductions that led to real projects&mdash;started as podcast conversations.</p>
            </CsBody>
          </div>
        </section>

        <CsThanks />

      </main>

      <NextProject slug="mentra" title="Mentra" image="/Assets/images/mentra.webp" />
      <Footer />
    </>
  )
}
