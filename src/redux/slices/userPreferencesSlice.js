import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Language preference
  language: 'en', // 'en', 'fr', 'ar'
  
  // Animation preferences
  animations: {
    enabled: true,
    scrambleSpeed: 40,
    scrollRevealThreshold: 0.15,
  },
  
  // User interface preferences
  interface: {
    showScrollProgress: true,
    customCursor: true,
    statsCounterEnabled: true,
  },
  
  // Accessibility
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    fontSize: 'medium', // 'small', 'medium', 'large'
  },
  
  // First visit
  isFirstVisit: true,
  hasSeenWelcome: false,
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    // Language Actions
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    
    // Animation Actions
    toggleAnimations: (state) => {
      state.animations.enabled = !state.animations.enabled;
    },
    setScrambleSpeed: (state, action) => {
      state.animations.scrambleSpeed = action.payload;
    },
    setScrollRevealThreshold: (state, action) => {
      state.animations.scrollRevealThreshold = action.payload;
    },
    
    // Interface Actions
    toggleScrollProgress: (state) => {
      state.interface.showScrollProgress = !state.interface.showScrollProgress;
    },
    toggleCustomCursor: (state) => {
      state.interface.customCursor = !state.interface.customCursor;
    },
    toggleStatsCounter: (state) => {
      state.interface.statsCounterEnabled = !state.interface.statsCounterEnabled;
    },
    
    // Accessibility Actions
    toggleReducedMotion: (state) => {
      state.accessibility.reducedMotion = !state.accessibility.reducedMotion;
      // Automatically disable animations if reduced motion is enabled
      if (state.accessibility.reducedMotion) {
        state.animations.enabled = false;
      }
    },
    toggleHighContrast: (state) => {
      state.accessibility.highContrast = !state.accessibility.highContrast;
    },
    setFontSize: (state, action) => {
      state.accessibility.fontSize = action.payload;
    },
    
    // First Visit Actions
    markWelcomeSeen: (state) => {
      state.hasSeenWelcome = true;
      state.isFirstVisit = false;
    },
    resetFirstVisit: (state) => {
      state.isFirstVisit = true;
      state.hasSeenWelcome = false;
    },
    
    // Reset all preferences
    resetPreferences: () => initialState,
  },
});

export const {
  setLanguage,
  toggleAnimations,
  setScrambleSpeed,
  setScrollRevealThreshold,
  toggleScrollProgress,
  toggleCustomCursor,
  toggleStatsCounter,
  toggleReducedMotion,
  toggleHighContrast,
  setFontSize,
  markWelcomeSeen,
  resetFirstVisit,
  resetPreferences,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;