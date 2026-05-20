# Portfolio Research-Backed UX and Copy Audit

Date: 2026-05-20

## Objective

Make the portfolio easier to move through and make the project writing feel more credible, specific, and backed by evidence. The site already has range and visual identity. The gap is consistency: some projects read like tight case studies, while others read like broad AI-generated summaries or long narrative pages without enough proof markers.

## Research Anchors

These are the principles this audit uses:

- Users scan before they commit. NN/g's F-pattern and web-reading research supports front-loading headings, summaries, and visible information scent rather than expecting linear reading. Source: [F-Shaped Pattern for Reading Web Content](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/).
- Progressive disclosure reduces perceived complexity when a page has expert detail. Lead with the essential path, then reveal deeper material. Source: [Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/).
- Credibility improves when claims are supported by concrete details, source cues, and verifiable evidence. Source: [Stanford Guidelines for Web Credibility](https://credibility.stanford.edu/guidelines/).
- Plain-language guidance consistently recommends short, direct, user-centered copy. Source: [GOV.UK Content Design: Planning, Writing and Managing Content](https://www.gov.uk/guidance/content-design).
- For AI projects, trust should be designed through transparency, uncertainty handling, human control, and accountable outcomes. Sources: [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), [Microsoft Human-AI Interaction Guidelines](https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/), [Google People + AI Guidebook](https://pair.withgoogle.com/guidebook/).

## Current Site Diagnosis

There are 45 project records in `src/data/projects.ts`. That is too many for a recruiter or evaluator to parse as one undifferentiated archive.

Current strengths:

- Strong Work page modes already exist: Editorial, Playlist, Index, Arc.
- Selected projects are meaningfully separated from archive work.
- Some pages already have strong evidence structure: `MentraPage.tsx`, `TransfiPage.tsx`, `ZentipayPage.tsx`, `ClawedChatPage.tsx`, `MentraBrandPage.tsx`, `OfficeOfDiversityPage.tsx`.
- The project registry has useful fields: `summaryProblem`, `summaryRole`, `summaryOutcome`, `summaryStats`, `testimonial`, and `storyline`.

Current friction:

- Project pages do not use one consistent case-study spine.
- Some archive pages are too thin for full case-study treatment but still appear beside stronger work.
- Several pages use generic phrases like "seamless," "intuitive," "immersive," "transformed," "AI-powered," "end-to-end," "frictionless," and "user-friendly" without immediate evidence.
- Many pages include em dashes and long paragraphs, which makes the copy feel generated and less edited.
- The site needs a visible evidence standard: what is measured, observed, shipped, exhibited, tested, or learned.

## Recommended Experience Model

The portfolio should support three reader modes:

1. **90-second recruiter scan**
   - Start with 6 to 8 proof-led projects, not all 45.
   - Each selected card should answer: problem, role, proof, result.
   - Keep the full archive available but visually secondary.

2. **5-minute hiring-manager review**
   - Provide a consistent "Project Brief" block on every selected project:
     - Context
     - My role
     - Constraints
     - What I changed
     - Evidence
     - Outcome
   - Add a "Skip to proof" link in the bottom nav or page header.

3. **Deep-dive evaluator**
   - Keep long sections, interactive demos, research process, and reflections.
   - Move speculative or unverified claims into a clearly labeled "Hypothesis / Next validation" area.

## Evidence Standard

Every significant claim should be rewritten into this pattern:

`Claim -> Evidence -> Source -> Confidence`

Examples:

- Weak: "Designed an intuitive onboarding flow."
- Better: "Reduced onboarding from 12 steps to 4 by merging account setup, device pairing, and permission education into one guided sequence."
- Evidence source: product analytics, prototype test, beta feedback, founder/client note, public launch artifact, photo/video, exhibition observation, shipped UI.
- Confidence tag: measured, observed, shipped, prototype-tested, inferred, speculative.

Recommended component:

`EvidenceLedger`

Fields:

- `claim`
- `evidence`
- `sourceType`
- `confidence`
- `artifactLink`

This can be rendered as a compact table or accordion near the top of full case studies.

## Project Triage

### Full Case Studies

These should receive the most rigorous evidence-backed writing:

- Mentra
- MiniApps in OS
- TransFi
- ZentiPay
- ExecutiveLens
- Clawed
- BreakGen / Keyboard Project
- Mentra Brand & Packaging
- Office of Diversity
- Raahi
- The Point CDC

Required treatment:

- Add Project Brief.
- Add Evidence Ledger.
- Keep 5 to 8 sections max unless the page has a strong reason for more.
- Add "What was validated" and "What is still unvalidated."

### Short Case Studies

These should be concise, visual, and proof-first:

- OrgDashboard
- CueTV
- Health App
- IBM Cancer Prognosis
- Ballah Code
- OnCall Lens
- AI Voice
- Jugalbandi
- Black Hole
- The Omakase
- TEDxVITPune
- Revolving Stage
- Code for Build

Required treatment:

- Keep to 3 to 5 sections.
- Replace broad claims with one concrete artifact, one constraint, one result.
- Avoid expanding them just to match the flagship pages.

### Archive Notes

These are better as visual archive entries, not full case studies:

- Flow Fields
- Computational Media
- Embodied Web
- Feeling Patterns
- Performance by Design
- On Becoming
- Storytelling
- DNA: Speculative Design
- Hypercinema
- Applications
- Messy Humans
- Production Studio
- Arcade Lab
- UV Light
- Sculpture
- VishwaConclave
- VJ Parivar
- Making of Time
- Sea of Salt
- Shuffle
- Moniac Machine
- Drowning
- ArtTown Podcast / Typeface

Required treatment:

- Use a "Project Note" template.
- 1 hero artifact, 1 paragraph, 3 proof chips, next/related project.
- Do not force these into recruiter-facing long-form pages.

## AI-Sounding Copy Flags

Automated scan found generic phrases in these files:

- `AiVoicePage.tsx`: intuitive, deep dive
- `BallahCodePage.tsx`: seamless, end-to-end
- `BreakGenPage.tsx`: AI-powered, intuitive
- `ClawedChatPage.tsx`: deep dive
- `DnaPage.tsx`: unlock
- `DrowningPage.tsx`: transforms, transformed
- `EnigmaPage.tsx`: intuitive, seamless
- `ExecutiveLensPage.tsx`: AI-powered, delight
- `HypercinemaPage.tsx`: immersive
- `JugalbandiPage.tsx`: transforms
- `OfficeOfDiversityPage.tsx`: user-friendly, seamless, data-driven
- `OnCallLensPage.tsx`: transforming, end-to-end, leveraging
- `OrgDashboardPage.tsx`: frictionless, seamless
- `RevolvingStagePage.tsx`: seamless, transformed
- `TedxPage.tsx`: transformed, seamless
- `TheOmakasePage.tsx`: transform, intuitive, transformed
- `ThePointCdcPage.tsx`: empowering, intuitive, user-friendly
- `TransfiPage.tsx`: intuitive
- `UvLightPage.tsx`: immersive, transformed
- `VjSoftwarePage.tsx`: seamless
- `ZentipayPage.tsx`: delight, end-to-end, AI-powered

Rewrite rule:

- Replace adjective claims with observable behavior.
- Replace "seamless" with the exact step removed, delay reduced, handoff clarified, or failure prevented.
- Replace "intuitive" with what users could do without instruction.
- Replace "AI-powered" with the model capability, human control, fallback, and failure handling.
- Replace "transformed" with before/after state.

## Research-Backed Page Structure

### Selected Project Template

1. Header
   - One-line outcome.
   - Role, timeline, team, constraints.

2. Project Brief
   - Problem
   - Audience
   - My role
   - Constraints
   - Result

3. Evidence Ledger
   - 3 to 6 rows.
   - Include source type and confidence.

4. Process
   - Only the decisions that changed the outcome.
   - No generic design-process boilerplate.

5. Artifact
   - Product screen, prototype, shipped object, event photo, diagram, or video.

6. What changed
   - Before / after.
   - Metric, observation, or shipped artifact.

7. Reflection
   - What this project proves about Parth's design judgment.
   - What still needs validation.

### Archive Project Note Template

1. Hero artifact.
2. "Why it exists" paragraph.
3. Three chips:
   - Medium
   - Constraint
   - Proof
4. Related next project.

## Specific UX Improvements

1. Add a "Start Here" work shelf.
   - 6 cards only.
   - Best for hiring managers.
   - Suggested: Mentra, TransFi, ZentiPay, ExecutiveLens, Clawed, Mentra Brand.

2. Add a "Proof Index" view.
   - Sort by evidence type: shipped, measured, exhibited, tested, research, speculative.
   - This helps readers trust claims quickly.

3. Add per-project "2 min summary / full case study" toggle consistently.
   - `ClawedChatPage.tsx` already has this pattern.
   - Apply it to full case studies only.

4. Add a "Related proof" module at the end of each project.
   - Example: Mentra -> MiniApps -> Mentra Brand.
   - Example: BreakGen -> The Omakase -> Black Hole.

5. Make NDA pages honest.
   - Use "NDA summary" but still show process, role, constraints, and anonymized evidence.
   - Avoid hiding weak proof behind NDA language.

## Research Plan by Project Type

### AI and Wearables

Use:

- NIST AI RMF for trustworthy AI claims.
- Microsoft HAX for human-AI interaction design.
- Google PAIR for uncertainty, control, and AI explanation patterns.

Evidence to add:

- Confidence states
- User control / override
- Permission model
- Failure and fallback behavior
- Human review points

### Fintech and Payments

Use:

- Trust, transparency, error prevention, and onboarding heuristics.
- Domain proof should come from transaction completion, onboarding time, support tickets, conversion, or compliance constraints.

Evidence to add:

- Before/after onboarding
- Transaction success
- Drop-off point removed
- Operational burden reduced

### Civic and Nonprofit

Use:

- Plain language, accessibility, service design, wayfinding, and trust.

Evidence to add:

- Program discoverability
- Accessibility checks
- Stakeholder interviews
- Community constraints
- Admin maintainability

### Installations and Physical Computing

Use:

- Exhibition observation, safety constraints, interaction affordances, material testing.

Evidence to add:

- Audience count
- Time on interaction
- Reset / durability constraints
- Materials and tolerances
- Public showing context

### Brand and Packaging

Use:

- Recognition, legibility, production constraints, real-world deployment.

Evidence to add:

- Print scale tests
- Packaging revisions
- Social template count
- Creator / customer usage
- Manufacturing constraints

## Implementation Phases

### Phase 1: Navigation and Information Scent

- Add "Start Here" shelf or make current Editorial view more explicit.
- Add evidence type chips to Work cards.
- Keep archive secondary.

### Phase 2: Shared Case Study Components

- Build `ProjectBrief`.
- Build `EvidenceLedger`.
- Build `ProjectNote`.
- Build `ValidationStatus` for measured / observed / shipped / inferred / speculative.

### Phase 3: Rewrite Flagship Copy

Order:

1. Mentra
2. TransFi
3. ZentiPay
4. ExecutiveLens
5. Clawed
6. BreakGen
7. Mentra Brand

### Phase 4: Convert Thin Pages

- Convert archive pages to shorter Project Notes.
- Remove long generic copy where there is no evidence to support it.

### Phase 5: Source Ledger

- Create `src/data/evidence.ts`.
- Keep all high-confidence claims in data, not scattered prose.
- This makes future editing easier and keeps claims auditable.

## Editorial Standard

Use this rule for every paragraph:

If it does not answer one of these questions, cut it:

- What was hard?
- What did I do?
- Why did I choose that?
- How do we know it worked?
- What artifact proves it?
- What would I validate next?

Tone:

- Specific over impressive.
- Evidence over adjectives.
- Constraints over process theater.
- Honest uncertainty over inflated outcomes.

