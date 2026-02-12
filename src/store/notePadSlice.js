import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('notePadState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading notepad state:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('notePadState', serializedState);
  } catch (err) {
    console.error('Error saving notepad state:', err);
  }
};

const defaultInitialState = {
  // General Notes
  generalNotes: [],
  currentGeneralNote: {
    id: null,
    title: '',
    content: '',
    createdAt: null,
    updatedAt: null,
    color: 'default',
    tags: [],
    favorite: false
  },
  
  // Secure Notes
  secureNotes: [],
  currentSecureNote: {
    id: null,
    title: '',
    content: '',
    createdAt: null,
    updatedAt: null,
    color: 'default',
    tags: [],
    favorite: false
  },
  
  // Security Settings
  isSecureUnlocked: false,
  securePin: null, // 5-digit PIN
  pinAttempts: 0,
  maxPinAttempts: 3,
  lockoutTime: null,
  
  // UI States
  activeTab: 'general', // 'general' or 'secure'
  selectedNoteId: null,
  isCreatingNote: false,
  searchQuery: '',
  filterTag: 'all',
  sortBy: 'updatedAt', // 'updatedAt', 'createdAt', 'title', 'favorite'
  viewMode: 'list', // 'list' or 'grid'
  
  // Editor States
  isEditing: false,
  autoSaveEnabled: true,
  lastSaved: null,
  
  // Color Palette for Notes
  colorPalette: [
    { id: 'default', name: 'Default', value: 'var(--bg-elevated)' },
    { id: 'blue', name: 'Blue', value: '#E3F2FD' },
    { id: 'green', name: 'Green', value: '#E8F5E9' },
    { id: 'yellow', name: 'Yellow', value: '#FFF9C4' },
    { id: 'orange', name: 'Orange', value: '#FFE0B2' },
    { id: 'pink', name: 'Pink', value: '#FCE4EC' },
    { id: 'purple', name: 'Purple', value: '#F3E5F5' },
    { id: 'red', name: 'Red', value: '#FFEBEE' }
  ],
  
  // Available Tags
  availableTags: [
    'Work', 'Personal', 'Ideas', 'Important', 'Todo', 'Meeting', 'Project', 'Study'
  ],
};

const initialState = loadFromLocalStorage() || defaultInitialState;

