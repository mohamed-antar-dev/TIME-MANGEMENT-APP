import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  setShowScrollToTop, 
  setScrollProgress,
  revealSection
} from '../../store/uiSlice';
import { 
  AnimatedFeatureCard, 
  AnimatedHowItWorksStep, 
  AnimatedReviewCard, 
  AnimatedPricingCard, 
  AnimatedFAQItem, 
  AnimatedStatCounter,
  ParticleBackground,
  FloatingElements,
  TypewriterText,
  GlitchText,
  WaveText,
  GradientCursor
} from './HomeAnimatedComponents';
import { FaTasks, FaChartLine } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";


import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const heroRef = useRef(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Redux Selectors
  const showScroll = useSelector((state) => state.ui.showScrollToTop);
  const hero = useSelector((state) => state.content.hero);
  const reviews = useSelector((state) => state.content.reviews);
  const pricing = useSelector((state) => state.content.pricing);
  const features = useSelector((state) => state.content.features);
  const howItWorks = useSelector((state) => state.content.howItWorks);
  const stats = useSelector((state) => state.content.stats);
  const faqs = useSelector((state) => state.content.faqs);
  const about = useSelector((state) => state.content.about);
  const cta = useSelector((state) => state.content.cta);

  // Section refs for scroll animations
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const statsRef = useRef(null);
  const reviewsRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);

  // In view detection
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const howItWorksInView = useInView(howItWorksRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const reviewsInView = useInView(reviewsRef, { once: true, margin: "-100px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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

  // Update Redux when sections come into view
  useEffect(() => {
    if (aboutInView) dispatch(revealSection('about'));
    if (featuresInView) dispatch(revealSection('features'));
    if (howItWorksInView) dispatch(revealSection('howItWorks'));
    if (statsInView) dispatch(revealSection('stats'));
    if (pricingInView) dispatch(revealSection('pricing'));
    if (faqInView) dispatch(revealSection('faq'));
  }, [aboutInView, featuresInView, howItWorksInView, statsInView, pricingInView, faqInView, dispatch]);

  const handlePricingSelect = (planId) => {
    if (planId === 'free' || planId === 'pro') {
      navigate(`/signup?plan=${planId}`);
    } else if (planId === 'enterprise') {
      navigate('/contact');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="home">
      {/* Gradient Cursor */}
      <GradientCursor />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="scroll-progress-bar" 
        style={{ scaleX: scaleProgress }}
      />

      {/* --- HERO SECTION --- */}
      <motion.section 
        ref={heroRef}
        className="hero"
        style={{
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale
        }}
      >
        <FloatingElements />
        
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <GlitchText text={hero.title} className="hero-title" />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <TypewriterText 
              text={hero.subtitle} 
              className="hero-subtitle"
              speed={50}
            />
          </motion.div>
          
          <motion.p 
            className="hero-description"
            variants={itemVariants}
          >
            {hero.description}
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            variants={itemVariants}
          >
            <motion.button 
              className="btn-primary"
              onClick={() => navigate('/signup')}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Get Started Free
              <motion.span 
                className="btn-arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
            
            <motion.button 
              className="btn-secondary"
              onClick={() => navigate('/demo')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          <motion.div 
            className="hero-stats"
            variants={containerVariants}
          >
            {[
              { value: "2K+", label: "Active Users" },
              { value: "4.7/5", label: "User Rating" },
              { value: "99%", label: "Uptime" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="stat"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          variants={floatVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="floating-card card-1"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="card-icon"><FaTasks /></div>
            <div className="card-text">
              <strong>23 Tasks</strong>
              <span>Completed Today</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="floating-card card-2"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="card-icon"><RxLapTimer /></div>
            <div className="card-text">
              <strong>3h 42m</strong>
              <span>Focused Time</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="floating-card card-3"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="card-icon"><FaChartLine /></div>
            <div className="card-text">
              <strong>+40%</strong>
              <span>Productivity</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* --- HOW IT WORKS SECTION --- */}
      <motion.section 
        ref={howItWorksRef}
        className="how-it-works"
        initial={{ opacity: 0 }}
        animate={howItWorksInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <WaveText text="How It Works" className="section-label center" />
          <h3 className="section-title center">Get Started in 4 Simple Steps</h3>
        </motion.div>
        
        <motion.div 
          className="steps-container"
          variants={containerVariants}
          initial="hidden"
          animate={howItWorksInView ? "visible" : "hidden"}
        >
          {howItWorks.map((step, index) => (
            <AnimatedHowItWorksStep key={index} {...step} index={index} />
          ))}
        </motion.div>
      </motion.section>

      {/* --- STATS SECTION --- */}
      <motion.section 
        ref={statsRef}
        className="stats-section"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={statsInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <AnimatedStatCounter key={index} {...stat} index={index} />
          ))}
        </motion.div>
      </motion.section>

      {/* --- ABOUT SECTION --- */}
      <motion.section 
        ref={aboutRef}
        className="about"
        initial={{ opacity: 0 }}
        animate={aboutInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-label center">About FocuSpace</h2>
          <h3 className="section-title center">{about.title}</h3>
        </motion.div>
        
        <motion.div 
          className="about-cards"
          variants={containerVariants}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
        >
          {[
            { title: "Our Philosophy", content: about.philosophy },
            { title: "Who We Build For", content: about.audience },
            { title: "Our Simple Goal", content: about.mission }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="about-card-sub"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 60px rgba(99, 102, 241, 0.3)",
                borderColor: "var(--accent)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="stat">{item.title}</div>
              <p>{item.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* --- CORE FEATURES SECTION --- */}
      <motion.section 
        ref={featuresRef}
        className="features"
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-label center">Core Features</h2>
          <h3 className="section-title center">Everything You Need to Succeed</h3>
        </motion.div>
        
        <motion.div 
          className="features-grid-bento"
          variants={containerVariants}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <AnimatedFeatureCard key={feature.id} {...feature} index={index} />
          ))}
        </motion.div>
      </motion.section>

      {/* --- REVIEWS MARQUEE --- */}
      <motion.section 
        ref={reviewsRef}
        className="reviews-marquee-section"
        initial={{ opacity: 0 }}
        animate={reviewsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-label center">Testimonials</h2>
          <h3 className="section-title center">Loved by Users Worldwide</h3>
        </motion.div>
        
        <div className="marquee-container">
          <motion.div 
            className="marquee-track"
            animate={{
              x: [0, -50 + "%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear"
              }
            }}
          >
            {[...reviews, ...reviews].map((rev, i) => (
              <AnimatedReviewCard key={i} {...rev} index={i} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* --- PRICING SECTION --- */}
      <motion.section 
        ref={pricingRef}
        className="pricing-section"
        initial={{ opacity: 0 }}
        animate={pricingInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={pricingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-label center">Pricing Plans</h2>
          <h3 className="section-title center">Choose Your Perfect Plan</h3>
        </motion.div>
        
        <motion.div 
          className="pricing-container"
          variants={containerVariants}
          initial="hidden"
          animate={pricingInView ? "visible" : "hidden"}
        >
          {pricing.map((plan, index) => (
            <AnimatedPricingCard 
              key={plan.id}
              {...plan}
              index={index}
              onSelect={() => handlePricingSelect(plan.id)}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* --- FAQ --- */}
      <motion.section 
        ref={faqRef}
        className="faq"
        initial={{ opacity: 0 }}
        animate={faqInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={faqInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-label center">FAQ</h2>
          <h3 className="section-title center">Frequently Asked Questions</h3>
        </motion.div>
        
        <motion.div 
          className="faq-list"
          variants={containerVariants}
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
        >
          {faqs.map((faq, index) => (
            <AnimatedFAQItem 
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* --- CTA SECTION --- */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="cta-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants}>{cta.title}</motion.h2>
          <motion.p variants={itemVariants}>{cta.subtitle}</motion.p>
          <motion.button 
            className="btn-primary-lg"
            variants={itemVariants}
            onClick={() => navigate('/signup')}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(255, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {cta.buttonText}
            <motion.span 
              className="btn-arrow"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
          <motion.p className="cta-note" variants={itemVariants}>
            {cta.note}
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Scroll To Top Button */}
      <motion.button 
        className="scroll-to-top"
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showScroll ? 1 : 0,
          y: showScroll ? 0 : 20
        }}
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label="Scroll to top"
      >
        ↑
      </motion.button>
    </div>
  );
};

export default Home;