import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsImage from '../../components/case-study/CsImage'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
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
        <meta name="description" content="Brand identity and packaging design for Mentra Live AI smart glasses: logo, color, packaging, booklet, social, ads, and product renders." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mentra Brand & Packaging · Parth Pawar" />
        <meta property="og:description" content="Brand identity & packaging for AI smart glasses shipping at $299." />
        <meta property="og:image" content={`https://designwhich.works${P}/render-both-frames.webp`} />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#00B869' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="brand"
          backLabel="Back to Work"
          tags={['Brand Identity', 'Packaging Design', 'Art Direction', 'Smart Glasses']}
          title="Mentra Brand & Packaging"
          subtitle="Designing the retail, launch, and packaging system that helps new hardware earn trust before first use"
          info={[
            { label: 'Role', value: 'Head of UI/UX — sole designer across all brand surfaces' },
            { label: 'Timeline', value: 'Q3 2025 – Present' },
            { label: 'Scope', value: 'Logo, color, type, packaging, booklet, ads, social, renders' },
            { label: 'Status', value: 'Shipping — in customers\u2019 hands' },
          ]}
          heroImage={`${P}/render-both-frames.webp`}
          heroAlt="Mentra Live smart glasses — black and transparent frame variants"
        />

        <ProjectOverview
          id="cs-overview"
          sections={[
            {
              label: 'The Constraint',
              content: 'Hardware gets judged before it turns on. The box, booklet, renders, and launch surfaces had to make a young company feel reliable next to much bigger incumbents.',
            },
            {
              label: 'My Role',
              content: 'I owned logo, packaging, booklet, creator guide, ad language, renders, and the reusable system behind them.',
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
        <CsImage src={`${P}/packaging-box-black.png`} alt="Mentra Live packaging dieline for the black frame variant, showing product renders, logo placement, QR setup panel, and box structure" />

        {/* ================================================================
            01 — LOGO
            ================================================================ */}
        <CsExpandPreview>
        <CsSection id="cs-logo" label="01 &mdash; Logo" title="Three Elements, One Mark">
          <CsBody>
            <p>The mark had to survive two extremes: 5mm engraving on a glasses temple and large trade-show graphics. Three angled elements form an &ldquo;M&rdquo; that stays legible across engraving, embossing, heat press, and screen print.</p>
            <p>The logomark handles compact placements. The full wordmark handles packaging and marketing. The &ldquo;Powered by MentraOS&rdquo; badge gives third-party makers a compatibility signal.</p>
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
              <div className="cs-img reveal"><img src={`${P}/logo-3d-green.webp`} alt="3D logo: glossy green on white — the primary brand mark rendered as physical object" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/logo-3d-black.webp`} alt="3D logo: glossy black on dark — premium variant for dark contexts" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/logo-3d-iridescent.webp`} alt="3D logo: iridescent blue crystal — exploration for special editions and events" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ================================================================
            02 — COLOR & TYPE
            ================================================================ */}
        <CsSection id="cs-color" label="02 &mdash; Color &amp; Type" title="One Green. No Negotiation.">
          <CsBody>
            <p>Most smart glasses brands default to blue. Mentra needed instant recognition, so the system uses one green, three neutrals, and strict rules for creators using assets without supervision.</p>
          </CsBody>
          {/* Swatches */}
          <div className="cs-brand-swatches" style={{ marginTop: 'var(--space-4)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '0.5rem' }}>
            <div style={{ background: '#00B869', borderRadius: 'var(--radius-md)', padding: '2.5rem 1.5rem', display: 'flex', alignItems: 'flex-end' }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '1rem', fontWeight: 600 }}>Mentra Green</span>
            </div>
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '2.5rem 1rem', display: 'flex', alignItems: 'flex-end', border: '1px solid #e5e5e5' }}>
              <span style={{ color: '#595959', fontFamily: 'var(--font-mono, monospace)', fontSize: '1rem' }}>#FFF</span>
            </div>
            <div style={{ background: '#737373', borderRadius: 'var(--radius-md)', padding: '2.5rem 1rem', display: 'flex', alignItems: 'flex-end' }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '1rem' }}>#737373</span>
            </div>
            <div style={{ background: '#0A0A0A', borderRadius: 'var(--radius-md)', padding: '2.5rem 1rem', display: 'flex', alignItems: 'flex-end' }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '1rem' }}>#0A0A0A</span>
            </div>
          </div>
          <CsBody style={{ marginTop: 'var(--space-5)' }}>
            <p>Red Hat Display gave the brand a useful balance: geometric enough for tech credibility, soft enough for a consumer hardware product.</p>
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
            <p>The box is the first interaction. It needed to feel premium next to better-funded hardware brands without pretending to be them.</p>
            <p>The brand pattern is embossed into white stock. The product name is spaced uppercase for clarity, and &ldquo;Designed on Earth&rdquo; nods to the open-source community behind MentraOS.</p>
          </CsBody>
        </CsSection>

        {/* Both packaging variants */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/packaging-box-black.png`} alt="Black frame packaging: die-cut layout with product renders, brand pattern, QR quickstart, Powered by MentraOS on flap" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/packaging-box-clear-1.webp`} alt="Clear frame packaging: transparent frame renders, same structural layout, different product photography" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Bottom label — the manufacturing precision shot */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label" style={{ marginBottom: 'var(--space-3)' }}>Bottom Label &mdash; Factory Spec</p>
            <div className="cs-img reveal"><img src={`${P}/packaging-box-clear-2.webp`} alt="Bottom label production spec: FCC ID, CE marking, Prop 65 warning, barcode, model number — red measurement annotations for factory" loading="lazy" /></div>
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
            <p>The real test was seeing strangers hold the box on camera. In the thumbnails, the pattern reads, the name is clear, and the case feels premium beside the packaging.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/yt-unboxing-1.webp`} alt="YouTube thumbnail: creator holding Mentra Live box and charging case — UNBOXING MENTRA LIVE" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/yt-unboxing-2.webp`} alt="YouTube thumbnail: creator revealing glasses from box — SMART GLASSES REVEALED" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Text bubble — messaging UI design for marketing */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src={`${P}/text-bubble-1.webp`} alt="Mentra marketing asset: lifestyle photo with text bubble UI overlay showing real-time voice transcription — brand language in product context" loading="lazy" /></div>
          </div>
        </section>

        {/* ── Exploded view ── */}
        <CsImage src={`${P}/render-exploded.webp`} alt="Mentra Live exploded view: every internal component — camera, circuit board, battery, speakers, hinges — laid out in assembly order" />

        {/* ================================================================
            04 — INSTRUCTION BOOKLET
            ================================================================ */}
        <CsSection id="cs-manual" label="04 &mdash; Instruction Booklet" title="No Welcome Message. Just the QR Code.">
          <CsBody>
            <p>The booklet starts with the only thing a new owner needs first: a QR code to pair and go.</p>
            <p>The rest explains buttons, charging, and fit with custom line art that prints cleanly at 65mm and translates better than photography.</p>
          </CsBody>
        </CsSection>

        {/* Booklet spread */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div className="cs-img reveal" style={{ background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-1.webp`} alt="Page 1: QR code and Mentra logo — scan to download app" loading="lazy" /></div>
              <div className="cs-img reveal" style={{ background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-2.webp`} alt="Page 2: Line-art illustration of glasses with intro text" loading="lazy" /></div>
              <div className="cs-img reveal" style={{ background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-3.webp`} alt="Page 3: Hardware at a glance — 9 labeled components" loading="lazy" /></div>
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
              <div className="cs-img reveal" style={{ background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-5.webp`} alt="Page 5: Turn on/off — hand holding glasses at power button" loading="lazy" /></div>
              <div className="cs-img reveal" style={{ background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}><img src={`${P}/booklet-page-9.webp`} alt="Page 9: Charging case — glasses clicking into place" loading="lazy" /></div>
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
              <div className="cs-img reveal"><img src={`${P}/editorial-portrait-1.webp`} alt="Isarelov shoot: model looking right, minimal studio, black frame" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/editorial-portrait-2.webp`} alt="Isarelov shoot: front-facing, Mentra Live as everyday eyewear" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/editorial-portrait-3.webp`} alt="Isarelov shoot: button-up shirt, professional context" loading="lazy" /></div>
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/studio-shot-1.webp`} alt="Studio shoot: dark urban setting, cinematic lighting" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/studio-shot-2.webp`} alt="Studio shoot: product in low-light context" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/studio-shot-3.webp`} alt="Studio shoot: lifestyle, technology in daily use" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Product-in-hand: the real hardware */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}>
              <div className="cs-img reveal"><img src={`${P}/product-hand-front.webp`} alt="Hardware in hand: front view, matte finish visible" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/product-hand-angle.webp`} alt="Hardware in hand: angle, camera module visible" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/product-folded.webp`} alt="Folded glasses from above, hinge detail" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/product-flat.webp`} alt="Glasses flat on white surface, symmetry and proportion" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ================================================================
            06 — SOCIAL & ADS
            ================================================================ */}
        <CsSection id="cs-social" label="06 &mdash; Social &amp; Advertising" title="24 Templates. One System.">
          <CsBody>
            <p>I produced 24 templates across platform sizes and color variants. The logic stayed simple: product anchored left, logo anchored right, text inside safe zones.</p>
          </CsBody>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/cover-twitter-green.png`} alt="Twitter/X cover: green variant" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/cover-linkedin-light.png`} alt="LinkedIn cover: light variant" loading="lazy" /></div>
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="cs-img reveal"><img src={`${P}/cover-youtube-light.webp`} alt="YouTube banner" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/cover-github-light.webp`} alt="GitHub social preview" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/cover-reddit-light.webp`} alt="Reddit banner" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Ads */}
        <section className="cs-section">
          <div className="wrap">
            <h3 className="cs-section-subtitle">Ad Campaign: Through the Lens</h3>
            <CsBody>
              <p>Each ad uses the glasses as a frame: one verb, one human moment through the lens, and the Mentra mark at the bottom.</p>
            </CsBody>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}>
              <div className="cs-img reveal"><img src={`${P}/ad-stream.webp`} alt="Stream Your World — birthday through lens" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/ad-hear.webp`} alt="Hear Your Audio, The World — jogging" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/ad-3.webp`} alt="Shipping Soon — teaser on green" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${P}/ad-4.webp`} alt="Focus — autofocus UI on portrait" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ================================================================
            07 — RENDERS (on dark background for drama)
            ================================================================ */}
        <CsSection id="cs-renders" label="07 &mdash; Product Renders" title="Replacing Photography Entirely">
          <CsBody>
            <p>I directed three render families that became the visual source for packaging, social, press, and the marketing site. Renders gave us consistent product imagery before every physical variant was ready.</p>
          </CsBody>
        </CsSection>

        {/* Dark section for renders */}
        <section className="cs-section reveal" style={{ background: '#0A0A0A', padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
          <div className="wrap">
            <div className="cs-img reveal" style={{ border: 'none', background: 'transparent' }}>
              <img src={`${P}/render-black-camera.webp`} alt="Black frame: camera module macro, Mentra logo on temple" loading="lazy" style={{ borderRadius: 'var(--radius-lg)' }} />
            </div>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="cs-img reveal" style={{ border: 'none', background: 'transparent' }}><img src={`${P}/render-hinge-detail.webp`} alt="Hinge detail: power button, USB-C" loading="lazy" style={{ borderRadius: 'var(--radius-md)' }} /></div>
              <div className="cs-img reveal" style={{ border: 'none', background: 'transparent' }}><img src={`${P}/render-black-temple.webp`} alt="Temple depth-of-field" loading="lazy" style={{ borderRadius: 'var(--radius-md)' }} /></div>
              <div className="cs-img reveal" style={{ border: 'none', background: 'transparent' }}><img src={`${P}/render-black-front.webp`} alt="Front view, dark background" loading="lazy" style={{ borderRadius: 'var(--radius-md)' }} /></div>
            </div>
          </div>
        </section>

        {/* ================================================================
            08 — PHYSICAL DETAILS
            ================================================================ */}
        <CsSection id="cs-details" label="08 &mdash; Physical Details" title="5mm Temple. 4 Revision Rounds.">
          <CsBody>
            <p>The 5mm temple mark, FCC markings, case emboss, and lens cloth all had to become production-ready vector instructions. The work was brand design, but also factory communication.</p>
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

        <CsImage src={`${P}/glasses-flash.webp`} alt="Mentra Live with flash: matte finish, build quality detail" />

        {/* ================================================================
            REFLECTION
            ================================================================ */}
        <CsSection id="cs-reflection" label="Reflection" title="What Hardware Brand Taught Me">
          <CsFeatureGrid features={[
            { title: 'Constraint is the teacher', desc: 'Every medium has a constraint that shapes the work. Screen print can\u2019t do gradients. Laser engraving needs outlined strokes. Embossing needs depth. These aren\u2019t limitations — they\u2019re the brief.' },
            { title: 'Systems survive, artifacts don\u2019t', desc: 'The creator guide matters more than any single ad. A system that 200 people can use independently is worth more than one perfect execution only I can reproduce.' },
            { title: 'Physical feedback is slow and expensive', desc: 'Software A/B tests in hours. A packaging revision takes 6 weeks and costs a factory run. You learn to prototype on paper, argue in vector, and ship with conviction.' },
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

        </CsExpandPreview>

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

      <NextProject slug="tedx" title="TEDxVITPune" image="/Assets/images/tedx.jpg" />
      <Footer />
    </>
  )
}
