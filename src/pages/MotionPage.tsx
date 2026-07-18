import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import ProjectHeader from '../components/case-study/ProjectHeader'
import ProjectOverview from '../components/case-study/ProjectOverview'
import CsSection from '../components/case-study/CsSection'
import CsBody from '../components/case-study/CsBody'
import CsInfoGrid from '../components/case-study/CsInfoGrid'
import CsSteps from '../components/case-study/CsSteps'
import NextProject from '../components/case-study/NextProject'
import BottomNav from '../components/case-study/BottomNav'
import EditingMotionCaseStudy from './EditingMotionCaseStudy'
import transfiMotion from '../../Assets/Projects/cover/Transfi.gif'
import '../styles/motion.css'

type ProjectKey = 'vishwa' | 'mentra' | 'transfi' | 'editorial'

type MotionProject = {
  key: ProjectKey
  path: string
  title: string
  cardTitle: string
  descriptor: string
  discipline: string
  year: string
  color: string
  categorySlug: string
  heroImage: string
  heroAlt: string
  intro: string
  truthNote: string
  challenge: string
  move: string
  outcome: string
  roles: string[]
  storyTitle: string
  artTitle: string
  artNote: string
  beats: Array<{ time: string; title: string; body: string }>
  principles: Array<{ label: string; value: string }>
  frames: Array<{ src: string; alt: string; caption: string; fit?: 'cover' | 'contain' }>
  decisions: Array<{ removed: string; kept: string; reason: string }>
  aeBuild: Array<{ layer: string; technique: string; purpose: string }>
  deliveries: Array<{ key: string; value: string }>
  outputs: string[]
}

