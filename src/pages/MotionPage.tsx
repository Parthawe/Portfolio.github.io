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
import transfiMotion from '../../Assets/Projects/cover/Transfi.gif'
import '../styles/motion.css'

type ProjectKey = 'vishwa' | 'mentra' | 'transfi'

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
    title: 'Mentra — From Mark to Point of View',
    cardTitle: 'Mentra: From mark to point of view',
    descriptor: 'A modular launch-motion system connecting the shipped identity, AI glasses, first-person capture, and MentraOS without losing product clarity.',
    discipline: 'Hardware motion / GTM system',
    year: '2025–26',
    color: '#00b869',
    categorySlug: 'brand-visual',
    heroImage: '/Assets/Projects/mentra-brand/photos/render-both-frames.webp',
    heroAlt: 'Black and transparent Mentra smart glasses product renders',
    intro: 'The brand moves like the product behaves: capture, reveal, return to the world.',
    truthNote: 'The identity, packaging, product renders, campaign assets, MentraOS interfaces, and logo-animation frames are from my shipped Mentra work. The launch sequence and After Effects architecture documented here are a portfolio motion system built from those real sources—not a claim that one finished campaign film shipped in this exact form or produced unverified performance results.',
    challenge: 'Mentra has to feel credible as hardware, useful as an everyday camera, and open as a developer platform. A fast social edit can easily flatten those three stories into a feature montage or make the glasses feel like an abstract AI prop.',
    move: 'Give every asset one communication job. The mark establishes behavior, macro renders prove the hardware, first-person footage explains the benefit, and MentraOS closes on the ecosystem. Expressive motion earns attention at chapter changes; productive motion keeps UI and copy readable.',
    outcome: 'One 15-second master becomes a three-second ident, a six-second hardware reveal, vertical feature stories, MiniApp announcements, and a protected end-card family without inventing a new transition for every launch.',
    roles: ['Brand direction', 'Motion system', 'Storyboard', '3D direction', 'Template architecture'],
    storyTitle: 'Signal. Build. See. Extend.',
    artTitle: 'One diagonal behavior, four layers of product truth',
    artNote: 'The mark supplies the angle and direction, the renders supply physical proof, real campaign imagery supplies the human point of view, and MentraOS supplies the system layer. Green appears as a signal—not a wash over every frame.',
    beats: [
      { time: '00:00', title: 'Signal', body: 'One folded plane establishes direction before the complete mark arrives.' },
      { time: '00:02', title: 'Build', body: 'The mark’s three parts become a reveal path for the physical glasses.' },
      { time: '00:05', title: 'Prove', body: 'Macro and exploded renders hold long enough to establish real hardware detail.' },
      { time: '00:08', title: 'See', body: 'A first-person frame answers the most important question: what does this let me experience?' },
      { time: '00:11', title: 'Extend', body: 'MentraOS and MiniApp states show that the hardware is a platform, not a closed demo.' },
      { time: '00:14', title: 'Sign off', body: 'The mark returns with one launch message and a stable call to action.' },
    ],
    principles: [
      { label: 'Continuity', value: 'The mark’s 28° diagonal guides every major transition' },
      { label: 'Expression', value: 'Reserved for ident, product reveal, and chapter changes' },
      { label: 'Productivity', value: 'Short, precise motion for UI, captions, and feature proof' },
      { label: 'Accessibility', value: 'Static hierarchy survives sound-off and reduced-motion playback' },
    ],
    frames: [
      { src: '/Assets/Projects/mentra-brand/photos/logo-animation-3.png', alt: 'Mentra logo-animation frame made from folded green planes', caption: '01 — Identity signal', fit: 'contain' },
      { src: '/Assets/Projects/mentra-brand/photos/render-exploded.webp', alt: 'Exploded Mentra Live smart-glasses render showing product components', caption: '02 — Hardware proof', fit: 'cover' },
      { src: '/Assets/Projects/mentra-brand/photos/text-bubble-1.webp', alt: 'Mentra Live in use with a speech bubble overlay', caption: '03 — Human point of view', fit: 'cover' },
      { src: '/Assets/images/mentra/os-all-apps.png', alt: 'MentraOS interface showing available smart-glasses applications', caption: '04 — Platform layer', fit: 'contain' },
    ],
    decisions: [
      { removed: 'A 3D logo spin', kept: 'Three planes assembling on one route', reason: 'The movement teaches how the mark is built and creates a reusable transition path.' },
      { removed: 'A rapid feature montage', kept: 'One proof layer per chapter', reason: 'Hardware, point of view, and ecosystem each need enough time to be understood.' },
      { removed: 'Floating HUD decoration', kept: 'Real MentraOS states', reason: 'Product truth is more credible than generic interface graphics added in post.' },
      { removed: 'Elastic overshoot', kept: 'A fast arrival and firm settle', reason: 'The glasses should feel lightweight and responsive, not toy-like.' },
    ],
    aeBuild: [
      { layer: '00_MASTER_15S', technique: '3840×2160 · 30 fps · chapter markers', purpose: 'The master edit protects the mark → hardware → POV → ecosystem narrative.' },
      { layer: '01_MARK_ROUTE', technique: 'Shape layers + null controls', purpose: 'One angle, stagger, and settle control the ident and major scene wipes.' },
      { layer: '02_PRODUCT_STAGE', technique: 'Render passes + track mattes', purpose: 'Black, clear, macro, and exploded variants can swap without changing timing.' },
      { layer: '03_POV_AND_OS', technique: 'Protected media pre-comps', purpose: 'First-person footage and real product states retain legible focal zones.' },
      { layer: '90_DELIVERY_SET', technique: 'Responsive comps + Essential Graphics', purpose: 'Copy, CTA, colorway, captions, and crops remain editable for the launch team.' },
    ],
    deliveries: [
      { key: '03 seconds', value: 'Ident / end card / partner badge' },
      { key: '06 seconds', value: 'Mark → hardware reveal' },
      { key: '15 seconds', value: 'Hardware → POV → ecosystem launch story' },
      { key: 'Formats', value: '16:9 / 4:5 / 1:1 / 9:16' },
    ],
    outputs: ['Logo ident', 'Hardware reveal', 'Feature story', 'MiniApp launch template'],
  },
  {
    key: 'transfi',
    path: 'transfi-identity-motion',
    title: 'TransFi Identity in Motion',
    cardTitle: 'TransFi: Trust at transaction speed',
    descriptor: 'An identity-motion study connecting one directional mark to merchant-product states and a confirmed transaction.',
    discipline: 'Identity motion / Product launch',
    year: '2022',
    color: '#48d8ff',
    categorySlug: 'fintech',
    heroImage: '/Assets/mockups/projects/transfi-project_16x9.webp',
    heroAlt: 'TransFi identity, merchant dashboard, and customer checkout presentation',
    intro: 'Using direction for momentum and restraint for financial confidence.',
    truthNote: 'The animated mark and merchant interface come from my original TransFi design work. This page reframes those existing artifacts as a concise motion study; confidential campaign performance and internal production files are not claimed.',
    challenge: 'Fintech motion often adds speed without adding understanding. The edit needed to connect a recognizable identity to dense merchant tooling while keeping amounts and transaction states calm and legible.',
    move: 'Let the folded mark establish one left-to-right route, then use that same vector to reveal product layers. Values decelerate into place instead of bouncing or spinning.',
    outcome: 'Brand energy and product credibility can share the same edit: a clear opening signal, an ordered dashboard reveal, and an unmistakable settled state.',
    roles: ['Identity design', 'Motion study', 'Product design', 'Art direction', 'GTM framing'],
    storyTitle: 'Signal. Route. Explain. Settle.',
    artTitle: 'One continuous route from brand signal to product proof',
    artNote: 'The folded identity provides direction, while real merchant interfaces carry the evidence. Cyan is reserved for the route and state confirmation.',
    beats: [
      { time: '00:00', title: 'Signal', body: 'The folded mark creates a fast, recognizable opening.' },
      { time: '00:02', title: 'Route', body: 'Its direction becomes the path into the merchant product.' },
      { time: '00:05', title: 'Explain', body: 'Dashboard layers enter in the order a merchant needs them.' },
      { time: '00:09', title: 'Settle', body: 'The transaction resolves with a firm hold and no celebratory noise.' },
    ],
    principles: [
      { label: 'Direction', value: 'One continuous left-to-right route' },
      { label: 'Data', value: 'Firm deceleration and clear endpoints' },
      { label: 'Hierarchy', value: 'Status and amount before decoration' },
      { label: 'Sound', value: 'Transfer, verify, low confirmation tone' },
    ],
    frames: [
      { src: '/Assets/mockups/projects/transfi-project_16x9.webp', alt: 'TransFi identity and product presentation', caption: '01 — Brand signal', fit: 'cover' },
      { src: '/Assets/Projects/Transfi/public/Customer dashboard Users.png', alt: 'TransFi customer dashboard users interface', caption: '02 — Operational context', fit: 'cover' },
      { src: '/Assets/Projects/Transfi/public/Order Summary.png', alt: 'TransFi order summary with transaction status', caption: '03 — Product proof', fit: 'contain' },
    ],
    decisions: [
      { removed: 'Fast dashboard montage', kept: 'One continuous route', reason: 'Continuity makes a complex payment journey easier to follow.' },
      { removed: 'Elastic amount animation', kept: 'Firm deceleration and hold', reason: 'Financial values should feel resolved, not playful or uncertain.' },
      { removed: 'Technology spectacle', kept: 'Merchant-facing product proof', reason: 'Trust comes from readable states and confirmation.' },
    ],
    aeBuild: [
      { layer: 'IDENT_FOLD', technique: 'Vector paths + Graph Editor', purpose: 'The mark assembles with a precise curve and a non-elastic settle.' },
      { layer: 'ROUTE_LINE', technique: 'Trim Paths + expressions', purpose: 'One directional control connects the identity, route, and interface reveal.' },
      { layer: 'DASHBOARD_UI', technique: 'Pre-comps + null controls', purpose: 'Dense product surfaces reveal by decision priority instead of moving as one screenshot.' },
      { layer: 'DELIVERY_SET', technique: 'Responsive compositions', purpose: 'Protected UI and title zones survive horizontal, square, and vertical crops.' },
    ],
    deliveries: [
      { key: '06 seconds', value: 'Identity signal / social bumper' },
      { key: '15 seconds', value: 'Route → dashboard → confirmation' },
      { key: '30 seconds', value: 'Transaction explainer' },
      { key: 'Formats', value: '16:9 / 4:5 / 1:1 / 9:16' },
    ],
    outputs: ['Identity sting', 'Dashboard reveal', 'Transaction story', 'Social loop'],
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
    <div className="motion-preview motion-preview--mentra" role="img" aria-label="Mentra motion prototype moving from the identity to the smart glasses, first-person use, and MentraOS">
      <div className="motion-mentra__status" aria-hidden="true">
        <span>MENTRA LIVE / LAUNCH MASTER</span>
        <span>15 SEC · 30 FPS</span>
      </div>
      <div className="motion-mentra__chapter-labels" aria-hidden="true">
        <span>01 / SIGNAL</span><span>02 / HARDWARE</span><span>03 / POINT OF VIEW</span><span>04 / ECOSYSTEM</span>
      </div>
      <div className="motion-mentra__scene motion-mentra__scene--mark" aria-hidden="true">
        <div className="motion-mentra__mark-frames">
          <img src="/Assets/Projects/mentra-brand/photos/logo-animation-5.png" alt="" />
          <img src="/Assets/Projects/mentra-brand/photos/logo-animation-1.png" alt="" />
          <img src="/Assets/Projects/mentra-brand/photos/logo-animation-3.png" alt="" />
        </div>
        <strong>Move through the world.<br />Stay in the moment.</strong>
      </div>
      <div className="motion-mentra__scene motion-mentra__scene--hardware" aria-hidden="true">
        <span>Open hardware for everyday perspective</span>
        <img src="/Assets/Projects/mentra-brand/photos/render-both-frames.webp" alt="" />
        <i />
      </div>
      <div className="motion-mentra__scene motion-mentra__scene--pov" aria-hidden="true">
        <img src="/Assets/Projects/mentra-brand/photos/text-bubble-1.webp" alt="" />
        <div><small>FIRST-PERSON CAPTURE</small><strong>Stream your world.</strong></div>
      </div>
      <div className="motion-mentra__scene motion-mentra__scene--platform" aria-hidden="true">
        <img src="/Assets/images/mentra/os-all-apps.png" alt="" />
        <div><small>POWERED BY MENTRAOS</small><strong>Hardware becomes a platform.</strong><span>Build · install · extend</span></div>
      </div>
      <div className="motion-mentra__timeline" aria-hidden="true"><i /><span>MARK</span><span>BUILD</span><span>SEE</span><span>EXTEND</span></div>
    </div>
  )
}

