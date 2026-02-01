import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';

/**
 * The Store is the central hub for all application data.
 * By centralizing state, we prevent "prop drilling" (passing data through 10 components).
 */
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    // Add other slices here as we build them
  },
});