const projects: MotionProject[] = [
  {
    key: 'vishwa',
    path: 'vishwa-conclave-motion',
    title: 'VishwaConclave — A Campaign System in Motion',
    cardTitle: 'VishwaConclave: An event identity in motion',
    descriptor: 'Creative direction for a student-led conference campaign, connecting theme films, speaker reveals, web, merchandise, and event programming into one launch rhythm.',
    discipline: 'Creative direction / Campaign motion',
    year: '2020–21',
    color: '#b14cff',
    categorySlug: 'brand-visual',
    heroImage: '/Assets/mockups/projects/vishwaconclave_16x9.webp',
    heroAlt: 'VishwaConclave campaign identity shown across event and social applications',
    intro: 'One annual theme, released as a sequence—not a single poster.',
    truthNote: 'I worked with VishwaConclave from December 2019 through May 2021, growing from junior designer to Creative Director. The 2020–21 campaign films and posts shown here come from the official VishwaConclave archive. My scope covered creative direction, campaign system, social, web, and video production with a wider student team. Where a specialist partner executed a film, that credit is shown. The 2022–23 clips are included only as post-tenure archive references.',
    challenge: 'An abstract annual theme had to become understandable before the event—and stay recognizable through weeks of speaker announcements, website and merchandise releases, reminders, countdowns, and live-programming content.',
    move: 'Treat the campaign as an editorial sequence. Begin with intrigue, reveal the theme through dimensional type and camera movement, then move from atmosphere to proof: speakers, site, schedule, experience, and registration.',
    outcome: 'The identity could change pace without losing its voice: cinematic for the theme, editorial for speakers, direct for conversion, and energetic near the event. Motion became the connective tissue between each release.',
    roles: ['Creative direction', 'Campaign system', 'Storyboarding', 'Video production', 'Social design'],
    storyTitle: 'Intrigue. Reveal. Prove. Accelerate.',
    artTitle: 'Dimensional type turns an abstract theme into a place',
    artNote: 'Perspective, layered typography, deep violet, and controlled bursts of white created continuity across film and static output. The system could feel cinematic without making every announcement difficult to read.',
    beats: [
      { time: '01', title: 'Intrigue', body: 'Trailers establish a world before explaining it, using fragments, scale, and directional camera movement.' },
      { time: '02', title: 'Reveal', body: 'The annual theme becomes the hero and the visual metaphor becomes explicit.' },
      { time: '03', title: 'Prove', body: 'Speaker, website, merchandise, and experience drops turn atmosphere into concrete reasons to attend.' },
      { time: '04', title: 'Accelerate', body: 'Countdown and event-day edits shorten the rhythm while preserving the campaign typography and color signal.' },
    ],
    principles: [
      { label: 'Space', value: 'Type behaves like architecture, not a flat caption' },
      { label: 'Rhythm', value: 'Slow-burn reveal → clear proof → urgent countdown' },
      { label: 'Hierarchy', value: 'Theme first; speaker and registration information held still' },
      { label: 'System', value: 'One visual grammar across film, feed, story, web, and merchandise' },
    ],
    frames: [
      { src: '/Assets/Projects/VishwaConclave/motion-2021/manifesto.jpg', alt: 'VishwaConclave 2021 Accelerating the Paradigm Shift manifesto poster', caption: '01 — Theme manifesto', fit: 'cover' },
      { src: '/Assets/Projects/VishwaConclave/motion-2021/uddhab-speaker-2.jpg', alt: 'Illustrated VishwaConclave speaker artwork for Uddhab Bharali', caption: '02 — Speaker identity', fit: 'cover' },
      { src: '/Assets/Projects/VishwaConclave/motion-2021/musical-experience.jpg', alt: 'VishwaConclave 2021 musical experience announcement', caption: '03 — Programme reveal', fit: 'cover' },
      { src: '/Assets/Projects/VishwaConclave/motion-2021/merchandise.jpg', alt: 'VishwaConclave 2021 merchandise bundle announcement', caption: '04 — Campaign extension', fit: 'cover' },
    ],
    decisions: [
      { removed: 'One visual tempo for every post', kept: 'A campaign with changing gears', reason: 'Theme films earn attention slowly; speaker and registration posts need immediate clarity.' },
      { removed: 'Decorative 3D as spectacle', kept: 'Dimension as the theme metaphor', reason: 'Perspective and depth make “paradigm shift” tangible instead of merely futuristic.' },
      { removed: 'Independent launch assets', kept: 'A sequenced release calendar', reason: 'Each drop answers the question created by the one before it and moves the audience closer to the event.' },
    ],
    aeBuild: [
      { layer: '00_MASTER_CAMPAIGN', technique: '16:9 edit + named markers', purpose: 'The narrative master protects the reveal order and provides a source for shorter cuts.' },
      { layer: '01_TYPE_WORLD', technique: '3D layers + cameras + null controls', purpose: 'Type, light, and perspective share one controllable dimensional system.' },
      { layer: '02_CONTENT_MODULES', technique: 'Protected pre-comps', purpose: 'Speaker, date, website, programme, and CTA cards can change without rebuilding transitions.' },
      { layer: '90_SOCIAL_DELIVERY', technique: 'Responsive 4:5 and 9:16 comps', purpose: 'Safe zones and inherited timing keep the edit legible across social formats.' },
    ],
    deliveries: [
      { key: 'Trailer', value: 'Atmosphere and theme anticipation' },
      { key: 'Hero film', value: 'Theme reveal and campaign world' },
      { key: 'Content modules', value: 'Speaker · site · merchandise · programme' },
      { key: 'Formats', value: '16:9 / 4:5 / 1:1 / 9:16' },
    ],
    outputs: ['Theme film', 'Campaign trailers', 'Speaker reveals', 'Social launch system'],
  },
  {
    key: 'mentra',
    path: 'mentra-motion-language',
    title: 'Mentra — Sell the Moment, Then the Hardware',
    cardTitle: 'Mentra: Sell the moment, then the hardware',
    descriptor: 'An advertising-motion system for smart glasses that leads with lived moments, proves wearability, and closes on MentraOS—built from real Mentra campaign and product assets.',
    discipline: 'Advertising motion / Hardware GTM',
    year: '2025–26',
    color: '#00b869',
    categorySlug: 'brand-visual',
    heroImage: '/Assets/Projects/mentra-brand/photos/render-both-frames.webp',
    heroAlt: 'Black and transparent Mentra smart glasses product renders',
    intro: 'The technology should leave the frame before the person leaves the moment.',
    truthNote: 'The identity, packaging, product renders, Stream, Hear, Focus, and teaser campaign assets, MentraOS interfaces, and logo-animation frames are from my Mentra work. The 15-second advertising sequence and After Effects architecture documented here are a portfolio campaign system assembled from those real sources—not a claim that this exact hero edit shipped or produced unverified performance results. Even Realities is cited only as category research; no competitor imagery, copy, or layouts are used in the Mentra work.',
    challenge: 'Smart-glasses advertising often begins with “AI,” interface overlays, and specifications before giving people a reason to care. Mentra still has to prove credible hardware and an open platform, but the advertisement first needs to make hands-free capture and open-ear audio feel desirable in an ordinary life moment.',
    move: 'Lead with a recognizable human moment, present the glasses as eyewear, demonstrate one capability, then reveal the hardware and MentraOS system behind it. Each short ad gets one promise—Stream, Hear, Focus, or Build—rather than carrying the entire feature list.',
    outcome: 'One campaign idea becomes a 15-second launch film, six-second benefit spots, vertical paid-social stories, hardware proof cutdowns, and MiniApp announcements—held together by one visual route and one advertising hierarchy.',
    roles: ['Creative direction', 'Advertising system', 'Motion design', 'Storyboard', 'Template architecture'],
    storyTitle: 'Moment. Wear. Use. Extend.',
    artTitle: 'People first. Product second. Platform third.',
    artNote: 'Human campaign frames establish desire, clean renders establish wearability and build quality, and MentraOS establishes what the product can become. White type stays direct; green acts as a recognition signal; interface overlays appear only when they explain a real capability.',
    beats: [
      { time: '00:00', title: 'Moment', body: 'Open on a human scene and a single promise: Stream your world without stepping out of it.' },
      { time: '00:03', title: 'Wear', body: 'A clean product reveal makes the glasses feel familiar, desirable, and physically believable.' },
      { time: '00:06', title: 'Use', body: 'Demonstrate one capability—capture or audio—without turning the frame into a feature dashboard.' },
      { time: '00:10', title: 'Prove', body: 'Macro and exploded views hold long enough to establish the camera, temple, and construction.' },
      { time: '00:12', title: 'Extend', body: 'MentraOS reframes the glasses as an open platform after the core benefit is understood.' },
      { time: '00:14', title: 'Act', body: 'Close on one message and one CTA, with a stable product silhouette and no final feature pile-up.' },
    ],
    principles: [
      { label: 'Advertising hierarchy', value: 'Human tension → benefit → product → platform → action' },
      { label: 'One promise', value: 'Stream, Hear, Focus, or Build—never all four in one short ad' },
      { label: 'Wearability', value: 'Show the glasses on a person before exposing technical construction' },
      { label: 'Accessibility', value: 'Benefit and CTA survive sound-off and reduced-motion playback' },
    ],
    frames: [
      { src: '/Assets/Projects/mentra-brand/photos/ad-stream.webp', alt: 'Mentra Stream Your World vertical campaign advertisement', caption: '01 — Human moment', fit: 'cover' },
      { src: '/Assets/Projects/mentra-brand/photos/ad-hear.webp', alt: 'Mentra Hear Your Audio Hear the World campaign advertisement', caption: '02 — Single benefit', fit: 'cover' },
      { src: '/Assets/Projects/mentra-brand/photos/render-exploded.webp', alt: 'Exploded Mentra Live smart-glasses render showing product components', caption: '03 — Hardware proof', fit: 'cover' },
      { src: '/Assets/images/mentra/os-all-apps.png', alt: 'MentraOS interface showing available smart-glasses applications', caption: '04 — Platform extension', fit: 'contain' },
    ],
    decisions: [
      { removed: 'Opening on “AI smart glasses”', kept: 'Opening on an uninterrupted life moment', reason: 'The audience understands the human benefit before being asked to understand the category.' },
      { removed: 'A rapid four-feature montage', kept: 'One promise per paid-social spot', reason: 'Stream, Hear, Focus, and Build become memorable campaign territories instead of competing captions.' },
      { removed: 'Floating speculative HUD graphics', kept: 'Real campaign imagery and MentraOS states', reason: 'Product truth is more persuasive than generic interface decoration added in post.' },
      { removed: 'A dramatic logo-first ending', kept: 'Product silhouette, benefit, and one CTA', reason: 'The advertisement closes on what the viewer gets—not only on who made it.' },
    ],
    aeBuild: [
      { layer: '00_MASTER_CAMPAIGN', technique: '3840×2160 · 15 sec · five markers', purpose: 'The master protects the moment → wearability → capability → product → platform hierarchy.' },
      { layer: '01_HOOK_FAMILY', technique: 'Essential Graphics + copy controls', purpose: 'Stream, Hear, Focus, and Build swap as campaign promises without changing the edit grammar.' },
      { layer: '02_LIFE_MOMENT', technique: 'Protected media + focal-point nulls', purpose: 'Lifestyle footage reframes cleanly while keeping faces, eyewear, and benefit copy readable.' },
      { layer: '03_PRODUCT_AND_OS', technique: 'Render passes + protected pre-comps', purpose: 'Hardware, macro detail, and MentraOS can enter as proof without interrupting the human story.' },
      { layer: '90_PAID_SOCIAL_SET', technique: 'Responsive comps + inherited timing', purpose: 'Six-second and 15-second versions share captions, CTA, safe zones, and product end cards.' },
    ],
    deliveries: [
      { key: '03 seconds', value: 'Product end card / retargeting sting' },
      { key: '06 seconds', value: 'Single-benefit paid-social spot' },
      { key: '15 seconds', value: 'Moment → product → platform campaign story' },
      { key: 'Formats', value: '16:9 / 4:5 / 1:1 / 9:16' },
    ],
    outputs: ['Launch advertisement', 'Benefit spot family', 'Hardware proof cutdown', 'MiniApp announcement template'],
  },
  {
    key: 'transfi',
    path: 'transfi-identity-motion',
    title: 'TransFi — One Transaction, Made Legible',
    cardTitle: 'TransFi: One transaction, made legible',
    descriptor: 'A product-motion system that follows one cross-border payment from currency choice to verified delivery—using real TransFi interface states instead of abstract fintech spectacle.',
    discipline: 'Product motion / Fintech GTM',
    year: '2022–23',
    color: '#48d8ff',
    categorySlug: 'fintech',
    heroImage: '/Assets/mockups/projects/transfi-project_16x9.webp',
    heroAlt: 'TransFi identity, merchant dashboard, and customer checkout presentation',
    intro: 'Make money movement feel continuous—even when the infrastructure is complex.',
    truthNote: 'The identity, dashboard, checkout, payment-method, verification, order-status, and responsive product frames are from my original TransFi design work. The storyboard, motion grammar, and After Effects architecture shown here are a portfolio production system built from those shipped sources—not a claim that this exact GTM film shipped or produced unverified campaign results.',
    challenge: 'A cross-border payment changes currency, method, network, verification state, and ownership before it is complete. Showing every layer at once creates noise; hiding the steps makes the product feel like a black box. The story needed momentum without making financial information feel unstable.',
    move: 'Follow one transaction—not a feature montage. The amount becomes the visual anchor while the interface moves through choose, wallet, method, verification, confirmation, and delivery. Expressive motion opens the story; productive motion carries every money and status state.',
    outcome: 'One state-based master can become a launch explainer, a checkout walkthrough, a status-story cutdown, dashboard feature clips, and responsive social versions while preserving amounts, labels, and confirmation moments.',
    roles: ['Product design', 'Motion system', 'Storyboard', 'Art direction', 'Template architecture'],
    storyTitle: 'Choose. Verify. Move. Confirm.',
    artTitle: 'The transaction is the protagonist—not the network',
    artNote: 'Real checkout and dashboard states provide the proof. Blue carries continuity, cyan marks active movement, green is reserved for confirmed status, and financial values never spin, bounce, or blur between states.',
    beats: [
      { time: '00:00', title: 'Orient', body: 'A single amount and directional mark establish what is moving before the interface appears.' },
      { time: '00:02', title: 'Choose', body: 'Currency and asset enter as paired decisions; the amount stays fixed to preserve continuity.' },
      { time: '00:05', title: 'Authorize', body: 'Wallet, payment method, and verification arrive one at a time in the order the customer acts.' },
      { time: '00:09', title: 'Track', body: 'The six-step journey becomes a status route, showing progress without pretending settlement is instantaneous.' },
      { time: '00:13', title: 'Confirm', body: 'Order summary and merchant dashboard hold on the resolved state long enough to read.' },
      { time: '00:16', title: 'Sign off', body: 'The route folds back into the mark with one product sentence and no extra feature claims.' },
    ],
    principles: [
      { label: 'Continuity', value: 'One amount persists from choice to confirmation' },
      { label: 'State', value: 'Every transition has an origin, action, and resolved endpoint' },
      { label: 'Hierarchy', value: 'Amount → status → method → supporting detail' },
      { label: 'Accessibility', value: 'Meaning survives sound-off, pause, and reduced motion' },
    ],
    frames: [
      { src: '/Assets/Projects/Transfi/public/Group 1000004741.png', alt: 'TransFi currency selection visual with USD, BTC, and EUR layers', caption: '01 — Currency choice', fit: 'contain' },
      { src: '/Assets/Projects/Transfi/public/Frame 427318638.png', alt: 'TransFi buy-crypto widget with currency and asset selection screens', caption: '02 — Checkout entry', fit: 'contain' },
      { src: '/Assets/Projects/Transfi/public/Frame 427318646.png', alt: 'Six-step TransFi checkout journey from currency choice to crypto delivery', caption: '03 — Journey continuity', fit: 'cover' },
      { src: '/Assets/Projects/Transfi/public/Order Summary.png', alt: 'TransFi order summary with amount, fees, and delivery status', caption: '04 — Resolved state', fit: 'contain' },
    ],
    decisions: [
      { removed: 'Coins, particles, and a spinning globe', kept: 'One observable transaction', reason: 'A real payment journey demonstrates global infrastructure more credibly than generic fintech symbols.' },
      { removed: 'A fast six-screen carousel', kept: 'One action per beat', reason: 'Choice, authorization, verification, and settlement have different meanings and need separate attention.' },
      { removed: 'Elastic numbers and rolling counters', kept: 'Persistent amount with a firm settle', reason: 'Financial values should feel stable and comparable across every state.' },
      { removed: 'A confetti success moment', kept: 'Status change, timestamp, and quiet hold', reason: 'Confirmation is evidence. The interface should communicate completion without obscuring the details.' },
    ],
    aeBuild: [
      { layer: '00_MASTER_TRANSACTION', technique: '1920×1080 · 18 sec · six markers', purpose: 'One marked sequence protects the order from customer intent to merchant confirmation.' },
      { layer: '01_AMOUNT_ANCHOR', technique: 'Text controls + currency variants', purpose: 'Amount, asset, and rate update without drifting between scenes or requiring duplicate animation.' },
      { layer: '02_STATE_ROUTE', technique: 'Shape layer + Trim Paths', purpose: 'A single route controls progress, chapter handoffs, and the final identity fold.' },
      { layer: '03_PRODUCT_STATES', technique: 'Figma exports + protected pre-comps', purpose: 'Checkout, KYC, payment, order, and dashboard modules reveal by decision priority.' },
      { layer: '90_DELIVERY_SET', technique: 'Responsive comps + Essential Graphics', purpose: 'Copy, currency, status, CTA, captions, and crops remain editable for new corridors.' },
    ],
    deliveries: [
      { key: '03 seconds', value: 'Identity / confirmation sting' },
      { key: '06 seconds', value: 'Choose → pay checkout story' },
      { key: '18 seconds', value: 'End-to-end transaction master' },
      { key: 'Formats', value: '16:9 / 4:5 / 1:1 / 9:16' },
    ],
    outputs: ['Transaction master', 'Checkout walkthrough', 'Status-story template', 'Responsive social cutdowns'],
  },
  {
    key: 'editorial',
    path: 'editing-motion-stories',
    title: 'Cutting Systems into Stories',
    cardTitle: 'Selected film editing: Enigma, Omakase + more',
    descriptor: 'A practical breakdown of how project footage becomes a clear film through selects, paper edits, cause-and-effect cutting, sound, motion graphics, and responsive delivery.',
    discipline: 'Video editing / Editorial direction',
    year: '2023–25',
    color: '#ff6847',
    categorySlug: 'creative-tech',
    heroImage: '/Assets/mockups/projects/enigma_16x9.webp',
    heroAlt: 'Enigma neural-network sculpture illuminated during exhibition',
    intro: 'A good project film reveals the idea before it asks for attention.',
    truthNote: 'This case study documents my editorial reasoning, assembly, motion-graphics, sound, and delivery practice across project films built from my work. Collaborative project and production contributions remain credited on the linked full case studies.',
    challenge: 'Interactive objects and performances are easy to make visually exciting but difficult to explain. A beauty reel alone cannot show what changed, why it matters, or how the audience participates.',
    move: 'Give each film one sentence and one visible transformation, then organize gestures, system responses, proof shots, atmosphere, and reactions around that narrative spine.',
    outcome: 'A repeatable editorial workflow connects four very different subjects while allowing each film to earn its own pace, sound behavior, and graphic intervention.',
    roles: ['Video editing', 'Editorial direction', 'Motion graphics', 'Sound design', 'Delivery'],
    storyTitle: 'Promise. Input. System. Payoff. Resolve.',
    artTitle: 'The cut follows the idea',
    artNote: 'Visual variety comes from the projects. Editorial consistency comes from clear causality, motivated inserts, sound continuity, restrained graphics, and proof holds.',
    beats: [
      { time: '01', title: 'Promise', body: 'Open on the transformation the viewer should understand—not a logo or generic montage.' },
      { time: '02', title: 'Input', body: 'Show the gesture, object, or spatial condition that begins the system.' },
      { time: '03', title: 'System', body: 'Use sequence, inserts, and sound to make the behavior legible.' },
      { time: '04', title: 'Payoff', body: 'Hold on the prediction, score, mechanism, or emotional state long enough to verify it.' },
      { time: '05', title: 'Resolve', body: 'Close on meaning and context without adding a second story.' },
    ],
    principles: [
      { label: 'Story', value: 'One sentence before one timeline' },
      { label: 'Causality', value: 'Input precedes response; response precedes payoff' },
      { label: 'Sound', value: 'Bridges preserve continuity across visual cuts' },
      { label: 'Versions', value: 'One master supports captions, crops, and cutdowns' },
    ],
    frames: [
      { src: '/Assets/Projects/Enigma/photos/tablet-input.jpg', alt: 'Visitor drawing on the Enigma tablet', caption: '01 — Cause before spectacle' },
      { src: '/Assets/Projects/the-omakase/photos/head-to-head-match.webp', alt: 'Two players competing at The Omakase', caption: '02 — Action before explanation' },
      { src: '/Assets/Projects/making-of-time/photos/blue-dial-hero.webp', alt: 'Mechanical watch dial from Making of Time', caption: '03 — Match ideas, not objects' },
      { src: '/Assets/Projects/Drowning/photos/WhatsApp Image 2024-10-10 at 11.54.18.webp', alt: 'Drowning greenhouse set during performance', caption: '04 — Restraint creates pressure' },
    ],
    decisions: [
      { removed: 'Chronological documentation dump', kept: 'One transformation per film', reason: 'A viewer can understand the project before absorbing its full process.' },
      { removed: 'Music-led montage first', kept: 'Causality before polish', reason: 'The story must work through picture and sync sound before a track supplies energy.' },
      { removed: 'Constant cutting speed', kept: 'Pace earned by the subject', reason: 'Competition, computation, craft, and performance require different durations.' },
      { removed: 'Graphics over every shot', kept: 'Labels only where footage cannot explain state', reason: 'Motion graphics clarify the system without competing with the project itself.' },
    ],
    aeBuild: [
      { layer: '01_INGEST_AND_SELECTS', technique: 'Story-function bins + stringouts', purpose: 'Gestures, details, environments, reactions, and proof shots stay searchable by narrative responsibility.' },
      { layer: '10_STORY_MASTER', technique: 'Marked Premiere Pro sequence', purpose: 'Promise, input, system, payoff, and resolve remain visible before polish.' },
      { layer: '20_AUDIO', technique: 'Sync + room tone + designed actions', purpose: 'Sound bridges preserve continuity and give physical behavior weight.' },
      { layer: '30_GFX_AND_COMPS', technique: 'Focused After Effects round-trips', purpose: 'Tracked screens, cleanup, state labels, titles, and end cards receive intervention without fragmenting the edit.' },
      { layer: '90_DELIVERY', technique: 'Inherited versions', purpose: 'Captioned, vertical, sound-off, and shorter outputs stay tied to one approved narrative master.' },
    ],
    deliveries: [
      { key: 'Portfolio', value: '16:9 narrative master' },
      { key: 'Accessible', value: 'Captioned and sound-off versions' },
      { key: 'Social', value: '4:5 and 9:16 reframes' },
      { key: 'Cutdowns', value: 'Short hook, demo, and proof edits' },
    ],
    outputs: ['Narrative project films', 'Demo cutdowns', 'Captioned versions', 'Responsive social masters'],
  },
]

