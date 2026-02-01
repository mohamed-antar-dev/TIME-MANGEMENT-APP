import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  // Initialize state by checking localStorage to see if user was previously in dark mode
  initialState: { darkMode: localStorage.getItem('theme') === 'dark' },
  reducers: {
    toggleTheme: (state) => {
      // Toggle boolean state
      state.darkMode = !state.darkMode;
      
      // Determine the string value for DOM manipulation
      const theme = state.darkMode ? 'dark' : 'light';
      
      // Save to localStorage so it stays on page refresh
      localStorage.setItem('theme', theme);
      
      // Directly manipulate the body attribute so CSS variables update instantly
      document.body.setAttribute('data-theme', theme);
    }
  }
});

// Export the action for the button to dispatch
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;