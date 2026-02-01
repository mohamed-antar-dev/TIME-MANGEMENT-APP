import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScramble } from '../../hooks/useScramble';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { FaTasks, FaChartLine } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { LuNotepadText } from "react-icons/lu";
import { RiFocus2Fill } from "react-icons/ri";
import { GrSecure } from "react-icons/gr";
import { CgDarkMode } from "react-icons/cg";
import { MdDevices } from "react-icons/md";
import './Home.css';

const FeatureCard = ({ icon, title, desc, variant, delay }) => (
  <div className={`f-card ${variant}`} style={{ animationDelay: `${delay}s` }}>
    <div className="f-icon">{icon}</div>
    <div className="f-content">
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  </div>
);

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

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-q">
        {q} <span>{open ? '−' : '+'}</span>
      </div>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
};

const StatCounter = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
  }, []);

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

const Home = () => {
  const navigate = useNavigate();
  const title = useScramble("Be More Productive.");
  const [showScroll, setShowScroll] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorRef = useRef(null);

  // Reveal hooks
  const [aboutRef, aboutVisible] = useScrollReveal();
  const [featuresRef, featuresVisible] = useScrollReveal();
  const [howItWorksRef, howItWorksVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();
  const [reviewsRef] = useScrollReveal();
  const [pricingRef, pricingVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();

  // Custom Cursor Follower Logic
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Scroll Progress & Scroll to Top
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      setShowScroll(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const reviews = [
    { 
      name: "Brahim Sougraty", 
      role: "Full stack developer",
      text: "TaskTime transformed how our team manages sprints. The timer feature keeps us focused and the task breakdown is brilliant.", 
      image: "https://i.pravatar.cc/150?u=mike" 
    },
    { 
      name: "Fatima Slimani", 
      role: "Student",
      text: "I love how the notepad integrates with tasks. I can brainstorm and organize in one place. Game changer for my workflow.", 
      image: "https://i.pravatar.cc/150?u=marcus" 
    },
    { 
      name: "Mohamed Antar", 
      role: "Software Engineer",
      text: "The time tracking is accurate and non-intrusive. Finally understand where my hours go. Boosted my productivity by 40%.", 
      image: "https://i.pravatar.cc/150?u=jhon" 
    },
    { 
      name: "David Park", 
      role: "Startup Founder",
      text: "Replaced 4 tools with TaskTime. Tasks, notes, and time tracking in one beautiful interface. Our team is more aligned than ever.", 
      image: "https://i.pravatar.cc/150?u=david" 
    },
    { 
      name: "Lisa Thompson", 
      role: "Content Strategist",
      text: "The Pomodoro timer with task integration is perfect. I plan my day and execute with laser focus. Best productivity tool I've used.", 
      image: "https://i.pravatar.cc/150?u=lisa" 
    }
  ];

  return (
    <div className="home-container">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Custom Cursor */}
      <div className="cursor-follower" ref={cursorRef}></div>

      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge-pill">Trusted by 2000+ Users Worldwide</div>
          <h1 className="hero-title">{title}<br/><span>Work Smarter, Not Harder.</span></h1>
          <p className="hero-subtitle">
            The ultimate productivity suite combining intelligent task management, 
            precision time tracking, and seamless note-taking. Everything you need 
            to master your day in one elegant workspace.
          </p>
          <div className="hero-btns">
            <button className="btn-primary-lg" onClick={() => navigate('/tasks')}>
              Start Free Today
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-secondary-lg" onClick={() => navigate('/demo')}>
              <span className="play-icon">▶</span>
              Watch Demo
            </button>
          </div>
          <div className="hero-trust">
            <div className="trust-logos">
              <span className="trust-text">Trusted by teams at:</span>
              <div className="company-badges">
                <span className="company-badge">TechCorp</span>
                <span className="company-badge">OFPPT</span>
                <span className="company-badge">DesignCo</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="floating-mockup">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="mockup-title">My Workspace</div>
            </div>
            <div className="mockup-body">
              <div className="mockup-task">
                <div className="task-checkbox"></div>
                <div className="task-text">
                  <div className="task-title"></div>
                  <div className="task-time"></div>
                </div>
                <div className="task-timer"></div>
              </div>
              <div className="mockup-task">
                <div className="task-checkbox completed"></div>
                <div className="task-text">
                  <div className="task-title completed"></div>
                  <div className="task-time"></div>
                </div>
                <div className="task-timer"></div>
              </div>
              <div className="mockup-task">
                <div className="task-checkbox"></div>
                <div className="task-text">
                  <div className="task-title"></div>
                  <div className="task-time"></div>
                </div>
                <div className="task-timer active"></div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-blur"></div>
        </div>

        <div className="circle-btn-container" onClick={() => document.getElementById('howItWorks').scrollIntoView({behavior:'smooth'})}>
          <div className="circle-text-wrapper">
            <svg viewBox="0 0 100 100">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text className="circle-text"><textPath href="#circlePath">• SCROLL TO EXPLORE • SCROLL TO EXPLORE •</textPath></text>
            </svg>
          </div>
          <div className="circle-arrow">↓</div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section ref={statsRef} className={`stats-section reveal ${statsVisible ? 'reveal-active' : ''}`}>
        <div className="stats-container">
          <StatCounter value="2000" label="Active Users" suffix="+" />
          <StatCounter value="50000" label="Tasks Completed" suffix="+" />
          <StatCounter value="30000" label="Hours Tracked" suffix="+" />
          <StatCounter value="95" label="Satisfaction Rate" suffix="%" />
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section id="howItWorks" ref={howItWorksRef} className={`how-it-works reveal ${howItWorksVisible ? 'reveal-active' : ''}`}>
        <div className="section-header">
          <h2 className="section-label">How It Works</h2>
          <h3 className="section-title">Master Productivity in 3 Simple Steps</h3>
        </div>
        <div className="steps-container">
          <HowItWorksStep 
            number="01"
            title="Create & Organize Tasks"
            desc="Add your tasks with detailed descriptions, priorities, and categories. Our intelligent system helps you structure your workload for maximum efficiency."
            delay={0}
          />
          <HowItWorksStep 
            number="02"
            title="Attach Timers & Track Progress"
            desc="Set custom timers for each task or use our built-in Pomodoro feature. Watch your productivity soar as you maintain laser focus on what matters most."
            delay={0.2}
          />
          <HowItWorksStep 
            number="03"
            title="Take Notes & Review"
            desc="Capture ideas, meeting notes, and insights in our integrated notepad. Link notes to tasks for complete context. Review analytics to optimize your workflow."
            delay={0.4}
          />
        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section id="about" ref={aboutRef} className={`about reveal ${aboutVisible ? 'reveal-active' : ''}`}>
        <div className="section-header">
          <h2 className="section-label">About TaskTime</h2>
          <h3 className="section-title">Built for Focus, Designed for Clarity</h3>
        </div>
        <div className="about-bento">
          <div className="about-card-main">
            <h4>Why TaskTime Exists</h4>
            <p>
              TaskTime was born from a simple observation: modern productivity is broken. We saw students drowning in browser tabs and professionals losing hours to "app-switching fatigue." We decided to build a home for work where tasks, time, and thought aren't separated, but unified.
            </p>
            <p style={{ marginTop: '16px' }}>
              We couldn't find a tool that balanced the rigid structure of a task manager with the freedom of a notepad. So, we built our own. TaskTime is the result of years of refining how we work—combining a precision timer with a flexible workspace.
            </p>
          </div>
          <div className="about-card-sub">
            <div className="stat">Who We Build For</div>
            <p>Whether you are prepping for a bar exam or managing a remote engineering team, TaskTime is crafted for those who value their time. We are a small team of developers dedicated to creating the cleanest, fastest, and most secure workspace on the web that prioritize your privacy and your "flow state" above everything else.</p>
          </div>
          <div className="about-card-sub">
            <div className="stat">Our Simple Goal</div>
            <p>Empowering Your Best Work Body: Our mission is to give you back 30 minutes of "lost time" every day. By removing the friction of organizing, we help you spend less time planning your work and more time actually doing the things that move the needle.</p>
          </div>
        </div>
      </section>

      {/* --- CORE FEATURES SECTION --- */}
      <section ref={featuresRef} className={`features reveal ${featuresVisible ? 'reveal-active' : ''}`}>
        <h2 className="section-label center">Core Features</h2>
        <h3 className="section-title center">Everything You Need to Succeed</h3>
        <div className="features-grid-bento">
          <FeatureCard 
            variant="wide" 
            icon={<FaTasks />}

            title="Smart Task Management" 
            desc="Create, organize, and prioritize tasks with intelligent categorization. Set deadlines, add descriptions, and track completion with visual progress indicators." 
            delay={0}
          />
          <FeatureCard 
            variant="tall" 
            icon={<RxLapTimer /> }
            title="Precision Time Tracking" 
            desc="Attach custom timers to any task. Use Pomodoro technique (25/5 min cycles) or set your own intervals. See exactly where your time goes with detailed analytics." 
            delay={0.1}
          />
          <FeatureCard 
            variant="standard" 
            icon={ <LuNotepadText />}
            title="Integrated Notepad" 
            desc="Rich text editor for capturing ideas, meeting notes, and documentation. Link notes to tasks for complete context and easy reference." 
            delay={0.2}
          />
          <FeatureCard 
            variant="standard" 
            icon={<RiFocus2Fill />}
            title="Focus Mode" 
            desc="Distraction-free environment with ambient sounds, website blocking, and notification management. Enter deep work instantly." 
            delay={0.3}
          />
          <FeatureCard 
            variant="standard" 
            icon={<FaChartLine />}
            title="Analytics & Insights" 
            desc="Visualize your productivity with beautiful charts. Track time spent per project, completion rates, and identify optimization opportunities." 
            delay={0.4}
          />
          <FeatureCard 
            variant="standard" 
            icon={<GrSecure />}
            title="Secure & Private" 
            desc="Military-grade encryption, local-first architecture, and optional cloud sync. Your data never leaves your control." 
            delay={0.5}
          />
          <FeatureCard 
            variant="standard" 
            icon={<CgDarkMode />}
            title="Adaptive Interface" 
            desc="Automatic dark mode with customizable themes. Clean, minimal design that adapts to your preferences and time of day." 
            delay={0.6}
          />
          <FeatureCard 
            variant="standard" 
            icon={<MdDevices />}
            title="Cross-Platform Sync" 
            desc="Seamlessly work across desktop, mobile, and tablet. Real-time sync keeps your tasks and notes updated everywhere." 
            delay={0.7}
          />
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
      <section ref={pricingRef} className={`pricing-section reveal ${pricingVisible ? 'reveal-active' : ''}`}>
        <h2 className="section-label center">Pricing Plans</h2>
        <h3 className="section-title center">Choose Your Perfect Plan</h3>
        <div className="pricing-container">
          <PricingCard 
            title="Free"
            price="0"
            features={[
              'Unlimited tasks & notes',
              'Basic time tracking',
              'Pomodoro timer',
              'Local data storage',
              'Dark mode',
              'Mobile responsive'
            ]}
            onSelect={() => navigate('/signup')}
          />
          <PricingCard 
            title="Pro"
            price="9"
            highlighted={true}
            features={[
              'Everything in Free',
              'Advanced analytics',
              'Cloud sync (encrypted)',
              'Unlimited workspaces',
              'Team collaboration',
              'Priority support',
              'Custom themes',
              'Export to PDF/CSV'
            ]}
            onSelect={() => navigate('/signup?plan=pro')}
          />
          <PricingCard 
            title="Enterprise"
            price="29"
            features={[
              'Everything in Pro',
              'SSO integration',
              'Admin dashboard',
              'API access',
              'Dedicated support',
              'Custom integrations',
              'SLA guarantee'
            ]}
            onSelect={() => navigate('/contact')}
          />
        </div>
      </section>

      {/* --- FAQ --- */}
      <section ref={faqRef} className={`faq reveal ${faqVisible ? 'reveal-active' : ''}`}>
        <h2 className="section-label center">FAQ</h2>
        <h3 className="section-title center">Frequently Asked Questions</h3>
        <div className="faq-list">
          <FAQItem 
            q="How does the timer feature work with tasks?" 
            a="Each task can have its own custom timer. Click on any task to start a timer, set your desired duration (or use Pomodoro defaults), and track time spent. The timer runs in the background and saves your progress automatically. You can pause, resume, or reset at any time. All time data is logged for analytics." 
          />
          <FAQItem 
            q="Can I link notes to specific tasks?" 
            a="Absolutely! Our integrated notepad allows you to create notes and link them directly to tasks. This keeps all your context in one place. You can also create standalone notes for general ideas, meeting minutes, or documentation. Use tags and search to find notes instantly." 
          />
          <FAQItem 
            q="Is my data really secure?" 
            a="Yes. All your data is encrypted using AES-256 encryption and stored locally in your browser by default. If you enable cloud sync, we use end-to-end encryption, meaning your data is encrypted on your device before it ever reaches our servers. We cannot read your tasks, notes, or any personal information." 
          />
         
          <FAQItem 
            q="Can I use TaskTime on mobile devices?" 
            a="Yes! TaskTime is fully responsive and works seamlessly on iOS, Android, tablets, and desktop browsers. We're also developing native mobile apps for an even better experience. Your data syncs across all devices in real-time." 
          />
          <FAQItem 
            q="How is this different from other task managers?" 
            a="TaskTime uniquely combines three essential productivity tools: task management, time tracking, and note-taking. Most apps force you to switch between multiple tools. We integrate everything seamlessly—attach timers to tasks, link notes to projects, and see your entire workflow in one place. Plus, our privacy-first approach means your data stays yours." 
          />
          <FAQItem 
            q="Can I export my data?" 
            a="Yes. You have complete ownership of your data. Export everything to JSON, CSV, or Markdown format with a single click. No lock-in, no hassle. Your productivity data belongs to you, and you can take it anywhere." 
          />
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Productivity?</h2>
          <p>Join thousands of professionals who've mastered their time with TaskTime.</p>
          <button className="btn-primary-lg" onClick={() => navigate('/signup')}>
            Start Your Free Trial
            <span className="btn-arrow">→</span>
          </button>
          <p className="cta-note">No credit card required • 14-day free trial • Cancel anytime</p>
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