function useMotionPreference() {
  const [motionOn, setMotionOn] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = (event: MediaQueryListEvent) => setMotionOn(!event.matches)
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])

  return motionOn
}

function VishwaReel({ motionOn }: { motionOn: boolean }) {
  return (
    <div className="motion-preview motion-preview--vishwa">
      <video
        autoPlay={motionOn}
        controls
        loop
        muted
        playsInline
        poster="/Assets/Projects/VishwaConclave/motion-2021/posters/crafting-decade-theme.mp4.png"
        preload="metadata"
        aria-label="VishwaConclave Crafting the Decade campaign film from 2020"
      >
        <source src="/Assets/Projects/VishwaConclave/motion-2021/crafting-decade-theme.mp4" type="video/mp4" />
      </video>
      <div className="motion-vishwa__label" aria-hidden="true">
        <span>Official campaign archive</span>
        <strong>Crafting the Decade · 2020</strong>
      </div>
    </div>
  )
}

function MentraReel() {
  return (
    <div className="motion-preview motion-preview--mentra" role="img" aria-label="Mentra advertising prototype moving from a lived moment to wearable hardware, a single benefit, and MentraOS">
      <div className="motion-mentra__status" aria-hidden="true">
        <span>MENTRA LIVE / PAID SOCIAL SYSTEM</span>
        <span>15 SEC MASTER</span>
      </div>
      <div className="motion-mentra__chapter-labels" aria-hidden="true">
        <span>01 / MOMENT</span><span>02 / WEAR</span><span>03 / USE</span><span>04 / EXTEND</span>
      </div>
      <div className="motion-mentra__scene motion-mentra__scene--moment" aria-hidden="true">
        <img src="/Assets/Projects/mentra-brand/photos/ad-stream.webp" alt="" />
        <div><small>MENTRA LIVE</small><strong>Stream your world.</strong><span>Stay in the moment. Bring it with you.</span></div>
      </div>
      <div className="motion-mentra__scene motion-mentra__scene--hardware" aria-hidden="true">
        <span>Designed to wear.<br />Ready to capture.</span>
        <img src="/Assets/Projects/mentra-brand/photos/render-both-frames.webp" alt="" />
        <i />
      </div>
      <div className="motion-mentra__scene motion-mentra__scene--pov" aria-hidden="true">
        <img src="/Assets/Projects/mentra-brand/photos/ad-hear.webp" alt="" />
        <div><small>ONE BENEFIT / ONE SPOT</small><strong>Hear your audio.<br />Hear the world.</strong></div>
      </div>
      <div className="motion-mentra__scene motion-mentra__scene--platform" aria-hidden="true">
        <img src="/Assets/images/mentra/os-all-apps.png" alt="" />
        <div><small>POWERED BY MENTRAOS</small><strong>One pair. More possibilities.</strong><span>Build · install · extend</span></div>
      </div>
      <div className="motion-mentra__timeline" aria-hidden="true"><i /><span>MOMENT</span><span>WEAR</span><span>USE</span><span>EXTEND</span></div>
    </div>
  )
}

