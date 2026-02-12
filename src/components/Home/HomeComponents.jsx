import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFAQ, triggerStatsAnimation
} from '../../store/uiSlice';
import { FaTasks, FaChartLine } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { LuNotepadText } from "react-icons/lu";
import { RiFocus2Fill } from "react-icons/ri";
import { GrSecure } from "react-icons/gr";
import { CgDarkMode } from "react-icons/cg";
import { MdDevices } from "react-icons/md";
import './Home.css';

// Icon mapping for features
const iconMap = {
  FaTasks: FaTasks,
  RxLapTimer: RxLapTimer,
  LuNotepadText: LuNotepadText,
  RiFocus2Fill: RiFocus2Fill,
  FaChartLine: FaChartLine,
  GrSecure: GrSecure,
  CgDarkMode: CgDarkMode,
  MdDevices: MdDevices,
};

// ===== SUB-COMPONENTS =====

  const FeatureCard = ({ icon, title, desc, variant, delay }) => {
  const IconComponent = iconMap[icon];
  
  return (
    <div className={`f-card ${variant}`} style={{ animationDelay: `${delay}s` }}>
      <div className="f-icon">
        {IconComponent && <IconComponent />}
      </div>
      <div className="f-content">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
};

const HowItWorksStep = ({ number, title, desc, delay }) => (
  <div className="step-card" style={{ animationDelay: `${delay}s` }}>
    <div className="step-number">{number}</div>
    <div className="step-content">
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
    <div className="step-connector"></div>
  </div>
);

const ReviewCard = ({ name, text, role, image }) => (
  <div className="r-card marquee-item">
    <div className="r-user">
      <img src={image} alt={name} className="user-avatar" />
      <div className="r-info">
        <h5>{name}</h5>
        <p className="role">{role}</p>
        <div className="stars">★★★★★</div>
      </div>
    </div>
    <p>"{text}"</p>
  </div>
);

const PricingCard = ({ title, price, features, highlighted, onSelect }) => (
  <div className={`pricing-card ${highlighted ? 'highlighted' : ''}`}>
    {highlighted && <div className="popular-badge">Most Popular</div>}
    <h3>{title}</h3>
    <div className="price">
      <span className="currency">$</span>
      <span className="amount">{price}</span>
      <span className="period">/month</span>
    </div>
    <ul className="features-list">
      {features.map((feature, idx) => (
        <li key={idx}>
          <span className="check-icon">✓</span>
          {feature}
        </li>
      ))}
    </ul>
    <button className="pricing-btn" onClick={onSelect}>
      Get Started
      <span className="arrow">→</span>
    </button>
  </div>
);

const FAQItem = ({ question, answer, index }) => {
  const dispatch = useDispatch();
  const openFAQs = useSelector((state) => state.ui.openFAQs);
  const isOpen = openFAQs.includes(index);

  const handleToggle = () => {
    dispatch(toggleFAQ(index));
  };

  return (
    <div 
      className={`faq-item ${isOpen ? 'open' : ''}`} 
      onClick={handleToggle}
    >
      <div className="faq-q">
        {question} <span>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && <div className="faq-a">{answer}</div>}
    </div>
  );
};

const StatCounter = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const statsAnimationTriggered = useSelector((state) => state.ui.statsAnimationTriggered);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsAnimationTriggered) {
          setIsVisible(true);
          dispatch(triggerStatsAnimation());
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [dispatch, statsAnimationTriggered]);

  useEffect(() => {
    if (isVisible) {
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
  }, [isVisible, value]);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-value">{count.toLocaleString()}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export { FeatureCard, HowItWorksStep, ReviewCard, PricingCard, FAQItem, StatCounter };