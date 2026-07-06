/* The playbook — eight working values, mirrored from designwhich.works/playbook. */

export interface PlaybookValue {
  num: string
  slug: string
  title: string
  points: { lead: string; body: string }[]
}

export const PLAYBOOK_VALUES: PlaybookValue[] = [
  {
    num: '01',
    slug: 'empathy',
    title: 'Empathy for the User',
    points: [
      {
        lead: 'Understanding Needs',
        body: 'I prioritize understanding the core needs, motivations, and pain points of the users. By putting myself in their shoes, I can design experiences that truly resonate with them.',
      },
      {
        lead: 'Designing for Accessibility',
        body: 'Ensuring that my designs are inclusive and accessible to all users, regardless of their abilities or backgrounds, is crucial to my process.',
      },
    ],
  },
  {
    num: '02',
    slug: 'holistic-thinking',
    title: 'Holistic Thinking',
    points: [
      {
        lead: 'Seeing the Bigger Picture',
        body: 'I approach design with a focus on the entire system, considering how each element interacts within the broader context — cohesive, consistent experiences across touchpoints.',
      },
      {
        lead: 'Balancing Creativity and Feasibility',
        body: 'I strive to merge creative vision with practical constraints, ensuring solutions are innovative but also technically sound and feasible.',
      },
    ],
  },
  {
    num: '03',
    slug: 'innovation',
    title: 'Innovation and Experimentation',
    points: [
      {
        lead: 'Pushing Boundaries',
        body: 'I love exploring new ideas and pushing the boundaries of what’s possible, whether through emerging technologies or unconventional design approaches.',
      },
      {
        lead: 'Learning by Doing',
        body: 'Experimentation is at the heart of my creative process. I constantly prototype, test, and iterate to discover new possibilities and refine my ideas.',
      },
    ],
  },
  {
    num: '04',
    slug: 'collaboration',
    title: 'Collaboration and Communication',
    points: [
      {
        lead: 'Working as a Team',
        body: 'I work closely with cross-functional teams to align on goals and deliver results. Clear communication keeps everyone on the same page.',
      },
      {
        lead: 'Bridging Gaps',
        body: 'I often act as a bridge between design and development, translating creative concepts into technical specifications and carrying the vision through to execution.',
      },
    ],
  },
  {
    num: '05',
    slug: 'adaptability',
    title: 'Adaptability and Flexibility',
    points: [
      {
        lead: 'Embracing Change',
        body: 'In the fast-paced world of design and technology, I stay adaptable and open to change, continuously evolving my approach based on feedback and new insights.',
      },
      {
        lead: 'Navigating Challenges',
        body: 'I adjust quickly to new requirements and unexpected challenges, ensuring the end product meets both user needs and business goals.',
      },
    ],
  },
  {
    num: '06',
    slug: 'ethics',
    title: 'Ethical Responsibility',
    points: [
      {
        lead: 'Designing with Integrity',
        body: 'I am committed to products that respect user privacy, promote inclusivity, and are ethically sound. Technology should be a force for good.',
      },
      {
        lead: 'Championing Ethical Tech',
        body: 'Whether it’s ensuring data security or promoting transparency, I advocate for ethical practices in all aspects of my projects.',
      },
    ],
  },
  {
    num: '07',
    slug: 'learning',
    title: 'Continuous Learning',
    points: [
      {
        lead: 'Staying Curious',
        body: 'I am a lifelong learner — mastering new design tools, exploring the latest in technology, and committed to growing as a designer and technologist.',
      },
      {
        lead: 'Learning from Experiences',
        body: 'I value the lessons from both successes and failures, using them as stepping stones to improve and innovate in my future work.',
      },
    ],
  },
  {
    num: '08',
    slug: 'empowerment',
    title: 'User Empowerment',
    points: [
      {
        lead: 'Empowering Through Design',
        body: 'My goal is to create designs that empower users, making them feel in control and confident in their interactions with technology.',
      },
      {
        lead: 'Building for Impact',
        body: 'I build products that not only meet user needs but inspire and enable people to achieve more — a positive impact on their lives.',
      },
    ],
  },
]
