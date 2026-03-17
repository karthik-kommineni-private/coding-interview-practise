import './Sidebar.css';

function Sidebar({ patterns, currentPatternIndex, currentSlideIndex, onPatternClick, onSlideClick }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Coding Patterns</h2>
        <p className="subtitle">Interview Revision</p>
      </div>

      <nav className="patterns-nav">
        {patterns.map((pattern, patternIndex) => (
          <div key={pattern.id} className="pattern-item">
            <button
              className={`pattern-button ${
                patternIndex === currentPatternIndex ? 'active' : ''
              }`}
              onClick={() => onPatternClick(patternIndex)}
            >
              <span className="pattern-number">{patternIndex + 1}</span>
              <span className="pattern-name">{pattern.title}</span>
              <span className="slide-count">{pattern.slides.length}</span>
            </button>

            {patternIndex === currentPatternIndex && pattern.slides.length > 1 && (
              <div className="slides-list">
                {pattern.slides.map((slide, slideIndex) => (
                  <button
                    key={slideIndex}
                    className={`slide-button ${
                      slideIndex === currentSlideIndex ? 'active' : ''
                    }`}
                    onClick={() => onSlideClick(slideIndex)}
                  >
                    <span className="slide-dot"></span>
                    <span className="slide-name">
                      {slide.title || `Slide ${slideIndex + 1}`}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="tip">
          💡 Use arrow keys to navigate
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
