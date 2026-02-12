import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    // Mobile Menu Actions
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    openMobileMenu: (state) => {
      state.isMobileMenuOpen = true;
    },
    
    // Scroll Actions
    setShowScrollToTop: (state, action) => {
      state.showScrollToTop = action.payload;
    },
    setScrollProgress: (state, action) => {
      state.scrollProgress = action.payload;
    },
    
    // FAQ Actions
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
    
    // Scroll Reveal Actions
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
    
    // Cursor Actions
    updateCursorPosition: (state, action) => {
      state.cursorPosition = action.payload;
    },
    
    // Stats Animation
    triggerStatsAnimation: (state) => {
      state.statsAnimationTriggered = true;
    },
    resetStatsAnimation: (state) => {
      state.statsAnimationTriggered = false;
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  openMobileMenu,
  setShowScrollToTop,
  setScrollProgress,
  toggleFAQ,
  closeAllFAQs,
  openOnlyOneFAQ,
  revealSection,
  resetRevealedSections,
  updateCursorPosition,
  triggerStatsAnimation,
  resetStatsAnimation,
} = uiSlice.actions;

export default uiSlice.reducer;