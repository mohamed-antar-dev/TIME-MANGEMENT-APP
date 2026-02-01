import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    return ( 
        <>
            <div className="BigMom">
                <div className="Navmom">
                    <div className="logo" onClick={() => handleNavigation('/')}>
                        Task<span>Time</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="Navlist">
                        <div onClick={() => navigate('/')}>Home</div>
                        <div onClick={() => navigate('/tasks')}>Tasks</div>
                        <div onClick={() => navigate('/notes')}>NotePad</div>
                        <div onClick={() => navigate('/focus')}>Timer</div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="nav-actions">
                        <button 
                            className="theme-toggle-btn" 
                            onClick={handleThemeToggle}
                            aria-label="Toggle theme"
                        >
                            <FontAwesomeIcon 
                                icon={isDarkMode ? faSun : faMoon} 
                                className="theme-icon"
                            />
                        </button>

                        <div className="user-icon" onClick={() => handleNavigation('/login')}>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>

                        {/* Mobile Hamburger */}
                        <button 
                            className="mobile-menu-toggle" 
                            onClick={toggleMobileMenu}
                            aria-label="Toggle menu"
                        >
                            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
                <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
                    <div className="mobile-menu-header">
                        <div className="mobile-logo">Task<span>Time</span></div>
                        <button className="mobile-close-btn" onClick={toggleMobileMenu}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <nav className="mobile-nav-items">
                        <div className="mobile-nav-item" onClick={() => handleNavigation('/')}>
                            
                            <span>Home</span>
                        </div>
                        <div className="mobile-nav-item" onClick={() => handleNavigation('/tasks')}>
                            <span>Tasks</span>
                        </div>
                        <div className="mobile-nav-item" onClick={() => handleNavigation('/notes')}>
                            <span>NotePad</span>
                        </div>
                        <div className="mobile-nav-item" onClick={() => handleNavigation('/focus')}>
                            <span>Timer</span>
                        </div>
                        <div className="mobile-nav-item" onClick={() => handleNavigation('/login')}>
                            <span>Account</span>
                        </div>
                    </nav>

                    <div className="mobile-menu-footer">
                        <button className="mobile-theme-toggle" onClick={handleThemeToggle}>
                            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;