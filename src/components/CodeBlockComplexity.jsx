import CodeBlock from './CodeBlock';
import './CodeBlockComplexity.css';

function CodeBlockComplexity({ code, language, complexityMarkers = [] }) {
  return (
    <div className="code-block-complexity-wrapper">
      <CodeBlock code={code} language={language} />
      <div className="complexity-overlay">
        {complexityMarkers.map((marker, idx) => {
          const lineHeight = 36;
          const topPosition = (marker.line - 1) * lineHeight + 60;

          return (
            <div
              key={idx}
              className="complexity-marker"
              style={{ top: `${topPosition}px` }}
            >
              {marker.time && (
                <span className="complexity-badge time-badge">
                  <span className="badge-icon">⏱️</span>
                  {marker.time}
                </span>
              )}
              {marker.space && (
                <span className="complexity-badge space-badge">
                  <span className="badge-icon">💾</span>
                  {marker.space}
                </span>
              )}
              {marker.label && (
                <span className="complexity-label">{marker.label}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CodeBlockComplexity;
