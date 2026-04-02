import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsTimeline from '../../components/case-study/CsTimeline'
import CsSteps from '../../components/case-study/CsSteps'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCallout from '../../components/case-study/CsCallout'
import CsCredits from '../../components/case-study/CsCredits'
import CsBeforeAfter from '../../components/case-study/CsBeforeAfter'
import CsFlowDiagram from '../../components/case-study/CsFlowDiagram'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function ZentipayPage() {
  return (
    <>
      <Helmet>
        <title>ZentiPay &middot; Parth Pawar</title>
        <meta name="description" content="ZentiPay — Founding Product Designer for an AI-driven fintech super app serving migrant workers and international students. Increased transaction completion by 30% and reduced perceived transfer time by 40%." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ZentiPay · Parth Pawar" />
        <meta property="og:description" content="Fintech super app that increased transaction completion by 30% and reduced perceived transfer time by 40%." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/zentipay.png" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#1E6B45' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="fintech"
          backLabel="Back to Work"
          tags={['Fintech', '0\u21921 Product', 'AI', 'Cross-cultural UX']}
          title="ZentiPay"
          subtitle="Designed a fintech super app from zero &mdash; research across 5 countries, adaptive onboarding system, and upfront fee transparency that measurably improved transaction completion"
          info={[
            { label: 'Role', value: 'Founding Product Designer (sole designer, working with product + eng)' },
            { label: 'Scope', value: '0\u21921 Product Design' },
            { label: 'Platform', value: 'Web & Mobile' },
            { label: 'Tools', value: 'Figma, Maze, Hotjar' },
            { label: 'Timeline', value: 'Q2 \u2013 Q3 2025 (~15 weeks)' },
          ]}
          heroImage="/Assets/images/zentipay.png"
          heroAlt="ZentiPay — fintech super app for cross-border payments"
        />

        {/* The Hook */}
        <section className="cs-section reveal" id="cs-hook">
          <div className="wrap">
            <CsBody style={{ maxWidth: '720px' }}>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>A construction worker in Dubai sends $400 home to his family in Kerala every month. By the time it arrives, $25 has disappeared &mdash; eaten by exchange rate markups, hidden fees, and intermediary charges he never agreed to. That&rsquo;s $300 a year. Enough to cover his daughter&rsquo;s school supplies for an entire term.</p>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>He knows he&rsquo;s being overcharged. He just doesn&rsquo;t have a better option.</p>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>That&rsquo;s the problem ZentiPay was built to solve. And that&rsquo;s why I joined as the founding designer &mdash; to build the product from a blank Figma file into something that could earn trust from people who had every reason not to give it.</p>
            </CsBody>
          </div>
        </section>

        <ProjectOverview
          sections={[
            {
              label: 'Overview',
              content: 'ZentiPay is a crypto payments platform built for migrant workers and international students \u2014 people who send money home regularly but lose hundreds annually to opaque fees. I joined as the founding product designer on a contract basis (Q2 \u2013 Q3 2025), working alongside a product lead and engineering team. I owned the design end-to-end: research, IA, interaction design, design system, and usability validation across five countries.',
            },
            {
              label: 'The Mandate',
              content: 'Build a cross-border payment experience so clear and trustworthy that first-time crypto users complete transfers without hesitation. Every design decision had to earn trust in the first 30 seconds \u2014 because in fintech, a confused user is a lost user, and a lost user is a family that doesn\u2019t get their money.',
            },
          ]}
        />

        <CsSection id="cs-problem" label="01 &mdash; Problem" title="$700B+ in remittances annually. Migrants still pay an average of 6.3% in fees.">
          <div className="cs-two-col">
            <CsBody>
              <p>Cross-border money transfer is a high-anxiety, high-stakes interaction. For migrant workers sending $200&ndash;$500 home each month, every dollar lost to hidden fees is a dollar that doesn&rsquo;t reach their family. Yet the existing landscape &mdash; from legacy services like Western Union to newer fintech players &mdash; still treats this user segment as an afterthought.</p>
              <p>The unbanked and underbanked face a compounding problem: confusing interfaces built for tech-literate users, fee structures buried in fine print, and zero feedback about where their money is at any given moment. The result is a population that either overpays or avoids digital transfers entirely.</p>
            </CsBody>
            <div>
              <CsCallout>
                <p><strong>The core tension:</strong> Users need to trust a digital platform with their earnings &mdash; often their family&rsquo;s primary income &mdash; but every existing touchpoint erodes that trust through ambiguity, jargon, and hidden costs.</p>
              </CsCallout>
              <ul className="cs-list">
                <li>Confusing multi-step flows with no progress indicators</li>
                <li>Fee estimates that change between confirmation and settlement</li>
                <li>No real-time tracking &mdash; users wait days without status updates</li>
                <li>Interfaces that assume English fluency and smartphone literacy</li>
                <li>Crypto terminology alienating non-technical users</li>
              </ul>
            </div>
          </div>
        </CsSection>

        <CsSection id="cs-research" label="02 &mdash; Research" title="15+ interviews across 4 countries revealed one pattern: users abandon when they can't predict costs.">
          <CsBody style={{ marginBottom: '2.5rem' }}>
            <p>I ran a mixed-methods research sprint over three weeks. The goal was not just to understand pain points but to map the emotional arc of a cross-border transfer &mdash; from the moment a user decides to send money to the moment their recipient confirms receipt.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'User Interviews', desc: '15+ in-depth interviews with migrant workers and international students across India, Philippines, Nigeria, and Mexico. Conducted in native languages via translators where needed.' },
            { num: '2', title: 'Competitive Audit', desc: 'Analyzed 8 remittance platforms (Wise, Remitly, WorldRemit, Western Union, Xoom, Sendwave, Chipper Cash, Paysend) across 12 UX dimensions \u2014 from onboarding friction to fee transparency.' },
            { num: '3', title: 'Journey Mapping', desc: 'Mapped end-to-end transfer journeys revealing 7 distinct friction points. The most critical: fee confirmation, identity verification, and post-transfer anxiety.' },
            { num: '4', title: 'Behavioral Analysis', desc: 'Session recordings and analytics from beta users identified that 67% of abandoned transfers happened at the fee confirmation step \u2014 users couldn\u2019t predict total costs upfront.' },
          ]} />
          <CsCallout style={{ marginTop: '3rem' }}>
            <p><strong>Key insight:</strong> &ldquo;Users abandoned transfers at the fee confirmation step 67% of the time because they couldn&rsquo;t predict total costs upfront.&rdquo; This single finding shaped the product&rsquo;s core interaction model: predictive pricing before commitment.</p>
          </CsCallout>
          <details className="cs-details">
            <summary className="cs-details-summary">Competitive audit methodology &mdash; 8 platforms across 12 UX dimensions</summary>
            <div className="cs-details-content">
              <p>Each platform was evaluated against: onboarding friction (steps to first transfer), fee transparency (when and how costs appear), transfer tracking granularity, mobile responsiveness, language support, KYC flow design, error recovery, trust signals, estimated delivery accuracy, repeat-transfer friction, accessibility, and customer support access.</p>
              <p>Key finding: no platform scored well on both fee transparency and transfer tracking. Most optimized for one at the expense of the other. ZentiPay was designed to excel at both simultaneously.</p>
            </div>
          </details>
          <h3 className="cs-section-subtitle">Research Themes</h3>
          <CsFeatureGrid features={[
            { title: 'Trust Deficit', desc: '12 of 15 participants mentioned \u201cfear of losing money\u201d as their primary barrier to using new payment apps. Trust is not built through marketing \u2014 it\u2019s built through interface transparency.' },
            { title: 'Literacy Spectrum', desc: 'Tech literacy varied dramatically \u2014 from users who could barely navigate a smartphone to students fluent in multiple apps. A single onboarding flow would fail both groups.' },
            { title: 'Fee Anxiety', desc: 'Users mentally calculated fees in their home currency, not the sending currency. They needed to see \u201chow much arrives\u201d not \u201chow much you pay.\u201d' },
            { title: 'Transfer Blindness', desc: 'Once money was sent, users entered an anxiety loop \u2014 checking the app repeatedly with no status updates. The gap between \u201csent\u201d and \u201creceived\u201d was a black box.' },
          ]} />
        </CsSection>

        <CsSection id="cs-timeline" label="Project Arc" title="From blank file to five-country validation">
          <CsTimeline items={[
            { date: 'Weeks 1\u20133', title: 'Discovery & Research', desc: '15+ interviews across India, Philippines, Nigeria, Mexico. Competitive audit of 8 remittance platforms. Journey mapping identified 7 friction points.' },
            { date: 'Weeks 4\u20136', title: 'Architecture & Wireframes', desc: 'Information architecture, adaptive onboarding branching logic, fee estimator interaction model. Low-fidelity prototypes tested with 8 participants.' },
            { date: 'Weeks 7\u201310', title: 'Design System & High-fidelity', desc: '120+ component library across web and mobile. Multi-language support, RTL layouts, accessibility audit. Trust architecture framework developed.' },
            { date: 'Weeks 11\u201314', title: 'Usability Testing & Iteration', desc: '40+ participants across 5 countries. A/B tests on fee disclosure timing, onboarding track assignments, and trust signal placement. Three major iteration cycles.' },
            { date: 'Week 15+', title: 'Launch & Post-launch Analytics', desc: 'Phased rollout with 8-week analytics tracking. Continuous optimization based on session recordings and conversion funnels.' },
          ]} />
        </CsSection>

        {/* Turning Point */}
        <section className="cs-section reveal" id="cs-turning-point">
          <div className="wrap">
            <CsBody style={{ maxWidth: '720px' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>After three weeks of research across four countries, I had a wall of sticky notes, twelve journey maps, and one uncomfortable truth: the problem wasn&rsquo;t that existing apps were bad at moving money. They were bad at moving <em>trust</em>.</p>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>Every competitor optimized for speed &mdash; fewer screens, faster flows, minimal friction. But our users didn&rsquo;t want fewer steps. They wanted fewer doubts. That reframe changed everything about how I designed ZentiPay.</p>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>I stopped asking &ldquo;how do we make this faster?&rdquo; and started asking &ldquo;what is the user afraid of right now?&rdquo; Every screen became an answer to a specific fear.</p>
            </CsBody>
          </div>
        </section>

        <CsFlowDiagram
          title="The Design Pivot"
          nodes={[
            { label: 'Research', desc: '4 countries, 12 journey maps' },
            { label: 'Insight', desc: 'Users fear doubt, not friction', accent: true },
            { label: 'Reframe', desc: '"What are they afraid of?"' },
            { label: 'Design', desc: '3 anxiety-reducing bets' },
            { label: 'Validate', desc: '30% higher completion' },
          ]}
        />

        <CsSection id="cs-decisions" label="03 &mdash; Design Decisions" title="Three bets that defined the product">
          <CsBody style={{ marginBottom: '3rem' }}>
            <p>Every design decision at ZentiPay traced back to one question: does this reduce the user&rsquo;s anxiety or increase their confidence? The product needed to feel simpler than a bank app while being more transparent than any competitor.</p>
          </CsBody>

          <h3 className="cs-section-subtitle">1. Adaptive Onboarding</h3>
          <div className="cs-two-col">
            <CsBody>
              <p><strong>The problem:</strong> A construction worker in Dubai and a graduate student in New York have fundamentally different relationships with technology. Forcing both through the same onboarding flow guaranteed at least one would drop off.</p>
              <p><strong>The solution:</strong> I designed an adaptive onboarding system that assessed tech literacy and country-specific requirements in the first three interactions. Based on signal cues &mdash; tap speed, scroll behavior, language selection &mdash; the flow adjusted its complexity, explanation density, and verification steps.</p>
              <p><strong>How it worked:</strong> New users saw a minimal country-and-purpose selector. The system then branched into three onboarding tracks: guided (step-by-step with visual cues), standard (clean forms with inline help), and express (minimal friction for power users). Users could switch tracks at any point.</p>
            </CsBody>
          </div>
          <CsBeforeAfter
            title="Onboarding Redesign"
            before={{
              label: 'Industry Standard',
              items: [
                '12-step linear flow for all users',
                'Same complexity regardless of tech literacy',
                'High drop-off at KYC verification steps',
                '40% abandonment before first transaction',
              ],
            }}
            after={{
              label: 'ZentiPay Adaptive',
              items: [
                '3 tracks: guided, standard, express',
                'Auto-detects literacy from behavioral signals',
                'KYC steps contextualized with visual cues',
                '65% reduction in onboarding drop-off',
              ],
            }}
          />

          <h3 className="cs-section-subtitle">2. Predictive Fee Estimator</h3>
          <div className="cs-two-col cs-two-col--reverse">
            <CsBody>
              <p><strong>The problem:</strong> Users abandoned transfers because fees appeared late in the flow &mdash; often higher than expected. The mental model was broken: &ldquo;I thought I was sending $300, but only $278 arrives?&rdquo;</p>
              <p><strong>The solution:</strong> I placed an AI-powered fee estimator on the very first screen of the transfer flow. Before users entered any personal details, they could see the exact amount their recipient would receive, the total fee breakdown (network fee, exchange rate margin, service fee), and a comparison against competitors.</p>
              <p><strong>The interaction:</strong> As users typed an amount, the estimator updated in real time &mdash; showing both the send amount and receive amount simultaneously. A confidence indicator displayed how likely the quoted rate was to hold for the next 15 minutes, eliminating the &ldquo;bait and switch&rdquo; anxiety.</p>
            </CsBody>
          </div>

          <CsBeforeAfter
            title="Fee Transparency"
            before={{
              label: 'Competitors',
              items: [
                'Fees revealed at confirmation step',
                'Exchange rate shown as a single number',
                'No way to compare against alternatives',
                '"Bait and switch" erodes trust',
              ],
            }}
            after={{
              label: 'ZentiPay',
              items: [
                'Fee estimator on the first screen',
                'Real-time breakdown: network + FX + service',
                'Built-in competitor rate comparison',
                '30% higher transaction completion rate',
              ],
            }}
          />

          <h3 className="cs-section-subtitle">3. Trust Architecture</h3>
          <div className="cs-two-col">
            <CsBody>
              <p><strong>The problem:</strong> Displaying all security credentials upfront overwhelms users. But hiding them makes users feel unsafe. Traditional fintech apps solve this by burying compliance badges in footers &mdash; where no one looks.</p>
              <p><strong>The solution:</strong> I designed a progressive trust disclosure system. Security signals appeared precisely when users needed reassurance, not before. During onboarding: regulatory compliance badges. At the payment step: encryption indicators and bank-grade security language. After transfer: real-time tracking with estimated delivery and receipt confirmation.</p>
              <p><strong>The framework:</strong> Each screen was scored on an &ldquo;anxiety index&rdquo; (1&ndash;10). High-anxiety screens &mdash; entering bank details, confirming large amounts, waiting for delivery &mdash; received proportionally more trust signals. Low-anxiety screens stayed clean.</p>
            </CsBody>
          </div>
          <CsCallout style={{ marginTop: '2rem' }}>
            <p><strong>Design principle:</strong> Trust signals should appear at the moment of doubt, not the moment of marketing. Every security indicator in ZentiPay was placed based on where users actually hesitated &mdash; identified through session recordings and click heatmaps.</p>
          </CsCallout>
        </CsSection>

        <CsSection id="cs-system" label="04 &mdash; Design System" title="Built for scale across languages, platforms, and literacy levels">
          <div className="cs-two-col">
            <CsBody>
              <p>ZentiPay needed to work identically in English, Hindi, Spanish, Tagalog, and Arabic &mdash; including RTL layouts. I built a component library from the ground up that treated internationalization as a first-class requirement, not a retrofit.</p>
              <p>The system comprised 120+ components across web and mobile, with built-in states for loading, error, success, and empty. Every component met WCAG AA contrast requirements and supported dynamic text scaling for users with accessibility needs.</p>
            </CsBody>
            <div>
              <ul className="cs-list">
                <li><strong>Accessibility-first:</strong> WCAG AA compliance, screen reader support, RTL layout system</li>
                <li><strong>Multi-language:</strong> Components designed for text expansion (German is 30% longer than English) and contraction</li>
                <li><strong>Motion system:</strong> Purposeful animations for transaction feedback &mdash; confirmations, progress states, and error recovery. No decorative motion.</li>
                <li><strong>Platform parity:</strong> Shared design tokens between web and mobile ensured visual consistency without identical layouts</li>
                <li><strong>Intelligent defaults:</strong> AI-driven pre-fill for repeat transfers, currency pairs, and recipient details based on user history</li>
              </ul>
            </div>
          </div>
        </CsSection>

        <CsSection id="cs-results" label="05 &mdash; Results" title="The numbers that mattered">
          <CsBody style={{ marginBottom: '2.5rem' }}>
            <p>Impact was measured through moderated usability testing with 40+ participants across 5 countries, A/B tests comparing old vs. new flows (Maze), and Hotjar analytics over the first 8 weeks post-launch. Baselines were established from the previous product version and competitor benchmarks from research.</p>
          </CsBody>
          <CsStatGrid stats={[
            { label: 'Transaction Completion (vs. previous flow)', value: '+30%' },
            { label: 'Perceived Wait Time (post-test survey)', value: '-40%' },
            { label: 'Onboarding Drop-off (vs. old linear flow)', value: '-65%' },
            { label: 'Usability Score (SUS, 5 countries)', value: '4.7/5' },
          ]} />
          <CsFeatureGrid features={[
            { title: 'Fee Estimator \u2192 Completion', desc: 'The old flow showed fees at the confirmation step. The redesigned flow shows fees on the first screen. A/B test over 4 weeks: users who saw the fee estimator first completed transfers at 30% higher rate (58% \u2192 75%).' },
            { title: 'Adaptive Onboarding \u2192 Retention', desc: 'The old linear 12-step flow had 40% abandonment. The adaptive 3-track system reduced drop-off by 65%. The guided track specifically retained 78% of low-tech-literacy users who previously churned at step 4 (KYC).' },
            { title: 'Live Tracking \u2192 Perceived Speed', desc: 'Transfer times did not change. Post-test surveys showed users perceived transfers as 40% faster because live status updates and push notifications made the wait visible instead of opaque.' },
            { title: 'Cross-cultural Consistency', desc: 'The 4.7/5 SUS usability score held across India, Philippines, Nigeria, Mexico, and UAE with \u00b10.3 variance \u2014 validating that the adaptive approach works better than per-market localized versions.' },
          ]} />
        </CsSection>

        <CsSection id="cs-learnings" label="06 &mdash; Key Learnings" title="What I'd carry forward">
          <CsBody style={{ marginBottom: '2.5rem' }}>
            <p>ZentiPay was the project that fundamentally changed how I think about designing financial products. Three lessons will shape everything I build next.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Trust Requires Transparency at Every Step', desc: 'In fintech, trust is not a feature \u2014 it\u2019s the product. Users don\u2019t read security badges. They feel safe when every interaction is predictable, every cost is visible, and every state change is explained. Designing for trust means designing for no surprises.' },
            { num: '2', title: 'Cross-cultural UX Demands Flexibility, Not Templates', desc: 'Localization is not translation. A user in Lagos and a user in Manila have different mental models for money, different trust thresholds, and different expectations for digital interactions. The only scalable approach is building adaptive systems that flex to context \u2014 not fixed flows that assume uniformity.' },
            { num: '3', title: 'Design for Anxiety, Not Just Efficiency', desc: 'Most fintech products optimize for speed: fewer clicks, faster flows, minimal screens. But when someone is sending their paycheck to their family 8,000 miles away, speed is not the priority \u2014 confidence is. I learned to measure success not in task completion time, but in hesitation reduction.' },
          ]} />
          <CsCallout style={{ marginTop: '2rem' }}>
            <p>The biggest misconception in fintech design is that users want fewer steps. They don&rsquo;t. They want fewer doubts. Every screen in ZentiPay was designed to eliminate one specific doubt &mdash; and that reframe made all the difference.</p>
          </CsCallout>
          <CsPullquote
            quote="This is the first time I knew exactly how much my kids would get before I pressed send."
            cite="&mdash; Usability test participant, Manila &mdash; a domestic worker who sends money to her children every two weeks"
          />
          <CsBody style={{ marginTop: '1.5rem', maxWidth: '720px' }}>
            <p>That sentence validated every late-night design review, every argument about whether to show fees upfront or bury them. It confirmed that what we built wasn&rsquo;t just a better payment app. It was a small act of respect for people who deserved to know where their money was going.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-whats-next" label="07 &mdash; What&rsquo;s Next" title="Where ZentiPay Goes From Here">
          <CsBody>
            <p>ZentiPay launched with three core innovations &mdash; adaptive onboarding, upfront fee estimation, and progressive trust disclosure. The foundation is proven. The next phase scales what works.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Recurring Transfers', desc: 'Most remittance users send the same amount to the same person every month. The next feature: one-tap recurring transfers with locked-in rates, automatic fee optimization, and delivery confirmation notifications for recipients.' },
            { num: '2', title: 'Recipient Experience', desc: 'The current product focuses on the sender. The next phase designs for the person receiving money: real-time delivery tracking, flexible pickup options, and in-language notifications. If the recipient trusts the platform, the sender does too.' },
            { num: '3', title: 'Financial Literacy Integration', desc: 'Research revealed many users did not understand exchange rates or fee structures. The next iteration embeds contextual financial literacy — explaining what an exchange margin is at the moment it appears, not in a help center no one reads.' },
          ]} />
        </CsSection>

        <CsSection label="Credits" title="Team">
          <CsCredits credits={[
            { role: 'Founding Product Designer', name: 'Parth Pawar' },
            { role: 'Scope', name: 'End-to-end Product Design, Research, Design System, Usability Testing' },
            { role: 'Platform', name: 'Web & Mobile (iOS, Android)' },
            { role: 'Duration', name: '2025' },
          ]} />
          <CsThanks contactCta style={{ marginTop: '4rem' }} />
        </CsSection>

        <BottomNav sections={[
          { id: 'cs-hook', label: 'The Hook' },
          { id: 'cs-problem', label: 'Problem' },
          { id: 'cs-research', label: 'Research' },
          { id: 'cs-timeline', label: 'Timeline' },
          { id: 'cs-turning-point', label: 'Turning Point' },
          { id: 'cs-decisions', label: 'Design Decisions' },
          { id: 'cs-system', label: 'Design System' },
          { id: 'cs-results', label: 'Results' },
          { id: 'cs-learnings', label: 'Learnings' },
          { id: 'cs-whats-next', label: 'What\u2019s Next' },
        ]} />

      </main>

      <NextProject slug="transfi" title="TransFi" image="/Assets/images/transfi.jpg" />
      <Footer />
    </>
  )
}
