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
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsPullquote from '../../components/case-study/CsPullquote'
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
          subtitle="End-to-end visual identity for AI smart glasses with an open-source OS — from logo to retail box to the booklet inside it"
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
              label: 'The Constraint',
              content: 'Hardware brand design is irreversible in a way software never is. A color choice becomes a Pantone spec sent to a factory. A logo placement becomes a laser engraving file with stroke weights calibrated to the machine. A box layout becomes a die-cut template with fold lines and bleed zones. Every decision costs money, time, and a manufacturing run — there is no cmd+Z after the print plates are cut.',
            },
            {
              label: 'My Role',
              content: 'As the sole designer at Mentra, I owned every surface the brand touches: logo, color system, typography, product packaging for two SKUs, instruction booklet, creator guide, 24 social media templates, advertising campaigns, and the 3D render library that replaced product photography across all channels.',
            },
          ]}
        />

        <CsStatGrid style={{ marginTop: '-1rem' }} stats={[
          { label: 'Packaging iterations', value: '7' },
          { label: 'Booklet print rounds', value: '4' },
          { label: 'Social templates shipped', value: '24' },
          { label: 'Render families', value: '3' },
        ]} />

        {/* ── Hero render ── */}
        <CsImage src={`${P}/render-transparent-camera.png`} alt="Mentra Live transparent frame close-up: camera module, Mentra logo, internal circuitry visible through clear housing" />

        {/* ================================================================
            01 — LOGO
            ================================================================ */}
        <CsSection id="cs-logo" label="01 &mdash; Logo" title="Three Elements, One Mark">
          <CsBody>
            <p>The mark needed to work at 5mm engraved on a glasses temple AND at billboard scale on a trade show banner. Three parallelogram elements at the same angle: a small square anchor plus two ascending forms that read as an &ldquo;M&rdquo; in motion. The geometry is simple enough to survive any reproduction method &mdash; laser engraving, heat press, emboss, screen print &mdash; without losing legibility.</p>
            <p>The logomark lives alone on compact placements. The full wordmark appears on packaging, marketing, and social. The &ldquo;Powered by MentraOS&rdquo; badge was built for the open-source ecosystem &mdash; third-party manufacturers and developers signal compatibility the way &ldquo;Powered by Android&rdquo; works for phones.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal" style={{ background: '#fff', padding: '4rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e8e8e8' }}>
                <img src={`${P}/logo.svg`} alt="Mentra logomark on white" style={{ maxWidth: '140px' }} loading="lazy" />
              </div>
              <div className="cs-img reveal" style={{ background: '#0A0A0A', padding: '4rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={`${P}/powered-by-badge.png`} alt="Powered by Mentra badge on dark background" style={{ maxWidth: '240px' }} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* 3D logo explorations — the mark as a physical object */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/logo-3d-green.png`} alt="3D logo: glossy green on white — the primary brand mark rendered as physical object" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/logo-3d-black.jpg`} alt="3D logo: glossy black on dark — premium variant for dark contexts" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/logo-3d-iridescent.png`} alt="3D logo: iridescent blue crystal — exploration for special editions and events" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ================================================================
            02 — COLOR & TYPE
            ================================================================ */}
        <CsSection id="cs-color" label="02 &mdash; Color &amp; Type" title="One Green. No Negotiation.">
          <CsBody>
            <p>Every smart glasses brand defaults to blue. Meta, Snap, North, Vuzix &mdash; blue gradient, blue accent, blue halo. Mentra needed to be recognizable in a thumbnail. One green (#00B869), three neutrals, no exceptions. The creator guide explicitly forbids inventing new colors because the brand has to survive in the hands of hundreds of creators who will use these assets unsupervised.</p>
          </CsBody>
          {/* Swatches */}
          <div style={{ marginTop: 'var(--space-4)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '0.5rem' }}>
            <div style={{ background: '#00B869', borderRadius: 'var(--radius-md)', padding: '2.5rem 1.5rem', display: 'flex', alignItems: 'flex-end' }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8rem', fontWeight: 600 }}>Mentra Green</span>
            </div>
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '2.5rem 1rem', display: 'flex', alignItems: 'flex-end', border: '1px solid #e5e5e5' }}>
              <span style={{ color: '#737373', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>#FFF</span>
            </div>
            <div style={{ background: '#737373', borderRadius: 'var(--radius-md)', padding: '2.5rem 1rem', display: 'flex', alignItems: 'flex-end' }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>#737373</span>
            </div>
            <div style={{ background: '#0A0A0A', borderRadius: 'var(--radius-md)', padding: '2.5rem 1rem', display: 'flex', alignItems: 'flex-end' }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>#0A0A0A</span>
            </div>
          </div>
          <CsBody style={{ marginTop: 'var(--space-5)' }}>
            <p>Red Hat Display was selected over Outfit (the other candidate in the brand-assets zip) for its slightly rounded terminals &mdash; geometric enough for tech credibility, soft enough to not feel clinical on a consumer product. One font family, strict hierarchy: 64/48/32/18px.</p>
          </CsBody>
          <div className="cs-label-row" style={{ marginTop: 'var(--space-3)' }}>
            <span className="cs-label-row-key">Typeface</span>
            <span className="cs-label-row-val">Red Hat Display &mdash; geometric sans-serif</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Headings</span>
            <span className="cs-label-row-val">Bold, 64 / 48 / 32 px</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Body</span>
            <span className="cs-label-row-val">Regular, 18 px, line-height 1.6</span>
          </div>
        </CsSection>

        <CsImage src={`${P}/brand-pattern.png`} alt="Mentra brand pattern: repeating parallelogram texture from logo geometry, used as subtle emboss on packaging" />

        {/* ================================================================
            03 — PACKAGING (the centerpiece)
            ================================================================ */}
        <CsSection id="cs-packaging" label="03 &mdash; Packaging" title="Unboxing Is the First Interaction">
          <CsBody>
            <p>A customer picks up the box before they pick up the glasses. That box is competing on a shelf (or in a photo) with Meta Ray-Ban &mdash; a product backed by a trillion-dollar company&rsquo;s design budget. The Mentra box needed to signal premium without faking it.</p>
            <p>The brand pattern is embossed into white stock &mdash; you feel it before you see it. The product name is set in spaced uppercase (MENTRA / LIVE) rather than the wordmark, because at box-scale the wordmark competes with the product renders. The top flap says &ldquo;Designed on Earth&rdquo; &mdash; a nod to the open-source community who builds MentraOS, positioned where Apple puts &ldquo;Designed by Apple in California.&rdquo;</p>
          </CsBody>
        </CsSection>

        {/* Both packaging variants */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/packaging-box-black.png`} alt="Black frame packaging: die-cut layout with product renders, brand pattern, QR quickstart, Powered by MentraOS on flap" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/packaging-box-clear-1.png`} alt="Clear frame packaging: transparent frame renders, same structural layout, different product photography" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Bottom label — the manufacturing precision shot */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label" style={{ marginBottom: 'var(--space-3)' }}>Bottom Label &mdash; Factory Spec</p>
            <div className="cs-img reveal"><img src={`${P}/packaging-box-clear-2.png`} alt="Bottom label production spec: FCC ID, CE marking, Prop 65 warning, barcode, model number — red measurement annotations for factory" loading="lazy" /></div>
          </div>
        </section>

        <section className="cs-section">
          <div className="wrap">
            <CsFeatureGrid features={[
              { title: 'Box (2 SKUs)', desc: 'Clear and black frame variants. Same structural die-cut, different product renders. Seven iterations driven by regulatory text additions and a second frame variant (Cali 65).' },
              { title: 'Bottom Label', desc: '90.24 x 23.95mm. FCC ID, CE, Prop 65, model number, barcode. Designed with factory bleed/crop marks and sent as outlined vector — no font dependencies.' },
              { title: 'Charging Case', desc: 'Logomark engraved on exterior lid. Vector strokes converted from fill to 0.3mm outlines for CNC compatibility at factory.' },
              { title: 'Lens Cloth', desc: '150 x 150mm black microfiber. Heat-pressed logo in Pantone Black 6 UP — subtle enough to look premium, visible enough to reinforce the brand.' },
            ]} />
          </div>
        </section>

        {/* Brand in the wild — YouTubers unboxing the packaging I designed */}
        <CsSection id="cs-wild" label="In the Wild" title="The Packaging, Unboxed by Strangers">
          <CsBody>
            <p>The real test of packaging design is watching someone who had no part in making it hold it up to a camera. These YouTube thumbnails show creators unboxing Mentra Live &mdash; the box I designed, the case I designed, the booklet I designed &mdash; all in the hands of people I&rsquo;ve never met. The brand pattern is visible. The product name reads. The case looks premium next to the box. It works.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/yt-unboxing-1.jpg`} alt="YouTube thumbnail: creator holding Mentra Live box and charging case — UNBOXING MENTRA LIVE" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/yt-unboxing-2.jpg`} alt="YouTube thumbnail: creator revealing glasses from box — SMART GLASSES REVEALED" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Text bubble — messaging UI design for marketing */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src={`${P}/text-bubble-1.jpg`} alt="Mentra marketing asset: lifestyle photo with text bubble UI overlay showing real-time voice transcription — brand language in product context" loading="lazy" /></div>
          </div>
        </section>

        {/* ── Exploded view ── */}
        <CsImage src={`${P}/render-exploded.png`} alt="Mentra Live exploded view: every internal component — camera, circuit board, battery, speakers, hinges — laid out in assembly order" />

        {/* ================================================================
            04 — INSTRUCTION BOOKLET
            ================================================================ */}
        <CsSection id="cs-manual" label="04 &mdash; Instruction Booklet" title="No Welcome Message. Just the QR Code.">
          <CsBody>
            <p>The booklet design started from a question: what does someone do the instant they open the box? They want to use the glasses. Not read a welcome letter, not browse safety warnings, not admire the typography. They want to pair and go.</p>
            <p>Page one is a QR code. Nothing else. Scan it, download the app, you&rsquo;re connected. The rest of the booklet exists for the person who puts the glasses down and thinks &ldquo;wait, which button does what?&rdquo; Every page uses custom line-art illustrations &mdash; no photography, because line art prints cleanly at 65mm width, costs less, and translates across languages without cultural assumptions.</p>
          </CsBody>
        </CsSection>

        {/* Booklet spread */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div className="cs-img reveal" style={{ background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-1.png`} alt="Page 1: QR code and Mentra logo — scan to download app" loading="lazy" /></div>
              <div className="cs-img reveal" style={{ background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-2.png`} alt="Page 2: Line-art illustration of glasses with intro text" loading="lazy" /></div>
              <div className="cs-img reveal" style={{ background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-3.png`} alt="Page 3: Hardware at a glance — 9 labeled components" loading="lazy" /></div>
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
              <div className="cs-img reveal" style={{ background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-5.png`} alt="Page 5: Turn on/off — hand holding glasses at power button" loading="lazy" /></div>
              <div className="cs-img reveal" style={{ background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-9.png`} alt="Page 9: Charging case — glasses clicking into place" loading="lazy" /></div>
            </div>
          </div>
        </section>

        <section className="cs-section">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">Size</span>
              <span className="cs-label-row-val">65 &times; 88 mm &mdash; designed to fit the packaging insert cavity exactly</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Illustration style</span>
              <span className="cs-label-row-val">Line-art, uniform stroke weight, no photography, no color</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Languages</span>
              <span className="cs-label-row-val">English + French (separate print runs)</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Print iterations</span>
              <span className="cs-label-row-val">4 rounds &mdash; fold geometry kept breaking at the spine</span>
            </div>
          </div>
        </section>

        {/* ── Editorial portraits with context ── */}
        <CsSection id="cs-photography" label="05 &mdash; Photography" title="Two Shoots, Two Stories">
          <CsBody>
            <p>The Isarelov shoot (February 2026) produced editorial portraits: clean backgrounds, minimal styling, the glasses as everyday eyewear. The studio shoot produced lifestyle context: dark environments, cinematic lighting, the glasses as technology. Both libraries feed the creator guide and social templates.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/editorial-portrait-1.jpg`} alt="Isarelov shoot: model looking right, minimal studio, black frame" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/editorial-portrait-2.jpg`} alt="Isarelov shoot: front-facing, Mentra Live as everyday eyewear" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/editorial-portrait-3.jpg`} alt="Isarelov shoot: button-up shirt, professional context" loading="lazy" /></div>
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/studio-shot-1.jpg`} alt="Studio shoot: dark urban setting, cinematic lighting" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/studio-shot-2.jpg`} alt="Studio shoot: product in low-light context" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/studio-shot-3.jpg`} alt="Studio shoot: lifestyle, technology in daily use" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Product-in-hand: the real hardware */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}>
              <div className="cs-img reveal"><img src={`${P}/product-hand-front.jpg`} alt="Hardware in hand: front view, matte finish visible" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/product-hand-angle.jpg`} alt="Hardware in hand: angle, camera module visible" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/product-folded.jpg`} alt="Folded glasses from above, hinge detail" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/product-flat.jpg`} alt="Glasses flat on white surface, symmetry and proportion" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ================================================================
            06 — SOCIAL & ADS
            ================================================================ */}
        <CsSection id="cs-social" label="06 &mdash; Social &amp; Advertising" title="24 Templates. One System.">
          <CsBody>
            <p>Every platform has different dimensions, safe zones, and cropping behavior. I produced 24 templates (12 platforms &times; 2 color variants) with identical compositional logic: product render anchored left, logo anchored right, text in the safe zone. A creator in Tokyo and a partner in Berlin open the same Google Drive folder and produce on-brand content without a phone call.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/cover-twitter-green.png`} alt="Twitter/X cover: green variant" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/cover-linkedin-light.png`} alt="LinkedIn cover: light variant" loading="lazy" /></div>
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/cover-youtube-light.png`} alt="YouTube banner" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/cover-github-light.png`} alt="GitHub social preview" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/cover-reddit-light.png`} alt="Reddit banner" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Ads */}
        <section className="cs-section">
          <div className="wrap">
            <h3 className="cs-section-subtitle">Ad Campaign: Through the Lens</h3>
            <CsBody>
              <p>Each ad uses the glasses as a literal frame for the story. A bold verb (&ldquo;Stream,&rdquo; &ldquo;Hear,&rdquo; &ldquo;Focus&rdquo;), a human moment visible through the lens, the Mentra logo at the bottom. The constraint was that ads had to work as both static social posts and print &mdash; no animation dependency.</p>
            </CsBody>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}>
              <div className="cs-img reveal"><img src={`${P}/ad-stream.jpg`} alt="Stream Your World — birthday through lens" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/ad-hear.jpg`} alt="Hear Your Audio, The World — jogging" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/ad-3.jpg`} alt="Shipping Soon — teaser on green" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/ad-4.jpg`} alt="Focus — autofocus UI on portrait" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ================================================================
            07 — RENDERS (on dark background for drama)
            ================================================================ */}
        <CsSection id="cs-renders" label="07 &mdash; Product Renders" title="Replacing Photography Entirely">
          <CsBody>
            <p>A product photo requires a photographer, a studio, and a prototype that might not exist yet. A render requires a 3D file and a lighting setup that never changes. I directed three render families that became the single visual source across packaging, social, press, and the marketing site. No product was photographed for any marketing material &mdash; everything is rendered.</p>
          </CsBody>
        </CsSection>

        {/* Dark section for renders */}
        <section className="cs-section reveal" style={{ background: '#0A0A0A', padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
          <div className="wrap">
            <div className="cs-img reveal" style={{ border: 'none', background: 'transparent' }}>
              <img src={`${P}/render-black-camera.jpg`} alt="Black frame: camera module macro, Mentra logo on temple" loading="lazy" style={{ borderRadius: 'var(--radius-lg)' }} />
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="cs-img reveal" style={{ border: 'none', background: 'transparent' }}><img src={`${P}/render-hinge-detail.jpg`} alt="Hinge detail: power button, USB-C" loading="lazy" style={{ borderRadius: 'var(--radius-md)' }} /></div>
              <div className="cs-img reveal" style={{ border: 'none', background: 'transparent' }}><img src={`${P}/render-black-temple.jpg`} alt="Temple depth-of-field" loading="lazy" style={{ borderRadius: 'var(--radius-md)' }} /></div>
              <div className="cs-img reveal" style={{ border: 'none', background: 'transparent' }}><img src={`${P}/render-black-front.jpg`} alt="Front view, dark background" loading="lazy" style={{ borderRadius: 'var(--radius-md)' }} /></div>
            </div>
          </div>
        </section>

        <CsImage src={`${P}/render-transparent-full.png`} alt="Transparent frame render: internal circuit boards, camera module, FCC markings visible through clear housing" />

        {/* ================================================================
            08 — PHYSICAL DETAILS
            ================================================================ */}
        <CsSection id="cs-details" label="08 &mdash; Physical Details" title="5mm Temple. 4 Revision Rounds.">
          <CsBody>
            <p>The Mentra logo engraved on the right temple is 5mm wide. Getting it right required converting the logo from filled shapes to outlined strokes at exactly 0.3mm weight for the engraving machine, then testing at actual scale on sample temples from the factory. The inner temple carries FCC and model markings &mdash; designed as a single vector artwork so no text needs to be typeset at the factory. The charging case lid has the logomark embossed, not printed, because embossing survives pocket wear.</p>
          </CsBody>
          <CsInfoGrid items={[
            { key: 'Temple Logo', value: 'Laser-engraved, 0.3mm stroke outlines' },
            { key: 'Inner Temple', value: 'FCC + model no., single vector artwork' },
            { key: 'Case Lid', value: 'Embossed logomark (not printed)' },
            { key: 'Lens Cloth', value: '150mm, Pantone Black 6 heat press' },
            { key: 'Box Pattern', value: 'Embossed parallelogram texture' },
            { key: 'Frame Variants', value: 'Black (K900) + Clear (Cali 65)' },
          ]} />
        </CsSection>

        <CsImage src={`${P}/glasses-flash.jpg`} alt="Mentra Live with flash: matte finish, build quality detail" />

        {/* ================================================================
            REFLECTION
            ================================================================ */}
        <CsSection id="cs-reflection" label="Reflection" title="What Hardware Brand Taught Me">
          <CsFeatureGrid features={[
            { title: 'Constraint is the teacher', desc: 'Every medium has a constraint that shapes the work. Screen print can\u2019t do gradients. Laser engraving needs outlined strokes. Embossing needs depth. These aren\u2019t limitations — they\u2019re the brief.' },
            { title: 'Systems survive, artifacts don\u2019t', desc: 'The creator guide matters more than any single ad. A system that 200 people can use independently is worth more than one perfect execution only I can reproduce.' },
            { title: 'Physical feedback is slow and expensive', desc: 'Software A/B tests in hours. A packaging revision takes 6 weeks and costs a factory run. You learn to prototype on paper, argue in vector, and ship with conviction.' },
          ]} />
          <CsPullquote
            quote="The best brand work disappears. You don&rsquo;t notice the packaging or the manual or the social template. You just feel like the product was made by people who give a damn."
            cite="What I\u2019m aiming for"
          />
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
          { id: 'cs-wild', label: 'In the Wild' },
          { id: 'cs-manual', label: 'Booklet' },
          { id: 'cs-photography', label: 'Photography' },
          { id: 'cs-social', label: 'Social & Ads' },
          { id: 'cs-renders', label: 'Renders' },
          { id: 'cs-details', label: 'Details' },
          { id: 'cs-reflection', label: 'Reflection' },
        ]} />

      </main>

      <NextProject slug="tedx" title="TEDxVITPune" image="/Assets/images/tedx.png" />
      <Footer />
    </>
  )
}
