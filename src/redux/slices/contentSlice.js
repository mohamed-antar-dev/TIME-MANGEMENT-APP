import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Hero Section
  hero: {
    title: "Be More Productive.",
    subtitle: "All-in-one workspace for tasks, notes, and time tracking.",
    description: "Manage your tasks, track your time, organize your notes, and boost productivity—all in one beautiful, secure platform.",
  },
  
  // Reviews/Testimonials
  reviews: [
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
      name: "Sophia Chen", 
      role: "Product Manager",
      text: "Best productivity tool I've used. The interface is clean and the features actually work as advertised. Worth every penny.", 
      image: "https://i.pravatar.cc/150?u=sophia" 
    },
    { 
      name: "Alex Johnson", 
      role: "Freelance Designer",
      text: "As a freelancer, tracking billable hours was always a pain. TaskTime makes it effortless. Plus, the dark mode is gorgeous.", 
      image: "https://i.pravatar.cc/150?u=alex" 
    },
    { 
      name: "Priya Patel", 
      role: "Medical Student",
      text: "Study sessions are so much more effective with the Pomodoro timer. I can finally stay focused during long study marathons.", 
      image: "https://i.pravatar.cc/150?u=priya" 
    },
  ],
  
  // Pricing Plans
  pricing: [
    {
      id: 'free',
      title: "Free",
      price: "0",
      highlighted: false,
      features: [
        'Unlimited tasks & notes',
        'Basic time tracking',
        'Pomodoro timer',
        'Local data storage',
        'Dark mode',
        'Mobile responsive'
      ]
    },
    {
      id: 'pro',
      title: "Pro",
      price: "9",
      highlighted: true,
      features: [
        'Everything in Free',
        'Advanced analytics',
        'Cloud sync (encrypted)',
        'Unlimited workspaces',
        'Team collaboration',
        'Priority support',
        'Custom themes',
        'Export to PDF/CSV'
      ]
    },
    {
      id: 'enterprise',
      title: "Enterprise",
      price: "29",
      highlighted: false,
      features: [
        'Everything in Pro',
        'SSO integration',
        'Admin dashboard',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee'
      ]
    }
  ],
  
  // Features
  features: [
    {
      id: 'task-management',
      variant: "wide",
      icon: "FaTasks",
      title: "Smart Task Management",
      desc: "Create, organize, and prioritize tasks with intelligent categorization. Set deadlines, add descriptions, and track completion with visual progress indicators.",
      delay: 0
    },
    {
      id: 'time-tracking',
      variant: "tall",
      icon: "RxLapTimer",
      title: "Precision Time Tracking",
      desc: "Attach custom timers to any task. Use Pomodoro technique (25/5 min cycles) or set your own intervals. See exactly where your time goes with detailed analytics.",
      delay: 0.1
    },
    {
      id: 'notepad',
      variant: "standard",
      icon: "LuNotepadText",
      title: "Integrated Notepad",
      desc: "Rich text editor for capturing ideas, meeting notes, and documentation. Link notes to tasks for complete context and easy reference.",
      delay: 0.2
    },
    {
      id: 'focus-mode',
      variant: "standard",
      icon: "RiFocus2Fill",
      title: "Focus Mode",
      desc: "Distraction-free environment with ambient sounds, website blocking, and notification management. Enter deep work instantly.",
      delay: 0.3
    },
    {
      id: 'analytics',
      variant: "standard",
      icon: "FaChartLine",
      title: "Analytics & Insights",
      desc: "Visualize your productivity with beautiful charts. Track time spent per project, completion rates, and identify optimization opportunities.",
      delay: 0.4
    },
    {
      id: 'security',
      variant: "standard",
      icon: "GrSecure",
      title: "Secure & Private",
      desc: "Military-grade encryption, local-first architecture, and optional cloud sync. Your data never leaves your control.",
      delay: 0.5
    },
    {
      id: 'interface',
      variant: "standard",
      icon: "CgDarkMode",
      title: "Adaptive Interface",
      desc: "Automatic dark mode with customizable themes. Clean, minimal design that adapts to your preferences and time of day.",
      delay: 0.6
    },
    {
      id: 'cross-platform',
      variant: "standard",
      icon: "MdDevices",
      title: "Cross-Platform Sync",
      desc: "Seamlessly work across desktop, mobile, and tablet. Real-time sync keeps your tasks and notes updated everywhere.",
      delay: 0.7
    }
  ],
  
  // How It Works Steps
  howItWorks: [
    {
      number: "01",
      title: "Create Your Workspace",
      desc: "Sign up in seconds and customize your dashboard. Choose your theme, set your preferences, and import existing tasks if needed.",
      delay: 0
    },
    {
      number: "02",
      title: "Add Tasks & Start Timer",
      desc: "Break down your projects into actionable tasks. Attach timers to track exactly how long each task takes. Use Pomodoro or custom intervals.",
      delay: 0.1
    },
    {
      number: "03",
      title: "Capture Ideas in Notes",
      desc: "Use the integrated notepad to jot down thoughts, meeting notes, or documentation. Link notes to tasks for complete context.",
      delay: 0.2
    },
    {
      number: "04",
      title: "Review & Optimize",
      desc: "Analyze your productivity with built-in analytics. See where your time goes, identify bottlenecks, and continuously improve your workflow.",
      delay: 0.3
    }
  ],
  
  // Stats
  stats: [
    { value: "50000", label: "Active Users", suffix: "+" },
    { value: "1000000", label: "Tasks Completed", suffix: "+" },
    { value: "98", label: "User Satisfaction", suffix: "%" },
    { value: "24", label: "Support Hours", suffix: "/7" },
  ],
  
  // FAQs
  faqs: [
    {
      id: 1,
      question: "How does the timer feature work with tasks?",
      answer: "Each task can have its own custom timer. Click on any task to start a timer, set your desired duration (or use Pomodoro defaults), and track time spent. The timer runs in the background and saves your progress automatically. You can pause, resume, or reset at any time. All time data is logged for analytics."
    },
    {
      id: 2,
      question: "Can I link notes to specific tasks?",
      answer: "Absolutely! Our integrated notepad allows you to create notes and link them directly to tasks. This keeps all your context in one place. You can also create standalone notes for general ideas, meeting minutes, or documentation. Use tags and search to find notes instantly."
    },
    {
      id: 3,
      question: "Is my data really secure?",
      answer: "Yes. All your data is encrypted using AES-256 encryption and stored locally in your browser by default. If you enable cloud sync, we use end-to-end encryption, meaning your data is encrypted on your device before it ever reaches our servers. We cannot read your tasks, notes, or any personal information."
    },
    {
      id: 4,
      question: "Can I use TaskTime on mobile devices?",
      answer: "Yes! TaskTime is fully responsive and works seamlessly on iOS, Android, tablets, and desktop browsers. We're also developing native mobile apps for an even better experience. Your data syncs across all devices in real-time."
    },
    {
      id: 5,
      question: "How is this different from other task managers?",
      answer: "TaskTime uniquely combines three essential productivity tools: task management, time tracking, and note-taking. Most apps force you to switch between multiple tools. We integrate everything seamlessly—attach timers to tasks, link notes to projects, and see your entire workflow in one place. Plus, our privacy-first approach means your data stays yours."
    },
    {
      id: 6,
      question: "Can I export my data?",
      answer: "Yes. You have complete ownership of your data. Export everything to JSON, CSV, or Markdown format with a single click. No lock-in, no hassle. Your productivity data belongs to you, and you can take it anywhere."
    }
  ],
  
  // About Section
  about: {
    title: "Built by Developers, for Everyone",
    philosophy: "TaskTime was born from our own frustration with overly complex productivity tools that promise everything but deliver bloat. We believe that the best software gets out of your way and lets you focus on what matters. That's why we built TaskTime with a laser focus on three core pillars: simplicity, speed, and security.",
    audience: "Whether you are prepping for a bar exam or managing a remote engineering team, TaskTime is crafted for those who value their time. We are a small team of developers dedicated to creating the cleanest, fastest, and most secure workspace on the web that prioritize your privacy and your flow state above everything else.",
    mission: "Empowering Your Best Work Body: Our mission is to give you back 30 minutes of lost time every day. By removing the friction of organizing, we help you spend less time planning your work and more time actually doing the things that move the needle."
  },
  
  // CTA Section
  cta: {
    title: "Ready to Transform Your Productivity?",
    subtitle: "Join thousands of professionals who've mastered their time with TaskTime.",
    buttonText: "Start Your Free Trial",
    note: "No credit card required • 14-day free trial • Cancel anytime"
  },
  
  // Footer Links
  footerLinks: {
    product: [
      { text: "Features", path: "/features" },
      { text: "Pricing", path: "/pricing" },
      { text: "Demo", path: "/demo" },
      { text: "What's New", path: "/changelog" },
    ],
    resources: [
      { text: "Blog", path: "/blog" },
      { text: "Tutorials", path: "/tutorials" },
      { text: "Support", path: "/support" },
      { text: "FAQ", path: "/faq" },
    ],
    company: [
      { text: "About Us", path: "/about" },
      { text: "Contact", path: "/contact" },
    ],
    legal: [
      { text: "Privacy Policy", path: "/privacy" },
      { text: "Terms of Service", path: "/terms" },
      { text: "Cookie Policy", path: "/cookies" },
    ]
  },
  
  // Social Links
  socialLinks: [
    { platform: "facebook", url: "https://facebook.com", icon: "FaFacebookF" },
    { platform: "twitter", url: "https://x.com", icon: "FaXTwitter" },
    { platform: "instagram", url: "https://instagram.com", icon: "FaInstagram" },
    { platform: "linkedin", url: "https://linkedin.com", icon: "FaLinkedinIn" },
  ]
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    // Action to update any content dynamically if needed
    updateContent: (state, action) => {
      const { section, data } = action.payload;
      if (state[section]) {
        state[section] = { ...state[section], ...data };
      }
    },
    
    // Add a new review
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    
    // Update pricing
    updatePricing: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.pricing.findIndex(plan => plan.id === id);
      if (index !== -1) {
        state.pricing[index] = { ...state.pricing[index], ...updates };
      }
    },
    
    // Add FAQ
    addFAQ: (state, action) => {
      state.faqs.push({
        id: state.faqs.length + 1,
        ...action.payload
      });
    },
  },
});

export const {
  updateContent,
  addReview,
  updatePricing,
  addFAQ,
} = contentSlice.actions;

export default contentSlice.reducer;