function TransfiReel({ motionOn }: { motionOn: boolean }) {
  return (
    <div className={`motion-preview motion-preview--transfi${motionOn ? '' : ' is-paused'}`} role="img" aria-label="TransFi transaction motion preview moving from currency choice through payment status to confirmation">
      <div className="motion-transfi__status" aria-hidden="true"><span>TRANSFI / TRANSACTION 01</span><span>18 SEC MASTER</span></div>
      <div className="motion-transfi__chapter-labels" aria-hidden="true">
        <span>01 / ORIENT</span><span>02 / CHOOSE</span><span>03 / MOVE</span><span>04 / CONFIRM</span>
      </div>
      <div className="motion-transfi__scene motion-transfi__scene--signal" aria-hidden="true">
        <div><img src={transfiMotion} alt="" /></div>
        <strong>One payment.<br />Every state visible.</strong>
        <p><span>$300.00</span><small>USD → 0.0925 BTC</small></p>
      </div>
      <div className="motion-transfi__scene motion-transfi__scene--choose" aria-hidden="true">
        <img src="/Assets/Projects/Transfi/public/Group 1000004741.png" alt="" />
        <div><small>CHOOSE THE CORRIDOR</small><strong>USD → BTC</strong><span>Amount remains anchored</span></div>
      </div>
      <div className="motion-transfi__scene motion-transfi__scene--move" aria-hidden="true">
        <img src="/Assets/Projects/Transfi/public/Frame 427318646.png" alt="" />
        <div><small>FOLLOW THE STATE</small><strong>Choose · verify · pay · deliver</strong></div>
      </div>
      <div className="motion-transfi__scene motion-transfi__scene--confirm" aria-hidden="true">
        <img src="/Assets/Projects/Transfi/public/Order Summary.png" alt="" />
        <div><small>TRANSACTION STATE</small><strong>Payment complete.</strong><span>Amount, fees, method, and status remain readable.</span></div>
      </div>
      <div className="motion-transfi__timeline" aria-hidden="true"><i /><span>CHOOSE</span><span>VERIFY</span><span>MOVE</span><span>CONFIRM</span></div>
    </div>
  )
}

function ProjectReel({ project, motionOn }: { project: MotionProject; motionOn: boolean }) {
  if (project.key === 'vishwa') return <VishwaReel motionOn={motionOn} />
  if (project.key === 'mentra') return <MentraReel />
  return <TransfiReel motionOn={motionOn} />
}

function VishwaCampaignBrief() {
  const items = [
    ['Audience', 'Students and young professionals deciding whether an unfamiliar conference was worth their attention.'],
    ['Communication job', 'Make an abstract annual theme feel intriguing first, then concrete enough to act on.'],
    ['Campaign proof', 'Speakers, website, programme, merchandise, registration, and the live experience.'],
    ['Production constraint', 'A student team shipping a high-frequency campaign across film, feed, story, and web.'],
  ]

  return (
    <>
      <div className="vishwa-brief-grid">
        {items.map(([label, value], index) => (
          <article key={label}><span>0{index + 1}</span><small>{label}</small><p>{value}</p></article>
        ))}
      </div>
      <div className="vishwa-cadence" aria-label="VishwaConclave campaign release sequence">
        <p>Campaign cadence</p>
        <div>
          <span><small>01</small><strong>Tease</strong></span>
          <i aria-hidden="true">→</i>
          <span><small>02</small><strong>Reveal</strong></span>
          <i aria-hidden="true">→</i>
          <span><small>03</small><strong>Prove</strong></span>
          <i aria-hidden="true">→</i>
          <span><small>04</small><strong>Convert</strong></span>
        </div>
      </div>
    </>
  )
}

function CampaignVideo({ src, poster, title, note, href, className = '' }: { src: string; poster?: string; title: string; note: string; href?: string; className?: string }) {
  return (
    <figure className={`vishwa-video ${className}`.trim()}>
      <div>
        <video controls playsInline poster={poster} preload="metadata" aria-label={title}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <figcaption>
        <span>{title}</span>
        <small>{note}</small>
        {href && <a href={href} target="_blank" rel="noreferrer">View original post ↗</a>}
      </figcaption>
    </figure>
  )
}

function MotionArtifact({ src, title, note, className = '' }: { src: string; title: string; note: string; className?: string }) {
  return (
    <figure className={`vishwa-video motion-source-artifact ${className}`.trim()}>
      <div><img src={src} alt={title} loading="lazy" /></div>
      <figcaption><span>{title}</span><small>{note}</small></figcaption>
    </figure>
  )
}

function VishwaCampaignArchive() {
  const films = [
    {
      src: '/Assets/Projects/VishwaConclave/motion-2021/crafting-decade-theme.mp4',
      poster: '/Assets/Projects/VishwaConclave/motion-2021/posters/crafting-decade-theme.mp4.png',
      title: 'Theme film · Crafting the Decade',
      note: '2020 · 60-second campaign film',
      href: 'https://www.instagram.com/p/CHfpIWpjDUw/',
    },
    {
      src: '/Assets/Projects/VishwaConclave/motion-2021/crafting-decade-trailer.mp4',
      poster: '/Assets/Projects/VishwaConclave/motion-2021/posters/crafting-decade-trailer.mp4.png',
      title: 'Trailer · Crafting the Decade',
      note: '2020 · 40-second anticipation cut',
      href: 'https://www.instagram.com/p/CHkrXXAjthA/',
    },
    {
      src: '/Assets/Projects/VishwaConclave/motion-2021/website-release.mp4',
      poster: '/Assets/Projects/VishwaConclave/motion-2021/posters/website-release.mp4.png',
      title: 'Website release',
      note: '2021 · product and registration proof',
      href: 'https://www.instagram.com/p/CL13dm2jz24/',
    },
    {
      src: '/Assets/Projects/VishwaConclave/motion-2021/event-story.mp4',
      poster: '/Assets/Projects/VishwaConclave/motion-2021/posters/event-story.mp4.png',
      title: 'Event experience',
      note: '2021 · programme-led social film',
      href: 'https://www.instagram.com/p/CNaMg6AgO_9/',
    },
  ]

  return (
    <>
      <div className="vishwa-video-grid">
        {films.map((film) => <CampaignVideo key={film.src} {...film} />)}
      </div>

      <div className="vishwa-production-credit">
        <div>
          <p className="vishwa-production-credit__eyebrow">Collaboration credit</p>
          <h3>2021 theme-release film</h3>
          <p>The official post credits animation to <strong>Parallel Studio</strong>. My case-study scope is the creative direction and campaign system around the film; I do not present the specialist animation execution as my individual work.</p>
          <a href="https://www.instagram.com/p/CLEvdDdDYRg/" target="_blank" rel="noreferrer">View the original credit ↗</a>
        </div>
        <CampaignVideo
          src="/Assets/Projects/VishwaConclave/motion-2021/theme-release.mp4"
          poster="/Assets/Projects/VishwaConclave/motion-2021/posters/theme-release.mp4.png"
          title="Accelerating the Paradigm Shift"
          note="2021 · animation by Parallel Studio"
        />
      </div>

      <div className="vishwa-reference-block">
        <div className="vishwa-reference-block__copy">
          <p className="vishwa-production-credit__eyebrow">Archive continuation · reference only</p>
          <h3>The visual language kept evolving after my tenure.</h3>
          <p>These 2022 and 2023 clips are not included as authored work. They are useful evidence of how later teams continued exploring dimensional type, object choreography, and vertical-first event storytelling.</p>
        </div>
        <div className="vishwa-reference-grid">
          <CampaignVideo
            className="is-portrait"
            src="/Assets/Projects/VishwaConclave/motion-2021/reference-2022-horizons.mp4"
            poster="/Assets/Projects/VishwaConclave/motion-2021/posters/reference-2022-horizons.mp4.png"
            title="Transcending Horizons"
            note="2022 · post-tenure reference"
            href="https://www.instagram.com/tv/CZrIf15A_PQ/"
          />
          <CampaignVideo
            className="is-portrait"
            src="/Assets/Projects/VishwaConclave/motion-2021/reference-2023-coalescence.mp4"
            poster="/Assets/Projects/VishwaConclave/motion-2021/posters/reference-2023-coalescence.mp4.png"
            title="Coalesce of Dispersion"
            note="2023 · post-tenure reference"
            href="https://www.instagram.com/reel/Coz2-6Eo1KE/"
          />
        </div>
      </div>
    </>
  )
}

