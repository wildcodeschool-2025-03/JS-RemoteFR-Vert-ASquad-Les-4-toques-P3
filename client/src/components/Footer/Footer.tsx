import { Link } from "react-router";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <Link to="/contact" className="contact-link">
            <p>Contact</p>
          </Link>
          <Link to="/about" className="contact-link">
            <p>A propos du site</p>
          </Link>
        </div>
        <div className="logos">
          <img src="/images/instagram.svg" alt="logo instagram" />
          <img src="/images/facebook.svg" alt="logo facebook" />
          <img src="/images/twitter.svg" alt="logo twitter" />
        </div>
        <div className="footer-section">
          <p>Politique de confidentialité</p>
          <p>Mentions légales</p>
          <p>Copyright</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
