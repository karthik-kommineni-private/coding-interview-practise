import { useState } from 'react';
import './ZenHub.css';
import BreathingExercise from '../BreathingExercise';
import PomodoroTimer from '../PomodoroTimer';
import AmbientSound from '../AmbientSound';
import ZenSettings from '../ZenSettings';

function ZenHub({ currentPattern, onPatternChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  const zenFeatures = [
    { id: 'breathing', icon: '🌿', label: 'Breathing', component: 'modal' },
    { id: 'timer', icon: '⏱️', label: 'Timer', component: PomodoroTimer },
    { id: 'sound', icon: '🔊', label: 'Sound', component: AmbientSound },
    { id: 'settings', icon: '⚙️', label: 'Settings', component: ZenSettings }
  ];

  const handleFeatureClick = (featureId) => {
    if (featureId === 'breathing') {
      setShowBreathing(true);
      setIsExpanded(false);
    } else if (activeFeature === featureId) {
      setActiveFeature(null);
    } else {
      setActiveFeature(featureId);
    }
  };

  const handleMainButtonClick = () => {
    if (activeFeature) {
      setActiveFeature(null);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      {showBreathing && <BreathingExercise onComplete={() => setShowBreathing(false)} />}

      <div className="zen-hub">
        {/* Expanded menu */}
        {isExpanded && !activeFeature && (
          <div className="zen-menu">
            {zenFeatures.map((feature) => (
              <button
                key={feature.id}
                className="zen-menu-item"
                onClick={() => handleFeatureClick(feature.id)}
                title={feature.label}
              >
                <span className="zen-menu-icon">{feature.icon}</span>
                <span className="zen-menu-label">{feature.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Active feature display */}
        {activeFeature && (
          <div className="zen-feature-container">
            {activeFeature === 'timer' && <PomodoroTimer />}
            {activeFeature === 'sound' && <AmbientSound />}
            {activeFeature === 'settings' && (
              <ZenSettings
                currentPattern={currentPattern}
                onPatternChange={onPatternChange}
                onClose={() => setActiveFeature(null)}
              />
            )}
          </div>
        )}

        {/* Main FAB button */}
        <button
          className={`zen-fab ${isExpanded || activeFeature ? 'active' : ''}`}
          onClick={handleMainButtonClick}
          title={activeFeature ? 'Close' : isExpanded ? 'Close menu' : 'Zen features'}
        >
          {activeFeature ? '✕' : '🧘'}
        </button>
      </div>
    </>
  );
}

export default ZenHub;
