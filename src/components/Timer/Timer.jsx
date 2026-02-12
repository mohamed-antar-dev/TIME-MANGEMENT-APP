import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  startTimer,
  pauseTimer,
  tickTimer,
  completeTimer,
  resetTimer,
  setMode,
  updateSettings,
  toggleSetting,
  toggleSettingsModal,
  syncTimer,
} from '../../store/timerSlice';
import { 
  FaPlay, 
  FaPause, 
  FaRedo, 
  FaCog,
  FaCoffee,
  FaBrain,
  FaCheckCircle
} from 'react-icons/fa';
import './Timer.css';

const Timer = () => {
  const dispatch = useDispatch();
  
  // Redux State
  const {
    focusTime,
    shortBreak,
    longBreak,
    sessionsBeforeLongBreak,
    currentMode,
    secondsLeft,
    isRunning,
    sessionsCompleted,
    totalFocusTime,
    showSettings,
    soundEnabled,
    notificationsEnabled,
    autoStartBreaks,
    autoStartPomodoros,
  } = useSelector((state) => state.timer);

  const timerRef = useRef(null);
  const completionSound = useRef(null);
  const notificationShown = useRef(false);

  // Sync timer when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isRunning) {
        dispatch(syncTimer());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, dispatch]);

  // Main timer countdown - runs even when navigating between pages!
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        dispatch(tickTimer());
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, dispatch]);

  // Handle timer completion
  useEffect(() => {
    if (secondsLeft === 0 && !notificationShown.current) {
      notificationShown.current = true;
      
      // Play sound
      if (soundEnabled && completionSound.current) {
        completionSound.current.play().catch(err => {
          console.log('Could not play sound:', err);
        });
      }

      // Show notification
      if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
        const messages = {
          'focus': '🎉 Great work! Time for a break.',
          'short-break': '✨ Break over! Ready to focus?',
          'long-break': '🚀 Long break done! Let\'s get back to work.'
        };
        
        new Notification('TaskTime Focus', {
          body: messages[currentMode],
          icon: '/favicon.ico',
          requireInteraction: true,
        });
      }

      // Complete the timer
      dispatch(completeTimer());
      
      // Reset notification flag after a delay
      setTimeout(() => {
        notificationShown.current = false;
      }, 1000);
    }
  }, [secondsLeft, soundEnabled, notificationsEnabled, currentMode, dispatch]);

  // Request notification permission
  useEffect(() => {
    if (notificationsEnabled && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [notificationsEnabled]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format total focus time
  const formatTotalTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Calculate progress percentage
  const getProgress = () => {
    const total = currentMode === 'focus' ? focusTime * 60 :
                  currentMode === 'short-break' ? shortBreak * 60 :
                  longBreak * 60;
    return ((total - secondsLeft) / total) * 100;
  };

  // Control functions
  const handlePlayPause = () => {
    if (isRunning) {
      dispatch(pauseTimer());
    } else {
      dispatch(startTimer());
    }
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  const handleModeChange = (mode) => {
    dispatch(setMode(mode));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const settings = {
      focusTime: parseInt(form.focusTime.value) || 25,
      shortBreak: parseInt(form.shortBreak.value) || 5,
      longBreak: parseInt(form.longBreak.value) || 15,
      sessionsBeforeLongBreak: parseInt(form.sessionsBeforeLongBreak.value) || 4,
    };
    
    dispatch(updateSettings(settings));
    dispatch(toggleSettingsModal());
  };

  // Update document title with timer
  useEffect(() => {
    if (isRunning) {
      document.title = `${formatTime(secondsLeft)} - ${currentMode === 'focus' ? 'Focus' : 'Break'} | TaskTime`;
    } else {
      document.title = 'TaskTime - Focus Timer';
    }
  }, [secondsLeft, isRunning, currentMode]);

  return (
    <div className="focus-container">
      {/* Audio element for completion sound */}
      <audio ref={completionSound} src="/notification.mp3" preload="auto" />

      <div className="focus-content">
        {/* Header */}
        <div className="focus-header">
          <h1 className="focus-title">Focus Timer</h1>
          <button 
            className="settings-btn"
            onClick={() => dispatch(toggleSettingsModal())}
          >
            <FaCog />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="mode-selector">
          <button
            className={`mode-btn ${currentMode === 'focus' ? 'active' : ''}`}
            onClick={() => handleModeChange('focus')}
            disabled={isRunning}
          >
            <FaBrain /> Focus
          </button>
          <button
            className={`mode-btn ${currentMode === 'short-break' ? 'active' : ''}`}
            onClick={() => handleModeChange('short-break')}
            disabled={isRunning}
          >
            <FaCoffee /> Short Break
          </button>
          <button
            className={`mode-btn ${currentMode === 'long-break' ? 'active' : ''}`}
            onClick={() => handleModeChange('long-break')}
            disabled={isRunning}
          >
            <FaCoffee /> Long Break
          </button>
        </div>

        {/* Timer Display */}
        <div className={`timer-display ${currentMode}`}>
          <svg className="progress-ring" width="320" height="320">
            <circle
              className="progress-ring-bg"
              cx="160"
              cy="160"
              r="140"
              strokeWidth="12"
            />
            <circle
              className="progress-ring-fill"
              cx="160"
              cy="160"
              r="140"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 140}
              strokeDashoffset={2 * Math.PI * 140 * (1 - getProgress() / 100)}
              style={{
                transition: isRunning ? 'none' : 'stroke-dashoffset 0.3s ease'
              }}
            />
          </svg>

          <div className="timer-text">
            <div className="time-display">{formatTime(secondsLeft)}</div>
            <div className="mode-label">
              {currentMode === 'focus' && 'Focus Time'}
              {currentMode === 'short-break' && 'Short Break'}
              {currentMode === 'long-break' && 'Long Break'}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="timer-controls">
          <button
            className="control-btn primary"
            onClick={handlePlayPause}
          >
            {isRunning ? <FaPause /> : <FaPlay />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            className="control-btn secondary"
            onClick={handleReset}
          >
            <FaRedo /> Reset
          </button>
        </div>

        {/* Stats */}
        <div className="focus-stats">
          <div className="stat-card">
            <FaCheckCircle className="stat-icon" />
            <div className="stat-info">
              <div className="stat-value">{sessionsCompleted}</div>
              <div className="stat-label">Sessions Completed</div>
            </div>
          </div>
          <div className="stat-card">
            <FaBrain className="stat-icon" />
            <div className="stat-info">
              <div className="stat-value">{formatTotalTime(totalFocusTime)}</div>
              <div className="stat-label">Total Focus Time</div>
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="settings-modal" onClick={() => dispatch(toggleSettingsModal())}>
            <div className="settings-content" onClick={(e) => e.stopPropagation()}>
              <h2>Timer Settings</h2>

              <form onSubmit={handleSaveSettings}>
                <div className="settings-group">
                  <h3>Time (minutes)</h3>
                  <div className="setting-item">
                    <label>Focus Duration</label>
                    <input
                      type="number"
                      name="focusTime"
                      min="1"
                      max="60"
                      defaultValue={focusTime}
                    />
                  </div>
                  <div className="setting-item">
                    <label>Short Break</label>
                    <input
                      type="number"
                      name="shortBreak"
                      min="1"
                      max="30"
                      defaultValue={shortBreak}
                    />
                  </div>
                  <div className="setting-item">
                    <label>Long Break</label>
                    <input
                      type="number"
                      name="longBreak"
                      min="1"
                      max="60"
                      defaultValue={longBreak}
                    />
                  </div>
                  <div className="setting-item">
                    <label>Sessions Before Long Break</label>
                    <input
                      type="number"
                      name="sessionsBeforeLongBreak"
                      min="1"
                      max="10"
                      defaultValue={sessionsBeforeLongBreak}
                    />
                  </div>
                </div>

                <div className="settings-group">
                  <h3>Preferences</h3>
                  <div className="setting-toggle">
                    <label>
                      <input
                        type="checkbox"
                        checked={soundEnabled}
                        onChange={() => dispatch(toggleSetting('soundEnabled'))}
                      />
                      <span>Sound Notifications</span>
                    </label>
                  </div>
                  <div className="setting-toggle">
                    <label>
                      <input
                        type="checkbox"
                        checked={notificationsEnabled}
                        onChange={() => dispatch(toggleSetting('notificationsEnabled'))}
                      />
                      <span>Desktop Notifications</span>
                    </label>
                  </div>
                  <div className="setting-toggle">
                    <label>
                      <input
                        type="checkbox"
                        checked={autoStartBreaks}
                        onChange={() => dispatch(toggleSetting('autoStartBreaks'))}
                      />
                      <span>Auto-start Breaks</span>
                    </label>
                  </div>
                  <div className="setting-toggle">
                    <label>
                      <input
                        type="checkbox"
                        checked={autoStartPomodoros}
                        onChange={() => dispatch(toggleSetting('autoStartPomodoros'))}
                      />
                      <span>Auto-start Focus Sessions</span>
                    </label>
                  </div>
                </div>

                <div className="settings-actions">
                  <button type="submit" className="btn-save-settings">
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;