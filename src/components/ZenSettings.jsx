import { useState, useEffect } from 'react';
import './ZenSettings.css';

function ZenSettings({ onClose, currentPattern, onPatternChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState(currentPattern || 'none');
  const [matrixEnabled, setMatrixEnabled] = useState(true);

  const patterns = [
    { id: 'none', name: 'None', emoji: '🚫', description: 'No background pattern' },
    { id: 'particles', name: 'Floating Particles', emoji: '✨', description: 'Gentle floating dots' },
    { id: 'ripples', name: 'Water Ripples', emoji: '💧', description: 'Expanding circles' },
    { id: 'aurora', name: 'Aurora', emoji: '🌌', description: 'Flowing gradient waves' },
    { id: 'breathing', name: 'Breathing', emoji: '🫁', description: 'Breath-synced circles' }
  ];

  useEffect(() => {
    const savedMatrix = localStorage.getItem('matrixEnabled');
    const savedPattern = localStorage.getItem('backgroundPattern');

    if (savedMatrix !== null) setMatrixEnabled(savedMatrix === 'true');
    if (savedPattern) setSelectedPattern(savedPattern);
  }, []);

  useEffect(() => {
    localStorage.setItem('matrixEnabled', matrixEnabled.toString());
    localStorage.setItem('backgroundPattern', selectedPattern);
  }, [matrixEnabled, selectedPattern]);

  const handlePatternChange = (patternId) => {
    setSelectedPattern(patternId);
    if (onPatternChange) {
      onPatternChange(patternId);
    }
  };

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      <button
        className="zen-settings-trigger"
        onClick={toggleSettings}
        title="Zen settings"
      >
        ⚙️
      </button>

      {isOpen && (
        <>
          <div className="zen-settings-overlay" onClick={handleClose} />
          <div className="zen-settings-panel">
            <div className="zen-settings-header">
              <h2>🧘 Zen Settings</h2>
              <button className="close-btn" onClick={handleClose}>✕</button>
            </div>

            <div className="zen-settings-content">
              <section className="settings-section">
                <h3>Background Effects</h3>

                <label className="setting-toggle">
                  <input
                    type="checkbox"
                    checked={matrixEnabled}
                    onChange={(e) => setMatrixEnabled(e.target.checked)}
                  />
                  <span>Matrix Rain</span>
                </label>

                <div className="pattern-grid">
                  {patterns.map(pattern => (
                    <button
                      key={pattern.id}
                      className={`pattern-card ${selectedPattern === pattern.id ? 'active' : ''}`}
                      onClick={() => handlePatternChange(pattern.id)}
                    >
                      <span className="pattern-emoji">{pattern.emoji}</span>
                      <span className="pattern-name">{pattern.name}</span>
                      <span className="pattern-desc">{pattern.description}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="settings-section">
                <h3>Features Guide</h3>
                <div className="feature-list">
                  <div className="feature-item">
                    <span className="feature-icon">🔊</span>
                    <div>
                      <strong>Ambient Sounds</strong>
                      <p>Bottom-left corner - Peaceful background audio</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">⏱️</span>
                    <div>
                      <strong>Pomodoro Timer</strong>
                      <p>Bottom-right corner - Focus timer with breaks</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🌿</span>
                    <div>
                      <strong>Breathing Exercise</strong>
                      <p>Top-left corner - Guided breathing animation</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="settings-section">
                <h3>About Zen Mode</h3>
                <p className="zen-description">
                  These features are designed to create a peaceful, focused study environment.
                  All preferences are saved automatically and persist across sessions.
                </p>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ZenSettings;