function MentraVideoEvidence() {
  return (
    <>
      <div className="motion-video-provenance">
        <span>Source-footage note</span>
        <p>These are current films published by Mentra. They verify the physical product, real-world use, and the platform context available to the proposed campaign system; I am not presenting either finished edit as a film I directed.</p>
      </div>
      <div className="vishwa-video-grid motion-source-video-grid">
        <CampaignVideo
          src="/Assets/Projects/mentra-brand/motion/official-site-hero.mp4"
          poster="/Assets/Projects/mentra-brand/motion/official-site-hero-poster.png"
          title="Mentra site hero · real-world work"
          note="Official Mentra footage · campaign source reference"
          href="https://mentraglass.com/"
        />
        <CampaignVideo
          src="/Assets/Projects/mentra-brand/motion/official-product-intro.mp4"
          poster="/Assets/Projects/mentra-brand/motion/official-product-intro-poster.png"
          title="Mentra Live · product introduction"
          note="Official Mentra product film · campaign source reference"
          href="https://mentraglass.com/"
        />
      </div>
      <div className="motion-video-research-links">
        <div><small>Additional official production context</small><strong>The footage library also has a product-unboxing story and a factory-build story—useful for hardware proof cutdowns.</strong></div>
        <a href="https://www.youtube.com/watch?v=-96QvIVzcMc" target="_blank" rel="noreferrer">Product unboxing ↗</a>
        <a href="https://www.youtube.com/watch?v=bhtVIJdsMS4" target="_blank" rel="noreferrer">Building 1,000 glasses ↗</a>
      </div>
    </>
  )
}

function TransfiVideoEvidence() {
  return (
    <>
      <div className="motion-video-provenance">
        <span>Archive boundary</span>
        <p>The animated identity loop is from the original project archive. The current TransFi site film is included as later brand and product context—not as a film from my 2022–23 project scope or an edit I directed.</p>
      </div>
      <div className="vishwa-video-grid motion-source-video-grid">
        <MotionArtifact
          src={transfiMotion}
          title="TransFi identity loop"
          note="Original project archive · animated brand study"
          className="is-contain"
        />
        <CampaignVideo
          src="/Assets/Projects/Transfi/motion/official-site-hero.mp4"
          poster="/Assets/Projects/Transfi/motion/official-site-hero-poster.jpg"
          title="TransFi · stablecoin infrastructure"
          note="Current official site film · later brand reference"
          href="https://www.transfi.com/"
          className="is-contain"
        />
      </div>
    </>
  )
}

function VishwaAeStack() {
  const rows = [
    ['00_MASTER_CAMPAIGN', '1920 × 1080 · edit markers', 'Master'],
    ['01_CTRL_WORLD', 'Color · light · depth · timing', 'Controls'],
    ['02_TYPE_ARCHITECTURE', '3D layers · cameras · nulls', 'Pre-comp'],
    ['03_CONTENT_MODULES', 'Speaker · website · programme · CTA', 'Pre-comp'],
    ['04_AUDIO_EDIT', 'Music edit · hits · room tone', 'Pre-comp'],
    ['90_DELIVERY_9x16', '1080 × 1920 · protected zones', 'Inherited'],
  ]

  return (
    <div className="motion-ae-stack" aria-label="Documented After Effects rebuild structure">
      <div className="motion-ae-stack__head"><span>After Effects project map</span><span>Documented rebuild</span></div>
      {rows.map(([name, contents, kind], index) => (
        <div className="motion-ae-stack__row" key={name}>
          <i style={{ '--row-color': index === 0 ? '#b14cff' : index === rows.length - 1 ? '#ff7438' : '#7d3be8' } as CSSProperties} />
          <code>{name}</code><span>{contents}</span><small>{kind}</small>
        </div>
      ))}
    </div>
  )
}

function MentraCommunicationBrief() {
  const items = [
    ['Audience', 'Creators and early adopters who want useful everyday eyewear—not another device competing for their attention.'],
    ['Communication job', 'Make the life moment desirable first, then prove Mentra can capture, play, and extend it without getting in the way.'],
    ['Campaign proof', 'Real Stream, Hear, Focus, teaser, hardware, and MentraOS assets—each assigned one advertising job.'],
    ['Delivery constraint', 'One recognizable campaign across six- and 15-second paid social, sound-off viewing, and responsive crops.'],
  ]

  return (
    <>
      <div className="mentra-brief-grid">
        {items.map(([label, value], index) => (
          <article key={label}><span>0{index + 1}</span><small>{label}</small><p>{value}</p></article>
        ))}
      </div>
      <div className="mentra-story-ladder" aria-label="Mentra advertising story sequence">
        <p>Advertising ladder</p>
        <div>
          <span><small>Desire</small><strong>Moment</strong></span>
          <i aria-hidden="true">→</i>
          <span><small>Accept</small><strong>Wearability</strong></span>
          <i aria-hidden="true">→</i>
          <span><small>Understand</small><strong>Capability</strong></span>
          <i aria-hidden="true">→</i>
          <span><small>Believe</small><strong>Platform</strong></span>
        </div>
      </div>
    </>
  )
}

function MentraMotionSystem() {
  const tokens = [
    ['Hook', '0–800 ms', 'Human tension or benefit visible in the first frame'],
    ['Moment', '1.6–2.4 sec', 'Enough time to recognize the person, place, and desire'],
    ['Proof', '800–1,200 ms', 'Wearability, camera, audio, or MentraOS—not all at once'],
    ['Action hold', '1.2–1.8 sec', 'Product silhouette, benefit line, and one CTA'],
  ]
  const benchmarkMoves = [
    ['Human situation before specification', 'Open on celebration, concentration, or listening—then reveal how Mentra supports it.'],
    ['Eyewear before electronics', 'Show frames on a person before macro, exploded, or operating-system proof.'],
    ['One scenario per story', 'Separate Stream, Hear, Focus, and Build into memorable short-form territories.'],
    ['Technology recedes', 'Keep interface and platform proof late in the edit, after the core human benefit is clear.'],
  ]

  return (
    <>
      <div className="mentra-reference-bar">
        <div><small>Category research translated into Mentra</small><strong>Sell the human advantage before explaining the technology.</strong></div>
        <a href="https://www.evenrealities.com/" target="_blank" rel="noreferrer">Even Realities / benefit-first category benchmark ↗</a>
        <a href="https://www.youtube.com/watch?v=DD5-hGUDF7c" target="_blank" rel="noreferrer">Even G2 / human-situation campaign film ↗</a>
        <a href="https://developer.apple.com/design/human-interface-guidelines/motion" target="_blank" rel="noreferrer">Purpose, restraint, and accessibility ↗</a>
      </div>

      <div className="mentra-benchmark">
        <div className="mentra-benchmark__intro">
          <small>Competitive benchmark → original response</small>
          <h3>What Even Realities gets right—and how Mentra makes it its own.</h3>
          <p>Even Realities demonstrates that smart-glasses advertising is strongest when it begins with people, familiar eyewear, and a specific life advantage. Mentra adapts that strategy to a different product truth: first-person capture, open-ear audio, and an open MiniApp platform.</p>
          <span>No competitor assets, layouts, or copy are used.</span>
        </div>
        <div className="mentra-benchmark__moves">
          {benchmarkMoves.map(([principle, response], index) => (
            <article key={principle}><span>0{index + 1}</span><strong>{principle}</strong><p>{response}</p></article>
          ))}
        </div>
      </div>

      <div className="mentra-source-grid">
        <article className="mentra-source-card mentra-source-card--ad">
          <img src="/Assets/Projects/mentra-brand/photos/ad-stream.webp" alt="Mentra Stream Your World campaign concept" loading="lazy" />
          <p><span>01 · Stream</span><strong>Lead with a moment worth keeping.</strong></p>
        </article>
        <article className="mentra-source-card mentra-source-card--ad">
          <img src="/Assets/Projects/mentra-brand/photos/ad-hear.webp" alt="Mentra Hear Your Audio Hear the World campaign concept" loading="lazy" />
          <p><span>02 · Hear</span><strong>Show audio without visual isolation.</strong></p>
        </article>
        <article className="mentra-source-card mentra-source-card--ad">
          <img src="/Assets/Projects/mentra-brand/photos/ad-4.webp" alt="Mentra Focus campaign concept with smart glasses shown on a person" loading="lazy" />
          <p><span>03 · Focus</span><strong>Turn an attention tension into a product desire.</strong></p>
        </article>
        <article className="mentra-source-card mentra-source-card--os">
          <img src="/Assets/images/mentra/os-all-apps.png" alt="MentraOS applications interface" loading="lazy" />
          <p><span>04 · Build</span><strong>Close on an ecosystem that can keep expanding.</strong></p>
        </article>
      </div>

      <div className="mentra-token-grid" aria-label="Mentra motion timing tokens">
        {tokens.map(([name, timing, use], index) => (
          <article key={name}><span>0{index + 1}</span><small>{name}</small><strong>{timing}</strong><p>{use}</p></article>
        ))}
      </div>

      <div className="mentra-format-map">
        <div className="mentra-format-map__copy">
          <small>Paid-social composition</small>
          <h3>One campaign. Different attention conditions.</h3>
          <p>The horizontal master carries the complete moment-to-platform story. The vertical spot begins on the human hook, enlarges one benefit, and reserves a stable lower zone for product and action.</p>
        </div>
        <figure className="mentra-format mentra-format--wide">
          <img src="/Assets/Projects/mentra-brand/photos/render-both-frames.webp" alt="Mentra product render in a horizontal delivery frame" loading="lazy" />
          <i aria-hidden="true" /><figcaption>16:9 · campaign master</figcaption>
        </figure>
        <figure className="mentra-format mentra-format--vertical">
          <img src="/Assets/Projects/mentra-brand/photos/ad-stream.webp" alt="Stream Your World Mentra campaign in a vertical delivery frame" loading="lazy" />
          <i aria-hidden="true" /><figcaption>9:16 · single-benefit spot</figcaption>
        </figure>
      </div>
    </>
  )
}

