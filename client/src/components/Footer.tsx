import { Heart } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo gradient-text">Prasanna Kumar V</h2>
            <p className="footer-role">Full Stack Developer</p>
          </div>
          
          <div className="footer-socials">
            <a href="#" className="footer-social-icon" aria-label="GitHub"><FiGithub size={20} /></a>
            <a href="#" className="footer-social-icon" aria-label="LinkedIn"><FiLinkedin size={20} /></a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Prasanna Kumar V. All rights reserved.
          </p>
          <p className="made-with">
            Designed & Built with <Heart size={14} className="heart-icon" /> and Cosmic vibes.
          </p>
        </div>
      </div>
    </footer>
  );
}