function TransfiReel({ motionOn }: { motionOn: boolean }) {
  return (
    <div className="motion-preview motion-preview--transfi" role="img" aria-label="TransFi motion preview connecting the identity to the merchant dashboard">
      <div className="motion-transfi__mark" aria-hidden="true">
        <img src={motionOn ? transfiMotion : '/Assets/mockups/projects/transfi-project_16x9.webp'} alt="" />
      </div>
      <img className="motion-transfi__ui" src="/Assets/Projects/Transfi/public/Customer dashboard Users.png" alt="" aria-hidden="true" />
      <div className="motion-transfi__route" aria-hidden="true"><i /><i /><i /></div>
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
    ['Audience', 'Early adopters, creators, and developers who need to see a useful product—not “AI” as atmosphere.'],
    ['Communication job', 'Connect the physical glasses to first-person capture and the open MentraOS ecosystem in one short story.'],
    ['Product proof', 'Real renders, real use imagery, and real interface states—each with enough time to read.'],
    ['Delivery constraint', 'A repeatable social pipeline that works sound-off, across crops, without rebuilding every launch from zero.'],
  ]

  return (
    <>
      <div className="mentra-brief-grid">
        {items.map(([label, value], index) => (
          <article key={label}><span>0{index + 1}</span><small>{label}</small><p>{value}</p></article>
        ))}
      </div>
      <div className="mentra-story-ladder" aria-label="Mentra launch story sequence">
        <p>Proof ladder</p>
        <div>
          <span><small>Recognize</small><strong>Mark</strong></span>
          <i aria-hidden="true">→</i>
          <span><small>Believe</small><strong>Hardware</strong></span>
          <i aria-hidden="true">→</i>
          <span><small>Imagine</small><strong>Point of view</strong></span>
          <i aria-hidden="true">→</i>
          <span><small>Extend</small><strong>Ecosystem</strong></span>
        </div>
      </div>
    </>
  )
}

