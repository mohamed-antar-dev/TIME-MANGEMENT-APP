import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Importing components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import NotePad from './components/NotePad/NotePad';
import Footer from './components/Footer/Footer';
import Signup from './components/signup/signup';
import Focus from './components/Timer/Timer';
import Login from './components/Login/Login';
/**
 * ScrollToTop Helper:
 * SaaS UX best practice. Ensures that when you click a link, 
 * the browser resets to the top of the new page.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  // Access global theme state from Redux
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  /**
   * Theme Sync:
   * This effect ensures that the <body> tag always matches 
   * our Redux state, allowing CSS variables to update globally.
   */
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
  }, [isDarkMode]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<NotePad />} />
          {/* <Route path="/tasks" element={<Tasks />} />       */}
          <Route path="/focus" element={<Focus />} />        
          <Route path="/login" element={<Login />} />        
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Home />} />          
        </Routes>
      </main>
      
      <Footer /> 
    </Router>
  );
};

export default App;