function MentraAeStack() {
  const rows = [
    ['00_MASTER_CAMPAIGN', '3840 × 2160 · 450 frames', 'Master'],
    ['01_HOOK_FAMILY', 'Stream · Hear · Focus · Build', 'Controls'],
    ['02_LIFE_MOMENT', 'People · eyewear · focal zones', 'Protected'],
    ['03_PRODUCT_AND_OS', 'Wear · macro · exploded · apps', 'Pre-comp'],
    ['04_TYPE_CAPTIONS_CTA', 'Benefit · subtitles · action', 'Editable'],
    ['90_PAID_SOCIAL_SET', '16:9 · 4:5 · 1:1 · 9:16', 'Inherited'],
  ]

  return (
    <div className="motion-ae-stack" aria-label="Mentra After Effects launch-system structure">
      <div className="motion-ae-stack__head"><span>After Effects project map</span><span>Motion-system specification</span></div>
      {rows.map(([name, contents, kind], index) => (
        <div className="motion-ae-stack__row" key={name}>
          <i style={{ '--row-color': index === 0 ? '#00b869' : index === rows.length - 1 ? '#62d7ff' : '#79d6a8' } as CSSProperties} />
          <code>{name}</code><span>{contents}</span><small>{kind}</small>
        </div>
      ))}
    </div>
  )
}

function TransfiCommunicationBrief() {
  const items = [
    ['Audience', 'Merchant, growth, and operations teams evaluating whether a global payment flow feels understandable and trustworthy.'],
    ['Communication job', 'Explain one payment from customer intent to confirmed delivery without turning the infrastructure into a black box.'],
    ['Product proof', 'Real checkout, payment-method, verification, order-status, and dashboard frames from the TransFi product work.'],
    ['Delivery constraint', 'Amounts and statuses must stay readable across social crops, sound-off playback, pauses, and localized currency variants.'],
  ]
  const states = [
    ['01', 'Choose', 'Amount + currency'],
    ['02', 'Connect', 'Wallet address'],
    ['03', 'Authorize', 'Payment method'],
    ['04', 'Verify', 'Identity state'],
    ['05', 'Track', 'Order progress'],
    ['06', 'Confirm', 'Delivery + record'],
  ]

  return (
    <>
      <div className="mentra-brief-grid transfi-brief-grid">
        {items.map(([label, value], index) => (
          <article key={label}><span>0{index + 1}</span><small>{label}</small><p>{value}</p></article>
        ))}
      </div>
      <div className="transfi-state-model" aria-label="TransFi transaction state model">
        <p>Transaction model</p>
        <div>
          {states.map(([num, title, detail]) => (
            <article key={num}><span>{num}</span><strong>{title}</strong><small>{detail}</small></article>
          ))}
        </div>
      </div>
    </>
  )
}

function TransfiMotionSystem() {
  const tokens = [
    ['Brand signal', '560–720 ms', 'Mark assembly and chapter open'],
    ['State change', '240–360 ms', 'Panel handoff and progress advance'],
    ['Data update', '160–220 ms', 'Amount, method, and status replacement'],
    ['Proof hold', '1.4–2.0 sec', 'Fee breakdown, verification, and confirmation'],
  ]
  const stateRules = [
    ['Awaiting input', 'Blue focus ring', 'Only the next available action moves.'],
    ['Processing', 'Cyan route', 'Progress advances; the amount stays fixed.'],
    ['Needs attention', 'Amber hold', 'Pause on the relevant field—never shake the whole screen.'],
    ['Completed', 'Green + timestamp', 'One firm settle, then enough time to verify the record.'],
  ]

  return (
    <>
      <div className="mentra-reference-bar">
        <div><small>Research translated into the system</small><strong>Treat money as state—not spectacle.</strong></div>
        <a href="https://www.transfi.com/solutions/payment-gateway" target="_blank" rel="noreferrer">Product truth / global payment flow ↗</a>
        <a href="https://wise.design/foundations/motion-system" target="_blank" rel="noreferrer">Financial motion / pace and weight ↗</a>
        <a href="https://wise.design/foundations/transitions" target="_blank" rel="noreferrer">Transition continuity / spatial logic ↗</a>
      </div>

      <div className="mentra-source-grid transfi-source-grid">
        <article className="mentra-source-card mentra-source-card--os transfi-source-card">
          <img src="/Assets/Projects/Transfi/public/Group 1000004741.png" alt="TransFi currency-selection product visual" loading="lazy" />
          <p><span>01 · Intent</span><strong>Currency choice gives the story a concrete starting point.</strong></p>
        </article>
        <article className="mentra-source-card mentra-source-card--os transfi-source-card">
          <img src="/Assets/Projects/Transfi/public/Frame 427318638.png" alt="TransFi buy-crypto widget with currency and asset selectors" loading="lazy" />
          <p><span>02 · Choice</span><strong>Real interface states show what the customer actually controls.</strong></p>
        </article>
        <article className="mentra-source-card transfi-source-card transfi-source-card--journey">
          <img src="/Assets/Projects/Transfi/public/Frame 427318646.png" alt="TransFi six-step checkout and delivery journey" loading="lazy" />
          <p><span>03 · Route</span><strong>The six shipped screens become one continuous transaction path.</strong></p>
        </article>
        <article className="mentra-source-card mentra-source-card--os transfi-source-card transfi-source-card--summary">
          <img src="/Assets/Projects/Transfi/public/Order Summary.png" alt="TransFi order summary with fees and delivery status" loading="lazy" />
          <p><span>04 · Evidence</span><strong>The resolved record—not confetti—is the payoff.</strong></p>
        </article>
      </div>

      <div className="mentra-token-grid" aria-label="TransFi motion timing tokens">
        {tokens.map(([name, timing, use], index) => (
          <article key={name}><span>0{index + 1}</span><small>{name}</small><strong>{timing}</strong><p>{use}</p></article>
        ))}
      </div>

      <div className="transfi-state-rules" aria-label="TransFi state motion behavior">
        <div><small>Status logic</small><h3>Motion changes with transaction risk.</h3><p>A new state is not automatically a new animation. Behavior depends on whether the customer should act, wait, inspect, or trust that the payment is complete.</p></div>
        <section>
          {stateRules.map(([state, signal, behavior]) => (
            <article key={state}><strong>{state}</strong><span>{signal}</span><p>{behavior}</p></article>
          ))}
        </section>
      </div>

      <div className="mentra-format-map transfi-format-map">
        <div className="mentra-format-map__copy">
          <small>Responsive composition</small>
          <h3>Protect the amount and the next action.</h3>
          <p>The horizontal master can show the customer journey and merchant context together. The vertical cut follows one state at a time, keeps the amount in the upper third, and reserves the lower zone for the active action or confirmation.</p>
        </div>
        <figure className="mentra-format mentra-format--wide transfi-format transfi-format--wide">
          <img src="/Assets/Projects/Transfi/public/Frame 427318646.png" alt="TransFi transaction journey in a horizontal delivery frame" loading="lazy" />
          <i aria-hidden="true" /><figcaption>16:9 · end-to-end master</figcaption>
        </figure>
        <figure className="mentra-format mentra-format--vertical transfi-format transfi-format--vertical">
          <img src="/Assets/Projects/Transfi/public/Order Summary.png" alt="TransFi order summary in a vertical delivery frame" loading="lazy" />
          <i aria-hidden="true" /><figcaption>9:16 · status story</figcaption>
        </figure>
      </div>
    </>
  )
}

