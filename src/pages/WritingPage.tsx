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
  body: string[]
}

const articles: Article[] = [
  {
    slug: 'designing-for-glance',
    title: 'Designing for Glance, Not Gaze',
    date: 'Mar 2026',
    tag: 'AI WEARABLES',
    readTime: '4 min',
    excerpt: 'I spent two weeks trying to make phone patterns work on glasses. All of it failed. Here\'s what actually works on a 640\u00d7400px display.',
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
    body: [
      'There\u2019s a construction worker in Dubai who sends $400 home to Kerala every month. By the time it arrives, $25 has vanished. Exchange rate markups, hidden fees, intermediary charges he never agreed to. That\u2019s $300 a year. His daughter\u2019s school supplies for an entire term. Gone. Not because the product is slow. Because it\u2019s opaque.',
      'When I joined ZentiPay as the founding designer, the team had a hypothesis: speed is the problem. Make transfers faster, users complete more. Makes sense on paper. The data said something else entirely.',
      '67% of abandoned transfers died at the fee confirmation step. Not because the UI was confusing. Because the number was scary. These users had been burned before, sent $400, got told the fee was $8, then watched $25 disappear between confirmation and settlement. They\u2019d learned that fee screens lie. So when our fee screen appeared, they froze. They didn\u2019t trust the number.',
      'The fix was counterintuitive. We didn\u2019t make the fee smaller. We made it visible. Total cost, exchange rate, network fee, our margin. All of it, upfront, before the user committed a single dollar. Even when our total was higher than competitors who hid their real costs in the exchange rate.',
      'Completion jumped 30%. In interviews, one user said something I\u2019ll never forget: "I\u2019d rather pay more and know what I\u2019m paying than pay less and wonder what was taken." That sentence should be on the wall of every fintech office.',
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
    body: [
      'People look at my portfolio and get confused. "Wait, you designed a fintech payment app AND a neural-network music installation? Those are... different." Yeah. That\u2019s the point.',
      'The fintech work taught me rigor. When your payment flow fails, someone\u2019s family doesn\u2019t get their money. There\u2019s no "creative interpretation" of a failed transaction. The flow works or it doesn\u2019t. The error state is either clear or someone loses $400. Every pixel has a consequence.',
      'The ITP work taught me imagination. When you\u2019re building a neural network that plays music with strangers, or a 200-LED sculpture that visualizes how a machine "thinks," there\u2019s no Dribbble reference. No competitor audit. No established pattern to follow. You\u2019re making the pattern.',
      'Right now at Mentra, I need both at the same time. AI smart glasses have no established design conventions. You can\u2019t google "how to design a notification system for a see-through display." That requires imagination. But the product ships at $299 to real users who are paying real money. If the OS is confusing, someone walks into a wall. That requires rigor.',
      'I think the reason the portfolio is confusing to some people is the same reason the work is good: the practice isn\u2019t about picking a lane. It\u2019s about maintaining tension between precision and weirdness. Between "will this survive 10,000 users" and "has anyone ever tried this before." The projects where I\u2019ve done my best work are the ones that needed both questions answered at once.',
      'So yeah, I design fintech apps AND neural-network instruments. I build in Figma AND with soldering irons. I think about WCAG contrast ratios AND whether a light sculpture "feels right" when you walk through it. Fight me.',
    ],
  },
  {
    slug: 'the-screen-is-30-percent',
    title: 'The Screen Is 30% of the Problem',
    date: 'Nov 2025',
    tag: 'SERVICE DESIGN',
    readTime: '4 min',
    excerpt: 'Designing Pune public transit taught me that the most useful design decision wasn\u2019t in the app. It was a color system for bus stops.',
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
    excerpt: '"Submit" vs "Send it" vs "Done" vs "Go." Each one feels different. Poetry is how I learned to feel the difference.',
    body: [
      'I wrote a poem every day for 100 days and posted it publicly. Not because I wanted to become a poet. Because I was writing bad button labels and I couldn\u2019t figure out why.',
      '"Submit." "Confirm." "Continue." "Proceed." Every button in every app I designed sounded like a legal document. I knew it was wrong but I couldn\u2019t articulate what "right" felt like. So I went looking for a discipline that trains you to feel the weight of individual words. Turns out that discipline already exists. It\u2019s called poetry.',
      'A poem and a button label have the same constraint: almost no space, and every word has to earn its seat. "Submit" feels formal and cold. "Send it" feels casual and confident. "Done" feels relieved. "Go" feels urgent. Same action, four completely different emotional experiences. Poetry taught me to feel that difference before choosing, not after shipping.',
      'By day 60, the poems took twenty minutes instead of two hours. The quality wasn\u2019t worse, the editing was just faster. I\u2019d internalized where the waste usually hides: the first line is always too long, adjectives are usually unnecessary, and if you can cut a word without losing meaning, you should.',
      'That skill transferred directly. "Sign in to continue" has a rhythm. "Please sign in to your account to continue" doesn\u2019t. "Your file is safe" is specific. "Operation completed successfully" is corporate noise. I still write every morning. Not poems anymore, but the muscle is the same. Look at the sentence. Remove a word. Read it again. Better? Remove another. The best interface text is the text that\u2019s left after you\u2019ve deleted everything unnecessary.',
    ],
  },
  {
    slug: 'keyboards-i-dont-need',
    title: 'I Built a Machine That Designs Keyboards I Don\u2019t Need',
    date: 'Sep 2025',
    tag: 'CREATIVE TECH',
    readTime: '3 min',
    excerpt: 'My ITP thesis is an AI that turns text prompts into fabrication-ready keyboards. I own too many keyboards now.',
    body: [
      'There\u2019s a shelf in my apartment with six keyboards on it. I built all of them. I need zero of them. My daily driver is a stock MacBook keyboard. This is fine.',
      'BreakGen started as a thesis question: what if generative design could handle mechanical constraints? Not "generate me a cool shape" but "generate me a shape I can 3D print, that has structurally sound key switches, that actually types." The gap between "looks cool in a render" and "works when you press a key" is where most generative design falls apart.',
      'The system takes a text prompt, generates a key layout, designs the case geometry around it, checks structural integrity, and exports fabrication-ready files. Every keyboard it produces can be 3D printed without modification. That last sentence took eight months to make true.',
      'The part I didn\u2019t expect: the aesthetic decisions are the hard part, not the engineering. Getting the AI to produce mechanically valid designs was straightforward. Getting it to produce designs that feel right to hold, that have pleasing proportions, that look like something a human would choose, that\u2019s where the taste lives. And taste is the thing AI still can\u2019t do without you.',
      '200+ people visited the thesis show. Half of them asked "can I have one?" The other half asked "why?" Both are valid questions. The honest answer to "why" is: because I wanted to know if a design engineer could build a tool that collapses the gap between idea and object. The answer is yes, but only if you know both sides. The design and the engineering. The prompt and the printer.',
    ],
  },
]

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

function ArticlePage({ article }: { article: Article }) {
  return (
    <>
      <Helmet>
        <title>{article.title} · Parth Pawar</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      <Nav />
      <main id="main-content" className="project-main">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div style={{ paddingTop: 'calc(var(--nav-h) + 3rem)' }}>
            <Link to="/writing" className="back-link" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              All Writing
            </Link>
            <div className="wr-article-meta" style={{ marginBottom: '1rem' }}>
              <span className="wr-article-tag">{article.tag}</span>
              <span className="wr-article-date">{article.date}</span>
              <span className="wr-article-read">{article.readTime}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '2rem' }}>
              {article.title}
            </h1>
            <div className="wr-article-body">
              {article.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
        <div style={{ height: '4rem' }} />
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
  return (
    <>
      <Helmet>
        <title>Writing · Parth Pawar</title>
        <meta name="description" content="Articles on design engineering, AI wearables, fintech UX, and creative practice by Parth Pawar." />
      </Helmet>
      <Nav />

      <main id="main-content">
        <div className="wrap">
          <div style={{ paddingTop: 'calc(var(--nav-h) + 5rem)', marginBottom: 'var(--space-8)' }}>
            <motion.h1
              style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1rem' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Writing
            </motion.h1>
            <motion.p
              style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-lg)', color: 'var(--ink-50)', maxWidth: '520px', lineHeight: 1.6 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Things I think about while designing. Smart glasses, fintech anxiety, AI trust, building keyboards I don't need, and why poetry makes you better at button labels.
            </motion.p>
          </div>

          <div className="wr-article-grid">
            {articles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>

          <div style={{ height: '4rem' }} />
        </div>
      </main>

      <Footer />
    </>
  )
}
