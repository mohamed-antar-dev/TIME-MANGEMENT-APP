import { createSlice } from '@reduxjs/toolkit';

// Load tasks from localStorage
const loadTasksFromLocalStorage = () => {
  try {
    const savedTasks = localStorage.getItem('myTasks');
    if (!savedTasks || savedTasks === 'undefined') {
      return [];
    }
    return JSON.parse(savedTasks);
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

// Save tasks to localStorage
const saveTasksToLocalStorage = (tasks) => {
  try {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

const initialState = {
  // Tasks Management
  tasks: loadTasksFromLocalStorage(),
  showTask: false,
  lockTask: false,
  infoTask: false,
  
  // Mobile Menu
  isMobileMenuOpen: false,
  
  // Scroll States
  showScrollToTop: false,
  scrollProgress: 0,
  
  // FAQ States - track which FAQs are open by index
  openFAQs: [],
  
  // Scroll Reveal States
  revealedSections: {
    about: false,
    features: false,
    howItWorks: false,
    stats: false,
    reviews: false,
    pricing: false,
    faq: false,
  },
  
  // Cursor position (for custom cursor)
  cursorPosition: { x: 0, y: 0 },
  
  // Stats animation trigger
  statsAnimationTriggered: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // ===== TASKS MANAGEMENT =====
    createTask: (state) => {
      // Verify task limit
      if (state.tasks.length >= 6) {
        alert("⚠️ Maximum 6 tasks reached!\n\n Upgrade to Premium for unlimited tasks.");
        return;
      }
      
      const newTask = {
        id: Date.now(),
        title: "",
        time: "",
        note: "",
        done: false,
        locked: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      state.tasks.unshift(newTask); // Add at the beginning
      state.showTask = true;
      saveTasksToLocalStorage(state.tasks);
    },
    
    deletTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    
    doneTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.done = !task.done;
        task.updatedAt = Date.now();
        saveTasksToLocalStorage(state.tasks);
      }
    },
    
    toggleLock: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.locked = !task.locked;
        task.updatedAt = Date.now();
        saveTasksToLocalStorage(state.tasks);
      }
    },
    
    updateTask: (state, action) => {
      const { id, title, time, note } = action.payload;
      const task = state.tasks.find(t => t.id === Number(id));
      if (task) {
        task.title = title;
        task.time = time;
        task.note = note;
        task.updatedAt = Date.now();
        saveTasksToLocalStorage(state.tasks);
      }
    },
    
    // Clear all completed tasks
    clearCompletedTasks: (state) => {
      state.tasks = state.tasks.filter(task => !task.done);
      saveTasksToLocalStorage(state.tasks);
    },
    
    // Clear all tasks
    clearAllTasks: (state) => {
      if (window.confirm('⚠️ Delete ALL tasks?\n\nThis action cannot be undone.')) {
        state.tasks = [];
        saveTasksToLocalStorage(state.tasks);
      }
    },
    
    // ===== MOBILE MENU ACTIONS =====
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    
    openMobileMenu: (state) => {
      state.isMobileMenuOpen = true;
    },
    
    // ===== SCROLL ACTIONS =====
    setShowScrollToTop: (state, action) => {
      state.showScrollToTop = action.payload;
    },
    
    setScrollProgress: (state, action) => {
      state.scrollProgress = action.payload;
    },
    
    // ===== FAQ ACTIONS =====
    toggleFAQ: (state, action) => {
      const index = action.payload;
      const faqIndex = state.openFAQs.indexOf(index);
      
      if (faqIndex > -1) {
        // FAQ is open, close it
        state.openFAQs.splice(faqIndex, 1);
      } else {
        // FAQ is closed, open it
        state.openFAQs.push(index);
      }
    },
    
    closeAllFAQs: (state) => {
      state.openFAQs = [];
    },
    
    openOnlyOneFAQ: (state, action) => {
      // Accordion mode - only one FAQ open at a time
      state.openFAQs = [action.payload];
    },
    
    // ===== SCROLL REVEAL ACTIONS =====
    revealSection: (state, action) => {
      const sectionName = action.payload;
      if (Object.prototype.hasOwnProperty.call(state.revealedSections, sectionName)) {
        state.revealedSections[sectionName] = true;
      }
    },
    
    resetRevealedSections: (state) => {
      Object.keys(state.revealedSections).forEach(key => {
        state.revealedSections[key] = false;
      });
    },
    
    // ===== CURSOR ACTIONS =====
    updateCursorPosition: (state, action) => {
      state.cursorPosition = action.payload;
    },
    
    // ===== STATS ANIMATION =====
    triggerStatsAnimation: (state) => {
      state.statsAnimationTriggered = true;
    },
    
    resetStatsAnimation: (state) => {
      state.statsAnimationTriggered = false;
    },
    
    // ===== TASK UI STATES =====
    setShowTask: (state, action) => {
      state.showTask = action.payload;
    },
    
    setLockTask: (state, action) => {
      state.lockTask = action.payload;
    },
    
    setInfoTask: (state, action) => {
      state.infoTask = action.payload;
    },
  },
});

export const {
  // Tasks
  createTask,
  deletTask,
  doneTask,
  toggleLock,
  updateTask,
  clearCompletedTasks,
  clearAllTasks,
  
  // Mobile Menu
  toggleMobileMenu,
  closeMobileMenu,
  openMobileMenu,
  
  // Scroll
  setShowScrollToTop,
  setScrollProgress,
  
  // FAQ
  toggleFAQ,
  closeAllFAQs,
  openOnlyOneFAQ,
  
  // Scroll Reveal
  revealSection,
  resetRevealedSections,
  
  // Cursor
  updateCursorPosition,
  
  // Stats
  triggerStatsAnimation,
  resetStatsAnimation,
  
  // Task UI
  setShowTask,
  setLockTask,
  setInfoTask,
} = uiSlice.actions;

export default uiSlice.reducer;