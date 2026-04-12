import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsImage from '../../components/case-study/CsImage'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsCallout from '../../components/case-study/CsCallout'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const P = '/Assets/Projects/mentra-brand/photos'

export default function MentraBrandPage() {
  return (
    <>
      <Helmet>
        <title>Mentra Brand &amp; Packaging &middot; Parth Pawar</title>
        <meta name="description" content="End-to-end brand identity and packaging design for Mentra Live AI smart glasses — logo, color, packaging, booklet, social, ads, and product renders." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mentra Brand & Packaging · Parth Pawar" />
        <meta property="og:description" content="Brand identity & packaging for AI smart glasses shipping at $299." />
        <meta property="og:image" content={`https://parthpawar.com${P}/render-both-frames.jpg`} />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#00B869' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="brand"
          backLabel="Back to Work"
          tags={['Brand Identity', 'Packaging Design', 'Art Direction', 'Smart Glasses']}
          title="Mentra Brand & Packaging"
          subtitle="End-to-end visual identity for the first AI smart glasses with an open-source OS — from logo to retail box to the booklet inside it"
          info={[
            { label: 'Role', value: 'Head of UI/UX — sole designer across all brand surfaces' },
            { label: 'Timeline', value: 'Q3 2025 – Present' },
            { label: 'Scope', value: 'Logo, color, type, packaging, booklet, ads, social, renders' },
            { label: 'Status', value: 'Shipping — in customers\u2019 hands' },
          ]}
          heroImage={`${P}/render-both-frames.jpg`}
          heroAlt="Mentra Live smart glasses — black and transparent frame variants"
        />

        <ProjectOverview
          id="cs-overview"
          sections={[
            {
              label: 'The Challenge',
              content: 'A $299 AI smart glasses product competing with Meta Ray-Ban needed a brand that communicates technology credibility, consumer accessibility, and open-source ethos across every touchpoint — from the retail box to the lens cloth inside it.',
            },
            {
              label: 'My Role',
              content: 'As the sole designer, I owned every brand surface: logo system, color palette, typography, product packaging, instruction booklet, creator guide, social media templates, advertising campaigns, product render library, and the "Powered by MentraOS" badge for third-party partners.',
            },
          ]}
        />

        {/* ── Hero: transparent camera close-up ── */}
        <CsImage src={`${P}/render-transparent-camera.png`} alt="Mentra Live transparent frame close-up showing camera module, Mentra logo, and internal circuitry" />

        {/* ================================================================
            01 — LOGO
            ================================================================ */}
        <CsSection id="cs-logo" label="01 &mdash; Logo" title="Three Elements, One Mark">
          <CsBody>
            <p>The Mentra logo is three parallelogram elements at the same angle: a small square anchor and two ascending forms that produce a dynamic &ldquo;M.&rdquo; Two configurations exist &mdash; logomark alone for compact placements (app icons, temple engravings, watermarks), and full logo with wordmark for primary brand moments (packaging, marketing, social covers).</p>
          </CsBody>
        </CsSection>

        {/* Logo: white vs dark context */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal" style={{ background: '#fff', padding: '4rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e8e8e8' }}>
                <img src={`${P}/logo.svg`} alt="Mentra logomark on white: three green parallelogram elements" style={{ maxWidth: '140px' }} loading="lazy" />
              </div>
              <div className="cs-img reveal" style={{ background: '#0A0A0A', padding: '4rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={`${P}/powered-by-badge.png`} alt="Powered by Mentra badge: green logomark on dark background" style={{ maxWidth: '240px' }} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            02 — COLOR & TYPE
            ================================================================ */}
        <CsSection id="cs-color" label="02 &mdash; Color &amp; Type" title="Green Means Go">
          <CsBody>
            <p>One primary color. Three neutrals. In a category crowded with blue-tinted &ldquo;tech&rdquo; brands, a single vibrant green creates instant recognition. The creator guide forbids inventing new brand colors or mixing competing brights &mdash; because the brand must survive in the hands of hundreds of creators and developers.</p>
          </CsBody>
          {/* Rendered color swatches */}
          <div style={{ marginTop: 'var(--space-4)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '0.5rem' }}>
            <div style={{ background: '#00B869', borderRadius: 'var(--radius-md)', padding: '2.5rem 1.5rem', display: 'flex', alignItems: 'flex-end' }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8rem', fontWeight: 600 }}>#00B869</span>
            </div>
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '2.5rem 1rem', display: 'flex', alignItems: 'flex-end', border: '1px solid #e5e5e5' }}>
              <span style={{ color: '#737373', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>#FFFFFF</span>
            </div>
            <div style={{ background: '#737373', borderRadius: 'var(--radius-md)', padding: '2.5rem 1rem', display: 'flex', alignItems: 'flex-end' }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>#737373</span>
            </div>
            <div style={{ background: '#0A0A0A', borderRadius: 'var(--radius-md)', padding: '2.5rem 1rem', display: 'flex', alignItems: 'flex-end' }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>#0A0A0A</span>
            </div>
          </div>
          <div className="cs-label-row" style={{ marginTop: 'var(--space-4)' }}>
            <span className="cs-label-row-key">Typeface</span>
            <span className="cs-label-row-val">Red Hat Display &mdash; geometric sans-serif, rounded terminals</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Headings</span>
            <span className="cs-label-row-val">Bold &mdash; 64 / 48 / 32 px, line-height 1.1</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Body</span>
            <span className="cs-label-row-val">Regular &mdash; 18 px, line-height 1.6</span>
          </div>
        </CsSection>

        {/* Brand pattern full-bleed */}
        <CsImage src={`${P}/brand-pattern.png`} alt="Mentra brand pattern: repeating parallelogram texture derived from logo geometry" />

        {/* ================================================================
            03 — PACKAGING
            ================================================================ */}
        <CsSection id="cs-packaging" label="03 &mdash; Packaging" title="Every Surface Is a Brand Moment">
          <CsBody>
            <p>The packaging ships a $299 consumer electronics product that competes visually with Meta and Apple. The outer box uses the brand pattern as embossed texture on white stock. The top flap reads &ldquo;Powered by MentraOS / Designed on Earth.&rdquo; Two SKUs were produced &mdash; clear frame and black frame &mdash; each with tailored product renders on the box faces.</p>
          </CsBody>
        </CsSection>

        {/* Packaging: both variants side by side */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/packaging-box-black.png`} alt="Mentra Live black frame packaging — unfolded box with brand pattern, product renders, QR quickstart" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/packaging-box-clear-1.png`} alt="Mentra Live clear frame packaging — transparent frame renders on white box with Powered by MentraOS" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Bottom label spec */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src={`${P}/packaging-box-clear-2.png`} alt="Packaging bottom label: FCC ID, CE marking, Prop 65, model number, barcode — with factory measurement annotations in red" loading="lazy" /></div>
          </div>
        </section>

        {/* Packaging deliverables breakdown */}
        <section className="cs-section reveal">
          <div className="wrap">
            <CsFeatureGrid features={[
              { title: 'Box (2 SKUs)', desc: 'Clear and black frame. Brand pattern, product renders, QR quickstart, regulatory label. Seven iterations to final print-ready files.' },
              { title: 'Bottom Label', desc: 'FCC ID, CE marking, Prop 65, model number, barcode. 90.24 x 23.95mm with precise bleed and crop marks.' },
              { title: 'Charging Case', desc: 'Mentra logo engraved on exterior. Vector strokes calibrated for CNC engraving at factory tolerances.' },
              { title: 'Lens Cloth', desc: '150 x 150mm black microfiber. Heat-pressed Mentra logo in Pantone Black 6 UP. Positioned bottom-right.' },
            ]} />
          </div>
        </section>

        {/* Lens cloth spec */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src={`${P}/lenscloth-1.png`} alt="Lens cloth production spec: 150mm square black microfiber with Mentra logo placement and measurement annotations" loading="lazy" /></div>
          </div>
        </section>

        {/* ── Exploded view breaker ── */}
        <CsImage src={`${P}/render-exploded.png`} alt="Mentra Live transparent frame exploded view — camera module, circuit board, battery, speakers, frame assembly" />

        {/* ================================================================
            04 — INSTRUCTION BOOKLET
            ================================================================ */}
        <CsSection id="cs-manual" label="04 &mdash; Instruction Booklet" title="The First Sixty Seconds in Print">
          <CsBody>
            <p>A 65 &times; 88mm multi-page manual ships inside every box. Page one is a QR code that downloads the Mentra app &mdash; no welcome text, no corporate message, just the action. Every subsequent page uses custom line-art illustrations with consistent stroke weights, avoiding photographic imagery to keep print costs low and clarity high across languages.</p>
          </CsBody>
        </CsSection>

        {/* Booklet page spread — 5 pages in a 3+2 grid */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div className="cs-img reveal" style={{ background: '#f7f7f7', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-1.png`} alt="Booklet p.1: QR quickstart — scan to download Mentra app" loading="lazy" /></div>
              <div className="cs-img reveal" style={{ background: '#f7f7f7', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-2.png`} alt="Booklet p.2: Intro to Mentra — line-art glasses illustration with product overview" loading="lazy" /></div>
              <div className="cs-img reveal" style={{ background: '#f7f7f7', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-3.png`} alt="Booklet p.3: Hardware at a glance — labeled diagram of 3 microphones, 2 speakers, status LED" loading="lazy" /></div>
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
              <div className="cs-img reveal" style={{ background: '#f7f7f7', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-5.png`} alt="Booklet p.5: Turn on/off — hand illustration with power button instructions" loading="lazy" /></div>
              <div className="cs-img reveal" style={{ background: '#f7f7f7', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-9.png`} alt="Booklet p.9: Store and charge — charging case illustration with click-in-place instructions" loading="lazy" /></div>
            </div>
          </div>
        </section>

        <section className="cs-section">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">Size</span>
              <span className="cs-label-row-val">65 &times; 88 mm (fits packaging insert cavity)</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Pages</span>
              <span className="cs-label-row-val">10 (QR quickstart, hardware diagrams, interactions, charging)</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Languages</span>
              <span className="cs-label-row-val">English, French</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Illustrations</span>
              <span className="cs-label-row-val">Custom line-art, uniform stroke weight, no photography</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Print iterations</span>
              <span className="cs-label-row-val">4 rounds to match fold geometry and insert cavity</span>
            </div>
          </div>
        </section>

        {/* ── Editorial portrait breaker ── */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/editorial-portrait-1.jpg`} alt="Editorial: model wearing Mentra Live, minimal studio lighting, looking right" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/editorial-portrait-2.jpg`} alt="Editorial: front-facing portrait, Mentra Live as everyday eyewear" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/editorial-portrait-3.jpg`} alt="Editorial: button-up shirt, three-quarter view, professional context" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ================================================================
            05 — SOCIAL & CREATOR GUIDE
            ================================================================ */}
        <CsSection id="cs-social" label="05 &mdash; Social &amp; Creator Guide" title="Brand at Scale">
          <CsBody>
            <p>The Creator Reference Deck is a 10-page brand guide for content creators, influencers, and partners. It documents logo usage rules, color guidelines, typography hierarchy, and readability constraints. Social media templates were produced for 12 platforms in 2 color variants &mdash; 24 files to ensure brand consistency from day one.</p>
          </CsBody>
        </CsSection>

        {/* Social covers — stacked grids showing the system */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/cover-twitter-green.png`} alt="Twitter cover: transparent frame on Mentra green background" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/cover-linkedin-light.png`} alt="LinkedIn cover: light background variant" loading="lazy" /></div>
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/cover-youtube-light.png`} alt="YouTube cover" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/cover-github-light.png`} alt="GitHub cover" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/cover-reddit-light.png`} alt="Reddit cover" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ================================================================
            06 — ADVERTISING
            ================================================================ */}
        <CsSection id="cs-ads" label="06 &mdash; Advertising" title="Through the Lens">
          <CsBody>
            <p>The ad campaign uses a consistent visual device: lifestyle photography viewed through the lens of the glasses, making the product the literal frame for the story. Each ad pairs a bold action verb (&ldquo;Stream,&rdquo; &ldquo;Hear,&rdquo; &ldquo;Focus&rdquo;) with a human moment.</p>
          </CsBody>
        </CsSection>

        {/* Ads — 2x2 */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/ad-stream.jpg`} alt="Ad: Stream Your World — birthday celebration seen through lens" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/ad-hear.jpg`} alt="Ad: Hear Your Audio, The World — jogging with music UI" loading="lazy" /></div>
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/ad-3.jpg`} alt="Ad: Shipping Soon — product reveal teaser on green" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/ad-4.jpg`} alt="Ad: Focus — camera autofocus UI overlay on portrait" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── Product-in-hand breaker ── */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}>
              <div className="cs-img reveal"><img src={`${P}/product-hand-front.jpg`} alt="Product in hand: front view" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/product-hand-angle.jpg`} alt="Product in hand: angle view" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/product-folded.jpg`} alt="Product folded, top-down" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/product-flat.jpg`} alt="Product flat on white surface" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ================================================================
            07 — PRODUCT RENDERS
            ================================================================ */}
        <CsSection id="cs-renders" label="07 &mdash; Product Renders" title="The Visual Source of Truth">
          <CsBody>
            <p>I directed the 3D product render library: the single visual source across all marketing, packaging, and social. Three families were produced &mdash; Black Frames (dramatic lighting, build quality emphasis), Transparent Frames (internal components visible), and Flex Renders (both variants paired). The library replaced repeated product photography entirely.</p>
          </CsBody>
        </CsSection>

        {/* Render gallery — full-width hero + 3-col details */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal">
              <img src={`${P}/render-black-camera.jpg`} alt="Black frame close-up: camera module detail, Mentra logo on temple, dramatic dark lighting" loading="lazy" />
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/render-hinge-detail.jpg`} alt="Temple hinge: power button, USB-C port, internal mechanism" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/render-black-temple.jpg`} alt="Black frame depth-of-field temple shot" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/render-black-front.jpg`} alt="Black frame front view, dark background" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Full-bleed transparent render */}
        <CsImage src={`${P}/render-transparent-full.png`} alt="Mentra Live transparent frame, three-quarter angle showing internal circuit boards and camera" />

        {/* ── Studio lifestyle breaker ── */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/studio-shot-1.jpg`} alt="Studio: model wearing Mentra Live, dark urban setting" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/studio-shot-2.jpg`} alt="Studio: product in context" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/studio-shot-3.jpg`} alt="Studio: lifestyle context" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ================================================================
            08 — PHYSICAL DETAILS
            ================================================================ */}
        <CsSection id="cs-details" label="08 &mdash; Physical Details" title="The Details You Feel">
          <CsBody>
            <p>Brand design for hardware goes beyond screens. The physical glasses carry design decisions I made: logo engraved on the right temple, inner temple regulatory markings designed as vector artwork with stroke weights calibrated for laser engraving, charging case with embossed logomark. These details were coordinated directly with the hardware team &mdash; multiple revision rounds to get the scale right on a 5mm-wide temple arm.</p>
          </CsBody>
          <CsInfoGrid items={[
            { key: 'Temple Logo', value: 'Laser-engraved logomark, right temple' },
            { key: 'Inner Temple', value: 'FCC, model no. — outlined vector strokes' },
            { key: 'Charging Case', value: 'Embossed logomark on lid' },
            { key: 'Lens Cloth', value: '150mm, heat-pressed Pantone Black 6' },
            { key: 'Box Pattern', value: 'Parallelogram texture from logo geometry' },
            { key: 'Frame Variants', value: 'Black (K900) + Clear (Cali 65)' },
          ]} />
        </CsSection>

        {/* Full-bleed product photo closer */}
        <CsImage src={`${P}/glasses-flash.jpg`} alt="Mentra Live product photograph with flash, matte black finish detail" />

        {/* ================================================================
            PROCESS + IMPACT
            ================================================================ */}
        <CsSection id="cs-process" label="Process" title="From Zero to Retail Shelf">
          <CsBody>
            <p>Hardware brand design is fundamentally different from software work. A color choice becomes a Pantone spec. A logo placement becomes a laser engraving file calibrated to the machine. A box layout becomes a die-cut template with fold lines, bleed zones, and registration marks.</p>
          </CsBody>
          <CsStatGrid stats={[
            { label: 'Packaging versions', value: '7' },
            { label: 'Booklet print rounds', value: '4' },
            { label: 'Social templates', value: '24' },
            { label: 'Render families', value: '3' },
          ]} />
          <CsCallout style={{ marginTop: '2rem' }}>
            <p>Hardware brand design is software design with a six-week feedback loop. Every iteration costs money, time, and a factory run. You get it right on paper or you pay for it in plastic.</p>
          </CsCallout>
          <CsFeatureGrid features={[
            { title: '7 packaging versions', desc: 'Label dimension changes, regulatory text additions, second frame variant (Cali 65) — each triggered a full revision cycle with factory.' },
            { title: '4 booklet print attempts', desc: 'Fold geometry, bleed margins, insert cavity fit. English and French versions for North American and international shipments.' },
            { title: '24 social templates', desc: '12 platforms, 2 color variants each. Consistent structure: product left, logo right, platform-specific safe zones respected.' },
            { title: '3 render families', desc: 'Black Frames, Transparent Frames, Flex Renders. Single visual source across all marketing, packaging, and press.' },
          ]} />
        </CsSection>

        <CsSection label="Credits" title="Team">
          <CsCredits credits={[
            { role: 'Brand & Art Direction', name: 'Parth Pawar' },
            { role: 'Company', name: 'Mentra Glass' },
            { role: 'Tools', name: 'Illustrator, Figma, Blender' },
            { role: 'Deliverables', name: 'Logo, packaging, booklet, ads, social, renders, creator guide' },
          ]} />
        </CsSection>

        <CsThanks contactCta style={{ marginTop: '4rem' }} />

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-logo', label: 'Logo' },
          { id: 'cs-color', label: 'Color & Type' },
          { id: 'cs-packaging', label: 'Packaging' },
          { id: 'cs-manual', label: 'Booklet' },
          { id: 'cs-social', label: 'Social' },
          { id: 'cs-ads', label: 'Ads' },
          { id: 'cs-renders', label: 'Renders' },
          { id: 'cs-details', label: 'Details' },
          { id: 'cs-process', label: 'Process' },
        ]} />

      </main>

      <NextProject slug="tedx" title="TEDxVITPune" image="/Assets/images/tedx.png" />
      <Footer />
    </>
  )
}
