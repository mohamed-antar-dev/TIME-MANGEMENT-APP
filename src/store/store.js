import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import uiReducer from './uiSlice';
import contentReducer from './contentSlice';
import userPreferencesReducer from './userPreferencesSlice';
import navigationReducer from './navigationSlice';
import notePadReducer from './notePadSlice';
import signupReducer from './signupSlice';
import timerReducer from './timerSlice';
import LoginReducer from './LoginSlice'
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ui: uiReducer,
    content: contentReducer,
    userPreferences: userPreferencesReducer,
    navigation: navigationReducer,
    notePad: notePadReducer,
    signup: signupReducer,
    Login: LoginReducer,
    timer: timerReducer,
  },
});

export default store;