function TransfiAeStack() {
  const rows = [
    ['00_MASTER_TRANSACTION', '1920 × 1080 · 540 frames', 'Master'],
    ['01_AMOUNT_ANCHOR', 'Value · fiat · asset · rate', 'Controls'],
    ['02_STATE_ROUTE', 'Progress · chapter · final fold', 'Shape rig'],
    ['03_PRODUCT_STATES', 'Checkout · KYC · order · dashboard', 'Protected'],
    ['04_TYPE_CAPTIONS_AUDIO', 'Benefit · status · sound-off copy', 'Editable'],
    ['90_DELIVERY_SET', '16:9 · 4:5 · 1:1 · 9:16', 'Inherited'],
  ]

  return (
    <div className="motion-ae-stack" aria-label="TransFi After Effects transaction-story structure">
      <div className="motion-ae-stack__head"><span>After Effects project map</span><span>Motion-system specification</span></div>
      {rows.map(([name, contents, kind], index) => (
        <div className="motion-ae-stack__row" key={name}>
          <i style={{ '--row-color': index === 0 ? '#48d8ff' : index === rows.length - 1 ? '#35b878' : '#2458e6' } as CSSProperties} />
          <code>{name}</code><span>{contents}</span><small>{kind}</small>
        </div>
      ))}
    </div>
  )
}