function MentraMotionSystem() {
  const tokens = [
    ['Expressive', '720–900 ms', 'Ident, product reveal, chapter change'],
    ['Transition', '320–480 ms', 'Diagonal wipe, crop change, media handoff'],
    ['Productive', '160–240 ms', 'Caption, UI state, feature confirmation'],
    ['Reading hold', '1.2–1.8 sec', 'Product detail, benefit, CTA'],
  ]

  return (
    <>
      <div className="mentra-reference-bar">
        <div><small>Research translated into the system</small><strong>Use motion to clarify utility, hierarchy, and continuity.</strong></div>
        <a href="https://about.fb.com/news/2023/09/new-ray-ban-meta-smart-glasses/" target="_blank" rel="noreferrer">Hardware launch / POV utility ↗</a>
        <a href="https://carbondesignsystem.com/elements/motion/overview/" target="_blank" rel="noreferrer">Expressive vs productive ↗</a>
        <a href="https://developer.apple.com/design/human-interface-guidelines/motion" target="_blank" rel="noreferrer">Purpose and accessibility ↗</a>
      </div>

      <div className="mentra-source-grid">
        <article className="mentra-source-card mentra-source-card--mark">
          <div>
            <img src="/Assets/Projects/mentra-brand/photos/logo-animation-5.png" alt="One plane from the Mentra logo construction" loading="lazy" />
            <img src="/Assets/Projects/mentra-brand/photos/logo-animation-1.png" alt="Three separated planes from the Mentra logo construction" loading="lazy" />
            <img src="/Assets/Projects/mentra-brand/photos/logo-animation-3.png" alt="Mentra glasses silhouette from the logo animation study" loading="lazy" />
          </div>
          <p><span>01 · Identity</span><strong>The diagonal becomes the transition rule.</strong></p>
        </article>
        <article className="mentra-source-card">
          <img src="/Assets/Projects/mentra-brand/photos/render-exploded.webp" alt="Exploded Mentra Live smart-glasses product render" loading="lazy" />
          <p><span>02 · Hardware</span><strong>Render passes provide physical evidence.</strong></p>
        </article>
        <article className="mentra-source-card">
          <img src="/Assets/Projects/mentra-brand/photos/text-bubble-1.webp" alt="Mentra Live shown in a real first-person use context" loading="lazy" />
          <p><span>03 · Perspective</span><strong>Real use explains the benefit faster than a spec list.</strong></p>
        </article>
        <article className="mentra-source-card mentra-source-card--os">
          <img src="/Assets/images/mentra/os-all-apps.png" alt="MentraOS applications interface" loading="lazy" />
          <p><span>04 · Ecosystem</span><strong>Product UI proves the platform story.</strong></p>
        </article>
      </div>

      <div className="mentra-token-grid" aria-label="Mentra motion timing tokens">
        {tokens.map(([name, timing, use], index) => (
          <article key={name}><span>0{index + 1}</span><small>{name}</small><strong>{timing}</strong><p>{use}</p></article>
        ))}
      </div>

      <div className="mentra-format-map">
        <div className="mentra-format-map__copy">
          <small>Responsive composition</small>
          <h3>Reframe the story, not just the crop.</h3>
          <p>The horizontal master keeps the physical product and benefit in one field. The vertical version promotes one use case, enlarges type, and moves the CTA into a protected lower zone.</p>
        </div>
        <figure className="mentra-format mentra-format--wide">
          <img src="/Assets/Projects/mentra-brand/photos/render-both-frames.webp" alt="Mentra product render in a horizontal delivery frame" loading="lazy" />
          <i aria-hidden="true" /><figcaption>16:9 · product launch master</figcaption>
        </figure>
        <figure className="mentra-format mentra-format--vertical">
          <img src="/Assets/Projects/mentra-brand/photos/ad-stream.webp" alt="Stream Your World Mentra campaign in a vertical delivery frame" loading="lazy" />
          <i aria-hidden="true" /><figcaption>9:16 · feature story</figcaption>
        </figure>
      </div>
    </>
  )
}

