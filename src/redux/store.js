import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import uiReducer from './slices/uiSlice';
import contentReducer from './slices/contentSlice';
import userPreferencesReducer from './slices/userPreferencesSlice';
import navigationReducer from './slices/navigationSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ui: uiReducer,
    content: contentReducer,
    userPreferences: userPreferencesReducer,
    navigation: navigationReducer,
  },
});

export default store;