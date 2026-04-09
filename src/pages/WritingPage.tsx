import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FigmaSelect from '../components/FigmaSelect'

interface Article {
  slug: string
  title: string
  date: string
  tag: string
  excerpt: string
  readTime: string
  pullQuote?: string
  body: string[]
  relatedProject?: { name: string; slug: string }
}

const articles: Article[] = [
  {
    slug: 'designing-for-glance',
    title: 'Designing for Glance, Not Gaze',
    date: 'Mar 2026',
    tag: 'AI WEARABLES',
    readTime: '4 min',
    excerpt: 'I spent two weeks trying to make phone patterns work on glasses. All of it failed. Here\u2019s what actually works on a 640\u00d7400px display.',
    pullQuote: 'The best design I\u2019ve done was never the project with the most freedom. It was always the one with the tightest box.',
    relatedProject: { name: 'Mentra', slug: 'mentra' },
    body: [
      'Two weeks into Mentra, I was still trying to make scrolling work on smart glasses. Scrolling. On a display the size of a postage stamp that someone glances at while crossing the street. I laugh about it now but at the time I genuinely thought I could adapt phone UI to a face. I was wrong about everything.',
      'Here\u2019s what nobody tells you about wearable design: every single convention you\u2019ve internalized from phone and desktop is not just unhelpful, it\u2019s actively harmful. Scrolling assumes focus. Tapping assumes precision. Reading a paragraph assumes time. On glasses, you get two seconds of peripheral attention. That\u2019s it. If you haven\u2019t communicated value in that window, you\u2019ve lost them and they\u2019re back to looking at the real world.',
      'The breakthrough came from watching people actually wear the prototype. Nobody was looking AT the display. They were looking THROUGH it, at the world, and the display was this thing in their peripheral vision. So I flipped the whole model: design for the periphery, not the center. Notifications go where the eye naturally drifts. Text is 18px minimum or it\u2019s unreadable through the optics. Voice handles anything that would take more than one tap.',
      'That 18px constraint sounds small but it destroyed half our screens. You literally cannot fit a settings page on smart glasses. You have to rethink what settings even means when you only have room for three lines of text. And honestly? The screens we designed under that constraint are cleaner and more intentional than anything I\u2019ve ever made with unlimited real estate.',
      'I think about this constantly now: the best design I\u2019ve done was never the project with the most freedom. It was always the one with the tightest box. The 640px display didn\u2019t make Mentra harder to design. It made Mentra what it is.',
    ],
  },
  {
    slug: 'trust-beats-speed',
    title: 'Trust Beats Speed in Money Products',
    date: 'Jan 2026',
    tag: 'FINTECH',
    readTime: '5 min',
    excerpt: 'We thought the problem was speed. It wasn\u2019t. 67% of users abandoned because they were scared of the number, not confused by the flow.',
    pullQuote: 'We were literally making the product slower and users liked it more. When your users have anxiety, speed is the wrong metric.',
    relatedProject: { name: 'ZentiPay', slug: 'zentipay' },
    body: [
      'There\u2019s a construction worker in Dubai who sends $400 home to Kerala every month. By the time it arrives, $25 has vanished. Exchange rate markups, hidden fees, intermediary charges he never agreed to. That\u2019s $300 a year. His daughter\u2019s school supplies for an entire term. Gone. Not because the product is slow. Because it\u2019s opaque.',
      'When I joined ZentiPay as the founding designer, the team had a hypothesis: speed is the problem. Make transfers faster, users complete more. Makes sense on paper. The data said something else entirely.',
      '67% of abandoned transfers died at the fee confirmation step. Not because the UI was confusing. Because the number was scary. These users had been burned before, sent $400, got told the fee was $8, then watched $25 disappear between confirmation and settlement. They\u2019d learned that fee screens lie. So when our fee screen appeared, they froze. They didn\u2019t trust the number.',
      'The fix was counterintuitive. We didn\u2019t make the fee smaller. We made it visible. Total cost, exchange rate, network fee, our margin. All of it, upfront, before the user committed a single dollar. Even when our total was higher than competitors who hid their real costs in the exchange rate.',
      'Completion jumped 30%. In interviews, one user said something I\u2019ll never forget: \u201cI\u2019d rather pay more and know what I\u2019m paying than pay less and wonder what was taken.\u201d That sentence should be on the wall of every fintech office.',
      'Here\u2019s the part that still gets me: we tested a slow confirmation animation. On purpose. A 1.5-second progress bar instead of instant. Instant felt sketchy. The slow one felt trustworthy. We were literally making the product slower and users liked it more. When your users have anxiety, speed is the wrong metric. Trust is.',
    ],
  },
  {
    slug: 'receipt-architecture',
    title: 'Why Every AI Action Needs a Receipt',
    date: 'Feb 2026',
    tag: 'AI DESIGN',
    readTime: '4 min',
    excerpt: '73% of people who quit AI tools say the same thing: it did something I didn\u2019t ask for. The fix isn\u2019t better AI. It\u2019s better receipts.',
    pullQuote: 'Transparency didn\u2019t just build trust. It built comprehension. Users who read receipts started predicting what the AI would do next.',
    relatedProject: { name: 'Clawed', slug: 'clawed-chat' },
    body: [
      'I\u2019ve watched three people rage-quit AI tools in the last month. Not because the AI was wrong. Because it did things without asking. Sent an email they hadn\u2019t approved. Edited a file they wanted left alone. Made a decision they didn\u2019t authorize. The output was fine. The trust was gone.',
      'When I started designing Clawed, I kept coming back to one question: what if AI had receipts? Not a log buried in settings that nobody reads. An actual visible trail. Every file the AI touched, every action it took, every decision it made, documented and shown to you like a bank statement. Before AND after.',
      'We built three trust tiers. Read-only: the AI can look at your stuff but can\u2019t touch it. Draft-first: the AI proposes changes, you approve them one by one. Autonomous: the AI acts on its own, you review the receipt afterward. And here\u2019s the key, you unlock these per domain. You might let it auto-edit your code but never touch your email. Trust isn\u2019t binary. It\u2019s granular.',
      'The thing I didn\u2019t expect: the receipts made users smarter. They told us they actually understood what the AI did better because they could see the trail. Transparency didn\u2019t just build trust. It built comprehension. Users who read receipts started predicting what the AI would do next. They became collaborators instead of supervisors.',
      'I genuinely believe this pattern should be standard. If your AI can take actions in the real world, every action needs a receipt. Not optional. Not in settings. Right there in the interface, as unavoidable as the action itself. The concept sounds obvious after you see it working. That\u2019s how you know it\u2019s good.',
    ],
  },
  {
    slug: 'two-worlds',
    title: 'I Bounce Between Two Worlds and I Need Both',
    date: 'Dec 2025',
    tag: 'DESIGN PHILOSOPHY',
    readTime: '4 min',
    excerpt: 'Fintech taught me rigor. ITP taught me imagination. Smart glasses need both at the same time.',
    pullQuote: 'The projects where I\u2019ve done my best work are the ones that needed both questions answered at once: will this survive 10,000 users, and has anyone ever tried this before.',
    body: [
      'People look at my portfolio and get confused. \u201cWait, you designed a fintech payment app AND a neural-network music installation? Those are... different.\u201d Yeah. That\u2019s the point.',
      'The fintech work taught me rigor. When your payment flow fails, someone\u2019s family doesn\u2019t get their money. There\u2019s no \u201ccreative interpretation\u201d of a failed transaction. The flow works or it doesn\u2019t. The error state is either clear or someone loses $400. Every pixel has a consequence.',
      'The ITP work taught me imagination. When you\u2019re building a neural network that plays music with strangers, or a 200-LED sculpture that visualizes how a machine \u201cthinks,\u201d there\u2019s no Dribbble reference. No competitor audit. No established pattern to follow. You\u2019re making the pattern.',
      'Right now at Mentra, I need both at the same time. AI smart glasses have no established design conventions. You can\u2019t google \u201chow to design a notification system for a see-through display.\u201d That requires imagination. But the product ships at $299 to real users who are paying real money. If the OS is confusing, someone walks into a wall. That requires rigor.',
      'I think the reason the portfolio is confusing to some people is the same reason the work is good: the practice isn\u2019t about picking a lane. It\u2019s about maintaining tension between precision and weirdness. Between \u201cwill this survive 10,000 users\u201d and \u201chas anyone ever tried this before.\u201d The projects where I\u2019ve done my best work are the ones that needed both questions answered at once.',
      'So yeah, I design fintech apps AND neural-network instruments. I build in Figma AND with soldering irons. I think about WCAG contrast ratios AND whether a light sculpture \u201cfeels right\u201d when you walk through it. Fight me.',
    ],
  },
  {
    slug: 'the-screen-is-30-percent',
    title: 'The Screen Is 30% of the Problem',
    date: 'Nov 2025',
    tag: 'SERVICE DESIGN',
    readTime: '4 min',
    excerpt: 'Designing Pune public transit taught me that the most useful design decision wasn\u2019t in the app. It was a color system for bus stops.',
    pullQuote: 'If you only design the app, you\u2019ve designed a third of the experience and called it done.',
    relatedProject: { name: 'Raahi', slug: 'raahi-project' },
    body: [
      'I walked into the Raahi project thinking I was designing a transit app. I walked out knowing I had designed a service that happened to include an app. The difference changed how I think about every product now.',
      'Pune has eight transport modes. Buses, metro, auto-rickshaws, shared cabs, bikes, walking, local trains, cycles. None of them talk to each other. If you want to take a bus then transfer to metro then grab an auto-rickshaw, you need three different apps, a conversation with a stranger at the bus stop, and a prayer that the auto driver actually knows where you\u2019re going.',
      'We designed the app. Obviously. But we also designed kiosks for bus stops, in-vehicle monitors for real-time route info, and, this is the part I\u2019m most proud of, a color system. Eight transport modes, eight distinct color pairs, applied consistently across the app, the kiosk signage, and the vehicle displays. Learn the colors in the app, recognize them on the street. No reading required.',
      'The color system was the most impactful design decision in the entire project and it had nothing to do with a screen. It was about physical wayfinding. Can a user standing at a bus stop, squinting in the sun, identify their bus before it passes? That\u2019s a design problem. And it\u2019s not solved by a nicer app.',
      'I apply this lens to everything now. Before designing a screen, I ask: what percentage of this problem actually lives on a screen? For Mentra, maybe 60%. For ZentiPay, maybe 80%. For Raahi, it was 30% at best. The screen was the least important touchpoint. If you only design the app, you\u2019ve designed a third of the experience and called it done.',
    ],
  },
  {
    slug: 'poetry-and-microcopy',
    title: 'What 100 Days of Poetry Taught Me About Button Labels',
    date: 'Oct 2025',
    tag: 'DAILY PRACTICE',
    readTime: '3 min',
    excerpt: '\u201cSubmit\u201d vs \u201cSend it\u201d vs \u201cDone\u201d vs \u201cGo.\u201d Each one feels different. Poetry is how I learned to feel the difference.',
    pullQuote: 'The best interface text is the text that\u2019s left after you\u2019ve deleted everything unnecessary.',
    body: [
      'I wrote a poem every day for 100 days and posted it publicly. Not because I wanted to become a poet. Because I was writing bad button labels and I couldn\u2019t figure out why.',
      '\u201cSubmit.\u201d \u201cConfirm.\u201d \u201cContinue.\u201d \u201cProceed.\u201d Every button in every app I designed sounded like a legal document. I knew it was wrong but I couldn\u2019t articulate what \u201cright\u201d felt like. So I went looking for a discipline that trains you to feel the weight of individual words. Turns out that discipline already exists. It\u2019s called poetry.',
      'A poem and a button label have the same constraint: almost no space, and every word has to earn its seat. \u201cSubmit\u201d feels formal and cold. \u201cSend it\u201d feels casual and confident. \u201cDone\u201d feels relieved. \u201cGo\u201d feels urgent. Same action, four completely different emotional experiences. Poetry taught me to feel that difference before choosing, not after shipping.',
      'By day 60, the poems took twenty minutes instead of two hours. The quality wasn\u2019t worse, the editing was just faster. I\u2019d internalized where the waste usually hides: the first line is always too long, adjectives are usually unnecessary, and if you can cut a word without losing meaning, you should.',
      'That skill transferred directly. \u201cSign in to continue\u201d has a rhythm. \u201cPlease sign in to your account to continue\u201d doesn\u2019t. \u201cYour file is safe\u201d is specific. \u201cOperation completed successfully\u201d is corporate noise. I still write every morning. Not poems anymore, but the muscle is the same. Look at the sentence. Remove a word. Read it again. Better? Remove another. The best interface text is the text that\u2019s left after you\u2019ve deleted everything unnecessary.',
    ],
  },
  {
    slug: 'keyboards-i-dont-need',
    title: 'I Built a Machine That Designs Keyboards I Don\u2019t Need',
    date: 'Sep 2025',
    tag: 'CREATIVE TECH',
    readTime: '3 min',
    excerpt: 'My ITP thesis is an AI that turns text prompts into fabrication-ready keyboards. I own too many keyboards now.',
    pullQuote: 'Taste is the thing AI still can\u2019t do without you.',
    relatedProject: { name: 'BreakGen', slug: 'keyboard-project' },
    body: [
      'There\u2019s a shelf in my apartment with six keyboards on it. I built all of them. I need zero of them. My daily driver is a stock MacBook keyboard. This is fine.',
      'BreakGen started as a thesis question: what if generative design could handle mechanical constraints? Not \u201cgenerate me a cool shape\u201d but \u201cgenerate me a shape I can 3D print, that has structurally sound key switches, that actually types.\u201d The gap between \u201clooks cool in a render\u201d and \u201cworks when you press a key\u201d is where most generative design falls apart.',
      'The system takes a text prompt, generates a key layout, designs the case geometry around it, checks structural integrity, and exports fabrication-ready files. Every keyboard it produces can be 3D printed without modification. That last sentence took eight months to make true.',
      'The part I didn\u2019t expect: the aesthetic decisions are the hard part, not the engineering. Getting the AI to produce mechanically valid designs was straightforward. Getting it to produce designs that feel right to hold, that have pleasing proportions, that look like something a human would choose, that\u2019s where the taste lives. And taste is the thing AI still can\u2019t do without you.',
      '200+ people visited the thesis show. Half of them asked \u201ccan I have one?\u201d The other half asked \u201cwhy?\u201d Both are valid questions. The honest answer to \u201cwhy\u201d is: because I wanted to know if a design engineer could build a tool that collapses the gap between idea and object. The answer is yes, but only if you know both sides. The design and the engineering. The prompt and the printer.',
    ],
  },
  {
    slug: 'error-states-deserve-good-copy',
    title: 'Error States Deserve Good Copy',
    date: 'Aug 2025',
    tag: 'INTERACTION DESIGN',
    readTime: '4 min',
    excerpt: 'Nobody designs the failure. But failure is where your user is most vulnerable and most likely to leave.',
    pullQuote: 'The error screen is the only screen your user never wanted to see. Respect that.',
    body: [
      'I have a rule: design the error state before the happy path. Not because I\u2019m pessimistic. Because the error state tells you more about whether you understand the product than the success state ever will.',
      'Think about it. The happy path is easy. User does the right thing, system responds correctly, everyone\u2019s happy. Any designer can make that feel good. But when the payment fails? When the file doesn\u2019t upload? When the API times out and your user has been staring at a spinner for twelve seconds? That\u2019s when design actually matters.',
      'At ZentiPay, I wrote every error message before I designed the flow. "We couldn\u2019t verify your identity. This usually means the photo was blurry. Try again in better lighting." Not "Error 422: Verification failed." The first one tells you what happened, why, and what to do. The second one makes you feel like you broke something.',
      'The pattern I follow: every error message answers three questions. What happened? Why? What should I do now? If it can\u2019t answer all three, it\u2019s not an error message, it\u2019s a confession that you didn\u2019t think this through.',
      'At Mentra, error states are even harder because you have three lines of text maximum on the glasses display. You can\u2019t say "We couldn\u2019t verify your identity because the photo was blurry." You have to say "Photo unclear. Retake." Five words. Same job. The constraint forces you to find the actual core of the message and throw everything else away.',
      'I genuinely think you can judge the quality of a product by reading only its error messages. If they\u2019re generic, the team doesn\u2019t understand their users. If they\u2019re specific and kind, someone sat down and imagined what it feels like to be on the other side of a failure.',
    ],
  },
  {
    slug: 'the-figma-file-is-not-the-product',
    title: 'The Figma File Is Not the Product',
    date: 'Jul 2025',
    tag: 'DESIGN ENGINEERING',
    readTime: '4 min',
    excerpt: 'I stopped handing off Figma files and started shipping React components. The quality gap disappeared.',
    pullQuote: 'Every handoff is a translation. Every translation loses something. The only way to lose nothing is to stop translating.',
    relatedProject: { name: 'Mentra', slug: 'mentra' },
    body: [
      'For three years, my job ended at the Figma file. I\u2019d design a screen, annotate the spacing, hand it to an engineer, and wait. Three days later, I\u2019d open the staging link and it would look... almost right. The padding would be off by 4px. The animation would be too fast. The hover state would be missing. Death by a thousand almost-rights.',
      'So I learned React. Not because I wanted to be an engineer. Because I was tired of the gap between what I designed and what shipped. The gap wasn\u2019t the engineer\u2019s fault. It was the handoff\u2019s fault. Every handoff is a translation. Every translation loses something.',
      'Now I build the components myself. The interaction, the animation, the responsive behavior. I hand the engineer a working React component, not a Figma screenshot. The quality gap disappeared. Not because I\u2019m a better engineer than the engineers. Because there\u2019s no translation step. What I designed is what ships.',
      'This portfolio is the proof. React 19, TypeScript, Tailwind v4, Three.js. Every animation, every interaction, every responsive breakpoint, I built it. Not to show off. Because I couldn\u2019t tolerate the gap anymore.',
      'I\u2019m not saying every designer should code. I\u2019m saying every designer should close the gap between intent and output. For some people that\u2019s better specs. For some it\u2019s pair programming. For me it was learning to build the thing myself.',
      'The Figma file is a conversation starter. It\u2019s not the product. The product is what the user touches. And if you\u2019re not involved in what the user touches, you\u2019re a suggestion box, not a designer.',
    ],
  },
  {
    slug: 'designing-for-strangers',
    title: 'Designing for Strangers Who Don\u2019t Read Instructions',
    date: 'Jun 2025',
    tag: 'INSTALLATIONS',
    readTime: '4 min',
    excerpt: 'At WonderVille, I watched 200 people interact with Jugalbandi. Nobody read the sign. That was the test.',
    pullQuote: 'If people have to read a sign, the interaction has already failed. The interface IS the invitation.',
    relatedProject: { name: 'Jugalbandi', slug: 'jugalbandi' },
    body: [
      'There\u2019s a sign next to Jugalbandi at WonderVille that explains how it works. It says something about sensors, sound frequencies, and collaborative music-making. Nobody reads it. I know because I stood there for four hours and watched.',
      'Here\u2019s what actually happens: someone walks up, touches the surface, hears a sound, and goes "oh." Then they touch it again. Then they start moving their hand and the sound changes. Then a stranger walks up to the other side and touches it. Now there are two sounds. They look at each other. They start playing together. No instructions. No onboarding. No tutorial.',
      'That "oh" moment is the whole design. It\u2019s the moment where the interaction explains itself through the response. Touch makes sound. Movement changes sound. Two people make harmony. The entire product is communicated in three seconds of direct feedback.',
      'This is the hardest thing I\u2019ve ever designed. Harder than Mentra\u2019s OS. Harder than ZentiPay\u2019s fee flow. Because with a screen, you can add a label. You can add a tooltip. You can add a whole onboarding flow. With a physical installation in a noisy arcade bar, you get exactly one chance: the first touch. If that touch doesn\u2019t produce an immediately understandable response, the person walks away.',
      'I think about this on every digital project now. Not "how do I explain this?" but "how do I make this explain itself?" The best interface is the one that never needs a tutorial. The best interaction is the one where the response IS the instruction.',
      'We prototyped six different interaction models for Jugalbandi. The five that failed all had one thing in common: they required the user to understand something before they could start. The one that worked let them start first and understand later. That\u2019s the whole philosophy: action before comprehension. Let people play, then they\u2019ll learn.',
    ],
  },
  {
    slug: 'nobody-cares-about-your-process',
    title: 'Nobody Cares About Your Process (Until They Do)',
    date: 'May 2025',
    tag: 'CAREER',
    readTime: '3 min',
    excerpt: 'Recruiters look at outcomes. Hiring managers look at process. Design the case study for both audiences.',
    pullQuote: 'A case study that only shows the outcome is a brochure. A case study that only shows the process is a diary. You need both.',
    body: [
      'I\u2019ve sat on both sides of the portfolio review. As the person presenting, and as the person deciding whether to advance a candidate. Here\u2019s what I\u2019ve learned: the audience determines what matters.',
      'Recruiters scan. They spend 30 seconds on your portfolio. They\u2019re looking for: recognizable company names, impressive metrics, and visual quality. "30% higher transaction completion" catches their eye. "I conducted 15 stakeholder interviews" does not. They need to justify putting you in front of the hiring manager. Give them ammunition.',
      'Hiring managers read. They spend 5-10 minutes on the case study that the recruiter flagged. They\u2019re looking for: how you think, how you make decisions under constraints, and whether you can articulate WHY you did what you did. "We showed fees upfront because users were abandoning at the confirmation step" tells them you can reason from research to decision. That\u2019s what they\u2019re hiring for.',
      'So a good case study serves both. The headline and metrics hook the recruiter. The constraint, the research, and the decision-making hook the hiring manager. Front-load the outcome. Then unpack the thinking.',
      'My portfolio follows this structure: project header with one-line result (recruiter bait), then the constraint (what made this hard), then the process (how I thought through it), then the outcome again with more context (the payoff). The recruiter stops at line one. The hiring manager reads the whole thing. Both leave with what they need.',
    ],
  },
  {
    slug: 'four-pixel-border-radius',
    title: 'Strong Opinions on Border-Radius',
    date: 'Apr 2025',
    tag: 'VISUAL DESIGN',
    readTime: '3 min',
    excerpt: '4px is the answer. I will die on this hill. Here\u2019s why the right radius is a design system decision, not an aesthetic one.',
    pullQuote: 'Border-radius isn\u2019t a visual choice. It\u2019s a language choice. Round says friendly. Sharp says precise. Pick one and commit.',
    body: [
      'I have a take that annoys people: 4px border-radius is almost always the right answer. Not 0. Not 8. Not 12. Not "fully rounded." Four pixels.',
      'Here\u2019s the reasoning. 0px (sharp corners) says "I am a spreadsheet." It\u2019s cold, corporate, no warmth. 8px says "I am a friendly app" but it also says "I might be a toy." 12px and above says "I am either a mobile app or a button that wants to be a pill." Fully rounded (999px) says "I am terrified of corners and also maybe a startup from 2021."',
      '4px is the sweet spot. It softens the edge just enough to feel intentional without feeling soft. It says "I am a designed object made by someone who cares about details but doesn\u2019t need to prove it." It works on cards, inputs, buttons, modals, tags, tooltips. It scales up and down. It\u2019s the Helvetica of border-radii.',
      'But the real point isn\u2019t 4px specifically. The real point is: pick a radius and use it everywhere. A design system where cards are 8px, buttons are 4px, inputs are 6px, and modals are 12px has no opinion. It has four opinions, which is worse than none.',
      'At ZentiPay, the entire design system uses three radii: 4px (default), 8px (cards and panels), and 999px (pills and tags only). That\u2019s it. Three values. Every component, every state, every responsive breakpoint. When a new designer joins and asks "what radius should this be?" the answer is always one of three options. That\u2019s what a system means.',
      'The portfolio you\u2019re reading right now? 4px small, 8px default, 12px large. I wrote it into the design tokens. --radius-sm: 4px. --radius: 8px. --radius-lg: 12px. Fight me.',
    ],
  },
  {
    slug: 'sketching-every-day',
    title: 'Why I Still Sketch Every Day',
    date: 'Mar 2025',
    tag: 'DAILY PRACTICE',
    readTime: '3 min',
    excerpt: 'Figma trains you to think in components. Sketching trains you to think in relationships. You need both.',
    pullQuote: 'The pen doesn\u2019t have an undo button. That\u2019s the whole point.',
    body: [
      'I sketch every morning. Not wireframes. Not UI flows. Just... things. A coffee cup. A hand. The shadow under my desk lamp. I\u2019ve been doing this for over 100 days and the habit has changed how I design products in ways I didn\u2019t expect.',
      'Figma trains you to think in components. This is a button. This is a card. This is a nav bar. Each one is a rectangle with properties. You learn to think in systems of rectangles. That\u2019s powerful, but it\u2019s also limiting. The world is not made of rectangles.',
      'Sketching trains you to think in relationships. Where does the light come from? How does this shape relate to the space around it? What happens at the edge where two things meet? These are the same questions that make good interface design: how do these elements relate to each other? What\u2019s the visual hierarchy? Where does the eye go first?',
      'The pen doesn\u2019t have an undo button. That\u2019s the whole point. In Figma, I can try a hundred variations at zero cost. Which means I often try a hundred variations without thinking. The pen forces commitment. You put the line down and it stays. You learn to look before you draw. To plan the stroke before you make it. That transfers directly to design decisions: think before you pixel.',
      'The other thing sketching taught me: speed of observation. Day one, I\u2019d stare at an object for five minutes before drawing it. Now I can capture the essential shape in thirty seconds. Not because I draw faster. Because I see faster. I know which lines matter and which ones don\u2019t. That same skill, knowing what matters, is the entire job of a designer.',
      'I keep a sketchbook on my desk. It sits right next to my MacBook. Both are tools. One makes things precise. The other makes things honest.',
    ],
  },
]

