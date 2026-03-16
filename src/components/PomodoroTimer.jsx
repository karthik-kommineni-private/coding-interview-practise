import { useState, useEffect, useRef } from 'react';
import './PomodoroTimer.css';

function PomodoroTimer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [autoStart, setAutoStart] = useState(false);

  const intervalRef = useRef(null);
  const bellRef = useRef(null);
  const chimeRef = useRef(null);

  // Load preferences
  useEffect(() => {
    const savedSound = localStorage.getItem('pomodoroSound');
    const savedWork = localStorage.getItem('pomodoroWork');
    const savedBreak = localStorage.getItem('pomodoroBreak');
    const savedAutoStart = localStorage.getItem('pomodoroAutoStart');

    if (savedSound !== null) setSoundEnabled(savedSound === 'true');
    if (savedWork) setWorkDuration(parseInt(savedWork));
    if (savedBreak) setBreakDuration(parseInt(savedBreak));
    if (savedAutoStart !== null) setAutoStart(savedAutoStart === 'true');
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('pomodoroSound', soundEnabled.toString());
    localStorage.setItem('pomodoroWork', workDuration.toString());
    localStorage.setItem('pomodoroBreak', breakDuration.toString());
    localStorage.setItem('pomodoroAutoStart', autoStart.toString());
  }, [soundEnabled, workDuration, breakDuration, autoStart]);

  // Timer countdown
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);

    // Play sound
    if (soundEnabled) {
      if (mode === 'work' && bellRef.current) {
        bellRef.current.play().catch(err => console.error('Bell sound failed:', err));
      } else if (mode === 'break' && chimeRef.current) {
        chimeRef.current.play().catch(err => console.error('Chime sound failed:', err));
      }
    }

    // Switch mode
    if (mode === 'work') {
      setMode('break');
      setTimeLeft(breakDuration * 60);
    } else {
      setMode('work');
      setTimeLeft(workDuration * 60);
    }

    // Auto-start next session
    if (autoStart) {
      setTimeout(() => setIsRunning(true), 1000);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? workDuration * 60 : breakDuration * 60);
  };

  const switchMode = () => {
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? workDuration * 60 : breakDuration * 60);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'work'
    ? ((workDuration * 60 - timeLeft) / (workDuration * 60)) * 100
    : ((breakDuration * 60 - timeLeft) / (breakDuration * 60)) * 100;

  return (
    <div
      className={`pomodoro-widget ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Hidden audio elements */}
      <audio ref={bellRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSx+zPDeikAJFGS56+iaTBIKIHPE7d2QQAoUYrfp66xWFAZEnt/ww3ItBSN8y/LajzkHF2e46OSVSQoVWKvg66ZSEQk+mdn2zocuBSF2xu/bjTcHEGO36+aVSgoUV6jd66FNEAdBldzww3YxBilxwu/bjzkJEGS36+mUSwsVWKjb656NEQdCltj0y4IvBih2xe7di0ALEma96+WTTAsVWqra7J6OEghBlNn0zIQxBi11w+7fjDsJEGe/7OSPSwwVW6va7J2OEgdBltj0zIUyByh0w+7ejDoKEGfA7eSOS" preload="auto" />
      <audio ref={chimeRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSx+zPDeikAJFGS56+iaTBIKIHPE7d2QQAoUYrfp66xWFAZEnt/ww3ItBSN8y/LajzkHF2e46OSVSQoVWKvg66ZSEQk+mdn2zocuBSF2xu/bjTcHEGO36+aVSgoUV6jd66FNEAdBldzww3YxBilxwu/bjzkJEGS36+mUSwsVWKjb656NEQdCltj0y4IvBih2xe7di0ALEma96+WTTAsVWqra7J6OEghBlNn0zIQxBi11w+7fjDsJEGe/7OSPSwwVW6va7J2OEgdBltj0zIUyByh0w+7ejDoKEGfA7eSOS" preload="auto" />

      <div className="pomodoro-timer">
        <svg className="pomodoro-circle" viewBox="0 0 100 100">
          <circle
            className="pomodoro-bg"
            cx="50"
            cy="50"
            r="45"
          />
          <circle
            className={`pomodoro-progress ${mode}`}
            cx="50"
            cy="50"
            r="45"
            style={{
              strokeDashoffset: 283 - (283 * progress) / 100
            }}
          />
        </svg>

        <div className="pomodoro-content">
          <div className="pomodoro-time">{formatTime(timeLeft)}</div>
          <div className="pomodoro-mode">{mode === 'work' ? 'Focus' : 'Break'}</div>
        </div>
      </div>

      {isExpanded && (
        <div className="pomodoro-controls">
          <div className="pomodoro-buttons">
            <button onClick={toggleTimer} className="pomodoro-btn primary">
              {isRunning ? '⏸' : '▶'}
            </button>
            <button onClick={resetTimer} className="pomodoro-btn">
              ↻
            </button>
            <button onClick={switchMode} className="pomodoro-btn">
              {mode === 'work' ? '☕' : '💪'}
            </button>
          </div>

          <div className="pomodoro-settings">
            <label className="setting-row">
              <span>Work (min)</span>
              <input
                type="number"
                min="1"
                max="60"
                value={workDuration}
                onChange={(e) => {
                  setWorkDuration(parseInt(e.target.value) || 25);
                  if (mode === 'work' && !isRunning) {
                    setTimeLeft(parseInt(e.target.value) * 60 || 25 * 60);
                  }
                }}
              />
            </label>

            <label className="setting-row">
              <span>Break (min)</span>
              <input
                type="number"
                min="1"
                max="30"
                value={breakDuration}
                onChange={(e) => {
                  setBreakDuration(parseInt(e.target.value) || 5);
                  if (mode === 'break' && !isRunning) {
                    setTimeLeft(parseInt(e.target.value) * 60 || 5 * 60);
                  }
                }}
              />
            </label>

            <label className="setting-row checkbox">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
              />
              <span>Sound</span>
            </label>

            <label className="setting-row checkbox">
              <input
                type="checkbox"
                checked={autoStart}
                onChange={(e) => setAutoStart(e.target.checked)}
              />
              <span>Auto-start</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default PomodoroTimer;
