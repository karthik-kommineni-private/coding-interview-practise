import { useState } from 'react';
import './games.css';

export default function BrowserHistory() {
  const availablePages = [
    { name: 'Home', url: 'home.com', emoji: '🏠' },
    { name: 'Search', url: 'search.com', emoji: '🔍' },
    { name: 'Videos', url: 'videos.com', emoji: '📺' },
    { name: 'News', url: 'news.com', emoji: '📰' },
    { name: 'Shopping', url: 'shop.com', emoji: '🛒' },
    { name: 'Social', url: 'social.com', emoji: '💬' },
    { name: 'Music', url: 'music.com', emoji: '🎵' },
    { name: 'Games', url: 'games.com', emoji: '🎮' }
  ];

  const [history, setHistory] = useState([availablePages[0]]); // Start with Home
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCurrentPage = () => history[currentIndex];

  const visitPage = (page) => {
    // When visiting new page, remove any forward history
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(page);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const clearHistory = () => {
    setHistory([availablePages[0]]);
    setCurrentIndex(0);
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>🌐 Browser History</h2>
        <div className="pattern-badge">Pattern: Stack (LIFO)</div>
      </div>

      <div className="game-description">
        <p>Click links to navigate between pages. Use the Back button to return to previous pages.</p>
        <p className="game-hint">
          💡 <strong>Real-life connection:</strong> Your browser's back button uses a stack! Last page visited is first to return to (LIFO - Last In, First Out)
        </p>
      </div>

      <div className="game-board">
        {/* Browser Window */}
        <div className="browser-window">
          <div className="browser-toolbar">
            <button
              onClick={goBack}
              disabled={!canGoBack}
              className="browser-btn"
              title="Back"
            >
              ⬅️
            </button>
            <button
              onClick={goForward}
              disabled={!canGoForward}
              className="browser-btn"
              title="Forward"
            >
              ➡️
            </button>
            <div className="url-bar">
              <span className="url-protocol">https://</span>
              <span className="url-domain">{getCurrentPage().url}</span>
            </div>
            <button onClick={clearHistory} className="browser-btn" title="Clear History">
              🗑️
            </button>
          </div>

          <div className="browser-content">
            <div className="current-page">
              <div className="page-icon">{getCurrentPage().emoji}</div>
              <h2>{getCurrentPage().name}</h2>
              <p className="page-url">{getCurrentPage().url}</p>
            </div>

            <div className="available-links">
              <h3>Available Links:</h3>
              <div className="link-grid">
                {availablePages.map((page, i) => (
                  <button
                    key={i}
                    onClick={() => visitPage(page)}
                    className={`link-btn ${getCurrentPage().name === page.name ? 'active' : ''}`}
                    disabled={getCurrentPage().name === page.name}
                  >
                    {page.emoji} {page.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stack Visualization */}
        <div className="stack-visualization">
          <h4>📚 History Stack (LIFO):</h4>
          <div className="stack-container">
            {history.map((page, i) => (
              <div
                key={i}
                className={`stack-item ${i === currentIndex ? 'current' : ''} ${i > currentIndex ? 'forward' : ''}`}
              >
                <span className="stack-icon">{page.emoji}</span>
                <span className="stack-name">{page.name}</span>
                {i === currentIndex && <span className="current-marker">← You are here</span>}
                {i === history.length - 1 && <span className="top-marker">Top of stack</span>}
              </div>
            ))}
          </div>

          <div className="stack-info">
            <p>Stack size: <strong>{history.length}</strong> pages</p>
            <p>Current position: <strong>{currentIndex + 1}</strong> of <strong>{history.length}</strong></p>
            <p>Can go back: <strong>{canGoBack ? 'Yes ✅' : 'No ❌'}</strong></p>
            <p>Can go forward: <strong>{canGoForward ? 'Yes ✅' : 'No ❌'}</strong></p>
          </div>
        </div>

        {/* Operation Log */}
        {history.length > 1 && (
          <div className="operation-log">
            <h4>Operations:</h4>
            <div className="operation-list">
              {history.map((page, i) => {
                if (i === 0) return null;
                return (
                  <div key={i} className="operation-item">
                    <span className="op-number">{i}.</span>
                    <span className="op-action">push(</span>
                    <span className="op-value">{page.emoji} {page.name}</span>
                    <span className="op-action">)</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="pattern-explanation">
        <h4>🧠 How Stack (LIFO) Works:</h4>
        <ul>
          <li><strong>Push</strong>: Add new page to top of stack (click a link)</li>
          <li><strong>Pop</strong>: Remove and return to top page (back button)</li>
          <li><strong>LIFO</strong>: Last In, First Out - most recent page is returned first</li>
          <li>When you visit a new page, any forward history is discarded</li>
          <li><strong>Real uses</strong>: Browser history, undo/redo, function call stack</li>
          <li>Time Complexity: <code>O(1)</code> for push/pop operations</li>
        </ul>
      </div>
    </div>
  );
}
