import CodeBlock from './CodeBlock';
import './CodeBlockAnnotated.css';

function CodeBlockAnnotated({ code, language, annotations = [] }) {
  const lines = code.split('\n');

  return (
    <div className="code-block-annotated-wrapper">
      <CodeBlock code={code} language={language} />
      <div className="annotations-overlay">
        {annotations.map((annotation, idx) => {
          const lineHeight = 36; // Approximate line height in pixels
          const topPosition = (annotation.line - 1) * lineHeight + 60; // Adjust for header

          return (
            <div
              key={idx}
              className={`annotation annotation-${annotation.type}`}
              style={{ top: `${topPosition}px` }}
            >
              <span className="annotation-icon">{annotation.icon}</span>
              <span className="annotation-label">{annotation.label}</span>
              {annotation.complexity && (
                <span className="annotation-complexity">{annotation.complexity}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CodeBlockAnnotated;
