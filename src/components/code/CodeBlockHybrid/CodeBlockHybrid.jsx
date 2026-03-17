import CodeBlock from './CodeBlock';
import './CodeBlockHybrid.css';

function CodeBlockHybrid({ code, language, annotations = [], zones = [], complexityMarkers = [] }) {
  const lines = code.split('\n');

  const getLineZone = (lineIndex) => {
    return zones.find(zone =>
      zone.lines && zone.lines[0] <= lineIndex && lineIndex <= zone.lines[1]
    );
  };

  return (
    <div className="code-block-hybrid-wrapper">
      <CodeBlock code={code} language={language} />

      {/* Zone highlighting */}
      <div className="hybrid-zones-overlay">
        {lines.map((_, index) => {
          const zone = getLineZone(index);
          return (
            <div
              key={index}
              className={`hybrid-zone-line ${zone ? `zone-${zone.phase}` : ''}`}
            />
          );
        })}
      </div>

      {/* Annotations and Complexity */}
      <div className="hybrid-annotations-overlay">
        {annotations.map((annotation, idx) => {
          const lineHeight = 36;
          const topPosition = (annotation.line - 1) * lineHeight + 60;
          const complexity = complexityMarkers.find(m => m.line === annotation.line);

          return (
            <div
              key={idx}
              className={`hybrid-annotation annotation-${annotation.type}`}
              style={{ top: `${topPosition}px` }}
            >
              <span className="hybrid-icon">{annotation.icon}</span>
              <div className="hybrid-content">
                <span className="hybrid-label">{annotation.label}</span>
                {(annotation.complexity || complexity) && (
                  <span className="hybrid-complexity">
                    {annotation.complexity || complexity?.time || complexity?.space}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CodeBlockHybrid;
