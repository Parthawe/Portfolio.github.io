export interface ProjectStoryline {
  challenge: string
  approach: string
  result: string
}

export const PROJECT_STORYLINES: Partial<Record<string, ProjectStoryline>> = {
  mentra: {
    challenge: 'AI glasses usually feel like disconnected demos unless the OS, companion app, and ecosystem behave like one product.',
    approach: 'I designed the operating system, companion app, and app distribution layer together so voice, glanceable UI, and developer workflows reinforced the same mental model.',
    result: 'The story here is platform-level thinking across hardware, software, and distribution, not just a collection of wearable screens.',
  },
  'mentra-miniapps': {
    challenge: 'A wearable app store cannot rely on phone-era browse patterns because attention is shorter and input is constrained.',
    approach: 'I framed discovery around voice, intent, and lightweight developer primitives so mini-apps felt native to glasses instead of copied from mobile.',
    result: 'This turns hardware into an ecosystem and shows product strategy, interaction design, and platform thinking in one system.',
  },
  'transfi-project': {
    challenge: 'Cross-border crypto payments were operationally powerful but cognitively heavy, especially across six markets with different expectations and constraints.',
    approach: 'I simplified the flows around trust, clarity, and speed, then aligned the product language across partner, merchant, and user touchpoints.',
    result: 'The case study ties design to transaction confidence and scale, which is what makes a payment system feel credible.',
  },
  zentipay: {
    challenge: 'Super-apps fail when every feature fights for attention and the core money flow becomes harder instead of easier.',
    approach: 'I treated the product as a system, prioritizing the transaction path first and then layering adjacent utility around it without breaking the core experience.',
    result: 'This positions the work as end-to-end fintech product design with measurable impact, not just feature assembly.',
  },
  'clawed-chat': {
    challenge: 'Most AI assistants look capable until the user asks what the system actually did or whether it can be trusted.',
    approach: 'I designed the assistant around receipts, action traceability, and controlled delegation so every step stayed legible.',
    result: 'The project signals judgment around safety, transparency, and applied AI, which is what serious AI product work now demands.',
  },
  executivelens: {
    challenge: 'Executives were drowning in meetings, but summary tools often stop at note-taking and miss the decision layer.',
    approach: 'I focused the product on synthesis, follow-through, and adoption so the AI felt like a working layer for leadership rather than another dashboard.',
    result: 'The project shows I can translate AI capability into concrete time savings and operational behavior change.',
  },
  'org-dashboard': {
    challenge: 'AI agents cannot operate well inside companies if they lack organizational context, permissions, and admin clarity.',
    approach: 'I designed for two users at once, human operators and agents, with a system that makes governance, setup, and context legible.',
    result: 'It proves comfort with ambiguous B2B systems where the real design problem is modeled relationships, not just interface polish.',
  },
  cuetv: {
    challenge: 'A niche arts streaming product could not borrow generic OTT patterns because expert viewers search differently and growth had to reach fragmented audiences.',
    approach: 'I paired audience research with a scalable ad and discovery system, then tightened the platform experience around precise browsing and playback.',
    result: 'The project shows research, growth thinking, and product design working as one service system.',
  },
  healthapp: {
    challenge: 'Productivity tools optimize output, but they rarely intervene when the schedule itself is unhealthy.',
    approach: 'I reframed planning as a wellness-aware system, where time, recovery, and behavior patterns influence the task flow itself.',
    result: 'The page reads as a product hypothesis with a clear point of view, not just a visual redesign exercise.',
  },
  ibm: {
    challenge: 'Sensitive cancer prognosis workflows depend on complex genomic data, but the transfer experience has to stay secure, reliable, and understandable.',
    approach: 'I focused on trust, clarity, and decision support so the interface could support high-stakes medical collaboration without exposing unnecessary complexity.',
    result: 'It demonstrates design judgment in a regulated, high-consequence environment where credibility matters as much as usability.',
  },
  'ballah-code': {
    challenge: 'Most AI coding tools still behave like autocomplete with branding, not like a serious production collaborator.',
    approach: 'I designed the IDE around task orchestration, tool visibility, and engineer-grade workflows so AI felt accountable inside the environment.',
    result: 'This project signals strong taste in devtools UX and a clear understanding of how engineers evaluate credibility.',
  },
  'oncall-lens': {
    challenge: 'On-call response breaks down when critical context is trapped inside laptops, tabs, and alert noise.',
    approach: 'I compressed the loop from alert to analysis to action into a wearable flow that preserved confidence while removing unnecessary friction.',
    result: 'The project proves speed, systems thinking, and the ability to design constrained interfaces for urgent technical work.',
  },
  'ai-voice': {
    challenge: 'Enterprise voice tooling often reduces voice choice to a superficial brand setting instead of a functional design decision.',
    approach: 'I structured selection around emotional fit, scenario testing, and confidence in how a voice behaves across real customer moments.',
    result: 'The work shows sensitivity to conversation design, evaluation criteria, and the productization of an emerging AI capability.',
  },
  'raahi-project': {
    challenge: 'Public transit systems fail when information breaks across kiosks, vehicles, and mobile touchpoints instead of acting like one journey.',
    approach: 'I designed the service as a connected system, aligning the app, in-vehicle guidance, and physical interfaces around the rider\'s mental model.',
    result: 'The case study shows service design range and the ability to unify digital and environmental touchpoints.',
  },
  'the-point-cdc': {
    challenge: 'Community organizations often have deep local value but weak digital systems that make services harder to discover and trust.',
    approach: 'I redesigned the platform around clearer structure, community relevance, and easier access to programs and information.',
    result: 'This frames the work as mission-driven digital transformation, not just a nonprofit website refresh.',
  },
  'office-of-diversity': {
    challenge: 'Annual DEI reporting usually buries its message inside inaccessible PDFs and static charts.',
    approach: 'I turned the report into an accessible interactive system, making the information easier to navigate, compare, and actually absorb.',
    result: 'The project shows strong accessibility judgment and the ability to translate institutional content into a usable public experience.',
  },
  jugalbandi: {
    challenge: 'AI music collaborations often feel like novelty unless the machine responds with enough nuance to sustain a real duet.',
    approach: 'I built the instrument around human improvisation, giving the neural system a performable role instead of a decorative one.',
    result: 'The case study demonstrates interaction design beyond screens, where behavior, timing, and embodiment carry the experience.',
  },
  'keyboard-project': {
    challenge: 'Custom keyboard creation is split across expert-only tools, which keeps most people outside the making process.',
    approach: 'I collapsed layout, generative design, and fabrication prep into one guided flow so intent could move directly toward a buildable object.',
    result: 'It reads as a true design-engineering thesis, where concept, system, and prototype all reinforce each other.',
  },
  'vj-software': {
    challenge: 'Many VJ tools are visually powerful but operationally dense, which makes live performance harder under time pressure.',
    approach: 'I used competitive analysis and persona work to simplify live control, responsiveness, and audiovisual feedback.',
    result: 'The project shows that even performance software can be framed as a serious workflow product, not just an aesthetic tool.',
  },
  enigma: {
    challenge: 'Neural networks are abstract enough that most people understand the term long before they understand the behavior.',
    approach: 'I translated that invisible logic into a physical light sculpture so computation could be seen as a living system.',
    result: 'The piece shows a strong ability to turn technical concepts into experiential storytelling.',
  },
  shuffle: {
    challenge: 'Physical games fall flat when the rules are simple but the body does not actually matter.',
    approach: 'I designed the LED grid and weight-sensing interaction so strategy emerged from movement, timing, and social pressure.',
    result: 'It positions the project as embodied game design, where mechanics and hardware are part of the narrative.',
  },
  'making-of-time': {
    challenge: 'Timekeeping is usually taught as a finished artifact, not as an evolving sequence of human inventions.',
    approach: 'I used three mediums, sundial, mechanical watch, and software clock, to show how the same concept changes with technology.',
    result: 'The project works because the form is the argument: history, craft, and interface design all support the story.',
  },
  'sea-of-salt': {
    challenge: 'Folktales are often consumed passively, which makes their material richness disappear.',
    approach: 'I made the act of reading physical by linking the Norse story to grinding real salt as the narrative unfolds.',
    result: 'This is strong interaction storytelling because the medium carries the metaphor, not just the text.',
  },
  'flow-fields': {
    challenge: 'Generative visuals become wallpaper quickly if there is no underlying rule worth watching.',
    approach: 'I used Perlin noise and particle behavior as the core system so the piece stayed coherent even while constantly changing.',
    result: 'The work shows computational aesthetics with enough rigor to feel designed rather than accidental.',
  },
  'embodied-web': {
    challenge: 'Most browser experiences assume the body ends at the keyboard and trackpad.',
    approach: 'I treated the body as an input layer, using motion, webcam signals, and spatial behavior to test more physical forms of interaction.',
    result: 'This project extends my interaction thinking beyond screen layout into sensing, presence, and embodied control.',
  },
  'feeling-patterns': {
    challenge: 'Emotion is easy to talk about and hard to translate into something tactile and structurally meaningful.',
    approach: 'I explored how pressure, fabric, and haptic logic could turn emotional states into wearable patterns and feedback systems.',
    result: 'The project shows speculative systems thinking grounded in material experimentation.',
  },
  'performance-by-design': {
    challenge: 'Live performance is held together by invisible systems that audiences never see but always feel.',
    approach: 'I focused on the backstage layer, sequencing, lighting, audio, and audience movement, to design the conditions that make performance work.',
    result: 'It reframes production design as experience architecture rather than support labor.',
  },
  'on-becoming': {
    challenge: 'Career growth is often presented as a clean ladder when it is usually a messy shift in identity, taste, and responsibility.',
    approach: 'I used writing and reflection to document that transition honestly, treating the project as a design artifact instead of a diary entry.',
    result: 'The work adds interiority to the portfolio and shows that I can articulate not just outcomes, but how my thinking evolves.',
  },
  storytelling: {
    challenge: 'Products tell stories whether designers intend them to or not, through pacing, sequencing, and what they choose to reveal.',
    approach: 'I broke storytelling down into structure, timing, and medium so the project reads like a framework rather than a vague creative belief.',
    result: 'It clarifies a core strength across the portfolio: I design systems that communicate through experience, not decoration.',
  },
  'dna-speculative': {
    challenge: 'Speculative design gets weak when the provocation is obvious but the artifact itself is not believable.',
    approach: 'I built the project like a real pharmaceutical system, using packaging, dosage, and messaging to make the question feel uncomfortably plausible.',
    result: 'The work shows narrative control and artifact realism, which gives the speculation weight.',
  },
  'comp-media': {
    challenge: 'Weekly sketch practices can become disconnected exercises unless each experiment pushes a different formal or interactive question.',
    approach: 'I used p5.js as a lab for rapid explorations in generative portraiture, data landscapes, and interactive typography.',
    result: 'The body of work proves curiosity, consistency, and comfort with code as a material for visual thinking.',
  },
  hypercinema: {
    challenge: 'Immersive media often promises presence but delivers novelty without a clear narrative structure.',
    approach: 'I combined 360 video, spatial sound, and multi-screen projection to test how story changes when the viewer is inside the environment.',
    result: 'The project shows I can shape narrative across formats where space and sequencing matter as much as image.',
  },
  applications: {
    challenge: 'Student applications often stop at promising prototypes instead of crossing the line into shipped, working tools.',
    approach: 'I focused on building and deploying two real web apps so the work could be judged by use, not just intent.',
    result: 'This signals execution discipline and a bias toward making things operational.',
  },
  'messy-humans': {
    challenge: 'Personas and happy paths often erase the emotional volatility and edge cases that define real human behavior.',
    approach: 'I centered the work on inclusive research and uncomfortable scenarios, looking at what breaks when people are stressed, distracted, or atypical.',
    result: 'It shows a more mature research stance, one that designs for reality instead of idealized users.',
  },
  'production-studio': {
    challenge: 'Creative teams often underestimate how much of shipping is coordination, not concept generation.',
    approach: 'I led the work like a production system, shaping scope, team rhythm, stakeholder communication, and final delivery together.',
    result: 'The project demonstrates leadership under constraints and the operational side of design caliber.',
  },
  'arcade-lab': {
    challenge: 'Physical play concepts are easy to pitch and hard to validate without repeated, fast iteration.',
    approach: 'I treated the lab as a rapid prototyping engine, testing controllers, mechanics, and social dynamics until stronger ideas emerged.',
    result: 'It makes the eventual Omakase project feel earned because the experimentation behind it is visible.',
  },
  'black-hole': {
    challenge: 'Astrophysics concepts like lensing and time dilation are powerful, but they remain abstract for most audiences.',
    approach: 'I built five physical models that let people encounter black hole behavior through form, mechanism, and observation.',
    result: 'The project demonstrates that I can make complex science legible through fabrication and exhibition design.',
  },
  'uv-light': {
    challenge: 'An installation based only on spectacle is easy to admire and easy to forget.',
    approach: 'I structured the rooms around discovery, hidden messages, and projection so the environment rewarded movement and attention.',
    result: 'It shows spatial sequencing and experiential pacing, not just lighting effects.',
  },
  'the-omakase': {
    challenge: 'Most indie arcade games treat the cabinet as a container, not as part of the game logic.',
    approach: 'I designed the controllers, feedback, and pacing together so the physical build shaped the competitive sushi ritual.',
    result: 'The project proves I can choreograph interaction across software, hardware, and social play.',
  },
  'revolving-stage': {
    challenge: 'Stage mechanisms only matter when they disappear into the performance and stay reliable under real load.',
    approach: 'I engineered the rotating structure around safety, weight, and theatrical movement rather than over-designing the form.',
    result: 'The case study shows applied fabrication thinking and respect for backstage constraints.',
  },
  'moniac-machine': {
    challenge: 'Economic systems are hard to teach because they are often explained abstractly and remembered poorly.',
    approach: 'I turned a historic hydraulic computer into a strategy game so policy, flow, and consequence could be learned through play.',
    result: 'This project demonstrates systems thinking made tangible, which is a recurring strength across the portfolio.',
  },
  drowning: {
    challenge: 'Scenic environments can look atmospheric in isolation but fail when they do not support lighting, sightlines, and audience emotion together.',
    approach: 'I designed the greenhouse set as a layered stage environment, using texture and light to reinforce the story rather than compete with it.',
    result: 'The project shows environmental storytelling that accounts for theatrical reality, not just visual mood.',
  },
  sculpture: {
    challenge: 'Competition sculptures need to communicate quickly while still rewarding close formal attention.',
    approach: 'I explored material, silhouette, and balance to create pieces that could hold their own in a high-attention public setting.',
    result: 'The work adds evidence of physical craft and form-making outside digital product constraints.',
  },
  'mentra-brand': {
    challenge: 'New hardware brands need to feel credible before the product is even in someone\'s hand.',
    approach: 'I designed the identity, packaging, printed matter, and launch assets as one coherent system around clarity, confidence, and restraint.',
    result: 'It shows I can carry a product story from industrial object to shelf experience to launch surface.',
  },
  tedx: {
    challenge: 'Large event branding often collapses into a logo-on-stage moment instead of a spatial experience people remember.',
    approach: 'I art directed the event as a cityscape system, aligning stage design, parallax depth, and team execution at scale.',
    result: 'The project signals leadership, coordination, and the ability to translate a visual idea into a live environment.',
  },
  'code-for-build': {
    challenge: 'Developer platforms often speak either to contributors or to brand, but rarely to both with clarity.',
    approach: 'I built a brand and product language that made the startup feel credible to engineers while staying legible to a broader audience.',
    result: 'It demonstrates product-adjacent brand thinking, where trust and usability are designed together.',
  },
  typeface: {
    challenge: 'Custom type work becomes decorative quickly if the core visual rule does not survive across the full character set.',
    approach: 'I used the slice motif as a system, testing where it could disrupt form while still preserving rhythm, legibility, and family resemblance.',
    result: 'The project shows patience, precision, and systems thinking at the smallest visual scale.',
  },
  atps: {
    challenge: 'Creative podcasts are easy to start and hard to sustain with a point of view that feels useful.',
    approach: 'I shaped the series around recurring editorial structure, guest curation, and a consistent release rhythm that made the conversations accessible.',
    result: 'It reveals storytelling discipline and long-form content judgment, not just graphic support.',
  },
  vishwaconclave: {
    challenge: 'Student conferences often look energetic but fail to communicate credibility or a clear thematic identity.',
    approach: 'I aligned the event branding, website, and creative direction so the conference felt intentional before attendees ever arrived.',
    result: 'The project shows how brand systems can establish trust for emerging institutions.',
  },
}
