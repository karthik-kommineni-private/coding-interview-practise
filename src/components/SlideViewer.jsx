import './SlideViewer.css';
import CodeBlock from './CodeBlock';
import AlgorithmVisualizer from './AlgorithmVisualizer';
import CodePractice from './CodePractice';

function SlideViewer({ pattern, slide, slideIndex, totalSlides, onNext, onPrev, isFirstSlide, onBackToHome }) {
  return (
    <div className="slide-viewer">
      <div className="slide-header">
        <button className="back-button" onClick={onBackToHome}>
          ← Back to Home
        </button>
        <h1 className="pattern-title">{pattern.title}</h1>
        <div className="slide-counter">
          {slideIndex + 1} / {totalSlides}
        </div>
      </div>

      <div className="slide-content">
        <h2 className="slide-title">{slide.title}</h2>

        <div className="concept-section">
          <h3>Concept</h3>
          <p>{slide.concept}</p>
        </div>

        <div className="complexity-section">
          <div className="complexity-item">
            <span className="complexity-label">Time:</span>
            <code>{slide.timeComplexity}</code>
          </div>
          <div className="complexity-item">
            <span className="complexity-label">Space:</span>
            <code>{slide.spaceComplexity}</code>
          </div>
        </div>

        {slide.keyPoints && slide.keyPoints.length > 0 && (
          <div className="key-points-section">
            <h3>Key Points</h3>
            <ul className="key-points">
              {slide.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {slide.template && (
          <div className="template-section">
            <h3>Template</h3>
            <CodeBlock code={slide.template} language="python" />
            <CodePractice template={slide.template} patternTitle={slide.title} />
          </div>
        )}

        {slide.walkthrough && slide.walkthrough.length > 0 && (
          <div className="walkthrough-section">
            <h3>How it works</h3>
            <ul className="walkthrough-list">
              {slide.walkthrough.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {slide.problems && slide.problems.length > 0 && (
          <div className="problems-section">
            <h3>Practice Problems</h3>
            <ul className="problems-list">
              {slide.problems.map((problem, index) => (
                <li key={index}>
                  {problem.link ? (
                    <a href={problem.link} target="_blank" rel="noopener noreferrer">
                      {problem.name}
                    </a>
                  ) : (
                    problem.name || problem
                  )}
                  {problem.difficulty && (
                    <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                      {problem.difficulty}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="slide-navigation">
        <button
          className="nav-button"
          onClick={onPrev}
          disabled={isFirstSlide}
        >
          ← Previous
        </button>
        <button
          className="nav-button"
          onClick={onNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default SlideViewer;
