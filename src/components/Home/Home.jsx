import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useScramble } from '../../hooks/useScramble';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { 
  setShowScrollToTop, 
  setScrollProgress,
  updateCursorPosition,
  revealSection
} from '../../redux/slices/uiSlice';
import { FeatureCard, HowItWorksStep, ReviewCard, PricingCard, FAQItem, StatCounter } from './HomeComponents';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cursorRef = useRef(null);
  
  // Redux Selectors - UI State
  const showScroll = useSelector((state) => state.ui.showScrollToTop);
  const scrollProgress = useSelector((state) => state.ui.scrollProgress);
  const revealedSections = useSelector((state) => state.ui.revealedSections);
  const customCursorEnabled = useSelector((state) => state.userPreferences.interface.customCursor);
  const animationsEnabled = useSelector((state) => state.userPreferences.animations.enabled);
  const scrambleSpeed = useSelector((state) => state.userPreferences.animations.scrambleSpeed);
  
  // Redux Selectors - Content
  const hero = useSelector((state) => state.content.hero);
  const reviews = useSelector((state) => state.content.reviews);
  const pricing = useSelector((state) => state.content.pricing);
  const features = useSelector((state) => state.content.features);
  const howItWorks = useSelector((state) => state.content.howItWorks);
  const stats = useSelector((state) => state.content.stats);
  const faqs = useSelector((state) => state.content.faqs);
  const about = useSelector((state) => state.content.about);
  const cta = useSelector((state) => state.content.cta);
  
  // Scramble effect for title
  const title = useScramble(hero.title, scrambleSpeed);
  
  // Reveal hooks
  const [aboutRef, aboutVisible] = useScrollReveal();
  const [featuresRef, featuresVisible] = useScrollReveal();
  const [howItWorksRef, howItWorksVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();
  const [reviewsRef] = useScrollReveal();
  const [pricingRef, pricingVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();

  // Sync reveal state to Redux
  useEffect(() => {
    if (aboutVisible && !revealedSections.about) {
      dispatch(revealSection('about'));
    }
  }, [aboutVisible, revealedSections.about, dispatch]);

  useEffect(() => {
    if (featuresVisible && !revealedSections.features) {
      dispatch(revealSection('features'));
    }
  }, [featuresVisible, revealedSections.features, dispatch]);

  useEffect(() => {
    if (howItWorksVisible && !revealedSections.howItWorks) {
      dispatch(revealSection('howItWorks'));
    }
  }, [howItWorksVisible, revealedSections.howItWorks, dispatch]);

  useEffect(() => {
    if (statsVisible && !revealedSections.stats) {
      dispatch(revealSection('stats'));
    }
  }, [statsVisible, revealedSections.stats, dispatch]);

  useEffect(() => {
    if (pricingVisible && !revealedSections.pricing) {
      dispatch(revealSection('pricing'));
    }
  }, [pricingVisible, revealedSections.pricing, dispatch]);

  useEffect(() => {
    if (faqVisible && !revealedSections.faq) {
      dispatch(revealSection('faq'));
    }
  }, [faqVisible, revealedSections.faq, dispatch]);

  // Custom Cursor Follower Logic
  useEffect(() => {
    if (!customCursorEnabled) return;
    
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      // Update cursor position in Redux
      dispatch(updateCursorPosition({ x: e.clientX, y: e.clientY }));
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [customCursorEnabled, dispatch]);

  // Scroll Progress & Scroll to Top
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      dispatch(setScrollProgress(scrolled));
      dispatch(setShowScrollToTop(window.scrollY > 500));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const handlePricingSelect = (planId) => {
    if (planId === 'free' || planId === 'pro') {
      navigate(`/signup?plan=${planId}`);
    } else if (planId === 'enterprise') {
      navigate('/contact');
    }
  };

  return (
    <div className="home">
      {/* Custom Cursor */}
      {customCursorEnabled && <div className="custom-cursor" ref={cursorRef}></div>}
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{animationsEnabled ? title : hero.title}</h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <p className="hero-description">{hero.description}</p>
          
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/signup')}>
              Get Started Free
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-secondary" onClick={() => navigate('/demo')}>
              Watch Demo
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <strong>50K+</strong>
              <span>Active Users</span>
            </div>
            <div className="stat">
              <strong>4.9/5</strong>
              <span>User Rating</span>
            </div>
            <div className="stat">
              <strong>99.9%</strong>
              <span>Uptime</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-icon">📝</div>
            <div className="card-text">
              <strong>23 Tasks</strong>
              <span>Completed Today</span>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">⏱️</div>
            <div className="card-text">
              <strong>3h 42m</strong>
              <span>Focused Time</span>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">📊</div>
            <div className="card-text">
              <strong>+40%</strong>
              <span>Productivity</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section 
        ref={howItWorksRef} 
        className={`how-it-works reveal ${howItWorksVisible ? 'reveal-active' : ''}`}
      >
        <h2 className="section-label center">How It Works</h2>
        <h3 className="section-title center">Get Started in 4 Simple Steps</h3>
        <div className="steps-container">
          {howItWorks.map((step, index) => (
            <HowItWorksStep key={index} {...step} />
          ))}
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section 
        ref={statsRef} 
        className={`stats-section reveal ${statsVisible ? 'reveal-active' : ''}`}
      >
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCounter key={index} {...stat} />
          ))}
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section 
        ref={aboutRef} 
        className={`about reveal ${aboutVisible ? 'reveal-active' : ''}`}
      >
        <h2 className="section-label center">About TaskTime</h2>
        <h3 className="section-title center">{about.title}</h3>
        <div className="about-cards">
          <div className="about-card-sub">
            <div className="stat">Our Philosophy</div>
            <p>{about.philosophy}</p>
          </div>
          <div className="about-card-sub">
            <div className="stat">Who We Build For</div>
            <p>{about.audience}</p>
          </div>
          <div className="about-card-sub">
            <div className="stat">Our Simple Goal</div>
            <p>{about.mission}</p>
          </div>
        </div>
      </section>

      {/* --- CORE FEATURES SECTION --- */}
      <section 
        ref={featuresRef} 
        className={`features reveal ${featuresVisible ? 'reveal-active' : ''}`}
      >
        <h2 className="section-label center">Core Features</h2>
        <h3 className="section-title center">Everything You Need to Succeed</h3>
        <div className="features-grid-bento">
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </section>

      {/* --- REVIEWS --- */}
      <section ref={reviewsRef} className="reviews-marquee-section">
        <h2 className="section-label center">Testimonials</h2>
        <h3 className="section-title center">Loved by Users Worldwide</h3>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...reviews, ...reviews].map((rev, i) => (
              <ReviewCard key={i} {...rev} />
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section 
        ref={pricingRef} 
        className={`pricing-section reveal ${pricingVisible ? 'reveal-active' : ''}`}
      >
        <h2 className="section-label center">Pricing Plans</h2>
        <h3 className="section-title center">Choose Your Perfect Plan</h3>
        <div className="pricing-container">
          {pricing.map((plan) => (
            <PricingCard 
              key={plan.id}
              {...plan}
              onSelect={() => handlePricingSelect(plan.id)}
            />
          ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      <section 
        ref={faqRef} 
        className={`faq reveal ${faqVisible ? 'reveal-active' : ''}`}
      >
        <h2 className="section-label center">FAQ</h2>
        <h3 className="section-title center">Frequently Asked Questions</h3>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>{cta.title}</h2>
          <p>{cta.subtitle}</p>
          <button className="btn-primary-lg" onClick={() => navigate('/signup')}>
            {cta.buttonText}
            <span className="btn-arrow">→</span>
          </button>
          <p className="cta-note">{cta.note}</p>
        </div>
      </section>

      {/* Scroll To Top Button */}
      <button 
        className={`scroll-to-top ${showScroll ? 'visible' : ''}`} 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        ↑
      </button>
    </div>
  );
};

export default Home;