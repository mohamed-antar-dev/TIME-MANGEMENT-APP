import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('timerState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading timer state:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('timerState', serializedState);
  } catch (err) {
    console.error('Error saving timer state:', err);
  }
};

const initialState = loadFromLocalStorage() || {
  // Timer settings
  focusTime: 25, // minutes
  shortBreak: 5,
  longBreak: 15,
  sessionsBeforeLongBreak: 4,

  // Timer state
  currentMode: 'focus', // 'focus', 'short-break', 'long-break'
  secondsLeft: 25 * 60,
  isRunning: false,
  sessionsCompleted: 0,
  totalFocusTime: 0,
  lastTickTimestamp: null, // For tracking when timer was last updated

  // UI settings
  showSettings: false,
  soundEnabled: true,
  notificationsEnabled: true,
  autoStartBreaks: false,
  autoStartPomodoros: false,

  // History & Statistics
  dailyStats: {}, // { 'YYYY-MM-DD': { focusTime: 0, sessionsCompleted: 0 } }
  weeklyGoal: 120, // minutes
  completedSessions: [], // Array of completed session objects with timestamps
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    // ===== TIMER CONTROLS =====
    startTimer: (state) => {
      state.isRunning = true;
      state.lastTickTimestamp = Date.now();
      saveToLocalStorage(state);
    },

    pauseTimer: (state) => {
      state.isRunning = false;
      state.lastTickTimestamp = null;
      saveToLocalStorage(state);
    },

    tickTimer: (state) => {
      if (state.isRunning && state.secondsLeft > 0) {
        state.secondsLeft -= 1;
        
        // Track focus time
        if (state.currentMode === 'focus') {
          state.totalFocusTime += 1;
          
          // Update daily stats
          const today = new Date().toISOString().split('T')[0];
          if (!state.dailyStats[today]) {
            state.dailyStats[today] = { focusTime: 0, sessionsCompleted: 0 };
          }
          state.dailyStats[today].focusTime += 1;
        }
        
        state.lastTickTimestamp = Date.now();
        saveToLocalStorage(state);
      }
    },

    completeTimer: (state) => {
      state.isRunning = false;
      
      // Track completed session
      if (state.currentMode === 'focus') {
        state.sessionsCompleted += 1;
        
        // Add to completed sessions history
        state.completedSessions.push({
          timestamp: Date.now(),
          duration: state.focusTime * 60,
          mode: state.currentMode,
        });
        
        // Update daily stats
        const today = new Date().toISOString().split('T')[0];
        if (!state.dailyStats[today]) {
          state.dailyStats[today] = { focusTime: 0, sessionsCompleted: 0 };
        }
        state.dailyStats[today].sessionsCompleted += 1;
        
        // Determine next mode
        const nextBreak = state.sessionsCompleted % state.sessionsBeforeLongBreak === 0
          ? 'long-break'
          : 'short-break';
        
        state.currentMode = nextBreak;
        
        // Auto-start breaks if enabled
        if (state.autoStartBreaks) {
          state.isRunning = true;
          state.lastTickTimestamp = Date.now();
        }
      } else {
        // Break completed, return to focus
        state.currentMode = 'focus';
        
        // Auto-start next focus session if enabled
        if (state.autoStartPomodoros) {
          state.isRunning = true;
          state.lastTickTimestamp = Date.now();
        }
      }
      
      // Reset timer for new mode
      state.secondsLeft = state.currentMode === 'focus' ? state.focusTime * 60 :
                          state.currentMode === 'short-break' ? state.shortBreak * 60 :
                          state.longBreak * 60;
      
      saveToLocalStorage(state);
    },

    resetTimer: (state) => {
      state.isRunning = false;
      state.lastTickTimestamp = null;
      
      // Reset to current mode's duration
      state.secondsLeft = state.currentMode === 'focus' ? state.focusTime * 60 :
                          state.currentMode === 'short-break' ? state.shortBreak * 60 :
                          state.longBreak * 60;
      
      saveToLocalStorage(state);
    },

    // ===== MODE MANAGEMENT =====
    setMode: (state, action) => {
      state.currentMode = action.payload;
      state.isRunning = false;
      state.lastTickTimestamp = null;
      
      // Set seconds for new mode
      state.secondsLeft = action.payload === 'focus' ? state.focusTime * 60 :
                          action.payload === 'short-break' ? state.shortBreak * 60 :
                          state.longBreak * 60;
      
      saveToLocalStorage(state);
    },

    // ===== SETTINGS MANAGEMENT =====
    updateSettings: (state, action) => {
      const { focusTime, shortBreak, longBreak, sessionsBeforeLongBreak } = action.payload;
      
      if (focusTime !== undefined) state.focusTime = focusTime;
      if (shortBreak !== undefined) state.shortBreak = shortBreak;
      if (longBreak !== undefined) state.longBreak = longBreak;
      if (sessionsBeforeLongBreak !== undefined) state.sessionsBeforeLongBreak = sessionsBeforeLongBreak;
      
      // Reset timer if not running
      if (!state.isRunning) {
        state.secondsLeft = state.currentMode === 'focus' ? state.focusTime * 60 :
                            state.currentMode === 'short-break' ? state.shortBreak * 60 :
                            state.longBreak * 60;
      }
      
      saveToLocalStorage(state);
    },

    toggleSetting: (state, action) => {
      const setting = action.payload;
      if (state[setting] !== undefined) {
        state[setting] = !state[setting];
        saveToLocalStorage(state);
      }
    },

    toggleSettingsModal: (state) => {
      state.showSettings = !state.showSettings;
      saveToLocalStorage(state);
    },

    // ===== SYNC WHEN TAB BECOMES ACTIVE =====
    syncTimer: (state) => {
      // When tab becomes active, calculate elapsed time
      if (state.isRunning && state.lastTickTimestamp) {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - state.lastTickTimestamp) / 1000);
        
        if (elapsedSeconds > 0) {
          // Update seconds left
          const newSecondsLeft = state.secondsLeft - elapsedSeconds;
          
          if (newSecondsLeft <= 0) {
            // Timer completed while away
            state.secondsLeft = 0;
            // Will trigger completion in the component
          } else {
            state.secondsLeft = newSecondsLeft;
            
            // Update focus time if in focus mode
            if (state.currentMode === 'focus') {
              state.totalFocusTime += elapsedSeconds;
              
              const today = new Date().toISOString().split('T')[0];
              if (!state.dailyStats[today]) {
                state.dailyStats[today] = { focusTime: 0, sessionsCompleted: 0 };
              }
              state.dailyStats[today].focusTime += elapsedSeconds;
            }
          }
          
          state.lastTickTimestamp = now;
          saveToLocalStorage(state);
        }
      }
    },

    // ===== STATISTICS =====
    resetStats: (state) => {
      state.sessionsCompleted = 0;
      state.totalFocusTime = 0;
      state.completedSessions = [];
      saveToLocalStorage(state);
    },

    setWeeklyGoal: (state, action) => {
      state.weeklyGoal = action.payload;
      saveToLocalStorage(state);
    },

    clearOldHistory: (state) => {
      // Keep only last 30 days of stats
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];
      
      const newDailyStats = {};
      Object.keys(state.dailyStats).forEach(date => {
        if (date >= cutoffDate) {
          newDailyStats[date] = state.dailyStats[date];
        }
      });
      
      state.dailyStats = newDailyStats;
      
      // Keep only last 100 sessions
      if (state.completedSessions.length > 100) {
        state.completedSessions = state.completedSessions.slice(-100);
      }
      
      saveToLocalStorage(state);
    },

    // ===== RESET ALL =====
    resetAll: () => {
      const newState = {
        ...initialState,
        // Keep settings
        soundEnabled: initialState.soundEnabled,
        notificationsEnabled: initialState.notificationsEnabled,
        autoStartBreaks: initialState.autoStartBreaks,
        autoStartPomodoros: initialState.autoStartPomodoros,
      };
      saveToLocalStorage(newState);
      return newState;
    },
  },
});

export const {
  startTimer,
  pauseTimer,
  tickTimer,
  completeTimer,
  resetTimer,
  resetAll,
  setMode,
  updateSettings,
  toggleSetting,
  toggleSettingsModal,
  syncTimer,
  resetStats,
  setWeeklyGoal,
  clearOldHistory,
} = timerSlice.actions;

export default timerSlice.reducer;