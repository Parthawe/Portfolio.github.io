export default function PixelLoaderVisual() {
  return (
    <div className="loader-editorial" aria-hidden="true">
      <div className="loader-mini-nav">
        <span className="loader-logo-pill">parth</span>
        <span className="loader-pill is-active">work</span>
        <span className="loader-pill">about</span>
        <span className="loader-pill">story</span>
      </div>

      <div className="loader-tabs">
        <span className="is-active">who i am</span>
        <span>what i care about</span>
        <span>what i believe in</span>
        <span>what i can build</span>
      </div>

      <div className="loader-statement">
        <h1>
          Design engineer creating calm interfaces for ambitious systems.
        </h1>
        <svg
          className="loader-script"
          viewBox="0 0 720 230"
          role="presentation"
          focusable="false"
        >
          <path
            d="M34 150 C92 98 126 78 149 102 C173 127 120 184 93 187 C62 191 67 133 116 104 C176 68 201 100 190 146 C182 184 234 186 276 120 C309 66 344 64 334 133 C330 164 344 183 374 166 C410 146 430 95 453 92 C485 88 467 169 502 173 C536 178 566 115 606 101 C655 84 683 117 671 161"
            pathLength="1"
          />
        </svg>
      </div>

      <div className="loader-scroll-cue">
        <span>↕</span>
        <strong>opening selected work</strong>
      </div>
    </div>
  )
}