const notePadSlice = createSlice({
  name: 'notePad',
  initialState,
  reducers: {
    // ===== PIN MANAGEMENT =====
    setSecurePin: (state, action) => {
      state.securePin = action.payload;
      saveToLocalStorage(state);
    },
    
    unlockSecure: (state, action) => {
      const enteredPin = action.payload;
      
      // Check if locked out
      if (state.lockoutTime && Date.now() < state.lockoutTime) {
        return;
      }
      
      if (state.securePin === enteredPin) {
        state.isSecureUnlocked = true;
        state.pinAttempts = 0;
        state.lockoutTime = null;
      } else {
        state.pinAttempts += 1;
        
        // Lock out after max attempts
        if (state.pinAttempts >= state.maxPinAttempts) {
          state.lockoutTime = Date.now() + (5 * 60 * 1000); // 5 minutes lockout
          state.pinAttempts = 0;
        }
      }
      saveToLocalStorage(state);
    },
    
    lockSecure: (state) => {
      state.isSecureUnlocked = false;
      saveToLocalStorage(state);
    },
    
    changeSecurePin: (state, action) => {
      const { oldPin, newPin } = action.payload;
      if (state.securePin === oldPin) {
        state.securePin = newPin;
        saveToLocalStorage(state);
      }
    },
    
    resetPinAttempts: (state) => {
      state.pinAttempts = 0;
      state.lockoutTime = null;
      saveToLocalStorage(state);
    },
    
    // ===== TAB MANAGEMENT =====
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.selectedNoteId = null;
      state.isCreatingNote = false;
      saveToLocalStorage(state);
    },
    
    // ===== GENERAL NOTES MANAGEMENT =====
    createGeneralNote: (state) => {
      const newNote = {
        id: Date.now().toString(),
        title: 'Untitled Note',
        content: '',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        color: 'default',
        tags: [],
        favorite: false
      };
      
      state.generalNotes.unshift(newNote);
      state.currentGeneralNote = newNote;
      state.selectedNoteId = newNote.id;
      state.isCreatingNote = true;
      state.isEditing = true;
      saveToLocalStorage(state);
    },
    
    updateGeneralNote: (state, action) => {
      const { id, updates } = action.payload;
      const noteIndex = state.generalNotes.findIndex(note => note.id === id);
      
      if (noteIndex !== -1) {
        state.generalNotes[noteIndex] = {
          ...state.generalNotes[noteIndex],
          ...updates,
          updatedAt: Date.now()
        };
        
        if (state.currentGeneralNote.id === id) {
          state.currentGeneralNote = state.generalNotes[noteIndex];
        }
        
        state.lastSaved = Date.now();
        saveToLocalStorage(state);
      }
    },
    
    deleteGeneralNote: (state, action) => {
      const id = action.payload;
      state.generalNotes = state.generalNotes.filter(note => note.id !== id);
      
      if (state.selectedNoteId === id) {
        state.selectedNoteId = null;
        state.currentGeneralNote = defaultInitialState.currentGeneralNote;
      }
      saveToLocalStorage(state);
    },
    
    selectGeneralNote: (state, action) => {
      const note = state.generalNotes.find(n => n.id === action.payload);
      if (note) {
        state.currentGeneralNote = note;
        state.selectedNoteId = note.id;
        state.isEditing = false;
        saveToLocalStorage(state);
      }
    },
    
    toggleGeneralFavorite: (state, action) => {
      const id = action.payload;
      const note = state.generalNotes.find(n => n.id === id);
      if (note) {
        note.favorite = !note.favorite;
        saveToLocalStorage(state);
      }
    },
    
    // ===== SECURE NOTES MANAGEMENT =====
    createSecureNote: (state) => {
      if (!state.isSecureUnlocked) return;
      
      const newNote = {
        id: Date.now().toString(),
        title: 'Untitled Secure Note',
        content: '',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        color: 'default',
        tags: [],
        favorite: false
      };
      
      state.secureNotes.unshift(newNote);
      state.currentSecureNote = newNote;
      state.selectedNoteId = newNote.id;
      state.isCreatingNote = true;
      state.isEditing = true;
      saveToLocalStorage(state);
    },
    
    updateSecureNote: (state, action) => {
      if (!state.isSecureUnlocked) return;
      
      const { id, updates } = action.payload;
      const noteIndex = state.secureNotes.findIndex(note => note.id === id);
      
      if (noteIndex !== -1) {
        state.secureNotes[noteIndex] = {
          ...state.secureNotes[noteIndex],
          ...updates,
          updatedAt: Date.now()
        };
        
        if (state.currentSecureNote.id === id) {
          state.currentSecureNote = state.secureNotes[noteIndex];
        }
        
        state.lastSaved = Date.now();
        saveToLocalStorage(state);
      }
    },
    
    deleteSecureNote: (state, action) => {
      if (!state.isSecureUnlocked) return;
      
      const id = action.payload;
      state.secureNotes = state.secureNotes.filter(note => note.id !== id);
      
      if (state.selectedNoteId === id) {
        state.selectedNoteId = null;
        state.currentSecureNote = defaultInitialState.currentSecureNote;
      }
      saveToLocalStorage(state);
    },
    
    selectSecureNote: (state, action) => {
      if (!state.isSecureUnlocked) return;
      
      const note = state.secureNotes.find(n => n.id === action.payload);
      if (note) {
        state.currentSecureNote = note;
        state.selectedNoteId = note.id;
        state.isEditing = false;
        saveToLocalStorage(state);
      }
    },
    
    toggleSecureFavorite: (state, action) => {
      if (!state.isSecureUnlocked) return;
      
      const id = action.payload;
      const note = state.secureNotes.find(n => n.id === id);
      if (note) {
        note.favorite = !note.favorite;
        saveToLocalStorage(state);
      }
    },
    
    // ===== SEARCH & FILTER =====
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      // Don't save search query to localStorage
    },
    
    setFilterTag: (state, action) => {
      state.filterTag = action.payload;
      saveToLocalStorage(state);
    },
    
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      saveToLocalStorage(state);
    },
    
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
      saveToLocalStorage(state);
    },
    
    // ===== EDITOR STATES =====
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
      // Don't save editing state to localStorage
    },
    
    toggleAutoSave: (state) => {
      state.autoSaveEnabled = !state.autoSaveEnabled;
      saveToLocalStorage(state);
    },
    
    // ===== TAGS MANAGEMENT =====
    addTag: (state, action) => {
      const tag = action.payload;
      if (!state.availableTags.includes(tag)) {
        state.availableTags.push(tag);
        saveToLocalStorage(state);
      }
    },
    
    removeTag: (state, action) => {
      state.availableTags = state.availableTags.filter(t => t !== action.payload);
      saveToLocalStorage(state);
    },
    
    // ===== RESET =====
    resetNotePad: () => {
      const newState = defaultInitialState;
      saveToLocalStorage(newState);
      return newState;
    },
  },
});

export const {
  setSecurePin,
  unlockSecure,
  lockSecure,
  changeSecurePin,
  resetPinAttempts,
  setActiveTab,
  createGeneralNote,
  updateGeneralNote,
  deleteGeneralNote,
  selectGeneralNote,
  toggleGeneralFavorite,
  createSecureNote,
  updateSecureNote,
  deleteSecureNote,
  selectSecureNote,
  toggleSecureFavorite,
  setSearchQuery,
  setFilterTag,
  setSortBy,
  setViewMode,
  setIsEditing,
  toggleAutoSave,
  addTag,
  removeTag,
  resetNotePad,
} = notePadSlice.actions;

export default notePadSlice.reducer;