function MotionLanding() {
  return (
    <div className="motion-index-page category-page">
      <Helmet>
        <title>Motion Design · Parth Pawar</title>
        <meta name="description" content="Motion direction and animation systems for AI products, hardware launches, identity, and social GTM storytelling." />
        <meta property="og:title" content="Motion Design · Parth Pawar" />
        <meta property="og:description" content="Four motion case studies grounded in real product, brand, campaign, and editorial work." />
        <link rel="canonical" href="https://designwhich.works/motion" />
      </Helmet>
      <Nav />
      <main id="main-content">
        <div className="wrap">
          <section className="motion-index-hero">
            <p className="motion-index-hero__eyebrow"><i aria-hidden="true" /> Motion design</p>
            <div className="motion-index-hero__copy">
              <span>Motion<br />Direction</span>
              <h1>Motion systems that make complex products easier to understand.</h1>
            </div>
            <div className="motion-index-hero__bottom">
              <a href="#lp-work" className="motion-index-hero__link figma-hover">See work <span aria-hidden="true">↓</span></a>
              <dl>
                <div><dt>04</dt><dd>Case studies</dd></div>
                <div><dt>2D + 3D</dt><dd>Motion craft</dd></div>
                <div><dt>AE</dt><dd>Production system</dd></div>
              </dl>
            </div>
          </section>

          <section id="lp-work" className="motion-index-work">
            <p className="lp-section-label">Flagship motion study</p>
            <Reveal>
              <ProjectCard
                slug={`motion/${projects[0].path}`}
                name={projects[0].cardTitle}
                image={projects[0].heroImage}
                tag={projects[0].discipline}
                year={projects[0].year}
                desc={projects[0].descriptor}
                featured
                loading="eager"
              />
            </Reveal>

            <p className="lp-section-label motion-index-work__secondary-label">Selected motion systems &amp; editorial work</p>
            <div className="pcard-masonry motion-index-card-grid">
              {projects.slice(1).map((project) => (
                <Reveal key={project.key}>
                  <ProjectCard
                    slug={`motion/${project.path}`}
                    name={project.cardTitle}
                    image={project.heroImage}
                    hoverMediaSrc={project.key === 'transfi' ? transfiMotion : undefined}
                    hoverMediaKind="image"
                    tag={project.discipline}
                    year={project.year}
                    desc={project.descriptor}
                    coverShape="square"
                  />
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal>
            <section className="motion-index-proposal" aria-labelledby="motion-proposal-title">
              <div>
                <p className="lp-section-label">Current creative-studio study</p>
                <h2 id="motion-proposal-title">A motion system for products that think in public.</h2>
              </div>
              <div>
                <p>An independent response to Perplexity’s Motion Designer role: one product-true launch prototype, three GTM territories, and a reusable After Effects production system.</p>
                <a className="figma-hover" href="/perplexity">View the Perplexity study <span aria-hidden="true">↗</span></a>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="motion-index-method" aria-labelledby="motion-method-title">
              <p className="lp-section-label">How the work is built</p>
              <div className="motion-index-method__heading">
                <h2 id="motion-method-title">From product truth to a reusable motion system.</h2>
                <p>The goal is not one dramatic reel. It is a clear story, a controlled After Effects build, and a family of outputs the team can continue using.</p>
              </div>
              <div className="motion-index-method__grid">
                {[
                  ['01', 'Find the sentence', 'Define the audience, communication job, and one idea the edit must make clearer.'],
                  ['02', 'Build the beats', 'Order real product and brand artifacts into a readable storyboard before polishing movement.'],
                  ['03', 'Animate hierarchy', 'Use timing, spacing, composition, and sound to direct attention—not to decorate every frame.'],
                  ['04', 'Design the family', 'Structure the master for crops, cutdowns, captions, templates, and future versioning.'],
                ].map(([num, title, body]) => (
                  <article key={num}><span>{num}</span><h3>{title}</h3><p>{body}</p></article>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function DecisionList({ decisions }: { decisions: MotionProject['decisions'] }) {
  return (
    <div className="motion-decision-list">
      {decisions.map((decision, index) => (
        <article key={decision.kept}>
          <span>0{index + 1}</span>
          <div><small>Removed</small><p>{decision.removed}</p></div>
          <b aria-hidden="true">→</b>
          <div><small>Kept</small><h3>{decision.kept}</h3><p>{decision.reason}</p></div>
        </article>
      ))}
    </div>
  )
}

function MotionCaseStudy({ project, motionOn }: { project: MotionProject; motionOn: boolean }) {
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length]
  const style = { '--project-color': project.color } as CSSProperties
  const isVishwa = project.key === 'vishwa'
  const isMentra = project.key === 'mentra'
  const isTransfi = project.key === 'transfi'
  const hasBrief = isVishwa || isMentra || isTransfi
  const hasSystemSection = isVishwa || isMentra || isTransfi
  const hasSourceVideoSection = isMentra || isTransfi
  const sectionNumber = (number: number, afterSystem = false, afterSourceVideo = false) => String(number + (hasBrief ? 1 : 0) + (afterSystem && hasSystemSection ? 1 : 0) + (afterSourceVideo && hasSourceVideoSection ? 1 : 0)).padStart(2, '0')

  return (
    <>
      <Helmet>
        <title>{project.title} · Motion Design · Parth Pawar</title>
        <meta name="description" content={project.descriptor} />
        <meta property="og:title" content={`${project.title} · Motion Design`} />
        <meta property="og:description" content={project.descriptor} />
        <meta property="og:image" content={`https://designwhich.works${project.heroImage}`} />
        <link rel="canonical" href={`https://designwhich.works/motion/${project.path}`} />
      </Helmet>
      <Nav />
      <main id="main-content" className={`project-main motion-project-main motion-project-main--${project.key}`} style={style}>
        <ProjectHeader
          backLink="/motion"
          backLabel="Back to Motion"
          categorySlug={project.categorySlug}
          tags={[project.discipline, ...project.roles.slice(0, 2)]}
          title={project.title}
          subtitle={project.descriptor}
          info={[
            { label: 'Role', value: project.roles.join(' · ') },
            { label: 'Year', value: project.year },
            { label: 'Scope', value: project.outputs.join(' · ') },
            { label: 'Status', value: isMentra ? 'Documented advertising system · real Mentra source assets' : isVishwa ? 'Original campaign archive · Creative Director, 2019–21' : 'Documented motion system · shipped product sources' },
          ]}
          heroExperience="visual"
          heroEyebrow="Selected motion study"
          visualHeadline={project.intro}
          visualHeroImage={project.heroImage}
          visualHeroAlt={project.heroAlt}
          visualHeroMedia={isVishwa ? <VishwaReel motionOn={motionOn} /> : undefined}
          heroTone="motion"
          showHeaderSummary={false}
        />

        <ProjectOverview sections={[
          { label: 'The challenge', content: project.challenge },
          { label: 'Motion direction', content: project.move },
          { label: 'System outcome', content: project.outcome },
        ]} />

        {isVishwa && (
          <CsSection id="motion-brief" label="01 — Campaign brief" title="Build anticipation, then keep earning attention until event day.">
            <CsBody>
              <p>VishwaConclave needed more than an annual look. The campaign had to introduce an idea, establish cultural credibility, reveal the people and programme behind it, and create urgency—while a student team continued producing at social speed.</p>
            </CsBody>
            <VishwaCampaignBrief />
          </CsSection>
        )}

        {isMentra && (
          <CsSection id="motion-brief" label="01 — Advertising brief" title="Make the moment desirable before making the technology impressive.">
            <CsBody>
              <p>The advertising story has to answer four questions in order: do I recognize this moment, would I wear these glasses, what can they do for me, and why does the open platform matter? The brief turns those questions into a campaign ladder rather than a specification montage.</p>
            </CsBody>
            <MentraCommunicationBrief />
          </CsSection>
        )}

        {isTransfi && (
          <CsSection id="motion-brief" label="01 — Communication brief" title="Make one complex payment feel observable from intent to delivery.">
            <CsBody>
              <p>The story has to communicate both sides of trust: the customer understands the next action, and the merchant can see what happened. The brief converts the product flow into six visible states instead of hiding complexity behind generic speed claims.</p>
            </CsBody>
            <TransfiCommunicationBrief />
          </CsSection>
        )}

        <CsSection id="motion-story" label={`${sectionNumber(1)} — Storyboard`} title={project.storyTitle}>
          <CsBody><p>{isVishwa ? 'The storyboard was not only a shot list; it was the release order of the campaign. Each phase had a different communication job, and the pacing became more direct as the event moved closer.' : isMentra ? 'The 15-second master opens on a life moment, moves through wearability and one capability, then earns the right to show hardware and MentraOS. Expressive movement hooks attention; quieter product holds provide proof; one stable message closes the advertisement.' : 'The 18-second master follows one illustrative transaction. The amount anchors the sequence; customer actions advance it; verification and settlement receive longer holds because those are the moments where trust is either earned or lost.'}</p></CsBody>
          {!isVishwa && (
            <div className="motion-case-preview">
              <ProjectReel project={project} motionOn={motionOn} />
              <p><span>{isMentra ? '15-second advertising-system prototype' : '18-second transaction-system prototype'}</span><span>{isTransfi ? 'Illustrative values from source UI · reduced-motion respected' : 'Real Mentra campaign assets · reduced-motion respected'}</span></p>
            </div>
          )}
          <CsSteps steps={project.beats.map((beat) => ({ num: beat.time, title: beat.title, desc: beat.body }))} />
        </CsSection>

        {isVishwa && (
          <CsSection id="campaign-archive" label="03 — Original campaign archive" title="The process is visible in the work that actually shipped.">
            <CsBody>
              <p>Rather than reconstructing fake sketches or an invented approval trail, this section uses the official 2020–21 Instagram archive. It shows how the campaign moved from cinematic theme-building into practical launch communication.</p>
            </CsBody>
            <VishwaCampaignArchive />
          </CsSection>
        )}

        {isMentra && (
          <CsSection id="motion-system" label="03 — Advertising strategy & motion grammar" title="Human first. Wearable second. Technical only when it proves the promise.">
            <CsBody>
              <p>Even Realities is used here as a category benchmark because its advertising gives everyday situations, familiar eyewear, and one human advantage priority over specifications. Mentra adapts that hierarchy to its own truth—first-person capture, open-ear audio, and an open platform—without borrowing competitor visuals or copy.</p>
            </CsBody>
            <MentraMotionSystem />
          </CsSection>
        )}

        {isTransfi && (
          <CsSection id="motion-system" label="03 — Motion grammar" title="Fast enough to feel responsive. Stable enough to trust.">
            <CsBody>
              <p>The research produced a transaction grammar rather than an effects board: natural weight for financial motion, spatial continuity between steps, one persistent amount, and different behaviors for waiting, processing, attention, and completed states.</p>
            </CsBody>
            <TransfiMotionSystem />
          </CsSection>
        )}

        {isMentra && (
          <CsSection id="source-video" label="04 — Source footage" title="The product footage is real. The proposed edit stays clearly labeled.">
            <CsBody>
              <p>The strongest campaign route is to cut from approved footage instead of simulating a product that already exists. These films establish the available visual truth; the storyboard above defines how I would reorganize that material into the Moment → Wear → Use → Extend advertising sequence.</p>
            </CsBody>
            <MentraVideoEvidence />
          </CsSection>
        )}

        {isTransfi && (
          <CsSection id="source-video" label="04 — Motion archive" title="Original identity motion, paired with the brand’s current product context.">
            <CsBody>
              <p>The archive contains one original animated identity study rather than a fabricated campaign reel. Pairing it with TransFi’s current official film shows the gap the proposed transaction story is designed to solve: move from broad infrastructure energy into a legible, state-by-state explanation of the product.</p>
            </CsBody>
            <TransfiVideoEvidence />
          </CsSection>
        )}

        <CsSection id="art-direction" label={`${sectionNumber(2, true, true)} — Art direction`} title={project.artTitle}>
          <CsBody><p>{project.artNote}</p></CsBody>
          <div className="motion-frame-grid">
            {project.frames.map((frame) => (
              <figure className={frame.fit === 'contain' ? 'is-contain' : ''} key={frame.src}>
                <div><img src={frame.src} alt={frame.alt} loading="lazy" /></div>
                <figcaption>{frame.caption}</figcaption>
              </figure>
            ))}
          </div>
          <CsInfoGrid items={project.principles.map((principle) => ({ key: principle.label, value: principle.value }))} />
        </CsSection>

        <CsSection id="motion-decisions" label={`${sectionNumber(3, true, true)} — Motion decisions`} title={isVishwa ? 'Specific choices, tied to the campaign' : isMentra ? 'Specific choices, tied to the advertising story' : 'Specific choices, tied to transaction trust'}>
          <CsBody><p>{isVishwa ? 'The same campaign could be atmospheric or informational because the motion rules were attached to communication jobs, not to a single visual effect.' : isMentra ? 'Every decision protects the advertising hierarchy: desire first, proof second, platform third. The system avoids category clichés that make the brand louder while making the human benefit less specific.' : 'Every decision protects continuity, comprehension, or confidence. The system removes familiar fintech effects whenever they make the actual product journey less observable.'}</p></CsBody>
          <DecisionList decisions={project.decisions} />
        </CsSection>

        <CsSection id="after-effects" label={`${sectionNumber(4, true, true)} — After Effects build`} title="An editable master, not a mysterious hero file">
          <CsBody>
            <p>{isVishwa ? 'The original media survives; the old team project file is not presented as a current deliverable. This is a documented After Effects rebuild showing how I would now organize the campaign for faster iteration, specialist collaboration, and consistent social versions.' : isMentra ? 'This build plan turns the advertising grammar into a reusable campaign tool: one master hierarchy, a swappable Stream/Hear/Focus/Build hook family, protected lifestyle and product modules, and paid-social compositions that inherit timing instead of duplicating it.' : 'This build plan turns one transaction into an editable GTM tool: a persistent amount controller, a six-marker state route, protected product pre-comps, localized copy fields, and delivery versions that inherit the same timing instead of recreating it.'}</p>
          </CsBody>
          <div className="motion-ae-callout">
            <span>Ae</span>
            <div><strong>Production spine</strong><p>{isVishwa ? 'Illustrator and Photoshop source art → After Effects type, camera, compositing, and modular content pre-comps → Premiere edit and audio → Media Encoder delivery set.' : isMentra ? 'Photoshop campaign frames + Illustrator identity vectors + Blender render passes + Figma MentraOS states → After Effects campaign rig, captions, and responsive versions → Premiere sound edit → Media Encoder delivery.' : 'Illustrator identity vectors + Figma checkout and dashboard states → After Effects route rig, amount controls, compositing, and captions → Premiere sound edit → Media Encoder delivery.'}</p></div>
          </div>
          {isVishwa && <VishwaAeStack />}
          {isMentra && <MentraAeStack />}
          {isTransfi && <TransfiAeStack />}
          <CsSteps steps={project.aeBuild.map((item, index) => ({ num: `0${index + 1}`, title: `${item.layer} · ${item.technique}`, desc: item.purpose }))} />
          <CsInfoGrid items={project.deliveries} />
        </CsSection>

        <CsSection id="scope" label={`${sectionNumber(5, true, true)} — Scope & authorship`} title="Clear about what is shipped and what is studied">
          <CsBody><p>{project.truthNote}</p></CsBody>
          <ul className="motion-output-list">
            {project.outputs.map((output) => <li key={output}>{output}<span aria-hidden="true">↗</span></li>)}
          </ul>
        </CsSection>

        <NextProject
          slug={`motion/${nextProject.path}`}
          title={nextProject.cardTitle}
          image={nextProject.heroImage}
        />
        <BottomNav sections={[
          ...(hasBrief ? [{ id: 'motion-brief', label: 'Brief' }] : []),
          { id: 'motion-story', label: 'Storyboard' },
          ...(isVishwa ? [{ id: 'campaign-archive', label: 'Archive' }] : []),
          ...(isMentra || isTransfi ? [{ id: 'motion-system', label: 'Motion system' }] : []),
          ...(hasSourceVideoSection ? [{ id: 'source-video', label: 'Footage' }] : []),
          { id: 'art-direction', label: 'Art direction' },
          { id: 'motion-decisions', label: 'Decisions' },
          { id: 'after-effects', label: 'After Effects' },
        ]} />
      </main>
      <Footer />
    </>
  )
}

export default function MotionPage() {
  const { pathname } = useLocation()
  const motionOn = useMotionPreference()
  const childPath = pathname.replace(/^\/motion\/?/, '').replace(/\/$/, '')
  const project = useMemo(() => projects.find((item) => item.path === childPath), [childPath])

  if (!childPath) return <MotionLanding />
  if (childPath === 'clawed-agent-story') return <Navigate to="/motion/vishwa-conclave-motion" replace />
  if (!project) return <Navigate to="/motion" replace />
  if (project.key === 'editorial') return <EditingMotionCaseStudy />
  return <MotionCaseStudy project={project} motionOn={motionOn} />
}
