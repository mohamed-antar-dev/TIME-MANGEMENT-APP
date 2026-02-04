import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Connects React to Redux
import { store } from './redux/store';  // Our centralized state
import App from './App';
import './index.css';                  // Global styles & CSS variables

/**
 * The Root of the application.
 * We wrap <App /> in <Provider> so every child component can access the global state.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);