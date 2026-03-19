import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function TheOmakasePage() {
  return (
    <>
      <Helmet>
        <title>The Omakase &middot; Parth Pawar</title>
        <meta name="description" content="The Omakase is a 2-player party arcade game where sushi chefs compete to serve customers — a creative technology and game design project." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="The Omakase · Parth Pawar" />
        <meta property="og:description" content="2-player party arcade game where sushi chefs compete to serve customers." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/the-omakase.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#C94C4C' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          backLabel="Back to Work"
          tags={['Creative Technology', 'Game Design']}
          title="The Omakase"
          subtitle="2-player party arcade game where sushi chefs compete to serve customers"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Creator' },
          ]}
        />

        {/* Video */}
        <section className="cs-slide reveal">
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/996020990?h=&badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="The Omakase"
            />
          </div>
        </section>

        {/* Overview */}
        <CsSection label="Overview" title="Serve or Be Served">
          <CsBody>
            <p>The Omakase is a 2-player competitive arcade game where two sushi chefs race to serve customers their feast before their opponent does. Built from scratch as a custom arcade cabinet, the game combines physical computing, game design, and fabrication into a single cohesive experience. Each player commands a set of 8 RGB LED buttons that shift color throughout gameplay, requiring fast pattern recognition, sharp reflexes, and a willingness to get a little messy under pressure.</p>
            <p>The project was conceived as a thesis exploration into how physical arcade games can create spontaneous social moments between strangers. It was exhibited at the ITP Spring Show 2024 at NYU and later shown at Wonderville Brooklyn, an indie arcade bar in Bushwick.</p>
            <p><a href="https://vill4n3lle.itch.io/the-omakase" target="_blank" rel="noopener">Play at vill4n3lle.itch.io/the-omakase &rarr;</a></p>
          </CsBody>
        </CsSection>

        {/* Challenge */}
        <section className="cs-section reveal" id="cs-challenge">
          <div className="wrap">
            <p className="cs-section-label">00 &mdash; Challenge</p>
            <h3 className="cs-section-title">The Design Challenge</h3>
            <CsBody>
              <p>The core challenge was deceptively simple: design a physical arcade game that two complete strangers can walk up to, understand immediately, and play competitively in under three minutes. That constraint shaped every decision that followed.</p>
              <p>Most arcade games at exhibitions fail one of two ways. They are either too complex for a first-time player to pick up without instruction, or too shallow to hold attention past the first thirty seconds. The Omakase needed to land in the narrow space between those extremes &mdash; instantly readable rules, but enough depth that the second round feels different from the first. The game also had to work in an exhibition context where noise levels are high, attention spans are short, and there is always a line of people waiting for their turn.</p>
              <p>A secondary challenge was designing for physicality. Unlike screen-based games, the cabinet itself had to communicate how to play. Button layout, color feedback, and the spatial relationship between the two players all had to do instructional work that a tutorial screen would normally handle. The game needed to teach itself.</p>
            </CsBody>
          </div>
        </section>

        {/* Gameplay */}
        <section className="cs-section reveal" id="cs-gameplay">
          <div className="wrap">
            <p className="cs-section-label">01 &mdash; Gameplay</p>
            <h3 className="cs-section-title">Gameplay</h3>
            <CsBody>
              <p>Two players face off as competing sushi chefs, standing side by side at the cabinet. Each player has 8 color-changing buttons mapped to different sushi ingredients &mdash; salmon, tuna, shrimp, tamago, and so on. Customer orders appear on the shared screen, and players race to press the correct ingredient sequence before their opponent completes theirs.</p>
              <p>The sushi theme was chosen deliberately. Sushi is universally recognizable, its ingredients are visually distinct, and the concept of an omakase &mdash; a chef&rsquo;s choice tasting menu &mdash; gave the game a natural narrative arc. Each round is a &ldquo;course,&rdquo; and the escalating difficulty mirrors the progression of a real omakase meal from simple nigiri to elaborate rolls. The theme also made color-coding intuitive: players could map salmon-pink to salmon and wasabi-green to wasabi without any text labels.</p>
              <p>Competitive mode was chosen over cooperative after early playtesting revealed that side-by-side competition created far more energy and social interaction than cooperative play did. When two strangers cooperate, they tend to be polite and reserved. When they compete, they laugh, trash-talk, and lean into the experience. That energy was essential for an exhibition setting where the game needed to draw a crowd.</p>
              <p>Scoring rewarded both speed and accuracy. Each correct ingredient in a sequence earned base points, but completing a full order without mistakes triggered a combo multiplier. Pressing a wrong ingredient broke the combo and added a brief cooldown penalty, discouraging random button-mashing. This created a risk-reward dynamic: rushing was faster but sloppier, while deliberate play was safer but left you vulnerable to a faster opponent. Rounds lasted 90 seconds, long enough for momentum swings but short enough to keep the queue moving.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2000/i/B1899182472545304968837588124182/1.jpg" alt="The Omakase gameplay" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2000/i/T1899182472600645201058716779030/3.jpg" alt="The Omakase gameplay detail" loading="lazy" />
          </div>
        </section>

        {/* Fabrication */}
        <section className="cs-section reveal" id="cs-fabrication">
          <div className="wrap">
            <p className="cs-section-label">02 &mdash; Fabrication</p>
            <h3 className="cs-section-title">Fabrication</h3>
            <CsBody>
              <p>The custom arcade cabinet was built with laser-cut birch plywood panels, an Arduino Mega 2560, and 16 individually addressable RGB LED arcade buttons &mdash; 8 per player. The cabinet design references classic Japanese candy cab aesthetics with a sloped control panel and a shared upright screen, adapted for a two-player head-to-head layout.</p>
              <p>Laser cutting was chosen over CNC routing or 3D printing for several practical reasons. The plywood panels needed to be large, flat, and precisely interlocking. Laser cutting gave clean finger joints that slotted together without fasteners, making the cabinet easy to assemble and disassemble for transport between exhibition venues. The entire cabinet breaks down into flat panels that fit in the back of a sedan &mdash; a critical requirement when you are hauling an arcade machine across Brooklyn on the subway and then in a rideshare.</p>
              <p>The Arduino Mega was selected over an Uno or a Raspberry Pi because the project needed a large number of digital I/O pins. Each RGB button requires four connections &mdash; one for the button input and three for the red, green, and blue LED channels. With 16 buttons, that is 64 pins for the LEDs alone, plus 16 for button inputs. The Mega&rsquo;s 54 digital I/O pins and 16 analog pins handled this comfortably. A multiplexer could have reduced the pin count on a smaller board, but direct wiring kept the latency imperceptible and the code straightforward, which mattered for a game where milliseconds of input lag would feel unfair.</p>
              <p>The RGB LED buttons were the most critical design element for player feedback. Each button glows in the color of its assigned ingredient during active play, making the mapping between screen and controls immediate and physical. When a player presses the wrong button, all their buttons flash red briefly. When they complete an order, the buttons cascade through a celebratory color animation. This meant players could stay focused on the physical controls rather than constantly glancing at the screen &mdash; the cabinet itself communicated game state through light.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2000/i/K1899182472619091945132426330646/4.jpg" alt="The Omakase fabrication" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2000/i/O1899182472637538689206135882262/5.jpg" alt="The Omakase cabinet detail" loading="lazy" />
          </div>
        </section>

        {/* Exhibition */}
        <section className="cs-section reveal" id="cs-exhibition">
          <div className="wrap">
            <p className="cs-section-label">03 &mdash; Exhibition</p>
            <h3 className="cs-section-title">Exhibition</h3>
            <CsBody>
              <p>The Omakase debuted at the ITP Spring Show 2024 at NYU&rsquo;s Tisch School of the Arts, a two-day public exhibition that draws over 5,000 visitors. Over the course of the show, more than 200 people played the game, with a consistent line forming throughout both days. The cabinet became one of the busiest installations on the floor, partly because the competitive format naturally created spectators &mdash; people would stop to watch a match, then get in line for the next one.</p>
              <p>The reaction was overwhelmingly positive and, more importantly, exactly the kind of social energy the project was designed to generate. Strangers cheered each other on, rematch requests were constant, and several players came back multiple times across both days. One of the most gratifying observations was that players who had never met would leave the cabinet talking to each other &mdash; the shared competitive experience broke the social barrier that usually exists between strangers at a crowded exhibition.</p>
              <p>The game was later shown at Wonderville Brooklyn, an indie arcade bar in Bushwick that hosts experimental and independent arcade games. Playing in a bar context versus an academic exhibition was a very different experience. The energy was louder, the competition more intense, and the social dynamics shifted &mdash; players were more willing to trash-talk and celebrate dramatically. The game held up well in both contexts, which validated the core design decisions around simplicity and immediacy.</p>
              <p>If I were to revisit the project, I would make two changes. First, I would add a simple high-score leaderboard displayed on the cabinet between matches. During the show, players kept asking what the highest score was, and not having that visible meant losing a layer of motivation and social competition. Second, I would redesign the wiring harness inside the cabinet. It worked, but servicing a loose connection mid-show required partially disassembling the control panel, which cost about twenty minutes of downtime on day one.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2000/i/P1899182472655985433279845433878/6.jpg" alt="The Omakase at ITP Spring Show" loading="lazy" />
          </div>
        </section>

        {/* Reflections */}
        <section className="cs-section reveal" id="cs-reflections">
          <div className="wrap">
            <p className="cs-section-label">04 &mdash; Reflections</p>
            <h3 className="cs-section-title">Reflections</h3>
            <CsBody>
              <p><strong>Physical feedback changes everything.</strong> The single biggest lesson from this project was how much the RGB LED buttons transformed the play experience. Early prototypes used keyboard input on a laptop, and players constantly lost track of which key mapped to which ingredient. The moment the buttons lit up in their ingredient colors, onboarding time dropped from about 60 seconds of explanation to near-zero. People walked up and started playing. The physicality of the controls &mdash; the satisfying click of an arcade button, the color flashing under your fingers &mdash; created a feedback loop that no screen-only interface could match.</p>
              <p><strong>Design for the line, not just the player.</strong> In an exhibition context, the experience of waiting matters almost as much as the experience of playing. The side-by-side competitive layout meant spectators could see both players&rsquo; hands and the screen simultaneously, turning every match into a performance. This was not planned &mdash; it was a fortunate consequence of the cabinet&rsquo;s form factor &mdash; but it taught me to think about the entire social context of a physical game, not just the two people holding the controls.</p>
              <p><strong>Constraints are generative.</strong> The 90-second round timer, the 8-button limit per player, the requirement to be transportable &mdash; every constraint that felt limiting during design ended up producing a tighter, more focused experience. Without the transport constraint, the cabinet would have been larger and more impressive-looking but impossible to exhibit anywhere outside ITP. Without the button limit, the game would have been more complex but harder to learn. The project reinforced that creative technology work benefits enormously from self-imposed constraints, especially when the goal is public-facing work that needs to be accessible to everyone.</p>
            </CsBody>
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-challenge', label: 'Challenge' },
          { id: 'cs-gameplay', label: 'Gameplay' },
          { id: 'cs-fabrication', label: 'Fabrication' },
          { id: 'cs-exhibition', label: 'Exhibition' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

      <NextProject slug="moniac-machine" title="Moniac Machine" image="/Assets/images/moniac-machine.jpg" />
      <Footer />
    </>
  )
}
