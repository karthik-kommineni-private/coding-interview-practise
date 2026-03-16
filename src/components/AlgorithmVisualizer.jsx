import { useState, useEffect } from 'react';
import './AlgorithmVisualizer.css';

function AlgorithmVisualizer({ algorithm, data }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const steps = algorithm.steps || [];
  const totalSteps = steps.length;

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < totalSteps - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, totalSteps, speed]);

  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep] || {};

  return (
    <div className="visualizer">
      <div className="visualizer-header">
        <h3>Visual Walkthrough</h3>
        <div className="step-counter">
          Step {currentStep + 1} / {totalSteps}
        </div>
      </div>

      <div className="visualization-area">
        {/* Array Visualization */}
        {currentStepData.array && (
          <div className="array-container">
            <div className="array-row">
              {currentStepData.array.map((value, index) => (
                <div
                  key={index}
                  className={`array-cell ${
                    currentStepData.highlight?.includes(index) ? 'highlight' : ''
                  } ${
                    currentStepData.active?.includes(index) ? 'active' : ''
                  }`}
                >
                  <div className="cell-value">{value}</div>
                  <div className="cell-index">{index}</div>
                </div>
              ))}
            </div>

            {/* Pointers */}
            {currentStepData.pointers && (
              <div className="pointers-row">
                {currentStepData.array.map((_, index) => {
                  const pointerNames = [];
                  Object.entries(currentStepData.pointers).forEach(([name, pos]) => {
                    if (pos === index) pointerNames.push(name);
                  });
                  return (
                    <div key={index} className="pointer-cell">
                      {pointerNames.map(name => (
                        <div key={name} className={`pointer pointer-${name.toLowerCase()}`}>
                          {name}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Variables Display */}
        {currentStepData.variables && (
          <div className="variables-display">
            {Object.entries(currentStepData.variables).map(([name, value]) => (
              <div key={name} className="variable-item">
                <span className="var-name">{name}:</span>
                <span className="var-value">{JSON.stringify(value)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step Description */}
        {currentStepData.description && (
          <div className="step-description">
            {currentStepData.description}
          </div>
        )}

        {/* Code Highlight */}
        {currentStepData.codeLine && (
          <div className="code-highlight">
            <code>{currentStepData.codeLine}</code>
          </div>
        )}
      </div>

      <div className="visualizer-controls">
        <button onClick={handleReset} className="control-btn" title="Reset">
          ↺
        </button>
        <button onClick={handlePrev} className="control-btn" disabled={currentStep === 0} title="Previous">
          ←
        </button>
        <button onClick={handlePlay} className="control-btn play-btn" title={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={handleNext} className="control-btn" disabled={currentStep >= totalSteps - 1} title="Next">
          →
        </button>
        <div className="speed-control">
          <label>Speed:</label>
          <input
            type="range"
            min="200"
            max="2000"
            step="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{(2200 - speed) / 200}x</span>
        </div>
      </div>
    </div>
  );
}

export default AlgorithmVisualizer;
