import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../store/userPreferencesSlice';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux selectors
  const footerLinks = useSelector((state) => state.content.footerLinks);
  const socialLinks = useSelector((state) => state.content.socialLinks);
  const language = useSelector((state) => state.userPreferences.language);

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Icon mapping
  const iconMap = {
    FaFacebookF: FaFacebookF,
    FaXTwitter: FaXTwitter,
    FaInstagram: FaInstagram,
    FaLinkedinIn: FaLinkedinIn,
  };

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
              {socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <a 
                    key={social.platform}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-icon"
                    aria-label={social.platform}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links Container */}
          <div className="footer-container">
            {/* Product Column */}
            <div className="footer-column">
              <h4>Product</h4>
              <ul className="footer-links">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.path} 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        handleNavigation(link.path); 
                      }}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="footer-column">
              <h4>Resources</h4>
              <ul className="footer-links">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.path} 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        handleNavigation(link.path); 
                      }}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="footer-column">
              <h4>Company</h4>
              <ul className="footer-links">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.path} 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        handleNavigation(link.path); 
                      }}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div className="footer-column">
              <h4>Legal</h4>
              <ul className="footer-links">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.path} 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        handleNavigation(link.path); 
                      }}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
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
              <select 
                className="language-dropdown" 
                value={language}
                onChange={handleLanguageChange}
              >
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