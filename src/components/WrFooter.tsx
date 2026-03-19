import { Link } from 'react-router-dom';

export default function WrFooter() {
  return (
    <div className="wr-footer-reveal">
      <footer className="wr-footer" id="footer">
        <div className="wr-footer-body">
          <div className="wr-footer-cats">
            <div className="wr-footer-cats-col">
              <Link to="/work" className="wr-footer-cat-link">
                <span className="wr-footer-cat-num">01</span>
                <span className="wr-footer-cat-name">UX Projects</span>
              </Link>
              <Link to="/installations" className="wr-footer-cat-link">
                <span className="wr-footer-cat-num">02</span>
                <span className="wr-footer-cat-name">Art &amp; Installation</span>
              </Link>
            </div>
            <div className="wr-footer-cats-col">
              <Link to="/about" className="wr-footer-cat-link">
                <span className="wr-footer-cat-num">03</span>
                <span className="wr-footer-cat-name">About</span>
              </Link>
              <a href="mailto:parthpawar@nyu.edu" className="wr-footer-cat-link">
                <span className="wr-footer-cat-num">04</span>
                <span className="wr-footer-cat-name">Contact</span>
              </a>
            </div>
          </div>
          <div className="wr-footer-socials">
            <a href="mailto:parthpawar@nyu.edu" className="wr-social-btn">
              <span className="wr-social-default">EMAIL</span>
              <span className="wr-social-hover">EMAIL</span>
            </a>
            <a
              href="https://www.instagram.com/designwhich.works"
              target="_blank"
              rel="noopener"
              className="wr-social-btn"
            >
              <span className="wr-social-default">INSTAGRAM</span>
              <span className="wr-social-hover">INSTAGRAM</span>
            </a>
            <a
              href="https://www.linkedin.com/in/parth-pawar-1501/"
              target="_blank"
              rel="noopener"
              className="wr-social-btn"
            >
              <span className="wr-social-default">LINKEDIN</span>
              <span className="wr-social-hover">LINKEDIN</span>
            </a>
          </div>
          <div className="wr-watermark" aria-hidden="true">PARTHPAWAR</div>
        </div>
        <div className="wr-footer-bottom">
          <span>&copy; 2022&mdash;'26 PARTH PAWAR</span>
          <span>SAN FRANCISCO, CA</span>
        </div>
      </footer>
    </div>
  );
}
