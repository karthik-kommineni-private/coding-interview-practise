import { useState } from 'react';
import './SlideViewer.css';
import CodeBlock from './CodeBlock';
import AlgorithmVisualizer from './AlgorithmVisualizer';
import CodePractice from './CodePractice';

function SlideViewer({ pattern, slide, slideIndex, totalSlides, onNext, onPrev, isFirstSlide, onBackToHome }) {
  const [showSyntax, setShowSyntax] = useState(false);

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

        {(slide.timeComplexity || slide.spaceComplexity) && (
          <div className="complexity-section">
            {slide.timeComplexity && (
              <div className="complexity-badge time" title={slide.timeComplexityExplanation || ''}>
                <span className="complexity-label">⏱️ Time Complexity</span>
                <span className="complexity-value">{slide.timeComplexity}</span>
                {slide.timeComplexityExplanation && (
                  <div className="complexity-tooltip">{slide.timeComplexityExplanation}</div>
                )}
              </div>
            )}
            {slide.spaceComplexity && (
              <div className="complexity-badge space" title={slide.spaceComplexityExplanation || ''}>
                <span className="complexity-label">💾 Space Complexity</span>
                <span className="complexity-value">{slide.spaceComplexity}</span>
                {slide.spaceComplexityExplanation && (
                  <div className="complexity-tooltip">{slide.spaceComplexityExplanation}</div>
                )}
              </div>
            )}
          </div>
        )}

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
            {slide.usefulSyntax && (
              <div className="syntax-reference">
                <button
                  className="syntax-toggle"
                  onClick={() => setShowSyntax(!showSyntax)}
                >
                  {showSyntax ? '▼' : '▶'} Useful Syntax & Tools
                </button>
                {showSyntax && (
                  <div className="syntax-list">
                    {slide.usefulSyntax.map((item, index) => (
                      <div key={index} className="syntax-tag">
                        {item.name}
                        <div className="syntax-tooltip">
                          <code>{item.example}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
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
