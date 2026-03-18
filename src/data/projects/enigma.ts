import type { ProjectMeta } from '@/types/project'

export const enigma: ProjectMeta = {
  slug: 'enigma',
  title: 'Enigma',
  subtitle: 'Interactive light sculpture embodying a real functioning deep learning network',
  description:
    'Enigma is an interactive light sculpture that embodies a real functioning deep learning network, using 200 illuminated neurons to elucidate the complexity of neural networks.',
  ogImage: 'https://www.designwhich.works/Assets/images/enigma.jpg',
  heroImage: '/Assets/images/enigma.jpg',
  projectColor: '#6B4C9A',
  tags: ['Creative Technology', 'AI', 'Installation'],
  categories: ['creative'],
  infoItems: [
    { label: 'Year', value: '2023' },
    { label: 'Role', value: 'Creator' },
  ],
  backLink: { label: '\u2190 Work', href: '/work' },
  nextProject: {
    slug: 'making-of-time',
    title: 'Making of Time',
    image: '/Assets/images/making-of-time.jpg',
  },
  bottomNavSections: [
    { id: 'cs-concept', label: 'Concept' },
    { id: 'cs-technology', label: 'Technology' },
    { id: 'cs-exhibition', label: 'Exhibition' },
  ],
  sections: [
    // ── Hero Video ──
    {
      type: 'callout',
      text: 'https://player.vimeo.com/video/895893649?h=d78737dcdb&badge=0&autopause=0&player_id=0&app_id=58479',
    },

    // ── Overview ──
    {
      type: 'overview',
      columns: [
        {
          heading: '200 Neurons of Light',
          body: 'Enigma is an interactive light sculpture that intricately embodies a real functioning deep learning network, using 200 unique illuminated neurons to artistically elucidate the complexity of neural networks, inviting audiences to explore the convergence of art and science in a captivating visual experience.\n\nThe genesis of this project drew inspiration from the \u2018Abacus\u2019 project undertaken at panGenerator Studio. While \u2018the Abacus\u2019 focused on recognizing digits, Enigma operates on a similar concept but with alphabetic characters instead of digits.',
        },
      ],
    },

    // ── 01 \u2014 Concept ──
    {
      type: 'text',
      id: 'cs-concept',
      label: '01 \u2014 Concept',
      title: 'Illuminated Neural Architecture',
      body: [
        'Enigma was born from a desire to make artificial intelligence tangible. Neural networks are often described in abstract terms \u2014 layers, weights, activations \u2014 yet their inner workings remain invisible to most people. The sculpture translates that hidden computation into physical light: 200 individually addressable LED neurons are arranged in a network topology that mirrors the actual architecture of a trained neural network, turning each mathematical operation into a visible pulse of color.',
        'The piece takes the form of a large wall-mounted panel, roughly four feet wide and three feet tall, with each LED node suspended at a precise position corresponding to a neuron in the network\u2019s layers. Acrylic rods and custom-fabricated mounts hold the LEDs in place, creating a three-dimensional constellation of light that reveals the structure of the model \u2014 input layer at one edge, hidden layers in the center, and output layer at the opposite edge. When the network is idle, the sculpture glows softly; when it is processing, light cascades through the layers in real time, making the flow of information something viewers can see and feel.',
        'Viewers are not passive observers. By writing a character on a connected tablet, they initiate inference and watch their input propagate through the physical network. The metaphor is immediate: light is information, brightness is activation strength, and the path it travels is the decision the model makes. Enigma invites audiences to develop an intuitive understanding of deep learning \u2014 not through equations or code, but through the universal language of light and motion.',
      ],
    },

    // ── Images 1\u20133 ──
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/G1896202568057018034140303655446/1.jpg',
      alt: 'Enigma sculpture \u2014 overview of the illuminated neural network',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/K1896202568075464778214013207062/2.jpg',
      alt: 'Enigma sculpture \u2014 close-up of LED neurons',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/S1896202568093911522287722758678/3.jpg',
      alt: 'Enigma sculpture \u2014 network topology detail',
    },

    // ── 02 \u2014 Technology ──
    {
      type: 'text',
      id: 'cs-technology',
      label: '02 \u2014 Technology',
      title: 'From Model to Light',
      body: [
        'At the core of Enigma is a fully connected feedforward neural network trained on the EMNIST letters dataset to recognize handwritten alphabetic characters. The model consists of an input layer, two hidden layers, and an output layer \u2014 each layer physically represented by a row of LEDs on the sculpture. After training, the learned weights and biases are exported and loaded onto the hardware so the sculpture can perform inference locally, without any cloud dependency.',
        'The hardware stack centers on an Arduino Mega microcontroller that orchestrates the entire visualization pipeline. A companion laptop captures handwritten input from a tablet, preprocesses the image into a 28 by 28 pixel grayscale matrix, and transmits the flattened pixel values to the Arduino over serial communication. The Arduino then performs a forward pass through the network, computing activations layer by layer. Each of the 200 LEDs is driven by TLC5940 constant-current LED drivers daisy-chained together, giving individual brightness control over every node with 12-bit resolution.',
        'As the forward pass executes, each neuron\u2019s activation value is mapped to an LED brightness level, so viewers see the data literally flow from the input layer through the hidden layers to the output. Highly activated neurons glow brightly while low-activation neurons remain dim, revealing which pathways the network relies on for a given character. The entire cycle \u2014 from drawing a letter to seeing the network\u2019s prediction light up at the output layer \u2014 completes in under a second, creating a seamless real-time connection between human gesture and machine computation.',
      ],
    },

    // ── Images 4\u20135 ──
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/E1896202568112358266361432310294/4.jpg',
      alt: 'Enigma \u2014 technology and wiring detail',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/S1896202568130805010435141861910/5.jpg',
      alt: 'Enigma \u2014 LED driver and Arduino setup',
    },

    // ── 03 \u2014 Exhibition ──
    {
      type: 'text',
      id: 'cs-exhibition',
      label: '03 \u2014 Exhibition',
      title: 'ITP Winter Show 2023',
      body: [
        'Enigma was exhibited at the ITP Winter Show 2023, NYU\u2019s flagship end-of-semester showcase where the Interactive Telecommunications Program opens its doors to the public. The show draws thousands of visitors over two days \u2014 designers, engineers, artists, families, and curious New Yorkers \u2014 making it an ideal venue to test how a broad audience engages with a piece about machine learning.',
        'Visitors interacted with Enigma by writing letters on a tablet stationed in front of the sculpture. As soon as a character was submitted, the network came alive: light rippled from the input layer through the hidden layers and converged on the output, where the predicted letter glowed brightest. Many visitors wrote the same letter repeatedly, noticing how different handwriting styles activated different pathways. Others tested edge cases \u2014 ambiguous letters, symbols, or scribbles \u2014 to see how the network responded to unexpected input.',
        'The most consistent reaction was surprise at how structured and purposeful the light patterns looked. Viewers frequently remarked that they expected AI to feel random or opaque, but watching activations cascade through defined pathways gave them an immediate sense that the network had learned real structure. Several visitors described the experience as the first time neural networks \u201cmade sense\u201d to them. The exhibition reinforced the project\u2019s central thesis: that making computation physically visible can bridge the gap between technical understanding and intuitive comprehension.',
      ],
    },

    // ── Images 6\u20137 ──
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/O1896202568186145242656270516758/8.jpg',
      alt: 'Enigma at ITP Winter Show \u2014 audience interaction',
    },
    {
      type: 'image',
      src: 'https://freight.cargo.site/w/2000/i/D1896202568204591986729980068374/9.jpg',
      alt: 'Enigma at ITP Winter Show \u2014 exhibition view',
    },

    // ── Thank You ──
    {
      type: 'thank-you',
      title: 'Thank You',
    },
  ],
}
