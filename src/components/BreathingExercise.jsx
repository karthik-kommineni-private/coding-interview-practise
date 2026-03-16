import { useState, useEffect } from 'react';
import './BreathingExercise.css';

function BreathingExercise({ onComplete }) {
  const [phase, setPhase] = useState('inhale'); // 'inhale' or 'exhale'
  const [cycle, setCycle] = useState(1); // Track which cycle (1 or 2)
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let phaseTimer;
    let cycleTimer;

    // Phase timing: 4s inhale, 6s exhale
    const runCycle = () => {
      // Start with inhale (4 seconds)
      setPhase('inhale');

      phaseTimer = setTimeout(() => {
        // Switch to exhale (6 seconds)
        setPhase('exhale');
      }, 4000);
    };

    // Start first cycle
    runCycle();

    // After first cycle (10s), start second cycle
    cycleTimer = setTimeout(() => {
      setCycle(2);
      runCycle();

      // After second cycle (20s total), fade out and complete
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 500); // Wait for fade out animation
      }, 10000);
    }, 10000);

    return () => {
      clearTimeout(phaseTimer);
      clearTimeout(cycleTimer);
    };
  }, [onComplete]);

  const handleDoubleClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`breathing-overlay ${!isVisible ? 'fade-out' : ''}`}
      onDoubleClick={handleDoubleClick}
    >
      <div className="breathing-container">
        <div className="breathing-circle-container">
          <div className={`breathing-circle ${phase}`} />
        </div>

        <div className="breathing-text">
          {phase === 'inhale' ? 'Breathe in...' : 'Breathe out...'}
        </div>

        <div className="breathing-cycle">
          Cycle {cycle} of 2
        </div>

        <div className="breathing-hint">
          Double-click to exit
        </div>
      </div>
    </div>
  );
}

export default BreathingExercise;
