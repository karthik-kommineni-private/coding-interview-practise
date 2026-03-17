import { useState } from 'react';
import '../games.css';

export default function NetflixWindow() {
  const shows = [
    { title: 'Action Movie', duration: 45, emoji: '🎬' },
    { title: 'Comedy Special', duration: 30, emoji: '😂' },
    { title: 'Drama Series', duration: 60, emoji: '🎭' },
    { title: 'Documentary', duration: 25, emoji: '📚' },
    { title: 'Thriller', duration: 50, emoji: '😱' },
    { title: 'Rom-Com', duration: 40, emoji: '💕' },
    { title: 'Sci-Fi', duration: 55, emoji: '🚀' },
    { title: 'Anime', duration: 20, emoji: '🎌' }
  ];

  const timeLimit = 180; // 3 hours in minutes

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [bestWindow, setBestWindow] = useState({ start: 0, end: 0, count: 0, time: 0 });
  const [steps, setSteps] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(false);

  const getCurrentWindow = () => shows.slice(start, end + 1);
  const getCurrentTime = () => getCurrentWindow().reduce((sum, show) => sum + show.duration, 0);

  const expandWindow = () => {
    if (end >= shows.length - 1) return;

    const newEnd = end + 1;
    setEnd(newEnd);

    const newTime = shows.slice(start, newEnd + 1).reduce((sum, s) => sum + s.duration, 0);
    const newCount = newEnd - start + 1;

    addStep(`Expand: Added "${shows[newEnd].title}" (${shows[newEnd].duration}min) → Total: ${newTime}min`);

    if (newTime <= timeLimit && newCount > bestWindow.count) {
      setBestWindow({ start, end: newEnd, count: newCount, time: newTime });
    }
  };

  const shrinkWindow = () => {
    if (start > end) return;

    const removedShow = shows[start];
    const newStart = start + 1;
    setStart(newStart);

    const newTime = shows.slice(newStart, end + 1).reduce((sum, s) => sum + s.duration, 0);

    addStep(`Shrink: Removed "${removedShow.title}" (${removedShow.duration}min) → Total: ${newTime}min`);
  };

  const addStep = (message) => {
    setSteps(prev => [...prev, message]);
  };

  const reset = () => {
    setStart(0);
    setEnd(0);
    setBestWindow({ start: 0, end: 0, count: 0, time: 0 });
    setSteps([]);
    setIsComplete(false);
    setAutoPlaying(false);
  };

  const autoSolve = () => {
    reset();
    setAutoPlaying(true);

    let s = 0;
    let e = -1;
    let best = { start: 0, end: 0, count: 0, time: 0 };
    let stepMessages = [];

    const runStep = () => {
      // Expand window
      if (e < shows.length - 1) {
        e++;
        setEnd(e);

        const currentTime = shows.slice(s, e + 1).reduce((sum, show) => sum + show.duration, 0);
        const currentCount = e - s + 1;

        stepMessages.push(`Expand: Added "${shows[e].title}" (${shows[e].duration}min) → Total: ${currentTime}min`);

        // Shrink if needed
        while (currentTime > timeLimit && s <= e) {
          stepMessages.push(`Shrink: Removed "${shows[s].title}" (${shows[s].duration}min)`);
          s++;
        }

        setStart(s);

        const finalTime = shows.slice(s, e + 1).reduce((sum, show) => sum + show.duration, 0);
        const finalCount = e - s + 1;

        if (finalTime <= timeLimit && finalCount > best.count) {
          best = { start: s, end: e, count: finalCount, time: finalTime };
          setBestWindow(best);
        }

        setSteps([...stepMessages]);

        if (e < shows.length - 1) {
          setTimeout(runStep, 1000);
        } else {
          setIsComplete(true);
          setAutoPlaying(false);
        }
      }
    };

    setTimeout(runStep, 500);
  };

  const currentTime = getCurrentTime();
  const isOverLimit = currentTime > timeLimit;
  const currentCount = end - start + 1;

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>📺 Netflix Watchlist</h2>
        <div className="pattern-badge">Pattern: Sliding Window</div>
      </div>

      <div className="game-description">
        <p>You have <strong>3 hours (180 minutes)</strong> tonight to binge-watch shows. Find the maximum number of shows you can watch!</p>
        <p className="game-hint">
          💡 <strong>Real-life connection:</strong> Like planning your evening - you have limited time and want to maximize entertainment. Add shows until you're over time, then remove from the start!
        </p>
      </div>

      <div className="game-board">
        {/* Shows Display */}
        <div className="shows-list">
          {shows.map((show, i) => {
            const inWindow = i >= start && i <= end;
            const isStart = i === start;
            const isEnd = i === end;

            return (
              <div
                key={i}
                className={`show-card ${inWindow ? 'in-window' : ''} ${isStart ? 'window-start' : ''} ${isEnd ? 'window-end' : ''}`}
              >
                <div className="show-emoji">{show.emoji}</div>
                <div className="show-info">
                  <div className="show-title">{show.title}</div>
                  <div className="show-duration">{show.duration} min</div>
                </div>
                {isStart && <div className="pointer-label start-label">START →</div>}
                {isEnd && <div className="pointer-label end-label">← END</div>}
              </div>
            );
          })}
        </div>

        {/* Window Info */}
        <div className="window-info">
          <div className="info-grid">
            <div className="info-box">
              <span className="info-label">Current Window:</span>
              <span className="info-value">{currentCount} shows</span>
            </div>
            <div className="info-box">
              <span className="info-label">Total Time:</span>
              <span className={`info-value ${isOverLimit ? 'over-limit' : ''}`}>
                {currentTime} min {isOverLimit && '⚠️'}
              </span>
            </div>
            <div className="info-box">
              <span className="info-label">Time Limit:</span>
              <span className="info-value">{timeLimit} min</span>
            </div>
            <div className="info-box success">
              <span className="info-label">Best So Far:</span>
              <span className="info-value">{bestWindow.count} shows ({bestWindow.time} min)</span>
            </div>
          </div>

          {isOverLimit && (
            <div className="feedback warning">
              ⚠️ Over time limit! Shrink the window to fit within {timeLimit} minutes.
            </div>
          )}

          {currentTime <= timeLimit && currentCount > 0 && (
            <div className="feedback success">
              ✅ Valid window! Total time: {currentTime} min
            </div>
          )}
        </div>

        {/* Controls */}
        {!isComplete && (
          <div className="controls">
            <button
              onClick={expandWindow}
              disabled={autoPlaying || end >= shows.length - 1}
              className="btn-primary"
            >
              ➕ Expand Window (add show at end)
            </button>
            <button
              onClick={shrinkWindow}
              disabled={autoPlaying || start > end}
              className="btn-primary"
            >
              ➖ Shrink Window (remove show from start)
            </button>
            <button onClick={autoSolve} disabled={autoPlaying} className="btn-hint">
              🤖 Auto Solve
            </button>
            <button onClick={reset} className="btn-secondary">
              🔄 Reset
            </button>
          </div>
        )}

        {/* Current Window Summary */}
        {currentCount > 0 && (
          <div className="current-window-summary">
            <h4>📋 Current Window Shows:</h4>
            <div className="window-shows">
              {getCurrentWindow().map((show, i) => (
                <span key={i} className="window-show-chip">
                  {show.emoji} {show.title} ({show.duration}min)
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Steps History */}
        {steps.length > 0 && (
          <div className="steps-history">
            <h4>📝 Steps Taken:</h4>
            <div className="step-list">
              {steps.map((step, i) => (
                <div key={i} className="step-item">
                  <span className="step-number">{i + 1}.</span>
                  <span className="step-message">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final Result */}
        {isComplete && (
          <div className="game-stats">
            <h4>🎉 Algorithm Complete!</h4>
            <p>Maximum shows you can watch: <strong>{bestWindow.count} shows</strong></p>
            <p>Total time: <strong>{bestWindow.time} minutes</strong> (under {timeLimit} min limit)</p>
            <div className="best-window-shows">
              <strong>Best combination:</strong>
              {shows.slice(bestWindow.start, bestWindow.end + 1).map((show, i) => (
                <span key={i} className="window-show-chip">
                  {show.emoji} {show.title}
                </span>
              ))}
            </div>
            <button onClick={reset} className="btn-primary">
              Try Again
            </button>
          </div>
        )}
      </div>

      <div className="pattern-explanation">
        <h4>🧠 How Sliding Window Works:</h4>
        <ul>
          <li><strong>Two pointers</strong>: Start and End define the window boundaries</li>
          <li><strong>Expand</strong>: Move End pointer right to include more elements</li>
          <li><strong>Shrink</strong>: Move Start pointer right to remove elements when condition violated</li>
          <li><strong>Track best</strong>: Keep track of the best valid window seen so far</li>
          <li><strong>Why it works</strong>: Each element visited at most twice (once by each pointer)</li>
          <li>Time Complexity: <code>O(n)</code> - linear, much better than checking all subarrays!</li>
          <li><strong>Real uses</strong>: Longest substring problems, max sum subarrays, streaming data analysis</li>
        </ul>
      </div>
    </div>
  );
}
