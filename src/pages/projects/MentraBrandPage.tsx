import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsImage from '../../components/case-study/CsImage'
import CsSteps from '../../components/case-study/CsSteps'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsCallout from '../../components/case-study/CsCallout'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const IMG = '/Assets/Projects/mentra-brand/photos'

export default function MentraBrandPage() {
  return (
    <>
      <Helmet>
        <title>Mentra Brand &amp; Packaging &middot; Parth Pawar</title>
        <meta name="description" content="End-to-end brand identity and packaging design for Mentra Live AI smart glasses. Logo system, color palette, typography, product packaging, instruction manual, social media assets, and advertising campaigns." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mentra Brand & Packaging · Parth Pawar" />
        <meta property="og:description" content="Brand identity & packaging design for AI smart glasses shipping at $299." />
        <meta property="og:image" content={`https://parthpawar.com${IMG}/render-both-frames.png`} />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#00B869' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="brand"
          backLabel="Back to Work"
          tags={['Brand Identity', 'Packaging Design', 'Art Direction', 'Smart Glasses']}
          title="Mentra Brand & Packaging"
          subtitle="Building the visual identity, packaging system, and brand language for the first AI smart glasses with an open-source OS"
          info={[
            { label: 'Role', value: 'Head of UI/UX, sole designer for all brand touchpoints' },
            { label: 'Timeline', value: 'Q3 2025 – Present (ongoing)' },
            { label: 'Scope', value: 'Logo, color, type, packaging, booklet, ads, social, renders' },
            { label: 'Status', value: 'Shipping — product in customers\u2019 hands' },
          ]}
          heroImage={`${IMG}/render-both-frames.png`}
          heroAlt="Mentra Live smart glasses, black and transparent frame variants floating on dark background"
        />

        <ProjectOverview
          id="cs-overview"
          sections={[
            {
              label: 'The Challenge',
              content: 'Mentra Live is a $299 AI smart glasses product competing with Meta Ray-Ban in a category where brand perception is everything. The product needed a complete visual identity that communicates technology credibility, consumer accessibility, and open-source ethos simultaneously, across digital and physical touchpoints from retail packaging to social media to instruction manuals.',
            },
            {
              label: 'My Role',
              content: 'As the sole designer, I owned every brand surface: logo system, color palette, typography, product packaging (box, labels, charging case graphics, lens cloth, temple markings), instruction booklet, creator guide, social media templates, advertising campaigns, product renders, and the "Powered by MentraOS" badge for third-party partners.',
            },
          ]}
        />

        {/* Hero product render - black frame */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal">
              <img src={`${IMG}/render-black-angle.png`} alt="Mentra Live black frame, three-quarter angle showing camera module and Mentra logo on temple" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Logo System */}
        <CsSection id="cs-logo" label="01 — Logo System" title="A Mark Built from Motion">
          <CsBody>
            <p>The Mentra logo is constructed from three parallelogram elements that suggest forward momentum and upward progression. The smallest square element anchors the composition while the two ascending forms create a dynamic &ldquo;M&rdquo; shape. The geometry is deliberate: each element is a parallelogram at the same angle, producing visual rhythm without complexity.</p>
            <p>Two configurations exist: the logomark alone for compact placements (app icons, temple engravings, watermarks), and the full logo with wordmark for primary brand moments (packaging, marketing, social covers). The wordmark uses a custom-modified geometric sans to match the angular energy of the mark.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal" style={{ background: '#fff', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={`${IMG}/logo.svg`} alt="Mentra logomark: three green parallelogram elements forming an abstract M" style={{ maxWidth: '160px' }} loading="lazy" />
              </div>
              <div className="cs-img reveal" style={{ background: '#fff', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={`${IMG}/logo-wordmark.png`} alt="Mentra logo with wordmark: green logomark plus Mentra text in geometric sans-serif" loading="lazy" />
              </div>
            </div>
          </div>
          <CsImage src={`${IMG}/powered-by-badge.png`} alt="Powered by Mentra badge: green logomark on black rounded rectangle with white text, designed for third-party partner use" />
          <CsBody style={{ marginTop: '1.5rem' }}>
            <p>The &ldquo;Powered by MentraOS&rdquo; badge was designed for the open-source ecosystem. Third-party glasses manufacturers and app developers can use this mark to signal MentraOS compatibility, the same way &ldquo;Powered by Android&rdquo; works for phones. The badge comes in dark and light variants with strict clear-space rules documented in the creator guide.</p>
          </CsBody>
        </CsSection>

        {/* Color & Typography */}
        <CsSection id="cs-color" label="02 — Color &amp; Typography" title="Green Means Go">
          <CsBody>
            <p>The palette is intentionally restrained. Mentra Green (#00B869) is the single primary color, used for key accents, buttons, and moments of emphasis. Everything else lives in neutrals: white, a mid-gray (#737373), and near-black (#0A0A0A). The restraint is strategic. In a product category crowded with blue-tinted &ldquo;tech&rdquo; brands, a single vibrant green creates instant recognition. On packaging, one green element on white reads as premium. On social media, the green pops against any content.</p>
            <p>The creator guide explicitly forbids inventing new brand colors, mixing competing brights with the green, or using low-contrast text. These constraints exist because the brand must survive in the hands of hundreds of creators and developers who will use these assets independently.</p>
          </CsBody>
          <CsInfoGrid items={[
            { key: 'Primary', value: '#00B869 (Mentra Green)' },
            { key: 'White', value: '#FFFFFF' },
            { key: 'Gray', value: '#737373' },
            { key: 'Black', value: '#0A0A0A' },
            { key: 'Typeface', value: 'Red Hat Display' },
            { key: 'Headings', value: 'Bold, 64/48/32px' },
          ]} />
          <CsBody style={{ marginTop: '1.5rem' }}>
            <p>Red Hat Display was selected as the brand typeface: a geometric sans-serif with slightly rounded terminals that softens the tech edge without losing authority. It serves as the single font across all touchpoints, headings through body, following a strict hierarchy: H1 at 64px, H2 at 48px, H3 at 32px, body at 18px. The readability guidelines in the creator guide specify which color combinations pass contrast thresholds on both light and dark backgrounds.</p>
          </CsBody>
        </CsSection>

        {/* Brand pattern */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal">
              <img src={`${IMG}/brand-pattern.png`} alt="Mentra brand pattern: repeating parallelogram elements from the logo forming a subtle geometric texture" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Packaging */}
        <CsSection id="cs-packaging" label="03 — Packaging" title="Every Surface Is a Brand Moment">
          <CsBody>
            <p>The packaging system was designed to ship a $299 consumer electronics product that competes visually with Meta and Apple. The outer box uses the Mentra brand pattern as a subtle embossed texture on white stock, with the product name set in spaced uppercase: MENTRA / LIVE. Two product renders (three-quarter angle and front-facing) are printed directly on the box faces.</p>
            <p>The top flap reads &ldquo;Powered by MentraOS&rdquo; with &ldquo;Designed on Earth,&rdquo; reinforcing the open-source, community-built positioning. The side panel carries the Mentra wordmark vertically, and the opposite side holds a QR code linking to the companion app download. The bottom label contains regulatory information (FCC, CE), California Proposition 65, model number, and barcode, all within a 90.24 &times; 23.95mm label with precise measurement specs for manufacturing.</p>
          </CsBody>
          <CsImage src={`${IMG}/packaging-box-black.png`} alt="Mentra Live product packaging, unfolded box layout showing brand pattern, product renders, QR code, and Powered by MentraOS messaging" />
          <CsBody style={{ marginTop: '1.5rem' }}>
            <p>Two packaging variants were produced: clear frame and black frame, each with tailored product photography on the box. I iterated through seven major versions of the packaging graphics (tracked as V1 through V7), resolving issues from print registration to label sizing to regulatory text placement across manufacturing rounds with the factory team.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Box (2 variants)', desc: 'Clear and black frame packaging with brand pattern, product renders, QR quickstart, and regulatory labeling. Seven iterations to final print-ready files.' },
            { title: 'Bottom Label', desc: 'FCC ID, CE marking, California Prop 65, model number, barcode. Designed at 90.24 x 23.95mm with precise bleed and crop marks for factory.' },
            { title: 'Charging Case', desc: 'Mentra logo engraved on case exterior. Internal alignment guides ensure glasses click into charging position. Graphics designed as vector strokes for engraving.' },
            { title: 'Lens Cloth', desc: '150 x 150mm black microfiber with heat-pressed Mentra logo in Pantone Black 6 UP. Logo positioned at bottom-right corner with exact measurement specs.' },
          ]} />
        </CsSection>

        {/* Exploded render */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal">
              <img src={`${IMG}/render-exploded.png`} alt="Mentra Live transparent frame exploded view showing all internal components: camera module, circuit board, battery, speakers, and frame assembly" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Instruction Manual */}
        <CsSection id="cs-manual" label="04 — Instruction Booklet" title="The First Sixty Seconds in Print">
          <CsBody>
            <p>The instruction booklet is a 65 &times; 88mm multi-page manual that ships inside every box. It follows the same design philosophy as the onboarding flow I designed for the companion app: get the user from unboxing to first interaction as fast as possible.</p>
            <p>Page one is a QR code that downloads the Mentra app. No welcome text, no corporate message, just the action. Subsequent pages use custom line-art illustrations showing hardware callouts (camera, touchpad, microphones, speakers, status LED, charging connector), basic interactions (power on, take a photo, record video), and charging instructions. The illustrations were drawn in a clean technical style using consistent stroke weights, avoiding photographic imagery to keep print costs low and clarity high across languages.</p>
          </CsBody>
          <CsSteps steps={[
            { num: 1, title: 'Quickstart QR', desc: 'First page is a scannable QR code to download the Mentra app. No preamble, just the action to get started.' },
            { num: 2, title: 'Hardware Callouts', desc: 'Line-art diagrams label all nine hardware features: 3 microphones, 2 speakers, status LED, camera, touchpad, flash LED, power button, action button, charger.' },
            { num: 3, title: 'Core Interactions', desc: 'Turn on (3-second hold), take a photo (single press), record video (hold action button), view photos (open Mentra app).' },
            { num: 4, title: 'Charge & Store', desc: 'Click glasses into charging case, close lid. Connect cable to right temple. Red blink = charging, green = full.' },
          ]} />
          <CsBody style={{ marginTop: '1.5rem' }}>
            <p>The booklet went through multiple print-attempt iterations (tracked as attempts 1 through 4) to get sizing, fold marks, and bleed correct for the specific packaging insert dimensions. English and French versions were produced for North American and international shipments.</p>
          </CsBody>
        </CsSection>

        {/* Studio shots */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${IMG}/studio-shot-1.jpg`} alt="Studio portrait: model wearing Mentra Live black frames in urban setting" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${IMG}/studio-shot-2.jpg`} alt="Studio portrait: Mentra Live product photography" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${IMG}/studio-shot-3.jpg`} alt="Studio portrait: Mentra Live lifestyle photography" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Creator Guide & Social */}
        <CsSection id="cs-creator" label="05 — Creator Guide &amp; Social" title="Brand at Scale">
          <CsBody>
            <p>The Creator Reference Deck is a 10-page brand guide designed for content creators, influencers, and partners who produce Mentra content independently. It covers logo usage rules, color application guidelines, typography hierarchy, and provides downloadable product renders and studio shots.</p>
            <p>The guide is opinionated where it matters: logo plus wordmark on intros and thumbnails, logo-only as a small watermark on longer videos, Mentra green for accents but never competing with other brights, and specific readability rules for text overlays on both light and dark backgrounds.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${IMG}/cover-twitter-green.png`} alt="Mentra Twitter cover: transparent frame on green background with Mentra logo and mentraglass.com" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${IMG}/cover-linkedin-light.png`} alt="Mentra LinkedIn cover: light background variant with product and brand elements" loading="lazy" /></div>
            </div>
          </div>
          <CsBody style={{ marginTop: '1.5rem' }}>
            <p>Social media templates were produced for 12 platforms: Twitter, LinkedIn, Facebook, YouTube, Reddit, Discord, and GitHub, each in green and light variants. Every template maintains the same compositional structure: product render on the left, logo on the right, platform-specific safe zones respected. The consistency means Mentra looks like Mentra everywhere a customer discovers it.</p>
          </CsBody>
        </CsSection>

        {/* Advertising */}
        <CsSection id="cs-ads" label="06 — Advertising" title="Show the World Through the Lens">
          <CsBody>
            <p>The ad campaign uses a consistent visual device: lifestyle photography viewed through the lens of the glasses themselves, making the product the literal frame for the story. Each ad pairs a bold action verb (&ldquo;Stream,&rdquo; &ldquo;Hear&rdquo;) with a human moment, positioning the glasses as an enabler rather than a distraction.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${IMG}/ad-stream.png`} alt="Mentra ad: Stream Your World, birthday celebration viewed through glasses lens" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${IMG}/ad-hear.png`} alt="Mentra ad: Hear Your Audio, The World, woman jogging with music playback UI overlay" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${IMG}/ad-3.png`} alt="Mentra ad: Shipping Soon teaser with masked product reveal on green background" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${IMG}/ad-4.png`} alt="Mentra ad: campaign creative" loading="lazy" /></div>
            </div>
          </div>
          <CsCallout style={{ marginTop: '2rem' }}>
            <p>&ldquo;The best brand work disappears. You don&rsquo;t notice the packaging, the manual, the social template. You just feel like the product was made by people who give a damn.&rdquo;</p>
          </CsCallout>
        </CsSection>

        {/* Product Renders */}
        <CsSection id="cs-renders" label="07 — Product Renders" title="Controlled Reality">
          <CsBody>
            <p>I directed the 3D product render library that serves as the single visual source for all marketing, packaging, and social media. Three render families were produced: Black Frames (dramatic dark backgrounds emphasizing camera detail and build quality), Transparent Frames (light backgrounds showing internal components and engineering), and Flex Renders (paired shots showing both variants together).</p>
            <p>The render library replaced the need for repeated product photography and ensures every touchpoint, from a tweet to a retail box, uses pixel-perfect visuals with consistent lighting, angle, and material treatment.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${IMG}/render-black-camera.png`} alt="Mentra Live black frame close-up: camera module detail with Mentra logo on temple, dramatic lighting" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${IMG}/render-black-front.png`} alt="Mentra Live black frame front view on dark background" loading="lazy" /></div>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${IMG}/render-transparent-side.png`} alt="Mentra Live transparent frame side view showing internal circuitry" loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${IMG}/render-transparent-top.png`} alt="Mentra Live transparent frame top-down view" loading="lazy" /></div>
            </div>
          </div>
        </CsSection>

        {/* Temple markings */}
        <CsSection id="cs-details" label="08 — Physical Details" title="The Details You Feel">
          <CsBody>
            <p>Brand design for hardware is not just screens and print. The physical glasses carry design decisions I made: the Mentra logo is engraved on the right temple near the power button. The inner temple carries regulatory markings (FCC ID, model number) designed as a single vector artwork with precise stroke weights for laser engraving. The charging case exterior has the logomark embossed on the lid.</p>
            <p>These details were coordinated directly with the hardware manufacturing team, requiring vector files with exact measurements, stroke-to-fill conversions for different engraving processes, and multiple revision rounds to get the scale right on a 5mm-wide temple arm.</p>
          </CsBody>
          <CsInfoGrid items={[
            { key: 'Temple Logo', value: 'Laser-engraved logomark on right temple' },
            { key: 'Inner Temple', value: 'FCC, model no. in outlined vector strokes' },
            { key: 'Charging Case', value: 'Embossed logomark on case lid' },
            { key: 'Lens Cloth', value: '150mm square, heat-pressed Pantone Black 6' },
            { key: 'Box Pattern', value: 'Parallelogram texture from logo geometry' },
            { key: 'Color Variants', value: 'Black (K900) + Clear (Cali 65)' },
          ]} />
        </CsSection>

        <CsImage src={`${IMG}/product-front.png`} alt="Mentra Live product photograph, front view with real lighting" />

        {/* Process */}
        <CsSection id="cs-process" label="Process" title="From Zero to Retail Shelf">
          <CsBody>
            <p>Building a brand for hardware is fundamentally different from software brand work. Every decision has a physical manufacturing consequence. A color choice becomes a Pantone specification. A logo placement becomes a laser engraving file with stroke weights calibrated to the machine. A box layout becomes a die-cut template with precise fold lines, bleed zones, and registration marks.</p>
            <p>I produced seven major iterations of the packaging graphics alone, each triggered by a manufacturing constraint: label dimensions changed, regulatory text was added, a new frame variant (Cali 65) required a second packaging SKU. The instruction booklet went through four print attempts to get the fold geometry right for the insert cavity. The social templates were produced in bulk (12 platforms &times; 2 color variants = 24 files) to ensure day-one brand consistency at launch.</p>
          </CsBody>
          <CsPullquote
            quote="Hardware brand design is software design with a six-week feedback loop. Every iteration costs money, time, and a factory run. You get it right on paper or you pay for it in plastic."
            cite="Lesson learned"
          />
        </CsSection>

        <CsSection label="Credits" title="Team">
          <CsCredits credits={[
            { role: 'Brand Design & Art Direction', name: 'Parth Pawar' },
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
          { id: 'cs-creator', label: 'Creator Guide' },
          { id: 'cs-ads', label: 'Ads' },
          { id: 'cs-renders', label: 'Renders' },
          { id: 'cs-details', label: 'Details' },
          { id: 'cs-process', label: 'Process' },
        ]} />

      </main>

      <NextProject slug="mentra" title="Mentra" image="/Assets/images/mentra/render-transparent.png" />
      <Footer />
    </>
  )
}
