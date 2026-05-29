export const HOMEPAGE_CONTENT = {
  proofBand: {
    companies: ['Mentra', 'ZentiPay', 'TransFi', 'NYU ITP', 'IBM'],
    outcomes: [
      { label: 'Payment systems', value: 'Multi-market' },
      { label: 'Time saved per exec / week', value: '5.2 hrs' },
      { label: 'Fintech focus', value: 'Trust-first' },
      { label: 'Countries shipped across', value: '3' },
    ],
    testimonial: {
      quote: 'Within two weeks, I stopped checking email first. I check ExecutiveLens.',
      cite: 'VP of Product, beta participant',
    },
    recognition: "Head of UI/UX at Mentra. NYU ITP MPS '24. Work spanning AI wearables, fintech, and physical computing.",
  },
  latestThinking: [
    {
      href: '/writing/designing-for-glance',
      date: 'Mar 2026',
      tag: 'AI WEARABLES',
      title: 'Designing for Glance, Not Gaze',
      excerpt: 'What actually works when the display is the size of a postage stamp and attention lasts two seconds.',
    },
    {
      href: '/writing/receipt-architecture',
      date: 'Feb 2026',
      tag: 'AI DESIGN',
      title: 'Why Every AI Action Needs a Receipt',
      excerpt: 'Trust in AI products is a UX problem before it is a model problem.',
    },
    {
      href: '/writing/trust-beats-speed',
      date: 'Jan 2026',
      tag: 'FINTECH',
      title: 'Trust Beats Speed in Money Products',
      excerpt: 'Why slowing down a money flow can make it feel more trustworthy.',
    },
  ],
  latestShipped: [
    {
      href: '/clawed-chat',
      date: 'Mar 2026',
      tag: 'LATEST SHIPPED',
      title: 'Clawed',
      excerpt: 'Safety-first AI assistant with receipts, approvals, and smart-glasses support.',
    },
    {
      href: '/black-hole',
      date: 'Feb 2026',
      tag: 'EXHIBITION',
      title: 'Black Hole',
      excerpt: 'Five physical models translating black hole phenomena into form, light, and mechanism.',
    },
    {
      href: '/mentra-brand',
      date: 'Jan 2026',
      tag: 'BRAND SYSTEM',
      title: 'Mentra Brand & Packaging',
      excerpt: 'Identity, packaging, booklet, ads, and launch assets for AI smart glasses.',
    },
  ],
} as const
