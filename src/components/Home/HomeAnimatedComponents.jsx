import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, useAnimation, useInView } from 'framer-motion';
import { toggleFAQ } from '../../store/uiSlice';
import { FaTasks, FaChartLine } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { LuNotepadText } from "react-icons/lu";
import { RiFocus2Fill } from "react-icons/ri";
import { GrSecure } from "react-icons/gr";
import { CgDarkMode } from "react-icons/cg";
import { MdDevices } from "react-icons/md";
import './Home.css';

// Icon mapping
const iconMap = {
  FaTasks, RxLapTimer, LuNotepadText, RiFocus2Fill,
  FaChartLine, GrSecure, CgDarkMode, MdDevices,
};

// ===== PARTICLE BACKGROUND =====
export const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particleCount = 50;
    particles.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.current.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-background" />;
};

// ===== GRADIENT CURSOR =====
export const GradientCursor = () => {
  const cursorRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="gradient-cursor"
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5
      }}
    />
  );
};

// ===== FLOATING ELEMENTS =====
export const FloatingElements = () => {
  const shapes = [
    { type: 'circle', size: 60, delay: 0 },
    { type: 'square', size: 40, delay: 0.5 },
    { type: 'triangle', size: 50, delay: 1 },
    { type: 'circle', size: 80, delay: 1.5 },
    { type: 'square', size: 45, delay: 2 }
  ];

  return (
    <div className="floating-elements">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`floating-shape ${shape.type}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${10 + index * 20}%`,
            top: `${20 + index * 15}%`
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// ===== TYPEWRITER TEXT =====
export const TypewriterText = ({ text, className, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className={className}>
      {displayText}
      <motion.span
        className="cursor-blink"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        |
      </motion.span>
    </div>
  );
};

// ===== GLITCH TEXT =====
export const GlitchText = ({ text, className }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className={`${className} glitch-text`} data-text={text}>
      {text}
      {isGlitching && (
        <>
          <span className="glitch-layer" data-text={text}>{text}</span>
          <span className="glitch-layer" data-text={text}>{text}</span>
        </>
      )}
    </h1>
  );
};

// ===== WAVE TEXT =====
export const WaveText = ({ text, className }) => {
  return (
    <h2 className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: index * 0.1,
            repeatDelay: 2
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h2>
  );
};

// ===== ANIMATED FEATURE CARD =====
export const AnimatedFeatureCard = ({ icon, title, desc, variant, index }) => {
  const IconComponent = iconMap[icon];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`f-card ${variant}`}
      initial={{ opacity: 0, y: 50, rotateX: 45 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 60px rgba(99, 102, 241, 0.4)",
        borderColor: "var(--accent)",
        scale: 1.02
      }}
    >
      <motion.div 
        className="f-icon"
        whileHover={{ rotate: 360, scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        {IconComponent && <IconComponent />}
      </motion.div>
      <div className="f-content">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </motion.div>
  );
};

// ===== ANIMATED HOW IT WORKS STEP =====
export const AnimatedHowItWorksStep = ({ number, title, desc, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="step-card"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 80
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 15px 40px rgba(99, 102, 241, 0.3)"
      }}
    >
      <motion.div 
        className="step-number"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
      >
        {number}
      </motion.div>
      <div className="step-content">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </motion.div>
  );
};

// ===== ANIMATED REVIEW CARD =====
export const AnimatedReviewCard = ({ name, text, role, image, index }) => (
  <motion.div
    className="r-card"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: (index % 6) * 0.1 }}
    whileHover={{
      y: -10,
      boxShadow: "0 20px 50px rgba(99, 102, 241, 0.3)",
      scale: 1.05
    }}
  >
    <div className="r-user">
      <motion.img 
        src={image} 
        alt={name} 
        className="user-avatar"
        whileHover={{ scale: 1.2, rotate: 5 }}
      />
      <div className="r-info">
        <h5>{name}</h5>
        <p className="role">{role}</p>
        <div className="stars">★★★★★</div>
      </div>
    </div>
    <p>"{text}"</p>
  </motion.div>
);

// ===== ANIMATED PRICING CARD =====
export const AnimatedPricingCard = ({ title, price, features, highlighted, onSelect, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`pricing-card ${highlighted ? 'highlighted' : ''}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        y: -15,
        scale: 1.03,
        boxShadow: highlighted 
          ? "0 30px 80px rgba(99, 102, 241, 0.5)"
          : "0 20px 60px rgba(99, 102, 241, 0.3)"
      }}
    >
      {highlighted && (
        <motion.div 
          className="popular-badge"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.15 + 0.3 }}
        >
          Most Popular
        </motion.div>
      )}
      <h3>{title}</h3>
      <div className="price">
        <span className="currency">$</span>
        <motion.span 
          className="amount"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
        >
          {price}
        </motion.span>
        <span className="period">/month</span>
      </div>
      <ul className="features-list">
        {features.map((feature, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.3 + idx * 0.05 }}
          >
            <span className="check-icon">✓</span>
            {feature}
          </motion.li>
        ))}
      </ul>
      <motion.button
        className="pricing-btn"
        onClick={onSelect}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
        <motion.span 
          className="arrow"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

// ===== ANIMATED FAQ ITEM =====
export const AnimatedFAQItem = ({ question, answer, index }) => {
  const dispatch = useDispatch();
  const openFAQs = useSelector((state) => state.ui.openFAQs);
  const isOpen = openFAQs.includes(index);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleToggle = () => {
    dispatch(toggleFAQ(index));
  };

  return (
    <motion.div
      ref={ref}
      className={`faq-item ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 30px rgba(99, 102, 241, 0.2)"
      }}
      onClick={handleToggle}
    >
      <div className="faq-q">
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </div>
      <motion.div
        className="faq-a"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{ padding: '16px 0 0 0' }}>
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===== ANIMATED STAT COUNTER =====
export const AnimatedStatCounter = ({ value, label, suffix = '', index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ scale: 1, opacity: 1 });
      
      const target = parseInt(value);
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value, controls]);

  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={controls}
      transition={{
        delay: index * 0.2,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={{
        scale: 1.01,
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.5 }
      }}
    >
      <motion.div 
        className="stat-value"
        initial={{ y: 20 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ delay: index * 0.2 + 0.2 }}
      >
        {count.toLocaleString()}{suffix}
      </motion.div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
};

export default {
  ParticleBackground,
  GradientCursor,
  FloatingElements,
  TypewriterText,
  GlitchText,
  WaveText,
  AnimatedFeatureCard,
  AnimatedHowItWorksStep,
  AnimatedReviewCard,
  AnimatedPricingCard,
  AnimatedFAQItem,
  AnimatedStatCounter
};