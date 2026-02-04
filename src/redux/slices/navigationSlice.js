import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Current active page
  currentPage: '/',
  
  // Navigation history
  history: ['/'],
  
  // Active nav item (for highlighting)
  activeNavItem: 'home',
  
  // Breadcrumbs
  breadcrumbs: [{ label: 'Home', path: '/' }],
  
  // Previous page (for back navigation)
  previousPage: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    // Set current page
    setCurrentPage: (state, action) => {
      state.previousPage = state.currentPage;
      state.currentPage = action.payload;
      
      // Add to history if not the same as last entry
      if (state.history[state.history.length - 1] !== action.payload) {
        state.history.push(action.payload);
      }
    },
    
    // Set active nav item
    setActiveNavItem: (state, action) => {
      state.activeNavItem = action.payload;
    },
    
    // Update breadcrumbs
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    
    // Add breadcrumb
    addBreadcrumb: (state, action) => {
      state.breadcrumbs.push(action.payload);
    },
    
    // Go back in history
    goBack: (state) => {
      if (state.history.length > 1) {
        state.history.pop();
        state.currentPage = state.history[state.history.length - 1];
      }
    },
    
    // Clear history
    clearHistory: (state) => {
      state.history = [state.currentPage];
    },
    
    // Reset navigation
    resetNavigation: () => initialState,
  },
});

export const {
  setCurrentPage,
  setActiveNavItem,
  setBreadcrumbs,
  addBreadcrumb,
  goBack,
  clearHistory,
  resetNavigation,
} = navigationSlice.actions;

export default navigationSlice.reducer;