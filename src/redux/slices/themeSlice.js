import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  // Custom theme colors (can be extended)
  customTheme: null,
  // Available themes
  availableThemes: ['default', 'ocean', 'sunset', 'forest', 'monochrome'],
  currentTheme: 'default',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setCurrentTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
    setCustomTheme: (state, action) => {
      state.customTheme = action.payload;
    },
    resetTheme: (state) => {
      state.darkMode = false;
      state.currentTheme = 'default';
      state.customTheme = null;
    },
  },
});

export const {
  toggleTheme,
  setDarkMode,
  setCurrentTheme,
  setCustomTheme,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;