import CodeBlock from './CodeBlock';
import './CodeBlockFlow.css';

function CodeBlockFlow({ code, language, zones = [] }) {
  const lines = code.split('\n');

  const getLineZone = (lineIndex) => {
    return zones.find(zone =>
      zone.lines && zone.lines[0] <= lineIndex && lineIndex <= zone.lines[1]
    );
  };

  return (
    <div className="code-block-flow-wrapper">
      <div className="flow-zones-sidebar">
        {zones.map((zone, idx) => (
          <div key={idx} className={`zone-indicator zone-${zone.phase}`}>
            <div className="zone-color"></div>
            <span className="zone-label">{zone.label}</span>
          </div>
        ))}
      </div>
      <div className="flow-code-container">
        <CodeBlock code={code} language={language} />
        <div className="flow-overlay">
          {lines.map((_, index) => {
            const zone = getLineZone(index);
            return (
              <div
                key={index}
                className={`flow-line ${zone ? `zone-${zone.phase}` : ''}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CodeBlockFlow;