function MentraAeStack() {
  const rows = [
    ['00_MASTER_15S', '3840 × 2160 · 450 frames', 'Master'],
    ['01_MARK_ROUTE', 'Angle · stagger · settle', 'Controls'],
    ['02_PRODUCT_STAGE', 'Black · clear · macro · exploded', 'Pre-comp'],
    ['03_POV_AND_OS', 'Use footage · interface states', 'Protected'],
    ['04_TYPE_AND_CAPTIONS', 'Benefit · feature · CTA', 'Editable'],
    ['90_DELIVERY_SET', '16:9 · 4:5 · 1:1 · 9:16', 'Inherited'],
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

function MotionLanding() {
  return (
    <div className="motion-index-page category-page">
      <Helmet>
        <title>Motion Design · Parth Pawar</title>
        <meta name="description" content="Motion direction and animation systems for AI products, hardware launches, identity, and social GTM storytelling." />
        <meta property="og:title" content="Motion Design · Parth Pawar" />
        <meta property="og:description" content="Three motion case studies grounded in real product and brand work." />
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
                <div><dt>03</dt><dd>Case studies</dd></div>
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

            <p className="lp-section-label motion-index-work__secondary-label">Selected motion systems</p>
            <div className="motion-index-card-grid">
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
  const hasBrief = isVishwa || isMentra
  const hasSystemSection = isVishwa || isMentra
  const sectionNumber = (number: number, afterSystem = false) => String(number + (hasBrief ? 1 : 0) + (afterSystem && hasSystemSection ? 1 : 0)).padStart(2, '0')

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
            { label: 'Status', value: isMentra ? 'Documented motion system · shipped source assets' : isVishwa ? 'Original campaign archive · Creative Director, 2019–21' : 'Portfolio motion study' },
          ]}
          heroExperience="visual"
          heroEyebrow="Selected motion study"
          visualHeadline={project.intro}
          visualHeroImage={project.heroImage}
          visualHeroAlt={project.heroAlt}
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
          <CsSection id="motion-brief" label="01 — Communication brief" title="Make the glasses believable, then make the ecosystem feel inevitable.">
            <CsBody>
              <p>The launch story has to answer four questions in order: who is this, is the hardware real, what can I do with it, and why does an open platform matter? The motion brief turns those questions into a modular proof sequence rather than a list of specifications.</p>
            </CsBody>
            <MentraCommunicationBrief />
          </CsSection>
        )}

        <CsSection id="motion-story" label={`${sectionNumber(1)} — Storyboard`} title={project.storyTitle}>
          <CsBody><p>{isVishwa ? 'The storyboard was not only a shot list; it was the release order of the campaign. Each phase had a different communication job, and the pacing became more direct as the event moved closer.' : isMentra ? 'The 15-second master moves from recognition to proof. Expressive chapter changes earn attention; product renders, first-person use, and MentraOS states receive quieter holds so the viewer can understand what is being shown.' : project.move}</p></CsBody>
          <div className="motion-case-preview">
            <ProjectReel project={project} motionOn={motionOn} />
            <p><span>{isVishwa ? 'Original Instagram campaign film · 2020' : isMentra ? '15-second launch-system prototype' : 'Motion preview'}</span><span>{isVishwa ? 'Playback controls included' : 'Reduced-motion preference respected'}</span></p>
          </div>
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
          <CsSection id="motion-system" label="03 — Motion grammar" title="Expressive for launches. Productive for proof.">
            <CsBody>
              <p>The research did not produce a moodboard of effects. It produced roles for motion: point-of-view storytelling to communicate wearable utility, expressive movement for major launch moments, productive movement for interface clarity, and a static alternative whenever movement is reduced.</p>
            </CsBody>
            <MentraMotionSystem />
          </CsSection>
        )}

        <CsSection id="art-direction" label={`${sectionNumber(2, true)} — Art direction`} title={project.artTitle}>
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

        <CsSection id="motion-decisions" label={`${sectionNumber(3, true)} — Motion decisions`} title={isVishwa ? 'Specific choices, tied to the campaign' : isMentra ? 'Specific choices, tied to the hardware story' : 'Specific choices, tied to the product'}>
          <CsBody><p>{isVishwa ? 'The same campaign could be atmospheric or informational because the motion rules were attached to communication jobs, not to a single visual effect.' : isMentra ? 'Every decision protects one of the four proof layers. The system avoids effects that make the brand louder while making the product less specific.' : 'The process is shown through the decisions that changed the sequence—not reconstructed sketches or invented approval history.'}</p></CsBody>
          <DecisionList decisions={project.decisions} />
        </CsSection>

        <CsSection id="after-effects" label={`${sectionNumber(4, true)} — After Effects build`} title="An editable master, not a mysterious hero file">
          <CsBody>
            <p>{isVishwa ? 'The original media survives; the old team project file is not presented as a current deliverable. This is a documented After Effects rebuild showing how I would now organize the campaign for faster iteration, specialist collaboration, and consistent social versions.' : isMentra ? 'This build plan turns the motion grammar into an editable launch tool: one marked master, one controlled identity route, swappable product renders, protected POV and OS modules, and delivery compositions that inherit timing instead of duplicating it.' : 'The approved direction maps into named controls, reusable pre-comps, deliberate easing, and responsive delivery compositions. This production plan is explicit about how the study would be carried into After Effects without presenting a hypothetical project file as a shipped artifact.'}</p>
          </CsBody>
          <div className="motion-ae-callout">
            <span>Ae</span>
            <div><strong>Production spine</strong><p>{isVishwa ? 'Illustrator and Photoshop source art → After Effects type, camera, compositing, and modular content pre-comps → Premiere edit and audio → Media Encoder delivery set.' : isMentra ? 'Illustrator identity vectors + Blender render passes + Figma MentraOS states → After Effects rig, compositing, captions, and responsive versions → Premiere sound edit → Media Encoder delivery.' : 'Illustrator and Figma source art → After Effects animation and compositing → Premiere edit and captions → Media Encoder masters and social versions.'}</p></div>
          </div>
          {isVishwa && <VishwaAeStack />}
          {isMentra && <MentraAeStack />}
          <CsSteps steps={project.aeBuild.map((item, index) => ({ num: `0${index + 1}`, title: `${item.layer} · ${item.technique}`, desc: item.purpose }))} />
          <CsInfoGrid items={project.deliveries} />
        </CsSection>

        <CsSection id="scope" label={`${sectionNumber(5, true)} — Scope & authorship`} title="Clear about what is shipped and what is studied">
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
          ...(isMentra ? [{ id: 'motion-system', label: 'Motion system' }] : []),
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
  return <MotionCaseStudy project={project} motionOn={motionOn} />
}