/* ── Article Card ── */

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.article
      className="wr-article-card reveal"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/writing/${article.slug}`} className="wr-article-link figma-hover">
        <div className="wr-article-meta">
          <span className="wr-article-tag">{article.tag}</span>
          <span className="wr-article-date">{article.date}</span>
          <span className="wr-article-read">{article.readTime}</span>
        </div>
        <h2 className="wr-article-title">{article.title}</h2>
        <p className="wr-article-excerpt">{article.excerpt}</p>
        <FigmaSelect />
      </Link>
    </motion.article>
  )
}

/* ── Single Article Page ── */

function ArticlePage({ article }: { article: Article }) {
  const idx = articles.indexOf(article)
  const prev = idx > 0 ? articles[idx - 1] : null
  const next = idx < articles.length - 1 ? articles[idx + 1] : null

  return (
    <>
      <Helmet>
        <title>{article.title} \u00b7 Parth Pawar</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${article.title} \u00b7 Parth Pawar`} />
        <meta property="og:description" content={article.excerpt} />
      </Helmet>
      <Nav />
      <main id="main-content" className="project-main">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div className="wr-article-page">
            <Link to="/writing" className="back-link wr-article-back">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              All Writing
            </Link>

            <div className="wr-article-meta">
              <span className="wr-article-tag">{article.tag}</span>
              <span className="wr-article-date">{article.date}</span>
              <span className="wr-article-read">{article.readTime}</span>
            </div>

            <h1 className="wr-article-page-title">{article.title}</h1>

            <div className="wr-article-body">
              {article.body.map((p, i) => {
                // Insert pull quote after 2nd paragraph
                if (i === 2 && article.pullQuote) {
                  return (
                    <div key={i}>
                      <blockquote className="wr-article-pullquote">
                        <p>{article.pullQuote}</p>
                      </blockquote>
                      <p>{p}</p>
                    </div>
                  )
                }
                return <p key={i}>{p}</p>
              })}
            </div>

            {/* Related project */}
            {article.relatedProject && (
              <div className="wr-article-related">
                <span className="wr-article-related-label">Related case study</span>
                <Link to={`/${article.relatedProject.slug}`} className="wr-article-related-link figma-hover">
                  {article.relatedProject.name} \u2192
                  <FigmaSelect />
                </Link>
              </div>
            )}

            {/* Prev / Next */}
            <nav className="wr-article-nav">
              {prev ? (
                <Link to={`/writing/${prev.slug}`} className="wr-article-nav-link wr-article-nav-prev figma-hover">
                  <span className="wr-article-nav-label">\u2190 Previous</span>
                  <span className="wr-article-nav-title">{prev.title}</span>
                  <FigmaSelect />
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/writing/${next.slug}`} className="wr-article-nav-link wr-article-nav-next figma-hover">
                  <span className="wr-article-nav-label">Next \u2192</span>
                  <span className="wr-article-nav-title">{next.title}</span>
                  <FigmaSelect />
                </Link>
              ) : <div />}
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export { articles }

export function WritingArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = articles.find(a => a.slug === slug)
  if (!article) return <WritingIndexPage />
  return <ArticlePage article={article} />
}

export default function WritingIndexPage() {
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <>
      <Helmet>
        <title>Writing \u00b7 Parth Pawar</title>
        <meta name="description" content="Articles on design engineering, AI wearables, fintech UX, and creative practice by Parth Pawar." />
      </Helmet>
      <Nav />

      <main id="main-content">
        <div className="wrap">
          <div className="wr-writing-header">
            <motion.h1
              className="wr-writing-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Writing
            </motion.h1>
            <motion.p
              className="wr-writing-intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Things I think about while designing. Smart glasses, fintech anxiety, AI trust, building keyboards I don't need, and why poetry makes you better at button labels.
            </motion.p>
          </div>

          {/* Featured article */}
          <motion.div
            className="wr-article-featured reveal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Link to={`/writing/${featured.slug}`} className="wr-article-featured-link figma-hover">
              <div className="wr-article-meta">
                <span className="wr-article-tag">{featured.tag}</span>
                <span className="wr-article-date">{featured.date}</span>
                <span className="wr-article-read">{featured.readTime}</span>
              </div>
              <h2 className="wr-article-featured-title">{featured.title}</h2>
              <p className="wr-article-featured-excerpt">{featured.excerpt}</p>
              {featured.pullQuote && (
                <blockquote className="wr-article-featured-quote">
                  <p>\u201c{featured.pullQuote}\u201d</p>
                </blockquote>
              )}
              <FigmaSelect />
            </Link>
          </motion.div>

          {/* Rest of articles */}
          <div className="wr-article-grid">
            {rest.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
