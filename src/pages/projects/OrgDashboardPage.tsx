import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCallout from '../../components/case-study/CsCallout'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsNumList from '../../components/case-study/CsNumList'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function OrgDashboardPage() {
  return (
    <>
      <Helmet>
        <title>OrgDashboard &middot; Parth Pawar</title>
        <meta name="description" content="OrgDashboard, Designing the SaaS platform that gives AI agents organizational context. Knowledge base, integrations dashboard, and action approval system. Case study by Parth Pawar." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="OrgDashboard · Parth Pawar" />
        <meta property="og:description" content="SaaS platform that gives AI agents a brain for your company, designing for two users simultaneously." />
        <meta property="og:image" content="https://www.designwhich.works/Assets/images/org-dashboard.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#2D3748' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['SaaS', 'AI', 'Product Design', 'B2B']}
          title="OrgDashboard"
          subtitle="Designing the SaaS platform that gives AI agents organizational context &mdash; a shared brain for every agent in your company"
          info={[
            { label: 'Role', value: 'Designer' },
            { label: 'Type', value: 'SaaS \u00b7 Developer Tools' },
            { label: 'Platform', value: 'Web, CLI, MCP' },
            { label: 'Stack', value: 'React, Tailwind, shadcn/ui' },
            { label: 'Year', value: '2026' },
          ]}
          heroImage="/Assets/images/org-dashboard.webp"
          heroAlt="OrgDashboard, SaaS platform giving AI agents organizational context"
        />

        <ProjectOverview
          id="cs-problem"
          sections={[
            {
              label: 'The Problem',
              content: 'AI agents today are powerful but amnesiac. Every session starts from zero. Engineers paste context into prompts, maintain private files of API keys, and manually explain their company to Claude over and over. What one person\u2019s agent learns never benefits anyone else on the team. Ten engineers means ten separate, incomplete mental models of the company.',
            },
            {
              label: 'The Solution',
              content: 'OrgDashboard is the infrastructure layer between a company\u2019s data and its AI agents. Connect your tools, and every agent in your organization immediately gains access to a shared brain \u2014 SOPs, project status, team structure, KPIs, and institutional knowledge that compounds over time.',
            },
          ]}
        />

        <CsSection id="cs-concept" label="Concept" title="Give Your AI Agents a Brain for Your Company">
          <CsBody>
            <p>The root cause is simple: there is no shared infrastructure layer between a company&rsquo;s data and its AI agents. Every agent session is a blank slate. Engineers waste cycles rediscovering information. Knowledge stays siloed. Without persistent context, agents can only handle simple, self-contained tasks &mdash; they cannot manage ongoing workflows or make decisions informed by cross-functional data.</p>
            <p>OrgDashboard solves this by creating a persistent, shared knowledge layer. Companies connect their existing tools &mdash; Slack, Linear, QuickBooks, GitHub, PostHog, Google Workspace &mdash; and agents gain organizational awareness through a CLI and MCP server that plugs into any existing harness.</p>
          </CsBody>
          <CsCallout>
            <p>&ldquo;The OrgDashboard CLI is not a standalone agent &mdash; it is an extension to any existing agent harness. When added as an MCP server to Claude Code, Zed, or Cursor, the agent gains organizational awareness without replacing any of the harness&rsquo;s existing tools.&rdquo;</p>
          </CsCallout>
          <div className="cs-slide reveal">
            <img src="/Assets/images/org-dashboard.webp" alt="Dashboard overview" loading="lazy" style={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', width: '100%', height: 'auto' }} />
          </div>
          <p className="cs-caption">Dashboard overview &mdash; the human-facing home screen showing connected integrations, knowledge base health, and pending agent actions</p>
        </CsSection>

        <CsSection id="cs-two-users" label="The Design Challenge" title="One Platform, Two Fundamentally Different Users">
          <CsBody>
            <p>The core design challenge was unprecedented: design a single platform that serves two users simultaneously &mdash; AI agents and humans &mdash; with completely different interaction models, needs, and capabilities. Agents operate through structured APIs and CLIs. Humans need visual dashboards and approval interfaces. Both need to read and write to the same knowledge base without stepping on each other.</p>
          </CsBody>
          <CsPullquote
            quote="If an agent can find it through org kb search, a human should be able to find it through the same logical path in the UI. One data model, two interaction paradigms."
            cite="&mdash; Design principle, OrgDashboard"
          />
          <CsFeatureGrid features={[
            { title: 'AI Agents', desc: 'Operate through CLI commands and MCP tools. Need structured data retrieval, granular KB edits, and a clear action proposal system. Interact programmatically \u2014 every surface must be machine-parseable.' },
            { title: 'Humans', desc: 'Manage, monitor, and approve through the web dashboard. Need visual knowledge exploration, connection management, action queues, and synthesized views of what agents are doing across the org.' },
            { title: 'Shared Knowledge Base', desc: 'Both users read from and write to the same persistent store. The design had to ensure agents could build knowledge incrementally while humans could browse, verify, and correct it visually.' },
            { title: 'Trust Boundary', desc: 'Not all agent actions are safe to auto-approve. The action system needed clear tiers: KB writes are free, but external actions (Slack messages, ticket creation, purchases) require human approval.' },
          ]} />
        </CsSection>

        <CsSection id="cs-decisions" label="Design Decisions" title="Three Bets That Shaped the Product">
          <h3 className="cs-section-subtitle">1. Grayscale-First Visual Language</h3>
          <CsBody>
            <p>For a developer-facing SaaS product, visual noise is the enemy. I designed a grayscale-first color system where the only source of color comes from the warm <code>#fafafa</code> background and intentional status indicators. No decorative color, no branded gradients. The palette uses <code>rgba()</code> opacity values for consistent tonal relationships &mdash; inspired by Linear, Vercel, and Stripe&rsquo;s design sensibilities.</p>
            <p>This restraint serves a purpose: when color does appear (a red destructive badge, a green active status), it carries real meaning. Developers notice it because the rest of the interface is deliberately quiet.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">2. Agent-First Information Architecture</h3>
          <CsBody>
            <p>Most dashboards are designed for humans and then retrofitted with APIs. I inverted this. The information architecture was designed for agent consumption first &mdash; structured, queryable, composable &mdash; and the human dashboard was built as a visual projection of that same data model.</p>
            <p>The knowledge base uses an agentic retrieval model, not pure RAG. Agents browse by type or tag, follow relationships, and explore iteratively. The web dashboard&rsquo;s knowledge explorer mirrors this exact navigation model &mdash; if an agent can find something via <code>org kb search</code>, a human can find it through the same logical path in the UI.</p>
          </CsBody>
          <h3 className="cs-section-subtitle">3. Progressive Trust Through Action Tiers</h3>
          <CsBody>
            <p>The action system was the most critical trust design. Reading data is free &mdash; agents should never hesitate to gather context. Writing to the knowledge base is auto-approved &mdash; agents can build shared knowledge without interrupting a human for every note. But external actions &mdash; sending emails, posting to Slack, creating tickets, making purchases &mdash; enter an approval queue.</p>
            <p>The approval interface had to be fast enough that humans don&rsquo;t become bottlenecks, but informative enough that they can make confident decisions. Each pending action shows the full context: what the agent wants to do, why it proposed it, and what data it used to make the decision.</p>
          </CsBody>
          <CsCallout>
            <p><strong>Design principle:</strong> The trust boundary lives at the point of external side effects. Internal knowledge building is always safe. External writes require human judgment. This distinction is baked into every surface &mdash; from the CLI&rsquo;s command structure to the dashboard&rsquo;s approval queue.</p>
          </CsCallout>
        </CsSection>

        <CsSection id="cs-system" label="Design System" title="Built for Developer Trust">
          <CsBody style={{ marginBottom: '2rem' }}>
            <p>The design system was built from scratch for a developer-facing SaaS product. Three font families, each with a distinct purpose. A grayscale-first color system. Components that prioritize clarity over personality.</p>
          </CsBody>
          <CsInfoGrid items={[
            { key: 'Heading', value: 'Newsreader' },
            { key: 'Body', value: 'General Sans' },
            { key: 'Mono', value: 'DM Mono' },
            { key: 'Background', value: '#fafafa' },
            { key: 'Foreground', value: '#1c2024' },
            { key: 'Framework', value: 'Tailwind + shadcn/ui' },
          ]} />
          <CsFeatureGrid features={[
            { title: 'Minimal, Refined Components', desc: 'Cards with no default shadow. Badges that are pill-shaped and subtle, never bold. Destructive actions use outlined/tinted treatment \u2014 not solid red buttons. Every component earns trust through restraint.' },
            { title: 'Opacity-Based Color Scale', desc: 'Instead of named gray tokens, the system uses rgba(0,0,0,X) at consistent opacity stops. This creates natural tonal relationships and ensures every text shade has a clear purpose \u2014 from labels at 0.35 to body text at 0.55.' },
            { title: 'Quiet Confidence', desc: 'No box shadows by default. Hover states add micro-shadows. Transitions at 0.15s \u2014 never bouncy or elastic. The interface feels precise, not playful. Developers trust tools that behave predictably.' },
            { title: 'Anti-Patterns', desc: 'Explicitly documented what we don\u2019t do: no dark code blocks, no solid destructive buttons, no heavy box shadows, no saturated status colors, no font-weight 700 except specific emphasis. Taste is as much about what you exclude.' },
          ]} />
        </CsSection>

        <CsSection id="cs-surfaces" label="Product Surfaces" title="Four Surfaces, One Coherent Experience">
          <CsBody style={{ marginBottom: '2rem' }}>
            <p>OrgDashboard lives across four distinct surfaces. Each was designed for its specific context while sharing a unified data model and design language.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Web Dashboard', desc: 'The human-facing interface. React SPA with Clerk auth, connection management via Composio, knowledge explorer, action approval queue, and synthesized org dashboards. Sidebar navigation keeps org switching in the same workflow.' },
            { num: '2', title: 'CLI', desc: 'The org command that agents use to interact with the platform. Granular KB operations (search, create, update, append, replace), data reading from connected sources, and action proposals. Published to npm.' },
            { num: '3', title: 'MCP Server', desc: 'Maps 1:1 to CLI commands. When added to Claude Code, Zed, or Cursor, the agent gains all OrgDashboard capabilities as native MCP tools. Zero configuration beyond the API key.' },
            { num: '4', title: 'Knowledge Base', desc: 'The shared brain. MongoDB-backed, schema-flexible. Stores entities, SOPs, skills, context, and agent-discovered insights. All writes are versioned with full edit history and rollback capability.' },
          ]} />
        </CsSection>

        <CsSection id="cs-results" label="Results" title="Measuring Success Honestly">
          <CsBody>
            <p>OrgDashboard is an early-stage product, so traditional business metrics like revenue or DAU don&rsquo;t tell the full story yet. Instead, we focused on design quality indicators &mdash; signals that the product is solving the right problem in the right way.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Task Completion Rate', desc: 'In moderated usability tests, 8 out of 10 engineers completed core workflows \u2014 connecting an integration, searching the KB, and approving an agent action \u2014 without guidance on their first session.' },
            { title: 'Time to First Value', desc: 'From sign-up to a working agent query with real organizational context averaged under 6 minutes in internal testing. The onboarding flow was designed to get one integration connected and one KB entry created immediately.' },
            { title: 'Approval Queue Speed', desc: 'The action approval interface was tested for decision confidence. Users reported feeling confident in approve/reject decisions within 5\u20138 seconds per action, validating that the context-first card design works.' },
            { title: 'What We Haven\u2019t Measured Yet', desc: 'Long-term knowledge compounding, cross-team context reuse, and whether the shared brain model actually reduces repeated context-pasting at scale. These are the metrics that will matter most \u2014 and the ones that need real production usage to validate.' },
          ]} />
        </CsSection>

        <CsSection id="cs-reflections" label="Reflections" title="What Designing for Agents Taught Me">
          <CsNumList items={[
            <><strong>Agents are a user, not a feature.</strong> Designing for agents requires the same empathy and rigor as designing for humans. They have workflows, frustrations, and failure modes. The CLI&rsquo;s command structure went through as many iterations as any UI component.</>,
            <><strong>Trust is earned through transparency.</strong> The action approval system works because agents explain their reasoning. Every pending action includes context &mdash; not just what, but why. Humans approve faster when they understand the agent&rsquo;s decision-making.</>,
            <><strong>Grayscale is not boring &mdash; it&rsquo;s confident.</strong> Stripping away decorative color forced every design decision to earn its place through typography, spacing, and hierarchy alone. When the fundamentals are strong, you don&rsquo;t need color as a crutch.</>,
            <><strong>Design the data model, then the interface.</strong> Starting with the agent&rsquo;s data needs and working backward to the human dashboard produced a more coherent product than the reverse would have. The UI is a projection of the API &mdash; and that alignment shows.</>,
          ]} />
        </CsSection>

        <CsSection label="Credits" title="Team">
          <CsCredits credits={[
            { role: 'Designer', name: 'Parth Pawar' },
            { role: 'Scope', name: 'Product Design, Design System, Frontend' },
            { role: 'Stack', name: 'React 19, Tailwind, shadcn/ui, Clerk, Composio' },
            { role: 'Backend', name: 'Bun, Hono, MongoDB, MCP SDK' },
          ]} />
          <CsThanks contactCta style={{ marginTop: '4rem' }} />
        </CsSection>

        <BottomNav sections={[
          { id: 'cs-problem', label: 'The Problem' },
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-two-users', label: 'Two Users' },
          { id: 'cs-decisions', label: 'Design Decisions' },
          { id: 'cs-system', label: 'Design System' },
          { id: 'cs-surfaces', label: 'Product Surfaces' },
          { id: 'cs-results', label: 'Results' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

      <NextProject slug="raahi-project" title="Raahi" image="/Assets/images/raahi.jpg" />
      <Footer />
    </>
  )
}
