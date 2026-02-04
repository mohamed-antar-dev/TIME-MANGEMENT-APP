import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { toggleMobileMenu, closeMobileMenu } from "../../redux/slices/uiSlice";
import { setCurrentPage, setActiveNavItem } from "../../redux/slices/navigationSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    
    // Redux selectors
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    const isMobileMenuOpen = useSelector((state) => state.ui.isMobileMenuOpen);
    const currentPage = useSelector((state) => state.navigation.currentPage);

    // Update current page when location changes
    useEffect(() => {
        dispatch(setCurrentPage(location.pathname));
        
        // Set active nav item based on current path
        const pathToNavItem = {
            '/': 'home',
            '/tasks': 'tasks',
            '/notes': 'notes',
            '/focus': 'focus',
            '/login': 'login'
        };
        
        const activeItem = pathToNavItem[location.pathname] || 'home';
        dispatch(setActiveNavItem(activeItem));
    }, [location.pathname, dispatch]);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    const toggleMobileMenuHandler = () => {
        dispatch(toggleMobileMenu());
    };

    const handleNavigation = (path) => {
        navigate(path);
        dispatch(closeMobileMenu());
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
                        <div 
                            onClick={() => handleNavigation('/')}
                            className={currentPage === '/' ? 'active' : ''}
                        >
                            Home
                        </div>
                        <div 
                            onClick={() => handleNavigation('/tasks')}
                            className={currentPage === '/tasks' ? 'active' : ''}
                        >
                            Tasks
                        </div>
                        <div 
                            onClick={() => handleNavigation('/notes')}
                            className={currentPage === '/notes' ? 'active' : ''}
                        >
                            NotePad
                        </div>
                        <div 
                            onClick={() => handleNavigation('/focus')}
                            className={currentPage === '/focus' ? 'active' : ''}
                        >
                            Timer
                        </div>
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
                            onClick={toggleMobileMenuHandler}
                            aria-label="Toggle menu"
                        >
                            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
                onClick={toggleMobileMenuHandler}
            >
                <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
                    <div className="mobile-menu-header">
                        <div className="mobile-logo">Task<span>Time</span></div>
                        <button className="mobile-close-btn" onClick={toggleMobileMenuHandler}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <nav className="mobile-nav-items">
                        <div 
                            className={`mobile-nav-item ${currentPage === '/' ? 'active' : ''}`}
                            onClick={() => handleNavigation('/')}
                        >
                            <span>Home</span>
                        </div>
                        <div 
                            className={`mobile-nav-item ${currentPage === '/tasks' ? 'active' : ''}`}
                            onClick={() => handleNavigation('/tasks')}
                        >
                            <span>Tasks</span>
                        </div>
                        <div 
                            className={`mobile-nav-item ${currentPage === '/notes' ? 'active' : ''}`}
                            onClick={() => handleNavigation('/notes')}
                        >
                            <span>NotePad</span>
                        </div>
                        <div 
                            className={`mobile-nav-item ${currentPage === '/focus' ? 'active' : ''}`}
                            onClick={() => handleNavigation('/focus')}
                        >
                            <span>Timer</span>
                        </div>
                        <div 
                            className={`mobile-nav-item ${currentPage === '/login' ? 'active' : ''}`}
                            onClick={() => handleNavigation('/login')}
                        >
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