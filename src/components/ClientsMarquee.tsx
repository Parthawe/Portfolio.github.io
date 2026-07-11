const LOGOS = '/Assets/images/logos'

const CLIENT_LOGOS = [
  { src: `${LOGOS}/mentra-logo.png`, alt: 'Mentra' },
  { src: `${LOGOS}/ibm-logo.png`, alt: 'IBM' },
  { src: `${LOGOS}/nyu-tisch.png`, alt: 'NYU Tisch School of the Arts' },
  { src: `${LOGOS}/transfi-logo.png`, alt: 'TransFi' },
  { src: `${LOGOS}/the-point-logo.png`, alt: 'The Point CDC' },
  { src: `${LOGOS}/monsoonfish-logo.png`, alt: 'Monsoonfish' },
]

/* Infinite right-to-left logo marquee. The track holds two copies of the
   logo set and slides -50%; the second copy is decorative only. */
export default function ClientsMarquee() {
  return (
    <div className="wr-clients cl-marquee" aria-label="Organizations my work made a difference for">
      <p className="wr-clients-label">
        Where my work made a difference <span aria-hidden="true">{'↘'}</span>
      </p>
      <div className="cl-marquee-viewport">
        <div className="cl-marquee-track">
          {CLIENT_LOGOS.map((logo) => (
            <img key={logo.alt} src={logo.src} alt={logo.alt} loading="lazy" />
          ))}
          {CLIENT_LOGOS.map((logo) => (
            <img key={`${logo.alt}-dup`} src={logo.src} alt="" aria-hidden="true" loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  )
}
