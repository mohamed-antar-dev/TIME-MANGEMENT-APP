import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn  } from "react-icons/fa6";

import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-column brand-column">
            <div className="footer-logo">
              <h3>TaskTime</h3>
              <span className="logo-tagline">Master Your Time</span>
            </div>
            <p className="footer-description">
              The complete productivity suite for students, professionals, and everyone in between. 
              Manage your tasks, track your time, and organize your notes—all in one place.
            </p>
            <div className="social-links">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="Twitter"
              >
                  <FaXTwitter />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="Instagram"
              >
               <FaInstagram />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="footer-container">
          <div className="footer-column">
            <h4>Product</h4>
            <ul className="footer-links">
              <li>
                <a href="/features" onClick={(e) => { e.preventDefault(); navigate('/features'); }}>
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" onClick={(e) => { e.preventDefault(); navigate('/pricing'); }}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="/demo" onClick={(e) => { e.preventDefault(); navigate('/demo'); }}>
                  Demo
                </a>
              </li>
              <li>
                <a href="/changelog" onClick={(e) => { e.preventDefault(); navigate('/changelog'); }}>
                  What's New
                </a>
              </li>
      
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-column">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li>
                <a href="/blog" onClick={(e) => { e.preventDefault(); navigate('/blog'); }}>
                  Blog
                </a>
              </li>

              <li>
                <a href="/tutorials" onClick={(e) => { e.preventDefault(); navigate('/tutorials'); }}>
                  Tutorials
                </a>
              </li>
              <li>
                <a href="/support" onClick={(e) => { e.preventDefault(); navigate('/support'); }}>
                  Support
                </a>
              </li>
              <li>
                <a href="/faq" onClick={(e) => { e.preventDefault(); navigate('/faq'); }}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h4>Company</h4>
            <ul className="footer-links">
              <li>
                <a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
                  Contact
                </a>
              </li>
       
            </ul>
          </div>

          {/* Legal Column */}
          <div className="footer-column">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li>
                <a href="/privacy" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" onClick={(e) => { e.preventDefault(); navigate('/terms'); }}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookies" onClick={(e) => { e.preventDefault(); navigate('/cookies'); }}>
                  Cookie Policy
                </a>
              </li>
          
            </ul>
          </div>
        </div>
</div>
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {new Date().getFullYear()} TaskTime. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <div className="language-selector">
              <select className="language-dropdown" defaultValue="en">
                <option value="en">🇬🇧 English</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="ar">🇲🇦 العربية</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;